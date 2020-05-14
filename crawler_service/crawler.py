#!/usr/bin/env python
import hashlib
from producer import Producer
from consumer import Consumer
from document_client import DocumentClient
from indexing_client import IndexingClient
from pagerank_client import PagerankClient
from web_scraper import WebScraper

class Crawler:
  MAX_URL = 5

  def __init__(self):
    self.url_counter = 1
    self.document_client = DocumentClient()
    self.indexing_client = IndexingClient()
    self.pagerank_client = PagerankClient()
    self.producer = Producer('url_queue')
    self.consumer = Consumer('url_queue')

  def run(self):
    self.consumer.subscribe(self.run_for_url)

  def run_for_url(self, ch, method, properties, body):
    page_url = body.decode("utf-8")
    print("[Crawler] Received %r" % page_url)

    document_text = WebScraper.get_text(page_url)
    document_links = WebScraper.get_links(page_url)

    hash_object = hashlib.sha256(document_text)
    digest = hash_object.hexdigest()
    doc_record = self.document_client.get_by_url(page_url)

    if "id" in doc_record:
      if doc_record["digest"] != digest:
        self.document_client.update_digest(doc_record["id"], digest)
    else:
      doc_record = self.document_client.create(page_url, digest)
      self.indexing_client.index(page_url)

    for link in document_links:
      if self.url_counter < Crawler.MAX_URL:
        self.url_counter += 1
        child_doc_record = self.document_client.get_by_url(link.geturl())
        if "id" not in child_doc_record:
          child_doc_record = self.document_client.create(link.geturl(), "digest")
        self.document_client.create_link(doc_record["id"], child_doc_record["id"])
        self.producer.publish(link.geturl())

    self.pagerank_client.update(doc_record["id"])
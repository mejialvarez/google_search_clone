#!/usr/bin/env python
import os
import requests
from urllib.parse import urlparse
from bs4 import BeautifulSoup
from producer import Producer
from consumer import Consumer
url_counter = 1

class Crawler:
  def run(self):
    self.producer = Producer('url_queue')

    self.consumer = Consumer('url_queue')
    self.consumer.subscribe(self.callback)

  def callback(self, ch, method, properties, body):
    page_url = body.decode('utf-8')
    print("[Crawler] Received %r" % page_url)
    self.index_page(page_url)
    self.run_for_url(page_url)

  def run_for_url(self, page_url):
    global url_counter

    res = requests.get(page_url)
    html_page = res.content
    soup = BeautifulSoup(html_page, 'html.parser')
    text = soup.find_all()

    for t in text:
      if t.name == 'a' and 'href' in t.attrs:
        child_url = urlparse(t['href'])
        if child_url.hostname and url_counter < 5:
          url_counter += 1
          self.producer.publish(child_url.geturl())

  def index_page(self, page_url):
    indexing_service_url = os.getenv('INDEXING_SERVICE_URL')
    endpoint = '{}/indexing'.format(indexing_service_url)
    payload = {'page_url': page_url}
    requests.post(endpoint, json=payload)
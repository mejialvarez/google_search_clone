import os
import requests
import json
import hashlib

class DocumentClient:
  def __init__(self):
    self.uri = os.getenv('DOCUMENT_STORE_SERVICE_URL')

  def get_by_url(self, url):
    hash_object = hashlib.sha256(url.encode('utf-8'))
    doc_id = hash_object.hexdigest()
    endpoint = '{}/documents/{}'.format(self.uri, doc_id)
    document = json.loads(requests.get(endpoint).content.decode('utf-8'))
    return document

  def create(self, page_url, digest):
    endpoint = '{}/documents'.format(self.uri)
    payload = { 'pageUrl': page_url, 'digest': digest }
    document = json.loads(requests.post(endpoint, json=payload).content.decode('utf-8'))
    return document

  def update_digest(self, id, digest):
    endpoint = '{}/documents/{}/digest'.format(self.uri, id)
    payload = { 'digest': digest }
    requests.put(endpoint, json=payload)

  def create_link(self, doc1_id, doc2_id):
    endpoint = '{}/links'.format(self.uri)
    payload = {'doc1Id': doc1_id, 'doc2Id': doc2_id}
    requests.post(endpoint, json=payload)
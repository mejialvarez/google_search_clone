import os
import requests
import json 

class DocumentClient:
  def __init__(self):
    self.uri = os.getenv('DOCUMENT_STORE_SERVICE_URL')

  def get_by_url(self, url):
    endpoint = '{}/documents/byUrl?url={}'.format(self.uri, url)
    document = json.loads(requests.get(endpoint).content.decode('utf-8'))
    return document

  def create(self, page_url, digest):
    endpoint = '{}/documents'.format(self.uri)

    payload = { 'pageUrl': page_url, 'digest': digest }
    requests.post(endpoint, json=payload)

  def update_digest(self, id, digest):
    endpoint = '{}/documents/{}/digest'.format(self.uri, id)
    payload = { 'digest': digest }
    requests.put(endpoint, json=payload)
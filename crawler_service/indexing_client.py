import os
import requests
import json

class IndexingClient:
  def __init__(self):
    self.uri = os.getenv('INDEXING_SERVICE_URL')

  def index(self, id, url, content):
    endpoint = '{}/documents'.format(self.uri)
    payload = { 'id': id, 'url': url, 'content': content }
    requests.post(endpoint, json=payload)

  def get_by_id(self, id):
    endpoint = '{}/documents/{}'.format(self.uri, id)
    page = json.loads(requests.get(endpoint).content.decode('utf-8'))
    return page

  def update_content(self, id, content):
    endpoint = '{}/documents/{}/content'.format(self.uri, id)
    payload = {'content': content}
    requests.put(endpoint, json=payload)
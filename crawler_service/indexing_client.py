import os
import requests

class IndexingClient:
  def __init__(self):
    self.uri = os.getenv('INDEXING_SERVICE_URL')

  def index(self, page_url):
    endpoint = '{}/indexing'.format(self.uri)
    payload = {'pageUrl': page_url}
    requests.post(endpoint, json=payload)

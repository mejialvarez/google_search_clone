import os
import requests
import json 

class PagerankClient:
  def __init__(self):
    self.uri = os.getenv('PAGERANK_SERVICE_URL')

  def update(self, docId):
    endpoint = '{}/pageRank?docId={}'.format(self.uri, docId)
    requests.get(endpoint)
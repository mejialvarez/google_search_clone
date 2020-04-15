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
    print(" [x] Received %r" % body)
    self.run_for_url(body)

  def run_for_url(self, url):
    global url_counter

    res = requests.get(url)
    html_page = res.content
    soup = BeautifulSoup(html_page, 'html.parser')
    text = soup.find_all()

    for t in text:
      if t.name == 'a' and 'href' in t.attrs:
        child_url = urlparse(t['href'].encode('utf-8'))
        if child_url.hostname and url_counter < 5:
          url_counter += 1
          self.producer.publish(child_url.geturl())
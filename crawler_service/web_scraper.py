import requests
from urllib.parse import urlparse
from bs4 import BeautifulSoup

class WebScraper:
  @classmethod
  def get_text(cls, page_url):
    res = requests.get(page_url)
    document = res.content
    soup = BeautifulSoup(document, 'html.parser')

    document_text = soup.find_all(text=True)
    tags_blacklist = ['noscript','header','html','meta','head','input','script']
    document_text_sanitize = ''
    for t in document_text:
      if t.parent.name not in tags_blacklist:
        document_text_sanitize += '{}'.format(t.replace("\n", " "))

    document_text_sanitize = document_text_sanitize.encode('utf-8')
    return document_text_sanitize

  @classmethod
  def get_links(cls, page_url):
    res = requests.get(page_url)
    document = res.content
    soup = BeautifulSoup(document, 'html.parser')
    url_list = []

    document_html = soup.find_all()
    for t in document_html:
      if t.name == 'a' and 'href' in t.attrs:
        child_url = urlparse(t['href'])
        if child_url.hostname:
          url_list.append(child_url)

    return url_list
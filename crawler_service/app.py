#!/usr/bin/env python
from producer import Producer
from crawler import Crawler

producer = Producer('url_queue')
producer.publish('https://makeitreal.camp/')

crawler = Crawler()
crawler.run()
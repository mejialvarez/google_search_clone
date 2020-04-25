#!/usr/bin/env python
import os
import time
import pika

class Producer:
  def __init__(self, queue):
    self.queue = queue
    self.connection = None

  def publish(self, body):
    try:
      time.sleep(5)
      self.set_connection()
      channel = self.connection.channel()
      channel.queue_declare(queue=self.queue)
      channel.basic_publish(exchange='', routing_key=self.queue, body=body)
      print('[Producer] Sent: {}'.format(body))
    except pika.exceptions.AMQPConnectionError:
      print('[Producer] Conection error for queue: {}'.format(self.queue))
      self.publish(body)


  def set_connection(self):
    if self.connection is None or not self.connection.is_open:
      rabbitmq_url = os.getenv('RABBITMQ_URL')
      connection_params = pika.URLParameters(rabbitmq_url)
      self.connection = pika.BlockingConnection(connection_params)
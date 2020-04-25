#!/usr/bin/env python
import pika
import time
import os

class Consumer:
  def __init__(self, queue):
    self.queue = queue
    self.connection = None

  def subscribe(self, callback):
    self.set_connection()
    channel = self.connection.channel()
    channel.queue_declare(queue=self.queue)
    channel.basic_consume(queue=self.queue, on_message_callback=callback, auto_ack=True)

    print('[Consumer] Waiting for messages. To exit press CTRL+C')
    channel.start_consuming()

  def set_connection(self):
    if self.connection is None or not self.connection.is_open:
      rabbitmq_url = os.getenv('RABBITMQ_URL')
      connection_params = pika.URLParameters(rabbitmq_url)
      self.connection = pika.BlockingConnection(connection_params)
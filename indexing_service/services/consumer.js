const Rabbitmq = require('../services/rabbitmq')

class Consumer {
  constructor(queue) {
    this.queue = queue
    this.rabbitmq = new Rabbitmq()
  }

  async subscribe(callback) {
    try {
      this.rabbitmq.channel.assertQueue(this.queue, { durable: true })
      this.rabbitmq.channel.prefetch(1)

      console.log("[Consumer] Waiting for messages in %s. To exit press CTRL+C", this.queue)
      this.rabbitmq.channel.consume(this.queue, async (msg) => {
        await callback(msg)
        this.rabbitmq.channel.ack(msg)
      }, { noAck: false })
    } catch(e) {
      console.log('[Consumer] Error:', e)
      throw e
    }
  }

  async connect() {
    await this.rabbitmq.connect()
  }
}

module.exports = Consumer
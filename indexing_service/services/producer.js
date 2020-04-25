const config = require('../config/index')
const delay = require('../utils/delay')
const Rabbitmq = require('../services/rabbitmq')

class Producer {
  constructor(queue) {
    this.queue = queue
    this.rabbitmq = new Rabbitmq()
  }

  async publish(msg) {
    try {
      await this.rabbitmq.channel.assertQueue(this.queue, { durable: true })
      await this.rabbitmq.channel.sendToQueue(this.queue, Buffer.from(msg), { persistent: true })
      console.log("[Producer] Sent '%s", msg)
    } catch(e) {
      console.log('[Producer] Error:', e.message)
      await delay(4000)
      await this.publish(this.queue, msg)
    }
  }

  async connect() {
    await this.rabbitmq.connect()
  }
}

module.exports = Producer
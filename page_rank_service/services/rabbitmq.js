const amqp = require('amqplib')
const delay = require('../utils/delay')
const config = require('../config/index')

class Rabbitmq {
  constructor() {
    this.connection = null
    this.channel = null
  }

  async connect() {
    try {
      this.connection = await amqp.connect(config.rabbitmq.url)
      this.channel = await this.connection.createChannel()
      console.log('[Rabbitmq] Connected')

      this.connection.on('error', async (e) => {
        console.log('[Rabbitmq] Conection error:', e.message)
        await delay(5000)
        await this.connect()
      })
    } catch(e) {
      console.log('[Rabbitmq] Conection error:', e.message)
      await delay(5000)
      await this.connect()
    }
  }
}

module.exports = Rabbitmq
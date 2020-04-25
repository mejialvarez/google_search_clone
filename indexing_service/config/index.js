const env = process.env

const config = {
  environment: env.NODE_ENV || 'development',
  host: env.HOST,
  port: env.PORT,
  elasticsearch: {
    url: env.ELASTICSEARCH_URL
  },
  rabbitmq: {
    url: env.RABBITMQ_URL
  }
}

module.exports = config
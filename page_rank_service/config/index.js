const env = process.env

const config = {
  environment: env.NODE_ENV || 'development',
  port: env.PORT,
  host: env.HOST,
  documentStore: {
    url: env.DOCUMENT_STORE_SERVICE_URL
  },
  rabbitmq: {
    url: env.RABBITMQ_URL
  }
}

module.exports = config
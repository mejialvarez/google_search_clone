const env = process.env

const config = {
  environment: env.NODE_ENV || 'development',
  host: env.HOST,
  port: env.PORT,
  elasticsearch: {
    url: env.ELASTICSEARCH_URL,
    username: env.ELASTICSEARCH_USERNAME,
    password: env.ELASTICSEARCH_PASSWORD
  }
}

module.exports = config
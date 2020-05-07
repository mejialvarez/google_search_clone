const env = process.env

const config = {
  environment: env.NODE_ENV || 'development',
  host: env.HOST,
  port: env.PORT,
  aws: {
    region: env.AWS_REGION,
    endpoint: env.AWS_ENDPOINT,
    accesKey: env.AWS_ACCESS_KEY,
    secretKey: env.AWS_SECRET_KEY
  }
}

module.exports = config
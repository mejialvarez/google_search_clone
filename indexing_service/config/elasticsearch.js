const config = require('./index')
const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: {
  url: new URL(config.elasticsearch.url),
  auth: {
    username: config.elasticsearch.username,
    password: config.elasticsearch.password
  }
}})

module.exports = client
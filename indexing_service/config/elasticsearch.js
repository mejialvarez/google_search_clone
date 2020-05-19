const config = require('./index')
const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: config.elasticsearch.url })

module.exports = client
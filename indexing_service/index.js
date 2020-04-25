const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser')
const cors = require('cors')
const config = require('./config/index')
const pagesController = require('./controllers/pagesController')

const app = express()
app.use(bodyParser.json())
app.use(cors())

router.post('/indexing', pagesController.index)
app.use(router)

app.listen(config.port, config.host)
console.log(`Running on http://${config.host}:${config.port}`)
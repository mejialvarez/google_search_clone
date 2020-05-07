const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser')
const cors = require('cors')
const config = require('./config/index')
const documentsController = require('./controllers/documentsController')
const linksController = require('./controllers/linksController')

const app = express()
app.use(bodyParser.json())
app.use(cors())

router.post('/documents', documentsController.create)
router.get('/documents/byUrl', documentsController.getByUrl)
router.put('/documents/:id/digest', documentsController.updateDigest)
router.get('/documents/:id/outboundLinks', linksController.getOutboundLinks)
router.post('/links', linksController.create)
app.use('/v1', router)

app.listen(config.port, config.host)
console.log(`Running on http://${config.host}:${config.port}`)
const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser')
const cors = require('cors')
const config = require('./config/index')
const documentsController = require('./controllers/documentsController')

const app = express()
app.use(bodyParser.json({ limit: '50mb' }))
app.use(cors())

router.post('/documents', documentsController.index)
router.get('/documents/:id', documentsController.getById)
router.put('/documents/:id/content', documentsController.updateContent)
app.use('/v1', router)

app.listen(config.port, config.host)
console.log(`Running on http://${config.host}:${config.port}`)
const express = require('express')
const { getMessages,  addMessage } = require('./message.controller')
const router = express.Router()

router.get('/', getMessages)
router.post('/', addMessage)

module.exports = router
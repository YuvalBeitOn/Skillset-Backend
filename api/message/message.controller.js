const messageService = require('./message.service')

module.exports = {
    getMessages,
    addMessage
}

async function getMessages(req, res) {
    const messages = await messageService.get(req.query)
    res.send(messages)
}

async function addMessage(req, res) {
    const message = req.body;
    await messageService.add(message)
    res.send(message)
}


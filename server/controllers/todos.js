const Todo = require('../models').Todo

module.exports = {
    create(req, res) {
        const {uri, session, title} = req.body
        require('../../server/app.js')
            .io
            .sockets
            .emit(`chat ${uri}`, title, session)

        return Todo
            .create({title: title})
            .then(todo => res.status(201).send(todo))
            .catch(error => res.status(400).send(error))
    }
}
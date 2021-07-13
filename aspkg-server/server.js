const { fastify } = require('fastify')

const fs = require('fs')

const path = require('path')

const kati = require('kati')

const app = fastify()

app.listen(3000)

// Static file serve
app.register(require('fastify-static'), {
    root: path.join(__dirname, '../aspkg-bss'),
})

// Package Searching
app.get('/search', (req, res) => {
    const query = req.query['query']
    if (!query) {
        // Send an empty list of results
        res.send(JSON.stringify({}))
        return
    }
})
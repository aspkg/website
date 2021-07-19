const path = require('path')
const axios = require('axios').default
const { fastify } = require('fastify')
const fs = require('fs')
const ReziDB = require('rezidb')
// Plugins
const fastifyCookie = require('fastify-cookie')
// Database
const db = new ReziDB({
    name: 'aspkg-db-1',
    path: './database',
    cluster: false,
    cache: { maxSize: 1000 },
})

//db.clear()

// Import .env
require('dotenv').config()

// Create server
const app = fastify()

// Set cookie handler
app.register(fastifyCookie, {
    secret: process.env.cookieSecret,
    parseOptions: {},
})

// Get secrets
const clientId = process.env.id
const clientSecret = process.env.secret

console.log(clientId)

console.log(clientSecret)

app.listen(3000, async (err, address) => {
    /*closeWithGrace({ delay: 1000 }, async function () {
        console.log('Closing...')
        tunnel.close()
        console.log('Done.')
    })
    app.addHook('onClose', () => {
        tunnel.close()
    })*/
    console.log('Listening on: ', address)
})

// Static file serve
app.register(require('fastify-static'), {
    root: path.join(__dirname, '../aspkg-bss/'),
    prefix: '/',
})

app.get('/', async (req, res) => {
    if (req.query.code && req.query.token == null) {
        const body = {
            client_id: clientId,
            client_secret: clientSecret,
            code: req.query.code,
        }

        const opts = {
            headers: {
                accept: 'application/json',
            },
        }

        const url = `https://github.com/login/oauth/access_token`
        const res = await axios.post(url, body, opts)
        const token = res.data.access_token

        console.log('Token: ', token)

        res.setCookie('token', token)
    }
    res.type('html')
    res.send(await fs.promises.readFile('../aspkg-bss/index.html'))
})

app.get('/package', async (req, res) => {
    res.type('html')
    res.send(await fs.promises.readFile('../aspkg-bss/package.html'))
})

app.get('/404', async (req, res) => {
    res.type('html')
    res.send(await fs.promises.readFile('../aspkg-bss/404.html'))
})

// Package Searching
app.get('/search', async (req, res) => {
    const query = req.query['query']
    if (!query) {
        // Send an empty list of results
        res.send(JSON.stringify({}))
        return
    }
    res.send(await db.search(req.query['query']))
})

app.get('/login', async (req, res) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${clientId}`)
})

app.get('/api-logout', async (req, res) => {
    // Erasing token logs the user out.
    res.clearCookie('token')
    res.send('Logged out.')
})

app.post('/api-publish', async (req, res) => {
    const body = req.body
    console.log('Body: ', body)
    await db.set(body['package']['name'].toString(), JSON.stringify(body))
    res.code(200)
    res.send('Published')
})

app.get('/api-search', async (req, res) => {
    if (!req.query['query']) res.send([])
    res.send(await db.search(req.query['query']), req.query.limit || 5)
})

app.get('/api-get', async (req, res) => {
    if (!req.query['name']) return res.send({})
    res.send(await db.get(req.query['name']))
})

app.get('/api-list', async (req, res) => {
    res.send(await db.toJSON())
})

app.addHook('onError', (req, res, err, next) => {
    console.log(err)
    next()
})

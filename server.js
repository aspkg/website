const path = require('path')
const axios = require('axios').default
const { fastify } = require('fastify')
const fs = require('fs')
const ReziDB = require('rezidb')
// Database
const db = new ReziDB({
	name: 'aspkg-db-1',
	path: './database',
	cluster: false,
	cache: { maxSize: 1000 },
})

//db.clear()

// Import .env
require('dotenv').config({
	path: './config.env',
})

// Create server
const app = fastify()

app.register(require('fastify-static'), {
	root: __dirname,
	prefix: '/',
})

console.log(process.env.cookieSecret)

// Set cookie handler
app.register(require('fastify-cookie'), {
	secret: process.env.cookieSecret,
})

app.register(require('fastify-cors'), {
	// put your options here
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

async function logout(req, res) {
	// Erasing token logs the user out.
	res.clearCookie('token')
	res.send('Logged out.')
}

app.get('/logout', logout)

app.get('/api-logout', logout)

app.get('/api-login', async (req, res) => {
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
		const resp = await axios.post(url, body, opts)
		const token = resp.data.access_token

		console.log('Token: ', token)

		res.setCookie('token', token)
	}

	res.redirect('http://localhost:3000/')
})

app.post('/api-publish', async (req, res) => {
	const pkg = req.body
	console.log('Body: ', pkg)
	await db.set(pkg['name'].toString(), JSON.stringify(pkg))
	res.code(200)
	res.send('Published')
})

app.get('/api-search', async (req, res) => {
	if (!req.query['query']) res.send([])
	res.send(await db.search(req.query['query']), req.query.limit || 5)
})

app.get('/api-get', async (req, res) => {
	if (!req.query['name']) return res.send({})
	res.send((await db.get(req.query['name'])) || '{}')
})

app.get('/api-list', async (req, res) => {
	res.send(await db.toJSON())
})

app.addHook('onError', (req, res, err, next) => {
	console.log(err)
	next()
})

import { ServerResponse, Server } from 'http'
import { URL } from 'url'
import path from 'path'
import fs from 'fs'
// import * as queryString from 'query-string'
// import ReziDB from 'rezidb'
// @ts-ignore
import dotenv from 'dotenv'
import fetch from 'cross-fetch'
import { HttpRouter } from './Router'

// Database
// const db = new ReziDB({
// 	name: 'aspkg-db-1',
// 	path: './database',
// 	cluster: false,
// 	cache: { maxSize: 1000 },
// })

//db.clear()

// Import .env
dotenv.config({
	path: './config.env',
})

// Get secrets
const clientId = process.env.id
const clientSecret = process.env.secret
console.log('env vars:', clientId, clientSecret)

const server = new Server()
server.listen(3000, () => console.log('listening on http://localhost:3000'))

const router = new HttpRouter()
router.listen(server)

router.get('/login', (url, req, res) => {
	redirect(res, `https://github.com/login/oauth/authorize?client_id=${clientId}`)
})

router.get('/api-login', async (url, req, res) => {
	const code = url.searchParams.get('code')
	const token = url.searchParams.get('token')

	if (code && !token) {
		const body = {
			client_id: clientId,
			client_secret: clientSecret,
			code,
		}

		const headers = {
			'Content-Type': 'application/json',
		}

		const url = `https://github.com/login/oauth/access_token`

		// const resp = await axios.post(url, body, opts)
		const resp = await fetch(url, {
			method: 'POST',
			headers,
			body: JSON.stringify(body),
		})

		// TODO undici-fetch does not support response.formData() yet
		// const data = await resp.formData()
		// const token = data.get('access_token')
		const data = await resp.text()
		const token = data
			.split('&')
			.find((s) => s.includes('access_token'))!
			.split('=')[1]
		// This works too:
		// const origin = `http://${req.headers.host}`
		// const token = new URL(req.url!, origin).searchParams.get('access_token')

		setCookie(res, 'token', token)
	}

	redirect(res, 'http://localhost:3000')
})

router.get('/api-get', (url, req, res) => {
	const pkgName = url.searchParams.get('name')

	if (!pkgName) {
		res.writeHead(200, { 'Content-Type': mimeTypes['.json'] })
		return res.end('{}')
	}

	// TODO
	// db.get(pkgName).then(result => {
	// 	res.writeHead(200, { 'Content-Type': mimeTypes['.json'] })
	// 	res.end(JSON.stringify(result) || '{}')
	// })
})

// catch-all (at the end, so other handlers have the oppotunity to handle routes first).
router.get('*', (url, req, res) => {
	// IDEA: Make static serving into a plugin (similar to how fastify-static is a plugin) instead of inlining it all here.

	let filePath = '.' + url.pathname

	// Default serving of index.html files.
	if (filePath.endsWith('/')) filePath += 'index.html'

	const extname = String(path.extname(filePath)).toLowerCase()

	// The default mime type.
	let contentType = 'application/octet-stream'

	if (isSupportedExtension(extname)) contentType = mimeTypes[extname]

	fs.readFile(filePath, function (error, content) {
		if (error) {
			if (error.code == 'ENOENT') {
				// TODO, client-side 404 page.
				// fs.readFile('./404.html', function (error, content) {
				// 	res.writeHead(404, { 'Content-Type': 'text/html' })
				// 	res.end(content, 'utf-8')
				// })
				res.writeHead(404, { 'Content-Type': 'text/html' })
				res.end('<h1>404 not found</h1>', 'utf-8')
			} else {
				res.writeHead(500)
				res.end('500 error: ' + error.code + ' ..\n')
			}
		} else {
			res.writeHead(200, { 'Content-Type': contentType })
			res.end(content, 'utf-8')
		}
	})
})

function redirect(res: ServerResponse, url: string): void {
	res.statusCode = 302
	res.setHeader('Location', url)
	res.end()
}

function setCookie(res: ServerResponse, key: string, value: string): void {
	res.setHeader('Set-Cookie', key + '=' + value)
}

//// old code below /////////////////////////////////////////////////

// // Create server
// const app = fastify()

// app.register(require('fastify-static'), {
// 	root: __dirname,
// 	prefix: '/',
// })

// console.log(process.env.cookieSecret)

// // Set cookie handler
// app.register(require('fastify-cookie'), {
// 	secret: process.env.cookieSecret,
// })

// app.register(require('fastify-cors'), {
// 	// put your options here
// })

// // Package Searching
// app.get('/search', async (req, res) => {
// 	const query = req.query['query']
// 	if (!query) {
// 		// Send an empty list of results
// 		res.send(JSON.stringify({}))
// 		return
// 	}
// 	res.send(await db.search(req.query['query']))
// })

// async function logout(req, res) {
// 	// Erasing token logs the user out.
// 	res.clearCookie('token')
// 	res.send('Logged out.')
// }

// app.get('/logout', logout)

// app.get('/api-logout', logout)

// app.post('/api-publish', async (req, res) => {
// 	const pkg = req.body
// 	console.log('Body: ', pkg)
// 	await db.set(pkg['name'].toString(), JSON.stringify(pkg))
// 	res.code(200)
// 	res.send('Published')
// })

// app.get('/api-search', async (req, res) => {
// 	if (!req.query['query']) res.send([])
// 	res.send(await db.search(req.query['query']), req.query.limit || 5)
// })

// app.get('/api-list', async (req, res) => {
// 	res.send(await db.toJSON())
// })

// app.addHook('onError', (req, res, err, next) => {
// 	console.log(err)
// 	next()
// })

const mimeTypes = {
	'.html': 'text/html',
	'.js': 'text/javascript',
	'.css': 'text/css',
	'.json': 'application/json',
	'.png': 'image/png',
	'.jpg': 'image/jpg',
	'.gif': 'image/gif',
	'.svg': 'image/svg+xml',
	'.wav': 'audio/wav',
	'.mp4': 'video/mp4',
	'.woff': 'application/font-woff',
	'.ttf': 'application/font-ttf',
	'.eot': 'application/vnd.ms-fontobject',
	'.otf': 'application/font-otf',
	'.wasm': 'application/wasm',
	// ... add whatever we need ...
}

function isSupportedExtension(ext: string): ext is keyof typeof mimeTypes {
	return ext in mimeTypes
}

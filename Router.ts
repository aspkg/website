import { ServerResponse, IncomingMessage, Server } from 'http'

export type Handler = (url: URL, req: IncomingMessage, res: ServerResponse) => void

export class RouteHandlers {
	get: Map<string, Array<Handler>> = new Map()
	post: Map<string, Array<Handler>> = new Map()
}

export class Router {
	handlers: RouteHandlers = new RouteHandlers()

	get(path: string, handler: Handler) {
		let hasHandelers = this.handlers.get.has(path)
		if (!hasHandelers) this.handlers.get.set(path, [])
		let handlers: Array<Handler> = this.handlers.get.get(path)!
		handlers.push(handler)
	}

	post(path: string, handler: Handler) {
		let hasHandelers = this.handlers.get.has(path)
		if (!hasHandelers) this.handlers.get.set(path, [])
		let handlers: Array<Handler> = this.handlers.get.get(path)!
		handlers.push(handler)
	}

	listen(server: Server) {
		server.on('request', (req: IncomingMessage, res: ServerResponse) => {
			const _url = req.url

			if (!_url) return

			const origin = `http://${req.headers.host}`
			const url = new URL(_url, origin)

			console.log('method:', req.method)

			// TODO Make the following more DRY

			if (req.method === 'GET') {
				if (this.handlers.get.has(url.pathname)) {
					const handlers = this.handlers.get.get(url.pathname)!
					for (let i = 0, l = handlers.length; i < l; i++) handlers[i](url, req, res)
				}
				if (this.handlers.get.has('*')) {
					const handlers = this.handlers.get.get('*')!
					for (let i = 0, l = handlers.length; i < l; i++) handlers[i](url, req, res)
				}
			} else if (req.method === 'POST') {
				if (this.handlers.post.has(url.pathname)) {
					const handlers = this.handlers.post.get(url.pathname)!
					for (let i = 0, l = handlers.length; i < l; i++) handlers[i](url, req, res)
				}
				if (this.handlers.post.has('*')) {
					const handlers = this.handlers.post.get('*')!
					for (let i = 0, l = handlers.length; i < l; i++) handlers[i](url, req, res)
				}
			} else if (req.method === 'PUT') {
				// ...
			}
			// ...
		})
	}
}

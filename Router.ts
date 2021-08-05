import { ServerResponse, IncomingMessage, Server } from 'http'

export type Handler = (url: URL, req: IncomingMessage, res: ServerResponse) => void

export class RouteHandlers {
	get: Map<string, Handler[]> = new Map()
	post: Map<string, Handler[]> = new Map()
	put: Map<string, Handler[]> = new Map()
	// ...
}

export class HttpRouter {
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

			// When do we not have a URL? The type is `string | undefined`. Maybe that's for non-HTTP servers?
			if (!_url) return

			const origin = `http://${req.headers.host}`
			const url = new URL(_url, origin)

			// The following surely will change. It is simple right now and
			// only matches against specific paths like /foo/bar but it does
			// not yet support neat features like /foo/:id where :id would
			// cause it to grab any value at that position and pass it to a
			// handler in an `id` variable.

			let routeHandlers: Map<string, Handler[]> = new Map()
			let handlers: Handler[] = []

			if (req.method === 'GET') routeHandlers = this.handlers.get
			else if (req.method === 'POST') routeHandlers = this.handlers.post
			// else if (req.method === 'PUT') ...
			// ...

			if (routeHandlers.has(url.pathname)) handlers = routeHandlers.get(url.pathname)!
			else if (routeHandlers.has('*')) handlers = routeHandlers.get('*')!

			for (let i = 0, l = handlers.length; i < l; i++) handlers[i](url, req, res)
		})
	}
}

// Adapted from https://github.com/trusktr/trusktr.io/blob/54664bac7a3cb3d10c0d36ad0e4d6a11ab8e610e/meteor-app/client/imports/routes/Router.js

import { log } from '../node_modules/asdom/assembly/imports'
import { document, EmptyHistoryState, EventListener, window } from '../node_modules/asdom/assembly'

// function isRegularTypeScript() {
// 	const modes: StaticArray<i32> = [0, 1, 2]
// 	return !modes.includes(ASC_TARGET)
// }

export let isRegularTypeScript: boolean = typeof ASC_TARGET === 'undefined'

export class RouteHandler {
	// Subclasses or object literals can implement these.
	enter(): void {}
	leave(): void {}
}

export class Router extends EventListener {
	routes: Map<string, RouteHandler> = new Map()
	lastLocation: string = ''
	started: boolean = false

	// This is called by the popstate event
	handleEvent(): void {
		log('POPSTATE EVENT!!!!!!!!!!!!!!')
		this._triggerActions()
	}

	start(): void {
		if (this.started) throw new Error('Router is already started.')

		window.addEventListener('popstate', this)

		// trigger the route action for the first route that the page is already on.
		const pathname = document.location.pathname
		const search = document.location.search
		const hash = document.location.hash
		const currentLocation = pathname + search + hash
		this.go(currentLocation)
	}

	stop(): void {
		window.removeEventListener('popstate', this)
	}

	with(routeExpression: string, handler: RouteHandler): void {
		this.routes.set(routeExpression, handler)
	}

	/**
	 * @param url - Change the part after the domain name to anything (a
	 * path with or without the search and hash).
	 */
	go(url: string): void {
		window.history.pushState(new EmptyHistoryState(), '', url)
		this._triggerActions()
	}

	_triggerActions(): void {
		const pathname = document.location.pathname
		const search = document.location.search
		const hash = document.location.hash
		const currentLocation = pathname + search + hash

		// trigger actions only if the route URL actually changed. If it didn't
		// change, but the router is being started, trigger actions anyways.
		if (this.lastLocation == currentLocation) return

		const leaveHandlers: Array<RouteHandler> = []
		const enterHandlers: Array<RouteHandler> = []

		const keys = this.routes.keys()

		// get matching action sets for both lastLocation and currentLocation
		for (let i: i32 = 0, l = keys.length; i < l; i++) {
			const routeExpression = keys[i]
			const handler = this.routes.get(routeExpression)

			if (
				routeExpression === '*' ||
				this.lastLocation == routeExpression /*|| this.lastLocation.match(routeExpression)*/
			) {
				leaveHandlers.push(handler)
			}

			if (routeExpression === '*' || currentLocation == routeExpression /*|| currentLocation.match(routeExpression)*/) {
				enterHandlers.push(handler)
			}
		}

		// Trigger leave handlers for lastLocation first...
		for (let i: i32 = 0, l = leaveHandlers.length; i < l; i++) {
			const leaveHandler = leaveHandlers[i]
			leaveHandler.leave()
		}

		// ...then trigger enter handlers for currentLocation.
		for (let i: i32 = 0, l = enterHandlers.length; i < l; i++) {
			const enterHandler = enterHandlers[i]
			enterHandler.enter()
		}

		this.lastLocation = currentLocation
	}
}

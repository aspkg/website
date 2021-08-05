import { logDebug } from '../../node_modules/asdom/assembly/utils'
import { customElements, HTMLElement } from '../../node_modules/asdom/assembly/index'
import { log } from '../../node_modules/asdom/assembly/imports'
import { AspkgElement } from './AspkgElement'
import { RouteHandler, Router } from '../UrlRouter'

import './pages/Home'
import './pages/FourOhFour'
import './pages/PackageDetails'

class Route {
	path: string
	element: string
}

const routes: Array<Route> = [
	{ path: '/', element: 'home-page' },
	{ path: '/404', element: 'four-oh-four' },
	{ path: '/package', element: 'package-details' },
]

class CatchAllRoute extends RouteHandler {
	constructor(public content: MainContent) {
		super()
	}

	enter(): void {
		log('enter any route')
	}
	leave(): void {
		log('leave any route')
	}
}

class HomeRoute extends RouteHandler {
	constructor(public content: MainContent) {
		super()
	}

	enter(): void {
		log('enter / route')
		this.content.__route = routes[0]
		this.content.update()
	}
	leave(): void {
		log('leave / route')
	}
}

class PackageDetailsRoute extends RouteHandler {
	constructor(public content: MainContent) {
		super()
	}

	enter(): void {
		log('enter /package route')
		this.content.__route = routes[2]
		this.content.update()
	}
	leave(): void {
		log('leave /package route')
	}
}

export const router: Router = new Router()

class MainContent extends AspkgElement {
	static observedAttributes: string[] = []

	constructor() {
		super()
		this.useShadow = false
	}

	private __pageContainer: HTMLElement | null = null

	// TODO the initial value should be set based on the current route.
	__route: Route = routes[0]

	connectedCallback(): void {
		super.connectedCallback()

		this.__pageContainer = this.querySelector('.page-container') as HTMLElement

		router.with('/', new HomeRoute(this))
		router.with('/package', new PackageDetailsRoute(this))
		router.with('*', new CatchAllRoute(this))
		router.start()

		this.update()
	}

	disconnectedCallback(): void {
		router.stop()
	}

	update(): void {
		const el = this.__route.element
		logDebug('update: ' + el)
		this.__pageContainer!.innerHTML = `<${el}></${el}>`
	}

	template(): string {
		const hostSelector = this.shadowRoot != null ? ':host' : this.tagName.toLowerCase()

		return /*html*/ `
			<div class="page-container"></div>

			<style>
				${hostSelector} { display: contents }

				.page-container {
					display: contents;
				}
			</style>
        `
	}
}

customElements.define('main-content', () => new MainContent(), MainContent.observedAttributes)

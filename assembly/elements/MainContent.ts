import { clearInterval, setInterval } from '../../node_modules/ecmassembly/assembly'
import { customElements, HTMLElement } from '../../node_modules/asdom/assembly/index'
import { AspkgElement } from './AspkgElement'

import './pages/Home'
import './pages/FourOhFour'
import './pages/PackageDetails'

let ptr: usize = 0
let self: MainContent

class Route {
	path: string
	element: string
}

const routes: Array<Route> = [
	{ path: '/', element: 'home-page' },
	{ path: '/404', element: 'four-oh-four' },
	{ path: '/package', element: 'package-details' },
]

class MainContent extends AspkgElement {
	static observedAttributes: string[] = []

	constructor() {
		super()
		this.useShadow = false
	}

	private __pageContainer: HTMLElement | null = null

	// TODO the initial value should be set based on the current route.
	private __route: Route = routes[0]

	private __interval: i32 = -1

	connectedCallback(): void {
		super.connectedCallback()

		this.__pageContainer = this.querySelector('.page-container')! as HTMLElement

		this.update()

		ptr = this.__ptr__

		// On route changes, we'll change which page we render in the main content area.
		// For now, we we are emulating a random route change to show the proof of concept.
		// TODO put real routing in place (requires bindings for History API and similar).
		this.__interval = setInterval(() => {
			self = changetype<MainContent>(ptr)

			self.__route = routes[(routes.findIndex((r) => self.__route.path === r.path) + 1) % routes.length]

			self.update()
		}, 2000)
	}

	disconnectedCallback(): void {
		clearInterval(this.__interval)
	}

	update(): void {
		const el = this.__route.element
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

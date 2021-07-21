import { customElements } from '../../node_modules/asdom/assembly/index'
import { AspkgElement } from './AspkgElement'

import './NavBar'
import './MainContent'
import './TheFooter'

class AspkgApp extends AspkgElement {
	static observedAttributes: string[] = []

	constructor() {
		super()
		this.useShadow = false
	}

	template(): string {
		const hostSelector = this.shadowRoot != null ? ':host' : this.tagName.toLowerCase()

		return /*html*/ `
			<nav-bar></nav-bar>

			<main-content></main-content>

			<the-footer></the-footer>

			<style>
				${hostSelector} { display: block }

				div { }
			</style>
        `
	}
}

customElements.define('aspkg-app', () => new AspkgApp(), AspkgApp.observedAttributes)

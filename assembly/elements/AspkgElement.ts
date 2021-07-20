import { HTMLElement, ShadowRootInit } from '../../node_modules/asdom/assembly/index'

export abstract class AspkgElement extends HTMLElement {
	/** Subclasses should set this to an initial value of false if they wish to skip having a ShadowRoot. */
	protected useShadow: boolean = true

	connectedCallback(): void {
		const tmpl = this.template()

		if (this.useShadow) {
			let root = this.shadowRoot
			if (!root) root = this.attachShadow({ mode: 'open' } as ShadowRootInit)
			root.innerHTML = tmpl
		} else {
			this.innerHTML = tmpl
		}
	}

	abstract template(): string
}

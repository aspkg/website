// Export AssemblyScript-side glue code or not everything will work (for example the customElements API).
export * from '../node_modules/asdom/assembly/glue'

import { document, Element, HTMLElement } from '../node_modules/asdom/assembly'
import { setTimeout } from '../node_modules/ecmassembly/assembly/index'

// Registers all the custom elements
import './elements/index'

// Create the root of the app.
{
	const app = createElement('aspkg-app')
	document.body!.appendChild(app)
}

// Once Wasm is loaded, this will make the loader animation fade away.
let loader = document.querySelector('.heart-loader-container')!
setTimeout(() => {
	loader.setAttribute('class', loader.getAttribute('class') + ' fadeout')

	setTimeout(() => {
		loader.remove()
	}, 1000)
}, 1000)

// TODO update asdom bindings so this isn't required.
function createElement(tagName: string): Element {
	// For now, the workaround until document.createElement accepts names with hyphens is to use innerHTML
	if (tagName.includes('-')) {
		const d = document.createElement('div')
		d.innerHTML = `<${tagName}></${tagName}>`
		return d.firstElementChild as Element
	}

	return document.createElement(tagName)
}

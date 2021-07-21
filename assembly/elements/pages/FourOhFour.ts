import { customElements } from '../../../node_modules/asdom/assembly'
import { AspkgElement } from '../AspkgElement'

class FourOhFour extends AspkgElement {
	static observedAttributes: string[] = []

	constructor() {
		super()
		this.useShadow = false
	}

	template(): string {
		const hostSelector = this.shadowRoot != null ? ':host' : this.tagName.toLowerCase()

		return /*html*/ `
			<header
				class="text-left masthead text-center text-white d-flex"
				style="opacity: 1; filter: blur(0px) brightness(100%); background: #1d212c"
			>
				<div class="container my-auto">
					<div class="row">
						<div class="col-lg-10 mx-auto" style="padding-left: 0px; padding-right: 0px">
							<h1 class="text-uppercase"></h1>
							<span style="margin-top: 0px; font-size: 53px; font-weight: 400"><br /><strong>404</strong><br /></span>
						</div>
						<div class="col-lg-8 mx-auto" style="height: 73px; padding-right: 0px; padding-left: 0px">
							<span style="margin-bottom: 0px; padding: 0px; padding-top: 0px"
								><br /><strong>That's an error. We couldn't find what you were looking for.</strong><br /></span
							><span><br /></span>
						</div>
					</div>
				</div>
			</header>

			<style>
				${hostSelector} { display: block }

			</style>
        `
	}
}

customElements.define('four-oh-four', () => new FourOhFour(), FourOhFour.observedAttributes)

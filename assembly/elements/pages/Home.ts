import { customElements } from '../../../node_modules/asdom/assembly/index'
import { AspkgElement } from '../AspkgElement'

export * from '../ASLogoWordmark'

class HomePage extends AspkgElement {
	static observedAttributes: string[] = []

	constructor() {
		super()
		this.useShadow = false
	}

	template(): string {
		const hostSelector = this.shadowRoot != null ? ':host' : this.tagName.toLowerCase()

		return /*html*/ `
			<header
				class="masthead text-center text-white d-flex"
				style="
					/* background: url('assets/img/Best-Desktop-Wallpapers-Desktop-Wallpaper-Free-Download-56.jpeg') bottom / cover; */
					background: url('assets/img/starry-sky2.jpg') bottom / cover;
					/* background: url('https://www.assemblyscript.org/images/header.svg') bottom / cover; */
					background-color: #1d212c;
					opacity: 1;
					filter: blur(0px) brightness(100%);
				"
			>
				<div class="container my-auto">
					<div class="row">
						<div class="col-lg-10 mx-auto" style="padding-left: 0px; padding-right: 0px">
							<h1 class="text-uppercase"></h1>
							<as-logo-wordmark></as-logo-wordmark>
							<span style="margin-top: 0px; font-size: 53px; font-weight: 400"
								><br /><strong>Packages</strong><br
							/></span>
						</div>
						<div class="col-lg-8 mx-auto" style="height: 73px; padding-right: 0px; padding-left: 0px">
							<span style="margin-bottom: 0px; padding: 0px; padding-top: 0px"
								><br /><strong>Explore the power of AssemblyScript through a list of packages made for you</strong
								><br /></span
							><span><br /></span>
						</div>
					</div>
				</div>
			</header>
			<section id="services" style="background: #1d212c">
				<div class="container">
					<div class="row">
						<div class="col-lg-12 text-center">
							<h2 class="section-heading"></h2>
						</div>
					</div>
				</div>
				<div class="container">
					<div class="row">
						<div class="col-md-6 col-lg-3 text-center">
							<i
								class="fa fa-github-square"
								style="transform: scale(4); border-color: rgb(33, 37, 41); color: rgb(255, 255, 255); padding-top: 16px"
							></i>
							<div class="mx-auto service-box mt-5">
								<h3 class="mb-3"></h3>
								<p
									class="text-muted mb-0"
									style="color: rgb(255, 255, 255); border-left-color: rgb(255, 255, 255); filter: brightness(200%)"
								>
									GitHub Packages support for managing packages seamlessly
								</p>
							</div>
						</div>
						<div class="col-md-6 col-lg-3 text-center">
							<i class="fas fa-terminal" style="color: rgb(255, 255, 255); transform: scale(4); padding-top: 16px"></i>
							<div class="mx-auto service-box mt-5">
								<h3 class="mb-3"></h3>
								<p
									class="text-muted mb-0"
									style="background: rgba(255, 255, 255, 0); color: #ffffff; padding-top: 11px; filter: brightness(200%)"
								>
									CLI tool for publishing and managing packages
								</p>
							</div>
						</div>
						<div class="col-md-6 col-lg-3 text-center">
							<i class="fab fa-npm" style="transform: scale(4); color: rgb(255, 255, 255); padding-top: 16px"></i>
							<div class="mx-auto service-box mt-5">
								<h3 class="mb-3"></h3>
								<p class="text-muted mb-0" style="padding-top: 11px; filter: brightness(200%)">
									NPM support for downloading and installing packages
								</p>
							</div>
						</div>
						<div class="col-md-6 col-lg-3 text-center">
							<i class="fas fa-bolt" style="padding-top: 16px; transform: scale(4); color: rgb(255, 255, 255)"></i>
							<div class="mx-auto service-box mt-5">
								<h3 class="mb-3"></h3>
								<p class="text-muted mb-0" style="padding-top: 11px; filter: brightness(200%)">
									StackBlitz support for in-browser testing.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			<style>
				${hostSelector} { display: contents }


			</style>
        `
	}
}

customElements.define('home-page', () => new HomePage(), HomePage.observedAttributes)

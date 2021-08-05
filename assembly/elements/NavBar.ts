import { customElements, Element, EventListener } from '../../node_modules/asdom/assembly/index'
import { AspkgElement } from './AspkgElement'
import { router } from './MainContent'

class NavClickHandler extends EventListener {
	constructor(public path: string) {
		super()
	}

	handleEvent(): void {
		router.go(this.path)
	}
}

class NavBar extends AspkgElement {
	static observedAttributes: string[] = []

	constructor() {
		super()
		this.useShadow = false
	}

	connectedCallback(): void {
		super.connectedCallback()

		const homebtn = this.querySelector('.homebtn') as Element
		// homebtn.addEventListener('click', () => router.go('/')) // TODO not working, compiler crash
		homebtn.addEventListener('click', new NavClickHandler('/')) // but this works.

		const packagebtn = this.querySelector('.packagebtn') as Element
		// packagebtn.addEventListener('click', () => router.go('/package')) // TODO not working, compiler crash
		packagebtn.addEventListener('click', new NavClickHandler('/package')) // but this works.
	}

	template(): string {
		const hostSelector = this.shadowRoot != null ? ':host' : this.tagName.toLowerCase()

		return /*html*/ `
			<nav class="navbar-expand-lg fixed-top" id="mainNav">
				<img class="logo" src="assets/img/logo.svg" />
				<span class="site-name">AssemblyScript Packages</span>
				<a class="btn nav-btn homebtn">(temporary) Home</a>
				<a class="btn nav-btn packagebtn">(temporary) Package Details</a>
				<div class="collapse navbar-collapse" id="navbarResponsive-2"></div>
				<div class="mt-5 mt-md-0 search-area">
					<input
						class="float-left float-sm-right custom-search-input"
						type="search"
						placeholder="Search package list"
						name="query"
					/>
				</div>
				<button class="btn action-button nav-btn" type="button">
					<i class="icon-social-dropbox"></i>
				</button>
				<button class="btn action-button nav-btn" type="button">
					<i class="icon-bell"></i>
				</button>
				<a class="btn action-button loginBtn nav-btn" role="button" id="gh-avatar-icon" href="http://localhost:3000/login">
					<i class="icon-login"></i>
				</a>
				<div id="user-dropdown">
					<div id="user-dropdown-body" hidden="true">
						<a class="user-dropdown-items">Jairus Tanaka</a>
						<br>
						<a class="user-dropdown-items">Packages</a>
						<br>
						<a class="user-dropdown-items">Profile</a>
						<br>
						<a class="user-dropdown-items">Logout</a>
					</div>
				</div>
			</nav>

			<style>
				${hostSelector} { display: contents }

				nav {
					display: flex;
					align-items: center;
					background: white !important;
					box-sizing: border-box;
					height: 4.6rem;
					padding: 0.7rem 1.5rem;
          border-bottom: 1px solid #E6E6E6;
				}

				.logo {
					height: 3.2rem;
					margin-right: 30px;
				}

				.site-name {
					margin-right: 2rem;
					font-size: 1.3rem;
					font-weight: 600;
					color: #2c3e50;
					position: relative;
				}

				.search-icon {
					color: rgb(117, 117, 117);
				}

				.custom-search-input {
					/* Styles from assemblyscript doc site's search input. */
					cursor: text;
					width: 10rem;
					height: 2rem;
					color: #4e6e8e;
					display: inline-block;
					border: 1px solid #cfd4db;
					border-radius: 2rem;
					font-size: .9rem;
					line-height: 2rem;
					padding: 0 .5rem 0 2rem;
					outline: none;
					transition: all .2s ease;
					background: #fff url(https://www.assemblyscript.org/assets/img/search.83621669.svg) .6rem .5rem no-repeat;
					background-size: 1rem;

					/*Custom additions to make it look identical to AS site:*/
					text-indent: 0; /* Disable the indent that comes with the original design. */
					margin-right: 1.5rem;
					min-height: 34px; /*For some reason the above rem height does not match AS website, so using px here to match exactly.*/
				}

				.custom-search-input:focus {
					cursor: auto;
					border-color: #007acc;
				}

				.custom-search-input::selection {
					background: #027acc;
				}

				.nav-btn {
					color: rgb(191, 191, 191);
					border-radius: 100%;
					background: rgba(0, 0, 0, 0);
					width: auto;
					height: auto;
					padding: 0px;
					margin-right: 12px
				}

				.nav-btn:last-child {
					margin-right: 0px;
				}

				.nav-btn i {
					font-size: 20px;
				}

				.nav-btn:active,
				.nav-btn:focus,
				.nav-btn:hover {
					color: #027acc;
				}
				#user-dropdown {
					position: absolute;
					top: 4.6rem;
					right: 15px;
				}
				#user-dropdown-body {
					height: 250px;
					width: 200px;
					background-color: rgb(255, 255, 255);
					border-style: solid;
					border-width: 1px;
					border-color: rgb(191, 191, 191);
				}
			</style>
        `
	}
}

customElements.define('nav-bar', () => new NavBar(), NavBar.observedAttributes)

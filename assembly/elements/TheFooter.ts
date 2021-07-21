import { customElements } from '../../node_modules/asdom/assembly/index'
import { AspkgElement } from './AspkgElement'

class TheFooter extends AspkgElement {
	static observedAttributes: string[] = []

	constructor() {
		super()
		this.useShadow = false
	}

	template(): string {
		const hostSelector = this.shadowRoot != null ? ':host' : 'nav-bar'

		return /*html*/ `
            <section class="the-footer bg-dark text-white">
                <footer class="footer-dark">
                    <div class="container">
                        <div class="row">
                            <div class="col-sm-6 col-md-3 item">
                                <h3>Pages</h3>
                                <ul>
                                    <li>
                                        <a href="https://github.com/AssemblyScript/assemblyscript/blob/master/CONTRIBUTING.md">
                                            Publish
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://opencollective.com/assemblyscript">
                                            Help
                                        </a>
                                    </li>
                                    <li>
                                        <a href="http://localhost:3030/login">
                                            Login
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div class="col-sm-6 col-md-3 item">
                                <h3>Groups</h3>
                                <ul>
                                    <li>
                                        <a href="https://github.com/AssemblyScript/community-group">
                                            Community Group
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://github.com/AssemblyScript/working-group">
                                            Working Group
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://github.com/AssemblyScript/working-group#developer-experience">
                                            Developer Group
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div class="col-md-6 item text">
                                <h3>AssemblyScript Packages</h3>
                                <p>The official unofficial AssemblyScript package list.</p>
                            </div>
                            <div class="col item social">
                                <a href="https://discord.gg/assemblyscript"><i class="fab fa-discord"></i></a>
                                <a href="https://github.com/AssemblyScript"><i class="fab fa-github"></i></a>
                                <a href="#"><i class="fab fa-twitter"></i></a>
                                <a href="https://www.npmjs.com/package/assemblyscript"><i class="fab fa-npm"></i></a>
                            </div>
                        </div>
                    </div>
                </footer>
            </section>

            <style>
                ${hostSelector} { display: contents }

                .the-footer {
                    height: 97px;
                    padding: 0px 0px;
                    font-family: 'Open Sans', sans-serif;
                }

                .social {
                    margin-top: 40px;
                }
            </style>
        `
	}
}

customElements.define('the-footer', () => new TheFooter(), TheFooter.observedAttributes)

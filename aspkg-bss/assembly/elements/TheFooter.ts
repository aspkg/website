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
            <section class="bg-dark text-white" style="height: 97px; padding: 0px 0px">
                <footer class="footer-dark">
                    <div class="container">
                        <div class="row">
                            <div class="col-sm-6 col-md-3 item">
                                <h3>Pages</h3>
                                <ul>
                                    <li>
                                        <a
                                            href="https://github.com/AssemblyScript/assemblyscript/blob/master/CONTRIBUTING.md"
                                            style="font-family: 'Open Sans', sans-serif"
                                        >
                                            Publish
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://opencollective.com/assemblyscript"
                                            style="font-family: 'Open Sans', sans-serif"
                                        >
                                            Help
                                        </a>
                                    </li>
                                    <li style="font-family: 'Open Sans', sans-serif">
                                        <a href="http://localhost:3000/login">
                                            Login
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div class="col-sm-6 col-md-3 item">
                                <h3>Groups</h3>
                                <ul>
                                    <li>
                                        <a
                                            href="https://github.com/AssemblyScript/community-group"
                                            style="font-family: 'Open Sans', sans-serif"
                                        >
                                            Community Group
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://github.com/AssemblyScript/working-group"
                                            style="font-family: 'Open Sans', sans-serif"
                                        >
                                            Working Group
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://github.com/AssemblyScript/working-group#developer-experience"
                                            style="font-family: 'Open Sans', sans-serif"
                                        >
                                            Developer Group
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div class="col-md-6 item text">
                                <h3 style="font-family: 'Open Sans', sans-serif">AssemblyScript Packages</h3>
                                <p style="font-family: 'Open Sans', sans-serif">
                                    The unofficial official AssemblyScript package list.
                                </p>
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
            </style>
        `
    }
}

customElements.define('the-footer', () => new TheFooter(), TheFooter.observedAttributes)

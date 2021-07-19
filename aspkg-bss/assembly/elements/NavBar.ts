import { customElements } from '../../node_modules/asdom/assembly/index'
import { AspkgElement } from './AspkgElement'

class NavBar extends AspkgElement {
    static observedAttributes: string[] = []

    constructor() {
        super()
        this.useShadow = false
    }

    template(): string {
        const hostSelector = this.shadowRoot != null ? ':host' : 'nav-bar'

        return /*html*/ `
            <nav class="navbar navbar-dark navbar-expand-lg fixed-top" id="mainNav">
                <div class="container">
                    <img class="logo" src="assets/img/logo.svg" />
                    <div class="mt-5 mt-md-0 search-area">
                        <i class="fas fa-search float-left search-icon"></i>
                        <input
                            class="float-left float-sm-right custom-search-input"
                            type="search"
                            placeholder="Search package list"
                            name="query"
                        />
                    </div>
                    <div class="mt-5 mt-md-0 search-area"></div>
                    <div class="collapse navbar-collapse" id="navbarResponsive-2"></div>
                    <button class="btn action-button nav-btn" type="button">
                        <i class="icon-social-dropbox"></i>
                    </button>
                    <button class="btn action-button nav-btn" type="button">
                        <i class="icon-bell"></i>
                    </button>
                    <a class="btn action-button loginBtn nav-btn" role="button" id="gh-avatar-icon" href="/login">
                        <i class="icon-login"></i>
                    </a>
                </div>
            </nav>

            <style>
                ${hostSelector} { display: contents }
                
                nav {
                    background: rgb(26, 38, 52) !important;
                }
                
                .container {
                    display: flex;
                }
                
                .logo {
                    height: 42px;
                    margin-right: 30px;
                }
                
                .search-icon {
                    color: rgb(117, 117, 117);
                }
                
                .custom-search-input {
                    color: rgb(255, 255, 255);
                    border-color: rgb(117, 117, 117);
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
            </style>
        `
    }
}

customElements.define('nav-bar', () => new NavBar(), NavBar.observedAttributes)

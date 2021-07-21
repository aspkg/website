import { customElements } from '../../../node_modules/asdom/assembly/index'
import { AspkgElement } from '../AspkgElement'

class PackageDetails extends AspkgElement {
	static observedAttributes: string[] = []

	constructor() {
		super()
		this.useShadow = false
	}

	template(): string {
		const hostSelector = this.shadowRoot != null ? ':host' : this.tagName.toLowerCase()

		return /*html*/ `
			<section
				id="readme"
				style="
					background: #1a2634;
					font-size: 31px;
					height: auto;
					width: auto;
					margin-left: 40px;
					margin-right: 40px;
					margin-top: 107px;
					margin-bottom: 40px;
					border-radius: 10px;
					border: 1px solid rgb(40, 45, 50);
					padding-bottom: 128px;
				"
			>
				<div
					style="
						position: absolute;
						top: 107px;
						bottom: 40px;
						right: 40px;
						bottom: 0px;
						width: 28%;
						height: 90%;
						background: #1a2634;
						border-radius: 0px;
						font-weight: normal;
						padding-top: 0px;
						margin-top: 40px;
						margin-bottom: 40px;
						border-color: rgb(40, 45, 50);
						border-right: 1px solid rgb(40, 45, 50);
						border-left: 2px solid rgb(40, 45, 50);
						padding-bottom: 0px;
					"
				>
					<span style="padding-left: 15px; color: rgb(255, 255, 255); font-weight: bold; font-size: 18px">Install</span>
					<p
						style="font-size: 18px; color: rgb(255, 255, 255); margin-top: 15px; font-weight: bold; padding-left: 15px"
					></p>
					<p style="font-size: 18px; padding-left: 15px">
						<span
							id="pkg-install"
							style="font-size: 18px; color: rgb(255, 255, 255); background: rgba(9, 11, 16, 0.48); border-radius: 3px"
						>
							-
						</span>
					</p>
					<p style="color: rgb(255, 255, 255); font-size: 18px; font-weight: bold; padding-left: 15px; width: auto">
						Downloads
					</p>
					<p
						style="
							color: rgb(255, 255, 255);
							font-size: 18px;
							font-weight: normal;
							padding-left: 15px;
							width: auto;
							margin-bottom: 16px;
						"
						href="https://github.com/aspkg/example"
					>
						-
					</p>
					<p
						style="
							color: rgb(255, 255, 255);
							font-size: 18px;
							font-weight: bold;
							padding-left: 15px;
							width: auto;
							margin-bottom: 0px;
						"
					>
						GitHub
					</p>
					<a
						id="pkg-github-link"
						href="https://github.com/aspkg/example"
						style="
							color: rgb(255, 255, 255);
							font-size: 18px;
							padding-left: 15px;
							height: 27px;
							margin-top: 0px;
							margin-bottom: 16px;
							font-weight: normal;
						"
					>
						-
					</a>
					<p
						style="
							color: rgb(255, 255, 255);
							font-size: 18px;
							font-weight: bold;
							padding-left: 15px;
							width: auto;
							margin-bottom: 0px;
							padding-top: 16px;
						"
					>
						Issues
					</p>
					<a
						id="pkg-issues"
						href="https://github.com/aspkg/example"
						style="
							color: rgb(255, 255, 255);
							font-size: 18px;
							padding-left: 15px;
							height: 27px;
							margin-top: 0px;
							margin-bottom: 16px;
							font-weight: normal;
						"
					>
						-
					</a>
					<p
						style="
							color: rgb(255, 255, 255);
							font-size: 18px;
							font-weight: bold;
							padding-left: 15px;
							width: auto;
							padding-top: 16px;
						"
					>
						Dependencies
					</p>
					<p
						id="pkg-dependencies"
						style="color: rgb(255, 255, 255); font-size: 18px; font-weight: normal; padding-left: 15px; width: auto"
					>
						-
					</p>
					<p style="color: rgb(255, 255, 255); font-size: 18px; font-weight: bold; padding-left: 15px; width: auto">
						Dev Dependencies
					</p>
					<p
						id="pkg-dev-dependencies"
						style="color: rgb(255, 255, 255); font-size: 18px; font-weight: normal; padding-left: 15px; width: auto"
					>
						-
					</p>
					<p style="color: rgb(255, 255, 255); font-size: 18px; font-weight: bold; padding-left: 15px; width: auto">
						License
					</p>
					<p
						id="pkg-license"
						style="color: rgb(255, 255, 255); font-size: 18px; font-weight: normal; padding-left: 15px; width: auto"
					>
						-
					</p>
					<p style="color: rgb(255, 255, 255); font-size: 18px; font-weight: normal; padding-left: 15px">
						<a class="btn btn-primary" role="button" href="https://stackblitz.com/">Demo</a>
					</p>
				</div>
				<h1
					id="pkg-title"
					style="color: rgb(255, 255, 255); padding-left: 30px; margin-top: -104px; font-weight: bold; width: 69%"
				>
					-----
				</h1>
				<span
					id="pkg-version"
					style="
						color: rgb(117, 117, 117);
						font-size: 18px;
						padding-left: 30px;
						margin-top: 0px;
						padding-top: 0px;
						max-width: 69%;
					"
				>
					-----
				</span>
				<div class="col">
					<div></div>
				</div>
				<span style="color: rgb(255, 255, 255); font-size: 15px; padding-left: 30px; min-width: 0px; max-width: 69%">
					<img src="assets/img/avatar.jpg" style="width: 30px; border-radius: 57px; margin-right: 8px" />
					Jairus Tanaka
				</span>
				<p></p>
				<div style="width: 69%; padding-left: 30px; padding-right: 30px">
					<code
						id="pkg-readme"
						style="
							margin-top: 0px;
							text-align: left;
							padding-left: 0px;
							margin-right: 0px;
							padding-top: 0px;
							padding-right: 0px;
							color: rgb(204, 204, 204);
							margin-left: 0px;
							font-size: 13.125px;
						"
					>
						000000000
						<br />
						000000000000000000
						<br />
						000000000000000000000000000000
						<br />
						0000000000000000000000000
						<br />
						0000000000000000000000000000000000
						<br />
						00000000
						<br />
						000000000000000
						<br />
						0000000000
						<br /><br />
					</code>
				</div>
			</section>

			<style>
				${hostSelector} { display: block }

				div { }
			</style>
        `
	}
}

customElements.define('package-details', () => new PackageDetails(), PackageDetails.observedAttributes)

(function()  {
	let template = document.createElement("template");
	template.innerHTML = `
		<form id="form">
			<fieldset>
				<legend>Inputfield Properties</legend>
				<table>
					<tr>
						<td>Title</td>
						<td><input id="builder_title" type="text"></td>
					</tr>
					<tr>
						<td>Content</td>
						<td><input id="builder_content" type="text"></td>
					</tr>
					<tr>
						<td>Placeholder</td>
						<td><input id="builder_placeholder" type="text"></td>
					</tr>
					<tr>
						<td>Input value</td>
						<td><input id="builder_inputvalue" type="number"></td>
					</tr>
				</table>
				<input type="submit" style="display:none;">
			</fieldset>
		</form>
		<style>
		:host {
			display: block;
			padding: 1em 1em 1em 1em;
		}
		</style>
	`;

	class InputFieldNumericBuilderPanel extends HTMLElement {
		constructor() {
			super();
			this._shadowRoot = this.attachShadow({mode: "open"});
			this._shadowRoot.appendChild(template.content.cloneNode(true));
			this._shadowRoot.getElementById("form").addEventListener("submit", this._submit.bind(this));
		}

		_submit(e) {
			e.preventDefault();
			this.dispatchEvent(new CustomEvent("propertiesChanged", {
					detail: {
						properties: {
							title: this.title,
							content: this.content,
							placeholder: this.placeholder,
							inputvalue: this.inputvalue
						}
					}
			}));
		}

		set title(newTitle) {
			this._shadowRoot.getElementById("builder_title").value = newTitle;
		}

		get title() {
			return this._shadowRoot.getElementById("builder_title").value;
		}

		set content(newContent) {
			this._shadowRoot.getElementById("builder_content").value = newContent;
		}

		get content() {
			return this._shadowRoot.getElementById("builder_content").value;
		}

		set placeholder(newPlaceholder) {
			this._shadowRoot.getElementById("builder_placeholder").value = newPlaceholder;
		}

		get placeholder() {
			return this._shadowRoot.getElementById("builder_placeholder").value;
		}

		set inputvalue(newInputValue) {
			this._shadowRoot.getElementById("builder_inputvalue").value = newInputValue;
		}

		get inputvalue() {
			return this._shadowRoot.getElementById("builder_inputvalue").value;
		}

	}

	customElements.define("com-sap-sample-inputfieldnumeric-builder", InputFieldNumericBuilderPanel);
})();

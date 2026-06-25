(function() { 
	let template = document.createElement("template");
	template.innerHTML = `
		
<head>
  <meta charset="UTF-8">
  <title>Champ numérique avec texte espacé</title>
  <style>
    body {
      font-family: 'Segoe UI', sans-serif;
      background-color: #f4f4f4;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }

    .form-row {
      display: flex;
      align-items: center; /* Centrage vertical */
      gap: 40px; /* Écart horizontal */
      padding: 20px 40px;
      border-radius: 12px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }

    .input-container {
      position: relative;
      width: 250px;
    }

    .input-container input[type="number"] {
      width: 100%;
      padding: 12px 16px;
      border: 2px solid #ccc;
      border-radius: 8px;
      font-size: 16px;
      transition: border-color 0.3s, box-shadow 0.3s;
    }

    .input-container input:focus {
      border-color: #0078D4;
      box-shadow: 0 0 5px rgba(0, 120, 212, 0.5);
      outline: none;
    }

    .input-container label {
      position: absolute;
      top: -10px;
      left: 12px;
      background-color: #fff;
      padding: 0 4px;
      font-size: 14px;
      color: #0078D4;
    }

    .info-text {
      font-size: 15px;
      color: #333;
      max-width: 220px;
      line-height: 1.4;
    }
  </style>
</head>
<body>
  <div class="form-row">
    <div class="input-container">
      <label for="code" id="title"">Title</label>
      <input type="number" id="code" placeholder="Entrez un nombre">
    </div>
    <div class="info-text">
      <p id=content>123456</p>
    </div>
  </div>
</body>

	`;

	class InputFieldNumeric extends HTMLElement {
		constructor() {
			super(); 
			let shadowRoot = this.attachShadow({mode: "open"});
			shadowRoot.appendChild(template.content.cloneNode(true));
			this.addEventListener("change", event => {
				var event = new Event("onChange");
				this.dispatchEvent(event);
			});
  
      // Récupère information de l'inputfield
// this._shadowRoot.getElementById("content").addEventListener("input", (e) => {
//   this.setInputValue(Number(e.target.value));
// });

			// this.addEventListener("click", event => {
			// 	var event = new Event("onClick");
			// 	this.dispatchEvent(event);
			// });
			// this._props = {};
		}

		onCustomWidgetBeforeUpdate(changedProperties) {
			this._props = { ...this._props, ...changedProperties };
		}

		onCustomWidgetAfterUpdate(changedProperties) {
			// if ("color" in changedProperties) {
			// 	this.style["background-color"] = changedProperties["color"];
			// }
			// if ("opacity" in changedProperties) {
			// 	this.style["opacity"] = changedProperties["opacity"];
			// }
			if ("content" in changedProperties) {
				this.shadowRoot.getElementById('content').textContent = changedProperties["content"];
			}
			if ("title" in changedProperties) {
				this.shadowRoot.getElementById('title').textContent = changedProperties["title"];
			}
			if ("placeholder" in changedProperties) {
				this.shadowRoot.getElementById('code').placeholder = changedProperties["placeholder"];
			}
			if ("inputvalue" in changedProperties) {
				this.shadowRoot.getElementById('code').value = changedProperties["inputvalue"];
			}
		}
	}

	customElements.define("com-sap-sample-inputfieldnumeric", InputFieldNumeric);
})();



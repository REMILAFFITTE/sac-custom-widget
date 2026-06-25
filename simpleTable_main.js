(function () {
    /**
     * Template HTML du composant
     */
    const template = document.createElement("template");

    template.innerHTML = `
        <style>
            :host {
                display: block;
                padding: 10px;
            }
        </style>
        <div id="ui5_content"></div>
    `;

    class SimpleTable extends HTMLElement {

        constructor() {
            super();

            this._shadowRoot = this.attachShadow({ mode: "open" });
            this._shadowRoot.appendChild(template.content.cloneNode(true));

            this._container = this._shadowRoot.getElementById("ui5_content");

            this._initialized = false;
        }

        /**
         * Lifecycle hook appelé après chaque mise à jour SAC
         */
        onCustomWidgetAfterUpdate(changedProperties) {
            this._render();
        }

        /**
         * Initialisation UI5
         */
        
_initUI5(callback) {
    if (window.sap && window.sap.ui && window.sap.ui.getCore) {
        callback();
    } else {
        console.error("UI5 non disponible dans SAC");
    


        /**
         * Création de la table UI5
         */
  _render() {
    this._initUI5(() => {

        // Nettoyage
        this._container.innerHTML = "";

        // Création modèle
        const oModel = new sap.ui.model.json.JSONModel({
            data: [
                { name: "Alice", age: 30, city: "Paris" },
                { name: "Bob", age: 25, city: "Marseille" },
                { name: "Charlie", age: 35, city: "Lyon" }
            ]
        });

        // Table
        const oTable = new sap.m.Table({
            headerText: "Simple UI5 Table",
            columns: [
                new sap.m.Column({
                    header: new sap.m.Label({ text: "Name" })
                }),
                new sap.m.Column({
                    header: new sap.m.Label({ text: "Age" })
                }),
                new sap.m.Column({
                    header: new sap.m.Label({ text: "City" })
                })
            ]
        });

        const oTemplate = new sap.m.ColumnListItem({
            cells: [
                new sap.m.Text({ text: "{name}" }),
                new sap.m.Text({ text: "{age}" }),
                new sap.m.Text({ text: "{city}" })
            ]
        });

        oTable.setModel(oModel);
        oTable.bindItems("/data", oTemplate);

        oTable.placeAt(this._container);
    });
}
        }
    }

    customElements.define("com-sap-sample-tablesimple", SimpleTable);
})();

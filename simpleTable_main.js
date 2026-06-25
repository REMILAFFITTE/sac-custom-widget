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
            if (this._initialized) {
                callback();
                return;
            }

            if (window.sap && window.sap.ui && window.sap.ui.getCore) {
                this._initialized = true;
                callback();
            } else {
                // Charge dynamiquement UI5 si nécessaire (normalement déjà présent dans SAC)
                const script = document.createElement("script");
                script.src = "https://sapui5.hana.ondemand.com/resources/sap-ui-core.js";
                script.setAttribute("data-sap-ui-libs", "sap.m");
                script.setAttribute("data-sap-ui-theme", "sap_fiori_3");
                script.onload = () => {
                    this._initialized = true;
                    callback();
                };
                document.head.appendChild(script);
            }
        }

        /**
         * Création de la table UI5
         */
        _render() {
            this._initUI5(() => {
                sap.ui.getCore().attachInit(() => {

                    // Nettoyage du container
                    this._container.innerHTML = "";

                    // Modèle JSON local
                    const oModel = new sap.ui.model.json.JSONModel({
                        data: [
                            { name: "Alice", age: 30, city: "Paris" },
                            { name: "Bob", age: 25, city: "Marseille" },
                            { name: "Charlie", age: 35, city: "Lyon" }
                        ]
                    });

                    // Création de la table
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

                    // Template de ligne
                    const oTemplate = new sap.m.ColumnListItem({
                        cells: [
                            new sap.m.Text({ text: "{name}" }),
                            new sap.m.Text({ text: "{age}" }),
                            new sap.m.Text({ text: "{city}" })
                        ]
                    });

                    oTable.setModel(oModel);
                    oTable.bindItems("/data", oTemplate);

                    // Placement dans le DOM
                    oTable.placeAt(this._container);
                });
            });
        }
    }

    customElements.define("com-sap-sample-tablesimple", SimpleTable);
})();

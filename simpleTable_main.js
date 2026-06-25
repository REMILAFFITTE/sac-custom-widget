(function () {

    class SimpleTable extends HTMLElement {

        constructor() {
            super();

            this._container = document.createElement("div");
            this.appendChild(this._container);

            this._table = null;
            this._renderScheduled = false;
        }

        onCustomWidgetAfterUpdate(changedProperties) {
            this._scheduleRender();
        }

        /**
         * Evite les multi-rendering simultanés SAC
         */
        _scheduleRender() {
            if (this._renderScheduled) return;

            this._renderScheduled = true;

            // ✅ CRITIQUE : laisse SAC finir son cycle DOM
            setTimeout(() => {
                this._renderScheduled = false;
                this._render();
            }, 0);
        }

        _render() {
            if (!(window.sap && sap.ui && sap.ui.getCore)) {
                console.error("UI5 non disponible");
                return;
            }

            // ✅ Nettoyage UI5 précédent
            if (this._table) {
                this._table.destroy();
                this._table = null;
            }

            this._container.innerHTML = "";

            // ✅ ID unique obligatoire
            const containerId = "ui5_container_" + Date.now();
            this._container.id = containerId;

            // ✅ Données mock
            const oModel = new sap.ui.model.json.JSONModel({
                data: [
                    { name: "Alice", age: 30, city: "Paris5" },
                    { name: "Bob", age: 25, city: "Marseille" },
                    { name: "Charlie", age: 35, city: "Lyon" }
                ]
            });

            // ✅ Table UI5
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

            // ✅ CRITIQUE : vérifier que le DOM existe bien
            if (document.getElementById(containerId)) {
                oTable.placeAt(containerId);
                this._table = oTable;
            } else {
                console.error("Container non trouvé dans le DOM");
            }
        }
    }

    customElements.define("com-sap-sample-tablesimple", SimpleTable);

})();

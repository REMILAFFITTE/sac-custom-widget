(function () {

    class SimpleTable extends HTMLElement {

        constructor() {
            super();

            this._container = document.createElement("div");
            this.appendChild(this._container);

            this._table = null;
            this._model = null;

            this._renderScheduled = false;
        }

        /** SAC lifecycle */
        onCustomWidgetAfterUpdate(changedProperties) {
            this._scheduleRender();
        }

        /** évite multi render SAC */
        _scheduleRender() {
            if (this._renderScheduled) return;

            this._renderScheduled = true;

            setTimeout(() => {
                this._renderScheduled = false;
                this._render();
            }, 0);
        }

        /** build UI5 table */
        _render() {

            if (!(window.sap && sap.ui && sap.ui.getCore)) {
                console.error("UI5 non disponible");
                return;
            }

            // ✅ charger lib table si besoin
            sap.ui.getCore().loadLibrary("sap.ui.table");

            // ✅ cleanup
            if (this._table) {
                this._table.destroy();
                this._table = null;
            }

            this._container.innerHTML = "";

            const containerId = "ui5_container_" + Date.now();
            this._container.id = containerId;

            // ✅ modèle mock (remplaçable par SAC plus tard)
            const data = [];

            for (let i = 1; i <= 1000; i++) {
                data.push({
                    name: "User " + i,
                    age: Math.floor(Math.random() * 50) + 20,
                    city: ["Paris", "Marseille", "Lyon"][i % 3]
                });
            }

            this._model = new sap.ui.model.json.JSONModel({
                rows: data
            });

            // ✅ Table Grid UI5 (virtualisation native)
            const oTable = new sap.ui.table.Table({
                title: "SAP UI5 Grid Table (Virtual Scroll)",
                visibleRowCount: 10,                // nb lignes visibles
                firstVisibleRow: 0,
                selectionMode: "None",
                rows: "{/rows}",                   // binding principal

                // ✅ active virtual scroll
                navigationMode: "Scrollbar",

                // ✅ tri natif activé
                enableColumnReordering: true
            });

            // ✅ colonnes (tri natif UI5)
            oTable.addColumn(new sap.ui.table.Column({
                label: new sap.m.Label({ text: "Name" }),
                template: new sap.m.Text({ text: "{name}" }),
                sortProperty: "name"
            }));

            oTable.addColumn(new sap.ui.table.Column({
                label: new sap.m.Label({ text: "Age" }),
                template: new sap.m.Text({ text: "{age}" }),
                sortProperty: "age"
            }));

            oTable.addColumn(new sap.ui.table.Column({
                label: new sap.m.Label({ text: "City" }),
                template: new sap.m.Text({ text: "{city}" }),
                sortProperty: "city"
            }));

            oTable.setModel(this._model);

            if (document.getElementById(containerId)) {
                oTable.placeAt(containerId);
                this._table = oTable;
            }
        }
    }

    customElements.define("com-sap-sample-tablesimple", SimpleTable);

})();

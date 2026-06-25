
(function () {

    class SimpleTable extends HTMLElement {

        constructor() {
            super();

            // ✅ PAS de shadow DOM
            this._container = document.createElement("div");
            this.appendChild(this._container);
        }

        onCustomWidgetAfterUpdate(changedProperties) {
            this._render();
        }

        _render() {
            if (!(window.sap && sap.ui && sap.ui.getCore)) {
                console.error("UI5 non disponible");
                return;
            }

            // Nettoyage
            this._container.innerHTML = "";

            // ID unique (important pour UI5)
            const tableId = "table_" + Math.random().toString(36).substr(2, 9);
            this._container.id = tableId;

            // Modèle
            const oModel = new sap.ui.model.json.JSONModel({
                data: [
                    { name: "Alice", age: 30, city: "Paris" },
                    { name: "Bob", age: 25, city: "Marseille" },
                    { name: "Charlie", age: 35, city: "Lyon" }
                ]
            });

            // Table UI5
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

            // ✅ IMPORTANT : placeAt avec ID (string), pas DOM element
            oTable.placeAt(tableId);
        }
    }

    customElements.define("com-sap-sample-tablesimple", SimpleTable);

})();
``

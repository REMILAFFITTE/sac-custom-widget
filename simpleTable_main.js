(function () {

    class SimpleTable extends HTMLElement {

        constructor() {
            super();

            this._container = document.createElement("div");
            this.appendChild(this._container);

            this._table = null;
            this._renderScheduled = false;
        }

        onCustomWidgetAfterUpdate() {
            this._scheduleRender();
        }

        _scheduleRender() {
            if (this._renderScheduled) return;

            this._renderScheduled = true;

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

            sap.ui.getCore().loadLibrary("sap.ui.table");

            if (this._table) {
                this._table.destroy();
                this._table = null;
            }

            this._container.innerHTML = "";

            const containerId = "ui5_container_" + Date.now();
            this._container.id = containerId;

            const data = [];
            for (let i = 1; i <= 1000; i++) {
                data.push({
                    name: "User " + i,
                    age: Math.floor(Math.random() * 50) + 20,
                    city: ["Paris", "Marseille", "Lyon"][i % 3]
                });
            }

            const oModel = new sap.ui.model.json.JSONModel({
                rows: data
            });

            const oTable = new sap.ui.table.Table({
                title: "UI5 Table - Tri & Filtres",
                visibleRowCount: 10,
                selectionMode: "None",
                navigationMode: "Scrollbar",
                rows: "{/rows}"
            });

            oTable.addColumn(new sap.ui.table.Column({
                label: new sap.m.Label({ text: "Name" }),
                template: new sap.m.Text({ text: "{name}" }),
                sortProperty: "name",
                filterProperty: "name"
            }));

            oTable.addColumn(new sap.ui.table.Column({
                label: new sap.m.Label({ text: "Age" }),
                template: new sap.m.Text({ text: "{age}" }),
                sortProperty: "age",
                filterProperty: "age"
            }));

            oTable.addColumn(new sap.ui.table.Column({
                label: new sap.m.Label({ text: "City" }),
                template: new sap.m.Text({ text: "{city}" }),
                sortProperty: "city",
                filterProperty: "city"
            }));

            oTable.setModel(oModel);

            oTable.placeAt(containerId);

            this._table = oTable;
        }
    }

    customElements.define("com-sap-sample-tablesimple", SimpleTable);

})();
``

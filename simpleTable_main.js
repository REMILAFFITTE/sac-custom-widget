_render() {
    if (!(window.sap && sap.ui && sap.ui.getCore)) {
        console.error("UI5 non disponible");
        return;
    }

    if (this._table) {
        this._table.destroy();
        this._table = null;
    }

    this._container.innerHTML = "";

    const containerId = "ui5_container_" + Date.now();
    this._container.id = containerId;

    const oModel = new sap.ui.model.json.JSONModel({
        data: [
            { name: "Alice", age: 30, city: "Paris" },
            { name: "Bob", age: 25, city: "Marseille" },
            { name: "Charlie", age: 35, city: "Lyon" }
        ]
    });

    // ✅ handler de tri
    const onSort = (sPath) => {
        const oBinding = this._table.getBinding("items");

        // toggle asc/desc
        this._bSortDescending = !this._bSortDescending;

        const oSorter = new sap.ui.model.Sorter(sPath, this._bSortDescending);
        oBinding.sort(oSorter);
    };

    // ✅ Table avec colonnes triables
    const oTable = new sap.m.Table({
        headerText: "Simple UI5 Table",
        columns: [
            new sap.m.Column({
                header: new sap.m.Label({ text: "Name" }),
                sortProperty: "name",
                demandPopin: true
            }).attachPress(() => onSort("name")),

            new sap.m.Column({
                header: new sap.m.Label({ text: "Age" }),
                sortProperty: "age",
                demandPopin: true
            }).attachPress(() => onSort("age")),

            new sap.m.Column({
                header: new sap.m.Label({ text: "City" }),
                sortProperty: "city",
                demandPopin: true
            }).attachPress(() => onSort("city"))
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

    if (document.getElementById(containerId)) {
        oTable.placeAt(containerId);
        this._table = oTable;
    }
}

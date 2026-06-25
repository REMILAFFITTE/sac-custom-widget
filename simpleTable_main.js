_render() {

    if (!(window.sap && sap.ui && sap.ui.getCore)) {
        console.error("UI5 non disponible");
        return;
    }

    sap.ui.getCore().loadLibrary("sap.ui.table");

    // Cleanup
    if (this._table) {
        this._table.destroy();
        this._table = null;
    }

    this._container.innerHTML = "";

    const containerId = "ui5_container_" + Date.now();
    this._container.id = containerId;

    // ✅ Données mock volumineuses
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

    // ✅ TABLE GRID UI5
    const oTable = new sap.ui.table.Table({
        title: "UI5 Grid Table - Tri & Filtres natifs",
        visibleRowCount: 10,
        selectionMode: "None",
        navigationMode: "Scrollbar",

        rows: "{/rows}",

        enableColumnReordering: true,

        // ✅ UI filtrage activée globalement
        enableCellFilter: true
    });

    // ✅ COLONNES AVEC TRI + FILTRES NATIFS

    oTable.addColumn(new sap.ui.table.Column({
        label: new sap.m.Label({ text: "Name" }),
        template: new sap.m.Text({ text: "{name}" }),

        sortProperty: "name",       // ✅ tri natif
        filterProperty: "name"      // ✅ filtre natif
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

    if (document.getElementById(containerId)) {
        oTable.placeAt(containerId);
        this._table = oTable;
    }
}
``

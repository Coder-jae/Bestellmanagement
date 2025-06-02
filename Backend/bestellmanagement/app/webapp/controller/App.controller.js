sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("ui5.bestellmanagement.controller.App", {
        onInit: function () {
            // Leeres Modell für Bestellungen anlegen
            const oDataModel = new JSONModel();
            this.getView().setModel(oDataModel, "orders");
        },

        onShowHello: function () {
            const oODataModel = this.getView().getModel("invoice"); // <- Name aus manifest.json
            console.log(oODataModel)
            const oJSONModel = this.getView().getModel("orders");

            if (!oODataModel) {
                console.error("ODataModel 'invoice' nicht gefunden");
                return;
            }
            if (!oJSONModel) {
                console.error("ODataModel 'oJSONModel' nicht gefunden");
                return;
            }

            oODataModel.read("/Orders", {
                urlParameters: {
                    "$expand": "Items"
                },
                success: function (oData) {
                    console.log("Daten erfolgreich geladen:", oData);
                    oJSONModel.setData(oData);
                },
                error: function (oError) {
                    console.error("Fehler beim Laden:", oError);
                }
            });
        }

    });
});

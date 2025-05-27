sap.ui.define([
	"sap/ui/core/mvc/Controller"
], (Controller) => {
	"use strict";
	return Controller.extend("ui5.bestellmanagement.controller.App", {
        onShowHello: function () {
            // Zeige eine native JavaScript-Alert
            alert("Hello World");

            // Backend-Aufruf starten
            var oModel = this.getOwnerComponent().getModel();
            oModel.read("/Orders", {
                success: function (oData) {
                    console.log("Daten erfolgreich geladen:", oData);
                },
                error: function (oError) {
                    console.error("Fehler:", oError);
                }
            });
        }
    });
});
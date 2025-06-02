sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "ui5/bestellmanagement/model/models"
], function (UIComponent, Device, models) {
    "use strict";

    return UIComponent.extend("ui5.bestellmanagement.Component", {

        metadata: {
            manifest: "json"
        },

        init: function () {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // set the device model
            this.setModel(models.createDeviceModel(), "device");
        }
    });
});

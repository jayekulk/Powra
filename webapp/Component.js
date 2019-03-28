sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"zPowra/zPowra/model/models"
], function(UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("zPowra.zPowra.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			var oRootPath = jQuery.sap.getModulePath("zPowra.zPowra"); // your resource root
			var oImageModel = new sap.ui.model.json.JSONModel({
				path: oRootPath
			});

			this.setModel(oImageModel, "imageModel");
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// enable routing
			this.getRouter().initialize();

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
		}
	});
});
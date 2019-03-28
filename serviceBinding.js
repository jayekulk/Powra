function initModel() {
	var sUrl = "/sap/opu/odata/sap/ZODATA_APA_E_0279_POWRA_SRV/";
	var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
	sap.ui.getCore().setModel(oModel);
}
function initModel() {
	var sUrl = "/sap/opu/odata/sap/ZNW_SEACO_PORTAL_SECROLE_PGW_SRV/";
	var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
	sap.ui.getCore().setModel(oModel);
}
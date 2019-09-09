sap.ui.jsview("view.DepotInfoExport", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.DepotInfoExport
	*/ 
	getControllerName : function() {
		return "view.DepotInfoExport";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.DepotInfoExport
	*/ 
	createContent : function(oController) {
 		
		var oDepInfoExport = new depInfoExportView();
		
		var vDepInfoExportForm = oDepInfoExport.createDepInfoExport();
		
		this.page = new sap.m.Page("DepInfoExportPage", {
		
			showNavButton: false,				// page 2 should display a back button
			//navButtonPress: [ oController.navButtonPress, oController ],
			icon: "",
			content : [vDepInfoExportForm]
	});
	this.page.setShowHeader(false);
	this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
		
		return this.page;
	}

});
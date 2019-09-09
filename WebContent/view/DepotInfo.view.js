sap.ui.jsview("view.DepotInfo", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.DepotInfo
	*/ 
	getControllerName : function() {
		return "view.DepotInfo";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.DepotInfo
	*/ 
	createContent : function(oController) {
 		
		var oDepotInfo = new depotInfoView();
		
		var vDepotInfoForm = oDepotInfo.createDepotInfo();
		
		this.page = new sap.m.Page("DepotInformationPage", {
		
			showNavButton: false,				// page 2 should display a back button
			//navButtonPress: [ oController.navButtonPress, oController ],
			icon: "",
			content : [vDepotInfoForm]
	});
	this.page.setShowHeader(false);
	this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
		
		return this.page;
	}

});
sap.ui.jsview("view.DRVResultView", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.DepInvForRepair
	*/ 
	getControllerName : function() {
		return "view.DRVResultView";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.DepInvForRepair
	*/ 
	createContent : function(oController) {
		//$('#idHdrContent').html('Results for Depreciated Replacement Value');	//CHANGE HEADER CONTENT
		var oDepInvRepair = new depInvRepairView();
		var vDepInvRepairForm = oDepInvRepair.createDepInvRepair();
		oDepInvRepair.createDepInvRepairFormView();
		//oDepInvRepair.bindRepairStatus();
		
		this.page = new sap.m.Page("DepotInventoryForRepairPage", {
		
			showNavButton: false,				// page 2 should display a back button
			//navButtonPress: [ oController.navButtonPress, oController ],
			icon: "",
			content : [vDepInvRepairForm]
	});
	this.page.setShowHeader(false);
	this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
		
		return this.page;
	}

});
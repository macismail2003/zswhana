sap.ui.jsview("view.DepotInvStatusDetails", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.DepotInventory.DepotInvStatusDetails
	*/ 
	getControllerName : function() {
		return "view.DepotInvStatusDetails";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.DepotInventory.DepotInvStatusDetails
	*/ 
	createContent : function(oController) {
 		
		var oDepotInvStatusDetails = new DepotInventoryStatus();
		var vDepotInvStatusDetailsForm = oDepotInvStatusDetails.createDepotInvForDepotSTATUS();
		
		this.page = new sap.m.Page({
			showNavButton: false,				// page 2 should display a back button
			icon: "",
			content : [vDepotInvStatusDetailsForm]
		});
		this.page.setShowHeader(false);
		return this.page;
	}

});
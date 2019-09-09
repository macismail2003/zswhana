sap.ui.jsview("view.DepotInvHOLD", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.DepotInventory.DepotInvForHold
	*/ 
	getControllerName : function() {
		return "view.DepotInvHOLD";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.DepotInventory.DepotInvForHold
	*/ 
	createContent : function(oController) {
 		
		var oDepotInvForHold = new DepotInventoryHOLD();
		var vDepotInvForHoldForm = oDepotInvForHold.createDepotInvForHOLD();
		
		this.page = new sap.m.Page({
		
			showNavButton: false,				// page 2 should display a back button
			icon: "",
			content : [vDepotInvForHoldForm]
		});
		this.page.setShowHeader(false);
		return this.page;
	}

});
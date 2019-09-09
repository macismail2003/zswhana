sap.ui.jsview("view.DepotInvREPA", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.DepotInventory.DepotInvForRepair
	*/ 
	getControllerName : function() {
		return "view.DepotInvREPA";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.DepotInventory.DepotInvForRepair
	*/ 
	createContent : function(oController) {
 		
		var oDepotInvForRepair = new DepotInventoryREPA();
		var vDepotInvForRepairForm = oDepotInvForRepair.createDepotInvForREPA();
		
		this.page = new sap.m.Page({
			showNavButton: false,				// page 2 should display a back button
			icon: "",
			content : [vDepotInvForRepairForm]
		});
		this.page.setShowHeader(false);
	return this.page;
	}

});
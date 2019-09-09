sap.ui.jsview("view.RepairInvWEST", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.DepotInventory.RepairInvForWest
	*/ 
	getControllerName : function() {
		return "view.RepairInvWEST";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.DepotInventory.RepairInvForWest
	*/ 
	createContent : function(oController) {
 		
		var oRepairInvForWest = new RepairInventoryWEST();
		var vRepairInvForWestForm = oRepairInvForWest.createDepotInvForWEST();
		
		this.page = new sap.m.Page({
			showNavButton: false,				// page 2 should display a back button
			icon: "",
			content : [vRepairInvForWestForm]
		});
		this.page.setShowHeader(false);
		
		return this.page;
	}

});
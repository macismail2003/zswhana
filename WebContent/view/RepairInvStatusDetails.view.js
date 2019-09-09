sap.ui.jsview("view.RepairInvStatusDetails", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.DepotInventory.RepairInvStatusDetails
	*/ 
	getControllerName : function() {
		return "view.RepairInvStatusDetails";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.DepotInventory.RepairInvStatusDetails
	*/ 
	createContent : function(oController) {
 		
		var oRepairInvStatusDetails = new RepairInventoryStatus();
		var vRepairInvStatusDetailsForm = oRepairInvStatusDetails.createDepotInvForRepairSTATUS();
		
		this.page = new sap.m.Page({
		
			showNavButton: false,				// page 2 should display a back button
			icon: "",
			content : [vRepairInvStatusDetailsForm]
	});
		this.page.setShowHeader(false);
		return this.page;
	}

});
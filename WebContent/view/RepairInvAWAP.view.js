sap.ui.jsview("view.RepairInvAWAP", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.DepotInventory.RepairInvForAwap
	*/ 
	getControllerName : function() {
		return "view.RepairInvAWAP";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.DepotInventory.RepairInvForAwap
	*/ 
	createContent : function(oController) {
 		
		var oRepairInvForAwap = new RepairInventoryAWAP();
		var vRepairInvForAwapForm = oRepairInvForAwap.createDepotInvForAWAP();
		
		this.page = new sap.m.Page({
		
			showNavButton: false,				// page 2 should display a back button
			//navButtonPress: [ oController.navButtonPress, oController ],
			icon: "",
			content : [vRepairInvForAwapForm]
		});
		this.page.setShowHeader(false);
		
		return this.page;
	}

});
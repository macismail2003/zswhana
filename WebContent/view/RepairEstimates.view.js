sap.ui.jsview("view.RepairEstimates", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.RepairEstimates
	*/ 
	getControllerName : function() {
		return "view.RepairEstimates";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.RepairEstimates
	*/ 
	createContent : function(oController) {
		
		//LOAD RESOURCES FOR THIS VIEW
		sap.ui.localResources("js.RepairEstimates");
		jQuery.sap.require("js.RepairEstimates.repairAutoMulti");
		jQuery.sap.require("js.RepairEstimates.repairEstimatesSearch");
		jQuery.sap.require("js.utility");
		
		var oRepairEstimatesSearch = new repairEstimatesSearch();
		var vRepairEstimatesForm = oRepairEstimatesSearch.createRepairEstimatesSearch(oController);
		
 		this.page = new sap.m.Page({
			title: "View Repair Estimates",
			showNavButton: false,
			content: [vRepairEstimatesForm]
		});
 		this.page.setShowHeader(false);
 		return this.page;
	}

});
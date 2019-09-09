sap.ui.jsview("view.RepairCompletionFPU", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.RepairCompletionFPU
	*/ 
	getControllerName : function() {
		return "view.RepairCompletionFPU";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.RepairCompletionFPU
	*/ 
	createContent : function(oController) {
		var oRepairCompltn = new repaircompltnFPUView();
		var vRCFPUForm = oRepairCompltn.createRCFPUView();
		oRepairCompltn.populateDepotNameRCFPU();
		
		this.page = new sap.m.Page("RepairCompltnFPUPage", {
		
			showNavButton: false,				// page 2 should display a back button
			//navButtonPress: [ oController.navButtonPress, oController ],
			icon: "",
			content : [vRCFPUForm]
	});
	this.page.setShowHeader(false);
	this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
		
		return this.page;
	}

});
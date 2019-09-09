sap.ui.jsview("view.FPURepairEstimateSearchVw", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.CorrectMoveDate
	*/ 
	getControllerName : function() {
		return "view.FPURepairEstimateSearchVw";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.CorrectMoveDate
	*/ 
	createContent : function(oController) {
 		
		var oFPURepairEstmtSearch = new FixPartialRepairEstimateSearch();
		
		this.page = new sap.m.Page({
		
			showNavButton: false,				// page 2 should display a back button
			//navButtonPress: [ oController.navButtonPress, oController ],
			icon: "",
			content : [oFPURepairEstmtSearch.createRepairEstimate()]
	});
	this.page.setShowHeader(false);
	this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
		
		return this.page;
	}

});
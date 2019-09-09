sap.ui.jsview("view.MovOutToLease", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.MovOutToLease
	*/ 
	getControllerName : function() {
		return "view.MovOutToLease";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.MovOutToLease
	*/ 
	createContent : function(oController) {
 		
		var oMoveOutToLease = new moveOutToLeaseView();
		var vMoveOutToLeaseForm = oMoveOutToLease.createMoveOutToLease();
		oMoveOutToLease.populateDepotNameMOFPU();
		
		this.page = new sap.m.Page("MoveOutToLeasePage", {
		
			showNavButton: false,				// page 2 should display a back button
			//navButtonPress: [ oController.navButtonPress, oController ],
			icon: "",
			content : [vMoveOutToLeaseForm]
	});
	this.page.setShowHeader(false);
	this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
		
		return this.page;
	}

});
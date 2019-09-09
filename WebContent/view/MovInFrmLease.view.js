sap.ui.jsview("view.MovInFrmLease", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.MovInFrmLease
	*/ 
	getControllerName : function() {
		return "view.MovInFrmLease";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.MovInFrmLease
	*/ 
	createContent : function(oController) {
 		
		var oMoveInFromLease = new moveInFromLeaseView();
		var vMoveInFromLeaseForm = oMoveInFromLease.createMoveInFromLease();
		oMoveInFromLease.populateDepotNameMIFPU();
		this.page = new sap.m.Page({
		
			showNavButton: false,				// page 2 should display a back button
			//navButtonPress: [ oController.navButtonPress, oController ],
			icon: "",
			content : [vMoveInFromLeaseForm]
	});
	this.page.setShowHeader(false);
	this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
		
		return this.page;
	}

});
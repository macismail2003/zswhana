sap.ui.jsview("view.LesseeApprovalMultiple", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.LesseeApprovalMultiple
	*/ 
	getControllerName : function() {
		return "view.LesseeApprovalMultiple";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.LesseeApprovalMultiple
	*/ 
	createContent : function(oController) {
	var oLAMultiple = new LesseeApprovalMultipleView();
	oLAMultiple.populateDepotNameLAM();
		
		var vLAtMultipleForm = oLAMultiple.createLesseeApprovalMultipleView();
		
		this.page = new sap.m.Page("LAMultiplePage", {
		
			showNavButton: false,				// page 2 should display a back button
			//navButtonPress: [ oController.navButtonPress, oController ],
			icon: "",
			content : [vLAtMultipleForm]
	});
	this.page.setShowHeader(false);
	this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
		
		return this.page;
	}

});
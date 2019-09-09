sap.ui.jsview("view.ValidateMoveInMultipleNew", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.ValidateMoveInMultiple
	*/ 
	getControllerName : function() {
		return "view.ValidateMoveInMultipleNew";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.ValidateMoveInMultiple
	*/ 
	createContent : function(oController) {
 		
		var oValidateMoveInMultipleNew = new validateMoveInMultipleViewNew();
		
		var vValidateMoveInMultipleFormNew = oValidateMoveInMultipleNew.createValidateMoveInMultiple();
		
		this.page = new sap.m.Page("ValidateMoveInMultiplePageNew", {
		
			showNavButton: false,				// page 2 should display a back button
			//navButtonPress: [ oController.navButtonPress, oController ],
			icon: "",
			content : [vValidateMoveInMultipleFormNew]
	});
	this.page.setShowHeader(false);
	this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
		
		return this.page;
	}

});
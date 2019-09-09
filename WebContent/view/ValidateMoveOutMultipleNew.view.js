sap.ui.jsview("view.ValidateMoveOutMultipleNew", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.ValidateMoveOutMultiple
	*/ 
	getControllerName : function() {
		return "view.ValidateMoveOutMultipleNew";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.ValidateMoveOutMultiple
	*/ 
	createContent : function(oController) {
 		
		var oValidateMoveOutMultipleNew = new validateMoveOutMultipleViewNew();
		
		var vValidateMoveOutMultipleFormNew = oValidateMoveOutMultipleNew.createValidateMoveOutMultiple();
		
		this.page = new sap.m.Page("ValidateMoveOutMultiplePageNew", {
		
			showNavButton: false,				// page 2 should display a back button
			//navButtonPress: [ oController.navButtonPress, oController ],
			icon: "",
			content : [vValidateMoveOutMultipleFormNew]
	});
	this.page.setShowHeader(false);
	this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
		
		return this.page;
	}

});
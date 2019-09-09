sap.ui.jsview("view.ValidateMoveInMultiple", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.ValidateMoveInMultiple
	*/ 
	getControllerName : function() {
		return "view.ValidateMoveInMultiple";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.ValidateMoveInMultiple
	*/ 
	createContent : function(oController) {
 		
		var oValidateMoveInMultiple = new validateMoveInMultipleView();
		
		var vValidateMoveInMultipleForm = oValidateMoveInMultiple.createValidateMoveInMultiple();
		
		this.page = new sap.m.Page("ValidateMoveInMultiplePage", {
		
			showNavButton: false,				// page 2 should display a back button
			//navButtonPress: [ oController.navButtonPress, oController ],
			icon: "",
			content : [vValidateMoveInMultipleForm]
	});
	this.page.setShowHeader(false);
	this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
		
		return this.page;
	}

});
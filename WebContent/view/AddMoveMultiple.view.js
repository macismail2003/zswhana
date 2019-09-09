sap.ui.jsview("view.AddMoveMultiple", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.AddMoveMultiple
	*/ 
	getControllerName : function() {
		return "view.AddMoveMultiple";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.AddMoveMultiple
	*/ 
	createContent : function(oController) {
 		
		var oAddMovemntMultiple = new addMovemntMultipleView();
		
		oAddMovemntMultiple.populateDepotNameAMOM();
		
		var vAddMovemntMultipleForm = oAddMovemntMultiple.createAddMovemntMultiple();
		
		this.page = new sap.m.Page("AddMovemntMultiplePage", {
		
			showNavButton: false,				// page 2 should display a back button
			//navButtonPress: [ oController.navButtonPress, oController ],
			icon: "",
			content : [vAddMovemntMultipleForm]
	});
	this.page.setShowHeader(false);
	this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
		
		return this.page;
	}

});
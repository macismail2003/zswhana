sap.ui.jsview("view.AddMoveInMultiple", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.AddMoveInMultiple
	*/ 
	getControllerName : function() {
		return "view.AddMoveInMultiple";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.AddMoveInMultiple
	*/ 
	createContent : function(oController) {
 		
		var oAddMovemntInMultiple = new addMovemntInMultipleView();
		
		var vAddMovemntInMultipleForm = oAddMovemntInMultiple.createAddMovemntInMultiple();
		
		oAddMovemntInMultiple.populateDepotNameAMIM();
		
		this.page = new sap.m.Page("AddMovemntInMultiplePage", {
		
			showNavButton: false,				// page 2 should display a back button
			//navButtonPress: [ oController.navButtonPress, oController ],
			icon: "",
			content : [vAddMovemntInMultipleForm]
	});
	this.page.setShowHeader(false);
	this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
		
		return this.page;
	}

});
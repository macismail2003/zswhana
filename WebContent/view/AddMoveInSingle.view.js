sap.ui.jsview("view.AddMoveInSingle", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.AddMoveInSingle
	*/ 
	getControllerName : function() {
		return "view.AddMoveInSingle";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.AddMoveInSingle
	*/ 
	createContent : function(oController) {
 		
		var oAddMovemntInSingle = new addMovemntInSingleView();
		
		var vAddMovemntInSingleForm = oAddMovemntInSingle.createAddMovemntInSingle();
		
		oAddMovemntInSingle.populateDepotNameAMIS();
		
		this.page = new sap.m.Page("AddMovemntInSinglePage", {
		
			showNavButton: false,				// page 2 should display a back button
			//navButtonPress: [ oController.navButtonPress, oController ],
			icon: "",
			content : [vAddMovemntInSingleForm]
	});
	this.page.setShowHeader(false);
	this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
		
		return this.page;
	}

});
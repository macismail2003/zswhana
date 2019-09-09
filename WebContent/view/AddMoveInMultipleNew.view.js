sap.ui.jsview("view.AddMoveInMultipleNew", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.AddMoveInMultiple
	*/ 
	getControllerName : function() {
		return "view.AddMoveInMultipleNew";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.AddMoveInMultiple
	*/ 
	createContent : function(oController) {
 		
		var oAddMovemntInMultipleNew = new addMovemntInMultipleViewNew();
		
		var vAddMovemntInMultipleFormNew = oAddMovemntInMultipleNew.createAddMovemntInMultipleNew();
		
		oAddMovemntInMultipleNew.populateDepotNameAMIM();
		
		this.page = new sap.m.Page("AddMovemntInMultiplePageNew", {
		
			showNavButton: false,				// page 2 should display a back button
			//navButtonPress: [ oController.navButtonPress, oController ],
			icon: "",
			content : [vAddMovemntInMultipleFormNew]
	});
	this.page.setShowHeader(false);
	this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
		
		return this.page;
	}

});
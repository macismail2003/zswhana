sap.ui.jsview("view.AddMoveSingle", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.AddMoveSingle
	*/ 
	getControllerName : function() {
		return "view.AddMoveSingle";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.AddMoveSingle
	*/ 
	createContent : function(oController) {
 		
		var oAddMovemntSingle = new addMovemntSingleView();
		
		var vAddMovemntSingleForm = oAddMovemntSingle.createAddMovemntSingle();
		oAddMovemntSingle.populateDepotNameAMOS();
		
		this.page = new sap.m.Page("AddMovemntSinglePage", {
		
			showNavButton: false,				// page 2 should display a back button
			//navButtonPress: [ oController.navButtonPress, oController ],
			icon: "",
			content : [vAddMovemntSingleForm]
	});
	this.page.setShowHeader(false);
	this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
		
		return this.page;
	}

});
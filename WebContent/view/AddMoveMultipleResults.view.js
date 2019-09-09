sap.ui.jsview("view.AddMoveMultipleResults", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.AddMoveMultipleResults
	*/ 
	getControllerName : function() {
		return "view.AddMoveMultipleResults";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.AddMoveMultipleResults
	*/ 
	createContent : function(oController) {
 		
		var oAddMovemntMultipleRes = new addMovemntMultipleResView();
		
		var vAddMovemntMultipleResForm = oAddMovemntMultipleRes.createAddMovemntMultipleRes();
		
		//oAddMovemntMultipleRes.enableSubmitBtnAMOMR();
		
		this.page = new sap.m.Page("AddMovemntMultipleResPage", {
		
			showNavButton: false,				// page 2 should display a back button
			//navButtonPress: [ oController.navButtonPress, oController ],
			icon: "",
			content : [vAddMovemntMultipleResForm]
	});
	this.page.setShowHeader(false);
	this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
		
		return this.page;
	}

});
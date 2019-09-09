sap.ui.jsview("view.SubmitMoveInMultiple", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.SubmitMoveInMultiple
	*/ 
	getControllerName : function() {
		return "view.SubmitMoveInMultiple";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.SubmitMoveInMultiple
	*/ 
	createContent : function(oController) {
 		
		var oSubmitMovemntInMultiple = new submitMovemntInMultipleView();
		
		var vSubmitMovemntInMultipleForm = oSubmitMovemntInMultiple.createSubmitMovemntInMultiple();
		
		//oSubmitMovemntInMultiple.enableSubmitBtnSAMIM();
		
		this.page = new sap.m.Page("SubmitMovemntInMultiplePage", {
		
			showNavButton: false,				// page 2 should display a back button
			//navButtonPress: [ oController.navButtonPress, oController ],
			icon: "",
			content : [vSubmitMovemntInMultipleForm]
	});
	this.page.setShowHeader(false);
	this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
		
		return this.page;
	}

});
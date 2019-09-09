sap.ui.jsview("view.TankDetInMultiple", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.TankDetInMultiple
	*/ 
	getControllerName : function() {
		return "view.TankDetInMultiple";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.TankDetInMultiple
	*/ 
	createContent : function(oController) {
 		
		var oTankDetailsInMultiple = new tankDetailsInMultipleView();
		
		var vTankDetailsInMultipleForm = oTankDetailsInMultiple.createTankDetailsInMultiple();
		
		this.page = new sap.m.Page("TankDetailsInMultiplePage", {
		
			showNavButton: false,				// page 2 should display a back button
			//navButtonPress: [ oController.navButtonPress, oController ],
			icon: "",
			content : [vTankDetailsInMultipleForm]
	});
	this.page.setShowHeader(false);
	this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
		
		return this.page;
	}

});
sap.ui.jsview("view.CDASHM2", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.CDASHM2
	*/ 
	getControllerName : function() {
		return "view.CDASHM2";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.CDASHM2
	*/ 
	createContent : function(oController) {
 		
		var oCDASHM2 = new CDASHM2();
		
		var vCDASHM2Form = oCDASHM2.createCDASHM2Page();
		
		this.page = new sap.m.Page("CDASHM2Page", {
		
			showNavButton: false,				// page 2 should display a back button
			//navButtonPress: [ oController.navButtonPress, oController ],
			icon: "",
			content : [vCDASHM2Form]
	});
	this.page.setShowHeader(false);
	this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
		
		return this.page;
	}

});
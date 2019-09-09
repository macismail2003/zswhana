sap.ui.jsview("view.CDASHM1", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.CDASHM1
	*/ 
	getControllerName : function() {
		return "view.CDASHM1";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.CDASHM1
	*/ 
	createContent : function(oController) {
 		
		var oCDASHM1 = new CDASHM1();
		
		var vCDASHM1Form = oCDASHM1.createCDASHM1();
		
		this.page = new sap.m.Page("CDASHM1Page", {
		
			showNavButton: false,				// page 2 should display a back button
			//navButtonPress: [ oController.navButtonPress, oController ],
			icon: "",
			content : [vCDASHM1Form]
	});
	this.page.setShowHeader(false);
	this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
		
		return this.page;
	}

});
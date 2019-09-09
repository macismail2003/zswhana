sap.ui.jsview("view.CDASHMPIC0", {

	/** Specifies the Controller belonging to this View.
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.CDASHMPIC
	*/
	getControllerName : function() {
		return "view.CDASHMPIC0";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed.
	* Since the Controller is given to this method, its event handlers can be attached right away.
	* @memberOf view.CDASHMPIC
	*/
	createContent : function(oController) {

		var oCDASHMPIC = new CDASHMPIC();

		var vCDASHMPICForm = oCDASHMPIC.createCDASHMPICPage();

		this.page = new sap.m.Page("CDASHMPICPage", {

			showNavButton: false,				// page 2 should display a back button
			//navButtonPress: [ oController.navButtonPress, oController ],
			icon: "",
			content : [vCDASHMPICForm]
	});
	this.page.setShowHeader(false);
	this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);

		return this.page;
	}

});

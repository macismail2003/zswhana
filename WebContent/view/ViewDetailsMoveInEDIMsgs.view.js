sap.ui.jsview("view.ViewDetailsMoveInEDIMsgs", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.ViewDetailsMoveInEDIMsgs
	*/ 
	getControllerName : function() {
		return "view.ViewDetailsMoveInEDIMsgs";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.ViewDetailsMoveInEDIMsgs
	*/ 
	createContent : function(oController) {
 		
		var oViewDetMovInEDIMsgs = new viewDetMovInEDIMsgsView();
		
		var vViewDetMovInEDIMsgsForm = oViewDetMovInEDIMsgs.createViewDetMovInEDIMsgs();
		
		this.page = new sap.m.Page("ViewDetMovInEDIMsgs", {
		
			showNavButton: false,				// page 2 should display a back button
			//navButtonPress: [ oController.navButtonPress, oController ],
			icon: "",
			content : [vViewDetMovInEDIMsgsForm]
	});
	this.page.setShowHeader(false);
	this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
		
		return this.page;
	}

});
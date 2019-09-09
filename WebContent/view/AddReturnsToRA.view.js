sap.ui.jsview("view.AddReturnsToRA", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.OnlineReturns
	*/ 
	getControllerName : function() {
		return "view.AddReturnsToRA";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.OnlineReturns
	*/ 
	createContent : function(oController) {
		
		var oOnlineRet = new EDAddReturnView();
		var vReturnForm = oOnlineRet.createAddReturnView();
		oOnlineRet.getCityDataOnLoad();
		
		
		this.page = new sap.m.Page("AddReturnToRAPage", {
		
			showNavButton: false,				// page 2 should display a back button
			//navButtonPress: [ oController.navButtonPress, oController ],
			icon: "",
			content : [vReturnForm]
	});
	this.page.setShowHeader(false);
	this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
	busyDialog.close();
		return this.page;
	}

});
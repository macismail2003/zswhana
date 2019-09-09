sap.ui.jsview("view.onlinereturnsresult", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.onlinereturnsresult
	*/ 
	getControllerName : function() {
		return "view.onlinereturnsresult";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.onlinereturnsresult
	*/ 
	createContent : function(oController) {
		
	var oResult = new onlineRetResult();
	var vResultForm = oResult.createResult(oController);
	oResult.showResult();
		
		this.page = new sap.m.Page("OnlineResultPage", {
		
			showNavButton: false,				// page 2 should display a back button
			//navButtonPress: [ oController.navButtonPress, oController ],
			icon: "",
			content : [vResultForm]
	});
	this.page.setShowHeader(false);
	this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
	busyDialog.close();
		return this.page;
	}

});

sap.ui.jsview("view.LesseeApprovalMltplResults", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.LesseeApprovalMltplResults
	*/ 
	getControllerName : function() {
		return "view.LesseeApprovalMltplResults";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.LesseeApprovalMltplResults
	*/ 
	createContent : function(oController) {
		var oLAMultipleRes = new LAMultipleResultView();
		var vLAMResForm = oLAMultipleRes.createLAMultipleResView();
		
		this.page = new sap.m.Page("LAMResPage", {
			
			showNavButton: false,				// page 2 should display a back button
			//navButtonPress: [ oController.navButtonPress, oController ],
			icon: "",
			content : [vLAMResForm]
		});
		this.page.setShowHeader(false);
		this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
			
			return this.page;
	}

});
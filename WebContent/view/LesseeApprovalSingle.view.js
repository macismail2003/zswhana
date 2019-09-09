sap.ui.jsview("view.LesseeApprovalSingle", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.LesseeApprovalSingle
	*/ 
	getControllerName : function() {
		return "view.LesseeApprovalSingle";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.LesseeApprovalSingle
	*/ 
	createContent : function(oController) {
		var oLesseeApprovalSingleView = new LesseeApprovalSingleView();
		
		var vLesseeApprovalSingleForm = oLesseeApprovalSingleView.createLesseeApprovalSingleView();
		oLesseeApprovalSingleView.populateDepotNameLAS();
		
		this.page = new sap.m.Page("LesseeApprovalSinglePage", {
		
			showNavButton: false,				// page 2 should display a back button
			//navButtonPress: [ oController.navButtonPress, oController ],
			icon: "",
			content : [vLesseeApprovalSingleForm]
	});
	this.page.setShowHeader(false);
	this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
		
		return this.page;
	}
	

});
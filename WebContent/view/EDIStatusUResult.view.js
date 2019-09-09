sap.ui.jsview("view.EDIStatusUResult", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.AccountsSummary
	*/ 
	getControllerName : function() {
		return "view.EDIStatusUResult";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.AccountsSummary
	*/ 
	createContent : function(oController) {
		$('#idHdrContent').html('EDI Messages');	//CHANGE HEADER CONTENT
		var oResultView = new EDIStatusUResultView();
		var vResultForm = oResultView.createEDIFormResult();
		
		this.page = new sap.m.Page("EDIStatusUResultPage", {
			
			showNavButton: false,				// page 2 should display a back button
			//navButtonPress: [ oController.navButtonPress, oController ],
			icon: "",
			content : [vResultForm]
		});
		this.page.setShowHeader(false);
		this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
		
		return this.page;
	}

});
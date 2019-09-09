sap.ui.jsview("view.EDReturnDetailView", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.AddMoveSingle
	*/ 
	getControllerName : function() {
		return "view.EDReturnDetailView";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.AddMoveSingle
	*/ 
	createContent : function(oController) {
 		
		var oRaDetailView = new EDReturnDetailsView();
		var vRADetailsViewForm = oRaDetailView.createEDReturnDetailsView();
		
		this.page = new sap.m.Page("EDReturnDetailViewPage", {
		
			showNavButton: false,				// page 2 should display a back button
			//navButtonPress: [ oController.navButtonPress, oController ],
			icon: "",
			content : [vRADetailsViewForm]
	});
	this.page.setShowHeader(false);
	this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
		
		return this.page;
	}

});
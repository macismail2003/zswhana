sap.ui.jsview("view.EDISatusUView", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.EDISatusUView
	*/ 
	getControllerName : function() {
		return "view.EDISatusUView";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.EDISatusUView
	*/ 
	createContent : function(oController) {
		//$('#idHdrContent').html('EDI Messages');	//CHANGE HEADER CONTENT
		var oSearchView = new EDIStatusUView();
		var vSearchForm = oSearchView.createEDIForm();
		oSearchView.populateDepotNameEDIS();
		
		this.page = new sap.m.Page("EDIStatusUSearchPage", {
			
			showNavButton: false,				// page 2 should display a back button
			//navButtonPress: [ oController.navButtonPress, oController ],
			icon: "",
			content : [vSearchForm]
		});
		this.page.setShowHeader(false);
		this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
		
		return this.page;
	}

});
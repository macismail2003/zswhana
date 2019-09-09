sap.ui.jsview("view.PortalProcessingLogsView", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.PortalProcessingLogsView
	*/ 
	getControllerName : function() {
		return "view.PortalProcessingLogsView";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.PortalProcessingLogsView
	*/ 
	createContent : function(oController) {
		var oPortalProcsngLogView = new PortalProcsngLogsView();
		var vPPLForm = oPortalProcsngLogView.createPPLForm();
		oPortalProcsngLogView.populateDepotNamePPL();
		
		this.page = new sap.m.Page("PortalProcsngLogsPage", {
			
			showNavButton: false,				// page 2 should display a back button
			//navButtonPress: [ oController.navButtonPress, oController ],
			icon: "",
			content : [vPPLForm]
		});
		this.page.setShowHeader(false);
		this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
		
		return this.page;
	}

});
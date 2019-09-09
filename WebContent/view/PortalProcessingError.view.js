sap.ui.jsview("view.PortalProcessingError", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.PortalProcessingLogsView
	*/ 
	getControllerName : function() {
		return "view.PortalProcessingError";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.PortalProcessingLogsView
	*/ 
	createContent : function(oController) {
		var oPortalProcsngLogView = new PortalProcsngLogsView();
		var vPPLForm = oPortalProcsngLogView.createErrorPage();
		
		this.page = new sap.m.Page("PortalProcsngErrorPage", {
			
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
sap.ui.jsview("view.PortsDeports", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.PortsDeports
	*/ 
	getControllerName : function() {
		return "view.PortsDeports";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.PortsDeports
	*/ 
	createContent : function(oController) {
 		
		var oPortsDeports = new portsDeportsView();
		var vPortsDeportsForm = oPortsDeports.createPortsDeports();
		
		var oFDPopulateRegionObj = new GetOnLoadDataForPorts();
		oFDPopulateRegionObj.populateRegionFD();
		
		this.page = new sap.m.Page("PortsDeportsPage", {
		
			showNavButton: false,				// page 2 should display a back button
			//navButtonPress: [ oController.navButtonPress, oController ],
			icon: "",
			content : [vPortsDeportsForm]
	});
	this.page.setShowHeader(false);
	this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
		
		return this.page;
	}

});
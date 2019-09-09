sap.ui.jsview("view.EDITransmissionLog", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.EDITransmissionLog
	*/ 
	getControllerName : function() {
		return "view.EDITransmissionLog";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.EDITransmissionLog
	*/ 
	createContent : function(oController) {
 		
		var oediTransmissionLog = new ediTransmissionLogView();
		
		var vediTransmissionLogForm = oediTransmissionLog.createEDITransmissionLog();
		
		oediTransmissionLog.populateDepotNameEDITL();
		
		this.page = new sap.m.Page("EDITransmissionLogPage", {
		
			showNavButton: false,				// page 2 should display a back button
			//navButtonPress: [ oController.navButtonPress, oController ],
			icon: "",
			content : [vediTransmissionLogForm]
	});
	this.page.setShowHeader(false);
	this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
		
		return this.page;
	}

});
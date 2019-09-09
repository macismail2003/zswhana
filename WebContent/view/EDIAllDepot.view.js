sap.ui.jsview("view.EDIAllDepot", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.EDIAllDepot
	*/ 
	getControllerName : function() {
		return "view.EDIAllDepot";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.EDIAllDepot
	*/ 
	createContent : function(oController) {
 		
		var oEDIAllDepot = new EDIAllDepotView();
		var oEDITransDepot = new ediTransmissionLogView();
		
		var vEDIAllDepotForm = oEDIAllDepot.createEDIAllDepot();
							   oEDITransDepot.allDepotDetails();
		
		this.page = new sap.m.Page("EDIAllDepotPage", {
		
			showNavButton: false,				// page 2 should display a back button
			//navButtonPress: [ oController.navButtonPress, oController ],
			icon: "",
			content : [vEDIAllDepotForm]
	});
	this.page.setShowHeader(false);
	this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
		
		return this.page;
	}

});
sap.ui.jsview("view.OutstandingRelDet", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.OutstandingRelDet
	*/ 
	getControllerName : function() {
		return "view.OutstandingRelDet";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.OutstandingRelDet
	*/ 
	createContent : function(oController) {
 		
		var oOutstandingRelDetails = new outstandingRelDetailsView();
		
		var vOutstandingRelDetailsForm = oOutstandingRelDetails.createOutstandingRelDetails();
		oOutstandingRelDetails.createOutstandingRelDetailsFormView();
		this.page = new sap.m.Page("OutstandingRelDetailsPage", {
		
			showNavButton: false,				// page 2 should display a back button
			//navButtonPress: [ oController.navButtonPress, oController ],
			icon: "",
			content : [vOutstandingRelDetailsForm]
	});
	this.page.setShowHeader(false);
	this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
		
		return this.page;
	}

});
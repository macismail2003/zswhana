sap.ui.jsview("view.ORReturnDetails", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.ReturnDetails
	*/ 
	getControllerName : function() {
		return "view.ORReturnDetails";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.ReturnDetails
	*/ 
	createContent : function(oController) {
		
		var oReturnDetails = new returnDetailsView();
		var vReturnDetailsForm = oReturnDetails.createReturnDetails();
		oReturnDetails.createReturnDetailsForm();
		//oReturnDetails.bindReturnDetails();
		this.page = new sap.m.Page("ReturnDetailsPage", {
	
		showNavButton: false,				// page 2 should display a back button
		//navButtonPress: [ oController.navButtonPress, oController ],
		icon: "",
		content : [vReturnDetailsForm]
		});
		this.page.setShowHeader(false);
		this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
		
		return this.page;}

});
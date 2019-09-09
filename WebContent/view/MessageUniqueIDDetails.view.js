sap.ui.jsview("view.MessageUniqueIDDetails", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.MessageUniqueIDDetails
	*/ 
	getControllerName : function() {
		return "view.MessageUniqueIDDetails";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.MessageUniqueIDDetails
	*/ 
	createContent : function(oController) {
 		
		var oMessageUniqueIDDetails = new messageUniqueIDDetailsJLREDITLView();
		
		var vMessageUniqueIDDetailsForm = oMessageUniqueIDDetails.createMessageUniqueIDDetailsJLR();
		
		this.page = new sap.m.Page("MessageUniqueIDDetailsPage", {
		
			showNavButton: false,				// page 2 should display a back button
			//navButtonPress: [ oController.navButtonPress, oController ],
			icon: "",
			content : [vMessageUniqueIDDetailsForm]
	});
	this.page.setShowHeader(false);
	this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
		
		return this.page;
	}

});
sap.ui.jsview("view.SaleInvCityDetails", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.SaleInvCityDetails
	*/ 
	getControllerName : function() {
		return "view.SaleInvCityDetails";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.SaleInvCityDetails
	*/ 
	createContent : function(oController) {
 		
		var oSaleInvCityDet = new saleInvCityDetView();
		
		var vSaleInvCityDetForm = oSaleInvCityDet.createSaleInvCityDet();
		
		this.page = new sap.m.Page("SaleInvCityDetPage", {
		
			showNavButton: false,				// page 2 should display a back button
			//navButtonPress: [ oController.navButtonPress, oController ],
			icon: "",
			content : [vSaleInvCityDetForm]
	});
	this.page.setShowHeader(false);
	this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
		
		return this.page;
	}

});
sap.ui.jsview("view.SaleInvMakeOffer", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.SaleInvMakeOffer
	*/ 
	getControllerName : function() {
		return "view.SaleInvMakeOffer";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.SaleInvMakeOffer
	*/ 
	createContent : function(oController) {
 		
		var oSaleInvMakeOffer = new saleInvMakeOfferView();
		
		var vSaleInvMakeOfferForm = oSaleInvMakeOffer.createSaleInvMakeOffer();
		
		this.page = new sap.m.Page("SaleInvMakeOfferPage", {
		
			showNavButton: false,				// page 2 should display a back button
			//navButtonPress: [ oController.navButtonPress, oController ],
			icon: "",
			content : [vSaleInvMakeOfferForm]
	});
	this.page.setShowHeader(false);
	this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
		
		return this.page;
	}

});
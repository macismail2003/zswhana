sap.ui.jsview("view.SaleInvOverview", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.SaleInvOverview
	*/ 
	getControllerName : function() {
		return "view.SaleInvOverview";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.SaleInvOverview
	*/ 
	createContent : function(oController) {
 		
		var oSaleInvOverview = new saleInvOverviewView();
		
		var vSaleInvOverviewForm = oSaleInvOverview.createSaleInvOverview(oController);
		var oSaleGetData = new onLoadDataSaleInvOvrvw();
		oSaleGetData.GetLocationDataSI();
		oSaleGetData.PopulateEquipclassnEquipCatSaleInv();
		this.page = new sap.m.Page("SaleInvOverviewPage", {
		
			showNavButton: false,				// page 2 should display a back button
			//navButtonPress: [ oController.navButtonPress, oController ],
			icon: "",
			content : [vSaleInvOverviewForm]
	});
	this.page.setShowHeader(false);
	this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
		
		return this.page;
	}

});
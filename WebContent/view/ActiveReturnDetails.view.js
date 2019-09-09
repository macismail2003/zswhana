sap.ui.jsview("view.ActiveReturnDetails", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.DepotDashboard
	*/ 
	getControllerName : function() {
		return "view.ActiveReturnDetails";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.DepotDashboard
	*/ 
	createContent : function(oController) {
		
		var oActiveReturnDetails = new ActiveReturnDetails();
		var actReturnDetails = oActiveReturnDetails.createActiveReturn(oController);
		
	    this.page = new sap.m.Page({
				showNavButton: false,
				icon: "",
				content : [actReturnDetails]
		});
	    
		
		this.page.setShowHeader(false);
		//this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
		return this.page;
	}

});
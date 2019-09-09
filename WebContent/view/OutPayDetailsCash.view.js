sap.ui.jsview("view.OutPayDetailsCash", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.OutPayDetailsCash
	*/ 
	getControllerName : function() {
		return "view.OutPayDetailsCash";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.OutPayDetailsCash
	*/ 
	createContent : function(oController) {
 		
		var oOutPayDetCash = new outPayDetCashView();
		
		var vOutPayDetCashForm = oOutPayDetCash.createOutPayDetCash();
		oOutPayDetCash.createOutPayDetCashFormView();
		this.page = new sap.m.Page("OutPayDetCashPage", {
		
			showNavButton: false,				// page 2 should display a back button
			//navButtonPress: [ oController.navButtonPress, oController ],
			icon: "",
			content : [vOutPayDetCashForm]
	});
	this.page.setShowHeader(false);
	this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
		
		return this.page;
	}

});
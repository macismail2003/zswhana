sap.ui.jsview("view.OutPayDetailsCredit", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.OutPayDetailsCredit
	*/ 
	getControllerName : function() {
		return "view.OutPayDetailsCredit";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.OutPayDetailsCredit
	*/ 
	createContent : function(oController) {
 		
		var oOutPayDetCredit = new outPayDetCreditView();
		
		var vOutPayDetCreditForm = oOutPayDetCredit.createOutPayDetCredit();
		oOutPayDetCredit.createOutPayDetCreditFormView();
		
		this.page = new sap.m.Page("OutPayDetCreditPage", {
		
			showNavButton: false,				// page 2 should display a back button
			//navButtonPress: [ oController.navButtonPress, oController ],
			icon: "",
			content : [vOutPayDetCreditForm]
	});
	this.page.setShowHeader(false);
	this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
		
		return this.page;
	}

});
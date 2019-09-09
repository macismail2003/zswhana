sap.ui.jsview("view.PaymentAdvise", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.AccountsSummary
	*/ 
	getControllerName : function() {
		return "view.PaymentAdvise";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.AccountsSummary
	*/ 
	createContent : function(oController) {
		$('#idHdrContent').html('Payment Advise');	//CHANGE HEADER CONTENT
		var oPaymentAdvise = new PaymentAdvise();
		var vPaymentAdvise = oPaymentAdvise.createPaymentAdvise();
		
		
		this.page = new sap.m.Page("AccountsSummaryPage", {
			
			showNavButton: false,				// page 2 should display a back button
			//navButtonPress: [ oController.navButtonPress, oController ],
			icon: "",
			content : [vPaymentAdvise]
		});
		this.page.setShowHeader(false);
		this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
		
		return this.page;
	}

});
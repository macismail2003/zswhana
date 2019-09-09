sap.ui.jsview("view.OutPayView", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.OutPayCredit
	*/ 
	getControllerName : function() {
		return "view.OutPayView";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.OutPayCredit
	*/ 
	createContent : function(oController) {
 		
		var oOutPay = new OutStandingPaymentView();
		var vOutPayForm = oOutPay.createOutPayView();
		
		//security
		//var objUser = new loggedInU();
		LoggedInUserTypeOutPay = objLoginUser.getLoggedInUserType();
		if(LoggedInUserTypeOutPay != "SEACO"){
			sap.ui.getCore().byId("idPayViewForm").setVisible(false);
			oOutPay.GetOutStandingPayData();
		}
		else{
			sap.ui.getCore().byId("idPayViewForm").setVisible(true);
		}
		
		/*if(LoggedInUserTypeOutPay == "SEACO"){
			sap.ui.getCore().byId("idPayViewForm").setVisible(true);
		}
		else{
			sap.ui.getCore().byId("idPayViewForm").setVisible(false);
			oOutPay.GetOutStandingPayData();
		}*/
		
		this.page = new sap.m.Page("OutPayCreditPage", {
		
			showNavButton: false,				// page 2 should display a back button
			//navButtonPress: [ oController.navButtonPress, oController ],
			icon: "",
			content : [vOutPayForm]
	});
	this.page.setShowHeader(false);
	this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
		
		return this.page;
	}

});
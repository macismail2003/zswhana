sap.ui.jsview("view.AccountsSummary", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.AccountsSummary
	*/ 
	getControllerName : function() {
		return "view.AccountsSummary";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.AccountsSummary
	*/ 
	createContent : function(oController) {
		$('#idHdrContent').html('Accounts Summary');	//CHANGE HEADER CONTENT
		var oAccountsSummary = new accountsSummaryView();
		var vAccountsSummaryForm = oAccountsSummary.createAccountsSummary();
		
		
		//security
		//var objUser = new loggedInU();
		LoggedInUserTypeAccSumm = objLoginUser.getLoggedInUserType();
		if(($.inArray(LoggedInUserTypeAccSumm, ["DEPOT","FACTORY"])) != -1){
			var DepotCode = objLoginUser.getLoggedInUserID();
			oController.RetrieveAccountDetails(DepotCode);
			sap.ui.getCore().byId("idDepotCodeAccountSummary").setEnabled(false);
			sap.ui.getCore().byId("idDepotCodeAccountSummary").setValue(DepotCode);
			sap.ui.getCore().byId("idLblSpaceAccSumm").setVisible(false);
			sap.ui.getCore().byId("idBtnAccountSubmit").setVisible(false);
			oAccountsSummary.searchAccountSummary("SumCm");
		}
		else{
			sap.ui.getCore().byId("idDepotCodeAccountSummary").setEnabled(true);
			sap.ui.getCore().byId("idLblSpaceAccSumm").setVisible(true);
			sap.ui.getCore().byId("idBtnAccountSubmit").setVisible(true);
		}
		/*if(LoggedInUserTypeAccSumm == "SEACO"){
			sap.ui.getCore().byId("idDepotCodeAccountSummary").setEnabled(true);
			sap.ui.getCore().byId("idLblSpaceAccSumm").setVisible(true);
			sap.ui.getCore().byId("idBtnAccountSubmit").setVisible(true);
		}
		else{
			var DepotCode = objLoginUser.getLoggedInUserID();
			oController.RetrieveAccountDetails(DepotCode);
			sap.ui.getCore().byId("idDepotCodeAccountSummary").setEnabled(false);
			sap.ui.getCore().byId("idDepotCodeAccountSummary").setValue(DepotCode);
			sap.ui.getCore().byId("idLblSpaceAccSumm").setVisible(false);
			sap.ui.getCore().byId("idBtnAccountSubmit").setVisible(false);
			oAccountsSummary.searchAccountSummary("SumCm");
		}*/
		
		
		this.page = new sap.m.Page("AccountsSummaryPage", {
			
			showNavButton: false,				// page 2 should display a back button
			//navButtonPress: [ oController.navButtonPress, oController ],
			icon: "",
			content : [vAccountsSummaryForm]
		});
		this.page.setShowHeader(false);
		this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
		
		return this.page;
	}

});
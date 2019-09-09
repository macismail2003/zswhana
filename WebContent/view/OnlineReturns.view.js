sap.ui.jsview("view.OnlineReturns", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.OnlineReturns
	*/ 
	getControllerName : function() {
		return "view.OnlineReturns";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.OnlineReturns
	*/ 
	createContent : function(oController) {
		
		var oOnlineRet = new onlineRetView();
		var vReturnForm = oOnlineRet.createOnlineRet();
		var oGetData = new getDataOnlineReturns();
		
		//security
		//var objUser = new loggedInU();
		loggedInUserTypeOR = objLoginUser.getLoggedInUserType();
		if(loggedInUserTypeOR != "SEACO"){
			//oGetData.populateContractNo();
			//oGetData.populateUnitType("");
			oGetData.populateMultipleCustomerOR();
		}
		else{
			oGetData.populateCustomer();
		}
		
		/*if(loggedInUserTypeOR == "SEACO"){
			oGetData.populateCustomer();
		}
		else{
			oGetData.populateContractNo();
			oGetData.populateUnitType("");
		}*/
		//oGetData.bindExistingReturns("M");
		//oGetData.populateContractNo();
		//oGetData.populateDepot("");
		oGetData.populateCountryCity();
		//oGetData.populateUnitType("");
		
		this.page = new sap.m.Page("OnlineReturnPage", {
		
			showNavButton: false,				// page 2 should display a back button
			//navButtonPress: [ oController.navButtonPress, oController ],
			icon: "",
			content : [vReturnForm]
	});
	this.page.setShowHeader(false);
	this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
	busyDialog.close();
		return this.page;
	}

});
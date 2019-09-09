sap.ui.jsview("view.DepReplValue", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.DepReplValue
	*/ 
	getControllerName : function() {
		return "view.DepReplValue";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.DepReplValue
	*/ 
	createContent : function(oController) {
		$('#idHdrContent').html('Depreciated Replacement Value (DRV)');	//CHANGE HEADER CONTENT
		var oDepReplValue = new depReplValueView();
		var vDepReplValueForm = oDepReplValue.createDepReplValue(oController);
		
		//security
		//var objUser = new loggedInU();
		loggedInUserTypeDRV = objLoginUser.getLoggedInUserType();
		if(loggedInUserTypeDRV != "SEACO"){
			/*var DepotCode = objLoginUser.getLoggedInUserID();
			sap.ui.getCore().byId("idDepotCodeDRV").setEnabled(false);
			sap.ui.getCore().byId("idDepotCodeDRV").setValue(DepotCode);*/
			
			oDepReplValue.getMultipleCustomersDRV();
		}
		else{
			oDepReplValue.PopulateCustomersDRV();
		}
		
		/*if(loggedInUserTypeDRV == "SEACO"){
			sap.ui.getCore().byId("idDepotCodeDRV").setEnabled(true);
		}
		else{
			var DepotCode = objLoginUser.getLoggedInUserID();
			sap.ui.getCore().byId("idDepotCodeDRV").setEnabled(false);
			sap.ui.getCore().byId("idDepotCodeDRV").setValue(DepotCode);
		}*/
		
		this.page = new sap.m.Page("DepreciatedReplacementValuePage", {
		
			showNavButton: false,				// page 2 should display a back button
			//navButtonPress: [ oController.navButtonPress, oController ],
			icon: "",
			content : [vDepReplValueForm]
	});
	this.page.setShowHeader(false);
	this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
		
		return this.page;
	}

});
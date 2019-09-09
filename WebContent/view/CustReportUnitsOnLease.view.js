sap.ui.jsview("view.CustReportUnitsOnLease", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.CustReportUnitsOnLease
	*/ 
	getControllerName : function() {
		return "view.CustReportUnitsOnLease";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.CustReportUnitsOnLease
	*/ 
	createContent : function(oController) {
 		
		var oCustReportUnitsOnLease = new custReportUnitsOnLeaseView();
		var vCustReportUnitsOnLeaseForm = oCustReportUnitsOnLease.createCustReportUnitsOnLease();
		
		var oGetDataOnLoad = new onLoadDataUnitsOnLeaseCRUOL();
		oGetDataOnLoad.GetUserTypeIDCRUOL();
		//oGetDataOnLoad.GetCustomerIDCRUOL();
		//oGetDataOnLoad.GetOffHireDataCRUOH();
		//oGetDataOnLoad.GetUnitDescriptionCRUOH();
		
		this.page = new sap.m.Page("CustReportUnitsOnLeasePage", {
		
			showNavButton: false,				// page 2 should display a back button
			//navButtonPress: [ oController.navButtonPress, oController ],
			icon: "",
			content : [vCustReportUnitsOnLeaseForm]
	});
	this.page.setShowHeader(false);
	this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
		
		return this.page;
	}

});
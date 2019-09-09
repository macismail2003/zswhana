sap.ui.jsview("view.CustReportUnitsOffHire", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.CustReportUnitsOffHire
	*/ 
	getControllerName : function() {
		return "view.CustReportUnitsOffHire";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.CustReportUnitsOffHire
	*/ 
	createContent : function(oController) {
 		
		var oCustReportUnitsOffHire = new custReportUnitsOffHireView();
		var vCustReportUnitsOffHireForm = oCustReportUnitsOffHire.createCustReportUnitsOffHire();
		
		var oGetDataOnLoad = new onLoadDataUnitsOffHireCRUOH();
		//oGetDataOnLoad.GetCustomerCRUOH();
		oGetDataOnLoad.GetUserTypeIDCRUOH();
		oGetDataOnLoad.GetOffHireDataCRUOH();
		oGetDataOnLoad.GetUnitDescriptionCRUOH();
		
		this.page = new sap.m.Page("CustReportUnitsOffHirePage", {
		
			showNavButton: false,				// page 2 should display a back button
			//navButtonPress: [ oController.navButtonPress, oController ],
			icon: "",
			content : [vCustReportUnitsOffHireForm]
	});
	this.page.setShowHeader(false);
	this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
		
		return this.page;
	}

});
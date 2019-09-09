sap.ui.jsview("view.CustReportPMRReport", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.AccountsSummary
	*/ 
	getControllerName : function() {
		return "view.CustReportPMRReport";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.AccountsSummary
	*/ 
	createContent : function(oController) {
		var oCustReportPMRView = new CustReportPMRView();
		var vCustReportPMRViewForm = oCustReportPMRView.createCustReportPMRView();
		var loggedInUserTypePMR = objLoginUser.getLoggedInUserType();
		if(loggedInUserTypePMR == "SEACO"){
			oCustReportPMRView.populateCustomerCustPMR();
		}
		else{
			oCustReportPMRView.populateMultipleCustomerCustPMR();
		}
		
		oCustReportPMRView.populateLocationCustPMR();
		
		this.page = new sap.m.Page("CustReportPMRReportPage", {
			
			showNavButton: false,				// page 2 should display a back button
			//navButtonPress: [ oController.navButtonPress, oController ],
			icon: "",
			content : [vCustReportPMRViewForm]
		});
		this.page.setShowHeader(false);
		this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
		
		return this.page;
	}

});
sap.ui.jsview("view.OutstandingReleases", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.OutstandingReleases
	*/ 
	getControllerName : function() {
		return "view.OutstandingReleases";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.OutstandingReleases
	*/ 
	createContent : function(oController) {
 		
		var oOutstandingReleases = new outstandingReleasesView();
		var vOutstandingReleasesForm = oOutstandingReleases.createOutstandingReleases();
		
		//security
		//var objUser = new loggedInU();
		LoggedInUserTypeOutRel = objLoginUser.getLoggedInUserType();
		if(LoggedInUserTypeOutRel != "SEACO"){
			sap.ui.getCore().byId("idOutRelViewForm").setVisible(false);
			oOutstandingReleases.bindOutstandingReleasesSI();
		}
		else{
			sap.ui.getCore().byId("idOutRelViewForm").setVisible(true);
		}
		
		/*if(LoggedInUserTypeOutRel == "SEACO"){
			sap.ui.getCore().byId("idOutRelViewForm").setVisible(true);
		}
		else{
			sap.ui.getCore().byId("idOutRelViewForm").setVisible(false);
			oOutstandingReleases.bindOutstandingReleasesSI();
		}*/
		
		this.page = new sap.m.Page("OutstandingReleasesPage", {
		
			showNavButton: false,				// page 2 should display a back button
			//navButtonPress: [ oController.navButtonPress, oController ],
			icon: "",
			content : [vOutstandingReleasesForm]
	});
	this.page.setShowHeader(false);
	this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
		
		return this.page;
	}

});
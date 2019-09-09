sap.ui.jsview("view.GetSupportNewUser", {

	getControllerName: function () {
		return "view.GetSupportNewUser";
	},
	createContent: function (oController) {
		
		var oGSNewUser = new getSupportNewUser();
		var vGSNewUser = oGSNewUser.createInitialPage();
		
		this.page = new sap.m.Page("getSupportNewUserPage", {
		
			showNavButton: false,				// page 2 should display a back button
			//navButtonPress: [ oController.navButtonPress, oController ],
			icon: "",
			content : [vGSNewUser]
	});
	this.page.setShowHeader(false);
	this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
	return this.page;
	}
});

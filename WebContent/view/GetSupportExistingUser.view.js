sap.ui.jsview("view.GetSupportExistingUser", {

	getControllerName: function () {
		return "view.GetSupportExistingUser";
	},
	createContent: function (oController) {
		
		var oGSExistingUser = new getSupportExistingUser();
		var vGSExistingUser = oGSExistingUser.createInitialPage();
		
		this.page = new sap.m.Page("getSupportExistingUserPage", {
		
			showNavButton: false,				// page 2 should display a back button
			//navButtonPress: [ oController.navButtonPress, oController ],
			icon: "",
			content : [vGSExistingUser]
	});
	this.page.setShowHeader(false);
	this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
	return this.page;
	}
});

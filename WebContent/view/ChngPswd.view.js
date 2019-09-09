sap.ui.jsview("view.ChngPswd", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf inventoryoverview.Login
	*/ 
	getControllerName : function() {
		return "view.ChngPswd";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf inventoryoverview.Login
	*/ 
	createContent : function(oController) {
		
		var oLoginView = new changePasswordView();
		var vLoginForm = oLoginView.createChngPswdView();
		
		this.page = new sap.m.Page("ChngPswdPage", {
			title: "{i18n>page2Title}",
			showNavButton: false,				// page 2 should display a back button
			//navButtonPress: [ oController.navButtonPress, oController ],
			icon: "",
			content : [vLoginForm]
		});
		this.page.setShowHeader(false);
		this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
		//this.page.setHeight("25%");
		
		// done
		return this.page;
	
	}

});
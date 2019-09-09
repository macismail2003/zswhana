sap.ui.jsview("view.DepotDashboard", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.DepotDashboard
	*/ 
	getControllerName : function() {
		return "view.DepotDashboard";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.DepotDashboard
	*/ 
	createContent : function(oController) {
		var oDepotInvManagerView = new DepotDashboard();
		var dashBoardContent = oDepotInvManagerView.callDepotPopup();
		
	    this.page = new sap.m.Page("depotDashPage",{
				showNavButton: false,
				icon: "",
				content : [dashBoardContent]
		});
	    
		
		this.page.setShowHeader(false);
		return this.page;
	},
	

});
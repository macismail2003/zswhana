sap.ui.jsview("view.InventoryDetail", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.InventoryDetail
	*/ 
	getControllerName : function() {
		return "view.InventoryDetail";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.InventoryDetail
	*/ 
	createContent : function(oController) {
		//LOAD RESOURCES FOR THIS VIEW
		sap.ui.localResources("js.InventoryOverview");
		jQuery.sap.require("js.InventoryOverview.InventoryDetail");
		
		var oInventoryDetailView = new InventoryDetail();
		var vDetailView = oInventoryDetailView.createdetailView();
		
		this.page = new sap.m.Page("idInvDetailPage",{
			title: "Inventory Details",
			showNavButton: true,				// page 2 should display a back button
			navButtonPress: [ oController.navButtonPress, oController ],
			content: [
			          vDetailView
			]
		});
		
		this.page.setShowHeader(false);
		this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
		return this.page;
	}

});
sap.ui.jsview("view.Inventory", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.Inventory
	*/ 
	getControllerName : function() {
		return "view.Inventory";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.Inventory
	*/ 
	createContent : function(oController) {
		
		var oInventorySearch = new inventorySearch();
		var vInventoryForm = oInventorySearch.createInventorySearch(oController);
 		this.page = new sap.m.Page({
			title: "View Inventory",
			showNavButton: false,
			content: [vInventoryForm]
		});
 		this.page.setShowHeader(false);
 		return this.page;
	}

});

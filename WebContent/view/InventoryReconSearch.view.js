sap.ui.jsview("view.InventoryReconSearch", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.InventoryReconSearch
	*/ 
	getControllerName : function() {
		return "view.InventoryReconSearch";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.InventoryReconSearch
	*/ 
	createContent : function(oController) {
		
		//LOAD RESOURCES FOR THIS VIEW
		sap.ui.localResources("js.InventoryRecon");
		jQuery.sap.require("js.InventoryRecon.inventoryReconSearch");
		jQuery.sap.require("js.utility");
		
		var oInventoryReconSearch = new inventoryReconSearch();
		var vInventoryReconForm = oInventoryReconSearch.createInventorySearch(oController);
 		this.page = new sap.m.Page({
			title: "Inventory Reconciliation",
			showNavButton: false,
			content: [vInventoryReconForm]
		});
 		this.page.setShowHeader(false);
 		return this.page;
	}

});

sap.ui.jsview("view.DepotInvAVLB", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.DepotInventory.DepotInvForAvlb
	*/ 
	getControllerName : function() {
		return "view.DepotInvAVLB";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.DepotInventory.DepotInvForAvlb
	*/ 
	createContent : function(oController) {
 		
		var oDepotInvForAvlb = new DepotInventoryAVLB();
		var vDepotInvForAvlbForm = oDepotInvForAvlb.createDepotInvForAvlb();
		
		this.page = new sap.m.Page({
			showNavButton: false,				
			icon: "",
			content : [vDepotInvForAvlbForm]
	});
	this.page.setShowHeader(false);
	return this.page;
	}

});
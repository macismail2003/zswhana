sap.ui.jsview("view.Release", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf inventoryoverview.Release
	*/ 
	getControllerName : function() {
		return "view.Release";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf inventoryoverview.Release
	*/ 
	createContent : function(oController) {
		
		//LOAD RESOURCES FOR THIS VIEW
		sap.ui.localResources("js.Releases");
		jQuery.sap.require("js.Releases.releaseAutoMulti");
		jQuery.sap.require("js.Releases.releaseSearch");
		jQuery.sap.require("js.Releases.releaseReferenceDetails");
		jQuery.sap.require("js.utility");
		
		var oReleaseSearch = new releaseSearch();
		var vReleaseForm = oReleaseSearch.createReleaseSearch(oController);
 		this.page = new sap.m.Page({
			title: "View Release",
			showNavButton: false,
			content: [vReleaseForm]
		});
 		this.page.setShowHeader(false);
 		return this.page;
	}

});
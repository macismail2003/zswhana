sap.ui.jsview("view.Return", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.Return
	*/ 
	getControllerName : function() {
		return "view.Return";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.Return
	*/ 
	createContent : function(oController) {
		
		//LOAD RESOURCES FOR THIS VIEW
		sap.ui.localResources("js.Returns");
		jQuery.sap.require("js.Returns.returnAutoMulti");
		jQuery.sap.require("js.Returns.returnReferenceDetails");
		jQuery.sap.require("js.Returns.returnSearch");
		jQuery.sap.require("js.utility");
		
		var oReturnSearch = new returnSearch();
		var vReturnForm = oReturnSearch.createReturnSearch(oController);
 		this.page = new sap.m.Page({
			title: "View Returns",
			showNavButton: false,
			content: [vReturnForm]
		});
 		this.page.setShowHeader(false);
 		return this.page;
	}

});
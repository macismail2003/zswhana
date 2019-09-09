sap.ui.jsview("view.ReleaseDetail", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.releaseReferenceDetails
	*/ 
	getControllerName : function() {
		return "view.ReleaseDetail";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.releaseReferenceDetails
	*/ 
	createContent : function(oController) {
		jQuery.sap.require("js.Releases.releaseSearch");
		jQuery.sap.require("js.Releases.releaseReferenceDetails");
		jQuery.sap.require("js.utility");
		var oReleaseReferenceDetails = new releaseReferenceDetails();
		var vReleaseRefDetailForm = oReleaseReferenceDetails.createScreenFlex();
 		this.page = new sap.m.Page({
			title: "View Release Reference Details",
			showNavButton: false,
			content: [vReleaseRefDetailForm]
		});
 		this.page.setShowHeader(false);
 		return this.page;
	}

});
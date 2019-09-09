sap.ui.jsview("view.DJNS_PrimaryDetail", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.DJNS_PrimaryDetail
	*/ 
	getControllerName : function() {
		return "view.DJNS_PrimaryDetail";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.DJNS_PrimaryDetail
	*/ 
	createContent : function(oController) {
		
		var oDnjsP = new DNJSPrimaryDetails();
	    var vDnjspForm = oDnjsP.createScreenFlex();		
		
		this.page = new sap.m.Page({
			title: "View DN/JS-Primary Details",
			showNavButton: false,				
			icon: "",
			content : [vDnjspForm]
		});
		this.page.setShowHeader(false);
		return this.page;
	}

});
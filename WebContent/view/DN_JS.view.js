sap.ui.jsview("view.DN_JS", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.DN_JS
	*/ 
	getControllerName : function() {
		return "view.DN_JS";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.DN_JS
	*/ 
	createContent : function(oController) {
		
		jQuery.sap.require("js.DN_JS.DN_JSview");
		
		var oDnjs = new DN_JSview();
	    var vDnjsForm = oDnjs.createDNJSSearch(oController);		
		
		this.page = new sap.m.Page({
			title: "View DN/JS",
			showNavButton: false,				// page 2 should display a back button
			icon: "",
			content : [vDnjsForm]
		});
		this.page.setShowHeader(false);
	
	return this.page;
	}

});
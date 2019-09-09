sap.ui.jsview("view.DNJS_Approve", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.DNJS_Multiple
	*/ 
	getControllerName : function() {
		return "view.DNJS_Approve";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.DNJS_Multiple
	*/ 
	createContent : function(oController) {
		
		var oDnjmultiple = new LAMultiple();
	    var vDnjsmultipleForm = oDnjmultiple.createScreenFlex();		
		
		this.page = new sap.m.Page({
			title: "Approve DN/JS - Multiple",
			showNavButton: false,				// page 2 should display a back button
			icon: "",
			content : [vDnjsmultipleForm]
		});
		this.page.setShowHeader(false);
		this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
		
	return this.page;
	}

});
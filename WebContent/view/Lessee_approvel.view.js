sap.ui.jsview("view.Lessee_approvel", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.Lessee_approvel
	*/ 
	getControllerName : function() {
		return "view.Lessee_approvel";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.Lessee_approvel
	*/ 
	createContent : function(oController) {
		
		jQuery.sap.require("js.DN_JS.LAView");
		
		var olessee = new LAView();
	    var vDnjsLesseeForm = olessee.createLesseeApprovalForm();		
		
		this.page = new sap.m.Page({
			title: "View DN/JS-Primary Details",
			showNavButton: false,				// page 2 should display a back button
			icon: "",
			content : [vDnjsLesseeForm]
		});
		this.page.setShowHeader(false);
	
	return this.page;
	}

});
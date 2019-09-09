sap.ui.jsview("view.UnitEnquiry", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.UnitEnquiry
	*/ 
	getControllerName : function() {
		return "view.UnitEnquiry";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.UnitEnquiry
	*/ 
	createContent : function(oController) {
		$('#idHdrContent').html('Unit Enquiry');	//CHANGE HEADER CONTENT
		var oUnitEnquiry = new unitEnquiryView();
		var vUnitEnquiryForm = oUnitEnquiry.createUnitEnquiry(oController);
		
		this.page = new sap.m.Page("UnitEnquiryPage", {
			showNavButton: false,				
			icon: "",
			content : [vUnitEnquiryForm]
	});
	this.page.setShowHeader(false);
	this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
		
		return this.page;
	}

});
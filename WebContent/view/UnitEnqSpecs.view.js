sap.ui.jsview("view.UnitEnqSpecs", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.UnitEnqSpecs
	*/ 
	getControllerName : function() {
		return "view.UnitEnqSpecs";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.UnitEnqSpecs
	*/ 
	createContent : function(oController) {
 		
	var oUnitEnqSpecs = new unitEnqSpecsView();
	var vUnitEnqSpecsForm = oUnitEnqSpecs.createUnitEnqSpecs(oController);
	oUnitEnqSpecs.createUnitEnqSpecsFormView();
	//oUnitEnqSpecs.bindAllDetails();
	
	this.page = new sap.m.Page("UnitEnquirySpecificationsPage", {
		showNavButton: false,				
		icon: "",
		content : [vUnitEnqSpecsForm]
	});
	this.page.setShowHeader(false);
	this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
		
		return this.page;
	}

});
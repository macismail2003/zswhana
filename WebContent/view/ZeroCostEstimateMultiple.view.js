sap.ui.jsview("view.ZeroCostEstimateMultiple", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.ZeroCostEstimateMultiple
	*/ 
	getControllerName : function() {
		return "view.ZeroCostEstimateMultiple";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.ZeroCostEstimateMultiple
	*/ 
	createContent : function(oController) {
 		
		var oZeroCostEstimateMultipleZCEM = new zeroCostEstimateMultipleZCEMView();
		var vZeroCostEstimateMultipleZCEMForm = oZeroCostEstimateMultipleZCEM.createZeroCostEstimateMultipleZCEM();
		oZeroCostEstimateMultipleZCEM.populateDepotNameZCEM();
		
		this.page = new sap.m.Page("ZeroCostEstimateMultipleZCEMPage", {
		
			showNavButton: false,				// page 2 should display a back button
			//navButtonPress: [ oController.navButtonPress, oController ],
			icon: "",
			content : [vZeroCostEstimateMultipleZCEMForm]
	});
	this.page.setShowHeader(false);
	this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
		
		return this.page;
	}

});
sap.ui.jsview("view.ZeroCostEstimMultiResult", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.ZeroCostEstimMultiResult
	*/ 
	getControllerName : function() {
		return "view.ZeroCostEstimMultiResult";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.ZeroCostEstimMultiResult
	*/ 
	createContent : function(oController) {
 		
		var oZeroCostEstimateMultipleResZCEM = new zeroCostEstimateMultipleResZCEMRView();
		
		var vZeroCostEstimateMultipleResZCEMForm = oZeroCostEstimateMultipleResZCEM.createZeroCostEstimateMultipleResZCEMR();
		
		this.page = new sap.m.Page("ZeroCostEstimateMultipleResZCEMPage", {
		
			showNavButton: false,				// page 2 should display a back button
			//navButtonPress: [ oController.navButtonPress, oController ],
			icon: "",
			content : [vZeroCostEstimateMultipleResZCEMForm]
	});
	this.page.setShowHeader(false);
	this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
		
		return this.page;
	}

});
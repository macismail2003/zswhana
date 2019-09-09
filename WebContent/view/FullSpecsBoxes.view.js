sap.ui.jsview("view.FullSpecsBoxes", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.FullSpecsBoxes
	*/ 
	getControllerName : function() {
		return "view.FullSpecsBoxes";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.FullSpecsBoxes
	*/ 
	createContent : function(oController) { 
		var oEqiupCat = new eqiupCatView();
		var vEqiupCatForm = oEqiupCat.createEqiupCatBoxes();
		oEqiupCat.createEqiupCatBoxesFormView();
		
		this.page = new sap.m.Page("EqiupCatPage", {
    
           showNavButton: false,                           // page 2 should display a back button
           //navButtonPress: [ oController.navButtonPress, oController ],
           icon: "",
           content : [vEqiupCatForm]
	    });
	    this.page.setShowHeader(false);
	    this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
	    
	    return this.page;

	}

});
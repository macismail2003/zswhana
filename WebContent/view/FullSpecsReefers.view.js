sap.ui.jsview("view.FullSpecsReefers", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.FullSpecsReefers
	*/ 
	getControllerName : function() {
		return "view.FullSpecsReefers";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.FullSpecsReefers
	*/ 
	createContent : function(oController) {
		var oEqiupCatReefers = new eqiupCatReefersView();
        
        var vEqiupCatReefersForm = oEqiupCatReefers.createEqiupCatReefers();
        oEqiupCatReefers.createEqiupCatReefersFormView();
        this.page = new sap.m.Page("EqiupCatReefersPage", {
        
               showNavButton: false,                           // page 2 should display a back button
               //navButtonPress: [ oController.navButtonPress, oController ],
               icon: "",
               content : [vEqiupCatReefersForm]
        });
        this.page.setShowHeader(false);
        this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
        
        return this.page;

	}

});
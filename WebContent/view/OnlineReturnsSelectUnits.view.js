sap.ui.jsview("view.OnlineReturnsSelectUnits", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.OnlineReturnsSelectUnits
	*/ 
	getControllerName : function() {
		return "view.OnlineReturnsSelectUnits";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.OnlineReturnsSelectUnits
	*/ 
	createContent : function(oController) {
		
		var oOnlineRetSelUnits = new onlineRetSelUnitsView();
		var vReturnSelForm = oOnlineRetSelUnits.createOnlineRetUnitsSel();
		oOnlineRetSelUnits.createOnlineRetUnitsSelFormView();
		oOnlineRetSelUnits.bindUnitNumbers();
		
		this.page = new sap.m.Page("OnlineReturnsSelectUnitsPage", {
	
		showNavButton: false,				// page 2 should display a back button
		//navButtonPress: [ oController.navButtonPress, oController ],
		icon: "",
		content : [vReturnSelForm]
		});
		this.page.setShowHeader(false);
		this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
			
			return this.page;}

});
sap.ui.jsview("view.OnlineReservation", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.OnlineReservation
	*/ 
	getControllerName : function() {
		return "view.OnlineReservation";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.OnlineReservation
	*/ 
	createContent : function(oController) {
		
		var oOnlineReservation = new ReturnDetailsDetailView();
		var vOnlineReservtaionForm = oOnlineReservation.createOnlineReservation();

		this.page = new sap.m.Page("OnlineReservationPage", {
	
		showNavButton: false,				// page 2 should display a back button
		//navButtonPress: [ oController.navButtonPress, oController ],
		icon: "",
		content : [vOnlineReservtaionForm]
		});
		this.page.setShowHeader(false);
		this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
		
		return this.page;}

});
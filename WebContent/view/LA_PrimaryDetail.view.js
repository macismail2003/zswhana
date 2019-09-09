sap.ui.jsview("view.LA_PrimaryDetail", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.LA_PrimaryDetail
	*/ 
	getControllerName : function() {
		return "view.LA_PrimaryDetail";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.LA_PrimaryDetail
	*/ 
	createContent : function(oController) {
		var oLesseePD = new LAPrimaryDetail();
	    var vLesseePDForm = oLesseePD.createScreenFlex();		
		
		this.page = new sap.m.Page({
			title: "Lessee Approval-Primary Details",
			showNavButton: false,				// page 2 should display a back button
			icon: "",
			content : [vLesseePDForm]
		});
		this.page.setShowHeader(false);
	
	return this.page;
	}

});
sap.ui.jsview("view.LA_Primary_Image", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.LA_Primary_Image
	*/ 
	getControllerName : function() {
		return "view.LA_Primary_Image";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.LA_Primary_Image
	*/ 
	createContent : function(oController) {
		
		var oLesseePI = new LAPrimaryImage();
	    var vLesseePIForm = oLesseePI.createLesseeAPrimaryImgForm();		
		
		this.page = new sap.m.Page({
			title: "Lessee Approval-Primary Details",
			showNavButton: false,				// page 2 should display a back button
			icon: "",
			content : [vLesseePIForm]
		});
		this.page.setShowHeader(false);
		
	return this.page;
	}

});
sap.ui.jsview("view.UploadDNPictures", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.UploadDNPictures.UploadDNPictures
	*/ 
	getControllerName : function() {
		return "view.UploadDNPictures";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.UploadDNPictures.UploadDNPictures
	*/ 
	createContent : function(oController) {
		//$('#idHdrContnt').html('Upload DN Pictures - Single'); //CHANGE HEADER CONTENT
		var oUploadDNPictures = new uploadDNPictures();
		
		var vUploadDNPicturesForm = oUploadDNPictures.createUploadDNPictures();
		
		this.page = new sap.m.Page("UploadDNPicturesPage", {
		
			showNavButton: false,				// page 2 should display a back button
			//navButtonPress: [ oController.navButtonPress, oController ],
			icon: "",
			content : [vUploadDNPicturesForm]
	});
	this.page.setShowHeader(false);
	this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
		
		return this.page;
	}

});
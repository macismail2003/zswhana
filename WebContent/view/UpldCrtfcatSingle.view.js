sap.ui.jsview("view.UpldCrtfcatSingle", {

	getControllerName: function() {
		return "view.UpldCrtfcatSingle";
	},
	createContent : function(oController) {
		//$('#idHdrContnt').html('Upload Certificate - Single');	//CHANGE HEADER CONTENT
		
		//LOAD RESOURCES FOR THIS VIEW
		/*sap.ui.localResources("js.UploadSingleCertificate");
		jQuery.sap.require("js.UploadSingleCertificate.UploadSingleCertificate");*/
		
		//CREATE OBJECT FOR RESOURCES
		var oUploadSingleCertificate = new UploadSingleCertificate();
		var vUpldSnglCrtfct = oUploadSingleCertificate.loadUploadSingleCertificate();

		//CREATE PAGE FOR THIS VIEW
		this.page = new sap.m.Page("idUpldCrtfcatSinglePage", {
				title: "{i18n>page2Title}",
				showNavButton: false,				// page 2 should display a back button
				navButtonPress: [ oController.navButtonPress, oController ],
				content : [vUpldSnglCrtfct]
		});
		this.page.setShowHeader(false);
		this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
		
		// done
		return this.page;
	},

});
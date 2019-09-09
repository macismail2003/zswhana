sap.ui.jsview("view.UpldCrtfcatMultiple", {

	getControllerName: function() {
		return "view.UpldCrtfcatMultiple";
	},
	createContent : function(oController) {
		//$('#idHdrContnt').html('Upload Certificate - Multiple'); //CHANGE HEADER CONTENT
		
		//LOAD RESOURCES FOR THIS VIEW
		/*sap.ui.localResources("js.UploadMultipleCertificate");
		jQuery.sap.require("js.UploadMultipleCertificate.UploadMultipleCertificate");*/
		
      
		//CREATE OBJECT FOR RESOURCES
		var oUploadMltplCertificate = new UploadMultipleCertificate();
		var vUpldMltplCrtfct = oUploadMltplCertificate.loadUploadMultipleCertificate();
		
		//CREATE PAGE FOR THIS VIEW
		this.page = new sap.m.Page("idUploadMultpleCertificatePage", {
				title: "{i18n>page2Title}",
				showNavButton: false,				// page 2 should display a back button
				//navButtonPress: [ oController.navButtonPress, oController ],
				icon: "",
				content : [vUpldMltplCrtfct]
		});
		this.page.setShowHeader(false);
		this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
		
		// done
		return this.page;
	},

});
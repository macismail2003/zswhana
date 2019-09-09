sap.ui.jsview("view.uploapNewBuildPict", {

	getControllerName: function() {
		return "view.uploapNewBuildPict";
	},
	createContent : function(oController) {
		//$('#idHdrContnt').html('Upload New Build Pictures'); //CHANGE HEADER CONTENT
		
		//LOAD RESOURCES FOR THIS VIEW
		/*sap.ui.localResources("js.UploadMultipleCertificate");
		jQuery.sap.require("js.UploadMultipleCertificate.UploadMultipleCertificate");*/
		
      
		//CREATE OBJECT FOR RESOURCES
		var oUploadMltplCertificate = new UploapNewBuildPict();
		var vUpldMltplCrtfct = oUploadMltplCertificate.loadUploapNewBuildPict();
		
		//CREATE PAGE FOR THIS VIEW
		this.page = new sap.m.Page("iduploapNewBuildPict", {
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
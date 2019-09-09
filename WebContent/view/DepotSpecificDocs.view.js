sap.ui.jsview("view.DepotSpecificDocs", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.DepotSpecificDocs
	*/ 
	getControllerName : function() {
		return "view.DepotSpecificDocs";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.DepotSpecificDocs
	*/ 
	createContent : function(oController) {
		$('#idHdrContent').html('Depot Specific Documents');	//CHANGE HEADER CONTENT
		
		var oDepotSpecDocs = new depotSpecDocsView();
		var vDepotSpecDocsForm = oDepotSpecDocs.createDepotSpecDocs();
		 oDepotSpecDocs.getDocType();
		 
		//security
			var objUser = new loggedInU();
			LoggedInUserTypeDepotSpecDoc = objUser.getLoggedInUserType();
			if(($.inArray(LoggedInUserTypeDepotSpecDoc, ["DEPOT","FACTORY"])) != -1){
				var DepotCode = objUser.getLoggedInUserID();
				sap.ui.getCore().byId("idDepotCodeDepotSpecDoc").setEnabled(false);
				sap.ui.getCore().byId("idDepotCodeDepotSpecDoc").setValue(DepotCode);
			}
			else{
				sap.ui.getCore().byId("idDepotCodeDepotSpecDoc").setEnabled(true);
			}
			
			/*if(LoggedInUserTypeDepotSpecDoc == "SEACO"){
				sap.ui.getCore().byId("idDepotCodeDepotSpecDoc").setEnabled(true);
			}
			else{
				var DepotCode = objUser.getLoggedInUserID();
				sap.ui.getCore().byId("idDepotCodeDepotSpecDoc").setEnabled(false);
				sap.ui.getCore().byId("idDepotCodeDepotSpecDoc").setValue(DepotCode);
			}*/
			
		this.page = new sap.m.Page("DepotSpecDocsPage", {
		
			showNavButton: false,				// page 2 should display a back button
			//navButtonPress: [ oController.navButtonPress, oController ],
			icon: "",
			content : [vDepotSpecDocsForm]
		});
	this.page.setShowHeader(false);
	this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
		
		return this.page;
	}

});
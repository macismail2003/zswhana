sap.ui.jsview("view.InventorySearch", {

	getControllerName: function() {
		return "view.InventorySearch";
	},
	createContent : function(oController) {
		$('#idHdrContnt').html('Inventory Overview');	//CHANGE HEADER CONTENT
		
		//LOAD RESOURCES FOR THIS VIEW
		sap.ui.localResources("js.InventoryOverview");
		jQuery.sap.require("js.InventoryOverview.inventorySearchView");
		jQuery.sap.require("js.InventoryOverview.inventoryOverviewSearchResult");
		jQuery.sap.require("js.InventoryOverview.GetDataSearchForm");
		jQuery.sap.require("js.InventoryOverview.SelectionChangeEvents");
		jQuery.sap.require("js.InventoryOverview.validations");
		jQuery.sap.require("js.InventoryOverview.ResetForm");
		
		oController.onLoadPopulate();		
		var oSearchView=new inventorySearchView();
		var vSearchForm = oSearchView.createSearchView(oController);

	    	this.page = new sap.m.Page("InventorySearchPage", {
				title: "{i18n>page2Title}",
				scrollTo: (0,0),
				showNavButton: false,				// page 2 should display a back button
				//navButtonPress: [ oController.navButtonPress, oController ],
				icon: "",
				content : [vSearchForm]
		});
		this.page.setShowHeader(false);
		this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
		//this.page.setHeight("25%");
		
		// done
		return this.page;
	}
});
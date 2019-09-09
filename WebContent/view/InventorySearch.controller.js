var oSelection = new InvDetSelectionChange();
sap.ui.controller("view.InventorySearch", {
	
	/*onBeforeRendering: function() {
		
	},*/
	onLoadPopulate: function(){
		var oGetDataSearch = new onLoadDataDepoInvOvrvw();
		oGetDataSearch.GetLocationDataDI();
		oGetDataSearch.PopulateEquipDetForDepoInv();
	},
	RegionChange: function(selRegion){
		oSelection.onRegionChange(selRegion);
	},
	CountryChange: function(selRegion,selCountry){
		oSelection.onCountryChange(selRegion,selCountry);
	},
	EquipClassChange: function(){
		oSelection.onEquipClassChange();
	},
	EquipCategoryChange: function(){
		oSelection.onEquipCatChange();
	},
	navButtonPress : function(evt) { 
		var bus = sap.ui.getCore().getEventBus();
		bus.publish("nav", "back");
	},
	SubmitButtonPressDI: function(){
		//alert("submit clicked");
		var oValidate = new Validations();
		var valid = oValidate.MandatoryFields();
		//alert("valid: "+valid);
		if (valid) {
			/*var vUnitType = sap.ui.getCore().byId("idComboUnitType").getValue();
			var vCountry = sap.ui.getCore().byId('idAutoCountry').getSelectedValues(); //document.getElementById("idAutoCountry").value;
				var vCity =sap.ui.getCore().byId('idAutoCity').getSelectedValues();  //document.getElementById("idAutoCity").value;
			if (vUnitType == "ALL" || ((vCountry.length < 1 || vCity.length < 1 ))){
				var ConfirmMessage = "This selection criteria will return large number of records and might take longer to process.\n Do you still want to continue?";
				 sap.ui.commons.MessageBox.show(ConfirmMessage,
	       			  sap.ui.commons.MessageBox.Icon.WARNING,
	       				"Warning",
	                     [sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO], 
	                     fnCallbackMessageBox,
	                     sap.ui.commons.MessageBox.Action.YES);
			}
			else{*/
				//alert("else")
				 busyDialog.open();
					var oSearchView = new inventorySearchView();
					oSearchView.createNBindData();
			//}
			
		}
	},
	ResetButtonPress:function(){
		var oReset = new ResetSearchForm();
		oReset.resetSearchForm();
	},
	onCitySelect: function(){
		/*if(sap.ui.getCore().byId("InventoryDetail") != undefined){
			sap.ui.getCore().byId("InventoryDetail").destroy();
		}*/
		var bus = sap.ui.getCore().getEventBus();
		bus.publish("nav", "to", {
			id : "InventoryDetail",
			
		});	// when tapped, it triggers drilldown to page 2
		var oInvDetView = new InventoryDetail();
		oInvDetView.createdetailViewForm();
		oInvDetView.setInvDetailView();
	},
	onAfterRendering: function() {
	}
	
	
});


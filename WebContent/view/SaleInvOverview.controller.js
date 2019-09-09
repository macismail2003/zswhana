sap.ui.controller("view.SaleInvOverview", {

	SubmitButtonPressSI: function(){
		//alert("submit clicked");
		var oSaleInvOvrvw = new saleInvOverviewView();
		var oValidate = new ValidationsForSI();
		var valid = oValidate.MandatoryFieldsSI();
		//alert("valid: "+valid);
		if (valid) {
			var vUnitType = sap.ui.getCore().byId("idComboUnitTypeSI").getValue();
			var vCountry = sap.ui.getCore().byId('idAutoCountrySI').getSelectedValues();
			var vCity = sap.ui.getCore().byId('idAutoCitySI').getSelectedValues();
			//if (/*vUnitType == "ALL" || ((vCountry == "" || vCity == ""))*/vCity.length > 1){
			if ((vUnitType == "ALL" ||  vCity.length > 1)){
				var ConfirmMessage = "This selection criteria will return large number of records and might take longer to process.\n Do you still want to continue?";
				 sap.ui.commons.MessageBox.show(ConfirmMessage,
	       			  sap.ui.commons.MessageBox.Icon.WARNING,
	       				"Warning",
	                     [sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO], 
	                     oSaleInvOvrvw.fnCallbackMessageBoxSearchSI,
	                     sap.ui.commons.MessageBox.Action.YES);
			}
			else{
					busyDialog.open();
					var oSaleInvView = new saleInvOverviewView();
					oSaleInvView.getSearchResultSI();
			}
			
		}
		else{
			if(sap.ui.getCore().byId("idSIResultTable")){
				var vResultTbl= sap.ui.getCore().byId("idSIResultTable");
	    		if(vResultTbl){
	    			sap.ui.getCore().byId("idSIResultTable").destroy();
	    			sap.ui.getCore().byId("idSaleInvResultFlex").destroy();
	    			if(sap.ui.getCore().byId("SaleInvCityDetails")){
	    				sap.ui.getCore().byId("SaleInvCityDetails").destroy();
	    			}
	    		}
			}
		}
	},

});
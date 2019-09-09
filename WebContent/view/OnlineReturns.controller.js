sap.ui.controller("view.OnlineReturns", {
	CountryChange:function(){
		var oGetData = new getDataOnlineReturns();
		oGetData.OnCountryChange();
	},
	
	onAfterRendering: function() {
		/*//var objUser = new loggedInU();
		loggedInUserTypeOR = objLoginUser.getLoggedInUserType();
		if(loggedInUserTypeOR != "SEACO"){
			var customer = objLoginUser.getLoggedInUserID();
			//$("#idComboCustomerOR").attr("disabled","disabled");
			//$("#idComboCustomerOR").val(customer);
		}
		else{
			$("#idComboCustomerOR").removeAttr('disabled');
		}*/
		
	},
		
	
});
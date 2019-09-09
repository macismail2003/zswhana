sap.ui.controller("view.onlinereturnsresult", {
	CountryChange:function(){
		var oGetData = new getDataonlinereturnsresult();
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

sap.ui.controller("view.Login", {
	LogonBtnPress: function(pwd){
		var oLoginView = new LoginView();
		if(pwd == 'Seaco@123'){
			oLoginView.changePassword();
		}
		else{
			oLoginView.authenticateUser();
		}
			//window.open("UserHome.html","_self");
	}
});
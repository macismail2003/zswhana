sap.ui.jsview("view.CustOutRelReportVw",
{
	getControllerName : function() {
					return "view.CustOutRelReportVw";
		},
	createContent : function(oController) {
		//var userdata = objLoginUser.filterLoggedInUserData('SCREEN');
		//var roleTypeCDORReport = objLoginUser.getLoggedInUserType();
		//var custidCDORReport = objLoginUser.getLoggedInUserID();
		
		//var changeCustFlag = true;
		//if(roleTypeCDORReport == "SEACO"){
		//	changeCustFlag = true;
		//}else{
		//	changeCustFlag = false;
		//}
		
		var objCstDShOutRERep = new CustDashOutRelReport();
		
		//CREATE PAGE FOR THIS VIEW
		this.page = new sap.m.Page({
				//title: "{i18n>page2Title}",
				showNavButton: false,
				icon: "",
				content : [objCstDShOutRERep.createCustDashOutRelReport()]
		});
		this.page.setShowHeader(false);
		this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
		
		// done
		return this.page;
	},
});
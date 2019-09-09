var oAccountsSummary = new accountsSummaryView();
sap.ui.controller("view.AccountsSummary", {
	
	RetrieveAccountDetails: function(DepotCode){
		oAccountsSummary.getAccountDetails("",DepotCode);
	},
});
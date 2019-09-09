var oDRVView;
sap.ui.controller("view.DepReplValue", {
	submitDRVClicked: function(){
		oDRVView = new depReplValueView();
		oDRVView.bindUnitEnquiryDRV();
	},
	
	resetUnitEnquiryClicked: function(){
		oDRVView = new depReplValueView();
		oDRVView.resetUnitEnquiry();
	}
	
});
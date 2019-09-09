sap.ui.controller("view.UnitEnquiry", {
	
	submitUnitEnquiryClicked:function(){
		var oUnitEnquiry = new unitEnquiryView();
		oUnitEnquiry.bindUnitEnquiry();
	},
	resetUnitEnquiryClicked:function(){
		//alert("Reset called");
		var oUnitEnquiry = new unitEnquiryView();
		oUnitEnquiry.resetUnitEnquiry();
	}

});
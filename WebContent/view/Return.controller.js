sap.ui.controller("view.Return", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf view.Return
*/
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf view.Return
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf view.Return
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf view.Return
*/
//	onExit: function() {
//
//	}
	submitReturnClicked:function(){
		var oReturnSearchDetail = new returnSearch();
		oReturnSearchDetail.bindReturnDetails();
	},
	
	linkReturnDetailClicked:function(){
		//alert("in controller");
		var oReturnRefDetail = new returnSearch();
		oReturnRefDetail.gotoReturnRefDetails();
	},
	resetReturnClicked:function(){
		
		// reset Depot Code
		if(sap.ui.getCore().byId("returnHardCode").getEnabled())
			sap.ui.getCore().byId("returnHardCode").setValue("");
		
		sap.ui.getCore().byId("returnRefTbl").setValue("");
		
		// reset Period
		sap.ui.getCore().byId("returnPeriod").setSelectedIndex(4);
		// reset Status
		sap.ui.getCore().byId("returnStatus").setSelectedIndex(0);
		// reset Unit Type
	    sap.ui.getCore().byId('AutoUnitTypeRet').clearSelectedValues();
	    
		ReturnRefResultData = [];
		ReturnRefSummaryData = [];
		jsonReturnSum = [];
		
		// Remove Results Flex Box
		if(sap.ui.getCore().byId("returnDetailsFlex")){
			var oReleaseResultFlex = sap.ui.getCore().byId("returnDetailsFlex"); 
			oReleaseResultFlex.destroy();
		}
		
		if(sap.ui.getCore().byId("returnResultTable")){
			var oReturnResultTable = sap.ui.getCore().byId("returnResultTable"); 
			oReturnResultTable.destroy();
		}
		
	}
});
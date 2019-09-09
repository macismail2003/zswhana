sap.ui.controller("view.RepairEstimates", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf view.RepairEstimates
*/
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf view.RepairEstimates
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf view.RepairEstimates
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf view.RepairEstimates
*/
//	onExit: function() {
//
//	}
	submitRepairClicked:function(){
		var oRepairSearchDetail = new repairEstimatesSearch();
		oRepairSearchDetail.bindRepairDetails();
	},
	resetRepairClicked:function(){
		
		// reset Depot Code
		if(sap.ui.getCore().byId("repairHardCode").getEnabled())
			sap.ui.getCore().byId("repairHardCode").setValue("");
		
		// clear Repair Ref Nos
		sap.ui.getCore().byId("repairRefTbl").setValue("");
		sap.ui.getCore().byId("repairUnitTbl").setValue("");
		
		// reset Period
		sap.ui.getCore().byId("repairPeriod").setSelectedIndex(4);
		// reset Status
		sap.ui.getCore().byId("repairStatus").setSelectedIndex(0);
		// reset Unit TYpe
	    sap.ui.getCore().byId('AutoUnitTypeRep').clearSelectedValues();
	    
		// reset Customer name
		$("#repairCustName").val("");
		
		ReturnRefResultData = [];
		ReturnRefSummaryData = [];
		jsonReturnSum = [];
		
		//sap.ui.getCore().byId("repairCustName").setValue("");
		
		// Remove Results Flex Box
		if(sap.ui.getCore().byId("repairDetailsFlex")){
			var oReleaseResultFlex = sap.ui.getCore().byId("repairDetailsFlex"); 
			oReleaseResultFlex.destroy();
		}		
	}

});
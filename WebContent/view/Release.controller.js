sap.ui.controller("view.Release", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf inventoryoverview.Release
*/
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf inventoryoverview.Release
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf inventoryoverview.Release
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf inventoryoverview.Release
*/
//	onExit: function() {
//
//	}
	submitReleaseClicked:function(){
		var oReleaseSearchDetail = new releaseSearch();
		oReleaseSearchDetail.bindReleaseDetails();
	},
	
	linkReleaseDetailClicked:function(){
		//alert("in controller");
		var oReleaseSearchDetail = new releaseSearch();
		oReleaseSearchDetail.gotoReleaseRefDetails();
	},
	resetReleaseClicked:function(){
		
		//Reset Depot
		if(sap.ui.getCore().byId("releaseHardCode").getEnabled())
			sap.ui.getCore().byId("releaseHardCode").setValue("");
		
		sap.ui.getCore().byId("releaseRefTbl").setValue("");
		
		// reset Period
		sap.ui.getCore().byId("releasePeriod").setSelectedIndex(4);
		// reset Status
		sap.ui.getCore().byId("releaseStatus").setSelectedIndex(0);
		// reset Unit TYpe
		sap.ui.getCore().byId('AutoUnitTypeRel').clearSelectedValues();
    	
		releaseRefResultData = [];
		releaseRefResultSummaryData = [];
		jsonReleaseSum = [];
		
		// Remove Results Flex Box
		if(sap.ui.getCore().byId("releaseDetailsFlex")){
			var oReleaseResultFlex = sap.ui.getCore().byId("releaseDetailsFlex"); 
			oReleaseResultFlex.destroy();
		}
		
	}
	
});
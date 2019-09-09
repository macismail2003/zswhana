sap.ui.controller("view.FPURepairEstimateDisplayVw", {
	navButtonPress : function(evt) { 
		var bus = sap.ui.getCore().getEventBus();
		bus.publish("nav", "back");
	},
	onInit : function() {
		// register for events
		var bus = sap.ui.getCore().getEventBus();
		bus.subscribe("app", "RefreshDetail", this.refreshDetail, this);
	},
	_setModel : function(jsnData,eventFrm) {
		var model = new sap.ui.model.json.JSONModel();
		model.setData(jsnData);
		var curnView = this.getView();
		curnView.setModel(model);
		
		//SET ERROR MESSAGE TABLE PROPERTY
		var oTblErrFPUREShow = sap.ui.getCore().byId("idTblResErrDataFPUREShow");
		if(eventFrm == "EDI")
		{	
			oTblErrFPUREShow.setVisible(false);
			sap.ui.getCore().byId("idHzntlDvdrFrstFPURES").setVisible(false);
		}else{
			oTblErrFPUREShow.setVisible(true);
			sap.ui.getCore().byId("idHzntlDvdrFrstFPURES").setVisible(true);
		}
		
		if(jsnData.errorDtl.length < 1){
			oTblErrFPUREShow.setVisibleRowCount(5);
			oTblErrFPUREShow.setNavigationMode(sap.ui.table.NavigationMode.None);
		}else if(jsnData.errorDtl.length < 26){
			oTblErrFPUREShow.setVisibleRowCount(jsnData.errorDtl.length);
			oTblErrFPUREShow.setNavigationMode(sap.ui.table.NavigationMode.None);
		}else{
			oTblErrFPUREShow.setVisibleRowCount(25);
			oTblErrFPUREShow.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		}

		//SET LINE ITEM TABLE PROPERTY
		var oTblLineItemFPURES = sap.ui.getCore().byId("idTblLineItemFPURES");
		if(jsnData.lineItemsDtl.length < 1){
			oTblLineItemFPURES.setVisibleRowCount(5);
			oTblLineItemFPURES.setNavigationMode(sap.ui.table.NavigationMode.None);
		}else if(jsnData.lineItemsDtl.length < 26){
			oTblLineItemFPURES.setVisibleRowCount(jsnData.lineItemsDtl.length);
			oTblLineItemFPURES.setNavigationMode(sap.ui.table.NavigationMode.None);
		}else{
			oTblLineItemFPURES.setVisibleRowCount(25);
			oTblLineItemFPURES.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		}
	},
	
	refreshDetail : function(channelId, eventId, data) {
		if (data && data.jsnData) {
			this._setModel(data.jsnData,data.eventFrm);
		}
	},
	
/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf view.CorrectMoveDate
*/
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf view.CorrectMoveDate
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf view.CorrectMoveDate
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf view.CorrectMoveDate
*/
//	onExit: function() {
//
//	}

});
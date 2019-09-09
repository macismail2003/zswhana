jQuery.sap.require("sap.m.InstanceManager");
var historyBack;
sap.ui.controller("view.App", {
	// configuration for the folder where the views are
	// (required for lazy loading in navTo)
	VIEW_FOLDER: "view",

	onInit : function() {
		// init history mgmt
		jQuery.sap.require("jquery.sap.history");
		var historyDefaultHandler = function(navType) {
			if(navType === jQuery.sap.history.NavType.Back){
				this.navBack(historyBack);
			}else{
				this.navTo(historyBack, null, false);
			}
		};

		var historyPageHandler = function(params, navType){
			if(!params || !params.id){
				jQuery.sap.log.error("invalid parameter: " + params);
			}else{
				if(navType === jQuery.sap.history.NavType.Back){
					this.navBack(params.id);
				}else{
					this.navTo(params.id, params.data, false);
				}
			}
		};

		jQuery.sap.history({
			routes: [{
				// This handler is executed when you navigate back to the history state on the path "page"
				path : "page", handler: jQuery.proxy(historyPageHandler, this)
			}],
			// The default handler is executed when you navigate back to the history state with an empty hash
			/*defaultHandler: jQuery.proxy(historyDefaultHandler, this)*/
		});

		// subscribe to event bus
		var bus = sap.ui.getCore().getEventBus();
		bus.subscribe("nav", "to", this.navHandler, this);
		bus.subscribe("nav", "back", this.navHandler, this);
		bus.subscribe("nav", "virtual", this.navHandler, this);
	},

	navHandler: function(channelId, eventId, data) {
		if(eventId === "to"){
			if (!data.id) {
				jQuery.sap.log.error("'nav to' event cannot be processed. data.id must be given");
			}
			this.navTo(data.id, data.data, true);
		}else if(eventId === "back"){
			//provide a default value for navigation,  one step back in history
			if(!data.step){
				data.step = 1;
			}

			if(data.home){
				jQuery.sap.history.backToHash("");
			}else if(data.step > 0){
				jQuery.sap.history.back(data.step);
			}else{
				jQuery.sap.log.error("'nav back' event cannot be processed. At least one from [data.step, data.home] must be given with valid value");
			}
		}else if(eventId === "virtual"){
			jQuery.sap.history.addVirtualHistory();
		}else{
			jQuery.sap.log.error("'nav' event cannot be processed. There's no handler registered for event with id: " + eventId);
		}
	},

	navTo : function(id, data, writeHistory) {
		if(id === undefined){
			// invalid id
			jQuery.sap.log.error("navTo failed due to missing id");
		}else{
			//Closing popovers needs to be done in navTo and navBack
			if(sap.m.InstanceManager.hasOpenPopover()){
				sap.m.InstanceManager.closeAllPopovers();
				jQuery.sap.log.info("navTo - closed popover(s)");
			}

			// navigate on app
			this.toView(id, data);

			// write browser history
			if(writeHistory === undefined || writeHistory){
				var bookmarkable = false;
				var stateData = { id: id };
				jQuery.sap.history.addHistory("page", stateData, bookmarkable);
			}
			// log
			jQuery.sap.log.info("navTo - to page: " + id);
		}
	},

	toView: function(id, data){
		// this is the lazy loading of views
		// (based on identical IDs for view and view-instance)
		var app = this.getView().app;
		if (app.getPage(id) === null) {
			jQuery.sap.log.info("now loading page '" + id + "'");
			app.addPage(sap.ui.jsview(id, this.VIEW_FOLDER + "." + id));
		}
		this.resetScreeen(id);
		app.to(id, 'show', data);
	},

	navBack : function(id) {

		if(!id){
			// invalid parameter
			jQuery.sap.log.error("navBack - parameters id must be given");
		}else{
			if(sap.m.InstanceManager.hasOpenDialog()){
				// close open dialogs
				sap.m.InstanceManager.closeAllDialogs();
				jQuery.sap.log.info("navBack - closed dialog(s)");
			}
			if (sap.m.InstanceManager.hasOpenPopover()) {
				//Closing popovers needs to be done in navTo and navBack
				sap.m.InstanceManager.closeAllPopovers();
				jQuery.sap.log.info("navBack - closed popover(s)");
			}
			// ... and navigate back
			var app = this.getView().app;
			app.backToPage(id);
			jQuery.sap.log.info("navBack - back to page: " + id);
		}
	},

	resetScreeen: function(pageid){
		if(pageid == 'RepairEstimateSearchVw'){
			new RepairEstimateSearch().fnResetRepairEstmtSearch();
		}else if(pageid == 'RepairEstimateSearchJVw'){
			new RepairEstimateSearchJ().fnResetRepairEstmtSearch();
		}else if(pageid == 'CorrectMoveDate'){
			new correctMovemntDateView().fnResetCorrectMovDate();
		}else if(pageid == 'FPURepairEstimateSearchVw'){
			new FixPartialRepairEstimateSearch().fnResetFixPartRepEstmt();
		}else if(pageid == 'LesseeApprovalMultiple'){
			new LesseeApprovalMultipleView().resetLesseeMultiple();
			//new LesseeApprovalMultipleView().resetLesseeMultiple();
		}else if(pageid == 'LesseeApprovalSingle'){
			new LesseeApprovalSingleView().resetLesseeApprovalSingle();
		}else if(pageid == 'RepairComplSingle'){
			new repairComplSingleView().resetRepComplS();
		}else if(pageid == 'RepairComplMultiple'){
			new RepairCompltnMultipleView().resetRCMultiple();
		}else if(pageid == 'AddMoveSingle'){
			new addMovemntSingleView().resetAMOS();
		}else if(pageid == 'AddMoveInSingle'){
			new addMovemntInSingleView().resetAMIS();
		}else if(pageid == 'AddMoveMultiple'){
			new addMovemntMultipleView().resetAMOM();
			//new addMovemntMultipleView().resetAMOM();
		}else if(pageid == 'AddMoveInMultiple'){
			new addMovemntInMultipleView().resetAMIM();
			//new addMovemntInMultipleView().resetAMIM();
		}else if(pageid == 'ZeroCostEstimateMultiple'){
			new zeroCostEstimateMultipleZCEMView().resetZeroCostEstimate();
			//new zeroCostEstimateMultipleZCEMView().resetZeroCostEstimate();
		}else if(pageid == 'MovInFrmLease'){
			new moveInFromLeaseView().resetGateInFPU();
		}else if(pageid == 'MovOutToLease'){
			new moveOutToLeaseView().resetGateOutFPU();
		}else if(pageid == 'RepairCompletionFPU'){
			new repaircompltnFPUView().resetRepairCompletionFPU();
		}else if(pageid == 'LesseeApprovalFPU'){
			new lesseApprovalFPUView().resetFPULessee();
		}else if(pageid == 'PortalProcessingLogsView'){
			new PortalProcsngLogsView().resetPortalProcessngLog();
		}else if(pageid == 'EDITransmissionLog'){
			new ediTransmissionLogView().resetEDIRetransmissionLog();
		}else if(pageid == 'EDISatusUView'){
			new EDIStatusUView().resetStatusU();
		}else if(pageid == 'AddMoveInMultipleNew'){
			new addMovemntInMultipleViewNew().resetAddMoveInMultipleNew();
		}else if(pageid == 'AddMoveOutMultipleNew'){
			new addMovemntOutMultipleViewNew().resetAddMoveOutMultipleNew();
		}

		else if(pageid == 'AddMoveOutMultipleNew'){
			new addMovemntOutMultipleViewNew().resetAddMoveOutMultipleNew();
		}

		/*else if(pageid == 'CustOutRelReportVw'){
			new CustDashOutRelReport().resetScreenCORReport();
		}else if(pageid == 'CustOutReturnReportVw'){
			new CustDashOutReturnReport().resetScreenCurrCORetReport();
		}*/


		/*if(arrPageReset.indexOf(pageid) >= 0){
			if(sap.ui.getCore().byId(pageid) != undefined){
				sap.ui.getCore().byId(pageid).destroy();
			}
		}*/
	}
});

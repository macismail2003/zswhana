sap.ui.controller("view.CustomerDashBoardRelViewAllVw", {

	onInit : function() {
	},
	navButtonPress : function(evt) { 
		var bus = sap.ui.getCore().getEventBus();
		if(sap.ui.getCore().byId('CustomerDashboardVw') != undefined){
			sap.ui.getCore().byId('CustomerDashboardVw').destroy();
		}
		backClickCDB = true;
		bus.publish("nav", "to", {id : "CustomerDashboardVw"});
	}

});
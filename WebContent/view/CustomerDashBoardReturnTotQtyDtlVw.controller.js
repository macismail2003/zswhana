sap.ui.controller("view.CustomerDashBoardReturnTotQtyDtlVw", {

	onInit : function() {
	},
	navButtonPress : function(evt) { 
		var bus = sap.ui.getCore().getEventBus();
		bus.publish("nav", "back");
	}

});
sap.ui.controller("view.CustomerDashBoardReleasePickDtlVw", {

	onInit : function() {
	},
	navButtonPress : function(evt) { 
		var bus = sap.ui.getCore().getEventBus();
		bus.publish("nav", "back");
	}

});
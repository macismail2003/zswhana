sap.ui.controller("view.InventoryDetail", {

	onInit : function() {
	},
	navButtonPress : function(evt) { 
		var bus = sap.ui.getCore().getEventBus();
		bus.publish("nav", "back");
	},
	NewSearchForm: function(){
		var oReset = new ResetSearchForm();
		oReset.resetSearchForm();
	}
});
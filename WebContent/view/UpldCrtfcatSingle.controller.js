sap.ui.controller("view.UpldCrtfcatSingle", {

	onInit : function() {
		busyDialog.open();
	},
	navButtonPress : function(evt) { 
		var bus = sap.ui.getCore().getEventBus();
		bus.publish("nav", "back");
	},
	
	onAfterRendering: function() {
		$('#idDate-input').prop( "disabled", true );
		//var today = new Date();
		//sap.ui.getCore().byId("idDate").setValue(today);
		busyDialog.close();
	}
});
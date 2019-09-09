sap.ui.controller("view.UpldCrtfcatMultiple", {

	onInit : function() {
		busyDialog.open();
	},
	navButtonPress : function(evt) { 
		var bus = sap.ui.getCore().getEventBus();
		bus.publish("nav", "back");
	},
	
	onAfterRendering: function() {
		$('#idUploadMultipleCertificate-fu').attr( "multiple","multiple" );
		busyDialog.close();
	}
});
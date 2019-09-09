sap.ui.controller("view.uploapNewBuildPict", {

	onInit : function() {
		busyDialog.open();
	},
	navButtonPress : function(evt) { 
		var bus = sap.ui.getCore().getEventBus();
		bus.publish("nav", "back");
	},
	
	onAfterRendering: function() {
		//alert($("#oUploadMultipleCertificate-fu_input"));
		/*$( "#oUploadMultipleCertificate-fu_input").css('display','none');
		$("#__button1").css('width','100px');
		$("#__button1").html('Browse');	*/
		//$( "#__button1").addClass('button-green');
		//$( "oUploadMultipleCertificate-fu_input").css('display','none');
		/*$( "#oUploadMultipleCertificate-fu" ).parent().removeClass();
		$('#oUploadMultipleCertificate-fu').removeClass();
		$( "#oUploadMultipleCertificate-fu" ).parent().add('<span>browse</span>');
		$( "#oUploadMultipleCertificate-fu" ).parent().addClass('button-green');
		$('#oUploadMultipleCertificate-fu').addClass('file-upload');*/
		$('#idUpldNBP-fu').attr( "multiple","multiple" );
		//alert($('#oUploadMultipleCertificate-fu').attr( "multiple"));
		busyDialog.close();
	}
});
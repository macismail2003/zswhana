sap.ui.controller("view.CustomerDashBoardReturnVw", {

	onInit : function() {
	},
	navButtonPress : function(evt) { 
		var bus = sap.ui.getCore().getEventBus();
		if(fromScreenMove == "CustomerDashBoardReleaseVw"){
			if(sap.ui.getCore().byId('CustomerDashboardVw') != undefined){
				sap.ui.getCore().byId('CustomerDashboardVw').destroy();
			}
			backClickCDB = true;
			bus.publish("nav", "to", {id : "CustomerDashboardVw"});
		}else{
			fromScreenMove == "";
			bus.publish("nav", "back");
		}
	}

});
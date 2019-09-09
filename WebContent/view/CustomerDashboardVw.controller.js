sap.ui.controller("view.CustomerDashboardVw", {

	onInit : function() {
	},
	navButtonPress : function(evt) { 
		var bus = sap.ui.getCore().getEventBus();
		bus.publish("nav", "back");
	},

	
	/*onAfterRendering: function() {
		var arrdata = [{"textRegion":"Wife Swap 5fe1c68b31f0594612b14c16502af2a3123","id":"1"},{"textRegion":"Wife Swap","id":"2"},{"textRegion":"Trading Spouses","id":"3"},{"textRegion":"Trailer Park Boys","id":"4"},{"textRegion":"Top Gear Australia","id":"5"},{"textRegion":"Torchwood","id":"6"},{"textRegion":"Tracey Takes On...","id":"7"},{"textRegion":"Top Gear","id":"8"},{"textRegion":"Top Design","id":"9"},{"textRegion":"Top Chef","id":"10"},{"textRegion":"Tom and Jerry","id":"11"},{"textRegion":"Tom and Jerry Kids Show","id":"12"}];
		$("#demo-input-custom").tokenInput(arrdata, {
	             theme: "custom",
	             //tokenValue: "codeid",
	             tokenLimit: "5",	//ONLY SET FOR SINGLE SELECTION 
	             propertyToSearch: "CustName", // TEXT COLUMN VALUE
	             preventDuplicates: true	//PREVENT DUPLICATE VALUES
	    });
	}*/
	
	
});
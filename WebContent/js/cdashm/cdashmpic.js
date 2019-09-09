jQuery.sap.require("sap.ui.model.json.JSONModel");

sap.ui.model.json.JSONModel.extend("CDASHMPIC", {

	/* CDASHMPIC - Page - Seaco Dashboard page pic */

	createCDASHMPICPage : function(){

		var backEDI = new sap.m.Link({text: " < Back",
				 width:"7%",
				 wrapping:true,
				 press: function(){
					 var bus = sap.ui.getCore().getEventBus();
					 bus.publish("nav", "back");
					 $('#idHdrContnt').html('Unit Overview');
				 }});

		var oCurrent = this;

		/* CDASHMPIC - Section - Images */

		var oCDASHMPICContentImageCarousel = oCurrent.setContentImageCarousel();

		/* CDASHMPIC - Flexbox - Final */

		var oCDASHMPICContentFinal = new sap.m.FlexBox({
		         items: [
							 backEDI,
						//oCDASHM2ContentAlertSearchButtons,
						//new sap.ui.commons.Label({
						//	text : "",
						//	width : "100px"
						//}),
						oCDASHMPICContentImageCarousel
		       ],
		       direction : "Column",
		       visible: true,
		}).addStyleClass("marginLeft20");

		return oCDASHMPICContentFinal;

	},

	/* CDASHMPIC - Content - Image Carousel */

	setContentImageCarousel : function(){

		if(sap.ui.getCore().byId("idCDASHMPICCarousel") != undefined)
			 sap.ui.getCore().byId("idCDASHMPICCarousel").destroy();

			 var oCDASHMPICCarousel = new sap.m.Carousel("idCDASHMPICCarousel", {
	 			//pageIndicatorPlacement: sap.m.PlacementType.Top,
	 			//pageIndicatorPlacement: sap.m.PlacementType.Bottom,
	 			//activePage: jsonSDASHM3Pictures[activeImage],
	 			//width: "50%",
	 			//height: "50%",
	 			showPageIndicator: true,
	 			loop: true,
	 			showBusyIndicator: true,
	 			pages: []
	 		});

		return oCDASHMPICCarousel;

	}
});

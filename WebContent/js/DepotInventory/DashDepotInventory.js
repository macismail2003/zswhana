var DepotInv = [];
var depotInv;

sap.ui.model.json.JSONModel.extend("DashDepotInventory", {
	createDepotDashboard: function(){

		sap.ui.getCore().loadLibrary("sap.viz");

		var clickSelectData = false;
		 depotInv = this;
		 //Depot Inventory Chart
		 var vInteractionChart = new sap.viz.ui5.types.controller.Interaction({
			 selectability:new sap.viz.ui5.types.controller.Interaction_selectability({
				 mode:sap.viz.ui5.types.controller.Interaction_selectability_mode.single
			 })
		 }
		);
		var vDepotInvDataset = new sap.viz.ui5.data.FlattenedDataset("idDepotInvDataset",{
			dimensions:[{ axis:1, name:"Status",value:"{status}" }],
			measures:[{ name:"Count", value:"{countVal}" }],
			data:{path:"/"}});

		var lblNoDataDepot = new sap.ui.commons.TextView("DepotDashNoData",{
		    //text : "No data found for Depot Inventory",
		    text : "Loading ... ",
		    wrapping: true}).addStyleClass('sapUiLbl sapVizNoDataDefault font12');
		jQuery.sap.require("sap.ui.commons.MessageBox");

		var vDepotInventoryChart = new sap.viz.ui5.Column("DepotInventoryGraph",{
	     	width : "90%",
	     	height : "290px",
	     	//layoutData: new sap.ui.layout.GridData({span: "L12 M8 S12"}),
	     	interaction:vInteractionChart,
	     	plotArea : new sap.viz.ui5.types.VerticalBar({colorPalette:columnColor}),
	     	/*selectData:function(oEvent){
	     		 alert(this._oVIZInstance.selection()[0].data);
	     	},*/
	        dataset : vDepotInvDataset
	     }).addStyleClass("marginTop10");
		vDepotInventoryChart.setNoData(lblNoDataDepot);

		// CLICK ON ANY COLUMN
		vDepotInventoryChart.attachSelectData(
			function (oControlEvent) {
				clickSelectData= true;
				//var log0 = "Dimension selected: " + oControlEvent.getParameter("VALUE1") + '\n';
				var XaixsData = this._oVIZInstance.selection()[0].data["Status"];
				var YaxisData = this._oVIZInstance.selection()[0].data["Count"];
				//alert("X axis - "+ XaixsData + "Y Axis - "+ YaxisData);
				depotInv.callStatusScreens(XaixsData,YaxisData);
			}
		);

		/*//BELOW CODE FOR OUTSID COLUMN
		function chartClickDepotInventory(oEvent) {
		if(clickSelectData == true)
		{
			clickSelectData = false;
			return false;
		}
		depotInv.callStatusScreens("OUTSIDE","");

		}*/
		//vDepotInventoryChart.attachBrowserEvent("click",chartClickDepotInventory);

		vDepotInventoryChart.setLegend(new sap.viz.ui5.types.legend.Common ({visible:false}));
		var btnViewAll = new sap.m.Button("depotDashViewAll",{
	          text : "View All",
	          type:sap.m.ButtonType.Unstyled,
	          visible:false,
	          width:"80px",
	          press:function(){
	        	  //alert("View All");
	        	//alert("OUTSIDE");
	  			if(DepotSTATUSData.length > 0){
	  				busyDialog.open();
	  	  			var bus = sap.ui.getCore().getEventBus();
	  	  			bus.publish("nav", "to", {
	  	  					id : "DepotInvStatusDetails"
	  	  			});
	  	  			$('#idHdrContnt').html('Depot Inventory Status Details'); //CHANGE HEADER CONTENT
	  	  			var oStatusDetail = new DepotInventoryStatus();
	  	  			oStatusDetail.bindDepotSTATUSDetails();
	  	  		}/*else{
	  	  			sap.ui.commons.MessageBox.alert("No depot inventory status details available");
	  	  		}*/

	        }
		}).addStyleClass("marginRight80 submitBtn marginTop10");

		var labChart =  new sap.ui.commons.Label({text:"Depot Inventory",
			wrapping: true,
		}).addStyleClass("fontTitle");

		var oHeader = new sap.m.FlexBox({
			justifyContent : sap.m.FlexJustifyContent.SpaceBetween,
			direction : "Row",
			  items: [ labChart, btnViewAll ],
		})/*.addStyleClass("marginTop10")*/;

		var chartFlex = new sap.m.FlexBox({
			items: [  oHeader, vDepotInventoryChart],  direction: "Column"	,
		});

		return chartFlex;
	},
	callStatusScreens:function(XaixsData,YaxisData){
		switch(XaixsData){
		case "AVLB":
			//alert("AVLB");
			if(AVLBData.length > 0){
				busyDialog.open();
      			var bus = sap.ui.getCore().getEventBus();
      			bus.publish("nav", "to", {
      					id : "DepotInvAVLB"
      			});
      			$('#idHdrContnt').html('Depot Inventory for Status AVLB'); //CHANGE HEADER CONTENT
      			var oAVLBDetail = new DepotInventoryAVLB();
      			oAVLBDetail.bindAVLBDetails();
      		}else{
      			sap.ui.commons.MessageBox.alert("No depot inventory details for Status  AVLB");
      		}

			break;

		case "SALE":
			//alert("SALE");
			if(SALEData.length > 0){
				busyDialog.open();
      			var bus = sap.ui.getCore().getEventBus();
      			bus.publish("nav", "to", {
      					id : "DepotInvSALE"
      			});
      			$('#idHdrContnt').html('Depot Inventory for Status SALE'); //CHANGE HEADER CONTENT
      			var oSALEDetail = new DepotInventorySALE();
      			oSALEDetail.bindSALEDetails();
      		}else{
      			sap.ui.commons.MessageBox.alert("No depot inventory details for Status - SALE");
      		}

			break;

		case "REPAIR":
			//alert("REPA");
			if(REPAData.length > 0){
				busyDialog.open();
      			var bus = sap.ui.getCore().getEventBus();
      			bus.publish("nav", "to", {
      					id : "DepotInvREPA"
      			});
      			$('#idHdrContnt').html('Depot Inventory for Status REPAIR'); //CHANGE HEADER CONTENT
      			var oREPADetail = new DepotInventoryREPA();
      			oREPADetail.bindREPADetails();
      		}else{
      			sap.ui.commons.MessageBox.alert("No depot inventory details for Status - REPAIR");
      		}

			break;

		case "HOLD":
			//alert("HOLD");
			if(HOLDData.length > 0){
				busyDialog.open();
      			var bus = sap.ui.getCore().getEventBus();
      			bus.publish("nav", "to", {
      					id : "DepotInvHOLD"
      			});
      			$('#idHdrContnt').html('Depot Inventory for Status HOLD'); //CHANGE HEADER CONTENT
      			var oHOLDDetail = new DepotInventoryHOLD();
      			oHOLDDetail.bindHOLDDetails();
      		}else{
      			sap.ui.commons.MessageBox.alert("No depot inventory details for Status - HOLD");
      		}

			break;

		default:
			/*alert("OUTSIDE");
			if(DepotSTATUSData.length > 0){
			  busyDialog.open();
	  			var bus = sap.ui.getCore().getEventBus();
	  			bus.publish("nav", "to", {
	  					id : "DepotInvStatusDetails"
	  			});
	  			$('#idHdrContnt').html('Depot Inventory Status Details'); //CHANGE HEADER CONTENT
	  			var oStatusDetail = new DepotInventoryStatus();
	  			oStatusDetail.bindDepotSTATUSDetails();
	  		}else{
	  			sap.ui.commons.MessageBox.alert("No depot inventory status details available");
	  		}*/
			break;
		}
	}
});

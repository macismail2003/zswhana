var RepairInv =[];
var repairInv;
sap.ui.model.json.JSONModel.extend("DashRepairInventory", {
	createRepairDashboard: function(){
		repairInv = this;
		var clickSelectData = false;
		 var vInteractionChart = new sap.viz.ui5.types.controller.Interaction({
			 selectability:new sap.viz.ui5.types.controller.Interaction_selectability({
				 mode:sap.viz.ui5.types.controller.Interaction_selectability_mode.single
			 })
		 }
		);

		var vRepairInvDataset = new sap.viz.ui5.data.FlattenedDataset("idRepairInvDataset",{
			dimensions:[{ axis:1, name:"Status", value:"{status}"}],
			measures:[{ name:"Count", value:"{countVal}"}],
	     	 selectData:function(){alert("click select")},
			data:{path:"/"}});

		var lblNoDataRepair = new sap.ui.commons.TextView("RepairDashNoData",{
		    //text : "No data found for Repair Inventory",
		    text : "Loading ... ",
		    wrapping: true}).addStyleClass('sapUiLbl sapVizNoDataDefault font12');

		var vRepairInventoryChart = new sap.viz.ui5.Column("RepairInventoryGraph",{
			width : "90%",
			height : "290px",
	     	//layoutData: new sap.ui.layout.GridData({span: "L6 M8 S12"}),
			plotArea : new sap.viz.ui5.types.VerticalBar({colorPalette:columnColor}),
	        interaction:vInteractionChart,
	        /*selectData:function(){alert("click")},
	        deselectData:function(){alert("click 1")},*/
	        dataset : vRepairInvDataset
	     }).addStyleClass("marginTop10");
		vRepairInventoryChart.setNoData(lblNoDataRepair);

		// CLICK ON ANY COLUMN
		vRepairInventoryChart.attachSelectData(
			function (oControlEvent) {
				clickSelectData= true;
				//var log0 = "Dimension selected: " + oControlEvent.getParameter("VALUE1") + '\n';
				var XaixsData = this._oVIZInstance.selection()[0].data["Status"];
				var YaxisData = this._oVIZInstance.selection()[0].data["Count"];
				//alert("X axis - "+ XaixsData + "Y Axis - "+ YaxisData);
				repairInv.callStatusScreens(XaixsData,YaxisData);
			}
		);

		var btnViewAll = new sap.m.Button("repairDashViewAll",{
	          text : "View All",
	          type:sap.m.ButtonType.Unstyled,
	          visible:false,
	          width:"80px",
	          press:function(){
	        	  //alert("View All");
	        	 // alert("OUTSIDE");
	  			if(RepairSTATUSData.length > 0){
	  			  busyDialog.open();
	  	  			var bus = sap.ui.getCore().getEventBus();
	  	  			bus.publish("nav", "to", {
	  	  					id : "RepairInvStatusDetails"
	  	  			});
	  	  			$('#idHdrContnt').html('Repair Inventory Status Details'); //CHANGE HEADER CONTENT
	  	  			var oStatusDetail = new RepairInventoryStatus();
	  	  			oStatusDetail.bindRepairSTATUSDetails();
	  	  		}/*else{
	  	  			sap.ui.commons.MessageBox.alert("No repair inventory status details available");
	  	  		}*/

	        }
		}).addStyleClass("marginRight80 submitBtn marginTop10");

		//BELOW CODE FOR OUTSID COLUMN
		/*function chartClickRepairInventory(oEvent) {
		if(clickSelectData == true)
		{
			clickSelectData = false;
			return false;
		}
		repairInv.callStatusScreens("OUTSIDE","");

		}
		vRepairInventoryChart.attachBrowserEvent("click",chartClickRepairInventory);*/

		vRepairInventoryChart.setLegend(new sap.viz.ui5.types.legend.Common ({visible:false}));

		var labRepInvChart =  new sap.ui.commons.Label({text:"Repair Inventory",
			wrapping: true,
		}).addStyleClass("fontTitle");

		var oHeader = new sap.m.FlexBox({
			justifyContent : sap.m.FlexJustifyContent.SpaceBetween,
			direction : "Row",
				items: [ labRepInvChart, btnViewAll ],
		})/*.addStyleClass("marginTop10")*/;

		var chartFlexRepair = new sap.m.FlexBox({
			items: [  oHeader, vRepairInventoryChart  ],  direction: "Column"	,
		});

		 return chartFlexRepair;
	},

	callStatusScreens:function(XaixsData,YaxisData){
		switch(XaixsData){
		case "WEST":
			//alert("WEST");
			if(WESTData.length > 0){
				busyDialog.open();
      			var bus = sap.ui.getCore().getEventBus();
      			bus.publish("nav", "to", {
      					id : "RepairInvWEST"
      			});
      			$('#idHdrContnt').html('Repair Inventory for Status WEST'); //CHANGE HEADER CONTENT
      			var oWESTDetail = new RepairInventoryWEST();
      			oWESTDetail.bindWESTDetails();
      		}else{
      			sap.ui.commons.MessageBox.alert("No repair inventory details for Status  WEST");
      		}

			break;

		case "AUTH":
			//alert("AUTH");
			if(AUTHData.length > 0){
				busyDialog.open();
      			var bus = sap.ui.getCore().getEventBus();
      			bus.publish("nav", "to", {
      					id : "RepairInvAUTH"
      			});
      			$('#idHdrContnt').html('Repair Inventory for Status AUTH'); //CHANGE HEADER CONTENT
      			var oAUTHDetail = new RepairInventoryAUTH();
      			oAUTHDetail.bindAUTHDetails();
      		}else{
      			sap.ui.commons.MessageBox.alert("No repair inventory details for Status  AUTH");
      		}

			break;

		case "AWAP":
			//alert("AWAP");
			if(AWAPData.length > 0){
				busyDialog.open();
      			var bus = sap.ui.getCore().getEventBus();
      			bus.publish("nav", "to", {
      					id : "RepairInvAWAP"
      			});
      			$('#idHdrContnt').html('Repair Inventory for Status AWAP'); //CHANGE HEADER CONTENT
      			var oAWAPDetail = new RepairInventoryAWAP();
      			oAWAPDetail.bindAWAPDetails();
      		}else{
      			sap.ui.commons.MessageBox.alert("No repair inventory details for Status  AWAP");
      		}

			break;

		default:
			/*alert("OUTSIDE");
			if(RepairSTATUSData.length > 0){
			  busyDialog.open();
	  			var bus = sap.ui.getCore().getEventBus();
	  			bus.publish("nav", "to", {
	  					id : "RepairInvStatusDetails"
	  			});
	  			$('#idHdrContnt').html('Repair Inventory Status Details'); //CHANGE HEADER CONTENT
	  			var oStatusDetail = new RepairInventoryStatus();
	  			oStatusDetail.bindRepairSTATUSDetails();
	  		}else{
	  			sap.ui.commons.MessageBox.alert("No repair inventory status details available");
	  		}*/
			break;
		}
	}
});


var EDI = [
	        /*{status : 'WEST', countVal :  12 },  
	        {status : 'AWAP', countVal :  21 },
	        {status : 'AUTH', countVal :  24 },
	        {status : 'WEST', countVal : 32 },  
	        {status : 'AWAP', countVal : 21 },
	        {status : 'AUTH', countVal : 14 },
	        {status : 'WEST', countVal : 32 },  
	        {status : 'AWAP', countVal : 41 },
	        {status : 'AUTH', countVal : 14 },
	        {status : 'WEST', countVal : 32 },  
	        {status : 'AWAP', countVal : 21 },
	        {status : 'AUTH', countVal : 34 },
	        {status : 'WEST', countVal : 39 },  
	        {status : 'AWAP', countVal : 11 },
	        {status : 'AUTH', countVal : 44 },*/
];

sap.ui.model.json.JSONModel.extend("DashEDI", {
	createEDIDashboard: function(){
		 
		 var vEDIChartDataset = new sap.viz.ui5.data.FlattenedDataset("idEDIDataset",{
				dimensions:[{ axis:1,name:"Status", value:"{status}" }],
				measures:[{ name:"Count", value:"{countVal}" }],
		     	selectData:function(){alert("click select")},
				data:{path:"/"}});
			
		 var lblNoDataEDI = new sap.ui.commons.TextView("EDIDashNoData",{
			    //text : "No data found for Performance by EDI Message Processing.",
			 	text : "Loading ... ",
			    wrapping: true}).addStyleClass('sapUiLbl sapVizNoDataDefault font12');
			
			var vEDIChart = new sap.viz.ui5.Column("EDIGraph",{
				width : "90%",
				height : "290px",
			     //layoutData: new sap.ui.layout.GridData({span: "L6 M8 S12"}),
				plotArea : new sap.viz.ui5.types.VerticalBar({colorPalette:columnColor}),
		         //interaction:vInteractionChart,
		         //selectData:function(){alert("click")},
		         //deselectData:function(){alert("click 1")},
		         dataset : vEDIChartDataset
		     }).addStyleClass("marginTop10");
			
			vEDIChart.setNoData(lblNoDataEDI);

			vEDIChart.setLegend(new sap.viz.ui5.types.legend.Common ({visible:false}));
			
			var labChartEDI =  new sap.ui.commons.Label({text:"Performance by EDI Message Processing",
				wrapping: true,
			}).addStyleClass("fontTitle marginTop10");
			
			var chartFlexEDI = new sap.m.FlexBox({ 
				items: [  labChartEDI, vEDIChart  ],  direction: "Column"	,
			});
			
		 
		 return chartFlexEDI;

	}
});



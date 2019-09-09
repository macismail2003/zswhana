
var MNR = [
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

sap.ui.model.json.JSONModel.extend("DashMNR", {
	createMNRDashboard: function(){
		 
			
		 var vMnRChartDataset = new sap.viz.ui5.data.FlattenedDataset("idMnRChartDataset",{
				dimensions:[{ axis:1,name:"Status", value:"{status}" }],
				measures:[{ name:"Count", value:"{countVal}" }],
				data:{path:"/"}});
		 
		 var lblNoDataMNR = new sap.ui.commons.TextView("MNRDashNoData",{
			    //text : "No data found for Active Releases - Top 5.",
			    text : "Loading ... ",
			    wrapping: true}).addStyleClass('sapUiLbl sapVizNoDataDefault font12');
		 
		 var vMnRChart = new sap.viz.ui5.Column("MNRGraph",{
			 width : "90%",
			 height : "290px",
		     //layoutData: new sap.ui.layout.GridData({span: "L6 M8 S12"}),
			 plotArea : new sap.viz.ui5.types.VerticalBar({colorPalette:columnColor}),
	         //interaction:vInteractionChart,
	         //selectData:function(){alert("click")},
	         //deselectData:function(){alert("click 1")},
	         dataset : vMnRChartDataset
	     }).addStyleClass("marginTop10");
		 
		 vMnRChart.setNoData(lblNoDataMNR);

		 vMnRChart.setLegend(new sap.viz.ui5.types.legend.Common ({visible:false}));
		 
		 var labChartMNR =  new sap.ui.commons.Label({text:"Performance by M & R",
				wrapping: true,
			}).addStyleClass("fontTitle marginTop10");
			
			var chartFlexMNR = new sap.m.FlexBox({ 
				items: [  labChartMNR, vMnRChart  ],  direction: "Column"	,
			});
		 
		 return chartFlexMNR;

	}
});



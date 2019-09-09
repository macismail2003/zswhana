/*  

**$*$------------------------------------------------------------------------*
*$*$ Modified By : Seyed Ismail MAC
*$*$ Modified On : 23.03.2015
*$*$ Reference   : RTS 1093/1087
*$*$ Transport   : CGWK900868
*$*$ Tag         : MAC23032015
*$*$ Purpose     : A) When customer clicks ""Request for Joint Survey"", it should trigger an update in CRM >> DN status = ""Joint Survey Request"". 

					B) ""Joint Survey Requested"" status should be reflected on Seaweb, so that user have visibility that action has been taken.

					C) Customer should be able to clicks on "Lessee Approval", and overwrite ""Joint Survey Requested"" status (on DN), 
					which trigger an update in CRM >> DN status = ""Available for Billing"" and ERP >> ""APPD""
					
					D) Viewing DN  by off-hire period last 3 months does not make sense as our days in AWAP is easily > 3 months. 
					   Variant should not be by 'Off-hire Period'. it should be displaying all outstanding DN/JS pending customer approval
"


*$*$---------------------------------------------------------------------

*/




jQuery.sap.require("sap.ui.model.json.JSONModel");

var LAPrimData = [];
var LAPrimData1 = [];
var LAPrimData2 = [];
var LAPrimData3 = [];

var oLAP;
var LALineData = [];
var selectedLADNJSNo;
var selectedLAUnitNo;

var jsonLAPrimData3=[];
var jsonLALineData=[];

sap.ui.model.json.JSONModel.extend("LAPrimaryDetail", {
	
	    createScreenFlex:function(){
		
			var oScreenFlex = new sap.m.FlexBox("oLAPrimaryScreenFlex",{
				  items: [ ],
				  direction:"Column"
			});
			return oScreenFlex;
	 },
	
	    createLesseeAForm: function(){
			oLAP = this;
			
			var back = new sap.m.Link({text: " < Back",
				width:"8%",
				wrapping:true,
	            press: function(){
	            
	                   var bus = sap.ui.getCore().getEventBus();
	                       bus.publish("nav", "back");
	                       $('#idHdrContnt').html('Lessee Approval'); //CHANGE HEADER CONTENT
	        }});
			
			var labSCRText = new sap.ui.commons.Label("LA_SCRText",{wrapping: true});
			 
			var oSCRTextFlex = new sap.m.FlexBox({
			    items: [labSCRText]
			});
			
			// SCR Exclusion
			var labSCRExclusion1 = new sap.ui.commons.Label("SCRExclusion1",{wrapping: true});
			var labSCRExclusion2 = new sap.ui.commons.Label("SCRExclusion2",{wrapping: true});
			var labSCRExclusion3 = new sap.ui.commons.Label("SCRExclusion3",{wrapping: true});
			var labSCRExclusion4 = new sap.ui.commons.Label("SCRExclusion4",{wrapping: true});
			var labSCRExclusion5 = new sap.ui.commons.Label("SCRExclusion5",{wrapping: true});
			var labSCRExclusion6 = new sap.ui.commons.Label("SCRExclusion6",{wrapping: true});
			var labSCRExclusion7 = new sap.ui.commons.Label("SCRExclusion7",{wrapping: true});
			
			var lblSpace = new sap.ui.commons.Label( {text: " ",width : '8px'});
			 
			var SCRExclusionFlex1 = new sap.m.FlexBox({
			    items: [labSCRExclusion2,labSCRExclusion4,labSCRExclusion6],
				direction:"Column"
			    
			});
			
			var SCRExclusionFlex2 = new sap.m.FlexBox({
			    items: [labSCRExclusion3,labSCRExclusion5,labSCRExclusion7],
			    direction:"Column"
			});
			
			var SCRExclusionFlex3 = new sap.m.FlexBox({
			    items: [SCRExclusionFlex1,lblSpace,SCRExclusionFlex2],
			    //direction:"Row"
			});
			
			var SCRExclusionFlex = new sap.m.FlexBox("SCRF",{
			    items: [labSCRExclusion1,SCRExclusionFlex3],
			    direction:"Column",
			    visible:false,
			});
			
			var lblSpace2 = new sap.ui.commons.Label( {text: " ",width : '8px'});
			
			//CP1
			var labCP1SCRExclusion2 = new sap.ui.commons.Label("CP1SCRExclusion2",{wrapping: true});
			var labCP1SCRExclusion3 = new sap.ui.commons.Label("CP1SCRExclusion3",{wrapping: true});
			var labCP1SCRExclusion4 = new sap.ui.commons.Label("CP1SCRExclusion4",{wrapping: true});
			var labCP1SCRExclusion5 = new sap.ui.commons.Label("CP1SCRExclusion5",{wrapping: true});
			var labCP1SCRExclusion6 = new sap.ui.commons.Label("CP1SCRExclusion6",{wrapping: true});
			var labCP1SCRExclusion7 = new sap.ui.commons.Label("CP1SCRExclusion7",{wrapping: true});
			
			 
			var CP1SCRExclusionFlex1 = new sap.m.FlexBox({
			    items: [labCP1SCRExclusion2,labCP1SCRExclusion4,labCP1SCRExclusion6],direction:"Column"
			    
			});
			var CP1SCRExclusionFlex2 = new sap.m.FlexBox({
			    items: [labCP1SCRExclusion3,labCP1SCRExclusion5,labCP1SCRExclusion7],direction:"Column"
			});
			
			var CP1SCRExclusionFlex = new sap.m.FlexBox("CP1F",{
				visible:false,
			    items: [CP1SCRExclusionFlex1,lblSpace2,CP1SCRExclusionFlex2]
			//,direction:"row"
			});
			
			var lblSpace3 = new sap.ui.commons.Label( {text: " ",width : '8px'});
			//CP2
			var labCP2SCRExclusion2 = new sap.ui.commons.Label("CP2SCRExclusion2",{wrapping: true});
			var labCP2SCRExclusion3 = new sap.ui.commons.Label("CP2SCRExclusion3",{wrapping: true});
			var labCP2SCRExclusion4 = new sap.ui.commons.Label("CP2SCRExclusion4",{wrapping: true});
			var labCP2SCRExclusion5 = new sap.ui.commons.Label("CP2SCRExclusion5",{wrapping: true});
			var labCP2SCRExclusion6 = new sap.ui.commons.Label("CP2SCRExclusion6",{wrapping: true});
			var labCP2SCRExclusion7 = new sap.ui.commons.Label("CP2SCRExclusion7",{wrapping: true});
			
			 
			var CP2SCRExclusionFlex1 = new sap.m.FlexBox({
			    items: [labCP2SCRExclusion2,labCP2SCRExclusion4,labCP2SCRExclusion6],direction:"Column"
			    
			});
			var CP2SCRExclusionFlex2 = new sap.m.FlexBox({
			    items: [labCP2SCRExclusion3,labCP2SCRExclusion5,labCP2SCRExclusion7],direction:"Column"
			});
			
			var CP2SCRExclusionFlex = new sap.m.FlexBox("CP2F",{
				visible:false,
			    items: [CP2SCRExclusionFlex1,lblSpace3,CP2SCRExclusionFlex2]
			//,direction:"row"
			});
			
			var lblSpace4 = new sap.ui.commons.Label( {text: " ",width : '8px'});
			//CP3
			var labCP3SCRExclusion2 = new sap.ui.commons.Label("CP3SCRExclusion2",{wrapping: true});
			var labCP3SCRExclusion3 = new sap.ui.commons.Label("CP3SCRExclusion3",{wrapping: true});
			var labCP3SCRExclusion4 = new sap.ui.commons.Label("CP3SCRExclusion4",{wrapping: true});
			var labCP3SCRExclusion5 = new sap.ui.commons.Label("CP3SCRExclusion5",{wrapping: true});
			var labCP3SCRExclusion6 = new sap.ui.commons.Label("CP3SCRExclusion6",{wrapping: true});
			var labCP3SCRExclusion7 = new sap.ui.commons.Label("CP3SCRExclusion7",{wrapping: true});
			
			 
			var CP3SCRExclusionFlex1 = new sap.m.FlexBox({
			    items: [labCP3SCRExclusion2,labCP3SCRExclusion4,labCP3SCRExclusion6],direction:"Column"
			    
			});
			var CP3SCRExclusionFlex2 = new sap.m.FlexBox({
			    items: [labCP3SCRExclusion3,labCP3SCRExclusion5,labCP3SCRExclusion7],direction:"Column"
			});
			
			var CP3SCRExclusionFlex = new sap.m.FlexBox("CP3F",{
				visible:false,
			    items: [CP3SCRExclusionFlex1,lblSpace4,CP3SCRExclusionFlex2]
			//,direction:"row"
			});
			
			var lblSpace5 = new sap.ui.commons.Label( {text: " ",width : '8px'});
			//CP4
			var labCP4SCRExclusion2 = new sap.ui.commons.Label("CP4SCRExclusion2",{wrapping: true});
			var labCP4SCRExclusion3 = new sap.ui.commons.Label("CP4SCRExclusion3",{wrapping: true});
			var labCP4SCRExclusion4 = new sap.ui.commons.Label("CP4SCRExclusion4",{wrapping: true});
			var labCP4SCRExclusion5 = new sap.ui.commons.Label("CP4SCRExclusion5",{wrapping: true});
			var labCP4SCRExclusion6 = new sap.ui.commons.Label("CP4SCRExclusion6",{wrapping: true});
			var labCP4SCRExclusion7 = new sap.ui.commons.Label("CP4SCRExclusion7",{wrapping: true});
			
			 
			var CP4SCRExclusionFlex1 = new sap.m.FlexBox({
			    items: [labCP4SCRExclusion2,labCP4SCRExclusion4,labCP4SCRExclusion6],direction:"Column"
			    
			});
			var CP4SCRExclusionFlex2 = new sap.m.FlexBox({
			    items: [labCP4SCRExclusion3,labCP4SCRExclusion5,labCP4SCRExclusion7],direction:"Column"
			});
			
			var CP4SCRExclusionFlex = new sap.m.FlexBox("CP4F",{
				visible:false,
			    items: [CP4SCRExclusionFlex1,lblSpace5,CP4SCRExclusionFlex2]
			//,direction:"row"
			});
			
			var lblSpace6 = new sap.ui.commons.Label( {text: " ",width : '8px'});
			//CP5
			var labCP5SCRExclusion2 = new sap.ui.commons.Label("CP5SCRExclusion2",{wrapping: true});
			var labCP5SCRExclusion3 = new sap.ui.commons.Label("CP5SCRExclusion3",{wrapping: true});
			var labCP5SCRExclusion4 = new sap.ui.commons.Label("CP5SCRExclusion4",{wrapping: true});
			var labCP5SCRExclusion5 = new sap.ui.commons.Label("CP5SCRExclusion5",{wrapping: true});
			var labCP5SCRExclusion6 = new sap.ui.commons.Label("CP5SCRExclusion6",{wrapping: true});
			var labCP5SCRExclusion7 = new sap.ui.commons.Label("CP5SCRExclusion7",{wrapping: true});
			
			 
			var CP5SCRExclusionFlex1 = new sap.m.FlexBox({
			    items: [labCP5SCRExclusion2,labCP5SCRExclusion4,labCP5SCRExclusion6],direction:"Column"
			    
			});
			var CP5SCRExclusionFlex2 = new sap.m.FlexBox({
			    items: [labCP5SCRExclusion3,labCP5SCRExclusion5,labCP5SCRExclusion7],direction:"Column"
			});
			
			var CP5SCRExclusionFlex = new sap.m.FlexBox("CP5F",{
				visible:false,
			    items: [CP5SCRExclusionFlex1,lblSpace6,CP5SCRExclusionFlex2]
			//,direction:"row"
			});
			
			var lblSpace7 = new sap.ui.commons.Label( {text: " ",width : '8px'});
			//CP6
			var labCP6SCRExclusion2 = new sap.ui.commons.Label("CP6SCRExclusion2",{wrapping: true});
			var labCP6SCRExclusion3 = new sap.ui.commons.Label("CP6SCRExclusion3",{wrapping: true});
			var labCP6SCRExclusion4 = new sap.ui.commons.Label("CP6SCRExclusion4",{wrapping: true});
			var labCP6SCRExclusion5 = new sap.ui.commons.Label("CP6SCRExclusion5",{wrapping: true});
			var labCP6SCRExclusion6 = new sap.ui.commons.Label("CP6SCRExclusion6",{wrapping: true});
			var labCP6SCRExclusion7 = new sap.ui.commons.Label("CP6SCRExclusion7",{wrapping: true});
			
			 
			var CP6SCRExclusionFlex1 = new sap.m.FlexBox({
			    items: [labCP6SCRExclusion2,labCP6SCRExclusion4,labCP6SCRExclusion6],direction:"Column"
			    
			});
			var CP6SCRExclusionFlex2 = new sap.m.FlexBox({
			    items: [labCP6SCRExclusion3,labCP6SCRExclusion5,labCP6SCRExclusion7],direction:"Column"
			});
			
			var CP6SCRExclusionFlex = new sap.m.FlexBox("CP6F",{
				visible:false,
			    items: [CP6SCRExclusionFlex1,lblSpace7,CP6SCRExclusionFlex2]
			//,direction:"row"
			});
			
			var lblSpace8 = new sap.ui.commons.Label( {text: " ",width : '8px'});
			//Cp8
			var labCP7SCRExclusion2 = new sap.ui.commons.Label("CP7SCRExclusion2",{wrapping: true});
			var labCP7SCRExclusion3 = new sap.ui.commons.Label("CP7SCRExclusion3",{wrapping: true});
			var labCP7SCRExclusion4 = new sap.ui.commons.Label("CP7SCRExclusion4",{wrapping: true});
			var labCP7SCRExclusion5 = new sap.ui.commons.Label("CP7SCRExclusion5",{wrapping: true});
			var labCP7SCRExclusion6 = new sap.ui.commons.Label("CP7SCRExclusion6",{wrapping: true});
			var labCP7SCRExclusion7 = new sap.ui.commons.Label("CP7SCRExclusion7",{wrapping: true});
			
			 
			var CP7SCRExclusionFlex1 = new sap.m.FlexBox({
			    items: [labCP7SCRExclusion2,labCP7SCRExclusion4,labCP7SCRExclusion6],direction:"Column"
			    
			});
			var CP7SCRExclusionFlex2 = new sap.m.FlexBox({
			    items: [labCP7SCRExclusion3,labCP7SCRExclusion5,labCP7SCRExclusion7],direction:"Column"
			});
			
			var CP7SCRExclusionFlex = new sap.m.FlexBox("CP7F",{
				visible:false,
			    items: [CP7SCRExclusionFlex1,lblSpace8,CP7SCRExclusionFlex2]
			//,direction:"row"
			});
			
			var lblSpace9 = new sap.ui.commons.Label( {text: " ",width : '8px'});
			//CP8
			var labCP8SCRExclusion2 = new sap.ui.commons.Label("CP8SCRExclusion2",{wrapping: true});
			var labCP8SCRExclusion3 = new sap.ui.commons.Label("CP8SCRExclusion3",{wrapping: true});
			var labCP8SCRExclusion4 = new sap.ui.commons.Label("CP8SCRExclusion4",{wrapping: true});
			var labCP8SCRExclusion5 = new sap.ui.commons.Label("CP8SCRExclusion5",{wrapping: true});
			var labCP8SCRExclusion6 = new sap.ui.commons.Label("CP8SCRExclusion6",{wrapping: true});
			var labCP8SCRExclusion7 = new sap.ui.commons.Label("CP8SCRExclusion7",{wrapping: true});
			
			 
			var CP8SCRExclusionFlex1 = new sap.m.FlexBox({
			    items: [labCP8SCRExclusion2,labCP8SCRExclusion4,labCP8SCRExclusion6]
			//,direction:"Column"
			    
			});
			var CP8SCRExclusionFlex2 = new sap.m.FlexBox({
			    items: [labCP8SCRExclusion3,labCP8SCRExclusion5,labCP8SCRExclusion7]
			//,direction:"Column"
			});
			
			var CP8SCRExclusionFlex = new sap.m.FlexBox("CP8F",{
				visible:false,
			    items: [CP8SCRExclusionFlex1,lblSpace9,CP8SCRExclusionFlex2]
			//,direction:"row"
			});
			
			var lblSpace10 = new sap.ui.commons.Label( {text: " ",width : '8px'});
			//CP9
			var labCP9SCRExclusion2 = new sap.ui.commons.Label("CP9SCRExclusion2",{wrapping: true});
			var labCP9SCRExclusion3 = new sap.ui.commons.Label("CP9SCRExclusion3",{wrapping: true});
			var labCP9SCRExclusion4 = new sap.ui.commons.Label("CP9SCRExclusion4",{wrapping: true});
			var labCP9SCRExclusion5 = new sap.ui.commons.Label("CP9SCRExclusion5",{wrapping: true});
			var labCP9SCRExclusion6 = new sap.ui.commons.Label("CP9SCRExclusion6",{wrapping: true});
			var labCP9SCRExclusion7 = new sap.ui.commons.Label("CP9SCRExclusion7",{wrapping: true});
			
			 
			var CP9SCRExclusionFlex1 = new sap.m.FlexBox({
			    items: [labCP9SCRExclusion2,labCP9SCRExclusion4,labCP9SCRExclusion6],direction:"Column"
			    
			});
			var CP9SCRExclusionFlex2 = new sap.m.FlexBox({
			    items: [labCP9SCRExclusion3,labCP9SCRExclusion5,labCP9SCRExclusion7],direction:"Column"
			});
			
			var CP9SCRExclusionFlex = new sap.m.FlexBox("CP9F",{
				visible:false,
			    items: [CP9SCRExclusionFlex1,lblSpace10,CP9SCRExclusionFlex2]
			//,direction:"row"
			});
			
			var lblSpace11 = new sap.ui.commons.Label( {text: " ",width : '8px'});
			// SCR Excess
			var labSCRExcess1 = new sap.ui.commons.Label("SCRExcess1",{wrapping: true});
			var labSCRExcess2 = new sap.ui.commons.Label("SCRExcess2",{wrapping: true});
			var labSCRExcess3 = new sap.ui.commons.Label("SCRExcess3",{wrapping: true});
			var labSCRExcess4 = new sap.ui.commons.Label("SCRExcess4",{wrapping: true});
			var labSCRExcess5 = new sap.ui.commons.Label("SCRExcess5",{wrapping: true});
			var labSCRExcess6 = new sap.ui.commons.Label("SCRExcess6",{wrapping: true});
			var labSCRExcess7 = new sap.ui.commons.Label("SCRExcess7",{wrapping: true});
			
			 
			var SCRExcessFlex1 = new sap.m.FlexBox({
			    items: [labSCRExcess2,labSCRExcess4,labSCRExcess6],direction:"Column"
			    
			});
			var SCRExcessFlex2 = new sap.m.FlexBox({
			    items: [labSCRExcess3,labSCRExcess5,labSCRExcess7],direction:"Column"
			});
			
			var SCRExcessFlex3 = new sap.m.FlexBox({
			    items: [SCRExcessFlex1,lblSpace11,SCRExcessFlex2]
			//,direction:"row"
			});
			
			var SCRExcessFlex = new sap.m.FlexBox("SCRE1F",{
				visible:false,
			    items: [labSCRExcess1,SCRExcessFlex3],direction:"Column"
			});

			
	    //****** first table
			 var oLAPrimDetTable1 = new sap.ui.table.Table("LAPrimData1",{
			        visibleRowCount: 6,
			        firstVisibleRow: 1,
			        selectionMode: sap.ui.table.SelectionMode.None,
			         width: "100%",
			        columnHeaderVisible: false
			   }).addStyleClass("tblBorder");
				
				oLAPrimDetTable1.addColumn(new sap.ui.table.Column({	      
			        template: new sap.ui.commons.TextView().bindProperty("text", "text"),
			         width:"100px",
			         resizable:false,
				}));
				oLAPrimDetTable1.addColumn(new sap.ui.table.Column({	      
			        template: new sap.ui.commons.TextView().bindProperty("text", "value").addStyleClass("wraptext"),
			         width:"100px",
			         resizable:false,
				}));
				
				var strNoDataTbl1 = '<div class="sapUiTableCtrlEmpty custTblBgColor" tabindex="0"><span id="idspnNodataLAPrimDetTable1"';
				strNoDataTbl1 += 'class="sapUiLbl custTblBgColor sapUiTableCtrlEmptyMsg">Loading...</span></div>';

				var ohtmlCntrl1 = new sap.ui.core.HTML("idhtmlNoDataLAPrimDetTable1",{content: strNoDataTbl1});
					 
				oLAPrimDetTable1.setNoData(ohtmlCntrl1);
					
		//****** second table	 
				var oLAPrimDetTable2 = new sap.ui.table.Table("LAPrimData2",{
			        visibleRowCount: 6,
			        firstVisibleRow: 1,
			        selectionMode: sap.ui.table.SelectionMode.None,
			       width: "100%",
			        columnHeaderVisible: false
			   }).addStyleClass("tblBorder");
				
				oLAPrimDetTable2.addColumn(new sap.ui.table.Column({	      
			        template: new sap.ui.commons.TextView().bindProperty("text", "text"),
			        width:"100px",
			        resizable:false
				}));
				oLAPrimDetTable2.addColumn(new sap.ui.table.Column({	      
			        template: new sap.ui.commons.TextView().bindProperty("text", "value").addStyleClass("wraptext"),
			        width:"100px",
			        resizable:false
				}));
				
				var strNoDataTbl2 = '<div class="sapUiTableCtrlEmpty custTblBgColor" tabindex="0"><span id="idspnNodataLAPrimDetTable2"';
				strNoDataTbl2 += 'class="sapUiLbl custTblBgColor sapUiTableCtrlEmptyMsg">Loading...</span></div>';

				var ohtmlCntrl2 = new sap.ui.core.HTML("idhtmlNoDataLAPrimDetTable2",{content: strNoDataTbl2});
					 
				oLAPrimDetTable2.setNoData(ohtmlCntrl2);
					
		//******* third table	
				  var oUtil = new utility();
			 var oLAPrimDetTable3 = new sap.ui.table.Table("LAPrimData3",{
			        visibleRowCount: 5,
			        firstVisibleRow: 1,
			        columnHeaderHeight: 30,
			        width: "60%",
			        selectionMode: sap.ui.table.SelectionMode.None,
			   }).addStyleClass("tblBorder marginTop10");		 
		
				
				oLAPrimDetTable3.addColumn(new sap.ui.table.Column({	
					label: new sap.ui.commons.Label({text: " "}),
			        template: new sap.ui.commons.TextView().bindProperty("text", "text"),
			        sortProperty: "text",
			        filterProperty: "text",
			        width:"100px",
			        resizable:false
				}));
				var oLabCol = new sap.ui.table.Column({
					label: new sap.ui.commons.Label({text: "Labour "}),
			        template: new sap.ui.commons.TextView().bindProperty("text", "labour"),
			        sortProperty: "labour",
			        filterProperty: "labour",
			        width:"100px",
			        resizable:false
				});
				oLAPrimDetTable3.addColumn(oLabCol);
				oUtil.addColumnSorterAndFilter(oLabCol, oUtil.compareUptoCount);
				
				var oMatCol = new sap.ui.table.Column({	
					label: new sap.ui.commons.Label({text: "Material"}),
			        template: new sap.ui.commons.TextView().bindProperty("text", "material"),
			        sortProperty: "material",
			        filterProperty: "material",
			        width:"100px",
			        resizable:false
				});
				oLAPrimDetTable3.addColumn(oMatCol);
				oUtil.addColumnSorterAndFilter(oMatCol, oUtil.compareUptoCount);
				
				var oTotalCol = new sap.ui.table.Column({	
					label: new sap.ui.commons.Label({text: "Total"}),
			        template: new sap.ui.commons.TextView().bindProperty("text", "total"),
			        sortProperty: "total",
			        filterProperty: "total",
			        width:"100px",
			        resizable:false
				});
				oLAPrimDetTable3.addColumn(oTotalCol);
				oUtil.addColumnSorterAndFilter(oTotalCol, oUtil.compareUptoCount);
				
				var strNoDataTbl3 = '<div class="sapUiTableCtrlEmpty custTblBgColor" tabindex="0"><span id="idspnNodataLAPrimDetTable3"';
				strNoDataTbl3 += 'class="sapUiLbl custTblBgColor sapUiTableCtrlEmptyMsg">Loading...</span></div>';

				var ohtmlCntrl3 = new sap.ui.core.HTML("idhtmlNoDataLAPrimDetTable3",{content: strNoDataTbl3});
					 
				oLAPrimDetTable3.setNoData(ohtmlCntrl3);
				
				var btnPrint = new sap.m.Button({
		            text : "Print",
		            type:sap.m.ButtonType.Unstyled,
		            //icon: sap.ui.core.IconPool.getIconURI("print"),
		            icon: sap.ui.core.IconPool.getIconURI("print"),
		            press:function(){
		            	  var tab = oLAP.makeHTMLTableLA(LAPrimData,LAPrimData1,LAPrimData2,jsonLAPrimData3,jsonLALineData, "Lessee Approval - Primary Details", "print");
			        	  var newWin = window.open();
			        	  newWin.document.write(tab);
			        	  newWin.print();
		            	 
		            }
		         }).addStyleClass("submitBtn");
		  
		         
		         var btnExport = new sap.m.Button({
		            text : "Export To Excel",
		            type:sap.m.ButtonType.Unstyled,
		            //icon: sap.ui.core.IconPool.getIconURI("excel-attachment"),
		            icon: sap.ui.core.IconPool.getIconURI("excel-attachment"),
		            press:function(){
		                  //alert("Export to Excel");
		            	oLAP.makeHTMLTableLA(LAPrimData,LAPrimData1,LAPrimData2,jsonLAPrimData3,jsonLALineData, "Lessee Approval - Primary Details", "export");
		            }
		         }).addStyleClass("submitBtn");

		         var btnExportPDF = new sap.m.Button({
			            text : "Export To PDF",
			            type:sap.m.ButtonType.Unstyled,
			            //icon: sap.ui.core.IconPool.getIconURI("pdf-attachment"),
			            icon: sap.ui.core.IconPool.getIconURI("pdf-attachment"),
			            press:function(){
			            	var title = "Lessee Approval - Primary Details";
			            	var scrText = LAPrimData[0].SctText;
			            	var jsonSCR=[];
			            	jsonSCR = oLAP.makeScrJson();
			            	var cWSCR= [1,1];
			            	
			            	var jsonData1 =  [];
			            	jsonData1 = LAPrimData1;
			            	var cWData1 = [2,2];
			            	
			            	var jsonData2 = [];
			            	jsonData2 = LAPrimData2;
			            	var cWData2  =  [1.3,2];
			            	
			            	var jsonData3 = [];
			            	jsonData3 = LAPrimData3;
			            	
			            	var jsonData4 = [];
			            	jsonData4 = jsonLALineData;
			            	
			            	var verticalOffset = 1.0; 
			            	
				            createPrimaryPDF(title, scrText, jsonSCR,cWSCR, jsonData1,cWData1, jsonData2,cWData2,jsonData3,jsonData4, verticalOffset);
				            
			            }
			         }).addStyleClass("submitBtn");
		         var lblSpaceLegend = new sap.ui.commons.Label( {text: " ",width : '5px'});
		         var lblSpaceLegend1 = new sap.ui.commons.Label( {text: " ",width : '5px'});
		         var LAFlexToolbar = new sap.m.FlexBox("LAFlexToolbar",{
		     		width: "60%",
		     		items:[
		     		       btnExportPDF,lblSpaceLegend,
		     		       btnExport,lblSpaceLegend1,
		     		       btnPrint
		     		],
		     		visible:false,
		     		direction: sap.m.FlexDirection.RowReverse
		     	});
		        
		         var vHDivider = new sap.ui.commons.HorizontalDivider({width: "95%", type: "Area", height: "Medium"});
		         
		         var btnshowline = new sap.m.Button({
			            text : "Show Line Item Details",
			            type:sap.m.ButtonType.Unstyled,
			            visible:true,
			            press:function(){
			                  //alert("Show line item details");
			            	btnshowline.setVisible(false);
			            	sap.ui.getCore().byId("islineDetSpc2").setVisible(false);
			                  oLAP.bindLALineItems();
			            }
			         }).addStyleClass("submitBtn");
		         
		         var buttonAccessRoleWise = new loggedInU().filterLoggedInUserData("BUTTON");
			     var isVisible = false;
			     if(buttonAccessRoleWise.length>0){
			        	if(buttonAccessRoleWise[0].ScrView.trim() == "approve_estimate")
			        		isVisible = true;
			         	else
			        		isVisible = false;
			        		
			      }
			        
		         var btnAprest = new sap.m.Button({
			            text : "Approve Estimate",
			            type:sap.m.ButtonType.Unstyled,
			            visible:isVisible,
			            press:function(){
			                  //alert("Approve CLicked");
			                  oLAP.gotoApproveEstimate();
			            }
			         }).addStyleClass("submitBtn");
		         
		         var btnReqJoin = new sap.m.Button("jointSurvey",{
			            text : "Request for Joint Survey",
			            type:sap.m.ButtonType.Unstyled,
			            press:function(){
			            	oLAP.performJointSurvey();
			            }
			         }).addStyleClass("submitBtn");
		         
		         var lblSpaceLegend2 = new sap.ui.commons.Label("islineDetSpc2",{text: " ",width : '5px',visible:true});
		         var lblSpaceLegend3 = new sap.ui.commons.Label( {text: " ",width : '5px'});
		         
		         var LAFlexFooter = new sap.m.FlexBox("LAFlexFooter",{
			     		
			     		items:[
			     		       btnshowline,lblSpaceLegend2,
			     		       btnAprest,lblSpaceLegend3,
			     		       btnReqJoin
			     		],
			     		direction: "Row",
			     		visible:false
			     	}).addStyleClass("marginTop10");
		     
			var oLADetForm1Layout = new sap.ui.layout.form.ResponsiveGridLayout();
			var oLADetForm1 = new sap.ui.layout.form.Form({
		 			layout: oLADetForm1Layout,
		 			formContainers: [
		 			                 
		 				new sap.ui.layout.form.FormContainer({
		 					//title: "Lessee Approval",
		 					formElements: [
		 										
								new sap.ui.layout.form.FormElement({
									    fields: [back],
									    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
								}),
		 						new sap.ui.layout.form.FormElement({
	 							    fields: [oSCRTextFlex],
	 							    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		 						}),
		 						new sap.ui.layout.form.FormElement({
	 							    fields: [SCRExclusionFlex],
	 							    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		 						}),
		 						new sap.ui.layout.form.FormElement({
	 							    fields: [CP1SCRExclusionFlex],
	 							    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
	 						    }),
		 						new sap.ui.layout.form.FormElement({
	 							    fields: [CP2SCRExclusionFlex],
	 							    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		 						}),
		 						new sap.ui.layout.form.FormElement({
	 							    fields: [CP3SCRExclusionFlex],
	 							    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		 						}),
		 						new sap.ui.layout.form.FormElement({
	 							    fields: [CP4SCRExclusionFlex],
	 							    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
	 						    }),
		 						new sap.ui.layout.form.FormElement({
	 							    fields: [CP5SCRExclusionFlex],
	 							    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		 						}),
		 						new sap.ui.layout.form.FormElement({
	 							    fields: [CP6SCRExclusionFlex],
	 							    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		 						}),
		 						new sap.ui.layout.form.FormElement({
	 							    fields: [CP7SCRExclusionFlex],
	 							    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		 						}),
		 						new sap.ui.layout.form.FormElement({
	 							    fields: [CP8SCRExclusionFlex],
	 							    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
	 						    }),
		 						new sap.ui.layout.form.FormElement({
	 							    fields: [CP9SCRExclusionFlex],
	 							    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		 						}),
		 						new sap.ui.layout.form.FormElement({
	 							    fields: [SCRExcessFlex],
	 							    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		 						})
		 						]
		 				})
		 			]
		 		});
				var oLADetForm2Layout = new sap.ui.layout.form.ResponsiveGridLayout({
					/*labelSpanL: 1,
		            labelSpanM: 3,
		            labelSpanS: 6,
		            emptySpanL: 0,
		            emptySpanM: 0,
		            emptySpanS: 0,
		            columnsL: 2,
		            columnsM: 2,
		            columnsS: 1,
		            breakpointL: 900,
		            breakpointM: 400*/
	
			  });
			  var oLADetForm2 = new sap.ui.layout.form.Form({
		 			layout: oLADetForm2Layout,
		 			formContainers: [
		 			                 
		 				new sap.ui.layout.form.FormContainer({
		 					formElements: [
								new sap.ui.layout.form.FormElement({
									    fields: [oLAPrimDetTable1],
									    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
									}),
		 								 					    
		 						]
		 				}),
		 				
		 				new sap.ui.layout.form.FormContainer({
		 					formElements: [
								new sap.ui.layout.form.FormElement({
									    fields: [oLAPrimDetTable2],
									    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
									}),
		 								 					    
		 						]
		 				})
		 				
		 				]
		 		});
			 
			 var oLADetForm3Layout = new sap.ui.layout.form.ResponsiveGridLayout();
			 var oLADetForm3 = new sap.ui.layout.form.Form({
		 			layout: oLADetForm3Layout,
		 			formContainers: [
		 			                 
		 				new sap.ui.layout.form.FormContainer({
		 					formElements: [
								new sap.ui.layout.form.FormElement({
								    fields: [LAFlexToolbar],
								    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
								}),
							   new sap.ui.layout.form.FormElement({
									    fields: [oLAPrimDetTable3],
									    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
								}),
								new sap.ui.layout.form.FormElement({
									    fields: [LAFlexFooter],
									    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
								}),
								new sap.ui.layout.form.FormElement("LAPrLineItems",{
									   fields: [],
									   layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
								})
									
		 								 					    
		 						]
		 				})	 				
		 					 				
		 				]
		 		});
			 
			 var oFlexFormGrp = new sap.m.FlexBox({
		     		items:[
		     		       oLADetForm1,
		     		       oLADetForm2,
		     		       oLADetForm3
		     		],
		     		direction: "Column"
		     	});
			//return oFlexFormGrp;
			
			sap.ui.getCore().byId("oLAPrimaryScreenFlex").addItem(oFlexFormGrp);
		},
		
		createLALineitems:function(){
			busyDialog.open();
			
			var oLALineTable = new sap.ui.table.Table("LALineItemTbl",{
		        visibleRowCount: 1,
		        firstVisibleRow: 1,
		        columnHeaderHeight: 45,
		        selectionMode: sap.ui.table.SelectionMode.None,
		        width:"100%"
		        //navigationMode: sap.ui.table.NavigationMode.Paginator,
		   }).addStyleClass("tblBorder marginTop10");
			
			oLALineTable.addColumn(new sap.ui.table.Column({	
				label: new sap.ui.commons.Label({text: "Image"}),
		        template: new sap.ui.commons.Image({
		        	
	 				press : function(oEvent) {
	 					//alert("View clicked line Item No : "+ this.getAlt());
	 					LAPiclineItemNo = this.getAlt();
	 					
	 					LAPicDNJSNo = selectedLADNJSNo;
	 					LAPUnitNo = selectedLAUnitNo;
	 					
	 					//LAPicDNJSNo = "5126005";
	 					//LAPUnitNo = "GESU5739343";
	 					oLAP.gotoLAPictures();
	 				}
	 			}).bindProperty("src", "Image").bindProperty("width", "ImageWidth").bindProperty("height", "ImageHeight").bindProperty("alt", "Line"),
		        
		        resizable:false,
		        width:"60px"
			}));
			
			oLALineTable.addColumn(new sap.ui.table.Column({	
				label: new sap.ui.commons.Label({text: "Line"}),
		        template: new sap.ui.commons.TextView().bindProperty("text", "Line"),
		        sortProperty: "Line",
		        filterProperty: "Line",
		        resizable:false,
		        width:"80px"
			}));
			
			
			 
			oLALineTable.addColumn(new sap.ui.table.Column({	
				label: new sap.ui.commons.Label({text: "Cmp"}),
		        template: new sap.ui.commons.TextView().bindProperty("text", "ComCode"),
		        sortProperty: "ComCode",
		        filterProperty: "ComCode",
		        resizable:false,
		        width:"50px"
			}));
			oLALineTable.addColumn(new sap.ui.table.Column({	
				label: new sap.ui.commons.Label({text: "Dam"}),
		        template: new sap.ui.commons.TextView().bindProperty("text", "DamCode"),
		        sortProperty: "DamCode",
		        filterProperty: "DamCode",
		        resizable:false,
		        width:"50px"
			}));
			oLALineTable.addColumn(new sap.ui.table.Column({	
				label: new sap.ui.commons.Label({text: "Rep"}),
		        template: new sap.ui.commons.TextView().bindProperty("text", "RepCode"),
		        sortProperty: "RepCode",
		        filterProperty: "RepCode",
		        resizable:false,
		        width:"50px"
			}));
			oLALineTable.addColumn(new sap.ui.table.Column({	
				label: new sap.ui.commons.Label({text: "Locn"}),
		        template: new sap.ui.commons.TextView().bindProperty("text", "LocCode"),
		        sortProperty: "LocCode",
		        filterProperty: "LocCode",
		        resizable:false,
		        width:"50px"
			}));
			oLALineTable.addColumn(new sap.ui.table.Column({	
				label: new sap.ui.commons.Label({text: "Mat"}),
		        template: new sap.ui.commons.TextView().bindProperty("text", "MatCode"),
		        sortProperty: "MatCode",
		        filterProperty: "MatCode",
		        resizable:false,
		        width:"70px"
			}));
			oLALineTable.addColumn(new sap.ui.table.Column({	
				label: new sap.ui.commons.TextView ({text: "Repair Method & \n Component Description"}).addStyleClass("tblHeaderCustomTV"),
		        template: new sap.ui.commons.TextView().bindProperty("text", "LineDesc"),
		        sortProperty: "LineDesc",
		        filterProperty: "LineDesc",
		        resizable:false,
		        width:"240px"
			}));
			oLALineTable.addColumn(new sap.ui.table.Column({	
				label: new sap.ui.commons.Label({text: "Lth"}),
		        template: new sap.ui.commons.TextView().bindProperty("text", "Length"),
		        sortProperty: "Length",
		        filterProperty: "Length",
		        resizable:false,
		        width:"50px"
			}));
			oLALineTable.addColumn(new sap.ui.table.Column({	
				label: new sap.ui.commons.Label({text: "Wth"}),
		        template: new sap.ui.commons.TextView().bindProperty("text", "Width"),
		        sortProperty: "Width",
		        filterProperty: "Width",
		        resizable:false,
		        width:"50px"
			}));
			oLALineTable.addColumn(new sap.ui.table.Column({	
				label: new sap.ui.commons.Label({text: "Qty"}),
		        template: new sap.ui.commons.TextView().bindProperty("text", "Qty"),
		        sortProperty: "Qty",
		        filterProperty: "Qty",
		        resizable:false,
		        width:"50px"
			}));
			oLALineTable.addColumn(new sap.ui.table.Column({	
				label: new sap.ui.commons.Label({text: "Hrs"}),
		        template: new sap.ui.commons.TextView().bindProperty("text", "Hours"),
		        sortProperty: "Hours",
		        filterProperty: "Hours",
		        resizable:false,
		        width:"50px"
			}));
			oLALineTable.addColumn(new sap.ui.table.Column({	
				label: new sap.ui.commons.Label({text: "Lab"}),
		        template: new sap.ui.commons.TextView().bindProperty("text", "LabCost"),
		        sortProperty: "LabCost",
		        filterProperty: "LabCost",
		        resizable:false,
		        width:"70px"
			}));
			oLALineTable.addColumn(new sap.ui.table.Column({	
				label: new sap.ui.commons.Label({text: "Mat Cost"}),
		        template: new sap.ui.commons.TextView().bindProperty("text", "MatCost"),
		        sortProperty: "MatCost",
		        filterProperty: "MatCost",
		        resizable:false,
		        width:"100px"
			}));
			oLALineTable.addColumn(new sap.ui.table.Column({	
				label: new sap.ui.commons.Label({text: "Total"}),
		        template: new sap.ui.commons.TextView().bindProperty("text", "TotCost"),
		        sortProperty: "TotCost",
		        filterProperty: "TotCost",
		        resizable:false,
		        width:"100px"
			}));
			oLALineTable.addColumn(new sap.ui.table.Column({	
				label: new sap.ui.commons.Label({text: "A1"}),
		        template: new sap.ui.commons.TextView().bindProperty("text", "Indicator"),
		        sortProperty: "Indicator",
		        filterProperty: "Indicator",
		        resizable:false,
		        width:"50px"
			}));
			
			var strNoDataTbl4 = '<div class="sapUiTableCtrlEmpty custTblBgColor" tabindex="0"><span id="idspnNodataLAPrimDetTable4"';
			strNoDataTbl4 += 'class="sapUiLbl custTblBgColor sapUiTableCtrlEmptyMsg">Loading...</span></div>';

			var ohtmlCntrl4 = new sap.ui.core.HTML("idhtmlNoDataLAPrimDetTable4",{content: strNoDataTbl4});
				 
			oLALineTable.setNoData(ohtmlCntrl4);
			
			var oLALineFlex = new sap.m.FlexBox("LALineFlex",{
				  items: [
				    new sap.ui.commons.HorizontalDivider({width: "95%", type: "Area", height: "Medium"}),
				    new sap.m.Text({text:"Line Item Details"}).addStyleClass("font15Bold marginTop10"),
				    oLALineTable
				  ],
				  direction: "Column",
				  width: "100%"
			});
			
			return oLALineFlex.addStyleClass("marginTop10");
		},
		
		bindLADetails:function(){
			busyDialog.open();
			var filter = "/Lease_Approval_Details?$filter=ObjectId eq '"+selectedLADNJSNo+"'";
			
			/* Begin of commenting by Seyed Ismail on 23.02.2015 "MAC23022015 */
			/*if(selectedLADNJSNo.substring(0,1) != "3")
				sap.ui.getCore().byId("jointSurvey").setVisible(true);
			else
				sap.ui.getCore().byId("jointSurvey").setVisible(false);
			
			//alert("Str : "+serviceUrl+filter); */
			/* End of commenting by Seyed Ismail on 23.02.2015 "MAC23022015 */
			
			oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
			OData.request({ 
			     requestUri: serviceUrl + filter,
			     //user:"pcsdevl", password:"igate@123",
			     method: "GET", 
			     dataType: 'json',
			     headers: 
			      {
			         "X-Requested-With": "XMLHttpRequest",
			         "Content-Type": "application/json; charset=utf-8",
			         "DataServiceVersion": "2.0", 
			         "X-CSRF-Token":"Fetch"   
			     }          
			   },
			   function (data, response){ 
			   	
			   	//alert("data.results.length" + data.results.length);
			   	//alert("data" + window.JSON.stringify(data.results));
				   busyDialog.close();
			   	if(data.results.length == 0){
			   		busyDialog.close();
			   		
			   		var strNoDataTbl1 = '<div class="sapUiTableCtrlEmpty custTblBgColor" tabindex="0"><span id="idspnNodataLAPrimDetTable1"';
			  		    strNoDataTbl1 += 'class="sapUiLbl custTblBgColor sapUiTableCtrlEmptyMsg">No data</span></div>';
			  		    sap.ui.getCore().byId('idhtmlNoDataLAPrimDetTable1').setContent(strNoDataTbl1);
			   		
			   		var strNoDataTbl2 = '<div class="sapUiTableCtrlEmpty custTblBgColor" tabindex="0"><span id="idspnNodataLAPrimDetTable2"';
			  		    strNoDataTbl2 += 'class="sapUiLbl custTblBgColor sapUiTableCtrlEmptyMsg">No data</span></div>';
			  		    sap.ui.getCore().byId('idhtmlNoDataLAPrimDetTable2').setContent(strNoDataTbl2);
			   		
			   		var strNoDataTbl3 = '<div class="sapUiTableCtrlEmpty custTblBgColor" tabindex="0"><span id="idspnNodataLAPrimDetTable3"';
			  		    strNoDataTbl3 += 'class="sapUiLbl custTblBgColor sapUiTableCtrlEmptyMsg">No data</span></div>';
			  		    sap.ui.getCore().byId('idhtmlNoDataLAPrimDetTable3').setContent(strNoDataTbl3);
			   		
			   	}else  	if(data.results.length>0){
			   		
					/* Begin of adding by Seyed Ismail on 23.02.2015 "MAC23022015 */
			   		
					if(data.results[0].RjsEna == "")
						{
						sap.ui.getCore().byId("jointSurvey").setVisible(true);
						}
					else
						{
						sap.ui.getCore().byId("jointSurvey").setEnabled(false);
						sap.ui.getCore().byId("jointSurvey").setText("Joint Survey Requested");
						sap.ui.getCore().byId("jointSurvey").toggleStyleClass("submitBtnDisabled", true);
						}
					/* End of adding by Seyed Ismail on 23.02.2015 "MAC23022015 */
			   		
			   		sap.ui.getCore().byId('LAFlexToolbar').setVisible(true);
			   		sap.ui.getCore().byId('LAFlexFooter').setVisible(true);
			   		
			   		LAPrimData1 = [];
					LAPrimData2 = [];
					LAPrimData3 = [];
					LAPrimData = [];
					jsonLALineData=[];
					
					
			   		LAPrimData = data.results;
			   		
			   		//alert("Data length : "+ PrimData.length);
			   		
			   		sap.ui.getCore().byId("LA_SCRText").setText(LAPrimData[0].SctText);
			   		
			   		if(LAPrimData[0].ScrExclision1.trim().length>0){
			   			sap.ui.getCore().byId("SCRF").setVisible(true);
			   			sap.ui.getCore().byId("SCRExclusion1").addStyleClass("fontTitleBold marginTop10 marginBottom10");
			   			sap.ui.getCore().byId("SCRExclusion1").setText(LAPrimData[0].ScrExclision1);
				   		sap.ui.getCore().byId("SCRExclusion2").setText(LAPrimData[0].ScrExclision2);
				   		sap.ui.getCore().byId("SCRExclusion3").setText(LAPrimData[0].ScrExclision3);
				   		sap.ui.getCore().byId("SCRExclusion4").setText(LAPrimData[0].ScrExclision4);
				   		sap.ui.getCore().byId("SCRExclusion5").setText(LAPrimData[0].ScrExclision5);
				   		sap.ui.getCore().byId("SCRExclusion6").setText(LAPrimData[0].ScrExclision6);
				   		sap.ui.getCore().byId("SCRExclusion7").setText(LAPrimData[0].ScrExclision7);
			   		}else
			   			sap.ui.getCore().byId("SCRF").setVisible(false);
			   		
			   		if(LAPrimData[0].Cp1ScrExclision2.length>0){
			   			sap.ui.getCore().byId("CP1F").setVisible(true);
			   			sap.ui.getCore().byId("CP1F").addStyleClass("marginTop10");
			   			sap.ui.getCore().byId("CP1SCRExclusion2").setText(LAPrimData[0].Cp1ScrExclision2);
				   		sap.ui.getCore().byId("CP1SCRExclusion3").setText(LAPrimData[0].Cp1ScrExclision3);
				   		sap.ui.getCore().byId("CP1SCRExclusion4").setText(LAPrimData[0].Cp1ScrExclision4);
				   		sap.ui.getCore().byId("CP1SCRExclusion5").setText(LAPrimData[0].Cp1ScrExclision5);
				   		sap.ui.getCore().byId("CP1SCRExclusion6").setText(LAPrimData[0].Cp1ScrExclision6);
				   		sap.ui.getCore().byId("CP1SCRExclusion7").setText(LAPrimData[0].Cp1ScrExclision7);
			   		}else
			   			sap.ui.getCore().byId("CP1F").setVisible(false);
			   		
			   		if(LAPrimData[0].Cp2ScrExclision2.length>0){
			   			sap.ui.getCore().byId("CP2F").setVisible(true);
			   			sap.ui.getCore().byId("CP2F").addStyleClass("marginTop10");
			   			sap.ui.getCore().byId("CP2SCRExclusion2").setText(LAPrimData[0].Cp2ScrExclision2);
				   		sap.ui.getCore().byId("CP2SCRExclusion3").setText(LAPrimData[0].Cp2ScrExclision3);
				   		sap.ui.getCore().byId("CP2SCRExclusion4").setText(LAPrimData[0].Cp2ScrExclision4);
				   		sap.ui.getCore().byId("CP2SCRExclusion5").setText(LAPrimData[0].Cp2ScrExclision5);
				   		sap.ui.getCore().byId("CP2SCRExclusion6").setText(LAPrimData[0].Cp2ScrExclision6);
				   		sap.ui.getCore().byId("CP2SCRExclusion7").setText(LAPrimData[0].Cp2ScrExclision7);
			   		}else
			   			sap.ui.getCore().byId("CP2F").setVisible(false);
			   		
			   		if(LAPrimData[0].Cp3ScrExclision2.length>0){
			   			sap.ui.getCore().byId("CP3F").setVisible(true);
			   			sap.ui.getCore().byId("CP3F").addStyleClass("marginTop10");
			   			sap.ui.getCore().byId("CP3SCRExclusion2").setText(LAPrimData[0].Cp3ScrExclision2);
				   		sap.ui.getCore().byId("CP3SCRExclusion3").setText(LAPrimData[0].Cp3ScrExclision3);
				   		sap.ui.getCore().byId("CP3SCRExclusion4").setText(LAPrimData[0].Cp3ScrExclision4);
				   		sap.ui.getCore().byId("CP3SCRExclusion5").setText(LAPrimData[0].Cp3ScrExclision5);
				   		sap.ui.getCore().byId("CP3SCRExclusion6").setText(LAPrimData[0].Cp3ScrExclision6);
				   		sap.ui.getCore().byId("CP3SCRExclusion7").setText(LAPrimData[0].Cp3ScrExclision7);
			   		}else
			   			sap.ui.getCore().byId("CP3F").setVisible(false);
			   		
			   		if(LAPrimData[0].Cp4ScrExclision2.length>0){
			   			sap.ui.getCore().byId("CP4F").setVisible(true);
			   			sap.ui.getCore().byId("CP4F").addStyleClass("marginTop10");
			   			sap.ui.getCore().byId("CP4SCRExclusion2").setText(LAPrimData[0].Cp4ScrExclision2);
				   		sap.ui.getCore().byId("CP4SCRExclusion3").setText(LAPrimData[0].Cp4ScrExclision3);
				   		sap.ui.getCore().byId("CP4SCRExclusion4").setText(LAPrimData[0].Cp4ScrExclision4);
				   		sap.ui.getCore().byId("CP4SCRExclusion5").setText(LAPrimData[0].Cp4ScrExclision5);
				   		sap.ui.getCore().byId("CP4SCRExclusion6").setText(LAPrimData[0].Cp4ScrExclision6);
				   		sap.ui.getCore().byId("CP4SCRExclusion7").setText(LAPrimData[0].Cp4ScrExclision7);
			   		}else
			   			sap.ui.getCore().byId("CP4F").setVisible(false);
			   		
			   		if(LAPrimData[0].Cp5ScrExclision2.length>0){
			   			sap.ui.getCore().byId("CP5F").addStyleClass("marginTop10");
			   			sap.ui.getCore().byId("CP5SCRExclusion2").setText(LAPrimData[0].Cp5ScrExclision2);
				   		sap.ui.getCore().byId("CP5SCRExclusion3").setText(LAPrimData[0].Cp5ScrExclision3);
				   		sap.ui.getCore().byId("CP5SCRExclusion4").setText(LAPrimData[0].Cp5ScrExclision4);
				   		sap.ui.getCore().byId("CP5SCRExclusion5").setText(LAPrimData[0].Cp5ScrExclision5);
				   		sap.ui.getCore().byId("CP5SCRExclusion6").setText(LAPrimData[0].Cp5ScrExclision6);
				   		sap.ui.getCore().byId("CP5SCRExclusion7").setText(LAPrimData[0].Cp5ScrExclision7);
			   		}else
			   			sap.ui.getCore().byId("CP5F").setVisible(false);
			   		
			   		if(LAPrimData[0].Cp6ScrExclision2.length>0){
			   			sap.ui.getCore().byId("CP6F").setVisible(true);
			   			sap.ui.getCore().byId("CP6F").addStyleClass("marginTop10");
			   			sap.ui.getCore().byId("CP6SCRExclusion2").setText(LAPrimData[0].Cp6ScrExclision2);
				   		sap.ui.getCore().byId("CP6SCRExclusion3").setText(LAPrimData[0].Cp6ScrExclision3);
				   		sap.ui.getCore().byId("CP6SCRExclusion4").setText(LAPrimData[0].Cp6ScrExclision4);
				   		sap.ui.getCore().byId("CP6SCRExclusion5").setText(LAPrimData[0].Cp6ScrExclision5);
				   		sap.ui.getCore().byId("CP6SCRExclusion6").setText(LAPrimData[0].Cp6ScrExclision6);
				   		sap.ui.getCore().byId("CP6SCRExclusion7").setText(LAPrimData[0].Cp6ScrExclision7);
			   		}else
			   			sap.ui.getCore().byId("CP6F").setVisible(false);
			   		
			   		if(LAPrimData[0].Cp7ScrExclision2.length>0){
			   			sap.ui.getCore().byId("CP7F").setVisible(true);
			   			sap.ui.getCore().byId("CP7F").addStyleClass("marginTop10");
			   			sap.ui.getCore().byId("CP7SCRExclusion2").setText(LAPrimData[0].Cp7ScrExclision2);
				   		sap.ui.getCore().byId("CP7SCRExclusion3").setText(LAPrimData[0].Cp7ScrExclision3);
				   		sap.ui.getCore().byId("CP7SCRExclusion4").setText(LAPrimData[0].Cp7ScrExclision4);
				   		sap.ui.getCore().byId("CP7SCRExclusion5").setText(LAPrimData[0].Cp7ScrExclision5);
				   		sap.ui.getCore().byId("CP7SCRExclusion6").setText(LAPrimData[0].Cp7ScrExclision6);
				   		sap.ui.getCore().byId("CP7SCRExclusion7").setText(LAPrimData[0].Cp7ScrExclision7);
			   		}else
			   			sap.ui.getCore().byId("CP7F").setVisible(false);
			   		
			   		if(LAPrimData[0].Cp8ScrExclision2.length>0){
			   			sap.ui.getCore().byId("CP8F").setVisible(true);
			   			sap.ui.getCore().byId("CP8F").addStyleClass("marginTop10");
			   			sap.ui.getCore().byId("CP8SCRExclusion2").setText(LAPrimData[0].Cp8ScrExclision2);
				   		sap.ui.getCore().byId("CP8SCRExclusion3").setText(LAPrimData[0].Cp8ScrExclision3);
				   		sap.ui.getCore().byId("CP8SCRExclusion4").setText(LAPrimData[0].Cp8ScrExclision4);
				   		sap.ui.getCore().byId("CP8SCRExclusion5").setText(LAPrimData[0].Cp8ScrExclision5);
				   		sap.ui.getCore().byId("CP8SCRExclusion6").setText(LAPrimData[0].Cp8ScrExclision6);
				   		sap.ui.getCore().byId("CP8SCRExclusion7").setText(LAPrimData[0].Cp8ScrExclision7);
			   		}else
			   			sap.ui.getCore().byId("CP8F").setVisible(false);
			   		
			   		if(LAPrimData[0].Cp9ScrExclision2.length>0){
			   			sap.ui.getCore().byId("CP9F").setVisible(true);
			   			sap.ui.getCore().byId("CP9F").addStyleClass("marginTop10");
			   			sap.ui.getCore().byId("CP9SCRExclusion2").setText(LAPrimData[0].Cp9ScrExclision2);
				   		sap.ui.getCore().byId("CP9SCRExclusion3").setText(LAPrimData[0].Cp9ScrExclision3);
				   		sap.ui.getCore().byId("CP9SCRExclusion4").setText(LAPrimData[0].Cp9ScrExclision4);
				   		sap.ui.getCore().byId("CP9SCRExclusion5").setText(LAPrimData[0].Cp9ScrExclision5);
				   		sap.ui.getCore().byId("CP9SCRExclusion6").setText(LAPrimData[0].Cp9ScrExclision6);
				   		sap.ui.getCore().byId("CP9SCRExclusion7").setText(LAPrimData[0].Cp9ScrExclision7);
			   		}else
			   			sap.ui.getCore().byId("CP9F").setVisible(false);
			   		
			   		if(LAPrimData[0].ScrExcess1.length>0){
			   			sap.ui.getCore().byId("SCRE1F").setVisible(true);
			   			sap.ui.getCore().byId("SCRE1F").addStyleClass("font15Bold marginTop10");
			   			sap.ui.getCore().byId("SCRExcess1").setText(LAPrimData[0].ScrExcess1);
				   		sap.ui.getCore().byId("SCRExcess2").setText(LAPrimData[0].ScrExcess2);
				   		sap.ui.getCore().byId("SCRExcess3").setText(LAPrimData[0].ScrExcess3);
				   		sap.ui.getCore().byId("SCRExcess4").setText(LAPrimData[0].ScrExcess4);
				   		sap.ui.getCore().byId("SCRExcess5").setText(LAPrimData[0].ScrExcess5);
				   		sap.ui.getCore().byId("SCRExcess6").setText(LAPrimData[0].ScrExcess6);
				   		sap.ui.getCore().byId("SCRExcess7").setText(LAPrimData[0].ScrExcess7);
			   		}else
			   			sap.ui.getCore().byId("SCRE1F").setVisible(false);
			   		
			   	    // On Hire  Date
	                  var vDocDateResult = LAPrimData[0].OnHireDate.split("(");
	                    var vDocDate = vDocDateResult[1].split(")");
	                    var vformattedDocDate = dateFormat(new Date(Number(vDocDate[0])), 'dd-mm-yyyy',"UTC");
	                    //this is to check if the date is default 999 something show blank
	                    if (vformattedDocDate.substring(6) == "9999"){
	                    	LAPrimData[0].OnHireDate =  "-";
	                    }
	                    else{
	                    	LAPrimData[0].OnHireDate = vformattedDocDate;
	                    }
	                    
	                 // Off Hire  Date
	                  var vDocDateResult = LAPrimData[0].OffHireDate.split("(");
	                    var vDocDate = vDocDateResult[1].split(")");
	                    var vformattedDocDate = dateFormat(new Date(Number(vDocDate[0])), 'dd-mm-yyyy',"UTC");
	                    //this is to check if the date is default 999 something show blank
	                    if (vformattedDocDate.substring(6) == "9999"){
	                    	LAPrimData[0].OffHireDate =  "-";
	                    }
	                    else{
	                    	LAPrimData[0].OffHireDate = vformattedDocDate;
	                    }
	                    
	                 //Esti  Date
	                  var vDocDateResult = LAPrimData[0].EstimDate.split("(");
	                    var vDocDate = vDocDateResult[1].split(")");
	                    var vformattedDocDate = dateFormat(new Date(Number(vDocDate[0])), 'dd-mm-yyyy',"UTC");
	                    //this is to check if the date is default 999 something show blank
	                    if (vformattedDocDate.substring(6) == "9999"){
	                    	LAPrimData[0].EstimDate =  "-";
	                    }
	                    else{
	                    	LAPrimData[0].EstimDate = vformattedDocDate;
	                    }
	                    
			   		LAPrimData1.push({
		         		  'text':"Customer Name:",
		         		  'value':LAPrimData[0].CustomerName
		            });
			   		LAPrimData1.push({
		         		  'text':"Lease Number:",
		         		  'value':LAPrimData[0].LeaseNo.replace(/^0+/, '')
		            });
			   		LAPrimData1.push({
		         		  'text':"On-Hire Date:",
		         		  'value':LAPrimData[0].OnHireDate
		            });
			   		LAPrimData1.push({
		         		  'text':"Estimate Number:",
		         		  'value':LAPrimData[0].EstimNo
		            });
			   		LAPrimData1.push({
		         		  'text':"Depot Name:",
		         		  'value':LAPrimData[0].DepotName
		            });
			   		LAPrimData1.push({
		         		  'text':"City:",
		         		  'value':LAPrimData[0].City
		            });
			   		
					var oLAPModel1 = new sap.ui.model.json.JSONModel();
					oLAPModel1.setData(LAPrimData1);
					var oLAPrimDetTable1 = sap.ui.getCore().byId("LAPrimData1");
					oLAPrimDetTable1.setModel(oLAPModel1);
					oLAPrimDetTable1.bindRows("/");
					
					
					LAPrimData2.push({
		         		  'text':"Customer Code:",
		         		  'value':LAPrimData[0].Customer
		            });
					LAPrimData2.push({
		         		  'text':"Redelivery Reference:",
		         		  'value':LAPrimData[0].RedelRef
		            });
					LAPrimData2.push({
		         		  'text':"Off-Hire Date:",
		         		  'value':LAPrimData[0].OffHireDate
		            });
					LAPrimData2.push({
		         		  'text':"Estimate Date:",
		         		  'value':LAPrimData[0].EstimDate
		            });
					LAPrimData2.push({
		         		  'text':"Depot Code:",
		         		  'value':LAPrimData[0].DepotCode
		            });
					var contactDet = LAPrimData[0].ContactEmail + " \n"+ LAPrimData[0].ContactTel;
					LAPrimData2.push({
		         		  'text':"Contact:",
		         		  'value':contactDet
		            });
			   		
					var oLAPModel2 = new sap.ui.model.json.JSONModel();
					oLAPModel2.setData(LAPrimData2);
					var oLAPrimDetTable2 = sap.ui.getCore().byId("LAPrimData2");
					oLAPrimDetTable2.setModel(oLAPModel2);
					oLAPrimDetTable2.bindRows("/");
					
					
					LAPrimData3.push({
		         		  'text':"Owner",
		         		  'labour':numberWithCommas(LAPrimData[0].OwnerLabour),
		         		  'material':numberWithCommas(LAPrimData[0].OwnerMaterial),
		         		  'total':numberWithCommas(LAPrimData[0].OwnerTotal)
		            });
			   		
					LAPrimData3.push({
		         		  'text':"Lessee",
		         		  'labour':numberWithCommas(LAPrimData[0].LesseLabour),
		         		  'material':numberWithCommas(LAPrimData[0].LesseMaterial),
		         		  'total':numberWithCommas(LAPrimData[0].LesseTotal)
		            });
					
					LAPrimData3.push({
		         		  'text':"Seacover",
		         		  'labour':numberWithCommas(LAPrimData[0].SeacoverLabour),
		         		  'material':numberWithCommas(LAPrimData[0].SeacoverMaterial),
		         		  'total':numberWithCommas(LAPrimData[0].SeacoverTotal)
		            });
					LAPrimData3.push({
		         		  'text':"Tax",
		         		  'labour':numberWithCommas(LAPrimData[0].TaxLabour),
		         		  'material':numberWithCommas(LAPrimData[0].TaxMaterial),
		         		  'total':numberWithCommas(LAPrimData[0].TaxTotal)
		            });
					LAPrimData3.push({
		         		  'text':"Total",
		         		  'labour':numberWithCommas(LAPrimData[0].TotalLabour),
		         		  'material':numberWithCommas(LAPrimData[0].TotalMaterial),
		         		  'total':numberWithCommas(LAPrimData[0].TotTotal)
		            });
					
					for(var i=0;i<LAPrimData3.length;i++){
						jsonLAPrimData3.push({
			         		  '':LAPrimData3[i].text,
			         		  'Labour':LAPrimData3[i].labour,
			         		  'Material':LAPrimData3[i].material,
			         		  'Total':LAPrimData3[i].total
			             });
					}
			 
					
					var oLAPModel3 = new sap.ui.model.json.JSONModel();
					oLAPModel3.setData(LAPrimData3);
					var oLAPrimDetTable3 = sap.ui.getCore().byId("LAPrimData3");
					oLAPrimDetTable3.setModel(oLAPModel3);
					oLAPrimDetTable3.bindRows("/");
					
			   	}
			   	
			   	busyDialog.close();
			   },
			   function(err){
				   
				   var strNoDataTbl1 = '<div class="sapUiTableCtrlEmpty custTblBgColor" tabindex="0"><span id="idspnNodataLAPrimDetTable1"'
			  		    strNoDataTbl1 += 'class="sapUiLbl custTblBgColor sapUiTableCtrlEmptyMsg">No data</span></div>'
			  		    sap.ui.getCore().byId('idhtmlNoDataLAPrimDetTable1').setContent(strNoDataTbl1);
			   		
			   		var strNoDataTbl2 = '<div class="sapUiTableCtrlEmpty custTblBgColor" tabindex="0"><span id="idspnNodataLAPrimDetTable2"'
			  		    strNoDataTbl2 += 'class="sapUiLbl custTblBgColor sapUiTableCtrlEmptyMsg">No data</span></div>'
			  		    sap.ui.getCore().byId('idhtmlNoDataLAPrimDetTable2').setContent(strNoDataTbl2);
			   		
			   		var strNoDataTbl3 = '<div class="sapUiTableCtrlEmpty custTblBgColor" tabindex="0"><span id="idspnNodataLAPrimDetTable3"'
			  		    strNoDataTbl3 += 'class="sapUiLbl custTblBgColor sapUiTableCtrlEmptyMsg">No data</span></div>'
			  		    sap.ui.getCore().byId('idhtmlNoDataLAPrimDetTable3').setContent(strNoDataTbl3);
			   		
			   	errorfromServer(err);
			   });
		},
		
		bindLALineItems:function(){
			busyDialog.open();
			
			var filter ="/DnJs_LineItem_Details?$filter=ObjectId eq '"+selectedLADNJSNo+"'";
			
			//var DNJS = "5126005";
			//var filter ="/DnJs_LineItem_Details?$filter=ObjectId eq '"+DNJS+"'";
			//alert("Str : "+serviceUrl+filter);
			
			oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
			OData.request({ 
			     requestUri: serviceUrl + filter,
			     //user:"pcsdevl", password:"igate@123",
			     method: "GET", 
			     dataType: 'json',
			     headers: 
			      {
			         "X-Requested-With": "XMLHttpRequest",
			         "Content-Type": "application/json; charset=utf-8",
			         "DataServiceVersion": "2.0", 
			         "X-CSRF-Token":"Fetch"   
			     }          
			   },
			   function (data, response){ 
			   	
			   	//alert("data.results.length" + data.results.length);
			   	//alert("data" + window.JSON.stringify(data.results));
				   busyDialog.close();
			   	if(data.results.length == 0){
			   		busyDialog.close();
			   		
			   		var strNoDataTbl4 = '<div class="sapUiTableCtrlEmpty custTblBgColor" tabindex="0"><span id="idspnNodataLAPrimDetTable4"'
			  		    strNoDataTbl4 += 'class="sapUiLbl custTblBgColor sapUiTableCtrlEmptyMsg">No data</span></div>'
			  		    sap.ui.getCore().byId('idhtmlNoDataLAPrimDetTable4').setContent(strNoDataTbl4);
			   		
			   	}else  	if(data.results.length>0){
			   		LALineData = [];
			   		jsonLALineData = [];
					
			   		if(sap.ui.getCore().byId("LALineFlex"))
						sap.ui.getCore().byId("LALineFlex").destroy();
			   		
			   		for(var i=0;i<data.results.length;i++){
			   			if(data.results[i].Picher.length>0){
			   				LALineData.push({
			   					  'Image':"images/camera_view.png",
			   					  'ImageWidth':"30px",
			   					  'ImageHeight':"20px",
		                		  'Line':data.results[i].Line.replace(/^0+/, ''),
		                		  'ComCode':data.results[i].ComCode,
		                		  'DamCode':data.results[i].DamCode,
		                		  'RepCode':data.results[i].RepCode,
		                		  'LocCode':data.results[i].LocCode,
		                		  'MatCode':data.results[i].MatCode,
		                		  'LineDesc':data.results[i].LineDesc,
		                		  'Length':data.results[i].Length,
		                		  'Width':data.results[i].Width,
		                		  'Qty':data.results[i].Qty,
		                		  'Hours':data.results[i].Hours,
		                		  'LabCost':numberWithCommas(data.results[i].LabCost),
		                		  'MatCost':numberWithCommas(data.results[i].MatCost),
		                		  'TotCost':numberWithCommas(data.results[i].TotCost),
		                		  'Indicator':data.results[i].Indicator,
			                  });
			   			}else{
			   				LALineData.push({
			   					  'Image':"",
			   					  'ImageWidth':"0px",
			   					  'ImageHeight':"0px",
		                		  'Line':data.results[i].Line.replace(/^0+/, ''),
		                		  'ComCode':data.results[i].ComCode,
		                		  'DamCode':data.results[i].DamCode,
		                		  'RepCode':data.results[i].RepCode,
		                		  'LocCode':data.results[i].LocCode,
		                		  'MatCode':data.results[i].MatCode,
		                		  'LineDesc':data.results[i].LineDesc,
		                		  'Length':data.results[i].Length,
		                		  'Width':data.results[i].Width,
		                		  'Qty':data.results[i].Qty,
		                		  'Hours':data.results[i].Hours,
		                		  'LabCost':numberWithCommas(data.results[i].LabCost),
		                		  'MatCost':numberWithCommas(data.results[i].MatCost),
		                		  'TotCost':numberWithCommas(data.results[i].TotCost),
		                		  'Indicator':data.results[i].Indicator,
			                  });
			   			}
			   		}
			   		LALineData.push({
			   		  'Image':"",
			   		  'ImageWidth':"0px",
 					  'ImageHeight':"0px",
	          		  'Line':"Totals",
	          		  'ComCode':"",
	          		  'DamCode':"",
	          		  'RepCode':"",
	          		  'LocCode':"",
	          		  'MatCode':"",
	          		  'MatCode':"",
	          		  'LineDesc':"",
	          		  'Length':"",
	          		  'Width':"",
	          		  'Qty':"",
	          		  'Hours':"",
	          		  'LabCost':numberWithCommas(data.results[0].TotLab),
	          		  'MatCost':numberWithCommas(data.results[0].TotMat),
	          		  'TotCost':numberWithCommas(data.results[0].Total),
	          		  'Indicator':"",
	                });
			   		LALineData.push({
			   			  'Image':"",
			   			  'ImageWidth':"0px",
	   					  'ImageHeight':"0px",
		          		  'Line':"Tax",
		          		  'ComCode':"",
		          		  'DamCode':"",
		          		  'RepCode':"",
		          		  'LocCode':"",
		          		  'MatCode':"",
		          		  'MatCode':"",
		          		  'LineDesc':"",
		          		  'Length':"",
		          		  'Width':"",
		          		  'Qty':"",
		          		  'Hours':"",
		          		  'LabCost':numberWithCommas(data.results[0].LabTax),
		          		  'MatCost':numberWithCommas(data.results[0].MatTax),
		          		  'TotCost':numberWithCommas(data.results[0].TotTax),
		          		  'Indicator':"",
		                });
			   		LALineData.push({
			   			  'Image':"",
			   			  'ImageWidth':"0px",
	   					  'ImageHeight':"0px",
		          		  'Line':"Estimate",
		          		  'ComCode':"Total",
		          		  'DamCode':"",
		          		  'RepCode':"",
		          		  'LocCode':"",
		          		  'MatCode':"",
		          		  'MatCode':"",
		          		  'LineDesc':"",
		          		  'Length':"",
		          		  'Width':"",
		          		  'Qty':"",
		          		  'Hours':"",
		          		  'LabCost':numberWithCommas(data.results[0].EstLabTot),
		          		  'MatCost':numberWithCommas(data.results[0].EstMatTot),
		          		  'TotCost':numberWithCommas(data.results[0].EstTot),
		          		  'Indicator':"",
		                });
					
					
			   		for(var i=0;i<LALineData.length;i++){
			   			var imgSrc = (LALineData[i].Image.trim().length>0? "View" : "");
			   			
						jsonLALineData.push({
							  'Image':imgSrc,
			          		  'Line':LALineData[i].Line,
			          		  'Cmp':LALineData[i].ComCode,
			          		  'Dam':LALineData[i].DamCode,
			          		  'Rep':LALineData[i].RepCode,
			          		  'Locn':LALineData[i].LocCode,
			          		  'Mat':LALineData[0].MatCode,
			          		  'Repair Method & Component \nDescription':LALineData[i].LineDesc,
			          		  'Lth':LALineData[i].Length,
			          		  'Wth':LALineData[i].Width,
			          		  'Qty':LALineData[i].Qty,
			          		  'Hrs':LALineData[i].Hours,
			          		  'Lab':LALineData[i].LabCost,
			          		  'Mat Cost':LALineData[i].MatCost,
			          		  'Total':LALineData[i].TotCost,
			          		  'A1':LALineData[i].Indicator,
			                });
					}
			   		
					var oLAPResultFlex = oLAP.createLALineitems();
					
					var oLModel = new sap.ui.model.json.JSONModel();
					oLModel.setData(LALineData);
					var oLALineTable = sap.ui.getCore().byId("LALineItemTbl");
					oLALineTable.setVisibleRowCount(LALineData.length);
					oLALineTable.setModel(oLModel);
					oLALineTable.bindRows("/");
					
					var oLALineResultForm = sap.ui.getCore().byId("LAPrLineItems");
					oLALineResultForm.insertField(oLAPResultFlex,0);
					
			   	}
			   	
			   	busyDialog.close();
			   },
			   function(err){
				   var strNoDataTbl4 = '<div class="sapUiTableCtrlEmpty custTblBgColor" tabindex="0"><span id="idspnNodataLAPrimDetTable4"'
			  		    strNoDataTbl4 += 'class="sapUiLbl custTblBgColor sapUiTableCtrlEmptyMsg">No data</span></div>'
			  		    sap.ui.getCore().byId('idhtmlNoDataLAPrimDetTable4').setContent(strNoDataTbl4);
				   
			   	errorfromServer(err);
			   	/*busyDialog.close();
			   	if(err.response.statusCode == "500"){
			   		sap.ui.commons.MessageBox.alert("Server Response Timeout");
			   		sap.ui.commons.MessageBox.show("Server Response Timeout",
				    			  sap.ui.commons.MessageBox.Icon.INFORMATION,
				    			  "Information",
				    			  [sap.ui.commons.MessageBox.Action.OK], 
				    			  sap.ui.commons.MessageBox.Action.OK
				    	);
			   	}
			   	else{
			   		//alert("Error while reading Repair Estimates : "+ window.JSON.stringify(err.response));
					    	sap.ui.commons.MessageBox.alert("Error while reading Repair Estimates : "+window.JSON.stringify(err.response));
			   	}*/
			   });
		},
		gotoLAPictures:function(){
			if(sap.ui.getCore().byId('LA_Primary_Image'))
				sap.ui.getCore().byId('LA_Primary_Image').destroy();
			
			var bus = sap.ui.getCore().getEventBus();
			bus.publish("nav", "to", {
					id : "LA_Primary_Image"
			});
			$('#idHdrContnt').html('Lessee Approval  - Primary Details'); //CHANGE HEADER CONTENT
			
			var oLAPrimaryImg = new LAPrimaryImage();
			oLAPrimaryImg.bindLAPictures();
		},
		
		gotoApproveEstimate:function(){
			DNJS_ApproveData=[];
			LAfromScreen = "Lessee Approval - Primary Details";
			
			var selectedData = jQuery.grep(LesseAppData, function(element, index){
		            return element.DnJsNo == selectedLADNJSNo && element.UnitNumber == selectedLAUnitNo;
	    	});
			
			var currentDate = dateFormat(new Date(),'dd-mm-yyyy').split("-");
			currentDate = currentDate[2]+currentDate[1]+currentDate[0];
			
			DNJS_ApproveData.push({
        		  'DnJsNo':selectedData[0].DnJsNo,
        		  'UnitNumber':selectedData[0].UnitNumber,
        		  'Amount':selectedData[0].Amount,
        		  'Currency':selectedData[0].Currency,
        		  'ApprovalReff':"",
        		  'ApprovalDate':new Date(),
        		  'ApprovalDateTXT':currentDate,
        		  'amt':selectedData[0].amt
            });
			
			//alert("Checked Rows : "+ checkedRows.length+" Approve JSON :"+DNJS_ApproveData.length);
			if(DNJS_ApproveData.length>0){
				
				if(sap.ui.getCore().byId("LALineItemTbl")){
					var oprevTable = sap.ui.getCore().byId("LALineItemTbl");
					 oprevTable._oHSb.setScrollPosition(0);
				}
				
				 
				var bus = sap.ui.getCore().getEventBus();
				bus.publish("nav", "to", {
						id : "DNJS_Approve"
				});
				$('#idHdrContnt').html('Approve DN/JS'); //CHANGE HEADER CONTENT
				
				var dnjsAp = new LAMultiple();
				var screenflex = sap.ui.getCore().byId("oLAMultipleApproveScreenFlex");
				if(screenflex)
					screenflex.destroyItems();
				
				dnjsAp.createDNJSApprove();
				dnjsAp.bindDNJS_Approve();
				
			}
			
		},
		
		performJointSurvey:function(){
			busyDialog.open();
			
			var selectedData = jQuery.grep(LesseAppData, function(element, index){
	            return element.DnJsNo == selectedLADNJSNo && element.UnitNumber == selectedLAUnitNo;
			});
			
			var depotCode = LAPrimData[0].DepotCode;
			var customer = LAPrimData[0].Customer;
			var customerName = LAPrimData[0].CustomerName;
			
			customerName = customerName.replace(/&/g,"and");
			
			var currentDate = dateFormat(new Date(),'dd-mm-yyyy').split("-");
			currentDate = currentDate[2]+currentDate[1]+currentDate[0];
		
			var filter = "/DN_JS_Survey?$filter=ReturnData eq '"+depotCode+"" +
					","+customer+
					","+customerName+
					","+selectedLAUnitNo+
					","+selectedLADNJSNo+
					","+selectedData[0].amt+
					","+selectedData[0].Currency+
					","+currentDate+"'";
			
			//alert("Str filter "+ serviceUrl + filter);
			
			oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
			OData.request({ 
			      requestUri: serviceUrl + filter,
			      //user:"pcsdevl", password:"igate@123",
			      method: "GET", 
			      dataType: 'json',
			      headers: 
			       {
			          "X-Requested-With": "XMLHttpRequest",
			          "Content-Type": "application/json; charset=utf-8",
			          "DataServiceVersion": "2.0", 
			          "X-CSRF-Token":"Fetch"   
			      }          
			    },
			    function (data, response){ 
			    	busyDialog.close();
			    	
			    	if(data.results.length>0){
			    		
			    		var mailText = data.results[0].MsgReceivers;
		    			var emailIds = data.results[0].ReturnData.split("|");
		    			mailText = mailText + "\n\n" + "Customer :" +"\n"+emailIds[0].substr(2);
		    			mailText = mailText + "\n\n" + "Seaco Customer Service Ops :" + "\n" + emailIds[2].substr(3);
		    			mailText = mailText + "\n\n" + "Depot :" + "\n" + emailIds[1].substr(2);
		    			
		    			sap.ui.commons.MessageBox.alert(mailText);
							    
			    	}
			    },
			    function(err){
			    	errorfromServer(err);
			    });
		},

		makeHTMLTableLA:function(LAPrimData,LAPrimData1,LAPrimData2,LAPrimData3,LALineData, title, btnTxt ){
		     var html = "";
		     var count = 0;
		     
		     var urlNoHash = window.location.href.replace(window.location.hash,'');
		     var urlSplit = urlNoHash.split('/');
		     var base = "http://";
		     if(urlSplit.length > 2){
		            for(var i=2; i<urlSplit.length - 1;i++){
		                   base = base + urlSplit[i]+"/";
		            }
		     }
		     
		     var tableWidth = 16;
		     var htmlTable="";
		   
		     // Table content
		    
            htmlTable +='<table border=0 cellspacing=0 style="color:#656465">';   // HTML Header - Start
            htmlTable += '<tr style="height:75px;border=1">'+
                         '<td colspan='+ (tableWidth - 2) +' style="padding-left:10px;font:bold 18px Arial;">' +title + '</td>'+
                         '<td style="border:none; padding:5px 5px 5px 0px" colspan=2 align ="right"><img src="' + base + 'images/login/login_logo.png"></img></td></tr>'; 
            //htmlTable += "</table>";   // HTML Header - End
            
			//////////////////////////////////////////////////////////////////
            htmlTable += '<tr  style="border:none;height:20px;"><td colspan='+ (tableWidth)+'></td></tr>';
			/////////////////////////////////////////////////////////////////
            
            if(LAPrimData[0].SctText.length>0){
            	htmlTable += '<tr">'; // HTML SCR Text - Start 
            	htmlTable += '<td colspan='+ (tableWidth) +' style="padding-left:10px;font:14px Arial;">' +LAPrimData[0].SctText + '</td>';
            	htmlTable += "</tr>";   // HTML SCR Text - End
            }
           
            if(LAPrimData[0].ScrExclision1.length>0){
	
				//////////////////////////////////////////////////////////////////
				 htmlTable += '<tr  style="border:none;height:20px;"><td colspan='+ (tableWidth)+'></td></tr>';
				 //////////////////////////////////////////////////////////////////
				 
			    	htmlTable += '<tr">'; 
			    	htmlTable += '<td colspan='+ (16) +' style="padding-left:10px;font:bold 14px Arial;">' +LAPrimData[0].ScrExclision1 + '</td>';
			    	htmlTable += "</tr>"; 
			    	
			    	htmlTable += '<tr">'; 
			    	htmlTable += '<td colspan='+ (1) +' style="padding-left:10px;font:14px Arial;">' +LAPrimData[0].ScrExclision2 + '</td>';
			    	htmlTable += '<td colspan='+ (16) +' style="padding-left:10px;font:14px Arial;">' +LAPrimData[0].ScrExclision3 + '</td>';
			    	htmlTable += "</tr>";
			    	
			    	htmlTable += '<tr">'; 
			    	htmlTable += '<td colspan='+ (1) +' style="padding-left:10px;font:14px Arial;">' +LAPrimData[0].ScrExclision4 + '</td>';
			    	htmlTable += '<td colspan='+ (16) +' style="padding-left:10px;font:14px Arial;">' +LAPrimData[0].ScrExclision5 + '</td>';
			    	htmlTable += "</tr>";
			    	
			    	htmlTable += '<tr">'; 
			    	htmlTable += '<td colspan='+ (1) +' style="padding-left:10px;font:14px Arial;">' +LAPrimData[0].ScrExclision6 + '</td>';
			    	htmlTable += '<td colspan='+ (16) +' style="padding-left:10px;font:14px Arial;">' +LAPrimData[0].ScrExclision7 + '</td>';
			    	htmlTable += "</tr>";
				
			}
            
            
            if(LAPrimData[0].Cp1ScrExclision2.length>0){

    			//////////////////////////////////////////////////////////////////
                htmlTable += '<tr  style="border:none;height:20px;"><td colspan='+ (tableWidth)+'></td></tr>';
                //////////////////////////////////////////////////////////////////
                
		    	htmlTable += '<tr">'; 
		    	htmlTable += '<td colspan='+ (1) +' style="padding-left:10px;font:14px Arial;">' +LAPrimData[0].Cp1ScrExclision2 + '</td>';
		    	htmlTable += '<td colspan='+ (16) +' style="padding-left:10px;font:14px Arial;">' +LAPrimData[0].Cp1ScrExclision3 + '</td>';
		    	htmlTable += "</tr>";
		    	
		    	htmlTable += '<tr">'; 
		    	htmlTable += '<td colspan='+ (1) +' style="padding-left:10px;font:14px Arial;">' +LAPrimData[0].Cp1ScrExclision4 + '</td>';
		    	htmlTable += '<td colspan='+ (16) +' style="padding-left:10px;font:14px Arial;">' +LAPrimData[0].Cp1ScrExclision5 + '</td>';
		    	htmlTable += "</tr>";
		    	
		    	htmlTable += '<tr">'; 
		    	htmlTable += '<td colspan='+ (1) +' style="padding-left:10px;font:14px Arial;">' +LAPrimData[0].Cp1ScrExclision6 + '</td>';
		    	htmlTable += '<td colspan='+ (16) +' style="padding-left:10px;font:14px Arial;">' +LAPrimData[0].Cp1ScrExclision7 + '</td>';
		    	htmlTable += "</tr>";
			
            }
        

	        
	        if(LAPrimData[0].Cp2ScrExclision2.length>0){
				//////////////////////////////////////////////////////////////////
	            htmlTable += '<tr  style="border:none;height:20px;"><td colspan='+ (tableWidth)+'></td></tr>';
		        //////////////////////////////////////////////////////////////////
	            
		    	htmlTable += '<tr">'; 
		    	htmlTable += '<td colspan='+ (1) +' style="padding-left:10px;font:14px Arial;">' +LAPrimData[0].Cp2ScrExclision2 + '</td>';
		    	htmlTable += '<td colspan='+ (16) +' style="padding-left:10px;font:14px Arial;">' +LAPrimData[0].Cp2ScrExclision3 + '</td>';
		    	htmlTable += "</tr>";
		    	
		    	htmlTable += '<tr">'; 
		    	htmlTable += '<td colspan='+ (1) +' style="padding-left:10px;font:14px Arial;">' +LAPrimData[0].Cp2ScrExclision4 + '</td>';
		    	htmlTable += '<td colspan='+ (16) +' style="padding-left:10px;font:14px Arial;">' +LAPrimData[0].Cp2ScrExclision5 + '</td>';
		    	htmlTable += "</tr>";
		    	
		    	htmlTable += '<tr">'; 
		    	htmlTable += '<td colspan='+ (1) +' style="padding-left:10px;font:14px Arial;">' +LAPrimData[0].Cp2ScrExclision6 + '</td>';
		    	htmlTable += '<td colspan='+ (16) +' style="padding-left:10px;font:14px Arial;">' +LAPrimData[0].Cp2ScrExclision7 + '</td>';
		    	htmlTable += "</tr>";
			
            	}
        
	        
		       if(LAPrimData[0].Cp3ScrExclision2.length>0){
					//////////////////////////////////////////////////////////////////
			        htmlTable += '<tr  style="border:none;height:20px;"><td colspan='+ (tableWidth)+'></td></tr>';
				    //////////////////////////////////////////////////////////////////
			        
		    	htmlTable += '<tr">'; 
		    	htmlTable += '<td colspan='+ (1) +' style="padding-left:10px;font:14px Arial;">' +LAPrimData[0].Cp3ScrExclision2 + '</td>';
		    	htmlTable += '<td colspan='+ (16) +' style="padding-left:10px;font:14px Arial;">' +LAPrimData[0].Cp3ScrExclision3 + '</td>';
		    	htmlTable += "</tr>";
		    	
		    	htmlTable += '<tr">'; 
		    	htmlTable += '<td colspan='+ (1) +' style="padding-left:10px;font:14px Arial;">' +LAPrimData[0].Cp3ScrExclision4 + '</td>';
		    	htmlTable += '<td colspan='+ (16) +' style="padding-left:10px;font:14px Arial;">' +LAPrimData[0].Cp3ScrExclision5 + '</td>';
		    	htmlTable += "</tr>";
		    	
		    	htmlTable += '<tr">'; 
		    	htmlTable += '<td colspan='+ (1) +' style="padding-left:10px;font:14px Arial;">' +LAPrimData[0].Cp3ScrExclision6 + '</td>';
		    	htmlTable += '<td colspan='+ (16) +' style="padding-left:10px;font:14px Arial;">' +LAPrimData[0].Cp3ScrExclision7 + '</td>';
		    	htmlTable += "</tr>";
			
	            }
	        
	        
	        	if(LAPrimData[0].Cp4ScrExclision2.length>0){

					//////////////////////////////////////////////////////////////////
	 		       htmlTable += '<tr  style="border:none;height:20px;"><td colspan='+ (tableWidth)+'></td></tr>';
	 		        //////////////////////////////////////////////////////////////////
	 		       
		    	htmlTable += '<tr">'; 
		    	htmlTable += '<td colspan='+ (1) +' style="padding-left:10px;font:14px Arial;">' +LAPrimData[0].Cp4ScrExclision2 + '</td>';
		    	htmlTable += '<td colspan='+ (16) +' style="padding-left:10px;font:14px Arial;">' +LAPrimData[0].Cp4ScrExclision3 + '</td>';
		    	htmlTable += "</tr>";
		    	
		    	htmlTable += '<tr">'; 
		    	htmlTable += '<td colspan='+ (1) +' style="padding-left:10px;font:14px Arial;">' +LAPrimData[0].Cp4ScrExclision4 + '</td>';
		    	htmlTable += '<td colspan='+ (16) +' style="padding-left:10px;font:14px Arial;">' +LAPrimData[0].Cp4ScrExclision5 + '</td>';
		    	htmlTable += "</tr>";
		    	
		    	htmlTable += '<tr">'; 
		    	htmlTable += '<td colspan='+ (1) +' style="padding-left:10px;font:14px Arial;">' +LAPrimData[0].Cp4ScrExclision6 + '</td>';
		    	htmlTable += '<td colspan='+ (16) +' style="padding-left:10px;font:14px Arial;">' +LAPrimData[0].Cp4ScrExclision7 + '</td>';
		    	htmlTable += "</tr>";
			
	            }
	        

	        
		        if(LAPrimData[0].Cp5ScrExclision2.length>0){
					//////////////////////////////////////////////////////////////////
		        	htmlTable += '<tr  style="border:none;height:20px;"><td colspan='+ (tableWidth)+'></td></tr>';
			        //////////////////////////////////////////////////////////////////
		        	
		    	htmlTable += '<tr">'; 
		    	htmlTable += '<td colspan='+ (1) +' style="padding-left:10px;font:14px Arial;">' +LAPrimData[0].Cp5ScrExclision2 + '</td>';
		    	htmlTable += '<td colspan='+ (16) +' style="padding-left:10px;font:14px Arial;">' +LAPrimData[0].Cp5ScrExclision3 + '</td>';
		    	htmlTable += "</tr>";
		    	
		    	htmlTable += '<tr">'; 
		    	htmlTable += '<td colspan='+ (1) +' style="padding-left:10px;font:14px Arial;">' +LAPrimData[0].Cp5ScrExclision4 + '</td>';
		    	htmlTable += '<td colspan='+ (16) +' style="padding-left:10px;font:14px Arial;">' +LAPrimData[0].Cp5ScrExclision5 + '</td>';
		    	htmlTable += "</tr>";
		    	
		    	htmlTable += '<tr">'; 
		    	htmlTable += '<td colspan='+ (1) +' style="padding-left:10px;font:14px Arial;">' +LAPrimData[0].Cp5ScrExclision6 + '</td>';
		    	htmlTable += '<td colspan='+ (16) +' style="padding-left:10px;font:14px Arial;">' +LAPrimData[0].Cp5ScrExclision7 + '</td>';
		    	htmlTable += "</tr>";
			
            }
        

	        if(LAPrimData[0].Cp6ScrExclision2.length>0){
	        	 
				//////////////////////////////////////////////////////////////////
		        htmlTable += '<tr  style="border:none;height:20px;"><td colspan='+ (tableWidth)+'></td></tr>';
	        /////////////////////////////////////////////////////////////////
		        
		    	htmlTable += '<tr">'; 
		    	htmlTable += '<td colspan='+ (1) +' style="padding-left:10px;font:14px Arial;">' +LAPrimData[0].Cp6ScrExclision2 + '</td>';
		    	htmlTable += '<td colspan='+ (16) +' style="padding-left:10px;font:14px Arial;">' +LAPrimData[0].Cp6ScrExclision3 + '</td>';
		    	htmlTable += "</tr>";
		    	
		    	htmlTable += '<tr">'; 
		    	htmlTable += '<td colspan='+ (1) +' style="padding-left:10px;font:14px Arial;">' +LAPrimData[0].Cp6ScrExclision4 + '</td>';
		    	htmlTable += '<td colspan='+ (16) +' style="padding-left:10px;font:14px Arial;">' +LAPrimData[0].Cp6ScrExclision5 + '</td>';
		    	htmlTable += "</tr>";
		    	
		    	htmlTable += '<tr">'; 
		    	htmlTable += '<td colspan='+ (1) +' style="padding-left:10px;font:14px Arial;">' +LAPrimData[0].Cp6ScrExclision6 + '</td>';
		    	htmlTable += '<td colspan='+ (16) +' style="padding-left:10px;font:14px Arial;">' +LAPrimData[0].Cp6ScrExclision7 + '</td>';
		    	htmlTable += "</tr>";
			
            }
        
			
	  
            if(LAPrimData[0].ScrExcess1.length>0){
            	
//////////////////////////////////////////////////////////////////
    	        htmlTable += '<tr  style="border:none;height:20px;"><td colspan='+ (tableWidth)+'></td></tr>';
    	        //////////////////////////////////////////////////////////////////
    	        
		    	htmlTable += '<tr">'; 
		    	htmlTable += '<td colspan='+ (16) +' style="padding-left:10px;font:bold 14px Arial;">' +LAPrimData[0].ScrExcess1 + '</td>';
		    	htmlTable += "</tr>"; 
		    	
		    	htmlTable += '<tr">'; 
		    	htmlTable += '<td colspan='+ (1) +' style="padding-left:10px;font:14px Arial;">' +LAPrimData[0].ScrExcess2 + '</td>';
		    	htmlTable += '<td colspan='+ (16) +' style="padding-left:10px;font:14px Arial;">' +LAPrimData[0].ScrExcess3 + '</td>';
		    	htmlTable += "</tr>";
		    	
		    	htmlTable += '<tr">'; 
		    	htmlTable += '<td colspan='+ (1) +' style="padding-left:10px;font:14px Arial;">' +LAPrimData[0].ScrExcess4 + '</td>';
		    	htmlTable += '<td colspan='+ (16) +' style="padding-left:10px;font:14px Arial;">' +LAPrimData[0].ScrExcess5 + '</td>';
		    	htmlTable += "</tr>";
		    	
		    	htmlTable += '<tr">'; 
		    	htmlTable += '<td colspan='+ (1) +' style="padding-left:10px;font:14px Arial;">' +LAPrimData[0].ScrExcess6 + '</td>';
		    	htmlTable += '<td colspan='+ (16) +' style="padding-left:10px;font:14px Arial;">' +LAPrimData[0].ScrExcess7 + '</td>';
		    	htmlTable += "</tr>";
			
            }
        
			//////////////////////////////////////////////////////////////////
            htmlTable += '<tr  style="border:none;height:20px;"><td colspan='+ (tableWidth)+'></td></tr>';
	        //////////////////////////////////////////////////////////////////
        
            htmlTable += '<tr>'; 
            if(LAPrimData1.length>0){
            	htmlTable += '<td valign="top" colspan='+ (5) +' style="padding-left:10px;">';
            	
            	htmlTable += '<table border=1 cellspacing=0 style="color:#656465">';
               /* //Create LAPrimData1 Table Headers
                htmlTable += "<tr>";
                count = 0;
                $.each(LAPrimData1, function(i, item) {
                       for (var key in item){
                             if(count == 0){
                                    //alert("key : "+ key);
                                    htmlTable += '<th style="font:bold 14px Arial;">'+key+'</th>';
                             }
                       }
                       count ++;
                });
                htmlTable += "</tr>";*/
                
                // Create LAPrimData1 Table Body
                $.each(LAPrimData1, function(i, item) {
                       htmlTable += "<tr>";
                    for (var key in item){
                       //alert("key : "+ key);
                       htmlTable += '<td align=center style="font: 14px Arial;">'+item[key]+"</td>";
                       //console.log(key + ' = ' + item[key]);
                    }
                    htmlTable += "</tr>";
                });
                
                htmlTable += '</table>'; 
                htmlTable += '</td>';
            }
            
            if(LAPrimData2.length>0){
            	htmlTable += '<td valign="top" colspan='+ (5) +' style="padding-left:10px;">';
            	htmlTable += '<table border=1 cellspacing=0 style="color:#656465">';
               /* //Create LAPrimData2 Table Headers
                htmlTable += "<tr>";
                count = 0;
                $.each(LAPrimData2, function(i, item) {
                       for (var key in item){
                             if(count == 0){
                                    //alert("key : "+ key);
                                    htmlTable += '<th style="font:bold 14px Arial;">'+key+'</th>';
                             }
                       }
                       count ++;
                });
                htmlTable += "</tr>";*/
                
                // Create LAPrimData2 Table Body
                $.each(LAPrimData2, function(i, item) {
                       htmlTable += "<tr>";
                    for (var key in item){
                       //alert("key : "+ key);
                       htmlTable += '<td align=center style="font: 14px Arial;">'+item[key]+"</td>";
                       //console.log(key + ' = ' + item[key]);
                    }
                    htmlTable += "</tr>";
                });
                htmlTable += '</table>'; 
                htmlTable += '</td>';
            }
            htmlTable += '<td colspan=10></td>';
            htmlTable += '</tr>';
            
            
            ///////////////////////////////////////////////////////////////////////////////////////////
            htmlTable += '<tr  style="border:none;height:20px;"><td colspan='+ (tableWidth)+'></td></tr>';
            //////////////////////////////////////////////////////////////////////////////////////////
            
            htmlTable += '<tr>';
            if(LAPrimData3.length>0){
            	htmlTable += '<td valign="top" colspan='+ (6) +' style="padding-left:10px;">';
            	htmlTable += '<table border=1 cellspacing=0 style="color:#656465">';
                //Create LAPrimData3 Table Headers
                htmlTable += "<tr>";
                count = 0;
                $.each(LAPrimData3, function(i, item) {
                       for (var key in item){
                             if(count == 0){
                                    //alert("key : "+ key);
                                    htmlTable += '<th style="font:bold 14px Arial;">'+key+'</th>';
                             }
                       }
                       count ++;
                });
                htmlTable += "</tr>";
                
                // Create LAPrimData3 Table Body
                $.each(LAPrimData3, function(i, item) {
                       htmlTable += "<tr>";
                    for (var key in item){
                       //alert("key : "+ key);
                    	
                    		htmlTable += '<td align=center style="font: 14px Arial;">'+item[key]+"</td>";
                       
                       //console.log(key + ' = ' + item[key]);
                    }
                    htmlTable += "</tr>";
                });
                htmlTable += '</table>';
                htmlTable += '</td>';
            }
            htmlTable += '</tr>';
            
            
            ///////////////////////////////////////////////////////////////////////////////
            htmlTable += '<tr  style="border:none;height:20px;"><td colspan='+ (tableWidth)+'></td></tr>';
            /////////////////////////////////////////////////////////////////////////////////
            
            htmlTable += '<tr>';
            if(LALineData.length>0){
            	htmlTable += '<td colspan="16" style="padding-left:10px;">';
            	htmlTable += '<table border=1 cellspacing=0 style="color:#656465">';
                //Create LALineData Table Headers
                htmlTable += "<tr>";
                count = 0;
                $.each(LALineData, function(i, item) {
                       for (var key in item){
                             if(count == 0){
                                    //alert("key : "+ key);
                                    htmlTable += '<th style="font:bold 14px Arial;">'+key+'</th>';
                             }
                       }
                       count ++;
                });
                htmlTable += "</tr>";
                
                // Create LALineData Table Body
                $.each(LALineData, function(i, item) {
                       htmlTable += "<tr>";
                    for (var key in item){
                       //alert("key : "+ key);
                    	if(item[key] == "View"){
                    		htmlTable += '<td align=center style="font: 14px Arial;"><img style="width:30px;height:20px;" src="' + base + 'images/camera_view.png"></img></td>';
                    	}else{
                    		htmlTable += '<td align=center style="font: 14px Arial;">'+item[key]+"</td>";
                    	}
                       
                       //console.log(key + ' = ' + item[key]);
                    }
                    htmlTable += "</tr>";
                });
                htmlTable += '</td>';
            }
            htmlTable += '</tr>';
		                   
		   if(btnTxt == "print"){
		                   //alert("Print");
		                   html += "<div>";
		                   html +=htmlTable+"</div>";
		                   
		            }else if(btnTxt == "export"){
		                   //alert("Export");
		                   var uri = 'data:application/vnd.ms-excel;base64,',
		                   template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">'
		                   +'<!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->'
		                   +'<head></head>'
		                   +'<body>'+htmlTable  +'</body></html>',
		             base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) },
		             format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }

		                   // Open Excel
		/*                   if (!table.nodeType) 
		                         table = document.getElementById(table)*/
		             var ctx = {worksheet: title || 'Worksheet', table: htmlTable}
		             //window.location.href = uri + base64(format(template, ctx))
		             if ((navigator.appName == 'Microsoft Internet Explorer') || (!!navigator.userAgent.match(/Trident.*rv[ :]*11\./)))
		           	    {
		     		            // var byteCharacters = atob(uri + base64(format(template, ctx)));
		     		            var blobObject = b64toBlob(base64(format(template, ctx)), 'application/vnd.ms-excel');
		     		            //window.navigator.msSaveBlob(blobObject, 'msSaveBlob_testFile.xls'); //only with save option
		     		            window.navigator.msSaveOrOpenBlob(blobObject, 'downloadfile.xls'); //save and open both option
		     	        }else
		           	    {
		           	    	 //window.location.href = uri + base64(format(template, ctx));
		     	        	window.open(uri + base64(format(template, ctx)));
		           	    }
		            }    

		            return html;
		     },
		     
	    makeScrJson:function(){
		    	 var json = [];
		    	 if(LAPrimData[0].ScrExclision1.length>0){
		    		 
		    		 json.push({'text':LAPrimData[0].ScrExclision1,
		    			 		'value':' '
		    		 });
		    		 json.push({'text':LAPrimData[0].ScrExclision2,
	    			 		    'value':LAPrimData[0].ScrExclision3
		    		 });
		    		 json.push({'text':LAPrimData[0].ScrExclision4,
 			 		            'value':LAPrimData[0].ScrExclision5
		    		 });
		    		 json.push({'text':LAPrimData[0].ScrExclision6,
		 		            'value':LAPrimData[0].ScrExclision7
		    		 });
						
				}
		    	if(LAPrimData[0].Cp1ScrExclision2.length>0){
		    		 
		    		 json.push({'text':" ",
 			 		            'value':" "
	    		     });
		    		 json.push({'text':LAPrimData[0].Cp1ScrExclision2,
	    			 		    'value':LAPrimData[0].Cp1ScrExclision3
		    		 });
		    		 json.push({'text':LAPrimData[0].Cp1ScrExclision4,
 			 		            'value':LAPrimData[0].Cp1ScrExclision5
		    		 });
		    		 json.push({'text':LAPrimData[0].Cp1ScrExclision6,
		 		            'value':LAPrimData[0].Cp1ScrExclision7
		    		 });
						
				} 
		    	if(LAPrimData[0].Cp2ScrExclision2.length>0){
		    		 
		    		 json.push({'text':" ",
			 		            'value':" "
	    		     });
		    		 json.push({'text':LAPrimData[0].Cp2ScrExclision2,
	    			 		    'value':LAPrimData[0].Cp2ScrExclision3
		    		 });
		    		 json.push({'text':LAPrimData[0].Cp2ScrExclision4,
			 		            'value':LAPrimData[0].Cp2ScrExclision5
		    		 });
		    		 json.push({'text':LAPrimData[0].Cp2ScrExclision6,
		 		            'value':LAPrimData[0].Cp2ScrExclision7
		    		 });
						
				}
		    	if(LAPrimData[0].Cp3ScrExclision2.length>0){
		    		 
		    		 json.push({'text':" ",
			 		            'value':" "
	    		     });
		    		 json.push({'text':LAPrimData[0].Cp3ScrExclision2,
	    			 		    'value':LAPrimData[0].Cp3ScrExclision3
		    		 });
		    		 json.push({'text':LAPrimData[0].Cp3ScrExclision4,
			 		            'value':LAPrimData[0].Cp3ScrExclision5
		    		 });
		    		 json.push({'text':LAPrimData[0].Cp3ScrExclision6,
		 		            'value':LAPrimData[0].Cp3ScrExclision7
		    		 });
						
				}     
		    	if(LAPrimData[0].Cp4ScrExclision2.length>0){
		    		 
		    		 json.push({'text':" ",
			 		            'value':" "
	    		     });
		    		 json.push({'text':LAPrimData[0].Cp4ScrExclision2,
	    			 		    'value':LAPrimData[0].Cp4ScrExclision3
		    		 });
		    		 json.push({'text':LAPrimData[0].Cp4ScrExclision4,
			 		            'value':LAPrimData[0].Cp4ScrExclision5
		    		 });
		    		 json.push({'text':LAPrimData[0].Cp4ScrExclision6,
		 		            'value':LAPrimData[0].Cp4ScrExclision7
		    		 });
						
				} 
		    	if(LAPrimData[0].Cp5ScrExclision2.length>0){
		    		 
		    		 json.push({'text':" ",
			 		            'value':" "
	    		     });
		    		 json.push({'text':LAPrimData[0].Cp5ScrExclision2,
	    			 		    'value':LAPrimData[0].Cp5ScrExclision3
		    		 });
		    		 json.push({'text':LAPrimData[0].Cp5ScrExclision4,
			 		            'value':LAPrimData[0].Cp5ScrExclision5
		    		 });
		    		 json.push({'text':LAPrimData[0].Cp5ScrExclision6,
		 		                'value':LAPrimData[0].Cp5ScrExclision7
		    		 });
						
				} 
		    	if(LAPrimData[0].Cp6ScrExclision2.length>0){
		    		 
		    		 json.push({'text':" ",
			 		            'value':" "
	    		     });
		    		 json.push({'text':LAPrimData[0].Cp6ScrExclision2,
	    			 		    'value':LAPrimData[0].Cp6ScrExclision3
		    		 });
		    		 json.push({'text':LAPrimData[0].Cp6ScrExclision4,
			 		            'value':LAPrimData[0].Cp6ScrExclision5
		    		 });
		    		 json.push({'text':LAPrimData[0].Cp6ScrExclision6,
		 		                'value':LAPrimData[0].Cp6ScrExclision7
		    		 });
						
				}    
		    	if(LAPrimData[0].Cp7ScrExclision2.length>0){
		    		 
		    		 json.push({'text':" ",
			 		            'value':" "
	    		     });
		    		 json.push({'text':LAPrimData[0].Cp7ScrExclision2,
	    			 		    'value':LAPrimData[0].Cp7ScrExclision3
		    		 });
		    		 json.push({'text':LAPrimData[0].Cp7ScrExclision4,
			 		            'value':LAPrimData[0].Cp7ScrExclision5
		    		 });
		    		 json.push({'text':LAPrimData[0].Cp7ScrExclision6,
		 		                'value':LAPrimData[0].Cp7ScrExclision7
		    		 });
						
				}
		    	if(LAPrimData[0].Cp8ScrExclision2.length>0){
		    		 
		    		 json.push({'text':" ",
			 		            'value':" "
	    		     });
		    		 json.push({'text':LAPrimData[0].Cp8ScrExclision2,
	    			 		    'value':LAPrimData[0].Cp8ScrExclision3
		    		 });
		    		 json.push({'text':LAPrimData[0].Cp8ScrExclision4,
			 		            'value':LAPrimData[0].Cp8ScrExclision5
		    		 });
		    		 json.push({'text':LAPrimData[0].Cp8ScrExclision6,
		 		                'value':LAPrimData[0].Cp8ScrExclision7
		    		 });
						
				}
		    	if(LAPrimData[0].Cp9ScrExclision2.length>0){
		    		 
		    		 json.push({'text':" ",
			 		            'value':" "
	    		     });
		    		 json.push({'text':LAPrimData[0].Cp9ScrExclision2,
	    			 		    'value':LAPrimData[0].Cp9ScrExclision3
		    		 });
		    		 json.push({'text':LAPrimData[0].Cp9ScrExclision4,
			 		            'value':LAPrimData[0].Cp9ScrExclision5
		    		 });
		    		 json.push({'text':LAPrimData[0].Cp9ScrExclision6,
		 		                'value':LAPrimData[0].Cp9ScrExclision7
		    		 });
						
				}
		    	if(LAPrimData[0].ScrExcess1.length>0){
		    		 
		    		 json.push({'text':LAPrimData[0].ScrExcess1,
			 		            'value':" "
	    		     });
		    		 json.push({'text':LAPrimData[0].ScrExcess2,
	    			 		    'value':LAPrimData[0].ScrExcess3
		    		 });
		    		 json.push({'text':LAPrimData[0].ScrExcess4,
			 		            'value':LAPrimData[0].ScrExcess5
		    		 });
		    		 json.push({'text':LAPrimData[0].ScrExcess6,
		 		                'value':LAPrimData[0].ScrExcess7
		    		 });
						
				}
		    	 
		    	 return json;
		     }
		
});		
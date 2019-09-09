var jsonGraphPopupOnHire =[];
//var redPalette = [ 0xF7A6AF, 0xF05662, 0xC03C53, 0x84082C ];
//var bluePalette = [ 0x67DFFF, 0x0A74F8, 0x0100FD, 0x030979 ];
//var greenPalette = [ 0xC5D900, 0x7FB905, 0x008600, 0x006A00 ];
//var orangePalette = [ 0xFFCD2E, 0xFF9C00, 0xFF7701, 0xE24800 ];
//var purplePalette = [ 0xe6b8ec, 0xe696ef, 0xe964f5, 0xdb32e1, 0xbe0098, 0x970a82, 0x770766, 0x5b045c ];
//var greyPalette = [ 0xdfdfdf, 0xd1d1d1, 0xb7b7b7, 0x9a9a9a, 0x797979, 0x626262, 0x525252, 0x3e3e3e ];
//var nonePalette = null;

sap.ui.model.json.JSONModel.extend("customerDBoardOnHiredDtl", {
	//CREATE ONHIRE POPUP DETAIL
    createOnHireDetail: function(XaixsData,YaxisData){
		var oOnhirDtlOvrLayDilog = sap.ui.getCore().byId("idOnhirDtlOvrLayDilog");
		if (oOnhirDtlOvrLayDilog != undefined) {
			oOnhirDtlOvrLayDilog.destroy();
		}
		
		var oVbxMainCDB = new sap.m.VBox();
		var oMIObj = new customerDBoardOnHiredDtl();
	
		var HdrTxtOnHirePieLease = 'On-Hire by Lease in Last 1 Year';
		var HdrTxtOnHireColumnHdr = "My Units On-Hire - " + XaixsData;
		if(XaixsData == ''){
			HdrTxtOnHirePieLease = 'On-Hire by Unit Type in Last 1 Year';
			HdrTxtOnHireColumnHdr = "My Units On-Hire";
		}
		
		var olblOnhirHdr = new sap.ui.commons.Label({text: HdrTxtOnHireColumnHdr, wrapping: true}).addStyleClass("fontTitle");
		var vOnHireChart  = oMIObj.createOnhireColumnGraphDtl().addStyleClass("marginTop10");
		var oFlxBxOnHireCDB = new sap.m.FlexBox({
			  items:[olblOnhirHdr, vOnHireChart],
			  width:"100%",
			  direction: "Column"
			 });
		
		var rfl = sap.ui.commons.layout.ResponsiveFlowLayout;
		var rflLD = sap.ui.commons.layout.ResponsiveFlowLayoutData;
		var oRFL = new rfl();
		oFlxBxOnHireCDB.setLayoutData(new rflLD({
			minWidth : 500,
			weight : 1
		}));
		oRFL.addContent(oFlxBxOnHireCDB);
		
		//ACTIVE RELEASE  TABLE
		var vReleaseTableObj = oMIObj.createOnHirePopupTblCDBOHDtl(XaixsData,YaxisData).addStyleClass("marginTop10");
		var olblActReleaseHdr = new sap.ui.commons.Label({text: "My Units On-Hire - Details ", wrapping: true}).addStyleClass("font15Bold marginTop10");
		//var btnExportExlReleaseCDB = new sap.m.Button({text:"Export Excel",icon: "images/export_icon.png"});
		//SET ARRAY FOR EXPORT AND PRINT TABLE
				
		var obtnExpExlCDBOnHDtl = new sap.m.Button("idbtnExpExlCDBOnHDtl",{
            text : "Export To Excel",
            type:sap.m.ButtonType.Unstyled,
            icon: sap.ui.core.IconPool.getIconURI("excel-attachment"),
            press:function(){
				var arrDiplHdrExprtCDBOnhireDtl = ['Lease Type','Lease','Release','Unit Type','Unit Number','On-Hire Date', 'On-Hire Location'];
				var arrDiplFieldExprtCDBOnhireDtl = ['LeaseType','LeaseNo','ReleaseNo','OrderedProd','Sernr','OnhireDate','LocOnhire'];
				var headingExpr ='';
				if(XaixsData != ''){
					headingExpr = "My Units On-Hire - " + XaixsData;
				}
				else{
					headingExpr = "My Units On-Hire";
				}
                var objUtil = new utility();
				objUtil.ExportUtility(jsonGraphPopupOnHire,arrDiplHdrExprtCDBOnhireDtl,arrDiplFieldExprtCDBOnhireDtl, headingExpr,"export");
            }
         }).addStyleClass("submitBtn");
		 
		var obtnPrintCDBOnHDtl = new sap.m.Button("idbtnPrintCDBOnHDtl",{
            text : "Print",
            type:sap.m.ButtonType.Unstyled,
            icon: sap.ui.core.IconPool.getIconURI("print"),
            press:function(){
				var arrDiplHdrExprtCDBOnhireDtl = ['Lease Type','Lease','Release','Unit Type','Unit Number','On-Hire Date', 'On-Hire Location'];
				var arrDiplFieldExprtCDBOnhireDtl = ['LeaseType','LeaseNo','ReleaseNo','OrderedProd','Sernr','OnhireDate','LocOnhire'];
				var headingExpr ='';
				if(XaixsData != ''){
					headingExpr = "My Units On-Hire - " + XaixsData;
				}
				else{
					headingExpr = "My Units On-Hire";
				}
				
				var tab = objUtil.ExportUtility(jsonGraphPopupOnHire,arrDiplHdrExprtCDBOnhireDtl,arrDiplFieldExprtCDBOnhireDtl, headingExpr,"print");
                //var tab = objUtil.makeHTMLTable(jsonActReleaseDet, "Active Release Details","print");
                var newWin = window.open();
                newWin.document.write(tab);
                newWin.print();
            }
         }).addStyleClass("submitBtn");

		 
		//var btnViewAllReleaseCDB = new sap.m.Button({text:"View All"}).addStyleClass("floatRight");
		var obtnVAllCDBOnHDtl = new sap.m.Button("idbtnVAllCDBOnHDtl",{
                 text : "View All",
                 type:sap.m.ButtonType.Unstyled,
                 press:function(){
							this.setVisible(false);
							var vidTblPopupCDBOnhireDtl = sap.ui.getCore().byId("idTblPopupCDBOnhireDtl");
							 if(jsonGraphPopupOnHire.length < 100){
								vidTblPopupCDBOnhireDtl.setVisibleRowCount(jsonGraphPopupOnHire.length);
								vidTblPopupCDBOnhireDtl.setNavigationMode(sap.ui.table.NavigationMode.None);
						   }else{
								vidTblPopupCDBOnhireDtl.setVisibleRowCount(100);
								vidTblPopupCDBOnhireDtl.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
						   }
                       }
              }).addStyleClass("submitBtn marginTop7");
			  
		//SET VISIBILITY FOR BUTTON
		if(jsonGraphPopupOnHire.length < 1){
			obtnPrintCDBOnHDtl.setVisible(false);
			obtnExpExlCDBOnHDtl.setVisible(false);
		}else{
			obtnPrintCDBOnHDtl.setVisible(true);
			obtnExpExlCDBOnHDtl.setVisible(true);
		}
		if(jsonGraphPopupOnHire.length < 25){
			obtnVAllCDBOnHDtl.setVisible(false);
	   }else{
			obtnVAllCDBOnHDtl.setVisible(true);
	   }
	   
		var oflxbxTblHdrAlgin = new sap.m.FlexBox({
			  items:[olblActReleaseHdr],
			  width:"70%",
			  direction: "Row"
			 });
		
		var oflxbxTblHdrExport = new sap.m.FlexBox({
			  items:[obtnExpExlCDBOnHDtl,obtnPrintCDBOnHDtl],
			  width:"30%",
			  direction: "RowReverse"
			 });
		
		var oFlxBxActvReleaseHdrCDB = new sap.m.FlexBox({
			  items:[oflxbxTblHdrAlgin, oflxbxTblHdrExport],
			  width:"100%",
			  direction: "Row"
			 }).addStyleClass("marginTop10");
		
		var oFlxBxActvReleaseCDB = new sap.m.FlexBox({
			  items:[oFlxBxActvReleaseHdrCDB, vReleaseTableObj,obtnVAllCDBOnHDtl],
			  width:"100%",
			  direction: "Column"
			 });
		oFlxBxActvReleaseCDB.setLayoutData(new rflLD({
			minWidth : 500,
			weight : 2
		}));
		oRFL.addContent(oFlxBxActvReleaseCDB);
		oVbxMainCDB.addItem(oRFL);

		//CREATE PIE CHART FOR MONTH
		var olblMnthChartHdr = new sap.ui.commons.Label({text: "On-Hire by Month in Last 1 Year", wrapping: true}).addStyleClass("fontTitle");
		var BymnthPieChart = oMIObj.createOnHirePieChartByMonth().addStyleClass("marginTop10");
		
		var oFlxBxMnthPieChart = new sap.m.FlexBox({
			  items:[olblMnthChartHdr,BymnthPieChart],
			  width:"100%",
			  direction: "Column"
			 });
		
		oFlxBxMnthPieChart.setLayoutData(new rflLD({
			minWidth : 300,
			weight : 3
		}));
		oRFL.addContent(oFlxBxMnthPieChart);
		
		//CREATE PIE CHART BY LOCATION
		var olblLocChartHdr = new sap.ui.commons.Label({text: "On-Hire by Location in Last 1 Year", wrapping: true}).addStyleClass("fontTitle");
		 var ByLocationPieChart = oMIObj.createOnHirePieChartByLocation().addStyleClass("marginTop10");
		
		var oFlxBxLocPieChart = new sap.m.FlexBox({
			  items:[olblLocChartHdr,ByLocationPieChart],
			  width:"100%",
			  direction: "Column"
			 });
		
		oFlxBxLocPieChart.setLayoutData(new rflLD({
			minWidth : 300,
			weight : 3
		}));
		oRFL.addContent(oFlxBxLocPieChart);
		
		//CREATE PIE CHART BY LEASE
		var olblLeaseChartHdr = new sap.ui.commons.Label({text: HdrTxtOnHirePieLease, wrapping: true}).addStyleClass("fontTitle");
		 var ByLeasePieChart = oMIObj.createOnHirePieChartByLease(XaixsData,YaxisData).addStyleClass("marginTop10");
		
		var oFlxBxLeasePieChart = new sap.m.FlexBox({
			  items:[olblLeaseChartHdr,ByLeasePieChart],
			  width:"100%",
			  direction: "Column"
			 });
		
		oFlxBxLeasePieChart.setLayoutData(new rflLD({
			minWidth : 300,
			weight : 3
		}));
		oRFL.addContent(oFlxBxLeasePieChart);
		
		oVbxMainCDB.addItem(oRFL);
		
		
		var opnlOnhirDtlPopup = new sap.m.Panel("idOnhirDtlPopupPnl",{width: "100%"});
		opnlOnhirDtlPopup.addContent(oVbxMainCDB);
		
		var oOverlayDialogOnhireDtl = new sap.ui.ux3.OverlayDialog("idOnhirDtlOvrLayDilog",{width:"1100px",height:"500px"});
		oOverlayDialogOnhireDtl.addContent(opnlOnhirDtlPopup);
		
		if(!oOverlayDialogOnhireDtl.isOpen()){
			oOverlayDialogOnhireDtl.open();
	   }
		//return oVbxMainCDB;
   },
       
    //CREATE ONHIRE GRAPH
    createOnhireColumnGraphDtl: function(){
		var oModelMyInventory = new sap.ui.model.json.JSONModel();

	   //BIND SAME DATA AS ON DASHBORAD 
	   oModelMyInventory.setData(jsonBindGraphOnHire);
	   
	   var BarDataOnHire = {
				  dimensions : [{axis : 1, name : 'Unit Type', value: "{Ut}"}],
				  measures : [{name : "Unit Count", value : "{Utcnt}"}],
				  data : {path : "/"}
				};
				
	   //var vOnHireDataset = new sap.viz.ui5.data.FlattenedDataset("idMIOnHireGraph",{dimensions:[{ axis:1, value:"{status}" }],measures:[{ name:"Month", value:"{countVal}" }],data:{path:"/OnHire"}}); 
	   var vOnHireDataset = new sap.viz.ui5.data.FlattenedDataset(BarDataOnHire);
	   var vOnHireChartPopup = new sap.viz.ui5.Column({height:"250px",width:"100%",plotArea : new sap.viz.ui5.types.VerticalBar({colorPalette:columnColor}),
					dataset:vOnHireDataset});
	   
	   vOnHireChartPopup.setInteraction(  
				new sap.viz.ui5.types.controller.Interaction({  
				  selectability: new sap.viz.ui5.types.controller.Interaction_selectability({  
					mode: sap.viz.ui5.types.controller.Interaction_selectability_mode.none   
				  })  
				})  
			  );
	   
	   function chartOnHireCDBDtlClickHandler(oEvent) {  
		//var sel = idbarmnth.getSelection();
		//var oFileMultiple = sap.ui.getCore().byId("idbarmnth").getSelection();
		//sap.ui.getCore().byId("idbarmnth").fireDeselectData();
		//sap.ui.getCore().byId("idbarmnth").getInteraction().destroySelectability();
		if(!$(oEvent.srcElement).closest('.v-m-xAxis').length) return;  
		var xAxisLabel=$($(oEvent.srcElement).next('.viz-axis-label').children('text')).text();  
		new sap.ui.commons.Dialog({ title: xAxisLabel+" clicked" }).open();  
	  } 
	   vOnHireChartPopup.attachBrowserEvent("click",chartOnHireCDBDtlClickHandler);
	   
	   vOnHireChartPopup.setModel(oModelMyInventory);
	   vOnHireChartPopup.setLegend(new sap.viz.ui5.types.legend.Common ({visible:false}));
	   return vOnHireChartPopup;
	},
		
	//CREATE POPUP TABLE
    createOnHirePopupTblCDBOHDtl: function(XaixsData,YaxisData){
		jsonGraphPopupOnHire.length = 0;

	   //BIND SAME DATA AS ON DASHBORAD 
		if(jsonResultDataAllOnHire.length < 1){
			return false;
		}
		for(var i=0; i< jsonResultDataAllOnHire.length; i++){
			if(XaixsData != ''){
				if((jsonResultDataAllOnHire[i].OrderedProd == XaixsData) && (jsonResultDataAllOnHire[i].Df == 'X')){
					jsonGraphPopupOnHire.push({
						"CustomerNo": jsonResultDataAllOnHire[i].CustomerNo ,
						"LeaseType": jsonResultDataAllOnHire[i].LeaseType ,
						"LeaseNo" : jsonResultDataAllOnHire[i].LeaseNo,
						"ReleaseNo" : jsonResultDataAllOnHire[i].ReleaseNo,
						"OrderedProd": jsonResultDataAllOnHire[i].OrderedProd ,
						"Sernr": jsonResultDataAllOnHire[i].Sernr ,
						"OnhireDate" : jsonResultDataAllOnHire[i].OnhireDate,
						"LocOnhire" : jsonResultDataAllOnHire[i].LocOnhire,
						"Ut": jsonResultDataAllOnHire[i].Ut,
						"Utcnt": jsonResultDataAllOnHire[i].Utcnt,
						"Utcntf" : jsonResultDataAllOnHire[i].Utcntf,
						"Ct" : jsonResultDataAllOnHire[i].Ct,
						"Ctcnt": jsonResultDataAllOnHire[i].Ctcnt,
						"Ctcntf": jsonResultDataAllOnHire[i].Ctcntf,
						"Df" : jsonResultDataAllOnHire[i].Df,
						"CategoryId" : jsonResultDataAllOnHire[i].CategoryId,
						"Ct" : jsonResultDataAllOnHire[i].Ct,
						"IExtra1": jsonResultDataAllOnHire[i].IExtra1,
						"IExtra": jsonResultDataAllOnHire[i].IExtra,
						"IPartner" : jsonResultDataAllOnHire[i].IPartner,
						"Categoryf" : jsonResultDataAllOnHire[i].Categoryf,
						"OnhireDatesort" : jsonResultDataAllOnHire[i].OnhireDatesort
					});
				}
			}else if(categoryUnitOnhire != ''){
				if((jsonResultDataAllOnHire[i].CategoryId == categoryUnitOnhire) &&(jsonResultDataAllOnHire[i].Categoryf == 'X')){
						jsonGraphPopupOnHire.push({
								"CustomerNo": jsonResultDataAllOnHire[i].CustomerNo ,
								"LeaseType": jsonResultDataAllOnHire[i].LeaseType ,
								"LeaseNo" : jsonResultDataAllOnHire[i].LeaseNo,
								"ReleaseNo" : jsonResultDataAllOnHire[i].ReleaseNo,
								"OrderedProd": jsonResultDataAllOnHire[i].OrderedProd ,
								"Sernr": jsonResultDataAllOnHire[i].Sernr ,
								"OnhireDate" : jsonResultDataAllOnHire[i].OnhireDate,
								"LocOnhire" : jsonResultDataAllOnHire[i].LocOnhire,
								"Ut": jsonResultDataAllOnHire[i].Ut,
								"Utcnt": jsonResultDataAllOnHire[i].Utcnt,
								"Utcntf" : jsonResultDataAllOnHire[i].Utcntf,
								"Ct" : jsonResultDataAllOnHire[i].Ct,
								"Ctcnt": jsonResultDataAllOnHire[i].Ctcnt,
								"Ctcntf": jsonResultDataAllOnHire[i].Ctcntf,
								"Df" : jsonResultDataAllOnHire[i].Df,
								"CategoryId" : jsonResultDataAllOnHire[i].CategoryId,
								"Ct" : jsonResultDataAllOnHire[i].Ct,
								"IExtra1": jsonResultDataAllOnHire[i].IExtra1,
								"IExtra": jsonResultDataAllOnHire[i].IExtra,
								"IPartner" : jsonResultDataAllOnHire[i].IPartner,
								"Categoryf" : jsonResultDataAllOnHire[i].Categoryf,
								"OnhireDatesort" : jsonResultDataAllOnHire[i].OnhireDatesort
							});
					}
			
			}else{
				if(jsonResultDataAllOnHire[i].Df == 'X'){
					jsonGraphPopupOnHire.push({
							"CustomerNo": jsonResultDataAllOnHire[i].CustomerNo ,
							"LeaseType": jsonResultDataAllOnHire[i].LeaseType ,
							"LeaseNo" : jsonResultDataAllOnHire[i].LeaseNo,
							"ReleaseNo" : jsonResultDataAllOnHire[i].ReleaseNo,
							"OrderedProd": jsonResultDataAllOnHire[i].OrderedProd ,
							"Sernr": jsonResultDataAllOnHire[i].Sernr ,
							"OnhireDate" : jsonResultDataAllOnHire[i].OnhireDate,
							"LocOnhire" : jsonResultDataAllOnHire[i].LocOnhire,
							"Ut": jsonResultDataAllOnHire[i].Ut,
							"Utcnt": jsonResultDataAllOnHire[i].Utcnt,
							"Utcntf" : jsonResultDataAllOnHire[i].Utcntf,
							"Ct" : jsonResultDataAllOnHire[i].Ct,
							"Ctcnt": jsonResultDataAllOnHire[i].Ctcnt,
							"Ctcntf": jsonResultDataAllOnHire[i].Ctcntf,
							"Df" : jsonResultDataAllOnHire[i].Df,
							"CategoryId" : jsonResultDataAllOnHire[i].CategoryId,
							"Ct" : jsonResultDataAllOnHire[i].Ct,
							"IExtra1": jsonResultDataAllOnHire[i].IExtra1,
							"IExtra": jsonResultDataAllOnHire[i].IExtra,
							"IPartner" : jsonResultDataAllOnHire[i].IPartner,
							"Categoryf" : jsonResultDataAllOnHire[i].Categoryf,
							"OnhireDatesort" : jsonResultDataAllOnHire[i].OnhireDatesort
						});
				}
			}
		}
		
		var oModelPopUpTblOnHire = new sap.ui.model.json.JSONModel();
		oModelPopUpTblOnHire.setData(jsonGraphPopupOnHire);
		
		var oTblPopupCDBOnhireDtl = new sap.ui.table.Table("idTblPopupCDBOnhireDtl",{
		  //visibleRowCount: 5,
		  //columnHeaderHeight: 30,
		  selectionMode: sap.ui.table.SelectionMode.None,
		  navigationMode: sap.ui.table.NavigationMode.Paginator,
		  width:"100%"}).addStyleClass('tblBorder');

	   if(jsonGraphPopupOnHire.length < 25){
			oTblPopupCDBOnhireDtl.setVisibleRowCount(jsonGraphPopupOnHire.length);
	   }else{
			oTblPopupCDBOnhireDtl.setVisibleRowCount(25);
	   }
		oTblPopupCDBOnhireDtl.addColumn(new sap.ui.table.Column({
		  resizable:false,
		  label: new sap.ui.commons.Label({text: "Lease Type"}),
		  template: new sap.ui.commons.TextView().bindProperty("text", "LeaseType"),
		  sortProperty: "LeaseType",
		  filterProperty: "LeaseType"}));
		
		oTblPopupCDBOnhireDtl.addColumn(new sap.ui.table.Column({
		  resizable:false,
		  label: new sap.ui.commons.Label({text: "Lease"}),
		  template: new sap.ui.commons.TextView().bindProperty("text", "LeaseNo"),
		  sortProperty: "LeaseNo",
		  filterProperty: "LeaseNo"}));
		
		oTblPopupCDBOnhireDtl.addColumn(new sap.ui.table.Column({
		  resizable:false,
		  label: new sap.ui.commons.Label({text: "Release"}),
		  template: new sap.ui.commons.TextView().bindProperty("text", "ReleaseNo"),
		  sortProperty: "ReleaseNo",
		  filterProperty: "ReleaseNo"}));
		
		oTblPopupCDBOnhireDtl.addColumn(new sap.ui.table.Column({
		  resizable:false,
		  label: new sap.ui.commons.Label({text: "Unit Type"}),
		  template: new sap.ui.commons.TextView().bindProperty("text", "OrderedProd"),
		  sortProperty: "OrderedProd",
		  filterProperty: "OrderedProd"}));
		  
		oTblPopupCDBOnhireDtl.addColumn(new sap.ui.table.Column({
		  resizable:false,
		  label: new sap.ui.commons.Label({text: "Unit Number"}),
		  template: new sap.ui.commons.TextView().bindProperty("text", "Sernr"),
		  sortProperty: "Sernr",
		  filterProperty: "Sernr"}));
		  
		oTblPopupCDBOnhireDtl.addColumn(new sap.ui.table.Column({
		  resizable:false,
		  label: new sap.ui.commons.Label({text: "On-Hire Date",textAlign :sap.ui.core.TextAlign.End}),
		  template: new sap.ui.commons.TextView({textAlign :sap.ui.core.TextAlign.End}).bindProperty("text", "OnhireDate"),
		  sortProperty: "OnhireDatesort",
		  filterProperty: "OnhireDate"}));
		  
		 oTblPopupCDBOnhireDtl.addColumn(new sap.ui.table.Column({
		   resizable:false,
		  label: new sap.ui.commons.Label({text: "On-Hire Location"}).addStyleClass('wraptext'),
		  template: new sap.ui.commons.TextView().addStyleClass('wraptext').bindProperty("text", "LocOnhire"),
		  sortProperty: "LocOnhire",
		  filterProperty: "LocOnhire"}));
		  
		 oTblPopupCDBOnhireDtl.setModel(oModelPopUpTblOnHire);
		 oTblPopupCDBOnhireDtl.bindRows("/");
			
		 return oTblPopupCDBOnhireDtl;
   },
       
	//CREATE PIE CHART BY MONTH
	createOnHirePieChartByMonth: function(){
		var jsnPieCharOnHireByMnth = [];
		var objutil = new utility();
		var mnthArr = ['','Jan', 'Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
		function checkAlreadyMonth(mnthText){
			var retnval = 0;
			for(j=1;j<=jsnPieCharOnHireByMnth.length;j++)
			{
				if(mnthText === jsnPieCharOnHireByMnth[j-1].monthtext){
					retnval = j;
					return retnval;
				}
			}
			return retnval;
		}
		
		$.each(jsonGraphPopupOnHire, function(i, item) {
			var mnth = objutil.removeLeadZero(item.OnhireDate.substr(3,2));
			var mnthText = mnthArr[mnth];
			var retrnVal = checkAlreadyMonth(mnthText);
			if(retrnVal == 0){
				jsnPieCharOnHireByMnth.push({
								"OnhireDate": item.OnhireDate ,
								"monthtext": mnthText ,
								"monthInt": mnth,
								"count": 1
					});
			}else{
				jsnPieCharOnHireByMnth[retrnVal-1].count = jsnPieCharOnHireByMnth[retrnVal-1].count+1;
			}
		});

	   var oModelOnHirePieByMnth = new sap.ui.model.json.JSONModel();
	   oModelOnHirePieByMnth.setData(jsnPieCharOnHireByMnth);
	   
	   var BarDataOnHireMnth = {
				  dimensions : [{axis : 1, name : 'monthText', value: "{monthtext}"}],
				  measures : [{name : "count", value : "{count}"}],
				  data : {path : "/"}
				};
	   
	   var datasetMnth = new sap.viz.ui5.data.FlattenedDataset(BarDataOnHireMnth);
	   
	   /*var pieMonth = new sap.makit.Chart({
			width : "100%",
			height: "300px",
			type : sap.makit.ChartType.Pie,
			valueAxis: new sap.makit.ValueAxis({}),
			legendPosition : sap.makit.LegendPosition.Bottom,
			
			//maxSliceCount: 3,
			categoryAxis: new sap.makit.CategoryAxis({}),
			category : new sap.makit.Category({
				column : "monthtext",
			}),
			values : [new sap.makit.Value({
				expression : "count"
				,format : "number",
			})],
			//primaryColorPalette: bluePalette,
			//secondaryColorPalette: bluePalette,
			//legendPosition: sap.makit.LegendPosition.Top,
			showRangeSelector: false,
			showTableValue: false,
		});
		pieMonth.addColumn(new sap.makit.Column({name:"monthtext", value:"{monthtext}"}));
		pieMonth.addColumn(new sap.makit.Column({name:"count", value:"{count}", type:"number"}));
		pieMonth.setModel(oModelOnHirePieByMnth);
		pieMonth.bindRows("/");*/
	   var pieMonth = new sap.viz.ui5.Pie({
		 width : "100%",
		 height : "200px",
		 //legendPosition : sap.makit.LegendPosition.Bottom,
		 plotArea : {
		 //'colorPalette' : d3.scale.category20().range()
		 },
		 dataset : datasetMnth
	   });
	   
	   pieMonth.setInteraction(  
				new sap.viz.ui5.types.controller.Interaction({  
				  selectability: new sap.viz.ui5.types.controller.Interaction_selectability({  
					mode: sap.viz.ui5.types.controller.Interaction_selectability_mode.none   
				  })  
				})  
			  );
			  
	   //pieMonth.getTitle().setVisible(true).setText("On Hire By Month in Last 1 Year");
	   //pieMonth.getLegend().setPosition(sap.viz.ui5.types.legend.Common_position.bottom);
	   pieMonth.setModel(oModelOnHirePieByMnth);
	
	   return pieMonth;
   },
       
	//CREATE PIE CHART BY LOCATION
	createOnHirePieChartByLocation: function(){
	   var jsnPieCharOnHireByLoc = [];
	   
	   function checkAlreadyExist(LocOnhire){
			var retnval = 0;
			for(j=1;j<=jsnPieCharOnHireByLoc.length;j++)
			{
				if(LocOnhire === jsnPieCharOnHireByLoc[j-1].LocOnhire){
					retnval = j;
					return retnval;
				}
			}
			return retnval;
		}
		
		$.each(jsonGraphPopupOnHire, function(i, item) {
			var LocOnhire = $.trim(item.LocOnhire);
			var retrnVal = checkAlreadyExist(LocOnhire);
			if(retrnVal == 0){
				jsnPieCharOnHireByLoc.push({
								"LocOnhire": $.trim(item.LocOnhire) ,
								"count": 1
					});
			}else{
				jsnPieCharOnHireByLoc[retrnVal-1].count = jsnPieCharOnHireByLoc[retrnVal-1].count+1;
			}
		});
		
	   var oModelOnHirePieByLoc = new sap.ui.model.json.JSONModel();
	   oModelOnHirePieByLoc.setData(jsnPieCharOnHireByLoc);
	   
	   var BarDataOnHireLoc = {
				  dimensions : [{axis : 1, name : 'LocOnhire', value: "{LocOnhire}"}],
				  measures : [{name : "count", value : "{count}"}],
				  data : {path : "/"}
				};
	   
	   var datasetLoc = new sap.viz.ui5.data.FlattenedDataset(BarDataOnHireLoc);
	   var pieChartLoc = new sap.viz.ui5.Pie({
		 width : "100%",
		 height : "200px",
		 plotArea : {
		 //'colorPalette' : d3.scale.category20().range()
		 },
		 dataset : datasetLoc
	   });

	   pieChartLoc.setInteraction(  
				new sap.viz.ui5.types.controller.Interaction({  
				  selectability: new sap.viz.ui5.types.controller.Interaction_selectability({  
					mode: sap.viz.ui5.types.controller.Interaction_selectability_mode.none   
				  })  
				})  
			  );
			  
	   //pieChartLoc.getTitle().setVisible(true).setText("On Hire By Location in Last 1 Year");
	   pieChartLoc.setModel(oModelOnHirePieByLoc);
	   return pieChartLoc;
   },
   
	//CREATE PIE CHART BY LEASE
	createOnHirePieChartByLease: function(XaixsData,YaxisData){
	   var jsnPieCharOnHireByLease = [];
	   function checkAlreadyExist(TypeNo){
			var retnval = 0;
			for(j=1;j<=jsnPieCharOnHireByLease.length;j++)
			{
				if(TypeNo === jsnPieCharOnHireByLease[j-1].Type){
					retnval = j;
					return retnval;
				}
			}
			return retnval;
		}
		if(XaixsData != ''){
			$.each(jsonGraphPopupOnHire, function(i, item) {
				var TypeNo = $.trim(item.LeaseNo);
				var retrnVal = checkAlreadyExist(TypeNo);
				if(retrnVal == 0){
					jsnPieCharOnHireByLease.push({
									"Type": $.trim(item.LeaseNo) ,
									"count": 1
						});
				}else{
					jsnPieCharOnHireByLease[retrnVal-1].count = jsnPieCharOnHireByLease[retrnVal-1].count+1;
				}
			});
		}else{
			$.each(jsonGraphPopupOnHire, function(i, item) {
				var TypeNo = $.trim(item.OrderedProd);
				var retrnVal = checkAlreadyExist(TypeNo);
				if(retrnVal == 0){
					jsnPieCharOnHireByLease.push({
									"Type": $.trim(item.OrderedProd) ,
									"count": 1
						});
				}else{
					jsnPieCharOnHireByLease[retrnVal-1].count = jsnPieCharOnHireByLease[retrnVal-1].count+1;
				}
			});
		}
	   
	   var oModelOnHirePieByLease = new sap.ui.model.json.JSONModel();
	   oModelOnHirePieByLease.setData(jsnPieCharOnHireByLease);
	   
	   var BarDataOnHireLease = {
				  dimensions : [{axis : 1, name : 'Type', value: "{Type}"}],
				  measures : [{name : "count", value : "{count}"}],
				  data : {path : "/"}
				};
	   
	   var datasetLease = new sap.viz.ui5.data.FlattenedDataset(BarDataOnHireLease);
	   var pieLease = new sap.viz.ui5.Pie({
		 width : "100%",
		 height : "200px",
		 plotArea : {
		 //'colorPalette' : d3.scale.category20().range()
		 },
		 dataset : datasetLease
	   });

	   pieLease.setInteraction(  
				new sap.viz.ui5.types.controller.Interaction({  
				  selectability: new sap.viz.ui5.types.controller.Interaction_selectability({  
					mode: sap.viz.ui5.types.controller.Interaction_selectability_mode.none   
				  })  
				})  
			  );
			  
	   // alternative way of setting configuration 
	   //pieLease.getTitle().setVisible(true).setText("On Hire By Lease in Last 1 Year");
	   pieLease.setModel(oModelOnHirePieByLease);
	   return pieLease;
   }
});
var jsonGraphPopupOffHire =[];
sap.ui.model.json.JSONModel.extend("customerDBoardOffHiredDtl", {
	//CREATE OffHIRE POPUP DETAIL
    createOffHireDetail: function(XaixsData,YaxisData){
		var oOffHirDtlOvrLayDilog = sap.ui.getCore().byId("idOffHirDtlOvrLayDilog");
		if (oOffHirDtlOvrLayDilog != undefined) {
			oOffHirDtlOvrLayDilog.destroy();
		}
		
		var oVbxMainCDB = new sap.m.VBox();
		var oMIObj = new customerDBoardOffHiredDtl();
	
		var HdrTxtOffHirePieLease = 'Off-Hire by Lease in Last 1 Year';
		var HdrTxtOffHireColumnHdr = "My Units Off-Hire - " + XaixsData;
		if(XaixsData == ''){
			HdrTxtOffHirePieLease = 'Off-Hire by Unit Type in Last 1 Year';
			HdrTxtOffHireColumnHdr = "My Units Off-Hire";
		}
		
		var olblOffHirHdr = new sap.ui.commons.Label({text: HdrTxtOffHireColumnHdr, wrapping: true}).addStyleClass("fontTitle");
		var vOffHireChart  = oMIObj.createOffHireColumnGraphDtl().addStyleClass("marginTop10");
		var oFlxBxOffHireCDB = new sap.m.FlexBox({
			  items:[olblOffHirHdr, vOffHireChart],
			  width:"100%",
			  direction: "Column"
			 });
		
		var rfl = sap.ui.commons.layout.ResponsiveFlowLayout;
		var rflLD = sap.ui.commons.layout.ResponsiveFlowLayoutData;
		var oRFL = new rfl();
		oFlxBxOffHireCDB.setLayoutData(new rflLD({
			minWidth : 500,
			weight : 1
		}));
		oRFL.addContent(oFlxBxOffHireCDB);
		
		//ACTIVE RELEASE  TABLE
		var vReleaseTableObj = oMIObj.createOffHirePopupTblCDBOHDtl(XaixsData,YaxisData).addStyleClass("marginTop10");
		var olblActReleaseHdr = new sap.ui.commons.Label({text: "My Units Off-Hire - Details ", wrapping: true}).addStyleClass("font15Bold marginTop10");
		
		var obtnExpExlCDBOffHDtl = new sap.m.Button("idbtnExpExlCDBOffHDtl",{
            text : "Export To Excel",
            type:sap.m.ButtonType.Unstyled,
            icon: sap.ui.core.IconPool.getIconURI("excel-attachment"),
            press:function(){
                var arrDiplHdrExprtCDBOnhireDtl = ['Lease Type','Lease','Unit Type','Unit Number','Off-Hire Date', 'Off-Hire Location'];
				var arrDiplFieldExprtCDBOnhireDtl = ['LeaseType','LeaseNo','OrderedProd','Sernr','OffhireDate','LocOffhire'];
				var headingExpr ='';
				if(XaixsData != ''){
					headingExpr = "My Units Off-Hire - " + XaixsData;
				}
				else{
					headingExpr = "My Units Off-Hire";
				}
				
                var objUtil = new utility();
				objUtil.ExportUtility(jsonGraphPopupOffHire,arrDiplHdrExprtCDBOnhireDtl,arrDiplFieldExprtCDBOnhireDtl, headingExpr,"export");
            }
         }).addStyleClass("submitBtn");

		var obtnPrintCDBOffHDtl = new sap.m.Button("idbtnPrintCDBOffHDtl",{
            text : "Print",
            type:sap.m.ButtonType.Unstyled,
            icon: sap.ui.core.IconPool.getIconURI("print"),
            press:function(){
                var arrDiplHdrExprtCDBOnhireDtl = ['Lease Type','Lease','Unit Type','Unit Number','Off-Hire Date', 'Off-Hire Location'];
				var arrDiplFieldExprtCDBOnhireDtl = ['LeaseType','LeaseNo','OrderedProd','Sernr','OffhireDate','LocOffhire'];
				var headingExpr ='';
				if(XaixsData != ''){
					headingExpr = "My Units Off-Hire - " + XaixsData;
				}
				else{
					headingExpr = "My Units Off-Hire";
				}
				
                var objUtil = new utility();
				var tab = objUtil.ExportUtility(jsonGraphPopupOffHire,arrDiplHdrExprtCDBOnhireDtl,arrDiplFieldExprtCDBOnhireDtl, headingExpr,"print");
                var newWin = window.open();
                newWin.document.write(tab);
                newWin.print();
            }
         }).addStyleClass("submitBtn");

		//var btnViewAllReleaseCDB = new sap.m.Button({text:"View All"}).addStyleClass("floatRight");
		var obtnVAllCDBOffHDtl = new sap.m.Button("idbtnVAllCDBOffHDtl",{
                 text : "View All",
				 visible: false,
                 type:sap.m.ButtonType.Unstyled,
                 press:function(){
							this.setVisible(false);
							var oTblPopUpOffhireCDBDtl = sap.ui.getCore().byId("idTblPopUpOffhireCDBDtl");
							if(jsonGraphPopupOffHire.length < 100){
								oTblPopUpOffhireCDBDtl.setNavigationMode(sap.ui.table.NavigationMode.None);
								oTblPopUpOffhireCDBDtl.setVisibleRowCount(jsonGraphPopupOffHire.length);
							}else{
								oTblPopUpOffhireCDBDtl.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
								oTblPopUpOffhireCDBDtl.setVisibleRowCount(100);
							}
                       }
              }).addStyleClass("submitBtn marginTop7");
		//SET VISIBILITY FOR BUTTON
		if(jsonGraphPopupOffHire.length < 1){
			obtnPrintCDBOffHDtl.setVisible(false);
			obtnExpExlCDBOffHDtl.setVisible(false);
		}else{
			obtnPrintCDBOffHDtl.setVisible(true);
			obtnExpExlCDBOffHDtl.setVisible(true);
		}
		if(jsonGraphPopupOffHire.length < 25){
			obtnVAllCDBOffHDtl.setVisible(false);
	   }else{
			obtnVAllCDBOffHDtl.setVisible(true);
	   }
		var oflxbxTblHdrAlgin = new sap.m.FlexBox({
			  items:[olblActReleaseHdr],
			  width:"70%",
			  direction: "Row"
			 });
		
		var oflxbxTblHdrExport = new sap.m.FlexBox({
			  items:[obtnExpExlCDBOffHDtl,obtnPrintCDBOffHDtl],
			  width:"30%",
			  direction: "RowReverse"
			 });
		
		var oFlxBxActvReleaseHdrCDB = new sap.m.FlexBox({
			  items:[oflxbxTblHdrAlgin, oflxbxTblHdrExport],
			  width:"100%",
			  direction: "Row"
			 }).addStyleClass("marginTop10");
		
		var oFlxBxActvReleaseCDB = new sap.m.FlexBox({
			  items:[oFlxBxActvReleaseHdrCDB, vReleaseTableObj,obtnVAllCDBOffHDtl],
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
		var olblMnthChartHdr = new sap.ui.commons.Label({text: "Off-Hire by Month in Last 1 Year", wrapping: true}).addStyleClass("fontTitle");
		var BymnthPieChart = oMIObj.createOffHirePieChartByMonth().addStyleClass("marginTop10");
		
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
		var olblLocChartHdr = new sap.ui.commons.Label({text: "Off-Hire by Location in Last 1 Year", wrapping: true}).addStyleClass("fontTitle");
		 var ByLocationPieChart = oMIObj.createOffHirePieChartByLocation().addStyleClass("marginTop10");
		
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
		var olblLeaseChartHdr = new sap.ui.commons.Label({text: HdrTxtOffHirePieLease, wrapping: true}).addStyleClass("fontTitle");
		 var ByLeasePieChart = oMIObj.createOffHirePieChartByLease(XaixsData,YaxisData).addStyleClass("marginTop10");
		
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
		
		
		var opnlOffHirDtlPopup = new sap.m.Panel("idOffHirDtlPopupPnl",{width: "100%"});
		opnlOffHirDtlPopup.addContent(oVbxMainCDB);
		
		var oOverlayDialogOffHireDtl = new sap.ui.ux3.OverlayDialog("idOffHirDtlOvrLayDilog",{width:"1100px",height:"500px"});
		oOverlayDialogOffHireDtl.addContent(opnlOffHirDtlPopup);
		
		if(!oOverlayDialogOffHireDtl.isOpen()){
			oOverlayDialogOffHireDtl.open();
	   }
		//return oVbxMainCDB;
   },
       
    //CREATE OffHIRE GRAPH
    createOffHireColumnGraphDtl: function(){
		var oModelMyInventory = new sap.ui.model.json.JSONModel();

	   //BIND SAME DATA AS ON DASHBORAD 
	   oModelMyInventory.setData(jsonBindGraphOffHire);
	   
	   var BarDataOffHirePopupDtl = {
				  dimensions : [{axis : 1, name : 'Unit Type', value: "{Ut}"}],
				  measures : [{name : "Unit Count", value : "{Utcnt}"}],
				  data : {path : "/"}
				};
				
	   //var vOffHireDataset = new sap.viz.ui5.data.FlattenedDataset("idMIOffHireGraph",{dimensions:[{ axis:1, value:"{status}" }],measures:[{ name:"Month", value:"{countVal}" }],data:{path:"/OffHire"}}); 
	   var vOffHireDataset = new sap.viz.ui5.data.FlattenedDataset(BarDataOffHirePopupDtl);
	   var vOffHireChartPopup = new sap.viz.ui5.Column({height:"250px",width:"100%",dataset:vOffHireDataset,
					plotArea : new sap.viz.ui5.types.VerticalBar({colorPalette:columnColor})});
	   
	   vOffHireChartPopup.setInteraction(  
				new sap.viz.ui5.types.controller.Interaction({  
				  selectability: new sap.viz.ui5.types.controller.Interaction_selectability({  
					mode: sap.viz.ui5.types.controller.Interaction_selectability_mode.none   
				  })  
				})  
			  );
	   
	   function chartOffHireCDBDtlClickHandler(oEvent) {  
		//var sel = idbarmnth.getSelection();
		//var oFileMultiple = sap.ui.getCore().byId("idbarmnth").getSelection();
		//sap.ui.getCore().byId("idbarmnth").fireDeselectData();
		//sap.ui.getCore().byId("idbarmnth").getInteraction().destroySelectability();
		if(!$(oEvent.srcElement).closest('.v-m-xAxis').length) return;  
		var xAxisLabel=$($(oEvent.srcElement).next('.viz-axis-label').children('text')).text();  
		new sap.ui.commons.Dialog({ title: xAxisLabel+" clicked" }).open();  
	  } 
	   vOffHireChartPopup.attachBrowserEvent("click",chartOffHireCDBDtlClickHandler);
	   
	   vOffHireChartPopup.setModel(oModelMyInventory);
	   vOffHireChartPopup.setLegend(new sap.viz.ui5.types.legend.Common ({visible:false}));
	   return vOffHireChartPopup;
	},
		
	//CREATE POPUP TABLE
    createOffHirePopupTblCDBOHDtl: function(XaixsData,YaxisData){
		jsonGraphPopupOffHire.length = 0;

	   //BIND SAME DATA AS ON DASHBORAD 
		if(jsonResultDataAllOffHire.length < 1){
			return false;
		}
		for(var i=0; i< jsonResultDataAllOffHire.length; i++){
			if(XaixsData != ''){
				if((jsonResultDataAllOffHire[i].OrderedProd == XaixsData) && (jsonResultDataAllOffHire[i].Df == 'X')){
					jsonGraphPopupOffHire.push({
						"CustomerNo": jsonResultDataAllOffHire[i].CustomerNo ,
						"LeaseType": jsonResultDataAllOffHire[i].LeaseType ,
						"LeaseNo" : jsonResultDataAllOffHire[i].LeaseNo,
						"ReleaseNo" : jsonResultDataAllOffHire[i].ReleaseNo,
						"OrderedProd": jsonResultDataAllOffHire[i].OrderedProd ,
						"Sernr": jsonResultDataAllOffHire[i].Sernr ,
						"OffhireDate" : jsonResultDataAllOffHire[i].OffhireDate,
						"LocOffhire" : jsonResultDataAllOffHire[i].LocOffhire,
						"Ut": jsonResultDataAllOffHire[i].Ut,
						"Utcnt": jsonResultDataAllOffHire[i].Utcnt,
						"Utcntf" : jsonResultDataAllOffHire[i].Utcntf,
						"Ct" : jsonResultDataAllOffHire[i].Ct,
						"Ctcnt": jsonResultDataAllOffHire[i].Ctcnt,
						"Ctcntf": jsonResultDataAllOffHire[i].Ctcntf,
						"Df" : jsonResultDataAllOffHire[i].Df,
						"CategoryId" : jsonResultDataAllOffHire[i].CategoryId,
						"Ct" : jsonResultDataAllOffHire[i].Ct,
						"IExtra1": jsonResultDataAllOffHire[i].IExtra1,
						"IExtra": jsonResultDataAllOffHire[i].IExtra,
						"IPartner" : jsonResultDataAllOffHire[i].IPartner,
						"Categoryf" : jsonResultDataAllOffHire[i].Categoryf,
						"OffhireDateSort": jsonResultDataAllOffHire[i].OffhireDateSort
					});
				}
			}else if(categoryUnitOffhire != ''){
				if((jsonResultDataAllOffHire[i].CategoryId == categoryUnitOffhire)&& (jsonResultDataAllOffHire[i].Categoryf =='X')){
					jsonGraphPopupOffHire.push({
							"CustomerNo": jsonResultDataAllOffHire[i].CustomerNo ,
							"LeaseType": jsonResultDataAllOffHire[i].LeaseType ,
							"LeaseNo" : jsonResultDataAllOffHire[i].LeaseNo,
							"ReleaseNo" : jsonResultDataAllOffHire[i].ReleaseNo,
							"OrderedProd": jsonResultDataAllOffHire[i].OrderedProd ,
							"Sernr": jsonResultDataAllOffHire[i].Sernr ,
							"OffhireDate" : jsonResultDataAllOffHire[i].OffhireDate,
							"LocOffhire" : jsonResultDataAllOffHire[i].LocOffhire,
							"Ut": jsonResultDataAllOffHire[i].Ut,
							"Utcnt": jsonResultDataAllOffHire[i].Utcnt,
							"Utcntf" : jsonResultDataAllOffHire[i].Utcntf,
							"Ct" : jsonResultDataAllOffHire[i].Ct,
							"Ctcnt": jsonResultDataAllOffHire[i].Ctcnt,
							"Ctcntf": jsonResultDataAllOffHire[i].Ctcntf,
							"Df" : jsonResultDataAllOffHire[i].Df,
							"CategoryId" : jsonResultDataAllOffHire[i].CategoryId,
							"Ct" : jsonResultDataAllOffHire[i].Ct,
							"IExtra1": jsonResultDataAllOffHire[i].IExtra1,
							"IExtra": jsonResultDataAllOffHire[i].IExtra,
							"IPartner" : jsonResultDataAllOffHire[i].IPartner,
							"Categoryf" : jsonResultDataAllOffHire[i].Categoryf,
							"OffhireDateSort": jsonResultDataAllOffHire[i].OffhireDateSort
						});
				}
			}else{
				if(jsonResultDataAllOffHire[i].Df == 'X'){
					jsonGraphPopupOffHire.push({
							"CustomerNo": jsonResultDataAllOffHire[i].CustomerNo ,
							"LeaseType": jsonResultDataAllOffHire[i].LeaseType ,
							"LeaseNo" : jsonResultDataAllOffHire[i].LeaseNo,
							"ReleaseNo" : jsonResultDataAllOffHire[i].ReleaseNo,
							"OrderedProd": jsonResultDataAllOffHire[i].OrderedProd ,
							"Sernr": jsonResultDataAllOffHire[i].Sernr ,
							"OffhireDate" : jsonResultDataAllOffHire[i].OffhireDate,
							"LocOffhire" : jsonResultDataAllOffHire[i].LocOffhire,
							"Ut": jsonResultDataAllOffHire[i].Ut,
							"Utcnt": jsonResultDataAllOffHire[i].Utcnt,
							"Utcntf" : jsonResultDataAllOffHire[i].Utcntf,
							"Ct" : jsonResultDataAllOffHire[i].Ct,
							"Ctcnt": jsonResultDataAllOffHire[i].Ctcnt,
							"Ctcntf": jsonResultDataAllOffHire[i].Ctcntf,
							"Df" : jsonResultDataAllOffHire[i].Df,
							"CategoryId" : jsonResultDataAllOffHire[i].CategoryId,
							"Ct" : jsonResultDataAllOffHire[i].Ct,
							"IExtra1": jsonResultDataAllOffHire[i].IExtra1,
							"IExtra": jsonResultDataAllOffHire[i].IExtra,
							"IPartner" : jsonResultDataAllOffHire[i].IPartner,
							"Categoryf" : jsonResultDataAllOffHire[i].Categoryf,
							"OffhireDateSort": jsonResultDataAllOffHire[i].OffhireDateSort
						});
				}
			}
		}
		
		var oModelPopUpTblOffHire = new sap.ui.model.json.JSONModel();
		oModelPopUpTblOffHire.setData(jsonGraphPopupOffHire);
		
		var oPopupTblOffHire = new sap.ui.table.Table("idTblPopUpOffhireCDBDtl",{
		  //visibleRowCount: 5,
		  //columnHeaderHeight: 30,
		  selectionMode: sap.ui.table.SelectionMode.None,
		  navigationMode: sap.ui.table.NavigationMode.Paginator,
		  width:"100%"}).addStyleClass('tblBorder');

	   if(jsonGraphPopupOffHire.length < 25){
			//sap.ui.getCore().byId("idbtnVAllCDBOffHDtl").setVisible(false);
			oPopupTblOffHire.setVisibleRowCount(jsonGraphPopupOffHire.length);
	   }else{
			//sap.ui.getCore().byId("idbtnVAllCDBOffHDtl").setVisible(true);
			oPopupTblOffHire.setVisibleRowCount(25);
	   }
		oPopupTblOffHire.addColumn(new sap.ui.table.Column({
		  resizable:false,
		  label: new sap.ui.commons.Label({text: "Lease Type"}),
		  template: new sap.ui.commons.TextView().bindProperty("text", "LeaseType"),
		  sortProperty: "LeaseType",
		  filterProperty: "LeaseType"}));
		
		oPopupTblOffHire.addColumn(new sap.ui.table.Column({
		  resizable:false,
		  label: new sap.ui.commons.Label({text: "Lease"}),
		  template: new sap.ui.commons.TextView().bindProperty("text", "LeaseNo"),
		  sortProperty: "LeaseNo",
		  filterProperty: "LeaseNo"}));
		
		oPopupTblOffHire.addColumn(new sap.ui.table.Column({
		  resizable:false,
		  label: new sap.ui.commons.Label({text: "Unit Type"}),
		  template: new sap.ui.commons.TextView().bindProperty("text", "OrderedProd"),
		  sortProperty: "OrderedProd",
		  filterProperty: "OrderedProd"}));
		  
		oPopupTblOffHire.addColumn(new sap.ui.table.Column({
		  resizable:false,
		  label: new sap.ui.commons.Label({text: "Unit Number"}),
		  template: new sap.ui.commons.TextView().bindProperty("text", "Sernr"),
		  sortProperty: "Sernr",
		  filterProperty: "Sernr"}));
		  
		oPopupTblOffHire.addColumn(new sap.ui.table.Column({
		  resizable:false,
		  label: new sap.ui.commons.Label({text: "Off-Hire Date",textAlign :sap.ui.core.TextAlign.End}),
		  template: new sap.ui.commons.TextView({textAlign :sap.ui.core.TextAlign.End}).bindProperty("text", "OffhireDate"),
		  sortProperty: "OffhireDateSort",
		  filterProperty: "OffhireDate"}));
		  
		 oPopupTblOffHire.addColumn(new sap.ui.table.Column({
		   resizable:false,
		  label: new sap.ui.commons.Label({text: "Off-Hire Location"}).addStyleClass('wraptext'),
		  template: new sap.ui.commons.TextView().addStyleClass('wraptext').bindProperty("text", "LocOffhire"),
		  sortProperty: "LocOffhire",
		  filterProperty: "LocOffhire"}));
		  
		 oPopupTblOffHire.setModel(oModelPopUpTblOffHire);
		 oPopupTblOffHire.bindRows("/");
			
		 return oPopupTblOffHire;
   },
       
	//CREATE PIE CHART BY MONTH
	createOffHirePieChartByMonth: function(){
		var jsnPieCharOffHireByMnth = [];
		var objutil = new utility();
		var mnthArr = ['','Jan', 'Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
		function checkAlreadyMonthOffHire(mnthText){
			var retnvaloffhire = 0;
			for(j=1;j<=jsnPieCharOffHireByMnth.length;j++)
			{
				if(mnthText === jsnPieCharOffHireByMnth[j-1].monthtext){
					retnvaloffhire = j;
					return retnvaloffhire;
				}
			}
			return retnvaloffhire;
		}
		
		$.each(jsonGraphPopupOffHire, function(i, item) {
			var mnth = objutil.removeLeadZero(item.OffhireDate.substr(3,2));
			var mnthText = mnthArr[mnth];
			var retnvaloffhire = checkAlreadyMonthOffHire(mnthText);
			if(retnvaloffhire == 0){
				jsnPieCharOffHireByMnth.push({
								"OffhireDate": item.OffhireDate ,
								"monthtext": mnthText ,
								"monthInt": mnth,
								"count": 1
					});
			}else{
				jsnPieCharOffHireByMnth[retnvaloffhire-1].count = jsnPieCharOffHireByMnth[retnvaloffhire-1].count+1;
			}
		});

	   var oModelOffHirePieByMnth = new sap.ui.model.json.JSONModel();
	   oModelOffHirePieByMnth.setData(jsnPieCharOffHireByMnth);
	   
	   var BarDataOffHireMnth = {
				  dimensions : [{axis : 1, name : 'mnthText', value: "{monthtext}"}],
				  measures : [{name : "count", value : "{count}"}],
				  data : {path : "/"}
				};
	   
	   var datasetMnth = new sap.viz.ui5.data.FlattenedDataset(BarDataOffHireMnth);
	   var pieMonth = new sap.viz.ui5.Pie({
		 width : "100%",
		 height : "200px",
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
			  
	   pieMonth.setModel(oModelOffHirePieByMnth);
	   return pieMonth;
   },
       
	//CREATE PIE CHART BY LOCATION
	createOffHirePieChartByLocation: function(){
	   var jsnPieCharOffHireByLoc = [];
	   
	   function checkAlreadyExist(LocOffhire){
			var retnval = 0;
			for(j=1;j<=jsnPieCharOffHireByLoc.length;j++)
			{
				if(LocOffhire === jsnPieCharOffHireByLoc[j-1].LocOffhire){
					retnval = j;
					return retnval;
				}
			}
			return retnval;
		}
		
		$.each(jsonGraphPopupOffHire, function(i, item) {
			var LocOffhire = $.trim(item.LocOffhire);
			var retrnVal = checkAlreadyExist(LocOffhire);
			if(retrnVal == 0){
				jsnPieCharOffHireByLoc.push({
								"LocOffHire": $.trim(item.LocOffhire) ,
								"count": 1
					});
			}else{
				jsnPieCharOffHireByLoc[retrnVal-1].count = jsnPieCharOffHireByLoc[retrnVal-1].count+1;
			}
		});
		
	   var oModelOffHirePieByLoc = new sap.ui.model.json.JSONModel();
	   oModelOffHirePieByLoc.setData(jsnPieCharOffHireByLoc);
	   
	   var BarDataOffHireLoc = {
				  dimensions : [{axis : 1, name : 'LocOffHire', value: "{LocOffHire}"}],
				  measures : [{name : "count", value : "{count}"}],
				  data : {path : "/"}
				};
	   
	   var datasetLoc = new sap.viz.ui5.data.FlattenedDataset(BarDataOffHireLoc);
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
			  
	   pieChartLoc.setModel(oModelOffHirePieByLoc);
	   return pieChartLoc;
   },
   
	//CREATE PIE CHART BY LEASE
	createOffHirePieChartByLease: function(XaixsData,YaxisData){
	   var jsnPieCharOffHireByLease = [];
	   function checkAlreadyExist(TypeNo){
			var retnval = 0;
			for(j=1;j<=jsnPieCharOffHireByLease.length;j++)
			{
				if(TypeNo === jsnPieCharOffHireByLease[j-1].Type){
					retnval = j;
					return retnval;
				}
			}
			return retnval;
		}
		if(XaixsData != ''){
			$.each(jsonGraphPopupOffHire, function(i, item) {
				var TypeNo = $.trim(item.LeaseNo);
				var retrnVal = checkAlreadyExist(TypeNo);
				if(retrnVal == 0){
					jsnPieCharOffHireByLease.push({
									"Type": $.trim(item.LeaseNo) ,
									"count": 1
						});
				}else{
					jsnPieCharOffHireByLease[retrnVal-1].count = jsnPieCharOffHireByLease[retrnVal-1].count+1;
				}
			});
		}else{
			$.each(jsonGraphPopupOffHire, function(i, item) {
				var TypeNo = $.trim(item.OrderedProd);
				var retrnVal = checkAlreadyExist(TypeNo);
				if(retrnVal == 0){
					jsnPieCharOffHireByLease.push({
									"Type": $.trim(item.OrderedProd) ,
									"count": 1
						});
				}else{
					jsnPieCharOffHireByLease[retrnVal-1].count = jsnPieCharOffHireByLease[retrnVal-1].count+1;
				}
			});
		}
	   
	   var oModelOffHirePieByLease = new sap.ui.model.json.JSONModel();
	   oModelOffHirePieByLease.setData(jsnPieCharOffHireByLease);
	   
	   var BarDataOffHireLease = {
				  dimensions : [{axis : 1, name : 'Type', value: "{Type}"}],
				  measures : [{name : "count", value : "{count}"}],
				  data : {path : "/"}
				};
	   
	   var datasetLease = new sap.viz.ui5.data.FlattenedDataset(BarDataOffHireLease);
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
			  
	   pieLease.setModel(oModelOffHirePieByLease);
	   return pieLease;
   }
});
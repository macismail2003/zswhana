var roleType ="";
var custid = "";

var onhirevisible = false,  offhirevisible= false, releasevisible = false, returnvisible = false;
var selectedCustomer ="";
var backClickCDB = false, fromScreenMove = "";

var jsonBindGraphOnHire = [];
var jsonResultDataAllOnHire = [];
var jsonHierarchyDataOnHire = [];
var statGrpahOnHire = "unittypeonhire", categoryUnitOnhire = "";

var jsonBindGraphOffHire = [];
var jsonResultDataAllOffHire = [];
var jsonHierarchyDataOffHire = [];
var statGrpahOffHire = "unittypeoffhire", categoryUnitOffhire = "";


sap.ui.model.json.JSONModel.extend("customerDashboard", {
    //CREATE DASHBORD HOME
	createMyInventory: function(changeCustFlag){
		var oVbxMainCDB = new sap.m.FlexBox('idVbxMainCDB',{
			width:"100%",
			direction: "Column"});
		
		var oBtnMICustomer = new sap.m.Link({text:"Change",
			press:function(oEvent){ 
			var ochngCust = new ChangCustomerDashBoard();
				  ochngCust.changeCustomer();
		   }
		});
		
		// Labels
		var oLabelMIDepotId = new sap.ui.commons.Label({text: "Customer ID: ", wrapping: true}).addStyleClass("fontTitle");
		var oTextDepotId = new sap.ui.commons.TextView("idtxtSelCustCDB",{
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
		});
		oTextDepotId.setText("");

		var oFlexBoxSelCust = new sap.m.FlexBox('idFxBxSelCustCD',{
		visible: changeCustFlag,
		items:[new sap.ui.commons.Label({width:"20px"}),oLabelMIDepotId,new sap.ui.commons.Label({width:"15px"}),oTextDepotId,new sap.ui.commons.Label({width:"10px"}),oBtnMICustomer],
		  width:"100%",
		  direction: "Row"
		}).addStyleClass("marginTop10");
	
		oVbxMainCDB.addItem(oFlexBoxSelCust);
		
		var oCustDashBoardLayout = new sap.ui.layout.form.ResponsiveGridLayout( {
			  labelSpanL: 1,
	          labelSpanM: 1,
	          labelSpanS: 1,
			  emptySpanL: 0,
	          emptySpanM: 0,
	          emptySpanS: 0,
	          columnsL: 2,
	          columnsM: 1,
	          columnsS: 1,
	          breakpointL: 887,
			  breakpointM: 320
		});
		 var oCustDashBoardForm = new sap.ui.layout.form.Form({
				layout: oCustDashBoardLayout,
				formContainers: [
							new sap.ui.layout.form.FormContainer({
								formElements: [
									new sap.ui.layout.form.FormElement("idfrmleftTopBoxCDB",{
										fields: [],
									})
								], 
							}), 
							new sap.ui.layout.form.FormContainer({
								formElements: [
									new sap.ui.layout.form.FormElement("idfrmrightTopBoxCDB",{
										fields: [],
									})
								] 
							}), 
							new sap.ui.layout.form.FormContainer({
								formElements: [
									new sap.ui.layout.form.FormElement("idfrmleftBottomBoxCDB",{
										fields: [],  
									}),
								], 
								layoutData: new sap.ui.commons.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
							}), //FC3
							new sap.ui.layout.form.FormContainer({
								formElements: [
									new sap.ui.layout.form.FormElement("idfrmrightBottomBoxCDB",{
										fields: [],   
									})
								] 
							})
				]
		});
		
		//INSERT BOX OBJECT INTO FORM ON ROLE BASE
		this.insertFeildOnRoleBase();
		oVbxMainCDB.addItem(oCustDashBoardForm);
		return oVbxMainCDB;
   },
   
	//INSERT ALL FEILDS INTO FORM
	insertFeildOnRoleBase:function(){
		sap.ui.getCore().byId("idfrmleftTopBoxCDB").destroyFields();
		sap.ui.getCore().byId("idfrmrightTopBoxCDB").destroyFields();
		sap.ui.getCore().byId("idfrmleftBottomBoxCDB").destroyFields();
		sap.ui.getCore().byId("idfrmrightBottomBoxCDB").destroyFields();
		//ALL ONHIRE CHART BOX
		var oflxFunOnhireAll  = this.createOnHireGraph();
		if(onhirevisible == true){
			if(sap.ui.getCore().byId("idfrmleftTopBoxCDB").getFields().length == 0)
				sap.ui.getCore().byId("idfrmleftTopBoxCDB").insertField(oflxFunOnhireAll,0);
			else if(sap.ui.getCore().byId("idfrmrightTopBoxCDB").getFields().length == 0)
				sap.ui.getCore().byId("idfrmrightTopBoxCDB").insertField(oflxFunOnhireAll,0);
			else if(sap.ui.getCore().byId("idfrmleftBottomBoxCDB").getFields().length == 0)
				sap.ui.getCore().byId("idfrmleftBottomBoxCDB").insertField(oflxFunOnhireAll,0);
			else if(sap.ui.getCore().byId("idfrmrightBottomBoxCDB").getFields().length == 0)
				sap.ui.getCore().byId("idfrmrightBottomBoxCDB").insertField(oflxFunOnhireAll,0);
		}
		
		//ALL OFFHIRE CHART BOX
		var oflxFunOffhireCDB  = this.createOffHireGraph();
		if(offhirevisible == true){
			if(sap.ui.getCore().byId("idfrmleftTopBoxCDB").getFields().length == 0)
				sap.ui.getCore().byId("idfrmleftTopBoxCDB").insertField(oflxFunOffhireCDB,0);
			else if(sap.ui.getCore().byId("idfrmrightTopBoxCDB").getFields().length == 0)
				sap.ui.getCore().byId("idfrmrightTopBoxCDB").insertField(oflxFunOffhireCDB,0);
			else if(sap.ui.getCore().byId("idfrmleftBottomBoxCDB").getFields().length == 0)
				sap.ui.getCore().byId("idfrmleftBottomBoxCDB").insertField(oflxFunOffhireCDB,0);
			else if(sap.ui.getCore().byId("idfrmrightBottomBoxCDB").getFields().length == 0)
				sap.ui.getCore().byId("idfrmrightBottomBoxCDB").insertField(oflxFunOffhireCDB,0);
		}

		//ALL ACTIVE RELEASE TABLE BOX
		var oflxFunReleaseTbl = this.createReleaseTable();
		if(releasevisible == true){
			if(sap.ui.getCore().byId("idfrmleftTopBoxCDB").getFields().length == 0)
				sap.ui.getCore().byId("idfrmleftTopBoxCDB").insertField(oflxFunReleaseTbl,0);
			else if(sap.ui.getCore().byId("idfrmrightTopBoxCDB").getFields().length == 0)
				sap.ui.getCore().byId("idfrmrightTopBoxCDB").insertField(oflxFunReleaseTbl,0);
			else if(sap.ui.getCore().byId("idfrmleftBottomBoxCDB").getFields().length == 0)
				sap.ui.getCore().byId("idfrmleftBottomBoxCDB").insertField(oflxFunReleaseTbl,0);
			else if(sap.ui.getCore().byId("idfrmrightBottomBoxCDB").getFields().length == 0)
				sap.ui.getCore().byId("idfrmrightBottomBoxCDB").insertField(oflxFunReleaseTbl,0);		
		}
		
		//ALL ACTIVE RETURN TABLE BOX
		var oflxFunReturnTbl = this.createReturnTable();
		if(returnvisible == true){
			if(sap.ui.getCore().byId("idfrmleftTopBoxCDB").getFields().length == 0)
				sap.ui.getCore().byId("idfrmleftTopBoxCDB").insertField(oflxFunReturnTbl,0);
			else if(sap.ui.getCore().byId("idfrmrightTopBoxCDB").getFields().length == 0)
				sap.ui.getCore().byId("idfrmrightTopBoxCDB").insertField(oflxFunReturnTbl,0);
			else if(sap.ui.getCore().byId("idfrmleftBottomBoxCDB").getFields().length == 0)
				sap.ui.getCore().byId("idfrmleftBottomBoxCDB").insertField(oflxFunReturnTbl,0);
			else if(sap.ui.getCore().byId("idfrmrightBottomBoxCDB").getFields().length == 0)
				sap.ui.getCore().byId("idfrmrightBottomBoxCDB").insertField(oflxFunReturnTbl,0);	
		}
   },
   
    //CREATE ONHIRE GRAPH
    createOnHireGraph: function(){
		if(sap.ui.getCore().byId("idFlxBxonHireCDB") != undefined)
			sap.ui.getCore().byId("idFlxBxonHireCDB").destroy();
			
		var vOnHireChart = new sap.viz.ui5.Column("idOnhireClmnChartCDB",{height:"290px",width:"100%",
		plotArea : new sap.viz.ui5.types.VerticalBar({colorPalette:columnColor})});
		vOnHireChart.setLegend(new sap.viz.ui5.types.legend.Common ({visible:false}));
		vOnHireChart.setInteraction(  
				new sap.viz.ui5.types.controller.Interaction({  
				  selectability: new sap.viz.ui5.types.controller.Interaction_selectability({  
					mode: sap.viz.ui5.types.controller.Interaction_selectability_mode.single   
				  })  
				})
			  );
	
		var lblNoDTOnHireClmnChrtCDB = new sap.ui.commons.TextView("idonhireNodataCDB",{
				text : "No units found to be on-hire for the seleted lease,\n Please contact your local customer services for details.",
				wrapping: true}).addStyleClass('sapUiLbl sapVizNoDataDefault font12');
		vOnHireChart.setNoData(lblNoDTOnHireClmnChrtCDB);

		vOnHireChart.attachSelectData(
			function (oControlEvent) {
				if(statGrpahOnHire == "unittypeonhire"){
					var log0 = "Dimension selected: " + oControlEvent.getParameter("VALUE1") + '\n';
					var objOHDtl = new customerDBoardOnHiredDtl();
					var XaixsData = this._oVIZInstance.selection()[0].data["Unit Type"];
					var YaxisData = this._oVIZInstance.selection()[0].data["Unit Count"];
					objOHDtl.createOnHireDetail(XaixsData,YaxisData);
					
					//BIND AGAIN DATA TO REMOVE DESELECT ISSUE
					var oModelOnHireCDBSel = new sap.ui.model.json.JSONModel();
					oModelOnHireCDBSel.setData(jsonBindGraphOnHire);
					this.setModel(oModelOnHireCDBSel);
				}else if(statGrpahOnHire == "hierarchyonhire"){
					sap.ui.getCore().byId("idBackOnhireGraph").setVisible(true);
					sap.ui.getCore().byId("idbtnViewAllOnhireCDB").setVisible(true);
					
					var objOHDtl = new customerDashboard();
					var XaixsData = this._oVIZInstance.selection()[0].data["Unit Type"];
					var YaxisData = this._oVIZInstance.selection()[0].data["Unit Count"];
					objOHDtl.setHierarchyDrilDwnOnHire(XaixsData,YaxisData);
				}
			}
		);
		
		var olblOnhirHdr = new sap.ui.commons.Label({text: "My Units On-Hire ", wrapping: true}).addStyleClass("fontTitle");
		var oBackOnhireGraph = new sap.m.Link("idBackOnhireGraph", {text: " < Back",
				width:"100%",wrapping:true,visible:false,
				press: function(){
					statGrpahOnHire = "hierarchyonhire";
					categoryUnitOnhire = "";
					sap.ui.getCore().byId("idBackOnhireGraph").setVisible(false);
					sap.ui.getCore().byId("idbtnViewAllOnhireCDB").setVisible(false);
					
					var oOnhireClmnChartCDB = sap.ui.getCore().byId("idOnhireClmnChartCDB");
					var oModelOnHireCDB = new sap.ui.model.json.JSONModel();
					oModelOnHireCDB.setData(jsonHierarchyDataOnHire);
					BarDataOnHire = {
								  dimensions : [{axis : 1, name : 'Unit Type', value: "{Ct}"}],
								  measures : [{name : "Unit Count", value : "{Ctcnt}"}],
								  data : {path : "/"}
								};

					var vOnHireDataset = new sap.viz.ui5.data.FlattenedDataset(BarDataOnHire);
					oOnhireClmnChartCDB.setDataset(vOnHireDataset);
					oOnhireClmnChartCDB.setModel(oModelOnHireCDB);
			}});
			
		var oflxbxbckOnhireGrph = new sap.m.FlexBox({
			  items:[olblOnhirHdr],
			  width:"70%",
			  direction: "Row"
			 });
		
		var oflxbxbckOnhireGrph1 = new sap.m.FlexBox({
			  items:[oBackOnhireGraph],
			  width:"30%",
			  direction: "RowReverse"
			 });//.addStyleClass("marginTop10");
		
		var oflxbxbckOnhireGrph2 = new sap.m.FlexBox({
			  items:[oflxbxbckOnhireGrph, oflxbxbckOnhireGrph1],
			  width:"100%",
			  direction: "Row"
			 });
			 
		var obtnViewAllOnhireCDB = new sap.m.Button("idbtnViewAllOnhireCDB",{
                 text : "View All",
				 visible: false,
                 type:sap.m.ButtonType.Unstyled,
                 press:function(){
						var objOHDtl = new customerDBoardOnHiredDtl();
						objOHDtl.createOnHireDetail("","");
                    }
              }).addStyleClass("submitBtn marginTop7");
			  
		var oFlxBxOnHireBoxCDB = new sap.m.FlexBox({
			  items:[vOnHireChart, obtnViewAllOnhireCDB],
			  width:"100%",
			  direction: "Column"
			 });
		
		var oFlxBxOnHireCDB = new sap.m.FlexBox("idFlxBxonHireCDB", {
			  items:[oflxbxbckOnhireGrph2, oFlxBxOnHireBoxCDB],
			  width:"90%",
			  direction: "Column"
			 }).addStyleClass('marginTop7');
			 
		return oFlxBxOnHireCDB;
	},
		
	//CREATE OFFHIRE GRAPH
	createOffHireGraph: function(){
		if(sap.ui.getCore().byId("idFlxBxoffHireCDB") != undefined)
			sap.ui.getCore().byId("idFlxBxoffHireCDB").destroy();
			
		var vOffHireChart = new sap.viz.ui5.Column("idOffhireClmnChartCDB",{height:"290px",width:"100%",
				plotArea : new sap.viz.ui5.types.VerticalBar({colorPalette:columnColor})});
				
		vOffHireChart.setLegend(new sap.viz.ui5.types.legend.Common ({visible:false}));
		vOffHireChart.setInteraction(  
				new sap.viz.ui5.types.controller.Interaction({  
				  selectability: new sap.viz.ui5.types.controller.Interaction_selectability({  
					mode: sap.viz.ui5.types.controller.Interaction_selectability_mode.single   
				  })  
				})
			  );
	
		var lblNoDTOffHireClmnChrtCDB = new sap.ui.commons.TextView("idoffhireNoDataCDB",{
				text : "No units found to be off-hire for the seleted lease,\n Please contact your local customer services for details.",
				wrapping: true}).addStyleClass('sapUiLbl sapVizNoDataDefault font12');
		vOffHireChart.setNoData(lblNoDTOffHireClmnChrtCDB);

		vOffHireChart.attachSelectData(
			function (oControlEvent) {
				clkSelDataOffhire= true;
				if(statGrpahOffHire == "unittypeoffhire"){
					var log0 = "Dimension selected: " + oControlEvent.getParameter("VALUE1") + '\n';
					var objOHDtl = new customerDBoardOffHiredDtl();
					var XaixsData = this._oVIZInstance.selection()[0].data["Unit Type"];
					var YaxisData = this._oVIZInstance.selection()[0].data["Unit Count"];
					objOHDtl.createOffHireDetail(XaixsData,YaxisData);
					
					//BIND AGAIN DATA TO REMOVE DESELECT ISSUE
					var oModelOffHireCDBSel = new sap.ui.model.json.JSONModel();
					oModelOffHireCDBSel.setData(jsonBindGraphOffHire);
					this.setModel(oModelOffHireCDBSel);
				}else if(statGrpahOffHire == "hierarchyoffhire"){
					sap.ui.getCore().byId("idBackOffhireGraph").setVisible(true);
					sap.ui.getCore().byId("idbtnViewAllOffhireCDB").setVisible(true);
					
					var objOHDtl = new customerDashboard();
					var XaixsData = this._oVIZInstance.selection()[0].data["Unit Type"];
					var YaxisData = this._oVIZInstance.selection()[0].data["Unit Count"];
					objOHDtl.setHierarchyDrilDwnOffHire(XaixsData,YaxisData);
				}
			}
		);
		
		var oBackOffhireGraph = new sap.m.Link("idBackOffhireGraph", {text: " < Back",
				width:"100%",wrapping:true,visible:false,
				press: function(){
					statGrpahOffHire = "hierarchyoffhire"
					categoryUnitOffhire = "";
					sap.ui.getCore().byId("idBackOffhireGraph").setVisible(false);
					sap.ui.getCore().byId("idbtnViewAllOffhireCDB").setVisible(false);
					
					var oOffhireClmnChartCDB = sap.ui.getCore().byId("idOffhireClmnChartCDB");
					var oModelOffHireCDB = new sap.ui.model.json.JSONModel();
					oModelOffHireCDB.setData(jsonHierarchyDataOffHire);
					BarDataOffHire = {
								  dimensions : [{axis : 1, name : 'Unit Type', value: "{Ct}"}],
								  measures : [{name : "Unit Count", value : "{Ctcnt}"}],
								  data : {path : "/"}
								};

					var vOffHireDataset = new sap.viz.ui5.data.FlattenedDataset(BarDataOffHire);
					oOffhireClmnChartCDB.setDataset(vOffHireDataset);
					oOffhireClmnChartCDB.setModel(oModelOffHireCDB);
			}});
		
		var obtnViewAllOffhireCDB = new sap.m.Button("idbtnViewAllOffhireCDB",{
                 text : "View All",
				 visible: false,
                 type:sap.m.ButtonType.Unstyled,
                 press:function(){
						var objOHDtl = new customerDBoardOffHiredDtl();
						objOHDtl.createOffHireDetail("","");
                    }
              }).addStyleClass("submitBtn marginTop7");
		
		var olblOffhirHdr = new sap.ui.commons.Label({text: "My Units Off-Hire ", wrapping: true}).addStyleClass("fontTitle");
		
		var oflxbxbckOffhireGrph = new sap.m.FlexBox({
			  items:[olblOffhirHdr],
			  width:"70%",
			  direction: "Row"
			 });//.addStyleClass("marginTop10");
		
		var oflxbxbckOffhireGrph1 = new sap.m.FlexBox({
			  items:[oBackOffhireGraph],
			  width:"30%",
			  direction: "RowReverse"
			 });//.addStyleClass("marginTop10");
		
		var oflxbxbckOffhireGrph2 = new sap.m.FlexBox({
			  items:[oflxbxbckOffhireGrph, oflxbxbckOffhireGrph1],
			  width:"100%",
			  direction: "Row"
			 });
		
		var oFlxBxOffHireCDB = new sap.m.FlexBox({
			  items:[vOffHireChart, obtnViewAllOffhireCDB],
			  width:"100%",
			  direction: "Column"
			 });
   
		var oFlxBxOffHirefinlCDB = new sap.m.FlexBox("idFlxBxoffHireCDB",{
			  items:[oflxbxbckOffhireGrph2, oFlxBxOffHireCDB],
			  width:"90%",
			  direction: "Column"
			 }).addStyleClass("marginTop7");
			 
	   return oFlxBxOffHirefinlCDB;
	},
		
	//CREATE RELEASE TABLE
    createReleaseTable: function(){
		if(sap.ui.getCore().byId("idFlxBxReleaseCDB") != undefined)
			sap.ui.getCore().byId("idFlxBxReleaseCDB").destroy();
	
		var oReleaseTable = new sap.ui.table.Table("idTblReleaseCB",{
			visibleRowCount: 5,
			columnHeaderHeight: 45,
			selectionMode: sap.ui.table.SelectionMode.None,
			navigationMode: sap.ui.table.NavigationMode.None,
			width:"100%"}).addStyleClass('tblBorder');
		
		var strNoDataTbl = '<div class="sapUiTableCtrlEmpty custTblBgColor" tabindex="0"><span id="idspnNodataCDBRet"'
		strNoDataTbl += 'class="sapUiLbl custTblBgColor sapUiTableCtrlEmptyMsg">Loading...</span></div>'
		
		var ohtmlCntrl = new sap.ui.core.HTML("idhtmlNoDataRelease",{content: strNoDataTbl});
			
		oReleaseTable.setNoData(ohtmlCntrl);
		
		oReleaseTable.addColumn(new sap.ui.table.Column({
               label: new sap.ui.commons.TextView({wrapping: true,text: "Release\nReference"}).addStyleClass('sapUiLbl wraptext'),
               template: new sap.ui.commons.Link({
                           press : function() {
								//var seletedRelRefNo = this.getText();
								//selectedRelUnit = this.getHelpId();
								var objCustDBMActRelDtl = new CustomerDashBoardRelease();
								objCustDBMActRelDtl.setJsonDataRelease(this.getText());
								if(sap.ui.getCore().byId('CustomerDashBoardReleaseVw') != undefined){
									sap.ui.getCore().byId('CustomerDashBoardReleaseVw').destroy();
								}
								fromScreenMove = "CustomerDashBoardReleaseVw";
								var bus = sap.ui.getCore().getEventBus();
								bus.publish("nav", "to", {id : "CustomerDashBoardReleaseVw"});
				}}).bindProperty("text", "ReleaseRef"),//.bindProperty("helpId","FilterReleaseRefId"),
               sortProperty: "ReleaseRef",
               width:"18%",
               resizable:false,
               filterProperty: "ReleaseRef"
              }));

		oReleaseTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Quantity On-Hired",textAlign :sap.ui.core.TextAlign.End}).addStyleClass('wraptext'),
			template: new sap.ui.commons.TextView({textAlign :sap.ui.core.TextAlign.End}).bindProperty("text", "TotalQuant"),
			sortProperty: "TotalQuant",
			filterProperty: "TotalQuant",
			resizable:false}));
		
		oReleaseTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Quantity Outstanding",textAlign :sap.ui.core.TextAlign.End}).addStyleClass('wraptext'),
			template: new sap.ui.commons.TextView({textAlign :sap.ui.core.TextAlign.End}).bindProperty("text", "OutstandQuant"),
			sortProperty: "OutstandQuant",
			filterProperty: "OutstandQuant",
			resizable:false}));
		   
		//oReleaseTable.setModel(oModelMyInventory);
		oReleaseTable.bindRows("/");
		
		//SETTING ALL VIEW FOR RELEASE TABLE
				var olblActReleaseHdr = new sap.ui.commons.Label({text: "My Active Releases - Top 5 ", wrapping: true}).addStyleClass("fontTitle");

		var btnViewAllReleaseCDB = new sap.m.Button("idVAllActRelCDB",{
                 text : "View All",
				 visible: false,
                 type:sap.m.ButtonType.Unstyled,
                 press:function(){
						//this.setVisible(false);
						fromScreenMove = "";
						if(sap.ui.getCore().byId('CustomerDashBoardRelViewAllVw') != undefined){
									sap.ui.getCore().byId('CustomerDashBoardRelViewAllVw').destroy();
							}
								
						var bus = sap.ui.getCore().getEventBus();
						bus.publish("nav", "to", {id : "CustomerDashBoardRelViewAllVw"});
                    }
              }).addStyleClass("submitBtn marginTop7");

		var oFlxBxActvReleaseHdrCDB = new sap.m.FlexBox({
			  items:[olblActReleaseHdr],
			  width:"100%",
			  direction: "Row"
			 });
		
		var oFlxBxActvReleaseCDB = new sap.m.FlexBox("idFlxBxReleaseCDB",{
			  items:[oFlxBxActvReleaseHdrCDB, oReleaseTable,btnViewAllReleaseCDB],
			  width:"90%",
			  direction: "Column"
			 }).addStyleClass("marginTop10");
			 
		return oFlxBxActvReleaseCDB;
   },
    
	//CREATE RETURNS TABLE
    createReturnTable: function(){
		if(sap.ui.getCore().byId("idFlxBxReturnCDB") != undefined)
			sap.ui.getCore().byId("idFlxBxReturnCDB").destroy();
			
	   var oReturnTable = new sap.ui.table.Table("idTblReturnCDB",{
			visibleRowCount: 5,
			columnHeaderHeight: 45,
			selectionMode: sap.ui.table.SelectionMode.None,
			navigationMode: sap.ui.table.NavigationMode.None,
			width:"100%"}).addStyleClass('tblBorder');
		
		
		var strNoDataTbl = '<div class="sapUiTableCtrlEmpty custTblBgColor" tabindex="0"><span id="idspnTblCDNARet"'
		strNoDataTbl += 'class="sapUiLbl custTblBgColor sapUiTableCtrlEmptyMsg">Loading...</span></div>'
		
		var ohtmlRetCDB = new sap.ui.core.HTML("idhtmlNoDataRetnCDB",{
    		content: strNoDataTbl});
			
		oReturnTable.setNoData(ohtmlRetCDB);
		
		oReturnTable.addColumn(new sap.ui.table.Column({
               label: new sap.ui.commons.TextView({wrapping: true, text: "Off-Hire \nReference"}).addStyleClass('sapUiLbl wraptext'),
               template: new sap.ui.commons.Link({
                           press : function() {
								//var seletedRelRefNo = this.getText();
								//selectedRelUnit = this.getHelpId();
								var objCustDBMActRelDtl = new CustomerDashBoardReturn();
								objCustDBMActRelDtl.setJsonDataReturns(this.getText());
								if(sap.ui.getCore().byId('CustomerDashBoardReturnVw') != undefined){
									sap.ui.getCore().byId('CustomerDashBoardReturnVw').destroy();
								}
								fromScreenMove = "CustomerDashBoardReleaseVw";
								var bus = sap.ui.getCore().getEventBus();
								bus.publish("nav", "to", {id : "CustomerDashBoardReturnVw"});
				}}).bindProperty("text", "Return"),//.bindProperty("helpId","filterReturnRefId"),
               sortProperty: "Return",
               width:"18%",
               resizable:false,
               filterProperty: "Return"}));

		oReturnTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Quantity Off-Hired",textAlign :sap.ui.core.TextAlign.End}).addStyleClass('wraptext'),
			template: new sap.ui.commons.TextView({textAlign :sap.ui.core.TextAlign.End}).bindProperty("text", "ReturnQty"),
			sortProperty: "ReturnQty",
			filterProperty: "ReturnQty",
			resizable:false}));
		
		oReturnTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Quantity Outstanding",textAlign :sap.ui.core.TextAlign.End}).addStyleClass('wraptext'),
			template: new sap.ui.commons.TextView({textAlign :sap.ui.core.TextAlign.End}).bindProperty("text", "OutstandQty"),
			sortProperty: "OutstandQty",
			filterProperty: "OutstandQty",resizable:false}));
		   
		//oReturnTable.setModel(oModelMyInventory);
		oReturnTable.bindRows("/");
		
		var olblActReturnHdr = new sap.ui.commons.Label({
				text: "My Active Returns - Top 5 ", 
				wrapping: true
			}).addStyleClass("fontTitle");
		 
		var btnViewAllReturnCDB = new sap.m.Button("idVAllActRetrnCDB",{
                 text : "View All",
				 visible: false,
                 type:sap.m.ButtonType.Unstyled,
                 press:function(){
						//this.setVisible(false);
						fromScreenMove = "";
						if(sap.ui.getCore().byId('CustomerDashBoardReturnViewAllVw') != undefined){
									sap.ui.getCore().byId('CustomerDashBoardReturnViewAllVw').destroy();
							}
								
						var bus = sap.ui.getCore().getEventBus();
						bus.publish("nav", "to", {id : "CustomerDashBoardReturnViewAllVw"});
                    }
              }).addStyleClass("submitBtn marginTop7");

		var oFlxBxActvReturnHdrCDB = new sap.m.FlexBox({
			  items:[olblActReturnHdr],
			  width:"100%",
			  direction: "Row"
			 });
		
		var oFlxBxActvReturnCDB = new sap.m.FlexBox("idFlxBxReturnCDB",{
			  items:[oFlxBxActvReturnHdrCDB, oReturnTable,btnViewAllReturnCDB],
			  width:"90%",
			  direction: "Column"
			 }).addStyleClass("marginTop10");
			 
		return oFlxBxActvReturnCDB;
   },
       
    //ONHIRE POPUP
	createOverLayOnhiredDtl: function(){
	   var objOHDtl = new customerDBoardOnHiredDtl();
	   objOHDtl.createOnHireDetail();
   },
	  
	//SET ONHIRE GLOBAL DATA FROM RESULT
	setOnhireGlobalData: function(resultDataServer){
		var objutil = new utility();
		var UnitTypeCount = 0;
		jsonBindGraphOnHire.length = 0;
		jsonResultDataAllOnHire.length = 0;
		var cnvrtDate='',OnhireDatesort;
		for(var i =0; i < resultDataServer.length;i++){
			try{
				var datenw = resultDataServer[i].OnhireDate.split('(')[1].split(')')[0];
				cnvrtDate=  new Date(parseInt(datenw));
				OnhireDatesort =  new Date(parseInt(datenw));
				cnvrtDate = cnvrtDate.format("dd-mm-yyyy"); //convertDate(cnvrtDate);
				if(cnvrtDate == 09-09-9999)
					cnvrtDate = '';
					
				//cnvrtDate=  new Date(parseInt(resultDataServer[i].OnhireDate.substr(6,13))).format("dd-mm-yyyy");
				//cnvrtDate = cnvrtDate.format("dd-mm-yyyy"); // convertDate(cnvrtDate);
			}catch(e){
				cnvrtDate = '';
				OnhireDatesort = '';
			}
			if(resultDataServer[i].Utcntf == 'X'){
				UnitTypeCount = UnitTypeCount+1;
				//SET ONLY BIND GRAPH DATA
				jsonBindGraphOnHire.push({
					"CustomerNo": resultDataServer[i].CustomerNo ,
					"LeaseType": resultDataServer[i].LeaseType ,
					"LeaseNo" : objutil.removeLeadZero($.trim(resultDataServer[i].LeaseNo)),
					"ReleaseNo" : objutil.removeLeadZero($.trim(resultDataServer[i].ReleaseNo)),
					"OrderedProd": resultDataServer[i].OrderedProd ,
					"Sernr": resultDataServer[i].Sernr ,
					"OnhireDate" : cnvrtDate,
					"LocOnhire" : resultDataServer[i].LocOnhire,
					"Ut": resultDataServer[i].Ut,
					"Utcnt": resultDataServer[i].Utcnt,
					"Utcntf" : resultDataServer[i].Utcntf,
					"Ct" : resultDataServer[i].Ct,
					"Ctcnt": resultDataServer[i].Ctcnt,
					"Ctcntf": resultDataServer[i].Ctcntf,
					"Df" : resultDataServer[i].Df,
					"CategoryId" : resultDataServer[i].CategoryId,
					"IExtra1": resultDataServer[i].IExtra1,
					"IExtra": resultDataServer[i].IExtra,
					"IPartner" : resultDataServer[i].IPartner,
					"Categoryf" : resultDataServer[i].Categoryf,
					"OnhireDatesort" : OnhireDatesort
				});
			}
			//SET ALL RESULT DATA
			jsonResultDataAllOnHire.push({
					"CustomerNo": resultDataServer[i].CustomerNo ,
					"LeaseType": resultDataServer[i].LeaseType ,
					"LeaseNo" : objutil.removeLeadZero($.trim(resultDataServer[i].LeaseNo)),
					"ReleaseNo" : objutil.removeLeadZero($.trim(resultDataServer[i].ReleaseNo)),
					"OrderedProd": resultDataServer[i].OrderedProd ,
					"Sernr": resultDataServer[i].Sernr ,
					"OnhireDate" : cnvrtDate,
					"LocOnhire" : resultDataServer[i].LocOnhire,
					"Ut": resultDataServer[i].Ut,
					"Utcnt": resultDataServer[i].Utcnt,
					"Utcntf" : resultDataServer[i].Utcntf,
					"Ct" : resultDataServer[i].Ct,
					"Ctcnt": resultDataServer[i].Ctcnt,
					"Ctcntf": resultDataServer[i].Ctcntf,
					"Df" : resultDataServer[i].Df,
					"CategoryId" : resultDataServer[i].CategoryId,
					"IExtra1": resultDataServer[i].IExtra1,
					"IExtra": resultDataServer[i].IExtra,
					"IPartner" : resultDataServer[i].IPartner,
					"Categoryf" : resultDataServer[i].Categoryf,
					"OnhireDatesort" : OnhireDatesort
				});
		}
		
		if(UnitTypeCount < 15){
			sap.ui.getCore().byId("idbtnViewAllOnhireCDB").setVisible(true);
		   this.setOnHireChartLess();
		}else if(UnitTypeCount >=15){
			sap.ui.getCore().byId("idbtnViewAllOnhireCDB").setVisible(false);
			this.setOnHireChartGreater();
		}
   },
	   
	//SET ONHIRE LESS THEN 15
	setOnHireChartLess: function(){
		statGrpahOnHire = "unittypeonhire"
		var BarDataOnHire = '';
		var oOnhireClmnChartCDB = sap.ui.getCore().byId("idOnhireClmnChartCDB");
		var oModelOnHireCDB = new sap.ui.model.json.JSONModel();
		oModelOnHireCDB.setData(jsonBindGraphOnHire);
		BarDataOnHire = {
					  dimensions : [{axis : 1, name : 'Unit Type', value: "{Ut}"}],
					  measures : [{name : "Unit Count", value : "{Utcnt}"}],
					  data : {path : "/"}
					};
					
		var vOnHireDataset = new sap.viz.ui5.data.FlattenedDataset(BarDataOnHire);
		//var clickSelectData =false;
		oOnhireClmnChartCDB.setDataset(vOnHireDataset);
		oOnhireClmnChartCDB.setModel(oModelOnHireCDB);
   },
	   
	//SET ONHIRE GREATER OR EQUAL TO 15
	setOnHireChartGreater: function(){
		statGrpahOnHire = "hierarchyonhire"
		jsonHierarchyDataOnHire.length = 0;
		jsonBindGraphOnHire.length = 0;
		var BarDataOnHire = '';
		var oOnhireClmnChartCDB = sap.ui.getCore().byId("idOnhireClmnChartCDB");
		var oModelOnHireCDB = new sap.ui.model.json.JSONModel();
		
		$.each(jsonResultDataAllOnHire, function(i, item) {
			//var mnth = item.OnhireDate;
			if(item.Ctcntf == 'X'){
				jsonHierarchyDataOnHire.push({
					"CustomerNo": item.CustomerNo ,
					"LeaseType": item.LeaseType ,
					"LeaseNo" : item.LeaseNo,
					"ReleaseNo" : item.ReleaseNo,
					"OrderedProd": item.OrderedProd ,
					"Sernr": item.Sernr ,
					"OnhireDate" : item.OnhireDate,
					"LocOnhire" : item.LocOnhire,
					"Ut": item.Ut,
					"Utcnt": item.Utcnt,
					"Utcntf" : item.Utcntf,
					"Ct" : item.Ct,
					"Ctcnt": item.Ctcnt,
					"Ctcntf": item.Ctcntf,
					"Df" : item.Df,
					"CategoryId" : item.CategoryId,
					"IExtra1": item.IExtra1,
					"IExtra": item.IExtra,
					"IPartner" : item.IPartner,
					"Categoryf" : item.Categoryf,
					"OnhireDatesort" : item.OnhireDatesort
				});
			}
		});
		
		oModelOnHireCDB.setData(jsonHierarchyDataOnHire);
		BarDataOnHire = {
					  dimensions : [{axis : 1, name : 'Unit Type', value: "{Ct}"}],
					  measures : [{name : "Unit Count", value : "{Ctcnt}"}],
					  data : {path : "/"}
					};
					
		var vOnHireDataset = new sap.viz.ui5.data.FlattenedDataset(BarDataOnHire);
		oOnhireClmnChartCDB.setDataset(vOnHireDataset);
		oOnhireClmnChartCDB.setModel(oModelOnHireCDB);
   },
   
	//ONHIRE HIERARCHY DRIL DOWN
	setHierarchyDrilDwnOnHire: function(XaixsData,YaxisData){
		jsonBindGraphOnHire.length = 0;
		categoryUnitOnhire = XaixsData;
		$.each(jsonResultDataAllOnHire, function(i, item) {
			//var mnth = item.OnhireDate;
			if((item.Utcntf == 'X') &&($.trim(item.CategoryId) == $.trim(XaixsData))){
				jsonBindGraphOnHire.push({
					"CustomerNo": item.CustomerNo ,
					"LeaseType": item.LeaseType ,
					"LeaseNo" : item.LeaseNo,
					"ReleaseNo" : item.ReleaseNo,
					"OrderedProd": item.OrderedProd ,
					"Sernr": item.Sernr ,
					"OnhireDate" : item.OnhireDate,
					"LocOnhire" : item.LocOnhire,
					"Ut": item.Ut,
					"Utcnt": item.Utcnt,
					"Utcntf" : item.Utcntf,
					"Ct" : item.Ct,
					"Ctcnt": item.Ctcnt,
					"Ctcntf": item.Ctcntf,
					"Df" : item.Df,
					"CategoryId" : item.CategoryId,
					"IExtra1": item.IExtra1,
					"IExtra": item.IExtra,
					"IPartner" : item.IPartner,
					"Categoryf" : item.Categoryf,
					"OnhireDatesort" : item.OnhireDatesort
				});
			}
		});
		
		this.setOnHireChartLess();
   },
   
	//CODE FOR OFFHIRE 
	 //OFFHIRE POPUP
	createOverLayOffhiredDtl: function(){
	   var objOHDtl = new customerDBoardOffHiredDtl();
	   objOHDtl.createOffHireDetail();
   },
	  
	//SET OffHIRE GLOBAL DATA FROM RESULT
	setOffhireGlobalData: function(resultDataServer){
		var objutil = new utility();
		var UnitTypeCntoffhire = 0;
		jsonBindGraphOffHire.length = 0;
		jsonResultDataAllOffHire.length = 0;
		var cnvrtDate= '', OffhireDateSort;
		for(var i =0; i < resultDataServer.length;i++){
			try{
				var datenw = resultDataServer[i].OffhireDate.split('(')[1].split(')')[0];
				cnvrtDate=  new Date(parseInt(datenw));
				OffhireDateSort =  new Date(parseInt(datenw));
				cnvrtDate = cnvrtDate.format("dd-mm-yyyy"); //convertDate(cnvrtDate);
				if(cnvrtDate == 09-09-9999)
					cnvrtDate = '';

			}catch(e){
				cnvrtDate = '';
				OffhireDateSort = '';
			}
			if(resultDataServer[i].Utcntf == 'X'){
				UnitTypeCntoffhire = UnitTypeCntoffhire+1;
				//SET ONLY BIND GRAPH DATA
				jsonBindGraphOffHire.push({
					"CustomerNo": resultDataServer[i].CustomerNo ,
					"LeaseType": resultDataServer[i].LeaseType ,
					"LeaseNo" : objutil.removeLeadZero($.trim(resultDataServer[i].LeaseNo)),
					"ReleaseNo" : objutil.removeLeadZero($.trim(resultDataServer[i].ReleaseNo)),
					"OrderedProd": resultDataServer[i].OrderedProd ,
					"Sernr": resultDataServer[i].Sernr ,
					"OffhireDate" : cnvrtDate,
					"LocOffhire" : resultDataServer[i].LocOffhire,
					"Ut": resultDataServer[i].Ut,
					"Utcnt": resultDataServer[i].Utcnt,
					"Utcntf" : resultDataServer[i].Utcntf,
					"Ct" : resultDataServer[i].Ct,
					"Ctcnt": resultDataServer[i].Ctcnt,
					"Ctcntf": resultDataServer[i].Ctcntf,
					"Df" : resultDataServer[i].Df,
					"CategoryId" : resultDataServer[i].CategoryId,
					"IExtra1": resultDataServer[i].IExtra1,
					"IExtra": resultDataServer[i].IExtra,
					"IPartner" : resultDataServer[i].IPartner,
					"Categoryf" : resultDataServer[i].Categoryf,
					"OffhireDateSort" : OffhireDateSort
				});
			}
			//SET ALL RESULT DATA
			jsonResultDataAllOffHire.push({
					"CustomerNo": resultDataServer[i].CustomerNo ,
					"LeaseType": resultDataServer[i].LeaseType ,
					"LeaseNo" : objutil.removeLeadZero($.trim(resultDataServer[i].LeaseNo)),
					"ReleaseNo" : objutil.removeLeadZero($.trim(resultDataServer[i].ReleaseNo)),
					"OrderedProd": resultDataServer[i].OrderedProd ,
					"Sernr": resultDataServer[i].Sernr ,
					"OffhireDate" : cnvrtDate,
					"LocOffhire" : resultDataServer[i].LocOffhire,
					"Ut": resultDataServer[i].Ut,
					"Utcnt": resultDataServer[i].Utcnt,
					"Utcntf" : resultDataServer[i].Utcntf,
					"Ct" : resultDataServer[i].Ct,
					"Ctcnt": resultDataServer[i].Ctcnt,
					"Ctcntf": resultDataServer[i].Ctcntf,
					"Df" : resultDataServer[i].Df,
					"CategoryId" : resultDataServer[i].CategoryId,
					"IExtra1": resultDataServer[i].IExtra1,
					"IExtra": resultDataServer[i].IExtra,
					"IPartner" : resultDataServer[i].IPartner,
					"Categoryf" : resultDataServer[i].Categoryf,
					"OffhireDateSort" : OffhireDateSort
				});
		}
		
		if(UnitTypeCntoffhire < 15){
			sap.ui.getCore().byId("idbtnViewAllOffhireCDB").setVisible(true);
		   this.setOffHireChartLess();
		}else if(UnitTypeCntoffhire >=15){
			sap.ui.getCore().byId("idbtnViewAllOffhireCDB").setVisible(false);
			this.setOffHireChartGreater();
		}
   },
	   
	//SET OffHIRE LESS THEN 15
	setOffHireChartLess: function(){
		statGrpahOffHire = "unittypeoffhire"
		var BarDataOffHire = '';
		var oOffhireClmnChartCDB = sap.ui.getCore().byId("idOffhireClmnChartCDB");
		var oModelOffHireCDB = new sap.ui.model.json.JSONModel();
		oModelOffHireCDB.setData(jsonBindGraphOffHire);
		BarDataOffHire = {
					  dimensions : [{axis : 1, name : 'Unit Type', value: "{Ut}"}],
					  measures : [{name : "Unit Count", value : "{Utcnt}"}],
					  data : {path : "/"}
					};
					
		var vOffHireDataset = new sap.viz.ui5.data.FlattenedDataset(BarDataOffHire);
		//var clickSelectData =false;
		oOffhireClmnChartCDB.setDataset(vOffHireDataset);
		oOffhireClmnChartCDB.setModel(oModelOffHireCDB);
   },
	   
	//SET OFFHIRE GREATER OR EQUAL TO 15
	setOffHireChartGreater: function(){
		statGrpahOffHire = "hierarchyoffhire"
		jsonHierarchyDataOffHire.length = 0;
		jsonBindGraphOffHire.length = 0;
		var BarDataOffHire = '';
		var oOffhireClmnChartCDB = sap.ui.getCore().byId("idOffhireClmnChartCDB");
		var oModelOffHireCDB = new sap.ui.model.json.JSONModel();
		
		$.each(jsonResultDataAllOffHire, function(i, item) {
			//var mnth = item.OffhireDate;
			if(item.Ctcntf == 'X'){
				jsonHierarchyDataOffHire.push({
					"CustomerNo": item.CustomerNo ,
					"LeaseType": item.LeaseType ,
					"LeaseNo" : item.LeaseNo,
					"ReleaseNo" : item.ReleaseNo,
					"OrderedProd": item.OrderedProd ,
					"Sernr": item.Sernr ,
					"OffhireDate" : item.OffhireDate,
					"LocOffhire" : item.LocOffhire,
					"Ut": item.Ut,
					"Utcnt": item.Utcnt,
					"Utcntf" : item.Utcntf,
					"Ct" : item.Ct,
					"Ctcnt": item.Ctcnt,
					"Ctcntf": item.Ctcntf,
					"Df" : item.Df,
					"CategoryId" : item.CategoryId,
					"IExtra1": item.IExtra1,
					"IExtra": item.IExtra,
					"IPartner" : item.IPartner,
					"Categoryf" : item.Categoryf,
					"OffhireDateSort" : item.OffhireDateSort,
				});
			}
		});
		
		oModelOffHireCDB.setData(jsonHierarchyDataOffHire);
		BarDataOffHire = {
					  dimensions : [{axis : 1, name : 'Unit Type', value: "{Ct}"}],
					  measures : [{name : "Unit Count", value : "{Ctcnt}"}],
					  data : {path : "/"}
					};
					
		var vOffHireDataset = new sap.viz.ui5.data.FlattenedDataset(BarDataOffHire);
		oOffhireClmnChartCDB.setDataset(vOffHireDataset);
		oOffhireClmnChartCDB.setModel(oModelOffHireCDB);
   },
   
    //OFFHIRE HIERARCHY DRIL DOWN
    setHierarchyDrilDwnOffHire: function(XaixsData,YaxisData){
		jsonBindGraphOffHire.length = 0;
		categoryUnitOffhire = XaixsData; //SET FOR CHECK HIERARCHY CLICKED USED ON POPUP 
		$.each(jsonResultDataAllOffHire, function(i, item) {
			//var mnth = item.OffhireDate;
			if((item.Utcntf == 'X') &&($.trim(item.CategoryId) == $.trim(XaixsData))){
				jsonBindGraphOffHire.push({
					"CustomerNo": item.CustomerNo ,
					"LeaseType": item.LeaseType ,
					"LeaseNo" : item.LeaseNo,
					"ReleaseNo" : item.ReleaseNo,
					"OrderedProd": item.OrderedProd ,
					"Sernr": item.Sernr ,
					"OffhireDate" : item.OffhireDate,
					"LocOffhire" : item.LocOffhire,
					"Ut": item.Ut,
					"Utcnt": item.Utcnt,
					"Utcntf" : item.Utcntf,
					"Ct" : item.Ct,
					"Ctcnt": item.Ctcnt,
					"Ctcntf": item.Ctcntf,
					"Df" : item.Df,
					"CategoryId" : item.CategoryId,
					"IExtra1": item.IExtra1,
					"IExtra": item.IExtra,
					"IPartner" : item.IPartner,
					"Categoryf" : item.Categoryf,
					"OffhireDateSort" : item.OffhireDateSort
				});
			}
		});
		this.setOffHireChartLess();
   }
});
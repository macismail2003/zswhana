/*
 *$*$------------------------------------------------------------------------*
*$*$ Modified By : Seyed Ismail MAC
*$*$ Modified On : 24.04.2015
*$*$ Reference   : RTS1139
*$*$ Transport   : CGWK900946
*$*$ Tag         : MAC24042015
*$*$ Purpose     : UI5 : Old Portal Removal Project - Remove Dependencies in the sequence

*$*$---------------------------------------------------------------------
*

 */

jQuery.sap.require("sap.ui.model.json.JSONModel");
var objcurntFPURESearch, objOnlineFPUREstimate, showmsgFPUREO = false; // CURRNET FILE AND ONLINE REQUEST FILE OBJECT;
var objUtilFPUREstimate = new utility();
var clickEvntFPURES= '';
var jsnResultAllDataFPRES = {};
jsnResultAllDataFPRES.All = [];
jsnResultAllDataFPRES.headerDtl = [];
jsnResultAllDataFPRES.errorDtl = [];
jsnResultAllDataFPRES.searchErrorDtl = [];
jsnResultAllDataFPRES.lineItemsDtl = [];
var submitType;

sap.ui.model.json.JSONModel.extend("FixPartialRepairEstimateSearch", {
createRepairEstimate: function(){
		objcurntFPURESearch = new FixPartialRepairEstimateSearch();
		objOnlineFPUREstimate = new RepairEstimateOnline();
		var depotEnabled = false, depotId = '';
		if(objLoginUser.getLoggedInUserType() == "SEACO"){
			depotEnabled = true;
		}else{
			depotId = objLoginUser.getLoggedInUserID();
		}
		// Responsive Grid Layout
			    var oFPURESearchLayout = new sap.ui.layout.form.ResponsiveGridLayout({
			    	  labelSpanL: 1,
					  labelSpanM: 1,
					  labelSpanS: 1,
					  emptySpanL: 0,
					  emptySpanM: 0,
					  emptySpanS: 0,
					  columnsL: 1,
					  columnsM: 1,
					  columnsS: 1,
					  breakpointL: 765,
					  breakpointM: 320
			    });
   	 
		// Labels
		var oLabelDepotFPURESearch = new sap.ui.commons.Label({text: "Depot:",
			required: true,
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
            wrapping: true}).addStyleClass("margin10");
		
		var olblEstmtTypeFPURES = new sap.ui.commons.Label({text: "Estimate Type:",
			required: true,
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: true, margin: true}),
			wrapping: true}).addStyleClass("marginTop10");
		
		var oLabelSerialNoFPURESearch = new sap.ui.commons.Label({text: "Serial Number:",
			required: true,
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("margin10");
		
		var oLabelMandatoryFPURESearch = new sap.ui.commons.Label({text: "Mandatory Field",
			required: true,
			requiredAtBegin : true,
            wrapping: true}).addStyleClass("margin10");
		
		// Depot Drop-down
		var oComboDepotFPURESearch = new sap.ui.commons.AutoComplete("idComboDepotFPURESearch", { 
			  layoutData: new sap.ui.layout.GridData({span: "L4 M6 S12"}),
			  width:"100%",
			  enabled: depotEnabled,
			  //editable: depotEnabled,
			  showListExpander: false,
			  placeholder: "Select Depot",
	          displaySecondaryValues:false,
	          change: function(evnt){
				if(this.getValue() != '')
				{
					this.setValueState(sap.ui.core.ValueState.None);
					this.setPlaceholder("Select Depot");
				}
	          },
			afterClearText: function(evnt){
			}
		}).addStyleClass("FormInputStyle marginTop7");
	    
	 // Text Field
    	var oInputSerialNoFPURESearch = new sap.ui.commons.TextField('idSerailNoFPURESearch',{
    		placeholder: "Serial Number",
    		layoutData: new sap.ui.layout.GridData({span: "L3 M6 S12"}),
			value: "",
    	}).addStyleClass("FormInputStyle marginTop7");
    	
		oInputSerialNoFPURESearch.onfocusin =  function(e) {  
				this.setValueState(sap.ui.core.ValueState.None);
				this.setPlaceholder("Serial Number");                          
		      };
		
		var oDdlEstmtTypeFPURES = new sap.ui.commons.DropdownBox("idDdlEstmtTypeFPURES", { 
			  layoutData: new sap.ui.layout.GridData({span: "L3 M6 S12"}),
			  width:"100%",
			  displaySecondaryValues:false,
			  placeholder: "Select Estimate Type",  
			  change: function(evnt){
				if(this.getValue() != '')
				{
					this.setValueState(sap.ui.core.ValueState.None);
					this.setPlaceholder("Select Estimate Type");
				}
			  },
		}).addStyleClass("FormInputStyle marginTop7");
		oDdlEstmtTypeFPURES.setModel(omdlGlobalRESData); //SET DATA FROM REPAIR ESTIMATE SINGLE STATIC DATA
		var oItmTmpltGloabFPURES = new sap.ui.core.ListItem();
		oItmTmpltGloabFPURES.bindProperty("text", "text");
		oItmTmpltGloabFPURES.bindProperty("key", "key");

		oDdlEstmtTypeFPURES.bindItems("/JobType", oItmTmpltGloabFPURES);
		
		var olblUnitPCodeFPURES = new sap.ui.commons.Label({text: "Unit Part Code:",
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: true, margin: true}),
			visible : false,				// MAC24042015 -
			wrapping: false}).addStyleClass("marginTop10");
		
		var oDdlUnitPCodeFPURES = new sap.ui.commons.DropdownBox("idDdlUnitPCodeFPURES", { 
			 layoutData: new sap.ui.layout.GridData({span: "L3 M6 S12"}),
			  width:"100%",
			  visible : false,				// MAC24042015 -
			  displaySecondaryValues:false,
			  placeholder: "Select Unit Part Code",  
			  change: function(evnt){
				if(this.getValue() != '')
				{
					this.setValueState(sap.ui.core.ValueState.None);
					this.setPlaceholder("Select Unit Part Code");
				}
			  },
		}).addStyleClass("FormInputStyle marginTop7");
		
		oDdlUnitPCodeFPURES.setModel(omdlGlobalRESData); //SET DATA FROM REPAIR ESTIMATE SINGLE STATIC DATA
		oDdlUnitPCodeFPURES.bindItems("/UnitPartCode", oItmTmpltGloabFPURES);
		sap.ui.getCore().byId("idDdlUnitPCodeFPURES").setSelectedKey("C");
		
    	// Buttons
	   	var oBtnPortalTranFPURES = new sap.m.Button("idBtnPortalTranFPURES",{
				text : "Search for Portal Transactions",
				styled:false,
				//layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: true}),
				press:function(){
					msgIdFPURES = '';
					objcurntFPURESearch.clickedPortalTrans('');
			}}).addStyleClass("submitBtn");
	   	
	   	var oBtnEDIMessageFPURES = new sap.m.Button("idBtnEDIMessageFPURES",{
			text : "Search for EDI Messages",
			styled:false,
			visible: true,				// MAC25022015 +
			//layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
			press:function(){
				msgIdFPURES = '';
				clickEvntFPURES = 'edimessage';
				objcurntFPURESearch.OnlineServerMessageEDI("submit");
		}}).addStyleClass("submitBtn");
	   	
		// Flex Box
    	var oFlxBtnSbmt = new sap.m.FlexBox({
    	      items: [oBtnPortalTranFPURES, new sap.ui.commons.Label( {text: " ",width : '8px'}), oBtnEDIMessageFPURES],
    	      direction: "Row",
			  layoutData: new sap.ui.layout.GridData({span: "L12 M12 S12",linebreak: true, margin: false}),
    	    }).addStyleClass("marginTop10");
			  
	   	
    	var oBckbtn = new sap.m.Link("idBackFPURESearch",{text: " < Back",
			width:"50px",
			wrapping:true,
			visible:false,
			press:function(){
				var bus = sap.ui.getCore().getEventBus();
				bus.publish("nav", "back");
				$('#idHdrContnt').html('EDI Message - Status U');
		}});
    	
	 // Online Form Starts
			     var oFPURESearchForm = new sap.ui.layout.form.Form("idFPURESearchForm",{
			             layout: oFPURESearchLayout,
			             formContainers: [
			                     new sap.ui.layout.form.FormContainer({
			                             //title: "Repair Estimate Search",
		                             formElements: [
														new sap.ui.layout.form.FormElement({
														    fields: [oBckbtn]
														}),
														new sap.ui.layout.form.FormElement({
														    fields: [oLabelDepotFPURESearch, oComboDepotFPURESearch]
														}),
														new sap.ui.layout.form.FormElement({
														    fields: [olblEstmtTypeFPURES, oDdlEstmtTypeFPURES]
														}),
														new sap.ui.layout.form.FormElement({
														    fields: [oLabelSerialNoFPURESearch, oInputSerialNoFPURESearch]
														}),
														new sap.ui.layout.form.FormElement({
														    fields: [olblUnitPCodeFPURES, oDdlUnitPCodeFPURES]
														}),
														new sap.ui.layout.form.FormElement({
														    fields: [oFlxBtnSbmt]
														}),
														new sap.ui.layout.form.FormElement({
														    fields: [oLabelMandatoryFPURESearch]
														}),
														new sap.ui.layout.form.FormElement({
														    fields: [new sap.ui.commons.HorizontalDivider({width: "100%", type: "Area", height: "Medium"})]
														}),
														new sap.ui.layout.form.FormElement("idFrmElemntLoadSavedFPURESearch",{
														    fields: []
														})
			                                     ]
			                     })
			             ]
			     });
			    FixPartialRepairEstimateOnline.getOnlinefunDepotCode();
				
				return oFPURESearchForm;
	},
	
	clickedPortalTrans: function(transid){
			clickEvntFPURES = 'portaltransaction';
			objcurntFPURESearch.OnlineServerMessagePortalTrans(transid);
	},
	createTableLoadSavedData: function(jsnLoadResponseData){
		var oidTblResponseDataFPURES = new sap.ui.table.Table(
			'idTblResponseDataFPURES',
			{
				selectionMode : sap.ui.table.SelectionMode.None,
				navigationMode : sap.ui.table.NavigationMode.None,
				layoutData: new sap.ui.layout.GridData({span: "L6 M12 S12",linebreak: false, margin: false}),
			}).addStyleClass('tblBorder');
			
		oidTblResponseDataFPURES.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({text : "Action"}),
			template : new sap.ui.commons.TextView().bindProperty("text", "Message"),
			resizable:false
		}));
		
		function formateLink(value) {
			//this.enabled
			if(value != null){
				//value= value.toUpperCase();
				if(value == 'Successful' || value == 'NE')
					this.addStyleClass("linkastext");
			}
			return value;
		}
		
		var oBtnTblDeleteFPURESearch = new sap.ui.commons.Link({
				text: '{MsgStatus}',//{path: "MsgStatus", formatter: formateLink},
				enabled: '{ChkBxEnabled}',
                press : function() {
                	if(this.getText() == 'Error')
                		objcurntFPURESearch.OpenFixPartialScreenPortalTran(this.getHelpId());
                	//delEstmtId = this.getHelpId().split('|')[0];
				}}).bindProperty("helpId","Stepid");
	
		oidTblResponseDataFPURES.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Status"}),
			width : "150px",
			template: oBtnTblDeleteFPURESearch,
			resizable:false
		}));

		var oChkBxSelFPURES = new sap.ui.commons.CheckBox({
			enabled: '{ChkBxEnabled}',
				checked: '{ChkBxSel}'
		});
		
		oidTblResponseDataFPURES.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({text : "Select"}),
			template : oChkBxSelFPURES,
			resizable:false,
			width : "60px"
		}));
		
		var oMdlErrTblFPURESearch = new sap.ui.model.json.JSONModel();
		oMdlErrTblFPURESearch.setData({modelData : jsnLoadResponseData});
		oidTblResponseDataFPURES.setModel(oMdlErrTblFPURESearch);
		oidTblResponseDataFPURES.bindRows("/modelData");
		if(jsnLoadResponseData.length < 1){
			oidTblResponseDataFPURES.setVisibleRowCount(5);
			oidTblResponseDataFPURES.setNavigationMode(sap.ui.table.NavigationMode.None);
		}else if(jsnLoadResponseData.length < 26){
			oidTblResponseDataFPURES.setVisibleRowCount(jsnLoadResponseData.length);
			oidTblResponseDataFPURES.setNavigationMode(sap.ui.table.NavigationMode.None);
		}else{
			oidTblResponseDataFPURES.setVisibleRowCount(25);
			oidTblResponseDataFPURES.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		}
		var lnkVwDtlVisible = false;
		
		if(clickEvntFPURES == 'edimessage')
			lnkVwDtlVisible = true;
		
		var oLnkVwDtlEDIFPRES = new sap.ui.commons.Link({
			text: "View Details",
			visible: lnkVwDtlVisible,
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: false}),
            press : function() {
            	objcurntFPURESearch.OpenFixPartialScreenEDI();
			}});
		
		var oBtnResubmitFPURES = new sap.m.Button("idBtnResubmitFPURES",{
			text : "Resubmit",
			styled:false,
			width:"80px",
			layoutData: new sap.ui.layout.GridData({span: "L1 M1 S1",linebreak: true, margin: true}),
			press:function(){
				showmsgFPUREO = false;
				objcurntFPURESearch.validateOnResumit();
			}}).addStyleClass("submitBtn marginTop10");
		
		
		/* Begin of adding by Seyed Ismail on 24.04.2015 MAC24042015*/
		
		var oLabelBlank = new sap.ui.commons.Label({text: " ",
            width: "20px"});
		
		var oBtnDelEDIU = new sap.m.Button('idBtnDelEDIRES', {
            text : "Delete",
            styled:false,
            width:"80px",
            visible: false,
            layoutData: new sap.ui.layout.GridData({span: "L1 M1 S1",linebreak: false, margin: false}),
            press:function(){
            	jQuery.sap.require("sap.ui.commons.MessageBox");
            	var confirmMessage = "Current message will be deleted from this log. \n Please make sure you have fixed the issue. \n Continue?";
                sap.ui.commons.MessageBox.show(confirmMessage,
                sap.ui.commons.MessageBox.Icon.WARNING,
                "Warning",
                [sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO], 
                objcurntFPURESearch.proceedToDeleteU,
                    sap.ui.commons.MessageBox.Action.YES);            
            }
         }).addStyleClass("submitBtn marginTop10");
		
		/* End of adding by Seyed Ismail on 24.04.2015 MAC24042015*/
		
		
		var frmCntnrFPURES = new sap.ui.layout.form.FormContainer("idFrmCntnrResltFPURES",{
            //title: "Repair Estimate Search",
            formElements: [
							new sap.ui.layout.form.FormElement({
							    fields: [oidTblResponseDataFPURES.addStyleClass("marginTop20"),oLnkVwDtlEDIFPRES.addStyleClass("marginTop25")]
							}),
							new sap.ui.layout.form.FormElement({
							    fields: [oBtnResubmitFPURES, oBtnDelEDIU ]	// MAC24042015 + Added oLabelBlank, oBtnDelEDIU
							})
                    ]
		});
		return frmCntnrFPURES;
	},
	
	/* Begin of adding by Seyed Ismail on 24.04.2015 MAC24042015 + */
	proceedToDeleteU: function(sResult) {
	      if(sResult == "YES"){
	    	busyDialog.open();
	    	
	    	var edi_delurl = serviceUrl15_old + "/Edi_Deletes('" +globalMessageUid+ "')";
	  		oModel = new sap.ui.model.odata.ODataModel(serviceUrl15_old, true);
	  		OData.request({ 
	  		   requestUri: edi_delurl,
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
	  			 if(data.Success == "X"){
	  				var successMessage = "Message Deleted!";
	  			 }
	  			 else{
	  				var successMessage = "Message cannot be Deleted! Please make sure you are deleting U message";
	  			 }
	  			sap.ui.commons.MessageBox.alert(successMessage, "EDI Status U Deletion");
	           },
	           function(err){
	        	   busyDialog.close();
	        	   var successMessage = "Message cannot be Deleted!";
	        	   sap.ui.commons.MessageBox.alert(successMessage, "EDI Status U Deletion");
	            });
	      }
	    },
	/* End of adding by Seyed Ismail on 24.04.2015 MAC24042015 + */
	    
	OpenFixPartialScreenPortalTran :function(stepid){
		jsnResultAllDataFPRES.errorDtl.length = 0;
		for(var indx=0;indx < jsnResultAllDataFPRES.All.length;indx++){
			//SET DATA FOR DISPLAY SCREEN ERROR TABLE
			if((jsnResultAllDataFPRES.All[indx].DtlFlag == 'X') && (jsnResultAllDataFPRES.All[indx].Stepid == stepid)){
	    		jsnResultAllDataFPRES.errorDtl.push({
	    			'Stepid':jsnResultAllDataFPRES.All[indx].Stepid, 
	    			'Type':jsnResultAllDataFPRES.All[indx].MsgType, 
	    			'Message':jsnResultAllDataFPRES.All[indx].Message,
	    			'MsgStatus':jsnResultAllDataFPRES.All[indx].MsgStatus});
		 	}
		}
		
    	var bus = sap.ui.getCore().getEventBus();
    	bus.publish("nav", "to", {id : "FPURepairEstimateDisplayVw"});
		// tell detail to update
		bus.publish("app", "RefreshDetail", {
			jsnData: jsnResultAllDataFPRES,
			eventFrm: "PORTALTRANS"
		});
	},
	
	//LOAD DATA FROM SERVER
	onlinesuccessServerMessagePortalTrans: function(resultdata, response){
		busyDialog.close();
		jQuery.sap.require("sap.ui.model.json.JSONModel");
		try{
			if(resultdata != undefined){
				for(var indx in resultdata.results){
					//SET DATA FOR DISPLAY SCREEN ESTIMATE HEADER(FIRST ROW)
						if(resultdata.results[indx].Contcomp == 'Y')
							resultdata.results[indx].Contcomp = true;
						else
							resultdata.results[indx].Contcomp = false;
						
						if(resultdata.results[indx].Multpart == 'Y')
							resultdata.results[indx].Multpart = true;
						else
							resultdata.results[indx].Multpart = false;
					
						if(resultdata.results[indx].Erdat != ''){
							var datenw = resultdata.results[indx].Erdat.split('(')[1].split(')')[0];
							//resultdata.results[indx].Erdat=  new Date(parseInt(datenw)).format("dd-mm-yyyy");
							resultdata.results[indx].Erdat= dateFormat(new Date(Number(datenw)), 'dd-mm-yyyy',"UTC"); 
						}
						
						if(resultdata.results[indx].EstimateDt != ''){
							var datenw = resultdata.results[indx].EstimateDt.split('(')[1].split(')')[0];
							//resultdata.results[indx].EstimateDt =  new Date(parseInt(datenw)).format("dd-mm-yyyy");
							resultdata.results[indx].EstimateDt =  dateFormat(new Date(Number(datenw)), 'dd-mm-yyyy',"UTC"); 
						}
						
						jsnResultAllDataFPRES.All.push({
							'MessageId':'',
							'Bname':resultdata.results[indx].Bname, 'ItemFlag':resultdata.results[indx].ItemFlag,
							'DtlFlag':resultdata.results[indx].DtlFlag, 'MsgStatus':resultdata.results[indx].MsgStatus,
							'Message':resultdata.results[indx].Message, 'MsgType':resultdata.results[indx].MsgType,
							'Stepid':resultdata.results[indx].Stepid, 'Status':resultdata.results[indx].Status,
							'BulletinNumber':resultdata.results[indx].BulletinNumber, 
							'LabourRate':resultdata.results[indx].LabourRate, 'Responsibility':resultdata.results[indx].Responsibility,
							'MaterialCost':resultdata.results[indx].MaterialCost, 'ManHours':resultdata.results[indx].ManHours,
							'Quantity':resultdata.results[indx].Quantity, 'RepairMeasureU':resultdata.results[indx].RepairMeasureU,
							'RepairWidth':resultdata.results[indx].RepairWidth, 'RepairLength':resultdata.results[indx].RepairLength,
							'RepairCode':resultdata.results[indx].RepairCode, 'MaterialCode':resultdata.results[indx].MaterialCode,
							'DamageCode':resultdata.results[indx].DamageCode, 'ComponentCode':resultdata.results[indx].ComponentCode,
							'LocationCode':resultdata.results[indx].LocationCode, 'LineItem':resultdata.results[indx].LineItem,
							'SendAddr':resultdata.results[indx].SendAddr, 'RepairMsg':resultdata.results[indx].RepairMsg,
							'Multpart':resultdata.results[indx].Multpart, 'Contcomp':resultdata.results[indx].Contcomp,
							'Equnr':resultdata.results[indx].Equnr, 'WorkCtr':resultdata.results[indx].WorkCtr,
							'Plangroup':resultdata.results[indx].Plangroup, 'CompanyCode':resultdata.results[indx].Bukrs,
							'AssetNo':resultdata.results[indx].AssetNo, 'CurrencyCode':resultdata.results[indx].CurrencyCode,
							'LesseAmt':resultdata.results[indx].LesseAmt, 'EstimateDt':resultdata.results[indx].EstimateDt,
							'SaleGrade':resultdata.results[indx].SaleGrade, 'UnitPartcode':resultdata.results[indx].UnitPartcode,
							'MaterialType':resultdata.results[indx].UnitType, 'EstType':resultdata.results[indx].EstType,
							'EstimateId':resultdata.results[indx].EstimateId, 'Ertim':resultdata.results[indx].Ertim,
							'WorkCreatedDat':resultdata.results[indx].Erdat, 'Sernr':resultdata.results[indx].Sernr,
							'DepotCode':resultdata.results[indx].DepotCode, 'MoveType':resultdata.results[indx].MoveType,
							'TranxId':resultdata.results[indx].TranxId, 'MovementInDate': ''
						});
						
					//SET DATA FOR SEARCH SCREEN
					var chkBxEnabled = true;
					if(resultdata.results[indx].MsgStatus == "Successful"){
							chkBxEnabled = false;
					}
						
					if(resultdata.results[indx].MsgType == 'D'){
						jsnResultAllDataFPRES.searchErrorDtl.push({
							'Stepid':resultdata.results[indx].Stepid, 
							'Type':resultdata.results[indx].MsgType, 
							'Message':resultdata.results[indx].Message,
							'MsgStatus':resultdata.results[indx].MsgStatus,
							'ChkBxEnabled': chkBxEnabled,
							'ChkBxSel': false,
							'RFCRequested': false,
							'RFCResult':[],
						});
					}
				}
				
				for(var indx =0; indx < jsnResultAllDataFPRES.All.length; indx++){
					//SET DATA FOR HEADER
					if(indx == 0){
						transidFPURE = jsnResultAllDataFPRES.All[indx].TranxId;
						jsnResultAllDataFPRES.headerDtl.push({
							'MessageId':jsnResultAllDataFPRES.All[indx].MessageId,
							'EstimateType':jsnResultAllDataFPRES.All[indx].EstType, 'SerialNumber':jsnResultAllDataFPRES.All[indx].Sernr, 
							'SenderAddress':jsnResultAllDataFPRES.All[indx].SendAddr, 'EstimateNumber':jsnResultAllDataFPRES.All[indx].EstimateId, 
							'CurrencyCode':jsnResultAllDataFPRES.All[indx].CurrencyCode , 'MovementInDate':jsnResultAllDataFPRES.All[indx].MovementInDate, 
							'SaleGrade':jsnResultAllDataFPRES.All[indx].SaleGrade, 'UnitPartcode':jsnResultAllDataFPRES.All[indx].UnitPartcode, 
							'WorkCreatedDate':jsnResultAllDataFPRES.All[indx].WorkCreatedDat,
							'ContainerStructureComplete':jsnResultAllDataFPRES.All[indx].Contcomp, 'MultiPartContainer': jsnResultAllDataFPRES.All[indx].Multpart, 
							'AssetNumber':jsnResultAllDataFPRES.All[indx].AssetNo, 'CompanyCode':jsnResultAllDataFPRES.All[indx].CompanyCode, 
							'EquipmentNumber':jsnResultAllDataFPRES.All[indx].Equnr, 'FunctionalLocation':jsnResultAllDataFPRES.All[indx].DepotCode, 
							'MaterialType':jsnResultAllDataFPRES.All[indx].MaterialType, 'PlannerGroup':jsnResultAllDataFPRES.All[indx].Plangroup, 
							'RepairDecisionMsgName':jsnResultAllDataFPRES.All[indx].RepairMsg,
							'LesseAmt' : jsnResultAllDataFPRES.All[indx].LesseAmt,'EstimateDt': jsnResultAllDataFPRES.All[indx].EstimateDt,
							'TranxId': jsnResultAllDataFPRES.All[indx].TranxId,'WorkCtr':resultdata.results[indx].WorkCtr
							});	
					}
					//SET DATA FOR DISPLAY SCREEN LINE ITEM TABLE
					if(jsnResultAllDataFPRES.All[indx].ItemFlag == 'X'){
						jsnResultAllDataFPRES.lineItemsDtl.push({
							"LineItem": jsnResultAllDataFPRES.All[indx].LineItem, //"sectionKey":jsnResultAllDataFPRES.All[indx].MsgType,
							"LocationCode": jsnResultAllDataFPRES.All[indx].LocationCode,	
							"ComponentCode":jsnResultAllDataFPRES.All[indx].ComponentCode,
							"DamageCode":jsnResultAllDataFPRES.All[indx].DamageCode , "RepairCode":jsnResultAllDataFPRES.All[indx].RepairCode, 
							"MaterialCode":jsnResultAllDataFPRES.All[indx].MaterialCode, "MaterialCost":jsnResultAllDataFPRES.All[indx].MaterialCost,
							"ManHours":jsnResultAllDataFPRES.All[indx].ManHours, "RepairLength":jsnResultAllDataFPRES.All[indx].RepairLength,
							"RepairWidth":jsnResultAllDataFPRES.All[indx].RepairWidth, "Quantity":jsnResultAllDataFPRES.All[indx].Quantity,
							"Responsibility":jsnResultAllDataFPRES.All[indx].Responsibility , "LabourRate":jsnResultAllDataFPRES.All[indx].LabourRate,
							"TechBulletin":jsnResultAllDataFPRES.All[indx].BulletinNumber,'lineSaved': false
						});
					}
				}
			}
			if(jsnResultAllDataFPRES.searchErrorDtl.length > 1){
				sap.ui.getCore().byId("idFPURESearchForm").insertFormContainer(objcurntFPURESearch.createTableLoadSavedData(jsnResultAllDataFPRES.searchErrorDtl),1);
		 		if(submitType == "resubmit"){
			 		sap.ui.getCore().byId("idBtnDelEDIRES").setVisible(true);
			 	}
			}else if(showmsgFPUREO){
				// sap.ui.commons.MessageBox.alert('Selected Steps has been re-processed successfully.');	
				jQuery.sap.require("sap.ui.commons.MessageBox");
            	var confirmMessage = "Selected Steps has been re-processed successfully. Do you want to delete this message?. \n Continue?";
                sap.ui.commons.MessageBox.show(confirmMessage,
                sap.ui.commons.MessageBox.Icon.WARNING,
                "Warning",
                [sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO], 
                objcurntFPURESearch.proceedToDeleteU,
                    sap.ui.commons.MessageBox.Action.YES);    
			}else{
				sap.ui.commons.MessageBox.alert('No records for the specified search criteria.\nPlease refine your search criteria and try again.');
			}
		}catch(e){
			sap.ui.commons.MessageBox.alert('Error during processing.');
		}
	},
	
	onlineerrorServerMessagePortalTrans: function(err){
		if(sap.ui.getCore().byId("idFrmCntnrResltFPURES") != undefined)
			sap.ui.getCore().byId("idFrmCntnrResltFPURES").destroy();
		
		errorfromServer(err);
	},
	
	OnlineServerMessagePortalTrans: function(transid){
		if(sap.ui.getCore().byId("idFrmCntnrResltFPURES") != undefined)
			sap.ui.getCore().byId("idFrmCntnrResltFPURES").destroy();

		jsnResultAllDataFPRES.All.length = 0;
		jsnResultAllDataFPRES.headerDtl.length = 0;
		jsnResultAllDataFPRES.searchErrorDtl.length = 0;
		jsnResultAllDataFPRES.errorDtl.length = 0;
		jsnResultAllDataFPRES.lineItemsDtl.length = 0;
		transidFPURE = '';
		
		try{
			if(!this.ValidateDataBeforeSubmit()){
				busyDialog.close();
				return;
			}
			busyDialog.open();
			var ComboDepotFPURESearch = sap.ui.getCore().byId("idComboDepotFPURESearch").getSelectedKey();
			var SerailNoFPURESearch = sap.ui.getCore().byId("idSerailNoFPURESearch").getValue().toUpperCase();
			var DdlEstmtTypeFPURES = sap.ui.getCore().byId("idDdlEstmtTypeFPURES").getSelectedKey();//.toUpperCase();
			var DdlUnitPCodeFPURES = sap.ui.getCore().byId("idDdlUnitPCodeFPURES").getSelectedKey();
			
			//http://seanwgd1.gessap.local:8000/sap/opu/odata/sap/ZNW_SEACO_PORTAL_LOT5_SRV/Submit_Repair_Estimate?$filter=Bname eq '' and DepotCode eq 'MCH-CN-SHA-1450' and Equnr eq 'GESU9169953' and EstType eq 'ORIGINAL' and TranxId eq ''
			var urlToCall = serviceUrl15_old + "/Submit_Repair_Estimate?";
			if(transid != ''){
				urlToCall += "$filter=Bname eq '' and DepotCode eq '' and Equnr eq '"+ SerailNoFPURESearch +"' and EstType eq '"+ DdlEstmtTypeFPURES +"' and TranxId eq '"+transid+"'";
			}else{
				urlToCall += "$filter=Bname eq '' and DepotCode eq '"+ ComboDepotFPURESearch +"' and Equnr eq '"+ SerailNoFPURESearch +"' and EstType eq '"+ DdlEstmtTypeFPURES +"' and TranxId eq ''";
			}
				
		    objUtilREstimate.doOnlineRequest(urlToCall,objcurntFPURESearch.onlinesuccessServerMessagePortalTrans, objcurntFPURESearch.onlineerrorServerMessagePortalTrans);
		}catch(e){
			busyDialog.close();
			sap.ui.commons.MessageBox.alert("Error on loading Estimate" + e);
		}
	},
	
	//LOAD DATA FROM SERVER EDI
	OpenFixPartialScreenEDI :function(stepid){
		var bus = sap.ui.getCore().getEventBus();
    	bus.publish("nav", "to", {id : "FPURepairEstimateDisplayVw"});
		// tell detail to update
		bus.publish("app", "RefreshDetail", {
			jsnData: jsnResultAllDataFPRES,
			eventFrm: "EDI"
		});
	},
	
	onlinesuccessServerMessageEDI: function(resultdata, response){
		busyDialog.close();
		jQuery.sap.require("sap.ui.model.json.JSONModel");
		
		function padZero(num, size) {
		    var s = num.trim()+"";
		    while (s.length < size) s = "0" + s;
		    return s;
		};
		
		if(resultdata != undefined){
			for(var indx in resultdata.results){
				//SET DATA FOR DISPLAY SCREEN ESTIMATE HEADER(FIRST ROW)
					if(resultdata.results[indx].ContStructComp == 'Y')
						resultdata.results[indx].ContStructComp = true;
					else
						resultdata.results[indx].ContStructComp = false;
					
					if(resultdata.results[indx].MultiPartCont == 'Y')
						resultdata.results[indx].MultiPartCont = true;
					else
						resultdata.results[indx].MultiPartCont = false;
				
					if(resultdata.results[indx].WorkCreatedDat != ''){
						var datenw = resultdata.results[indx].WorkCreatedDat.split('(')[1].split(')')[0];
						resultdata.results[indx].WorkCreatedDat= dateFormat(new Date(Number(datenw)), 'dd-mm-yyyy',"UTC"); // new Date(parseInt(datenw)).format("dd-mm-yyyy");
						
						if(resultdata.results[indx].WorkCreatedDat == '09-09-9999')
							resultdata.results[indx].WorkCreatedDat = '';
					}
					
					if(resultdata.results[indx].MovementInDate != ''){
						var datenw = resultdata.results[indx].MovementInDate.split('(')[1].split(')')[0];
						resultdata.results[indx].MovementInDate = dateFormat(new Date(Number(datenw)), 'dd-mm-yyyy',"UTC");  //new Date(parseInt(datenw)).format("dd-mm-yyyy");
						
						if(resultdata.results[indx].MovementInDate == '09-09-9999')
							resultdata.results[indx].MovementInDate = '';
					}
					
					jsnResultAllDataFPRES.All.push({
						'MessageId':resultdata.results[indx].MessageId, 'MessageName':resultdata.results[indx].MessageName,
						'Sernr':resultdata.results[indx].SerialNumber, 'Equnr':resultdata.results[indx].EquipmentNumber,
						'AssetNo':resultdata.results[indx].AssetNumber, 'MaterialType':resultdata.results[indx].MaterialType,
						'CompanyCode':resultdata.results[indx].CompanyCode, 'DepotCode':resultdata.results[indx].FunctionalLocat,
						'Plangroup':resultdata.results[indx].PlannerGroup, 'WorkCtr':padZero(resultdata.results[indx].WorkCentre,8),
						'SendAddr':resultdata.results[indx].SenderAddress, 'EstType':resultdata.results[indx].Estimatetype,
						'UnitPartcode':resultdata.results[indx].UnitPartCode, 'SaleGrade':resultdata.results[indx].SalesGrade,
						'WorkCreatedDat':resultdata.results[indx].WorkCreatedDat, 'CurrencyCode':resultdata.results[indx].CurrencyCode,
						'MovementInDate':resultdata.results[indx].MovementInDate, 'EstimateId':resultdata.results[indx].EstimateNumber,
						'Multpart':resultdata.results[indx].MultiPartCont, 'Contcomp':resultdata.results[indx].ContStructComp,
						'LineItem': padZero(resultdata.results[indx].LineItem, 4), 'LocationCode':resultdata.results[indx].LocationCode,
						'ComponentCode':resultdata.results[indx].ComponentCode, 'DamageCode':resultdata.results[indx].DamageCode,
						'MaterialCode':resultdata.results[indx].MaterialCode, 'RepairCode':resultdata.results[indx].RepairCode,
						'RepairLength':resultdata.results[indx].RepairLength, 'RepairWidth':resultdata.results[indx].RepairWidth,
						'RepairMeasureU':resultdata.results[indx].RepairMeasureU, 'Quantity':resultdata.results[indx].Quantity,
						'ManHours':resultdata.results[indx].ManHours, 'MaterialCost':resultdata.results[indx].MaterialCost,
						'Responsibility':resultdata.results[indx].Responsibility, 'LabourRate':resultdata.results[indx].LabourRate,
						'BulletinNumber':resultdata.results[indx].BulletinNumber, 'Stepid':resultdata.results[indx].Stepid,
						'MsgType':resultdata.results[indx].MsgType, 'Message':resultdata.results[indx].Message,
						'Depot':resultdata.results[indx].Depot,
						'Param1':resultdata.results[indx].Param1, 'Param2':resultdata.results[indx].Param2,
						'EstimateDt': '09-09-9999',
						'Param3':resultdata.results[indx].Param3,'RepairMsg': '',//resultdata.results[indx].RepairMsg,
						'LesseAmt':'', 'TranxId':'000000000000',
					});
					
				//SET DATA FOR SEARCH SCREEN
				var chkBxEnabled = true;
				if(resultdata.results[indx].MsgStatus == "Successful"){
						chkBxEnabled = false;
				}
					
				if(resultdata.results[indx].MsgType == 'D'){
					jsnResultAllDataFPRES.searchErrorDtl.push({
		    			'Stepid':resultdata.results[indx].Stepid, 
		    			'Type':resultdata.results[indx].MsgType, 
		    			'Message':resultdata.results[indx].Message,
		    			'MsgStatus':'',
		    			'ChkBxEnabled': chkBxEnabled,
		    			'ChkBxSel': false,
		    			'RFCRequested': false,
		    			'RFCResult':[],
		    		});
			 	}
			}
			
			//SET DATA FOR HEADER AND LINE
			for(var  indx=0; indx<jsnResultAllDataFPRES.All.length; indx++){
				if((jsnResultAllDataFPRES.All[indx].LineItem != '') && (jsnResultAllDataFPRES.All[indx].LineItem != '0000')){
					//SET DATA FOR DISPLAY SCREEN LINE ITEM TABLE
					jsnResultAllDataFPRES.lineItemsDtl.push({
						"LineItem": jsnResultAllDataFPRES.All[indx].LineItem, //"sectionKey":jsnResultAllDataFPRES.All[indx].MsgType,
						"LocationCode": jsnResultAllDataFPRES.All[indx].LocationCode,	
						"ComponentCode":jsnResultAllDataFPRES.All[indx].ComponentCode,
						"DamageCode":jsnResultAllDataFPRES.All[indx].DamageCode , "RepairCode":jsnResultAllDataFPRES.All[indx].RepairCode, 
						"MaterialCode":jsnResultAllDataFPRES.All[indx].MaterialCode, "MaterialCost":jsnResultAllDataFPRES.All[indx].MaterialCost,
						"ManHours":jsnResultAllDataFPRES.All[indx].ManHours, "RepairLength":jsnResultAllDataFPRES.All[indx].RepairLength,
						"RepairWidth":jsnResultAllDataFPRES.All[indx].RepairWidth, "Quantity":jsnResultAllDataFPRES.All[indx].Quantity,
						"Responsibility":jsnResultAllDataFPRES.All[indx].Responsibility , "LabourRate":jsnResultAllDataFPRES.All[indx].LabourRate,
						"TechBulletin":jsnResultAllDataFPRES.All[indx].BulletinNumber,
						'lineSaved': false});
					
					//SET DATA FOR DISPLAY SCREEN ESTIMATE HEADER
					jsnResultAllDataFPRES.headerDtl.length = 0;
					jsnResultAllDataFPRES.headerDtl.push({
						'MessageId':jsnResultAllDataFPRES.All[indx].MessageId,
						'EstimateType':jsnResultAllDataFPRES.All[indx].EstType, 'SerialNumber':jsnResultAllDataFPRES.All[indx].Sernr, 
						'SenderAddress':jsnResultAllDataFPRES.All[indx].SendAddr, 'EstimateNumber':jsnResultAllDataFPRES.All[indx].EstimateId, 
						'CurrencyCode':jsnResultAllDataFPRES.All[indx].CurrencyCode , 'MovementInDate':jsnResultAllDataFPRES.All[indx].MovementInDate, 
						'SaleGrade':jsnResultAllDataFPRES.All[indx].SaleGrade, 'UnitPartcode':jsnResultAllDataFPRES.All[indx].UnitPartcode, 
						'WorkCreatedDate':jsnResultAllDataFPRES.All[indx].WorkCreatedDat,
						'ContainerStructureComplete':jsnResultAllDataFPRES.All[indx].Contcomp, 'MultiPartContainer': jsnResultAllDataFPRES.All[indx].Multpart, 
						'AssetNumber':jsnResultAllDataFPRES.All[indx].AssetNo, 'CompanyCode':jsnResultAllDataFPRES.All[indx].CompanyCode, 
						'EquipmentNumber':jsnResultAllDataFPRES.All[indx].Equnr, 'FunctionalLocation':jsnResultAllDataFPRES.All[indx].DepotCode, 
						'MaterialType':jsnResultAllDataFPRES.All[indx].MaterialType, 'PlannerGroup':jsnResultAllDataFPRES.All[indx].Plangroup, 
						'RepairDecisionMsgName':jsnResultAllDataFPRES.All[indx].RepairMsg,
						'LesseAmt' : jsnResultAllDataFPRES.All[indx].LesseAmt,'EstimateDt': jsnResultAllDataFPRES.All[indx].EstimateDt,
						'TranxId': jsnResultAllDataFPRES.All[indx].TranxId, 'WorkCtr': jsnResultAllDataFPRES.All[indx].WorkCtr
						});	
				}
			}
			if(msgIdFPURES != ''){
				if(jsnResultAllDataFPRES.headerDtl[0] != undefined){
				var depotcode = jsnResultAllDataFPRES.headerDtl[0].FunctionalLocation.substr(11);
				//sap.ui.getCore().byId("idComboDepotFPURESearch").setSelectedKey(depotcode);
				sap.ui.getCore().byId("idSerailNoFPURESearch").setValue('');
				sap.ui.getCore().byId("idDdlEstmtTypeFPURES").setSelectedKey('');//.toUpperCase();
				sap.ui.getCore().byId("idDdlUnitPCodeFPURES").setSelectedKey('');
				
				var oComboDepotItemsFPURE = sap.ui.getCore().byId("idComboDepotFPURESearch").getItems();
				sap.ui.getCore().byId("idComboDepotFPURESearch").setValue('');
				sap.ui.getCore().byId("idComboDepotFPURESearch").setSelectedKey('');
				
				if(jsnResultAllDataFPRES.headerDtl.length > 0){
					//sap.ui.getCore().byId("idComboDepotFPURESearch").setSelectedKey(depotcode);
					sap.ui.getCore().byId("idSerailNoFPURESearch").setValue(jsnResultAllDataFPRES.headerDtl[0].SerialNumber);
					sap.ui.getCore().byId("idDdlEstmtTypeFPURES").setSelectedKey(jsnResultAllDataFPRES.headerDtl[0].EstimateType);//.toUpperCase();
					sap.ui.getCore().byId("idDdlUnitPCodeFPURES").setSelectedKey(jsnResultAllDataFPRES.headerDtl[0].UnitPartcode);
					
					
					for(var indxitm in oComboDepotItemsFPURE){
						if(oComboDepotItemsFPURE[indxitm].getKey() == depotcode){
							sap.ui.getCore().byId("idComboDepotFPURESearch").setValue(oComboDepotItemsFPURE[indxitm].getText());
							sap.ui.getCore().byId("idComboDepotFPURESearch").setSelectedKey(oComboDepotItemsFPURE[indxitm].getKey());
						}
					}
				}
			}
			}
		}
		if(jsnResultAllDataFPRES.searchErrorDtl.length > 1){
			sap.ui.getCore().byId("idFPURESearchForm").insertFormContainer(objcurntFPURESearch.createTableLoadSavedData(jsnResultAllDataFPRES.searchErrorDtl),1);
	 		if(submitType == "resubmit"){
		 		sap.ui.getCore().byId("idBtnDelEDIRES").setVisible(true);
		 	}
			//sap.ui.getCore().byId("idFrmElemntLoadSavedFPURESearch").insertField(objcurntFPURESearch.createTableLoadSavedData(jsnSearchScreenErrDtl));
		}else{
			sap.ui.commons.MessageBox.alert('No records for the specified search criteria.\nPlease refine your search criteria and try again.');	
		}
	},
	
	onlineerrorServerMessageEDI: function(err){
		if(sap.ui.getCore().byId("idFrmCntnrResltFPURES") != undefined)
			sap.ui.getCore().byId("idFrmCntnrResltFPURES").destroy();
		
		errorfromServer(err);
	},
	
	OnlineServerMessageEDI: function(submit_type){
		submitType = submit_type;
		if(sap.ui.getCore().byId("idFrmCntnrResltFPURES") != undefined)
			sap.ui.getCore().byId("idFrmCntnrResltFPURES").destroy();
		
		if(msgIdFPURES != ''){
			 sap.ui.getCore().byId("idBackFPURESearch").setVisible(true);
		}
		
		jsnResultAllDataFPRES.All.length = 0;
		jsnResultAllDataFPRES.headerDtl.length = 0;
		jsnResultAllDataFPRES.searchErrorDtl.length = 0;
		jsnResultAllDataFPRES.errorDtl.length = 0;
		jsnResultAllDataFPRES.lineItemsDtl.length = 0;
		transidFPURE = '';
		
		try{
			if(msgIdFPURES == ''){
				if(!this.ValidateDataBeforeSubmit()){
					busyDialog.close();
					return;
				}
			}
			busyDialog.open();
			var ComboDepotFPURESearch = sap.ui.getCore().byId("idComboDepotFPURESearch").getValue();
			var SerailNoFPURESearch = sap.ui.getCore().byId("idSerailNoFPURESearch").getValue().toUpperCase();
			var DdlEstmtTypeFPURES = sap.ui.getCore().byId("idDdlEstmtTypeFPURES").getSelectedKey();//.toUpperCase();
			var DdlUnitPCodeFPURES = sap.ui.getCore().byId("idDdlUnitPCodeFPURES").getSelectedKey();
			
			//http://seanwgd1.gessap.local:8000/sap/opu/odata/sap/ZNW_SEACO_PORTAL_LOT5_SRV/Rep_Est_Edi?$filter=Depot eq 'MCH-CN-SHA-1450' and Estimatetype eq 'ORIGINAL' and MessageId eq '' and SerialNumber eq 'GCEU2032127' and UnitPartCode eq 'C'
			var urlToCall = serviceUrl15_old + "/Rep_Est_Edi?";
			if(msgIdFPURES != ''){
				urlToCall += "$filter=Depot eq '' and SerialNumber eq '' and Estimatetype eq '' and UnitPartCode eq '' and MessageId eq '"+ msgIdFPURES +"'";
			}else{
				urlToCall += "$filter=Depot eq '"+ ComboDepotFPURESearch.substr(0,15) +"' and SerialNumber eq '"+ SerailNoFPURESearch +"' and Estimatetype eq '"+ DdlEstmtTypeFPURES +"' and UnitPartCode eq '"+ DdlUnitPCodeFPURES +"' and MessageId eq ''";
			}
				
		    objUtilREstimate.doOnlineRequest(urlToCall,objcurntFPURESearch.onlinesuccessServerMessageEDI, objcurntFPURESearch.onlineerrorServerMessageEDI);
		}catch(e){
			busyDialog.close();
			sap.ui.commons.MessageBox.alert("Error on loading Estimate" + e);
		}
	},
	
	//VALIDATION FOR FEILDS
	ValidateDataBeforeSubmit: function(){
		var idComboDepotFPURESearch = sap.ui.getCore().byId("idComboDepotFPURESearch");
		var idSerailNoFPURESearch = sap.ui.getCore().byId("idSerailNoFPURESearch");
		var idDdlEstmtTypeFPURES = sap.ui.getCore().byId("idDdlEstmtTypeFPURES");
		
		var valid = true;
			
		if(idComboDepotFPURESearch.getSelectedKey() == ''){
			if(idComboDepotFPURESearch.getValue() != '')
				idComboDepotFPURESearch.setPlaceholder("Invalid Value");
			else
				idComboDepotFPURESearch.setPlaceholder("Required");
				
			idComboDepotFPURESearch.setValue('');
			idComboDepotFPURESearch.setValueState(sap.ui.core.ValueState.Error);
			valid = false;
		}
		
		if(idDdlEstmtTypeFPURES.getSelectedKey() == ''){
			if(idDdlEstmtTypeFPURES.getValue() != '')
				idDdlEstmtTypeFPURES.setPlaceholder("Invalid Depot");
			else
				idDdlEstmtTypeFPURES.setPlaceholder("Required");
				
			idDdlEstmtTypeFPURES.setValue('');
			idDdlEstmtTypeFPURES.setValueState(sap.ui.core.ValueState.Error);
			valid = false;
		}
		
		if(idSerailNoFPURESearch.getValue() == ''){
			idSerailNoFPURESearch.setValueState(sap.ui.core.ValueState.Error);
			idSerailNoFPURESearch.setPlaceholder("Required");
			valid = false;
		}else if(!objUtilREstimate.validateUnitNumber($.trim(idSerailNoFPURESearch.getValue()))){
			idSerailNoFPURESearch.setValue('');
			idSerailNoFPURESearch.setValueState(sap.ui.core.ValueState.Error);
			idSerailNoFPURESearch.setPlaceholder("Invalid Value");
			valid = false;
		}
		return valid;
	},
	
	validateOnResumit: function()
	{
		try{
			
			//RESET SAVED STATUS FOR STEP1 USED FOR MORE THEN 12 LINE ITEM
			for(var indx=0;indx < jsnResultAllDataFPRES.lineItemsDtl.length;indx++){
				jsnResultAllDataFPRES.lineItemsDtl[indx].lineSaved = false;
			}
			var tblmodel = sap.ui.getCore().byId("idTblResponseDataFPURES").getModel();
			var tbldata = tblmodel.getData();
			
			var arrMsgSelChkBx = tbldata.modelData.filter(function(el){
				return ((el["MsgStatus"] != "Successful") && (el["ChkBxSel"] == true));
			});
			
			if(arrMsgSelChkBx.length < 1){
				sap.ui.commons.MessageBox.alert("Please select atleast 1 process for resubmit and retry.");
				return;
			}
			/* Begin of adding by Seyed Ismail on 24.04.2015 MAC24042015+ */
			else if(arrMsgSelChkBx.length > 1){
				sap.ui.commons.MessageBox.alert("Please select only 1 process at a time");
				return;
			}
			/* End of adding by Seyed Ismail on 24.04.2015 MAC24042015+ */
			/* Begin of commenting by Seyed Ismail on 24.04.2015 MAC24042015+ */
			/*
			//VALIDATION FOR PORTAL TRANSACTION
			if(clickEvntFPURES == 'portaltransaction'){
				var arrMsgNotSuccess = tbldata.modelData.filter(function(el){
					return (el["MsgStatus"] != "Successful");
				});
			
				var notselStep = [];
				
				for(var i = arrMsgNotSuccess.length-1; i >= 0 ; i--) 
				{     
					if(arrMsgNotSuccess[i].ChkBxSel == true){
						for(var j= 0; j< i; j++){
							if(arrMsgNotSuccess[j].ChkBxSel == false){
								var tmpJsn = notselStep.filter(function(el){
									return (el["Stepid"] == arrMsgNotSuccess[j].Stepid);
								});
								
								if(tmpJsn.length < 1)
									notselStep.push({'Stepid': arrMsgNotSuccess[j].Stepid, 'Message': arrMsgNotSuccess[j].Message});
							}
						}
					}
				}
				var stepmissed = '';
				for(var i=0; i<notselStep.length;i++)
					stepmissed += notselStep[i].Stepid + ',';
				
				stepmissed = stepmissed.substr(0,stepmissed.length-1);
				if(stepmissed != ''){
					sap.ui.commons.MessageBox.alert("Please process the transaction in sequence.\nThere is atleast 1 previous step with status as error or not processed.\nProcess this step ("+ stepmissed +") successfully before re-submitting current step.");
					return;
				}
			} */
			/* End of commenting by Seyed Ismail on 24.04.2015 MAC24042015+ */
			for(var i=0;i<tbldata.modelData.length;i++){
				tbldata.modelData[i].RFCRequested = false;
				tbldata.modelData[i].RFCResult.length = 0;
			}
			tblmodel.setData(tbldata);
			tblmodel.updateBindings();
			
			//CHECK IF ESTIMATE ID BLANK THEN CALL SAVE ESTIMATE FIRST ELSE SELECTED STEP NEED TO BE CALL			
			if(jsnResultAllDataFPRES.headerDtl[0].EstimateNumber.trim() != ''){
				FixPartialRepairEstimateOnline.nextStepToCall(arrMsgSelChkBx[0].Stepid);
			}else{
				FixPartialRepairEstimateOnline.onlineProcessStepOne();
			}
		}catch(e){
			
		}
	},
	
	fnResetFixPartRepEstmt: function(){
		var depotEnabled =false;
		
		if(objLoginUser.getLoggedInUserType() == "SEACO"){
			depotEnabled = true;
		}
		
		var idComboDepotFPURESearch = sap.ui.getCore().byId("idComboDepotFPURESearch");
		var idSerailNoFPURESearch = sap.ui.getCore().byId("idSerailNoFPURESearch");
		var idDdlEstmtTypeFPURES = sap.ui.getCore().byId("idDdlEstmtTypeFPURES");
		var idDdlUnitPCodeFPURES = sap.ui.getCore().byId("idDdlUnitPCodeFPURES");
		
		if(sap.ui.getCore().byId("idBackFPURESearch") != undefined){
			sap.ui.getCore().byId("idBackFPURESearch").setVisible(false);
		}
		if(sap.ui.getCore().byId("idBtnRemoveFilterRESearch") != undefined)
			sap.ui.getCore().byId("idBtnRemoveFilterRESearch").setEnabled(false);

		if(idComboDepotFPURESearch != undefined){
			idComboDepotFPURESearch.setValueState(sap.ui.core.ValueState.None);
			idComboDepotFPURESearch.setPlaceholder("Select Depot");
			
			if(depotEnabled){
				idComboDepotFPURESearch.setValue('');
			}
		}
		
		if(idSerailNoFPURESearch != undefined){
			idSerailNoFPURESearch.setValue('');
			idSerailNoFPURESearch.setValueState(sap.ui.core.ValueState.None);
			idSerailNoFPURESearch.setPlaceholder("Serial Number");
		}
		
		if(idDdlEstmtTypeFPURES != undefined){
			idDdlEstmtTypeFPURES.setValue('');
			idDdlEstmtTypeFPURES.setValueState(sap.ui.core.ValueState.None);
			idDdlEstmtTypeFPURES.setPlaceholder("Select Estimate Type");
		}
		
		if(idDdlUnitPCodeFPURES != undefined){
			idDdlUnitPCodeFPURES.setSelectedKey("C");
			idDdlUnitPCodeFPURES.setValueState(sap.ui.core.ValueState.None);
			idDdlUnitPCodeFPURES.setPlaceholder("Select Unit Part Code");
		}
		
		if(sap.ui.getCore().byId("idFrmCntnrResltFPURES") != undefined)
			sap.ui.getCore().byId("idFrmCntnrResltFPURES").destroy();
	}
});
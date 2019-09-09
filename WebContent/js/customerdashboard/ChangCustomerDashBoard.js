var errorMsgCustDashBoard = [];
var oModelCCustDbrd;

sap.ui.model.json.JSONModel.extend("ChangCustomerDashBoard", {
    //CHANGE CUSTOMERE FOR SEACO USER
	changeCustomer: function(){
		var oChangeCustOvrLayDilog = sap.ui.getCore().byId("idChangeCustOvrLayDilogCCDB");
		if (oChangeCustOvrLayDilog != undefined) {
			oChangeCustOvrLayDilog.destroy();
		}
		
		var opnlChangeCustPopup = new sap.m.Panel("idPnlChangeCustPopupCCDB",{width: "100%"});
		//opnlChangeCustPopup.addContent(oChangCustDdb);
		
		var rflCCDB = sap.ui.commons.layout.ResponsiveFlowLayout;
		var rflLDCCDB = sap.ui.commons.layout.ResponsiveFlowLayoutData;
		var oRFLCCDB = new rflCCDB();
		
		var OidTxtVwSelCustCCDB = new sap.ui.commons.Label("idTxtVwSelCustCCDB",{
				text:"Select Customer ID: ",required:true
				}).addStyleClass("marginTop10");
				
		opnlChangeCustPopup.addContent(OidTxtVwSelCustCCDB);
		opnlChangeCustPopup.addContent(new sap.ui.commons.Label({width:"15px"}));
		
		var oChangCustDdb = new sap.ui.commons.ComboBox("idChangCustDdbCCDB", {
			width:"333px",
			placeholder:"Select Customer",
			 change: function(evnt){
					if(this.getValue() != '')
					{
						this.setValueState(sap.ui.core.ValueState.None);
						this.setPlaceholder("Select Customer");
					}
		          }
		}).addStyleClass("FormInputStyle marginTop10");
	
		 //oChangCustDdb.onfocusin =  function(e) {  
				//oChangCustDdb._fireLiveChange(this);
				//this.fireSuggest(this);
				//this.setValueState(sap.ui.core.ValueState.None);
				//this.setPlaceholder("Select Customer");                      
		   //}; 
		   
		/*oChangCustDdb.setFilterFunction(function(sValue, oItem){
				if(sValue == ''){
					return true;
				}else{
					return jQuery.sap.startsWithIgnoreCase(oItem.getText(), sValue) || jQuery.sap.startsWithIgnoreCase(oItem.getAdditionalText(), sValue);
				}
        });*/
		
		oChangCustDdb.setLayoutData(new rflLDCCDB({
			weight : 1
		}));
		opnlChangeCustPopup.addContent(oChangCustDdb);
		opnlChangeCustPopup.addContent(new sap.ui.commons.Label({width:"15px"}));
		//GET ONLINE CUSTOMER LIST
		this.getOnlineCutomerList();
		
		var oBtnChangCustCCDB = new sap.m.Button("idBtnChangCustCCDB", 
			{
				text:"Submit",
				width:"80px",
				styled:false, 
				press: function(oEvent){
						var oChangCustDdbCCDB = sap.ui.getCore().byId("idChangCustDdbCCDB");
						if($.trim(oChangCustDdbCCDB.getProperty('selectedKey')) == ''){
							oChangCustDdbCCDB.setValueState(sap.ui.core.ValueState.Error);
							if(oChangCustDdbCCDB.getValue() != ''){
								oChangCustDdbCCDB.setValue('');
								oChangCustDdbCCDB.setPlaceholder("Invalid Value");
							}else{
								oChangCustDdbCCDB.setPlaceholder("Required");
							}

						   return false;
						}
						oChangCustDdbCCDB.setValueState(sap.ui.core.ValueState.None);
						oChangCustDdbCCDB.setPlaceholder("Select Customer");
				
						var otxtSelCustCDB = sap.ui.getCore().byId("idtxtSelCustCDB");
						
						if(otxtSelCustCDB!= undefined){
							otxtSelCustCDB.setText(oChangCustDdbCCDB.getValue());
							selectedCustomer = oChangCustDdbCCDB.getValue();
						}
						
						var oChangeCustOvrLayDilog = sap.ui.getCore().byId("idChangeCustOvrLayDilogCCDB");
						if(oChangeCustOvrLayDilog.isOpen()){
							oChangeCustOvrLayDilog.close();
						}
						sap.ui.getCore().byId("idVbxMainCDB").setVisible(true);
						
						var ochngCust = new ChangCustomerDashBoard();
						custid = oChangCustDdbCCDB.getProperty('selectedKey');
						ochngCust.resetAllCustDashBoard();
				}
			}).addStyleClass("submitBtn");
		
		oBtnChangCustCCDB.setLayoutData(new rflLDCCDB({
			weight : 1
		}));
		opnlChangeCustPopup.addContent(oBtnChangCustCCDB);
		oRFLCCDB.addContent(opnlChangeCustPopup);
		
		var oChangeCustOvrLayDilog = new sap.ui.ux3.OverlayDialog("idChangeCustOvrLayDilogCCDB",{width:"610px",height:"76px"});
		oChangeCustOvrLayDilog.addContent(opnlChangeCustPopup);
		
		/*if(!oChangeCustOvrLayDilog.isOpen()){
			oChangeCustOvrLayDilog.open();
	   }*/
   },
    
	//RESET ALL DATA AND PAGE
	resetAllCustDashBoard: function(){
		busyDialog.open();
		//var objcustDb = new customerDashboard();
		//objcustDb.insertFeildOnRoleBase();
		sap.ui.getCore().byId('idbtnViewAllOnhireCDB').setVisible(false);
		sap.ui.getCore().byId('idbtnViewAllOffhireCDB').setVisible(false);
		sap.ui.getCore().byId("idBackOnhireGraph").setVisible(false);
		sap.ui.getCore().byId("idBackOffhireGraph").setVisible(false);
		
		sap.ui.getCore().byId('idVAllActRelCDB').setVisible(false);
		sap.ui.getCore().byId('idVAllActRetrnCDB').setVisible(false);

		//RESET ALL GLOBAL DATA
		errorMsgCustDashBoard.length = 0;
		errorMsgCustDashBoard.push({"task": "onhire","status":"end","error":"false","errorcode":"","msg":"","errorfunction":""});
		errorMsgCustDashBoard.push({"task": "offhire","status":"end","error":"false","errorcode":"","msg":"","errorfunction":""});
		errorMsgCustDashBoard.push({"task": "release","status":"end","error":"false","errorcode":"","msg":"","errorfunction":""});
		errorMsgCustDashBoard.push({"task": "return","status":"end","error":"false","errorcode":"","msg":"","errorfunction":""});
		
		//RESET ALL ONHIRE BIND DATA FOR CUSTOMER
		jsonGraphPopupOffHire.length = 0;
		jsonBindGraphOnHire.length = 0;
		jsonResultDataAllOnHire.length = 0;
		jsonHierarchyDataOnHire.length = 0;
		statGrpahOnHire = "unittypeonhire";
		categoryUnitOnhire = "";
		
		//RESET ALL OFFHIRE BIND DATA FOR CUSTOMER
		var strNoDataTbl = '<div class="sapUiTableCtrlEmpty custTblBgColor" tabindex="0"><span id="idspnNodataCDBRet"'
		strNoDataTbl += 'class="sapUiLbl custTblBgColor sapUiTableCtrlEmptyMsg">Loading...</span></div>'
		sap.ui.getCore().byId('idhtmlNoDataRelease').setContent(strNoDataTbl);
		
		strNoDataTbl = '<div class="sapUiTableCtrlEmpty custTblBgColor" tabindex="0"><span id="idspnTblCDNARet"'
		strNoDataTbl += 'class="sapUiLbl custTblBgColor sapUiTableCtrlEmptyMsg">Loading...</span></div>'
		sap.ui.getCore().byId('idhtmlNoDataRetnCDB').setContent(strNoDataTbl);
		
		sap.ui.getCore().byId('idonhireNodataCDB').setText('Loading...');
		sap.ui.getCore().byId('idoffhireNoDataCDB').setText('Loading...');
		jsonGraphPopupOnHire.length = 0;
		jsonBindGraphOffHire.length = 0;
		jsonResultDataAllOffHire.length = 0;
		jsonHierarchyDataOffHire.length = 0;
		statGrpahOffHire = "unittypeoffhire";
		categoryUnitOffhire = "";
		
		//RESET ALL RELEASE TABLE BIND DATA FOR CUSTOMER
		jsnRsltDataAllReleaseTbl.length = 0;
		jsnRelTopRecordData.length = 0;
		jsnCustDBoardReleaseTbl.length = 0;
		jsnCustDBReleasePickDtl.length = 0;
		jsnRelTopRecordDataVwAll.length = 0;
		
		//RESET ALL RETURN TABLE BIND DATA FOR CUSTOMER
		jsnRsltDataAllReturnsTbl.length = 0;
		jsnReturnTopRecordData.length = 0;
		jsnCustDBoardReturnsTbl.length = 0;
		jsnCustDBReturnsTotQtyDtl.length = 0;
		jsnReturnTopRecordDataVwAll.length = 0;
		
		//RESET ALL DATABINDS TO DEFAULT
		var jsdDefaultData = [];
		var omodelDefault = new sap.ui.model.json.JSONModel();
		omodelDefault.setData(jsdDefaultData);
		sap.ui.getCore().byId("idOnhireClmnChartCDB").setModel(omodelDefault);
		sap.ui.getCore().byId("idOffhireClmnChartCDB").setModel(omodelDefault);
		
		//sap.ui.getCore().byId("idTblReleaseCB").destroyRows();
		sap.ui.getCore().byId("idTblReleaseCB").setModel(omodelDefault)
		sap.ui.getCore().byId("idTblReleaseCB").bindRows("/");

		//sap.ui.getCore().byId("idTblReturnCDB").destroyRows();
		sap.ui.getCore().byId("idTblReturnCDB").setModel(omodelDefault)
		sap.ui.getCore().byId("idTblReturnCDB").bindRows("/");
		
		//ONLINE REQUEST FOR DATA
		var objChngCustDB = new ChangCustomerDashBoard();
		if(onhirevisible == true){
			objChngCustDB.getOnlineOnhireGraphData(custid); //UNCOMMENT FOR ONHIRE GRAPH VIEW
		}
		if(offhirevisible == true){
			objChngCustDB.getOnlineOffhireGraphData(custid);	//FOR OFFHIRE GRAPH VIEW
		}
		if(releasevisible == true){
			objChngCustDB.getOnlineReleaseTableData(custid); //release table online request
		}
		if(returnvisible == true){
			objChngCustDB.getOnlineReturnTableData(custid); //return table online request
		}
	},
	
	//GET ONLINE CUSTOMER LIST   
	getOnlineCutomerList: function(){
	   try{
			sap.ui.getCore().byId("idChangCustDdbCCDB").destroyItems();
		   busyDialog.open();
		   //http://seanwgd1.gessap.local:8000/sap/opu/odata/sap/ZNW_SEACO_PORTAL_FEB_SRV/Customer_Lease_Onhire?$filter=IPartner eq '92921'
		   var urlToCall = serviceUrl + "/F4_Customer_NameId_Appended";
		   var objUtil = new utility();
		   var objCurnt = new ChangCustomerDashBoard();
		   objUtil.doOnlineRequest(urlToCall,objCurnt.getOnlineCutomerListSuccess, objCurnt.getOnlineCutomerListDataError);
	   }catch(e){
		   busyDialog.close();
			sap.ui.commons.MessageBox.alert("Error on getting customer Data: " + e);
	   }
   },
       
    //ON SUCCESS FOR CUSTOMER LIST
	getOnlineCutomerListSuccess: function(resultdata, response){
	   busyDialog.close();
	   var oChangeCustOvrLayDilog = sap.ui.getCore().byId("idChangeCustOvrLayDilogCCDB");
		if(!oChangeCustOvrLayDilog.isOpen()){
			oChangeCustOvrLayDilog.open();
		}

	   //jQuery.sap.require("sap.ui.model.json.JSONModel");
	   var oChangCustDdbCCDB = sap.ui.getCore().byId("idChangCustDdbCCDB");
	   try{
				oChangCustDdbCCDB.insertItem((new sap.ui.core.ListItem({text:"Select Customer", key:"0"})),0);
				oChangCustDdbCCDB.setSelectedKey("0");
				if(resultdata != undefined){
					if(resultdata.results.length > 0){
						oModelCCustDbrd = new sap.ui.model.json.JSONModel(resultdata.results);
						for(var j =0; j<resultdata.results.length;j++){
							oChangCustDdbCCDB.addItem(new sap.ui.core.ListItem({text:resultdata.results[j].CustName, 
														key: resultdata.results[j].Partner, additionalText: resultdata.results[j].Partner}));
						}
					}
				}
	   }catch(e){
		   busyDialog.close();
			sap.ui.commons.MessageBox.alert("Error on getting customer list: " + e);
	   }
   },
    
	//ON ERROR FOR CUSTOMER LIST
    getOnlineCutomerListDataError: function(e){
	   var oChangCustDdbCCDB = sap.ui.getCore().byId("idChangCustDdbCCDB");
	   oChangCustDdbCCDB.insertItem((new sap.ui.core.ListItem({text:"Select Customer", key:"0"})),0);
	   oChangCustDdbCCDB.setSelectedKey("0"); 
	   busyDialog.close();
	   var oChangeCustOvrLayDilog = sap.ui.getCore().byId("idChangeCustOvrLayDilogCCDB");
		if(!oChangeCustOvrLayDilog.isOpen()){
			oChangeCustOvrLayDilog.open();
		}
		
	   errorfromServer(e);
	   //sap.ui.commons.MessageBox.alert("Error on getting customer list");
   },
	   
    //GET ONLINE COLUMN CHART FOR ONHIRE
	getOnlineOnhireGraphData: function(custId){
	   try{
			errorMsgCustDashBoard[0]["status"] = "start";
			//JsnToExport[index][displayClmnFildArr[i]]
			//busyDialog.open();
			var urlToCall = serviceUrl + "/Customer_Lease_Onhire?$filter=IPartner eq '"+ $.trim(custId) +"'";
			var objUtil = new utility();
			var objCurnt = new ChangCustomerDashBoard();
			objUtil.doOnlineRequest(urlToCall,objCurnt.getOnlineOnhireGraphDataSuccess, objCurnt.getOnlineOnhireGraphDataError);
	   }catch(e){
			errorMsgCustDashBoard[0]["status"] = "end";
			errorMsgCustDashBoard[0]["error"] = "true";
			errorMsgCustDashBoard[0]["msg"] = e;
			errorMsgCustDashBoard[0]["errorcode"] ="0";
			errorMsgCustDashBoard[0]["errorfunction"] = "getOnlineOnhireGraphData";
			
			var objChngCust = new ChangCustomerDashBoard();
			objChngCust.checkAllLoadComplete();
	   }
   },
    
	//ON SUCCESS FOR COLUMN CHART ONHIRE
    getOnlineOnhireGraphDataSuccess: function(resultdata, response){
		errorMsgCustDashBoard[0]["status"] = "end";
		sap.ui.getCore().byId('idonhireNodataCDB').setText('No units found to be on-hire for the seleted lease,\n Please contact your local customer services for details.');
		var objChngCust = new ChangCustomerDashBoard();
		objChngCust.checkAllLoadComplete()			
		
		try{
			var objCDB = new customerDashboard();
		   if(resultdata != undefined){
					if(resultdata.results.length > 0){
						objCDB.setOnhireGlobalData(resultdata.results);
					}
			}
		}catch(e){
			errorMsgCustDashBoard[0]["status"] = "end";
			errorMsgCustDashBoard[0]["error"] = "true";
			errorMsgCustDashBoard[0]["msg"] = e;
			errorMsgCustDashBoard[0]["errorcode"] ="0";
			errorMsgCustDashBoard[0]["errorfunction"] = "getOnlineOnhireGraphDataSuccess";
			var objChngCust = new ChangCustomerDashBoard();
			objChngCust.checkAllLoadComplete();
		}
   },
    
	//ON ERROR FOR COLUMN CHART ON HIRE
    getOnlineOnhireGraphDataError: function(e){
		sap.ui.getCore().byId('idonhireNodataCDB').setText('No units found to be on-hire for the seleted lease,\n Please contact your local customer services for details.');
		errorMsgCustDashBoard[0]["status"] = "end";
		errorMsgCustDashBoard[0]["error"] = "true";
		errorMsgCustDashBoard[0]["msg"] = e.response.statusText;
		errorMsgCustDashBoard[0]["errorcode"] =e.response.statusCode;
		errorMsgCustDashBoard[0]["errorfunction"] = "getOnlineOnhireGraphDataError";
		var objChngCust = new ChangCustomerDashBoard();
		objChngCust.checkAllLoadComplete();
   },
   
   //FUNCTION USED FOR OFFHIRE
   
   //GET OFFLINE COLUMN CHART FOR OFFHIRE
	getOnlineOffhireGraphData: function(custId){
	   try{
			errorMsgCustDashBoard[1]["status"] = "start";
			//busyDialog.open();
			//http://seanwgd1.gessap.local:8000/sap/opu/odata/sap/ZNW_SEACO_PORTAL_FEB_SRV/Customer_Lease_Onhire?$filter=IPartner eq '92921'
			var urlToCall = serviceUrl + "/Customer_Lease_Offhire?$filter=IPartner eq '"+ $.trim(custId) +"'";
			var objUtil = new utility();
			var objCurnt = new ChangCustomerDashBoard();
			objUtil.doOnlineRequest(urlToCall,objCurnt.getOnlineOffhireGraphDataSuccess, objCurnt.getOnlineOffhireGraphDataError);
	   }catch(e){
	   		errorMsgCustDashBoard[1]["status"] = "end";
			errorMsgCustDashBoard[1]["error"] = "true";
			errorMsgCustDashBoard[1]["msg"] = e;
			errorMsgCustDashBoard[1]["errorcode"] ="1";
			errorMsgCustDashBoard[1]["errorfunction"] = "getOnlineOffhireGraphData";

			var objChngCust = new ChangCustomerDashBoard();
			objChngCust.checkAllLoadComplete();
	   }
   },
    
	//ON SUCCESS FOR COLUMN CHART OFFHIRE
    getOnlineOffhireGraphDataSuccess: function(resultdata, response){
		errorMsgCustDashBoard[1]["status"] = "end";
		sap.ui.getCore().byId('idoffhireNoDataCDB').setText('No units found to be off-hire for the seleted lease,\n Please contact your local customer services for details.');
		var objChngCust = new ChangCustomerDashBoard();
		objChngCust.checkAllLoadComplete();
			
	   try{
			var objCDB = new customerDashboard();
		   if(resultdata != undefined){
					if(resultdata.results.length > 0){
						objCDB.setOffhireGlobalData(resultdata.results);
					}
			}
	   }catch(e){
			errorMsgCustDashBoard[1]["status"] = "end";
			errorMsgCustDashBoard[1]["error"] = "true";
			errorMsgCustDashBoard[1]["msg"] = e;
			errorMsgCustDashBoard[1]["errorcode"] ="1";
			errorMsgCustDashBoard[1]["errorfunction"] = "getOnlineOffhireGraphDataSuccess";
			var objChngCust = new ChangCustomerDashBoard();
			objChngCust.checkAllLoadComplete()
	   }
   },
    
	//ON ERROR FOR COLUMN CHART OFF HIRE
    getOnlineOffhireGraphDataError: function(e){
		sap.ui.getCore().byId('idoffhireNoDataCDB').setText('No units found to be off-hire for the seleted lease,\n Please contact your local customer services for details.');
		errorMsgCustDashBoard[1]["status"] = "end";
		errorMsgCustDashBoard[1]["status"] = "end";
		errorMsgCustDashBoard[1]["error"] = "true";
		errorMsgCustDashBoard[1]["msg"] = e.response.statusText;
		errorMsgCustDashBoard[1]["errorcode"] = e.response.statusText;
		errorMsgCustDashBoard[1]["errorfunction"] = "getOnlineOffhireGraphDataError";
		var objChngCust = new ChangCustomerDashBoard();
		objChngCust.checkAllLoadComplete();
   },

	//FUNCTION FOR RELEASE TABLE
	getOnlineReleaseTableData: function(custId){
		try{
			errorMsgCustDashBoard[2]["status"] = "start";
			//busyDialog.open();
			//http://seanwgd1.gessap.local:8000/sap/opu/odata/sap/ZNW_SEACO_PORTAL_FEB_SRV/Active_Releases?$filter=Customer eq '100001'
			var urlToCall = serviceUrl + "/Active_Releases?$filter=Customer eq '"+ $.trim(custId) +"'";
			var objUtil = new utility();
			var objCurnt = new ChangCustomerDashBoard();
			objUtil.doOnlineRequest(urlToCall,objCurnt.getOnlineReleaseTableDataSuccess, objCurnt.getOnlineReleaseTableDataError);
	   }catch(e){
			errorMsgCustDashBoard[2]["status"] = "end";
			errorMsgCustDashBoard[2]["error"] = "true";
			errorMsgCustDashBoard[2]["msg"] = e;
			errorMsgCustDashBoard[2]["errorcode"] = "2";
			errorMsgCustDashBoard[2]["errorfunction"] = "getOnlineReleaseTableData";
			var objChngCust = new ChangCustomerDashBoard();
			objChngCust.checkAllLoadComplete();
	   }
	},
	
	//ON SUCCESS FOR RELEASE TABLE
	getOnlineReleaseTableDataSuccess: function(resultdata, response){
		errorMsgCustDashBoard[2]["status"] = "end";
		
		var strNoDataTbl = '<div class="sapUiTableCtrlEmpty custTblBgColor" tabindex="0"><span id="idspnNodataCDBRet"'
		strNoDataTbl += 'class="sapUiLbl custTblBgColor sapUiTableCtrlEmptyMsg">No Active Releases found,<br> Please contact your local customer services for details.</span></div>'
		sap.ui.getCore().byId('idhtmlNoDataRelease').setContent(strNoDataTbl);
		
		var objChngCust = new ChangCustomerDashBoard();
		objChngCust.checkAllLoadComplete();
		
	   try{
			var objCustDBMyActRelDtl = new CustomerDashBoardRelease();
		   if(resultdata != undefined){
					if(resultdata.results.length > 0){
						objCustDBMyActRelDtl.setReleaseTableGlobalData(resultdata.results);
					}
			}
	   }catch(e){
			errorMsgCustDashBoard[2]["status"] = "end";
			errorMsgCustDashBoard[2]["error"] = "true";
			errorMsgCustDashBoard[2]["msg"] = e;
			errorMsgCustDashBoard[2]["errorcode"] = "2";
			errorMsgCustDashBoard[2]["errorfunction"] = "getOnlineReleaseTableDataSuccess";
			
			var objChngCust = new ChangCustomerDashBoard();
			objChngCust.checkAllLoadComplete();
	   }
   },
    
	//ON ERROR FOR RELEASE TABLE
    getOnlineReleaseTableDataError: function(e){
		var strNoDataTbl = '<div class="sapUiTableCtrlEmpty custTblBgColor" tabindex="0"><span id="idspnNodataCDBRet"'
		strNoDataTbl += 'class="sapUiLbl custTblBgColor sapUiTableCtrlEmptyMsg">No Active Releases found,<br> Please contact your local customer services for details.</span></div>'
		sap.ui.getCore().byId('idhtmlNoDataRelease').setContent(strNoDataTbl);
		
		errorMsgCustDashBoard[2]["status"] = "end";
		errorMsgCustDashBoard[2]["error"] = "true";
		errorMsgCustDashBoard[2]["msg"] = e.response.statusText;
		errorMsgCustDashBoard[2]["errorcode"] = e.response.statusCode;
		errorMsgCustDashBoard[2]["errorfunction"] = "getOnlineReleaseTableDataError";
		var objChngCust = new ChangCustomerDashBoard();
		objChngCust.checkAllLoadComplete();
   },

   
   //FUNCTION FOR RETURN TABLE
	getOnlineReturnTableData: function(custId){
		try{
			errorMsgCustDashBoard[3]["status"] = "start";
			
		   //busyDialog.open();
		   //http://seanwgd1.gessap.local:8000/sap/opu/odata/sap/ZNW_SEACO_PORTAL_FEB_SRV/Active_Releases?$filter=Customer eq '100001'
		   var urlToCall = serviceUrl + "/Cust_Ret_Authorization?$filter=Customer eq '"+ $.trim(custId) +"'";
		   var objUtil = new utility();
		   var objCurnt = new ChangCustomerDashBoard();
		   objUtil.doOnlineRequest(urlToCall,objCurnt.getOnlineReturnTableDataSuccess, objCurnt.getOnlineReturnTableDataError);
	   }catch(e){
			errorMsgCustDashBoard[3]["status"] = "end";
			errorMsgCustDashBoard[3]["error"] = "true";
			errorMsgCustDashBoard[3]["msg"] = e;
			errorMsgCustDashBoard[3]["errorcode"] = "3";
			errorMsgCustDashBoard[3]["errorfunction"] = "getOnlineReturnTableData";
			var objChngCust = new ChangCustomerDashBoard();
			objChngCust.checkAllLoadComplete()
	   }
	},
	
	//ON SUCCESS FOR RETURN TABLE
	getOnlineReturnTableDataSuccess: function(resultdata, response){
		errorMsgCustDashBoard[3]["status"] = "end";
		var strNoDataTbl = '<div class="sapUiTableCtrlEmpty custTblBgColor" tabindex="0"><span id="idspnTblCDNARet"'
			strNoDataTbl += 'class="sapUiLbl custTblBgColor sapUiTableCtrlEmptyMsg">No Active Returns found,<br> Please contact your local customer services for details</span></div>'
			sap.ui.getCore().byId('idhtmlNoDataRetnCDB').setContent(strNoDataTbl);
			
		var objChngCust = new ChangCustomerDashBoard();
		objChngCust.checkAllLoadComplete()
		
	   try{
			var objCDBReturn = new CustomerDashBoardReturn();
		   if(resultdata != undefined){
					if(resultdata.results.length > 0){
						objCDBReturn.setReturnsTableGlobalData(resultdata.results);
					}
			}
	   }catch(e){
			errorMsgCustDashBoard[3]["status"] = "end";
			errorMsgCustDashBoard[3]["error"] = "true";
			errorMsgCustDashBoard[3]["msg"] = e;
			errorMsgCustDashBoard[3]["errorcode"] = "3";
			errorMsgCustDashBoard[3]["errorfunction"] = "getOnlineReturnTableDataSuccess";
		
		   var objChngCust = new ChangCustomerDashBoard();
			objChngCust.checkAllLoadComplete()
	   }
   },
    
	//ON ERROR FOR RETURN TABLE
    getOnlineReturnTableDataError: function(e){
		errorMsgCustDashBoard[3]["status"] = "end";
		errorMsgCustDashBoard[3]["error"] = "true";
		errorMsgCustDashBoard[3]["msg"] = e.response.statusText;
		errorMsgCustDashBoard[3]["errorcode"] = e.response.statusCode;
		errorMsgCustDashBoard[3]["errorfunction"] = "getOnlineReturnTableDataError";

		var strNoDataTbl = '<div class="sapUiTableCtrlEmpty custTblBgColor" tabindex="0"><span id="idspnTblCDNARet"'
			strNoDataTbl += 'class="sapUiLbl custTblBgColor sapUiTableCtrlEmptyMsg">No Active Returns found,<br> Please contact your local customer services for details</span></div>'
			sap.ui.getCore().byId('idhtmlNoDataRetnCDB').setContent(strNoDataTbl);
			
		var objChngCust = new ChangCustomerDashBoard();
		objChngCust.checkAllLoadComplete()
   },
	
	checkAllLoadComplete: function(){
		if((errorMsgCustDashBoard[0]["status"] == "end") && (errorMsgCustDashBoard[1]["status"] == "end") && 
			(errorMsgCustDashBoard[2]["status"] == "end") && (errorMsgCustDashBoard[3]["status"] == "end"))
			{	
				busyDialog.close();
				var msgToDisplay = "The following information could not be retreived:", errortrue = "false";
				
				if(errorMsgCustDashBoard[0]["error"] == "true"){
					errortrue = "true";
					msgToDisplay += "\n" + "My Units On-Hire ";
				}
				if(errorMsgCustDashBoard[1]["error"] == "true"){
					errortrue = "true";
					msgToDisplay += "\n" + "My Units Off-Hire ";
				}
				if(errorMsgCustDashBoard[2]["error"] == "true"){
					errortrue = "true";
					msgToDisplay += "\n" + "My Active Releases " ;
				}
				if(errorMsgCustDashBoard[3]["error"] == "true"){
					errortrue = "true";
					msgToDisplay += "\n" + "My Active Returns ";
				}
				msgToDisplay += "\n at this time. Please try again later.";
				if(errortrue == "true"){
					sap.ui.commons.MessageBox.alert(msgToDisplay);
				}else{
					//sap.ui.commons.MessageBox.alert("Success");
				}
			}
	}
});
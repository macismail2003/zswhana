var srnoFPURE = '', transidFPURE = '';
jQuery.sap.declare("FixPartialRepairEstimateOnline");

FixPartialRepairEstimateOnline = {
		//FETCH DEPOT DETAIL FOR DROP DOWN
		onlinesuccessfunDepotCode: function(resultdata, response){
			/*if(msgIdFPURES != ''){
					clickEvntFPURES = 'edimessage';
					objcurntFPURESearch.OnlineServerMessageEDI();
			}else*/
				busyDialog.close();    
				
			jQuery.sap.require("sap.ui.model.json.JSONModel");
			var oDepotCode = sap.ui.getCore().byId("idComboDepotFPURESearch");
			//oDepotCode.addItem(new sap.ui.core.ListItem({text:"", key: ""}));
			if(resultdata != undefined){
				if(resultdata.results.length > 0){
					for(var indx in resultdata.results){
						oDepotCode.addItem(new sap.ui.core.ListItem({text:resultdata.results[indx].FunctionalLoc, key: resultdata.results[indx].Depot}));
					}
				}
				
				if((msgIdFPURES != '') && (jsnResultAllDataFPRES.headerDtl.length > 0)){
					var depotcode = jsnResultAllDataFPRES.headerDtl[0].FunctionalLocation.substr(11);
									
					var oComboDepotItemsFPURE = sap.ui.getCore().byId("idComboDepotFPURESearch").getItems();
					for(var indxitm in oComboDepotItemsFPURE){
						if(oComboDepotItemsFPURE[indxitm].getKey() == depotcode){
							sap.ui.getCore().byId("idComboDepotFPURESearch").setValue(oComboDepotItemsFPURE[indxitm].getText());
							sap.ui.getCore().byId("idComboDepotFPURESearch").setSelectedKey(oComboDepotItemsFPURE[indxitm].getKey());
						}
					}
				}
				
				if(objLoginUser.getLoggedInUserType() != "SEACO"){
					oDepotCode.setSelectedKey(objLoginUser.getLoggedInUserID()); 
				}
			}
		},
		
		onlineerrorfunDepotCode: function(e){
			busyDialog.close();
			var oDepotCode = sap.ui.getCore().byId("idComboDepotFPURESearch");
			oDepotCode.addItem(new sap.ui.core.ListItem({text:"", key: ""}));
			errorfromServer(e);
		},
		
		getOnlinefunDepotCode: function(unitNumber, DnNumber){
			try{
				//var loginusename = objLoginUser.getLoggedInUserName();
				sap.ui.getCore().byId("idComboDepotFPURESearch").destroyItems();
				busyDialog.open();
				var urlToCall = serviceUrl15_old + "/F4_Functional_Location";
			    objUtilREstimate.doOnlineRequest(urlToCall,this.onlinesuccessfunDepotCode, this.onlineerrorfunDepotCode);
			}catch(e){
				busyDialog.close();
				sap.ui.commons.MessageBox.alert("Error on fetching Depot Code" + e);
			}
		},
		
		//STEP 1
		onlinesuccessStepOne: function(resultdata, response){
			try{
				var callPortalTrans = true;
				if(resultdata != undefined){
					if(resultdata.results.length > 0){
						if((resultdata.results[0].LvEstimateId != '') && (resultdata.results[0].LvEstimateId != '0000000000')){
							callPortalTrans = false;
							var genEstmtIdFpure = resultdata.results[0].LvEstimateId;
							
							//UPDATE ESTIMATE ID IN GLOBAL TABLE
							for(var indx=0;indx < jsnResultAllDataFPRES.All.length;indx++){
								jsnResultAllDataFPRES.All[indx].EstimateId = genEstmtIdFpure;
								jsnResultAllDataFPRES.All[indx].TranxId = resultdata.results[0].Tranx;
							}
							for(var indx=0;indx < jsnResultAllDataFPRES.headerDtl.length;indx++){
								jsnResultAllDataFPRES.headerDtl[indx].EstimateNumber = genEstmtIdFpure;
								jsnResultAllDataFPRES.headerDtl[indx].TranxId = resultdata.results[0].Tranx;
							}
							FixPartialRepairEstimateOnline.getNextStepNeedToProcess('001',resultdata);
						}
					}
				}
				if(callPortalTrans){
					busyDialog.close();
					//objcurntFPURESearch.clickedPortalTrans(transidFPURE);
					sap.ui.commons.MessageBox.alert("Error while saving estimate." );
				}
			}catch(e){
				busyDialog.close();
				//objcurntFPURESearch.clickedPortalTrans(transidFPURE);
				sap.ui.commons.MessageBox.alert("Error while saving estimate: " + e);
			}
		},
		
		onlineerrorStepOne: function(err){
			errorfromServer(err);
		},
		
		onlineProcessStepOne: function(){
			try{
				busyDialog.open();
				var hdrData =  FixPartialRepairEstimateOnline.getInputDataHdrLineitem();
				if(hdrData.header.length < 1){
					busyDialog.close();
					return;
				}
				
				//http://seanwgd1.gessap.local:8000/sap/opu/odata/sap/ZNW_SEACO_PORTAL_LOT5_SRV/Repair_Estim_FPU?$filter=MessageId eq 'X201402180428080001'
				var urlToCall = serviceUrl15_old + "/Repair_Estim_FPU?$filter=";
				urlToCall += "MessageId eq '" + hdrData.header[0].MessageId + "'";
			    objUtilREstimate.doOnlineRequest(urlToCall,this.onlinesuccessStepOne, this.onlineerrorStepOne);
			}catch(e){
				busyDialog.close();
				sap.ui.commons.MessageBox.alert("Error on processing Save Estimate: " + e);
			}
		},
		
		//STEP 2
		onlinesuccessStepTwo: function(resultdata, response){
			try{
				var callPortalTrans = true;
				if(resultdata != undefined){
					if(resultdata.results.length > 0){
						callPortalTrans = false;
						FixPartialRepairEstimateOnline.getNextStepNeedToProcess('002',resultdata);
					}
				}
				if(callPortalTrans){
					objcurntFPURESearch.clickedPortalTrans(transidFPURE);
				}
			}catch(e){
				//busyDialog.close();
				objcurntFPURESearch.clickedPortalTrans(transidFPURE);
			}
		},
		onlineerrorStepTwo: function(err){
			//errorfromServer(err);
			objcurntFPURESearch.clickedPortalTrans(transidFPURE);
		},
		onlineProcessStepTwo: function(){
			try{
				busyDialog.open();
				//sap/opu/odata/sap/ZNW_SEACO_PORTAL_LOT5_SRV/Estim_Hrns_Valid_Ecc?$filter=Workcreateddt eq datetime'2014-03-25T00:00:00' and Workcenter eq '00001547' and Unitpartcode eq 'C' and Tranx eq '000000000000' and SubassetNo eq '0000' and SerialNumber eq 'GESU2150489' and Senderaddress eq 'SGSINEKGA' and Salesgrade eq '3' and RepairDescMsgName eq '' and PlannerGroup eq 'EA' and Para4 eq '' and Para3 eq '0000000000' and Para2 eq datetime'9999-09-09T00:00:00' and Para1 eq '' and MultiPartCont eq 'N' and MoveinDt eq datetime'9999-09-09T00:00:00' and MaterialType eq 'BX2' and FunctionalLoc eq 'SEA-SG-SIN-1547' and EstimateTypeestimateType eq 'ORIGINAL' and Estimatenumber eq '0000000034' and EquipmentNo eq 'GESU2150489' and Currencycode eq 'SGD' and ContStComplete eq '' and CompanyCode eq '2916' and AssetNo eq 'GESU2150489'
				var urlToCall = serviceUrl15_old + "/Estim_Hrns_Valid_Ecc?$filter=";
				var retVal = FixPartialRepairEstimateOnline.setUrlStepPara(urlToCall, 'EstimateTypeestimateType');
				if(!retVal)
					return;
				else
					urlToCall = retVal;
			    
				objUtilREstimate.doOnlineRequest(urlToCall,FixPartialRepairEstimateOnline.onlinesuccessStepTwo, FixPartialRepairEstimateOnline.onlineerrorStepTwo);
			}catch(e){
				//busyDialog.close();
				//sap.ui.commons.MessageBox.alert("Error on processing step Two: " + e);
				objcurntFPURESearch.clickedPortalTrans(transidFPURE);
			}
		},
		
		//STEP 3
		onlinesuccessStepThree: function(resultdata, response){
			try{
				var callPortalTrans = true;
				if(resultdata != undefined){
					if(resultdata.results.length > 0){
						callPortalTrans = false;
						FixPartialRepairEstimateOnline.getNextStepNeedToProcess('003',resultdata);
					}
				}
				if(callPortalTrans){
					objcurntFPURESearch.clickedPortalTrans(transidFPURE);
				}
			}catch(e){
				//busyDialog.close();
				objcurntFPURESearch.clickedPortalTrans(transidFPURE);
			}
		},
		onlineerrorStepThree: function(err){
			//errorfromServer(err);
			objcurntFPURESearch.clickedPortalTrans(transidFPURE);
		},
		onlineProcessStepThree: function(){
			try{
				busyDialog.open();
				//sap/opu/odata/sap/ZNW_SEACO_PORTAL_LOT5_SRV/Estim_Hrns_Valid_Crm?$filter=Workcreateddt eq datetime'2014-03-25T00:00:00' and Workcenter eq '00000000' and Unitpartcode eq 'C' and Tranx eq '000000000000' and SubassetNo eq '0000' and SerialNumber eq 'GESU2150489' and Senderaddress eq 'SGSINEKGA' and Salesgrade eq '3' and RepairDescMsgName eq '' and PlannerGroup eq 'EA' and Para4 eq '' and Para3 eq '0000000000' and Para2 eq datetime'9999-09-09T00:00:00' and Para1 eq '' and MultiPartCont eq 'N' and MoveinDt eq datetime'9999-09-09T00:00:00' and MaterialType eq 'BX2' and FunctionalLoc eq 'SEA-SG-SIN-1547' and EstimateType eq ' ORIGINAL' and Estimatenumber eq '0000000034' and EquipmentNo eq 'GESU2150489' and Currencycode eq 'SGD' and ContStComplete eq '' and CompanyCode eq '2916' and AssetNo eq 'GESU2150489'
				var urlToCall = serviceUrl15_old + "/Estim_Hrns_Valid_Crm?$filter=";
				var retVal = FixPartialRepairEstimateOnline.setUrlStepPara(urlToCall, 'EstimateType');
				if(!retVal)
					return;
				else
					urlToCall = retVal;		    
				objUtilREstimate.doOnlineRequest(urlToCall,FixPartialRepairEstimateOnline.onlinesuccessStepThree, FixPartialRepairEstimateOnline.onlineerrorStepThree);
			}catch(e){
				//busyDialog.close();
				//sap.ui.commons.MessageBox.alert("Error on processing step Three: " + e);
				objcurntFPURESearch.clickedPortalTrans(transidFPURE);
			}
		},
		
		//STEP 4
		onlinesuccessStepFour: function(resultdata, response){
			try{
				var callPortalTrans = true;
				if(resultdata != undefined){
					if(resultdata.results.length > 0){
						callPortalTrans = false;
						FixPartialRepairEstimateOnline.getNextStepNeedToProcess('004',resultdata);
					}
				}
				if(callPortalTrans){
					objcurntFPURESearch.clickedPortalTrans(transidFPURE);
				}
			}catch(e){
				//busyDialog.close();
				objcurntFPURESearch.clickedPortalTrans(transidFPURE);
			}
		},
		onlineerrorStepFour: function(err){
			//errorfromServer(err);
			objcurntFPURESearch.clickedPortalTrans(transidFPURE);
		},
		onlineProcessStepFour: function(){
			try{
				busyDialog.open();
				//sap/opu/odata/sap/ZNW_SEACO_PORTAL_LOT5_SRV/Estim_Hrns_Str_Ecc?$filter=Workcreateddt eq datetime'2014-04-11T00:00:00' and Workcenter eq '00000000' and Unitpartcode eq 'C' and Tranx eq '000000000000' and SubassetNo eq '0000' and SerialNumber eq 'GESU2420394' and Senderaddress eq '' and Salesgrade eq '3' and RepairDescMsgName eq '' and PlannerGroup eq 'AP' and Para4 eq '' and Para3 eq '0000000000' and Para2 eq datetime'2014-04-30T00:00:00' and Para1 eq '' and MultiPartCont eq '' and MoveinDt eq datetime'2014-04-11T00:00:00' and MaterialType eq 'BX2' and FunctionalLoc eq 'SEA-SG-SIN-1547' and EstimateTypeestimateType eq 'ORIGINAL' and Estimatenumber eq '0000000034' and EquipmentNo eq 'GESU2420394' and Currencycode eq 'USD' and ContStComplete eq '' and CompanyCode eq '' and AssetNo eq 'GESU2420394'
				var urlToCall = serviceUrl15_old + "/Estim_Hrns_Str_Ecc?$filter=";
				var retVal = FixPartialRepairEstimateOnline.setUrlStepPara(urlToCall, 'EstimateTypeestimateType');
				if(!retVal)
					return;
				else
					urlToCall = retVal;
					
				objUtilREstimate.doOnlineRequest(urlToCall,FixPartialRepairEstimateOnline.onlinesuccessStepFour, FixPartialRepairEstimateOnline.onlineerrorStepFour);
			}catch(e){
				//busyDialog.close();
				//sap.ui.commons.MessageBox.alert("Error on processing step Four: " + e);
				objcurntFPURESearch.clickedPortalTrans(transidFPURE);
			}
		},
		
		//STEP 5
		onlinesuccessStepFive: function(resultdata, response){
			try{
				var callPortalTrans = true;
				if(resultdata != undefined){
					if(resultdata.results.length > 0){
						callPortalTrans = false;
						FixPartialRepairEstimateOnline.getNextStepNeedToProcess('005',resultdata);
					}
				}
				if(callPortalTrans){
					objcurntFPURESearch.clickedPortalTrans(transidFPURE);
				}
			}catch(e){
				//busyDialog.close();
				objcurntFPURESearch.clickedPortalTrans(transidFPURE);
			}
		},
		onlineerrorStepFive: function(err){
			//errorfromServer(err);
			objcurntFPURESearch.clickedPortalTrans(transidFPURE);
		},
		onlineProcessStepFive: function(){
			try{
				busyDialog.open();
				//sap/opu/odata/sap/ZNW_SEACO_PORTAL_LOT5_SRV/Estim_Hrns_Strg_Ecc?$filter=Workcreateddt eq datetime'2014-04-30T00:00:00' and Workcenter eq '00000000' and Unitpartcode eq '' and Tranx eq '000000000000' and SubassetNo eq '' and SerialNumber eq 'GESU2058351' and Senderaddress eq '' and Salesgrade eq '' and RepairDescMsgName eq '' and PlannerGroup eq '' and Para4 eq '' and Para3 eq '0000000000' and Para2 eq datetime'2014-04-30T00:00:00' and Para1 eq '' and MultiPartCont eq '' and MoveinDt eq datetime'2014-04-30T00:00:00' and MaterialType eq '' and FunctionalLoc eq 'SEA-SG-SIN-1547' and EstimateTypeestimateType eq 'ORIGINAL' and Estimatenumber eq '' and EquipmentNo eq 'GESU2058351' and Currencycode eq '' and ContStComplete eq '' and CompanyCode eq '' and AssetNo eq ''
				var urlToCall = serviceUrl15_old + "/Estim_Hrns_Strg_Ecc?$filter=";
				var retVal = FixPartialRepairEstimateOnline.setUrlStepPara(urlToCall, 'EstimateTypeestimateType');
				if(!retVal)
					return;
				else
					urlToCall = retVal;
					
				objUtilREstimate.doOnlineRequest(urlToCall,FixPartialRepairEstimateOnline.onlinesuccessStepFive, FixPartialRepairEstimateOnline.onlineerrorStepFive);
			}catch(e){
				//busyDialog.close();
				//sap.ui.commons.MessageBox.alert("Error on processing step Five: " + e);
				objcurntFPURESearch.clickedPortalTrans(transidFPURE);
			}
		},
		
		//STEP 6
		onlinesuccessStepSix: function(resultdata, response){
			try{
				var callPortalTrans = true;
				if(resultdata != undefined){
					if(resultdata.results.length > 0){
						callPortalTrans = false;
						FixPartialRepairEstimateOnline.getNextStepNeedToProcess('006',resultdata);
					}
				}
				if(callPortalTrans){
					objcurntFPURESearch.clickedPortalTrans(transidFPURE);
				}
				
			}catch(e){
				//busyDialog.close();
				objcurntFPURESearch.clickedPortalTrans(transidFPURE);
			}
		},
		onlineerrorStepSix: function(err){
			//errorfromServer(err);
			objcurntFPURESearch.clickedPortalTrans(transidFPURE);
		},
		onlineProcessStepSix: function(){
			try{
				busyDialog.open();
				//sap/opu/odata/sap/ZNW_SEACO_PORTAL_LOT5_SRV/Estim_Hrns_Decsn_Ecc?$filter=Workcreateddt eq datetime'2014-04-30T00:00:00' and Workcenter eq '00000000' and Unitpartcode eq '' and Tranx eq '000000000000' and SubassetNo eq '' and SerialNumber eq 'GESU2058351' and Senderaddress eq '' and Salesgrade eq '' and RepairDescMsgName eq '' and PlannerGroup eq '' and Para4 eq '' and Para3 eq '0000000000' and Para2 eq datetime'2014-04-30T00:00:00' and Para1 eq '' and MultiPartCont eq '' and MoveinDt eq datetime'2014-04-30T00:00:00' and MaterialType eq '' and FunctionalLoc eq 'SEA-SG-SIN-1547' and EstimateTypeestimateType eq 'ORIGINAL' and Estimatenumber eq '' and EquipmentNo eq 'GESU2058351' and Currencycode eq '' and ContStComplete eq '' and CompanyCode eq '' and AssetNo eq ''
				var urlToCall = serviceUrl15_old + "/Estim_Hrns_Decsn_Ecc?$filter=";
				var retVal = FixPartialRepairEstimateOnline.setUrlStepPara(urlToCall, 'EstimateTypeestimateType');
				if(!retVal)
					return;
				else
					urlToCall = retVal;
					
				objUtilREstimate.doOnlineRequest(urlToCall,FixPartialRepairEstimateOnline.onlinesuccessStepSix, FixPartialRepairEstimateOnline.onlineerrorStepSix);
			}catch(e){
				//busyDialog.close();
				//sap.ui.commons.MessageBox.alert("Error on processing step Six: " + e);
				objcurntFPURESearch.clickedPortalTrans(transidFPURE);
			}
		},
		
		//STEP 7
		onlinesuccessStepSeven: function(resultdata, response){
			try{
				var callPortalTrans = true;
				if(resultdata != undefined){
					if(resultdata.results.length > 0){
						callPortalTrans = false;
						FixPartialRepairEstimateOnline.getNextStepNeedToProcess('007',resultdata);
					}
				}
				if(callPortalTrans){
					objcurntFPURESearch.clickedPortalTrans(transidFPURE);
				}
			}catch(e){
				//busyDialog.close();
				objcurntFPURESearch.clickedPortalTrans(transidFPURE);
			}
		},
		onlineerrorStepSeven: function(err){
			//errorfromServer(err);
			objcurntFPURESearch.clickedPortalTrans(transidFPURE);
		},
		onlineProcessStepSeven: function(){
			try{
				busyDialog.open();
				//sap/opu/odata/sap/ZNW_SEACO_PORTAL_LOT5_SRV/Estim_Hrns_Wrkord?$filter=Workcreateddt eq datetime'2014-03-25T00:00:00' and Workcenter eq '00000000' and Unitpartcode eq 'C' and Tranx eq '000000000000' and SubassetNo eq '0000' and SerialNumber eq 'GESU2150489' and Senderaddress eq 'SGSINEKGA' and Salesgrade eq '3' and RepairDescMsgName eq '' and PlannerGroup eq 'EA' and Para4 eq '' and Para3 eq '0000000000' and Para2 eq datetime'9999-09-09T00:00:00' and Para1 eq '' and MultiPartCont eq 'N' and MoveinDt eq datetime'9999-09-09T00:00:00' and MaterialType eq 'BX2' and FunctionalLoc eq 'SEA-SG-SIN-1547' and EstimateType eq 'ORIGINAL' and Estimatenumber eq '0000000034' and EquipmentNo eq 'GESU2150489' and Currencycode eq 'SGD' and ContStComplete eq '' and CompanyCode eq '2916' and AssetNo eq 'GESU2150489'
				var urlToCall = serviceUrl15_old + "/Estim_Hrns_Wrkord?$filter=";
				var retVal = FixPartialRepairEstimateOnline.setUrlStepPara(urlToCall, 'EstimateType');
				if(!retVal)
					return;
				else
					urlToCall = retVal;
					
				objUtilREstimate.doOnlineRequest(urlToCall,FixPartialRepairEstimateOnline.onlinesuccessStepSeven, FixPartialRepairEstimateOnline.onlineerrorStepSeven);
			}catch(e){
				//busyDialog.close();
				//sap.ui.commons.MessageBox.alert("Error on processing step Seven: " + e);
				objcurntFPURESearch.clickedPortalTrans(transidFPURE);
			}
		},
		
		//STEP 8
		onlinesuccessStepEight: function(resultdata, response){
			try{
				var callPortalTrans = true;
				if(resultdata != undefined){
					if(resultdata.results.length > 0){
						callPortalTrans = false;
						showmsgFPUREO = true;
						FixPartialRepairEstimateOnline.getNextStepNeedToProcess('008',resultdata);
					}
				}
				if(callPortalTrans){
					objcurntFPURESearch.clickedPortalTrans(transidFPURE);
				}
			}catch(e){
				//busyDialog.close();
				objcurntFPURESearch.clickedPortalTrans(transidFPURE);
			}
		},
		onlineerrorStepEight: function(err){
			//errorfromServer(err);
			objcurntFPURESearch.clickedPortalTrans(transidFPURE);
		},
		onlineProcessStepEight: function(){
			try{
				busyDialog.open();
				//sap/opu/odata/sap/ZNW_SEACO_PORTAL_LOT5_SRV/Estim_Hrns_Str_Crm?$filter=Workcreateddt eq datetime'9999-09-09T00:00:00' and Workcenter eq '00000000' and Unitpartcode eq '' and Tranx eq '000000000000' and SubassetNo eq '' and SerialNumber eq 'SCZU7692094' and Senderaddress eq '' and Salesgrade eq '' and RepairDescMsgName eq '' and PlannerGroup eq '' and Para4 eq '' and Para3 eq '0000000000' and Para2 eq datetime'2014-04-11T00:00:00' and Para1 eq '' and MultiPartCont eq '' and MoveinDt eq datetime'9999-09-09T00:00:00' and MaterialType eq '' and FunctionalLoc eq 'ISC-IN-BOM-1056' and EstimateType eq 'ORIGINAL' and Estimatenumber eq '0000000238' and EquipmentNo eq 'SCZU7692094' and Currencycode eq '' and ContStComplete eq '' and CompanyCode eq '' and AssetNo eq ''
				var urlToCall = serviceUrl15_old + "/Estim_Hrns_Str_Crm?$filter=";
				
				var retVal = FixPartialRepairEstimateOnline.setUrlStepPara(urlToCall,'EstimateType');
				if(!retVal)
					return;
				else
					urlToCall = retVal;
					
				objUtilREstimate.doOnlineRequest(urlToCall,FixPartialRepairEstimateOnline.onlinesuccessStepEight, FixPartialRepairEstimateOnline.onlineerrorStepEight);
			}catch(e){
				//busyDialog.close();
				//sap.ui.commons.MessageBox.alert("Error on processing step Eight: " + e);
				objcurntFPURESearch.clickedPortalTrans(transidFPURE);
			}
		},
		
		setUrlStepPara: function(urlToCall, estmtstring){
				var hdrData =  FixPartialRepairEstimateOnline.getInputDataHdrLineitem();
				if(hdrData.header.length < 1){
					busyDialog.close();
					return false;
				}
				
				function setSendDateFormat(value){
					if(value != ''){
						var valsplt = value.split('-');
						valsplt = valsplt[2]+'-'+valsplt[1]+'-'+valsplt[0]+'T00:00:00';
						return valsplt;
					}else{
						return '9999-09-09T00:00:00';
					}
				}
				
				urlToCall += "Estimatenumber eq '" + hdrData.header[0].EstimateNumber + "'";
				urlToCall += " and RepairDescMsgName eq '" + hdrData.header[0].RepairDecisionMsgName + "'";
				urlToCall += " and Tranx eq '" + hdrData.header[0].TranxId + "'";
				urlToCall += " and Workcreateddt eq datetime'" + setSendDateFormat(hdrData.header[0].WorkCreatedDate) + "'";
				urlToCall += " and Workcenter eq '" + hdrData.header[0].WorkCtr + "'";
				urlToCall += " and Unitpartcode eq '" + hdrData.header[0].UnitPartcode + "'";
				urlToCall += " and SubassetNo eq '0000'"; 
				urlToCall += " and SerialNumber eq '" + hdrData.header[0].SerialNumber + "'";
				urlToCall += " and Senderaddress eq '" + hdrData.header[0].SenderAddress + "'";
				urlToCall += " and Salesgrade eq '" + hdrData.header[0].SaleGrade + "'";
				urlToCall += " and PlannerGroup eq '" + hdrData.header[0].PlannerGroup + "'";
				//urlToCall += " and Para4 eq ''";
				urlToCall += " and Para3 eq '0000000000'";
				urlToCall += " and Para2 eq datetime'"+setSendDateFormat('')+"'";
				urlToCall += " and Para1 eq ''";
				urlToCall += " and MultiPartCont eq '" + hdrData.header[0].MultiPartContainer + "'";
				urlToCall += " and MoveinDt eq datetime'" + setSendDateFormat(hdrData.header[0].MovementInDate) + "'";
				urlToCall += " and MaterialType eq '" + hdrData.header[0].MaterialType + "'";
				urlToCall += " and FunctionalLoc eq '" + hdrData.header[0].FunctionalLocation + "'";
				urlToCall += " and " + estmtstring + " eq '" + hdrData.header[0].EstimateType + "'";
				urlToCall += " and EquipmentNo eq '" + hdrData.header[0].EquipmentNumber + "'";
				urlToCall += " and Currencycode eq '" + hdrData.header[0].CurrencyCode + "'";
				urlToCall += " and ContStComplete eq '" + hdrData.header[0].ContainerStructureComplete + "'";
				urlToCall += " and CompanyCode eq '" + hdrData.header[0].CompanyCode + "'";
				urlToCall += " and AssetNo eq '" + hdrData.header[0].AssetNumber + "'";
				return urlToCall;
		},

		getInputDataHdrLineitem: function(){
			var arrReturn = {};
			arrReturn.header = jsnResultAllDataFPRES.headerDtl;
			arrReturn.lineItem = jsnResultAllDataFPRES.lineItemsDtl;
			return arrReturn;
		},
		
		getNextStepNeedToProcess: function(stepidProcessed, resultData){
			var tblmodel = sap.ui.getCore().byId("idTblResponseDataFPURES").getModel();
			var tbldata = tblmodel.getData();
			if(resultData != ''){
				for(var i =0; i< tbldata.modelData.length;i++){
					if(tbldata.modelData[i].Stepid == stepidProcessed){
						tbldata.modelData[i].RFCRequested = true;
						tbldata.modelData[i].RFCResult = resultData;
					}
				}
				tblmodel.setData(tbldata);
				tblmodel.updateBindings();
				//IF ANY STEP HAS NOT SUCCESS THEN CALL PORTAL TRANS TO UPDATE STATUS
				if(resultData.results[0].Type != 'S'){
					objcurntFPURESearch.clickedPortalTrans(transidFPURE);
					return;
				}
			}
			
			var arrMsgSelChkBx = tbldata.modelData.filter(function(el){
					return ((el["RFCRequested"] == false) && (el["ChkBxSel"] == true));
				});

			transidFPURE = jsnResultAllDataFPRES.headerDtl[0].TranxId;
			if(arrMsgSelChkBx.length > 0)
				FixPartialRepairEstimateOnline.nextStepToCall(arrMsgSelChkBx[0].Stepid);
			else{
				objcurntFPURESearch.clickedPortalTrans(transidFPURE);
				//FixPartialRepairEstimateOnline.nextStepToCall("0000");
			}
		},
		
		nextStepToCall: function(stepid){
			if(stepid == "001"){
				FixPartialRepairEstimateOnline.onlineProcessStepOne();
			}else if(stepid == "002"){
				FixPartialRepairEstimateOnline.onlineProcessStepTwo();
			}else if(stepid == "003"){
				FixPartialRepairEstimateOnline.onlineProcessStepThree();
			}else if(stepid == "004"){
				FixPartialRepairEstimateOnline.onlineProcessStepFour();
			}else if(stepid == "005"){
				FixPartialRepairEstimateOnline.onlineProcessStepFive();
			}else if(stepid == "006"){
				FixPartialRepairEstimateOnline.onlineProcessStepSix();
			}else if(stepid == "007"){
				FixPartialRepairEstimateOnline.onlineProcessStepSeven();
			}else if(stepid == "008"){
				FixPartialRepairEstimateOnline.onlineProcessStepEight();
			}else{
				busyDialog.close();
			}
		}
};
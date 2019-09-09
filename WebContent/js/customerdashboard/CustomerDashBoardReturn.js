var jsnRsltDataAllReturnsTbl =[];
var jsnReturnTopRecordData =[];
var jsnCustDBoardReturnsTbl = [];
var jsnCustDBReturnsTotQtyDtl = [];
var jsnReturnTopRecordDataVwAll =[];

sap.ui.model.json.JSONModel.extend("CustomerDashBoardReturn", {
	//SET ReturnsTABLE GLOBAL DATA(jsnRsltDataAllReturnsTbl) FROM RESULT
	setReturnsTableGlobalData: function(resultDataServer){
		var objutil = new utility();
		jsnRsltDataAllReturnsTbl.length = 0;
		jsnReturnTopRecordData.length = 0;
		jsnCustDBoardReturnsTbl.length = 0;
		jsnCustDBReturnsTotQtyDtl.length = 0;
		jsnReturnTopRecordDataVwAll.length = 0;

		var cuntForFive = 0;
		for(var i =0; i < resultDataServer.length;i++){
			var cnvrtOffhireDateCDBRet ='Return Authorized', cnvrtExpirDateCDBRet ='',
			OffhireDateCDBRetSort ='', ExpirDateCDBRetSort ='';
			if(resultDataServer[i].Flag == 'X'){
					cnvrtOffhireDateCDBRet ='Return Authorized';
			}else{
				cnvrtOffhireDateCDBRet =  new Date(parseInt(resultDataServer[i].OffhireDate.substr(6,13))).format("dd-mm-yyyy");	
				OffhireDateCDBRetSort = new Date(parseInt(resultDataServer[i].OffhireDate.substr(6,13)));
			}
			
			if(resultDataServer[i].ExpiryDate != ''){
				cnvrtExpirDateCDBRet=  new Date(parseInt(resultDataServer[i].ExpiryDate.substr(6,13))).format("dd-mm-yyyy");
				ExpirDateCDBRetSort = new Date(parseInt(resultDataServer[i].ExpiryDate.substr(6,13)));
			}
			
			var filterReturnRefId = (objutil.removeLeadZero($.trim(resultDataServer[i].Return))
								+ resultDataServer[i].UnitType + objutil.removeLeadZero($.trim(resultDataServer[i].Partner))
								+ objutil.removeLeadZero($.trim(resultDataServer[i].Description))).toUpperCase();

			var filterReturnOrdnoId = (objutil.removeLeadZero($.trim(resultDataServer[i].Ordno))
								+ resultDataServer[i].UnitType + objutil.removeLeadZero($.trim(resultDataServer[i].Partner))
								+ objutil.removeLeadZero($.trim(resultDataServer[i].Description))).toUpperCase();
								
			if((resultDataServer[i].A4f == 'X') && (cuntForFive < 5)){
					jsnReturnTopRecordData.push({
						"Return" : objutil.removeLeadZero($.trim(resultDataServer[i].Return)),
						"ReturnQty" : resultDataServer[i].ReturnQty,
						"OutstandQty": resultDataServer[i].OutstandQty,
						"UnitType": resultDataServer[i].UnitType ,
						"Location" : resultDataServer[i].Location,
						"Ordno": objutil.removeLeadZero($.trim(resultDataServer[i].Ordno)),
						"LeaseNo" : objutil.removeLeadZero($.trim(resultDataServer[i].LeaseNo)),
						"Partner" : resultDataServer[i].Partner,
						"DepotDesc": resultDataServer[i].DepotDesc,
						"Description": resultDataServer[i].Description,
						"City" : resultDataServer[i].City,
						"OffhireDate": cnvrtOffhireDateCDBRet,
						"ExpiryDate": cnvrtExpirDateCDBRet ,
						"Sernr" : resultDataServer[i].Sernr,
						"filterReturnRefId" : filterReturnRefId,
						"filterReturnOrdnoId": filterReturnOrdnoId,
						"OffhireDateCDBRetSort" : OffhireDateCDBRetSort,
						"ExpirDateCDBRetSort" : ExpirDateCDBRetSort
					});
				cuntForFive++;
			}
			//SET FOR VIEW ALL BUTTON CLICK ON CUSTOMER DASHBOARD
			if(resultDataServer[i].A4f == 'X'){
				jsnReturnTopRecordDataVwAll.push({
						"Return" : objutil.removeLeadZero($.trim(resultDataServer[i].Return)),
						"ReturnQty" : resultDataServer[i].ReturnQty,
						"OutstandQty": resultDataServer[i].OutstandQty,
						"UnitType": resultDataServer[i].UnitType ,
						"Location" : resultDataServer[i].Location,
						"Ordno": objutil.removeLeadZero($.trim(resultDataServer[i].Ordno)),
						"LeaseNo" : objutil.removeLeadZero($.trim(resultDataServer[i].LeaseNo)),
						"Partner" : resultDataServer[i].Partner,
						"DepotDesc": resultDataServer[i].DepotDesc,
						"Description": resultDataServer[i].Description,
						"City" : resultDataServer[i].City,
						"OffhireDate": cnvrtOffhireDateCDBRet,
						"ExpiryDate": cnvrtExpirDateCDBRet ,
						"Sernr" : resultDataServer[i].Sernr,
						"filterReturnRefId" : filterReturnRefId,
						"filterReturnOrdnoId": filterReturnOrdnoId,
						"OffhireDateCDBRetSort" : OffhireDateCDBRetSort,
						"ExpirDateCDBRetSort" : ExpirDateCDBRetSort
					});
				}
			
			//SET ALL RESULT DATA
			jsnRsltDataAllReturnsTbl.push({
					"Return": objutil.removeLeadZero($.trim(resultDataServer[i].Return)) ,
					"UnitType": resultDataServer[i].UnitType ,
					"Location" : resultDataServer[i].Location,
					"ReturnQty" : resultDataServer[i].ReturnQty,
					"OutstandQty": resultDataServer[i].OutstandQty ,
					"ExpiryDate": cnvrtExpirDateCDBRet ,
					"Customer" : resultDataServer[i].Customer,
					"GuidH" : resultDataServer[i].GuidH,
					"ObjectId": resultDataServer[i].ObjectId,
					"ProcessType": resultDataServer[i].ProcessType,
					"GuidI" : resultDataServer[i].GuidI,
					"Sernr" : resultDataServer[i].Sernr,
					"OrderedProd": resultDataServer[i].OrderedProd,
					"Ordno": objutil.removeLeadZero($.trim(resultDataServer[i].Ordno)),
					"LeaseNo" : objutil.removeLeadZero($.trim(resultDataServer[i].LeaseNo)),
					"Partner" : resultDataServer[i].Partner,
					"DepotDesc": resultDataServer[i].DepotDesc,
					"Description": resultDataServer[i].Description,
					"TstFrom1" : resultDataServer[i].TstFrom1,
					"TstFrom2" : resultDataServer[i].TstFrom2,
					"RetQty": resultDataServer[i].RetQty,
					"OutQty": resultDataServer[i].OutQty,
					"TotQty" : resultDataServer[i].TotQty,
					"Status": resultDataServer[i].Status,
					"Count": resultDataServer[i].Count,
					"City" : resultDataServer[i].City,
					"Zzactv" : resultDataServer[i].Zzactv,
					"OffhireDate": cnvrtOffhireDateCDBRet,
					"A4f": resultDataServer[i].A4f,
					"E1f" : resultDataServer[i].E1f,
					"E2f" : resultDataServer[i].E2f,
					"Flag" : resultDataServer[i].Flag,
					"IExtra1": resultDataServer[i].IExtra1,
					"IExtra2": resultDataServer[i].IExtra2,
					"IExtra3" : resultDataServer[i].IExtra3,
					"IExtra4" : resultDataServer[i].IExtra4,
					"filterReturnRefId" : filterReturnRefId,
					"filterReturnOrdnoId": filterReturnOrdnoId,
					"OffhireDateCDBRetSort" : OffhireDateCDBRetSort,
					"ExpirDateCDBRetSort" : ExpirDateCDBRetSort
				});
		}
		var oTblReturnCB = sap.ui.getCore().byId("idTblReturnCDB");
		//oTblReturnCB.setNavigationMode(sap.ui.table.NavigationMode.None);
		//oTblReturnCB.setVisibleRowCount(jsnReturnTopRecordData.length);
		var oModelCDBReturn = new sap.ui.model.json.JSONModel();
		oModelCDBReturn.setData(jsnReturnTopRecordData);

		oTblReturnCB.setModel(oModelCDBReturn);
		oTblReturnCB.bindRows("/");
		if(jsnReturnTopRecordDataVwAll.length > 5){
			sap.ui.getCore().byId("idVAllActRetrnCDB").setVisible(true);
		}else{
			sap.ui.getCore().byId("idVAllActRetrnCDB").setVisible(false);
		}
   },
   
	//SET DATA FOR Returns Detail Screen(jsnCustDBoardReturnsTbl)
	setJsonDataReturns: function(ReturnId){
		jsnCustDBoardReturnsTbl.length = 0;
		for(var i=0;i<jsnRsltDataAllReturnsTbl.length;i++){
			if((jsnRsltDataAllReturnsTbl[i].Ordno == ReturnId)&& (jsnRsltDataAllReturnsTbl[i].E1f == 'X')){
				jsnCustDBoardReturnsTbl.push({
					"Return": jsnRsltDataAllReturnsTbl[i].Return ,
					"UnitType": jsnRsltDataAllReturnsTbl[i].UnitType ,
					"Location" : jsnRsltDataAllReturnsTbl[i].Location,
					"ReturnQty" : jsnRsltDataAllReturnsTbl[i].ReturnQty,
					"OutstandQty": jsnRsltDataAllReturnsTbl[i].OutstandQty ,
					"ExpiryDate": jsnRsltDataAllReturnsTbl[i].ExpiryDate ,
					"Customer" : jsnRsltDataAllReturnsTbl[i].Customer,
					"GuidH" : jsnRsltDataAllReturnsTbl[i].GuidH,
					"ObjectId": jsnRsltDataAllReturnsTbl[i].ObjectId,
					"ProcessType": jsnRsltDataAllReturnsTbl[i].ProcessType,
					"GuidI" : jsnRsltDataAllReturnsTbl[i].GuidI,
					"Sernr" : jsnRsltDataAllReturnsTbl[i].Sernr,
					"OrderedProd": jsnRsltDataAllReturnsTbl[i].OrderedProd,
					"Ordno": jsnRsltDataAllReturnsTbl[i].Ordno,
					"LeaseNo" : jsnRsltDataAllReturnsTbl[i].LeaseNo,
					"Partner" : jsnRsltDataAllReturnsTbl[i].Partner,
					"DepotDesc": jsnRsltDataAllReturnsTbl[i].DepotDesc,
					"Description": jsnRsltDataAllReturnsTbl[i].Description,
					"TstFrom1" : jsnRsltDataAllReturnsTbl[i].TstFrom1,
					"TstFrom2" : jsnRsltDataAllReturnsTbl[i].TstFrom2,
					"RetQty": jsnRsltDataAllReturnsTbl[i].RetQty,
					"OutQty": jsnRsltDataAllReturnsTbl[i].OutQty,
					"TotQty" : jsnRsltDataAllReturnsTbl[i].TotQty,
					"Status": jsnRsltDataAllReturnsTbl[i].Status,
					"Count": jsnRsltDataAllReturnsTbl[i].Count,
					"City" : jsnRsltDataAllReturnsTbl[i].City,
					"Zzactv" : jsnRsltDataAllReturnsTbl[i].Zzactv,
					"OffhireDate": jsnRsltDataAllReturnsTbl[i].OffhireDate,
					"A4f": jsnRsltDataAllReturnsTbl[i].A4f,
					"E1f" : jsnRsltDataAllReturnsTbl[i].E1f,
					"E2f" : jsnRsltDataAllReturnsTbl[i].E2f,
					"Flag" : jsnRsltDataAllReturnsTbl[i].Flag,
					"IExtra1": jsnRsltDataAllReturnsTbl[i].IExtra1,
					"IExtra2": jsnRsltDataAllReturnsTbl[i].IExtra2,
					"IExtra3" : jsnRsltDataAllReturnsTbl[i].IExtra3,
					"IExtra4" : jsnRsltDataAllReturnsTbl[i].IExtra4,
					"filterReturnRefId" : jsnRsltDataAllReturnsTbl[i].filterReturnRefId,
					"filterReturnOrdnoId": jsnRsltDataAllReturnsTbl[i].filterReturnOrdnoId,
					"OffhireDateCDBRetSort" : jsnRsltDataAllReturnsTbl[i].OffhireDateCDBRetSort,
					"ExpirDateCDBRetSort" : jsnRsltDataAllReturnsTbl[i].ExpirDateCDBRetSort
				});
			}
		}
	},
	
	//SET DATA FOR Returns Pick Detail Screen(jsnCustDBReturnsTotQtyDtl)
	setJsonDataReturnTotQtyDtl: function(RetRefId){
		jsnCustDBReturnsTotQtyDtl.length = 0;
		for(var i=0;i<jsnRsltDataAllReturnsTbl.length;i++){
			if((jsnRsltDataAllReturnsTbl[i].filterReturnOrdnoId == RetRefId)&& (jsnRsltDataAllReturnsTbl[i].E2f == 'X')){
				jsnCustDBReturnsTotQtyDtl.push({
						"Return": jsnRsltDataAllReturnsTbl[i].Return ,
					"UnitType": jsnRsltDataAllReturnsTbl[i].UnitType ,
					"Location" : jsnRsltDataAllReturnsTbl[i].Location,
					"ReturnQty" : jsnRsltDataAllReturnsTbl[i].ReturnQty,
					"OutstandQty": jsnRsltDataAllReturnsTbl[i].OutstandQty ,
					"ExpiryDate": jsnRsltDataAllReturnsTbl[i].ExpiryDate ,
					"Customer" : jsnRsltDataAllReturnsTbl[i].Customer,
					"GuidH" : jsnRsltDataAllReturnsTbl[i].GuidH,
					"ObjectId": jsnRsltDataAllReturnsTbl[i].ObjectId,
					"ProcessType": jsnRsltDataAllReturnsTbl[i].ProcessType,
					"GuidI" : jsnRsltDataAllReturnsTbl[i].GuidI,
					"Sernr" : jsnRsltDataAllReturnsTbl[i].Sernr,
					"OrderedProd": jsnRsltDataAllReturnsTbl[i].OrderedProd,
					"Ordno": jsnRsltDataAllReturnsTbl[i].Ordno,
					"LeaseNo" : jsnRsltDataAllReturnsTbl[i].LeaseNo,
					"Partner" : jsnRsltDataAllReturnsTbl[i].Partner,
					"DepotDesc": jsnRsltDataAllReturnsTbl[i].DepotDesc,
					"Description": jsnRsltDataAllReturnsTbl[i].Description,
					"TstFrom1" : jsnRsltDataAllReturnsTbl[i].TstFrom1,
					"TstFrom2" : jsnRsltDataAllReturnsTbl[i].TstFrom2,
					"RetQty": jsnRsltDataAllReturnsTbl[i].RetQty,
					"OutQty": jsnRsltDataAllReturnsTbl[i].OutQty,
					"TotQty" : jsnRsltDataAllReturnsTbl[i].TotQty,
					"Status": jsnRsltDataAllReturnsTbl[i].Status,
					"Count": jsnRsltDataAllReturnsTbl[i].Count,
					"City" : jsnRsltDataAllReturnsTbl[i].City,
					"Zzactv" : jsnRsltDataAllReturnsTbl[i].Zzactv,
					"OffhireDate": jsnRsltDataAllReturnsTbl[i].OffhireDate,
					"A4f": jsnRsltDataAllReturnsTbl[i].A4f,
					"E1f" : jsnRsltDataAllReturnsTbl[i].E1f,
					"E2f" : jsnRsltDataAllReturnsTbl[i].E2f,
					"Flag" : jsnRsltDataAllReturnsTbl[i].Flag,
					"IExtra1": jsnRsltDataAllReturnsTbl[i].IExtra1,
					"IExtra2": jsnRsltDataAllReturnsTbl[i].IExtra2,
					"IExtra3" : jsnRsltDataAllReturnsTbl[i].IExtra3,
					"IExtra4" : jsnRsltDataAllReturnsTbl[i].IExtra4,
					"filterReturnRefId" : jsnRsltDataAllReturnsTbl[i].filterReturnRefId,
					"filterReturnOrdnoId": jsnRsltDataAllReturnsTbl[i].filterReturnOrdnoId,
					"OffhireDateCDBRetSort" : jsnRsltDataAllReturnsTbl[i].OffhireDateCDBRetSort,
					"ExpirDateCDBRetSort" : jsnRsltDataAllReturnsTbl[i].ExpirDateCDBRetSort
				});
			}
		}
	}
})
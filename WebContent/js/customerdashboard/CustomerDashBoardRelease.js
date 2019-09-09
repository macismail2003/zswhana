var jsnRsltDataAllReleaseTbl =[];
var jsnRelTopRecordData =[];
var jsnCustDBoardReleaseTbl = [];
var jsnCustDBReleasePickDtl = [];
var jsnRelTopRecordDataVwAll =[];

sap.ui.model.json.JSONModel.extend("CustomerDashBoardRelease", {
	//SET RELEASE TABLE GLOBAL DATA(jsnRsltDataAllReleaseTbl) FROM RESULT
	setReleaseTableGlobalData: function(resultDataServer){
		var objutil = new utility();
		jsnRsltDataAllReleaseTbl.length = 0;
		jsnRelTopRecordData.length = 0;
		jsnCustDBoardReleaseTbl.length = 0;
		jsnCustDBReleasePickDtl.length = 0;
		jsnRelTopRecordDataVwAll.length = 0;
		
		var cuntForFive = 0;
		for(var i =0; i < resultDataServer.length;i++){
			var cnvrtOnhireDateCDBMARel ='', cnvrtExpirDateCDBMARel ='',OnhireDateCDBMARelSort='',ExpirDateCDBMARelSort='';
			
			if(resultDataServer[i].OnhireDate.substr(6,13) != ''){
				cnvrtOnhireDateCDBMARel = new Date(parseInt(resultDataServer[i].OnhireDate.substr(6,13))).format("dd-mm-yyyy");
				OnhireDateCDBMARelSort = new Date(parseInt(resultDataServer[i].OnhireDate.substr(6,13)));
			}
			if(resultDataServer[i].OnhireDate.substr(6,13) != ''){
				cnvrtExpirDateCDBMARel = new Date(parseInt(resultDataServer[i].ExpiryDate.substr(6,13))).format("dd-mm-yyyy")
				ExpirDateCDBMARelSort = new Date(parseInt(resultDataServer[i].ExpiryDate.substr(6,13)));
			}
			
			var filterReleaseRefId = (objutil.removeLeadZero($.trim(resultDataServer[i].ReleaseRef))
								+ resultDataServer[i].UnitType + objutil.removeLeadZero($.trim(resultDataServer[i].Depot))
								+ objutil.removeLeadZero($.trim(resultDataServer[i].SearchTerm))).toUpperCase();

			var filterAuthId = (objutil.removeLeadZero($.trim(resultDataServer[i].Authno))
								+ resultDataServer[i].UnitType + objutil.removeLeadZero($.trim(resultDataServer[i].Depot))
								+ objutil.removeLeadZero($.trim(resultDataServer[i].SearchTerm))).toUpperCase();
								
			if((resultDataServer[i].A3f == 'X') && (cuntForFive < 5)){
					jsnRelTopRecordData.push({
						"ReleaseRef" : objutil.removeLeadZero($.trim(resultDataServer[i].ReleaseRef)),
						"TotalQuant" : resultDataServer[i].TotalQuant,
						"OutstandQuant": resultDataServer[i].OutstandQuant,
						"UnitType" : resultDataServer[i].UnitType,
						"City" : resultDataServer[i].City,
						"Depot": objutil.removeLeadZero($.trim(resultDataServer[i].Depot)),
						"Depotname": resultDataServer[i].Depotname,
						"SearchTerm" : objutil.removeLeadZero($.trim(resultDataServer[i].SearchTerm)),
						"FilterReleaseRefId" :  filterReleaseRefId
					});
				cuntForFive++;
			}
			
			if(resultDataServer[i].A3f == 'X'){
				jsnRelTopRecordDataVwAll.push({
						"ReleaseRef" : objutil.removeLeadZero($.trim(resultDataServer[i].ReleaseRef)),
						"TotalQuant" : resultDataServer[i].TotalQuant,
						"OutstandQuant": resultDataServer[i].OutstandQuant,
						"UnitType" : resultDataServer[i].UnitType,
						"City" : resultDataServer[i].City,
						"Depot": objutil.removeLeadZero($.trim(resultDataServer[i].Depot)),
						"Depotname": resultDataServer[i].Depotname,
						"SearchTerm" : objutil.removeLeadZero($.trim(resultDataServer[i].SearchTerm)),
						"FilterReleaseRefId" :  filterReleaseRefId
					});
			}
			
								
			//SET ALL RESULT DATA
			jsnRsltDataAllReleaseTbl.push({
					"ProcessType": resultDataServer[i].ProcessType ,
					"Itm": resultDataServer[i].Itm ,
					"LeaseType" : resultDataServer[i].LeaseType,
					"Guid" : resultDataServer[i].Guid,
					"GuidI": resultDataServer[i].GuidI ,
					"Sernr": resultDataServer[i].Sernr ,
					"OnhireDate" : cnvrtOnhireDateCDBMARel,
					"SearchTerm" : resultDataServer[i].SearchTerm,
					"Authno": objutil.removeLeadZero($.trim(resultDataServer[i].Authno)),
					"LeaseNo": objutil.removeLeadZero($.trim(resultDataServer[i].LeaseNo)),
					"UnitType" : resultDataServer[i].UnitType,
					"City" : resultDataServer[i].City,
					"Depot": resultDataServer[i].Depot,
					"Depotname": resultDataServer[i].Depotname,
					"ReleaseRef" : objutil.removeLeadZero($.trim(resultDataServer[i].ReleaseRef)),
					"TotalQuant" : resultDataServer[i].TotalQuant,
					"PickedQty": resultDataServer[i].PickedQty,
					"OutstandQuant": resultDataServer[i].OutstandQuant,
					"Status" : resultDataServer[i].Status,
					"ExpiryDate" : cnvrtExpirDateCDBMARel,
					"Flag": resultDataServer[i].Flag,
					"A3f": resultDataServer[i].A3f,
					"Df1" : resultDataServer[i].Df1,
					"Df2" : resultDataServer[i].Df2,
					"Extra1": resultDataServer[i].Extra1,
					"Extra2": resultDataServer[i].Extra2,
					"Extra3" : resultDataServer[i].Extra3,
					"Extra4" : resultDataServer[i].Extra4,
					"FilterReleaseRefId" :  filterReleaseRefId,
					"FilterAuthId" : filterAuthId,
					"OnhireDateCDBMARelSort" : OnhireDateCDBMARelSort,
					"ExpirDateCDBMARelSort" : ExpirDateCDBMARelSort
				});
		}
		
		var oidTblRelCB = sap.ui.getCore().byId("idTblReleaseCB");
		//oidTblRelCB.setNavigationMode(sap.ui.table.NavigationMode.None);
		//oidTblRelCB.setVisibleRowCount(jsnRelTopRecordData.length);
		var oModelRelTblCDBMActRelDtl = new sap.ui.model.json.JSONModel();
		oModelRelTblCDBMActRelDtl.setData(jsnRelTopRecordData);

		oidTblRelCB.setModel(oModelRelTblCDBMActRelDtl);
		oidTblRelCB.bindRows("/");
		if(jsnRelTopRecordDataVwAll.length >5){
			sap.ui.getCore().byId("idVAllActRelCDB").setVisible(true);
		}else{
			sap.ui.getCore().byId("idVAllActRelCDB").setVisible(false);
		}
   },
   
	//SET DATA FOR Release Detail Screen(jsnCustDBoardReleaseTbl)
	setJsonDataRelease: function(FilterReleaseRefId){
		jsnCustDBoardReleaseTbl.length = 0;
		for(var i=0;i<jsnRsltDataAllReleaseTbl.length;i++){
			if((jsnRsltDataAllReleaseTbl[i].Authno == FilterReleaseRefId)&& (jsnRsltDataAllReleaseTbl[i].Df1 == 'X')){
				jsnCustDBoardReleaseTbl.push({
					"ProcessType": jsnRsltDataAllReleaseTbl[i].ProcessType ,
					"Itm": jsnRsltDataAllReleaseTbl[i].Itm ,
					"LeaseType" : jsnRsltDataAllReleaseTbl[i].LeaseType,
					"Guid" : jsnRsltDataAllReleaseTbl[i].Guid,
					"GuidI": jsnRsltDataAllReleaseTbl[i].GuidI ,
					"Sernr": jsnRsltDataAllReleaseTbl[i].Sernr ,
					"OnhireDate" : jsnRsltDataAllReleaseTbl[i].OnhireDate,
					"SearchTerm" : jsnRsltDataAllReleaseTbl[i].SearchTerm,
					"Authno": jsnRsltDataAllReleaseTbl[i].Authno,
					"LeaseNo": jsnRsltDataAllReleaseTbl[i].LeaseNo,
					"UnitType" : jsnRsltDataAllReleaseTbl[i].UnitType,
					"City" : jsnRsltDataAllReleaseTbl[i].City,
					"Depot": jsnRsltDataAllReleaseTbl[i].Depot,
					"Depotname": jsnRsltDataAllReleaseTbl[i].Depotname,
					"ReleaseRef" : jsnRsltDataAllReleaseTbl[i].ReleaseRef,
					"TotalQuant" : jsnRsltDataAllReleaseTbl[i].TotalQuant,
					"PickedQty": jsnRsltDataAllReleaseTbl[i].PickedQty,
					"OutstandQuant": jsnRsltDataAllReleaseTbl[i].OutstandQuant,
					"Status" : jsnRsltDataAllReleaseTbl[i].Status,
					"ExpiryDate" : jsnRsltDataAllReleaseTbl[i].ExpiryDate,
					"Flag": jsnRsltDataAllReleaseTbl[i].Flag,
					"A3f": jsnRsltDataAllReleaseTbl[i].A3f,
					"Df1" : jsnRsltDataAllReleaseTbl[i].Df1,
					"Df2" : jsnRsltDataAllReleaseTbl[i].Df2,
					"Extra1": jsnRsltDataAllReleaseTbl[i].Extra1,
					"Extra2": jsnRsltDataAllReleaseTbl[i].Extra2,
					"Extra3" : jsnRsltDataAllReleaseTbl[i].Extra3,
					"Extra4" : jsnRsltDataAllReleaseTbl[i].Extra4,
					"FilterReleaseRefId" :  jsnRsltDataAllReleaseTbl[i].FilterReleaseRefId,
					"FilterAuthId" : jsnRsltDataAllReleaseTbl[i].FilterAuthId,
					"OnhireDateCDBMARelSort" : jsnRsltDataAllReleaseTbl[i].OnhireDateCDBMARelSort,
					"ExpirDateCDBMARelSort" : jsnRsltDataAllReleaseTbl[i].ExpirDateCDBMARelSort
				});
			}
		}
	},
	
	//SET DATA FOR Release Pick Detail Screen(jsnCustDBReleasePickDtl)
	setJsonDataReleasePickDetail: function(RelRefIdPickDtl){
		jsnCustDBReleasePickDtl.length = 0;
		for(var i=0;i<jsnRsltDataAllReleaseTbl.length;i++){
			if((jsnRsltDataAllReleaseTbl[i].FilterAuthId == RelRefIdPickDtl)&& (jsnRsltDataAllReleaseTbl[i].Df2 == 'X')){
				jsnCustDBReleasePickDtl.push({
					"ProcessType": jsnRsltDataAllReleaseTbl[i].ProcessType ,
					"Itm": jsnRsltDataAllReleaseTbl[i].Itm ,
					"LeaseType" : jsnRsltDataAllReleaseTbl[i].LeaseType,
					"Guid" : jsnRsltDataAllReleaseTbl[i].Guid,
					"GuidI": jsnRsltDataAllReleaseTbl[i].GuidI ,
					"Sernr": jsnRsltDataAllReleaseTbl[i].Sernr ,
					"OnhireDate" : jsnRsltDataAllReleaseTbl[i].OnhireDate,
					"SearchTerm" : jsnRsltDataAllReleaseTbl[i].SearchTerm,
					"Authno": jsnRsltDataAllReleaseTbl[i].Authno,
					"LeaseNo": jsnRsltDataAllReleaseTbl[i].LeaseNo,
					"UnitType" : jsnRsltDataAllReleaseTbl[i].UnitType,
					"City" : jsnRsltDataAllReleaseTbl[i].City,
					"Depot": jsnRsltDataAllReleaseTbl[i].Depot,
					"Depotname": jsnRsltDataAllReleaseTbl[i].Depotname,
					"ReleaseRef" : jsnRsltDataAllReleaseTbl[i].ReleaseRef,
					"TotalQuant" : jsnRsltDataAllReleaseTbl[i].TotalQuant,
					"PickedQty": jsnRsltDataAllReleaseTbl[i].PickedQty,
					"OutstandQuant": jsnRsltDataAllReleaseTbl[i].OutstandQuant,
					"Status" : jsnRsltDataAllReleaseTbl[i].Status,
					"ExpiryDate" : jsnRsltDataAllReleaseTbl[i].ExpiryDate,
					"Flag": jsnRsltDataAllReleaseTbl[i].Flag,
					"A3f": jsnRsltDataAllReleaseTbl[i].A3f,
					"Df1" : jsnRsltDataAllReleaseTbl[i].Df1,
					"Df2" : jsnRsltDataAllReleaseTbl[i].Df2,
					"Extra1": jsnRsltDataAllReleaseTbl[i].Extra1,
					"Extra2": jsnRsltDataAllReleaseTbl[i].Extra2,
					"Extra3" : jsnRsltDataAllReleaseTbl[i].Extra3,
					"Extra4" : jsnRsltDataAllReleaseTbl[i].Extra4,
					"FilterReleaseRefId" :  jsnRsltDataAllReleaseTbl[i].FilterReleaseRefId,
					"FilterAuthId" : jsnRsltDataAllReleaseTbl[i].FilterAuthId,
					"OnhireDateCDBMARelSort" : jsnRsltDataAllReleaseTbl[i].OnhireDateCDBMARelSort,
					"ExpirDateCDBMARelSort" : jsnRsltDataAllReleaseTbl[i].ExpirDateCDBMARelSort
				});
			}
		}
	}
})
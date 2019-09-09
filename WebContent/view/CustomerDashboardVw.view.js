sap.ui.jsview("view.CustomerDashboardVw",
{
	getControllerName : function() {
					return "view.CustomerDashboardVw";
		},
	createContent : function(oController) {
		//var objLogin = new loggedInU();
		var userdata = objLoginUser.filterLoggedInUserData('SCREEN');
		
		roleType = objLoginUser.getLoggedInUserType();
		custid = objLoginUser.getLoggedInUserID();
		
		//roleType = "CUSTOMER";
		//custid = '100001';
		var changeCustFlag = true;
		if(roleType == "SEACO"){
			changeCustFlag = true;
		}else{
			changeCustFlag = false;
		}
		
		for(var i =0;i<userdata.length;i++){
			if(userdata[i].ScrView== "on_hire"){
				onhirevisible = true;
			}else if(userdata[i].ScrView== "off_hire"){
				offhirevisible = true;
			}else if(userdata[i].ScrView== "release"){
				releasevisible = true;
			}else if(userdata[i].ScrView== "return"){
				returnvisible = true;
			}
		}
		//var onhirevisible = true,  offhirevisible= true, releasevisible = true, returnvisible = true;

		
		var objCstDBjs = new customerDashboard();
		var frmCDB = objCstDBjs.createMyInventory(changeCustFlag);
		frmCDB.setVisible(false);

		//CHECK ROLE ANG GET VISIBLE INVISIBLE BACKGROND WITH ONLINE DATA
		var objChngCustDB = new ChangCustomerDashBoard();
		
		if((roleType == "SEACO") && (!backClickCDB)){
			objChngCustDB.changeCustomer();
		}else if(!backClickCDB){
			frmCDB.setVisible(true);
			var ochngCust = new ChangCustomerDashBoard();
			ochngCust.resetAllCustDashBoard();
		}else if(backClickCDB){
			frmCDB.setVisible(true);
			this.backbuttonClickCDB();
		}
		//CREATE PAGE FOR THIS VIEW
		this.page = new sap.m.Page({
				//title: "{i18n>page2Title}",
				showNavButton: false,
				icon: "",
				content : [frmCDB]
		});
		this.page.setShowHeader(false);
		this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
		
		// done
		return this.page;
	},
	
	//ON BACK FROM OTHER SCREEN REBINDING OF DATA
	backbuttonClickCDB: function(){
		backClickCDB = false;
		sap.ui.getCore().byId("idtxtSelCustCDB").setText(selectedCustomer);
		sap.ui.getCore().byId('idonhireNodataCDB').setText('No units found to be on-hire for the seleted lease,\n Please contact your local customer services for details.');
		sap.ui.getCore().byId('idoffhireNoDataCDB').setText('No units found to be off-hire for the seleted lease,\n Please contact your local customer services for details.');
		
		var strNoDataTbl = '<div class="sapUiTableCtrlEmpty custTblBgColor" tabindex="0"><span id="idspnNodataCDBRet"'
		strNoDataTbl += 'class="sapUiLbl custTblBgColor sapUiTableCtrlEmptyMsg">No Active Releases found,<br> Please contact your local customer services for details.</span></div>'
		sap.ui.getCore().byId('idhtmlNoDataRelease').setContent(strNoDataTbl);
		
		var strNoDataTbl = '<div class="sapUiTableCtrlEmpty custTblBgColor" tabindex="0"><span id="idspnTblCDNARet"'
			strNoDataTbl += 'class="sapUiLbl custTblBgColor sapUiTableCtrlEmptyMsg">No Active Returns found,<br> Please contact your local customer services for details</span></div>'
			sap.ui.getCore().byId('idhtmlNoDataRetnCDB').setContent(strNoDataTbl);
			
		/*sap.ui.getCore().byId('idonhireNodataCDB').setText('No units found to be on-hire for the seleted lease,\n Please contact your local customer services for details.');
		sap.ui.getCore().byId('idoffhireNoDataCDB').setText('No units found to be off-hire for the seleted lease,\n Please contact your local customer services for details.');

		var strNoDataTbl = '<div class="sapUiTableCtrlEmpty custTblBgColor" tabindex="0"><span id="idspnNodataCDBRet"'
			strNoDataTbl += 'class="sapUiLbl custTblBgColor sapUiTableCtrlEmptyMsg">No Active Releases found,<br> Please contact your local customer services for details.</span></div>'
		sap.ui.getCore().byId('idhtmlNoDataRelease').setContent(strNoDataTbl);

		strNoDataTbl = '<div class="sapUiTableCtrlEmpty custTblBgColor" tabindex="0"><span id="idspnTblCDNARet"'
			strNoDataTbl += 'class="sapUiLbl custTblBgColor sapUiTableCtrlEmptyMsg">No Active Returns found,<br> Please contact your local customer services for details</span></div>'
		sap.ui.getCore().byId('idhtmlNoDataRetnCDB').setContent(strNoDataTbl);*/
			
		//RESET DATA FOR ONHIRE
		var oidOnhireCDB = sap.ui.getCore().byId("idOnhireClmnChartCDB");
		var oModelOnHireCDBSel = new sap.ui.model.json.JSONModel();
		var BarDataOnHireBack ,vOnHireDataset;
		if(statGrpahOnHire == "unittypeonhire"){
			if(categoryUnitOnhire != ''){
				sap.ui.getCore().byId("idBackOnhireGraph").setVisible(true);
			}else{
				sap.ui.getCore().byId("idBackOnhireGraph").setVisible(false);
			}
			if(jsonBindGraphOnHire.length > 0){
				sap.ui.getCore().byId("idbtnViewAllOnhireCDB").setVisible(true);
			}else{
				sap.ui.getCore().byId("idbtnViewAllOnhireCDB").setVisible(false);
			}
			oModelOnHireCDBSel.setData(jsonBindGraphOnHire);
			
			BarDataOnHireBack = {
					  dimensions : [{axis : 1, name : 'Unit Type', value: "{Ut}"}],
					  measures : [{name : "Unit Count", value : "{Utcnt}"}],
					  data : {path : "/"}
					};
			vOnHireDataset = new sap.viz.ui5.data.FlattenedDataset(BarDataOnHireBack);
			oidOnhireCDB.setDataset(vOnHireDataset);
			oidOnhireCDB.setModel(oModelOnHireCDBSel);
		}else if(statGrpahOnHire == "hierarchyonhire"){
			sap.ui.getCore().byId("idBackOnhireGraph").setVisible(false);
			sap.ui.getCore().byId("idbtnViewAllOnhireCDB").setVisible(false);
			oModelOnHireCDBSel.setData(jsonHierarchyDataOnHire);
			
			BarDataOnHireBack = {
					  dimensions : [{axis : 1, name : 'Unit Type', value: "{Ct}"}],
					  measures : [{name : "Unit Count", value : "{Ctcnt}"}],
					  data : {path : "/"}
					};
			vOnHireDataset = new sap.viz.ui5.data.FlattenedDataset(BarDataOnHireBack);
			oidOnhireCDB.setDataset(vOnHireDataset);
			oidOnhireCDB.setModel(oModelOnHireCDBSel);
		}
		
		//RESET DATA FOR OFFHIRE
		var oOffhireClmnChartCDB = sap.ui.getCore().byId("idOffhireClmnChartCDB");
		var oModelOffHireCDB = new sap.ui.model.json.JSONModel();
		var BarDataOffHire;
		if(statGrpahOffHire == "unittypeoffhire"){
			if(categoryUnitOffhire != ''){
				sap.ui.getCore().byId("idBackOffhireGraph").setVisible(true);
			}else{
				sap.ui.getCore().byId("idBackOffhireGraph").setVisible(false);
			}
			if(jsonBindGraphOffHire.length > 0){
				sap.ui.getCore().byId("idbtnViewAllOffhireCDB").setVisible(true);
			}else{
				sap.ui.getCore().byId("idbtnViewAllOffhireCDB").setVisible(false);
			}
			
			BarDataOffHire = {
			  dimensions : [{axis : 1, name : 'Unit Type', value: "{Ut}"}],
			  measures : [{name : "Unit Count", value : "{Utcnt}"}],
			  data : {path : "/"}
			};

			oModelOffHireCDB = new sap.ui.model.json.JSONModel();
			oModelOffHireCDB.setData(jsonBindGraphOffHire);
			oOffhireClmnChartCDB.setModel(oModelOffHireCDB);
		}else if(statGrpahOffHire == "hierarchyoffhire"){
			sap.ui.getCore().byId("idBackOffhireGraph").setVisible(false);
			sap.ui.getCore().byId("idbtnViewAllOffhireCDB").setVisible(false);
			BarDataOffHire = {
					  dimensions : [{axis : 1, name : 'Unit Type', value: "{Ct}"}],
					  measures : [{name : "Unit Count", value : "{Ctcnt}"}],
					  data : {path : "/"}
					};

			oModelOffHireCDB = new sap.ui.model.json.JSONModel();
			oModelOffHireCDB.setData(jsonHierarchyDataOffHire);
			oOffhireClmnChartCDB.setModel(oModelOffHireCDB);			
		}
					
		var vOffHireDataset = new sap.viz.ui5.data.FlattenedDataset(BarDataOffHire);
		oOffhireClmnChartCDB.setDataset(vOffHireDataset);
		oOffhireClmnChartCDB.setModel(oModelOffHireCDB);
		
		//RESET DATA FOR RELEASE
		var oidTblRelCB = sap.ui.getCore().byId("idTblReleaseCB");
		var oModelRelTblCDBMActRelDtl = new sap.ui.model.json.JSONModel();
		oModelRelTblCDBMActRelDtl.setData(jsnRelTopRecordData);
		oidTblRelCB.setModel(oModelRelTblCDBMActRelDtl);
		oidTblRelCB.bindRows("/");
		if(jsnRelTopRecordDataVwAll.length >5){
			sap.ui.getCore().byId("idVAllActRelCDB").setVisible(true);
		}else{
			sap.ui.getCore().byId("idVAllActRelCDB").setVisible(false);
		}
		
		//RESET DATA FOR RETURN
		var oTblReturnCB = sap.ui.getCore().byId("idTblReturnCDB");
		var oModelCDBReturn = new sap.ui.model.json.JSONModel();
		oModelCDBReturn.setData(jsnReturnTopRecordData);
		oTblReturnCB.setModel(oModelCDBReturn);
		oTblReturnCB.bindRows("/");
		if(jsnReturnTopRecordDataVwAll.length > 5){
			sap.ui.getCore().byId("idVAllActRetrnCDB").setVisible(true);
		}else{
			sap.ui.getCore().byId("idVAllActRetrnCDB").setVisible(false);
		}
		
	}
});
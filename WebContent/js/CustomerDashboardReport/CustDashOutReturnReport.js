/*
 * MAC04082017 RTS 1841 - Improve Performance of Outstanding Redelivery
 * */

/*$*$------------------------------------------------------------------------*
*$*$ Modified By : Seyed Ismail MAC
*$*$ Modified On : 11.12.2017
*$*$ Reference   : APS 167
*$*$ Transport   :
*$*$ Tag         : MAC11122017
*$*$ Purpose     : Seaweb enhancements for MSC
*				   Search booking by reference number(including expired) MAC11122017_2
*$*$------------------------------------------------------------------*
*/

var globalLoadSavedDataCDORetRpt = [];	// MAC04082017 included this global variable
var aComboBoxArraysCOD = [];	// MAC11122017_2 +
var oModelCityComboCOD = new sap.ui.model.json.JSONModel();	// MAC11122017_2 +
var oModelCountryComboCOD = new sap.ui.model.json.JSONModel();	// MAC11122017_2 +
var oModelLeaseComboCOD = new sap.ui.model.json.JSONModel();	// MAC11122017_2 +
var oModelUtypeComboCOD = new sap.ui.model.json.JSONModel();	// MAC11122017_2 +
sap.ui.model.json.JSONModel.extend("CustDashOutReturnReport", {
    //CREATE DASHBORD HOME
	createCustDashOutReturnReport: function(){

		var oCurrCORetReport = this;
		// Responsive Grid Layout
		var oCustORetReportLayout = new sap.ui.layout.form.ResponsiveGridLayout({
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

		/*var roleTypeCDORetReport = objLoginUser.getLoggedInUserType();
		var custidCDORetReport = objLoginUser.getLoggedInUserID();

		var seacoUser = true;
		if(roleTypeCDORetReport == "SEACO"){
			seacoUser = true;
		}else{
			seacoUser = false;
		}*/

		var olblSelCutId = new sap.ui.commons.Label({text: "Customer ID:",
			required: true,
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
            wrapping: true}).addStyleClass("margin10");

		var oAutoCmpltSelCustCORetReport = new sap.ui.commons.ComboBox("idAutoCmpltSelCustCORetReport", {
			layoutData: new sap.ui.layout.GridData({span: "L4 M6 S12"}),
			width:"100%",
			//enabled: seacoUser,
			placeholder:"Select Customer",
			 change: function(evnt){
					if(this.getValue() != '')
					{
						this.setValueState(sap.ui.core.ValueState.None);
						this.setPlaceholder("Select Customer");
						oCurrCORetReport.populateCountryCityCOD(this.getSelectedKey()); // MAC11122017_2 +
					}
		          }
		}).addStyleClass("FormInputStyle marginTop7");

		//MAC11122017_2+

		var oLabelUtypeCOD = new sap.ui.commons.Label({text: "Unit Type",
			required: false,
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: true, margin: false}),
            wrapping: true}).addStyleClass("margin10");

		var oComboUtypeCOD = new sap.ui.commons.ComboBox("idComboUtypeCOD", {
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12"}),
			width:"100%",
			//enabled: seacoUser,
			placeholder:"Unit Type",
			 change: function(evnt){
					if(this.getValue() != '')
					{
						this.setValueState(sap.ui.core.ValueState.None);
						this.setPlaceholder("Select Unit Type");
					}
		          }
		}).addStyleClass("FormInputStyle marginTop7");

		var oLabelLeaseCOD = new sap.ui.commons.Label({text: "Lease",
			required: false,
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: true, margin: false}),
            wrapping: true}).addStyleClass("margin10");

		var oComboLeaseCOD = new sap.ui.commons.ComboBox("idComboLeaseCOD", {
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12"}),
			width:"100%",
			//enabled: seacoUser,
			placeholder:"Lease",
			 change: function(evnt){
					if(this.getValue() != '')
					{
						this.setValueState(sap.ui.core.ValueState.None);
						this.setPlaceholder("Select Lease");
					}
		          }
		}).addStyleClass("FormInputStyle marginTop7");

		var oLabelCountryCOD = new sap.ui.commons.Label({text: "Country",
			required: false,
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: true, margin: false}),
            wrapping: true}).addStyleClass("margin10");

		var oComboCountryCOD = new sap.ui.commons.ComboBox("idComboCountryCOD", {
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12"}),
			width:"100%",
			//enabled: seacoUser,
			placeholder:"Country",
			 change: function(evnt){
					if(this.getValue() != '')
					{
						this.setValueState(sap.ui.core.ValueState.None);
						this.setPlaceholder("Select Country");
					}
		          }
		}).addStyleClass("FormInputStyle marginTop7");

		var oLabelCityCOD = new sap.ui.commons.Label({text: "City",
			required: false,
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: true, margin: false}),
            wrapping: true}).addStyleClass("margin10");

		var oComboCityCOD = new sap.ui.commons.ComboBox("idComboCityCOD", {
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12"}),
			width:"100%",
			//enabled: seacoUser,
			placeholder:"City",
			 change: function(evnt){
					if(this.getValue() != '')
					{
						this.setValueState(sap.ui.core.ValueState.None);
						this.setPlaceholder("Select City");
					}
		          }
		}).addStyleClass("FormInputStyle marginTop7");


		var oLabelSelRedelId = new sap.ui.commons.Label({text: "Redelivery Ref:",
			required: true,
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: true, margin: false}),
            wrapping: true}).addStyleClass("margin10");

		var oInputSelRedelId = new sap.ui.commons.TextField("idInputSelRedelId", {
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12"}),
			placeholder:"Redelivery Ref.",
		}).addStyleClass("FormInputStyle marginTop7");
		//MAC11122017_2+

		//BELOW LABLE USED ONLY FOR PASSING VALUE TO NEXT SCREEN NOT TO SHOW LABLE ON SCREEN
		var olblSelCustid = new sap.ui.commons.Label('idlblSelCustidCDORetRpt');

		// Buttons
	   	var oBtnSubmitCORetReport = new sap.m.Button("idBtnoBtnSubmitCORetReport",{
				text : "Submit",
				width:"80px",
				styled:false,
				//visible:seacoUser,
				press:function(){
					var objCurntCustDORR = new CustDashOutReturnReport();
					objCurntCustDORR.getOnlineLoadData();
		}}).addStyleClass("submitBtn marginTop10");

	   	var oBtnResetCORetReport = new sap.m.Button("idBtnResetCORetReport",{
            text : "Reset",
            width:"80px",
            styled:false,
            layoutData: new sap.ui.layout.GridData({span: "L2 M5 S4",linebreak: true, margin: true}),
            press:function(){
            	oCurrCORetReport.resetScreenCurrCORetReport();
                  }}).addStyleClass("submitBtn marginTop10");

         var oLabelSpaceCORetReport = new sap.ui.commons.Label({text: " ",
                width:"8px",
                wrapping: true});

         var oFlexButtonsCORetReport = new sap.m.FlexBox({
             items: [
                                    oBtnSubmitCORetReport,
                                    oLabelSpaceCORetReport,
                                    oBtnResetCORetReport
             ],
             direction : "Row",
                      }).addStyleClass("marginTop10");

	    var labStar = new sap.ui.commons.Label({text: "* "}).addStyleClass("MandatoryStar");
	    var lblSpaceLegend = new sap.ui.commons.Label( {text: " ",width : '5px'});
		var labRequired = new sap.ui.commons.Label({text: " Mandatory Field",wrapping: true});

	   	var oLabelMandatory = new sap.ui.commons.Label({text: "Either of the fields required",	// MAC11122017_2
			required: true,
			requiredAtBegin : true,
            wrapping: true}).addStyleClass("margin10");

		//Form
		 var oCustORetReportForm = new sap.ui.layout.form.Form("idFrmCustORetReport", {
				 layout: oCustORetReportLayout,
				 formContainers: [
						 new sap.ui.layout.form.FormContainer("idFrmCntnrCustORetReport",{
							 formElements: [
												new sap.ui.layout.form.FormElement({
													fields: [olblSelCutId,oAutoCmpltSelCustCORetReport]
												}),
												new sap.ui.layout.form.FormElement({
													fields: [oLabelUtypeCOD,oComboUtypeCOD] // MAC11122017_2
												}),
												new sap.ui.layout.form.FormElement({
													fields: [oLabelLeaseCOD,oComboLeaseCOD] // MAC11122017_2
												}),
												new sap.ui.layout.form.FormElement({
													fields: [oLabelCountryCOD,oComboCountryCOD] // MAC11122017_2
												}),
												new sap.ui.layout.form.FormElement({
													fields: [oLabelCityCOD,oComboCityCOD] // MAC11122017_2
												}),
												new sap.ui.layout.form.FormElement({
													fields: [oLabelSelRedelId,oInputSelRedelId] // MAC11122017_2
												}),
												new sap.ui.layout.form.FormElement({
													fields: [oFlexButtonsCORetReport]
												}),
												new sap.ui.layout.form.FormElement({
													fields: [oLabelMandatory]
												}),
												new sap.ui.layout.form.FormElement({
													fields: [new sap.ui.commons.HorizontalDivider({width: "100%", type: "Area", height: "Medium"})]
												}),
												new sap.ui.layout.form.FormElement("idFrmElemntLoadDataCustORetReport",{
												    fields: []
												})
										 ]
						 })
				 ]
		 });

		 this.getOnlineCutomerList();
		 return oCustORetReportForm;
	},

	// MAC11122017_2 +
	   populateCountryCityCOD : function(customer){

			//busyDialog.open();
			aComboBoxArraysCOD.aCountryCombo = [];
			aComboBoxArraysCOD.aCityCombo = [];
			aComboBoxArraysCOD.aLeaseCombo = [];
			aComboBoxArraysCOD.aUtypeCombo = [];
			var urlToCall = serviceUrl + "/bookf4Set?$filter=Customer eq '" + customer + "' and Extra1 eq 'REDEL'"; // MAC11122017_1 +
			oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
			OData.request({
			      requestUri: urlToCall,
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
			    	var dataLen = data.results.length;
			    	for ( var i = 0; i < dataLen ; i++) {
			    		if(data.results[i].ZCouDesc != ""){
			    			aComboBoxArraysCOD.aCountryCombo[i] = data.results[i].ZCouDesc;
			    		}
			    		if(data.results[i].ZCityDesc != ""){
			    			aComboBoxArraysCOD.aCityCombo[i] = data.results[i].ZCityDesc;
			    		}
			    		if(data.results[i].LeaseNo != ""){
			    			aComboBoxArraysCOD.aLeaseCombo[i] = data.results[i].LeaseNo;
			    		}
			    		if(data.results[i].UnitType != ""){
			    			aComboBoxArraysCOD.aUtypeCombo[i] = data.results[i].UnitType;
			    		}
					}

			    	aComboBoxArraysCOD.aCountryCombo = deleteduplicates(aComboBoxArraysCOD.aCountryCombo);
			    	aComboBoxArraysCOD.aCityCombo = deleteduplicates(aComboBoxArraysCOD.aCityCombo);
			    	aComboBoxArraysCOD.aLeaseCombo = deleteduplicates(aComboBoxArraysCOD.aLeaseCombo);
			    	aComboBoxArraysCOD.aUtypeCombo = deleteduplicates(aComboBoxArraysCOD.aUtypeCombo);

//			    	var dataLen = data.results.length;
//			    	for ( var i = 0; i < dataLen ; i++) {
//			    		aComboBoxArraysCOD.aCityCombo[i] = data.results[i];
//					}
//			    	oModelCityComboCOD.setData(aComboBoxArraysCOD);

			    	oModelCityComboCOD.setData(aComboBoxArraysCOD);
					var oComboCityCOD = sap.ui.getCore().byId("idComboCityCOD");
					oComboCityCOD.setModel(oModelCityComboCOD);
					oComboCityCOD.bindItems("/aCityCombo",new sap.ui.core.ListItem({text: "{}"}));

					oModelCityComboCOD.updateBindings();

					oModelCountryComboCOD.setData(aComboBoxArraysCOD);
					var oComboCountryCOD = sap.ui.getCore().byId("idComboCountryCOD");
					oComboCountryCOD.setModel(oModelCountryComboCOD);
					oComboCountryCOD.bindItems("/aCountryCombo",new sap.ui.core.ListItem({text: "{}"}));

					oModelCountryComboCOD.updateBindings();

					oModelLeaseComboCOD.setData(aComboBoxArraysCOD);
					var oComboLeaseCOD = sap.ui.getCore().byId("idComboLeaseCOD");
					oComboLeaseCOD.setModel(oModelLeaseComboCOD);
					oComboLeaseCOD.bindItems("/aLeaseCombo",new sap.ui.core.ListItem({text: "{}"}));

					oModelLeaseComboCOD.updateBindings();

					oModelUtypeComboCOD.setData(aComboBoxArraysCOD);
					var oComboUtypeCOD = sap.ui.getCore().byId("idComboUtypeCOD");
					oComboUtypeCOD.setModel(oModelUtypeComboCOD);
					oComboUtypeCOD.bindItems("/aUtypeCombo",new sap.ui.core.ListItem({text: "{}"}));

					oModelUtypeComboCOD.updateBindings();

			    },
			    function(err){
			    	busyDialog.close();
			    	errorfromServer(err);
			    	//alert("Error while reading region : "+ window.JSON.stringify(err.response));
			    });

		},
		// MAC11122017_2 +

	//GET ONLINE CUSTOMER LIST
	getOnlineCutomerList: function(){
	   try{
		   sap.ui.getCore().byId("idAutoCmpltSelCustCORetReport").destroyItems();
		   busyDialog.open();
		   var objCurntCustDORR = new CustDashOutReturnReport();
		   var urlToCall ='';
		   //var roleTypeCDORetReport = objLoginUser.getLoggedInUserType();
			//var custidCDORetReport = objLoginUser.getLoggedInUserID();

			if(objLoginUser.getLoggedInUserType().toUpperCase() == "SEACO"){
				urlToCall = serviceUrl + "/F4_Customer_NameId_Appended";
			}else{
				urlToCall = serviceUrl + "/F4_Multiple_Cust?$filter=Bname eq '"+ objLoginUser.getLoggedInUserName().toUpperCase() +"' and Customer eq '' and Param1 eq ''";
			}

		   var objUtil = new utility();
		   objUtil.doOnlineRequest(urlToCall,objCurntCustDORR.getOnlineCutomerListSuccess, objCurntCustDORR.getOnlineCutomerListError);
	   }catch(e){
		   busyDialog.close();
			sap.ui.commons.MessageBox.alert("Error on occured while processing request: " + e);
	   }
   },

    //ON SUCCESS FOR CUSTOMER LIST
	getOnlineCutomerListSuccess: function(resultdata, response){
	   var oAutoCmpltSelCustCORetReport = sap.ui.getCore().byId("idAutoCmpltSelCustCORetReport");
	   try{
				oAutoCmpltSelCustCORetReport.insertItem((new sap.ui.core.ListItem({text:"", key:"0"})),0);
				oAutoCmpltSelCustCORetReport.setSelectedKey("0");
				if(resultdata != undefined){
					if(resultdata.results.length > 0){
						oModelCCustDbrd = new sap.ui.model.json.JSONModel(resultdata.results);
						for(var j =0; j<resultdata.results.length;j++){
							oAutoCmpltSelCustCORetReport.addItem(new sap.ui.core.ListItem({text:resultdata.results[j].CustName,
														key: resultdata.results[j].Partner, additionalText: resultdata.results[j].Partner}));
						}

						/*var roleTypeCDORetReport = objLoginUser.getLoggedInUserType();
						if(roleTypeCDORetReport != 'SEACO'){
							var custidCDORetReport = objLoginUser.getLoggedInUserID();
							//custidCDORetReport = '100249';
							oAutoCmpltSelCustCORetReport.setSelectedKeyCustm(custidCDORetReport);
							//MAKE ONLINE REQUEST FOR DATA NON SEACO USER
							var objCurntCustDORR = new CustDashOutReturnReport();
							objCurntCustDORR.getOnlineLoadData();
							return;
						}*/
					}
				}
				 busyDialog.close();
	   }catch(e){
		   busyDialog.close();
			sap.ui.commons.MessageBox.alert("Error occured while processing request: " + e);
	   }
   },

	//ON ERROR FOR CUSTOMER LIST
    getOnlineCutomerListError: function(e){
    	busyDialog.close();
    	var oAutoCmpltSelCustCORetReport = sap.ui.getCore().byId("idAutoCmpltSelCustCORetReport");
    	oAutoCmpltSelCustCORetReport.insertItem((new sap.ui.core.ListItem({text:"Select Customer", key:"0"})),0);
    	oAutoCmpltSelCustCORetReport.setSelectedKey("0");
    	errorfromServer(e);
   },

 //LOAD DATA FOR SELECTED CUSTOMER
	getOnlinesuccessLoadData: function(resultdata, response){
		busyDialog.close();
		jQuery.sap.require("sap.ui.model.json.JSONModel");
		var jsnLoadSavedDataCDORetRpt = [];
		var objUtil = new utility();

		if(resultdata != undefined){
			jsnLoadSavedDataCDORetRpt = [];
			globalLoadSavedDataCDORetRpt = [];
			for(var indx in resultdata.results){
				var datenw = resultdata.results[indx].ExpiryDate.split('(')[1].split(')')[0];
				var dateForSort = new Date(Number(datenw));
				var cnvrtDate=   dateFormat(new Date(Number(datenw)), 'dd-mm-yyyy',"UTC");
				if(resultdata.results[indx].Extra1 == 'PAGE2'){
				globalLoadSavedDataCDORetRpt.push({
					"Lease": objUtil.removeLeadZero($.trim(resultdata.results[indx].Lease)),
					"Ordno":objUtil.removeLeadZero($.trim(resultdata.results[indx].Ordno)),
					"UnitType": resultdata.results[indx].UnitType,
					"UnitDesc": resultdata.results[indx].UnitDesc,
					"City": resultdata.results[indx].City,
					"Location": resultdata.results[indx].Location,
					"Depot": resultdata.results[indx].Depot,
					"TotQty": resultdata.results[indx].TotQty,
					"ReturnQty": resultdata.results[indx].ReturnQty,
					"OutstandQty": resultdata.results[indx].OutstandQty,
					"Status": resultdata.results[indx].Status,
					"ExpiryDate": cnvrtDate,
					"ExpiryDateSort" : dateForSort,
					"Extra1" : resultdata.results[indx].Extra1,
					"Keys": resultdata.results[indx].Keys,
					"Offdate": resultdata.results[indx].OffDate,
					"Sernr": resultdata.results[indx].Sernr
				});
				}else if(resultdata.results[indx].Extra1 == 'PAGE1'){	// MAC04082017 + included this condition
				jsnLoadSavedDataCDORetRpt.push({
						"Lease": objUtil.removeLeadZero($.trim(resultdata.results[indx].Lease)),
						"Ordno":objUtil.removeLeadZero($.trim(resultdata.results[indx].Ordno)),
						"UnitType": resultdata.results[indx].UnitType,
						"UnitDesc": resultdata.results[indx].UnitDesc,
						"City": resultdata.results[indx].City,
						"Location": resultdata.results[indx].Location,
						"Depot": resultdata.results[indx].Depot,
						"TotQty": resultdata.results[indx].TotQty,
						"ReturnQty": resultdata.results[indx].ReturnQty,
						"OutstandQty": resultdata.results[indx].OutstandQty,
						"Status": resultdata.results[indx].Status,
						"ExpiryDate": cnvrtDate,
						"ExpiryDateSort" : dateForSort,
						"Extra1" : resultdata.results[indx].Extra1,
						"Keys": resultdata.results[indx].Keys,
						"Offdate": resultdata.results[indx].OffDate,
						"Sernr": resultdata.results[indx].Sernr
					});
			}
			}
		}

		if(jsnLoadSavedDataCDORetRpt.length == 1){
			if((jsnLoadSavedDataCDORetRpt[0].Lease == '') && ($.trim(jsnLoadSavedDataCDORetRpt[0].Ordno) == '')){
					sap.ui.commons.MessageBox.alert("No redeliveries found, please contact your local customer services for details.");
			}else{
				var objCurntCustDORR = new CustDashOutReturnReport();
				sap.ui.getCore().byId("idFrmElemntLoadDataCustORetReport").insertField(objCurntCustDORR.createTableLoadSavedData(jsnLoadSavedDataCDORetRpt));
			}
		}else if(jsnLoadSavedDataCDORetRpt.length > 1){
			var objCurntCustDORR = new CustDashOutReturnReport();
			sap.ui.getCore().byId("idFrmElemntLoadDataCustORetReport").insertField(objCurntCustDORR.createTableLoadSavedData(jsnLoadSavedDataCDORetRpt));
		}else{
			sap.ui.commons.MessageBox.alert("No redeliveries found, please contact your local customer services for details.");
		}

	},

	getOnlineerrorLoadData: function(err){
		sap.ui.getCore().byId("idFrmElemntLoadDataCustORetReport").destroyFields();
		errorfromServer(err);
	},

	getOnlineLoadData: function(){
		sap.ui.getCore().byId("idFrmElemntLoadDataCustORetReport").destroyFields();
		var isCustomerValid = true; // MAC11122017_2 +
		var isRedelValid = true; // MAC11122017_2 +
		try{
			var oAutoCmpltSelCustCORetReport = sap.ui.getCore().byId("idAutoCmpltSelCustCORetReport");
			if($.trim(oAutoCmpltSelCustCORetReport.getProperty('selectedKey')) == ''){
				// MAC11122017_2 -
//				oAutoCmpltSelCustCORetReport.setValueState(sap.ui.core.ValueState.Error);
//				if(oAutoCmpltSelCustCORetReport.getValue() != ''){
//					oAutoCmpltSelCustCORetReport.setValue('');
//					oAutoCmpltSelCustCORetReport.setPlaceholder("Invalid Value");
//				}else{
//					oAutoCmpltSelCustCORetReport.setPlaceholder("Required");
//				}

				// return false;
				// MAC11122017_2 -
				isCustomerValid = false;	// MAC11122017_2 +
			}
			// MAC11122017_2 +
			var redelref = sap.ui.getCore().byId("idInputSelRedelId").getValue();
			if(redelref){

			}else{
				isRedelValid = false;
			}


			if(!isCustomerValid && !isRedelValid){
				sap.ui.commons.MessageBox.alert("Please enter either customer or redelivery ref.");
				return false;
			}
			// MAC11122017_2 +
			oAutoCmpltSelCustCORetReport.setValueState(sap.ui.core.ValueState.None);
			oAutoCmpltSelCustCORetReport.setPlaceholder("Select Customer");

			sap.ui.getCore().byId("idInputSelRedelId").setValueState(sap.ui.core.ValueState.None);	// MAC11122017_2 +
			sap.ui.getCore().byId("idInputSelRedelId").setPlaceholder("Redelivery Ref.");	// MAC11122017_2 +

			busyDialog.open();
			// MAC11122017_2 +
			var country = sap.ui.getCore().byId('idComboCountryCOD').getValue();
			var city = sap.ui.getCore().byId('idComboCityCOD').getValue();
			var lease = sap.ui.getCore().byId('idComboLeaseCOD').getValue();
			var utype = sap.ui.getCore().byId('idComboUtypeCOD').getValue();
			var extra1 = country + '$' + city + '$' + lease + '$' + utype;
			// MAC11122017_2 +
			var urlToCall = serviceUrl + "/Out_Redelivery_CR?";
				//urlToCall += "$filter=Bname eq '' and Customer eq '" + oAutoCmpltSelCustCORetReport.getSelectedKey() + "'";	// MAC11122017_2 -
				urlToCall += "$filter=Customer eq '" + oAutoCmpltSelCustCORetReport.getSelectedKey() + "'";
				urlToCall += "and Extra1 eq '" + extra1 + "' and Extra2 eq '' and " + // MAC11122017_2 + included extra1
				"Extra3 eq '" + sap.ui.getCore().byId("idInputSelRedelId").getValue() +
				"' and Extra4 eq datetime'9999-09-09T00:00:00'";

			var objUtil = new utility();
			var objCurntCustDORR = new CustDashOutReturnReport();
			objUtil.doOnlineRequest(urlToCall,objCurntCustDORR.getOnlinesuccessLoadData, objCurntCustDORR.getOnlineerrorLoadData);
		}catch(e){
			busyDialog.close();
			sap.ui.commons.MessageBox.alert("Error on loading Estimate" + e);
		}
	},

	createTableLoadSavedData: function(jsnLoadSavedDataCDORetRpt){
		var olblTblHdrCustOutRelRep = new sap.ui.commons.Label({text: 'Redelivery Summary for ' + sap.ui.getCore().byId("idAutoCmpltSelCustCORetReport").getValue(), wrapping: true}).addStyleClass("font15Bold marginTop10");

		sap.ui.getCore().byId('idlblSelCustidCDORetRpt').setText(sap.ui.getCore().byId("idAutoCmpltSelCustCORetReport").getValue());

		var oidTblRelSummDataCDORetR = new sap.ui.table.Table(
			{
				columnHeaderHeight : 45,
				enableColumnReordering: false,
				selectionMode : sap.ui.table.SelectionMode.None,
				navigationMode : sap.ui.table.NavigationMode.None,
				//layoutData: new sap.ui.layout.GridData({span: "L12 M12 S12",linebreak: false, margin: false}),
			}).addStyleClass('tblBorder marginTop10');

		oidTblRelSummDataCDORetR.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({text : "Lease"}).addStyleClass("wraptextcol"),
			template : new sap.ui.commons.TextView().bindProperty("text", "Lease"),
			width : "70px",
			sortProperty: "Lease",
			filterProperty: "Lease",
			resizable:false
		}));

		oidTblRelSummDataCDORetR.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({text : "Return"}).addStyleClass("wraptextcol"),
			template : new sap.ui.commons.TextView().bindProperty("text", "Ordno"),
			width : "80px",
			sortProperty: "Ordno",
			filterProperty: "Ordno",
			resizable:false
		}));

		oidTblRelSummDataCDORetR.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({text : "Unit Description"}).addStyleClass("wraptextcol"),
			template : new sap.ui.commons.TextView().bindProperty("text", "UnitDesc"),
			width : "120px",
			sortProperty: "UnitDesc",
			filterProperty: "UnitDesc",
			resizable:false
		}));

		oidTblRelSummDataCDORetR.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({text : "Location"}).addStyleClass("wraptextcol"),
			template : new sap.ui.commons.TextView().bindProperty("text", "Location"),
			width : "80px",
			sortProperty: "Location",
			filterProperty: "Location",
			resizable:false
		}));

		oidTblRelSummDataCDORetR.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({text : "Depot"}).addStyleClass("wraptextcol"),
			template : new sap.ui.commons.TextView().bindProperty("text", "Depot"),
			width : "120px",
			sortProperty: "Depot",
			filterProperty: "Depot",
			resizable:false
		}));

		var oBtnTblQtyPkd = new sap.ui.commons.Link({
			////width : "50px",
            press : function(vTblhdr) {
				 new CustDashOutReturnReport().getOnlineCDORetRptDtl(this.getHelpId());
			}}).bindProperty("helpId","Keys").bindProperty("text","TotQty");

		oidTblRelSummDataCDORetR.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({text : "Total Quantity"}).addStyleClass("wraptextcol"),
			template : oBtnTblQtyPkd,
			width : "80px",
			sortProperty: "TotQty",
			filterProperty: "TotQty",
			resizable:false
		}));

		oidTblRelSummDataCDORetR.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({text : "Quantity Returned"}).addStyleClass("wraptextcol"),
			template : new sap.ui.commons.TextView().bindProperty("text", "ReturnQty"),
			width : "80px",
			sortProperty: "ReturnQty",
			filterProperty: "ReturnQty",
			resizable:false
		}));

		oidTblRelSummDataCDORetR.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({text : "Outstanding Quantity"}).addStyleClass("wraptextcol"),
			template : new sap.ui.commons.TextView().bindProperty("text", "OutstandQty"),
			width : "100px",
			sortProperty: "OutstandQty",
			filterProperty: "OutstandQty",
			resizable:false
		}));

		/*oidTblRelSummDataCDORetR.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({text : "Status"}),
			template : new sap.ui.commons.TextView().bindProperty("text", "Status"),
			width : "80px",
			sortProperty: "Status",
			filterProperty: "Status",
			resizable:false
		}));*/

		oidTblRelSummDataCDORetR.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({text : "Expiry Date"}).addStyleClass("wraptextcol"),
			template : new sap.ui.commons.TextView().bindProperty("text", "ExpiryDate"),
			width : "90px",
			sortProperty: "ExpiryDateSort",
			filterProperty: "ExpiryDate",
			resizable:false
		}));

		var obtnExportExlCORetReport = new sap.m.Button("idbtnExportExlCORetReport",{
            text : "Export To Excel",
			visible:false,
            type:sap.m.ButtonType.Unstyled,
            //icon: sap.ui.core.IconPool.getIconURI("excel-attachment"),
            icon: sap.ui.core.IconPool.getIconURI("excel-attachment"),
            press:function(){
            	var objUtil = new utility();
            	//original  var arrDiplHdrExprt = ['Lease','Return','Unit Description','Location','Depot','Total Quantity', 'Quantity Returned','Outstanding Quantity','Status','Expiry Date'];
            	//original  var arrDiplFieldExprt = ['Lease','Ordno','UnitDesc','Location','Depot','TotQty','ReturnQty','OutstandQty','Status','ExpiryDate'];

            	var arrDiplHdrExprt = ['Lease','Return','Unit Description','Location','Depot','Total Quantity', 'Quantity Returned','Outstanding Quantity','Expiry Date'];
            	var arrDiplFieldExprt = ['Lease','Ordno','UnitDesc','Location','Depot','TotQty','ReturnQty','OutstandQty','ExpiryDate'];

            	var TblHdrExcl = 'Redelivery Summary for ' + sap.ui.getCore().byId("idlblSelCustidCDORetRpt").getText();
				objUtil.ExportUtility(jsnLoadSavedDataCDORetRpt,arrDiplHdrExprt,arrDiplFieldExprt, TblHdrExcl,"export");
            }
         }).addStyleClass("submitBtn");

		var obtnVAllCustOutRelRptr = new sap.m.Button({
            text : "View All",
            type:sap.m.ButtonType.Unstyled,
            visible:false,
            press:function(){
						this.setVisible(false);
						 if(jsnLoadSavedDataCDORetRpt.length < 100){
							 oidTblRelSummDataCDORetR.setVisibleRowCount(jsnLoadSavedDataCDORetRpt.length);
							 oidTblRelSummDataCDORetR.setNavigationMode(sap.ui.table.NavigationMode.None);
					   }else{
						   oidTblRelSummDataCDORetR.setVisibleRowCount(100);
						   oidTblRelSummDataCDORetR.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
					   }
                  }
         }).addStyleClass("submitBtn marginTop10");

		var oMdlLoadDataCDORetRep = new sap.ui.model.json.JSONModel();
		/*oMdlLoadDataCDORetRep.setData({modelData : []});
		oidTblRelSummDataCDORetR.setModel(oMdlLoadDataCDORetRep);
		oidTblRelSummDataCDORetR.bindRows("/modelData");*/

		oMdlLoadDataCDORetRep.setData({modelData : jsnLoadSavedDataCDORetRpt});
		oidTblRelSummDataCDORetR.setModel(oMdlLoadDataCDORetRep);
		oidTblRelSummDataCDORetR.bindRows("/modelData");
		if(jsnLoadSavedDataCDORetRpt.length < 1){
			oidTblRelSummDataCDORetR.setVisibleRowCount(5);
			oidTblRelSummDataCDORetR.setNavigationMode(sap.ui.table.NavigationMode.None);
		}else if((jsnLoadSavedDataCDORetRpt.length == 1) && (jsnLoadSavedDataCDORetRpt[0].Message == 'No saved estimates found')){
			jsnLoadSavedDataCDORetRpt.length = 0;
			oidTblRelSummDataCDORetR.bindRows("/modelData");
			oidTblRelSummDataCDORetR.setVisibleRowCount(5);
			oidTblRelSummDataCDORetR.setNavigationMode(sap.ui.table.NavigationMode.None);
		}
		else if(jsnLoadSavedDataCDORetRpt.length < 26){
			obtnExportExlCORetReport.setVisible(true);
			oidTblRelSummDataCDORetR.setVisibleRowCount(jsnLoadSavedDataCDORetRpt.length);
			oidTblRelSummDataCDORetR.setNavigationMode(sap.ui.table.NavigationMode.None);
		}else{
			obtnExportExlCORetReport.setVisible(true);
			obtnVAllCustOutRelRptr.setVisible(true);
			oidTblRelSummDataCDORetR.setVisibleRowCount(25);
			oidTblRelSummDataCDORetR.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		}


		var oflxHdrCORetReport = new sap.m.FlexBox({
			  items:[olblTblHdrCustOutRelRep],
			  width:"70%",
			  direction: "Row"
			 });//.addStyleClass("marginTop10");

		var oflxHdrCORetReport2 = new sap.m.FlexBox({
			  items:[obtnExportExlCORetReport],
			  width:"30%",
			  direction: "RowReverse"
			 });//.addStyleClass("marginTop10");

		var oflxHdrCORetReportMain = new sap.m.FlexBox({
			  items:[oflxHdrCORetReport, oflxHdrCORetReport2],
			  width:"100%",
			  direction: "Row"
			 }).addStyleClass("marginTop10");

		var oFlxFinlCDORetReport = new sap.m.FlexBox({
			  items:[oflxHdrCORetReportMain, oidTblRelSummDataCDORetR, obtnVAllCustOutRelRptr],
			  //width:"90%",
			  layoutData: new sap.ui.layout.GridData({span: "L12 M12 S12",linebreak: false, margin: false}),
			  direction: "Column"
			 }).addStyleClass("marginTop10");

		return oFlxFinlCDORetReport;
	},

	//LOAD DATA FOR DETAILS SCREEN
	getOnlinesuccessCDORetRptDtl: function(resultdata, response){
		busyDialog.close();
		jQuery.sap.require("sap.ui.model.json.JSONModel");
		var jsnLoadSavedDataCDORetDtlRpt = [];
		var objUtil = new utility();

		if(resultdata != undefined){
			for(var indx in resultdata.results){
				var dateForSort, cnvrtDate;
				//var datenw = resultdata.results[indx].ExpiryDate.split('(')[1].split(')')[0];
				//cnvrtDate=  new Date(parseInt(datenw)).format("dd-mm-yyyy");
				if($.trim(resultdata.results[indx].OffDate) != 'X'){
					//var datenw = resultdata.results[indx].OffDate.split('-');
					var pattern = /(\d{2})\-(\d{2})\-(\d{4})/;
					 dateForSort = new Date(resultdata.results[indx].Extra1.replace(pattern,'$3-$2-$1'));
					//var cnvrtDate=   dateFormat(new Date(Number(datenw)), 'dd-mm-yyyy',"UTC");
				}else{
					 dateForSort = new Date('9999-09-09T00:00:00');
				}

				jsnLoadSavedDataCDORetDtlRpt.push({
					"Extra2":resultdata.results[indx].Extra2,
					"Extra1":resultdata.results[indx].Extra1,
					"TblHdr": 'Redelivery Details for ' + sap.ui.getCore().byId("idlblSelCustidCDORetRpt").getText(), //resultdata.results[indx].Customer,
					"OffDate": resultdata.results[indx].Extra1,
					"OffDateSort": dateForSort,
					"Sernr": resultdata.results[indx].Sernr,
					"Depot": resultdata.results[indx].Depot,
					"Location": resultdata.results[indx].Location,
					"City": resultdata.results[indx].City,
					"UnitDesc": resultdata.results[indx].UnitDesc,
					"Ordno": resultdata.results[indx].Ordno,
					"Lease": objUtil.removeLeadZero($.trim(resultdata.results[indx].Lease)),
					"UnitType":resultdata.results[indx].UnitType
				});
			}
		}
		//var objCurntCustDORR = new CustDashOutReturnReport();
		if(jsnLoadSavedDataCDORetDtlRpt.length > 0){
			var vTblhdr = 'Redelivery Details for ' + sap.ui.getCore().byId("idlblSelCustidCDORetRpt").getText();
			var bus = sap.ui.getCore().getEventBus();
	    	bus.publish("nav", "to", {id : "CustOutReturnDtlReportVw", data: {bindData: jsnLoadSavedDataCDORetDtlRpt, relDtlFor: vTblhdr}});

		}else{
			sap.ui.commons.MessageBox.alert("No Record found for the selected Row, please contact your local customer services for details.");
		}
	},

	getOnlineerrorCDORetRptDtl: function(err){
		errorfromServer(err);
	},

	getOnlineCDORetRptDtl: function(inputpara){
		/* MAC_04082017 -

		try{
			var datasplt = inputpara.split('|');
			busyDialog.open();
			var urlToCall = serviceUrl + "/Detl_Outstanding_Booking_CR?";
				urlToCall += "$filter=Bname eq '' and Lease eq '" + datasplt[0] + "'";
				urlToCall += " and Ordno eq '" + datasplt[1] + "'";
				urlToCall += " and UnitType eq '" + datasplt[2] + "'";
				urlToCall += " and City  eq '" + datasplt[3] + "'";
				urlToCall += " and Customer eq ''";

			var objUtil = new utility();
			var objCurntCustDORR = new CustDashOutReturnReport();
			objUtil.doOnlineRequest(urlToCall,objCurntCustDORR.getOnlinesuccessCDORetRptDtl, objCurntCustDORR.getOnlineerrorCDORetRptDtl);
		}catch(e){
			busyDialog.close();
			sap.ui.commons.MessageBox.alert("Error on loading Estimate" + e);
		} MAC_04082017 - */

		/*MAC_04082017+*/
		var objCurntCustDORR = new CustDashOutReturnReport();
		objCurntCustDORR.getOnlinesuccessCDORetRptDtlNew(inputpara);
		/*MAC_04082017+*/
	},

	/*MAC_04082017+*/
	getOnlinesuccessCDORetRptDtlNew : function(inputpara){

		jQuery.sap.require("sap.ui.model.json.JSONModel");
		var jsnLoadSavedDataCDORetDtlRpt = [];
		var objUtil = new utility();
		var datasplt = inputpara.split('|');
			for(var indx in globalLoadSavedDataCDORetRpt){
				if(globalLoadSavedDataCDORetRpt[indx].Lease == parseInt(datasplt[0]) && globalLoadSavedDataCDORetRpt[indx].Ordno == parseInt(datasplt[1])
							&& globalLoadSavedDataCDORetRpt[indx].UnitType == datasplt[2] && globalLoadSavedDataCDORetRpt[indx].City == datasplt[3]){
				/*if($.trim(resultdata.results[indx].OffDate) != 'X'){
					var pattern = /(\d{2})\-(\d{2})\-(\d{4})/;
					 dateForSort = new Date(resultdata.results[indx].Extra1.replace(pattern,'$3-$2-$1'));
				}else{
					 dateForSort = new Date('9999-09-09T00:00:00');
				}*/
				if(globalLoadSavedDataCDORetRpt[indx].Offdate != null){
				var datenw = globalLoadSavedDataCDORetRpt[indx].Offdate.split('(')[1].split(')')[0];
				var dateForSort = new Date(Number(datenw));
				var cnvrtDate=   dateFormat(new Date(Number(datenw)), 'dd-mm-yyyy',"UTC");
				}else{
					var dateForSort = "";
				    var cnvrtDate = "";
				}
				jsnLoadSavedDataCDORetDtlRpt.push({
					//"Extra2":resultdata.results[indx].Extra2,
					//"Extra1":resultdata.results[indx].Extra1,
					//"TblHdr": 'Redelivery Details for ' + sap.ui.getCore().byId("idlblSelCustidCDORetRpt").getText(), //resultdata.results[indx].Customer,
					"Sernr": globalLoadSavedDataCDORetRpt[indx].Sernr,
					"Depot": globalLoadSavedDataCDORetRpt[indx].Depot,
					"Location": globalLoadSavedDataCDORetRpt[indx].Location,
					"City": globalLoadSavedDataCDORetRpt[indx].City,
					"UnitDesc": globalLoadSavedDataCDORetRpt[indx].UnitDesc,
					"Ordno": globalLoadSavedDataCDORetRpt[indx].Ordno,
					"Lease": objUtil.removeLeadZero($.trim(globalLoadSavedDataCDORetRpt[indx].Lease)),
					"UnitType":globalLoadSavedDataCDORetRpt[indx].UnitType,
					"OffDate": cnvrtDate,
					"OffDateSort": dateForSort
				});
			}
			}

		//var objCurntCustDORR = new CustDashOutReturnReport();
		if(jsnLoadSavedDataCDORetDtlRpt.length > 0){
			var vTblhdr = 'Redelivery Details for ' + sap.ui.getCore().byId("idlblSelCustidCDORetRpt").getText();
			var bus = sap.ui.getCore().getEventBus();
	    	bus.publish("nav", "to", {id : "CustOutReturnDtlReportVw", data: {bindData: jsnLoadSavedDataCDORetDtlRpt, relDtlFor: vTblhdr}});

		}else{
			sap.ui.commons.MessageBox.alert("No Record found for the selected Row, please contact your local customer services for details.");
		}

	},
	/*MAC_04082017+*/

	resetScreenCurrCORetReport: function(){
		var idAutoCmpltSelCustCORetReport = sap.ui.getCore().byId("idAutoCmpltSelCustCORetReport");
		idAutoCmpltSelCustCORetReport.setValueState(sap.ui.core.ValueState.None);
		idAutoCmpltSelCustCORetReport.setPlaceholder("Select Customer");

		idAutoCmpltSelCustCORetReport.setValue("");
		idAutoCmpltSelCustCORetReport.setSelectedKey("");

		// MAC11122017_2 +

		var oComboCountryCOD = sap.ui.getCore().byId("idComboCountryCOD");
		oComboCountryCOD.setValueState(sap.ui.core.ValueState.None);
		oComboCountryCOD.setPlaceholder("Select Country");

		oComboCountryCOD.setValue("");
		oComboCountryCOD.setSelectedKey("");

		var oComboCityCOD = sap.ui.getCore().byId("idComboCityCOD");
		oComboCityCOD.setValueState(sap.ui.core.ValueState.None);
		oComboCityCOD.setPlaceholder("Select Country");

		oComboCityCOD.setValue("");
		oComboCityCOD.setSelectedKey("");

		var oComboLeaseCOD = sap.ui.getCore().byId("idComboLeaseCOD");
		oComboLeaseCOD.setValueState(sap.ui.core.ValueState.None);
		oComboLeaseCOD.setPlaceholder("Select Lease");

		oComboLeaseCOD.setValue("");
		oComboLeaseCOD.setSelectedKey("");

		var oComboUtypeCOD = sap.ui.getCore().byId("idComboUtypeCOD");
		oComboUtypeCOD.setValueState(sap.ui.core.ValueState.None);
		oComboUtypeCOD.setPlaceholder("Select Unit Type");

		oComboUtypeCOD.setValue("");
		oComboUtypeCOD.setSelectedKey("");

		sap.ui.getCore().byId("idInputSelRedelId").setPlaceholder("Redelivery Ref.");
		sap.ui.getCore().byId("idInputSelRedelId").setValueState(sap.ui.core.ValueState.None);
		sap.ui.getCore().byId("idInputSelRedelId").setValue("");

		// MAC11122017_2 +

		sap.ui.getCore().byId("idFrmElemntLoadDataCustORetReport").destroyFields();
	}
});

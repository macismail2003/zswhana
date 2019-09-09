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
var aComboBoxArraysCOR = [];	// MAC11122017_2 +
var oModelCityComboCOR = new sap.ui.model.json.JSONModel();	// MAC11122017_2 +
var oModelCountryComboCOR = new sap.ui.model.json.JSONModel();	// MAC11122017_2 +
var oModelLeaseComboCOR = new sap.ui.model.json.JSONModel();	// MAC11122017_2 +
var oModelUtypeComboCOR = new sap.ui.model.json.JSONModel();	// MAC11122017_2 +
var globalLoadSavedDataBooking = [];	// MAC04082017 included this global variable
sap.ui.model.json.JSONModel.extend("CustDashOutRelReport", {
    //CREATE DASHBORD HOME
	createCustDashOutRelReport: function(){

		var oCurrOutRelReport = this;
		// Responsive Grid Layout
		var oCustORReportLayout = new sap.ui.layout.form.ResponsiveGridLayout({
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

		/*var roleTypeCDORReport = objLoginUser.getLoggedInUserType();
		var custidCDORReport = objLoginUser.getLoggedInUserID();

		var seacoUser = false;
		if(roleTypeCDORReport == "SEACO"){
			seacoUser = true;
		}else{
			seacoUser = false;
		}*/

		var olblSelCutId = new sap.ui.commons.Label({text: "Customer ID:",
			required: true,
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
            wrapping: true}).addStyleClass("margin10");

		var oAutoCmpltSelCustCORReport = new sap.ui.commons.ComboBox("idAutoCmpltSelCustCORReport", {
			layoutData: new sap.ui.layout.GridData({span: "L4 M6 S12"}),
			width:"100%",
			//enabled: seacoUser,
			placeholder:"Select Customer",
			 change: function(evnt){
					if(this.getValue() != '')
					{
						this.setValueState(sap.ui.core.ValueState.None);
						this.setPlaceholder("Select Customer");
						oCurrOutRelReport.populateCountryCityCOR(this.getSelectedKey()); // MAC11122017_2 +
					}
		          }
		}).addStyleClass("FormInputStyle marginTop7");

		//MAC11122017_2+

		var oLabelUtypeCOR = new sap.ui.commons.Label({text: "Unit Type",
			required: false,
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: true, margin: false}),
            wrapping: true}).addStyleClass("margin10");

		var oComboUtypeCOR = new sap.ui.commons.ComboBox("idComboUtypeCOR", {
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

		var oLabelLeaseCOR = new sap.ui.commons.Label({text: "Lease",
			required: false,
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: true, margin: false}),
            wrapping: true}).addStyleClass("margin10");

		var oComboLeaseCOR = new sap.ui.commons.ComboBox("idComboLeaseCOR", {
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

		var oLabelCountryCOR = new sap.ui.commons.Label({text: "Country",
			required: false,
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: true, margin: false}),
            wrapping: true}).addStyleClass("margin10");

		var oComboCountryCOR = new sap.ui.commons.ComboBox("idComboCountryCOR", {
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

		var oLabelCityCOR = new sap.ui.commons.Label({text: "City",
			required: false,
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: true, margin: false}),
            wrapping: true}).addStyleClass("margin10");

		var oComboCityCOR = new sap.ui.commons.ComboBox("idComboCityCOR", {
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


		var oLabelSelBookingId = new sap.ui.commons.Label({text: "Booking Ref:",
			required: true,
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: true, margin: false}),
            wrapping: true}).addStyleClass("margin10");

		var oInputSelBookingId = new sap.ui.commons.TextField("idInputSelBookingId", {
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12"}),
			placeholder:"Booking Ref.",
		}).addStyleClass("FormInputStyle marginTop7");
		//MAC11122017_2+

		//BELOW LABLE USED ONLY FOR PASSING VALUE TO NEXT SCREEN NOT TO SHOW LABLE ON SCREEN
		var olblSelCustid = new sap.ui.commons.Label('idlblSelCustidCDORelRpt');

		// Buttons
	   	var oBtnSubmitCORReport = new sap.m.Button("idBtnoBtnSubmitCORReport",{
				text : "Submit",
				width:"80px",
				styled:false,
				//visible:seacoUser,
				press:function(){
					var objCurntCustDORR = new CustDashOutRelReport();
					objCurntCustDORR.getOnlineLoadData();
		}}).addStyleClass("submitBtn marginTop10");

	   	var oBtnResetCORReport = new sap.m.Button("idBtnResetCORReport",{
            text : "Reset",
            width:"80px",
            styled:false,
            layoutData: new sap.ui.layout.GridData({span: "L2 M5 S4",linebreak: true, margin: true}),
            press:function(){
            	oCurrOutRelReport.resetScreenCORReport();
                  }}).addStyleClass("submitBtn marginTop10");

         var oLabelSpaceCORReport = new sap.ui.commons.Label({text: " ",
                width:"8px",
                wrapping: true});

         var oFlexButtonsCORReport = new sap.m.FlexBox({
             items: [
                                    oBtnSubmitCORReport,
                                    oLabelSpaceCORReport,
                                    oBtnResetCORReport
             ],
             direction : "Row",
                      }).addStyleClass("marginTop10");

	   	var oLabelMandatory = new sap.ui.commons.Label({text: "Either of the fields required",	// MAC11122017_2
			required: true,
			requiredAtBegin : true,
            wrapping: true}).addStyleClass("margin10");

		//Form
		 var oCustORReportForm = new sap.ui.layout.form.Form("idFrmCustORReport", {
				 layout: oCustORReportLayout,
				 formContainers: [
						 new sap.ui.layout.form.FormContainer("idFrmCntnrCustORReport",{
							 formElements: [
												new sap.ui.layout.form.FormElement({
													fields: [olblSelCutId,oAutoCmpltSelCustCORReport]
												}),
												new sap.ui.layout.form.FormElement({
													fields: [oLabelUtypeCOR,oComboUtypeCOR] // MAC11122017_2
												}),
												new sap.ui.layout.form.FormElement({
													fields: [oLabelLeaseCOR,oComboLeaseCOR] // MAC11122017_2
												}),
												new sap.ui.layout.form.FormElement({
													fields: [oLabelCountryCOR,oComboCountryCOR] // MAC11122017_2
												}),
												new sap.ui.layout.form.FormElement({
													fields: [oLabelCityCOR,oComboCityCOR] // MAC11122017_2
												}),
												new sap.ui.layout.form.FormElement({
													fields: [oLabelSelBookingId,oInputSelBookingId] // MAC11122017_2
												}),
												new sap.ui.layout.form.FormElement({
													fields: [oFlexButtonsCORReport]
												}),
												new sap.ui.layout.form.FormElement({
													fields: [oLabelMandatory]
												}),
												new sap.ui.layout.form.FormElement({
													fields: [new sap.ui.commons.HorizontalDivider({width: "100%", type: "Area", height: "Medium"})]
												}),
												new sap.ui.layout.form.FormElement("idFrmElemntLoadDataCustORReport",{
												    fields: []
												})
										 ]
						 })
				 ]
		 });

		 this.getOnlineCutomerList();
		 return oCustORReportForm;
	},

	//GET ONLINE CUSTOMER LIST
	getOnlineCutomerList: function(){
	   try{
		   sap.ui.getCore().byId("idAutoCmpltSelCustCORReport").destroyItems();
		   busyDialog.open();
		   var objCurntCustDORR = new CustDashOutRelReport();

		   var urlToCall = '';
		   if(objLoginUser.getLoggedInUserType().toUpperCase() == "SEACO"){
				urlToCall = serviceUrl + "/F4_Customer_NameId_Appended";
			}else{
				urlToCall = serviceUrl + "/F4_Multiple_Cust?$filter=Bname eq '"+ objLoginUser.getLoggedInUserName().toUpperCase() +"' and Customer eq '' and Param1 eq ''";
			}

		   var objUtil = new utility();
		   objUtil.doOnlineRequest(urlToCall,objCurntCustDORR.getOnlineCutomerListSuccess, objCurntCustDORR.getOnlineCutomerListError);
	   }catch(e){
		   busyDialog.close();
			sap.ui.commons.MessageBox.alert("Error on getting customer Data: " + e);
	   }
   },

    //ON SUCCESS FOR CUSTOMER LIST
	getOnlineCutomerListSuccess: function(resultdata, response){
	   var oAutoCmpltSelCustCORReport = sap.ui.getCore().byId("idAutoCmpltSelCustCORReport");
	   try{
				//oAutoCmpltSelCustCORReport.insertItem((new sap.ui.core.ListItem({text:"", key:"0"})),0);
				//oAutoCmpltSelCustCORReport.setSelectedKey("0");
				if(resultdata != undefined){
					if(resultdata.results.length > 0){
						oModelCCustDbrd = new sap.ui.model.json.JSONModel(resultdata.results);
						for(var j =0; j<resultdata.results.length;j++){
							oAutoCmpltSelCustCORReport.addItem(new sap.ui.core.ListItem({text:resultdata.results[j].CustName,
														key: resultdata.results[j].Partner, additionalText: resultdata.results[j].Partner}));
						}

						/*var roleTypeCDORReport = objLoginUser.getLoggedInUserType();
						if(roleTypeCDORReport != 'SEACO'){
							var custidCDORReport = objLoginUser.getLoggedInUserID();
							//custidCDORReport = '100249';
							oAutoCmpltSelCustCORReport.setSelectedKeyCustm(custidCDORReport);
							//MAKE ONLINE REQUEST FOR DATA NON SEACO USER
							var objCurntCustDORR = new CustDashOutRelReport();
							objCurntCustDORR.getOnlineLoadData();
							return;
						}*/
					}
				}
				 busyDialog.close();
	   }catch(e){
		   busyDialog.close();
			sap.ui.commons.MessageBox.alert("Error on getting customer list: " + e);
	   }
   },

   // MAC11122017_2 +
   populateCountryCityCOR : function(customer){

		//busyDialog.open();
		aComboBoxArraysCOR.aCountryCombo = [];
		aComboBoxArraysCOR.aCityCombo = [];
		aComboBoxArraysCOR.aLeaseCombo = [];
		aComboBoxArraysCOR.aUtypeCombo = [];
		var urlToCall = serviceUrl + "/bookf4Set?$filter=Customer eq '" + customer + "' and Extra1 eq 'BOOK'"; // MAC11122017_1 +
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
		    			aComboBoxArraysCOR.aCountryCombo[i] = data.results[i].ZCouDesc;
		    		}
		    		if(data.results[i].ZCityDesc != ""){
		    			aComboBoxArraysCOR.aCityCombo[i] = data.results[i].ZCityDesc;
		    		}
		    		if(data.results[i].LeaseNo != ""){
		    			aComboBoxArraysCOR.aLeaseCombo[i] = data.results[i].LeaseNo;
		    		}
		    		if(data.results[i].UnitType != ""){
		    			aComboBoxArraysCOR.aUtypeCombo[i] = data.results[i].UnitType;
		    		}
				}

		    	aComboBoxArraysCOR.aCountryCombo = deleteduplicates(aComboBoxArraysCOR.aCountryCombo);
		    	aComboBoxArraysCOR.aCityCombo = deleteduplicates(aComboBoxArraysCOR.aCityCombo);
		    	aComboBoxArraysCOR.aLeaseCombo = deleteduplicates(aComboBoxArraysCOR.aLeaseCombo);
		    	aComboBoxArraysCOR.aUtypeCombo = deleteduplicates(aComboBoxArraysCOR.aUtypeCombo);

//		    	var dataLen = data.results.length;
//		    	for ( var i = 0; i < dataLen ; i++) {
//		    		aComboBoxArraysCOR.aCityCombo[i] = data.results[i];
//				}
//		    	oModelCityComboCOR.setData(aComboBoxArraysCOR);

		    	oModelCityComboCOR.setData(aComboBoxArraysCOR);
				var oComboCityCOR = sap.ui.getCore().byId("idComboCityCOR");
				oComboCityCOR.setModel(oModelCityComboCOR);
				oComboCityCOR.bindItems("/aCityCombo",new sap.ui.core.ListItem({text: "{}"}));

				oModelCityComboCOR.updateBindings();

				oModelCountryComboCOR.setData(aComboBoxArraysCOR);
				var oComboCountryCOR = sap.ui.getCore().byId("idComboCountryCOR");
				oComboCountryCOR.setModel(oModelCountryComboCOR);
				oComboCountryCOR.bindItems("/aCountryCombo",new sap.ui.core.ListItem({text: "{}"}));

				oModelCountryComboCOR.updateBindings();

				oModelLeaseComboCOR.setData(aComboBoxArraysCOR);
				var oComboLeaseCOR = sap.ui.getCore().byId("idComboLeaseCOR");
				oComboLeaseCOR.setModel(oModelLeaseComboCOR);
				oComboLeaseCOR.bindItems("/aLeaseCombo",new sap.ui.core.ListItem({text: "{}"}));

				oModelLeaseComboCOR.updateBindings();

				oModelUtypeComboCOR.setData(aComboBoxArraysCOR);
				var oComboUtypeCOR = sap.ui.getCore().byId("idComboUtypeCOR");
				oComboUtypeCOR.setModel(oModelUtypeComboCOR);
				oComboUtypeCOR.bindItems("/aUtypeCombo",new sap.ui.core.ListItem({text: "{}"}));

				oModelUtypeComboCOR.updateBindings();

		    },
		    function(err){
		    	busyDialog.close();
		    	errorfromServer(err);
		    	//alert("Error while reading region : "+ window.JSON.stringify(err.response));
		    });

	},
	// MAC11122017_2 +
	//ON ERROR FOR CUSTOMER LIST
    getOnlineCutomerListError: function(e){
    	busyDialog.close();
    	//var oAutoCmpltSelCustCORReport = sap.ui.getCore().byId("idAutoCmpltSelCustCORReport");
    	//oAutoCmpltSelCustCORReport.insertItem((new sap.ui.core.ListItem({text:"Select Customer", key:"0"})),0);
    	//oAutoCmpltSelCustCORReport.setSelectedKey("0");
    	errorfromServer(e);
   },

 //LOAD SAVED DATA
	getOnlinesuccessLoadData: function(resultdata, response){
		busyDialog.close();
		jQuery.sap.require("sap.ui.model.json.JSONModel");
		var jsnLoadSavedData = [];

		var objUtil = new utility();

		if(resultdata != undefined){
			jsnLoadSavedData = [];
			globalLoadSavedDataBooking = [];
			for(var indx in resultdata.results){
				var datenw = resultdata.results[indx].ExpiryDate.split('(')[1].split(')')[0];
				var dateForSort = new Date(Number(datenw));
				var cnvrtDate=   dateFormat(new Date(Number(datenw)), 'dd-mm-yyyy',"UTC");
				if(resultdata.results[indx].DetLevel == ''){
				jsnLoadSavedData.push({
						"LeaseNo": objUtil.removeLeadZero($.trim(resultdata.results[indx].LeaseNo)),
						"ReleaseAuth":objUtil.removeLeadZero($.trim(resultdata.results[indx].ReleaseAuth)),
						"UnitType": resultdata.results[indx].UnitType,
						"UnitDesc": resultdata.results[indx].UnitDesc,
						"City": resultdata.results[indx].City,
						"Location": resultdata.results[indx].Location,
						"Depot": resultdata.results[indx].Depot,
						"TotQty": parseInt($.trim(resultdata.results[indx].TotQty)),
						"PickedQty": resultdata.results[indx].PickedQty,
						"enabledPickedQty": (resultdata.results[indx].PickedQty == 0)? false: true,
						"OutstandQty": resultdata.results[indx].OutstandQty,
						"Status": resultdata.results[indx].Extra1,
						"ExpiryDate": cnvrtDate,
						"ExpiryDateSort" : dateForSort,
						"Extra1" : resultdata.results[indx].Extra1,
						"Extra2" : resultdata.results[indx].Extra2,
						"Extra3" : resultdata.results[indx].Extra3,
						"Extra4" : resultdata.results[indx].Extra4,
						"Keys": resultdata.results[indx].Keys,
						"OffDate": resultdata.results[indx].OffDate,
						"Sernr": resultdata.results[indx].Sernr
					});
				}else{
					globalLoadSavedDataBooking.push({
						"LeaseNo": objUtil.removeLeadZero($.trim(resultdata.results[indx].LeaseNo)),
						"ReleaseAuth":objUtil.removeLeadZero($.trim(resultdata.results[indx].ReleaseAuth)),
						"UnitType": resultdata.results[indx].UnitType,
						"UnitDesc": resultdata.results[indx].UnitDesc,
						"City": resultdata.results[indx].City,
						"Location": resultdata.results[indx].Location,
						"Depot": resultdata.results[indx].Depot,
						"TotQty": parseInt($.trim(resultdata.results[indx].TotQty)),
						"PickedQty": resultdata.results[indx].PickedQty,
						"enabledPickedQty": (resultdata.results[indx].PickedQty == 0)? false: true,
						"OutstandQty": resultdata.results[indx].OutstandQty,
						"Status": resultdata.results[indx].Extra1,
						"ExpiryDate": cnvrtDate,
						"ExpiryDateSort" : dateForSort,
						"Extra1" : resultdata.results[indx].Extra1,
						"Extra2" : resultdata.results[indx].Extra2,
						"Extra3" : resultdata.results[indx].Extra3,
						"Extra4" : resultdata.results[indx].Extra4,
						"Keys": resultdata.results[indx].Keys,
						"OffDate": resultdata.results[indx].OffDate,
						"Sernr": resultdata.results[indx].Sernr
					});
				}
			}
		}

		if(jsnLoadSavedData.length == 1){
			if((jsnLoadSavedData[0].LeaseNo == '') && ($.trim(jsnLoadSavedData[0].ReleaseAuth) == '')){
					//sap.ui.commons.MessageBox.alert(jsnLoadSavedData[0].Extra1);
				sap.ui.commons.MessageBox.alert("No releases found at this moment, please contact your local customer services for details.");
			}else{
				var objCurntCustDORR = new CustDashOutRelReport();
				sap.ui.getCore().byId("idFrmElemntLoadDataCustORReport").insertField(objCurntCustDORR.createTableLoadSavedData(jsnLoadSavedData));
			}
		}else if(jsnLoadSavedData.length > 1){
			var objCurntCustDORR = new CustDashOutRelReport();
			sap.ui.getCore().byId("idFrmElemntLoadDataCustORReport").insertField(objCurntCustDORR.createTableLoadSavedData(jsnLoadSavedData));
		}else{
			sap.ui.commons.MessageBox.alert("No releases found at this moment, please contact your local customer services for details.");
		}

	},

	getOnlineerrorLoadData: function(err){
		sap.ui.getCore().byId("idFrmElemntLoadDataCustORReport").destroyFields();
		errorfromServer(err);
	},

	getOnlineLoadData: function(){
		sap.ui.getCore().byId("idFrmElemntLoadDataCustORReport").destroyFields();
		var isCustomerValid = true; // MAC11122017_2 +
		var isBookingValid = true; // MAC11122017_2 +
		try{
			var oAutoCmpltSelCustCORReport = sap.ui.getCore().byId("idAutoCmpltSelCustCORReport");
			if($.trim(oAutoCmpltSelCustCORReport.getProperty('selectedKey')) == ''){
				// MAC11122017_2 -
//				oAutoCmpltSelCustCORReport.setValueState(sap.ui.core.ValueState.Error);
//				if(oAutoCmpltSelCustCORReport.getValue() != ''){
//					oAutoCmpltSelCustCORReport.setValue('');
//					oAutoCmpltSelCustCORReport.setPlaceholder("Invalid Value");
//				}else{
//					oAutoCmpltSelCustCORReport.setPlaceholder("Required");
//				}

			   // return false;
			   // MAC11122017_2 -
				isCustomerValid = false;	// MAC11122017_2 +
			}
			// MAC11122017_2 +
			var bookingref = sap.ui.getCore().byId("idInputSelBookingId").getValue();
			if(bookingref){

			}else{
				isBookingValid = false;
			}


			if(!isCustomerValid && !isBookingValid){
				sap.ui.commons.MessageBox.alert("Please enter either customer or booking ref.");
				return false;
			}
			// MAC11122017_2 +

			oAutoCmpltSelCustCORReport.setValueState(sap.ui.core.ValueState.None);
			oAutoCmpltSelCustCORReport.setPlaceholder("Select Customer");

			sap.ui.getCore().byId("idInputSelBookingId").setValueState(sap.ui.core.ValueState.None);	// MAC11122017_2 +
			sap.ui.getCore().byId("idInputSelBookingId").setPlaceholder("Booking Ref.");	// MAC11122017_2 +

			busyDialog.open();

			// MAC11122017_2 +
			var country = sap.ui.getCore().byId('idComboCountryCOR').getValue();
			var city = sap.ui.getCore().byId('idComboCityCOR').getValue();
			var lease = sap.ui.getCore().byId('idComboLeaseCOR').getValue();
			var utype = sap.ui.getCore().byId('idComboUtypeCOR').getValue();
			var extra1 = country + '$' + city + '$' + lease + '$' + utype;
			// MAC11122017_2 +
			var urlToCall = serviceUrl + "/Outs_Release_Cust?";
			urlToCall += "$filter=Customer eq '" + oAutoCmpltSelCustCORReport.getSelectedKey() + "'";
			urlToCall += "and Extra1 eq '" + extra1 + "' and Extra2 eq '' and " + // MAC11122017_2 + included extra1
			"Extra3 eq '" + sap.ui.getCore().byId("idInputSelBookingId").getValue() +
			"' and Extra4 eq datetime'9999-09-09T00:00:00'";

			var objUtil = new utility();
			var objCurntCustDORR = new CustDashOutRelReport();
			objUtil.doOnlineRequest(urlToCall,objCurntCustDORR.getOnlinesuccessLoadData, objCurntCustDORR.getOnlineerrorLoadData);
		}catch(e){
			busyDialog.close();
			sap.ui.commons.MessageBox.alert("Error on loading Estimate" + e);
		}
	},

	createTableLoadSavedData: function(jsnLoadSavedData){
		var olblTblHdrCustOutRelRep = new sap.ui.commons.Label({text: 'Booking Summary for ' + sap.ui.getCore().byId("idAutoCmpltSelCustCORReport").getValue(), wrapping: true}).addStyleClass("font15Bold marginTop10");
		sap.ui.getCore().byId('idlblSelCustidCDORelRpt').setText(sap.ui.getCore().byId("idAutoCmpltSelCustCORReport").getValue());

		var oidTblRelSummDataCDORR = new sap.ui.table.Table(
			{
				columnHeaderHeight : 45,
				enableColumnReordering: false,
				selectionMode : sap.ui.table.SelectionMode.None,
				navigationMode : sap.ui.table.NavigationMode.None,
				//layoutData: new sap.ui.layout.GridData({span: "L12 M12 S12",linebreak: false, margin: false}),
			}).addStyleClass('tblBorder marginTop10');

		oidTblRelSummDataCDORR.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({text : "Lease"}).addStyleClass("wraptextcol"),
			template : new sap.ui.commons.TextView().bindProperty("text", "LeaseNo"),
			width : "70px",
			sortProperty: "LeaseNo",
			filterProperty: "LeaseNo",
			resizable:false
		}));

		oidTblRelSummDataCDORR.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({text : "Release"}).addStyleClass("wraptextcol"),
			template : new sap.ui.commons.TextView().bindProperty("text", "ReleaseAuth"),
			width : "80px",
			sortProperty: "ReleaseAuth",
			filterProperty: "ReleaseAuth",
			resizable:false
		}));

		oidTblRelSummDataCDORR.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({text : "Unit Description"}).addStyleClass("wraptextcol"),
			template : new sap.ui.commons.TextView().bindProperty("text", "UnitDesc"),
			width : "120px",
			sortProperty: "UnitDesc",
			filterProperty: "UnitDesc",
			resizable:false
		}));

		oidTblRelSummDataCDORR.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({text : "Location"}).addStyleClass("wraptextcol"),
			template : new sap.ui.commons.TextView().bindProperty("text", "Location"),
			width : "120px",
			sortProperty: "Location",
			filterProperty: "Location",
			resizable:false
		}));

		oidTblRelSummDataCDORR.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({text : "Depot"}).addStyleClass("wraptextcol"),
			template : new sap.ui.commons.TextView().bindProperty("text", "Depot"),
			width : "120px",
			sortProperty: "Depot",
			filterProperty: "Depot",
			resizable:false
		}));

		oidTblRelSummDataCDORR.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({text : "Total Quantity"}).addStyleClass("wraptextcol"),
			template : new sap.ui.commons.TextView().bindProperty("text", "TotQty"),
			width : "80px",
			sortProperty: "TotQty",
			filterProperty: "TotQty",
			resizable:false
		}));

		var oBtnTblQtyPkd = new sap.ui.commons.Link({
			////width : "50px",
			enabled: '{enabledPickedQty}',
            press : function(vTblhdr) {
            	new CustDashOutRelReport().getOnlineCDORelRptDtl(this.getHelpId());
			}}).bindProperty("helpId","Keys").bindProperty("text","PickedQty");

		oidTblRelSummDataCDORR.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({text : "Quantity Picked"}).addStyleClass("wraptextcol"),
			template : oBtnTblQtyPkd,
			width : "80px",
			sortProperty: "PickedQty",
			filterProperty: "PickedQty",
			resizable:false
		}));

		oidTblRelSummDataCDORR.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({text : "Outstanding Quantity"}).addStyleClass("wraptextcol"),
			template : new sap.ui.commons.TextView().bindProperty("text", "OutstandQty"),
			width : "100px",
			sortProperty: "OutstandQty",
			filterProperty: "OutstandQty",
			resizable:false
		}));

		oidTblRelSummDataCDORR.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({text : "Status"}).addStyleClass("wraptextcol"),
			template : new sap.ui.commons.TextView().bindProperty("text", "Status"),
			width : "80px",
			visible:false,
			sortProperty: "Status",
			filterProperty: "Status",
			resizable:false
		}));

		oidTblRelSummDataCDORR.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({text : "Expiry Date"}).addStyleClass("wraptextcol"),
			template : new sap.ui.commons.TextView().bindProperty("text", "ExpiryDate"),
			width : "90px",
			sortProperty: "ExpiryDateSort",
			filterProperty: "ExpiryDate",
			resizable:false
		}));

		var obtnExportExlCORReport = new sap.m.Button("idbtnExportExlCORReport",{
            text : "Export To Excel",
			visible:false,
            type:sap.m.ButtonType.Unstyled,
            //icon: sap.ui.core.IconPool.getIconURI("excel-attachment"),
            icon: sap.ui.core.IconPool.getIconURI("excel-attachment"),
            press:function(){
            	var objUtil = new utility();
            	//original  var arrDiplHdrExprtCDBRel = ['Lease','Release','Unit Description','Location','Depot','Total Quantity', 'Quantity Picked','Outstanding Quantity','Status','Expiry Date'];
            	//original  var arrDiplFieldExprtCDBRel = ['LeaseNo','ReleaseAuth','UnitDesc','Location','Depot','TotQty','PickedQty','OutstandQty','Status','ExpiryDate'];

            	var arrDiplHdrExprtCDBRel = ['Lease','Release','Unit Description','Location','Depot','Total Quantity', 'Quantity Picked','Outstanding Quantity','Expiry Date'];
            	var arrDiplFieldExprtCDBRel = ['LeaseNo','ReleaseAuth','UnitDesc','Location','Depot','TotQty','PickedQty','OutstandQty','ExpiryDate'];

            	var TblHdrExcl = 'Booking Summary for ' + sap.ui.getCore().byId("idlblSelCustidCDORelRpt").getText();

				objUtil.ExportUtility(jsnLoadSavedData,arrDiplHdrExprtCDBRel,arrDiplFieldExprtCDBRel, TblHdrExcl,"export");
            }
         }).addStyleClass("submitBtn");

		var obtnVAllCustOutRelRptr = new sap.m.Button({
            text : "View All",
            type:sap.m.ButtonType.Unstyled,
            visible:false,
            press:function(){
						this.setVisible(false);
						//var vidTblPopupCDBOnhireDtl = sap.ui.getCore().byId("idTblPopupCDBOnhireDtl");
						 if(jsnLoadSavedData.length < 100){
							 oidTblRelSummDataCDORR.setVisibleRowCount(jsnLoadSavedData.length);
							 oidTblRelSummDataCDORR.setNavigationMode(sap.ui.table.NavigationMode.None);
					   }else{
						   oidTblRelSummDataCDORR.setVisibleRowCount(100);
						   oidTblRelSummDataCDORR.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
					   }
                  }
         }).addStyleClass("submitBtn marginTop10");

		var oMdlErrTblRESearch = new sap.ui.model.json.JSONModel();
		oMdlErrTblRESearch.setData({modelData : []});
		oidTblRelSummDataCDORR.setModel(oMdlErrTblRESearch);
		oidTblRelSummDataCDORR.bindRows("/modelData");

		oMdlErrTblRESearch.setData({modelData : jsnLoadSavedData});
		oidTblRelSummDataCDORR.setModel(oMdlErrTblRESearch);
		oidTblRelSummDataCDORR.bindRows("/modelData");
		if(jsnLoadSavedData.length < 1){
			oidTblRelSummDataCDORR.setVisibleRowCount(5);
			oidTblRelSummDataCDORR.setNavigationMode(sap.ui.table.NavigationMode.None);
		}else if((jsnLoadSavedData.length == 1) && (jsnLoadSavedData[0].Message == 'No saved estimates found')){
			jsnLoadSavedData.length = 0;
			oidTblRelSummDataCDORR.bindRows("/modelData");
			oidTblRelSummDataCDORR.setVisibleRowCount(5);
			oidTblRelSummDataCDORR.setNavigationMode(sap.ui.table.NavigationMode.None);
		}
		else if(jsnLoadSavedData.length < 26){
			obtnExportExlCORReport.setVisible(true);
			oidTblRelSummDataCDORR.setVisibleRowCount(jsnLoadSavedData.length);
			oidTblRelSummDataCDORR.setNavigationMode(sap.ui.table.NavigationMode.None);
		}else{
			obtnExportExlCORReport.setVisible(true);
			obtnVAllCustOutRelRptr.setVisible(true);
			oidTblRelSummDataCDORR.setVisibleRowCount(25);
			oidTblRelSummDataCDORR.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		}


		var oflxHdrCORReport = new sap.m.FlexBox({
			  items:[olblTblHdrCustOutRelRep],
			  width:"70%",
			  direction: "Row"
			 });//.addStyleClass("marginTop10");

		var oflxHdrCORReport2 = new sap.m.FlexBox({
			  items:[obtnExportExlCORReport],
			  width:"30%",
			  direction: "RowReverse"
			 });//.addStyleClass("marginTop10");

		var oflxHdrCORReportMain = new sap.m.FlexBox({
			  items:[oflxHdrCORReport, oflxHdrCORReport2],
			  width:"100%",
			  direction: "Row"
			 }).addStyleClass("marginTop10");

		var oFlxFinlCDORReport = new sap.m.FlexBox({
			  items:[oflxHdrCORReportMain, oidTblRelSummDataCDORR, obtnVAllCustOutRelRptr],
			  //width:"90%",
			  layoutData: new sap.ui.layout.GridData({span: "L12 M12 S12",linebreak: false, margin: false}),
			  direction: "Column"
			 }).addStyleClass("marginTop10");

		return oFlxFinlCDORReport;
	},

	/* MAC04082017+ */
	getOnlinesuccessCDORelRptDtlNew : function(inputpara){

		busyDialog.close();
		jQuery.sap.require("sap.ui.model.json.JSONModel");
		var jsnLoadSavedDataCDORelDtlRpt = [];
		var objUtil = new utility();
		var datasplt = inputpara.split('|');

			for(var indx in globalLoadSavedDataBooking){
				var dateForSort, cnvrtDate;
				if(globalLoadSavedDataBooking[indx].LeaseNo == datasplt[0] && globalLoadSavedDataBooking[indx].ReleaseAuth == datasplt[1]
				&& globalLoadSavedDataBooking[indx].UnitType == datasplt[2] && globalLoadSavedDataBooking[indx].City == datasplt[3]){
					if(globalLoadSavedDataBooking[indx].OffDate != null){
						var datenw = globalLoadSavedDataBooking[indx].OffDate.split('(')[1].split(')')[0];
						var dateForSort = new Date(Number(datenw));
						var cnvrtDate=   dateFormat(new Date(Number(datenw)), 'dd-mm-yyyy',"UTC");
						}else{
							var dateForSort = "";
						    var cnvrtDate = "";
						}

				jsnLoadSavedDataCDORelDtlRpt.push({
//					"Extra4":resultdata.results[indx].Extra4,
//					"Extra3":resultdata.results[indx].Extra3,
//					"Extra2":resultdata.results[indx].Extra2,
//					"Extra1":resultdata.results[indx].Extra1,
					"TblHdr": 'Booking Details for ' + sap.ui.getCore().byId("idlblSelCustidCDORelRpt").getText(), //resultdata.results[indx].Customer,
					"OnHireDate": cnvrtDate,
					"OnHireDateSort": dateForSort,
					"UnitNumber": globalLoadSavedDataBooking[indx].Sernr,
					"Depot": globalLoadSavedDataBooking[indx].Depot,
					"Location": globalLoadSavedDataBooking[indx].Location,
					"City": globalLoadSavedDataBooking[indx].City,
					"UnitDesc": globalLoadSavedDataBooking[indx].UnitDesc,
					"ReleaseAuth": objUtil.removeLeadZero($.trim(globalLoadSavedDataBooking[indx].ReleaseAuth)),
					"LeaseNo": objUtil.removeLeadZero($.trim(globalLoadSavedDataBooking[indx].LeaseNo)),
					"UnitType":globalLoadSavedDataBooking[indx].UnitType
				});
			}
			}
		//var objCurntCustDORR = new CustDashOutReturnReport();
		if(jsnLoadSavedDataCDORelDtlRpt.length > 0){
			var vTblhdr = 'Booking Details for ' + sap.ui.getCore().byId("idlblSelCustidCDORelRpt").getText();
	    	//bus.publish("nav", "to", {id : "CustOutRelDtlReportVw", data: {bindData: jsnLoadSavedData, relDtlFor: vTblhdr}});
			var bus = sap.ui.getCore().getEventBus();
	    	bus.publish("nav", "to", {id : "CustOutRelDtlReportVw", data: {bindData: jsnLoadSavedDataCDORelDtlRpt, relDtlFor: vTblhdr}});

		}else{
			sap.ui.commons.MessageBox.alert("No Record found for the selected Row, please contact your local customer services for details.");
		}

	},
	/* MAC04082017+ */
	//LOAD DATA FOR DETAILS SCREEN
	getOnlinesuccessCDORelRptDtl: function(resultdata, response){
		busyDialog.close();
		jQuery.sap.require("sap.ui.model.json.JSONModel");
		var jsnLoadSavedDataCDORelDtlRpt = [];
		var objUtil = new utility();

		if(resultdata != undefined){
			for(var indx in resultdata.results){
				var dateForSort, cnvrtDate;

				if($.trim(resultdata.results[indx].OnHireDate) != ''){
					var datenw = resultdata.results[indx].OnHireDate.split('(')[1].split(')')[0];
					dateForSort = new Date(Number(datenw));
					cnvrtDate=   dateFormat(new Date(Number(datenw)), 'dd-mm-yyyy',"UTC");
				}else{
					cnvrtDate ='';
					dateForSort = new Date('9999-09-09T00:00:00');
				}

				jsnLoadSavedDataCDORelDtlRpt.push({
					"Extra4":resultdata.results[indx].Extra4,
					"Extra3":resultdata.results[indx].Extra3,
					"Extra2":resultdata.results[indx].Extra2,
					"Extra1":resultdata.results[indx].Extra1,
					"TblHdr": 'Booking Details for ' + sap.ui.getCore().byId("idlblSelCustidCDORelRpt").getText(), //resultdata.results[indx].Customer,
					"OnHireDate": cnvrtDate,
					"OnHireDateSort": dateForSort,
					"UnitNumber": resultdata.results[indx].UnitNumber,
					"Depot": resultdata.results[indx].Depot,
					"Location": resultdata.results[indx].Location,
					"City": resultdata.results[indx].City,
					"UnitDesc": resultdata.results[indx].UnitDesc,
					"ReleaseAuth": objUtil.removeLeadZero($.trim(resultdata.results[indx].ReleaseAuth)),
					"LeaseNo": objUtil.removeLeadZero($.trim(resultdata.results[indx].LeaseNo)),
					"UnitType":resultdata.results[indx].UnitType
				});
			}
		}
		//var objCurntCustDORR = new CustDashOutReturnReport();
		if(jsnLoadSavedDataCDORelDtlRpt.length > 0){
			var vTblhdr = 'Booking Details for ' + sap.ui.getCore().byId("idlblSelCustidCDORelRpt").getText();
	    	//bus.publish("nav", "to", {id : "CustOutRelDtlReportVw", data: {bindData: jsnLoadSavedData, relDtlFor: vTblhdr}});
			var bus = sap.ui.getCore().getEventBus();
	    	bus.publish("nav", "to", {id : "CustOutRelDtlReportVw", data: {bindData: jsnLoadSavedDataCDORelDtlRpt, relDtlFor: vTblhdr}});

		}else{
			sap.ui.commons.MessageBox.alert("No Record found for the selected Row, please contact your local customer services for details.");
		}
	},

	getOnlineerrorCDORelRptDtl: function(err){
		errorfromServer(err);
	},

	getOnlineCDORelRptDtl: function(inputpara){
		/* MAC_04082017 -
		try{
			var datasplt = inputpara.split('|');
			busyDialog.open();
			var urlToCall = serviceUrl + "/Cust_Outs_Release_Detl?";
				urlToCall += "$filter=LeaseNo eq '" + datasplt[0] + "'";
				urlToCall += " and ReleaseAuth eq '" + datasplt[1] + "'";
				urlToCall += " and UnitType eq '" + datasplt[2] + "'";
				urlToCall += " and City eq '" + datasplt[3] + "'";
				urlToCall += " and Depot eq '' and Extra1 eq '' and Extra2 eq '' and Extra3 eq '' and Extra4 eq datetime'9999-09-09T00:00:00'";

			var objUtil = new utility();
			var objCurntCustDORelR = new CustDashOutRelReport();
			objUtil.doOnlineRequest(urlToCall,objCurntCustDORelR.getOnlinesuccessCDORelRptDtl, objCurntCustDORelR.getOnlineerrorCDORelRptDtl);
		}catch(e){
			busyDialog.close();
			sap.ui.commons.MessageBox.alert("Error on loading Estimate" + e);
		} MAC_04082017 - */

		/*MAC_04082017+*/
		var oCustDashOutRelReport = new CustDashOutRelReport();
		oCustDashOutRelReport.getOnlinesuccessCDORelRptDtlNew(inputpara);
		/*MAC_04082017+*/

	},

	resetScreenCORReport: function(){
		var oAutoCmpltSelCustCORReport = sap.ui.getCore().byId("idAutoCmpltSelCustCORReport");
		oAutoCmpltSelCustCORReport.setValueState(sap.ui.core.ValueState.None);
		oAutoCmpltSelCustCORReport.setPlaceholder("Select Customer");

		oAutoCmpltSelCustCORReport.setValue("");
		oAutoCmpltSelCustCORReport.setSelectedKey("");

		// MAC11122017_2 +

		var oComboCountryCOR = sap.ui.getCore().byId("idComboCountryCOR");
		oComboCountryCOR.setValueState(sap.ui.core.ValueState.None);
		oComboCountryCOR.setPlaceholder("Select Country");

		oComboCountryCOR.setValue("");
		oComboCountryCOR.setSelectedKey("");

		var oComboCityCOR = sap.ui.getCore().byId("idComboCityCOR");
		oComboCityCOR.setValueState(sap.ui.core.ValueState.None);
		oComboCityCOR.setPlaceholder("Select Country");

		oComboCityCOR.setValue("");
		oComboCityCOR.setSelectedKey("");

		var oComboLeaseCOR = sap.ui.getCore().byId("idComboLeaseCOR");
		oComboLeaseCOR.setValueState(sap.ui.core.ValueState.None);
		oComboLeaseCOR.setPlaceholder("Select Lease");

		oComboLeaseCOR.setValue("");
		oComboLeaseCOR.setSelectedKey("");

		var oComboUtypeCOR = sap.ui.getCore().byId("idComboUtypeCOR");
		oComboUtypeCOR.setValueState(sap.ui.core.ValueState.None);
		oComboUtypeCOR.setPlaceholder("Select Unit Type");

		oComboUtypeCOR.setValue("");
		oComboUtypeCOR.setSelectedKey("");

		// MAC11122017_2 +
		sap.ui.getCore().byId("idInputSelBookingId").setPlaceholder("Booking Ref.");
		sap.ui.getCore().byId("idInputSelBookingId").setValueState(sap.ui.core.ValueState.None);
		sap.ui.getCore().byId("idInputSelBookingId").setValue("");

		sap.ui.getCore().byId("idFrmElemntLoadDataCustORReport").destroyFields();
	}
});

function deleteduplicates(array){

	var uniquevalues = [];
	$.each(array, function(i, el){
	    if($.inArray(el, uniquevalues) === -1) uniquevalues.push(el);
	});
	return uniquevalues;
}

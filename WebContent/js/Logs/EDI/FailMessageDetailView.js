/******** NP *******/

/*

*$*$------------------------------------------------------------------------*
*$*$ Modified By : Seyed Ismail MAC
*$*$ Modified On : 06.02.2015
*$*$ Reference   : RTS1059
*$*$ Transport   :
*$*$ Tag         : MAC06022015
*$*$ Purpose     : EDI Transmission Summary Redesign
*$*$---------------------------------------------------------------------
**$*$------------------------------------------------------------------------*
*$*$ Modified By : Seyed Ismail MAC
*$*$ Modified On : 13.03.2015
*$*$ Reference   : RTS
*$*$ Transport   : CGWK900868
*$*$ Tag         : MAC13032015
*$*$ Purpose     : * Select ALL in EDI Unique details table
*$*$---------------------------------------------------------------------
* * **$*$------------------------------------------------------------------------*
*$*$ Modified By : Seyed Ismail MAC
*$*$ Modified On : 29.07.2015
*$*$ Reference   : RTS 1261
*$*$ Transport   : CGWK901010
*$*$ Tag         : MAC29072015
*$*$ Purpose     : Date Format Change
*$*$---------------------------------------------------------------------
** * **$*$------------------------------------------------------------------------*
*$*$ Modified By : Seyed Ismail MAC
*$*$ Modified On : 31.07.2015
*$*$ Reference   : RTS 1261
*$*$ Transport   : CGWK901020
*$*$ Tag         : MAC31072015
*$*$ Purpose     : Delete Lines : Update table correctly
*$*$---------------------------------------------------------------------
*/
/* MACALPHA19032018 - Changes done by Seyed Ismail on 19.03.2018 for Alpha Changes
1. Remove Unit Part Code information MACALPHA19032018_1
2. Add Lessor Survey and remove additional, superseding, pre sales, pre delivery MACALPHA19032018_2
3. Remove sale grade and add CW & Notes field MACALPHA19032018_3
4. Get the latest work order detail from SAP MACALPHA19032018_4
5. Show Labour Rate on screen MACALPHA19032018_5
6. Remove unwanted responsibility codes MACALPHA19032018_6
7. Repair Completion Page changes MACALPHA19032018_7
8. a. One submission for both carcass and machinary MACALPHA19032018_8
   b.Load saved estimates MACALPHA19032018_8
9. One print/excel button MACALPHA19032018_9
10. Differentiate original/JS/LS MACALPHA19032018_10
11. Remove unwanted fields - Lessee Approval MACALPHA19032018_11
12. Add new message types in EDI Log - MACALPHA19032018_12
*/
jQuery.sap.require("sap.ui.model.json.JSONModel");
var jsonInventory = [];  // MAC06022015 +
var arrayLenFailEDITL = 0;
var vMsgUniqueIdToPassFMDEDITL = "";
var vMsgUniqueIdToPassMUIDEDITL = "";
var arrViewErrorDetailEDITL = [];
var oModelFailMsgDetEDITL;
var arrDeleteMsgEDITL = [];
var arrResubmitMsgEDITL = [];
var arrayLenResFailEDITL = 0;
var arrMsgUniqueIDDetEDITL = [];
var arrMsgUniqueIDDetJLREDITL = [];
var msgTypeUniqueIDPassFMDEDITL = "";
var arrAddRepairLineDTEDITL = [];

sap.ui.model.json.JSONModel.extend("failMessageDetailEDITLView", {

	createFailMessageDetail: function(){

		var oCurrEDITL = this;

		var oLabelSpaceEDITL = new sap.ui.commons.Label({text: " ",
			width:"8px",
            wrapping: true});

		var bckFrmResultsToEDITL = new sap.m.Link("idBckFrmResToEDITL", {
			text: " < Back",
            width:"9%",
            wrapping:true,
            press: function(){
        	/* Begin of adding by Seyed Ismail on 25.02.2015 MAC06022015 */
        	var oEDITransDepot = new ediTransmissionLogView();
        	oEDITransDepot.allDepotDetails();
        	/* End of adding by Seyed Ismail on 25.02.2015 MAC06022015 */
            var bus = sap.ui.getCore().getEventBus();
            bus.publish("nav", "back");
            }});

		var oLabelTitleLeftEDITL = new sap.ui.commons.Label("idFailMsgDetTitleEDITL",{
            wrapping: true}).addStyleClass("fontTitle marginTop10");

		var oLabelTitleRightEDITL = new sap.ui.commons.Label("idFailMsgDetCountEDITL",{
            wrapping: true}).addStyleClass("sapUiFormTitle marginTop10");

		var oFlexTitleLeftEDITL = new sap.m.FlexBox({
	           items: [
						oLabelTitleLeftEDITL
	           ],
	           direction : "Row",
	           width: "70%"
				});


		/* Begin of adding by Seyed Ismail on 25.02.2015 MAC06022015 */
		var btnExport = new sap.m.Button({
			  //width : '150px',
	          text : "Export To Excel",
						//type:sap.m.ButtonType.Unstyled,
						styled : false,
	          //icon: sap.ui.core.IconPool.getIconURI("excel-attachment"),
	          press:function(){
				  var objUtil = new utility();
	        	  objUtil.makeHTMLTable(jsonInventory, "Error Details on EDI Summary","export");
	          }
		}).addStyleClass("submitBtn");

		/* End of adding by Seyed Ismail on 25.02.2015 MAC06022015 */

		var oFlexTitleRightEDITL = new sap.m.FlexBox({
	           items: [
	                   btnExport
	           ],
	           direction : sap.m.FlexDirection.RowReverse,
	           width: "30%"
				});

		var oFlexTitlesLREDITL = new sap.m.FlexBox({
	           items: [
						oFlexTitleLeftEDITL,
						oFlexTitleRightEDITL
	           ],
	           direction : "Row",
	           width: "100%"
				});

		// Table
    	var oTableFailMsgDetEDITL = new sap.ui.table.Table("idTblFailMsgDetEDITL",{
            columnHeaderHeight: 30,
            selectionMode: sap.ui.table.SelectionMode.None,
            navigationMode: sap.ui.table.NavigationMode.Paginator,
            //width:"100%",	// MACHANACHANGES_12062019 +
            height:"100%"
    	 }).addStyleClass("fontStyle marginTop15 tblBorder");

    	// Table Columns
    	oTableFailMsgDetEDITL.addColumn(new sap.ui.table.Column({
      		 label: new sap.ui.commons.Label({text: "Message Unique ID"}),
    		 template: new sap.ui.commons.Link({
				 press: function(oEvent){
					 busyDialog.open();

					 var vMsgUniqueIdToPassForErrorTable = this.getText();

					 vMsgUniqueIdToPassMUIDEDITL = "";
					 vMsgUniqueIdToPassMUIDEDITL = this.getText();
					 msgTypeUniqueIDPassFMDEDITL = "";
					 msgTypeUniqueIDPassFMDEDITL = this.getHelpId();

					 // MACALPHA19032018_12+
					 var errTypeLocal = oEvent.getSource().getBindingContext().getProperty("type");
					 if(errTypeLocal == "REEFER PENDING MSG"){
						 errTypeLocal = "REEFER_EDI";
					 }else{
						 errTypeLocal = "";
					 }
					 // MACALPHA19032018_12+
					 oModel = new sap.ui.model.odata.ODataModel(serviceUrl15, true);
						var urlToCallMUIDEDITL = serviceUrl15 + "/EDI_ViewError?$filter=MessageId eq '" + vMsgUniqueIdToPassMUIDEDITL +
						"' and Param1 eq '" + errTypeLocal + // MACALPHA19032018_12 +
						"'";

						OData.request({
						      requestUri: urlToCallMUIDEDITL,
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
						    	//alert("data.results.length : "+data.results.length);
						    	if(data.results.length == 0){
						    		 busyDialog.close();
						    		sap.ui.commons.MessageBox.show("No Result Found. Please try again.",
				                            sap.ui.commons.MessageBox.Icon.WARNING,
				                            "Warning",
				                            [sap.ui.commons.MessageBox.Action.OK],
				                            sap.ui.commons.MessageBox.Action.OK);
						    	}
						    	else{
						    		arrAddRepairLineDTEDITL = [];
						    		var RepairLineItemsLen = data.results.length;
						    		for(var i=0 ; i < RepairLineItemsLen; i++){
						    			arrAddRepairLineDTEDITL.push({
						    				'lineNo': i+1,
						    				'damLineCode': data.results[i].LocationCode,
						    				'compCode': data.results[i].ComponentCode,
						    				'samTypeCode': data.results[i].DamageCode,
						    				'compMatCode': data.results[i].MaterialCode,
						    				'repCode': data.results[i].RepairCode,
                      	'measureUnit': data.results[i].RepairMeasureU,
                      	'repLength': data.results[i].RepairLength,
                      	'repWidth': data.results[i].RepairWidth,
                      	'quantity': data.results[i].Quantity,
                      	'manHrs': data.results[i].ManHours,
                      	'matCost': data.results[i].MaterialCost,
                      	'responsibility': data.results[i].Responsibility,
                      	'labourRate': data.results[i].LabourRate,
                      	'bulletinNo': data.results[i].BulletinNumber ,

												'notes1': data.results[i].Notes1,	// MACALPHA19032018_12
												'notes2': data.results[i].Notes2,	// MACALPHA19032018_12
												'notes3': data.results[i].Notes3,	// MACALPHA19032018_12
												'notes4': data.results[i].Notes4,	// MACALPHA19032018_12
												'notes5': data.results[i].Notes5,	// MACALPHA19032018_12
												'dpplimit': data.results[i].DppAmt,	// MACALPHA19032018_12
												'dppcurr': data.results[i].DppCurr,	// MACALPHA19032018_12

                      	'deleteLink': "Delete",
                      	'savedFlag':false
						    			});
						    		}
					    			oModel = new sap.ui.model.odata.ODataModel(serviceUrl15, true);
									var urlToCallForErrorTableEDITL = serviceUrl15 + "/EDI_MsgUniqueID_Hlink?$filter=MsgUidXi eq '" + vMsgUniqueIdToPassForErrorTable + "'";
									//alert("urlToCallForErrorTableEDITL : "+urlToCallForErrorTableEDITL);
									OData.request({
									      requestUri: urlToCallForErrorTableEDITL,
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
									    function (data1, response){
									    	//alert("data.results.length : "+data.results.length);
									    	if(data1.results.length == 0 && msgTypeUniqueIDPassFMDEDITL != "REEFER PENDING MSG"){ 	// MACALPHA19032018_12 added REEFER condition because there
													 // won't be any ERROR for REEFER PENDING MSG, so no need to throw "No Result Found error msg".
									    		 busyDialog.close();
									    		sap.ui.commons.MessageBox.show("No Result Found. Please try again.",
							                            sap.ui.commons.MessageBox.Icon.WARNING,
							                            "Warning",
							                            [sap.ui.commons.MessageBox.Action.OK],
							                            sap.ui.commons.MessageBox.Action.OK);
									    	}
									    	else{
									    		arrViewErrorDetailEDITL = [];
									    		for(var i=0; i<data1.results.length; i++){

									    			arrViewErrorDetailEDITL.push({
									    				"errorType": data1.results[i].ErrType,
									    				"id": data1.results[i].ErrId,
									    				"field": data1.results[i].ErrField,
									    				"number": data1.results[i].ErrNumber,
									    				"message": data1.results[i].ErrMessage
									    			});
									    		}
									    		if(msgTypeUniqueIDPassFMDEDITL == "WESTIM" || msgTypeUniqueIDPassFMDEDITL == "REEFER PENDING MSG"){ // MACALPHA19032018_12 added REEFER PENDING MSG
									    			arrMsgUniqueIDDetJLREDITL = [];
									    			// date formatting pending
										    		for(var i=0; i<data.results.length; i++){

										    			var vMoveInDateSplit = data.results[i].MovementInDate.split("(");
													    var vMoveInDate = vMoveInDateSplit[1].split(")");
													    var MoveInDate = dateFormat(new Date(Number(vMoveInDate[0])), 'dd-mm-yyyy',"UTC");
													    if(MoveInDate.substring(6) == "9999")
													    	MoveInDate = "";
													    else
													    	MoveInDate = MoveInDate;

													    var vActualDateSplit = data.results[i].ActualDate.split("(");
													    var vActualDate = vActualDateSplit[1].split(")");
													    var ActualDate = dateFormat(new Date(Number(vActualDate[0])), 'dd-mm-yyyy',"UTC");
													    if(ActualDate.substring(6) == "9999")
													    	ActualDate = "";
													    else
													    	ActualDate = ActualDate;

													    var vWorkDateSplit = data.results[i].WorkCreatedDat.split("(");
													    var vWorkDate = vWorkDateSplit[1].split(")");
													    var WorkDate = dateFormat(new Date(Number(vWorkDate[0])), 'dd-mm-yyyy',"UTC");
													    if(WorkDate.substring(6) == "9999")
													    	WorkDate = "";
													    else
													    	WorkDate = WorkDate;

										    			arrMsgUniqueIDDetJLREDITL.push({
										    				"serialNumbr": data.results[i].SerialNumber,
										    				"msgType": data.results[i].ContainerStatus,
										    				"moveInDate": MoveInDate,
										    				"userName": data.results[i].Param1,
										    				"funcLoc": data.results[i].FunctionalLocat,
										    				"actualDate": ActualDate,
										    				"workDate": WorkDate,
										    				"senderAddress": data.results[i].SenderAddress,
										    				"containerType": data.results[i].ContainerType,
										    				"salesGrade": data.results[i].SalesGrade,
										    				"conditionCode": data.results[i].ConditionCode,
										    				"lesseeAuthAmnt": data.results[i].LesseAuthAmt,
										    				"currencyCode": data.results[i].CurrencyCode,
										    				"unitPartCode": data.results[i].UnitPartCode,
										    				"estimateTypeCode": data.results[i].EstimateType,
										    				'estimateId':data.results[i].EstimateNumber
										    			});
										    		}
										    		busyDialog.close();

										    		var bus = sap.ui.getCore().getEventBus();
								        	  		bus.publish("nav", "to", {
								        		    id : "MessageUniqueIDDetails"
								        	  		});

								        	  		var oMsgUniqueIDDetObjJLREDITL = new messageUniqueIDDetailsJLREDITLView();
								        	  		oMsgUniqueIDDetObjJLREDITL.updateMsgUniqueIDDetJLREDITL();
								        	  		oMsgUniqueIDDetObjJLREDITL.updateAddRepairLineTableDTEDITL("D");
								        	  		oMsgUniqueIDDetObjJLREDITL.updateErrorMsgTblDTEDITL();
																if(msgTypeUniqueIDPassFMDEDITL == "REEFER PENDING MSG"){ // MACALPHA19032018_12
																	sap.ui.getCore().byId("idTblMUIDErrorsJLRMUIEDITL").setVisible(false);
																	sap.ui.getCore().byId("idBtnMUIDAddRepLineJLREDITL").setVisible(false);
																	sap.ui.getCore().byId("idBtnMUIDResubmitJLREDITL").setVisible(false);
																	sap.ui.getCore().byId("idTableAddRepairLineDTEDITLDelete").setVisible(false);
																}else{
																	sap.ui.getCore().byId("idTblMUIDErrorsJLRMUIEDITL").setVisible(true);
																	sap.ui.getCore().byId("idBtnMUIDAddRepLineJLREDITL").setVisible(true);
																	sap.ui.getCore().byId("idBtnMUIDResubmitJLREDITL").setVisible(true);
																	sap.ui.getCore().byId("idTableAddRepairLineDTEDITLDelete").setVisible(true);
																}
							        	  		}
									    		else{

									    			arrMsgUniqueIDDetEDITL = [];

									    			/*for(var i=0; i<data.results.length; i++){
										    			arrMsgUniqueIDDetEDITL.push({
										    				"serialNumbr": data.results[i].SerialNumber,
										    				"msgType": data.results[i].MessageType,
										    				"userName": data.results[i].UserName,
										    				"funcLoc": data.results[i].FunctionalLocat,
										    				"gateDate": data.results[i].GateDate,
										    				"senderAddress": data.results[i].SenderAddress,
										    				"containerType": data.results[i].ContainerType,
										    				"releaseNumbr": data.results[i].ReleaseNumber,
										    				"conditionGrade": data.results[i].ConditionGrade,
										    				"conditionCode": data.results[i].ConditionCode,
										    				"transactionNumbr": data.results[i].LeaseContractN,
										    				"POLineItem": data.results[i].Poline,
										    				"PONumbr": data.results[i].Ponumber,
										    				"unitPartCode": data.results[i].UnitPartCode,
										    				"estimateTypeCode": data.results[i].EstimateType,
										    				"tankNumbr": data.results[i].TankNumber,
										    				"description": data.results[i].TankNumber,
										    				"tankCleanDesc": data.results[i].TankCleaningPr,
										    				"tankCertDate": data.results[i].TankCertiDate,
										    			});
										    		}*/
									    			for(var i=0; i<data.results.length; i++){
										    			var vGateDateSplit = data.results[i].GateDate.split("(");
													    var vGateDate = vGateDateSplit[1].split(")");
													    var GateDate = dateFormat(new Date(Number(vGateDate[0])), 'dd-mm-yyyy',"UTC");
													    if(GateDate.substring(6) == "9999")
													    	GateDate = "";
													    else
													    	GateDate = GateDate;

													    var vTankCertDateSplit = data.results[i].TankCertiDate.split("(");
													    var vTankCertDate = vTankCertDateSplit[1].split(")");
													    var TankCertDate = dateFormat(new Date(Number(vTankCertDate[0])), 'dd-mm-yyyy',"UTC");
													    if(TankCertDate.substring(6) == "9999")
													    	TankCertDate = "";
													    else
													    	TankCertDate = TankCertDate;

										    			arrMsgUniqueIDDetEDITL.push({
										    				"serialNumbr": data.results[i].SerialNumber,
										    				"msgType": data.results[i].ContainerStatus,
										    				"userName": data.results[i].Param1,
										    				"funcLoc": data.results[i].FunctionalLocat,
										    				"gateDate": GateDate,
										    				"senderAddress": data.results[i].SenderAddress,
										    				"containerType": data.results[i].ContainerType,
										    				"releaseNumbr": data.results[i].ReleaseNumber,
										    				"conditionGrade": data.results[i].ConditionGrade,
										    				"conditionCode": data.results[i].ConditionCode,
										    				"transactionNumbr": data.results[i].ReturnAuthNumb,
										    				"POLineItem": data.results[i].Poline,
										    				"PONumbr": data.results[i].Ponumber,
										    				"unitPartCode": data.results[i].UnitPartCode,
										    				"estimateTypeCode": data.results[i].EstimateType,
										    				"tankNumbr": data.results[i].TankNumber,
										    				"description": data.results[i].TankLastCargo,
										    				"tankCleanDesc": data.results[i].TankCleaningPr,
										    				"tankCertDate": TankCertDate,
										    			});
									    			}

										    		busyDialog.close();

										    		var bus = sap.ui.getCore().getEventBus();
								        	  		bus.publish("nav", "to", {
								        		    id : "MessageUniqueID"
								        	  		});

								        	  		var oMsgUniqueIDDetObjEDITL = new messageUniqueIDEDITLView();
								        	  		oMsgUniqueIDDetObjEDITL.updateMsgUniqueIDDetEDITL();

									    		}
									    }
									    },
									    function(err){
									    	 busyDialog.close();
									    	 errorfromServer(err);
									    	//alert("Error while Reading Result : "+ window.JSON.stringify(err.response));
									    });
						    }
						    },
						    function(err){
						    	 busyDialog.close();
						    	 errorfromServer(err);
						    	//alert("Error while Reading Result : "+ window.JSON.stringify(err.response));
						    });
				 }
			 }).bindProperty("text", "msgUniqueID").bindProperty("helpId", "type").addStyleClass("wraptext"),
    		 resizable:false,
             sortProperty: "msgUniqueID",
             filterProperty: "msgUniqueID",
             width:"auto",	// MACHANACHANGES_12062019 changed from xx px to auto
    		 }));

    	oTableFailMsgDetEDITL.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Type"}),
			 template: new sap.ui.commons.TextView().bindProperty("text", "type").addStyleClass("wraptext"),
			 resizable:false,
             sortProperty: "type",
             filterProperty: "type",
             width:"auto",	// MACHANACHANGES_12062019 changed from xx px to auto
			 }));

    	oTableFailMsgDetEDITL.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Message Name"}),
			 template: new sap.ui.commons.TextView().bindProperty("text", "msgName").addStyleClass("wraptext"),
			 resizable:false,
             sortProperty: "msgName",
             filterProperty: "msgName",
             width:"auto",	// MACHANACHANGES_12062019 changed from xx px to auto
			 }));

    	oTableFailMsgDetEDITL.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Source"}),
			 template: new sap.ui.commons.TextView().bindProperty("text", "source").addStyleClass("wraptext"),
			 resizable:false,
             sortProperty: "source",
             filterProperty: "source",
             width:"auto",	// MACHANACHANGES_12062019 changed from xx px to auto
			 }));

    	oTableFailMsgDetEDITL.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Serial Number"}),
			 template: new sap.ui.commons.TextView().bindProperty("text", "serialNumber").addStyleClass("wraptext"),
			 resizable:false,
             sortProperty: "serialNumber",
             filterProperty: "serialNumber",
             width:"auto",	// MACHANACHANGES_12062019 changed from xx px to auto
			 }));

    	oTableFailMsgDetEDITL.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Submitted Date"}),
			 template: new sap.ui.commons.TextView().bindProperty("text", "submittedDate").addStyleClass("wraptext"),
			 resizable:false,
             sortProperty: "submittedDateActual",
             filterProperty: "submittedDate",
             width:"auto",	// MACHANACHANGES_12062019 changed from xx px to auto
			 }));

    	oTableFailMsgDetEDITL.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Message Date"}),
			 template: new sap.ui.commons.TextView().bindProperty("text", "messageDate").addStyleClass("wraptext"),
			 resizable:false,
             sortProperty: "messageDateActual",
             filterProperty: "messageDate",
             width:"auto",	// MACHANACHANGES_12062019 changed from xx px to auto
			 }));

    	oTableFailMsgDetEDITL.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: ""}),
			 template: new sap.ui.commons.Link({
				 press: function(){
					 busyDialog.open();

					 vMsgUniqueIdToPassFMDEDITL = this.getHelpId();

					 oModel = new sap.ui.model.odata.ODataModel(serviceUrl15, true);
						var urlToCallViewErrorEDITL = serviceUrl15 + "/EDI_MsgUniqueID_Hlink?$filter=MsgUidXi eq '" + vMsgUniqueIdToPassFMDEDITL + "'";
						//alert("urlToCallViewErrorEDITL : "+urlToCallViewErrorEDITL);
						OData.request({
						      requestUri: urlToCallViewErrorEDITL,
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
						    	//alert("data.results.length : "+data.results.length);
						    	if(data.results.length == 0){
						    		 busyDialog.close();
						    		sap.ui.commons.MessageBox.show("No Result Found. Please try again.",
				                            sap.ui.commons.MessageBox.Icon.WARNING,
				                            "Warning",
				                            [sap.ui.commons.MessageBox.Action.OK],
				                            sap.ui.commons.MessageBox.Action.OK);
						    	}
						    	else{
						    		arrViewErrorDetailEDITL = [];
						    		for(var i=0; i<data.results.length; i++){

						    			arrViewErrorDetailEDITL.push({
						    				"errorType": data.results[i].ErrType,
						    				"id": data.results[i].ErrId,
						    				"field": data.results[i].ErrField,
						    				"number": data.results[i].ErrNumber,
						    				"message": data.results[i].ErrMessage
						    			});
						    		}
						    		busyDialog.close();

						    		var bus = sap.ui.getCore().getEventBus();
				        	  		bus.publish("nav", "to", {
				        		    id : "ViewErrorsEDITL"
				        	  		});

				        	  		var oViewErrorsObjEDITL = new viewErrorsEDITLView();
				        	  		oViewErrorsObjEDITL.updateViewErrorsEDITL();
						    }
						    },
						    function(err){
						    	 busyDialog.close();
						    	 errorfromServer(err);
						    	//alert("Error while Reading Result : "+ window.JSON.stringify(err.response));
						    });
				 }
			 }).bindProperty("visible", "viewErrorVisible").bindProperty("text", "viewError").bindProperty("helpId", "msgUniqueID").addStyleClass("wraptext"),
			 resizable:false,
             sortProperty: "viewError",
             filterProperty: "viewError",
             width:"auto",	// MACHANACHANGES_12062019 changed from xx px to auto
			 }));

    	oTableFailMsgDetEDITL.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.CheckBox("idSelectAllChkBxEdiMsgUniq",{
	   		 	 change : function(){
	   		 		 oCurrEDITL.SelectAllCurrRet();
		   		 	 }
		   		 	}),
	   		 template: new sap.ui.commons.CheckBox().bindProperty("checked", "checked").bindProperty("name", "msgUniqueID"),
			 resizable:false,
			 width:"auto",	// MACHANACHANGES_12062019 changed from xx px to auto
			 }));

    	// Buttons
	   	 var oBtnFailMsgDetResubmit = new sap.m.Button("idBtnFailMsgDetResubmitEDITL",{
		          text : "Resubmit",
		          //width:"80px",
		          styled:false,
		          visible: false,
		          layoutData: new sap.ui.layout.GridData({span: "L2 M5 S4",linebreak: true, margin: true}),
		          press:function(){
		        	  arrayLenResFailEDITL = arrFailMsgDetEDITL.length;
		        	  var unCheckedCount = 0;
		        	  for(var j=0; j<arrayLenResFailEDITL; j++){
		        		  if(arrFailMsgDetEDITL[j].checked == false){
		        			  unCheckedCount++;
		        		  }
		        	  }
		        	  if(unCheckedCount == arrayLenResFailEDITL){
		        		  sap.ui.commons.MessageBox.show("Please select atleast 1 message for resubmit and retry.",
		                            sap.ui.commons.MessageBox.Icon.WARNING,
		                            "Warning",
		                            [sap.ui.commons.MessageBox.Action.OK],
		                            sap.ui.commons.MessageBox.Action.OK);
		        	  }
		        	  else{

		        		  sap.ui.commons.MessageBox.show("Are you sure you want to resubmit the selected messages? This action cannot be undone.",
			                      sap.ui.commons.MessageBox.Icon.WARNING,
			                            "Warning",
			          [sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO],
			          oCurrEDITL.resubmitFailMsgEDITL,
			          sap.ui.commons.MessageBox.Action.YES);
		        	  }
		          }}).addStyleClass("submitBtn marginTop10");

	   	var oBtnFailMsgDetDelete = new sap.m.Button("idBtnFailMsgDetDeleteEDITL",{
	          text : "Delete",
	          //width:"80px",
	          styled:false,
	          layoutData: new sap.ui.layout.GridData({span: "L2 M5 S4",linebreak: true, margin: true}),
	          press:function(){
	        	  arrayLenFailEDITL = arrFailMsgDetEDITL.length;
	        	  var unCheckedCount = 0;
	        	  for(var j=0; j<arrayLenFailEDITL; j++){
	        		  if(arrFailMsgDetEDITL[j].checked == false){
	        			  unCheckedCount++;
	        		  }
	        	  }
	        	  if(unCheckedCount == arrayLenFailEDITL){
	        		  sap.ui.commons.MessageBox.show("Please select atleast 1 message for deletion and retry.",
	                            sap.ui.commons.MessageBox.Icon.WARNING,
	                            "Warning",
	                            [sap.ui.commons.MessageBox.Action.OK],
	                            sap.ui.commons.MessageBox.Action.OK);
	        	  }
	        	  else{

	        		  sap.ui.commons.MessageBox.show("Are you sure you want to delete the selected messages? This action cannot be undone.",
		                      sap.ui.commons.MessageBox.Icon.WARNING,
		                            "Warning",
		          [sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO],
		          oCurrEDITL.deleteFailMsgDetEDITL,
		          sap.ui.commons.MessageBox.Action.YES);
	        	  }
	          }}).addStyleClass("submitBtn marginTop10");

	   	var oFlexBtnsEDITL = new sap.m.FlexBox({
	           items: [
						oBtnFailMsgDetResubmit,
						oLabelSpaceEDITL,
						oBtnFailMsgDetDelete
	           ],
	           layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12",linebreak: false, margin: false}),
	           direction : "Row",
				});


	 // Responsive Grid Layout
	    var oFailMsgDetLayout = new sap.ui.layout.form.ResponsiveGridLayout("idEDITLFailMsgDetLayout",{
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

	  // Online Form Starts
	     var oEDITLFailMsgDetForm = new sap.ui.layout.form.Form("idEDITLFailMsgDetForm",{
	             layout: oFailMsgDetLayout,
	             formContainers: [

	                     new sap.ui.layout.form.FormContainer("idEDITLFailMsgDetFormC1",{
	                             //title: "Add Movement Out - Single",
                             formElements: [
												new sap.ui.layout.form.FormElement({
											    fields: [bckFrmResultsToEDITL]
												}),
                                            	new sap.ui.layout.form.FormElement({
												    fields: [oFlexTitlesLREDITL]
												}),
                                            	new sap.ui.layout.form.FormElement({
												    fields: [oTableFailMsgDetEDITL]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oFlexBtnsEDITL]
												})
	                                     ]
	                     }),
	             ]
	     });

	     return oEDITLFailMsgDetForm;
	},

	updateFailMsgDetEDITL: function(){

		jsonInventory = [];
		for(var i = 0; i<arrFailMsgDetEDITL.length; i++){
			jsonInventory.push({
  				"Message Unique ID": arrFailMsgDetEDITL[i].msgUniqueID,
  				"Type": arrFailMsgDetEDITL[i].type,
  				"Message Name": arrFailMsgDetEDITL[i].msgName,
				"Functional Location": arrFailMsgDetEDITL[i].MsgFloc,				// MAC31082015 +
				"sender ID": arrFailMsgDetEDITL[i].MsgSender,			// MAC31082015 +
  				"Source": arrFailMsgDetEDITL[i].source,
  				"Serial Number": arrFailMsgDetEDITL[i].serialNumber,
  				"Submitted Date": arrFailMsgDetEDITL[i].submittedDate,
  				"Message Date": arrFailMsgDetEDITL[i].messageDate,
  			});
		}

		oModelFailMsgDetEDITL = new sap.ui.model.json.JSONModel();
    	oModelFailMsgDetEDITL.setData({modelData: arrFailMsgDetEDITL});
    	sap.ui.getCore().byId("idTblFailMsgDetEDITL").setModel(oModelFailMsgDetEDITL);
    	sap.ui.getCore().byId("idTblFailMsgDetEDITL").bindRows("/modelData");

    	//sap.ui.getCore().byId("idFailMsgDetTitleEDITL").setText("Error Details for " + vMsgTypeDispFMDEDITL);
		sap.ui.getCore().byId("idFailMsgDetTitleEDITL").setText("Error Details");
    	sap.ui.getCore().byId("idFailMsgDetCountEDITL").setText("Total Error Messages : " + arrFailMsgDetEDITL.length);

    	if(arrFailMsgDetEDITL.length >= 25){
    		sap.ui.getCore().byId("idTblFailMsgDetEDITL").setVisibleRowCount(25);
    		sap.ui.getCore().byId("idTblFailMsgDetEDITL").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
    	}
    	else{
    		sap.ui.getCore().byId("idTblFailMsgDetEDITL").setVisibleRowCount(arrFailMsgDetEDITL.length);
    		sap.ui.getCore().byId("idTblFailMsgDetEDITL").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
    	}
	},

	deleteFailMsgDetEDITL: function(sResult){
		var msgIdCount = 1;
		var stringToPassEDITL = "";
		var stringMsgId = "";

		arrDeleteMsgEDITL = [];

		if(sResult == "YES"){
			busyDialog.open();
			for(var j=0; j<arrFailMsgDetEDITL.length; j++){
				if(arrFailMsgDetEDITL[j].checked){
					arrDeleteMsgEDITL.push(arrFailMsgDetEDITL[j]);
				}
			}
			if(arrDeleteMsgEDITL.length <=10){
				for(var i=0; i<arrDeleteMsgEDITL.length; i++){
					if(stringMsgId == ""){
						stringMsgId = stringMsgId + arrDeleteMsgEDITL[i].msgUniqueID;
					}
					else{
						stringMsgId = stringMsgId + "$" + arrDeleteMsgEDITL[i].msgUniqueID;
					}
				}
					stringToPassEDITL = "IMsgId" + msgIdCount + " eq '" + stringMsgId + "'";
					//alert("stringToPassEDITL : "+stringToPassEDITL);
			}
			else{
				var countSet = (arrDeleteMsgEDITL.length/10).toString().split(".")[0];
				var indexStart = 0;
				var indexEnd = 10;

				var extraCount = (arrDeleteMsgEDITL.length) - (countSet*10);

				for(var k=0; k<countSet; k++){
					stringMsgId = "";
					for(var i=indexStart; i<indexEnd; i++){
						if(stringMsgId == ""){
							stringMsgId = stringMsgId + arrDeleteMsgEDITL[i].msgUniqueID;
						}
						else{
							stringMsgId = stringMsgId + "$" + arrDeleteMsgEDITL[i].msgUniqueID;
						}
					}
					if(stringToPassEDITL == ""){
						stringToPassEDITL = stringToPassEDITL + "IMsgId" + msgIdCount + " eq '" + stringMsgId + "'";
					}
					else{
						stringToPassEDITL = stringToPassEDITL + "and IMsgId" + msgIdCount + " eq '" + stringMsgId + "'";
					}
					msgIdCount = msgIdCount +1;
					indexStart = indexStart + 10;
					indexEnd = indexEnd + 10;
			}
				stringMsgId = "";
				for(var i=(arrDeleteMsgEDITL.length - extraCount); i<(arrDeleteMsgEDITL.length); i++){
					if(stringMsgId == ""){
						stringMsgId = stringMsgId + arrDeleteMsgEDITL[i].msgUniqueID;
					}
					else{
						stringMsgId = stringMsgId + "$" + arrDeleteMsgEDITL[i].msgUniqueID;
					}
				}
				stringToPassEDITL = stringToPassEDITL + "and IMsgId" + msgIdCount + " eq '" + stringMsgId + "'";
						//alert("stringToPassEDITL : "+stringToPassEDITL);
			}
			for(var i=(arrFailMsgDetEDITL.length)-1; i>=0; i--){
    		  if(arrFailMsgDetEDITL[i].checked){
    			  arrFailMsgDetEDITL.splice(i,1);
    			  oModelFailMsgDetEDITL.updateBindings();
    			  arrayLenFailEDITL = arrayLenFailEDITL - 1;
    		  }
			}

			// Begin of adding by Seyed Ismail on 31.07.2015 MAC31072015+
			if (arrayLenFailEDITL < 25){
	    		sap.ui.getCore().byId("idTblFailMsgDetEDITL").setVisibleRowCount(arrayLenFailEDITL);
	    		sap.ui.getCore().byId("idTblFailMsgDetEDITL").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
	    	}
	    	else{
	    		sap.ui.getCore().byId("idTblFailMsgDetEDITL").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
	    		sap.ui.getCore().byId("idTblFailMsgDetEDITL").setVisibleRowCount(25);
	    	}

			jsonInventory = [];
			for(var i = 0; i<arrFailMsgDetEDITL.length; i++){
				jsonInventory.push({
	  				"Message Unique ID": arrFailMsgDetEDITL[i].msgUniqueID,
	  				"Type": arrFailMsgDetEDITL[i].type,
	  				"Message Name": arrFailMsgDetEDITL[i].msgName,
					"Functional Location": arrFailMsgDetEDITL[i].MsgFloc,				// MAC31082015 +
					"sender ID": arrFailMsgDetEDITL[i].MsgSender,			// MAC31082015 +
	  				"Source": arrFailMsgDetEDITL[i].source,
	  				"Serial Number": arrFailMsgDetEDITL[i].serialNumber,
	  				"Submitted Date": arrFailMsgDetEDITL[i].submittedDate,
	  				"Message Date": arrFailMsgDetEDITL[i].messageDate
	  			});
			}

			// End of adding by Seyed Ismail on 31.07.2015 MAC31072015+
      	  sap.ui.getCore().byId("idFailMsgDetCountEDITL").setText("Total Error Messages : " + arrFailMsgDetEDITL.length);

      	  	oModel = new sap.ui.model.odata.ODataModel(serviceUrl15, true);
			var urlToCallDeleteMsgsEDITL = serviceUrl15 + "/EDI_Delete?$filter=" + stringToPassEDITL ;
			//alert("urlToCallDeleteMsgsEDITL : "+urlToCallDeleteMsgsEDITL);
			OData.request({
			      requestUri: urlToCallDeleteMsgsEDITL,
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
			    	//alert("data.results.length : "+data.results.length);
			    	if(data.results.length == 0){
			    		 busyDialog.close();
			    		 sap.ui.commons.MessageBox.show("Your request could not be processed at this time.\n Please try again later.",
			    		            sap.ui.commons.MessageBox.Icon.INFORMATION,
			    		            "Information",
			    		            [sap.ui.commons.MessageBox.Action.OK],
			    		            sap.ui.commons.MessageBox.Action.OK);
			    	}
			    	else{
			    		busyDialog.close();
			    		sap.ui.commons.MessageBox.alert("Messages deleted successfully!", okDeleteMultipleEDITL(arrFailMsgDetEDITL));
			    	}
			    },
			    function(err){
			    	 busyDialog.close();
			    	 errorfromServer(err);
			    	//alert("Error while Reading Result : "+ window.JSON.stringify(err.response));
			    });
		  }
		else{
			for(var i=0; i<arrFailMsgDetEDITL.length; i++){
	    		  if(arrFailMsgDetEDITL[i].checked){
	    			  arrFailMsgDetEDITL[i].checked = false;
	    			  oModelFailMsgDetEDITL.updateBindings();
	    		  }
				}
		}
	},

	resubmitFailMsgEDITL: function(sResult){
		var msgIdCount = 1;
		var stringToPassEDITL = "";
		var stringMsgId = "";

		arrResubmitMsgEDITL = [];

		if(sResult == "YES"){
			busyDialog.open();
			for(var j=0; j<arrFailMsgDetEDITL.length; j++){
				if(arrFailMsgDetEDITL[j].checked){
					arrResubmitMsgEDITL.push(arrFailMsgDetEDITL[j]);
				}
			}
			if(arrResubmitMsgEDITL.length <=10){
				for(var i=0; i<arrResubmitMsgEDITL.length; i++){
					if(stringMsgId == ""){
						stringMsgId = stringMsgId + arrResubmitMsgEDITL[i].msgUniqueID;
					}
					else{
						stringMsgId = stringMsgId + "$" + arrResubmitMsgEDITL[i].msgUniqueID;
					}
				}
					stringToPassEDITL = "IMsgId" + msgIdCount + " eq '" + stringMsgId + "'";
					//alert("stringToPassEDITL : "+stringToPassEDITL);
			}
			else{
				var countSet = (arrResubmitMsgEDITL.length/10).toString().split(".")[0];
				var indexStart = 0;
				var indexEnd = 10;

				var extraCount = (arrResubmitMsgEDITL.length) - (countSet*10);

				for(var k=0; k<countSet; k++){
					stringMsgId = "";
					for(var i=indexStart; i<indexEnd; i++){
						if(stringMsgId == ""){
							stringMsgId = stringMsgId + arrResubmitMsgEDITL[i].msgUniqueID;
						}
						else{
							stringMsgId = stringMsgId + "$" + arrResubmitMsgEDITL[i].msgUniqueID;
						}
					}
					if(stringToPassEDITL == ""){
						stringToPassEDITL = stringToPassEDITL + "IMsgId" + msgIdCount + " eq '" + stringMsgId + "'";
					}
					else{
						stringToPassEDITL = stringToPassEDITL + "and IMsgId" + msgIdCount + " eq '" + stringMsgId + "'";
					}
					msgIdCount = msgIdCount +1;
					indexStart = indexStart + 10;
					indexEnd = indexEnd + 10;
			}
				stringMsgId = "";
				for(var i=(arrResubmitMsgEDITL.length - extraCount); i<(arrResubmitMsgEDITL.length); i++){
					if(stringMsgId == ""){
						stringMsgId = stringMsgId + arrResubmitMsgEDITL[i].msgUniqueID;
					}
					else{
						stringMsgId = stringMsgId + "$" + arrResubmitMsgEDITL[i].msgUniqueID;
					}
				}
				stringToPassEDITL = stringToPassEDITL + "and IMsgId" + msgIdCount + " eq '" + stringMsgId + "'";
						//alert("stringToPassEDITL : "+stringToPassEDITL);
			}
			for(var i=(arrFailMsgDetEDITL.length)-1; i>=0; i--){
    		  if(arrFailMsgDetEDITL[i].checked){
    			  arrFailMsgDetEDITL.splice(i,1);
    			  oModelFailMsgDetEDITL.updateBindings();
    			  arrayLenFailEDITL = arrayLenFailEDITL - 1;
    		  }
			}

      	  sap.ui.getCore().byId("idFailMsgDetCountEDITL").setText("Total Error Messages : " + arrFailMsgDetEDITL.length);

      	  	oModel = new sap.ui.model.odata.ODataModel(serviceUrl15, true);
			var urlToCallResubmitMsgsEDITL = serviceUrl15 + "/EDI_Resubmit?$filter=" + stringToPassEDITL ;
			//alert("urlToCallResubmitMsgsEDITL : "+urlToCallResubmitMsgsEDITL);
			OData.request({
			      requestUri: urlToCallResubmitMsgsEDITL,
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
			    	//alert("data.results.length : "+data.results.length);
			    	if(data.results.length == 0){
			    		 busyDialog.close();
			    		 sap.ui.commons.MessageBox.show("Your request could not be processed at this time.\n Please try again later.",
			    		            sap.ui.commons.MessageBox.Icon.INFORMATION,
			    		            "Information",
			    		            [sap.ui.commons.MessageBox.Action.OK],
			    		            sap.ui.commons.MessageBox.Action.OK);
			    	}
			    	else{
			    		busyDialog.close();
			    		sap.ui.commons.MessageBox.alert("Message(s) resubmitted successfully!", okResubmitMultipleEDITL);
			    	}
			    },
			    function(err){
			    	 busyDialog.close();
			    	 errorfromServer(err);
			    	//alert("Error while Reading Result : "+ window.JSON.stringify(err.response));
			    });
		  }
		else{
			for(var i=0; i<arrFailMsgDetEDITL.length; i++){
	    		  if(arrFailMsgDetEDITL[i].checked){
	    			  arrFailMsgDetEDITL[i].checked = false;
	    			  oModelFailMsgDetEDITL.updateBindings();
	    		  }
				}
		}
	},
	/* Begin of adding by Seyed Ismail on 13.03.2015 MAC13032015+*/
	SelectAllCurrRet:function(){
		//var len = arrFailMsgDetEDITL.length;
		var vFailMsgDetl = sap.ui.getCore().byId("idTblFailMsgDetEDITL");
		var len = vFailMsgDetl.getVisibleRowCount();
		if(sap.ui.getCore().byId("idSelectAllChkBxEdiMsgUniq").getChecked()){
			for(var i=0;i<len;i++){
				arrFailMsgDetEDITL[i].checked = true;
			}
		}
		else{
			for(var i=0;i<len;i++){
				arrFailMsgDetEDITL[i].checked = false;
			}
		}

		vFailMsgDetl.getModel().updateBindings();
	} //SelectAllUnitNumbers
	/* End of adding by Seyed Ismail on 13.03.2015 MAC13032015+*/

});

function okResubmitMultipleEDITL(){
	 new ediTransmissionLogView().FailHyperLinkEDITL("R");
}

function okDeleteMultipleEDITL(arrFailMsgDetEDITL){
// Begin of adding by Seyed Ismail on 31.07.2015 MAC31072015+
if(arrFailMsgDetEDITL.length == 0){
		var oEDITransDepot = new ediTransmissionLogView();
	oEDITransDepot.allDepotDetails();
	var bus = sap.ui.getCore().getEventBus();
		bus.publish("nav", "to", {
			id : "EDIAllDepot"
		});
}
}
// End of adding by Seyed Ismail on 31.07.2015 MAC31072015+

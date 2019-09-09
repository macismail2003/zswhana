/******** NP *******/
/*
*$*$------------------------------------------------------------------------*
*$*$ Modified By : Seyed Ismail MAC
*$*$ Modified On : 27.01.2014
*$*$ Reference   : RTS1002
*$*$ Transport   : CGWK900824
*$*$ Tag         : MAC27012014
*$*$ Purpose     : Removed JS from external users
*$*$---------------------------------------------------------------------
**$*$------------------------------------------------------------------------*
*$*$ Modified By : Seyed Ismail MAC
*$*$ Modified On : 28.05.2015
*$*$ Reference   : RTS 1182
*$*$ Transport   : CGWK900972
*$*$ Tag         : MAC28052015
*$*$ Purpose     : * Include Responsibility Code - V
				   				 * Make Responsibility Code - V and J - available only for Joint Survey
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
*/

jQuery.sap.require("sap.ui.model.json.JSONModel");
var objcurntREEntryJ,objcrntRJSREEntryJ;
var oMdlLineItemREEntryJ = new sap.ui.model.json.JSONModel();
var jsnLineItemREEntryJ = [];
var globalLabCostC = 0;	// MACALPHA19032018_5 +
var globalLabCostM = 0; // MACALPHA19032018_5 +
var globalLabCostCFromValidate = 0;	// MACALPHA19032018_5 +
var globalLabCostMFromValidate = 0; // MACALPHA19032018_5 +
var globalLabCostCurrency = ""; // MACALPHA19032018_5 +
var globalEstimateIsReefer = ""; // MACALPHA19032018_5 +

function padZero(num, size) {
		    var s = num+"";
		    while (s.length < size) s = "0" + s;
		    return s;
		};
var oMdlDtPkrEstmtREEntryJ, unitNo, DepoId, DepoText, ReferJS = false,
clickEvent ="";

//SET GLOBAL DROPDOWN TEMPLATE FOR STATIC DATA
var oItmTmpltGloabREEntryJ = new sap.ui.core.ListItem();
oItmTmpltGloabREEntryJ.bindProperty("text", "text");
oItmTmpltGloabREEntryJ.bindProperty("key", "key");

	jsnLineItemREEntryJ.removeValue = function(name, value){
		var arrayval = this.filter(function(el){
			return el[name] != value;
		});

		this.length = 0; //clear original array
		this.push.apply(this, arrayval); //push all elements except the one we want to delete
	},

	jsnLineItemREEntryJ.resetSequence = function(name, length){
		if(this.length == 1){
			this[this.length-1][name] = padZero(1,length);
		}else{
			var lastSeq = parseInt(this[this.length-2][name])+1;
			this[this.length-1][name] = padZero(lastSeq,length);
		}

		/*for(var seqid in this){
			var srno = parseInt(seqid)+1;
			this[seqid][name] = padZero(srno,length);
		}*/
	},

sap.ui.model.json.JSONModel.extend("RepairEstimateEntryJ", {
createRepairEstimateEntryForm: function(){
		jsnLineItemREEntryJ.length = 0;
		for(var i =0; i < 10; i++){
		jsnLineItemREEntryJ.push({"checked":false,"LineItem":padZero(i+1,4),"sectionKey":"",
			"sectionText":"","LocationKey":"",	"LocationText":"",
			"ComponentKey":"","ComponentText":"","DamageKey":"","DamageText":"",
			"RepairKey":"","RepairText":"",	"MaterialKey":"","MaterialText":"","MaterialCost":"",
			"ManHours":"","RepairLength":"","RepairWidth":"","Quantity":"",
			responsibility:[],
			"ResponsibilityKey":"","ResponsibilityText":"","LabourRate":"",
			"TechBulletin":"","DataInserted":false});
		}

		unitNo = selctdUNDepoRESearchJ.split('|')[0];
		DepoId = selctdUNDepoRESearchJ.split('|')[1];
		DepoText = selctdUNDepoRESearchJ.split('|')[2];
		DepoText = DepoText.substr(0,DepoText.lastIndexOf('-'));
		var oController = sap.ui.controller("view.RepairEstimateEntryJVw");
		objcurntREEntryJ = new RepairEstimateEntryJ();
		//jsnLineItemREEntryJ.length = 0;
		var depotEnabled = false, depotId = '';
		//if((objLoginUser.getLoggedInUserType() != "DEPOT") && (objLoginUser.getLoggedInUserType() != "FACTORY")){
			depotEnabled = true;
		//}else{
			//depotId = objLoginUser.getLoggedInUserID();
		//}
		// Responsive Grid Layout
		var oRepaiREEntryJLayout = new sap.ui.layout.form.ResponsiveGridLayout({
			  labelSpanL: 1,
			  labelSpanM: 1,
			  labelSpanS: 1,
			  emptySpanL: 0,
			  emptySpanM: 0,
			  emptySpanS: 0,
			  columnsL: 1,
			  columnsM: 1,
			  columnsS: 1,
			  //breakpointL: 765,
			  //breakpointM: 320
		});

	 //FIRST ROW
		var olblUnitPCodeREEntryJIn = new sap.ui.commons.Label({text: "Unit Part Code:",
			required: true,
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: true, margin: true}),
			wrapping: true}).addStyleClass("marginTop10");

		var oDdlUnitPCodeREEntryJIn = new sap.ui.commons.DropdownBox("idDdlUnitPCodeREEntryJIn", {
			  layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12"}),
			  width:"100%",
			  displaySecondaryValues:false,
			  placeholder: "Select Unit Part Code",
			  visible:false,
			  change: function(evnt){
				if(this.getValue() != '')
				{
					this.setValueState(sap.ui.core.ValueState.None);
					this.setPlaceholder("Select Unit Part Code");
					sap.ui.getCore().byId("idDdlUnitPCodeREEntryJ").setSelectedKey(this.getSelectedKey());
					var headerText = sap.ui.getCore().byId("idlblEstmtHdrREEntryJ").getText();
					if(this.getSelectedKey() == "M")
						headerText = headerText.replace('Carcass', 'Machinery');
					else
						headerText = headerText.replace('Machinery', 'Carcass');
					}
					sap.ui.getCore().byId("idlblEstmtHdrREEntryJ").setText(headerText);

					var isJSSelected = sap.ui.getCore().byId("idDdlJobTypeREEntryJ").getSelectedKey();
					if(isJSSelected == "Joint Survey")
						{
							objREstimateOnlineJ.onlinefunJointSurvey();
						}
			  },
		}).addStyleClass("FormInputStyle marginTop7");

		/*oDdlUnitPCodeREEntryJ.setModel(omdlGlobalRESData);
		oDdlUnitPCodeREEntryJ.bindItems("/UnitPartCode", oItmTmpltGloabREEntryJ);
		sap.ui.getCore().byId("idDdlUnitPCodeREEntryJ").setSelectedKey("C");*/

		var ddlUpcDataIn = [];
		ddlUpcDataIn.push({	"text":"C - Carcass",
									"key":"C"
						});

		ddlUpcDataIn.push({	"text":"M - Machinery",
			"key":"M"
		});



  	  	var oDdlUpcModelIn = new sap.ui.model.json.JSONModel();
  	  	oDdlUpcModelIn.setSizeLimit(99999);
  	  	oDdlUpcModelIn.setData({data:ddlUpcDataIn});

  	  	oDdlUnitPCodeREEntryJIn.setModel(oDdlUpcModelIn);
  	  	oDdlUnitPCodeREEntryJIn.setSelectedKey(ddlUpcDataIn[0].key);
  	  	oDdlUnitPCodeREEntryJIn.bindItems("/data", new sap.ui.core.ListItem({text: "{text}", key:"{key}"}));

		var olblJobTypeREEntryJ = new sap.ui.commons.Label({text: "Job Type:",
			required: true,
			//layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
			wrapping: false}).addStyleClass("marginTop10");

		var oDdlJobTypeREEntryJ = new sap.ui.commons.DropdownBox("idDdlJobTypeREEntryJ", {
			  //layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"}),
			  width:"100%",
			  displaySecondaryValues:false,
			  placeholder: "Job Type",
			  change: function(evnt){
				if(sap.ui.getCore().byId("idFrmCntnrRJSREEntryJ") != undefined){
							sap.ui.getCore().byId("idFrmCntnrRJSREEntryJ").destroy();
				}

				sap.ui.getCore().byId("idlblSuccessMsgREEJ").setText("");
				sap.ui.getCore().byId("idlblSuccessMsgREEJ").setVisible(false);

				if(sap.ui.getCore().byId("idFrmElmntErrREEntryJ") != undefined){
					sap.ui.getCore().byId("idFrmElmntErrREEntryJ").destroyFields();
					sap.ui.getCore().byId("idFrmElmntErrREEntryJ").destroy();
				}
				if(sap.ui.getCore().byId("idFrmElmntInfoLstREEntryJ") != undefined){
					sap.ui.getCore().byId("idFrmElmntInfoLstREEntryJ").destroyFields();
					sap.ui.getCore().byId("idFrmElmntInfoLstREEntryJ").destroy();
				}

				if(sap.ui.getCore().byId("idlblSuccessMsgJSREE") != undefined){
					sap.ui.getCore().byId("idlblSuccessMsgJSREE").setVisible(false);
					sap.ui.getCore().byId("idlblSuccessMsgJSREE").setText("");
				}

				if(this.getValue() != '')
				{
					this.setValueState(sap.ui.core.ValueState.None);
					this.setPlaceholder("Select Job Type");
				}

				globalLatestJobType = this.getSelectedKey();
				//objcurntREEntryJ.clearJSData(); // MACALPHA19032018_7+ clear joint survey data and zero cost estim checks by default
				if(this.getSelectedKey() == 'Joint Survey' || this.getSelectedKey() == 'Lessor Survey'){	// MACALPHA19032018_7+ added Lessor Survey
						objREstimateOnlineJ.onlinefunJointSurvey();
				}else{

					var depottxt = sap.ui.getCore().byId("idComboDepotRESearchJ").getValue();
					var unitno = sap.ui.getCore().byId("idSerailNoRESearchJ").getValue();
					var vUnitPartCode = 'C';

					var urlToCall = serviceUrl15_old + "/Serialno_Valid_Repair_Estim?$filter=FunctLoc eq '" + depottxt.substr(0, 15) + "' and SerialNo eq '" + unitno + "' and Unitpcode eq 'C'";

					busyDialog.open();
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
						busyDialog.close();

						var resultdata = data;
						globalLabCostC = resultdata.results[0].Labc;
						globalLabCostM = resultdata.results[0].Labr;
						var carcassTitle = "Repair Lines for Carcass - Labour Rate : " + globalLabCostC + " " + globalLabCostCurrency;
	          var machineryTitle = "Repair Lines for Machinery - Labour Rate : " + globalLabCostM + " " + globalLabCostCurrency;

	          sap.ui.getCore().byId("idlblhdrTblREEntryJ1").setText(carcassTitle);
	          sap.ui.getCore().byId("idlblhdrTblREEntryJ2").setText(machineryTitle);

					},
					function(err){

					});


				}/*else if(jointtypeSel){	// MACALPHA19032018_7
					jointtypeSel = false;
					objcurntREEntryJ.clearJointSrvayData();
				}*/
			  },
		}).addStyleClass("FormInputStyle marginTop7");
		oDdlJobTypeREEntryJ.setModel(omdlGlobalRESData);
		oDdlJobTypeREEntryJ.bindItems("/JobType", oItmTmpltGloabREEntryJ);
		/*if(objLoginUser.getLoggedInUserType() == "SEACO"){    // MAC27012014 +
		oDdlJobTypeREEntryJ.setModel(omdlGlobalRESData);
		oDdlJobTypeREEntryJ.bindItems("/JobType", oItmTmpltGloabREEntryJ);
		 Begin of adding by Seyed Ismail on 27.01.2015 // MAC27012014 +
		}
		else{
		var omdlLocalRESData = new sap.ui.model.json.JSONModel();
		var jsnLocalRESData = {};

		jsnLocalRESData.JobType =[];
		jsnLocalRESData.JobType.push({"text":"","key":"","textkey":""});
		jsnLocalRESData.JobType.push({"text":"Original","key":"Original","textkey":"Original"});
		jsnLocalRESData.JobType.push({"text":"Additional" ,"key":"Additional","textkey":"Additional"});
		jsnLocalRESData.JobType.push({"text":"Superseding","key":"Superseding","textkey":"Superseding"});
		jsnLocalRESData.JobType.push({"text":"Pre-Sales" ,"key":"Pre-Sales","textkey":"Pre-Sales"});
		jsnLocalRESData.JobType.push({"text":"Pre-Delivery","key":"Pre-Delivery","textkey":"Pre-Delivery"});

		omdlLocalRESData.setData(jsnLocalRESData);
		oDdlJobTypeREEntryJ.setModel(omdlLocalRESData);
		oDdlJobTypeREEntryJ.bindItems("/JobType", oItmTmpltGloabREEntryJ);
		}
		End of adding by Seyed Ismail on 27.01.2015 // MAC27012014 + */
		var olblSaleGradeREEntryJ = new sap.ui.commons.Label({text: "Sale Grade:",
			//required: true,
			//layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
			wrapping: false}).addStyleClass("marginTop10");

		var oDdlSaleGradeREEntryJ = new sap.ui.commons.DropdownBox("idDdlSaleGradeREEntryJ", {
			  //layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"}),
			  width:"100%",
			  displaySecondaryValues:false,
			  placeholder: "Sale Grade",
			  change: function(evnt){
				if(this.getValue() != '')
				{
					this.setValueState(sap.ui.core.ValueState.None);
					this.setPlaceholder("Select Sale Grade");
				}
			  },
		}).addStyleClass("FormInputStyle marginTop7");
		oDdlSaleGradeREEntryJ.setModel(omdlGlobalRESData);
		oDdlSaleGradeREEntryJ.bindItems("/SaleGrade", oItmTmpltGloabREEntryJ);

		 //SECOND ROW
		var olblEstimatDtREEntryJ = new sap.ui.commons.Label({text: "Estimate Date:",
			required: true,
			//layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
			wrapping: false}).addStyleClass("marginTop10");

		oMdlDtPkrEstmtREEntryJ = new sap.ui.model.json.JSONModel();
			oMdlDtPkrEstmtREEntryJ.setData({dateValue: new Date()});
		var oDtPkrEstimateDtREEntryJ = new sap.ui.commons.DatePicker('idDtPkrEstimateDtREEntryJ',{
			placeholder: "Estimate Date",
			value: {
				path: "/dateValue",
				type: new sap.ui.model.type.Date({pattern: "dd-MM-yyyy"})
				},
				change: function(oEvent){
					if(oEvent.getParameter("invalidValue")){
						oEvent.oSource.setValueState(sap.ui.core.ValueState.Error);
						oEvent.oSource.setValue("");
						oEvent.oSource.setPlaceholder("Invalid Value");
					}
					if(oEvent.oSource.getValue() != ''){
						oEvent.oSource.setValueState(sap.ui.core.ValueState.None);
						oEvent.oSource.setPlaceholder("Estimate Date");
					}
				},
				//layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"}),
		});
		//oInputDate.setYyyymmdd("20100101");
		oDtPkrEstimateDtREEntryJ.setModel(oMdlDtPkrEstmtREEntryJ);
		oDtPkrEstimateDtREEntryJ.addStyleClass("FormInputStyle marginTop7");
		oDtPkrEstimateDtREEntryJ.setLocale("en-US");

		var olblLeaseAuthAmtREEntryJ = new sap.ui.commons.Label({text: "Lessee Authorised Amount:",
			//required: true,
			visible: false,
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
			wrapping: false}).addStyleClass("marginTop10");

		var oTFLeaseAuthAmtREEntryJ = new sap.ui.commons.TextField('idTFLeaseAuthAmtREEntryJ',{
			visible: false,
			placeholder: "Lessee Authorised Amount",
			layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"}),
		}).addStyleClass("FormInputStyle marginTop7");

		oTFLeaseAuthAmtREEntryJ.onfocusin =  function(e) {
			this.setValueState(sap.ui.core.ValueState.None);
			this.setPlaceholder("Lessee Authorised Amount");
		};
		oTFLeaseAuthAmtREEntryJ.onkeyup = function(evnt){
			addSeparator(document.getElementById(this.sId));
		};
		oTFLeaseAuthAmtREEntryJ.onkeydown = function(e){
			validateNumeric(event,true);
		};
		oTFLeaseAuthAmtREEntryJ.onpaste = function(e){
			e.preventDefault();
		};
		var olblCurrencyCodeREEntryJ = new sap.ui.commons.Label({text: "Currency Code:",
			//required: true,
			//layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
			wrapping: false}).addStyleClass("marginTop10");

		var oTFCurrencyCodeREEntryJ = new sap.ui.commons.TextField('idTFCurrnCodeREEntryJ',{
			placeholder: "Currency Code",
			change: upperOnChangeTF,
			//layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"}),
		}).addStyleClass("FormInputStyle marginTop7");

		oTFCurrencyCodeREEntryJ.onfocusin =  function(e) {
			this.setValueState(sap.ui.core.ValueState.None);
			this.setPlaceholder("Currency Code");
		  };

			// MACALPHA19032018_3+
	    /* Add Cargo Worthy $ and Notes fields */
	    var olblCWREEntryJ = new sap.ui.commons.Label({text: "Cargo Worthy:",
				required: true,
				//layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
				wrapping: false}).addStyleClass("marginTop10");

			var oTFCWREEntryJ = new sap.ui.commons.TextField('idTFCWREEntryJ',{
				placeholder: "Cargo Worthy",
				//layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"}),
			}).addStyleClass("FormInputStyle marginTop7");


			oTFCWREEntryJ.onfocusin =  function(e) {
				this.setValueState(sap.ui.core.ValueState.None);
				this.setPlaceholder("Cargo Worthy");
			};

			oTFCWREEntryJ.onfocusout =  function(e) {
				if(isNaN(e.target.value)){
					this.setValueState(sap.ui.core.ValueState.Error);
					this.setPlaceholder("Cargo Worthy");
					this.setValue("");
				}else{
					this.setValueState(sap.ui.core.ValueState.None);
					this.setPlaceholder("Cargo Worthy");
				}
			};

	    /* Add SCR Limit */
	    var olblNotes1REEntryJ = new sap.ui.commons.Label({text: "SCR Limit:",
	      //required: true,
	      width : "90px",
	      //layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
	      wrapping: false}).addStyleClass("marginTop10");

	    var oTFNotes1REEntryJ = new sap.ui.commons.TextField('idTFNotes1REEntryJ',{
	      placeholder: "SCR Limit",
	      width : "200px",
		  	editable : false,
	      //layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"}),
	    }).addStyleClass("FormInputStyle marginTop7");

			oTFNotes1REEntryJ.onfocusin =  function(e) {
				this.setValueState(sap.ui.core.ValueState.None);
				this.setPlaceholder("SCR Limit");
			};

	    /* Add Notes 2 */
	    var olblNotes2REEntryJ = new sap.ui.commons.Label({text: "Notes 2:",
	      required: false,
	      width : "90px",
	      //layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
	      wrapping: false}).addStyleClass("marginTop10");

	    var oTFNotes2REEntryJ = new sap.ui.commons.TextField('idTFNotes2REEntryJ',{
	      placeholder: "Notes 2",
	      				width : "400px"
	      //layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"}),
	    }).addStyleClass("FormInputStyle marginTop7 RepairNotes");

	    /* Add Notes 3 */
	    var olblNotes3REEntryJ = new sap.ui.commons.Label({text: "Notes 3:",
	      required: false,
	      width : "90px",
	      //layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
	      wrapping: false}).addStyleClass("marginTop10");

	    var oTFNotes3REEntryJ = new sap.ui.commons.TextField('idTFNotes3REEntryJ',{
	      placeholder: "Notes 3",
	      width : "400px"
	      //layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"}),
	    }).addStyleClass("FormInputStyle marginTop7 RepairNotes");

	    /* Add Notes 4 */
	    var olblNotes4REEntryJ = new sap.ui.commons.Label({text: "Notes 4:",
	      required: false,
	      width : "90px",
	      //layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
	      wrapping: false}).addStyleClass("marginTop10");

	    var oTFNotes4REEntryJ = new sap.ui.commons.TextField('idTFNotes4REEntryJ',{
	      placeholder: "Notes 4",
	      width : "400px"
	      //layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"}),
	    }).addStyleClass("FormInputStyle marginTop7 RepairNotes");

	    /* Add Notes 5 */
	    var olblNotes5REEntryJ = new sap.ui.commons.Label({text: "Notes 5:",
	      required: false,
	      width : "90px",
	      //layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
	      wrapping: false}).addStyleClass("marginTop10");

	    var oTFNotes5REEntryJ = new sap.ui.commons.TextField('idTFNotes5REEntryJ',{
	      placeholder: "Notes 5",
	      width : "400px"
	      //layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"}),
	    }).addStyleClass("FormInputStyle marginTop7 RepairNotes");

	    // MACALPHA19032018_3+

		var olblTopTextREEntryJ = new sap.ui.commons.Label("idlblEstmtHdrREEntryJ",{
					layoutData: new sap.ui.layout.GridData({span: "L12 M12 S12",linebreak: false, margin: true}),
					wrapping: true}).addStyleClass("fontTitle");
		olblTopTextREEntryJ.setText("Estimate For " + unitNo + " at " + DepoId);

		var olblRJS = new sap.ui.commons.Label({
					layoutData: new sap.ui.layout.GridData({span: "L12 M12 S12",linebreak: false, margin: true}),
					wrapping: true});
		olblRJS.setText("Estimate For Container 2");

		var oFlxRepHeader = new sap.m.FlexBox({
	  	      items: [/*olblUnitPCodeREEntryJIn,
	  	              new sap.ui.commons.Label( {text: " ",width : '8px'}),
	  	              oDdlUnitPCodeREEntryJIn,
	  	              new sap.ui.commons.Label( {text: " ",width : '8px'}),*/
										// MACALPHA19032018_2 - Added Job Type Dropdown
	  	              olblJobTypeREEntryJ,
	  	              new sap.ui.commons.Label( {text: " ",width : '8px'}),
	  	              oDdlJobTypeREEntryJ,
	  	              new sap.ui.commons.Label( {text: " ",width : '8px'}),
										// MACALPHA19032018_2 - Added Job Type Dropdown
										// MACALPHA19032018_3 - Removed Sale Grade information
	  	              /*olblSaleGradeREEntryJ,
	  	              new sap.ui.commons.Label( {text: " ",width : '18px'}),
	  	              oDdlSaleGradeREEntryJ,
	  	              new sap.ui.commons.Label( {text: " ",width : '18px'}),*/
	  	              olblEstimatDtREEntryJ,
	  	              new sap.ui.commons.Label( {text: " ",width : '8px'}),
	  	              oDtPkrEstimateDtREEntryJ,
	  	              new sap.ui.commons.Label( {text: " ",width : '8px'}),
	  	              olblCurrencyCodeREEntryJ,
	  	              new sap.ui.commons.Label( {text: " ",width : '8px'}),
	  	              oTFCurrencyCodeREEntryJ,
	  	              new sap.ui.commons.Label( {text: " ",width : '8px'})
	  	              ],
	  	              direction: "Row",
	  	              //layoutData: new sap.ui.layout.GridData({span: "L12 M12 S12",linebreak: false, margin: false}),
	  	    });

					var oFlxRepCWSCR = new sap.m.FlexBox({
				  	      items: [
												olblCWREEntryJ,
												new sap.ui.commons.Label( {text: " ",width : '8px'}),
												oTFCWREEntryJ,
												new sap.ui.commons.Label( {text: " ",width : '8px'}),
												olblNotes1REEntryJ,
											 new sap.ui.commons.Label( {text: " ",width : '8px'}),
											 oTFNotes1REEntryJ
			            ],
				  	      direction: "Row"
				  	    });



					var oFlxRepNotes = new sap.m.FlexBox({
				  	      items: [
										//new sap.ui.commons.Label( {text: " ",width : '8px'}),
			              new sap.m.FlexBox({items: [
																							 olblNotes2REEntryJ,
		 																					 new sap.ui.commons.Label( {text: " ",width : '8px'}),
		 																					 oTFNotes2REEntryJ,
																							 new sap.ui.commons.Label( {text: " ",width : '8px'}),
																							 olblNotes3REEntryJ,
		 																					 new sap.ui.commons.Label( {text: " ",width : '8px'}),
		 																					 oTFNotes3REEntryJ
																							],
																							 direction: "Row"}),
										//new sap.ui.commons.Label( {text: " ",width : '8px'}),
			              new sap.m.FlexBox({items: [olblNotes4REEntryJ,
																							new sap.ui.commons.Label( {text: " ",width : '8px'}),
																							oTFNotes4REEntryJ,
																							new sap.ui.commons.Label( {text: " ",width : '8px'}),
																							olblNotes5REEntryJ,
																							new sap.ui.commons.Label( {text: " ",width : '8px'}),
																							oTFNotes5REEntryJ

																							],direction: "Row"}),
									 new sap.ui.commons.Label( {text: " ",width : '8px'}),
			            ],
				  	      direction: "Column"
				  	    });

					var oFlxRepNotesHeader = new sap.m.FlexBox({
									items: [
										olblTopTextREEntryJ, new sap.ui.commons.Label({text: "Repair Header",
											layoutData: new sap.ui.layout.GridData({span: "L12 M12 S12"}),
											wrapping: true}).addStyleClass("marginTop7 fontTitle"),
											oFlxRepHeader, oFlxRepCWSCR, oFlxRepNotes,
											new sap.ui.commons.HorizontalDivider({width: "100%", type: "Area", height: "Medium"}).addStyleClass("marginTop7")
									],
									direction: "Column"
								});

		//Form
		 var oRepaiREEntryJForm = new sap.ui.layout.form.Form("idFrmREEntryJ", {
				 layout: oRepaiREEntryJLayout,
				 formContainers: [
						 new sap.ui.layout.form.FormContainer("idFrmCntnrREEntryJ",{
								//title: "Repair Estimate Entry",
							 formElements: [
												/*new sap.ui.layout.form.FormElement({
													fields: [olblTopTextREEntryJ]
												}),
												new sap.ui.layout.form.FormElement({
													fields: [new sap.ui.commons.Label({text: "Repair Header",
														layoutData: new sap.ui.layout.GridData({span: "L12 M12 S12"}),
														wrapping: true}).addStyleClass("marginTop7 fontTitle")]
												}),
												new sap.ui.layout.form.FormElement({
													fields: [oFlxRepHeader]
												}),
                        // MACALPHA19032018_3+
                        new sap.ui.layout.form.FormElement({
													fields: [oFlxRepNotes]
												}),
                        // MACALPHA19032018_3+
												new sap.ui.layout.form.FormElement({
													fields: [new sap.ui.commons.HorizontalDivider({width: "100%", type: "Area", height: "Medium"}).addStyleClass("marginTop7")]
												})*/
												new sap.ui.layout.form.FormElement({
													fields: [oFlxRepNotesHeader]
												})
										 ]
						 })
				 ]
		 });

		 objcurntREEntryJ.createEnterLineDataLay(oController);

		//REQUEST FOR SECTION
		 jsnReqQueueREOnline.resetfield();
//		 objREstimateOnlineJ.onlinefunSection();
//		 //REQUEST FOR DAMAGE CODE
//		 objREstimateOnlineJ.onlinefunDamageCodeNew();
//		 //REQUEST FOR RESPONSIBILITY
//		 objREstimateOnlineJ.onlinefunResponsibility();
//		 //REQUEST FOR MATERIAL CODE
//		 objREstimateOnlineJ.onlinefunMatrialCodeNew();
		 //REQUEST FOR SELECTED ESTIMATE HEADER
		 if(selEstmtId != ''){
			objREstimateOnlineJ.onlinefunEstimateHdr(unitNo, DepoId, DepoText);
			objREstimateOnlineJ.onlinefunEstmtLineItem();
		 }


		 var oBtnSubmitREEntryJ1 = new sap.m.Button("idBtnSubmitREEntryJ1",{
			  text : "Submit",
			  visible : true,
			  width:"80px",
			  styled:false,
			  //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: true}),
			  press:function(){
				sap.ui.getCore().byId("idlblSuccessMsgREEJ").setText("");
				sap.ui.getCore().byId("idlblSuccessMsgREEJ").setVisible(false);
				clickEvent = "submit";
				var valid = true;

				if(sap.ui.getCore().byId("idDtPkrEstimateDtREEntryJ").getValue() == ''){
					valid = false;
					sap.ui.getCore().byId("idDtPkrEstimateDtREEntryJ").setValueState(sap.ui.core.ValueState.Error);
					sap.ui.getCore().byId("idDtPkrEstimateDtREEntryJ").setPlaceholder("Estimate Date");
				}
				if(!valid){
					return;
				}

				if(sap.ui.getCore().byId("idFrmElmntErrREEntryJ") != undefined){
					sap.ui.getCore().byId("idFrmElmntErrREEntryJ").destroyFields();
					sap.ui.getCore().byId("idFrmElmntErrREEntryJ").destroy();
				}
				if(sap.ui.getCore().byId("idFrmElmntInfoLstREEntryJ") != undefined){
					sap.ui.getCore().byId("idFrmElmntInfoLstREEntryJ").destroyFields();
					sap.ui.getCore().byId("idFrmElmntInfoLstREEntryJ").destroy();
				}

				objcurntREEntryJ.saveRepairEstimateFromExcel("C");
				//objREstimateOnlineJ.onlinefunEstimateSubmit(selEstmtId);
		}}).addStyleClass("submitBtn");

		 var oBtnSubmitREEntryJ2 = new sap.m.Button("idBtnSubmitREEntryJ2",{
			  text : "Submit",
			  visible : true,
			  width:"80px",
			  styled:false,
			  //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: true}),
			  press:function(){
				sap.ui.getCore().byId("idlblSuccessMsgREEJ").setText("");
				sap.ui.getCore().byId("idlblSuccessMsgREEJ").setVisible(false);
				clickEvent = "submit";
				var valid = true;

				if(sap.ui.getCore().byId("idDtPkrEstimateDtREEntryJ").getValue() == ''){
					valid = false;
					sap.ui.getCore().byId("idDtPkrEstimateDtREEntryJ").setValueState(sap.ui.core.ValueState.Error);
					sap.ui.getCore().byId("idDtPkrEstimateDtREEntryJ").setPlaceholder("Estimate Date");
				}
				if(!valid){
					return;
				}

				if(sap.ui.getCore().byId("idFrmElmntErrREEntryJ") != undefined){
					sap.ui.getCore().byId("idFrmElmntErrREEntryJ").destroyFields();
					sap.ui.getCore().byId("idFrmElmntErrREEntryJ").destroy();
				}
				if(sap.ui.getCore().byId("idFrmElmntInfoLstREEntryJ") != undefined){
					sap.ui.getCore().byId("idFrmElmntInfoLstREEntryJ").destroyFields();
					sap.ui.getCore().byId("idFrmElmntInfoLstREEntryJ").destroy();
				}

				objcurntREEntryJ.saveRepairEstimateFromExcel("M");
				//objREstimateOnlineJ.onlinefunEstimateSubmit(selEstmtId);
		}}).addStyleClass("submitBtn");


			var oBtnInsertLineREEntryJ10 = new sap.m.Button("idBtnInsertLineREEntryJ10",{
				  text : "Insert 20 Lines",
				  //width:"100px",
				  styled:false,
				  //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: true}),
				  press:function(){
//					sap.ui.getCore().byId("idlblSuccessMsgREEJ").setText("");
//					sap.ui.getCore().byId("idlblSuccessMsgREEJ").setVisible(false);
//					objcurntREEntryJ.insertRowLineItem10();
					oExcelGridJ1.alter('insert_row', '', 20);
			}}).addStyleClass("submitBtn");

			var oBtnInsertLineREEntryJ102 = new sap.m.Button("idBtnInsertLineREEntryJ102",{
				  text : "Insert 20 Lines",
				  //width:"100px",
				  type:sap.m.ButtonType.Unstyled,
				  //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: true}),
				  press:function(){
//					sap.ui.getCore().byId("idlblSuccessMsgREEJ").setText("");
//					sap.ui.getCore().byId("idlblSuccessMsgREEJ").setVisible(false);
//					objcurntREEntryJ.insertRowLineItem10();
					  oExcelGridJ2.alter('insert_row', '', 20);
			}}).addStyleClass("submitBtn");

			var oCurrent = this;
	        var oBtnPrintREEntryJ = new sap.m.Button("idBtnPrintREEntryJ", {
	            text : "Print",
	            type:sap.m.ButtonType.Unstyled,
	            icon: sap.ui.core.IconPool.getIconURI("print"),
	            press:function(){
	            	var printExcelData = [];
	            	var currExcelData = oExcelGridJ1.getData();
	            	var currLength = currExcelData.length;
	    	 		for(var i =0; i < currLength; i++){
	    	 			loop1 : for(var j =0; j < 12; j++){
	    	 				if(currExcelData[i][j] != "" && currExcelData[i][j] != null){
	    	 					printExcelData.push({
	    	 						"Line": padZero(i+1,3) ,
	    	 						"Location" : (currExcelData[i][0] == null)? "" : currExcelData[i][0],
	    	 						"Component" : (currExcelData[i][1] == null)? "" : currExcelData[i][1],
	    	 						"Damage" : (currExcelData[i][2] == null)? "" : currExcelData[i][2],
	    	 						"Material" : (currExcelData[i][3] == null)? "" : currExcelData[i][3],
	    	 						"Repair" : (currExcelData[i][4] == null)? "" : currExcelData[i][4],
	    	 						"Rp. Length" : (currExcelData[i][5] == null)? "" : currExcelData[i][5],
	    	 						"Rp. Width" : (currExcelData[i][6] == null)? "" : currExcelData[i][6],
	    	 						"Qty" : (currExcelData[i][7] == null)? "" : currExcelData[i][7],
	    	 						"Lab.Hrs" : (currExcelData[i][8] == null)? "" : currExcelData[i][8],
	    	 						"Material Cost" : (currExcelData[i][9] == null)? "" : currExcelData[i][9],
	    	 						"Bulletin" : (currExcelData[i][10] == null)? "" : currExcelData[i][10],
	    	 						"Responsibility" : (currExcelData[i][10] == null)? "" : currExcelData[i][11],
	    	 					});
	    	 					break loop1;
	    	 				}
	    	 			}
	    	 		}

	                  var depotForPrint = sap.ui.getCore().byId("idComboDepotRESearchJ").getSelectedKey();
	                  var serialForPrint = sap.ui.getCore().byId("idSerailNoRESearchJ").getValue();
	                  var fullDepotForPrint = sap.ui.getCore().byId("idComboDepotRESearchJ").getValue();
	                  var unitParrtCodeForPrint = sap.ui.getCore().byId("idDdlUnitPCodeREEntryJ").getValue();
	                  var jobTypeForPrint = sap.ui.getCore().byId("idDdlJobTypeREEntryJ").getValue();
	                  var estimDateForPrint = sap.ui.getCore().byId("idDtPkrEstimateDtREEntryJ").getValue();
	                  var saleGradeForPrint = sap.ui.getCore().byId("idDdlSaleGradeREEntryJ").getValue();
	                  var currencyCodeForPrint = sap.ui.getCore().byId("idTFCurrnCodeREEntryJ").getValue();
	            	  var tab =  oCurrent.makeHTMLTableLA( depotForPrint,
	            			  						   serialForPrint,
	            			  						   fullDepotForPrint,
	            			  						   unitParrtCodeForPrint,
	            			  						   jobTypeForPrint,
	            			  						   estimDateForPrint,
	            			  						   saleGradeForPrint,
	            			  						   currencyCodeForPrint,
	            			  						   printExcelData,
	            			  						   "Repair Estimate Details",
	            			  						   "print",
	            			  						   "C");
		        	  var newWin = window.open();
		        	  newWin.document.write(tab);
		        	  newWin.print();
	            }
	         }).addStyleClass("submitBtn");

	        var oBtnPrintREEntryJ2 = new sap.m.Button("idBtnPrintREEntryJ2", {
	            text : "Print",
	            type:sap.m.ButtonType.Unstyled,
	            icon: sap.ui.core.IconPool.getIconURI("print"),
	            press:function(){
	            	var printExcelData = [];
	            	var currExcelData = oExcelGridJ2.getData();
	            	var currLength = currExcelData.length;
	    	 		for(var i =0; i < currLength; i++){
	    	 			loop1 : for(var j =0; j < 12; j++){
	    	 				if(currExcelData[i][j] != "" && currExcelData[i][j] != null){
	    	 					printExcelData.push({
	    	 						"Line": padZero(i+1,3) ,
	    	 						"Location" : (currExcelData[i][0] == null)? "" : currExcelData[i][0],
	    	 						"Component" : (currExcelData[i][1] == null)? "" : currExcelData[i][1],
	    	 						"Damage" : (currExcelData[i][2] == null)? "" : currExcelData[i][2],
	    	 						"Material" : (currExcelData[i][3] == null)? "" : currExcelData[i][3],
	    	 						"Repair" : (currExcelData[i][4] == null)? "" : currExcelData[i][4],
	    	 						"Rp. Length" : (currExcelData[i][5] == null)? "" : currExcelData[i][5],
	    	 						"Rp. Width" : (currExcelData[i][6] == null)? "" : currExcelData[i][6],
	    	 						"Qty" : (currExcelData[i][7] == null)? "" : currExcelData[i][7],
	    	 						"Lab.Hrs" : (currExcelData[i][8] == null)? "" : currExcelData[i][8],
	    	 						"Material Cost" : (currExcelData[i][9] == null)? "" : currExcelData[i][9],
	    	 						"Bulletin" : (currExcelData[i][10] == null)? "" : currExcelData[i][10],
	    	 						"Responsibility" : (currExcelData[i][10] == null)? "" : currExcelData[i][11],
	    	 					});
	    	 					break loop1;
	    	 				}
	    	 			}
	    	 		}

	                  var depotForPrint = sap.ui.getCore().byId("idComboDepotRESearchJ").getSelectedKey();
	                  var serialForPrint = sap.ui.getCore().byId("idSerailNoRESearchJ").getValue();
	                  var fullDepotForPrint = sap.ui.getCore().byId("idComboDepotRESearchJ").getValue();
	                  var unitParrtCodeForPrint = sap.ui.getCore().byId("idDdlUnitPCodeREEntryJ").getValue();
	                  var jobTypeForPrint = sap.ui.getCore().byId("idDdlJobTypeREEntryJ").getValue();
	                  var estimDateForPrint = sap.ui.getCore().byId("idDtPkrEstimateDtREEntryJ").getValue();
	                  var saleGradeForPrint = sap.ui.getCore().byId("idDdlSaleGradeREEntryJ").getValue();
	                  var currencyCodeForPrint = sap.ui.getCore().byId("idTFCurrnCodeREEntryJ").getValue();
	            	  var tab =  oCurrent.makeHTMLTableLA( depotForPrint,
	            			  						   serialForPrint,
	            			  						   fullDepotForPrint,
	            			  						   unitParrtCodeForPrint,
	            			  						   jobTypeForPrint,
	            			  						   estimDateForPrint,
	            			  						   saleGradeForPrint,
	            			  						   currencyCodeForPrint,
	            			  						   printExcelData,
	            			  						   "Repair Estimate Details",
	            			  						   "print",
	            			  						   "M");
		        	  var newWin = window.open();
		        	  newWin.document.write(tab);
		        	  newWin.print();
	            }
	         }).addStyleClass("submitBtn");

	         var oBtnExcelREEntryJ = new sap.m.Button("idBtnExcelREEntryJ",{
	             text : "Export To Excel",
	             type:sap.m.ButtonType.Unstyled,
	             icon: sap.ui.core.IconPool.getIconURI("excel-attachment"),
	             press:function(){
	            	 var printExcelData = [];
		            	var currExcelData = oExcelGridJ1.getData();
		            	var currLength = currExcelData.length;
		    	 		for(var i =0; i < currLength; i++){
		    	 			loop1 : for(var j =0; j < 12; j++){
		    	 				if(currExcelData[i][j] != "" && currExcelData[i][j] != null){
		    	 					printExcelData.push({
		    	 						"Line": padZero(i+1,3) ,
		    	 						"Location" : (currExcelData[i][0] == null)? "" : currExcelData[i][0],
		    	 						"Component" : (currExcelData[i][1] == null)? "" : currExcelData[i][1],
		    	 						"Damage" : (currExcelData[i][2] == null)? "" : currExcelData[i][2],
		    	 						"Material" : (currExcelData[i][3] == null)? "" : currExcelData[i][3],
		    	 						"Repair" : (currExcelData[i][4] == null)? "" : currExcelData[i][4],
		    	 						"Rp. Length" : (currExcelData[i][5] == null)? "" : currExcelData[i][5],
		    	 						"Rp. Width" : (currExcelData[i][6] == null)? "" : currExcelData[i][6],
		    	 						"Qty" : (currExcelData[i][7] == null)? "" : currExcelData[i][7],
		    	 						"Lab.Hrs" : (currExcelData[i][8] == null)? "" : currExcelData[i][8],
		    	 						"Material Cost" : (currExcelData[i][9] == null)? "" : currExcelData[i][9],
		    	 						"Bulletin" : (currExcelData[i][10] == null)? "" : currExcelData[i][10],
		    	 						"Responsibility" : (currExcelData[i][10] == null)? "" : currExcelData[i][11],
		    	 					});
		    	 					break loop1;
		    	 				}
		    	 			}
		    	 		}

		                  var depotForPrint = sap.ui.getCore().byId("idComboDepotRESearchJ").getSelectedKey();
		                  var serialForPrint = sap.ui.getCore().byId("idSerailNoRESearchJ").getValue();
		                  var fullDepotForPrint = sap.ui.getCore().byId("idComboDepotRESearchJ").getValue();
		                  var unitParrtCodeForPrint = sap.ui.getCore().byId("idDdlUnitPCodeREEntryJ").getValue();
		                  var jobTypeForPrint = sap.ui.getCore().byId("idDdlJobTypeREEntryJ").getValue();
		                  var estimDateForPrint = sap.ui.getCore().byId("idDtPkrEstimateDtREEntryJ").getValue();
		                  var saleGradeForPrint = sap.ui.getCore().byId("idDdlSaleGradeREEntryJ").getValue();
		                  var currencyCodeForPrint = sap.ui.getCore().byId("idTFCurrnCodeREEntryJ").getValue();
		            	  var tab =  oCurrent.makeHTMLTableLA( depotForPrint,
		            			  						   serialForPrint,
		            			  						   fullDepotForPrint,
		            			  						   unitParrtCodeForPrint,
		            			  						   jobTypeForPrint,
		            			  						   estimDateForPrint,
		            			  						   saleGradeForPrint,
		            			  						   currencyCodeForPrint,
		            			  						   printExcelData,
		            			  						   "Repair Estimate Details",
		            			  						   "excel",
		            			  						   "C");
//			        	  var newWin = window.open('', '', "height=500,width=1000");
//			        	  newWin.document.write(tab);
//			        	  newWin.print();
	             }
	          }).addStyleClass("submitBtn");


	         var oBtnExcelREEntryJ2 = new sap.m.Button("idBtnExcelREEntryJ2",{
	             text : "Export To Excel",
	             type:sap.m.ButtonType.Unstyled,
	             icon: sap.ui.core.IconPool.getIconURI("excel-attachment"),
	             press:function(){
	            	 var printExcelData = [];
		            	var currExcelData = oExcelGridJ2.getData();
		            	var currLength = currExcelData.length;
		    	 		for(var i =0; i < currLength; i++){
		    	 			loop1 : for(var j =0; j < 12; j++){
		    	 				if(currExcelData[i][j] != "" && currExcelData[i][j] != null){
		    	 					printExcelData.push({
		    	 						"Line": padZero(i+1,3) ,
		    	 						"Location" : (currExcelData[i][0] == null)? "" : currExcelData[i][0],
		    	 						"Component" : (currExcelData[i][1] == null)? "" : currExcelData[i][1],
		    	 						"Damage" : (currExcelData[i][2] == null)? "" : currExcelData[i][2],
		    	 						"Material" : (currExcelData[i][3] == null)? "" : currExcelData[i][3],
		    	 						"Repair" : (currExcelData[i][4] == null)? "" : currExcelData[i][4],
		    	 						"Rp. Length" : (currExcelData[i][5] == null)? "" : currExcelData[i][5],
		    	 						"Rp. Width" : (currExcelData[i][6] == null)? "" : currExcelData[i][6],
		    	 						"Qty" : (currExcelData[i][7] == null)? "" : currExcelData[i][7],
		    	 						"Lab.Hrs" : (currExcelData[i][8] == null)? "" : currExcelData[i][8],
		    	 						"Material Cost" : (currExcelData[i][9] == null)? "" : currExcelData[i][9],
		    	 						"Bulletin" : (currExcelData[i][10] == null)? "" : currExcelData[i][10],
		    	 						"Responsibility" : (currExcelData[i][10] == null)? "" : currExcelData[i][11],
		    	 					});
		    	 					break loop1;
		    	 				}
		    	 			}
		    	 		}

		                  var depotForPrint = sap.ui.getCore().byId("idComboDepotRESearchJ").getSelectedKey();
		                  var serialForPrint = sap.ui.getCore().byId("idSerailNoRESearchJ").getValue();
		                  var fullDepotForPrint = sap.ui.getCore().byId("idComboDepotRESearchJ").getValue();
		                  var unitParrtCodeForPrint = sap.ui.getCore().byId("idDdlUnitPCodeREEntryJ").getValue();
		                  var jobTypeForPrint = sap.ui.getCore().byId("idDdlJobTypeREEntryJ").getValue();
		                  var estimDateForPrint = sap.ui.getCore().byId("idDtPkrEstimateDtREEntryJ").getValue();
		                  var saleGradeForPrint = sap.ui.getCore().byId("idDdlSaleGradeREEntryJ").getValue();
		                  var currencyCodeForPrint = sap.ui.getCore().byId("idTFCurrnCodeREEntryJ").getValue();
		            	  var tab =  oCurrent.makeHTMLTableLA( depotForPrint,
		            			  						   serialForPrint,
		            			  						   fullDepotForPrint,
		            			  						   unitParrtCodeForPrint,
		            			  						   jobTypeForPrint,
		            			  						   estimDateForPrint,
		            			  						   saleGradeForPrint,
		            			  						   currencyCodeForPrint,
		            			  						   printExcelData,
		            			  						   "Repair Estimate Details",
		            			  						   "excel",
		            			  						   "M");
//			        	  var newWin = window.open('', '', "height=500,width=1000");
//			        	  newWin.document.write(tab);
//			        	  newWin.print();
	             }
	          }).addStyleClass("submitBtn");

		// MACALPHA19032018_8+
		var oCheckBoxZeroCostJ1 = new sap.ui.commons.CheckBox("idCheckBoxZeroCostJ1",{
						    // bind checked property against enabled property in the model
						    // checked: "{/enabled}",
								text : "Zero Cost",
						    change: function(evnt){
									excelDataJ1 = [
																["","","","","","","","","","","","",""],
																["","","","","","","","","","","","",""],
																["","","","","","","","","","","","",""],
																["","","","","","","","","","","","",""],
																["","","","","","","","","","","","",""],
																["","","","","","","","","","","","",""],
																["","","","","","","","","","","","",""],
																["","","","","","","","","","","","",""],
																["","","","","","","","","","","","",""],
																["","","","","","","","","","","","",""],
																["","","","","","","","","","","","",""],
																["","","","","","","","","","","","",""],
																["","","","","","","","","","","","",""],
																["","","","","","","","","","","","",""],
																["","","","","","","","","","","","",""],
																["","","","","","","","","","","","",""],
																["","","","","","","","","","","","",""],
																["","","","","","","","","","","","",""],
																["","","","","","","","","","","","",""],
																["","","","","","","","","","","","",""],
																];

											oExcelGridJ1.loadData(excelDataJ1);
						    }
						}).addStyleClass("zercostcheckbox marginLeft20");

		var oCheckBoxZeroCostJ2 = new sap.ui.commons.CheckBox("idCheckBoxZeroCostJ2",{
						    // bind checked property against enabled property in the model
						    // checked: "{/enabled}",
								text : "Zero Cost",
						    change: function(evnt){
									excelDataJ2 = [
																["","","","","","","","","","","","",""],
																["","","","","","","","","","","","",""],
																["","","","","","","","","","","","",""],
																["","","","","","","","","","","","",""],
																["","","","","","","","","","","","",""],
																["","","","","","","","","","","","",""],
																["","","","","","","","","","","","",""],
																["","","","","","","","","","","","",""],
																["","","","","","","","","","","","",""],
																["","","","","","","","","","","","",""],
																["","","","","","","","","","","","",""],
																["","","","","","","","","","","","",""],
																["","","","","","","","","","","","",""],
																["","","","","","","","","","","","",""],
																["","","","","","","","","","","","",""],
																["","","","","","","","","","","","",""],
																["","","","","","","","","","","","",""],
																["","","","","","","","","","","","",""],
																["","","","","","","","","","","","",""],
																["","","","","","","","","","","","",""],
																];

											oExcelGridJ2.loadData(excelDataJ2);
						    }
						}).addStyleClass("zercostcheckbox marginLeft20");
		// MACALPHA19032018_8+

			var oFlxPrintButton = new sap.m.FlexBox({
		  	      items: [

											/*new sap.ui.commons.Label( {text: " ",width : '8px'}),	// MACALPHA19032018_8-
											oBtnSubmitREEntryJ1,*/
		  	              //new sap.ui.commons.Label( {text: " ",width : '8px'}),
											oCheckBoxZeroCostJ1,	// MACALPHA19032018_8+
											new sap.ui.commons.Label( {text: " ",width : '8px'}),
		  	              oBtnInsertLineREEntryJ10,
		  	              //new sap.ui.commons.Label( {text: " ",width : '8px'}),
		  	              //oBtnPrintREEntryJ, // MACALPHA19032018_9-
		  	              //new sap.ui.commons.Label( {text: " ",width : '8px'}),
		  	              //oBtnExcelREEntryJ	// MACALPHA19032018_9-
											],
		  	              direction: "Row",
		  	              //layoutData: new sap.ui.layout.GridData({span: "L12 M12 S12",linebreak: false, margin: false}),
		  	    });

			var oFlxPrintButton2 = new sap.m.FlexBox({
		  	      items: [/*new sap.ui.commons.Label( {text: " ",width : '8px'}),	// MACALPHA19032018_8-
											oBtnSubmitREEntryJ2,*/
		  	              //new sap.ui.commons.Label( {text: " ",width : '8px'}),
											oCheckBoxZeroCostJ2,	// MACALPHA19032018_8+
											new sap.ui.commons.Label( {text: " ",width : '8px'}),
		  	              oBtnInsertLineREEntryJ102,
		  	              //new sap.ui.commons.Label( {text: " ",width : '8px'}),
		  	              //oBtnPrintREEntryJ2,	// MACALPHA19032018_9-
		  	              //new sap.ui.commons.Label( {text: " ",width : '8px'}),
		  	              //oBtnExcelREEntryJ2	// MACALPHA19032018_9-
											],
		  	              direction: "Row",
		  	              //layoutData: new sap.ui.layout.GridData({span: "L12 M12 S12",linebreak: false, margin: false}),
		  	    });

		 var oRepairLinesJ1 = new sap.ui.core.HTML("idRepairLinesJ1").addStyleClass("marginLeft20 marginBottom50");
         var oRepairLinesJH1 = '<div id="idRepairLinesJH1" style="width:100%" class="marginBottom50">';
         oRepairLinesJ1.setContent(oRepairLinesJH1);

         var oRepairLinesJ2 = new sap.ui.core.HTML("idRepairLinesJ2").addStyleClass("marginLeft20 marginBottom50");
         var oRepairLinesJH2 = '<div id="idRepairLinesJH2" style="width:100%" class="marginBottom50">';
         oRepairLinesJ2.setContent(oRepairLinesJH2);


//	        if(repEntered == true){
//				var data = [
//				["","","","","","","","","","","","",""],
//				["","","","","","","","","","","","",""],
//				["","","","","","","","","","","","",""],
//				["","","","","","","","","","","","",""],
//				["","","","","","","","","","","","",""],
//				["","","","","","","","","","","","",""],
//				["","","","","","","","","","","","",""],
//				["","","","","","","","","","","","",""],
//				["","","","","","","","","","","","",""],
//				["","","","","","","","","","","","",""],
//				["","","","","","","","","","","","",""],
//				["","","","","","","","","","","","",""],
//				["","","","","","","","","","","","",""],
//				["","","","","","","","","","","","",""],
//				["","","","","","","","","","","","",""],
//				["","","","","","","","","","","","",""],
//				["","","","","","","","","","","","",""],
//				["","","","","","","","","","","","",""],
//				["","","","","","","","","","","","",""],
//				["","","","","","","","","","","","",""],
//				];
//
//				//var data = function () {
//				//return Handsontable.helper.createSpreadsheetData(100, 12);
//				//};
//				var container = document.getElementById('idRepairLines2');
//				oExcelGrid = new Handsontable(container, {
//							data : data,  //binding the model
//							//minSpareRows: 1,
//							//height: 150,
//							//minRows: 5,
//							rowHeaders: true,
//							colHeaders: true,
//							colHeaders: ["Loc. Code", "Comp. Code","Damg Code", "Matrl Code", "Rep. Code",
//							     "Rep. Leng", "Rep. Width", "Qty", "Man Hours", "Matrl Cost", "Labour Rate", "Tech Bulltn", "Responsibility Code"],
//							contextMenu: true,
//							columns: [
//							  {
//							  },
//							  {
//
//							  },
//							  {
//
//							  },
//							  {
//
//							  },
//							  {
//
//							  },
//							  {
//
//							  },
//							  {
//
//							  },
//							  {type: 'numeric'},
//							  {
//
//							  },
//							  {
//
//							  },
//							  {
//
//							  },
//							  {
//								  type: 'dropdown',
//								  source: ["J � JS Allocation", "R � Lessee Refused", "O � Owner / Lessor", "U � User / Lessee", "H � Manufacturing Defect"]
//							  },
//							  ],
//							//rowHeaders: true,
//							manualColumnResize:false,
//				});
//	        }

			var olblhdrTblREEntryJ1 =  new sap.ui.commons.Label("idlblhdrTblREEntryJ1",{text: "Repair Lines for Carcass - Labour Rate : " + globalLabCostC + " " + globalLabCostCurrency,	// MACALPHA19032018_5 +
				layoutData: new sap.ui.layout.GridData({span: "L12 M12 S12"}),
	            wrapping: true}).addStyleClass("marginLeft20 marginTop7 fontTitle");

			var olblhdrTblREEntryJ2 =  new sap.ui.commons.Label("idlblhdrTblREEntryJ2",{text: "Repair Lines for Machinery - Labour Rate : " + globalLabCostM + " " + globalLabCostCurrency,	// MACALPHA19032018_5 +
				layoutData: new sap.ui.layout.GridData({span: "L12 M12 S12"}),
	            wrapping: true}).addStyleClass("marginLeft20 marginTop7 fontTitle");

			var oFlxTblREEntryJLines1 = new sap.m.FlexBox("idFlxTblREEntryJLines1",{
		  	      items: [
		  	              olblhdrTblREEntryJ1,
		  	              new sap.ui.commons.Label( {text: " ",width : '8px'}),
		  	              oFlxPrintButton,
		  	              new sap.ui.commons.Label( {text: " ",width : '8px'}),
		  	              oRepairLinesJ1,
		  	              new sap.ui.commons.Label( {text: " ",width : '8px'})
		  	              ],
		  	              direction: "Column",
		  	              //layoutData: new sap.ui.layout.GridData({span: "L12 M12 S12",linebreak: false, margin: false}),
		  	    });

			var oFlxTblREEntryJLines2 = new sap.m.FlexBox("idFlxTblREEntryJLines2",{
		  	      items: [
		  	              olblhdrTblREEntryJ2,
		  	              new sap.ui.commons.Label( {text: " ",width : '8px'}),
		  	              oFlxPrintButton2,
		  	              new sap.ui.commons.Label( {text: " ",width : '8px'}),
		  	              oRepairLinesJ2,
		  	              new sap.ui.commons.Label( {text: " ",width : '8px'}),
		  	              ],
		  	              direction: "Column",
		  	              //layoutData: new sap.ui.layout.GridData({span: "L12 M12 S12",linebreak: false, margin: false}),
		  	    });


			var oFlxTblREEntryJLines = new sap.m.FlexBox("idFlxTblREEntryJLines",{
		  	      items: [oRepaiREEntryJForm,
		  	              new sap.ui.commons.Label( {text: " ",width : '8px'}),
		  	              oFlxTblREEntryJLines1,
		  	              oFlxTblREEntryJLines2
		  	              ],
		  	              direction: "Column",
		  	              //layoutData: new sap.ui.layout.GridData({span: "L12 M12 S12",linebreak: false, margin: false}),
		  	    });


			 return oFlxTblREEntryJLines;

	},

	// MACALPHA19032018_7 Added this new function to clear JS data

	clearJSData : function(){

			// Clear Labour Rates

			/*globalLabCostC = 0;
			globalLabCostM = 0;*/

			// Clear Zero Cost Estimate CheckBoxes

			sap.ui.getCore().byId("idCheckBoxZeroCostJ1").setChecked(false);
			sap.ui.getCore().byId("idCheckBoxZeroCostJ2").setChecked(false);

			// Clear Excel Grid Data...

			excelDataJ1 = [
						["","","","","","","","","","","","",""],
						["","","","","","","","","","","","",""],
						["","","","","","","","","","","","",""],
						["","","","","","","","","","","","",""],
						["","","","","","","","","","","","",""],
						["","","","","","","","","","","","",""],
						["","","","","","","","","","","","",""],
						["","","","","","","","","","","","",""],
						["","","","","","","","","","","","",""],
						["","","","","","","","","","","","",""],
						["","","","","","","","","","","","",""],
						["","","","","","","","","","","","",""],
						["","","","","","","","","","","","",""],
						["","","","","","","","","","","","",""],
						["","","","","","","","","","","","",""],
						["","","","","","","","","","","","",""],
						["","","","","","","","","","","","",""],
						["","","","","","","","","","","","",""],
						["","","","","","","","","","","","",""],
						["","","","","","","","","","","","",""],
						];

					oExcelGridJ1.loadData(excelDataJ1);

				excelDataJ2 = [
							["","","","","","","","","","","","",""],
							["","","","","","","","","","","","",""],
							["","","","","","","","","","","","",""],
							["","","","","","","","","","","","",""],
							["","","","","","","","","","","","",""],
							["","","","","","","","","","","","",""],
							["","","","","","","","","","","","",""],
							["","","","","","","","","","","","",""],
							["","","","","","","","","","","","",""],
							["","","","","","","","","","","","",""],
							["","","","","","","","","","","","",""],
							["","","","","","","","","","","","",""],
							["","","","","","","","","","","","",""],
							["","","","","","","","","","","","",""],
							["","","","","","","","","","","","",""],
							["","","","","","","","","","","","",""],
							["","","","","","","","","","","","",""],
							["","","","","","","","","","","","",""],
							["","","","","","","","","","","","",""],
							["","","","","","","","","","","","",""],
							];

					oExcelGridJ2.loadData(excelDataJ2);

	},

	createLineItemTable: function(){

		/*var olblhdrTblREEntryJ =  new sap.ui.commons.Label({text: "Repair Lines",
			layoutData: new sap.ui.layout.GridData({span: "L12 M12 S12"}),
            wrapping: true}).addStyleClass("marginTop7 fontTitle");

		var oTblLineItemREEntryJ = new sap.ui.table.Table(
				'idTblLineItemREEntryJ',
				{
					visibleRowCount: 10,
					columnHeaderHeight : 50,
					enableColumnReordering: false,
					selectionMode : sap.ui.table.SelectionMode.None,
					navigationMode : sap.ui.table.NavigationMode.None,
					//layoutData: new sap.ui.layout.GridData({span: "L12 M12 S12",linebreak: false, margin: false}),
				}).addStyleClass('tblBorder marginTop7');

		var oChkBxSelectREEntryJ = new sap.ui.commons.CheckBox({
		    // bind checked property against enabled property in the model
		   // checked: "{/enabled}",
		    change: function(evnt){
		    	var abc =123;
		    }
		}).bindProperty("checked", "checked");

		var oChkBxSelectAllREEntryJ = new sap.ui.commons.CheckBox({
		    // bind checked property against enabled property in the model
		   // checked: "{/enabled}",
		    change: function(evnt){
		    	for(var i =0; i < jsnLineItemREEntryJ.length; i++){
					jsnLineItemREEntryJ[i].checked = this.getChecked();
				}
				oMdlLineItemREEntryJ.updateBindings();
		    }
		}).bindProperty("checked", "checked");

		oTblLineItemREEntryJ.addColumn(new sap.ui.table.Column({
			//label : oChkBxSelectAllREEntryJ,
			template : oChkBxSelectREEntryJ,
			resizable:false,
			width : "30px"
		}));

		oTblLineItemREEntryJ.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Line Item",
			}),
			template : new sap.ui.commons.TextView()
					.bindProperty("text", "LineItem"),
			resizable:false,
			width : "60px"
		}));

		oTblLineItemREEntryJ.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Location Code",
			}),
			template : new sap.ui.commons.TextField("idLc",
					{change: upperOnChangeTF})
					.bindProperty("value", "LocationKey").addStyleClass("borderStyle"),
			resizable:false,
			width : "90px"
		}));

		oTblLineItemREEntryJ.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Component Code",
			}),
			template : new sap.ui.commons.TextField("idCc",
					{change: upperOnChangeTF,maxLength:3})
					.bindProperty("value", "ComponentKey").addStyleClass("borderStyle"),
			resizable:false,
			width : "110px"
		}));

		oTblLineItemREEntryJ.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Damage Code",
			}),
			template : new sap.ui.commons.TextField("idDc",{change: upperOnChangeTF})
					.bindProperty("value", "DamageKey").addStyleClass("borderStyle"),
			resizable:false,
			width : "90px"
		}));

		oTblLineItemREEntryJ.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Material Code",
			}),
			template : new sap.ui.commons.TextField("idMk",{change: upperOnChangeTF})
					.bindProperty("value", "MaterialKey").addStyleClass("borderStyle"),
			resizable:false,
			width : "90px"
		}));

		oTblLineItemREEntryJ.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Repair Code",
			}),
			template : new sap.ui.commons.TextField("idRc",{change: upperOnChangeTF})
					.bindProperty("value", "RepairKey").addStyleClass("borderStyle"),
			resizable:false,
			width : "90px"
		}));

		oTblLineItemREEntryJ.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Repair Length"
			}),
			template : new sap.ui.commons.TextField("idRl",{change: upperOnChangeTF})
					.bindProperty("value", "RepairLength").addStyleClass("borderStyle"),
			resizable:false,
			width : "90px"
		}));

		oTblLineItemREEntryJ.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Repair Width"
			}),
			template : new sap.ui.commons.TextField("idRw",{change: upperOnChangeTF})
					.bindProperty("value", "RepairWidth").addStyleClass("borderStyle"),
			resizable:false,
			width : "90px"
		}));

		oTblLineItemREEntryJ.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Quantity"
			}),
			template : new sap.ui.commons.TextField("idQu", {change: upperOnChangeTF})
					.bindProperty("value", "Quantity").addStyleClass("borderStyle"),
			resizable:false,
			width : "90px"
		}));

		oTblLineItemREEntryJ.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Man Hours"
			}),
			template : new sap.ui.commons.TextField("idMh",{change: upperOnChangeTF})
					.bindProperty("value", "ManHours").addStyleClass("borderStyle"),
			resizable:false,
			width : "90px"
		}));

		oTblLineItemREEntryJ.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Material Cost"
			}),
			template : new sap.ui.commons.TextField("idMc",{change: upperOnChangeTF})
					.bindProperty("value", "MaterialCost").addStyleClass("borderStyle"),
			resizable:false,
			width : "90px"
		}));

		oTblLineItemREEntryJ.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Labour Rate"
			}),
			template : new sap.ui.commons.TextField("idLr",{change: upperOnChangeTF})
					.bindProperty("value", "LabourRate").addStyleClass("borderStyle"),
			resizable:false,
			width : "90px"
		}));

		oTblLineItemREEntryJ.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Bullet In Number",
			}),
			template : new sap.ui.commons.TextField("idTb",{change: upperOnChangeTF})
					.bindProperty("value", "TechBulletin").addStyleClass("borderStyle"),
			resizable:false,
			width : "90px"
		}));

		var oDdlTblResponsibilityREEntryJ = new sap.ui.commons.DropdownBox({
			  layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"}),
			  width:"100%",
	          displaySecondaryValues:false,
			  placeholder: "Select Responsibility",
		}).addStyleClass("borderStyle");
	    //oDdlTblResponsibilityREEntryJ.setModel(oMdlGlblDDLREEntryJ);
		oDdlTblResponsibilityREEntryJ.bindAggregation("items", "responsibility", oItmTmpltGlblDDLREEntryJ);
		oDdlTblResponsibilityREEntryJ.bindProperty("selectedKey", "ResponsibilityKey");
		//oDdlTblResponsibilityREEntryJ.insertItem(new sap.ui.core.ListItem({text:"",key:""}),0);

		oTblLineItemREEntryJ.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Responsibility",
			}),
			template : oDdlTblResponsibilityREEntryJ, //new sap.ui.commons.TextField().bindProperty("value", "ResponsibilityKey").addStyleClass("borderStyle"),
			resizable:false,
			width : "160px"
		}));

		//oMdlLineItemREEntryJ.setData({modelData : jsnData});
		//oTblLineItemREEntryJ.setVisibleRowCount(jsnData.length);
		oMdlLineItemREEntryJ.setData({modelData : jsnLineItemREEntryJ});
		oTblLineItemREEntryJ.setModel(oMdlLineItemREEntryJ);
		oTblLineItemREEntryJ.bindRows("/modelData");




		var data = {"data":
			[
		                	["1", "","","","","","","","","","","",""],
		                	["2", "","","","","","","","","","","",""],
		                	["3", "","","","","","","","","","","",""],
		                	["4", "","","","","","","","","","","",""],
		                	["5", "","","","","","","","","","","",""],
		    ]};

		  var oExcelGrid = new ExcelGrid("grid", {
	            data : "{/data}",  //binding the model
	            options: {
	            	//minSpareRows: 1,
	            	//height: 150,
	            	minRows: 5,
	            	colHeaders: true,
	            	colHeaders: ["No.", "Loc. Code", "Comp. Code","Damage Code", "Matrl Code", "Repair Code",
	            	             "Rep. Length", "Rep. Width", "Qty", "Man Hours", "Matrl Cost", "Labour Rate", "Resp"],
	            	contextMenu: true,
	            	columns: [
	            	          {
	            	            editor: false
	            	          },
	            	          {

		            	      },
	            	          {

		            	      },
	            	          {

		            	      },
	            	          {

		            	      },
	            	          {

		            	      },
	            	          {

		            	      },
	            	          {

		            	      },
	            	          {

		            	      },
	            	          {

		            	      },
	            	          {

		            	      },
	            	          {

		            	      },
	            	          {

		            	      },
	            	          ],
	            	//rowHeaders: true,
	            	manualColumnResize:false
	            	}
	        });

		  var oModel123 = new sap.ui.model.json.JSONModel();
	      oModel123.setData(data);
	      oExcelGrid.setModel(oModel123);


		//CREATE LINE ITEM BUTTONS
		var oLinesButton = new sap.m.Button("idLinesButton",{
			  text : "Enter Line Items",
			  width:"100px",
			  styled:false,
			  //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: true}),
			  press:function(){
					var bus = sap.ui.getCore().getEventBus();
					bus.publish("nav", "to", {
							id : "RepairEstimateEntryLines"
					});
					$('#idHdrContnt').html('Repair Estimate - Enter Line Items'); //CHANGE HEADER CONTENT
		}}).addStyleClass("submitBtn");










		var oFlxTblREEntryJ = new sap.m.FlexBox({
	  	      items: [olblhdrTblREEntryJ, oLinesButton],
	  	      direction: "Column",
				  //layoutData: new sap.ui.layout.GridData({span: "L12 M12 S12",linebreak: false, margin: false}),
	  	    });

		return oFlxTblREEntryJ;*/
	},






	insertRowLineItem10: function(){
		var oTblLineItemREEntryJ = sap.ui.getCore().byId("idTblLineItemREEntryJ");
		/*var oidDdlSectionREEntryJ = sap.ui.getCore().byId("idDdlSectionREEntryJ");
		var oidDdlLocationREEntryJ = sap.ui.getCore().byId("idDdlLocationREEntryJ");
		var oidDdlComponentREEntryJ = sap.ui.getCore().byId("idDdlComponentREEntryJ");
		var oidDdlDamageREEntryJ = sap.ui.getCore().byId("idDdlDamageREEntryJ");
		var oidDdlRepairREEntryJ = sap.ui.getCore().byId("idDdlRepairREEntryJ");
		var oidDdlMaterialCodeREEntryJ = sap.ui.getCore().byId("idDdlMaterialCodeREEntryJ");
		var oidTFMaterialCostREEntryJ = sap.ui.getCore().byId("idTFMaterialCostREEntryJ");
		var oidTFManHoursREEntryJ = sap.ui.getCore().byId("idTFManHoursREEntryJ");
		var oidTFRepairLengthREEntryJ = sap.ui.getCore().byId("idTFRepairLengthREEntryJ");
		var oidTFRepairWidthREEntryJ = sap.ui.getCore().byId("idTFRepairWidthREEntryJ");
		var oidTFQuantityREEntryJ = sap.ui.getCore().byId("idTFQuantityREEntryJ");
		var oidDdlResponsibilityREEntryJ = sap.ui.getCore().byId("idDdlResponsibilityREEntryJ");
		var oidTFLabourRateREEntryJ = sap.ui.getCore().byId("idTFLabourRateREEntryJ");
		var oidTFTechBulletinREEntryJ = sap.ui.getCore().byId("idTFTechBulletinREEntryJ");
		var dataupdate = false;*/

		for(var i =0; i < 10;i++)
		{
			oNewEntry ={};
			oNewEntry.checked=false;
			oNewEntry.LineItem="";
			oNewEntry.sectionKey = "";
			oNewEntry.sectionText = "";
			oNewEntry.LocationKey = "";
			oNewEntry.LocationText = "";
			oNewEntry.ComponentKey= "";
			oNewEntry.ComponentText= "";
			oNewEntry.DamageKey= "";
			oNewEntry.DamageText= "";
			oNewEntry.RepairKey= "";
			oNewEntry.RepairText= "";
			oNewEntry.MaterialKey= "";
			oNewEntry.MaterialText= "";
			oNewEntry.MaterialCost= "";
			oNewEntry.ManHours= "";
			oNewEntry.RepairLength= "";
			oNewEntry.RepairWidth= "";
			oNewEntry.Quantity= "";
			oNewEntry.ResponsibilityKey="";
			oNewEntry.ResponsibilityText= "";
			oNewEntry.LabourRate= "";
			oNewEntry.TechBulletin= "";
			oNewEntry.DataInserted = true;
			oNewEntry.responsibility = [];
			oNewEntry.responsibility.push({"text":"","key":""});
				var dataReponsibleREEntryJ = oMdlGlblDDLREEntryJ.getData().responsibility;
				for(var inx in dataReponsibleREEntryJ){
					oNewEntry.responsibility.push({"text":dataReponsibleREEntryJ[inx].text,"key":dataReponsibleREEntryJ[inx].key});
			}

			jsnLineItemREEntryJ.push(oNewEntry);
			jsnLineItemREEntryJ.resetSequence('LineItem',4);

		}
		if(jsnLineItemREEntryJ.length < 11){
			oTblLineItemREEntryJ.setNavigationMode(sap.ui.table.NavigationMode.None);
		}else{
			oTblLineItemREEntryJ.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		}

		oMdlLineItemREEntryJ.updateBindings();
	},



	insertRowLineItem: function(){
		var oTblLineItemREEntryJ = sap.ui.getCore().byId("idTblLineItemREEntryJ");
		var oidDdlSectionREEntryJ = sap.ui.getCore().byId("idDdlSectionREEntryJ");
		var oidDdlLocationREEntryJ = sap.ui.getCore().byId("idDdlLocationREEntryJ");
		var oidDdlComponentREEntryJ = sap.ui.getCore().byId("idDdlComponentREEntryJ");
		var oidDdlDamageREEntryJ = sap.ui.getCore().byId("idDdlDamageREEntryJ");
		var oidDdlRepairREEntryJ = sap.ui.getCore().byId("idDdlRepairREEntryJ");
		var oidDdlMaterialCodeREEntryJ = sap.ui.getCore().byId("idDdlMaterialCodeREEntryJ");
		var oidTFMaterialCostREEntryJ = sap.ui.getCore().byId("idTFMaterialCostREEntryJ");
		var oidTFManHoursREEntryJ = sap.ui.getCore().byId("idTFManHoursREEntryJ");
		var oidTFRepairLengthREEntryJ = sap.ui.getCore().byId("idTFRepairLengthREEntryJ");
		var oidTFRepairWidthREEntryJ = sap.ui.getCore().byId("idTFRepairWidthREEntryJ");
		var oidTFQuantityREEntryJ = sap.ui.getCore().byId("idTFQuantityREEntryJ");
		var oidDdlResponsibilityREEntryJ = sap.ui.getCore().byId("idDdlResponsibilityREEntryJ");
		var oidTFLabourRateREEntryJ = sap.ui.getCore().byId("idTFLabourRateREEntryJ");
		var oidTFTechBulletinREEntryJ = sap.ui.getCore().byId("idTFTechBulletinREEntryJ");
		var dataupdate = false;

		for(var i =0; i < jsnLineItemREEntryJ.length;i++)
		{
			//if(jsnLineItemREEntryJ[i].DataInserted == false){
			if((jsnLineItemREEntryJ[i].LocationKey == '') &&
				(jsnLineItemREEntryJ[i].ComponentKey == '') &&
				(jsnLineItemREEntryJ[i].DamageKey == '') &&
				(jsnLineItemREEntryJ[i].MaterialKey == '') &&
				(jsnLineItemREEntryJ[i].RepairKey == '') &&
				(jsnLineItemREEntryJ[i].RepairLength == '') &&
				(jsnLineItemREEntryJ[i].RepairWidth == '') &&
				(jsnLineItemREEntryJ[i].Quantity == '') &&
				(jsnLineItemREEntryJ[i].ManHours == '') &&
				(jsnLineItemREEntryJ[i].MaterialCost == '') &&
				(jsnLineItemREEntryJ[i].LabourRate == '') &&
				(jsnLineItemREEntryJ[i].TechBulletin == '') &&
				(jsnLineItemREEntryJ[i].ResponsibilityKey == '')){
				dataupdate = true;
				jsnLineItemREEntryJ[i].checked=false;
				//jsnLineItemREEntryJ[i].LineItem="";
				jsnLineItemREEntryJ[i].sectionKey = oidDdlSectionREEntryJ.getSelectedKey();
				jsnLineItemREEntryJ[i].sectionText = oidDdlSectionREEntryJ.getValue();
				jsnLineItemREEntryJ[i].LocationKey = oidDdlLocationREEntryJ.getSelectedKey();
				jsnLineItemREEntryJ[i].LocationText = oidDdlLocationREEntryJ.getValue();
				jsnLineItemREEntryJ[i].ComponentKey= oidDdlComponentREEntryJ.getSelectedKey();
				jsnLineItemREEntryJ[i].ComponentText= oidDdlComponentREEntryJ.getValue();
				jsnLineItemREEntryJ[i].DamageKey= oidDdlDamageREEntryJ.getSelectedKey();
				jsnLineItemREEntryJ[i].DamageText= oidDdlDamageREEntryJ.getValue();
				jsnLineItemREEntryJ[i].RepairKey= oidDdlRepairREEntryJ.getSelectedKey();
				jsnLineItemREEntryJ[i].RepairText= oidDdlRepairREEntryJ.getValue();
				jsnLineItemREEntryJ[i].MaterialKey= oidDdlMaterialCodeREEntryJ.getSelectedKey();
				jsnLineItemREEntryJ[i].MaterialText= oidDdlMaterialCodeREEntryJ.getValue();
				jsnLineItemREEntryJ[i].MaterialCost= oidTFMaterialCostREEntryJ.getValue();
				jsnLineItemREEntryJ[i].ManHours= oidTFManHoursREEntryJ.getValue();
				jsnLineItemREEntryJ[i].RepairLength= oidTFRepairLengthREEntryJ.getValue();
				jsnLineItemREEntryJ[i].RepairWidth= oidTFRepairWidthREEntryJ.getValue();
				jsnLineItemREEntryJ[i].Quantity= oidTFQuantityREEntryJ.getValue();
				jsnLineItemREEntryJ[i].ResponsibilityKey=oidDdlResponsibilityREEntryJ.getSelectedKey();
				jsnLineItemREEntryJ[i].ResponsibilityText= oidDdlResponsibilityREEntryJ.getValue();
				jsnLineItemREEntryJ[i].LabourRate= oidTFLabourRateREEntryJ.getValue();
				jsnLineItemREEntryJ[i].TechBulletin= oidTFTechBulletinREEntryJ.getValue();
				jsnLineItemREEntryJ[i].DataInserted =true;
				break;
			}
		}
		if(!dataupdate){
			oNewEntry ={};
			oNewEntry.checked=false;
			oNewEntry.LineItem="";
			oNewEntry.sectionKey = oidDdlSectionREEntryJ.getSelectedKey();
			oNewEntry.sectionText = oidDdlSectionREEntryJ.getValue();
			oNewEntry.LocationKey = oidDdlLocationREEntryJ.getSelectedKey();
			oNewEntry.LocationText = oidDdlLocationREEntryJ.getValue();
			oNewEntry.ComponentKey= oidDdlComponentREEntryJ.getSelectedKey();
			oNewEntry.ComponentText= oidDdlComponentREEntryJ.getValue();
			oNewEntry.DamageKey= oidDdlDamageREEntryJ.getSelectedKey();
			oNewEntry.DamageText= oidDdlDamageREEntryJ.getValue();
			oNewEntry.RepairKey= oidDdlRepairREEntryJ.getSelectedKey();
			oNewEntry.RepairText= oidDdlRepairREEntryJ.getValue();
			oNewEntry.MaterialKey= oidDdlMaterialCodeREEntryJ.getSelectedKey();
			oNewEntry.MaterialText= oidDdlMaterialCodeREEntryJ.getValue();
			oNewEntry.MaterialCost= oidTFMaterialCostREEntryJ.getValue();
			oNewEntry.ManHours= oidTFManHoursREEntryJ.getValue();
			oNewEntry.RepairLength= oidTFRepairLengthREEntryJ.getValue();
			oNewEntry.RepairWidth= oidTFRepairWidthREEntryJ.getValue();
			oNewEntry.Quantity= oidTFQuantityREEntryJ.getValue();
			oNewEntry.ResponsibilityKey=oidDdlResponsibilityREEntryJ.getSelectedKey();
			oNewEntry.ResponsibilityText= oidDdlResponsibilityREEntryJ.getValue();
			oNewEntry.LabourRate= oidTFLabourRateREEntryJ.getValue();
			oNewEntry.TechBulletin= oidTFTechBulletinREEntryJ.getValue();
			oNewEntry.DataInserted = true;
			oNewEntry.responsibility = [];
			oNewEntry.responsibility.push({"text":"","key":""});
				var dataReponsibleREEntryJ = oMdlGlblDDLREEntryJ.getData().responsibility;
				for(var inx in dataReponsibleREEntryJ){
					oNewEntry.responsibility.push({"text":dataReponsibleREEntryJ[inx].text,"key":dataReponsibleREEntryJ[inx].key});
				}

			jsnLineItemREEntryJ.push(oNewEntry);
			jsnLineItemREEntryJ.resetSequence('LineItem',4);
		}

		if(jsnLineItemREEntryJ.length < 6){
			oTblLineItemREEntryJ.setNavigationMode(sap.ui.table.NavigationMode.None);
		}else{
			oTblLineItemREEntryJ.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		}
		oMdlLineItemREEntryJ.updateBindings();
	},

	deleteRowModelTable: function(){
		var oTblLineItemREEntryJ = sap.ui.getCore().byId("idTblLineItemREEntryJ");
		jsnLineItemREEntryJ.removeValue('checked', true);

		/*if(selEstmtId == ''){
			jsnLineItemREEntryJ.removeValue('checked', true);
		}else if(selEstmtId != ''){
			objcurntREEntryJ.onlinefunDeleteLine();
		}*/
		//jsnLineItemREEntryJ.resetSequence('LineItem',5)
		oMdlLineItemREEntryJ.updateBindings();

		if(jsnLineItemREEntryJ.length < 6){
			oTblLineItemREEntryJ.setNavigationMode(sap.ui.table.NavigationMode.None);
		}else{
			oTblLineItemREEntryJ.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		}
	},

	fnDeleteLineMsgBox: function(sResult){
		if(sResult == "YES"){
			objcurntREEntryJ.deleteRowModelTable();
		}
	},
	//DELETE ONLINE LINE ITEM
	onlinesuccessfunDeleteLine: function(resultdata, response){
		busyDialog.close();
		if(resultdata != undefined){
			if(resultdata.results.length > 0){
				jsnLineItemREEntryJ.removeValue('checked', true);
				//sap.ui.commons.MessageBox.alert(resultdata.results[0].Msg);
			}
		}

		oMdlLineItemREEntryJ.updateBindings();
		var oTblLineItemREEntryJ = sap.ui.getCore().byId("idTblLineItemREEntryJ");
		if(jsnLineItemREEntryJ.length < 6){
			oTblLineItemREEntryJ.setNavigationMode(sap.ui.table.NavigationMode.None);
		}else{
			oTblLineItemREEntryJ.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		}
	},

	onlineerrorfunDeleteLine: function(err){
		errorfromServer(err);
	},

	onlinefunDeleteLine: function(){
		try{
			busyDialog.open();
			var urlToCall = serviceUrl15_old + "/Delete_Lines_Rep_Estimates?";
				urlToCall += "$filter=EstimateId eq '"+ selEstmtId +"' and DelLn1 eq '";

			var cntlineitem = 1;

			for(var i=0; i<jsnLineItemREEntryJ.length; i++){
				if((jsnLineItemREEntryJ[i].checked == true)&&(cntlineitem < 34)) {
					urlToCall += jsnLineItemREEntryJ[i].LineItem + '$'
					cntlineitem++;
				}else if((jsnLineItemREEntryJ[i].checked == true)&&(cntlineitem > 33)&&(cntlineitem < 67)) {
					if(cntlineitem == 34){
						urlToCall = urlToCall.slice(0,urlToCall.length-1);
						urlToCall += "' and DelLn2 eq '"
					}
					urlToCall += jsnLineItemREEntryJ[i].LineItem + '$'
					cntlineitem++;
				}else if((jsnLineItemREEntryJ[i].checked == true)&&(cntlineitem > 66)&&(cntlineitem < 101)) {
					if(cntlineitem == 67){
						urlToCall = urlToCall.slice(0,urlToCall.length-1);
						urlToCall += "' and DelLn3 eq '"
					}
					urlToCall += jsnLineItemREEntryJ[i].LineItem + '$'
					cntlineitem++;
				}else if(cntlineitem > 100){
					jsnLineItemREEntryJ[i].checked = false;
				}
			}
			urlToCall = urlToCall.slice(0,urlToCall.length-1);
			urlToCall += "'";
		    objUtilREstimate.doOnlineRequest(urlToCall,objcurntREEntryJ.onlinesuccessfunDeleteLine, objcurntREEntryJ.onlineerrorfunDeleteLine);
		}catch(e){
			busyDialog.close();
			sap.ui.commons.MessageBox.alert("Error on fetching Repair data " + e);
		}
	},

	fnResetCallbackMsgBox: function(sResult){
		//alert("sResult" + sResult);
		if(sResult == "YES"){
			var oTblLineItemREEntryJ = sap.ui.getCore().byId("idTblLineItemREEntryJ");
			var oidDdlSectionREEntryJ = sap.ui.getCore().byId("idDdlSectionREEntryJ");
			var oidDdlLocationREEntryJ = sap.ui.getCore().byId("idDdlLocationREEntryJ");
			var oidDdlComponentREEntryJ = sap.ui.getCore().byId("idDdlComponentREEntryJ");
			var oidDdlDamageREEntryJ = sap.ui.getCore().byId("idDdlDamageREEntryJ");
			var oidDdlRepairREEntryJ = sap.ui.getCore().byId("idDdlRepairREEntryJ");
			var oidDdlMaterialCodeREEntryJ = sap.ui.getCore().byId("idDdlMaterialCodeREEntryJ");
			var oidTFMaterialCostREEntryJ = sap.ui.getCore().byId("idTFMaterialCostREEntryJ");
			var oidTFManHoursREEntryJ = sap.ui.getCore().byId("idTFManHoursREEntryJ");
			var oidTFRepairLengthREEntryJ = sap.ui.getCore().byId("idTFRepairLengthREEntryJ");
			var oidTFRepairWidthREEntryJ = sap.ui.getCore().byId("idTFRepairWidthREEntryJ");
			var oidTFQuantityREEntryJ = sap.ui.getCore().byId("idTFQuantityREEntryJ");
			var oidDdlResponsibilityREEntryJ = sap.ui.getCore().byId("idDdlResponsibilityREEntryJ");
			var oidTFLabourRateREEntryJ = sap.ui.getCore().byId("idTFLabourRateREEntryJ");
			var oidTFTechBulletinREEntryJ = sap.ui.getCore().byId("idTFTechBulletinREEntryJ");

			oidDdlSectionREEntryJ.setValueState(sap.ui.core.ValueState.None);
			oidDdlSectionREEntryJ.setPlaceholder("Select Section");
			oidDdlSectionREEntryJ.setSelectedKey('');

			oidDdlLocationREEntryJ.setValueState(sap.ui.core.ValueState.None);
			oidDdlLocationREEntryJ.setPlaceholder("Select Location");
			oidDdlLocationREEntryJ.setSelectedKey('');
			oidDdlLocationREEntryJ.destroyItems();
			if(oidDdlLocationREEntryJ._oListBox != undefined)
					oidDdlLocationREEntryJ._oListBox.setVisibleItems(0);

			oidDdlComponentREEntryJ.setValueState(sap.ui.core.ValueState.None);
			oidDdlComponentREEntryJ.setPlaceholder("Select Component");
			oidDdlComponentREEntryJ.setSelectedKey('');
			oidDdlComponentREEntryJ.destroyItems();
			if(oidDdlComponentREEntryJ._oListBox != undefined)
					oidDdlComponentREEntryJ._oListBox.setVisibleItems(0);

			oidDdlDamageREEntryJ.setValueState(sap.ui.core.ValueState.None);
			oidDdlDamageREEntryJ.setPlaceholder("Select Damage");
			oidDdlDamageREEntryJ.setSelectedKey('');

			oidDdlRepairREEntryJ.setValueState(sap.ui.core.ValueState.None);
			oidDdlRepairREEntryJ.setPlaceholder("Select Repair");
			oidDdlRepairREEntryJ.setSelectedKey('');
			oidDdlRepairREEntryJ.destroyItems();
			if(oidDdlRepairREEntryJ._oListBox != undefined)
					oidDdlRepairREEntryJ._oListBox.setVisibleItems(0);

			oidDdlMaterialCodeREEntryJ.setValueState(sap.ui.core.ValueState.None);
			oidDdlMaterialCodeREEntryJ.setPlaceholder("Select Material Code");
			oidDdlMaterialCodeREEntryJ.setSelectedKey('');

			oidTFMaterialCostREEntryJ.setValueState(sap.ui.core.ValueState.None);
			oidTFMaterialCostREEntryJ.setPlaceholder("Material Cost");
			oidTFMaterialCostREEntryJ.setValue('');

			oidTFManHoursREEntryJ.setValueState(sap.ui.core.ValueState.None);
			oidTFManHoursREEntryJ.setPlaceholder("Man Hours");
			oidTFManHoursREEntryJ.setValue('');

			oidTFRepairLengthREEntryJ.setValueState(sap.ui.core.ValueState.None);
			oidTFRepairLengthREEntryJ.setPlaceholder("Repair Length");
			oidTFRepairLengthREEntryJ.setValue('');

			oidTFRepairWidthREEntryJ.setValueState(sap.ui.core.ValueState.None);
			oidTFRepairWidthREEntryJ.setPlaceholder("Repair Width");
			oidTFRepairWidthREEntryJ.setValue('');

			oidTFQuantityREEntryJ.setValueState(sap.ui.core.ValueState.None);
			oidTFQuantityREEntryJ.setPlaceholder("Quantity");
			oidTFQuantityREEntryJ.setValue('');

			oidDdlResponsibilityREEntryJ.setValueState(sap.ui.core.ValueState.None);
			oidDdlResponsibilityREEntryJ.setPlaceholder("Select Responsibility");
			oidDdlResponsibilityREEntryJ.setSelectedKey('');

			oidTFLabourRateREEntryJ.setValueState(sap.ui.core.ValueState.None);
			oidTFLabourRateREEntryJ.setPlaceholder("Labour Rate");
			oidTFLabourRateREEntryJ.setValue('');

			oidTFTechBulletinREEntryJ.setValueState(sap.ui.core.ValueState.None);
			oidTFTechBulletinREEntryJ.setPlaceholder("Tech Bulletin");
			oidTFTechBulletinREEntryJ.setValue('');

			//jsnLineItemREEntryJ.length = 0;
			//oMdlLineItemREEntryJ.setData({modelData : jsnLineItemREEntryJ});
			//oTblLineItemREEntryJ.setNavigationMode(sap.ui.table.NavigationMode.None);

		}
	},

	createEnterLineDataLay: function(oController){
		var oFrmCntnrREEntryJ = sap.ui.getCore().byId("idFrmCntnrREEntryJ");
		//INSERT TABLE
		/*var frmHdrEntrLinDataREEntryJ = new sap.ui.layout.form.FormElement({
		    fields: [objcurntREEntryJ.createLineItemTable()]
		});
		oFrmCntnrREEntryJ.addFormElement(frmHdrEntrLinDataREEntryJ); */

		//HEADER TEXT FOR INSERT LIND DATA
		// MACISMAILBEGIN
//		var frmHdrEntrLinDataREEntryJ = new sap.ui.layout.form.FormElement({
//		    fields: [new sap.ui.commons.Label({text: "Enter Line Data",
//				layoutData: new sap.ui.layout.GridData({span: "L12 M12 S12"}),
//	            wrapping: true}).addStyleClass("marginTop10 fontTitle")]
//		});
//		oFrmCntnrREEntryJ.addFormElement(frmHdrEntrLinDataREEntryJ);
//
//		//FIRST ROW
//		var olblSectionREEntryJ = new sap.ui.commons.Label({text: "Section:",
//			//required: true,
//			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
//            wrapping: false}).addStyleClass("marginTop10");
//
//		var oDdlSectionREEntryJ = new sap.ui.commons.DropdownBox("idDdlSectionREEntryJ", {
//			  layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"}),
//			  width:"100%",
//	          displaySecondaryValues:false,
//			  placeholder: "Select Section",
//			  change: function(evnt){
//				sap.ui.getCore().byId("idDdlLocationREEntryJ").destroyItems();
//				if(sap.ui.getCore().byId("idDdlLocationREEntryJ")._oListBox != undefined)
//					sap.ui.getCore().byId("idDdlLocationREEntryJ")._oListBox.setVisibleItems(0);
//
//				sap.ui.getCore().byId("idDdlComponentREEntryJ").destroyItems();
//				if(sap.ui.getCore().byId("idDdlComponentREEntryJ")._oListBox != undefined)
//					sap.ui.getCore().byId("idDdlComponentREEntryJ")._oListBox.setVisibleItems(0);
//
//				if(this.getValue() != '')
//				{
//					this.setValueState(sap.ui.core.ValueState.None);
//					this.setPlaceholder("Select Section");
//
//					objcurntREEntryJ.onlinefunLocationNew(this.getSelectedKey());
//				}
//	          },
//		}).addStyleClass("FormInputStyle marginTop7");
//
//		//oDdlSectionREEntryJ.insertItem((new sap.ui.core.ListItem({text:"Select Customer", key:"0"})),0);
//
//		var olblLocationREEntryJ = new sap.ui.commons.Label({text: "Location:",
//			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
//            wrapping: false}).addStyleClass("marginTop10");
//
//		var oDdlLocationREEntryJ = new sap.ui.commons.DropdownBox("idDdlLocationREEntryJ", {
//			  layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"}),
//			  width:"100%",
//	          displaySecondaryValues:false,
//			  placeholder: "Select Location",
//			  change: function(evnt){
//				sap.ui.getCore().byId("idDdlComponentREEntryJ").destroyItems();
//				if(sap.ui.getCore().byId("idDdlComponentREEntryJ")._oListBox != undefined)
//					sap.ui.getCore().byId("idDdlComponentREEntryJ")._oListBox.setVisibleItems(0);
//
//				if(this.getValue() != '')
//				{
//					this.setValueState(sap.ui.core.ValueState.None);
//					this.setPlaceholder("Select Location");
//
//					objcurntREEntryJ.onlinefunComponentNew(this.getSelectedKey());
//				}
//	          },
//		}).addStyleClass("FormInputStyle marginTop7");
//
//
//		var olblComponentREEntryJ = new sap.ui.commons.Label({text: "Component:",
//			//required: true,
//			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
//            wrapping: false}).addStyleClass("marginTop10");
//
//		var oDdlComponentREEntryJ = new sap.ui.commons.DropdownBox("idDdlComponentREEntryJ", {
//			  layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"}),
//			  width:"100%",
//	          displaySecondaryValues:false,
//			  placeholder: "Select Component",
//			  change: function(evnt){
//				if(this.getValue() != '')
//				{
//					this.setValueState(sap.ui.core.ValueState.None);
//					this.setPlaceholder("Select Component");
//				}
//	          },
//		}).addStyleClass("FormInputStyle marginTop7");
//
//		var frmFirsRowREEntryJ = new sap.ui.layout.form.FormElement({
//		    fields: [olblSectionREEntryJ,oDdlSectionREEntryJ,olblLocationREEntryJ,oDdlLocationREEntryJ,olblComponentREEntryJ,oDdlComponentREEntryJ]
//		});
//		oFrmCntnrREEntryJ.addFormElement(frmFirsRowREEntryJ);
//
//		//SECOND ROW
//		var olblDamageREEntryJ = new sap.ui.commons.Label({text: "Damage:",
//			//required: true,
//			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
//            wrapping: false}).addStyleClass("marginTop10");
//
//		var oDdlDamageREEntryJ = new sap.ui.commons.DropdownBox("idDdlDamageREEntryJ", {
//			  layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"}),
//			  width:"100%",
//	          displaySecondaryValues:false,
//			  placeholder: "Select Damage",
//			  change: function(evnt){
//				sap.ui.getCore().byId("idDdlRepairREEntryJ").destroyItems();
//				if(sap.ui.getCore().byId("idDdlRepairREEntryJ")._oListBox != undefined)
//					sap.ui.getCore().byId("idDdlRepairREEntryJ")._oListBox.setVisibleItems(0);
//
//				if(this.getValue() != '')
//				{
//					this.setValueState(sap.ui.core.ValueState.None);
//					this.setPlaceholder("Select Damage");
//					objcurntREEntryJ.onlinefunRepairNew(this.getSelectedKey());
//
//				}
//	          },
//		}).addStyleClass("FormInputStyle marginTop7");
//
//		var olblRepairREEntryJ = new sap.ui.commons.Label({text: "Repair:",
//			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
//            wrapping: false}).addStyleClass("marginTop10");
//
//		var oDdlRepairREEntryJ = new sap.ui.commons.DropdownBox("idDdlRepairREEntryJ", {
//			  layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"}),
//			  width:"100%",
//	          displaySecondaryValues:false,
//			  placeholder: "Select Repair",
//			  change: function(evnt){
//				if(this.getValue() != '')
//				{
//					this.setValueState(sap.ui.core.ValueState.None);
//					this.setPlaceholder("Select Repair");
//				}
//	          },
//		}).addStyleClass("FormInputStyle marginTop7");
//
//
//		var olblMaterialCodeREEntryJ = new sap.ui.commons.Label({text: "Material Code:",
//			//required: true,
//			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
//            wrapping: false}).addStyleClass("marginTop10");
//
//		var oidDdlMaterialCodeREEntryJ = new sap.ui.commons.DropdownBox("idDdlMaterialCodeREEntryJ", {
//			  layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"}),
//			  width:"100%",
//	          displaySecondaryValues:false,
//			  placeholder: "Select Material Code",
//			  change: function(evnt){
//				if(this.getValue() != '')
//				{
//					this.setValueState(sap.ui.core.ValueState.None);
//					this.setPlaceholder("Select Material Code");
//				}
//	          },
//		}).addStyleClass("FormInputStyle marginTop7");
//
//		frmFirsRowREEntryJ = new sap.ui.layout.form.FormElement({
//		    fields: [olblDamageREEntryJ,oDdlDamageREEntryJ,olblRepairREEntryJ,oDdlRepairREEntryJ,olblMaterialCodeREEntryJ,oidDdlMaterialCodeREEntryJ]
//		});
//		oFrmCntnrREEntryJ.addFormElement(frmFirsRowREEntryJ);
//
//		//THIRD ROW
//		var olblMaterialCostREEntryJ = new sap.ui.commons.Label({text: "Material Cost:",
//			//required: true,
//			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
//            wrapping: false}).addStyleClass("marginTop10");
//
//		var oTFMaterialCostREEntryJ = new sap.ui.commons.TextField('idTFMaterialCostREEntryJ',{
//    		placeholder: "Material Cost",
//			//width:"85%",
//    		layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"}),
//    	}).addStyleClass("FormInputStyle marginTop7");
//
//		oTFMaterialCostREEntryJ.onfocusin =  function(e) {
//			this.setValueState(sap.ui.core.ValueState.None);
//			this.setPlaceholder("Material Cost");
//	      };
//
//		oTFMaterialCostREEntryJ.onkeyup = function(evnt){
//			addSeparator(document.getElementById(this.sId));
//		};
//		oTFMaterialCostREEntryJ.onkeydown = function(e){
//			validateNumeric(event,true);
//		};
//		oTFMaterialCostREEntryJ.onpaste = function(e){
//			e.preventDefault();
//		};
//
//		var olblManHoursREEntryJ = new sap.ui.commons.Label({text: "Man Hours:",
//			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
//            wrapping: false}).addStyleClass("marginTop10");
//
//		var oTFManHoursREEntryJ = new sap.ui.commons.TextField('idTFManHoursREEntryJ',{
//    		placeholder: "Man Hours",
//			//width:"85%",
//    		layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"}),
//    	}).addStyleClass("FormInputStyle marginTop7");
//
//		oTFManHoursREEntryJ.onfocusin =  function(e) {
//			this.setValueState(sap.ui.core.ValueState.None);
//			this.setPlaceholder("Man Hours");
//	      };
//
//	      oTFManHoursREEntryJ.onkeyup = function(evnt){
//				addSeparator(document.getElementById(this.sId));
//			};
//			oTFManHoursREEntryJ.onkeydown = function(e){
//				validateNumeric(event,true);
//			};
//			oTFManHoursREEntryJ.onpaste = function(e){
//				e.preventDefault();
//			};
//
//		var olblRepairLengthREEntryJ = new sap.ui.commons.Label({text: "Repair Length:",
//			//required: true,
//			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
//            wrapping: false}).addStyleClass("marginTop10");
//
//		var oTFRepairLengthREEntryJ = new sap.ui.commons.TextField('idTFRepairLengthREEntryJ',{
//    		placeholder: "Repair Length",
//			//width:"85%",
//    		layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"}),
//    	}).addStyleClass("FormInputStyle marginTop7");
//
//		oTFRepairLengthREEntryJ.onfocusin =  function(e) {
//			this.setValueState(sap.ui.core.ValueState.None);
//			this.setPlaceholder("Repair Length");
//	      };
//
//	    oTFRepairLengthREEntryJ.onkeyup = function(evnt){
//			addSeparator(document.getElementById(this.sId));
//		};
//		oTFRepairLengthREEntryJ.onkeydown = function(e){
//			validateNumeric(event,true);
//		};
//		oTFRepairLengthREEntryJ.onpaste = function(e){
//			e.preventDefault();
//		};
//
//
//		frmFirsRowREEntryJ = new sap.ui.layout.form.FormElement({
//		    fields: [olblMaterialCostREEntryJ,oTFMaterialCostREEntryJ,olblManHoursREEntryJ,oTFManHoursREEntryJ,olblRepairLengthREEntryJ,oTFRepairLengthREEntryJ]
//		});
//		oFrmCntnrREEntryJ.addFormElement(frmFirsRowREEntryJ);
//
//		//FOURTH ROW
//		var olblRepairWidthREEntryJ = new sap.ui.commons.Label({text: "Repair Width:",
//			//required: true,
//			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
//            wrapping: false}).addStyleClass("marginTop10");
//
//		var oTFRepairWidthREEntryJ = new sap.ui.commons.TextField('idTFRepairWidthREEntryJ',{
//    		placeholder: "Repair Width",
//			//width:"85%",
//    		layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"}),
//    	}).addStyleClass("FormInputStyle marginTop7");
//
//		oTFRepairWidthREEntryJ.onfocusin =  function(e) {
//			this.setValueState(sap.ui.core.ValueState.None);
//			this.setPlaceholder("Repair Width");
//	      };
//
//	    oTFRepairWidthREEntryJ.onkeyup = function(evnt){
//			addSeparator(document.getElementById(this.sId));
//		};
//		oTFRepairWidthREEntryJ.onkeydown = function(e){
//			validateNumeric(event,true);
//		};
//		oTFRepairWidthREEntryJ.onpaste = function(e){
//			e.preventDefault();
//		};
//
//		var olblQuantityREEntryJ = new sap.ui.commons.Label({text: "Quantity:",
//			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
//            wrapping: false}).addStyleClass("marginTop10");
//
//		var oTFQuantityREEntryJ = new sap.ui.commons.TextField('idTFQuantityREEntryJ',{
//    		placeholder: "Quantity",
//			//width:"85%",
//    		layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"}),
//    	}).addStyleClass("FormInputStyle marginTop7");
//
//		oTFQuantityREEntryJ.onfocusin =  function(e) {
//			this.setValueState(sap.ui.core.ValueState.None);
//			this.setPlaceholder("Quantity");
//	      };
//
//	    oTFQuantityREEntryJ.onkeyup = function(evnt){
//			addSeparator(document.getElementById(this.sId));
//		};
//		oTFQuantityREEntryJ.onkeydown = function(e){
//			validateNumeric(event,true);
//		};
//		oTFQuantityREEntryJ.onpaste = function(e){
//			e.preventDefault();
//		};
//
//		var olblResponsibilityREEntryJ = new sap.ui.commons.Label({text: "Responsibility:",
//			//required: true,
//			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
//            wrapping: false}).addStyleClass("marginTop10");
//
//		var oDdlResponsibilityREEntryJ = new sap.ui.commons.ComboBox("idDdlResponsibilityREEntryJ", {
//			  layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"}),
//			  width:"100%",
//	          displaySecondaryValues:false,
//			  placeholder: "Select Responsibility",
//			  change: function(evnt){
//				if(this.getValue() != '')
//				{
//					this.setValueState(sap.ui.core.ValueState.None);
//					this.setPlaceholder("Select Responsibility");
//				}
//	          },
//		}).addStyleClass("FormInputStyle marginTop7");
//	    //oDdlResponsibilityREEntryJ.setModel(omdlGlobalRESData);
//		//oDdlResponsibilityREEntryJ.bindItems("/Responsibility", oItmTmpltGloabREEntryJ);
//		sap.ui.getCore().byId("idDdlResponsibilityREEntryJ").removeAllItems();
//		frmFirsRowREEntryJ = new sap.ui.layout.form.FormElement({
//		    fields: [olblRepairWidthREEntryJ,oTFRepairWidthREEntryJ,olblQuantityREEntryJ,oTFQuantityREEntryJ,olblResponsibilityREEntryJ,oDdlResponsibilityREEntryJ]
//		});
//		oFrmCntnrREEntryJ.addFormElement(frmFirsRowREEntryJ);
//
//		//FIFTH ROW
//		var olblLabourRateREEntryJ = new sap.ui.commons.Label({text: "Labour Rate:",
//			//required: true,
//			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
//            wrapping: false}).addStyleClass("marginTop10");
//
//		var oTFLabourRateREEntryJ = new sap.ui.commons.TextField('idTFLabourRateREEntryJ',{
//    		placeholder: "Labour Rate",
//			//width:"85%",
//    		layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"}),
//    	}).addStyleClass("FormInputStyle marginTop7");
//
//		oTFLabourRateREEntryJ.onfocusin =  function(e) {
//			this.setValueState(sap.ui.core.ValueState.None);
//			this.setPlaceholder("Labour Rate");
//	    };
//
//	    oTFLabourRateREEntryJ.onkeyup = function(evnt){
//			addSeparator(document.getElementById(this.sId));
//		};
//		oTFLabourRateREEntryJ.onkeydown = function(e){
//			validateNumeric(event,true);
//		};
//		oTFLabourRateREEntryJ.onpaste = function(e){
//			e.preventDefault();
//		};
//
//		var olblTechBulletinREEntryJ = new sap.ui.commons.Label({text: "Tech Bulletin:",
//			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
//            wrapping: false}).addStyleClass("marginTop10");
//
//		var oTFTechBulletinREEntryJ = new sap.ui.commons.TextField('idTFTechBulletinREEntryJ',{
//    		placeholder: "Tech Bulletin",
//    		change: upperOnChangeTF,
//			//width:"85%",
//    		layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"}),
//    	}).addStyleClass("FormInputStyle marginTop7");
//
//		oTFTechBulletinREEntryJ.onfocusin =  function(e) {
//			this.setValueState(sap.ui.core.ValueState.None);
//			this.setPlaceholder("Tech Bulletin");
//	      };
//
//	      frmFirsRowREEntryJ = new sap.ui.layout.form.FormElement({
//			    fields: [olblLabourRateREEntryJ,oTFLabourRateREEntryJ, olblTechBulletinREEntryJ,oTFTechBulletinREEntryJ]
//			});
//			oFrmCntnrREEntryJ.addFormElement(frmFirsRowREEntryJ);
//
//			//CREATE LINE ITEM BUTTONS
//			var oBtnInsertLineREEntryJ = new sap.m.Button("idBtnInsertLineREEntryJ",{
//				  text : "Insert Line",
//				  width:"100px",
//				  styled:false,
//				  //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: true}),
//				  press:function(){
//					sap.ui.getCore().byId("idlblSuccessMsgREEJ").setText("");
//					sap.ui.getCore().byId("idlblSuccessMsgREEJ").setVisible(false);
//					objcurntREEntryJ.insertRowLineItemIntoExcel();
//			}}).addStyleClass("submitBtn");
//
//			var oBtnDeleteLineREEntryJ = new sap.m.Button("idBtnDeleteLineREEntryJ",{
//		          text : "Delete Line",
//		          visible: false,
//		          width:"90px",
//				  styled:false,
//		          //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: false}),
//		          press:function(){
//
//					sap.ui.getCore().byId("idlblSuccessMsgREEJ").setText("");
//					sap.ui.getCore().byId("idlblSuccessMsgREEJ").setVisible(false);
//					var msgAlrtDelet ="The selected lines from the Repair Lines will be deleted.\nTo delete the lines click Yes.\nTo return to the Repair Estimate screen without deleting any lines click No.";
//					var chkedArr = jQuery.grep(jsnLineItemREEntryJ, function(element, index){
//						return element.checked == true;
//					});
//
//					if(chkedArr.length < 1){
//						sap.ui.commons.MessageBox.alert("No lines selected for deletion.\nPlease check atleast 1 checkbox in the Repair Lines section and retry.");
//						return;
//					}else{
//						sap.ui.commons.MessageBox.show(msgAlrtDelet,sap.ui.commons.MessageBox.Icon.WARNING,"Warning",
//							[sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO],
//							objcurntREEntryJ.fnDeleteLineMsgBox, sap.ui.commons.MessageBox.Action.YES);
//					}
//		          }}).addStyleClass("submitBtn");
//
//			var ResetMessage = "This will clear all the input data from the Enter Line Data section.\n Do you want to continue?";
//			var oBtnResetLineREEntryJ = new sap.m.Button("idBtnResetREEntryJ",{
//				text : "Reset",
//				width:"80px",
//				styled:false,
//				//layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
//				press:function(){
//					sap.ui.getCore().byId("idlblSuccessMsgREEJ").setText("");
//					sap.ui.getCore().byId("idlblSuccessMsgREEJ").setVisible(false);
//					sap.ui.commons.MessageBox.show(ResetMessage,sap.ui.commons.MessageBox.Icon.WARNING,"Warning",
//					[sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO],
//					objcurntREEntryJ.fnResetCallbackMsgBox, sap.ui.commons.MessageBox.Action.YES);
//			}}).addStyleClass("submitBtn");
//
//
//		 // Flex Box
//	    	var oFlxBtnLineREEntryJ = new sap.m.FlexBox({
//	    	      items: [oBtnInsertLineREEntryJ,
//	    	              new sap.ui.commons.Label( {text: " ",width : '8px'}),
//	    	              oBtnDeleteLineREEntryJ,
//	    	              new sap.ui.commons.Label( {text: " ",width : '8px'}),
//	    	              oBtnResetLineREEntryJ
//	    	              ],
//	    	      direction: "Row",
//				  layoutData: new sap.ui.layout.GridData({span: "L12 M12 S12",linebreak: true, margin: false}),
//	    	    }).addStyleClass("marginTop10");
//
//	    	  	frmFirsRowREEntryJ = new sap.ui.layout.form.FormElement({
//				    fields: [oFlxBtnLineREEntryJ]
//				});
//				oFrmCntnrREEntryJ.addFormElement(frmFirsRowREEntryJ);
//
//
//				frmFirsRowREEntryJ = new sap.ui.layout.form.FormElement({
//				    fields: [new sap.ui.commons.HorizontalDivider({width: "100%", type: "Area", height: "Medium"}).addStyleClass("marginTop7")]
//				});
//				oFrmCntnrREEntryJ.addFormElement(frmFirsRowREEntryJ);

		// MACISMAILEND
				//CREATE BUTTONS SAVE AND SUBMIT
				var oBtnSubmitREEntryJ = new sap.m.Button("idBtnSubmitREEntryJ",{
					  text : "Submit",
					  visible : true,	// MACALPHA19032018_8 changed from false to true
					  width:"80px",
					  styled:false,
					  //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: true}),
					  press:function(){
						sap.ui.getCore().byId("idlblSuccessMsgREEJ").setText("");
						sap.ui.getCore().byId("idlblSuccessMsgREEJ").setVisible(false);
						clickEvent = "submit";
						var valid = true;
						if(sap.ui.getCore().byId("idDdlUnitPCodeREEntryJ").getValue() == ''){
							valid = false;
							sap.ui.getCore().byId("idDdlUnitPCodeREEntryJ").setValueState(sap.ui.core.ValueState.Error);
							sap.ui.getCore().byId("idDdlUnitPCodeREEntryJ").setPlaceholder("Select Unit Part Code");
						}

						if(sap.ui.getCore().byId("idDdlJobTypeREEntryJ").getValue() == ''){
							valid = false;
							sap.ui.getCore().byId("idDdlJobTypeREEntryJ").setValueState(sap.ui.core.ValueState.Error);
							sap.ui.getCore().byId("idDdlJobTypeREEntryJ").setPlaceholder("Select Job Type");
						}

						if(sap.ui.getCore().byId("idDtPkrEstimateDtREEntryJ").getValue() == ''){
							valid = false;
							sap.ui.getCore().byId("idDtPkrEstimateDtREEntryJ").setValueState(sap.ui.core.ValueState.Error);
							sap.ui.getCore().byId("idDtPkrEstimateDtREEntryJ").setPlaceholder("Estimate Date");
						}

						// MACALPHA19032018_3+
						if(sap.ui.getCore().byId("idTFCWREEntryJ").getValue() == ''){
							valid = false;
							sap.ui.getCore().byId("idTFCWREEntryJ").setValueState(sap.ui.core.ValueState.Error);
							sap.ui.getCore().byId("idTFCWREEntryJ").setPlaceholder("Cargo Worthy");
						}

						if(sap.ui.getCore().byId("idTFNotes1REEntryJ").getValue() == ''){
							valid = false;
							sap.ui.getCore().byId("idTFNotes1REEntryJ").setValueState(sap.ui.core.ValueState.Error);
							sap.ui.getCore().byId("idTFNotes1REEntryJ").setPlaceholder("SCR Limit");
						}

						// MACALPHA19032018_3+
						if(!valid){
							return;
						}
						if(sap.ui.getCore().byId("idFrmElmntErrREEntryJ") != undefined){
							sap.ui.getCore().byId("idFrmElmntErrREEntryJ").destroyFields();
							sap.ui.getCore().byId("idFrmElmntErrREEntryJ").destroy();
						}
						if(sap.ui.getCore().byId("idFrmElmntInfoLstREEntryJ") != undefined){
							sap.ui.getCore().byId("idFrmElmntInfoLstREEntryJ").destroyFields();
							sap.ui.getCore().byId("idFrmElmntInfoLstREEntryJ").destroy();
						}

						objcurntREEntryJ.saveRepairEstimateFromExcelNew();	// MACALPHA19032018_8
						//objREstimateOnlineJ.onlinefunEstimateSubmit(selEstmtId);
				}}).addStyleClass("submitBtn");

				var oBtnBackUnitSelREEntryJ = new sap.m.Button("idBtnBackUnitSelREEntryJ",{
			          text : "Back To Unit Selection",
			          //width:"170px",
					  styled:false,
			          //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: false}),
			          press:function(){
						sap.ui.getCore().byId("idlblSuccessMsgREEJ").setText("");
						sap.ui.getCore().byId("idlblSuccessMsgREEJ").setVisible(false);

						sap.ui.commons.MessageBox.show("You will lose any unsaved data.\nDo you want to save before going back?",sap.ui.commons.MessageBox.Icon.WARNING,"Warning",
						[sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO, sap.ui.commons.MessageBox.Action.CANCEL],
						objcurntREEntryJ.backToUnitSelction, sap.ui.commons.MessageBox.Action.YES);
			          }}).addStyleClass("submitBtn");

				// MACALPHA19032018_9 + Include one print/excel button
				var oCurrent = this;
				var oBtnPrintREEntry = new sap.m.Button("idBtnPrintREEntry", {
						text : "Print",
						type:sap.m.ButtonType.Unstyled,
						icon: sap.ui.core.IconPool.getIconURI("print"),
						press:function(){

							var printExcelDataC = [];
							var currExcelData = oExcelGridJ1.getData();
							var currLength = currExcelData.length;
							var totalLabHrs = 0;
							var totalMatCost = 0;
							for(var i =0; i < currLength; i++){
								loop1 : for(var j =0; j < 12; j++){
									if(currExcelData[i][j] != "" && currExcelData[i][j] != null){

										totalLabHrs = totalLabHrs + parseFloat(currExcelData[i][8]);
										totalMatCost = totalMatCost + parseFloat(currExcelData[i][9]);

										printExcelDataC.push({
											"Line": padZero(i+1,3) ,
											"Location" : (currExcelData[i][0] == null)? "" : currExcelData[i][0],
											"Component" : (currExcelData[i][1] == null)? "" : currExcelData[i][1],
											"Damage" : (currExcelData[i][2] == null)? "" : currExcelData[i][2],
											"Material" : (currExcelData[i][3] == null)? "" : currExcelData[i][3],
											"Repair" : (currExcelData[i][4] == null)? "" : currExcelData[i][4],
											"Rp. Length" : (currExcelData[i][5] == null)? "" : currExcelData[i][5],
											"Rp. Width" : (currExcelData[i][6] == null)? "" : currExcelData[i][6],
											"Qty" : (currExcelData[i][7] == null)? "" : currExcelData[i][7],
											"Lab.Hrs" : (currExcelData[i][8] == null)? "" : thousandsep(currExcelData[i][8]),
											"Material Cost" : (currExcelData[i][9] == null)? "" : currExcelData[i][9],
											"Bulletin" : (currExcelData[i][10] == null)? "" : currExcelData[i][10],
											"Responsibility" : (currExcelData[i][10] == null)? "" : currExcelData[i][11],
										});
										break loop1;
									}
								}
							}

							if(printExcelDataC.length != 0){
								printExcelDataC.push({
									"Line": "" ,
									"Location" : "",
									"Component" : "",
									"Damage" : "",
									"Material" : "",
									"Repair" : "",
									"Rp. Length" : "",
									"Rp. Width" : "",
									"Qty" : "",
									"Lab.Hrs" : thousandsep(totalLabHrs),
									"Material Cost" : thousandsep(totalMatCost),
									"Bulletin" : "",
									"Responsibility" : ""
								});
							}


							var printExcelDataM = [];
							var currExcelData = oExcelGridJ2.getData();
							var currLength = currExcelData.length;
							totalLabHrs = 0;
							totalMatCost = 0;

							for(var i =0; i < currLength; i++){
								loop1 : for(var j =0; j < 12; j++){
									if(currExcelData[i][j] != "" && currExcelData[i][j] != null){

										totalLabHrs = totalLabHrs + parseFloat(currExcelData[i][8]);
										totalMatCost = totalMatCost + parseFloat(currExcelData[i][9]);

										printExcelDataM.push({
											"Line": padZero(i+1,3) ,
											"Location" : (currExcelData[i][0] == null)? "" : currExcelData[i][0],
											"Component" : (currExcelData[i][1] == null)? "" : currExcelData[i][1],
											"Damage" : (currExcelData[i][2] == null)? "" : currExcelData[i][2],
											"Material" : (currExcelData[i][3] == null)? "" : currExcelData[i][3],
											"Repair" : (currExcelData[i][4] == null)? "" : currExcelData[i][4],
											"Rp. Length" : (currExcelData[i][5] == null)? "" : currExcelData[i][5],
											"Rp. Width" : (currExcelData[i][6] == null)? "" : currExcelData[i][6],
											"Qty" : (currExcelData[i][7] == null)? "" : currExcelData[i][7],
											"Lab.Hrs" : (currExcelData[i][8] == null)? "" : thousandsep(currExcelData[i][8]),
											"Material Cost" : (currExcelData[i][9] == null)? "" : currExcelData[i][9],
											"Bulletin" : (currExcelData[i][10] == null)? "" : currExcelData[i][10],
											"Responsibility" : (currExcelData[i][10] == null)? "" : currExcelData[i][11],
										});
										break loop1;
									}
								}
							}

							if(printExcelDataM.length != 0){
								printExcelDataM.push({
									"Line": "" ,
									"Location" : "",
									"Component" : "",
									"Damage" : "",
									"Material" : "",
									"Repair" : "",
									"Rp. Length" : "",
									"Rp. Width" : "",
									"Qty" : "",
									"Lab.Hrs" : thousandsep(totalLabHrs),
									"Material Cost" : thousandsep(totalMatCost),
									"Bulletin" : "",
									"Responsibility" : ""
								});
							}


									var depotForPrint = sap.ui.getCore().byId("idComboDepotRESearchJ").getSelectedKey();
									var serialForPrint = sap.ui.getCore().byId("idSerailNoRESearchJ").getValue();
									var fullDepotForPrint = sap.ui.getCore().byId("idComboDepotRESearchJ").getValue();
									var jobTypeForPrint = sap.ui.getCore().byId("idDdlJobTypeREEntryJ").getValue();
									var estimDateForPrint = sap.ui.getCore().byId("idDtPkrEstimateDtREEntryJ").getValue();
									var currencyCodeForPrint = sap.ui.getCore().byId("idTFCurrnCodeREEntryJ").getValue();
									var cwforprint = sap.ui.getCore().byId("idTFCWREEntryJ").getValue();

									var notes1forprint = sap.ui.getCore().byId("idTFNotes1REEntryJ").getValue();
									var notes2forprint = sap.ui.getCore().byId("idTFNotes2REEntryJ").getValue();
									var notes3forprint = sap.ui.getCore().byId("idTFNotes3REEntryJ").getValue();
									var notes4forprint = sap.ui.getCore().byId("idTFNotes4REEntryJ").getValue();
									var notes5forprint = sap.ui.getCore().byId("idTFNotes5REEntryJ").getValue();

									var tab =  oCurrent.makeHTMLTableLANew(
														  						 depotForPrint,
																					 serialForPrint,
																					 fullDepotForPrint,
																					 jobTypeForPrint,
																					 estimDateForPrint,
																					 currencyCodeForPrint,
																					 cwforprint,
																					 notes1forprint,
																					 notes2forprint,
																					 notes3forprint,
																					 notes4forprint,
																					 notes5forprint,
																					 printExcelDataC,
																					 printExcelDataM,
																					 "Repair Estimate Details",
																					 "print"
																 	  			);
							var newWin = window.open();
							newWin.document.write(tab);
							newWin.print();
						}
				 }).addStyleClass("submitBtn");

				 var oBtnExcelREEntry = new sap.m.Button("idBtnExcelREEntry",{
						 text : "Export To Excel",
						 type:sap.m.ButtonType.Unstyled,
						 icon: sap.ui.core.IconPool.getIconURI("excel-attachment"),
						 press:function(){
							 var printExcelDataC = [];
 							var currExcelData = oExcelGridJ1.getData();
 							var currLength = currExcelData.length;

 							for(var i =0; i < currLength; i++){
 								loop1 : for(var j =0; j < 12; j++){
 									if(currExcelData[i][j] != "" && currExcelData[i][j] != null){
 										printExcelDataC.push({
 											"Line": padZero(i+1,3) ,
 											"Location" : (currExcelData[i][0] == null)? "" : currExcelData[i][0],
 											"Component" : (currExcelData[i][1] == null)? "" : currExcelData[i][1],
 											"Damage" : (currExcelData[i][2] == null)? "" : currExcelData[i][2],
 											"Material" : (currExcelData[i][3] == null)? "" : currExcelData[i][3],
 											"Repair" : (currExcelData[i][4] == null)? "" : currExcelData[i][4],
 											"Rp. Length" : (currExcelData[i][5] == null)? "" : currExcelData[i][5],
 											"Rp. Width" : (currExcelData[i][6] == null)? "" : currExcelData[i][6],
 											"Qty" : (currExcelData[i][7] == null)? "" : currExcelData[i][7],
 											"Lab.Hrs" : (currExcelData[i][8] == null)? "" : currExcelData[i][8],
 											"Material Cost" : (currExcelData[i][9] == null)? "" : currExcelData[i][9],
 											"Bulletin" : (currExcelData[i][10] == null)? "" : currExcelData[i][10],
 											"Responsibility" : (currExcelData[i][10] == null)? "" : currExcelData[i][11],
 										});
 										break loop1;
 									}
 								}
 							}


 							var printExcelDataM = [];
 							var currExcelData = oExcelGridJ2.getData();
 							var currLength = currExcelData.length;

 							for(var i =0; i < currLength; i++){
 								loop1 : for(var j =0; j < 12; j++){
 									if(currExcelData[i][j] != "" && currExcelData[i][j] != null){
 										printExcelDataM.push({
 											"Line": padZero(i+1,3) ,
 											"Location" : (currExcelData[i][0] == null)? "" : currExcelData[i][0],
 											"Component" : (currExcelData[i][1] == null)? "" : currExcelData[i][1],
 											"Damage" : (currExcelData[i][2] == null)? "" : currExcelData[i][2],
 											"Material" : (currExcelData[i][3] == null)? "" : currExcelData[i][3],
 											"Repair" : (currExcelData[i][4] == null)? "" : currExcelData[i][4],
 											"Rp. Length" : (currExcelData[i][5] == null)? "" : currExcelData[i][5],
 											"Rp. Width" : (currExcelData[i][6] == null)? "" : currExcelData[i][6],
 											"Qty" : (currExcelData[i][7] == null)? "" : currExcelData[i][7],
 											"Lab.Hrs" : (currExcelData[i][8] == null)? "" : currExcelData[i][8],
 											"Material Cost" : (currExcelData[i][9] == null)? "" : currExcelData[i][9],
 											"Bulletin" : (currExcelData[i][10] == null)? "" : currExcelData[i][10],
 											"Responsibility" : (currExcelData[i][10] == null)? "" : currExcelData[i][11],
 										});
 										break loop1;
 									}
 								}
 							}


 									var depotForPrint = sap.ui.getCore().byId("idComboDepotRESearchJ").getSelectedKey();
 									var serialForPrint = sap.ui.getCore().byId("idSerailNoRESearchJ").getValue();
 									var fullDepotForPrint = sap.ui.getCore().byId("idComboDepotRESearchJ").getValue();
 									var jobTypeForPrint = sap.ui.getCore().byId("idDdlJobTypeREEntryJ").getValue();
 									var estimDateForPrint = sap.ui.getCore().byId("idDtPkrEstimateDtREEntryJ").getValue();
 									var currencyCodeForPrint = sap.ui.getCore().byId("idTFCurrnCodeREEntryJ").getValue();
									var cwforprint = sap.ui.getCore().byId("idTFCWREEntryJ").getValue();

									var notes1forprint = sap.ui.getCore().byId("idTFNotes1REEntryJ").getValue();
									var notes2forprint = sap.ui.getCore().byId("idTFNotes2REEntryJ").getValue();
									var notes3forprint = sap.ui.getCore().byId("idTFNotes3REEntryJ").getValue();
									var notes4forprint = sap.ui.getCore().byId("idTFNotes4REEntryJ").getValue();
									var notes5forprint = sap.ui.getCore().byId("idTFNotes5REEntryJ").getValue();
									var tab =  oCurrent.makeHTMLTableLANew( depotForPrint,
																		 serialForPrint,
																		 fullDepotForPrint,
																		 jobTypeForPrint,
																		 estimDateForPrint,
																		 currencyCodeForPrint,
																		 cwforprint,
																		 notes1forprint,
																		 notes2forprint,
																		 notes3forprint,
																		 notes4forprint,
																		 notes5forprint,
																		 printExcelDataC,
																		 printExcelDataM,
																		 "Repair Estimate Details",
																		 "excel");
//			        	  var newWin = window.open('', '', "height=500,width=1000");
//			        	  newWin.document.write(tab);
//			        	  newWin.print();
						 }
					}).addStyleClass("submitBtn");

					// MACALPHA19032018_9

				var oBtnSaveEstimatesREEntryJ = new sap.m.Button("idBtnSaveEstimatesREEntryJ",{
					text : "Save Estimates",
					//width:"120px",
					styled:false,
					//layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
					press:function(){
						clickEvent = "save";
						var valid = true;
						if(sap.ui.getCore().byId("idDdlUnitPCodeREEntryJ").getValue() == ''){
							valid = false;
							sap.ui.getCore().byId("idDdlUnitPCodeREEntryJ").setValueState(sap.ui.core.ValueState.Error);
							sap.ui.getCore().byId("idDdlUnitPCodeREEntryJ").setPlaceholder("Select Unit Part Code");
						}

						if(sap.ui.getCore().byId("idDdlJobTypeREEntryJ").getValue() == ''){
							valid = false;
							sap.ui.getCore().byId("idDdlJobTypeREEntryJ").setValueState(sap.ui.core.ValueState.Error);
							sap.ui.getCore().byId("idDdlJobTypeREEntryJ").setPlaceholder("Select Job Type");
						}

						if(sap.ui.getCore().byId("idDtPkrEstimateDtREEntryJ").getValue() == ''){
							valid = false;
							sap.ui.getCore().byId("idDtPkrEstimateDtREEntryJ").setValueState(sap.ui.core.ValueState.Error);
							sap.ui.getCore().byId("idDtPkrEstimateDtREEntryJ").setPlaceholder("Estimate Date");
						}

						// MACALPHA19032018_3+
						/*if(sap.ui.getCore().byId("idTFCWREEntryJ").getValue() == ''){
							valid = false;
							sap.ui.getCore().byId("idTFCWREEntryJ").setValueState(sap.ui.core.ValueState.Error);
							sap.ui.getCore().byId("idTFCWREEntryJ").setPlaceholder("Cargo Worthy");
						}*/
						// MACALPHA19032018_3+
						if(!valid){
							return;
						}
						objcurntREEntryJ.saveRepairEstimateFromExcelNew();	// MACALPHA19032018_8
						//objcurntREEntryJ.saveRepairEstimateFromExcel("M");
					}}).addStyleClass("submitBtn");

				var oBtnClearMessagesREEntryJ = new sap.m.Button("idBtnClearMessagesREEntryJ",{
					text : "Show/Hide Error Messages",
					//width:"180px",
					styled:false,
					//layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
					press:function(){
						if(sap.ui.getCore().byId("idRRRepairEstimJ") != undefined){
							if(sap.ui.getCore().byId("idRRRepairEstimJ").getVisible() == true)
								sap.ui.getCore().byId("idRRRepairEstimJ").setVisible(false);
							else
								sap.ui.getCore().byId("idRRRepairEstimJ").setVisible(true);
						}

						if(sap.ui.getCore().byId("idErrorTableRepJ") != undefined)
							if(sap.ui.getCore().byId("idErrorTableRepJ").getVisible() == true)
								sap.ui.getCore().byId("idErrorTableRepJ").setVisible(false);
							else
								sap.ui.getCore().byId("idErrorTableRepJ").setVisible(true);
					}}).addStyleClass("submitBtn");


			 // Flex Box
		    	var oFlxBtnSubmitBtnREEntryJ = new sap.m.FlexBox({
		    	      items: [oBtnBackUnitSelREEntryJ,new sap.ui.commons.Label( {text: " ",width : '8px'}),
												oBtnSaveEstimatesREEntryJ,new sap.ui.commons.Label( {text: " ",width : '8px'}),
												oBtnSubmitREEntryJ, new sap.ui.commons.Label( {text: " ",width : '8px'}),
		    	              oBtnClearMessagesREEntryJ, new sap.ui.commons.Label( {text: " ",width : '8px'}),
												oBtnPrintREEntry, new sap.ui.commons.Label( {text: " ",width : '8px'}),	// MACALPHA19032018_9
												oBtnExcelREEntry	// MACALPHA19032018_9
												],
		    	      direction: "Row",
					  layoutData: new sap.ui.layout.GridData({span: "L12 M12 S12",linebreak: true, margin: false}),
		    	    });

				 frmFirsRowREEntryJ = new sap.ui.layout.form.FormElement({
				    fields: [oFlxBtnSubmitBtnREEntryJ]
				});
				oFrmCntnrREEntryJ.addFormElement(frmFirsRowREEntryJ);
				var olblSuccessMsgREE = new sap.ui.commons.Label({
					id: "idlblSuccessMsgREEJ",
					visible: false,
					layoutData: new sap.ui.layout.GridData({span: "L12 M12 S12",linebreak: false, margin: true}),
					wrapping: true}).addStyleClass("marginTop7");
				olblSuccessMsgREE.setText("");

		frmFirsRowREEntryJ = new sap.ui.layout.form.FormElement({
				    fields: [olblSuccessMsgREE]
				});
				oFrmCntnrREEntryJ.addFormElement(frmFirsRowREEntryJ);
	},

	backToUnitSelction: function(sResult){
		if(sResult == "YES"){
			clickEvent = "save";
			var valid = true;
			if(sap.ui.getCore().byId("idDdlUnitPCodeREEntryJ").getValue() == ''){
				valid = false;
				sap.ui.getCore().byId("idDdlUnitPCodeREEntryJ").setValueState(sap.ui.core.ValueState.Error);
				sap.ui.getCore().byId("idDdlUnitPCodeREEntryJ").setPlaceholder("Select Unit Part Code");
			}

			if(sap.ui.getCore().byId("idDdlJobTypeREEntryJ").getValue() == ''){
				valid = false;
				sap.ui.getCore().byId("idDdlJobTypeREEntryJ").setValueState(sap.ui.core.ValueState.Error);
				sap.ui.getCore().byId("idDdlJobTypeREEntryJ").setPlaceholder("Select Job Type");
			}

			if(sap.ui.getCore().byId("idDtPkrEstimateDtREEntryJ").getValue() == ''){
				valid = false;
				sap.ui.getCore().byId("idDtPkrEstimateDtREEntryJ").setValueState(sap.ui.core.ValueState.Error);
				sap.ui.getCore().byId("idDtPkrEstimateDtREEntryJ").setPlaceholder("Estimate Date");
			}

			// MACALPHA19032018_3+
			/*
			if(sap.ui.getCore().byId("idTFCWREEntryJ").getValue() == ''){
				valid = false;
				sap.ui.getCore().byId("idTFCWREEntryJ").setValueState(sap.ui.core.ValueState.Error);
				sap.ui.getCore().byId("idTFCWREEntryJ").setPlaceholder("Cargo Worthy");
			}

			if(sap.ui.getCore().byId("idTFNotes1REEntryJ").getValue() == ''){
				valid = false;
				sap.ui.getCore().byId("idTFNotes1REEntryJ").setValueState(sap.ui.core.ValueState.Error);
				sap.ui.getCore().byId("idTFNotes1REEntryJ").setPlaceholder("SCR Limit");
			}
			*/
			// MACALPHA19032018_3+
			if(!valid){
				return;
			}
			objcurntREEntryJ.saveRepairEstimateFromExcelNew();	// MACALPHA19032018_8
			//objcurntREEntryJ.saveRepairEstimateFromExcel("M");
			sap.ui.controller("view.RepairEstimateEntryJVw").navButtonPress();
			//sap.ui.getCore().byId("idTblLoadSaveDataRESearchJ").setVisible(false);
			//sap.ui.getCore().byId("idTblLoadSaveDataRESearchJHeader").setVisible(false);
		}else if(sResult == "NO"){
			//clickEvent = "save";
			//objcurntREEntryJ.saveRepairEstimateFromExcel();
			sap.ui.controller("view.RepairEstimateEntryJVw").navButtonPress();
			//sap.ui.getCore().byId("idTblLoadSaveDataRESearchJ").setVisible(false);
			//sap.ui.getCore().byId("idTblLoadSaveDataRESearchJHeader").setVisible(false);
		}
	},

	saveRepairEstimate: function(){
		saveLineItemREEntryJ.length = 0;
		for(var i=0; i<jsnLineItemREEntryJ.length; i++){
		if((jsnLineItemREEntryJ[i].LocationKey != '') ||
			(jsnLineItemREEntryJ[i].ComponentKey != '') ||
			(jsnLineItemREEntryJ[i].DamageKey != '') ||
			(jsnLineItemREEntryJ[i].MaterialKey != '') ||
			(jsnLineItemREEntryJ[i].RepairKey != '') ||
			(jsnLineItemREEntryJ[i].RepairLength != '') ||
			(jsnLineItemREEntryJ[i].RepairWidth != '') ||
			(jsnLineItemREEntryJ[i].Quantity != '') ||
			(jsnLineItemREEntryJ[i].ManHours != '') ||
			(jsnLineItemREEntryJ[i].MaterialCost != '') ||
			(jsnLineItemREEntryJ[i].LabourRate != '') ||
			(jsnLineItemREEntryJ[i].TechBulletin != '') ||
			(jsnLineItemREEntryJ[i].ResponsibilityKey != '')){
				saveLineItemREEntryJ.push({
					"checked":jsnLineItemREEntryJ[i].checked,
					"LineItem":jsnLineItemREEntryJ[i].LineItem,
					"sectionKey":jsnLineItemREEntryJ[i].sectionKey,
					"sectionText":jsnLineItemREEntryJ[i].sectionText,
					"LocationKey":jsnLineItemREEntryJ[i].LocationKey,
					"LocationText":jsnLineItemREEntryJ[i].LocationText,
					"ComponentKey":jsnLineItemREEntryJ[i].ComponentKey,
					"ComponentText":jsnLineItemREEntryJ[i].ComponentText,
					"DamageKey":jsnLineItemREEntryJ[i].DamageKey,
					"DamageText":jsnLineItemREEntryJ[i].DamageText,
					"RepairKey":jsnLineItemREEntryJ[i].RepairKey,
					"RepairText":jsnLineItemREEntryJ[i].RepairText,
					"MaterialKey":jsnLineItemREEntryJ[i].MaterialKey,
					"MaterialText":jsnLineItemREEntryJ[i].MaterialText,
					"MaterialCost":jsnLineItemREEntryJ[i].MaterialCost,
					"ManHours":jsnLineItemREEntryJ[i].ManHours,
					"RepairLength":jsnLineItemREEntryJ[i].RepairLength,
					"RepairWidth":jsnLineItemREEntryJ[i].RepairWidth,
					"Quantity":jsnLineItemREEntryJ[i].Quantity,
					"ResponsibilityKey":jsnLineItemREEntryJ[i].ResponsibilityKey,
					"ResponsibilityText":jsnLineItemREEntryJ[i].ResponsibilityText,
					"LabourRate":jsnLineItemREEntryJ[i].LabourRate,
					"TechBulletin":jsnLineItemREEntryJ[i].TechBulletin,
					"DataInserted":jsnLineItemREEntryJ[i].DataInserted,
					"savestatus": false
				});
			}
		}
		objREstimateOnlineJ.onlinefunEstimateSave(selEstmtId,'X');
	},











	saveRepairEstimateFromExcel: function(part){
		var isJs = true;
		var excelDataJX = [];
		var totIter = 0;
		var cpart = "C";

		/*if(part == "C"){
			excelDataJX = excelDataJ1;
		}else if(part == "M"){
			excelDataJX = excelDataJ2;
		}else if(part == "B"){
			excelDataJX = excelDataJ2;
		}*/
		saveLineItemREEntryJ.length = 0;
		/*for(var i=0; i<2; i++){
			if(i == 0){
				excelDataJX = excelDataJ1;
				cpart = "C";
			}else if(i == 1){
				excelDataJX = excelDataJ2;
				cpart = "M";
			}*/

			if(part == "C"){
			excelDataJX = excelDataJ1;
			cpart = "C";

//			if(sap.ui.getCore().byId("idDdlJobTypeREEntryJ").getSelectedKey() == "Joint Survey"){
//				isJs = true;
//			}
			isJs = true;
			var isEmpty = false;
			//var isJV = false;	// MACALPHA19032018_6
			var lineItem = null;
			var j = 0;

			var datainsert = false;
			for(var i =0; i < excelDataJX.length;i++){
				totIter = totIter + 1;
				j = 0;
	 			datainsert = false;
	 			while(j<12){
	 				if(excelDataJX[i][j] != "" && excelDataJX[i][j] != null){
	 					datainsert = true;
	 					break;
	 				}
	 				j++;
	 			}
	 			if(datainsert){
					// MACALPHA19032018_6-
	 				/*if(excelDataJX[i][11].substring(0,1).toUpperCase() == 'J' || excelDataJX[i][11].substring(0,1).toUpperCase() == 'V'){
	 					isJV = true;
	 				}*/

	 				if(excelDataJX[i][0] == '' || excelDataJX[i][1] == '' || excelDataJX[i][2] == '' || excelDataJX[i][4] == '' || excelDataJX[i][8] == '' || excelDataJX[i][11] == '' || excelDataJX[i][11] == '' ||
	 						excelDataJX[i][0] == null || excelDataJX[i][1] == null || excelDataJX[i][2] == null || excelDataJX[i][4] == null || excelDataJX[i][8] == null || excelDataJX[i][9] == null ||  excelDataJX[i][11] == null){
	 					isEmpty = true;
	 				}
	 				if(isEmpty == false){
	 				lineItem = padZero((totIter),4);
	 				saveLineItemREEntryJ.push({
						"checked":false,
						"LineItem":lineItem,
						"sectionKey":'',
						"sectionText":'',
						"LocationKey":excelDataJX[i][0].toUpperCase(),
						"LocationText":'',
						"ComponentKey":excelDataJX[i][1].toUpperCase(),
						"ComponentText":'',
						"DamageKey":excelDataJX[i][2].toUpperCase(),
						"DamageText":'',
						"RepairKey":excelDataJX[i][4].toUpperCase(),
						"RepairText":'',
						"MaterialKey":(excelDataJX[i][3] == null)? "" : excelDataJX[i][3].toUpperCase(),
						"MaterialText":'',
						"MaterialCost":excelDataJX[i][9],
						"ManHours":excelDataJX[i][8],
						"RepairLength":(excelDataJX[i][5] == null)? "" : excelDataJX[i][5],
						"RepairWidth":(excelDataJX[i][6] == null)? "" : excelDataJX[i][6],
						"Quantity":(excelDataJX[i][7] == null)? "" : excelDataJX[i][7],
						"ResponsibilityKey":excelDataJX[i][11].substring(0,1).toUpperCase(),
						"ResponsibilityText":'',
						"LabourRate":'',
						"TechBulletin":(excelDataJX[i][10] == null)? "" : excelDataJX[i][10].toUpperCase(),
						"DataInserted":true,
						"savestatus": false,
						"Cpart": cpart
					});
	 				}
	 			}
	 		}



			}else if(part == "M"){


			excelDataJX = excelDataJ2;
			cpart = "M";

//			if(sap.ui.getCore().byId("idDdlJobTypeREEntryJ").getSelectedKey() == "Joint Survey"){
//				isJs = true;
//			}
			isJs = true;
			var isEmpty = false;
			// var isJV = false; // MACALPHA19032018_6-
			var lineItem = null;
			var j = 0;

			var datainsert = false;
			for(var i =0; i < excelDataJX.length;i++){
				totIter = totIter + 1;
				j = 0;
	 			datainsert = false;
	 			while(j<12){
	 				if(excelDataJX[i][j] != "" && excelDataJX[i][j] != null){
	 					datainsert = true;
	 					break;
	 				}
	 				j++;
	 			}
	 			if(datainsert){
	 				// MACALPHA19032018_6-
					/*if(excelDataJX[i][11].substring(0,1).toUpperCase() == 'J' || excelDataJX[i][11].substring(0,1).toUpperCase() == 'V'){
	 					isJV = true;
	 				}*/

	 				if(excelDataJX[i][0] == '' || excelDataJX[i][1] == '' || excelDataJX[i][2] == '' || excelDataJX[i][4] == '' || excelDataJX[i][8] == '' || excelDataJX[i][11] == '' || excelDataJX[i][11] == '' ||
	 						excelDataJX[i][0] == null || excelDataJX[i][1] == null || excelDataJX[i][2] == null || excelDataJX[i][4] == null || excelDataJX[i][8] == null || excelDataJX[i][9] == null ||  excelDataJX[i][11] == null){
	 					isEmpty = true;
	 				}
	 				if(isEmpty == false){
	 				lineItem = padZero((totIter),4);
	 				saveLineItemREEntryJ.push({
						"checked":false,
						"LineItem":lineItem,
						"sectionKey":'',
						"sectionText":'',
						"LocationKey":excelDataJX[i][0].toUpperCase(),
						"LocationText":'',
						"ComponentKey":excelDataJX[i][1].toUpperCase(),
						"ComponentText":'',
						"DamageKey":excelDataJX[i][2].toUpperCase(),
						"DamageText":'',
						"RepairKey":excelDataJX[i][4].toUpperCase(),
						"RepairText":'',
						"MaterialKey":(excelDataJX[i][3] == null)? "" : excelDataJX[i][3].toUpperCase(),
						"MaterialText":'',
						"MaterialCost":excelDataJX[i][9],
						"ManHours":excelDataJX[i][8],
						"RepairLength":(excelDataJX[i][5] == null)? "" : excelDataJX[i][5],
						"RepairWidth":(excelDataJX[i][6] == null)? "" : excelDataJX[i][6],
						"Quantity":(excelDataJX[i][7] == null)? "" : excelDataJX[i][7],
						"ResponsibilityKey":excelDataJX[i][11].substring(0,1).toUpperCase(),
						"ResponsibilityText":'',
						"LabourRate":'',
						"TechBulletin":(excelDataJX[i][10] == null)? "" : excelDataJX[i][10].toUpperCase(),
						"DataInserted":true,
						"savestatus": false,
						"Cpart": cpart
					});
	 				}
	 			}
	 		}

			}

		//}
		// MACALPHA19032018_6-
		/*if(isJV == true && isJs == false){
			sap.ui.commons.MessageBox.alert("Resp. Codes J and V can only be entered for Joint Survey ");
		}else
		*/
		if(isEmpty == true){
			sap.ui.commons.MessageBox.alert("Lab. Hrs, Material Cost, Location, Component, Damage, Repair & Responsibility cannot be blank. Please fill them up");
		}else{
			objREstimateOnlineJ.onlinefunEstimateSave(selEstmtId,'X', part);
		}

	},

	//FILL DROP DOWN LOCATION
	onlinesuccessfunLocation: function(resultdata, response){
		var msg ='';
		busyDialog.close();

		if(resultdata != undefined){
			if(resultdata.results.length > 0){
				var oidDdlLocationREEntryJ = sap.ui.getCore().byId("idDdlLocationREEntryJ");
				oidDdlLocationREEntryJ.insertItem(new sap.ui.core.ListItem({text:"",key:""}),0);
				for(var inx in resultdata.results){
					oidDdlLocationREEntryJ.addItem(new sap.ui.core.ListItem({
					text:resultdata.results[inx].Kurztext
					,key:resultdata.results[inx].Param2}));
				}
			}
		}
	},

	onlineerrorfunLocation: function(err){
		errorfromServer(err);
	},

	onlinefunLocation: function(secId){
		try{
			busyDialog.open();
			var urlToCall = serviceUrl15_old + "/Repair_F4_Locgcode?";
				urlToCall += "$filter=ISection eq '"+ secId +"'";

		    objUtilREstimate.doOnlineRequest(urlToCall,objcurntREEntryJ.onlinesuccessfunLocation, objcurntREEntryJ.onlineerrorfunLocation);
		}catch(e){
			busyDialog.close();
			sap.ui.commons.MessageBox.alert("Error on fetching Location data " + e);
		}
	},

	onlinefunLocationNew: function(secId){
		var oidDdlLocationREEntryJ = sap.ui.getCore().byId("idDdlLocationREEntryJ");
		oidDdlLocationREEntryJ.insertItem(new sap.ui.core.ListItem({text:"",key:""}),0);
		var locationLength = locationCodes.length;
		for(var i=0; i<locationLength; i++){
			if(locationCodes[i].locKey.substr(0,1) == secId){
				oidDdlLocationREEntryJ.addItem(new sap.ui.core.ListItem({
					text:locationCodes[i].location,
					key:locationCodes[i].locKey}));
			}
		}
	},

	onlinefunComponentNew: function(secId){
		var oidDdlComponentREEntryJ = sap.ui.getCore().byId("idDdlComponentREEntryJ");
		oidDdlComponentREEntryJ.insertItem(new sap.ui.core.ListItem({text:"",key:""}),0);
		var componentLength = componentCodes.length;
		for(var i=0; i<componentLength; i++){
				oidDdlComponentREEntryJ.addItem(new sap.ui.core.ListItem({
					text:componentCodes[i].component,
					key:componentCodes[i].comKey}));
		}
	},

	onlinefunMatrialCodeNew: function(){
		var oidDdlMaterialREEntryJ = sap.ui.getCore().byId("idDdlMaterialREEntryJ");
		oidDdlMaterialREEntryJ.insertItem(new sap.ui.core.ListItem({text:"",key:""}),0);
		var materialLength = materialCodes.length;
		for(var i=0; i<materialLength; i++){
				oidDdlMaterialREEntryJ.addItem(new sap.ui.core.ListItem({
					text:materialCodes[i].material,
					key:materialCodes[i].matKey}));
		}
	},

	//FILL DROP DOWN COMPONENT
	onlinesuccessfunComponent: function(resultdata, response){
		busyDialog.close();
		if(resultdata != undefined){
			if(resultdata.results.length > 0){
				var oidDdlComponentREEntryJ = sap.ui.getCore().byId("idDdlComponentREEntryJ");
				oidDdlComponentREEntryJ.insertItem(new sap.ui.core.ListItem({text:"",key:""}),0);
				for(var inx in resultdata.results){
					oidDdlComponentREEntryJ.addItem(new sap.ui.core.ListItem({
					text:resultdata.results[inx].Kurztext
					,key:resultdata.results[inx].Param2}));
				}
			}
		}
	},

	onlineerrorfunComponent: function(err){
		errorfromServer(err);
	},

	onlinefunComponent: function(locId){
		try{
			busyDialog.open();
			var urlToCall = serviceUrl15_old + "/Repair_F4_Compcode?";
				urlToCall += "$filter=ILocCd eq '"+ locId +"'";

		    objUtilREstimate.doOnlineRequest(urlToCall,objcurntREEntryJ.onlinesuccessfunComponent, objcurntREEntryJ.onlineerrorfunComponent);
		}catch(e){
			busyDialog.close();
			sap.ui.commons.MessageBox.alert("Error on fetching Component data " + e);
		}
	},

	//FILL DROP DOWN REPAIR
	onlinesuccessfunRepair: function(resultdata, response){
		busyDialog.close();
		if(resultdata != undefined){
			if(resultdata.results.length > 0){
				var oidDdlRepairREEntryJ = sap.ui.getCore().byId("idDdlRepairREEntryJ");
				oidDdlRepairREEntryJ.insertItem(new sap.ui.core.ListItem({text:"",key:""}),0);
				for(var inx in resultdata.results){
					oidDdlRepairREEntryJ.addItem(new sap.ui.core.ListItem({
					text:resultdata.results[inx].Kurztext
					,key:resultdata.results[inx].Param2}));
				}
			}
		}
	},

	onlineerrorfunRepair: function(err){
		errorfromServer(err);
	},

	onlinefunRepair: function(damageId){
		try{
			busyDialog.open();
			var urlToCall = serviceUrl15_old + "/Repair_F4_Repaircode?";
				urlToCall += "$filter=IDamagecd eq '"+ damageId +"'";

		    objUtilREstimate.doOnlineRequest(urlToCall,objcurntREEntryJ.onlinesuccessfunRepair, objcurntREEntryJ.onlineerrorfunRepair);
		}catch(e){
			busyDialog.close();
			sap.ui.commons.MessageBox.alert("Error on fetching Repair data " + e);
		}
	},

	onlinefunRepairNew: function(damageId){
		var oidDdlRepairREEntryJ = sap.ui.getCore().byId("idDdlRepairREEntryJ");
		oidDdlRepairREEntryJ.insertItem(new sap.ui.core.ListItem({text:"",key:""}),0);

		var repdamLength = repdamCodes.length;
		for(var i=0; i<repdamLength; i++){
			if(repdamCodes[i].damKey == damageId){
				oidDdlRepairREEntryJ.addItem(new sap.ui.core.ListItem({
					text:repdamCodes[i].rep,
					key:repdamCodes[i].repKey}));
			}
		}

	},




	excelNavigation : function(keyEvent) {

	    switch (keyEvent.keyCode) {

			    case 13: // Enter
			     var id = this.getId();
			     var col = parseInt(id.substring(id.indexOf("-col") + 4, id.length),10);
			     var newCol = col + 1;
			     if(newCol == 14){
			    	 objcurntREEntryJ.cellMoveNew("next", id, newCol);
			     }
			     else{
			    	 objcurntREEntryJ.cellMoveNew("right", id, newCol);
			     }


		        break;

	    		/*case 9: // Tab



       	 		objcurntREEntryJ.cellMove("right", this.getId());

       	 		break;

	    		case 37: // Left



	       	 		objcurntREEntryJ.cellMove("left", this.getId());

	       	 		break;

	    		case 39: // Right



	       	 		objcurntREEntryJ.cellMove("right", this.getId());

	       	 		break;



	           case 38: // Up arrow


	        	   objcurntREEntryJ.cellMove("up", this.getId());


	                   break;





	            case 40: // Down arrow


	            	objcurntREEntryJ.cellMove("down", this.getId());


	               break;*/


	     }


	   },

		cellMoveNew : function(direction, id, newCol) {

		var newId = null;
		var finalId = null;
		switch (direction) {
	    case "right":
	    newId  = objcurntREEntryJ.buildIdRight(id, newCol);
	    break;
	    case "next":
	    newId  = objcurntREEntryJ.buildIdDown(id, newCol);
	    break;
		}

		finalId = objcurntREEntryJ.replaceNew(newId);

		try {

	    	 $('#' + finalId).focus();
	     }
	     catch (ignore)
	     {

	     }

		},

		replaceNew : function(newId){
		var partId = newId.substring(0,4);
		switch (partId) {
	    case "idLc":
	    partId = "idCc";
	    break;
	    case "idCc":
		    partId = "idDc";
		    break;
	    case "idDc":
		    partId = "idMk";
		    break;
	    case "idMk":
		    partId = "idRc";
		    break;
	    case "idRc":
		    partId = "idRl";
		    break;
	    case "idRl":
		    partId = "idRw";
		    break;
	    case "idRw":
		    partId = "idQu";
		    break;
	    case "idQu":
		    partId = "idMh";
		    break;
	    case "idMh":
		    partId = "idMc";
		    break;
	    case "idMc":
		    partId = "idLr";
		    break;
	    case "idLr":
		    partId = "idTb";
		    break;
	    case "idTb":
		    partId = "idLc";
		    break;
		}
		partId = partId + newId.substring(4, newId.length);
		return partId;
		},

		buildIdDown : function(id, newCol){
			var newId = id;
			var row = parseInt(id.substring(id.indexOf("-row") + 4, id.length),10);
			row = row + 1;
			newId = newId.substring(0, (newId.indexOf("-col") + 4)) + 2 + newId.substring(newId.indexOf("-row"), (newId.indexOf("-row") + 4)) + row;   // Column
			return newId;
		},

		buildIdRight : function(id, newCol){
			var newId = id;
			newId = newId.substring(0, (newId.indexOf("-col") + 4)) + newCol + newId.substring(newId.indexOf("-row"), newId.length);   // Column
			return newId;
		},

	  buildId : function(id, field, row, column, newField, nextRow){

      var newId = id;

      /*if (typeof field !== "undefined") {
      newId = newId.substring(0,newId.indexOf("field") + 5) + field +
      newId.substring(newId.indexOf("-col"),newId.length);   // Field
      }

      if (typeof row   !== "undefined") {
        newId = newId.substring(0,newId.indexOf("row") + 3) + row; // Row
      }*/

      if (typeof nextRow !== "undefined") {
    	if(newField < 11)
       newId = newId.substring(0,newId.indexOf("field") + 5) + 0 + newId.substring(newId.indexOf("-col"), 12) + column + newId.substring(newId.indexOf("-row"), newId.length);   // Column
    	else
    		newId = newId.substring(0,newId.indexOf("field") + 5) + 0 + newId.substring(newId.indexOf("-col"), 13) + column + newId.substring(newId.indexOf("-row"), newId.length);   // Column
      }

       if (typeof column !== "undefined") {

       if(newField < 11)
       newId = newId.substring(0,newId.indexOf("field") + 5) + newField + newId.substring(newId.indexOf("-col"), 12) + column + newId.substring(newId.indexOf("-row"), newId.length);   // Column
	   else
	   newId = newId.substring(0,newId.indexOf("field") + 5) + newField + newId.substring(newId.indexOf("-col"), 13) + column + newId.substring(newId.indexOf("-row"), newId.length);   // Column
       }

       return newId;
	   },


	extractRowCount : function(id) {
	    return parseInt(id.substring(id.indexOf("-row") + 4, id.length),10);
	},

	extractColCount : function(id) {
        return parseInt(id.substring(id.indexOf("-col") + 4, id.length),10);
	},

	cellMove : function(direction, id,ind) {


	    var newRow, newId, newCol, newField, nextRow;

	    switch (direction) {
	    case "right":
	        	 newCol =	objcurntREEntryJ.extractColCount(id) + 1;
	        	 newRow = 	objcurntREEntryJ.extractRowCount(id) + 1;
	        	 newField =  parseInt(id.substring(id.indexOf("field") + 5, id.indexOf("-col")),10) + 1;
	        	 if(newCol != 14){
	        		 nextRow = newRow;
	        		 newId  = objcurntREEntryJ.buildId(id, undefined, undefined, newCol, newField, undefined);
	        	 }
	        	 else{
	        		 nextRow = newRow + 1;
	        		 newId  = objcurntREEntryJ.buildId(id, undefined, undefined, 2, 		0, nextRow);
	        	 }
	        	 break;
	    case "left":
       	 		newCol =	objcurntREEntryJ.extractColCount(id) - 1;
       	 		newField = newCol - 2;
       	 		newId  = objcurntREEntryJ.buildId(id, undefined, undefined, newCol, newField);
       	 		break;
	    case "up":
	            newRow =	objcurntREEntryJ.extractRowCount(id) - 1;
	            newId  = objcurntREEntryJ.buildId(id, undefined, newRow, undefined, undefined);
	            break;
	    case "down":
	            newRow =	objcurntREEntryJ.extractRowCount(id) + 1;
	            newId  = objcurntREEntryJ.buildId(id, undefined, newRow, undefined, undefined);
	            break;
	    default:
	            return;
	       }



	     try {

	    	 $('#' + newId).focus();
	     }
	     catch (ignore)
	     {

	     }
	     },

	     insertRowLineItemIntoExcel: function(){
	    	var dataInsd = false;
	    	var currExcelData = oExcelGrid.getData();
	 		var oTblLineItemREEntryJ = sap.ui.getCore().byId("idTblLineItemREEntryJ");
	 		var oidDdlSectionREEntryJ = sap.ui.getCore().byId("idDdlSectionREEntryJ");
	 		var oidDdlLocationREEntryJ = sap.ui.getCore().byId("idDdlLocationREEntryJ");
	 		var oidDdlComponentREEntryJ = sap.ui.getCore().byId("idDdlComponentREEntryJ");
	 		var oidDdlDamageREEntryJ = sap.ui.getCore().byId("idDdlDamageREEntryJ");
	 		var oidDdlRepairREEntryJ = sap.ui.getCore().byId("idDdlRepairREEntryJ");
	 		var oidDdlMaterialCodeREEntryJ = sap.ui.getCore().byId("idDdlMaterialCodeREEntryJ");
	 		var oidTFMaterialCostREEntryJ = sap.ui.getCore().byId("idTFMaterialCostREEntryJ");
	 		var oidTFManHoursREEntryJ = sap.ui.getCore().byId("idTFManHoursREEntryJ");
	 		var oidTFRepairLengthREEntryJ = sap.ui.getCore().byId("idTFRepairLengthREEntryJ");
	 		var oidTFRepairWidthREEntryJ = sap.ui.getCore().byId("idTFRepairWidthREEntryJ");
	 		var oidTFQuantityREEntryJ = sap.ui.getCore().byId("idTFQuantityREEntryJ");
	 		var oidDdlResponsibilityREEntryJ = sap.ui.getCore().byId("idDdlResponsibilityREEntryJ");
	 		var oidTFLabourRateREEntryJ = sap.ui.getCore().byId("idTFLabourRateREEntryJ");
	 		var oidTFTechBulletinREEntryJ = sap.ui.getCore().byId("idTFTechBulletinREEntryJ");
	 		var dataupdate = true;
	 		var currLength = currExcelData.length;
	 		loop1:
	 		for(var i =0; i < currLength; i++){
	 			dataupdate = true;
	 			loop2:
	 			for(var j =0; j < 12; j++){
	 				if(currExcelData[i][j] != "" && currExcelData[i][j] != null){
	 					dataupdate = false;
	 					break loop2;
	 				}
	 			}
	 			if(dataupdate){
	 	 			excelData[i][0] = oidDdlLocationREEntryJ.getSelectedKey();
	 	 			excelData[i][1] = oidDdlComponentREEntryJ.getSelectedKey();
	 	 			excelData[i][2] = oidDdlDamageREEntryJ.getSelectedKey();
	 	 			excelData[i][3] = oidDdlMaterialCodeREEntryJ.getSelectedKey();
	 	 			excelData[i][4] = oidDdlRepairREEntryJ.getSelectedKey();
	 	 			excelData[i][5] = oidTFRepairLengthREEntryJ.getValue();
	 	 			excelData[i][6] = oidTFRepairWidthREEntryJ.getValue();
	 	 			excelData[i][7] = oidTFQuantityREEntryJ.getValue();
	 	 			excelData[i][8] = oidTFManHoursREEntryJ.getValue();
	 	 			excelData[i][9] = oidTFMaterialCostREEntryJ.getValue();
	 	 			//excelData[i][10] = oidTFLabourRateREEntryJ.getValue();
	 	 			excelData[i][10] = oidTFTechBulletinREEntryJ.getValue();
	 	 			excelData[i][11] = oidDdlResponsibilityREEntryJ.getSelectedKey();
	 	 			dataInsd = true;
	 				break loop1;
	 			}
	 		}

 			if(!dataInsd){
 				excelData.push([]);
 				var currLength1 = excelData.length;
 				currLength1 = currLength1 - 1;
 	 			excelData[currLength1][0] = oidDdlLocationREEntryJ.getSelectedKey();
 	 			excelData[currLength1][1] = oidDdlComponentREEntryJ.getSelectedKey();
 	 			excelData[currLength1][2] = oidDdlDamageREEntryJ.getSelectedKey();
 	 			excelData[currLength1][3] = oidDdlMaterialCodeREEntryJ.getSelectedKey();
 	 			excelData[currLength1][4] = oidDdlRepairREEntryJ.getSelectedKey();
 	 			excelData[currLength1][5] = oidTFRepairLengthREEntryJ.getValue();
 	 			excelData[currLength1][6] = oidTFRepairWidthREEntryJ.getValue();
 	 			excelData[currLength1][7] = oidTFQuantityREEntryJ.getValue();
 	 			excelData[currLength1][8] = oidTFManHoursREEntryJ.getValue();
 	 			excelData[currLength1][9] = oidTFMaterialCostREEntryJ.getValue();
 	 			excelData[currLength1][10] = oidTFLabourRateREEntryJ.getValue();
 	 			//excelData[currLength1][11] = oidTFTechBulletinREEntryJ.getValue();
 	 			excelData[currLength1][11] = oidDdlResponsibilityREEntryJ.getSelectedKey();
 			}


	 		oExcelGrid.render();

	 	},

		// MACALPHA19032018_9 New function for print and excel download

		makeHTMLTableLANew : function(
			depotForPrint,
			serialForPrint,
			fullDepotForPrint,
			jobTypeForPrint,
			estimDateForPrint,
			currencyCodeForPrint,
			cwforprint,
			notes1forprint,
			notes2forprint,
			notes3forprint,
			notes4forprint,
			notes5forprint,
			printExcelDataC,
			printExcelDataM,
			title,
			func){
		 	 var html = "";
		 	 var count = 0;

		     var urlNoHash = window.location.href.replace(window.location.hash,'');
		     var urlSplit = urlNoHash.split('/');
		     var base = "";
		     if(urlSplit.length > 2){
		    	 	base = base + urlSplit[0]+"//";
		            for(var i=2; i<urlSplit.length - 1;i++){
		                   base = base + urlSplit[i]+"/";
		            }
		     }

		     var tableWidth = 16;
		     var htmlTable = "";

				 /* ----------------------------------------*/
				 /* --------  Header Section  --------------*/
				 /* ----------------------------------------*/

		       htmlTable +='<table border="0" cellspacing="0" class="table70" style="color:#656465">';   // Header Table - Start
		       htmlTable += '<tr style="height:75px;border=1">'+
		                    '<td align=center colspan='+ (12) +' style="padding-left:10px;font:bold 14px Arial;"><u>' +title + ' for <b><FONT COLOR="RED">' + serialForPrint +' </FONT></b> in depot <b><FONT COLOR="RED">'+ depotForPrint + '</FONT></b> on <b><FONT COLOR="RED">'+ estimDateForPrint + '</FONT></b></u></td>'+
		                    '<td style="border:none; padding:5px 5px 5px 0px" colspan=2 align ="right"><img src="' + base + 'images/login/login_logo.png"></img></td></tr>';

		       htmlTable += '<tr  style="border:none;height:20px;">';

		       if(currencyCodeForPrint != '')
		       htmlTable += '<td colspan="2" align=left  style="padding-left:30px; font: 12px Arial;">Curr : <b>' + currencyCodeForPrint + '</b></td>';

		       if(jobTypeForPrint != '')
		       htmlTable += '<td colspan="2" align=left  style="padding-left:30px; font: 12px Arial;">Type : <b>' + jobTypeForPrint + '</b></td>';

		       if(cwforprint != '')
		       htmlTable += '<td colspan="2" align=left  style="padding-left:30px; font: 12px Arial;">Cargo Worthy : <b>' + cwforprint + '</b></td>';

					 if(notes1forprint != '')
					 htmlTable += '<td colspan="2" align=left  style="padding-left:30px; font: 12px Arial;">SCR Limit : <b>' + notes1forprint + '</b></td>';

		       htmlTable += '</tr>';

					 htmlTable += '<tr  style="border:none;height:20px;">';

					 if(notes2forprint != '')
					 htmlTable += '<td colspan="3" align=left  style="padding-left:30px; font: 12px Arial;">Notes 2 : <b>' + notes2forprint + '</b></td>';

					 if(notes3forprint != '')
					 htmlTable += '<td colspan="3" align=left  style="padding-left:30px; font: 12px Arial;">Notes 3 : <b>' + notes3forprint + '</b></td>';

					 htmlTable += '</tr>';

					 htmlTable += '<tr  style="border:none;height:20px;">';

					 if(notes4forprint != '')
					 htmlTable += '<td colspan="3" align=left  style="padding-left:30px; font: 12px Arial;">Notes 4 : <b>' + notes4forprint + '</b></td>';

					 if(notes5forprint != '')
					 htmlTable += '<td colspan="3" align=left  style="padding-left:30px; font: 12px Arial;">Notes 5 : <b>' + notes5forprint + '</b></td>';

					 htmlTable += '</tr>';
					 htmlTable += '</table>'; 	// Header Table - End

					 htmlTable += '<br>';	// Line Break

					 var totalU = 0.00;
					 var totalJ = 0.00;
					 var totalO = 0.00;
					 var totalI = 0.00;
					 var totalV = 0.00;
					 var totalS = 0.00;
					 var total = 0.00;

					 /* ----------------------------------------*/
					 /* --------  Carcass Lines Section  ------ */
					 /* ----------------------------------------*/

					 var excelDataPrint = [];
					 var excelDataPrintGet = [];
					 excelDataPrintGet = oExcelGridJ1.getData();

					 // Make totals based on the Responsibility Code //
					 var labhrU = 0.00;
					 var labhrJ = 0.00;
					 var labhrO = 0.00;
					 var labhrI = 0.00;
					 var labhrV = 0.00;
					 var labhrS = 0.00;

					 var matrcU = 0.00;
					 var matrcJ = 0.00;
					 var matrcO = 0.00;
					 var matrcI = 0.00;
					 var matrcV = 0.00;
					 var matrcS = 0.00;

					 var labrtU = 0.00;
					 var labrtO = 0.00;
					 var labrtI = 0.00;
					 var labrtS = 0.00;
					 var labrt = 0.00;


					 var matrc = 0.00;

					 var currLength = excelDataPrintGet.length;

					 for(var i =0; i < currLength; i++){
					 	loop1 : for(var j =0; j < 12; j++){
					 		if(excelDataPrintGet[i][j] != "" && excelDataPrintGet[i][j] != null){
					 			excelDataPrint.push(excelDataPrintGet[i]);
					 			break loop1;
					 		}
					 	}
					 }

					 if(printExcelDataC.length > 0){

					 for(var i=0; i<excelDataPrint.length; i++){
					 	if(excelDataPrint[i][11].substr(0,1).toUpperCase() == 'U'){
					 		labhrU = (excelDataPrint[i][8] == "")? labhrU : parseFloat(parseFloat(labhrU).toFixed(2)) + parseFloat(parseFloat(excelDataPrint[i][8]).toFixed(2));
					 		matrcU = (excelDataPrint[i][9] == "")? matrcU : parseFloat(parseFloat(matrcU).toFixed(2)) + parseFloat(parseFloat(excelDataPrint[i][9]).toFixed(2));
					 	}else if(excelDataPrint[i][11].substr(0,1).toUpperCase() == 'J'){
					 		labhrJ = (excelDataPrint[i][8] == "")? labhrJ : parseFloat(parseFloat(labhrJ).toFixed(2)) + parseFloat(parseFloat(excelDataPrint[i][8]).toFixed(2));
					 		matrcJ = (excelDataPrint[i][9] == "")? matrcJ : parseFloat(parseFloat(matrcJ).toFixed(2)) + parseFloat(parseFloat(excelDataPrint[i][9]).toFixed(2));
					 	}else if(excelDataPrint[i][11].substr(0,1).toUpperCase() == 'O'){
					 		labhrO = (excelDataPrint[i][8] == "")? labhrO : parseFloat(parseFloat(labhrO).toFixed(2)) + parseFloat(parseFloat(excelDataPrint[i][8]).toFixed(2));
					 		matrcO = (excelDataPrint[i][9] == "")? matrcO : parseFloat(parseFloat(matrcO).toFixed(2)) + parseFloat(parseFloat(excelDataPrint[i][9]).toFixed(2));
					 	}else if(excelDataPrint[i][11].substr(0,1).toUpperCase() == 'I'){
					 		labhrI = (excelDataPrint[i][8] == "")? labhrI : parseFloat(parseFloat(labhrI).toFixed(2)) + parseFloat(parseFloat(excelDataPrint[i][8]).toFixed(2));
					 		matrcI = (excelDataPrint[i][9] == "")? matrcI : parseFloat(parseFloat(matrcI).toFixed(2)) + parseFloat(parseFloat(excelDataPrint[i][9]).toFixed(2));
					 	}else if(excelDataPrint[i][11].substr(0,1).toUpperCase() == 'V'){
					 		labhrV = (excelDataPrint[i][8] == "")? labhrV : parseFloat(parseFloat(labhrV).toFixed(2)) + parseFloat(parseFloat(excelDataPrint[i][8]).toFixed(2));
					 		matrcV = (excelDataPrint[i][9] == "")? matrcV : parseFloat(parseFloat(matrcV).toFixed(2)) + parseFloat(parseFloat(excelDataPrint[i][9]).toFixed(2));
					 	}else if(excelDataPrint[i][11].substr(0,1).toUpperCase() == 'S'){
					 		labhrS = (excelDataPrint[i][8] == "")? labhrS : parseFloat(parseFloat(labhrS).toFixed(2)) + parseFloat(parseFloat(excelDataPrint[i][8]).toFixed(2));
					 		matrcS = (excelDataPrint[i][9] == "")? matrcS : parseFloat(parseFloat(matrcS).toFixed(2)) + parseFloat(parseFloat(excelDataPrint[i][9]).toFixed(2));
					 	}
					 }


					 labrtU = labhrU * globalLabCostC;
					 labrtO = labhrO * globalLabCostC;
					 labrtI = labhrI * globalLabCostC;
					 labrtS = labhrS * globalLabCostC;
					 labrt = labrtU + labrtO + labrtI + labrtS;


					 matrc = matrcU + matrcO + matrcI + matrcS;
					 //matrc = parseFloat(matrc).toFixed(2);
					 totalU = labrtU + matrcU;
					 totalO = labrtO + matrcO;
					 totalI = labrtI + matrcI;
					 totalS = labrtS + matrcS;
					 total = labrt + matrc;


					 // Repair Lines Header for Carcass
					 htmlTable += '<div style="font-size: 20px;text-decoration: underline;padding-top: 10px;padding-right: 10px;padding-bottom: 10px;color: #cc292b;"><b>' + sap.ui.getCore().byId("idlblhdrTblREEntryJ1").getText() + '</b></div>';
		    	 htmlTable += '<table border="1">'; // Carcass Table Start

						// Carcass Line Items Section....
		       	   htmlTable += '<tr>';
		       	   for (var key in printExcelDataC[0]){
	                  //alert("key : "+ key);
	                  htmlTable += '<td align=center style="font: bold 12px Arial;">'+key+'</td>';
	                  //console.log(key + ' = ' + item[key]);
	               }
	               htmlTable += '</tr>';

		           // Create PrimData1 Table Body
		           $.each(printExcelDataC, function(i, item) {
		                  htmlTable += '<tr>';
		               for (var key in item){
		                  //alert("key : "+ key);
		                  htmlTable += '<td align=center style="font: 12px Arial;">'+item[key]+'</td>';
		                  //console.log(key + ' = ' + item[key]);
		               }
		               htmlTable += '</tr>';
		           });
							 htmlTable += '</table>'; // Carcass Table End
		       }else{ // Zero Cost Estimate
									 // Repair Lines Header for Carcass
									 htmlTable += '<div style="font-size: 20px;text-decoration: underline;padding-top: 10px;padding-right: 10px;padding-bottom: 10px;color: #cc292b;"><b>' + sap.ui.getCore().byId("idlblhdrTblREEntryJ1").getText() + '</b></div>';
									 htmlTable += '<br>';
									 htmlTable += '<table border="0">'; // Machinery Table Start

									htmlTable += '<tr style="border:none;">';
									htmlTable += '<td colspan="4">';
									htmlTable += 'Zero Cost';
									htmlTable += '</td>';
									htmlTable += '</tr>';

									htmlTable += '</table>'; // Carcass Table End
					 }

					 htmlTable += '<br>';	// Line Break

					 if(globalEstimateIsReefer){


					 /* ----------------------------------------*/
					 /* --------  Machinery Lines Section  ------ */
					 /* ----------------------------------------*/

					 var excelDataPrint = [];
					 var excelDataPrintGet = [];
					 excelDataPrintGet = oExcelGridJ2.getData();

					 // Make totals based on the Responsibility Code //
					 labhrU = 0.00;
					 labhrJ = 0.00;
					 labhrO = 0.00;
					 labhrV = 0.00;
					 labhrI = 0.00;
					 labhrS = 0.00;



					 var currLength = excelDataPrintGet.length;

					 for(var i =0; i < currLength; i++){
					 	loop1 : for(var j =0; j < 12; j++){
					 		if(excelDataPrintGet[i][j] != "" && excelDataPrintGet[i][j] != null){
					 			excelDataPrint.push(excelDataPrintGet[i]);
					 			break loop1;
					 		}
					 	}
					 }

					 if(printExcelDataM.length > 0){

					 for(var i=0; i<excelDataPrint.length; i++){
					 	if(excelDataPrint[i][11].substr(0,1).toUpperCase() == 'U'){
					 		labhrU = (excelDataPrint[i][8] == "")? labhrU : parseFloat(parseFloat(labhrU).toFixed(2)) + parseFloat(parseFloat(excelDataPrint[i][8]).toFixed(2));
					 		matrcU = (excelDataPrint[i][9] == "")? matrcU : parseFloat(parseFloat(matrcU).toFixed(2)) + parseFloat(parseFloat(excelDataPrint[i][9]).toFixed(2));
					 	}else if(excelDataPrint[i][11].substr(0,1).toUpperCase() == 'J'){
					 		labhrJ = (excelDataPrint[i][8] == "")? labhrJ : parseFloat(parseFloat(labhrJ).toFixed(2)) + parseFloat(parseFloat(excelDataPrint[i][8]).toFixed(2));
					 		matrcJ = (excelDataPrint[i][9] == "")? matrcJ : parseFloat(parseFloat(matrcJ).toFixed(2)) + parseFloat(parseFloat(excelDataPrint[i][9]).toFixed(2));
					 	}else if(excelDataPrint[i][11].substr(0,1).toUpperCase() == 'O'){
					 		labhrO = (excelDataPrint[i][8] == "")? labhrO : parseFloat(parseFloat(labhrO).toFixed(2)) + parseFloat(parseFloat(excelDataPrint[i][8]).toFixed(2));
					 		matrcO = (excelDataPrint[i][9] == "")? matrcO : parseFloat(parseFloat(matrcO).toFixed(2)) + parseFloat(parseFloat(excelDataPrint[i][9]).toFixed(2));
					 	}else if(excelDataPrint[i][11].substr(0,1).toUpperCase() == 'I'){
					 		labhrI = (excelDataPrint[i][8] == "")? labhrI : parseFloat(parseFloat(labhrI).toFixed(2)) + parseFloat(parseFloat(excelDataPrint[i][8]).toFixed(2));
					 		matrcI = (excelDataPrint[i][9] == "")? matrcI : parseFloat(parseFloat(matrcI).toFixed(2)) + parseFloat(parseFloat(excelDataPrint[i][9]).toFixed(2));
					 	}else if(excelDataPrint[i][11].substr(0,1).toUpperCase() == 'V'){
					 		labhrV = (excelDataPrint[i][8] == "")? labhrV : parseFloat(parseFloat(labhrV).toFixed(2)) + parseFloat(parseFloat(excelDataPrint[i][8]).toFixed(2));
					 		matrcV = (excelDataPrint[i][9] == "")? matrcV : parseFloat(parseFloat(matrcV).toFixed(2)) + parseFloat(parseFloat(excelDataPrint[i][9]).toFixed(2));
					 	}else if(excelDataPrint[i][11].substr(0,1).toUpperCase() == 'S'){
					 		labhrS = (excelDataPrint[i][8] == "")? labhrS : parseFloat(parseFloat(labhrS).toFixed(2)) + parseFloat(parseFloat(excelDataPrint[i][8]).toFixed(2));
					 		matrcS = (excelDataPrint[i][9] == "")? matrcS : parseFloat(parseFloat(matrcS).toFixed(2)) + parseFloat(parseFloat(excelDataPrint[i][9]).toFixed(2));
					 	}
					 }


					 labrtU = labrtU + (labhrU * globalLabCostM);
					 labrtO = labrtO + (labhrO * globalLabCostM);
					 labrtI = labrtI + (labhrI * globalLabCostM);
					 labrtS = labrtS + (labhrS * globalLabCostM);

					 labrt = parseFloat(parseFloat(labrtU).toFixed(2)) + parseFloat(parseFloat(labrtO).toFixed(2)) + parseFloat(parseFloat(labrtI).toFixed(2)) + parseFloat(parseFloat(labrtS).toFixed(2));
					 matrc = matrcU + matrcO + matrcI + matrcS;

					 totalU = parseFloat(totalU + labrtU + matrcU).toFixed(2);
					 totalO = parseFloat(totalO + labhrO + matrcO).toFixed(2);
					 totalI = parseFloat(totalI + labhrI + matrcI).toFixed(2);
					 totalS = parseFloat(totalS + labhrS + matrcS).toFixed(2);
					 total = parseFloat(total + labrt + matrc).toFixed(2);


					 labrt = parseFloat(labrt).toFixed(2);
					 labrtO = parseFloat(labrtO).toFixed(2);
					 labrtI = parseFloat(labrtI).toFixed(2);
					 labrtU = parseFloat(labrtU).toFixed(2);
					 labrtS = parseFloat(labrtS).toFixed(2);

					 matrc = parseFloat(matrc).toFixed(2);
					 matrcO = parseFloat(matrcO).toFixed(2);
					 matrcI = parseFloat(matrcI).toFixed(2);
					 matrcU = parseFloat(matrcU).toFixed(2);
					 matrcS = parseFloat(matrcS).toFixed(2);

					 // Repair Lines Header for Machinery
					 htmlTable += '<div style="font-size: 20px;text-decoration: underline;padding-top: 10px;padding-right: 10px;padding-bottom: 10px;color: #cc292b;"><b>' + sap.ui.getCore().byId("idlblhdrTblREEntryJ2").getText() + '</b></div>';
					 htmlTable += '<br>';
					 htmlTable += '<table border="1">'; // Machinery Table Start

					 // Machinery Line Items Section....
							htmlTable += '<tr>';
							for (var key in printExcelDataM[0]){
									 //alert("key : "+ key);
									 htmlTable += '<td align=center style="font: bold 12px Arial;">'+key+'</td>';
									 //console.log(key + ' = ' + item[key]);
								}
								htmlTable += '</tr>';

							// Create PrimData1 Table Body
							$.each(printExcelDataM, function(i, item) {
										 htmlTable += '<tr>';
									for (var key in item){
										 //alert("key : "+ key);
										 htmlTable += '<td align=center style="font: 12px Arial;">'+item[key]+'</td>';
										 //console.log(key + ' = ' + item[key]);
									}
									htmlTable += '</tr>';
							});
							htmlTable += '</table>'; // Machinery Table End
					}else{ // Zero Cost Estimate

								 // Repair Lines Header for Machinery
								 htmlTable += '<div style="font-size: 20px;text-decoration: underline;padding-top: 10px;padding-right: 10px;padding-bottom: 10px;color: #cc292b;"><b>' + sap.ui.getCore().byId("idlblhdrTblREEntryJ2").getText() + '</b></div>';
								 htmlTable += '<br>';
								 htmlTable += '<table border="0">'; // Machinery Table Start

								 htmlTable += '<tr style="border:none;">';
								 htmlTable += '<td colspan="4">';
								 htmlTable += 'Zero Cost';
								 htmlTable += '</td>';
								 htmlTable += '</tr>';

								 htmlTable += '</table>'; // Machinery Table End
					}

					htmlTable += '<br>';	// Line Break
				}

					 // Total Section
					 htmlTable += '<div style="font-size: 20px;text-decoration: underline;padding-top: 10px;padding-right: 10px;padding-bottom: 10px;color: #cc292b;"><b>Total</b></div>';
					 htmlTable += '<br>';
					 var toal = "";
					 var printTotalCost = [];
					 labrtU = parseFloat(labrtU).toFixed(2);
					 matrcU = parseFloat(matrcU).toFixed(2);
					 total = parseFloat(labrtU.split(',').join('')) + parseFloat(matrcU.split(',').join(''));
					 printTotalCost.push({
					 	"" : "User",
					 	"Labour" : thousandsep(labrtU),
					 	"Material" : thousandsep(matrcU),
						"Total" : thousandsep(total)
					 });

					 labrtI = parseFloat(labrtI).toFixed(2);
					 matrcI = parseFloat(matrcI).toFixed(2);
					 total = parseFloat(labrtI.split(',').join('')) + parseFloat(matrcI.split(',').join(''));
					 printTotalCost.push({
					 	"" : "SeaCover",
					 	"Labour" : thousandsep(labrtI),
					 	"Material" : thousandsep(matrcI),
						"Total" : thousandsep(total)
					 });

					 labrtO = parseFloat(labrtO).toFixed(2);
					 matrcO = parseFloat(matrcO).toFixed(2);
					 total = parseFloat(labrtO.split(',').join('')) + parseFloat(matrcO.split(',').join(''));
					 printTotalCost.push({
					 	"" : "Owner",
					 	"Labour" : thousandsep(labrtO),
					 	"Material" : thousandsep(matrcO),
						"Total" : thousandsep(total)
					 });

					 labrtS = parseFloat(labrtS).toFixed(2);
					 matrcS = parseFloat(matrcS).toFixed(2);
					 total = parseFloat(labrtS.split(',').join('')) + parseFloat(matrcS.split(',').join(''));
					 printTotalCost.push({
					 	"" : "Special",
					 	"Labour" : thousandsep(labrtS),
					 	"Material" : thousandsep(matrcS),
						"Total" : thousandsep(total)
					 });

					 labrt = parseFloat(labrt).toFixed(2);
					 matrc = parseFloat(matrc).toFixed(2);
					 total = parseFloat(labrt.split(',').join('')) + parseFloat(matrc.split(',').join(''));
					 printTotalCost.push({
					 	"" : "Total",
					 	"Labour" : thousandsep(labrt),
					 	"Material" : thousandsep(matrc),
						"Total" : thousandsep(total)
					 });

					 htmlTable += '<table border="1">';	// Total section start

					 // Total Lines

					 htmlTable += '<tr>';
					 for (var key in printTotalCost[0]){
					 		 //alert("key : "+ key);
					 		 htmlTable += '<td align=center style="font: bold 12px Arial;">'+key+'</td>';
					 		 //console.log(key + ' = ' + item[key]);
					 	}
					 	htmlTable += '</tr>';
					 	var colorCount = 0;
					 // Create PrimData1 Table Body
					 $.each(printTotalCost, function(i, item) {
					 		 colorCount = colorCount + 1;
					 			 htmlTable += '<tr>';
					 		for (var key in item){
					 			 //alert("key : "+ key);
					 		 if(colorCount == printTotalCost.length){
					 			 htmlTable += '<td align=center style="font:bold 12px Arial; background-color:#fef885">'+item[key]+'</td>';
					 		 }else{
					 			 htmlTable += '<td align=center style="font: 12px Arial;">'+item[key]+'</td>';
					 		 }

					 			 //console.log(key + ' = ' + item[key]);
					 		}
					 		htmlTable += '</tr>';
					 });

					 htmlTable += '</table>';	// Total section End

			   if(func == "print"){
			   	   			//html +='<style>.table20,.table50,.table70,table{border-collapse:collapse}table{width:100%}.table70{width:70%}.table50{width:50%}.table20{width:20%}tr:nth-of-type(even){background:#eee}th{background:#333;color:#fff;font-weight:700}td,th{padding:6px;border:1px solid #ccc;text-align:left}@page{size:landscape;}</style><html><head><title></title></head><body >';
                  //alert("Print");
                  html += '<div>';
                  html +=htmlTable+'</div>';
                  html +='</body></html>';

           }else if(func == "excel"){
               //alert("Export");
               var uri = 'data:application/vnd.ms-excel;base64,',
               template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">'
               +'<!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->'
               +'<head></head>'
							 //+'<style>.table20,.table50,.table70,table{border-collapse:collapse}table{width:100%}.table70{width:70%}.table50{width:50%}.table20{width:20%}tr:nth-of-type(even){background:#eee}th{background:#333;color:#fff;font-weight:700}td,th{padding:6px;border:1px solid #ccc;text-align:left}@page{size:landscape;}</style>'
               +'<body>'+ htmlTable  +'</body></html>',
               base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) },
               format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }

               // Open Excel
/*                   if (!table.nodeType)
                     table = document.getElementById(table)*/
         var ctx = {worksheet: title || 'Worksheet', table: htmlTable};
         //window.location.href = uri + base64(format(template, ctx));
         if ((navigator.appName == 'Microsoft Internet Explorer') || (!!navigator.userAgent.match(/Trident.*rv[ :]*11\./)))
       	    {
 		            // var byteCharacters = atob(uri + base64(format(template, ctx)));
 		            var blobObject = b64toBlob(base64(format(template, ctx)), 'application/vnd.ms-excel');
 		            //window.navigator.msSaveBlob(blobObject, 'msSaveBlob_testFile.xls'); //only with save option
 		            window.navigator.msSaveOrOpenBlob(blobObject, 'downloadfile.xls'); //save and open both option
 	        }else
       	    {
       	    	 //window.location.href = uri + base64(format(template, ctx));
 	        	window.open(uri + base64(format(template, ctx)));
       	    }
        }

           return html;

	 	},

		// MACALPHA19032018_8 New function for submission
		saveRepairEstimateFromExcelNew : function(){


			var isZeroCostJ1Checked = sap.ui.getCore().byId("idCheckBoxZeroCostJ1").getChecked();
			var isZeroCostJ2Checked = sap.ui.getCore().byId("idCheckBoxZeroCostJ2").getChecked();
			var isJ1Filled = false;
			var isJ2Filled = false;
			var excelDataJX = [];
			var totIter = 0;
			var totIterValid = 0;
			var cpart = "";
			saveLineItemREEntryJ.length = 0; // Initialize
			excelDataJ1 = oExcelGridJ1.getData();
			excelDataJX = excelDataJ1;
			cpart = "C";
			var isEmpty = false;
			var lineItem = null;
			var j = 0;

			var datainsert = false;
			for(var i =0; i < excelDataJX.length;i++){
				totIter = totIter + 1;
				j = 0;
	 			datainsert = false;
	 			while(j<12){
	 				if(excelDataJX[i][j] != "" && excelDataJX[i][j] != null){
	 					datainsert = true;
	 					break;
	 				}
	 				j++;
	 			}
	 			if(datainsert){
	 				if(excelDataJX[i][0] == '' || excelDataJX[i][1] == '' || excelDataJX[i][2] == '' || excelDataJX[i][4] == '' || excelDataJX[i][8] == '' || excelDataJX[i][9] == '' || excelDataJX[i][11] == '' ||
	 						excelDataJX[i][0] == null || excelDataJX[i][1] == null || excelDataJX[i][2] == null || excelDataJX[i][4] == null || excelDataJX[i][8] == null || excelDataJX[i][9] == null ||  excelDataJX[i][11] == null){
	 					isEmpty = true;
	 				}
	 				if(isEmpty == false){
					totIterValid = totIterValid + 1;
	 				lineItem = padZero((totIterValid),4);
					isJ1Filled = true;
	 				saveLineItemREEntryJ.push({
						"checked":false,
						"LineItem":lineItem,
						"sectionKey":'',
						"sectionText":'',
						"LocationKey":excelDataJX[i][0].toUpperCase(),
						"LocationText":'',
						"ComponentKey":excelDataJX[i][1].toUpperCase(),
						"ComponentText":'',
						"DamageKey":excelDataJX[i][2].toUpperCase(),
						"DamageText":'',
						"RepairKey":excelDataJX[i][4].toUpperCase(),
						"RepairText":'',
						"MaterialKey":(excelDataJX[i][3] == null)? "" : excelDataJX[i][3].toUpperCase(),
						"MaterialText":'',
						"MaterialCost":excelDataJX[i][9],
						"ManHours":excelDataJX[i][8],
						"RepairLength":(excelDataJX[i][5] == null)? "" : excelDataJX[i][5],
						"RepairWidth":(excelDataJX[i][6] == null)? "" : excelDataJX[i][6],
						"Quantity":(excelDataJX[i][7] == null)? "" : excelDataJX[i][7],
						"ResponsibilityKey":excelDataJX[i][11].substring(0,1).toUpperCase(),
						"ResponsibilityText":'',
						"LabourRate":'',
						"TechBulletin":(excelDataJX[i][10] == null)? "" : excelDataJX[i][10].toUpperCase(),
						"DataInserted":true,
						"savestatus": false,
						"Cpart": cpart
					});
	 				}
	 			}
	 		}

			/* MACALPHA19032018_4 */
			if (globalEstimateIsReefer){
				/* Machinery Part */
				excelDataJ2 = oExcelGridJ2.getData();
				excelDataJX = excelDataJ2;
				cpart = "M";
				var isEmpty = false;
				var lineItem = null;
				var j = 0;

				var datainsert = false;
				for(var i =0; i < excelDataJX.length;i++){
					totIter = totIter + 1;
					j = 0;
		 			datainsert = false;
		 			while(j<12){
		 				if(excelDataJX[i][j] != "" && excelDataJX[i][j] != null){
		 					datainsert = true;
		 					break;
		 				}
		 				j++;
		 			}
		 			if(datainsert){
		 				if(excelDataJX[i][0] == '' || excelDataJX[i][1] == '' || excelDataJX[i][2] == '' || excelDataJX[i][4] == '' || excelDataJX[i][8] == '' || excelDataJX[i][11] == '' || excelDataJX[i][11] == '' ||
		 						excelDataJX[i][0] == null || excelDataJX[i][1] == null || excelDataJX[i][2] == null || excelDataJX[i][4] == null || excelDataJX[i][8] == null || excelDataJX[i][9] == null ||  excelDataJX[i][11] == null){
		 					isEmpty = true;
		 				}
		 				if(isEmpty == false){
						totIterValid = totIterValid + 1;
		 				lineItem = padZero((totIterValid),4);
						isJ2Filled = true;
		 				saveLineItemREEntryJ.push({
							"checked":false,
							"LineItem":lineItem,
							"sectionKey":'',
							"sectionText":'',
							"LocationKey":excelDataJX[i][0].toUpperCase(),
							"LocationText":'',
							"ComponentKey":excelDataJX[i][1].toUpperCase(),
							"ComponentText":'',
							"DamageKey":excelDataJX[i][2].toUpperCase(),
							"DamageText":'',
							"RepairKey":excelDataJX[i][4].toUpperCase(),
							"RepairText":'',
							"MaterialKey":(excelDataJX[i][3] == null)? "" : excelDataJX[i][3].toUpperCase(),
							"MaterialText":'',
							"MaterialCost":excelDataJX[i][9],
							"ManHours":excelDataJX[i][8],
							"RepairLength":(excelDataJX[i][5] == null)? "" : excelDataJX[i][5],
							"RepairWidth":(excelDataJX[i][6] == null)? "" : excelDataJX[i][6],
							"Quantity":(excelDataJX[i][7] == null)? "" : excelDataJX[i][7],
							"ResponsibilityKey":excelDataJX[i][11].substring(0,1).toUpperCase(),
							"ResponsibilityText":'',
							"LabourRate":'',
							"TechBulletin":(excelDataJX[i][10] == null)? "" : excelDataJX[i][10].toUpperCase(),
							"DataInserted":true,
							"savestatus": false,
							"Cpart": cpart
						});
		 				}
		 			}
		 		}
			}
			/* MACALPHA19032018_4 */

				var errorMessageEstimate = "";

				// MAC_APS1157+
				var oCurrent = this;
				var isNumbersAreNumbers = oCurrent.checkIfNumbersAreNumbers();	
				var isDropDownsAreValid = oCurrent.checkIfDropDownsAreValid();
				// MAC_APS1157+

				if(isEmpty == true){
					sap.ui.commons.MessageBox.alert("Lab. Hrs, Material Cost, Location, Component, Damage, Repair & Responsibility cannot be blank. Please fill them up");
				}// MAC_APS1157+
				else if(!isNumbersAreNumbers){
					sap.ui.commons.MessageBox.alert("Please do not enter alphabets in Rp.Length, Rp.Width, Qty, Lab.Hrs and Material Cost");
				}else if(!isDropDownsAreValid){
					sap.ui.commons.MessageBox.alert("Please check invalid entries");
				}
				// MAC_APS1157+
				else if(isEmpty == false){
					if(isZeroCostJ1Checked == false && isJ1Filled == false){
						errorMessageEstimate = "Carcass : Either check Zero Cost Estimate or enter repair lines"
					}
					if(globalEstimateIsReefer == true && isZeroCostJ2Checked == false && isJ2Filled == false){
						if(errorMessageEstimate == "")
							errorMessageEstimate = errorMessageEstimate + "Machinery : Either check Zero Cost Estimate or enter repair lines";
						else
						 errorMessageEstimate = errorMessageEstimate + "\nMachinery : Either check Zero Cost Estimate or enter repair lines";
					}

					if(errorMessageEstimate != "" && clickEvent == "submit"){
						 sap.ui.commons.MessageBox.alert(errorMessageEstimate);
					 }else{
		 					objREstimateOnlineJ.onlinefunEstimateSave(selEstmtId,'X', 'C');
							// if(globalEstimateIsReefer == true){
							// 	objREstimateOnlineJ.onlinefunEstimateSave(selEstmtId,'X', 'M');
							// }
	 				 }
					}


		},

		// MAC_APS1157+
		checkIfDropDownsAreValid : function(){

			// ComponentKey: "MCO"
			// ComponentText: ""
			// Cpart: "C"
			// DamageKey: "CO"
			// DamageText: ""
			// DataInserted: true
			// LabourRate: ""
			// LineItem: "0001"
			// LocationKey: "IXXX"
			// LocationText: ""
			// ManHours: "100"
			// MaterialCost: "100"
			// MaterialKey: "SS"
			// MaterialText: ""
			// Quantity: 100
			// RepairKey: "PT"
			// RepairLength: ""
			// RepairText: ""
			// RepairWidth: "12"
			// ResponsibilityKey: "U"
			// ResponsibilityText: ""
			// TechBulletin: ""
			// checked: false
			// savestatus: false
			// sectionKey: ""
			// sectionText: ""

			var foundLocation = false;
			var foundComponent = false;
			var foundDamage = false;
			var foundMaterial = false;
			var foundRepair = false;
			var foundResponsibility = false;

			var isDropDownsAreValid = true;
			var saveLineItemREEntryJCount = saveLineItemREEntryJ.length;
			for(var i = 0; i < saveLineItemREEntryJCount; i++){

						foundLocation = isInArrayLineCodes(saveLineItemREEntryJ[i].LocationKey, locationSource);
						console.log(foundLocation);

						foundComponent = isInArrayLineCodes(saveLineItemREEntryJ[i].ComponentKey, componentSource);
						console.log(foundComponent);

						foundDamage = isInArrayLineCodes(saveLineItemREEntryJ[i].DamageKey, damageSource);
						console.log(foundDamage);

						foundMaterial = isInArrayLineCodes(saveLineItemREEntryJ[i].MaterialKey, materialSource);
						console.log(foundMaterial);

						foundRepair = isInArrayLineCodes(saveLineItemREEntryJ[i].RepairKey, repairSource);
						console.log(foundRepair);

						foundResponsibility = isInArrayLineCodes(saveLineItemREEntryJ[i].ResponsibilityKey, aResponsCodeJ1);
						foundResponsibility = true; // tempchange
						console.log(foundResponsibility);


						if(!foundLocation || !foundComponent || !foundDamage || !foundMaterial || !foundRepair || !foundResponsibility){
							isDropDownsAreValid = false;
						}
					
			}
			console.log(isDropDownsAreValid);
			return isDropDownsAreValid;

		},

		checkIfNumbersAreNumbers : function(){

			var isNumbersAreNumbers = true;
			var saveLineItemREEntryJCount = saveLineItemREEntryJ.length;

			for(var i = 0; i < saveLineItemREEntryJCount; i++){
				saveLineItemREEntryJ[i].MaterialCost = (saveLineItemREEntryJ[i].MaterialCost != null)?saveLineItemREEntryJ[i].MaterialCost.split(',').join(''):saveLineItemREEntryJ[i].MaterialCost;	// MAC_APS1157+
				if(isNaN(saveLineItemREEntryJ[i].RepairLength) || isNaN(saveLineItemREEntryJ[i].RepairWidth) || 
						isNaN(saveLineItemREEntryJ[i].MaterialCost) || isNaN(saveLineItemREEntryJ[i].ManHours) || isNaN(saveLineItemREEntryJ[i].Quantity)){
					isNumbersAreNumbers = false;
				}				
			}
			return isNumbersAreNumbers;
		}
		// MAC_APS1157+

});

/*sap.ui.commons.TextField.prototype.onkeydown = function(e) {
	var k = e.which || e.keyCode;
	if (k === jQuery.sap.KeyCodes.TAB) {
		//$('#idTblLineItemREEntryJCC-col3-row0').focus();
		sap.ui.getCore().byId("idTblLineItemREEntryJCC-col3-row0").focus();
	}
};*/

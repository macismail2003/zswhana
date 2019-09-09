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
*/
jQuery.sap.require("sap.ui.model.json.JSONModel");
var objcurntREEntry,objcrntRJSREEntry;
var oMdlLineItemREEntry = new sap.ui.model.json.JSONModel();
var jsnLineItemREEntry = [];

function padZero(num, size) {
		    var s = num+"";
		    while (s.length < size) s = "0" + s;
		    return s;
		};
var oMdlDtPkrEstmtREEntry, unitNo, DepoId, DepoText, ReferJS = false,
clickEvent ="";

//SET GLOBAL DROPDOWN TEMPLATE FOR STATIC DATA
var oItmTmpltGloabREEntry = new sap.ui.core.ListItem();
oItmTmpltGloabREEntry.bindProperty("text", "text");
oItmTmpltGloabREEntry.bindProperty("key", "key");

	jsnLineItemREEntry.removeValue = function(name, value){
		var arrayval = this.filter(function(el){
			return el[name] != value;
		});

		this.length = 0; //clear original array
		this.push.apply(this, arrayval); //push all elements except the one we want to delete
	},

	jsnLineItemREEntry.resetSequence = function(name, length){
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

sap.ui.model.json.JSONModel.extend("RepairEstimateEntry", {
createRepairEstimateEntryForm: function(){
		jsnLineItemREEntry.length = 0;
		for(var i =0; i < 10; i++){
		jsnLineItemREEntry.push({"checked":false,"LineItem":padZero(i+1,4),"sectionKey":"",
			"sectionText":"","LocationKey":"",	"LocationText":"",
			"ComponentKey":"","ComponentText":"","DamageKey":"","DamageText":"",
			"RepairKey":"","RepairText":"",	"MaterialKey":"","MaterialText":"","MaterialCost":"",
			"ManHours":"","RepairLength":"","RepairWidth":"","Quantity":"",
			responsibility:[],
			"ResponsibilityKey":"","ResponsibilityText":"","LabourRate":"",
			"TechBulletin":"","DataInserted":false});
		}

		unitNo = selctdUNDepoRESearch.split('|')[0];
		DepoId = selctdUNDepoRESearch.split('|')[1];
		DepoText = selctdUNDepoRESearch.split('|')[2];
		DepoText = DepoText.substr(0,DepoText.lastIndexOf('-'))
		var oController = sap.ui.controller("view.RepairEstimateEntryVw");
		objcurntREEntry = new RepairEstimateEntry();
		//jsnLineItemREEntry.length = 0;
		var depotEnabled = false, depotId = '';
		//if((objLoginUser.getLoggedInUserType() != "DEPOT") && (objLoginUser.getLoggedInUserType() != "FACTORY")){
			depotEnabled = true;
		//}else{
			//depotId = objLoginUser.getLoggedInUserID();
		//}
		// Responsive Grid Layout
		var oRepairEEntryLayout = new sap.ui.layout.form.ResponsiveGridLayout({
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
		var olblUnitPCodeREEntryIn = new sap.ui.commons.Label({text: "Unit Part Code:",
			required: true,
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: true, margin: true}),
			wrapping: true}).addStyleClass("marginTop10");

		var oDdlUnitPCodeREEntryIn = new sap.ui.commons.DropdownBox("idDdlUnitPCodeREEntryIn", {
			  enabled: false,
			  layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12"}),
			  width:"100%",
			  displaySecondaryValues:false,
			  placeholder: "Select Unit Part Code",
			  change: function(evnt){
				if(this.getValue() != '')
				{
					this.setValueState(sap.ui.core.ValueState.None);
					this.setPlaceholder("Select Unit Part Code");
					sap.ui.getCore().byId("idDdlUnitPCodeREEntry").setSelectedKey(this.getSelectedKey());
					var headerText = sap.ui.getCore().byId("idlblEstmtHdrREEntry").getText();
					if(this.getSelectedKey() == "M")
						headerText = headerText.replace('Carcass', 'Machinery');
					else
						headerText = headerText.replace('Machinery', 'Carcass');
					}
					sap.ui.getCore().byId("idlblEstmtHdrREEntry").setText(headerText);

					var isJSSelected = sap.ui.getCore().byId("idDdlJobTypeREEntry").getSelectedKey();
					if(isJSSelected == "Joint Survey")
						{
							objREstimateOnline.onlinefunJointSurvey();
						}
			  },
		}).addStyleClass("FormInputStyle marginTop7");

		/*oDdlUnitPCodeREEntry.setModel(omdlGlobalRESData);
		oDdlUnitPCodeREEntry.bindItems("/UnitPartCode", oItmTmpltGloabREEntry);
		sap.ui.getCore().byId("idDdlUnitPCodeREEntry").setSelectedKey("C");*/

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

  	  	oDdlUnitPCodeREEntryIn.setModel(oDdlUpcModelIn);
  	  	oDdlUnitPCodeREEntryIn.setSelectedKey(ddlUpcDataIn[0].key);
  	  	oDdlUnitPCodeREEntryIn.bindItems("/data", new sap.ui.core.ListItem({text: "{text}", key:"{key}"}));

		var olblJobTypeREEntry = new sap.ui.commons.Label({text: "Job Type:",
      width : "90px",
			required: true,
			//layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
			wrapping: false}).addStyleClass("marginTop10");

		var oDdlJobTypeREEntry = new sap.ui.commons.DropdownBox("idDdlJobTypeREEntry", {
			  //layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"}),
			  width:"100%",
			  displaySecondaryValues:false,
			  placeholder: "Job Type",
			  change: function(evnt){
				if(sap.ui.getCore().byId("idFrmCntnrRJSREEntry") != undefined){
							sap.ui.getCore().byId("idFrmCntnrRJSREEntry").destroy();
				}

				sap.ui.getCore().byId("idlblSuccessMsgREE").setText("");
				sap.ui.getCore().byId("idlblSuccessMsgREE").setVisible(false);

				if(sap.ui.getCore().byId("idFrmElmntErrREEntry") != undefined){
					sap.ui.getCore().byId("idFrmElmntErrREEntry").destroyFields();
					sap.ui.getCore().byId("idFrmElmntErrREEntry").destroy();
				}
				if(sap.ui.getCore().byId("idFrmElmntInfoLstREEntry") != undefined){
					sap.ui.getCore().byId("idFrmElmntInfoLstREEntry").destroyFields();
					sap.ui.getCore().byId("idFrmElmntInfoLstREEntry").destroy();
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

				if(this.getSelectedKey() == 'Joint Survey'){
						objREstimateOnline.onlinefunJointSurvey();
				}else if(jointtypeSel){
					jointtypeSel = false;
					objcurntREEntry.clearJointSrvayData();
				}
			  },
		}).addStyleClass("FormInputStyle marginTop7");
		oDdlJobTypeREEntry.setModel(omdlGlobalRESData);
		oDdlJobTypeREEntry.bindItems("/JobType", oItmTmpltGloabREEntry);
		/*if(objLoginUser.getLoggedInUserType() == "SEACO"){    // MAC27012014 +
		oDdlJobTypeREEntry.setModel(omdlGlobalRESData);
		oDdlJobTypeREEntry.bindItems("/JobType", oItmTmpltGloabREEntry);
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
		oDdlJobTypeREEntry.setModel(omdlLocalRESData);
		oDdlJobTypeREEntry.bindItems("/JobType", oItmTmpltGloabREEntry);
		}
		End of adding by Seyed Ismail on 27.01.2015 // MAC27012014 + */
		var olblSaleGradeREEntry = new sap.ui.commons.Label({text: "Sale Grade:",
			//required: true,
			//layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
			wrapping: false}).addStyleClass("marginTop10");

		var oDdlSaleGradeREEntry = new sap.ui.commons.DropdownBox("idDdlSaleGradeREEntry", {
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
		oDdlSaleGradeREEntry.setModel(omdlGlobalRESData);
		oDdlSaleGradeREEntry.bindItems("/SaleGrade", oItmTmpltGloabREEntry);

		 //SECOND ROW
		var olblEstimatDtREEntry = new sap.ui.commons.Label({text: "Estimate Date:",
			required: true,
			//layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
			wrapping: false}).addStyleClass("marginTop7");

		oMdlDtPkrEstmtREEntry = new sap.ui.model.json.JSONModel();
			oMdlDtPkrEstmtREEntry.setData({dateValue: new Date()});
		var oDtPkrEstimateDtREEntry = new sap.ui.commons.DatePicker('idDtPkrEstimateDtREEntry',{
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
		oDtPkrEstimateDtREEntry.setModel(oMdlDtPkrEstmtREEntry);
		oDtPkrEstimateDtREEntry.addStyleClass("FormInputStyle marginTop7");
		oDtPkrEstimateDtREEntry.setLocale("en-US");

		var olblLeaseAuthAmtREEntry = new sap.ui.commons.Label({text: "Lessee Authorised Amount:",
			//required: true,
			visible: false,
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
			wrapping: false}).addStyleClass("marginTop10");

		var oTFLeaseAuthAmtREEntry = new sap.ui.commons.TextField('idTFLeaseAuthAmtREEntry',{
			visible: false,
			placeholder: "Lessee Authorised Amount",
			layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"}),
		}).addStyleClass("FormInputStyle marginTop7");

		oTFLeaseAuthAmtREEntry.onfocusin =  function(e) {
			this.setValueState(sap.ui.core.ValueState.None);
			this.setPlaceholder("Lessee Authorised Amount");
		};
		oTFLeaseAuthAmtREEntry.onkeyup = function(evnt){
			addSeparator(document.getElementById(this.sId));
		};
		oTFLeaseAuthAmtREEntry.onkeydown = function(e){
			validateNumeric(event,true);
		};
		oTFLeaseAuthAmtREEntry.onpaste = function(e){
			e.preventDefault();
		};
		var olblCurrencyCodeREEntry = new sap.ui.commons.Label({text: "Currency Code:",
			//required: true,
			//layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
			wrapping: false}).addStyleClass("marginTop10");

		var oTFCurrencyCodeREEntry = new sap.ui.commons.TextField('idTFCurrnCodeREEntry',{
			placeholder: "Currency Code",
			change: upperOnChangeTF,
			//layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"}),
		}).addStyleClass("FormInputStyle marginTop7");


		oTFCurrencyCodeREEntry.onfocusin =  function(e) {
			this.setValueState(sap.ui.core.ValueState.None);
			this.setPlaceholder("Currency Code");
		  };

    // MACALPHA19032018_3+
    /* Add Cargo Worthy $ and Notes fields */
    var olblCWREEntry = new sap.ui.commons.Label({text: "Cargo Worthy:",
			required: true,
			//layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
			wrapping: false}).addStyleClass("marginTop10");

		var oTFCWREEntry = new sap.ui.commons.TextField('idTFCWREEntry',{
			placeholder: "Cargo Worthy"
			//layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"}),
		}).addStyleClass("FormInputStyle marginTop7");


		oTFCWREEntry.onfocusin =  function(e) {
			this.setValueState(sap.ui.core.ValueState.None);
			this.setPlaceholder("Cargo Worthy");
		};

    /* Add Notes 1 */
    var olblNotes1REEntry = new sap.ui.commons.Label({text: "Notes 1:",
      required: true,
      width : "90px",
      //layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
      wrapping: false}).addStyleClass("marginTop10");

    var oTFNotes1REEntry = new sap.ui.commons.TextField('idTFNotes1REEntry',{
      placeholder: "Notes 1",
      width : "200px"
      //layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"}),
    }).addStyleClass("FormInputStyle marginTop7");

    /* Add Notes 2 */
    var olblNotes2REEntry = new sap.ui.commons.Label({text: "Notes 2:",
      required: false,
      width : "90px",
      //layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
      wrapping: false}).addStyleClass("marginTop10");

    var oTFNotes2REEntry = new sap.ui.commons.TextField('idTFNotes2REEntry',{
      placeholder: "Notes 2",
      width : "200px"
      //layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"}),
    }).addStyleClass("FormInputStyle marginTop7");

    /* Add Notes 3 */
    var olblNotes3REEntry = new sap.ui.commons.Label({text: "Notes 3:",
      required: false,
      width : "90px",
      //layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
      wrapping: false}).addStyleClass("marginTop10");

    var oTFNotes3REEntry = new sap.ui.commons.TextField('idTFNotes3REEntry',{
      placeholder: "Notes 3",
      width : "200px"
      //layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"}),
    }).addStyleClass("FormInputStyle marginTop7");

    /* Add Notes 4 */
    var olblNotes4REEntry = new sap.ui.commons.Label({text: "Notes 4:",
      required: false,
      width : "90px",
      //layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
      wrapping: false}).addStyleClass("marginTop10");

    var oTFNotes4REEntry = new sap.ui.commons.TextField('idTFNotes4REEntry',{
      placeholder: "Notes 4",
      width : "200px"
      //layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"}),
    }).addStyleClass("FormInputStyle marginTop7");

    /* Add Notes 5 */
    var olblNotes5REEntry = new sap.ui.commons.Label({text: "Notes 5:",
      required: false,
      width : "90px",
      //layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
      wrapping: false}).addStyleClass("marginTop10");

    var oTFNotes5REEntry = new sap.ui.commons.TextField('idTFNotes5REEntry',{
      placeholder: "Notes 5",
      width : "200px"
      //layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"}),
    }).addStyleClass("FormInputStyle marginTop7");

    var oFlxRepNotes = new sap.m.FlexBox({
	  	      items: [
              new sap.m.FlexBox({items: [olblNotes1REEntry, new sap.ui.commons.Label( {text: " ",width : '8px'}), oTFNotes1REEntry],direction: "Row"}),
              new sap.m.FlexBox({items: [olblNotes2REEntry, new sap.ui.commons.Label( {text: " ",width : '8px'}), oTFNotes2REEntry],direction: "Row"}),
              new sap.m.FlexBox({items: [olblNotes3REEntry, new sap.ui.commons.Label( {text: " ",width : '8px'}), oTFNotes3REEntry],direction: "Row"}),
              new sap.m.FlexBox({items: [olblNotes4REEntry, new sap.ui.commons.Label( {text: " ",width : '8px'}), oTFNotes4REEntry],direction: "Row"}),
              new sap.m.FlexBox({items: [olblNotes5REEntry, new sap.ui.commons.Label( {text: " ",width : '8px'}), oTFNotes5REEntry],direction: "Row"}),
            ],
	  	      direction: "Column"
	  	    });

    // MACALPHA19032018_3+

		var olblTopTextREEntry = new sap.ui.commons.Label("idlblEstmtHdrREEntry",{
					layoutData: new sap.ui.layout.GridData({span: "L12 M12 S12",linebreak: false, margin: true}),
					wrapping: true});
		olblTopTextREEntry.setText("Estimate For " + unitNo + " at " + DepoId);

		var olblRJS = new sap.ui.commons.Label({
					layoutData: new sap.ui.layout.GridData({span: "L12 M12 S12",linebreak: false, margin: true}),
					wrapping: true});
		olblRJS.setText("Estimate For Container 2");

		var oFlxRepHeader = new sap.m.FlexBox({
	  	      items: [
                    // MACALPHA19032018_1 - Removed Unit Part Code Information
                    /*olblUnitPCodeREEntryIn,
	  	              new sap.ui.commons.Label( {text: " ",width : '8px'}),
	  	              oDdlUnitPCodeREEntryIn,
	  	              new sap.ui.commons.Label( {text: " ",width : '8px'}),*/
	  	              olblJobTypeREEntry,
	  	              new sap.ui.commons.Label( {text: " ",width : '8px'}),
	  	              oDdlJobTypeREEntry,
	  	              new sap.ui.commons.Label( {text: " ",width : '8px'}),
                    // MACALPHA19032018_3 - Removed Sale Grade information
	  	              /*olblSaleGradeREEntry,
	  	              new sap.ui.commons.Label( {text: " ",width : '8px'}),
	  	              oDdlSaleGradeREEntry,
	  	              new sap.ui.commons.Label( {text: " ",width : '8px'}),*/
	  	              olblEstimatDtREEntry,
	  	              new sap.ui.commons.Label( {text: " ",width : '8px'}),
	  	              oDtPkrEstimateDtREEntry,
	  	              new sap.ui.commons.Label( {text: " ",width : '8px'}),
	  	              olblCurrencyCodeREEntry,
	  	              new sap.ui.commons.Label( {text: " ",width : '8px'}),
	  	              oTFCurrencyCodeREEntry,
	  	              new sap.ui.commons.Label( {text: " ",width : '8px'}),
                    // MACALPHA19032018_3 + Added Cargo Worthy $
                    olblCWREEntry,
	  	              new sap.ui.commons.Label( {text: " ",width : '8px'}),
	  	              oTFCWREEntry,
	  	              new sap.ui.commons.Label( {text: " ",width : '8px'})
	  	              ],
	  	              direction: "Row",
	  	              //layoutData: new sap.ui.layout.GridData({span: "L12 M12 S12",linebreak: false, margin: false}),
	  	    });

		//Form
		 var oRepairEEntryForm = new sap.ui.layout.form.Form("idFrmREEntry", {
				 layout: oRepairEEntryLayout,
				 formContainers: [
						 new sap.ui.layout.form.FormContainer("idFrmCntnrREEntry",{
								//title: "Repair Estimate Entry",
							 formElements: [
												new sap.ui.layout.form.FormElement({
													fields: [olblTopTextREEntry]
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
//												new sap.ui.layout.form.FormElement({
//													fields: [olblEstimatDtREEntry,oDtPkrEstimateDtREEntry,olblLeaseAuthAmtREEntry,oTFLeaseAuthAmtREEntry,olblCurrencyCodeREEntry,oTFCurrencyCodeREEntry]
//												}),
												new sap.ui.layout.form.FormElement({
													fields: [new sap.ui.commons.HorizontalDivider({width: "100%", type: "Area", height: "Medium"}).addStyleClass("marginTop7")]
												})
										 ]
						 })
				 ]
		 });

		 objcurntREEntry.createEnterLineDataLay(oController);

		//REQUEST FOR SECTION
		 jsnReqQueueREOnline.resetfield();
//		 objREstimateOnline.onlinefunSection();
//		 //REQUEST FOR DAMAGE CODE
//		 objREstimateOnline.onlinefunDamageCodeNew();
//		 //REQUEST FOR RESPONSIBILITY
//		 objREstimateOnline.onlinefunResponsibility();
//		 //REQUEST FOR MATERIAL CODE
//		 objREstimateOnline.onlinefunMatrialCodeNew();
		 //REQUEST FOR SELECTED ESTIMATE HEADER
		 if(selEstmtId != ''){
			objREstimateOnline.onlinefunEstimateHdr(unitNo, DepoId, DepoText);
			objREstimateOnline.onlinefunEstmtLineItem();
		 }



			var oBtnInsertLineREEntry10 = new sap.m.Button("idBtnInsertLineREEntry10",{
				  text : "Insert 20 Lines",
				  //width:"100px",
				  type:sap.m.ButtonType.Unstyled,
				  //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: true}),
				  press:function(){
//					sap.ui.getCore().byId("idlblSuccessMsgREE").setText("");
//					sap.ui.getCore().byId("idlblSuccessMsgREE").setVisible(false);
//					objcurntREEntry.insertRowLineItem10();
					oExcelGrid.alter('insert_row', '', 20);
			}}).addStyleClass("submitBtn marginLeft20");

			var oCurrent = this;
	        var oBtnPrintREEntry = new sap.m.Button("idBtnPrintREEntry", {
	            text : "Print",
	            type:sap.m.ButtonType.Unstyled,
	            icon: sap.ui.core.IconPool.getIconURI("print"),
	            press:function(){
	            	var printExcelData = [];
	            	var currExcelData = oExcelGrid.getData();
	            	var currLength = currExcelData.length;
	    	 		for(var i =0; i < currLength; i++){
	    	 			loop1 : for(var j =0; j < 12; j++){
	    	 				//if(currExcelData[i][j] != "" && currExcelData[i][j] != null){
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
	    	 				//}
	    	 			}
	    	 		}

	    	 		  var serialForPrint = sap.ui.getCore().byId("idlblEstmtHdrREEntry").getText().split(' ')[2];
	    	 		  var depotForPrint = sap.ui.getCore().byId("idlblEstmtHdrREEntry").getText().split(' ')[6];
	                  //var depotForPrint = sap.ui.getCore().byId("idComboDepotRESearch").getSelectedKey();
	                  //var serialForPrint = sap.ui.getCore().byId("idSerailNoRESearch").getValue();
	                  var fullDepotForPrint = sap.ui.getCore().byId("idComboDepotRESearch").getValue();
	                  var unitParrtCodeForPrint = sap.ui.getCore().byId("idDdlUnitPCodeREEntry").getValue();
	                  var jobTypeForPrint = sap.ui.getCore().byId("idDdlJobTypeREEntry").getValue();
	                  var estimDateForPrint = sap.ui.getCore().byId("idDtPkrEstimateDtREEntry").getValue();
	                  var saleGradeForPrint = sap.ui.getCore().byId("idDdlSaleGradeREEntry").getValue();
	                  var currencyCodeForPrint = sap.ui.getCore().byId("idTFCurrnCodeREEntry").getValue();
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
	            			  						   "print" );
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
	            	 var printExcelData = [];
		            	var currExcelData = oExcelGrid.getData();
		            	var currLength = currExcelData.length;
		    	 		for(var i =0; i < currLength; i++){
		    	 			loop1 : for(var j =0; j < 12; j++){
		    	 				//if(currExcelData[i][j] != "" && currExcelData[i][j] != null){
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
		    	 				//}
		    	 			}
		    	 		}

		    	 		  var serialForPrint = sap.ui.getCore().byId("idlblEstmtHdrREEntry").getText().split(' ')[2];
		    	 		  var depotForPrint = sap.ui.getCore().byId("idlblEstmtHdrREEntry").getText().split(' ')[6];
		                  //var depotForPrint = sap.ui.getCore().byId("idComboDepotRESearch").getSelectedKey();
		                  //var serialForPrint = sap.ui.getCore().byId("idSerailNoRESearch").getValue();
		                  var fullDepotForPrint = sap.ui.getCore().byId("idComboDepotRESearch").getValue();
		                  var unitParrtCodeForPrint = sap.ui.getCore().byId("idDdlUnitPCodeREEntry").getValue();
		                  var jobTypeForPrint = sap.ui.getCore().byId("idDdlJobTypeREEntry").getValue();
		                  var estimDateForPrint = sap.ui.getCore().byId("idDtPkrEstimateDtREEntry").getValue();
		                  var saleGradeForPrint = sap.ui.getCore().byId("idDdlSaleGradeREEntry").getValue();
		                  var currencyCodeForPrint = sap.ui.getCore().byId("idTFCurrnCodeREEntry").getValue();
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
		            			  						   "excel" );
//			        	  var newWin = window.open('', '', "height=500,width=1000");
//			        	  newWin.document.write(tab);
//			        	  newWin.print();
	             }
	          }).addStyleClass("submitBtn");

			var oFlxPrintButton = new sap.m.FlexBox({
		  	      items: [oBtnInsertLineREEntry10,
		  	              new sap.ui.commons.Label( {text: " ",width : '8px'}),
		  	              oBtnPrintREEntry,
		  	              new sap.ui.commons.Label( {text: " ",width : '8px'}),
		  	              oBtnExcelREEntry],
		  	              direction: "Row",
		  	              //layoutData: new sap.ui.layout.GridData({span: "L12 M12 S12",linebreak: false, margin: false}),
		  	    });

		 var oRepairLines1 = new sap.ui.core.HTML("idRepairLines1").addStyleClass("marginLeft20 marginBottom50");
         var oRepairLines2 = '<div id="idRepairLines2" style="width:100%" class="marginBottom50">';
         oRepairLines1.setContent(oRepairLines2);


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

			var olblhdrTblREEntry =  new sap.ui.commons.Label({text: "Repair Lines",
				layoutData: new sap.ui.layout.GridData({span: "L12 M12 S12"}),
	            wrapping: true}).addStyleClass("marginLeft20 marginTop7 fontTitle");



			var oFlxTblREEntryLines = new sap.m.FlexBox({
		  	      items: [oRepairEEntryForm,
		  	              new sap.ui.commons.Label( {text: " ",width : '8px'}),
		  	              olblhdrTblREEntry,
		  	              new sap.ui.commons.Label( {text: " ",width : '8px'}),
		  	              oFlxPrintButton,
		  	              new sap.ui.commons.Label( {text: " ",width : '8px'}),
		  	              oRepairLines1],
		  	              direction: "Column",
		  	              //layoutData: new sap.ui.layout.GridData({span: "L12 M12 S12",linebreak: false, margin: false}),
		  	    });


			 return oFlxTblREEntryLines;

	},
	clearJointSrvayData: function(){
		//alert('clear');

		//RESET LINE ITEM WHEN COME BACK FROM JOINT SURVEY TO OTHER
		jsnLineItemREEntry.length = 0;
		for(var i =0; i < 10; i++){
		jsnLineItemREEntry.push({"checked":false,"LineItem":padZero(i+1,4),"sectionKey":"",
			"sectionText":"","LocationKey":"",	"LocationText":"",
			"ComponentKey":"","ComponentText":"","DamageKey":"","DamageText":"",
			"RepairKey":"","RepairText":"",	"MaterialKey":"","MaterialText":"","MaterialCost":"",
			"ManHours":"","RepairLength":"","RepairWidth":"","Quantity":"",
			responsibility:[],
			"ResponsibilityKey":"","ResponsibilityText":"","LabourRate":"",
			"TechBulletin":"","DataInserted":false});
		}
		/* Begin of commenting by Seyed Ismail on 28.05.2015 MAC28052015- */
		/*
		var dataReponsibleREEntry = oMdlGlblDDLREEntry.getData().responsibility;
		for(var i =0; i < jsnLineItemREEntry.length; i++){
			jsnLineItemREEntry[i].responsibility.push({"text":"","key":""});
			for(var inx in dataReponsibleREEntry){
				jsnLineItemREEntry[i].responsibility.push({"text":dataReponsibleREEntry[inx].text,"key":dataReponsibleREEntry[inx].key});
			}
		}
		oMdlLineItemREEntry.updateBindings();
		*/
		/* End of commenting by Seyed Ismail on 28.05.2015 MAC28052015- */
		/* Begin of commenting by Seyed Ismail on 21.06.2016 MAC21062016 + */
		/*var dataReponsibleREEntry = oMdlGlblDDLREEntry.getData().responsibility;
		for(var i=0; i < jsnLineItemREEntry.length; i++){
			jsnLineItemREEntry[i].responsibility.length = 0;
			jsnLineItemREEntry[i].responsibility.push({"text":"","key":""});
			for(var j=0; j < 4; j++){
				jsnLineItemREEntry[i].responsibility.push({"text":dataReponsibleREEntry[j].text,"key":dataReponsibleREEntry[j].key});
			}
		}
		oMdlLineItemREEntry.updateBindings();*/
		/* End of commenting by Seyed Ismail on 21.06.2016 MAC21062016 + */

		excelData = [
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

		oExcelGrid.loadData(excelData);
	},
	createLineItemTable: function(){

		/*var olblhdrTblREEntry =  new sap.ui.commons.Label({text: "Repair Lines",
			layoutData: new sap.ui.layout.GridData({span: "L12 M12 S12"}),
            wrapping: true}).addStyleClass("marginTop7 fontTitle");

		var oTblLineItemREEntry = new sap.ui.table.Table(
				'idTblLineItemREEntry',
				{
					visibleRowCount: 10,
					columnHeaderHeight : 50,
					enableColumnReordering: false,
					selectionMode : sap.ui.table.SelectionMode.None,
					navigationMode : sap.ui.table.NavigationMode.None,
					//layoutData: new sap.ui.layout.GridData({span: "L12 M12 S12",linebreak: false, margin: false}),
				}).addStyleClass('tblBorder marginTop7');

		var oChkBxSelectREEntry = new sap.ui.commons.CheckBox({
		    // bind checked property against enabled property in the model
		   // checked: "{/enabled}",
		    change: function(evnt){
		    	var abc =123;
		    }
		}).bindProperty("checked", "checked");

		var oChkBxSelectAllREEntry = new sap.ui.commons.CheckBox({
		    // bind checked property against enabled property in the model
		   // checked: "{/enabled}",
		    change: function(evnt){
		    	for(var i =0; i < jsnLineItemREEntry.length; i++){
					jsnLineItemREEntry[i].checked = this.getChecked();
				}
				oMdlLineItemREEntry.updateBindings();
		    }
		}).bindProperty("checked", "checked");

		oTblLineItemREEntry.addColumn(new sap.ui.table.Column({
			//label : oChkBxSelectAllREEntry,
			template : oChkBxSelectREEntry,
			resizable:false,
			width : "30px"
		}));

		oTblLineItemREEntry.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Line Item",
			}),
			template : new sap.ui.commons.TextView()
					.bindProperty("text", "LineItem"),
			resizable:false,
			width : "60px"
		}));

		oTblLineItemREEntry.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Location Code",
			}),
			template : new sap.ui.commons.TextField("idLc",
					{change: upperOnChangeTF})
					.bindProperty("value", "LocationKey").addStyleClass("borderStyle"),
			resizable:false,
			width : "90px"
		}));

		oTblLineItemREEntry.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Component Code",
			}),
			template : new sap.ui.commons.TextField("idCc",
					{change: upperOnChangeTF,maxLength:3})
					.bindProperty("value", "ComponentKey").addStyleClass("borderStyle"),
			resizable:false,
			width : "110px"
		}));

		oTblLineItemREEntry.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Damage Code",
			}),
			template : new sap.ui.commons.TextField("idDc",{change: upperOnChangeTF})
					.bindProperty("value", "DamageKey").addStyleClass("borderStyle"),
			resizable:false,
			width : "90px"
		}));

		oTblLineItemREEntry.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Material Code",
			}),
			template : new sap.ui.commons.TextField("idMk",{change: upperOnChangeTF})
					.bindProperty("value", "MaterialKey").addStyleClass("borderStyle"),
			resizable:false,
			width : "90px"
		}));

		oTblLineItemREEntry.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Repair Code",
			}),
			template : new sap.ui.commons.TextField("idRc",{change: upperOnChangeTF})
					.bindProperty("value", "RepairKey").addStyleClass("borderStyle"),
			resizable:false,
			width : "90px"
		}));

		oTblLineItemREEntry.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Repair Length"
			}),
			template : new sap.ui.commons.TextField("idRl",{change: upperOnChangeTF})
					.bindProperty("value", "RepairLength").addStyleClass("borderStyle"),
			resizable:false,
			width : "90px"
		}));

		oTblLineItemREEntry.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Repair Width"
			}),
			template : new sap.ui.commons.TextField("idRw",{change: upperOnChangeTF})
					.bindProperty("value", "RepairWidth").addStyleClass("borderStyle"),
			resizable:false,
			width : "90px"
		}));

		oTblLineItemREEntry.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Quantity"
			}),
			template : new sap.ui.commons.TextField("idQu", {change: upperOnChangeTF})
					.bindProperty("value", "Quantity").addStyleClass("borderStyle"),
			resizable:false,
			width : "90px"
		}));

		oTblLineItemREEntry.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Man Hours"
			}),
			template : new sap.ui.commons.TextField("idMh",{change: upperOnChangeTF})
					.bindProperty("value", "ManHours").addStyleClass("borderStyle"),
			resizable:false,
			width : "90px"
		}));

		oTblLineItemREEntry.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Material Cost"
			}),
			template : new sap.ui.commons.TextField("idMc",{change: upperOnChangeTF})
					.bindProperty("value", "MaterialCost").addStyleClass("borderStyle"),
			resizable:false,
			width : "90px"
		}));

		oTblLineItemREEntry.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Labour Rate"
			}),
			template : new sap.ui.commons.TextField("idLr",{change: upperOnChangeTF})
					.bindProperty("value", "LabourRate").addStyleClass("borderStyle"),
			resizable:false,
			width : "90px"
		}));

		oTblLineItemREEntry.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Bullet In Number",
			}),
			template : new sap.ui.commons.TextField("idTb",{change: upperOnChangeTF})
					.bindProperty("value", "TechBulletin").addStyleClass("borderStyle"),
			resizable:false,
			width : "90px"
		}));

		var oDdlTblResponsibilityREEntry = new sap.ui.commons.DropdownBox({
			  layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"}),
			  width:"100%",
	          displaySecondaryValues:false,
			  placeholder: "Select Responsibility",
		}).addStyleClass("borderStyle");
	    //oDdlTblResponsibilityREEntry.setModel(oMdlGlblDDLREEntry);
		oDdlTblResponsibilityREEntry.bindAggregation("items", "responsibility", oItmTmpltGlblDDLREEntry);
		oDdlTblResponsibilityREEntry.bindProperty("selectedKey", "ResponsibilityKey");
		//oDdlTblResponsibilityREEntry.insertItem(new sap.ui.core.ListItem({text:"",key:""}),0);

		oTblLineItemREEntry.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Responsibility",
			}),
			template : oDdlTblResponsibilityREEntry, //new sap.ui.commons.TextField().bindProperty("value", "ResponsibilityKey").addStyleClass("borderStyle"),
			resizable:false,
			width : "160px"
		}));

		//oMdlLineItemREEntry.setData({modelData : jsnData});
		//oTblLineItemREEntry.setVisibleRowCount(jsnData.length);
		oMdlLineItemREEntry.setData({modelData : jsnLineItemREEntry});
		oTblLineItemREEntry.setModel(oMdlLineItemREEntry);
		oTblLineItemREEntry.bindRows("/modelData");




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










		var oFlxTblREEntry = new sap.m.FlexBox({
	  	      items: [olblhdrTblREEntry, oLinesButton],
	  	      direction: "Column",
				  //layoutData: new sap.ui.layout.GridData({span: "L12 M12 S12",linebreak: false, margin: false}),
	  	    });

		return oFlxTblREEntry;*/
	},






	insertRowLineItem10: function(){
		var oTblLineItemREEntry = sap.ui.getCore().byId("idTblLineItemREEntry");
		/*var oidDdlSectionREEntry = sap.ui.getCore().byId("idDdlSectionREEntry");
		var oidDdlLocationREEntry = sap.ui.getCore().byId("idDdlLocationREEntry");
		var oidDdlComponentREEntry = sap.ui.getCore().byId("idDdlComponentREEntry");
		var oidDdlDamageREEntry = sap.ui.getCore().byId("idDdlDamageREEntry");
		var oidDdlRepairREEntry = sap.ui.getCore().byId("idDdlRepairREEntry");
		var oidDdlMaterialCodeREEntry = sap.ui.getCore().byId("idDdlMaterialCodeREEntry");
		var oidTFMaterialCostREEntry = sap.ui.getCore().byId("idTFMaterialCostREEntry");
		var oidTFManHoursREEntry = sap.ui.getCore().byId("idTFManHoursREEntry");
		var oidTFRepairLengthREEntry = sap.ui.getCore().byId("idTFRepairLengthREEntry");
		var oidTFRepairWidthREEntry = sap.ui.getCore().byId("idTFRepairWidthREEntry");
		var oidTFQuantityREEntry = sap.ui.getCore().byId("idTFQuantityREEntry");
		var oidDdlResponsibilityREEntry = sap.ui.getCore().byId("idDdlResponsibilityREEntry");
		var oidTFLabourRateREEntry = sap.ui.getCore().byId("idTFLabourRateREEntry");
		var oidTFTechBulletinREEntry = sap.ui.getCore().byId("idTFTechBulletinREEntry");
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
				var dataReponsibleREEntry = oMdlGlblDDLREEntry.getData().responsibility;
				for(var inx in dataReponsibleREEntry){
					oNewEntry.responsibility.push({"text":dataReponsibleREEntry[inx].text,"key":dataReponsibleREEntry[inx].key});
			}

			jsnLineItemREEntry.push(oNewEntry);
			jsnLineItemREEntry.resetSequence('LineItem',4);

		}
		if(jsnLineItemREEntry.length < 11){
			oTblLineItemREEntry.setNavigationMode(sap.ui.table.NavigationMode.None);
		}else{
			oTblLineItemREEntry.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		}

		oMdlLineItemREEntry.updateBindings();
	},



	insertRowLineItem: function(){
		var oTblLineItemREEntry = sap.ui.getCore().byId("idTblLineItemREEntry");
		var oidDdlSectionREEntry = sap.ui.getCore().byId("idDdlSectionREEntry");
		var oidDdlLocationREEntry = sap.ui.getCore().byId("idDdlLocationREEntry");
		var oidDdlComponentREEntry = sap.ui.getCore().byId("idDdlComponentREEntry");
		var oidDdlDamageREEntry = sap.ui.getCore().byId("idDdlDamageREEntry");
		var oidDdlRepairREEntry = sap.ui.getCore().byId("idDdlRepairREEntry");
		var oidDdlMaterialCodeREEntry = sap.ui.getCore().byId("idDdlMaterialCodeREEntry");
		var oidTFMaterialCostREEntry = sap.ui.getCore().byId("idTFMaterialCostREEntry");
		var oidTFManHoursREEntry = sap.ui.getCore().byId("idTFManHoursREEntry");
		var oidTFRepairLengthREEntry = sap.ui.getCore().byId("idTFRepairLengthREEntry");
		var oidTFRepairWidthREEntry = sap.ui.getCore().byId("idTFRepairWidthREEntry");
		var oidTFQuantityREEntry = sap.ui.getCore().byId("idTFQuantityREEntry");
		var oidDdlResponsibilityREEntry = sap.ui.getCore().byId("idDdlResponsibilityREEntry");
		var oidTFLabourRateREEntry = sap.ui.getCore().byId("idTFLabourRateREEntry");
		var oidTFTechBulletinREEntry = sap.ui.getCore().byId("idTFTechBulletinREEntry");
		var dataupdate = false;

		for(var i =0; i < jsnLineItemREEntry.length;i++)
		{
			//if(jsnLineItemREEntry[i].DataInserted == false){
			if((jsnLineItemREEntry[i].LocationKey == '') &&
				(jsnLineItemREEntry[i].ComponentKey == '') &&
				(jsnLineItemREEntry[i].DamageKey == '') &&
				(jsnLineItemREEntry[i].MaterialKey == '') &&
				(jsnLineItemREEntry[i].RepairKey == '') &&
				(jsnLineItemREEntry[i].RepairLength == '') &&
				(jsnLineItemREEntry[i].RepairWidth == '') &&
				(jsnLineItemREEntry[i].Quantity == '') &&
				(jsnLineItemREEntry[i].ManHours == '') &&
				(jsnLineItemREEntry[i].MaterialCost == '') &&
				(jsnLineItemREEntry[i].LabourRate == '') &&
				(jsnLineItemREEntry[i].TechBulletin == '') &&
				(jsnLineItemREEntry[i].ResponsibilityKey == '')){
				dataupdate = true;
				jsnLineItemREEntry[i].checked=false;
				//jsnLineItemREEntry[i].LineItem="";
				jsnLineItemREEntry[i].sectionKey = oidDdlSectionREEntry.getSelectedKey();
				jsnLineItemREEntry[i].sectionText = oidDdlSectionREEntry.getValue();
				jsnLineItemREEntry[i].LocationKey = oidDdlLocationREEntry.getSelectedKey();
				jsnLineItemREEntry[i].LocationText = oidDdlLocationREEntry.getValue();
				jsnLineItemREEntry[i].ComponentKey= oidDdlComponentREEntry.getSelectedKey();
				jsnLineItemREEntry[i].ComponentText= oidDdlComponentREEntry.getValue();
				jsnLineItemREEntry[i].DamageKey= oidDdlDamageREEntry.getSelectedKey();
				jsnLineItemREEntry[i].DamageText= oidDdlDamageREEntry.getValue();
				jsnLineItemREEntry[i].RepairKey= oidDdlRepairREEntry.getSelectedKey();
				jsnLineItemREEntry[i].RepairText= oidDdlRepairREEntry.getValue();
				jsnLineItemREEntry[i].MaterialKey= oidDdlMaterialCodeREEntry.getSelectedKey();
				jsnLineItemREEntry[i].MaterialText= oidDdlMaterialCodeREEntry.getValue();
				jsnLineItemREEntry[i].MaterialCost= oidTFMaterialCostREEntry.getValue();
				jsnLineItemREEntry[i].ManHours= oidTFManHoursREEntry.getValue();
				jsnLineItemREEntry[i].RepairLength= oidTFRepairLengthREEntry.getValue();
				jsnLineItemREEntry[i].RepairWidth= oidTFRepairWidthREEntry.getValue();
				jsnLineItemREEntry[i].Quantity= oidTFQuantityREEntry.getValue();
				jsnLineItemREEntry[i].ResponsibilityKey=oidDdlResponsibilityREEntry.getSelectedKey();
				jsnLineItemREEntry[i].ResponsibilityText= oidDdlResponsibilityREEntry.getValue();
				jsnLineItemREEntry[i].LabourRate= oidTFLabourRateREEntry.getValue();
				jsnLineItemREEntry[i].TechBulletin= oidTFTechBulletinREEntry.getValue();
				jsnLineItemREEntry[i].DataInserted =true;
				break;
			}
		}
		if(!dataupdate){
			oNewEntry ={};
			oNewEntry.checked=false;
			oNewEntry.LineItem="";
			oNewEntry.sectionKey = oidDdlSectionREEntry.getSelectedKey();
			oNewEntry.sectionText = oidDdlSectionREEntry.getValue();
			oNewEntry.LocationKey = oidDdlLocationREEntry.getSelectedKey();
			oNewEntry.LocationText = oidDdlLocationREEntry.getValue();
			oNewEntry.ComponentKey= oidDdlComponentREEntry.getSelectedKey();
			oNewEntry.ComponentText= oidDdlComponentREEntry.getValue();
			oNewEntry.DamageKey= oidDdlDamageREEntry.getSelectedKey();
			oNewEntry.DamageText= oidDdlDamageREEntry.getValue();
			oNewEntry.RepairKey= oidDdlRepairREEntry.getSelectedKey();
			oNewEntry.RepairText= oidDdlRepairREEntry.getValue();
			oNewEntry.MaterialKey= oidDdlMaterialCodeREEntry.getSelectedKey();
			oNewEntry.MaterialText= oidDdlMaterialCodeREEntry.getValue();
			oNewEntry.MaterialCost= oidTFMaterialCostREEntry.getValue();
			oNewEntry.ManHours= oidTFManHoursREEntry.getValue();
			oNewEntry.RepairLength= oidTFRepairLengthREEntry.getValue();
			oNewEntry.RepairWidth= oidTFRepairWidthREEntry.getValue();
			oNewEntry.Quantity= oidTFQuantityREEntry.getValue();
			oNewEntry.ResponsibilityKey=oidDdlResponsibilityREEntry.getSelectedKey();
			oNewEntry.ResponsibilityText= oidDdlResponsibilityREEntry.getValue();
			oNewEntry.LabourRate= oidTFLabourRateREEntry.getValue();
			oNewEntry.TechBulletin= oidTFTechBulletinREEntry.getValue();
			oNewEntry.DataInserted = true;
			oNewEntry.responsibility = [];
			oNewEntry.responsibility.push({"text":"","key":""});
				var dataReponsibleREEntry = oMdlGlblDDLREEntry.getData().responsibility;
				for(var inx in dataReponsibleREEntry){
					oNewEntry.responsibility.push({"text":dataReponsibleREEntry[inx].text,"key":dataReponsibleREEntry[inx].key});
				}

			jsnLineItemREEntry.push(oNewEntry);
			jsnLineItemREEntry.resetSequence('LineItem',4);
		}

		if(jsnLineItemREEntry.length < 6){
			oTblLineItemREEntry.setNavigationMode(sap.ui.table.NavigationMode.None);
		}else{
			oTblLineItemREEntry.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		}
		oMdlLineItemREEntry.updateBindings();
	},

	deleteRowModelTable: function(){
		var oTblLineItemREEntry = sap.ui.getCore().byId("idTblLineItemREEntry");
		jsnLineItemREEntry.removeValue('checked', true);

		/*if(selEstmtId == ''){
			jsnLineItemREEntry.removeValue('checked', true);
		}else if(selEstmtId != ''){
			objcurntREEntry.onlinefunDeleteLine();
		}*/
		//jsnLineItemREEntry.resetSequence('LineItem',5)
		oMdlLineItemREEntry.updateBindings();

		if(jsnLineItemREEntry.length < 6){
			oTblLineItemREEntry.setNavigationMode(sap.ui.table.NavigationMode.None);
		}else{
			oTblLineItemREEntry.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		}
	},

	fnDeleteLineMsgBox: function(sResult){
		if(sResult == "YES"){
			objcurntREEntry.deleteRowModelTable();
		}
	},
	//DELETE ONLINE LINE ITEM
	onlinesuccessfunDeleteLine: function(resultdata, response){
		busyDialog.close();
		if(resultdata != undefined){
			if(resultdata.results.length > 0){
				jsnLineItemREEntry.removeValue('checked', true);
				//sap.ui.commons.MessageBox.alert(resultdata.results[0].Msg);
			}
		}

		oMdlLineItemREEntry.updateBindings();
		var oTblLineItemREEntry = sap.ui.getCore().byId("idTblLineItemREEntry");
		if(jsnLineItemREEntry.length < 6){
			oTblLineItemREEntry.setNavigationMode(sap.ui.table.NavigationMode.None);
		}else{
			oTblLineItemREEntry.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
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

			for(var i=0; i<jsnLineItemREEntry.length; i++){
				if((jsnLineItemREEntry[i].checked == true)&&(cntlineitem < 34)) {
					urlToCall += jsnLineItemREEntry[i].LineItem + '$'
					cntlineitem++;
				}else if((jsnLineItemREEntry[i].checked == true)&&(cntlineitem > 33)&&(cntlineitem < 67)) {
					if(cntlineitem == 34){
						urlToCall = urlToCall.slice(0,urlToCall.length-1);
						urlToCall += "' and DelLn2 eq '"
					}
					urlToCall += jsnLineItemREEntry[i].LineItem + '$'
					cntlineitem++;
				}else if((jsnLineItemREEntry[i].checked == true)&&(cntlineitem > 66)&&(cntlineitem < 101)) {
					if(cntlineitem == 67){
						urlToCall = urlToCall.slice(0,urlToCall.length-1);
						urlToCall += "' and DelLn3 eq '"
					}
					urlToCall += jsnLineItemREEntry[i].LineItem + '$'
					cntlineitem++;
				}else if(cntlineitem > 100){
					jsnLineItemREEntry[i].checked = false;
				}
			}
			urlToCall = urlToCall.slice(0,urlToCall.length-1);
			urlToCall += "'";
		    objUtilREstimate.doOnlineRequest(urlToCall,objcurntREEntry.onlinesuccessfunDeleteLine, objcurntREEntry.onlineerrorfunDeleteLine);
		}catch(e){
			busyDialog.close();
			sap.ui.commons.MessageBox.alert("Error on fetching Repair data " + e);
		}
	},

	fnResetCallbackMsgBox: function(sResult){
		//alert("sResult" + sResult);
		if(sResult == "YES"){
			var oTblLineItemREEntry = sap.ui.getCore().byId("idTblLineItemREEntry");
			var oidDdlSectionREEntry = sap.ui.getCore().byId("idDdlSectionREEntry");
			var oidDdlLocationREEntry = sap.ui.getCore().byId("idDdlLocationREEntry");
			var oidDdlComponentREEntry = sap.ui.getCore().byId("idDdlComponentREEntry");
			var oidDdlDamageREEntry = sap.ui.getCore().byId("idDdlDamageREEntry");
			var oidDdlRepairREEntry = sap.ui.getCore().byId("idDdlRepairREEntry");
			var oidDdlMaterialCodeREEntry = sap.ui.getCore().byId("idDdlMaterialCodeREEntry");
			var oidTFMaterialCostREEntry = sap.ui.getCore().byId("idTFMaterialCostREEntry");
			var oidTFManHoursREEntry = sap.ui.getCore().byId("idTFManHoursREEntry");
			var oidTFRepairLengthREEntry = sap.ui.getCore().byId("idTFRepairLengthREEntry");
			var oidTFRepairWidthREEntry = sap.ui.getCore().byId("idTFRepairWidthREEntry");
			var oidTFQuantityREEntry = sap.ui.getCore().byId("idTFQuantityREEntry");
			var oidDdlResponsibilityREEntry = sap.ui.getCore().byId("idDdlResponsibilityREEntry");
			var oidTFLabourRateREEntry = sap.ui.getCore().byId("idTFLabourRateREEntry");
			var oidTFTechBulletinREEntry = sap.ui.getCore().byId("idTFTechBulletinREEntry");

			oidDdlSectionREEntry.setValueState(sap.ui.core.ValueState.None);
			oidDdlSectionREEntry.setPlaceholder("Select Section");
			oidDdlSectionREEntry.setSelectedKey('');

			oidDdlLocationREEntry.setValueState(sap.ui.core.ValueState.None);
			oidDdlLocationREEntry.setPlaceholder("Select Location");
			oidDdlLocationREEntry.setSelectedKey('');
			oidDdlLocationREEntry.destroyItems();
			if(oidDdlLocationREEntry._oListBox != undefined)
					oidDdlLocationREEntry._oListBox.setVisibleItems(0);

			oidDdlComponentREEntry.setValueState(sap.ui.core.ValueState.None);
			oidDdlComponentREEntry.setPlaceholder("Select Component");
			oidDdlComponentREEntry.setSelectedKey('');
			oidDdlComponentREEntry.destroyItems();
			if(oidDdlComponentREEntry._oListBox != undefined)
					oidDdlComponentREEntry._oListBox.setVisibleItems(0);

			oidDdlDamageREEntry.setValueState(sap.ui.core.ValueState.None);
			oidDdlDamageREEntry.setPlaceholder("Select Damage");
			oidDdlDamageREEntry.setSelectedKey('');

			oidDdlRepairREEntry.setValueState(sap.ui.core.ValueState.None);
			oidDdlRepairREEntry.setPlaceholder("Select Repair");
			oidDdlRepairREEntry.setSelectedKey('');
			oidDdlRepairREEntry.destroyItems();
			if(oidDdlRepairREEntry._oListBox != undefined)
					oidDdlRepairREEntry._oListBox.setVisibleItems(0);

			oidDdlMaterialCodeREEntry.setValueState(sap.ui.core.ValueState.None);
			oidDdlMaterialCodeREEntry.setPlaceholder("Select Material Code");
			oidDdlMaterialCodeREEntry.setSelectedKey('');

			oidTFMaterialCostREEntry.setValueState(sap.ui.core.ValueState.None);
			oidTFMaterialCostREEntry.setPlaceholder("Material Cost");
			oidTFMaterialCostREEntry.setValue('');

			oidTFManHoursREEntry.setValueState(sap.ui.core.ValueState.None);
			oidTFManHoursREEntry.setPlaceholder("Man Hours");
			oidTFManHoursREEntry.setValue('');

			oidTFRepairLengthREEntry.setValueState(sap.ui.core.ValueState.None);
			oidTFRepairLengthREEntry.setPlaceholder("Repair Length");
			oidTFRepairLengthREEntry.setValue('');

			oidTFRepairWidthREEntry.setValueState(sap.ui.core.ValueState.None);
			oidTFRepairWidthREEntry.setPlaceholder("Repair Width");
			oidTFRepairWidthREEntry.setValue('');

			oidTFQuantityREEntry.setValueState(sap.ui.core.ValueState.None);
			oidTFQuantityREEntry.setPlaceholder("Quantity");
			oidTFQuantityREEntry.setValue('');

			oidDdlResponsibilityREEntry.setValueState(sap.ui.core.ValueState.None);
			oidDdlResponsibilityREEntry.setPlaceholder("Select Responsibility");
			oidDdlResponsibilityREEntry.setSelectedKey('');

			oidTFLabourRateREEntry.setValueState(sap.ui.core.ValueState.None);
			oidTFLabourRateREEntry.setPlaceholder("Labour Rate");
			oidTFLabourRateREEntry.setValue('');

			oidTFTechBulletinREEntry.setValueState(sap.ui.core.ValueState.None);
			oidTFTechBulletinREEntry.setPlaceholder("Tech Bulletin");
			oidTFTechBulletinREEntry.setValue('');

			//jsnLineItemREEntry.length = 0;
			//oMdlLineItemREEntry.setData({modelData : jsnLineItemREEntry});
			//oTblLineItemREEntry.setNavigationMode(sap.ui.table.NavigationMode.None);

		}
	},

	createEnterLineDataLay: function(oController){
		var oFrmCntnrREEntry = sap.ui.getCore().byId("idFrmCntnrREEntry");
		//INSERT TABLE
		/*var frmHdrEntrLinDataREEntry = new sap.ui.layout.form.FormElement({
		    fields: [objcurntREEntry.createLineItemTable()]
		});
		oFrmCntnrREEntry.addFormElement(frmHdrEntrLinDataREEntry); */

		//HEADER TEXT FOR INSERT LIND DATA
		// MACISMAILBEGIN
//		var frmHdrEntrLinDataREEntry = new sap.ui.layout.form.FormElement({
//		    fields: [new sap.ui.commons.Label({text: "Enter Line Data",
//				layoutData: new sap.ui.layout.GridData({span: "L12 M12 S12"}),
//	            wrapping: true}).addStyleClass("marginTop10 fontTitle")]
//		});
//		oFrmCntnrREEntry.addFormElement(frmHdrEntrLinDataREEntry);
//
//		//FIRST ROW
//		var olblSectionREEntry = new sap.ui.commons.Label({text: "Section:",
//			//required: true,
//			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
//            wrapping: false}).addStyleClass("marginTop10");
//
//		var oDdlSectionREEntry = new sap.ui.commons.DropdownBox("idDdlSectionREEntry", {
//			  layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"}),
//			  width:"100%",
//	          displaySecondaryValues:false,
//			  placeholder: "Select Section",
//			  change: function(evnt){
//				sap.ui.getCore().byId("idDdlLocationREEntry").destroyItems();
//				if(sap.ui.getCore().byId("idDdlLocationREEntry")._oListBox != undefined)
//					sap.ui.getCore().byId("idDdlLocationREEntry")._oListBox.setVisibleItems(0);
//
//				sap.ui.getCore().byId("idDdlComponentREEntry").destroyItems();
//				if(sap.ui.getCore().byId("idDdlComponentREEntry")._oListBox != undefined)
//					sap.ui.getCore().byId("idDdlComponentREEntry")._oListBox.setVisibleItems(0);
//
//				if(this.getValue() != '')
//				{
//					this.setValueState(sap.ui.core.ValueState.None);
//					this.setPlaceholder("Select Section");
//
//					objcurntREEntry.onlinefunLocationNew(this.getSelectedKey());
//				}
//	          },
//		}).addStyleClass("FormInputStyle marginTop7");
//
//		//oDdlSectionREEntry.insertItem((new sap.ui.core.ListItem({text:"Select Customer", key:"0"})),0);
//
//		var olblLocationREEntry = new sap.ui.commons.Label({text: "Location:",
//			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
//            wrapping: false}).addStyleClass("marginTop10");
//
//		var oDdlLocationREEntry = new sap.ui.commons.DropdownBox("idDdlLocationREEntry", {
//			  layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"}),
//			  width:"100%",
//	          displaySecondaryValues:false,
//			  placeholder: "Select Location",
//			  change: function(evnt){
//				sap.ui.getCore().byId("idDdlComponentREEntry").destroyItems();
//				if(sap.ui.getCore().byId("idDdlComponentREEntry")._oListBox != undefined)
//					sap.ui.getCore().byId("idDdlComponentREEntry")._oListBox.setVisibleItems(0);
//
//				if(this.getValue() != '')
//				{
//					this.setValueState(sap.ui.core.ValueState.None);
//					this.setPlaceholder("Select Location");
//
//					objcurntREEntry.onlinefunComponentNew(this.getSelectedKey());
//				}
//	          },
//		}).addStyleClass("FormInputStyle marginTop7");
//
//
//		var olblComponentREEntry = new sap.ui.commons.Label({text: "Component:",
//			//required: true,
//			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
//            wrapping: false}).addStyleClass("marginTop10");
//
//		var oDdlComponentREEntry = new sap.ui.commons.DropdownBox("idDdlComponentREEntry", {
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
//		var frmFirsRowREEntry = new sap.ui.layout.form.FormElement({
//		    fields: [olblSectionREEntry,oDdlSectionREEntry,olblLocationREEntry,oDdlLocationREEntry,olblComponentREEntry,oDdlComponentREEntry]
//		});
//		oFrmCntnrREEntry.addFormElement(frmFirsRowREEntry);
//
//		//SECOND ROW
//		var olblDamageREEntry = new sap.ui.commons.Label({text: "Damage:",
//			//required: true,
//			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
//            wrapping: false}).addStyleClass("marginTop10");
//
//		var oDdlDamageREEntry = new sap.ui.commons.DropdownBox("idDdlDamageREEntry", {
//			  layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"}),
//			  width:"100%",
//	          displaySecondaryValues:false,
//			  placeholder: "Select Damage",
//			  change: function(evnt){
//				sap.ui.getCore().byId("idDdlRepairREEntry").destroyItems();
//				if(sap.ui.getCore().byId("idDdlRepairREEntry")._oListBox != undefined)
//					sap.ui.getCore().byId("idDdlRepairREEntry")._oListBox.setVisibleItems(0);
//
//				if(this.getValue() != '')
//				{
//					this.setValueState(sap.ui.core.ValueState.None);
//					this.setPlaceholder("Select Damage");
//					objcurntREEntry.onlinefunRepairNew(this.getSelectedKey());
//
//				}
//	          },
//		}).addStyleClass("FormInputStyle marginTop7");
//
//		var olblRepairREEntry = new sap.ui.commons.Label({text: "Repair:",
//			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
//            wrapping: false}).addStyleClass("marginTop10");
//
//		var oDdlRepairREEntry = new sap.ui.commons.DropdownBox("idDdlRepairREEntry", {
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
//		var olblMaterialCodeREEntry = new sap.ui.commons.Label({text: "Material Code:",
//			//required: true,
//			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
//            wrapping: false}).addStyleClass("marginTop10");
//
//		var oidDdlMaterialCodeREEntry = new sap.ui.commons.DropdownBox("idDdlMaterialCodeREEntry", {
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
//		frmFirsRowREEntry = new sap.ui.layout.form.FormElement({
//		    fields: [olblDamageREEntry,oDdlDamageREEntry,olblRepairREEntry,oDdlRepairREEntry,olblMaterialCodeREEntry,oidDdlMaterialCodeREEntry]
//		});
//		oFrmCntnrREEntry.addFormElement(frmFirsRowREEntry);
//
//		//THIRD ROW
//		var olblMaterialCostREEntry = new sap.ui.commons.Label({text: "Material Cost:",
//			//required: true,
//			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
//            wrapping: false}).addStyleClass("marginTop10");
//
//		var oTFMaterialCostREEntry = new sap.ui.commons.TextField('idTFMaterialCostREEntry',{
//    		placeholder: "Material Cost",
//			//width:"85%",
//    		layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"}),
//    	}).addStyleClass("FormInputStyle marginTop7");
//
//		oTFMaterialCostREEntry.onfocusin =  function(e) {
//			this.setValueState(sap.ui.core.ValueState.None);
//			this.setPlaceholder("Material Cost");
//	      };
//
//		oTFMaterialCostREEntry.onkeyup = function(evnt){
//			addSeparator(document.getElementById(this.sId));
//		};
//		oTFMaterialCostREEntry.onkeydown = function(e){
//			validateNumeric(event,true);
//		};
//		oTFMaterialCostREEntry.onpaste = function(e){
//			e.preventDefault();
//		};
//
//		var olblManHoursREEntry = new sap.ui.commons.Label({text: "Man Hours:",
//			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
//            wrapping: false}).addStyleClass("marginTop10");
//
//		var oTFManHoursREEntry = new sap.ui.commons.TextField('idTFManHoursREEntry',{
//    		placeholder: "Man Hours",
//			//width:"85%",
//    		layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"}),
//    	}).addStyleClass("FormInputStyle marginTop7");
//
//		oTFManHoursREEntry.onfocusin =  function(e) {
//			this.setValueState(sap.ui.core.ValueState.None);
//			this.setPlaceholder("Man Hours");
//	      };
//
//	      oTFManHoursREEntry.onkeyup = function(evnt){
//				addSeparator(document.getElementById(this.sId));
//			};
//			oTFManHoursREEntry.onkeydown = function(e){
//				validateNumeric(event,true);
//			};
//			oTFManHoursREEntry.onpaste = function(e){
//				e.preventDefault();
//			};
//
//		var olblRepairLengthREEntry = new sap.ui.commons.Label({text: "Repair Length:",
//			//required: true,
//			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
//            wrapping: false}).addStyleClass("marginTop10");
//
//		var oTFRepairLengthREEntry = new sap.ui.commons.TextField('idTFRepairLengthREEntry',{
//    		placeholder: "Repair Length",
//			//width:"85%",
//    		layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"}),
//    	}).addStyleClass("FormInputStyle marginTop7");
//
//		oTFRepairLengthREEntry.onfocusin =  function(e) {
//			this.setValueState(sap.ui.core.ValueState.None);
//			this.setPlaceholder("Repair Length");
//	      };
//
//	    oTFRepairLengthREEntry.onkeyup = function(evnt){
//			addSeparator(document.getElementById(this.sId));
//		};
//		oTFRepairLengthREEntry.onkeydown = function(e){
//			validateNumeric(event,true);
//		};
//		oTFRepairLengthREEntry.onpaste = function(e){
//			e.preventDefault();
//		};
//
//
//		frmFirsRowREEntry = new sap.ui.layout.form.FormElement({
//		    fields: [olblMaterialCostREEntry,oTFMaterialCostREEntry,olblManHoursREEntry,oTFManHoursREEntry,olblRepairLengthREEntry,oTFRepairLengthREEntry]
//		});
//		oFrmCntnrREEntry.addFormElement(frmFirsRowREEntry);
//
//		//FOURTH ROW
//		var olblRepairWidthREEntry = new sap.ui.commons.Label({text: "Repair Width:",
//			//required: true,
//			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
//            wrapping: false}).addStyleClass("marginTop10");
//
//		var oTFRepairWidthREEntry = new sap.ui.commons.TextField('idTFRepairWidthREEntry',{
//    		placeholder: "Repair Width",
//			//width:"85%",
//    		layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"}),
//    	}).addStyleClass("FormInputStyle marginTop7");
//
//		oTFRepairWidthREEntry.onfocusin =  function(e) {
//			this.setValueState(sap.ui.core.ValueState.None);
//			this.setPlaceholder("Repair Width");
//	      };
//
//	    oTFRepairWidthREEntry.onkeyup = function(evnt){
//			addSeparator(document.getElementById(this.sId));
//		};
//		oTFRepairWidthREEntry.onkeydown = function(e){
//			validateNumeric(event,true);
//		};
//		oTFRepairWidthREEntry.onpaste = function(e){
//			e.preventDefault();
//		};
//
//		var olblQuantityREEntry = new sap.ui.commons.Label({text: "Quantity:",
//			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
//            wrapping: false}).addStyleClass("marginTop10");
//
//		var oTFQuantityREEntry = new sap.ui.commons.TextField('idTFQuantityREEntry',{
//    		placeholder: "Quantity",
//			//width:"85%",
//    		layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"}),
//    	}).addStyleClass("FormInputStyle marginTop7");
//
//		oTFQuantityREEntry.onfocusin =  function(e) {
//			this.setValueState(sap.ui.core.ValueState.None);
//			this.setPlaceholder("Quantity");
//	      };
//
//	    oTFQuantityREEntry.onkeyup = function(evnt){
//			addSeparator(document.getElementById(this.sId));
//		};
//		oTFQuantityREEntry.onkeydown = function(e){
//			validateNumeric(event,true);
//		};
//		oTFQuantityREEntry.onpaste = function(e){
//			e.preventDefault();
//		};
//
//		var olblResponsibilityREEntry = new sap.ui.commons.Label({text: "Responsibility:",
//			//required: true,
//			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
//            wrapping: false}).addStyleClass("marginTop10");
//
//		var oDdlResponsibilityREEntry = new sap.ui.commons.ComboBox("idDdlResponsibilityREEntry", {
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
//	    //oDdlResponsibilityREEntry.setModel(omdlGlobalRESData);
//		//oDdlResponsibilityREEntry.bindItems("/Responsibility", oItmTmpltGloabREEntry);
//		sap.ui.getCore().byId("idDdlResponsibilityREEntry").removeAllItems();
//		frmFirsRowREEntry = new sap.ui.layout.form.FormElement({
//		    fields: [olblRepairWidthREEntry,oTFRepairWidthREEntry,olblQuantityREEntry,oTFQuantityREEntry,olblResponsibilityREEntry,oDdlResponsibilityREEntry]
//		});
//		oFrmCntnrREEntry.addFormElement(frmFirsRowREEntry);
//
//		//FIFTH ROW
//		var olblLabourRateREEntry = new sap.ui.commons.Label({text: "Labour Rate:",
//			//required: true,
//			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
//            wrapping: false}).addStyleClass("marginTop10");
//
//		var oTFLabourRateREEntry = new sap.ui.commons.TextField('idTFLabourRateREEntry',{
//    		placeholder: "Labour Rate",
//			//width:"85%",
//    		layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"}),
//    	}).addStyleClass("FormInputStyle marginTop7");
//
//		oTFLabourRateREEntry.onfocusin =  function(e) {
//			this.setValueState(sap.ui.core.ValueState.None);
//			this.setPlaceholder("Labour Rate");
//	    };
//
//	    oTFLabourRateREEntry.onkeyup = function(evnt){
//			addSeparator(document.getElementById(this.sId));
//		};
//		oTFLabourRateREEntry.onkeydown = function(e){
//			validateNumeric(event,true);
//		};
//		oTFLabourRateREEntry.onpaste = function(e){
//			e.preventDefault();
//		};
//
//		var olblTechBulletinREEntry = new sap.ui.commons.Label({text: "Tech Bulletin:",
//			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
//            wrapping: false}).addStyleClass("marginTop10");
//
//		var oTFTechBulletinREEntry = new sap.ui.commons.TextField('idTFTechBulletinREEntry',{
//    		placeholder: "Tech Bulletin",
//    		change: upperOnChangeTF,
//			//width:"85%",
//    		layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"}),
//    	}).addStyleClass("FormInputStyle marginTop7");
//
//		oTFTechBulletinREEntry.onfocusin =  function(e) {
//			this.setValueState(sap.ui.core.ValueState.None);
//			this.setPlaceholder("Tech Bulletin");
//	      };
//
//	      frmFirsRowREEntry = new sap.ui.layout.form.FormElement({
//			    fields: [olblLabourRateREEntry,oTFLabourRateREEntry, olblTechBulletinREEntry,oTFTechBulletinREEntry]
//			});
//			oFrmCntnrREEntry.addFormElement(frmFirsRowREEntry);
//
//			//CREATE LINE ITEM BUTTONS
//			var oBtnInsertLineREEntry = new sap.m.Button("idBtnInsertLineREEntry",{
//				  text : "Insert Line",
//				  width:"100px",
//				  styled:false,
//				  //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: true}),
//				  press:function(){
//					sap.ui.getCore().byId("idlblSuccessMsgREE").setText("");
//					sap.ui.getCore().byId("idlblSuccessMsgREE").setVisible(false);
//					objcurntREEntry.insertRowLineItemIntoExcel();
//			}}).addStyleClass("submitBtn");
//
//			var oBtnDeleteLineREEntry = new sap.m.Button("idBtnDeleteLineREEntry",{
//		          text : "Delete Line",
//		          visible: false,
//		          width:"90px",
//				  styled:false,
//		          //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: false}),
//		          press:function(){
//
//					sap.ui.getCore().byId("idlblSuccessMsgREE").setText("");
//					sap.ui.getCore().byId("idlblSuccessMsgREE").setVisible(false);
//					var msgAlrtDelet ="The selected lines from the Repair Lines will be deleted.\nTo delete the lines click Yes.\nTo return to the Repair Estimate screen without deleting any lines click No.";
//					var chkedArr = jQuery.grep(jsnLineItemREEntry, function(element, index){
//						return element.checked == true;
//					});
//
//					if(chkedArr.length < 1){
//						sap.ui.commons.MessageBox.alert("No lines selected for deletion.\nPlease check atleast 1 checkbox in the Repair Lines section and retry.");
//						return;
//					}else{
//						sap.ui.commons.MessageBox.show(msgAlrtDelet,sap.ui.commons.MessageBox.Icon.WARNING,"Warning",
//							[sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO],
//							objcurntREEntry.fnDeleteLineMsgBox, sap.ui.commons.MessageBox.Action.YES);
//					}
//		          }}).addStyleClass("submitBtn");
//
//			var ResetMessage = "This will clear all the input data from the Enter Line Data section.\n Do you want to continue?";
//			var oBtnResetLineREEntry = new sap.m.Button("idBtnResetREEntry",{
//				text : "Reset",
//				width:"80px",
//				styled:false,
//				//layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
//				press:function(){
//					sap.ui.getCore().byId("idlblSuccessMsgREE").setText("");
//					sap.ui.getCore().byId("idlblSuccessMsgREE").setVisible(false);
//					sap.ui.commons.MessageBox.show(ResetMessage,sap.ui.commons.MessageBox.Icon.WARNING,"Warning",
//					[sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO],
//					objcurntREEntry.fnResetCallbackMsgBox, sap.ui.commons.MessageBox.Action.YES);
//			}}).addStyleClass("submitBtn");
//
//
//		 // Flex Box
//	    	var oFlxBtnLineREEntry = new sap.m.FlexBox({
//	    	      items: [oBtnInsertLineREEntry,
//	    	              new sap.ui.commons.Label( {text: " ",width : '8px'}),
//	    	              oBtnDeleteLineREEntry,
//	    	              new sap.ui.commons.Label( {text: " ",width : '8px'}),
//	    	              oBtnResetLineREEntry
//	    	              ],
//	    	      direction: "Row",
//				  layoutData: new sap.ui.layout.GridData({span: "L12 M12 S12",linebreak: true, margin: false}),
//	    	    }).addStyleClass("marginTop10");
//
//	    	  	frmFirsRowREEntry = new sap.ui.layout.form.FormElement({
//				    fields: [oFlxBtnLineREEntry]
//				});
//				oFrmCntnrREEntry.addFormElement(frmFirsRowREEntry);
//
//
//				frmFirsRowREEntry = new sap.ui.layout.form.FormElement({
//				    fields: [new sap.ui.commons.HorizontalDivider({width: "100%", type: "Area", height: "Medium"}).addStyleClass("marginTop7")]
//				});
//				oFrmCntnrREEntry.addFormElement(frmFirsRowREEntry);

		// MACISMAILEND
				//CREATE BUTTONS SAVE AND SUBMIT
				var oBtnSubmitREEntry = new sap.m.Button("idBtnSubmitREEntry",{
					  text : "Submit",
					  width:"80px",
					  styled:false,
					  //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: true}),
					  press:function(){
						sap.ui.getCore().byId("idlblSuccessMsgREE").setText("");
						sap.ui.getCore().byId("idlblSuccessMsgREE").setVisible(false);
						clickEvent = "submit";
						var valid = true;
						if(sap.ui.getCore().byId("idDdlUnitPCodeREEntry").getValue() == ''){
							valid = false;
							sap.ui.getCore().byId("idDdlUnitPCodeREEntry").setValueState(sap.ui.core.ValueState.Error);
							sap.ui.getCore().byId("idDdlUnitPCodeREEntry").setPlaceholder("Select Unit Part Code");
						}

						if(sap.ui.getCore().byId("idDdlJobTypeREEntry").getValue() == ''){
							valid = false;
							sap.ui.getCore().byId("idDdlJobTypeREEntry").setValueState(sap.ui.core.ValueState.Error);
							sap.ui.getCore().byId("idDdlJobTypeREEntry").setPlaceholder("Select Job Type");
						}
						if(sap.ui.getCore().byId("idDtPkrEstimateDtREEntry").getValue() == ''){
							valid = false;
							sap.ui.getCore().byId("idDtPkrEstimateDtREEntry").setValueState(sap.ui.core.ValueState.Error);
							sap.ui.getCore().byId("idDtPkrEstimateDtREEntry").setPlaceholder("Estimate Date");
						}
						if(!valid){
							return;
						}
						if(sap.ui.getCore().byId("idFrmElmntErrREEntry") != undefined){
							sap.ui.getCore().byId("idFrmElmntErrREEntry").destroyFields();
							sap.ui.getCore().byId("idFrmElmntErrREEntry").destroy();
						}
						if(sap.ui.getCore().byId("idFrmElmntInfoLstREEntry") != undefined){
							sap.ui.getCore().byId("idFrmElmntInfoLstREEntry").destroyFields();
							sap.ui.getCore().byId("idFrmElmntInfoLstREEntry").destroy();
						}

						objcurntREEntry.saveRepairEstimateFromExcel();
						//objREstimateOnline.onlinefunEstimateSubmit(selEstmtId);
				}}).addStyleClass("submitBtn");

				var oBtnBackUnitSelREEntry = new sap.m.Button("idBtnBackUnitSelREEntry",{
			          text : "Back To Unit Selection",
			          //width:"170px",
					  styled:false,
			          //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: false}),
			          press:function(){
						sap.ui.getCore().byId("idlblSuccessMsgREE").setText("");
						sap.ui.getCore().byId("idlblSuccessMsgREE").setVisible(false);

						sap.ui.commons.MessageBox.show("You will lose any unsaved data.\nDo you want to save before going back?",sap.ui.commons.MessageBox.Icon.WARNING,"Warning",
						[sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO, sap.ui.commons.MessageBox.Action.CANCEL],
						objcurntREEntry.backToUnitSelction, sap.ui.commons.MessageBox.Action.YES);
			          }}).addStyleClass("submitBtn");


				var oBtnSaveEstimatesREEntry = new sap.m.Button("idBtnSaveEstimatesREEntry",{
					text : "Save Estimates",
					//width:"120px",
					styled:false,
					//layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
					press:function(){
						clickEvent = "save";
						objcurntREEntry.saveRepairEstimateFromExcel();
					}}).addStyleClass("submitBtn");

				var oBtnClearMessagesREEntry = new sap.m.Button("idBtnClearMessagesREEntry",{
					text : "Show/Hide Error Messages",
					//width:"180px",
					styled:false,
					//layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
					press:function(){
						if(sap.ui.getCore().byId("idRRRepairEstim") != undefined){
							if(sap.ui.getCore().byId("idRRRepairEstim").getVisible() == true)
								sap.ui.getCore().byId("idRRRepairEstim").setVisible(false);
							else
								sap.ui.getCore().byId("idRRRepairEstim").setVisible(true);
						}

						if(sap.ui.getCore().byId("idErrorTableRep") != undefined)
							if(sap.ui.getCore().byId("idErrorTableRep").getVisible() == true)
								sap.ui.getCore().byId("idErrorTableRep").setVisible(false);
							else
								sap.ui.getCore().byId("idErrorTableRep").setVisible(true);
					}}).addStyleClass("submitBtn");


			 // Flex Box
		    	var oFlxBtnSubmitBtnREEntry = new sap.m.FlexBox({
		    	      items: [oBtnSubmitREEntry, new sap.ui.commons.Label( {text: " ",width : '8px'}),
		    	              oBtnBackUnitSelREEntry,new sap.ui.commons.Label( {text: " ",width : '8px'}),
		    	              oBtnSaveEstimatesREEntry,new sap.ui.commons.Label( {text: " ",width : '8px'}),
		    	              oBtnClearMessagesREEntry],
		    	      direction: "Row",
					  layoutData: new sap.ui.layout.GridData({span: "L12 M12 S12",linebreak: true, margin: false}),
		    	    });

				 frmFirsRowREEntry = new sap.ui.layout.form.FormElement({
				    fields: [oFlxBtnSubmitBtnREEntry]
				});
				oFrmCntnrREEntry.addFormElement(frmFirsRowREEntry);
				var olblSuccessMsgREE = new sap.ui.commons.Label({
					id: "idlblSuccessMsgREE",
					visible: false,
					layoutData: new sap.ui.layout.GridData({span: "L12 M12 S12",linebreak: false, margin: true}),
					wrapping: true}).addStyleClass("marginTop7");
				olblSuccessMsgREE.setText("");

		frmFirsRowREEntry = new sap.ui.layout.form.FormElement({
				    fields: [olblSuccessMsgREE]
				});
				oFrmCntnrREEntry.addFormElement(frmFirsRowREEntry);
	},

	backToUnitSelction: function(sResult){
		if(sResult == "YES"){
			clickEvent = "save";
			objcurntREEntry.saveRepairEstimateFromExcel();
			sap.ui.controller("view.RepairEstimateEntryVw").navButtonPress();
			//sap.ui.getCore().byId("idTblLoadSaveDataRESearch").setVisible(false);
			//sap.ui.getCore().byId("idTblLoadSaveDataRESearchHeader").setVisible(false);
		}else if(sResult == "NO"){
			//clickEvent = "save";
			//objcurntREEntry.saveRepairEstimateFromExcel();
			sap.ui.controller("view.RepairEstimateEntryVw").navButtonPress();
			//sap.ui.getCore().byId("idTblLoadSaveDataRESearch").setVisible(false);
			//sap.ui.getCore().byId("idTblLoadSaveDataRESearchHeader").setVisible(false);
		}
	},

	saveRepairEstimate: function(){
		saveLineItemREEntry.length = 0;
		for(var i=0; i<jsnLineItemREEntry.length; i++){
		if((jsnLineItemREEntry[i].LocationKey != '') ||
			(jsnLineItemREEntry[i].ComponentKey != '') ||
			(jsnLineItemREEntry[i].DamageKey != '') ||
			(jsnLineItemREEntry[i].MaterialKey != '') ||
			(jsnLineItemREEntry[i].RepairKey != '') ||
			(jsnLineItemREEntry[i].RepairLength != '') ||
			(jsnLineItemREEntry[i].RepairWidth != '') ||
			(jsnLineItemREEntry[i].Quantity != '') ||
			(jsnLineItemREEntry[i].ManHours != '') ||
			(jsnLineItemREEntry[i].MaterialCost != '') ||
			(jsnLineItemREEntry[i].LabourRate != '') ||
			(jsnLineItemREEntry[i].TechBulletin != '') ||
			(jsnLineItemREEntry[i].ResponsibilityKey != '')){
				saveLineItemREEntry.push({
					"checked":jsnLineItemREEntry[i].checked,
					"LineItem":jsnLineItemREEntry[i].LineItem,
					"sectionKey":jsnLineItemREEntry[i].sectionKey,
					"sectionText":jsnLineItemREEntry[i].sectionText,
					"LocationKey":jsnLineItemREEntry[i].LocationKey,
					"LocationText":jsnLineItemREEntry[i].LocationText,
					"ComponentKey":jsnLineItemREEntry[i].ComponentKey,
					"ComponentText":jsnLineItemREEntry[i].ComponentText,
					"DamageKey":jsnLineItemREEntry[i].DamageKey,
					"DamageText":jsnLineItemREEntry[i].DamageText,
					"RepairKey":jsnLineItemREEntry[i].RepairKey,
					"RepairText":jsnLineItemREEntry[i].RepairText,
					"MaterialKey":jsnLineItemREEntry[i].MaterialKey,
					"MaterialText":jsnLineItemREEntry[i].MaterialText,
					"MaterialCost":jsnLineItemREEntry[i].MaterialCost,
					"ManHours":jsnLineItemREEntry[i].ManHours,
					"RepairLength":jsnLineItemREEntry[i].RepairLength,
					"RepairWidth":jsnLineItemREEntry[i].RepairWidth,
					"Quantity":jsnLineItemREEntry[i].Quantity,
					"ResponsibilityKey":jsnLineItemREEntry[i].ResponsibilityKey,
					"ResponsibilityText":jsnLineItemREEntry[i].ResponsibilityText,
					"LabourRate":jsnLineItemREEntry[i].LabourRate,
					"TechBulletin":jsnLineItemREEntry[i].TechBulletin,
					"DataInserted":jsnLineItemREEntry[i].DataInserted,
					"savestatus": false
				});
			}
		}
		objREstimateOnline.onlinefunEstimateSave(selEstmtId,'X');
	},











	saveRepairEstimateFromExcel: function(){
		var isJs = false;

		if(sap.ui.getCore().byId("idDdlJobTypeREEntry").getSelectedKey() == "Joint Survey"){
			isJs = true;
		}

		var isEmpty = false;
		var isJV = false;
		var lineItem = null;
		var j = 0;
		saveLineItemREEntry.length = 0;
		var datainsert = false;
		for(var i =0; i < excelData.length;i++){
			j = 0;
 			datainsert = false;
 			while(j<12){
 				if(excelData[i][j] != "" && excelData[i][j] != null){
 					datainsert = true;
 					break;
 				}
 				j++;
 			}
 			if(datainsert){
 				if(excelData[i][11].substring(0,1).toUpperCase() == 'J' || excelData[i][11].substring(0,1).toUpperCase() == 'V'){
 					isJV = true;
 				}

 				if(excelData[i][0] == '' || excelData[i][1] == '' || excelData[i][2] == '' || excelData[i][4] == '' || excelData[i][8] == '' || excelData[i][11] == '' || excelData[i][11] == '' ||
 						excelData[i][0] == null || excelData[i][1] == null || excelData[i][2] == null || excelData[i][4] == null || excelData[i][8] == null || excelData[i][9] == null ||  excelData[i][11] == null){
 					isEmpty = true;
 				}
 				if(isEmpty == false){
 				lineItem = padZero(i+1,4);
 				saveLineItemREEntry.push({
					"checked":false,
					"LineItem":lineItem,
					"sectionKey":'',
					"sectionText":'',
					"LocationKey":excelData[i][0].toUpperCase(),
					"LocationText":'',
					"ComponentKey":excelData[i][1].toUpperCase(),
					"ComponentText":'',
					"DamageKey":excelData[i][2].toUpperCase(),
					"DamageText":'',
					"RepairKey":excelData[i][4].toUpperCase(),
					"RepairText":'',
					"MaterialKey":(excelData[i][3] == null)? "" : excelData[i][3].toUpperCase(),
					"MaterialText":'',
					"MaterialCost":excelData[i][9],
					"ManHours":excelData[i][8],
					"RepairLength":(excelData[i][5] == null)? "" : excelData[i][5],
					"RepairWidth":(excelData[i][6] == null)? "" : excelData[i][6],
					"Quantity":(excelData[i][7] == null)? "" : excelData[i][7],
					"ResponsibilityKey":excelData[i][11].substring(0,1).toUpperCase(),
					"ResponsibilityText":'',
					"LabourRate":'',
					"TechBulletin":(excelData[i][10] == null)? "" : excelData[i][10].toUpperCase(),
					"DataInserted":true,
					"savestatus": false
				});
 				}
 			}
 		}
		if(isJV == true && isJs == false){
			sap.ui.commons.MessageBox.alert("Resp. Codes J and V can only be entered for Joint Survey ");
		}else if(isEmpty == true){
			sap.ui.commons.MessageBox.alert("Lab. Hrs, Material Cost, Location, Component, Damage, Repair & Responsibility cannot be blank. Please fill them up");
		}else{
			objREstimateOnline.onlinefunEstimateSave(selEstmtId,'X');
		}

	},

	//FILL DROP DOWN LOCATION
	onlinesuccessfunLocation: function(resultdata, response){
		var msg ='';
		busyDialog.close();

		if(resultdata != undefined){
			if(resultdata.results.length > 0){
				var oidDdlLocationREEntry = sap.ui.getCore().byId("idDdlLocationREEntry");
				oidDdlLocationREEntry.insertItem(new sap.ui.core.ListItem({text:"",key:""}),0);
				for(var inx in resultdata.results){
					oidDdlLocationREEntry.addItem(new sap.ui.core.ListItem({
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

		    objUtilREstimate.doOnlineRequest(urlToCall,objcurntREEntry.onlinesuccessfunLocation, objcurntREEntry.onlineerrorfunLocation);
		}catch(e){
			busyDialog.close();
			sap.ui.commons.MessageBox.alert("Error on fetching Location data " + e);
		}
	},

	onlinefunLocationNew: function(secId){
		var oidDdlLocationREEntry = sap.ui.getCore().byId("idDdlLocationREEntry");
		oidDdlLocationREEntry.insertItem(new sap.ui.core.ListItem({text:"",key:""}),0);
		var locationLength = locationCodes.length;
		for(var i=0; i<locationLength; i++){
			if(locationCodes[i].locKey.substr(0,1) == secId){
				oidDdlLocationREEntry.addItem(new sap.ui.core.ListItem({
					text:locationCodes[i].location,
					key:locationCodes[i].locKey}));
			}
		}
	},

	onlinefunComponentNew: function(secId){
		var oidDdlComponentREEntry = sap.ui.getCore().byId("idDdlComponentREEntry");
		oidDdlComponentREEntry.insertItem(new sap.ui.core.ListItem({text:"",key:""}),0);
		var componentLength = componentCodes.length;
		for(var i=0; i<componentLength; i++){
				oidDdlComponentREEntry.addItem(new sap.ui.core.ListItem({
					text:componentCodes[i].component,
					key:componentCodes[i].comKey}));
		}
	},

	onlinefunMatrialCodeNew: function(){
		var oidDdlMaterialREEntry = sap.ui.getCore().byId("idDdlMaterialREEntry");
		oidDdlMaterialREEntry.insertItem(new sap.ui.core.ListItem({text:"",key:""}),0);
		var materialLength = materialCodes.length;
		for(var i=0; i<materialLength; i++){
				oidDdlMaterialREEntry.addItem(new sap.ui.core.ListItem({
					text:materialCodes[i].material,
					key:materialCodes[i].matKey}));
		}
	},

	//FILL DROP DOWN COMPONENT
	onlinesuccessfunComponent: function(resultdata, response){
		busyDialog.close();
		if(resultdata != undefined){
			if(resultdata.results.length > 0){
				var oidDdlComponentREEntry = sap.ui.getCore().byId("idDdlComponentREEntry");
				oidDdlComponentREEntry.insertItem(new sap.ui.core.ListItem({text:"",key:""}),0);
				for(var inx in resultdata.results){
					oidDdlComponentREEntry.addItem(new sap.ui.core.ListItem({
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

		    objUtilREstimate.doOnlineRequest(urlToCall,objcurntREEntry.onlinesuccessfunComponent, objcurntREEntry.onlineerrorfunComponent);
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
				var oidDdlRepairREEntry = sap.ui.getCore().byId("idDdlRepairREEntry");
				oidDdlRepairREEntry.insertItem(new sap.ui.core.ListItem({text:"",key:""}),0);
				for(var inx in resultdata.results){
					oidDdlRepairREEntry.addItem(new sap.ui.core.ListItem({
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

		    objUtilREstimate.doOnlineRequest(urlToCall,objcurntREEntry.onlinesuccessfunRepair, objcurntREEntry.onlineerrorfunRepair);
		}catch(e){
			busyDialog.close();
			sap.ui.commons.MessageBox.alert("Error on fetching Repair data " + e);
		}
	},

	onlinefunRepairNew: function(damageId){
		var oidDdlRepairREEntry = sap.ui.getCore().byId("idDdlRepairREEntry");
		oidDdlRepairREEntry.insertItem(new sap.ui.core.ListItem({text:"",key:""}),0);

		var repdamLength = repdamCodes.length;
		for(var i=0; i<repdamLength; i++){
			if(repdamCodes[i].damKey == damageId){
				oidDdlRepairREEntry.addItem(new sap.ui.core.ListItem({
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
			    	 objcurntREEntry.cellMoveNew("next", id, newCol);
			     }
			     else{
			    	 objcurntREEntry.cellMoveNew("right", id, newCol);
			     }


		        break;

	    		/*case 9: // Tab



       	 		objcurntREEntry.cellMove("right", this.getId());

       	 		break;

	    		case 37: // Left



	       	 		objcurntREEntry.cellMove("left", this.getId());

	       	 		break;

	    		case 39: // Right



	       	 		objcurntREEntry.cellMove("right", this.getId());

	       	 		break;



	           case 38: // Up arrow


	        	   objcurntREEntry.cellMove("up", this.getId());


	                   break;





	            case 40: // Down arrow


	            	objcurntREEntry.cellMove("down", this.getId());


	               break;*/


	     }


	   },

		cellMoveNew : function(direction, id, newCol) {

		var newId = null;
		var finalId = null;
		switch (direction) {
	    case "right":
	    newId  = objcurntREEntry.buildIdRight(id, newCol);
	    break;
	    case "next":
	    newId  = objcurntREEntry.buildIdDown(id, newCol);
	    break;
		}

		finalId = objcurntREEntry.replaceNew(newId);

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
	        	 newCol =	objcurntREEntry.extractColCount(id) + 1;
	        	 newRow = 	objcurntREEntry.extractRowCount(id) + 1;
	        	 newField =  parseInt(id.substring(id.indexOf("field") + 5, id.indexOf("-col")),10) + 1;
	        	 if(newCol != 14){
	        		 nextRow = newRow;
	        		 newId  = objcurntREEntry.buildId(id, undefined, undefined, newCol, newField, undefined);
	        	 }
	        	 else{
	        		 nextRow = newRow + 1;
	        		 newId  = objcurntREEntry.buildId(id, undefined, undefined, 2, 		0, nextRow);
	        	 }
	        	 break;
	    case "left":
       	 		newCol =	objcurntREEntry.extractColCount(id) - 1;
       	 		newField = newCol - 2;
       	 		newId  = objcurntREEntry.buildId(id, undefined, undefined, newCol, newField);
       	 		break;
	    case "up":
	            newRow =	objcurntREEntry.extractRowCount(id) - 1;
	            newId  = objcurntREEntry.buildId(id, undefined, newRow, undefined, undefined);
	            break;
	    case "down":
	            newRow =	objcurntREEntry.extractRowCount(id) + 1;
	            newId  = objcurntREEntry.buildId(id, undefined, newRow, undefined, undefined);
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
	 		var oTblLineItemREEntry = sap.ui.getCore().byId("idTblLineItemREEntry");
	 		var oidDdlSectionREEntry = sap.ui.getCore().byId("idDdlSectionREEntry");
	 		var oidDdlLocationREEntry = sap.ui.getCore().byId("idDdlLocationREEntry");
	 		var oidDdlComponentREEntry = sap.ui.getCore().byId("idDdlComponentREEntry");
	 		var oidDdlDamageREEntry = sap.ui.getCore().byId("idDdlDamageREEntry");
	 		var oidDdlRepairREEntry = sap.ui.getCore().byId("idDdlRepairREEntry");
	 		var oidDdlMaterialCodeREEntry = sap.ui.getCore().byId("idDdlMaterialCodeREEntry");
	 		var oidTFMaterialCostREEntry = sap.ui.getCore().byId("idTFMaterialCostREEntry");
	 		var oidTFManHoursREEntry = sap.ui.getCore().byId("idTFManHoursREEntry");
	 		var oidTFRepairLengthREEntry = sap.ui.getCore().byId("idTFRepairLengthREEntry");
	 		var oidTFRepairWidthREEntry = sap.ui.getCore().byId("idTFRepairWidthREEntry");
	 		var oidTFQuantityREEntry = sap.ui.getCore().byId("idTFQuantityREEntry");
	 		var oidDdlResponsibilityREEntry = sap.ui.getCore().byId("idDdlResponsibilityREEntry");
	 		var oidTFLabourRateREEntry = sap.ui.getCore().byId("idTFLabourRateREEntry");
	 		var oidTFTechBulletinREEntry = sap.ui.getCore().byId("idTFTechBulletinREEntry");
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
	 	 			excelData[i][0] = oidDdlLocationREEntry.getSelectedKey();
	 	 			excelData[i][1] = oidDdlComponentREEntry.getSelectedKey();
	 	 			excelData[i][2] = oidDdlDamageREEntry.getSelectedKey();
	 	 			excelData[i][3] = oidDdlMaterialCodeREEntry.getSelectedKey();
	 	 			excelData[i][4] = oidDdlRepairREEntry.getSelectedKey();
	 	 			excelData[i][5] = oidTFRepairLengthREEntry.getValue();
	 	 			excelData[i][6] = oidTFRepairWidthREEntry.getValue();
	 	 			excelData[i][7] = oidTFQuantityREEntry.getValue();
	 	 			excelData[i][8] = oidTFManHoursREEntry.getValue();
	 	 			excelData[i][9] = oidTFMaterialCostREEntry.getValue();
	 	 			//excelData[i][10] = oidTFLabourRateREEntry.getValue();
	 	 			excelData[i][10] = oidTFTechBulletinREEntry.getValue();
	 	 			excelData[i][11] = oidDdlResponsibilityREEntry.getSelectedKey();
	 	 			dataInsd = true;
	 				break loop1;
	 			}
	 		}

 			if(!dataInsd){
 				excelData.push([]);
 				var currLength1 = excelData.length;
 				currLength1 = currLength1 - 1;
 	 			excelData[currLength1][0] = oidDdlLocationREEntry.getSelectedKey();
 	 			excelData[currLength1][1] = oidDdlComponentREEntry.getSelectedKey();
 	 			excelData[currLength1][2] = oidDdlDamageREEntry.getSelectedKey();
 	 			excelData[currLength1][3] = oidDdlMaterialCodeREEntry.getSelectedKey();
 	 			excelData[currLength1][4] = oidDdlRepairREEntry.getSelectedKey();
 	 			excelData[currLength1][5] = oidTFRepairLengthREEntry.getValue();
 	 			excelData[currLength1][6] = oidTFRepairWidthREEntry.getValue();
 	 			excelData[currLength1][7] = oidTFQuantityREEntry.getValue();
 	 			excelData[currLength1][8] = oidTFManHoursREEntry.getValue();
 	 			excelData[currLength1][9] = oidTFMaterialCostREEntry.getValue();
 	 			excelData[currLength1][10] = oidTFLabourRateREEntry.getValue();
 	 			//excelData[currLength1][11] = oidTFTechBulletinREEntry.getValue();
 	 			excelData[currLength1][11] = oidDdlResponsibilityREEntry.getSelectedKey();
 			}


	 		oExcelGrid.render();

	 	},

	 	makeHTMLTableLA : function( depotForPrint, serialForPrint, fullDepotForPrint, unitParrtCodeForPrint, jobTypeForPrint, estimDateForPrint, saleGradeForPrint,
				   					currencyCodeForPrint, printExcelData, title, func ){

	 		var excelDataPrint = [];
	 		var excelDataPrintGet = oExcelGrid.getData();
	 		// Make totals based on the Responsibility Code //
	 		var labhrU = 0.00;
	 		var labhrJ = 0.00;
	 		var labhrO = 0.00;
	 		var labhrV = 0.00;
	 		var matrcU = 0.00;
	 		var matrcJ = 0.00;
	 		var matrcO = 0.00;
	 		var matrcV = 0.00;


	 		var currLength = excelDataPrintGet.length;

	 		for(var i =0; i < currLength; i++){
	 			loop1 : for(var j =0; j < 12; j++){
	 				if(excelDataPrintGet[i][j] != "" && excelDataPrintGet[i][j] != null){
	 					excelDataPrint.push(excelDataPrintGet[i]);
	 					break loop1;
	 				}
	 			}
	 		}


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
	 			}else if(excelDataPrint[i][11].substr(0,1).toUpperCase() == 'V'){
	 				labhrV = (excelDataPrint[i][8] == "")? labhrV : parseFloat(parseFloat(labhrV).toFixed(2)) + parseFloat(parseFloat(excelDataPrint[i][8]).toFixed(2));
	 				matrcV = (excelDataPrint[i][9] == "")? matrcV : parseFloat(parseFloat(matrcV).toFixed(2)) + parseFloat(parseFloat(excelDataPrint[i][9]).toFixed(2));
	 			}
	 		}


	 		var labrtU = parseFloat(labhrU * fixedLabourRate).toFixed(2);
	 		var labrtJ = parseFloat(labhrJ * fixedLabourRate).toFixed(2);
	 		var labrtO = parseFloat(labhrO * fixedLabourRate).toFixed(2);
	 		var labrtV = parseFloat(labhrV * fixedLabourRate).toFixed(2);
	 		labrtU = parseFloat(parseFloat(labrtU).toFixed(2)) + parseFloat(parseFloat(labrtV).toFixed(2));
	 		labrtO = parseFloat(parseFloat(labrtO).toFixed(2)) + parseFloat(parseFloat(labrtJ).toFixed(2));
	 		var labrt = parseFloat(parseFloat(labrtU).toFixed(2)) + parseFloat(parseFloat(labrtJ).toFixed(2)) + parseFloat(parseFloat(labrtO).toFixed(2)) +
	 						parseFloat(parseFloat(labrtV).toFixed(2));
	 		labrt = parseFloat(labrt).toFixed(2);


	 		var matrc = matrcU + matrcJ + matrcO + matrcV;
	 		matrcU = matrcU + matrcV;
	 		matrcO = matrcO + matrcJ;
	 		matrc = parseFloat(matrc).toFixed(2);
	 		matrcV = parseFloat(matrcV).toFixed(2);
	 		matrcJ = parseFloat(matrcJ).toFixed(2);
	 		matrcO = parseFloat(matrcO).toFixed(2);
	 		matrcU = parseFloat(matrcU).toFixed(2);

	 		var printTotalCost = [];

	 		printTotalCost.push({
	 			"" : "User",
	 			"Labour" : labrtU,
	 			"Material" : matrcU,
	 		});

//	 		printTotalCost.push({
//	 			"" : "Customer",
//	 			"Labour" : labrtV,
//	 			"Material" : matrcV,
//	 		});
//
//	 		printTotalCost.push({
//	 			"" : "JS Allocation",
//	 			"Labour" : labrtJ,
//	 			"Material" : matrcJ,
//	 		});

	 		printTotalCost.push({
	 			"" : "Owner",
	 			"Labour" : labrtO,
	 			"Material" : matrcO,
	 		});

	 		printTotalCost.push({
	 			"" : "Total",
	 			"Labour" : labrt,
	 			"Material" : matrc,
	 		});




	 		 var html = "";
		     var count = 0;

		     var urlNoHash = window.location.href.replace(window.location.hash,'');
		     var urlSplit = urlNoHash.split('/');
		     //var base = "http://";
		     var base = "";
		     if(urlSplit.length > 2){
		    	 	base = base + urlSplit[0]+"//";
		            for(var i=2; i<urlSplit.length - 1;i++){
		                   base = base + urlSplit[i]+"/";
		            }
		     }

		     var tableWidth = 16;
		     var htmlTable="";

		       htmlTable +='<table border=0 cellspacing=0 style="color:#656465">';   // HTML Header - Start
		       htmlTable += '<tr style="height:75px;border=1">'+
		                    '<td align=center colspan='+ (tableWidth - 12) +' style="padding-left:10px;font:bold 14px Arial;"><u>' +title + ' for <b><FONT COLOR="RED">' + serialForPrint +' </FONT></b> in depot <b><FONT COLOR="RED">'+ depotForPrint + '</FONT></b> on <b><FONT COLOR="RED">'+ estimDateForPrint + '</FONT></b></u></td>'+
		                    '<td style="border:none; padding:5px 5px 5px 0px" colspan=2 align ="right"><img src="' + base + 'images/login/login_logo.png"></img></td></tr>';

//		       htmlTable += '<tr  style="border:none;height:20px;"><td colspan='+ (tableWidth)+'></td></tr>';
//		       //htmlTable += '<tr  style="border:none;height:20px;"><td colspan='+ (tableWidth)+'></td></tr>';
//		       htmlTable += '</tr>';
//		       htmlTable += '<tr  style="border:none;height:35px;">';
//		       //htmlTable += '<td align=center colspan="2" style="padding-left:10px; font: 12px Arial;">Serial Number : <b>' + serialForPrint + '</b></td>';
//		       htmlTable += '</tr>';
		       htmlTable += '<tr  style="border:none;">';
		       if(saleGradeForPrint != '')
		       htmlTable += '<td align=right style="padding-left:10px; font: 12px Arial;">Sale Grade : <b>' + saleGradeForPrint + '</b></td>';
		       if(currencyCodeForPrint != '')
		       htmlTable += '<td align=left  style="padding-left:30px; font: 12px Arial;">Curr : <b>' + currencyCodeForPrint + '</b></td>';
//		       if(estimDateForPrint != '')
//		       htmlTable += '<td align=left style="padding-left:10px; font: 12px Arial;">Estim Date : <b>' + estimDateForPrint + '</b></td>';
		       if(jobTypeForPrint != '')
		       htmlTable += '<td align=left  style="padding-left:30px; font: 12px Arial;">Type : <b>' + jobTypeForPrint + '</b></td>';
		       if(unitParrtCodeForPrint != '')
		       htmlTable += '<td align=left style="padding-left:10px; font: 12px Arial;">Part : <b>' + unitParrtCodeForPrint + '</b></td>';

		       //htmlTable += '<td align=left  style="padding-left:30px; font: 12px Arial;">Depot : <b>' + depotForPrint + '</b></td>';
		       htmlTable += '</tr>';
//		       htmlTable += '<tr  style="border:none;height:35px;">';
//		       htmlTable += '<td align=right style="padding-left:10px; font: 12px Arial;">Estimate Date : <b>' + estimDateForPrint + '</b></td>';
//		       htmlTable += '<td align=left  style="padding-left:30px; font: 12px Arial;">Estimate Type : <b>' + jobTypeForPrint + '</b></td>';
//		       htmlTable += '</tr>';
//		       htmlTable += '<tr  style="border:none;height:35px;">';
//		       htmlTable += '<td align=right style="padding-left:10px; font: 12px Arial;">Unit Part : <b>' + unitParrtCodeForPrint + '</b></td>';
//		       htmlTable += '<td align=left  style="padding-left:30px; font: 12px Arial;">Currency : <b>' + currencyCodeForPrint + '</b></td>';
//		       htmlTable += '</tr>';

		       if(printExcelData.length>0){
		    	htmlTable += '<tr  style="border:none;height:20px;"></tr>';
		       	htmlTable += '<td valign="top" colspan='+ (5) +' style="padding-left:10px;">';

		       	htmlTable += '<table align=center border=1 cellspacing=0 style="color:#656465">';
		           //Create PrimData1 Table Headers
		          /* htmlTable += "<tr>";
		           count = 0;
		           $.each(PrimData1, function(i, item) {
		                  for (var key in item){
		                        if(count == 0){
		                               //alert("key : "+ key);
		                               htmlTable += '<th style="font:bold 14px Arial;">'+key+'</th>';
		                        }
		                  }
		                  count ++;
		           });
		           htmlTable += "</tr>";*/

		       	   htmlTable += "<tr>";
		       	   for (var key in printExcelData[0]){
	                  //alert("key : "+ key);
	                  htmlTable += '<td align=center style="font: bold 12px Arial;">'+key+"</td>";
	                  //console.log(key + ' = ' + item[key]);
	               }
	               htmlTable += "</tr>";

		           // Create PrimData1 Table Body
		           $.each(printExcelData, function(i, item) {
		                  htmlTable += "<tr>";
		               for (var key in item){
		                  //alert("key : "+ key);
		                  htmlTable += '<td align=center style="font: 12px Arial;">'+item[key]+"</td>";
		                  //console.log(key + ' = ' + item[key]);
		               }
		               htmlTable += "</tr>";
		           });
		           htmlTable += '</table>';
		           //htmlTable += '<tr  style="border:none;height:35px;">';
		           htmlTable += '<tr  style="border:none;height:20px;">';
		           htmlTable += '<table align=left border=1 cellspacing=0 style="color:#656465">';

		       	   htmlTable += "<tr>";
		       	   for (var key in printTotalCost[0]){
	                  //alert("key : "+ key);
	                  htmlTable += '<td align=center style="font: bold 12px Arial;">'+key+"</td>";
	                  //console.log(key + ' = ' + item[key]);
	               }
	               htmlTable += "</tr>";
	               var colorCount = 0;
		           // Create PrimData1 Table Body
		           $.each(printTotalCost, function(i, item) {
		        	   	  colorCount = colorCount + 1;
		                  htmlTable += "<tr>";
		               for (var key in item){
		                  //alert("key : "+ key);
		            	  if(colorCount == printTotalCost.length){
		            		  htmlTable += '<td align=center style="font: 12px Arial; background-color:#fef885">'+item[key]+"</td>";
		            	  }else{
		            		  htmlTable += '<td align=center style="font: 12px Arial;">'+item[key]+"</td>";
		            	  }

		                  //console.log(key + ' = ' + item[key]);
		               }
		               htmlTable += "</tr>";
		           });

		           htmlTable += '</table>';
		           htmlTable += '</td>';
		       }

		       htmlTable += "</table>";   // HTML Header - End

			   if(func == "print"){
			   	   html +='<style>@page{size:landscape;}</style><html><head><title></title></head><body >';
                  //alert("Print");
                  html += "<div>";
                  html +=htmlTable+"</div>";
                  html +='</body></html>';

           }else if(func == "excel"){
                  //alert("Export");
                  var uri = 'data:application/vnd.ms-excel;base64,',
                  template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">'
                  +'<!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->'
                  +'<head></head>'
                  +'<body>'+htmlTable  +'</body></html>',
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


});

/*sap.ui.commons.TextField.prototype.onkeydown = function(e) {
	var k = e.which || e.keyCode;
	if (k === jQuery.sap.KeyCodes.TAB) {
		//$('#idTblLineItemREEntryCC-col3-row0').focus();
		sap.ui.getCore().byId("idTblLineItemREEntryCC-col3-row0").focus();
	}
};*/

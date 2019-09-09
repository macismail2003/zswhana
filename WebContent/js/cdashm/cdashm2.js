jQuery.sap.require("sap.ui.model.json.JSONModel");
var m_names = new Array("Jan", "Feb", "Mar",
		"Apr", "May", "Jun", "Jul", "Aug", "Sep",
		"Oct", "Nov", "Dec");

		var globalisFromSerialHistory = "";
		var globalisProcessChange = "";
var oCDASHM2JsonEstimateLines = [];
var jsonCDASHM2PicturesChunks = [];
var jsonCDASHM2Pictures = [];
var jsonCDASHM2Documents = [];
var jsonCDASHM2Images = [];
var jsonCDASHM2LastActions = [];

var globalGateInDate = "";
var globalIsLineCodeDesc = "DESC";

var global3Equnr = "";
var global3SerialNo = "";
var global3Depot = "";
var global3EstimateNo = "";

var global3LastAction = "Last Action";

var global3DocType = "";
var global3DocText = "";
var global3DocCat = "";
var global3DocDate = "";

var global3Processkey = "";

sap.ui.model.json.JSONModel.extend("CDASHM2", {

	/* CDASHM2 - Page - Seaco Dashboard page 3 */

	createCDASHM2Page : function(){

		var oCurrent = this;

		 var backEDI = new sap.m.Link({text: " < Back",
       	  width:"7%",
       	  wrapping:true,
       	  press: function(){
       		  var bus = sap.ui.getCore().getEventBus();
       		  bus.publish("nav", "back");
       		  $('#idHdrContnt').html('M&R Customer Dashboard');
      	  }});

		/* CDASHM2 - Content - Buttons */

		var oCDASHM2ContentButtons = oCurrent.setContentButtons();

		/* CDASHM2 - Content - Record Details */

		var oCDASHM2ContentRecordDetails = oCurrent.setContentRecordDetails();

		/* CDASHM2 - Content - Header Details */

		var oCDASHM2ContentHeaderDetails = oCurrent.setContentHeaderDetails();

		/* CDASHM2 - Content - Picture Thumbnail */

		var oCDASHM2ContentThumbnail = oCurrent.setContentThumbnail();

		/* CDASHM2 - Content - Estimate Lines */

		var oCDASHM2ContentEstimateLines = oCurrent.setContentEstimateLines();

		/* CDASHM2 - Content - Summary Lines */

		//var oCDASHM2ContentMiscInfo = oCurrent.setContentMiscInfo();

		/* CDASHM2 - Flexbox - Record and Buttons in same row */

		/* CDASHM2 - Layout - Carousel and Upload Section */

		var oCDASHM2LayoutRecordDetails = new sap.ui.layout.form.ResponsiveGridLayout("idCDASHM2LayoutRecordDetails",{
										    });

		/* CDASHM2 - Form - Header Details */

		var oCDASHM2FormRecordDetails = new sap.ui.layout.form.Form("idCDASHM2FormRecordDetails",{
	        layout: oCDASHM2LayoutRecordDetails,
	        formContainers: [
	                new sap.ui.layout.form.FormContainer("idCDASHM2FormRecordDetailsC1",{
	                    //title: "Summary",
	                	layoutData: new sap.ui.layout.GridData({span: "L9 M9 S9"}),
	                    formElements: [
											new sap.ui.layout.form.FormElement({
											    fields: [ oCDASHM2ContentRecordDetails ]
											})
	                                ]
	                })

	        ]
		    }).addStyleClass("marginTopBottom10");

		/*var oCDASHM2ContentRecordButtons = new sap.m.FlexBox({
		         items: [
						oCDASHM2ContentButtons,
						new sap.ui.commons.Label({
							text : "",
							width : "100px"
						}),
						oCDASHM2ContentRecordDetails
		       ],
		       direction : "Row",
		       visible: true,
		}).addStyleClass("marginLeft20");*/

		/* CDASHM2 - Flexbox - Final */

		var oCDASHM2ContentFinal = new sap.m.FlexBox("idCDASHM2ContentFinal",{
		         items: [
						oCDASHM2ContentButtons,
						new sap.ui.commons.Label({
							text : "",
							width : "100px"
						}),
						oCDASHM2ContentRecordDetails,
						//oCDASHM2FormRecordDetails,
						new sap.ui.commons.Label({
							text : "",
							width : "100px"
						}),
						oCDASHM2ContentHeaderDetails,
						oCDASHM2ContentThumbnail,
						oCDASHM2ContentEstimateLines
						//oCDASHM2ContentMiscInfo
		       ],
		       direction : "Column",
		       visible: true,
		}).addStyleClass("marginLeft20");

		return new sap.m.VBox({
			items : [backEDI, oCDASHM2ContentFinal]
		});

	},

	/* CDASHM2 - Value - Header Details */

	setValueHeaderDetails : function(isFromSerialHistory, isProcessChange){

		globalisFromSerialHistory = isFromSerialHistory;
		globalisProcessChange = isProcessChange;

		var local3EstimateNo = global3EstimateNo;
		var local3DocType = global3DocType;
		var local3DocText = global3DocText;
		var local3DocCat = global3DocCat;
		var local3DocDate = global3DocDate;

		if(!isFromSerialHistory){
			local3EstimateNo = "";
			local3DocType = "";
			local3DocText = "";
			local3DocCat = "";
			local3DocDate = "";
		}

		console.log("Get Header : Page 3");

		if(isProcessChange == false){
		var urlToSap = "header3Set(IvSerial='" + global3SerialNo +
								   "',IvEstimate='" + global3EstimateNo +
								   "',IvDepot='" + global3Depot +
								   "',IvDocType='" + local3DocType +
								   "',IvDocText='" + local3DocText +
								   "',IvDocCat='" + local3DocCat +
								   "',IvDocDate='" + local3DocDate +
								   "')";
	 }else{
		 var processkey = sap.ui.getCore().byId("idCDASHM2RecordDetailsValueRecordTypeTop").getSelectedKey();
		 var encodedGateInDate = encodeURIComponent(globalGateInDate);
		 var urlToSap = "header3pcSet(IvSerial='" + global3SerialNo +
										"',IvDocCat='" + global3Processkey +
										"',IvDepot='" + global3Depot +
										"',IvGateinDate='" + encodedGateInDate +
										"')";

	 }

    	urlToSap = serviceDEP + urlToSap;
    	oModel = new sap.ui.model.odata.ODataModel(serviceDEP, true);
	        busyDialog.open();
	        console.log(urlToSap);
	        OData.request({
	                      requestUri: urlToSap,
	                      method: "GET",
	                      dataType: 'json',
	                      async: false,
	                      headers:
	                      {
	                      "X-Requested-With": "XMLHttpRequest",
	                      "Content-Type": "application/json; charset=utf-8",
	                      "DataServiceVersion": "2.0",
	                      "X-CSRF-Token":"Fetch"
	                      }
	                      },
	                      function (data, response){
	                    	 console.log("Get Header : Page 3 Success");
	                    	 sap.ui.getCore().byId("idCDASHM2PanelEstimateLines").setVisible(true);
	                    	 //sap.ui.getCore().byId("idCDASHM2PanelMiscInfo").setVisible(true);
												 isProcessChange = false;
												 if(isProcessChange == true){ // If this is a process change, don't change the dropdown value
												 var processkey = sap.ui.getCore().byId("idCDASHM2RecordDetailsValueRecordTypeTop").getSelectedKey();
												 if(global3Processkey == "GI"){
													 sap.ui.getCore().byId("idCDASHM2PanelEstimateLines").setVisible(false);
													 //sap.ui.getCore().byId("idCDASHM2PanelMiscInfo").setVisible(false);
												 }

												 }else{

											     /* Record Type */

												 /* Restrict Record Type drop down values based on the process
												 I.e., If the process if original estimate, then only Gate IN and Origianl Estimate should be available in the dropdown */
												  var oCDASHM2RecordDetailsValueRecordTypeTop = sap.ui.getCore().byId("idCDASHM2RecordDetailsValueRecordTypeTop");

												 oCDASHM2RecordDetailsValueRecordTypeTop.removeAllItems();

												 var oCDASHM2JsonProcessesLoc = "";//oCDASHM2JsonProcesses;

												 if(global3EstimateText == "Joint Survey")
												 			data.IsJointLessor = "JN";

												 if(data.IsJointLessor == "")
												  data.IsJointLessor = "NN";
												 if(data.IsJointLessor.substr(0,1) == 'N'){
												   oCDASHM2JsonProcessesLoc = $.grep(oCDASHM2JsonProcesses, function(e){
												           return (e.key != "JS" && e.key != "LS");
												  });
												 }else if(data.IsJointLessor.substr(0,1) == 'J'){
												   oCDASHM2JsonProcessesLoc = $.grep(oCDASHM2JsonProcesses, function(e){
												          return (e.key != "LS");
												   });
												 }else if(data.IsJointLessor.substr(0,1) == 'L'){
												   oCDASHM2JsonProcessesLoc = $.grep(oCDASHM2JsonProcesses, function(e){
												         return (e.key != "JS");
												   });
												 }else if(data.IsJointLessor.substr(0,1) == 'B'){
												   oCDASHM2JsonProcessesLoc = oCDASHM2JsonProcesses;
												 }

												 if(data.IsJointLessor.substr(1,2) == 'N'){
												   oCDASHM2JsonProcessesLoc = $.grep(oCDASHM2JsonProcessesLoc, function(e){
												           return (e.key != "AE" && e.key != "PE");
												  });
												 }else if(data.IsJointLessor.substr(1,2) == 'A'){
												   oCDASHM2JsonProcessesLoc = $.grep(oCDASHM2JsonProcessesLoc, function(e){
												          return (e.key != "PE");
												   });
												 }else if(data.IsJointLessor.substr(1,2) == 'P'){
												   oCDASHM2JsonProcessesLoc = $.grep(oCDASHM2JsonProcessesLoc, function(e){
												         return (e.key != "AE");
												   });
												 }else if(data.IsJointLessor.substr(1,2) == 'B'){
												   oCDASHM2JsonProcessesLoc = oCDASHM2JsonProcessesLoc;
												 }

												 if(oCDASHM2JsonProcessesLoc != "")
												  oCDASHM2JsonProcessesLoc.sort(function(a,b) {return (a.sortkey > b.sortkey) ? 1 : ((b.sortkey > a.sortkey) ? -1 : 0);} );


												 for(var i=0; i<oCDASHM2JsonProcessesLoc.length;i++){

											 			oCDASHM2RecordDetailsValueRecordTypeTop.addItem(new sap.ui.core.ListItem({
											 					text : oCDASHM2JsonProcessesLoc[i].text,
											 					key: oCDASHM2JsonProcessesLoc[i].key
											 				}));
															// if(data.JobType == oCDASHM2JsonProcessesLoc[i].key){
															// 	break;
															// }
										 			}

	                    	 if(data.JobType != ""){
	                    		 oCDASHM2JsonRecordLines[0].value1 = data.JobType;
	                    		 if(data.JobType == "GI"){
	                    			 sap.ui.getCore().byId("idCDASHM2PanelEstimateLines").setVisible(false);
	                    			 //sap.ui.getCore().byId("idCDASHM2PanelMiscInfo").setVisible(false);
	                    		 }
	                    	 }
	                    	 else{
	                    		 oCDASHM2JsonRecordLines[0].value1 = "GI";
													 global3Processkey = oCDASHM2JsonRecordLines[0].value1;
	                    	 }

	                 		 /*var oCDASHM2ModelRecordType = new sap.ui.model.json.JSONModel();
	                 		 oCDASHM2ModelRecordType.setData({modelData: oCDASHM2JsonRecordType});

                     	 var oCDASHM2TableRecordType = sap.ui.getCore().byId("idCDASHM2TableRecordType");
                     	 oCDASHM2TableRecordType.setModel(oCDASHM2ModelRecordType);
                     	 oCDASHM2TableRecordType.setVisibleRowCount(1);
                     	 oCDASHM2TableRecordType.bindRows("/modelData");
										 }*/


	                    	 /* Record Details */

	                    	oCDASHM2JsonRecordLines[0].value2 = global3SerialNo;
	                 			oCDASHM2JsonRecordLines[0].value3 = "Pending Customer Approval";//data.Status;


	                 		var oCDASHM2ModelRecordDetails = new sap.ui.model.json.JSONModel();
	                 		oCDASHM2ModelRecordDetails.setData({modelData: oCDASHM2JsonRecordLines});

	                       	var oCDASHM2TableRecordDetails = sap.ui.getCore().byId("idCDASHM2TableRecordDetails");
	                       	oCDASHM2TableRecordDetails.setModel(oCDASHM2ModelRecordDetails);
	                       	oCDASHM2TableRecordDetails.setVisibleRowCount(oCDASHM2JsonRecordLines.length);
	                       	oCDASHM2TableRecordDetails.bindRows("/modelData");

	                    	 /* Notes Section First

	                    	 sap.ui.getCore().byId("idCDASHM2TextAreaNotes1").setValue(data.EvNotes1);
	                    	 sap.ui.getCore().byId("idCDASHM2TextAreaNotes2").setValue(data.EvNotes2);
	                    	 sap.ui.getCore().byId("idCDASHM2TextAreaNotes3").setValue(data.EvNotes3);
	                    	 sap.ui.getCore().byId("idCDASHM2TextAreaNotes4").setValue(data.EvNotes4);
	                    	 sap.ui.getCore().byId("idCDASHM2TextAreaNotes5").setValue(data.EvNotes5); */

												 /* Header Section */

												 /****************************************************/
												 /* Estimate Date */
												 if(data.EstimateDate != ""){
												   oCDASHM2JsonHeaderLines[0].value1 = data.EstimateDate.substr(0,2)
												 + " " + m_names[parseInt(data.EstimateDate.substr(3,2)) - 1]
												 + " " + data.EstimateDate.substr(6,4);;
												 }else{
												   oCDASHM2JsonHeaderLines[0].value1 = "";
												 }

												 /* Estimate Type */
												 oCDASHM2JsonHeaderLines[0].value2 = data.DocText;
												 global3EstimateNo = data.Aufnr;

												 /* Lessee Cost */
												 oCDASHM2JsonHeaderLines[0].value3 = data.Currency + " " + global3UserCost;

												 /* Depot */
												 oCDASHM2JsonHeaderLines[0].value4 = "(" + global3Depot + ")" + " " + global3DepotName;


												 /****************************************************/
												 /* Off Hire Date */

												 if(data.GateInDate != ""){

												 oCDASHM2JsonHeaderLines[1].value1 = data.GateInDate.substr(0,2)
												 + " " + m_names[parseInt(data.GateInDate.substr(3,2)) - 1]
												 + " " + data.GateInDate.substr(6,4);;
												 }else{
												   oCDASHM2JsonHeaderLines[1].value1 = "";
												 }
												 globalGateInDate = data.GateInDate;

												 /* Off Hire Location */
												 oCDASHM2JsonHeaderLines[1].value2 = data.OffhireLocText;

												 /* Customer Approval Date */
												 if(data.CustAppDate != ""){

												    oCDASHM2JsonHeaderLines[1].value3 = data.CustAppDate.substr(0,2)
												                 + " " + m_names[parseInt(data.CustAppDate.substr(3,2)) - 1]
												                 + " " + data.CustAppDate.substr(6,4);
												 }else{
												   oCDASHM2JsonHeaderLines[1].value3 = "";
												 }
												 globalCustAppDate =  data.CustAppDate;
												 sap.ui.getCore().byId("idCDASHM2ButtonEquipmentLevelCSApproval").setVisible(globalApprAllowed);
												 if(globalApprAllowed == true){
													 if(globalCustAppDate == ""){
														 sap.ui.getCore().byId("idCDASHM2ButtonEquipmentLevelCSApproval").setVisible(true);
													 }else{
														 sap.ui.getCore().byId("idCDASHM2ButtonEquipmentLevelCSApproval").setVisible(false);
													 }
												 }

												 /* Customer */
												 oCDASHM2JsonHeaderLines[1].value4 = data.Customer;


												 /****************************************************/

												 /* On Hire Date */
												 if(data.GateOutDate == ""){
													 oCDASHM2JsonHeaderLines[2].value1 = "";
												 }else{
														 oCDASHM2JsonHeaderLines[2].value1 = data.GateOutDate.substr(0,2)
												 + " " + m_names[parseInt(data.GateOutDate.substr(3,2)) - 1]
												 + " " + data.GateOutDate.substr(6,4);
												 }
												 /* On Hire Location */
												 oCDASHM2JsonHeaderLines[2].value2 = data.OnhireLocText;
												 /* Cust App Reference */
												 oCDASHM2JsonHeaderLines[2].value3 = data.CustAppRef;
												 /* Cust App Reference */
												 oCDASHM2JsonHeaderLines[2].value4 = data.UnitType;


												 /****************************************************/
												 /* Lease Number */
												 oCDASHM2JsonHeaderLines[3].value1 = data.LeaseNo;
												 /*Redelivery Ref*/
												 oCDASHM2JsonHeaderLines[3].value2 = data.RaNo;
												 /*SeaCover*/
												 if(data.SeacoverLimit == "")
													data.SeacoverLimit = "0.00";

													if(data.SeacoverLimit == 'Full' || data.SeacoverLimit == 'No SCR'){
														 oCDASHM2JsonHeaderLines[3].value3 = data.SeacoverLimit;
													}else{
												 		oCDASHM2JsonHeaderLines[3].value3 = data.Currency + " " + thousandsep(data.SeacoverLimit);
											 		}
													/* Manuf. Yr (Age) */
 												 oCDASHM2JsonHeaderLines[3].value4 = data.MfgYear;

												 /****************************************************/
												 /* Manuf. Yr (Age)
												 oCDASHM2JsonHeaderLines[4].value2 = data.MfgYear; */
												 /* UN No.
												 oCDASHM2JsonHeaderLines[4].value3 = data.UnNo;
												 globalUNNo = data.UnNo; */
												 /*SeaCover USD*/
												 oCDASHM2JsonHeaderLines[4].value3 = data.SeacoverLimitUsd;
												 /* Last Cargo Name */
												 oCDASHM2JsonHeaderLines[4].value4 = data.LastCargo;
												 globalLastCargo = data.LastCargo;

												 /****************************************************/
												 oCDASHM2JsonHeaderLinesOthers = {
												   Uom : data.Uom,
												   UnitType : data.UnitType,
												   LaborRate : data.LaborRate,
												   ClearMnrComment : data.ClearMnrComment,
												   MnrComment : data.MnrComment,
												   DisplayInRa : data.DisplayInRa,
												   Uom : data.Uom
												 };
												 }
	                    },
	                  function(error){
	                      //sap.ui.commons.MessageBox.alert("Sorry, there is an error");
	                	  console.log("Get Header : Page 3 Failure");
	                	  busyDialog.close();
	                  });

		var oCDASHM2ModelHeaderDetails = new sap.ui.model.json.JSONModel();
		oCDASHM2ModelHeaderDetails.setData({modelData: oCDASHM2JsonHeaderLines});

      	var oCDASHM2TableHeaderDetails = sap.ui.getCore().byId("idCDASHM2TableHeaderDetails");
      	oCDASHM2TableHeaderDetails.setModel(oCDASHM2ModelHeaderDetails);
      	oCDASHM2TableHeaderDetails.setVisibleRowCount(oCDASHM2JsonHeaderLines.length);
      	oCDASHM2TableHeaderDetails.bindRows("/modelData");
	},

	/* CDASHM2 - Content Header Details */
	setContentHeaderDetails : function(){

		/* Return expected in this format */

		// Depot		// UOM				// Estimate Number
		// City			// On Hire Date		// Currency
		// Lease No		// Gate In Date		// Age
		// Unit Type	// Est Date			// Redel Ref
		// Customer

		/*  Return expected in this format */

	/* CDASHM2 - Table - Header Details */

	var oCDASHM2TableHeaderDetails = new sap.ui.table.Table("idCDASHM2TableHeaderDetails",{
 		visibleRowCount: 5,
 		columnHeaderVisible : false,
 		width: '98%',
 		selectionMode : sap.ui.table.SelectionMode.None
	}).addStyleClass("sapUiSizeCompact tblBorder");

	oCDASHM2TableHeaderDetails.addColumn(new sap.ui.table.Column({
        //label: new sap.ui.commons.Label({text: "", textAlign: "Left"}).addStyleClass("wraptextcol"),
		 template: new sap.ui.commons.TextView({
			 textAlign: "Right"
		 }).bindProperty("text", "label1").addStyleClass("borderStyle1 boldText"),
           resizable:false,
           width:"100px"
		 }));

	oCDASHM2TableHeaderDetails.addColumn(new sap.ui.table.Column({
		 template: new sap.ui.commons.TextView({
			 textAlign: "Left"
		 }).bindProperty("text", "value1").addStyleClass("borderStyle1"),
           resizable:false,
           width:"100px"
		 }));

	oCDASHM2TableHeaderDetails.addColumn(new sap.ui.table.Column({
        //label: new sap.ui.commons.Label({text: "", textAlign: "Left"}).addStyleClass("wraptextcol"),
		 template: new sap.ui.commons.TextView({
			 textAlign: "Right"
		 }).bindProperty("text", "label2").addStyleClass("borderStyle1 boldText"),
           resizable:false,
           width:"115px"
		 }));

	oCDASHM2TableHeaderDetails.addColumn(new sap.ui.table.Column({
		 template: new sap.ui.commons.TextView({
			 textAlign: "Left"
		 }).bindProperty("text", "value2").addStyleClass("borderStyle1"),
           resizable:false,
           width:"135px"
		 }));

	oCDASHM2TableHeaderDetails.addColumn(new sap.ui.table.Column({
        //label: new sap.ui.commons.Label({text: "", textAlign: "Left"}).addStyleClass("wraptextcol"),
		 template: new sap.ui.commons.TextView({
			 textAlign: "Right"
		 }).bindProperty("text", "label3").addStyleClass("borderStyle1 boldText"),
           resizable:false,
           width:"145px"
		 }));

	oCDASHM2TableHeaderDetails.addColumn(new sap.ui.table.Column({
		 template: new sap.ui.commons.TextView({
			 textAlign: "Left"
		 }).bindProperty("text", "value3").addStyleClass("borderStyle1"),
           resizable:false,
           width:"100px"
		 }));

	oCDASHM2TableHeaderDetails.addColumn(new sap.ui.table.Column({
        //label: new sap.ui.commons.Label({text: "", textAlign: "Left"}).addStyleClass("wraptextcol"),
		 template: new sap.ui.commons.TextView({
			 textAlign: "Right"
		 }).bindProperty("text", "label4").addStyleClass("borderStyle1 boldText"),
           resizable:false,
           width:"120px"
		 }));

	oCDASHM2TableHeaderDetails.addColumn(new sap.ui.table.Column({
		 template: new sap.ui.commons.TextView({
			 textAlign: "Left"
		 }).bindProperty("text", "value4").addStyleClass("borderStyle1"),
           resizable:false,
           width:"250px"
		 }));


	/* CDASHM2 - Layout - Header Details */

	var oCDASHM2LayoutHeaderDetails = new sap.ui.layout.form.ResponsiveGridLayout("idCDASHM2LayoutHeaderDetails",{
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

	/* CDASHM2 - Form - Header Details */

	var oCDASHM2FormHeaderDetails = new sap.ui.layout.form.Form("idCDASHM2FormHeaderDetails",{
        layout: oCDASHM2LayoutHeaderDetails,
        formContainers: [
                /*new sap.ui.layout.form.FormContainer("idCDASHM2FormHeaderDetailsC1",{
                    //title: "Summary",
                    formElements: [
										new sap.ui.layout.form.FormElement({
										    fields: [ new sap.ui.commons.Label({
															text : "",
															width : "100px"
														}),
										             ]
										})
                                ]
                }),*/

                new sap.ui.layout.form.FormContainer("idCDASHM2FormHeaderDetailsC2",{
                    //title: "Summary",
                    formElements: [
										new sap.ui.layout.form.FormElement({
										    fields: [oCDASHM2TableHeaderDetails]
										})
                                ]
                }),

        ]
	    }).addStyleClass("marginTopBottom10");

		/* CDASHM2 - Panel - Header Details */

		var oCDASHM2PanelHeaderDetails = new sap.m.Panel("idCDASHM2PanelHeaderDetails",{
			busy : false, // boolean
			busyIndicatorDelay : 1000, // int
			visible : true, // boolean
			headerText : "M&R Summary", // string
			width : "100%",
			height : "auto", // sap.ui.core.CSSSize
			expandable : true, // boolean, since 1.22
			expanded : false, // boolean, since 1.22
			expandAnimation : true, // boolean, since 1.26
			//tooltip : "Filters", // sap.ui.core.TooltipBase
			content : [oCDASHM2TableHeaderDetails], // sap.ui.core.Control
		});

		return oCDASHM2PanelHeaderDetails;
	},

	/* CDASHM2 - Value - Record Details */
	setValueRecordDetails : function(){

		/*oCDASHM2JsonRecordLines[0].value1 = global3SerialNo;
		oCDASHM2JsonRecordLines[1].value1 = global3CurStatus;
		oCDASHM2JsonRecordLines[2].value1 = global3LastAction;

		var oCDASHM2ModelRecordDetails = new sap.ui.model.json.JSONModel();
		oCDASHM2ModelRecordDetails.setData({modelData: oCDASHM2JsonRecordLines});

      	var oCDASHM2TableRecordDetails = sap.ui.getCore().byId("idCDASHM2TableRecordDetails");
      	oCDASHM2TableRecordDetails.setModel(oCDASHM2ModelRecordDetails);
      	oCDASHM2TableRecordDetails.setVisibleRowCount(oCDASHM2JsonRecordLines.length);
      	oCDASHM2TableRecordDetails.bindRows("/modelData");*/

	},

	/* CDASHM2 - Change Process */

	changeCDASHM2Process : function(processKey){

		var oCurrent = this;

	 /* CDASHM2 - Value - Header Details */

		oCurrent.setValueHeaderDetails(false, true);	// first false means this is not from serial istory popup
																									// second true means this is a process change

	 /* CDASHM2 - Value - Record Details */

		/* oCDASHM2.setValueRecordDetails(); */

		/* CDASHM2 - Value - M&R Pictures */
		globalPicPanelExpanded = false;
		var oCDASHM2ContentThumbNail = oCurrent.setContentThumbnail("");
		sap.ui.getCore().byId("idCDASHM2ContentFinal").insertItem(oCDASHM2ContentThumbNail, 5);

	 /* CDASHM2 - Value - Estimate Lines */

		oCurrent.setValueEstimateLines(false, true);	// first false means this is not from serial istory popup
																									// second true means this is a process change

	 /* CDASHM2 - Value - Summary Lines */

	/* oCDASHM2.setValueMiscInfo(); */

	busyDialog.close();

	},

	/* CDASHM2 - Content - Record Details */
	setContentRecordDetails : function(){

	var oCurrent = this;

	/* CDASHM2 - Record Type DropDown */

		var oCDASHM2RecordDetailsValueRecordTypeTop = new sap.m.ComboBox("idCDASHM2RecordDetailsValueRecordTypeTop", {
			 selectionChange: function(evnt){
				if(this.getSelectedKey() != '')
				{
					global3Processkey = this.getSelectedKey();
					oCurrent.changeCDASHM2Process();
				}
	    }
		}).bindProperty("selectedKey", "value1").addStyleClass("borderStyle1");

		for(var i=0; i<oCDASHM2JsonProcesses.length;i++){
			oCDASHM2RecordDetailsValueRecordTypeTop.addItem(new sap.ui.core.ListItem({
					text : oCDASHM2JsonProcesses[i].text,
					key: oCDASHM2JsonProcesses[i].key
				}));
		}
		oCDASHM2RecordDetailsValueRecordTypeTop.setSelectedKey(oCDASHM2JsonProcesses[0].key);

		/* Return expected in this format */

		// Serial No.
		// Record Type
		// Current M&R Status
		// Last Action

		/*  Return expected in this format */

	/* CDASHM2 - Table - Record Details */

	var oCDASHM2TableRecordDetails = new sap.ui.table.Table("idCDASHM2TableRecordDetails",{
 		visibleRowCount: 5,
 		columnHeaderVisible : false,
 		width: '60%',
 		selectionMode : sap.ui.table.SelectionMode.None
	}).addStyleClass("sapUiSizeCompact tblBorder");

	oCDASHM2TableRecordDetails.addColumn(new sap.ui.table.Column({
        //label: new sap.ui.commons.Label({text: "", textAlign: "Left"}).addStyleClass("wraptextcol"),
		 template: new sap.ui.commons.TextView({
			 textAlign: "Left"
		 }).bindProperty("text", "label1").addStyleClass("borderStyle1 boldText"),
			 resizable:false,
	     width:"40px"
		 })).addStyleClass("wraptext");

	 oCDASHM2TableRecordDetails.addColumn(new sap.ui.table.Column({
 		 template: oCDASHM2RecordDetailsValueRecordTypeTop,
 					 resizable:false,
 					 width:"60px"
 		}));

		oCDASHM2TableRecordDetails.addColumn(new sap.ui.table.Column({
	        //label: new sap.ui.commons.Label({text: "", textAlign: "Left"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({
				 textAlign: "Left"
			 }).bindProperty("text", "label2").addStyleClass("borderStyle1 boldText"),
				 resizable:false,
		     width:"40px"
			 })).addStyleClass("wraptext");

	 oCDASHM2TableRecordDetails.addColumn(new sap.ui.table.Column({
	        //label: new sap.ui.commons.Label({text: "", textAlign: "Left"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({
				 textAlign: "Left"
			 }).bindProperty("text", "value2").addStyleClass("borderStyle1"),
				 resizable:false,
		     width:"40px"
			 })).addStyleClass("wraptext");

			 oCDASHM2TableRecordDetails.addColumn(new sap.ui.table.Column("idCDASHM2TableRecordDetailsMNRStatusLabel",{
						 //label: new sap.ui.commons.Label({text: "", textAlign: "Left"}).addStyleClass("wraptextcol"),
					template: new sap.ui.commons.TextView({
						textAlign: "Left"
					}).bindProperty("text", "label3").addStyleClass("borderStyle1 boldText"),
						resizable:false,
						width:"40px"
					})).addStyleClass("wraptext");

			oCDASHM2TableRecordDetails.addColumn(new sap.ui.table.Column("idCDASHM2TableRecordDetailsMNRStatusValue",{
						 //label: new sap.ui.commons.Label({text: "", textAlign: "Left"}).addStyleClass("wraptextcol"),
					template: new sap.ui.commons.TextView({
						textAlign: "Left"
					}).bindProperty("text", "value3").addStyleClass("borderStyle1"),
						resizable:false,
						width:"100px"
					})).addStyleClass("wraptext");

		return oCDASHM2TableRecordDetails;

	},


	/* CDASHM2 - Content - Summary Lines */
	setContentMiscInfo : function(){

		/* CDASHM2 - Text Area - Notes 1 */

		var oCDASHM2TextAreaNotes1 = new sap.m.TextArea("idCDASHM2TextAreaNotes1",{
				placeholder : "Notes 1",
				height : "60px",
				width : "300px",
				enabled : false
			}).addStyleClass("commentsPanel");

		/* CDASHM2 - Text Area - Notes 2 */

		var oCDASHM2TextAreaNotes2 = new sap.m.TextArea("idCDASHM2TextAreaNotes2",{
				placeholder : "Notes 2",
				height : "60px",
				width : "300px",
				enabled : false
			}).addStyleClass("commentsPanel");

		/* CDASHM2 - Text Area - Notes 3 */

		var oCDASHM2TextAreaNotes3 = new sap.m.TextArea("idCDASHM2TextAreaNotes3",{
				placeholder : "Notes 3",
				height : "60px",
				width : "300px",
				enabled : false
			}).addStyleClass("commentsPanel");

		/* CDASHM2 - Text Area - Notes 4 */

		var oCDASHM2TextAreaNotes4 = new sap.m.TextArea("idCDASHM2TextAreaNotes4",{
				placeholder : "Notes 4",
				height : "60px",
				width : "300px",
				enabled : false
			}).addStyleClass("commentsPanel");

		/* CDASHM2 - Text Area - Notes 5 */

		var oCDASHM2TextAreaNotes5 = new sap.m.TextArea("idCDASHM2TextAreaNotes5",{
				placeholder : "Notes 5",
				height : "60px",
				width : "300px",
				enabled : false
			}).addStyleClass("commentsPanel");

		/* CDASHM2 - FlexBox - Notes Line 1 */

		var oCDASHM2FlexNotesLine1 = new sap.m.FlexBox("idCDASHM2FlexNotesLine1",{
		    items: [
		            oCDASHM2TextAreaNotes1,
		            new sap.m.Label({width:"15px"}),
		            oCDASHM2TextAreaNotes2
		            ],
		    direction: "Row"
		    });

		/* CDASHM2 - FlexBox - Notes Line 2 */

		var oCDASHM2FlexNotesLine2 = new sap.m.FlexBox("idCDASHM2FlexNotesLine2",{
		    items: [
		            oCDASHM2TextAreaNotes3,
		            new sap.m.Label({width:"15px"}),
		            oCDASHM2TextAreaNotes4
		            ],
		    direction: "Row"
		    });

		/* CDASHM2 - FlexBox - Notes Line 3 */

		var oCDASHM2FlexNotesLine3 = new sap.m.FlexBox("idCDASHM2FlexNotesLine3",{
		    items: [
		            oCDASHM2TextAreaNotes5
		            ],
		    direction: "Row"
		    });

		/* CDASHM2 - FlexBox - Notes */

		var oCDASHM2FlexNotes = new sap.m.FlexBox("idCDASHM2FlexNotes",{
		    items: [
		            oCDASHM2FlexNotesLine1,
		            oCDASHM2FlexNotesLine2,
		            oCDASHM2FlexNotesLine3
		            ],
		    direction: "Column"
		    });


		/* CDASHM2 - Table - Summary Lines */

		var oCDASHM2TableMiscInfo = new sap.ui.table.Table("idCDASHM2TableMiscInfo",{
     		 visibleRowCount: 4,
//            //firstVisibleRow: 3,
//            //fixedColumnCount: 3,
//            columnHeaderHeight: 30,
//            //width: '99%',
//            //fixedRowCount : 1,
//            enableColumnReordering : true,
//            enableGrouping : true,
//            showColumnVisibilityMenu : true,
             selectionMode: sap.ui.table.SelectionMode.None,
		}).addStyleClass("sapUiSizeCompact tblBorder");

		oCDASHM2TableMiscInfo.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "", textAlign: "Left"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({
			 }).bindProperty("text", "type").addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"50px"
			 }));

		oCDASHM2TableMiscInfo.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Lab Cost", textAlign: "Left"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({
			 }).bindProperty("text", "labcost").addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"50px"
			 }));

		oCDASHM2TableMiscInfo.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Mat Cost", textAlign: "Left"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({
			 }).bindProperty("text", "matcost").addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"50px"
			 }));

		oCDASHM2TableMiscInfo.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Total", textAlign: "Left"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({
			 }).bindProperty("text", "total").addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"50px"
			 }));

		/* CDASHM2 - Layout - Summary Lines */

		var oCDASHM2LayoutMiscInfo = new sap.ui.layout.form.ResponsiveGridLayout("idCDASHM2LayoutMiscInfo",{
										    	labelSpanL: 1,
										        labelSpanM: 1,
										        labelSpanS: 1,
										        emptySpanL: 0,
										        emptySpanM: 0,
										        emptySpanS: 0,
										        columnsL: 4,
										        columnsM: 3,
										        columnsS: 2,
										        breakpointL: 765,
										        breakpointM: 320
										    });

		/* CDASHM2 - Form - Summary Lines */

		var oCDASHM2FormMiscInfo = new sap.ui.layout.form.Form("idCDASHM2FormMiscInfo",{
            layout: oCDASHM2LayoutMiscInfo,
            formContainers: [
                    new sap.ui.layout.form.FormContainer("idCDASHM2FormMiscInfoC1",{
                        //title: "Summary",
                        formElements: [
											new sap.ui.layout.form.FormElement({
											    fields: [ new sap.ui.commons.Label({
																text : "",
																width : "100px"
															}),
											             ]
											})
                                    ]
                    }),

                    new sap.ui.layout.form.FormContainer("idCDASHM2FormMiscInfoC2",{
                        //title: "Summary",
                        formElements: [
											new sap.ui.layout.form.FormElement({
											    fields: [ new sap.ui.commons.Label({
																text : "",
																width : "100px"
															}),
											             ]
											})
                                    ]
                    }),

                    new sap.ui.layout.form.FormContainer("idCDASHM2FormMiscInfoC3",{
                        //title: "Summary",
                        formElements: [
											new sap.ui.layout.form.FormElement({
											    fields: [ new sap.ui.commons.Label({
																text : "",
																width : "100px"
															}),
											             ]
											})
                                    ]
                    }),

                    new sap.ui.layout.form.FormContainer("idCDASHM2FormMiscInfoC4",{
                        title: "Summary",
	                    formElements: [
											new sap.ui.layout.form.FormElement({
											    fields: [oCDASHM2TableMiscInfo]
											})
	                                ]
                    }),

            ]
		});

		/* CDASHM2 - Panel - Summary Lines */

		var oCDASHM2PanelMiscInfo = new sap.m.Panel("idCDASHM2PanelMiscInfo",{
			busy : false, // boolean
			busyIndicatorDelay : 1000, // int
			visible : true, // boolean
			headerText : "Misc Information", // string
			width : "100%",
			height : "auto", // sap.ui.core.CSSSize
			expandable : true, // boolean, since 1.22
			expanded : false, // boolean, since 1.22
			expandAnimation : true, // boolean, since 1.26
			//tooltip : "Filters", // sap.ui.core.TooltipBase
			content : [oCDASHM2FlexNotes], // sap.ui.core.Control	oCDASHM2FormMiscInfo
		});

		return oCDASHM2PanelMiscInfo;
	},

	/* CDASHM2 - Value - Summary Lines */
	setValueMiscInfo : function(){

		var oCDASHM2ModelMiscInfo = new sap.ui.model.json.JSONModel();
		oCDASHM2ModelMiscInfo.setData({modelData: oCDASHM2JsonMiscInfo});

      	var oCDASHM2TableMiscInfo = sap.ui.getCore().byId("idCDASHM2TableMiscInfo");
      	oCDASHM2TableMiscInfo.setModel(oCDASHM2ModelMiscInfo);
      	oCDASHM2TableMiscInfo.setVisibleRowCount(oCDASHM2JsonMiscInfo.length);
      	oCDASHM2TableMiscInfo.bindRows("/modelData");

	},

	/* CDASHM2 - Content - Estimate Lines */
	setContentEstimateLines : function(){

		/* CDASHM2 - Table - Estimate Lines */

		var oCDASHM2TableEstimateLinesUI = new sap.ui.table.Table("idCDASHM2TableEstimateLinesUI",{
//    		visibleRowCount: 15,
//            //firstVisibleRow: 3,
//            //fixedColumnCount: 3,
//            columnHeaderHeight: 30,
//            //width: '99%',
//            //fixedRowCount : 1,
//            enableColumnReordering : true,
//            enableGrouping : true,
//            showColumnVisibilityMenu : true,
             selectionMode: sap.ui.table.SelectionMode.None,
             toolbar: new sap.ui.commons.Toolbar({
 				items: [
 					new sap.ui.commons.Button({
			                  text: "Toggle ISO Description",
			                  styled : false,
	     		   			  press : function(){

	     		   				if(globalIsLineCodeDesc == "CODE"){
	     		   				globalIsLineCodeDesc = "DESC";
	     		   				for(var i=0; i<oCDASHM2JsonEstimateLines.length; i++){
	     		   				   oCDASHM2JsonEstimateLines[i].locationdisp = oCDASHM2JsonEstimateLines[i].locationt;
	     		   				   oCDASHM2JsonEstimateLines[i].componentdisp = oCDASHM2JsonEstimateLines[i].componentt;
	     		   				 	 oCDASHM2JsonEstimateLines[i].damagedisp = oCDASHM2JsonEstimateLines[i].damaget;
	     		   					 oCDASHM2JsonEstimateLines[i].materialdisp = oCDASHM2JsonEstimateLines[i].materialt;
	     		   					 oCDASHM2JsonEstimateLines[i].repairdisp = oCDASHM2JsonEstimateLines[i].repairt;
	     		   				}
	     		   				}else if(globalIsLineCodeDesc == "DESC"){
	     		   				globalIsLineCodeDesc = "CODE";
		     		   				for(var i=0; i<oCDASHM2JsonEstimateLines.length; i++){
		     		   				     oCDASHM2JsonEstimateLines[i].locationdisp = oCDASHM2JsonEstimateLines[i].location;
		     		   				     oCDASHM2JsonEstimateLines[i].componentdisp = oCDASHM2JsonEstimateLines[i].component;
		     		   				 	 oCDASHM2JsonEstimateLines[i].damagedisp = oCDASHM2JsonEstimateLines[i].damage;
		     		   					 oCDASHM2JsonEstimateLines[i].materialdisp = oCDASHM2JsonEstimateLines[i].material;
		     		   					 oCDASHM2JsonEstimateLines[i].repairdisp = oCDASHM2JsonEstimateLines[i].repair;
		     		   				}
		     		   			}
	     		   				sap.ui.getCore().byId("idCDASHM2TableEstimateLinesUI").getModel().updateBindings();
	     		   			  }
							  })
 				]
 			}),
//			 footer: new sap.ui.commons.Label({
//		         text:"123"
//		       }),
//            visibleRowCountMode : sap.ui.table.VisibleRowCountMode.Interactive,
		}).addStyleClass("sapUiSizeCompact tblBorder");

		oCDASHM2TableEstimateLinesUI.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Line", textAlign: "Left"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({
			 }).bindProperty("text", "sno").addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"50px",
	           // sortProperty: "sno",
	           // filterProperty : "sno",
			 }));

		oCDASHM2TableEstimateLinesUI.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Component", textAlign: "Left"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView("CMP",{
			 }).bindProperty("text", "componentdisp"
			 // 	,function(cellValue){
				//  if(this.getParent().getBindingContext() != undefined){
				//  var componentc = this.getParent().getBindingContext().getProperty("componentc");
				//  if(componentc == "X"){
				// 	 this.addStyleClass("jsChange");
				//  }else{
				// 	 this.removeStyleClass("jsChange");
				//  }
			 // 	 }
				//  return cellValue;
			 // }
		 	).addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"200px",
						 // sortProperty: "componentdisp",
	           // filterProperty : "componentdisp",
			 }));

		oCDASHM2TableEstimateLinesUI.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Damage", textAlign: "Left"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView("DMG",{
			 }).bindProperty("text", "damagedisp"
			 // , function(cellValue){
				//  if(this.getParent().getBindingContext() != undefined){
				//  var damagec = this.getParent().getBindingContext().getProperty("damagec");
				//  if(damagec == "X"){
				// 	 this.addStyleClass("jsChange");
				//  }else{
				// 	 this.removeStyleClass("jsChange");
				//  }
			 // 	 }
				//  return cellValue;
			 // }
		 ).addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"120px",
	           // sortProperty: "damagedisp",
	           // filterProperty : "damagedisp",
			 }));

		oCDASHM2TableEstimateLinesUI.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Repair", textAlign: "Left"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView("REP",{
			 }).bindProperty("text", "repairdisp"
			 // 	, function(cellValue){
				//  if(this.getParent().getBindingContext() != undefined){
				//  var repairc = this.getParent().getBindingContext().getProperty("repairc");
				//  if(repairc == "X"){
				// 	 this.addStyleClass("jsChange");
				//  }else{
				// 	 this.removeStyleClass("jsChange");
				//  }
			 // 	 }
				//  return cellValue;
			 // }
		 	).addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"120px",
	           // sortProperty: "repairdisp",
	           // filterProperty : "repairdisp",
			 }));

		oCDASHM2TableEstimateLinesUI.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Location", textAlign: "Left"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView("LOC",{
			 }).bindProperty("text", "locationdisp"
			 // , function(cellValue){
				//  if(this.getParent().getBindingContext() != undefined){
				//  var materialc = this.getParent().getBindingContext().getProperty("locationc");
				//  if(materialc == "X"){
				// 	 this.addStyleClass("jsChange");
				//  }else{
				// 	 this.removeStyleClass("jsChange");
				//  }
				//  }
				//  return cellValue;
			 // }
		 	).addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"200px",
	           // sortProperty: "locationdisp",
	           // filterProperty : "locationdisp",
			 }));

		oCDASHM2TableEstimateLinesUI.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Material", textAlign: "Left"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView("MATR",{
			 }).bindProperty("text", "materialdisp"
			 // , function(cellValue){
				//  if(this.getParent().getBindingContext() != undefined){
				//  var materialc = this.getParent().getBindingContext().getProperty("materialc");
				//  if(materialc == "X"){
				// 	 this.addStyleClass("jsChange");
				//  }else{
				// 	 this.removeStyleClass("jsChange");
				//  }
			 // 	 }
				//  return cellValue;
			 // }
		 ).addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"150px",
	           // sortProperty: "materialdisp",
	           // filterProperty : "materialdisp",
			 }));

		oCDASHM2TableEstimateLinesUI.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Length"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView("LEN",{
				 textAlign: "Right"
			 }).bindProperty("text", "length"
			 // , function(cellValue){
				//  if(this.getParent().getBindingContext() != undefined){
				//  var materialc = this.getParent().getBindingContext().getProperty("lengthc");
				//  if(materialc == "X"){
				// 	 this.addStyleClass("jsChange");
				//  }else{
				// 	 this.removeStyleClass("jsChange");
				//  }
			 // 	 }
				//  return cellValue;
			 // }
		 ).addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"70px",
	           // sortProperty: "length",
	           // filterProperty : "length",
			 }));

		oCDASHM2TableEstimateLinesUI.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Width"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView("WID",{
				 textAlign: "Right"
			 }).bindProperty("text", "width"
			 // 	, function(cellValue){
				//  if(this.getParent().getBindingContext() != undefined){
				//  var materialc = this.getParent().getBindingContext().getProperty("widthc");
				//  if(materialc == "X"){
				// 	 this.addStyleClass("jsChange");
				//  }else{
				// 	 this.removeStyleClass("jsChange");
				//  }
			 // 	 }
				//  return cellValue;
			 // }
		 	).addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"70px",
	           // sortProperty: "width",
	           // filterProperty : "width",
			 }));

		oCDASHM2TableEstimateLinesUI.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Qty"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView("QTY",{
				 textAlign: "Right"
			 }).bindProperty("text", "qty"
					 // 		, function(cellValue){
					 //
						//  if(this.getParent().getBindingContext() != undefined){
						//  var qtyc = this.getParent().getBindingContext().getProperty("qtyc");
						//  if(qtyc == "X"){
						// 	 this.addStyleClass("jsChange");
						//  }else{
						// 	 this.removeStyleClass("jsChange");
						//  }
					 // 	 }
						//  return cellValue;
					 // }
		 		).addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"50px",
	           //width:"75px",
	           // sortProperty: "qty",
	           // filterProperty : "qty",
			 }));

		oCDASHM2TableEstimateLinesUI.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Hrs"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView("HRS",{
				 textAlign: "Right"
			 }).bindProperty("text", "hrs"
			 	, function(cellValue) {

				 if(this.getParent().getBindingContext() != undefined){
				 // var hrsc = this.getParent().getBindingContext().getProperty("hrsc");
				 // if(hrsc == "X"){
					//  this.addStyleClass("jsChange");
				 // }else{
					//  this.removeStyleClass("jsChange");
				 // }


				 var component = this.getParent().getBindingContext().getProperty("component");
				 if (component == "") {
             this.addStyleClass('boldText');
         } else{
        	 this.removeStyleClass('boldText');
         }
				 }
  		         return cellValue;
  		     }
				 	).addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"90px",
	           //width:"75px",
	           //sortProperty: "hrs",
	           //filterProperty : "hrs",
			 }));

		oCDASHM2TableEstimateLinesUI.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Lab Cost"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView("LABC",{
				 textAlign: "Right"
			 }).bindProperty("text", "labcost"
			 			, function(cellValue) {

									 if(this.getParent().getBindingContext() != undefined){
									 // var labcostc = this.getParent().getBindingContext().getProperty("labcostc");
									 // if(labcostc == "X"){
										//  this.addStyleClass("jsChange");
									 // }else{
										//  this.removeStyleClass("jsChange");
									 // }


									 var component = this.getParent().getBindingContext().getProperty("component");
									 if (component == ""){
					             this.addStyleClass('boldText');
					         } else{
					        	 this.removeStyleClass('boldText');
					         }
									 }
					         return cellValue;
  		     }).addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"90px",
	           //sortProperty: "labcost",
	           //filterProperty : "labcost",
			 }));

		oCDASHM2TableEstimateLinesUI.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Mat Cost"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView("MATC",{
				 textAlign: "Right"
			 }).bindProperty("text", "matcost"
			 		, function(cellValue) {

				 if(this.getParent().getBindingContext() != undefined){
				 // var matcostc = this.getParent().getBindingContext().getProperty("matcostc");
				 // if(matcostc == "X"){
					//  this.addStyleClass("jsChange");
				 // }else{
					//  this.removeStyleClass("jsChange");
				 // }

				 var component = this.getParent().getBindingContext().getProperty("component");
				 if (component == ""){
             this.addStyleClass('boldText');
         } else{
        	 this.removeStyleClass('boldText');
         }
			 	 }

  		         return cellValue;
  		     }).addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"90px",
	           //sortProperty: "matcost",
	           //filterProperty : "matcost",
			 }));

		oCDASHM2TableEstimateLinesUI.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Total"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView("TOT",{
				 textAlign: "Right"
			 }).bindProperty("text", "total"
			 		, function(cellValue) {

				 if(this.getParent().getBindingContext() != undefined){
				 // var totalc = this.getParent().getBindingContext().getProperty("totalc");
				 // if(totalc == "X"){
					//  this.addStyleClass("jsChange");
				 // }else{
					//  this.removeStyleClass("jsChange");
				 // }

				 var component = this.getParent().getBindingContext().getProperty("component");
				 if (component == ""){
             this.addStyleClass('boldText');
         } else{
        	 this.removeStyleClass('boldText');
         }

			 	 }

  		         return cellValue;
  		     }).addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"90px",
	           //sortProperty: "total",
	           //filterProperty : "total",
			 }));

		oCDASHM2TableEstimateLinesUI.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Resp", textAlign: "Left"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView("RES",{
			 }).bindProperty("text", "resp"
			 // , function(cellValue){
				//  if(this.getParent().getBindingContext() != undefined){
				//  var respc = this.getParent().getBindingContext().getProperty("respc");
				//  if(respc == "X"){
				// 	 this.addStyleClass("jsChange");
				//  }else{
				// 	 this.removeStyleClass("jsChange");
				//  }
			 // 	 }
				//  return cellValue;
			 // }
		 ).addStyleClass("borderStyle1"),
	           resizable:false,
	           width:"60px",
	           //sortProperty: "resp",
	           //filterProperty : "resp",
			 }));

		// var oCDASHM2TableEstimateLines = new sap.m.Table("idCDASHM2TableEstimateLines", {
		// 			 fixedLayout: false,
		// 			 growing : false,
		// 			 inset : false,
		// 			 noDataText : "No Estimate Lines",
		// 			 //headerText : "Draft Collections",
		// 			 //headerToolbar : oOffCJOToolbarCollectionList,
		// 			 columns: [
		//
		// 				   new sap.m.Column({
		// 				                    //width: "50%",
		// 				                    header: new sap.m.Text({
		// 				                                           text: "Line",
		// 				                                           })
		// 				                    }),
		//
		// 				   new sap.m.Column({
		// 				                    //width : "50%",
		// 				                    header: new sap.m.Text({
		// 				                                           text: "Component"
		// 				                                           })
		// 				                    }),
		//
		// 				   new sap.m.Column({
		// 				                    //width: "50%",
		// 				                    header: new sap.m.Text({
		// 				                                           text: "Damage",
		// 				                                           })
		// 				                    }),
		//
		// 				   new sap.m.Column({
		// 				                    //width : "50%",
		// 				                    header: new sap.m.Text({
		// 				                                           text: "Repair"
		// 				                                           })
		// 				                    }),
		//
		// 				   new sap.m.Column({
		// 				                    //width: "50%",
		// 				                    header: new sap.m.Text({
		// 				                                           text: "Location",
		// 				                                           })
		// 				                    }),
		//
		// 				   /*new sap.m.Column({
		// 				                    //width: "50%",
		// 				                    header: new sap.m.Text({
		// 				                                           text: "Locn ISO",
		// 				                                           })
		// 				                    }),*/
		//
		// 				   new sap.m.Column({
		// 				                    //width : "50%",
		// 				                    header: new sap.m.Text({
		// 				                                           text: "Material"
		// 				                                           })
		// 				                    }),
		//
		// 				   new sap.m.Column({
		// 				                    //width: "50%",
		// 				                    header: new sap.m.Text({
		// 				                                           text: "Length",
		// 				                                                   })
		// 				                            }),
		//
    //                         new sap.m.Column({
		// 	                    //width: "50%",
		// 	                    header: new sap.m.Text({
		// 	                                           text: "Width",
		// 	                                                   })
		// 	                            }),
		//
    //                         new sap.m.Column({
		// 	                    //width: "50%",
		// 	                    header: new sap.m.Text({
		// 	                                           text: "Qty",
		// 	                                                   })
		// 	                            }),
		//
    //                         new sap.m.Column({
		// 	                    //width: "50%",
		// 	                    header: new sap.m.Text({
		// 	                                           text: "Hrs",
		// 	                                                   })
		// 	                            }),
		//
    //                         new sap.m.Column({
		// 	                    //width: "50%",
		// 	                    header: new sap.m.Text({
		// 	                                           text: "Lab Cost",
		// 	                                                   }),
    //                            footer : new sap.m.Text({
    //                         	   					text : "108"
    //                            					})
		// 	                            }),
		//
    //                         new sap.m.Column({
		// 	                    //width: "50%",
		// 	                    header: new sap.m.Text({
		// 	                                           text: "Mat Cost",
		// 	                                                   }),
    //                            footer : new sap.m.Text({
    //        	   						text : "328.66"
    //           					})
		// 	                            }),
		//
    //                         new sap.m.Column({
		// 	                    //width: "50%",
		// 	                    header: new sap.m.Text({
		// 	                                           text: "Total",
		// 	                                                   }),
    //                            footer : new sap.m.Text({
    //       	   						text : "436.66"
    //          					})
		// 	                            }),
		//
    //                         new sap.m.Column({
		// 	                    //width: "50%",
		// 	                    header: new sap.m.Text({
		// 	                                           text: "Resp",
		// 	                                                   })
		// 	                            }),
		//
		// 				           ],
		//
		// 				 items : {
		// 				 path: "oCDASHM2ModelEstimateLines>/",
		// 				 template: new sap.m.ColumnListItem({
    //                                 selected: false,
    //                                 //type: "Active",
    //                         cells: [
		//
    //                                 new sap.m.Text({
    //                                                text : "{oCDASHM2ModelEstimateLines>sno}"
    //                                                }),
		//
    //                                 new sap.m.Text({
    //                                                text : "{oCDASHM2ModelEstimateLines>componentdisp}"
    //                                                }),
		//
    //                                 new sap.m.Text({
    //                                                text : "{oCDASHM2ModelEstimateLines>damagedisp}"
    //                                                }),
		//
    //                                 new sap.m.Text({
    //                                                text : "{oCDASHM2ModelEstimateLines>repairdisp}"
    //                                                }),
		//
    //                                 new sap.m.Text({
    //                                                text : "{oCDASHM2ModelEstimateLines>locationdisp}"
    //                                                }),
		//
    //                                 /*new sap.m.Text({
    //                                                text : "{oCDASHM2ModelEstimateLines>locationiso}"
    //                                                }),*/
		//
    //                                 new sap.m.Text({
    //                                                text : "{oCDASHM2ModelEstimateLines>materialdisp}"
    //                                                }),
		//
    //                                new sap.m.Text({
    //                                                text : "{oCDASHM2ModelEstimateLines>length}"
    //                                                }),
		//
    //                                 new sap.m.Text({
    //                                                text : "{oCDASHM2ModelEstimateLines>width}"
    //                                                }),
		//
    //                                 new sap.m.Text({
    //                                                text : "{oCDASHM2ModelEstimateLines>qty}"
    //                                                }),
		//
    //                                 new sap.m.Text({
		// 	                                       text : "{oCDASHM2ModelEstimateLines>hrs}"
		// 	                                       }),
		//
    //                                 new sap.m.Text({
    //                                                    text : "{oCDASHM2ModelEstimateLines>labcost}"
    //                                                    }),
		//
    //                                 new sap.m.Text({
    //                                                    text : "{oCDASHM2ModelEstimateLines>matcost}"
    //                                                    }),
		//
    //                                 new sap.m.Text({
    //                                                    text : "{oCDASHM2ModelEstimateLines>total}"
    //                                                    }),
		//
    //                                 new sap.m.Text({
    //                                                    text : "{oCDASHM2ModelEstimateLines>resp}"
    //                                                    }),
		//
		//
    //                                 ]})}}).addStyleClass('sapUiSizeCompact margintop70p');

		/* CDASHM2 - Panel - Estimate Lines */

		var oCDASHM2PanelEstimateLines = new sap.m.Panel("idCDASHM2PanelEstimateLines",{
			busy : false, // boolean
			busyIndicatorDelay : 1000, // int
			visible : true, // boolean
			headerText : "Estimate Details",
			width : "100%",
			height : "auto", // sap.ui.core.CSSSize
			expandable : true, // boolean, since 1.22
			expanded : false, // boolean, since 1.22
			expandAnimation : true, // boolean, since 1.26
			//tooltip : "Filters", // sap.ui.core.TooltipBase
			content : [oCDASHM2TableEstimateLinesUI], // sap.ui.core.Control
		});



		return oCDASHM2PanelEstimateLines;

	},

	/* CDASHM2 - Value - Estimate Lines */
	setValueEstimateLines : function(isFromSerialHistory, isProcessChange){
		var oCurrent = this;
		var local3EstimateNo = global3EstimateNo;
		var local3DocType = global3DocType;
		var local3DocText = global3DocText;
		var local3DocCat = global3DocCat;
		var local3DocDate = global3DocDate;

		if(!isFromSerialHistory){
			local3EstimateNo = "";
			local3DocType = "";
			local3DocText = "";
			local3DocCat = "";
			local3DocDate = "";
		}

		console.log("Get Item : Page 3");
		if(isProcessChange == false){
			var urlToSap = "item3Set?$filter=IvSerial eq '" + global3SerialNo +
											 "' and IvEstimate eq '" + global3EstimateNo +
											 "' and IvDepot eq '" + global3Depot +
											 "' and IvDocType eq '" + local3DocType +
											 "' and IvDocText eq '" + local3DocText +
											 "' and IvDocCat eq '" + local3DocCat +
											 "' and IvDocDate eq '" + local3DocDate +
											 "'";
		}else{
			var processkey = sap.ui.getCore().byId("idCDASHM2RecordDetailsValueRecordTypeTop").getSelectedKey();
			var encodedGateInDate = encodeURIComponent(globalGateInDate);
		  var urlToSap = "item3pcSet?$filter=IvSerial eq '" + global3SerialNo +
											"' and IvDocCat eq '" + global3Processkey +
											"' and IvDepot eq '" + global3Depot +
											"' and IvGateinDate eq '" + encodedGateInDate +
											"'";
		}

    	urlToSap = serviceDEP + urlToSap;
    	oModel = new sap.ui.model.odata.ODataModel(serviceDEP, true);
	        busyDialog.open();
	        console.log(urlToSap);
	        OData.request({
	                      requestUri: urlToSap,
	                      method: "GET",
	                      dataType: 'json',
	                      async: false,
	                      headers:
	                      {
	                      "X-Requested-With": "XMLHttpRequest",
	                      "Content-Type": "application/json; charset=utf-8",
	                      "DataServiceVersion": "2.0",
	                      "X-CSRF-Token":"Fetch"
	                      }
	                      },
	                      function (data, response){
	                    	 console.log("Get Item : Page 3 Success");

	                    	 var oCDASHM2JsonEstimateLinesLoc = data.results;
	                    	 oCDASHM2JsonEstimateLines = [];
												 var hrslocal = "";
												 var labcostlocal = "";
												 var matcostlocal = "";
												 var totallocal = "";
	                    	 for(var i=0; i<oCDASHM2JsonEstimateLinesLoc.length; i++){

													 if(oCDASHM2JsonEstimateLinesLoc[i].RepairLength == "")
													 	oCDASHM2JsonEstimateLinesLoc[i].RepairLength = "0.00";

														if(oCDASHM2JsonEstimateLinesLoc[i].RepairWidth == "")
 													 	oCDASHM2JsonEstimateLinesLoc[i].RepairWidth = "0.00";

														// if(oCDASHM2JsonEstimateLinesLoc[i].ManHours == "")
 													 	// oCDASHM2JsonEstimateLinesLoc[i].ManHours = "0.00";
														//
														// if(oCDASHM2JsonEstimateLinesLoc[i].MaterialCost == "")
 													 	// oCDASHM2JsonEstimateLinesLoc[i].MaterialCost = "0.00";
														//
														// if(oCDASHM2JsonEstimateLinesLoc[i].LabourRate == "")
 													 	// oCDASHM2JsonEstimateLinesLoc[i].LabourRate = "0.00";
														//
														// if(oCDASHM2JsonEstimateLinesLoc[i].TotalCost == "")
 													 	// oCDASHM2JsonEstimateLinesLoc[i].TotalCost = "0.00";

														/* Hours */

														if(oCDASHM2JsonEstimateLinesLoc[i].ManHours == "Total"){
																hrslocal = oCDASHM2JsonEstimateLinesLoc[i].ManHours;
														}else{
																hrslocal = oCDASHM2JsonEstimateLinesLoc[i].ManHours;
														}

														/* Lab Cost */

														if(oCDASHM2JsonEstimateLinesLoc[i].ManHours == "Total"){
																labcostlocal = thousandsep(oCDASHM2JsonEstimateLinesLoc[i].LabourCost);
														}else{
																labcostlocal = oCDASHM2JsonEstimateLinesLoc[i].LabourCost;
														}

														/* Mat Cost */

														if(oCDASHM2JsonEstimateLinesLoc[i].ManHours == "Total"){
																matcostlocal = thousandsep(oCDASHM2JsonEstimateLinesLoc[i].MaterialCost);
														}else if(oCDASHM2JsonEstimateLinesLoc[i].LabourCost == "Seacover"
																			|| oCDASHM2JsonEstimateLinesLoc[i].LabourCost == "Lessee"
																				|| oCDASHM2JsonEstimateLinesLoc[i].LabourCost == "Owner"){
																matcostlocal = thousandsep(oCDASHM2JsonEstimateLinesLoc[i].MaterialCost);
														}else if(oCDASHM2JsonEstimateLinesLoc[i].LineItem == ""){
																matcostlocal = oCDASHM2JsonEstimateLinesLoc[i].MaterialCost;
														}else{
																matcostlocal = thousandsep(oCDASHM2JsonEstimateLinesLoc[i].MaterialCost);
														}

														/* Total */

														if(oCDASHM2JsonEstimateLinesLoc[i].ManHours == "Total"){
																totallocal = thousandsep(oCDASHM2JsonEstimateLinesLoc[i].TotalCost);
														}else if(oCDASHM2JsonEstimateLinesLoc[i].LabourCost == "Seacover"
																			|| oCDASHM2JsonEstimateLinesLoc[i].LabourCost == "Lessee"
																				|| oCDASHM2JsonEstimateLinesLoc[i].LabourCost == "Owner"){
																totallocal = thousandsep(oCDASHM2JsonEstimateLinesLoc[i].TotalCost);
														}else if(oCDASHM2JsonEstimateLinesLoc[i].LineItem == ""){
																totallocal = oCDASHM2JsonEstimateLinesLoc[i].TotalCost;
														}else{
																totallocal = thousandsep(oCDASHM2JsonEstimateLinesLoc[i].TotalCost);
														}

														oCDASHM2JsonEstimateLines.push({
 		                    			sno : oCDASHM2JsonEstimateLinesLoc[i].LineItem,
 															locationc : oCDASHM2JsonEstimateLinesLoc[i].LocationCodeC,
 		                    			componentc : oCDASHM2JsonEstimateLinesLoc[i].ComponentCodeC,
 		                    			damagec : oCDASHM2JsonEstimateLinesLoc[i].DamageCodeC,
 		                    			materialc : oCDASHM2JsonEstimateLinesLoc[i].MaterialCodeC,
 		                    			repairc : oCDASHM2JsonEstimateLinesLoc[i].RepairCodeC,
 															lengthc : oCDASHM2JsonEstimateLinesLoc[i].RepairLengthC,
 		                    			widthc : oCDASHM2JsonEstimateLinesLoc[i].RepairWidthC,
 		                    			measurec : oCDASHM2JsonEstimateLinesLoc[i].RepairMeasureUnitC,
 		                    			qtyc : oCDASHM2JsonEstimateLinesLoc[i].QuantityC,
 		                    			hrsc : oCDASHM2JsonEstimateLinesLoc[i].LineItemC,
 		                    			matcostc : oCDASHM2JsonEstimateLinesLoc[i].MaterialCostC,
 		                    			respc : oCDASHM2JsonEstimateLinesLoc[i].ResponsibilityC,
 		                    			labcostc : oCDASHM2JsonEstimateLinesLoc[i].LabourCostC,
 		                    			bulletinc : oCDASHM2JsonEstimateLinesLoc[i].BulletinNumberC,
 		                    			totalc : oCDASHM2JsonEstimateLinesLoc[i].TotalCostC,
 		                    			location : oCDASHM2JsonEstimateLinesLoc[i].LocationCode,
 		                    			component : oCDASHM2JsonEstimateLinesLoc[i].ComponentCode,
 		                    			damage : oCDASHM2JsonEstimateLinesLoc[i].DamageCode,
 		                    			material : oCDASHM2JsonEstimateLinesLoc[i].MaterialCode,
 		                    			repair : oCDASHM2JsonEstimateLinesLoc[i].RepairCode,

 		                    			locationt : oCDASHM2JsonEstimateLinesLoc[i].LocationText,
 		                    			componentt : oCDASHM2JsonEstimateLinesLoc[i].ComponentText,
 		                    			damaget : oCDASHM2JsonEstimateLinesLoc[i].DamageText,
 		                    			materialt : oCDASHM2JsonEstimateLinesLoc[i].MaterialText,
 		                    			repairt : oCDASHM2JsonEstimateLinesLoc[i].RepairText,
 		                    			locationdisp : oCDASHM2JsonEstimateLinesLoc[i].LocationText,
 		                    			componentdisp : oCDASHM2JsonEstimateLinesLoc[i].ComponentText,
 		                    			damagedisp : oCDASHM2JsonEstimateLinesLoc[i].DamageText,
 		                    			materialdisp : oCDASHM2JsonEstimateLinesLoc[i].MaterialText,
 		                    			repairdisp : oCDASHM2JsonEstimateLinesLoc[i].RepairText,
 		                    			length : (oCDASHM2JsonEstimateLinesLoc[i].LineItem == "")?"":thousandsep(oCDASHM2JsonEstimateLinesLoc[i].RepairLength),
 		                    			width : (oCDASHM2JsonEstimateLinesLoc[i].LineItem == "")?"":thousandsep(oCDASHM2JsonEstimateLinesLoc[i].RepairWidth),
 		                    			measure : oCDASHM2JsonEstimateLinesLoc[i].RepairMeasureUnit,
 		                    			qty : oCDASHM2JsonEstimateLinesLoc[i].Quantity,
 		                    			hrs : hrslocal,
 		                    			matcost : matcostlocal,
 		                    			resp : (oCDASHM2JsonEstimateLinesLoc[i].Responsibility == "S")?"O":oCDASHM2JsonEstimateLinesLoc[i].Responsibility,
 		                    			labcost : labcostlocal,
 		                    			bulletin : oCDASHM2JsonEstimateLinesLoc[i].BulletinNumber,
 		                    			total : totallocal
 		                    		});
	                    	 }
	                    },
	                  function(error){
	                      //sap.ui.commons.MessageBox.alert("Sorry, there is an error");
	                	  console.log("Get Item : Page 3 Failure");
	                	  busyDialog.close();
	                  });


        var oCDASHM2ModelEstimateLinesUI = new sap.ui.model.json.JSONModel();
        oCDASHM2ModelEstimateLinesUI.setData({modelData: oCDASHM2JsonEstimateLines});

      	var oCDASHM2TableEstimateLinesUI = sap.ui.getCore().byId("idCDASHM2TableEstimateLinesUI");
      	oCDASHM2TableEstimateLinesUI.setModel(oCDASHM2ModelEstimateLinesUI);
      	oCDASHM2TableEstimateLinesUI.setVisibleRowCount(oCDASHM2JsonEstimateLines.length);
      	oCDASHM2TableEstimateLinesUI.bindRows("/modelData");

				oCurrent.setJSChangeColors();
				sap.ui.getCore().byId("idCDASHM2TableEstimateLinesUI").onAfterRendering = function() {

				if (sap.ui.table.Table.prototype.onAfterRendering) {
					sap.ui.table.Table.prototype.onAfterRendering.apply(this, arguments);
				}

				oCurrent.setJSChangeColors();
				};

	},

	setJSChangeColors : function(){

		var tabData = sap.ui.getCore().byId("idCDASHM2TableEstimateLinesUI").getModel().getData().modelData;
		var tabDataLength = tabData.length;
		var colId = "";
		for(var i =0; i<tabDataLength; i++){

			if(tabData[i].componentc == "X"){
				colId = "CMP-col1-row" + i;
				//$("#"+colId).parent().parent().addClass("jsChange");
				$("#"+colId).addClass("jsChange");
			}else{
				colId = "CMP-col1-row" + i;
				//$("#"+colId).parent().parent().addClass("jsChange");
				$("#"+colId).removeClass("jsChange");
			}

			if(tabData[i].damagec == "X"){
				colId = "DMG-col2-row" + i;
				//$("#"+colId).parent().parent().addClass("jsChange");
				$("#"+colId).addClass("jsChange");
			}else{
				colId = "DMG-col2-row" + i;
				//$("#"+colId).parent().parent().addClass("jsChange");
				$("#"+colId).removeClass("jsChange");
			}

			if(tabData[i].repairc == "X"){
				colId = "REP-col3-row" + i;
				//$("#"+colId).parent().parent().addClass("jsChange");
				$("#"+colId).addClass("jsChange");
			}else{
				colId = "REP-col3-row" + i;
				//$("#"+colId).parent().parent().addClass("jsChange");
				$("#"+colId).removeClass("jsChange");
			}

			if(tabData[i].locationc == "X"){
				colId = "LOC-col4-row" + i;
				//$("#"+colId).parent().parent().addClass("jsChange");
				$("#"+colId).addClass("jsChange");
			}else{
				colId = "LOC-col4-row" + i;
				//$("#"+colId).parent().parent().addClass("jsChange");
				$("#"+colId).removeClass("jsChange");
			}

			if(tabData[i].materialc == "X"){
				colId = "MATR-col5-row" + i;
				//$("#"+colId).parent().parent().addClass("jsChange");
				$("#"+colId).addClass("jsChange");
			}else{
				colId = "MATR-col5-row" + i;
				//$("#"+colId).parent().parent().addClass("jsChange");
				$("#"+colId).removeClass("jsChange");
			}

			if(tabData[i].lengthc == "X"){
				colId = "LEN-col6-row" + i;
				//$("#"+colId).parent().parent().addClass("jsChange");
				$("#"+colId).addClass("jsChange");
			}else{
				colId = "LEN-col6-row" + i;
				//$("#"+colId).parent().parent().addClass("jsChange");
				$("#"+colId).removeClass("jsChange");
			}

			if(tabData[i].widthc == "X"){
				colId = "WID-col7-row" + i;
				//$("#"+colId).parent().parent().addClass("jsChange");
				$("#"+colId).addClass("jsChange");
			}else{
				colId = "WID-col7-row" + i;
				//$("#"+colId).parent().parent().addClass("jsChange");
				$("#"+colId).removeClass("jsChange");
			}

			if(tabData[i].qtyc == "X"){
				colId = "QTY-col8-row" + i;
				//$("#"+colId).parent().parent().addClass("jsChange");
				$("#"+colId).addClass("jsChange");
			}else{
				colId = "QTY-col8-row" + i;
				//$("#"+colId).parent().parent().addClass("jsChange");
				$("#"+colId).removeClass("jsChange");
			}

			if(tabData[i].hrsc == "X"){
				colId = "HRS-col9-row" + i;
				//$("#"+colId).parent().parent().addClass("jsChange");
				$("#"+colId).addClass("jsChange");
			}else{
				colId = "HRS-col9-row" + i;
				//$("#"+colId).parent().parent().addClass("jsChange");
				$("#"+colId).removeClass("jsChange");
			}

			if(tabData[i].labcostc == "X"){
				colId = "LABC-col10-row" + i;
				//$("#"+colId).parent().parent().addClass("jsChange");
				$("#"+colId).addClass("jsChange");
			}else{
				colId = "LABC-col10-row" + i;
				//$("#"+colId).parent().parent().addClass("jsChange");
				$("#"+colId).removeClass("jsChange");
			}

			if(tabData[i].matcostc == "X"){
				colId = "MATC-col11-row" + i;
				//$("#"+colId).parent().parent().addClass("jsChange");
				$("#"+colId).addClass("jsChange");
			}else{
				colId = "MATC-col11-row" + i;
				//$("#"+colId).parent().parent().addClass("jsChange");
				$("#"+colId).removeClass("jsChange");
			}

			if(tabData[i].totalc == "X"){
				colId = "TOT-col12-row" + i;
				//$("#"+colId).parent().parent().addClass("jsChange");
				$("#"+colId).addClass("jsChange");
			}else{
				colId = "TOT-col12-row" + i;
				//$("#"+colId).parent().parent().addClass("jsChange");
				$("#"+colId).removeClass("jsChange");
			}

			if(tabData[i].respc == "X"){
				colId = "RES-col13-row" + i;
				//$("#"+colId).parent().parent().addClass("jsChange");
				$("#"+colId).addClass("jsChange");
			}else{
				colId = "RES-col13-row" + i;
				//$("#"+colId).parent().parent().addClass("jsChange");
				$("#"+colId).removeClass("jsChange");
			}

		}

	},

	/* CDASHM2 - Value - Record Details */
	setValueRecordDetailsBackUp : function(){
		sap.ui.getCore().byId("idCDASHM2RecordDetailsValueSerial").setText(oCDASHM2JsonHeaderDetails.serial);
		sap.ui.getCore().byId("idCDASHM2RecordDetailsValueRecordType").setText(oCDASHM2JsonHeaderDetails.recordtype);
		sap.ui.getCore().byId("idCDASHM2RecordDetailsValueMNRStatus").setText(oCDASHM2JsonHeaderDetails.mnrstatus);
		sap.ui.getCore().byId("idCDASHM2RecordDetailsValueLastAction").setText(oCDASHM2JsonHeaderDetails.lastactionfirst);
	},

	/* CDASHM2 - Content - Thumbnail */
	setContentThumbnail : function(CDASHM2SerialNo){

		// /sap/opu/odata/sap/ZMNR_DEP_SRV/picSet(Equnr='SEGU2425533',Sernr='SEGU2425533',Tplnr='1045',Aufnr='100934577',Auart='X')

		console.log("Get Pictures : Page 3");

		/*var urlToSap = "picSet(Sernr='" + global3SerialNo + "',Aufnr='" + global3EstimateNo + "'," +
		"Equnr='" + global3Equnr + "',Tplnr='" + global3Depot + "')";*/

		if(CDASHM2SerialNo != "" && CDASHM2SerialNo != undefined){	// Replaced global3SerialNo by CDASHM2SerialNo
		var urlToSap = "picSet(Sernr='" + global3SerialNo + "',Aufnr='" + global3EstimateNo + "'," +
		"Equnr='" + global3Equnr + "',Tplnr='" + global3Depot + "',Auart='" + 'X' + "')";

		// var urlToSap = "picSet(Sernr='" + 'CRSU1032210' + "',Aufnr='" + '50000019293' + "'," +
		// "Equnr='" + 'CRSU1032210' + "',Tplnr='" + '2069' + "',Auart='" + 'X' + "')";

		var docName = "";
		var ext = "";
		var dispname = "";

    	urlToSap = serviceDEP + urlToSap;
    	oModel = new sap.ui.model.odata.ODataModel(serviceDEP, true);
	        busyDialog.open();
	        console.log(urlToSap);
	        OData.request({
	                      requestUri: urlToSap,
	                      method: "GET",
	                      dataType: 'json',
	                      async: false,
	                      headers:
	                      {
	                      "X-Requested-With": "XMLHttpRequest",
	                      "Content-Type": "application/json; charset=utf-8",
	                      "DataServiceVersion": "2.0",
	                      "X-CSRF-Token":"Fetch"
	                      }
	                      },
	                      function (data, response){
	                    	 console.log("Get Pictures Success");

	                    	jsonCDASHM2Pictures = [];
	                    	jsonCDASHM2Documents = [];

												if(data.File1 != ''){

	                    		docName = data.Filenames.split('*')[0];
													dispname = docName.split('_').pop();
	                    		ext = dispname.split('.').pop();

	                    		if(isPIC(ext)){
			                 		jsonCDASHM2Pictures.push({
			                 			images : "data:image/png;base64," + data.File1,
			                 			name : docName,
														dispname : dispname,
														number : jsonCDASHM2Pictures.length
			                 		});
	                    		}else{
	                    			jsonCDASHM2Documents.push({
			                 			images : data.File1,
			                 			name : docName,
														dispname : dispname
			                 		});
	                    		}
	                    	}

					            	if(data.File2 != ''){

													docName = data.Filenames.split('*')[1];
													dispname = docName.split('_').pop();
					            		ext = dispname.split('.').pop();

					            		if(isPIC(ext)){
					             		jsonCDASHM2Pictures.push({
					             			images : "data:image/png;base64," + data.File2,
					             			name : docName,
														dispname : dispname,
														number : jsonCDASHM2Pictures.length
					             		});
					            		}else{
					            			jsonCDASHM2Documents.push({
					             			images : data.File2,
					             			name : docName,
														dispname : dispname
					             		});
					            		}
					            	}

					            	if(data.File3 != ''){

													docName = data.Filenames.split('*')[2];
													dispname = docName.split('_').pop();
					            		ext = dispname.split('.').pop();

					            		if(isPIC(ext)){
					             		jsonCDASHM2Pictures.push({
					             			images : "data:image/png;base64," + data.File3,
					             			name : docName,
														dispname : dispname,
														number : jsonCDASHM2Pictures.length
					             		});
					            		}else{
					            			jsonCDASHM2Documents.push({
					             			images : data.File3,
					             			name : docName,
														dispname : dispname
					             		});
					            		}
					            	}

					            	if(data.File4 != ''){

													docName = data.Filenames.split('*')[3];
													dispname = docName.split('_').pop();
					            		ext = dispname.split('.').pop();

					            		if(isPIC(ext)){
					             		jsonCDASHM2Pictures.push({
					             			images : "data:image/png;base64," + data.File4,
					             			name : docName,
														dispname : dispname,
														number : jsonCDASHM2Pictures.length
					             		});
					            		}else{
					            			jsonCDASHM2Documents.push({
					             			images : data.File4,
					             			name : docName,
														dispname : dispname
					             		});
					            		}
					            	}

												if(data.File5 != ''){

													docName = data.Filenames.split('*')[4];
													dispname = docName.split('_').pop();
													ext = dispname.split('.').pop();

													if(isPIC(ext)){
												 		jsonCDASHM2Pictures.push({
												 			images : "data:image/png;base64," + data.File5,
												 			name : docName,
															dispname : dispname,
															number : jsonCDASHM2Pictures.length
												 		});
													}else{
														jsonCDASHM2Documents.push({
												 			images : data.File5,
												 			name : docName,
															dispname : dispname
												 		});
													}
												}

												if(data.File6 != ''){

																				docName = data.Filenames.split('*')[5];
																				dispname = docName.split('_').pop();
																				ext = dispname.split('.').pop();

																				if(isPIC(ext)){
																			 		jsonCDASHM2Pictures.push({
																			 			images : "data:image/png;base64," + data.File6,
																			 			name : docName,
																						dispname : dispname,
																						number : jsonCDASHM2Pictures.length
																			 		});
																				}else{
																					jsonCDASHM2Documents.push({
																			 			images : data.File6,
																			 			name : docName,
																						dispname : dispname
																			 		});
																				}
																			}

																			if(data.File7 != ''){

																			  docName = data.Filenames.split('*')[6];
																			  dispname = docName.split('_').pop();
																			  ext = dispname.split('.').pop();

																			  if(isPIC(ext)){
																			    jsonCDASHM2Pictures.push({
																			      images : "data:image/png;base64," + data.File7,
																			      name : docName,
																			      dispname : dispname,
																						number : jsonCDASHM2Pictures.length
																			    });
																			  }else{
																			    jsonCDASHM2Documents.push({
																			      images : data.File7,
																			      name : docName,
																			      dispname : dispname
																			    });
																			  }
																			}

																			if(data.File8 != ''){

																			  docName = data.Filenames.split('*')[7];
																			  dispname = docName.split('_').pop();
																			  ext = dispname.split('.').pop();

																			  if(isPIC(ext)){
																			    jsonCDASHM2Pictures.push({
																			      images : "data:image/png;base64," + data.File8,
																			      name : docName,
																			      dispname : dispname,
																						number : jsonCDASHM2Pictures.length
																			    });
																			  }else{
																			    jsonCDASHM2Documents.push({
																			      images : data.File8,
																			      name : docName,
																			      dispname : dispname
																			    });
																			  }
																			}

																			if(data.File9 != ''){

																			  docName = data.Filenames.split('*')[8];
																			  dispname = docName.split('_').pop();
																			  ext = dispname.split('.').pop();

																			  if(isPIC(ext)){
																			    jsonCDASHM2Pictures.push({
																			      images : "data:image/png;base64," + data.File9,
																			      name : docName,
																			      dispname : dispname,
																						number : jsonCDASHM2Pictures.length
																			    });
																			  }else{
																			    jsonCDASHM2Documents.push({
																			      images : data.File9,
																			      name : docName,
																			      dispname : dispname
																			    });
																			  }
																			}

																			if(data.File10 != ''){

																			  docName = data.Filenames.split('*')[9];
																			  dispname = docName.split('_').pop();
																			  ext = dispname.split('.').pop();

																			  if(isPIC(ext)){
																			    jsonCDASHM2Pictures.push({
																			      images : "data:image/png;base64," + data.File10,
																			      name : docName,
																			      dispname : dispname,
																						number : jsonCDASHM2Pictures.length
																			    });
																			  }else{
																			    jsonCDASHM2Documents.push({
																			      images : data.File10,
																			      name : docName,
																			      dispname : dispname
																			    });
																			  }
																			}

																			if(data.File11 != ''){

																			  docName = data.Filenames.split('*')[10];
																			  dispname = docName.split('_').pop();
																			  ext = dispname.split('.').pop();

																			  if(isPIC(ext)){
																			  jsonCDASHM2Pictures.push({
																			    images : "data:image/png;base64," + data.File11,
																			    name : docName,
																			    dispname : dispname,
																					number : jsonCDASHM2Pictures.length
																			  });
																			  }else{
																			    jsonCDASHM2Documents.push({
																			    images : data.File11,
																			    name : docName,
																			    dispname : dispname
																			  });
																			  }
																			}

																			if(data.File12 != ''){

																			  docName = data.Filenames.split('*')[11];
																			  dispname = docName.split('_').pop();
																			  ext = dispname.split('.').pop();

																			  if(isPIC(ext)){
																			  jsonCDASHM2Pictures.push({
																			    images : "data:image/png;base64," + data.File12,
																			    name : docName,
																			    dispname : dispname,
																					number : jsonCDASHM2Pictures.length
																			  });
																			  }else{
																			    jsonCDASHM2Documents.push({
																			    images : data.File12,
																			    name : docName,
																			    dispname : dispname
																			  });
																			  }
																			}

																			if(data.File13 != ''){

																			  docName = data.Filenames.split('*')[12];
																			  dispname = docName.split('_').pop();
																			  ext = dispname.split('.').pop();

																			  if(isPIC(ext)){
																			  jsonCDASHM2Pictures.push({
																			    images : "data:image/png;base64," + data.File13,
																			    name : docName,
																			    dispname : dispname,
																					number : jsonCDASHM2Pictures.length
																			  });
																			  }else{
																			    jsonCDASHM2Documents.push({
																			    images : data.File13,
																			    name : docName,
																			    dispname : dispname
																			  });
																			  }
																			}

																			if(data.File14 != ''){

																			  docName = data.Filenames.split('*')[13];
																			  dispname = docName.split('_').pop();
																			  ext = dispname.split('.').pop();

																			  if(isPIC(ext)){
																			  jsonCDASHM2Pictures.push({
																			    images : "data:image/png;base64," + data.File14,
																			    name : docName,
																			    dispname : dispname,
																					number : jsonCDASHM2Pictures.length
																			  });
																			  }else{
																			    jsonCDASHM2Documents.push({
																			    images : data.File14,
																			    name : docName,
																			    dispname : dispname
																			  });
																			  }
																			}

																			if(data.File15 != ''){

																			docName = data.Filenames.split('*')[14];
																			dispname = docName.split('_').pop();
																			ext = dispname.split('.').pop();

																			if(isPIC(ext)){
																			jsonCDASHM2Pictures.push({
																			images : "data:image/png;base64," + data.File15,
																			name : docName,
																			dispname : dispname,
																			number : jsonCDASHM2Pictures.length
																			});
																			}else{
																			jsonCDASHM2Documents.push({
																			images : data.File15,
																			name : docName,
																			dispname : dispname
																			});
																			}
																			}


																			if(data.File16 != ''){

																			docName = data.Filenames.split('*')[15];
																			dispname = docName.split('_').pop();
																			ext = dispname.split('.').pop();

																			if(isPIC(ext)){
																			jsonCDASHM2Pictures.push({
																			images : "data:image/png;base64," + data.File16,
																			name : docName,
																			dispname : dispname,
																			number : jsonCDASHM2Pictures.length
																			});
																			}else{
																			jsonCDASHM2Documents.push({
																			images : data.File16,
																			name : docName,
																			dispname : dispname
																			});
																			}
																			}

																			if(data.File17 != ''){

																			docName = data.Filenames.split('*')[16];
																			dispname = docName.split('_').pop();
																			ext = dispname.split('.').pop();

																			if(isPIC(ext)){
																			jsonCDASHM2Pictures.push({
																			images : "data:image/png;base64," + data.File17,
																			name : docName,
																			dispname : dispname,
																			number : jsonCDASHM2Pictures.length
																			});
																			}else{
																			jsonCDASHM2Documents.push({
																			images : data.File17,
																			name : docName,
																			dispname : dispname
																			});
																			}
																			}

																			if(data.File18 != ''){

																			docName = data.Filenames.split('*')[17];
																			dispname = docName.split('_').pop();
																			ext = dispname.split('.').pop();

																			if(isPIC(ext)){
																			jsonCDASHM2Pictures.push({
																			images : "data:image/png;base64," + data.File18,
																			name : docName,
																			dispname : dispname,
																			number : jsonCDASHM2Pictures.length
																			});
																			}else{
																			jsonCDASHM2Documents.push({
																			images : data.File18,
																			name : docName,
																			dispname : dispname
																			});
																			}
																			}

																			if(data.File19 != ''){

																			docName = data.Filenames.split('*')[18];
																			dispname = docName.split('_').pop();
																			ext = dispname.split('.').pop();

																			if(isPIC(ext)){
																			jsonCDASHM2Pictures.push({
																			images : "data:image/png;base64," + data.File19,
																			name : docName,
																			dispname : dispname,
																			number : jsonCDASHM2Pictures.length
																			});
																			}else{
																			jsonCDASHM2Documents.push({
																			images : data.File19,
																			name : docName,
																			dispname : dispname
																			});
																			}
																			}

																			if(data.File20 != ''){

																			docName = data.Filenames.split('*')[19];
																			dispname = docName.split('_').pop();
																			ext = dispname.split('.').pop();

																			if(isPIC(ext)){
																			jsonCDASHM2Pictures.push({
																			images : "data:image/png;base64," + data.File20,
																			name : docName,
																			dispname : dispname,
																			number : jsonCDASHM2Pictures.length
																			});
																			}else{
																			jsonCDASHM2Documents.push({
																			images : data.File20,
																			name : docName,
																			dispname : dispname
																			});
																			}
																			}

																			if(data.File21 != ''){

																			  docName = data.Filenames.split('*')[20];
																			  dispname = docName.split('_').pop();
																			  ext = dispname.split('.').pop();

																			  if(isPIC(ext)){
																			  jsonCDASHM2Pictures.push({
																			    images : "data:image/png;base64," + data.File21,
																			    name : docName,
																			    dispname : dispname,
																					number : jsonCDASHM2Pictures.length
																			  });
																			  }else{
																			    jsonCDASHM2Documents.push({
																			    images : data.File21,
																			    name : docName,
																			    dispname : dispname
																			  });
																			  }
																			}

																			if(data.File22 != ''){

																			  docName = data.Filenames.split('*')[21];
																			  dispname = docName.split('_').pop();
																			  ext = dispname.split('.').pop();

																			  if(isPIC(ext)){
																			  jsonCDASHM2Pictures.push({
																			    images : "data:image/png;base64," + data.File22,
																			    name : docName,
																			    dispname : dispname,
																					number : jsonCDASHM2Pictures.length
																			  });
																			  }else{
																			    jsonCDASHM2Documents.push({
																			    images : data.File22,
																			    name : docName,
																			    dispname : dispname
																			  });
																			  }
																			}

																			if(data.File23 != ''){

																			  docName = data.Filenames.split('*')[22];
																			  dispname = docName.split('_').pop();
																			  ext = dispname.split('.').pop();

																			  if(isPIC(ext)){
																			  jsonCDASHM2Pictures.push({
																			    images : "data:image/png;base64," + data.File23,
																			    name : docName,
																			    dispname : dispname,
																					number : jsonCDASHM2Pictures.length
																			  });
																			  }else{
																			    jsonCDASHM2Documents.push({
																			    images : data.File23,
																			    name : docName,
																			    dispname : dispname
																			  });
																			  }
																			}

																			if(data.File24 != ''){

																			  docName = data.Filenames.split('*')[23];
																			  dispname = docName.split('_').pop();
																			  ext = dispname.split('.').pop();

																			  if(isPIC(ext)){
																			  jsonCDASHM2Pictures.push({
																			    images : "data:image/png;base64," + data.File24,
																			    name : docName,
																			    dispname : dispname,
																					number : jsonCDASHM2Pictures.length
																			  });
																			  }else{
																			    jsonCDASHM2Documents.push({
																			    images : data.File24,
																			    name : docName,
																			    dispname : dispname
																			  });
																			  }
																			}

																			if(data.File25 != ''){

																			docName = data.Filenames.split('*')[24];
																			dispname = docName.split('_').pop();
																			ext = dispname.split('.').pop();

																			if(isPIC(ext)){
																			jsonCDASHM2Pictures.push({
																			images : "data:image/png;base64," + data.File25,
																			name : docName,
																			dispname : dispname,
																			number : jsonCDASHM2Pictures.length
																			});
																			}else{
																			jsonCDASHM2Documents.push({
																			images : data.File25,
																			name : docName,
																			dispname : dispname
																			});
																			}
																			}


																			if(data.File26 != ''){

																			docName = data.Filenames.split('*')[25];
																			dispname = docName.split('_').pop();
																			ext = dispname.split('.').pop();

																			if(isPIC(ext)){
																			jsonCDASHM2Pictures.push({
																			images : "data:image/png;base64," + data.File26,
																			name : docName,
																			dispname : dispname,
																			number : jsonCDASHM2Pictures.length
																			});
																			}else{
																			jsonCDASHM2Documents.push({
																			images : data.File26,
																			name : docName,
																			dispname : dispname
																			});
																			}
																			}

																			if(data.File27 != ''){

																			docName = data.Filenames.split('*')[26];
																			dispname = docName.split('_').pop();
																			ext = dispname.split('.').pop();

																			if(isPIC(ext)){
																			jsonCDASHM2Pictures.push({
																			images : "data:image/png;base64," + data.File27,
																			name : docName,
																			dispname : dispname,
																			number : jsonCDASHM2Pictures.length
																			});
																			}else{
																			jsonCDASHM2Documents.push({
																			images : data.File27,
																			name : docName,
																			dispname : dispname
																			});
																			}
																			}

																			if(data.File28 != ''){

																			docName = data.Filenames.split('*')[27];
																			dispname = docName.split('_').pop();
																			ext = dispname.split('.').pop();

																			if(isPIC(ext)){
																			jsonCDASHM2Pictures.push({
																			images : "data:image/png;base64," + data.File28,
																			name : docName,
																			dispname : dispname,
																			number : jsonCDASHM2Pictures.length
																			});
																			}else{
																			jsonCDASHM2Documents.push({
																			images : data.File28,
																			name : docName,
																			dispname : dispname
																			});
																			}
																			}

																			if(data.File29 != ''){

																			docName = data.Filenames.split('*')[28];
																			dispname = docName.split('_').pop();
																			ext = dispname.split('.').pop();

																			if(isPIC(ext)){
																			jsonCDASHM2Pictures.push({
																			images : "data:image/png;base64," + data.File29,
																			name : docName,
																			dispname : dispname,
																			number : jsonCDASHM2Pictures.length
																			});
																			}else{
																			jsonCDASHM2Documents.push({
																			images : data.File29,
																			name : docName,
																			dispname : dispname
																			});
																			}
																			}

																			if(data.File30 != ''){

																			docName = data.Filenames.split('*')[29];
																			dispname = docName.split('_').pop();
																			ext = dispname.split('.').pop();

																			if(isPIC(ext)){
																			jsonCDASHM2Pictures.push({
																			images : "data:image/png;base64," + data.File30,
																			name : docName,
																			dispname : dispname,
																			number : jsonCDASHM2Pictures.length
																			});
																			}else{
																			jsonCDASHM2Documents.push({
																			images : data.File30,
																			name : docName,
																			dispname : dispname
																			});
																			}
																			}

																			if(data.File31 != ''){

																			docName = data.Filenames.split('*')[30];
																			dispname = docName.split('_').pop();
																			ext = dispname.split('.').pop();

																			if(isPIC(ext)){
																			jsonCDASHM2Pictures.push({
																			images : "data:image/png;base64," + data.File31,
																			name : docName,
																			dispname : dispname,
																			number : jsonCDASHM2Pictures.length
																			});
																			}else{
																			jsonCDASHM2Documents.push({
																			images : data.File31,
																			name : docName,
																			dispname : dispname
																			});
																			}
																			}

																			if(data.File32 != ''){

																			docName = data.Filenames.split('*')[31];
																			dispname = docName.split('_').pop();
																			ext = dispname.split('.').pop();

																			if(isPIC(ext)){
																			jsonCDASHM2Pictures.push({
																			images : "data:image/png;base64," + data.File32,
																			name : docName,
																			dispname : dispname,
																			number : jsonCDASHM2Pictures.length
																			});
																			}else{
																			jsonCDASHM2Documents.push({
																			images : data.File32,
																			name : docName,
																			dispname : dispname
																			});
																			}
																			}

																			if(data.File33 != ''){

																			docName = data.Filenames.split('*')[32];
																			dispname = docName.split('_').pop();
																			ext = dispname.split('.').pop();

																			if(isPIC(ext)){
																			jsonCDASHM2Pictures.push({
																			images : "data:image/png;base64," + data.File33,
																			name : docName,
																			dispname : dispname,
																			number : jsonCDASHM2Pictures.length
																			});
																			}else{
																			jsonCDASHM2Documents.push({
																			images : data.File33,
																			name : docName,
																			dispname : dispname
																			});
																			}
																			}

																			if(data.File34 != ''){

																			docName = data.Filenames.split('*')[33];
																			dispname = docName.split('_').pop();
																			ext = dispname.split('.').pop();

																			if(isPIC(ext)){
																			jsonCDASHM2Pictures.push({
																			images : "data:image/png;base64," + data.File34,
																			name : docName,
																			dispname : dispname,
																			number : jsonCDASHM2Pictures.length
																			});
																			}else{
																			jsonCDASHM2Documents.push({
																			images : data.File34,
																			name : docName,
																			dispname : dispname
																			});
																			}
																			}

																			if(data.File35 != ''){

																			docName = data.Filenames.split('*')[34];
																			dispname = docName.split('_').pop();
																			ext = dispname.split('.').pop();

																			if(isPIC(ext)){
																			jsonCDASHM2Pictures.push({
																			images : "data:image/png;base64," + data.File35,
																			name : docName,
																			dispname : dispname,
																			number : jsonCDASHM2Pictures.length
																			});
																			}else{
																			jsonCDASHM2Documents.push({
																			images : data.File35,
																			name : docName,
																			dispname : dispname
																			});
																			}
																			}

																			if(data.File36 != ''){

																			docName = data.Filenames.split('*')[35];
																			dispname = docName.split('_').pop();
																			ext = dispname.split('.').pop();

																			if(isPIC(ext)){
																			jsonCDASHM2Pictures.push({
																			images : "data:image/png;base64," + data.File36,
																			name : docName,
																			dispname : dispname,
																			number : jsonCDASHM2Pictures.length
																			});
																			}else{
																			jsonCDASHM2Documents.push({
																			images : data.File36,
																			name : docName,
																			dispname : dispname
																			});
																			}
																			}

																			if(data.File37 != ''){

																			docName = data.Filenames.split('*')[36];
																			dispname = docName.split('_').pop();
																			ext = dispname.split('.').pop();

																			if(isPIC(ext)){
																			jsonCDASHM2Pictures.push({
																			images : "data:image/png;base64," + data.File37,
																			name : docName,
																			dispname : dispname,
																			number : jsonCDASHM2Pictures.length
																			});
																			}else{
																			jsonCDASHM2Documents.push({
																			images : data.File37,
																			name : docName,
																			dispname : dispname
																			});
																			}
																			}

																			if(data.File38 != ''){

																			docName = data.Filenames.split('*')[37];
																			dispname = docName.split('_').pop();
																			ext = dispname.split('.').pop();

																			if(isPIC(ext)){
																			jsonCDASHM2Pictures.push({
																			images : "data:image/png;base64," + data.File38,
																			name : docName,
																			dispname : dispname,
																			number : jsonCDASHM2Pictures.length
																			});
																			}else{
																			jsonCDASHM2Documents.push({
																			images : data.File38,
																			name : docName,
																			dispname : dispname
																			});
																			}
																			}

																			if(data.File39 != ''){

																			docName = data.Filenames.split('*')[38];
																			dispname = docName.split('_').pop();
																			ext = dispname.split('.').pop();

																			if(isPIC(ext)){
																			jsonCDASHM2Pictures.push({
																			images : "data:image/png;base64," + data.File39,
																			name : docName,
																			dispname : dispname,
																			number : jsonCDASHM2Pictures.length
																			});
																			}else{
																			jsonCDASHM2Documents.push({
																			images : data.File39,
																			name : docName,
																			dispname : dispname
																			});
																			}
																			}

																			if(data.File40 != ''){

																			docName = data.Filenames.split('*')[39];
																			dispname = docName.split('_').pop();
																			ext = dispname.split('.').pop();

																			if(isPIC(ext)){
																			jsonCDASHM2Pictures.push({
																			images : "data:image/png;base64," + data.File40,
																			name : docName,
																			dispname : dispname,
																			number : jsonCDASHM2Pictures.length
																			});
																			}else{
																			jsonCDASHM2Documents.push({
																			images : data.File40,
																			name : docName,
																			dispname : dispname
																			});
																			}
																			}

																			if(data.File41 != ''){

																			docName = data.Filenames.split('*')[40];
																			dispname = docName.split('_').pop();
																			ext = dispname.split('.').pop();

																			if(isPIC(ext)){
																			jsonCDASHM2Pictures.push({
																			images : "data:image/png;base64," + data.File41,
																			name : docName,
																			dispname : dispname,
																			number : jsonCDASHM2Pictures.length
																			});
																			}else{
																			jsonCDASHM2Documents.push({
																			images : data.File41,
																			name : docName,
																			dispname : dispname
																			});
																			}
																			}

																			if(data.File42 != ''){

																			docName = data.Filenames.split('*')[41];
																			dispname = docName.split('_').pop();
																			ext = dispname.split('.').pop();

																			if(isPIC(ext)){
																			jsonCDASHM2Pictures.push({
																			images : "data:image/png;base64," + data.File42,
																			name : docName,
																			dispname : dispname,
																			number : jsonCDASHM2Pictures.length
																			});
																			}else{
																			jsonCDASHM2Documents.push({
																			images : data.File42,
																			name : docName,
																			dispname : dispname
																			});
																			}
																			}

																			if(data.File43 != ''){

																			docName = data.Filenames.split('*')[42];
																			dispname = docName.split('_').pop();
																			ext = dispname.split('.').pop();

																			if(isPIC(ext)){
																			jsonCDASHM2Pictures.push({
																			images : "data:image/png;base64," + data.File43,
																			name : docName,
																			dispname : dispname,
																			number : jsonCDASHM2Pictures.length
																			});
																			}else{
																			jsonCDASHM2Documents.push({
																			images : data.File43,
																			name : docName,
																			dispname : dispname
																			});
																			}
																			}

																			if(data.File44 != ''){

																			docName = data.Filenames.split('*')[43];
																			dispname = docName.split('_').pop();
																			ext = dispname.split('.').pop();

																			if(isPIC(ext)){
																			jsonCDASHM2Pictures.push({
																			images : "data:image/png;base64," + data.File44,
																			name : docName,
																			dispname : dispname,
																			number : jsonCDASHM2Pictures.length
																			});
																			}else{
																			jsonCDASHM2Documents.push({
																			images : data.File44,
																			name : docName,
																			dispname : dispname
																			});
																			}
																			}

																			if(data.File45 != ''){

																			docName = data.Filenames.split('*')[44];
																			dispname = docName.split('_').pop();
																			ext = dispname.split('.').pop();

																			if(isPIC(ext)){
																			jsonCDASHM2Pictures.push({
																			images : "data:image/png;base64," + data.File45,
																			name : docName,
																			dispname : dispname,
																			number : jsonCDASHM2Pictures.length
																			});
																			}else{
																			jsonCDASHM2Documents.push({
																			images : data.File45,
																			name : docName,
																			dispname : dispname
																			});
																			}
																			}

																			if(data.File46 != ''){

																			docName = data.Filenames.split('*')[45];
																			dispname = docName.split('_').pop();
																			ext = dispname.split('.').pop();

																			if(isPIC(ext)){
																			jsonCDASHM2Pictures.push({
																			images : "data:image/png;base64," + data.File46,
																			name : docName,
																			dispname : dispname,
																			number : jsonCDASHM2Pictures.length
																			});
																			}else{
																			jsonCDASHM2Documents.push({
																			images : data.File46,
																			name : docName,
																			dispname : dispname
																			});
																			}
																			}

																			if(data.File47 != ''){

																			docName = data.Filenames.split('*')[46];
																			dispname = docName.split('_').pop();
																			ext = dispname.split('.').pop();

																			if(isPIC(ext)){
																			jsonCDASHM2Pictures.push({
																			images : "data:image/png;base64," + data.File47,
																			name : docName,
																			dispname : dispname,
																			number : jsonCDASHM2Pictures.length
																			});
																			}else{
																			jsonCDASHM2Documents.push({
																			images : data.File47,
																			name : docName,
																			dispname : dispname
																			});
																			}
																			}

																			if(data.File48 != ''){

																			docName = data.Filenames.split('*')[47];
																			dispname = docName.split('_').pop();
																			ext = dispname.split('.').pop();

																			if(isPIC(ext)){
																			jsonCDASHM2Pictures.push({
																			images : "data:image/png;base64," + data.File48,
																			name : docName,
																			dispname : dispname,
																			number : jsonCDASHM2Pictures.length
																			});
																			}else{
																			jsonCDASHM2Documents.push({
																			images : data.File48,
																			name : docName,
																			dispname : dispname
																			});
																			}
																			}

																			if(data.File49 != ''){

																			docName = data.Filenames.split('*')[48];
																			dispname = docName.split('_').pop();
																			ext = dispname.split('.').pop();

																			if(isPIC(ext)){
																			jsonCDASHM2Pictures.push({
																			images : "data:image/png;base64," + data.File49,
																			name : docName,
																			dispname : dispname,
																			number : jsonCDASHM2Pictures.length
																			});
																			}else{
																			jsonCDASHM2Documents.push({
																			images : data.File49,
																			name : docName,
																			dispname : dispname
																			});
																			}
																			}

																			if(data.File50 != ''){

																			docName = data.Filenames.split('*')[49];
																			dispname = docName.split('_').pop();
																			ext = dispname.split('.').pop();

																			if(isPIC(ext)){
																			jsonCDASHM2Pictures.push({
																			images : "data:image/png;base64," + data.File50,
																			name : docName,
																			dispname : dispname,
																			number : jsonCDASHM2Pictures.length
																			});
																			}else{
																			jsonCDASHM2Documents.push({
																			images : data.File50,
																			name : docName,
																			dispname : dispname
																			});
																			}
																			}

							busyDialog.close();
              },
            function(error){
                //sap.ui.commons.MessageBox.alert("Sorry, there is an error");
          	  console.log("Get Pictures Failure");
          	  busyDialog.close();
            });
		}


		jsonCDASHM2PicturesChunks = chunkv2(jsonCDASHM2Pictures, 5);
		console.log("Separated chunks ", jsonCDASHM2PicturesChunks);
		console.log("No. of chunks ", jsonCDASHM2PicturesChunks.length);
		var oCDASHM2FlexImagePageFlexId = "";	// MAC09052018
		var oCDASHM2FlexImagePageVerticalLayoutId = "";	// MAC09052018
		jsonCDASHM2Images = [];
		for(var i=0; i<jsonCDASHM2PicturesChunks.length; i++){

		// MAC09052018
		oCDASHM2FlexImagePageFlexId = "idCDASHM2FlexImagePageFlexId" + i;
		oCDASHM2FlexImagePageVerticalLayoutId = "idCDASHM2FlexImagePageVerticalLayoutId" + i;

		if(sap.ui.getCore().byId(oCDASHM2FlexImagePageFlexId))
			sap.ui.getCore().byId(oCDASHM2FlexImagePageFlexId).destroy();

		if(sap.ui.getCore().byId(oCDASHM2FlexImagePageVerticalLayoutId))
			sap.ui.getCore().byId(oCDASHM2FlexImagePageVerticalLayoutId).destroy();
	  // MAC09052018
		if(sap.ui.getCore().byId("idCDASHMPICCarousel") == undefined)
				var isMovedToPage2 = false;
		else
				var isMovedToPage2 = true;
		var oCDASHM2FlexImagePage = new sap.m.FlexBox(oCDASHM2FlexImagePageFlexId,{	// // MAC09052018
		}).bindAggregation("items", {
			path : "/",
			template : new sap.ui.layout.VerticalLayout(oCDASHM2FlexImagePageVerticalLayoutId,{ // // MAC09052018
				content : [
					new sap.m.Image({
						src : "{images}",
						densityAware: false,
						decorative: false,
						height : "150px",
						width : "200px",
						press : function(oEvent){
						//return;

						/*for(var i=0; i<jsonCDASHM2Pictures.length;i++){
							sap.ui.getCore().byId("idCDASHMPICCarousel").addPage(
									new sap.m.VBox({
										  items : [
									new sap.m.HBox({
										  items : [new sap.m.Image({
												src: jsonCDASHM2Pictures[i].images
											}).addStyleClass("slideimages")
											],
											alignItems : sap.m.FlexAlignItems.Center,
										    justifyContent : sap.m.FlexJustifyContent.Center
									}),
									new sap.m.Label({ width : "50px", text : ""}),
									new sap.m.HBox({
										  	items : [new sap.m.Label({
										  		text : jsonCDASHM2Pictures[i].dispname
										  	}).addStyleClass("slideimagescaption")
											],
											alignItems : sap.m.FlexAlignItems.Center,
										    justifyContent : sap.m.FlexJustifyContent.Center
									}),

								]
								})
								);
						}*/

						if(sap.ui.getCore().byId("idCDASHMPICCarousel") == undefined){
							var bus = sap.ui.getCore().getEventBus();
							bus.publish("nav", "to", {id : "CDASHMPIC0"});
							$('#idHdrContnt').html('Picture Overview');
						}

						// MAC09052018
						var currentPage = parseInt(oEvent.getSource().getParent().getParent().getId().substr(-1));
						// MAC09052018
						var activeImage = parseInt(oEvent.getSource().getParent().getBindingContext().getPath().split("/")[1]);
						// MAC09052018
						activeImage = (currentPage * 5) + activeImage;
						// MAC09052018

						sap.ui.getCore().byId("idCDASHMPICCarousel").removeAllPages();

						var offset = activeImage;
						for( var x=0; x < jsonCDASHM2Pictures.length; x++) {
						    var pointer = (x + offset) % jsonCDASHM2Pictures.length;
						    console.log(jsonCDASHM2Pictures[pointer].number);

								sap.ui.getCore().byId("idCDASHMPICCarousel").addPage(
										new sap.m.VBox({
											  items : [
										new sap.m.HBox({
											  items : [new sap.m.Image({
													src: jsonCDASHM2Pictures[pointer].images
												}).addStyleClass("slideimages")
												],
												alignItems : sap.m.FlexAlignItems.Center,
											    justifyContent : sap.m.FlexJustifyContent.Center
										}),
										new sap.m.Label({ width : "50px", text : ""}),
										new sap.m.HBox({
											  	items : [new sap.m.Label({
											  		text : jsonCDASHM2Pictures[pointer].dispname
											  	}).addStyleClass("slideimagescaption")
												],
												alignItems : sap.m.FlexAlignItems.Center,
											    justifyContent : sap.m.FlexJustifyContent.Center
										}),

									]
									})
									);

						}

						if(isMovedToPage2 == true){
							busyDialog.open();
							setTimeout(function(){
								var bus = sap.ui.getCore().getEventBus();
								bus.publish("nav", "to", {id : "CDASHMPIC0"});
								$('#idHdrContnt').html('Picture Overview');
								busyDialog.close();
							}, 1000);
						}
						isMovedToPage2 = true;
						//sap.ui.getCore().byId("idCDASHMPICCarousel").setPages(jsonCDASHM2Pictures);

						//var activePage = sap.ui.getCore().byId("idCDASHM2Carousel").getPages()[activeImage];
						//sap.ui.getCore().byId("idCDASHM2Carousel").setActivePage(activePage);
						//app.to("idCDASHMPICPage");


						}
					}).addStyleClass("thumbnailimages"),
					new sap.m.Label({ width : "50px", text : ""}),
					new sap.m.Label({text : "{dispname}"}).addStyleClass("thumbnailimagescaption")
	             ]
			})

		});


		var oCDASHM2ModelImageFlex = new sap.ui.model.json.JSONModel();
		oCDASHM2ModelImageFlex.setData(jsonCDASHM2PicturesChunks[i]);
		oCDASHM2FlexImagePage.setModel(oCDASHM2ModelImageFlex);

		jsonCDASHM2Images.push(oCDASHM2FlexImagePage);

		}


		if(sap.ui.getCore().byId("idCDASHM2Carousel") != undefined){
			sap.ui.getCore().byId("idCDASHM2Carousel").destroy();
		}

		var oCDASHM2Carousel = new sap.m.Carousel("idCDASHM2Carousel",{
			height: "220px",
			arrowsPlacement : "Content",
			pageIndicatorPlacement: sap.m.PlacementType.Bottom,
			loop: false,
			pages: [jsonCDASHM2Images]
		});

		var oCurrent = this;
		var oCDASHM2Doc = new cdashm2doc();

		/* CDASHM2 - Table - Other Documents */
		if(sap.ui.getCore().byId("idCDASHM2TableOtherDocs") != undefined){
			sap.ui.getCore().byId("idCDASHM2TableOtherDocs").destroy();
		}
		var oCDASHM2TableOtherDocs = new sap.ui.table.Table("idCDASHM2TableOtherDocs",{
			visibleRowCount: 6,
			//columnHeaderVisible : false,s
			width: '100%',
			selectionMode : sap.ui.table.SelectionMode.None
		}).addStyleClass("sapUiSizeCompact tblBorder");

		oCDASHM2TableOtherDocs.addColumn(new sap.ui.table.Column({
			 label: new sap.ui.commons.Label({text: "Other Documents", textAlign: "Center"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.Link({
				 press : function(oEvent){
					 var binstring = oEvent.getSource().getBindingContext().getProperty("images");
 					var filename = oEvent.getSource().getBindingContext().getProperty("name");
 			    var ext = filename.split('.').pop().toLowerCase();
 					var dispname = filename.split('_').pop();
 //								    	var ext = data.FileExt.toLowerCase();
 			    	//get file content
 			    	var byteCharacters = atob(binstring);
 					var byteNumbers = new Array(byteCharacters.length);
 					for (var i = 0; i < byteCharacters.length; i++) {
 					   byteNumbers[i] = byteCharacters.charCodeAt(i);
 					}
 					var byteArray = new Uint8Array(byteNumbers);
 			    	var crnFileMimeType = jQuery.grep(fileTypeJson, function(element, index){
 						return element.fileextension == ext;
 					});
 					contentType = crnFileMimeType[0].mimetype;
 					var blob = new Blob([byteArray], {type: contentType});
 					//var blobUrl = URL.createObjectURL(blob);
 					//window.open(blobUrl);
 					if ((navigator.appName == 'Microsoft Internet Explorer') ||
 		                 (!!navigator.userAgent.match(/Trident.*rv[ :]*11\./)))
 			         	 {
 							 window.navigator.msSaveOrOpenBlob(blob, title+'.'+ext);
 			         	 }else{
 			         		var blobUrl = URL.createObjectURL(blob);
 									window.open(blobUrl);
 									/*let a = $("<a />", {
 											href: blobUrl,
 											download: dispname,
 									})
 									.appendTo("body").get(0).click();*/
 			         	 }
 				 }
			 }).bindProperty("text", "dispname").addStyleClass("borderStyle1"),
						 resizable:false,
						 width:"100px"
			 }));

			 var oCDASHM2ModelOtherDocs = new sap.ui.model.json.JSONModel();
			 oCDASHM2ModelOtherDocs.setData({modelData: jsonCDASHM2Documents});

			 var oCDASHM2TableOtherDocs = sap.ui.getCore().byId("idCDASHM2TableOtherDocs");
			 oCDASHM2TableOtherDocs.setModel(oCDASHM2ModelOtherDocs);
			 oCDASHM2TableOtherDocs.bindRows("/modelData");

		// var oCDASHM2FlexDocumentSection = new sap.m.FlexBox({
    //         items: [
    //                 		new sap.ui.commons.Button({
		// 	                  text: "Other Doc",
		// 	                  //width : "80px",
		// 	                  //styled : false,
		// 	     		   			  press : function(oEvent){
		// 	     		   				  oCDASHM2Doc.getOtherDocumentsList(oEvent.getSource());
		// 	     		   			  }
		// 					  }).addStyleClass("normalBtn marginTop10 floatRight")*/
		// 					  /*new sap.m.Label({width : "15px"}),
		// 					  new sap.ui.commons.Button({
		// 		                  text: "Upload",
		// 		                  styled : false,
		// 		                  width : "90px",
		//      		   			  press : function(oEvent){
		//      		   				oCDASHM2Doc.openUploadDocumentsPopup(oEvent.getSource());
		//      		   			  }
		// 						  }).addStyleClass("dashBtn"),
		// 					  new sap.m.Label({width : "15px"}),
		// 					  new sap.ui.commons.Button({
		// 		                  text: "Delete",
		// 		                  styled : false,
		// 		                  width : "90px",
		//      		   			  press : function(oEvent){
		//      		   				oCDASHM2Doc.openDeleteDocumentsPopup(oEvent.getSource());
		//      		   			  }
		// 						  }).addStyleClass("dashBtn")*/
    //                 ],
    //         direction: "Column"
    //         });

		/* CDASHM2 - Layout - Carousel and Upload Section */
		if(sap.ui.getCore().byId("idCDASHM2LayoutMNRPictures") != undefined){
			sap.ui.getCore().byId("idCDASHM2LayoutMNRPictures").destroy();
		}
		var oCDASHM2LayoutMNRPictures = new sap.ui.layout.form.ResponsiveGridLayout("idCDASHM2LayoutMNRPictures",{
										    });

		/* CDASHM2 - Form - Header Details */
		if(sap.ui.getCore().byId("idCDASHM2FormMNRPictures") != undefined){
			sap.ui.getCore().byId("idCDASHM2FormMNRPictures").destroy();
		}

		if(sap.ui.getCore().byId("idCDASHM2FormMNRPicturesC1") != undefined){
			sap.ui.getCore().byId("idCDASHM2FormMNRPicturesC1").destroy();
		}

		if(sap.ui.getCore().byId("idCDASHM2FormMNRPicturesC2") != undefined){
			sap.ui.getCore().byId("idCDASHM2FormMNRPicturesC2").destroy();
		}

		if(jsonCDASHM2Documents.length == 0){
			var oCDASHM2FormMNRPictures = new sap.ui.layout.form.Form("idCDASHM2FormMNRPictures",{
						layout: oCDASHM2LayoutMNRPictures,
						formContainers: [
										new sap.ui.layout.form.FormContainer("idCDASHM2FormMNRPicturesC2",{
												//title: "Summary",
												layoutData: new sap.ui.layout.GridData({span: "L10 M10 S10"}),
												formElements: [
												new sap.ui.layout.form.FormElement({
														fields: [new sap.m.FlexBox({
															direction : "Column",
															items : [ oCDASHM2Carousel ]
														})
														]
												})
																		]
										}),

						]
					}).addStyleClass("marginTopBottom10");
		}else{
			var oCDASHM2FormMNRPictures = new sap.ui.layout.form.Form("idCDASHM2FormMNRPictures",{
		        layout: oCDASHM2LayoutMNRPictures,
		        formContainers: [
		                new sap.ui.layout.form.FormContainer("idCDASHM2FormMNRPicturesC1",{
		                    //title: "Summary",
		                	  layoutData: new sap.ui.layout.GridData({span: "L10 M10 S10"}),
		                    formElements: [
												new sap.ui.layout.form.FormElement({
												    fields: [ oCDASHM2Carousel ]
												})
		                                ]
		                }),

		                new sap.ui.layout.form.FormContainer("idCDASHM2FormMNRPicturesC2",{
		                    //title: "Summary",
		                	  layoutData: new sap.ui.layout.GridData({span: "L2 M2 S2"}),
		                    formElements: [
												new sap.ui.layout.form.FormElement({
												    fields: [new sap.m.FlexBox({
												    	direction : "Column",
												    	items : [ oCDASHM2TableOtherDocs ]
												    })
												    ]
												})
		                                ]
		                }),

		        ]
			    }).addStyleClass("marginTopBottom10");
		}

	/*	var oCDASHM2FormMNRPictures = new sap.m.FlexBox({
			direction : "Row",
			items : [ oCDASHM2FlexDocumentSection, oCDASHM2FormMNRPictures123 ]
		}).addStyleClass("marginTopBottom10"); */

		//Listen to 'pageChanged' events
		oCDASHM2Carousel.attachPageChanged(function(oControlEvent) {
			console.log("sap.m.Carousel: page changed: old: " + oControlEvent.getParameters().oldActivePageId );
			console.log("                              new: " + oControlEvent.getParameters().newActivePageId );
		});

		/* CDASHM2 - Panel - Image Carousel */

		if(sap.ui.getCore().byId("idCDASHM2PanelCarousel") != undefined){
			sap.ui.getCore().byId("idCDASHM2PanelCarousel").destroy();
		}
		var oCDASHM2 = new CDASHM2();
		var oCDASHM2PanelCarousel = new sap.m.Panel("idCDASHM2PanelCarousel",{
			busy : false, // boolean
			busyIndicatorDelay : 1000, // int
			visible : true, // boolean
			headerText : "M&R Pictures", // string
			width : "100%",
			height : "auto", // sap.ui.core.CSSSize
			expandable : true, // boolean, since 1.22
			expanded : globalPicPanelExpanded, // boolean, since 1.22
			expandAnimation : true, // boolean, since 1.26
			//tooltip : "Filters", // sap.ui.core.TooltipBase
			content : [oCDASHM2FormMNRPictures], // sap.ui.core.Control
			expand : function(oEvent){
					var isExpand = oEvent.getParameter("expand");
					if(isExpand && global3SerialNo != ""){
						globalPicPanelExpanded = true;
						var oCDASHM2ContentThumbNail = oCDASHM2.setContentThumbnail(global3SerialNo);
						sap.ui.getCore().byId("idCDASHM2ContentFinal").insertItem(oCDASHM2ContentThumbNail, 5);
					}
			}
		});

		/*if(jsonCDASHM2Documents.length == 0 && jsonCDASHM2Pictures.length == 0){
				sap.ui.getCore().byId("idCDASHM2PanelCarousel").setVisible(false);
		}else{
				sap.ui.getCore().byId("idCDASHM2PanelCarousel").setVisible(true);
		}*/

		if(globalApprAllowed == true){
			sap.ui.getCore().byId("idCDASHM2PanelCarousel").setVisible(true);
		}else{
			 sap.ui.getCore().byId("idCDASHM2PanelCarousel").setVisible(false);
		}

		return oCDASHM2PanelCarousel;

	},

	/* CDASHM2 - Content - Record Details */
	setContentRecordDetailsBackUp : function(){

		/* Serial */

		var oCDASHM2RecordDetailsValueSerial = new sap.m.Label("idCDASHM2RecordDetailsValueSerial",{
            text : " "
            }).addStyleClass("selectionLabels");

		var oCDASHM2RecordDetailsLabelSerial = new sap.m.Label("idCDASHM2RecordDetailsLabelSerial",{
		       text : "Serial No.: ",
		       labelFor: oCDASHM2RecordDetailsValueSerial,
		       width : "130px"
		       }).addStyleClass("selectionLabelsLabel");

		var oCDASHM2RecordDetailsFlexSerial = new sap.m.FlexBox("idCDASHM2RecordDetailsFlexSerial",{
		    items: [
		            oCDASHM2RecordDetailsLabelSerial,
		            oCDASHM2RecordDetailsValueSerial
		            ],
		    direction: "Row"
		    });

		/* Column 1 */

		var oCDASHM2RecordDetailsFlexColumn1 = new sap.m.FlexBox("idCDASHM2RecordDetailsFlexColumn1",{
		    items: [
		            oCDASHM2RecordDetailsFlexSerial
		            ],
		    width : "12%",
		    direction: "Column"
		    });

		/* Record Type */

		var oCDASHM2RecordDetailsValueRecordType = new sap.m.Label("idCDASHM2RecordDetailsValueRecordType",{
            text : " "
            }).addStyleClass("selectionLabels");



		var oCDASHM2RecordDetailsLabelRecordType = new sap.m.Label("idCDASHM2RecordDetailsLabelRecordType",{
		       text : "Record Type: ",
		       labelFor: oCDASHM2RecordDetailsValueRecordType,
		       width : "130px"
		       }).addStyleClass("selectionLabelsLabel");

		var oCDASHM2RecordDetailsFlexRecordType = new sap.m.FlexBox("idCDASHM2RecordDetailsFlexRecordType",{
		    items: [
		            oCDASHM2RecordDetailsLabelRecordType,
		            oCDASHM2RecordDetailsValueRecordType
		            ],
		    direction: "Row"
		    });

		/* Column 2 */

		var oCDASHM2RecordDetailsFlexColumn2 = new sap.m.FlexBox("idCDASHM2RecordDetailsFlexColumn2",{
		    items: [
		            oCDASHM2RecordDetailsFlexRecordType
		            ],
		    width : "12%",
		    direction: "Column"
		    });

		/* Current M&R Status */

		var oCDASHM2RecordDetailsValueMNRStatus = new sap.m.Label("idCDASHM2RecordDetailsValueMNRStatus",{
            text : " "
            }).addStyleClass("selectionLabels");

		var oCDASHM2RecordDetailsLabelMNRStatus = new sap.m.Label("idCDASHM2RecordDetailsLabelMNRStatus",{
		       text : "Current M&R Status : ",
		       labelFor: oCDASHM2RecordDetailsValueMNRStatus,
		       width : "170px"
		       }).addStyleClass("selectionLabelsLabel");

		var oCDASHM2RecordDetailsFlexMNRStatus = new sap.m.FlexBox("idCDASHM2RecordDetailsFlexMNRStatus",{
		    items: [
		            oCDASHM2RecordDetailsLabelMNRStatus,
		            oCDASHM2RecordDetailsValueMNRStatus
		            ],
		    direction: "Row"
		    });

		/* Column 3 */

		var oCDASHM2RecordDetailsFlexColumn3 = new sap.m.FlexBox("idCDASHM2RecordDetailsFlexColumn3",{
		    items: [
		            oCDASHM2RecordDetailsFlexMNRStatus
		            ],
		    width : "22%",
		    direction: "Column"
		    });

		/* Last Action */

		var oCDASHM2RecordDetailsValueLastAction = new sap.m.Label("idCDASHM2RecordDetailsValueLastAction",{
            	text : " "
            }).addStyleClass("selectionLabels");

		var oCDASHM2RecordDetailsLabelLastAction = new sap.m.Label("idCDASHM2RecordDetailsLabelLastAction",{
		       text : "Last Action : ",
		       labelFor: oCDASHM2RecordDetailsValueLastAction,
		       width : "130px"
		       }).addStyleClass("selectionLabelsLabel");

		var oCDASHM2RecordDetailsButtonLastAction = new sap.m.Image("idCDASHM2RecordDetailsButtonLastAction",{
            src: "images/f4_help.png",
            press : function(oEvent){
            	var oCDASHM2LastActions = "";
            	oCDASHM2LastActions = jsonCDASHM2LastActions[0];
            	for(var i=1; i<jsonCDASHM2LastActions.length; i++){
            		oCDASHM2LastActions = oCDASHM2LastActions + "\n" + jsonCDASHM2LastActions[i];
            	}

            	var oCDASHM2RecordDetailsValueLastAction = new sap.m.TextArea({
                	value : oCDASHM2LastActions,//oCDASHM2JsonHeaderDetails.lastaction,
                	//height : "150px",
									rows : 8,
									width : "600px",
									enabled : false
                }).addStyleClass("lastActionPanel");

            	if(sap.ui.getCore().byId("idCDASHM2LastActionPopover") != undefined)
               	 sap.ui.getCore().byId("idCDASHM2LastActionPopover").destroy();

				 var oCDASHM2LastActionPopover = new sap.m.Popover("idCDASHM2LastActionPopover",{
                    title: "Last Actions",
                    //modal: true,
                    placement: sap.m.PlacementType.Left,
                    /*footer:  new sap.m.Bar({

                                           contentRight: [
                                                         new sap.m.Button({
                                                                          text: "Send",
                                                                          icon: "sap-icon://email",
                                                                          press: function () {
                                                                       	   oCurrent.sendCDASHM1EquipmentLevelAlert();
                                                                          }
                                                                          }).addStyleClass("footerBtn"),
                                                         ],
                                           }),*/
                    content: new sap.m.VBox({
                                            //width:"300px",
                                            items:  [oCDASHM2RecordDetailsValueLastAction]
                                            }),

                    }).addStyleClass("sapUiPopupWithPadding");

				 oCDASHM2LastActionPopover.openBy(oEvent.getSource());
            }
		}).addStyleClass("f4imagesearch");

		var oCDASHM2RecordDetailsFlexLastAction = new sap.m.FlexBox("idCDASHM2RecordDetailsFlexLastAction",{
		    items: [
		            oCDASHM2RecordDetailsLabelLastAction,
		            oCDASHM2RecordDetailsValueLastAction,
		            oCDASHM2RecordDetailsButtonLastAction
		            ],
		    direction: "Row"
		    });

		/* Column 4 */

		var oCDASHM2RecordDetailsFlexColumn4 = new sap.m.FlexBox("idCDASHM2RecordDetailsFlexColumn4",{
		    items: [
		            oCDASHM2RecordDetailsFlexLastAction
		            ],
		    width : "40%",
		    direction: "Column"
		    });



		/* Columns */

		var oCDASHM2RecordDetailsFlexColumns = new sap.m.FlexBox("idCDASHM2RecordDetailsFlexColumns",{
		    items: [
		            oCDASHM2RecordDetailsFlexColumn1,
		            oCDASHM2RecordDetailsFlexColumn2,
		            oCDASHM2RecordDetailsFlexColumn3,
		            oCDASHM2RecordDetailsFlexColumn4
		            ],
		    direction: "Row",
		    justifyContent : sap.m.FlexJustifyContent.SpaceBetween
		    }).addStyleClass("leftMargin");

		return oCDASHM2RecordDetailsFlexColumns;

	},

	/* CDASHM2 - Content - Alert and Search Buttons */

	setContentButtons : function(){

		var oCurrent = this;

		/* CDASHM2 - Input - Search  */

        var oCDASHM2InputSearch = new sap.m.SearchField("idCDASHM2InputSearch", {
					                    width: "250px",
					                    placeholder: "Unit or Estimate #",
					                    search : function(oEvent){
					                    	var text = oEvent.getParameters("query").query;
					                    	oCurrent.searchCDASHM2EquipmentLevel(text);
					                    }
					                    });

        var oCDASHM2F4Search = new sap.m.Image("idCDASHM2F4Search",{
            src: "images/f4_help.png",
            press : function(oEvent){

            	var oCDASHM2PopupSearch = new sap.m.TextArea({
            		placeholder : "Serial No.",
                	value : "",
                	height : "150px",
					width : "200px",
					enabled : true
                }).addStyleClass("lastActionPanel");

            	if(sap.ui.getCore().byId("idCDASHM2PopoverSearch") != undefined)
               	 sap.ui.getCore().byId("idCDASHM2PopoverSearch").destroy();

				 var oCDASHM2PopoverSearch = new sap.m.Popover("idCDASHM2PopoverSearch",{
                    title: "Search",
                    //modal: true,
                    placement: sap.m.PlacementType.Left,
                    /*footer:  new sap.m.Bar({

                                           contentRight: [
                                                         new sap.m.Button({
                                                                          text: "Send",
                                                                          icon: "sap-icon://email",
                                                                          press: function () {
                                                                       	   oCurrent.sendCDASHM1EquipmentLevelAlert();
                                                                          }
                                                                          }).addStyleClass("footerBtn"),
                                                         ],
                                           }),*/
                    content: new sap.m.VBox({
                                            //width:"300px",
                                            items:  [oCDASHM2PopupSearch]
                                            }),

                    }).addStyleClass("sapUiPopupWithPadding");

				 oCDASHM2PopoverSearch.openBy(oCDASHM2F4Search);
            }
		}).addStyleClass("f4imagesearch");

		/* CDASHM2 - Flex - Search  */

        var oCDASHM2FlexSearch = new sap.m.FlexBox("idCDASHM2FlexSearch",{
            items: [oCDASHM2InputSearch,
                    oCDASHM2F4Search
                    ],
            direction: "Row",
            visible : false
            });


				/* CDASHM2 - Button - Equipment Level Export to Excel */

		 		var oCDASHM2ButtonEquipmentLevelExport = new sap.ui.commons.Button("idCDASHM2ButtonEquipmentLevelExport",{
		 	          text : "",
		 	          //styled:false,
		 	          //type:sap.m.ButtonType.Unstyled,
		 	          icon: sap.ui.core.IconPool.getIconURI("excel-attachment"),
		 	          press:function(){
		 							oCurrent.downloadCDASHM2Excel();
		 	          }
		 		}).addStyleClass("normalBtn marginTop10 floatRight");

	   	/* CDASHM2 - Button - Equipment Level Download Estimates */
			 var oCDASHM1 = new CDASHM1();
	   	 var oCDASHM2ButtonEquipmentLevelDownload = new sap.ui.commons.Button("idCDASHM2ButtonEquipmentLevelDownload",{
	          text: "Download",
	          visible:true,
	          //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
	          press:function(){
	        		 if(global3EstimateNo == ""){

							 }else{

									if(globalApprAllowed == false){
										var oCDASHM1 = new CDASHM1();
										oCDASHM1.getPdfFromSap(global3EstimateNo, global3SerialNo, "P");
									}/*else if(jsonCDASHM2Documents.length == 0 && jsonCDASHM2Pictures.length == 0){
											console.log("No docs available");
											var oCDASHM1 = new CDASHM1();
											oCDASHM1.getPdfFromSap(global3EstimateNo, global3SerialNo, "P");
									}*/else{
									if(sap.ui.getCore().byId("idCDASHM2Download") != undefined)
 										 sap.ui.getCore().byId("idCDASHM2Download").destroy();

 							    if(sap.ui.getCore().byId("idCDASHM2CheckBoxDownloadPDF") != undefined)
 										sap.ui.getCore().byId("idCDASHM2CheckBoxDownloadPDF").destroy();

	 								if(sap.ui.getCore().byId("idCDASHM2CheckBoxDownloadPictures") != undefined)
	 										 sap.ui.getCore().byId("idCDASHM2CheckBoxDownloadPictures").destroy();

 								 var oCDASHM2Download = new sap.m.Popover("idCDASHM2Download",{
 												 //title: "Download",
 												 //modal: true,
												 showHeader:false,
 												 placement: sap.m.PlacementType.Right,
 												 content: new sap.m.VBox({
 																								 //width:"300px",
 																								 items:  [

 																									 new sap.ui.commons.CheckBox("idCDASHM2CheckBoxDownloadPDF",{
 															 		                	 text : "Estimate",
 															 		          			   checked : true
 																								 }).addStyleClass("pdfexcelcheckboxes1"),

 																								 new sap.ui.commons.CheckBox("idCDASHM2CheckBoxDownloadPictures",{
 														 		                	 text : "Pictures",
 														 		          			   checked : false
 																							 	}).addStyleClass("pdfexcelcheckboxes1"),

 																								new sap.ui.commons.Button({
  																					          text: "Download",
  																					          visible:true,
  																					          //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
  																					          press:function(oEvent){

 																										var oCDASHM1 = new CDASHM1();
																										if(sap.ui.getCore().byId("idCDASHM2CheckBoxDownloadPDF").getChecked())
 																												oCDASHM1.getPdfFromSap(global3EstimateNo, global3SerialNo, "P");
 																										if(sap.ui.getCore().byId("idCDASHM2CheckBoxDownloadPictures").getChecked())
 																												oCDASHM1.getPdfFromSap(global3EstimateNo, global3SerialNo, "Z");


  																					          }}).addStyleClass("marginTop10")

 																								 ]
 																								 }),

 												 }).addStyleClass("sapUiPopupWithPadding");

 								 		 oCDASHM2Download.openBy(sap.ui.getCore().byId("idCDASHM2ButtonEquipmentLevelDownload"));
									 }
		      	   }
	          }}).addStyleClass("normalBtn marginTop10 floatRight");

	   	/* CDASHM2 - Button - Equipment Level Customer Contact Details */

	   	 var oCDASHM2ButtonEquipmentLevelCustContact = new sap.ui.commons.Button("idCDASHM2ButtonEquipmentLevelCustContact",{
	          text: "Customer Contact Details",
	          visible:true,
	          //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
	          press:function(oEvent){
							busyDialog.open();
	      		   oCurrent.openCustContact(oEvent);
							 busyDialog.close();
	          }}).addStyleClass("normalBtn marginTop10 floatRight");

	   	/* CDASHM2 - Button - Equipment Level Customer Billing Details */

	   	 var oCDASHM2ButtonEquipmentLevelCustBilling = new sap.ui.commons.Button("idCDASHM2ButtonEquipmentLevelCustBilling",{
	          text: "Customer Billing Details",
	          visible:true,
	          //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
	          press:function(oEvent){
							busyDialog.open();
	      		   oCurrent.openCustBilling(oEvent);
							 busyDialog.close();
	          }}).addStyleClass("normalBtn marginTop10 floatRight");

	   	/* CDASHM2 - Button - Equipment Level Depot Payment Details */

	   	 var oCDASHM2ButtonEquipmentLevelDepotPayment = new sap.ui.commons.Button("idCDASHM2ButtonEquipmentLevelDepotPayment",{
	          text: "Depot Payment Details",
	          visible:true,
	          //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
	          press:function(oEvent){
							 busyDialog.open();
	      		   oCurrent.openDepotPayment(oEvent);
							 busyDialog.close();
	          }}).addStyleClass("normalBtn marginTop10 floatRight");

	   	/* CDASHM2 - Button - Equipment Level Depot Contact Details */

	   	 var oCDASHM2ButtonEquipmentLevelDepotContact = new sap.ui.commons.Button("idCDASHM2ButtonEquipmentLevelDepotContact",{
	          text: "Depot Contact Details",
	          visible:true,
	          //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
	          press:function(oEvent){
							busyDialog.open();
	      		   oCurrent.openDepotContact(oEvent);
							 busyDialog.close();
	          }}).addStyleClass("normalBtn marginTop10 floatRight");

	   	/* CDASHM2 - Button - Customer Approval */
			 var oCDASHM1 = new CDASHM1();
	   	 var oCDASHM2ButtonEquipmentLevelCSApproval = new sap.ui.commons.Button("idCDASHM2ButtonEquipmentLevelCSApproval",{
	          text: "Approve",
	          visible:true,
	          //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
	          press:function(){
	        	  var oContentCSApprove = oCDASHM1.setCSApproveInitial(2);
	        	  oCDASHM1.openCSApprove(oContentCSApprove, 2);
	          }}).addStyleClass("normalBtn marginTop10 floatRight");


		var oCDASHM2FlexEquipmentLevelButtons = new sap.m.FlexBox({
	         items: [
						oCDASHM2ButtonEquipmentLevelCSApproval,
						oCDASHM2ButtonEquipmentLevelDownload,
						oCDASHM2ButtonEquipmentLevelExport
	       ],
	       //direction : "RowReverse",
	       visible: true,
		});

		return oCDASHM2FlexEquipmentLevelButtons;

	},


	/* CDASHM2 - Content - Header Details */
	setContentHeaderDetailsBackUp : function(){

		/* Return expected in this format */

		// Depot		// UOM				// Estimate Number
		// City			// On Hire Date		// Currency
		// Lease No		// Gate In Date		// Age
		// Unit Type	// Est Date			// Redel Ref

		/* Depot */

		var oCDASHM2HeaderDetailsValueDepot = new sap.m.Label("idCDASHM2HeaderDetailsValueDepot",{
            text : " "
            }).addStyleClass("selectionLabels");

		var oCDASHM2HeaderDetailsLabelDepot = new sap.m.Label("idCDASHM2HeaderDetailsLabelDepot",{
		       text : "Depot : ",
		       labelFor: oCDASHM2HeaderDetailsValueDepot,
		       width : "130px"
		       }).addStyleClass("selectionLabelsLabel");

		var oCDASHM2HeaderDetailsFlexDepot = new sap.m.FlexBox("idCDASHM2HeaderDetailsFlexDepot",{
		    items: [
		            oCDASHM2HeaderDetailsLabelDepot,
		            oCDASHM2HeaderDetailsValueDepot
		            ],
		    direction: "Row"
		    }).addStyleClass("blockBorder");


		/* City */

		var oCDASHM2HeaderDetailsValueCity = new sap.m.Label("idCDASHM2HeaderDetailsValueCity",{
            text : " "
            }).addStyleClass("selectionLabels");

		var oCDASHM2HeaderDetailsLabelCity = new sap.m.Label("idCDASHM2HeaderDetailsLabelCity",{
		       text : "City : ",
		       labelFor: oCDASHM2HeaderDetailsValueCity,
		       width : "130px"
		       }).addStyleClass("selectionLabelsLabel");

		var oCDASHM2HeaderDetailsFlexCity = new sap.m.FlexBox("idCDASHM2HeaderDetailsFlexCity",{
		    items: [
		            oCDASHM2HeaderDetailsLabelCity,
		            oCDASHM2HeaderDetailsValueCity
		            ],
		    direction: "Row"
		}).addStyleClass("blockBorder");

		/* Lease No */

		var oCDASHM2HeaderDetailsValueLease = new sap.m.Label("idCDASHM2HeaderDetailsValueLease",{
            text : " "
            }).addStyleClass("selectionLabels");

		var oCDASHM2HeaderDetailsLabelLease = new sap.m.Label("idCDASHM2HeaderDetailsLabelLease",{
		       text : "Lease No.: ",
		       labelFor: oCDASHM2HeaderDetailsValueLease,
		       width : "130px"
		       }).addStyleClass("selectionLabelsLabel");

		var oCDASHM2HeaderDetailsFlexLease = new sap.m.FlexBox("idCDASHM2HeaderDetailsFlexLease",{
		    items: [
		            oCDASHM2HeaderDetailsLabelLease,
		            oCDASHM2HeaderDetailsValueLease
		            ],
		    direction: "Row"
		}).addStyleClass("blockBorder");

		/* UnitType */

		var oCDASHM2HeaderDetailsValueUnitType = new sap.m.Label("idCDASHM2HeaderDetailsValueUnitType",{
            text : " "
            }).addStyleClass("selectionLabels");

		var oCDASHM2HeaderDetailsLabelUnitType = new sap.m.Label("idCDASHM2HeaderDetailsLabelUnitType",{
		       text : "Unit Type : ",
		       labelFor: oCDASHM2HeaderDetailsValueUnitType,
		       width : "130px"
		       }).addStyleClass("selectionLabelsLabel");

		var oCDASHM2HeaderDetailsFlexUnitType = new sap.m.FlexBox("idCDASHM2HeaderDetailsFlexUnitType",{
		    items: [
		            oCDASHM2HeaderDetailsLabelUnitType,
		            oCDASHM2HeaderDetailsValueUnitType
		            ],
		    direction: "Row"
		}).addStyleClass("blockBorder");

		/* Column 1 */

		var oCDASHM2HeaderDetailsFlexColumn1 = new sap.m.FlexBox("idCDASHM2HeaderDetailsFlexColumn1",{
		    items: [
		            oCDASHM2HeaderDetailsFlexDepot,
		            oCDASHM2HeaderDetailsFlexCity,
		            oCDASHM2HeaderDetailsFlexLease,
		            oCDASHM2HeaderDetailsFlexUnitType
		            ],
		    direction: "Column",
		    width : "30%"
		    });



		/* UOM */

		var oCDASHM2HeaderDetailsValueUOM = new sap.m.Label("idCDASHM2HeaderDetailsValueUOM",{
            text : " "
            }).addStyleClass("selectionLabels");

		var oCDASHM2HeaderDetailsLabelUOM = new sap.m.Label("idCDASHM2HeaderDetailsLabelUOM",{
		       text : "Unit Of Measure : ",
		       labelFor: oCDASHM2HeaderDetailsValueUOM,
		       width : "130px"
		       }).addStyleClass("selectionLabelsLabel");

		var oCDASHM2HeaderDetailsFlexUOM = new sap.m.FlexBox("idCDASHM2HeaderDetailsFlexUOM",{
		    items: [
		            oCDASHM2HeaderDetailsLabelUOM,
		            oCDASHM2HeaderDetailsValueUOM
		            ],
		    direction: "Row"
		}).addStyleClass("blockBorder");


		/* On Hire Date */

		var oCDASHM2HeaderDetailsValueOHDate = new sap.m.Label("idCDASHM2HeaderDetailsValueOHDate",{
            text : " "
            }).addStyleClass("selectionLabels");

		var oCDASHM2HeaderDetailsLabelOHDate = new sap.m.Label("idCDASHM2HeaderDetailsLabelOHDate",{
		       text : "On Hire Date : ",
		       labelFor: oCDASHM2HeaderDetailsValueOHDate,
		       width : "130px"
		       }).addStyleClass("selectionLabelsLabel");

		var oCDASHM2HeaderDetailsFlexOHDate = new sap.m.FlexBox("idCDASHM2HeaderDetailsFlexOHDate",{
		    items: [
		            oCDASHM2HeaderDetailsLabelOHDate,
		            oCDASHM2HeaderDetailsValueOHDate
		            ],
		    direction: "Row"
		}).addStyleClass("blockBorder");

		/* Gate In Date */

		var oCDASHM2HeaderDetailsValueGIDate = new sap.m.Label("idCDASHM2HeaderDetailsValueGIDate",{
            text : " "
            }).addStyleClass("selectionLabels");

		var oCDASHM2HeaderDetailsLabelGIDate = new sap.m.Label("idCDASHM2HeaderDetailsLabelGIDate",{
		       text : "Gate In Date : ",
		       labelFor: oCDASHM2HeaderDetailsValueGIDate,
		       width : "130px"
		       }).addStyleClass("selectionLabelsLabel");

		var oCDASHM2HeaderDetailsFlexGIDate = new sap.m.FlexBox("idCDASHM2HeaderDetailsFlexGIDate",{
		    items: [
		            oCDASHM2HeaderDetailsLabelGIDate,
		            oCDASHM2HeaderDetailsValueGIDate
		            ],
		    direction: "Row"
		}).addStyleClass("blockBorder");

		/* Est Date */

		var oCDASHM2HeaderDetailsValueEstDate = new sap.m.Label("idCDASHM2HeaderDetailsValueEstDate",{
            text : " "
            }).addStyleClass("selectionLabels");

		var oCDASHM2HeaderDetailsLabelEstDate = new sap.m.Label("idCDASHM2HeaderDetailsLabelEstDate",{
		       text : "Est Date : ",
		       labelFor: oCDASHM2HeaderDetailsValueEstDate,
		       width : "130px"
		       }).addStyleClass("selectionLabelsLabel");

		var oCDASHM2HeaderDetailsFlexEstDate = new sap.m.FlexBox("idCDASHM2HeaderDetailsFlexEstDate",{
		    items: [
		            oCDASHM2HeaderDetailsLabelEstDate,
		            oCDASHM2HeaderDetailsValueEstDate
		            ],
		    direction: "Row"
		}).addStyleClass("blockBorder");

		/* Column 2 */

		var oCDASHM2HeaderDetailsFlexColumn2 = new sap.m.FlexBox("idCDASHM2HeaderDetailsFlexColumn2",{
		    items: [
		            oCDASHM2HeaderDetailsFlexUOM,
		            oCDASHM2HeaderDetailsFlexOHDate,
		            oCDASHM2HeaderDetailsFlexGIDate,
		            oCDASHM2HeaderDetailsFlexEstDate
		            ],
		    direction: "Column",
		    width : "30%"
		    });

		/* Estimate */

		var oCDASHM2HeaderDetailsValueEstimate = new sap.m.Label("idCDASHM2HeaderDetailsValueEstimate",{
            text : " "
            }).addStyleClass("selectionLabels");

		var oCDASHM2HeaderDetailsLabelEstimate = new sap.m.Label("idCDASHM2HeaderDetailsLabelEstimate",{
		       text : "Estimate No. : ",
		       labelFor: oCDASHM2HeaderDetailsValueEstimate,
		       width : "130px"
		       }).addStyleClass("selectionLabelsLabel");

		var oCDASHM2HeaderDetailsFlexEstimate = new sap.m.FlexBox("idCDASHM2HeaderDetailsFlexEstimate",{
		    items: [
		            oCDASHM2HeaderDetailsLabelEstimate,
		            oCDASHM2HeaderDetailsValueEstimate
		            ],
		    direction: "Row"
		}).addStyleClass("blockBorder");


		/* Currency */

		var oCDASHM2HeaderDetailsValueCurrency = new sap.m.Label("idCDASHM2HeaderDetailsValueCurrency",{
            text : " "
            }).addStyleClass("selectionLabels");

		var oCDASHM2HeaderDetailsLabelCurrency = new sap.m.Label("idCDASHM2HeaderDetailsLabelCurrency",{
		       text : "Currency : ",
		       labelFor: oCDASHM2HeaderDetailsValueCurrency,
		       width : "130px"
		       }).addStyleClass("selectionLabelsLabel");

		var oCDASHM2HeaderDetailsFlexCurrency = new sap.m.FlexBox("idCDASHM2HeaderDetailsFlexCurrency",{
		    items: [
		            oCDASHM2HeaderDetailsLabelCurrency,
		            oCDASHM2HeaderDetailsValueCurrency
		            ],
		    direction: "Row"
		}).addStyleClass("blockBorder");

		/* Age */

		var oCDASHM2HeaderDetailsValueAge = new sap.m.Label("idCDASHM2HeaderDetailsValueAge",{
            text : " "
            }).addStyleClass("selectionLabels");

		var oCDASHM2HeaderDetailsLabelAge = new sap.m.Label("idCDASHM2HeaderDetailsLabelAge",{
		       text : "Age : ",
		       labelFor: oCDASHM2HeaderDetailsValueAge,
		       width : "130px"
		       }).addStyleClass("selectionLabelsLabel");

		var oCDASHM2HeaderDetailsFlexAge = new sap.m.FlexBox("idCDASHM2HeaderDetailsFlexAge",{
		    items: [
		            oCDASHM2HeaderDetailsLabelAge,
		            oCDASHM2HeaderDetailsValueAge
		            ],
		    direction: "Row"
		}).addStyleClass("blockBorder");

		/* Redel */

		var oCDASHM2HeaderDetailsValueRedel = new sap.m.Label("idCDASHM2HeaderDetailsValueRedel",{
            text : " "
            }).addStyleClass("selectionLabels");

		var oCDASHM2HeaderDetailsLabelRedel = new sap.m.Label("idCDASHM2HeaderDetailsLabelRedel",{
		       text : "Redel Ref.: ",
		       labelFor: oCDASHM2HeaderDetailsValueRedel,
		       width : "130px"
		       }).addStyleClass("selectionLabelsLabel");

		var oCDASHM2HeaderDetailsFlexRedel = new sap.m.FlexBox("idCDASHM2HeaderDetailsFlexRedel",{
		    items: [
		            oCDASHM2HeaderDetailsLabelRedel,
		            oCDASHM2HeaderDetailsValueRedel
		            ],
		    direction: "Row"
		}).addStyleClass("blockBorder");

		/* Column 3 */

		var oCDASHM2HeaderDetailsFlexColumn3 = new sap.m.FlexBox("idCDASHM2HeaderDetailsFlexColumn3",{
		    items: [
		            oCDASHM2HeaderDetailsFlexEstimate,
		            oCDASHM2HeaderDetailsFlexCurrency,
		            oCDASHM2HeaderDetailsFlexAge,
		            oCDASHM2HeaderDetailsFlexRedel
		            ],
		    width : "30%",
		    direction: "Column"
		    });

		/* Columns */

		var oCDASHM2HeaderDetailsFlexColumns = new sap.m.FlexBox("idCDASHM2HeaderDetailsFlexColumns",{
		    items: [
		            oCDASHM2HeaderDetailsFlexColumn1,
		            oCDASHM2HeaderDetailsFlexColumn2,
		            oCDASHM2HeaderDetailsFlexColumn3
		            ],
		    direction: "Row",
		    //justifyContent : sap.m.FlexJustifyContent.SpaceBetween
		    });

		var oCDASHM2HeaderDetailsDividerBegin = new sap.ui.commons.HorizontalDivider({width: "100%", type: "Area", height: "Medium"});
		var oCDASHM2HeaderDetailsDividerEnd = new sap.ui.commons.HorizontalDivider({width: "100%", type: "Area", height: "Medium"});

		/* Final */

		var oCDASHM2HeaderDetailsFlexFinal = new sap.m.FlexBox("idCDASHM2HeaderDetailsFlexFinal",{
		    items: [
		            oCDASHM2HeaderDetailsDividerBegin,
		            oCDASHM2HeaderDetailsFlexColumns,
		            oCDASHM2HeaderDetailsDividerEnd
		            ],
		    direction: "Column"
		    }).addStyleClass("leftMargin");

		return oCDASHM2HeaderDetailsFlexFinal;

	},

	/* CDASHM2 - Function - Send Request Pictures */

	sendRequestPictures : function(button){
		var oCurrent = this;
		/* To Address

	  	 if(sap.ui.getCore().byId("idCDASHM2RequestPicturesValueTo") != undefined)
       	 sap.ui.getCore().byId("idCDASHM2RequestPicturesValueTo").destroy();

        if(sap.ui.getCore().byId("idCDASHM2RequestPicturesLabelTo") != undefined)
       	 sap.ui.getCore().byId("idCDASHM2RequestPicturesLabelTo").destroy();

        var oCDASHM2RequestPicturesValueTo = new sap.m.Input("idCDASHM2RequestPicturesValueTo",{
                                                      value : "",
                                                      type : sap.m.InputType.Email,
                                                      width : "275px",
                                                      }).addStyleClass("selectionLabels1");

        var oCDASHM2RequestPicturesLabelTo = new sap.m.Label("idCDASHM2RequestPicturesLabelTo",{
            text : "To Address : ",
            labelFor: oCDASHM2RequestPicturesValueTo,
            width : "180px"
            }).addStyleClass("selectionLabels");

        var oCDASHM2RequestPicturesFlexTo = new sap.m.FlexBox({
                                                       items: [oCDASHM2RequestPicturesLabelTo,
                                                               oCDASHM2RequestPicturesValueTo
                                                               ],
                                                       direction: "Row"
                                                       });*/

        /* Subject */

        if(sap.ui.getCore().byId("idCDASHM2RequestPicturesValueSubject") != undefined)
       	 sap.ui.getCore().byId("idCDASHM2RequestPicturesValueSubject").destroy();

        if(sap.ui.getCore().byId("idCDASHM2RequestPicturesLabelSubject") != undefined)
       	 sap.ui.getCore().byId("idCDASHM2RequestPicturesLabelSubject").destroy();

        var oCDASHM2RequestPicturesValueSubject = new sap.m.Input("idCDASHM2RequestPicturesValueSubject",{
												                         value : global3SerialNo + "_" + global3Depot,
												                         maxLength : 50,
												                         //type : sap.m.InputType.Email,
												                         width : "275px",
												                         }).addStyleClass("selectionLabels1");

        var oCDASHM2RequestPicturesLabelSubject = new sap.m.Label("idCDASHM2RequestPicturesLabelSubject",{
            text : "Subject : ",
            labelFor: oCDASHM2RequestPicturesValueSubject,
            width : "180px"
            }).addStyleClass("selectionLabels");

        var oCDASHM2RequestPicturesFlexSubject = new sap.m.FlexBox({
                                                       items: [oCDASHM2RequestPicturesLabelSubject,
                                                               oCDASHM2RequestPicturesValueSubject
                                                               ],
                                                       direction: "Row"
                                                       });


        /* Body */

        if(sap.ui.getCore().byId("idCDASHM2RequestPicturesValueBody") != undefined)
       	 sap.ui.getCore().byId("idCDASHM2RequestPicturesValueBody").destroy();

        if(sap.ui.getCore().byId("idCDASHM2RequestPicturesLabelBody") != undefined)
       	 sap.ui.getCore().byId("idCDASHM2RequestPicturesLabelBody").destroy();

        var oCDASHM2RequestPicturesValueBody = new sap.m.TextArea("idCDASHM2RequestPicturesValueBody",{

					    						value : "Dear Sir/Madam,\n\nPlease submit photos of the unit "
						    					+ global3SerialNo +
						    					" by replying to this email with photo@seacoglobal.com in copy."
						    					+ "\n\n"
						    					+ "Comment:\n<insert comment here>"
						    					+ "\n\n"
						    					+ "Please note:\n- Email subject must be in the form of "
						    					+ global3SerialNo + "_" + global3Depot
						    					+ "\n- Allowed file formats are .JPG, .JPEG, .PNG, .BMP, and .PDF."
						    					+ "\n- The size of each file should not exceed 1MB. The total size of all attachments should not exceed 10MB."
						    					+ "\n- Photos should be clear and of good quality."
					    						+ "\nThank you in advance for your attention to this matter."
					    						+ "\n\nBest regards,\n"
						    					+ sessionStorage.name
						    					+ ".",
					    					height : "400px",
					    					width : "600px",
					    					enabled : true
					    					}).addStyleClass("commentsPanel");

        var oCDASHM2RequestPicturesLabelBody = new sap.m.Label("idCDASHM2RequestPicturesLabelBody",{
            text : "Email body : ",
            labelFor: oCDASHM2RequestPicturesValueBody,
            width : "180px"
            }).addStyleClass("selectionLabels");

        var oCDASHM2RequestPicturesFlexBody = new sap.m.FlexBox({
                                                       items: [oCDASHM2RequestPicturesLabelBody,
                                                               oCDASHM2RequestPicturesValueBody
                                                               ],
                                                       direction: "Row"
                                                       });


        /* Comments

        if(sap.ui.getCore().byId("idCDASHM2RequestPicturesValueComments") != undefined)
       	 sap.ui.getCore().byId("idCDASHM2RequestPicturesValueComments").destroy();

        if(sap.ui.getCore().byId("idCDASHM2RequestPicturesLabelComments") != undefined)
       	 sap.ui.getCore().byId("idCDASHM2RequestPicturesLabelComments").destroy();

        var oCDASHM2RequestPicturesValueComments = new sap.m.TextArea("idCDASHM2RequestPicturesValueComments",{
					    					placeholder : "Insert Comments here",
					    					height : "150px",
					    					width : "600px",
					    					enabled : true
					    					}).addStyleClass("commentsPanel");

        var oCDASHM2RequestPicturesLabelComments = new sap.m.Label("idCDASHM2RequestPicturesLabelComments",{
            text : "Email body : ",
            labelFor: oCDASHM2RequestPicturesValueComments,
            width : "180px"
            }).addStyleClass("selectionLabels");

        var oCDASHM2RequestPicturesFlexComments = new sap.m.FlexBox({
                                                       items: [oCDASHM2RequestPicturesLabelComments,
                                                               oCDASHM2RequestPicturesValueComments
                                                               ],
                                                       direction: "Row"
                                                       });*/

        var oCDASHM2RequestPicturesButtonSend = new sap.ui.commons.Button({
	          text : "Send",
	          styled:false,
	          visible:true,
	          type:sap.m.ButtonType.Unstyled,
	          //icon: sap.ui.core.IconPool.getIconURI("email"),
	          press:function(oEvent){
	        	  oCurrent.sendCDASHM2RequestPicturesFromDepot();
	          }
		}).addStyleClass("dashBtn marginTop10 floatRight");

        var oCDASHM2RequestPicturesFlexFinal = new sap.m.FlexBox({
            items: [
                    	//oCDASHM2RequestPicturesFlexTo,
                    	oCDASHM2RequestPicturesFlexSubject,
                    	oCDASHM2RequestPicturesFlexBody,
                    	oCDASHM2RequestPicturesButtonSend,
                    	//oCDASHM2RequestPicturesFlexComments
                    ],
            direction: "Column"
            });

        if(sap.ui.getCore().byId("idCDASHM2RequestPicturesPopover") != undefined)
       	 sap.ui.getCore().byId("idCDASHM2RequestPicturesPopover").destroy();

		 var oCDASHM2RequestPicturesPopover = new sap.m.Popover("idCDASHM2RequestPicturesPopover",{
            title: "Request Pictures from Depot",
            //modal: true,
            placement: sap.m.PlacementType.Right,
            /*footer:  new sap.m.Bar({

                                   contentRight: [
                                                 new sap.m.Button({
                                                                  text: "Send",
                                                                  icon: "sap-icon://email",
                                                                  press: function () {
                                                               	   oCurrent.sendCDASHM2RequestPicturesFromDepot();
                                                                  }
                                                                  }).addStyleClass("footerBtn")
                                                 ],
                                   }),*/
            content: new sap.m.VBox({
                                    //width:"300px",
                                    items:  [oCDASHM2RequestPicturesFlexFinal]
                                    }),

            }).addStyleClass("sapUiPopupWithPadding");

		 oCDASHM2RequestPicturesPopover.openBy(button);

	},

	/* CDASHM2 - Function - Send Request Pictures from Depot */

	sendCDASHM2RequestPicturesFromDepot : function(){

		//var toaddr = sap.ui.getCore().byId("idCDASHM2RequestPicturesValueTo").getValue();
		var body = sap.ui.getCore().byId("idCDASHM2RequestPicturesValueBody").getValue();
		body = encodeURIComponent(body);

		var subject = sap.ui.getCore().byId("idCDASHM2RequestPicturesValueSubject").getValue();
		//var comments = sap.ui.getCore().byId("idCDASHM2RequestPicturesValueComments").getValue();

		var urlToSap = "reqpicSet?$filter=IvRecipient eq '" + "" +
					   "' and IvSubject eq '" + subject +
					   "' and IvBody eq '" + body +
					   //"' and IvComments eq '" + comments +
					   "'";

        urlToSap = serviceDEP + urlToSap;

        oModel = new sap.ui.model.odata.ODataModel(serviceDEP, true);
        busyDialog.open();
        console.log(urlToSap);
        OData.request({
                      requestUri: urlToSap,
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

                      var alertResult = data.results;

                      if(alertResult.length == 0){
                    	  sap.ui.commons.MessageBox.alert("Sorry, there is an error");
                    	  console.log("Seaco DB Send Alert Successful; but returned nothing");
                      }else if(alertResult[0].Result == ''){
                    	  sap.ui.commons.MessageBox.alert("Sorry, there is an error");
                    	  console.log("Seaco DB Send Alert Successful; but returned nothing");
                      }else{
                    	  sap.ui.commons.MessageBox.alert("Email sent");
                    	  sap.ui.getCore().byId("idCDASHM2RequestPicturesPopover").close();
                    	  console.log("Seaco DB Send Alert Successful");

                    }
                    },
                  function(error){
                    	sap.ui.commons.MessageBox.alert("Sorry, there is an error");
                    	console.log("Seaco DB Send Alert Failure");
                	  busyDialog.close();
                  });
		},

		openCustContact : function(oEvent){
				 var serialno = global3SerialNo;
		       	 var Address = "";
		       	 var PostalCode = "";
		       	 var Country = "";
		       	 var Fax = "";
		       	 var Phone = "";
		       	 var Email = "";
		       	 var Contact = "";

		       	var urlToSap = "custcontactSet(IvSerial='" + serialno + "')";
		       	urlToSap = serviceDEP + urlToSap;
		       	oModel = new sap.ui.model.odata.ODataModel(serviceDEP, true);
		  	        busyDialog.open();
		  	        console.log(urlToSap);
		  	        OData.request({
		  	                      requestUri: urlToSap,
		  	                      method: "GET",
		  	                      dataType: 'json',
		  	                      async: false,
		  	                      headers:
		  	                      {
		  	                      "X-Requested-With": "XMLHttpRequest",
		  	                      "Content-Type": "application/json; charset=utf-8",
		  	                      "DataServiceVersion": "2.0",
		  	                      "X-CSRF-Token":"Fetch"
		  	                      }
		  	                      },
		  	                      function (data, response){
		  	                    	console.log("Get Contact Success");
			                    		 Address = data.Address;
				   	 	        	 PostalCode = data.PostalCode;
				   	 	        	 Country = data.Country;
				   	 	        	 Fax = data.Fax;
				   	 	        	 Phone = data.Phone;
				   	 	        	 Email = data.Email;
				   	 	        	 Contact = data.Contact;
		  	                        busyDialog.close();
		  	                    },
		  	                  function(error){
		  	                      sap.ui.commons.MessageBox.alert("Sorry, there is an error");
		  	                	  console.log("Get Contact Failure");
		  	                	  busyDialog.close();
		  	                  });


			 /* Address */

		 var oCDASHM2TableStatusMonitorDepotContactValueAddress = new sap.m.Label({
		                                               text : Address,
		                                               }).addStyleClass("selectionLabels");

		 var oCDASHM2TableStatusMonitorDepotContactLabelAddress = new sap.m.Label({
		     text : "Address : ",
		     labelFor: oCDASHM2TableStatusMonitorDepotContactValueAddress,
		     width : "100px"
		     }).addStyleClass("selectionLabels");

		 var oCDASHM2TableStatusMonitorDepotContactFlexAddress = new sap.m.FlexBox({
		                                                items: [oCDASHM2TableStatusMonitorDepotContactLabelAddress,
		                                                        oCDASHM2TableStatusMonitorDepotContactValueAddress
		                                                        ],
		                                                direction: "Row"
		                                                });



		 /* Country */

		 var oCDASHM2TableStatusMonitorDepotContactValueCountry = new sap.m.Label({
		                                               text : Country,
		                                               }).addStyleClass("selectionLabels");

		 var oCDASHM2TableStatusMonitorDepotContactLabelCountry = new sap.m.Label({
		     //text : "Country : ",
		     labelFor: oCDASHM2TableStatusMonitorDepotContactValueCountry,
		     width : "100px"
		     }).addStyleClass("selectionLabels");

		 var oCDASHM2TableStatusMonitorDepotContactFlexCountry = new sap.m.FlexBox({
		                                                items: [oCDASHM2TableStatusMonitorDepotContactLabelCountry,
		                                                        oCDASHM2TableStatusMonitorDepotContactValueCountry
		                                                        ],
		                                                direction: "Row"
		                                                });

		 /* Postal Code */

		 var oCDASHM2TableStatusMonitorDepotContactValuePostal = new sap.m.Label({
		                                               text : PostalCode,
		                                               }).addStyleClass("selectionLabels");

		 var oCDASHM2TableStatusMonitorDepotContactLabelPostal = new sap.m.Label({
		     text : "Postal Code : ",
		     labelFor: oCDASHM2TableStatusMonitorDepotContactValuePostal,
		     width : "100px"
		     }).addStyleClass("selectionLabels");

		 var oCDASHM2TableStatusMonitorDepotContactFlexPostal = new sap.m.FlexBox({
		                                                items: [oCDASHM2TableStatusMonitorDepotContactLabelPostal,
		                                                        oCDASHM2TableStatusMonitorDepotContactValuePostal
		                                                        ],
		                                                direction: "Row"
		                                                });

		 /* Fax */

		 var oCDASHM2TableStatusMonitorDepotContactValueFax = new sap.m.Label({
		                                               text : Fax,
		                                               }).addStyleClass("selectionLabels");

		 var oCDASHM2TableStatusMonitorDepotContactLabelFax = new sap.m.Label({
		     text : "Fax : ",
		     labelFor: oCDASHM2TableStatusMonitorDepotContactValueFax,
		     width : "100px"
		     }).addStyleClass("selectionLabels");

		 var oCDASHM2TableStatusMonitorDepotContactFlexFax = new sap.m.FlexBox({
		                                                items: [oCDASHM2TableStatusMonitorDepotContactLabelFax,
		                                                        oCDASHM2TableStatusMonitorDepotContactValueFax
		                                                        ],
		                                                direction: "Row"
		                                                });

		 /* Phone */

		 var oCDASHM2TableStatusMonitorDepotContactValuePhone = new sap.m.Label({
		                                               text : Phone,
		                                               }).addStyleClass("selectionLabels");

		 var oCDASHM2TableStatusMonitorDepotContactLabelPhone = new sap.m.Label({
		     text : "Phone : ",
		     labelFor: oCDASHM2TableStatusMonitorDepotContactValuePhone,
		     width : "100px"
		     }).addStyleClass("selectionLabels");

		 var oCDASHM2TableStatusMonitorDepotContactFlexPhone = new sap.m.FlexBox({
		                                                items: [oCDASHM2TableStatusMonitorDepotContactLabelPhone,
		                                                        oCDASHM2TableStatusMonitorDepotContactValuePhone
		                                                        ],
		                                                direction: "Row"
		                                                });

		 /* Mail ID */

		 var oCDASHM2TableStatusMonitorDepotContactValueMailid = new sap.m.Label({
		                                               text : Email,
		                                               }).addStyleClass("selectionLabels");

		 var oCDASHM2TableStatusMonitorDepotContactLabelMailid = new sap.m.Label({
		     text : "Mail : ",
		     labelFor: oCDASHM2TableStatusMonitorDepotContactValueMailid,
		     width : "100px"
		     }).addStyleClass("selectionLabels");

		 var oCDASHM2TableStatusMonitorDepotContactFlexMailid = new sap.m.FlexBox({
		                                                items: [oCDASHM2TableStatusMonitorDepotContactLabelMailid,
		                                                        oCDASHM2TableStatusMonitorDepotContactValueMailid
		                                                        ],
		                                                direction: "Row"
		                                                });

		 /* Contact */

		 var oCDASHM2TableStatusMonitorDepotContactValueContact = new sap.m.Label({
		                                               text : Contact,
		                                               }).addStyleClass("selectionLabels");

		 var oCDASHM2TableStatusMonitorDepotContactLabelContact = new sap.m.Label({
		     text : "Comments : ",
		     labelFor: oCDASHM2TableStatusMonitorDepotContactValueContact,
		     width : "100px"
		     }).addStyleClass("selectionLabels");

		 var oCDASHM2TableStatusMonitorDepotContactFlexContact = new sap.m.FlexBox({
		                                                items: [oCDASHM2TableStatusMonitorDepotContactLabelContact,
		                                                        oCDASHM2TableStatusMonitorDepotContactValueContact
		                                                        ],
		                                                direction: "Row"
		                                                });



		 var oCDASHM2TableStatusMonitorDepotContactFlex = new sap.m.FlexBox({
		     items: [//oCDASHM2TableStatusMonitorDepotContactFlexDepotName,
		             //oCDASHM2TableStatusMonitorDepotContactFlexLocation,
		             oCDASHM2TableStatusMonitorDepotContactFlexAddress,
		             oCDASHM2TableStatusMonitorDepotContactFlexCountry,
		             oCDASHM2TableStatusMonitorDepotContactFlexPostal,
		             oCDASHM2TableStatusMonitorDepotContactFlexFax,
		             oCDASHM2TableStatusMonitorDepotContactFlexPhone,
		             oCDASHM2TableStatusMonitorDepotContactFlexMailid,
		             oCDASHM2TableStatusMonitorDepotContactFlexContact
		             ],
		     direction: "Column"
		     });

		 if(sap.ui.getCore().byId("idCDASHM2TableStatusMonitorDepotContact") != undefined)
			 sap.ui.getCore().byId("idCDASHM2TableStatusMonitorDepotContact").destroy();

			 var oCDASHM2TableStatusMonitorDepotContact = new sap.m.Popover("idCDASHM2TableStatusMonitorDepotContact",{
		     title: "Customer Contact",
		     modal: false,
		     placement: sap.m.PlacementType.Right,
		     footer:  new sap.m.Bar({
		    	 					visible : false,
		                            contentRight: [
		                                          new sap.m.Button({
		                                                           text: "Close",
		                                                           icon: "sap-icon://close",
		                                                           press: function () {
		                                                        	   sap.ui.getCore().byId("idCDASHM2TableStatusMonitorDepotContact").close();
		                                                           }
		                                                           })
		                                          ],
		                            }),
		     content: new sap.m.VBox({
		                             //width:"300px",
		                             items:  [oCDASHM2TableStatusMonitorDepotContactFlex]
		                             }),

		     }).addStyleClass("sapUiPopupWithPadding");

			 oCDASHM2TableStatusMonitorDepotContact.openBy(oEvent.getSource());

		},

		openDepotContact : function(oEvent){
			 var depot = global3Depot;
	       	 var Address = "";
	       	 var PostalCode = "";
	       	 var Country = "";
	       	 var Fax = "";
	       	 var Phone = "";
	       	 var Email = "";
	       	 var Contact = "";

	       	var urlToSap = "depotcontactSet(IvDepot='" + depot + "')";
	       	urlToSap = serviceDEP + urlToSap;
	       	oModel = new sap.ui.model.odata.ODataModel(serviceDEP, true);
	  	        busyDialog.open();
	  	        console.log(urlToSap);
	  	        OData.request({
	  	                      requestUri: urlToSap,
	  	                      method: "GET",
	  	                      dataType: 'json',
	  	                      async: false,
	  	                      headers:
	  	                      {
	  	                      "X-Requested-With": "XMLHttpRequest",
	  	                      "Content-Type": "application/json; charset=utf-8",
	  	                      "DataServiceVersion": "2.0",
	  	                      "X-CSRF-Token":"Fetch"
	  	                      }
	  	                      },
	  	                      function (data, response){
	  	                    	console.log("Get Contact Success");
		                         Address = data.Address;
			   	 	        	 PostalCode = data.PostalCode;
			   	 	        	 Country = data.Country;
			   	 	        	 Fax = data.Fax;
			   	 	        	 Phone = data.Phone;
			   	 	        	 Email = data.Email;
			   	 	        	 Contact = data.Contact;
	  	                        busyDialog.close();
	  	                    },
	  	                  function(error){
	  	                      sap.ui.commons.MessageBox.alert("Sorry, there is an error");
	  	                	  console.log("Get Contact Failure");
	  	                	  busyDialog.close();
	  	                  });


		 /* Address */

	 var oCDASHM2TableStatusMonitorDepotContactValueAddress = new sap.m.Label({
	                                               text : Address,
	                                               }).addStyleClass("selectionLabels");

	 var oCDASHM2TableStatusMonitorDepotContactLabelAddress = new sap.m.Label({
	     text : "Address : ",
	     labelFor: oCDASHM2TableStatusMonitorDepotContactValueAddress,
	     width : "100px"
	     }).addStyleClass("selectionLabels");

	 var oCDASHM2TableStatusMonitorDepotContactFlexAddress = new sap.m.FlexBox({
	                                                items: [oCDASHM2TableStatusMonitorDepotContactLabelAddress,
	                                                        oCDASHM2TableStatusMonitorDepotContactValueAddress
	                                                        ],
	                                                direction: "Row"
	                                                });



	 /* Country */

	 var oCDASHM2TableStatusMonitorDepotContactValueCountry = new sap.m.Label({
	                                               text : Country,
	                                               }).addStyleClass("selectionLabels");

	 var oCDASHM2TableStatusMonitorDepotContactLabelCountry = new sap.m.Label({
	     //text : "Country : ",
	     labelFor: oCDASHM2TableStatusMonitorDepotContactValueCountry,
	     width : "100px"
	     }).addStyleClass("selectionLabels");

	 var oCDASHM2TableStatusMonitorDepotContactFlexCountry = new sap.m.FlexBox({
	                                                items: [oCDASHM2TableStatusMonitorDepotContactLabelCountry,
	                                                        oCDASHM2TableStatusMonitorDepotContactValueCountry
	                                                        ],
	                                                direction: "Row"
	                                                });

	 /* Postal Code */

	 var oCDASHM2TableStatusMonitorDepotContactValuePostal = new sap.m.Label({
	                                               text : PostalCode,
	                                               }).addStyleClass("selectionLabels");

	 var oCDASHM2TableStatusMonitorDepotContactLabelPostal = new sap.m.Label({
	     text : "Postal Code : ",
	     labelFor: oCDASHM2TableStatusMonitorDepotContactValuePostal,
	     width : "100px"
	     }).addStyleClass("selectionLabels");

	 var oCDASHM2TableStatusMonitorDepotContactFlexPostal = new sap.m.FlexBox({
	                                                items: [oCDASHM2TableStatusMonitorDepotContactLabelPostal,
	                                                        oCDASHM2TableStatusMonitorDepotContactValuePostal
	                                                        ],
	                                                direction: "Row"
	                                                });

	 /* Fax */

	 var oCDASHM2TableStatusMonitorDepotContactValueFax = new sap.m.Label({
	                                               text : Fax,
	                                               }).addStyleClass("selectionLabels");

	 var oCDASHM2TableStatusMonitorDepotContactLabelFax = new sap.m.Label({
	     text : "Fax : ",
	     labelFor: oCDASHM2TableStatusMonitorDepotContactValueFax,
	     width : "100px"
	     }).addStyleClass("selectionLabels");

	 var oCDASHM2TableStatusMonitorDepotContactFlexFax = new sap.m.FlexBox({
	                                                items: [oCDASHM2TableStatusMonitorDepotContactLabelFax,
	                                                        oCDASHM2TableStatusMonitorDepotContactValueFax
	                                                        ],
	                                                direction: "Row"
	                                                });

	 /* Phone */

	 var oCDASHM2TableStatusMonitorDepotContactValuePhone = new sap.m.Label({
	                                               text : Phone,
	                                               }).addStyleClass("selectionLabels");

	 var oCDASHM2TableStatusMonitorDepotContactLabelPhone = new sap.m.Label({
	     text : "Phone : ",
	     labelFor: oCDASHM2TableStatusMonitorDepotContactValuePhone,
	     width : "100px"
	     }).addStyleClass("selectionLabels");

	 var oCDASHM2TableStatusMonitorDepotContactFlexPhone = new sap.m.FlexBox({
	                                                items: [oCDASHM2TableStatusMonitorDepotContactLabelPhone,
	                                                        oCDASHM2TableStatusMonitorDepotContactValuePhone
	                                                        ],
	                                                direction: "Row"
	                                                });

	 /* Mail ID */

	 var oCDASHM2TableStatusMonitorDepotContactValueMailid = new sap.m.Label({
	                                               text : Email,
	                                               }).addStyleClass("selectionLabels");

	 var oCDASHM2TableStatusMonitorDepotContactLabelMailid = new sap.m.Label({
	     text : "Mail : ",
	     labelFor: oCDASHM2TableStatusMonitorDepotContactValueMailid,
	     width : "100px"
	     }).addStyleClass("selectionLabels");

	 var oCDASHM2TableStatusMonitorDepotContactFlexMailid = new sap.m.FlexBox({
	                                                items: [oCDASHM2TableStatusMonitorDepotContactLabelMailid,
	                                                        oCDASHM2TableStatusMonitorDepotContactValueMailid
	                                                        ],
	                                                direction: "Row"
	                                                });

	 /* Contact */

	 var oCDASHM2TableStatusMonitorDepotContactValueContact = new sap.m.Label({
	                                               text : Contact,
	                                               }).addStyleClass("selectionLabels");

	 var oCDASHM2TableStatusMonitorDepotContactLabelContact = new sap.m.Label({
	     text : "Comments : ",
	     labelFor: oCDASHM2TableStatusMonitorDepotContactValueContact,
	     width : "100px"
	     }).addStyleClass("selectionLabels");

	 var oCDASHM2TableStatusMonitorDepotContactFlexContact = new sap.m.FlexBox({
	                                                items: [oCDASHM2TableStatusMonitorDepotContactLabelContact,
	                                                        oCDASHM2TableStatusMonitorDepotContactValueContact
	                                                        ],
	                                                direction: "Row"
	                                                });



	 var oCDASHM2TableStatusMonitorDepotContactFlex = new sap.m.FlexBox({
	     items: [//oCDASHM2TableStatusMonitorDepotContactFlexDepotName,
	             //oCDASHM2TableStatusMonitorDepotContactFlexLocation,
	             oCDASHM2TableStatusMonitorDepotContactFlexAddress,
	             oCDASHM2TableStatusMonitorDepotContactFlexCountry,
	             oCDASHM2TableStatusMonitorDepotContactFlexPostal,
	             oCDASHM2TableStatusMonitorDepotContactFlexFax,
	             oCDASHM2TableStatusMonitorDepotContactFlexPhone,
	             oCDASHM2TableStatusMonitorDepotContactFlexMailid,
	             oCDASHM2TableStatusMonitorDepotContactFlexContact
	             ],
	     direction: "Column"
	     });

		 if(sap.ui.getCore().byId("idCDASHM2TableStatusMonitorDepotContact") != undefined)
			 sap.ui.getCore().byId("idCDASHM2TableStatusMonitorDepotContact").destroy();

			 var oCDASHM2TableStatusMonitorDepotContact = new sap.m.Popover("idCDASHM2TableStatusMonitorDepotContact",{
		     title: "Depot Contact",
		     modal: false,
		     placement: sap.m.PlacementType.Right,
		     footer:  new sap.m.Bar({
		    	 					visible : false,
		                            contentRight: [
		                                          new sap.m.Button({
		                                                           text: "Close",
		                                                           icon: "sap-icon://close",
		                                                           press: function () {
		                                                        	   sap.ui.getCore().byId("idCDASHM2TableStatusMonitorDepotContact").close();
		                                                           }
		                                                           })
		                                          ],
		                            }),
		     content: new sap.m.VBox({
		                             //width:"300px",
		                             items:  [oCDASHM2TableStatusMonitorDepotContactFlex]
		                             }),

		     }).addStyleClass("sapUiPopupWithPadding");

			 oCDASHM2TableStatusMonitorDepotContact.openBy(oEvent.getSource());

		},

		openCustBilling : function(oEvent){
			 var serialno = global3SerialNo;
	       	 var BillingNo = "";
	       	 var BillDate = "";
	       	 var Amount = "";
	       	 var DocCurrency = "";


	       	var urlToSap = "custbillingSet(IvSernr='" + serialno + "',IvRa='" + "7007889" + "')";
	       	urlToSap = serviceDEP + urlToSap;
	       	oModel = new sap.ui.model.odata.ODataModel(serviceDEP, true);
	  	        busyDialog.open();
	  	        console.log(urlToSap);
	  	        OData.request({
	  	                      requestUri: urlToSap,
	  	                      method: "GET",
	  	                      dataType: 'json',
	  	                      async: false,
	  	                      headers:
	  	                      {
	  	                      "X-Requested-With": "XMLHttpRequest",
	  	                      "Content-Type": "application/json; charset=utf-8",
	  	                      "DataServiceVersion": "2.0",
	  	                      "X-CSRF-Token":"Fetch"
	  	                      }
	  	                      },
	  	                      function (data, response){
	  	                    	console.log("Get Billing Success");
	  	                    	BillingNo = data.BillingNo;
	  	                    	BillDate = data.BillDate;
	  	                    	Amount = data.Amount;
	  	                    	DocCurrency = data.DocCurrency;
	  	                        busyDialog.close();
	  	                    },
	  	                  function(error){
	  	                      sap.ui.commons.MessageBox.alert("Sorry, there is an error");
	  	                	  console.log("Get Billing Failure");
	  	                	  busyDialog.close();
	  	                  });


	/* Billing No */

	 var oCDASHM2TableStatusMonitorDepotBillingValueBillingNo = new sap.m.Label({
	                                               text : BillingNo,
	                                               }).addStyleClass("selectionLabels");

	 var oCDASHM2TableStatusMonitorDepotBillingLabelBillingNo = new sap.m.Label({
	     text : "Billing No. : ",
	     labelFor: oCDASHM2TableStatusMonitorDepotBillingValueBillingNo,
	     width : "180px"
	     }).addStyleClass("selectionLabels");

	 var oCDASHM2TableStatusMonitorDepotBillingFlexBillingNo = new sap.m.FlexBox({
	                                                items: [oCDASHM2TableStatusMonitorDepotBillingLabelBillingNo,
	                                                        oCDASHM2TableStatusMonitorDepotBillingValueBillingNo
	                                                        ],
	                                                direction: "Row"
	                                                });



	 /* BillDate */

	 var oCDASHM2TableStatusMonitorDepotBillingValueBillDate = new sap.m.Label({
	                                               text : BillDate,
	                                               }).addStyleClass("selectionLabels");

	 var oCDASHM2TableStatusMonitorDepotBillingLabelBillDate = new sap.m.Label({
	     text : "Bill Date : ",
	     labelFor: oCDASHM2TableStatusMonitorDepotBillingValueBillDate,
	     width : "180px"
	     }).addStyleClass("selectionLabels");

	 var oCDASHM2TableStatusMonitorDepotBillingFlexBillDate = new sap.m.FlexBox({
	                                                items: [oCDASHM2TableStatusMonitorDepotBillingLabelBillDate,
	                                                        oCDASHM2TableStatusMonitorDepotBillingValueBillDate
	                                                        ],
	                                                direction: "Row"
	                                                });


	 /* Amount */

	 var oCDASHM2TableStatusMonitorDepotBillingValueAmount = new sap.m.Label({
	                                               text : Amount,
	                                               }).addStyleClass("selectionLabels");

	 var oCDASHM2TableStatusMonitorDepotBillingLabelAmount = new sap.m.Label({
	     text : "Amount : ",
	     labelFor: oCDASHM2TableStatusMonitorDepotBillingValueAmount,
	     width : "180px"
	     }).addStyleClass("selectionLabels");

	 var oCDASHM2TableStatusMonitorDepotBillingFlexAmount = new sap.m.FlexBox({
	                                                items: [oCDASHM2TableStatusMonitorDepotBillingLabelAmount,
	                                                        oCDASHM2TableStatusMonitorDepotBillingValueAmount
	                                                        ],
	                                                direction: "Row"
	                                                });

	 /* DocCurrency */

	 var oCDASHM2TableStatusMonitorDepotBillingValueDocCurrency = new sap.m.Label({
	                                               text : DocCurrency,
	                                               }).addStyleClass("selectionLabels");

	 var oCDASHM2TableStatusMonitorDepotBillingLabelDocCurrency = new sap.m.Label({
	     text : "Doc. Currency : ",
	     labelFor: oCDASHM2TableStatusMonitorDepotBillingValueDocCurrency,
	     width : "180px"
	     }).addStyleClass("selectionLabels");

	 var oCDASHM2TableStatusMonitorDepotBillingFlexDocCurrency = new sap.m.FlexBox({
	                                                items: [oCDASHM2TableStatusMonitorDepotBillingLabelDocCurrency,
	                                                        oCDASHM2TableStatusMonitorDepotBillingValueDocCurrency
	                                                        ],
	                                                direction: "Row"
	                                                });



	 var oCDASHM2TableStatusMonitorDepotBillingFlex = new sap.m.FlexBox({
	     items: [
	             oCDASHM2TableStatusMonitorDepotBillingFlexBillingNo,
	             oCDASHM2TableStatusMonitorDepotBillingFlexBillDate,
	             oCDASHM2TableStatusMonitorDepotBillingFlexAmount,
	             oCDASHM2TableStatusMonitorDepotBillingFlexDocCurrency
	             ],
	     direction: "Column"
	     });

		 if(sap.ui.getCore().byId("idCDASHM2TableStatusMonitorDepotBilling") != undefined)
			 sap.ui.getCore().byId("idCDASHM2TableStatusMonitorDepotBilling").destroy();

			 var oCDASHM2TableStatusMonitorDepotBilling = new sap.m.Popover("idCDASHM2TableStatusMonitorDepotBilling",{
		     title: "Customer Billing",
		     modal: false,
		     placement: sap.m.PlacementType.Right,
		     footer:  new sap.m.Bar({
		    	 					visible : false,
		                            contentRight: [
		                                          new sap.m.Button({
		                                                           text: "Close",
		                                                           icon: "sap-icon://close",
		                                                           press: function () {
		                                                        	   sap.ui.getCore().byId("idCDASHM2TableStatusMonitorDepotBilling").close();
		                                                           }
		                                                           })
		                                          ],
		                            }),
		     content: new sap.m.VBox({
		                             //width:"300px",
		                             items:  [oCDASHM2TableStatusMonitorDepotBillingFlex]
		                             }),

		     }).addStyleClass("sapUiPopupWithPadding");

			 oCDASHM2TableStatusMonitorDepotBilling.openBy(oEvent.getSource());

		},

		openDepotPayment : function(oEvent){
			 	   var estimateno = global3EstimateNo;
	       	 var BillingNo = "";
	       	 var BillDate = "";
	       	 var Amount = "";
	       	 var DocCurrency = "";


	       	var urlToSap = "depotpaymentSet(IvEstimate='" + estimateno + "')";
	       	urlToSap = serviceDEP + urlToSap;
	       	oModel = new sap.ui.model.odata.ODataModel(serviceDEP, true);
	  	        busyDialog.open();
	  	        console.log(urlToSap);
	  	        OData.request({
	  	                      requestUri: urlToSap,
	  	                      method: "GET",
	  	                      dataType: 'json',
	  	                      async: false,
	  	                      headers:
	  	                      {
	  	                      "X-Requested-With": "XMLHttpRequest",
	  	                      "Content-Type": "application/json; charset=utf-8",
	  	                      "DataServiceVersion": "2.0",
	  	                      "X-CSRF-Token":"Fetch"
	  	                      }
	  	                      },
	  	                      function (data, response){
	  	                    	console.log("Get Billing Success");
	  	                    	BillingNo = data.Po;
	  	                    	BillDate = data.InvoiceDate;
	  	                    	Amount = data.InvoiceAmount;
	  	                    	DocCurrency = data.InvoiceCurrency;
	  	                        busyDialog.close();
	  	                    },
	  	                  function(error){
	  	                      sap.ui.commons.MessageBox.alert("Sorry, there is an error");
	  	                	  console.log("Get Billing Failure");
	  	                	  busyDialog.close();
	  	                  });


	/* Billing No */

	 var oCDASHM2TableStatusMonitorDepotBillingValueBillingNo = new sap.m.Label({
	                                               text : BillingNo,
	                                               }).addStyleClass("selectionLabels");

	 var oCDASHM2TableStatusMonitorDepotBillingLabelBillingNo = new sap.m.Label({
	     text : "PO No. : ",
	     labelFor: oCDASHM2TableStatusMonitorDepotBillingValueBillingNo,
	     width : "180px"
	     }).addStyleClass("selectionLabels");

	 var oCDASHM2TableStatusMonitorDepotBillingFlexBillingNo = new sap.m.FlexBox({
	                                                items: [oCDASHM2TableStatusMonitorDepotBillingLabelBillingNo,
	                                                        oCDASHM2TableStatusMonitorDepotBillingValueBillingNo
	                                                        ],
	                                                direction: "Row"
	                                                });



	 /* BillDate */

	 var oCDASHM2TableStatusMonitorDepotBillingValueBillDate = new sap.m.Label({
	                                               text : BillDate,
	                                               }).addStyleClass("selectionLabels");

	 var oCDASHM2TableStatusMonitorDepotBillingLabelBillDate = new sap.m.Label({
	     text : "Invoice Date : ",
	     labelFor: oCDASHM2TableStatusMonitorDepotBillingValueBillDate,
	     width : "180px"
	     }).addStyleClass("selectionLabels");

	 var oCDASHM2TableStatusMonitorDepotBillingFlexBillDate = new sap.m.FlexBox({
	                                                items: [oCDASHM2TableStatusMonitorDepotBillingLabelBillDate,
	                                                        oCDASHM2TableStatusMonitorDepotBillingValueBillDate
	                                                        ],
	                                                direction: "Row"
	                                                });


	 /* Amount */

	 var oCDASHM2TableStatusMonitorDepotBillingValueAmount = new sap.m.Label({
	                                               text : Amount,
	                                               }).addStyleClass("selectionLabels");

	 var oCDASHM2TableStatusMonitorDepotBillingLabelAmount = new sap.m.Label({
	     text : "Amount : ",
	     labelFor: oCDASHM2TableStatusMonitorDepotBillingValueAmount,
	     width : "180px"
	     }).addStyleClass("selectionLabels");

	 var oCDASHM2TableStatusMonitorDepotBillingFlexAmount = new sap.m.FlexBox({
	                                                items: [oCDASHM2TableStatusMonitorDepotBillingLabelAmount,
	                                                        oCDASHM2TableStatusMonitorDepotBillingValueAmount
	                                                        ],
	                                                direction: "Row"
	                                                });

	 /* DocCurrency */

	 var oCDASHM2TableStatusMonitorDepotBillingValueDocCurrency = new sap.m.Label({
	                                               text : DocCurrency,
	                                               }).addStyleClass("selectionLabels");

	 var oCDASHM2TableStatusMonitorDepotBillingLabelDocCurrency = new sap.m.Label({
	     text : "Currency : ",
	     labelFor: oCDASHM2TableStatusMonitorDepotBillingValueDocCurrency,
	     width : "180px"
	     }).addStyleClass("selectionLabels");

	 var oCDASHM2TableStatusMonitorDepotBillingFlexDocCurrency = new sap.m.FlexBox({
	                                                items: [oCDASHM2TableStatusMonitorDepotBillingLabelDocCurrency,
	                                                        oCDASHM2TableStatusMonitorDepotBillingValueDocCurrency
	                                                        ],
	                                                direction: "Row"
	                                                });



	 var oCDASHM2TableStatusMonitorDepotBillingFlex = new sap.m.FlexBox({
	     items: [
	             oCDASHM2TableStatusMonitorDepotBillingFlexBillingNo,
	             oCDASHM2TableStatusMonitorDepotBillingFlexBillDate,
	             oCDASHM2TableStatusMonitorDepotBillingFlexAmount,
	             oCDASHM2TableStatusMonitorDepotBillingFlexDocCurrency
	             ],
	     direction: "Column"
	     });

		 if(sap.ui.getCore().byId("idCDASHM2TableStatusMonitorDepotBilling") != undefined)
			 sap.ui.getCore().byId("idCDASHM2TableStatusMonitorDepotBilling").destroy();

			 var oCDASHM2TableStatusMonitorDepotBilling = new sap.m.Popover("idCDASHM2TableStatusMonitorDepotBilling",{
		     title: "Depot Billing",
		     modal: false,
		     placement: sap.m.PlacementType.Right,
		     footer:  new sap.m.Bar({
		    	 					visible : false,
		                            contentRight: [
		                                          new sap.m.Button({
		                                                           text: "Close",
		                                                           icon: "sap-icon://close",
		                                                           press: function () {
		                                                        	   sap.ui.getCore().byId("idCDASHM2TableStatusMonitorDepotBilling").close();
		                                                           }
		                                                           })
		                                          ],
		                            }),
		     content: new sap.m.VBox({
		                             //width:"300px",
		                             items:  [oCDASHM2TableStatusMonitorDepotBillingFlex]
		                             }),

		     }).addStyleClass("sapUiPopupWithPadding");

			 oCDASHM2TableStatusMonitorDepotBilling.openBy(oEvent.getSource());

		},

		/* CDASHM1 - Function - Open PopUp CS Approve */

		openCSApprove : function(oCDASHM1ContentCSApprove, page){

	       if(sap.ui.getCore().byId("idCDASHM1ButtonCSApproveApprove") != undefined)
	        	 sap.ui.getCore().byId("idCDASHM1ButtonCSApproveApprove").destroy();

	       if(sap.ui.getCore().byId("idCDASHM1ButtonCSApproveClose") != undefined)
	      	 sap.ui.getCore().byId("idCDASHM1ButtonCSApproveClose").destroy();



			var oCurrent = this;


	      var oCDASHM1ButtonCSApproveApprove = new sap.ui.commons.Button("idCDASHM1ButtonCSApproveApprove",{
		          text : "Approve",
		          styled:false,
		          visible:true,
		          type:sap.m.ButtonType.Unstyled,
		          //icon: sap.ui.core.IconPool.getIconURI("email"),
		          press:function(oEvent){
		        	  oCurrent.ApproveCSApprove();
		          }
			}).addStyleClass("dashBtn marginTop10 floatRight");

	      var oCDASHM1ButtonCSApproveClose = new sap.ui.commons.Button("idCDASHM1ButtonCSApproveClose",{
	          text : "Close",
	          styled:false,
	          visible:true,
	          type:sap.m.ButtonType.Unstyled,
	          //icon: sap.ui.core.IconPool.getIconURI("email"),
	          press:function(oEvent){
	        	  sap.ui.getCore().byId("idCDASHM1PopoverCSApprove").close();
	          }
		}).addStyleClass("dashBtn marginTop10 floatRight");

	      /* CDASHM1 - Flexbox - Additional Estimate Buttons*/

			var oCDASHM1FlexCSApproveButtons = new sap.m.FlexBox({
			         items: [
			                oCDASHM1ButtonCSApproveApprove,
			                new sap.m.Label({width : "15px"}),
			                oCDASHM1ButtonCSApproveClose
			       ],
			       direction : "Row",
			       visible: true
			});


			/* CDASHM1 - Flexbox - Additional Estimate Tables and Buttons*/

			var oCDASHM1FlexCSApprovePopup = new sap.m.FlexBox({
			         items: [
			                oCDASHM1ContentCSApprove,
			                new sap.m.Label({width : "15px"}),
			                oCDASHM1FlexCSApproveButtons
			       ],
			       direction : "Column",
			       visible: true
			});

			/* CDASHM1 - Popover - Additional Estimate */

			if(sap.ui.getCore().byId("idCDASHM1PopoverCSApprove") != undefined)
	        	 sap.ui.getCore().byId("idCDASHM1PopoverCSApprove").destroy();

			var oCDASHM1PopoverCSApprove = new sap.m.Popover("idCDASHM1PopoverCSApprove",{
		        title: "Approve",
		        width:"1300px",
		          modal: true,
		          placement: sap.m.PlacementType.Right,
		          footer:  new sap.m.Bar({
		         	 					visible : false,
		                                 contentRight: [
		                                               new sap.m.Button({
		                                                                text: "Close",
		                                                                icon: "sap-icon://close",
		                                                                press: function () {

		                                                                }
		                                                                })
		                                               ],
		                                 }),
		          content: new sap.m.VBox({
		                                  //width:"300px",
		                                  items:  [oCDASHM1FlexCSApprovePopup]
		                                  }),

		          }).addStyleClass("sapUiPopupWithPadding");

		    	oCDASHM1PopoverCSApprove.openBy(sap.ui.getCore().byId("idCDASHM2ButtonEquipmentLevelCSApproval"));


		},

		/* CDASHM1 - Function - Approve CS Approve */

		ApproveCSApprove : function(){

			var oCurrent = this;
			var stringToPass = "";
			var stringCount = 1;
			var oCurrent = this;
			for(var i =0; i < oCDASHM1JsonCSApprove.length; i++){
				if(stringToPass == ""){
					stringToPass = stringToPass + "ILessee" + stringCount + " eq '" + oCDASHM1JsonCSApprove[i].serialno + "$" +
					oCDASHM1JsonCSApprove[i].depot + "$" +
					new Date().format("yyyymmdd") + "$" +
					oCDASHM1JsonCSApprove[i].appref  + "$" +
					"" + "$" + // Approver Name
					"" + "'";	// Approval Amount - Calculated from CRM
				}
				else{
					stringToPass = stringToPass + " and ILessee" + stringCount + " eq '" + oCDASHM1JsonCSApprove[i].serialno + "$" +
					oCDASHM1JsonCSApprove[i].depot + "$" +
					new Date().format("yyyymmdd") + "$" +
					oCDASHM1JsonCSApprove[i].appref  + "$" +
					"" + "$" + // Approver Name
					"" + "'"; // Approval Amount - Calculated from CRM
				}
				stringCount++;
			}



			var urlToSap = "CSApproveSet?$filter=" + stringToPass;

			urlToSap = serviceDEP + urlToSap;
			oModel = new sap.ui.model.odata.ODataModel(serviceDEP,true);
			busyDialog.open();
			console.log(urlToSap);
			OData.request(
					{
						requestUri : urlToSap,
						method : "GET",
						dataType : 'json',
						//async : false,
						headers : {
							"X-Requested-With" : "XMLHttpRequest",
							"Content-Type" : "application/json; charset=utf-8",
							"DataServiceVersion" : "2.0",
							"X-CSRF-Token" : "Fetch"
						}
					},
					function(data, response) {
						var CSApproveResult = data.results;

	                    if(CSApproveResult.length == 0){
	                  	  sap.ui.commons.MessageBox.alert("Sorry, there is an error");
	                  	  console.log("CS Approve Failure");
	                    }else{
	                  	  //sap.ui.commons.MessageBox.alert("Approved");
	                  	  //sap.ui.getCore().byId("idCDASHM1PopoverCSApprove").close();
												for(var i=0; i<CSApproveResult.length; i++){
													for(j=0;j<oCDASHM1JsonCSApprove.length;j++){
															if(oCDASHM1JsonCSApprove[j].serialno == CSApproveResult[i].Equipment){
																 oCDASHM1JsonCSApprove[j].message = CSApproveResult[i].Status;
															}
													}
	                      }
	                      oCDASHM1ModelCSApprove.updateBindings();
												oCurrent.setValueHeaderDetails(globalisFromSerialHistory, globalisProcessChange);
												sap.ui.getCore().byId("idCDASHM2ButtonEquipmentLevelCSApproval").setVisible(false);
	                  	  console.log("CS Approve Successful");
												busyDialog.close();
	                  }
					},
					function(error) {

						sap.ui.commons.MessageBox.alert("Sorry, there is an error");
						console.log("CS Submission Failure");
						//busyDialog.close();
					});
		},

	/* CDASHM1 - Function - Set CS Approve Popup content */

		setCSApproveInitial : function(page){

			oCDASHM1JsonCSApprove = [];
			var oCurrent = this;

			if(page == 2){
			var arraySelLines = sap.ui.getCore().byId("idCDASHM1TableEquipmentLevel").getSelectedIndices();
			for(var i=0; i<oCDASHMJsonEquipmentLevel.length; i++){
	  			if(arraySelLines.indexOf(i) != -1){
						var oDetData = sap.ui.getCore().byId("idCDASHM1TableEquipmentLevel").getContextByIndex(i);
						if(oDetData != undefined){
							var realPath = oDetData.getPath().split('/')[2];
							oCDASHM1JsonCSApprove.push({
								serialno : oCDASHMJsonEquipmentLevel[realPath].serialno,
								estimateno : oCDASHMJsonEquipmentLevel[realPath].estimateno,
								depot : oCDASHMJsonEquipmentLevel[realPath].depotcode,
								equnr : oCDASHMJsonEquipmentLevel[realPath].equnr,
								appref : "",
								message : ""
							});
						}
	  			}
	  		}
			}else if(page == 3){
				oCDASHM1JsonCSApprove.push({
					serialno : global3SerialNo,
					estimateno : "",
					depot : global3Depot,
					equnr : global3SerialNo,
					appref : "",
					message : ""
				});
	  		}

			/* CDASHM1 - Table - CS Approve */

			var oCDASHM1TableCSApprove = new sap.ui.table.Table({
	     		 visibleRowCount: 4,
	     		 width: '620px',
	     		 showNoData: false,
	             selectionMode: sap.ui.table.SelectionMode.None,
			}).addStyleClass("sapUiSizeCompact tblBorder");

			oCDASHM1TableCSApprove.addColumn(new sap.ui.table.Column({
	            label: new sap.ui.commons.Label({text: "Serial No.", textAlign: "Left"}).addStyleClass("wraptextcol"),
				 template: new sap.ui.commons.TextView({
				 }).bindProperty("text", "serialno").addStyleClass("borderStyle1"),
		           resizable:false,
		           width:"120px"
				 }));

			oCDASHM1TableCSApprove.addColumn(new sap.ui.table.Column({
	            label: new sap.ui.commons.Label({text: "Reference", textAlign: "Left"}).addStyleClass("wraptextcol"),
				 template: new sap.ui.commons.TextField({
				 }).bindProperty("value", "appref").addStyleClass("borderStyle referenceinput"),
		           resizable:false,
		           width:"200px"
				 }));

			oCDASHM1TableCSApprove.addColumn(new sap.ui.table.Column({
	            label: new sap.ui.commons.Label({text: "Result", textAlign: "Left"}).addStyleClass("wraptextcol"),
				 template: new sap.ui.commons.TextView({
				 }).bindProperty("text", "message").addStyleClass("borderStyle1"),
		           resizable:false,
		           width:"100px"
				 }));


			oCDASHM1ModelCSApprove.setData({modelData: oCDASHM1JsonCSApprove});

	      	oCDASHM1TableCSApprove.setModel(oCDASHM1ModelCSApprove);
	      	oCDASHM1TableCSApprove.bindRows("/modelData");

	      	var oCDASHM1JsonCSApproveLength = oCDASHM1JsonCSApprove.length;
	      	if(oCDASHM1JsonCSApproveLength < 11){
	      		oCDASHM1TableCSApprove.setVisibleRowCount(oCDASHM1JsonCSApproveLength);
	      		oCDASHM1TableCSApprove.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
	      	}
	      	else{
	      		oCDASHM1TableCSApprove.setVisibleRowCount(10);
	      		oCDASHM1TableCSApprove.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
	      	}

	      	return oCDASHM1TableCSApprove;
		},

		downloadCDASHM2Excel : function(){

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
				htmlTable += '<tr style="height:75px;border=1;padding-bottom:10px">'+
				'<td align=center colspan='+ (tableWidth - 12) +' style="padding-left:10px;font:bold 14px Arial;"><u>' + "Unit Overview for Serial No. " + ' for <b><FONT COLOR="RED">' + global3SerialNo +' </FONT></b> in depot <b><FONT COLOR="RED">'+ global3Depot + '</FONT></b></u></td>'+
				'<td style="border:none; padding:5px 5px 5px 0px" colspan=2 align ="right"><img src="' + base + 'images/login/login_logo.png"></img></td></tr>';

				htmlTable += '<tr  style="border:none;height:20px;"></tr>';
		       	htmlTable += '<td valign="top" colspan='+ (4) +' style="padding-left:10px;">';


				htmlTable += '<br>';
				htmlTable += '<br>';

				/* Record Type and Record Details Table */
				var oCDASHM2JsonRecordLinesLoc = [];
				for(var i=0; i<oCDASHM2JsonRecordLines.length; i++){

					var processvalue = "";
					for(var j=0; j<oCDASHM2JsonProcesses.length;j++){
							if(oCDASHM2JsonProcesses[j].key == oCDASHM2JsonRecordLines[i].value1){
								processvalue = oCDASHM2JsonProcesses[j].text;
								console.log(processvalue)
							}
						}

					oCDASHM2JsonRecordLinesLoc.push({
						label1 : oCDASHM2JsonRecordLines[i].label1,
						value1 : processvalue,
						label2 : oCDASHM2JsonRecordLines[i].label2,
						value2 : oCDASHM2JsonRecordLines[i].value2
						// label3 : oCDASHM2JsonRecordLines[i].label3,
						// value3 : oCDASHM2JsonRecordLines[i].value3,
						// label4 : oCDASHM2JsonRecordLines[i].label4,
						// value4 : oCDASHM2JsonRecordLines[i].value4
					});
				}
				htmlTable += '<div><b><u>Overview</u></b></div>';
				htmlTable += '<br></br>';
				htmlTable += '<table align=left border=1 cellspacing=0 style="color:#656465;padding-left:0px;">';

				$.each(oCDASHM2JsonRecordLinesLoc, function(i, item) {
				htmlTable += "<tr>";
				for (var key in item){
				htmlTable += '<td align=center style="font: 12px Arial;">'+item[key]+"</td>";
				}
				htmlTable += "</tr>";
				});
				htmlTable += '</table>';

				htmlTable += '<br></br>';
				htmlTable += '<br></br>';
				htmlTable += '<br></br>';
				htmlTable += '<br></br>';
				htmlTable += '<br></br>';
				htmlTable += '<br></br>';

				/* M&R Summary table */

				htmlTable += '<div><b><u>M&R Summary</u></b></div>';
				htmlTable += '<br></br>';
				htmlTable += '<table align=left border=1 cellspacing=0 style="color:#656465;padding-left:0px;">';

				$.each(oCDASHM2JsonHeaderLines, function(i, item) {
				htmlTable += "<tr>";
				for (var key in item){
				htmlTable += '<td align=center style="font: 12px Arial;">'+item[key]+"</td>";
				}
				htmlTable += "</tr>";
				});
				htmlTable += '</table>';

				htmlTable += '<br></br>';
				htmlTable += '<br></br>';
				htmlTable += '<br></br>';
				htmlTable += '<br></br>';
				htmlTable += '<br></br>';
				htmlTable += '<br></br>';

				/* Estimate Details table */

				htmlTable += '<div><b><u>Estimate Details</u></b></div>';
				htmlTable += '<br></br>';
				htmlTable += '<table align=left border=1 cellspacing=0 style="color:#656465;padding-left:0px;">';


				var oCDASHM2JsonEstimateLinesPrint = [];
				for(var i=0;i<oCDASHM2JsonEstimateLines.length;i++){
					oCDASHM2JsonEstimateLinesPrint.push({
						"S. No" : (oCDASHM2JsonEstimateLines[i].sno != "")?parseInt(oCDASHM2JsonEstimateLines[i].sno):"",
						"Location" : oCDASHM2JsonEstimateLines[i].location,
						"Location Text" : oCDASHM2JsonEstimateLines[i].locationt,
						"Component" : oCDASHM2JsonEstimateLines[i].component,
						"Component Text" : oCDASHM2JsonEstimateLines[i].componentt,
						"Damage" : oCDASHM2JsonEstimateLines[i].damage,
						"Damage Text" : oCDASHM2JsonEstimateLines[i].damaget,
						"Material" : oCDASHM2JsonEstimateLines[i].material,
						"Material Text" : oCDASHM2JsonEstimateLines[i].materialt,
						"Repair" : oCDASHM2JsonEstimateLines[i].repair,
						"Repair Text" : oCDASHM2JsonEstimateLines[i].repairt,
						"Length" : oCDASHM2JsonEstimateLines[i].length,
						"Width" : oCDASHM2JsonEstimateLines[i].width,
						"Measure" : oCDASHM2JsonEstimateLines[i].measure,
						"Quantity" : oCDASHM2JsonEstimateLines[i].qty,
						"Hours" : oCDASHM2JsonEstimateLines[i].hrs,
						"Mat. Cost" : oCDASHM2JsonEstimateLines[i].matcost,
						"Reponsibility" : oCDASHM2JsonEstimateLines[i].resp,
						"Lab. Cost" : oCDASHM2JsonEstimateLines[i].labcost,
						"Bulletin" : oCDASHM2JsonEstimateLines[i].bulletin,
						"Total" : oCDASHM2JsonEstimateLines[i].total
					});
				}

				htmlTable += "<tr>";
				for (var key in oCDASHM2JsonEstimateLinesPrint[0]){
				//alert("key : "+ key);
				htmlTable += '<td align=center style="font: bold 12px Arial;">'+key+"</td>";
				//console.log(key + ' = ' + item[key]);
				}
				htmlTable += "</tr>";

				$.each(oCDASHM2JsonEstimateLinesPrint, function(i, item) {
				htmlTable += "<tr>";
				for (var key in item){
				htmlTable += '<td align=center style="font: 12px Arial;">'+item[key]+"</td>";
				}
				htmlTable += "</tr>";
				});

				htmlTable += '</table>';
				/*htmlTable += '<br></br>';
				htmlTable += '<br></br>';
				var oCDASHM2FlexNotesLine1 = sap.ui.getCore().byId("idCDASHM2TextAreaNotes1").getValue();
				if(oCDASHM2FlexNotesLine1 != ''){
				htmlTable += '<tr  style="border:none;padding-bottom:10px">';
				htmlTable += '<td align=left style="padding-left:10px; font: 12px Arial;">Notes 1 : <b>' + oCDASHM2FlexNotesLine1 + '</b></td>';
				htmlTable += '</tr>';
				}

				var oCDASHM2FlexNotesLine2 = sap.ui.getCore().byId("idCDASHM2TextAreaNotes2").getValue();
				if(oCDASHM2FlexNotesLine2 != ''){
				htmlTable += '<tr  style="border:none;padding-bottom:10px">';
				htmlTable += '<td align=left style="padding-left:10px; font: 12px Arial;">Notes 2 : <b>' + oCDASHM2FlexNotesLine2 + '</b></td>';
				htmlTable += '</tr>';
				}

				var oCDASHM2FlexNotesLine3 = sap.ui.getCore().byId("idCDASHM2TextAreaNotes3").getValue();
				if(oCDASHM2FlexNotesLine3 != ''){
				htmlTable += '<tr  style="border:none;padding-bottom:10px">';
				htmlTable += '<td align=left style="padding-left:10px; font: 12px Arial;">Notes 3 : <b>' + oCDASHM2FlexNotesLine3 + '</b></td>';
				htmlTable += '</tr>';
				}

				var oCDASHM2FlexNotesLine4 = sap.ui.getCore().byId("idCDASHM2TextAreaNotes4").getValue();
				if(oCDASHM2FlexNotesLine4 != ''){
				htmlTable += '<tr  style="border:none;padding-bottom:10px">';
				htmlTable += '<td align=left style="padding-left:10px; font: 12px Arial;">Notes 4 : <b>' + oCDASHM2FlexNotesLine4 + '</b></td>';
				htmlTable += '</tr>';
				}

				var oCDASHM2FlexNotesLine5 = sap.ui.getCore().byId("idCDASHM2TextAreaNotes5").getValue();
				if(oCDASHM2FlexNotesLine5 != ''){
				htmlTable += '<tr  style="border:none;padding-bottom:10px">';
				htmlTable += '<td align=left style="padding-left:10px; font: 12px Arial;">Notes 5 : <b>' + oCDASHM2FlexNotesLine5 + '</b></td>';
				htmlTable += '</tr>';
				}
				*/
				htmlTable += '</td>';


				htmlTable += "</table>";   // HTML Header - End
				var func = "excel";
				if(func == "print"){
				html +='<style>@page{size:landscape;}</style><html><head><title></title></head><body >';
				//alert("Print");
				html += "<div>";
				html +=htmlTable+"</div>";
				html +='</body></html>';
				var newWin = window.open();
				newWin.document.write(html);
				newWin.print();
				}else if(func == "excel"){
				//alert("Export");
				var uri = 'data:application/vnd.ms-excel;base64,',
				template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">'
				+'<!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->'
				+'<head></head>'
				+'<body>'+ htmlTable  +'</body></html>',
				base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) },
				format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }

				// Open Excel
				/*                   if (!table.nodeType)
				table = document.getElementById(table)*/
				var ctx = {worksheet: "M&R Unit Overview" || 'Worksheet', table: htmlTable};
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
				//window.open(uri + base64(format(template, ctx)));

					var file = new Blob([htmlTable], {type:"application/vnd.ms-excel"});

					var url = URL.createObjectURL(file);

					var a = $("<a />", {
							href: url,
							download: global3SerialNo + ".xls",
					})
					.appendTo("body").get(0).click();

				}
				}



				}




});

function chunkArrayInGroups(arr, size) {
	  var result = [];
	  var pos = 0;
	  while (pos < size) {
	    result.push(arr.slice(pos, pos + size));
	    pos += size;
	  }
	  return result;
	}

function chunkv2(arr,size) {

    var result = [];
    for(var i = 0; i < arr.length; i++) {
        if(i%size === 0)
            // Push a new array containing the current value to the result array
            result.push([arr[i]]);
        else
            // Push the current value to the current array
            result[result.length-1].push(arr[i]);
    }
    return result;

}

function isPIC(value) {
	var pic_types = new Array("PNG", "JPG", "JPEG", "BMP", "GIF",
															"png", "jpg", "jpeg", "bmp", "gif");
	  return pic_types.indexOf(value) > -1;
}

String.prototype.splice = function(idx, rem, str) {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};

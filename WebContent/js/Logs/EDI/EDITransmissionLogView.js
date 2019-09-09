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

*$*$------------------------------------------------------------------------*
*$*$ Modified By : Seyed Ismail MAC
*$*$ Modified On : 24.04.2015
*$*$ Reference   : RTS1139
*$*$ Transport   : CGWK900946
*$*$ Tag         : MAC24042015
*$*$ Purpose     : UI5 : EDI Transmission Log & EDI Summary Fixes

					1	General	Timout increase to 30 minutes
					2	EDI Transmission Log	Remove Mandatory mark - Depot Code
					3	EDI Transmission Log	Success Message should be clickable
					4	EDI Transmission Log	Click BACK - Goes to EDI Summary for all Depot - Security Issue
					5	EDI Summary	Gate In - RA Bounce Back
					6	EDI Summary	Repair Progress - Date Format Issue Bounce Back
					7	CEDEX Transmission Log	New Screen - Similar to Old portal

*$*$---------------------------------------------------------------------
*
*/
jQuery.sap.require("sap.ui.model.json.JSONModel");

var vDepotValEDITL = "";
// var vPeriodValEDITL = "";				// MAC06022015-
var vMsgTypeValEDITL = "";
var vUnitTypeValEDITL = "";
var vPriodValToPassEDITL = "";
var vMsgTypeToPassEDITL = "";
var vSerNoToPassEDITL = "";
var vDepotIdToPassEDITL = "";
var vMsgTypeDispFMDEDITL = "";
var depotNameListEDITL = [];
var arrFailMsgDetEDITL = [];
var arrLogResultsEDITL = [];
var oModelLogResultsEDITL;
var loggedInUserTypeEDITL = "";
var msgTypesEDITL = [
                     {"type":"GATE OUT", "key":"MOVE_OUT"},
                     {"type":"GATE IN", "key":"MOVE_IN"},
                     {"type":"ESTIMATE", "key":"ESTIMATE"},
                     {"type":"JOINT SURVEY", "key":"JOINT_SUR"},
                     {"type":"LESSEE APPROVAL", "key":"LESS_RESP"},
                     {"type":"PRI", "key":"REPAIR_PRO"},
                 ];

sap.ui.model.json.JSONModel.extend("ediTransmissionLogView", {

	createEDITransmissionLog: function(){

		var oCurrEDITL = this;

		// Labels
		var oLabelDepot = new sap.ui.commons.Label({text: "Depot:",
			// required: true,					MAC24042015 Removed mandatory
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");

		/*var oLabelMessageType = new sap.ui.commons.Label({text: "Message Type:",
			required: true,
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S3",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");*/

		var oLabelUnitType = new sap.ui.commons.Label({text: "Unit Number:",
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S3",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");

		var oLabelMandatory = new sap.ui.commons.Label({text: "Mandatory Field",
			required: true,
			requiredAtBegin : true,
            wrapping: true}).addStyleClass("marginTop10 marginTop10");

		var oHorDivider = new sap.ui.commons.HorizontalDivider({width: "100%", type: "Area", height: "Medium"}).addStyleClass("marginTop10");

		var oListDepotEDITL = new sap.ui.core.HTML("idListDepotComboEDITL",{
			layoutData: new sap.ui.layout.GridData({span: "L4 M9 S12"}
			)});

		var htmlContentDepot = '<input id="idListDepotEDITL" placeholder="Select Depot" class="FormInputStyle marginTop10" style="width:100%">';

		oListDepotEDITL.setContent(htmlContentDepot);
		/* Begin of commenting by Seyed Ismail on 06.02.2015 MAC06022015*/ /*
		var oLabelPeriod = new sap.ui.commons.Label({text: "Period:",
			required: true,
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S3",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");

    	var oDropdownPeriod = new sap.ui.commons.DropdownBox("idPeriodDrpDwnEDITL",{
    		items: [
    		        new sap.ui.core.ListItem({text: "Today", key: "TODAY"}),
    		        new sap.ui.core.ListItem({text: "This Week", key: "THIS WEEK"}),
    		        new sap.ui.core.ListItem({text: "Last Week", key: "LAST WEEK"}),
    		        new sap.ui.core.ListItem({text: "This Month", key: "THIS MONTH"}),
    		        new sap.ui.core.ListItem({text: "Last Month", key: "LAST MONTH"}),
    		        ],
    		change: function(oEvent){
    			//alert("change - period");
    			},
    			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12"})
    		}).addStyleClass("FormInputStyle marginTop10"); */
    	/* End of commenting by Seyed Ismail on 06.02.2015 MAC06022015*/

		/* Begin of adding by Seyed Ismail on 06.02.2015 MAC06022015*/
		var oLabelPeriod = new sap.ui.commons.Label({text: "Period:",
			required: true,
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S3",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");

		var oLabelMessageType = new sap.ui.commons.Label({text: "Message Type:",
			required: true,
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S3",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");

		var oLabelSpaceForDate = new sap.ui.commons.Label({text: "",
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S3",linebreak: false, margin: true}),
			width:"18px",
            wrapping: true}).addStyleClass("marginTop10");

		var oLabelFrom = new sap.ui.commons.Label({text: "From: ",
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S3",linebreak: false, margin: true}),
            wrapping: true}).addStyleClass("marginTop10 marginRight5");

		var oLabelTo = new sap.ui.commons.Label({text: "To: ",
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S3",linebreak: false, margin: true}),
            wrapping: true}).addStyleClass("marginTop10 marginRight5");

    	var oEdiFrom = new sap.ui.commons.DatePicker("idEdiFrom",{
    		value: {
                path: "/dateValue",
                type: new sap.ui.model.type.Date({pattern: "dd-MM-yyyy"}),
                mode: sap.ui.model.BindingMode.OneWay
    			},
    			width:"100px",
    			layoutData: new sap.ui.layout.GridData({span: "L2 M2 S3"}),
    	});
    	//oInputOffHireDateFrom.setModel(oModelCurrDateCRUOH);
    	oEdiFrom.addStyleClass("FormInputStyle margin5Top");
    	oEdiFrom.setLocale("en-US");
    	oEdiFrom.attachChange(
    	                function(oEvent){
    	                        if(oEvent.getParameter("invalidValue")){
    	                                oEvent.oSource.setValueState(sap.ui.core.ValueState.Error);
    	                                oEvent.oSource.setValue("");
    	                                oEvent.oSource.setPlaceholder("Invalid Value");
    	                        }else{
    	                                oEvent.oSource.setValueState(sap.ui.core.ValueState.None);
    	                        }
    	                }
    	);

    	var oEdiTo = new sap.ui.commons.DatePicker("idEdiTo",{
    		value: {
                path: "/dateValue",
                type: new sap.ui.model.type.Date({pattern: "dd-MM-yyyy"}),
                mode: sap.ui.model.BindingMode.OneWay
    			},
    			width:"100px",
    			layoutData: new sap.ui.layout.GridData({span: "L2 M2 S3"}),
    	});
    	//oInputOffHireDateTo.setModel(oModelCurrDateCRUOH);
    	oEdiTo.addStyleClass("FormInputStyle margin5Top");
    	oEdiTo.setLocale("en-US");
    	oEdiTo.attachChange(
    	                function(oEvent){
    	                        if(oEvent.getParameter("invalidValue")){
    	                                oEvent.oSource.setValueState(sap.ui.core.ValueState.Error);
    	                                oEvent.oSource.setValue("");
    	                                oEvent.oSource.setPlaceholder("Invalid Value");
    	                        }else{
    	                                oEvent.oSource.setValueState(sap.ui.core.ValueState.None);
    	                        }
    	                }
    	);


    	//Flexbox for Date
		var oFlexDate = new sap.m.FlexBox({
		      items: [
		        oLabelFrom,
		        oEdiFrom,
		        oLabelSpaceForDate,
		        oLabelTo,
		        oEdiTo
		      ],
		      layoutData: new sap.ui.layout.GridData({span: "L8 M9 S12",linebreak: false, margin: true}),
		      direction: "Row"
		});

//		var oBtnAllDepot = new sap.m.Button("idBtnAllDepot",{
//		          text : "Show logs for all depots",
//		          width:"190px",
//		          styled:false,
//		          //layoutData: new sap.ui.layout.GridData({moveForward: "L2 M2 S0"}),
//				  layoutData: new sap.ui.layout.GridData({span: "L2 M5 S4",linebreak: true, margin: true}),
//		          press:function(){
//		        		  oCurrEDITL.allDepotDetails();
//		          }}).addStyleClass("centerBtn marginTop10");
//
//		// Responsive Grid Layout
//			    var oEDIAllDepotLayout = new sap.ui.layout.form.ResponsiveGridLayout("idEDIAllDepotLayout",{
//			    	  labelSpanL: 1,
//	                  labelSpanM: 1,
//	                  labelSpanS: 1,
//	                  emptySpanL: 0,
//	                  emptySpanM: 0,
//	                  emptySpanS: 0,
//	                  columnsL: 2,
//	                  columnsM: 2,
//	                  columnsS: 1,
//	                  //breakpointL: 765,
//	                  //breakpointM: 320
//			    });
//
//				var oEDIAllDepotFormC1 = new sap.ui.layout.form.FormContainer("idEDIAllDepotFormC1",{
//			                             //title: "Add Movement Out - Single",
//		                             formElements: [
//														new sap.ui.layout.form.FormElement({
//														    fields: [oBtnAllDepot]
//														})
//			                                     ]
//			                     });
//
//				var oEDIAllDepotForm = new sap.ui.layout.form.Form("idEDIAllDepotForm",{
//			             layout: oEDIAllDepotLayout,
//			             formContainers: [ oEDIAllDepotFormC1 ]
//			     });


    	/* End of adding by Seyed Ismail on 06.02.2015 MAC06022015*/

    	var oDropdownMsgType = new sap.ui.commons.DropdownBox("idMsgTypeDrpDwnEDITL",{
    		items: [
    		        new sap.ui.core.ListItem({text: "All", key: "ALL"}),
    		        new sap.ui.core.ListItem({text: "Gate Out", key: "MOVE_OUT"}),
    		        new sap.ui.core.ListItem({text: "Gate In", key: "MOVE_IN"}),
    		        new sap.ui.core.ListItem({text: "Estimate", key: "ESTIMATE"}),
    		        new sap.ui.core.ListItem({text: "Joint Survey", key: "JOINT_SUR"}),
    		        new sap.ui.core.ListItem({text: "Lessee Approval", key: "LESS_RESP"}),
    		        new sap.ui.core.ListItem({text: "PRI", key: "REPAIR_PRO"}),
    		        ],
    		change: function(oEvent){
    			//alert("change - period");
    			},
    			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12"})
    		}).addStyleClass("FormInputStyle marginTop10");

    	var oInputUnitTypeEDITL = new sap.ui.commons.TextField('idUnitTypeEDITL',{
    		placeholder:"Unit Number",
    		layoutData: new sap.ui.layout.GridData({span: "L2 M2 S12",linebreak: false, margin: true}),
    	}).addStyleClass("FormInputStyle marginTop10");

    	oInputUnitTypeEDITL.setMaxLength(11);

		    	// Buttons
	   	 var oBtnEDITransLogSubmit = new sap.m.Button("idBtnSubmitEDITL",{
		          text : "Submit",
		          width:"80px",
		          styled:false,
		          layoutData: new sap.ui.layout.GridData({span: "L2 M5 S4",linebreak: true, margin: true}),
		          press:function(){
		        	  if(1 == 1){
		        		  oCurrEDITL.showTransmissionLogEDITL();
		        	  }
		          }}).addStyleClass("submitBtn marginTop10");


			  // Responsive Grid Layout
			    var oEDITransmissionLogLayout = new sap.ui.layout.form.ResponsiveGridLayout("idEDITransmissionLogLayout",{
			    	  labelSpanL: 1,
	                  labelSpanM: 1,
	                  labelSpanS: 1,
	                  emptySpanL: 0,
	                  emptySpanM: 0,
	                  emptySpanS: 0,
	                  columnsL: 2,
	                  columnsM: 2,
	                  columnsS: 1,
	                  breakpointL: 765,
	                  breakpointM: 320
			    });

			  // Online Form Starts
			     var oEDITransmissionLogForm = new sap.ui.layout.form.Form("idEDITransmissionLogForm",{
			             layout: oEDITransmissionLogLayout,
			             formContainers: [

			                     new sap.ui.layout.form.FormContainer("idEDITransmissionLogFormC1",{
			                             //title: "Add Movement Out - Single",
		                             formElements: [
														new sap.ui.layout.form.FormElement({
														    fields: [oLabelDepot, oListDepotEDITL]
														}),
														new sap.ui.layout.form.FormElement({
														    //fields: [oLabelPeriod, oDropdownPeriod] // MAC06022015-
															fields: [oLabelPeriod, oFlexDate]		  // MAC06022015+
														}),
														new sap.ui.layout.form.FormElement({
														    fields: [oLabelMessageType, oDropdownMsgType]
														}),
														new sap.ui.layout.form.FormElement({
														    fields: [oLabelUnitType, oInputUnitTypeEDITL]
														}),
														new sap.ui.layout.form.FormElement({
														    fields: [ oBtnEDITransLogSubmit]//, oBtnAllDepot]
														}),
														new sap.ui.layout.form.FormElement({
														    fields: [oLabelMandatory]
														})
			                                     ]
			                     }),
			             ]
			     });

			  // Responsive Grid Layout
				    var oEDITransmissionLogResultsLayout = new sap.ui.layout.form.ResponsiveGridLayout("idEDITransmissionLogResultsLayout",{
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
				     var oEDITransmissionLogResultsForm = new sap.ui.layout.form.Form("idEDITransmissionLogResultsForm",{
				             layout: oEDITransmissionLogResultsLayout,
				             formContainers: [

				                     new sap.ui.layout.form.FormContainer({
			                             formElements: [
															new sap.ui.layout.form.FormElement("idEDITransmissionLogShowResults",{
															    fields: [],
															    layoutData: new sap.ui.layout.GridData({span: "L9 M9 S4",linebreak: true, margin: true})
															}),
				                                     ]
				                     }),
				             ]
				     });

				     var oFlexAllEDITL = new sap.m.FlexBox({
	    		           items: [
									//oEDIAllDepotForm,
	    							oEDITransmissionLogForm,
	    							oHorDivider,
	    							oEDITransmissionLogResultsForm
	    		           ],
	    		           direction : "Column",
	    					});

			     	return oFlexAllEDITL;
	},

	allDepotDetails: function(){

		busyDialog.open();

		oModel = new sap.ui.model.odata.ODataModel(serviceUrl15, true);
		var urlToCallEDITLDep = serviceUrl15 + "/Edi_Summary";
		//alert("urlToCallEDITLDep : "+urlToCallEDITLDep);
		OData.request({
		      requestUri: urlToCallEDITLDep,
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
			var allDepotLength = data.results.length;
			var allDepotResult = [];
			for(var i=0;i < allDepotLength; i++){
				allDepotResult[i] = data.results[i];
			}

			var bus = sap.ui.getCore().getEventBus();
			bus.publish("nav", "to", {id : "EDIAllDepot"});

			var oEdiAllDepot = new EDIAllDepotView();
			oEdiAllDepot.fillEDIAllDepot(allDepotResult);
			busyDialog.close();
		    },
		    function(err){
		    	 errorfromServer(err);
		    	//alert("Error while Reading Result : "+ : window.JSON.stringify(err.response));
		    });

	},

	validateEDITL: function(){

		var isValidEDITL = false;

		vDepotValEDITL = document.getElementById("idListDepotEDITL").value;
		// vPeriodValEDITL = sap.ui.getCore().byId("idPeriodDrpDwnEDITL").getValue();		// MAC06022015-
		var vDateFrom = sap.ui.getCore().byId("idEdiFrom").getValue();			// MAC06022015+
		var vDateTo = sap.ui.getCore().byId("idEdiTo").getValue();				// MAC06022015+
		vMsgTypeValEDITL = sap.ui.getCore().byId("idMsgTypeDrpDwnEDITL").getValue();
		vUnitTypeValEDITL = sap.ui.getCore().byId("idUnitTypeEDITL").getValue().trim().toUpperCase();

		// if(vDepotValEDITL != "" && vPeriodValEDITL != "" && vMsgTypeValEDITL != ""){		// MAC06022015-
		if(vDateFrom != "" && vDateTo != "" && vMsgTypeValEDITL != ""){    // MAC24042015 - Removed vDepotValEDITL != ""
			isValidEDITL = true;
		}
		else{
			// Begin of commenting by Seyed Ismail on 24.04.2015 "MAC24042015-
			  /*if(vDepotValEDITL == ""){
					document.getElementById("idListDepotEDITL").style.borderColor = "red";
		    		document.getElementById("idListDepotEDITL").style.background = "#FAD4D4";
		    		document.getElementById("idListDepotEDITL").placeholder = "Required";
		    		isValidEDITL = false;
		  	  }
		  	  else{
			  		document.getElementById("idListDepotEDITL").style.borderColor = "#cccccc";
					document.getElementById("idListDepotEDITL").style.background = "#ffffff";
					document.getElementById("idListDepotEDITL").placeholder = "Depot";
		  	  }*/
			// End of commenting by Seyed Ismail on 24.04.2015 "MAC24042015-
			  if(vDepotValEDITL != "" && vDepotValEDITL.trim().length > 0){	// MAC24042015 + added vDepotValEDITL != "" &&
					var match = jQuery.inArray(vDepotValEDITL,depotNameListEDITL);
					if(match < 0){
						document.getElementById("idListDepotEDITL").style.borderColor = "red";
			    		document.getElementById("idListDepotEDITL").style.background = "#FAD4D4";
			    		document.getElementById("idListDepotEDITL").value = "";
			    		document.getElementById("idListDepotEDITL").placeholder = "Invalid Depot";
			    		isValidEDITL = false;
					}
					else{
						document.getElementById("idListDepotEDITL").style.borderColor = "#cccccc";
			    		document.getElementById("idListDepotEDITL").style.background = "#ffffff";
			    		document.getElementById("idListDepotEDITL").placeholder = "Depot";
					}
				}
			  /* Begin of commenting by Seyed Ismail on 06.02.2015 MAC06022015 */ /*
		  	  if(vPeriodValEDITL == ""){
			  		sap.ui.getCore().byId("idPeriodDrpDwnEDITL").setValueState(sap.ui.core.ValueState.Error);
			  		sap.ui.getCore().byId("idPeriodDrpDwnEDITL").setValue("");
			  		sap.ui.getCore().byId("idPeriodDrpDwnEDITL").setPlaceholder("Required");
		  		    isValidEDITL = false;
		  	  }
		  	  else{
		  		  	sap.ui.getCore().byId("idPeriodDrpDwnEDITL").setValueState(sap.ui.core.ValueState.None);
		  	  }

			  /* Begin of adding by Seyed Ismail on 06.02.2015 MAC06022015 */
		  	  if(vDateFrom == ""){
			  		sap.ui.getCore().byId("idEdiFrom").setValueState(sap.ui.core.ValueState.Error);
			  		sap.ui.getCore().byId("idEdiFrom").setValue("");
			  		sap.ui.getCore().byId("idEdiFrom").setPlaceholder("Required");
		  		    isValidEDITL = false;
		  	  }
		  	  else{
		  		  	sap.ui.getCore().byId("idEdiFrom").setValueState(sap.ui.core.ValueState.None);
		  	  }
			  if(vDateTo == ""){
			  		sap.ui.getCore().byId("idEdiTo").setValueState(sap.ui.core.ValueState.Error);
			  		sap.ui.getCore().byId("idEdiTo").setValue("");
			  		sap.ui.getCore().byId("idEdiTo").setPlaceholder("Required");
		  		    isValidEDITL = false;
		  	  }
		  	  else{
		  		  	sap.ui.getCore().byId("idEdiTo").setValueState(sap.ui.core.ValueState.None);
		  	  }
			  /* End of adding by Seyed Ismail on 06.02.2015 MAC06022015 */
		  	  if(vMsgTypeValEDITL == ""){
			  		sap.ui.getCore().byId("idMsgTypeDrpDwnEDITL").setValueState(sap.ui.core.ValueState.Error);
			  		sap.ui.getCore().byId("idMsgTypeDrpDwnEDITL").setValue("");
			  		sap.ui.getCore().byId("idMsgTypeDrpDwnEDITL").setPlaceholder("Required");
		  		    isValidEDITL = false;
		  	  }
		  	  else{
		  		    sap.ui.getCore().byId("idMsgTypeDrpDwnEDITL").setValueState(sap.ui.core.ValueState.None);
		  	  }
	}
		return isValidEDITL;
	},

	validateEDITLNew: function(){			// Created by Seyed Ismail on 24.04.2015 "MAC24042015-

		var isValidEDITL = false;
		var vUnitNumber = sap.ui.getCore().byId("idUnitTypeEDITL").getValue();

		if(vUnitNumber != ""){
			isValidEDITL = true;
		}
		else{
		sap.ui.getCore().byId("idUnitTypeEDITL").setValueState(sap.ui.core.ValueState.Error);
		sap.ui.getCore().byId("idUnitTypeEDITL").setValue("");
		sap.ui.getCore().byId("idUnitTypeEDITL").setPlaceholder("Required");
	    isValidEDITL = false;
		}
		return isValidEDITL;
	},


	populateDepotNameEDITL: function(){
		busyDialog.open();

		oModel = new sap.ui.model.odata.ODataModel(serviceUrl15, true);
		var urlToCallEDITLDep = serviceUrl15 + "/F4_Functional_Location";
		//alert("urlToCallEDITLDep : "+urlToCallEDITLDep);
		OData.request({
		      requestUri: urlToCallEDITLDep,
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
		    	for ( var i = 0; i < data.results.length ; i++) {
		    		depotNameListEDITL[i] = data.results[i].FunctionalLoc;
				}

		    	//alert("depotNameListAMOS len : "+depotNameListAMOS.length);

		    	$( "#idListDepotEDITL" ).autocomplete({
		    	      source: depotNameListEDITL,
		    	      minLength: 0,
		    	      select: function(){
		    	    	  document.getElementById("idListDepotEDITL").style.borderColor = "#cccccc";
		  				  document.getElementById("idListDepotEDITL").style.background = "#ffffff";
		    	      }
		    	})
		    	.focus(function(){
		    		 if ($("ul.ui-autocomplete").is(":hidden")) {
		    		        $(this).autocomplete('search', '');
		    		    }
		    	})
		    	.bind( "focusout", function( event ) {
			     })
		    	.keyup(function() {
		    	    var isValid = false;
		    	    var previousValue = "";
		    	    for (i in depotNameListEDITL) {
		    	        if (depotNameListEDITL[i].toLowerCase().match(this.value.toLowerCase())) {
		    	            isValid = true;
		    	        }
		    	    }
		    	    if (!isValid) {
		    	        this.value = previousValue;
		    	    } else {
		    	        previousValue = this.value;
		    	    }
		    	});
		    	loggedInUserTypeEDITL = objLoginUser.getLoggedInUserType();
				if(loggedInUserTypeEDITL == "SEACO"){
					$("#idListDepotEDITL").removeAttr('disabled');
				}
				else{
					var DepotCode = objLoginUser.getLoggedInUserID();
					for(var i=0;i<depotNameListEDITL.length;i++){
						if(depotNameListEDITL[i].substring(11,15) == DepotCode)
							DepotCode = depotNameListEDITL[i];
					}
					$("#idListDepotEDITL").attr("disabled","disabled");
					$("#idListDepotEDITL").val(DepotCode);
				}
		    	busyDialog.close();
		    },
		    function(err){
		    	 errorfromServer(err);
		    	//alert("Error while Reading Result : "+ : window.JSON.stringify(err.response));
		    });
	},

	showTransmissionLogEDITL: function(){

		var oCurrEDITL = this;

		//document.getElementById("idListDepotEDITL").style.borderColor = "#cccccc";		MAC24042015 -
	    //document.getElementById("idListDepotEDITL").style.background = "#ffffff";			MAC24042015 -

		busyDialog.open();

		if(sap.ui.getCore().byId("idTblLogResultsEDITL")){
			sap.ui.getCore().byId("idTblLogResultsEDITL").destroy();
		}

		vMsgTypeToPassEDITL = "";

		// vPriodValToPassEDITL = sap.ui.getCore().byId("idPeriodDrpDwnEDITL").getSelectedKey();  // MAC06022015 -

		/* Begin of adding by Seyed Ismail on 06.02.2015 MAC06022015 */
		var dateFromVal = "";
		var dateToVal = "";
		var dateFrom = "";
		var dateTo = "";
		dateFromVal = sap.ui.getCore().byId("idEdiFrom").getValue();

		if(dateFromVal != ""){
			var dateFromSplit = dateFromVal.split("-");
			dateFrom = dateFromSplit[2] + dateFromSplit[1] + dateFromSplit[0];
			dateFrom = dateFrom.trim();
			vPriodValToPassEDITL = dateFrom;
		}

		dateToVal = sap.ui.getCore().byId("idEdiTo").getValue();

		if(dateToVal != ""){
			var dateToSplit = dateToVal.split("-");
			dateTo = dateToSplit[2] + dateToSplit[1] + dateToSplit[0];
			dateTo = dateTo.trim();
			vPriodValToPassEDITL = vPriodValToPassEDITL + dateTo;
		}
		/* End of adding by Seyed Ismail on 06.02.2015 MAC06022015 */

		vMsgTypeToPassEDITL = sap.ui.getCore().byId("idMsgTypeDrpDwnEDITL").getSelectedKey();
		vDepotValEDITL = document.getElementById("idListDepotEDITL").value;
		var vPartsFuncLoc = vDepotValEDITL.split("-");
		var vFuncLoc = vPartsFuncLoc[0] + "-" + vPartsFuncLoc[1] + "-" + vPartsFuncLoc[2] + "-" + vPartsFuncLoc[3];

		oModel = new sap.ui.model.odata.ODataModel(serviceUrl15, true);
		var urlToCallEDITL = serviceUrl15 + "/EDI_Submit?$filter=IFunLoc  eq '" + vFuncLoc + "' and IMsgType eq '" + vMsgTypeToPassEDITL + "' and IPeriod eq '" + vPriodValToPassEDITL + "' and ISerialNo eq '" + vUnitTypeValEDITL.trim().toUpperCase() + "'";
		//alert("urlToCallEDITL : "+urlToCallEDITL);
		OData.request({
		      requestUri: urlToCallEDITL,
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
		    			/*arrLogResultsEDITL[0].success = data.results[0].GateoutS;
		    			arrLogResultsEDITL[0].error = data.results[0].GateoutE;

		    			arrLogResultsEDITL[1].success = data.results[0].GateinS;
		    			arrLogResultsEDITL[1].error = data.results[0].GateinE;

		    			arrLogResultsEDITL[2].success = data.results[0].EstimateS;
		    			arrLogResultsEDITL[2].error = data.results[0].EstimateE;

		    			arrLogResultsEDITL[3].success = data.results[0].LesseeApprS;
		    			arrLogResultsEDITL[3].error = data.results[0].LesseeApprE;

		    			arrLogResultsEDITL[4].success = data.results[0].JointSurveyS;
		    			arrLogResultsEDITL[4].error = data.results[0].JointSurveyE;

		    			arrLogResultsEDITL[5].success = data.results[0].PurchContS;
		    			arrLogResultsEDITL[5].error = data.results[0].PurchContE;*/

		    			switch (vMsgTypeToPassEDITL) {
			    			case "MOVE_OUT":
			    				arrLogResultsEDITL = [];
			    				arrLogResultsEDITL.push({
			    					"msgType": "GATE OUT",
			    					"success": data.results[0].GateoutS,
			    					"error": data.results[0].GateoutE,
			    					"isEnabledLink": (data.results[0].GateoutE > 0 ? true : false)
			    				});
			    			    break;
			    			case "MOVE_IN":
			    				arrLogResultsEDITL = [];
			    				arrLogResultsEDITL.push({
			    					"msgType": "GATE IN",
			    					"success": data.results[0].GateinS,
			    					"error": data.results[0].GateinE,
			    					"isEnabledLink": (data.results[0].GateinE > 0 ? true : false)
			    				});
			    			    break;
			    			case "REPAIR_PRO":
			    				arrLogResultsEDITL = [];
			    				arrLogResultsEDITL.push({
			    					"msgType": "PRI",
			    					"success": data.results[0].RepairProgS,
			    					"error": data.results[0].RepairProgE,
			    					"isEnabledLink": (data.results[0].RepairProgE > 0 ? true : false)
			    				});
			    			    break;
			    			case "ESTIMATE":
			    				arrLogResultsEDITL = [];
			    				arrLogResultsEDITL.push({
			    					"msgType": "ESTIMATE",
			    					"success": data.results[0].EstimateS,
			    					"error": data.results[0].EstimateE,
			    					"isEnabledLink": (data.results[0].EstimateE > 0 ? true : false)
			    				});
			    			    break;
			    			case "JOINT_SUR":
			    				arrLogResultsEDITL = [];
			    				arrLogResultsEDITL.push({
			    					"msgType": "JOINT SURVEY",
			    					"success": data.results[0].JointSurveyS,
			    					"error": data.results[0].JointSurveyE,
			    					"isEnabledLink": (data.results[0].JointSurveyE > 0 ? true : false)
			    				});
			    			    break;
			    			case "LESS_RESP":
			    				arrLogResultsEDITL = [];
			    				arrLogResultsEDITL.push({
			    					"msgType": "LESSEE APPROVAL",
			    					"success": data.results[0].LesseeApprS,
			    					"error": data.results[0].LesseeApprE,
			    					"isEnabledLink": (data.results[0].LesseeApprE > 0 ? true : false)
			    				});
			    			    break;
			    			case "ALL":
			    				arrLogResultsEDITL = [];
			    					arrLogResultsEDITL.push({
				    					"msgType": "GATE OUT",
				    					"success": data.results[0].GateoutS,
				    					"error": data.results[0].GateoutE,
				    					"isEnabledLink": (data.results[0].GateoutE > 0 ? true : false)
				    				});

			    					arrLogResultsEDITL.push({
				    					"msgType": "GATE IN",
				    					"success": data.results[0].GateinS,
				    					"error": data.results[0].GateinE,
				    					"isEnabledLink": (data.results[0].GateinE > 0 ? true : false)
				    				});

			    					arrLogResultsEDITL.push({
				    					"msgType": "ESTIMATE",
				    					"success": data.results[0].EstimateS,
				    					"error": data.results[0].EstimateE,
				    					"isEnabledLink": (data.results[0].EstimateE > 0 ? true : false)
				    				});

					    			arrLogResultsEDITL.push({
				    					"msgType": "LESSEE APPROVAL",
				    					"success": data.results[0].LesseeApprS,
				    					"error": data.results[0].LesseeApprE,
				    					"isEnabledLink": (data.results[0].LesseeApprE > 0 ? true : false)
				    				});

					    			arrLogResultsEDITL.push({
				    					"msgType": "JOINT SURVEY",
				    					"success": data.results[0].JointSurveyS,
				    					"error": data.results[0].JointSurveyE,
				    					"isEnabledLink": (data.results[0].JointSurveyE > 0 ? true : false)
				    				});

					    			arrLogResultsEDITL.push({
				    					"msgType": "PRI",
				    					"success": data.results[0].RepairProgS,
				    					"error": data.results[0].RepairProgE,
				    					"isEnabledLink": (data.results[0].RepairProgE > 0 ? true : false)
				    				});
			    			    break;
		    			}

		    		busyDialog.close();

		    		oCurrEDITL.createLogResultsTableEDITL();

		    		oCurrEDITL.updateLogTableEDITL();
		    }
		    },
		    function(err){
		    	 busyDialog.close();
		    	 errorfromServer(err);
		    	//alert("Error while Reading Result : "+ window.JSON.stringify(err.response));
		    });
	},

	createLogResultsTableEDITL: function(){
		  var oUtil = new utility();
		var oCurrEDITL = this;
		if(sap.ui.getCore().byId("idTblLogResultsEDITL")){
			sap.ui.getCore().byId("idTblLogResultsEDITL").destroy();
		}

		// Table
    	var oTableLogResultsEDITL = new sap.ui.table.Table("idTblLogResultsEDITL",{
            columnHeaderHeight: 30,
            selectionMode: sap.ui.table.SelectionMode.None,
            width:"50%",
            height:"100%"
    	 }).addStyleClass("fontStyle marginTop15 tblBorder");

    	// Table Columns
    	oTableLogResultsEDITL.addColumn(new sap.ui.table.Column({
      		 label: new sap.ui.commons.Label({text: "Message Type"}),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "msgType"),
    		 resizable:false,
             sortProperty: "msgType",
             filterProperty: "msgType",
    		 }));

    	var oSuccessCol = new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Success"}),
			 template: new sap.ui.commons.TextView().bindProperty("text", "success").addStyleClass("wraptext"),
			 resizable:false,
             sortProperty: "success",
             filterProperty: "success",
			 });
    	oTableLogResultsEDITL.addColumn(oSuccessCol);
  	    oUtil.addColumnSorterAndFilter(oSuccessCol, oUtil.compareUptoCount);

    	var oFailCol = new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Fail"}),
	   		template: new sap.ui.commons.Link({
				press : function() {
					oCurrEDITL.FailHyperLinkEDITL("L",this.getHelpId());
				}
			}).bindProperty("text", "error").bindProperty("helpId","msgType").bindProperty("enabled","isEnabledLink").addStyleClass("wraptext"),
			 resizable:false,
            sortProperty: "error",
            filterProperty: "error",
			 });

    	oTableLogResultsEDITL.addColumn(oFailCol);
  	    oUtil.addColumnSorterAndFilter(oFailCol, oUtil.compareUptoCount);
	},

	updateLogTableEDITL: function(){
		oModelLogResultsEDITL = new sap.ui.model.json.JSONModel();
    	oModelLogResultsEDITL.setData({modelData: arrLogResultsEDITL});
    	sap.ui.getCore().byId("idTblLogResultsEDITL").setModel(oModelLogResultsEDITL);
    	sap.ui.getCore().byId("idTblLogResultsEDITL").bindRows("/modelData");

    	sap.ui.getCore().byId("idTblLogResultsEDITL").setVisibleRowCount(arrLogResultsEDITL.length);

    	sap.ui.getCore().byId("idEDITransmissionLogShowResults").insertField(sap.ui.getCore().byId("idTblLogResultsEDITL"),i);
	},

	FailHyperLinkEDITL: function(flag,msgType){
		busyDialog.open();
		if(flag == "L"){
		vSerNoToPassEDITL = sap.ui.getCore().byId("idUnitTypeEDITL").getValue().trim().toUpperCase();
		var keyEDITL = document.getElementById("idListDepotEDITL").value;
	    var partsEDITL = keyEDITL.split("-");
	    vDepotIdToPassEDITL = partsEDITL[partsEDITL.length - 2];
	    // var iperiod = sap.ui.getCore().byId("idPeriodDrpDwnEDITL").getSelectedKey();    // MAC06022015
		/* Begin of adding by Seyed Ismail on 06.02.2015 MAC06022015 */
		var dateFromVal = "";
		var dateToVal = "";
		var dateFrom = "";
		var dateTo = "";
		dateFromVal = sap.ui.getCore().byId("idEdiFrom").getValue();

		if(dateFromVal != ""){
			var dateFromSplit = dateFromVal.split("-");
			dateFrom = dateFromSplit[2] + dateFromSplit[1] + dateFromSplit[0];
			dateFrom = dateFrom.trim();
			var iperiod = dateFrom;
		}

		dateToVal = sap.ui.getCore().byId("idEdiTo").getValue();

		if(dateToVal != ""){
			var dateToSplit = dateToVal.split("-");
			dateTo = dateToSplit[2] + dateToSplit[1] + dateToSplit[0];
			dateTo = dateTo.trim();
			iperiod = iperiod + dateTo;
		}
		/* End of adding by Seyed Ismail on 06.02.2015 MAC06022015 */
	    vMsgTypeToPassEDITL = sap.ui.getCore().byId("idMsgTypeDrpDwnEDITL").getSelectedKey();

	    var msgValue =  jQuery.grep(msgTypesEDITL, function(element, index){
            return (element.type == msgType);
    	});

    var viewText = "";
		if(msgValue[0].key == "REEFER_EDI"){
			viewText = "View Details";
		}else{
			viewText = "View Error";
		}

		oModel = new sap.ui.model.odata.ODataModel(serviceUrl15, true);
		var urlToCallFailEDITL = serviceUrl15 + "/EDI_Fail_Hyperlink?$filter=IDepot eq '" + vDepotIdToPassEDITL
		                        // + "' and IMsgType eq '" + vMsgTypeToPassEDITL + "' and ISerialNo eq '" + vSerNoToPassEDITL + "'";
								 + "' and IMsgType eq '" + msgValue[0].key + "' and ISerialNo eq '" + vSerNoToPassEDITL + "' and IPeriod eq '" + iperiod + "'";
		//alert("urlToCallFailEDITL : "+urlToCallFailEDITL);
		OData.request({
		      requestUri: urlToCallFailEDITL,
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
		    		arrFailMsgDetEDITL = [];
		    		for(var i=0; i<data.results.length; i++){

		    			var vSubmittedDate = data.results[i].Submitteddate.split("(");
					    var vSubmitDate = vSubmittedDate[1].split(")");
					    var vformattedSubmittedDate = new Date(Number(vSubmitDate[0]));
					    var SubmittedDate = dateFormat(new Date(Number(vSubmitDate[0])), 'dd-mm-yyyy',"UTC");
					    if(SubmittedDate.substring(6) == "9999")
					    	SubmittedDate = "";
					    else
					    	SubmittedDate = SubmittedDate;


					    var vMessageDate = data.results[i].MsgDate.split("(");
					    var vMsgDate = vMessageDate[1].split(")");
					    var vformattedMessageDate = new Date(Number(vMsgDate[0]));
					    var MessageDate = dateFormat(new Date(Number(vMsgDate[0])), 'dd-mm-yyyy',"UTC");
					    if(MessageDate.substring(6) == "9999")
					    	MessageDate = "";
					    else
					    	MessageDate = MessageDate;

							  arrFailMsgDetEDITL.push({
				    				"msgUniqueID": data.results[i].MsgUidXi,
				    				"type": data.results[i].MsgType,
				    				"msgName": data.results[i].MsgName,
				    				"source": data.results[i].MsgSource,
				    				"serialNumber": data.results[i].MsgSernr,
				    				"submittedDate": SubmittedDate,
				    				"submittedDateActual": vformattedSubmittedDate,
				    				"messageDate": MessageDate,
				    				"messageDateActual": vformattedMessageDate,
				    				"viewError": viewText,
				    				"checked": false
				    			});
		    		}

		    		vMsgTypeDispFMDEDITL = "";
		    		vMsgTypeDispFMDEDITL = sap.ui.getCore().byId("idMsgTypeDrpDwnEDITL").getValue();

		    		busyDialog.close();

		    			var bus = sap.ui.getCore().getEventBus();
	        	  		bus.publish("nav", "to", {
	        		    id : "FailMessageDetailView"
	        	  		});

	        	  		var oFailMsgDetObjEDITL = new failMessageDetailEDITLView();
	        	  		oFailMsgDetObjEDITL.updateFailMsgDetEDITL();
		    		}
		    },
		    function(err){
		    	 busyDialog.close();
		    	 errorfromServer(err);
		    	//alert("Error while Reading Result : "+ window.JSON.stringify(err.response));
		    });
		}
			else{
			new failMessageDetailEDITLView().updateFailMsgDetEDITL();
			busyDialog.close();
			}
	},

	resetEDIRetransmissionLog: function(){
		loggedInUserTypeEDITL = objLoginUser.getLoggedInUserType();
		if(loggedInUserTypeEDITL == "SEACO"){
			$("#idListDepotEDITL").val("");
			if(document.getElementById("idListDepotEDITL")){
                document.getElementById("idListDepotEDITL").style.borderColor = "#cccccc";
	    		document.getElementById("idListDepotEDITL").style.background = "#ffffff";
	    		document.getElementById("idListDepotEDITL").placeholder = "Select Depot";
          }
		}

		/* Begin of commenting by Seyed Ismail on 06.02.2015 MAC06022015 */ /*
		sap.ui.getCore().byId("idPeriodDrpDwnEDITL").setValue("");
		 if(sap.ui.getCore().byId("idPeriodDrpDwnEDITL")){
         	  sap.ui.getCore().byId("idPeriodDrpDwnEDITL").setValueState(sap.ui.core.ValueState.None);
         	  sap.ui.getCore().byId("idPeriodDrpDwnEDITL").setPlaceholder("Period");
           }
		 */  /* End of commenting by Seyed Ismail on 06.02.2015 MAC06022015 */

		 /* Begin of adding by Seyed Ismail on 06.02.2015 MAC06022015 */
		sap.ui.getCore().byId("idEdiFrom").setValueState(sap.ui.core.ValueState.None);
        sap.ui.getCore().byId("idEdiFrom").setPlaceholder("");
        sap.ui.getCore().byId("idEdiTo").setValueState(sap.ui.core.ValueState.None);
        sap.ui.getCore().byId("idEdiTo").setPlaceholder("");
		sap.ui.getCore().byId("idEdiFrom").setValue("");
        sap.ui.getCore().byId("idEdiTo").setValue("");
        /* End of adding by Seyed Ismail on 06.02.2015 MAC06022015 */

		sap.ui.getCore().byId("idMsgTypeDrpDwnEDITL").setValue("");
		 if(sap.ui.getCore().byId("idMsgTypeDrpDwnEDITL")){
         	  sap.ui.getCore().byId("idMsgTypeDrpDwnEDITL").setValueState(sap.ui.core.ValueState.None);
         	  sap.ui.getCore().byId("idMsgTypeDrpDwnEDITL").setPlaceholder("Message Type");
           }
		sap.ui.getCore().byId("idUnitTypeEDITL").setValue("");
		 if(sap.ui.getCore().byId("idUnitTypeEDITL")){
         	  sap.ui.getCore().byId("idUnitTypeEDITL").setValueState(sap.ui.core.ValueState.None);
         	  sap.ui.getCore().byId("idUnitTypeEDITL").setPlaceholder("Unit Number");
           }

		if(sap.ui.getCore().byId("idTblLogResultsEDITL")){
			sap.ui.getCore().byId("idTblLogResultsEDITL").destroy();
		}
	}
});

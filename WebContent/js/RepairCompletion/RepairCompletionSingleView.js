/* MACALPHA19032018 - Changes done by Seyed Ismail on 19.03.2018 for Alpha Changes
1. Remove Unit Part Code information MACALPHA19032018_1
2. Add Lessor Survey and remove additional, superseding, pre sales, pre delivery MACALPHA19032018_2
3. Remove sale grade and add CW & Notes field MACALPHA19032018_3
4. Get the latest work order detail from SAP MACALPHA19032018_4
5. Show Labour Rate on screen MACALPHA19032018_5
6. Remove unwanted responsibility codes MACALPHA19032018_6
7. Repair Completion Page changes MACALPHA19032018_7
*/
var depotNameListRCS = [];
var msgTransRCS = [];
var vDepotVal;
var vSerNo;
var vUPC;
var vEstType;
var vProgressType;
var vRepairCompltDate;
var loggedInUserTypeRCS= "";
sap.ui.model.json.JSONModel.extend("repairComplSingleView", {

	createRepairComplSingle: function(){


		var oCurrRCS = this;

		// Labels
		var oLabelDepot = new sap.ui.commons.Label({text: "Depot:",
			required: true,
			layoutData: new sap.ui.layout.GridData({span: "L2 M2 S8",linebreak: false, margin: true}),
            wrapping: true}).addStyleClass("marginTop15");

		var oLabelSerialNo = new sap.ui.commons.Label({text: "Serial Number:",
			required: true,
			layoutData: new sap.ui.layout.GridData({span: "L2 M2 S8",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("marginTop15");

		var oLabelUnitPartCode = new sap.ui.commons.Label({text: "Unit Part Code:",
			required: true,
			layoutData: new sap.ui.layout.GridData({span: "L2 M2 S8",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("marginTop15");

		var oLabelEstType = new sap.ui.commons.Label({text: "Estimate Type:",
			required: true,
			layoutData: new sap.ui.layout.GridData({span: "L2 M2 S8",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("marginTop15");

		var oLabelProgressType = new sap.ui.commons.Label({text: "Progress Type: ",
			required: true,
			layoutData: new sap.ui.layout.GridData({span: "L2 M2 S8",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("marginTop15");

		var oLabelRepairProgressDate = new sap.ui.commons.Label({text: "Repair Completion Date:",	// MACALPHA19032018_7 changed from repair progress to repair completion
			required: true,
			layoutData: new sap.ui.layout.GridData({span: "L2 M2 S8",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("marginTop15");

		var oLabelMandatory = new sap.ui.commons.Label({text: "Mandatory Field",
			required: true,
			requiredAtBegin : true,
            wrapping: true}).addStyleClass("margin10 marginTop33");

		var oLabelSpaceRCS = new sap.ui.commons.Label({text: " ",
			width:"8px",
            wrapping: true});

		var oListDepotRCS = new sap.ui.core.HTML("idListDepotComboRCS",{layoutData: new sap.ui.layout.GridData({span: "L4 M6 S12"})});
		var htmlContentDepot = '<input disabled="disabled" id="idListDepotRCS" placeholder="Select Depot" class="FormInputStyle marginTop10" style="width:100%;height:38px">';
		oListDepotRCS.setContent(htmlContentDepot);

	 // Text Field
    	oInputDepotRCS = new sap.ui.commons.TextField('depotTextfieldRCS',{
    		layoutData: new sap.ui.layout.GridData({span: "L1 M1 S8",linebreak: false, margin: true}),
    		placeholder:"Depot Code",
    	}).addStyleClass("FormInputStyle marginTop10 DepotInput38px");

    	/*oInputDepotRCS.attachChange(
                function(oEvent){
                        if(isNaN(oInputDepotRCS.getValue())){
                                oEvent.oSource.setValueState(sap.ui.core.ValueState.Error);
                                oEvent.oSource.setValue("");
                                oEvent.oSource.setPlaceholder("Invalid Value");
                        }else{
                                oEvent.oSource.setValueState(sap.ui.core.ValueState.None);
                        }
                }
    		);*/

    	oInputSerialNoRCS = new sap.ui.commons.TextField("idSerNoInputRCS",{
    		layoutData: new sap.ui.layout.GridData({span: "L2 M9 S9"}),
    		placeholder:"Serial Number",
    		change: function(){
    			if(this.getValue() != ""){
					 this.setValueState(sap.ui.core.ValueState.None);
				 }
    		}
    	}).addStyleClass("FormInputStyle marginTop10 DepotInput38px");

    	oInputSerialNoRCS.setMaxLength(11);

    	 var oComboUnitPartCode = new sap.ui.commons.DropdownBox("idUnitPartCodeDRpDwnRCS", {
			  layoutData: new sap.ui.layout.GridData({span: "L2 M8 S4"}),
			  change:function(){
				  this.setValueState(sap.ui.core.ValueState.None);
				  this.setPlaceholder("Select Unit Part Code");
			  },
	          items: [
	                 new sap.ui.core.ListItem({text: "", key: "1"}),
                     new sap.ui.core.ListItem({text: "Container", key: "C"}),
                     new sap.ui.core.ListItem({text: "Machinery", key: "M"}),
	                ],
			  displaySecondaryValues:false, placeholder:"Select Unit Part Code"}).addStyleClass("FormInputStyle marginTop10 DepotInput38px");
    	 oComboUnitPartCode.setSelectedKey("C");	//// MACALPHA19032018_7 changed from 1 to C


    	 var oComboEstType = new sap.ui.commons.DropdownBox("idEstTypeDrpDwnRCS", {
			  layoutData: new sap.ui.layout.GridData({span: "L2 M8 S4"}),
			  change:function(){
				  this.setValueState(sap.ui.core.ValueState.None);
				  this.setPlaceholder("Select Estimate Type");
			  },
	          items: [
	                 new sap.ui.core.ListItem({text: "", key: "0"}),
                     new sap.ui.core.ListItem({text: "Original", key: "Original"}),
                     new sap.ui.core.ListItem({text: "Additional", key: "Additional"}),
                     new sap.ui.core.ListItem({text: "Superseding", key: "Superseding"}),
                     new sap.ui.core.ListItem({text: "Pre-Delivery", key: "Pre-Delivery"}),
                     new sap.ui.core.ListItem({text: "Pre-Sales", key: "Pre-Sales"}),
                     new sap.ui.core.ListItem({text: "Joint Survey", key: "Joint Survey"}),
	                ],
			  displaySecondaryValues:false, placeholder:"Select Estimate Type"}).addStyleClass("FormInputStyle marginTop10 DepotInput38px");
    	 oComboEstType.setSelectedKey("0");

    	 var oComboProgressType = new sap.ui.commons.DropdownBox("idProgressTypeRCS", {
			  layoutData: new sap.ui.layout.GridData({span: "L2 M8 S4"}),
			  change:function(){
				  this.setValueState(sap.ui.core.ValueState.None);
				  this.setPlaceholder("Select Progress Type");
			  },
	          items: [
                     new sap.ui.core.ListItem({text: "Post Repair Inspection", key: "M"}),
	                ],
			  displaySecondaryValues:false, placeholder:"Select Progress Type"}).addStyleClass("FormInputStyle marginTop10 DepotInput38px");
    	 oComboProgressType.setSelectedKey("M");

    	var oModelCurrDateRCS = new sap.ui.model.json.JSONModel();
		oModelCurrDateRCS.setData({
	   		dateValue: new Date()
		});

    	oInputDateRCS = new sap.ui.commons.DatePicker("idRepairPrgsDateRCS",{
    		value: {
                path: "/dateValue",
                type: new sap.ui.model.type.Date({pattern: "dd-MM-yyyy"})
    			},
    			layoutData: new sap.ui.layout.GridData({span: "L2 M9 S9"}),
    	});
    	oInputDateRCS.setModel(oModelCurrDateRCS);
    	oInputDateRCS.addStyleClass("FormInputStyle marginTop10 DepotInput38px");
    	oInputDateRCS.setLocale("en-US");
    	oInputDateRCS.attachChange(
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

    	// Buttons
	   	 var oBtnAddMoveSubmit = new sap.m.Button("idBtnAddMoveSubmitRCS",{
		          text : "Submit",
		          width:"80px",
		          styled:false,
		          layoutData: new sap.ui.layout.GridData({span: "L2 M5 S4",linebreak: true, margin: true}),
		          press:function(){
		        	  if(oCurrRCS.validateRepairCompltSingle()){
		        		  oCurrRCS.getTransactionDataRCS();
		        	  }
		          }}).addStyleClass("submitBtn marginTop10");

	   	var oBtnAddMoveRemoveFilter = new sap.m.Button("idBtnAddMoveRemoveFilterRCS",{
	          text : "Remove Filter",
	          //width:"115px",
	          styled:false,
	          enabled:false,
	          press:function(){
		          oInputDepotRCS.setValue("");
		          $("#idListDepotRCS").val("");
		          this.setEnabled(false);
	          }}).addStyleClass("submitBtn marginTop5");

	   	 var oBtnAddMoveApplyFilter = new sap.m.Button("idBtnAddMoveApplyFilterRCS",{
		          text : "Apply Filter",
		          //width:"115px",
		          styled:false,
		          press:function(){
		        	  if(oInputDepotRCS.getValue() == ""){
		          		  /*oInputDepotRCS.setValueState(sap.ui.core.ValueState.Error);
		          		  oInputDepotRCS.setValue("");
		          		  oInputDepotRCS.setPlaceholder("Required");*/
		        		  $("#idListDepotRCS").val("");
		          	  }
		          	  else{
		          		oBtnAddMoveRemoveFilter.setEnabled(true);
		          	 document.getElementById("idListDepotRCS").style.borderColor = "#cccccc";
						document.getElementById("idListDepotRCS").style.background = "#ffffff";
				          		var depotCodeRCS = new RegExp(oInputDepotRCS.getValue());
				          		  for(var i=0; i<depotNameListRCS.length; i++){
				          			var depotNameRCS = depotNameListRCS[i];
					          		/*var resultRCS = depotCodeRCS.test(depotNameRCS);
					          		if(resultRCS){*/
				          			var partsRCS = depotNameRCS.split("-");
				          			var depotCodeRCS = partsRCS[3];
				          			if(depotCodeRCS == oInputDepotRCS.getValue()){
					          			$("#idListDepotRCS").val(depotNameRCS);
					          			break;
					          		}
					          		else{
					          			$("#idListDepotRCS").val("");
					          		}
				          		  }
		          	  }
		        	  }}).addStyleClass("submitBtn marginTop5");

	   	var oFlexApplyRemoveRCS = new sap.m.FlexBox({
	           items: [
						oBtnAddMoveApplyFilter,
						oLabelSpaceRCS,
						oBtnAddMoveRemoveFilter
	           ],
	           layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12",linebreak: false, margin: false}),
	           direction : "Row",
				});

			  // Responsive Grid Layout
			    var oAddMoveSingleLayout = new sap.ui.layout.form.ResponsiveGridLayout("idRepairCompltnSingleLayout",{
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
			     var oAddMoveSingleForm = new sap.ui.layout.form.Form("idRepairCompltnSingleForm",{
			             layout: oAddMoveSingleLayout,
			             formContainers: [

			                     new sap.ui.layout.form.FormContainer("idRepairCompltnSingleFormC1",{
		                             formElements: [
														new sap.ui.layout.form.FormElement({
														    fields: [oLabelDepot, oListDepotRCS, oInputDepotRCS,oFlexApplyRemoveRCS]
														}),
														new sap.ui.layout.form.FormElement({
														    fields: [oLabelSerialNo, oInputSerialNoRCS]
														}),
														//MACALPHA19032018_7- hidden unit part code section by defaulting to Carcass "C"
														/*new sap.ui.layout.form.FormElement({
														    fields: [oLabelUnitPartCode, oComboUnitPartCode]
														}),	hidden estimate type section
														new sap.ui.layout.form.FormElement({
														    fields: [oLabelEstType, oComboEstType]
														}),	hidden progress type section
														new sap.ui.layout.form.FormElement({
														    fields: [oLabelProgressType, oComboProgressType]
														}),*/
														new sap.ui.layout.form.FormElement({
														    fields: [oLabelRepairProgressDate, oInputDateRCS]
														}),
														new sap.ui.layout.form.FormElement({
														    fields: [oBtnAddMoveSubmit]
														}),
														new sap.ui.layout.form.FormElement({
														    fields: [oLabelMandatory]
														}),
			                                     ]
			                     }),
			             ]
			     });

			  // Responsive Grid Layout
				    var oMsgTransLayoutRCS = new sap.ui.layout.form.ResponsiveGridLayout("idMsgTransLayoutRCS",{
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
				     var oMsgTransRCSForm = new sap.ui.layout.form.Form("idMsgTransRCSForm",{
				             layout: oMsgTransLayoutRCS,
				             formContainers: [

				                     new sap.ui.layout.form.FormContainer({
			                             formElements: [
															new sap.ui.layout.form.FormElement("idMsgTransRCS",{
															    fields: [],
															    layoutData: new sap.ui.layout.GridData({span: "L9 M9 S4",linebreak: true, margin: true})
															}),
															new sap.ui.layout.form.FormElement("idShowErrorMsgsReasonsTblRCS",{
															    fields: [],
															    layoutData: new sap.ui.layout.GridData({span: "L9 M9 S4",linebreak: true, margin: true})
															})
				                                     ]
				                     }),
				             ]
				     });

				     var oFlexAllRCS = new sap.m.FlexBox({
	    		           items: [
	    							oAddMoveSingleForm,
	    							oMsgTransRCSForm
	    		           ],
	    		           direction : "Column",
	    					});

			     	return oFlexAllRCS;

	},

	populateDepotNameRCS: function(){
		busyDialog.open();
		oModel = new sap.ui.model.odata.ODataModel(serviceUrl15, true);
		var urlToCall = serviceUrl15 + "/F4_Functional_Location";
		//alert("urlToCallRCSDep : "+urlToCallRCSDep);
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
		    	//alert("data.results.length : "+data.results.length);
		    	for ( var i = 0; i < data.results.length ; i++) {
		    		depotNameListRCS[i] = data.results[i].FunctionalLoc;
				}

		    	//alert("depotNameListRCS len : "+depotNameListRCS.length);
		//depotNameListRCS = aGlobalDepotNames;
		    	$( "#idListDepotRCS" ).autocomplete({
		    	      source: depotNameListRCS,
		    	      minLength: 0,
		    	      select: function(){
		    	    	  document.getElementById("idListDepotRCS").style.borderColor = "#cccccc";
		  				  document.getElementById("idListDepotRCS").style.background = "#ffffff";
		  				  $("#idListDepotRCS").attr("placeholder","Select Depot");
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
		    	    for (i in depotNameListRCS) {
		    	        if (depotNameListRCS[i].toLowerCase().match(this.value.toLowerCase())) {
		    	            isValid = true;
		    	        }
		    	    }
		    	    if (!isValid) {
		    	        this.value = previousValue;
		    	    } else {
		    	        previousValue = this.value;
		    	    }
		    	});
		    	loggedInUserTypeRCS = objLoginUser.getLoggedInUserType();
				if(loggedInUserTypeRCS == "SEACO"){
					$("#idListDepotRCS").removeAttr('disabled');
					$("#idListDepotRCS").attr("disabled","disabled");
					sap.ui.getCore().byId("idBtnAddMoveRemoveFilterRCS").setEnabled(false);
					sap.ui.getCore().byId("idBtnAddMoveApplyFilterRCS").setEnabled(true);
					sap.ui.getCore().byId("depotTextfieldRCS").setEnabled(true);
				}
				else{
					var DepotCode = objLoginUser.getLoggedInUserID();
					for(var i=0;i<depotNameListRCS.length;i++){
						if(depotNameListRCS[i].substring(11,15) == DepotCode)
							DepotCode = depotNameListRCS[i];
					}
					$("#idListDepotRCS").attr("disabled","disabled");
					$("#idListDepotRCS").val(DepotCode);
					var depotRCS = document.getElementById("idListDepotRCS").value.split("-");
					sap.ui.getCore().byId("depotTextfieldRCS").setValue(depotRCS[3]);
					sap.ui.getCore().byId("idBtnAddMoveRemoveFilterRCS").setEnabled(false);
					sap.ui.getCore().byId("idBtnAddMoveApplyFilterRCS").setEnabled(false);
					sap.ui.getCore().byId("depotTextfieldRCS").setEnabled(false);
				}
		    	busyDialog.close();
		    },
		    function(err){
		    	 errorfromServer(err);
		    	//alert("Error while Reading Result : "+ : window.JSON.stringify(err.response));
		    });
	},

	validateRepairCompltSingle: function(){

		var vDepotVal = document.getElementById("idListDepotRCS").value;
		 vSerNo = sap.ui.getCore().byId("idSerNoInputRCS");
		 vUPC = sap.ui.getCore().byId("idUnitPartCodeDRpDwnRCS");
		 vEstType = sap.ui.getCore().byId("idEstTypeDrpDwnRCS");
		 vProgressType = sap.ui.getCore().byId("idProgressTypeRCS");
		 vRepairCompltDate = sap.ui.getCore().byId("idRepairPrgsDateRCS");
		 isValid = true;

		if(vDepotVal.trim().length == 0){
			document.getElementById("idListDepotRCS").style.borderColor = "red";
    		document.getElementById("idListDepotRCS").style.background = "#FAD4D4";
    		$("#idListDepotRCS").attr("placeholder","Required");
    		isValid = false;
		}
		if(vDepotVal.trim().length > 0){
			var match = jQuery.inArray(vDepotVal,depotNameListRCS);
			if(match < 0){
				document.getElementById("idListDepotRCS").style.borderColor = "red";
	    		document.getElementById("idListDepotRCS").style.background = "#FAD4D4";
	    		document.getElementById("idListDepotRCS").value = "";
	    		document.getElementById("idListDepotRCS").placeholder = "Invalid Depot";
	    		isValid = false;
			}
			else{
				document.getElementById("idListDepotRCS").style.borderColor = "#cccccc";
	    		document.getElementById("idListDepotRCS").style.background = "#ffffff";
	    		document.getElementById("idListDepotRCS").placeholder = "Depot";
			}
		}
		if(vSerNo.getValue().trim().length == 0){
			vSerNo.setValueState(sap.ui.core.ValueState.Error);
			vSerNo.setValue("");
			vSerNo.setPlaceholder("Required");
			isValid = false;
		}

		/*if(vUPC.getValue().trim().length == 0){
			vUPC.setValueState(sap.ui.core.ValueState.Error);
			vUPC.setValue("");
			vUPC.setPlaceholder("Required");
			isValid = false;
		}

		if(vEstType.getValue().trim().length == 0){
			vEstType.setValueState(sap.ui.core.ValueState.Error);
			vEstType.setValue("");
			vEstType.setPlaceholder("Required");
			isValid = false;
		}

		if(vEstType.getValue().trim().length == 0){
			vEstType.setValueState(sap.ui.core.ValueState.Error);
			vEstType.setValue("");
			vEstType.setPlaceholder("Required");
			isValid = false;
		}*/

		if(vRepairCompltDate.getValue().trim().length == 0){
			vRepairCompltDate.setValueState(sap.ui.core.ValueState.Error);
			vRepairCompltDate.setValue("");
			vRepairCompltDate.setPlaceholder("Required");
			isValid = false;
		}

		return isValid;
	},

	getTransactionDataRCS: function(){
		var oCurrRCS = this;
		busyDialog.open();

		msgTransRCS = [];

		if(sap.ui.getCore().byId("idMsgTransRCS")){
			sap.ui.getCore().byId("idMsgTransRCS").destroyFields();
		}

		var splitDateRCS = vRepairCompltDate.getValue().split("-");
		var dateToPassRCS = splitDateRCS[2]+splitDateRCS[1]+splitDateRCS[0];

		var selDepValRCS = document.getElementById("idListDepotRCS").value;
	    var partsDepRCS = selDepValRCS.split("-");
	    var vInDepotValRCS = partsDepRCS[0]+"-"+partsDepRCS[1]+"-"+partsDepRCS[2]+"-"+partsDepRCS[3];

	    var paramString = vSerNo.getValue().trim().toUpperCase() + "$" + vInDepotValRCS + "$" + vUPC.getSelectedKey() + "$" + vEstType.getSelectedKey() +  "$" + vProgressType.getSelectedKey() + "$" + dateToPassRCS;
	    oModel = new sap.ui.model.odata.ODataModel(serviceUrl15_old, true);
	    var urlToCall = serviceUrl15_old + "/Repair_Progress_ECC?$filter=IRepairPro1 eq '" + paramString + "'";
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
		    	if(data.results.length == 0){
		    		 busyDialog.close();
		    		sap.ui.commons.MessageBox.show("No Result Found. Please try again.",
                           sap.ui.commons.MessageBox.Icon.WARNING,
                           "Warning",
                           [sap.ui.commons.MessageBox.Action.OK],
                           sap.ui.commons.MessageBox.Action.OK);

		    		if(sap.ui.getCore().byId("idMsgTransRCS")){
		    			sap.ui.getCore().byId("idMsgTransRCS").destroyFields();
		    		}
		    		if(sap.ui.getCore().byId("idShowErrorMsgsReasonsTblRCS")){
		    			sap.ui.getCore().byId("idShowErrorMsgsReasonsTblRCS").destroyFields();
		    		}
		    	}
		    	else{
		    		msgTransRCS = [];
		    		msgErrorsReasonsRCS = [];

		    			msgTransRCS = jQuery.grep(data.results, function(element, index){
		    	             return element.Type == "D";
		    	     	});

		    			msgErrorsReasonsRCS = jQuery.grep(data.results, function(element, index){
		    	             return element.Type == "E";
		    	     	});

		    			for(var j=0; j<msgErrorsReasonsRCS.length; j++){
		    				//var trimmedMsgRCS = msgErrorsReasonsRCS[j].Message.substring(2);
		    				var trimmedMsgRCS = msgErrorsReasonsRCS[j].Message.split(":");
		    				msgErrorsReasonsRCS[j].Message = trimmedMsgRCS[1];
		    			}

		    		for(var i=0;i<msgTransRCS.length;i++){
		    			//alert("msg : "+msgTransRCS[i].Message);
		    			var oImgServerResp = new sap.ui.commons.Image({
		    				layoutData: new sap.ui.layout.GridData({linebreak: true, margin: true})
		    			});

		    			oImgServerResp.setSrc("images/server_response.png");

		    			var oLabelBlankRCS = new sap.ui.commons.Label({
		    				width:"5px"
		    			});
		    			oLabelBlankRCS.setText("");

		    			var msgToShowRCS = new sap.ui.commons.TextView({
		    				layoutData: new sap.ui.layout.GridData({span: "L11 M11 S11",linebreak: true, margin: true})
		    			}).addStyleClass("wraptext");

		    			var oFlexRCSImgMsg = new sap.m.FlexBox({
		    		           items: [
		    							oImgServerResp,
		    							oLabelBlankRCS,
		    							msgToShowRCS
		    		           ],
		    		           direction : "Row",
		    		           layoutData: new sap.ui.layout.GridData({span: "L11 M11 S11",linebreak: true, margin: true})
		    					}).addStyleClass("margin5");

		    			var dispMsg = msgTransRCS[i].Message.trim().split(":");
		    			msgToShowRCS.setText(dispMsg[1]);

		    			sap.ui.getCore().byId("idMsgTransRCS").insertField(oFlexRCSImgMsg,i);
		    		}

		    		if(msgErrorsReasonsRCS.length > 0){
		    			oCurrRCS.createErrorTableRCS();
		    		}
		    		else{
		    			if(sap.ui.getCore().byId("idTblErrorMsgsRCS")){
		    				sap.ui.getCore().byId("idTblErrorMsgsRCS").destroy();
		    			}
		    		}

		    		busyDialog.close();
		    	}
		    },
		    function(err){
		    	 busyDialog.close();
		    	 errorfromServer(err);
		    	//alert("Error while Reading Result : "+ window.JSON.stringify(err.response));
		    });
	},

	createErrorTableRCS: function(){
		if(sap.ui.getCore().byId("idTblErrorMsgsRCS")){
			sap.ui.getCore().byId("idTblErrorMsgsRCS").destroy();
		}

		// Table
    	var oErrorMsgsRCSTable = new sap.ui.table.Table("idTblErrorMsgsRCS",{
            columnHeaderHeight: 30,
            selectionMode: sap.ui.table.SelectionMode.None,
            width:"50%",
            height:"100%"
    	 }).addStyleClass("marginTop15 tblBorder");

    	oErrorMsgsRCSTable.setVisibleRowCount(msgErrorsReasonsRCS.length);

    	// Table Columns
    	oErrorMsgsRCSTable.addColumn(new sap.ui.table.Column({
      		 label: new sap.ui.commons.Label({text: "Error Type"}),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "Type"),
    		 resizable:false,
    		 width:"40px",
             sortProperty: "Type",
             filterProperty: "Type",
    		 }));

    	oErrorMsgsRCSTable.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Error Message"}),
			 template: new sap.ui.commons.TextView().bindProperty("text", "Message").addStyleClass("wraptext"),
			 resizable:false,
			 width:"150px",
             sortProperty: "Message",
             filterProperty: "Message",
			 }));

    	var oModelErrorMsgsRCS = new sap.ui.model.json.JSONModel();
    	oModelErrorMsgsRCS.setData({modelData: msgErrorsReasonsRCS});
    	oErrorMsgsRCSTable.setModel(oModelErrorMsgsRCS);
    	oErrorMsgsRCSTable.bindRows("/modelData");

    	sap.ui.getCore().byId("idShowErrorMsgsReasonsTblRCS").insertField(oErrorMsgsRCSTable);
	},

	resetRepComplS: function(){

       var oModel = new sap.ui.model.json.JSONModel();
        oModel.setData({
               dateValue: new Date()
        });

        loggedInUserTypeRCS = objLoginUser.getLoggedInUserType();

        if(loggedInUserTypeRCS == "SEACO"){
               $("#idListDepotRCS").val("");
               sap.ui.getCore().byId("depotTextfieldRCS").setValue("");

               if(document.getElementById("idListDepotRCS")){
	                document.getElementById("idListDepotRCS").style.borderColor = "#cccccc";
		    		document.getElementById("idListDepotRCS").style.background = "#ffffff";
		    		document.getElementById("idListDepotRCS").placeholder = "Select Depot";
              }
               if(sap.ui.getCore().byId("idBtnAddMoveRemoveFilterRCS")){
                	sap.ui.getCore().byId("idBtnAddMoveRemoveFilterRCS").setEnabled(false);
                }
        }

        sap.ui.getCore().byId("idSerNoInputRCS").setValue("");
        sap.ui.getCore().byId("idUnitPartCodeDRpDwnRCS").setValue("");
        sap.ui.getCore().byId("idEstTypeDrpDwnRCS").setValue("");
        sap.ui.getCore().byId("idRepairPrgsDateRCS").setModel(oModel);

        if(sap.ui.getCore().byId("idSerNoInputRCS")){
       	  sap.ui.getCore().byId("idSerNoInputRCS").setValueState(sap.ui.core.ValueState.None);
       	  sap.ui.getCore().byId("idSerNoInputRCS").setPlaceholder("Serial Number");
         }
         if(sap.ui.getCore().byId("idUnitPartCodeDRpDwnRCS")){
        	  sap.ui.getCore().byId("idUnitPartCodeDRpDwnRCS").setValueState(sap.ui.core.ValueState.None);
        	  sap.ui.getCore().byId("idUnitPartCodeDRpDwnRCS").setPlaceholder("Select Unit Part Code");
          }
         if(sap.ui.getCore().byId("idEstTypeDrpDwnRCS")){
        	  sap.ui.getCore().byId("idEstTypeDrpDwnRCS").setValueState(sap.ui.core.ValueState.None);
        	  sap.ui.getCore().byId("idEstTypeDrpDwnRCS").setPlaceholder("Select Estimate Type");
          }
         if(sap.ui.getCore().byId("idRepairPrgsDateRCS")){
        	  sap.ui.getCore().byId("idRepairPrgsDateRCS").setValueState(sap.ui.core.ValueState.None);
        	  sap.ui.getCore().byId("idRepairPrgsDateRCS").setPlaceholder("");
        	 // sap.ui.getCore().byId("idRepairPrgsDateRCS").setValue(new Date());
          }

        if(sap.ui.getCore().byId("idMsgTransRCS")){
			sap.ui.getCore().byId("idMsgTransRCS").destroyFields();
		}

        if(sap.ui.getCore().byId("idShowErrorMsgsReasonsTblRCS")){
			sap.ui.getCore().byId("idShowErrorMsgsReasonsTblRCS").destroyFields();
		}
 }

});

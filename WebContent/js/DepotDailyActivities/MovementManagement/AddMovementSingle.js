/******** NP *******/
jQuery.sap.require("sap.ui.model.json.JSONModel");

var loggedInUserTypeAMOS = "";
var vInputDepotValAMOS = "";
var vInputSerialNoValAMOS = "";
var vInputDateValAMOS = "";
var vInputAuthValAMOS = "";
var oInputDepotAMOS;
var oInputSerialNoAMOS;
var oInputDateAMOS;
var oInputAuthAMOS;
var vInputDepotListAMOS;
var oComboDepotAMOS;
var oListDepotAMOS;
var isValidAMOS = false;
var msgTransAMOS = [];
var msgErrorsReasonsAMOS = [];
var depotNameListAMOS = [];
var flagOnChangeDepotNameAMOS = false;
var flagOnChangeDepotCodeAMOS = false;

sap.ui.model.json.JSONModel.extend("addMovemntSingleView", {
	
	createAddMovemntSingle: function(){
		
		var oCurrAMOS = this;
		
		// Labels
		var oLabelDepot = new sap.ui.commons.Label({text: "Depot:",
			required: true,
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
            wrapping: true}).addStyleClass("marginTop15");
		
		var oLabelSerialNo = new sap.ui.commons.Label({text: "Serial Number:",
			required: true,
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S3",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("marginTop15");
		
		var oLabelDate = new sap.ui.commons.Label({text: "Date:",
			required: true,
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S3",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("marginTop15");
		
		var oLabelAuth = new sap.ui.commons.Label({text: "Authorisation:",
			required: true,
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S3",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("marginTop15");
		
		var oLabelMandatory = new sap.ui.commons.Label({text: "Mandatory Field",
			required: true,
			requiredAtBegin : true,
            wrapping: true}).addStyleClass("margin10 marginTop33");
		
		var oLabelSpaceAMOS = new sap.ui.commons.Label({text: " ",
			width:"8px",
            wrapping: true});
		
		var oListDepotAMOS = new sap.ui.core.HTML("idListDepotComboAMOS",{layoutData: new sap.ui.layout.GridData({span: "L4 M6 S12"})});
		var htmlContentDepot = '<input disabled="disabled" id="idListDepotAMOS" placeholder="Select Depot" class="FormInputStyle marginTop10" style="width:100%;height:38px">';
		oListDepotAMOS.setContent(htmlContentDepot);
		
	 // Text Field
    	oInputDepotAMOS = new sap.ui.commons.TextField('depotTextfieldAMOS',{
    		layoutData: new sap.ui.layout.GridData({span: "L1 M1 S8",linebreak: false, margin: true}),
    		placeholder:"Depot Code",
    	}).addStyleClass("FormInputStyle marginTop10 DepotInput38px");

    	/*oInputDepotAMOS.attachChange(
                function(oEvent){
                        if(isNaN(oInputDepotAMOS.getValue())){
                                oEvent.oSource.setValueState(sap.ui.core.ValueState.Error);
                                oEvent.oSource.setValue("");
                                oEvent.oSource.setPlaceholder("Invalid Value");
                        }else{
                                oEvent.oSource.setValueState(sap.ui.core.ValueState.None);
                        }
                }
    		);*/
    	
    	oInputSerialNoAMOS = new sap.ui.commons.TextField("idSerNoInputAMOS",{
    		layoutData: new sap.ui.layout.GridData({span: "L2 M9 S9"}),
    		placeholder:"Serial Number",
    		change: function(){
    			if(this.getValue() != ""){
					 this.setValueState(sap.ui.core.ValueState.None);
				 }
    		}
    	}).addStyleClass("FormInputStyle marginTop7");
    	
    	oInputSerialNoAMOS.setMaxLength(11);
    	
    	var oModelCurrDateAMOS = new sap.ui.model.json.JSONModel();
		oModelCurrDateAMOS.setData({
	   		dateValue: new Date()
		});
    	
    	oInputDateAMOS = new sap.ui.commons.DatePicker("idDateAMOS",{
    		value: {
                path: "/dateValue",
                type: new sap.ui.model.type.Date({pattern: "dd-MM-yyyy"})
    			},
    			layoutData: new sap.ui.layout.GridData({span: "L2 M9 S9"}),
    	});
    	oInputDateAMOS.setModel(oModelCurrDateAMOS);
    	oInputDateAMOS.addStyleClass("FormInputStyle margin5Top");
    	oInputDateAMOS.setLocale("en-US");
    	oInputDateAMOS.attachChange(
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
    	
    	oInputAuthAMOS = new sap.ui.commons.TextField("idAuthAMOS",{
    		layoutData: new sap.ui.layout.GridData({span: "L2 M9 S9"}),
    		placeholder:"Authorisation",
    		change: function(){
    			if(this.getValue() != ""){
					 this.setValueState(sap.ui.core.ValueState.None);
				 }
    		}
    	}).addStyleClass("FormInputStyle margin5Top");
    	
    	// Buttons
	   	 var oBtnAddMoveSubmit = new sap.m.Button("idBtnAddMoveSubmitAMOS",{
		          text : "Submit",
		          width:"80px",
		          styled:false,
		          layoutData: new sap.ui.layout.GridData({span: "L2 M5 S4",linebreak: true, margin: true}),
		          press:function(){
		        	  if(oCurrAMOS.validateMoveOutSingle()){
		        	  oCurrAMOS.getTransactionDataAMOS();
		        	  }
		          }}).addStyleClass("submitBtn marginTop10");
	   	 
	   	var oBtnAddMoveRemoveFilter = new sap.m.Button("idBtnAddMoveRemoveFilterAMOS",{
	          text : "Remove Filter",
	          width:"115px",
	          styled:false,
	          enabled:false,
	          press:function(){
		          oInputDepotAMOS.setValue("");
		          $("#idListDepotAMOS").val("");
		          this.setEnabled(false);
	          }}).addStyleClass("submitBtn marginTop5");
	   	
	   	 var oBtnAddMoveApplyFilter = new sap.m.Button("idBtnAddMoveApplyFilterAMOS",{
		          text : "Apply Filter",
		          width:"115px",
		          styled:false,
		          press:function(){
		        	  if(oInputDepotAMOS.getValue() == ""){
		          		  /*oInputDepotAMOS.setValueState(sap.ui.core.ValueState.Error);
		          		  oInputDepotAMOS.setValue("");
		          		  oInputDepotAMOS.setPlaceholder("Required");*/
		        		  $("#idListDepotAMOS").val("");
		          	  }
		          	  else{
		          		oBtnAddMoveRemoveFilter.setEnabled(true);
		          	 document.getElementById("idListDepotAMOS").style.borderColor = "#cccccc";
						document.getElementById("idListDepotAMOS").style.background = "#ffffff";
				          		var depotCodeAMOS = new RegExp(oInputDepotAMOS.getValue());
				          		  for(var i=0; i<depotNameListAMOS.length; i++){
				          			var depotNameAMOS = depotNameListAMOS[i];
					          		/*var resultAMOS = depotCodeAMOS.test(depotNameAMOS);
					          		if(resultAMOS){*/
				          			var partsAMOS = depotNameAMOS.split("-");
				          			var depotCodeAMOS = partsAMOS[3];
				          			if(depotCodeAMOS == oInputDepotAMOS.getValue()){
					          			$("#idListDepotAMOS").val(depotNameAMOS);
					          			break;
					          		}
					          		else{
					          			$("#idListDepotAMOS").val("");
					          		}
				          		  }
		          	  }
		        	  
		          }
		        	  }).addStyleClass("submitBtn marginTop5");
	   	 
	   	var oFlexApplyRemoveAMOS = new sap.m.FlexBox({
	           items: [
						oBtnAddMoveApplyFilter,
						oLabelSpaceAMOS,
						oBtnAddMoveRemoveFilter
	           ],
	           layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12",linebreak: false, margin: false}),
	           direction : "Row",
				});
	   	 
			  // Responsive Grid Layout
			    var oAddMoveSingleLayout = new sap.ui.layout.form.ResponsiveGridLayout("idAddMoveOutSingleLayout",{
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
			     var oAddMoveSingleForm = new sap.ui.layout.form.Form("idAddMoveOutSingleForm",{
			             layout: oAddMoveSingleLayout,
			             formContainers: [
			                     
			                     new sap.ui.layout.form.FormContainer("idAddMoveOutSingleFormC1",{
		                             formElements: [
														new sap.ui.layout.form.FormElement({
														    fields: [oLabelDepot, oListDepotAMOS, oInputDepotAMOS,oFlexApplyRemoveAMOS]
														}),
														new sap.ui.layout.form.FormElement({
														    fields: [oLabelSerialNo, oInputSerialNoAMOS]
														}),
														new sap.ui.layout.form.FormElement({
														    fields: [oLabelDate, oInputDateAMOS]
														}),
														new sap.ui.layout.form.FormElement({
														    fields: [oLabelAuth, oInputAuthAMOS]
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
				    var oMsgTransLayoutAMOS = new sap.ui.layout.form.ResponsiveGridLayout("idMsgTransLayoutAMOS",{
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
				     var oMsgTransAMOSForm = new sap.ui.layout.form.Form("idMsgTransAMOSForm",{
				             layout: oMsgTransLayoutAMOS,
				             formContainers: [
				                     
				                     new sap.ui.layout.form.FormContainer({
			                             formElements: [
															new sap.ui.layout.form.FormElement("idMsgTransAMOS",{
															    fields: [],
															    layoutData: new sap.ui.layout.GridData({span: "L9 M9 S4",linebreak: true, margin: true})
															}),
															new sap.ui.layout.form.FormElement("idShowErrorMsgsReasonsTblAMOS",{
															    fields: [],
															    layoutData: new sap.ui.layout.GridData({span: "L9 M9 S4",linebreak: true, margin: true})
															})
				                                     ]
				                     }),
				             ]
				     });
				     
				     var oFlexAllAMOS = new sap.m.FlexBox({
	    		           items: [
	    							oAddMoveSingleForm,
	    							oMsgTransAMOSForm
	    		           ],
	    		           direction : "Column",
	    					});
				 	
			     	return oFlexAllAMOS;
	},
	
	validateMoveOutSingle: function(){
		
		vInputDepotValAMOS = oInputDepotAMOS.getValue();
		vInputSerialNoValAMOS = oInputSerialNoAMOS.getValue();
		vInputDateValAMOS = oInputDateAMOS.getValue();
		vInputAuthValAMOS = oInputAuthAMOS.getValue();
		vInputDepotListAMOS = document.getElementById("idListDepotAMOS").value;
		
		if(vInputSerialNoValAMOS!="" && vInputDateValAMOS != "" && vInputDepotListAMOS!="" && vInputAuthValAMOS!=""){
			isValidAMOS = true;
		}
		else{
			if(vInputDepotListAMOS == ""){
				document.getElementById("idListDepotAMOS").style.borderColor = "red";
	    		document.getElementById("idListDepotAMOS").style.background = "#FAD4D4";
	    		$("#idListDepotAMOS").attr("placeholder","Required");
				isValidAMOS = false;
		  	  }
		  	  else{
		  		var match = jQuery.inArray(vInputDepotListAMOS,depotNameListAMOS);
				if(match < 0){
					document.getElementById("idListDepotAMOS").style.borderColor = "red";
		    		document.getElementById("idListDepotAMOS").style.background = "#FAD4D4";
		    		document.getElementById("idListDepotAMOS").value = "";
		    		document.getElementById("idListDepotAMOS").placeholder = "Invalid Depot";
		    		isValid = false;
				}
				else{
					document.getElementById("idListDepotAMOS").style.borderColor = "#cccccc";
		    		document.getElementById("idListDepotAMOS").style.background = "#ffffff";
		    		document.getElementById("idListDepotAMOS").placeholder = "Depot";
				}
		  	  }
  	  if(vInputSerialNoValAMOS == ""){
  		  oInputSerialNoAMOS.setValueState(sap.ui.core.ValueState.Error);
  		  oInputSerialNoAMOS.setValue("");
  		  oInputSerialNoAMOS.setPlaceholder("Required");
  		isValidAMOS = false;
  	  }
  	  else{
  		  oInputSerialNoAMOS.setValueState(sap.ui.core.ValueState.None);
  	  }
  	  if(vInputDateValAMOS == ""){
  		  oInputDateAMOS.setValueState(sap.ui.core.ValueState.Error);
  		  oInputDateAMOS.setValue("");
  		  oInputDateAMOS.setPlaceholder("Required");
  		isValidAMOS = false;
  	  }
  	  else{
  		  oInputDateAMOS.setValueState(sap.ui.core.ValueState.None);
  	  }
  	  if(vInputAuthValAMOS == ""){
  		  oInputAuthAMOS.setValueState(sap.ui.core.ValueState.Error);
  		  oInputAuthAMOS.setValue("");
  		  oInputAuthAMOS.setPlaceholder("Required");
  		isValidAMOS = false;
  	  }
  	  else{
  		  oInputAuthAMOS.setValueState(sap.ui.core.ValueState.None);
  	  }
	} 
		return isValidAMOS;
	},
	
populateDepotNameAMOS: function(){
	
	busyDialog.open();
		oModel = new sap.ui.model.odata.ODataModel(serviceUrl15, true);
		var urlToCallAMOSDep = serviceUrl15 + "/F4_Functional_Location";
		//alert("urlToCallAMOSDep : "+urlToCallAMOSDep);
		OData.request({ 
		      requestUri: urlToCallAMOSDep,
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
		    		depotNameListAMOS[i] = data.results[i].FunctionalLoc;
				}
		    	
		    	//alert("depotNameListAMOS len : "+depotNameListAMOS.length);
		    	
		    	$( "#idListDepotAMOS" ).autocomplete({
		    	      source: depotNameListAMOS,
		    	      minLength: 0,
		    	      select: function(){
		    	    	  document.getElementById("idListDepotAMOS").style.borderColor = "#cccccc";
		  				  document.getElementById("idListDepotAMOS").style.background = "#ffffff";
		  				  $("#idListDepotAMOS").attr("placeholder","Select Depot");
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
		    	    for (i in depotNameListAMOS) {
		    	        if (depotNameListAMOS[i].toLowerCase().match(this.value.toLowerCase())) {
		    	            isValid = true;
		    	        }
		    	    }
		    	    if (!isValid) {
		    	        this.value = previousValue;
		    	    } else {
		    	        previousValue = this.value;
		    	    }
		    	});
		    	
		    	loggedInUserTypeAMOS = objLoginUser.getLoggedInUserType();
		    	//alert("loggedInUserTypeAMOS : "+loggedInUserTypeAMOS);
				if(loggedInUserTypeAMOS == "SEACO"){
					$("#idListDepotAMOS").removeAttr('disabled');
					$("#idListDepotAMOS").attr("disabled","disabled");
					sap.ui.getCore().byId("idBtnAddMoveRemoveFilterAMOS").setEnabled(false);
					sap.ui.getCore().byId("idBtnAddMoveApplyFilterAMOS").setEnabled(true);
					sap.ui.getCore().byId("depotTextfieldAMOS").setEnabled(true);
				}
				else{
					var DepotCode = objLoginUser.getLoggedInUserID();
					//alert("DepotCode : "+DepotCode);
					for(var i=0;i<depotNameListAMOS.length;i++){
						if(depotNameListAMOS[i].substring(11,15) == DepotCode)
							DepotCode = depotNameListAMOS[i];
					}
					$("#idListDepotAMOS").attr("disabled","disabled");
					$("#idListDepotAMOS").val(DepotCode);
					var depotAMOS = document.getElementById("idListDepotAMOS").value.split("-");
					sap.ui.getCore().byId("depotTextfieldAMOS").setValue(depotAMOS[3]);
					sap.ui.getCore().byId("idBtnAddMoveRemoveFilterAMOS").setEnabled(false);
					sap.ui.getCore().byId("idBtnAddMoveApplyFilterAMOS").setEnabled(false);
					sap.ui.getCore().byId("depotTextfieldAMOS").setEnabled(false);
				}

		    	busyDialog.close();
		    },
		    function(err){
		    	 errorfromServer(err);
		    	//alert("Error while Reading Result : "+ : window.JSON.stringify(err.response));
		    });
	},
	
	getTransactionDataAMOS: function(){
		
		var oCurrAMOS = this;
		
		oInputDepotAMOS.setValueState(sap.ui.core.ValueState.None);
		oInputSerialNoAMOS.setValueState(sap.ui.core.ValueState.None);
		oInputDateAMOS.setValueState(sap.ui.core.ValueState.None);
		oInputAuthAMOS.setValueState(sap.ui.core.ValueState.None);
		
		busyDialog.open();
		
		msgTransAMOS = [];
		
		if(sap.ui.getCore().byId("idMsgTransAMOS")){
			sap.ui.getCore().byId("idMsgTransAMOS").destroyFields();
		}
		
		var splitDateAMOS = vInputDateValAMOS.split("-");
		var dateToPassAMOS = splitDateAMOS[2]+splitDateAMOS[1]+splitDateAMOS[0];
		
		var selDepValAMOS = document.getElementById("idListDepotAMOS").value;
	    var partsDepAMOS = selDepValAMOS.split("-");
	    var vInDepotValAMOS = partsDepAMOS[3];
	    //pass func loc instead of full name because of & - 1 - oct
	    var vFuncLoc = partsDepAMOS[0] + "-" + partsDepAMOS[1] + "-" + partsDepAMOS[2] + "-" + partsDepAMOS[3];
		
		oModel = new sap.ui.model.odata.ODataModel(serviceUrl15, true);
		var urlToCallAMOS = serviceUrl15 + "/Gateout_Proxy?$filter=Igateout1  eq '" + vInputSerialNoValAMOS.toUpperCase().trim() + "$" + vFuncLoc + "$" + vInDepotValAMOS + "$" + vInputAuthValAMOS.trim() + "$" + dateToPassAMOS + "'";
		//alert("urlToCallAMOS : "+urlToCallAMOS);
		OData.request({ 
		      requestUri: urlToCallAMOS,
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
		    		msgTransAMOS = [];
		    		msgErrorsReasonsAMOS = [];
		    		
		    			msgTransAMOS = jQuery.grep(data.results, function(element, index){
		    	             return element.Type == "D";
		    	     	});
		    			
		    			msgErrorsReasonsAMOS = jQuery.grep(data.results, function(element, index){
		    	             return element.Type == "E";
		    	     	});
		    			
		    			for(var j=0; j<msgErrorsReasonsAMOS.length; j++){
		    				//var trimmedMsgAMOS = msgErrorsReasonsAMOS[j].Message.substring(2);
		    				var trimmedMsgAMOS = msgErrorsReasonsAMOS[j].Message.split(":");
		    				msgErrorsReasonsAMOS[j].Message = trimmedMsgAMOS[1];
		    			}
		    			
		    		for(var i=0;i<msgTransAMOS.length;i++){
		    			//alert("msg : "+msgTransAMOS[i].Message);
		    			var oImgServerResp = new sap.ui.commons.Image({
		    				layoutData: new sap.ui.layout.GridData({linebreak: true, margin: true})
		    			});
		    			
		    			oImgServerResp.setSrc("images/server_response.png");
		    			
		    			var oLabelBlankAMOS = new sap.ui.commons.Label({
		    				width:"5px"
		    			}); 
		    			oLabelBlankAMOS.setText(""); 
		    			
		    			var msgToShowAMOS = new sap.ui.commons.TextView({
		    				layoutData: new sap.ui.layout.GridData({span: "L11 M11 S11",linebreak: true, margin: true})
		    			}).addStyleClass("wraptext");
		    			
		    			var oFlexAMOSImgMsg = new sap.m.FlexBox({
		    		           items: [
		    							oImgServerResp,
		    							oLabelBlankAMOS,
		    							msgToShowAMOS
		    		           ],
		    		           direction : "Row",
		    		           layoutData: new sap.ui.layout.GridData({span: "L11 M11 S11",linebreak: true, margin: true})
		    					}).addStyleClass("margin5");
		    			
		    			var dispMsg = msgTransAMOS[i].Message.split(":");
		    			msgToShowAMOS.setText(dispMsg[1]);
		    			
		    			sap.ui.getCore().byId("idMsgTransAMOS").insertField(oFlexAMOSImgMsg,i);
		    		}
		    		
		    		if(msgErrorsReasonsAMOS.length > 0){
		    			oCurrAMOS.createErrorTableAMOS();
		    		}
		    		else{
		    			if(sap.ui.getCore().byId("idTblErrorMsgsAMOS")){
		    				sap.ui.getCore().byId("idTblErrorMsgsAMOS").destroy();
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
	
	createErrorTableAMOS: function(){
		
		if(sap.ui.getCore().byId("idTblErrorMsgsAMOS")){
			sap.ui.getCore().byId("idTblErrorMsgsAMOS").destroy();
		}
		
		// Table
    	var oErrorMsgsAMOSTable = new sap.ui.table.Table("idTblErrorMsgsAMOS",{
            columnHeaderHeight: 30,
            selectionMode: sap.ui.table.SelectionMode.None,
            width:"50%",
            height:"100%"
    	 }).addStyleClass("fontStyle marginTop15 tblBorder");
    	
    	oErrorMsgsAMOSTable.setVisibleRowCount(msgErrorsReasonsAMOS.length);
    	
    	// Table Columns
    	oErrorMsgsAMOSTable.addColumn(new sap.ui.table.Column({
      		 label: new sap.ui.commons.Label({text: "Error Type"}),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "Type"),
    		 resizable:false,
    		 width:"20%",	// MACHANACHANGES_12062019 changed from 40px to 20%
             sortProperty: "Type",
             filterProperty: "Type",
    		 }));
    	
    	oErrorMsgsAMOSTable.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Error Message"}),
			 template: new sap.ui.commons.TextView().bindProperty("text", "Message").addStyleClass("wraptext"),
			 resizable:false,
			 width:"80%",	// MACHANACHANGES_12062019 changed from 150px to 80%
             sortProperty: "Message",
             filterProperty: "Message",
			 }));
    	
    	var oModelErrorMsgsAMOS = new sap.ui.model.json.JSONModel();
    	oModelErrorMsgsAMOS.setData({modelData: msgErrorsReasonsAMOS});
    	oErrorMsgsAMOSTable.setModel(oModelErrorMsgsAMOS);
    	oErrorMsgsAMOSTable.bindRows("/modelData");
    	
    	sap.ui.getCore().byId("idShowErrorMsgsReasonsTblAMOS").insertField(oErrorMsgsAMOSTable);
	},
	
resetAMOS: function(){
        
        var oModel = new sap.ui.model.json.JSONModel();
        oModel.setData({
               dateValue: new Date()
        });
        
        loggedInUserTypeAMOS = objLoginUser.getLoggedInUserType();
        
        if(loggedInUserTypeAMOS == "SEACO"){
               $("#idListDepotAMOS").val("");
               sap.ui.getCore().byId("depotTextfieldAMOS").setValue("");
               
               if(document.getElementById("idListDepotAMOS")){
 	                document.getElementById("idListDepotAMOS").style.borderColor = "#cccccc";
 		    		document.getElementById("idListDepotAMOS").style.background = "#ffffff";
 		    		document.getElementById("idListDepotAMOS").placeholder = "Select Depot";
               }
               if(sap.ui.getCore().byId("idBtnAddMoveRemoveFilterAMOS")){
                 	sap.ui.getCore().byId("idBtnAddMoveRemoveFilterAMOS").setEnabled(false);
                 }
        }
        
        sap.ui.getCore().byId("idSerNoInputAMOS").setValue("");
        sap.ui.getCore().byId("idAuthAMOS").setValue("");
        sap.ui.getCore().byId("idDateAMOS").setModel(oModel);
        
        if(sap.ui.getCore().byId("idMsgTransAMOS")){
			sap.ui.getCore().byId("idMsgTransAMOS").destroyFields();
		}
        if(sap.ui.getCore().byId("idTblErrorMsgsAMOS")){
			sap.ui.getCore().byId("idTblErrorMsgsAMOS").destroy();
		}
        
        if(sap.ui.getCore().byId("idSerNoInputAMOS")){
     	   sap.ui.getCore().byId("idSerNoInputAMOS").setValueState(sap.ui.core.ValueState.None);
     	   sap.ui.getCore().byId("idSerNoInputAMOS").setPlaceholder("Serial Number");
        }
        if(sap.ui.getCore().byId("idAuthAMOS")){
     	   sap.ui.getCore().byId("idAuthAMOS").setValueState(sap.ui.core.ValueState.None);
     	   sap.ui.getCore().byId("idAuthAMOS").setPlaceholder("Authorisation");
        }
        if(sap.ui.getCore().byId("idDateAMOS")){
     	   sap.ui.getCore().byId("idDateAMOS").setValueState(sap.ui.core.ValueState.None);
     	   sap.ui.getCore().byId("idDateAMOS").setPlaceholder("");
        }
 }
});
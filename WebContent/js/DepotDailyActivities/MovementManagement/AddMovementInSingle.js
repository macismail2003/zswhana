/******** NP *******/

/* MAC21092017 - APS 48
 * Remove Tank details from Seaweb Gate IN - This is not needed post Alpha Sprint 1
 * */
jQuery.sap.require("sap.ui.model.json.JSONModel");

var loggedInUserTypeAMIS = "";
var vInputDepotValAMIS = "";
var vInputSerialNoValAMIS = "";
var vInputRetDateValAMIS = "";
var vInputAuthValAMIS = "";
var oInputDepotAMIS;
var oInputSerialNoAMIS;
var oInputRetDateAMIS;
var oInputAuthAMIS;
var depotNameListAMIS = [];
var vInputDepotListAMIS;
var isValidAMIS = false;
var unNoAMIS = "";
var lastClnDateAMIS = "";
var lastCargoDescAMIS = "";
var cleanProcDescAMIS = "";
var statusAvlbAMIS = "";
var flagOnChangeDepotNameAMIS = false;
var flagOnChangeDepotCodeAMIS = false;
var msgTransAMIS = [];
var msgErrorsReasonsAMIS = [];
var flagUpdateClickedAMIS = false;

sap.ui.model.json.JSONModel.extend("addMovemntInSingleView", {
	
	createAddMovemntInSingle: function(){
		
		var oCurrAMIS = this;
		
		// Labels
		var oLabelDepotIn = new sap.ui.commons.Label({text: "Depot:",
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
			required: true,
            wrapping: true}).addStyleClass("marginTop15");
		
		var oLabelSerialNoIn = new sap.ui.commons.Label({text: "Serial Number:",
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S3",linebreak: true, margin: true}),
			required: true,
            wrapping: true}).addStyleClass("marginTop15");
		
		var oLabelReturnDateIn = new sap.ui.commons.Label({text: "Return Date:",
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S3",linebreak: true, margin: true}),
			required: true,
            wrapping: true}).addStyleClass("marginTop15");
		
		var oLabelAuthIn = new sap.ui.commons.Label({text: "Authorisation:",
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S3",linebreak: true, margin: true}),
			required: true,
            wrapping: true}).addStyleClass("marginTop15");
		
		var oLabelTankDetIn = new sap.ui.commons.Label({text: "Tank Details: ",
			visible : false, // MAC21092017+ hidden this caption
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S3",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("marginTop15");
		
		var oLabelStatusIn = new sap.ui.commons.Label({text: "Status 'A': ",
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S3",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("marginTop15");
		
		var oLabelMandatoryIn = new sap.ui.commons.Label({text: "Mandatory Field",
			required: true,
			requiredAtBegin : true,
            wrapping: true}).addStyleClass("margin10 margin20 marginTop33");
		
		var oLabelUnNoIn = new sap.ui.commons.Label({text: "UN No.:",
            wrapping: true}).addStyleClass("margin8");
		
		var oLabelLastCleanDateIn = new sap.ui.commons.Label({text: "Last Cleaning Date:",
            wrapping: true}).addStyleClass("margin8");
		
		var oLabelLastCargoDescIn = new sap.ui.commons.Label({text: "Last Cargo Desc.:",
            wrapping: true}).addStyleClass("margin8");
		
		var oLabelCleanProcessDescIn = new sap.ui.commons.Label({text: "Cleaning Process Desc.:",
            wrapping: true}).addStyleClass("margin8");
		
		var oLabelSpaceAMIS = new sap.ui.commons.Label({text: " ",
			width:"8px",
            wrapping: true});
		
		var oListDepotAMIS = new sap.ui.core.HTML("idListDepotComboAMIS",{layoutData: new sap.ui.layout.GridData({span: "L4 M6 S12"})});
		var htmlContentDepot = '<input disabled="disabled" id="idListDepotAMIS" placeholder="Select Depot" class="FormInputStyle marginTop10" style="width:100%;height:38px">';
		oListDepotAMIS.setContent(htmlContentDepot);
		
	    
	 // Text Field
		oInputDepotAMIS = new sap.ui.commons.TextField("idDepotInputFieldAMIS",{
    		layoutData: new sap.ui.layout.GridData({span: "L1 M1 S8",linebreak: false, margin: true}),
    		placeholder:"Depot Code",
    	}).addStyleClass("FormInputStyle marginTop10 DepotInput38px");
    	
		
    	
		oInputSerialNoAMIS = new sap.ui.commons.TextField("idSerialNoAMIS",{
    		layoutData: new sap.ui.layout.GridData({span: "L2 M9 S9"}),
    		placeholder:"Serial Number",
    		change: function(){
    			if(this.getValue() != ""){
					 this.setValueState(sap.ui.core.ValueState.None);
				 }
    		}
    	}).addStyleClass("FormInputStyle margin10 marginTop7 DepotInput38px");
		
		oInputSerialNoAMIS.setMaxLength(11);
		
		var oModelCurrDateAMIS = new sap.ui.model.json.JSONModel();
		oModelCurrDateAMIS.setData({
	   		dateValue: new Date()
		});
    	
		oInputRetDateAMIS = new sap.ui.commons.DatePicker("idDateAMIS",{
    		value: {
                path: "/dateValue",
                type: new sap.ui.model.type.Date({pattern: "dd-MM-yyyy"}),
                mode: sap.ui.model.BindingMode.OneWay
    		},
    		layoutData: new sap.ui.layout.GridData({span: "L2 M9 S9"}),
    	});
		oInputRetDateAMIS.setModel(oModelCurrDateAMIS);
		oInputRetDateAMIS.addStyleClass("FormInputStyle margin10 marginTop7 DepotInput38px");
		oInputRetDateAMIS.setLocale("en-US");
		oInputRetDateAMIS.attachChange(
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
    	
		oInputAuthAMIS = new sap.ui.commons.TextField("idAuthAMIS",{
    		layoutData: new sap.ui.layout.GridData({span: "L2 M9 S9"}),
    		placeholder:"Authorisation",
    		change: function(){
    			if(this.getValue() != ""){
					 this.setValueState(sap.ui.core.ValueState.None);
				 }
    		}
    	}).addStyleClass("FormInputStyle margin10 marginTop7 DepotInput38px");
    	
    	var oInputUnNoIn = new sap.ui.commons.TextField("idUnNumbrAMIS",{
    		placeholder:"UN No.",
    	}).addStyleClass("FormInputStyle");
    	
    	var oInputClnDateIn = new sap.ui.commons.DatePicker("idlastCleanDateAMIS",{
    		value: {
                path: "/dateValue",
                type: new sap.ui.model.type.Date({pattern: "dd-MM-yyyy"}),
                mode: sap.ui.model.BindingMode.OneWay
    		},
    		//width:"13em"
    	});
    	oInputClnDateIn.setModel(oModelCurrDateAMIS);
    	oInputClnDateIn.addStyleClass("FormInputStyle");
    	oInputClnDateIn.setLocale("en-US");
    	oInputClnDateIn.attachChange(
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
    	
    	var oInputCargoDescIn = new sap.ui.commons.TextField("idLastCargoDescAMIS",{
    		placeholder:"Last Cargo Desc.",
    	}).addStyleClass("FormInputStyle");
    	
    	var oInputClnProcDescIn = new sap.ui.commons.TextField("idCleanProcessDescAMIS",{
    		placeholder:"Cleaning Process Desc.",
    	}).addStyleClass("FormInputStyle");
    	
    	// CheckBox
    	var oCBStatus = new sap.ui.commons.CheckBox("idStatusAvlbAMIS",{
    		tooltip : 'Status',
    		checked : false,
    		layoutData: new sap.ui.layout.GridData({span: "L2 M9 S9"}),
    		change : function() {
    			if(oCBStatus.getChecked()){
    				statusAvlbAMIS = "X";
    				}
    			else{
    				statusAvlbAMIS = "";
    				};}
    		}).addStyleClass("marginTop10");
    	
    	// Buttons
	   	 var oBtnInSubmit = new sap.m.Button("idBtnInSubmitAMIS",{
		          text : "Submit",
		          width:"80px",
		          styled:false,
		          press:function(){
		        	  if(oCurrAMIS.validateMovInSingle()){
			        	  oCurrAMIS.getTransactionDataAMIS();
			        	  }
			          }}).addStyleClass("submitBtn marginTop20");
	   	 
	   	var oBtnInUpdate = new sap.m.Button("idBtnInUpdateAMIS",{
	          text : "Update",
	          width:"80px",
	          styled:false,
	          layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
	          press:function(){
	        	  oCurrAMIS.updateTankDetSingleAMIS();
	          }}).addStyleClass("submitBtn marginRight marginTop10");
	   	 
	   	 var oBtnInCancel = new sap.m.Button("idBtnInCancelAMIS",{
		          text : "Cancel",
		          width:"80px",
		          styled:false,
		          layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
		          press:function(){
		        	  	sap.ui.getCore().byId("idUnNumbrAMIS").setValue("");
		  				sap.ui.getCore().byId("idLastCargoDescAMIS").setValue("");
		  				sap.ui.getCore().byId("idCleanProcessDescAMIS").setValue("");
		  				oCurrAMIS.cancelTankDetSingleAMIS();
		  				oFlexAllColumn.setVisible(false);
		          }}).addStyleClass("submitBtn marginTop10");
	   	 
	   	var oBtnEnterTankDet = new sap.m.Button("idBtnTankDetAMIS",{
	          text : "Enter Tank Details",
	          visible : false, // MAC21092017+ hidden tank details button
	          width:"150px",
	          styled:false,
	          layoutData: new sap.ui.layout.GridData({span: "L6 M4 S4",linebreak: false, margin: true}),
	          press:function(){
	        	  oFlexAllColumn.setVisible(true);
	        	  }
	   	}).addStyleClass("submitBtn");
	   	
	   	var oBtnInRemoveFilter = new sap.m.Button("idBtnInRemoveFilterAMIS",{
	        text : "Remove Filter",
	        //width:"115px",
	        styled:false,
	        enabled:false,
	        layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: false, margin: true}),
	        press:function(){
		        	oInputDepotAMIS.setValue("");
		        	 $("#idListDepotAMIS").val("");
		        	this.setEnabled(false);
		          }}).addStyleClass("submitBtn marginTop5");
	   	
	   	var oBtnInApplyFilter = new sap.m.Button("idBtnInApplyFilterAMIS",{
	          text : "Apply Filter",
	          //width:"115px",
	          styled:false,
	          layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: false, margin: true}),
	          press:function(){
	        	  if(oInputDepotAMIS.getValue() == ""){
	        		  /*oInputDepotAMIS.setValueState(sap.ui.core.ValueState.Error);
	        		  oInputDepotAMIS.setValue("");
	        		  oInputDepotAMIS.setPlaceholder("Required");*/
	        		  $("#idListDepotAMIS").val("");
	          	  }
	          	  else{
	          		oBtnInRemoveFilter.setEnabled(true);
	          		document.getElementById("idListDepotAMIS").style.borderColor = "#cccccc";
					document.getElementById("idListDepotAMIS").style.background = "#ffffff";
			          		var depotCodeAMIS = new RegExp(oInputDepotAMIS.getValue());
			          		  for(var i=0; i<depotNameListAMIS.length; i++){
			          			var depotNameAMIS = depotNameListAMIS[i];
				          		/*var resultAMIS = depotCodeAMIS.test(depotNameAMIS);
				          		if(resultAMIS){*/
			          			var partsAMIS = depotNameAMIS.split("-");
			          			var depotCodeAMIS = partsAMIS[3];
			          			if(depotCodeAMIS == oInputDepotAMIS.getValue()){
				          			$("#idListDepotAMIS").val(depotNameAMIS);
				          			break;
				          		}
				          		else{
				          			$("#idListDepotAMIS").val("");
				          		}
			          		  }
	          	  }
	          }}).addStyleClass("submitBtn marginTop5");
	   	
	   	var oFlexApplyRemoveAMIS = new sap.m.FlexBox({
	           items: [
						oBtnInApplyFilter,
						oLabelSpaceAMIS,
						oBtnInRemoveFilter
	           ],
	           layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12",linebreak: false, margin: false}),
	           direction : "Row",
				});
 	 
	 // Flex Boxes
		var oFlexLabels = new sap.m.FlexBox({
           items: [
					oLabelUnNoIn,
					oLabelLastCleanDateIn,
					oLabelLastCargoDescIn,
					oLabelCleanProcessDescIn
           ],
           direction : "Column",
           width: "45%"
			});
		
		var oFlexFields = new sap.m.FlexBox({
	           items: [
						oInputUnNoIn,
						oInputClnDateIn,
						oInputCargoDescIn,
						oInputClnProcDescIn
	           ],
	           direction : "Column",
	           width: "55%"
				});
		
		var oFlexButtons = new sap.m.FlexBox({
	           items: [
						oBtnInUpdate,
						oBtnInCancel
	           ],
	           direction : "Row",
				});
		
		var oFlexAllRow = new sap.m.FlexBox({
	           items: [
						oFlexLabels,
						oFlexFields
	           ],
	           direction : "Row",
				});
		
		var oFlexAllColumn = new sap.m.FlexBox("idFlexTankDetAMIS",{
	           items: [
						oFlexAllRow,
						oFlexButtons
	           ],
	           direction : "Column",
	           width: "50%"
				}).addStyleClass("flexBoxTankStyle");
		
		oFlexAllColumn.setVisible(false);
		
		var oFlexMainLabels = new sap.m.FlexBox({
	           items: [
						oLabelDepotIn,
						oLabelSerialNoIn,
						oLabelReturnDateIn,
						oLabelAuthIn,
						oLabelTankDetIn,
						oLabelStatusIn,
						oLabelMandatoryIn
	           ],
	           direction : "Column",
	           width: "45%"
				});
		
		var oFlexDepot = new sap.m.FlexBox({
	           items: [
						oListDepotAMIS,
						oInputDepotAMIS
	           ],
	           direction : "Row",
				});
		
		var oFlexMainFields = new sap.m.FlexBox({
	           items: [
						oFlexDepot,
						oInputSerialNoAMIS,
						oInputRetDateAMIS,
						oInputAuthAMIS,
						oBtnEnterTankDet,
						oCBStatus
	           ],
	           direction : "Column",
				});
	 	
		var oFlexForm = new sap.m.FlexBox({
	           items: [
						oFlexMainLabels,
						oFlexMainFields
	           ],
	           direction : "Row",
				});
		
	 // Responsive Grid Layout
	    var oAddMoveInSingleLayout = new sap.ui.layout.form.ResponsiveGridLayout("idAddMoveInSingleLayout",{
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
	     var oAddMoveInSingleForm = new sap.ui.layout.form.Form("idAddMoveInSingleForm",{
	             layout: oAddMoveInSingleLayout,
	             formContainers: [
	                     
	                     new sap.ui.layout.form.FormContainer("idAddMoveInSingleFormC1",{
                             formElements: [
												new sap.ui.layout.form.FormElement({
												    fields: [oLabelDepotIn, oListDepotAMIS, oInputDepotAMIS, oFlexApplyRemoveAMIS]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oLabelSerialNoIn, oInputSerialNoAMIS]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oLabelReturnDateIn, oInputRetDateAMIS]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oLabelAuthIn, oInputAuthAMIS]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oLabelTankDetIn, oBtnEnterTankDet]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oFlexAllColumn]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oLabelStatusIn, oCBStatus]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oBtnInSubmit]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oLabelMandatoryIn]
												})
	                                     ]
	                     }),
	             ]
	     });
	     
	  // Responsive Grid Layout
		    var oMsgTransLayoutAMIS = new sap.ui.layout.form.ResponsiveGridLayout("idMsgTransLayoutAMIS",{
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
		     var oMsgTransAMISForm = new sap.ui.layout.form.Form("idMsgTransAMISForm",{
		             layout: oMsgTransLayoutAMIS,
		             formContainers: [
		                     
		                     new sap.ui.layout.form.FormContainer({
	                             formElements: [
													new sap.ui.layout.form.FormElement("idMsgTransAMIS",{
													    fields: [],
													    layoutData: new sap.ui.layout.GridData({span: "L9 M9 S4",linebreak: true, margin: true})
													}),
													new sap.ui.layout.form.FormElement("idShowErrorMsgsReasonsTblAMIS",{
													    fields: [],
													    layoutData: new sap.ui.layout.GridData({span: "L9 M9 S4",linebreak: true, margin: true})
													})
		                                     ]
		                     }),
		             ]
		     });
		     
		     var oFlexAllAMIS = new sap.m.FlexBox({
		           items: [
							oAddMoveInSingleForm,
							oMsgTransAMISForm
		           ],
		           direction : "Column",
					});
		 	
	     	return oFlexAllAMIS;
	},
	
	validateMovInSingle: function(){
		
		vInputDepotValAMIS = oInputDepotAMIS.getValue();
		vInputSerialNoValAMIS = oInputSerialNoAMIS.getValue();
		vInputRetDateValAMIS = oInputRetDateAMIS.getValue();
		vInputAuthValAMIS = oInputAuthAMIS.getValue();
		vInputDepotListAMIS = document.getElementById("idListDepotAMIS").value;

		if(vInputSerialNoValAMIS!="" && vInputRetDateValAMIS != "" && vInputDepotListAMIS!="" && vInputAuthValAMIS!=""){
			isValidAMIS = true;
		}
		else{
			if(vInputDepotListAMIS == ""){
				document.getElementById("idListDepotAMIS").style.borderColor = "red";
	    		document.getElementById("idListDepotAMIS").style.background = "#FAD4D4";
	    		$("#idListDepotAMIS").attr("placeholder","Required");
				isValidAMIS = false;
		  	  }
		  	  else{
		  		var match = jQuery.inArray(vInputDepotListAMIS,depotNameListAMIS);
				if(match < 0){
					document.getElementById("idListDepotAMIS").style.borderColor = "red";
		    		document.getElementById("idListDepotAMIS").style.background = "#FAD4D4";
		    		document.getElementById("idListDepotAMIS").value = "";
		    		document.getElementById("idListDepotAMIS").placeholder = "Invalid Depot";
		    		isValid = false;
				}
				else{
					document.getElementById("idListDepotAMIS").style.borderColor = "#cccccc";
		    		document.getElementById("idListDepotAMIS").style.background = "#ffffff";
		    		document.getElementById("idListDepotAMIS").placeholder = "Select Depot";
				}
		  		/*document.getElementById("idListDepotAMIS").style.borderColor = "#cccccc";
				document.getElementById("idListDepotAMIS").style.background = "#ffffff";*/
		  	  }
  	  if(vInputSerialNoValAMIS == ""){
  		  oInputSerialNoAMIS.setValueState(sap.ui.core.ValueState.Error);
  		  oInputSerialNoAMIS.setValue("");
  		  oInputSerialNoAMIS.setPlaceholder("Required");
  		isValidAMIS = false;
  	  }
  	  else{
  		  oInputSerialNoAMIS.setValueState(sap.ui.core.ValueState.None);
  	  }
  	  if(vInputRetDateValAMIS == ""){
  		oInputRetDateAMIS.setValueState(sap.ui.core.ValueState.Error);
  		oInputRetDateAMIS.setValue("");
  		oInputRetDateAMIS.setPlaceholder("Required");
  		isValidAMIS = false;
  	  }
  	  else{
  		oInputRetDateAMIS.setValueState(sap.ui.core.ValueState.None);
  	  }
  	  if(vInputAuthValAMIS == ""){
  		  oInputAuthAMIS.setValueState(sap.ui.core.ValueState.Error);
  		  oInputAuthAMIS.setValue("");
  		  oInputAuthAMIS.setPlaceholder("Required");
  		isValidAMIS = false;
  	  }
  	  else{
  		  oInputAuthAMIS.setValueState(sap.ui.core.ValueState.None);
  	  }
	} 
		return isValidAMIS;
	},
	
	populateDepotNameAMIS: function(){
		busyDialog.open();
			oModel = new sap.ui.model.odata.ODataModel(serviceUrl15, true);
			var urlToCallAMISDep = serviceUrl15 + "/F4_Functional_Location";
			//alert("urlToCallAMISDep : "+urlToCallAMISDep);
			OData.request({ 
			      requestUri: urlToCallAMISDep,
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
			    	
			    	for ( var i = 0; i < data.results.length ; i++) {
			    		depotNameListAMIS[i] = data.results[i].FunctionalLoc;
					}
			    	
			    	//alert("depotNameListAMIS len : "+depotNameListAMIS.length);
			    	
			    	$( "#idListDepotAMIS" ).autocomplete({
			    	      source: depotNameListAMIS,
			    	      minLength: 0,
			    	      select: function(){
			    	    	  document.getElementById("idListDepotAMIS").style.borderColor = "#cccccc";
			  				  document.getElementById("idListDepotAMIS").style.background = "#ffffff";
			  				  $("#idListDepotAMIS").attr("placeholder","Select Depot");
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
			    	    for (i in depotNameListAMIS) {
			    	        if (depotNameListAMIS[i].toLowerCase().match(this.value.toLowerCase())) {
			    	            isValid = true;
			    	        }
			    	    }
			    	    if (!isValid) {
			    	        this.value = previousValue;
			    	    } else {
			    	        previousValue = this.value;
			    	    }
			    	});

			    	loggedInUserTypeAMIS = objLoginUser.getLoggedInUserType();
			    	//alert("loggedInUserTypeAMIS : "+loggedInUserTypeAMIS);
					if(loggedInUserTypeAMIS == "SEACO"){
						$("#idListDepotAMIS").removeAttr('disabled');
						$("#idListDepotAMIS").attr("disabled","disabled");
						sap.ui.getCore().byId("idBtnInRemoveFilterAMIS").setEnabled(false);
						sap.ui.getCore().byId("idBtnInApplyFilterAMIS").setEnabled(true);
						sap.ui.getCore().byId("idDepotInputFieldAMIS").setEnabled(true);
					}
					else{
						var DepotCode = objLoginUser.getLoggedInUserID();
						//alert("DepotCode : "+DepotCode);
						for(var i=0;i<depotNameListAMIS.length;i++){
							if(depotNameListAMIS[i].substring(11,15) == DepotCode)
								DepotCode = depotNameListAMIS[i];
						}
						$("#idListDepotAMIS").attr("disabled","disabled");
						$("#idListDepotAMIS").val(DepotCode);
						var depotAMIS = document.getElementById("idListDepotAMIS").value.split("-");
						sap.ui.getCore().byId("idDepotInputFieldAMIS").setValue(depotAMIS[3]);
						sap.ui.getCore().byId("idBtnInRemoveFilterAMIS").setEnabled(false);
						sap.ui.getCore().byId("idBtnInApplyFilterAMIS").setEnabled(false);
						sap.ui.getCore().byId("idDepotInputFieldAMIS").setEnabled(false);
					}

			    	busyDialog.close();
			    },
			    function(err){
			    	 errorfromServer(err);
			    	//alert("Error while Reading Result : "+ : window.JSON.stringify(err.response));
			    });
		},
		
		updateTankDetSingleAMIS: function(){
			busyDialog.open();
			
			flagUpdateClickedAMIS = true;
			
			unNoAMIS = sap.ui.getCore().byId("idUnNumbrAMIS").getValue();
			
			if(sap.ui.getCore().byId("idlastCleanDateAMIS").getValue() != ""){
				var splitLastClnDateAMIS = sap.ui.getCore().byId("idlastCleanDateAMIS").getValue().split("-");
				var lastClnDateToPassAMIS = splitLastClnDateAMIS[2]+splitLastClnDateAMIS[1]+splitLastClnDateAMIS[0];
				
				lastClnDateAMIS = lastClnDateToPassAMIS;
			}
			else{
				lastClnDateAMIS = "";
			}
			
			lastCargoDescAMIS = sap.ui.getCore().byId("idLastCargoDescAMIS").getValue();
			cleanProcDescAMIS = sap.ui.getCore().byId("idCleanProcessDescAMIS").getValue();
			
			busyDialog.close();
			
			sap.ui.getCore().byId("idFlexTankDetAMIS").setVisible(false);
		},
		
		cancelTankDetSingleAMIS: function(){
			busyDialog.open();
			
			unNoAMIS = "";
			lastClnDateAMIS = "";
			lastCargoDescAMIS = "";
			cleanProcDescAMIS = "";
			
			busyDialog.close();
			
			sap.ui.getCore().byId("idFlexTankDetAMIS").setVisible(false);
		},
		
		getTransactionDataAMIS: function(){
			
			var oCurrAMIS = this;
			
			oInputDepotAMIS.setValueState(sap.ui.core.ValueState.None);
			oInputSerialNoAMIS.setValueState(sap.ui.core.ValueState.None);
			oInputRetDateAMIS.setValueState(sap.ui.core.ValueState.None);
			oInputAuthAMIS.setValueState(sap.ui.core.ValueState.None);
			
			if(flagUpdateClickedAMIS == false){
				unNoAMIS = "";
				lastClnDateAMIS = "";
				lastCargoDescAMIS = "";
				cleanProcDescAMIS = "";
			}
			
			busyDialog.open();
			
			msgTransAMIS = [];
			
			if(sap.ui.getCore().byId("idMsgTransAMIS")){
				sap.ui.getCore().byId("idMsgTransAMIS").destroyFields();
			}
			
			if(sap.ui.getCore().byId("idShowErrorMsgsReasonsTblAMIS")){
				sap.ui.getCore().byId("idShowErrorMsgsReasonsTblAMIS").destroyFields();
			}
			
			var splitDateAMIS = vInputRetDateValAMIS.split("-");
			var dateToPassAMIS = splitDateAMIS[2]+splitDateAMIS[1]+splitDateAMIS[0];
			
			var selDepValAMIS = document.getElementById("idListDepotAMIS").value;
		    var partsDepAMIS = selDepValAMIS.split("-");
		    var vInDepotValAMIS = partsDepAMIS[3];
			
		    //pass func loc instead of full name because of & - 1 - oct
		    var vFuncLoc = partsDepAMIS[0] + "-" + partsDepAMIS[1] + "-" + partsDepAMIS[2] + "-" + partsDepAMIS[3];
		    if(sap.ui.getCore().byId("idStatusAvlbAMIS").getChecked()){
				statusAvlbAMIS = "A";
				}
			else{
				statusAvlbAMIS = "";
				}
		    
			oModel = new sap.ui.model.odata.ODataModel(serviceUrl15, true);
			var urlToCallAMIS = serviceUrl15 + "/Gatein_Proxy?$filter=Igatein1 eq'" + vInputSerialNoValAMIS.toUpperCase().trim() + "$" + vFuncLoc + "$" + vInDepotValAMIS + "$" + vInputAuthValAMIS.trim() + "$" + dateToPassAMIS + "$" + unNoAMIS.trim() + "$" + lastClnDateAMIS.trim() + "$" + lastCargoDescAMIS.trim() + "$" + cleanProcDescAMIS.trim() + "$" + statusAvlbAMIS + "'";
			//var urlToCallAMIS = serviceUrl15 + "/Gatein_Proxy?$filter=Igatein1 eq'" + vInputSerialNoValAMIS.toUpperCase().trim() + "$" + vFuncLoc + "$" + vInDepotValAMIS + "$" + vInputAuthValAMIS.trim() + "$" + dateToPassAMIS + "$" + unNoAMIS.trim() + "$$" + lastCargoDescAMIS.trim() + "$" + cleanProcDescAMIS.trim() + "$" + statusAvlbAMIS + "'";
			//alert("urlToCallAMIS : "+urlToCallAMIS);
			OData.request({ 
			      requestUri: urlToCallAMIS,
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
			    		msgTransAMIS = jQuery.grep(data.results, function(element, index){
		    	             return element.Type == "D";
		    	     	});
			    		
			    		msgErrorsReasonsAMIS = jQuery.grep(data.results, function(element, index){
		    	             return element.Type == "E";
		    	     	});
			    		
			    		for(var j=0; j<msgErrorsReasonsAMIS.length; j++){
		    				//var trimmedMsgAMIS = msgErrorsReasonsAMIS[j].Message.substring(2);
			    			var trimmedMsgAMIS = msgErrorsReasonsAMIS[j].Message.split(":");
		    				msgErrorsReasonsAMIS[j].Message = trimmedMsgAMIS[1];
		    			}
			    		
			    		for(var i=0;i<msgTransAMIS.length;i++){
			    			//alert("msg : "+msgTransAMIS[i].Message);
			    			var oImgServerResp = new sap.ui.commons.Image({
			    				layoutData: new sap.ui.layout.GridData({linebreak: true, margin: true})
			    			});
			    			oImgServerResp.setSrc("images/server_response.png");
			    			
			    			var oLabelBlankAMIS = new sap.ui.commons.Label({
			    				width:"5px"
			    			}); 
			    			oLabelBlankAMIS.setText(""); 
			    			
			    			var msgToShowAMIS = new sap.ui.commons.TextView({
			    				layoutData: new sap.ui.layout.GridData({span: "L11 M11 S11",linebreak: true, margin: true})
			    			}).addStyleClass("wraptext");
			    			
			    			var oFlexAMISImgMsg = new sap.m.FlexBox({
			    		           items: [
			    							oImgServerResp,
			    							oLabelBlankAMIS,
			    							msgToShowAMIS
			    		           ],
			    		           direction : "Row",
			    		           layoutData: new sap.ui.layout.GridData({span: "L11 M11 S11",linebreak: true, margin: true})
			    					}).addStyleClass("margin5");
			    			
			    			var dispMsg = msgTransAMIS[i].Message.split(":");
			    			msgToShowAMIS.setText(dispMsg[1]);
			    			
			    			sap.ui.getCore().byId("idMsgTransAMIS").insertField(oFlexAMISImgMsg,i);
			    		}
			    		
			    		if(msgErrorsReasonsAMIS.length > 0){
			    			oCurrAMIS.createErrorTableAMIS();
			    		}
			    		else{
			    			if(sap.ui.getCore().byId("idTblErrorMsgsAMIS")){
			    				sap.ui.getCore().byId("idTblErrorMsgsAMIS").destroy();
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
		
		createErrorTableAMIS: function(){
			
			if(sap.ui.getCore().byId("idTblErrorMsgsAMIS")){
				sap.ui.getCore().byId("idTblErrorMsgsAMIS").destroy();
			}
			
			// Table
	    	var oErrorMsgsAMISTable = new sap.ui.table.Table("idTblErrorMsgsAMIS",{
	            columnHeaderHeight: 30,
	            selectionMode: sap.ui.table.SelectionMode.None,
	            width:"50%",
	            height:"100%"
	    	 }).addStyleClass("fontStyle marginTop15 tblBorder");
	    	
	    	oErrorMsgsAMISTable.setVisibleRowCount(msgErrorsReasonsAMIS.length);
	    	
	    	// Table Columns
	    	oErrorMsgsAMISTable.addColumn(new sap.ui.table.Column({
	      		 label: new sap.ui.commons.Label({text: "Error Type"}),
	    		 template: new sap.ui.commons.TextView().bindProperty("text", "Type"),
	    		 resizable:false,
	    		 width:"20%",	// MACHANACHANGES_12062019 changed from 40px to 20%
	             sortProperty: "Type",
	             filterProperty: "Type",
	    		 }));
	    	
	    	oErrorMsgsAMISTable.addColumn(new sap.ui.table.Column({
		   		 label: new sap.ui.commons.Label({text: "Error Message"}),
				 template: new sap.ui.commons.TextView().bindProperty("text", "Message").addStyleClass("wraptext"),
				 resizable:false,
				 width:"80%",	// MACHANACHANGES_12062019 changed from 150px to 80%
	             sortProperty: "Message",
	             filterProperty: "Message",
				 }));
	    	
	    	var oModelErrorMsgsAMIS = new sap.ui.model.json.JSONModel();
	    	oModelErrorMsgsAMIS.setData({modelData: msgErrorsReasonsAMIS});
	    	oErrorMsgsAMISTable.setModel(oModelErrorMsgsAMIS);
	    	oErrorMsgsAMISTable.bindRows("/modelData");
	    	
	    	sap.ui.getCore().byId("idShowErrorMsgsReasonsTblAMIS").insertField(oErrorMsgsAMISTable);
		},
		
		resetAMIS: function(){
            
            var oModel = new sap.ui.model.json.JSONModel();
            oModel.setData({
                  dateValue: new Date()
            });
            
            if(loggedInUserTypeAMIS == "SEACO"){
                  $("#idListDepotAMIS").val("");
                  $("#idDepotInputFieldAMIS").val("");
                  
                  if(document.getElementById("idListDepotAMIS")){
  	                document.getElementById("idListDepotAMIS").style.borderColor = "#cccccc";
  		    		document.getElementById("idListDepotAMIS").style.background = "#ffffff";
  		    		document.getElementById("idListDepotAMIS").placeholder = "Select Depot";
                  }
                  
                  if(sap.ui.getCore().byId("idBtnInRemoveFilterAMIS")){
                  	sap.ui.getCore().byId("idBtnInRemoveFilterAMIS").setEnabled(false);
                  }
            }
            
            sap.ui.getCore().byId("idSerialNoAMIS").setValue("");
            sap.ui.getCore().byId("idAuthAMIS").setValue("");
            sap.ui.getCore().byId("idDateAMIS").setModel(oModel);
            sap.ui.getCore().byId("idStatusAvlbAMIS").setChecked(false);
            sap.ui.getCore().byId("idUnNumbrAMIS").setValue("");
            //sap.ui.getCore().byId("idlastCleanDateAMIS").setModel(oModel);
            sap.ui.getCore().byId("idLastCargoDescAMIS").setValue("");
            sap.ui.getCore().byId("idCleanProcessDescAMIS").setValue("");
            sap.ui.getCore().byId("idFlexTankDetAMIS").setVisible(false);
            
            if(sap.ui.getCore().byId("idMsgTransAMIS")){
				sap.ui.getCore().byId("idMsgTransAMIS").destroyFields();
			}
            
            if(sap.ui.getCore().byId("idTblErrorMsgsAMIS")){
				sap.ui.getCore().byId("idTblErrorMsgsAMIS").destroy();
			}
            
            if(sap.ui.getCore().byId("idSerialNoAMIS")){
          	  sap.ui.getCore().byId("idSerialNoAMIS").setValueState(sap.ui.core.ValueState.None);
          	  sap.ui.getCore().byId("idSerialNoAMIS").setPlaceholder("Serial Number");
            }
            if(sap.ui.getCore().byId("idAuthAMIS")){
          	  sap.ui.getCore().byId("idAuthAMIS").setValueState(sap.ui.core.ValueState.None);
          	  sap.ui.getCore().byId("idAuthAMIS").setPlaceholder("Authorisation");
            }
            if(sap.ui.getCore().byId("idDateAMIS")){
          	  sap.ui.getCore().byId("idDateAMIS").setValueState(sap.ui.core.ValueState.None);
          	  sap.ui.getCore().byId("idDateAMIS").setPlaceholder("");
            }
     }

});
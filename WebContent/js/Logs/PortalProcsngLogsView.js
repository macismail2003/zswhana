var depotNameListPPL = [];
var aPPLResult = [];
var aPPLResultCompressed = [];			// MAC25022015 +
var loggedInUserTypePPL= "";
var objUtil;
var oModelPPLResult = new sap.ui.model.json.JSONModel();
var oModelPPLDepot = new sap.ui.model.json.JSONModel();
var oCurrent;		// MAC25022015 +
sap.ui.model.json.JSONModel.extend("PortalProcsngLogsView", {
	
	createPPLForm: function(){
		var oCurrent = this;
		//Labels
		var oLabelDepot = new sap.ui.commons.Label({text: "Depot:",
			layoutData: new sap.ui.layout.GridData({span: "L1 M2 S12",linebreak: true, margin: true}),
			required: true,
            wrapping: true}).addStyleClass("marginTop15");
		
		var oLabelPeriod = new sap.ui.commons.Label({text: "Period:",
			required:true,
			layoutData: new sap.ui.layout.GridData({span: "L1 M2 S12",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("marginTop15");
		
		var oLabelMsgType = new sap.ui.commons.Label({text: "Message Type:",
			required: true,
			layoutData: new sap.ui.layout.GridData({span: "L1 M2 S12",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("marginTop15");
		
		var oLabelUnitNumber = new sap.ui.commons.Label({text: "Unit Number:",
			layoutData: new sap.ui.layout.GridData({span: "L1 M2 S12",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("marginTop15");
		
		var oLabelResult = new sap.ui.commons.Label({text: "Result:",
			layoutData: new sap.ui.layout.GridData({span: "L1 M2 S12",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("marginTop15");
		
		var oLabelMandatory = new sap.ui.commons.Label({text: "Mandatory Field",
			required: true,
			requiredAtBegin : true,
            wrapping: true}).addStyleClass("marginTop10");
		
		
		//Input Fields
		var oInputDepot = new sap.ui.core.HTML("idDepotHTMLPPL",{layoutData: new sap.ui.layout.GridData({span: "L4 M6 S12"})});
		var htmlContentDepot = '<input disabled="disabled" id="idDepotPPL" placeholder="Depot" class="FormInputStyle marginTop10" style="width:100%;height:38px">';
		oInputDepot.setContent(htmlContentDepot);
		
    	var oDepotInputPPL = new sap.ui.commons.TextField('idDepotInputPPL',{
    		layoutData: new sap.ui.layout.GridData({span: "L1 M1 S8",linebreak: false, margin: true}),
    		placeholder:"Depot Code",
    	}).addStyleClass("FormInputStyle marginTop10 DepotInput38px");
    	
    	
    	var oButtonRemoveFilterPPL = new sap.m.Button("idButtonRemoveFilterPPL",{
	          text : "Remove Filter",
	          //width:"115px",
	          styled:false,
	          enabled:false,
	          layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: false, margin: true}),
	          press:function(){
		        	  oDepotInputPPL.setValue("");
		        	  $("#idDepotPPL").val("");
			          this.setEnabled(false);
		      }}).addStyleClass("submitBtn marginTop5");
	   	 
	   	 var oButtonApplyFilterPPL = new sap.m.Button("idButtonApplyFilterPPL",{
		          text : "Apply Filter",
		          //width:"115px",
		          styled:false,
		          layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: false, margin: true}),
		          press:function(){
		        	  if(oDepotInputPPL.getValue() == ""){
		        		  $("#idDepotPPL").val("");
		          	  }
		          	  else{
		          		sap.ui.getCore().byId("idButtonRemoveFilterPPL").setEnabled(true);
		          		document.getElementById("idDepotPPL").style.borderColor = "#cccccc";
		        		document.getElementById("idDepotPPL").style.background = "#ffffff";
				          		  
				          		  for(var i=0; i<depotNameListPPL.length; i++){
				          			var depotNamePPL = depotNameListPPL[i];
					          		/*var resultZCEM = depotCodeZCEM.test(depotNameZCEM);
					          		if(resultZCEM){*/
				          			var partsPPL = depotNamePPL.split("-");
								    var depotCodePPL = partsPPL[3];
				          			if(depotCodePPL == oDepotInputPPL.getValue()){
					          			$("#idDepotPPL").val(depotNamePPL);
					          			break;
					          		}else{
					          			$("#idDepotPPL").val("");
					          		}
				          		  }
		          	  }
		        	  }}).addStyleClass("submitBtn marginTop5");
		
	   	 var oLabelSpaceZCEM = new sap.ui.commons.Label({text: " ",
			width:"8px",
            wrapping: true});
			
	   	var oFlexApplyRemovePPL = new sap.m.FlexBox({
	           items: [
						oButtonApplyFilterPPL,
						oLabelSpaceZCEM,
						oButtonRemoveFilterPPL
	           ],
	           layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12",linebreak: false, margin: false}),
	           direction : "Row",
				});
	   	
		/* Begin of commenting by Seyed Ismail on 25.02.2015 MAC25022015*/ 
		//List for Period
//		 var oComboPeriod = new sap.ui.commons.DropdownBox("idPeriodPPL", {
//			  layoutData: new sap.ui.layout.GridData({span: "L7 M8 S4"}),
//			  change:function(){
//				/*  this.setValueState(sap.ui.core.ValueState.None);
//				  this.setPlaceholder("Select Period");
//				 oController.EquipClassChange();*/
//			  },
//	          items: [
//                      new sap.ui.core.ListItem({text: "Today", key: "TO"}),
//                      new sap.ui.core.ListItem({text: "This Week", key: "TW"}),
//                      new sap.ui.core.ListItem({text: "Last Week", key: "LW"}),
//                      new sap.ui.core.ListItem({text: "This Month", key: "TM"}),
//                      new sap.ui.core.ListItem({text: "Last Month", key: "LM"}),
//                      new sap.ui.core.ListItem({text: "Last 3 Months", key: "L3"}),
//                      new sap.ui.core.ListItem({text: "Last 6 Months", key: "L6"}),
//                      new sap.ui.core.ListItem({text: "Last 12 Months", key: "L2"}),
//	                ],
//			  displaySecondaryValues:false, placeholder:"Select Period"}).addStyleClass("FormInputStyle marginTop10");
		 /* End of commenting by Seyed Ismail on 25.02.2015 MAC25022015*/ 
		 /* Begin of adding by Seyed Ismail on 25.02.2015 MAC25022015*/ 

			var oLabelSpaceForDate = new sap.ui.commons.Label({text: "",
				layoutData: new sap.ui.layout.GridData({span: "L2 M3 S3",linebreak: false, margin: true}),
				width:"18px",
	            wrapping: true}).addStyleClass("marginTop15");
				
			var oLabelFrom = new sap.ui.commons.Label({text: "From: ",
				layoutData: new sap.ui.layout.GridData({span: "L2 M3 S3",linebreak: false, margin: true}),
	            wrapping: true}).addStyleClass("marginTop15 marginRight5");
			
			var oLabelTo = new sap.ui.commons.Label({text: "To: ",
				layoutData: new sap.ui.layout.GridData({span: "L2 M3 S3",linebreak: false, margin: true}),
	            wrapping: true}).addStyleClass("marginTop15 marginRight5");
			
	    	var oPortalFrom = new sap.ui.commons.DatePicker("idPortalFrom",{
	    		value: {
	                path: "/dateValue",
	                type: new sap.ui.model.type.Date({pattern: "dd-MM-yyyy"}),
	                mode: sap.ui.model.BindingMode.OneWay
	    			},
	    			width:"100px",
	    			layoutData: new sap.ui.layout.GridData({span: "L2 M2 S3"}),
	    	});
	    	//oInputOffHireDateFrom.setModel(oModelCurrDateCRUOH);
	    	oPortalFrom.addStyleClass("FormInputStyle margin5Top DepotInput38px");
	    	oPortalFrom.setLocale("en-US");
	    	oPortalFrom.attachChange(
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
	    	
	    	var oPortalTo = new sap.ui.commons.DatePicker("idPortalTo",{
	    		value: {
	                path: "/dateValue",
	                type: new sap.ui.model.type.Date({pattern: "dd-MM-yyyy"}),
	                mode: sap.ui.model.BindingMode.OneWay
	    			},
	    			width:"100px",
	    			layoutData: new sap.ui.layout.GridData({span: "L2 M2 S3"}),
	    	});
	    	//oInputOffHireDateTo.setModel(oModelCurrDateCRUOH);
	    	oPortalTo.addStyleClass("FormInputStyle margin5Top DepotInput38px");
	    	oPortalTo.setLocale("en-US");
	    	oPortalTo.attachChange(
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
			        oPortalFrom,
			        oLabelSpaceForDate,
			        oLabelTo,
			        oPortalTo
			      ],
			      layoutData: new sap.ui.layout.GridData({span: "L8 M9 S12",linebreak: false, margin: true}),
			      direction: "Row"
			});
			
				 
	    	/* End of adding by Seyed Ismail on 25.02.2015 MAC25022015*/ 
		 
		 
		 //List for Message Type
		 var oComboMessageType = new sap.ui.commons.DropdownBox("idMessageTypePPL", {
			  layoutData: new sap.ui.layout.GridData({span: "L2 M4 S6"}),
			  change:function(){
				 /* this.setValueState(sap.ui.core.ValueState.None);
				  this.setPlaceholder("Select Message Type");
				 oController.EquipClassChange();*/
			  },
			  items: [
                      new sap.ui.core.ListItem({text: "All", key: "ALL"}),
                      new sap.ui.core.ListItem({text: "Gate Out", key: "GATEOUT"}),
                      new sap.ui.core.ListItem({text: "Gate In", key: "GATEIN"}),
                      new sap.ui.core.ListItem({text: "Estimate", key: "EST"}),
                      new sap.ui.core.ListItem({text: "Joint Survey", key: "JS"}),
                      new sap.ui.core.ListItem({text: "Lessee Approval", key: "LA"}),
                      new sap.ui.core.ListItem({text: "Repair Completion", key: "RC"}),

	                ],
	          displaySecondaryValues:false, placeholder:"Select Message Type"}).addStyleClass("FormInputStyle marginTop10 DepotInput38px");
		 
		 
		 var oInputUnitNumber = new sap.ui.commons.TextField('idUnitNoPPL',{
	    		layoutData: new sap.ui.layout.GridData({span: "L2 M4 S6"}),
	    		placeholder: "Unit Number",
	    		//value:"402423",
	    	}).addStyleClass("FormInputStyle marginTop10 DepotInput38px");
	
		 
		 //List for Result
		 var oComboResult = new sap.ui.commons.DropdownBox("idResultPPL", {
			  layoutData: new sap.ui.layout.GridData({span: "L2 M4 S6"}),
			  change:function(){
				 /* this.setValueState(sap.ui.core.ValueState.None);
				  this.setPlaceholder("Select Result");
				 oController.EquipClassChange();*/
			  },
			  items: [
                      new sap.ui.core.ListItem({text: "All", key: "ALL"}),
                      new sap.ui.core.ListItem({text: "Error", key: "ERROR"}),
                      new sap.ui.core.ListItem({text: "Success", key: "SUCCESS"})
                      ],
	          displaySecondaryValues:false, placeholder:"Select Result"}).addStyleClass("FormInputStyle marginTop10 DepotInput38px");
		 
		 //Button
	   	 var oBtnSubmit = new sap.m.Button("idBtnSubmitPPL",{
		          text : "Submit",
		          width:"80px",
		          styled:false,
		          layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: true, margin: true}),
		          press:function(){
		        	  if(oCurrent.ValidatePPLForm())
		        		  oCurrent.getProcessingLogResultPPL();
		}}).addStyleClass("submitBtn");
		
	   	 
	  // Responsive Grid Layout
		    var oPPLFormLayout = new sap.ui.layout.form.ResponsiveGridLayout("idPPLFormLayout",{
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
		     var oPPLForm = new sap.ui.layout.form.Form("idFormPPL",{
		             layout: oPPLFormLayout,
		             formContainers: [
		                     
		                     new sap.ui.layout.form.FormContainer("idPPLFormC1",{
	                             formElements: [
													new sap.ui.layout.form.FormElement({
													    fields: [oLabelDepot, oInputDepot, oDepotInputPPL, oFlexApplyRemovePPL]
													}),
													new sap.ui.layout.form.FormElement({
//													    fields: [oLabelPeriod, oComboPeriod]      // MAC25022015-
														fields: [oLabelPeriod, oFlexDate]		  // MAC25022015+
													}),
													new sap.ui.layout.form.FormElement({
													    fields: [oLabelMsgType, oComboMessageType]
													}),
													new sap.ui.layout.form.FormElement({
													    fields: [oLabelUnitNumber, oInputUnitNumber]
													}),
													new sap.ui.layout.form.FormElement({
													    fields: [oLabelResult, oComboResult]
													}),
													new sap.ui.layout.form.FormElement({
													    fields: [oBtnSubmit]
													}),
													new sap.ui.layout.form.FormElement({
													    fields: [oLabelMandatory]
													})
		                                     ]
		                     }),
		                     
		                     new sap.ui.layout.form.FormContainer("idPPLFormC2",{
	                             formElements: []
		                     })
		             ]
		     });
		 
		     var vHDivider = new sap.ui.commons.HorizontalDivider({width: "95%", type: "Area", height: "Medium"}).addStyleClass("marginTop10");
		     
		     // Responsive Grid Layout
			    var oPPLResultFormLayout = new sap.ui.layout.form.ResponsiveGridLayout("idPPLResultFormLayout",{
			    	  labelSpanL: 1,
		              labelSpanM: 1,
		              labelSpanS: 1,
		              emptySpanL: 0,
		              emptySpanM: 0,
		              emptySpanS: 0,
		              columnsL: 2,
		              columnsM: 1,
		              columnsS: 1,
		              breakpointL: 765,
		              breakpointM: 320
			    });
			
			    // Online Form Starts
			     var oPPLResultForm = new sap.ui.layout.form.Form("idResultFormPPL",{
			             layout: oPPLResultFormLayout,
			             formContainers: [
			                     
			                     new sap.ui.layout.form.FormContainer("idPPLResultFormC1",{
		                             formElements: [
														new sap.ui.layout.form.FormElement("idResultFormElementPPL",{
														    fields: []
														})
														]
			                     })
			                     ]
			     });  
			     
			     var oFlexboxResults = new sap.m.FlexBox({
		              items: [
		                oPPLForm,vHDivider,
		                oPPLResultForm        
		              ],
		              direction: "Column"
		            });
		     
		     return oFlexboxResults;
	}, //createPPLForm
	
	populateDepotNamePPL: function(){
		
		busyDialog.open();
			oModel = new sap.ui.model.odata.ODataModel(serviceUrl15_old, true);
			var urlToCallLASDep = serviceUrl15_old + "/F4_Functional_Location";
			//alert("urlToCallLASDep : "+urlToCallLASDep);
			OData.request({ 
			      requestUri: urlToCallLASDep,
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
			    		depotNameListPPL[i] = data.results[i].FunctionalLoc;
					}
			    	
			    	//alert("depotNameListAMOS len : "+depotNameListAMOS.length);
			    	
			    	$( "#idDepotPPL" ).autocomplete({
			    	      source: depotNameListPPL,
			    	      minLength: 0,
			    	      select: function(){
			    	    	  	document.getElementById("idDepotPPL").style.borderColor = "#cccccc";
			    				document.getElementById("idDepotPPL").style.background = "#ffffff";
			    				document.getElementById("idDepotPPL").placeholder = "Depot";
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
			    	    for (i in depotNameListPPL) {
			    	        if (depotNameListPPL[i].toLowerCase().match(this.value.toLowerCase())) {
			    	            isValid = true;
			    	        }
			    	    }
			    	    if (!isValid) {
			    	        this.value = previousValue;
			    	    } else {
			    	        previousValue = this.value;
			    	    }
			    	});
			    	
			    	loggedInUserTypePPL = objLoginUser.getLoggedInUserType();
					if(loggedInUserTypePPL == "SEACO"){
						$("#idDepotPPL").removeAttr('disabled');
						$("#idDepotPPL").attr("disabled","disabled");
						sap.ui.getCore().byId("idButtonRemoveFilterPPL").setEnabled(true);
						sap.ui.getCore().byId("idButtonApplyFilterPPL").setEnabled(true);
						sap.ui.getCore().byId("idDepotInputPPL").setEnabled(true);
					}
					else{
						var DepotCode = objLoginUser.getLoggedInUserID();
						for(var i=0;i<depotNameListPPL.length;i++){
							if(depotNameListPPL[i].substring(11,15) == DepotCode)
								DepotCode = depotNameListPPL[i];
						}
						$("#idDepotPPL").attr("disabled","disabled");
						$("#idDepotPPL").val(DepotCode);
						sap.ui.getCore().byId("idButtonRemoveFilterPPL").setEnabled(false);
						sap.ui.getCore().byId("idButtonApplyFilterPPL").setEnabled(false);
						sap.ui.getCore().byId("idDepotInputPPL").setEnabled(false);
						var depotZCEM = document.getElementById("idDepotPPL").value.split("-");
						sap.ui.getCore().byId("idDepotInputPPL").setValue(depotZCEM[3]);
					}
					
					/*
			    	oModelPPLDepot.setData(data.results);
			    	
					var oDepotPPL = sap.ui.getCore().byId("idDepotPPL");
					oDepotPPL.setModel(oModelPPLDepot);
					oDepotPPL.bindItems("/",new sap.ui.core.ListItem({text: "{FunctionalLoc}"}));
					//vComboCustomer.insertItem((new sap.ui.core.ListItem({text:"Select Customer", key:"0"})),0);
					
					oModelPPLDepot.updateBindings();
			    	//busyDialog.close();
					*/
			    	busyDialog.close();
			    },
			    function(err){
			    	 errorfromServer(err);
			    	//alert("Error while Reading Result : "+ : window.JSON.stringify(err.response));
			    });
		}, //populateDepotNamePPL
		
	ValidatePPLForm: function(){
		var vDepot = document.getElementById("idDepotPPL").value;
		var vSerialNo = sap.ui.getCore().byId("idUnitNoPPL").getValue();
		var isValid = true;
		
		if(vSerialNo.trim().length > 0){
			if(vSerialNo.trim().length != 11){
				sap.ui.getCore().byId("idUnitNoPPL").setValue("");
				sap.ui.getCore().byId("idUnitNoPPL").setPlaceholder("Invalid Unit Number");
				sap.ui.getCore().byId("idUnitNoPPL").setValueState(sap.ui.core.ValueState.Error);
				isValid = false;
			}
		}
		else{
			sap.ui.getCore().byId("idUnitNoPPL").setValueState(sap.ui.core.ValueState.None);
			sap.ui.getCore().byId("idUnitNoPPL").setPlaceholder("Unit Number");
		}
		if(vDepot.trim() == ""){
			document.getElementById("idDepotPPL").style.borderColor = "red";
    		document.getElementById("idDepotPPL").style.background = "#FAD4D4";
    		document.getElementById("idDepotPPL").placeholder = "Required";
    		isValid = false;
	  	  }
		else{
			var match = jQuery.inArray(vDepot,depotNameListPPL);
			if(match < 0){
				document.getElementById("idDepotPPL").style.borderColor = "red";
	    		document.getElementById("idDepotPPL").style.background = "#FAD4D4";
	    		document.getElementById("idDepotPPL").value = "";
	    		document.getElementById("idDepotPPL").placeholder = "Invalid Depot";
	    		isValid = false;
			}
			else{
				document.getElementById("idDepotPPL").style.borderColor = "#cccccc";
	    		document.getElementById("idDepotPPL").style.background = "#ffffff";
	    		document.getElementById("idDepotPPL").placeholder = "Depot";
			}
		}
		
		return isValid;
	}, //ValidatePPLForm
		
	CreatePPLResultTable:function(){
		oCurrent = this;		// MAC25022015 +
		if(sap.ui.getCore().byId("idResultTblPPL"))
			sap.ui.getCore().byId("idResultFormElementPPL").destroyFields();
		
		// Table
    	var oPPLResultTable = new sap.ui.table.Table("idResultTblPPL",{
    		visibleRowCount: 25,
            firstVisibleRow: 3,
            columnHeaderHeight: 40,
            width: 'auto',
            selectionMode: sap.ui.table.SelectionMode.None,
            navigationMode: sap.ui.table.NavigationMode.Paginator,
    	 }).addStyleClass("tblBorder");
    	
    	oPPLResultTable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Transaction ID"}),
            resizable:false,
            visible:false,
            template: new sap.ui.commons.TextView().bindProperty("text", "TranxId"),
            sortProperty: "TranxId",
            filterProperty: "TranxId",
            width:"auto",	// MACHANACHANGES_12062019 changed from xx px to auto
       	 }));
    	
    	oPPLResultTable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Message Type"}),
            resizable:false,
            template: new sap.ui.commons.TextView().bindProperty("text", "Msgtype"),
            sortProperty: "Msgtype",
            filterProperty: "Msgtype",
            width:"auto",	// MACHANACHANGES_12062019 changed from xx px to auto
       	 }));
    	
    	oPPLResultTable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Process Date"}),
            resizable:false,
            template: new sap.ui.commons.TextView().bindProperty("text", "Erdat"),
            sortProperty: "Erdat",
            filterProperty: "Erdat",
            width:"auto",	// MACHANACHANGES_12062019 changed from xx px to auto
       	 }));
    	
    	oPPLResultTable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Process Time"}),
            resizable:false,
            template: new sap.ui.commons.TextView().bindProperty("text", "Ertim"),
            sortProperty: "Ertim",
            filterProperty: "Ertim",
            width:"auto",	// MACHANACHANGES_12062019 changed from xx px to auto
       	 }));
    	
    	
    	oPPLResultTable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Unit Number"}).addStyleClass("paddingLeft15"),
            resizable:false,
            template: new sap.ui.commons.TextView().addStyleClass("paddingLeft15").bindProperty("text", "Equnr"),
            sortProperty: "Equnr",
            filterProperty: "Equnr",
            width:"auto",	// MACHANACHANGES_12062019 changed from xx px to auto
       	 }));
    	
    	oPPLResultTable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Message Status"}),
            resizable:false,
            template: new sap.ui.commons.Link({			// MAC25022015 Link included
				press : function() {
					oCurrent.getMessageDetails(this.getHelpId());
				}
			}).bindProperty("text", "MsgStatus").bindProperty("helpId","TranxId").bindProperty("enabled","isEnabledLink").addStyleClass("wraptext"),
            sortProperty: "MsgStatus",
            filterProperty: "MsgStatus",
            width:"auto",	// MACHANACHANGES_12062019 changed from xx px to auto
       	 }));
    	
    	oPPLResultTable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Message Details"}),
            resizable:false,
            visible:false,
            template: new sap.ui.commons.TextView().bindProperty("text", "Message"),
            sortProperty: "Message",
            filterProperty: "Message",
            width:"auto",	// MACHANACHANGES_12062019 changed from xx px to auto
       	 }));
    	
    /*	oPPLResultTable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Error Type"}),
            resizable:false,
            template: new sap.ui.commons.TextView().bindProperty("text", "MsgSeverity"),
            sortProperty: "MsgSeverity",
            filterProperty: "MsgSeverity",
            width:"60px",
       	 }));
    	
    	oPPLResultTable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Error ID"}),
            resizable:false,
            template: new sap.ui.commons.TextView().bindProperty("text", "MsgId"),
            sortProperty: "MsgId",
            filterProperty: "MsgId",
            width:"80px",
       	 }));
    	
    	oPPLResultTable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Error Message"}),
            resizable:false,
            template: new sap.ui.commons.TextView().bindProperty("text", "FieldName"),
            sortProperty: "FieldName",
            filterProperty: "FieldName",
            width:"80px",
       	 }));
    	
    	oPPLResultTable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Error Number"}),
            resizable:false,
            template: new sap.ui.commons.TextView().bindProperty("text", "MsgNumber"),
            sortProperty: "MsgNumber",
            filterProperty: "MsgNumber",
            width:"60px",
       	 }));*/
    	
    	oPPLResultTable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "User ID"}),
            resizable:false,
            template: new sap.ui.commons.TextView().bindProperty("text", "Bname"),
            sortProperty: "Bname",
            filterProperty: "Bname",
            width:"auto",	// MACHANACHANGES_12062019 changed from xx px to auto
       	 }));
    	
    	var oBtnViewAllDetail = new sap.m.Button("idBtnViewAllPPLResult",{
            text : "View All",
            styled:false,
            width:"80px",
            press:function(){
                  this.setVisible(false);
                  var vArrayLength = aPPLResultCompressed.length;
		        	if(vArrayLength < 100){
		        		sap.ui.getCore().byId("idResultTblPPL").setVisibleRowCount(vArrayLength);
		        		sap.ui.getCore().byId("idResultTblPPL").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		        	}
		        	else{
		        		sap.ui.getCore().byId("idResultTblPPL").setVisibleRowCount(100);
		        		sap.ui.getCore().byId("idResultTblPPL").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		        	}
            }
         }).addStyleClass("submitBtn marginTop10");
    	
		var btnExport = new sap.m.Button({
			          text : "Export To Excel",
			          styled:false,
			          icon: sap.ui.core.IconPool.getIconURI("excel-attachment"),
			          press:function(){
						  objUtil = new utility();
			        	  objUtil.makeHTMLTable(jsonInventory, "Portal Processing Log","export");
			          }
				}).addStyleClass("submitBtn marginBottom10 floatLeft");
		
    	var oFlexboxFinal = new sap.m.FlexBox("idViewAllBtnFlexboxPPL",{
		      items: [btnExport,
					  oPPLResultTable,
		              oBtnViewAllDetail
		      ],
		      direction: "Column"
		    });
    	
    	 sap.ui.getCore().byId("idResultFormElementPPL").insertField(oFlexboxFinal,0);
    	
	}, //CreatePPLResultTable
	
	/* Begin of adding by Seyed Ismail on 25.02.2015 MAC25022015*/
	getMessageDetails: function(TranxId){
		oCurrent = this;
		var bus = sap.ui.getCore().getEventBus();
		bus.publish("nav", "to", {id : "PortalProcessingError"});
		
		var details = jQuery.grep(aPPLResult, function(element, index){
            return element.TranxId == TranxId;
    	});
		
		oCurrent.fillErrorTable(details);
	},
	
	createErrorPage: function(){
		if(sap.ui.getCore().byId("idErrorTblPPL"))
			sap.ui.getCore().byId("idResultFormElementPPL").destroyFields();
		
		var oBackFromErrorScreen = new sap.m.Link({
			text: " < Back",
            width:"12%",
            wrapping:true,
            press: function(){
                    var bus = sap.ui.getCore().getEventBus();
                    bus.publish("nav", "back");
            }});
		
		var oLabelMessageType = new sap.ui.commons.Label({text: "Message Type : ",
			layoutData: new sap.ui.layout.GridData({span: "L1 M1 S1",linebreak: false, margin: true}),
            wrapping: true}).addStyleClass("marginTop10 marginRight5 fontTitleBold");

		var ValueMessageType = new sap.ui.commons.Label("idMessageType", {text: "",
			layoutData: new sap.ui.layout.GridData({span: "L4 M6 S6",linebreak: false, margin: true}),
            wrapping: true}).addStyleClass("marginTop10 marginRight5 fontTitleBold");
		
	     var oFlexboxMessageType = new sap.m.FlexBox({
             items: [ oLabelMessageType, ValueMessageType  ],
             direction: "Row"
           }).addStyleClass("marginTop50");
		
		var oLabelPDate = new sap.ui.commons.Label({text: "Process Date : ",
			layoutData: new sap.ui.layout.GridData({span: "L4 M6 S6",linebreak: false, margin: true}),
            wrapping: true}).addStyleClass("marginTop10 marginRight5 fontTitleBold");

		var ValuePDate = new sap.ui.commons.Label("idPDate", {text: "",
			layoutData: new sap.ui.layout.GridData({span: "L4 M6 S6",linebreak: false, margin: true}),
            wrapping: true}).addStyleClass("marginTop10 marginRight5 fontTitleBold");
		
	     var oFlexboxPDate = new sap.m.FlexBox({
             items: [ oLabelPDate, ValuePDate  ],
             direction: "Row"
           });
	     
		var oLabelUnitNumber = new sap.ui.commons.Label({text: "Unit Number : ",
			layoutData: new sap.ui.layout.GridData({span: "L4 M6 S6",linebreak: false, margin: true}),
            wrapping: true}).addStyleClass("marginTop10 marginRight5 fontTitleBold");

		var ValueUnitNumber = new sap.ui.commons.Label("idUnitNumber", {text: "",
			layoutData: new sap.ui.layout.GridData({span: "L4 M6 S6",linebreak: false, margin: true}),
            wrapping: true}).addStyleClass("marginTop10 marginRight5 fontTitleBold");
		
	     var oFlexboxUnitNumber = new sap.m.FlexBox({
             items: [ oLabelUnitNumber, ValueUnitNumber  ],
             direction: "Row"
           });
	     
		var oLabelUserID = new sap.ui.commons.Label({text: "User ID : ",
			layoutData: new sap.ui.layout.GridData({span: "L4 M6 S6",linebreak: false, margin: true}),
            wrapping: true}).addStyleClass("marginTop10 marginRight5 fontTitleBold");

		var ValueUserID = new sap.ui.commons.Label("idUserID", {text: "",
			layoutData: new sap.ui.layout.GridData({span: "L4 M6 S6",linebreak: false, margin: true}),
            wrapping: true}).addStyleClass("marginTop10 marginRight5 fontTitleBold");
		
	     var oFlexboxUserID = new sap.m.FlexBox({
             items: [ oLabelUserID, ValueUserID  ],
             direction: "Row"
           });

		
		// Table
    	var oPPLErrorTable = new sap.ui.table.Table("idErrorTblPPL",{
    		visibleRowCount: 25,
            firstVisibleRow: 3,
            columnHeaderHeight: 40,
            width: '50%',
            selectionMode: sap.ui.table.SelectionMode.None,
            navigationMode: sap.ui.table.NavigationMode.Paginator,
    	 }).addStyleClass("tblBorder marginTop50");
    	
    	oPPLErrorTable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Message Details"}),
            resizable:false,
            template: new sap.ui.commons.TextView().bindProperty("text", "Message"),
            sortProperty: "Message",
            filterProperty: "Message",
            width:"auto",
       	 }));
    	
	     var oFlexboxError = new sap.m.FlexBox({
             items: [ oBackFromErrorScreen, oFlexboxMessageType, oFlexboxPDate, oFlexboxUnitNumber, oFlexboxUserID, oPPLErrorTable  ],
             direction: "Column"
           });
    
    return oFlexboxError;
    	
	},
	
	fillErrorTable: function(detailsTable){
		var oErrorTable = sap.ui.getCore().byId("idErrorTblPPL");
		var oModelPPLError = new sap.ui.model.json.JSONModel();
		oModelPPLError.setData({modelData: detailsTable});
		oErrorTable.setModel(oModelPPLError);
		oErrorTable.bindRows("/modelData");
		
		var vErrorLength = detailsTable.length;
		oErrorTable.setVisibleRowCount(vErrorLength);
		
		var oMessageType = sap.ui.getCore().byId("idMessageType");
		oMessageType.setText(detailsTable[0].Msgtype);
		
		var oPDate = sap.ui.getCore().byId("idPDate");
		oPDate.setText(detailsTable[0].Erdat);
		
		var oUnitNumber = sap.ui.getCore().byId("idUnitNumber");
		oUnitNumber.setText(detailsTable[0].Equnr);
		
		var oUserID = sap.ui.getCore().byId("idUserID");
		oUserID.setText(detailsTable[0].Bname);
    		
	},
	/* End of adding by Seyed Ismail on 25.02.2015 MAC25022015*/
	getProcessingLogResultPPL: function(){
		var oCurrent = this;
		///sap/opu/odata/sap/ZNW_SEACO_PORTAL_REQ15_SRV/Portal_Processing_Log?$filter=Bname eq '' and DepoCode eq 'NAE-US-MIA-1327' and Equnr eq 'SCZU7116144' and Msgtype eq 'GATEIN' and Period eq 'LM' and Results eq 'ERROR'
		busyDialog.open();
		var vSelDepValPPL = document.getElementById("idDepotPPL").value;
		var partsDepPPL = vSelDepValPPL.split("-");
	    var depotCodeToPass = partsDepPPL[0] + "-" + partsDepPPL[1] + "-" + partsDepPPL[2] + "-" + partsDepPPL[3]; //partsDepPPL[partsDepPPL.length - 2];
		// var selPeriodPPL = sap.ui.getCore().byId("idPeriodPPL").getSelectedKey(); // MAC25022015-
		/* FIORIOPT -
		var vDateFrom = sap.ui.getCore().byId("idPortalFrom").getValue();			// MAC25022015+
		var vDateTo = sap.ui.getCore().byId("idPortalTo").getValue();				// MAC25022015+
		

		var splitvar = vDateFrom.split('-');
		var vDateFromFin = splitvar[2]+'-'+ splitvar[1]+'-'+splitvar[0]+'T00:00:00';
		
		splitvar = vDateTo.split('-');
		var vDateToFin = splitvar[2]+'-'+ splitvar[1]+'-'+splitvar[0]+'T00:00:00';
		FIORIOPT -
		*/
		
		// FIORIOPT +
		
		var vDateFrom = sap.ui.getCore().byId("idPortalFrom").getYyyymmdd();			
		var vDateTo = sap.ui.getCore().byId("idPortalTo").getYyyymmdd();				
		
		var vDateFromFin = vDateFrom.substr(0, 4)+'-'+vDateFrom.substr(4, 2)+'-'+vDateFrom.substr(6, 2)+'T00:00:00';
		
		var vDateToFin = vDateTo.substr(0, 4)+'-'+vDateTo.substr(4, 2)+'-'+vDateTo.substr(6, 2)+'T00:00:00';
		
		// FIORIOPT +
		var vSelMsgType = sap.ui.getCore().byId("idMessageTypePPL").getSelectedKey();
		var vSelResultType = sap.ui.getCore().byId("idResultPPL").getSelectedKey();
		var vEnteredUnitNumber = sap.ui.getCore().byId("idUnitNoPPL").getValue().toUpperCase().trim();
		
		var urlToCall = serviceUrl15_old + "/Portal_Processing_Log?$filter=Bname eq '' and DepoCode eq '" + depotCodeToPass + "' and Equnr eq '" + vEnteredUnitNumber + "' and Msgtype eq '" + vSelMsgType + "' and Datefrom eq datetime'" + vDateFromFin + "' and Dateto eq datetime'" + vDateToFin + "' and Results eq '" + vSelResultType + "'";
		//alert("URL TO CALL " + urlToCall);
		oModel = new sap.ui.model.odata.ODataModel(serviceUrl15_old, true);
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
		    	aPPLResult = [];
		    	if(data.results.length > 0 ){
		    		oCurrent.CreatePPLResultTable();
		    		aPPLResult = data.results;
		    		for (var j=0; j < data.results.length ; j++){
		    			
		    			  var vActualTime = aPPLResult[j].Ertim;
						  var vSendTime = vActualTime.replace(/[HMS]/g, ":").substring(2,10);
						  aPPLResult[j].Ertim = vSendTime;
						 
			    		  var vProcessDate = aPPLResult[j].TranxDate.split("(");
						  var vDate = vProcessDate[1].split(")");
						  var vformattedProcessDate = new Date(Number(vDate[0])); //dateFormat(new Date(Number(vDate[0])), 'dd-mm-yyyy');
						  var ProcessDate = dateFormat(new Date(Number(vDate[0])), 'dd-mm-yyyy',"UTC");
						  if (ProcessDate.substring(6) === "9999"){
							  aPPLResult[j].TranxDate =  "-";
							  aPPLResult[j]["TranxDateActual"] = vformattedProcessDate;
						  }
						  else{
							  aPPLResult[j].TranxDate = ProcessDate;
							  aPPLResult[j]["TranxDateActual"]=vformattedProcessDate;
						 }
						  
						  
						  /* Begin of adding by Seyed Ismail on 25.02.2015 MAC25022015 */
						  
			    		  var vCreatedDate = aPPLResult[j].Erdat.split("(");
						  var vCDate = vCreatedDate[1].split(")");
						  var vformattedCreatedDate = new Date(Number(vCDate[0])); //dateFormat(new Date(Number(vDate[0])), 'dd-mm-yyyy');
						  var CreatedDate = dateFormat(new Date(Number(vCDate[0])), 'dd-mm-yyyy',"UTC");
						  if (CreatedDate.substring(6) === "9999"){
							  aPPLResult[j].Erdat =  "-";
							  aPPLResult[j]["TranxDateActual"] = vformattedCreatedDate;
						  }
						  else{
							  aPPLResult[j].Erdat = CreatedDate;
							  aPPLResult[j]["TranxDateActual"]=vformattedCreatedDate;
						 }
						  
						  /* End of adding by Seyed Ismail on 25.02.2015 MAC25022015 */
						  
						  if(aPPLResult[j].MsgStatus.trim().toUpperCase() == "NE")
							  aPPLResult[j].MsgStatus = "Not Executed";
						  
		    		}
		    		
		    		// Remove duplicates based on Message Type, Date & Equipment Number
		    		aPPLResultCompressed = [];
		    		for (var i=0; i < aPPLResult.length ; i++){
		    			if( i == 0 || aPPLResult[i].TranxId != aPPLResult[i-1].TranxId){
		    				  aPPLResultCompressed.push({
		    				  'TranxId':aPPLResult[i].TranxId, 
  	                		  'Msgtype':aPPLResult[i].Msgtype,
  	                		  'Erdat':aPPLResult[i].Erdat,
  	                		  'Ertim':aPPLResult[i].Ertim,
  	                		  'Equnr':aPPLResult[i].Equnr,
  	                		  'MsgStatus':aPPLResult[i].MsgStatus,
  	                		  'Bname':aPPLResult[i].Bname,
  	                		  'isEnabledLink': (aPPLResult[i].MsgStatus != 'SUCCESS' ? true : false)
  	                  });
		    		}
		    		}
					
					// Preparing Export to Excel
		    		jsonInventory = [];
					for(var i=0; i<aPPLResult.length;i++){
  	                    // make Custom JSON for Table - Excel/Print
  	                  jsonInventory.push({
  	                		  'Message Type':aPPLResult[i].Msgtype,
  	                		  'Process Date':aPPLResult[i].Erdat,
  	                		  'Process Time':aPPLResult[i].Ertim,
  	                		  'Unit Number':aPPLResult[i].Equnr,
  	                		  'Message Status':aPPLResult[i].MsgStatus,
  	                		  'Message Details':aPPLResult[i].Message,
  	                		  'User ID':aPPLResult[i].Bname
  	                  });
  		    		}
					
					
		    		oModelPPLResult.setData({modelData: aPPLResultCompressed});
			    	var vResultTbl = sap.ui.getCore().byId("idResultTblPPL");
			    	var vViewAll = sap.ui.getCore().byId("idBtnViewAllPPLResult");
			    	vResultTbl.setModel(oModelPPLResult);
			    	vResultTbl.bindRows("/modelData");
			    	var vArrayLength = aPPLResultCompressed.length;
			        	if(vArrayLength < 25){
			        		vResultTbl.setVisibleRowCount(vArrayLength);
			        		vResultTbl.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
			        		vViewAll.setVisible(false);
			        	}
			        	else{
			        		vResultTbl.setVisibleRowCount(25);
			        		vResultTbl.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
			        		vViewAll.setVisible(true);
			        	}
		    		busyDialog.close();
		    	}
		    	else{
		    		if(sap.ui.getCore().byId("idResultTblPPL"))
		    			sap.ui.getCore().byId("idResultFormElementPPL").destroyFields();
		    		busyDialog.close();
		    		sap.ui.commons.MessageBox.alert("No Results Found. Please edit / refine your search criteria and search again.");
		    	}
		    },
		    function(err){
		    	 busyDialog.close();
		    	 errorfromServer(err);
		    	//alert("Error while Reading Result : "+ window.JSON.stringify(err.response));
		    });
	}, //getProcessingLogResultPPL
	
	resetPortalProcessngLog: function(){
		loggedInUserTypePPL = objLoginUser.getLoggedInUserType();
		if(loggedInUserTypePPL == "SEACO"){
			$("#idDepotPPL").val("");
			if(document.getElementById("idDepotPPL")){
	                document.getElementById("idDepotPPL").style.borderColor = "#cccccc";
		    		document.getElementById("idDepotPPL").style.background = "#ffffff";
		    		document.getElementById("idDepotPPL").placeholder = "Depot";
              }
		}
		sap.ui.getCore().byId("idUnitNoPPL").setValue("");
		 if(sap.ui.getCore().byId("idUnitNoPPL")){
         	  sap.ui.getCore().byId("idUnitNoPPL").setValueState(sap.ui.core.ValueState.None);
         	  sap.ui.getCore().byId("idUnitNoPPL").setPlaceholder("Unit Number");
           }
		sap.ui.getCore().byId("idMessageTypePPL").setValue("");
		 if(sap.ui.getCore().byId("idMessageTypePPL")){
         	  sap.ui.getCore().byId("idMessageTypePPL").setValueState(sap.ui.core.ValueState.None);
         	  sap.ui.getCore().byId("idMessageTypePPL").setPlaceholder("Message Type");
           }
		/* Begin of commenting by Seyed Ismail on 25.02.2015 MAC25022015+*/
		/*sap.ui.getCore().byId("idPeriodPPL").setValue("");
		 if(sap.ui.getCore().byId("idPeriodPPL")){
         	  sap.ui.getCore().byId("idPeriodPPL").setValueState(sap.ui.core.ValueState.None);
         	  sap.ui.getCore().byId("idPeriodPPL").setPlaceholder("Period");
           }*/
		/* End of commenting by Seyed Ismail on 25.02.2015 MAC25022015+*/
		 /* Begin of adding by Seyed Ismail on 06.02.2015 MAC25022015 */
			sap.ui.getCore().byId("idPortalFrom").setValueState(sap.ui.core.ValueState.None);
	        sap.ui.getCore().byId("idPortalFrom").setPlaceholder("");
	        sap.ui.getCore().byId("idPortalTo").setValueState(sap.ui.core.ValueState.None);
	        sap.ui.getCore().byId("idPortalTo").setPlaceholder("");
			sap.ui.getCore().byId("idPortalFrom").setValue("");
	        sap.ui.getCore().byId("idPortalTo").setValue("");
	        /* End of adding by Seyed Ismail on 06.02.2015 MAC25022015 */
		sap.ui.getCore().byId("idResultPPL").setValue("");
		 if(sap.ui.getCore().byId("idResultPPL")){
         	  sap.ui.getCore().byId("idResultPPL").setValueState(sap.ui.core.ValueState.None);
         	  sap.ui.getCore().byId("idResultPPL").setPlaceholder("Result");
           }
		
		if(sap.ui.getCore().byId("idResultFormElementPPL"))
			sap.ui.getCore().byId("idResultFormElementPPL").destroyFields();
	}
});
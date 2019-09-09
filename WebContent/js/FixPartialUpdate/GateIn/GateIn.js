/*
 *$*$------------------------------------------------------------------------*
*$*$ Modified By : Seyed Ismail MAC
*$*$ Modified On : 24.04.2015
*$*$ Reference   : RTS1139
*$*$ Transport   : CGWK900946
*$*$ Tag         : MAC24042015
*$*$ Purpose     : UI5 : Old Portal Removal Project - Remove Dependencies in the sequence
				   To keep a button to delete U messages
*$*$---------------------------------------------------------------------
*

 */

jQuery.sap.require("sap.ui.model.json.JSONModel");
var oCurrMIFPU;
var depotNameListMIFPU = [];
var aMoveInFromLeaseALL = [];
var aMoveInFromLease = [];
var seletedStatusMIFPU;
var seletedStepIdMIFPU;
var stepWiseFilterMIFPU = [
	 {stepId: "001", actions:"Validate in ECC", filter:"/Gatein_Valid_Tst_Hrns_ECC" },
	 {stepId: "002", actions:"Validate in CRM", filter:"/Gatein_Valid_crm_ECC"},
	 {stepId: "003", actions:"Store in ECC", filter:"/Gatein_Store_Tst_Harness_ECC"},
	 {stepId: "004", actions:"Store in Storage table in ECC", filter:"/Gatein_Str_Chrg_Hrns_ECC"},
	 {stepId: "005", actions:"Store in CRM", filter:"/Gatein_Store_crm_ECC"},
];

var checkedForResubmitMIFL = [];
var counterMIFPU;
var btnFlagGateInFPU = "";
// Error Processing Related
var oCurrEPMIFPU;
var errorProcessingMIFPU = [];
var enabledGrp1EPMIFPU = true;
var enabledGrp2EPMIFPU = false;
var ocurrentEPMIFPU;
var locallySavedMIFPU = [];

sap.ui.model.json.JSONModel.extend("moveInFromLeaseView", {
	
	createMoveInFromLease: function(){
		
		oCurrMIFPU = this;
		var back = new sap.m.Link("idBckMIFLStatusU",{text: " < Back",
			width:"8%",
			wrapping:true,
			visible:false,
            press: function(){
                   var bus = sap.ui.getCore().getEventBus();
                       bus.publish("nav", "back");
                       $('#idHdrContnt').html('EDI Message - Status U'); //CHANGE HEADER CONTENT
        }});
		
		var oLabelSerialNo = new sap.ui.commons.Label({text: "Serial Number:",
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S3",linebreak: true, margin: true}),
			required: true,
            wrapping: true});
		
		var oLabelDepo = new sap.ui.commons.Label({text: "Depot :",
			required: true,
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S3",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");
		
		var oLabelGateDate = new sap.ui.commons.Label({text: "Gate Date:",
			required: false,			// MAC24042015 Changed from true to false
			visible: false,				// MAC24042015
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S3",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");
		
		var oLabelRelAuth = new sap.ui.commons.Label({text: "Return Authorisation: ",
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S3",linebreak: true, margin: true}),
            wrapping: true,
            visible: false}).addStyleClass("marginTop10");
		
		var oLabelMandatory = new sap.ui.commons.Label({text: "Mandatory Field",
			required: true,
			requiredAtBegin : true,
            wrapping: true}).addStyleClass("marginTop10");
		
		var oLabelSpace = new sap.ui.commons.Label({text: "",
            width: "10px"
            });
		
    	var oInputSerialNo = new sap.ui.commons.TextField('idSerialNoMIFPU',{
    		layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
    		placeholder: "Serial Number",
    		//value: "GESU4039140",
    		//value:"GESU8021067",
    		//value:"SCZU7120078",
    		//value:"SCZU7116144",
    		change: function(){
    			this.setValueState(sap.ui.core.ValueState.None);
    			this.setPlaceholder("Serial Number");
    		}
    	}).addStyleClass("FormInputStyle");
    	
    	var oInputDepot = new sap.ui.core.HTML("idDepotHTMLMIFPU",{layoutData: new sap.ui.layout.GridData({span: "L4 M9 S12"})});
		var htmlContentDepot = '<input id="idDepotMIFPU" placeholder="Depot" class="FormInputStyle marginTop10" style="width:100%">';
		oInputDepot.setContent(htmlContentDepot);
    	
		/*var oModelCurrDateMIFPU = new sap.ui.model.json.JSONModel();
		oModelCurrDateMIFPU.setData({
	   		dateValue: new Date()
		});*/
    	var oInputGateDate = new sap.ui.commons.DatePicker('idGateDateMIFPU',{
    		visible: false,		// MAC24042015
    		value: {
                path: "/dateValue",
                type: new sap.ui.model.type.Date({pattern: "dd-MM-yyyy"})
    			},
    			placeholder: "Gate Date",
    			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S9"}),
    			//yyyymmdd: "20140312",
    			//yyyymmdd: "20140414",
    			//yyyymmdd: "20140421",
    			//yyyymmdd:"20140423",
    			liveChange:function(oControlEvent){
    				this.setPlaceholder("Gate Date");
    				this.setValueState(sap.ui.core.ValueState.None);
    			},
    	});
    	//oInputGateDate.setModel(oModelCurrDateMIFPU);
    	oInputGateDate.addStyleClass("FormInputStyle marginTop10");
    	oInputGateDate.attachChange(
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
    	
    	/* Begin of adding by Seyed Ismail on 24.04.2015 MAC24042015*/ 

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
		
    	var oGateInFrom = new sap.ui.commons.DatePicker("idGateInFrom",{
    		value: {
                path: "/dateValue",
                type: new sap.ui.model.type.Date({pattern: "dd-MM-yyyy"}),
                mode: sap.ui.model.BindingMode.OneWay
    			},
    			width:"100px",
    			layoutData: new sap.ui.layout.GridData({span: "L2 M2 S3"}),
    	});
    	//oInputOffHireDateFrom.setModel(oModelCurrDateCRUOH);
    	oGateInFrom.addStyleClass("FormInputStyle margin5Top");
    	oGateInFrom.setLocale("en-US");
    	oGateInFrom.attachChange(
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
    	
    	var oGateInTo = new sap.ui.commons.DatePicker("idGateInTo",{
    		value: {
                path: "/dateValue",
                type: new sap.ui.model.type.Date({pattern: "dd-MM-yyyy"}),
                mode: sap.ui.model.BindingMode.OneWay
    			},
    			width:"100px",
    			layoutData: new sap.ui.layout.GridData({span: "L2 M2 S3"}),
    	});
    	//oInputOffHireDateTo.setModel(oModelCurrDateCRUOH);
    	oGateInTo.addStyleClass("FormInputStyle margin5Top");
    	oGateInTo.setLocale("en-US");
    	oGateInTo.attachChange(
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
		        oGateInFrom,
		        oLabelSpaceForDate,
		        oLabelTo,
		        oGateInTo
		      ],
		      layoutData: new sap.ui.layout.GridData({span: "L8 M9 S12",linebreak: false, margin: true}),
		      direction: "Row"
		});
		
		var oLabelPeriod = new sap.ui.commons.Label({text: "Period:",
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S3",linebreak: true, margin: true}),
            wrapping: true});
		
    	/* End of adding by Seyed Ismail on 24.04.2015 MAC24042015*/ 
    	
    	 var oInputRelAuth = new sap.ui.commons.TextField('idRelAuthMIFPU',{
    		layoutData: new sap.ui.layout.GridData({span: "L2 M3 S9"}),
    		placeholder: "Return Authorization",
    		visible: false
    		//value:"402423",
    	}).addStyleClass("FormInputStyle marginTop10");
    	
    	// Buttons
	   	 var oBtnSearchPortalTrans = new sap.m.Button("idBtnSearchPortalTransMIEDI",{
		          text : "Search for Portal Transactions",
		          width:"220px",
		          styled:false,
		          layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: true, margin: true}),
		          press:function(){
		        	  btnFlagGateInFPU = "P";
		        	  if(oCurrMIFPU.validateMoveInLease())
		        		  oCurrMIFPU.bindMoveInLease("","submit");
		}}).addStyleClass("submitBtn marginTop10");
	   	 
	   	var oBtnSearchEDIMsgs = new sap.m.Button("idBtnSearchEDIMsgsMIEDI",{
	        text : "Search for EDI Messages",
	        width:"220px",
	        styled:false,
	        visible: true,				// MAC25022015 +
	        layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: true, margin: true}),
	        press:function(){
	        	btnFlagGateInFPU = "E";
	      	  if(oCurrMIFPU.validateMoveInLease())
	      		oCurrMIFPU.bindMoveInLeaseSearchEDIMsgs("");
        }}).addStyleClass("submitBtn marginTop10");
	   	
	   	var oFlexSearchBtnsMITL = new sap.m.FlexBox({
	           items: [
	                   oBtnSearchPortalTrans,
	                   oLabelSpace,
	                   oBtnSearchEDIMsgs
	           ],
	           direction : "Row",
	        	   width:"100%"
				});
	   	
	   // Responsive Grid Layout
	    var oMoveInFromLeaseLayout = new sap.ui.layout.form.ResponsiveGridLayout("idMoveInFromLeaseLayout",{
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
	     var oMoveInFromLeaseForm = new sap.ui.layout.form.Form("idMoveInFromLeaseFormMIFL",{
	             layout: oMoveInFromLeaseLayout,
	             formContainers: [
	                     
	                     new sap.ui.layout.form.FormContainer("idMoveInFromLeaseFormC1MIFL",{
                             formElements: [
                                            new sap.ui.layout.form.FormElement({
											    fields: [back]
											}),
												new sap.ui.layout.form.FormElement({
												    fields: [oLabelSerialNo, oInputSerialNo]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oLabelDepo, oInputDepot]
												}),
												new sap.ui.layout.form.FormElement({
													fields: [oLabelPeriod, oFlexDate]		  // MAC24042015+
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oLabelGateDate, oInputGateDate]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oLabelRelAuth, oInputRelAuth]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oFlexSearchBtnsMITL]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oLabelMandatory]
												})
	                                     ]
	                     })
	             ]
	     });
			     
	     var oMoveInFromLeaseResLayout = new sap.ui.layout.form.ResponsiveLayout("idMoveInFromLeaseResLayout",{
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
			     
        var oMoveInFromLeaseResForm = new sap.ui.layout.form.Form("idMoveInFromLeaseResForm",{
           layout: oMoveInFromLeaseResLayout,
           formContainers: [
                   new sap.ui.layout.form.FormContainer("idMoveInFromLeaseResFormC1",{
                       formElements: [	                                      
		                               new sap.ui.layout.form.FormElement("moveInFromLeaseResTbl",{
		                                   fields: [],
		                               })
	                               ],
                               layoutData: new sap.ui.commons.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                   })
				           ]
        });
			        
		var oFlexMoveInFromLease = new sap.m.FlexBox({
		      items: [
		        oMoveInFromLeaseForm,
		        oMoveInFromLeaseResForm
		      ],
		      direction: "Column"
		});

	  return oFlexMoveInFromLease;
	},
	
	populateDepotNameMIFPU: function(){
		
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
			    		depotNameListMIFPU[i] = data.results[i].FunctionalLoc;
					}
			    	
			    	//alert("depotNameListAMOS len : "+depotNameListAMOS.length);
			    	
			    	$( "#idDepotMIFPU" ).autocomplete({
			    	      source: depotNameListMIFPU,
			    	      minLength: 0,
			    	      select: function(){
			    	    	  	document.getElementById("idDepotMIFPU").style.borderColor = "#cccccc";
			    				document.getElementById("idDepotMIFPU").style.background = "#ffffff";
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
			    	    for (i in depotNameListMIFPU) {
			    	        if (depotNameListMIFPU[i].toLowerCase().match(this.value.toLowerCase())) {
			    	            isValid = true;
			    	        }
			    	    }
			    	    if (!isValid) {
			    	        this.value = previousValue;
			    	    } else {
			    	        previousValue = this.value;
			    	    }
			    	});

			    	busyDialog.close();
			    },
			    function(err){
			    	 errorfromServer(err);
			    	//alert("Error while Reading Result : "+ : window.JSON.stringify(err.response));
			    });
		},
	
	validateMoveInLease:function(){
		
		var isValid = true;
		var serialNo = sap.ui.getCore().byId("idSerialNoMIFPU").getValue().trim();
		if(serialNo == ""){
			sap.ui.getCore().byId("idSerialNoMIFPU").setPlaceholder("Required");
			//sap.ui.getCore().byId("idSerialNoMOFPU").setValue(serialNo.toUpperCase())
			sap.ui.getCore().byId("idSerialNoMIFPU").setValueState(sap.ui.core.ValueState.Error);
			isValid = false;
		}
		else if(serialNo.trim().length != 11){
			sap.ui.getCore().byId("idSerialNoMIFPU").setValue("");
			sap.ui.getCore().byId("idSerialNoMIFPU").setPlaceholder("Invalid Unit Number");
			//sap.ui.getCore().byId("idSerialNoMOFPU").setValue(serialNo.toUpperCase())
			sap.ui.getCore().byId("idSerialNoMIFPU").setValueState(sap.ui.core.ValueState.Error);
			isValid = false;
		}else{
			sap.ui.getCore().byId("idSerialNoMIFPU").setValue(serialNo.toUpperCase());
		}
		
		
		/* Begin of commenting by Seyed Ismail on 24.04.2014 MAC24042015 */
		/*var gateDate = sap.ui.getCore().byId("idGateDateMIFPU").getValue();
		
		if(gateDate == ""){
			sap.ui.getCore().byId("idGateDateMIFPU").setPlaceholder("Required");
			sap.ui.getCore().byId("idGateDateMIFPU").setValueState(sap.ui.core.ValueState.Error);
			isValid = false;
		}*/
		/* End of commenting by Seyed Ismail on 24.04.2014 MAC24042015 */
		var vDepot = document.getElementById("idDepotMIFPU").value;
		var match = jQuery.inArray(vDepot,depotNameListMIFPU);
		if(vDepot.trim().length == 0 || match < 0){
				document.getElementById("idDepotMIFPU").style.borderColor = "red";
	    		document.getElementById("idDepotMIFPU").style.background = "#FAD4D4";
	    		document.getElementById("idDepotMIFPU").value = "";
	    		document.getElementById("idDepotMIFPU").placeholder = "Invalid Depot";
	    		isValid = false;
			}
			else{
				document.getElementById("idDepotMIFPU").style.borderColor = "#cccccc";
	    		document.getElementById("idDepotMIFPU").style.background = "#ffffff";
	    		document.getElementById("idDepotMIFPU").placeholder = "Depot";
			}
			
		return isValid;
	},
	
	
	
	setMoveInFromLease: function(){
		
		// Table
    	var oMoveInFromLeaseTable = new sap.ui.table.Table("MoveInFromLeaseTable",{
    		visibleRowCount: 5,
            firstVisibleRow: 1,
            columnHeaderHeight: 45,
            selectionMode: sap.ui.table.SelectionMode.None,
    	 }).addStyleClass("tblBorder");
    	
    	// Table Columns
    	oMoveInFromLeaseTable.addColumn(new sap.ui.table.Column({
         label: new sap.ui.commons.Label({text: "Actions"}),
         template: new sap.ui.commons.TextView().bindProperty("text", "Message"),
         resizable:false,
         width:"70px"
    	 }));
    	 
    	oMoveInFromLeaseTable.addColumn(new sap.ui.table.Column({
    		 label: new sap.ui.commons.Label({text: "Status"}),
    		 template: new sap.ui.commons.Link({
 				press : function(oEvent) {
 					seletedStatusMIFPU = this.getText();
 					seletedStepIdMIFPU = this.getHelpId();
					
 					oCurrMIFPU.gotoErrorProcessingMIFPU();
 				}
 			}).bindProperty("text", "MsgStatus").bindProperty("enabled", "isLinkEnabled").bindProperty("helpId", "Stepid"),
 			resizable:false,
            width:"70px"
    	}));

    	oMoveInFromLeaseTable.addColumn(new sap.ui.table.Column({
    		 label: new sap.ui.commons.Label({text: "Select for Resubmit"}),
    		 template: new sap.ui.commons.CheckBox().bindProperty("checked", "selResubmit").bindProperty("enabled", "isCheckEnabled"),
         	 width:"40px",
         	 resizable:false,
         	 //hAlign: "Center"
         }));
    	 
		var oBtnResubmit = new sap.m.Button({
            text : "Resubmit",
            styled:false,
            press:function(){
            	if(btnFlagGateInFPU == "P"){
	            	if(oCurrMIFPU.validateResubmit())
	            		oCurrMIFPU.resubmitMIFPU();
            	}
            	else{
            		oCurrMIFPU.resubmitMIFPU();
            	}
            
            }
         }).addStyleClass("submitBtn marginTop10");
		
		var oLabelBlank = new sap.ui.commons.Label({text: " ",
            width: "20px"});
		
		/* Begin of adding by Seyed Ismail on 24.04.2015 MAC24042015*/
		
		var oBtnDelEDIU = new sap.m.Button('idBtnDelEDIMI', {
            text : "Delete",
            styled:false,
            visible: false,
            press:function(){
            	jQuery.sap.require("sap.ui.commons.MessageBox");
            	var confirmMessage = "Current message will be deleted from this log. \n Please make sure you have fixed the issue. \n Continue?";
                sap.ui.commons.MessageBox.show(confirmMessage,
                sap.ui.commons.MessageBox.Icon.WARNING,
                "Warning",
                [sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO], 
                oCurrMIFPU.proceedToDeleteU,
                    sap.ui.commons.MessageBox.Action.YES);            
            }
         }).addStyleClass("submitBtn marginTop10 marginLeft");
		
		var oFlexEDIButtons = new sap.m.FlexBox({
	           items: [
	                   oBtnResubmit,
	                   oLabelBlank,
	                   oBtnDelEDIU
	           ],
	           direction : "Row",
	        	   width:"100%"
				});
		
		/* End of adding by Seyed Ismail on 24.04.2015 MAC24042015*/
	
		var viewDetailsMIEDI = new sap.m.Link("idViewDetailsMIEDIMsgs", {
			text: "View Details",
            width:"90px",
            wrapping:true,
            press: function(){
            	if(sap.ui.getCore().byId("ErrorProcMIFL"))
    				sap.ui.getCore().byId("ErrorProcMIFL").destroy();
    			var bus = sap.ui.getCore().getEventBus();
    			bus.publish("nav", "to", {
    					id : "ErrorProcMIFL"
    			});
    			$('#idHdrContnt').html('Move In From Lease - Error Processing'); 
            }});
		
		// Flex Boxes
		var oFlexAllMIFL = new sap.m.FlexBox("oFlexAllMIFL",{
           items: [
                   oMoveInFromLeaseTable,
                   oFlexEDIButtons			// MAC24042015 +
                   //oBtnResubmit			// MAC24042015 -
           ],
           direction : "Column",
        	   width:"40%"
			});
		
		var oFlexAllMIEDIMsgs = new sap.m.FlexBox("oFlexAllMIEDIMsgs",{
	           items: [
	                   oFlexAllMIFL,
	                   oLabelBlank,
	                   viewDetailsMIEDI
	           ],
	           direction : "Row",
	        	   width:"100%"
				});
		
		if(btnFlagGateInFPU == "P")
			return oFlexAllMIFL;
		else
			return oFlexAllMIEDIMsgs;
		
		
	},
	/* Begin of adding by Seyed Ismail on 24.04.2015 MAC24042015 + */
	proceedToDeleteU: function(sResult) {
	      if(sResult == "YES"){
	    	busyDialog.open();
	    	
	    	var edi_delurl = serviceUrl15_old + "/Edi_Deletes('" +globalMessageUid+ "')";
	  		oModel = new sap.ui.model.odata.ODataModel(serviceUrl15_old, true);
	  		OData.request({ 
	  		   requestUri: edi_delurl,
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
	  			 if(data.Success == "X"){
	  				var successMessage = "Message Deleted!";
	  			 }
	  			 else{
	  				var successMessage = "Message cannot be Deleted! Please make sure you are deleting U message";
	  			 }
	  			sap.ui.commons.MessageBox.alert(successMessage, "EDI Status U Deletion");
	           },
	           function(err){
	        	   busyDialog.close();
	        	   var successMessage = "Message cannot be Deleted!";
	        	   sap.ui.commons.MessageBox.alert(successMessage, "EDI Status U Deletion");
	            });
	      }
	    },
	/* End of adding by Seyed Ismail on 24.04.2015 MAC24042015 + */
	gotoErrorProcessingMIFPU:function(){
		
		errorProcessingMIFPU = jQuery.grep(aMoveInFromLeaseALL, function(element, index){
            return element.DtlFlag  == "X" &&  element.Stepid  == seletedStepIdMIFPU;
  		});
		
		if(errorProcessingMIFPU.length > 0){
			
			if(sap.ui.getCore().byId("ErrorProcMIFL"))
				sap.ui.getCore().byId("ErrorProcMIFL").destroy();
			
			var bus = sap.ui.getCore().getEventBus();
			bus.publish("nav", "to", {
					id : "ErrorProcMIFL"
			});
			$('#idHdrContnt').html('Move In From Lease - Error Processing'); //CHANGE HEADER CONTENT
		}
	},
	
	validateResubmit:function(){
		var isValid = true;
		var previousStepIncorrect = true;
		
		var MIFPUResubmitData = sap.ui.getCore().byId("MoveInFromLeaseTable").getModel().getData();
		var len = MIFPUResubmitData.length;
		var checkedForResub = jQuery.grep(MIFPUResubmitData, function(element, index){
            return element.selResubmit  == true;
  		});
		
		if(checkedForResub.length == 0){
			isValid = false;
			var errorString = "Please select atleast 1 process for resubmit and retry";
	    	sap.ui.commons.MessageBox.alert(errorString);
		}
		/* Begin of adding by Seyed Ismail on 24.04.2015 MAC24042015+ */
		else if(checkedForResub.length > 1){
			sap.ui.commons.MessageBox.alert("Please select only 1 process at a time");
			return;
		}
		/* End of adding by Seyed Ismail on 24.04.2015 MAC24042015+ */
		/* Begin of commenting by Seyed Ismail on 24.04.2015 MAC24042015- */
		/* else{
			
			for(var i=(len-1);i>=0;i--){
				if(MIFPUResubmitData[i].selResubmit == true){
					if(i != 0){
						if( (MIFPUResubmitData[i-1].MsgStatus != "Successful") && (MIFPUResubmitData[i-1].selResubmit == false) ){
							isValid =false;
							previousStepIncorrect = false;
						}
					}
				}
			}
			if(!previousStepIncorrect){
				
				var errorString = "Please process the transaction in sequence. There is atleast 1 previous step with status as error or not processed. \nProcess this step(s) successfully before re-submitting current step";
		    	sap.ui.commons.MessageBox.alert(errorString);
			}
		} */
		/* End of commenting by Seyed Ismail on 24.04.2015 MAC24042015- */
		return isValid;
		
	},
	
	resubmitMIFPU:function(){
		checkedForResubmitMIFL = [];
		
		checkedForResubmitMIFL = jQuery.grep(aMoveInFromLease, function(element, index){
            return element.selResubmit  == true;
  		});
		
		if(checkedForResubmitMIFL.length == 1){
			counterMIFPU = 0;
			oCurrMIFPU.oDataRequestMIFPU(checkedForResubmitMIFL[0].filter);
		}
		/* Begin of adding by Seyed Ismail on 24.04.2015 MAC24042015+ */
		else if(checkedForResubmitMIFL.length > 1){
			var errorString = sap.ui.commons.MessageBox.alert("Please select only 1 process at a time");
			sap.ui.commons.MessageBox.alert(errorString);
		}
		/* End of adding by Seyed Ismail on 24.04.2015 MAC24042015+ */
		else{
			var errorString = "Please select atleast 1 process for resubmit and retry";
	    	sap.ui.commons.MessageBox.alert(errorString);
		}
		
	},
	
	oDataRequestMIFPU:function(filter){
		
		var gateDatYYYYMMDD;
		if(locallySavedMIFPU[0].GateDate.trim() != "")
			gateDatYYYYMMDD = locallySavedMIFPU[0].GateDate.substring(0,4) + "-"+ locallySavedMIFPU[0].GateDate.substring(4,6) + "-" + locallySavedMIFPU[0].GateDate.substring(6);
		else
			gateDatYYYYMMDD = "0000-00-00";
		
		var tankDatYYYYMMDD;
		if(locallySavedMIFPU[0].TankCDate.trim() != "")
			tankDatYYYYMMDD = locallySavedMIFPU[0].TankCDate.substring(0,4) + "-"+ locallySavedMIFPU[0].TankCDate.substring(4,6) + "-" + locallySavedMIFPU[0].TankCDate.substring(6);
		else
			tankDatYYYYMMDD = "0000-00-00";
		
		var checkedStatusA = ( locallySavedMIFPU[0].StatusAChecked ? "A" : "");
		
		var senderAddr;
		if(locallySavedMIFPU[0].SendAddr.trim() == "")
			senderAddr = "ABDCEF";
		else
			senderAddr = locallySavedMIFPU[0].SendAddr;
		
		var filterData = "?$filter=AssetNo eq '"+locallySavedMIFPU[0].Sernr+"' and " +
				         "Companycode eq '"+locallySavedMIFPU[0].Bukrs+"' and " +
				         "Equipment eq '"+locallySavedMIFPU[0].Equnr+"' and " +
				         "FunctionalLoc eq '"+locallySavedMIFPU[0].DepotCode+"' and " +
				         "GateDt eq datetime'"+gateDatYYYYMMDD+"T00:00:00' and " +
				         "MatType eq '"+locallySavedMIFPU[0].Matnr+"' and " +
				         "PlannerGrp eq '"+locallySavedMIFPU[0].Plangroup+"' and " +
				         "ReturnAuth eq '"+locallySavedMIFPU[0].Auth+"' and " +
				         "SenderAddr eq '"+senderAddr+"' and " +
				         "SerialNo eq '"+locallySavedMIFPU[0].Sernr+"' and " +
				         "Status eq '"+checkedStatusA+"' and " +
				         "SubAssetNo eq '"+locallySavedMIFPU[0].SubNumber+"' and " +
				         "TankCertDate eq datetime'"+tankDatYYYYMMDD+"T00:00:00' and " +
				         "TankCleaningProcDesc eq '"+locallySavedMIFPU[0].ProcDesc+"' and " +
				         "TankLastCargoDesc eq '"+locallySavedMIFPU[0].CargoDesc+"' and " +
				         "TankNumber eq '"+locallySavedMIFPU[0].TranxId+"$"+locallySavedMIFPU[0].TankNo+"' and " +
				         "WrkCntr eq '"+locallySavedMIFPU[0].WorkCtr+"' and " +
				         "NotificationId eq '"+locallySavedMIFPU[0].NotifId+"'";
		
		//alert("Filter Data : "+ filterData);
		
		busyDialog.open();
		oModel = new sap.ui.model.odata.ODataModel(serviceUrl15_old, true);
		OData.request({ 
		   requestUri: serviceUrl15_old + filter+filterData,
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
			 var tranx;
			 if(data.results.length > 0){
				 tranx = data.results[0].TankNumber.split("$");
				 if(tranx[0].trim().length > 0)
					 locallySavedMIFPU[0].TranxId = tranx[0];
				 else
					 locallySavedMIFPU[0].TranxId = "";
				 if(data.results[0].Type == "S")
					 oCurrMIFPU.oDataSuccessCallbackMIFPU(data, response);
				 else if(data.results[0].Type == "E")
					 oCurrMIFPU.onDataErrorCallbackMIFPU("Error"); 
			 }else{
				 oCurrMIFPU.onDataErrorCallbackMIFPU("Error - No Record"); 
			 }
         },
         function(err){
        	 oCurrMIFPU.onDataErrorCallbackMIFPU(err);
          });
	},
	
	oDataSuccessCallbackMIFPU:function(resultdata, response){
		counterMIFPU ++;
		
		if(counterMIFPU <= checkedForResubmitMIFL.length - 1){
			oCurrMIFPU.oDataRequestMIFPU(checkedForResubmitMIFL[counterMIFPU].filter);
		}
		else{
			oCurrMIFPU.bindMoveInLease(locallySavedMIFPU[0].TranxId,"resubmit");
			//busyDialog.close();
		}	
		
	},
	
	onDataErrorCallbackMIFPU:function(error){
		oCurrMIFPU.bindMoveInLease(locallySavedMIFPU[0].TranxId,"resubmit");
		//busyDialog.close();
	},
	
	bindMoveInLeaseSearchEDIMsgs: function(inMsgIdGateIn){
		busyDialog.open();
		var oCurrMIEDI = this;
		var urlToCallMIEDI;
		var typeEDI;
		btnFlagGateInFPU = "E";
		
		// Begin of adding by Seyed Ismail on 24.04.2015 MAC24042015
		if(sap.ui.getCore().byId("idGateInFrom"))
		{
		var vDateFrom = sap.ui.getCore().byId("idGateInFrom").getValue();		
		if(vDateFrom == ''){
			var vDateFromFin = '1999-01-01T00:00:00';
		}
		else{
			/* FIORIOPT -
			var splitvar = vDateFrom.split('-');
			var vDateFromFin = splitvar[2]+'-'+ splitvar[1]+'-'+splitvar[0]+'T00:00:00';
			FIORIOPT - */
			// FIORIOPT +
			var vDateFrom = sap.ui.getCore().byId("idGateInFrom").getYyyymmdd();
			var vDateFromFin = vDateFrom.substr(0, 4)+'-'+vDateFrom.substr(4, 2)+'-'+vDateFrom.substr(6, 2)+'T00:00:00';
			// FIORIOPT +
		}
		}
		
		if(sap.ui.getCore().byId("idGateInTo")){
		var vDateTo = sap.ui.getCore().byId("idGateInTo").getValue();				
		if(vDateTo == ''){
			var vDateToFin = '9999-12-12T00:00:00';
		}
		else{
			/* FIORIOPT -
			splitvar = vDateTo.split('-');
			var vDateToFin = splitvar[2]+'-'+ splitvar[1]+'-'+splitvar[0]+'T00:00:00';
			FIORIOPT - */
			// FIORIOPT +
			var vDateTo = sap.ui.getCore().byId("idGateInTo").getYyyymmdd();
			var vDateToFin = vDateTo.substr(0, 4)+'-'+vDateTo.substr(4, 2)+'-'+vDateTo.substr(6, 2)+'T00:00:00';
			// FIORIOPT +
		}
		}
		
		if(document.getElementById("idDepotMIFPU")){
		var functionalLoc = document.getElementById("idDepotMIFPU").value;		// MAC24042015 +
		if(functionalLoc.length > 0)											// MAC24042015 +
			functionalLoc = functionalLoc.substring(0,15);						// MAC24042015 +
		}
		// End of adding by Seyed Ismail on 24.04.2015 MAC24042015
		
		
		if(inMsgIdGateIn.trim().length == 0){
			typeEDI = "A";
			var serialNo = sap.ui.getCore().byId("idSerialNoMIFPU").getValue().toUpperCase().trim();
			var gateInDate = sap.ui.getCore().byId("idGateDateMIFPU").getYyyymmdd();
			if(gateInDate.trim().length == 0)
				gateInDate = "0000-00-00T00:00:00";
			else
				gateInDate = gateInDate.substring(0,4)+"-"+gateInDate.substring(4,6)+"-"+gateInDate.substring(6,8)+"T00:00:00";
			
			var returnAuth = sap.ui.getCore().byId("idRelAuthMIFPU").getValue();
			
			var functionalLoc = document.getElementById("idDepotMIFPU").value;		// MAC24042015 +
			if(functionalLoc.length > 0)											// MAC24042015 +
				functionalLoc = functionalLoc.substring(0,15);						// MAC24042015 +
			
			urlToCallMIEDI = serviceUrl15_old + "/Movein_Edi?$filter=SerialNumber eq '" 
				            + serialNo + "' and GateDate eq datetime'0000-00-00T00:00:00' and ReturnAuthNumb eq '" + returnAuth + "'"
							+ " and Datefrom eq datetime'"+ vDateFromFin +"'"    		// MAC24042015 +
							+ " and Dateto eq datetime'"+ vDateToFin +"'"				// MAC24042015 +
							+ " and Depot eq '"+ functionalLoc+ "'";			// MAC24042015 +;
		}
		else{
			typeEDI = "U";
			urlToCallMIEDI = serviceUrl15_old + "/Movein_Edi?$filter=MessageId eq '" + inMsgIdGateIn.trim() + "'";
		}
		
		
		
		
		oModel = new sap.ui.model.odata.ODataModel(serviceUrl15_old, true);
		// urlToCallMIEDI = serviceUrl15_old + "/Movein_Edi?$filter=SerialNumber eq '" + serialNo + "' and GateDate eq datetime'"+ gateInDate + "T00:00:00' and ReturnAuthNumb eq '" + returnAuth + "'";
		
		OData.request({ 
		      requestUri: urlToCallMIEDI,
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
				 
				 	if(data.results.length>1){
				 		if(sap.ui.getCore().byId("oFlexAllMIFL"))
				 			sap.ui.getCore().byId("oFlexAllMIFL").destroy();
				 		
				 		if(sap.ui.getCore().byId("oFlexAllMIEDIMsgs"))
				 			sap.ui.getCore().byId("oFlexAllMIEDIMsgs").destroy();
				 		
				 		locallySavedMIFPU = [];
				 		aMoveInFromLease=[];
				 		aMoveInFromLeaseALL = data.results;
				 		for(var i=0; i<data.results.length; i++){
			    			
			    			var filterStepIDEDI = jQuery.grep(stepWiseFilterMIFPU, function(element, index){
					            return element.stepId  == data.results[i].Stepid ;
							});
			    			
			    			if(filterStepIDEDI.length > 0){
				    			aMoveInFromLease.push({
				    				Message: data.results[i].Message,
				    				MsgStatus: "",
				    				selResubmit: false,
				    				filter: filterStepIDEDI[0].filter
				    			});
			    			}
			    		
				 		
					 		if(i == 0){ //  Make Local Data - First Time
								var tankCDatLocal, gateDatLocal, statusCheckedLocal;
								if(locallySavedMIFPU.length  == 0){  // If No Local Data - First Time
									
									var vGateDateSplit = data.results[i].GateDate.split("(");
								    var vGateDate = vGateDateSplit[1].split(")");
								    var GateDate = dateFormat(new Date(Number(vGateDate[0])), 'yyyy-mm-dd',"UTC");
								    if (GateDate.substring(0,4) === "9999"){
								    	gateDatLocal = "";
						            }
						            else{
						            	yyyy = GateDate.substring(0,4);
						            	mm = GateDate.substring(5,7);
						            	dd = GateDate.substring(8);
						            	
						            	gateDatLocal = yyyy + mm + dd;
						            }
								    
								    
								    var vTankCertDateSplit = data.results[i].TankCertDate.split("(");
								    var vTankCertDate = vTankCertDateSplit[1].split(")");
								    var TankCertDate = dateFormat(new Date(Number(vTankCertDate[0])), 'yyyy-mm-dd',"UTC");
								    if (TankCertDate.substring(0,4) === "9999"){
					            		tankCDatLocal = "";
						            }
						            else{
						            	yyyy = TankCertDate.substring(0,4);
						            	mm = TankCertDate.substring(5,7);
						            	dd = TankCertDate.substring(8);
						            	
						            	tankCDatLocal = yyyy + mm + dd;
						            }
								    statusCheckedLocal = false;
								    if(data.results[i].ConditionCode == "D"){
										statusCheckedLocal = false;
									}
									else{
										statusCheckedLocal = true;
									}
								    
								    locallySavedMIFPU.push({
										  'TranxId' : "",
							    		  'Sernr': aMoveInFromLeaseALL[0].SerialNumber,
							    		  'GateDate': gateDatLocal,
							    		  'DepotCode': aMoveInFromLeaseALL[0].FunctionalLocat,
							    		  'TankCDate': tankCDatLocal,
							    		  'CargoDesc': aMoveInFromLeaseALL[0].TankLastCargoDesc,
							    		  'AssetNo': aMoveInFromLeaseALL[0].AssetNumber,
							    		  'Equnr': aMoveInFromLeaseALL[0].EquipmentNumber,
							    		  'Plangroup': aMoveInFromLeaseALL[0].PlannerGroup,
							    		  'WorkCtr': aMoveInFromLeaseALL[0].WorkCentre,
							    		  'SendAddr': aMoveInFromLeaseALL[0].SenderAddress,
							    		  'StatusAChecked': statusCheckedLocal,
							    		  'Auth': aMoveInFromLeaseALL[0].ReturnAuthNumb,
							    		  'ProcDesc': aMoveInFromLeaseALL[0].TankCleaningProcDesc,
							    		  'TankNo': aMoveInFromLeaseALL[0].TankNumber,
							    		  'Bukrs': aMoveInFromLeaseALL[0].CompanyCode,
							    		  'Matnr': aMoveInFromLeaseALL[0].MaterialType,
							    		  'SubNumber': aMoveInFromLeaseALL[0].SubAssetNumber,
							    		  'NotifId': aMoveInFromLeaseALL[0].NotificationId,
							            });
								    
								    if(typeEDI == "U"){
								    	sap.ui.getCore().byId("idSerialNoMIFPU").setValue(aMoveInFromLeaseALL[0].SerialNumber);
								    	sap.ui.getCore().byId("idRelAuthMIFPU").setValue(aMoveInFromLeaseALL[0].ReturnAuthNumb);
								    	sap.ui.getCore().byId("idGateDateMIFPU").setYyyymmdd(gateDatLocal);
								    	document.getElementById("idDepotMIFPU").value = aMoveInFromLeaseALL[0].FunctionalLocat;   // MAC24042015FIN
								    	sap.ui.getCore().byId("idBckMIFLStatusU").setVisible(true);
								    }
								    else{
								    	sap.ui.getCore().byId("idBckMIFLStatusU").setVisible(false);
								    }
								}
					 		}
				 		}
				 	
				 		var oFlexAllMIFL = oCurrMIEDI.setMoveInFromLease();
				 	// Begin of adding by Seyed Ismail on 24.04.2015 MAC24042015
				 		if(typeEDI == "U"){
				    	sap.ui.getCore().byId("idBtnDelEDIMI").setVisible(true);
				 		}
				 		else{
				 		sap.ui.getCore().byId("idBtnDelEDIMI").setVisible(false);
				 		}
				 	// End of adding by Seyed Ismail on 24.04.2015 MAC24042015
				 		var oModelMoveInFromLease = new sap.ui.model.json.JSONModel();
				    	oModelMoveInFromLease.setData(aMoveInFromLease);
				    	var oMoveInFromLeaseTable = sap.ui.getCore().byId("MoveInFromLeaseTable");
				    	oMoveInFromLeaseTable.setModel(oModelMoveInFromLease);
				    	oMoveInFromLeaseTable.bindRows("/");
				    //	if(inMsgIdGateIn.trim().length == 0)
				    	//	oMoveInFromLeaseTable.setVisibleRowCount(5);
				    	//else
				    		oMoveInFromLeaseTable.setVisibleRowCount(aMoveInFromLease.length);
				    	var oMoveInFromLeaseResFormElement = sap.ui.getCore().byId("moveInFromLeaseResTbl");
						oMoveInFromLeaseResFormElement.insertField(oFlexAllMIFL,0);
						
				 		
				 	}else{
				 		var errorString = "No records for the specified search criteria. \nPlease refine your search criteria and try again.";
				    	sap.ui.commons.MessageBox.alert(errorString);
				    	
				 		if(sap.ui.getCore().byId("oFlexAllMIFL"))
				 			sap.ui.getCore().byId("oFlexAllMIFL").destroy();
				 		
				 		if(sap.ui.getCore().byId("oFlexAllMIEDIMsgs"))
				 			sap.ui.getCore().byId("oFlexAllMIEDIMsgs").destroy();
				 	}
				 	
		    },
		    function(err){
		    	 errorfromServer(err);
		    	//alert("Error while Reading Result : "+ : window.JSON.stringify(err.response));
		    });
	},
	
	bindMoveInLease:function(tranxID,sourceFlag){
		var filter = "";
		var moveType = "GATEIN";
		var serialNo = sap.ui.getCore().byId("idSerialNoMIFPU").getValue().toUpperCase().trim();
		if(tranxID.trim() != ""){
		
		filter = "/Fpu_Inout?$filter=TranxId eq '"+tranxID+"'" + 
									" and MoveType eq'"+ moveType+"' and Sernr eq '"+serialNo+"'";

		}else{
		
		
		var gateInDate = sap.ui.getCore().byId("idGateDateMIFPU").getYyyymmdd();
		if(gateInDate.trim().length == 0)
			gateInDate = "0000-00-00T00:00:00";
		else
			gateInDate = gateInDate.substring(0,4)+"-"+gateInDate.substring(4,6)+"-"+gateInDate.substring(6,8)+"T00:00:00";
		
		var functionalLoc = document.getElementById("idDepotMIFPU").value;
		if(functionalLoc.length > 0)
			functionalLoc = functionalLoc.substring(0,15);
		
		
		// Begin of adding by Seyed Ismail on 24.04.2015 MAC24042015

		var vDateFrom = sap.ui.getCore().byId("idGateInFrom").getValue();		
		if(vDateFrom == ''){
			var vDateFromFin = '1999-01-01T00:00:00';
		}
		else{
			/* FIORIOPT -
			var splitvar = vDateFrom.split('-');
			var vDateFromFin = splitvar[2]+'-'+ splitvar[1]+'-'+splitvar[0]+'T00:00:00';
			FIORIOPT - */
			// FIORIOPT +
			var vDateFrom = sap.ui.getCore().byId("idGateInFrom").getYyyymmdd();
			var vDateFromFin = vDateFrom.substr(0, 4)+'-'+vDateFrom.substr(4, 2)+'-'+vDateFrom.substr(6, 2)+'T00:00:00';
			// FIORIOPT +
		}
		
		

		var vDateTo = sap.ui.getCore().byId("idGateInTo").getValue();				
		if(vDateTo == ''){
			var vDateToFin = '9999-12-12T00:00:00';
		}
		else{
			/* FIORIOPT -
			splitvar = vDateTo.split('-');
			var vDateToFin = splitvar[2]+'-'+ splitvar[1]+'-'+splitvar[0]+'T00:00:00';
			FIORIOPT - */
			// FIORIOPT +
			var vDateTo = sap.ui.getCore().byId("idGateInTo").getYyyymmdd();
			var vDateToFin = vDateTo.substr(0, 4)+'-'+vDateTo.substr(4, 2)+'-'+vDateTo.substr(6, 2)+'T00:00:00';
			// FIORIOPT +
		}
		
		
		// End of adding by Seyed Ismail on 24.04.2015 MAC24042015
		filter = "/Fpu_Inout?$filter=Sernr eq '"+serialNo+"'"+
									" and MoveType eq'"+ moveType+"'"+
									" and DepotCode eq '"+ functionalLoc +"'"+
									//" and Auth eq '"+returnAuth+"'"+					// MAC24042015 -
									" and Datefrom eq datetime'"+ vDateFromFin +"'"+			// MAC24042015 +
									" and Dateto eq datetime'"+ vDateToFin +"'";				// MAC24042015 +	
		}
	
		//alert("Str : "+serviceUrl15_old+filter);
		
		busyDialog.open();
		oModel = new sap.ui.model.odata.ODataModel(serviceUrl15_old, true);
		OData.request({ 
		   requestUri: serviceUrl15_old + filter,
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
		 	//alert(data.results.length);
			 busyDialog.close();
			 
		 	if(data.results.length>1){
		 		if(sap.ui.getCore().byId("oFlexAllMIFL"))
		 			sap.ui.getCore().byId("oFlexAllMIFL").destroy();
		 		
		 		if(sap.ui.getCore().byId("oFlexAllMIEDIMsgs"))
		 			sap.ui.getCore().byId("oFlexAllMIEDIMsgs").destroy();
		 		
		 		locallySavedMIFPU = [];
		 		aMoveInFromLease=[];
		 		aMoveInFromLeaseALL = [];
		 		aMoveInFromLeaseALL = data.results;
				aMoveInFromLease = jQuery.grep(aMoveInFromLeaseALL, function(element, index){
			            return element.DtlFlag  == "" ;
		  		});
		 		
				for(var i=0;i<aMoveInFromLease.length;i++){
					if(aMoveInFromLease[i].MsgStatus.toLowerCase() == "error"){
						aMoveInFromLease[i].isLinkEnabled = true;
						aMoveInFromLease[i].isCheckEnabled = true;
					}
					else if(aMoveInFromLease[i].MsgStatus.toLowerCase() == "edi processed"){
						aMoveInFromLease[i].isLinkEnabled = false;
						aMoveInFromLease[i].isCheckEnabled = true;
					}
					else if(aMoveInFromLease[i].MsgStatus.toLowerCase() == "successful"){
						aMoveInFromLease[i].isLinkEnabled = false;
						aMoveInFromLease[i].isCheckEnabled = false;
					}
					else if(aMoveInFromLease[i].MsgStatus.trim().length == 0){
						aMoveInFromLease[i].isLinkEnabled = true;
						aMoveInFromLease[i].isCheckEnabled = true;
					}
					aMoveInFromLease[i].selResubmit = false;
					aMoveInFromLease[i].execStatus = false;
					
					var filterStepID = jQuery.grep(stepWiseFilterMIFPU, function(element, index){
			            return element.stepId  == aMoveInFromLease[i].Stepid ;
					});
					
					if(filterStepID.length > 0){
						aMoveInFromLease[i].filter = filterStepID[0].filter;
					}
					
					if(i == 0){ //  Make Local Data - First Time
						var tankCDatLocal, gateDatLocal, statusCheckedLocal;
						if(locallySavedMIFPU.length  == 0){  // If No Local Data - First Time
							var yyyy, mm, dd;
							// TtcDate
				  			var vDocDateResult = aMoveInFromLease[0].TtcDate.split("(");
				            var vDocDate = vDocDateResult[1].split(")");
				            var vformattedDocDate = dateFormat(new Date(Number(vDocDate[0])), 'yyyy-mm-dd',"UTC");
				            //this is to check if the date is default 999 something show blank
				            if (vformattedDocDate.substring(0,4) === "9999"){
				            		tankCDatLocal = "";
				            }
				            else{
				            	yyyy = vformattedDocDate.substring(0,4);
				            	mm = vformattedDocDate.substring(5,7);
				            	dd = vformattedDocDate.substring(8);
				            	
				            	tankCDatLocal = yyyy + mm + dd;
				            }
				            
				            // GateDate
				            vDocDateResult = aMoveInFromLease[0].InoutDate.split("(");
				            vDocDate = vDocDateResult[1].split(")");
				            vformattedDocDate = dateFormat(new Date(Number(vDocDate[0])), 'yyyy-mm-dd',"UTC");
				            //this is to check if the date is default 999 something show blank
				            if (vformattedDocDate.substring(0,4) === "9999"){
				            		gateDatLocal = "";
				            }
				            else{
				            	yyyy = vformattedDocDate.substring(0,4);
				            	mm = vformattedDocDate.substring(5,7);
				            	dd = vformattedDocDate.substring(8);
				            	gateDatLocal = yyyy + mm + dd;
				            }
				            
							
							if(aMoveInFromLease[0].Statusa == "A"){
								statusCheckedLocal = true;
							}
							else{
								statusCheckedLocal = false;
							}
							locallySavedMIFPU.push({
								  'TranxId' : aMoveInFromLease[0].TranxId,
					    		  'Sernr': aMoveInFromLease[0].Sernr,
					    		  'GateDate': gateDatLocal,
					    		  'DepotCode': aMoveInFromLease[0].DepotCode,
					    		  'TankCDate': tankCDatLocal,
					    		  'CargoDesc': aMoveInFromLease[0].CargoDesc,
					    		  'AssetNo': aMoveInFromLease[0].AssetNo,
					    		  'Equnr': aMoveInFromLease[0].Equnr,
					    		  'Plangroup': aMoveInFromLease[0].Plangroup,
					    		  'WorkCtr': aMoveInFromLease[0].WorkCtr,
					    		  'SendAddr': aMoveInFromLease[0].SendAddr,
					    		  'StatusAChecked': statusCheckedLocal,
					    		  'Auth': aMoveInFromLease[0].Auth,
					    		  'ProcDesc': aMoveInFromLease[0].ProcDesc,
					    		  'TankNo': aMoveInFromLease[0].TankNo,
					    		  'Bukrs': aMoveInFromLease[0].Bukrs,
					    		  'Matnr': aMoveInFromLease[0].Matnr,
					    		  'SubNumber': aMoveInFromLease[0].SubNumber,
					    		  'NotifId': aMoveInFromLease[0].NotifId,
					            });
						}
					}
					
				}
				btnFlagGateInFPU = "P";
		 		var oFlexAllMIFL = oCurrMIFPU.setMoveInFromLease();
		 		if(sourceFlag == "resubmit"){
		 		sap.ui.getCore().byId("idBtnDelEDIMI").setVisible(true);
		 		}
		 		var oModelMoveInFromLease = new sap.ui.model.json.JSONModel();
		    	oModelMoveInFromLease.setData(aMoveInFromLease);
		    	var oMoveInFromLeaseTable = sap.ui.getCore().byId("MoveInFromLeaseTable");
		    	oMoveInFromLeaseTable.setModel(oModelMoveInFromLease);
		    	oMoveInFromLeaseTable.bindRows("/");
		    	oMoveInFromLeaseTable.setVisibleRowCount(aMoveInFromLease.length);
		    	
		    	var oMoveInFromLeaseResFormElement = sap.ui.getCore().byId("moveInFromLeaseResTbl");
				oMoveInFromLeaseResFormElement.insertField(oFlexAllMIFL,0);
				
		 		
		 	}else{
		 		if(sourceFlag == "submit"){
			 		var errorString = "No records found for the specified search criteria. \nPlease refine your search criteria and try again.";
			    	sap.ui.commons.MessageBox.alert(errorString);
			 		if(sap.ui.getCore().byId("oFlexAllMIFL"))
			 			sap.ui.getCore().byId("oFlexAllMIFL").destroy();
			 		
			 		if(sap.ui.getCore().byId("oFlexAllMIEDIMsgs"))
			 			sap.ui.getCore().byId("oFlexAllMIEDIMsgs").destroy();
		 		}
		 		else{
		 			var errorString = "Selected Steps have been re-processed successfully";
			    	sap.ui.commons.MessageBox.alert(errorString); //,fnclearAllValuesAfterSuccessGateIn);
		 		}
		 		
		 	}
	 },
	 function(err){
	 	errorfromServer(err);
	 });
	
	},
	
	resetGateInFPU: function(){
		var oModel = new sap.ui.model.json.JSONModel();
        oModel.setData({
              dateValue: new Date()
        });
        
		sap.ui.getCore().byId("idSerialNoMIFPU").setValue("");
		 if(sap.ui.getCore().byId("idSerialNoMIFPU")){
         	  sap.ui.getCore().byId("idSerialNoMIFPU").setValueState(sap.ui.core.ValueState.None);
         	  sap.ui.getCore().byId("idSerialNoMIFPU").setPlaceholder("Serial Number");
           }
		sap.ui.getCore().byId("idRelAuthMIFPU").setValue("");
		
		sap.ui.getCore().byId("idGateDateMIFPU").setModel(oModel);
		 if(sap.ui.getCore().byId("idGateDateMIFPU")){
         	  sap.ui.getCore().byId("idGateDateMIFPU").setValueState(sap.ui.core.ValueState.None);
         	  sap.ui.getCore().byId("idGateDateMIFPU").setPlaceholder("");
           }
		 
		 /*Begin of adding by Seyed Ismail 24.04.2015 MAC24042015 */
		 if(document.getElementById("idDepotMIFPU")){
			 document.getElementById("idDepotMIFPU").value = "";
			 document.getElementById("idDepotMIFPU").placeholder = "Depot";
           }
		 /*End of adding by Seyed Ismail 24.04.2015 MAC24042015 */
		 
		if(sap.ui.getCore().byId("oFlexAllMIFL"))
 			sap.ui.getCore().byId("oFlexAllMIFL").destroy();
 		
 		if(sap.ui.getCore().byId("oFlexAllMIEDIMsgs"))
 			sap.ui.getCore().byId("oFlexAllMIEDIMsgs").destroy();
 		sap.ui.getCore().byId("idBckMIFLStatusU").setVisible(false);
	}
	
});

function fnclearAllValuesAfterSuccessGateIn(){
	sap.ui.getCore().byId("idSerialNoMIFPU").setValue("");
	sap.ui.getCore().byId("idRelAuthMIFPU").setValue("");
	sap.ui.getCore().byId("idGateDateMIFPU").setYyyymmdd("");
}
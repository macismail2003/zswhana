/*
 *$*$------------------------------------------------------------------------*
*$*$ Modified By : Seyed Ismail MAC
*$*$ Modified On : 24.04.2015
*$*$ Reference   : RTS1139
*$*$ Transport   : CGWK900946
*$*$ Tag         : MAC24042015
*$*$ Purpose     : UI5 : Old Portal Removal Project - Remove Dependencies in the sequence

*$*$---------------------------------------------------------------------
*

 */
var oCurrMOFPU;
var depotNameListMOFPU = [];
var aMoveOutToLeaseALL = [];
var aMoveOutToLease = [];
var seletedStatusMOFPU;
var seletedStepIdMOFPU;
var counterMOFPU;
var stepWiseFilterMOFPU = [
                      	 {stepId: "001", actions:"Validate in ECC", filter:"/Valid_Tst_Hrns_ECC" },
                      	 {stepId: "002", actions:"Validate in CRM", filter:"/VALID_TSTHRNES_CRM_Ecc"},
                      	 {stepId: "003", actions:"Get Lease Number from CRM", filter:"/Gateout_Lease"}, //chng entity set name
                      	 {stepId: "004", actions:"Store in ECC", filter:"/Store_tst_Hrns_ECC"},
                      	 {stepId: "005", actions:"Store in Storage table in ECC", filter:"/Store_Chrg_Hrns_ECC"},
                      	 {stepId: "006", actions:"Store in CRM", filter:"/GATEOUT_STORE_TSTHRNES_CRM_ECC"},
                      ];
var btnFlagGateOutFPU;
// Error Processing Related
var errorProcessingMOFPU = [];
var enabledGrp1EPMOFPU = true;
var enabledGrp2EPMOFPU = false;
var ocurrentEPMOFPU;
var locallySavedMOFPU= [];
var checkedForResubmitMOTL = [];
sap.ui.model.json.JSONModel.extend("moveOutToLeaseView", {
	
	createMoveOutToLease: function(){
		
		oCurrMOFPU = this;
		
		var back = new sap.m.Link("idBckMOTLStatusU",{text: " < Back",
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
		
		var oLabelRelAuth = new sap.ui.commons.Label({text: "Release Authorisation: ",
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
		
    	var oInputSerialNo = new sap.ui.commons.TextField('idSerialNoMOFPU',{
    		layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
    		placeholder: "Serial Number",
    		//value: "GESU4398411",
    	}).addStyleClass("FormInputStyle");
    	
    	oInputSerialNo.onfocusin =  function(e) {  
			this.setValueState(sap.ui.core.ValueState.None);
			this.setPlaceholder("Serial Number");                          
	    };
    	
    	var oInputDepot = new sap.ui.core.HTML("idDepotHTMLMOFPU",{layoutData: new sap.ui.layout.GridData({span: "L4 M9 S12"})});
		var htmlContentDepot = '<input id="idDepotMOFPU" placeholder="Depot" class="FormInputStyle marginTop10" style="width:100%">';
		oInputDepot.setContent(htmlContentDepot);
    	
		var oModelCurrDateMOFPU = new sap.ui.model.json.JSONModel();
		oModelCurrDateMOFPU.setData({
	   		dateValue: new Date()
		});
    	var oInputGateDate = new sap.ui.commons.DatePicker('idGateDateMOFPU',{
    		visible: false,				// MAC24042015
    		value: {
                path: "/dateValue",
                type: new sap.ui.model.type.Date({pattern: "dd-MM-yyyy"})
    			},
    			placeholder: "Gate Date",
    			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S9"}),
    			// yyyymmdd: "20140422",
    			liveChange:function(oControlEvent){
    				this.setPlaceholder("Gate Date");
    				this.setValueState(sap.ui.core.ValueState.None);
    			},
    	});
    	//oInputGateDate.setModel(oModelCurrDateMOFPU);
    	oInputGateDate.addStyleClass("FormInputStyle marginTop10");
    	oInputGateDate.setLocale("en-US");
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
    	
    	
    	 var oInputRelAuth = new sap.ui.commons.TextField('idRelAuthMOFPU',{
    		layoutData: new sap.ui.layout.GridData({span: "L2 M3 S9"}),
    		visible: false,
    		placeholder: "Release Authorisation",
    		//value:"402423",
    	}).addStyleClass("FormInputStyle marginTop10");
    	
    	// Buttons
    	 var oBtnSearchPortalTrans = new sap.m.Button("idBtnSearchPortalTransMOFPU",{
	          text : "Search for Portal Transactions",
	          width:"220px",
	          styled:false,
	          layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: true, margin: true}),
	          press:function(){
	        	  btnFlagGateOutFPU = "P";
	        	  if(oCurrMOFPU.validateMoveOutLease())
	        		  oCurrMOFPU.bindMoveOutLease("","submit");
		}}).addStyleClass("submitBtn marginTop10");
	  	 
	  	var oBtnSearchEDIMsgs = new sap.m.Button("idBtnSearchEDIMsgsOFPU",{
	         text : "Search for EDI Messages",
	         visible: true,				// MAC25022015 +
	         width:"220px",
	         styled:false,
	         layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: true, margin: true}),
	         press:function(){
	       	  btnFlagGateOutFPU = "E";
	       	  if(oCurrMOFPU.validateMoveOutLease())
	       		  oCurrMOFPU.bindMoveOutLeaseSearchEDIMsgs("");
	   }}).addStyleClass("submitBtn marginTop10");
	  	
	  	var oFlexSearchBtnsMOTL = new sap.m.FlexBox({
	          items: [
	                  oBtnSearchPortalTrans,
	                  oLabelSpace,
	                  oBtnSearchEDIMsgs
	          ],
	          direction : "Row",
	       	   width:"100%"
				});
  	 
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
		
    	var oGateOutFrom = new sap.ui.commons.DatePicker("idGateOutFrom",{
    		value: {
                path: "/dateValue",
                type: new sap.ui.model.type.Date({pattern: "dd-MM-yyyy"}),
                mode: sap.ui.model.BindingMode.OneWay
    			},
    			width:"100px",
    			layoutData: new sap.ui.layout.GridData({span: "L2 M2 S3"}),
    	});
    	//oInputOffHireDateFrom.setModel(oModelCurrDateCRUOH);
    	oGateOutFrom.addStyleClass("FormInputStyle margin5Top");
    	oGateOutFrom.setLocale("en-US");
    	oGateOutFrom.attachChange(
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
    	
    	var oGateOutTo = new sap.ui.commons.DatePicker("idGateOutTo",{
    		value: {
                path: "/dateValue",
                type: new sap.ui.model.type.Date({pattern: "dd-MM-yyyy"}),
                mode: sap.ui.model.BindingMode.OneWay
    			},
    			width:"100px",
    			layoutData: new sap.ui.layout.GridData({span: "L2 M2 S3"}),
    	});
    	//oInputOffHireDateTo.setModel(oModelCurrDateCRUOH);
    	oGateOutTo.addStyleClass("FormInputStyle margin5Top");
    	oGateOutTo.setLocale("en-US");
    	oGateOutTo.attachChange(
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
		        oGateOutFrom,
		        oLabelSpaceForDate,
		        oLabelTo,
		        oGateOutTo
		      ],
		      layoutData: new sap.ui.layout.GridData({span: "L8 M9 S12",linebreak: false, margin: true}),
		      direction: "Row"
		});
		
		var oLabelPeriod = new sap.ui.commons.Label({text: "Period:",
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S3",linebreak: true, margin: true}),
            wrapping: true});
		
    	/* End of adding by Seyed Ismail on 24.04.2015 MAC24042015*/ 
		
	   // Responsive Grid Layout
	    var oMoveOutToLeaseLayout = new sap.ui.layout.form.ResponsiveGridLayout("idMoveOutToLeaseLayout",{
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
	     var oMoveOutToLeaseForm = new sap.ui.layout.form.Form("idMoveOutToLeaseFormMOTL",{
	             layout: oMoveOutToLeaseLayout,
	             formContainers: [
	                     
	                     new sap.ui.layout.form.FormContainer("idMoveOutToLeaseFormC1MOTL",{
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
												    fields: [oFlexSearchBtnsMOTL]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oLabelMandatory]
												})
	                                     ]
	                     })
	             ]
	     });
			     
	     var oMoveOutToLeaseResLayout = new sap.ui.layout.form.ResponsiveLayout("idMoveOutToLeaseResLayout",{
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
			     
        var oMoveOutToLeaseResForm = new sap.ui.layout.form.Form("idMoveOutToLeaseResForm",{
           layout: oMoveOutToLeaseResLayout,
           formContainers: [
                   new sap.ui.layout.form.FormContainer("idMoveOutToLeaseResFormC1",{
                       formElements: [	                                      
		                               new sap.ui.layout.form.FormElement("MoveOutToLeaseResTbl",{
		                                   fields: [],
		                               })
	                               ],
                               layoutData: new sap.ui.commons.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                   })
				           ]
        });
			        
		var oFlexMoveOutToLease = new sap.m.FlexBox({
		      items: [
		        oMoveOutToLeaseForm,
		        oMoveOutToLeaseResForm
		      ],
		      direction: "Column"
		});

	  return oFlexMoveOutToLease;
	},
	
	populateDepotNameMOFPU: function(){
		
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
			    		depotNameListMOFPU[i] = data.results[i].FunctionalLoc;
					}
			    	
			    	//alert("depotNameListAMOS len : "+depotNameListAMOS.length);
			    	
			    	$( "#idDepotMOFPU" ).autocomplete({
			    	      source: depotNameListMOFPU,
			    	      minLength: 0,
			    	      select: function(){
			    	    	  	document.getElementById("idDepotMOFPU").style.borderColor = "#cccccc";
			    				document.getElementById("idDepotMOFPU").style.background = "#ffffff";
			    				document.getElementById("idDepotMOFPU").placeholder = "Depot";
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
			    	    for (i in depotNameListMOFPU) {
			    	        if (depotNameListMOFPU[i].toLowerCase().match(this.value.toLowerCase())) {
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
	
	validateMoveOutLease:function(){
		var isValid = true;
		
		var serialNo = sap.ui.getCore().byId("idSerialNoMOFPU").getValue();
		
		if(serialNo == ""){
			sap.ui.getCore().byId("idSerialNoMOFPU").setPlaceholder("Required");
			//sap.ui.getCore().byId("idSerialNoMOFPU").setValue(serialNo.toUpperCase())
			sap.ui.getCore().byId("idSerialNoMOFPU").setValueState(sap.ui.core.ValueState.Error);
			isValid = false;
		}
		else if(serialNo.trim().length != 11){
			sap.ui.getCore().byId("idSerialNoMOFPU").setValue("");
			sap.ui.getCore().byId("idSerialNoMOFPU").setPlaceholder("Invalid Unit Number");
			//sap.ui.getCore().byId("idSerialNoMOFPU").setValue(serialNo.toUpperCase())
			sap.ui.getCore().byId("idSerialNoMOFPU").setValueState(sap.ui.core.ValueState.Error);
			isValid = false;
		}else{
			sap.ui.getCore().byId("idSerialNoMOFPU").setValue(serialNo.toUpperCase());
			
		}
		/* Begin of commenting by Seyed Ismail on 24.04.2014 MAC24042015 */
		/*var gateDate = sap.ui.getCore().byId("idGateDateMOFPU").getValue();
		
		if(gateDate == ""){
			sap.ui.getCore().byId("idGateDateMOFPU").setPlaceholder("Required");
			sap.ui.getCore().byId("idGateDateMOFPU").setValueState(sap.ui.core.ValueState.Error);
			isValid = false;
		}*/
		/* End of commenting by Seyed Ismail on 24.04.2014 MAC24042015 */
		var vDepot = document.getElementById("idDepotMOFPU").value;
		var match = jQuery.inArray(vDepot,depotNameListMOFPU);
		if(vDepot.trim().length == 0 || match < 0){
				document.getElementById("idDepotMOFPU").style.borderColor = "red";
	    		document.getElementById("idDepotMOFPU").style.background = "#FAD4D4";
	    		document.getElementById("idDepotMOFPU").value = "";
	    		document.getElementById("idDepotMOFPU").placeholder = "Invalid Depot";
	    		isValid = false;
			}
			else{
				document.getElementById("idDepotMOFPU").style.borderColor = "#cccccc";
	    		document.getElementById("idDepotMOFPU").style.background = "#ffffff";
	    		document.getElementById("idDepotMOFPU").placeholder = "Depot";
			}
	  	  
		return isValid;
	},
	
	
	
	setMoveOutToLease: function(){
		oCurrMOFPU = this;
		// Table
    	var oMoveOutToLeaseTable = new sap.ui.table.Table("MoveOutToLeaseTable",{
    		visibleRowCount: 6,
            firstVisibleRow: 1,
            columnHeaderHeight: 45,
            selectionMode: sap.ui.table.SelectionMode.None,
    	 }).addStyleClass("tblBorder");
    	
    	// Table Columns
    	oMoveOutToLeaseTable.addColumn(new sap.ui.table.Column({
         label: new sap.ui.commons.Label({text: "Actions"}),
         template: new sap.ui.commons.TextView().bindProperty("text", "Message"),
         resizable:false,
         width:"140px"
    	 }));
    	 
    	oMoveOutToLeaseTable.addColumn(new sap.ui.table.Column({
    		 label: new sap.ui.commons.Label({text: "Status"}),
    		 template: new sap.ui.commons.Link({
 				press : function(oEvent) {
 					seletedStatusMOFPU = this.getText();
 					seletedStepIdMOFPU = this.getHelpId();
					
 					oCurrMOFPU.gotoErrorProcessingMOFPU();
 				}
 			}).bindProperty("text", "MsgStatus").bindProperty("enabled", "isLinkEnabled").bindProperty("helpId", "Stepid"),
 			resizable:false,
            width:"80px"
    	}));

    	oMoveOutToLeaseTable.addColumn(new sap.ui.table.Column({
    		 label: new sap.ui.commons.Label({text: "Select for Resubmit"}),
    		 template: new sap.ui.commons.CheckBox().bindProperty("checked", "selResubmit").bindProperty("enabled", "isCheckEnabled"),
         	 width:"70px",
         	 resizable:false,
         	// hAlign: "Center"
         }));
    	 
		var oBtnResubmit = new sap.m.Button({
            text : "Resubmit",
            styled:false,
            press:function(){
            	if(btnFlagGateOutFPU == "P"){
            		if(oCurrMOFPU.validateOnResubmitMOTL())
                		oCurrMOFPU.resubmitMOFPU();
            	}
            	else{
            		oCurrMOFPU.resubmitMOFPU();
            	}
            }
         }).addStyleClass("submitBtn marginTop10");
	
		var viewDetailsMOEDI = new sap.m.Link("idViewDetailsMOEDIMsgs", {
			text: "View Details",
            width:"90px",
            wrapping:true,
            press: function(){
            	if(sap.ui.getCore().byId("ErrorProcessMOTL"))
    				sap.ui.getCore().byId("ErrorProcessMOTL").destroy();
    			
    			//new errorProcessingMOTLView().bindErrorProcessingDataMOTL();
    			
    			var bus = sap.ui.getCore().getEventBus();
    			bus.publish("nav", "to", {
    					id : "ErrorProcessMOTL"
    			});
    			$('#idHdrContnt').html('Move Out To Lease - Error Processing');
            }});
		
		var oLabelBlank = new sap.ui.commons.Label({text: " ",
            width: "20px"});
		
		/* Begin of adding by Seyed Ismail on 24.04.2015 MAC24042015*/
		
		var oBtnDelEDIU = new sap.m.Button('idBtnDelEDIMO', {
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
                oCurrMOFPU.proceedToDeleteU,
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
		
		// Flex Boxes
		var oFlexAllMOTL = new sap.m.FlexBox("oFlexAllMOTL",{
           items: [
                   oMoveOutToLeaseTable,
                   oFlexEDIButtons			//MAC24042015+
                   //oBtnResubmit			//MAC24042015-
           ],
           direction : "Column",
        	   width:"50%"
			});
		
		var oFlexAllMOEDIMsgs = new sap.m.FlexBox("oFlexAllMOEDIMsgs",{
	           items: [
	                   oFlexAllMOTL,
	                   oLabelBlank,
	                   viewDetailsMOEDI
	           ],
	           direction : "Row",
	        	   width:"100%"
				});
		
		if(btnFlagGateOutFPU == "P")
			return oFlexAllMOTL;
		else
			return oFlexAllMOEDIMsgs;
		
		
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
	
	gotoErrorProcessingMOFPU:function(){
		
		errorProcessingMOFPU = jQuery.grep(aMoveOutToLeaseALL, function(element, index){
            return element.DtlFlag  == "X" &&  element.Stepid  == seletedStepIdMOFPU;
  		});
		
		if(errorProcessingMOFPU.length > 0){
			
			if(sap.ui.getCore().byId("ErrorProcessMOTL"))
				sap.ui.getCore().byId("ErrorProcessMOTL").destroy();
			
			//new errorProcessingMOTLView().bindErrorProcessingDataMOTL();
			
			var bus = sap.ui.getCore().getEventBus();
			bus.publish("nav", "to", {
					id : "ErrorProcessMOTL"
			});
			$('#idHdrContnt').html('Move Out To Lease - Error Processing'); //CHANGE HEADER CONTENT
		}
	},
	
	validateOnResubmitMOTL:function(){
		var isValid = true;
		var previousStepIncorrect = true;
		
		var MOFPUResubmitData = sap.ui.getCore().byId("MoveOutToLeaseTable").getModel().getData();
		var len = MOFPUResubmitData.length;
		var checkedForResub = jQuery.grep(MOFPUResubmitData, function(element, index){
            return element.selResubmit  == true;
  		});
		
		if(checkedForResub.length == 0){
			isValid = false;
			var errorString = "Please select atleast 1 process for resubmit and retry.";
	    	sap.ui.commons.MessageBox.alert(errorString);
		}
		/* Begin of adding by Seyed Ismail on 24.04.2015 MAC24042015+ */
		else if(checkedForResub.length > 1){
			sap.ui.commons.MessageBox.alert("Please select only 1 process at a time");
			isValid = false;
		}
		/* End of adding by Seyed Ismail on 24.04.2015 MAC24042015+ */
		/* Begin of commenting by Seyed Ismail on 24.04.2015 MAC24042015- */
		/*else{
			
			for(var i=(len-1);i>=0;i--){
				if(MOFPUResubmitData[i].selResubmit != undefined){
					if(MOFPUResubmitData[i].selResubmit == true){
						if(i != 0){
							if( (MOFPUResubmitData[i-1].MsgStatus != "Successful") && (MOFPUResubmitData[i-1].selResubmit == false) ){
								isValid =false;
								previousStepIncorrect = false;
							}
						}
					}
				}
			}
			if(!previousStepIncorrect){
				
				var errorString = "Please process the transaction in sequence. There is atleast 1 previous step with status as error or not processed. \nProcess this step(s) successfully before re-submitting current step.";
		    	sap.ui.commons.MessageBox.alert(errorString);
			}
		}*/
		/* End of commenting by Seyed Ismail on 24.04.2015 MAC24042015- */
		return isValid;
		
	}, //validateOnResubmitMOTL
	
	resubmitMOFPU: function(){
		checkedForResubmitMOTL = [];
		oCurrMOFPU = this;
		
		checkedForResubmitMOTL = jQuery.grep(aMoveOutToLease, function(element, index){
            return element.selResubmit  == true;
  		});
		
		if(checkedForResubmitMOTL.length == 1){
			counterMOFPU = 0;
			oCurrMOFPU.oDataRequestMOFPU(checkedForResubmitMOTL[0].filter);
		}
		/* Begin of adding by Seyed Ismail on 24.04.2015 MAC24042015+ */
		else if(checkedForResubmitMOTL.length > 1){
			var errorString = sap.ui.commons.MessageBox.alert("Please select only 1 process at a time");
			sap.ui.commons.MessageBox.alert(errorString);
		}
		/* End of adding by Seyed Ismail on 24.04.2015 MAC24042015+ */
		else{
			var errorString = "Please select atleast 1 process for resubmit and retry";
	    	sap.ui.commons.MessageBox.alert(errorString);
		}
		
	}, //resubmitMOFPU
	
	oDataRequestMOFPU: function(filter){
		oCurrMOFPU = this;
		var gateDatYYYYMMDD;
		if(locallySavedMOFPU[0].GateDate.trim() != "")
			gateDatYYYYMMDD = locallySavedMOFPU[0].GateDate.substring(0,4) + "-"+ locallySavedMOFPU[0].GateDate.substring(4,6) + "-" + locallySavedMOFPU[0].GateDate.substring(6);
		else
			gateDatYYYYMMDD = "0000-00-00";
		
		var filterData = "?$filter=AssetNo eq '"+locallySavedMOFPU[0].Sernr+"' and " +
				         "Companycode eq '"+locallySavedMOFPU[0].Bukrs+"' and " +
				         "Equipment eq '"+locallySavedMOFPU[0].Equnr+"' and " +
				         "FunctionalLoc eq '"+locallySavedMOFPU[0].FuncLoc+"' and " +
				         "GateDt eq datetime'"+gateDatYYYYMMDD+"T00:00:00' and " +
				         "MatType eq '"+locallySavedMOFPU[0].Matnr+"' and " +
				         "PlannerGrp eq '"+locallySavedMOFPU[0].Plangroup+"' and " +
				         "ReleaseNo eq '"+locallySavedMOFPU[0].Auth+"' and " +
				         "SenderAddr eq '" + locallySavedMOFPU[0].SendrAddr + "' and " +
				         "SerialNo eq '"+locallySavedMOFPU[0].Sernr+"' and " +
				         "SubAssetNo eq '"+locallySavedMOFPU[0].SubNumber+"' and " +
				         "WrkCntr eq '"+locallySavedMOFPU[0].WorkCtr+"' and " + 
				         "Tranx eq '" + locallySavedMOFPU[0].TranxId + "'";
		//alert("filterData " + serviceUrl15_old+filterData);
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
			 if(data.results.length > 0){
				 tranx = data.results[0].Tranx;
				 if(tranx.trim().length > 0)
					 locallySavedMOFPU[0].TranxId = tranx;
				 else
					 locallySavedMOFPU[0].TranxId = "";
                 if(data.results[0].Type == "S")

                	 oCurrMOFPU.oDataSuccessCallbackMOFPU(data, response);

                 else if(data.results[0].Type == "E")

                	 oCurrMOFPU.onDataErrorCallbackMOFPU("Error"); 

         }else{

        	 oCurrMOFPU.onDataErrorCallbackMOFPU("Error - No Record"); 

         }


         },
         function(err){
        	 oCurrMOFPU.onDataErrorCallbackMOFPU(err);
          });
	},
	
	oDataSuccessCallbackMOFPU:function(resultdata, response){
		counterMOFPU ++;
		oCurrMOFPU = this;
		if(counterMOFPU <= checkedForResubmitMOTL.length - 1){
			oCurrMOFPU.oDataRequestMOFPU(checkedForResubmitMOTL[counterMOFPU].filter);
		}
		else{
			oCurrMOFPU.bindMoveOutLease(locallySavedMOFPU[0].TranxId,"resubmit");
			//busyDialog.close();
		}	
		
	},
	
	onDataErrorCallbackMOFPU:function(err){
		oCurrMOFPU = this;
		oCurrMOFPU.bindMoveOutLease(locallySavedMOFPU[0].TranxId,"resubmit");
		//busyDialog.close();
		//errorfromServer(err);
	},
	
	bindMoveOutLease:function(tranxID,sourceFlag){
		var filter = "";
		var moveType = "GATEOUT";
		var serialNo = sap.ui.getCore().byId("idSerialNoMOFPU").getValue().toUpperCase().trim();
		if(tranxID.trim() != ""){
			
			filter = "/Fpu_Inout?$filter=TranxId eq '"+tranxID+"'" + 
										" and MoveType eq'"+ moveType+"' and Sernr eq '"+serialNo+"'";

		}
		else{
			
			// Begin of adding by Seyed Ismail on 24.04.2015 MAC24042015

			var vDateFrom = sap.ui.getCore().byId("idGateOutFrom").getValue();		
			if(vDateFrom == ''){
				var vDateFromFin = '1999-01-01T00:00:00';
			}
			else{
				/* FIORIOPT -
				var splitvar = vDateFrom.split('-');
				var vDateFromFin = splitvar[2]+'-'+ splitvar[1]+'-'+splitvar[0]+'T00:00:00';
				FIORIOPT - */
				// FIORIOPT +
				var vDateFrom = sap.ui.getCore().byId("idGateOutFrom").getYyyymmdd();
				var vDateFromFin = vDateFrom.substr(0, 4)+'-'+vDateFrom.substr(4, 2)+'-'+vDateFrom.substr(6, 2)+'T00:00:00';
				// FIORIOPT +
			}
			
			

			var vDateTo = sap.ui.getCore().byId("idGateOutTo").getValue();				
			if(vDateTo == ''){
				var vDateToFin = '9999-12-12T00:00:00';
			}
			else{
				/* FIORIOPT -
				splitvar = vDateTo.split('-');
				var vDateToFin = splitvar[2]+'-'+ splitvar[1]+'-'+splitvar[0]+'T00:00:00';
				FIORIOPT - */
				// FIORIOPT +
				var vDateTo = sap.ui.getCore().byId("idGateOutTo").getYyyymmdd();
				var vDateToFin = vDateTo.substr(0, 4)+'-'+vDateTo.substr(4, 2)+'-'+vDateTo.substr(6, 2)+'T00:00:00';
				// FIORIOPT +
			}
			
			
			// End of adding by Seyed Ismail on 24.04.2015 MAC24042015
			
			
			var gateInDate = sap.ui.getCore().byId("idGateDateMOFPU").getYyyymmdd();
			if(gateInDate.trim().length == 0)
				gateInDate = "0000-00-00T00:00:00";
			else
				gateInDate = gateInDate.substring(0,4)+"-"+gateInDate.substring(4,6)+"-"+gateInDate.substring(6,8)+"T00:00:00";
			
			var functionalLoc = document.getElementById("idDepotMOFPU").value;
			if(functionalLoc.length > 0)
				functionalLoc = functionalLoc.substring(0,15);
			
			
			 filter = "/Fpu_Inout?$filter=Sernr eq '"+serialNo+"'"+
										" and MoveType eq '"+ moveType+"'"+
										" and DepotCode eq '"+ functionalLoc+"'"+
										" and Datefrom eq datetime'"+ vDateFromFin +"'"+			// MAC24042015 +
										" and Dateto eq datetime'"+ vDateToFin +"'";				// MAC24042015 +
		}
		
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
		 		if(sap.ui.getCore().byId("oFlexAllMOTL"))
		 			sap.ui.getCore().byId("oFlexAllMOTL").destroy(); 
		 		
		 		if(sap.ui.getCore().byId("oFlexAllMOEDIMsgs"))
		 			sap.ui.getCore().byId("oFlexAllMOEDIMsgs").destroy();
		 		
		 		locallySavedMOFPU = [];
		 		aMoveOutToLease=[];
		 		aMoveOutToLeaseALL = [];
		 		aMoveOutToLeaseALL = data.results;
				aMoveOutToLease = jQuery.grep(aMoveOutToLeaseALL, function(element, index){
			            return element.DtlFlag  == "" ;
		  		});
		 		
				for(var i=0;i<aMoveOutToLease.length;i++){
					if(aMoveOutToLease[i].MsgStatus.toLowerCase() == "error"){
						aMoveOutToLease[i].isLinkEnabled = true;
						aMoveOutToLease[i].isCheckEnabled = true;
					}
					else if(aMoveOutToLease[i].MsgStatus.toLowerCase() == "edi processed"){
						aMoveOutToLease[i].isLinkEnabled = false;
						aMoveOutToLease[i].isCheckEnabled = true;
					}
					else if(aMoveOutToLease[i].MsgStatus.toLowerCase() == "successful"){
						aMoveOutToLease[i].isLinkEnabled = false;
						aMoveOutToLease[i].isCheckEnabled = false;
					}
					else if(aMoveOutToLease[i].MsgStatus.trim().length == 0){
						aMoveOutToLease[i].isLinkEnabled = true;
						aMoveOutToLease[i].isCheckEnabled = true;
					}
				
					aMoveOutToLease[i].selResubmit = false;
					aMoveOutToLease[i].execStatus = false;
				
				var filterStepID = jQuery.grep(stepWiseFilterMOFPU, function(element, index){
		            return element.stepId  == aMoveOutToLease[i].Stepid ;
				});
				
				if(filterStepID.length > 0){
					aMoveOutToLease[i].filter = filterStepID[0].filter;
				}
				
				if(i == 0){ //  Make Local Data - First Time
					var  gateDatLocal;
					if(locallySavedMOFPU.length  == 0){  // If No Local Data - First Time
						var yyyy, mm, dd;
						var oUtil = new utility();
			            // GateDate
			            vInOutDateResult = aMoveOutToLease[0].InoutDate.split("(");
			            vDate = vInOutDateResult[1].split(")");
			            vformattedInOutDate = dateFormat(new Date(Number(vDate[0])), 'yyyy-mm-dd',"UTC");
			            //this is to check if the date is default 999 something show blank
			            if (vformattedInOutDate.substring(0,4) === "9999"){
			            		gateDatLocal = "";
			            }
			            else{
			            	yyyy = vformattedInOutDate.substring(0,4);
			            	mm = vformattedInOutDate.substring(5,7);
			            	dd = vformattedInOutDate.substring(8);
			            	gateDatLocal = yyyy + mm + dd;
			            }
						locallySavedMOFPU.push({
							  'TranxId' : aMoveOutToLease[0].TranxId,
				    		  'Sernr': aMoveOutToLease[0].Sernr.toUpperCase(),
				    		  'GateDate': gateDatLocal,
				    		  'AssetNo': aMoveOutToLease[0].AssetNo,
				    		  'Equnr': aMoveOutToLease[0].Equnr,
				    		  'Matnr':aMoveOutToLease[0].Matnr, //material type
				    		  'SubNumber': aMoveOutToLease[0].SubNumber, //sub asset number
				    		  'LeaseNo':aMoveOutToLease[0].LeaseNo, ////lease contract number
				    		  'DepotCode': aMoveOutToLease[0].DepotCode, 
				    		  'Auth': aMoveOutToLease[0].Auth, //rel auth
				    		  'Bukrs':aMoveOutToLease[0].Bukrs, //company code
				    		  'FuncLoc':aMoveOutToLease[0].DepotCode, //Functional Location
				    		  'Plangroup': aMoveOutToLease[0].Plangroup,
				    		  'SendrAddr':aMoveOutToLease[0].SendAddr,
				    		  'Depot':oUtil.removeLeadZero(aMoveOutToLease[0].WorkCtr),
				    		  'WorkCtr': oUtil.removeLeadZero(aMoveOutToLease[0].WorkCtr)
				            });
					}
				}
				}
				btnFlagGateOutFPU = "P";
		 	
		 		var oFlexAllMOTL = oCurrMOFPU.setMoveOutToLease();
		 		if(sourceFlag == "resubmit"){
			 		sap.ui.getCore().byId("idBtnDelEDIMO").setVisible(true);
			 	}
		 		var oModelMoveOutToLease = new sap.ui.model.json.JSONModel();
		    	oModelMoveOutToLease.setData(aMoveOutToLease);
		    	var oMoveOutToLeaseTable = sap.ui.getCore().byId("MoveOutToLeaseTable");
		    	oMoveOutToLeaseTable.setModel(oModelMoveOutToLease);
		    	oMoveOutToLeaseTable.bindRows("/");
		    	oMoveOutToLeaseTable.setVisibleRowCount(aMoveOutToLease.length);
		    	
		    	var oMoveOutToLeaseResFormElement = sap.ui.getCore().byId("MoveOutToLeaseResTbl");
				oMoveOutToLeaseResFormElement.insertField(oFlexAllMOTL,0);
				
		 		
		 	}else{
		 		
		 		if(sourceFlag == "submit"){
			 		var errorString = "No records for the specified search criteria. \nPlease refine your search criteria and try again.";
			    	sap.ui.commons.MessageBox.alert(errorString);
			 		if(sap.ui.getCore().byId("oFlexAllMOTL"))
			 			sap.ui.getCore().byId("oFlexAllMOTL").destroy();
			 		
			 		if(sap.ui.getCore().byId("oFlexAllMOEDIMsgs"))
			 			sap.ui.getCore().byId("oFlexAllMOEDIMsgs").destroy();
		 		}
		 		else{
		 			var errorString = "Selected Steps have been re-processed successfully";
			    	sap.ui.commons.MessageBox.alert(errorString); //,fnclearAllValuesAfterSuccessGateOut);
		 		}
		    	
		 	}
		 },
		 function(err){
		 	errorfromServer(err);
		 });
	},
	
	bindMoveOutLeaseSearchEDIMsgs: function(inMsgIdGateOut){
		busyDialog.open();
		var oCurrMOEDI = this;
		var typeEDI;
		var urlToCallMOEDI;
		btnFlagGateOutFPU = "E";
		
		// Begin of adding by Seyed Ismail on 24.04.2015 MAC24042015
		if(sap.ui.getCore().byId("idGateOutFrom"))
		{
			var vDateFrom = sap.ui.getCore().byId("idGateOutFrom").getValue();	
			if(vDateFrom == ''){
				var vDateFromFin = '1999-01-01T00:00:00';
			}
			else{
				/* FIORIOPT -
				var splitvar = vDateFrom.split('-');
				var vDateFromFin = splitvar[2]+'-'+ splitvar[1]+'-'+splitvar[0]+'T00:00:00';
				FIORIOPT - */
				// FIORIOPT +
				var vDateFrom = sap.ui.getCore().byId("idGateOutFrom").getYyyymmdd();
				var vDateFromFin = vDateFrom.substr(0, 4)+'-'+vDateFrom.substr(4, 2)+'-'+vDateFrom.substr(6, 2)+'T00:00:00';
				// FIORIOPT +
			}
		}
		
		if(sap.ui.getCore().byId("idGateOutTo"))
		{
		var vDateTo = sap.ui.getCore().byId("idGateOutTo").getValue();				
		if(vDateTo == ''){
			var vDateToFin = '9999-12-12T00:00:00';
		}
		else{
			/* FIORIOPT -
			splitvar = vDateTo.split('-');
			var vDateToFin = splitvar[2]+'-'+ splitvar[1]+'-'+splitvar[0]+'T00:00:00';
			FIORIOPT - */
			// FIORIOPT +
			var vDateTo = sap.ui.getCore().byId("idGateOutTo").getYyyymmdd();
			var vDateToFin = vDateTo.substr(0, 4)+'-'+vDateTo.substr(4, 2)+'-'+vDateTo.substr(6, 2)+'T00:00:00';
			// FIORIOPT +
		}
		}
		
		if(document.getElementById("idDepotMOFPU")){
		var functionalLoc = document.getElementById("idDepotMOFPU").value;		// MAC24042015 +
		if(functionalLoc.length > 0)											// MAC24042015 +
			functionalLoc = functionalLoc.substring(0,15);						// MAC24042015 +
		}
		// End of adding by Seyed Ismail on 24.04.2015 MAC24042015
		
		if(inMsgIdGateOut.trim().length == 0){
			typeEDI = "A";
			var serialNo = sap.ui.getCore().byId("idSerialNoMOFPU").getValue().toUpperCase().trim();
			var gateOutDate = sap.ui.getCore().byId("idGateDateMOFPU").getYyyymmdd();
			if(gateOutDate.trim().length == 0)
				gateOutDate = "0000-00-00T00:00:00";
			else
				gateOutDate = gateOutDate.substring(0,4)+"-"+gateOutDate.substring(4,6)+"-"+gateOutDate.substring(6,8)+"T00:00:00";
			var relAuth = sap.ui.getCore().byId("idRelAuthMOFPU").getValue();
			// Begin of commenting by Seyed Ismail on 24.04.2015 MAC24042015
			/* urlToCallMOEDI = serviceUrl15_old + "/Moveout_Edi?$filter=SerialNumber eq '" 
					        + serialNo + "' and GateDate eq datetime'"
					        + gateOutDate + "' and ReleaseNumber eq '"
					        + relAuth + "'"; */
			// End of commenting by Seyed Ismail on 24.04.2015 MAC24042015
			// Begin of adding by Seyed Ismail on 24.04.2015 MAC24042015
			 urlToCallMOEDI = serviceUrl15_old + "/Moveout_Edi?$filter=SerialNumber eq '" 
	            + serialNo + "'"
				+ " and Datefrom eq datetime'"+ vDateFromFin +"'"    		
				+ " and Dateto eq datetime'"+ vDateToFin +"'"				
				+ " and Funcloc eq '"+ functionalLoc+ "'";		
			// End of adding by Seyed Ismail on 24.04.2015 MAC24042015
		}
		else{
			typeEDI = "U";
			 urlToCallMOEDI = serviceUrl15_old + "/Moveout_Edi?$filter=MessageId eq '" + inMsgIdGateOut + "'";
		}
		
		oModel = new sap.ui.model.odata.ODataModel(serviceUrl15_old, true);
		OData.request({ 
		      requestUri: urlToCallMOEDI,
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
				 		if(sap.ui.getCore().byId("oFlexAllMOTL"))
				 			sap.ui.getCore().byId("oFlexAllMOTL").destroy();
				 		
				 		if(sap.ui.getCore().byId("oFlexAllMOEDIMsgs"))
				 			sap.ui.getCore().byId("oFlexAllMOEDIMsgs").destroy();
				 		
				 		locallySavedMOFPU = [];
				 		aMoveOutToLease=[];
				 		aMoveOutToLeaseALL = data.results;
				 		var oUtil = new utility();
				 		for(var i=0; i<data.results.length; i++){
			    			
			    			var filterStepID = jQuery.grep(stepWiseFilterMOFPU, function(element, index){
					            return element.stepId  == data.results[i].Stepid ;
							});
			    			
			    			if(filterStepID.length > 0){
				    			aMoveOutToLease.push({
				    				Message: data.results[i].Message,
				    				MsgStatus: "",
				    				selResubmit: false,
				    				filter: filterStepID[0].filter
				    			});
			    			}
				 		
					 		if(i == 0){ //  Make Local Data - First Time
								var  gateDatLocal;
								if(locallySavedMOFPU.length  == 0){  // If No Local Data - First Time
									
									vInOutDateResult = data.results[0].GateDate.split("(");
						            vDate = vInOutDateResult[1].split(")");
						            vformattedInOutDate = dateFormat(new Date(Number(vDate[0])), 'yyyy-mm-dd',"UTC");
						            //this is to check if the date is default 999 something show blank
						            if (vformattedInOutDate.substring(0,4) === "9999"){
						            		gateDatLocal = "";
						            }
						            else{
						            	yyyy = vformattedInOutDate.substring(0,4);
						            	mm = vformattedInOutDate.substring(5,7);
						            	dd = vformattedInOutDate.substring(8);
						            	gateDatLocal = yyyy + mm + dd;
						            }
								    
								    locallySavedMOFPU.push({
								    		  'TranxId' : "",
								    		  'Sernr': data.results[0].SerialNumber,
								    		  'GateDate': gateDatLocal,
								    		  'AssetNo':  data.results[0].AssetNumber,
								    		  'Equnr': data.results[0].EquipmentNumber,
								    		  'Matnr': data.results[0].MaterialType, //material type
								    		  'SubNumber': data.results[0].SubAssetNumber, //sub asset number
								    		  'LeaseNo': data.results[0].LeaseContractN, ////lease contract number
								    		  'DepotCode': data.results[0].Depot,
								    		  'Auth': data.results[0].ReleaseNumber, //rel auth
								    		  'Bukrs': data.results[0].CompanyCode, //company code
								    		  'FuncLoc': data.results[0].FunctionalLocat, //Functional Location
								    		  'Plangroup': data.results[0].PlannerGroup,
								    		  'SendrAddr':data.results[0].Param1,
								    		  'Depot':oUtil.removeLeadZero(data.results[0].WorkCentre),
								    		  'WorkCtr': oUtil.removeLeadZero(data.results[0].WorkCentre),
							    		});
								    
								    if(typeEDI == "U"){
								    	sap.ui.getCore().byId("idSerialNoMOFPU").setValue(data.results[0].SerialNumber);
								    	sap.ui.getCore().byId("idRelAuthMOFPU").setValue(data.results[0].ReleaseNumber);
								    	sap.ui.getCore().byId("idGateDateMOFPU").setYyyymmdd(gateDatLocal);
								    	document.getElementById("idDepotMOFPU").value = data.results[0].FunctionalLocat;   // MAC24042015
								    	sap.ui.getCore().byId("idBckMOTLStatusU").setVisible(true);
								    }
								    else{
								    	sap.ui.getCore().byId("idBckMOTLStatusU").setVisible(false);
								    }
								    
								}
					 		}
				 		}
				 	
				 		var oFlexAllMOTL = oCurrMOFPU.setMoveOutToLease();
				 		
					 	// Begin of adding by Seyed Ismail on 24.04.2015 MAC24042015
				 		if(typeEDI == "U"){
				    	sap.ui.getCore().byId("idBtnDelEDIMO").setVisible(true);
				 		}
				 		else{
				 		sap.ui.getCore().byId("idBtnDelEDIMO").setVisible(false);
				 		}
				 	// End of adding by Seyed Ismail on 24.04.2015 MAC24042015
				 		
				 		var oModelMoveOutToLease = new sap.ui.model.json.JSONModel();
				    	oModelMoveOutToLease.setData(aMoveOutToLease);
				    	var oMoveOutToLeaseTable = sap.ui.getCore().byId("MoveOutToLeaseTable");
				    	oMoveOutToLeaseTable.setModel(oModelMoveOutToLease);
				    	oMoveOutToLeaseTable.bindRows("/");
				    	//if(inMsgIdGateOut.trim().length == 0){
				    	///	oMoveOutToLeaseTable.setVisibleRowCount(6);
				    	//}
				    	//else{
				    		oMoveOutToLeaseTable.setVisibleRowCount(aMoveOutToLease.length);
				    	//}
				    	var oMoveOutToLeaseResFormElement = sap.ui.getCore().byId("MoveOutToLeaseResTbl");
						oMoveOutToLeaseResFormElement.insertField(oFlexAllMOTL,0);
						
				 		
				 	}else{
				 		var errorString = "Either no records found, or data is more than 9 months old for the specified search criteria. \nPlease refine your search criteria and try again.";
				    	sap.ui.commons.MessageBox.alert(errorString);
				    	
				 		if(sap.ui.getCore().byId("oFlexAllMOTL"))
				 			sap.ui.getCore().byId("oFlexAllMOTL").destroy();
				 		
				 		if(sap.ui.getCore().byId("oFlexAllMOEDIMsgs"))
				 			sap.ui.getCore().byId("oFlexAllMOEDIMsgs").destroy();
				 	}
				 	
		    },
		    function(err){
		    	 errorfromServer(err);
		    	//alert("Error while Reading Result : "+ : window.JSON.stringify(err.response));
		    });
	},
	
	resetGateOutFPU: function(){
		var oModel = new sap.ui.model.json.JSONModel();
        oModel.setData({
              dateValue: new Date()
        });
        
		sap.ui.getCore().byId("idSerialNoMOFPU").setValue("");
		if(sap.ui.getCore().byId("idSerialNoMOFPU")){
        	  sap.ui.getCore().byId("idSerialNoMOFPU").setValueState(sap.ui.core.ValueState.None);
        	  sap.ui.getCore().byId("idSerialNoMOFPU").setPlaceholder("Serial Number");
          }
		sap.ui.getCore().byId("idRelAuthMOFPU").setValue("");
		sap.ui.getCore().byId("idGateDateMOFPU").setModel(oModel);
		if(sap.ui.getCore().byId("idGateDateMOFPU")){
        	  sap.ui.getCore().byId("idGateDateMOFPU").setValueState(sap.ui.core.ValueState.None);
        	  sap.ui.getCore().byId("idGateDateMOFPU").setPlaceholder("");
          }
		
		 /*Begin of adding by Seyed Ismail 24.04.2015 MAC24042015 */
		 if(document.getElementById("idDepotMOFPU")){
			 document.getElementById("idDepotMOFPU").value = "";
			 document.getElementById("idDepotMOFPU").placeholder = "Depot";
          }
		 /*End of adding by Seyed Ismail 24.04.2015 MAC24042015 */
		 
		if(sap.ui.getCore().byId("oFlexAllMOTL"))
 			sap.ui.getCore().byId("oFlexAllMOTL").destroy();
 		
 		if(sap.ui.getCore().byId("oFlexAllMOEDIMsgs"))
 			sap.ui.getCore().byId("oFlexAllMOEDIMsgs").destroy();
 		
 		sap.ui.getCore().byId("idBckMOTLStatusU").setVisible(false);
 		
	}
});

function fnclearAllValuesAfterSuccessGateOut(){
	sap.ui.getCore().byId("idSerialNoMOFPU").setValue("");
	sap.ui.getCore().byId("idRelAuthMOFPU").setValue("");
	sap.ui.getCore().byId("idGateDateMOFPU").setYyyymmdd("");
}
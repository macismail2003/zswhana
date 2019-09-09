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

jQuery.sap.require("sap.ui.model.json.JSONModel");
var oCurrLAFPU;
var depotNameListLAFPU = [];
var depotListLAFPU = [];
var aLAFPUALL = [];
var aLAFPU = [];
var seletedStatusLAFPU;
var seletedStepIdLAFPU;
var stepWiseFilterLAFPU = [
     {stepId: "001", actions:"Validate in ECC", filter:"/Lessee_Valid_Testharness_ECC"},                  
	 {stepId: "002", actions:"Validate in CRM", filter:"/Lesse_Valid_Tstharness_CRM"},
	 {stepId: "003", actions:"Store in CRM", filter:"/Lessee_Store_Tstharnes_CRM"},
	 {stepId: "004", actions:"Update Work Order Status in ECC", filter:"/Lessee_Update_Testharness_ECC"},
	 {stepId: "005", actions:"Start Billing in CRM", filter:"/Lesse_Bill_Tstharness_CRM"},
];

var checkedForResubmitLAFPU = [];
var counterLAFPU;
var btnFlagLAFPU = "";
// Error Processing Related
var oCurrEPLAFPU;
var errorProcessingLAFPU = [];
var enabledGrp1EPLAFPU = false;
var enabledGrp2EPLAFPU = true;
var ocurrentEPLAFPU;
var locallySavedLAFPU = [];
var loggedInUserTypeLAFPU = "";
sap.ui.model.json.JSONModel.extend("lesseApprovalFPUView", {
	
	createScreenLAFPU: function(){
		
		oCurrLAFPU = this;
		
		var back = new sap.m.Link("idBckLAFPUStatusU",{text: " < Back",
			width:"8%",
			wrapping:true,
			visible:false,
            press: function(){
                   var bus = sap.ui.getCore().getEventBus();
                       bus.publish("nav", "back");
                       $('#idHdrContnt').html('EDI Message - Status U'); //CHANGE HEADER CONTENT
        }});
		
		var oLabelDepo = new sap.ui.commons.Label({text: "Depot:",
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S3",linebreak: true, margin: true}),
			required: true,
            wrapping: true}).addStyleClass("marginTop10");
		
		var oLabelSerialNo = new sap.ui.commons.Label({text: "Serial Number:",
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S3",linebreak: true, margin: true}),
			required: true,
            wrapping: true});
		
		var oLabelMandatory = new sap.ui.commons.Label({text: "Mandatory Field",
			required: true,
			requiredAtBegin : true,
            wrapping: true}).addStyleClass("marginTop10");
		
		var oLabelSpace = new sap.ui.commons.Label({text: "",
            width: "10px"
            });
		
		var oInputDepot = new sap.ui.core.HTML("idDepotHTMLLAFPU",{layoutData: new sap.ui.layout.GridData({span: "L4 M9 S12"}), required:true});
		var htmlContentDepot = '<input id="idDepotLAFPU" placeholder="Depot" class="FormInputStyle marginTop10" style="width:100%">';
		oInputDepot.setContent(htmlContentDepot);
		
    	var oInputSerialNo = new sap.ui.commons.TextField('idSerialNoLAFPU',{
    		layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
    		placeholder: "Serial Number",
    		//value: "GESU4039140",
    		//value:"GESU8021067",
    		//value:"SCZU7120078",
    		//value:"SCZU7116144",
    		//value:"GESU9211760",
    		//value:"GESU9185738",
    		change: function(){
    			this.setValueState(sap.ui.core.ValueState.None);
    			this.setPlaceholder("Serial Number");
    		}
    	}).addStyleClass("FormInputStyle");

    	// Buttons
    	var oBtnSearchPortalTrans = new sap.m.Button("idBtnSearchPortalTransLAFPUEDI",{
	          text : "Search for Portal Transactions",
	          width:"220px",
	          styled:false,
	          layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: true, margin: true}),
	          press:function(){
	        	  btnFlagLAFPU = "P";
	        	  if(oCurrLAFPU.validateLAFPU())
	        		  oCurrLAFPU.bindLAFPU("","submit");
		}}).addStyleClass("submitBtn marginTop10");
	 	 
	 	var oBtnSearchEDIMsgs = new sap.m.Button("idBtnSearchEDIMsgsLAFPUEDI",{
	      text : "Search for EDI Messages",
	      visible: true,				// MAC25022015 +
	      width:"220px",
	      styled:false,
	      layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: true, margin: true}),
	      press:function(){
	    	  btnFlagLAFPU = "E";
	      	 if(oCurrLAFPU.validateLAFPU())
       		  oCurrLAFPU.bindLAFPUEDIMsgs("");
	  }}).addStyleClass("submitBtn marginTop10");
	 	
	 	var oFlexSearchBtnsLAFPU = new sap.m.FlexBox({
	         items: [
	                 oBtnSearchPortalTrans,
	                 oLabelSpace,
	                 oBtnSearchEDIMsgs
	         ],
	         direction : "Row",
	      	   width:"100%"
				});
	   	 
	   // Responsive Grid Layout
	    var oLayoutLAFPU = new sap.ui.layout.form.ResponsiveGridLayout("idLayoutLAFPU1",{
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
	     var oFormLAFPU = new sap.ui.layout.form.Form("idFormLAFPU1",{
	             layout: oLayoutLAFPU,
	             formContainers: [
	                     
                     new sap.ui.layout.form.FormContainer("idFormLAFPUC1",{
                         formElements: [
								new sap.ui.layout.form.FormElement({
								    fields: [back]
								}),
								new sap.ui.layout.form.FormElement({
								    fields: [oLabelDepo, oInputDepot]
								}),
								new sap.ui.layout.form.FormElement({
								    fields: [oLabelSerialNo, oInputSerialNo]
								}),
								new sap.ui.layout.form.FormElement({
								    fields: [oFlexSearchBtnsLAFPU]
								}),
								new sap.ui.layout.form.FormElement({
								    fields: [oLabelMandatory]
								})
                          ]
                     })
	             ]
	     });
			     
	     var oLayoutLAFPU2 = new sap.ui.layout.form.ResponsiveLayout("idLayoutLAFPU2",{
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
			     
        var oFormLAFPU2 = new sap.ui.layout.form.Form("idFormLAFPU2",{
           layout: oLayoutLAFPU2,
           formContainers: [
                   new sap.ui.layout.form.FormContainer("idFormLAFPU2C1",{
                       formElements: [	                                      
		                               new sap.ui.layout.form.FormElement("LAFPUTbl",{
		                                   fields: [],
		                               })
	                               ],
                               layoutData: new sap.ui.commons.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                   })
				           ]
        });
			        
		var oFlexLAFPU = new sap.m.FlexBox({
		      items: [
		        oFormLAFPU,
		        oFormLAFPU2
		      ],
		      direction: "Column"
		});
	  return oFlexLAFPU;
	},
	
	populateDepotNameLAFPU: function(){
		
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
			    	depotListLAFPU = data.results;
			    	//alert("data.results.length : "+data.results.length);
			    	for ( var i = 0; i < data.results.length ; i++) {
			    		depotNameListLAFPU[i] = data.results[i].FunctionalLoc;
					}
			    	
			    	//alert("depotNameListAMOS len : "+depotNameListAMOS.length);
			    	
			    	$( "#idDepotLAFPU" ).autocomplete({
			    	      source: depotNameListLAFPU,
			    	      minLength: 0,
			    	      select: function(){
			    	    	  	document.getElementById("idDepotLAFPU").style.borderColor = "#cccccc";
			    				document.getElementById("idDepotLAFPU").style.background = "#ffffff";
			    				$("#idDepotLAFPU").attr("placeholder","Depot Code");
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
			    	    for (i in depotNameListLAFPU) {
			    	        if (depotNameListLAFPU[i].toLowerCase().match(this.value.toLowerCase())) {
			    	            isValid = true;
			    	        }
			    	    }
			    	    if (!isValid) {
			    	        this.value = previousValue;
			    	    } else {
			    	        previousValue = this.value;
			    	    }
			    	});
			    	loggedInUserTypeLAFPU = objLoginUser.getLoggedInUserType();
					if(loggedInUserTypeLAFPU == "SEACO"){
						$("#idDepotLAFPU").removeAttr('disabled');
					}
					else{
						var DepotCode = objLoginUser.getLoggedInUserID();
						for(var i=0;i<depotNameListLAFPU.length;i++){
							if(depotNameListLAFPU[i].substring(11,15) == DepotCode)
								DepotCode = depotNameListLAFPU[i];
						}
						$("#idDepotLAFPU").attr("disabled","disabled");
						$("#idDepotLAFPU").val(DepotCode);
					}
			    	busyDialog.close();
			    },
			    function(err){
			    	 errorfromServer(err);
			    	//alert("Error while Reading Result : "+ : window.JSON.stringify(err.response));
			    });
		},
	
	validateLAFPU:function(){
		var isValid = true;
		
		var serialNo = sap.ui.getCore().byId("idSerialNoLAFPU").getValue().trim();
		if(serialNo.length != 11){
			sap.ui.getCore().byId("idSerialNoLAFPU").setPlaceholder("Required");
			sap.ui.getCore().byId("idSerialNoLAFPU").setValue(serialNo.toUpperCase());
			sap.ui.getCore().byId("idSerialNoLAFPU").setValueState(sap.ui.core.ValueState.Error);
			isValid = false;
		}else{
			sap.ui.getCore().byId("idSerialNoLAFPU").setValue(serialNo.toUpperCase());
			
		}
		
		var vInputDepotLAFPU = document.getElementById("idDepotLAFPU").value;
		if(vInputDepotLAFPU == ""){
			document.getElementById("idDepotLAFPU").style.borderColor = "red";
    		document.getElementById("idDepotLAFPU").style.background = "#FAD4D4";
    		$("#idDepotLAFPU").attr("placeholder","Required");
    		isValid = false;
	  	  }
		if(vInputDepotLAFPU.trim().length > 0){
			var match = jQuery.inArray(vInputDepotLAFPU,depotNameListLAFPU);
			if(match < 0){
				document.getElementById("idDepotLAFPU").style.borderColor = "red";
	    		document.getElementById("idDepotLAFPU").style.background = "#FAD4D4";
	    		document.getElementById("idDepotLAFPU").value = "";
	    		document.getElementById("idDepotLAFPU").placeholder = "Invalid Depot";
	    		isValid = false;
			}
			else{
				document.getElementById("idDepotLAFPU").style.borderColor = "#cccccc";
	    		document.getElementById("idDepotLAFPU").style.background = "#ffffff";
	    		document.getElementById("idDepotLAFPU").placeholder = "Depot";
			}
		}
		return isValid;
	},
	
	bindLAFPU:function(tranxID,sourceFlag){
		var filter = "";
		var bName = "";
		var serialNo = sap.ui.getCore().byId("idSerialNoLAFPU").getValue().toUpperCase().trim();
		if(tranxID.trim() != ""){
			
			filter = "/Fix_Partial_Update_Lessee?$filter=TranxId eq '"+tranxID+"'" + 
										" and Bname eq'"+ bName+"' and Equnr eq '"+serialNo+"'";

		}else{
			
			
			var functionalLoc = document.getElementById("idDepotLAFPU").value;
			if(functionalLoc.length > 0)
				functionalLoc = functionalLoc.substring(0,15);
			
			filter = "/Fix_Partial_Update_Lessee?$filter=Equnr eq '"+serialNo+"'"+
										" and DepotCode eq '"+functionalLoc+"'"+
										" and  Bname eq '"+bName+"'";
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
		 		if(sap.ui.getCore().byId("oFlexAllLAFPU"))
		 			sap.ui.getCore().byId("oFlexAllLAFPU").destroy();
		 		
		 		if(sap.ui.getCore().byId("oFlexAllLAEDIMsgs"))
		 			sap.ui.getCore().byId("oFlexAllLAEDIMsgs").destroy();
		 		
		 		locallySavedLAFPU = [];
		 		aLAFPU=[];
		 		aLAFPUALL = data.results;
				aLAFPU = jQuery.grep(aLAFPUALL, function(element, index){
			            return element.DtlFlag  == "" ;
		  		});
		 		
				for(var i=0;i<aLAFPU.length;i++){
					if(aLAFPU[i].MsgStatus.toLowerCase() == "error"){
						aLAFPU[i].isLinkEnabled = true;
						aLAFPU[i].isCheckEnabled = true;
					}
					else if(aLAFPU[i].MsgStatus.toLowerCase() == "edi processed"){
						aLAFPU[i].isLinkEnabled = false;
						aLAFPU[i].isCheckEnabled = true;
					}
					else if(aLAFPU[i].MsgStatus.toLowerCase() == "successful"){
						aLAFPU[i].isLinkEnabled = false;
						aLAFPU[i].isCheckEnabled = false;
					}
					else if(aLAFPU[i].MsgStatus.trim().length == 0){
						aLAFPU[i].isLinkEnabled = true;
						aLAFPU[i].isCheckEnabled = true;
					}
					aLAFPU[i].selResubmit = false;
					aLAFPU[i].execStatus = false;
					
					var filterStepID = jQuery.grep(stepWiseFilterLAFPU, function(element, index){
			            return element.stepId  == aLAFPU[i].Stepid ;
					});
					
					if(filterStepID.length > 0){
						aLAFPU[i].filter = filterStepID[0].filter;
					}
					
					if(i == 0){ //  Make Local Data - First Time
						var approvalDatLocal, lesseeApprDatLocal, inDateLocal;
						if(locallySavedLAFPU.length  == 0){  // If No Local Data - First Time
							var yyyy, mm, dd;
							// TtcDate
				  			var vDocDateResult = aLAFPU[0].ApprDate.split("(");
				            var vDocDate = vDocDateResult[1].split(")");
				            var vformattedDocDate = dateFormat(new Date(Number(vDocDate[0])), 'yyyy-mm-dd',"UTC");
				            //this is to check if the date is default 999 something show blank
				            if (vformattedDocDate.substring(0,4) === "9999"){
				            	approvalDatLocal = "";
				            	aLAFPU[0].ApprDate = "";
				            }
				            else{
				            	yyyy = vformattedDocDate.substring(0,4);
				            	mm = vformattedDocDate.substring(5,7);
				            	dd = vformattedDocDate.substring(8);
				            	
				            	approvalDatLocal = yyyy + mm + dd;
				            	aLAFPU[0].ApprDate = approvalDatLocal;
				            }
				            
				            var vDocDateResult = aLAFPU[0].LsaprDate.split("(");
				            var vDocDate = vDocDateResult[1].split(")");
				            var vformattedDocDate = dateFormat(new Date(Number(vDocDate[0])), 'dd-mm-yyyy',"UTC");
				            //this is to check if the date is default 999 something show blank
				            if (vformattedDocDate.substring(0,4) === "9999"){
				            	lesseeApprDatLocal = "";
				            	aLAFPU[0].LsaprDate = "";
				            }
				            else{
				            	lesseeApprDatLocal = vformattedDocDate;
				            	aLAFPU[0].LsaprDate = lesseeApprDatLocal;
				            }
				            
				            var vDocDateResult = aLAFPU[0].InDate.split("(");
				            var vDocDate = vDocDateResult[1].split(")");
				            var vformattedDocDate = dateFormat(new Date(Number(vDocDate[0])), 'dd-mm-yyyy',"UTC");
				            //this is to check if the date is default 999 something show blank
				            if (vformattedDocDate.substring(0,4) === "9999"){
				            	inDateLocal = "";
				            	aLAFPU[0].InDate = "";
				            }
				            else{
				            	inDateLocal = vformattedDocDate;
				            	aLAFPU[0].InDate = inDateLocal;
				            }
				            
							locallySavedLAFPU.push({
								  'TranxId' : aLAFPU[0].TranxId,
					    		  'Sernr': aLAFPU[0].Sernr,
					    		  'ApprDate': approvalDatLocal,
					    		  'ApprName': aLAFPU[0].ApprName,
					    		  'AssetNo': aLAFPU[0].AssetNo,
					    		  'Equnr': aLAFPU[0].Equnr,
					    		  'Plangroup': aLAFPU[0].Plangroup,
					    		  'WorkCtr': aLAFPU[0].WorkCtr.replace(/^0+/, ''),
					    		  'PartCode': aLAFPU[0].PartCode,
					    		  'ApprRef': aLAFPU[0].ApprRef,
					    		  'ApprAmt': aLAFPU[0].ApprAmt,
					    		  'Bukrs': aLAFPU[0].Bukrs,
					    		  'Matnr': aLAFPU[0].Matnr,
					    		  'SubNumber': aLAFPU[0].SubNumber,
					    		  'TrId': aLAFPU[0].TrId.replace(/^0+/, ''),
					    		  'LsaprDate': lesseeApprDatLocal,
					    		  'LastName': aLAFPU[0].LastName,
					    		  'Descr': aLAFPU[0].Descr,
					    		  'LabTotal': numberWithCommas(aLAFPU[0].LabTotal.trim()),
					    		  'MatTotal': numberWithCommas(aLAFPU[0].MatTotal.trim()),
					    		  'ProdId': aLAFPU[0].ProdId,
					    		  'Total': numberWithCommas(aLAFPU[0].Total.trim()),
					    		  'InDate': inDateLocal,
					    		  'Lssernr': aLAFPU[0].Lssernr,
					    		  'DepotCode': aLAFPU[0].DepotCode
					            });
						}
					}
					
				}
				btnFlagLAFPU = "P";
		 		var oFlexAllLAFPU = oCurrLAFPU.setLAFPU();
		 		if(sourceFlag == "resubmit"){
			 		sap.ui.getCore().byId("idBtnDelEDILA").setVisible(true);
			 	}
		 		var oModelLAFPU = new sap.ui.model.json.JSONModel();
		 		oModelLAFPU.setData(aLAFPU);
		    	var oLAFPUTable = sap.ui.getCore().byId("LAFPUTable");
		    	oLAFPUTable.setModel(oModelLAFPU);
		    	oLAFPUTable.bindRows("/");
		    	oLAFPUTable.setVisibleRowCount(aLAFPU.length);
		    	var oLAFPUTableResFormElement = sap.ui.getCore().byId("LAFPUTbl");
		    	oLAFPUTableResFormElement.insertField(oFlexAllLAFPU,0);
				
		 		
		 	}else{
		 		if(sourceFlag == "submit"){
			 		var errorString = "No records found for the specified search criteria. \nPlease refine your search criteria and try again.";
			    	sap.ui.commons.MessageBox.alert(errorString);
			 		if(sap.ui.getCore().byId("oFlexAllLAFPU"))
			 			sap.ui.getCore().byId("oFlexAllLAFPU").destroy();
			 		
			 		if(sap.ui.getCore().byId("oFlexAllLAEDIMsgs"))
			 			sap.ui.getCore().byId("oFlexAllLAEDIMsgs").destroy();
		 		}
		 		else{
		 			var errorString = "Selected Steps have been re-processed successfully";
			    	sap.ui.commons.MessageBox.alert(errorString); //,fnclearAllValuesAfterSuccessLesseeFPU);
		 		}
		 	}
		 },
		 function(err){
		 	errorfromServer(err);
		 });
	},
	
	setLAFPU: function(){
		
		// Table
    	var oLAFPUTable = new sap.ui.table.Table("LAFPUTable",{
    		visibleRowCount: 5,
            firstVisibleRow: 1,
            columnHeaderHeight: 45,
            selectionMode: sap.ui.table.SelectionMode.None,
    	 }).addStyleClass("tblBorder");
    	
    	// Table Columns
    	oLAFPUTable.addColumn(new sap.ui.table.Column({
         label: new sap.ui.commons.Label({text: "Actions"}),
         template: new sap.ui.commons.TextView().bindProperty("text", "Message"),
         resizable:false,
         width:"120px"
    	 }));
    	 
    	oLAFPUTable.addColumn(new sap.ui.table.Column({
    		 label: new sap.ui.commons.Label({text: "Status"}),
    		 template: new sap.ui.commons.Link({
 				press : function(oEvent) {
 					seletedStatusLAFPU = this.getText();
 					seletedStepIdLAFPU = this.getHelpId();
					
 					oCurrLAFPU.gotoErrorProcessingLAFPU();
 				}
 			}).bindProperty("text", "MsgStatus").bindProperty("enabled", "isLinkEnabled").bindProperty("helpId", "Stepid"),
 			resizable:false,
            width:"70px"
    	}));

    	oLAFPUTable.addColumn(new sap.ui.table.Column({
    		 label: new sap.ui.commons.Label({text: "Select for Resubmit"}),
    		 template: new sap.ui.commons.CheckBox().bindProperty("checked", "selResubmit").bindProperty("enabled", "isCheckEnabled"),
         	 width:"40px",
         	 resizable:false,
         	// hAlign: "Center"
         }));
    	 
		var oBtnResubmit = new sap.m.Button({
            text : "Resubmit",
            styled:false,
            press:function(){
            	if(btnFlagLAFPU == "P"){
            		if(oCurrLAFPU.validateResubmitLAFPU())
                		oCurrLAFPU.resubmitLAFPU();
            	}
            	else{
                		oCurrLAFPU.resubmitLAFPU();
            	}
            }
         }).addStyleClass("submitBtn marginTop10");
	
		var viewDetailsLAEDI = new sap.m.Link("idViewDetailsLAEDIMsgs", {
			text: "View Details",
            width:"90px",
            wrapping:true,
            press: function(){
            	if(sap.ui.getCore().byId("ErrorProcLAFPU"))
    				sap.ui.getCore().byId("ErrorProcLAFPU").destroy();
    			
    			var bus = sap.ui.getCore().getEventBus();
    			bus.publish("nav", "to", {
    					id : "ErrorProcLAFPU"
    			});
    			$('#idHdrContnt').html('Lessee Approval - Error Processing');
            }});
		
		var oLabelBlank = new sap.ui.commons.Label({text: " ",
            width: "20px"});
		
		/* Begin of adding by Seyed Ismail on 24.04.2015 MAC24042015*/
		
		var oBtnDelEDIU = new sap.m.Button('idBtnDelEDILA', {
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
                oCurrLAFPU.proceedToDeleteU,
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
		var oFlexAllLAFPU = new sap.m.FlexBox("oFlexAllLAFPU",{
           items: [
                   oLAFPUTable,
                   //oBtnResubmit			//MAC24042015-
                   oFlexEDIButtons			//MAC24042015+
           ],
           direction : "Column",
        	   width:"45%"
			});
		
		var oFlexAllLAEDIMsgs = new sap.m.FlexBox("oFlexAllLAEDIMsgs",{
	           items: [
	                   oFlexAllLAFPU,
	                   oLabelBlank,
	                   viewDetailsLAEDI
	           ],
	           direction : "Row",
	        	   width:"100%"
				});
		
		if(btnFlagLAFPU == "P")
			return oFlexAllLAFPU;
		else
			return oFlexAllLAEDIMsgs;
		
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
	  				var successMessage = "Message cannot be Deleted!";
	  			 }
	  			sap.ui.commons.MessageBox.alert(successMessage, "EDI Status U Deletion");
	           },
	           function(err){
	        	   busyDialog.close();
	        	   var successMessage = "Message cannot be Deleted! Please make sure you are deleting U message";
	        	   sap.ui.commons.MessageBox.alert(successMessage, "EDI Status U Deletion");
	            });
	      }
	    },
	/* End of adding by Seyed Ismail on 24.04.2015 MAC24042015 + */
	
	gotoErrorProcessingLAFPU:function(){
		
		errorProcessingLAFPU = jQuery.grep(aLAFPUALL, function(element, index){
            return element.DtlFlag  == "X" &&  element.Stepid  == seletedStepIdLAFPU;
  		});
		
		if(errorProcessingLAFPU.length > 0){
			
			if(sap.ui.getCore().byId("ErrorProcLAFPU"))
				sap.ui.getCore().byId("ErrorProcLAFPU").destroy();
			
			var bus = sap.ui.getCore().getEventBus();
			bus.publish("nav", "to", {
					id : "ErrorProcLAFPU"
			});
			$('#idHdrContnt').html('Lessee Approval - Error Processing'); //CHANGE HEADER CONTENT
		}
	},
	
	validateResubmitLAFPU:function(){
		var isValid = true;
		var previousStepIncorrect = true;
		
		var LAFPUResubmitData = sap.ui.getCore().byId("LAFPUTable").getModel().getData();
		var len =LAFPUResubmitData.length;
		var checkedForResub = jQuery.grep(LAFPUResubmitData, function(element, index){
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
			isValid = false;
		}
		/* End of adding by Seyed Ismail on 24.04.2015 MAC24042015+ */
		/* Begin of commenting by Seyed Ismail on 24.04.2015 MAC24042015- */
		/* else{
			
			for(var i=(len-1);i>=0;i--){
				if(LAFPUResubmitData[i].selResubmit == true){
					if(i != 0){
						if( (LAFPUResubmitData[i-1].MsgStatus != "Successful") && (LAFPUResubmitData[i-1].selResubmit == false) ){
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
	
	resubmitLAFPU:function(){
		checkedForResubmitLAFPU = [];
		
		checkedForResubmitLAFPU = jQuery.grep(aLAFPU, function(element, index){
            return element.selResubmit  == true;
  		});
		
		counterLAFPU = 0;
		oCurrLAFPU.oDataRequestLAFPU(checkedForResubmitLAFPU[0].filter);
	},
	
	oDataRequestLAFPU:function(filter){
		
		var approvalDatYYYYMMDD;
		if(locallySavedLAFPU[0].ApprDate.trim() != "")
			approvalDatYYYYMMDD = locallySavedLAFPU[0].ApprDate.substring(0,4) + "-"+ locallySavedLAFPU[0].ApprDate.substring(4,6) + "-" + locallySavedLAFPU[0].ApprDate.substring(6);
		else
			approvalDatYYYYMMDD = "0000-00-00";
		
		var appDatYYYYMMDD;
		if(locallySavedLAFPU[0].LsaprDate.trim() != "")
			appDatYYYYMMDD = locallySavedLAFPU[0].LsaprDate.substring(6) + "-"+ locallySavedLAFPU[0].LsaprDate.substring(3,5) + "-" + locallySavedLAFPU[0].LsaprDate.substring(0,2);
		else
			appDatYYYYMMDD = "0000-00-00";
		
		var inactivDatYYYYMMDD;
		if(locallySavedLAFPU[0].InDate.trim() != "")
			inactivDatYYYYMMDD = locallySavedLAFPU[0].InDate.substring(6) + "-"+ locallySavedLAFPU[0].InDate.substring(3,5) + "-" + locallySavedLAFPU[0].InDate.substring(0,2);
		else
			inactivDatYYYYMMDD = "0000-00-00";
		
		var filterData = "?$filter=SerialNo eq '"+locallySavedLAFPU[0].Sernr+"' and " +
				         "Depot eq '"+locallySavedLAFPU[0].DepotCode+"' and " +
				         "UnitPartCode eq '"+locallySavedLAFPU[0].PartCode+"' and " +
				         "ApprovalDate eq datetime'"+approvalDatYYYYMMDD+"T00:00:00' and " +
				         "ApprovalRef eq '"+locallySavedLAFPU[0].ApprRef+"' and " +
				         "ApprovalName eq '"+locallySavedLAFPU[0].ApprName+"' and " +
				         "LesseeAuthAmount eq '"+locallySavedLAFPU[0].ApprAmt+"' and " +
				         "Companycode eq '"+locallySavedLAFPU[0].Bukrs+"' and " +
				         "AssetNo eq '"+locallySavedLAFPU[0].AssetNo+"' and " +
				         "Equipment eq '"+locallySavedLAFPU[0].Equnr+"' and " +
				         "MatType eq '"+locallySavedLAFPU[0].Matnr+"' and " +
				         "WrkCntr eq '"+locallySavedLAFPU[0].WorkCtr+"' and " +
				         "PlannerGrp eq '"+locallySavedLAFPU[0].Plangroup+"' and " +
				         "SubAssetNo eq '"+locallySavedLAFPU[0].SubNumber+"' and " +
				         "LdTransId eq '"+locallySavedLAFPU[0].TrId+"' and " +
				         "LdAppDate eq datetime'"+appDatYYYYMMDD+"T00:00:00' and " +
				         "LdDiscription eq '"+locallySavedLAFPU[0].Descr+"' and " +
				         "LdLastName eq '"+locallySavedLAFPU[0].LastName+"' and "+
				         "LdProdId eq '"+locallySavedLAFPU[0].ProdId+"' and "+
				         "Tranx eq '"+locallySavedLAFPU[0].TranxId+"' and "+
				         "LdSerial eq '"+locallySavedLAFPU[0].Lssernr+"' and "+
				         "LdActivInDt eq datetime'"+inactivDatYYYYMMDD+"T00:00:00' and "+
				         "LdMatCost eq '"+locallySavedLAFPU[0].MatTotal+"' and "+
				         "LdLabCost eq '"+locallySavedLAFPU[0].LabTotal+"' and "+
				         "LdTotal eq '"+locallySavedLAFPU[0].Total+"'";
				         
		
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
			 if(data.results.length > 0){
				 tranx = data.results[0].Tranx;
				 if(tranx.trim().length > 0)
					 locallySavedLAFPU[0].TranxId = tranx;
				 else
					 locallySavedLAFPU[0].TranxId = "";
				 if(data.results[0].Id == "S")
					 oCurrLAFPU.oDataSuccessCallbackLAFPU(data, response);
				 else if(data.results[0].Id == "E")
					 oCurrLAFPU.onDataErrorCallbackLAFPU("Error"); 
			 }else{
				 oCurrLAFPU.onDataErrorCallbackLAFPU("Error - No Record"); 
			 }
         },
         function(err){
        	 oCurrLAFPU.onDataErrorCallbackLAFPU(err);
          });
	},
	
	oDataSuccessCallbackLAFPU:function(resultdata, response){
		counterLAFPU ++;
		
		if(counterLAFPU <= checkedForResubmitLAFPU.length - 1){
			oCurrLAFPU.oDataRequestLAFPU(checkedForResubmitLAFPU[counterLAFPU].filter);
		}
		else{
			oCurrLAFPU.bindLAFPU(locallySavedLAFPU[0].TranxId,"resubmit");
			//busyDialog.close();
		}	
		
	},
	
	onDataErrorCallbackLAFPU:function(error){
		oCurrLAFPU.bindLAFPU(locallySavedLAFPU[0].TranxId,"resubmit");
		//busyDialog.close();
	},
	
	bindLAFPUEDIMsgs:function(inMsgIdLAFPU){
		var typeEDI;
		btnFlagLAFPU = "E";
		if(inMsgIdLAFPU.trim().length == 0){
			typeEDI = "A";
			var serialNo = sap.ui.getCore().byId("idSerialNoLAFPU").getValue().toUpperCase().trim();
			var functionalLoc = document.getElementById("idDepotLAFPU").value;
			if(functionalLoc.length > 0)
				functionalLoc = functionalLoc.substring(0,15);
			filter = "/Lese_Apr_Edi?$filter=Depot eq '"+functionalLoc+"'"+
					" and MessageId eq ''"+
					" and  SerialNumber eq '"+serialNo+"'";
			
		}
		else{
			typeEDI = "U";
			filter = "/Lese_Apr_Edi?$filter=MessageId eq '" + inMsgIdLAFPU + "'";
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
		 		if(sap.ui.getCore().byId("oFlexAllLAFPU"))
		 			sap.ui.getCore().byId("oFlexAllLAFPU").destroy();
		 		
		 		if(sap.ui.getCore().byId("oFlexAllLAEDIMsgs"))
		 			sap.ui.getCore().byId("oFlexAllLAEDIMsgs").destroy();
		 		
		 		locallySavedLAFPU = [];
		 		aLAFPU=[];
		 		aLAFPUALL = data.results;
		 		
				for(var i=0;i<data.results.length;i++){
					
					var filterStepID = jQuery.grep(stepWiseFilterLAFPU, function(element, index){
			            return element.stepId  == data.results[i].Stepid ;
					});
					
					if(filterStepID.length > 0){
						aLAFPU.push({
		    				Message: data.results[i].Message,
		    				MsgStatus: "",
		    				selResubmit: false,
		    				filter: filterStepID[0].filter
		    			});
					}
					
					if(i == 0){ //  Make Local Data - First Time
						var approvalDatLocal, lesseeApprDatLocal, inDateLocal;
						if(locallySavedLAFPU.length  == 0){  // If No Local Data - First Time
							var yyyy, mm, dd;
							// TtcDate
				  			var vDocDateResult = data.results[0].ApprovalDate.split("(");
				            var vDocDate = vDocDateResult[1].split(")");
				            var vformattedDocDate = dateFormat(new Date(Number(vDocDate[0])), 'yyyy-mm-dd',"UTC");
				            //this is to check if the date is default 999 something show blank
				            if (vformattedDocDate.substring(0,4) === "9999"){
				            	approvalDatLocal = "";
				            	data.results[0].ApprDate = "";
				            }
				            else{
				            	yyyy = vformattedDocDate.substring(0,4);
				            	mm = vformattedDocDate.substring(5,7);
				            	dd = vformattedDocDate.substring(8);
				            	
				            	approvalDatLocal = yyyy + mm + dd;
				            	data.results[0].ApprDate = approvalDatLocal;
				            }
				            
				            var vDocDateResult = data.results[0].LdAppDate.split("(");
				            var vDocDate = vDocDateResult[1].split(")");
				            var vformattedDocDate = dateFormat(new Date(Number(vDocDate[0])), 'dd-mm-yyyy',"UTC");
				            //this is to check if the date is default 999 something show blank
				            if (vformattedDocDate.substring(0,4) === "9999"){
				            	lesseeApprDatLocal = "";
				            	data.results[0].LsaprDate = "";
				            }
				            else{
				            	lesseeApprDatLocal = vformattedDocDate;
				            	data.results[0].LsaprDate = lesseeApprDatLocal;
				            }
				            
				            var vDocDateResult = data.results[0].LdActivInDt.split("(");
				            var vDocDate = vDocDateResult[1].split(")");
				            var vformattedDocDate = dateFormat(new Date(Number(vDocDate[0])), 'dd-mm-yyyy',"UTC");
				            //this is to check if the date is default 999 something show blank
				            if (vformattedDocDate.substring(0,4) === "9999"){
				            	inDateLocal = "";
				            	data.results[0].InDate = "";
				            }
				            else{
				            	inDateLocal = vformattedDocDate;
				            	data.results[0].InDate = inDateLocal;
				            }
				            
							locallySavedLAFPU.push({
								  'TranxId' : "",
					    		  'Sernr': aLAFPUALL[0].SerialNumber,
					    		  'ApprDate': approvalDatLocal,
					    		  'ApprName': aLAFPUALL[0].ApproverName,
					    		  'AssetNo': aLAFPUALL[0].AssetNumber,
					    		  'Equnr': aLAFPUALL[0].EquipmentNumber,
					    		  'Plangroup': aLAFPUALL[0].PlannerGroup,
					    		  'WorkCtr': aLAFPUALL[0].WorkCentre.replace(/^0+/, ''),
					    		  'PartCode': aLAFPUALL[0].UnitPartCode,
					    		  'ApprRef': aLAFPUALL[0].ApprovalNumber,
					    		  'ApprAmt': aLAFPUALL[0].LesseAuthAmt,
					    		  'Bukrs': aLAFPUALL[0].CompanyCode,
					    		  'Matnr': aLAFPUALL[0].MaterialType,
					    		  'SubNumber': aLAFPUALL[0].SubAssetNumber,
					    		  'TrId': aLAFPUALL[0].LdTransId.replace(/^0+/, ''),
					    		  'LsaprDate': lesseeApprDatLocal,
					    		  'LastName': aLAFPUALL[0].LdLastName,
					    		  'Descr': aLAFPUALL[0].LdDiscription,
					    		  'LabTotal': numberWithCommas(aLAFPUALL[0].LdLabCost.trim()),
					    		  'MatTotal': numberWithCommas(aLAFPUALL[0].LdMatCost.trim()),
					    		  'ProdId': aLAFPUALL[0].LdProdId,
					    		  'Total': numberWithCommas(aLAFPUALL[0].LdTotal.trim()),
					    		  'InDate': inDateLocal,
					    		  'Lssernr': aLAFPUALL[0].LdSerial,
					    		  'DepotCode': aLAFPUALL[0].Depot
					            });
							
							if(typeEDI == "U"){
						    	sap.ui.getCore().byId("idSerialNoLAFPU").setValue(data.results[0].SerialNumber);
						    	var depot =  jQuery.grep(depotListLAFPU, function(element, index){
						    		return element.Depot  == aLAFPUALL[0].WorkCentre.replace(/^0+/, '').trim();
							    });
						    	if(depot.length > 0)
						    		document.getElementById("idDepotLAFPU").value = depot[0].FunctionalLoc;
						    	sap.ui.getCore().byId("idBckLAFPUStatusU").setVisible(true);
						    }
							else{
								sap.ui.getCore().byId("idBckLAFPUStatusU").setVisible(false);
							}
						}
					}
					
				}
		 		var oFlexAllLAFPU = oCurrLAFPU.setLAFPU();
		 		
		 	// Begin of adding by Seyed Ismail on 24.04.2015 MAC24042015
		 		if(typeEDI == "U"){
		    	sap.ui.getCore().byId("idBtnDelEDILA").setVisible(true);
		 		}
		 		else{
		 		sap.ui.getCore().byId("idBtnDelEDILA").setVisible(false);
		 		}
		 	// End of adding by Seyed Ismail on 24.04.2015 MAC24042015
		 		
		 		var oModelLAFPU = new sap.ui.model.json.JSONModel();
		 		oModelLAFPU.setData(aLAFPU);
		    	var oLAFPUTable = sap.ui.getCore().byId("LAFPUTable");
		    	oLAFPUTable.setModel(oModelLAFPU);
		    	oLAFPUTable.bindRows("/");
		    	//if(inMsgIdLAFPU.trim().length == 0)
		    		//oLAFPUTable.setVisibleRowCount(5);
		    	//else
		    		oLAFPUTable.setVisibleRowCount(aLAFPU.length);
		    	var oLAFPUTableResFormElement = sap.ui.getCore().byId("LAFPUTbl");
		    	oLAFPUTableResFormElement.insertField(oFlexAllLAFPU,0);
				
		 		
		 	}else{
		 		var errorString = "No records found for the specified search criteria. \nPlease refine your search criteria and try again.";
		    	sap.ui.commons.MessageBox.alert(errorString);
		    	
		 		if(sap.ui.getCore().byId("oFlexAllLAFPU"))
		 			sap.ui.getCore().byId("oFlexAllLAFPU").destroy();
		 		
		 		if(sap.ui.getCore().byId("oFlexAllLAEDIMsgs"))
		 			sap.ui.getCore().byId("oFlexAllLAEDIMsgs").destroy();
		 	}
		 },
		 function(err){
		 	errorfromServer(err);
		 });
	},
	
	resetFPULessee: function(){
		loggedInUserTypeLAFPU = objLoginUser.getLoggedInUserType();
		if(loggedInUserTypeLAFPU == "SEACO"){
			$("#idDepotLAFPU").val("");
			 if(document.getElementById("idDepotLAFPU")){
	                document.getElementById("idDepotLAFPU").style.borderColor = "#cccccc";
		    		document.getElementById("idDepotLAFPU").style.background = "#ffffff";
		    		document.getElementById("idDepotLAFPU").placeholder = "Depot";
               }
		}
			sap.ui.getCore().byId("idSerialNoLAFPU").setValue("");
			if(sap.ui.getCore().byId("idSerialNoLAFPU")){
	          	  sap.ui.getCore().byId("idSerialNoLAFPU").setValueState(sap.ui.core.ValueState.None);
	          	  sap.ui.getCore().byId("idSerialNoLAFPU").setPlaceholder("Serial Number");
	            }
		
		if(sap.ui.getCore().byId("oFlexAllLAFPU"))
 			sap.ui.getCore().byId("oFlexAllLAFPU").destroy();
 		
 		if(sap.ui.getCore().byId("oFlexAllLAEDIMsgs"))
 			sap.ui.getCore().byId("oFlexAllLAEDIMsgs").destroy();
 		
 		sap.ui.getCore().byId("idBckLAFPUStatusU").setVisible(false);
	}
	
	
});

function fnclearAllValuesAfterSuccessLesseeFPU(){
	sap.ui.getCore().byId("idSerialNoLAFPU").setValue("");
	document.getElementById("idDepotLAFPU").value = "";
}
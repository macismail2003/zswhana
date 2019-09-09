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

var oCurrRCFPU;
var depotNameListRCFPU= [];
var depotListRCFPU= [];
var btnFlagRCFPU;
var locallySavedRCFPU = [];
var aRCFPU=[];
var aRCFPUALL = [];
var stepWiseFilterRCFPU = [
                        	 {stepId: "001", actions:"Validate in ECC", filter:"/Rep_Prog_TstHrns_Valid_ECC" },
                        	 {stepId: "002", actions:"Store in ECC", filter:"/Rep_Prog_TstHrns_Store_ECC"},
                        ];
var seletedStatusRCFPU;
var seletedStepIdRCFPU;
var counterRCFPU;
//Error Processing Related
var errorProcessingRCFPU = [];
var enabledGrp1EPRCFPU = true;
var enabledGrp2EPRCFPU = false;
var ocurrentEPRCFPU;
var checkedForResubmitRCFPU = [];
var loggedInUserTypeRCFPU = "";
sap.ui.model.json.JSONModel.extend("repaircompltnFPUView", {
	
	createRCFPUView: function(){
		oCurrRCFPU = this;
		
		var back = new sap.m.Link("idBckRCFPUStatusU",{text: " < Back",
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
		
		var oLabelDepo = new sap.ui.commons.Label({text: "Depot:",
			required: true,
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S3",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");
		
		var oLabelEstType = new sap.ui.commons.Label({text: "Estimate Type:",
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S3",linebreak: true, margin: true}),
			required: true,
            wrapping: true}).addStyleClass("marginTop10");
	
		var oLabelRepairDate = new sap.ui.commons.Label({text: "Repair Date:",
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S3",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");
		
		var oLabelUnitPartCode = new sap.ui.commons.Label({text: "Unit Part Code:",
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S3",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");
		
		var oLabelMandatory = new sap.ui.commons.Label({text: "Mandatory Field",
			required: true,
			requiredAtBegin : true,
            wrapping: true}).addStyleClass("marginTop10");
		
		var oLabelSpace = new sap.ui.commons.Label({text: "",
            width: "10px"
            });
		
		
		var oInputSerialNo = new sap.ui.commons.TextField('idSerialNoRCFPU',{
    		layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
    		placeholder: "Serial Number",
    		//value: "GESU4398411",
    	}).addStyleClass("FormInputStyle");
    	
    	oInputSerialNo.onfocusin =  function(e) {  
			this.setValueState(sap.ui.core.ValueState.None);
			this.setPlaceholder("Serial Number");                          
	    };
		
	    var oInputDepot = new sap.ui.core.HTML("idDepotHTMLRCFPU",{layoutData: new sap.ui.layout.GridData({span: "L4 M9 S12"})});
		var htmlContentDepot = '<input id="idDepotRCFPU" placeholder="Depot" class="FormInputStyle marginTop10" style="width:100%">';
		oInputDepot.setContent(htmlContentDepot);
		
		var oModelCurrDateRCFPU = new sap.ui.model.json.JSONModel();
		oModelCurrDateRCFPU.setData({
	   		dateValue: new Date()
		});
    	var oInputRepairDate = new sap.ui.commons.DatePicker('idRepairDateRCFPU',{
    		value: {
                path: "/dateValue",
                type: new sap.ui.model.type.Date({pattern: "dd-MM-yyyy"})
    			},
    			placeholder: "Repair Date",
    			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S9"}),
    			// yyyymmdd: "20140422",
    			liveChange:function(oControlEvent){
    				this.setPlaceholder("Repair Date");
    				this.setValueState(sap.ui.core.ValueState.None);
    			},
    	});
    	//oInputGateDate.setModel(oModelCurrDateMOFPU);
    	oInputRepairDate.addStyleClass("FormInputStyle marginTop10");
    	oInputRepairDate.setLocale("en-US");
    	oInputRepairDate.attachChange(
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
    	
    	 var oComboUnitPartCode = new sap.ui.commons.DropdownBox("idUnitPartCodeDRpDwnRCFPU", {
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
			  displaySecondaryValues:false, placeholder:"Select Unit Part Code"}).addStyleClass("FormInputStyle marginTop10");
	   	 oComboUnitPartCode.setSelectedKey("C");
	   	 
	   	 
	   	 var oComboEstType = new sap.ui.commons.DropdownBox("idEstTypeDrpDwnRCFPU", {
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
				  displaySecondaryValues:false, placeholder:"Select Estimate Type"}).addStyleClass("FormInputStyle marginTop10");
	   	 oComboEstType.setSelectedKey("0");
	   	 
	  // Buttons
    	 var oBtnSearchPortalTrans = new sap.m.Button("idBtnSearchPortalTransRCFPU",{
	          text : "Search for Portal Transactions",
	          width:"220px",
	          styled:false,
	          layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: true, margin: true}),
	          press:function(){
	        	  btnFlagRCFPU = "P";
	        	  if(oCurrRCFPU.validateRCFPUForm())
	        		  oCurrRCFPU.bindRCFPU("","submit");
		}}).addStyleClass("submitBtn marginTop10");
	  	 
	  	var oBtnSearchEDIMsgs = new sap.m.Button("idBtnSearchEDIMsgsRCFPU",{
	         text : "Search for EDI Messages",
	         visible: true,				// MAC25022015 +
	         width:"220px",
	         styled:false,
	         layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: true, margin: true}),
	         press:function(){
	        	 btnFlagRCFPU = "E";
	       	  if(oCurrRCFPU.validateRCFPUForm())
	       		oCurrRCFPU.bindRCFPUEDIMsgs("");
	   }}).addStyleClass("submitBtn marginTop10");
	  	
	  	var oFlexSearchBtnsRCFPU = new sap.m.FlexBox({
	          items: [
	                  oBtnSearchPortalTrans,
	                  oLabelSpace,
	                  oBtnSearchEDIMsgs
	          ],
	          direction : "Row",
	       	   width:"100%"
			});
	  	
	 // Responsive Grid Layout
	    var oRCFPUFormLayout = new sap.ui.layout.form.ResponsiveGridLayout("idRCFPUFormLayout",{
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
	     var oRCFPUForm = new sap.ui.layout.form.Form("idRCFormRCFPU",{
	             layout: oRCFPUFormLayout,
	             formContainers: [
	                     
	                     new sap.ui.layout.form.FormContainer("idRCFormC1RCFPU",{
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
												    fields: [oLabelEstType, oComboEstType]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oLabelRepairDate, oInputRepairDate]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oLabelUnitPartCode, oComboUnitPartCode]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oFlexSearchBtnsRCFPU]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oLabelMandatory]
												})
	                                     ]
	                     })
	             ]
	     });
	     
	     var oRCFPUResLayout = new sap.ui.layout.form.ResponsiveLayout("idRCFPUResLayout",{
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
			     
       var oRCFPUResForm = new sap.ui.layout.form.Form("idRCFPUResForm",{
          layout: oRCFPUResLayout,
          formContainers: [
                  new sap.ui.layout.form.FormContainer("idRCFPUResFormC1",{
                      formElements: [	                                      
		                               new sap.ui.layout.form.FormElement("idRCFPUResTblFormElement",{
		                                   fields: [],
		                               })
	                               ],
                              layoutData: new sap.ui.commons.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                  })
				           ]
       });
       
       var oFlexRCFPU = new sap.m.FlexBox({
		      items: [
		        oRCFPUForm,
		        oRCFPUResForm
		      ],
		      direction: "Column"
		});

	  return oFlexRCFPU;
   	 
	},
	
	populateDepotNameRCFPU: function(){
		
		busyDialog.open();
			oModel = new sap.ui.model.odata.ODataModel(serviceUrl15_old, true);
			var urlToCall = serviceUrl15_old + "/F4_Functional_Location";
			//alert("urlToCallLASDep : "+urlToCallLASDep);
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
			    	depotListRCFPU = data.results;
			    	//alert("data.results.length : "+data.results.length);
			    	for ( var i = 0; i < data.results.length ; i++) {
			    		depotNameListRCFPU[i] = data.results[i].FunctionalLoc;
					}
			    	
			    	//alert("depotNameListAMOS len : "+depotNameListAMOS.length);
			    	
			    	$( "#idDepotRCFPU" ).autocomplete({
			    	      source: depotNameListRCFPU,
			    	      minLength: 0,
			    	      select: function(){
			    	    	  	document.getElementById("idDepotRCFPU").style.borderColor = "#cccccc";
			    				document.getElementById("idDepotRCFPU").style.background = "#ffffff";
			    				document.getElementById("idDepotRCFPU").placeholder = "Depot";
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
			    	    for (i in depotNameListRCFPU) {
			    	        if (depotNameListRCFPU[i].toLowerCase().match(this.value.toLowerCase())) {
			    	            isValid = true;
			    	        }
			    	    }
			    	    if (!isValid) {
			    	        this.value = previousValue;
			    	    } else {
			    	        previousValue = this.value;
			    	    }
			    	});
			    	loggedInUserTypeRCFPU = objLoginUser.getLoggedInUserType();
					if(loggedInUserTypeRCFPU == "SEACO"){
						$("#idDepotRCFPU").removeAttr('disabled');
					}
					else{
						var DepotCode = objLoginUser.getLoggedInUserID();
						for(var i=0;i<depotNameListRCFPU.length;i++){
							if(depotNameListRCFPU[i].substring(11,15) == DepotCode)
								DepotCode = depotNameListRCFPU[i];
						}
						$("#idDepotRCFPU").attr("disabled","disabled");
						$("#idDepotRCFPU").val(DepotCode);
					}
			    	busyDialog.close();
			    },
			    function(err){
			    	 errorfromServer(err);
			    	//alert("Error while Reading Result : "+ : window.JSON.stringify(err.response));
			    });
		},
		
	validateRCFPUForm:function(){
		var isValid = true;
		
		var serialNo = sap.ui.getCore().byId("idSerialNoRCFPU").getValue();
		
		if(serialNo == ""){
			sap.ui.getCore().byId("idSerialNoRCFPU").setPlaceholder("Required");
			//sap.ui.getCore().byId("idSerialNoMOFPU").setValue(serialNo.toUpperCase())
			sap.ui.getCore().byId("idSerialNoRCFPU").setValueState(sap.ui.core.ValueState.Error);
			isValid = false;
		}
		else if(serialNo.trim().length != 11){
			sap.ui.getCore().byId("idSerialNoRCFPU").setValue("");
			sap.ui.getCore().byId("idSerialNoRCFPU").setPlaceholder("Invalid Unit Number");
			//sap.ui.getCore().byId("idSerialNoMOFPU").setValue(serialNo.toUpperCase())
			sap.ui.getCore().byId("idSerialNoRCFPU").setValueState(sap.ui.core.ValueState.Error);
			isValid = false;
		}else{
			sap.ui.getCore().byId("idSerialNoRCFPU").setValue(serialNo.toUpperCase());
			
		}
		
		var vEstType = sap.ui.getCore().byId("idEstTypeDrpDwnRCFPU").getSelectedKey();
		if(vEstType == 0){
			sap.ui.getCore().byId("idEstTypeDrpDwnRCFPU").setValueState(sap.ui.core.ValueState.Error);
			sap.ui.getCore().byId("idEstTypeDrpDwnRCFPU").setValue("");
			sap.ui.getCore().byId("idEstTypeDrpDwnRCFPU").setPlaceholder("Required");
			isValid = false;
		}
		
		var vDepot = document.getElementById("idDepotRCFPU").value;
		if(vDepot.trim().length == 0){
			document.getElementById("idDepotRCFPU").style.borderColor = "red";
    		document.getElementById("idDepotRCFPU").style.background = "#FAD4D4";
    		document.getElementById("idDepotRCFPU").value = "";
    		document.getElementById("idDepotRCFPU").placeholder = "Required";
    		isValid = false;
		}
		if(vDepot.trim().length > 0){
			var match = jQuery.inArray(vDepot,depotNameListRCFPU);
			if(match < 0){
				document.getElementById("idDepotRCFPU").style.borderColor = "red";
	    		document.getElementById("idDepotRCFPU").style.background = "#FAD4D4";
	    		document.getElementById("idDepotRCFPU").value = "";
	    		document.getElementById("idDepotRCFPU").placeholder = "Invalid Depot";
	    		isValid = false;
			}
			else{
				document.getElementById("idDepotRCFPU").style.borderColor = "#cccccc";
	    		document.getElementById("idDepotRCFPU").style.background = "#ffffff";
	    		document.getElementById("idDepotRCFPU").placeholder = "Depot";
			}
		}
	  	  
		return isValid;
	},
	
	bindRCFPU:function(tranxID,sourceFlag){
		oCurrRCFPU = this;
		var filter = "";
		//http://seanwgd1.gessap.local:8000/sap/opu/odata/sap/ZNW_SEACO_PORTAL_LOT5_SRV/Fix_Repair_Comp?$filter=Bname eq '' 
			//and DepotCode eq 'SAM-BR-SSZ-1596' and Equnr eq 'GESU2309797' and EstimateType eq 'Original' and TranxId eq '' 
			//and UnitPartcode eq '' and RepairDate eq datetime'0000-00-00T00:00:00'
		var serialNo = sap.ui.getCore().byId("idSerialNoRCFPU").getValue().toUpperCase().trim();
		if(tranxID.trim() != ""){
			
			filter = "/Fix_Repair_Comp?$filter=TranxId eq '"+tranxID+"' and Equnr eq '"+serialNo+"'";

		}
		else{
			var estType = sap.ui.getCore().byId("idEstTypeDrpDwnRCFPU").getSelectedKey();
			var UPC = sap.ui.getCore().byId("idUnitPartCodeDRpDwnRCFPU").getSelectedKey();
			var repairDate = sap.ui.getCore().byId("idRepairDateRCFPU").getYyyymmdd();
			if(repairDate.trim().length == 0)
				repairDate = "0000-00-00T00:00:00";
			else
				repairDate = repairDate.substring(0,4)+"-"+repairDate.substring(4,6)+"-"+repairDate.substring(6,8) + "T00:00:00";
			
			var functionalLoc = document.getElementById("idDepotRCFPU").value;
			if(functionalLoc.length > 0)
				functionalLoc = functionalLoc.substring(0,15);
			var bName = "";
			
			 filter = "/Fix_Repair_Comp?$filter=Equnr eq '"+serialNo+"'"+
											" and RepairDate eq datetime'"+repairDate+"'"+
											" and EstimateType eq '"+ estType+"'"+
											" and DepotCode eq '" + functionalLoc + "'"+
											" and UnitPartcode eq '"+UPC+"'"+
											" and  Bname eq '"+bName+"'";
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
			 		if(sap.ui.getCore().byId("oFlexAllRCFPU"))
			 			sap.ui.getCore().byId("oFlexAllRCFPU").destroy(); 
			 		
			 		if(sap.ui.getCore().byId("oFlexAllRCFPUEDIMsgs"))
			 			sap.ui.getCore().byId("oFlexAllRCFPUEDIMsgs").destroy();
			 		
			 		locallySavedRCFPU = [];
			 		aRCFPU=[];
			 		aRCFPUALL = [];
			 		aRCFPUALL = data.results;
			 		aRCFPU = jQuery.grep(aRCFPUALL, function(element, index){
				            return element.DtlFlag == "" ;
			  		});
			 		
					for(var i=0;i<aRCFPU.length;i++){
						if(aRCFPU[i].MsgStatus.toLowerCase() == "error"){
							aRCFPU[i].isLinkEnabled = true;
							aRCFPU[i].isCheckEnabled = true;
						}
						else if(aRCFPU[i].MsgStatus.toLowerCase() == "edi processed"){
							aRCFPU[i].isLinkEnabled = false;
							aRCFPU[i].isCheckEnabled = true;
						}
						else if(aRCFPU[i].MsgStatus.toLowerCase() == "successful"){
							aRCFPU[i].isLinkEnabled = false;
							aRCFPU[i].isCheckEnabled = false;
						}
						else if(aRCFPU[i].MsgStatus.trim().length == 0){
							aRCFPU[i].isLinkEnabled = true;
							aRCFPU[i].isCheckEnabled = true;
						}
					
						aRCFPU[i].selResubmit = false;
						aRCFPU[i].execStatus = false;
					
					var filterStepID = jQuery.grep(stepWiseFilterRCFPU, function(element, index){
			            return element.stepId  == aRCFPU[i].Stepid ;
					});
					
					if(filterStepID.length > 0){
						aRCFPU[i].filter = filterStepID[0].filter;
					}
					
					if(i == 0){ //  Make Local Data - First Time
						var  repairDateLocal,gateDateLocal;
						if(locallySavedRCFPU.length  == 0){  // If No Local Data - First Time
							var yyyy, mm, dd;
							var oUtil = new utility();
				            // RepairDate
				            vRepairDateResult = aRCFPU[0].RepairDate.split("(");
				            vDate = vRepairDateResult[1].split(")");
				            vformattedRepairDate = dateFormat(new Date(Number(vDate[0])), 'yyyy-mm-dd',"UTC");
				            //this is to check if the date is default 999 something show blank
				            if (vformattedRepairDate.substring(0,4) === "9999"){
				            	repairDateLocal = "";
				            }
				            else{
				            	yyyy = vformattedRepairDate.substring(0,4);
				            	mm = vformattedRepairDate.substring(5,7);
				            	dd = vformattedRepairDate.substring(8);
				            	repairDateLocal = yyyy + mm + dd;
				            }
				            
				         // GateDate
				            vGateDateResult = aRCFPU[0].GateDate.split("(");
				            vDate = vGateDateResult[1].split(")");
				            vformattedGateDate = dateFormat(new Date(Number(vDate[0])), 'yyyy-mm-dd',"UTC");
				            //this is to check if the date is default 999 something show blank
				            if (vformattedGateDate.substring(0,4) === "9999"){
				            	gateDateLocal = "";
				            }
				            else{
				            	yyyy = vformattedGateDate.substring(0,4);
				            	mm = vformattedGateDate.substring(5,7);
				            	dd = vformattedGateDate.substring(8);
				            	gateDateLocal = yyyy + mm + dd;
				            }
				            
				            locallySavedRCFPU.push({
								  'TranxId' : aRCFPU[0].TranxId,
					    		  'Sernr': aRCFPU[0].Sernr.toUpperCase(),
					    		  'RepairDate':repairDateLocal,
					    		  'EstType':aRCFPU[0].EstimateType,
					    		  'AssetNo': aRCFPU[0].AssetNo,
					    		  'Equnr': aRCFPU[0].Equnr,
					    		  'Matnr':aRCFPU[0].Matnr, //material type
					    		  'SubNumber': aRCFPU[0].SubNumber, //sub asset number
					    		  'SendrAddrs':aRCFPU[0].SendAddr,
					    		  'GateDate': gateDateLocal,
					    		  'UnitPartCode':aRCFPU[0].UnitPartcode,
					    		  'Bukrs':aRCFPU[0].Bukrs, //company code
					    		  'FuncLoc':aRCFPU[0].DepotCode, //Functional Location
  					    		  'Plangroup': aRCFPU[0].Plangroup,
					    		  'WorkCtr': aRCFPU[0].WorkCtr
					            });
						}
					}
					}
					btnFlagRCFPU = "P";
			 	
			 		var oFlexAllRCFPU = oCurrRCFPU.setRepairCompltnFPU();
			 		if(sourceFlag == "resubmit"){
				 		sap.ui.getCore().byId("idBtnDelEDIRC").setVisible(true);
				 	}
			 		var oModelRCFPU = new sap.ui.model.json.JSONModel();
			 		oModelRCFPU.setData(aRCFPU);
			    	var oMoveOutToLeaseTable = sap.ui.getCore().byId("RCFPUResultTable");
			    	oMoveOutToLeaseTable.setModel(oModelRCFPU);
			    	oMoveOutToLeaseTable.bindRows("/");
			    	oMoveOutToLeaseTable.setVisibleRowCount(aRCFPU.length);
			    	
			    	var oRCFPUResFormElement = sap.ui.getCore().byId("idRCFPUResTblFormElement");
			    	oRCFPUResFormElement.insertField(oFlexAllRCFPU,0);
					
			 		
			 	}else{
			 		
			 		if(sourceFlag == "submit"){
				 		var errorString = "Either no records found, or data is more than 12 months old for the specified search criteria. \nPlease refine your search criteria and try again.";
				    	sap.ui.commons.MessageBox.alert(errorString);
				    	
				 		if(sap.ui.getCore().byId("oFlexAllRCFPU"))
				 			sap.ui.getCore().byId("oFlexAllRCFPU").destroy();
				 		
				 		if(sap.ui.getCore().byId("oFlexAllRCFPUEDIMsgs"))
				 			sap.ui.getCore().byId("oFlexAllRCFPUEDIMsgs").destroy();
				 		
			 		}
			 		else{
			 			var errorString = "Selected Steps have been re-processed successfully";
				    	sap.ui.commons.MessageBox.alert(errorString); //,fnclearAllValuesAfterSuccessRepairCompltnFPU);
			 		}
			 	}
			 },
			 function(err){
			 	errorfromServer(err);
			 });
		},
		
	setRepairCompltnFPU: function(){

		oCurrRCFPU = this;
		// Table
    	var oRCFPUTable = new sap.ui.table.Table("RCFPUResultTable",{
    		visibleRowCount: 2,
            firstVisibleRow: 1,
            columnHeaderHeight: 45,
            selectionMode: sap.ui.table.SelectionMode.None,
    	 }).addStyleClass("tblBorder");
    	
    	// Table Columns
    	oRCFPUTable.addColumn(new sap.ui.table.Column({
         label: new sap.ui.commons.Label({text: "Actions"}),
         template: new sap.ui.commons.TextView().bindProperty("text", "Message"),
         resizable:false,
         width:"140px"
    	 }));
    	 
    	oRCFPUTable.addColumn(new sap.ui.table.Column({
    		 label: new sap.ui.commons.Label({text: "Status"}),
    		 template: new sap.ui.commons.Link({
 				press : function(oEvent) {
 					seletedStatusRCFPU = this.getText();
 					seletedStepIdRCFPU = this.getHelpId();
					
 					oCurrRCFPU.gotoErrorProcessingRCFPU();
 				}
 			}).bindProperty("text", "MsgStatus").bindProperty("enabled", "isLinkEnabled").bindProperty("helpId", "Stepid"),
 			resizable:false,
            width:"80px"
    	}));

    	oRCFPUTable.addColumn(new sap.ui.table.Column({
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
            	if(btnFlagRCFPU == "P"){
            		if(oCurrRCFPU.validateOnResubmitRCFPU())
            			oCurrRCFPU.resubmitRCFPU();
            	}
            	else{
            		oCurrRCFPU.resubmitRCFPU();
            	}
            }
         }).addStyleClass("submitBtn marginTop10");
	
		var viewDetailsRCEDIFPU = new sap.m.Link("idViewDetailsRCFPUEDIMsgs", {
			text: "View Details",
            width:"90px",
            wrapping:true,
            press: function(){
            	if(sap.ui.getCore().byId("ErrorProcessRCFPU"))
    				sap.ui.getCore().byId("ErrorProcessRCFPU").destroy();
    			
    			//new errorProcessingMOTLView().bindErrorProcessingDataMOTL();
    			
    			var bus = sap.ui.getCore().getEventBus();
    			bus.publish("nav", "to", {
    					id : "ErrorProcessRCFPU"
    			});
    			$('#idHdrContnt').html('Repair Completion - Error Processing');
            }});
		
		var oLabelBlank = new sap.ui.commons.Label({text: " ",
            width: "20px"});
		
		/* Begin of adding by Seyed Ismail on 24.04.2015 MAC24042015*/
		
		var oBtnDelEDIU = new sap.m.Button('idBtnDelEDIRC', {
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
                oCurrRCFPU.proceedToDeleteU,
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
		var oFlexAllMOTL = new sap.m.FlexBox("oFlexAllRCFPU",{
           items: [
                   oRCFPUTable,
                   // oBtnResubmit				MAC24042015 -
                   oFlexEDIButtons			//	MAC24042015 +
           ],
           direction : "Column",
        	   width:"50%"
			});
		
		var oFlexAllMOEDIMsgs = new sap.m.FlexBox("oFlexAllRCFPUEDIMsgs",{
	           items: [
	                   oFlexAllMOTL,
	                   oLabelBlank,
	                   viewDetailsRCEDIFPU
	           ],
	           direction : "Row",
	        	   width:"100%"
				});
		
		if(btnFlagRCFPU == "P")
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
	    
	gotoErrorProcessingRCFPU: function(){
		
		errorProcessingRCFPU = jQuery.grep(aRCFPUALL, function(element, index){
            return element.DtlFlag  == "X" &&  element.Stepid  == seletedStepIdRCFPU;
  		});
		
		if(errorProcessingRCFPU.length > 0){
			
			if(sap.ui.getCore().byId("ErrorProcessRCFPU"))
				sap.ui.getCore().byId("ErrorProcessRCFPU").destroy();
			
			//new errorProcessingMOTLView().bindErrorProcessingDataMOTL();
			
			var bus = sap.ui.getCore().getEventBus();
			bus.publish("nav", "to", {
					id : "ErrorProcessRCFPU"
			});
			$('#idHdrContnt').html('Repair Completion - Error Processing'); //CHANGE HEADER CONTENT
		}
		
	},
	
	validateOnResubmitRCFPU: function(){

		var isValid = true;
		var previousStepIncorrect = true;
		
		var RCFPUResubmitData = sap.ui.getCore().byId("RCFPUResultTable").getModel().getData();
		var len = RCFPUResubmitData.length;
		var checkedForResub = jQuery.grep(RCFPUResubmitData, function(element, index){
            return element.selResubmit  == true;
  		});
		
		if(checkedForResub.length == 0){
			isValid = false;
			var errorString = "Please select atleast 1 process for resubmit and retry.";
	    	sap.ui.commons.MessageBox.alert(errorString);
		}
		/* Begin of adding by Seyed Ismail on 24.04.2015 MAC24042015+ */
		else if(checkedForResub.length > 1){
			isValid = false;
			sap.ui.commons.MessageBox.alert("Please select only 1 process at a time");
		}
		/* End of adding by Seyed Ismail on 24.04.2015 MAC24042015+ */
		/* Begin of commenting by Seyed Ismail on 24.04.2015 MAC24042015- */
		/* else{
			
			for(var i=(len-1);i>=0;i--){
				if(RCFPUResubmitData[i].selResubmit == true){
					if(i != 0){
						if( (RCFPUResubmitData[i-1].MsgStatus != "Successful") && (RCFPUResubmitData[i-1].selResubmit == false) ){
							isValid =false;
							previousStepIncorrect = false;
						}
					}
				}
			}
			if(!previousStepIncorrect){
				
				var errorString = "Please process the transaction in sequence. There is atleast 1 previous step with status as error or not processed. \nProcess this step(s) successfully before re-submitting current step.";
		    	sap.ui.commons.MessageBox.alert(errorString);
			}
		} */
		/* End of commenting by Seyed Ismail on 24.04.2015 MAC24042015- */
		return isValid;
	},
	
	resubmitRCFPU: function(){

		checkedForResubmitRCFPU = [];
		oCurrRCFPU = this;
		
		checkedForResubmitRCFPU = jQuery.grep(aRCFPU, function(element, index){
            return element.selResubmit  == true;
  		});
		
		if(checkedForResubmitRCFPU.length == 1){
			counterRCFPU = 0;
			oCurrRCFPU.oDataRequestRCFPU(checkedForResubmitRCFPU[0].filter);
		}
		/* Begin of adding by Seyed Ismail on 24.04.2015 MAC24042015+ */
		else if(checkedForResubmitRCFPU.length > 1){
			var errorString = sap.ui.commons.MessageBox.alert("Please select only 1 process at a time");
			sap.ui.commons.MessageBox.alert(errorString);
		}
		/* End of adding by Seyed Ismail on 24.04.2015 MAC24042015+ */
		else{
			var errorString = "Please select atleast 1 process for resubmit and retry";
	    	sap.ui.commons.MessageBox.alert(errorString);
		}
	},
	
	oDataRequestRCFPU: function(filter){

		oCurrRCFPU = this;
		var gateDatYYYYMMDD,repairDateYYYYMMDD;
		if(locallySavedRCFPU[0].GateDate != undefined){
			if(locallySavedRCFPU[0].GateDate.trim() != "")
				gateDatYYYYMMDD = locallySavedRCFPU[0].GateDate.substring(0,4) + "-"+ locallySavedRCFPU[0].GateDate.substring(4,6) + "-" + locallySavedRCFPU[0].GateDate.substring(6);
			else
				gateDatYYYYMMDD = "0000-00-00";
		}
		else{
			gateDatYYYYMMDD = "0000-00-00";
		}
		
		if(locallySavedRCFPU[0].RepairDate.trim() != "")
			repairDateYYYYMMDD = locallySavedRCFPU[0].RepairDate.substring(0,4) + "-"+ locallySavedRCFPU[0].RepairDate.substring(4,6) + "-" + locallySavedRCFPU[0].RepairDate.substring(6);
		else
			repairDateYYYYMMDD = "0000-00-00";
		
		/*Rep_Prog_TstHrns_Valid_ECC?$filter=AssetNo eq 'GESU9294425' and Companycode eq '2915' and EquipmentNo eq 'GESU9294425' 
				and EstimateType eq 'ORIGINAL' and FunctLoc eq 'SEA-SG-SIN-1547' and GateDt eq datetime'9999-09-09T00:00:00' 
				and MatType eq 'RW4CK' and PlannerGrp eq 'AP' and ProgressType eq 'M' and RepairDt eq datetime'2014-05-30T00:00:00' 
				and SenderAddr eq 'SGSINEKGA' and SerialNo eq 'GESU9294425' and SubAssetNo eq '0' and Unitpartcode eq 'C' and Workcenter eq '10000801'*/
				
		var filterData = "?$filter=AssetNo eq '"+locallySavedRCFPU[0].Sernr+"' and " +
				         "Companycode eq '"+locallySavedRCFPU[0].Bukrs+"' and " +
				         "EquipmentNo eq '"+locallySavedRCFPU[0].Equnr+"' and " +
				         "EstimateType eq '"+locallySavedRCFPU[0].EstType+"' and " +
				         "FunctLoc eq '"+locallySavedRCFPU[0].FuncLoc+"' and " +
				         "GateDt eq datetime'"+gateDatYYYYMMDD +"T00:00:00' and " +
				         "MatType eq '"+locallySavedRCFPU[0].Matnr+"' and " +
				         "PlannerGrp eq '"+locallySavedRCFPU[0].Plangroup+"' and " +
				         "ProgressType eq 'M' and " +
				         "RepairDt eq datetime'"+repairDateYYYYMMDD+"T00:00:00' and " +
				         "SenderAddr eq '"+locallySavedRCFPU[0].SendrAddrs+"' and " +
				         "SerialNo eq '"+locallySavedRCFPU[0].Sernr+"' and " + 
				         "SubAssetNo eq '"+locallySavedRCFPU[0].SubNumber+"' and " + 
				         "Unitpartcode eq '"+locallySavedRCFPU[0].UnitPartCode+"' and " + 
				         "Tranx eq '"+locallySavedRCFPU[0].TranxId+"' and " +
				         "Workcenter eq '" + locallySavedRCFPU[0].WorkCtr + "'";
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
					 locallySavedRCFPU[0].TranxId = tranx;
				 else
					 locallySavedRCFPU[0].TranxId = "";
                 if(data.results[0].Type == "S")
                	 oCurrRCFPU.oDataSuccessCallbackRCFPU(data, response);
                 else if(data.results[0].Type == "E")
                	 oCurrRCFPU.onDataErrorCallbackRCFPU("Error"); 
	         }else{
	        	 oCurrRCFPU.onDataErrorCallbackRCFPU("Error - No Record"); 
	         }
         },
         function(err){
        	 oCurrRCFPU.onDataErrorCallbackRCFPU(err);
          });
	},
	
	oDataSuccessCallbackRCFPU:function(resultdata, response){
		counterRCFPU ++;
		oCurrRCFPU = this;
		if(counterRCFPU <= checkedForResubmitRCFPU.length - 1){
			oCurrRCFPU.oDataRequestRCFPU(checkedForResubmitRCFPU[counterRCFPU].filter);
		}
		else{
			oCurrRCFPU.bindRCFPU(locallySavedRCFPU[0].TranxId,"resubmit");
			//busyDialog.close();
		}	
		
	},
	
	onDataErrorCallbackRCFPU:function(err){
		oCurrRCFPU = this;
		oCurrRCFPU.bindRCFPU(locallySavedRCFPU[0].TranxId,"resubmit");
		//busyDialog.close();
		//errorfromServer(err);
	},
	
	bindRCFPUEDIMsgs: function(inMsgIdRCFPU){
		busyDialog.open();
		var oCurrRCFPU = this;
		var typeEDI;
		var urlToCallRCEDI;
		//http://seanwgd1.gessap.local:8000/sap/opu/odata/sap/ZNW_SEACO_PORTAL_LOT5_SRV/Rep_Com_Edi?$filter=Depot eq 'MED-IT-PDA-1382' and Estimatetype eq ''
			//and MessageId eq '' and SerialNumber eq 'SCZU5710455' and RepairDate eq datetime'2008-10-07T00:00:00' and UnitPartCode eq 'A'
			
		 btnFlagRCFPU = "E";
		if(inMsgIdRCFPU.trim().length == 0){
			typeEDI = "A";
			var serialNo = sap.ui.getCore().byId("idSerialNoRCFPU").getValue().toUpperCase().trim();
			var estType = sap.ui.getCore().byId("idEstTypeDrpDwnRCFPU").getSelectedKey();
			var UPC = sap.ui.getCore().byId("idUnitPartCodeDRpDwnRCFPU").getSelectedKey();
			var repairDate = sap.ui.getCore().byId("idRepairDateRCFPU").getYyyymmdd();
			//repairDate = repairDate.substring(0,4)+"-"+repairDate.substring(4,6)+"-"+repairDate.substring(6,8);
			if(repairDate.trim().length == 0)
				repairDate = "0000-00-00T00:00:00";
			else
				repairDate = repairDate.substring(0,4)+"-"+repairDate.substring(4,6)+"-"+repairDate.substring(6,8) + "T00:00:00";
			
			
			var functionalLoc = document.getElementById("idDepotRCFPU").value;
			if(functionalLoc.length > 0)
				functionalLoc = functionalLoc.substring(0,15);
			
			urlToCallRCEDI = serviceUrl15_old + "/Rep_Com_Edi?$filter=SerialNumber eq '" 
					        + serialNo + "' and RepairDate eq datetime'"
					        + repairDate + "' and UnitPartCode eq '"
					        + UPC + "' and Estimatetype eq '"
					        + estType + "' and Depot eq '"
					        + functionalLoc + "'";
		}
		else{
			typeEDI = "U";
			urlToCallRCEDI = serviceUrl15_old + "/Rep_Com_Edi?$filter=MessageId eq '" + inMsgIdRCFPU + "'";
		}
		
		oModel = new sap.ui.model.odata.ODataModel(serviceUrl15_old, true);
		OData.request({ 
		      requestUri: urlToCallRCEDI,
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
					 		if(sap.ui.getCore().byId("oFlexAllRCFPU"))
					 			sap.ui.getCore().byId("oFlexAllRCFPU").destroy(); 
					 		
					 		if(sap.ui.getCore().byId("oFlexAllRCFPUEDIMsgs"))
					 			sap.ui.getCore().byId("oFlexAllRCFPUEDIMsgs").destroy();
					 		
					 		locallySavedRCFPU = [];
					 		aRCFPU=[];
					 		aRCFPUALL = [];
					 		aRCFPUALL = data.results;
				 		
				 		for(var i=0; i<data.results.length; i++){
			    			
			    			var filterStepID = jQuery.grep(stepWiseFilterRCFPU, function(element, index){
					            return element.stepId  == data.results[i].Stepid ;
							});
			    			
			    			if(filterStepID.length > 0){
				    			aRCFPU.push({
				    				Message: data.results[i].Message,
				    				MsgStatus: "",
				    				selResubmit: false,
				    				filter: filterStepID[0].filter
				    			});
			    			}
				 		
					 		if(i == 0){ //  Make Local Data - First Time
								var  gateDatLocal;
								if(locallySavedRCFPU.length  == 0){  // If No Local Data - First Time
									
									// RepairDate
						            vRepairDateResult = data.results[0].RepairDate.split("(");
						            vDate = vRepairDateResult[1].split(")");
						            vformattedRepairDate = dateFormat(new Date(Number(vDate[0])), 'yyyy-mm-dd',"UTC");
						            //this is to check if the date is default 999 something show blank
						            if (vformattedRepairDate.substring(0,4) === "9999"){
						            	repairDateLocal = "";
						            }
						            else{
						            	yyyy = vformattedRepairDate.substring(0,4);
						            	mm = vformattedRepairDate.substring(5,7);
						            	dd = vformattedRepairDate.substring(8);
						            	repairDateLocal = yyyy + mm + dd;
						            }
						            
						         // GateDate
						            vGateDateResult = data.results[0].GateDate.split("(");
						            vDate = vGateDateResult[1].split(")");
						            vformattedGateDate = dateFormat(new Date(Number(vDate[0])), 'yyyy-mm-dd',"UTC");
						            //this is to check if the date is default 999 something show blank
						            if (vformattedGateDate.substring(0,4) === "9999"){
						            	gateDateLocal = "";
						            }
						            else{
						            	yyyy = vformattedGateDate.substring(0,4);
						            	mm = vformattedGateDate.substring(5,7);
						            	dd = vformattedGateDate.substring(8);
						            	gateDateLocal = yyyy + mm + dd;
						            }
								    
						            locallySavedRCFPU.push({
						            	  'TranxId' : "",
							    		  'Sernr': data.results[0].SerialNumber.toUpperCase(),
							    		  'RepairDate':repairDateLocal,
							    		  'EstType':data.results[0].Estimatetype,
							    		  'AssetNo': data.results[0].AssetNumber,
							    		  'Equnr': data.results[0].EquipmentNumber,
							    		  'Matnr':data.results[0].MaterialType, //material type
							    		  'SubNumber': data.results[0].SubAssetNumber, //sub asset number
							    		  'SendrAddrs':data.results[0].SenderAddress,
							    		  'GateDate': gateDatLocal,
							    		  'UnitPartCode':data.results[0].UnitPartCode,
							    		  'Bukrs':data.results[0].CompanyCode, //company code
							    		  'FuncLoc':data.results[0].FunctionalLocat, //Functional Location
		  					    		  'Plangroup': data.results[0].PlannerGroup,
							    		  'WorkCtr':data.results[0].WorkCentre
							    		});
						            
						            if(typeEDI == "U"){
						            	sap.ui.getCore().byId("idSerialNoRCFPU").setValue(data.results[0].SerialNumber.toUpperCase());
						            	sap.ui.getCore().byId("idEstTypeDrpDwnRCFPU").setSelectedKey(data.results[0].Estimatetype);
						            	sap.ui.getCore().byId("idUnitPartCodeDRpDwnRCFPU").setSelectedKey(data.results[0].UnitPartCode);
						            	sap.ui.getCore().byId("idRepairDateRCFPU").setYyyymmdd(repairDateLocal);
						            	var depot =  jQuery.grep(depotListRCFPU, function(element, index){
								    		return element.FunctionalLoc.trim().substring(0,15)  == data.results[0].FunctionalLocat;
									   });
						            	if(depot.length > 0)
						            		document.getElementById("idDepotRCFPU").value = depot[0].FunctionalLoc;
						            	sap.ui.getCore().byId("idBckRCFPUStatusU").setVisible(true);
						            }
						            else{
						            	sap.ui.getCore().byId("idBckRCFPUStatusU").setVisible(false);
						            }
								}
					 		}
				 		}
				 	
				 		var oFlexAllRCFPU = oCurrRCFPU.setRepairCompltnFPU();
				 		
				 		// Begin of adding by Seyed Ismail on 24.04.2015 MAC24042015
				 		if(typeEDI == "U"){
				    	sap.ui.getCore().byId("idBtnDelEDIRC").setVisible(true);
				 		}
				 		else{
				 		sap.ui.getCore().byId("idBtnDelEDIRC").setVisible(false);
				 		}
				 		// End of adding by Seyed Ismail on 24.04.2015 MAC24042015
				 		
				 		var oModelRCFPU = new sap.ui.model.json.JSONModel();
				 		oModelRCFPU.setData(aRCFPU);
				    	var oMoveOutToLeaseTable = sap.ui.getCore().byId("RCFPUResultTable");
				    	oMoveOutToLeaseTable.setModel(oModelRCFPU);
				    	oMoveOutToLeaseTable.bindRows("/");
				    	
				    	var oRCFPUResFormElement = sap.ui.getCore().byId("idRCFPUResTblFormElement");
				    	oRCFPUResFormElement.insertField(oFlexAllRCFPU,0);
						
				 		
				 	}else{
				 		var errorString = "Either no records found, or data is more than 9 months old for the specified search criteria. \nPlease refine your search criteria and try again.";
				    	sap.ui.commons.MessageBox.alert(errorString);
				    	
				 		if(sap.ui.getCore().byId("oFlexAllRCFPU"))
				 			sap.ui.getCore().byId("oFlexAllRCFPU").destroy();
				 		
				 		if(sap.ui.getCore().byId("oFlexAllRCFPUEDIMsgs"))
				 			sap.ui.getCore().byId("oFlexAllRCFPUEDIMsgs").destroy();
				 	}
				 	
		    },
		    function(err){
		    	 errorfromServer(err);
		    	//alert("Error while Reading Result : "+ : window.JSON.stringify(err.response));
		    });
	},
	
	resetRepairCompletionFPU: function(){
		var oModel = new sap.ui.model.json.JSONModel();
        oModel.setData({
              dateValue: new Date()
        });
		loggedInUserTypeRCFPU = objLoginUser.getLoggedInUserType();
		if(loggedInUserTypeRCFPU == "SEACO"){
			$("#idDepotRCFPU").val("");
			if(document.getElementById("idDepotRCFPU")){
                document.getElementById("idDepotRCFPU").style.borderColor = "#cccccc";
	    		document.getElementById("idDepotRCFPU").style.background = "#ffffff";
	    		document.getElementById("idDepotRCFPU").placeholder = "Depot";
           }
		}
		sap.ui.getCore().byId("idSerialNoRCFPU").setValue("");
		if(sap.ui.getCore().byId("idSerialNoRCFPU")){
     	  sap.ui.getCore().byId("idSerialNoRCFPU").setValueState(sap.ui.core.ValueState.None);
     	  sap.ui.getCore().byId("idSerialNoRCFPU").setPlaceholder("Serial Number");
        }
		
		sap.ui.getCore().byId("idRepairDateRCFPU").setModel(oModel);
		if(sap.ui.getCore().byId("idRepairDateRCFPU")){
	     	  sap.ui.getCore().byId("idRepairDateRCFPU").setValueState(sap.ui.core.ValueState.None);
	     	  sap.ui.getCore().byId("idRepairDateRCFPU").setPlaceholder("");
	        }
		sap.ui.getCore().byId("idUnitPartCodeDRpDwnRCFPU").setSelectedKey("C");
		
		sap.ui.getCore().byId("idEstTypeDrpDwnRCFPU").setSelectedKey("0");
	   if(sap.ui.getCore().byId("idEstTypeDrpDwnRCFPU")){
     	  sap.ui.getCore().byId("idEstTypeDrpDwnRCFPU").setValueState(sap.ui.core.ValueState.None);
     	  sap.ui.getCore().byId("idEstTypeDrpDwnRCFPU").setPlaceholder("Estimate Type");
        }
		
		if(sap.ui.getCore().byId("oFlexAllRCFPU"))
 			sap.ui.getCore().byId("oFlexAllRCFPU").destroy();
 		
 		if(sap.ui.getCore().byId("oFlexAllRCFPUEDIMsgs"))
 			sap.ui.getCore().byId("oFlexAllRCFPUEDIMsgs").destroy();
 		
 		sap.ui.getCore().byId("idBckRCFPUStatusU").setVisible(false);
	}
});

function fnclearAllValuesAfterSuccessRepairCompltnFPU(){
	sap.ui.getCore().byId("idSerialNoRCFPU").setValue("");
	sap.ui.getCore().byId("idEstTypeDrpDwnRCFPU").setSelectedKey("0");
	sap.ui.getCore().byId("idUnitPartCodeDRpDwnRCFPU").setSelectedKey("1");
	sap.ui.getCore().byId("idRepairDateRCFPU").setYyyymmdd("");
	document.getElementById("idDepotRCFPU").value = "";
}
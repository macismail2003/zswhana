/* APS 256 : DRV Issue After upgrade MAC13022018+*/

var aComboBoxArraysDRV = {
		aCustomerCombo:[]
};
var oModelComboDRV = new sap.ui.model.json.JSONModel();
var thisController;
var vDepotCodeDRV = "";
var vCustNoDRV = "";
var loggedInUserTypeDRV="";
var CustomerDataComboDRV = [];
var aCustomerComboDRV = [];
sap.ui.model.json.JSONModel.extend("depReplValueView", {
	
	createDepReplValue: function(oController){
		$('#idHdrContent').html('Depreciated Replacement Value (DRV)');
        var oCurrent = this;
        thisController = oController;
        
		 var oLabelDepotCode = new sap.ui.commons.Label("idLblDepotCodeDRV",{required:true,
			 text:"Customer ID: ",
     	   layoutData: new sap.ui.layout.GridData({span: "L6 M8 S12"}),
     	   linebreak:true , 
     	   margin: false
        }).addStyleClass("marginTop15");
		 
		 /*var vTxtFDepotCode = new sap.ui.core.HTML("idHtmlCustomerDRV",{layoutData: new sap.ui.layout.GridData({span: "L4 M9 S12"})});
			var htmlContentCustomer = '<input id="idDepotCodeDRV" placeholder="Customer ID" class="FormInputStyle marginTop10" style="width:100%">';
			vTxtFDepotCode.setContent(htmlContentCustomer);*/
		 
		 var vTxtFDepotCode = new sap.ui.commons.ComboBox("idDepotCodeDRV", {
			 layoutData: new sap.ui.layout.GridData({span: "L2 M4 S8"}),
				width:"100%",
				//enabled: seacoUser,
				placeholder:"Select Customer",
				 change: function(evnt){
						if(this.getValue() != '')
						{
							//oCurrent.PopulateLeaseNumbersCustPMR(this.getValue());
						}
			          }
			}).addStyleClass("marginTop10 DepotInput38px");
			
		/* var vTxtFDepotCode = new sap.ui.commons.TextField("idDepotCodeDRV",{
				width : '10em',
				placeholder:"Customer ID",
				liveChange:function(){
					this.setValueState(sap.ui.core.ValueState.None);
				},
				layoutData: new sap.ui.layout.GridData({span: "L5 M3 S12"}),linebreak: false, margin: false
		}).addStyleClass("FormInputStyle marginTop10");*/
		 
		 var LblFlexTemp = new sap.m.FlexBox({ items: [ oLabelDepotCode],  
	          direction: "Column", 
	          layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: false})}).addStyleClass("margin10");
		 
		 
        // Labels
        var oLabelUnitNo = new sap.ui.commons.Label({text: "Unit Number(s): " , wrapping: true, required: true}).addStyleClass("fontTitle");
        // label warning
        var WarningText = "For individual containers, please enter the 4 letter prefix and 7 digit number for each container. (Eg. SEGU3000511). For multiple containers (Max 25), press the Enter key after each one, or copy and paste the list to the entry field.";
        var oLblWarning = new sap.ui.commons.Label({text:WarningText,wrapping: true});
        oLblWarning.addStyleClass("font10");
       // var labReleaseRef3 = new sap.ui.commons.Label({wrapping: true,text: "Use TAB to navigate to the next line, use Shift + TAB to navigate to the previous line"}).addStyleClass("font10");
        var LblFlex = new sap.m.FlexBox({ items: [ oLabelUnitNo, oLblWarning],  
            direction: "Column", 
            layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: false})});
        
        //label legend
        var labStar = new sap.ui.commons.Label({text: "* "}).addStyleClass("MandatoryStar");
        var lblSpaceLegend = new sap.ui.commons.Label( {text: " ",width : '5px'});
  		  var labRequired = new sap.ui.commons.Label({text: " Mandatory Field",wrapping: true});
  		  var oFlexboxReq = new sap.m.FlexBox({
  			 // layoutData: new sap.ui.layout.GridData({span: "L7 M6 S4"}),
               items: [labStar,lblSpaceLegend,labRequired],
               direction: "Row"
  		  }).addStyleClass("marginTop10");
  		  
  		  
    // Reset Message
    var confirmMessage  = "This will reset all the unit numbers input so far. Do you want to continue?";
    
    var txtAreaUnitNo = new sap.ui.commons.TextArea('idTAUnitNoDRV',{
  	  layoutData: new sap.ui.layout.GridData({span: "L4 M9 S12"}),
			rows:25,
			cols:30,
			height:"165px",
			placeholder:"Unit Number(s)",
			change:function(){
 				this.setValueState(sap.ui.core.ValueState.None);
				sap.ui.getCore().byId("idTAUnitNoDRV").setPlaceholder("Unit Number(s)");

 			}
		}).addStyleClass("OutlineNone");
    txtAreaUnitNo.setMaxLength(323);
    
      // Buttons
      var oBtnDepReplSubmit = new sap.m.Button("idBtnDepReplSubmit",{
            text : "Submit",
            styled: false,
            width:"80px",
            layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
            press:function(oEvent){
            	var valid = false;
            	//var valid1 = false;
            	 /*vVendorCode = sap.ui.getCore().byId("idDepotCodeDRV").getValue();
	        	   if(vVendorCode == ""){
	        		   sap.ui.getCore().byId("idDepotCodeDRV").setValueState(sap.ui.core.ValueState.Error);
	        		   sap.ui.getCore().byId("idDepotCodeDRV").setPlaceholder("Required");
	       			   valid = false;
	        	   }
	        	   else{
	        		   valid = true;
	        	   }*/
	        var unitEnqTbl = sap.ui.getCore().byId("idTAUnitNoDRV");
             if(oCurrent.validateDRVUnitNos(unitEnqTbl)){
            	 valid = true;
             }
             else{
            	 valid = false;
             }
             if(valid){
            	 busyDialog.open();
                 thisController.submitDRVClicked();
             }
            }
       }).addStyleClass("submitBtn marginTop10");
       
       var oBtnDepReplReset  = new sap.m.Button("idDepReplReset",{
            text : "Reset",
            styled: false,
            width:"80px",
            layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
            press:function(){
              jQuery.sap.require("sap.ui.commons.MessageBox");
                     sap.ui.commons.MessageBox.show(confirmMessage,
                     sap.ui.commons.MessageBox.Icon.WARNING,
                     "Warning",
                     [sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO], 
                     oCurrent.fnCallbackMessageBox,
                         sap.ui.commons.MessageBox.Action.YES); 
           }
       }).addStyleClass("submitBtn marginTop10"); 
       var lblSpace = new sap.ui.commons.Label( {text: " ",width : '8px'});
      // Flex Box
            
     var oFlexBoxButtons = new sap.m.FlexBox({
              items: [
                oBtnDepReplSubmit,lblSpace,
                oBtnDepReplReset
              ],
              direction: "Row"
     }).addStyleClass("marginTop10");  
    // Responsive Grid Layout
     var oUnitEnqLayout = new sap.ui.layout.form.ResponsiveGridLayout("idDRVUnitEnqLayout");
      
   // Online Form Starts
   var oUnitEnqForm = new sap.ui.layout.form.Form("idDRVUnitEnqForm",{
           layout: oUnitEnqLayout,
           formContainers: [
                   
                   new sap.ui.layout.form.FormContainer("idDRVUnitEnqFormC1",{
                          // title: "Unit Status",
                           formElements: [
										new sap.ui.layout.form.FormElement({
										    fields: [LblFlexTemp,vTxtFDepotCode]
										}),
                                      new sap.ui.layout.form.FormElement({
                                            fields: [LblFlex,txtAreaUnitNo ],
                                            layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                                      }),
                                     new sap.ui.layout.form.FormElement({
                                         fields: [oFlexBoxButtons]
                                     }),
                                     new sap.ui.layout.form.FormElement({
                                         fields: [oFlexboxReq],
                                         layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                                     }),
                                   ]
                   })                    
           ]
   });
     return oUnitEnqForm;
     },
     
     
    fnCallbackMessageBox:function(sResult) {
      if(sResult == "YES"){
           thisController.resetUnitEnquiryClicked();
      }
    },
            
	validateDRVUnitNos:function(tab){
		var isValid = true;
		//var oDepotCodeDRV = sap.ui.getCore().byId("idDepotCodeDRV").getSelectedKey(); //MAC13022018-
		var oDepotCodeDRV = sap.ui.getCore().byId("idDepotCodeDRV").getValue(); // MAC13022018+
		if(oDepotCodeDRV == ""){
			isValid = false;
			$("#idDepotCodeDRV").attr("placeholder","Required");
			document.getElementById("idDepotCodeDRV").style.borderColor = "red";
    		document.getElementById("idDepotCodeDRV").style.background = "#FAD4D4";
		}
		else{
			document.getElementById("idDepotCodeDRV").style.borderColor = "#cccccc";
    		document.getElementById("idDepotCodeDRV").style.background = "#ffffff";
			$("#idDepotCodeDRV").attr("placeholder","Customer ID");
		}
		if(tab.getValue().length  == 0){
			//alert("0")
			isValid = false;
			tab.setValue("");
			tab.setPlaceholder("Required");
			tab.setValueState(sap.ui.core.ValueState.Error);
		}
		else if(tab.getValue().trim().length == 0){
			//alert("blank")
			isValid = false;
			tab.setValue("");
			tab.setPlaceholder("Required");
			tab.setValueState(sap.ui.core.ValueState.Error);
		}
		else{
			tab.setPlaceholder("Unit Number(s)");
			tab.setValueState(sap.ui.core.ValueState.None);
		}
	/*	else{ // If user has entered at lest one Unit Number and its length is not 11
			var enteredUnitNumbers = tab.getValue().split(/\n/g);
			var aLen = enteredUnitNumbers.length;
			for (var j=0 ; j<aLen ;j++ ){
				if(enteredUnitNumbers[j].length!=11){
					alert("error")
					//enteredUnitNumbers[j].addStyleClass("fontRed");
	   				tab.setValueState(sap.ui.core.ValueState.Error);
	   				isValid = false;
	   				break;
				}
    	}
		}*/
		return isValid;
         },

            
    resetUnitEnquiry:function(){
    	sap.ui.getCore().byId("idTAUnitNoDRV").setValue("");
		sap.ui.getCore().byId("idTAUnitNoDRV").setValueState(sap.ui.core.ValueState.None);
		sap.ui.getCore().byId("idTAUnitNoDRV").setPlaceholder("Unit Number(s)");
		
		//security
		var objUser = new loggedInU();
		loggedInUserTypeDRV = objUser.getLoggedInUserType();
		//if(loggedInUserTypeDRV != "CUSTOMER"){
		sap.ui.getCore().byId("idDepotCodeDRV").setSelectedKey("");
		//}
    }, //resetUnitEnquiry
            
     bindUnitEnquiryDRV:function(){
    	 var objUser = new loggedInU();
    	 //security
    	 vDepotCodeDRV = objUser.getLoggedInUserID(); // "100031"; //getter
    	 vCustNoDRV = ""; //getter
    	 
       	     // Unit No 'LOST' Message
       	      var confirmLostMessage = "Unit not found";
       	      // Unit No 'SOLD' Message
       	      var confirmNotOnLeaseMessage = "Unit Not on lease";
       	    /* var unitNosDRVAfterValid = jQuery.grep(DRVUnitNumbers.unitNosDrv, function(element, index){
       	          return element.unitNo != "";
       	     });*/
       	   var enteredUnitNumbersDRV = [];
       	var newUnDRV = sap.ui.getCore().byId("idTAUnitNoDRV").getValue().split(/\n/g);
       	var unitNumbrsEnteredNew = newUnDRV.length;
       	for(var k=0 ; k<unitNumbrsEnteredNew ; k++){
    		
    		if(newUnDRV[k].trim().length == 0){
    			//alert("blnk");
    			//enteredUnitNumbersUE.pop();
    			//unitNumbrsEntered = unitNumbrsEntered -1;
    		}
    		else{
    			enteredUnitNumbersDRV.push(newUnDRV[k].trim().toUpperCase());
    		}
    	}
       	
       //	var oUtil = new utility();
       	enteredUnitNumbersDRV = objUtil.unique(enteredUnitNumbersDRV);
    	
    	
       		var unitNosEnteredLen = enteredUnitNumbersDRV.length;
       	     var unitNosToPassDRV1 = "";
       	     var unitNosToPassDRV2 = "";
       	  if(unitNosEnteredLen>13){
	    		//var len = 25 - unitNumbrsEntered;
	    		for(var i=0;i<13;i++){
	    			if(enteredUnitNumbersDRV[i].trim().length > 0)
	    				unitNosToPassDRV1 = unitNosToPassDRV1 + enteredUnitNumbersDRV[i].trim()+",";
	        	}
	    		
	    		for(var j=13;j<unitNosEnteredLen;j++){
	    			if(enteredUnitNumbersDRV[j].trim().length > 0)
	    				unitNosToPassDRV2 = unitNosToPassDRV2 + enteredUnitNumbersDRV[j].trim()+",";
	    		}
	    	}else{
	    		for(var k=0;k<unitNosEnteredLen;k++){
	    			if(enteredUnitNumbersDRV[k].trim().length > 0)
	    				unitNosToPassDRV1 = unitNosToPassDRV1 + enteredUnitNumbersDRV[k].trim()+",";
	        	}
	    	}
       	//security
  		var objUser = new loggedInU();
  		loggedInUserTypeDRV = objUser.getLoggedInUserType();
  			var selectedCust = sap.ui.getCore().byId("idDepotCodeDRV").getValue();
  			var temp = jQuery.grep( CustomerDataComboDRV, function(element, index){
     		   return element.CustName == selectedCust;
     	   });
  			vDepotCodeDRV = temp[0].Partner.replace(/^0+/, '');
       	  oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
       	     var urlToCall = serviceUrl + "/Drv?$filter=IUnitNo eq '"+unitNosToPassDRV1+"' and IUnitNo1 eq '" + unitNosToPassDRV2 + "' and IDepotCode eq '" + vDepotCodeDRV + "' and ICustNo eq '" + vCustNoDRV + "'" ;
       	    // alert("url drv " + urlToCall);
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
       	    	 aDRVDetails = [];
       	    	 aUnitsNotFoundDRV = [];
       	    	 aUnitsNotOnLeaseDRV = [];
       	    	jsonDRVUnitDetails = [];
       	    	//var oUtil = new utility();
       	    	// alert("not on lease " + aUnitsNotOnLeaseDRV.length + "adrv " + aDRVDetails.length + " nt found " + aUnitsNotFoundDRV.length);
               dataLen = data.results.length;
               for(var i=0 ; i<dataLen ; i++ ){
            	   data.results[i].Rate = numberWithCommas(data.results[i].Rate).trim();
            	   data.results[i].Lease = objUtil.removeLeadZero(data.results[i].Lease);
            	   aDRVDetails[i] = data.results[i];
               }
              
               if(dataLen == 1){
                      //alert("data length = 1");
                      //aUnitEnq[0].Message = "LOST";
                      if(   aDRVDetails[0].DepotComments == "Units_Not_Found"){
                             jQuery.sap.require("sap.ui.commons.MessageBox");
                             sap.ui.commons.MessageBox.show(confirmLostMessage,
                             sap.ui.commons.MessageBox.Icon.WARNING,
                             "Warning",
                             [sap.ui.commons.MessageBox.Action.OK], 
                                 sap.ui.commons.MessageBox.Action.OK);
                            // alert("NF -> not on lease " + aUnitsNotOnLeaseDRV.length + "adrv " + aDRVDetails.length + " nt found " + aUnitsNotFoundDRV.length);
                      }else if(   aDRVDetails[0].DepotComments.substring(0,12) == "Not_On_Lease"){
                             jQuery.sap.require("sap.ui.commons.MessageBox");
                             sap.ui.commons.MessageBox.show(confirmNotOnLeaseMessage,
                             sap.ui.commons.MessageBox.Icon.WARNING,
                             "Warning",
                             [sap.ui.commons.MessageBox.Action.OK], 
                                 sap.ui.commons.MessageBox.Action.OK);
                            // alert("NL -> not on lease " + aUnitsNotOnLeaseDRV.length + "adrv " + aDRVDetails.length + " nt found " + aUnitsNotFoundDRV.length);
                      }
                      else if(   aDRVDetails[0].DepotComments == "Unit_In_Lost"){
                          jQuery.sap.require("sap.ui.commons.MessageBox");
                          sap.ui.commons.MessageBox.show("Unit in Lost",
                          sap.ui.commons.MessageBox.Icon.WARNING,
                          "Warning",
                          [sap.ui.commons.MessageBox.Action.OK], 
                              sap.ui.commons.MessageBox.Action.OK);
                         // alert("NL -> not on lease " + aUnitsNotOnLeaseDRV.length + "adrv " + aDRVDetails.length + " nt found " + aUnitsNotFoundDRV.length);
                      }
                      else if(   aDRVDetails[0].DepotComments == "Unit_Is_Sold"){
                          jQuery.sap.require("sap.ui.commons.MessageBox");
                          sap.ui.commons.MessageBox.show("Unit is Sold",
                          sap.ui.commons.MessageBox.Icon.WARNING,
                          "Warning",
                          [sap.ui.commons.MessageBox.Action.OK], 
                              sap.ui.commons.MessageBox.Action.OK);
                         // alert("NL -> not on lease " + aUnitsNotOnLeaseDRV.length + "adrv " + aDRVDetails.length + " nt found " + aUnitsNotFoundDRV.length);
                      }
                      else if( aDRVDetails[0].RaStatus == "E"){
                    	  sap.ui.commons.MessageBox.show(aDRVDetails[0].DepotComments,
                                  sap.ui.commons.MessageBox.Icon.WARNING,
                                  "Warning",
                                  [sap.ui.commons.MessageBox.Action.OK], 
                                      sap.ui.commons.MessageBox.Action.OK);
                      }
                      else{
                    	  // alert("else -> not on lease " + aUnitsNotOnLeaseDRV.length + "adrv " + aDRVDetails.length + " nt found " + aUnitsNotFoundDRV.length);
                          var bus = sap.ui.getCore().getEventBus();
                          bus.publish("nav", "to", {
                          id : "DRVResultView"
                          });
                          var obj = new depInvRepairView();
                          obj.createDepInvRepairFormView();
                          obj.bindRepairStatus();
                      }
               }else if(dataLen > 1){
            	   var len = data.results.length;
            	   aDRVDetails = jQuery.grep( data.results, function(element, index){
            		   return element.DepotComments != "Units_Not_Found" && element.DepotComments.substring(0,12) != "Not_On_Lease" && element.DepotComments != "Unit_In_Lost" && element.DepotComments != "Unit_Is_Sold";
            	   });
            	   aNotValidUnitNosDRV= [];
            	   aUnitsNotFoundDRV = jQuery.grep( data.results, function(element, index){
            		   return element.DepotComments == "Units_Not_Found" || element.DepotComments == "Unit_In_Lost" || element.DepotComments == "Unit_Is_Sold";  
            		});
            	 //  alert("NF -> not on lease " + aUnitsNotOnLeaseDRV.length + "adrv " + aDRVDetails.length + " nt found " + aUnitsNotFoundDRV.length);
            	   aUnitsNotOnLeaseDRV = jQuery.grep( data.results, function(element, index){
   		   	          return element.DepotComments.substring(0,12) == "Not_On_Lease";  
           			});
            	  // alert("NL -> not on lease " + aUnitsNotOnLeaseDRV.length + "adrv " + aDRVDetails.length + " nt found " + aUnitsNotFoundDRV.length);
            	   if(aUnitsNotOnLeaseDRV.length  >0){
            		   vCustomerDRV = aUnitsNotOnLeaseDRV[0].DepotComments.split("@")[1];
            	   }
            	    
            	   //alert("customer " + vCustomerDRV);
                      var bus = sap.ui.getCore().getEventBus();
                             bus.publish("nav", "to", {
                        id : "DRVResultView"
                      });
                     var obj = new depInvRepairView();
                     obj.createDepInvRepairFormView();
                     obj.bindRepairStatus();
               }
               else{
            	   busyDialog.close();
            	   var noDataMessage = "No Data Found. Please try again.";
            	   sap.ui.commons.MessageBox.show(noDataMessage,
                           sap.ui.commons.MessageBox.Icon.WARNING,
                           "Warning",
                           [sap.ui.commons.MessageBox.Action.OK], 
                               sap.ui.commons.MessageBox.Action.OK);
               }
               // make Custom JSON for Table - Excel/Print
          		for(var i = 0 ; i < aDRVDetails.length ; i++){
          				jsonDRVUnitDetails.push({
          		            'Unit Number':aDRVDetails[i].Sernr,
          		            'Unit Type':aDRVDetails[i].UnitType,
          		            'Lease':aDRVDetails[i].Lease,
          		            'DRV Rate':aDRVDetails[i].Rate.trim(),
          		            'Currency':aDRVDetails[i].Currency,
          		            'Status':aDRVDetails[i].DepotComments,
          		        });
          		}
               busyDialog.close();
            },
            function(err){
         	   busyDialog.close();
         	  var errorCode = err.response.body.search("RFC call");
         	 if(errorCode >= 0){
        		  sap.ui.commons.MessageBox.show("At least one entry could not be found in object buffer",
           	            sap.ui.commons.MessageBox.Icon.INFORMATION,
           	            "Information",
           	            [sap.ui.commons.MessageBox.Action.OK], 
           	            sap.ui.commons.MessageBox.Action.OK);
        	   }else{
        		  errorfromServer(err);
        	   }
         	  /* var errorCode = ((err.response.body.split("value")[1]));
         	   if(errorCode != ""){
	         	   var error  = (errorCode.substring(3)).split("exception")[0].search("RFC call");
	         	  //alert("error message " + errorCode);
	         	   if(error >= 0){
	         		  sap.ui.commons.MessageBox.show("At least one entry could not be found in object buffer",
	            	            sap.ui.commons.MessageBox.Icon.INFORMATION,
	            	            "Information",
	            	            [sap.ui.commons.MessageBox.Action.OK], 
	            	            sap.ui.commons.MessageBox.Action.OK);
	         	   }else{
	         		  errorfromServer(err);
	         	   }
         	   }*/
         	   
         	 
            });
       	     },
       	     
       	  getMultipleCustomersDRV: function(){
       		 busyDialog.open();
       		var vUserName = objLoginUser.getLoggedInUserName().toUpperCase();
       		oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
       		var urlToCall = serviceUrl + "/F4_Multiple_Cust?$filter=Bname eq '" + vUserName + "' and Customer eq '' and Param1 eq ''";
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
     	    	busyDialog.close();
     	    	var dataLen = data.results.length;
		    	CustomerDataComboDRV = data.results;
		    	for ( var i = 0; i < dataLen ; i++) {
		    		if(data.results[i].CustName.trim() != ""){
		    			aCustomerComboDRV[i] = data.results[i].CustName;
		    		}
				}
		    	
		    	$( "#idDepotCodeDRV" ).autocomplete({
		    	      source: aCustomerComboDRV,
		    	      minLength: 0,
		    	})
		    	.focus(function(){            
		    		 if ($("ul.ui-autocomplete").is(":hidden")) {
		    		        $(this).autocomplete('search', '');
		    		    }
		    	})
		    	.keyup(function() {
		    	    var isValid = false;
		    	    var previousValueCustomer ="";
		    	    for (i in aCustomerComboDRV) {
		    	        if (aCustomerComboDRV[i].toLowerCase().match(this.value.toLowerCase())) {
		    	            isValid = true;
		    	        }
		    	    }
		    	    if (!isValid) {
		    	        this.value = previousValueCustomer
		    	    } else {
		    	    	previousValueCustomer = this.value;
		    	    }
		    	})
		    	.bind( "focusout", function( event ) {
			      })
		    	.bind( "focusin", function( event ) {
		    		document.getElementById("idDepotCodeDRV").style.borderColor = "#cccccc";
		    		document.getElementById("idDepotCodeDRV").style.background = "#ffffff";
					$("#idDepotCodeDRV").attr("placeholder","Customer ID");
			      });
		    	
		    	var dataLen = data.results.length;
		    	for ( var i = 0; i < dataLen ; i++) {
		    		aComboBoxArraysDRV.aCustomerCombo[i] = data.results[i];
				}
		    	oModelComboDRV.setData(aComboBoxArraysDRV);
		    	
				var vComboCustomer = sap.ui.getCore().byId("idDepotCodeDRV");
				vComboCustomer.setModel(oModelComboDRV);
				vComboCustomer.bindItems("/aCustomerCombo",new sap.ui.core.ListItem({text: "{CustName}"}));
     	     },
     	    function(err){
          	   busyDialog.close();
     	    });
       	  },
     
 
       	  PopulateCustomersDRV: function(){
       		  busyDialog.open();
         		oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
         		var urlToCall = serviceUrl + "/F4_Customer_NameId_Appended";
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
       	    	 busyDialog.close();
       	    	var dataLen = data.results.length;
       	    	var oDepotCodeDRV = sap.ui.getCore().byId('idDepotCodeDRV');
       	    	CustomerDataComboDRV = data.results;
		    	for ( var i = 0; i < dataLen ; i++) {
		    		if(data.results[i].CustName != ""){
		    			aCustomerComboDRV[i] = data.results[i].CustName;
		    			oDepotCodeDRV.addItem(new sap.ui.core.ListItem({text:data.results[i].CustName, 
							key: data.results[i].Partner, additionalText: data.results[i].Partner}));
		    		}
				}
  		    	
       	     },
       	    function(err){
            	   busyDialog.close();
       	    });
         	  }

});
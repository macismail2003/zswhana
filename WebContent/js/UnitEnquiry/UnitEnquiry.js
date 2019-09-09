/*
 * MAC01122016 - Include SOLD units in Seaweb Unit Enquiry
 * Check for status DISPOSED and treat them as SOLD
 * */
/*$*$------------------------------------------------------------------------*
*$*$ Modified By : Seyed Ismail MAC
*$*$ Modified On : 19.12.2017
*$*$ Reference   : APS 167
*$*$ Transport   :
*$*$ Tag         : MAC19122017
*$*$ Purpose     : Seaweb enhancements for MSC
*				   1. Add Contract, Booking and Off Hire reference MAC19122017_1
*$*$------------------------------------------------------------------*
*/
	var unitNosEntered8 = [];
	var unitController;
	var aUnitStatusSingleContDetails = [];
	var aUnitStatusMultiple = [];
	var aUnitspecification = [];
	var aUnitspecificationTbl = [];
	var notValidUnitNos = [];
	var aDocumentList = [];
	var aSalePicturesList = [];
	var oUnitEnquiryObj;
	var singleStatus = false;
	var multipleStatus = false;
	var DocStatus = false;
	var pictureStatus = false;
	var specStatus = false;
	var noResult =false;
	var saleSalp;
	var showSalePic = false;
	//var inputParameterForDocumentDownload = [];

	var loggedInUserRoleUE = "";

sap.ui.model.json.JSONModel.extend("unitEnquiryView", {

   createUnitEnquiry: function(oController){
	   $('#idHdrContent').html('Unit Enquiry');	//CHANGE HEADER CONTENT
	   var oUnitEnquiryObj = this;
	   unitController = oController;
      // Labels
      var oLabelUnitNo = new sap.ui.commons.Label({text: "Unit Number(s): " , wrapping: true, required: true}).addStyleClass("fontTitle");
      // label warning
      var WarningText = "For individual containers, please enter the 4 letter prefix and 7 digit number for each container. (Eg. SEGU3000511). For multiple containers (Max 25), press the Enter key after each entry or copy and paste the list to the entry field";
      var oLblWarning = new sap.ui.commons.Label({text:WarningText,wrapping: true});
      oLblWarning.addStyleClass("font10");
     // var labReleaseRef3 = new sap.ui.commons.Label({wrapping: true,text: "Use TAB to navigate to the next line, use Shift + TAB to navigate to the previous line"}).addStyleClass("font10");

      //label legend
      var labStar = new sap.ui.commons.Label({text: "* "}).addStyleClass("MandatoryStar");
      var lblSpaceLegend = new sap.ui.commons.Label( {text: " ",width : '5px'});
		  var labRequired = new sap.ui.commons.Label({text: " Mandatory Field",wrapping: true});
		  var oFlexboxReq = new sap.m.FlexBox({
			 // layoutData: new sap.ui.layout.GridData({span: "L7 M6 S4"}),
             items: [labStar,lblSpaceLegend,labRequired],
             direction: "Row"
		  });

      var LblFlex = new sap.m.FlexBox({ items: [ oLabelUnitNo, oLblWarning ],
          direction: "Column",
          layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: false})});



      // Reset Message
      var confirmMessage  = "This will reset all the unit numbers input so far. Do you want to continue?";

      // Buttons
      var oBtnUnitEnqSubmit = new sap.m.Button("idBtnUnitEnqSubmit",{
            text : "Submit",
            styled: false,
            width:"80px",
            layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
            press:function(oEvent){
            	var unitEnqTbl = sap.ui.getCore().byId("idTAUnitNo");
            	if(oUnitEnquiryObj.validateUnitNos(unitEnqTbl)){
            		busyDialog.open();
            		unitController.submitUnitEnquiryClicked();
            	}
            }
       }).addStyleClass("submitBtn");

       var oBtnUnitEnqReset = new sap.m.Button("idBtnUnitEnqReset",{
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
	        	oUnitEnquiryObj.fnCallbackMessageBox,
   			    sap.ui.commons.MessageBox.Action.YES);
           }
       }).addStyleClass("submitBtn");
       var lblSpace = new sap.ui.commons.Label( {text: " ",width : '8px'});

       var oFlexboxButtons = new sap.m.FlexBox({
 	      items: [
 	        oBtnUnitEnqSubmit,lblSpace,
 	       oBtnUnitEnqReset
 	      ],
 	      direction: "Row",
 	    }).addStyleClass("margin10");

       var txtAreaUnitNo = new sap.ui.commons.TextArea('idTAUnitNo',{
     	  layoutData: new sap.ui.layout.GridData({span: "L4 M5 S12"}),
 			rows:25,
 			cols:30,
 			height:"145px",
 			placeholder:"Unit Number(s)",
 			change:function(){
 				this.setValueState(sap.ui.core.ValueState.None);
				sap.ui.getCore().byId("idTAUnitNo").setPlaceholder("Unit Number(s)");
 			}
 		}).addStyleClass("OutlineNone");
       txtAreaUnitNo.setMaxLength(323);

      // Responsive Grid Layout
       var oUnitEnqLayout = new sap.ui.layout.form.ResponsiveGridLayout("idUnitEnqGridLayout");

     // Online Form Starts
     var oUnitEnqForm = new sap.ui.layout.form.Form("idUnitEnquiryForm",{
             layout: oUnitEnqLayout,
             formContainers: [
                     new sap.ui.layout.form.FormContainer("idUnitEnquiryFormC1",{
                            // title: "Unit Status",
                             formElements: [
                                            new sap.ui.layout.form.FormElement({
	                                            fields: [LblFlex,txtAreaUnitNo ],
	                                            layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                                            }),
                                            new sap.ui.layout.form.FormElement({
                                                fields: [oFlexboxButtons],
                                                layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                                            }),
                                            new sap.ui.layout.form.FormElement({
                                                fields: [oFlexboxReq],
                                                layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                                            }),

                                     /*  new sap.ui.layout.form.FormElement({
                                           fields: [oFlexBoxAll]
                                       })  */
                                     ]
                     })
             ]
     });
       return oUnitEnqForm;
       },


   fnCallbackMessageBox:function(sResult) {
    	   //alert("Reset");
	   		if(sResult == "YES"){
	   			unitController.resetUnitEnquiryClicked();
	   		}
   		},

   validateUnitNos:function(tab){
	   var isValid = true;
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
			return isValid;
   		},

   	resetUnitEnquiry:function(){
   		sap.ui.getCore().byId("idTAUnitNo").setValue("");
		sap.ui.getCore().byId("idTAUnitNo").setValueState(sap.ui.core.ValueState.None);
		sap.ui.getCore().byId("idTAUnitNo").setPlaceholder("Unit Number(s)");
   		},

   bindUnitEnquiry:function(){
    	oUnitEnquiryObj = this;
    	//clear all values
    	aUnitStatusSingleContDetails = [];
    	aUnitStatusMultiple = [];
    	aUnitspecification = [];
    	var newUnUR = sap.ui.getCore().byId("idTAUnitNo").getValue().split(/\n/g);
    	var unitNosPass1 = "";
    	var unitNosPass2 = "";
    	var unitNumbrsEnteredNew = newUnUR.length;
    	var enteredUnitNumbersUE = [];
    	//alert("LEN " + unitNumbrsEnteredNew)
    	for(var k=0 ; k<unitNumbrsEnteredNew ; k++){

    		if(newUnUR[k].trim().length == 0){
    			//alert("blnk");
    			//enteredUnitNumbersUE.pop();
    			//unitNumbrsEntered = unitNumbrsEntered -1;
    		}
    		else{
    			enteredUnitNumbersUE.push(newUnUR[k].trim().toUpperCase());
    		}
    	}
    	var oUtil = new utility();
    	enteredUnitNumbersUE = oUtil.unique(enteredUnitNumbersUE);


    	unitNumbrsEntered = enteredUnitNumbersUE.length;
    	//alert("after " + unitNumbrsEntered)
    	if(unitNumbrsEntered == 1){ //single unit number entered
    		//alert("user entered 1 unit numbr");
    		oUnitEnquiryObj.bindSingleUnitStatus(enteredUnitNumbersUE[0],1);
    	}
    	else{ //multiple unit numbers entered
    		//alert("user entered multiple unit numbr");
	    	if(unitNumbrsEntered>13){
	    		//var len = 25 - unitNumbrsEntered;
	    		for(var i=0;i<13;i++){
	    			if(enteredUnitNumbersUE[i].trim().length > 0)
	        		unitNosPass1 = unitNosPass1 + enteredUnitNumbersUE[i].trim().toUpperCase()+",";
	        	}

	    		for(var j=13;j<unitNumbrsEntered;j++){
	    			if(enteredUnitNumbersUE[j].trim().length > 0)
	    			unitNosPass2 = unitNosPass2 + enteredUnitNumbersUE[j].trim().toUpperCase()+",";
	    		}
	    	}else{
	    		for(var k=0;k<unitNumbrsEntered;k++){
	    			if(enteredUnitNumbersUE[k].trim().length > 0)
	        		unitNosPass1 = unitNosPass1 + enteredUnitNumbersUE[k].trim().toUpperCase()+",";
	        	}
	    	}
	    	oUnitEnquiryObj.bindUnitStatusMultiple(unitNosPass1, unitNosPass2);
    	}
    	//busyDialog.close();
       }, //bind main

       bindSingleUnitStatus: function(SelUnitNumber,count){
    	   singleStatus = false;
    	   multipleStatus = false;
    	   DocStatus = false;
    	    pictureStatus = false;
    	   specStatus = false;
    	   busyDialog.open();
    	   oUnitEnquiryObj = this;
    	 //  alert("single selected unit number " + SelUnitNumber + "count " + count)
    	   aUnitStatusSingleContDetails = [];
    	// Unit No 'LOST' Message
           var confirmLostMessage = "Unit not found";
           // Unit No 'SOLD' Message
           var confirmSoldMessage = "Unit has been Sold Out";
    	 //call single unit status url and navigate to container details view
           selUnitNumber = SelUnitNumber;

           // MAC19122017_1+
           var unitEnquiryUserID = "";
           var unitEnquiryUserType = objLoginUser.getLoggedInUserType();
		   if(unitEnquiryUserType != 'SEACO'){
				unitEnquiryUserID = objLoginUser.getLoggedInUserName();
		   }
		   // MAC19122017_1+

    	   var urlToCall = serviceUrl + "/Units_Status_Single?$filter=Equnr eq '" + SelUnitNumber +
    	   									"' and Userid eq '" + unitEnquiryUserID +	// MAC19122017_1+
    	   									"' and Usertype eq '" + unitEnquiryUserType +	// MAC19122017_1+
    	   									"'";

  		   oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
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
    		    	singleStatus = true;
    		    	//oUnitEnquiryObj.CheckStatusUE();
    		    //	alert("single unit status len " + data.results.length);
    		    	aUnitStatusSingleContDetails = data.results;

							// MAC22012019+
							globalIsTanks = (aUnitStatusSingleContDetails[0].UnitType.substr(0,1) == "T")?true:false;
							globalIsTanks = false;
							// MAC22012019+

    		    	if(data.results.length > 0){
    		    		var aNewVal = aUnitStatusSingleContDetails[0].Message.trim().split("$");
	    		    	if(aNewVal[3] == ""){
	    		    		if(count == 3){
	        		    		var bus = sap.ui.getCore().getEventBus();
	        					bus.publish("nav", "to", {
	        		        	  id : "ContainerDetails"
	        					});
	        		    		var oContainerDetails = new containerDetailsView();
	        					oContainerDetails.bindContainerDetails();
	        					busyDialog.close();
	        					$('#idHdrContent').html('Depreciated Replacement Value (DRV)');
	        					sap.ui.getCore().byId("idUnitSpecPanelUnitEnq").setVisible(false);
	        		    		sap.ui.getCore().byId("idUnitDocPanelUnitEnq").setVisible(false);
	        		    		sap.ui.getCore().byId("idSalePicPanelUnitEnq").setVisible(false);
	        		    	}else{
	        		    		// Begin of adding by Seyed Ismail on 26.09.2014 MAC26092014 " View Sale Pic Hiding based on Status...
	        		    		if(aNewVal[2] == "X"){
	        		    			saleSalp = "X";
	        		    		}
	        		    		else{
	        		    			saleSalp = "Y";
	        		    		}
	        		    		oUnitEnquiryObj.getUnitSpecification(SelUnitNumber, "");
	        		    	}
	    		    		//oUnitEnquiry.getUnitSpecification(SelUnitNumber, "");
	    	    		}else if(aNewVal[3].toLowerCase() == "unit not found"){
	    	    			jQuery.sap.require("sap.ui.commons.MessageBox");
	    		        	sap.ui.commons.MessageBox.show(confirmLostMessage,
	    		        	sap.ui.commons.MessageBox.Icon.WARNING,
	    		        	"Warning",
	    		        	[sap.ui.commons.MessageBox.Action.OK],
	    	   			    sap.ui.commons.MessageBox.Action.OK);
	    		        	busyDialog.close();
	    	    		}else if(aNewVal[3].toLowerCase() == "unit sold out"){
	    	    			jQuery.sap.require("sap.ui.commons.MessageBox");
	    		        	sap.ui.commons.MessageBox.show(confirmSoldMessage,
	    		        	sap.ui.commons.MessageBox.Icon.WARNING,
	    		        	"Warning",
	    		        	[sap.ui.commons.MessageBox.Action.OK],
	    	   			    sap.ui.commons.MessageBox.Action.OK);
	    		        	busyDialog.close();
	    	    		}
	    	    		else{
	    	    			busyDialog.close();
	    	    			  sap.ui.commons.MessageBox.show("Your request could not be processed at this time.\n Please try again later.",
	                            sap.ui.commons.MessageBox.Icon.INFORMATION,
	                            "Information",
	                            [sap.ui.commons.MessageBox.Action.OK],
	                            sap.ui.commons.MessageBox.Action.OK);
	    	    		}
    		    	}
    		    	else{
    		    		noResult = true;
    		    		//oUnitEnquiryObj.CheckStatusUE();
    		    		jQuery.sap.require("sap.ui.commons.MessageBox");
    		        	sap.ui.commons.MessageBox.show("No Result Found. Please try again.",
    		        	sap.ui.commons.MessageBox.Icon.WARNING,
    		        	"Warning",
    		        	[sap.ui.commons.MessageBox.Action.OK],
    	   			    sap.ui.commons.MessageBox.Action.OK);
    		        	busyDialog.close();
    		    	}
    		    	//busyDialog.close();
    		    },
    		   function(err){
    		    	singleStatus = true;
    		    	//oUnitEnquiryObj.CheckStatusUE();
    		    	busyDialog.close();
    		    	errorfromServer(err);
    		    	//alert("Error while reading single Unit status : "+ window.JSON.stringify(err.response));
    		    });
       }, //bindSingleUnitStatus

       bindUnitStatusMultiple: function(unitNosPass1, unitNosPass2){
    	   singleStatus = false;
    	   multipleStatus = false;
    	   DocStatus = false;
    	    pictureStatus = false;
    	   specStatus = false;
    	   busyDialog.open();
    	   oUnitEnquiryObj = this;
    	  // alert("multiple unit numbr selected .. binding");
    	   var oUnitEnquiry = this;
    	   var urlToCall = serviceUrl + "/Unit_Status_Multiple?$filter=Equnr eq '" + unitNosPass1 + "' and Equnr1 eq '" + unitNosPass2 + "'";
    	  // alert("unit status url " + urlToCall);
  		   oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
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
    		    	multipleStatus = true;
      		    //	oUnitEnquiryObj.CheckStatusUE();
    		    	//alert("multiple unit status len " + data.results.length);
    		    	aUnitStatusMultiple = data.results;
    		    	aUnitEnq = jQuery.grep( data.results, function(element, index){
    		   	           return element.Message == "";
    		   	    });
    		    	for(var i=0 ; i<aUnitEnq.length; i++ ){
	    		    	var vHireDate = aUnitEnq[i].HireDate.split("(");
	    				var vDate = vHireDate[1].split(")");
	    				var vHireDateActual = new Date(Number(vDate[0]));
	    				var vformattedHireDate = dateFormat(new Date(Number(vDate[0])), 'dd-mm-yyyy',"UTC");
	    				if (vformattedHireDate.substring(6) === "9999"){
	    					aUnitEnq[i].HireDate =  "-";
	    					aUnitEnq[i]["HireDateActual"] =  vHireDateActual;
	    				}
	    				else{
	    					aUnitEnq[i].HireDate = vformattedHireDate;
	    					aUnitEnq[i]["HireDateActual"] =  vHireDateActual;
	    				}
    		    	}
    		    	notValidUnitNos= [];
    			   	aUnitsEnqNotFound = jQuery.grep( data.results, function(element, index){
    		   	          return element.Message.toLowerCase() == "unit not found" || element.Message.toUpperCase() == "SERNR_DOES_NOT_EXIST";
    		   	    });
    			   	for(var i=0;i<aUnitsEnqNotFound.length;i++){
    			   		notValidUnitNos[i] =  aUnitsEnqNotFound[i].UnitNumber;
    			   	}
    			   	var lengthNoValid = notValidUnitNos.length;
    			    aUnitsSoldOut = jQuery.grep( data.results, function(element, index){
    		   	           return element.Message.toLowerCase() == "unit sold out";
    		   	   	});
    			    for(var i=0;i<aUnitsSoldOut.length ;i++){
    			   		notValidUnitNos[i+lengthNoValid] =  aUnitsSoldOut[i].UnitNumber;
    			   	}
    			   // alert("not valid unit no : "+notValidUnitNos[0]+notValidUnitNos[1]+notValidUnitNos.length);
    			    oUnitEnquiryObj.getUnitSpecification(unitNosPass1, unitNosPass2);
    		    },
    		   function(err){
    		    	multipleStatus = true;
      		    	//oUnitEnquiryObj.CheckStatusUE();
    		    	busyDialog.close();
    		    	errorfromServer(err);
    		    	//alert("Error while reading multiple Unit status : "+ window.JSON.stringify(err.response));
    		    });
       }, //bindUnitStatusMultiple

       getUnitSpecification: function(unitNosPass1, unitNosPass2){
    	   oUnitEnquiryObj = this;
    	   aUnitspecification = [];
    	   //aUnitspecificationTbl = [];
    	   //to grep from this array the value for which it is clicked
    	   var urlToCall = serviceUrl + "/Equipment_Status?$filter=IUnitNo eq '" + unitNosPass1 + "' and IUnitNo1 eq '" + unitNosPass2 + "'";
    	 //  alert("unit spec url " + urlToCall);
  		   oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
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
    		    	//aUnitspecification = data.results;
    		    	//to remove the unit numbers that are sold or not found from the specification table
    		    	var len = data.results.length;
    		    	//alert("len " + len + "notValidUnitNos.length" + notValidUnitNos.length)
    		    	var unitNoUsed = "";
    		    	for(var i=0; i<len; i++){
    		    		if(notValidUnitNos.length > 0){
	                        for (var j=0; j<notValidUnitNos.length; j++){
	                              if(data.results[i].Equnr != notValidUnitNos[j]){
	                                     unitNoUsed = "";
	                                     unitNoUsed = data.results[i].Equnr;
	                                     aUnitspecification.push({
																 "Csc" : data.results[i].Csc,
																 "CscRefNo" : data.results[i].CscRefNo,	// MAC20062019_APS1122+
																 "MaintProg" : data.results[i].MaintProg,	// MAC20062019_APS1122+
		             		    				"CubicCapacity" : data.results[i].CubicCapacity,
		             		    				"DoorOpeningHeight" : data.results[i].DoorOpeningHeight,
		             		    				"DoorOpeningWidth" : data.results[i].DoorOpeningWidth,
		             		    				"Eqktx" : data.results[i].Eqktx,
		             		    				"Equnr" : data.results[i].Equnr,
		             		    				"HeightExt" : data.results[i].HeightExt,
		             		    				"HeightInt" : data.results[i].HeightInt,
		             		    				"IUnitNo" : data.results[i].IUnitNo,
		             		    				"IUnitNo1" : data.results[i].IUnitNo1,
		             		    				"IsoCode" : data.results[i].IsoCode,
		             		    				"LengthExt" : data.results[i].LengthExt,
		             		    				"LengthInt" : data.results[i].LengthInt,
		             		    				"MachineryManufacuturer" : data.results[i].MachineryManufacuturer,
		             		    				"MachineryModel" : data.results[i].MachineryModel,
		             		    				"Manufacturer" : data.results[i].Manufacturer,
		             		    				"MaxGrossWeight" : data.results[i].MaxGrossWeight,
		             		    				"MaxPayload" : data.results[i].MaxPayload,
		             		    				"Message" : data.results[i].Message,
		             		    				"StackingHeight" : data.results[i].StackingHeight,
		             		    				"StackingTestLoadPerPost" : data.results[i].StackingTestLoadPerPost,
		             		    				"TankType" : data.results[i].TankType,
		             		    				"TareWeight" : data.results[i].TareWeight,
		             		    				"Tir" : data.results[i].Tir,
		             		    				"Type" : data.results[i].Type,
		             		    				"UnitType" : data.results[i].UnitType,
		             		    				"WidthExt" : data.results[i].WidthExt,
		             		    				"WidthInt" : data.results[i].WidthInt,
		             		    				"Mandate" : data.results[i].Manmonth + ' - ' + data.results[i].Manyear,
		             		    			});
	                                     for(var a=0; a<notValidUnitNos.length; a++){
	                                            if(unitNoUsed == notValidUnitNos[a]){
	                                            	aUnitspecification.pop();
	                                            }
	                                     }
	                                     break;
	                              }
	                              else{
	                                     break;
	                              }
	                        }
    		    		}
    		    		else{
    		    			//aUnitspecification = data.results;
    		    			for(var i=0; i<data.results.length; i++){
    		    			aUnitspecification.push({
										"Csc" : data.results[i].Csc,
										"CscRefNo" : data.results[i].CscRefNo,	// MAC20062019_APS1122+
										"MaintProg" : data.results[i].MaintProg,	// MAC20062019_APS1122+
    		    				"CubicCapacity" : data.results[i].CubicCapacity,
    		    				"DoorOpeningHeight" : data.results[i].DoorOpeningHeight,
    		    				"DoorOpeningWidth" : data.results[i].DoorOpeningWidth,
    		    				"Eqktx" : data.results[i].Eqktx,
    		    				"Equnr" : data.results[i].Equnr,
    		    				"HeightExt" : data.results[i].HeightExt,
    		    				"HeightInt" : data.results[i].HeightInt,
    		    				"IUnitNo" : data.results[i].IUnitNo,
    		    				"IUnitNo1" : data.results[i].IUnitNo1,
    		    				"IsoCode" : data.results[i].IsoCode,
    		    				"LengthExt" : data.results[i].LengthExt,
    		    				"LengthInt" : data.results[i].LengthInt,
    		    				"MachineryManufacuturer" : data.results[i].MachineryManufacuturer,
    		    				"MachineryModel" : data.results[i].MachineryModel,
    		    				"Manufacturer" : data.results[i].Manufacturer,
    		    				"MaxGrossWeight" : data.results[i].MaxGrossWeight,
    		    				"MaxPayload" : data.results[i].MaxPayload,
    		    				"Message" : data.results[i].Message,
    		    				"StackingHeight" : data.results[i].StackingHeight,
    		    				"StackingTestLoadPerPost" : data.results[i].StackingTestLoadPerPost,
    		    				"TankType" : data.results[i].TankType,
    		    				"TareWeight" : data.results[i].TareWeight,
    		    				"Tir" : data.results[i].Tir,
    		    				"Type" : data.results[i].Type,
    		    				"UnitType" : data.results[i].UnitType,
    		    				"WidthExt" : data.results[i].WidthExt,
    		    				"WidthInt" : data.results[i].WidthInt,
    		    				"Mandate" : data.results[i].Manmonth + ' - ' + data.results[i].Manyear,
    		    			});
    		    		}
                 }
    		    	if(len == 1){
    		    		specStatus = true;
        		    	//oUnitEnquiryObj.CheckStatusUE();
    		    		oUnitEnquiryObj.getDocuments(selUnitNumber);
    		    	}
    		    	else{
    		    		specStatus = true;
    		    		busyDialog.close();
        		    	//oUnitEnquiryObj.CheckStatusUE();
    		    		var bus = sap.ui.getCore().getEventBus();
        				bus.publish("nav", "to", {
        	        	  id : "UnitEnqSpecs"
        				});
        				var oUnitEnqSpecs = new unitEnqSpecsView();
        				oUnitEnqSpecs.createUnitEnqSpecsFormView();
        				oUnitEnqSpecs.bindAllDetails();

    		    	}
    		    	}
    		    },
    		   function(err){
    		    	specStatus = true;
    		    	//oUnitEnquiryObj.CheckStatusUE();
    		    	errorfromServer(err);
    		    });
       }, //bind unit specs

       getDocuments: function(selectedUnitNumber){
    	   oUnitEnquiryObj = this;
    	   aDocumentList = [];
    	   var urlToCall = serviceUrl + "/Unit_Document_Type?$filter=Equipment eq '" + selectedUnitNumber + "'";
  		   oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
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
    		    	DocStatus = true;
    		    //	oUnitEnquiryObj.CheckStatusUE();
    		    	aDocumentList = data.results;
    		    	oUnitEnquiryObj.getPictures(selUnitNumber);
    		    	/*for(var i=0 ; i<data.results.length ; i++){
    		    		inputParameterForDocumentDownload[i] = data.results[i].Equipment + "$" + data.results[i].DocumentType + "," + data.results[i].DocumentType1;
    		    	}*/
    		    },
    		    function(err){
    		    	DocStatus = true;
    		    //	oUnitEnquiryObj.CheckStatusUE();
    		    	errorfromServer(err);
    		    	//alert("Error while reading single Unit status : "+ window.JSON.stringify(err.response));
    		    });
       },

       getPictures: function(selectedUnitNumber){

    	   oUnitEnquiryObj = this;
    	   aSalePicturesList = [];
    	   http://seanwgd1.gessap.local:8000/sap/opu/odata/sap/ZNW_SEACO_PORTAL_FEB_SRV/SalePic_Download('GESU8065276$NSA')
    		   var param = selectedUnitNumber + "$NSA";
    		   //alert("selected unit number " + selectedUnitNumber);
    		   //var param = selectedUnitNumber;
    	   var urlToCall = serviceUrl + "/SalePic_Download('" + param + "')";
  		   oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
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
    		    	//alert("image data " + window.JSON.stringify(data))
    		    	aSalePicturesList = data;
    		    	var bus = sap.ui.getCore().getEventBus();
					bus.publish("nav", "to", {
		        	  id : "ContainerDetails"
					});
					var oContainerDetails = new containerDetailsView();
					oContainerDetails.bindContainerDetails();
					oContainerDetails.bindUnitSpecificationsinDetail();
					// oContainerDetails.bindDocumentDetail(); // MAC22012019 -

					// Begin of adding by Seyed Ismail on 22.01.2019 MAC22012019+
					if(globalIsTanks)
						oContainerDetails.bindDocumentDetailForTanks(selectedUnitNumber);
					else
						oContainerDetails.bindDocumentDetail();
					// End of adding by Seyed Ismail on 22.01.2019 MAC22012019+

					//security
					var PanelToBeShown = objLoginUser.filterLoggedInUserData("SCREEN");
					sap.ui.getCore().byId("idUnitDocPanelUnitEnq").setVisible(false);
					sap.ui.getCore().byId("idSalePicPanelUnitEnq").setVisible(false);
					sap.ui.getCore().byId("idContDetPanelUnitEnq").setVisible(false);
					sap.ui.getCore().byId("idUnitSpecPanelUnitEnq").setVisible(false);


					for(var i=0;i<PanelToBeShown.length;i++){
						if(PanelToBeShown[i].ScrView.toLowerCase() == "documents" && globalSold == false)	// MAC01122016 included globalSold
							sap.ui.getCore().byId("idUnitDocPanelUnitEnq").setVisible(true);
						/*else
							sap.ui.getCore().byId("idUnitDocPanelUnitEnq").setVisible(false);*/

						if(PanelToBeShown[i].ScrView.toLowerCase() == "sale_pictures")
							showSalePic = true;
							//sap.ui.getCore().byId("idSalePicPanelUnitEnq").setVisible(true);
						/*else
							sap.ui.getCore().byId("idSalePicPanelUnitEnq").setVisible(false);*/

						if(PanelToBeShown[i].ScrView.toLowerCase() == "unit_status")
							sap.ui.getCore().byId("idContDetPanelUnitEnq").setVisible(true);
						/*else
							sap.ui.getCore().byId("idContDetPanelUnitEnq").setVisible(false);*/

						if(PanelToBeShown[i].ScrView.toLowerCase() == "unit_specifications_basic")
							sap.ui.getCore().byId("idUnitSpecPanelUnitEnq").setVisible(true);
						/*else
							sap.ui.getCore().byId("idUnitSpecPanelUnitEnq").setVisible(false);*/
					}
					//set visible
					/*sap.ui.getCore().byId("idUnitSpecPanelUnitEnq").setVisible(true);
		    		sap.ui.getCore().byId("idUnitDocPanelUnitEnq").setVisible(true);
		    		sap.ui.getCore().byId("idSalePicPanelUnitEnq").setVisible(true);*/
		    		$('#idHdrContent').html('Unit Enquiry');
		    		pictureStatus = true;
    		    	//oUnitEnquiryObj.CheckStatusUE();
					if(aSalePicturesList.File3 == "" && aSalePicturesList.File4 == "" && aSalePicturesList.File1 == "" && aSalePicturesList.File2 == "" && aSalePicturesList.File5 == ""){
						if(showSalePic){
							if(saleSalp == "Y"){
								 sap.ui.getCore().byId("idViewSalePicLayout").setVisible(false);
								 sap.ui.getCore().byId("idSalePicPanelUnitEnq").setVisible(false);
							}
							else{
								 sap.ui.getCore().byId("idViewSalePicLayout").setVisible(false);
								 sap.ui.getCore().byId("idSalePicPanelUnitEnq").setVisible(true);
								sap.ui.getCore().byId("idSalePicPanelUnitEnq").setTitle(new sap.ui.core.Title({text: "No Sale Pictures available"}));
							}
						}
					}
					else{
						//alert("picture")
						sap.ui.getCore().byId("idViewSalePicLayout").setVisible(true);
						 sap.ui.getCore().byId("idSalePicPanelUnitEnq").setTitle(new sap.ui.core.Title({text: "View Sale Pictures"}));
						if(aSalePicturesList.File3 == ""){
							sap.ui.getCore().byId("idBtnTop").setEnabled(false);
							sap.ui.getCore().byId("idTopImg").setSrc("images/no-image.png");
						}
						else{
							sap.ui.getCore().byId("idBtnTop").setEnabled(true);
							sap.ui.getCore().byId("idTopImg").setSrc("images/top.png");
						}
						if(aSalePicturesList.File4 == ""){
							sap.ui.getCore().byId("idBtnBottom").setEnabled(false);
							sap.ui.getCore().byId("idBottomImg").setSrc("images/no-image.png");
						}
						else{
							sap.ui.getCore().byId("idBtnBottom").setEnabled(true);
							sap.ui.getCore().byId("idBottomImg").setSrc("images/bottom.png");
						}
						if(aSalePicturesList.File1 == ""){
							sap.ui.getCore().byId("idBtnBack").setEnabled(false);
							sap.ui.getCore().byId("idBackImg").setSrc("images/no-image.png");
						}
						else{
							sap.ui.getCore().byId("idBtnBack").setEnabled(true);
							sap.ui.getCore().byId("idBackImg").setSrc("images/back.png");
						}
						if(aSalePicturesList.File2 == ""){
							sap.ui.getCore().byId("idBtnFront").setEnabled(false);
							sap.ui.getCore().byId("idFrontImg").setSrc("images/no-image.png");
						}
						else{
							sap.ui.getCore().byId("idBtnFront").setEnabled(true);
							sap.ui.getCore().byId("idFrontImg").setSrc("images/front.png");
						}
						if(aSalePicturesList.File5 == ""){
							sap.ui.getCore().byId("idBtnOverall").setEnabled(false);
							//sap.ui.getCore().byId("idBtnOverall").setSrc("images/no-image.png");
						}
						else{
							sap.ui.getCore().byId("idBtnOverall").setEnabled(true);
						}

						if(saleSalp == "Y"){
			    			sap.ui.getCore().byId("idSalePicPanelUnitEnq").setVisible(false);
							 sap.ui.getCore().byId("idViewSalePicLayout").setVisible(false);
							 sap.ui.getCore().byId("idSalePicPanelUnitEnq").setTitle(new sap.ui.core.Title({text: "Equipment Status is not in SALE"}));
			    		}
			    		else{
			    			sap.ui.getCore().byId("idSalePicPanelUnitEnq").setVisible(true);
							 sap.ui.getCore().byId("idViewSalePicLayout").setVisible(true);
			    		}
					}
					//oContainerDetails.bindSalePictures();
					// Begin of adding by Seyed Ismail on 26.09.2014 "MAC26092014 " View Sale Pic Hiding based on Status...

		    		// End of adding by Seyed Ismail on 26.09.2014 "MAC26092014
					busyDialog.close();
    		    },
    		    function(err){
    		    	pictureStatus = true;
    		    	//oUnitEnquiryObj.CheckStatusUE();
    		    	busyDialog.close();
    		    	errorfromServer(err);
    		    });
       },

       CheckStatusUE: function(){

    	   if(noResult){
    		   busyDialog.close();
    	   }
    	   else{
    		   if(singleStatus && specStatus && DocStatus && pictureStatus){
      				//alert("Status of Unit Auto : "+ unitAutoStatus + "Status of Prefix : "+ prefixAutoStatus);
      				busyDialog.close();
      		   }
	       	   else if(multipleStatus && specStatus){
	       		   busyDialog.close();
	       	   }
    	   }

       }


});

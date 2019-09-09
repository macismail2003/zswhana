var aMakeOffer = [];

var MakeAnOfferData = [];
sap.ui.model.json.JSONModel.extend("saleInvMakeOfferView", {
	
	createSaleInvMakeOffer:function(){
		var oFlexboxMakeAnOffer = new sap.m.FlexBox("idMakeAnOfferFlxBox",{
            items: [],
            direction: "Row"
		  });
		
		return oFlexboxMakeAnOffer;
	},
	
	createSaleInvMakeOfferForm: function(){
		sap.ui.getCore().byId("idMakeAnOfferFlxBox").destroyItems();
		 $('#idHdrContnt').html("Sale Inventory - Make an Offer");
		var oCurrent = this;
		var backToMakeAnOffer = new sap.m.Link("idBackMakeAnOffer", {text: " < Back",
	       	  width:"9%",
	       	  wrapping:true,
	       	  press: function(){
	       		 $('#idHdrContnt').html("Sale Inventory City Details");
	       		  var bus = sap.ui.getCore().getEventBus();
	       			bus.publish("nav", "back");
	      	  }});
		
		// Labels
		var oLabelInfo = new sap.ui.commons.Label({text: "You are making an offer for the units with following characteristics",
            wrapping: true}).addStyleClass("marginTop10 sapUiForm sapUiFormTitle");
		
		// Buttons
	   	 var oBtnOK = new sap.m.Button("idBtnOKMakeAnOfferSI",{
		          text : "OK",
		          styled:false,
		          width:"80px",
		          layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
		          press:function(){
		        	  if(oCurrent.ValidateMakeAnOfferForm()){
		        		  busyDialog.open();
			        	  oCurrent.SendMailSI();
		        	  }
		        	 
		          }}).addStyleClass("submitBtn");
	   	 var oBtnCancel = new sap.m.Button("idBtnCancelMakeAnOfferSI",{
		          text : "Cancel",
		          styled:false,
		          width:"80px",
		          layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
		          press:function(){
		        	  var ConfirmMessage = "Do you want ot cancel the offer?";
						 sap.ui.commons.MessageBox.show(ConfirmMessage,
			       			  sap.ui.commons.MessageBox.Icon.WARNING,
			       				"Warning",
			                     [sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO], 
			                     oCurrent.fnCancelOfferSI,
			                     sap.ui.commons.MessageBox.Action.YES);
		          }
	   	 }).addStyleClass("submitBtn");
	   	var lblSpace1 = new sap.ui.commons.Label( {text: " ",width : '5px'});
	   	
	  // Flex Box
		   	var oFlexBoxButtons = new sap.m.FlexBox({
		  		  items: [
							oBtnOK,lblSpace1,
							oBtnCancel
		     		  ],
		     		  direction: "Row"
		     		}).addStyleClass("marginTop10"); 
		   	
		   	aMakeOffer= [];
		    aMakeOffer = vMakeAnOfferHelpValSI.split("$");
		    
		    
		 // Labels
			var oLabelCustomer = new sap.ui.commons.Label({text: "Customer Name : ",
				layoutData: new sap.ui.layout.GridData({span: "L7 M3 S4",linebreak: false, margin: false}),
	            wrapping: true}).addStyleClass("marginTop15");
			
			/*var oLabelWarning = new sap.ui.commons.Label({text: "Value will be populated once security is implemented",
				layoutData: new sap.ui.layout.GridData({span: "L5 M3 S4",linebreak: false, margin: false}),
	            wrapping: true}).addStyleClass("font10");*/
			
			/*var oFlexBoxCustomer = new sap.m.FlexBox({
		  		  items: [
							oLabelCustomer//,oLabelWarning
		     		  ],
		     		  direction: "Column"
		     		}).addStyleClass("marginTop15"); */
			
			var oLabelUnitLoc = new sap.ui.commons.Label({text: "Unit Location : ",
				layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: false}),
	            wrapping: true}).addStyleClass("marginTop15");
			
			var oLabelUnitDesc = new sap.ui.commons.Label({text: "Unit Type : ",
				layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: false}),
	            wrapping: true}).addStyleClass("marginTop15");
			
			var oLabelSaleGrade = new sap.ui.commons.Label({text: "Sale Grade : ",
				layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: false}),
	            wrapping: true}).addStyleClass("marginTop15");
			
			var oLabeAgeCat = new sap.ui.commons.Label({text: "Age : ",
				layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: false}),
	            wrapping: true}).addStyleClass("marginTop15");
			
			var oLabelQuantity = new sap.ui.commons.Label({text: "Quantity : ",required:true,
				layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: false}),
	            wrapping: true}).addStyleClass("marginTop15");
			
			var oLabelOfferPrice = new sap.ui.commons.Label({text: "Offer Price/Unit : ",required:true,
				layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: false}),
	            wrapping: true}).addStyleClass("marginTop15");
			
			var oLabelCurrency = new sap.ui.commons.Label({text: "Currency : ",
				layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: false}),
	            wrapping: true}).addStyleClass("marginTop15");
			
			var oLabelTotal= new sap.ui.commons.Label({text: "Total : ",
				layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: false}),
	            wrapping: true}).addStyleClass("marginTop15");
			
		  	var oTxtCustomer = new sap.ui.commons.TextView("idValCustomerSI",{
		  		text:objLoginUser.getLoggedInUserName(),
		   		layoutData: new sap.ui.layout.GridData({span: "L4 M3 S4",linebreak: false, margin: false}),
		   	}).addStyleClass("fontTitle marginTop15");
			
			var oTxtUnitLoc = new sap.ui.commons.TextView("idValUniLocSI",{
				text:aMakeOffer[0],
				layoutData: new sap.ui.layout.GridData({span: "L4 M3 S4",linebreak: false, margin: false}),}).addStyleClass("marginTop15");
			
			var oTxtUnitType = new sap.ui.commons.TextView("idValUnitTypeSI",{
				text:aMakeOffer[1],
				layoutData: new sap.ui.layout.GridData({span: "L4 M3 S4",linebreak: false, margin: false}),}).addStyleClass("marginTop15");
			
			var oTxtSaleGrade = new sap.ui.commons.TextView("idValSaleGradeSI",{
				text:aMakeOffer[2],
				layoutData: new sap.ui.layout.GridData({span: "L4 M3 S4",linebreak: false, margin: false}),}).addStyleClass("marginTop15");
			
			var oTxtAgeCat = new sap.ui.commons.TextView("idValAgeCatSI",{
				text:aMakeOffer[3],
				layoutData: new sap.ui.layout.GridData({span: "L4 M3 S4",linebreak: false, margin: false}),}).addStyleClass("marginTop15");
			
			var oTxtCurrency = new sap.ui.commons.TextView("idValCurrencySI",{
				text:"USD",
				layoutData: new sap.ui.layout.GridData({span: "L4 M3 S4",linebreak: false, margin: false}),}).addStyleClass("marginTop15");
			
			var oTxtFQty = new sap.ui.commons.TextField("idValQtySI",{
				change:function(){
					var vTotal = sap.ui.getCore().byId("idValTotalSI");
					var qty = sap.ui.getCore().byId("idValQtySI");
					var price = sap.ui.getCore().byId("idValOfferPriceSI");
					if(parseInt(qty.getValue()) > parseInt(aMakeOffer[4])){
						sap.ui.commons.MessageBox.alert("Entered quantity is more than available quantity");
						qty.setValue("");
						price.setValue("");
						vTotal.setValue("");
						qty.setValueState(sap.ui.core.ValueState.Error);
					}
					else if(!$.isNumeric(qty.getValue())){
						qty.setValueState(sap.ui.core.ValueState.Error);
						qty.setValue("");
						qty.setPlaceholder("Invalid Quantity");
						valid=false;
					}
					else if(qty.getValue() < 0){
						qty.setValueState(sap.ui.core.ValueState.Error);
						qty.setValue("");
						qty.setPlaceholder("Invalid Quantity");
						valid=false;
					}
					else{
						if(price.getValue() != ""){
							var vTotVal = (qty.getValue() * price.getValue());
							vTotal.setValue(vTotVal);
						}
						qty.setValueState(sap.ui.core.ValueState.None);
					}
					
					
				},
				layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: false})
			}).addStyleClass("marginTop15");
			
			var oTxtFOfferPrice = new sap.ui.commons.TextField("idValOfferPriceSI",{
				change:function(){
					var valid = true;
					var vTotal = sap.ui.getCore().byId("idValTotalSI");
					var qty = sap.ui.getCore().byId("idValQtySI");
					var price = sap.ui.getCore().byId("idValOfferPriceSI");
					
					if(qty.getValue() == ""){
						qty.setValueState(sap.ui.core.ValueState.Error);
						qty.setPlaceholder("Enter Quantity");
						valid=false;
					}
					else if(!$.isNumeric(qty.getValue())){
						qty.setValueState(sap.ui.core.ValueState.Error);
						qty.setValue("");
						qty.setPlaceholder("Invalid Quantity");
						valid=false;
					}
					else if(price.getValue() < 0){
						price.setValueState(sap.ui.core.ValueState.Error);
						price.setValue("");
						price.setPlaceholder("Invalid Price");
						valid=false;
					}
					if(!$.isNumeric(price.getValue())){
						price.setValueState(sap.ui.core.ValueState.Error);
						price.setValue("");
						price.setPlaceholder("Invalid Price");
						valid=false;
					}
					if(valid){
						price.setValueState(sap.ui.core.ValueState.None);
						var vTotVal = (qty.getValue() * price.getValue());
						vTotal.setValue(vTotVal);
					}
					
				},
				layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: false})
			}).addStyleClass("marginTop15");
			
			var oTxtFTotal = new sap.ui.commons.TextField("idValTotalSI",{
				enabled:false,
				layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: false})
			}).addStyleClass("marginTop15");
			
		 	
			 var labStar = new sap.ui.commons.Label({text: "* "}).addStyleClass("MandatoryStar");
			  var lblSpaceLegend = new sap.ui.commons.Label( {text: " ",width : '5px'});
			  var labRequired = new sap.ui.commons.Label({text: " Mandatory Field",wrapping: true});
			  var oFlexboxReq = new sap.m.FlexBox({
				 // layoutData: new sap.ui.layout.GridData({span: "L7 M6 S4"}),
	             items: [labStar,lblSpaceLegend,labRequired],
	             direction: "Row"
			  });
			  
			  var oFlexboxLegend = new sap.m.FlexBox({
				  layoutData: new sap.ui.layout.GridData({span: "L7 M9 S5"}),
	             items: [oFlexboxReq],
	             direction: "Column"
			  }).addStyleClass("marginTop10");
			  
	    	// Responsive Grid Layout
		    var oMakeOfferLayout = new sap.ui.layout.form.ResponsiveGridLayout("idMakeOfferLayoutSI");
	   	 
			  // Online Form Starts
			     var oMakeOfferForm = new sap.ui.layout.form.Form("idMakeOfferFormSI",{
			             layout: oMakeOfferLayout,
			             formContainers: [
			                     
			                     new sap.ui.layout.form.FormContainer("idMakeOfferFormSIC1",{ 
			                            // title: "Sale Inventory Overview - Make an Offer",
			                             formElements: [
														new sap.ui.layout.form.FormElement({
														    fields: [backToMakeAnOffer]
														}),
														new sap.ui.layout.form.FormElement({
														    fields: [oLabelInfo]
														}),
														new sap.ui.layout.form.FormElement({
														    fields: [oLabelCustomer,oTxtCustomer]
														}),
														new sap.ui.layout.form.FormElement({
														    fields: [oLabelUnitLoc, oTxtUnitLoc]
														}),
														new sap.ui.layout.form.FormElement({
														    fields: [oLabelUnitDesc, oTxtUnitType]
														}),
														new sap.ui.layout.form.FormElement({
														    fields: [oLabelSaleGrade, oTxtSaleGrade]
														}),
														new sap.ui.layout.form.FormElement({
														    fields: [oLabeAgeCat, oTxtAgeCat]
														}),
														new sap.ui.layout.form.FormElement({
														    fields: [oLabelQuantity, oTxtFQty]
														}),
														new sap.ui.layout.form.FormElement({
														    fields: [oLabelOfferPrice, oTxtFOfferPrice]
														}),
														new sap.ui.layout.form.FormElement({
														    fields: [oLabelCurrency, oTxtCurrency]
														}),
														new sap.ui.layout.form.FormElement({
														    fields: [oLabelTotal, oTxtFTotal]
														}), 
														new sap.ui.layout.form.FormElement({
														    fields: [oFlexBoxButtons]
														}),
														new sap.ui.layout.form.FormElement({
														    fields: [oFlexboxLegend]
														}),
			                                     ]
			                     })                    
			             ]
			     });
			     sap.ui.getCore().byId("idMakeAnOfferFlxBox").addItem(oMakeOfferForm);
			     	//return oMakeOfferForm;
	},
	
	ValidateMakeAnOfferForm: function(){
		var qty = sap.ui.getCore().byId("idValQtySI");
		var price = sap.ui.getCore().byId("idValOfferPriceSI");
		var valid = true;
		if(qty.getValue() == ""){
			qty.setValueState(sap.ui.core.ValueState.Error);
			qty.setPlaceholder("Enter Quantity");
			valid=false;
		}
		if(price.getValue() == ""){
			price.setValueState(sap.ui.core.ValueState.Error);
			price.setPlaceholder("Enter Offer Price");
			valid=false;
		}
		return valid;
	},
	
	
	SendMailSI: function(){
		oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
		//http://seanwgd1.gessap.local:8000/sap/opu/odata/sap/ZNW_SEACO_PORTAL_FEB_SRV/Send_Mail_Buyer?$filter=ICustNo eq '400612' and ICustName eq 'WEALTH FAIR LOGISTICS LTD' 
		//	and IUnitLoc eq 'MUMBAI' and IUnitType eq 'BX2' and ISaleGrade eq '1' and IAge eq '8' and IQuantity eq '2' and IOfferPrice eq '2000' 
		//	and ICurrency eq 'USD' and ITotal eq '4000' and IExtra eq ''
		aMakeOffer= [];
	    aMakeOffer = vMakeAnOfferHelpValSI.split("$");
		var ICustNo = "400612";
		var ICustName = "WEALTH FAIR LOGISTICS LTD";
		var qty = sap.ui.getCore().byId("idValQtySI").getValue();
		var offerPrice = sap.ui.getCore().byId("idValOfferPriceSI").getValue();
		var totalPrice = sap.ui.getCore().byId("idValTotalSI").getValue();
		
		var unitType = aMakeOffer[1];
		unitType = unitType.replace(/\'/g, "$");
		unitType = unitType.replace(/\+/g, "@");
		
		var urlToCall = serviceUrl + "/Send_Mail_Buyer?$filter=ICustNo eq '" + ICustNo + 
									 "' and ICustName eq '" + ICustName + 
									 "' and IUnitLoc eq '" + aMakeOffer[0] +
									 "' and IUnitType eq '" + unitType + 
									 "' and ISaleGrade eq '" + aMakeOffer[2] + 
									 "' and IAge eq '"+ aMakeOffer[3] +  
									 "' and IQuantity eq '" + qty + 
									 "' and IOfferPrice eq '" + offerPrice + 
									 "' and ICurrency eq 'USD'" +
									 " and ITotal eq '" + totalPrice + "'"; 
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
		    	if(data.results[0].OResponse.toUpperCase() == "SUCCESS"){
		    		sap.ui.commons.MessageBox.alert("Mail has been sent successfully");
		    	}else{
		    		sap.ui.commons.MessageBox.alert("Mail could not be sent currently. Please try again later");
		    	}
		    	 busyDialog.close();
		    },
		    function(err){
		    	 busyDialog.close();
		    	 errorfromServer(err);
		    	//alert("Error while Reading Result : "+ window.JSON.stringify(err.response));
		    });
	},
	
	fnCancelOfferSI: function(sResult){
		if(sResult == "YES"){
			var bus = sap.ui.getCore().getEventBus();
				bus.publish("nav", "back");
		}
	}
});
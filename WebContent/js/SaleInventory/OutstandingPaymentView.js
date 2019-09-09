var aOutstndingPay = [];
var outPayForm = "";
var LoggedInUserTypeOutPay = "";
sap.ui.model.json.JSONModel.extend("OutStandingPaymentView", {
	
	createOutPayView: function(){
		var oCurrent = this;
		
		
		
		var oLabelCustomerID = new sap.ui.commons.Label({text: "Customer ID: ",required:true,wrapping: true,
			  layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: false})
		}).addStyleClass("marginTop15");
		
		var oTxtFCustomerID = new sap.ui.commons.TextField("idValcustomerIDSI",{
		placeholder:"Customer ID",
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: false})
		}).addStyleClass("marginTop10 DepotInput38px");
		
		var oBtnOK = new sap.m.Button("idBtnSubmitOutPayment",{
	          text : "Submit",
	          styled:false,
	          //width:"80px",
	          layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: true}),
	          press:function(){
	        	 
	        	  var valid = true;
	        	  if(sap.ui.getCore().byId("idValcustomerIDSI").getValue() == ""){
	        		  sap.ui.getCore().byId("idValcustomerIDSI").setValueState(sap.ui.core.ValueState.Error);
	        		  sap.ui.getCore().byId("idValcustomerIDSI").setPlaceholder("Enter Customer ID");
	        		  valid = false;
	        	  }
	        	  if(valid){
	        		  busyDialog.open();
	        		  oCurrent.GetOutStandingPayData();
	        	  }
	          }}).addStyleClass("submitBtn marginTop10");
		
		/* var oFlexboxOutColumn = new sap.m.FlexBox("idOutPayViewFlexColumn",{
             items: [oFlexboxtempFields,oBtnOK],
             direction: "Row"
		  });*/
		
		 var oPayViewLayout = new sap.ui.layout.form.ResponsiveGridLayout("idPayViewLayout");
		 var oCityDetailsForm = new sap.ui.layout.form.Form("idPayViewForm",{
             layout: oPayViewLayout,
             formContainers: [
                              new sap.ui.layout.form.FormContainer("idPayViewFormC1",{
		                            // title: "Sale Inventory Overview - City Details",
		                             formElements: [
									new sap.ui.layout.form.FormElement({
									    fields: [oLabelCustomerID,oTxtFCustomerID]
									}),
									new sap.ui.layout.form.FormElement({
									    fields: [oBtnOK],
									    layoutData: new sap.ui.commons.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
									}),
									]
                              })
                              ]
		   });
		/* temp end*/
		 
		// Responsive Grid Layout
		    var oOutPayLayout = new sap.ui.layout.form.ResponsiveGridLayout("idOutPayLayout");
	   	 
			  // Online Form Starts
			     var oOutReleasesForm = new sap.ui.layout.form.Form("idOutPayForm",{
			             layout: oOutPayLayout,
			             formContainers: [
			                     
			                     new sap.ui.layout.form.FormContainer("idOutPayFormC1",{
			                             //title: "Outstanding Releases",
			                             formElements: [
													new sap.ui.layout.form.FormElement("idOutPayViewFlex",{
													    fields: []
													}),
			                                     ]
			                     })                    
			             ]
			     });
			     
		
			     var oFlexboxFinal = new sap.m.FlexBox({
		             items: [oCityDetailsForm,oOutReleasesForm],
		             direction: "Column"
		 		  }).addStyleClass("marginTop10");
		 
		 return oFlexboxFinal;
	},
	
	GetOutStandingPayData: function(){
		busyDialog.open();
		var ICustomer = "";
		//security
		//var objUser = new loggedInU();
		LoggedInUserTypeOutPay = objLoginUser.getLoggedInUserType();
		if(LoggedInUserTypeOutPay != "SEACO"){
			ICustomer = objLoginUser.getLoggedInUserID();
		}
		else{
			ICustomer = sap.ui.getCore().byId("idValcustomerIDSI").getValue();
		}
		
		oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
		var urlToCall = serviceUrl + "/Cust_Outstnd_Amount?$filter=IPartner eq '" + ICustomer + "' and IExtra1 eq '' and IExtra2 eq ''";
		//alert("urlToCall " + urlToCall);
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
		    	var dataLen = data.results.length;
		    	if(dataLen > 0){
		    		for(var i=0;i<dataLen;i++){
			    		 var vInvDtResult = data.results[i].InvoiceDate.split("(");
						  var vDate = vInvDtResult[1].split(")");
						  var vActualInvDate = new Date(Number(vDate[0]));
						  var vformattedInvDate = dateFormat(new Date(Number(vDate[0])), 'dd-mm-yyyy',"UTC");
						  if (vformattedInvDate.substring(6) === "9999"){
							  data.results[i].InvoiceDate =  "-";
							  data.results[i]["InvDateActual"] = vActualInvDate;
						  }
						  else{
							  data.results[i].InvoiceDate = vformattedInvDate;
							  data.results[i]["InvDateActual"] = vActualInvDate;
						  }
						  
						  var vDueDtResult = data.results[i].DueDate.split("(");
						  var vDate = vDueDtResult[1].split(")");
						  var vActualDueDate = new Date(Number(vDate[0]));
						  var vformattedDueDate = dateFormat(new Date(Number(vDate[0])), 'dd-mm-yyyy',"UTC");
						  if (vformattedDueDate.substring(6) === "9999"){
							  data.results[i].DueDate =  "-";
							  data.results[i]["DueDateActual"] =  vActualDueDate;
						  }
						  else{
							  data.results[i].DueDate = vformattedDueDate;
							  data.results[i]["DueDateActual"] =  vActualDueDate;
						  }
						  
						  var vBillDtResult = data.results[i].BillDate.split("(");
						  var vDate = vBillDtResult[1].split(")");
						  var vActualBillDate = new Date(Number(vDate[0]));
						  var vformattedBillDate = dateFormat(new Date(Number(vDate[0])), 'dd-mm-yyyy',"UTC");
						  if (vformattedBillDate.substring(6) === "9999"){
							  data.results[i].BillDate =  "-";
							  data.results[i]["BillDateActual"] =  vActualBillDate;
						  }
						  else{
							  data.results[i].BillDate = vformattedBillDate;
							  data.results[i]["BillDateActual"] =  vActualBillDate;
						  }
						  data.results[i].Amount = numberWithCommas(data.results[i].Amount);
						  data.results[i].UnitPrice = numberWithCommas(data.results[i].UnitPrice);
						  data.results[i].Tax = numberWithCommas(data.results[i].Tax);
						  aOutstndingPay[i] = data.results[i];
			    	}
			    	//if Credit customer
			    	if(data.results[0].CustRating == "D1"){
			    		var oOutPayCredit = new outPayCreditView();
			    		//outPayForm = oOuPayCredit.createOutPayCredit();	
			    		sap.ui.getCore().byId("idOutPayViewFlex").destroyFields();
			    		oOutPayCredit.createOutPayCredit();
			    		oOutPayCredit.bindOutPayCredit();
			    	}
			    	//if cash customerS
			    	else{
			    		var oOutPayCash = new outPayCashView();
			    		//outPayForm = oOuPayCash.createOutPayCash();
			    		sap.ui.getCore().byId("idOutPayViewFlex").destroyFields();
			    		oOutPayCash.createOutPayCash();	
			    		oOutPayCash.bindOutPayCash();
			    	}
			    	busyDialog.close();
		    	}
		    	else{
		    		sap.ui.commons.MessageBox.show("No Results found. Please try again later",
		                     sap.ui.commons.MessageBox.Icon.WARNING,
		                     "Warning",
		                     [sap.ui.commons.MessageBox.Action.OK], 
		                         sap.ui.commons.MessageBox.Action.OK);
		    	busyDialog.close();
		    	}
		    	
		    },
		    function(err){
		    	 busyDialog.close();
		    	 errorfromServer(err);
		    });
		
		return outPayForm;
	}
});
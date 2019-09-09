/*********** NP **********/

jQuery.sap.require("sap.ui.model.json.JSONModel");

	var aOnlineReservationOR = [];
	var jsonExistingReturnsDetailsDetailOR = [];
	var ExistingReturnsDetailsDetailOR = [];
sap.ui.model.json.JSONModel.extend("ReturnDetailsDetailView", {
	
	createOnlineReservation: function(){
		var oCurrent= this;
		 var backRetDetsDetOR = new sap.m.Link("idBackRetDetsDetOR", {text: " < Back",
       	  width:"15%",
       	  wrapping:true,
       	  press: function(){
       		var oReturnDetails = new returnDetailsView();
       		oReturnDetails.createReturnDetailsForm();
       		oReturnDetails.bindReturnDetails();
       		  var bus = sap.ui.getCore().getEventBus();
       			bus.publish("nav", "back");
      	  }});
		// Responsive Grid Layout
		var oOnlineReservationLayout = new sap.ui.layout.form.ResponsiveGridLayout("idOnlineReservationLayout");
		
		// Buttons
		/*var oBtnOnlineResPrint = new sap.m.Button({
            text : "Print",
            type:sap.m.ButtonType.Unstyled,
            icon: sap.ui.core.IconPool.getIconURI("print"),
            press:function(){
                  alert("Print CLicked");
                  //oController.submitReleaseClicked();
            }
         }).addStyleClass("submitBtn");
  */
         
         var oBtnOnlineResExport = new sap.m.Button({
            text : "Export To Excel",
            type:sap.m.ButtonType.Unstyled,
            width:"145px",
            icon: sap.ui.core.IconPool.getIconURI("excel-attachment"),
            press:function(){
            	 var vTitle = "Redelivery Details";
            	// var objUtil = new utility();
            	 objUtil.makeHTMLTable(jsonExistingReturnsDetailsDetailOR, vTitle,"export");
            }
         }).addStyleClass("submitBtn");
         
       /*  var oBtnCancelReturn = new sap.m.Button({
        	 text : "Cancel Return",
             styled:false,
             width:"115px",
             press:function(){
                   oCurrent.cancelReturn();
             }
          }).addStyleClass("submitBtn");*/
		
         var oBtnViewAll = new sap.m.Button("idBtnViewAllRetDetsDetOR",{
             text : "View All",
             styled:false,
             width:"80px",
             press:function(){
            	 oBtnViewAll.setVisible(false);
                 var vArrayLength = aOnlineReservationOR.length;
		        	if(vArrayLength < 100){
		        		sap.ui.getCore().byId("idRetDetsDetailTblOR").setVisibleRowCount(vArrayLength);
		        		sap.ui.getCore().byId("idRetDetsDetailTblOR").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		        	}
		        	else{
		        		sap.ui.getCore().byId("idRetDetsDetailTblOR").setVisibleRowCount(100);
		        		sap.ui.getCore().byId("idRetDetsDetailTblOR").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		        	}
             }
          }).addStyleClass("submitBtn");
         var lblSpace = new sap.ui.commons.Label( {text: " ",width : '5px'});
         var oFlexBoxRetDetsDEtTblFooter = new sap.m.FlexBox({
     		width: "100%",
     		items:[
     		        oBtnViewAll	//,lblSpace,oBtnCancelReturn
     		],
     		direction: "Row"
     	}).addStyleClass("marginTop10");
         
		// Flex Box
	    var oFlexBoxOResPrintExp = new sap.m.FlexBox({
    		width: "30%",
    		items:[
    		        oBtnOnlineResExport,
					//oBtnOnlineResPrint					
    		],
    		direction: sap.m.FlexDirection.RowReverse
    	});
	    
	    var oLabelTblTitle = new sap.ui.commons.Label({text: "Redelivery Details",
 			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: true, margin: false}),
             wrapping: true}).addStyleClass("font15Bold marginTop10");
	    
	    var oFlexboxRetDetsDetTableTitle = new sap.m.FlexBox({
	   		  items: [oLabelTblTitle ],
	   		  width:"70%",
	   		  direction: "Row"
	   		});
	         
	         var oFlexboxRetDetsDetTableHeader = new sap.m.FlexBox({
	      		  items: [oFlexboxRetDetsDetTableTitle,oFlexBoxOResPrintExp],
	      		  width:"100%",
	      		  direction: "Row"
	      		});
	         
	 // Table
		var oOnlineReservationTable = new sap.ui.table.Table("idRetDetsDetailTblOR",{
			visibleRowCount: 25,
	        firstVisibleRow: 3,
	        columnHeaderHeight: 30,
	        selectionMode: sap.ui.table.SelectionMode.None,
	        navigationMode: sap.ui.table.NavigationMode.Paginator,
	        width: "100%",
	        height:"100%"
    	 }).addStyleClass("fontStyle tblBorder marginTop10");
		
			// Table Columns
			/*oOnlineReservationTable.addColumn(new sap.ui.table.Column({
		        template: new sap.ui.commons.CheckBox().bindProperty("checked", "isChecked").bindProperty("enabled","isEnabled"),
		        sortProperty: "checked",
		        filterProperty: "checked",
		        resizable:false,
	 	        width:"25px",
		        hAlign: "Center"
				}));*/
		
			oOnlineReservationTable.addColumn(new sap.ui.table.Column({
		     label: new sap.ui.commons.Label({text: "Lease"}),
 	         template: new sap.ui.commons.TextView().bindProperty("text", "Lease"),
 	         sortProperty: "Lease",
 	         filterProperty: "Lease",
 	        resizable:false,
 	        width:"90px",
			 }));
			 
			oOnlineReservationTable.addColumn(new sap.ui.table.Column({
				 label: new sap.ui.commons.Label({text: "Return"}),
				 template: new sap.ui.commons.TextView().bindProperty("text", "Ordno"),
	 	         sortProperty: "Ordno",
	 	         filterProperty: "Ordno",
	 	        resizable:false,
	 	        width:"60px",
				 }));
			 
			oOnlineReservationTable.addColumn(new sap.ui.table.Column({
				 label: new sap.ui.commons.Label({text: "Unit Type"}),
				 template: new sap.ui.commons.TextView().bindProperty("text", "UnitType"),
	 	         sortProperty: "UnitType",
	 	         filterProperty: "UnitType",
	 	        resizable:false,
	 	        width:"90px",
				 }));
			 
			oOnlineReservationTable.addColumn(new sap.ui.table.Column({
				 label: new sap.ui.commons.Label({text: "Location"}),
				 template: new sap.ui.commons.TextView().bindProperty("text", "Location"),
	 	         sortProperty: "Location",
	 	         filterProperty: "Location",
	 	        resizable:false,
	 	        width:"110px",
				 }));
			 
			oOnlineReservationTable.addColumn(new sap.ui.table.Column({
				 label: new sap.ui.commons.Label({text: "Depot"}),
				 template: new sap.ui.commons.TextView().bindProperty("text", "Depot"),
	 	         sortProperty: "Depot",
	 	         filterProperty: "Depot",
	 	        resizable:false,
	 	        width:"240px",
				 }));
			 
			oOnlineReservationTable.addColumn(new sap.ui.table.Column({
				 label: new sap.ui.commons.Label({text: "Off-Hire Date",}),
				 template: new sap.ui.commons.TextView().bindProperty("text", "OffhireDate"),
	 	         sortProperty: "OffhireDateActual",
	 	         filterProperty: "OffhireDate",
	 	        resizable:false,
	 	        width:"100px",
				 }));
			 
			oOnlineReservationTable.addColumn(new sap.ui.table.Column({
				 label: new sap.ui.commons.Label({text: "Unit Number"}),
				 template: new sap.ui.commons.TextView().bindProperty("text", "UnitNumber"),
	 	         sortProperty: "UnitNumber",
	 	         filterProperty: "UnitNumber",
	 	        resizable:false,
	 	        width:"140px",
				 }));
			 
		    	// Flex Box
			    var oFlexBoxAll = new sap.m.FlexBox({
		    		width: "100%",
		    		items:[
							oFlexboxRetDetsDetTableHeader,
							oOnlineReservationTable,
							oFlexBoxRetDetsDEtTblFooter
		    		],
		    		direction: "Column"
		    	});
		    	
		    	// Online Form Starts
				var oOnlineReservationForm = new sap.ui.layout.form.Form("idOnlineReservationForm",{
					                layout: oOnlineReservationLayout,
					                formContainers: [
					                        
					                        new sap.ui.layout.form.FormContainer("idOnlineReservationFormC1",{
					                               // title: "Online Reservation - Return in Last 1 Year", 
					                                formElements: [
																new sap.ui.layout.form.FormElement({
																    fields: [backRetDetsDetOR],
																    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
																}),
																new sap.ui.layout.form.FormElement({
																    fields: [oFlexBoxAll]
																})
					                                        ]
					                        })		                        
					                ]
					        });
					        	return oOnlineReservationForm;
	}, //createOnlineReservation
	
	bindReturnDetailsDetail:function(){
		busyDialog.open();
		var oCurrent=this;
		var urlToCall = serviceUrl + "/Return_Detail_Details?$filter=Ordno eq '" + vClickedReturn_ReturnDetTbl + "'";
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
		    	//var objUtil = new utility();
		    	aOnlineReservationOR = [];
		    	jsonExistingReturnsDetailsDetailOR = [];
		    	ExistingReturnsDetailsDetailOR = [];
		    	var vReturnDetailsDetTable = sap.ui.getCore().byId("idRetDetsDetailTblOR");
		    	var vBtnViewAll = sap.ui.getCore().byId("idBtnViewAllRetDetsDetOR");
		    	var len = data.results.length;
		    	if(len>0){
		    		var enableChkbox = false;
			    	//aOnlineReservationOR = data.results;
			    	for(var i=0 ; i <len ; i++){
				    		data.results[i].Lease = objUtil.removeLeadZero(data.results[i].Lease);
					    	var vOffHireDt = data.results[i].OffhireDate.split("(");
							var vDate= vOffHireDt[1].split(")");
							var vOffhireDateActual = new Date(Number(vDate[0]));
							var vformattedOffHireDt = dateFormat(new Date(Number(vDate[0])), 'dd-mm-yyyy',"UTC");
							  if (vformattedOffHireDt.substring(6) === "9999"){
								  data.results[i].OffhireDate =  "Return\nAuthorized";
								  enableChkbox = true;
							  }
							  else if (vformattedOffHireDt.substring(6) === "9998"){
								  data.results[i].OffhireDate =  "Return Item\nCancelled";
								  enableChkbox = false;
							  }
							  else if (vformattedOffHireDt.substring(6) === "9997"){
								  data.results[i].OffhireDate =  "Return\nExpired";
								  enableChkbox = false;
							  }
							  else{
								  data.results[i].OffhireDate = vformattedOffHireDt;
								  enableChkbox = false;
							  } 
							  //to chk for same location n depot
							  var helpValueDetsDEt = data.results[i].Ordno+"$"+data.results[i].UnitType+"$"+data.results[i].Location+"$"+data.results[i].Depot;
							  if(vHelpValueRetDet == helpValueDetsDEt){
								  ExistingReturnsDetailsDetailOR.push({
									  'Lease':data.results[i].Lease,
							            'Ordno':data.results[i].Ordno,
							            'UnitType':data.results[i].UnitType,
							            'Location':data.results[i].Location,
							            'Depot':data.results[i].Depot,
							            'OffhireDate':data.results[i].OffhireDate,
							            'OffhireDateActual':vOffhireDateActual,
							            'UnitNumber':data.results[i].UnitNumber,
							            'isChecked':false,
							            'isEnabled':enableChkbox,
								  });
							  }
					}
			    	for(var i=0 ; i <ExistingReturnsDetailsDetailOR.length ; i++){
						  jsonExistingReturnsDetailsDetailOR.push({
							  	'Lease':ExistingReturnsDetailsDetailOR[i].Lease,
					            'Return':ExistingReturnsDetailsDetailOR[i].Ordno,
					            'Unit Type':ExistingReturnsDetailsDetailOR[i].UnitType,
					            'Location':ExistingReturnsDetailsDetailOR[i].Location,
					            'Depot':ExistingReturnsDetailsDetailOR[i].Depot,
					            'Off-Hire Date':ExistingReturnsDetailsDetailOR[i].OffhireDate,
					            'Unit Number':ExistingReturnsDetailsDetailOR[i].UnitNumber,
					        });
			    	}
			    	//Create a model and bind the table rows to this model
			    	var oModelReturnDetailsDet = new sap.ui.model.json.JSONModel();
			    	oModelReturnDetailsDet.setData({modelData: ExistingReturnsDetailsDetailOR});
			    	vReturnDetailsDetTable.setModel(oModelReturnDetailsDet);
			    	vReturnDetailsDetTable.bindRows("/modelData");
			    	var vLen = ExistingReturnsDetailsDetailOR.length;
			    	if(vLen < 25){
			    		vReturnDetailsDetTable.setVisibleRowCount(vLen);
			    		vReturnDetailsDetTable.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
			    		vBtnViewAll.setVisible(false);
			    	}
			    	else{
			    		vReturnDetailsDetTable.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
			    		vReturnDetailsDetTable.setVisibleRowCount(25);
			    		vBtnViewAll.setVisible(true);
			    	}
			    	busyDialog.close();
		    	}
		    	else{
		    		 sap.ui.commons.MessageBox.show("No results found. Please try again later.",
		                     sap.ui.commons.MessageBox.Icon.WARNING,
		                     "Warning",
		                     [sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO], 
		                     oCurrent.fnCallbackMessageBox,
		                         sap.ui.commons.MessageBox.Action.YES); 
		    		 busyDialog.close();
		    	}
		    },
		    function(err){
		    	busyDialog.close();
		    	errorfromServer(err);
		    }); //odata request
	}, //bindReturnDetailsDetail
	
	cancelReturn: function(){
		busyDialog.open();
		var detailTbl = sap.ui.getCore().byId("idRetDetsDetailTblOR");
		//loggedIncustomerOR = $("idComboCustomerOR").getValue();
		loggedInUserTypeOR = objLoginUser.getLoggedInUserType();
		loggedIncustomerOR = $("#idComboCustomerOR").val();
		if(loggedInUserTypeOR == "CUSTOMER"){
			customerOR = loggedIncustomerOR;
		}
		else{
			var selCustomer = jQuery.grep(CustomerDataCombo, function(element, index){
		        return element.CustName == loggedIncustomerOR;
			});
				 customerOR = selCustomer[0].Partner;
		}
		
		
		if(loggedIncustomerOR != ""){
			/*var selCustomer = jQuery.grep(CustomerDataCombo, function(element, index){
		        return element.CustName == loggedIncustomerOR;
			});
			
				var customerOR = selCustomer[0].Partner;*/
				
			var NoChkBoxCheckedMessage = "No units selected for cancelling Return.\n " +
				"Please select the required unit(s) and retry.";
			var Row = [];
			var count = 0;
			var aCancelRet = jQuery.grep(ExistingReturnsDetailsDetailOR, function(element, index){
	            return element.isChecked == true;
			});
			if(aCancelRet.length == 0){
				sap.ui.commons.MessageBox.show(NoChkBoxCheckedMessage,
	                    sap.ui.commons.MessageBox.Icon.WARNING,
	                    "Warning",
	                    [sap.ui.commons.MessageBox.Action.OK], 
	                        sap.ui.commons.MessageBox.Action.OK);
				 busyDialog.close();
			}
			else{
				var urlToCall = serviceUrl + "/Return_Mail?$filter=Lease eq '" + customerOR + "' and ";
				for(var j=0 ; j< aCancelRet.length ; j++){
					var date = aCancelRet[j].OffhireDate.split("-");
					var formattedDate = date[2]+date[1]+date[0];
					 Row[count] = aCancelRet[j].Lease + "," + aCancelRet[j].Ordno + "," + aCancelRet[j].UnitType + "," +
					 aCancelRet[j].Location + "," +aCancelRet[j].Depot + "," + formattedDate + "," + 
					 			 aCancelRet[j].UnitNumber;
					 count++;
					// break;
				}
				for(var k=0 ; k < Row.length ; k++){
					if(k != (Row.length-1)){
						urlToCall = urlToCall + " ReturnData" + (k+1) + " eq '" + Row[k] + "' and";
					}
					else{
						urlToCall = urlToCall + " ReturnData" + (k+1) + " eq '" + Row[k] + "'";
					}
				}
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
				    	 var arrayLen = ExistingReturnsDetailsDetailOR.length;
				            for(var i=arrayLen-1; i>=0; i--){
				                   if(ExistingReturnsDetailsDetailOR[i].isChecked){
				                	   ExistingReturnsDetailsDetailOR.splice(i,1);
				                	   detailTbl.getModel().updateBindings();
				                         arrayLen = arrayLen - 1;
				                   }
				            }
				            vArrayLength = ExistingReturnsDetailsDetailOR.length;
				            if(vArrayLength < 25){
				            	detailTbl.setVisibleRowCount(vArrayLength);
				            	detailTbl.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
				        	}
				        	else{
				        		detailTbl.setVisibleRowCount(25);
				        		detailTbl.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
				        	}
				            var SuccessMsg = "";
				            var msg = data.results[0].MsgReceivers;
				            if(msg.toLowerCase() != "unable to send email to:"){
					            SuccessMsg = msg + "\n\n";
						           // var recipients = data.results[0].ReturnData1;
						            var recipients = data.results[0].ReturnData1 + data.results[0].ReturnData2 + data.results[0].ReturnData3 + data.results[0].ReturnData4 + data.results[0].ReturnData5 +
						            				   data.results[0].ReturnData6 + data.results[0].ReturnData7 + data.results[0].ReturnData8 + data.results[0].ReturnData9 + data.results[0].ReturnDa10 +
						            				   data.results[0].ReturnData11 + data.results[0].ReturnData12 + data.results[0].ReturnData13 + data.results[0].ReturnData14 + data.results[0].ReturnData15 +
						            				   data.results[0].ReturnData16 + data.results[0].ReturnData17 + data.results[0].ReturnData18 + data.results[0].ReturnData19 + data.results[0].ReturnData20 +
						            				   data.results[0].ReturnData21 + data.results[0].ReturnData22 + data.results[0].ReturnData23 + data.results[0].ReturnData24 + data.results[0].ReturnData25 ;
						            if (recipients.length > 9){
						            	if(recipients.substring(recipients.length - 9) == "undefined")
						            		recipients = recipients.substring(0,recipients.length - 9);
						            }
						            	
						            
						            var splitRec = recipients.split("|");
						            var customer = splitRec[0].split("$");
						            
						            if(customer.length > 1){
						            	for(var i=0;i<customer.length;i++){
						            		if(i==0)
						            			SuccessMsg += "Customer:" + "\n" + customer[i].substring(2) + "\n";
						            		else{
						            			SuccessMsg += customer[i] + "\n";
						            		}
						            		
						            	}
						            	
						            }
						            else{
						            	SuccessMsg += "Customer:" + "\n" + customer[0].substring(2);
						            }
						            
						            var cs = splitRec[1].split("$");
						            SuccessMsg += "\n\n";
						            if(cs.length > 1){
						            	for(var i=0;i<cs.length;i++){
						            		if(i==0)
						            			SuccessMsg += "CS Team:" + "\n" + cs[i].substring(3) + "\n";
						            		else{
						            			SuccessMsg += cs[i] + "\n";
						            		}
						            		
						            	}
						            	
						            }
						            else{
						            	SuccessMsg += "CS Team:" + "\n" + cs[0].substring(3);
						            }
				            }
				            else{
				            	SuccessMsg = msg.substring(0,20);
				            }
				            sap.ui.commons.MessageBox.alert(SuccessMsg);
				    	 busyDialog.close();
				    },
				    function(err){
				    	busyDialog.close();
				    	errorfromServer(err);
				    }); //odata request
			}
		}
	}
});
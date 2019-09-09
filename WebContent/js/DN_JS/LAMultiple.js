jQuery.sap.require("sap.ui.model.json.JSONModel");

var odnjsA;
var depotCodeLA26 = "";
var  LAProcessingMsg = "";
var processingDone = false;

sap.ui.model.json.JSONModel.extend("LAMultiple", {
	
		createScreenFlex:function(){
			
			var oScreenFlex = new sap.m.FlexBox("oLAMultipleApproveScreenFlex",{
				  items: [ ],
			});
			return oScreenFlex;
		},
		createDNJSApprove:function(){
			odnjsA = this;
			var back = new sap.m.Link({text: " < Back",
				width:"8%",
				wrapping:true,
	            press: function(){
	                   var bus = sap.ui.getCore().getEventBus();
	                       bus.publish("nav", "back");
	                       $('#idHdrContnt').html(LAfromScreen); //CHANGE HEADER CONTENT
	        }});
			
			var oMultipleTable = new sap.ui.table.Table("DNJS_ApproveTbl",{
		        visibleRowCount: 5,
		        firstVisibleRow: 1,
		        columnHeaderHeight: 30,
		        selectionMode: sap.ui.table.SelectionMode.None,
		        //navigationMode: sap.ui.table.NavigationMode.Paginator,
		     }).addStyleClass("tblBorder marginTop10");
			
			oMultipleTable.addColumn(new sap.ui.table.Column({
		        label: new sap.ui.commons.Label({text: "DN/JS Number"}),
		        template: new sap.ui.commons.TextView().bindProperty("text", "DnJsNo"),
		        sortProperty: "DnJsNo",
		        filterProperty: "DnJsNo",
		        resizable:false,
		        width: "60px",
			}));
			oMultipleTable.addColumn(new sap.ui.table.Column({
		        label: new sap.ui.commons.Label({text: "Unit Number"}),
		        template: new sap.ui.commons.TextView().bindProperty("text", "UnitNumber"),
		        sortProperty: "UnitNumber",
		        filterProperty: "UnitNumber",
		        resizable:false,
		        width: "80px",
			}));
			oMultipleTable.addColumn(new sap.ui.table.Column({
		        label: new sap.ui.commons.Label({text: "Amount"}),
		        template: new sap.ui.commons.TextView().bindProperty("text", "Amount"),
		        sortProperty: "Amount",
		        filterProperty: "Amount",
		        resizable:false,
		        width: "80px",
			}));
			oMultipleTable.addColumn(new sap.ui.table.Column({
		        label: new sap.ui.commons.Label({text: "Currency"}),
		        template: new sap.ui.commons.TextView().bindProperty("text", "Currency"),
		        sortProperty: "Currency",
		        filterProperty: "Currency",
		        resizable:false,
		        width: "80px",
			}));
			oMultipleTable.addColumn(new sap.ui.table.Column({
		        label: new sap.ui.commons.Label({text: "Approval Reference"}),
		        template: new sap.ui.commons.TextField().bindProperty("value", "ApprovalReff").addStyleClass("FormInputStyle editableTfBorder"),
	        	sortProperty: "ApprovalReff",
	        	filterProperty: "ApprovalReff",
	        	resizable:false,
	        	width: "100px",
			}));
			
			var oModelDateLA = new sap.ui.model.json.JSONModel();
			oModelDateLA.setData({
                   dateValue: new Date()
            });
            var oDate = new sap.ui.commons.DatePicker("dateLA",{
                width: "120px",
                change:function(){
                       var editDate = this.getValue().split("-");
                       editDate = editDate[2]+editDate[1]+editDate[0];
                       // alert("chngd date " + editDate);
                       var id = this.sId.replace('dateLA-col5','dateTxtLA-col6');
                       var odateTxt = sap.ui.getCore().byId(id);
                       odateTxt.setText(editDate);
                },
                value: {
                       path: "/dateValue",
                type: new sap.ui.model.type.Date({pattern: "dd-MM-yyyy"})},
              }).addStyleClass("FormInputStyle");
        
            oDate.setModel(oModelDateLA);
            
            oMultipleTable.addColumn(new sap.ui.table.Column({
                label: new sap.ui.commons.Label({text: "Approval Date"}),
                template: oDate.addStyleClass("editableDpBorder"),
                sortProperty: "ApprovalDate",
                filterProperty: "ApprovalDate",
                width: "130px",
               resizable:false
            }));

			oMultipleTable.addColumn(new sap.ui.table.Column({
		        label: new sap.ui.commons.Label({text: "DateTXT"}),
		        template: new sap.ui.commons.TextView("dateTxtLA").bindProperty("text", "ApprovalDateTXT"),
        		sortProperty: "ApprovalDateTXT",
        		filterProperty: "ApprovalDateTXT",
        		width: "0px",
        		resizable:false,
			}));
			
			 var btnSubmit = new sap.m.Button({
	 	          text : "Submit",
	 	          type:sap.m.ButtonType.Unstyled,
	 	          width:"80px",
	 	          layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4"}),
	 	          press:function(){ 
	 	        	 // Without Considering Req 15 LA Multiple 
	 	        	 /*if(odnjsA.validate()){
	 	        		 busyDialog.open();
	 	        		 LAProcessingMsg = "";
	 	        		 odnjsA.approveDNJS();
	 	        	 }*/
	 	        	  
	 	        	 // Considering Req 15 LA Multiple 
	 	        	  if(odnjsA.validate()){
	 	        		  odnjsA.submitLA();
	 	        	  }
	 	        	  else{
	 	        		 var aler = "Cannot Submit DN/JS Approval due to missing Approval Reference. \nPlease enter your Approval Reference  code and retry";
	 	        		 sap.ui.commons.MessageBox.alert(aler);
	 	        	  }
	 	        	  
	 	          }
	 		}).addStyleClass("submitBtn");
	 	
	 		
	 		var btnReset = new sap.m.Button({
	 	          text : "Reset",
	 	          type:sap.m.ButtonType.Unstyled,
	 	          width:"80px",
	 	          layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4"}),
	 	          press:function(){
	 	        	 jQuery.sap.require("sap.ui.commons.MessageBox");
		        	  sap.ui.commons.MessageBox.show("This will reset all the approval inputs. Do you want to continue?",
	    			  sap.ui.commons.MessageBox.Icon.WARNING,
	    			  "Warning",
	    			  [sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO], 
	    			  odnjsA.fnCallbackMessageBox,
	    			  sap.ui.commons.MessageBox.Action.YES);	
	 	          }
	 		}).addStyleClass("submitBtn");
			
	 		var lblSpace = new sap.ui.commons.Label( {text: " ",width : '8px'});
	        
	        var oFlexboxButtons = new sap.m.FlexBox({
	          items: [
	            btnSubmit,lblSpace,
	            btnReset
	          ],
	          direction: "Row",
	        }).addStyleClass("margin10");
	        
	 		var oDnjsmultipleFrmGLayout = new sap.ui.layout.form.ResponsiveGridLayout({
	 			  emptySpanL: 0,
		          emptySpanM: 0,
		          emptySpanS: 0,  
				  labelSpanL: 1,
		          labelSpanM: 1,
		          labelSpanS: 1,
		          columnsL: 1,
		          columnsM: 1,
		          columnsS: 1,
		          breakpointL: 765,
				  breakpointM: 320
	 		});
			 var oDnjsmultipleForm1 = new sap.ui.layout.form.Form({
		 			layout: oDnjsmultipleFrmGLayout,
		 			formContainers: [
		 			                 
		 				new sap.ui.layout.form.FormContainer({
		 					//title: "Approve DN/JS - Multiple",
		 					formElements: [
								new sap.ui.layout.form.FormElement({
									fields: [back],
									layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
								}),				
								new sap.ui.layout.form.FormElement({
									    fields: [oMultipleTable],
									    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
								}),
														  			 					    
		 					]
		 				}),
							
		 				new sap.ui.layout.form.FormContainer("DJ_NSmultipleFormC3",{
		                    formElements: [
		                            new sap.ui.layout.form.FormElement({
		                                fields: [oFlexboxButtons],
		                                layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4"})
		                            })
		                   ],layoutData: new sap.ui.commons.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		                }),	
		 				
		 				]
		 		});
			 //return oDnjsmultipleForm1;
			 sap.ui.getCore().byId("oLAMultipleApproveScreenFlex").addItem(oDnjsmultipleForm1);
		},
		bindDNJS_Approve:function(){
			//alert("bind" + DNJS_ApproveData.length);
			if(DNJS_ApproveData.length>0){
				var oModelm1 = new sap.ui.model.json.JSONModel();
				oModelm1.setData(DNJS_ApproveData);
				var oMultipleTable = sap.ui.getCore().byId("DNJS_ApproveTbl");
				oMultipleTable.setModel(oModelm1);
				oMultipleTable.bindRows("/");
				oMultipleTable.setVisibleRowCount(DNJS_ApproveData.length);
			}
		},
		validate:function(){
			var isValid = true; 
			
			for(var i=0;i<DNJS_ApproveData.length;i++){
				if(DNJS_ApproveData[i].ApprovalReff.length == 0){
					isValid = false;
					break;
				}
			}
			
			return isValid;
		},
		
		submitLA: function(){
			
			//var depotCodeLAToPass = "";
			var stringToPass = "";
			var stringCount = 1;
			
			for(var i=0; i<DNJS_ApproveData.length; i++){
				var outDate = DNJS_ApproveData[i].ApprovalDateTXT;
				if(stringToPass == ""){
					stringToPass = "ILessee" + stringCount + " eq '" + 
								   DNJS_ApproveData[i].UnitNumber + 
								   "$" + depotCodeLA26 + 
								   "$" + outDate + 
								   "$" + DNJS_ApproveData[i].ApprovalReff + 
								   "$"+ // Approver Name - Blank
								   "$" + DNJS_ApproveData[i].amt + "'";
				}
				else{
					stringToPass = stringToPass + " and ILessee" + stringCount + " eq '" + 
								   DNJS_ApproveData[i].UnitNumber  + 
								   "$" + depotCodeLA26 + 
								   "$" + outDate + 
								   "$" + DNJS_ApproveData[i].ApprovalReff + 
								   "$" + // Approver Name - Blank
								   "$" + DNJS_ApproveData[i].amt + "'";
				}
				stringCount++;
			}
			
			var filter = "/LESSEE_APPROVAL_ECC?$filter=" + stringToPass;
			//alert("Service URL : "+serviceUrl + filter);
			
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
			    	if(data.results[0].Type == "NE"){
			    		var errorString = "Unable to process Lessee Approval at this time. Please try again later.";
				    	sap.ui.commons.MessageBox.alert(errorString);
			    	}else{
			    		LAProcessingMsg = "Lessee Approval submitted successfully";
				    	odnjsA.approveDNJS();
			    	}
			    },
			    function(err){
			    	//LAProcessingMsg = "Data has been submitted for processing. Please check the processing status for each record via the Portal Processing Log after some time.";
			    	//errorfromServer(err);
			    	busyDialog.close();
			    	var errorString = "Unable to process Lessee Approval at this time. Please try again later.";
			    	sap.ui.commons.MessageBox.alert(errorString);
			    });
		},

		approveDNJS:function(){
			
			/*var showMsg = false; 
			for(var i=0;i<DNJS_ApproveData.length;i++){
				if(DNJS_ApproveData[i].ApprovalReff.length == 0){
					showMsg = true;
					break;
				}
			}
			
			if(showMsg){
				var aler = "Cannot Submit DN/JS Approval due to missing Approval Reference. \nPlease enter your Approval Reference  code and retry";
				sap.ui.commons.MessageBox.alert(aler);
				
			}else{*/
				var retData1 ="", retData2 = "", retData3 ="", retData4 ="", retData5 ="", retData6 ="", retData7 ="", retData8 ="", retData9 ="", retData10 ="";
				var retData11 ="", retData12 ="", retData13 ="", retData14 ="", retData15 ="", retData16 ="", retData17 ="", retData18 ="", retData19 ="", retData20 ="";
				var retData21 ="", retData22 ="", retData23 ="", retData24 ="", retData25 ="";
				
				for(var i=0;i<DNJS_ApproveData.length;i++){
					
					if(i == 0)
						retData1 = DNJS_ApproveData[i].DnJsNo + "," + DNJS_ApproveData[i].UnitNumber+ "," + DNJS_ApproveData[i].amt+ ","+DNJS_ApproveData[i].Currency+ ","+DNJS_ApproveData[i].ApprovalReff+","+DNJS_ApproveData[i].ApprovalDateTXT;

					
					if(i == 1)
						retData2 = DNJS_ApproveData[i].DnJsNo+","+DNJS_ApproveData[i].UnitNumber+","+DNJS_ApproveData[i].amt+","+DNJS_ApproveData[i].Currency+","+DNJS_ApproveData[i].ApprovalReff+","+DNJS_ApproveData[i].ApprovalDateTXT;

					
					if(i == 2)
						retData3 = DNJS_ApproveData[i].DnJsNo+","+DNJS_ApproveData[i].UnitNumber+","+DNJS_ApproveData[i].amt+","+DNJS_ApproveData[i].Currency+","+DNJS_ApproveData[i].ApprovalReff+","+DNJS_ApproveData[i].ApprovalDateTXT;

					
					if(i == 3)
						retData4 = DNJS_ApproveData[i].DnJsNo+","+DNJS_ApproveData[i].UnitNumber+","+DNJS_ApproveData[i].amt+","+DNJS_ApproveData[i].Currency+","+DNJS_ApproveData[i].ApprovalReff+","+DNJS_ApproveData[i].ApprovalDateTXT;

					
					if(i == 4)
						retData5 = DNJS_ApproveData[i].DnJsNo+","+DNJS_ApproveData[i].UnitNumber+","+DNJS_ApproveData[i].amt+","+DNJS_ApproveData[i].Currency+","+DNJS_ApproveData[i].ApprovalReff+","+DNJS_ApproveData[i].ApprovalDateTXT;

					
					if(i == 5)
						retData6 = DNJS_ApproveData[i].DnJsNo+","+DNJS_ApproveData[i].UnitNumber+","+DNJS_ApproveData[i].amt+","+DNJS_ApproveData[i].Currency+","+DNJS_ApproveData[i].ApprovalReff+","+DNJS_ApproveData[i].ApprovalDateTXT;
			
					
					if(i == 6)
						retData7 = DNJS_ApproveData[i].DnJsNo+","+DNJS_ApproveData[i].UnitNumber+","+DNJS_ApproveData[i].amt+","+DNJS_ApproveData[i].Currency+","+DNJS_ApproveData[i].ApprovalReff+","+DNJS_ApproveData[i].ApprovalDateTXT;
					
					
					if(i==7)
						retData8 = DNJS_ApproveData[i].DnJsNo+","+DNJS_ApproveData[i].UnitNumber+","+DNJS_ApproveData[i].amt+","+DNJS_ApproveData[i].Currency+","+DNJS_ApproveData[i].ApprovalReff+","+DNJS_ApproveData[i].ApprovalDateTXT;
					
					
					if(i==8)
						retData9 = DNJS_ApproveData[i].DnJsNo+","+DNJS_ApproveData[i].UnitNumber+","+DNJS_ApproveData[i].amt+","+DNJS_ApproveData[i].Currency+","+DNJS_ApproveData[i].ApprovalReff+","+DNJS_ApproveData[i].ApprovalDateTXT;
					
					
					if(i==9)
						retData10 = DNJS_ApproveData[i].DnJsNo+","+DNJS_ApproveData[i].UnitNumber+","+DNJS_ApproveData[i].amt+","+DNJS_ApproveData[i].Currency+","+DNJS_ApproveData[i].ApprovalReff+","+DNJS_ApproveData[i].ApprovalDateTXT;
					
					
					if(i==10)
						retData11 = DNJS_ApproveData[i].DnJsNo+","+DNJS_ApproveData[i].UnitNumber+","+DNJS_ApproveData[i].amt+","+DNJS_ApproveData[i].Currency+","+DNJS_ApproveData[i].ApprovalReff+","+DNJS_ApproveData[i].ApprovalDateTXT;
					
					if(i==11)
						retData12 = DNJS_ApproveData[i].DnJsNo+","+DNJS_ApproveData[i].UnitNumber+","+DNJS_ApproveData[i].amt+","+DNJS_ApproveData[i].Currency+","+DNJS_ApproveData[i].ApprovalReff+","+DNJS_ApproveData[i].ApprovalDateTXT;
					
					
					if(i==12)
						retData13 = DNJS_ApproveData[i].DnJsNo+","+DNJS_ApproveData[i].UnitNumber+","+DNJS_ApproveData[i].amt+","+DNJS_ApproveData[i].Currency+","+DNJS_ApproveData[i].ApprovalReff+","+DNJS_ApproveData[i].ApprovalDateTXT;
					
					
					if(i==13)
						retData14 = DNJS_ApproveData[i].DnJsNo+","+DNJS_ApproveData[i].UnitNumber+","+DNJS_ApproveData[i].amt+","+DNJS_ApproveData[i].Currency+","+DNJS_ApproveData[i].ApprovalReff+","+DNJS_ApproveData[i].ApprovalDateTXT;
				
					
					if(i==14)
						retData15 = DNJS_ApproveData[i].DnJsNo+","+DNJS_ApproveData[i].UnitNumber+","+DNJS_ApproveData[i].amt+","+DNJS_ApproveData[i].Currency+","+DNJS_ApproveData[i].ApprovalReff+","+DNJS_ApproveData[i].ApprovalDateTXT;
					
					if(i==15)
						retData16 = DNJS_ApproveData[i].DnJsNo+","+DNJS_ApproveData[i].UnitNumber+","+DNJS_ApproveData[i].amt+","+DNJS_ApproveData[i].Currency+","+DNJS_ApproveData[i].ApprovalReff+","+DNJS_ApproveData[i].ApprovalDateTXT;
					
					
					if(i==16)
						retData17 = DNJS_ApproveData[i].DnJsNo+","+DNJS_ApproveData[i].UnitNumber+","+DNJS_ApproveData[i].amt+","+DNJS_ApproveData[i].Currency+","+DNJS_ApproveData[i].ApprovalReff+","+DNJS_ApproveData[i].ApprovalDateTXT;
					
					
					if(i==17)
						retData18 = DNJS_ApproveData[i].DnJsNo+","+DNJS_ApproveData[i].UnitNumber+","+DNJS_ApproveData[i].amt+","+DNJS_ApproveData[i].Currency+","+DNJS_ApproveData[i].ApprovalReff+","+DNJS_ApproveData[i].ApprovalDateTXT;
					
					
					if(i==18)
						retData19 = DNJS_ApproveData[i].DnJsNo+","+DNJS_ApproveData[i].UnitNumber+","+DNJS_ApproveData[i].amt+","+DNJS_ApproveData[i].Currency+","+DNJS_ApproveData[i].ApprovalReff+","+DNJS_ApproveData[i].ApprovalDateTXT;
					
					
					if(i==19)
						retData20 = DNJS_ApproveData[i].DnJsNo+","+DNJS_ApproveData[i].UnitNumber+","+DNJS_ApproveData[i].amt+","+DNJS_ApproveData[i].Currency+","+DNJS_ApproveData[i].ApprovalReff+","+DNJS_ApproveData[i].ApprovalDateTXT;
				
					
					if(i==20)
						retData21 = DNJS_ApproveData[i].DnJsNo+","+DNJS_ApproveData[i].UnitNumber+","+DNJS_ApproveData[i].amt+","+DNJS_ApproveData[i].Currency+","+DNJS_ApproveData[i].ApprovalReff+","+DNJS_ApproveData[i].ApprovalDateTXT;
				
					
					if(i==21)
						retData22 = DNJS_ApproveData[i].DnJsNo+","+DNJS_ApproveData[i].UnitNumber+","+DNJS_ApproveData[i].amt+","+DNJS_ApproveData[i].Currency+","+DNJS_ApproveData[i].ApprovalReff+","+DNJS_ApproveData[i].ApprovalDateTXT;
					
					
					if(i==22)
						retData23 = DNJS_ApproveData[i].DnJsNo+","+DNJS_ApproveData[i].UnitNumber+","+DNJS_ApproveData[i].amt+","+DNJS_ApproveData[i].Currency+","+DNJS_ApproveData[i].ApprovalReff+","+DNJS_ApproveData[i].ApprovalDateTXT;
				
					
					if(i==23)
						retData24 = DNJS_ApproveData[i].DnJsNo+","+DNJS_ApproveData[i].UnitNumber+","+DNJS_ApproveData[i].amt+","+DNJS_ApproveData[i].Currency+","+DNJS_ApproveData[i].ApprovalReff+","+DNJS_ApproveData[i].ApprovalDateTXT;
					
					if(i==24)
						retData25 = DNJS_ApproveData[i].DnJsNo+","+DNJS_ApproveData[i].UnitNumber+","+DNJS_ApproveData[i].amt+","+DNJS_ApproveData[i].Currency+","+DNJS_ApproveData[i].ApprovalReff+","+DNJS_ApproveData[i].ApprovalDateTXT;
					
				}
				
				var filter = "/Approve_Estimate_SendMail?$filter=" +
						           "ReturnData1 eq '"+retData1+
							 "' and ReturnData2 eq '"+retData2+
							 "' and ReturnData3 eq '"+retData3+
							 "' and ReturnData4 eq '"+retData4+
							 "' and ReturnData5 eq '"+retData5+
							 "' and ReturnData6 eq '"+retData6+
							 "' and ReturnData7 eq '"+retData7+
							 "' and ReturnData8 eq '"+retData8+
							 "' and ReturnData9 eq '"+retData9+
							 "' and ReturnData10 eq '"+retData10+
							 "' and ReturnData11 eq '"+retData11+
							 "' and ReturnData12 eq '"+retData12+
							 "' and ReturnData13 eq '"+retData13+
							 "' and ReturnData14 eq '"+retData14+
							 "' and ReturnData15 eq '"+retData15+
							 "' and ReturnData16 eq '"+retData16+
							 "' and ReturnData17 eq '"+retData17+
							 "' and ReturnData18 eq '"+retData18+
							 "' and ReturnData19 eq '"+retData19+
							 "' and ReturnData20 eq '"+retData20+
							 "' and ReturnData21 eq '"+retData21+
							 "' and ReturnData22 eq '"+retData22+
							 "' and ReturnData23 eq '"+retData23+
							 "' and ReturnData24 eq '"+retData24+
							 "' and ReturnData25 eq '"+retData25+"'";

				//alert("Str : "+serviceUrl+filter);
				
				oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
				OData.request({ 
				     requestUri: serviceUrl + filter,
				     //user:"pcsdevl", password:"igate@123",
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
					   
					   if(data.results.length>0){
						   
						   var emailString = data.results[0].ReturnData1 + data.results[0].ReturnData2 + data.results[0].ReturnData3 +data.results[0].ReturnData4 +data.results[0].ReturnData5 +
		                     data.results[0].ReturnData6 + data.results[0].ReturnData7 + data.results[0].ReturnData8 +data.results[0].ReturnData9 +data.results[0].ReturnData10 +
		                     data.results[0].ReturnData11 + data.results[0].ReturnData12 + data.results[0].ReturnData13 +data.results[0].ReturnData14 +data.results[0].ReturnData15 +
		                     data.results[0].ReturnData16 + data.results[0].ReturnData17 + data.results[0].ReturnData18 +data.results[0].ReturnData19 +data.results[0].ReturnData20 +
		                     data.results[0].ReturnData21 + data.results[0].ReturnData22 + data.results[0].ReturnData23 +data.results[0].ReturnData24 +data.results[0].ReturnData25;
		                     
						    var mailText = data.results[0].MsgReceivers;
			    			var userSplit = emailString.split("|");
			    			// Mail for Customer
			    			var emailC = userSplit[0].split("$");
			    			for(var i=0; i <emailC.length; i ++){
			    				if(i == 0)
			    					mailText = mailText + "\n\n" + "Customer :" +"\n"+emailC[i].substr(2);
			    				else
			    					mailText = mailText + "\n"+emailC[i];
			    				
			    			}
			    			// Mail for Customer OPS
			    			var emailCO = userSplit[2].split("$");
			    			for(var i=0; i <emailCO.length; i ++){
			    				if(i == 0)
			    					mailText = mailText + "\n\n" + "Seaco Customer Service Ops :" +"\n"+emailCO[i].substr(3);
			    				else
			    					mailText = mailText + "\n"+emailCO[i];
			    				
			    			}
			    			// Mail for Depot
			    			var emailD = userSplit[1].split("$");
			    			for(var i=0; i <emailD.length; i ++){
			    				if(i == 0)
			    					mailText = mailText + "\n\n" + "Depot :" +"\n"+emailD[i].substr(2);
			    				else
			    					mailText = mailText + "\n"+emailD[i];
			    				
			    			}
			    			var formattedMailText = "";
			    			if(LAProcessingMsg.length > 0)
			    				formattedMailText = LAProcessingMsg + "\n\n"+	mailText;
			    			else
			    				formattedMailText = mailText;
			    			
			    			sap.ui.commons.MessageBox.alert(formattedMailText,odnjsA.fnCallbackMessageAlert);
					 }
				   	
				   },
				   function(err){
				   	errorfromServer(err);
				   });

		},
		
		fnCallbackMessageBox:function(sResult) {
			//alert("Reset");
			if(sResult == "YES"){
				for(var i=0;i<DNJS_ApproveData.length;i++){
					DNJS_ApproveData[i].ApprovalReff = "";
					DNJS_ApproveData[i].ApprovalDateTXT = "";
				}
				var modelDat = sap.ui.getCore().byId("dateLA").getModel();
				modelDat.setData({dateValue: new Date()});
				modelDat.updateBindings();
				sap.ui.getCore().byId("DNJS_ApproveTbl").getModel().updateBindings();

			}
		},
		fnCallbackMessageAlert:function(sResult) {
			var bus = sap.ui.getCore().getEventBus();
			bus.publish("nav", "to", {
                id : "Lessee_approvel"
			});
            $('#idHdrContnt').html("Lessee Approval"); //Back to Header Content
            
            if(olesseA.validateHardCode()){
       		 busyDialog.open();
	        	 olesseA.bindLesseeApproval(); 
            }
		},
		
});

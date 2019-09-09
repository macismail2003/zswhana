// chng mapping in table.. chk usertype n send customer id.. check field name for date n numbers for 0..insert flexboxall into result form element
// check the message - if to be placed when data.results.length == 0
// place the logic to hide/unhide the Cancel RA button
// check export ot excel array name
var aEDRetResultData = [];
var loggedInUserTypeEDRetResult = "";
var ajsonEDRetRASearchResult = [];
var vHelpValueRetDetEDRet= "";
var vCustomerIDEDRet = "";
var flagDelete= "";
sap.ui.model.json.JSONModel.extend("raSearchView", {
	
	createRASearchView: function(){
		var oCurrent = this;
		var oLabelRANumber = new sap.ui.commons.Label({text: "RA Number: ",
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S3",linebreak: true, margin: true}),
			required: true,
            wrapping: true}).addStyleClass("marginTop15");
		
		oInputRANumber = new sap.ui.commons.TextField("idRANumberEDRet",{
    		layoutData: new sap.ui.layout.GridData({span: "L2 M2 S12",linebreak: false, margin: true}),
    		placeholder:"RA Number",
    	}).addStyleClass("FormInputStyle marginTop10 DepotInput38px");
		
		var oBtnSubmit = new sap.m.Button("idBtnSubmitEDRet",{
          text : "Submit",
          width:"80px",
          styled:false,
          press:function(){
        	  if(oCurrent.validateEditReturn()){
        		  flagDelete= "S";
        		  oCurrent.getRADetails();
	        	  }
	      }}).addStyleClass("submitBtn marginTop20");
		 
		 var lblSpaceBtn = new sap.ui.commons.Label( {text: " ",width : '8px'});
		 
		var oBtnReset = new sap.m.Button("idBtnResetEDRet",{
	          text : "Reset",
	          width:"80px",
	          styled:false,
	          press:function(){
	        		  oCurrent.resetRADetailsEDRet();
		      }}).addStyleClass("submitBtn marginTop20");
		
		 var oFlexboxBtn = new sap.m.FlexBox({
             items: [oBtnSubmit,lblSpaceBtn,oBtnReset],
             direction: "Row"
		  }).addStyleClass("marginTop20");
		 
		 var labStar = new sap.ui.commons.Label({text: "* "}).addStyleClass("MandatoryStar");
		  var lblSpaceLegend = new sap.ui.commons.Label( {text: " ",width : '5px'});
		  var labRequired = new sap.ui.commons.Label({text: " Mandatory Field",wrapping: true});
		  var oFlexboxReq = new sap.m.FlexBox({
			 // layoutData: new sap.ui.layout.GridData({span: "L7 M6 S4"}),
             items: [labStar,lblSpaceLegend,labRequired],
             direction: "Row"
		  }).addStyleClass("marginTop10");
		  
		 var oEDRetLayout = new sap.ui.layout.form.ResponsiveGridLayout("idEDRetLayout",{
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
		 
		 var oEDRetForm = new sap.ui.layout.form.Form("idEDRetForm",{
             layout: oEDRetLayout,
             formContainers: [
                     
                     new sap.ui.layout.form.FormContainer("idEDRetFormC1",{
                             //title: "Add Movement Out - Single",
                         formElements: [
											new sap.ui.layout.form.FormElement({
											    fields: [oLabelRANumber, oInputRANumber]
											}),
											new sap.ui.layout.form.FormElement({
											    fields: [oFlexboxBtn]
											}),
											new sap.ui.layout.form.FormElement({
											    fields: [oFlexboxReq]
											})
                                     ]
                     })
             ]
     });
		 
		 var vHDivider1 = new sap.ui.commons.HorizontalDivider({width: "95%", type: "Area", height: "Medium"});
		 
		 var oEDRetResultLayout = new sap.ui.layout.form.ResponsiveGridLayout("idEDRetResultLayout",{
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
		 
		 var oResultForm = new sap.ui.layout.form.Form("idEDRetResultForm",{
             layout: oEDRetResultLayout,
             formContainers: [
                     
                     new sap.ui.layout.form.FormContainer("idEDRetResultFC1",{
                         formElements: [
										new sap.ui.layout.form.FormElement("idEDRetResultFormElement",{
										    fields: [],
										    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
										})
                                     ],
                     }),
             ]
     });
		 
		 var oFlexAll = new sap.m.FlexBox({
	           items: [
						oEDRetForm,
						vHDivider1,
						oResultForm
	           ],
	           direction : "Column",
				});
		 
		 return oFlexAll;
	},
	
	validateEditReturn: function(){
		var vRANumber = sap.ui.getCore().byId("idRANumberEDRet");
		var isValid = true;
		if(vRANumber.getValue().trim().length == 0){
			vRANumber.setValueState(sap.ui.core.ValueState.Error);
			vRANumber.setPlaceholder("Required");
			isValid = false;
		}
		else{
			vRANumber.setValueState(sap.ui.core.ValueState.None);
			vRANumber.setPlaceholder("RA Number");
		}
		
		return isValid;
	},
	
	resetRADetailsEDRet: function(){
		sap.ui.getCore().byId("idRANumberEDRet").setValue("");
		sap.ui.getCore().byId("idRANumberEDRet").setValueState(sap.ui.core.ValueState.None);
		sap.ui.getCore().byId("idRANumberEDRet").setPlaceholder("RA Number");
		sap.ui.getCore().byId("idEDRetResultFormElement").destroyFields();
	},
	
	getRADetails: function(){
		var vRANumber = "";
		var vCust = "";
		var oCurrent = this;
		//code to get the logged in customer id if non-seaco
		var vUserName = objLoginUser.getLoggedInUserName().toUpperCase();
		loggedInUserTypeEDRetResult = objLoginUser.getLoggedInUserType();
		vRANumber = sap.ui.getCore().byId("idRANumberEDRet").getValue().trim();
		if(loggedInUserTypeEDRetResult != "SEACO")
			vCust = "X";
		busyDialog.open();
		//http://sapcgwci.seaco.com:8000/sap/opu/odata/sap/ZNW_SEACO_PORTAL_SECURITY1_4_SRV/Edit_Returns_Detail?$filter=Ordno eq '402337' and Customer eq '100001'


		var urlToCall = serviceUrl + "/Edit_Returns_Detail?$filter=Ordno eq '" + vRANumber + "' and Customer eq '" + vCust + "' and Extra1 eq '" + vUserName + "'";
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
		    	//aEDRetResultData = data.results;
		    	var len = data.results.length;
		    	aEDRetResultData = [];
		    	ajsonEDRetRASearchResult = [];
		    	if(len > 0){
		    		if(data.results[0].Extra1.indexOf("different customer.") != -1){
		    			var msg = data.results[0].Extra1;
			    			sap.ui.commons.MessageBox.show(msg,
				                    sap.ui.commons.MessageBox.Icon.WARNING,
				                    "Warning",
				                    [sap.ui.commons.MessageBox.Action.OK], 
				                        sap.ui.commons.MessageBox.Action.OK);
		    		}
		    		else{
		    		oCurrent.createResultTableEDRetResult();
		    		vCustomerIDEDRet = data.results[0].Customer;
			    	for(var i=0 ; i <len ; i++){
			    		data.results[i].Lease = objUtil.removeLeadZero(data.results[i].Lease);
			    		//alert("lease " + aReturnDetailsOR[i].Lease)
				    	var vExpDt = data.results[i].ExpiryDate.split("(");
						var vDate= vExpDt[1].split(")");
						var vActualDate = new Date(Number(vDate[0]));
						var vformattedExpDt = dateFormat(new Date(Number(vDate[0])), 'dd-mm-yyyy',"UTC");
						  if (vformattedExpDt.substring(6) === "9999"){
							  data.results[i].ExpiryDate =  "-";
						  }
						  else{
							  data.results[i].ExpiryDate = vformattedExpDt;
						  }
						  var helpVal = data.results[i].Ordno+"$"+data.results[i].UnitType+"$"+data.results[i].Location;//+"$"+data.results[i].Depot
						  var helpToPass = data.results[i].Ordno+"$"+data.results[i].UnitType+"$"+data.results[i].Location+"$"+data.results[i].Depot;
						 // alert("help val ret det " + helpVal);
						  aEDRetResultData.push({
							  	'Lease':data.results[i].Lease,
					            'Ordno':data.results[i].Ordno,
					            'UnitType':data.results[i].UnitType,
					            'Location':data.results[i].Location,
					            'Depot':data.results[i].Depot,
					            'TotQty':data.results[i].TotQty,
					            'ReturnQty':data.results[i].ReturnQty,
					            'OutstandQty':data.results[i].OutstandQty,
					            'Status':data.results[i].Status,
					            'ExpiryDate':data.results[i].ExpiryDate,
					            'help':helpVal,
					            'helpValueRetDet':helpToPass
						  });
						  
						  //json for excel
						  ajsonEDRetRASearchResult.push({
							  	'Lease':data.results[i].Lease,
					            'Return':data.results[i].Ordno,
					            'Unit Type':data.results[i].UnitType,
					            'Location':data.results[i].Location,
					            'Depot':data.results[i].Depot,
					            'Total Quantity':data.results[i].TotQty,
					            'Quantity Returned':data.results[i].ReturnQty,
					            'Outstanding Quantity':data.results[i].OutstandQty,
					            'Status':data.results[i].Status,
					            'Expiry Date':data.results[i].ExpiryDate,
						  });
						 // alert("length b4 " + aReturnDetailsOR.length + data.results[i].Depot);
			    	}
			    	
			    	if(data.results[0].Extra1 == "X")
			    		sap.ui.getCore().byId("idBtnCancelRAEDRet").setVisible(true);
			    	else
			    		sap.ui.getCore().byId("idBtnCancelRAEDRet").setVisible(false);
			    	
			    	var oResultTable = sap.ui.getCore().byId("idEDRetResultTable");
			    	var vBtnViewAll = sap.ui.getCore().byId("idBtnViewAllEDRetResult");
			    	var oModelReturnResultDetails = new sap.ui.model.json.JSONModel();
			    	oModelReturnResultDetails.setData({modelData: aEDRetResultData});
			    	oResultTable.setModel(oModelReturnResultDetails);
			    	oResultTable.bindRows("/modelData");
			    	oModelReturnResultDetails.updateBindings();
			    	var vLen = aEDRetResultData.length;
			    	if(vLen < 25){
			    		oResultTable.setVisibleRowCount(vLen);
			    		oResultTable.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
			    		vBtnViewAll.setVisible(false);
			    		sap.ui.getCore().byId("idSpcForCancelRA").setVisible(false);
			    	}
			    	else{
			    		oResultTable.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
			    		oResultTable.setVisibleRowCount(25);
			    		vBtnViewAll.setVisible(true);
			    		sap.ui.getCore().byId("idSpcForCancelRA").setVisible(true);
			    	}
		    	}
		    	}
		    	else if(flagDelete == "S" && len ==0){
		    		sap.ui.getCore().byId("idEDRetResultFormElement").destroyFields();
		    		var msg = "RA Number not found.Please recheck the RA Number and try again.";
		    			sap.ui.commons.MessageBox.show(msg,
			                    sap.ui.commons.MessageBox.Icon.WARNING,
			                    "Warning",
			                    [sap.ui.commons.MessageBox.Action.OK], 
			                        sap.ui.commons.MessageBox.Action.OK);
		    	}
		    	else if(flagDelete == "D" && len ==0){
		    		sap.ui.getCore().byId("idEDRetResultFormElement").destroyFields();
		    	}
		    	busyDialog.close();
		    },
		    function(err){
		    	busyDialog.close();
		    	errorfromServer(err);
		    }); //odata request
		
	},
	
	createResultTableEDRetResult: function(){
		var oCurrent= this;
		sap.ui.getCore().byId("idEDRetResultFormElement").destroyFields();
		 var oBtnRetDetExport = new sap.m.Button({
        	 text : "Export To Excel",
             //type:sap.m.ButtonType.Unstyled,
             width:"145px",
             icon: sap.ui.core.IconPool.getIconURI("excel-attachment"),
            press:function(){
                 var vTitle = "Redelivery Details";
                 //var objUtil = new utility();
                 objUtil.makeHTMLTable(ajsonEDRetRASearchResult, vTitle,"export");
            }
         }).addStyleClass("submitBtn");
		 
		 var oFlexboxForExportBtn = new sap.m.FlexBox({
   		  items: [oBtnRetDetExport ],
   		  width:"30%",
   		  direction: sap.m.FlexDirection.RowReverse
   		});
        
        var oLabelTblTitle = new sap.ui.commons.Label({text: "Redelivery Details",
			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: true, margin: false}),
            wrapping: true}).addStyleClass("font15Bold marginTop10");
        
        var oFlexboxRetDetTableTitle = new sap.m.FlexBox({
  		  items: [oLabelTblTitle ],
  		  width:"70%",
  		  direction: "Row"
  		});
        
        var oFlexboxRetDetTableHeader = new sap.m.FlexBox({
     		  items: [oFlexboxRetDetTableTitle,oFlexboxForExportBtn],
     		  width:"100%",
     		  direction: "Row"
     		});
        
        var oBtnViewAll = new sap.m.Button("idBtnViewAllEDRetResult",{
            text : "View All",
            styled:false,
            width:"80px",
            press:function(){
           	 oBtnViewAll.setVisible(false);
                var vArrayLength = aEDRetResultData.length;
		        	if(vArrayLength < 100){
		        		sap.ui.getCore().byId("idEDRetResultTable").setVisibleRowCount(vArrayLength);
		        		sap.ui.getCore().byId("idEDRetResultTable").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		        	}
		        	else{
		        		sap.ui.getCore().byId("idEDRetResultTable").setVisibleRowCount(100);
		        		sap.ui.getCore().byId("idEDRetResultTable").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		        	}
            }
         }).addStyleClass("submitBtn marginTop10");
        
        var lblSpace = new sap.ui.commons.Label("idSpcForCancelRA",{text: " ",width : '5px'}).addStyleClass("marginTop10");
        
        var oBtnCancelReturn = new sap.m.Button("idBtnCancelRAEDRet",{
       	 text : "Cancel Return",
            styled:false,
            //width:"115px",
            press:function(){
            	 var ConfirmMessage = "This action will delete the Return Authorization, and cannot be reversed. Do you want to continue?";
    			 sap.ui.commons.MessageBox.show(ConfirmMessage,
    				  sap.ui.commons.MessageBox.Icon.WARNING,
    					"Warning",
    	              [sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO], 
    	              oCurrent.fnCancelReturn,
    	              sap.ui.commons.MessageBox.Action.YES);
                  
            }
         }).addStyleClass("submitBtn marginTop10");
        
        var oFlexboxRetDetTableFooter = new sap.m.FlexBox({
   		  items: [
   		          oBtnViewAll,lblSpace,
   		          oBtnCancelReturn],
   		  width:"100%",
   		  direction: "Row"
   		});
        
		var oReturnDetailsTable = new sap.ui.table.Table("idEDRetResultTable",{
			visibleRowCount: 1,
	       // firstVisibleRow: 3,
	        columnHeaderHeight: 40,
	        selectionMode: sap.ui.table.SelectionMode.None,
	        navigationMode: sap.ui.table.NavigationMode.Scrollbar,
	      //  width: "100%",
	        //height:"100%"
    	 }).addStyleClass("fontStyle tblBorder marginTop10");
		
			// Table Columns
			 oReturnDetailsTable.addColumn(new sap.ui.table.Column({
		     label: new sap.ui.commons.Label({text: "Lease"}).addStyleClass("wraptextcol"),
 	         template: new sap.ui.commons.TextView().bindProperty("text", "Lease"),
 	         sortProperty: "Lease",
 	         filterProperty: "Lease",
 	         resizable:false,
 	         width:"70px",
			 }));
			 
			 oReturnDetailsTable.addColumn(new sap.ui.table.Column({
				 label: new sap.ui.commons.Label({text: "Return"}).addStyleClass("wraptextcol"),
				 template: new sap.ui.commons.Link({
						press : function() {
							 vClickedReturn_ReturnDetTbl = this.getHelpId().split("$")[0];
							 vHelpValueRetDetEDRet = this.getHelpId();
							 //$('#idHdrContent').html('Return Details');
							var bus = sap.ui.getCore().getEventBus();
				        	  bus.publish("nav", "to", {
			                  id : "EDReturnDetailView"
			              }); 
				        	var oObject = new EDReturnDetailsView();
				        	oObject.bindEDReturnDetailsDetail();
						}
					}).bindProperty("text", "Ordno").bindProperty("helpId","helpValueRetDet"),
	 	         sortProperty: "Ordno",
	 	         filterProperty: "Ordno",
	 	        resizable:false,
	 	         width:"60px",
				 }));
			 
			 oReturnDetailsTable.addColumn(new sap.ui.table.Column({
				 label: new sap.ui.commons.Label({text: "Unit Type"}).addStyleClass("wraptextcol"),
				 template: new sap.ui.commons.TextView().bindProperty("text", "UnitType"),
	 	         sortProperty: "UnitType",
	 	         filterProperty: "UnitType",
	 	        resizable:false,
	 	         width:"80px",
				 }));
			 
			 oReturnDetailsTable.addColumn(new sap.ui.table.Column({
				 label: new sap.ui.commons.Label({text: "Location"}).addStyleClass("wraptextcol"),
				 template: new sap.ui.commons.TextView().bindProperty("text", "Location"),
	 	         sortProperty: "Location",
	 	         filterProperty: "Location",
	 	        resizable:false,
	 	         width:"110px",
				 }));
			 
			 oReturnDetailsTable.addColumn(new sap.ui.table.Column({
				 label: new sap.ui.commons.Label({text: "Depot"}).addStyleClass("wraptextcol"),
				 template: new sap.ui.commons.TextView().bindProperty("text", "Depot"),
	 	         sortProperty: "Depot",
	 	         filterProperty: "Depot",
	 	        resizable:false,
	 	         width:"240px",
				 }));
			 
			 var oTotalCol = new sap.ui.table.Column({
				 label: new sap.ui.commons.TextView({text: "Total Quantity",}).addStyleClass("wraptextcol"),
				 //hAlign:sap.ui.commons.layout.HAlign.End,
				 template:new sap.ui.commons.TextView().bindProperty("text", "TotQty"), 
	 	         sortProperty: "TotQty",
	 	         filterProperty: "TotQty",
	 	         resizable:false,
	 	         width:"80px",
				 });
				var oUtil = new utility();
				oReturnDetailsTable.addColumn(oTotalCol);
				oUtil.addColumnSorterAndFilter(oTotalCol, oUtil.compareUptoCount);
				
			var oRetCol = new sap.ui.table.Column({
				 label: new sap.ui.commons.TextView({text: "Quantity Returned",}).addStyleClass("wraptextcol"),
				 template: new sap.ui.commons.TextView().bindProperty("text", "ReturnQty"),
	 	         sortProperty: "ReturnQty",
	 	         filterProperty: "ReturnQty",
	 	         resizable:false,
	 	         width:"80px",
				 });
			oReturnDetailsTable.addColumn(oRetCol);
				oUtil.addColumnSorterAndFilter(oRetCol, oUtil.compareUptoCount);
				
			var oOutCol = new sap.ui.table.Column({
				 label: new sap.ui.commons.TextView({text: "Outstanding Quantity",}).addStyleClass("wraptextcol"),
				 template: new sap.ui.commons.TextView().bindProperty("text", "OutstandQty"),
	 	         sortProperty: "OutstandQty",
	 	         filterProperty: "OutstandQty",
	 	         resizable:false,
	 	         width:"100px",
				 });
			oReturnDetailsTable.addColumn(oOutCol);
				oUtil.addColumnSorterAndFilter(oOutCol, oUtil.compareUptoCount);
				
			 oReturnDetailsTable.addColumn(new sap.ui.table.Column({
				 label: new sap.ui.commons.Label({text: "Status"}).addStyleClass("wraptextcol"),
				 template: new sap.ui.commons.TextView().bindProperty("text", "Status"),
	 	         sortProperty: "Status",
	 	         filterProperty: "Status",
	 	         resizable:false,
	 	         width:"150px",
				 }));
			 
			 oReturnDetailsTable.addColumn(new sap.ui.table.Column({
				 label: new sap.ui.commons.Label({text: "Expiry Date"}).addStyleClass("wraptextcol"),
				 template: new sap.ui.commons.TextView().bindProperty("text", "ExpiryDate"),
	 	         sortProperty: "ExpiryDateActual",
	 	         filterProperty: "ExpiryDate",
	 	         resizable:false,
	 	         width:"100px",
				 }));
			 
			 
			 var oFlexBoxAll = new sap.m.FlexBox({
		    		width: "100%",
		    		items:[
							oFlexboxRetDetTableHeader,
							oReturnDetailsTable,
							oFlexboxRetDetTableFooter
							
		    		],
		    		direction: "Column"
		    	});
			 
			 sap.ui.getCore().byId("idEDRetResultFormElement").insertField(oFlexBoxAll);
	},
	
	fnCancelReturn: function(sResult){
		if(sResult == "YES"){
			busyDialog.open();
			var oCurrent = this;
			// /sap/opu/odata/sap/ZNW_SEACO_PORTAL_SECURITY1_4_SRV/CANCEL_RETURNS?$filter=ReturnAuth eq '402788'
			var vRANumber = sap.ui.getCore().byId("idRANumberEDRet").getValue().trim();
			var urlToCall = serviceUrl + "/CANCEL_RETURNS?$filter=ReturnAuth eq '" + vRANumber + "'";
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
			    	busyDialog.close();
			    	sap.ui.commons.MessageBox.alert(data.results[0].Message,okCallBackRefreshEDret);
			    },
			    function(err){
			    	busyDialog.close();
			    	errorfromServer(err);
			    }); //odata request
		}
	}
});

function okCallBackRefreshEDret(){
	 if(sap.ui.getCore().byId("idEDRetResultFormElement"))
  		  sap.ui.getCore().byId("idEDRetResultFormElement").destroyFields();
	// new raSearchView().getRADetails();
}
jQuery.sap.require("sap.ui.model.json.JSONModel");
var oreturnController;
var oReturn;
var ReturnRefResultData = [];
var ReturnRefSummaryData = [];
var jsonReturnSum = [];
sap.ui.model.json.JSONModel.extend("returnSearch", {
	
	createReturnSearch: function(oController){
		
		var oreturnAuto = new returnAutoMulti();
		oreturnAuto.bindAutoUnit();
		
		oreturnController = oController;
		oReturn = this;
		
		var confirmMessage = "This will reset all the search Return inputs so far. Do you want to continue?";
		
		//var labSearchBy =  new sap.m.Text({text:"Search By / View By"}).addStyleClass("font11Bold");
		var labHardCode =  new sap.ui.commons.Label({text:"Depot Code:",
			wrapping: true,
			required:true,
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: false})});
		
		var HrdFlex = new sap.m.FlexBox({ items: [  labHardCode ],  direction: "Column"	,
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: false})});
		
		var labReleaseRef1 = new sap.ui.commons.Label({text: "Return Reference:",
			wrapping: true});
		var labReleaseRef2 = new sap.ui.commons.Label({text: "Enter 1 return reference per line. Maximum 25 entries",
			wrapping: true}).addStyleClass("font10");
		var labReleaseRef3 = new sap.ui.commons.Label({text: 'Press "Enter" to go to next line',
			wrapping: true}).addStyleClass("font10");
		
		var refFlex = new sap.m.FlexBox({ items: [ labReleaseRef1, labReleaseRef2, labReleaseRef3],  
			direction: "Column",	
				layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: false})}).addStyleClass("marginTop10");
		
		var labPeriod = new sap.ui.commons.Label({text: "Period:",
			wrapping: true,
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: false})}).addStyleClass("marginTop10");
		
		var labStatus = new sap.ui.commons.Label({text: "Status:",
			wrapping: true,
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: false})}).addStyleClass("marginTop10");
		
		var labUnitType = new sap.ui.commons.Label({text: "Unit Type:",
			wrapping: true,
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: false})}).addStyleClass("marginTop10");
		
		var oUser =  new loggedInU();
		var uId = "";
		var utype = oUser.getLoggedInUserType();
		var isEnabled = false;
		if(($.inArray(utype, ["DEPOT","FACTORY"])) != -1){
			uId = oUser.getLoggedInUserID();
			isEnabled = false;
		}
		else
			isEnabled = true;
		
		var txtHardCode = new sap.ui.commons.TextField("returnHardCode",{
			layoutData: new sap.ui.layout.GridData({span: "L1 M2 S8"}),
			placeholder: "Depot Code",
			enabled:isEnabled,
			value:uId,
			liveChange:function(oControlEvent){
				txtHardCode.setPlaceholder("Depot Code");
				txtHardCode.setValueState(sap.ui.core.ValueState.None);
			},
		}).addStyleClass("FormInputStyle");
		
		var tblReturnRef = new sap.ui.commons.TextArea('returnRefTbl',{
	         layoutData: new sap.ui.layout.GridData({span: "L4 M9 S12"}),
	                     rows:25,
	                     cols:30,
	                     height:"145px",
	                     placeholder:"Return Reference",
	              }).addStyleClass("marginTop10");
		tblReturnRef.setMaxLength(248);
		
		var rgPeriod;
		var browser = sap.ui.Device.browser.chrome;
		if(browser){
			 rgPeriod = new sap.ui.commons.RadioButtonGroup("returnPeriod",{
		        columns : 4,
		        selectedIndex : 4,
		        layoutData: new sap.ui.layout.GridData({span: "L10 M10 S12"}),
		        select : function() {
		        	//alert('RadioButton ' + rgPeriod.getSelectedItem().getText());
		        }
		    }).addStyleClass("marginTop10");
		}
		else{
			 rgPeriod = new sap.ui.commons.RadioButtonGroup("returnPeriod",{
		        columns : 4,
		        selectedIndex : 4,
		        layoutData: new sap.ui.layout.GridData({span: "L6 M6 S12"}),
		        select : function() {
		        	//alert('RadioButton ' + rgPeriod.getSelectedItem().getText());
		        }
		    }).addStyleClass("marginTop10");
		}
		
		var oItem = new sap.ui.core.Item({
		        text : "Today", key : "00"});
		rgPeriod.addItem(oItem);
		oItem = new sap.ui.core.Item({
		        text : "Yesterday", key : "01"});
		rgPeriod.addItem(oItem);
		oItem = new sap.ui.core.Item({
		        text : "This Week", key : "07"});
		rgPeriod.addItem(oItem);
		oItem = new sap.ui.core.Item({
		        text : "Last Week", key : "14"});
		rgPeriod.addItem(oItem);
		oItem = new sap.ui.core.Item({
		        text : "This Month", key : "30"});
		rgPeriod.addItem(oItem);
		oItem = new sap.ui.core.Item({
		        text : "Last Month", key : "31"});
		rgPeriod.addItem(oItem);
		oItem = new sap.ui.core.Item({
	        	text : "Last 3 Months", key : "90"});
		rgPeriod.addItem(oItem);
		
		var rgStatus;
		if(browser){
			 rgStatus = new sap.ui.commons.RadioButtonGroup("returnStatus",{
		        columns : 3,
		        selectedIndex : 0,
		        layoutData: new sap.ui.layout.GridData({span: "L10 M10 S12"}),
		        select : function() {
		        	//alert('RadioButton ' + rgStatus.getSelectedItem().getText());
		        }
		    }).addStyleClass("marginTop10");
		}
		else{
			 rgStatus = new sap.ui.commons.RadioButtonGroup("returnStatus",{
		        columns : 3,
		        selectedIndex : 0,
		        layoutData: new sap.ui.layout.GridData({span: "L6 M6 S12"}),
		        select : function() {
		        	//alert('RadioButton ' + rgStatus.getSelectedItem().getText());
		        }
		    }).addStyleClass("marginTop10");
		}
		
		var oItem = new sap.ui.core.Item({
		        text : "All", key : "ALL"});
		rgStatus.addItem(oItem);
		oItem = new sap.ui.core.Item({
		        text : "Notification to all", key : "NOTA"});
		rgStatus.addItem(oItem);
		oItem = new sap.ui.core.Item({
		        text : "Expired", key : "EXPI"});
		rgStatus.addItem(oItem);
		oItem = new sap.ui.core.Item({
		        text : "Cancelled", key : "CANC"});
		rgStatus.addItem(oItem);
		oItem = new sap.ui.core.Item({
	        	text : "Return Completed", key : "RETE"});
		rgStatus.addItem(oItem);
		
		
		var oAutoUnitType = new control.AutoCompleteValueHolder('AutoUnitTypeRet', {
            layoutData: new sap.ui.layout.GridData({span: "L4 M9 S12"}),
            enabled: true,
            placeholder: "Unit Type",
            //itemSelectLimit: 1, // No limit
            selectedItem: function (event) {
            },
            deletedItem: function (event) {
            },
            deletedAllItems: function (event) {
            }
        });
        oAutoUnitType.addStyleClass("marginTop10");
        
        
        /* Unit Number Inclusion */
        
        var labUnitNo1 = new sap.ui.commons.Label({text: "Unit Number:",
			wrapping: true
			});
		var WarningText = "To view the status: For individual containers, please enter the 4 letter prefix and 7 digit number for each container. (Eg. SEGU3000511). For multiple containers (Max 25), press the Enter key after each one, or copy and paste the list to the entry field";
		
		var labUnitNo2 = new sap.ui.commons.Label({text: WarningText/*"1 per line, 25 max"*/,
			wrapping: true
			}).addStyleClass("font10");
		/*var labReleaseRef4 = new sap.ui.commons.Label({text: "Use Shift + TAB to navigate to the previous line)",
			wrapping: true}).addStyleClass("font10");*/
		var unitFlex = new sap.m.FlexBox({ items: [  labUnitNo1, labUnitNo2/*,labUnitNo3 */ ],  
			direction: "Column"	,
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: false})}).addStyleClass("marginTop10");

		var tblReturnUnit = new sap.ui.commons.TextArea('returnUnitTbl',{
			         layoutData: new sap.ui.layout.GridData({span: "L4 M9 S12"}),
			                     rows:25,
			                     cols:30,
			                     height:"145px",
			                     placeholder:"Unit Number",
			              }).addStyleClass("marginTop10");
		tblReturnUnit.setMaxLength(323);

		
		var btnSubmit = new sap.m.Button({
	          text : "Submit",
	          styled:false,
	          width:"80px",
	          layoutData: new sap.ui.layout.GridData({span: "L1 M3 S4"}),
	          press:function(){
	        	  //alert("Submit CLicked");
	        	  if(oReturn.validateHardCode()){
	        		  busyDialog.open();
		        	  oreturnController.submitReturnClicked();  
	        	  }
	        	  
	          }
		}).addStyleClass("submitBtn");
	
		
		var btnReset = new sap.m.Button({
	          text : "Reset",
	          styled:false,
	          width:"80px",
	          layoutData: new sap.ui.layout.GridData({span: "L1 M3 S4"}),
	          press:function(){
	        	  jQuery.sap.require("sap.ui.commons.MessageBox");
	        	  sap.ui.commons.MessageBox.show(confirmMessage,
    			  sap.ui.commons.MessageBox.Icon.WARNING,
    			  "Warning",
    			  [sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO], 
    			  oReturn.fnCallbackMessageBox,
    			  sap.ui.commons.MessageBox.Action.YES
	  		    );

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

        var labStar = new sap.ui.commons.Label({text: "* "}).addStyleClass("MandatoryStar");
	    var lblSpaceLegend = new sap.ui.commons.Label( {text: " ",width : '5px'});
	    var labRequired = new sap.ui.commons.Label({text: " Mandatory Field",wrapping: true});
		var oFlexboxReq = new sap.m.FlexBox({
				 // layoutData: new sap.ui.layout.GridData({span: "L7 M6 S4"}),
	              items: [labStar,lblSpaceLegend,labRequired],
	              direction: "Row"
		});
		
		var oReturnSearchLayout = new sap.ui.layout.form.ResponsiveGridLayout("ReturnSearchLayout", {
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
		var oReturnSearchForm = new sap.ui.layout.form.Form("ReturnSearchF1",{
            layout: oReturnSearchLayout,
            formContainers: [
                    new sap.ui.layout.form.FormContainer("ReturnSearchF1C1",{
                    	title: new sap.ui.core.Title({text: "Search By / View By"}),
                        formElements: [
								/*new sap.ui.layout.form.FormElement({
									fields: [labSearchBy],
									layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
								}),*/
								new sap.ui.layout.form.FormElement({
									fields: [HrdFlex,txtHardCode],
									layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
								}),
                                new sap.ui.layout.form.FormElement({
                                    //label: "Return Reference: (1 per line,25 max)",
                                    fields: [refFlex,tblReturnRef ],
                                    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                                }),
                                new sap.ui.layout.form.FormElement({
                                    //label: "Return Reference: (1 per line,25 max)",
                                    fields: [unitFlex,tblReturnUnit ],
                                    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                                }),
                                new sap.ui.layout.form.FormElement({
                                    //label: "Period",
                                    fields: [labPeriod,rgPeriod ],
                                    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                                }),
                                new sap.ui.layout.form.FormElement({
                                    //label: "Status",
                                    fields: [labStatus,rgStatus ],
                                    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                                }),
                                new sap.ui.layout.form.FormElement({
                                    //label: "Unit type",
                                    fields: [labUnitType,oAutoUnitType ],
                                    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                                })
                                
                        ],layoutData: new sap.ui.layout.GridData({span: "L12 M12 S8"})
                    }),
                    new sap.ui.layout.form.FormContainer("ReturnSearchF1C2",{
						formElements: [
							new sap.ui.layout.form.FormElement({
								fields: [
								
								]
							})
							],layoutData: new sap.ui.layout.GridData({span: "L1 M1 S1"})
					}),
                    new sap.ui.layout.form.FormContainer("ReturnSearchF1C3",{
                        formElements: [
                                new sap.ui.layout.form.FormElement({
                                    fields: [oFlexboxButtons],
                                    //layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4"})
                                }),
                                new sap.ui.layout.form.FormElement({
                                    fields: [oFlexboxReq],
                                    layoutData: new sap.ui.commons.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                                })
                       ],layoutData: new sap.ui.commons.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                    })
            ]
    });
		
	var oReturnResultLayout = new sap.ui.layout.form.ResponsiveGridLayout("ReturnResultLayout", {});
	var oReturnResultForm = new sap.ui.layout.form.Form("ReturnResultF1",{
            layout: oReturnResultLayout,
            formContainers: [
                    new sap.ui.layout.form.FormContainer("ReturnResultF1C1",{
                        formElements: [
                                new sap.ui.layout.form.FormElement("ReturnResults",{
                                    fields: [],
                                })
                       ],layoutData: new sap.ui.commons.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                    })
            ]
    });
	var vHDivider = new sap.ui.commons.HorizontalDivider({width: "95%", type: "Area", height: "Medium"});
	var oReturnFlexbox = new sap.m.FlexBox({
		  items: [
		    oReturnSearchForm,
		    vHDivider,
		    oReturnResultForm
		  ],
		  direction: "Column"
		});
	return oReturnFlexbox;
	
	},

	fnCallbackMessageBox:function(sResult) {
		if(sResult == "YES"){
			oreturnController.resetReturnClicked();
		}
	},
	
	setReturnDetailsForm:function(){
		var oReturnResultTable = new sap.ui.table.Table("returnResultTable",{
	        visibleRowCount: 5,
	        firstVisibleRow: 1,
	        columnHeaderHeight: 30,
	        selectionMode: sap.ui.table.SelectionMode.None,
	        navigationMode: sap.ui.table.NavigationMode.Paginator,
		}).addStyleClass("tblBorder marginTop10");
		
		oReturnResultTable.addColumn(new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "Return Reference"}).addStyleClass("wraptextcol"),
	        template: new sap.ui.commons.Link({
				press : function(oEvent) {
					seletedReturnRefNo = this.getText();
					selctedReturnUnitType = this.getHelpId();
					//oReturnResultTable.fireRowSelectionChange(oEvent);
					oreturnController.linkReturnDetailClicked();
				}
			}).bindProperty("text", "ReferenceNumber").bindProperty("helpId", "UnitType"),
	        sortProperty: "ReferenceNumber",
	        width:"16%",
	        resizable:false,
	        filterProperty: "ReferenceNumber",
		}));
		oReturnResultTable.addColumn(new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "Unit Type"}).addStyleClass("wraptextcol"),
	        template: new sap.ui.commons.TextView().bindProperty("text", "UnitType"),
	        sortProperty: "UnitType",
	        width:"10%",
	        resizable:false,
	        filterProperty: "UnitType",
		}));
		oReturnResultTable.addColumn(new sap.ui.table.Column({
		        label: new sap.ui.commons.Label({text: "Customer"}).addStyleClass("wraptextcol"),
		        template: new sap.ui.commons.TextView().bindProperty("text", "CustomerName"),
		        sortProperty: "CustomerName",
		        width:"25%",
		        resizable:false,
		        filterProperty: "CustomerName",
		}));
		var oTotCol = new sap.ui.table.Column({
		        label: new sap.ui.commons.Label({text: "Total Quantity"}).addStyleClass("wraptextcol"),
		        template: new sap.ui.commons.TextView().bindProperty("text", "TotalQuantity"),
		        sortProperty: "TotalQuantity",
		        width:"15%",
		        resizable:false,
		        filterProperty: "TotalQuantity"
		});
		var oUtil = new utility();
		oReturnResultTable.addColumn(oTotCol);
		oUtil.addColumnSorterAndFilter(oTotCol, oUtil.compareUptoCount);
		
		var oOutCol = new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "Outstanding Quantity"}).addStyleClass("wraptextcol"),
	        template: new sap.ui.commons.TextView().bindProperty("text", "OutstandingQuantity"),
	        sortProperty: "OutstandingQuantity",
	        width:"20%",
	        resizable:false,
	        filterProperty: "OutstandingQuantity"
		});
		oReturnResultTable.addColumn(oOutCol);
		oUtil.addColumnSorterAndFilter(oOutCol, oUtil.compareUptoCount);
		
		oReturnResultTable.addColumn(new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "Expiry Date"}).addStyleClass("wraptextcol"),
	        template: new sap.ui.commons.TextView().bindProperty("text", "ExpiryDate"),
	        sortProperty: "ExpiryDateActual",
	        width:"14%",
	        resizable:false,
	        filterProperty: "ExpiryDate"
		}));
		
		var btnPrint = new sap.m.Button({
	          text : "Print",
	          type:sap.m.ButtonType.Unstyled,
	          icon: sap.ui.core.IconPool.getIconURI("print"),
	          press:function(){
	        	  //alert("Print CLicked");
	        	  var tab = objUtil.makeHTMLTable(jsonReturnSum, "Returns","print");
	        	  var newWin = window.open();
	        	  newWin.document.write(tab);
	        	  newWin.print();
	        	  //oController.submitReleaseClicked();
	          }
		}).addStyleClass("submitBtn");
	
		
		var btnExport = new sap.m.Button({
	          text : "Export To Excel",
	          type:sap.m.ButtonType.Unstyled,
	          icon: sap.ui.core.IconPool.getIconURI("excel-attachment"),
	          press:function(){
	        	  //alert("Export to Excel");
	        	  objUtil.makeHTMLTable(oCDASHMJsonEstimatesApproved, "Returns","export");
	          }
		}).addStyleClass("submitBtn");
		
		var btnViewAll = new sap.m.Button("ReturnViewAll",{
	          text : "View All",
	          type:sap.m.ButtonType.Unstyled,
	          visible:false,
	          width:"80px",
	          //icon: sap.ui.core.IconPool.getIconURI("excel-attachment"),
	          press:function(){
	        	 // alert("View All");
	        	  this.setVisible(false);
	        	  if(sap.ui.getCore().byId("releaseResultTable")){
	        		  var oreturnResultTable = sap.ui.getCore().byId("returnResultTable");
	        		  if (ReturnRefSummaryData.length < 100){
		  					oreturnResultTable.setVisibleRowCount(ReturnRefSummaryData.length);
		  					oreturnResultTable.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		  					//sap.ui.getCore().byId("ReturnViewAll").setVisible(false);
		  				}else{
		  					oreturnResultTable.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		  					oreturnResultTable.setVisibleRowCount(100);
		  					//sap.ui.getCore().byId("ReturnViewAll").setVisible(true);
		  				}  
	        	  }
	          }
		}).addStyleClass("submitBtn");
		
		var oReturnDetailsToolbar = new sap.m.FlexBox({
			  items: [
			    btnExport,
			    btnPrint
			  ],
			  direction: "RowReverse"
		});
		
		var oReturnFooter = new sap.m.FlexBox({
			  items: [
			    btnViewAll
			  ],
			  direction: "Row"
		}).addStyleClass("marginTop10");
		
		var oReturnDetailsFlex = new sap.m.FlexBox("returnDetailsFlex",{
			  items: [
			    //oReturnDetailsToolbar,
			    oReturnResultTable,
			    oReturnFooter
			  ],
			  direction: "Column",
			  width: "85%"
		});
		
		return oReturnDetailsFlex;
	},
	
	bindReturnDetails:function(){
		var partner = sap.ui.getCore().byId("returnHardCode").getValue();
		var period = sap.ui.getCore().byId("returnPeriod").getSelectedItem().getKey();
		var status = sap.ui.getCore().byId("returnStatus").getSelectedItem().getKey();
		var unitType = "";
		var selUnitType = sap.ui.getCore().byId('AutoUnitTypeRet').getSelectedValues();
    	
    	for(var i in selUnitType)
			unitType += selUnitType[i].description +',';

		unitType = unitType.slice(0,-1);
		
		var refNosValue = (sap.ui.getCore().byId("returnRefTbl").getValue()).trim();
		var refNos = sap.ui.getCore().byId("returnRefTbl").getValue().split(/\n/g);
		
		var returnRef1 = "";
    	var returnRef2 = "";
    	
    	if(refNosValue.length > 0){
    		//alert(" trim : "+refNosValue.length);
    		
    		if(refNos.length>13){
        		for(var i=0;i<13;i++){
        			returnRef1 = returnRef1 + refNos[i]+",";
            	}
        		if(refNos.length<25){
        			for(var j=13;j<refNos.length;j++){
        				returnRef2 = returnRef2 + refNos[j]+",";
            		}
        		}else{
        			for(var k=13;k<25;k++){
        				returnRef2 = returnRef2 + refNos[k]+",";
            		}
        		}
        		
        	}else{
        		for(var k=0;k<refNos.length;k++){
        			returnRef1 = returnRef1 + refNos[k]+",";
            	}
        	}
    	}
		
		
    	
    	
    	// Unit Nos
		var returnUnit1 = "";
    	var returnUnit2 = "";
		var unitNosValue = (sap.ui.getCore().byId("returnUnitTbl").getValue()).trim();
		var unitNos = sap.ui.getCore().byId("returnUnitTbl").getValue().split(/\n/g);
		
		if(unitNosValue.length > 0){
    		//alert(" trim : "+refNosValue.length);
    		
    		if(unitNos.length>13){
        		for(var i=0;i<13;i++){
        			returnUnit1 = returnUnit1 + unitNos[i]+",";
            	}
        		if(unitNos.length<25){
        			for(var j=13;j<unitNos.length;j++){
        				returnUnit2 = returnUnit2 + unitNos[j]+",";
            		}
        		}else{
        			for(var k=13;k<25;k++){
        				returnUnit2 = returnUnit2 + unitNos[k]+",";
            		}
        		}
        		
        	}else{
        		for(var k=0;k<unitNos.length;k++){
        			returnUnit1 = returnUnit1 + unitNos[k]+",";
            	}
        	}
    	}
		
		
		
		
//    	alert("period: "+period+ " status :"+status+" unit type : "+unitType+" partner : "+ partner + " Relse : "+ releaseRef1 + "Relse2 : "+releaseRef2);
    	
    	var filter = "/Returns_Summary_Details?$filter=IPartner eq '"+partner+"' and IReturn eq '"+returnRef1+
    				 "' and IUnit eq '"+returnUnit1+"' and IUnit1 eq '"+returnUnit2+
    	             "' and IReturn1 eq '"+returnRef2+"' and IPeriod eq '"+period+"' and IStatus eq '"+status+"' and IUnittype eq '"+unitType+"'";
    	
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
  		    	
  		    	//alert("data.results.length" + data.results.length);
  		    	//alert("data" + window.JSON.stringify(data.results));
  		    	
  		    	if(data.results.length == 0){
  		    		busyDialog.close();
  		    		sap.ui.commons.MessageBox.alert("No Results Found. Please edit / refine your search criteria and search again.");
  		    		if(sap.ui.getCore().byId("returnDetailsFlex")){
		    			sap.ui.getCore().byId("returnDetailsFlex").destroy();
		    		}
  		    	}else if (data.results.length>0){
  		    		
  		    		jsonReleaseSum = [];
  		    		
  		    		ReturnRefResultData = data.results;
  		    		//alert("length of data : "+ releaseRefResultData.length);

		    		if(sap.ui.getCore().byId("returnDetailsFlex")){
		    			sap.ui.getCore().byId("returnDetailsFlex").destroy();
		    		}
  		    		
		    		for(var i=0; i<ReturnRefResultData.length;i++){
		    			ReturnRefResultData[i].TotalQuantity = ReturnRefResultData[i].TotalQuantity.replace(/^0+/, '');
		    			ReturnRefResultData[i].OutstandingQuantity = ReturnRefResultData[i].OutstandingQuantity.replace(/^0+/, '');
		    			ReturnRefResultData[i].ContractNo = ReturnRefResultData[i].ContractNo.replace(/^0+/, '');
		    			
		    			ReturnRefResultData[i].OutstandingQuantity = ((ReturnRefResultData[i].OutstandingQuantity.length == 0) ? "0" : ReturnRefResultData[i].OutstandingQuantity);
		    			ReturnRefResultData[i].TotalQuantity = ((ReturnRefResultData[i].TotalQuantity.length == 0) ? "0" : ReturnRefResultData[i].TotalQuantity);
		    			ReturnRefResultData[i].ContractNo = ((ReturnRefResultData[i].ContractNo.length == 0) ? "0" : ReturnRefResultData[i].ContractNo);
		    			
		    			ReturnRefResultData[i].ScrLimit = numberWithCommas(ReturnRefResultData[i].ScrLimit) ; 
		    			
		    			if(ReturnRefResultData[i].IExtra1 == 'Full Coverage')
		    				ReturnRefResultData[i].ScrLimit = "Full Coverage";
		    			
		    			if(ReturnRefResultData[i].IExtra1 == 'X')
		    				ReturnRefResultData[i].ScrLimit = " ";
		    				
	    				// Expiry Date
		    			var vDocDateResult = ReturnRefResultData[i].ExpiryDate.split("(");
  	                    var vDocDate = vDocDateResult[1].split(")");
  	                    var vActualDate = new Date(Number(vDocDate[0]));
  	                    var vformattedDocDate = dateFormat(new Date(Number(vDocDate[0])), 'dd-mm-yyyy',"UTC");
  	                    //this is to check if the date is default 999 something show blank
  	                    if (vformattedDocDate.substring(6) === "9999"){
  	                    	ReturnRefResultData[i].ExpiryDate =  "-";
  	                    }
  	                    else{
  	                    	ReturnRefResultData[i].ExpiryDate = vformattedDocDate;
  	                    }
  	                    ReturnRefResultData[i]['ExpiryDateActual'] =  vActualDate;
  	                  
  	                  // Gate In  Date
  	                    var vDocDateResult = ReturnRefResultData[i].GateInDate.split("(");
	                    var vDocDate = vDocDateResult[1].split(")");
	                    var vActualDate = new Date(Number(vDocDate[0]));
	                    var vformattedDocDate = dateFormat(new Date(Number(vDocDate[0])), 'dd-mm-yyyy',"UTC");
	                    //this is to check if the date is default 999 something show blank
	                    if (vformattedDocDate.substring(6) === "9999"){
	                    	ReturnRefResultData[i].GateInDate =  "-";
	                    }
	                    else{
	                    	ReturnRefResultData[i].GateInDate = vformattedDocDate;
	                    }
	                    ReturnRefResultData[i]['GateInDateActual'] =  vActualDate;
	                    
	                    // Manufacture Date
	                    var vDocDateResult = ReturnRefResultData[i].ManufacturingDate.split("(");
	                    var vDocDate = vDocDateResult[1].split(")");
	                    var vActualDate = new Date(Number(vDocDate[0]));
	                    var vformattedDocDate = dateFormat(new Date(Number(vDocDate[0])), 'mmm-yyyy',"UTC");
	                    //this is to check if the date is default 999 something show blank
	                    if (vformattedDocDate.substring(4) === "9999"){
	                    	ReturnRefResultData[i].ManufacturingDate =  "-";
	                    }
	                    else{
	                    	ReturnRefResultData[i].ManufacturingDate = vformattedDocDate;
	                    }
	                    ReturnRefResultData[i]['ManufacturingDateActual'] =  vActualDate;
	                    
	                    // Last On Hire Date
	                    var vDocDateResult = ReturnRefResultData[i].LastOnhireDate.split("(");
	                    var vDocDate = vDocDateResult[1].split(")");
	                    var vActualDate = new Date(Number(vDocDate[0]));
	                    var vformattedDocDate = dateFormat(new Date(Number(vDocDate[0])), 'dd-mm-yyyy',"UTC");
	                    //this is to check if the date is default 999 something show blank
	                    if (vformattedDocDate.substring(6) === "9999"){
	                    	ReturnRefResultData[i].LastOnhireDate =  "-";
	                    }
	                    else{
	                    	ReturnRefResultData[i].LastOnhireDate = vformattedDocDate;
	                    }
	                    ReturnRefResultData[i]['LastOnhireDateActual'] =  vActualDate;
	    			}
		    		
		    		ReturnRefSummaryData = jQuery.grep(ReturnRefResultData , function(element, index){
  	  		            return element.SummaryFlag == "X";
  		    		});
  		    		//alert("length of summary data : "+ ReturnRefSummaryData.length);
		    		
		    		for(var i = 0; i<ReturnRefSummaryData.length;i++){
		    			//alert(i);
		    			// make Custom JSON for Table - Excel/Print
	  	                  jsonReturnSum.push({
  	                		  'Return Reference':ReturnRefSummaryData[i].ReferenceNumber,
  	                		  'Unit Type':ReturnRefSummaryData[i].UnitType,
  	                		  'Customer':ReturnRefSummaryData[i].CustomerName,
  	                		  'Total Quantity':ReturnRefSummaryData[i].TotalQuantity,
  	                		  'Outstanding Quantity':ReturnRefSummaryData[i].OutstandingQuantity,
  	                		  'Expiry Date':ReturnRefSummaryData[i].ExpiryDate,
	  	                  });
		    		}
  		    		
		    		ReturnRefDetailData = jQuery.grep(ReturnRefResultData , function(element, index){
  	  		            return element.DetailFlag == "X";
  		    		});
  		    		//alert("length of detail data : "+ ReturnRefDetailData.length);
  		    		
		    		var oreturnResultFlex = oReturn.setReturnDetailsForm();
		    		
		    		var oReturnResultModel = new sap.ui.model.json.JSONModel();
		    		oReturnResultModel.setData(ReturnRefSummaryData);
	  				var oreturnResultTable = sap.ui.getCore().byId("returnResultTable");
	  				oreturnResultTable.setModel(oReturnResultModel);
	  				oreturnResultTable.bindRows("/");
	  				
	  				if (ReturnRefSummaryData.length < 25){
	  					oreturnResultTable.setVisibleRowCount(ReturnRefSummaryData.length);
	  					oreturnResultTable.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
	  					sap.ui.getCore().byId("ReturnViewAll").setVisible(false);
	  				}else{
	  					oreturnResultTable.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
	  					oreturnResultTable.setVisibleRowCount(25);
	  					sap.ui.getCore().byId("ReturnViewAll").setVisible(true);
	  				}
	  				
	  				var oReturnResultForm = sap.ui.getCore().byId("ReturnResults");
	  				oReturnResultForm.insertField(oreturnResultFlex,0);
	  				busyDialog.close();
  		    	}
  		    	
  		    	
  		    },
  		    function(err){
  		    	errorfromServer(err);
  		    	/*busyDialog.close();
  		    	if(err.response.statusCode == "500"){
  		    		sap.ui.commons.MessageBox.alert("Server Response Timeout");
  		    		sap.ui.commons.MessageBox.show("Server Response Timeout",
  		    			  sap.ui.commons.MessageBox.Icon.INFORMATION,
  		    			  "Information",
  		    			  [sap.ui.commons.MessageBox.Action.OK], 
  		    			  sap.ui.commons.MessageBox.Action.OK
  		    		);
  		    	}
  		    	else{
  		    		//alert("Error while reading Returns : "+ window.JSON.stringify(err.response));
  	  		    	sap.ui.commons.MessageBox.alert("Error while reading Returns : "+window.JSON.stringify(err.response));
  		    	}*/
  		    });
			
	},
	gotoReturnRefDetails:function(){
		//alert("in goto" + selctedReturnRefNo);
		selReturnRefData = jQuery.grep(ReturnRefResultData, function(element, index){
	            return element.DetailFlag == "X" && element.ReferenceNumber == seletedReturnRefNo && element.UnitType == selctedReturnUnitType;
  		});
		
		for(var i=0;i<selReturnRefData.length;i++){
			if(selReturnRefData[i].ScrLimit.trim().length >0)
				selReturnRefData[i]['scrLimitCurr'] = "USD";
			else
				selReturnRefData[i]['scrLimitCurr'] = "";
		}
		
		//alert("Selc Ref data "+ selReturnRefData.length);
		if(selReturnRefData.length > 0){
			var bus = sap.ui.getCore().getEventBus();
			bus.publish("nav", "to", {
					id : "ReturnDetails"
			});
			$('#idHdrContnt').html('Return Reference Details'); //CHANGE HEADER CONTENT
			var oReturnDetail = new returnReferenceDetails();
			
			var screenflex = sap.ui.getCore().byId("oReturnRefDetailScreenFlex");
			if(screenflex)
				screenflex.destroyItems();
			
			oReturnDetail.createReturnDetails();
			oReturnDetail.bindReturnRefDetails();
			
		}else{
			sap.ui.commons.MessageBox.alert("No data available for Return Reference Number : "+ seletedReturnRefNo);
		}
		
	},
	validateHardCode:function(){
		var isValid = true;
		if(sap.ui.getCore().byId("returnHardCode").getValue() == ""){
			sap.ui.getCore().byId("returnHardCode").setValueState(sap.ui.core.ValueState.Error);
			sap.ui.getCore().byId("returnHardCode").setPlaceholder("Required");
			isValid = false;
		}
	
		return isValid;
	}
	
});
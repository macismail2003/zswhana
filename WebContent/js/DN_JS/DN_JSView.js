// HSN_SW_02102017
jQuery.sap.require("sap.ui.model.json.JSONModel");
var dnjsController;
var odnjs;
var dnjsResultData = [];
var jsonDNJS = [];

sap.ui.model.json.JSONModel.extend("DN_JSview", { 
	
	createDNJSSearch: function(oController){
		odnjs = this;
		dnjsController = oController;
		
		jQuery.sap.require("js.DN_JS.DNJSAutoMulti");
		var oDNJSAuto = new DNJSAutoMulti();
		
		var confirmMessage = "This will reset all the search inputs so far. Do you want to continue?";
		//var labSearchBy =  new sap.m.Text({text:"Search By"}).addStyleClass("font11Bold");
		var labHardCode =  new sap.ui.commons.Label({text:"Customer ID:",
			wrapping: true,
			required:true,
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: false})}).addStyleClass("marginTop15");
		
		/*var labHardCode2 =  new sap.ui.commons.Label({text:"Temporary Field Added till Security is implemented",
			wrapping: true,
			layoutData: new sap.ui.layout.GridData({span: "L2 M2 S4"})}).addStyleClass("font10");*/
		
		var HrdFlex = new sap.m.FlexBox({ items: [  labHardCode  ],  direction: "Column"	,
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: false})});
		
		var labDNJSRef1 = new sap.ui.commons.Label({text: "DN / JS Reference:",
			wrapping: true});
		var labDNJSRef2 = new sap.ui.commons.Label({text: "1 per line, 25 max",
			wrapping: true}).addStyleClass("font10");
		var labDNJSRef3 = new sap.ui.commons.Label({text: "Use Enter to navigate to the next line",
			wrapping: true}).addStyleClass("font10");
		/*var labDNJSRef4 = new sap.ui.commons.Label({text: "Use Shift + TAB to navigate to the previous line)",
			wrapping: true}).addStyleClass("font10");*/
		var refFlex = new sap.m.FlexBox({ items: [  labDNJSRef1, labDNJSRef2,labDNJSRef3  ],  direction: "Column",
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: false})}).addStyleClass("marginTop15");
		
		var labCity = new sap.ui.commons.Label({text: "City:",
			wrapping: true,
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: false})}).addStyleClass("marginTop15");
		
		var labPeriod = new sap.ui.commons.Label({text: "Off-Hire Period:",
			wrapping: true,
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: false})}).addStyleClass("marginTop15");
		
		var labUnitNo1 = new sap.ui.commons.Label({text: "Unit Number:",
			wrapping: true
			});
		var WarningText = "To view the status: For individual containers, please enter the 4 letter prefix and 7 digit number for each container. (Eg. SEGU3000511). For multiple containers (Max 25), press the Enter key after each one, or copy and paste the list to the entry field";
		
		var labUnitNo2 = new sap.ui.commons.Label({text: WarningText,
			wrapping: true
			}).addStyleClass("font10");
		
		/*var labUnitNo3 = new sap.ui.commons.Label({text: "Use Enter to navigate to the next line",
			wrapping: true}).addStyleClass("font10");*/
		/*var labReleaseRef4 = new sap.ui.commons.Label({text: "Use Shift + TAB to navigate to the previous line)",
			wrapping: true}).addStyleClass("font10");*/
		var unitFlex = new sap.m.FlexBox({ items: [  labUnitNo1, labUnitNo2/*,labUnitNo3*/  ],  
			direction: "Column"	,
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: false})}).addStyleClass("marginTop15");
		
		var labStatus = new sap.ui.commons.Label({text: "Status:",
			wrapping: true,
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: false})}).addStyleClass("marginTop15");
		var labUnitType = new sap.ui.commons.Label({text: "Unit Type:",
			wrapping: true,
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: false})}).addStyleClass("marginTop15");
		
		var oUser =  new loggedInU();
		var uId = "";
		var utype = oUser.getLoggedInUserType();
		var isEnabled = false;
		if(($.inArray(utype, ["CUSTOMER"])) == -1){
			isEnabled = true;
		}
		else{
			isEnabled = false;
			uId = oUser.getLoggedInUserID();
		}
			
		
		/*var txtHardCode = new sap.ui.commons.TextField("dnjsHardCode",{
			layoutData: new sap.ui.layout.GridData({span: "L4 M9 S12"}),
			placeholder: "Customer ID",
			enabled:isEnabled,
			value:uId,
			liveChange:function(oControlEvent){
				txtHardCode.setPlaceholder("Customer ID");
				txtHardCode.setValueState(sap.ui.core.ValueState.None);
			},
		}).addStyleClass("FormInputStyle");*/
		
		var txtHardCode = new sap.m.ComboBox("idAutoCmpltdnjsHardCode", {
			layoutData: new sap.ui.layout.GridData({span: "L4 M9 S12"}),
			width:"100%",
			//enabled: seacoUser,
			placeholder:"Select Customer",
			 change: function(evnt){
					if(this.getValue() != '')
					{
						this.setValueState(sap.ui.core.ValueState.None);
						this.setPlaceholder("Select Customer");
					}
		          }
		}).addStyleClass("FormInputStyle");
		
		oDNJSAuto.getOnlineCutomerList();
		
		var tblViewDNJSRef = new sap.ui.commons.TextArea('dnjsRefTbl',{
	         layoutData: new sap.ui.layout.GridData({span: "L4 M9 S12"}),
	                     rows:25,
	                     cols:30,
	                     height:"145px",
	                     placeholder:"DN/JS Reference",
	    }).addStyleClass("marginTop15");
		tblViewDNJSRef.setMaxLength(248);
		
		var tblViewDNJSUnit = new sap.ui.commons.TextArea('dnjsUnitTbl',{
	         layoutData: new sap.ui.layout.GridData({span: "L4 M9 S12"}),
	                     rows:25,
	                     cols:30,
	                     height:"145px",
	                     placeholder:"Unit Number",
	    }).addStyleClass("marginTop15");
		tblViewDNJSUnit.setMaxLength(323);
		
		var rgPeriod;
		var browser = sap.ui.Device.browser.chrome;
		if(browser){
			 rgPeriod = new sap.ui.commons.RadioButtonGroup("dnjsPeriod",{
		        columns : 4,
		        layoutData: new sap.ui.layout.GridData({span: "L10 M10 S12"}),
		        selectedIndex : 4,
		        select : function() {
		        	//alert('RadioButton ' + rgPeriod.getSelectedItem().getText());
		        }
		    }).addStyleClass("marginTop15");
		}
		else{
			 rgPeriod = new sap.ui.commons.RadioButtonGroup("dnjsPeriod",{
		        columns : 4,
		        layoutData: new sap.ui.layout.GridData({span: "L6 M6 S12"}),
		        selectedIndex : 4,
		        select : function() {
		        	//alert('RadioButton ' + rgPeriod.getSelectedItem().getText());
		        }
		    }).addStyleClass("marginTop15");
		}
		
		
		var oItem = new sap.ui.core.Item({
		        text : "Today", key : "TODAY"});
		rgPeriod.addItem(oItem);
		oItem = new sap.ui.core.Item({
		        text : "Yesterday", key : "YESTERDAY"});
		rgPeriod.addItem(oItem);
		oItem = new sap.ui.core.Item({
		        text : "This Week", key : "THIS WEEK"});
		rgPeriod.addItem(oItem);
		oItem = new sap.ui.core.Item({
		        text : "Last Week", key : "LAST WEEK"});
		rgPeriod.addItem(oItem);
		oItem = new sap.ui.core.Item({
		        text : "This Month", key : "THIS MONTH"});
		rgPeriod.addItem(oItem);
		oItem = new sap.ui.core.Item({
		        text : "Last Month", key : "LAST MONTH"});
		rgPeriod.addItem(oItem);
		oItem = new sap.ui.core.Item({
	        	text : "Last 3 Months", key : "LAST 3 MONTHS"});
		rgPeriod.addItem(oItem);
		
		var rgStatus;
		if(browser){
			 rgStatus = new sap.ui.commons.RadioButtonGroup("dnjsStatus",{
		        columns : 2,
		        layoutData: new sap.ui.layout.GridData({span: "L10 M10 S12"}),
		        selectedIndex : 0,
		        select : function() {
		        	//alert('RadioButton ' + rgStatus.getSelectedItem().getText());
		        }
		    }).addStyleClass("marginTop15");
		}
		else{
			 rgStatus = new sap.ui.commons.RadioButtonGroup("dnjsStatus",{
		        columns : 2,
		        layoutData: new sap.ui.layout.GridData({span: "L6 M6 S12"}),
		        selectedIndex : 0,
		        select : function() {
		        	//alert('RadioButton ' + rgStatus.getSelectedItem().getText());
		        }
		    }).addStyleClass("marginTop15");
		}
		
		var oItem2 = new sap.ui.core.Item({
		        text : "All", key : "ALL"});
		rgStatus.addItem(oItem2);
		oItem2 = new sap.ui.core.Item({
		        text : "Send to Customer", key : "SEND TO CUSTOMER"});
		rgStatus.addItem(oItem2);
		oItem2 = new sap.ui.core.Item({
		        text : "Available Billing", key : "AVAILABLE BILLING"});
		rgStatus.addItem(oItem2);
		oItem2 = new sap.ui.core.Item({
		        text : "Supersede by Joint Survey", key : "SUPERSEDED BY JOINT SURVEY"});
		rgStatus.addItem(oItem2);
		
		/*var oAutoCity = new sap.ui.core.HTML("CityHTMLViewDNJS",{layoutData: new sap.ui.layout.GridData({span: "L4 M9 S12"})});
        var htmlContentCity = '<input id="dnjsCity" placeholder=" City" class="FormInputStyle marginTop15" style="width:100%">';
        oAutoCity.setContent(htmlContentCity);*/
		var oAutoCity = new sap.m.MultiComboBox("CityHTMLViewDNJS", {
			layoutData: new sap.ui.layout.GridData({span: "L4 M9 S12"}),
			width:"100%",
			//enabled: seacoUser,
			placeholder:"Select City",
			 change: function(evnt){
					if(this.getValue() != '')
					{
						this.setValueState(sap.ui.core.ValueState.None);
						this.setPlaceholder("Select City");
					}
		          }
		}).addStyleClass("FormInputStyle");
		
        oDNJSAuto.bindCityDropDown();

		
		/*var oAutoUnitType = new sap.ui.core.HTML("UnitTypeHTMLViewDNJS",{layoutData: new sap.ui.layout.GridData({span: "L4 M9 S12"})});
        var htmlContentUnitType = '<input id="dnjsAutoUnitType" placeholder=" Unit Type" class="FormInputStyle marginTop15" style="width:100%">';
        oAutoUnitType.setContent(htmlContentUnitType);*/
        var oAutoUnitType = new sap.m.MultiComboBox("UnitTypeHTMLViewDNJS", {
			layoutData: new sap.ui.layout.GridData({span: "L4 M9 S12"}),
			width:"100%",
			//enabled: seacoUser,
			placeholder:"Select Unit Type",
			 change: function(evnt){
					if(this.getValue() != '')
					{
						this.setValueState(sap.ui.core.ValueState.None);
						this.setPlaceholder("Select Unit Type");
					}
		          }
		}).addStyleClass("FormInputStyle");
        oDNJSAuto.bindAutoUnit();

        
		var btnSubmit = new sap.m.Button({
	          text : "Submit",
	          styled:false,
	          width:"80px",
	          layoutData: new sap.ui.layout.GridData({span: "L1 M2 S4"}),
	          press:function(){
	        	  //alert("Submit CLicked");
	        	  if(odnjs.validateDNJSUnitNos(tblViewDNJSUnit)){
	        		  busyDialog.open();
	        		  odnjs.bindViewDNJSDetails();
	        	  }
	        	  
	          }
		}).addStyleClass("submitBtn marginTop15");
	
		
		var btnReset = new sap.m.Button({
	          text : "Reset",
	          styled:false,
	          width:"80px",
	          layoutData: new sap.ui.layout.GridData({span: "L1 M2 S4"}),
	          press:function(){
	        	  jQuery.sap.require("sap.ui.commons.MessageBox");
	        	  sap.ui.commons.MessageBox.show(confirmMessage,
    			  sap.ui.commons.MessageBox.Icon.WARNING,
    			  "Warning",
    			  [sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO], 
    			  odnjs.fnCallbackMessageBox,
    			  sap.ui.commons.MessageBox.Action.YES);
	          }
		}).addStyleClass("submitBtn marginTop15");
		
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
		
		var oViewDNJSSearchLayout = new sap.ui.layout.form.ResponsiveGridLayout({
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
		
		var oViewDNJSSearchForm = new sap.ui.layout.form.Form({
            layout: oViewDNJSSearchLayout,
            formContainers: [
                    new sap.ui.layout.form.FormContainer({
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
                                    //label: "Release Reference",
                                    fields: [refFlex,tblViewDNJSRef ],
                                    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                                }),
                                new sap.ui.layout.form.FormElement({
                                    //label: "Unit type",
                                    fields: [labCity,oAutoCity ],
                                    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                                }),
                                new sap.ui.layout.form.FormElement({
                                    //label: "Period",
                                    fields: [labPeriod,rgPeriod ],
                                    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                                }),
                                new sap.ui.layout.form.FormElement({
                                    //label: "Release Reference",
                                    fields: [unitFlex,tblViewDNJSUnit ],
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
                                }),
                                
                        ],layoutData: new sap.ui.layout.GridData({span: "L12 M12 S12"})
                    }),
                   new sap.ui.layout.form.FormContainer({
						formElements: [
							new sap.ui.layout.form.FormElement({
								fields: [
								
								]
							})
						],layoutData: new sap.ui.layout.GridData({span: "L1 M1 S1"})
					}),
                    new sap.ui.layout.form.FormContainer({
                        formElements: [
                                new sap.ui.layout.form.FormElement({
                                    fields: [oFlexboxButtons],
                                    //layoutData: new sap.ui.commons.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                                }),
                                new sap.ui.layout.form.FormElement({
                                    fields: [oFlexboxReq],
                                    layoutData: new sap.ui.commons.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                                })
                       ],layoutData: new sap.ui.layout.GridData({span: "L7 M12 S12",linebreak: true, margin: false})
                       
                    })
            ]
    });
	
	var oViewDNJSResultLayout = new sap.ui.layout.form.ResponsiveGridLayout();	
	var oViewDNJSResultForm = new sap.ui.layout.form.Form({
            layout: oViewDNJSResultLayout,
            formContainers: [
                    new sap.ui.layout.form.FormContainer({
                        formElements: [
                            new sap.ui.layout.form.FormElement("dnjsResults",{
                                fields: [],
                                layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                            })
                       ],layoutData: new sap.ui.commons.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                    })
            ]
    });
	var vHDivider = new sap.ui.commons.HorizontalDivider({width: "95%", type: "Area", height: "Medium"});
	var oDNJSFlexbox = new sap.m.FlexBox({
		  items: [
		    oViewDNJSSearchForm,
		    vHDivider,
		    oViewDNJSResultForm
		  ],
		  direction: "Column"
		});
	
	return oDNJSFlexbox;
	
	},
	setDNJSDetailsTable:function(){
		  var oUtil = new utility();
		  
		var oDNJSResultTable = new sap.ui.table.Table("dnjsResultTable",{
	        visibleRowCount: 5,
	        firstVisibleRow: 1,
	        fixedColumnCount: 1,
	        selectionMode: sap.ui.table.SelectionMode.None,
	        navigationMode: sap.ui.table.NavigationMode.Paginator,
		}).addStyleClass("tblBorder marginTop15");

		oDNJSResultTable.addColumn(new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "DN/JS Number"}),
	        //label: new sap.ui.commons.TextView({text: "DN/JS \n Number"}).addStyleClass("tblHeaderCustomTV"),
	        template: new sap.ui.commons.Link({
				press : function(oEvent) {
					//alert(" DNJS No : "+ this.getText() + " Unit No : "+ this.getHelpId());
					selectedDNJSNo = this.getText();
					
					var oprevTable = sap.ui.getCore().byId("dnjsResultTable");
 					oprevTable._oHSb.setScrollPosition(0);
 					
					odnjs.gotoDNJSPrimaryDetails();
				}
			}).bindProperty("text", "ObjectId").bindProperty("helpId", "UnitNumber"),
	        sortProperty: "ObjectId",
	        width: "150px",
	        resizable:false,
	        filterProperty: "ObjectId"
		}));
		oDNJSResultTable.addColumn(new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "DN/JS Date"}),
	        template: new sap.ui.commons.TextView().bindProperty("text", "DnJsDate"),
	        sortProperty: "DnJsDateActual",
	        resizable:false,
	        width: "100px",
	        filterProperty: "DnJsDate"
		}));
		oDNJSResultTable.addColumn(new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "Unit Number"}),
	        template: new sap.ui.commons.TextView().bindProperty("text", "UnitNumber"),
	        sortProperty: "UnitNumber",
	        resizable:false,
	        width: "150px",
	        filterProperty: "UnitNumber"
		}));
		oDNJSResultTable.addColumn(new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "Unit Type"}),
	        template: new sap.ui.commons.TextView().bindProperty("text", "UnitType"),
	        sortProperty: "UnitType",
	        resizable:false,
	        width: "85px",
	        filterProperty: "UnitType"
		}));
		oDNJSResultTable.addColumn(new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "Gate In Date"}),
	        template: new sap.ui.commons.TextView().bindProperty("text", "GateInDate"),
	        sortProperty: "GateInDateActual",
	        resizable:false,
	        width: "100px",
	        filterProperty: "GateInDate"
		}));
		oDNJSResultTable.addColumn(new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "Depot"}),
	        template: new sap.ui.commons.TextView().bindProperty("text", "Depot"),
	        sortProperty: "Depot",
	        resizable:false,
	        width: "240px",
	        filterProperty: "Depot"
		}));
		var oNetAmountCol = new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "Net Amount"}),
	        template: new sap.ui.commons.TextView().bindProperty("text", "NetAmount"),
	        sortProperty: "NetAmount",
	        resizable:false,
	        width: "100px",
	        filterProperty: "NetAmount",
		});
		
		oDNJSResultTable.addColumn(oNetAmountCol);
		oUtil.addColumnSorterAndFilter(oNetAmountCol, oUtil.compareUptoCount);
		
		var oTaxAmountCol = new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "Tax Amount"}),
	        template: new sap.ui.commons.TextView().bindProperty("text", "Tax"),
	        sortProperty: "Tax",
	        resizable:false,
	        width: "100px",
	        filterProperty: "Tax"
		});
		
		oDNJSResultTable.addColumn(oTaxAmountCol);
		oUtil.addColumnSorterAndFilter(oTaxAmountCol, oUtil.compareUptoCount);
		
		var oTotalAmountCol = new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "Total Amount"}),
	        template: new sap.ui.commons.TextView().bindProperty("text", "TotAmount"),
	        sortProperty: "TotAmount",
	        resizable:false,
	        width: "120px",
	        filterProperty: "TotAmount"
		});
		
		oDNJSResultTable.addColumn(oTotalAmountCol);
		oUtil.addColumnSorterAndFilter(oTotalAmountCol, oUtil.compareUptoCount);
		
		oDNJSResultTable.addColumn(new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "Currency"}),
	        template: new sap.ui.commons.TextView().bindProperty("text", "Currency"),
	        sortProperty: "Currency",
	        resizable:false,
	        width: "75px",
	        filterProperty: "Currency"
		}));
		
		var oIndCol = new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "Indicative Value in USD"}),
	        template: new sap.ui.commons.TextView().bindProperty("text", "AmountUsd"),
	        sortProperty: "AmountUsd",
	        resizable:false,
	        width: "170px",
	        filterProperty: "AmountUsd"
		});
		
		oDNJSResultTable.addColumn(oIndCol);
		oUtil.addColumnSorterAndFilter(oIndCol, oUtil.compareUptoCount);
		
		oDNJSResultTable.addColumn(new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "DN/JS Status"}),
	        template: new sap.ui.commons.TextView().bindProperty("text", "Status"),
	        sortProperty: "Status",
	        resizable:false,
	        width: "220px",
	        filterProperty: "Status"
		}));
		
		var oScrLimitCol = new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "SCR Limit"}),
	        template: new sap.ui.commons.TextView().bindProperty("text", "ScrLimit"),
	        sortProperty: "ScrLimit",
	        resizable:false,
	        width: "135px",
	        filterProperty: "ScrLimit"
		});
		
		oDNJSResultTable.addColumn(oScrLimitCol);
		oUtil.addColumnSorterAndFilter(oScrLimitCol, oUtil.compareUptoCount);
		
		oDNJSResultTable.addColumn(new sap.ui.table.Column({
	        //label: new sap.ui.commons.Label({text: ""}).setTextDirection,
	        template: new sap.ui.commons.TextView(/*{text:"USD"}*/).bindProperty("text", "scrLimitCurr"),
	        width: "50px",
	        resizable:false,
		}));
		
		oDNJSResultTable.addColumn(new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "SCR Exclusion"}),
	        template: new sap.ui.commons.TextView().bindProperty("text", "ScrExclusion"),
	        sortProperty: "ScrExclusion",
	        width: "120px",
	        resizable:false,
	        filterProperty: "ScrExclusion"
		}));
		
		var btnViewAll = new sap.m.Button("dnjsViewAll",{
	          text : "View All",
	          type:sap.m.ButtonType.Unstyled,
	          width:"80px",
	          //icon: sap.ui.core.IconPool.getIconURI("excel-attachment"),
	          press:function(){
	        	  //alert("Export to Excel");
	        	  this.setVisible(false);
	        	  if(sap.ui.getCore().byId("dnjsResultTable")){
	        		  var odnjsResultTable = sap.ui.getCore().byId("dnjsResultTable");
	        		  if (dnjsResultData.length < 100){
		  					//alert("<5");
	        			  odnjsResultTable.setVisibleRowCount(dnjsResultData.length);
	        			  odnjsResultTable.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		  					//sap.ui.getCore().byId("repairViewAll").setVisible(false);
		  				}else{
		  					odnjsResultTable.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		  					odnjsResultTable.setVisibleRowCount(100);
		  					//sap.ui.getCore().byId("repairViewAll").setVisible(true);
		  				}  
	        	  }
	          }
		}).addStyleClass("submitBtn");
		
		var oDNJSDetailsFooter = new sap.m.FlexBox({
			  items: [
			    btnViewAll
			  ],
			  direction: "Row"
		}).addStyleClass("marginTop15");
		
		var oDNJSDetailsFlex = new sap.m.FlexBox("dnjsDetailsFlex",{
			  items: [
			    //oDNJSDetailsToolbar,
			    new sap.m.Text({text:"Results"}).addStyleClass("font15Bold"),
			    oDNJSResultTable,
			    oDNJSDetailsFooter
			  ],
			  direction: "Column"
		});
		
		return oDNJSDetailsFlex;
	},
	
	validateDNJSUnitNos:function(tab){
        var isValid = true;
        //if(sap.ui.getCore().byId("idAutoCmpltdnjsHardCode").getEnabled())
	        if(sap.ui.getCore().byId("idAutoCmpltdnjsHardCode").getValue() == ""){
				sap.ui.getCore().byId("idAutoCmpltdnjsHardCode").setValueState(sap.ui.core.ValueState.Error);
				sap.ui.getCore().byId("idAutoCmpltdnjsHardCode").setPlaceholder("Required");
				isValid = false;
			}else{
				sap.ui.getCore().byId("idAutoCmpltdnjsHardCode").setValueState(sap.ui.core.ValueState.None);
				sap.ui.getCore().byId("idAutoCmpltdnjsHardCode").setPlaceholder("Select Customer");
				isValid = true;
			}
        
             return isValid;
      },
      bindViewDNJSDetails:function(){
  		//alert("Bind data");
    	  
    	var custNo = sap.ui.getCore().byId("idAutoCmpltdnjsHardCode").getSelectedKey();
  		var period = sap.ui.getCore().byId("dnjsPeriod").getSelectedItem().getKey();
  		var status = sap.ui.getCore().byId("dnjsStatus").getSelectedItem().getKey();
  		var dnjsRef = "";
  		var unitType = "";
  		//var city = $("#dnjsCity").val();
  		
  		var city = sap.ui.getCore().byId("CityHTMLViewDNJS").getSelectedKeys();
  		var selUnitType = sap.ui.getCore().byId("UnitTypeHTMLViewDNJS").getSelectedKeys();
  		var dnjsUnit1 = "";
      	var dnjsUnit2 = "";

  		//var selUnitType = $("#dnjsAutoUnitType").val();
  		
  		
  		/*if(selUnitType.length>0){
			if( selUnitType.indexOf(',') != -1){
				var str = selUnitType.split(",");
				//alert("Sel unit Type : "+selUnitType+"str length : "+ str.length);
				for(var i=0;i<str.length;i++)
					unitType = unitType + str[i].trim() + ",";
			}else{
				unitType = selUnitType.trim();
			} 
		}*/
	  	
	  	if(selUnitType != ""){
			for(var i=0;i<selUnitType.length;i++)
				unitType = unitType + selUnitType[i].trim() + ",";
	  	}else{
	  		unitType = "";
	  	}
  		
  		var dnjsRefValue = (sap.ui.getCore().byId("dnjsRefTbl").getValue()).trim();
  		var refNos = (sap.ui.getCore().byId("dnjsRefTbl").getValue()).split(/\n/g);
  		
  		//alert("REf Nos : "+dnjsRef.length);
  		if(dnjsRefValue.length > 0){
  			if(refNos.length<25){
  				for(var j=0;j<refNos.length;j++){
  					dnjsRef = dnjsRef + refNos[j]+",";
  	    		}
  			}else{
  				for(var k=0;k<25;k++){
  					dnjsRef = dnjsRef + refNos[k]+",";
  	    		}
  			}
  		}
  		
  		// Unit Nos
  		
  		var unitNosValue = (sap.ui.getCore().byId("dnjsUnitTbl").getValue()).trim();
  		var unitNos = sap.ui.getCore().byId("dnjsUnitTbl").getValue().split(/\n/g);
  		
  		if(unitNosValue.length > 0){
      		//alert(" trim : "+refNosValue.length);
      		
      		if(unitNos.length>13){
          		for(var i=0;i<13;i++){
          			dnjsUnit1 = dnjsUnit1 + unitNos[i]+",";
              	}
          		if(unitNos.length<25){
          			for(var j=13;j<unitNos.length;j++){
          				dnjsUnit2 = dnjsUnit2 + unitNos[j]+",";
              		}
          		}else{
          			for(var k=13;k<25;k++){
          				dnjsUnit2 = dnjsUnit2 + unitNos[k]+",";
              		}
          		}
          		
          	}else{
          		for(var k=0;k<unitNos.length;k++){
          			dnjsUnit1 = dnjsUnit1 + unitNos[k]+",";
              	}
          	}
      	}
  		
      		//alert("period: "+period+ " status :"+status+" unit type : "+unitType+" depot : "+ depot + " custname : "+custName);
      			//" Relse : "+ releaseRef1 + "Relse2 : "+releaseRef2+
      	var filter = "/DN_JS_View?$filter=Customer eq '"+custNo+
      				 "' and ObjectId eq '"+dnjsRef+
      				 "' and City eq '"+city+
      				 "' and OffhirePeriod eq '"+period+
      				 "' and UnitNumber eq '"+dnjsUnit1+
      				 "' and UnitNumber1 eq '"+dnjsUnit2+
      				 "' and Status eq '"+status+
      				 "' and UnitType eq '"+unitType+"'";
      	
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
    		    	busyDialog.close();
    		    	if(data.results.length == 0){
    		    		
    		    		var msgNoData = "No valid DN / JS documents found that satisfy the search criteria. \n" +
    		    				  "Please recheck / update your inputs before retrying. \n" +
    		    				  "If you cannot find the DN / JS document, please contact your \n" +
    		    				  "Seaco Customer Service Center.";
    		    		
    		    		sap.ui.commons.MessageBox.alert(msgNoData);
    		    		
    		    		if(sap.ui.getCore().byId("dnjsDetailsFlex")){
    		    			sap.ui.getCore().byId("dnjsDetailsFlex").destroy();
    		    		}
    		    	}else  	if(data.results.length>0){
    		    		
    		    		if(odnjs.validateReturnUnitNos(data.results)){
    		    			
    		    			dnjsResultData = data.results;
    			    		//alert("length of results data : "+ dnjsResultData.length);
    			    		
    			    		jsonDNJS = [];
    	    		    		
    	  		    		if(sap.ui.getCore().byId("dnjsDetailsFlex")){
    	  		    			sap.ui.getCore().byId("dnjsDetailsFlex").destroy();
    	  		    		}
    	    		    		
    	  		    		for(var i=0; i<dnjsResultData.length;i++){
    	  		    			
    	  		    			dnjsResultData[i].ObjectId = dnjsResultData[i].ObjectId.replace(/^0+/, '');
    	  		    			
    	  		    			dnjsResultData[i].NetAmount = numberWithCommas(dnjsResultData[i].NetAmount); 
    	  		    			dnjsResultData[i].Tax = numberWithCommas(dnjsResultData[i].Tax); 
    	  		    			dnjsResultData[i].TotAmount = numberWithCommas(dnjsResultData[i].TotAmount); 
    	  		    			dnjsResultData[i].AmountUsd = numberWithCommas(dnjsResultData[i].AmountUsd); 
    	  		    			dnjsResultData[i].ScrLimit = numberWithCommas(dnjsResultData[i].ScrLimit).trim();
    	
    	  		    			if(dnjsResultData[i].ScrLimit.trim().length > 0)
    	  		    				dnjsResultData[i]['scrLimitCurr'] = "USD";
    	  		    			else
    	  		    				dnjsResultData[i]['scrLimitCurr'] = "";
    	  		    			
    	  	    				// DNJS Date
    	  		    			var vDocDateResult = dnjsResultData[i].DnJsDate.split("(");
	    	                    var vDocDate = vDocDateResult[1].split(")");
	    	                    var vActualDate = new Date(Number(vDocDate[0]));
	    	                    var vformattedDocDate = dateFormat(new Date(Number(vDocDate[0])), 'dd-mm-yyyy',"UTC");
	    	                    //this is to check if the date is default 999 something show blank
	    	                    if (vformattedDocDate.substring(6) === "9999"){
	    	                    	dnjsResultData[i].DnJsDate =  "-";
	    	                    }
	    	                    else{
	    	                    	dnjsResultData[i].DnJsDate = vformattedDocDate;
	    	                    }
	    	                    dnjsResultData[i]["DnJsDateActual"] = vActualDate;
    	    	                  
    	    	                // Gate In Date
    	    	                var vDocDateResult = dnjsResultData[i].GateInDate.split("(");
    	  	                    var vDocDate = vDocDateResult[1].split(")");
    	  	                    var vActualDate = new Date(Number(vDocDate[0]));
    	  	                    var vformattedDocDate = dateFormat(new Date(Number(vDocDate[0])), 'dd-mm-yyyy',"UTC");
    	  	                    //this is to check if the date is default 999 something show blank
    	  	                    if (vformattedDocDate.substring(6) === "9999"){
    	  	                    	dnjsResultData[i].GateInDate =  "-";
    	  	                    }
    	  	                    else{
    	  	                    	dnjsResultData[i].GateInDate = vformattedDocDate;
    	  	                    }
    	  	                    dnjsResultData[i]["GateInDateActual"] = vActualDate;
    	  	                    
    	  	                  var usd = "USD";
    		    			  if(dnjsResultData[i].ScrLimit.length == 0)
    		    					usd = "";
    		    				
    	  	                 // make Custom JSON for Table - Excel/Print
    	  	  	                  jsonDNJS.push({
    	  	                		  'DN/JS Number':dnjsResultData[i].ObjectId,
    	  	                		  'DN/JS Date':dnjsResultData[i].DnJsDate,
    	  	                		  'Unit Number':dnjsResultData[i].UnitNumber,
    	  	                		  'Unit Type':dnjsResultData[i].UnitType,
    	  	                		  'Gate In Date':dnjsResultData[i].GateInDate,
    	  	                		  'Depot':dnjsResultData[i].Depot,
    	  	                		  'Net Amount':dnjsResultData[i].NetAmount,
    	  	                		  'Tax Amount':dnjsResultData[i].Tax,
    	  	                		  'Total Amount':dnjsResultData[i].TotAmount,
    	  	                		  'Currency':dnjsResultData[i].Currency,
    	  	                		  'Indicative Value in USD':dnjsResultData[i].AmountUsd,
    	  	                		  'DN/JS Status':dnjsResultData[i].Status,
    	  	                		  'SCR Limit':dnjsResultData[i].ScrLimit,
    	  	                		  '':dnjsResultData[i].scrLimitCurr,
    	  	                		  'SCR Exclusion':dnjsResultData[i].ScrExclusion,
    	  	  	                  });
    	  	                    
    	  	    			}
    	  		    		
    	  		    		var odnjsResultFlex = odnjs.setDNJSDetailsTable();
    	  		    		//alert("length of results data : "+ repairResultData.length);
    	  		    		var odnjsResultModel = new sap.ui.model.json.JSONModel();
    	  		    		odnjsResultModel.setData(dnjsResultData);
    	  		    		var odnjsResultTable = sap.ui.getCore().byId("dnjsResultTable");
    	  		    		odnjsResultTable.setModel(odnjsResultModel);
    	  		    		odnjsResultTable.bindRows("/");
    	  	  				
    	  	  				if (dnjsResultData.length < 25){
    	  	  					//alert("<5");
    	  	  					odnjsResultTable.setVisibleRowCount(dnjsResultData.length);
    	  	  					odnjsResultTable.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
    	  	  					sap.ui.getCore().byId("dnjsViewAll").setVisible(false);
    	  	  				}else{
    	  	  					odnjsResultTable.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
    	  	  					odnjsResultTable.setVisibleRowCount(25);
    	  	  					sap.ui.getCore().byId("dnjsViewAll").setVisible(true);
    	  	  				}
    	  	  				
    	  	  				var oDNJSResultForm = sap.ui.getCore().byId("dnjsResults");
    	  	  				oDNJSResultForm.insertField(odnjsResultFlex,0);
    		    		}
    		    	}
    		    	// End of Else if
    		    	busyDialog.close();
    		    },
    		    function(err){
    		    	//alert("Error while reading Repair Estimates : "+ window.JSON.stringify(err.response));
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
    		    		//alert("Error while reading Repair Estimates : "+ window.JSON.stringify(err.response));
    	  		    	sap.ui.commons.MessageBox.alert("Error while reading Repair Estimates : "+window.JSON.stringify(err.response));
    		    	}*/
    		    });
  		
  	},
  	
  	validateReturnUnitNos:function(jsonUnit){
  		var isValid = true;
  		
  		var msg = "The following Unit Numbers do not match the specified Unit Type(s). \nPlease recheck and update the values before retrying.\n";
  		for(var i=0;i<jsonUnit.length;i++){
  			if(jsonUnit[i].Message == "MISMATCH"){
  				msg = msg +"\n"+ jsonUnit[i].UnitNumber;
  				isValid = false;
  			}
  			
  		}
  		
  		if(sap.ui.getCore().byId("dnjsDetailsFlex"))
			sap.ui.getCore().byId("dnjsDetailsFlex").destroy();
  		
  		if(!isValid)
  			sap.ui.commons.MessageBox.alert(msg);
  		
  		return isValid;
  	},
  	
  	fnCallbackMessageBox:function(sResult) {
		//alert("Reset");
		if(sResult == "YES"){
			//if(sap.ui.getCore().byId("idAutoCmpltdnjsHardCode").getEnabled())
			sap.ui.getCore().byId("idAutoCmpltdnjsHardCode").setValue("");
			sap.ui.getCore().byId("idAutoCmpltdnjsHardCode").setValueState(sap.ui.core.ValueState.None);
			sap.ui.getCore().byId("idAutoCmpltdnjsHardCode").setPlaceholder("Select Customer");
				
			sap.ui.getCore().byId("dnjsRefTbl").setValue("");
			sap.ui.getCore().byId("dnjsUnitTbl").setValue("");
			// reset Period
			sap.ui.getCore().byId("dnjsPeriod").setSelectedIndex(4);
			// reset Status
			sap.ui.getCore().byId("dnjsStatus").setSelectedIndex(0);
			// reset Unit TYpe
			$("#dnjsAutoUnitType").val("");
			// reset Customer name
			//sap.ui.getCore().byId("repairCustName").setValue("");
			$("#dnjsCity").val("");
			
			dnjsResultData = [];
			jsonDNJS = [];

			// Remove Results Flex Box
			if(sap.ui.getCore().byId("dnjsDetailsFlex"))
	    			sap.ui.getCore().byId("dnjsDetailsFlex").destroy();

		}
	},
	
	gotoDNJSPrimaryDetails:function(){
		var bus = sap.ui.getCore().getEventBus();
		bus.publish("nav", "to", {
				id : "DJNS_PrimaryDetail"
		});
		$('#idHdrContnt').html('View DN/JS  - Primary Details'); //CHANGE HEADER CONTENT
		
		var oDNJSPrimaryDetail = new DNJSPrimaryDetails();
		var screenflex = sap.ui.getCore().byId("oDNJSPrimaryScreenFlex");
		if(screenflex)
			screenflex.destroyItems();
		
		oDNJSPrimaryDetail.createPrimaryDetForm();
		oDNJSPrimaryDetail.bindDNJSPrimaryDetails();
		
	},
	
});	
	
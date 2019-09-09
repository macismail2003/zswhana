/*
*$*$------------------------------------------------------------------------*
*$*$ Modified By : Seyed Ismail MAC
*$*$ Modified On : 12.03.2015
*$*$ Reference   : RTS
*$*$ Transport   : CGWK900868
*$*$ Tag         : MAC12032015
*$*$ Purpose     : Removed Period Selection
*$*$---------------------------------------------------------------------

*/	


jQuery.sap.require("sap.ui.model.json.JSONModel");
var repairController;
var repairResultData = [];
var jsonRepairSum = [];

sap.ui.model.json.JSONModel.extend("repairEstimatesSearch", {
	createRepairEstimatesSearch: function(oController){
		oRepair = this;
		repairController = oController;
		
		var orepairAuto = new repairAutoMulti();
		
		var confirmMessage = "This will reset all the search inputs so far. Do you want to continue?";
		//var labSearchBy =  new sap.m.Text({text:"Search By"}).addStyleClass("font11Bold");
		var labHardCode =  new sap.ui.commons.Label({text:"Depot Code:",
			wrapping: true,
			required:true,
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: false})});
		
		/*var labHardCode2 =  new sap.ui.commons.Label({text:"Temporary Field Added till Security is implemented",
			wrapping: true,
			layoutData: new sap.ui.layout.GridData({span: "L2 M2 S4"})}).addStyleClass("font10");*/
		
		var HrdFlex = new sap.m.FlexBox({ items: [  labHardCode ],  direction: "Column"	,
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: false})});
		
		var labDNJSRef1 = new sap.ui.commons.Label({text: "DN / JS Reference:",
			wrapping: true});
		var labDNJSRef2 = new sap.ui.commons.Label({text: "Enter 1 DN/JS reference per line. Maximum 25 entries",
			wrapping: true}).addStyleClass("font10");
		var labDNJSRef3 = new sap.ui.commons.Label({text: 'Press "Enter" to go to next line',
			wrapping: true}).addStyleClass("font10");
		/*var labDNJSRef4 = new sap.ui.commons.Label({text: "Use Shift + TAB to navigate to the previous line)",
			wrapping: true}).addStyleClass("font10");*/
		var refFlex = new sap.m.FlexBox({ items: [  labDNJSRef1, labDNJSRef2,labDNJSRef3  ],  direction: "Column",
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: false})}).addStyleClass("marginTop10");
		/* Begin of commenting by Seyed Ismail on 12.03.2015 MAC12032015 -*/
//		var labPeriod = new sap.ui.commons.Label({text: "Off-Hire Period:",
//			wrapping: true,
//			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: false})}).addStyleClass("marginTop10");
		/* End of commenting by Seyed Ismail on 12.03.2015 MAC12032015 -*/
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
		
		var labStatus = new sap.ui.commons.Label({text: "Status:",
			wrapping: true,
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: false})}).addStyleClass("marginTop10");
		var labCustomerName = new sap.ui.commons.Label({text: "Customer Name:",
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
		
		var txtHardCode = new sap.ui.commons.TextField("repairHardCode",{
			layoutData: new sap.ui.layout.GridData({span: "L1 M2 S8"}),
			placeholder: "Depot Code",
			enabled:isEnabled,
			value:uId,
			liveChange:function(oControlEvent){
				txtHardCode.setPlaceholder("Depot Code");
				txtHardCode.setValueState(sap.ui.core.ValueState.None);
			},
		}).addStyleClass("FormInputStyle");
	
		
		var tblRepairRef = new sap.ui.commons.TextArea('repairRefTbl',{
	         layoutData: new sap.ui.layout.GridData({span: "L4 M9 S12"}),
	                     rows:25,
	                     cols:30,
	                     height:"145px",
	                     placeholder:"DN/JS Reference",
	              }).addStyleClass("marginTop10");
		
		tblRepairRef.setMaxLength(248);
		
		
		var tblRepairUnit = new sap.ui.commons.TextArea('repairUnitTbl',{
	         layoutData: new sap.ui.layout.GridData({span: "L4 M9 S12"}),
	                     rows:25,
	                     cols:30,
	                     height:"145px",
	                     placeholder:"Unit Number",
	              }).addStyleClass("marginTop10");
		tblRepairUnit.setMaxLength(323);
		var browser = sap.ui.Device.browser.chrome;
		/* Begin of commenting by Seyed Ismail on 12.03.2015 MAC12032015 -*/
		/*var rgPeriod;
		
		if(browser){
			 rgPeriod = new sap.ui.commons.RadioButtonGroup("repairPeriod",{
		        columns : 4,
		        layoutData: new sap.ui.layout.GridData({span: "L10 M10 S12"}), //span: "L10 M10 S12"}),
		        selectedIndex : 4,
		        visible: false,				//MAC12032015+
		        select : function() {
		        	//alert('RadioButton ' + rgPeriod.getSelectedItem().getText());
		        }
		    }).addStyleClass("marginTop10");
		}
		else{
			 rgPeriod = new sap.ui.commons.RadioButtonGroup("repairPeriod",{
		        columns : 4,
		        layoutData: new sap.ui.layout.GridData({span: "L6 M6 S12", linebreak: false, margin: false}), //span: "L10 M10 S12"}),
		        selectedIndex : 4,
		        select : function() {
		        	//alert('RadioButton ' + rgPeriod.getSelectedItem().getText());
		        }
		    }).addStyleClass("marginTop10");
		}
		
		var oItem = new sap.ui.core.Item({
		        text : "Today", key : "TO"});
		rgPeriod.addItem(oItem);
		oItem = new sap.ui.core.Item({
		        text : "Yesterday", key : "YES"});
		rgPeriod.addItem(oItem);
		oItem = new sap.ui.core.Item({
		        text : "This Week", key : "TW"});
		rgPeriod.addItem(oItem);
		oItem = new sap.ui.core.Item({
		        text : "Last Week", key : "LW"});
		rgPeriod.addItem(oItem);
		oItem = new sap.ui.core.Item({
		        text : "This Month", key : "TM"});
		rgPeriod.addItem(oItem);
		oItem = new sap.ui.core.Item({
		        text : "Last Month", key : "LM"});
		rgPeriod.addItem(oItem);
		oItem = new sap.ui.core.Item({
	        	text : "Last 3 Months", key : "L3M"});
		rgPeriod.addItem(oItem);*/
		/* End of commenting by Seyed Ismail on 12.03.2015 MAC12032015 -*/
		var rgStatus;
		if(browser){
			 rgStatus = new sap.ui.commons.RadioButtonGroup("repairStatus",{
		        columns : 2,
		        layoutData: new sap.ui.layout.GridData({span: "L10 M10 S12"}),
		        selectedIndex : 0,
		        select : function() {
		        	//alert('RadioButton ' + rgStatus.getSelectedItem().getText());
		        }
		    }).addStyleClass("marginTop10");
		}
		else{
			 rgStatus = new sap.ui.commons.RadioButtonGroup("repairStatus",{
		        columns : 2,
		        layoutData: new sap.ui.layout.GridData({span: "L5 M5 S12"}),
		        selectedIndex : 0,
		        select : function() {
		        	//alert('RadioButton ' + rgStatus.getSelectedItem().getText());
		        }
		    }).addStyleClass("marginTop10");
		}
		
		var oItem2 = new sap.ui.core.Item({
		        text : "All", key : "ALL"});
		rgStatus.addItem(oItem2);
		oItem2 = new sap.ui.core.Item({
		        text : "Send to Customer", key : "SEND_CUST"});
		rgStatus.addItem(oItem2);
		oItem2 = new sap.ui.core.Item({
		        text : "Available Billing", key : "AVLB_BILL"});
		rgStatus.addItem(oItem2);
		/*oItem2 = new sap.ui.core.Item({
		        text : "Supersede by Joint Survey", key : "JOIN_SURV"});
		rgStatus.addItem(oItem2);*/
		
		var txtCustomer = new sap.ui.core.HTML("CustomerHTMLRep",{layoutData: new sap.ui.layout.GridData({span: "L4 M9 S12"})});
        var htmlContentCustomer = '<input id="repairCustName" placeholder=" Customer Name" class="FormInputStyle marginTop10" style="margin-top:10px;width:100%">';
        txtCustomer.setContent(htmlContentCustomer);
        orepairAuto.bindCustomerDropDown();

        var oAutoUnitType = new control.AutoCompleteValueHolder('AutoUnitTypeRep', {
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
        orepairAuto.bindAutoUnit();
        
		var btnSubmit = new sap.m.Button({
	          text : "Submit",
	          styled:false,
	          width:"80px",
	          layoutData: new sap.ui.layout.GridData({span: "L1 M2 S4"}),
	          press:function(){
	        	  //alert("Submit CLicked");
	        	  if(oRepair.validateRepairUnitNos(tblRepairUnit)){
	        		  busyDialog.open();
		        	  repairController.submitRepairClicked(); 
	        	  }
	        	  
	          }
		}).addStyleClass("submitBtn");
	
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
    			  oRepair.fnCallbackMessageBox,
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

        var labStar = new sap.ui.commons.Label({text: "* "}).addStyleClass("MandatoryStar");
	    var lblSpaceLegend = new sap.ui.commons.Label( {text: " ",width : '5px'});
	    var labRequired = new sap.ui.commons.Label({text: " Mandatory Field",wrapping: true});
		var oFlexboxReq = new sap.m.FlexBox({
				 // layoutData: new sap.ui.layout.GridData({span: "L7 M6 S4"}),
	              items: [labStar,lblSpaceLegend,labRequired],
	              direction: "Row"
		});
		
		var oRepairSearchLayout = new sap.ui.layout.form.ResponsiveGridLayout("RepairSearchLayout", {
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
		
		var oRepairSearchForm = new sap.ui.layout.form.Form("RepairSearchF1",{
            layout: oRepairSearchLayout,
            formContainers: [
                    new sap.ui.layout.form.FormContainer("RepairSearchF1C1",{
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
                                    fields: [refFlex,tblRepairRef ],
                                    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                                }),
                                /* Begin of commenting by Seyed Ismail on 12.03.2015 MAC12032015 -*/
                                /*new sap.ui.layout.form.FormElement({
                                    //label: "Period",
                                    fields: [labPeriod,rgPeriod ],
                                    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                                }),*/
                                /* End of commenting by Seyed Ismail on 12.03.2015 MAC12032015 -*/
                                new sap.ui.layout.form.FormElement({
                                    //label: "Release Reference",
                                    fields: [unitFlex,tblRepairUnit ],
                                    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                                }),
                                new sap.ui.layout.form.FormElement({
                                    //label: "Status",
                                    fields: [labStatus,rgStatus ],
                                    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                                }),
                                new sap.ui.layout.form.FormElement({
                                    //label: "Unit type",
                                    fields: [labCustomerName,txtCustomer ],
                                    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                                }),
                                new sap.ui.layout.form.FormElement({
                                    //label: "Unit type",
                                    fields: [labUnitType,oAutoUnitType ],
                                    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                                }),
                                
                        ] //,layoutData: new sap.ui.layout.GridData({span: "L12 M12 S12"})
                    }),
                   new sap.ui.layout.form.FormContainer("RepairSearchF1C2",{
						formElements: [
							new sap.ui.layout.form.FormElement({
								fields: [
								]
							})
						],layoutData: new sap.ui.layout.GridData({span: "L1 M1 S1"})
					}),
                    new sap.ui.layout.form.FormContainer("RepairSearchF1C3",{
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
	
	var oRepairResultLayout = new sap.ui.layout.form.ResponsiveGridLayout("RepairResultLayout", {});	
	var oRepairResultForm = new sap.ui.layout.form.Form("RepairResultF1",{
            layout: oRepairResultLayout,
            formContainers: [
                    new sap.ui.layout.form.FormContainer("RepairResultF1C1",{
                        formElements: [
                            new sap.ui.layout.form.FormElement("RepairResults",{
                                fields: [],
                                layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                            })
                       ],layoutData: new sap.ui.commons.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                    })
            ]
    });
	var vHDivider = new sap.ui.commons.HorizontalDivider({width: "95%", type: "Area", height: "Medium"});
	var oRepairFlexbox = new sap.m.FlexBox({
		  items: [
		    oRepairSearchForm,
		    vHDivider,
		    oRepairResultForm
		  ],
		  direction: "Column"
		});
	return oRepairFlexbox;
	
	},

	fnCallbackMessageBox:function(sResult) {
		//alert("Reset");
		if(sResult == "YES"){
			repairController.resetRepairClicked();
		}
	},
	setRepairDetailsTable:function(){
		var oRepairResultTable = new sap.ui.table.Table("repairResultTable",{
	        visibleRowCount: 5,
	        firstVisibleRow: 1,
	        fixedColumnCount: 1,
	        selectionMode: sap.ui.table.SelectionMode.None,
	        navigationMode: sap.ui.table.NavigationMode.Paginator,
		}).addStyleClass("tblBorder marginTop10");

		oRepairResultTable.addColumn(new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "DN/JS No."}).addStyleClass("wraptextcol"),
	        template: new sap.ui.commons.TextView().bindProperty("text", "DnJsNumber"),
	        sortProperty: "DnJsNumber",
	        resizable:false,
	        width: "100px",
	        filterProperty: "DnJsNumber",
		}));
		oRepairResultTable.addColumn(new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "Unit Type"}).addStyleClass("wraptextcol"),
	        template: new sap.ui.commons.TextView().bindProperty("text", "UnitType"),
	        sortProperty: "UnitType",
	        resizable:false,
	        width: "80px",
	        filterProperty: "UnitType",
		}));
		oRepairResultTable.addColumn(new sap.ui.table.Column({
		        label: new sap.ui.commons.Label({text: "Unit Number"}).addStyleClass("wraptextcol"),
		        template: new sap.ui.commons.TextView().bindProperty("text", "UnitNumber"),
		        sortProperty: "UnitNumber",
		        resizable:false,
		        width: "130px",
		        filterProperty: "UnitNumber"
		}));
		
		oRepairResultTable.addColumn(new sap.ui.table.Column({
		        label: new sap.ui.commons.Label({text: "Gate In Date"}).addStyleClass("wraptextcol"),
		        template: new sap.ui.commons.TextView().bindProperty("text", "GateInDate"),
		        sortProperty: "GateInDateActual",
		        resizable:false,
		        width: "120px",
		        filterProperty: "GateInDate"
		}));
		oRepairResultTable.addColumn(new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "DN/JS Date"}).addStyleClass("wraptextcol"),
	        template: new sap.ui.commons.TextView().bindProperty("text", "DnJsDate"),
	        sortProperty: "DnJsDateActual",
	        resizable:false,
	        width: "100px",
	        filterProperty: "DnJsDate"
		}));
		oRepairResultTable.addColumn(new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "Customer"}).addStyleClass("wraptextcol"),
	        template: new sap.ui.commons.TextView().bindProperty("text", "Customer"),
	        sortProperty: "Customer",
	        resizable:false,
	        width: "220px",
	        filterProperty: "Customer"
		}));
		var oNetCol = new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "Net"}).addStyleClass("wraptextcol"),
	        template: new sap.ui.commons.TextView().bindProperty("text", "NetAmount"),
	        sortProperty: "NetAmount",
	        resizable:false,
	        width: "75px",
	        filterProperty: "NetAmount",
		});
		var oUtil = new utility();
		oRepairResultTable.addColumn(oNetCol);
		oUtil.addColumnSorterAndFilter(oNetCol, oUtil.compareUptoCount);
		
		var oTaxAmountCol = new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "Tax"}).addStyleClass("wraptextcol"),
	        template: new sap.ui.commons.TextView().bindProperty("text", "TaxAmount"),
	        sortProperty: "TaxAmount",
	        resizable:false,
	        width: "75px",
	        filterProperty: "TaxAmount"
		});
		oRepairResultTable.addColumn(oTaxAmountCol);
		oUtil.addColumnSorterAndFilter(oTaxAmountCol, oUtil.compareUptoCount);
		
		var oTotalCol = new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "Total"}).addStyleClass("wraptextcol"),
	        template: new sap.ui.commons.TextView().bindProperty("text", "TotAmount"),
	        sortProperty: "TotAmount",
	        resizable:false,
	        width: "75px",
	        filterProperty: "TotAmount"
		});
		oRepairResultTable.addColumn(oTotalCol);
		oUtil.addColumnSorterAndFilter(oTotalCol, oUtil.compareUptoCount);
		
		oRepairResultTable.addColumn(new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "Curr."}).addStyleClass("wraptextcol"),
	        template: new sap.ui.commons.TextView().bindProperty("text", "Currency"),
	        sortProperty: "Currency",
	        resizable:false,
	        width: "75px",
	        filterProperty: "Currency"
		}));
		var oIndCol = new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "~ USD"}).addStyleClass("wraptextcol"),
	        template: new sap.ui.commons.TextView().bindProperty("text", "TotAmtUsd"),
	        sortProperty: "TotAmtUsd",
	        resizable:false,
	        width: "90px",
	        filterProperty: "TotAmtUsd"
		});
		oRepairResultTable.addColumn(oIndCol);
		oUtil.addColumnSorterAndFilter(oIndCol, oUtil.compareUptoCount);
		
		oRepairResultTable.addColumn(new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "Cust. Billing Type"}).addStyleClass("wraptextcol"),
	        template: new sap.ui.commons.TextView().bindProperty("text", "CustBillType"),
	        sortProperty: "CustBillType",
	        resizable:false,
	        width: "100px",
	        filterProperty: "CustBillType"
		}));
		oRepairResultTable.addColumn(new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "DN/JS Status"}).addStyleClass("wraptextcol"),
	        template: new sap.ui.commons.TextView().bindProperty("text", "OrdStatus"),
	        sortProperty: "OrdStatus",
	        resizable:false,
	        width: "160px",
	        filterProperty: "OrdStatus"
		}));
		var oScrCol = new sap.ui.table.Column({
			visible: true,
	        label: new sap.ui.commons.Label({text: "SCR Limit"}).addStyleClass("wraptextcol"),
	        template: new sap.ui.commons.TextView().bindProperty("text", "ScrLimit"),
	        sortProperty: "ScrLimit",
	        resizable:false,
	        width: "100px",
	        filterProperty: "ScrLimit"
		});
		oRepairResultTable.addColumn(oScrCol);
		oUtil.addColumnSorterAndFilter(oScrCol, oUtil.compareUptoCount);
		
		oRepairResultTable.addColumn(new sap.ui.table.Column({
			visible: false,
	        //label: new sap.ui.commons.Label({text: ""}).setTextDirection,
	        template: new sap.ui.commons.TextView(/*{text:"USD"}*/).bindProperty("text", "scrLimitCurr"),
	        width: "50px",
	        resizable:false,
		}));
		oRepairResultTable.addColumn(new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "SCR Exclusion"}).addStyleClass("wraptextcol"),
	        template: new sap.ui.commons.TextView().bindProperty("text", "ScrExclusion"),
	        sortProperty: "ScrExclusion",
	        width: "80px",
	        resizable:false,
	        filterProperty: "ScrExclusion"
		}));
		
		
		var btnPrint = new sap.m.Button({
	          text : "Print",
	          type:sap.m.ButtonType.Unstyled,
	          icon: sap.ui.core.IconPool.getIconURI("print"),
	          press:function(){
	        	  //alert("Print CLicked");
	        	  var tab = objUtil.makeHTMLTable(jsonRepairSum, "Repair Estimates","print");
	        	  var newWin = window.open();
	        	  newWin.document.write(tab);
	          }
		}).addStyleClass("submitBtn");
	
		
		var btnExport = new sap.m.Button({
	          text : "Export To Excel",
	          type:sap.m.ButtonType.Unstyled,
	          icon: sap.ui.core.IconPool.getIconURI("excel-attachment"),
	          press:function(){
	        	  //alert("Export to Excel");
	        	  objUtil.makeHTMLTable(jsonRepairSum, "Repair Estimates","export");
	          }
		}).addStyleClass("submitBtn");
		
		var btnViewAll = new sap.m.Button("repairViewAll",{
	          text : "View All",
	          type:sap.m.ButtonType.Unstyled,
	          width:"80px",
	          //icon: sap.ui.core.IconPool.getIconURI("excel-attachment"),
	          press:function(){
	        	  //alert("Export to Excel");
	        	  this.setVisible(false);
	        	  if(sap.ui.getCore().byId("repairResultTable")){
	        		  var orepairResultTable = sap.ui.getCore().byId("repairResultTable");
	        		  if (repairResultData.length < 100){
		  					//alert("<5");
		  					orepairResultTable.setVisibleRowCount(repairResultData.length);
		  					orepairResultTable.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		  					//sap.ui.getCore().byId("repairViewAll").setVisible(false);
		  				}else{
		  					orepairResultTable.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		  					orepairResultTable.setVisibleRowCount(100);
		  					//sap.ui.getCore().byId("repairViewAll").setVisible(true);
		  				}  
	        	  }
	          }
		}).addStyleClass("submitBtn");
		
		var oLabelSpaceRelRefDet = new sap.ui.commons.Label({text: " ",
            width:"5px",
            wrapping: true});


		var oRepairDetailsToolbar = new sap.m.FlexBox({
			  items: [
			    btnExport,oLabelSpaceRelRefDet,
			    btnPrint
			  ],
			  direction: "RowReverse"
		});
		
		var oInventoryDetailsFooter = new sap.m.FlexBox({
			  items: [
			    btnViewAll
			  ],
			  direction: "Row"
		}).addStyleClass("marginTop10");
		
		var oRepairDetailsFlex = new sap.m.FlexBox("repairDetailsFlex",{
			  items: [
			    oRepairDetailsToolbar,
			    oRepairResultTable,
			    oInventoryDetailsFooter
			  ],
			  direction: "Column"
		});
		
		return oRepairDetailsFlex;
	},
	bindRepairDetails:function(){
		//alert("Bind data");
		var depot = sap.ui.getCore().byId("repairHardCode").getValue();
		// var period = sap.ui.getCore().byId("repairPeriod").getSelectedItem().getKey();    //MAC12032015-
		var status = sap.ui.getCore().byId("repairStatus").getSelectedItem().getKey();
		var custName = $("#repairCustName").val();
		var unitType = "";
		var selUnitType = sap.ui.getCore().byId('AutoUnitTypeRep').getSelectedValues();
    	
    	for(var i in selUnitType)
			unitType += selUnitType[i].description +',';

		unitType = unitType.slice(0,-1);
		
		//alert("Bind data : "+ unitType);
		
		// Refernce Nos
		var repairRef = "";
		var refNosValue = (sap.ui.getCore().byId("repairRefTbl").getValue()).trim();
		var refNos = sap.ui.getCore().byId("repairRefTbl").getValue().split(/\n/g);
		
		//alert("REf Nos : "+refNosValue.length);
		if(refNosValue.length > 0){
			if(refNos.length<25){
				for(var j=0;j<refNos.length;j++){
					repairRef = repairRef + refNos[j]+",";
	    		}
			}else{
				for(var k=0;k<25;k++){
					repairRef = repairRef + refNos[k]+",";
	    		}
			}
		}
		
		// Unit Nos
		var repairUnit1 = "";
    	var repairUnit2 = "";
		var unitNosValue = (sap.ui.getCore().byId("repairUnitTbl").getValue()).trim();
		var unitNos = sap.ui.getCore().byId("repairUnitTbl").getValue().split(/\n/g);
		
		if(unitNosValue.length > 0){
    		//alert(" trim : "+refNosValue.length);
    		
    		if(unitNos.length>13){
        		for(var i=0;i<13;i++){
        			repairUnit1 = repairUnit1 + unitNos[i]+",";
            	}
        		if(unitNos.length<25){
        			for(var j=13;j<unitNos.length;j++){
        				repairUnit2 = repairUnit2 + unitNos[j]+",";
            		}
        		}else{
        			for(var k=13;k<25;k++){
        				repairUnit2 = repairUnit2 + unitNos[k]+",";
            		}
        		}
        		
        	}else{
        		for(var k=0;k<unitNos.length;k++){
        			repairUnit1 = repairUnit1 + unitNos[k]+",";
            	}
        	}
    	}
		
    	//alert("period: "+period+ " status :"+status+" unit type : "+unitType+" depot : "+ depot + " custname : "+custName);
    			//" Relse : "+ releaseRef1 + "Relse2 : "+releaseRef2+
    	
    	var filter = "/Repair_Estimates?$filter=DepotNumber eq '"+depot+
    				 "' and DnJsReference eq '"+repairRef+
    	             "' and UnitNo  eq '"+repairUnit1+
    	             "' and UnitNo1  eq '"+repairUnit2+
    	             //"' and OffHirePeriod eq '"+period+    //MAC12032015-
    	             "' and Status eq '"+status+
    	             "' and CustName eq '"+custName+
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
  		    	
  		    	if(data.results.length == 0){
  		    		busyDialog.close();
  		    		sap.ui.commons.MessageBox.alert("No Results Found. Please edit / refine your search criteria and search again.");
  		    		if(sap.ui.getCore().byId("repairDetailsFlex")){
		    			sap.ui.getCore().byId("repairDetailsFlex").destroy();
		    		}
  		    	}else  	if(data.results.length>0){
  		    		
  		    		repairResultData = data.results;
  		    		//alert("length of results data : "+ repairResultData.length);
  		    		
  		    		jsonRepairSum = [];
  		    		
		    		if(sap.ui.getCore().byId("repairDetailsFlex")){
		    			sap.ui.getCore().byId("repairDetailsFlex").destroy();
		    		}
  		    		
		    		for(var i=0; i<repairResultData.length;i++){
		    			
		    			repairResultData[i].DnJsNumber = repairResultData[i].DnJsNumber.replace(/^0+/, '');
		    			
		    			repairResultData[i].NetAmount = numberWithCommas(repairResultData[i].NetAmount); 
		    			repairResultData[i].TaxAmount = numberWithCommas(repairResultData[i].TaxAmount); 
		    			repairResultData[i].TotAmount = numberWithCommas(repairResultData[i].TotAmount); 
		    			repairResultData[i].TotAmtUsd = numberWithCommas(repairResultData[i].TotAmtUsd); 
		    			var scrlim = repairResultData[i].ScrLimit;
		    			var split;
		    			if(scrlim.trim().length > 0){
		    				split = repairResultData[i].ScrLimit.split(" ");
		    				repairResultData[i].ScrLimit = numberWithCommas(split[0]);
		    			}
		    			//repairResultData[i].ScrLimit = numberWithCommas(repairResultData[i].ScrLimit);

	    				// DNJS Date
		    			var vDocDateResult = repairResultData[i].DnJsDate.split("(");
  	                    var vDocDate = vDocDateResult[1].split(")");
  	                    var vActualDate = new Date(Number(vDocDate[0]));
  	                    var vformattedDocDate = dateFormat(new Date(Number(vDocDate[0])), 'dd-mm-yyyy',"UTC");
  	                    //this is to check if the date is default 999 something show blank
  	                    if (vformattedDocDate.substring(6) === "9999"){
  	                    	repairResultData[i].DnJsDate =  "-";
  	                    }
  	                    else{
  	                    	repairResultData[i].DnJsDate = vformattedDocDate;
  	                    }
  	                    repairResultData[i]['DnJsDateActual'] =  vActualDate;
  	                  
  	                    // Gate In Date
  	                    var vDocDateResult = repairResultData[i].GateInDate.split("(");
	                    var vDocDate = vDocDateResult[1].split(")");
	                    var vActualDate = new Date(Number(vDocDate[0]));
	                    var vformattedDocDate = dateFormat(new Date(Number(vDocDate[0])), 'dd-mm-yyyy',"UTC");
	                    //this is to check if the date is default 999 something show blank
	                    if (vformattedDocDate.substring(6) === "9999"){
	                    	repairResultData[i].GateInDate =  "-";
	                    }
	                    else{
	                    	repairResultData[i].GateInDate = vformattedDocDate;
	                    }
	                    repairResultData[i]['GateInDateActual'] =  vActualDate;
	                    
	                    
            			if(repairResultData[i].ScrLimit.trim().length >0)
            				repairResultData[i]['scrLimitCurr'] = "USD";
            			else
            				repairResultData[i]['scrLimitCurr'] = "";
	            			
	                 // make Custom JSON for Table - Excel/Print
	  	                  jsonRepairSum.push({
	                		  'DN Number':repairResultData[i].DnJsNumber,
	                		  'Unit Type':repairResultData[i].UnitType,
	                		  'Unit Number':repairResultData[i].UnitNumber,
	                		  'Gate In Date':repairResultData[i].GateInDate,
	                		  'DN/JS Date':repairResultData[i].DnJsDate,
	                		  'Customer':repairResultData[i].Customer,
	                		  'Net Amount':repairResultData[i].NetAmount,
	                		  'Tax Amount':repairResultData[i].TaxAmount,
	                		  'Total Amount':repairResultData[i].TotAmount,
	                		  'Currency':repairResultData[i].Currency,
	                		  '~ USD':repairResultData[i].TotAmtUsd,
	                		  'Customer Billing Type':repairResultData[i].CustBillType,
	                		  'DN/JS Status':repairResultData[i].OrdStatus,
	                		  'SCR Limit':repairResultData[i].ScrLimit,
	                		  '':repairResultData[i].scrLimitCurr,
	                		  'SCR Exclusion':repairResultData[i].ScrExclusion,
	  	                  });
	                    
	    			}
		    		
		    		var orepairResultFlex = oRepair.setRepairDetailsTable();
		    		//alert("length of results data : "+ repairResultData.length);
		    		var oRepairResultModel = new sap.ui.model.json.JSONModel();
		    		oRepairResultModel.setData(repairResultData);
		    		var orepairResultTable = sap.ui.getCore().byId("repairResultTable");
		    		orepairResultTable.setModel(oRepairResultModel);
		    		orepairResultTable.bindRows("/");
	  				
	  				if (repairResultData.length < 25){
	  					//alert("<5");
	  					orepairResultTable.setVisibleRowCount(repairResultData.length);
	  					orepairResultTable.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
	  					sap.ui.getCore().byId("repairViewAll").setVisible(false);
	  				}else{
	  					orepairResultTable.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
	  					orepairResultTable.setVisibleRowCount(25);
	  					sap.ui.getCore().byId("repairViewAll").setVisible(true);
	  				}
	  				
	  				var oRepairResultForm = sap.ui.getCore().byId("RepairResults");
	  				oRepairResultForm.insertField(orepairResultFlex,0);
  				
  		    	}
  		    	
  		    	busyDialog.close();
  		    },
  		    function(err){
  		    	errorfromServer(err);
  		    });
		
	},
	validateRepairUnitNos:function(tab){
        var isValid = true;
        if(sap.ui.getCore().byId("repairHardCode").getValue() == ""){
			sap.ui.getCore().byId("repairHardCode").setValueState(sap.ui.core.ValueState.Error);
			sap.ui.getCore().byId("repairHardCode").setPlaceholder("Required");
			isValid = false;
		}
      return isValid;
      }

	
});
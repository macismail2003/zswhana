jQuery.sap.require("sap.ui.model.json.JSONModel");
var returnRefResultDetailsData = [];
var selReturnRefData = [];
var seletedReturnRefNo="";
var selctedUnitType="";
var jsonReturnDet = [];
sap.ui.model.json.JSONModel.extend("returnReferenceDetails", {
	
	createScreenFlex:function(){
		
		var oScreenFlex = new sap.m.FlexBox("oReturnRefDetailScreenFlex",{
			  items: [ ],
			  direction:"Column"
		});
		return oScreenFlex;
	},
	
	createReturnDetails:function(){
		var oReturnDetailsLayout = new sap.ui.layout.form.ResponsiveGridLayout("ReturnDetailsLayout", {
		});
		var backToReturn = new sap.m.Link("backToReturn", {text: " < Back",
			width:"10%",
			wrapping:true,
            press: function(){
                   var bus = sap.ui.getCore().getEventBus();
                       bus.publish("nav", "back");
                       $('#idHdrContnt').html('Returns'); //CHANGE HEADER CONTENT
        }});
		var btnPrint = new sap.m.Button({
	          text : "Print",
	          type:sap.m.ButtonType.Unstyled,
	          icon: sap.ui.core.IconPool.getIconURI("print"),
	          press:function(){
	        	  //alert("Print CLicked");
	        	  var tab = objUtil.makeHTMLTable(jsonReturnDet, "Return Reference Details","print");
	        	  var newWin = window.open();
	        	  newWin.document.write(tab);
	        	  newWin.print();
	          }
		}).addStyleClass("submitBtn");
	
		
		var btnExport = new sap.m.Button({
	          text : "Export To Excel",
	          type:sap.m.ButtonType.Unstyled,
	          icon: sap.ui.core.IconPool.getIconURI("excel-attachment"),
	          press:function(){
	        	  //alert("Export to Excel");
	        	  objUtil.makeHTMLTable(jsonReturnDet, "Return Reference Details","export");
	          }
		}).addStyleClass("submitBtn");
		
		var btnViewAll = new sap.m.Button("retDetViewAll",{
	          text : "View All",
	          type:sap.m.ButtonType.Unstyled,
	          visible:false,
	          width:"80px",
	          //icon: sap.ui.core.IconPool.getIconURI("excel-attachment"),
	          press:function(){
	        	  //alert("View All");
	        	  this.setVisible(false);
	        	  if(sap.ui.getCore().byId("returnResultDetailsTable")){
	        		  var oreturnResultDetailTable = sap.ui.getCore().byId("returnResultDetailsTable");
	        		  if (selReturnRefData.length < 100){
	        				oreturnResultDetailTable.setVisibleRowCount(selReturnRefData.length);
	        				oreturnResultDetailTable.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
	        				//sap.ui.getCore().byId("retDetViewAll").setVisible(false);
	        			}else{
	        				oreturnResultDetailTable.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
	        				oreturnResultDetailTable.setVisibleRowCount(100);
	        				//sap.ui.getCore().byId("retDetViewAll").setVisible(true);
	        			}  
	        	  }
	          }
		}).addStyleClass("submitBtn");
		
		
		var oReturnRefDetailsTitle = new sap.m.FlexBox({
			  items: [
			    new sap.m.Text({text:"Return Reference Details"}).addStyleClass("font15Bold")
			  ],
			  direction: "Row",
			  width:"60%"
		});
		var oLabelSpaceRelRefDet = new sap.ui.commons.Label({text: " ",
            width:"5px",
            wrapping: true});


		var oReturnRefDetailsButtons = new sap.m.FlexBox({
			  items: [
			    btnExport,oLabelSpaceRelRefDet,
			    btnPrint
			  ],
			  direction: "RowReverse",
			  width:"40%"
		});
		
		
		var oReturnRefDetailsToolbar = new sap.m.FlexBox({
			  items: [
			    oReturnRefDetailsTitle,
			    oReturnRefDetailsButtons
			  ],
			  width:"100%",
			  direction: "Row"
			});
		
		var oReturnRefDetailsFooter = new sap.m.FlexBox({
			  items: [
			    btnViewAll
			  ],
			  direction: "Row"
		}).addStyleClass("marginTop10");
		
		var oReturnResultDetailsTable = new sap.ui.table.Table("returnResultDetailsTable",{
	        visibleRowCount: 5,
	        firstVisibleRow: 3,
	        columnHeaderHeight: 30,
	        selectionMode: sap.ui.table.SelectionMode.None,
	        navigationMode: sap.ui.table.NavigationMode.Paginator,
	        //width: "200%",
	        fixedColumnCount: 1,
		}).addStyleClass("tblBorder marginTop10");

		oReturnResultDetailsTable.addColumn(new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "RA No"}).addStyleClass("wraptextcol"),
	        template: new sap.ui.commons.TextView().bindProperty("text", "ReferenceNumber"),
	        sortProperty: "ReferenceNumber",
	        width: "100px",
	        resizable:false,
	        filterProperty: "ReferenceNumber",
		}));
		
		oReturnResultDetailsTable.addColumn(new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "RA Expiry"}).addStyleClass("wraptextcol"),
	        template: new sap.ui.commons.TextView().bindProperty("text", "ExpiryDate"),
	        sortProperty: "ExpiryDateActual",
	        width: "100px",
	        resizable:false,
	        filterProperty: "ExpiryDate"
		}));
		
		oReturnResultDetailsTable.addColumn(new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "Return Status"}).addStyleClass("wraptextcol"),
	        template: new sap.ui.commons.TextView().bindProperty("text", "ReturnStatus"),
	        sortProperty: "ReturnStatus",
	        width: "140px",
	        resizable:false,
	        filterProperty: "ReturnStatus"
		}));
		
		oReturnResultDetailsTable.addColumn(new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "Unit No"}).addStyleClass("wraptextcol"),
	        template: new sap.ui.commons.TextView().bindProperty("text", "UnitNo"),
	        sortProperty: "UnitNo",
	        width: "130px",
	        resizable:false,
	        filterProperty: "UnitNo",
		}));
		
		oReturnResultDetailsTable.addColumn(new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "Unit Type"}).addStyleClass("wraptextcol"),
	        template: new sap.ui.commons.TextView().bindProperty("text", "UnitType"),
	        sortProperty: "UnitType",
	        width: "90px",
	        resizable:false,
	        filterProperty: "UnitType",
		}));
		
		oReturnResultDetailsTable.addColumn(new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "Customer Name"}).addStyleClass("wraptextcol"),
	        template: new sap.ui.commons.TextView().bindProperty("text", "CustomerName"),
	        sortProperty: "CustomerName",
	        width: "220px",
	        resizable:false,
	        filterProperty: "CustomerName",
		}));
		
		oReturnResultDetailsTable.addColumn(new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "Contract"}).addStyleClass("wraptextcol"),
	        template: new sap.ui.commons.TextView().bindProperty("text", "ContractNo"),
	        sortProperty: "ContractNo",
	        width: "75px",
	        resizable:false,
	        filterProperty: "ContractNo"
		}));
		
		oReturnResultDetailsTable.addColumn(new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "Bill. Type"}).addStyleClass("wraptextcol"),
	        template: new sap.ui.commons.TextView().bindProperty("text", "CustBillingType"),
	        sortProperty: "CustBillingType",
	        width: "90px",
	        resizable:false,
	        filterProperty: "CustBillingType",
		}));
		
		oReturnResultDetailsTable.addColumn(new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "Gate In Date"}).addStyleClass("wraptextcol"),
	        template: new sap.ui.commons.TextView().bindProperty("text", "GateInDate"),
	        sortProperty: "GateInDateActual",
	         width: "140px",
	         resizable:false,
	        filterProperty: "GateInDate"
		}));
		
		var oSCRLimit = new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "SCR Limit"}).addStyleClass("wraptextcol"),
	        template: new sap.ui.commons.TextView().bindProperty("text", "ScrLimit"),
	        sortProperty: "ScrLimit",
	        width: "100px",
	        resizable:false,
	        filterProperty: "ScrLimit",
		});
		var oUtil = new utility();
		oReturnResultDetailsTable.addColumn(oSCRLimit);
		oUtil.addColumnSorterAndFilter(oSCRLimit, oUtil.compareUptoCount);
		
		oReturnResultDetailsTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Curr"}).addStyleClass("wraptextcol"),
	        template: new sap.ui.commons.TextView(/*{text:"USD"}*/).bindProperty("text", "scrLimitCurr"),
	        width: "50px",
	        resizable:false,
		}));
		
		oReturnResultDetailsTable.addColumn(new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "SCR Excl."}).addStyleClass("wraptextcol"),
	        template: new sap.ui.commons.TextView().bindProperty("text", "ScrExclusion"),
	        sortProperty: "ScrExclusion",
	        width: "95px",
	        resizable:false,
	        filterProperty: "ScrExclusion"
	        
		}));
		
		oReturnResultDetailsTable.addColumn(new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "Last On-Hire Date"}).addStyleClass("wraptextcol"),
	        template: new sap.ui.commons.TextView().bindProperty("text", "LastOnhireDate"),
	        sortProperty: "LastOnhireDateActual",
	        width: "140px",
	        resizable:false,
	        filterProperty: "LastOnhireDate",
		}));
		
		oReturnResultDetailsTable.addColumn(new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "Last On-Hire City"}).addStyleClass("wraptextcol"),
	        template: new sap.ui.commons.TextView().bindProperty("text", "LastOnhireCity"),
	        sortProperty: "LastOnhireCity",
	        width: "140px",
	        resizable:false,
	        filterProperty: "LastOnhireCity",
		}));
		oReturnResultDetailsTable.addColumn(new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "TB Reference"}).addStyleClass("wraptextcol"),
	        template: new sap.ui.commons.TextView().bindProperty("text", "TbReference"),
	        sortProperty: "TbReference",
	         width: "130px",
	         resizable:false,
	        filterProperty: "TbReference"
		}));

		oReturnResultDetailsTable.addColumn(new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "Manuf. Date"}).addStyleClass("wraptextcol"),
	        template: new sap.ui.commons.TextView().bindProperty("text", "ManufacturingDate"),
	        sortProperty: "ManufacturingDateActual",
	        width: "120px",
	        resizable:false,
	        filterProperty: "ManufacturingDate"
		}));
		oReturnResultDetailsTable.addColumn(new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "Sales Ind."}).addStyleClass("wraptextcol"),
	        template: new sap.ui.commons.TextView().bindProperty("text", "SalesIndicator"),
	        sortProperty: "SalesIndicator",
	        width: "90px",
	        resizable:false,
	        filterProperty: "SalesIndicator"
		}));


		
		
		var oReturnSearchForm = new sap.ui.layout.form.Form("ReturnDetailsF1",{
         layout: oReturnDetailsLayout,
         formContainers: [
                 new sap.ui.layout.form.FormContainer("ReturnDetailsF1C1",{
                     formElements: [
							new sap.ui.layout.form.FormElement({
							    //fields: [backToReturn,newReturn],
								fields: [backToReturn],
							    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
							}),
							/*new sap.ui.layout.form.FormElement({
								fields: [ new sap.m.Text({text:"Return Reference Details"}).addStyleClass("font15Bold")],
								layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
							}),*/
                            new sap.ui.layout.form.FormElement({
                                 fields: [oReturnRefDetailsToolbar],
                                 layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                            }),
                            new sap.ui.layout.form.FormElement({
                                 fields: [oReturnResultDetailsTable],
                                 layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                            }),
                            new sap.ui.layout.form.FormElement({
                                fields: [oReturnRefDetailsFooter],
                                layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                           })
                     ]
                 })
         ]
		});
		
		sap.ui.getCore().byId("oReturnRefDetailScreenFlex").addItem(oReturnSearchForm);
		//return oReturnSearchForm;
	},
	
	bindReturnRefDetails:function(){
		
		jsonReturnDet=[];
		
		var oReturnRefResultDetailsModel = new sap.ui.model.json.JSONModel();
		oReturnRefResultDetailsModel.setData(selReturnRefData);
		var oreturnResultDetailTable = sap.ui.getCore().byId("returnResultDetailsTable");
		oreturnResultDetailTable.setModel(oReturnRefResultDetailsModel);
		oreturnResultDetailTable.bindRows("/");
		
		if (selReturnRefData.length < 25){
			oreturnResultDetailTable.setVisibleRowCount(selReturnRefData.length);
			oreturnResultDetailTable.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
			sap.ui.getCore().byId("retDetViewAll").setVisible(false);
		}else{
			oreturnResultDetailTable.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
			oreturnResultDetailTable.setVisibleRowCount(25);
			sap.ui.getCore().byId("retDetViewAll").setVisible(true);
		}
		//alert(selRefData.length);
		for(var i = 0; i<selReturnRefData.length;i++){
				
			// make Custom JSON for Table - Excel/Print
				jsonReturnDet.push({
		  		  'RA No':selReturnRefData[i].ReferenceNumber,
		  		  'Unit No.':selReturnRefData[i].UnitNo,
		  		  'Unit Type':selReturnRefData[i].UnitType,
		  		  'SCR Limit':selReturnRefData[i].ScrLimit,
		  		  '':selReturnRefData[i].scrLimitCurr,
		  		  'Last On-Hire Date':selReturnRefData[i].LastOnhireDate,
		  		  'Last On-Hire City':selReturnRefData[i].LastOnhireCity,
		  		  'Customer Billing Type':selReturnRefData[i].CustBillingType,
		  		  'Customer Name':selReturnRefData[i].CustomerName,
		  		  'Return Status':selReturnRefData[i].ReturnStatus,
		  		  'Contract Number':selReturnRefData[i].ContractNo,
		  		  'Manufacturing Date':selReturnRefData[i].ManufacturingDate,
		  		  'Sales Indicator':selReturnRefData[i].SalesIndicator,
		  		  'TB Reference':selReturnRefData[i].TbReference,
		  		  'Gate In (If already Off-Hired)':selReturnRefData[i].GateInDate,
		  		  'RA Expire Date':selReturnRefData[i].ExpiryDate,
		  		  'SCR Exclusions':selReturnRefData[i].ScrExclusion
		        });
		}
	
	}

	
});
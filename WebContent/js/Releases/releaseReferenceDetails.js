jQuery.sap.require("sap.ui.model.json.JSONModel");
var releaseRefResultDetailsData = [];
var selRefData = [];
var seletedRelRefNo="";
var selectedRelUnit="";
var jsonReleaseDet = [];
sap.ui.model.json.JSONModel.extend("releaseReferenceDetails", {
	
	createScreenFlex:function(){
		
		var oScreenFlex = new sap.m.FlexBox("oReleaseRefDetailScreenFlex",{
			  items: [ ],
			  direction:"Column"
		});
		return oScreenFlex;
	},
	
	createReleaseRefDetails:function(){
		//$('#idHdrContnt').html('Release Reference Details'); //CHANGE HEADER CONTENT
		var oReleaseDetailsLayout = new sap.ui.layout.form.ResponsiveGridLayout("ReleaseDetailsLayout", {});
		var backToRelease = new sap.m.Link("backToRelease", {text: " < Back",
			width:"10%",
			wrapping:true,
            press: function(){
                   var bus = sap.ui.getCore().getEventBus();
                       bus.publish("nav", "back");
                       $('#idHdrContnt').html('Releases'); //CHANGE HEADER CONTENT
        }});
		var btnPrint = new sap.m.Button({
	          text : "Print",
	          type:sap.m.ButtonType.Unstyled,
	          icon: sap.ui.core.IconPool.getIconURI("print"),
	          press:function(){
	        	  //alert("Print CLicked" + jsonReleaseDet.length);
	        	  var tab = objUtil.makeHTMLTable(jsonReleaseDet, "Release Reference Details","print");
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
	        	 // alert("Export to Excel");
	        	  objUtil.makeHTMLTable(jsonReleaseDet, "Release Reference Details","export");
	          }
		}).addStyleClass("submitBtn");
		
		var btnViewAll = new sap.m.Button("relDetViewAll",{
	          text : "View All",
	          type:sap.m.ButtonType.Unstyled,
	          visible:false,
	          width:"80px",
	          //icon: sap.ui.core.IconPool.getIconURI("excel-attachment"),
	          press:function(){
	        	 // alert("View All");
	        	  this.setVisible(false);
	        	  if(sap.ui.getCore().byId("releaseResultDetailsTable")){
	        		  var oreleaseResultDetailTable = sap.ui.getCore().byId("releaseResultDetailsTable");
	        		  if (selRefData.length < 100){
	      					oreleaseResultDetailTable.setVisibleRowCount(selRefData.length);
	      					oreleaseResultDetailTable.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
	      					//sap.ui.getCore().byId("relDetViewAll").setVisible(false);
	        		  }else{
	      					oreleaseResultDetailTable.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
	      					oreleaseResultDetailTable.setVisibleRowCount(100);
	      					//sap.ui.getCore().byId("relDetViewAll").setVisible(true);
	        		  }  
	        	  }
	          }
		}).addStyleClass("submitBtn");
		
		
		
		var oReleaseRefDetailsTitle = new sap.m.FlexBox({
			  items: [
			    new sap.m.Text({text:"Release Reference Details"}).addStyleClass("font15Bold marginTop10")
			  ],
			  direction: "Row",
			  width:"60%"
		});
		var oLabelSpaceRelRefDet = new sap.ui.commons.Label({text: " ",
            width:"5px",
            wrapping: true});


		var oReleaseRefDetailsButtons = new sap.m.FlexBox({
			  items: [
			    btnExport,oLabelSpaceRelRefDet,
			    btnPrint
			  ],
			  direction: "RowReverse",
			  width:"40%"
		});
		
		var oReleaseRefDetailsToolbar = new sap.m.FlexBox({
			  items: [
			    oReleaseRefDetailsTitle,
			    oReleaseRefDetailsButtons
			  ],
			  width:"100%",
			  direction: "Row"
		});
		
		
		
		var oReleaseRefDetailsFooter = new sap.m.FlexBox({
			  items: [
			    btnViewAll
			  ],
			  direction: "Row"
		}).addStyleClass("marginTop10");
		
		
		var oreleaseResultDetailsTable = new sap.ui.table.Table("releaseResultDetailsTable",{
	        visibleRowCount: 10,
	        firstVisibleRow: 1,
	        columnHeaderHeight: 30,
	        selectionMode: sap.ui.table.SelectionMode.None,
	        navigationMode: sap.ui.table.NavigationMode.Paginator,
	        fixedColumnCount: 1
	        
		}).addStyleClass("tblBorder marginTop10");

		oreleaseResultDetailsTable.addColumn(new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "Reference"}).addStyleClass("wraptextcol"),
	        template: new sap.ui.commons.TextView().bindProperty("text", "RelaseNo"),
	        sortProperty: "RelaseNo",
	        width: "100px",
	        resizable:false,
	        filterProperty: "RelaseNo",
		}));
		oreleaseResultDetailsTable.addColumn(new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "Unit Type"}).addStyleClass("wraptextcol"),
	        template: new sap.ui.commons.TextView().bindProperty("text", "UnitType"),
	        sortProperty: "UnitType",
	        width: "100px",
	        resizable:false,
	        filterProperty: "UnitType",
		}));
		oreleaseResultDetailsTable.addColumn(new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "Unit No."}).addStyleClass("wraptextcol"),
	        template: new sap.ui.commons.TextView().bindProperty("text", "UnitNo"),
	        sortProperty: "UnitNo",
	        width: "110px",
	        resizable:false,
	        filterProperty: "UnitNo",
		}));
		oreleaseResultDetailsTable.addColumn(new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "Customer Name"}).addStyleClass("wraptextcol"),
	        template: new sap.ui.commons.TextView().bindProperty("text", "CustNam"),
	        sortProperty: "CustNam",
	        width: "220px",
	        resizable:false,
	        filterProperty: "CustNam",
		}));
		
		oreleaseResultDetailsTable.addColumn(new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "Type of Movement"}).addStyleClass("wraptextcol"),
	        template: new sap.ui.commons.TextView().bindProperty("text", "MoveType"),
	        sortProperty: "MoveType",
	        width: "180px",
	        resizable:false,
	        filterProperty: "MoveType"
		}));
		oreleaseResultDetailsTable.addColumn(new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "Release Status"}).addStyleClass("wraptextcol"),
	        template: new sap.ui.commons.TextView().bindProperty("text", "RelStat"),
	        sortProperty: "RelStat",
	        width: "150px",
	        resizable:false,
	        filterProperty: "RelStat"
		}));
		oreleaseResultDetailsTable.addColumn(new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "Lease Number"}).addStyleClass("wraptextcol"),
	        template: new sap.ui.commons.TextView().bindProperty("text", "LeaseNo"),
	        sortProperty: "LeaseNo",
	        width: "150px",
	        resizable:false,
	        filterProperty: "LeaseNo"
		}));
		oreleaseResultDetailsTable.addColumn(new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "Gate Out Date"}).addStyleClass("wraptextcol"),
	        template: new sap.ui.commons.TextView().bindProperty("text", "GateOutDate"),
	        sortProperty: "GateOutDateActual",
	        width: "140px",
	        resizable:false,
	        filterProperty: "GateOutDate"
		}));
		oreleaseResultDetailsTable.addColumn(new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "Release Expiry Date"}).addStyleClass("wraptextcol"),
	        template: new sap.ui.commons.TextView().bindProperty("text", "ExpDate"),
	        sortProperty: "ExpDateActual",
	        width: "180px",
	        resizable:false,
	        filterProperty: "ExpDate"
		}));
		oreleaseResultDetailsTable.addColumn(new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "Mfd. Date"}).addStyleClass("wraptextcol"),
	        template: new sap.ui.commons.TextView().bindProperty("text", "MfdDate"),
	        sortProperty: "MfdDateActual",
	        width: "100px",
	        resizable:false,
	        filterProperty: "MfdDate"
		}));
		
		var oReleaseSearchForm = new sap.ui.layout.form.Form("ReleaseDetailsF1",{
         layout: oReleaseDetailsLayout,
         formContainers: [
                 new sap.ui.layout.form.FormContainer("ReleaseDetailsF1C1",{
                 	//title: new sap.ui.core.Title({text: "Release Reference Details"}),
                     formElements: [
							new sap.ui.layout.form.FormElement({
							    //fields: [backToRelease,newRelease],
							    fields: [backToRelease],
							    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
							}),
							/*new sap.ui.layout.form.FormElement({
								fields: [ new sap.m.Text({text:"Release Reference Details"}).addStyleClass("font15Bold")],
								layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
							}),*/
                            new sap.ui.layout.form.FormElement({
                                 fields: [oReleaseRefDetailsToolbar],
                                 layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                            }),
                            new sap.ui.layout.form.FormElement({
                                 fields: [oreleaseResultDetailsTable],
                                 layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                            }),
                            new sap.ui.layout.form.FormElement({
                                fields: [oReleaseRefDetailsFooter],
                                layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                           })
                     ]
                 })
         ]
		});
		
		sap.ui.getCore().byId("oReleaseRefDetailScreenFlex").addItem(oReleaseSearchForm);
		//return oReleaseSearchForm;
	},
	
	bindReleaseRefDetails:function(){
		jsonReleaseDet=[];
		
		var oReleaseRefResultDetailsModel = new sap.ui.model.json.JSONModel();
		oReleaseRefResultDetailsModel.setData(selRefData);
		var oreleaseResultDetailTable = sap.ui.getCore().byId("releaseResultDetailsTable");
		oreleaseResultDetailTable.setModel(oReleaseRefResultDetailsModel);
		oreleaseResultDetailTable.bindRows("/");

		if (selRefData.length < 25){
				oreleaseResultDetailTable.setVisibleRowCount(selRefData.length);
				oreleaseResultDetailTable.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
				sap.ui.getCore().byId("relDetViewAll").setVisible(false);
		}else{
				oreleaseResultDetailTable.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
				oreleaseResultDetailTable.setVisibleRowCount(25);
				sap.ui.getCore().byId("relDetViewAll").setVisible(true);
		}
		//alert(selRefData.length);
		for(var i = 0; i<selRefData.length;i++){
			
			// make Custom JSON for Table - Excel/Print
				jsonReleaseDet.push({
          		  'Reference':selRefData[i].RelaseNo,
          		  'Unit Type':selRefData[i].UnitType,
          		  'Unit No.':selRefData[i].UnitNo,
          		  'Customer Name':selRefData[i].CustNam,
          		  'Type Of Movement':selRefData[i].MoveType,
          		  'Release Status':selRefData[i].RelStat,
          		  'Lease Number':selRefData[i].LeaseNo,
          		  'Gate Out Date':selRefData[i].GateOutDate,
          		  'Release Expiry Date':selRefData[i].ExpDate,
          		  'Mfd. Date':selRefData[i].MfdDate
                });
		}
		
	}
	
	
});
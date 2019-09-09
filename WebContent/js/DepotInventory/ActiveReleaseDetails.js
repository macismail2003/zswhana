jQuery.sap.require("sap.ui.model.json.JSONModel");
var ActiveReleaseDatDash = [];
var objUtil;
var jsonActReleaseDet=[];
var linkPress = 0;
sap.ui.model.json.JSONModel.extend("ActiveReleaseDetails", {

	createActiveRelease: function(){
		objUtil = new utility();
		var backToDashBoard = new sap.m.Link("backToDashRel", {text: " < Back",
			width:"8%",
			wrapping:true,
            press: function(){
            	if(linkPress == 0){
            		var bus = sap.ui.getCore().getEventBus();
                    bus.publish("nav", "back");
                    $('#idHdrContnt').html('Depot Dashboard'); //CHANGE HEADER CONTENT
            	}
            	linkPress ++;
        }});
		
		var btnPrint = new sap.m.Button({
            text : "Print",
            type:sap.m.ButtonType.Unstyled,
            icon: sap.ui.core.IconPool.getIconURI("print"),
            press:function(){
                  //alert("Print CLicked");
                  var tab = objUtil.makeHTMLTable(jsonActReleaseDet, "Active Release Details","print");
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
                  objUtil.makeHTMLTable(jsonActReleaseDet, "Active Release Details","export");
            }
         }).addStyleClass("submitBtn");
         
         var oActReleaseDetailsTitle = new sap.m.FlexBox({
			  items: [
			    new sap.m.Text({text:"Active Release Details"}).addStyleClass("font15Bold marginTop10")
			  ],
			  direction: "Row",
			  width:"60%"
		});
         var lblSpaceLegend = new sap.ui.commons.Label( {text: " ",width : '5px'});
         var oActReleaseDetailsButtons = new sap.m.FlexBox({
			  items: [
			    btnExport,lblSpaceLegend,
			    btnPrint
			  ],
			  direction: "RowReverse",
			  width:"40%"
		});
		
         var oActReleaseDetailsToolbar = new sap.m.FlexBox({
			  items: [
			    oActReleaseDetailsTitle,
			    oActReleaseDetailsButtons
			  ],
			  width:"100%",
			  direction: "Row"
		});
         
		/*var oActReleaseDetailsFooter = new sap.m.FlexBox({
			  items: [
			    btnViewAll
			  ],
			  direction: "Row"
		}).addStyleClass("marginTop10");*/
 	    
		var oActReleaseTable = new sap.ui.table.Table("ActReleaseDetailsTbl",{
            visibleRowCount: 5,
            columnHeaderHeight: 30,
            selectionMode: sap.ui.table.SelectionMode.None,
            navigationMode: sap.ui.table.NavigationMode.Paginator,
            fixedColumnCount: 1
	        //width: "80%",
	     }).addStyleClass("tblBorder marginTop10");
		 oActReleaseTable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Release Reference"}),
            template: new sap.ui.commons.TextView().bindProperty("text", "ReleaseRef"),
            sortProperty: "ReleaseRef",
            filterProperty: "ReleaseRef",
            width: "140px",
            resizable:false
	     }));
		 oActReleaseTable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Unit Type"}),
            template: new sap.ui.commons.TextView().bindProperty("text", "UnitType"),
            sortProperty: "UnitType",
            filterProperty: "UnitType",
            width: "80px",
            resizable:false
	     }));
		 oActReleaseTable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Customer"}),
            template: new sap.ui.commons.TextView().bindProperty("text", "Customer"),
            sortProperty: "Customer",
            filterProperty: "Customer",
            width: "200px",
            resizable:false
	     }));
		var oTotalCol = new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Total Quantity"}),
            template: new sap.ui.commons.TextView().bindProperty("text", "TotalQuant"),
            sortProperty: "TotalQuant",
            filterProperty: "TotalQuant",
            width: "110px",
            resizable:false
	      });
		 var oUtil = new utility();
		 oActReleaseTable.addColumn(oTotalCol);
			oUtil.addColumnSorterAndFilter(oTotalCol, oUtil.compareUptoCount);
			
		 var oOutCol = new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Outstanding Quantity"}),
            template: new sap.ui.commons.TextView().bindProperty("text", "OutstandQuant"),
            sortProperty: "OutstandQuant",
            filterProperty: "OutstandQuant",
            width: "170px",
            resizable:false
	      });
		 oActReleaseTable.addColumn(oOutCol);
			oUtil.addColumnSorterAndFilter(oOutCol, oUtil.compareUptoCount);
			
		 oActReleaseTable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Expiry Date"}),
            template: new sap.ui.commons.TextView().bindProperty("text", "ExpDate"),
            sortProperty: "ExpDateActual",
            filterProperty: "ExpDate",
            width: "100px",
            resizable:false
	      }));
		
		 var oActReleaseFlex = new sap.m.FlexBox({
			  items: [
			    oActReleaseDetailsToolbar,
			    oActReleaseTable
			    //oActReleaseDetailsFooter
			  ],
			  //width:"80%",
			  direction: "Column"
		});
		 
		var oActiveReleaseLayout = new sap.ui.layout.form.ResponsiveGridLayout();
		var oActReleaseDetailsForm = new sap.ui.layout.form.Form({
            layout: oActiveReleaseLayout,
            formContainers: [
                new sap.ui.layout.form.FormContainer({
                  formElements: [
						new sap.ui.layout.form.FormElement({
						    fields: [backToDashBoard],
						    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
						}),
		                new sap.ui.layout.form.FormElement({
		                     fields: [oActReleaseFlex],
		                     layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		                }),
				  ]
                })		                        
			 ]
		});
		return oActReleaseDetailsForm;
	},
	
	bindActReleaseDetails:function(){
		linkPress = 0;
		jsonActReleaseDet=[];
		//alert("length"+ActiveRelease.length);
		var oActReleaseDetailsModel = new sap.ui.model.json.JSONModel();
		oActReleaseDetailsModel.setData(ActiveReleaseDatDash);
		var oActReleaseDetailTable = sap.ui.getCore().byId("ActReleaseDetailsTbl");
		oActReleaseDetailTable.setModel(oActReleaseDetailsModel);
		oActReleaseDetailTable.bindRows("/");

		if (ActiveReleaseDatDash.length < 100){
			oActReleaseDetailTable.setVisibleRowCount(ActiveReleaseDatDash.length);
			oActReleaseDetailTable.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
			//sap.ui.getCore().byId("ActRelDetailsViewAll").setVisible(false);
		}else{
			oActReleaseDetailTable.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
			oActReleaseDetailTable.setVisibleRowCount(100);
			//sap.ui.getCore().byId("ActRelDetailsViewAll").setVisible(true);
		}
		//alert(selRefData.length);
		for(var i = 0; i<ActiveReleaseDatDash.length;i++){
			// make Custom JSON for Table - Excel/Print
			jsonActReleaseDet.push({
          		  'Release Reference':ActiveReleaseDatDash[i].ReleaseRef,
          		  'Unit Type':ActiveReleaseDatDash[i].UnitType,
          		  'Customer':ActiveReleaseDatDash[i].Customer,
          		  'Total Quantity':ActiveReleaseDatDash[i].TotalQuant,
          		  'Outstanding Quantity':ActiveReleaseDatDash[i].OutstandQuant,
          		  'Expiry Date':ActiveReleaseDatDash[i].ExpDate,
            });
		}
		
	}
	
});

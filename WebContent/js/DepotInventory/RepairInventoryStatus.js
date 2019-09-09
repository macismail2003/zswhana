jQuery.sap.require("sap.ui.model.json.JSONModel");
var RepairSTATUSData = [];
var objUtil;
var jsonRepairSTATUS=[];
var linkPress = 0;
sap.ui.model.json.JSONModel.extend("RepairInventoryStatus", {

	createDepotInvForRepairSTATUS: function(){
		objUtil = new utility();
		var backToDashBoard = new sap.m.Link({text: " < Back",
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
                  var tab = objUtil.makeHTMLTable(jsonRepairSTATUS, "Depot Inventory Status Details","print");
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
                  objUtil.makeHTMLTable(jsonRepairSTATUS, "Repair Inventory Status Details","export");
            }
         }).addStyleClass("submitBtn");
         
         var btnViewAll = new sap.m.Button("RepairSTATUSViewAll",{
             text : "View All",
             width:"80px",
             visible:false,
             type:sap.m.ButtonType.Unstyled,
             //icon: "images/view_all.png",
             press:function(){
                  //alert("View All");
                  this.setVisible(false);
	        	  if(sap.ui.getCore().byId("RepairSTATUSTbl")){
	        		  var oRepairSTATUSTable = sap.ui.getCore().byId("RepairSTATUSTbl");
	        		  if (RepairSTATUSData.length < 100){
	        			  oRepairSTATUSTable.setVisibleRowCount(RepairSTATUSData.length);
	        			  oRepairSTATUSTable.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
	  	  			  }else{
	  	  					oRepairSTATUSTable.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
	  	  					oRepairSTATUSTable.setVisibleRowCount(100);
	  	  			  }  
	        	  }
             }
          }).addStyleClass("submitBtn");
         
         var oRepairSTATUSTitle = new sap.m.FlexBox({
 		  	items: [
 		  	        new sap.m.Text({text:"Repair Inventory Status Details"}).addStyleClass("font15Bold marginTop10")
 		  	        ],
 		  direction: "Row",
 		  width:"60%"
       });
         var lblSpaceLegend = new sap.ui.commons.Label( {text: " ",width : '5px'});
       var oRepairSTATUSButton = new sap.m.FlexBox({
 			  items: [
 			    btnExport,lblSpaceLegend,
 			    btnPrint
 			  ],
 			  direction: "RowReverse",
 			  width:"40%"
 		});
 		
       var oRepairSTATUSToolbar = new sap.m.FlexBox({
 			  items: [
 			    oRepairSTATUSTitle,
 			   oRepairSTATUSButton
 			  ],
 			  width:"100%",
 			  direction: "Row"
 		});
        /* var oRepairSTATUSToolbar = new sap.m.FlexBox({
			  items: [
			    btnExport,
			    btnPrint
			  ],
			  direction: "RowReverse"
		}).addStyleClass("margin10");*/
		
		var oRepairSTATUSFooter = new sap.m.FlexBox({
			  items: [
			    btnViewAll
			  ],
			  direction: "Row"
		}).addStyleClass("marginTop10");
 	    
		 
		var oRepairSTATUSTable = new sap.ui.table.Table("RepairSTATUSTbl",{
            visibleRowCount: 5,
            columnHeaderHeight: 30,
            selectionMode: sap.ui.table.SelectionMode.None,
            navigationMode: sap.ui.table.NavigationMode.Paginator,
            fixedColumnCount: 1
	        //width: "80%",
	     }).addStyleClass("tblBorder marginTop10");
		oRepairSTATUSTable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Unit Number"}),
            template: new sap.ui.commons.TextView().bindProperty("text", "UnitNo"),
            sortProperty: "UnitNo",
            filterProperty: "UnitNo",
            width: "140px",
            resizable:false
	     }));
		oRepairSTATUSTable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Unit Type"}),
            template: new sap.ui.commons.TextView().bindProperty("text", "UnitType"),
            sortProperty: "UnitType",
            filterProperty: "UnitType",
            width: "80px",
            resizable:false
	     }));
		oRepairSTATUSTable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Manufacturer Date"}),
            template: new sap.ui.commons.TextView().bindProperty("text", "ManufDate"),
            sortProperty: "ManufDateActual",
            filterProperty: "ManufDate",
            width: "160px",
            resizable:false
	      }));
		oRepairSTATUSTable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "User Status"}),
            template: new sap.ui.commons.TextView().bindProperty("text", "UserStatus"),
            sortProperty: "UserStatus",
            filterProperty: "UserStatus",
            width: "160px",
            resizable:false
	      }));
		var oDaysCurrCol = new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Days in Current Status"}),
            template: new sap.ui.commons.TextView().bindProperty("text", "DaysInStatus"),
            sortProperty: "DaysInStatus",
            filterProperty: "DaysInStatus",
            width: "150px",
            resizable:false
	      });
		var oUtil = new utility();
		oRepairSTATUSTable.addColumn(oDaysCurrCol);
		oUtil.addColumnSorterAndFilter(oDaysCurrCol, oUtil.compareUptoCount);
		
		var oDaysCol = new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Days in Depot"}),
            template: new sap.ui.commons.TextView().bindProperty("text", "DaysInDepo"),
            sortProperty: "DaysInDepo",
            filterProperty: "DaysInDepo",
            width: "110px",
            resizable:false
	      });
		oRepairSTATUSTable.addColumn(oDaysCol);
		oUtil.addColumnSorterAndFilter(oDaysCol, oUtil.compareUptoCount);
		
		 var oRepairSTATUSTblFlex = new sap.m.FlexBox({
			  items: [
			    oRepairSTATUSToolbar,
			    oRepairSTATUSTable,
			    oRepairSTATUSFooter
			  ],
			  //width:"80%",
			  direction: "Column"
		});
		 
		 var oDepInvForRepairSTATUSLayout = new sap.ui.layout.form.ResponsiveGridLayout();
		 var oRepairSTATUSDetailsForm = new sap.ui.layout.form.Form({
            layout: oDepInvForRepairSTATUSLayout,
            formContainers: [
                new sap.ui.layout.form.FormContainer({
                  formElements: [
						new sap.ui.layout.form.FormElement({
						    fields: [backToDashBoard],
						    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
						}),
						/*new sap.ui.layout.form.FormElement({
							fields: [ new sap.m.Text({text:"Repair Inventory Status Details"}).addStyleClass("fontTitle")],
							layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
						}),*/
		                new sap.ui.layout.form.FormElement({
		                     fields: [oRepairSTATUSTblFlex],
		                     layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		                }),
		               /* new sap.ui.layout.form.FormElement({
		                     fields: [oRepairSTATUSTable],
		                     layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		                })*/
		               /* new sap.ui.layout.form.FormElement({
		                    fields: [oReleaseRefDetailsFooter],
		                    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		               })*/
				  ]
                })		                        
			 ]
		});
		return oRepairSTATUSDetailsForm;
	},
	bindRepairSTATUSDetails:function(){
		linkPress = 0;
		jsonRepairSTATUS=[];
		//alert("length"+ActiveRelease.length);
		var oRepairSTATUSDetailsModel = new sap.ui.model.json.JSONModel();
		oRepairSTATUSDetailsModel.setData(RepairSTATUSData);
		var oRepairSTATUSDetailTable = sap.ui.getCore().byId("RepairSTATUSTbl");
		oRepairSTATUSDetailTable.setModel(oRepairSTATUSDetailsModel);
		oRepairSTATUSDetailTable.bindRows("/");

		if (RepairSTATUSData.length < 25){
			oRepairSTATUSDetailTable.setVisibleRowCount(RepairSTATUSData.length);
			oRepairSTATUSDetailTable.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
			sap.ui.getCore().byId("RepairSTATUSViewAll").setVisible(false);
		}else{
			oRepairSTATUSDetailTable.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
			oRepairSTATUSDetailTable.setVisibleRowCount(25);
			sap.ui.getCore().byId("RepairSTATUSViewAll").setVisible(true);
		}
		busyDialog.close();
		
		//alert(selRefData.length);
		for(var i = 0; i<RepairSTATUSData.length;i++){
            // make Custom JSON for Table - Excel/Print
			jsonRepairSTATUS.push({
          		  'Unit Number':RepairSTATUSData[i].UnitNo,
          		  'Unit Type':RepairSTATUSData[i].UnitType,
          		  'Manufacturer Date':RepairSTATUSData[i].ManufDate,
          		  'User Status':RepairSTATUSData[i].UserStatus,
          		  'Days in Current Status':RepairSTATUSData[i].DaysInStatus,
          		  'Days in Depot':RepairSTATUSData[i].DaysInDepo,
            });
		}
		//alert("Length of JSON "+jsonRepairSTATUS.length );
		
	}
});

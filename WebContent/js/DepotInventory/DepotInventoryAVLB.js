jQuery.sap.require("sap.ui.model.json.JSONModel");
var AVLBData = [];
var objUtil;
var jsonAVLB=[];
var linkPress = 0;
sap.ui.model.json.JSONModel.extend("DepotInventoryAVLB", {

	createDepotInvForAvlb: function(){
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
                  var tab = objUtil.makeHTMLTable(jsonAVLB, "Depot Inventory for Status AVLB","print");
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
                  objUtil.makeHTMLTable(jsonAVLB, "Depot Inventory for Status AVLB","export");
            }
         }).addStyleClass("submitBtn");
         
         var btnViewAll = new sap.m.Button("AVLBViewAll",{
             text : "View All",
             width:"80px",
             visible:false,
             type:sap.m.ButtonType.Unstyled,
             //icon: "images/view_all.png",
             press:function(){
                  //alert("View All");
                  this.setVisible(false);
	        	  if(sap.ui.getCore().byId("AVLBTbl")){
	        		  var oAVLBTable = sap.ui.getCore().byId("AVLBTbl");
	        		  if (AVLBData.length < 100){
	        			  oAVLBTable.setVisibleRowCount(AVLBData.length);
	        			  oAVLBTable.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
	  	  			  }else{
	  	  					oAVLBTable.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
	  	  					oAVLBTable.setVisibleRowCount(100);
	  	  			  }  
	        	  }
             }
          }).addStyleClass("submitBtn");
         
		var oAVLBTable = new sap.ui.table.Table("AVLBTbl",{
            visibleRowCount: 5,
            columnHeaderHeight: 30,
            selectionMode: sap.ui.table.SelectionMode.None,
            navigationMode: sap.ui.table.NavigationMode.Paginator,
            fixedColumnCount: 1
	        //width: "80%",
	     }).addStyleClass("tblBorder marginTop10");
		oAVLBTable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Unit Number"}),
            template: new sap.ui.commons.TextView().bindProperty("text", "UnitNo"),
            sortProperty: "UnitNo",
            filterProperty: "UnitNo",
            width: "140px",
            resizable:false
	     }));
		oAVLBTable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Unit Type"}),
            template: new sap.ui.commons.TextView().bindProperty("text", "UnitType"),
            sortProperty: "UnitType",
            filterProperty: "UnitType",
            width: "80px",
            resizable:false
	     }));
		oAVLBTable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Manufacturer Date"}),
            template: new sap.ui.commons.TextView().bindProperty("text", "ManufDate"),
            sortProperty: "ManufDateActual",
            filterProperty: "ManufDate",
            width: "160px",
            resizable:false
	      }));
		oAVLBTable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "User Status"}),
            template: new sap.ui.commons.TextView().bindProperty("text", "UserStatus"),
            sortProperty: "UserStatus",
            filterProperty: "UserStatus",
            width: "140px",
            resizable:false
	     }));
		var oDaysAvlbCol = new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Days in AVLB"}),
            template: new sap.ui.commons.TextView().bindProperty("text", "DaysInStatus"),
            sortProperty: "DaysInStatus",
            filterProperty: "DaysInStatus",
            width: "110px",
            resizable:false
	      });
		var oUtil = new utility();
		oAVLBTable.addColumn(oDaysAvlbCol);
		oUtil.addColumnSorterAndFilter(oDaysAvlbCol, oUtil.compareUptoCount);
		
		var oDaysDepotCol = new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Days in Depot"}),
            template: new sap.ui.commons.TextView().bindProperty("text", "DaysInDepo"),
            sortProperty: "DaysInDepo",
            filterProperty: "DaysInDepo",
            //width: "110px",
            resizable:false
	      });
		oAVLBTable.addColumn(oDaysDepotCol);
		oUtil.addColumnSorterAndFilter(oDaysDepotCol, oUtil.compareUptoCount);
		
		 var oAVLBTitle = new sap.m.FlexBox({
			  items: [
			    new sap.m.Text({text:"Depot Inventory for Status AVLB"}).addStyleClass("font15Bold marginTop10")
			  ],
			  direction: "Row",
			  width:"60%"
		 });
		 var lblSpaceLegend = new sap.ui.commons.Label( {text: " ",width : '5px'});
		 
        var oAVLBButton = new sap.m.FlexBox({
			  items: [
			    btnExport,lblSpaceLegend,
			    btnPrint
			  ],
			  direction: "RowReverse",
			  width:"40%"
		});
		
        var oAVLBToolbar = new sap.m.FlexBox({
			  items: [
			    oAVLBTitle,
			    oAVLBButton
			  ],
			  width:"100%",
			  direction: "Row"
		});
        
        var oAVLBFooter = new sap.m.FlexBox({
			  items: [
			    btnViewAll
			  ],
			  direction: "Row"
		}).addStyleClass("marginTop10");
        
		 var oAVLBTblFlex = new sap.m.FlexBox({
			  items: [
			    oAVLBToolbar,
			    oAVLBTable,
			    oAVLBFooter
			  ],
			  //width:"80%",
			  direction: "Column"
		});
		 
		 var oDepInvForAvlbLayout = new sap.ui.layout.form.ResponsiveGridLayout();
		 var oAVLBDetailsForm = new sap.ui.layout.form.Form({
            layout: oDepInvForAvlbLayout,
            formContainers: [
                new sap.ui.layout.form.FormContainer({
                  formElements: [
						new sap.ui.layout.form.FormElement({
						    fields: [backToDashBoard],
						    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
						}),
		                new sap.ui.layout.form.FormElement({
		                     fields: [oAVLBTblFlex],
		                     layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		                }),
				  ]
                })		                        
			 ]
		});
		return oAVLBDetailsForm;
	},
	bindAVLBDetails:function(){
		linkPress = 0;
		//jsonAVLB=[];
		//alert("length"+ActiveRelease.length);
		var oAVLBDetailsModel = new sap.ui.model.json.JSONModel();
		oAVLBDetailsModel.setData(AVLBData);
		var oAVLBDetailTable = sap.ui.getCore().byId("AVLBTbl");
		oAVLBDetailTable.setModel(oAVLBDetailsModel);
		oAVLBDetailTable.bindRows("/");

		if (AVLBData.length < 25){
			oAVLBDetailTable.setVisibleRowCount(AVLBData.length);
			oAVLBDetailTable.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
			sap.ui.getCore().byId("AVLBViewAll").setVisible(false);
		}else{
			oAVLBDetailTable.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
			oAVLBDetailTable.setVisibleRowCount(25);
			sap.ui.getCore().byId("AVLBViewAll").setVisible(true);
		}
		busyDialog.close();
		//alert(selRefData.length);
		//alert("Length of JSON "+jsonAVLB.length );
		
	}
});

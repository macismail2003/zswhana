jQuery.sap.require("sap.ui.model.json.JSONModel");
var DepotSTATUSData = [];
var objUtil;
var jsonDepotSTATUS=[];
var linkPress = 0;
var cmp;
sap.ui.model.json.JSONModel.extend("DepotInventoryStatus", {

	createDepotInvForDepotSTATUS: function(){
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
                  var tab = objUtil.makeHTMLTable(jsonDepotSTATUS, "Depot Inventory Status Details","print");
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
                  objUtil.makeHTMLTable(jsonDepotSTATUS, "Depot Inventory Status Details","export");
            }
         }).addStyleClass("submitBtn");
         
         var btnViewAll = new sap.m.Button("DepotSTATUSViewAll",{
             text : "View All",
             width:"80px",
             visible:false,
             type:sap.m.ButtonType.Unstyled,
             //icon: "images/view_all.png",
             press:function(){
                  //alert("View All");
                  this.setVisible(false);
	        	  if(sap.ui.getCore().byId("DepotSTATUSTbl")){
	        		  var oDepotSTATUSTable = sap.ui.getCore().byId("DepotSTATUSTbl");
	        		  if (DepotSTATUSData.length < 100){
	        			  oDepotSTATUSTable.setVisibleRowCount(DepotSTATUSData.length);
	        			  oDepotSTATUSTable.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
	  	  			  }else{
	  	  					oDepotSTATUSTable.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
	  	  					oDepotSTATUSTable.setVisibleRowCount(100);
	  	  			  }  
	        	  }
             }
          }).addStyleClass("submitBtn");
         
    var oDepotSTATUSTitle = new sap.m.FlexBox({
		  items: [
		    new sap.m.Text({text:"Depot Inventory Status Details"}).addStyleClass("font15Bold marginTop10")
		  ],
		  direction: "Row",
		  width:"60%"
	});
    var lblSpaceLegend = new sap.ui.commons.Label( {text: " ",width : '5px'});
      var oDepotSTATUSButton = new sap.m.FlexBox({
			  items: [
			    btnExport,lblSpaceLegend,
			    btnPrint
			  ],
			  direction: "RowReverse",
			  width:"40%"
		});
		
      var oDepotSTATUSToolbar = new sap.m.FlexBox({
			  items: [
			    oDepotSTATUSTitle,
			    oDepotSTATUSButton
			  ],
			  width:"100%",
			  direction: "Row"
		});
         /*var oDepotSTATUSToolbar = new sap.m.FlexBox({
			  items: [
			    btnExport,
			    btnPrint
			  ],
			  direction: "RowReverse"
		}).addStyleClass("margin10");*/
		
		var oDepotSTATUSFooter = new sap.m.FlexBox({
			  items: [
			    btnViewAll
			  ],
			  direction: "Row"
		}).addStyleClass("marginTop10");
 	    
		 
		var oDepotSTATUSTable = new sap.ui.table.Table("DepotSTATUSTbl",{
            visibleRowCount: 5,
            columnHeaderHeight: 30,
            selectionMode: sap.ui.table.SelectionMode.None,
            navigationMode: sap.ui.table.NavigationMode.Paginator,
            fixedColumnCount: 1
	        //width: "80%",
	     }).addStyleClass("tblBorder marginTop10");
		oDepotSTATUSTable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Unit Number"}),
            template: new sap.ui.commons.TextView().bindProperty("text", "UnitNo"),
            sortProperty: "UnitNo",
            filterProperty: "UnitNo",
            width: "140px",
            resizable:false
	     }));
		oDepotSTATUSTable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Unit Type"}),
            template: new sap.ui.commons.TextView().bindProperty("text", "UnitType"),
            sortProperty: "UnitType",
            filterProperty: "UnitType",
            width: "80px",
            resizable:false
	     }));
		oDepotSTATUSTable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Manufacturer Date"}),
            template: new sap.ui.commons.TextView().bindProperty("text", "ManufDate"),
            sortProperty: "ManufDateActual",
            filterProperty: "ManufDate",
            width: "160px",
            resizable:false
	      }));
		oDepotSTATUSTable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "User Status"}),
            template: new sap.ui.commons.TextView().bindProperty("text", "UserStatus"),
            sortProperty: "UserStatus",
            filterProperty: "UserStatus",
            width: "160px",
            resizable:false
	      }));
		var oDaysInStatusCol = new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Days in Status"}),
            template: new sap.ui.commons.TextView().bindProperty("text", "DaysInStatus"),
            sortProperty: "DaysInStatus",
            filterProperty: "DaysInStatus",
            width: "110px",
            resizable:false
	      });
		var oUtil = new utility();
		oDepotSTATUSTable.addColumn(oDaysInStatusCol);
		oUtil.addColumnSorterAndFilter(oDaysInStatusCol, oUtil.compareUptoCount);
		
		var oDaysInDepotCol = new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Days in Depot"}),
            template: new sap.ui.commons.TextView().bindProperty("text", "DaysInDepo"),
            sortProperty: "DaysInDepo",
            filterProperty: "DaysInDepo",
            width: "110px",
            resizable:false
	      });
		oDepotSTATUSTable.addColumn(oDaysInDepotCol);
		oUtil.addColumnSorterAndFilter(oDaysInDepotCol, oUtil.compareUptoCount);
		
		 var oDepotSTATUSTblFlex = new sap.m.FlexBox({
			  items: [
			    oDepotSTATUSToolbar,
			    oDepotSTATUSTable,
			    oDepotSTATUSFooter
			  ],
			  //width:"80%",
			  direction: "Column"
		});
		 
		 var oDepInvForDepotSTATUSLayout = new sap.ui.layout.form.ResponsiveGridLayout();
		 var oDepotSTATUSDetailsForm = new sap.ui.layout.form.Form({
            layout: oDepInvForDepotSTATUSLayout,
            formContainers: [
                new sap.ui.layout.form.FormContainer({
                  formElements: [
						new sap.ui.layout.form.FormElement({
						    fields: [backToDashBoard],
						    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
						}),
		                new sap.ui.layout.form.FormElement({
		                     fields: [oDepotSTATUSTblFlex],
		                     layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		                })
				  ]
                })		                        
			 ]
		});
		return oDepotSTATUSDetailsForm;
	},
	bindDepotSTATUSDetails:function(){
		linkPress = 0;
		jsonDepotSTATUS=[];
		//alert("length"+ActiveRelease.length);
		var oDepotSTATUSDetailsModel = new sap.ui.model.json.JSONModel();
		oDepotSTATUSDetailsModel.setData(DepotSTATUSData);
		var oDepotSTATUSDetailTable = sap.ui.getCore().byId("DepotSTATUSTbl");
		oDepotSTATUSDetailTable.setModel(oDepotSTATUSDetailsModel);
		cmp = function(x, y){
		    return x > y ? 1 : x < y ? -1 : 0; 
		};
		
		DepotSTATUSData.sort(function(a, b){
		    //note the minus before -cmp, for descending order
		    return cmp( 
		        [cmp(a.UnitType, b.UnitType), -cmp(a.DaysInStatus, b.DaysInStatus)], 
		        [cmp(b.UnitType, a.UnitType), -cmp(b.DaysInStatus, a.DaysInStatus)]
		    );
		});
		
		
		oDepotSTATUSDetailTable.bindRows({ path:"/"});
		
		if (DepotSTATUSData.length < 25){
			oDepotSTATUSDetailTable.setVisibleRowCount(DepotSTATUSData.length);
			oDepotSTATUSDetailTable.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
			sap.ui.getCore().byId("DepotSTATUSViewAll").setVisible(false);
		}else{
			oDepotSTATUSDetailTable.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
			oDepotSTATUSDetailTable.setVisibleRowCount(25);
			sap.ui.getCore().byId("DepotSTATUSViewAll").setVisible(true);
		}
		busyDialog.close();
		
		//alert(selRefData.length);
		for(var i = 0; i<DepotSTATUSData.length;i++){
            
            // make Custom JSON for Table - Excel/Print
			jsonDepotSTATUS.push({
          		  'Unit Number':DepotSTATUSData[i].UnitNo,
          		  'Unit Type':DepotSTATUSData[i].UnitType,
          		  'Manufacturer Date':DepotSTATUSData[i].ManufDate,
          		  'User Status':DepotSTATUSData[i].UserStatus,
          		  'Days in Status':DepotSTATUSData[i].DaysInStatus,
          		  'Days in Depot':DepotSTATUSData[i].DaysInDepo,
            });
		}
		
	}
});

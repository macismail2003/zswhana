jQuery.sap.require("sap.ui.model.json.JSONModel");
var WESTData = [];
var objUtil;
var jsonWEST=[];
var linkPress = 0;
sap.ui.model.json.JSONModel.extend("RepairInventoryWEST", {

	createDepotInvForWEST: function(){
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
                  var tab = objUtil.makeHTMLTable(jsonWEST, "Repair Inventory for Status WEST","print");
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
                  objUtil.makeHTMLTable(jsonWEST, "Repair Inventory for Status WEST","export");
            }
         }).addStyleClass("submitBtn");
         
         var btnViewAll = new sap.m.Button("WESTViewAll",{
             text : "View All",
             width:"80px",
             visible:false,
             type:sap.m.ButtonType.Unstyled,
             //icon: "images/view_all.png",
             press:function(){
                  //alert("View All");
                  this.setVisible(false);
	        	  if(sap.ui.getCore().byId("WESTTbl")){
	        		  var oWESTTable = sap.ui.getCore().byId("WESTTbl");
	        		  if (WESTData.length < 100){
	        			  oWESTTable.setVisibleRowCount(WESTData.length);
	        			  oWESTTable.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
	  	  			  }else{
	  	  					oWESTTable.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
	  	  					oWESTTable.setVisibleRowCount(100);
	  	  			  }  
	        	  }
             }
          }).addStyleClass("submitBtn");
         
         var oWESTTitle = new sap.m.FlexBox({
    		  	items: [
    		  	        new sap.m.Text({text:"Repair Inventory for Status WEST"}).addStyleClass("font15Bold marginTop10")
    		  	        ],
    		  direction: "Row",
    		  width:"60%"
          });
         var lblSpaceLegend = new sap.ui.commons.Label( {text: " ",width : '5px'});
          var oWESTButton = new sap.m.FlexBox({
    			  items: [
    			    btnExport,lblSpaceLegend,
    			    btnPrint
    			  ],
    			  direction: "RowReverse",
    			  width:"40%"
    		});
    		
          var oWESTToolbar = new sap.m.FlexBox({
    			  items: [
    			    oWESTTitle,
    			    oWESTButton
    			  ],
    			  width:"100%",
    			  direction: "Row"
    		});
          
         /*var oWESTToolbar = new sap.m.FlexBox({
			  items: [
			    btnExport,
			    btnPrint
			  ],
			  direction: "RowReverse"
		}).addStyleClass("margin10");*/
		
		var oWESTFooter = new sap.m.FlexBox({
			  items: [
			    btnViewAll
			  ],
			  direction: "Row"
		}).addStyleClass("marginTop10");
 	    
		 
		var oWESTTable = new sap.ui.table.Table("WESTTbl",{
            visibleRowCount: 5,
            columnHeaderHeight: 30,
            selectionMode: sap.ui.table.SelectionMode.None,
            navigationMode: sap.ui.table.NavigationMode.Paginator,
            fixedColumnCount: 1
	        //width: "80%",
	     }).addStyleClass("tblBorder marginTop10");
		oWESTTable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Unit Number"}),
            template: new sap.ui.commons.TextView().bindProperty("text", "UnitNo"),
            sortProperty: "UnitNo",
            filterProperty: "UnitNo",
            width: "140px",
            resizable:false
	     }));
		oWESTTable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Unit Type"}),
            template: new sap.ui.commons.TextView().bindProperty("text", "UnitType"),
            sortProperty: "UnitType",
            filterProperty: "UnitType",
            width: "80px",
            resizable:false
	     }));
		oWESTTable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Manufacturer Date"}),
            template: new sap.ui.commons.TextView().bindProperty("text", "ManufDate"),
            sortProperty: "ManufDateActual",
            filterProperty: "ManufDate",
            width: "160px",
            resizable:false
	      }));
		oWESTTable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "User Status"}),
            template: new sap.ui.commons.TextView().bindProperty("text", "UserStatus"),
            sortProperty: "UserStatus",
            filterProperty: "UserStatus",
            width: "140px",
            resizable:false
	     }));
		var oCurrCol= new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Days in Current Status"}),
            template: new sap.ui.commons.TextView().bindProperty("text", "DaysInStatus"),
            sortProperty: "DaysInStatus",
            filterProperty: "DaysInStatus",
            width: "140px",
            resizable:false
	      });
		var oUtil = new utility();
		oWESTTable.addColumn(oCurrCol);
		oUtil.addColumnSorterAndFilter(oCurrCol, oUtil.compareUptoCount);
		
		var oDaysCol = new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Days in Depot"}),
            template: new sap.ui.commons.TextView().bindProperty("text", "DaysInDepo"),
            sortProperty: "DaysInDepo",
            filterProperty: "DaysInDepo",
            width: "110px",
            resizable:false
	      });
		oWESTTable.addColumn(oDaysCol);
		oUtil.addColumnSorterAndFilter(oDaysCol, oUtil.compareUptoCount);
		
		 var oWESTTblFlex = new sap.m.FlexBox({
			  items: [
			    oWESTToolbar,
			    oWESTTable,
			    oWESTFooter
			  ],
			  //width:"80%",
			  direction: "Column"
		});
		 
		 var oDepInvForWESTLayout = new sap.ui.layout.form.ResponsiveGridLayout();
		 var oWESTDetailsForm = new sap.ui.layout.form.Form({
            layout: oDepInvForWESTLayout,
            formContainers: [
                new sap.ui.layout.form.FormContainer({
                  formElements: [
						new sap.ui.layout.form.FormElement({
						    fields: [backToDashBoard],
						    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
						}),
						/*new sap.ui.layout.form.FormElement({
							fields: [ new sap.m.Text({text:"Depot Inventory for Status WEST"}).addStyleClass("fontTitle")],
							layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
						}),*/
		                new sap.ui.layout.form.FormElement({
		                     fields: [oWESTTblFlex],
		                     layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		                }),
		               /* new sap.ui.layout.form.FormElement({
		                     fields: [oWESTTable],
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
		return oWESTDetailsForm;
	},
	bindWESTDetails:function(){
		linkPress = 0;
		//jsonWEST=[];
		//alert("length"+ActiveRelease.length);
		var oWESTDetailsModel = new sap.ui.model.json.JSONModel();
		oWESTDetailsModel.setData(WESTData);
		var oWESTDetailTable = sap.ui.getCore().byId("WESTTbl");
		oWESTDetailTable.setModel(oWESTDetailsModel);
		oWESTDetailTable.bindRows("/");

		if (WESTData.length < 25){
			oWESTDetailTable.setVisibleRowCount(WESTData.length);
			oWESTDetailTable.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
			sap.ui.getCore().byId("WESTViewAll").setVisible(false);
		}else{
			oWESTDetailTable.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
			oWESTDetailTable.setVisibleRowCount(25);
			sap.ui.getCore().byId("WESTViewAll").setVisible(true);
		}
		busyDialog.close();
		//alert(selRefData.length);
		/*for(var i = 0; i<WESTData.length;i++){
			
			// Manufacturer Date
			var vDocDateResult = WESTData[i].ManufDate.split("(");
            var vDocDate = vDocDateResult[1].split(")");
            var vformattedDocDate = dateFormat(new Date(Number(vDocDate[0])), 'mmm-yyyy');
            //this is to check if the date is default 999 something show blank
            if (vformattedDocDate.substring(6) == "9999"){
            	WESTData[i].ManufDate =  "-";
            }
            else{
            	WESTData[i].ManufDate = vformattedDocDate;
            }
            
            // make Custom JSON for Table - Excel/Print
			jsonWEST.push({
          		  'Unit Number':WESTData[i].UnitNo,
          		  'Unit Type':WESTData[i].UnitType,
          		  'Manufacturer Date':WESTData[i].ManufDate,
          		  'User Status':WESTData[i].UserStatus,
          		  'Days in Current Status':WESTData[i].DaysInStatus,
          		  'Days in Depot':WESTData[i].DaysInDepo,
            });
		}*/
		//alert("Length of JSON "+jsonWEST.length );
		
	}
});

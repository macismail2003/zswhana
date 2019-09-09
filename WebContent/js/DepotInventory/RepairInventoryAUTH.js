jQuery.sap.require("sap.ui.model.json.JSONModel");
var AUTHData = [];
var objUtil;
var jsonAUTH=[];
var linkPress = 0;
sap.ui.model.json.JSONModel.extend("RepairInventoryAUTH", {
	
	createDepotInvForAUTH: function(){
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
                  var tab = objUtil.makeHTMLTable(jsonAUTH, "Repair Inventory for Status AUTH","print");
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
                  objUtil.makeHTMLTable(jsonAUTH, "Repair Inventory for Status AUTH","export");
            }
         }).addStyleClass("submitBtn");
         
         var btnViewAll = new sap.m.Button("AUTHViewAll",{
             text : "View All",
             width:"80px",
             visible:false,
             type:sap.m.ButtonType.Unstyled,
             //icon: "images/view_all.png",
             press:function(){
                  //alert("View All");
                  this.setVisible(false);
	        	  if(sap.ui.getCore().byId("AUTHTbl")){
	        		  var oAUTHTable = sap.ui.getCore().byId("AUTHTbl");
	        		  if (AUTHData.length < 100){
	        			  oAUTHTable.setVisibleRowCount(AUTHData.length);
	        			  oAUTHTable.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
	  	  			  }else{
	  	  					oAUTHTable.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
	  	  					oAUTHTable.setVisibleRowCount(100);
	  	  			  }  
	        	  }
             }
          }).addStyleClass("submitBtn");
         
         var oAUTHTitle = new sap.m.FlexBox({
   		  	items: [
   		  	        new sap.m.Text({text:"Repair Inventory for Status AUTH"}).addStyleClass("font15Bold marginTop10")
   		  	        ],
   		  direction: "Row",
   		  width:"60%"
         });
         var lblSpaceLegend = new sap.ui.commons.Label( {text: " ",width : '5px'});
         var oAUTHButton = new sap.m.FlexBox({
   			  items: [
   			    btnExport,lblSpaceLegend,
   			    btnPrint
   			  ],
   			  direction: "RowReverse",
   			  width:"40%"
   		});
   		
         var oAUTHToolbar = new sap.m.FlexBox({
   			  items: [
   			    oAUTHTitle,
   			    oAUTHButton
   			  ],
   			  width:"100%",
   			  direction: "Row"
   		});
         
         /*var oAUTHToolbar = new sap.m.FlexBox({
			  items: [
			    btnExport,
			    btnPrint
			  ],
			  direction: "RowReverse"
		}).addStyleClass("margin10");*/
		
		var oAUTHFooter = new sap.m.FlexBox({
			  items: [
			    btnViewAll
			  ],
			  direction: "Row"
		}).addStyleClass("marginTop10");
 	    
		 
		var oAUTHTable = new sap.ui.table.Table("AUTHTbl",{
            visibleRowCount: 5,
            columnHeaderHeight: 30,
            selectionMode: sap.ui.table.SelectionMode.None,
            navigationMode: sap.ui.table.NavigationMode.Paginator,
            fixedColumnCount: 1
	        //width: "80%",
	     }).addStyleClass("tblBorder marginTop10");
		oAUTHTable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Unit Number"}),
            template: new sap.ui.commons.TextView().bindProperty("text", "UnitNo"),
            sortProperty: "UnitNo",
            filterProperty: "UnitNo",
            width: "140px",
            resizable:false
	     }));
		oAUTHTable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Unit Type"}),
            template: new sap.ui.commons.TextView().bindProperty("text", "UnitType"),
            sortProperty: "UnitType",
            filterProperty: "UnitType",
            width: "80px",
            resizable:false
	     }));
		oAUTHTable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Manufacturer Date"}),
            template: new sap.ui.commons.TextView().bindProperty("text", "ManufDate"),
            sortProperty: "ManufDateActual",
            filterProperty: "ManufDate",
            width: "160px",
            resizable:false
	      }));
		oAUTHTable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "User Status"}),
            template: new sap.ui.commons.TextView().bindProperty("text", "UserStatus"),
            sortProperty: "UserStatus",
            filterProperty: "UserStatus",
            width: "140px",
            resizable:false
	     }));
		var oCurrCol = new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Days in Current Status"}),
            template: new sap.ui.commons.TextView().bindProperty("text", "DaysInStatus"),
            sortProperty: "DaysInStatus",
            filterProperty: "DaysInStatus",
            width: "140px",
            resizable:false
	      });
		var oUtil = new utility();
		oAUTHTable.addColumn(oCurrCol);
		oUtil.addColumnSorterAndFilter(oCurrCol, oUtil.compareUptoCount);
		
		var oDaysCol = new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Days in Depot"}),
            template: new sap.ui.commons.TextView().bindProperty("text", "DaysInDepo"),
            sortProperty: "DaysInDepo",
            filterProperty: "DaysInDepo",
            width: "110px",
            resizable:false
	      });
		oAUTHTable.addColumn(oDaysCol);
		oUtil.addColumnSorterAndFilter(oDaysCol, oUtil.compareUptoCount);
		
		 var oAUTHTblFlex = new sap.m.FlexBox({
			  items: [
			    oAUTHToolbar,
			    oAUTHTable,
			    oAUTHFooter
			  ],
			  //width:"80%",
			  direction: "Column"
		});
		 
		 var oDepInvForAUTHLayout = new sap.ui.layout.form.ResponsiveGridLayout();
		 var oAUTHDetailsForm = new sap.ui.layout.form.Form({
            layout: oDepInvForAUTHLayout,
            formContainers: [
                new sap.ui.layout.form.FormContainer({
                  formElements: [
						new sap.ui.layout.form.FormElement({
						    fields: [backToDashBoard],
						    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
						}),
						/*new sap.ui.layout.form.FormElement({
							fields: [ new sap.m.Text({text:"Depot Inventory for Status AUTH"}).addStyleClass("fontTitle")],
							layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
						}),*/
		                new sap.ui.layout.form.FormElement({
		                     fields: [oAUTHTblFlex],
		                     layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		                }),
		               /* new sap.ui.layout.form.FormElement({
		                     fields: [oAUTHTable],
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
		return oAUTHDetailsForm;
	},
	bindAUTHDetails:function(){
		linkPress = 0;
		//jsonAUTH=[];
		//alert("length"+ActiveRelease.length);
		var oAUTHDetailsModel = new sap.ui.model.json.JSONModel();
		oAUTHDetailsModel.setData(AUTHData);
		var oAUTHDetailTable = sap.ui.getCore().byId("AUTHTbl");
		oAUTHDetailTable.setModel(oAUTHDetailsModel);
		oAUTHDetailTable.bindRows("/");

		if (AUTHData.length < 25){
			oAUTHDetailTable.setVisibleRowCount(AUTHData.length);
			oAUTHDetailTable.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
			sap.ui.getCore().byId("AUTHViewAll").setVisible(false);
		}else{
			oAUTHDetailTable.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
			oAUTHDetailTable.setVisibleRowCount(25);
			sap.ui.getCore().byId("AUTHViewAll").setVisible(true);
		}
		busyDialog.close();
		//alert(selRefData.length);
		/*for(var i = 0; i<AUTHData.length;i++){
			
			// Manufacturer Date
			var vDocDateResult = AUTHData[i].ManufDate.split("(");
            var vDocDate = vDocDateResult[1].split(")");
            var vformattedDocDate = dateFormat(new Date(Number(vDocDate[0])), 'mmm-yyyy');
            //this is to check if the date is default 999 something show blank
            if (vformattedDocDate.substring(6) == "9999"){
            	AUTHData[i].ManufDate =  "-";
            }
            else{
            	AUTHData[i].ManufDate = vformattedDocDate;
            }
            
            // make Custom JSON for Table - Excel/Print
			jsonAUTH.push({
          		  'Unit Number':AUTHData[i].UnitNo,
          		  'Unit Type':AUTHData[i].UnitType,
          		  'Manufacturer Date':AUTHData[i].ManufDate,
          		  'User Status':AUTHData[i].UserStatus,
          		  'Days in Current Status':AUTHData[i].DaysInStatus,
          		  'Days in Depot':AUTHData[i].DaysInDepo,
            });
		}*/
		//alert("Length of JSON "+jsonAUTH.length );
		
	}
	
});

jQuery.sap.require("sap.ui.model.json.JSONModel");
var SALEData = [];
var objUtil;
var jsonSALE=[];
var linkPress = 0;
sap.ui.model.json.JSONModel.extend("DepotInventorySALE", {

	createDepotInvForSALE: function(){
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
                  var tab = objUtil.makeHTMLTable(jsonSALE, "Depot Inventory for Status SALE","print");
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
                  objUtil.makeHTMLTable(jsonSALE, "Depot Inventory for Status SALE","export");
            }
         }).addStyleClass("submitBtn");
         
         var btnViewAll = new sap.m.Button("SALEViewAll",{
             text : "View All",
             width:"80px",
             visible:false,
             type:sap.m.ButtonType.Unstyled,
             //icon: "images/view_all.png",
             press:function(){
                  //alert("View All");
                  this.setVisible(false);
	        	  if(sap.ui.getCore().byId("SALETbl")){
	        		  var oSALETable = sap.ui.getCore().byId("SALETbl");
	        		  if (SALEData.length < 100){
	        			  oSALETable.setVisibleRowCount(SALEData.length);
	        			  oSALETable.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
	  	  			  }else{
	  	  					oSALETable.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
	  	  					oSALETable.setVisibleRowCount(100);
	  	  			  }  
	        	  }
             }
          }).addStyleClass("submitBtn");
        
        var oSALETitle = new sap.m.FlexBox({
			  items: [
			    new sap.m.Text({text:"Depot Inventory for Status SALE"}).addStyleClass("font15Bold marginTop10")
			  ],
			  direction: "Row",
			  width:"60%"
		});
        var lblSpaceLegend = new sap.ui.commons.Label( {text: " ",width : '5px'});
        var oSALEButton = new sap.m.FlexBox({
			  items: [
			    btnExport,lblSpaceLegend,
			    btnPrint
			  ],
			  direction: "RowReverse",
			  width:"40%"
		});
		
      var oSALEToolbar = new sap.m.FlexBox({
			  items: [
			    oSALETitle,
			    oSALEButton
			  ],
			  width:"100%",
			  direction: "Row"
		});
      
		var oSALEFooter = new sap.m.FlexBox({
			  items: [
			    btnViewAll
			  ],
			  direction: "Row"
		}).addStyleClass("marginTop10");
 	    
		 
		var oSALETable = new sap.ui.table.Table("SALETbl",{
            visibleRowCount: 5,
            columnHeaderHeight: 30,
            selectionMode: sap.ui.table.SelectionMode.None,
            navigationMode: sap.ui.table.NavigationMode.Paginator,
            fixedColumnCount: 1
	        //width: "80%",
	     }).addStyleClass("tblBorder marginTop10");
		oSALETable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Unit Number"}),
            template: new sap.ui.commons.TextView().bindProperty("text", "UnitNo"),
            sortProperty: "UnitNo",
            filterProperty: "UnitNo",
            width: "140px",
            resizable:false
	     }));
		oSALETable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Unit Type"}),
            template: new sap.ui.commons.TextView().bindProperty("text", "UnitType"),
            sortProperty: "UnitType",
            filterProperty: "UnitType",
            width: "80px",
            resizable:false
	     }));
		oSALETable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Manufacturer Date"}),
            template: new sap.ui.commons.TextView().bindProperty("text", "ManufDate"),
            sortProperty: "ManufDateActual",
            filterProperty: "ManufDate",
            width: "160px",
            resizable:false
	      }));
		oSALETable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "User Status"}),
            template: new sap.ui.commons.TextView().bindProperty("text", "UserStatus"),
            sortProperty: "UserStatus",
            filterProperty: "UserStatus",
            width: "140px",
            resizable:false
	     }));
		oSALETable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Sale Grade"}),
            template: new sap.ui.commons.TextView().bindProperty("text", "SaleGrade"),
            sortProperty: "SaleGrade",
            filterProperty: "SaleGrade",
            width: "120px",
            resizable:false
	     }));
		oSALETable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Cargo Worthy"}),
            template: new sap.ui.commons.TextView().bindProperty("text", "CargoWorthy"),
            sortProperty: "CargoWorthy",
            filterProperty: "CargoWorthy",
            width: "120px",
            resizable:false
	     }));
		var oSAleCol = new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Days in SALE"}),
            template: new sap.ui.commons.TextView().bindProperty("text", "DaysInStatus"),
            sortProperty: "DaysInStatus",
            filterProperty: "DaysInStatus",
            width: "110px",
            resizable:false
	      });
		var oUtil = new utility();
		oSALETable.addColumn(oSAleCol);
		oUtil.addColumnSorterAndFilter(oSAleCol, oUtil.compareUptoCount);
		
		var oDaysCol = new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Days in Depot"}),
            template: new sap.ui.commons.TextView().bindProperty("text", "DaysInDepo"),
            sortProperty: "DaysInDepo",
            filterProperty: "DaysInDepo",
            width: "110px",
            resizable:false
	      });
		oSALETable.addColumn(oDaysCol);
		oUtil.addColumnSorterAndFilter(oDaysCol, oUtil.compareUptoCount);
		
		 var oSALETblFlex = new sap.m.FlexBox({
			  items: [
			    oSALEToolbar,
			    oSALETable,
			    oSALEFooter
			  ],
			  //width:"80%",
			  direction: "Column"
		});
		 
		 var oDepInvForSALELayout = new sap.ui.layout.form.ResponsiveGridLayout();
		 var oSALEDetailsForm = new sap.ui.layout.form.Form({
            layout: oDepInvForSALELayout,
            formContainers: [
                new sap.ui.layout.form.FormContainer({
                  formElements: [
						new sap.ui.layout.form.FormElement({
						    fields: [backToDashBoard],
						    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
						}),
						/*new sap.ui.layout.form.FormElement({
							fields: [ new sap.m.Text({text:"Depot Inventory for Status SALE"}).addStyleClass("fontTitle")],
							layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
						}),*/
		                new sap.ui.layout.form.FormElement({
		                     fields: [oSALETblFlex],
		                     layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		                }),
		               /* new sap.ui.layout.form.FormElement({
		                     fields: [oSALETable],
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
		return oSALEDetailsForm;
	},
	bindSALEDetails:function(){
		linkPress = 0;
		//jsonSALE=[];
		//alert("length"+ActiveRelease.length);
		var oSALEDetailsModel = new sap.ui.model.json.JSONModel();
		oSALEDetailsModel.setData(SALEData);
		var oSALEDetailTable = sap.ui.getCore().byId("SALETbl");
		oSALEDetailTable.setModel(oSALEDetailsModel);
		oSALEDetailTable.bindRows("/");

		if (SALEData.length < 25){
			oSALEDetailTable.setVisibleRowCount(SALEData.length);
			oSALEDetailTable.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
			sap.ui.getCore().byId("SALEViewAll").setVisible(false);
		}else{
			oSALEDetailTable.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
			oSALEDetailTable.setVisibleRowCount(25);
			sap.ui.getCore().byId("SALEViewAll").setVisible(true);
		}
		busyDialog.close();
		
		//alert(selRefData.length);
		/*for(var i = 0; i<SALEData.length;i++){
			
			// Manufacturer Date
			var vDocDateResult = SALEData[i].ManufDate.split("(");
            var vDocDate = vDocDateResult[1].split(")");
            var vformattedDocDate = dateFormat(new Date(Number(vDocDate[0])), 'mmm-yyyy');
            //this is to check if the date is default 999 something show blank
            if (vformattedDocDate.substring(6) == "9999"){
            	SALEData[i].ManufDate =  "-";
            }
            else{
            	SALEData[i].ManufDate = vformattedDocDate;
            }
            
            // make Custom JSON for Table - Excel/Print
			jsonSALE.push({
          		  'Unit Number':SALEData[i].UnitNo,
          		  'Unit Type':SALEData[i].UnitType,
          		  'Manufacturer Date':SALEData[i].ManufDate,
          		  'User Status':SALEData[i].UserStatus,
          		  'Days in SALE':SALEData[i].DaysInStatus,
          		  'Days in Depot':SALEData[i].DaysInDepo,
            });
		}*/
		//alert("Length of JSON "+jsonSALE.length );
		
	}
});

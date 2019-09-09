jQuery.sap.require("sap.ui.model.json.JSONModel");
var AWAPData = [];
var objUtil;
var jsonAWAP=[];
var linkPress = 0;
sap.ui.model.json.JSONModel.extend("RepairInventoryAWAP", {

	createDepotInvForAWAP: function(){
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
                  var tab = objUtil.makeHTMLTable(jsonAWAP, "Repair Inventory for Status AWAP","print");
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
                  objUtil.makeHTMLTable(jsonAWAP, "Repair Inventory for Status AWAP","export");
            }
         }).addStyleClass("submitBtn");
         
         var btnViewAll = new sap.m.Button("AWAPViewAll",{
             text : "View All",
             width:"80px",
             visible:false,
             type:sap.m.ButtonType.Unstyled,
             //icon: "images/view_all.png",
             press:function(){
                  //alert("View All");
                  this.setVisible(false);
	        	  if(sap.ui.getCore().byId("AWAPTbl")){
	        		  var oAWAPTable = sap.ui.getCore().byId("AWAPTbl");
	        		  if (AWAPData.length < 100){
	        			  oAWAPTable.setVisibleRowCount(AWAPData.length);
	        			  oAWAPTable.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
	  	  			  }else{
	  	  					oAWAPTable.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
	  	  					oAWAPTable.setVisibleRowCount(100);
	  	  			  }  
	        	  }
             }
          }).addStyleClass("submitBtn");
         
         var oAWAPTitle = new sap.m.FlexBox({
    		  	items: [
    		  	        new sap.m.Text({text:"Repair Inventory for Status AWAP"}).addStyleClass("font15Bold marginTop10")
    		  	        ],
    		  direction: "Row",
    		  width:"60%"
          });
         var lblSpaceLegend = new sap.ui.commons.Label( {text: " ",width : '5px'});
          var oAWAPButton = new sap.m.FlexBox({
    			  items: [
    			    btnExport,lblSpaceLegend,
    			    btnPrint
    			  ],
    			  direction: "RowReverse",
    			  width:"40%"
    		});
    		
         var oAWAPToolbar = new sap.m.FlexBox({
    			  items: [
    			    oAWAPTitle,
    			    oAWAPButton
    			  ],
    			  width:"100%",
    			  direction: "Row"
    	});
         
         /*var oAWAPToolbar = new sap.m.FlexBox({
			  items: [
			    btnExport,
			    btnPrint
			  ],
			  direction: "RowReverse"
		}).addStyleClass("margin10");*/
		
		var oAWAPFooter = new sap.m.FlexBox({
			  items: [
			    btnViewAll
			  ],
			  direction: "Row"
		}).addStyleClass("marginTop10");
 	    
		 
		var oAWAPTable = new sap.ui.table.Table("AWAPTbl",{
            visibleRowCount: 5,
            columnHeaderHeight: 30,
            selectionMode: sap.ui.table.SelectionMode.None,
            navigationMode: sap.ui.table.NavigationMode.Paginator,
            fixedColumnCount: 1
	        //width: "80%",
	     }).addStyleClass("tblBorder marginTop10");
		oAWAPTable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Unit Number"}),
            template: new sap.ui.commons.TextView().bindProperty("text", "UnitNo"),
            sortProperty: "UnitNo",
            filterProperty: "UnitNo",
            width: "140px",
            resizable:false
	     }));
		oAWAPTable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Unit Type"}),
            template: new sap.ui.commons.TextView().bindProperty("text", "UnitType"),
            sortProperty: "UnitType",
            filterProperty: "UnitType",
            width: "80px",
            resizable:false
	     }));
		oAWAPTable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Manufacturer Date"}),
            template: new sap.ui.commons.TextView().bindProperty("text", "ManufDate"),
            sortProperty: "ManufDateActual",
            filterProperty: "ManufDate",
            width: "160px",
            resizable:false
	      }));
		oAWAPTable.addColumn(new sap.ui.table.Column({
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
		oAWAPTable.addColumn(oCurrCol);
		oUtil.addColumnSorterAndFilter(oCurrCol, oUtil.compareUptoCount);
		
		var oDaysCol = new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Days in Depot"}),
            template: new sap.ui.commons.TextView().bindProperty("text", "DaysInDepo"),
            sortProperty: "DaysInDepo",
            filterProperty: "DaysInDepo",
            width: "110px",
            resizable:false
	      });
		oAWAPTable.addColumn(oDaysCol);
		oUtil.addColumnSorterAndFilter(oDaysCol, oUtil.compareUptoCount);
		 var oAWAPTblFlex = new sap.m.FlexBox({
			  items: [
			    oAWAPToolbar,
			    oAWAPTable,
			    oAWAPFooter
			  ],
			  //width:"80%",
			  direction: "Column"
		});
		 
		 var oDepInvForAWAPLayout = new sap.ui.layout.form.ResponsiveGridLayout();
		 var oAWAPDetailsForm = new sap.ui.layout.form.Form({
            layout: oDepInvForAWAPLayout,
            formContainers: [
                new sap.ui.layout.form.FormContainer({
                  formElements: [
						new sap.ui.layout.form.FormElement({
						    fields: [backToDashBoard],
						    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
						}),
						/*new sap.ui.layout.form.FormElement({
							fields: [ new sap.m.Text({text:"Depot Inventory for Status AWAP"}).addStyleClass("fontTitle")],
							layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
						}),*/
		                new sap.ui.layout.form.FormElement({
		                     fields: [oAWAPTblFlex],
		                     layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		                }),
		               /* new sap.ui.layout.form.FormElement({
		                     fields: [oAWAPTable],
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
		return oAWAPDetailsForm;
	},
	bindAWAPDetails:function(){
		linkPress = 0;
		//jsonAWAP=[];
		//alert("length"+ActiveRelease.length);
		var oAWAPDetailsModel = new sap.ui.model.json.JSONModel();
		oAWAPDetailsModel.setData(AWAPData);
		var oAWAPDetailTable = sap.ui.getCore().byId("AWAPTbl");
		oAWAPDetailTable.setModel(oAWAPDetailsModel);
		oAWAPDetailTable.bindRows("/");

		if (AWAPData.length < 25){
			oAWAPDetailTable.setVisibleRowCount(AWAPData.length);
			oAWAPDetailTable.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
			sap.ui.getCore().byId("AWAPViewAll").setVisible(false);
		}else{
			oAWAPDetailTable.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
			oAWAPDetailTable.setVisibleRowCount(25);
			sap.ui.getCore().byId("AWAPViewAll").setVisible(true);
		}
		busyDialog.close();
		//alert(selRefData.length);
		/*for(var i = 0; i<AWAPData.length;i++){
			
			// Manufacturer Date
			var vDocDateResult = AWAPData[i].ManufDate.split("(");
            var vDocDate = vDocDateResult[1].split(")");
            var vformattedDocDate = dateFormat(new Date(Number(vDocDate[0])), 'mmm-yyyy');
            //this is to check if the date is default 999 something show blank
            if (vformattedDocDate.substring(6) == "9999"){
            	AWAPData[i].ManufDate =  "-";
            }
            else{
            	AWAPData[i].ManufDate = vformattedDocDate;
            }
            
            // make Custom JSON for Table - Excel/Print
			jsonAWAP.push({
          		  'Unit Number':AWAPData[i].UnitNo,
          		  'Unit Type':AWAPData[i].UnitType,
          		  'Manufacturer Date':AWAPData[i].ManufDate,
          		  'User Status':AWAPData[i].UserStatus,
          		  'Days in Current Status':AWAPData[i].DaysInStatus,
          		  'Days in Depot':AWAPData[i].DaysInDepo,
            });
		}*/
		//alert("Length of JSON "+jsonAWAP.length );
		
	}
});

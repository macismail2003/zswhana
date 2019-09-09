jQuery.sap.require("sap.ui.model.json.JSONModel");
var HOLDData = [];
var objUtil;
var jsonHOLD=[];
var linkPress = 0;
sap.ui.model.json.JSONModel.extend("DepotInventoryHOLD", {

	createDepotInvForHOLD: function(){
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
                  var tab = objUtil.makeHTMLTable(jsonHOLD, "Depot Inventory for Status HOLD","print");
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
                  objUtil.makeHTMLTable(jsonHOLD, "Depot Inventory for Status HOLD","export");
            }
         }).addStyleClass("submitBtn");
         
         var btnViewAll = new sap.m.Button("HOLDViewAll",{
             text : "View All",
             width:"80px",
             visible:false,
             type:sap.m.ButtonType.Unstyled,
             //icon: "images/view_all.png",
             press:function(){
                  //alert("View All");
                  this.setVisible(false);
	        	  if(sap.ui.getCore().byId("HOLDTbl")){
	        		  var oHOLDTable = sap.ui.getCore().byId("HOLDTbl");
	        		  if (HOLDData.length < 100){
	        			  oHOLDTable.setVisibleRowCount(HOLDData.length);
	        			  oHOLDTable.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
	  	  			  }else{
	  	  					oHOLDTable.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
	  	  					oHOLDTable.setVisibleRowCount(100);
	  	  			  }  
	        	  }
             }
          }).addStyleClass("submitBtn");
         
       var oHOLDTitle = new sap.m.FlexBox({
			  items: [
			    new sap.m.Text({text:"Depot Inventory for Status HOLD"}).addStyleClass("font15Bold marginTop10")
			  ],
			  direction: "Row",
			  width:"60%"
		});
       var lblSpaceLegend = new sap.ui.commons.Label( {text: " ",width : '5px'});
       var oHOLDButton = new sap.m.FlexBox({
			  items: [
			    btnExport,
			    lblSpaceLegend,
			    btnPrint
			  ],
			  direction: "RowReverse",
			  width:"40%"
		});
		
       var oHOLDToolbar = new sap.m.FlexBox({
			  items: [
			    oHOLDTitle,
			    oHOLDButton
			  ],
			  width:"100%",
			  direction: "Row"
		});
		
		var oHOLDFooter = new sap.m.FlexBox({
			  items: [
			    btnViewAll
			  ],
			  direction: "Row"
		}).addStyleClass("marginTop10");
 	    
		 
		var oHOLDTable = new sap.ui.table.Table("HOLDTbl",{
            visibleRowCount: 5,
            columnHeaderHeight: 30,
            selectionMode: sap.ui.table.SelectionMode.None,
            navigationMode: sap.ui.table.NavigationMode.Paginator,
            fixedColumnCount: 1
	        //width: "80%",
	     }).addStyleClass("tblBorder marginTop10");
		oHOLDTable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Unit Number"}),
            template: new sap.ui.commons.TextView().bindProperty("text", "UnitNo"),
            sortProperty: "UnitNo",
            filterProperty: "UnitNo",
            width: "140px",
            resizable:false
	     }));
		oHOLDTable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Unit Type"}),
            template: new sap.ui.commons.TextView().bindProperty("text", "UnitType"),
            sortProperty: "UnitType",
            filterProperty: "UnitType",
            width: "80px",
            resizable:false
	     }));
		oHOLDTable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Manufacturer Date"}),
            template: new sap.ui.commons.TextView().bindProperty("text", "ManufDate"),
            sortProperty: "ManufDateActual",
            filterProperty: "ManufDate",
            width: "160px",
            resizable:false
	      }));
		oHOLDTable.addColumn(new sap.ui.table.Column({
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
		oHOLDTable.addColumn(oCurrCol);
		oUtil.addColumnSorterAndFilter(oCurrCol, oUtil.compareUptoCount);
		
		var oDaysCol=new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Days in Depot"}),
            template: new sap.ui.commons.TextView().bindProperty("text", "DaysInDepo"),
            sortProperty: "DaysInDepo",
            filterProperty: "DaysInDepo",
            width: "110px",
            resizable:false
	      });
		oHOLDTable.addColumn(oDaysCol);
		oUtil.addColumnSorterAndFilter(oDaysCol, oUtil.compareUptoCount);
		
		 var oHOLDTblFlex = new sap.m.FlexBox({
			  items: [
			    oHOLDToolbar,
			    oHOLDTable,
			    oHOLDFooter
			  ],
			  //width:"80%",
			  direction: "Column"
		});
		 
		 var oDepInvForHOLDLayout = new sap.ui.layout.form.ResponsiveGridLayout();
		 var oHOLDDetailsForm = new sap.ui.layout.form.Form({
            layout: oDepInvForHOLDLayout,
            formContainers: [
                new sap.ui.layout.form.FormContainer({
                  formElements: [
						new sap.ui.layout.form.FormElement({
						    fields: [backToDashBoard],
						    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
						}),
						/*new sap.ui.layout.form.FormElement({
							fields: [ new sap.m.Text({text:"Depot Inventory for Status HOLD"}).addStyleClass("fontTitle")],
							layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
						}),*/
		                new sap.ui.layout.form.FormElement({
		                     fields: [oHOLDTblFlex],
		                     layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		                }),
		               /* new sap.ui.layout.form.FormElement({
		                     fields: [oHOLDTable],
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
		return oHOLDDetailsForm;
	},
	bindHOLDDetails:function(){
		linkPress = 0;
		//jsonHOLD=[];
		//alert("length"+ActiveRelease.length);
		var oHOLDDetailsModel = new sap.ui.model.json.JSONModel();
		oHOLDDetailsModel.setData(HOLDData);
		var oHOLDDetailTable = sap.ui.getCore().byId("HOLDTbl");
		oHOLDDetailTable.setModel(oHOLDDetailsModel);
		oHOLDDetailTable.bindRows("/");

		if (HOLDData.length < 25){
			oHOLDDetailTable.setVisibleRowCount(HOLDData.length);
			oHOLDDetailTable.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
			sap.ui.getCore().byId("HOLDViewAll").setVisible(false);
		}else{
			oHOLDDetailTable.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
			oHOLDDetailTable.setVisibleRowCount(25);
			sap.ui.getCore().byId("HOLDViewAll").setVisible(true);
		}
		busyDialog.close();
		//alert(selRefData.length);
		/*for(var i = 0; i<HOLDData.length;i++){
			
			// Manufacturer Date
			var vDocDateResult = HOLDData[i].ManufDate.split("(");
            var vDocDate = vDocDateResult[1].split(")");
            var vformattedDocDate = dateFormat(new Date(Number(vDocDate[0])), 'mmm-yyyy');
            //this is to check if the date is default 999 something show blank
            if (vformattedDocDate.substring(6) == "9999"){
            	HOLDData[i].ManufDate =  "-";
            }
            else{
            	HOLDData[i].ManufDate = vformattedDocDate;
            }
            
            // make Custom JSON for Table - Excel/Print
			jsonHOLD.push({
          		  'Unit Number':HOLDData[i].UnitNo,
          		  'Unit Type':HOLDData[i].UnitType,
          		  'Manufacturer Date':HOLDData[i].ManufDate,
          		  'User Status':HOLDData[i].UserStatus,
          		  'Days in Current Status':HOLDData[i].DaysInStatus,
          		  'Days in Depot':HOLDData[i].DaysInDepo,
            });
		}*/
		//alert("Length of JSON "+jsonHOLD.length );
		
	}
});

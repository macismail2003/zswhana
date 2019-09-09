jQuery.sap.require("sap.ui.model.json.JSONModel");
var REPAData = [];
var objUtil;
var jsonREPA=[];
var linkPress = 0;
sap.ui.model.json.JSONModel.extend("DepotInventoryREPA", {
	createDepotInvForREPA: function(){
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
                  var tab = objUtil.makeHTMLTable(jsonREPA, "Depot Inventory for Status REPAIR","print");
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
                  objUtil.makeHTMLTable(jsonREPA, "Depot Inventory for Status REPAIR","export");
            }
         }).addStyleClass("submitBtn");
         
         var btnViewAll = new sap.m.Button("REPAViewAll",{
             text : "View All",
             width:"80px",
             visible:false,
             type:sap.m.ButtonType.Unstyled,
             //icon: "images/view_all.png",
             press:function(){
                  //alert("View All");
                  this.setVisible(false);
	        	  if(sap.ui.getCore().byId("REPATbl")){
	        		  var oREPATable = sap.ui.getCore().byId("REPATbl");
	        		  if (REPAData.length < 100){
	        			  oREPATable.setVisibleRowCount(REPAData.length);
	        			  oREPATable.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
	  	  			  }else{
	  	  					oREPATable.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
	  	  					oREPATable.setVisibleRowCount(100);
	  	  			  }  
	        	  }
             }
          }).addStyleClass("submitBtn");
         
         var oREPATitle = new sap.m.FlexBox({
			  items: [
			    new sap.m.Text({text:"Depot Inventory for Status Repair"}).addStyleClass("font15Bold marginTop10")
			  ],
			  direction: "Row",
			  width:"60%"
		});
         var lblSpaceLegend = new sap.ui.commons.Label( {text: " ",width : '5px'});
       var oREPAButton = new sap.m.FlexBox({
			  items: [
			    btnExport,lblSpaceLegend,
			    btnPrint
			  ],
			  direction: "RowReverse",
			  width:"40%"
		});
		
       var oREPAToolbar = new sap.m.FlexBox({
			  items: [
			    oREPATitle,
			    oREPAButton
			  ],
			  width:"100%",
			  direction: "Row"
		});
		
		var oREPAFooter = new sap.m.FlexBox({
			  items: [
			    btnViewAll
			  ],
			  direction: "Row"
		}).addStyleClass("marginTop10");
 	    
		 
		var oREPATable = new sap.ui.table.Table("REPATbl",{
            visibleRowCount: 5,
            columnHeaderHeight: 30,
            selectionMode: sap.ui.table.SelectionMode.None,
            navigationMode: sap.ui.table.NavigationMode.Paginator,
            fixedColumnCount: 1
	        //width: "80%",
	     }).addStyleClass("tblBorder marginTop10");
		oREPATable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Unit Number"}),
            template: new sap.ui.commons.TextView().bindProperty("text", "UnitNo"),
            sortProperty: "UnitNo",
            filterProperty: "UnitNo",
            width: "140px",
            resizable:false
	     }));
		oREPATable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Unit Type"}),
            template: new sap.ui.commons.TextView().bindProperty("text", "UnitType"),
            sortProperty: "UnitType",
            filterProperty: "UnitType",
            width: "80px",
            resizable:false
	     }));
		oREPATable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Manufacturer Date"}),
            template: new sap.ui.commons.TextView().bindProperty("text", "ManufDate"),
            sortProperty: "ManufDateActual",
            filterProperty: "ManufDate",
            width: "160px",
            resizable:false
	      }));
		oREPATable.addColumn(new sap.ui.table.Column({
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
		oREPATable.addColumn(oCurrCol);
		oUtil.addColumnSorterAndFilter(oCurrCol, oUtil.compareUptoCount);
		
		var oDaysCol = new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Days in Depot"}),
            template: new sap.ui.commons.TextView().bindProperty("text", "DaysInDepo"),
            sortProperty: "DaysInDepo",
            filterProperty: "DaysInDepo",
            width: "110px",
            resizable:false
	      });
		oREPATable.addColumn(oDaysCol);
		oUtil.addColumnSorterAndFilter(oDaysCol, oUtil.compareUptoCount);
		
		 var oREPATblFlex = new sap.m.FlexBox({
			  items: [
			    oREPAToolbar,
			    oREPATable,
			    oREPAFooter
			  ],
			  //width:"80%",
			  direction: "Column"
		});
		 
		 var oDepInvForREPALayout = new sap.ui.layout.form.ResponsiveGridLayout();
		 var oREPADetailsForm = new sap.ui.layout.form.Form({
            layout: oDepInvForREPALayout,
            formContainers: [
                new sap.ui.layout.form.FormContainer({
                  formElements: [
						new sap.ui.layout.form.FormElement({
						    fields: [backToDashBoard],
						    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
						}),
						/*new sap.ui.layout.form.FormElement({
							fields: [ new sap.m.Text({text:"Depot Inventory for Status REPA"}).addStyleClass("fontTitle")],
							layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
						}),*/
		                new sap.ui.layout.form.FormElement({
		                     fields: [oREPATblFlex],
		                     layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		                }),
		               /* new sap.ui.layout.form.FormElement({
		                     fields: [oREPATable],
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
		return oREPADetailsForm;
	},
	bindREPADetails:function(){
		linkPress = 0;
		//jsonREPA=[];
		//alert("length"+ActiveRelease.length);
		var oREPADetailsModel = new sap.ui.model.json.JSONModel();
		oREPADetailsModel.setData(REPAData);
		var oREPADetailTable = sap.ui.getCore().byId("REPATbl");
		oREPADetailTable.setModel(oREPADetailsModel);
		oREPADetailTable.bindRows("/");

		if (REPAData.length < 25){
			oREPADetailTable.setVisibleRowCount(REPAData.length);
			oREPADetailTable.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
			sap.ui.getCore().byId("REPAViewAll").setVisible(false);
		}else{
			oREPADetailTable.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
			oREPADetailTable.setVisibleRowCount(25);
			sap.ui.getCore().byId("REPAViewAll").setVisible(true);
		}
		busyDialog.close();
		//alert(selRefData.length);
		/*for(var i = 0; i<REPAData.length;i++){
			
			// Manufacturer Date
			var vDocDateResult = REPAData[i].ManufDate.split("(");
            var vDocDate = vDocDateResult[1].split(")");
            var vformattedDocDate = dateFormat(new Date(Number(vDocDate[0])), 'mmm-yyyy');
            //this is to check if the date is default 999 something show blank
            if (vformattedDocDate.substring(6) == "9999"){
            	REPAData[i].ManufDate =  "-";
            }
            else{
            	REPAData[i].ManufDate = vformattedDocDate;
            }
            
            // make Custom JSON for Table - Excel/Print
			jsonREPA.push({
          		  'Unit Number':REPAData[i].UnitNo,
          		  'Unit Type':REPAData[i].UnitType,
          		  'Manufacturer Date':REPAData[i].ManufDate,
          		  'User Status':REPAData[i].UserStatus,
          		  'Days in Current Status':REPAData[i].DaysInStatus,
          		  'Days in Depot':REPAData[i].DaysInDepo,
            });
		}*/
		//alert("Length of JSON "+jsonREPA.length );
		
	}
	
});

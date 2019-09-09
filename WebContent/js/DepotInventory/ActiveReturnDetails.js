jQuery.sap.require("sap.ui.model.json.JSONModel");
var ActiveReturnDatDash = [];
var objUtil;
var jsonActReturnDet=[];
var linkPress = 0;
sap.ui.model.json.JSONModel.extend("ActiveReturnDetails", {

	createActiveReturn: function(){
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
                  var tab = objUtil.makeHTMLTable(jsonActReturnDet, "Active Return Details","print");
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
                  objUtil.makeHTMLTable(jsonActReturnDet, "Active Return Details","export");
            }
         }).addStyleClass("submitBtn");
         
        var btnViewAll = new sap.m.Button("ActReturnViewAll",{
             text : "View All",
             width:"80px",
             type:sap.m.ButtonType.Unstyled,
             //icon: "images/view_all.png",
             press:function(){
                   //alert("View All");
                  this.setVisible(false);
 	        	  if(sap.ui.getCore().byId("ActReturnDetailsTbl")){
 	        		  var oActReleaseTable = sap.ui.getCore().byId("ActReturnDetailsTbl");
 	        		  if (ActiveReturnDatDash.length < 100){
 	        			 oActReleaseTable.setVisibleRowCount(ActiveReturnDatDash.length);
 	        			 oActReleaseTable.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
 	  	  			  }else{
 	  	  				oActReleaseTable.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
 	  	  				oActReleaseTable.setVisibleRowCount(100);
 	  	  			  }  
 	        	  }
             }
        }).addStyleClass("submitBtn");
         
        var oActReturnDetailsTitle = new sap.m.FlexBox({
			  items: [
			    new sap.m.Text({text:"Active Return Details"}).addStyleClass("font15Bold marginTop10")
			  ],
			  direction: "Row",
			  width:"60%"
		});
        var lblSpaceLegend = new sap.ui.commons.Label( {text: " ",width : '5px'});
       var oActReturnDetailsButtons = new sap.m.FlexBox({
			  items: [
			    btnExport,lblSpaceLegend,
			    btnPrint
			  ],
			  direction: "RowReverse",
			  width:"40%"
		});
		
       var oActReturnDetailsToolbar = new sap.m.FlexBox({
			  items: [
			    oActReturnDetailsTitle,
			    oActReturnDetailsButtons
			  ],
			  width:"100%",
			  direction: "Row"
		});
		
		var oActReturnTable = new sap.ui.table.Table("ActReturnDetailsTbl",{
            visibleRowCount: 5,
            columnHeaderHeight: 40,
            selectionMode: sap.ui.table.SelectionMode.None,
            navigationMode: sap.ui.table.NavigationMode.Paginator,
            fixedColumnCount: 1,
	        //width: "90%",
	     }).addStyleClass("tblBorder marginTop10");
		oActReturnTable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Return Reference"}),
            template: new sap.ui.commons.TextView().bindProperty("text", "ReturnRef"),
            sortProperty: "ReturnRef",
            filterProperty: "ReturnRef",
            width: "140px",
            resizable:false
	     }));
		oActReturnTable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Unit Type"}),
            template: new sap.ui.commons.TextView().bindProperty("text", "UnitType"),
            sortProperty: "UnitType",
            filterProperty: "UnitType",
            width: "80px",
            resizable:false
	     }));
		oActReturnTable.addColumn(new sap.ui.table.Column({
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
		 oActReturnTable.addColumn(oTotalCol);
			oUtil.addColumnSorterAndFilter(oTotalCol, oUtil.compareUptoCount);
			
			
		var oOutCol= new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Outstanding Quantity"}),
            template: new sap.ui.commons.TextView().bindProperty("text", "OutstandQuant"),
            sortProperty: "OutstandQuant",
            filterProperty: "OutstandQuant",
            width: "170px",
            resizable:false
	      });
		oActReturnTable.addColumn(oOutCol);
			oUtil.addColumnSorterAndFilter(oOutCol, oUtil.compareUptoCount);
			
		oActReturnTable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Expiry Date"}),
            template: new sap.ui.commons.TextView().bindProperty("text", "ExpDate"),
            sortProperty: "ExpDateActual",
            filterProperty: "ExpDate",
            width: "100px",
            resizable:false
	      }));
		
		var oActRetFlex = new sap.m.FlexBox({
			  items: [
			    oActReturnDetailsToolbar,
			    oActReturnTable
			    //oActReleaseDetailsFooter
			  ],
			  //width:"80%",
			  direction: "Column"
		});
		
		var oActiveReturnLayout = new sap.ui.layout.form.ResponsiveGridLayout();
		var oActReleaseDetailsForm = new sap.ui.layout.form.Form({
            layout: oActiveReturnLayout,
            formContainers: [
                new sap.ui.layout.form.FormContainer({
                  formElements: [
						new sap.ui.layout.form.FormElement({
						    fields: [backToDashBoard],
						    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
						}),
		                new sap.ui.layout.form.FormElement({
		                     fields: [oActRetFlex],
		                     layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		                }),
				  ]
                })		                        
			 ]
		});
		return oActReleaseDetailsForm;
	},
	
	bindActReturnDetails:function(){
		linkPress = 0;
		jsonActReturnDet=[];
		//alert("length"+ActiveReturn.length);
		var oActReturnDetailsModel = new sap.ui.model.json.JSONModel();
		oActReturnDetailsModel.setData(ActiveReturnDatDash);
		var oActReturnDetailTable = sap.ui.getCore().byId("ActReturnDetailsTbl");
		oActReturnDetailTable.setModel(oActReturnDetailsModel);
		oActReturnDetailTable.bindRows("/");

		if (ActiveReturnDatDash.length < 100){
			oActReturnDetailTable.setVisibleRowCount(ActiveReturnDatDash.length);
			oActReturnDetailTable.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
			//sap.ui.getCore().byId("ActReturnViewAll").setVisible(false);
		}else{
			oActReturnDetailTable.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
			oActReturnDetailTable.setVisibleRowCount(100);
			//sap.ui.getCore().byId("ActReturnViewAll").setVisible(true);
		}
		//alert(selRefData.length);
		for(var i = 0; i<ActiveReturnDatDash.length;i++){
			// make Custom JSON for Table - Excel/Print
			jsonActReturnDet.push({
          		  'Return Reference':ActiveReturnDatDash[i].ReturnRef,
          		  'Unit Type':ActiveReturnDatDash[i].UnitType,
          		  'Customer':ActiveReturnDatDash[i].Customer,
          		  'Total Quantity':ActiveReturnDatDash[i].TotalQuant,
          		  'Outstanding Quantity':ActiveReturnDatDash[i].OutstandQuant,
          		  'Expiry Date':ActiveReturnDatDash[i].ExpDate,
            });
		}
		
	}
	
});

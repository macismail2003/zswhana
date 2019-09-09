/******** NP *******/
var globalLastVisitedId = "";
jQuery.sap.require("sap.ui.model.json.JSONModel");

	var aUnitEnq = [];
	var aUnitsEnqNotFound = [];
	//var aUnitSpecs = [];
	//var aUnitsSpecsNotFound = [];
	var aUnitsSoldOut = [];
	var jsonUnitEnq = [];
	var jsonUnitSpec = [];
	var unitSpecController;
	var vunitSpecViewAll = sap.ui.getCore().byId("idUnitSpecViewAll");
	var vunitStatusViewAll = sap.ui.getCore().byId("idUnitStatusViewAll");
	var selUnitNumber = "";
sap.ui.model.json.JSONModel.extend("unitEnqSpecsView", {
	
	createUnitEnqSpecs:function(){
		var oFlexboxUnitEnqSpecs = new sap.m.FlexBox("idUnitEnqSpecsFlxBox",{
            items: [],
            direction: "Column"
		  });
		
		return oFlexboxUnitEnqSpecs;
	},
	
	createUnitEnqSpecsFormView: function(oController){
		sap.ui.getCore().byId("idUnitEnqSpecsFlxBox").destroyItems();
		  var backUnitEnquiryTables = new sap.m.Link("idBackUnitEnquiryTables", {text: " < Back",
        	  width:"13%",
        	  wrapping:true,
        	  press: function(){
        		  var bus = sap.ui.getCore().getEventBus();
        			bus.publish("nav", "back");
       	  }});
		  
		var oUnitSpec = this;
		unitSpecController = oController;
		var oBtnExportUnitStatus = new sap.m.Button({
            text : "Export To Excel",
            type:sap.m.ButtonType.Unstyled,
            icon: sap.ui.core.IconPool.getIconURI("excel-attachment"),
            press:function(){
            	//objUtil = new utility();
            	objUtil.makeHTMLTable(jsonUnitEnq, "Unit Status" ,"export");
            	//tableToExcel("idAccountDetailTbl-table",vTitle,vColLen);
            }
         }).addStyleClass("submitBtnEnd marginBottom20");
		var oUnitEnqExportBtnFlxBox = new sap.m.FlexBox({
	  		  items: [oBtnExportUnitStatus],
	  		  direction:"RowReverse",
	  		  width:"40%"
	     		});
		//unit status
		// Labels
		var oLabelUnitEnq = new sap.ui.commons.Label({text: "Unit Status",
            wrapping: true}).addStyleClass("font15Bold marginTop20");
		
		var oUnitEnqtitleFlxBox = new sap.m.FlexBox({
	  		  items: [oLabelUnitEnq],
	  		  direction:"Row",
	  		  width:"60%"
	     		});
		
		var oUnitEnqHeadr= new sap.m.FlexBox({
	  		  items: [oUnitEnqtitleFlxBox,oUnitEnqExportBtnFlxBox],
	  		  direction:"Row",
	  		  width:"100%"
	     		});
		
		// UNIT ENQUIRY Table
    	var oUnitEnqTable = new sap.ui.table.Table("idUnitStatusTbl",{
    		visibleRowCount: 25,
            firstVisibleRow: 1,
            selectionMode: sap.ui.table.SelectionMode.None,
            navigationMode: sap.ui.table.NavigationMode.Paginator,
            columnHeaderHeight: 30,
            //width: "100%",
          //  height:"100%",
            //fixedColumnCount:1
    	 }).addStyleClass("tblBorder");
    	oUnitEnqTable.addColumn(new sap.ui.table.Column({
			 label: new sap.ui.commons.Label({text: "Unit Number"}).addStyleClass("wraptextcol"),
			  resizable:false,
			  width:"100px",
			 template: new sap.ui.commons.Link({
				press : function() {
					busyDialog.open();
					if(globalLastVisitedId != "")
						$('#' + globalLastVisitedId).removeClass("visited");
					
					globalLastVisitedId = this.getId();
					$('#' + globalLastVisitedId).addClass("visited");
					selUnitNumber = this.getText();
					var oUnitEnquiry = new unitEnquiryView();
					oUnitEnquiry.bindSingleUnitStatus(selUnitNumber,2);
				}
		}).bindProperty("text", "UnitNumber"),
	         sortProperty: "UnitNumber",
	         filterProperty: "UnitNumber",
		}));
    	 
    	oUnitEnqTable.addColumn(new sap.ui.table.Column({
    		 label: new sap.ui.commons.Label({text: "Unit Type"}).addStyleClass("wraptextcol"),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "ProductType"),
             sortProperty: "ProductType",
             filterProperty: "ProductType",
             resizable:false,
             width:"180px"
    		 }));
    	 
    	oUnitEnqTable.addColumn(new sap.ui.table.Column({
    		 label: new sap.ui.commons.Label({text: "Status"}).addStyleClass("wraptextcol"),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "Status"),
             sortProperty: "Status",
             filterProperty: "Status",
             resizable:false,
             width:"90px"
    		 }));
    	 
    	oUnitEnqTable.addColumn(new sap.ui.table.Column({
    		 label: new sap.ui.commons.Label({text: "Customer"}).addStyleClass("wraptextcol"),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "Customer"),
             sortProperty: "Customer",
             filterProperty: "Customer",
             resizable:false,
             width:"150px"
    		 }));
    	 
    	oUnitEnqTable.addColumn(new sap.ui.table.Column({
    		 label: new sap.ui.commons.Label({text: "On/Off Hire Date"}).addStyleClass("wraptextcol"),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "HireDate"),
             sortProperty: "HireDateActual",
             filterProperty: "HireDate",
             resizable:false,
             width:"120px"
    		 }));
    	 
    	oUnitEnqTable.addColumn(new sap.ui.table.Column({
    		 label: new sap.ui.commons.Label({text: "On/Off Hire City"}).addStyleClass("wraptextcol"),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "City"),
             sortProperty: "City",
             filterProperty: "City",
             resizable:false,
             width:"150px"
    		 }));
    	
    	var oBtnUnitEnqViewAll = new sap.m.Button("idUnitStatusViewAll",{
            text : "View All",
            styled:false,
            press:function(){
            	vunitStatusViewAll.setVisible(false);
            	 var vUnitStatusLen = aUnitEnq.length;
           		if(vUnitStatusLen < 100){
	              		sap.ui.getCore().byId("idUnitStatusTbl").setVisibleRowCount(vUnitStatusLen);
	              		sap.ui.getCore().byId("idUnitStatusTbl").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
           		}
           		else{
	              		sap.ui.getCore().byId("idUnitStatusTbl").setVisibleRowCount(100);
	              		sap.ui.getCore().byId("idUnitStatusTbl").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
           		}
            }
         }).addStyleClass("submitBtn");
    	vunitStatusViewAll = sap.ui.getCore().byId("idUnitStatusViewAll");
    	var oUnitEnqResTableFooter = new sap.m.FlexBox({
  		  items: [oBtnUnitEnqViewAll],
  		  visible:false
     		});
    	// Flex Box
    	var oFlexBoxAll1 = new sap.m.FlexBox("idFlexUnitEnqTbl",{
    		  items: [
    		          oUnitEnqHeadr,
    		          oUnitEnqTable,
       		    	  oBtnUnitEnqViewAll
       		  ],
       		  direction: "Column"
       		}); 
    	
    	// UNIT SPECIFICATIONS 
    	var oBtnExportUnitSpec = new sap.m.Button({
            text : "Export To Excel",
            type:sap.m.ButtonType.Unstyled,
            icon: sap.ui.core.IconPool.getIconURI("excel-attachment"),
            press:function(){
            	//objUtil = new utility();
            	//alert("vTitle " + vTitle);
            	objUtil.makeHTMLTable(jsonUnitSpec, "Unit Specifications","export");
            	//tableToExcel("idAccountDetailTbl-table",vTitle,vColLen);
            }
         }).addStyleClass("submitBtnEnd marginBottom20");
		var oUnitSpecExportBtnFlxBox = new sap.m.FlexBox({
	  		  items: [oBtnExportUnitSpec],
	  		  direction:"RowReverse",
	  		  width:"40%"
	     		});
    	// UNIT SPECIFICATIONS 
    	// Labels
		var oLabelUnitSpec = new sap.ui.commons.Label({text: "Unit Specifications",
            wrapping: true}).addStyleClass("font15Bold marginTop20");
    	
		var oUnitSpectitleFlxBox = new sap.m.FlexBox({
	  		  items: [oLabelUnitSpec],
	  		  direction:"Row",
	  		  width:"60%"
	     		});
		
		var oUnitSpecHeadr= new sap.m.FlexBox({
	  		  items: [oUnitSpectitleFlxBox,oUnitSpecExportBtnFlxBox],
	  		  direction:"Row",
	  		  width:"100%"
	     		});
		
		//unit spec table
    	var oUnitSpecTable = new sap.ui.table.Table("idUnitSpecTbl",{
    		visibleRowCount: 2,
            firstVisibleRow: 1,
            columnHeaderHeight: 30,
            selectionMode: sap.ui.table.SelectionMode.None,
            navigationMode: sap.ui.table.NavigationMode.Paginator,
           // width: "100%",
           // height:"100%",
            fixedColumnCount:1
    	 }).addStyleClass("tblBorder");
    	oUnitSpecTable.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Unit Number"}).addStyleClass("wraptextcol"),
	   		 template: new sap.ui.commons.Link({
	 			press : function() {
	 				busyDialog.open();
	 				
	 				if(globalLastVisitedId != "")
						$('#' + globalLastVisitedId).removeClass("visited");
					
					globalLastVisitedId = this.getId();
					$('#' + globalLastVisitedId).addClass("visited");
					
	 				selUnitNumber = this.getText();
					var oUnitEnquiry = new unitEnquiryView();
					oUnitEnquiry.bindSingleUnitStatus(selUnitNumber,2);
	 			}
	 		}).bindProperty("text", "Equnr"),
	         sortProperty: "Equnr",
	         filterProperty: "Equnr",
	         resizable:false,
	         width:"100px"
		}));
    	 
    	oUnitSpecTable.addColumn(new sap.ui.table.Column({
    		 label: new sap.ui.commons.Label({text: "Unit Type"}).addStyleClass("wraptextcol"),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "Eqktx"),
             sortProperty: "Eqktx",
             filterProperty: "Eqktx",
             resizable:false,
             width:"220px"
    		 }));
    	
    	oUnitSpecTable.addColumn(new sap.ui.table.Column({
     		 label: new sap.ui.commons.Label({text: "Year Of Manuf."}).addStyleClass("wraptextcol"),
     		 template: new sap.ui.commons.TextView().bindProperty("text", "Mandate"),
              sortProperty: "Mandate",
              filterProperty: "Mandate",
              resizable:false,
              width:"90px"
     		 }));
    	
    	oUnitSpecTable.addColumn(new sap.ui.table.Column({
      		 label: new sap.ui.commons.Label({text: "Gross Weight"}).addStyleClass("wraptextcol"),
      		 template: new sap.ui.commons.TextView().bindProperty("text", "MaxGrossWeight"),
               sortProperty: "MaxGrossWeight",
               filterProperty: "MaxGrossWeight",
               resizable:false,
               width:"90px"
      		 }));
    	
    	
    	oUnitSpecTable.addColumn(new sap.ui.table.Column({
    		 label: new sap.ui.commons.Label({text: "Payload"}).addStyleClass("wraptextcol"),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "MaxPayload"),
             sortProperty: "MaxPayload",
             filterProperty: "MaxPayload",
             resizable:false,
             width:"90px"
    		 }));
    	 
    	oUnitSpecTable.addColumn(new sap.ui.table.Column({
    		 label: new sap.ui.commons.Label({text: "Tare Weight"}).addStyleClass("wraptextcol"),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "TareWeight"),
             sortProperty: "TareWeight",
             filterProperty: "TareWeight",
             resizable:false,
             width:"90px"
    		 }));
    	 
    	oUnitSpecTable.addColumn(new sap.ui.table.Column({
    		 label: new sap.ui.commons.Label({text: "Door Opening Width"}).addStyleClass("wraptextcol"),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "DoorOpeningWidth"),
             sortProperty: "DoorOpeningWidth",
             filterProperty: "DoorOpeningWidth",
             resizable:false,
             width:"90px"
    		 }));
    	 
    	oUnitSpecTable.addColumn(new sap.ui.table.Column({
    		 label: new sap.ui.commons.Label({text: "Door Opening Height"}).addStyleClass("wraptextcol"),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "DoorOpeningHeight"),
             sortProperty: "DoorOpeningHeight",
             filterProperty: "DoorOpeningHeight",
             resizable:false,
             width:"90px"
    		 }));
    	
    	oUnitSpecTable.addColumn(new sap.ui.table.Column({
   		 label: new sap.ui.commons.Label({text: "Cubic Capacity"}).addStyleClass("wraptextcol"),
   		 template: new sap.ui.commons.TextView().bindProperty("text", "CubicCapacity"),
            sortProperty: "CubicCapacity",
            filterProperty: "CubicCapacity",
            resizable:false,
            width:"90px"
   		 }));
    	
    	
    	var oBtnUnitSpecsViewAll =  new sap.m.Button("idUnitSpecViewAll",{
            text : "View All",
            styled: false,
            //icon: "images/view_all.png",
            press:function(){
                 // alert("View All");
              	vunitSpecViewAll.setVisible(false);
                  var vUnitSpecLen = aUnitspecification.length;
              		if(vUnitSpecLen < 100){
	              		sap.ui.getCore().byId("idUnitSpecTbl").setVisibleRowCount(vUnitSpecLen);
	              		sap.ui.getCore().byId("idUnitSpecTbl").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
              		}
              		else{
	              		sap.ui.getCore().byId("idUnitSpecTbl").setVisibleRowCount(100);
	              		sap.ui.getCore().byId("idUnitSpecTbl").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
              		}
            }
         }).addStyleClass("submitBtn");
    	vunitSpecViewAll = sap.ui.getCore().byId("idUnitSpecViewAll");
    	
    	var oUnitSpecResTableFooter = new sap.m.FlexBox({
    		  items: [oBtnUnitSpecsViewAll],
    		  visible:false
       		}); 
    	
    	// Labels
		var oLabelUnitsNF = new sap.ui.commons.Label({text: "Units Not Found ",
            wrapping: true}).addStyleClass("font15Bold marginStyle");
		
		// Table - UNITS NOT FOUND
    	var oUnitsSpecsNotFoundTable = new sap.ui.table.Table({
    		visibleRowCount: aUnitsEnqNotFound.length,
            firstVisibleRow: 3,
            columnHeaderVisible : false,
            columnHeaderHeight: 30,
            selectionMode: sap.ui.table.SelectionMode.None,
           // width: "35%",
            height:"100%"
    	 }).addStyleClass("fontStyle tblBorder");
    	var browser = sap.ui.Device.browser.chrome;
    	if(browser){
    		oUnitsSpecsNotFoundTable.setWidth("35%");
    	}
    	else{
    		oUnitsSpecsNotFoundTable.setWidth("");
    	}
		// Table Columns    	 
    	oUnitsSpecsNotFoundTable.addColumn(new sap.ui.table.Column({
    		 template: new sap.ui.commons.TextView().bindProperty("text", "UnitNumber"),
             sortProperty: "UnitNumber",
             filterProperty: "UnitNumber",
             resizable:false,
             width:"160px",
    		 }));
    	
    	//Create a model and bind the table rows to this model
    	var oModelUnitsSpecsNotFound = new sap.ui.model.json.JSONModel();
    	oModelUnitsSpecsNotFound.setData({modelData: aUnitsEnqNotFound});
    	oUnitsSpecsNotFoundTable.setModel(oModelUnitsSpecsNotFound);
    	oUnitsSpecsNotFoundTable.bindRows("/modelData");
    	
    	// UNITS SOLD OUT
    	// Labels
		var oLabelUnitsSoldOut = new sap.ui.commons.Label({text: "Units Sold Out",
            wrapping: true}).addStyleClass("font15Bold marginStyle");
		
		// Table - UNITS SOLD OUT
    	var oUnitsSoldOutTable = new sap.ui.table.Table({
    		visibleRowCount: aUnitsSoldOut.length,
            firstVisibleRow: 3,
            columnHeaderVisible : false,
            columnHeaderHeight: 30,
            selectionMode: sap.ui.table.SelectionMode.None,
           // width: "35%",
            height:"100%"
    	 }).addStyleClass("fontStyle tblBorder");
    	if(browser){
    		oUnitsSoldOutTable.setWidth("35%");
    	}
    	else{
    		oUnitsSoldOutTable.setWidth("");
    	}
		// Table Columns    	 
    	oUnitsSoldOutTable.addColumn(new sap.ui.table.Column({
    		 template: new sap.ui.commons.TextView().bindProperty("text", "UnitNumber"),
             sortProperty: "UnitNumber",
             filterProperty: "UnitNumber",
             width:"160px",
             resizable:false,
    		 }));
    	//Create a model and bind the table rows to this model
    	var oModelUnitsSoldOut = new sap.ui.model.json.JSONModel();
    	oModelUnitsSoldOut.setData({modelData: aUnitsSoldOut});
    	oUnitsSoldOutTable.setModel(oModelUnitsSoldOut);
    	oUnitsSoldOutTable.bindRows("/modelData");
    	
    	// Flex Box
    	var oFlexBoxUnitsNF = new sap.m.FlexBox({
  		  items: [
     				  oLabelUnitsNF,
     			      oUnitsSpecsNotFoundTable
     		  ],
     		  direction: "Column"
     		}); 
    	if(aUnitsEnqNotFound.length == 0 ){
    		oFlexBoxUnitsNF.setVisible(false);
    	}
    	else{
    		oFlexBoxUnitsNF.setVisible(true);
    	}
    	
    	
    	var oFlexBoxUnitsSO = new sap.m.FlexBox({
    		  items: [
       				  oLabelUnitsSoldOut,
       				  oUnitsSoldOutTable
       		  ],
       		  direction: "Column"
       		});
    	if(aUnitsSoldOut.length == 0 ){
    		oFlexBoxUnitsSO.setVisible(false);
    	}
    	else{
    		oFlexBoxUnitsSO.setVisible(true);
    	}
    	
    	var oLabelUnitsNF = new sap.ui.commons.Label({text: " ",
    		width:"100px",
            wrapping: true});
    	
    	var oFlexBoxUnitsNFSO = new sap.m.FlexBox({
  		  items: [
     				  oFlexBoxUnitsNF,oLabelUnitsNF,
     				  oFlexBoxUnitsSO
     		  ],
     		  direction: "Row"
     		});
    	
    	var oFlexBoxAll2 = new sap.m.FlexBox("idFlexUnitSpecTbl",{
    		  items: [
    		          oUnitSpecHeadr,
    		          oUnitSpecTable,
    		          oBtnUnitSpecsViewAll,
       				  //oLabelUnitsNF,
       			      //oUnitsSpecsNotFoundTable
    		          //oFlexBoxUnitsNFSO
       		  ],
       		  direction: "Column",
       			  width:"100%"
       		}).addStyleClass("marginTop20"); 
    	
    	// Responsive Grid Layout
	    var oUnitEnqSpecsLayout = new sap.ui.layout.form.ResponsiveGridLayout("idUnitEnqSpecsLayout");
   	 
		  // Online Form Starts
		     var oUnitEnqSpecsForm = new sap.ui.layout.form.Form("idUnitEnqSpecsForm",{
		             layout: oUnitEnqSpecsLayout,
		             formContainers: [
		                     
		                     new sap.ui.layout.form.FormContainer("idUnitEnqSpecsFormC1",{
		                             formElements: [
													new sap.ui.layout.form.FormElement({
													    fields: [backUnitEnquiryTables],
													    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
													}),
													new sap.ui.layout.form.FormElement({
													    fields: [oFlexBoxAll1]
													}),
													new sap.ui.layout.form.FormElement({
 													    fields: [oFlexBoxAll2]
 													}),
 													new sap.ui.layout.form.FormElement({
 													    fields: [oFlexBoxUnitsNFSO]
 													})
		                                     ]
		                     })                    
		             ]
		     });
		     sap.ui.getCore().byId("idUnitEnqSpecsFlxBox").addItem(oUnitEnqSpecsForm);
	// return oUnitEnqSpecsForm;
	},
	
	bindAllDetails: function(){
		jsonUnitEnq = [];
		jsonUnitSpec = [];
		//json for excel - Unit Status
		for(var i=0;i<aUnitEnq.length;i++){
			 jsonUnitEnq.push({
		            'Unit Number':aUnitEnq[i].UnitNumber,
		            'Unit Type':aUnitEnq[i].ProductType,
		            'Status':aUnitEnq[i].Status,
		            'Customer':aUnitEnq[i].Customer,
		            'On/Off Hire Date':aUnitEnq[i].HireDate,
		            'On/Off Hire City':aUnitEnq[i].City,
		        });
		}
		
		//json for excel - Unit Spec
		for(var i=0;i<aUnitspecification.length;i++){
			 jsonUnitSpec.push({
		            'Unit Number':aUnitspecification[i].Equnr,
		            'Unit Type':aUnitspecification[i].Eqktx,
		            'Year Of Manufacture':aUnitspecification[i].Mandate,
		            'Max Gross Weight': aUnitspecification[i].MaxGrossWeight,
		            'Payload':aUnitspecification[i].MaxPayload,
		            'Tare Weight':aUnitspecification[i].TareWeight,
		            'Door Opening Width':aUnitspecification[i].DoorOpeningWidth,
		            'Door Opening Height':aUnitspecification[i].DoorOpeningHeight,
		            'Cubic Capacity':aUnitspecification[i].CubicCapacity,
		        });
		}
		
		var vUnitStatusTbl = sap.ui.getCore().byId("idUnitStatusTbl");
		var vUnitSpecTbl = sap.ui.getCore().byId("idUnitSpecTbl");
		var vFlexUnitSpecs = sap.ui.getCore().byId("idFlexUnitSpecTbl");
		var vFlexUnitEnq = sap.ui.getCore().byId("idFlexUnitEnqTbl");
		
		var oModelUnitEnq = new sap.ui.model.json.JSONModel();
    	oModelUnitEnq.setData({modelData: aUnitEnq});
    	vUnitStatusTbl.setModel(oModelUnitEnq);
    	vUnitStatusTbl.bindRows("/modelData");
    	//set pagination unit status table
    	var vUnitStatusLen = aUnitEnq.length;
    	//alert("status len " + vUnitStatusLen);
    	if(vUnitStatusLen == 0){
    		vFlexUnitEnq.setVisible(false);
    	}
    	else{
    		vFlexUnitEnq.setVisible(true);
    	}
    	if(vUnitStatusLen < 25){
    		//vUnitStatusTbl.setVisible(true);
    		vunitStatusViewAll.setVisible(false);
    		vUnitStatusTbl.setVisibleRowCount(vUnitStatusLen);
    		vUnitStatusTbl.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
    	}
    	else{
    		//vUnitStatusTbl.setVisible(true);
    		vunitStatusViewAll.setVisible(true);
    		vUnitStatusTbl.setVisibleRowCount(25);
    		vUnitStatusTbl.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
    	}
    	
    	//alert("spec len " + aUnitspecification.length);
    	
    	var oModelUnitSpecs = new sap.ui.model.json.JSONModel();
    	oModelUnitSpecs.setData({modelData: aUnitspecification});
    	vUnitSpecTbl.setModel(oModelUnitSpecs);
    	vUnitSpecTbl.bindRows("/modelData");
    	//set pagination for unit specification table
    	var vUnitSpecLen = aUnitspecification.length;
    	//alert("spec len " + vUnitSpecLen);
    	if(vUnitSpecLen == 0){
    		vFlexUnitSpecs.setVisible(false);
    	}
    	else{
    		vFlexUnitSpecs.setVisible(true);
    	}
    	if(vUnitSpecLen < 25){
    		//vUnitSpecTbl.setVisible(true);
    		vunitSpecViewAll.setVisible(false);
    		vUnitSpecTbl.setVisibleRowCount(vUnitSpecLen);
    		vUnitSpecTbl.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
    	}
    	else{
    		//vUnitSpecTbl.setVisible(true);
    		vunitSpecViewAll.setVisible(true);
    		vUnitSpecTbl.setVisibleRowCount(25);
    		vUnitSpecTbl.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
    	}
		
	}
	
	
	
});
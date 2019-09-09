
sap.ui.model.json.JSONModel.extend("outPayDetCashView", {
	
	createOutPayDetCash:function(){
		var oFlexboxOutPayDetCash = new sap.m.FlexBox("idOutPayDetCashFlxBox",{
            items: [],
            direction: "Row"
		  });
		
		return oFlexboxOutPayDetCash;
	},
	
	createOutPayDetCashFormView: function(){
		sap.ui.getCore().byId("idOutPayDetCashFlxBox").destroyItems();
		 var backToOutPayCash = new sap.m.Link("idBackToOutPayCash", {text: " < Back",
	       	  width:"7%",
	       	  wrapping:true,
	       	  press: function(){
	       		  var bus = sap.ui.getCore().getEventBus();
	       			bus.publish("nav", "back");
	      	  }});
		 
		 var oBtnViewAllOutstandingPayCashDet = new sap.m.Button("idBtnViewAllOutstandingPayCashDet",{
	            text : "View All",
	            styled:false,
		        width:"80px",
	            press:function(){
	            	this.setVisible(false);
		        	var vArrayLength = aOutstandingPayCashDetData.length;
		        	if(vArrayLength < 100){
		        		sap.ui.getCore().byId("idOutPayCashDetTbl").setVisibleRowCount(vArrayLength);
		        		sap.ui.getCore().byId("idOutPayCashDetTbl").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		        	}
		        	else{
		        		sap.ui.getCore().byId("idOutPayCashDetTbl").setVisibleRowCount(100);
		        		sap.ui.getCore().byId("idOutPayCashDetTbl").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		        	}
		          }
	         }).addStyleClass("submitBtn marginTop10");
		
		
	 // Table
    	var oOutPayDetCashTable = new sap.ui.table.Table("idOutPayCashDetTbl",{
    		visibleRowCount: 2,
            firstVisibleRow: 3,
            columnHeaderHeight: 45,
            selectionMode: sap.ui.table.SelectionMode.None,
            navigationMode: sap.ui.table.NavigationMode.Paginator,
            width: "70%",
            height:"100%"
    	 }).addStyleClass("tblBorder marginTop10");
    	
    	// Table Columns
    	oOutPayDetCashTable.addColumn(new sap.ui.table.Column({
    		label: new sap.ui.commons.Label({text: "Invoice"}),
   		 template: new sap.ui.commons.TextView().bindProperty("text", "InvoiceNo"),
            sortProperty: "InvoiceNo",
            filterProperty: "InvoiceNo",
            width:"100px",
            resizable:false
   		 }));
    	 
    	oOutPayDetCashTable.addColumn(new sap.ui.table.Column({
    		label: new sap.ui.commons.Label({text: "Invoice Date",}),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "InvoiceDate"),
             sortProperty: "InvDateActual",
             filterProperty: "InvoiceDate",
             width:"100px",
             resizable:false
    		 }));
    	
    	oOutPayDetCashTable.addColumn(new sap.ui.table.Column({
    		label: new sap.ui.commons.Label({text: "Unit Type"}),
            template: new sap.ui.commons.TextView().bindProperty("text", "UnitType"),
            sortProperty: "UnitType",
            filterProperty: "UnitType",
            width:"100px",
            resizable:false
       	 }));
       	 
    	var oQtyCol = new sap.ui.table.Column({
       		label: new sap.ui.commons.Label({text: "Quantity",}),
       		 template: new sap.ui.commons.TextView().bindProperty("text", "Quantity"),
                sortProperty: "Quantity",
                filterProperty: "Quantity",
                width:"90px",
                resizable:false
       		 });
    	var oUtil = new utility();
    	oOutPayDetCashTable.addColumn(oQtyCol);
		oUtil.addColumnSorterAndFilter(oQtyCol, oUtil.compareUptoCount);
		
		
    	var oUPCol = new sap.ui.table.Column({
       		label: new sap.ui.commons.Label({text: "Unit Price",}),
       		 template: new sap.ui.commons.TextView().bindProperty("text", "UnitPrice"),
                sortProperty: "UnitPrice",
                filterProperty: "UnitPrice",
                width:"80px",
                resizable:false
       		 });
    	oOutPayDetCashTable.addColumn(oUPCol);
		oUtil.addColumnSorterAndFilter(oUPCol, oUtil.compareUptoCount);
		
		
    	var oAmountCol = new sap.ui.table.Column({
       		label: new sap.ui.commons.Label({text: "Amount",}),
       		 template: new sap.ui.commons.TextView().bindProperty("text", "Amount"),
                sortProperty: "Amount",
                filterProperty: "Amount",
                width:"100px",
                resizable:false
       		 });
    	oOutPayDetCashTable.addColumn(oAmountCol);
		oUtil.addColumnSorterAndFilter(oAmountCol, oUtil.compareUptoCount);
		
		
    	oOutPayDetCashTable.addColumn(new sap.ui.table.Column({
       		label: new sap.ui.commons.Label({text: "Tax",}),
       		 template: new sap.ui.commons.TextView().bindProperty("text", "Tax"),
                sortProperty: "Tax",
                filterProperty: "Tax",
                width:"100px",
                resizable:false
       		 }));
    	oOutPayDetCashTable.addColumn(oAmountCol);
		oUtil.addColumnSorterAndFilter(oAmountCol, oUtil.compareUptoCount);
		
    	oOutPayDetCashTable.addColumn(new sap.ui.table.Column({
       		label: new sap.ui.commons.Label({text: "Currency"}),
       		 template: new sap.ui.commons.TextView().bindProperty("text", "Currency"),
                sortProperty: "Currency",
                filterProperty: "Currency",
                width:"80px",
                resizable:false
       		 }));
   
    	 var oLabelTblTitle = new sap.ui.commons.Label({text: "Outstanding Payments Details - Cash Customers",
    			layoutData: new sap.ui.layout.GridData({span: "L8 M8 S8",linebreak: true, margin: false}),
                wrapping: true}).addStyleClass("font15Bold marginTop10");
     	 
    	
    	// Responsive Grid Layout
	    var oOutPayDetCashLayout = new sap.ui.layout.form.ResponsiveGridLayout("idOutPayDetCashLayout");
   	 
		  // Online Form Starts
		     var oOutPayDetCashForm = new sap.ui.layout.form.Form("idOutPayDetCashForm",{
		             layout: oOutPayDetCashLayout,
		             formContainers: [
		                     
		                     new sap.ui.layout.form.FormContainer("idOutPayDetCashFormC1",{
		                             //title: "Outstanding Payments Details - Cash Customers",
		                             formElements: [
													new sap.ui.layout.form.FormElement({
													    fields: [backToOutPayCash]
													}),
													new sap.ui.layout.form.FormElement({
													    fields: [oLabelTblTitle]
													}),
													new sap.ui.layout.form.FormElement({
													    fields: [oOutPayDetCashTable]
													}),
													
													new sap.ui.layout.form.FormElement({
													    fields: [oBtnViewAllOutstandingPayCashDet]
													})
		                                     ]
		                     })                    
		             ]
		     });
		     sap.ui.getCore().byId("idOutPayDetCashFlxBox").addItem(oOutPayDetCashForm);
		     	//return oOutPayDetCashForm;
	},
	
	bindOutPayCashDetails: function(){
		var vOutPayCashDetTbl = sap.ui.getCore().byId("idOutPayCashDetTbl");
		aOutstandingPayCashDetData =  jQuery.grep(aOutstndingPay, function(element, index){
            return element.DtlFlag == "X" && element.InvoiceNo == selInvPayCash;
    	});
    	//Create a model and bind the table rows to this model
    	var oModelOutPayCashDet = new sap.ui.model.json.JSONModel();
    	oModelOutPayCashDet.setData({modelData: aOutstandingPayCashDetData});
    	vOutPayCashDetTbl.setModel(oModelOutPayCashDet);
    	vOutPayCashDetTbl.bindRows("/modelData");
    	oModelOutPayCashDet.updateBindings();
    	var vDetLen = aOutstandingPayCashDetData.length;
    	if (vDetLen < 25){
    		vOutPayCashDetTbl.setVisibleRowCount(vDetLen);
    		vOutPayCashDetTbl.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
    		 sap.ui.getCore().byId("idBtnViewAllOutstandingPayCashDet").setVisible(false);
    	}
    	else{
    		vOutPayCashDetTbl.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
    		vOutPayCashDetTbl.setVisibleRowCount(25);
    		 sap.ui.getCore().byId("idBtnViewAllOutstandingPayCashDet").setVisible(true);
    	}
    	
    	 var browser = sap.ui.Device.browser.chrome;
    	 if(browser){
    		 sap.ui.getCore().byId("idOutPayCashDetTbl").setWidth("70%");
    	 }
    	 else{
    		 sap.ui.getCore().byId("idOutPayCashDetTbl").setWidth("100%");
    	 }
	}
});
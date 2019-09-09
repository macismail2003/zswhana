
sap.ui.model.json.JSONModel.extend("outPayDetCreditView", {
	
	createOutPayDetCredit:function(){
		var oFlexboxOutPayDetCredit = new sap.m.FlexBox("idOutPayDetCreditFlxBox",{
            items: [],
           // direction: "Row"
		  });
		
		return oFlexboxOutPayDetCredit;
	},
	
	createOutPayDetCreditFormView: function(){
		sap.ui.getCore().byId("idOutPayDetCreditFlxBox").destroyItems();
		 var backToOutPayCredit = new sap.m.Link("idBackToOutPayCredit", {text: " < Back",
	       	  width:"7%",
	       	  wrapping:true,
	       	  press: function(){
	       		  var bus = sap.ui.getCore().getEventBus();
	       			bus.publish("nav", "back");
	      	  }});
		 
		// Buttons
		var oBtnViewAllOutstandingPayCreditDet = new sap.m.Button("idBtnViewAllOutstandingPayCreditDet",{
            text : "View All",
            styled:false,
	        width:"80px",
            press:function(){
            	this.setVisible(false);
	        	var vArrayLength = aOutstandingPayCreditDetData.length;
	        	if(vArrayLength < 100){
	        		sap.ui.getCore().byId("idOutPayCreditDetTbl").setVisibleRowCount(vArrayLength);
	        		sap.ui.getCore().byId("idOutPayCreditDetTbl").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
	        	}
	        	else{
	        		sap.ui.getCore().byId("idOutPayCreditDetTbl").setVisibleRowCount(100);
	        		sap.ui.getCore().byId("idOutPayCreditDetTbl").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
	        	}
	          }
         }).addStyleClass("submitBtn marginTop10");
		
	 // Table
    	var oOutPayDetCreditTable = new sap.ui.table.Table("idOutPayCreditDetTbl",{
    		visibleRowCount: 2,
            firstVisibleRow: 3,
            columnHeaderHeight: 45,
            selectionMode: sap.ui.table.SelectionMode.None,
            navigationMode: sap.ui.table.NavigationMode.Paginator,
           // width: "70%",
            height:"100%"
    	 }).addStyleClass("tblBorder marginTop10");
    	
    	// Table Columns
    	oOutPayDetCreditTable.addColumn(new sap.ui.table.Column({
    		label: new sap.ui.commons.Label({text: "Invoice"}),
   		 template: new sap.ui.commons.TextView().bindProperty("text", "InvoiceNo"),
            sortProperty: "InvoiceNo",
            filterProperty: "InvoiceNo",
            width:"80px",
            resizable:false
   		 }));
    	 
    	oOutPayDetCreditTable.addColumn(new sap.ui.table.Column({
    		label: new sap.ui.commons.Label({text: "Invoice Date",}),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "InvoiceDate"),
             sortProperty: "InvDateActual",
             filterProperty: "InvoiceDate",
             width:"110px",
             resizable:false
    		 }));
    	
    	oOutPayDetCreditTable.addColumn(new sap.ui.table.Column({
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
    	oOutPayDetCreditTable.addColumn(oQtyCol);
		oUtil.addColumnSorterAndFilter(oQtyCol, oUtil.compareUptoCount);
		
    	var oUPCol = new sap.ui.table.Column({
       		label: new sap.ui.commons.Label({text: "Unit Price",}),
       		 template: new sap.ui.commons.TextView().bindProperty("text", "UnitPrice"),
                sortProperty: "UnitPrice",
                filterProperty: "UnitPrice",
                width:"100px",
                resizable:false
       		 });
    	oOutPayDetCreditTable.addColumn(oUPCol);
		oUtil.addColumnSorterAndFilter(oUPCol, oUtil.compareUptoCount);
		
    	var oAmountCol = new sap.ui.table.Column({
       		label: new sap.ui.commons.Label({text: "Amount",}),
       		 template: new sap.ui.commons.TextView().bindProperty("text", "Amount"),
                sortProperty: "Amount",
                filterProperty: "Amount",
                width:"100px",
                resizable:false
    	});
    	oOutPayDetCreditTable.addColumn(oAmountCol);
		oUtil.addColumnSorterAndFilter(oAmountCol, oUtil.compareUptoCount);
		
    	var oTaxCol = new sap.ui.table.Column({
       		label: new sap.ui.commons.Label({text: "Tax",}),
       		 template: new sap.ui.commons.TextView().bindProperty("text", "Tax"),
                sortProperty: "Tax",
                filterProperty: "Tax",
                width:"80px",
                resizable:false
       		 });
    	oOutPayDetCreditTable.addColumn(oTaxCol);
		oUtil.addColumnSorterAndFilter(oTaxCol, oUtil.compareUptoCount);
		
    	oOutPayDetCreditTable.addColumn(new sap.ui.table.Column({
       		label: new sap.ui.commons.Label({text: "Currency"}),
       		 template: new sap.ui.commons.TextView().bindProperty("text", "Currency"),
                sortProperty: "Currency",
                filterProperty: "Currency",
                width:"80px",
                resizable:false
       		 }));
   
    	 var oLabelTblTitle = new sap.ui.commons.Label({text: "Outstanding Payments Details - Credit Customers",
    			layoutData: new sap.ui.layout.GridData({span: "L8 M8 S8",linebreak: true, margin: false}),
                wrapping: true}).addStyleClass("font15Bold marginTop10");
    	 
    	// Responsive Grid Layout
	    var oOutPayDetCreditLayout = new sap.ui.layout.form.ResponsiveGridLayout("idOutPayDetCreditLayout");
   	 
		  // Online Form Starts
		     var oOutPayDetCreditForm = new sap.ui.layout.form.Form("idOutPayDetCreditForm",{
		             layout: oOutPayDetCreditLayout,
		             formContainers: [
		                     
		                     new sap.ui.layout.form.FormContainer("idOutPayDetCreditFormC1",{
		                             //title: "Outstanding Payments Details - Credit Customers",
		                             formElements: [
													new sap.ui.layout.form.FormElement({
													    fields: [backToOutPayCredit]
													}),
													new sap.ui.layout.form.FormElement({
													    fields: [oLabelTblTitle]
													}),
													new sap.ui.layout.form.FormElement({
													    fields: [oOutPayDetCreditTable]
													}),
													
													new sap.ui.layout.form.FormElement({
													    fields: [oBtnViewAllOutstandingPayCreditDet]
													})
		                                     ]
		                     })                    
		             ]
		     });
		     var browser = sap.ui.Device.browser.chrome;
			 if(browser){
				 sap.ui.getCore().byId("idOutPayCreditDetTbl").setWidth("70%");
			 }
			 else{
				 sap.ui.getCore().byId("idOutPayCreditDetTbl").setWidth("");
			 }
			 
		     sap.ui.getCore().byId("idOutPayDetCreditFlxBox").addItem(oOutPayDetCreditForm);
		     	//return oOutPayDetCreditForm;
	},
	
	bindOutPayCreditDetails: function(){
		var vOutPayCreditTbl = sap.ui.getCore().byId("idOutPayCreditDetTbl");
		aOutstandingPayCreditDetData =  jQuery.grep(aOutstndingPay, function(element, index){
            return element.DtlFlag == "X" && element.InvoiceNo == selInvPayCredit;
    	});
    	//Create a model and bind the table rows to this model
    	var oModelOutPayCreditDet = new sap.ui.model.json.JSONModel();
    	oModelOutPayCreditDet.setData({modelData: aOutstandingPayCreditDetData});
    	vOutPayCreditTbl.setModel(oModelOutPayCreditDet);
    	vOutPayCreditTbl.bindRows("/modelData");
    	oModelOutPayCreditDet.updateBindings();
    	var vDetLen = aOutstandingPayCreditDetData.length;
    	if (vDetLen < 25){
    		vOutPayCreditTbl.setVisibleRowCount(vDetLen);
    		vOutPayCreditTbl.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
    		 sap.ui.getCore().byId("idBtnViewAllOutstandingPayCreditDet").setVisible(false);
    	}
    	else{
    		vOutPayCreditTbl.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
    		vOutPayCreditTbl.setVisibleRowCount(25);
    		 sap.ui.getCore().byId("idBtnViewAllOutstandingPayCreditDet").setVisible(true);
    	}
    	
    	 var browser = sap.ui.Device.browser.chrome;
    	 if(browser){
    		 sap.ui.getCore().byId("idOutPayCreditDetTbl").setWidth("70%");
    	 }
    	 else{
    		 sap.ui.getCore().byId("idOutPayCreditDetTbl").setWidth("100%");
    	 }
	}
});
/******** NP *******/
jQuery.sap.require("sap.ui.model.json.JSONModel");

var aOutstandingPayCashSummData = [];
var aOutstandingPayCashDetData = [];
var selInvPayCash = "";

sap.ui.model.json.JSONModel.extend("outPayCashView", {
	
	createOutPayCash: function(){
		var oBtnViewAllOutstandingPayCash = new sap.m.Button("idBtnViewAllOutstandingPayCash",{
            text : "View All",
            styled:false,
	        //width:"80px",
            press:function(){
            	this.setVisible(false);
	        	var vArrayLength = aOutstandingPayCashSummData.length;
	        	if(vArrayLength < 100){
	        		sap.ui.getCore().byId("idOutPayCashTbl").setVisibleRowCount(vArrayLength);
	        		sap.ui.getCore().byId("idOutPayCashTbl").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
	        	}
	        	else{
	        		sap.ui.getCore().byId("idOutPayCashTbl").setVisibleRowCount(100);
	        		sap.ui.getCore().byId("idOutPayCashTbl").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
	        	}
	          }
         }).addStyleClass("submitBtn marginTop10");
		
	 // Table
    	var oOutPayCashTable = new sap.ui.table.Table("idOutPayCashTbl",{
    		visibleRowCount: 2,
            firstVisibleRow: 3,
            columnHeaderHeight: 30,
            fixedColumnCount:1,
            selectionMode: sap.ui.table.SelectionMode.None,
            navigationMode: sap.ui.table.NavigationMode.Paginator,
            width: "60%",
            height:"100%"
    	 }).addStyleClass("tblBorder marginTop10");
    	
    	// Table Columns
    	oOutPayCashTable.addColumn(new sap.ui.table.Column({
    		label: new sap.ui.commons.Label({text: "Invoice"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.Link({
					press : function() {
						selInvPayCash = this.getText();
						var bus = sap.ui.getCore().getEventBus();
						bus.publish("nav", "to", {
							id : "OutPayDetailsCash"
						}); 
						var oOutPayCashDet = new outPayDetCashView();
						oOutPayCashDet.createOutPayDetCashFormView();
						oOutPayCashDet.bindOutPayCashDetails();
					}
				}).bindProperty("text", "InvoiceNo"),
			         sortProperty: "InvoiceNo",
			         filterProperty: "InvoiceNo",
			         width:"120px",
			         resizable:false
					 }));
    	 
    	var oAmountCol = new sap.ui.table.Column({
    		label: new sap.ui.commons.Label({text: "Amount"}).addStyleClass("wraptextcol"),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "Amount"),
             sortProperty: "Amount",
             filterProperty: "Amount",
             width:"90px",
	         resizable:false
    		 });
    	var oUtil = new utility();
    	oOutPayCashTable.addColumn(oAmountCol);
		oUtil.addColumnSorterAndFilter(oAmountCol, oUtil.compareUptoCount);
		
    	oOutPayCashTable.addColumn(new sap.ui.table.Column({
    		label: new sap.ui.commons.Label({text: "Currency"}).addStyleClass("wraptextcol"),
            template: new sap.ui.commons.TextView().bindProperty("text", "Currency"),
            sortProperty: "Currency",
            filterProperty: "Currency",
            width:"60px",
	        resizable:false
       	 }));
       	 
    	oOutPayCashTable.addColumn(new sap.ui.table.Column({
       		label: new sap.ui.commons.Label({text: "Bill Date"}).addStyleClass("wraptextcol"),
       		 template: new sap.ui.commons.TextView().bindProperty("text", "BillDate"),
                sortProperty: "BillDateActual",
                filterProperty: "BillDate",
                width:"70px",
		         resizable:false
       		 }));
   
    	 var oLabelTblTitle = new sap.ui.commons.Label({text: "Outstanding Payments - Cash Customers",
    			layoutData: new sap.ui.layout.GridData({span: "L8 M8 S8",linebreak: true, margin: false}),
                wrapping: true}).addStyleClass("font15Bold marginTop10");
     	 
    	/* var oFlexBoxForm = new sap.m.FlexBox("idPayCashFlex",{
     	      items: [
     	        oLabelTblTitle,oOutPayCashTable,
     	       oBtnViewAllOutstandingPayCash
     	      ],
     	      direction: "Column",
     	    }); */
    	// Responsive Grid Layout
	    var oOutPayCashLayout = new sap.ui.layout.form.ResponsiveGridLayout("idOutPayCashLayout");
   	 
		  // Online Form Starts
		     var oOutPayCashForm = new sap.ui.layout.form.Form("idOutPayCashForm",{
		             layout: oOutPayCashLayout,
		             formContainers: [
		                     
		                     new sap.ui.layout.form.FormContainer("idOutPayCashFormC1",{
		                           //  title: "Outstanding Payments - Cash Customers",
		                             formElements: [
													
													new sap.ui.layout.form.FormElement({
													    fields: [oLabelTblTitle]
													}),
													new sap.ui.layout.form.FormElement({
													    fields: [oOutPayCashTable]
													}),
													
													new sap.ui.layout.form.FormElement({
													    fields: [oBtnViewAllOutstandingPayCash]
													})
		                                     ]
		                     })                    
		             ]
		     }).addStyleClass("marginTop10");
		     
		   //change index to 0 after security is applied
		     var oSaleInvFormElement = sap.ui.getCore().byId("idOutPayViewFlex");
				oSaleInvFormElement.insertField(oOutPayCashForm,0);
		    // sap.ui.getCore().byId("idOutPayViewFlex").addItem(oOutPayCashForm);
		     	//return oOutPayCashForm;
	},
	
	bindOutPayCash: function(){
	    	 
		aOutstandingPayCashSummData =  jQuery.grep(aOutstndingPay, function(element, index){
            return element.SumFlag == "X";
		});
		var OutPayCashSumTbl = sap.ui.getCore().byId("idOutPayCashTbl");
		var sumLen = aOutstandingPayCashSummData.length;
		
		//Create a model and bind the table rows to this model
    	var oModelOutPayCash = new sap.ui.model.json.JSONModel();
    	oModelOutPayCash.setData({modelData: aOutstandingPayCashSummData});
    	OutPayCashSumTbl.setModel(oModelOutPayCash);
    	OutPayCashSumTbl.bindRows("/modelData");
    	if (sumLen < 25){
    		OutPayCashSumTbl.setVisibleRowCount(sumLen);
    		OutPayCashSumTbl.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
    		 sap.ui.getCore().byId("idBtnViewAllOutstandingPayCash").setVisible(false);
    	}
    	else{
    		OutPayCashSumTbl.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
    		OutPayCashSumTbl.setVisibleRowCount(25);
    		 sap.ui.getCore().byId("idBtnViewAllOutstandingPayCash").setVisible(true);
    	}
	}
});
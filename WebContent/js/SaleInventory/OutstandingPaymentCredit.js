var aOutstandingPayCreditSummData = [];
var aOutstandingPayCreditDetData = [];
var selInvPayCredit = "";
sap.ui.model.json.JSONModel.extend("outPayCreditView", {
	
	createOutPayCredit: function(){
		
		// Buttons
		var oBtnViewAllOutstandingPayCredit = new sap.m.Button("idBtnViewAllOutstandingPayCredit",{
            text : "View All",
            styled:false,
	        width:"80px",
            press:function(){
            	this.setVisible(false);
	        	var vArrayLength = aOutstandingPayCreditSummData.length;
	        	if(vArrayLength < 100){
	        		sap.ui.getCore().byId("idOutPayCreditTbl").setVisibleRowCount(vArrayLength);
	        		sap.ui.getCore().byId("idOutPayCreditTbl").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
	        	}
	        	else{
	        		sap.ui.getCore().byId("idOutPayCreditTbl").setVisibleRowCount(100);
	        		sap.ui.getCore().byId("idOutPayCreditTbl").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
	        	}
	          }
         }).addStyleClass("submitBtn marginTop10");
		
	 // Table
    	var oOutPayCreditTable = new sap.ui.table.Table("idOutPayCreditTbl",{
    		visibleRowCount: 2,
            firstVisibleRow: 3,
            columnHeaderHeight: 45,
            fixedColumnCount:1,
            selectionMode: sap.ui.table.SelectionMode.None,
            navigationMode: sap.ui.table.NavigationMode.Paginator,
            width: "60%",
            height:"100%"
    	 }).addStyleClass("tblBorder marginTop10");
    	
    	// Table Columns
    	oOutPayCreditTable.addColumn(new sap.ui.table.Column({
    		label: new sap.ui.commons.Label({text: "Invoice"}),
    		template: new sap.ui.commons.Link({
				press : function() {
					selInvPayCredit = this.getText();
					var bus = sap.ui.getCore().getEventBus();
					bus.publish("nav", "to", {
						id : "OutPayDetailsCredit"
					}); 
					var oOutPayCreditDet = new outPayDetCreditView();
					oOutPayCreditDet.createOutPayDetCreditFormView();
					oOutPayCreditDet.bindOutPayCreditDetails();
				}
		 }).bindProperty("text", "InvoiceNo"),
         sortProperty: "InvoiceNo",
         filterProperty: "InvoiceNo",
         width:"120px",
         resizable:false
		 }));
    	 
    	var oAmountCol = new sap.ui.table.Column({
    		label: new sap.ui.commons.Label({text: "Amount",}),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "Amount"),
             sortProperty: "Amount",
             filterProperty: "Amount",
             width:"90px",
	         resizable:false
    		 });
    	var oUtil = new utility();
    	oOutPayCreditTable.addColumn(oAmountCol);
		oUtil.addColumnSorterAndFilter(oAmountCol, oUtil.compareUptoCount);
		
    	oOutPayCreditTable.addColumn(new sap.ui.table.Column({
    		label: new sap.ui.commons.Label({text: "Currency"}),
            template: new sap.ui.commons.TextView().bindProperty("text", "Currency"),
            sortProperty: "Currency",
            filterProperty: "Currency",
            width:"80px",
	         resizable:false
       	 }));
       	 
    	oOutPayCreditTable.addColumn(new sap.ui.table.Column({
       		label: new sap.ui.commons.Label({text: "Due Date"}),
       		 template: new sap.ui.commons.TextView().bindProperty("text", "DueDate"),
                sortProperty: "DueDateActual",
                filterProperty: "DueDate",
                width:"100px",
		         resizable:false
       		 }));
       	
    	var oDaysCol = new sap.ui.table.Column({
       		label: new sap.ui.commons.Label({text: "Days Overdue"}),
            template: new sap.ui.commons.TextView().bindProperty("text", "DaysOverdue"),
            sortProperty: "DaysOverdue",
            filterProperty: "DaysOverdue",
            width:"100px",
	         resizable:false
       	 });
    	oOutPayCreditTable.addColumn(oDaysCol);
		oUtil.addColumnSorterAndFilter(oDaysCol, oUtil.compareUptoCount);
		
    	 var oLabelTblTitle = new sap.ui.commons.Label({text: "Outstanding Payments - Credit Customers",
   			layoutData: new sap.ui.layout.GridData({span: "L8 M8 S8",linebreak: true, margin: false}),
               wrapping: true}).addStyleClass("font15Bold marginTop10");
    	 
    	/* var oFlexBoxForm = new sap.m.FlexBox("idPayCreditFlex",{
      	      items: [
      	        oLabelTblTitle,oOutPayCreditTable,
      	      oBtnViewAllOutstandingPayCredit
      	      ],
      	      direction: "Column",
      	    });*/
    	 
    	// Responsive Grid Layout
	    var oOutPayCreditLayout = new sap.ui.layout.form.ResponsiveGridLayout("idOutPayCreditLayout");
   	 
		  // Online Form Starts
		     var oOutPayCreditForm = new sap.ui.layout.form.Form("idOutPayCreditForm",{
		             layout: oOutPayCreditLayout,
		             formContainers: [
		                     
		                     new sap.ui.layout.form.FormContainer("idOutPayCreditFormC1",{
		                            // title: "Outstanding Payments - Credit Customers",  
		                             formElements: [
													new sap.ui.layout.form.FormElement({
													    fields: [oLabelTblTitle]
													}),
													new sap.ui.layout.form.FormElement({
													    fields: [oOutPayCreditTable]
													}),
													
													new sap.ui.layout.form.FormElement({
													    fields: [oBtnViewAllOutstandingPayCredit]
													})
		                                     ]
		                     })                    
		             ]
		     }).addStyleClass("marginTop10");
		     
		     //change index to 0 after security is applied   
		     var oSaleInvFormElement = sap.ui.getCore().byId("idOutPayViewFlex");
		    
		     
				oSaleInvFormElement.insertField(oOutPayCreditForm,0);
		    // sap.ui.getCore().byId("idOutPayViewFlex").addItem(oOutPayCreditForm);
		     	//return oOutPayCreditForm;
	},
	
	bindOutPayCredit: function(){
		 
		aOutstandingPayCreditSummData =  jQuery.grep(aOutstndingPay, function(element, index){
            return element.SumFlag == "X";
		});
		var OutPayCreditSumTbl = sap.ui.getCore().byId("idOutPayCreditTbl");
		var sumLen = aOutstandingPayCreditSummData.length;
		
		//Create a model and bind the table rows to this model
    	var oModelOutPayCredit = new sap.ui.model.json.JSONModel();
    	oModelOutPayCredit.setData({modelData: aOutstandingPayCreditSummData});
    	OutPayCreditSumTbl.setModel(oModelOutPayCredit);
    	OutPayCreditSumTbl.bindRows("/modelData");
    	if (sumLen < 25){
    		OutPayCreditSumTbl.setVisibleRowCount(sumLen);
    		OutPayCreditSumTbl.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
    		 sap.ui.getCore().byId("idBtnViewAllOutstandingPayCredit").setVisible(false);
    	}
    	else{
    		OutPayCreditSumTbl.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
    		OutPayCreditSumTbl.setVisibleRowCount(25);
    		 sap.ui.getCore().byId("idBtnViewAllOutstandingPayCredit").setVisible(true);
    	}
	}
});
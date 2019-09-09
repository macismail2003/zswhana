
sap.ui.model.json.JSONModel.extend("outstandingRelDetailsView", {
	
	createOutstandingRelDetails:function(){
		var oFlexboxOutRelDet = new sap.m.FlexBox("idOutRelDetFlxBox",{
            items: [],
            direction: "Row"
		  });
		
		return oFlexboxOutRelDet;
	},
	
	createOutstandingRelDetailsFormView: function(){
		sap.ui.getCore().byId("idOutRelDetFlxBox").destroyItems();
		 var backToOutRelSum = new sap.m.Link("idBackToOutRelSum", {text: " < Back",
	       	  width:"7%",
	       	  wrapping:true,
	       	  press: function(){
	       		  var bus = sap.ui.getCore().getEventBus();
	       			bus.publish("nav", "back");
	      	  }});
		 
		// Buttons
		var oBtnViewAll = new sap.m.Button("idOutRelDetBtnViewAll",{
            text : "View All",
            styled:false,
	        width:"80px",
	        press:function(){
            	this.setVisible(false);
	        	var vArrayLength = aOutstandingRelDetailData.length;
	        	if(vArrayLength < 100){
	        		sap.ui.getCore().byId("idOutRelDetTblSI").setVisibleRowCount(vArrayLength);
	        		sap.ui.getCore().byId("idOutRelDetTblSI").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
	        	}
	        	else{
	        		sap.ui.getCore().byId("idOutRelDetTblSI").setVisibleRowCount(100);
	        		sap.ui.getCore().byId("idOutRelDetTblSI").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
	        	}
	          }
         }).addStyleClass("submitBtn marginTop10");
		
		// Flex Box
	   	var oFlexBoxViewAll = new sap.m.FlexBox({
	  		  items: [
	  		          oBtnViewAll
	     		  ],
	     		  direction: "Row"
	     		}); 
		
	 // Table
    	var oOutRelDetailsTable = new sap.ui.table.Table("idOutRelDetTblSI",{
    		visibleRowCount: 3,
            firstVisibleRow: 3,
            columnHeaderHeight: 45,
            selectionMode: sap.ui.table.SelectionMode.None,
            navigationMode: sap.ui.table.NavigationMode.Paginator,
            width: "100%",
            height:"100%"
    	 }).addStyleClass("tblBorder marginTop10");
    	
    	// Table Columns
    	oOutRelDetailsTable.addColumn(new sap.ui.table.Column({
    		label: new sap.ui.commons.Label({text: "Release Number"}).addStyleClass("wraptextcol"),
	         template: new sap.ui.commons.TextView().bindProperty("text", "Releaseno"),
	         sortProperty: "Releaseno",
	         filterProperty: "Releaseno",
	         width:"130px",
	         resizable:false
	    	 }));
    	 
    	oOutRelDetailsTable.addColumn(new sap.ui.table.Column({
    		label: new sap.ui.commons.Label({text: "Unit Type"}).addStyleClass("wraptextcol"),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "ItemDesc"),
             sortProperty: "ItemDesc",
             filterProperty: "ItemDesc",
             width:"140px",
	         resizable:false
    		 }));
    	
    	oOutRelDetailsTable.addColumn(new sap.ui.table.Column({
    		label: new sap.ui.commons.Label({text: "Location"}).addStyleClass("wraptextcol"),
            template: new sap.ui.commons.TextView().bindProperty("text", "Location"),
            sortProperty: "Location",
            filterProperty: "Location",
            width:"140px",
	         resizable:false
       	 }));
       	 
    	oOutRelDetailsTable.addColumn(new sap.ui.table.Column({
       		label: new sap.ui.commons.Label({text: "Depot Name"}).addStyleClass("wraptextcol"),
       		 template: new sap.ui.commons.TextView().bindProperty("text", "Depotname"),
                sortProperty: "Depotname",
                filterProperty: "Depotname",
                width:"150px",
   	         resizable:false
       		 }));
       	
    	var oTotalCol= new sap.ui.table.Column({
       		label: new sap.ui.commons.Label({text: "Total Quantity"}).addStyleClass("wraptextcol"),
            template: new sap.ui.commons.TextView().bindProperty("text", "TotalQty"),
            sortProperty: "TotalQty",
            filterProperty: "TotalQty",
            width:"100px",
	         resizable:false
       	 });
    	var oUtil = new utility();
    	oOutRelDetailsTable.addColumn(oTotalCol);
		oUtil.addColumnSorterAndFilter(oTotalCol, oUtil.compareUptoCount);
		
		var oQtyPickCol = new sap.ui.table.Column({
       		label: new sap.ui.commons.Label({text: "Picked Quantity"}).addStyleClass("wraptextcol"),
            template: new sap.ui.commons.TextView().bindProperty("text", "PickedQty"),
            sortProperty: "PickedQty",
            filterProperty: "PickedQty",
            width:"120px",
	         resizable:false
       	 });
    	oOutRelDetailsTable.addColumn(oQtyPickCol);
		oUtil.addColumnSorterAndFilter(oQtyPickCol, oUtil.compareUptoCount);
		
		var oQtyOutCol = new sap.ui.table.Column({
       		label: new sap.ui.commons.Label({text: "Outstanding Quantity"}).addStyleClass("wraptextcol"),
            template: new sap.ui.commons.TextView().bindProperty("text", "OutQty"),
            sortProperty: "OutQty",
            filterProperty: "OutQty",
            width:"150px",
	         resizable:false
       	 });
    	oOutRelDetailsTable.addColumn(oQtyOutCol);
		oUtil.addColumnSorterAndFilter(oQtyOutCol, oUtil.compareUptoCount);
		
    	oOutRelDetailsTable.addColumn(new sap.ui.table.Column({
       		label: new sap.ui.commons.Label({text: "Expiry Date"}).addStyleClass("wraptextcol"),
            template: new sap.ui.commons.TextView().bindProperty("text", "ExpiryDate"),
            sortProperty: "ExpiryDate",
            filterProperty: "ExpiryDate",
            width:"100px",
	         resizable:false
       	 }));
    	
    	 var oLabelTblTitle = new sap.ui.commons.Label({text: "Outstanding Release Details",
   			layoutData: new sap.ui.layout.GridData({span: "L7 M7 S4",linebreak: true, margin: false}),
         wrapping: true}).addStyleClass("font15Bold marginTop10");
    	 
    	// Responsive Grid Layout
	    var oOutReleaseDetLayout = new sap.ui.layout.form.ResponsiveGridLayout("idOutReleaseDetLayout");
   	 
		  // Online Form Starts
		     var oOutReleaseDetForm = new sap.ui.layout.form.Form("idOutReleaseDetForm",{
		             layout: oOutReleaseDetLayout,
		             formContainers: [

		                     new sap.ui.layout.form.FormContainer("idOutReleaseDetFormC1",{
		                            // title: "Outstanding Release Details",
		                             formElements: [
													new sap.ui.layout.form.FormElement({
													    fields: [backToOutRelSum]
													}),
													new sap.ui.layout.form.FormElement({
													    fields: [oLabelTblTitle]
													}),
													new sap.ui.layout.form.FormElement({
													    fields: [oOutRelDetailsTable]
													}),
													
													new sap.ui.layout.form.FormElement({
													    fields: [oBtnViewAll]
													})
		                                     ]
		                     })                    
		             ]
		     });
		     
		     sap.ui.getCore().byId("idOutRelDetFlxBox").addItem(oOutReleaseDetForm);
		     	//return oOutReleaseDetForm;
	},
	
	bindOutRelDetails: function(){
		var vOutRelDetTbl = sap.ui.getCore().byId("idOutRelDetTblSI");
		aOutstandingRelDetailData =  jQuery.grep(aOutstandingRelAllData, function(element, index){
            return element.Flag2 == "X" && element.Releaseno == selRelNoOutRelSI;
    	});
    	//Create a model and bind the table rows to this model
    	var oModelOutReleaseDet = new sap.ui.model.json.JSONModel();
    	oModelOutReleaseDet.setData({modelData: aOutstandingRelDetailData});
    	vOutRelDetTbl.setModel(oModelOutReleaseDet);
    	vOutRelDetTbl.bindRows("/modelData");
    	oModelOutReleaseDet.updateBindings();
    	var vDetLen = aOutstandingRelDetailData.length;
    	if (vDetLen < 25){
    		vOutRelDetTbl.setVisibleRowCount(vDetLen);
    		vOutRelDetTbl.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
    		 sap.ui.getCore().byId("idOutRelDetBtnViewAll").setVisible(false);
    	}
    	else{
    		vOutRelDetTbl.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
    		vOutRelDetTbl.setVisibleRowCount(25);
    		 sap.ui.getCore().byId("idOutRelDetBtnViewAll").setVisible(true);
    	}
	}
});
/******** NP *******/
jQuery.sap.require("sap.ui.model.json.JSONModel");

var pdfFileNameFD = "Depot Information";
var arrFDExpToPDF = [];
var oCurrDepInfExpFDPD = this;

sap.ui.model.json.JSONModel.extend("depInfoExportView", {
	
	createDepInfoExport: function(){
		
		var bckFrmDepInfExprtToInScrnPDFD = new sap.m.Link("idBckFrmDepInfExprtToInScrnPDFD", {
			text: " < Back",
            width:"9%",
            wrapping:true,
            press: function(){
                    var bus = sap.ui.getCore().getEventBus();
                    bus.publish("nav", "back");
            }});
		
		var oLblFDPDDepInfoExprt = new sap.ui.commons.Label("idLblFDPDDepInfoExprt",{
			text: "Depot Information",
            wrapping: true}).addStyleClass("marginTop10 sapUiFormTitle");
		
		// Buttons
		var oBtnDepInfoExport = new sap.m.Button({
            text : "Export To PDF",
            type:sap.m.ButtonType.Unstyled,
            icon: sap.ui.core.IconPool.getIconURI("pdf-attachment"),
            press:function(){
                  //alert("Export to PDF");
	                  var colWidthArr = [1.5, 3];
		        	  //arrColmnName =['Serial No.','Unit No.','Last Clean Date','Hours','Cargo Desc.','Clean Process Desc.','Status']; //COLUMN NAME
		              var verticalOffset = 1.25; 
		              generatePDFDepInfoFD(arrFDExpToPDF,colWidthArr,verticalOffset);
            }
         }).addStyleClass("submitBtn marginTop10");
		
		// Flex Boxes
		var oFlexButton = new sap.m.FlexBox({
           items: [
                   oBtnDepInfoExport
           ],
           width:"40%",
           direction : sap.m.FlexDirection.RowReverse
			});
		
		var oFlexBTitleFDPD = new sap.m.FlexBox({
	           items: [
	                   oLblFDPDDepInfoExprt
	           ],
	           width:"60%",
	           direction : "Row"
				});
		
		var oFlexButtonTitleFD = new sap.m.FlexBox({
	           items: [
						oFlexBTitleFDPD,
						oFlexButton
	           ],
	           direction : "Row",
	           width:"100%"
				});
		
		// Responsive Grid Layout
	    var oDepotInfoExpLayout = new sap.ui.layout.form.ResponsiveGridLayout("idDepotInfoExpLayout",{
	    	 emptySpanL: 0,
	          emptySpanM: 0,
	          emptySpanS: 0,  
			  labelSpanL: 1,
	          labelSpanM: 1,
	          labelSpanS: 1,
	          columnsL: 2,
	          columnsM: 2,
	          columnsS: 1,
	          breakpointL: 765,
			  breakpointM: 320
	    });
   	 
		  // Online Form Starts
		     var oDepotInfoExpForm = new sap.ui.layout.form.Form("idDepotInfoExpForm",{
		             layout: oDepotInfoExpLayout,
		             formContainers: [
		                     
		                     new sap.ui.layout.form.FormContainer("idDepotInfoExpFormC1",{
		                             //title: "Depot Information",
		                             formElements: [
													new sap.ui.layout.form.FormElement({
													    fields: [bckFrmDepInfExprtToInScrnPDFD]
													}),
													new sap.ui.layout.form.FormElement({
													    fields: [oFlexButtonTitleFD]
													}),
													new sap.ui.layout.form.FormElement("idFrmElmntFDPD",{
													    fields: []
													})
		                                     ]
		                     }),
		                     
		                     new sap.ui.layout.form.FormContainer("idDepotInfoExpFormC2",{
		                         formElements: [
		                                 ]
		                 })   
		             ]
		     });
		
		/*for(var i=0; i<aPortsDeportsFD.length; i++){
			var arrayDepoInfoDyn = [{desc: "Country : ", value: ""},
			    		         	{desc: "City : ", value: ""},
			    		         	{desc: "Depot Code : ", value: ""},
			    		         	{desc: "Depot Name : ", value: ""},
			    		         	{desc: "Depot Address : ", value: ""},
			    		         	{desc: "Telephone : ", value: ""},
			    		         	{desc: "Fax : ", value: ""},
			    		         	{desc: "Email : ", value: ""},
			    		         	{desc: "Cargo Type : ", value: ""},
			    		         	{desc: "Cargo Type Desc : ", value: ""}
			    		         	];
			
				arrayDepoInfoDyn[0].value = aPortsDeportsFD[i].Country;
				arrayDepoInfoDyn[1].value = aPortsDeportsFD[i].City;
				arrayDepoInfoDyn[2].value = aPortsDeportsFD[i].DepotCode;
				arrayDepoInfoDyn[3].value = aPortsDeportsFD[i].DepotName;
				arrayDepoInfoDyn[4].value = aPortsDeportsFD[i].Street+aPortsDeportsFD[i].Street1+aPortsDeportsFD[i].Street2+aPortsDeportsFD[i].Street3+aPortsDeportsFD[i].Street4+aPortsDeportsFD[i].PostalCode;
				arrayDepoInfoDyn[5].value = aPortsDeportsFD[i].ContactNo;
				arrayDepoInfoDyn[6].value = aPortsDeportsFD[i].FaxNo;
				arrayDepoInfoDyn[7].value = aPortsDeportsFD[i].Email;
				arrayDepoInfoDyn[8].value = aPortsDeportsFD[i].CargoType;
				arrayDepoInfoDyn[9].value = aPortsDeportsFD[i].CargoTypeDes;
				
				arrFDExpToPDF.push(arrayDepoInfoDyn);
			
			// Table
	    	var oDepoInfoExpTable = new sap.ui.table.Table({
	    		visibleRowCount: 10,
	            firstVisibleRow: 3,
	            columnHeaderVisible : false,
	            columnHeaderHeight: 30,
	            selectionMode: sap.ui.table.SelectionMode.None,
	            height:"100%"
	    	 }).addStyleClass("marginTop10 tblBorder");
	    	
	    	// Table Columns
	    	oDepoInfoExpTable.addColumn(new sap.ui.table.Column({
	         template: new sap.ui.commons.TextView().bindProperty("text", "desc").addStyleClass("wraptext"),
	         sortProperty: "desc",
	         filterProperty: "desc",
	         width:"80px",
	         resizable: false
	    	 }));
	    	 
	    	oDepoInfoExpTable.addColumn(new sap.ui.table.Column({
	    		 template: new sap.ui.commons.TextView().bindProperty("text", "value").addStyleClass("wraptext"),
	             sortProperty: "value",
	             filterProperty: "value",
	             width:"200px",
		         resizable: false
	    		 }));
	    	
	    	//Create a model and bind the table rows to this model
	    	var oModelDepInfoExp1 = new sap.ui.model.json.JSONModel();
	    	oModelDepInfoExp1.setData({modelData: arrayDepoInfoDyn});
	    	oDepoInfoExpTable.setModel(oModelDepInfoExp1);
	    	oDepoInfoExpTable.bindRows("/modelData");
	    	oDepoInfoExpTable.updateBindings();
	    	
	    	var oFDFormContainer = sap.ui.getCore().byId("idDepotInfoExpFormC1");
	    	oFDFormContainer.addFormElement(new sap.ui.layout.form.FormElement({
			    fields: [oDepoInfoExpTable]
			}) );
	    	
	}*/
		
     	return oDepotInfoExpForm;
	},
	
	bindArrForExpPDFFD: function(){
		if(sap.ui.getCore().byId("idFrmElmntFDPD")){
			sap.ui.getCore().byId("idFrmElmntFDPD").destroyFields();
		}
		
		arrFDExpToPDF = [];
		
		for(var i=0; i<aPortsDeportsFD.length; i++){
			var arrayDepoInfoDyn = [{desc: "Country : ", value: ""},
			    		         	{desc: "City : ", value: ""},
			    		         	{desc: "Depot Code : ", value: ""},
			    		         	{desc: "Depot Name : ", value: ""},
			    		         	{desc: "Depot Address : ", value: ""},
			    		         	{desc: "Telephone : ", value: ""},
			    		         	{desc: "Fax : ", value: ""},
			    		         	{desc: "Email : ", value: ""},
			    		         	{desc: "Cargo Type : ", value: ""},
			    		         	{desc: "Cargo Type Desc : ", value: ""}
			    		         	];
			
				arrayDepoInfoDyn[0].value = aPortsDeportsFD[i].Country;
				arrayDepoInfoDyn[1].value = aPortsDeportsFD[i].City;
				arrayDepoInfoDyn[2].value = aPortsDeportsFD[i].DepotCode;
				arrayDepoInfoDyn[3].value = aPortsDeportsFD[i].DepotName;
				arrayDepoInfoDyn[4].value = aPortsDeportsFD[i].Street+aPortsDeportsFD[i].Street1+aPortsDeportsFD[i].Street2+aPortsDeportsFD[i].Street3+aPortsDeportsFD[i].Street4+aPortsDeportsFD[i].PostalCode;
				arrayDepoInfoDyn[5].value = aPortsDeportsFD[i].ContactNo;
				arrayDepoInfoDyn[6].value = aPortsDeportsFD[i].FaxNo;
				arrayDepoInfoDyn[7].value = aPortsDeportsFD[i].Email;
				arrayDepoInfoDyn[8].value = aPortsDeportsFD[i].CargoType;
				arrayDepoInfoDyn[9].value = aPortsDeportsFD[i].CargoTypeDes;
				
				arrFDExpToPDF.push(arrayDepoInfoDyn);
			
			// Table
	    	var oDepoInfoExpTable = new sap.ui.table.Table({
	    		visibleRowCount: 10,
	            firstVisibleRow: 3,
	            columnHeaderVisible : false,
	            columnHeaderHeight: 30,
	            selectionMode: sap.ui.table.SelectionMode.None,
	            layoutData: new sap.ui.layout.GridData({span: "L12 M12 S12"}),
	    	 }).addStyleClass("marginTop10 tblBorder");
	    	
	    	// Table Columns
	    	oDepoInfoExpTable.addColumn(new sap.ui.table.Column({
	         template: new sap.ui.commons.TextView().bindProperty("text", "desc").addStyleClass("wraptext"),
	         sortProperty: "desc",
	         filterProperty: "desc",
	         width:"80px",
	         resizable: false
	    	 }));
	    	 
	    	oDepoInfoExpTable.addColumn(new sap.ui.table.Column({
	    		 template: new sap.ui.commons.TextView().bindProperty("text", "value").addStyleClass("wraptext"),
	             sortProperty: "value",
	             filterProperty: "value",
	             width:"200px",
		         resizable: false
	    		 }));
	    	
	    	//Create a model and bind the table rows to this model
	    	var oModelDepInfoExp1 = new sap.ui.model.json.JSONModel();
	    	oModelDepInfoExp1.setData({modelData: arrayDepoInfoDyn});
	    	oDepoInfoExpTable.setModel(oModelDepInfoExp1);
	    	oDepoInfoExpTable.bindRows("/modelData");
	    	oDepoInfoExpTable.updateBindings();
	    	
	    	var oFDFormElement = sap.ui.getCore().byId("idFrmElmntFDPD");
	    	oFDFormElement.insertField(oDepoInfoExpTable,i);
	    	
		}
	}
});
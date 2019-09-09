/******** NP *******/
jQuery.sap.require("sap.ui.model.json.JSONModel");

var arrayLenZCEMR = "";
var oModelMoveMultipleResultZCEMR;

sap.ui.model.json.JSONModel.extend("zeroCostEstimateMultipleResZCEMRView", {
	
	createZeroCostEstimateMultipleResZCEMR: function(){
		
		var oCurrZCEMR = this;
		
		var bckFrmResultsToZCEM = new sap.m.Link("idBckFrmResToZCEM", {
			text: " < Back",
            width:"9%",
            wrapping:true,
            press: function(){
                    var bus = sap.ui.getCore().getEventBus();
                    bus.publish("nav", "back");
            }});
		
		// Labels
		var oLabelDepotResult = new sap.ui.commons.Label({text: "Depot: ",
			layoutData: new sap.ui.layout.GridData({span: "L1 M2 S3",linebreak: false, margin: true}),
            wrapping: true}).addStyleClass("marginTop25");
		
		// Text View
    	var oInputDepotResult = new sap.ui.commons.TextView("idDepotDisplayZCEMR",{
    		layoutData: new sap.ui.layout.GridData({span:"L9 M9 S9", linebreak: false, margin: true})
    	}).addStyleClass("margin2 marginTop25");
    	
    	// Table
    	var oZCEMMultipleResultTable = new sap.ui.table.Table("idZeroCostEstMultiResTableZCEM",{
            firstVisibleRow: 3,
            columnHeaderHeight: 30,
            selectionMode: sap.ui.table.SelectionMode.None,
            height:"100%"
    	 }).addStyleClass("fontStyle marginTop15 tblBorder");
    	
    	// Table Columns
    	oZCEMMultipleResultTable.addColumn(new sap.ui.table.Column({
        	template: new sap.ui.commons.CheckBox().bindProperty("checked", "checked"),
        	sortProperty: "checked",
        	filterProperty: "checked",
        	resizable:false,
        	width:"20px",
        	hAlign: "Center"}));
    	
    	oZCEMMultipleResultTable.addColumn(new sap.ui.table.Column({
      		 label: new sap.ui.commons.Label({text: "Status"}).addStyleClass("wraptextcol"),
    		 template: new sap.ui.commons.Image().bindProperty("src", "status"),
             sortProperty: "status",
             filterProperty: "status",
             resizable:false,
             width:"auto",
    		 }));
    	
    	oZCEMMultipleResultTable.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Serial Number"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView().bindProperty("text", "serialNo"),
             sortProperty: "serialNo",
             filterProperty: "serialNo",
             resizable:false,
             width:"auto",
			 }));
    	 
    	oZCEMMultipleResultTable.addColumn(new sap.ui.table.Column({
    		 label: new sap.ui.commons.Label({text: "Estimate Date"}).addStyleClass("wraptextcol"),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "outDate"),
             sortProperty: "outDate",
             filterProperty: "outDate",
             resizable:false,
             width:"auto",
    		 }));
    	
    	oZCEMMultipleResultTable.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Warning / Errors"}).addStyleClass("wraptextcol"),
	   		 template: new sap.ui.commons.TextView().bindProperty("text", "warningErrors").addStyleClass("wraptext"),
	            sortProperty: "warningErrors",
	            filterProperty: "warningErrors",
	            resizable:false,
	            width:"auto",
	   		 }));
    	
    	var oImageDeleteZCEMR = new sap.ui.commons.Image("imgDeleteZCEMR");
    	oImageDeleteZCEMR.setSrc("images/delete_row.png");
    	oImageDeleteZCEMR.setDecorative(false);
    	oImageDeleteZCEMR.addStyleClass("marginTop20 marginRight5");
    	
    	var oBtnZCEMRDeleteRow = new sap.ui.commons.Link({
	        text: "Delete Checked Rows", 
	        tooltip: "Delete Checked Rows",
	        layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: false, margin: true}),
	        press: function() {
	        	arrayLenZCEMR = arrTransMsgsZCEM.length;
	        	var unCheckedCount = 0;
	        	  for(var j=0; j<arrayLenZCEMR; j++){
	        		  if(arrTransMsgsZCEM[j].checked == false){
	        			  unCheckedCount++;
	        		  }
	        	  }
	        	  if(unCheckedCount == arrayLenZCEMR){
	        		  sap.ui.commons.MessageBox.show("Please select atleast 1 row for deletion!",
	                            sap.ui.commons.MessageBox.Icon.WARNING,
	                            "Warning",
	                            [sap.ui.commons.MessageBox.Action.OK],
	                            sap.ui.commons.MessageBox.Action.OK);
	        	  }
	        	  else{
	        	  for(var i=arrayLenZCEMR-1; i>=0; i--){
	        		  if(arrTransMsgsZCEM[i].checked){
	        			  arrTransMsgsZCEM.splice(i,1);
	        			  oModelMoveMultipleResultZCEMR.updateBindings();
	        			  arrayLenZCEMR = arrayLenZCEMR - 1;
	        		  }
	        	  }
	        	  oZCEMMultipleResultTable.setVisibleRowCount(arrayLenZCEMR);
	        	  oCurrZCEMR.enableSubmitBtnZCEMR();
	        	  }
	          }}).addStyleClass("marginTop25");
    	
    	var oFlexAddDeleteZCEMR = new sap.m.FlexBox({
	           items: [
						oImageDeleteZCEMR,
						oBtnZCEMRDeleteRow
	           ],
	           direction : "Row",
				});
    	
    	// Buttons
	   	 var oBtnZCEMResSubmit = new sap.m.Button("idBtnZCEMResSubmit",{
		          text : "Submit",
		          width:"80px",
		          styled:false,
		          layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: true}),
		          press:function(){
		        	  oCurrZCEMR.submitValidationZCEMR();
		        	  }}).addStyleClass("submitBtn marginTop33");
    	
    	// Responsive Grid Layout
	    var oZCEMMultipleResultLayout = new sap.ui.layout.form.ResponsiveGridLayout("idZCEMMultipleResultLayout",{
	    	  labelSpanL: 1,
              labelSpanM: 1,
              labelSpanS: 1,
              emptySpanL: 0,
              emptySpanM: 0,
              emptySpanS: 0,
              columnsL: 1,
              columnsM: 1,
              columnsS: 1,
              breakpointL: 765,
              breakpointM: 320
	    });

	  // Online Form Starts
	     var oZCEMMultipleResultForm = new sap.ui.layout.form.Form("idZCEMMultipleResultForm",{
	             layout: oZCEMMultipleResultLayout,
	             formContainers: [
	                     
	                     new sap.ui.layout.form.FormContainer("idZCEMMultipleResultFormC1",{
                             formElements: [
												new sap.ui.layout.form.FormElement({
												    fields: [bckFrmResultsToZCEM]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oLabelDepotResult, oInputDepotResult]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oZCEMMultipleResultTable]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oFlexAddDeleteZCEMR]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oBtnZCEMResSubmit]
												})
	                                     ]
	                     }),
	                     new sap.ui.layout.form.FormContainer("idZCEMMultipleResultFormC2",{
                         formElements: []
                     })
	             ]
	     });
	     	return oZCEMMultipleResultForm;
	},
	
	enableSubmitBtnZCEMR: function(){
		//var successCount = 0;
		var enableFlag = false;
		for(var i=0; i<arrTransMsgsZCEM.length; i++){
			if(arrTransMsgsZCEM[i].status == "images/green_signal.png"){
				//successCount++;
				enableFlag = true;
			}
			else{
				enableFlag = false;
				break;
			}
		}
		if(enableFlag){
			sap.ui.getCore().byId("idBtnZCEMResSubmit").setEnabled(true);
		}
		else{
			sap.ui.getCore().byId("idBtnZCEMResSubmit").setEnabled(false);
		}
		/*if(successCount == arrTransMsgsZCEM.length){
			sap.ui.getCore().byId("idBtnZCEMResSubmit").setEnabled(true);
		}
		else{
			sap.ui.getCore().byId("idBtnZCEMResSubmit").setEnabled(false);
		}*/
	},
	
	submitValidationZCEMR: function(){
		
		busyDialog.open();
		
		var stringToPass = "";
		var stringCount = 1;
		
		for(var i=0; i<arrTransMsgsZCEM.length; i++){
			var outDateZCEMR = arrTransMsgsZCEM[i].outDate;
		    var splitDateZCEMR = outDateZCEMR.split("-");
			dateToPassZCEM = splitDateZCEMR[2]+splitDateZCEMR[1]+splitDateZCEMR[0];
			dateToPassZCEM = outDateZCEMR;	// MACHANACHANGES

		    stringToPass = stringToPass + "and IEquip" + stringCount + " eq '" + arrTransMsgsZCEM[i].serialNo + "$" + dateToPassZCEM + "'";
		    
		    stringCount++;
		}
		oModel = new sap.ui.model.odata.ODataModel(serviceUrl15_old, true);
		var urlToCallZCEMRes = serviceUrl15_old + "/Zero_Cost_Estimate?$filter=IDepot eq '" + depotNameZCEMToPass + "' " + stringToPass;
		//alert("urlToCallZCEMRes : "+urlToCallZCEMRes);
		OData.request({ 
		      requestUri: urlToCallZCEMRes,
		      method: "GET", 
		      dataType: 'json',
		      headers: 
		       {
		          "X-Requested-With": "XMLHttpRequest",
		          "Content-Type": "application/json; charset=utf-8",
		          "DataServiceVersion": "2.0", 
		          "X-CSRF-Token":"Fetch"   
		      }          
		    },
		    function (data, response){
		    	//alert("data.results.length : "+data.results.length);
		    	if(data.results.length == 0){
		    		 busyDialog.close();
		    		sap.ui.commons.MessageBox.show("Failed to Submit!",
                            sap.ui.commons.MessageBox.Icon.WARNING,
                            "Warning",
                            [sap.ui.commons.MessageBox.Action.OK],
                            sap.ui.commons.MessageBox.Action.OK);
                   
		    	}
		    	else{
		    		busyDialog.close();
		    		sap.ui.commons.MessageBox.alert("Data has been submitted for processing. Please check the processing status for each record via the Portal Processing Log after some time.");
		    	}
		    },
		    function(err){
		    	 busyDialog.close();
		    	 errorfromServer(err);
		    	//alert("Error while Reading Result : "+ window.JSON.stringify(err.response));
		    });
	},
	
	updateBindingZCEM: function(){
		oModelMoveMultipleResultZCEMR = new sap.ui.model.json.JSONModel();
		oModelMoveMultipleResultZCEMR.setData({modelData: arrTransMsgsZCEM});
    	sap.ui.getCore().byId("idZeroCostEstMultiResTableZCEM").setModel(oModelMoveMultipleResultZCEMR);
    	sap.ui.getCore().byId("idZeroCostEstMultiResTableZCEM").bindRows("/modelData");
    	
    	sap.ui.getCore().byId("idZeroCostEstMultiResTableZCEM").setVisibleRowCount(arrTransMsgsZCEM.length);
    	
    	sap.ui.getCore().byId("idDepotDisplayZCEMR").setText(depotNameZCEMToPass);
	}
});

function okCallBackZeroCostEstimate(){
	if(sap.ui.getCore().byId("ZeroCostEstimateMultiple"))
		sap.ui.getCore().byId("ZeroCostEstimateMultiple").destroy();
	
	var bus = sap.ui.getCore().getEventBus();
  	  	bus.publish("nav", "to", {
        id : "ZeroCostEstimateMultiple"
	  	 });
}
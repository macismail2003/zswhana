/******** NP *******/

var arrayLenMOMR = "";
var oModelMoveMultipleResultLAMR;

sap.ui.model.json.JSONModel.extend("LAMultipleResultView", {
	
	createLAMultipleResView: function(){
		
		var oCurrLAMR = this;
		
		var bckFrmResultsToLAM = new sap.m.Link("idBckFrmResToLAM", {
			text: " < Back",
            width:"9%",
            wrapping:true,
            press: function(){
                    var bus = sap.ui.getCore().getEventBus();
                    bus.publish("nav", "back");
            }});
		
		/*var oLblTitleLAMR = new sap.ui.commons.Label("idLblTitleLAMR",{
			text: "Add Movement Out - Multiple",
            wrapping: true}).addStyleClass("marginTop10 sapUiFormTitle");*/
		
		// Labels
		var oLabelDepotResult = new sap.ui.commons.Label({text: "Depot: ",
			layoutData: new sap.ui.layout.GridData({span: "L1 M2 S3",linebreak: false, margin: true}),
            wrapping: true}).addStyleClass("marginTop25");
		
		// Text Field
    	var oInputDepotResult = new sap.ui.commons.TextView("idDepotDisplayLAMR",{
    		layoutData: new sap.ui.layout.GridData({span:"L9 M9 S9", linebreak: false, margin: true})
    	}).addStyleClass("margin2 marginTop25");
    	
    	// Table
    	var oMoveMultipleResultTable = new sap.ui.table.Table("idMovementResultsLAM",{
            firstVisibleRow: 3,
            columnHeaderHeight: 40,
            selectionMode: sap.ui.table.SelectionMode.None,
            height:"100%"
    	 }).addStyleClass("fontStyle marginTop15 tblBorder");
    	
    	// Table Columns
    	oMoveMultipleResultTable.addColumn(new sap.ui.table.Column({
        	template: new sap.ui.commons.CheckBox().bindProperty("checked", "checked"),
        	sortProperty: "checked",
        	filterProperty: "checked",
        	resizable:false,
        	width:"35px",
        	hAlign: "Center"}));
    	
    	oMoveMultipleResultTable.addColumn(new sap.ui.table.Column({
      		 label: new sap.ui.commons.Label({text: "Status"}).addStyleClass("wraptextcol"),
    		 template: new sap.ui.commons.Image().bindProperty("src", "status"),
             sortProperty: "status",
             filterProperty: "status",
             resizable:false,
             width:"75px",
    		 }));
    	
    	oMoveMultipleResultTable.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Serial Number"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView().bindProperty("text", "serialNo"),
             sortProperty: "serialNo",
             filterProperty: "serialNo",
             resizable:false,
             width:"auto",
			 }));
    	 
    	oMoveMultipleResultTable.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Approval Amount"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView().bindProperty("text", "appAmount"),
            sortProperty: "appAmount",
            filterProperty: "appAmount",
            resizable:false,
            width:"auto",
			 }));
    	
    	oMoveMultipleResultTable.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Approval Ref."}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView().bindProperty("text", "appRef"),
            sortProperty: "appRef",
            filterProperty: "appRef",
            resizable:false,
            width:"auto",
			 }));
    	
    	oMoveMultipleResultTable.addColumn(new sap.ui.table.Column({
    		 label: new sap.ui.commons.Label({text: "Date"}).addStyleClass("wraptextcol"),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "Appdate"),
             sortProperty: "Appdate",
             filterProperty: "Appdate",
             resizable:false,
             width:"auto",
    		 }));
    	
    	oMoveMultipleResultTable.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Warning / Errors"}).addStyleClass("wraptextcol"),
	   		 template: new sap.ui.commons.TextView().bindProperty("text", "warningErrors").addStyleClass("wraptext"),
	            sortProperty: "warningErrors",
	            filterProperty: "warningErrors",
	            resizable:false,
	            width:"auto",
	   		 }));
    	
    	var oImageDeleteMOMR = new sap.ui.commons.Image("imgDeleteLAMR");
    	oImageDeleteMOMR.setSrc("images/delete_row.png");
    	oImageDeleteMOMR.setDecorative(false);
    	oImageDeleteMOMR.addStyleClass("marginTop20 marginRight5");
    	
    	var oBtnAMRDeleteRow = new sap.ui.commons.Link({
	        text: "Delete Checked Rows", 
	        tooltip: "Delete Checked Rows",
	        layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: false, margin: true}),
	        press: function() {
	        	arrayLenMOMR = arrTransMsgsLAM.length;
	        	var unCheckedCount = 0;
	        	  for(var j=0; j<arrayLenMOMR; j++){
	        		  if(arrTransMsgsLAM[j].checked == false){
	        			  unCheckedCount++;
	        		  }
	        	  }
	        	  if(unCheckedCount == arrayLenMOMR){
	        		  sap.ui.commons.MessageBox.show("Please select atleast 1 row for deletion!",
	                            sap.ui.commons.MessageBox.Icon.WARNING,
	                            "Warning",
	                            [sap.ui.commons.MessageBox.Action.OK],
	                            sap.ui.commons.MessageBox.Action.OK);
	        	  }
	        	  else{
	        	  for(var i=arrayLenMOMR-1; i>=0; i--){
	        		  if(arrTransMsgsLAM[i].checked){
	        			  arrTransMsgsLAM.splice(i,1);
	        			  oModelMoveMultipleResultLAMR.updateBindings();
	        			  arrayLenMOMR = arrayLenMOMR - 1;
	        		  }
	        	  }
        		  oMoveMultipleResultTable.setVisibleRowCount(arrayLenMOMR);
        		  oCurrLAMR.enableSubmitBtnLAMR();
	        	  }
	          }}).addStyleClass("marginTop25");
    	
    	var oFlexInAddDeleteMOMR = new sap.m.FlexBox({
	           items: [
						oImageDeleteMOMR,
						oBtnAMRDeleteRow
	           ],
	           direction : "Row",
				});
    	
    	/*var oBtnAMRDeleteRow = new sap.m.Button("idBtnAMRDeleteRow",{
	          text : "Delete Row",
	          width:"115px",
	          type:sap.m.ButtonType.Unstyled,
	          layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: false, margin: true}),
	          press:function(){
	        	  arrayLen = arrTransMsgsLAM.length;
	        	  for(var i=arrayLen-1; i>=0; i--){
	        		  if(arrTransMsgsLAM[i].checked){
	        			  arrTransMsgsLAM.splice(i,1);
	        			  oModelMoveMultipleResultLAMR.updateBindings();
	        			  arrayLen = arrayLen - 1;
	        		  }
	        	  }
        		  oMoveMultipleResultTable.setVisibleRowCount(arrayLen);
	          }}).addStyleClass("submitBtn marginTop10");*/
    	
    	// Buttons
	   	 var oBtnMoveResSubmit = new sap.m.Button("idBtnMoveResSubmitLAMR",{
		          text : "Submit",
		          width:"80px",
		          styled:false,
		          layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: true}),
		          press:function(){
		        	  oCurrLAMR.submitValidationLAMR();
		        	  }}).addStyleClass("submitBtn marginTop33");
    	
    	// Responsive Grid Layout
	    var oAddMoveMultipleResultLayout = new sap.ui.layout.form.ResponsiveGridLayout("idLesseeApprovalMultipleResultLayout",{
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
	     var oAddMoveMultipleResultForm = new sap.ui.layout.form.Form("idLesseeApprovalMultipleResultForm",{
	             layout: oAddMoveMultipleResultLayout,
	             formContainers: [
	                     
	                     new sap.ui.layout.form.FormContainer("idLesseeApprovalMultipleResultFormC1",{
	                             //title: "Add Movement Out - Multiple",
                             formElements: [
												new sap.ui.layout.form.FormElement({
												    fields: [bckFrmResultsToLAM]
												}),
												/*new sap.ui.layout.form.FormElement({
												    fields: [oLblTitleLAMR]
												}),*/
												new sap.ui.layout.form.FormElement({
												    fields: [oLabelDepotResult, oInputDepotResult]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oMoveMultipleResultTable]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oFlexInAddDeleteMOMR]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oBtnMoveResSubmit]
												})
	                                     ]
	                     }),
	                     new sap.ui.layout.form.FormContainer("idLesseeApprovalMultipleResultFormC2",{
                         formElements: []
                     })
	             ]
	     });
	     	return oAddMoveMultipleResultForm;
	},
	
	enableSubmitBtnLAMR: function(){
		var successCount = 0;
		for(var i=0; i<arrTransMsgsLAM.length; i++){
			if(arrTransMsgsLAM[i].status == "images/green_signal.png"){
				successCount++;
			}
		}
		if(successCount == arrTransMsgsLAM.length){
			sap.ui.getCore().byId("idBtnMoveResSubmitLAMR").setEnabled(true);
		}
		else{
			sap.ui.getCore().byId("idBtnMoveResSubmitLAMR").setEnabled(false);
		}
	},
	
	submitValidationLAMR: function(){
		busyDialog.open();
		var stringToPass = "";
		var stringCount = 1;
		for(var i=0; i<arrTransMsgsLAM.length; i++){
			var outDateLAMR = arrTransMsgsLAM[i].Appdate;
			//var splitDateLAMR = outDateLAMR.split("-"); // MACHANADATECHANGE-
			//dateToPassLAMR = splitDateLAMR[2]+splitDateLAMR[1]+splitDateLAMR[0];
			dateToPassLAMR = outDateLAMR; // MACHANADATECHANGE+
			if(stringToPass == ""){
				stringToPass = stringToPass + "ILessee" + stringCount + " eq '" + arrTransMsgsLAM[i].serialNo + "$" 
				                            + depotCodeLAMToPass + "$" + dateToPassLAMR + "$" + arrTransMsgsLAM[i].appRef + "$$" + arrTransMsgsLAM[i].appAmount + "'";
			}
			else{
				stringToPass = stringToPass + " and ILessee" + stringCount + " eq '" + arrTransMsgsLAM[i].serialNo 
				                            + "$" + depotCodeLAMToPass + "$" + dateToPassLAMR + "$" + arrTransMsgsLAM[i].appRef + "$$" + arrTransMsgsLAM[i].appAmount + "'";
			}
			stringCount++;
		}
		//http://seanwgd1.gessap.local:8000/sap/opu/odata/sap/ZNW_SEACO_PORTAL_REQ15_SRV/LESSEE_APPROVAL_ECC?$filter=
		oModel = new sap.ui.model.odata.ODataModel(serviceUrl15_old, true);
		var urlToCallLAMR = serviceUrl15_old + "/LESSEE_APPROVAL_ECC?$filter=" + stringToPass;
		//alert("urlToCallLAMR : "+urlToCallLAMR);
		OData.request({ 
		      requestUri: urlToCallLAMR,
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
		    	busyDialog.close();
		    	//sap.ui.commons.MessageBox.alert("Data has been submitted for processing. Please check the processing status for each record via the Portal Processing Log after some time.",okCallBackLesseeApprovalMulitpl);
		    	sap.ui.commons.MessageBox.alert("Data has been submitted for processing. Please check the processing status for each record via the Portal Processing Log after some time.");
		    
		    },
		    function(err){
		    	 busyDialog.close();
		    	 errorfromServer(err);
		    	//alert("Error while Reading Result : "+ window.JSON.stringify(err.response));
		    });
	},
	
	updateBindingLAM: function(){
    	oModelMoveMultipleResultLAMR = new sap.ui.model.json.JSONModel();
    	oModelMoveMultipleResultLAMR.setData({modelData: arrTransMsgsLAM});
    	sap.ui.getCore().byId("idMovementResultsLAM").setModel(oModelMoveMultipleResultLAMR);
    	sap.ui.getCore().byId("idMovementResultsLAM").bindRows("/modelData");
    	
    	sap.ui.getCore().byId("idMovementResultsLAM").setVisibleRowCount(arrTransMsgsLAM.length);
    	
    	sap.ui.getCore().byId("idDepotDisplayLAMR").setText(depotNameLAMToPass);
	}
});

function okCallBackLesseeApprovalMulitpl(){
	if(sap.ui.getCore().byId("LesseeApprovalMultiple"))
		sap.ui.getCore().byId("LesseeApprovalMultiple").destroy();
	 var bus = sap.ui.getCore().getEventBus();
  	  	bus.publish("nav", "to", {
        id : "LesseeApprovalMultiple"
	  	 });
}
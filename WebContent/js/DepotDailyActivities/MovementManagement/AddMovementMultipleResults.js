/******** NP *******/
jQuery.sap.require("sap.ui.model.json.JSONModel");

var arrayLenMOMR = "";
var oModelMoveMultipleResultAMOMR;

sap.ui.model.json.JSONModel.extend("addMovemntMultipleResView", {
	
	createAddMovemntMultipleRes: function(){
		
		var oCurrAMOMR = this;
		
		var bckFrmResultsToAMOM = new sap.m.Link("idBckFrmResToAMOM", {
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
		
		// Text Field
    	var oInputDepotResult = new sap.ui.commons.TextView("idDepotDisplayAMOMR",{
    		layoutData: new sap.ui.layout.GridData({span:"L9 M9 S9", linebreak: false, margin: true})
    	}).addStyleClass("margin2 marginTop25");
    	
    	// Table
    	var oMoveMultipleResultTable = new sap.ui.table.Table("idMovementResultsAMOM",{
            firstVisibleRow: 3,
            columnHeaderHeight: 30,
            selectionMode: sap.ui.table.SelectionMode.None,
            height:"100%"
    	 }).addStyleClass("fontStyle marginTop15 tblBorder");
    	
    	// Table Columns
    	oMoveMultipleResultTable.addColumn(new sap.ui.table.Column({
        	template: new sap.ui.commons.CheckBox().bindProperty("checked", "checked"),
        	sortProperty: "checked",
        	filterProperty: "checked",
        	resizable:false,
        	width:"15px",
        	hAlign: "Center"}));
    	
    	oMoveMultipleResultTable.addColumn(new sap.ui.table.Column({
      		 label: new sap.ui.commons.Label({text: "Status"}),
    		 template: new sap.ui.commons.Image().bindProperty("src", "status"),
             sortProperty: "status",
             filterProperty: "status",
             resizable:false,
             width:"25px",
    		 }));
    	
    	oMoveMultipleResultTable.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Serial Number"}),
			 template: new sap.ui.commons.TextView().bindProperty("text", "serialNo"),
             sortProperty: "serialNo",
             filterProperty: "serialNo",
             resizable:false,
             width:"30px",
			 }));
    	 
    	oMoveMultipleResultTable.addColumn(new sap.ui.table.Column({
    		 label: new sap.ui.commons.Label({text: "Out Date"}),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "outDate"),
             sortProperty: "outDate",
             filterProperty: "outDate",
             resizable:false,
             width:"30px",
    		 }));
    	
    	oMoveMultipleResultTable.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Authorisation"}),
			 template: new sap.ui.commons.TextView().bindProperty("text", "auth"),
            sortProperty: "auth",
            filterProperty: "auth",
            resizable:false,
            width:"30px",
			 }));
   	 
    	oMoveMultipleResultTable.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Warning / Errors"}),
	   		 template: new sap.ui.commons.TextView().bindProperty("text", "warningErrors").addStyleClass("wraptext"),
	            sortProperty: "warningErrors",
	            filterProperty: "warningErrors",
	            resizable:false,
	            width:"50px",
	   		 }));
    	
    	var oImageDeleteMOMR = new sap.ui.commons.Image("imgDeleteMOMR");
    	oImageDeleteMOMR.setSrc("images/delete_row.png");
    	oImageDeleteMOMR.setDecorative(false);
    	oImageDeleteMOMR.addStyleClass("marginTop20 marginRight5");
    	
    	var oBtnAMRDeleteRow = new sap.ui.commons.Link({
	        text: "Delete Checked Rows", 
	        tooltip: "Delete Checked Rows",
	        layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: false, margin: true}),
	        press: function() {
	        	arrayLenMOMR = arrTransMsgsAMOM.length;
	        	var unCheckedCount = 0;
	        	  for(var j=0; j<arrayLenMOMR; j++){
	        		  if(arrTransMsgsAMOM[j].checked == false){
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
	        		  if(arrTransMsgsAMOM[i].checked){
	        			  arrTransMsgsAMOM.splice(i,1);
	        			  oModelMoveMultipleResultAMOMR.updateBindings();
	        			  arrayLenMOMR = arrayLenMOMR - 1;
	        		  }
	        	  }
        		  oMoveMultipleResultTable.setVisibleRowCount(arrayLenMOMR);
        		  oCurrAMOMR.enableSubmitBtnAMOMR();
	        	  }
	          }}).addStyleClass("marginTop25");
    	
    	var oFlexInAddDeleteMOMR = new sap.m.FlexBox({
	           items: [
						oImageDeleteMOMR,
						oBtnAMRDeleteRow
	           ],
	           direction : "Row",
				});
    	
    	// Buttons
	   	 var oBtnMoveResSubmit = new sap.m.Button("idBtnMoveResSubmitAMOMR",{
		          text : "Submit",
		          width:"80px",
		          styled:false,
		          layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: true}),
		          press:function(){
		        	  oCurrAMOMR.submitValidationAMOMR();
		        	  }}).addStyleClass("submitBtn marginTop33");
    	
    	// Responsive Grid Layout
	    var oAddMoveMultipleResultLayout = new sap.ui.layout.form.ResponsiveGridLayout("idAddMoveMultipleResultLayout",{
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
	     var oAddMoveMultipleResultForm = new sap.ui.layout.form.Form("idAddMoveMultipleResultForm",{
	             layout: oAddMoveMultipleResultLayout,
	             formContainers: [
	                     
	                     new sap.ui.layout.form.FormContainer("idAddMoveMultipleResultFormC1",{
                             formElements: [
												new sap.ui.layout.form.FormElement({
												    fields: [bckFrmResultsToAMOM]
												}),
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
	                     new sap.ui.layout.form.FormContainer("idAddMoveMultipleResultFormC2",{
                         formElements: []
                     })
	             ]
	     });
	     	return oAddMoveMultipleResultForm;
	},
	
	enableSubmitBtnAMOMR: function(){
		var successCount = 0;
		for(var i=0; i<arrTransMsgsAMOM.length; i++){
			if(arrTransMsgsAMOM[i].status == "images/green_signal.png"){
				successCount++;
			}
		}
		if(successCount == arrTransMsgsAMOM.length){
			sap.ui.getCore().byId("idBtnMoveResSubmitAMOMR").setEnabled(true);
		}
		else{
			sap.ui.getCore().byId("idBtnMoveResSubmitAMOMR").setEnabled(false);
		}
	},
	
	submitValidationAMOMR: function(){
		busyDialog.open();
		var stringToPass = "";
		var stringCount = 1;
		for(var i=0; i<arrTransMsgsAMOM.length; i++){
			var outDateAMOMR = arrTransMsgsAMOM[i].outDate;
		    var splitDateAMOMR = outDateAMOMR.split("-");
		    dateToPassAMOMR = splitDateAMOMR[2]+splitDateAMOMR[1]+splitDateAMOMR[0];
		    var vSplit = depotNameAMOMToPass.split("-");
		    var vFuncLoc = vSplit[0] + "-" + vSplit[1] + "-" + vSplit[2] + "-" + vSplit[3];
			if(stringToPass == ""){
				stringToPass = stringToPass + "Igateout" + stringCount + " eq '" + arrTransMsgsAMOM[i].serialNo.toUpperCase().trim() + "$" + vFuncLoc + "$" + depotCodeAMOMToPass + "$" + arrTransMsgsAMOM[i].auth.trim() + "$" + dateToPassAMOMR + "'";
			}
			else{
				stringToPass = stringToPass + " and Igateout" + stringCount + " eq '" + arrTransMsgsAMOM[i].serialNo.toUpperCase().trim() + "$" + vFuncLoc + "$" + depotCodeAMOMToPass + "$" + arrTransMsgsAMOM[i].auth.trim() + "$" + dateToPassAMOMR + "'";
			}
			stringCount++;
		}
		oModel = new sap.ui.model.odata.ODataModel(serviceUrl15, true);
		var urlToCallAMOMR = serviceUrl15 + "/Gateout_Proxy?$filter=" + stringToPass;
		//alert("urlToCallAMOMR : "+urlToCallAMOMR);
		OData.request({ 
		      requestUri: urlToCallAMOMR,
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
		    		//sap.ui.commons.MessageBox.alert("Data has been submitted for processing. Please check the processing status for each record via the Portal Processing Log after some time.",okCallBackMoveOutToLease);
		    		sap.ui.commons.MessageBox.alert("Data has been submitted for processing. Please check the processing status for each record via the Portal Processing Log after some time.");
		    	}
		    },
		    function(err){
		    	 busyDialog.close();
		    	 errorfromServer(err);
		    	//alert("Error while Reading Result : "+ window.JSON.stringify(err.response));
		    });
	},
	
	updateBindingAMOM: function(){
    	oModelMoveMultipleResultAMOMR = new sap.ui.model.json.JSONModel();
    	oModelMoveMultipleResultAMOMR.setData({modelData: arrTransMsgsAMOM});
    	sap.ui.getCore().byId("idMovementResultsAMOM").setModel(oModelMoveMultipleResultAMOMR);
    	sap.ui.getCore().byId("idMovementResultsAMOM").bindRows("/modelData");
    	
    	sap.ui.getCore().byId("idMovementResultsAMOM").setVisibleRowCount(arrTransMsgsAMOM.length);
    	
    	sap.ui.getCore().byId("idDepotDisplayAMOMR").setText(depotNameAMOMToPass);
	},
	
	
		
	
});

function okCallBackMoveOutToLease(){
	if(sap.ui.getCore().byId("AddMoveMultiple"))
		sap.ui.getCore().byId("AddMoveMultiple").destroy();
	 var bus = sap.ui.getCore().getEventBus();
  	  	bus.publish("nav", "to", {
        id : "AddMoveMultiple"
	  	 });
}
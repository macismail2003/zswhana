/******** NP *******/
jQuery.sap.require("sap.ui.model.json.JSONModel");

//Arrays
var aSubmitInMultipleSMIM = [];

var arrayLenSMIM = "";
var oModelSubmitMultipleSAMIM;

sap.ui.model.json.JSONModel.extend("submitMovemntInMultipleView", {
	
	createSubmitMovemntInMultiple: function(){
		
		var oCurrSMIM = this;
		
		var bckFrmSubmitToAMIM = new sap.m.Link("idBckFrmSubmitToAMIM", {
			text: " < Back",
            width:"9%",
            wrapping:true,
            press: function(){
                    var bus = sap.ui.getCore().getEventBus();
                    bus.publish("nav", "back");
            }});
		
		// Labels
		var oLabelSubmitMultipleDepot = new sap.ui.commons.Label({text: "Depot:",
			layoutData: new sap.ui.layout.GridData({span: "L1 M3 S3",linebreak: false, margin: true}),
            wrapping: true}).addStyleClass("margin10");
		
		// Text Field
    	var oInputDepotSubmitMultiple = new sap.ui.commons.TextView("idDepotDisplayAMIMSBVDTD",{
    		layoutData: new sap.ui.layout.GridData({span: "L9 M9 S9",linebreak: false, margin: true}),
    	}).addStyleClass("margin2 marginTop10");
    	
    	// Table
    	var oSubmitMultipleTable = new sap.ui.table.Table("idTblSubmitValidationTDAMIM",{
            firstVisibleRow: 3,
            columnHeaderHeight: 30,
            selectionMode: sap.ui.table.SelectionMode.None,
            width: "70%",
            height:"100%"
    	 }).addStyleClass("fontStyle marginTop15 tblBorder");
    	
    	// Table Columns
    	oSubmitMultipleTable.addColumn(new sap.ui.table.Column({
        	template: new sap.ui.commons.CheckBox().bindProperty("checked", "checked"),
        	sortProperty: "checked",
        	filterProperty: "checked",
        	width:"5%",
        	resizable:false,
        	hAlign: "Center"}));
    	
    	oSubmitMultipleTable.addColumn(new sap.ui.table.Column({
      		 label: new sap.ui.commons.Label({text: "Status"}),
    		 template: new sap.ui.commons.Image().bindProperty("src", "status"),
             sortProperty: "status",
             filterProperty: "status",
             resizable:false,
             width:"8%",
    		 }));
    	
    	oSubmitMultipleTable.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Serial Number"}),
			 template: new sap.ui.commons.TextView().bindProperty("text", "serialNo"),
             sortProperty: "serialNo",
             filterProperty: "serialNo",
             resizable:false
			 }));
    	 
    	oSubmitMultipleTable.addColumn(new sap.ui.table.Column({
    		 label: new sap.ui.commons.Label({text: "Return Date"}),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "retDate"),
    		 resizable:false,
             sortProperty: "retDate",
             filterProperty: "retDate",
    		 }));
    	
    	oSubmitMultipleTable.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Authorisation"}),
			 template: new sap.ui.commons.TextView().bindProperty("text", "auth"),
			 resizable:false,
            sortProperty: "auth",
            filterProperty: "auth",
			 }));
    	
    	oSubmitMultipleTable.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Status 'A'"}),
	   		template: new sap.ui.commons.CheckBox().bindProperty("checked", "statusA"),
	   		resizable:false,
        	sortProperty: "statusA",
        	filterProperty: "statusA",
        	hAlign: "Center"
			 }));
    	
    	oSubmitMultipleTable.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Tank Details"}),
			 template: new sap.ui.commons.TextView().bindProperty("text", "tankDet"),
			 resizable:false,
           sortProperty: "tankDet",
           filterProperty: "tankDet",
			 }));
   	 
    	oSubmitMultipleTable.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Warning / Errors"}),
	   		 template: new sap.ui.commons.TextView().bindProperty("text", "warningError").addStyleClass("wraptext"),
	   		resizable:false,
	            sortProperty: "warningError",
	            filterProperty: "warningError",
	   		 }));
    	
    	var oImageDeleteSMIM = new sap.ui.commons.Image("imgDeleteSMIM");
    	oImageDeleteSMIM.setSrc("images/delete_row.png");
    	oImageDeleteSMIM.setDecorative(false);
    	oImageDeleteSMIM.addStyleClass("marginTop20 marginRight5");
    	
    	var oBtnSMMDeleteRow = new sap.ui.commons.Link({
	        text: "Delete Checked Rows", 
	        tooltip: "Delete Checked Rows",
	        layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: false, margin: true}),
	        press: function() {
	        	arrayLenSMIM = aSubmitInMultipleSMIM.length;
	        	var unCheckedCount = 0;
	        	  for(var j=0; j<arrayLenSMIM; j++){
	        		  if(aSubmitInMultipleSMIM[j].checked == false){
	        			  unCheckedCount++;
	        		  }
	        	  }
	        	  if(unCheckedCount == arrayLenSMIM){
	        		  sap.ui.commons.MessageBox.show("Please select atleast 1 row for deletion!",
	                            sap.ui.commons.MessageBox.Icon.WARNING,
	                            "Warning",
	                            [sap.ui.commons.MessageBox.Action.OK],
	                            sap.ui.commons.MessageBox.Action.OK);
	        	  }
	        	  else{
	        	  for(var i=arrayLenSMIM-1; i>=0; i--){
	        		  if(aSubmitInMultipleSMIM[i].checked){
	        			  aSubmitInMultipleSMIM.splice(i,1);
	        			  oModelSubmitMultipleSAMIM.updateBindings();
	        			  arrayLenSMIM = arrayLenSMIM - 1;
	        		  }
	        	  }
	        	  oSubmitMultipleTable.setVisibleRowCount(arrayLenSMIM);
	        	  oCurrSMIM.enableSubmitBtnSAMIM();
	        	  }
	          }}).addStyleClass("marginTop25");
    	
    	var oFlexInAddDeleteSMIM = new sap.m.FlexBox({
	           items: [
						oImageDeleteSMIM,
						oBtnSMMDeleteRow
	           ],
	           direction : "Row",
				});
    	
    	// Buttons
	   	 var oBtnSubmitMultiple = new sap.m.Button("idBtnMoveResSubmitSAMIM",{
		          text : "Submit",
		          width:"80px",
		          styled:false,
		          layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: true}),
		          press:function(){
		        	  oCurrSMIM.submitValidationSAMIM();
		          }}).addStyleClass("submitBtn marginTop33");
	   	 
	  // Responsive Grid Layout
		    var oSubmitMultipleLayout = new sap.ui.layout.form.ResponsiveGridLayout("idSubmitMultipleLayout",{
		    	  labelSpanL: 1,
	              labelSpanM: 1,
	              labelSpanS: 1,
	              emptySpanL: 0,
	              emptySpanM: 0,
	              emptySpanS: 0,
	              columnsL: 2,
	              columnsM: 2,
	              columnsS: 1,
	              breakpointL: 765,
	              breakpointM: 320
		    });

		  // Online Form Starts
		     var oSubmitMultipleForm = new sap.ui.layout.form.Form("idSubmitMultipleForm",{
		             layout: oSubmitMultipleLayout,
		             formContainers: [
		                     
		                     new sap.ui.layout.form.FormContainer("idSubmitMultipleFormC1",{
	                             formElements: [
													new sap.ui.layout.form.FormElement({
													    fields: [bckFrmSubmitToAMIM]
													}),
													new sap.ui.layout.form.FormElement({
													    fields: [oLabelSubmitMultipleDepot, oInputDepotSubmitMultiple]
													}),
													new sap.ui.layout.form.FormElement({
													    fields: [oSubmitMultipleTable]
													}),
													new sap.ui.layout.form.FormElement({
													    fields: [oFlexInAddDeleteSMIM]
													}),
													new sap.ui.layout.form.FormElement({
													    fields: [oBtnSubmitMultiple]
													})
		                                     ]
		                     })
		             ]
		     });
		     	return oSubmitMultipleForm;
	},
	
	enableSubmitBtnSAMIM: function(){
		var successCount = 0;
		for(var i=0; i<aSubmitInMultipleSMIM.length; i++){
			if(aSubmitInMultipleSMIM[i].status == "images/green_signal.png"){
				successCount++;
			}
		}
		if(successCount == aSubmitInMultipleSMIM.length){
			sap.ui.getCore().byId("idBtnMoveResSubmitSAMIM").setEnabled(true);
		}
		else{
			sap.ui.getCore().byId("idBtnMoveResSubmitSAMIM").setEnabled(false);
		}
	},
	
	submitValidationSAMIM: function(){
		busyDialog.open();
		
		var stringToPass = "";
		var stringCount = 1;
		
		for(var j=0; j<aSubmitInMultipleSMIM.length; j++){
			if(aSubmitInMultipleSMIM[j].statusA == true){
				aSubmitInMultipleSMIM[j].statusAVal = "A";
			}
			else{
				aSubmitInMultipleSMIM[j].statusAVal = "";
			}
		}
		
		for(var i=0; i<aSubmitInMultipleSMIM.length; i++){
			var retDateSAMIM = aSubmitInMultipleSMIM[i].retDate;
		    var splitDateSAMIM = retDateSAMIM.split("-");
		    dateToPassSAMIM = splitDateSAMIM[2]+splitDateSAMIM[1]+splitDateSAMIM[0];
		    
		    var lstClnDate = aMoveInMultipleAMIM[i].lastClnDate.split("-");
		    var dateToPassLastClnDt = lstClnDate[2]+lstClnDate[1]+lstClnDate[0];
		    var lstClnDate = "";
            var dateToPassLastClnDt = "";
            
            if(aMoveInMultipleAMIM[i].lastClnDate == ""){
               dateToPassLastClnDt = "";
            }
            else{
               lstClnDate = aMoveInMultipleAMIM[i].lastClnDate.split("-");
                   dateToPassLastClnDt = lstClnDate[2]+lstClnDate[1]+lstClnDate[0];
            }
            
          //pass func loc instead of full name because of & - 1 - oct
            var selDepValAMIM = document.getElementById("idComboDepotAMIM").value;
		      var partsDepAMIM = selDepValAMIM.split("-");
	  		  selectedDepotToPassAMIM = partsDepAMIM[0] + "-" + partsDepAMIM[1] + "-" + partsDepAMIM[2] + "-" + partsDepAMIM[3];
			if(stringToPass == ""){
				stringToPass = stringToPass + "Igatein" + stringCount + " eq '" + aSubmitInMultipleSMIM[i].serialNo.toUpperCase().trim() + "$" + selectedDepotToPassAMIM + "$" + selectedDepotToPassCodeAMIM + "$" + aSubmitInMultipleSMIM[i].auth.trim() + "$" + dateToPassSAMIM + "$" + aMoveInMultipleAMIM[i].unNo.trim() + "$" + dateToPassLastClnDt.trim() + "$" + aMoveInMultipleAMIM[i].lastCargoDesc.trim() + "$" + aMoveInMultipleAMIM[i].clnProcDesc.trim() + "$" + aSubmitInMultipleSMIM[i].statusAVal + "'";
				//stringToPass = stringToPass + "Igatein" + stringCount + " eq '" + aSubmitInMultipleSMIM[i].serialNo.toUpperCase().trim() + "$" + selectedDepotToPassAMIM + "$" + selectedDepotToPassCodeAMIM + "$" + aSubmitInMultipleSMIM[i].auth.trim() + "$" + dateToPassSAMIM + "$" + aMoveInMultipleAMIM[i].unNo.trim() + "$$" + aMoveInMultipleAMIM[i].lastCargoDesc.trim() + "$" + aMoveInMultipleAMIM[i].clnProcDesc.trim() + "$" + aSubmitInMultipleSMIM[i].statusAVal + "'";
			}
			else{
				stringToPass = stringToPass + " and Igatein" + stringCount + " eq '" + aSubmitInMultipleSMIM[i].serialNo.toUpperCase().trim() + "$" + selectedDepotToPassAMIM + "$" + selectedDepotToPassCodeAMIM + "$" + aSubmitInMultipleSMIM[i].auth.trim() + "$" + dateToPassSAMIM + "$" + aMoveInMultipleAMIM[i].unNo + "$" + dateToPassLastClnDt + "$" + aMoveInMultipleAMIM[i].lastCargoDesc.trim() + "$" + aMoveInMultipleAMIM[i].clnProcDesc.trim() + "$" + aSubmitInMultipleSMIM[i].statusAVal + "'";
				//stringToPass = stringToPass + " and Igatein" + stringCount + " eq '" + aSubmitInMultipleSMIM[i].serialNo.toUpperCase().trim() + "$" + selectedDepotToPassAMIM + "$" + selectedDepotToPassCodeAMIM + "$" + aSubmitInMultipleSMIM[i].auth.trim() + "$" + dateToPassSAMIM + "$" + aMoveInMultipleAMIM[i].unNo + "$$" + aMoveInMultipleAMIM[i].lastCargoDesc.trim() + "$" + aMoveInMultipleAMIM[i].clnProcDesc.trim() + "$" + aSubmitInMultipleSMIM[i].statusAVal + "'";
			}
			stringCount++;
		}
		oModel = new sap.ui.model.odata.ODataModel(serviceUrl15, true);
		var urlToCallSAMIM = serviceUrl15 + "/Gatein_Proxy?$filter=" + stringToPass;
		//alert("urlToCallSAMIM : "+urlToCallSAMIM);
		OData.request({ 
		      requestUri: urlToCallSAMIM,
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
		    		 sap.ui.commons.MessageBox.alert("Failed to submit!");
		    	}
		    	else{
		    		busyDialog.close();
		    		//sap.ui.commons.MessageBox.alert("Data has been submitted for processing. Please check the processing status for each record via the Portal Processing Log after some time.",okCallBackMoveInFromLease);
		    		sap.ui.commons.MessageBox.alert("Data has been submitted for processing. Please check the processing status for each record via the Portal Processing Log after some time.");
		    	}
		    },
		    function(err){
		    	 busyDialog.close();
		    	 errorfromServer(err);
		    	//alert("Error while Reading Result : "+ window.JSON.stringify(err.response));
		    });
	},
	
	updateBindingSubmitValidationAMIM: function(){
    	oModelSubmitMultipleSAMIM = new sap.ui.model.json.JSONModel();
    	oModelSubmitMultipleSAMIM.setData({modelData: aSubmitInMultipleSMIM});
    	sap.ui.getCore().byId("idTblSubmitValidationTDAMIM").setModel(oModelSubmitMultipleSAMIM);
    	sap.ui.getCore().byId("idTblSubmitValidationTDAMIM").bindRows("/modelData");
    	
    	sap.ui.getCore().byId("idTblSubmitValidationTDAMIM").setVisibleRowCount(aSubmitInMultipleSMIM.length);
	
    	sap.ui.getCore().byId("idDepotDisplayAMIMSBVDTD").setText(selectedDepotToPassAMIM);
	}
});

function okCallBackMoveInFromLease(){
	if(sap.ui.getCore().byId("AddMoveInMultiple"))
		sap.ui.getCore().byId("AddMoveInMultiple").destroy();
	 var bus = sap.ui.getCore().getEventBus();
  	  	bus.publish("nav", "to", {
        id : "AddMoveInMultiple"
	  	 });
}
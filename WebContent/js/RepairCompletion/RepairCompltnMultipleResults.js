var arrayLenRCMR = "";
var oModelMultipleResultRCMR;

sap.ui.model.json.JSONModel.extend("RepairCompltnMultipleResultsView", {

	createRepairCompltnMultipleResults: function(){
		var oCurrRCMR = this;

		var bckFrmResultsToRCM = new sap.m.Link("idBckFrmResToRCM", {
			text: " < Back",
            width:"9%",
            wrapping:true,
            press: function(){
                    var bus = sap.ui.getCore().getEventBus();
                    bus.publish("nav", "back");
            }});


		// Labels
		var oLabelDepotResult = new sap.ui.commons.Label({text: "Depot: ",
			layoutData: new sap.ui.layout.GridData({span: "L2 M2 S4",linebreak: false, margin: true}),
            wrapping: true}).addStyleClass("marginTop25");

		var oLabelProgressTypeResult = new sap.ui.commons.Label({text: "Progress Type: ",
			layoutData: new sap.ui.layout.GridData({span: "L2 M2 S4",linebreak: false, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");


		// Text Field
    	var oInputDepotResult = new sap.ui.commons.TextView("idDepotDisplayRCMR",{
    		layoutData: new sap.ui.layout.GridData({span:"L9 M9 S9", linebreak: false, margin: true})
    	}).addStyleClass("marginTop25");

    	var oInputProgressTypeResult = new sap.ui.commons.TextView("idProgressTypeRCMR",{
    		text:"Post Repair Inspection",
    		layoutData: new sap.ui.layout.GridData({span:"L9 M9 S9", linebreak: false, margin: true})
    	}).addStyleClass("marginTop10");

    	// Table
    	var oRCMResultTable = new sap.ui.table.Table("idRCMResultsTbl",{
            firstVisibleRow: 3,
            columnHeaderHeight: 40,
            selectionMode: sap.ui.table.SelectionMode.None,
            height:"100%",
            width:"80%",
    	 }).addStyleClass("fontStyle marginTop15 tblBorder");

    	// Table Columns
    	oRCMResultTable.addColumn(new sap.ui.table.Column({
        	template: new sap.ui.commons.CheckBox().bindProperty("checked", "checked"),
        	sortProperty: "checked",
        	filterProperty: "checked",
        	resizable:false,
        	width:"30px",
        	//hAlign: "Center"
        		}));

    	oRCMResultTable.addColumn(new sap.ui.table.Column({
     		 label: new sap.ui.commons.Label({text: "Status"}).addStyleClass("wraptextcol"),
   		 template: new sap.ui.commons.Image().bindProperty("src", "status"),
            sortProperty: "status",
            filterProperty: "status",
            resizable:false,
            width:"auto",
   		 }));

    	oRCMResultTable.addColumn(new sap.ui.table.Column({
    		 label: new sap.ui.commons.Label({text: "Serial Number"}).addStyleClass("wraptextcol"),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "serialNo"),
           sortProperty: "serialNo",
           filterProperty: "serialNo",
           resizable:false,
           width:"auto",
  		 }));

    	oRCMResultTable.addColumn(new sap.ui.table.Column({
				visible : false,
    		 label: new sap.ui.commons.Label({text: "Unit Part Code"}).addStyleClass("wraptextcol"),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "UnitPartCode"),
           sortProperty: "UnitPartCode",
           filterProperty: "UnitPartCode",
           resizable:false,
           width:"auto",
  		 }));

    	oRCMResultTable.addColumn(new sap.ui.table.Column({
				visible : false,
    		 label: new sap.ui.commons.Label({text: "Estimate Type"}).addStyleClass("wraptextcol"),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "EstType"),
           sortProperty: "EstType",
           filterProperty: "EstType",
           resizable:false,
		   width:"auto",
  		 }));

    	oRCMResultTable.addColumn(new sap.ui.table.Column({
    		 label: new sap.ui.commons.Label({text: "Date"}).addStyleClass("wraptextcol"),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "Date"),
           sortProperty: "Date",
           filterProperty: "Date",
           resizable:false,
           width:"auto",
  		 }));

    	oRCMResultTable.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Warning / Errors"}).addStyleClass("wraptextcol"),
	   		 template: new sap.ui.commons.TextView().bindProperty("text", "warningErrors").addStyleClass("wraptext"),
	            sortProperty: "warningErrors",
	            filterProperty: "warningErrors",
	            resizable:false,
	            width:"auto",
	   		 }));


    	var oImageDeleteRCMR = new sap.ui.commons.Image("imgDeleteRCMR");
    	oImageDeleteRCMR.setSrc("images/delete_row.png");
    	oImageDeleteRCMR.setDecorative(false);
    	oImageDeleteRCMR.addStyleClass("marginTop20 marginRight5");

    	var oBtnRCMRDeleteRow = new sap.ui.commons.Link({
	        text: "Delete Checked Rows",
	        tooltip: "Delete Checked Rows",
	        layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: false, margin: true}),
	        press: function() {
	        	arrayLenRCMR = arrTransMsgsRCM.length;
	        	var unCheckedCount = 0;
	        	  for(var j=0; j<arrayLenRCMR; j++){
	        		  if(arrTransMsgsRCM[j].checked == false){
	        			  unCheckedCount++;
	        		  }
	        	  }
	        	  if(unCheckedCount == arrayLenRCMR){
	        		  sap.ui.commons.MessageBox.show("Please select atleast 1 row for deletion!",
	                            sap.ui.commons.MessageBox.Icon.WARNING,
	                            "Warning",
	                            [sap.ui.commons.MessageBox.Action.OK],
	                            sap.ui.commons.MessageBox.Action.OK);
	        	  }
	        	  else{
	        	  for(var i=arrayLenRCMR-1; i>=0; i--){
	        		  if(arrTransMsgsRCM[i].checked){
	        			  arrTransMsgsRCM.splice(i,1);
	        			  oModelMultipleResultRCMR.updateBindings();
	        			  arrayLenRCMR = arrayLenRCMR - 1;
	        		  }
	        	  }
	        	  oRCMResultTable.setVisibleRowCount(arrayLenRCMR);
	        	  oCurrRCMR.enableSubmitBtnRCMR();
	        	  }
	          }}).addStyleClass("marginTop25");

    	var oFlexInAddDeleteRCMR = new sap.m.FlexBox({
	           items: [
						oImageDeleteRCMR,
						oBtnRCMRDeleteRow
	           ],
	           direction : "Row",
				});

    	// Buttons
	   	 var oBtnMoveResSubmit = new sap.m.Button("idBtnMoveResSubmitRCMR",{
		          text : "Submit",
		          width:"80px",
		          styled:false,
		          layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: true}),
		          press:function(){
		        	  oCurrRCMR.submitValidationRCMR(0);
		        	  }}).addStyleClass("submitBtn marginTop33");


	    	// Responsive Grid Layout
		    var oRepairCompltnMultipleResultLayout = new sap.ui.layout.form.ResponsiveGridLayout("idRepairCompltnMultipleResultLayout",{
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
		     var oRepairCompltnMultipleResultForm = new sap.ui.layout.form.Form("idRepairCompltnMultipleResultForm",{
		             layout: oRepairCompltnMultipleResultLayout,
		             formContainers: [

		                     new sap.ui.layout.form.FormContainer("idRepairCompltnMultipleResultFormC1",{
		                             //title: "Add Movement Out - Multiple",
	                             formElements: [
													new sap.ui.layout.form.FormElement({
													    fields: [bckFrmResultsToRCM]
													}),
													/*new sap.ui.layout.form.FormElement({
													    fields: [oLblTitleRCMR]
													}),*/
													new sap.ui.layout.form.FormElement({
													    fields: [oLabelDepotResult, oInputDepotResult]
													}),
													new sap.ui.layout.form.FormElement({
														  visible : false,
													    fields: [oLabelProgressTypeResult, oInputProgressTypeResult]
													}),
													new sap.ui.layout.form.FormElement({
													    fields: [oRCMResultTable]
													}),
													new sap.ui.layout.form.FormElement({
													    fields: [oFlexInAddDeleteRCMR]
													}),
													new sap.ui.layout.form.FormElement({
													    fields: [oBtnMoveResSubmit]
													})
		                                     ]
		                     }),
		                     new sap.ui.layout.form.FormContainer("idRepairCompltnMultipleResultFormC2",{
	                         formElements: []
	                     })
		             ]
		     });
		     	return oRepairCompltnMultipleResultForm;
	},

	updateBindingRCMR: function(){
		oModelMultipleResultRCMR = new sap.ui.model.json.JSONModel();
		oModelMultipleResultRCMR.setData({modelData: arrTransMsgsRCM});
    	sap.ui.getCore().byId("idRCMResultsTbl").setModel(oModelMultipleResultRCMR);
    	sap.ui.getCore().byId("idRCMResultsTbl").bindRows("/modelData");

    	sap.ui.getCore().byId("idRCMResultsTbl").setVisibleRowCount(arrTransMsgsRCM.length);

    	sap.ui.getCore().byId("idDepotDisplayRCMR").setText(depotNameRCMToPass);
	},

	enableSubmitBtnRCMR: function(){
		var successCount = 0;
		for(var i=0; i<arrTransMsgsRCM.length; i++){
			if(arrTransMsgsRCM[i].status == "images/green_signal.png"){
				successCount++;
			}
		}
		if(successCount == arrTransMsgsRCM.length){
			sap.ui.getCore().byId("idBtnMoveResSubmitRCMR").setEnabled(true);
		}
		else{
			sap.ui.getCore().byId("idBtnMoveResSubmitRCMR").setEnabled(false);
		}
	},

	submitValidationRCMR: function(indx){
		busyDialog.open();
		var oCurrent = this;
		var stringToPass = "";

		//for(var i=0; i<arrTransMsgsRCM.length; i++){
			var outDateRCMR = arrTransMsgsRCM[indx].Date;
			var splitDateRCMR = outDateRCMR.split("-");
			
			dateToPassRCMR = outDateRCMR;
		    stringToPass = "";
			//if(stringToPass == ""){
				stringToPass = "IRepairPro1 eq '" + arrTransMsgsRCM[indx].serialNo + "$"
				                            + depotCodeRCMToPass + "$" + arrTransMsgsRCM[indx].UnitPartCode + "$" + arrTransMsgsRCM[indx].EstType + "$M$" + dateToPassRCMR + "'";
			//}

				oModel = new sap.ui.model.odata.ODataModel(serviceUrl15_old, true);
				var urlToCallRCMR = serviceUrl15_old + "/Repair_Progress_ECC?$filter=" + stringToPass;
				//alert("urlToCallRCMR : "+urlToCallRCMR);
				OData.request({
				      requestUri: urlToCallRCMR,
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
				    	oCurrent.FnoDataCallECCProxyRCSuccess("S",indx);
				    },
				    function(err){
				    	oCurrent.FnoDataCallECCProxyRCError("E",indx,err);
				    });
	},

	FnoDataCallECCProxyRCSuccess: function(state,indx){
		var oCurrent = this;
		if(indx == (arrTransMsgsRCM.length-1)){
    		busyDialog.close();
    		sap.ui.commons.MessageBox.alert("Data has been submitted for processing. Please check the processing status for each record via the Portal Processing Log after some time.");
    	}
		else{
			oCurrent.submitValidationRCMR((indx + 1));
		}

	},

	FnoDataCallECCProxyRCError: function(state,indx,err){
		var oCurrent = this;
		if(indx == (arrTransMsgsRCM.length-1)){
			busyDialog.close();
			if(state == "E"){
				errorfromServer(err);
			}
			else{
				sap.ui.commons.MessageBox.alert("Data has been submitted for processing. Please check the processing status for each record via the Portal Processing Log after some time.");
			}
    	}
		else{
			oCurrent.submitValidationRCMR((indx + 1));
		}
	}



});

function okCallBackRepairCompltnMultiple(){
	if(sap.ui.getCore().byId("RepairComplMultiple"))
		sap.ui.getCore().byId("RepairComplMultiple").destroy();
	 var bus = sap.ui.getCore().getEventBus();
  	  	bus.publish("nav", "to", {
        id : "RepairComplMultiple"
	 });
}

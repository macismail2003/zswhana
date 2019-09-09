/******** NP *******/
jQuery.sap.require("sap.ui.model.json.JSONModel");

sap.ui.model.json.JSONModel.extend("validateMoveInMultipleView", {
	
	createValidateMoveInMultiple: function(){
		
		var oCurrVMIM = this;
		
		var bckFrmValidateToAMIM = new sap.m.Link("idBckFrmValidateToAMIM", {
			text: " < Back",
            width:"9%",
            wrapping:true,
            press: function(){
                    var bus = sap.ui.getCore().getEventBus();
                    bus.publish("nav", "back");
            }});
		
		// Labels
		var oLabelDepotValidate = new sap.ui.commons.Label({text: "Depot: ",
			layoutData: new sap.ui.layout.GridData({span: "L1 M3 S3",linebreak: false, margin: true}),
            wrapping: true}).addStyleClass("margin10");
		
		// Text Field
    	var oInputDepotValidate = new sap.ui.commons.TextView("idDepotDisplayAMIMVDTD",{
    		layoutData: new sap.ui.layout.GridData({span: "L9 M9 S9",linebreak: false, margin: true}),
    	}).addStyleClass("margin2 marginTop10");
    	
    	// Table
    	var oValidateInMultipleTable = new sap.ui.table.Table("idTblValidateTDAMIM",{
            firstVisibleRow: 3,
            columnHeaderHeight: 30,
            selectionMode: sap.ui.table.SelectionMode.None,
            width: "50%",
            height:"100%"
    	 }).addStyleClass("fontStyle marginTop15 tblBorder");
    	
    	// Table Columns
    	oValidateInMultipleTable.addColumn(new sap.ui.table.Column({
      		 label: new sap.ui.commons.Label({text: "Serial Number"}),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "serialNo"),
    		 resizable:false,
             sortProperty: "serialNo",
             filterProperty: "serialNo",

    		 }));
    	
    	oValidateInMultipleTable.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Return Date"}),
			 template: new sap.ui.commons.TextView().bindProperty("text", "retDateVal"),
			 resizable:false,
             sortProperty: "retDateVal",
             filterProperty: "retDateVal",
			 }));
    	 
    	oValidateInMultipleTable.addColumn(new sap.ui.table.Column({
    		 label: new sap.ui.commons.Label({text: "Authorisation"}),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "auth"),
    		 resizable:false,
             sortProperty: "auth",
             filterProperty: "auth",
    		 }));
    	
    	oValidateInMultipleTable.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Status 'A'"}),
		   	 template: new sap.ui.commons.CheckBox().bindProperty("checked", "statusA"),
		   	 resizable:false,
	         sortProperty: "checked",
	         filterProperty: "checked",
	         hAlign: "Center"
			 }));
   	 
    	oValidateInMultipleTable.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Tank Details"}),
	   		 template: new sap.ui.commons.TextView().bindProperty("text", "tankDetails"),
	   		 resizable:false,
	            sortProperty: "tankDet",
	            filterProperty: "tankDet",
	   		 }));
    	
    	// Buttons
	   	 var oBtnMultipleValidate = new sap.m.Button("idBtnMultipleValidateVAMIM",{
		          text : "Validate",
		          width:"80px",
		          styled:false,
		          layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
		          press:function(){
		        	  oCurrVMIM.validateDataAMIM();
		        	  }}).addStyleClass("submitBtn marginTop10");
	   	 
	  // Responsive Grid Layout
		    var oValidateInMultipleLayout = new sap.ui.layout.form.ResponsiveGridLayout("idValidateInMultipleLayout",{
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
		     var oValidateInMultipleForm = new sap.ui.layout.form.Form("idValidateInMultipleForm",{
		             layout: oValidateInMultipleLayout,
		             formContainers: [
		                     
		                     new sap.ui.layout.form.FormContainer("idValidateInMultipleFormC1",{
	                             formElements: [
													new sap.ui.layout.form.FormElement({
													    fields: [bckFrmValidateToAMIM]
													}),
													new sap.ui.layout.form.FormElement({
													    fields: [oLabelDepotValidate, oInputDepotValidate]
													}),
													new sap.ui.layout.form.FormElement({
													    fields: [oValidateInMultipleTable]
													}),
													new sap.ui.layout.form.FormElement({
													    fields: [oBtnMultipleValidate]
													})
		                                     ]
		                     })
		             ]
		     });
		     	return oValidateInMultipleForm;
	},
	
	validateDataAMIM: function(){
		busyDialog.open();
		
		aSubmitInMultipleSMIM = [];
		
		var currDateAMIM = new Date();
		var currYearAMIM = currDateAMIM.getFullYear();
		var currMonthAMIM = currDateAMIM.getMonth()+1;
		var currDayAMIM = currDateAMIM.getDate();
		
		var incorrectSerNoFlagAMIM = true;
		var incorrectDateFlagAMIM = true;
		var incorrectSerNoDateFlagAMIM = true;
		
		for(var i=0;i<aMoveInMultipleAMIM.length; i++){
			
			 var splitDateAMIM = "";
			 var selYearAMIM = "";
			 var selMonthAMIM = "";
			 var selDayAMIM = "";
			
			 incorrectSerNoFlagAMIM = true;
			 incorrectDateFlagAMIM = true;
			 incorrectSerNoDateFlagAMIM = true;
			 
			 var retDateAMIM = aMoveInMultipleAMIM[i].retDateVal;
		        
			 var rxDatePattern = /^(\d{1,2})(\-|-)(\d{1,2})(\-|-)(\d{4})$/;
			    var dtArray = retDateAMIM.match(rxDatePattern);
				
			    if (dtArray == null){
			    	incorrectDateFlagAMIM = false;
			    }
			    else{
			    	 splitDateAMIM = retDateAMIM.split("-");
					
					 selYearAMIM = splitDateAMIM[2];
					 selMonthAMIM = splitDateAMIM[1];
					 selDayAMIM = splitDateAMIM[0];
			    }
			
			if(aMoveInMultipleAMIM[i].serialNo.trim().length >0 && aMoveInMultipleAMIM[i].serialNo.trim().length != 11){
				incorrectSerNoFlagAMIM = false;
				}
			if(selMonthAMIM == 2){
				var isleap = (selYearAMIM % 4 == 0 && (selYearAMIM % 100 != 0 || selYearAMIM % 400 == 0));
			     if (selDayAMIM> 29 || (selDayAMIM ==29 && !isleap)){
				    	 incorrectDateFlagAMIM = false;
				     }
			}
			if((dtArray == null) && (aMoveInMultipleAMIM[i].serialNo.length >0 && aMoveInMultipleAMIM[i].serialNo.length != 11)){
				incorrectSerNoDateFlagAMIM = false;
			}
			if((aMoveInMultipleAMIM[i].serialNo.length >0 && aMoveInMultipleAMIM[i].serialNo.length != 11) && (selMonthAMIM == 2)){
				var isleap = (selYearAMIM % 4 == 0 && (selYearAMIM % 100 != 0 || selYearAMIM % 400 == 0));
			     if (selDayAMIM> 29 || (selDayAMIM ==29 && !isleap)){
			    	 incorrectSerNoDateFlagAMIM = false;
			     }
			}
			
			if(incorrectSerNoDateFlagAMIM == false){
				aSubmitInMultipleSMIM.push({
					"checked": false,
					"status": "images/red_signal.png",
					"serialNo": aMoveInMultipleAMIM[i].serialNo.trim().toUpperCase(),
					"retDate": aMoveInMultipleAMIM[i].retDateVal,
					"auth": aMoveInMultipleAMIM[i].auth,
					"statusA": aMoveInMultipleAMIM[i].statusA,
					"tankDet": aMoveInMultipleAMIM[i].tankDetails,
					"warningError": "Incorrect Serial Number and Date",
					"statusAVal": "",
					"unoNo": aMoveInMultipleAMIM[i].unNo,
					"lastClnDate": aMoveInMultipleAMIM[i].lastClnDate,
					"lastCargoDesc": aMoveInMultipleAMIM[i].lastCargoDesc,
					"clnProcDesc": aMoveInMultipleAMIM[i].clnProcDesc
				});
			}
			else if(incorrectDateFlagAMIM == false){
				aSubmitInMultipleSMIM.push({
					"checked": false,
					"status": "images/red_signal.png",
					"serialNo": aMoveInMultipleAMIM[i].serialNo.trim().toUpperCase(),
					"retDate": aMoveInMultipleAMIM[i].retDateVal,
					"auth": aMoveInMultipleAMIM[i].auth,
					"statusA": aMoveInMultipleAMIM[i].statusA,
					"tankDet": aMoveInMultipleAMIM[i].tankDetails,
					"warningError": "Incorrect Date",
					"statusAVal": "",
					"unoNo": aMoveInMultipleAMIM[i].unNo,
					"lastClnDate": aMoveInMultipleAMIM[i].lastClnDate,
					"lastCargoDesc": aMoveInMultipleAMIM[i].lastCargoDesc,
					"clnProcDesc": aMoveInMultipleAMIM[i].clnProcDesc
				});
			}
			else if(incorrectSerNoFlagAMIM == false){
				aSubmitInMultipleSMIM.push({
					"checked": false,
					"status": "images/red_signal.png",
					"serialNo": aMoveInMultipleAMIM[i].serialNo.trim().toUpperCase(),
					"retDate": aMoveInMultipleAMIM[i].retDateVal,
					"auth": aMoveInMultipleAMIM[i].auth,
					"statusA": aMoveInMultipleAMIM[i].statusA,
					"tankDet": aMoveInMultipleAMIM[i].tankDetails,
					"warningError": "Incorrect Serial Number",
					"statusAVal": "",
					"unoNo": aMoveInMultipleAMIM[i].unNo,
					"lastClnDate": aMoveInMultipleAMIM[i].lastClnDate,
					"lastCargoDesc": aMoveInMultipleAMIM[i].lastCargoDesc,
					"clnProcDesc": aMoveInMultipleAMIM[i].clnProcDesc
				});
			}
				else{
					aSubmitInMultipleSMIM.push({
						"checked": false,
						"status": "images/green_signal.png",
						"serialNo": aMoveInMultipleAMIM[i].serialNo.trim().toUpperCase(),
						"retDate": aMoveInMultipleAMIM[i].retDateVal,
						"auth": aMoveInMultipleAMIM[i].auth,
						"statusA": aMoveInMultipleAMIM[i].statusA,
						"tankDet": aMoveInMultipleAMIM[i].tankDetails,
						"warningError": "",
						"statusAVal": "",
						"unoNo": aMoveInMultipleAMIM[i].unNo,
						"lastClnDate": aMoveInMultipleAMIM[i].lastClnDate,
						"lastCargoDesc": aMoveInMultipleAMIM[i].lastCargoDesc,
						"clnProcDesc": aMoveInMultipleAMIM[i].clnProcDesc
					});
				}
				}
		
		busyDialog.close();
		var bus = sap.ui.getCore().getEventBus();
  	  	bus.publish("nav", "to", {
        id : "SubmitMoveInMultiple"
	  	});
  	  	
  	  var oObjSubmitMovemntInMultiple = new submitMovemntInMultipleView();
  	oObjSubmitMovemntInMultiple.updateBindingSubmitValidationAMIM();
  	oObjSubmitMovemntInMultiple.enableSubmitBtnSAMIM();
	},
	
	updateBindingValidateAMIM: function(){
    	var oModelValidateInMultiple = new sap.ui.model.json.JSONModel();
    	oModelValidateInMultiple.setData({modelData: aMoveInMultipleAMIM});
    	sap.ui.getCore().byId("idTblValidateTDAMIM").setModel(oModelValidateInMultiple);
    	sap.ui.getCore().byId("idTblValidateTDAMIM").bindRows("/modelData");
    	
    	sap.ui.getCore().byId("idTblValidateTDAMIM").setVisibleRowCount(aMoveInMultipleAMIM.length);
	
    	sap.ui.getCore().byId("idDepotDisplayAMIMVDTD").setText(selectedDepotToPassAMIM);
	},
});
		
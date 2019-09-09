/******** NP *******/
jQuery.sap.require("sap.ui.model.json.JSONModel");

sap.ui.model.json.JSONModel.extend("tankDetailsInMultipleView", {
	
	createTankDetailsInMultiple: function(){
		
		var oCurrTDAMIM = this;
		
		var bckFrmTankDetToAMIM = new sap.m.Link("idBckFrmTankDetToAMIM", {
			text: " < Back",
            width:"9%",
            wrapping:true,
            press: function(){
                    var bus = sap.ui.getCore().getEventBus();
                    bus.publish("nav", "back");
            }});
		
		// Labels
		var oLabelDepotTankDet = new sap.ui.commons.Label({text: "Depot:",
			layoutData: new sap.ui.layout.GridData({span: "L1 M3 S3",linebreak: false, margin: true}),
            wrapping: true}).addStyleClass("margin10");
		
		// Text Field
    	var oInputDepotTankDet = new sap.ui.commons.TextView("idDepotDisplayAMIMTDR",{
    		layoutData: new sap.ui.layout.GridData({span: "L9 M9 S9",linebreak: false, margin: true}),
    	}).addStyleClass("margin2 marginTop10");
    	
    	// Table
    	var oTankDetMultipleTable = new sap.ui.table.Table("idTblTankDetUTAMIM",{
            firstVisibleRow: 3,
            columnHeaderHeight: 30,
            selectionMode: sap.ui.table.SelectionMode.None,
            height:"100%"
    	 }).addStyleClass("fontStyle marginTop15 tblBorder");
    	
    	// Table Columns
    	oTankDetMultipleTable.addColumn(new sap.ui.table.Column({
      		 label: new sap.ui.commons.Label({text: "Serial Number"}),
    		 template: new sap.ui.commons.TextView({textAlign:"Left"}).bindProperty("text", "serialNo"),
             sortProperty: "serialNo",
             filterProperty: "serialNo",
             resizable:false,
             width:"60px"
    		 }));
    	
    	oTankDetMultipleTable.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "UN No"}),
			 template: new sap.ui.commons.TextField("idTankDetUnNoAMIM",{textAlign:"Left"}).bindProperty("value", "unNo").addStyleClass("borderStyle"),
             sortProperty: "unNo",
             filterProperty: "unNo",
             resizable:false,
             width:"60px"
			 }));
    	
    	var oModelCurrDateTAMIM = new sap.ui.model.json.JSONModel();
    	oModelCurrDateTAMIM.setData({
	   		dateValue: new Date()
		});
    	
    	var oOutDateTAMIM = new sap.ui.commons.DatePicker("idOutDateInputTAMIM",{
    		//width:"120px",
    		//textAlign:"Right",
			  value: {
				  path: "{lastCleanDate}",
			  type: new sap.ui.model.type.Date({pattern: "dd-MM-yyyy"})},
			}).addStyleClass("margin5 paddingRight15");
	   	
    	//oOutDateTAMIM.setModel(oModelCurrDateTAMIM);
    	
    	/*oOutDateTAMIM.attachChange(
                function(oEvent){
                        if(oEvent.getParameter("invalidValue")){
                                oEvent.oSource.setValueState(sap.ui.core.ValueState.Error);
                                oEvent.oSource.setValue("");
                                oEvent.oSource.setPlaceholder("Invalid Value");
                        }else{
                                oEvent.oSource.setValueState(sap.ui.core.ValueState.None);
                                	var editDate = this.getValue();
	              				  	var id = this.sId.replace('idOutDateInputTAMIM-col2','idOutDateInputCopyTAMIM-col5');
	              				  	var oidTxtVwRetTbl = sap.ui.getCore().byId(id);
	              				  	oidTxtVwRetTbl.setText(editDate);
                        }
                }
    	);*/
    	 
    	oTankDetMultipleTable.addColumn(new sap.ui.table.Column({
    		//visible:false,
    		 label: new sap.ui.commons.Label({text: "Last Cleaning Date"}),
    		 template: oOutDateTAMIM.addStyleClass("borderStyle"),
             sortProperty: "lastCleanDate",
             filterProperty: "lastCleanDate",
             resizable:false,
             width:"60px"
    		 }));
    	
    	oTankDetMultipleTable.addColumn(new sap.ui.table.Column({
    		label: new sap.ui.commons.Label({text: "Last Cargo Desc"}),
    		template: new sap.ui.commons.TextField("idTankDetLastcargoDescAMIM",{textAlign:"Left"}).bindProperty("value", "cargoDesc").addStyleClass("borderStyle"),
            sortProperty: "cargoDesc",
            filterProperty: "cargoDesc",
            resizable:false,
            width:"80px"
        	}));
    	oTankDetMultipleTable.addColumn(new sap.ui.table.Column({
    		label: new sap.ui.commons.Label({text: "Cleaning Process Desc"}),
    		template: new sap.ui.commons.TextField("idTankDetCleanProcDescAMIM",{textAlign:"Left"}).bindProperty("value", "cleanProcDesc").addStyleClass("borderStyle"),
            sortProperty: "cleanProcDesc",
            filterProperty: "cleanProcDesc",
            resizable:false,
            width:"80px"
        	}));
    	
    	/*oTankDetMultipleTable.addColumn(new sap.ui.table.Column({
    		template: new sap.ui.commons.TextView("idOutDateInputCopyTAMIM").bindProperty("text", "lastCleanDate"),
           width:"0px",
           resizable:false,
			 }));*/
    	
    	var oBtnTankDetUpdate = new sap.m.Button("idBtnTankDetUpdateTDAMIM",{
	          text : "Update",
	          width:"80px",
	          styled:false,
	          layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
	          press:function(){
	        	  oCurrTDAMIM.updateTankDetailsAMIM();
	        	  }}).addStyleClass("submitBtn marginRight");
	   	 
	   	 var oBtnTankDetCancel = new sap.m.Button("idBtnTankDetCancelTDAMIM",{
		          text : "Cancel",
		          width:"80px",
		          styled:false,
		          layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
		          press:function(){
		        	  oCurrTDAMIM.cancelTankDetailsAMIM();
		        	  }}).addStyleClass("submitBtn");
	   	 
	   	var oFlexInButtons = new sap.m.FlexBox({
	           items: [
						oBtnTankDetUpdate,
						oBtnTankDetCancel
	           ],
	           direction : "Row",
				}).addStyleClass("marginTop10");
    	
    	// Responsive Grid Layout
	    var oTankDetMultipleLayout = new sap.ui.layout.form.ResponsiveGridLayout("idTankDetMultipleLayout",{
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
	     var oTankDetMultipleForm = new sap.ui.layout.form.Form("idTankDetMultipleForm",{
	             layout: oTankDetMultipleLayout,
	             formContainers: [
	                     
	                     new sap.ui.layout.form.FormContainer("idTankDetMultipleFormC1",{
                             formElements: [
												new sap.ui.layout.form.FormElement({
												    fields: [bckFrmTankDetToAMIM]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oLabelDepotTankDet, oInputDepotTankDet]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oTankDetMultipleTable]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oFlexInButtons]
												})
	                                     ]
	                     })
	             ]
	     });
	     	return oTankDetMultipleForm;
	},
	
	updateTankDetailsAMIM: function(){
		busyDialog.open();

		for(var i=0; i<unitsTankTypeAMIM.length; i++){
			if(unitsTankTypeAMIM[i].unNo != "" || unitsTankTypeAMIM[i].lastCleanDate != "" || unitsTankTypeAMIM[i].cargoDesc != "" || unitsTankTypeAMIM[i].cleanProcDesc != ""){
			//if(unitsTankTypeAMIM[i].unNo != "" || unitsTankTypeAMIM[i].cargoDesc != "" || unitsTankTypeAMIM[i].cleanProcDesc != ""){
				unitsTankTypeAMIM[i].unNo = sap.ui.getCore().byId("idTankDetUnNoAMIM-col1-row"+i).getValue();
				unitsTankTypeAMIM[i].lastCleanDate = sap.ui.getCore().byId("idOutDateInputTAMIM-col2-row"+i).getValue();
				unitsTankTypeAMIM[i].cargoDesc = sap.ui.getCore().byId("idTankDetLastcargoDescAMIM-col3-row"+i).getValue();
				unitsTankTypeAMIM[i].cleanProcDesc = sap.ui.getCore().byId("idTankDetCleanProcDescAMIM-col4-row"+i).getValue();
				unitsTankTypeAMIM[i].tankDetails = "Done";
			}
			else{
				unitsTankTypeAMIM[i].unNo = "";
				unitsTankTypeAMIM[i].lastCleanDate = sap.ui.getCore().byId("idOutDateInputTAMIM-col2-row"+i).getValue();
				unitsTankTypeAMIM[i].cargoDesc = "";
				unitsTankTypeAMIM[i].cleanProcDesc = "";
				unitsTankTypeAMIM[i].tankDetails = "Not Entered";
			}
		}
		for(var j=0; j<unitsTankTypeAMIM.length; j++){
			var unitMatch = jQuery.grep(aMoveInMultipleAMIM, function(element, index){
	             return element.serialNo.toUpperCase() == unitsTankTypeAMIM[j].serialNo.toUpperCase();
	     	});
			if(unitMatch.length > 0){
				unitMatch[0].tankDetails = unitsTankTypeAMIM[j].tankDetails;
				unitMatch[0].unNo = unitsTankTypeAMIM[j].unNo;
				unitMatch[0].lastClnDate = unitsTankTypeAMIM[j].lastCleanDate;
				unitMatch[0].lastCargoDesc = unitsTankTypeAMIM[j].cargoDesc;
				unitMatch[0].clnProcDesc = unitsTankTypeAMIM[j].cleanProcDesc;
			}
		}
		busyDialog.close();
		var bus = sap.ui.getCore().getEventBus();
	  	  	bus.publish("nav", "to", {
	        id : "ValidateMoveInMultiple"
  	  	});
	  	  var oObjValidateMoveInMultiple = new validateMoveInMultipleView();
		  	oObjValidateMoveInMultiple.updateBindingValidateAMIM();
	},
	
	cancelTankDetailsAMIM: function(){
		busyDialog.open();

		for(var j=0; j<unitsTankTypeAMIM.length; j++){
			var unitMatch = jQuery.grep(aMoveInMultipleAMIM, function(element, index){
	             return element.serialNo.toUpperCase() == unitsTankTypeAMIM[j].serialNo.toUpperCase();
	     	});
			if(unitMatch.length > 0){
				unitMatch[0].tankDetails = unitsTankTypeAMIM[j].tankDetails;
				unitMatch[0].unNo = "";
				unitMatch[0].lastClnDate = "";
				unitMatch[0].lastCargoDesc = "";
				unitMatch[0].clnProcDesc = "";
			}
		}
		busyDialog.close();
		var bus = sap.ui.getCore().getEventBus();
	  	  	bus.publish("nav", "to", {
	        id : "ValidateMoveInMultiple"
  	  	});
	  	  var oObjValidateMoveInMultiple = new validateMoveInMultipleView();
		  	oObjValidateMoveInMultiple.updateBindingValidateAMIM();
	},
	
	updateBindingTankDetAMIM: function(){
    	var oModelTankDetMultiple = new sap.ui.model.json.JSONModel();
    	oModelTankDetMultiple.setData({modelData: unitsTankTypeAMIM});
    	sap.ui.getCore().byId("idTblTankDetUTAMIM").setModel(oModelTankDetMultiple);
    	sap.ui.getCore().byId("idTblTankDetUTAMIM").bindRows("/modelData");
    	
    	sap.ui.getCore().byId("idTblTankDetUTAMIM").setVisibleRowCount(unitsTankTypeAMIM.length);
	
    	sap.ui.getCore().byId("idDepotDisplayAMIMTDR").setText(selectedDepotToPassAMIM);
	}
});
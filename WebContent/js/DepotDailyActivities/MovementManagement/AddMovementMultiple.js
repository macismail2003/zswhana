/******** NP *******/
jQuery.sap.require("sap.ui.model.json.JSONModel");


var dtTodayAMOMltpl = new Date();

var frmtAMOMYYYYMMDD = [dtTodayAMOMltpl.getFullYear(),padZero(dtTodayAMOMltpl.getMonth()+1),padZero(dtTodayAMOMltpl.getDate())].join('');

var aMoveMultipleAMOM = [];

var aTempAMOM = [];
var loggedInUserTypeAMOM = "";
var oModelMoveMultipleAMOM = new sap.ui.model.json.JSONModel();
oModelMoveMultipleAMOM.setData({modelData: aMoveMultipleAMOM});

var vInputDepotMValAMOM = "";
var oInputDepotAMOM;
var arrayLenAMM;
var checkedLengthAMOM = 0;
var depotNameListAMOM = [];
var depotNameAMOMToPass;
var depotCodeAMOMToPass;
var arrTransMsgsAMOM = [];
var vInputDepotListAMOM = "";
var flagOnChangeDepotNameAMOM = false;
var flagOnChangeDepotCodeAMOM = false;
var validAMOMFieldsStatus = true;
var validAMOMStatus = true;

sap.ui.model.json.JSONModel.extend("addMovemntMultipleView", {
	
	createAddMovemntMultiple: function(){
		aMoveMultipleAMOM.length = 0;
		aMoveMultipleAMOM.push({checked: false, serialNo: "", frmtAMOMYYYYMMDD: frmtAMOMYYYYMMDD, outDate: dtTodayAMOMltpl, auth: "", placeHolderSrno: "", placeHolderAuth: "", placeHolderDate: "", valuestateSrno:sap.ui.core.ValueState.None, valuestateAuth:sap.ui.core.ValueState.None, valuestateDate:sap.ui.core.ValueState.None});
		aMoveMultipleAMOM.push({checked: false, serialNo: "", frmtAMOMYYYYMMDD: frmtAMOMYYYYMMDD, outDate: dtTodayAMOMltpl, auth: "", placeHolderSrno: "", placeHolderAuth: "", placeHolderDate: "", valuestateSrno:sap.ui.core.ValueState.None, valuestateAuth:sap.ui.core.ValueState.None, valuestateDate:sap.ui.core.ValueState.None});
		aMoveMultipleAMOM.push({checked: false, serialNo: "", frmtAMOMYYYYMMDD: frmtAMOMYYYYMMDD, outDate: dtTodayAMOMltpl, auth: "", placeHolderSrno: "", placeHolderAuth: "", placeHolderDate: "", valuestateSrno:sap.ui.core.ValueState.None, valuestateAuth:sap.ui.core.ValueState.None, valuestateDate:sap.ui.core.ValueState.None});
		aMoveMultipleAMOM.push({checked: false, serialNo: "", frmtAMOMYYYYMMDD: frmtAMOMYYYYMMDD, outDate: dtTodayAMOMltpl, auth: "", placeHolderSrno: "", placeHolderAuth: "", placeHolderDate: "", valuestateSrno:sap.ui.core.ValueState.None, valuestateAuth:sap.ui.core.ValueState.None, valuestateDate:sap.ui.core.ValueState.None});
		aMoveMultipleAMOM.push({checked: false, serialNo: "", frmtAMOMYYYYMMDD: frmtAMOMYYYYMMDD, outDate: dtTodayAMOMltpl, auth: "", placeHolderSrno: "", placeHolderAuth: "", placeHolderDate: "", valuestateSrno:sap.ui.core.ValueState.None, valuestateAuth:sap.ui.core.ValueState.None, valuestateDate:sap.ui.core.ValueState.None});
		var oCurrAMOM = this;
		// Labels
		var oLabelDepotM = new sap.ui.commons.Label({text: "Depot:",
			required: true,
			layoutData: new sap.ui.layout.GridData({span: "L1 M4 S12",linebreak: false, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");
		
		var oLabelMandatoryM = new sap.ui.commons.Label({text: "Mandatory Field",
			required: true,
			requiredAtBegin : true,
            wrapping: true}).addStyleClass("margin10 marginTopBot30");
		
		var oLabelSpaceAMOM = new sap.ui.commons.Label({text: " ",
			width:"8px",
            wrapping: true});
		
		var oComboDepotAMOM = new sap.ui.core.HTML("idListDepotComboAMOM",{layoutData: new sap.ui.layout.GridData({span: "L4 M6 S12"})});
		var htmlContentDepot = '<input id="idComboDepotAMOM" placeholder="Select Depot" class="FormInputStyle marginTop10" style="width:100%">';
		oComboDepotAMOM.setContent(htmlContentDepot);
		
	    /*var oComboDepotAMOM = new sap.ui.commons.DropdownBox("idComboDepotAMOM", {
			  layoutData: new sap.ui.layout.GridData({span: "L5 M5 S4"}),
			  change:function(){
				  this.setValueState(sap.ui.core.ValueState.None);
				  this.setPlaceholder("Select Depot");
				  var keyAMOM = this.getSelectedKey();
				  var partsAMOM = keyAMOM.split(" ");
				  var lastPartAMOM = partsAMOM[partsAMOM.length - 2];
				  oInputDepotAMOM.setValue(lastPartAMOM);
				 //oController.EquipClassChange();
			  },
			  items: {
	                path: "/",
	                template: new sap.ui.core.ListItem({key:"{IdName}", text: "{IdName}"})
			  },
	          displaySecondaryValues:false, placeholder:"Select Depot"}).addStyleClass("FormInputStyle");*/
	    
	    
	 // Text Field
    	oInputDepotAMOM = new sap.ui.commons.TextField('idDepotAMOM',{
    		layoutData: new sap.ui.layout.GridData({span: "L2 M3 S12",linebreak: false, margin: true}),
    		placeholder:"Depot Code",
    		/*change: function(){
    			flagOnChangeDepotCodeAMOM = true;
    		}*/
    	}).addStyleClass("FormInputStyle marginTop10");
    	
    	oInputDepotAMOM.attachChange(
                function(oEvent){
                        if(isNaN(oInputDepotAMOM.getValue())){
                                oEvent.oSource.setValueState(sap.ui.core.ValueState.Error);
                                oEvent.oSource.setValue("");
                                oEvent.oSource.setPlaceholder("Invalid Value");
                        }else{
                                oEvent.oSource.setValueState(sap.ui.core.ValueState.None);
                        }
                }
    		);
    	
    	// Buttons
	   	 var oBtnMoveValidate = new sap.m.Button("idBtnMoveValidateAMOM",{
		          text : "Validate",
		          width:"80px",
		          styled:false,
		          layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
		          press:function(){
		        	  oCurrAMOM.validateMoveOutMultiple();
		          }}).addStyleClass("submitBtn marginTop20");
	   	 
	   	var oBtnMoveRemoveFilter = new sap.m.Button("idBtnMoveRemoveFilterAMOM",{
	          text : "Remove Filter",
	          //width:"115px",
	          styled:false,
	          enabled:false,
	          layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: false, margin: true}),
	          press:function(){
	        	  oInputDepotAMOM.setValue("");
	        	  $("#idComboDepotAMOM").val("");
		          this.setEnabled(false);
		          }}).addStyleClass("submitBtn marginTop10");
	   	 
	   	 var oBtnMoveApplyFilter = new sap.m.Button("idBtnMoveApplyFilterAMOM",{
		          text : "Apply Filter",
		          //width:"115px",
		          styled:false,
		          layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: false, margin: true}),
		          press:function(){
		        	  //alert("Filter applied");
		        	  if(oInputDepotAMOM.getValue() == ""/* && document.getElementById("idComboDepotAMOM").value == ""*/){
		        		  /*document.getElementById("idComboDepotAMOM").style.borderColor = "red";
		        		  document.getElementById("idComboDepotAMOM").style.background = "#FAD4D4";*/
		        		  /*oInputDepotAMOM.setValueState(sap.ui.core.ValueState.Error);
		        		  oInputDepotAMOM.setValue("");
		        		  oInputDepotAMOM.setPlaceholder("Required");*/
		        		  $("#idComboDepotAMOM").val("");
		          	  }
		          	  else{
		          		sap.ui.getCore().byId("idBtnMoveRemoveFilterAMOM").setEnabled(true);
		          		document.getElementById("idComboDepotAMOM").style.borderColor = "#cccccc";
		        		document.getElementById("idComboDepotAMOM").style.background = "#ffffff";
		        		/*oInputDepotAMOM.setPlaceholder("");
		          		  if(document.getElementById("idComboDepotAMOM").value == ""){*/
				          		var depotCodeAMOM = new RegExp(oInputDepotAMOM.getValue());
				          		  for(var i=0; i<depotNameListAMOM.length; i++){
				          			var depotNameAMOM = depotNameListAMOM[i];
					          		var resultAMOM = depotCodeAMOM.test(depotNameAMOM);
					          		if(resultAMOM){
					          			$("#idComboDepotAMOM").val(depotNameAMOM);
					          			break;
					          		}
					          		else{
					          			 $("#idComboDepotAMOM").val("");
					          		}
				          		  }
		          		  /*}
		          		  if(oInputDepotAMOM.getValue() == ""){
		          			var keyAMOM = document.getElementById("idComboDepotAMOM").value;
						    var partsAMOM = keyAMOM.split("-");
						    var lastPartAMOM = partsAMOM[partsAMOM.length - 2];
						    oInputDepotAMOM.setValue(lastPartAMOM);
						    oInputDepotAMOM.setValueState(sap.ui.core.ValueState.None);
		          		  }
		          		if(flagOnChangeDepotNameAMOM){
		          			var keyAMOM = document.getElementById("idComboDepotAMOM").value;
						    var partsAMOM = keyAMOM.split("-");
						    var lastPartAMOM = partsAMOM[partsAMOM.length - 2];
						    oInputDepotAMOM.setValue(lastPartAMOM);
						    oInputDepotAMOM.setValueState(sap.ui.core.ValueState.None);
						    flagOnChangeDepotCodeAMOM = false;
						    flagOnChangeDepotNameAMOM = false;
		          		  }
		          		  if(flagOnChangeDepotCodeAMOM){
		          			var depotCodeAMOM = new RegExp(oInputDepotAMOM.getValue());
			          		  for(var i=0; i<depotNameListAMOM.length; i++){
			          			var depotNameAMOM = depotNameListAMOM[i];
				          		var resultAMOM = depotCodeAMOM.test(depotNameAMOM);
				          		if(resultAMOM){
				          			$("#idComboDepotAMOM").val(depotNameAMOM);
				          			break;
				          		}
			          		  }
		          		  }*/
		          	  }
		        	  }}).addStyleClass("submitBtn marginTop10");
	   	 
	   	var oFlexApplyRemoveAMOM = new sap.m.FlexBox({
	           items: [
						oBtnMoveApplyFilter,
						oLabelSpaceAMOM,
						oBtnMoveRemoveFilter
	           ],
	           layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12",linebreak: false, margin: false}),
	           direction : "Row",
				});
	   	 
	   	var oImageAddMOM = new sap.ui.commons.Image("imgAddMOM",{
	   		press: function() {
	   			//alert("image clicked");
	   		}
	   	});
	   	oImageAddMOM.setSrc("images/add_row.png");
	   	oImageAddMOM.setTooltip("Add New Row");
	   	oImageAddMOM.setDecorative(false);
	   	oImageAddMOM.addStyleClass("marginTop20 marginRight5");
	   	
	   	var MaxLimitReachedMessage = "Max row limit of 25 reached. Please submit these rows and then add more unit numbers.";
	   	
	   	var oBtnAddNewRow = new sap.ui.commons.Link({
	        text: "Add New Row", 
	        tooltip: "Add New Row",
	        layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: false, margin: true}),
	        press: function() {
	        	var currentArrayLen = aMoveMultipleAMOM.length;
	        	if(currentArrayLen == 25){
	        		sap.ui.commons.MessageBox.show(MaxLimitReachedMessage,
	                        sap.ui.commons.MessageBox.Icon.WARNING,
	                        "Warning",
	                        [sap.ui.commons.MessageBox.Action.OK], 
	                            sap.ui.commons.MessageBox.Action.OK);
	        	}
	        	else{
	        		aMoveMultipleAMOM.push({
        		  'checked':false,
                  'serialNo':"",
                  'frmtAMOMYYYYMMDD': frmtAMOMYYYYMMDD,
                  'outDate': dtTodayAMOMltpl,
                  'auth':"",
                      });
	        		oModelMoveMultipleAMOM.updateBindings();
				        oMoveMultipleTable.setVisibleRowCount(aMoveMultipleAMOM.length);
				        currentArrayLen = currentArrayLen + 1;
	        	}
	        }}).addStyleClass("marginTop25 marginRight");
	   	
	   	var oImageDeleteMOM = new sap.ui.commons.Image("imgDeleteMOM");
	   	oImageDeleteMOM.setSrc("images/delete_row.png");
	   	oImageDeleteMOM.setTooltip("Add New Row");
	   	oImageDeleteMOM.setDecorative(false);
	   	oImageDeleteMOM.addStyleClass("marginTop20 marginRight5");
	   	
	   	var oBtnDeleteRow = new sap.ui.commons.Link({
	        text: "Delete Checked Rows", 
	        tooltip: "Delete Checked Rows",
	        layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: false, margin: true}),
	        press: function() {
	        	//sap.ui.getCore().byId("idCBSelectAllRows").setChecked(false);
	        	  arrayLenAMM = aMoveMultipleAMOM.length;
	        	  var unCheckedCount = 0;
	        	  for(var j=0; j<arrayLenAMM; j++){
	        		  if(aMoveMultipleAMOM[j].checked == false){
	        			  unCheckedCount++;
	        		  }
	        	  }
	        	  if(unCheckedCount == arrayLenAMM){
	        		  sap.ui.commons.MessageBox.show("Please select atleast 1 row for deletion!",
	                            sap.ui.commons.MessageBox.Icon.WARNING,
	                            "Warning",
	                            [sap.ui.commons.MessageBox.Action.OK],
	                            sap.ui.commons.MessageBox.Action.OK);
	        	  }
	        	  else{
		        	  for(var i=arrayLenAMM-1; i>=0; i--){
		        		  if(aMoveMultipleAMOM[i].checked){
		        			  aMoveMultipleAMOM.splice(i,1);
		        			  oModelMoveMultipleAMOM.updateBindings();
		        			  arrayLenAMM = arrayLenAMM - 1;
		        		  }
		        	  }
	        	  oMoveMultipleTable.setVisibleRowCount(arrayLenAMM);
	        	  }
	          }}).addStyleClass("marginTop25");
	   	
	   	var oFlexInAddDelete = new sap.m.FlexBox({
	           items: [
						oImageAddMOM,
						oBtnAddNewRow,
						oImageDeleteMOM,
						oBtnDeleteRow
	           ],
	           direction : "Row",
				});
	   	
	 // Table
    	var oMoveMultipleTable = new sap.ui.table.Table("idTblAdMovOutMultiplAMOM",{
    		visibleRowCount: 5,
            firstVisibleRow: 3,
            columnHeaderHeight: 40,
            selectionMode: sap.ui.table.SelectionMode.None,
            width:"60%",
            height:"100%"
    	 }).addStyleClass("fontStyle marginTop33 tblBorder");
    	
    	// Table Columns
    	oMoveMultipleTable.addColumn(new sap.ui.table.Column({
    		/*label: new sap.ui.commons.CheckBox("idCBSelectAllRows",{
    			 change : function() {
    				 if(this.getChecked()){
    					 for(var i=0; i<aMoveMultipleAMOM.length; i++){
    						 aMoveMultipleAMOM[i].checked = true;
    						 oModelMoveMultipleAMOM.updateBindings();
    					 }
    				 }
    				 else{
    					 for(var i=0; i<aMoveMultipleAMOM.length; i++){
    						 aMoveMultipleAMOM[i].checked = false;
    						 oModelMoveMultipleAMOM.updateBindings();
    					 }
    				 }
    				 ;}
    		}).bindProperty("checked", "isChecked"),*/
        	template: new sap.ui.commons.CheckBox({
   			 change : function() {
   				 if(this.getChecked() == false){
   					//sap.ui.getCore().byId("idCBSelectAllRows").setChecked(false);
   					checkedLengthAMOM--;
   				 }
   				 else{
   					checkedLengthAMOM++;
   				 }
   				/*if(checkedLengthAMOM == aMoveMultipleAMOM.length){
   					sap.ui.getCore().byId("idCBSelectAllRows").setChecked(true);
   				}*/
   			 }
		}).bindProperty("checked", "checked"),
        	width:"20px",
        	resizable:false,
        	hAlign: "Center"}));
    	
    	/*oMoveMultipleTable.addColumn(new sap.ui.table.Column({
        	template: new sap.ui.commons.CheckBox().bindProperty("checked", "checked"),
        	sortProperty: "checked",
        	filterProperty: "checked",
        	width:"5%",
        	hAlign: "Center"}));*/
    	
    	var arrEnteredSerNo = [];
    	
    	oMoveMultipleTable.addColumn(new sap.ui.table.Column({
      		 label: new sap.ui.commons.Label({text: "Serial Number", required: true}),
    		 template: new sap.ui.commons.TextField("idSerNoAMOMInput",{textAlign:"Left",
    			 change: function(){
    				 if(this.getValue() != ""){
    					 this.setValueState(sap.ui.core.ValueState.None);
    				 }
    				 var enteredSerNo = this.getValue();
    				 var count = 0;

                     for(var j=0;j<aMoveMultipleAMOM.length;j++){
                             if(enteredSerNo == aMoveMultipleAMOM[j].serialNo){
                                     count++;
                             }
                     }

                     if(count == 1){
                    	 	arrEnteredSerNo.push(enteredSerNo);
                     }
                     else{
                             this.setValueState(sap.ui.core.ValueState.Error);
                             this.setValue("");
                             this.setPlaceholder("Duplicate");
                     }

    				 /*for(var i=0;i<arrEnteredSerNo.length;i++){
    					 if(enteredSerNo == arrEnteredSerNo[i]){
    						this.setValueState(sap.ui.core.ValueState.Error);
					  		this.setValue("");
					  		this.setPlaceholder("Duplicate");
    					 }
    				 }
    				 arrEnteredSerNo.push(enteredSerNo);*/
    			 }}).bindProperty("value", "serialNo").bindProperty("valueState", "valuestateSrno").bindProperty("placeholder", "placeHolderSrno").addStyleClass("borderStyle margin5"),
             sortProperty: "serialNo",
             filterProperty: "serialNo",
             resizable:false,
             width:"70px",
             hAlign: sap.ui.commons.layout.HAlign.Left
    		 })).addStyleClass("DepotInput38px");
    	
    	sap.ui.getCore().byId("idSerNoAMOMInput").setMaxLength(11);
    	
    	/*var oModelCurrDateAMOM = new sap.ui.model.json.JSONModel();
    	oModelCurrDateAMOM.setData({
	   		dateValue: new Date()
		});*/
    	
	   	var oOutDateAMOM = new sap.ui.commons.DatePicker("idOutDateInputAMOM",{
			  width: "120px",
//			  textAlign:"Right",
			  value: {
				  path: "{outDate}",
			  type: new sap.ui.model.type.Date({pattern: "dd-MM-yyyy"})},
			}).bindProperty("yyyymmdd", "frmtAMOMYYYYMMDD").bindProperty("placeholder", "placeHolderDate").bindProperty("valueState", "valuestateDate").addStyleClass("margin5 paddingRight15 DepotInput38px");
	   	
	   	//oOutDateAMOM.setModel(oModelCurrDateAMOM);

	   	/*oOutDateAMOM.attachChange(
		    	                function(oEvent){
		    	                        if(oEvent.getParameter("invalidValue")){
		    	                                oEvent.oSource.setValueState(sap.ui.core.ValueState.Error);
		    	                                oEvent.oSource.setValue("");
		    	                                oEvent.oSource.setPlaceholder("Invalid Value");
		    	                        }else{
		    	                                oEvent.oSource.setValueState(sap.ui.core.ValueState.None);
		    	                        }
		    	                }
		    	);*/
    	
    	oMoveMultipleTable.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Out Date", required: true}),
			 template: oOutDateAMOM.addStyleClass("borderStyle"),
             sortProperty: "outDate",
             filterProperty: "outDate",
             resizable:false,
             width:"70px",
             //hAlign: sap.ui.commons.layout.HAlign.Right,
			 })).addStyleClass("DepotInput38px");
    	
    	/*oMoveMultipleTable.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Return Date", required: true, textAlign:"Right"}),
			 template: new sap.ui.commons.TextField("idOutDateInputAMOM",{textAlign:"Right"}).bindProperty("value", "outDate").addStyleClass("borderStyle paddingRight15"),
            resizable:false,
           width: "50px",
           hAlign: sap.ui.commons.layout.HAlign.Right,
			 }));*/
    	
    	oMoveMultipleTable.addColumn(new sap.ui.table.Column({
    		 label: new sap.ui.commons.Label({text: "Authorisation", required: true}),
    		 template: new sap.ui.commons.TextField("idAuthAMOMInput",{textAlign:"Left",
    			 change: function(){
                	 if(this.getValue() != ""){
    					 this.setValueState(sap.ui.core.ValueState.None);
    				 }
                 }}).bindProperty("value", "auth").bindProperty("valueState", "valuestateAuth").bindProperty("placeholder", "placeHolderAuth").addStyleClass("borderStyle margin5"),
             sortProperty: "auth",
             filterProperty: "auth",
             resizable:false,
             width:"70px",
             hAlign: sap.ui.commons.layout.HAlign.Left
    		 })).addStyleClass("DepotInput38px");
    	
    	//Create a model and bind the table rows to this model
    	/*var oModelMoveMultipleAMOM = new sap.ui.model.json.JSONModel();
    	oModelMoveMultipleAMOM.setData({modelData: aMoveMultipleAMOM});*/
    	oMoveMultipleTable.setModel(oModelMoveMultipleAMOM);
    	oMoveMultipleTable.bindRows("/modelData");
    	  	
    	// Responsive Grid Layout
	    var oAddMoveMultipleLayout = new sap.ui.layout.form.ResponsiveGridLayout("idAddMoveMultipleLayout",{
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
	     var oAddMoveMultipleForm = new sap.ui.layout.form.Form("idAddMoveMultipleForm",{
	             layout: oAddMoveMultipleLayout,
	             formContainers: [
	                     
	                     new sap.ui.layout.form.FormContainer("idAddMoveMultipleFormC1",{
	                             //title: "Add Movement Out - Multiple",
                             formElements: [
												new sap.ui.layout.form.FormElement({
												    fields: [oLabelDepotM, oComboDepotAMOM, oInputDepotAMOM,oFlexApplyRemoveAMOM]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oMoveMultipleTable]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oFlexInAddDelete]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oBtnMoveValidate]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oLabelMandatoryM]
												})
	                                     ]
	                     }),
	                    /* new sap.ui.layout.form.FormContainer("idAddMoveMultipleFormC2",{
                         formElements: [
											new sap.ui.layout.form.FormElement({
											    fields: [oFlexApplyRemoveAMOM]
											})
                                     ]
                     })*/
	             ]
	     });
	     	return oAddMoveMultipleForm;
	   	
	},
	
	validateMoveOutMultiple: function(){
		var oCurrAMOM = this;
		vInputDepotMValAMOM = oInputDepotAMOM.getValue();
		vInputDepotListAMOM = document.getElementById("idComboDepotAMOM").value;
		var isValid = true;
  	  if(vInputDepotListAMOM == ""){
  		  document.getElementById("idComboDepotAMOM").style.borderColor = "red";
		  document.getElementById("idComboDepotAMOM").style.background = "#FAD4D4";
		  $("#idComboDepotAMOM").attr("placeholder","Required");
		  isValid = false;

  	  }
	  	if(vInputDepotListAMOM.trim().length > 0){
			var match = jQuery.inArray(vInputDepotListAMOM,depotNameListAMOM);
			if(match < 0){
				document.getElementById("idComboDepotAMOM").style.borderColor = "red";
	    		document.getElementById("idComboDepotAMOM").style.background = "#FAD4D4";
	    		document.getElementById("idComboDepotAMOM").value = "";
	    		document.getElementById("idComboDepotAMOM").placeholder = "Invalid Depot";
	    		isValid = false;
			}
			else{
				document.getElementById("idComboDepotAMOM").style.borderColor = "#cccccc";
	    		document.getElementById("idComboDepotAMOM").style.background = "#ffffff";
	    		document.getElementById("idComboDepotAMOM").placeholder = "Depot";
	    		isValid = true;
			}
		}
  	  if(isValid){
  		  //oInputDepotAMOM.setValueState(sap.ui.core.ValueState.None);
  		document.getElementById("idComboDepotAMOM").style.borderColor = "#cccccc";
		document.getElementById("idComboDepotAMOM").style.background = "#ffffff";
  		oCurrAMOM.validateDataAMOM();
  	  }
    
	},
	
	populateDepotNameAMOM: function(){
		busyDialog.open();
		oModel = new sap.ui.model.odata.ODataModel(serviceUrl15, true);
		var urlToCallAMOMDep = serviceUrl15 + "/F4_Functional_Location";
		//alert("urlToCallAMOMDep : "+urlToCallAMOMDep);
		OData.request({ 
		      requestUri: urlToCallAMOMDep,
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
		    	for ( var i = 0; i < data.results.length ; i++) {
		    		depotNameListAMOM[i] = data.results[i].FunctionalLoc;
				}
		    	
		    	$("#idComboDepotAMOM").autocomplete({
		    	      source: depotNameListAMOM,
		    	      minLength: 0,
		    	      /*select: function(){
		    	    	  flagOnChangeDepotNameAMOM = true;
		    	      }*/
		    	})
		    	.focus(function(){            
		    		 if ($("ul.ui-autocomplete").is(":hidden")) {
		    		        $(this).autocomplete('search', '');
		    		    }
		    	})
		    	.bind( "focusout", function( event ) {
		    		//this.setValueState(sap.ui.core.ValueState.None);
					  //this.setPlaceholder("Select Depot");
		    			/*var keyAMOM = this.value;
					    var partsAMOM = keyAMOM.split(" ");
					    var lastPartAMOM = partsAMOM[partsAMOM.length - 2];
					    oInputDepotAMOM.setValue(lastPartAMOM);*/
			     })
		    	.keyup(function() {
		    	    var isValid = false;
		    	    var previousValue = "";
		    	    for (i in depotNameListAMOM) {
		    	        if (depotNameListAMOM[i].toLowerCase().match(this.value.toLowerCase())) {
		    	            isValid = true;
		    	        }
		    	    }
		    	    if (!isValid) {
		    	        this.value = previousValue;
		    	    } else {
		    	        previousValue = this.value;
		    	    }
		    	});
		    	loggedInUserTypeAMOM = objLoginUser.getLoggedInUserType();
		    	//alert("loggedInUserTypeAMOM : "+loggedInUserTypeAMOM);
				if(loggedInUserTypeAMOM == "SEACO"){
					$("#idComboDepotAMOM").removeAttr('disabled');
					sap.ui.getCore().byId("idBtnMoveRemoveFilterAMOM").setEnabled(false);
					sap.ui.getCore().byId("idBtnMoveApplyFilterAMOM").setEnabled(true);
					sap.ui.getCore().byId("idDepotAMOM").setEnabled(true);
				}
				else{
					var DepotCode = objLoginUser.getLoggedInUserID();
					//alert("DepotCode : "+DepotCode);
					for(var i=0;i<depotNameListAMOM.length;i++){
						if(depotNameListAMOM[i].substring(11,15) == DepotCode)
							DepotCode = depotNameListAMOM[i];
					}
					$("#idComboDepotAMOM").attr("disabled","disabled");
					$("#idComboDepotAMOM").val(DepotCode);
					var depotAMOM = document.getElementById("idComboDepotAMOM").value.split("-");
					sap.ui.getCore().byId("idDepotAMOM").setValue(depotAMOM[3]);
					sap.ui.getCore().byId("idBtnMoveRemoveFilterAMOM").setEnabled(false);
					sap.ui.getCore().byId("idBtnMoveApplyFilterAMOM").setEnabled(false);
					sap.ui.getCore().byId("idDepotAMOM").setEnabled(false);
				}

		    	busyDialog.close();
		    },
		    function(err){
		    	 errorfromServer(err);
		    	//alert("Error while Reading Result : "+ : window.JSON.stringify(err.response));
		    });
	},
	
	validateDataAMOM: function(){
		//busyDialog.open();
		
		arrTransMsgsAMOM = [];
		depotNameAMOMToPass = "";
		
		var serialNoAMOM = "";
		var outDateAMOM = "";
		var authAMOM = "";
		depotNameAMOMToPass = document.getElementById("idComboDepotAMOM").value;
		//var dateToPassAMOM = "";
		//var splitDateAMOM = "";
		
		var incorrectSerNoFlagAMOM = true;
		var incorrectDateFlagAMOM = true;
		var incorrectSerNoDateFlagAMOM = true;
		
		var currDateAMOM = new Date();
		var currYearAMOM = currDateAMOM.getFullYear();
		var currMonthAMOM = currDateAMOM.getMonth()+1;
		var currDayAMOM = currDateAMOM.getDate();
		var countForNoneAMOM = 0;
		var validSrNo = true;
		var validAuth = true;
		var validDate = true;
		
		for(var i=0;i<aMoveMultipleAMOM.length; i++){
			if(i==0){
				validAMOMFieldsStatus = true;
				validAMOMStatus = true;
				aTempAMOM = [];
			}
			if(aMoveMultipleAMOM[i].serialNo.trim() == "" && aMoveMultipleAMOM[i].auth .trim() == ""){
				countForNoneAMOM = countForNoneAMOM + 1;
				continue;
			}
			else{
				if(aMoveMultipleAMOM[i].serialNo == ""){
					//busyDialog.close();
					aMoveMultipleAMOM[i].valuestateSrno = sap.ui.core.ValueState.Error;
					aMoveMultipleAMOM[i].placeHolderSrno = "Required";
					validSrNo = false;
				}
				else{
					aMoveMultipleAMOM[i].valuestateSrno = sap.ui.core.ValueState.None;
					aMoveMultipleAMOM[i].placeHolderSrno = "";
					validSrNo = true;
				}
				
				if(aMoveMultipleAMOM[i].auth == ""){
					//busyDialog.close();
					aMoveMultipleAMOM[i].valuestateAuth = sap.ui.core.ValueState.Error;
					aMoveMultipleAMOM[i].placeHolderAuth = "Required";
					validAuth = false;
				}
				else{
					aMoveMultipleAMOM[i].valuestateAuth = sap.ui.core.ValueState.None;
					aMoveMultipleAMOM[i].placeHolderAuth = "";
					validAuth = true;
				}
				if(sap.ui.getCore().byId("idOutDateInputAMOM-col2-row"+i).getValue() == ""){
					//busyDialog.close();
					aMoveMultipleAMOM[i].valuestateDate = sap.ui.core.ValueState.Error;
					aMoveMultipleAMOM[i].placeHolderDate = "Required";
					//sap.ui.getCore().byId("idOutDateInputLAM-col4-row"+i).setValueState(sap.ui.core.ValueState.Error);
					//sap.ui.getCore().byId("idOutDateInputLAM-col4-row"+i).setValue("");
					//sap.ui.getCore().byId("idOutDateInputLAM-col4-row"+i).setPlaceholder("Required");
					//validDate = false;
				}
				else{
					aMoveMultipleAMOM[i].valuestateDate = sap.ui.core.ValueState.None;
					aMoveMultipleAMOM[i].placeHolderDate = "";
					//sap.ui.getCore().byId("idOutDateInputLAM-col4-row"+i).setValueState(sap.ui.core.ValueState.None);
					//sap.ui.getCore().byId("idOutDateInputLAM-col4-row"+i).setPlaceholder("");
					//validDate = true;
				}
				aTempAMOM.push(aMoveMultipleAMOM[i]);
			}
			if(validAMOMFieldsStatus){
				if(validSrNo && validAuth){
					validAMOMFieldsStatus = true;
				}
				else{
					validAMOMFieldsStatus = false;
				}
			}
		}
		
		if(countForNoneAMOM == aMoveMultipleAMOM.length){
			var message = "Please enter atleast one record.";
			busyDialog.close();
			sap.ui.commons.MessageBox.alert(message);
		}
		else{
			aMoveMultipleAMOM = [];
			aMoveMultipleAMOM = aTempAMOM;
			oModelMoveMultipleAMOM.setData({modelData: aMoveMultipleAMOM});
			oModelMoveMultipleAMOM.updateBindings();
			sap.ui.getCore().byId("idTblAdMovOutMultiplAMOM").setVisibleRowCount(aMoveMultipleAMOM.length);
			
			for(var i=0;i<aMoveMultipleAMOM.length; i++){
				var dateEntered = sap.ui.getCore().byId("idOutDateInputAMOM-col2-row"+i).getValue();
				if(dateEntered == ""){
					busyDialog.close();
					sap.ui.getCore().byId("idOutDateInputAMOM-col2-row"+i).setValueState(sap.ui.core.ValueState.Error);
					sap.ui.getCore().byId("idOutDateInputAMOM-col2-row"+i).setValue("");
					sap.ui.getCore().byId("idOutDateInputAMOM-col2-row"+i).setPlaceholder("Required");
					validDate = false;
				}else if((dateEntered.substr(6,4) + dateEntered.substr(3,2) +  dateEntered.substr(0,2)) > frmtAMOMYYYYMMDD){
					busyDialog.close();
					sap.ui.getCore().byId("idOutDateInputAMOM-col2-row"+i).setValueState(sap.ui.core.ValueState.Error);
					sap.ui.getCore().byId("idOutDateInputAMOM-col2-row"+i).setValue("");
					sap.ui.getCore().byId("idOutDateInputAMOM-col2-row"+i).setPlaceholder("No Future Date");
					validDate = false;
				}else if(dateEntered.length != 10){
					busyDialog.close();
					sap.ui.getCore().byId("idOutDateInputAMOM-col2-row"+i).setValueState(sap.ui.core.ValueState.Error);
					sap.ui.getCore().byId("idOutDateInputAMOM-col2-row"+i).setValue("");
					sap.ui.getCore().byId("idOutDateInputAMOM-col2-row"+i).setPlaceholder("Improper Format");
					validDate = false;
				}
				else{
					sap.ui.getCore().byId("idOutDateInputAMOM-col2-row"+i).setValueState(sap.ui.core.ValueState.None);
					sap.ui.getCore().byId("idOutDateInputAMOM-col2-row"+i).setPlaceholder("");
					validDate = true;
				}
				
				if(validAMOMStatus){
					if(validAMOMFieldsStatus && validDate){
						validAMOMStatus = true;
					}
					else{
						validAMOMStatus = false;
					}
				}
			}
	
			if(validAMOMFieldsStatus && validAMOMStatus){
				for(var i=0;i<aMoveMultipleAMOM.length; i++){
				
				 incorrectSerNoFlagAMOM = true;
				 incorrectDateFlagAMOM = true;
				 incorrectSerNoDateFlagAMOM = true;
				 
				 	var splitDateAMOM = "";
					var dateToPassAMOM = "";
					var selYearAMOM = "";
					var selMonthAMOM = "";
					var selDayAMOM = "";
				
						sap.ui.getCore().byId("idSerNoAMOMInput-col1-row"+i).setValueState(sap.ui.core.ValueState.None);
						sap.ui.getCore().byId("idOutDateInputAMOM-col2-row"+i).setValueState(sap.ui.core.ValueState.None);
						sap.ui.getCore().byId("idAuthAMOMInput-col3-row"+i).setValueState(sap.ui.core.ValueState.None);
						
						serialNoAMOM = sap.ui.getCore().byId("idSerNoAMOMInput-col1-row"+i).getValue().trim().toUpperCase();
						
						outDateAMOM = sap.ui.getCore().byId("idOutDateInputAMOM-col2-row"+i).getValue();
						
						var rxDatePattern = /^(\d{1,2})(\-|-)(\d{1,2})(\-|-)(\d{4})$/;
					    var dtArray = outDateAMOM.match(rxDatePattern);
						
					    if (dtArray == null){
					    	incorrectDateFlagAMOM = false;
					    }
					    else{
					    	 splitDateAMOM = outDateAMOM.split("-");
							 dateToPassAMOM = splitDateAMOM[2]+splitDateAMOM[1]+splitDateAMOM[0];
							
							 selYearAMOM = splitDateAMOM[2];
							 selMonthAMOM = splitDateAMOM[1];
							 selDayAMOM = splitDateAMOM[0];
					    }
	
						authAMOM = sap.ui.getCore().byId("idAuthAMOMInput-col3-row"+i).getValue();
						
						if(serialNoAMOM.length > 0 && serialNoAMOM.length != 11){
							incorrectSerNoFlagAMOM = false;
							}
						if(selMonthAMOM == 2){
							var isleap = (selYearAMOM % 4 == 0 && (selYearAMOM % 100 != 0 || selYearAMOM % 400 == 0));
							     if (selDayAMOM> 29 || (selDayAMOM ==29 && !isleap)){
							    	 incorrectDateFlagAMOM = false;
							     }
						}
						if((dtArray == null) && (serialNoAMOM.length > 0 && serialNoAMOM.length != 11)){
							incorrectSerNoDateFlagAMOM = false;
						}
						if((serialNoAMOM.length > 0 && serialNoAMOM.length != 11) && (selMonthAMOM == 2)){
							var isleap = (selYearAMOM % 4 == 0 && (selYearAMOM % 100 != 0 || selYearAMOM % 400 == 0));
						     if (selDayAMOM> 29 || (selDayAMOM ==29 && !isleap)){
						    	 incorrectSerNoDateFlagAMOM = false;
						     }
						}
						
						if(incorrectSerNoDateFlagAMOM == false){
							arrTransMsgsAMOM.push({
								"checked": false,
								"status": "images/red_signal.png",
								"serialNo": serialNoAMOM,
								"outDate": outDateAMOM,
								"auth": authAMOM,
								"warningErrors": "Incorrect Serial Number and Date"
							});
						}
						else if(incorrectDateFlagAMOM == false){
							arrTransMsgsAMOM.push({
								"checked": false,
								"status": "images/red_signal.png",
								"serialNo": serialNoAMOM,
								"outDate": outDateAMOM,
								"auth": authAMOM,
								"warningErrors": "Incorrect Date"
							});
						}
						else if(incorrectSerNoFlagAMOM == false){
							arrTransMsgsAMOM.push({
								"checked": false,
								"status": "images/red_signal.png",
								"serialNo": serialNoAMOM,
								"outDate": outDateAMOM,
								"auth": authAMOM,
								"warningErrors": "Incorrect Serial Number"
							});
						}
							else{
								arrTransMsgsAMOM.push({
									"checked": false,
									"status": "images/green_signal.png",
									"serialNo": serialNoAMOM,
									"outDate": outDateAMOM,
									"auth": authAMOM,
									"warningErrors": ""
								});
							}
					}
			}
			
			if(arrTransMsgsAMOM.length == aMoveMultipleAMOM.length){
				//depotCodeAMOMToPass = oInputDepotAMOM.getValue();
				var selDepValAMOM = document.getElementById("idComboDepotAMOM").value;
			    var partsDepAMOM = selDepValAMOM.split("-");
			    depotCodeAMOMToPass = partsDepAMOM[3];
				//busyDialog.close();
				var bus = sap.ui.getCore().getEventBus();
			  	  	bus.publish("nav", "to", {
			        id : "AddMoveMultipleResults"
		  	  	});
			  	  
			  	  var oObjAddMovemntMultipleRes = new addMovemntMultipleResView();
			  	  oObjAddMovemntMultipleRes.updateBindingAMOM();
			  	oObjAddMovemntMultipleRes.enableSubmitBtnAMOMR();
			}
		}
	},
	
resetAMOM: function(){
        
        loggedInUserTypeAMOM = objLoginUser.getLoggedInUserType();
        oModelMoveMultipleAMOM.setData({modelData: []});
        
        if(loggedInUserTypeAMOM == "SEACO"){
               
               $("#idComboDepotAMOM").val("");
               sap.ui.getCore().byId("idDepotAMOM").setValue("");
               
               if(document.getElementById("idComboDepotAMOM")){
	                document.getElementById("idComboDepotAMOM").style.borderColor = "#cccccc";
		    		document.getElementById("idComboDepotAMOM").style.background = "#ffffff";
		    		document.getElementById("idComboDepotAMOM").placeholder = "Select Depot";
               }
               
               if(sap.ui.getCore().byId("idBtnMoveRemoveFilterAMOM")){
               	sap.ui.getCore().byId("idBtnMoveRemoveFilterAMOM").setEnabled(false);
               }
               
        }
        aMoveMultipleAMOM = [];
        
        aMoveMultipleAMOM.push({checked: false, serialNo: "", frmtAMOMYYYYMMDD: frmtAMOMYYYYMMDD, outDate: dtTodayAMOMltpl, auth: "", placeHolderSrno: "", placeHolderAuth: "", placeHolderDate: "", valuestateSrno:sap.ui.core.ValueState.None, valuestateAuth:sap.ui.core.ValueState.None, valuestateDate:sap.ui.core.ValueState.None});
        aMoveMultipleAMOM.push({checked: false, serialNo: "", frmtAMOMYYYYMMDD: frmtAMOMYYYYMMDD, outDate: dtTodayAMOMltpl, auth: "", placeHolderSrno: "", placeHolderAuth: "", placeHolderDate: "", valuestateSrno:sap.ui.core.ValueState.None, valuestateAuth:sap.ui.core.ValueState.None, valuestateDate:sap.ui.core.ValueState.None});
        aMoveMultipleAMOM.push({checked: false, serialNo: "", frmtAMOMYYYYMMDD: frmtAMOMYYYYMMDD, outDate: dtTodayAMOMltpl, auth: "", placeHolderSrno: "", placeHolderAuth: "", placeHolderDate: "", valuestateSrno:sap.ui.core.ValueState.None, valuestateAuth:sap.ui.core.ValueState.None, valuestateDate:sap.ui.core.ValueState.None});
        aMoveMultipleAMOM.push({checked: false, serialNo: "", frmtAMOMYYYYMMDD: frmtAMOMYYYYMMDD, outDate: dtTodayAMOMltpl, auth: "", placeHolderSrno: "", placeHolderAuth: "", placeHolderDate: "", valuestateSrno:sap.ui.core.ValueState.None, valuestateAuth:sap.ui.core.ValueState.None, valuestateDate:sap.ui.core.ValueState.None});
        aMoveMultipleAMOM.push({checked: false, serialNo: "", frmtAMOMYYYYMMDD: frmtAMOMYYYYMMDD, outDate: dtTodayAMOMltpl, auth: "", placeHolderSrno: "", placeHolderAuth: "", placeHolderDate: "", valuestateSrno:sap.ui.core.ValueState.None, valuestateAuth:sap.ui.core.ValueState.None, valuestateDate:sap.ui.core.ValueState.None});
        
        oModelMoveMultipleAMOM.setData({modelData: aMoveMultipleAMOM});
        sap.ui.getCore().byId("idTblAdMovOutMultiplAMOM").setModel(oModelMoveMultipleAMOM);
        sap.ui.getCore().byId("idTblAdMovOutMultiplAMOM").bindRows("/modelData");
        
        sap.ui.getCore().byId("idTblAdMovOutMultiplAMOM").setVisibleRowCount(5);
 }
});
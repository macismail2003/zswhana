/******** NP *******/
var dtTodayLAM = new Date();

var frmtLAMYYYYMMDD = [dtTodayLAM.getFullYear(),padZero(dtTodayLAM.getMonth()+1),padZero(dtTodayLAM.getDate())].join('');

var aMoveMultipleLAM = [];

var aTempLAM = [];

var oModelMoveLAMultiple = new sap.ui.model.json.JSONModel();
oModelMoveLAMultiple.setData({modelData: aMoveMultipleLAM});
var oLAMultipleTable;

var arrayLenLAM;
var checkedLengthLAM = 0;
var depotNameListLAM = [];
var depotNameCodeListLAM = [];
var depotNameLAMToPass;
var depotCodeLAMToPass;
var arrTransMsgsLAM = [];
var flagOnChangeDepotNameLAM = false;
var flagOnChangeDepotCodeLAM = false;
var validLAMFieldsStatus = true;
var validLAMStatus = false;
var aAmountLookupLAM = [];
var loggedInUserTypeLAM = "";
sap.ui.model.json.JSONModel.extend("LesseeApprovalMultipleView", {
	
	createLesseeApprovalMultipleView: function(){
		aMoveMultipleLAM.length = 0;
		aMoveMultipleLAM.push({checked: false, serialNo: "", appAmount: "", appRef: "", Appdate: dtTodayLAM, 'frmtLAMYYYYMMDD': frmtLAMYYYYMMDD, placeHolderSrno: "", placeHolderAppRef: "", placeHolderDate: "", valuestateSrno:sap.ui.core.ValueState.None, valuestateAppRef:sap.ui.core.ValueState.None, valuestateDate:sap.ui.core.ValueState.None});
		aMoveMultipleLAM.push({checked: false, serialNo: "", appAmount: "", appRef: "", Appdate: dtTodayLAM, 'frmtLAMYYYYMMDD': frmtLAMYYYYMMDD, placeHolderSrno: "", placeHolderAppRef: "", placeHolderDate: "", valuestateSrno:sap.ui.core.ValueState.None, valuestateAppRef:sap.ui.core.ValueState.None, valuestateDate:sap.ui.core.ValueState.None});
		aMoveMultipleLAM.push({checked: false, serialNo: "", appAmount: "", appRef: "", Appdate: dtTodayLAM, 'frmtLAMYYYYMMDD': frmtLAMYYYYMMDD, placeHolderSrno: "", placeHolderAppRef: "", placeHolderDate: "", valuestateSrno:sap.ui.core.ValueState.None, valuestateAppRef:sap.ui.core.ValueState.None, valuestateDate:sap.ui.core.ValueState.None});
		aMoveMultipleLAM.push({checked: false, serialNo: "", appAmount: "", appRef: "", Appdate: dtTodayLAM, 'frmtLAMYYYYMMDD': frmtLAMYYYYMMDD, placeHolderSrno: "", placeHolderAppRef: "", placeHolderDate: "", valuestateSrno:sap.ui.core.ValueState.None, valuestateAppRef:sap.ui.core.ValueState.None, valuestateDate:sap.ui.core.ValueState.None});
		aMoveMultipleLAM.push({checked: false, serialNo: "", appAmount: "", appRef: "", Appdate: dtTodayLAM, 'frmtLAMYYYYMMDD': frmtLAMYYYYMMDD, placeHolderSrno: "", placeHolderAppRef: "", placeHolderDate: "", valuestateSrno:sap.ui.core.ValueState.None, valuestateAppRef:sap.ui.core.ValueState.None, valuestateDate:sap.ui.core.ValueState.None});
		var oCurrLAM = this;
		// Labels
		var oLabelDepotM = new sap.ui.commons.Label({text: "Depot:",
			required: true,
			layoutData: new sap.ui.layout.GridData({span: "L1 M1 S8",linebreak: false, margin: true}),
            wrapping: true}).addStyleClass("marginTop15");
		
		var oLabelMandatoryM = new sap.ui.commons.Label({text: "Mandatory Field",
			required: true,
			requiredAtBegin : true,
            wrapping: true}).addStyleClass("margin10 marginTopBot30");
		
		var oComboDepotLAM = new sap.ui.core.HTML("idListDepotComboLAM",{layoutData: new sap.ui.layout.GridData({span: "L4 M6 S12"})});
		var htmlContentDepot = '<input disabled="disabled" id="idComboDepotLAM" placeholder="Select Depot" class="FormIntStyle marginTop7" style="width:100%;height: 38px;">';
		oComboDepotLAM.setContent(htmlContentDepot);
		
		/*var oLabelDepotTextM = new sap.ui.commons.Label("idLabelDepotTextM",{text: "",
			required: true,
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
            wrapping: true}).addStyleClass("margin10");*/
		
		
	    /*var oComboDepotLAM = new sap.ui.commons.DropdownBox("idComboDepotLAM", {
			  layoutData: new sap.ui.layout.GridData({span: "L5 M5 S4"}),
			  change:function(){
				  this.setValueState(sap.ui.core.ValueState.None);
				  this.setPlaceholder("Select Depot");
				  var keyLAM = this.getSelectedKey();
				  var partsLAM = keyLAM.split(" ");
				  var lastPartLAM = partsLAM[partsLAM.length - 1];
				  oInputDepotLAM.setValue(lastPartLAM);
				 //oController.EquipClassChange();
			  },
			  items: {
	                path: "/",
	                template: new sap.ui.core.ListItem({key:"{IdName}", text: "{IdName}"})
			  },
	          displaySecondaryValues:false, placeholder:"Select Depot"}).addStyleClass("FormInputStyle");*/
	    
	    
	 // Text Field
    	var oInputDepotLAM = new sap.ui.commons.TextField('idDepotLAM',{ //span: "L2 M2 S6",
    		layoutData: new sap.ui.layout.GridData({span: "L1 M1 S8", linebreak: false, margin: true}),
    		height : "38px",
    		width : "10px",
    		placeholder:"Depot Code",
    		change: function(){
    			flagOnChangeDepotCodeLAM = true;
    		}
    	}).addStyleClass("FormInputStyle margin2 marginTop7 DepotInput38px");
    	
    	/*oInputDepotLAM.attachChange(
                function(oEvent){
                        if(isNaN(oInputDepotLAM.getValue())){
                                oEvent.oSource.setValueState(sap.ui.core.ValueState.Error);
                                oEvent.oSource.setValue("");
                                oEvent.oSource.setPlaceholder("Invalid Value");
                        }else{
                                oEvent.oSource.setValueState(sap.ui.core.ValueState.None);
                        }
                }
    		);*/
    	
    	// Buttons
	   	 var oBtnMoveValidate = new sap.m.Button("idBtnMoveValidateLAM",{
		          text : "Validate",
		          width:"80px",
		          styled:false,
		          layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
		          press:function(){
		        	  oCurrLAM.validateLesseeApprovalMultiple();
		        	  //oCurrLAM.resetLesseeMultiple();
		        	  //oCurrLAM.resetLesseeMultiple();
		          }}).addStyleClass("submitBtn marginTop20");
	   	 
	   	var oBtnMoveRemoveFilter = new sap.m.Button("idBtnMoveRemoveFilterLAM",{
	          text : "Remove Filter",
	          //width:"115px",
	          styled:false,
	          enabled:false,
	          layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: false, margin: true}),
	          press:function(){
	        	  oInputDepotLAM.setValue("");
	        	  $("#idComboDepotLAM").val("");
		          this.setEnabled(false);
		          }}).addStyleClass("submitBtn");
	   	
	 	var oLabelSpace = new sap.ui.commons.Label({text: " ",
			width:"8px",
            wrapping: true}).addStyleClass("marginTop10");
	 	
	   	 var oBtnMoveApplyFilter = new sap.m.Button("idBtnMoveApplyFilterLAM",{
		          text : "Apply Filter",
		          //width:"115px",
		          styled:false,
		          layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: false, margin: true}),
		          press:function(){
		        	 	sap.ui.getCore().byId("idBtnMoveRemoveFilterLAM").setEnabled(true);
		          		document.getElementById("idComboDepotLAM").style.borderColor = "#cccccc";
	        			document.getElementById("idComboDepotLAM").style.background = "#ffffff";
	        			

		          		var depotCodeName = jQuery.grep(depotNameCodeListLAM, function(element, index){
				            return element.Depot == oInputDepotLAM.getValue();
			    	    });
		          		
		          		if(depotCodeName.length > 0){
		          			$("#idComboDepotLAM").val(depotCodeName[0].FunctionalLoc);
		          			sap.ui.getCore().byId("idLabelDepotTextM").setText(depotCodeName[0].FunctionalLoc);
		          		}
		          		else{
		          			$("#idComboDepotLAM").val("");
		          			sap.ui.getCore().byId("idLabelDepotTextM").setText(depotCodeName[0].FunctionalLoc);
		          		}
		          		
		        	  }}).addStyleClass("submitBtn");
	   	 
	     var oFlexBtn = new sap.m.FlexBox({
	           items: [
						oBtnMoveApplyFilter,
						oLabelSpace,
						oBtnMoveRemoveFilter,
	           ],
	           direction : "Row",
	           layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12",linebreak: false, margin: false}),
				});
	     
	   	var oImageAddMOM = new sap.ui.commons.Image("imgAddnewRowLAM",{
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
	        	var currentArrayLen = aMoveMultipleLAM.length;
	        	if(currentArrayLen == 25){
	        		sap.ui.commons.MessageBox.show(MaxLimitReachedMessage,
	                        sap.ui.commons.MessageBox.Icon.WARNING,
	                        "Warning",
	                        [sap.ui.commons.MessageBox.Action.OK], 
	                            sap.ui.commons.MessageBox.Action.OK);
	        	}
	        	else{
	        		aMoveMultipleLAM.push({
        		  'checked':false,
                  'serialNo':"",
                  'appAmount': "",
                  'appRef':"",
                  'Appdate':dtTodayLAM, 
                  'frmtLAMYYYYMMDD': frmtLAMYYYYMMDD,
                  'placeHolderSrno': "",
                  'placeHolderAppRef': "", 
                'placeHolderDate': "",
                 'valuestateSrno':sap.ui.core.ValueState.None, 
                 'valuestateAppRef':sap.ui.core.ValueState.None,
                 'valuestateDate':sap.ui.core.ValueState.None
                      });
	        		oModelMoveLAMultiple.setData({modelData: aMoveMultipleLAM});
	        		oModelMoveLAMultiple.updateBindings();
				        oLAMultipleTable.setVisibleRowCount(aMoveMultipleLAM.length);
				        currentArrayLen = currentArrayLen + 1;
	        	}
	        }}).addStyleClass("marginTop25 marginRight");
	   	
	   	var oImageDeleteMOM = new sap.ui.commons.Image("imgDeleteLAM");
	   	oImageDeleteMOM.setSrc("images/delete_row.png");
	   	oImageDeleteMOM.setTooltip("Delete New Row");
	   	oImageDeleteMOM.setDecorative(false);
	   	oImageDeleteMOM.addStyleClass("marginTop20 marginRight5");
	   	
	   	var oBtnDeleteRow = new sap.ui.commons.Link({
	        text: "Delete Checked Rows", 
	        tooltip: "Delete Checked Rows",
	        layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: false, margin: true}),
	        press: function() {
	        	//sap.ui.getCore().byId("idCBSelectAllRows").setChecked(false);
	        	  arrayLenLAM = aMoveMultipleLAM.length;
	        	  var unCheckedCount = 0;
	        	  for(var j=0; j<arrayLenLAM; j++){
	        		  if(aMoveMultipleLAM[j].checked == false){
	        			  unCheckedCount++;
	        		  }
	        	  }
	        	  if(unCheckedCount == arrayLenLAM){
	        		  sap.ui.commons.MessageBox.show("Please select atleast 1 row for deletion!",
	                            sap.ui.commons.MessageBox.Icon.WARNING,
	                            "Warning",
	                            [sap.ui.commons.MessageBox.Action.OK],
	                            sap.ui.commons.MessageBox.Action.OK);
	        	  }
	        	  else{
		        	  for(var i=arrayLenLAM-1; i>=0; i--){
		        		  if(aMoveMultipleLAM[i].checked){
		        			  aMoveMultipleLAM.splice(i,1);
		        			  oModelMoveLAMultiple.updateBindings();
		        			  arrayLenLAM = arrayLenLAM - 1;
		        		  }
		        	  }
	        	  oLAMultipleTable.setVisibleRowCount(arrayLenLAM);
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
    	oLAMultipleTable = new sap.ui.table.Table("idLAMEntryTable",{
    		visibleRowCount: 5,
            firstVisibleRow: 1,
            columnHeaderHeight: 40,
            selectionMode: sap.ui.table.SelectionMode.None,
            height:"100%",
            width:"70%"
    	 }).addStyleClass("fontStyle marginTop33 tblBorder");
    	
    	// Table Columns
    	oLAMultipleTable.addColumn(new sap.ui.table.Column({
        	template: new sap.ui.commons.CheckBox({
   			 change : function() {
   				 if(this.getChecked() == false){
   					//sap.ui.getCore().byId("idCBSelectAllRows").setChecked(false);
   					checkedLengthLAM--;
   				 }
   				 else{
   					checkedLengthLAM++;
   				 }
   				/*if(checkedLengthLAM == aMoveMultipleLAM.length){
   					sap.ui.getCore().byId("idCBSelectAllRows").setChecked(true);
   				}*/
   			 }
		}).bindProperty("checked", "checked"),
        	width:"5%",
        	resizable:false,
        	hAlign: "Center"}));
    	
    	
    	var arrEnteredSerNo = [];
    	
    	oLAMultipleTable.addColumn(new sap.ui.table.Column({
      		 label: new sap.ui.commons.Label({text: "Serial Number", required: true}).addStyleClass("wraptextcol"),
    		 template: new sap.ui.commons.TextField("idSerNoLAMInput",{textAlign:"Left",
    			 change: function(){
    				 if(this.getValue() != ""){
    					 this.setValueState(sap.ui.core.ValueState.None);
    				 }
    				 var enteredSerNo = this.getValue();
    				 var count = 0;
    				 for(var j=0;j<aMoveMultipleLAM.length;j++){
    					 if(enteredSerNo == aMoveMultipleLAM[j].serialNo){
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
    			 }}).bindProperty("value", "serialNo").bindProperty("valueState", "valuestateSrno").bindProperty("placeholder", "placeHolderSrno").addStyleClass("borderStyle margin5"),
             resizable:false,
             width:"100px",
             hAlign: sap.ui.commons.layout.HAlign.Left
    		 }));
    	
    	sap.ui.getCore().byId("idSerNoLAMInput").setMaxLength(11);
    	
    	oLAMultipleTable.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Approval Amount"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextField("idTxtAppAmountLAM",{
				 enabled:false,
    			 change: function(){
    				 if(this.getValue() != ""){
    					 this.setValueState(sap.ui.core.ValueState.None);
    				 }
    			 }
			 }).bindProperty("value", "appAmount").addStyleClass("borderStyle"),
            resizable:false,
            width:"100px"
			 }));
    	oLAMultipleTable.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Approval Ref.", required: true}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextField("idTxtAppRefLAM",{
				 change: function(){
    				 if(this.getValue() != ""){
    					 this.setValueState(sap.ui.core.ValueState.None);
    				 }
    			 }
			 }).bindProperty("value", "appRef").bindProperty("valueState", "valuestateAppRef").bindProperty("placeholder", "placeHolderAppRef").addStyleClass("borderStyle"),
            resizable:false,
            width:"100px"
			 }));
    	
    	
	   	var oOutDateLAM = new sap.ui.commons.DatePicker("idOutDateInputLAM",{
			  width: "100px",
			 //textAlign:"Right",
			  value: {
				  path: "{Appdate}",
			  type: new sap.ui.model.type.Date({pattern: "dd-MM-yyyy"})},
			}).bindProperty("yyyymmdd", "frmtLAMYYYYMMDD").bindProperty("placeholder", "placeHolderDate").bindProperty("valueState", "valuestateDate").addStyleClass("margin5 paddingRight15");
	   	
    	oLAMultipleTable.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Date", required: true}).addStyleClass("wraptextcol"),
			 template: oOutDateLAM.addStyleClass("borderStyle"),
            resizable:false,
            width:"90px",
            //hAlign: sap.ui.commons.layout.HAlign.Right
			 }));
    	
    	//Create a model and bind the table rows to this model
    	oLAMultipleTable.setModel(oModelMoveLAMultiple);
    	oLAMultipleTable.bindRows("/modelData");
    	  	
    	// Responsive Grid Layout
	    var oLAMDepotFormLayout = new sap.ui.layout.form.ResponsiveGridLayout("idLAMDepotFormLayout",{
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
	     var oLAMDepotForm = new sap.ui.layout.form.Form("idLAMDepotFormForm",{
	             layout: oLAMDepotFormLayout,
	             formContainers: [
	                     
	                     new sap.ui.layout.form.FormContainer("idLAMDepotFormC1",{
	                             //title: "Add Movement Out - Multiple",
                             formElements: [
												new sap.ui.layout.form.FormElement({
												    fields: [oLabelDepotM, oComboDepotLAM, oInputDepotLAM,oFlexBtn]
												})
	                                     ]
	                     })
	             ]
	     });
	     
	   	
	    	// Responsive Grid Layout
		    var oLAMTblLayout = new sap.ui.layout.form.ResponsiveGridLayout("idLAMTblLayout",{
		    });

		 // Online Form Starts
		     var oLAMTblForm = new sap.ui.layout.form.Form("idLAMTblForm",{
		             layout: oLAMTblLayout,
		             formContainers: [
		                     new sap.ui.layout.form.FormContainer("idLAMTblFormC1",{
	                             formElements: [
													new sap.ui.layout.form.FormElement({
													    fields: [oLAMultipleTable]
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
		                     })
		             ]
		     });
		     
		 	var oFlexLAM = new sap.m.FlexBox({
		           items: [
							oLAMDepotForm,
							oLAMTblForm
		           ],
		           direction : "Column",
					});
	     	return oFlexLAM;
	   	
	},
	
	validateLesseeApprovalMultiple: function(){
		var oCurrLAM = this;
		var vInputDepotMValLAM = sap.ui.getCore().byId("idDepotLAM").getValue();
		var vInputDepotListLAM = document.getElementById("idComboDepotLAM").value;

		if(/*vInputDepotMValLAM == "" && */vInputDepotListLAM == ""){
	  		  /*oInputDepotLAM.setValueState(sap.ui.core.ValueState.Error);
	  		  oInputDepotLAM.setValue("");
	  		  oInputDepotLAM.setPlaceholder("Required");*/
	  		  document.getElementById("idComboDepotLAM").style.borderColor = "red";
			  document.getElementById("idComboDepotLAM").style.background = "#FAD4D4";
			  $("#idComboDepotLAM").attr("placeholder","Required");
	  	  }
  	  else{
  		var match = jQuery.inArray(vInputDepotListLAM,depotNameListLAM);
		if(match < 0){
			document.getElementById("idComboDepotLAM").style.borderColor = "red";
    		document.getElementById("idComboDepotLAM").style.background = "#FAD4D4";
    		document.getElementById("idComboDepotLAM").value = "";
    		document.getElementById("idComboDepotLAM").placeholder = "Invalid Depot";
    		isValid = false;
		}
		else{
			document.getElementById("idComboDepotLAM").style.borderColor = "#cccccc";
    		document.getElementById("idComboDepotLAM").style.background = "#ffffff";
    		document.getElementById("idComboDepotLAM").placeholder = "Select Depot";
    		oCurrLAM.validateDataLAM();
		}
		
  		/*  //oInputDepotLAM.setValueState(sap.ui.core.ValueState.None);
  		document.getElementById("idComboDepotLAM").style.borderColor = "#cccccc";
		document.getElementById("idComboDepotLAM").style.background = "#ffffff";
		 $("#idComboDepotLAM").attr("placeholder","Select Depot");*/
  		
  	  }
    
	},
	
	populateDepotNameLAM: function(){
		busyDialog.open();
		oModel = new sap.ui.model.odata.ODataModel(serviceUrl15_old, true);
		var urlToCallLAMDep = serviceUrl15_old + "/F4_Functional_Location";
		//alert("urlToCallLAMDep : "+urlToCallLAMDep);
		OData.request({ 
		      requestUri: urlToCallLAMDep,
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
		    		depotNameCodeListLAM = data.results;
		    		depotNameListLAM[i] = data.results[i].FunctionalLoc;
				}
		    	
		    	$("#idComboDepotLAM").autocomplete({
		    	      source: depotNameListLAM,
		    	      minLength: 0,
		    	      select: function(){
		    	    	  	document.getElementById("idComboDepotLAM").style.borderColor = "#cccccc";
		    				document.getElementById("idComboDepotLAM").style.background = "#ffffff";
		    				$("#idComboDepotLAM").attr("placeholder","Select Depot");
		    	      }
		    	})
		    	.focus(function(){            
		    		 if ($("ul.ui-autocomplete").is(":hidden")) {
		    		        $(this).autocomplete('search', '');
		    		    }
		    	})
		    	.bind( "focusout", function( event ) {
		    		/*//this.setValueState(sap.ui.core.ValueState.None);
					  //this.setPlaceholder("Select Depot");
		    			var keyLAM = this.value;
					    var partsLAM = keyLAM.split(" ");
					    var lastPartLAM = partsLAM[partsLAM.length - 1];
					    oInputDepotLAM.setValue(lastPartLAM);*/
			     })
		    	.keyup(function() {
		    	    var isValid = false;
		    	    var previousValue = "";
		    	    for (i in depotNameListLAM) {
		    	        if (depotNameListLAM[i].toLowerCase().match(this.value.toLowerCase())) {
		    	            isValid = true;
		    	        }
		    	    }
		    	    if (!isValid) {
		    	        this.value = previousValue;
		    	    } else {
		    	        previousValue = this.value;
		    	    }
		    	});
		    	loggedInUserTypeLAM = objLoginUser.getLoggedInUserType();
				if(loggedInUserTypeLAM == "SEACO"){
					$("#idComboDepotLAM").removeAttr('disabled');
					$("#idComboDepotLAM").attr("disabled","disabled");
					sap.ui.getCore().byId("idBtnMoveRemoveFilterLAM").setEnabled(false);
					sap.ui.getCore().byId("idBtnMoveApplyFilterLAM").setEnabled(true);
					sap.ui.getCore().byId("idDepotLAM").setEnabled(true);
				}
				else{
					var DepotCode = objLoginUser.getLoggedInUserID();
					for(var i=0;i<depotNameListLAM.length;i++){
						if(depotNameListLAM[i].substring(11,15) == DepotCode)
							DepotCode = depotNameListLAM[i];
					}
					$("#idComboDepotLAM").attr("disabled","disabled");
					$("#idComboDepotLAM").val(DepotCode);
					var depotLAM = document.getElementById("idComboDepotLAM").value.split("-");
					sap.ui.getCore().byId("idDepotLAM").setValue(depotLAM[3]);
					sap.ui.getCore().byId("idBtnMoveRemoveFilterLAM").setEnabled(false);
					sap.ui.getCore().byId("idBtnMoveApplyFilterLAM").setEnabled(false);
					sap.ui.getCore().byId("idDepotLAM").setEnabled(false);
				}

		    	busyDialog.close();
		    },
		    function(err){
		    	 errorfromServer(err);
		    	//alert("Error while Reading Result : "+ : window.JSON.stringify(err.response));
		    });
	},
	
	validateDataLAM: function(){
		//busyDialog.open();
		var oCurrent = this;
		arrTransMsgsLAM = [];
		depotNameLAMToPass = "";
		
		var serialNoLAM = "";
		var outDateLAM = "";
		var authLAM = "";
		depotNameLAMToPass = document.getElementById("idComboDepotLAM").value;
		var dateToPassLAM = "";
		var splitDateLAM = "";
		
		var currDateLAM = new Date();
		var currYearLAM = currDateLAM.getFullYear();
		var currMonthLAM = currDateLAM.getMonth()+1;
		var currDayLAM = currDateLAM.getDate();
		
		var validSrNo = true;
		var validAppAmount = true;
		var validAppRef = true;
		var validDate = true;
		var countForNoneLAM = 0;
		
		//to check n show error if nothing is entered
		
		
		for(var i=0;i<aMoveMultipleLAM.length; i++){
			if(i==0){
				validLAMFieldsStatus = true;
				validLAMStatus = true;
				aTempLAM = [];
			}
			if(aMoveMultipleLAM[i].serialNo.trim() == "" && aMoveMultipleLAM[i].appRef.trim() == ""){
				countForNoneLAM = countForNoneLAM + 1;
				continue;
			}
			else{
				if(aMoveMultipleLAM[i].serialNo == ""){
					aMoveMultipleLAM[i].valuestateSrno = sap.ui.core.ValueState.Error;
					aMoveMultipleLAM[i].placeHolderSrno = "Required";
					validSrNo = false;
				}
				else{
					aMoveMultipleLAM[i].valuestateSrno = sap.ui.core.ValueState.None;
					aMoveMultipleLAM[i].placeHolderSrno = "";
					validSrNo = true;
				}
				
				if(aMoveMultipleLAM[i].appRef == ""){
					aMoveMultipleLAM[i].valuestateAppRef = sap.ui.core.ValueState.Error;
					aMoveMultipleLAM[i].placeHolderAppRef = "Required";
					validAppRef = false;
				}
				else{
					aMoveMultipleLAM[i].valuestateAppRef = sap.ui.core.ValueState.None;
					aMoveMultipleLAM[i].placeHolderAppRef = "";
					validAppRef = true;
				}
				//if(sap.ui.getCore().byId("idOutDateInputLAM-col4-row"+i).getValue() == ""){
				if(aMoveMultipleLAM[i].frmtLAMYYYYMMDD == "" || aMoveMultipleLAM[i].frmtLAMYYYYMMDD == null){
					aMoveMultipleLAM[i].valuestateDate = sap.ui.core.ValueState.Error;
					aMoveMultipleLAM[i].placeHolderDate = "Required";
					//sap.ui.getCore().byId("idOutDateInputLAM-col4-row"+i).setValueState(sap.ui.core.ValueState.Error);
					//sap.ui.getCore().byId("idOutDateInputLAM-col4-row"+i).setValue("");
					//sap.ui.getCore().byId("idOutDateInputLAM-col4-row"+i).setPlaceholder("Required");
					//validDate = false;
				}
				else{
					aMoveMultipleLAM[i].valuestateDate = sap.ui.core.ValueState.None;
					aMoveMultipleLAM[i].placeHolderDate = "";
					//sap.ui.getCore().byId("idOutDateInputLAM-col4-row"+i).setValueState(sap.ui.core.ValueState.None);
					//sap.ui.getCore().byId("idOutDateInputLAM-col4-row"+i).setPlaceholder("");
					//validDate = true;
				}
				
				
				aTempLAM.push(aMoveMultipleLAM[i]);
				
			}
			
			if(validLAMFieldsStatus){
				if(validSrNo && validAppRef){
					validLAMFieldsStatus = true;
				}
				else{
					validLAMFieldsStatus = false;
				}
			}
		}
		
		if(countForNoneLAM == aMoveMultipleLAM.length){
			var message = "Please enter atleast one record.";
			sap.ui.commons.MessageBox.alert(message);
		}
		else{
		aMoveMultipleLAM = [];
		aMoveMultipleLAM = aTempLAM;
		oModelMoveLAMultiple.setData({modelData: aMoveMultipleLAM});
		oModelMoveLAMultiple.updateBindings();
		oLAMultipleTable.setVisibleRowCount(aMoveMultipleLAM.length);
		
		//MACHANADATECHANGE-
		// for(var i=0;i<aMoveMultipleLAM.length; i++){
		// 	var dateEntered = sap.ui.getCore().byId("idOutDateInputLAM-col4-row"+i).getValue();
		// 	if(dateEntered == ""){
		// 		sap.ui.getCore().byId("idOutDateInputLAM-col4-row"+i).setValueState(sap.ui.core.ValueState.Error);
		// 		sap.ui.getCore().byId("idOutDateInputLAM-col4-row"+i).setValue("");
		// 		sap.ui.getCore().byId("idOutDateInputLAM-col4-row"+i).setPlaceholder("Required");
		// 		validDate = false;
		// 	}else if((dateEntered.substr(6,4) + dateEntered.substr(3,2) +  dateEntered.substr(0,2)) > frmtLAMYYYYMMDD){
		// 		busyDialog.close();
		// 		sap.ui.getCore().byId("idOutDateInputLAM-col4-row"+i).setValueState(sap.ui.core.ValueState.Error);
		// 		sap.ui.getCore().byId("idOutDateInputLAM-col4-row"+i).setValue("");
		// 		sap.ui.getCore().byId("idOutDateInputLAM-col4-row"+i).setPlaceholder("No Future Date");
		// 		validDate = false;
		// 	}else if(dateEntered.length != 10){
		// 		busyDialog.close();
		// 		sap.ui.getCore().byId("idOutDateInputLAM-col4-row"+i).setValueState(sap.ui.core.ValueState.Error);
		// 		sap.ui.getCore().byId("idOutDateInputLAM-col4-row"+i).setValue("");
		// 		sap.ui.getCore().byId("idOutDateInputLAM-col4-row"+i).setPlaceholder("Improper Format");
		// 		validDate = false;
		// 	}
		// 	else{
		// 		sap.ui.getCore().byId("idOutDateInputLAM-col4-row"+i).setValueState(sap.ui.core.ValueState.None);
		// 		sap.ui.getCore().byId("idOutDateInputLAM-col4-row"+i).setPlaceholder("");
		// 		validDate = true;
		// 	}
			
		// 	if(validLAMStatus){
		// 		if(validLAMFieldsStatus && validDate){
		// 			validLAMStatus = true;
		// 		}
		// 		else{
		// 			validLAMStatus = false;
		// 		}
		// 	}
			
		// }
	    validLAMStatus = true;
		//MACHANADATECHANGE-
		
		
				if(validLAMFieldsStatus && validLAMStatus){
					busyDialog.open();
					//oCurrent.validateAmountLAM();
					var serialNo1 = "";
					var serialNo2 = "";
					//http://seanwgd1.gessap.local:8000/sap/opu/odata/sap/ZNW_SEACO_PORTAL_REQ15_SRV/Lessee_Lookup_Amt_Mul?$filter=Depot eq '1547' 
					//and ISerial1 eq 'GESU2440805,GESU2463035' and ISerial2 eq 'ZESU2440805'
					for(var i=0;i<aMoveMultipleLAM.length; i++){
						//serialNoLAM = sap.ui.getCore().byId("idSerNoLAMInput-col1-row"+i).getValue();	//MACHANADATECHANGE-
						serialNoLAM = aMoveMultipleLAM[i].serialNo.trim(); 	//MACHANADATECHANGE+
						//if(serialNoLAM.length > 0 && serialNoLAM.length == 11){
							if(i<13)
								serialNo1 += serialNoLAM.toUpperCase() + ",";
							else
								serialNo2 += serialNoLAM.toUpperCase() + ",";
						//}
							
					}
					var selDepValLAM = document.getElementById("idComboDepotLAM").value;
				    depotCodeLAMToPass = selDepValLAM.substring(11,15);
					oModel = new sap.ui.model.odata.ODataModel(serviceUrl15_old, true);
					var urlToCallLAMAmountLookup = serviceUrl15_old + "/Lessee_Lookup_Amt_Mul?$filter=Depot eq '" + depotCodeLAMToPass + "' and ISerial1 eq '" 
														   + serialNo1 + "' and ISerial2 eq '" + serialNo2 + "'";
					//alert("amount lookup : "+urlToCallLAMAmountLookup);
					OData.request({ 
					      requestUri: urlToCallLAMAmountLookup,
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
					    	aAmountLookupLAM = data.results;
					    	for(var i=0;i<aMoveMultipleLAM.length; i++){
								var statusSRNO= "";
								var statusAmount = true;
								var statusAmountMismatch = true;
								var statusDate= "";
								var serialNo= "";
								var appAmount= "";
								var appRef= "";
								var Appdate= "";
								var warningErrors= "";
								var amountMismatch = "";
							
								/* MACHANADATECHANGE- */
							// serialNoLAM = sap.ui.getCore().byId("idSerNoLAMInput-col1-row"+i).getValue();
							// appAmountLAM = sap.ui.getCore().byId("idTxtAppAmountLAM-col2-row"+i).getValue();
							// appRefLAM = sap.ui.getCore().byId("idTxtAppRefLAM-col3-row"+i).getValue();
							// outDateLAM = sap.ui.getCore().byId("idOutDateInputLAM-col4-row"+i).getValue();
						   /* MACHANADATECHANGE- */

						   /* MACHANADATECHANGE+ */
						   serialNoLAM = aMoveMultipleLAM[i].serialNo;
						   appAmountLAM = aMoveMultipleLAM[i].appAmount;
						   appRefLAM = aMoveMultipleLAM[i].appRef;
						   //outDateLAM = aMoveMultipleLAM[i].Appdate.format("dd/mm/yyyy");
						   outDateLAM = aMoveMultipleLAM[i].frmtLAMYYYYMMDD;
							/* MACHANADATECHANGE+ */

							var selYearLAM = "";
							var selMonthLAM = "";
							var selDayLAM = "";
							
							serialNo = serialNoLAM;
							
							appRef = appRefLAM;
							Appdate = outDateLAM;
							
							if(serialNoLAM.trim().length >0 && serialNoLAM.trim().length != 11){
									statusSRNO = false;
									//warningErrors = "Incorrect Serial Number \n";
							}
							else{
								statusSRNO = true;
								//warningErrors = "";
							}
							
							//code to lookup amount and set error message
							/*if(!$.isNumeric(appAmountLAM)){
								statusAmount = false;
								appAmount = appAmountLAM;
							}
							else{
								statusAmount = true;
								//appAmount = Number(appAmountLAM).toFixed(2);
								//if serial number is valid check for amount. if serial no not valid then show the amount as entered by the user
								if(statusSRNO){
									appAmount = Number(appAmountLAM).toFixed(2);
									if(appAmount == aAmountLookupLAM[i].Amount){
										statusAmountMismatch = true;
									}
									else{
										statusAmountMismatch = false;
										if((aAmountLookupLAM[i].Amount.trim().length > 0) && (aAmountLookupLAM[i].Message.length == 0))
											amountMismatch = "Invalid Amount. Document Amount is " + aAmountLookupLAM[i].Amount;
										else if((aAmountLookupLAM[i].Amount.trim().length == 0) && (aAmountLookupLAM[i].Message.length == 0)){
											appAmount = "";
											amountMismatch = "";
										}
										else{
											amountMismatch = aAmountLookupLAM[i].Message;
										}
											
									}
								}
								else{
									appAmount = Number(appAmountLAM).toFixed(2);
								}
								
							}*/
							
							/* MACHANADATECHANGE- */
							// var rxDatePattern = /^(\d{1,2})(\-|-)(\d{1,2})(\-|-)(\d{4})$/;
		                    // var dtArray = outDateLAM.match(rxDatePattern);
		                    // if (dtArray == null){
		                    // 	statusDate = false;
		                    //  }
		                    // else{
		                    // 	statusDate = true;
		                    // 	 splitDateLAM = outDateLAM.split("-");
		     				// 	dateToPassLAM = splitDateLAM[2]+splitDateLAM[1]+splitDateLAM[0];
		                              
		     				// 	 selYearLAM = splitDateLAM[2];
		    				// 	 selMonthLAM = splitDateLAM[1];
		    				// 	 selDayLAM = splitDateLAM[0];
							// }
							statusDate = true;
							/* MACHANADATECHANGE- */

		                    if(statusDate && statusSRNO){
		                    	status = "images/green_signal.png";
								warningErrors = "";
		                    }
		                    else if(!statusDate && !statusSRNO){
		                    	status = "images/red_signal.png";
								warningErrors = "Incorrect Serial Number\nIncorrect Date";
		                    }
		                    else if(!statusDate && statusSRNO){
		                    	status = "images/red_signal.png";
								warningErrors = "Incorrect Date";
		                    }
		                    else if(statusDate && !statusSRNO){
		                    	status = "images/red_signal.png";
								warningErrors = "Incorrect Serial Number";
		                    }
							
							/*if(statusDate && statusSRNO && statusAmount){
								status = "images/green_signal.png";
								warningErrors = "";
							}
							else if(!statusDate && !statusSRNO && !statusAmount){
								status = "images/red_signal.png";
								warningErrors = "Incorrect Serial Number\nIncorrect Date\nInvalid Amount";
							}
							else if(!statusSRNO && !statusDate && statusAmount){
								status = "images/red_signal.png";
								warningErrors = "Incorrect Serial Number\nIncorrect Date";
							}
							else if(!statusSRNO && statusDate && !statusAmount){
								status = "images/red_signal.png";
								warningErrors = "Incorrect Serial Number\nInvalid Amount";
							}
							else if(statusSRNO && !statusDate && statusAmount){
								status = "images/red_signal.png";
								warningErrors = "Incorrect Date";
							}
							else if(statusSRNO && !statusDate && !statusAmount){
								status = "images/red_signal.png";
								warningErrors = "Incorrect Date\nInvalid Amount";
							}
							else if(statusSRNO && statusDate && !statusAmount){
								status = "images/red_signal.png";
								warningErrors = "Invalid Amount";
							}
							else if(!statusSRNO && statusDate && statusAmount){
								status = "images/red_signal.png";
								warningErrors = "Incorrect Serial Number";
							}
							if((amountMismatch.length > 0)){
								//to check if any other error is already present. if yes next line or else just msg
								status = "images/red_signal.png";
								if(warningErrors.length > 0)
									warningErrors += "\n" + amountMismatch;
								else
									warningErrors = amountMismatch;
							}
							
							else if(!statusSRNO && statusDate){
								status = "images/red_signal.png";
								warningErrors = "Incorrect Serial Number";
							}
							else if(statusSRNO && !statusDate){
								status = "images/red_signal.png";
								warningErrors = "Incorrect Date";
							}
							*/
							arrTransMsgsLAM.push({
								"checked": false,
								"status": status,
								"serialNo": serialNo.toUpperCase(),
								"appAmount": Number(aAmountLookupLAM[i].Amount).toFixed(2), 
								"appRef": appRef.toUpperCase(),
								"Appdate":Appdate,
								"warningErrors": warningErrors //"images/red_signal.png"  //"images/red_signal.png";
							});
							}
					    	var selDepValLAM = document.getElementById("idComboDepotLAM").value;
						    depotCodeLAMToPass = selDepValLAM.substring(11,15);
							busyDialog.close();
							var bus = sap.ui.getCore().getEventBus();
						  	  	bus.publish("nav", "to", {
						        id : "LesseeApprovalMltplResults"
					  	  	});
						  	  
						  	var oObjLAMultipleRes = new LAMultipleResultView();
						  	oObjLAMultipleRes.updateBindingLAM();
						  	oObjLAMultipleRes.enableSubmitBtnLAMR();
						
				},
					    function(err){
					    	 errorfromServer(err);
					    	//alert("Error while Reading Result : "+ : window.JSON.stringify(err.response));
					    });
				}
					else{
						busyDialog.close();
					}
					
		}	
	},
	
	resetLesseeMultiple: function(){
		loggedInUserTypeLAM = objLoginUser.getLoggedInUserType();
		oModelMoveLAMultiple.setData({modelData: []});
		
		if(loggedInUserTypeLAM == "SEACO"){
			//document.getElementById("idComboDepotLAM").value = "";
			$("#idComboDepotLAM").val("");
			sap.ui.getCore().byId("idDepotLAM").setValue("");
    		
    		if(document.getElementById("idComboDepotLAM")){
                document.getElementById("idComboDepotLAM").style.borderColor = "#cccccc";
	    		document.getElementById("idComboDepotLAM").style.background = "#ffffff";
	    		document.getElementById("idComboDepotLAM").placeholder = "Select Depot";
			}
    		if(sap.ui.getCore().byId("idBtnMoveRemoveFilterLAM")){
            	sap.ui.getCore().byId("idBtnMoveRemoveFilterLAM").setEnabled(false);
            }
		}
		aMoveMultipleLAM.length = 0;
		aMoveMultipleLAM.push({checked: false, serialNo: "", appAmount: "", appRef: "", Appdate: dtTodayLAM, 'frmtLAMYYYYMMDD': frmtLAMYYYYMMDD, placeHolderSrno: "", placeHolderAppRef: "", placeHolderDate: "", valuestateSrno:sap.ui.core.ValueState.None, valuestateAppRef:sap.ui.core.ValueState.None, valuestateDate:sap.ui.core.ValueState.None});
		aMoveMultipleLAM.push({checked: false, serialNo: "", appAmount: "", appRef: "", Appdate: dtTodayLAM, 'frmtLAMYYYYMMDD': frmtLAMYYYYMMDD, placeHolderSrno: "", placeHolderAppRef: "", placeHolderDate: "", valuestateSrno:sap.ui.core.ValueState.None, valuestateAppRef:sap.ui.core.ValueState.None, valuestateDate:sap.ui.core.ValueState.None});
		aMoveMultipleLAM.push({checked: false, serialNo: "", appAmount: "", appRef: "", Appdate: dtTodayLAM, 'frmtLAMYYYYMMDD': frmtLAMYYYYMMDD, placeHolderSrno: "", placeHolderAppRef: "", placeHolderDate: "", valuestateSrno:sap.ui.core.ValueState.None, valuestateAppRef:sap.ui.core.ValueState.None, valuestateDate:sap.ui.core.ValueState.None});
		aMoveMultipleLAM.push({checked: false, serialNo: "", appAmount: "", appRef: "", Appdate: dtTodayLAM, 'frmtLAMYYYYMMDD': frmtLAMYYYYMMDD, placeHolderSrno: "", placeHolderAppRef: "", placeHolderDate: "", valuestateSrno:sap.ui.core.ValueState.None, valuestateAppRef:sap.ui.core.ValueState.None, valuestateDate:sap.ui.core.ValueState.None});
		aMoveMultipleLAM.push({checked: false, serialNo: "", appAmount: "", appRef: "", Appdate: dtTodayLAM, 'frmtLAMYYYYMMDD': frmtLAMYYYYMMDD, placeHolderSrno: "", placeHolderAppRef: "", placeHolderDate: "", valuestateSrno:sap.ui.core.ValueState.None, valuestateAppRef:sap.ui.core.ValueState.None, valuestateDate:sap.ui.core.ValueState.None});
		oModelMoveLAMultiple.setData({modelData: aMoveMultipleLAM});
		oModelMoveLAMultiple.updateBindings();
		sap.ui.getCore().byId("idLAMEntryTable").setVisibleRowCount(5);
	}
	
});
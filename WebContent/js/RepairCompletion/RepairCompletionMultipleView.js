
var dtTodayRCMltpl = new Date();
var frmtRCMYYYYMMDD = [dtTodayRCMltpl.getFullYear(),padZero(dtTodayRCMltpl.getMonth()+1),padZero(dtTodayRCMltpl.getDate())].join('');
var aRCMultipleRCM = [];

var oModelMoveMultipleRCM = new sap.ui.model.json.JSONModel();
oModelMoveMultipleRCM.setData({modelData: aRCMultipleRCM});


var arrayLenAMM;
var checkedLengthRCM = 0;
var depotNameListRCM = [];
var depotNameRCMToPass;
var depotCodeRCMToPass;
var arrTransMsgsRCM = [];
var validRCMStatus = false;
var validRCMFieldStatus = true;
var aTempRCM = [];
var oRCMultipleTable;
var loggedInUserTypeRCM = "";
sap.ui.model.json.JSONModel.extend("RepairCompltnMultipleView", {

	createRepairCompltnMultiple: function(){
		aRCMultipleRCM.length = 0;
		aRCMultipleRCM.push({checked: false, serialNo: "", frmtRCMYYYYMMDD: frmtRCMYYYYMMDD, keyUPC: "1", keyEstType: "0",  RCMDate: dtTodayRCMltpl, placeHolderSrno: "", placeHolderUPC: "", placeHolderEstType: "", placeHolderDate: "", valuestateSrno:sap.ui.core.ValueState.None, valuestateUPC:sap.ui.core.ValueState.None, valuestateEstType:sap.ui.core.ValueState.None, valuestateDate:sap.ui.core.ValueState.None});
		aRCMultipleRCM.push({checked: false, serialNo: "", frmtRCMYYYYMMDD: frmtRCMYYYYMMDD, keyUPC: "1", keyEstType: "0",  RCMDate: dtTodayRCMltpl, placeHolderSrno: "", placeHolderUPC: "", placeHolderEstType: "", placeHolderDate: "", valuestateSrno:sap.ui.core.ValueState.None, valuestateUPC:sap.ui.core.ValueState.None, valuestateEstType:sap.ui.core.ValueState.None, valuestateDate:sap.ui.core.ValueState.None});
		aRCMultipleRCM.push({checked: false, serialNo: "", frmtRCMYYYYMMDD: frmtRCMYYYYMMDD, keyUPC: "1", keyEstType: "0",  RCMDate: dtTodayRCMltpl, placeHolderSrno: "", placeHolderUPC: "", placeHolderEstType: "", placeHolderDate: "", valuestateSrno:sap.ui.core.ValueState.None, valuestateUPC:sap.ui.core.ValueState.None, valuestateEstType:sap.ui.core.ValueState.None, valuestateDate:sap.ui.core.ValueState.None});
		aRCMultipleRCM.push({checked: false, serialNo: "", frmtRCMYYYYMMDD: frmtRCMYYYYMMDD, keyUPC: "1", keyEstType: "0",  RCMDate: dtTodayRCMltpl, placeHolderSrno: "", placeHolderUPC: "", placeHolderEstType: "", placeHolderDate: "", valuestateSrno:sap.ui.core.ValueState.None, valuestateUPC:sap.ui.core.ValueState.None, valuestateEstType:sap.ui.core.ValueState.None, valuestateDate:sap.ui.core.ValueState.None});
		aRCMultipleRCM.push({checked: false, serialNo: "", frmtRCMYYYYMMDD: frmtRCMYYYYMMDD, keyUPC: "1", keyEstType: "0",  RCMDate: dtTodayRCMltpl, placeHolderSrno: "", placeHolderUPC: "", placeHolderEstType: "", placeHolderDate: "", valuestateSrno:sap.ui.core.ValueState.None, valuestateUPC:sap.ui.core.ValueState.None, valuestateEstType:sap.ui.core.ValueState.None, valuestateDate:sap.ui.core.ValueState.None});
		var oCurrRCM = this;
		// Labels
		var oLabelDepotM = new sap.ui.commons.Label({text: "Depot:",
			required: true,
			layoutData: new sap.ui.layout.GridData({span: "L1 M1 S8",linebreak: false, margin: true}),
            wrapping: true}).addStyleClass("marginTop15");

		var oLabelProgresType = new sap.ui.commons.Label({text: "Progress Type:",
			required: true,
			layoutData: new sap.ui.layout.GridData({span: "L1 M1 S8",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("marginTop20");


		var oLabelMandatoryM = new sap.ui.commons.Label({text: "Mandatory Field",
			required: true,
			requiredAtBegin : true,
            wrapping: true}).addStyleClass("margin10 marginTopBot30");

		var oLabelSpaceRCM = new sap.ui.commons.Label({text: " ",
			width:"8px",
            wrapping: true});

		var oComboDepotRCM = new sap.ui.core.HTML("idListDepotComboRCM",{layoutData: new sap.ui.layout.GridData({span: "L4 M6 S12"})});
		var htmlContentDepot = '<input disabled="disabled" id="idComboDepotRCM" placeholder="Select Depot" class="FormInputStyle marginTop10" style="width:100%;height:38px">';
		oComboDepotRCM.setContent(htmlContentDepot);

	 // Text Field
    	oInputDepotRCM = new sap.ui.commons.TextField('idDepotRCM',{
    		layoutData: new sap.ui.layout.GridData({span: "L1 M1 S8",linebreak: false, margin: true}),
    		placeholder:"Depot Code",
    	}).addStyleClass("FormInputStyle marginTop10 DepotInput38px");

    	 var oComboProgressType = new sap.ui.commons.DropdownBox("idProgressTypeRCM", {
			  layoutData: new sap.ui.layout.GridData({span: "L2 M8 S4",linebreak: false, margin: true}),
			  change:function(){
				  this.setValueState(sap.ui.core.ValueState.None);
				  this.setPlaceholder("Select Progress Type");
			  },
	          items: [
                    new sap.ui.core.ListItem({text: "Post Repair Inspection", key: "M"}),
	                ],
			  displaySecondaryValues:false, placeholder:"Select Progress Type"}).addStyleClass("FormInputStyle marginTop10 DepotInput38px");
   	 oComboProgressType.setSelectedKey("M");

    	// Buttons
	   	 var oBtnMoveValidate = new sap.m.Button("idBtnMoveValidateRCM",{
		          text : "Validate",
		          width:"80px",
		          styled:false,
		          layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
		          press:function(){
		        	  oCurrRCM.validateRepairCompltnMultiple();
		          }}).addStyleClass("submitBtn marginTop20");

	   	var oBtnMoveRemoveFilter = new sap.m.Button("idBtnMoveRemoveFilterRCM",{
	          text : "Remove Filter",
	          //width:"115px",
	          styled:false,
	          enabled:false,
	          layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: false, margin: true}),
	          press:function(){
	        	  oInputDepotRCM.setValue("");
	        	  $("#idComboDepotRCM").val("");
		          this.setEnabled(false);
		          }}).addStyleClass("submitBtn marginTop5");

	   	 var oBtnMoveApplyFilter = new sap.m.Button("idBtnMoveApplyFilterRCM",{
		          text : "Apply Filter",
		          //width:"115px",
		          styled:false,
		          layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: false, margin: true}),
		          press:function(){
		        	  if(oInputDepotRCM.getValue() == ""){
		        		  $("#idComboDepotRCM").val("");
		          	  }
		          	  else{
		          		sap.ui.getCore().byId("idBtnMoveRemoveFilterRCM").setEnabled(true);
		          		document.getElementById("idComboDepotRCM").style.borderColor = "#cccccc";
		        		document.getElementById("idComboDepotRCM").style.background = "#ffffff";
				          		var depotCodeRCM = new RegExp(oInputDepotRCM.getValue());
				          		  for(var i=0; i<depotNameListRCM.length; i++){
				          			var depotNameRCM = depotNameListRCM[i];
				          			var partsRCM = depotNameRCM.split("-");
				          			var depotCodeRCM = partsRCM[3];
				          			if(depotCodeRCM == oInputDepotRCM.getValue()){
					          			$("#idComboDepotRCM").val(depotNameRCM);
					          			break;
					          		}
					          		else{
					          			$("#idComboDepotRCM").val("");
					          		}
				          		  }
		          	  }
		        	  }}).addStyleClass("submitBtn marginTop5");

	   	var oFlexApplyRemoveRCM = new sap.m.FlexBox({
	           items: [
						oBtnMoveApplyFilter,
						oLabelSpaceRCM,
						oBtnMoveRemoveFilter
	           ],
	           layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12",linebreak: false, margin: false}),
	           direction : "Row",
				});

	   	var oImageAddMOM = new sap.ui.commons.Image("imgAddRepairCompltn",{
	   		press: function() {
	   		}
	   	});
	   	oImageAddMOM.setSrc("images/add_row.png");
	   	oImageAddMOM.setDecorative(false);
	   	oImageAddMOM.addStyleClass("marginTop20 marginRight5");

	   	var MaxLimitReachedMessage = "Max row limit of 25 reached. Please submit these rows and then add more unit numbers.";

	   	var oBtnAddNewRow = new sap.ui.commons.Link({
	        text: "Add New Row",
	        tooltip: "Add New Row",
	        layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: false, margin: true}),
	        press: function() {
	        	var currentArrayLen = aRCMultipleRCM.length;
	        	if(currentArrayLen == 25){
	        		sap.ui.commons.MessageBox.show(MaxLimitReachedMessage,
	                        sap.ui.commons.MessageBox.Icon.WARNING,
	                        "Warning",
	                        [sap.ui.commons.MessageBox.Action.OK],
	                            sap.ui.commons.MessageBox.Action.OK);
	        	}
	        	else{
	        		aRCMultipleRCM.push({
	        		'checked':false,
	                 'serialNo':"",
	                 'frmtRCMYYYYMMDD': frmtRCMYYYYMMDD,
	                 'keyUPC':"1",
	                 'keyEstType' : "0",
	                 'RCMDate': dtTodayRCMltpl,
	                 'placeHolderSrno': "",
	                 'placeHolderUPC': "",
	                 'placeHolderEstType': "",
	                 'placeHolderDate': "",
	                 'valuestateSrno':sap.ui.core.ValueState.None,
	                 'valuestateUPC':sap.ui.core.ValueState.None,
	                 'valuestateEstType':sap.ui.core.ValueState.None,
	                 'valuestateDate':sap.ui.core.ValueState.None
               });
	        		oModelMoveMultipleRCM.updateBindings();
	        		oRCMultipleTable.setVisibleRowCount(aRCMultipleRCM.length);
				        currentArrayLen = currentArrayLen + 1;
	        	}
	        }}).addStyleClass("marginTop25 marginRight");

	   	var oImageDeleteMOM = new sap.ui.commons.Image("imgDeleteRCM");
	   	oImageDeleteMOM.setSrc("images/delete_row.png");
	   	oImageDeleteMOM.setDecorative(false);
	   	oImageDeleteMOM.addStyleClass("marginTop20 marginRight5");

	   	var oBtnDeleteRow = new sap.ui.commons.Link({
	        text: "Delete Checked Rows",
	        tooltip: "Delete Checked Rows",
	        layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: false, margin: true}),
	        press: function() {
	        	  arrayLenAMM = aRCMultipleRCM.length;
	        	  var unCheckedCount = 0;
	        	  for(var j=0; j<arrayLenAMM; j++){
	        		  if(aRCMultipleRCM[j].checked == false){
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
		        		  if(aRCMultipleRCM[i].checked){
		        			  aRCMultipleRCM.splice(i,1);
		        			  oModelMoveMultipleRCM.updateBindings();
		        			  arrayLenAMM = arrayLenAMM - 1;
		        		  }
		        	  }
		        	  oRCMultipleTable.setVisibleRowCount(arrayLenAMM);
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
    	 oRCMultipleTable = new sap.ui.table.Table("idRCMTblDefault",{
    		visibleRowCount: 5,
            firstVisibleRow: 3,
            columnHeaderHeight: 40,
            selectionMode: sap.ui.table.SelectionMode.None,
            width:"60%",
            height:"100%"
    	 }).addStyleClass("marginTop33 tblBorder");

    	// Table Columns
    	oRCMultipleTable.addColumn(new sap.ui.table.Column({
        	template: new sap.ui.commons.CheckBox({
   			 change : function() {
   				 if(this.getChecked() == false){
   					checkedLengthRCM--;
   				 }
   				 else{
   					checkedLengthRCM++;
   				 }
   			 }
		}).bindProperty("checked", "checked"),
		width:"30px",
        	resizable:false,
        	//hAlign: "Center"
        	}));

    	var arrEnteredSerNo = [];

    	oRCMultipleTable.addColumn(new sap.ui.table.Column({
     		 label: new sap.ui.commons.Label({text: "Serial Number", required: true}).addStyleClass("wraptextcol"),
   		 template: new sap.ui.commons.TextField("idSerNoRCMInput",{textAlign:"Left",
   			 change: function(){
   				 if(this.getValue() != ""){
   					 this.setValueState(sap.ui.core.ValueState.None);
   				 }
   				 /*var enteredSerNo = this.getValue();
   				 var count = 0;

                    for(var j=0;j<aRCMultipleRCM.length;j++){
                            if(enteredSerNo == aRCMultipleRCM[j].serialNo){
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
                    }*/
   			 }}).bindProperty("value", "serialNo").bindProperty("valueState", "valuestateSrno").bindProperty("placeholder", "placeHolderSrno").addStyleClass("borderStyle margin5"),
            resizable:false,
            width:"auto",
            hAlign: sap.ui.commons.layout.HAlign.Left
   		 }));

   	sap.ui.getCore().byId("idSerNoRCMInput").setMaxLength(11);

    var oComboUnitPartCode = new sap.ui.commons.DropdownBox("idUnitPartCodeDRpDwnRCM", {
		  layoutData: new sap.ui.layout.GridData({span: "L2 M8 S4"}),
		  change:function(){
			  this.setValueState(sap.ui.core.ValueState.None);
			  this.setPlaceholder("");

		  },
        items: [
               //new sap.ui.core.ListItem({text: "", key: "1"}),
               new sap.ui.core.ListItem({text: "Container", key: "C"}),
               new sap.ui.core.ListItem({text: "Machinery", key: "M"}),
              ],
		  displaySecondaryValues:false}
    ).bindProperty("selectedKey", "keyUPC").bindProperty("valueState", "valuestateUPC").bindProperty("placeholder", "placeHolderUPC").addStyleClass("FormInputStyle marginTop10");

	 oRCMultipleTable.addColumn(new sap.ui.table.Column({
		 visible : false,
 		 label: new sap.ui.commons.Label({text: "Unit Part Code", required: true, textAlign:"Left"}).addStyleClass("wraptextcol"),
		 template: oComboUnitPartCode.addStyleClass("borderStyle"),
       resizable:false,
       width:"auto",
       hAlign: sap.ui.commons.layout.HAlign.Left,
		 }));

	 var oComboEstType = new sap.ui.commons.DropdownBox("idEstTypeDrpDwnRCM", {
		  layoutData: new sap.ui.layout.GridData({span: "L2 M8 S4"}),
		  change:function(){
			  this.setValueState(sap.ui.core.ValueState.None);
			  this.setPlaceholder("");
		  },
         items: [
                //new sap.ui.core.ListItem({text: "", key: "0"}),
                new sap.ui.core.ListItem({text: "Original", key: "Original"}),
                new sap.ui.core.ListItem({text: "Additional", key: "Additional"}),
                new sap.ui.core.ListItem({text: "Superseding", key: "Superseding"}),
                new sap.ui.core.ListItem({text: "Pre-Delivery", key: "Pre-Delivery"}),
                new sap.ui.core.ListItem({text: "Pre-Sales", key: "Pre-Sales"}),
                new sap.ui.core.ListItem({text: "Joint Survey", key: "Joint Survey"}),
               ],
		  displaySecondaryValues:false}
	 ).bindProperty("selectedKey", "keyEstType").bindProperty("valueState", "valuestateEstType").bindProperty("placeholder", "placeHolderEstType").addStyleClass("FormInputStyle marginTop10");

	 oRCMultipleTable.addColumn(new sap.ui.table.Column({
		 visible : false,
 		 label: new sap.ui.commons.Label({text: "Estimate Type", required: true, textAlign:"Left"}).addStyleClass("wraptextcol"),
		 template: oComboEstType.addStyleClass("borderStyle"),
       resizable:false,
       width:"auto",
       hAlign: sap.ui.commons.layout.HAlign.Left,
		 }));


 	var oOutDateRCM = new sap.ui.commons.DatePicker("idOutDateInputRCM",{
		width:"auto",
		 // textAlign:"Right",
		  value: {
			  path: "{outDate}",
		  type: new sap.ui.model.type.Date({pattern: "dd-MM-yyyy"})},
		  change:function(){
				if(this.getValue() != ""){
					this.setValueState(sap.ui.core.ValueState.None);
    				this.setPlaceholder("");
				}
			},
		}).bindProperty("yyyymmdd", "frmtRCMYYYYMMDD").bindProperty("valueState", "valuestateDate").bindProperty("placeholder", "placeHolderDate").addStyleClass("margin5 paddingRight15");

 	oRCMultipleTable.addColumn(new sap.ui.table.Column({
 		 label: new sap.ui.commons.Label({text: "Date", required: true}).addStyleClass("wraptextcol"),
		 template: oOutDateRCM.addStyleClass("borderStyle"),
       resizable:false,
       width:"auto",
      // hAlign: sap.ui.commons.layout.HAlign.Right,
		 }));

 	oRCMultipleTable.setModel(oModelMoveMultipleRCM);
 	oRCMultipleTable.bindRows("/modelData");

	// Responsive Grid Layout
	  var oRCMultipleLayout = new sap.ui.layout.form.ResponsiveGridLayout("idRepairCompltnMultipleLayout",{
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
	   var oRepairCompltnMultipleForm = new sap.ui.layout.form.Form("idRepairCompltnMultipleForm",{
	           layout: oRCMultipleLayout,
	           formContainers: [

	                   new sap.ui.layout.form.FormContainer("idRepairCompltnMultipleFormC1",{
	                       formElements: [
												new sap.ui.layout.form.FormElement({
												    fields: [oLabelDepotM, oComboDepotRCM, oInputDepotRCM,oFlexApplyRemoveRCM]
												}),
												new sap.ui.layout.form.FormElement({
														visible : false,
												    fields: [oLabelProgresType, oComboProgressType]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oRCMultipleTable]
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
	           ]
	   });
	   	return oRepairCompltnMultipleForm;

	},

	populateDepotNameRCM:function(){
		busyDialog.open();
		oModel = new sap.ui.model.odata.ODataModel(serviceUrl15, true);
		var urlToCall = serviceUrl15 + "/F4_Functional_Location";
		//alert("urlToCallRCSDep : "+urlToCallRCSDep);
		OData.request({
		      requestUri: urlToCall,
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
		    		depotNameListRCM[i] = data.results[i].FunctionalLoc;
				}
		//depotNameListRCM = aGlobalDepotNames;
		    	$( "#idComboDepotRCM" ).autocomplete({
		    	      source: depotNameListRCM,
		    	      minLength: 0,
		    	      select: function(){
		    	    	  document.getElementById("idComboDepotRCM").style.borderColor = "#cccccc";
		  				  document.getElementById("idComboDepotRCM").style.background = "#ffffff";
		  				  $("#idComboDepotRCM").attr("placeholder","Select Depot");
		    	      }
		    	})
		    	.focus(function(){
		    		 if ($("ul.ui-autocomplete").is(":hidden")) {
		    		        $(this).autocomplete('search', '');
		    		    }
		    	})
		    	.bind( "focusout", function( event ) {
			     })
		    	.keyup(function() {
		    	    var isValid = false;
		    	    var previousValue = "";
		    	    for (i in depotNameListRCM) {
		    	        if (depotNameListRCM[i].toLowerCase().match(this.value.toLowerCase())) {
		    	            isValid = true;
		    	        }
		    	    }
		    	    if (!isValid) {
		    	        this.value = previousValue;
		    	    } else {
		    	        previousValue = this.value;
		    	    }
		    	});
		    	loggedInUserTypeRCM = objLoginUser.getLoggedInUserType();
				if(loggedInUserTypeRCM == "SEACO"){
					$("#idComboDepotRCM").removeAttr('disabled');
					$("#idComboDepotRCM").attr("disabled","disabled");
					sap.ui.getCore().byId("idBtnMoveRemoveFilterRCM").setEnabled(false);
					sap.ui.getCore().byId("idBtnMoveApplyFilterRCM").setEnabled(true);
					sap.ui.getCore().byId("idDepotRCM").setEnabled(true);
				}
				else{
					var DepotCode = objLoginUser.getLoggedInUserID();
					for(var i=0;i<depotNameListRCM.length;i++){
						if(depotNameListRCM[i].substring(11,15) == DepotCode)
							DepotCode = depotNameListRCM[i];
					}
					$("#idComboDepotRCM").attr("disabled","disabled");
					$("#idComboDepotRCM").val(DepotCode);
					var depotRCM = document.getElementById("idComboDepotRCM").value.split("-");
					sap.ui.getCore().byId("idDepotRCM").setValue(depotRCM[3]);
					sap.ui.getCore().byId("idBtnMoveRemoveFilterRCM").setEnabled(false);
					sap.ui.getCore().byId("idBtnMoveApplyFilterRCM").setEnabled(false);
					sap.ui.getCore().byId("idDepotRCM").setEnabled(false);
				}
		    	busyDialog.close();
		   },
		    function(err){
		    	 errorfromServer(err);
		    });
	},

	validateRepairCompltnMultiple: function(){
		var oCurrRCM = this;
		vInputDepotMValRCM = oInputDepotRCM.getValue();
		vInputDepotListRCM = document.getElementById("idComboDepotRCM").value;

  	  if(vInputDepotListRCM.trim() == ""){
  		  document.getElementById("idComboDepotRCM").style.borderColor = "red";
		  document.getElementById("idComboDepotRCM").style.background = "#FAD4D4";
		  $("#idComboDepotRCM").attr("placeholder","Required");
  	  }
  	  else{
  		var match = jQuery.inArray(vInputDepotListRCM,depotNameListRCM);
		if(match < 0){
			document.getElementById("idComboDepotRCM").style.borderColor = "red";
    		document.getElementById("idComboDepotRCM").style.background = "#FAD4D4";
    		document.getElementById("idComboDepotRCM").value = "";
    		document.getElementById("idComboDepotRCM").placeholder = "Invalid Depot";
    		isValid = false;
		}
		else{
			document.getElementById("idComboDepotRCM").style.borderColor = "#cccccc";
    		document.getElementById("idComboDepotRCM").style.background = "#ffffff";
    		document.getElementById("idComboDepotRCM").placeholder = "Select Depot";
    		oCurrRCM.validateDataRCM();
		}
  	  }
	},

	validateDataRCM: function(){
		busyDialog.open();

		arrTransMsgsRCM = [];
		depotNameRCMToPass = "";
		depotNameRCMToPass = document.getElementById("idComboDepotRCM").value;

		var validSrNo = true;
		var validUPC = true;
		var validEstType = true;
		var validDate = true;

		var dateToPassRCM = "";
		var splitDateRCM = "";
		for(var i=0;i<aRCMultipleRCM.length; i++){
			if(i==0){
				validRCMStatus = true;
				validRCMFieldStatus = true;
				aTempRCM = [];
			}
			if(aRCMultipleRCM[i].serialNo.trim() == "" && aRCMultipleRCM[i].keyUPC.trim() == "1" && aRCMultipleRCM[i].keyEstType.trim() == "0"){
				continue;
			}
			else{
				if(aRCMultipleRCM[i].serialNo == ""){
					aRCMultipleRCM[i].valuestateSrno = sap.ui.core.ValueState.Error;
					aRCMultipleRCM[i].placeHolderSrno = "Required";
					validSrNo = false;
				}
				else{
					aRCMultipleRCM[i].valuestateSrno = sap.ui.core.ValueState.None;
					aRCMultipleRCM[i].placeHolderSrno = "";
					validSrNo = true;
				}

				/*if(sap.ui.getCore().byId("idUnitPartCodeDRpDwnRCM-col2-row"+i).getValue().trim().length == 0){
					sap.ui.getCore().byId("idUnitPartCodeDRpDwnRCM-col2-row"+i).setValueState(sap.ui.core.ValueState.Error);
					sap.ui.getCore().byId("idUnitPartCodeDRpDwnRCM-col2-row"+i).setValue("");
					sap.ui.getCore().byId("idUnitPartCodeDRpDwnRCM-col2-row"+i).setPlaceholder("Required");
					validUPC = false;
				}
				else{
					sap.ui.getCore().byId("idUnitPartCodeDRpDwnRCM-col2-row"+i).setValueState(sap.ui.core.ValueState.None);
					sap.ui.getCore().byId("idUnitPartCodeDRpDwnRCM-col2-row"+i).setPlaceholder("");
					validUPC = true;
				}

				if(sap.ui.getCore().byId("idEstTypeDrpDwnRCM-col3-row"+i).getValue().trim().length == 0){
					sap.ui.getCore().byId("idEstTypeDrpDwnRCM-col3-row"+i).setValueState(sap.ui.core.ValueState.Error);
					sap.ui.getCore().byId("idEstTypeDrpDwnRCM-col3-row"+i).setValue("");
					sap.ui.getCore().byId("idEstTypeDrpDwnRCM-col3-row"+i).setPlaceholder("Required");
					validEstType = false;
				}
				else{
					sap.ui.getCore().byId("idEstTypeDrpDwnRCM-col3-row"+i).setValueState(sap.ui.core.ValueState.None);
					sap.ui.getCore().byId("idEstTypeDrpDwnRCM-col3-row"+i).setPlaceholder("");
					validEstType = true;
				}*/

				if(aRCMultipleRCM[i].frmtRCMYYYYMMDD == ""){
					aRCMultipleRCM[i].valuestateSrno = sap.ui.core.ValueState.Error;
					aRCMultipleRCM[i].placeHolderSrno = "Required";
					validSrNo = false;
				}
				else{
					aRCMultipleRCM[i].valuestateSrno = sap.ui.core.ValueState.None;
					aRCMultipleRCM[i].placeHolderSrno = "";
					validSrNo = true;
				}


				aTempRCM.push(aRCMultipleRCM[i]);

			}
			if(validRCMFieldStatus){
				if(validSrNo && validUPC && validEstType){
					validRCMFieldStatus = true;
				}
				else{
					validRCMFieldStatus = false;
				}
			}
		}
		aRCMultipleRCM = [];
		aRCMultipleRCM = aTempRCM;
		oModelMoveMultipleRCM.setData({modelData: aRCMultipleRCM});
		oModelMoveMultipleRCM.updateBindings();
		oRCMultipleTable.setVisibleRowCount(aRCMultipleRCM.length);

		for(var i=0;i<aRCMultipleRCM.length; i++){
			var dateEntered = aRCMultipleRCM[i].frmtRCMYYYYMMDD;
			if(dateEntered == ""){
				aRCMultipleRCM[i].valuestateSrno = sap.ui.core.ValueState.Error;
				aRCMultipleRCM[i].placeHolderSrno = "Required";
				validDate = false;
			}else if(dateEntered > frmtRCMYYYYMMDD){
				busyDialog.close();
				aRCMultipleRCM[i].valuestateSrno = sap.ui.core.ValueState.Error;
				aRCMultipleRCM[i].placeHolderSrno = "No future date";
				validDate = false;
			}else if(dateEntered.length != 8){
				busyDialog.close();
				aRCMultipleRCM[i].valuestateSrno = sap.ui.core.ValueState.Error;
				aRCMultipleRCM[i].placeHolderSrno = "Improper Format";
				validDate = false;
			}
			else{
				aRCMultipleRCM[i].valuestateSrno = sap.ui.core.ValueState.None;
				aRCMultipleRCM[i].placeHolderSrno = "";
				validDate = true;
			}

			if(validRCMStatus){
				if(validRCMFieldStatus && validDate){
					validRCMStatus = true;
				}
				else{
					validRCMStatus = false;
				}
			}
		}

			if(validRCMStatus && validRCMFieldStatus){
				//alert("pass");
				for(var i=0;i<aRCMultipleRCM.length; i++){
					var statusSrNo = true;
					var statusUPC = true;
					var statusEstType = true;
					var statusDate = true;
					var vSrNo = "";
					var vUPC = "";
					var vEstType = "";
					var vDate = "";
					var status = "";

					var selYearRCM = "";
					var selMonthRCM = "";
					var selDayRCM = "";

					vSrNo = aRCMultipleRCM[i].serialNo;
					vUPC = ""; //sap.ui.getCore().byId("idUnitPartCodeDRpDwnRCM-col2-row"+i).getSelectedKey();
					vEstType = ""; //sap.ui.getCore().byId("idEstTypeDrpDwnRCM-col3-row"+i).getSelectedKey();
					vDate = aRCMultipleRCM[i].frmtRCMYYYYMMDD;

					if(vSrNo.trim().length >0 && vSrNo.trim().length != 11){
						statusSrNo = false;
					}
					else{
						statusSrNo = true;
					}
					var rxDatePattern = /^(\d{1,2})(\-|-)(\d{1,2})(\-|-)(\d{4})$/;
					var dtArray = vDate.match(rxDatePattern); 
					var dtArray = 4; // MACHANACHANGES_23062019+
                    if (dtArray == null){
                    	statusDate = false;
                     }
                    else{
                    	statusDate = true;
                    	splitDateRCM = vDate.split("-");
     					dateToPassRCM = splitDateRCM[2]+splitDateRCM[1]+splitDateRCM[0];
						 dateToPassRCM = vDate; // MACHANACHANGES
     					 selYearRCM = splitDateRCM[2];
    					 selMonthRCM = splitDateRCM[1];
    					 selDayRCM = splitDateRCM[0];
                    }

                    if(statusSrNo){
                    	var currentKey = "";//sap.ui.getCore().byId("idUnitPartCodeDRpDwnRCM-col2-row"+i).getSelectedKey();
                    	var currentEstType = "";//sap.ui.getCore().byId("idEstTypeDrpDwnRCM-col3-row"+i).getSelectedKey();
                    	var currentSrNo = vSrNo.toUpperCase();
	                    var checkingKey, checkingSrNo, checkingEstType;
                    	if (i > 0 && i<aRCMultipleRCM.length){
	                    		for(var j=0; j <i;j++){

	                    			checkingSrNo = aRCMultipleRCM[j].serialNo.toUpperCase();
	                    			checkingKey = "";//sap.ui.getCore().byId("idUnitPartCodeDRpDwnRCM-col2-row"+j).getSelectedKey();
	                    			checkingEstType = "";//sap.ui.getCore().byId("idEstTypeDrpDwnRCM-col3-row"+j).getSelectedKey();
	                    			if(statusUPC){
	                    				if( currentKey == checkingKey && currentSrNo == checkingSrNo && currentEstType == checkingEstType)
		                    				statusUPC = false;
	                    			}
		                    		else
		                    			break;
	                    		}
	                    }

                    }


                    if(statusDate && statusSrNo && statusUPC){
                    	status = "images/green_signal.png";
						warningErrors = "";
                    }
                    else if(!statusDate && !statusSrNo ){
                    	status = "images/red_signal.png";
						warningErrors = "Incorrect Serial Number\nIncorrect Date";
                    }
                    else if(!statusDate && statusSrNo){
                    	status = "images/red_signal.png";
						warningErrors = "Incorrect Date";
                    }
                    else if(statusDate && !statusSrNo){
                    	status = "images/red_signal.png";
						warningErrors = "Incorrect Serial Number";
                    }else if(statusSrNo && !statusUPC){
                    	status = "images/red_signal.png";
						warningErrors = "Duplicate Serial Number / UPC / Estimate Type";
                    }

                    arrTransMsgsRCM.push({
						"checked": false,
						"status": status,
						"serialNo": vSrNo.toUpperCase(),
						"UnitPartCode": vUPC,
						"EstType": vEstType,
						"Date":vDate,
						"warningErrors": warningErrors //"images/red_signal.png"  //"images/red_signal.png";
					});
				}


				var selDepValRCM = document.getElementById("idComboDepotRCM").value;
				depotCodeRCMToPass = selDepValRCM.substring(0,15);
				busyDialog.close();

				var bus = sap.ui.getCore().getEventBus();
		  	  	bus.publish("nav", "to", {
		  	  		id : "RepairComplMultipleResults"
		  	  	});

			  	var oObjRCMultipleRes = new RepairCompltnMultipleResultsView();
			  	oObjRCMultipleRes.updateBindingRCMR();
			  	oObjRCMultipleRes.enableSubmitBtnRCMR();
			}
			else{
				busyDialog.close();
			}

	},

	resetRCMultiple: function(){
		loggedInUserTypeRCM = objLoginUser.getLoggedInUserType();
		oModelMoveMultipleRCM.setData({modelData: []});
		if(loggedInUserTypeRCM == "SEACO"){
			$("#idComboDepotRCM").val("");
			sap.ui.getCore().byId("idDepotRCM").setValue("");
			if(document.getElementById("idComboDepotRCM")){
                document.getElementById("idComboDepotRCM").style.borderColor = "#cccccc";
	    		document.getElementById("idComboDepotRCM").style.background = "#ffffff";
	    		document.getElementById("idComboDepotRCM").placeholder = "Select Depot";
			}
			if(sap.ui.getCore().byId("idBtnMoveRemoveFilterRCM")){
            	sap.ui.getCore().byId("idBtnMoveRemoveFilterRCM").setEnabled(false);
            }
		}
		aRCMultipleRCM.length = 0;
		aRCMultipleRCM.push({checked: false, serialNo: "", frmtRCMYYYYMMDD: frmtRCMYYYYMMDD, keyUPC: "1", keyEstType: "0",  RCMDate: dtTodayRCMltpl, placeHolderSrno: "", placeHolderUPC: "", placeHolderEstType: "", placeHolderDate: "", valuestateSrno:sap.ui.core.ValueState.None, valuestateUPC:sap.ui.core.ValueState.None, valuestateEstType:sap.ui.core.ValueState.None, valuestateDate:sap.ui.core.ValueState.None});
		aRCMultipleRCM.push({checked: false, serialNo: "", frmtRCMYYYYMMDD: frmtRCMYYYYMMDD, keyUPC: "1", keyEstType: "0",  RCMDate: dtTodayRCMltpl, placeHolderSrno: "", placeHolderUPC: "", placeHolderEstType: "", placeHolderDate: "", valuestateSrno:sap.ui.core.ValueState.None, valuestateUPC:sap.ui.core.ValueState.None, valuestateEstType:sap.ui.core.ValueState.None, valuestateDate:sap.ui.core.ValueState.None});
		aRCMultipleRCM.push({checked: false, serialNo: "", frmtRCMYYYYMMDD: frmtRCMYYYYMMDD, keyUPC: "1", keyEstType: "0",  RCMDate: dtTodayRCMltpl, placeHolderSrno: "", placeHolderUPC: "", placeHolderEstType: "", placeHolderDate: "", valuestateSrno:sap.ui.core.ValueState.None, valuestateUPC:sap.ui.core.ValueState.None, valuestateEstType:sap.ui.core.ValueState.None, valuestateDate:sap.ui.core.ValueState.None});
		aRCMultipleRCM.push({checked: false, serialNo: "", frmtRCMYYYYMMDD: frmtRCMYYYYMMDD, keyUPC: "1", keyEstType: "0",  RCMDate: dtTodayRCMltpl, placeHolderSrno: "", placeHolderUPC: "", placeHolderEstType: "", placeHolderDate: "", valuestateSrno:sap.ui.core.ValueState.None, valuestateUPC:sap.ui.core.ValueState.None, valuestateEstType:sap.ui.core.ValueState.None, valuestateDate:sap.ui.core.ValueState.None});
		aRCMultipleRCM.push({checked: false, serialNo: "", frmtRCMYYYYMMDD: frmtRCMYYYYMMDD, keyUPC: "1", keyEstType: "0",  RCMDate: dtTodayRCMltpl, placeHolderSrno: "", placeHolderUPC: "", placeHolderEstType: "", placeHolderDate: "", valuestateSrno:sap.ui.core.ValueState.None, valuestateUPC:sap.ui.core.ValueState.None, valuestateEstType:sap.ui.core.ValueState.None, valuestateDate:sap.ui.core.ValueState.None});
		oModelMoveMultipleRCM.setData({modelData: aRCMultipleRCM});
		oModelMoveMultipleRCM.updateBindings();
		sap.ui.getCore().byId("idRCMTblDefault").setVisibleRowCount(5);
	}
});

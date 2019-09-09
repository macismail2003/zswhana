/******** NP *******/
/*
*$*$------------------------------------------------------------------------*
*$*$ Modified By : Seyed Ismail MAC
*$*$ Modified On : 17.11.2015
*$*$ Reference   : RTS1366
*$*$ Transport   : CGWK901114
*$*$ Tag         : MAC17112015
*$*$ Purpose     : UI5 : Fix Partial Updates error for GMBH depots as the length differs
*$*$---------------------------------------------------------------------
 *
 * */
jQuery.sap.require("sap.ui.model.json.JSONModel");


var dtTodayZCEMltpl = new Date();

var frmtZCEMYYYYMMDD = [dtTodayZCEMltpl.getFullYear(),padZero(dtTodayZCEMltpl.getMonth()+1),padZero(dtTodayZCEMltpl.getDate())].join('');

var aZeroCostEstimateZCEM = [];
var loggedInUserTypeZCE = "";
var oModelZeroCostEstimateZCEM = new sap.ui.model.json.JSONModel();
oModelZeroCostEstimateZCEM.setData({modelData: aZeroCostEstimateZCEM});

var vInputDepotMValZCEM = "";
var oInputDepotZCEM;
var arrayLenZCEM;
var checkedLengthZCEM = 0;
var depotNameListZCEM = [];
var depotNameZCEMToPass;
var depotCodeZCEMToPass;
var arrTransMsgsZCEM = [];
var vInputDepotListZCEM = "";
var flagOnChangeDepotNameZCEM = false;
var flagOnChangeDepotCodeZCEM = false;
var aValidateLookupZCE = [];
sap.ui.model.json.JSONModel.extend("zeroCostEstimateMultipleZCEMView", {

	createZeroCostEstimateMultipleZCEM: function(){
		aZeroCostEstimateZCEM.length = 0;
		aZeroCostEstimateZCEM.push({checked: false, serialNo: "", frmtZCEMYYYYMMDD: frmtZCEMYYYYMMDD, zceDate: dtTodayZCEMltpl});
		aZeroCostEstimateZCEM.push({checked: false, serialNo: "", frmtZCEMYYYYMMDD: frmtZCEMYYYYMMDD, zceDate: dtTodayZCEMltpl});
		aZeroCostEstimateZCEM.push({checked: false, serialNo: "", frmtZCEMYYYYMMDD: frmtZCEMYYYYMMDD, zceDate: dtTodayZCEMltpl});
		aZeroCostEstimateZCEM.push({checked: false, serialNo: "", frmtZCEMYYYYMMDD: frmtZCEMYYYYMMDD, zceDate: dtTodayZCEMltpl});
		aZeroCostEstimateZCEM.push({checked: false, serialNo: "", frmtZCEMYYYYMMDD: frmtZCEMYYYYMMDD, zceDate: dtTodayZCEMltpl});

		var oCurrZCEM = this;
		// Labels
		var oLabelDepotZCEM = new sap.ui.commons.Label({text: "Depot:",
			required: true,
			layoutData: new sap.ui.layout.GridData({span: "L1 M2 S12",linebreak: false, margin: true}),
            wrapping: true}).addStyleClass("marginTop15");

		var oLabelMandatoryZCEM = new sap.ui.commons.Label({text: "Mandatory Field",
			required: true,
			requiredAtBegin : true,
            wrapping: true}).addStyleClass("margin10 marginTopBot30");

		var oLabelSpaceZCEM = new sap.ui.commons.Label({text: " ",
			width:"8px",
            wrapping: true});

		var oComboDepotZCEM = new sap.ui.core.HTML("idListDepotComboZCEM",{layoutData: new sap.ui.layout.GridData({span: "L4 M6 S12"})});
		var htmlContentDepot = '<input disabled="disabled" id="idComboDepotZCEM" placeholder="Select Depot" class="FormInputStyle marginTop10" style="width:100%;height:38px">';
		oComboDepotZCEM.setContent(htmlContentDepot);

	 // Text Field
    	oInputDepotZCEM = new sap.ui.commons.TextField('idDepotZCEM',{
    		layoutData: new sap.ui.layout.GridData({span: "L1 M1 S8",linebreak: false, margin: true}),
    		placeholder:"Depot Code",
    	}).addStyleClass("FormInputStyle marginTop10 DepotInput38px");

    	/*oInputDepotZCEM.attachChange(
                function(oEvent){
                        if(isNaN(oInputDepotZCEM.getValue())){
                                oEvent.oSource.setValueState(sap.ui.core.ValueState.Error);
                                oEvent.oSource.setValue("");
                                oEvent.oSource.setPlaceholder("Invalid Value");
                        }else{
                                oEvent.oSource.setValueState(sap.ui.core.ValueState.None);
                        }
                }
    		);*/

    	// Buttons
	   	 var oBtnZeroCostEstValidate = new sap.m.Button("idBtnMoveValidateZCEM",{
		          text : "Validate",
		          width:"80px",
		          styled:false,
		          layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
		          press:function(){
		        	  oCurrZCEM.validateZeroCostEstimateMultipleZCEM();
		          }}).addStyleClass("submitBtn marginTop20");

	   	var oBtnZeroCostEstRemoveFilter = new sap.m.Button("idBtnMoveRemoveFilterZCEM",{
	          text : "Remove Filter",
	          //width:"115px",
	          styled:false,
	          enabled:false,
	          layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: false, margin: true}),
	          press:function(){
	        	  oInputDepotZCEM.setValue("");
	        	  $("#idComboDepotZCEM").val("");
		          this.setEnabled(false);
		          }}).addStyleClass("submitBtn marginTop5");

	   	 var oBtnZeroCostEstApplyFilter = new sap.m.Button("idBtnMoveApplyFilterZCEM",{
		          text : "Apply Filter",
		          //width:"115px",
		          styled:false,
		          layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: false, margin: true}),
		          press:function(){
		        	  if(oInputDepotZCEM.getValue() == ""){
		        		  $("#idComboDepotZCEM").val("");
		          	  }
		          	  else{
		          		sap.ui.getCore().byId("idBtnMoveRemoveFilterZCEM").setEnabled(true);
		          		document.getElementById("idComboDepotZCEM").style.borderColor = "#cccccc";
		        		document.getElementById("idComboDepotZCEM").style.background = "#ffffff";
				          		var depotCodeZCEM = new RegExp(oInputDepotZCEM.getValue());
				          		  for(var i=0; i<depotNameListZCEM.length; i++){
				          			var depotNameZCEM = depotNameListZCEM[i];
					          		/*var resultZCEM = depotCodeZCEM.test(depotNameZCEM);
					          		if(resultZCEM){*/
				          			var partsZCEM = depotNameZCEM.split("-");
								    var depotCodeZCEM = partsZCEM[3];
				          			if(depotCodeZCEM == oInputDepotZCEM.getValue()){
					          			$("#idComboDepotZCEM").val(depotNameZCEM);
					          			break;
					          		}else{
					          			$("#idComboDepotZCEM").val("");
					          		}
				          		  }
		          	  }
		        	  }}).addStyleClass("submitBtn marginTop5");

	   	var oFlexApplyRemoveZCEM = new sap.m.FlexBox({
	           items: [
						oBtnZeroCostEstApplyFilter,
						oLabelSpaceZCEM,
						oBtnZeroCostEstRemoveFilter
	           ],
	           layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12",linebreak: false, margin: false}),
	           direction : "Row",
				});

	   	var oImageAddZCEM = new sap.ui.commons.Image("imgAddZCEM",{
	   		press: function() {
	   		}
	   	});
	   	oImageAddZCEM.setSrc("images/add_row.png");
	   	oImageAddZCEM.setDecorative(false);
	   	oImageAddZCEM.addStyleClass("marginTop20 marginRight5");

	   	var MaxLimitReachedMessage = "Max row limit of 25 reached. Please submit these rows and then add more unit numbers.";

	   	var oBtnAddNewRow = new sap.ui.commons.Link({
	        text: "Add New Row",
	        tooltip: "Add New Row",
	        layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: false, margin: true}),
	        press: function() {
	        	var currentArrayLen = aZeroCostEstimateZCEM.length;
	        	if(currentArrayLen == 25){
	        		sap.ui.commons.MessageBox.show(MaxLimitReachedMessage,
	                        sap.ui.commons.MessageBox.Icon.WARNING,
	                        "Warning",
	                        [sap.ui.commons.MessageBox.Action.OK],
	                            sap.ui.commons.MessageBox.Action.OK);
	        	}
	        	else{
	        		aZeroCostEstimateZCEM.push({
        		  'checked':false,
                  'serialNo':"",
                  'frmtZCEMYYYYMMDD': frmtZCEMYYYYMMDD,
                  'zceDate': dtTodayZCEMltpl
                      });
	        		oModelZeroCostEstimateZCEM.updateBindings();
				        oZeroCostEstimateZCEMTable.setVisibleRowCount(aZeroCostEstimateZCEM.length);
				        currentArrayLen = currentArrayLen + 1;
	        	}
	        }}).addStyleClass("marginTop25 marginRight");

	   	var oImageDeleteZCEM = new sap.ui.commons.Image("imgDeleteZCEM");
	   	oImageDeleteZCEM.setSrc("images/delete_row.png");
	   	oImageDeleteZCEM.setDecorative(false);
	   	oImageDeleteZCEM.addStyleClass("marginTop20 marginRight5");

	   	var oBtnDeleteRow = new sap.ui.commons.Link({
	        text: "Delete Checked Rows",
	        tooltip: "Delete Checked Rows",
	        layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: false, margin: true}),
	        press: function() {
	        	arrayLenZCEM = aZeroCostEstimateZCEM.length;
	        	  var unCheckedCount = 0;
	        	  for(var j=0; j<arrayLenZCEM; j++){
	        		  if(aZeroCostEstimateZCEM[j].checked == false){
	        			  unCheckedCount++;
	        		  }
	        	  }
	        	  if(unCheckedCount == arrayLenZCEM){
	        		  sap.ui.commons.MessageBox.show("Please select atleast 1 row for deletion!",
	                            sap.ui.commons.MessageBox.Icon.WARNING,
	                            "Warning",
	                            [sap.ui.commons.MessageBox.Action.OK],
	                            sap.ui.commons.MessageBox.Action.OK);
	        	  }
	        	  else{
		        	  for(var i=arrayLenZCEM-1; i>=0; i--){
		        		  if(aZeroCostEstimateZCEM[i].checked){
		        			  aZeroCostEstimateZCEM.splice(i,1);
		        			  oModelZeroCostEstimateZCEM.updateBindings();
		        			  arrayLenZCEM = arrayLenZCEM - 1;
		        		  }
		        	  }
		        	  oZeroCostEstimateZCEMTable.setVisibleRowCount(arrayLenZCEM);
	        	  }
	          }}).addStyleClass("marginTop25");

	   	var oFlexZCEMAddDelete = new sap.m.FlexBox({
	           items: [
						oImageAddZCEM,
						oBtnAddNewRow,
						oImageDeleteZCEM,
						oBtnDeleteRow
	           ],
	           direction : "Row",
				});

	 // Table
    	var oZeroCostEstimateZCEMTable = new sap.ui.table.Table("idTblZCEMultiple",{
    		visibleRowCount: 5,
            firstVisibleRow: 3,
            columnHeaderHeight: 40,
            selectionMode: sap.ui.table.SelectionMode.None,
            width:"30%",
            height:"100%"
    	 }).addStyleClass("fontStyle marginTop33 tblBorder");

    	// Table Columns
    	oZeroCostEstimateZCEMTable.addColumn(new sap.ui.table.Column({
        	template: new sap.ui.commons.CheckBox({
   			 change : function() {
   				 if(this.getChecked() == false){
   					checkedLengthZCEM--;
   				 }
   				 else{
   					checkedLengthZCEM++;
   				 }
   			 }
		}).bindProperty("checked", "checked"),
        	width:"auto",
        	resizable:false,
        	hAlign: "Center"}));

    	var arrEnteredSerNo = [];

    	oZeroCostEstimateZCEMTable.addColumn(new sap.ui.table.Column({
      		 label: new sap.ui.commons.Label({text: "Serial Number", required: true}).addStyleClass("wraptextcol"),
    		 template: new sap.ui.commons.TextField("idSerNoZCEMInput",{textAlign:"Left",
    			 change: function(){
    				 if(this.getValue() != ""){
    					 this.setValueState(sap.ui.core.ValueState.None);
    				 }
    				 var enteredSerNo = this.getValue();
    				 var count = 0;

                     for(var j=0;j<aZeroCostEstimateZCEM.length;j++){
                             if(enteredSerNo == aZeroCostEstimateZCEM[j].serialNo){
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
    			 }}).bindProperty("value", "serialNo").addStyleClass("borderStyle margin5"),
             sortProperty: "serialNo",
             filterProperty: "serialNo",
             resizable:false,
             width:"auto",
             hAlign: sap.ui.commons.layout.HAlign.Left
    		 }));

    	sap.ui.getCore().byId("idSerNoZCEMInput").setMaxLength(11);

	   	var oZcemDateZCEM = new sap.ui.commons.DatePicker("idZcemDateInputZCEM",{
			  width: "auto",
			  //textAlign:"Right",
			  value: {
				  path: "{zceDate}",
			  type: new sap.ui.model.type.Date({pattern: "dd-MM-yyyy"})},
			}).bindProperty("yyyymmdd", "frmtZCEMYYYYMMDD").addStyleClass("margin5");

	   	oZeroCostEstimateZCEMTable.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Date", required: true}).addStyleClass("wraptextcol"),
			 template: oZcemDateZCEM.addStyleClass("borderStyle"),
             sortProperty: "zceDate",
             filterProperty: "zceDate",
             resizable:false,
             width:"auto",
           //  hAlign: sap.ui.commons.layout.HAlign.Right,
			 }));

	   	oZeroCostEstimateZCEMTable.setModel(oModelZeroCostEstimateZCEM);
	   	oZeroCostEstimateZCEMTable.bindRows("/modelData");

    	// Responsive Grid Layout
	    var oZeroCostEstMulZCEMLayout = new sap.ui.layout.form.ResponsiveGridLayout("idZeroCostEstMulZCEMLayout",{
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
	     var oZeroCostEstMulZCEMForm = new sap.ui.layout.form.Form("idZeroCostEstMulZCEMForm",{
	             layout: oZeroCostEstMulZCEMLayout,
	             formContainers: [

	                     new sap.ui.layout.form.FormContainer("idZeroCostEstMulZCEMFormC1",{
                             formElements: [
												new sap.ui.layout.form.FormElement({
												    fields: [oLabelDepotZCEM, oComboDepotZCEM, oInputDepotZCEM, oFlexApplyRemoveZCEM]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oZeroCostEstimateZCEMTable]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oFlexZCEMAddDelete]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oBtnZeroCostEstValidate]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oLabelMandatoryZCEM]
												})
	                                     ]
	                     }),
	             ]
	     });
	     	return oZeroCostEstMulZCEMForm;

	},

	validateZeroCostEstimateMultipleZCEM: function(){
		var oCurrZCEM = this;
		vInputDepotMValZCEM = oInputDepotZCEM.getValue();
		vInputDepotListZCEM = document.getElementById("idComboDepotZCEM").value;

  	  if(vInputDepotListZCEM == ""){
  		  document.getElementById("idComboDepotZCEM").style.borderColor = "red";
		  document.getElementById("idComboDepotZCEM").style.background = "#FAD4D4";
		  $("#idComboDepotZCEM").attr("placeholder","Required");
  	  }
  	  else{
  		var match = jQuery.inArray(vInputDepotListZCEM,depotNameListZCEM);
		if(match < 0){
			document.getElementById("idComboDepotZCEM").style.borderColor = "red";
    		document.getElementById("idComboDepotZCEM").style.background = "#FAD4D4";
    		document.getElementById("idComboDepotZCEM").value = "";
    		document.getElementById("idComboDepotZCEM").placeholder = "Invalid Depot";
    		isValid = false;
		}
		else{
			document.getElementById("idComboDepotZCEM").style.borderColor = "#cccccc";
    		document.getElementById("idComboDepotZCEM").style.background = "#ffffff";
    		document.getElementById("idComboDepotZCEM").placeholder = "Select Depot";
    		oCurrZCEM.validateDataZeroCostEstMulZCEM();
		}
  		/*document.getElementById("idComboDepotZCEM").style.borderColor = "#cccccc";
		document.getElementById("idComboDepotZCEM").style.background = "#ffffff";
		$("#idComboDepotZCEM").attr("placeholder","Select Depot");*/

  	  }
	},

	populateDepotNameZCEM: function(){
		busyDialog.open();
		oModel = new sap.ui.model.odata.ODataModel(serviceUrl15_old, true);
		var urlToCallZCEMDep = serviceUrl15_old + "/F4_Functional_Location";
		//alert("urlToCallZCEMDep : "+urlToCallZCEMDep);
		OData.request({
		      requestUri: urlToCallZCEMDep,
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
		    		depotNameListZCEM[i] = data.results[i].FunctionalLoc;
				}

		    	$("#idComboDepotZCEM").autocomplete({
		    	      source: depotNameListZCEM,
		    	      minLength: 0,
		    	      select: function(){
		    	    	  	document.getElementById("idComboDepotZCEM").style.borderColor = "#cccccc";
		    				document.getElementById("idComboDepotZCEM").style.background = "#ffffff";
		    				$("#idComboDepotZCEM").attr("placeholder","Select Depot");
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
		    	    for (i in depotNameListZCEM) {
		    	        if (depotNameListZCEM[i].toLowerCase().match(this.value.toLowerCase())) {
		    	            isValid = true;
		    	        }
		    	    }
		    	    if (!isValid) {
		    	        this.value = previousValue;
		    	    } else {
		    	        previousValue = this.value;
		    	    }
		    	});

		    	loggedInUserTypeZCE = objLoginUser.getLoggedInUserType();
				if(loggedInUserTypeZCE == "SEACO"){
					$("#idComboDepotZCEM").removeAttr('disabled');
					$("#idComboDepotZCEM").attr("disabled","disabled");
					sap.ui.getCore().byId("idBtnMoveRemoveFilterZCEM").setEnabled(true);
					sap.ui.getCore().byId("idBtnMoveApplyFilterZCEM").setEnabled(true);
					sap.ui.getCore().byId("idDepotZCEM").setEnabled(true);
				}
				else{
					var DepotCode = objLoginUser.getLoggedInUserID();
					for(var i=0;i<depotNameListZCEM.length;i++){
						if(depotNameListZCEM[i].substring(11,15) == DepotCode)
							DepotCode = depotNameListZCEM[i];
					}
					$("#idComboDepotZCEM").attr("disabled","disabled");
					$("#idComboDepotZCEM").val(DepotCode);
					sap.ui.getCore().byId("idBtnMoveRemoveFilterZCEM").setEnabled(false);
					sap.ui.getCore().byId("idBtnMoveApplyFilterZCEM").setEnabled(false);
					sap.ui.getCore().byId("idDepotZCEM").setEnabled(false);
					var depotZCEM = document.getElementById("idComboDepotZCEM").value.split("-");
					sap.ui.getCore().byId("idDepotZCEM").setValue(depotZCEM[3]);
				}

		    	busyDialog.close();
		    },
		    function(err){
		    	 errorfromServer(err);
		    	//alert("Error while Reading Result : "+ : window.JSON.stringify(err.response));
		    });
	},

	validateDataZeroCostEstMulZCEM: function(){
		busyDialog.open();

		arrTransMsgsZCEM = [];
		depotNameZCEMToPass = "";

		var serialNoZCEM = "";
		var zcemDateZCEM = "";
		//depotNameZCEMToPass = document.getElementById("idComboDepotZCEM").value.substring(0,15);	//MAC17112015-
		/* Begin of adding by Seyed Ismail on 17.11.2015 MAC17112015 */
		depotNameZCEMToPass = document.getElementById("idComboDepotZCEM").value;
		var splitFunc = [];
		splitFunc = depotNameZCEMToPass.split("-");
		depotNameZCEMToPass = splitFunc[0] + "-" + splitFunc[1] + "-" + splitFunc[2] + "-" + splitFunc[3];
		/* End of adding by Seyed Ismail on 17.11.2015 MAC17112015 */
		var incorrectSerNoFlagZCEM = true;
		var incorrectDateFlagZCEM = true;
		var incorrectSerNoDateFlagZCEM = true;

		var currDateZCEM = new Date();
		var currYearZCEM = currDateZCEM.getFullYear();
		var currMonthZCEM = currDateZCEM.getMonth()+1;
		var currDayZCEM = currDateZCEM.getDate();
		//http://seanwgd1.gessap.local:8000/sap/opu/odata/sap/ZNW_SEACO_PORTAL_REQ15_SRV/Zero_Cost_Estimate_Validate?$filter=IDepot eq 'SEA-SG-SIN-1547'
			//and IEquip1 eq 'GSTU9511769$18.04.2014' and IEquip2 eq 'GSTU9534825$21.04.2014'
		var Row = [];
		var count = 0;
		var countForNoneZCE = 0;
		var aTempZCE = [];
		var urlToCall = serviceUrl15_old + "/Zero_Cost_Estimate_Validate?$filter=IDepot eq '" + depotNameZCEMToPass+ "'";
		//check if serial no is not entered delete the row
		for(var i=0;i<aZeroCostEstimateZCEM.length; i++){
			if(i==0){
				aTempZCE = [];
			}
			if(aZeroCostEstimateZCEM[i].serialNo.trim() == ""){
				countForNoneZCE = countForNoneZCE + 1;
			}
			else{
				//for(var i=0;i<aZeroCostEstimateZCEM.length; i++){
// 					var serialNo= sap.ui.getCore().byId("idTblZCEMultiple-rows-row" + i + "-col1").getValue();
// 					var dateEntered = sap.ui.getCore().byId("idTblZCEMultiple-rows-row" + i + "-col2").getValue().replace(/-/g,".");
// 					Row[count] = serialNo.toUpperCase() + "$" + dateEntered;
// 					count++;
				//}
					aTempZCE.push(aZeroCostEstimateZCEM[i]);
			}
		}
		if(countForNoneZCE == aZeroCostEstimateZCEM.length){
			busyDialog.close();
			var message = "Please enter atleast one record.";
			sap.ui.commons.MessageBox.alert(message);
		}
		else{
			aZeroCostEstimateZCEM = [];
			aZeroCostEstimateZCEM = aTempZCE;
			oModelZeroCostEstimateZCEM.setData({modelData: aZeroCostEstimateZCEM});
			oModelZeroCostEstimateZCEM.updateBindings();
			sap.ui.getCore().byId("idTblZCEMultiple").setVisibleRowCount(aZeroCostEstimateZCEM.length);
			for(var k=0 ; k < aTempZCE.length ; k++){
				urlToCall = urlToCall + " and IEquip" + (k+1) + " eq '" + aTempZCE[k].serialNo + "$" + aTempZCE[k].frmtZCEMYYYYMMDD + "'";
			}
		//alert("validate url " + urlToCall);
		oModel = new sap.ui.model.odata.ODataModel(serviceUrl15_old, true);

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
		    	aValidateLookupZCE = data.results;
				for(var i=0;i<aZeroCostEstimateZCEM.length; i++){

					incorrectSerNoFlagZCEM = true;
					incorrectDateFlagZCEM = true;
					incorrectSerNoDateFlagZCEM = true;

					 	var splitDateZCEM = "";
						var dateToPassZCEM = "";
						var selYearZCEM = "";
						var selMonthZCEM = "";
						var selDayZCEM = "";
						var serialNoZCEM = [];
						var zcemDateZCEM = [];
							var warningErrorsMsg = "";
							var statusState = "";
							

							serialNoZCEM = aTempZCE[i].serialNo;
							zcemDateZCEM = aTempZCE[i].frmtZCEMYYYYMMDD;
							var incorrectSerNoFlagZCEM = true;
							var incorrectDateFlagZCEM = true;
							

							if(incorrectDateFlagZCEM && incorrectSerNoFlagZCEM){
								var tempZCE = jQuery.grep(aValidateLookupZCE, function(element, index){
									return element.Equipment.split('-')[0] == aTempZCE[i].serialNo.toUpperCase();
						     	});
								if(tempZCE.length > 0){
									if(tempZCE[0].Type == "E"){
										 warningErrorsMsg = tempZCE[0].Message;
										 statusState = "images/red_signal.png";
									}
									else{
										 warningErrorsMsg = "";
										 statusState = "images/green_signal.png";
									}
								}

							}
							else if(!incorrectDateFlagZCEM && !incorrectSerNoFlagZCEM){
								 warningErrorsMsg = "Incorrect Serial Number\nIncorrect Date";
								 statusState = "images/red_signal.png";
							}
							else if(!incorrectDateFlagZCEM && incorrectSerNoFlagZCEM){
								warningErrorsMsg = "Incorrect Date";
								 statusState = "images/red_signal.png";
							}
							else if(incorrectDateFlagZCEM && !incorrectSerNoFlagZCEM){
								warningErrorsMsg = "Incorrect Serial Number";
								 statusState = "images/red_signal.png";
							}
									arrTransMsgsZCEM.push({
										"checked": false,
										"status": statusState,
										"serialNo": serialNoZCEM,
										"outDate": zcemDateZCEM,
										"warningErrors": warningErrorsMsg
									});

						
				}

				if(arrTransMsgsZCEM.length == aZeroCostEstimateZCEM.length){
					var selDepValZCEM = document.getElementById("idComboDepotZCEM").value;
				    var partsDepZCEM = selDepValZCEM.split("-");
				    depotCodeZCEMToPass = partsDepZCEM[3];
					busyDialog.close();
					var bus = sap.ui.getCore().getEventBus();
				  	  	bus.publish("nav", "to", {
				        id : "ZeroCostEstimMultiResult"
			  	  	});

				  	  var oObjZeroCostEstimateMultipleRes = new zeroCostEstimateMultipleResZCEMRView();
				  	oObjZeroCostEstimateMultipleRes.updateBindingZCEM();
				  	oObjZeroCostEstimateMultipleRes.enableSubmitBtnZCEMR();
				}
		    },
		    function(err){
		    	 errorfromServer(err);
		    });
		}

	},

	resetZeroCostEstimate: function(){
		loggedInUserTypeZCE = objLoginUser.getLoggedInUserType();
		oModelZeroCostEstimateZCEM.setData({modelData: []});

		if(sap.ui.getCore().byId("idBtnMoveRemoveFilterZCEM")){
        	sap.ui.getCore().byId("idBtnMoveRemoveFilterZCEM").setEnabled(false);
        }

		 if(loggedInUserTypeZCE == "SEACO"){
			 $("#idComboDepotZCEM").val("");
             sap.ui.getCore().byId("idDepotZCEM").setValue("");

            if(document.getElementById("idComboDepotZCEM")){
	                document.getElementById("idComboDepotZCEM").style.borderColor = "#cccccc";
		    		document.getElementById("idComboDepotZCEM").style.background = "#ffffff";
		    		document.getElementById("idComboDepotZCEM").placeholder = "Select Depot";
              }
            if(sap.ui.getCore().byId("idBtnMoveRemoveFilterZCEM")){
             	sap.ui.getCore().byId("idBtnMoveRemoveFilterZCEM").setEnabled(false);
             }
		 }
		 aZeroCostEstimateZCEM.length = 0;
  		aZeroCostEstimateZCEM.push({checked: false, serialNo: "", frmtZCEMYYYYMMDD: frmtZCEMYYYYMMDD, zceDate: dtTodayZCEMltpl});
  		aZeroCostEstimateZCEM.push({checked: false, serialNo: "", frmtZCEMYYYYMMDD: frmtZCEMYYYYMMDD, zceDate: dtTodayZCEMltpl});
  		aZeroCostEstimateZCEM.push({checked: false, serialNo: "", frmtZCEMYYYYMMDD: frmtZCEMYYYYMMDD, zceDate: dtTodayZCEMltpl});
  		aZeroCostEstimateZCEM.push({checked: false, serialNo: "", frmtZCEMYYYYMMDD: frmtZCEMYYYYMMDD, zceDate: dtTodayZCEMltpl});
  		aZeroCostEstimateZCEM.push({checked: false, serialNo: "", frmtZCEMYYYYMMDD: frmtZCEMYYYYMMDD, zceDate: dtTodayZCEMltpl});
  		oModelZeroCostEstimateZCEM.setData({modelData: aZeroCostEstimateZCEM});
         sap.ui.getCore().byId("idTblZCEMultiple").setModel(oModelZeroCostEstimateZCEM);
         sap.ui.getCore().byId("idTblZCEMultiple").bindRows("/modelData");

         sap.ui.getCore().byId("idTblZCEMultiple").setVisibleRowCount(5);
	}
});

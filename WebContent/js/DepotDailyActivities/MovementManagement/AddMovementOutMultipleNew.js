/******** NP *******/
jQuery.sap.require("sap.ui.model.json.JSONModel");

var currentDateAMOS;
var jsonMoveOutToValidateEntries = [];
var jsonMoveOutToSubmitEntries = [];
//Arrays
var dtTodayAMOSltpl = new Date();

var frmtAMOSYYYYMMDD = [dtTodayAMOSltpl.getFullYear(),padZero(dtTodayAMOSltpl.getMonth()+1),padZero(dtTodayAMOSltpl.getDate())].join('');

var aMoveOutMultipleAMOS = [];

var oModelMoveOutMultipleAMOS = new sap.ui.model.json.JSONModel();
oModelMoveOutMultipleAMOS.setData({modelData: aMoveOutMultipleAMOS});

var aTempAMOS = [];
var loggedInUserTypeAMOS = "";
var vInputDepotOutMultipleValAMOS = "";
var oInputDepotOutMultipleAMOS = "";
var arrayLenMOS = "";
var depotNameListAMOS = [];
var unitsTankTypeAMOS = [];
var selectedDepotToPassAMOS = "";
var selectedDepotToPassCodeAMOS = "";
var vInputDepotListAMOS = "";
var flagOnChangeDepotNameAMOS = false;
var flagOnChangeDepotCodeAMOS = false;
var validAMOSFieldsStatus = true;
var validAMOSStatus = true;

sap.ui.model.json.JSONModel.extend("addMovemntOutMultipleViewNew", {
	
	createAddMovemntOutMultipleNew: function(){
		
		aMoveOutMultipleAMOS.length = 0;
		aMoveOutMultipleAMOS.push({checked: false, serialNo: "", frmtAMOSYYYYMMDD: frmtAMOSYYYYMMDD, retDateVal: "", retDate: dtTodayAMOSltpl, auth: "", statusA: false, tankDetails: "NA", unNo: "", lastClnDate: "", lastCargoDesc: "", clnProcDesc: "", placeHolderSrno: "", placeHolderAuth: "", placeHolderDate: "", valuestateSrno:sap.ui.core.ValueState.None, valuestateAuth:sap.ui.core.ValueState.None, valuestateDate:sap.ui.core.ValueState.None});
		aMoveOutMultipleAMOS.push({checked: false, serialNo: "", frmtAMOSYYYYMMDD: frmtAMOSYYYYMMDD, retDateVal: "", retDate: dtTodayAMOSltpl, auth: "", statusA: false, tankDetails: "NA", unNo: "", lastClnDate: "", lastCargoDesc: "", clnProcDesc: "", placeHolderSrno: "", placeHolderAuth: "", placeHolderDate: "", valuestateSrno:sap.ui.core.ValueState.None, valuestateAuth:sap.ui.core.ValueState.None, valuestateDate:sap.ui.core.ValueState.None});
		aMoveOutMultipleAMOS.push({checked: false, serialNo: "", frmtAMOSYYYYMMDD: frmtAMOSYYYYMMDD, retDateVal: "", retDate: dtTodayAMOSltpl, auth: "", statusA: false, tankDetails: "NA", unNo: "", lastClnDate: "", lastCargoDesc: "", clnProcDesc: "", placeHolderSrno: "", placeHolderAuth: "", placeHolderDate: "", valuestateSrno:sap.ui.core.ValueState.None, valuestateAuth:sap.ui.core.ValueState.None, valuestateDate:sap.ui.core.ValueState.None});
		aMoveOutMultipleAMOS.push({checked: false, serialNo: "", frmtAMOSYYYYMMDD: frmtAMOSYYYYMMDD, retDateVal: "", retDate: dtTodayAMOSltpl, auth: "", statusA: false, tankDetails: "NA", unNo: "", lastClnDate: "", lastCargoDesc: "", clnProcDesc: "", placeHolderSrno: "", placeHolderAuth: "", placeHolderDate: "", valuestateSrno:sap.ui.core.ValueState.None, valuestateAuth:sap.ui.core.ValueState.None, valuestateDate:sap.ui.core.ValueState.None});
		aMoveOutMultipleAMOS.push({checked: false, serialNo: "", frmtAMOSYYYYMMDD: frmtAMOSYYYYMMDD, retDateVal: "", retDate: dtTodayAMOSltpl, auth: "", statusA: false, tankDetails: "NA", unNo: "", lastClnDate: "", lastCargoDesc: "", clnProcDesc: "", placeHolderSrno: "", placeHolderAuth: "", placeHolderDate: "", valuestateSrno:sap.ui.core.ValueState.None, valuestateAuth:sap.ui.core.ValueState.None, valuestateDate:sap.ui.core.ValueState.None});
 	
		// Labels
		var oLabelDepotOutMultiple = new sap.ui.commons.Label({text: "Depot:",
			layoutData: new sap.ui.layout.GridData({span: "L1 M4 S12",linebreak: false, margin: true}),
			required: true,
            wrapping: true}).addStyleClass("marginTop10");
		
		var oLabelMandatoryOutMultiple = new sap.ui.commons.Label({text: "Mandatory Field",
			required: true,
			requiredAtBegin : true,
            wrapping: true}).addStyleClass("margin10 marginTopBot30");
		
		var oLabelSpaceAMOS = new sap.ui.commons.Label({text: " ",
			width:"8px",
            wrapping: true});
		
		var oComboDepotAMOS = new sap.ui.core.HTML("idListDepotComboAMOS",{layoutData: new sap.ui.layout.GridData({span: "L4 M6 S12"})});
		var htmlContentDepot = '<input disabled="disabled" id="idComboDepotAMOS" placeholder="Select Depot" class="FormInputStyle marginTop10" style="width:100%;height:38px">';
		oComboDepotAMOS.setContent(htmlContentDepot);
		
		/*// Depot Drop-down
		var oListDepotOutMultiple = new sap.ui.commons.ListBox("idListDepotOutMultiple", {items : [
    	                                                                   new sap.ui.core.ListItem({id:"depmul1", text:"Depot 1"}),
    	                                                                   new sap.ui.core.ListItem({id:"depmul2", text:"Depot 2"}),
    	                                                                   new sap.ui.core.ListItem({id:"depmul3", text:"Depot 3"}),
    	                                                                   new sap.ui.core.ListItem({id:"depmul4", text:"Depot 4"}),
    	                                                                   ]});
		        		  
	    var oComboDepotOutMultiple = new sap.ui.commons.DropdownBox("idComboDepotOutMultiple", {tooltip:"Depot", 
	    	layoutData: new sap.ui.layout.GridData({span: "L6 M4 S4"}),
			  width:"99%",
	          displaySecondaryValues:false, value:"Select Depot", "association:listBox" : oListDepotOutMultiple}).addStyleClass("FormOutputStyle margin2");*/
	
	    
	 // Text Field
		oInputDepotOutMultipleAMOS = new sap.ui.commons.TextField("idDepotOutputFieldAMOS",{
			layoutData: new sap.ui.layout.GridData({span: "L1 M1 S8",linebreak: false, margin: true}),
			placeholder:"Depot Code",
    		change: function(){
    			//flagOnChangeDepotCodeAMOS = true;
           	 if(this.getValue() != ""){
					 this.setValueState(sap.ui.core.ValueState.None);
				 }
            }
    	}).addStyleClass("FormInputStyle marginTop10 DepotInput38px");
    	
		/*oInputDepotOutMultipleAMOS.attachChange(
                function(oEvent){
                        if(isNaN(oInputDepotOutMultipleAMOS.getValue())){
                                oEvent.oSource.setValueState(sap.ui.core.ValueState.Error);
                                oEvent.oSource.setValue("");
                                oEvent.oSource.setPlaceholder("Invalid Value");
                        }else{
                                oEvent.oSource.setValueState(sap.ui.core.ValueState.None);
                        }
                }
    		);*/
    	
		var oAddOutExcelContainer = new sap.ui.core.HTML("idAddOutExcelContainer").addStyleClass("marginLeft marginTop20");
        var oAddOutExcel = '<div id="idAddOutExcel" style="width:60%" class="marginLeft marginTop20">';
        oAddOutExcelContainer.setContent(oAddOutExcel);
        
        var oBtnOutMultipleEntry5 = new sap.m.Button("idBtnOutMultipleEntry5",{
			  text : "Insert 5 Lines",
			  //width:"100px",
			  styled:false,
			  visible: false,
			  //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: true}),
			  press:function(){
				  	var excelLength = oExcelGridAddOut.getData().length;
					var allowedLength = 25 - oExcelGridAddOut.getData().length;
					if(excelLength < 25){
					if(excelLength < 20){
					oExcelGridAddOut.alter('insert_row', '', 5);
					}else{
					oExcelGridAddOut.alter('insert_row', '', allowedLength);	
					}
					}
					else{
					sap.ui.commons.MessageBox.alert("Sorry, Max. Entries is 25!");
					}
		}}).addStyleClass("submitBtn marginRight marginLeft marginTop20");
        
    	// Buttons
	   	 var oBtnOutMultipleContinue = new sap.m.Button("idBtnOutMultipleContinueAMOS",{
		          text : "Validate",
		          //width:"80px",
		          styled:false,
		          layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
		          press:function(){
		        	  var selDepValAMOS = document.getElementById("idComboDepotAMOS").value;
		  		      var partsDepAMOS = selDepValAMOS.split("-");
		  		      selectedDepotToPassCodeAMOS = partsDepAMOS[3];
		  		
		        	  var oValidateMOSObj = new addMovemntOutMultipleViewNew();
		        	  oValidateMOSObj.validateMoveOutMultiple();
		          }}).addStyleClass("submitBtn marginTop20");
	   	
		   	var oFlexInsertValidateAMOS = new sap.m.FlexBox({
		           items: [
							oBtnOutMultipleEntry5,
							oBtnOutMultipleContinue
		           ],
		           layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12",linebreak: false, margin: false}),
		           direction : "Row",
					});
		   	
	   	var oBtnOutMultipleRemoveFilter = new sap.m.Button("idBtnOutMultipleRemoveFilterAMOS",{
	          text : "Remove Filter",
	          //width:"115px",
	          styled:false,
	          enabled:false,
	          layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: false, margin: true}),
	          press:function(){
	        	  oInputDepotOutMultipleAMOS.setValue("");
	        	  $("#idComboDepotAMOS").val("");
		          this.setEnabled(false);
	          }}).addStyleClass("submitBtn marginTop5");
	   	 
	   	 var oBtnOutMultipleApplyFilter = new sap.m.Button("idBtnOutMultipleApplyFilterAMOS",{
		          text : "Apply Filter",
		          //width:"115px",
		          styled:false,
		          layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: false, margin: true}),
		          press:function(){
		        	  if(oInputDepotOutMultipleAMOS.getValue() == ""/* && document.getElementById("idComboDepotAMOS").value == ""*/){
		        		  /*oInputDepotOutMultipleAMOS.setValueState(sap.ui.core.ValueState.Error);
		        		  oInputDepotOutMultipleAMOS.setValue("");
		        		  oInputDepotOutMultipleAMOS.setPlaceholder("Required");*/
		        		  $("#idComboDepotAMOS").val("");
		        		  /*document.getElementById("idComboDepotAMOS").style.borderColor = "red";
		        		  document.getElementById("idComboDepotAMOS").style.background = "#FAD4D4";*/
		          	  }
		          	  else{
		          		sap.ui.getCore().byId("idBtnOutMultipleRemoveFilterAMOS").setEnabled(true);
		          		document.getElementById("idComboDepotAMOS").style.borderColor = "#cccccc";
		        		document.getElementById("idComboDepotAMOS").style.background = "#ffffff";
		          		/*oInputDepotOutMultipleAMOS.setPlaceholder("");
		          		  if(document.getElementById("idComboDepotAMOS").value == ""){*/
				          		var depotCodeAMOS = new RegExp(oInputDepotOutMultipleAMOS.getValue());
				          		  for(var i=0; i<depotNameListAMOS.length; i++){
				          			var depotNameAMOS = depotNameListAMOS[i];
				          			var resultAMOS = depotCodeAMOS.test(depotNameAMOS);
					          		if(resultAMOS){
					          			$("#idComboDepotAMOS").val(depotNameAMOS);
					          			break;
					          		}
					          		else{
					          			 $("#idComboDepotAMOS").val("");
					          		}
								   /* var partsAMOS = depotNameAMOS.split("-");
								    var depotCodeAMOS = partsAMOS[partsAMOS.length - 2];
					          		//var resultAMOS = depotCodeAMOS.test(depotNameAMOS);
					          		//if(resultAMOS){
				          			if(depotCodeAMOS == oInputDepotOutMultipleAMOS.getValue()){
					          			$("#idComboDepotAMOS").val(depotNameAMOS);
					          			break;
					          		}
					          		else{
					          			$("#idComboDepotAMOS").val("");
					          		}*/
				          		  }
		          		  /*}
		          		  if(oInputDepotOutMultipleAMOS.getValue() == ""){
		          			var keyAMOS = document.getElementById("idComboDepotAMOS").value;
						    var partsAMOS = keyAMOS.split("-");
						    var lastPartAMOS = partsAMOS[partsAMOS.length - 2];
						    oInputDepotOutMultipleAMOS.setValue(lastPartAMOS);
						    oInputDepotOutMultipleAMOS.setValueState(sap.ui.core.ValueState.None);
		          		  }
		          		if(flagOnChangeDepotNameAMOS){
		          			var keyAMOS = document.getElementById("idComboDepotAMOS").value;
						    var partsAMOS = keyAMOS.split("-");
						    var lastPartAMOS = partsAMOS[partsAMOS.length - 2];
						    oInputDepotOutMultipleAMOS.setValue(lastPartAMOS);
						    oInputDepotOutMultipleAMOS.setValueState(sap.ui.core.ValueState.None);
						    flagOnChangeDepotCodeAMOS = false;
						    flagOnChangeDepotNameAMOS = false;
		          		  }
		          		  if(flagOnChangeDepotCodeAMOS){
		          			var depotCodeAMOS = new RegExp(oInputDepotOutMultipleAMOS.getValue());
			          		  for(var i=0; i<depotNameListAMOS.length; i++){
			          			var depotNameAMOS = depotNameListAMOS[i];
				          		var resultAMOS = depotCodeAMOS.test(depotNameAMOS);
				          		if(resultAMOS){
				          			$("#idComboDepotAMOS").val(depotNameAMOS);
				          			break;
				          		}
			          		  }
		          		  }*/
		          	  }
		        	  }}).addStyleClass("submitBtn marginTop5");
	   	 
	   	var oFlexApplyRemoveAMOS = new sap.m.FlexBox({
	           items: [
						oBtnOutMultipleApplyFilter,
						oLabelSpaceAMOS,
						oBtnOutMultipleRemoveFilter
	           ],
	           layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12",linebreak: false, margin: false}),
	           direction : "Row",
				});
	   	 
	   	var oImageAddMOS = new sap.ui.commons.Image("imgAddMOS");
	   	oImageAddMOS.setSrc("images/add_row.png");
	   	oImageAddMOS.setTooltip("Add New Row");
	   	oImageAddMOS.setDecorative(false);
	   	oImageAddMOS.addStyleClass("marginTop20 marginRight5");
	   	
	   	var MaxLimitReachedMessage = "Max row limit of 25 reached. Please submit these rows and then add more unit numbers.";
	   	
	   	var oBtnIMAddNewRow = new sap.ui.commons.Link({
	        text: "Add New Row", 
	        tooltip: "Add New Row",
	        layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: false, margin: true}),
	        press: function() {
	        	var currentArrayLenMOS = aMoveOutMultipleAMOS.length;
	        	if(currentArrayLenMOS == 25){
	        		sap.ui.commons.MessageBox.show(MaxLimitReachedMessage,
	                        sap.ui.commons.MessageBox.Icon.WARNING,
	                        "Warning",
	                        [sap.ui.commons.MessageBox.Action.OK], 
	                            sap.ui.commons.MessageBox.Action.OK);
	        	}
	        	else{
	        		aMoveOutMultipleAMOS.push({
	        		'checked':false,
                    'serialNo':"",
                    'frmtAMOSYYYYMMDD' : frmtAMOSYYYYMMDD,
                    'retDateVal': "",
                    'retDate': dtTodayAMOSltpl,
                    'retDateVal': "",
                    'auth':"",
                    'statusA':false,
                    'tankDetails': "NA",
                    'unNo': "",
                    'lastClnDate': "",
                    'lastCargoDesc': "",
                    'clnProcDesc': ""
              });
	        		oModelMoveOutMultipleAMOS.updateBindings();
	        	  oMoveOutMultipleTable.setVisibleRowCount(aMoveOutMultipleAMOS.length);
	        	  currentArrayLenMOS = currentArrayLenMOS + 1;
	        	}
          }}).addStyleClass("marginTop25 marginRight");
	   	
	   	/*var oBtnIMAddNewRow = new sap.m.Button("idBtnIMAddNewRow",{
		          text : "Add New Row",
		          width:"115px",
		          type:sap.m.ButtonType.Unstyled,
		          layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: false, margin: true}),
		          press:function(){
		        	  aMoveOutMultipleAMOS.push({
		        		  'checked':false,
	                    'serialNo':"",
	                    'retDate': "",
	                    'auth':"",
	                    'statusA':false
                  });
		        	  oModelMoveOutMultipleAMOS.updateBindings();
		        	  oMoveOutMultipleTable.setVisibleRowCount(aMoveOutMultipleAMOS.length);
	          }}).addStyleClass("submitBtn marginTop10");*/
	   	
	   	var oImageDeleteMOS = new sap.ui.commons.Image("imgDeleteMOS");
	   	oImageDeleteMOS.setSrc("images/delete_row.png");
	   	oImageDeleteMOS.setTooltip("Add New Row");
	   	oImageDeleteMOS.setDecorative(false);
	   	oImageDeleteMOS.addStyleClass("marginTop20 marginRight5");
	   	
	   	var oBtnMOSDeleteRow = new sap.ui.commons.Link({
	        text: "Delete Checked Rows", 
	        tooltip: "Delete Checked Rows",
	        layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: false, margin: true}),
	        press: function() {
	        	  arrayLenMOS = aMoveOutMultipleAMOS.length;
	        	  var unCheckedCount = 0;
	        	  for(var j=0; j<arrayLenMOS; j++){
	        		  if(aMoveOutMultipleAMOS[j].checked == false){
	        			  unCheckedCount++;
	        		  }
	        	  }
	        	  if(unCheckedCount == arrayLenMOS){
	        		  sap.ui.commons.MessageBox.show("Please select atleast 1 row for deletion!",
	                            sap.ui.commons.MessageBox.Icon.WARNING,
	                            "Warning",
	                            [sap.ui.commons.MessageBox.Action.OK],
	                            sap.ui.commons.MessageBox.Action.OK);
	        	  }
	        	  else{
	        	  for(var i=arrayLenMOS-1; i>=0; i--){
	        		  if(aMoveOutMultipleAMOS[i].checked){
	        			  aMoveOutMultipleAMOS.splice(i,1);
	        			  oModelMoveOutMultipleAMOS.updateBindings();
	        			  arrayLenMOS = arrayLenMOS - 1;
	        		  }
	        	  }
	        	  oMoveOutMultipleTable.setVisibleRowCount(arrayLenMOS);
	        	  }
	          }}).addStyleClass("marginTop25 marginRight");
	   	
	   	var oFlexOutAddDeleteMOS = new sap.m.FlexBox({
	           items: [
						oImageAddMOS,
						oBtnIMAddNewRow,
						oImageDeleteMOS,
						oBtnMOSDeleteRow
	           ],
	           direction : "Row",
				});
	   	
	   	/*var oBtnMOSDeleteRow = new sap.m.Button("idBtnMOSDeleteRow",{
	          text : "Delete Row",
	          width:"115px",
	          type:sap.m.ButtonType.Unstyled,
	          layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: false, margin: true}),
	          press:function(){
	        	  arrayLenMOS = aMoveOutMultipleAMOS.length;
	        	  for(var i=arrayLenMOS-1; i>=0; i--){
	        		  if(aMoveOutMultipleAMOS[i].checked){
	        			  aMoveOutMultipleAMOS.splice(i,1);
	        			  oModelMoveOutMultipleAMOS.updateBindings();
	        			  arrayLenMOS = arrayLenMOS - 1;
	        		  }
	        	  }
	        	  oMoveOutMultipleTable.setVisibleRowCount(arrayLenMOS);
	          }}).addStyleClass("submitBtn marginTop10");*/
	    
	 // Table
    	var oMoveOutMultipleTable = new sap.ui.table.Table("idTblAdMovInMultiplAMOS",{
    		visibleRowCount: 5,
            firstVisibleRow: 3,
            columnHeaderHeight: 40,
            selectionMode: sap.ui.table.SelectionMode.None,
            width:"70%",
            height:"100%"
    	 }).addStyleClass("tblBorder marginTop33");
    	
    	// Table Columns
    	oMoveOutMultipleTable.addColumn(new sap.ui.table.Column({
        	template: new sap.ui.commons.CheckBox().bindProperty("checked", "checked"),
        	sortProperty: "checked",
        	filterProperty: "checked",
        	resizable:false,
        	width:"20px",
        	hAlign: "Center"}));
    	
    	var arrEnteredSerNo = [];
    	
    	oMoveOutMultipleTable.addColumn(new sap.ui.table.Column({
      		 label: new sap.ui.commons.Label({text: "Serial Number", required: true}),
    		 template: new sap.ui.commons.TextField("idSerNoAMOSInput",{textAlign:"Left",
    			 change: function(){
    				 if(this.getValue() != ""){
    					 this.setValueState(sap.ui.core.ValueState.None);
    				 }
    				 var enteredSerNo = this.getValue();
    				 var count = 0;

                     for(var j=0;j<aMoveOutMultipleAMOS.length;j++){
                             if(enteredSerNo == aMoveOutMultipleAMOS[j].serialNo){
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
             width: "70px",
             hAlign: sap.ui.commons.layout.HAlign.Left
    		 }));
    	
    	sap.ui.getCore().byId("idSerNoAMOSInput").setMaxLength(11);
    	
    	/*var oModelCurrDateAMOS = new sap.ui.model.json.JSONModel();
    	oModelCurrDateAMOS.setData({
	   		dateValue: new Date()
		});*/
    	
    	var oOutDateAMOS = new sap.ui.commons.DatePicker("idOutDateInputAMOS",{
    		width:"120px",
    		//textAlign:"Right",
			  value: {
				  path: "{retDate}",
			  type: new sap.ui.model.type.Date({pattern: "dd-MM-yyyy"})},
			}).bindProperty("yyyymmdd", "frmtAMOSYYYYMMDD").bindProperty("placeholder", "placeHolderDate").bindProperty("valueState", "valuestateDate").addStyleClass("margin5 paddingRight15");
	   	
    	/*var oOutDateAMOS = new sap.ui.commons.DatePicker("idOutDateInputAMOS",{
    		width:"120px",
    		textAlign:"Right",
    		 value: {
				  path: "/dateValue",
			  type: new sap.ui.model.type.Date({pattern: "dd-MM-yyyy"})},
			}).bindProperty("value", "retDate").addStyleClass("margin5 textRight paddingRight15");*/
    	//oOutDateAMOS.setModel(oModelCurrDateAMOS);
    	//oOutDateAMOS.setYyyymmdd("20100101");
    	//oOutDateAMOS.setLocale("en-US"); 
    	
/*    	oOutDateAMOS.attachChange(
                function(oEvent){
                        if(oEvent.getParameter("invalidValue")){
                                oEvent.oSource.setValueState(sap.ui.core.ValueState.Error);
                                oEvent.oSource.setValue("");
                                oEvent.oSource.setPlaceholder("Invalid Value");
                        }else{
                                oEvent.oSource.setValueState(sap.ui.core.ValueState.None);
                                	var editDate = this.getValue();
	              				  	var id = this.sId.replace('idOutDateInputAMOS-col2','idOutDateInputCopyAMOS-col5');
	              				  	var oidTxtVwRetTbl = sap.ui.getCore().byId(id);
	              				  	oidTxtVwRetTbl.setText(editDate);
                        //}
                }
    	);*/
    	
    	oMoveOutMultipleTable.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Return Date", required: true}),
			 template: oOutDateAMOS.addStyleClass("borderStyle"),
             sortProperty: "retDate",
             filterProperty: "retDate",
             resizable:false,
             width: "70px",
            // hAlign: sap.ui.commons.layout.HAlign.Right,
			 }));
    	
    	/*oMoveOutMultipleTable.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Return Date", required: true, textAlign:"Right"}),
			 template: new sap.ui.commons.TextField("idOutDateInputAMOS",{textAlign:"Right"}).bindProperty("value", "retDate").addStyleClass("borderStyle paddingRight15"),
             resizable:false,
            width: "50px",
            hAlign: sap.ui.commons.layout.HAlign.Right,
			 }));*/
    	
    	oMoveOutMultipleTable.addColumn(new sap.ui.table.Column({
    		 label: new sap.ui.commons.Label({text: "Authorisation", required: true}),
    		 template: new sap.ui.commons.TextField("idAuthAMOSInput",{textAlign:"Left",
    			 change: function(){
                	 if(this.getValue() != ""){
    					 this.setValueState(sap.ui.core.ValueState.None);
    				 }
                 }}).bindProperty("value", "auth").bindProperty("valueState", "valuestateAuth").bindProperty("placeholder", "placeHolderAuth").addStyleClass("borderStyle"),
             sortProperty: "auth",
             filterProperty: "auth",
             resizable:false,
             hAlign: sap.ui.commons.layout.HAlign.Left,
             width: "70px",
    		 }));
    	
    	oMoveOutMultipleTable.addColumn(new sap.ui.table.Column({
    		label: new sap.ui.commons.Label({text: "Status 'A'"}),
        	template: new sap.ui.commons.CheckBox().bindProperty("checked", "statusA"),
        	sortProperty: "statusA",
        	filterProperty: "statusA",
        	resizable:false,
        	width: "40px",
        	hAlign: "Center"}));
    	
    	/*oMoveOutMultipleTable.addColumn(new sap.ui.table.Column({
    		template: new sap.ui.commons.TextView("idOutDateInputCopyAMOS",{wrapping:false}).bindProperty("text", "retDate"),
           width:"0px",
           //label: new sap.ui.commons.Label({text: "S"}),
           //visible:false,
           resizable:false
			 }));*/
    	
    	//Create a model and bind the table rows to this model
    	//var oModelMoveOutMultipleAMOS = new sap.ui.model.json.JSONModel();
    	//oModelMoveOutMultipleAMOS.setData({modelData: aMoveOutMultipleAMOS});
    	oMoveOutMultipleTable.setModel(oModelMoveOutMultipleAMOS);
    	oMoveOutMultipleTable.bindRows("/modelData");
    	
    	// Responsive Grid Layout
	    var oAddMoveOutMultipleLayout = new sap.ui.layout.form.ResponsiveGridLayout("idAddMoveOutMultipleLayout",{
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
	     var oAddMoveOutMultipleForm = new sap.ui.layout.form.Form("idAddMoveOUTMultipleForm",{
	             layout: oAddMoveOutMultipleLayout,
	             formContainers: [
	                     
	                     new sap.ui.layout.form.FormContainer("idAddMoveOutMultipleFormC1",{
	                             //title: "Add Movement In - Multiple",
                             formElements: [
												new sap.ui.layout.form.FormElement({
												    fields: [oLabelDepotOutMultiple, oComboDepotAMOS, oInputDepotOutMultipleAMOS,oFlexApplyRemoveAMOS]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oAddOutExcelContainer]
												}),
												//new sap.ui.layout.form.FormElement({
												//    fields: [oFlexInAddDeleteMOS]
												//}),
												new sap.ui.layout.form.FormElement({
												    fields: [oFlexInsertValidateAMOS]
												}),
												//new sap.ui.layout.form.FormElement({
												//    fields: [oLabelMandatoryInMultiple]
												//})
	                                     ]
	                     }),
	                    /* new sap.ui.layout.form.FormContainer("idAddMoveOutMultipleFormC2",{
                         formElements: [
											new sap.ui.layout.form.FormElement({
											    fields: [oFlexApplyRemoveAMOS]
											})
                                     ]
                     })*/
	             ]
	     });
	     
/*	  // Responsive Grid Layout
		    var oAddMoveOutMultipleLayout2 = new sap.ui.layout.form.ResponsiveGridLayout("idAddMoveOutMultipleLayout2",{
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
		     var oAddMoveOutMultipleForm2 = new sap.ui.layout.form.Form("idAddMoveOUTMultipleForm2",{
		             layout: oAddMoveOutMultipleLayout2,
		             formContainers: [
		                     
		                     new sap.ui.layout.form.FormContainer("idAddMoveOutMultipleForm2C1",{
		                             //title: "Add Movement In - Multiple",
	                             formElements: [
													new sap.ui.layout.form.FormElement({
													    fields: [oMoveOutMultipleTable]
													}),
													new sap.ui.layout.form.FormElement({
													    fields: [oFlexInAddDeleteMOS]
													}),
													new sap.ui.layout.form.FormElement({
													    fields: [oBtnInMultipleContinue]
													}),
													new sap.ui.layout.form.FormElement({
													    fields: [oLabelMandatoryInMultiple]
													})
		                                     ]
		                     }),
		                     new sap.ui.layout.form.FormContainer("idAddMoveOutMultipleForm2C2",{
		                         formElements: [
													new sap.ui.layout.form.FormElement({
													    fields: []
													})
		                                     ]
		                     })
		                     ]
		     });
		     
		     var oFlexAll = new sap.m.FlexBox({
		           items: [
							oAddMoveOutMultipleForm,
							//oMoveOutMultipleTable,
							oAddMoveOutMultipleForm2,
		           ],
		           direction : "Column",
					});
		     */
	     	return oAddMoveOutMultipleForm;
	   	
	},
	
	populateDepotNameAMOS: function(){
		busyDialog.open();
		currentDateAMOS = dateFormat(new Date(),'dd-mm-yyyy');
		for(var i=0;i<aMoveOutMultipleAMOS.length;i++){
			aMoveOutMultipleAMOS[i].retDate = currentDateAMOS;
		}
		for(var i=0;i<unitsTankTypeAMOS.length;i++){
			unitsTankTypeAMOS[i].lastCleanDate = currentDateAMOS;
		}
		oModel = new sap.ui.model.odata.ODataModel(serviceUrl15, true);
		var urlToCallAMOSDep = serviceUrl15 + "/F4_Functional_Location";
		//alert("urlToCallAMOSDep : "+urlToCallAMOSDep);
		OData.request({ 
		      requestUri: urlToCallAMOSDep,
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
		    		depotNameListAMOS[i] = data.results[i].FunctionalLoc;
				}
		    	$("#idComboDepotAMOS").autocomplete({
		    	      source: depotNameListAMOS,
		    	      minLength: 0,
		    	      /*select: function(){
		    	    	  flagOnChangeDepotNameAMOS = true;
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
		    			/*var keyAMOS = this.value;
					    var partsAMOS = keyAMOS.split(" ");
					    var lastPartAMOS = partsAMOS[partsAMOS.length - 2];
					    oInputDepotOutMultipleAMOS.setValue(lastPartAMOS);*/
			     })
		    	.keyup(function() {
		    	    var isValid = false;
		    	    var previousValue = "";
		    	    for (i in depotNameListAMOS) {
		    	        if (depotNameListAMOS[i].toLowerCase().match(this.value.toLowerCase())) {
		    	            isValid = true;
		    	        }
		    	    }
		    	    if (!isValid) {
		    	        this.value = previousValue;
		    	    } else {
		    	        previousValue = this.value;
		    	    }
		    	});
		    	loggedInUserTypeAMOS = objLoginUser.getLoggedInUserType();
		    	//alert("loggedInUserTypeAMOS : "+loggedInUserTypeAMOS);
				if(loggedInUserTypeAMOS == "SEACO"){
					$("#idComboDepotAMOS").removeAttr('disabled');
					$("#idComboDepotAMOS").attr("disabled","disabled");
					sap.ui.getCore().byId("idBtnOutMultipleRemoveFilterAMOS").setEnabled(false);
					sap.ui.getCore().byId("idBtnOutMultipleApplyFilterAMOS").setEnabled(true);
					sap.ui.getCore().byId("idDepotOutputFieldAMOS").setEnabled(true);
				}
				else{
					var DepotCode = objLoginUser.getLoggedInUserID();
					//alert("DepotCode : "+DepotCode);
					for(var i=0;i<depotNameListAMOS.length;i++){
						if(depotNameListAMOS[i].substring(11,15) == DepotCode)
							DepotCode = depotNameListAMOS[i];
					}
					$("#idComboDepotAMOS").attr("disabled","disabled");
					$("#idComboDepotAMOS").val(DepotCode);
					var depotAMOS = document.getElementById("idComboDepotAMOS").value.split("-");
					sap.ui.getCore().byId("idDepotOutputFieldAMOS").setValue(depotAMOS[3]);
					sap.ui.getCore().byId("idBtnOutMultipleRemoveFilterAMOS").setEnabled(false);
					sap.ui.getCore().byId("idBtnOutMultipleApplyFilterAMOS").setEnabled(false);
					sap.ui.getCore().byId("idDepotOutputFieldAMOS").setEnabled(false);
				}



		    	busyDialog.close();
		    },
		    function(err){
		    	 errorfromServer(err);
		    	//alert("Error while Reading Result : "+ : window.JSON.stringify(err.response));
		    });
	},
	
	validateMoveOutMultiple: function(){
		var oCurrAMOS = this;
		vInputDepotOutMultipleValAMOS = oInputDepotOutMultipleAMOS.getValue();
		vInputDepotListAMOS = document.getElementById("idComboDepotAMOS").value;
		var isValid = true;
  	  if(vInputDepotListAMOS ==""){
  		document.getElementById("idComboDepotAMOS").style.borderColor = "red";
		document.getElementById("idComboDepotAMOS").style.background = "#FAD4D4";
		$("#idComboDepotAMOS").attr("placeholder","Required");
		isValid = false;
  	  }
	  	if(vInputDepotListAMOS.trim().length > 0){
			var match = jQuery.inArray(vInputDepotListAMOS,depotNameListAMOS);
			if(match < 0){
				document.getElementById("idComboDepotAMOS").style.borderColor = "red";
	    		document.getElementById("idComboDepotAMOS").style.background = "#FAD4D4";
	    		document.getElementById("idComboDepotAMOS").value = "";
	    		document.getElementById("idComboDepotAMOS").placeholder = "Invalid Depot";
	    		isValid = false;
			}
			else{
				document.getElementById("idComboDepotAMOS").style.borderColor = "#cccccc";
	    		document.getElementById("idComboDepotAMOS").style.background = "#ffffff";
	    		document.getElementById("idComboDepotAMOS").placeholder = "Depot";
	    		isValid = true;
			}
		}
  	  if(isValid){
  		//oInputDepotOutMultipleAMOS.setValueState(sap.ui.core.ValueState.None);
  		document.getElementById("idComboDepotAMOS").style.borderColor = "#cccccc";
		document.getElementById("idComboDepotAMOS").style.background = "#ffffff";
  		oCurrAMOS.continueAMOS();
  	  }
	},
	
	continueAMOS: function(){
//		busyDialog.open();
		var oCurrent = this;
		
//		 var bus = sap.ui.getCore().getEventBus();
//	  	  	bus.publish("nav", "to", {
//	        id : "ValidateMoveOutMultiple"
//  	  	 });
//	  	 var oObjValidateMoveOutMultiple = new validateMoveOutMultipleView();
//	  	 oObjValidateMoveOutMultiple.updateBindingValidateAMOS();
		
		var tempDateArray = [];
		var cleanDateArray = "";
		var tempDate = "";
		var cleanDate = "";
		var j = 0;
		jsonMoveOutToValidateEntries.length = 0;
		var datainsert = false;
		for(var i =0; i < excelDataAddOut.length;i++){
			j = 0;
			datainsert = true;
 			while(j<2){
 				if(excelDataAddOut[i][j] == "" || excelDataAddOut[i][j] == null){
 					datainsert = false;
 					break;
 				}
 				j++;
 			}
 			if(datainsert){
 				if(excelDataAddOut[i][1] != ""){
 				tempDateArray = excelDataAddOut[i][1].split('/');
 				tempDate = tempDateArray[2] + tempDateArray[1] +tempDateArray[0];
 				}else{
 				tempDate = "";	
 				}
 				
 				
 				jsonMoveOutToValidateEntries.push({
 					"Serial":excelDataAddOut[i][0].toUpperCase(),
 					"Date":tempDate,
 					"Release":excelDataAddOut[i][2]
 				});
 			}
 		}
		
		if(jsonMoveOutToValidateEntries.length == 0){
			sap.ui.commons.MessageBox.alert("Enter at least one entry!" );
			return;
		}else{
			oCurrent.sendToSapForMoveOutValidationNew();
		}
		
	  	
	},
	
	sendToSapForMoveOutValidationNew : function(){
		
		var enableConfirm = true;
		jsonMoveOutToSubmitEntries = [];
		var jsonMoveOutToValidateEntriesLength = jsonMoveOutToValidateEntries.length;
		var depot = selectedDepotToPassCodeAMOS;
		var stringToPass = "";
		var stringCount = 1;
		var selDepValAMOS = document.getElementById("idComboDepotAMOS").value;
		var partsDepAMOS = selDepValAMOS.split("-");
		selectedDepotToPassAMOS = partsDepAMOS[0] + "-" + partsDepAMOS[1] + "-" + partsDepAMOS[2] + "-" + partsDepAMOS[3];
		if(jsonMoveOutToValidateEntriesLength == 0)
			sap.ui.commons.MessageBox.alert("No data to submit");
		else{
			for(var i =0; i < jsonMoveOutToValidateEntriesLength; i++){
				if(stringToPass == ""){
					stringToPass = stringToPass + "IGateout" + stringCount + " eq '" + jsonMoveOutToValidateEntries[i].Serial + "$" + 
					selectedDepotToPassAMOS + "$" + 
					depot + "$" + 
					jsonMoveOutToValidateEntries[i].Release + "$" + 
					jsonMoveOutToValidateEntries[i].Date + "'";
				}
				else{
					stringToPass = stringToPass + " and IGateout" + stringCount + " eq '" + jsonMoveOutToValidateEntries[i].Serial + "$" + 
					selectedDepotToPassAMOS + "$" + 
					depot + "$" + 
					jsonMoveOutToValidateEntries[i].Release + "$" + 
					jsonMoveOutToValidateEntries[i].Date + "'";
				}
				stringCount++;
				}
			
//			if(stringToPass != ""){
//				stringToPass = stringToPass + " and Validate eq '" + validate + "' and Depotin eq '" + depot + "'";
//				
//			}
		}

		oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
		var urlToCallSAMOS = serviceUrlMove + "/moveout_validnSet?$filter=" + stringToPass;
		busyDialog.open();
		console.log(urlToCallSAMOS);
		OData.request({ 
		      requestUri: urlToCallSAMOS,
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
		    		 sap.ui.commons.MessageBox.alert("Nothing Returned after validation!");
		    	}
		    	else{
		    		busyDialog.close();
		    		var validatedJSON = data.results;
		    		var validatedJSONLength = validatedJSON.length;
		    		var dataTemp = "";
		        	if(validatedJSONLength > 0){// && data.__batchResponses[0].statusText == "OK"){
		        		//jsonReturnEntry = data.__batchResponses[0].data.results[0];
		        		jsonMoveOutToSubmitEntries = [];
		        		for(var i=0; i<validatedJSONLength; i++){
		        			dataTemp = data.results[i].Igateout1.split('$')[4];
		        			if(dataTemp != ""){
		        				dataTemp = dataTemp.substr(6,2) + '-' + dataTemp.substr(4,2) + '-' + dataTemp.substr(0,4);
		        			}
		        			
		        		jsonMoveOutToSubmitEntries.push({
		        				"isChecked": false,
		        				"Status": (data.results[i].Status != "FAIL")? "Success" : "Error",
		        				"Enabled": (data.results[i].Status != "FAIL")? false : true,
		        				"upEnabled": (data.results[i].Status != "FAIL")? true : false,
		        				"Serial":data.results[i].Igateout1.split('$')[0],
		        				"Floc":data.results[i].Igateout1.split('$')[1],
		        				"Depot":data.results[i].Igateout1.split('$')[2],
		        				"Release":data.results[i].Igateout1.split('$')[3],
		        				"Date":dataTemp,
		        				//"Message":data.results[i].Message,
		        				"Message":(data.results[i].Status != "FAIL")? "Success" : data.results[i].Message,
		        			});
		        			
		        		if(enableConfirm && data.results[i].LvOstatus == "FAIL"){
		        			enableConfirm = false;
		        		}
		        		}
		        		
		        		var bus = sap.ui.getCore().getEventBus();
					  	  	bus.publish("nav", "to", {
					        id : "ValidateMoveOutMultipleNew"
				  	  	});
				  	  	
//					  	  var oObjValidateMoveOutMultipleNew = new validateMoveOutMultipleViewNew();
//					  	  oObjValidateMoveOutMultipleNew.updateBindingValidateAMOS();
				  	
		        		var oMdlMoveOutValidation = new sap.ui.model.json.JSONModel();
		        		oMdlMoveOutValidation.setData({modelData : jsonMoveOutToSubmitEntries});
		        		sap.ui.getCore().byId("idMoveOutMultStatusTable").setModel(oMdlMoveOutValidation);
		        		sap.ui.getCore().byId("idMoveOutMultStatusTable").setVisible(true);	
		        		sap.ui.getCore().byId("idMoveOutMultStatusTable").setHeaderText("Gate Out Validation - Result");
		        		sap.ui.getCore().byId("idMoveOutMultButtonConfirm").setEnabled(enableConfirm);
		        		sap.ui.getCore().byId("idMoveOutMultStatusTableColDate").setVisible(true);	
		        		sap.ui.getCore().byId("idMoveOutMultStatusTableColReturn").setVisible(true);	

		        		sap.ui.getCore().byId("idMoveOutMultButtonConfirm").setVisible(true);	
		        		sap.ui.getCore().byId("idMoveOutMultButtonRemove").setVisible(true);
		        		sap.ui.getCore().byId("idMoveOutMultButtonConfirm").setEnabled(enableConfirm);	
//			        		sap.ui.getCore().byId("idSalesCollFinalButton").setEnabled(false);
		        		console.log("Above Request : Success");
		        		
			        	}else{
			        		console.log("Above Request : Nothing returned");
			        		outMessage = "Cannot validate, Try again!";
			        		sap.ui.commons.MessageBox.alert(outMessage);
			        	}
		    	}
		    },
		    function(err){
		    	 console.log("Above Request : Error");
		    	 busyDialog.close();
		    	 errorfromServer(err);
		    	//alert("Error while Reading Result : "+ window.JSON.stringify(err.response));
		    });
		
	},
	
	resetAddMoveOutMultipleNew : function(){
		
		loggedInUserTypeAMIM = objLoginUser.getLoggedInUserType();
		if(sap.ui.getCore().byId("idBtnOutMultipleRemoveFilterAMIM")){
        	sap.ui.getCore().byId("idBtnOutMultipleRemoveFilterAMIM").setEnabled(false);
        }
        
        if(loggedInUserTypeAMIM == "SEACO"){
               
               $("#idComboDepotAMOS").val("");
               sap.ui.getCore().byId("idDepotOutputFieldAMOS").setValue("");
               
               if(document.getElementById("idComboDepotAMOS")){
	                document.getElementById("idComboDepotAMOS").style.borderColor = "#cccccc";
		    		document.getElementById("idComboDepotAMOS").style.background = "#ffffff";
		    		document.getElementById("idComboDepotAMOS").placeholder = "Select Depot";
               }
               if(sap.ui.getCore().byId("idBtnOutMultipleRemoveFilterAMOS")){
            	   sap.ui.getCore().byId("idBtnOutMultipleRemoveFilterAMOS").setEnabled(false);
               }
        }
        
        if(oExcelGridAddOut != undefined){
        	
    		excelDataAddOut = [
    		       			["","",""],  
    		       			["","",""],  
    		       			["","",""], 
    		       			["","",""], 
    		       			["","",""]
    		       	 		];  
        	
        	oExcelGridAddOut.loadData(excelDataAddOut);
        	
              
        }
        
	},
	
	resetAMOS: function(){
        
        loggedInUserTypeAMOS = objLoginUser.getLoggedInUserType();
        oModelMoveOutMultipleAMOS.setData({modelData: []});
        
        if(sap.ui.getCore().byId("idBtnOutMultipleRemoveFilterAMOS")){
        	sap.ui.getCore().byId("idBtnOutMultipleRemoveFilterAMOS").setEnabled(false);
        }
        
        if(loggedInUserTypeAMOS == "SEACO"){
               
               $("#idComboDepotAMOS").val("");
               sap.ui.getCore().byId("idDepotOutputFieldAMOS").setValue("");
               
               if(document.getElementById("idComboDepotAMOS")){
	                document.getElementById("idComboDepotAMOS").style.borderColor = "#cccccc";
		    		document.getElementById("idComboDepotAMOS").style.background = "#ffffff";
		    		document.getElementById("idComboDepotAMOS").placeholder = "Select Depot";
               }
               if(sap.ui.getCore().byId("idBtnOutMultipleRemoveFilterAMOS")){
            	   sap.ui.getCore().byId("idBtnOutMultipleRemoveFilterAMOS").setEnabled(false);
               }
        }
        
        aMoveOutMultipleAMOS = [];
        unitsTankTypeAMOS = [];
        
        aMoveOutMultipleAMOS.push({checked: false, serialNo: "", frmtAMOSYYYYMMDD: frmtAMOSYYYYMMDD, retDateVal: "", retDate: dtTodayAMOSltpl, auth: "", statusA: false, tankDetails: "NA", unNo: "", lastClnDate: "", lastCargoDesc: "", clnProcDesc: "", placeHolderSrno: "", placeHolderAuth: "", placeHolderDate: "", valuestateSrno:sap.ui.core.ValueState.None, valuestateAuth:sap.ui.core.ValueState.None, valuestateDate:sap.ui.core.ValueState.None});
        aMoveOutMultipleAMOS.push({checked: false, serialNo: "", frmtAMOSYYYYMMDD: frmtAMOSYYYYMMDD, retDateVal: "", retDate: dtTodayAMOSltpl, auth: "", statusA: false, tankDetails: "NA", unNo: "", lastClnDate: "", lastCargoDesc: "", clnProcDesc: "", placeHolderSrno: "", placeHolderAuth: "", placeHolderDate: "", valuestateSrno:sap.ui.core.ValueState.None, valuestateAuth:sap.ui.core.ValueState.None, valuestateDate:sap.ui.core.ValueState.None});
        aMoveOutMultipleAMOS.push({checked: false, serialNo: "", frmtAMOSYYYYMMDD: frmtAMOSYYYYMMDD, retDateVal: "", retDate: dtTodayAMOSltpl, auth: "", statusA: false, tankDetails: "NA", unNo: "", lastClnDate: "", lastCargoDesc: "", clnProcDesc: "", placeHolderSrno: "", placeHolderAuth: "", placeHolderDate: "", valuestateSrno:sap.ui.core.ValueState.None, valuestateAuth:sap.ui.core.ValueState.None, valuestateDate:sap.ui.core.ValueState.None});
        aMoveOutMultipleAMOS.push({checked: false, serialNo: "", frmtAMOSYYYYMMDD: frmtAMOSYYYYMMDD, retDateVal: "", retDate: dtTodayAMOSltpl, auth: "", statusA: false, tankDetails: "NA", unNo: "", lastClnDate: "", lastCargoDesc: "", clnProcDesc: "", placeHolderSrno: "", placeHolderAuth: "", placeHolderDate: "", valuestateSrno:sap.ui.core.ValueState.None, valuestateAuth:sap.ui.core.ValueState.None, valuestateDate:sap.ui.core.ValueState.None});
        aMoveOutMultipleAMOS.push({checked: false, serialNo: "", frmtAMOSYYYYMMDD: frmtAMOSYYYYMMDD, retDateVal: "", retDate: dtTodayAMOSltpl, auth: "", statusA: false, tankDetails: "NA", unNo: "", lastClnDate: "", lastCargoDesc: "", clnProcDesc: "", placeHolderSrno: "", placeHolderAuth: "", placeHolderDate: "", valuestateSrno:sap.ui.core.ValueState.None, valuestateAuth:sap.ui.core.ValueState.None, valuestateDate:sap.ui.core.ValueState.None});
        
        oModelMoveOutMultipleAMOS.setData({modelData: aMoveOutMultipleAMOS});
        sap.ui.getCore().byId("idTblAdMovOutMultiplAMOS").setModel(oModelMoveOutMultipleAMOS);
        sap.ui.getCore().byId("idTblAdMovOutMultiplAMOS").bindRows("/modelData");
        
        sap.ui.getCore().byId("idTblAdMovInMultiplAMOS").setVisibleRowCount(5);
 }

});
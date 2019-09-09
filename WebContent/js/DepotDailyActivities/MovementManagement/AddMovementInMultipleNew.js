/******** NP *******/
jQuery.sap.require("sap.ui.model.json.JSONModel");

var currentDateAMIM;
var jsonMoveInToValidateEntries = [];
var jsonMoveInToSubmitEntries = [];
//Arrays
var dtTodayAMIMltpl = new Date();

var frmtAMIMYYYYMMDD = [dtTodayAMIMltpl.getFullYear(),padZero(dtTodayAMIMltpl.getMonth()+1),padZero(dtTodayAMIMltpl.getDate())].join('');

var aMoveInMultipleAMIM = [];

var oModelMoveInMultipleAMIM = new sap.ui.model.json.JSONModel();
oModelMoveInMultipleAMIM.setData({modelData: aMoveInMultipleAMIM});

var aTempAMIM = [];
var loggedInUserTypeAMIM = "";
var vInputDepotInMultipleValAMIM = "";
var oInputDepotInMultipleAMIM = "";
var arrayLenMIM = "";
var depotNameListAMIM = [];
var unitsTankTypeAMIM = [];
var selectedDepotToPassAMIM = "";
var selectedDepotToPassCodeAMIM = "";
var vInputDepotListAMIM = "";
var flagOnChangeDepotNameAMIM = false;
var flagOnChangeDepotCodeAMIM = false;
var validAMIMFieldsStatus = true;
var validAMIMStatus = true;

sap.ui.model.json.JSONModel.extend("addMovemntInMultipleViewNew", {
	
	createAddMovemntInMultipleNew: function(){
		
		aMoveInMultipleAMIM.length = 0;
		aMoveInMultipleAMIM.push({checked: false, serialNo: "", frmtAMIMYYYYMMDD: frmtAMIMYYYYMMDD, retDateVal: "", retDate: dtTodayAMIMltpl, auth: "", statusA: false, tankDetails: "NA", unNo: "", lastClnDate: "", lastCargoDesc: "", clnProcDesc: "", placeHolderSrno: "", placeHolderAuth: "", placeHolderDate: "", valuestateSrno:sap.ui.core.ValueState.None, valuestateAuth:sap.ui.core.ValueState.None, valuestateDate:sap.ui.core.ValueState.None});
		aMoveInMultipleAMIM.push({checked: false, serialNo: "", frmtAMIMYYYYMMDD: frmtAMIMYYYYMMDD, retDateVal: "", retDate: dtTodayAMIMltpl, auth: "", statusA: false, tankDetails: "NA", unNo: "", lastClnDate: "", lastCargoDesc: "", clnProcDesc: "", placeHolderSrno: "", placeHolderAuth: "", placeHolderDate: "", valuestateSrno:sap.ui.core.ValueState.None, valuestateAuth:sap.ui.core.ValueState.None, valuestateDate:sap.ui.core.ValueState.None});
		aMoveInMultipleAMIM.push({checked: false, serialNo: "", frmtAMIMYYYYMMDD: frmtAMIMYYYYMMDD, retDateVal: "", retDate: dtTodayAMIMltpl, auth: "", statusA: false, tankDetails: "NA", unNo: "", lastClnDate: "", lastCargoDesc: "", clnProcDesc: "", placeHolderSrno: "", placeHolderAuth: "", placeHolderDate: "", valuestateSrno:sap.ui.core.ValueState.None, valuestateAuth:sap.ui.core.ValueState.None, valuestateDate:sap.ui.core.ValueState.None});
		aMoveInMultipleAMIM.push({checked: false, serialNo: "", frmtAMIMYYYYMMDD: frmtAMIMYYYYMMDD, retDateVal: "", retDate: dtTodayAMIMltpl, auth: "", statusA: false, tankDetails: "NA", unNo: "", lastClnDate: "", lastCargoDesc: "", clnProcDesc: "", placeHolderSrno: "", placeHolderAuth: "", placeHolderDate: "", valuestateSrno:sap.ui.core.ValueState.None, valuestateAuth:sap.ui.core.ValueState.None, valuestateDate:sap.ui.core.ValueState.None});
		aMoveInMultipleAMIM.push({checked: false, serialNo: "", frmtAMIMYYYYMMDD: frmtAMIMYYYYMMDD, retDateVal: "", retDate: dtTodayAMIMltpl, auth: "", statusA: false, tankDetails: "NA", unNo: "", lastClnDate: "", lastCargoDesc: "", clnProcDesc: "", placeHolderSrno: "", placeHolderAuth: "", placeHolderDate: "", valuestateSrno:sap.ui.core.ValueState.None, valuestateAuth:sap.ui.core.ValueState.None, valuestateDate:sap.ui.core.ValueState.None});
 	
		// Labels
		var oLabelDepotInMultiple = new sap.ui.commons.Label({text: "Depot:",
			layoutData: new sap.ui.layout.GridData({span: "L1 M4 S12",linebreak: false, margin: true}),
			required: true,
            wrapping: true}).addStyleClass("marginTop15");
		
		var oLabelMandatoryInMultiple = new sap.ui.commons.Label({text: "Mandatory Field",
			required: true,
			requiredAtBegin : true,
            wrapping: true}).addStyleClass("margin10 marginTopBot30");
		
		var oLabelSpaceAMIM = new sap.ui.commons.Label({text: " ",
			width:"8px",
            wrapping: true});
		
		var oComboDepotAMIM = new sap.ui.core.HTML("idListDepotComboAMIM",{layoutData: new sap.ui.layout.GridData({span: "L4 M6 S12"})});
		var htmlContentDepot = '<input disabled="disabled" id="idComboDepotAMIM" placeholder="Select Depot" class="FormInputStyle marginTop10" style="width:100%;height:38px">';
		oComboDepotAMIM.setContent(htmlContentDepot);
		
		/*// Depot Drop-down
		var oListDepotInMultiple = new sap.ui.commons.ListBox("idListDepotInMultiple", {items : [
    	                                                                   new sap.ui.core.ListItem({id:"depmul1", text:"Depot 1"}),
    	                                                                   new sap.ui.core.ListItem({id:"depmul2", text:"Depot 2"}),
    	                                                                   new sap.ui.core.ListItem({id:"depmul3", text:"Depot 3"}),
    	                                                                   new sap.ui.core.ListItem({id:"depmul4", text:"Depot 4"}),
    	                                                                   ]});
		        		  
	    var oComboDepotInMultiple = new sap.ui.commons.DropdownBox("idComboDepotInMultiple", {tooltip:"Depot", 
	    	layoutData: new sap.ui.layout.GridData({span: "L6 M4 S4"}),
			  width:"99%",
	          displaySecondaryValues:false, value:"Select Depot", "association:listBox" : oListDepotInMultiple}).addStyleClass("FormInputStyle margin2");*/
	
	    
	 // Text Field
		oInputDepotInMultipleAMIM = new sap.ui.commons.TextField("idDepotInputFieldAMIM",{
			layoutData: new sap.ui.layout.GridData({span: "L1 M1 S8",linebreak: false, margin: true}),
			placeholder:"Depot Code",
    		change: function(){
    			//flagOnChangeDepotCodeAMIM = true;
           	 if(this.getValue() != ""){
					 this.setValueState(sap.ui.core.ValueState.None);
				 }
            }
    	}).addStyleClass("FormInputStyle marginTop10 DepotInput38px");
    	
		/*oInputDepotInMultipleAMIM.attachChange(
                function(oEvent){
                        if(isNaN(oInputDepotInMultipleAMIM.getValue())){
                                oEvent.oSource.setValueState(sap.ui.core.ValueState.Error);
                                oEvent.oSource.setValue("");
                                oEvent.oSource.setPlaceholder("Invalid Value");
                        }else{
                                oEvent.oSource.setValueState(sap.ui.core.ValueState.None);
                        }
                }
    		);*/
    	
		var oAddInExcelContainer = new sap.ui.core.HTML("idAddInExcelContainer").addStyleClass("marginLeft marginTop20");
        var oAddInExcel = '<div id="idAddInExcel" style="width:85%" class="marginLeft marginTop20">';
        oAddInExcelContainer.setContent(oAddInExcel);
        
        var oBtnInMultipleEntry5 = new sap.m.Button("idBtnInMultipleEntry5",{
			  text : "Insert 5 Lines",
			  //width:"100px",
			  styled:false,
			  visible: false,
			  //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: true}),
			  press:function(){
				  	var excelLength = oExcelGridAddIn.getData().length;
					var allowedLength = 25 - oExcelGridAddIn.getData().length;
					if(excelLength < 25){
					if(excelLength < 20){
					oExcelGridAddIn.alter('insert_row', '', 5);
					}else{
					oExcelGridAddIn.alter('insert_row', '', allowedLength);	
					}
					}
					else{
					sap.ui.commons.MessageBox.alert("Sorry, Max. Entries is 25!");
					}
		}}).addStyleClass("submitBtn marginRight marginLeft marginTop20");
        
    	// Buttons
	   	 var oBtnInMultipleContinue = new sap.m.Button("idBtnInMultipleContinueAMIM",{
		          text : "Validate",
		          width:"80px",
		          styled:false,
		          layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
		          press:function(){
		        	  var selDepValAMIM = document.getElementById("idComboDepotAMIM").value;
		  		      var partsDepAMIM = selDepValAMIM.split("-");
		  		      selectedDepotToPassCodeAMIM = partsDepAMIM[3];
		  		
		        	  var oValidateMIMObj = new addMovemntInMultipleViewNew();
		        	  oValidateMIMObj.validateMoveInMultiple();
		          }}).addStyleClass("submitBtn marginTop20");
	   	
		   	var oFlexInsertValidateAMIM = new sap.m.FlexBox({
		           items: [
							oBtnInMultipleEntry5,
							oBtnInMultipleContinue
		           ],
		           layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12",linebreak: false, margin: false}),
		           direction : "Row",
					});
		   	
	   	var oBtnInMultipleRemoveFilter = new sap.m.Button("idBtnInMultipleRemoveFilterAMIM",{
	          text : "Remove Filter",
	          //width:"115px",
	          styled:false,
	          enabled:false,
	          layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: false, margin: true}),
	          press:function(){
	        	  oInputDepotInMultipleAMIM.setValue("");
	        	  $("#idComboDepotAMIM").val("");
		          this.setEnabled(false);
	          }}).addStyleClass("submitBtn marginTop5");
	   	 
	   	 var oBtnInMultipleApplyFilter = new sap.m.Button("idBtnInMultipleApplyFilterAMIM",{
		          text : "Apply Filter",
		          //width:"115px",
		          styled:false,
		          layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: false, margin: true}),
		          press:function(){
		        	  if(oInputDepotInMultipleAMIM.getValue() == ""/* && document.getElementById("idComboDepotAMIM").value == ""*/){
		        		  /*oInputDepotInMultipleAMIM.setValueState(sap.ui.core.ValueState.Error);
		        		  oInputDepotInMultipleAMIM.setValue("");
		        		  oInputDepotInMultipleAMIM.setPlaceholder("Required");*/
		        		  $("#idComboDepotAMIM").val("");
		        		  /*document.getElementById("idComboDepotAMIM").style.borderColor = "red";
		        		  document.getElementById("idComboDepotAMIM").style.background = "#FAD4D4";*/
		          	  }
		          	  else{
		          		sap.ui.getCore().byId("idBtnInMultipleRemoveFilterAMIM").setEnabled(true);
		          		document.getElementById("idComboDepotAMIM").style.borderColor = "#cccccc";
		        		document.getElementById("idComboDepotAMIM").style.background = "#ffffff";
		          		/*oInputDepotInMultipleAMIM.setPlaceholder("");
		          		  if(document.getElementById("idComboDepotAMIM").value == ""){*/
				          		var depotCodeAMIM = new RegExp(oInputDepotInMultipleAMIM.getValue());
				          		  for(var i=0; i<depotNameListAMIM.length; i++){
				          			var depotNameAMIM = depotNameListAMIM[i];
				          			var resultAMIM = depotCodeAMIM.test(depotNameAMIM);
					          		if(resultAMIM){
					          			$("#idComboDepotAMIM").val(depotNameAMIM);
					          			break;
					          		}
					          		else{
					          			 $("#idComboDepotAMIM").val("");
					          		}
								   /* var partsAMIM = depotNameAMIM.split("-");
								    var depotCodeAMIM = partsAMIM[partsAMIM.length - 2];
					          		//var resultAMIM = depotCodeAMIM.test(depotNameAMIM);
					          		//if(resultAMIM){
				          			if(depotCodeAMIM == oInputDepotInMultipleAMIM.getValue()){
					          			$("#idComboDepotAMIM").val(depotNameAMIM);
					          			break;
					          		}
					          		else{
					          			$("#idComboDepotAMIM").val("");
					          		}*/
				          		  }
		          		  /*}
		          		  if(oInputDepotInMultipleAMIM.getValue() == ""){
		          			var keyAMIM = document.getElementById("idComboDepotAMIM").value;
						    var partsAMIM = keyAMIM.split("-");
						    var lastPartAMIM = partsAMIM[partsAMIM.length - 2];
						    oInputDepotInMultipleAMIM.setValue(lastPartAMIM);
						    oInputDepotInMultipleAMIM.setValueState(sap.ui.core.ValueState.None);
		          		  }
		          		if(flagOnChangeDepotNameAMIM){
		          			var keyAMIM = document.getElementById("idComboDepotAMIM").value;
						    var partsAMIM = keyAMIM.split("-");
						    var lastPartAMIM = partsAMIM[partsAMIM.length - 2];
						    oInputDepotInMultipleAMIM.setValue(lastPartAMIM);
						    oInputDepotInMultipleAMIM.setValueState(sap.ui.core.ValueState.None);
						    flagOnChangeDepotCodeAMIM = false;
						    flagOnChangeDepotNameAMIM = false;
		          		  }
		          		  if(flagOnChangeDepotCodeAMIM){
		          			var depotCodeAMIM = new RegExp(oInputDepotInMultipleAMIM.getValue());
			          		  for(var i=0; i<depotNameListAMIM.length; i++){
			          			var depotNameAMIM = depotNameListAMIM[i];
				          		var resultAMIM = depotCodeAMIM.test(depotNameAMIM);
				          		if(resultAMIM){
				          			$("#idComboDepotAMIM").val(depotNameAMIM);
				          			break;
				          		}
			          		  }
		          		  }*/
		          	  }
		        	  }}).addStyleClass("submitBtn marginTop5");
	   	 
	   	var oFlexApplyRemoveAMIM = new sap.m.FlexBox({
	           items: [
						oBtnInMultipleApplyFilter,
						oLabelSpaceAMIM,
						oBtnInMultipleRemoveFilter
	           ],
	           layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12",linebreak: false, margin: false}),
	           direction : "Row",
				});
	   	 
	   	var oImageAddMIM = new sap.ui.commons.Image("imgAddMIM");
	   	oImageAddMIM.setSrc("images/add_row.png");
	   	oImageAddMIM.setTooltip("Add New Row");
	   	oImageAddMIM.setDecorative(false);
	   	oImageAddMIM.addStyleClass("marginTop20 marginRight5");
	   	
	   	var MaxLimitReachedMessage = "Max row limit of 25 reached. Please submit these rows and then add more unit numbers.";
	   	
	   	var oBtnIMAddNewRow = new sap.ui.commons.Link({
	        text: "Add New Row", 
	        tooltip: "Add New Row",
	        layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: false, margin: true}),
	        press: function() {
	        	var currentArrayLenMIM = aMoveInMultipleAMIM.length;
	        	if(currentArrayLenMIM == 25){
	        		sap.ui.commons.MessageBox.show(MaxLimitReachedMessage,
	                        sap.ui.commons.MessageBox.Icon.WARNING,
	                        "Warning",
	                        [sap.ui.commons.MessageBox.Action.OK], 
	                            sap.ui.commons.MessageBox.Action.OK);
	        	}
	        	else{
	        		aMoveInMultipleAMIM.push({
	        		'checked':false,
                    'serialNo':"",
                    'frmtAMIMYYYYMMDD' : frmtAMIMYYYYMMDD,
                    'retDateVal': "",
                    'retDate': dtTodayAMIMltpl,
                    'retDateVal': "",
                    'auth':"",
                    'statusA':false,
                    'tankDetails': "NA",
                    'unNo': "",
                    'lastClnDate': "",
                    'lastCargoDesc': "",
                    'clnProcDesc': ""
              });
	        		oModelMoveInMultipleAMIM.updateBindings();
	        	  oMoveInMultipleTable.setVisibleRowCount(aMoveInMultipleAMIM.length);
	        	  currentArrayLenMIM = currentArrayLenMIM + 1;
	        	}
          }}).addStyleClass("marginTop25 marginRight");
	   	
	   	/*var oBtnIMAddNewRow = new sap.m.Button("idBtnIMAddNewRow",{
		          text : "Add New Row",
		          width:"115px",
		          type:sap.m.ButtonType.Unstyled,
		          layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: false, margin: true}),
		          press:function(){
		        	  aMoveInMultipleAMIM.push({
		        		  'checked':false,
	                    'serialNo':"",
	                    'retDate': "",
	                    'auth':"",
	                    'statusA':false
                  });
		        	  oModelMoveInMultipleAMIM.updateBindings();
		        	  oMoveInMultipleTable.setVisibleRowCount(aMoveInMultipleAMIM.length);
	          }}).addStyleClass("submitBtn marginTop10");*/
	   	
	   	var oImageDeleteMIM = new sap.ui.commons.Image("imgDeleteMIM");
	   	oImageDeleteMIM.setSrc("images/delete_row.png");
	   	oImageDeleteMIM.setTooltip("Add New Row");
	   	oImageDeleteMIM.setDecorative(false);
	   	oImageDeleteMIM.addStyleClass("marginTop20 marginRight5");
	   	
	   	var oBtnMIMDeleteRow = new sap.ui.commons.Link({
	        text: "Delete Checked Rows", 
	        tooltip: "Delete Checked Rows",
	        layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: false, margin: true}),
	        press: function() {
	        	  arrayLenMIM = aMoveInMultipleAMIM.length;
	        	  var unCheckedCount = 0;
	        	  for(var j=0; j<arrayLenMIM; j++){
	        		  if(aMoveInMultipleAMIM[j].checked == false){
	        			  unCheckedCount++;
	        		  }
	        	  }
	        	  if(unCheckedCount == arrayLenMIM){
	        		  sap.ui.commons.MessageBox.show("Please select atleast 1 row for deletion!",
	                            sap.ui.commons.MessageBox.Icon.WARNING,
	                            "Warning",
	                            [sap.ui.commons.MessageBox.Action.OK],
	                            sap.ui.commons.MessageBox.Action.OK);
	        	  }
	        	  else{
	        	  for(var i=arrayLenMIM-1; i>=0; i--){
	        		  if(aMoveInMultipleAMIM[i].checked){
	        			  aMoveInMultipleAMIM.splice(i,1);
	        			  oModelMoveInMultipleAMIM.updateBindings();
	        			  arrayLenMIM = arrayLenMIM - 1;
	        		  }
	        	  }
	        	  oMoveInMultipleTable.setVisibleRowCount(arrayLenMIM);
	        	  }
	          }}).addStyleClass("marginTop25 marginRight");
	   	
	   	var oFlexInAddDeleteMIM = new sap.m.FlexBox({
	           items: [
						oImageAddMIM,
						oBtnIMAddNewRow,
						oImageDeleteMIM,
						oBtnMIMDeleteRow
	           ],
	           direction : "Row",
				});
	   	
	   	/*var oBtnMIMDeleteRow = new sap.m.Button("idBtnMIMDeleteRow",{
	          text : "Delete Row",
	          width:"115px",
	          type:sap.m.ButtonType.Unstyled,
	          layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: false, margin: true}),
	          press:function(){
	        	  arrayLenMIM = aMoveInMultipleAMIM.length;
	        	  for(var i=arrayLenMIM-1; i>=0; i--){
	        		  if(aMoveInMultipleAMIM[i].checked){
	        			  aMoveInMultipleAMIM.splice(i,1);
	        			  oModelMoveInMultipleAMIM.updateBindings();
	        			  arrayLenMIM = arrayLenMIM - 1;
	        		  }
	        	  }
	        	  oMoveInMultipleTable.setVisibleRowCount(arrayLenMIM);
	          }}).addStyleClass("submitBtn marginTop10");*/
	    
	 // Table
    	var oMoveInMultipleTable = new sap.ui.table.Table("idTblAdMovInMultiplAMIM",{
    		visibleRowCount: 5,
            firstVisibleRow: 3,
            columnHeaderHeight: 40,
            selectionMode: sap.ui.table.SelectionMode.None,
            width:"70%",
            height:"100%"
    	 }).addStyleClass("tblBorder marginTop33");
    	
    	// Table Columns
    	oMoveInMultipleTable.addColumn(new sap.ui.table.Column({
        	template: new sap.ui.commons.CheckBox().bindProperty("checked", "checked"),
        	sortProperty: "checked",
        	filterProperty: "checked",
        	resizable:false,
        	width:"20px",
        	hAlign: "Center"}));
    	
    	var arrEnteredSerNo = [];
    	
    	oMoveInMultipleTable.addColumn(new sap.ui.table.Column({
      		 label: new sap.ui.commons.Label({text: "Serial Number", required: true}),
    		 template: new sap.ui.commons.TextField("idSerNoAMIMInput",{textAlign:"Left",
    			 change: function(){
    				 if(this.getValue() != ""){
    					 this.setValueState(sap.ui.core.ValueState.None);
    				 }
    				 var enteredSerNo = this.getValue();
    				 var count = 0;

                     for(var j=0;j<aMoveInMultipleAMIM.length;j++){
                             if(enteredSerNo == aMoveInMultipleAMIM[j].serialNo){
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
    	
    	sap.ui.getCore().byId("idSerNoAMIMInput").setMaxLength(11);
    	
    	/*var oModelCurrDateAMIM = new sap.ui.model.json.JSONModel();
    	oModelCurrDateAMIM.setData({
	   		dateValue: new Date()
		});*/
    	
    	var oOutDateAMIM = new sap.ui.commons.DatePicker("idOutDateInputAMIM",{
    		width:"120px",
    		//textAlign:"Right",
			  value: {
				  path: "{retDate}",
			  type: new sap.ui.model.type.Date({pattern: "dd-MM-yyyy"})},
			}).bindProperty("yyyymmdd", "frmtAMIMYYYYMMDD").bindProperty("placeholder", "placeHolderDate").bindProperty("valueState", "valuestateDate").addStyleClass("margin5 paddingRight15");
	   	
    	/*var oOutDateAMIM = new sap.ui.commons.DatePicker("idOutDateInputAMIM",{
    		width:"120px",
    		textAlign:"Right",
    		 value: {
				  path: "/dateValue",
			  type: new sap.ui.model.type.Date({pattern: "dd-MM-yyyy"})},
			}).bindProperty("value", "retDate").addStyleClass("margin5 textRight paddingRight15");*/
    	//oOutDateAMIM.setModel(oModelCurrDateAMIM);
    	//oOutDateAMIM.setYyyymmdd("20100101");
    	//oOutDateAMIM.setLocale("en-US"); 
    	
/*    	oOutDateAMIM.attachChange(
                function(oEvent){
                        if(oEvent.getParameter("invalidValue")){
                                oEvent.oSource.setValueState(sap.ui.core.ValueState.Error);
                                oEvent.oSource.setValue("");
                                oEvent.oSource.setPlaceholder("Invalid Value");
                        }else{
                                oEvent.oSource.setValueState(sap.ui.core.ValueState.None);
                                	var editDate = this.getValue();
	              				  	var id = this.sId.replace('idOutDateInputAMIM-col2','idOutDateInputCopyAMIM-col5');
	              				  	var oidTxtVwRetTbl = sap.ui.getCore().byId(id);
	              				  	oidTxtVwRetTbl.setText(editDate);
                        //}
                }
    	);*/
    	
    	oMoveInMultipleTable.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Return Date", required: true}),
			 template: oOutDateAMIM.addStyleClass("borderStyle"),
             sortProperty: "retDate",
             filterProperty: "retDate",
             resizable:false,
             width: "70px",
            // hAlign: sap.ui.commons.layout.HAlign.Right,
			 }));
    	
    	/*oMoveInMultipleTable.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Return Date", required: true, textAlign:"Right"}),
			 template: new sap.ui.commons.TextField("idOutDateInputAMIM",{textAlign:"Right"}).bindProperty("value", "retDate").addStyleClass("borderStyle paddingRight15"),
             resizable:false,
            width: "50px",
            hAlign: sap.ui.commons.layout.HAlign.Right,
			 }));*/
    	
    	oMoveInMultipleTable.addColumn(new sap.ui.table.Column({
    		 label: new sap.ui.commons.Label({text: "Authorisation", required: true}),
    		 template: new sap.ui.commons.TextField("idAuthAMIMInput",{textAlign:"Left",
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
    	
    	oMoveInMultipleTable.addColumn(new sap.ui.table.Column({
    		label: new sap.ui.commons.Label({text: "Status 'A'"}),
        	template: new sap.ui.commons.CheckBox().bindProperty("checked", "statusA"),
        	sortProperty: "statusA",
        	filterProperty: "statusA",
        	resizable:false,
        	width: "40px",
        	hAlign: "Center"}));
    	
    	/*oMoveInMultipleTable.addColumn(new sap.ui.table.Column({
    		template: new sap.ui.commons.TextView("idOutDateInputCopyAMIM",{wrapping:false}).bindProperty("text", "retDate"),
           width:"0px",
           //label: new sap.ui.commons.Label({text: "S"}),
           //visible:false,
           resizable:false
			 }));*/
    	
    	//Create a model and bind the table rows to this model
    	//var oModelMoveInMultipleAMIM = new sap.ui.model.json.JSONModel();
    	//oModelMoveInMultipleAMIM.setData({modelData: aMoveInMultipleAMIM});
    	oMoveInMultipleTable.setModel(oModelMoveInMultipleAMIM);
    	oMoveInMultipleTable.bindRows("/modelData");
    	
    	// Responsive Grid Layout
	    var oAddMoveInMultipleLayout = new sap.ui.layout.form.ResponsiveGridLayout("idAddMoveInMultipleLayout",{
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
	     var oAddMoveInMultipleForm = new sap.ui.layout.form.Form("idAddMoveINMultipleForm",{
	             layout: oAddMoveInMultipleLayout,
	             formContainers: [
	                     
	                     new sap.ui.layout.form.FormContainer("idAddMoveInMultipleFormC1",{
	                             //title: "Add Movement In - Multiple",
                             formElements: [
												new sap.ui.layout.form.FormElement({
												    fields: [oLabelDepotInMultiple, oComboDepotAMIM, oInputDepotInMultipleAMIM,oFlexApplyRemoveAMIM]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oAddInExcelContainer]
												}),
												//new sap.ui.layout.form.FormElement({
												//    fields: [oFlexInAddDeleteMIM]
												//}),
												new sap.ui.layout.form.FormElement({
												    fields: [oFlexInsertValidateAMIM]
												}),
												//new sap.ui.layout.form.FormElement({
												//    fields: [oLabelMandatoryInMultiple]
												//})
	                                     ]
	                     }),
	                    /* new sap.ui.layout.form.FormContainer("idAddMoveInMultipleFormC2",{
                         formElements: [
											new sap.ui.layout.form.FormElement({
											    fields: [oFlexApplyRemoveAMIM]
											})
                                     ]
                     })*/
	             ]
	     });
	     
/*	  // Responsive Grid Layout
		    var oAddMoveInMultipleLayout2 = new sap.ui.layout.form.ResponsiveGridLayout("idAddMoveInMultipleLayout2",{
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
		     var oAddMoveInMultipleForm2 = new sap.ui.layout.form.Form("idAddMoveINMultipleForm2",{
		             layout: oAddMoveInMultipleLayout2,
		             formContainers: [
		                     
		                     new sap.ui.layout.form.FormContainer("idAddMoveInMultipleForm2C1",{
		                             //title: "Add Movement In - Multiple",
	                             formElements: [
													new sap.ui.layout.form.FormElement({
													    fields: [oMoveInMultipleTable]
													}),
													new sap.ui.layout.form.FormElement({
													    fields: [oFlexInAddDeleteMIM]
													}),
													new sap.ui.layout.form.FormElement({
													    fields: [oBtnInMultipleContinue]
													}),
													new sap.ui.layout.form.FormElement({
													    fields: [oLabelMandatoryInMultiple]
													})
		                                     ]
		                     }),
		                     new sap.ui.layout.form.FormContainer("idAddMoveInMultipleForm2C2",{
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
							oAddMoveInMultipleForm,
							//oMoveInMultipleTable,
							oAddMoveInMultipleForm2,
		           ],
		           direction : "Column",
					});
		     */
	     	return oAddMoveInMultipleForm;
	   	
	},
	
	populateDepotNameAMIM: function(){
		busyDialog.open();
		currentDateAMIM = dateFormat(new Date(),'dd-mm-yyyy');
		for(var i=0;i<aMoveInMultipleAMIM.length;i++){
			aMoveInMultipleAMIM[i].retDate = currentDateAMIM;
		}
		for(var i=0;i<unitsTankTypeAMIM.length;i++){
			unitsTankTypeAMIM[i].lastCleanDate = currentDateAMIM;
		}
		oModel = new sap.ui.model.odata.ODataModel(serviceUrl15, true);
		var urlToCallAMIMDep = serviceUrl15 + "/F4_Functional_Location";
		//alert("urlToCallAMIMDep : "+urlToCallAMIMDep);
		OData.request({ 
		      requestUri: urlToCallAMIMDep,
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
		    		depotNameListAMIM[i] = data.results[i].FunctionalLoc;
				}
		    	$("#idComboDepotAMIM").autocomplete({
		    	      source: depotNameListAMIM,
		    	      minLength: 0,
		    	      /*select: function(){
		    	    	  flagOnChangeDepotNameAMIM = true;
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
		    			/*var keyAMIM = this.value;
					    var partsAMIM = keyAMIM.split(" ");
					    var lastPartAMIM = partsAMIM[partsAMIM.length - 2];
					    oInputDepotInMultipleAMIM.setValue(lastPartAMIM);*/
			     })
		    	.keyup(function() {
		    	    var isValid = false;
		    	    var previousValue = "";
		    	    for (i in depotNameListAMIM) {
		    	        if (depotNameListAMIM[i].toLowerCase().match(this.value.toLowerCase())) {
		    	            isValid = true;
		    	        }
		    	    }
		    	    if (!isValid) {
		    	        this.value = previousValue;
		    	    } else {
		    	        previousValue = this.value;
		    	    }
		    	});
		    	loggedInUserTypeAMIM = objLoginUser.getLoggedInUserType();
		    	//alert("loggedInUserTypeAMIM : "+loggedInUserTypeAMIM);
				if(loggedInUserTypeAMIM == "SEACO"){
					$("#idComboDepotAMIM").removeAttr('disabled');
					$("#idComboDepotAMIM").attr("disabled","disabled");
					sap.ui.getCore().byId("idBtnInMultipleRemoveFilterAMIM").setEnabled(false);
					sap.ui.getCore().byId("idBtnInMultipleApplyFilterAMIM").setEnabled(true);
					sap.ui.getCore().byId("idDepotInputFieldAMIM").setEnabled(true);
				}
				else{
					var DepotCode = objLoginUser.getLoggedInUserID();
					//alert("DepotCode : "+DepotCode);
					for(var i=0;i<depotNameListAMIM.length;i++){
						if(depotNameListAMIM[i].substring(11,15) == DepotCode)
							DepotCode = depotNameListAMIM[i];
					}
					$("#idComboDepotAMIM").attr("disabled","disabled");
					$("#idComboDepotAMIM").val(DepotCode);
					var depotAMIM = document.getElementById("idComboDepotAMIM").value.split("-");
					sap.ui.getCore().byId("idDepotInputFieldAMIM").setValue(depotAMIM[3]);
					sap.ui.getCore().byId("idBtnInMultipleRemoveFilterAMIM").setEnabled(false);
					sap.ui.getCore().byId("idBtnInMultipleApplyFilterAMIM").setEnabled(false);
					sap.ui.getCore().byId("idDepotInputFieldAMIM").setEnabled(false);
				}



		    	busyDialog.close();
		    },
		    function(err){
		    	 errorfromServer(err);
		    	//alert("Error while Reading Result : "+ : window.JSON.stringify(err.response));
		    });
	},
	
	validateMoveInMultiple: function(){
		var oCurrAMIM = this;
		vInputDepotInMultipleValAMIM = oInputDepotInMultipleAMIM.getValue();
		vInputDepotListAMIM = document.getElementById("idComboDepotAMIM").value;
		var isValid = true;
  	  if(vInputDepotListAMIM ==""){
  		document.getElementById("idComboDepotAMIM").style.borderColor = "red";
		document.getElementById("idComboDepotAMIM").style.background = "#FAD4D4";
		$("#idComboDepotAMIM").attr("placeholder","Required");
		isValid = false;
  	  }
	  	if(vInputDepotListAMIM.trim().length > 0){
			var match = jQuery.inArray(vInputDepotListAMIM,depotNameListAMIM);
			if(match < 0){
				document.getElementById("idComboDepotAMIM").style.borderColor = "red";
	    		document.getElementById("idComboDepotAMIM").style.background = "#FAD4D4";
	    		document.getElementById("idComboDepotAMIM").value = "";
	    		document.getElementById("idComboDepotAMIM").placeholder = "Invalid Depot";
	    		isValid = false;
			}
			else{
				document.getElementById("idComboDepotAMIM").style.borderColor = "#cccccc";
	    		document.getElementById("idComboDepotAMIM").style.background = "#ffffff";
	    		document.getElementById("idComboDepotAMIM").placeholder = "Depot";
	    		isValid = true;
			}
		}
  	  if(isValid){
  		//oInputDepotInMultipleAMIM.setValueState(sap.ui.core.ValueState.None);
  		document.getElementById("idComboDepotAMIM").style.borderColor = "#cccccc";
		document.getElementById("idComboDepotAMIM").style.background = "#ffffff";
  		oCurrAMIM.continueAMIM();
  	  }
	},
	
	continueAMIM: function(){
//		busyDialog.open();
		var oCurrent = this;
		
//		 var bus = sap.ui.getCore().getEventBus();
//	  	  	bus.publish("nav", "to", {
//	        id : "ValidateMoveInMultiple"
//  	  	 });
//	  	 var oObjValidateMoveInMultiple = new validateMoveInMultipleView();
//	  	 oObjValidateMoveInMultiple.updateBindingValidateAMIM();
		
		var tempDateArray = [];
		var cleanDateArray = "";
		var tempDate = "";
		var cleanDate = "";
		var j = 0;
		jsonMoveInToValidateEntries.length = 0;
		var datainsert = false;
		for(var i =0; i < excelDataAddIn.length;i++){
			j = 0;
			datainsert = true;
 			while(j<3){
 				if(excelDataAddIn[i][j] == "" || excelDataAddIn[i][j] == null){
 					datainsert = false;
 					break;
 				}
 				j++;
 			}
 			if(datainsert){
 				if(excelDataAddIn[i][1] != ""){
 				tempDateArray = excelDataAddIn[i][1].split('/');
 				tempDate = tempDateArray[2] + tempDateArray[1] +tempDateArray[0];
 				}else{
 				tempDate = "";	
 				}
 				
 				if(excelDataAddIn[i][5] != ""){
 					cleanDateArray = excelDataAddIn[i][5].split('/');
 					cleanDate = cleanDateArray[2] + cleanDateArray[1] +cleanDateArray[0];
 				}else{
 					cleanDate = "";	
 				}
 				
 				jsonMoveInToValidateEntries.push({
 					"Serial":excelDataAddIn[i][0].toUpperCase(),
 					"Date":tempDate,
 					"Return":excelDataAddIn[i][2],
 					"Avlb": (excelDataAddIn[i][3] == 'Yes')?'A':'',
 					"Unno": excelDataAddIn[i][4],
 					"Lastclean": cleanDate,
 					"Lastcargo": excelDataAddIn[i][6],
 					"Cargodesc": excelDataAddIn[i][7]
 				});
 			}
 		}
		
		if(jsonMoveInToValidateEntries.length == 0){
			sap.ui.commons.MessageBox.alert("Enter at least one entry!" );
			return;
		}else{
			oCurrent.sendToSapForMoveInValidationNew();
		}
		
	  	
	},
	
	sendToSapForMoveInValidationNew : function(){
		
		var enableConfirm = true;
		jsonMoveInToSubmitEntries = [];
		var jsonMoveInToValidateEntriesLength = jsonMoveInToValidateEntries.length;
		var depot = selectedDepotToPassCodeAMIM;
		var stringToPass = "";
		var stringCount = 1;
		var selDepValAMIM = document.getElementById("idComboDepotAMIM").value;
		var partsDepAMIM = selDepValAMIM.split("-");
		selectedDepotToPassAMIM = partsDepAMIM[0] + "-" + partsDepAMIM[1] + "-" + partsDepAMIM[2] + "-" + partsDepAMIM[3];
		if(jsonMoveInToValidateEntriesLength == 0)
			sap.ui.commons.MessageBox.alert("No data to submit");
		else{
			for(var i =0; i < jsonMoveInToValidateEntriesLength; i++){
				if(stringToPass == ""){
					stringToPass = stringToPass + "Igatein" + stringCount + " eq '" + jsonMoveInToValidateEntries[i].Serial + "$" + 
					selectedDepotToPassAMIM + "$" + 
					depot + "$" + 
					jsonMoveInToValidateEntries[i].Return + "$" + 
					jsonMoveInToValidateEntries[i].Date + "$" + 
					jsonMoveInToValidateEntries[i].Unno + "$" + 
					jsonMoveInToValidateEntries[i].Lastclean + "$" + 
					jsonMoveInToValidateEntries[i].Lastcargo + "$" + 
					jsonMoveInToValidateEntries[i].Cargodesc + "$" + 
					jsonMoveInToValidateEntries[i].Avlb + "'";
				}
				else{
					stringToPass = stringToPass + " and Igatein" + stringCount + " eq '" + jsonMoveInToValidateEntries[i].Serial + "$" + 
					selectedDepotToPassAMIM + "$" + 
					depot + "$" + 
					jsonMoveInToValidateEntries[i].Return + "$" + 
					jsonMoveInToValidateEntries[i].Date + "$" + 
					jsonMoveInToValidateEntries[i].Unno + "$" + 
					jsonMoveInToValidateEntries[i].Lastclean + "$" + 
					jsonMoveInToValidateEntries[i].Lastcargo + "$" + 
					jsonMoveInToValidateEntries[i].Cargodesc + "$" + 
					jsonMoveInToValidateEntries[i].Avlb + "'";
				}
				stringCount++;
				}
			
//			if(stringToPass != ""){
//				stringToPass = stringToPass + " and Validate eq '" + validate + "' and Depotin eq '" + depot + "'";
//				
//			}
		}

		
		
		oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
		var urlToCallSAMIM = serviceUrlMove + "/movein_validnSet?$filter=" + stringToPass;
		busyDialog.open();
		console.log(urlToCallSAMIM);
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
		    		 sap.ui.commons.MessageBox.alert("Nothing Returned after validation!");
		    	}
		    	else{
		    		busyDialog.close();
		    		var validatedJSON = data.results;
		    		var validatedJSONLength = validatedJSON.length;
		        	if(validatedJSONLength > 0){// && data.__batchResponses[0].statusText == "OK"){
		        		//jsonReturnEntry = data.__batchResponses[0].data.results[0];
		        		jsonMoveInToSubmitEntries = [];
		        		var date = "";
		        		for(var i=0; i<validatedJSONLength; i++){	
		        		date = data.results[i].Igatein1.split('$')[4];
		        		if(date != "" && date != undefined)
		        			date = date.substr(6,2) + '-' + date.substr(4,2) + '-' + date.substr(0,4);
		        		
		        		jsonMoveInToSubmitEntries.push({
		        				"isChecked": false,
		        				"Status": (data.results[i].Status != "FAIL")? "Success" : "Error",
		        				"Enabled": (data.results[i].Status != "FAIL")? false : true,
		        				"upEnabled": (data.results[i].Status != "FAIL")? true : false,
		        				"Serial":data.results[i].Equipment,
		        				"Floc":data.results[i].Igatein1.split('$')[1],
		        				"Depot":data.results[i].Igatein1.split('$')[2],
		        				"Return":data.results[i].Igatein1.split('$')[3],
		        				"Date":date,
		        				"Unno":data.results[i].Igatein1.split('$')[5],
		        				"Lastclean":data.results[i].Igatein1.split('$')[6],
		        				"Lastcargo":data.results[i].Igatein1.split('$')[7],
		        				"Cargodesc":data.results[i].Igatein1.split('$')[8],
		        				"Avlb":(data.results[i].Igatein1.split('$')[9] != "A")? "No":"Yes",
		        				"Message":(data.results[i].Status != "FAIL")? "Success" : data.results[i].Message,
		        			});
		        			
		        		if(enableConfirm && data.results[i].LvOstatus == "FAIL"){
		        			enableConfirm = false;
		        		}
		        		}
		        		
		        		var bus = sap.ui.getCore().getEventBus();
					  	  	bus.publish("nav", "to", {
					        id : "ValidateMoveInMultipleNew"
				  	  	});
				  	  	
//					  	  var oObjValidateMoveInMultipleNew = new validateMoveInMultipleViewNew();
//					  	  oObjValidateMoveInMultipleNew.updateBindingValidateAMIM();
				  	
		        		var oMdlMoveInValidation = new sap.ui.model.json.JSONModel();
		        		oMdlMoveInValidation.setData({modelData : jsonMoveInToSubmitEntries});
		        		sap.ui.getCore().byId("idMoveInMultStatusTable").setModel(oMdlMoveInValidation);
		        		sap.ui.getCore().byId("idMoveInMultStatusTable").setVisible(true);	
		        		sap.ui.getCore().byId("idMoveInMultStatusTable").setWidth("100%");
		        		sap.ui.getCore().byId("idMoveInMultStatusTable").setHeaderText("Gate In Validation - Result");
		        		sap.ui.getCore().byId("idMoveInMultButtonConfirm").setEnabled(enableConfirm);
		        		sap.ui.getCore().byId("idMoveInMultStatusTableColCheckbox").setVisible(false);	
		        		sap.ui.getCore().byId("idMoveInMultStatusTableColDate").setVisible(true);	
		        		sap.ui.getCore().byId("idMoveInMultStatusTableColReturn").setVisible(true);	
		        		sap.ui.getCore().byId("idMoveInMultStatusTableColAvail").setVisible(true);
		        		sap.ui.getCore().byId("idMoveInMultStatusTableColUnno").setVisible(false);
		        		sap.ui.getCore().byId("idMoveInMultStatusTableColLclean").setVisible(false);
		        		sap.ui.getCore().byId("idMoveInMultStatusTableColLcargo").setVisible(false);
		        		sap.ui.getCore().byId("idMoveInMultStatusTableColCdesc").setVisible(false);

		        		sap.ui.getCore().byId("idMoveInMultButtonConfirm").setVisible(true);	
		        		sap.ui.getCore().byId("idMoveInMultButtonRemove").setVisible(true);
		        		sap.ui.getCore().byId("idMoveInMultButtonConfirm").setEnabled(enableConfirm);	
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

	resetAddMoveInMultipleNew : function(){
		loggedInUserTypeAMIM = objLoginUser.getLoggedInUserType();
		if(sap.ui.getCore().byId("idBtnInMultipleRemoveFilterAMIM")){
        	sap.ui.getCore().byId("idBtnInMultipleRemoveFilterAMIM").setEnabled(false);
        }
        
        if(loggedInUserTypeAMIM == "SEACO"){
               
               $("#idComboDepotAMIM").val("");
               sap.ui.getCore().byId("idDepotInputFieldAMIM").setValue("");
               
               if(document.getElementById("idComboDepotAMIM")){
	                document.getElementById("idComboDepotAMIM").style.borderColor = "#cccccc";
		    		document.getElementById("idComboDepotAMIM").style.background = "#ffffff";
		    		document.getElementById("idComboDepotAMIM").placeholder = "Select Depot";
               }
               if(sap.ui.getCore().byId("idBtnInMultipleRemoveFilterAMIM")){
            	   sap.ui.getCore().byId("idBtnInMultipleRemoveFilterAMIM").setEnabled(false);
               }
        }
        
        if(oExcelGridAddIn != undefined){
        	
        	excelDataAddIn = [
                  			["","","","No", "","","",""],  
                  			["","","","No", "","","",""], 
                  			["","","","No", "","","",""], 
                  			["","","","No", "","","",""], 
                  			["","","","No", "","","",""]
                  	 		];
        	
        	oExcelGridAddIn.loadData(excelDataAddIn);
        	
        	/*excelDataAddIn = [
                    			["","","","No", "","","",""],  
                    			["","","","No", "","","",""], 
                    			["","","","No", "","","",""], 
                    			["","","","No", "","","",""], 
                    			["","","","No", "","","",""]
                    	 		]; 
        	var avlbDd = [	  "No", 
    		              	  "Yes"
    		             ];
        	
        	var container = document.getElementById('idAddInExcel');
  		  oExcelGridAddIn = new Handsontable(container, {  
  	           data : excelDataAddIn,  //binding the model
  	           	//minSpareRows: 1,
  	           	height: 150,
  	           	//minRows: 5,
  	           	maxRows: 5,
  	           	rowHeaders: true,
  	           	colHeaders: true,
  	           	colHeaders: ["Serial Number", // 0
  	           	             "Gate-In Date", // 1			     	            	             
  	           	             "Return Authorisation",  // 2
  	           	             "Avlb", // 3
  	           	             "UN No.", // 4
  	           	             "Last Clean Date", // 5			     	            	             
  	           	             "Last Cargo Desc",  // 6
  	           	             "Cleaning Process Desc" // 7
  	           	             ],   
  	           	    contextMenu: false,
  					columns: [
  					  {

  					  },
  					  {
  						type: 'date',
  				        dateFormat: 'DD/MM/YYYY',
  				        correctFormat: true,
  					  },
  					  {

  					  },
  					  {
   						  type: 'dropdown',
   						  source: avlbDd,
   						  //width: 160,
   						  //strict: true
   					  },
   					  {

  					  },
   					  {
  						type: 'date',
  				        dateFormat: 'DD/MM/YYYY',
  				        correctFormat: true,
   					   },
   					  {

  					  },
  					  {

  					  }
  					  ],
  	           	//rowHeaders: true,
//  	           	manualColumnResize:true,
//  	           	autoColumnSize: {    
//  	           	    "samplingRatio": 23
//  	           	},
  	       });*/ 
              
        }
        
	},
	
	resetAMIM: function(){
        
        loggedInUserTypeAMIM = objLoginUser.getLoggedInUserType();
        oModelMoveInMultipleAMIM.setData({modelData: []});
        
        if(sap.ui.getCore().byId("idBtnInMultipleRemoveFilterAMIM")){
        	sap.ui.getCore().byId("idBtnInMultipleRemoveFilterAMIM").setEnabled(false);
        }
        
        if(loggedInUserTypeAMIM == "SEACO"){
               
               $("#idComboDepotAMIM").val("");
               sap.ui.getCore().byId("idDepotInputFieldAMIM").setValue("");
               
               if(document.getElementById("idComboDepotAMIM")){
	                document.getElementById("idComboDepotAMIM").style.borderColor = "#cccccc";
		    		document.getElementById("idComboDepotAMIM").style.background = "#ffffff";
		    		document.getElementById("idComboDepotAMIM").placeholder = "Select Depot";
               }
               if(sap.ui.getCore().byId("idBtnInMultipleRemoveFilterAMIM")){
            	   sap.ui.getCore().byId("idBtnInMultipleRemoveFilterAMIM").setEnabled(false);
               }
        }
        
        aMoveInMultipleAMIM = [];
        unitsTankTypeAMIM = [];
        
        aMoveInMultipleAMIM.push({checked: false, serialNo: "", frmtAMIMYYYYMMDD: frmtAMIMYYYYMMDD, retDateVal: "", retDate: dtTodayAMIMltpl, auth: "", statusA: false, tankDetails: "NA", unNo: "", lastClnDate: "", lastCargoDesc: "", clnProcDesc: "", placeHolderSrno: "", placeHolderAuth: "", placeHolderDate: "", valuestateSrno:sap.ui.core.ValueState.None, valuestateAuth:sap.ui.core.ValueState.None, valuestateDate:sap.ui.core.ValueState.None});
        aMoveInMultipleAMIM.push({checked: false, serialNo: "", frmtAMIMYYYYMMDD: frmtAMIMYYYYMMDD, retDateVal: "", retDate: dtTodayAMIMltpl, auth: "", statusA: false, tankDetails: "NA", unNo: "", lastClnDate: "", lastCargoDesc: "", clnProcDesc: "", placeHolderSrno: "", placeHolderAuth: "", placeHolderDate: "", valuestateSrno:sap.ui.core.ValueState.None, valuestateAuth:sap.ui.core.ValueState.None, valuestateDate:sap.ui.core.ValueState.None});
        aMoveInMultipleAMIM.push({checked: false, serialNo: "", frmtAMIMYYYYMMDD: frmtAMIMYYYYMMDD, retDateVal: "", retDate: dtTodayAMIMltpl, auth: "", statusA: false, tankDetails: "NA", unNo: "", lastClnDate: "", lastCargoDesc: "", clnProcDesc: "", placeHolderSrno: "", placeHolderAuth: "", placeHolderDate: "", valuestateSrno:sap.ui.core.ValueState.None, valuestateAuth:sap.ui.core.ValueState.None, valuestateDate:sap.ui.core.ValueState.None});
        aMoveInMultipleAMIM.push({checked: false, serialNo: "", frmtAMIMYYYYMMDD: frmtAMIMYYYYMMDD, retDateVal: "", retDate: dtTodayAMIMltpl, auth: "", statusA: false, tankDetails: "NA", unNo: "", lastClnDate: "", lastCargoDesc: "", clnProcDesc: "", placeHolderSrno: "", placeHolderAuth: "", placeHolderDate: "", valuestateSrno:sap.ui.core.ValueState.None, valuestateAuth:sap.ui.core.ValueState.None, valuestateDate:sap.ui.core.ValueState.None});
        aMoveInMultipleAMIM.push({checked: false, serialNo: "", frmtAMIMYYYYMMDD: frmtAMIMYYYYMMDD, retDateVal: "", retDate: dtTodayAMIMltpl, auth: "", statusA: false, tankDetails: "NA", unNo: "", lastClnDate: "", lastCargoDesc: "", clnProcDesc: "", placeHolderSrno: "", placeHolderAuth: "", placeHolderDate: "", valuestateSrno:sap.ui.core.ValueState.None, valuestateAuth:sap.ui.core.ValueState.None, valuestateDate:sap.ui.core.ValueState.None});
        
        oModelMoveInMultipleAMIM.setData({modelData: aMoveInMultipleAMIM});
        sap.ui.getCore().byId("idTblAdMovInMultiplAMIM").setModel(oModelMoveInMultipleAMIM);
        sap.ui.getCore().byId("idTblAdMovInMultiplAMIM").bindRows("/modelData");
        
        sap.ui.getCore().byId("idTblAdMovInMultiplAMIM").setVisibleRowCount(5);
 }

});
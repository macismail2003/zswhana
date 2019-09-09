/******** NP *******/
jQuery.sap.require("sap.ui.model.json.JSONModel");
var objcurntCMDt;
var objUtilCMDt = new utility();

sap.ui.model.json.JSONModel.extend("correctMovemntDateView", {
createCorrectMovemntDate: function(){
		objcurntCMDt = new correctMovemntDateView();
		var depotEnabled = false, depotId = '';
		if(objLoginUser.getLoggedInUserType() == "SEACO"){
			depotEnabled = true;
		}else{
			depotId = objLoginUser.getLoggedInUserID();
		}
		// Responsive Grid Layout
			    var oCorrMoveDateLayout = new sap.ui.layout.form.ResponsiveGridLayout({
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
   	 
		// Labels
		var oLabelDepotCMD = new sap.ui.commons.Label({text: "Depot:",
			required: true,
			layoutData: new sap.ui.layout.GridData({span: "L2 M2 S8",linebreak: false, margin: true}),
            wrapping: true}).addStyleClass("marginTop15");
		
		var oLabelMoveTypeCMD = new sap.ui.commons.Label({text: "Movement Type:",
			layoutData: new sap.ui.layout.GridData({span: "L2 M2 S8",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("marginTop15");
		
		var oLabelSerialNoCMD = new sap.ui.commons.Label({text: "Serial Number:",
			required: true,
			layoutData: new sap.ui.layout.GridData({span: "L2 M2 S8",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("marginTop15");
		
		var oLabelOrgnlDateCMD = new sap.ui.commons.Label({text: "Original Date:",
			required: true,
			layoutData: new sap.ui.layout.GridData({span: "L2 M2 S8",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("marginTop15");
		
		var oLabelCorrDateCMD = new sap.ui.commons.Label({text: "Corrected Date:",
			required: true,
			layoutData: new sap.ui.layout.GridData({span: "L2 M2 S8",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("marginTop15");
		
		var oLabelAuthCMD = new sap.ui.commons.Label({text: "Authorisation:",
			required: true,
			layoutData: new sap.ui.layout.GridData({span: "L2 M2 S8",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("marginTop15");
		
		var oLabelMandatoryCMD = new sap.ui.commons.Label({text: "Mandatory Field",
			required: true,
			requiredAtBegin : true,
            wrapping: true}).addStyleClass("margin10 marginTopBot30");
		
		// Depot Drop-down
		var oComboDepotCMD = new sap.ui.commons.ComboBox("idComboDepotCMDt", { 
			  layoutData: new sap.ui.layout.GridData({span: "L4 M6 S12"}),
			  width:"100%",
			  //enabled: depotEnabled,
			  editable: false,
			  showListExpander: false,
			  placeholder: "Select Depot",
	          displaySecondaryValues:false,
	          change: function(evnt){
				if(this.getValue() != '')
				{
					this.setValueState(sap.ui.core.ValueState.None);
					this.setPlaceholder("Select Depot");
					//sap.ui.getCore().byId("idBtnRemoveFilterCMDt").setEnabled(true);
				}else{
					//sap.ui.getCore().byId("idBtnRemoveFilterCMDt").setEnabled(false);
				}
	        	//sap.ui.getCore().byId("idTFDepotCMDt").setValue(this.getSelectedKey());
	          },
			afterClearText: function(evnt){
				//if(this.clearedValueBool == true)
					sap.ui.getCore().byId("idTFDepotCMDt").setValue('');
					sap.ui.getCore().byId("idBtnRemoveFilterCMDt").setEnabled(false);
			}
		}).addStyleClass("FormInputStyle marginTop10 DepotInput38px");
	    
	    // Movement Type Drop-down
	    var oComboMoveTypeCMD = new sap.ui.commons.DropdownBox("idComboMoveTypeCMD", { 
			  layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12"}),
			  width:"100%",
	          displaySecondaryValues:false,
			  placeholder: "Select Movement Type",			  
			  change: function(evnt){
				if(this.getValue() != '')
				{
					this.setValueState(sap.ui.core.ValueState.None);
					this.setPlaceholder("Select Movement Type");
				}
	          },
		}).addStyleClass("FormInputStyle marginTop7 DepotInput38px");
				
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setData({data:[
			{text:"", key:""},
			{text:"GATEIN", key:"GATEIN"},
			{text:"GATOUT", key:"GATOUT"}]
		});
		oComboMoveTypeCMD.setModel(oModel);
		oComboMoveTypeCMD.bindItems("/data",new sap.ui.core.ListItem({text: "{text}",key:"{key}"}));
		
	 // Text Field
    	var oInputDepotCMD = new sap.ui.commons.TextField('idTFDepotCMDt',{
    		placeholder: "Depot Code",
			//value: depotId,
			//width:"85%",
			enabled: depotEnabled,
    		layoutData: new sap.ui.layout.GridData({span: "L1 M1 S8",linebreak: false, margin: true}),
    	}).addStyleClass("FormInputStyle marginTop10 DepotInput38px");
    	
		oInputDepotCMD.onfocusin =  function(e) {  
				this.setValueState(sap.ui.core.ValueState.None);
				this.setPlaceholder("Depot Code");                          
		      };
			  
    	var oInputSerialNoCMD = new sap.ui.commons.TextField('idSerailNoCMDt',{
    		placeholder: "Serial Number",
    		layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12"}),
    	}).addStyleClass("FormInputStyle marginTop7 DepotInput38px");
    	
		oInputSerialNoCMD.onfocusin =  function(e) {  
				this.setValueState(sap.ui.core.ValueState.None);
				this.setPlaceholder("Serial Number");                          
		      };
		
		      var oModelOriginalDateCMD = new sap.ui.model.json.JSONModel();
		      oModelOriginalDateCMD.setData({dateValue: new Date()});
		      
		      var oModelCorrectedDateCMDt = new sap.ui.model.json.JSONModel();
		      oModelCorrectedDateCMDt.setData({dateValue: new Date()});
		      
				
    	var oInputOriginalDateCMD = new sap.ui.commons.DatePicker('idOriginalDateCMDt',{
    		placeholder: "Original Date",
    		value: {
                path: "/dateValue",
                type: new sap.ui.model.type.Date({pattern: "dd-MM-yyyy"})
    			},
				change: function(oEvent){
					if(oEvent.getParameter("invalidValue")){
						oEvent.oSource.setValueState(sap.ui.core.ValueState.Error);
						oEvent.oSource.setValue("");
						oEvent.oSource.setPlaceholder("Invalid Value");
					}
					if(oEvent.oSource.getValue() != ''){
						oEvent.oSource.setValueState(sap.ui.core.ValueState.None);
						oEvent.oSource.setPlaceholder("Original Date");
					}
				},
    			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12"}),
    	});
    	//oInputDate.setYyyymmdd("20100101");
    	oInputOriginalDateCMD.addStyleClass("FormInputStyle marginTop7 DepotInput38px");
    	oInputOriginalDateCMD.setLocale("en-US");
    	oInputOriginalDateCMD.setModel(oModelOriginalDateCMD);
    	
    	var oInputCorrectedDateCMD = new sap.ui.commons.DatePicker('idCorrectedDateCMDt',{
    		placeholder: "Corrected Date",
    		value: {
                path: "/dateValue",
                type: new sap.ui.model.type.Date({pattern: "dd-MM-yyyy"})
    			},
				change: function(oEvent){
					if(oEvent.getParameter("invalidValue")){
						oEvent.oSource.setValueState(sap.ui.core.ValueState.Error);
						oEvent.oSource.setValue("");
						oEvent.oSource.setPlaceholder("Invalid Value");
						return;
					}
					if(oEvent.oSource.getValue() != ''){
						function isFutureDate(idate){
						    var today = new Date().getTime(),
						        idate = idate.split("-");

						    idate = new Date(idate[2], idate[1] - 1, idate[0]).getTime();
						    return (today - idate) < 0 ? true : false;
						}
						
						if(isFutureDate(oEvent.oSource.getValue())){
							oEvent.oSource.setValueState(sap.ui.core.ValueState.Error);
							oEvent.oSource.setValue("");
							oEvent.oSource.setPlaceholder("Invalid Value");
							sap.ui.commons.MessageBox.alert("Movement date cannot be in future.");
							return;
						}
						oEvent.oSource.setValueState(sap.ui.core.ValueState.None);
						oEvent.oSource.setPlaceholder("Corrected Date");
						
					}
				},
    			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12"}),
    	});
    	//oInputDate.setYyyymmdd("20100101");
    	oInputCorrectedDateCMD.addStyleClass("FormInputStyle marginTop7 DepotInput38px");
    	oInputCorrectedDateCMD.setLocale("en-US");
    	oInputCorrectedDateCMD.setModel(oModelCorrectedDateCMDt);
    	
    	 var oInputAuthCMD = new sap.ui.commons.TextField('idAuthNoCMDt',{
			placeholder: "Authorisation",
    		layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12"}),
    	}).addStyleClass("FormInputStyle marginTop7 DepotInput38px");
    	oInputAuthCMD.onfocusin =  function(e) {  
				this.setValueState(sap.ui.core.ValueState.None);
				this.setPlaceholder("Authorisation");                          
		      };
    	// Buttons
	   	var oBtnCorrMovDtSubmitCMD = new sap.m.Button("idBtnAddMoveSubmitCMD",{
			  text : "Submit",
			  width:"80px",
			  styled:false,
			  //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: true}),
			  press:function(){
				objcurntCMDt.OnlinefunDataSubmit();
		}}).addStyleClass("submitBtn");
	   	
		function fnResetCallbackMsgBox(sResult){
				//alert("sResult" + sResult);
				if(sResult == "YES"){
					var idComboDepotCMDt = sap.ui.getCore().byId("idComboDepotCMDt");
					var idTFDepotCMDt = sap.ui.getCore().byId("idTFDepotCMDt");
					var idComboMoveTypeCMD = sap.ui.getCore().byId("idComboMoveTypeCMD");
					var idSerailNoCMDt = sap.ui.getCore().byId("idSerailNoCMDt");
					var idOriginalDateCMDt = sap.ui.getCore().byId("idOriginalDateCMDt");
					var idCorrectedDateCMDt = sap.ui.getCore().byId("idCorrectedDateCMDt");
					var idAuthNoCMDt = sap.ui.getCore().byId("idAuthNoCMDt");
					sap.ui.getCore().byId("idBtnRemoveFilterCMDt").setEnabled(false);

					idComboDepotCMDt.setValueState(sap.ui.core.ValueState.None);
					idComboDepotCMDt.setPlaceholder("Select Depot");
					idTFDepotCMDt.setValueState(sap.ui.core.ValueState.None);
					idTFDepotCMDt.setPlaceholder("Depot Code");
					
					if(depotEnabled){
						idComboDepotCMDt.setValue('');
						idTFDepotCMDt.setValue('');
					}
					
					idComboMoveTypeCMD.setValue('');
					idComboMoveTypeCMD.setValueState(sap.ui.core.ValueState.None);
					idComboMoveTypeCMD.setPlaceholder("Select Movement Type");
				
					idSerailNoCMDt.setValue('');
					idSerailNoCMDt.setValueState(sap.ui.core.ValueState.None);
					idSerailNoCMDt.setPlaceholder("Serial Number");
					
					idOriginalDateCMDt.setValue('');
					idOriginalDateCMDt.setValueState(sap.ui.core.ValueState.None);
					idOriginalDateCMDt.setPlaceholder("Original Date");
				
					idCorrectedDateCMDt.setValue('');
					idCorrectedDateCMDt.setValueState(sap.ui.core.ValueState.None);
					idCorrectedDateCMDt.setPlaceholder("Corrected Date");
					
					idAuthNoCMDt.setValue('');
					idAuthNoCMDt.setValueState(sap.ui.core.ValueState.None);
					idAuthNoCMDt.setPlaceholder("Authorisation");
					
					sap.ui.getCore().byId("idFrmElemntErrorCMDt").destroyFields();
					sap.ui.getCore().byId("idFrmElemntSuccessCMDt").destroyFields();
				}
			};
		var ResetMessage = "This will clear the screen content.\n Do you want to continue?";
		var oBtnResetCMDt = new sap.m.Button("idBtnResetCMDt",{
			text : "Reset",
			width:"80px",
			styled:false,
			visible:false,
			//layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
			press:function(){
						sap.ui.commons.MessageBox.show(ResetMessage,sap.ui.commons.MessageBox.Icon.WARNING,"Warning",
						[sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO],
						fnResetCallbackMsgBox, sap.ui.commons.MessageBox.Action.YES);
		}}).addStyleClass("submitBtn");
			  
	   	var oBtnCorrMovDtApplyFilterCMD = new sap.m.Button("idBtnAddMoveApplyFilterCMD",{
		          text : "Apply Filter",
		          //width:"115px",
				  enabled: depotEnabled,
		          styled:false,
		          //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: false}),
		          press:function(){
					objcurntCMDt.applyFilter();
		          }}).addStyleClass("submitBtn marginTop5");
	   	 
	   	var oBtnCorrMovDtRemoveFilterCMD = new sap.m.Button("idBtnRemoveFilterCMDt",{
	          text : "Remove Filter",
	          //width:"115px",
			  //visible: depotEnabled,
	          styled:false,
			  enabled:false,
	          //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
	          press:function(){
	        	sap.ui.getCore().byId("idComboDepotCMDt").setValue('');
	        	sap.ui.getCore().byId("idTFDepotCMDt").setValue('');
				sap.ui.getCore().byId("idComboDepotCMDt").setValueState(sap.ui.core.ValueState.None);
				sap.ui.getCore().byId("idComboDepotCMDt").setPlaceholder("Select Depot");
				sap.ui.getCore().byId("idTFDepotCMDt").setValueState(sap.ui.core.ValueState.None);
				sap.ui.getCore().byId("idTFDepotCMDt").setPlaceholder("Depot Code");
				sap.ui.getCore().byId("idBtnRemoveFilterCMDt").setEnabled(false);
	          }}).addStyleClass("submitBtn marginTop5");
	   	
		var oFlxCMDt = new sap.m.FlexBox({
    	      items: [oBtnCorrMovDtApplyFilterCMD,new sap.ui.commons.Label( {text: " ",width : '8px'}), oBtnCorrMovDtRemoveFilterCMD],
    	      direction: "Row",
			  layoutData: new sap.ui.layout.GridData({span: "L4 M12 S12",linebreak: false, margin: false}),
    	    });
		
		// Flex Box
    	var oFlxBtnSbmt = new sap.m.FlexBox({
    	      items: [oBtnCorrMovDtSubmitCMD, new sap.ui.commons.Label( {text: " ",width : '8px'}), oBtnResetCMDt],
    	      direction: "Row",
			  layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12",linebreak: true, margin: false}),
    	    }).addStyleClass("marginTop10");;
			
	 // Online Form Starts
			     var oCorrMoveDateForm = new sap.ui.layout.form.Form({
			             layout: oCorrMoveDateLayout,
			             formContainers: [
			                     
			                     new sap.ui.layout.form.FormContainer({
			                            // title: "Correct Movement Date",
		                             formElements: [
														new sap.ui.layout.form.FormElement({
														    fields: [oLabelDepotCMD, oComboDepotCMD, oInputDepotCMD, oFlxCMDt]
														}),
														new sap.ui.layout.form.FormElement({
														    fields: [oLabelMoveTypeCMD, oComboMoveTypeCMD]
														}),
														new sap.ui.layout.form.FormElement({
														    fields: [oLabelSerialNoCMD, oInputSerialNoCMD]
														}),
														new sap.ui.layout.form.FormElement({
														    fields: [oLabelOrgnlDateCMD, oInputOriginalDateCMD]
														}),
														new sap.ui.layout.form.FormElement({
														    fields: [oLabelCorrDateCMD, oInputCorrectedDateCMD]
														}),
														new sap.ui.layout.form.FormElement({
														    fields: [oLabelAuthCMD, oInputAuthCMD]
														}),
														new sap.ui.layout.form.FormElement({
														    fields: [oFlxBtnSbmt]
														}),
														new sap.ui.layout.form.FormElement({
														    fields: [oLabelMandatoryCMD]
														}),
														new sap.ui.layout.form.FormElement("idFrmElemntSuccessCMDt",{
														    fields: []
														}),
														new sap.ui.layout.form.FormElement("idFrmElemntErrorCMDt",{
														    fields: []
														})
			                                     ]
			                     })
			             ]
			     });
				 this.getOnlinefunDepotCode();
			     	return oCorrMoveDateForm;
	},
	
	
	applyFilter: function() {
		if(sap.ui.getCore().byId("idTFDepotCMDt").getValue() != '')
			sap.ui.getCore().byId("idBtnRemoveFilterCMDt").setEnabled(true);
		else
			sap.ui.getCore().byId("idBtnRemoveFilterCMDt").setEnabled(false);
		
		var oComboDepotCMDt = sap.ui.getCore().byId("idComboDepotCMDt").setValue("");
		//oComboDepotCMDt.setSelectedKey("");
		oComboDepotCMDt.setSelectedKey(sap.ui.getCore().byId("idTFDepotCMDt").getValue());
		oComboDepotCMDt.fireChange(this);
	},
	
	createErrorTable: function(jsnData){
		var oidTblErrorCMDt = new sap.ui.table.Table(
			'idTblErrorCMDt',
			{
				selectionMode : sap.ui.table.SelectionMode.None,
				navigationMode : sap.ui.table.NavigationMode.None,
				layoutData: new sap.ui.layout.GridData({span: "L8 M12 S12",linebreak: false, margin: false}),
			}).addStyleClass('tblBorder');
			
		oidTblErrorCMDt.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Error Type",
			}),
			template : new sap.ui.commons.TextView()
					.bindProperty("text", "Type"),
			width : "90px"
		}));
		
		/*oidTblErrorCMDt.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Error ID"
			}),
			template : new sap.ui.commons.TextView()
					.bindProperty("text", "Equipment"),
			width : "100px"
		}));*/
		
		oidTblErrorCMDt.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Error Message"
			}),
			template : new sap.ui.commons.TextView()
					.bindProperty("text", "Message"),
		}));
		
		/*oidTblErrorCMDt.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Error Number"
			}),
			template : new sap.ui.commons.TextView()
					.bindProperty("text", "Equipment"),
			width : "125px"
		}));*/
		
		var oMdlErrTblCMDt = new sap.ui.model.json.JSONModel();
		oMdlErrTblCMDt.setData({modelData : jsnData});
		oidTblErrorCMDt.setVisibleRowCount(jsnData.length);	
		oidTblErrorCMDt.setModel(oMdlErrTblCMDt);
		oidTblErrorCMDt.bindRows("/modelData");
		return oidTblErrorCMDt;
	},
	
	createSuccessList: function(jsnBindData){
		/*var oLBSuccessCMDt = new sap.ui.commons.ListBox({
			displayIcons:true
		}).addStyleClass('listbox');
		for(var indx in jsnBindData){
			oLBSuccessCMDt.addItem(new sap.ui.core.ListItem({
				text:jsnBindData[indx].Message, 
				icon:'images/validate.png'}));
		}*/
		if(sap.ui.getCore().byId("idRowRptrSuccessCMDt") != undefined){
		sap.ui.getCore().byId("idRowRptrSuccessCMDt").destroy();
		}
		var oRowRepeater = new sap.ui.commons.RowRepeater("idRowRptrSuccessCMDt",{
		});
		oRowRepeater.setDesign("Transparent");
		oRowRepeater.setNumberOfRows(jsnBindData.length);
		//create the template control that will be repeated and will display the data
		var oRowTemplate = new sap.ui.commons.layout.MatrixLayout({
			widths : ['25px', '95%']
		});

		var  matrixRow, matrixCell, control;
		// main matrix
		oRowTemplate.setWidth("70%");
		// main row
		matrixRow = new sap.ui.commons.layout.MatrixLayoutRow();
		//image
		control = new sap.ui.commons.Image();
		//control.setHeight("60px");
		//control.setWidth("50px");
		control.bindProperty("src","IconSrc");
		
		matrixCell = new sap.ui.commons.layout.MatrixLayoutCell();
		matrixCell.addContent(control);
		matrixRow.addCell(matrixCell);

		//label 1
		control = new sap.ui.commons.Label();
		control.bindProperty("text","Message");
		matrixCell = new sap.ui.commons.layout.MatrixLayoutCell();
		matrixCell.addContent(control);
		matrixRow.addCell(matrixCell);

		// add row to matrix
		oRowTemplate.addRow(matrixRow);
		
		var oMdlListSuccessCMDt = new sap.ui.model.json.JSONModel();
		oMdlListSuccessCMDt.setData(jsnBindData);
		oRowRepeater.setModel(oMdlListSuccessCMDt);
		
		oRowRepeater.bindRows("/", oRowTemplate);
		return oRowRepeater;
	},
	
	ValidateDataBeforeSubmit: function(){
		var idComboDepotCMDt = sap.ui.getCore().byId("idComboDepotCMDt");
		var idComboMoveTypeCMD = sap.ui.getCore().byId("idComboMoveTypeCMD");
		var idSerailNoCMDt = sap.ui.getCore().byId("idSerailNoCMDt");
		var idOriginalDateCMDt = sap.ui.getCore().byId("idOriginalDateCMDt");
		var idCorrectedDateCMDt = sap.ui.getCore().byId("idCorrectedDateCMDt");
		var idAuthNoCMDt = sap.ui.getCore().byId("idAuthNoCMDt");
		var valid = true;
			
		if(idComboDepotCMDt.getSelectedKey() == ''){
			if(idComboDepotCMDt.getValue() != '')
				idComboDepotCMDt.setPlaceholder("Invalid Depot");
			else
				idComboDepotCMDt.setPlaceholder("Required");
				
			idComboDepotCMDt.setValue('');
			idComboDepotCMDt.setValueState(sap.ui.core.ValueState.Error);
			valid = false;
		}
			
		/*if(idComboMoveTypeCMD.getValue() == ''){
			idComboMoveTypeCMD.setValueState(sap.ui.core.ValueState.Error);
			idComboMoveTypeCMD.setPlaceholder("Required");
			valid = false;
		}*/
		
		if(idSerailNoCMDt.getValue() == ''){
			idSerailNoCMDt.setValueState(sap.ui.core.ValueState.Error);
			idSerailNoCMDt.setPlaceholder("Required");
			valid = false;
		}else if(!objUtilCMDt.validateUnitNumber($.trim(idSerailNoCMDt.getValue()))){
			idSerailNoCMDt.setValue('');
			idSerailNoCMDt.setValueState(sap.ui.core.ValueState.Error);
			idSerailNoCMDt.setPlaceholder("Invalid Value");
			//sap.ui.commons.MessageBox.alert("You have input an invalid Unit Number.\n Please enter a valid  Unit Number -11-char alpha numeric.");
			valid = true;
		}
		
		if(idOriginalDateCMDt.getValue() == ''){
			idOriginalDateCMDt.setValueState(sap.ui.core.ValueState.Error);
			idOriginalDateCMDt.setPlaceholder("Required");
			valid = false;
		}
		
		if(idCorrectedDateCMDt.getValue() == ''){
			idCorrectedDateCMDt.setValueState(sap.ui.core.ValueState.Error);
			idCorrectedDateCMDt.setPlaceholder("Required");
			valid = false;
		}
		
		if(idAuthNoCMDt.getValue() == ''){
			idAuthNoCMDt.setValueState(sap.ui.core.ValueState.Error);
			idAuthNoCMDt.setPlaceholder("Required");
			valid = false;
		}
		return valid;
	},
	
	onlinesuccessfunDataSubmit: function(resultdata, response){
		busyDialog.close();
		jQuery.sap.require("sap.ui.model.json.JSONModel");
		var oDepotCode = sap.ui.getCore().byId("idComboDepotCMDt");
		var jsnErrorCMDt = [];
		var jsnSuccessCMDt = [];
		
		if(resultdata != undefined){
			if(resultdata.results.length > 0){
				for(var indx in resultdata.results){
					if(resultdata.results[indx].Type == "D"){
						jsnSuccessCMDt.push({"Equipment":resultdata.results[indx].Equipment,
						"Status":resultdata.results[indx].Status,
						"Type":resultdata.results[indx].Type,
						"Message":resultdata.results[indx].Message,
						"FunctionalLoc":resultdata.results[indx].FunctionalLoc,
						"Depot":resultdata.results[indx].Depot,
						"MovementType":resultdata.results[indx].MovementType,
						"SerialNr":resultdata.results[indx].SerialNr,
						"OriginalDt":resultdata.results[indx].OriginalDt,
						"CorrectedDt":resultdata.results[indx].CorrectedDt,
						"Authorisation":resultdata.results[indx].Authorisation,
						"IconSrc": "images/server_response.png"
						});
					}else if(resultdata.results[indx].Type == "E"){
						jsnErrorCMDt.push({"Equipment":resultdata.results[indx].Equipment,
						"Status":resultdata.results[indx].Status,
						"Type":resultdata.results[indx].Type,
						"Message":resultdata.results[indx].Message,
						"FunctionalLoc":resultdata.results[indx].FunctionalLoc,
						"Depot":resultdata.results[indx].Depot,
						"MovementType":resultdata.results[indx].MovementType,
						"SerialNr":resultdata.results[indx].SerialNr,
						"OriginalDt":resultdata.results[indx].OriginalDt,
						"CorrectedDt":resultdata.results[indx].CorrectedDt,
						"Authorisation":resultdata.results[indx].Authorisation,
						});
					}
				}
				
				sap.ui.getCore().byId("idFrmElemntSuccessCMDt").destroyFields();
				if(jsnSuccessCMDt.length > 0)
				{
					sap.ui.getCore().byId("idFrmElemntSuccessCMDt").insertField(objcurntCMDt.createSuccessList(jsnSuccessCMDt));
				}
				
				sap.ui.getCore().byId("idFrmElemntErrorCMDt").destroyFields();
				if(jsnErrorCMDt.length > 0)
				{
					sap.ui.getCore().byId("idFrmElemntErrorCMDt").insertField(objcurntCMDt.createErrorTable(jsnErrorCMDt));
				}
			}
		}
	},
	
	onlineerrorfunDataSubmit: function(err){
		sap.ui.getCore().byId("idFrmElemntErrorCMDt").destroyFields();
		sap.ui.getCore().byId("idFrmElemntSuccessCMDt").destroyFields();
		errorfromServer(err);
	},
	
	OnlinefunDataSubmit: function(){
		try{
			var idComboDepotCMDt = sap.ui.getCore().byId("idComboDepotCMDt");
			var idComboMoveTypeCMD = sap.ui.getCore().byId("idComboMoveTypeCMD");
			var idSerailNoCMDt = sap.ui.getCore().byId("idSerailNoCMDt");
			var idOriginalDateCMDt = sap.ui.getCore().byId("idOriginalDateCMDt");
			var idCorrectedDateCMDt = sap.ui.getCore().byId("idCorrectedDateCMDt");
			var idAuthNoCMDt = sap.ui.getCore().byId("idAuthNoCMDt");
			
			if(!this.ValidateDataBeforeSubmit()){
				return;
			}
			
			busyDialog.open();
			var splitvar = idOriginalDateCMDt.getValue().split('-');
			var CnvrtOrigDt = splitvar[2]+'-'+ splitvar[1]+'-'+splitvar[0]+'T00:00:00';
			
			splitvar = idCorrectedDateCMDt.getValue().split('-');
			var CnvrtCrrectDt = splitvar[2]+'-'+ splitvar[1]+'-'+splitvar[0] +'T00:00:00';
			
			//var oModel = new sap.ui.model.odata.ODataModel(serviceUrl15, true);
			//var urlToCall = "http://seanwgd1.gessap.local:8000/sap/opu/odata/sap/ZNW_SEACO_PORTAL_REQ15_SRV/Correct_Movement_Date?";
			var urlToCall = serviceUrl15 + "/Correct_Movement_Date?";
				urlToCall += "$filter=Authorisation eq '" + idAuthNoCMDt.getValue() +"' and";
				urlToCall += " CorrectedDt eq datetime'" + CnvrtCrrectDt +"'";
				urlToCall += " and Depot eq '" + idComboDepotCMDt.getSelectedKey() +"'";
				urlToCall += " and FunctionalLoc eq '" + idComboDepotCMDt.getValue().substr(0,15) +"'";
				urlToCall += " and MovementType eq '"+idComboMoveTypeCMD.getValue()+"'";
				urlToCall += " and OriginalDt eq datetime'" + CnvrtOrigDt +"'"; 
				urlToCall += " and SerialNr eq '" + idSerailNoCMDt.getValue().toUpperCase() +"'";
			
			//var urlToCall = serviceUrl15 + "/F4_Depot_Names?$filter=City eq ''";
		    objUtilCMDt.doOnlineRequest(urlToCall,this.onlinesuccessfunDataSubmit, this.onlineerrorfunDataSubmit);
		}catch(e){
			busyDialog.close();
			sap.ui.commons.MessageBox.alert("Error on fetching Depot Code" + e);
		}
	},
	
	
	onlinesuccessfunDepotCode: function(resultdata, response){
		busyDialog.close();
		jQuery.sap.require("sap.ui.model.json.JSONModel");
		var oDepotCode = sap.ui.getCore().byId("idComboDepotCMDt");
		//oDepotCode.addItem(new sap.ui.core.ListItem({text:"", key: ""}));
		if(resultdata != undefined){
			if(resultdata.results.length > 0){
				for(var indx in resultdata.results){
					oDepotCode.addItem(new sap.ui.core.ListItem({text:resultdata.results[indx].FunctionalLoc, key: resultdata.results[indx].Depot}));
				}
				if(objLoginUser.getLoggedInUserType() != "SEACO"){
					oDepotCode.setSelectedKey(objLoginUser.getLoggedInUserID());
					sap.ui.getCore().byId("idTFDepotCMDt").setValue(objLoginUser.getLoggedInUserID());
					
				}
				//objcurntCMDt.applyFilter(); // SET DEFAULT VALUE IN AUTOCOMPLETE FOR ALL TYPE USER
			}
		}
	},
	
	onlineerrorfunDepotCode: function(err){
		var oDepotCode = sap.ui.getCore().byId("idComboDepotCMDt");
		oDepotCode.addItem(new sap.ui.core.ListItem({text:"", key: ""}));
		errorfromServer(err);
	},
	
	getOnlinefunDepotCode: function(unitNumber, DnNumber){
		try{
			//var loginusename = objLoginUser.getLoggedInUserName();
			sap.ui.getCore().byId("idComboDepotCMDt").destroyItems();
			busyDialog.open();
			//http://seanwgd1.gessap.local:8000/sap/opu/odata/sap/ZNW_SEACO_PORTAL_REQ15_SRV/F4_Functional_Location
			var oModel = new sap.ui.model.odata.ODataModel(serviceUrl15, true);
			//http://seanwgd1.gessap.local:8000/sap/opu/odata/sap/ZNW_SEACO_PORTAL_LOT4_SECURITY_SRV/Single_Doctype_F4?$filter=Bname eq 'ztest_dm' and Dept eq ''
		    //var urlToCall = serviceUrl15 + "/F4_Unit_Type_Single";
			//var urlToCall = "http://seanwgd1.gessap.local:8000/sap/opu/odata/sap/ZNW_SEACO_PORTAL_REQ15_SRV/F4_Functional_Location"; //F4_Depot_Names?$filter=City eq ''";
			var urlToCall = serviceUrl15 + "/F4_Functional_Location";
		    objUtilCMDt.doOnlineRequest(urlToCall,this.onlinesuccessfunDepotCode, this.onlineerrorfunDepotCode);
		}catch(e){
			busyDialog.close();
			sap.ui.commons.MessageBox.alert("Error on fetching Depot Code" + e);
		}
	},
	
	fnResetCorrectMovDate: function (){
		var idComboDepotCMDt = sap.ui.getCore().byId("idComboDepotCMDt");
		var idTFDepotCMDt = sap.ui.getCore().byId("idTFDepotCMDt");
		var idComboMoveTypeCMD = sap.ui.getCore().byId("idComboMoveTypeCMD");
		var idSerailNoCMDt = sap.ui.getCore().byId("idSerailNoCMDt");
		var idOriginalDateCMDt = sap.ui.getCore().byId("idOriginalDateCMDt");
		var idCorrectedDateCMDt = sap.ui.getCore().byId("idCorrectedDateCMDt");
		var idAuthNoCMDt = sap.ui.getCore().byId("idAuthNoCMDt");
		var depotEnabled =false;
		
		if(objLoginUser.getLoggedInUserType() == "SEACO"){
			depotEnabled = true;
		}
		
		if(idComboDepotCMDt != undefined){
			sap.ui.getCore().byId("idBtnRemoveFilterCMDt").setEnabled(false);
			idComboDepotCMDt.setValueState(sap.ui.core.ValueState.None);
			idComboDepotCMDt.setPlaceholder("Select Depot");
			
			idTFDepotCMDt.setValueState(sap.ui.core.ValueState.None);
			idTFDepotCMDt.setPlaceholder("Depot Code");
			if(depotEnabled){
				idComboDepotCMDt.setValue('');
				idTFDepotCMDt.setValue('');
			}
		}
		
		if(idComboMoveTypeCMD != undefined){
			idComboMoveTypeCMD.setValue('');
			idComboMoveTypeCMD.setValueState(sap.ui.core.ValueState.None);
			idComboMoveTypeCMD.setPlaceholder("Select Movement Type");
		}
		
		if(idSerailNoCMDt != undefined){
			idSerailNoCMDt.setValue('');
			idSerailNoCMDt.setValueState(sap.ui.core.ValueState.None);
			idSerailNoCMDt.setPlaceholder("Serial Number");
		}
		
		if(idOriginalDateCMDt != undefined){
			idOriginalDateCMDt.setValue('');
			idOriginalDateCMDt.setValueState(sap.ui.core.ValueState.None);
			idOriginalDateCMDt.setPlaceholder("Original Date");
		}
		
		if(idCorrectedDateCMDt != undefined){
			idCorrectedDateCMDt.setValue('');
			idCorrectedDateCMDt.setValueState(sap.ui.core.ValueState.None);
			idCorrectedDateCMDt.setPlaceholder("Corrected Date");
		}
		
		if(idAuthNoCMDt != undefined){
			idAuthNoCMDt.setValue('');
			idAuthNoCMDt.setValueState(sap.ui.core.ValueState.None);
			idAuthNoCMDt.setPlaceholder("Authorisation");
		}
		
		if(sap.ui.getCore().byId("idFrmElemntErrorCMDt") != undefined)
			sap.ui.getCore().byId("idFrmElemntErrorCMDt").destroyFields();
			
		if(sap.ui.getCore().byId("idFrmElemntSuccessCMDt") != undefined)
			sap.ui.getCore().byId("idFrmElemntSuccessCMDt").destroyFields();
	}
});
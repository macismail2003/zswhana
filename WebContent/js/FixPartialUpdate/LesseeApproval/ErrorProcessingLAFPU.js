jQuery.sap.require("sap.ui.model.json.JSONModel");
sap.ui.model.json.JSONModel.extend("errorProcessingLAView", {
	
	createEPScreenFlexLAFPU:function(){
		oCurrEPLAFPU = this;
		
		var back = new sap.m.Link({text: " < Back",
			width:"8%",
			wrapping:true,
            press: function(){
            
                   var bus = sap.ui.getCore().getEventBus();
                       bus.publish("nav", "back");
                       $('#idHdrContnt').html('Lessee Approval'); //CHANGE HEADER CONTENT
        }});
		var oScreenFlex;
		
		var oBtnSaveEPLAFPU = new sap.m.Button("idBtnSubmitEPLAFPU",{
	          text : "Save",
	          width:"80px",
	          styled:false,
	          layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: true}),
	          press:function(){
	        	  if(oCurrEPLAFPU.validateEPLAFPU())
	        		  oCurrEPLAFPU.saveDataLocallyLAFPU();
	        	  
	          }
	 	 }).addStyleClass("submitBtn marginTop10");
	 	 
	   var oButtonFlex = new sap.m.FlexBox({
	        items: [ 	oBtnSaveEPLAFPU  ],
	        width:"100%",
	        alignItems: sap.m.FlexAlignItems.Center,
	   });
   
	   var oLabelTitle = new sap.ui.commons.Label({
			text:"Lease Details",
           wrapping: true}).addStyleClass("font15Bold marginTop10");
	   
		var vHDivider1 = new sap.ui.commons.HorizontalDivider({width: "100%", type: "Area", height: "Medium"}).addStyleClass("marginTop10");

		if(btnFlagLAFPU == "P"){
			var tableEPLAFPU = oCurrEPLAFPU.createEPTableLAFPU();
			var vHDivider = new sap.ui.commons.HorizontalDivider({width: "100%", type: "Area", height: "Medium"}).addStyleClass("marginTop10");
			var formLAFPU = oCurrEPLAFPU.createEPFormLAFPU();
			var tableLAFPU = oCurrEPLAFPU.createTableLAFPU();
		     
			 oScreenFlex = new sap.m.FlexBox({
		          items: [
		            back,
		            tableEPLAFPU,
		            vHDivider,
		            formLAFPU,
		            vHDivider1,
		            oLabelTitle,
		            tableLAFPU,
		            oButtonFlex
		          ],
		          direction: "Column",
		     });
		}
		else{
			var formLAFPU = oCurrEPLAFPU.createEPFormLAFPU();
			var tableLAFPU = oCurrEPLAFPU.createTableLAFPU();
			
			 oScreenFlex = new sap.m.FlexBox({
		          items: [
		            back,
		            formLAFPU,
		            vHDivider1,
		            oLabelTitle,
		            tableLAFPU,
		            oButtonFlex
		          ],
		          direction: "Column",
		     });
		}
		
		return oScreenFlex;
		
	},
	
	createEPTableLAFPU:function(){
		
		var oEPLAFPUTable = new sap.ui.table.Table({
	        firstVisibleRow: 1,
	        columnHeaderHeight: 30,
	        selectionMode: sap.ui.table.SelectionMode.None,
	        width: "95%",
	     }).addStyleClass("tblBorder marginTop10");
		
		oEPLAFPUTable.addColumn(new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "Type"}),
	        template: new sap.ui.commons.TextView().bindProperty("text", "MsgType"),
	        resizable:false,
	        width: "40px",
		}));
		
		oEPLAFPUTable.addColumn(new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "Message"}),
	        template: new sap.ui.commons.TextView().bindProperty("text", "Message"),
	        resizable:false,
	        width: "200px",
		}));
		
		
		var oModelLAFPU = new sap.ui.model.json.JSONModel();
		oModelLAFPU.setData(errorProcessingLAFPU);
		
		oEPLAFPUTable.setModel(oModelLAFPU);
		oEPLAFPUTable.bindRows("/");
		oEPLAFPUTable.setVisibleRowCount(errorProcessingLAFPU.length);
		
		return oEPLAFPUTable;
	},
	
	createEPFormLAFPU: function(){
		
		// Labels
		var oLblSerialNoEPLAFPU = new sap.ui.commons.Label({text: "Serial Number",
			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S3",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("margin10");
		
		var oLabelApprovalDateEPLAFPU = new sap.ui.commons.Label({text: "Approval Date",
			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S3",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("margin10");
		
		var oLabelApproverNameEPLAFPU = new sap.ui.commons.Label({text: "Approver Name",
			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S3",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("margin10");
		
		var oLabelAssetNumberLAFPU = new sap.ui.commons.Label({text: "Asset Number",
			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S3",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("margin10");
		
		var oLabelEquipmentNumberLAFPU = new sap.ui.commons.Label({text: "Equipment Number",
			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S3",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("margin10");
		
		var oLabelPlannerGroupEPLAFPU = new sap.ui.commons.Label({text: "Planner Group",
			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S3",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("margin10");
		
		var oLabelWorkCenterEPLAFPU = new sap.ui.commons.Label({text: "Work Center",
			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S3",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("margin10");
		
		var oLabelUnitPartCodeEPLAFPU = new sap.ui.commons.Label({text: "Unit Part Code",
			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S3",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("margin10");
		
		var oLabelApprovalNumberEPLAFPU = new sap.ui.commons.Label({text: "Approval Number",
			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S3",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("margin10");
		
		var oLabelLesseeAuthorizedAmtEPLAFPU = new sap.ui.commons.Label({text: "Lessee Authorised Amount",
			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S3",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("margin10");
		
		var oLabelCompanyCodeEPLAFPU = new sap.ui.commons.Label({text: "Company Code",
			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S3",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("margin10");
		
		var oLabelMaterialTypeEPLAFPU = new sap.ui.commons.Label({text: "Material Type",
			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S3",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("margin10");
		
		var oLabelSubAssetNumberEPLAFPU = new sap.ui.commons.Label({text: "Sub Asset Number",
			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S3",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("margin10");
		
		
	 //   --------------------------------------  Inputs  --------------------------------------------------------
    	var oInputSerialNoEPLAFPU = new sap.ui.commons.TextField('idSerialNoEPLAFPU',{
    		layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12"}),
    		enabled: enabledGrp1EPLAFPU,
    		value:locallySavedLAFPU[0].Sernr,
    		placeholder: "Serial Number",
    		change:function(oControlEvent){
				this.setPlaceholder("Serial Number");
				this.setValueState(sap.ui.core.ValueState.None);
			},
    	}).addStyleClass("FormInputStyle margin5");
    	
    	var oInputApprovalDateEPLAFPU = new sap.ui.commons.DatePicker('idApprovalDateEPLAFPU',{
    		value: {
                path: "/ApprDate",
                type: new sap.ui.model.type.Date({pattern: "dd-MM-yyyy"})
    			},
    			enabled: enabledGrp1EPLAFPU,
    			yyyymmdd: locallySavedLAFPU[0].ApprDate, 
    			placeholder: "Approval Date",
    			layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12"}),
    	});
    	//oInputGateDateEPLAFPU.setModel(oModelGateDate);
    	oInputApprovalDateEPLAFPU.addStyleClass("FormInputStyle margin5");
    	oInputApprovalDateEPLAFPU.attachChange(
    	                function(oEvent){
    	                        if(oEvent.getParameter("invalidValue")){
    	                                oEvent.oSource.setValueState(sap.ui.core.ValueState.Error);
    	                                oEvent.oSource.setValue("");
    	                                oEvent.oSource.setPlaceholder("Invalid Value");
    	                        }else{
    	                                oEvent.oSource.setValueState(sap.ui.core.ValueState.None);
    	                        }
    	                }
    	);
    	
    	var oInputApproverNameEPLAFPU = new sap.ui.commons.TextField('idApproverNameEPLAFPU',{
     		layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12"}),
     		enabled: enabledGrp2EPLAFPU,
     		value:locallySavedLAFPU[0].ApprName,
     		placeholder: "Approver Name",
     	}).addStyleClass("FormInputStyle margin5");
    	
    	var oInputAssetNumberEPLAFPU = new sap.ui.commons.TextField('idAssetNumberEPLAFPU',{
     		layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12"}),
     		enabled: enabledGrp1EPLAFPU,
     		value:locallySavedLAFPU[0].AssetNo,
     		placeholder: "Asset Number",
     	}).addStyleClass("FormInputStyle margin5");
    	
    	
    	var oInputEquipmentNumberEPLAFPU = new sap.ui.commons.TextField('idEquipmentNumberEPLAFPU',{
    		layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12"}),
    		enabled: enabledGrp1EPLAFPU,
    		value:locallySavedLAFPU[0].Equnr,
    		placeholder: "Equipment Number",
    	}).addStyleClass("FormInputStyle margin5");
    	
    	 var oPlannerGroupEPLAFPU = new sap.ui.commons.TextField('idPlannerGroupEPLAFPU',{
    		layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12"}),
    		enabled: enabledGrp1EPLAFPU,
    		value:locallySavedLAFPU[0].Plangroup,
    		placeholder: "Planner Group",
    	}).addStyleClass("FormInputStyle margin5");
    	 
    	 var oInputWorkCenterEPLAFPU = new sap.ui.commons.TextField('idWorkCenterEPLAFPU',{
     		layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12"}),
     		enabled: enabledGrp1EPLAFPU,
     		value:locallySavedLAFPU[0].WorkCtr,
     		placeholder: "Work Center",
     	}).addStyleClass("FormInputStyle margin5");
    	 
    	 var oDropdownUnitPartCode = new sap.ui.commons.DropdownBox("idUnitPartCodeEPLAFPU",{
    	 	layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12"}),
   			enabled: enabledGrp1EPLAFPU,
   			placeholder: "Unit Part Code",
   		}).addStyleClass("FormInputStyle margin5");
    	 
    	 var oItem = new sap.ui.core.ListItem("M");
    	 oItem.setText("M - Material");
    	 oItem.setKey("M");
    	 oDropdownUnitPartCode.addItem(oItem);
    	 oItem = new sap.ui.core.ListItem("C");
    	 oItem.setText("C - Container");
    	 oItem.setKey("C");
    	 oDropdownUnitPartCode.addItem(oItem);
    	 if(locallySavedLAFPU[0].PartCode == "M")
    		 oDropdownUnitPartCode.setValue("M - Material");
    	 else
    		 oDropdownUnitPartCode.setValue("C - Container"); 
    	 
    	var oInputApprovalNumberEPLAFPU = new sap.ui.commons.TextField('idApprovalNumberEPLAFPU',{
      		layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12"}),
      		enabled: enabledGrp2EPLAFPU,
      		value:locallySavedLAFPU[0].ApprRef,
      		placeholder: "Approval Number",
      	}).addStyleClass("FormInputStyle margin5");
     	 
     	var oLeaseAuthAmtEPLAFPU = new sap.ui.commons.TextField('idLeaseAuthAmtEPLAFPU',{
      		layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12"}),
      		enabled: enabledGrp2EPLAFPU,
      		value:locallySavedLAFPU[0].ApprAmt,
      		placeholder: "Lessee Authorized Amount",
      		change:function(oControlEvent){
				this.setPlaceholder("Lessee Authorized Amount");
				this.setValueState(sap.ui.core.ValueState.None);
			},
      	}).addStyleClass("FormInputStyle margin5");
     	
     	var oInputCompanyCodeEPLAFPU = new sap.ui.commons.TextField('idCompanyCodeEPLAFPU',{
     		layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12"}),
     		enabled: enabledGrp1EPLAFPU,
     		value:locallySavedLAFPU[0].Bukrs,
     		placeholder: "Company Code",
     		change:function(oControlEvent){
				this.setPlaceholder("Company Code");
				this.setValueState(sap.ui.core.ValueState.None);
			},
     	}).addStyleClass("FormInputStyle margin5");
    	 
     	var oInputMaterialTypeEPLAFPU = new sap.ui.commons.TextField('idMaterialTypeEPLAFPU',{
     		layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12"}),
     		enabled: enabledGrp1EPLAFPU,
     		value:locallySavedLAFPU[0].Matnr,
     		placeholder: "Material Type",
     	}).addStyleClass("FormInputStyle margin5");
     	
     	var oInputTSubAssetNumberEPLAFPU = new sap.ui.commons.TextField('idSubAssetNumberEPLAFPU',{
     		layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12"}),
     		enabled: enabledGrp1EPLAFPU,
     		value:locallySavedLAFPU[0].SubNumber,
     		placeholder: "Sub Asset Number",
     	}).addStyleClass("FormInputStyle margin5");
     	
    	 
		  // Responsive Grid Layout
		    var oErrProcLAFPULayout = new sap.ui.layout.form.ResponsiveGridLayout("idErrProcLAFPULayout",{
		    	  labelSpanL: 1,
                  labelSpanM: 1,
                  labelSpanS: 1,
                  emptySpanL: 0,
                  emptySpanM: 0,
                  emptySpanS: 0,
                  columnsL: 2,
                  columnsM: 1,
                  columnsS: 1,
                  breakpointL: 765,
                  breakpointM: 320
		    });
 
		  // Online Form Starts
		     var oErrProcLAFPUForm = new sap.ui.layout.form.Form("idErrProcLAFPUForm",{
		             layout: oErrProcLAFPULayout,
		             formContainers: [
		                     
		                     new sap.ui.layout.form.FormContainer("idErrProcLAFPUFormC1",{
		                         //title: "Move Out To Lease - Error Processing",
	                             formElements: [
													new sap.ui.layout.form.FormElement({
													    fields: [oLblSerialNoEPLAFPU, oInputSerialNoEPLAFPU ]
													}),
													new sap.ui.layout.form.FormElement({
													    fields: [oLabelApprovalDateEPLAFPU, oInputApprovalDateEPLAFPU ]
													}),
													new sap.ui.layout.form.FormElement({
													    fields: [oLabelApproverNameEPLAFPU, oInputApproverNameEPLAFPU ]
													}),
													new sap.ui.layout.form.FormElement({
													    fields: [oLabelAssetNumberLAFPU, oInputAssetNumberEPLAFPU ]
													}),
													new sap.ui.layout.form.FormElement({
													    fields: [oLabelEquipmentNumberLAFPU, oInputEquipmentNumberEPLAFPU ]
													}),
													new sap.ui.layout.form.FormElement({
													    fields: [oLabelPlannerGroupEPLAFPU, oPlannerGroupEPLAFPU ]
													}),
													new sap.ui.layout.form.FormElement({
													    fields: [oLabelWorkCenterEPLAFPU, oInputWorkCenterEPLAFPU ]
													}),
		                                     ],
		                                     layoutData: new sap.ui.layout.GridData({span: "L4 M9 S12"}),
		                     }),
		                     new sap.ui.layout.form.FormContainer("idErrProcLAFPUFormC2",{
	                             formElements: [
										new sap.ui.layout.form.FormElement({
										    fields: [oLabelUnitPartCodeEPLAFPU , oDropdownUnitPartCode ]
										}),
										new sap.ui.layout.form.FormElement({
										    fields: [oLabelApprovalNumberEPLAFPU ,oInputApprovalNumberEPLAFPU  ]
										}),
										new sap.ui.layout.form.FormElement({
										    fields: [oLabelLesseeAuthorizedAmtEPLAFPU , oLeaseAuthAmtEPLAFPU ]
										}),
										new sap.ui.layout.form.FormElement({
										    fields: [oLabelCompanyCodeEPLAFPU , oInputCompanyCodeEPLAFPU ]
										}),
										new sap.ui.layout.form.FormElement({
										    fields: [oLabelMaterialTypeEPLAFPU , oInputMaterialTypeEPLAFPU ]
										}),
										new sap.ui.layout.form.FormElement({
										    fields: [oLabelSubAssetNumberEPLAFPU , oInputTSubAssetNumberEPLAFPU ]
										})
	                             
	                             ],
		                     layoutData: new sap.ui.layout.GridData({span: "L4 M9 S12"}),
	                     }),
		             ]
		     });
			     
/*		     var oFormFlex = new sap.m.FlexBox({
		          items: [
		                  	oErrProcLAFPUForm,
		                  	oButtonFlex
		          ],
		          direction: "Column",
		     });*/
		     
		     return oErrProcLAFPUForm;
	},
	
	createTableLAFPU:function(){
		
		var oEPLAFPUTable2 = new sap.ui.table.Table({
	        firstVisibleRow: 1,
	        visibleRowCount: 1,
	        columnHeaderHeight: 45,
	        selectionMode: sap.ui.table.SelectionMode.None,
	        width: "95%",
	     }).addStyleClass("tblBorder marginTop10");
		
		oEPLAFPUTable2.addColumn(new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "Transaction \nID"}),
	        template: new sap.ui.commons.TextView().bindProperty("text", "TrId"),
	        resizable:false,
	        width: "100px",
		}));
		
		oEPLAFPUTable2.addColumn(new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "Approval Date"}),
	        template: new sap.ui.commons.TextView().bindProperty("text", "LsaprDate"),
	        resizable:false,
	        width: "80px",
		}));
		
		oEPLAFPUTable2.addColumn(new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "Last Name"}),
	        template: new sap.ui.commons.TextView().bindProperty("text", "LastName"),
	        resizable:false,
	        width: "150px",
		}));
		
		oEPLAFPUTable2.addColumn(new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "Description"}),
	        template: new sap.ui.commons.TextView().bindProperty("text", "Descr"),
	        resizable:false,
	        width: "150px",
		}));
		
		oEPLAFPUTable2.addColumn(new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "Labour \n Total"}),
	        template: new sap.ui.commons.TextView().bindProperty("text", "LabTotal"),
	        resizable:false,
	        width: "80px",
		}));
		
		oEPLAFPUTable2.addColumn(new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "Material \nTotal"}),
	        template: new sap.ui.commons.TextView().bindProperty("text", "MatTotal"),
	        resizable:false,
	        width: "80px",
		}));
		
		oEPLAFPUTable2.addColumn(new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "Product \nID"}),
	        template: new sap.ui.commons.TextView().bindProperty("text", "ProdId"),
	        resizable:false,
	        width: "80px",
		}));
		
		oEPLAFPUTable2.addColumn(new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "Total"}),
	        template: new sap.ui.commons.TextView().bindProperty("text", "Total"),
	        resizable:false,
	        width: "80px",
		}));
		
		oEPLAFPUTable2.addColumn(new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "Active \nIn Date"}),
	        template: new sap.ui.commons.TextView().bindProperty("text", "InDate"),
	        resizable:false,
	        width: "100px",
		}));
		
		oEPLAFPUTable2.addColumn(new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "Serial \nNumber"}),
	        template: new sap.ui.commons.TextView().bindProperty("text", "Lssernr"),
	        resizable:false,
	        width: "100px",
		}));
		
		var oModelLAFPU = new sap.ui.model.json.JSONModel();
		oModelLAFPU.setData(locallySavedLAFPU);
		
		oEPLAFPUTable2.setModel(oModelLAFPU);
		oEPLAFPUTable2.bindRows("/");
		
		return oEPLAFPUTable2;
	},
	
	validateEPLAFPU:function(){
		isValid = true;
		var serialNo = sap.ui.getCore().byId("idSerialNoEPLAFPU").getValue();
		
		if(serialNo.trim().length == 0){
			sap.ui.getCore().byId("idSerialNoEPLAFPU").setValueState(sap.ui.core.ValueState.Error);
			sap.ui.getCore().byId("idSerialNoEPLAFPU").setPlaceholder("Required");
			isValid = false;
		}else if(serialNo.trim().length != 11){
			sap.ui.getCore().byId("idSerialNoEPLAFPU").setValueState(sap.ui.core.ValueState.Error);
			sap.ui.getCore().byId("idSerialNoEPLAFPU").setPlaceholder("Invalid Value");
			isValid = false;
		}
		
		return isValid;
		
	},
	
	saveDataLocallyLAFPU:function(){
		var trId = locallySavedLAFPU[0].TrId;
		var LsaprDate = locallySavedLAFPU[0].LsaprDate;
		var LastName = locallySavedLAFPU[0].LastName;
		var Descr = locallySavedLAFPU[0].Descr;
		var LabTotal = locallySavedLAFPU[0].LabTotal;
		var MatTotal = locallySavedLAFPU[0].MatTotal;
		var ProdId = locallySavedLAFPU[0].ProdId;
		var Total = locallySavedLAFPU[0].Total;
		var InDate = locallySavedLAFPU[0].InDate;
		var Lssernr = locallySavedLAFPU[0].Lssernr;
		
		
		locallySavedLAFPU = [];
		
		var tranxId;
		if(errorProcessingLAFPU.length == 0){
			tranxId = "";
		}
		else{
			tranxId = errorProcessingLAFPU[0].TranxId;
		}
		
		locallySavedLAFPU.push({
			  'TranxId' : tranxId,
			  'DepotCode': "",
			  'Sernr': sap.ui.getCore().byId("idSerialNoEPLAFPU").getValue(),
    		  'ApprDate': sap.ui.getCore().byId("idApprovalDateEPLAFPU").getYyyymmdd(),
    		  'ApprName': sap.ui.getCore().byId("idApproverNameEPLAFPU").getValue(),
    		  'AssetNo': sap.ui.getCore().byId("idAssetNumberEPLAFPU").getValue(),
    		  'Equnr': sap.ui.getCore().byId("idEquipmentNumberEPLAFPU").getValue(),
    		  'Plangroup': sap.ui.getCore().byId("idPlannerGroupEPLAFPU").getValue(),
    		  'WorkCtr': sap.ui.getCore().byId("idWorkCenterEPLAFPU").getValue(),
    		  'PartCode': sap.ui.getCore().byId("idUnitPartCodeEPLAFPU").getSelectedKey(),
    		  'ApprRef': sap.ui.getCore().byId("idApprovalNumberEPLAFPU").getValue(),
    		  'ApprAmt': sap.ui.getCore().byId("idLeaseAuthAmtEPLAFPU").getValue(),
    		  'Bukrs': sap.ui.getCore().byId("idCompanyCodeEPLAFPU").getValue(),
    		  'Matnr': sap.ui.getCore().byId("idMaterialTypeEPLAFPU").getValue(),
    		  'SubNumber': sap.ui.getCore().byId("idSubAssetNumberEPLAFPU").getValue(),
    		  
    		  'TrId': trId,
    		  'LsaprDate': LsaprDate,
    		  'LastName': LastName,
    		  'Descr': Descr,
    		  'LabTotal': LabTotal,
    		  'MatTotal': MatTotal,
    		  'ProdId': ProdId,
    		  'Total': Total,
    		  'InDate': InDate,
    		  'Lssernr': Lssernr,
    		  
            });
		
		var bus = sap.ui.getCore().getEventBus();
        bus.publish("nav", "back");
        $('#idHdrContnt').html('Lessee Approval'); //CHANGE HEADER CONTENT
	},
	
});
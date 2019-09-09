jQuery.sap.require("sap.ui.model.json.JSONModel");
sap.ui.model.json.JSONModel.extend("errorProcessingMIFLView", {
	
	createEPScreenFlex:function(){
		oCurrEPMIFPU = this;
		var back = new sap.m.Link({text: " < Back",
			width:"8%",
			wrapping:true,
            press: function(){
            
                   var bus = sap.ui.getCore().getEventBus();
                       bus.publish("nav", "back");
                       $('#idHdrContnt').html('Move In From Lease'); //CHANGE HEADER CONTENT
        }});
		
		
		var oScreenFlex;
		
		if(btnFlagGateInFPU == "P"){
			var tableMIFPU = oCurrEPMIFPU.createEPTableMIFPU();
			var vHDivider = new sap.ui.commons.HorizontalDivider({width: "95%", type: "Area", height: "Medium"}).addStyleClass("marginTop10");
			var formMIFPU = oCurrEPMIFPU.createEPFormMIFPU();
			 oScreenFlex = new sap.m.FlexBox({
		          items: [
		            back,
		            tableMIFPU,
		            vHDivider,
		            formMIFPU
		          ],
		          direction: "Column",
		     });
		}
		else{
			var formMIFPU = oCurrEPMIFPU.createEPFormMIFPU();
			 oScreenFlex = new sap.m.FlexBox({
		          items: [
		            back,
		            formMIFPU
		          ],
		          direction: "Column",
		     });
		}
		
		return oScreenFlex;
		
	},
	
	createEPTableMIFPU:function(){
		
		var oEPMIFPUTable = new sap.ui.table.Table({
	        firstVisibleRow: 1,
	        columnHeaderHeight: 30,
	        selectionMode: sap.ui.table.SelectionMode.None,
	        width: "95%",
	     }).addStyleClass("tblBorder marginTop10");
		
		oEPMIFPUTable.addColumn(new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "Type"}),
	        template: new sap.ui.commons.TextView().bindProperty("text", "MsgType"),
	        resizable:false,
	        width: "40px",
		}));
		
		oEPMIFPUTable.addColumn(new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "Message"}),
	        template: new sap.ui.commons.TextView().bindProperty("text", "Message"),
	        resizable:false,
	        width: "200px",
		}));
		
		
		var oModelMIFPU = new sap.ui.model.json.JSONModel();
		oModelMIFPU.setData(errorProcessingMIFPU);
		
		oEPMIFPUTable.setModel(oModelMIFPU);
		oEPMIFPUTable.bindRows("/");
		oEPMIFPUTable.setVisibleRowCount(errorProcessingMIFPU.length);
		
		return oEPMIFPUTable;
	},
	
	createEPFormMIFPU: function(){
		
		// Labels
		var oLblSerialNoEPMIFPU = new sap.ui.commons.Label({text: "Serial Number",
			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S3",linebreak: true, margin: true}),
			//required: true,
            wrapping: true}).addStyleClass("margin10");
		
		var oLabelGateDateEPMIFPU = new sap.ui.commons.Label({text: "Gate Date",
			//required: true,
			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S3",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("margin10");
		
		var oLabelFuncLocEPMIFPU = new sap.ui.commons.Label({text: "Functional Location",
			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S3",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("margin10");
		
		var oLabelTankCertificateDateMIFPU = new sap.ui.commons.Label({text: "Tank Certificate Date",
			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S3",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("margin10");
		
		var oLabelTankLastCargoDescMIFPU = new sap.ui.commons.Label({text: "Tank Last Cargo Desc",
			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S3",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("margin10");
		
		var oLabelAssetNoEPMIFPU = new sap.ui.commons.Label({text: "Asset Number",
			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S3",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("margin10");
		
		var oLabelEquipmentNoEPMIFPU = new sap.ui.commons.Label({text: "Equipment Number",
			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S3",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("margin10");
		
		var oLabelPlannerGroupEPMIFPU = new sap.ui.commons.Label({text: "Planner Group",
			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S3",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("margin10");
		
		var oLabelWorkCentrEPMIFPU = new sap.ui.commons.Label({text: "Work Center",
			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S3",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("margin10");
		
		var oLabelSenderAddressEPMIFPU = new sap.ui.commons.Label({text: "Sender Address",
			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S3",linebreak: true, margin: true}),
			//required: true,
            wrapping: true}).addStyleClass("margin10");
		
		var oLabelStatusEPMIFPU = new sap.ui.commons.Label({text: "Status A",
			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S3",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("margin10");
		
		var oLabelReturnAuthorizationEPMIFPU = new sap.ui.commons.Label({text: "Return Authorisation",
			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S3",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("margin10");
		
		var oLabelTankCleaningEPMIFPU = new sap.ui.commons.Label({text: "Tank Cleaning Proc Desc",
			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S3",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("margin10");
		
		var oLabelTankNumberEPMIFPU = new sap.ui.commons.Label({text: "Tank Number",
			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S3",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("margin10");
		
		var oLabelCompanyCodeEPMIFPU = new sap.ui.commons.Label({text: "Company Code",
			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S3",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("margin10");
		
		var oLabelMaterialTypeEPMIFPU = new sap.ui.commons.Label({text: "Material Type",
			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S3",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("margin10");
		
		var oLabelSubAssetNoEPMIFPU = new sap.ui.commons.Label({text: "Sub Asset Number",
			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S3",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("margin10");
		
		var oLabelNotificationEPMIFPU = new sap.ui.commons.Label({text: "Notification ID",
			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S3",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("margin10");
		
		
	 //   --------------------------------------  Inputs  --------------------------------------------------------
    	var oInputSerialNoEPMIFPU = new sap.ui.commons.TextField('idSerialNoEPMIFPU',{
    		layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12"}),
    		enabled: enabledGrp1EPMIFPU,
    		value:locallySavedMIFPU[0].Sernr,
    		placeholder: "Serial Number",
    		change:function(oControlEvent){
				this.setPlaceholder("Serial Number");
				this.setValueState(sap.ui.core.ValueState.None);
			},
    	}).addStyleClass("FormInputStyle margin5");
    	
    	/*var oModelGateDate = new sap.ui.model.json.JSONModel();
    	oModelGateDate.setData({
    		dateValue: new Date(errorProcessingMIFPU[0].GateDate)
    	});*/
    	
    	var oInputGateDateEPMIFPU = new sap.ui.commons.DatePicker('idGateDateEPMIFPU',{
    		value: {
                path: "/dateValue",
                type: new sap.ui.model.type.Date({pattern: "dd-MM-yyyy"})
    			},
    			enabled: enabledGrp2EPMIFPU,
    			yyyymmdd: locallySavedMIFPU[0].GateDate, 
    			placeholder: "Gate Date",
    			layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12"}),
    	});
    	//oInputGateDateEPMIFPU.setModel(oModelGateDate);
    	oInputGateDateEPMIFPU.addStyleClass("FormInputStyle margin5");
    	oInputGateDateEPMIFPU.attachChange(
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
    	
    	var oInputFuncLocEPMIFPU = new sap.ui.commons.TextField('idFuncLocEPMIFPU',{
     		layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12"}),
     		enabled: enabledGrp2EPMIFPU,
     		value:locallySavedMIFPU[0].DepotCode,
     		placeholder: "Functional Location",
     	}).addStyleClass("FormInputStyle margin5");
    	
    	/*var oModelTankDate = new sap.ui.model.json.JSONModel();
    	oModelTankDate.setData({
    		dateValue: new Date(errorProcessingMIFPU[0].TankCDate)
    	});*/
    	
    	var oInputCertificateDateEPMIFPU = new sap.ui.commons.DatePicker('idCertificateDateEPMIFPU',{
    		value: {
                path: "/dateValue",
                type: new sap.ui.model.type.Date({pattern: "dd-MM-yyyy"})
    			},
    			enabled: enabledGrp1EPMIFPU,
    			yyyymmdd: locallySavedMIFPU[0].TankCDate,
    			placeholder: "Tank Certificate Date",
    			layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12"}),
    	});
    	//oInputCertificateDateEPMIFPU.setModel(oModelTankDate);
    	oInputCertificateDateEPMIFPU.addStyleClass("FormInputStyle margin5");
    	oInputCertificateDateEPMIFPU.attachChange(
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
    	
    	var oInputTankCargoEPMIFPU = new sap.ui.commons.TextField('idTankCargoDescEPMIFPU',{
    		layoutData: new sap.ui.layout.GridData({span: "L8 M12 S12"}),
    		enabled: enabledGrp1EPMIFPU,
    		value:locallySavedMIFPU[0].CargoDesc,
    		placeholder: "Tank Last Cargo Desc",
    	}).addStyleClass("FormInputStyle margin5");
    	
    	 var oInputAssetNoEPMIFPU = new sap.ui.commons.TextField('idAssetNoEPMIFPU',{
    		layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12"}),
    		enabled: enabledGrp2EPMIFPU,
    		value:locallySavedMIFPU[0].AssetNo,
    		placeholder: "Asset Number",
    	}).addStyleClass("FormInputStyle margin5");
    	 
    	 var oInputEquipNoEPMIFPU = new sap.ui.commons.TextField('idEquipNoEPMIFPU',{
     		layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12"}),
     		enabled: enabledGrp2EPMIFPU,
     		value:locallySavedMIFPU[0].Equnr,
     		placeholder: "Equipment Number",
     	}).addStyleClass("FormInputStyle margin5");
    	 
    	 var oInputPlanGrpEPMIFPU = new sap.ui.commons.TextField('idPlanGrpEPMIFPU',{
      		layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12"}),
      		enabled: enabledGrp2EPMIFPU,
      		value:locallySavedMIFPU[0].Plangroup,
      		placeholder: "Planner Group",
      	}).addStyleClass("FormInputStyle margin5");
     	 
     	 var oInputWorkCenterEPMIFPU = new sap.ui.commons.TextField('idWorkCenterEPMIFPU',{
      		layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12"}),
      		enabled: enabledGrp2EPMIFPU,
      		value:locallySavedMIFPU[0].WorkCtr,
      		placeholder: "Work Center",
      	}).addStyleClass("FormInputStyle margin5");
     	 
     	var oInputSenderAddressEPMIFPU = new sap.ui.commons.TextField('idSenderAddressEPMIFPU',{
      		layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12"}),
      		enabled: enabledGrp2EPMIFPU,
      		value:locallySavedMIFPU[0].SendAddr,
      		placeholder: "Sender Address",
      		change:function(oControlEvent){
				this.setPlaceholder("Sender Address");
				this.setValueState(sap.ui.core.ValueState.None);
			},
      	}).addStyleClass("FormInputStyle margin5");
     	
     	var oCheckStatusAEPMIFPU = new sap.ui.commons.CheckBox('idStatusAEPMIFPU',{
      		layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12"}),
      		enabled: enabledGrp1EPMIFPU,
      		checked:locallySavedMIFPU[0].StatusAChecked,
      		placeholder: "Status A",
      	}).addStyleClass("margin5");
     	
     	var oInputRetAuthEPMIFPU = new sap.ui.commons.TextField('idRetAuthEPMIFPU',{
     		layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12"}),
     		enabled: enabledGrp2EPMIFPU,
     		value:locallySavedMIFPU[0].Auth,
     		placeholder: "Return Authorization",
     		change:function(oControlEvent){
				this.setPlaceholder("Return Authorization");
				this.setValueState(sap.ui.core.ValueState.None);
			},
     	}).addStyleClass("FormInputStyle margin5");
    	 
     	var oInputTankCleaningEPMIFPU = new sap.ui.commons.TextField('idTankCleaningEPMIFPU',{
     		layoutData: new sap.ui.layout.GridData({span: "L8 M12 S12"}),
     		enabled: enabledGrp1EPMIFPU,
     		value:locallySavedMIFPU[0].ProcDesc,
     		placeholder: "Tank Cleaning Proc Desc",
     	}).addStyleClass("FormInputStyle margin5");
     	
     	var oInputTTankNumberEPMIFPU = new sap.ui.commons.TextField('idTankNumberEPMIFPU',{
     		layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12"}),
     		enabled: enabledGrp1EPMIFPU,
     		value:locallySavedMIFPU[0].TankNo,
     		placeholder: "Tank Number",
     	}).addStyleClass("FormInputStyle margin5");
     	
     	var oInputCompCodeEPMIFPU = new sap.ui.commons.TextField('idCompCodeEPMIFPU',{
     		layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12"}),
     		enabled: enabledGrp2EPMIFPU,
     		value:locallySavedMIFPU[0].Bukrs,
     		placeholder: "Company Code",
     	}).addStyleClass("FormInputStyle margin5");
     	
     	var oInputMaterialTypeEPMIFPU = new sap.ui.commons.TextField('idMaterialTypeEPMIFPU',{
     		layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12"}),
     		enabled: enabledGrp2EPMIFPU,
     		value:locallySavedMIFPU[0].Matnr,
     		placeholder: "Material Type",
     	}).addStyleClass("FormInputStyle margin5");
     	
    	 var oInputSubAssetNoEPMIFPU = new sap.ui.commons.TextField('idSubAssetNoEPMIFPU',{
     		layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12"}),
     		enabled: enabledGrp2EPMIFPU,
     		value:locallySavedMIFPU[0].SubNumber,
     		placeholder: "Sub Asset Number",
     	}).addStyleClass("FormInputStyle margin5");
    	 
    	 var oInputNotificationIDEPMIFPU = new sap.ui.commons.TextField('idNotificationIDEPMIFPU',{
     		layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12"}),
     		enabled: enabledGrp2EPMIFPU,
     		value:locallySavedMIFPU[0].NotifId,
     		placeholder: "Notification ID",
     	}).addStyleClass("FormInputStyle margin5");
    	 
    	 
		  // Responsive Grid Layout
		    var oErrProcMIFPULayout = new sap.ui.layout.form.ResponsiveGridLayout("idErrProcMIFPULayout",{
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
		     var oErrProcMIFPUForm = new sap.ui.layout.form.Form("idErrProcMIFPUForm",{
		             layout: oErrProcMIFPULayout,
		             formContainers: [
		                     
		                     new sap.ui.layout.form.FormContainer("idErrProcMIFPUFormC1",{
		                         //title: "Move Out To Lease - Error Processing",
	                             formElements: [
													new sap.ui.layout.form.FormElement({
													    fields: [oLblSerialNoEPMIFPU, oInputSerialNoEPMIFPU ]
													}),
													new sap.ui.layout.form.FormElement({
													    fields: [oLabelGateDateEPMIFPU, oInputGateDateEPMIFPU ]
													}),
													new sap.ui.layout.form.FormElement({
													    fields: [oLabelFuncLocEPMIFPU, oInputFuncLocEPMIFPU ]
													}),
													new sap.ui.layout.form.FormElement({
													    fields: [oLabelTankCertificateDateMIFPU, oInputCertificateDateEPMIFPU ]
													}),
													new sap.ui.layout.form.FormElement({
													    fields: [oLabelTankLastCargoDescMIFPU, oInputTankCargoEPMIFPU ]
													}),
													new sap.ui.layout.form.FormElement({
													    fields: [oLabelAssetNoEPMIFPU, oInputAssetNoEPMIFPU ]
													}),
													new sap.ui.layout.form.FormElement({
													    fields: [oLabelEquipmentNoEPMIFPU, oInputEquipNoEPMIFPU ]
													}),
													new sap.ui.layout.form.FormElement({
													    fields: [oLabelPlannerGroupEPMIFPU, oInputPlanGrpEPMIFPU ]
													}),
													new sap.ui.layout.form.FormElement({
													    fields: [oLabelWorkCentrEPMIFPU, oInputWorkCenterEPMIFPU ]
													})
		                                     ],
		                                     layoutData: new sap.ui.layout.GridData({span: "L4 M9 S12"}),
		                     }),
		                     new sap.ui.layout.form.FormContainer("idErrProcMIFPUFormC2",{
	                             formElements: [
										new sap.ui.layout.form.FormElement({
										    fields: [oLabelSenderAddressEPMIFPU , oInputSenderAddressEPMIFPU ]
										}),
										new sap.ui.layout.form.FormElement({
										    fields: [oLabelStatusEPMIFPU , oCheckStatusAEPMIFPU ]
										}),
										new sap.ui.layout.form.FormElement({
										    fields: [oLabelReturnAuthorizationEPMIFPU , oInputRetAuthEPMIFPU ]
										}),
										new sap.ui.layout.form.FormElement({
										    fields: [oLabelTankNumberEPMIFPU , oInputTTankNumberEPMIFPU ]
										}),
										new sap.ui.layout.form.FormElement({
										    fields: [oLabelTankCleaningEPMIFPU , oInputTankCleaningEPMIFPU ]
										}),
										new sap.ui.layout.form.FormElement({
										    fields: [oLabelCompanyCodeEPMIFPU , oInputCompCodeEPMIFPU ]
										}),
										new sap.ui.layout.form.FormElement({
										    fields: [oLabelMaterialTypeEPMIFPU, oInputMaterialTypeEPMIFPU ]
										}),
										new sap.ui.layout.form.FormElement({
										    fields: [oLabelSubAssetNoEPMIFPU, oInputSubAssetNoEPMIFPU ]
										}),
										new sap.ui.layout.form.FormElement({
										    fields: [oLabelNotificationEPMIFPU, oInputNotificationIDEPMIFPU ]
										})
	                             
	                             ],
		                     layoutData: new sap.ui.layout.GridData({span: "L4 M9 S12"}),
	                     }),
		             ]
		     });
			     
		    // Buttons
		   	 var oBtnSaveEPMIFPU = new sap.m.Button("idBtnSubmitEPMIFPU",{
			          text : "Save",
			          width:"80px",
			          styled:false,
			          layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: true}),
			          press:function(){
			        	  //if(oCurrEPMIFPU.validateEPMIFPU())
			        		  oCurrEPMIFPU.saveDataLocallyMIFPU();
			        	  
			          }
		   	 }).addStyleClass("submitBtn marginTop10");
		   	 
		     var oButtonFlex = new sap.m.FlexBox({
		          items: [ 	oBtnSaveEPMIFPU  ],
		          width:"100%",
		          alignItems: sap.m.FlexAlignItems.Center,
		     });
		     
		     var oFormFlex = new sap.m.FlexBox({
		          items: [
		                  	oErrProcMIFPUForm,
		                  	oButtonFlex
		          ],
		          direction: "Column",
		     });
		     
		     return oFormFlex;
	},
	
/*	bindErrorProcessingData:function(){
		oCurrEPMIFPU = this;
		var tankCDatLocal, gateDatLocal, statusCheckedLocal;
		
		
		if(locallySavedMIFPU.length  == 0){  // If No Local Data - First Time
			if(errorProcessingMIFPU.length > 0){
				var yyyy, mm, dd;
				// TtcDate
	  			var vDocDateResult = errorProcessingMIFPU[0].TtcDate.split("(");
	            var vDocDate = vDocDateResult[1].split(")");
	            var vformattedDocDate = dateFormat(new Date(Number(vDocDate[0])), 'yyyy-mm-dd');
	            //this is to check if the date is default 999 something show blank
	            if (vformattedDocDate.substring(0,4) === "9999"){
	            		tankCDatLocal = "";
	            }
	            else{
	            	yyyy = vformattedDocDate.substring(0,4);
	            	mm = vformattedDocDate.substring(5,7);
	            	dd = vformattedDocDate.substring(8);
	            	
	            	tankCDatLocal = yyyy + mm + dd;
	            }
	            
	            // GateDate
	            vDocDateResult = errorProcessingMIFPU[0].InoutDate.split("(");
	            vDocDate = vDocDateResult[1].split(")");
	            vformattedDocDate = dateFormat(new Date(Number(vDocDate[0])), 'yyyy-mm-dd');
	            //this is to check if the date is default 999 something show blank
	            if (vformattedDocDate.substring(0,4) === "9999"){
	            		gateDatLocal = "";
	            }
	            else{
	            	yyyy = vformattedDocDate.substring(0,4);
	            	mm = vformattedDocDate.substring(5,7);
	            	dd = vformattedDocDate.substring(8);
	            	gateDatLocal = yyyy + mm + dd;
	            }
	            
				
				if(errorProcessingMIFPU[0].Statusa == "X"){
					statusCheckedLocal = true;
				}
				else{
					statusCheckedLocal = false;
				}
				locallySavedMIFPU.push({
					  'TranxId' : errorProcessingMIFPU[0].TranxId,
		    		  'Sernr': errorProcessingMIFPU[0].Sernr,
		    		  'GateDate': gateDatLocal,
		    		  'DepotCode': errorProcessingMIFPU[0].DepotCode,
		    		  'TankCDate': tankCDatLocal,
		    		  'CargoDesc': errorProcessingMIFPU[0].CargoDesc,
		    		  'AssetNo': errorProcessingMIFPU[0].AssetNo,
		    		  'Equnr': errorProcessingMIFPU[0].Equnr,
		    		  'Plangroup': errorProcessingMIFPU[0].Plangroup,
		    		  'WorkCtr': errorProcessingMIFPU[0].WorkCtr,
		    		  'SendAddr': errorProcessingMIFPU[0].SendAddr,
		    		  'StatusAChecked': statusCheckedLocal,
		    		  'Auth': errorProcessingMIFPU[0].Auth,
		    		  'ProcDesc': errorProcessingMIFPU[0].ProcDesc,
		    		  'TankNo': errorProcessingMIFPU[0].TankNo,
		    		  'Bukrs': errorProcessingMIFPU[0].Bukrs,
		    		  'MsgType': errorProcessingMIFPU[0].MsgType,
		    		  'SubNumber': errorProcessingMIFPU[0].SubNumber,
		    		  'NotifId': errorProcessingMIFPU[0].NotifId,
		            });
			}
		}
	},*/
	
	validateEPMIFPU:function(){
		isValid = true;
		var gateDate = sap.ui.getCore().byId("idGateDateEPMIFPU").getYyyymmdd();
		
		if(gateDate.trim().length > 0){
			var rxDatePattern = /^(\d{1,2})(\-|-)(\d{1,2})(\-|-)(\d{4})$/;
            var dtArray = gateDate.match(rxDatePattern);
            if (dtArray == null){
            	sap.ui.getCore().byId("idGateDateEPMIFPU").setValueState(sap.ui.core.ValueState.Error);
    			sap.ui.getCore().byId("idGateDateEPMIFPU").setPlaceholder("Invalid Date");
            	isValid = false;
             }
            else{
            	isValid = true;
            }
		}
		
		return isValid;
		
	},
	
	saveDataLocallyMIFPU:function(){
		var tranxId;
		if(errorProcessingMIFPU.length == 0){
			tranxId = "";
		}
		else{
			tranxId = errorProcessingMIFPU[0].TranxId;
		}
		locallySavedMIFPU = [];
		
		locallySavedMIFPU.push({
			  'TranxId' : tranxId,
    		  'Sernr': sap.ui.getCore().byId("idSerialNoEPMIFPU").getValue(),
    		  'GateDate': sap.ui.getCore().byId("idGateDateEPMIFPU").getYyyymmdd(),
    		  'DepotCode': sap.ui.getCore().byId("idFuncLocEPMIFPU").getValue(),
    		  'TankCDate': sap.ui.getCore().byId("idCertificateDateEPMIFPU").getYyyymmdd(),
    		  'CargoDesc': sap.ui.getCore().byId("idTankCargoDescEPMIFPU").getValue(),
    		  'AssetNo': sap.ui.getCore().byId("idAssetNoEPMIFPU").getValue(),
    		  'Equnr': sap.ui.getCore().byId("idEquipNoEPMIFPU").getValue(),
    		  'Plangroup': sap.ui.getCore().byId("idPlanGrpEPMIFPU").getValue(),
    		  'WorkCtr': sap.ui.getCore().byId("idWorkCenterEPMIFPU").getValue(),
    		  'SendAddr': sap.ui.getCore().byId("idSenderAddressEPMIFPU").getValue(),
    		  'StatusAChecked': sap.ui.getCore().byId("idStatusAEPMIFPU").getChecked(),
    		  'Auth': sap.ui.getCore().byId("idRetAuthEPMIFPU").getValue(),
    		  'ProcDesc': sap.ui.getCore().byId("idTankCleaningEPMIFPU").getValue(),
    		  'TankNo': sap.ui.getCore().byId("idTankNumberEPMIFPU").getValue(),
    		  'Bukrs': sap.ui.getCore().byId("idCompCodeEPMIFPU").getValue(),
    		  'Matnr': sap.ui.getCore().byId("idMaterialTypeEPMIFPU").getValue(),
    		  'SubNumber': sap.ui.getCore().byId("idSubAssetNoEPMIFPU").getValue(),
    		  'NotifId': sap.ui.getCore().byId("idNotificationIDEPMIFPU").getValue(),
            });
		
		var bus = sap.ui.getCore().getEventBus();
        bus.publish("nav", "back");
        $('#idHdrContnt').html('Move In From Lease'); //CHANGE HEADER CONTENT
	},
	
});
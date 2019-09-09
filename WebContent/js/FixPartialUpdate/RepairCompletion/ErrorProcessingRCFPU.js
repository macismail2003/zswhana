sap.ui.model.json.JSONModel.extend("errorProcessingRCFPUView", {
	
	createEPScreenFlexRCFPU:function(){
		ocurrentEPRCFPU = this;
		
		var back = new sap.m.Link({text: " < Back",
			width:"8%",
			wrapping:true,
            press: function(){
            
                   var bus = sap.ui.getCore().getEventBus();
                       bus.publish("nav", "back");
                       $('#idHdrContnt').html('Repair Completion'); //CHANGE HEADER CONTENT
        }});
		
		var oScreenFlex;
		if(btnFlagRCFPU == "P"){
			var tableRCFPU = ocurrentEPRCFPU.createEPTableRCFPU();
			var vHDivider = new sap.ui.commons.HorizontalDivider({width: "95%", type: "Area", height: "Medium"}).addStyleClass("marginTop30");
			var formRCFPU = ocurrentEPRCFPU.createEPFormRCFPU();
			
			 oScreenFlex = new sap.m.FlexBox({
		          items: [
		            back,
		            tableRCFPU,
		            vHDivider,
		            formRCFPU
		          ],
		          direction: "Column",
		     });
		}
		else{
			var formRCFPU = ocurrentEPRCFPU.createEPFormRCFPU();
			
			 oScreenFlex = new sap.m.FlexBox({
		          items: [
		            back,
		            formRCFPU
		          ],
		          direction: "Column",
		     });
		}
		
		
		return oScreenFlex;
		
	},
	
	createEPTableRCFPU:function(){
		
		var oEPRCFPUTable = new sap.ui.table.Table({
	        firstVisibleRow: 1,
	        columnHeaderHeight: 30,
	        selectionMode: sap.ui.table.SelectionMode.None,
	        width: "95%",
	     }).addStyleClass("tblBorder marginTop10");
		
		oEPRCFPUTable.addColumn(new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "Type"}),
	        template: new sap.ui.commons.TextView().bindProperty("text", "MsgType"),
	        resizable:false,
	        width: "40px",
		}));
		
		oEPRCFPUTable.addColumn(new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "Message"}),
	        template: new sap.ui.commons.TextView().bindProperty("text", "Message"),
	        resizable:false,
	        width: "200px",
		}));
		
		
		var oModelRCFPU = new sap.ui.model.json.JSONModel();
		oModelRCFPU.setData(errorProcessingRCFPU);
		
		oEPRCFPUTable.setModel(oModelRCFPU);
		oEPRCFPUTable.bindRows("/");
		oEPRCFPUTable.setVisibleRowCount(errorProcessingRCFPU.length);
		
		return oEPRCFPUTable;
	},
	
	createEPFormRCFPU: function(){
		ocurrentEPRCFPU = this;
		
		// Labels
		var oLblSerialNoEPRCFPU = new sap.ui.commons.Label({text: "Serial Number",
			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S3",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");
		
		var oLabelRepairDateEPRCFPU = new sap.ui.commons.Label({text: "Repair Date",
			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S3",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");
		
		var oLabelEstTypeEPRCFPU = new sap.ui.commons.Label({text: "Estimate Type",
			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S3",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");
		
		var oLabelAssetNoEPRCFPU = new sap.ui.commons.Label({text: "Asset Number",
			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S3",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");
		
		var oLabelEquipmentNoEPRCFPU = new sap.ui.commons.Label({text: "Equipment Number",
			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S3",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");
		
		var oLabelMaterialTypeEPRCFPU = new sap.ui.commons.Label({text: "Material Type",
			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S3",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");
		
		var oLabelSubAssetNoEPRCFPU = new sap.ui.commons.Label({text: "Sub Asset Number",
			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S3",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");
		
		var oLabelSenderAddrsEPRCFPU = new sap.ui.commons.Label({text: "Sender Address",
			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S3",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");
		
		var oLabelGateDateEPRCFPU = new sap.ui.commons.Label({text: "Gate Date",
			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S3",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");
		
		var oLabelUnitPartCodeEPRCFPU = new sap.ui.commons.Label({text: "Unit Part Code",
			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S3",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");
		
		var oLabelCompanyCodeEPRCFPU = new sap.ui.commons.Label({text: "Company Code",
			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S3",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");
		
		var oLabelFuncLocEPRCFPU = new sap.ui.commons.Label({text: "Functional Location",
			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S3",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");
		
		var oLabelPlannerGroupEPRCFPU = new sap.ui.commons.Label({text: "Planner Group",
			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S3",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");
		
		var oLabelWorkCentrEPRCFPU = new sap.ui.commons.Label({text: "Work Center",
			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S3",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");
		
		
		
		 // Text Field
    	var oInputSerialNoEPRCFPU = new sap.ui.commons.TextField('idSerialNoEPRCFPU',{
    		layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12"}),
    		enabled: enabledGrp2EPRCFPU,
    		value:locallySavedRCFPU[0].Sernr,
    		liveChange:function(){
    			 this.setValueState(sap.ui.core.ValueState.None);
    		},
    	}).addStyleClass("FormInputStyle marginTop10");
    	
    	var oInputGateDateEPRCFPU = new sap.ui.commons.DatePicker('idGateDateEPRCFPU',{
    		value: {
                path: "/dateValue",
                type: new sap.ui.model.type.Date({pattern: "dd-MM-yyyy"})
    			},
    			enabled: enabledGrp2EPRCFPU,
    			yyyymmdd: locallySavedRCFPU[0].GateDate, 
    			layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12"}),
    	});
    	//oInputDate.setYyyymmdd("20100101");
    	oInputGateDateEPRCFPU.addStyleClass("FormInputStyle marginTop10");
    	oInputGateDateEPRCFPU.setLocale("en-US");
    	oInputGateDateEPRCFPU.attachChange(
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
    	
    	var oInputRepairDateEPRCFPU = new sap.ui.commons.DatePicker('idRepairDateEPRCFPU',{
    		value: {
                path: "/dateValue",
                type: new sap.ui.model.type.Date({pattern: "dd-MM-yyyy"})
    			},
    			enabled: enabledGrp2EPRCFPU,
    			yyyymmdd: locallySavedRCFPU[0].RepairDate, 
    			layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12"}),
    	});
    	//oInputDate.setYyyymmdd("20100101");
    	oInputRepairDateEPRCFPU.addStyleClass("FormInputStyle marginTop10");
    	oInputRepairDateEPRCFPU.setLocale("en-US");
    	oInputRepairDateEPRCFPU.attachChange(
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
    	
    	 var oInputEstTypeEPRCFPU = new sap.ui.commons.TextField('idEstTypeEPRCFPU',{
      		layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12"}),
      		enabled: enabledGrp2EPRCFPU,
      		value:locallySavedRCFPU[0].EstType,
      	}).addStyleClass("FormInputStyle marginTop10");
    	 
    	 var oInputAssetNoEPRCFPU = new sap.ui.commons.TextField('idAssetNoEPRCFPU',{
     		layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12"}),
     		enabled: enabledGrp2EPRCFPU,
     		value:locallySavedRCFPU[0].AssetNo,
     	}).addStyleClass("FormInputStyle marginTop10");
     	 
     	 var oInputEquipNoEPRCFPU = new sap.ui.commons.TextField('idEquipNoEPRCFPU',{
      		layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12"}),
      		enabled: enabledGrp2EPRCFPU,
      		value:locallySavedRCFPU[0].Equnr,
      	}).addStyleClass("FormInputStyle marginTop10");
     	 
     	var oInputMaterialTypeEPRCFPU = new sap.ui.commons.TextField('idMaterialTypeEPRCFPU',{
     		layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12"}),
     		enabled: enabledGrp2EPRCFPU,
     		value:locallySavedRCFPU[0].Matnr,
     	}).addStyleClass("FormInputStyle marginTop10");
     	
     	 var oInputSubAssetNoEPRCFPU = new sap.ui.commons.TextField('idSubAssetNoEPRCFPU',{
      		layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12"}),
      		enabled: enabledGrp2EPRCFPU,
      		value:locallySavedRCFPU[0].SubNumber,
      	}).addStyleClass("FormInputStyle marginTop10");
     	
     	 var oInputSenderAddrsEPRCFPU = new sap.ui.commons.TextField('idSenderAddrsEPRCFPU',{
       		layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12"}),
       		enabled: enabledGrp2EPRCFPU,
       		value:locallySavedRCFPU[0].SendrAddrs,
       	}).addStyleClass("FormInputStyle marginTop10");
    	
    	var oInputUnitPartCodeEPRCFPU = new sap.ui.commons.TextField('idUnitPartCodeEPRCFPU',{
      		layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12"}),
      		enabled: enabledGrp2EPRCFPU,
      		value:locallySavedRCFPU[0].UnitPartCode,
      	}).addStyleClass("FormInputStyle marginTop10");
    	
    	var oInputCompCodeEPRCFPU = new sap.ui.commons.TextField('idCompCodeEPRCFPU',{
     		layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12"}),
     		enabled: enabledGrp2EPRCFPU,
     		value:locallySavedRCFPU[0].Bukrs,
     	}).addStyleClass("FormInputStyle marginTop10");
   	 
    	var oInputFuncLocEPRCFPU = new sap.ui.commons.TextField('idFuncLocEPRCFPU',{
     		layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12"}),
     		enabled: enabledGrp2EPRCFPU,
     		value:locallySavedRCFPU[0].FuncLoc,
     	}).addStyleClass("FormInputStyle marginTop10");
    	
    	 var oInputPlanGrpEPRCFPU = new sap.ui.commons.TextField('idPlanGrpEPRCFPU',{
       		layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12"}),
       		enabled: enabledGrp2EPRCFPU,
       		value:locallySavedRCFPU[0].Plangroup,
       	}).addStyleClass("FormInputStyle marginTop10");
    	
    	 var oInputWorkCenterEPRCFPU = new sap.ui.commons.TextField('idWorkCenterEPRCFPU',{
       		layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12"}),
       		enabled: enabledGrp2EPRCFPU,
       		value:locallySavedRCFPU[0].WorkCtr,
       	}).addStyleClass("FormInputStyle marginTop10");
    	 
	 // Responsive Grid Layout
	    var oErrProcRCFPULayout = new sap.ui.layout.form.ResponsiveGridLayout("idErrProcRCFPULayout",{
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
	     var oErrProcRCFPUForm = new sap.ui.layout.form.Form("idErrProcRCFPUForm",{
	             layout: oErrProcRCFPULayout,
	             formContainers: [
	                     
	                     new sap.ui.layout.form.FormContainer("idErrProcRCFPUFormC1",{
	                         //title: "Move Out To Lease - Error Processing",
                            formElements: [
												new sap.ui.layout.form.FormElement({
												    fields: [oLblSerialNoEPRCFPU, oInputSerialNoEPRCFPU ]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oLabelRepairDateEPRCFPU, oInputRepairDateEPRCFPU ]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oLabelEstTypeEPRCFPU, oInputEstTypeEPRCFPU ]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oLabelAssetNoEPRCFPU, oInputAssetNoEPRCFPU ]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oLabelEquipmentNoEPRCFPU, oInputEquipNoEPRCFPU ]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oLabelMaterialTypeEPRCFPU, oInputMaterialTypeEPRCFPU ]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oLabelSubAssetNoEPRCFPU, oInputSubAssetNoEPRCFPU ]
												})
	                                     ],
	                                     layoutData: new sap.ui.layout.GridData({span: "L4 M9 S12"}),
	                     }),
	                     new sap.ui.layout.form.FormContainer("idErrProcRCFPUFormC2",{
                            formElements: [
                                       	new sap.ui.layout.form.FormElement({
											    fields: [oLabelSenderAddrsEPRCFPU, oInputSenderAddrsEPRCFPU]
											}),
											new sap.ui.layout.form.FormElement({
											    fields: [oLabelGateDateEPRCFPU , oInputGateDateEPRCFPU  ]
											}),
											new sap.ui.layout.form.FormElement({
											    fields: [oLabelUnitPartCodeEPRCFPU , oInputUnitPartCodeEPRCFPU ]
											}),
											new sap.ui.layout.form.FormElement({
											    fields: [oLabelCompanyCodeEPRCFPU , oInputCompCodeEPRCFPU ]
											}),
											new sap.ui.layout.form.FormElement({
											    fields: [oLabelFuncLocEPRCFPU , oInputFuncLocEPRCFPU ]
											}),
											new sap.ui.layout.form.FormElement({
											    fields: [oLabelPlannerGroupEPRCFPU, oInputPlanGrpEPRCFPU ]
											}),
											new sap.ui.layout.form.FormElement({
											    fields: [oLabelWorkCentrEPRCFPU, oInputWorkCenterEPRCFPU ]
											})
                            ],
	                     layoutData: new sap.ui.layout.GridData({span: "L4 M9 S12"}),
                    }),
	             ]
	     });
	     
	     var oFormFlex = new sap.m.FlexBox({
	          items: [
	                  	oErrProcRCFPUForm,
	          ],
	          direction: "Column",
	     });
	     
	     return oFormFlex;
	}
});
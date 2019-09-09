sap.ui.model.json.JSONModel.extend("errorProcessingMOTLView", {
	
	createEPScreenFlexMOTL:function(){
		ocurrentEPMOFPU = this;
		
		var back = new sap.m.Link({text: " < Back",
			width:"8%",
			wrapping:true,
            press: function(){
            
                   var bus = sap.ui.getCore().getEventBus();
                       bus.publish("nav", "back");
                       $('#idHdrContnt').html('Move Out To Lease'); //CHANGE HEADER CONTENT
        }});
		
		var oScreenFlex;
		if(btnFlagGateOutFPU == "P"){
			var tableMOFPU = ocurrentEPMOFPU.createEPTableMOFPU();
			var vHDivider = new sap.ui.commons.HorizontalDivider({width: "95%", type: "Area", height: "Medium"}).addStyleClass("marginTop30");
			var formMOFPU = ocurrentEPMOFPU.createEPFormMOFPU();
			
			 oScreenFlex = new sap.m.FlexBox({
		          items: [
		            back,
		            tableMOFPU,
		            vHDivider,
		            formMOFPU
		          ],
		          direction: "Column",
		     });
		}
		else{
			var formMOFPU = ocurrentEPMOFPU.createEPFormMOFPU();
			
			 oScreenFlex = new sap.m.FlexBox({
		          items: [
		            back,
		            formMOFPU
		          ],
		          direction: "Column",
		     });
		}
		
		
		return oScreenFlex;
		
	},
	
	createEPTableMOFPU:function(){
		
		var oEPMOFPUTable = new sap.ui.table.Table({
	        firstVisibleRow: 1,
	        columnHeaderHeight: 30,
	        selectionMode: sap.ui.table.SelectionMode.None,
	        width: "95%",
	     }).addStyleClass("tblBorder marginTop10");
		
		oEPMOFPUTable.addColumn(new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "Type"}),
	        template: new sap.ui.commons.TextView().bindProperty("text", "MsgType"),
	        resizable:false,
	        width: "40px",
		}));
		
		oEPMOFPUTable.addColumn(new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "Message"}),
	        template: new sap.ui.commons.TextView().bindProperty("text", "Message"),
	        resizable:false,
	        width: "200px",
		}));
		
		
		var oModelMOFPU = new sap.ui.model.json.JSONModel();
		oModelMOFPU.setData(errorProcessingMOFPU);
		
		oEPMOFPUTable.setModel(oModelMOFPU);
		oEPMOFPUTable.bindRows("/");
		oEPMOFPUTable.setVisibleRowCount(errorProcessingMOFPU.length);
		
		return oEPMOFPUTable;
	},
	
	createEPFormMOFPU: function(){
		ocurrentEPMOFPU = this;

		// Labels
		var oLblSerialNoEPMOFPU = new sap.ui.commons.Label({text: "Serial Number",
			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S3",linebreak: true, margin: true}),
			//required: true,
            wrapping: true}).addStyleClass("marginTop10");
		
		var oLabelGateDateEPMOFPU = new sap.ui.commons.Label({text: "Gate Date",
			//required: true,
			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S3",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");
		
		var oLabelAssetNoEPMOFPU = new sap.ui.commons.Label({text: "Asset Number",
			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S3",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");
		
		var oLabelEquipmentNoEPMOFPU = new sap.ui.commons.Label({text: "Equipment Number",
			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S3",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");
		
		var oLabelMaterialTypeEPMOFPU = new sap.ui.commons.Label({text: "Material Type",
			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S3",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");
		
		var oLabelSubAssetNoEPMOFPU = new sap.ui.commons.Label({text: "Sub Asset Number",
			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S3",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");
		
		var oLabelLeaseContractNoEPMOFPU = new sap.ui.commons.Label({text: "Lease Contract Number",
			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S3",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");
		
		var oLabelDepotEPMOFPU = new sap.ui.commons.Label({text: "Depot",
			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S3",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");
		
		var oLabelReleaseAuthorizationEPMOFPU = new sap.ui.commons.Label({text: "Release Authorisation",
			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S3",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");
		
		var oLabelCompanyCodeEPMOFPU = new sap.ui.commons.Label({text: "Company Code",
			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S3",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");
		
		var oLabelFuncLocMOFPU = new sap.ui.commons.Label({text: "Functional Location",
			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S3",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");
		
		var oLabelPlannerGroupEPMOFPU = new sap.ui.commons.Label({text: "Planner Group",
			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S3",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");
		
		var oLabelWorkCentrEPMOFPU = new sap.ui.commons.Label({text: "Work Center",
			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S3",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");
		
	 // Text Field
    	var oInputSerialNoEPMOFPU = new sap.ui.commons.TextField('idSerialNoEPMOFPU',{
    		layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12"}),
    		enabled: enabledGrp2EPMOFPU,
    		value:locallySavedMOFPU[0].Sernr,
    		liveChange:function(){
    			 this.setValueState(sap.ui.core.ValueState.None);
    		},
    	}).addStyleClass("FormInputStyle marginTop10");
    	
    	var oInputGateDateEPMOFPU = new sap.ui.commons.DatePicker('idGateDateEPMOFPU',{
    		value: {
                path: "/dateValue",
                type: new sap.ui.model.type.Date({pattern: "dd-MM-yyyy"})
    			},
    			enabled: enabledGrp2EPMOFPU,
    			yyyymmdd: locallySavedMOFPU[0].GateDate, 
    			layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12"}),
    	});
    	//oInputDate.setYyyymmdd("20100101");
    	oInputGateDateEPMOFPU.addStyleClass("FormInputStyle marginTop10");
    	oInputGateDateEPMOFPU.setLocale("en-US");
    	oInputGateDateEPMOFPU.attachChange(
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
    	
    	 var oInputAssetNoEPMOFPU = new sap.ui.commons.TextField('idAssetNoEPMOFPU',{
     		layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12"}),
     		enabled: enabledGrp2EPMOFPU,
     		value:locallySavedMOFPU[0].AssetNo,
     	}).addStyleClass("FormInputStyle marginTop10");
     	 
     	 var oInputEquipNoEPMOFPU = new sap.ui.commons.TextField('idEquipNoEPMOFPU',{
      		layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12"}),
      		enabled: enabledGrp2EPMOFPU,
      		value:locallySavedMOFPU[0].Equnr,
      	}).addStyleClass("FormInputStyle marginTop10");
     	 
     	var oInputMaterialTypeEPMOFPU = new sap.ui.commons.TextField('idMaterialTypeEPMOFPU',{
     		layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12"}),
     		enabled: enabledGrp2EPMOFPU,
     		value:locallySavedMOFPU[0].Matnr,
     	}).addStyleClass("FormInputStyle marginTop10");
     	
     	 var oInputSubAssetNoEPMOFPU = new sap.ui.commons.TextField('idSubAssetNoEPMOFPU',{
      		layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12"}),
      		enabled: enabledGrp2EPMOFPU,
      		value:locallySavedMOFPU[0].SubNumber,
      	}).addStyleClass("FormInputStyle marginTop10");
     	
     	 var oInputLeaseContractNoEPMOFPU = new sap.ui.commons.TextField('idLeaseContractNoEPMOFPU',{
       		layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12"}),
       		enabled: enabledGrp2EPMOFPU,
       		value:locallySavedMOFPU[0].LeaseNo,
       	}).addStyleClass("FormInputStyle marginTop10");
    	
    	var oInputDepotEPMOFPU = new sap.ui.commons.TextField('idDepotEPMOFPU',{
      		layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12"}),
      		enabled: enabledGrp2EPMOFPU,
      		value:locallySavedMOFPU[0].Depot,
      	}).addStyleClass("FormInputStyle marginTop10");
    	
    	var oInputRelAuthEPMOFPU = new sap.ui.commons.TextField('idRelAuthEPMOFPU',{
     		layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12"}),
     		enabled: enabledGrp2EPMOFPU,
     		value:locallySavedMOFPU[0].Auth,
     	}).addStyleClass("FormInputStyle marginTop10");
    	
    	var oInputCompCodeEPMOFPU = new sap.ui.commons.TextField('idCompCodeEPMOFPU',{
     		layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12"}),
     		enabled: enabledGrp2EPMOFPU,
     		value:locallySavedMOFPU[0].Bukrs,
     	}).addStyleClass("FormInputStyle marginTop10");
   	 
    	var oInputFuncLocEPMOFPU = new sap.ui.commons.TextField('idFuncLocEPMOFPU',{
     		layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12"}),
     		enabled: enabledGrp2EPMOFPU,
     		value:locallySavedMOFPU[0].DepotCode,
     	}).addStyleClass("FormInputStyle marginTop10");
    	
    	 var oInputPlanGrpEPMOFPU = new sap.ui.commons.TextField('idPlanGrpEPMOFPU',{
       		layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12"}),
       		enabled: enabledGrp2EPMOFPU,
       		value:locallySavedMOFPU[0].Plangroup,
       	}).addStyleClass("FormInputStyle marginTop10");
    	
    	 var oInputWorkCenterEPMOFPU = new sap.ui.commons.TextField('idWorkCenterEPMOFPU',{
       		layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12"}),
       		enabled: enabledGrp2EPMOFPU,
       		value:locallySavedMOFPU[0].WorkCtr,
       	}).addStyleClass("FormInputStyle marginTop10");
    	 
    	
    	// Buttons
	   	/* var oBtnSaveEPMOFPU = new sap.m.Button("idBtnSubmitEPMOFPU",{
		          text : "Save",
		          width:"80px",
		          styled:false,
		          layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: true}),
		          press:function(){
		        	 if(ocurrentEPMOFPU.validateLocalDataMOTL())
		        		 ocurrentEPMOFPU.SaveDataLocalllyEPMOTL();
		          }
	   	 }).addStyleClass("submitBtn marginTop10");*/
	   	 
			  // Responsive Grid Layout
			    var oErrProcMOFPULayout = new sap.ui.layout.form.ResponsiveGridLayout("idErrProcMOFPULayout",{
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
			     var oErrProcMOFPUForm = new sap.ui.layout.form.Form("idErrProcMOFPUForm",{
			             layout: oErrProcMOFPULayout,
			             formContainers: [
			                     
			                     new sap.ui.layout.form.FormContainer("idErrProcMOFPUFormC1",{
			                         //title: "Move Out To Lease - Error Processing",
		                             formElements: [
														new sap.ui.layout.form.FormElement({
														    fields: [oLblSerialNoEPMOFPU, oInputSerialNoEPMOFPU ]
														}),
														new sap.ui.layout.form.FormElement({
														    fields: [oLabelGateDateEPMOFPU, oInputGateDateEPMOFPU ]
														}),
														new sap.ui.layout.form.FormElement({
														    fields: [oLabelAssetNoEPMOFPU, oInputAssetNoEPMOFPU ]
														}),
														new sap.ui.layout.form.FormElement({
														    fields: [oLabelEquipmentNoEPMOFPU, oInputEquipNoEPMOFPU ]
														}),
														new sap.ui.layout.form.FormElement({
														    fields: [oLabelMaterialTypeEPMOFPU, oInputMaterialTypeEPMOFPU ]
														}),
														new sap.ui.layout.form.FormElement({
														    fields: [oLabelSubAssetNoEPMOFPU, oInputSubAssetNoEPMOFPU ]
														}),
														new sap.ui.layout.form.FormElement({
														    fields: [oLabelLeaseContractNoEPMOFPU, oInputLeaseContractNoEPMOFPU ]
														})
			                                     ],
			                                     layoutData: new sap.ui.layout.GridData({span: "L4 M9 S12"}),
			                     }),
			                     new sap.ui.layout.form.FormContainer("idErrProcMOFPUFormC2",{
		                             formElements: [
		                                        	new sap.ui.layout.form.FormElement({
													    fields: [oLabelDepotEPMOFPU, oInputDepotEPMOFPU ]
													}),
													new sap.ui.layout.form.FormElement({
													    fields: [oLabelReleaseAuthorizationEPMOFPU , oInputRelAuthEPMOFPU ]
													}),
													new sap.ui.layout.form.FormElement({
													    fields: [oLabelCompanyCodeEPMOFPU , oInputCompCodeEPMOFPU ]
													}),
													new sap.ui.layout.form.FormElement({
													    fields: [oLabelFuncLocMOFPU , oInputFuncLocEPMOFPU ]
													}),
													new sap.ui.layout.form.FormElement({
													    fields: [oLabelPlannerGroupEPMOFPU, oInputPlanGrpEPMOFPU ]
													}),
													new sap.ui.layout.form.FormElement({
													    fields: [oLabelWorkCentrEPMOFPU, oInputWorkCenterEPMOFPU ]
													})
		                             ],
			                     layoutData: new sap.ui.layout.GridData({span: "L4 M9 S12"}),
		                     }),
			             ]
			     });
			     
			    /* var oButtonFlex = new sap.m.FlexBox({
			          items: [ 	oBtnSaveEPMOFPU  ],
			          width:"100%",
			          alignItems: sap.m.FlexAlignItems.Center,
			     });*/
			     
			     var oFormFlex = new sap.m.FlexBox({
			          items: [
			                  	oErrProcMOFPUForm,
			                  //	oButtonFlex
			          ],
			          direction: "Column",
			     });
			     
			     return oFormFlex;
	},
	
/*	bindErrorProcessingDataMOTL:function(){
		oCurrEPMIFPU = this;
		var GateDateLocal = "";
		var oUtil = new utility();
		
		if(locallySavedMOFPU.length  == 0){  // If No Local Data - First Time
			if(errorProcessingMOFPU.length > 0){
				var yyyy, mm, dd;
				// Gate Date
	  			var vGateDate = errorProcessingMOFPU[0].InoutDate.split("(");
	            var vDate = vGateDate[1].split(")");
	            var vformattedGateDate = dateFormat(new Date(Number(vDate[0])), 'yyyy-mm-dd');
	            //this is to check if the date is default 999 something show blank
	            if (vformattedGateDate.substring(0,4) === "9999"){
	            	GateDateLocal = "";
	            }
	            else{
	            	yyyy = vformattedGateDate.substring(0,4);
	            	mm = vformattedGateDate.substring(5,7);
	            	dd = vformattedGateDate.substring(8);
	            	
	            	GateDateLocal = yyyy + mm + dd;
	            }
	            
				locallySavedMOFPU.push({
					  'TranxId' : errorProcessingMOFPU[0].TranxId,
		    		  'Sernr': errorProcessingMOFPU[0].Sernr.toUpperCase(),
		    		  'GateDate': GateDateLocal,
		    		  'AssetNo': errorProcessingMOFPU[0].AssetNo,
		    		  'Equnr': errorProcessingMOFPU[0].Equnr,
		    		  'MatType':errorProcessingMOFPU[0].Matnr, //material type
		    		  'SubNumber': errorProcessingMOFPU[0].SubNumber, //sub asset number
		    		  'LeaseNo':errorProcessingMOFPU[0].LeaseNo, ////lease contract number
		    		  'DepotCode': errorProcessingMOFPU[0].DepotCode,
		    		  'Auth': errorProcessingMOFPU[0].Auth, //rel auth
		    		  'Bukrs':errorProcessingMOFPU[0].Bukrs, //company code
		    		  'FuncLoc':errorProcessingMOFPU[0].DepotCode, //Functional Location
		    		  'Plangroup': errorProcessingMOFPU[0].Plangroup,
		    		  'Depot':oUtil.removeLeadZero(errorProcessingMOFPU[0].WorkCtr),
		    		  'WorkCtr': oUtil.removeLeadZero(errorProcessingMOFPU[0].WorkCtr)
		            });
			}
		}
	},*/
	
	validateLocalDataMOTL: function(){
		var serialNo = sap.ui.getCore().byId("idSerialNoEPMOFPU").getValue();
		var gateDate = sap.ui.getCore().byId("idGateDateEPMOFPU").getYyyymmdd();
		var valid = true;
		
		if(serialNo.trim().length == 0){
			valid = false;
			sap.ui.getCore().byId("idSerialNoEPMOFPU").setValueState(sap.ui.core.ValueState.Error);
			sap.ui.getCore().byId("idSerialNoEPMOFPU").setValue("");
			sap.ui.getCore().byId("idSerialNoEPMOFPU").setPlaceholder("Required");
		}
		
		if(gateDate.trim().length == 0){
			valid = false;
			sap.ui.getCore().byId("idGateDateEPMOFPU").setValueState(sap.ui.core.ValueState.Error);
			sap.ui.getCore().byId("idGateDateEPMOFPU").setValue("");
			sap.ui.getCore().byId("idGateDateEPMOFPU").setPlaceholder("Required");
		}
		
		return valid;
		
	}, //validateLocalDataMOTL
	
	SaveDataLocalllyEPMOTL: function(){
		var tranxId;
		if(errorProcessingMOFPU.length == 0){
			tranxId = "";
		}
		else{
			tranxId = errorProcessingMOFPU[0].TranxId;
		}
		locallySavedMOFPU = [];
		var oUtil = new utility();
		locallySavedMOFPU.push({
			  'TranxId' : tranxId,
    		  'Sernr': sap.ui.getCore().byId("idSerialNoEPMOFPU").getValue().toUpperCase(),
    		  'GateDate': sap.ui.getCore().byId("idGateDateEPMOFPU").getYyyymmdd(),
    		  'AssetNo': sap.ui.getCore().byId("idAssetNoEPMOFPU").getValue(),
    		  'Equnr': sap.ui.getCore().byId("idEquipNoEPMOFPU").getValue(),
    		  'Matnr':sap.ui.getCore().byId("idMaterialTypeEPMOFPU").getValue(), //material type
    		  'SubNumber': sap.ui.getCore().byId("idSubAssetNoEPMOFPU").getValue(), //sub asset number
    		  'LeaseNo':sap.ui.getCore().byId("idLeaseContractNoEPMOFPU").getValue(), ////lease contract number
    		  'DepotCode': sap.ui.getCore().byId("idFuncLocEPMOFPU").getValue(),
    		  'Auth': sap.ui.getCore().byId("idRelAuthEPMOFPU").getValue(), //rel auth
    		  'Bukrs':sap.ui.getCore().byId("idCompCodeEPMOFPU").getValue(), //company code
    		  'FuncLoc': sap.ui.getCore().byId("idFuncLocEPMOFPU").getValue(), //Functional Location
    		  'Plangroup': sap.ui.getCore().byId("idPlanGrpEPMOFPU").getValue(),
    		  'Depot': oUtil.removeLeadZero(sap.ui.getCore().byId("idDepotEPMOFPU").getValue()),
    		  'WorkCtr': oUtil.removeLeadZero(sap.ui.getCore().byId("idWorkCenterEPMOFPU").getValue()),
            });
		
		var bus = sap.ui.getCore().getEventBus();
        bus.publish("nav", "back");
        $('#idHdrContnt').html('Move Out To Lease'); //CHANGE HEADER CONTENT
	}, //SaveDataLocalllyEPMOTL
});
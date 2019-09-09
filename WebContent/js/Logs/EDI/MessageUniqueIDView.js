/******** NP *******/

/*
 * **$*$------------------------------------------------------------------------*
*$*$ Modified By : Seyed Ismail MAC
*$*$ Modified On : 29.07.2015
*$*$ Reference   : RTS 1261
*$*$ Transport   : CGWK901010
*$*$ Tag         : MAC29072015
*$*$ Purpose     : Date Format Change
*$*$---------------------------------------------------------------------
**$*$------------------------------------------------------------------------*
*$*$ Modified By : Seyed Ismail MAC
*$*$ Modified On : 05.08.2015
*$*$ Reference   : RTS 1261
*$*$ Transport   : CGWK901028
*$*$ Tag         : MAC05082015
*$*$ Purpose     : Date Format Change
*$*$---------------------------------------------------------------------
 * */
jQuery.sap.require("sap.ui.model.json.JSONModel");

var oModelMsgUniqueIDDetEDITL;
var oModelErrorsTableEDITL;

sap.ui.model.json.JSONModel.extend("messageUniqueIDEDITLView", {
	
	createMessageUniqueID: function(){
		
		var oCurrMUIDEDITL = this;
		
		var bckFrmMsgUniqueIDDetToFMEDITL = new sap.m.Link("idBckFrmMsgUniqueIDDetToFMEDITL", {
			text: " < Back",
            width:"9%",
            wrapping:true,
            press: function(){
                    var bus = sap.ui.getCore().getEventBus();
                    bus.publish("nav", "back");
            }}).addStyleClass("marginTop10");
		
		var oLabelSpaceMUIDEDITL = new sap.ui.commons.Label({text: " ",
			width:"8px",
            wrapping: true});
		
		var oLabelSpaceMUIDEDITL1 = new sap.ui.commons.Label({text: " ",
			layoutData: new sap.ui.layout.GridData({span: "L1 M4 S12"}),
            wrapping: true});
		
		var oLabelSpaceMUIDEDITL2 = new sap.ui.commons.Label({text: " ",
			layoutData: new sap.ui.layout.GridData({span: "L1 M4 S12"}),
            wrapping: true});
		
		var oLabelSpaceMUIDEDITL3 = new sap.ui.commons.Label({text: " ",
			layoutData: new sap.ui.layout.GridData({span: "L1 M4 S12"}),
            wrapping: true});
		
		var oLabelSpaceMUIDEDITL4 = new sap.ui.commons.Label({text: " ",
			layoutData: new sap.ui.layout.GridData({span: "L1 M4 S12"}),
            wrapping: true});
		
		var oLabelSpaceMUIDEDITL5 = new sap.ui.commons.Label({text: " ",
			layoutData: new sap.ui.layout.GridData({span: "L1 M4 S12"}),
            wrapping: true});
		
		var oLabelSpaceMUIDEDITL6 = new sap.ui.commons.Label({text: " ",
			layoutData: new sap.ui.layout.GridData({span: "L1 M4 S12"}),
            wrapping: true});
		
		var oLabelSpaceMUIDEDITL7 = new sap.ui.commons.Label({text: " ",
			layoutData: new sap.ui.layout.GridData({span: "L1 M4 S12"}),
            wrapping: true});
		
		var oLabelSpaceMUIDEDITL8 = new sap.ui.commons.Label({text: " ",
			layoutData: new sap.ui.layout.GridData({span: "L1 M4 S12"}),
            wrapping: true});
		
		var oLabelSpaceMUIDEDITL9 = new sap.ui.commons.Label({text: " ",
			layoutData: new sap.ui.layout.GridData({span: "L1 M4 S12"}),
            wrapping: true});
		
		var oLabelTitleMUIDEDITL = new sap.ui.commons.Label("idMsgUniqueIDDetTitleEDITL",{
            wrapping: true}).addStyleClass("sapUiFormTitle marginTop10");
		
		var oHorDivider = new sap.ui.commons.HorizontalDivider({width: "100%", type: "Area", height: "Medium"}).addStyleClass("marginTop10");
		
		var oHorDivider1 = new sap.ui.commons.HorizontalDivider({width: "100%", type: "Area", height: "Medium"}).addStyleClass("marginTop10");
		
		var oHorDivide2 = new sap.ui.commons.HorizontalDivider({width: "100%", type: "Area", height: "Medium"}).addStyleClass("marginTop10");
		
		var oHorDivide3 = new sap.ui.commons.HorizontalDivider({width: "100%", type: "Area", height: "Medium"}).addStyleClass("marginTop10");
		
		var oHorDivide4 = new sap.ui.commons.HorizontalDivider({width: "100%", type: "Area", height: "Medium"}).addStyleClass("marginTop10");
		
		//Labels
		var oLabelSerialNumbr = new sap.ui.commons.Label({text: "Serial Number",
			layoutData: new sap.ui.layout.GridData({span: "L4 M5 S12",linebreak: false, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");
		
		var oLabelMsgType = new sap.ui.commons.Label({text: "Message Type",
			layoutData: new sap.ui.layout.GridData({span: "L4 M5 S12",linebreak: false, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");
		
		var oLabelUserName = new sap.ui.commons.Label({text: "User Name",
			layoutData: new sap.ui.layout.GridData({span: "L4 M5 S12",linebreak: false, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");
		
		var oLabelGateDate = new sap.ui.commons.Label({text: "Gate Date",
			layoutData: new sap.ui.layout.GridData({span: "L4 M5 S12",linebreak: false, margin: true}),
            wrapping: true}).addStyleClass("marginTop68");
		
		var oLabelSenderAddr = new sap.ui.commons.Label({text: "Sender Address",
			layoutData: new sap.ui.layout.GridData({span: "L4 M5 S12",linebreak: false, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");
		
		var oLabelFuncLoc = new sap.ui.commons.Label({text: "Functional Location",
			layoutData: new sap.ui.layout.GridData({span: "L4 M5 S12",linebreak: false, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");
		
		var oLabelContType = new sap.ui.commons.Label({text: "Container Type",
			layoutData: new sap.ui.layout.GridData({span: "L4 M5 S12",linebreak: false, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");
		
		var oLabelCondnCode = new sap.ui.commons.Label({text: "Condition Code",
			layoutData: new sap.ui.layout.GridData({span: "L4 M5 S12",linebreak: false, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");
		
		var oLabelRelNumbr = new sap.ui.commons.Label({text: "Release Number",
			layoutData: new sap.ui.layout.GridData({span: "L4 M5 S12",linebreak: false, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");
		
		var oLabelTransNumbr = new sap.ui.commons.Label({text: "Transaction Number",
			layoutData: new sap.ui.layout.GridData({span: "L4 M5 S12",linebreak: false, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");
		
		var oLabelCondGrade = new sap.ui.commons.Label({text: "Condition Grade",
			layoutData: new sap.ui.layout.GridData({span: "L4 M5 S12",linebreak: false, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");
		
		var oLabelPOLineItem = new sap.ui.commons.Label({text: "PO Line Item",
			layoutData: new sap.ui.layout.GridData({span: "L4 M5 S12",linebreak: false, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");
		
		var oLabelPONumbr = new sap.ui.commons.Label({text: "PO Number",
			layoutData: new sap.ui.layout.GridData({span: "L4 M5 S12",linebreak: false, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");
		
		var oLabelUnitPartCode = new sap.ui.commons.Label({text: "Unit Part Code",
			layoutData: new sap.ui.layout.GridData({span: "L4 M5 S12",linebreak: false, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");
		
		var oLabelEstTypeCode = new sap.ui.commons.Label({text: "Estimate Type Code",
			layoutData: new sap.ui.layout.GridData({span: "L4 M5 S12",linebreak: false, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");
		
		var oLabelTankNumbr = new sap.ui.commons.Label({text: "Tank Number",
			layoutData: new sap.ui.layout.GridData({span: "L4 M5 S12",linebreak: false, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");
		
		var oLabelDesc = new sap.ui.commons.Label({text: "Description",
			layoutData: new sap.ui.layout.GridData({span: "L4 M5 S12",linebreak: false, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");
		
		var oLabelTankClnDesc = new sap.ui.commons.Label({text: "Tank Cleaning Description",
			layoutData: new sap.ui.layout.GridData({span: "L4 M5 S12",linebreak: false, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");
		
		var oLabelTankCertDate = new sap.ui.commons.Label({text: "Tank Certification Date",
			layoutData: new sap.ui.layout.GridData({span: "L4 M5 S12",linebreak: false, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");
		
		//Text Fields
		var oInputSerialNumbrMUIDEDITL = new sap.ui.commons.TextField('idSerNoMUIDEDITL',{
			layoutData: new sap.ui.layout.GridData({span: "L6 M6 S12",linebreak: false, margin: true}),
    	}).addStyleClass("FormInputStyle marginTop10");
		
		var oInputMsgTypeMUIDEDITL = new sap.ui.commons.TextField('idMsgTypeMUIDEDITL',{
    		layoutData: new sap.ui.layout.GridData({span: "L6 M6 S12",linebreak: false, margin: true}),
    	}).addStyleClass("FormInputStyle marginTop10");
		
		var oInputUserNameMUIDEDITL = new sap.ui.commons.TextField('idUserNameMUIDEDITL',{
    		layoutData: new sap.ui.layout.GridData({span: "L6 M6 S12",linebreak: false, margin: true}),
    	}).addStyleClass("FormInputStyle marginTop10");
		
		var oInputFuncLocMUIDEDITL = new sap.ui.commons.TextField('idFuncLocMUIDEDITL',{
    		layoutData: new sap.ui.layout.GridData({span: "L6 M6 S12",linebreak: false, margin: true}),
    	}).addStyleClass("FormInputStyle marginTop10");
		
		/*var oInputGateDtMUIDEDITL = new sap.ui.commons.TextField('idGateDtMUIDEDITL',{
    		layoutData: new sap.ui.layout.GridData({span: "L2 M2 S12",linebreak: false, margin: true}),
    	}).addStyleClass("FormInputStyle marginTop20");*/
		
		var oModelGateDt = new sap.ui.model.json.JSONModel();
		oModelGateDt.setData({
	   		dateValue: ""
		});
		
		var oInputGateDtMUIDEDITL = new sap.ui.commons.DatePicker("idGateDtMUIDEDITL",{
    		value: {
    			path: "/dateValue",
                type: new sap.ui.model.type.Date({pattern: "dd-MM-yyyy"})
    			},
    			layoutData: new sap.ui.layout.GridData({span: "L6 M6 S9"}),
    	});
		oInputGateDtMUIDEDITL.addStyleClass("FormInputStyle marginTop68");
		oInputGateDtMUIDEDITL.setLocale("en-US");
		oInputGateDtMUIDEDITL.attachChange(
    	                function(oEvent){
    	                        if(oEvent.getParameter("invalidValue")){
    	                                oEvent.oSource.setValueState(sap.ui.core.ValueState.Error);
    	                                oEvent.oSource.setValue("");
    	                                oEvent.oSource.setPlaceholder("Invalid Value");
    	                        }else{
    	                                oEvent.oSource.setValueState(sap.ui.core.ValueState.None);
    	                                // Begin of adding by Seyed Ismail on 29.07.2015 MAC29072015 +
    	                                var GateDt = oEvent.oSource.getYyyymmdd();
    	                                GateDt = GateDt.substring(6,8)+"-"+GateDt.substring(4,6)+"-"+GateDt.substring(0,4);
    	                                oEvent.oSource.setValue(GateDt);
    	                                // End of adding by Seyed Ismail on 29.07.2015 MAC29072015 +
    	                        }
    	                }
    	);
		
		var oInputSenderAddrMUIDEDITL = new sap.ui.commons.TextField('idSenderAddrMUIDEDITL',{
    		layoutData: new sap.ui.layout.GridData({span: "L6 M6 S12",linebreak: false, margin: true}),
    	}).addStyleClass("FormInputStyle marginTop10");
		
		var oInputContTypeMUIDEDITL = new sap.ui.commons.TextField('idContTypeMUIDEDITL',{
    		layoutData: new sap.ui.layout.GridData({span: "L6 M6 S12",linebreak: false, margin: true}),
    	}).addStyleClass("FormInputStyle marginTop10");
		
		var oInputRelNumbrMUIDEDITL = new sap.ui.commons.TextField('idRelNumbrMUIDEDITL',{
    		layoutData: new sap.ui.layout.GridData({span: "L6 M6 S12",linebreak: false, margin: true}),
    	}).addStyleClass("FormInputStyle marginTop10");
		
		var oInputCondGradeMUIDEDITL = new sap.ui.commons.TextField('idCondGradeMUIDEDITL',{
    		layoutData: new sap.ui.layout.GridData({span: "L6 M6 S12",linebreak: false, margin: true}),
    	}).addStyleClass("FormInputStyle marginTop10");
		
		var oInputCondCodeMUIDEDITL = new sap.ui.commons.TextField('idCondCodeMUIDEDITL',{
    		layoutData: new sap.ui.layout.GridData({span: "L6 M6 S12",linebreak: false, margin: true}),
    	}).addStyleClass("FormInputStyle marginTop10");
		
		var oInputTransNumbrMUIDEDITL = new sap.ui.commons.TextField('idTransNumbrMUIDEDITL',{
    		layoutData: new sap.ui.layout.GridData({span: "L6 M6 S12",linebreak: false, margin: true}),
    	}).addStyleClass("FormInputStyle marginTop10");
		
		var oInputPOLineItemMUIDEDITL = new sap.ui.commons.TextField('idPOLineItemMUIDEDITL',{
    		layoutData: new sap.ui.layout.GridData({span: "L6 M6 S12",linebreak: false, margin: true}),
    	}).addStyleClass("FormInputStyle marginTop10");
		
		var oInputPONumbrMUIDEDITL = new sap.ui.commons.TextField('idPONumbrMUIDEDITL',{
    		layoutData: new sap.ui.layout.GridData({span: "L6 M6 S12",linebreak: false, margin: true}),
    	}).addStyleClass("FormInputStyle marginTop10");
		
		var oInputUnitPartCodeMUIDEDITL = new sap.ui.commons.TextField('idUnitPartCodeMUIDEDITL',{
    		layoutData: new sap.ui.layout.GridData({span: "L6 M6 S12",linebreak: false, margin: true}),
    	}).addStyleClass("FormInputStyle marginTop10");
		
		var oInputEstTypeCodeMUIDEDITL = new sap.ui.commons.TextField('idEstTypeCodeMUIDEDITL',{
    		layoutData: new sap.ui.layout.GridData({span: "L6 M6 S12",linebreak: false, margin: true}),
    	}).addStyleClass("FormInputStyle marginTop10");
		
		var oInputTankNumbrMUIDEDITL = new sap.ui.commons.TextField('idTankNumbrMUIDEDITL',{
    		layoutData: new sap.ui.layout.GridData({span: "L6 M6 S12",linebreak: false, margin: true}),
    	}).addStyleClass("FormInputStyle marginTop10");
		
		var oInputDescMUIDEDITL = new sap.ui.commons.TextField('idDescMUIDEDITL',{
    		layoutData: new sap.ui.layout.GridData({span: "L6 M6 S12",linebreak: false, margin: true}),
    	}).addStyleClass("FormInputStyle marginTop10");
		
		var oInputTankClnDescMUIDEDITL = new sap.ui.commons.TextField('idTankClnDescMUIDEDITL',{
    		layoutData: new sap.ui.layout.GridData({span: "L6 M6 S12",linebreak: false, margin: true}),
    	}).addStyleClass("FormInputStyle marginTop10");
		
		/*var oInputTankCertDtMUIDEDITL = new sap.ui.commons.TextField('idTankCertDtMUIDEDITL',{
    		layoutData: new sap.ui.layout.GridData({span: "L2 M2 S12",linebreak: false, margin: true}),
    	}).addStyleClass("FormInputStyle marginTop10");*/
		
		var oModelTankCertDate = new sap.ui.model.json.JSONModel();
		oModelTankCertDate.setData({
	   		dateValue: ""
		});
		
		var oInputTankCertDtMUIDEDITL = new sap.ui.commons.DatePicker("idTankCertDtMUIDEDITL",{
    		value: {
    			path: "/dateValue",
                type: new sap.ui.model.type.Date({pattern: "dd-MM-yyyy"})
    			},
    			layoutData: new sap.ui.layout.GridData({span: "L6 M6 S12"}),
    	});
		oInputTankCertDtMUIDEDITL.addStyleClass("FormInputStyle marginTop10");
		oInputTankCertDtMUIDEDITL.setLocale("en-US");
		oInputTankCertDtMUIDEDITL.attachChange(
    	                function(oEvent){
    	                        if(oEvent.getParameter("invalidValue")){
    	                                oEvent.oSource.setValueState(sap.ui.core.ValueState.Error);
    	                                oEvent.oSource.setValue("");
    	                                oEvent.oSource.setPlaceholder("Invalid Value");
    	                        }else{
    	                                oEvent.oSource.setValueState(sap.ui.core.ValueState.None);
    	                                // Begin of adding by Seyed Ismail on 29.07.2015 MAC29072015 +
    	                                var tankDt = oEvent.oSource.getYyyymmdd();
    	                                tankDt = tankDt.substring(6,8)+"-"+tankDt.substring(4,6)+"-"+tankDt.substring(0,4);
    	                                oEvent.oSource.setValue(tankDt);
    	                                // End of adding by Seyed Ismail on 29.07.2015 MAC29072015 +
    	                        }
    	                }
    	);
		
		// Table
    	var oTableErrorsMUIDDTEDITL = new sap.ui.table.Table("idTblErrorsMUIDDTEDITL",{
            columnHeaderHeight: 30,
            selectionMode: sap.ui.table.SelectionMode.None,
            navigationMode: sap.ui.table.NavigationMode.Paginator,
            width:"auto",
            height:"100%"
    	 }).addStyleClass("fontStyle marginTop10 tblBorder");
    	
    	// Table Columns
    	oTableErrorsMUIDDTEDITL.addColumn(new sap.ui.table.Column({
      		 label: new sap.ui.commons.Label({text: "Error Type"}),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "errorType").addStyleClass("wraptext"),
    		 resizable:false,
             sortProperty: "errorType",
             filterProperty: "errorType",
             width:"auto",	// MACHANACHANGES_12062019 changed from xx px to auto
    		 }));
    	
    	oTableErrorsMUIDDTEDITL.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Error ID"}),
			 template: new sap.ui.commons.TextView().bindProperty("text", "id").addStyleClass("wraptext"),
			 resizable:false,
             sortProperty: "id",
             filterProperty: "id",
             width:"auto",	// MACHANACHANGES_12062019 changed from xx px to auto
			 }));
    	
    	oTableErrorsMUIDDTEDITL.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Message"}),
			 template: new sap.ui.commons.TextView().bindProperty("text", "message").addStyleClass("wraptext"),
			 resizable:false,
             sortProperty: "message",
             filterProperty: "message",
             width:"auto",	// MACHANACHANGES_12062019 changed from xx px to auto
			 }));
    	
    	oTableErrorsMUIDDTEDITL.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Error Number"}),
			 template: new sap.ui.commons.TextView().bindProperty("text", "number").addStyleClass("wraptext"),
			 resizable:false,
             sortProperty: "number",
             filterProperty: "number",
             width:"auto",	// MACHANACHANGES_12062019 changed from xx px to auto
			 }));
    	
    	// Buttons
	   	 var oBtnMsgUniqueIDDetResubmit = new sap.m.Button("idBtnMsgUniqueIDDetResubmitEDITL",{
		          text : "Resubmit",
		          //width:"80px",
		          styled:false,
		          layoutData: new sap.ui.layout.GridData({span: "L2 M5 S4",linebreak: true, margin: true}),
		          press:function(){
		        		  sap.ui.commons.MessageBox.show("Are you sure you want to resubmit the selected message? This action cannot be undone.",
			                      sap.ui.commons.MessageBox.Icon.WARNING,
			                            "Warning",
			          [sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO], 
			          oCurrMUIDEDITL.resubmitMessageMUIDEDITL,
			          sap.ui.commons.MessageBox.Action.YES);
		          }}).addStyleClass("submitBtn marginTop10");
	   	 
	   	var oBtnMsgUniqueIDDetDelete = new sap.m.Button("idBtnMsgUniqueIDDetDeleteEDITL",{
	          text : "Delete",
	          //width:"80px",
	          styled:false,
	          layoutData: new sap.ui.layout.GridData({span: "L2 M5 S4",linebreak: true, margin: true}),
	          press:function(){
	        		  sap.ui.commons.MessageBox.show("Are you sure you want to delete the selected message? This action cannot be undone.",
		                      sap.ui.commons.MessageBox.Icon.WARNING,
		                            "Warning",
		          [sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO], 
		          oCurrMUIDEDITL.deleteMessageMUIDEDITL,
		          sap.ui.commons.MessageBox.Action.YES);
	          }}).addStyleClass("submitBtn marginTop10");
	   	
	   	var oFlexBtnsMUIDEDITL = new sap.m.FlexBox({
	           items: [
						oBtnMsgUniqueIDDetResubmit,
						oLabelSpaceMUIDEDITL,
						oBtnMsgUniqueIDDetDelete
	           ],
	           layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12",linebreak: true, margin: false}),
	           direction : "Row",
				});
    	
    	// Responsive Grid Layout
	    var oMsgUniqueIDDetLayout1 = new sap.ui.layout.form.ResponsiveGridLayout("idMUIDEDITLMsgUniqueIDDetLayout1",{
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
	     var oEDITLMsgUniqueIDDetForm1 = new sap.ui.layout.form.Form("idMUIDEDITLMsgUniqueIDDetForm1",{
	             layout: oMsgUniqueIDDetLayout1,
	             formContainers: [
	                     
	                     new sap.ui.layout.form.FormContainer("idMUIDEDITLMsgUniqueIDDetForm1C1",{
	                             //title: "Add Movement Out - Single",
                             formElements: [
												new sap.ui.layout.form.FormElement({
													fields: [bckFrmMsgUniqueIDDetToFMEDITL],
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oLabelTitleMUIDEDITL],
												}),
                                            	new sap.ui.layout.form.FormElement({
												    fields: [oLabelSerialNumbr, oInputSerialNumbrMUIDEDITL]
												}),
												new sap.ui.layout.form.FormElement({
													layoutData: new sap.ui.layout.GridData({linebreak: true}),
												    fields: [oLabelMsgType, oInputMsgTypeMUIDEDITL]
												}),
												new sap.ui.layout.form.FormElement({
													layoutData: new sap.ui.layout.GridData({linebreak: true}),
												    fields: [oLabelUserName, oInputUserNameMUIDEDITL]
												}),
												new sap.ui.layout.form.FormElement({
													layoutData: new sap.ui.layout.GridData({linebreak: true}),
												    fields: [oLabelFuncLoc, oInputFuncLocMUIDEDITL],
												})
	                                     ]
	                     }),
	                     new sap.ui.layout.form.FormContainer("idMUIDEDITLMsgUniqueIDDetForm1C2",{
                             //title: "Add Movement Out - Single",
                         formElements: [
										new sap.ui.layout.form.FormElement({
											layoutData: new sap.ui.layout.GridData({linebreak: true}),
										    fields: [oLabelGateDate, oInputGateDtMUIDEDITL],
										}),
										new sap.ui.layout.form.FormElement({
											layoutData: new sap.ui.layout.GridData({linebreak: true}),
										    fields: [oLabelSenderAddr, oInputSenderAddrMUIDEDITL],
										}),
									]
	                     })
	             ]
	     });
	     
	  // Responsive Grid Layout
		    var oMsgUniqueIDDetLayout2 = new sap.ui.layout.form.ResponsiveGridLayout("idMUIDEDITLMsgUniqueIDDetLayout2",{
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
		     var oEDITLMsgUniqueIDDetForm2 = new sap.ui.layout.form.Form("idMUIDEDITLMsgUniqueIDDetForm2",{
		             layout: oMsgUniqueIDDetLayout2,
		             formContainers: [
									new sap.ui.layout.form.FormContainer("idMUIDEDITLMsgUniqueIDDetForm2C1",{
									    //title: "Add Movement Out - Single",
									formElements: [
													new sap.ui.layout.form.FormElement({
														layoutData: new sap.ui.layout.GridData({linebreak: true}),
													    fields: [oLabelContType, oInputContTypeMUIDEDITL],
													}),
													new sap.ui.layout.form.FormElement({
														layoutData: new sap.ui.layout.GridData({linebreak: true}),
													    fields: [oLabelRelNumbr, oInputRelNumbrMUIDEDITL],
													}),
													new sap.ui.layout.form.FormElement({
														layoutData: new sap.ui.layout.GridData({linebreak: true}),
													    fields: [oLabelCondGrade, oInputCondGradeMUIDEDITL],
													}),
												]
									}),
									new sap.ui.layout.form.FormContainer("idMUIDEDITLMsgUniqueIDDetForm2C2",{
									    //title: "Add Movement Out - Single",
									formElements: [
													new sap.ui.layout.form.FormElement({
														layoutData: new sap.ui.layout.GridData({linebreak: true}),
													    fields: [oLabelCondnCode, oInputCondCodeMUIDEDITL],
													}),
													new sap.ui.layout.form.FormElement({
														layoutData: new sap.ui.layout.GridData({linebreak: true}),
													    fields: [oLabelTransNumbr, oInputTransNumbrMUIDEDITL],
													}),
												]
									})    
		             ]
		     });
		     
		  // Responsive Grid Layout
			    var oMsgUniqueIDDetLayout3 = new sap.ui.layout.form.ResponsiveGridLayout("idMUIDEDITLMsgUniqueIDDetLayout3",{
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
			     var oEDITLMsgUniqueIDDetForm3 = new sap.ui.layout.form.Form("idMUIDEDITLMsgUniqueIDDetForm3",{
			             layout: oMsgUniqueIDDetLayout3,
			             formContainers: [
										new sap.ui.layout.form.FormContainer("idMUIDEDITLMsgUniqueIDDetForm3C1",{
										    //title: "Add Movement Out - Single",
										formElements: [
														new sap.ui.layout.form.FormElement({
															layoutData: new sap.ui.layout.GridData({linebreak: true}),
														    fields: [oLabelPOLineItem, oInputPOLineItemMUIDEDITL],
														})
													]
										}),
										new sap.ui.layout.form.FormContainer("idMUIDEDITLMsgUniqueIDDetForm3C2",{
										    //title: "Add Movement Out - Single",
										formElements: [
														new sap.ui.layout.form.FormElement({
															layoutData: new sap.ui.layout.GridData({linebreak: true}),
														    fields: [oLabelPONumbr, oInputPONumbrMUIDEDITL],
														})
													]
										})    
			             ]
			     });
			     
			     // Responsive Grid Layout
				    var oMsgUniqueIDDetLayout4 = new sap.ui.layout.form.ResponsiveGridLayout("idMUIDEDITLMsgUniqueIDDetLayout4",{
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
				     var oEDITLMsgUniqueIDDetForm4 = new sap.ui.layout.form.Form("idMUIDEDITLMsgUniqueIDDetForm4",{
				             layout: oMsgUniqueIDDetLayout4,
				             formContainers: [
											new sap.ui.layout.form.FormContainer("idMUIDEDITLMsgUniqueIDDetForm4C1",{
											    //title: "Add Movement Out - Single",
											formElements: [
															new sap.ui.layout.form.FormElement({
																layoutData: new sap.ui.layout.GridData({linebreak: true}),
															    fields: [oLabelUnitPartCode, oInputUnitPartCodeMUIDEDITL],
															})
														]
											}),
											new sap.ui.layout.form.FormContainer("idMUIDEDITLMsgUniqueIDDetForm4C2",{
											    //title: "Add Movement Out - Single",
											formElements: [
															new sap.ui.layout.form.FormElement({
																layoutData: new sap.ui.layout.GridData({linebreak: true}),
															    fields: [oLabelEstTypeCode, oInputEstTypeCodeMUIDEDITL],
															})
														]
											})    
				             ]
				     });
				     
				  // Responsive Grid Layout
					    var oMsgUniqueIDDetLayout5 = new sap.ui.layout.form.ResponsiveGridLayout("idMUIDEDITLMsgUniqueIDDetLayout5",{
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
					     var oEDITLMsgUniqueIDDetForm5 = new sap.ui.layout.form.Form("idMUIDEDITLMsgUniqueIDDetForm5",{
					             layout: oMsgUniqueIDDetLayout5,
					             visible : false, // MAC21092017-
					             formContainers: [
												new sap.ui.layout.form.FormContainer("idMUIDEDITLMsgUniqueIDDetForm5C1",{
												    //title: "Add Movement Out - Single",
												formElements: [
																new sap.ui.layout.form.FormElement({
																	layoutData: new sap.ui.layout.GridData({linebreak: true}),
																    fields: [oLabelTankNumbr, oInputTankNumbrMUIDEDITL],
																}),
																new sap.ui.layout.form.FormElement({
																	layoutData: new sap.ui.layout.GridData({linebreak: true}),
																    fields: [oLabelTankClnDesc, oInputTankClnDescMUIDEDITL],
																})
															]
												}),
												new sap.ui.layout.form.FormContainer("idMUIDEDITLMsgUniqueIDDetForm5C2",{
												    //title: "Add Movement Out - Single",
												formElements: [
																new sap.ui.layout.form.FormElement({
																	layoutData: new sap.ui.layout.GridData({linebreak: true}),
																    fields: [oLabelDesc, oInputDescMUIDEDITL],
																}),
																new sap.ui.layout.form.FormElement({
																	layoutData: new sap.ui.layout.GridData({linebreak: true}),
																    fields: [oLabelTankCertDate, oInputTankCertDtMUIDEDITL],
																})
															]
												})    
					             ]
					     });
					     
			  // Responsive Grid Layout
				    var oMsgUniqueIDDetLayout6 = new sap.ui.layout.form.ResponsiveGridLayout("idMUIDEDITLMsgUniqueIDDetLayout6",{
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
				     var oEDITLMsgUniqueIDDetForm6 = new sap.ui.layout.form.Form("idMUIDEDITLMsgUniqueIDDetForm6",{
				             layout: oMsgUniqueIDDetLayout6,
				             formContainers: [
											new sap.ui.layout.form.FormContainer("idMUIDEDITLMsgUniqueIDDetForm6C1",{
											    //title: "Add Movement Out - Single",
											formElements: [
														new sap.ui.layout.form.FormElement({
														    fields: [oTableErrorsMUIDDTEDITL]
														}),
														new sap.ui.layout.form.FormElement({
															layoutData: new sap.ui.layout.GridData({linebreak: true}),
														    fields: [oFlexBtnsMUIDEDITL]
														})
														]
											})
				             ]
				     });
	     
		     var oFlxBoxGateInResult = new sap.m.FlexBox({
		  	      items: [ oEDITLMsgUniqueIDDetForm1,
		  	             //oHorDivider,
		  	           oEDITLMsgUniqueIDDetForm2,
		  	             //oHorDivider1,
		  	           oEDITLMsgUniqueIDDetForm3,
		  	             //oHorDivide2,
		  	           oEDITLMsgUniqueIDDetForm4,
		  	             //oHorDivide3,
		  	           oEDITLMsgUniqueIDDetForm5,
		  	         //oHorDivide4,
		  	         oEDITLMsgUniqueIDDetForm6],
		  	       direction: "Column",
		  	    });
					     
	     return oFlxBoxGateInResult;
	},
	
	updateMsgUniqueIDDetEDITL: function(){
		oModelErrorsTableEDITL = new sap.ui.model.json.JSONModel();
		oModelErrorsTableEDITL.setData({modelData: arrViewErrorDetailEDITL});
    	sap.ui.getCore().byId("idTblErrorsMUIDDTEDITL").setModel(oModelErrorsTableEDITL);
    	sap.ui.getCore().byId("idTblErrorsMUIDDTEDITL").bindRows("/modelData");
    	if(arrViewErrorDetailEDITL.length >= 25){
    		sap.ui.getCore().byId("idTblErrorsMUIDDTEDITL").setVisibleRowCount(25);
    		sap.ui.getCore().byId("idTblErrorsMUIDDTEDITL").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
    	}
    	else{
    		sap.ui.getCore().byId("idTblErrorsMUIDDTEDITL").setVisibleRowCount(arrViewErrorDetailEDITL.length);
    		sap.ui.getCore().byId("idTblErrorsMUIDDTEDITL").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
    	}
    	
    	sap.ui.getCore().byId("idSerNoMUIDEDITL").setValue(arrMsgUniqueIDDetEDITL[0].serialNumbr.trim().toUpperCase());
    	sap.ui.getCore().byId("idMsgTypeMUIDEDITL").setValue(arrMsgUniqueIDDetEDITL[0].msgType);
    	sap.ui.getCore().byId("idUserNameMUIDEDITL").setValue(arrMsgUniqueIDDetEDITL[0].userName);
    	sap.ui.getCore().byId("idFuncLocMUIDEDITL").setValue(arrMsgUniqueIDDetEDITL[0].funcLoc);
    	if(arrMsgUniqueIDDetEDITL[0].gateDate == "-"){
    		sap.ui.getCore().byId("idGateDtMUIDEDITL").setValue("");
    	}
    	else{
    		sap.ui.getCore().byId("idGateDtMUIDEDITL").setValue(arrMsgUniqueIDDetEDITL[0].gateDate);
    	}
    	//sap.ui.getCore().byId("idGateDtMUIDEDITL").setValue(arrMsgUniqueIDDetEDITL[0].gateDate);
    	sap.ui.getCore().byId("idSenderAddrMUIDEDITL").setValue(arrMsgUniqueIDDetEDITL[0].senderAddress);
    	sap.ui.getCore().byId("idContTypeMUIDEDITL").setValue(arrMsgUniqueIDDetEDITL[0].containerType);
    	sap.ui.getCore().byId("idRelNumbrMUIDEDITL").setValue(arrMsgUniqueIDDetEDITL[0].releaseNumbr);
    	sap.ui.getCore().byId("idCondGradeMUIDEDITL").setValue(arrMsgUniqueIDDetEDITL[0].conditionGrade);
    	sap.ui.getCore().byId("idCondCodeMUIDEDITL").setValue(arrMsgUniqueIDDetEDITL[0].conditionCode);
    	sap.ui.getCore().byId("idTransNumbrMUIDEDITL").setValue(arrMsgUniqueIDDetEDITL[0].transactionNumbr);
    	sap.ui.getCore().byId("idPOLineItemMUIDEDITL").setValue(arrMsgUniqueIDDetEDITL[0].POLineItem);
    	sap.ui.getCore().byId("idPONumbrMUIDEDITL").setValue(arrMsgUniqueIDDetEDITL[0].PONumbr);
    	sap.ui.getCore().byId("idUnitPartCodeMUIDEDITL").setValue(arrMsgUniqueIDDetEDITL[0].unitPartCode);
    	sap.ui.getCore().byId("idEstTypeCodeMUIDEDITL").setValue(arrMsgUniqueIDDetEDITL[0].estimateTypeCode);
    	sap.ui.getCore().byId("idTankNumbrMUIDEDITL").setValue(arrMsgUniqueIDDetEDITL[0].tankNumbr);
    	sap.ui.getCore().byId("idDescMUIDEDITL").setValue(arrMsgUniqueIDDetEDITL[0].description);
    	sap.ui.getCore().byId("idTankClnDescMUIDEDITL").setValue(arrMsgUniqueIDDetEDITL[0].tankCleanDesc);
    	if(arrMsgUniqueIDDetEDITL[0].tankCertDate == "-"){
    		sap.ui.getCore().byId("idTankCertDtMUIDEDITL").setValue("");		// MAC05082015 Changed from idTankNumbrMUIDEDITL to idTankCertDtMUIDEDITL
    	}
    	else{
    		sap.ui.getCore().byId("idTankCertDtMUIDEDITL").setValue(arrMsgUniqueIDDetEDITL[0].tankCertDate);  // MAC05082015 Changed from idTankNumbrMUIDEDITL to idTankCertDtMUIDEDITL
    	}
    	//sap.ui.getCore().byId("idTankCertDtMUIDEDITL").setValue(arrMsgUniqueIDDetEDITL[0].tankCertDate);
    	sap.ui.getCore().byId("idMsgUniqueIDDetTitleEDITL").setText("Message Details for Message ID " + vMsgUniqueIdToPassMUIDEDITL);
	},
	
	resubmitMessageMUIDEDITL: function(sResult){
		if(sResult == "YES"){
			//alert("resubmit");
			var serno = sap.ui.getCore().byId("idSerNoMUIDEDITL").getValue().trim().toUpperCase();
	    	var msgType = sap.ui.getCore().byId("idMsgTypeMUIDEDITL").getValue();
	    	var Username = sap.ui.getCore().byId("idUserNameMUIDEDITL").getValue();
	    	var funcLoc = sap.ui.getCore().byId("idFuncLocMUIDEDITL").getValue();
	    	
	    	/* Begin of commenting by Seyed Ismail on 29.07.2015 MAC29.07.2015 */
	    	/*
	    	var GateDt = sap.ui.getCore().byId("idGateDtMUIDEDITL").getYyyymmdd();
	    	if(GateDt.trim().length == 0)
	    		GateDt = "0000-00-00T00:00:00";
			else
				GateDt = GateDt.substring(0,4)+"-"+GateDt.substring(4,6)+"-"+GateDt.substring(6,8)+"T00:00:00";
			*/	
	    	/* End of commenting by Seyed Ismail on 29.07.2015 MAC29.07.2015 */
	    	
	    	/* Begin of adding by Seyed Ismail on 29.07.2015 MAC29.07.2015 */
	    	
	    	var GateDt = sap.ui.getCore().byId("idGateDtMUIDEDITL").getValue();
	    	if(GateDt.trim().length == 0)
	    		GateDt = "1900-01-01T00:00:00";
			else
				GateDt = GateDt.substring(6,10)+"-"+GateDt.substring(3,5)+"-"+GateDt.substring(0,2)+"T00:00:00";
			
	    	/* End of adding by Seyed Ismail on 29.07.2015 MAC29072015 */
	    	
	    	var SendrAdr = sap.ui.getCore().byId("idSenderAddrMUIDEDITL").getValue();
	    	var ContType = sap.ui.getCore().byId("idContTypeMUIDEDITL").getValue();
	    	var RelNumbr = sap.ui.getCore().byId("idRelNumbrMUIDEDITL").getValue();
	    	var CondGrade = sap.ui.getCore().byId("idCondGradeMUIDEDITL").getValue();
	    	var CondCode = sap.ui.getCore().byId("idCondCodeMUIDEDITL").getValue();
	    	var TransNumbr = sap.ui.getCore().byId("idTransNumbrMUIDEDITL").getValue();
	    	var PoLineItem = sap.ui.getCore().byId("idPOLineItemMUIDEDITL").getValue();
	    	var PoNumbr = sap.ui.getCore().byId("idPONumbrMUIDEDITL").getValue();
	    	var UPC = sap.ui.getCore().byId("idUnitPartCodeMUIDEDITL").getValue();
	    	var EstType = sap.ui.getCore().byId("idEstTypeCodeMUIDEDITL").getValue();
	    	var TankNumbr = sap.ui.getCore().byId("idTankNumbrMUIDEDITL").getValue();
	    	var desc = sap.ui.getCore().byId("idDescMUIDEDITL").getValue();
	    	var tankClnDesc = sap.ui.getCore().byId("idTankClnDescMUIDEDITL").getValue();
	    	
	    	/* Begin of commenting by Seyed Ismail on 29.07.2015 MAC29072015 */
	    	/*
	    	var tankCertDate = sap.ui.getCore().byId("idTankCertDtMUIDEDITL").getYyyymmdd();
	    	if(tankCertDate.trim().length == 0)
	    		tankCertDate = "0000-00-00T00:00:00";
			else
				tankCertDate = tankCertDate.substring(0,4)+"-"+tankCertDate.substring(4,6)+"-"+tankCertDate.substring(6,8)+"T00:00:00";
				*/
	    	/* End of commenting by Seyed Ismail on 29.07.2015 MAC29072015 */
	    	
	    	/* Begin of adding by Seyed Ismail on 29.07.2015 MAC29072015 */
	    	var tankCertDate = sap.ui.getCore().byId("idTankCertDtMUIDEDITL").getValue();
	    	if(tankCertDate.trim().length == 0)
	    		tankCertDate = "1900-01-01T00:00:00";
			else
				tankCertDate = tankCertDate.substring(6,10)+"-"+tankCertDate.substring(3,5)+"-"+tankCertDate.substring(0,2)+"T00:00:00";
	    	/* End of adding by Seyed Ismail on 29.07.2015 MAC29072015 */
	    	var assetNo = ""; //not on screen
	    	var subAssetNo = ""; //not on screen
	    	var matType="";
	    	var compCode = "";
	    	var filter = "/EDI_Resubmit?$filter="
	    		+ "IMsgId1 eq '" + vMsgUniqueIdToPassMUIDEDITL + "'"  
	    		+ " and IStatus eq '' and ISerialNumber eq '" + serno + "' and IEquipmentNumber eq '' and IAssetNumber eq '" + assetNo + "'" 
	    		+ " and ISubAssetNumber eq '" + subAssetNo + "' and IMaterialType eq '" + matType + "' and IContainerType eq '" + ContType + "' and ICompanyCode eq '" + compCode + "'" 
	    		+ " and IContainerStatus eq '" + msgType + "' and IFunctionalLocat eq '" + funcLoc + "' and IPlannerGroup eq '' and IWorkCentre eq '' and ILeaseContractN eq '" + TransNumbr + "'" 
	    		+ " and IGateDate eq datetime'" + GateDt + "' and IReleaseNumber eq '" + RelNumbr + "' and ISenderAddress eq '" + SendrAdr + "'"
	    		+ " and IPonumber eq '" + PoNumbr + "' and IPoline eq '" + PoLineItem + "' and IReturnAuthNumb eq '" + TransNumbr + "' and IConditionCode eq '" + CondCode + "'"   // MAC24042015 Included '" + TransNumbr + "' for Transaction Number
	    		+ " and IQualifyingKey eq '' and IConditionGrade eq '" + CondGrade + "' and IRepairDate eq datetime'" + GateDt + "' and IEstimateType eq '" + EstType + "'" 		// MAC24042015 Included '" + GateDt +
	    		+ " and ILocalBilling eq '' and IWorkOrderNumbe eq '' and IUnitPartCode eq '" + UPC + "' and ITankNumber eq '" + TankNumbr + "' and ITankLastCargo eq '" + desc + "'"	
	    		+ " and ITankCleaningPr eq '" + tankClnDesc + "' and ITankCertiDate eq datetime'" + tankCertDate + "' and ISalesGrade eq ''"
	    		+ " and IWorkCreatedDat eq datetime'1900-01-01T00:00:00' and ICurrencyCode eq '' and IActualDate eq datetime'1900-01-01T00:00:00'" 
	    		+ " and IMovementInDate eq datetime'1900-01-01T00:00:00' and IEstimateNumber eq '' and ILesseAuthAmt eq '' and IMultiPartCont eq ''" 
	    		+ " and IContStructComp eq '' and IResubStatus eq '' and IApprovalCond eq '' and IApprovalNumber eq '' and Param1 eq '" + Username + "'";
	    	
	    	/*var filter = "/EDI_Resubmit?$filter=IMsgId1 eq 'X201407170807280001' and IMsgId2 eq ''" 
	    		+ "and IMsgId3 eq '' and IMsgId4 eq '' and IStatus eq '' and ISerialNumber eq '" + serno + "' and IEquipmentNumber eq ''" 
	    		+ "and IAssetNumber eq '' and ISubAssetNumber eq '' and IMaterialType eq '' and IContainerType eq '" + ContType + "' and ICompanyCode eq '" + compCode + "'"
	    		+ "and IContainerStatus eq '" + msgType + "' and IFunctionalLocat eq '" + funcLoc + "' and IPlannerGroup eq '' and IWorkCentre eq ''"
	    		+ "and IGateDate eq datetime'" + GateDt + "' and IReleaseNumber eq '" + RelNumbr + "' and ISenderAddress eq '" + SendrAdr + "' and ILeaseContractN eq '" + TransNumbr + "'"
	    		+ "and IPonumber eq '" + PoNumbr + "' and IPoline eq '" + PoLineItem + "' and IReturnAuthNumb eq '' and IConditionCode eq 'C' and IQualifyingKey eq ''" 
	    		+ "and IConditionGrade eq '' and IRepairDate eq datetime'0000-00-00T00:00:00' and IEstimateType eq 'V' and ILocalBilling eq ''" 
	    		+ "and IWorkOrderNumbe eq '' and IUnitPartCode eq '' and ITankNumber eq '' and ITankLastCargo eq '' and ITankCleaningPr eq ''" 
	    		+ "and ITankCertiDate eq datetime'0000-00-00T00:00:00' and ISalesGrade eq '' and IWorkCreatedDat eq datetime'0000-00-00T00:00:00'" 
	    		+ "and ICurrencyCode eq '' and IActualDate eq datetime'0000-00-00T00:00:00' and IMovementInDate eq datetime'0000-00-00T00:00:00'" 
	    		+ "and IEstimateNumber eq '' and ILesseAuthAmt eq '' and IMultiPartCont eq '' and IContStructComp eq '' and IResubStatus eq ''"  
	    		+ "and IApprovalCond eq '' and IApprovalNumber eq '' and Param1 eq ''";*/
	    		
	    		
	    	oModel = new sap.ui.model.odata.ODataModel(serviceUrl15_old, true);
			OData.request({ 
			   requestUri: serviceUrl15_old + filter,
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
				 if(data.results.length == 0){
		    		 busyDialog.close();
		    		 sap.ui.commons.MessageBox.show("Your request could not be processed at this time.\n Please try again later.",
		    		            sap.ui.commons.MessageBox.Icon.INFORMATION,
		    		            "Information",
		    		            [sap.ui.commons.MessageBox.Action.OK], 
		    		            sap.ui.commons.MessageBox.Action.OK);
		    	}
		    	else{
		    		busyDialog.close();
		    		sap.ui.commons.MessageBox.alert("Message(s) resubmitted successfully!",fnCallBackEDIRetransmissionResubmit);
		    	}
			 },
			 function(err){
				 	errorfromServer(err);
			});
		}
	},
	
	deleteMessageMUIDEDITL: function(sResult){
		if(sResult == "YES"){
			//alert("delete : yes : vMsgUniqueIdToPassMUIDEDITL : "+vMsgUniqueIdToPassMUIDEDITL);
			oModel = new sap.ui.model.odata.ODataModel(serviceUrl15, true);
			var urlToCallDeleteMsgMUIDEDITL = serviceUrl15 + "/EDI_Delete?$filter=IMsgId1 eq '" + vMsgUniqueIdToPassMUIDEDITL + "'";
			//alert("urlToCallDeleteMsgMUIDEDITL : "+urlToCallDeleteMsgMUIDEDITL);
			OData.request({ 
			      requestUri: urlToCallDeleteMsgMUIDEDITL,
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
			    		 sap.ui.commons.MessageBox.show("Your request could not be processed at this time.\n Please try again later.",
			    		            sap.ui.commons.MessageBox.Icon.INFORMATION,
			    		            "Information",
			    		            [sap.ui.commons.MessageBox.Action.OK], 
			    		            sap.ui.commons.MessageBox.Action.OK);
			    	}
			    	else{
			    		busyDialog.close();
			    		sap.ui.commons.MessageBox.alert("Message deleted successfully!",fnCallBackEDIRetransmissionResubmit); // MAC31072015 Added ,fnCallBackEDIRetransmissionResubmit
			    	}
			    },
			    function(err){
			    	 busyDialog.close();
			    	 errorfromServer(err);
			    	//alert("Error while Reading Result : "+ window.JSON.stringify(err.response));
			    });
			
			
			/*sap.ui.getCore().byId("idSerNoMUIDEDITL").setValue("");
	    	sap.ui.getCore().byId("idMsgTypeMUIDEDITL").setValue("");
	    	sap.ui.getCore().byId("idUserNameMUIDEDITL").setValue("");
	    	sap.ui.getCore().byId("idFuncLocMUIDEDITL").setValue("");
	    	sap.ui.getCore().byId("idGateDtMUIDEDITL").setValue("");
	    	sap.ui.getCore().byId("idSenderAddrMUIDEDITL").setValue("");
	    	sap.ui.getCore().byId("idContTypeMUIDEDITL").setValue("");
	    	sap.ui.getCore().byId("idRelNumbrMUIDEDITL").setValue("");
	    	sap.ui.getCore().byId("idCondGradeMUIDEDITL").setValue("");
	    	sap.ui.getCore().byId("idCondCodeMUIDEDITL").setValue("");
	    	sap.ui.getCore().byId("idTransNumbrMUIDEDITL").setValue("");
	    	sap.ui.getCore().byId("idPOLineItemMUIDEDITL").setValue("");
	    	sap.ui.getCore().byId("idPONumbrMUIDEDITL").setValue("");
	    	sap.ui.getCore().byId("idUnitPartCodeMUIDEDITL").setValue("");
	    	sap.ui.getCore().byId("idEstTypeCodeMUIDEDITL").setValue("");
	    	sap.ui.getCore().byId("idTankNumbrMUIDEDITL").setValue("");
	    	sap.ui.getCore().byId("idDescMUIDEDITL").setValue("");
	    	sap.ui.getCore().byId("idTankClnDescMUIDEDITL").setValue("");
	    	sap.ui.getCore().byId("idTankCertDtMUIDEDITL").setValue("");*/
		}
	}
});

function fnCallBackEDIRetransmissionResubmit(){
	/* Begin of commenting by Seyed Ismail on 25.02.2015 MAC06022015 */
//	 var bus = sap.ui.getCore().getEventBus();
//    bus.publish("nav", "back");
//    new ediTransmissionLogView().FailHyperLinkEDITL("R");
	/* End of commenting by Seyed Ismail on 25.02.2015 MAC06022015 */
	/* Begin of adding by Seyed Ismail on 25.02.2015 MAC06022015 */
	var bus = sap.ui.getCore().getEventBus();
	bus.publish("nav", "to", {
		id : "FailMessageDetailView"
	});
	
	var oEDIAllDepot = new EDIAllDepotView();
	oEDIAllDepot.getFailDetails("again", "again");
	/* End of adding by Seyed Ismail on 25.02.2015 MAC06022015 */

	/*if(sap.ui.getCore().byId("LesseeApprovalMultiple"))
		sap.ui.getCore().byId("LesseeApprovalMultiple").destroy();
	 var bus = sap.ui.getCore().getEventBus();
  	  	bus.publish("nav", "to", {
        id : "LesseeApprovalMultiple"
	  	 });*/
}
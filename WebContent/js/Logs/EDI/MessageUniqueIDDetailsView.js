/******** NP *******/
/*
 *
 * **$*$------------------------------------------------------------------------*
*$*$ Modified By : Seyed Ismail MAC
*$*$ Modified On : 05.08.2015
*$*$ Reference   : RTS 1261
*$*$ Transport   : CGWK901028
*$*$ Tag         : MAC05082015
*$*$ Purpose     : Date Format Change
*$*$---------------------------------------------------------------------*/
/* MACALPHA19032018 - Changes done by Seyed Ismail on 19.03.2018 for Alpha Changes
1. Remove Unit Part Code information MACALPHA19032018_1
2. Add Lessor Survey and remove additional, superseding, pre sales, pre delivery MACALPHA19032018_2
3. Remove sale grade and add CW & Notes field MACALPHA19032018_3
4. Get the latest work order detail from SAP MACALPHA19032018_4
5. Show Labour Rate on screen MACALPHA19032018_5
6. Remove unwanted responsibility codes MACALPHA19032018_6
7. Repair Completion Page changes MACALPHA19032018_7
8. a. One submission for both carcass and machinary MACALPHA19032018_8
   b.Load saved estimates MACALPHA19032018_8
9. One print/excel button MACALPHA19032018_9
10. Differentiate original/JS/LS MACALPHA19032018_10
11. Remove unwanted fields - Lessee Approval MACALPHA19032018_11
12. Add new message types in EDI Log - MACALPHA19032018_12
*/
/* MAC02122016
 *
 * Always pad one zero before saving Repair Estim Rejection lines like
 *
 * 01	IXXX 	MCO	CO	SS	PT	...
 * 02	IXXX 	MCO	CO	SS	PT	...
 * 03	IXXX 	MCO	CO	SS	PT	...
 * 04	IXXX 	MCO	CO	SS	PT	...
 *
 * */

 // MACHANACHANGES_17062019 changed from 0000-00-00 to 1901-01-01
 // MAC04072019_APS903+ - APS 903 1444 Line 13 KRW Material Amount too LENGHTY. cause Lab Rate missing 1 digit
jQuery.sap.require("sap.ui.model.json.JSONModel");

var oModelMsgUniqueIDDetailsJLREDITL;

sap.ui.model.json.JSONModel.extend("messageUniqueIDDetailsJLREDITLView", {

	createMessageUniqueIDDetailsJLR: function(){

		var oCurrMUIDDTEDITL = this;

		var bckFrmMsgUniqueIDDetJLRToFMEDITL = new sap.m.Link("idBckFrmMsgUniqueIDDetJLRToFMEDITL", {
			text: " < Back",
            width:"9%",
            wrapping:true,
            press: function(){
                    var bus = sap.ui.getCore().getEventBus();
                    bus.publish("nav", "back");
                    /* Begin of adding by Seyed Ismail on 25.02.2015 MAC06022015 */
        	  		var oFailMsgDetObjEDITL = new failMessageDetailEDITLView();
        	  		oFailMsgDetObjEDITL.updateFailMsgDetEDITL();
                    /* End of adding by Seyed Ismail on 25.02.2015 MAC06022015 */
            }}).addStyleClass("marginTop10");

		var oLabelSpaceMUIDJLREDITL = new sap.ui.commons.Label({text: " ",
			width:"8px",
            wrapping: true});

		var oLabelSpaceJLRMUIDEDITL1 = new sap.ui.commons.Label({text: " ",
			layoutData: new sap.ui.layout.GridData({span: "L1 M4 S12"}),
            wrapping: true}).addStyleClass("marginTop10");

		var oLabelSpaceJLRMUIDEDITL2 = new sap.ui.commons.Label({text: " ",
			layoutData: new sap.ui.layout.GridData({span: "L1 M4 S12"}),
            wrapping: true}).addStyleClass("marginTop10");

		var oLabelSpaceJLRMUIDEDITL3 = new sap.ui.commons.Label({text: " ",
			layoutData: new sap.ui.layout.GridData({span: "L1 M4 S12"}),
            wrapping: true}).addStyleClass("marginTop10");

		var oLabelSpaceJLRMUIDEDITL4 = new sap.ui.commons.Label({text: " ",
			layoutData: new sap.ui.layout.GridData({span: "L1 M4 S12"}),
            wrapping: true}).addStyleClass("marginTop10");

		var oLabelSpaceJLRMUIDEDITL5 = new sap.ui.commons.Label({text: " ",
			layoutData: new sap.ui.layout.GridData({span: "L1 M4 S12"}),
            wrapping: true}).addStyleClass("marginTop10");

		var oLabelSpaceJLRMUIDEDITL6 = new sap.ui.commons.Label({text: " ",
			layoutData: new sap.ui.layout.GridData({span: "L1 M4 S12"}),
            wrapping: true}).addStyleClass("marginTop10");

		var oLabelSpaceJLRMUIDEDITL7 = new sap.ui.commons.Label({text: " ",
			layoutData: new sap.ui.layout.GridData({span: "L1 M4 S12"}),
            wrapping: true}).addStyleClass("marginTop10");

		var oLabelTitleJLRMUIDEDITL = new sap.ui.commons.Label("idMsgUniqueIDDetJLRTitleEDITL",{
            wrapping: true}).addStyleClass("sapUiFormTitle marginTop10");

		var oHorDivider = new sap.ui.commons.HorizontalDivider({width: "100%", type: "Area", height: "Medium"}).addStyleClass("marginTop10");

		var oHorDivider1 = new sap.ui.commons.HorizontalDivider({width: "100%", type: "Area", height: "Medium"}).addStyleClass("marginTop10");

		var oHorDivide2 = new sap.ui.commons.HorizontalDivider({width: "100%", type: "Area", height: "Medium"}).addStyleClass("marginTop10");

		var oHorDivide3 =new sap.ui.commons.HorizontalDivider({width: "100%", type: "Area", height: "Medium"}).addStyleClass("marginTop10");

		// MACALPHA19032018_12
		var oHorDivideNotes =new sap.ui.commons.HorizontalDivider({width: "100%", type: "Area", height: "Medium"}).addStyleClass("marginTop10");

		// MACALPHA19032018_12
		var oHorDivideDpp =new sap.ui.commons.HorizontalDivider({width: "100%", type: "Area", height: "Medium"}).addStyleClass("marginTop10");

		var oHorDivide4 = new sap.ui.commons.HorizontalDivider({width: "100%", type: "Area", height: "Medium"}).addStyleClass("marginTop10");

		//Labels
		var oLabelSerialNumbr = new sap.ui.commons.Label({text: "Serial Number",
			layoutData: new sap.ui.layout.GridData({span: "L4 M5 S12",linebreak: false, margin: true}),
            wrapping: true}).addStyleClass("marginTop20");

		var oLabelMsgType = new sap.ui.commons.Label({text: "Message Type",
			layoutData: new sap.ui.layout.GridData({span: "L4 M5 S12",linebreak: false, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");

		var oLabelMoveInDate = new sap.ui.commons.Label({text: "Movement In Date",
			layoutData: new sap.ui.layout.GridData({span: "L4 M5 S12",linebreak: false, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");

		var oLabelUserName = new sap.ui.commons.Label({text: "User Name",
			layoutData: new sap.ui.layout.GridData({span: "L4 M5 S12",linebreak: false, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");

		var oLabelSenderAddr = new sap.ui.commons.Label({text: "Sender Address",
			layoutData: new sap.ui.layout.GridData({span: "L4 M5 S12",linebreak: false, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");

		var oLabelFuncLoc = new sap.ui.commons.Label({text: "Functional Location",
			layoutData: new sap.ui.layout.GridData({span: "L4 M5 S12",linebreak: false, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");

		var oLabelActualDate = new sap.ui.commons.Label({text: "Actual Date",
			layoutData: new sap.ui.layout.GridData({span: "L4 M5 S12",linebreak: false, margin: true}),
            wrapping: true}).addStyleClass("marginTop78");

		var oLabelWorkCreatedDate = new sap.ui.commons.Label({text: "Work Created Date",
			layoutData: new sap.ui.layout.GridData({span: "L4 M5 S12",linebreak: false, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");

		////////////////////////////////////////////////////////////////////////////////////////////////

		var oLabelContType = new sap.ui.commons.Label({text: "Container Type",

			layoutData: new sap.ui.layout.GridData({span: "L4 M5 S12",linebreak: false, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");

		var oLabelCondnCode = new sap.ui.commons.Label({text: "Condition Code",

			layoutData: new sap.ui.layout.GridData({span: "L4 M5 S12",linebreak: false, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");

		var oLabelSalesGrade = new sap.ui.commons.Label({text: "Sales Grade",

			layoutData: new sap.ui.layout.GridData({span: "L4 M5 S12",linebreak: false, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");

		///////////////////////////////////////////////////////////////////////////////////////////////

		var oLabelLesseeAuthAmount = new sap.ui.commons.Label({text: "Lessee Auth Amount",

			layoutData: new sap.ui.layout.GridData({span: "L4 M5 S12",linebreak: false, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");

		var oLabelCurrencyCode = new sap.ui.commons.Label({text: "Currency Code",

			layoutData: new sap.ui.layout.GridData({span: "L4 M5 S12",linebreak: false, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");

		//////////////////////////////////////////////////////////////////////////////////////////////

		var oLabelUnitPartCode = new sap.ui.commons.Label({text: "Unit Part Code",

			layoutData: new sap.ui.layout.GridData({span: "L4 M5 S12",linebreak: false, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");

		var oLabelEstTypeCode = new sap.ui.commons.Label({text: "Estimate Type Code",

			layoutData: new sap.ui.layout.GridData({span: "L4 M5 S12",linebreak: false, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");

		//Text Fields
		var oInputSerialNumbrJLRMUIDEDITL = new sap.ui.commons.TextField('idSerNoJLRMUIDEDITL',{
    		layoutData: new sap.ui.layout.GridData({span: "L6 M6 S12",linebreak: false, margin: true}),
    	}).addStyleClass("FormInputStyle marginTop20");

		var oInputMsgTypeJLRMUIDEDITL = new sap.ui.commons.TextField('idMsgTypeJLRMUIDEDITL',{
    		layoutData: new sap.ui.layout.GridData({span: "L6 M6 S12",linebreak: false, margin: true}),
    	}).addStyleClass("FormInputStyle marginTop10");

		var oInputMoveInDtJLRMUIDEDITL = new sap.ui.commons.TextField('idMoveInDtJLRMUIDEDITL',{
    		layoutData: new sap.ui.layout.GridData({span: "L6 M6 S12",linebreak: false, margin: true}),
    	}).addStyleClass("FormInputStyle marginTop10");

		var oInputUserNameJLRMUIDEDITL = new sap.ui.commons.TextField('idUserNameJLRMUIDEDITL',{
    		layoutData: new sap.ui.layout.GridData({span: "L6 M6 S12",linebreak: false, margin: true}),
    	}).addStyleClass("FormInputStyle marginTop10");

		var oInputFuncLocJLRMUIDEDITL = new sap.ui.commons.TextField('idFuncLocJLRMUIDEDITL',{
    		layoutData: new sap.ui.layout.GridData({span: "L6 M6 S12",linebreak: false, margin: true}),
    	}).addStyleClass("FormInputStyle marginTop10");

		var oInputActualDtJLRMUIDEDITL = new sap.ui.commons.TextField('idActualDtJLRMUIDEDITL',{
    		layoutData: new sap.ui.layout.GridData({span: "L6 M6 S12",linebreak: false, margin: true}),
    	}).addStyleClass("FormInputStyle marginTop78");

		var oInputWorkDtJLRMUIDEDITL = new sap.ui.commons.TextField('idWorkDtJLRMUIDEDITL',{
    		layoutData: new sap.ui.layout.GridData({span: "L6 M6 S12",linebreak: false, margin: true}),
    	}).addStyleClass("FormInputStyle marginTop10");

		var oInputSenderAddrJLRMUIDEDITL = new sap.ui.commons.TextField('idSenderAddrJLRMUIDEDITL',{
    		layoutData: new sap.ui.layout.GridData({span: "L6 M6 S12",linebreak: false, margin: true}),
    	}).addStyleClass("FormInputStyle marginTop10");

		///////////////////////////////////////////////////////////////////////////////////////////////

		var oInputContTypeJLRMUIDEDITL = new sap.ui.commons.TextField('idContTypeJLRMUIDEDITL',{
    		layoutData: new sap.ui.layout.GridData({span: "L6 M6 S12",linebreak: false, margin: true}),
    	}).addStyleClass("FormInputStyle marginTop10");

		var oInputSalesGradeJLRMUIDEDITL = new sap.ui.commons.TextField('idSalesGradeJLRMUIDEDITL',{
    		layoutData: new sap.ui.layout.GridData({span: "L6 M6 S12",linebreak: false, margin: true}),
    	}).addStyleClass("FormInputStyle marginTop10");

		var oInputCondCodeJLRMUIDEDITL = new sap.ui.commons.TextField('idCondCodeJLRMUIDEDITL',{
    		layoutData: new sap.ui.layout.GridData({span: "L6 M6 S12",linebreak: false, margin: true}),
    	}).addStyleClass("FormInputStyle marginTop10");

		///////////////////////////////////////////////////////////////////////////////////////////////

		var oInputLesseeAuthAmntJLRMUIDEDITL = new sap.ui.commons.TextField('idLesseeAuthAmntJLRMUIDEDITL',{
    		layoutData: new sap.ui.layout.GridData({span: "L6 M6 S12",linebreak: false, margin: true}),
    	}).addStyleClass("FormInputStyle marginTop10");

		var oInputCurrCodeJLRMUIDEDITL = new sap.ui.commons.TextField('idCurrCodeJLRMUIDEDITL',{
    		layoutData: new sap.ui.layout.GridData({span: "L6 M6 S12",linebreak: false, margin: true}),
    	}).addStyleClass("FormInputStyle marginTop10");

		//////////////////////////////////////////////////////////////////////////////////////////////////

		var oInputUnitPartCodeJLRMUIDEDITL = new sap.ui.commons.TextField('idUnitPartCodeJLRMUIDEDITL',{
    		layoutData: new sap.ui.layout.GridData({span: "L6 M6 S12",linebreak: false, margin: true}),
    	}).addStyleClass("FormInputStyle marginTop10");

		var oInputEstTypeCodeJLRMUIDEDITL = new sap.ui.commons.TextField('idEstTypeCodeJLRMUIDEDITL',{
    		layoutData: new sap.ui.layout.GridData({span: "L6 M6 S12",linebreak: false, margin: true}),
    	}).addStyleClass("FormInputStyle marginTop10");

		// Table
    	var oTableMUIDErrorsJLREDITL = new sap.ui.table.Table("idTblMUIDErrorsJLRMUIEDITL",{
            columnHeaderHeight: 30,
            selectionMode: sap.ui.table.SelectionMode.None,
            navigationMode: sap.ui.table.NavigationMode.Paginator,
            width: "auto",
            height:"100%"
    	 }).addStyleClass("fontStyle marginTop10 tblBorder");

    	// Table Columns
    	oTableMUIDErrorsJLREDITL.addColumn(new sap.ui.table.Column({
      		 label: new sap.ui.commons.Label({text: "Error Type"}).addStyleClass("wraptextcol"),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "errorType").addStyleClass("wraptext"),
    		 resizable:false,
             sortProperty: "errorType",
             filterProperty: "errorType",
             width:"150px",	// MACHANACHANGES_12062019 changed from xx px to auto
    		 }));

    	oTableMUIDErrorsJLREDITL.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Error ID"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView().bindProperty("text", "id").addStyleClass("wraptext"),
			 resizable:false,
             sortProperty: "id",
             filterProperty: "id",
             width:"150px",	// MACHANACHANGES_12062019 changed from xx px to auto
			 }));

    	oTableMUIDErrorsJLREDITL.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Message"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView().bindProperty("text", "message").addStyleClass("wraptext"),
			 resizable:false,
             sortProperty: "message",
             filterProperty: "message",
             width:"auto",	// MACHANACHANGES_12062019 changed from xx px to auto
			 }));

    	oTableMUIDErrorsJLREDITL.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Error Number"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView().bindProperty("text", "number").addStyleClass("wraptext"),
			 resizable:false,
             sortProperty: "number",
             filterProperty: "number",
             width:"180px",	// MACHANACHANGES_12062019 changed from xx px to auto
			 }));

    	// Buttons
		var oBtnMsgUniqueIDDetAddRepLine = new sap.m.Button("idBtnMUIDAddRepLineJLREDITL",{
	          text : "Add Repair Line",
	          width:"150px",
	          styled:false,
	          layoutData: new sap.ui.layout.GridData({span: "L2 M5 S4",linebreak: true, margin: true}),
	          press:function(){
	        	  //alert("add repair line");
	        	  //oCurrMUIDDTEDITL.addRepairLineDTEDITL();
	        	  oCurrMUIDDTEDITL.updateAddRepairLineTableDTEDITL("A");
	          }}).addStyleClass("submitBtn marginTop10");

	   	 var oBtnMsgUniqueIDDetResubmit = new sap.m.Button("idBtnMUIDResubmitJLREDITL",{
		          text : "Resubmit",
		          //width:"120px",
		          styled:false,
		          layoutData: new sap.ui.layout.GridData({span: "L2 M5 S4",linebreak: true, margin: true}),
		          press:function(){

		        	  var valid = oCurrMUIDDTEDITL.checkOnlyNumeric(); // MAC21092017 Function to check only numeric; Refer function code for more details
		        	  if(!valid){	// MAC21092017+ included this condition to throw error
		        		  var invalidmessage = "Fields Rep Length, Rep Width, Quantity, Man Hrs, Mat Cost can only have numbers";
		        		  sap.ui.commons.MessageBox.alert(invalidmessage);
		        	  }
		        	  else{
		        		  sap.ui.commons.MessageBox.show("Are you sure you want to resubmit the selected message? This action cannot be undone.",
	                      sap.ui.commons.MessageBox.Icon.WARNING,
	                            "Warning",
			          [sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO],
			          oCurrMUIDDTEDITL.resubmitMessageMUIDDTEDITL,
			          sap.ui.commons.MessageBox.Action.YES);
		        	  }
		          }}).addStyleClass("submitBtn marginTop10");

	   	var oBtnMsgUniqueIDDetDelete = new sap.m.Button("idBtnMUIDDeleteJLREDITL",{
	          text : "Delete",
	          //width:"80px",
	          styled:false,
	          layoutData: new sap.ui.layout.GridData({span: "L2 M5 S4",linebreak: true, margin: true}),
	          press:function(){
	        		  sap.ui.commons.MessageBox.show("Are you sure you want to delete the selected message? This action cannot be undone.",
		                      sap.ui.commons.MessageBox.Icon.WARNING,
		                            "Warning",
		          [sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO],
		          new messageUniqueIDEDITLView().deleteMessageMUIDEDITL,
		          sap.ui.commons.MessageBox.Action.YES);
	          }}).addStyleClass("submitBtn marginTop10");

	   	var oFlexBtnsMUIDJLREDITL = new sap.m.FlexBox({
	           items: [
						oBtnMsgUniqueIDDetResubmit,
						oLabelSpaceMUIDJLREDITL,
						oBtnMsgUniqueIDDetDelete
	           ],
	           layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12",linebreak: true, margin: false}),
	           direction : "Row",
				});

	 // Table
    	var oTableAddRepairLineDTEDITL = new sap.ui.table.Table("idTblAddRepairLineDTEDITL",{
            columnHeaderHeight: 40,
            selectionMode: sap.ui.table.SelectionMode.None,
            width:"100%",
            height:"100%"
    	 }).addStyleClass("fontStyle marginTop10 tblBorder");

    	// Table Columns
    	oTableAddRepairLineDTEDITL.addColumn(new sap.ui.table.Column({
      		 label: new sap.ui.commons.Label({text: "Line"}).addStyleClass("wraptextcol"),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "lineNo"),
    		 resizable:false,
             sortProperty: "lineNo",
             filterProperty: "lineNo",
             width : "60px"
    		 }));

    	oTableAddRepairLineDTEDITL.addColumn(new sap.ui.table.Column({
     		 label: new sap.ui.commons.Label({text: "Location Code"}).addStyleClass("wraptextcol"),
	   		 template: new sap.ui.commons.TextField().bindProperty("value", "damLineCode").addStyleClass("borderStyle"),
	   		 resizable:false,
             sortProperty: "damLineCode",
             filterProperty: "damLineCode",
             width : "90px"
   		 }));

    	oTableAddRepairLineDTEDITL.addColumn(new sap.ui.table.Column({
     		 label: new sap.ui.commons.Label({text: "Component Code"}).addStyleClass("wraptextcol"),
	   		 template: new sap.ui.commons.TextField().bindProperty("value", "compCode").addStyleClass("borderStyle"),
	   		 resizable:false,
            sortProperty: "compCode",
            filterProperty: "compCode",
            width : "90px"
   		 }));

    	oTableAddRepairLineDTEDITL.addColumn(new sap.ui.table.Column({
     		 label: new sap.ui.commons.Label({text: "Damage Code"}).addStyleClass("wraptextcol"),
	   		 template: new sap.ui.commons.TextField().bindProperty("value", "samTypeCode").addStyleClass("borderStyle"),
	   		 resizable:false,
             sortProperty: "samTypeCode",
             filterProperty: "samTypeCode",
             width : "90px"
   		 }));

    	oTableAddRepairLineDTEDITL.addColumn(new sap.ui.table.Column({
     		 label: new sap.ui.commons.Label({text: "Material Code"}).addStyleClass("wraptextcol"),
	   		 template: new sap.ui.commons.TextField().bindProperty("value", "compMatCode").addStyleClass("borderStyle"),
	   		 resizable:false,
             sortProperty: "compMatCode",
             filterProperty: "compMatCode",
             width : "90px"
   		 }));

    	oTableAddRepairLineDTEDITL.addColumn(new sap.ui.table.Column({
     		 label: new sap.ui.commons.Label({text: "Repair Code"}).addStyleClass("wraptextcol"),
	   		 template: new sap.ui.commons.TextField().bindProperty("value", "repCode").addStyleClass("borderStyle"),
	   		 resizable:false,
             sortProperty: "repCode",
             filterProperty: "repCode",
             width : "90px"
   		 }));

    	oTableAddRepairLineDTEDITL.addColumn(new sap.ui.table.Column({
     		 label: new sap.ui.commons.Label({text: "UoM"}).addStyleClass("wraptextcol"),
	   		 template: new sap.ui.commons.TextField().bindProperty("value", "measureUnit").addStyleClass("borderStyle"),
	   		 resizable:false,
             sortProperty: "measureUnit",
             filterProperty: "measureUnit",
             width : "90px"
   		 }));

    	oTableAddRepairLineDTEDITL.addColumn(new sap.ui.table.Column({
     		 label: new sap.ui.commons.Label({text: "Length"}).addStyleClass("wraptextcol"),
	   		 template: new sap.ui.commons.TextField().bindProperty("value", "repLength").addStyleClass("borderStyle"),
	   		 resizable:false,
        	 sortProperty: "repLength",
        	 filterProperty: "repLength",
        	 width : "90px"
   		 }));

    	oTableAddRepairLineDTEDITL.addColumn(new sap.ui.table.Column({
     		 label: new sap.ui.commons.Label({text: "Width"}).addStyleClass("wraptextcol"),
	   		 template: new sap.ui.commons.TextField().bindProperty("value", "repWidth").addStyleClass("borderStyle"),
	   		 resizable:false,
	   		 sortProperty: "repWidth",
	   		 filterProperty: "repWidth",
	   		width : "90px"
   		 }));

    	oTableAddRepairLineDTEDITL.addColumn(new sap.ui.table.Column({
     		 label: new sap.ui.commons.Label({text: "Quantity"}).addStyleClass("wraptextcol"),
	   		 template: new sap.ui.commons.TextField().bindProperty("value", "quantity").addStyleClass("borderStyle"),
	   		 resizable:false,
	   		 sortProperty: "quantity",
	   		 filterProperty: "quantity",
	   		width : "90px"
   		 }));

    	oTableAddRepairLineDTEDITL.addColumn(new sap.ui.table.Column({
     		 label: new sap.ui.commons.Label({text: "Labour Hrs"}).addStyleClass("wraptextcol"),
	   		 template: new sap.ui.commons.TextField().bindProperty("value", "manHrs").addStyleClass("borderStyle"),
	   		 resizable:false,
	   		 sortProperty: "manHrs",
            	filterProperty: "manHrs",
            	width : "90px"
   		 }));

    	oTableAddRepairLineDTEDITL.addColumn(new sap.ui.table.Column({
     		 label: new sap.ui.commons.Label({text: "Material Cost"}).addStyleClass("wraptextcol"),
	   		 template: new sap.ui.commons.TextField().bindProperty("value", "matCost").addStyleClass("borderStyle"),
	   		 resizable:false,
	   		 sortProperty: "matCost",
	   		 filterProperty: "matCost",
	   		width : "90px"
   		 }));

    	oTableAddRepairLineDTEDITL.addColumn(new sap.ui.table.Column({
     		 label: new sap.ui.commons.Label({text: "Responsibility"}).addStyleClass("wraptextcol"),
	   		 template: new sap.ui.commons.TextField().bindProperty("value", "responsibility").addStyleClass("borderStyle"),
	   		 resizable:false,
	   		 sortProperty: "responsibility",
	   		 filterProperty: "responsibility",
	   		width : "160px"
   		 }));

    	oTableAddRepairLineDTEDITL.addColumn(new sap.ui.table.Column({
     		 label: new sap.ui.commons.Label({text: "Labour Rate"}).addStyleClass("wraptextcol"),
	   		 template: new sap.ui.commons.TextField().bindProperty("value", "labourRate").addStyleClass("borderStyle"),
	   		 resizable:false,
	   		 sortProperty: "msgType",
	   		 filterProperty: "msgType",
	   		width : "90px"
   		 }));

    	oTableAddRepairLineDTEDITL.addColumn(new sap.ui.table.Column({
     		 label: new sap.ui.commons.Label({text: "Bulletin No."}).addStyleClass("wraptextcol"),
	   		 template: new sap.ui.commons.TextField().bindProperty("value", "bulletinNo").addStyleClass("borderStyle"),
	   		 resizable:false,
	   		 sortProperty: "bulletinNo",
	   		 filterProperty: "bulletinNo",
	   		width : "90px"
   		 }));

    	oTableAddRepairLineDTEDITL.addColumn(new sap.ui.table.Column("idTableAddRepairLineDTEDITLDelete",{
     		 label: new sap.ui.commons.Label({text: ""}),
     		 template: new sap.ui.commons.Link({
   			 press: function(){
   				 var vLineNo = this.getHelpId();
   				var arrayval = arrAddRepairLineDTEDITL.filter(function(el){
   					return el['lineNo'] != vLineNo;
   				});

   				arrAddRepairLineDTEDITL.length = 0; //clear original array
   				//arrAddRepairLineDTEDITL.push.apply(arrAddRepairLineDTEDITL, arrayval); //push all elements except the one we want to delete MAC05082015
   				// Begin of adding by Seyed Ismail on 05.08.2015 MAC05082015+
   				var line;
   				for(var i=0;i<arrayval.length;i++){
   					line = i + 1;
   					arrAddRepairLineDTEDITL.push({
							"bulletinNo": arrayval[i].bulletinNo,
   							"compCode": arrayval[i].compCode,
   							"compMatCode": arrayval[i].compMatCode,
   							"damLineCode": arrayval[i].damLineCode,
   							"deleteLink": arrayval[i].deleteLink,
   							"labourRate": arrayval[i].labourRate,
   							"lineNo": line,
   							"manHrs": arrayval[i].manHrs,
   							"matCost": arrayval[i].matCost,
   							"measureUnit": arrayval[i].measureUnit,
   							"quantity": arrayval[i].quantity,
   							"repCode": arrayval[i].repCode,
   							"repLength": arrayval[i].repLength,
   							"repWidth": arrayval[i].repWidth,
   							"responsibility": arrayval[i].responsibility,
   							"samTypeCode": arrayval[i].samTypeCode,
   							"savedFlag": arrayval[i].savedFlag,
		    			});
   				}
   				// End of adding by Seyed Ismail on 05.08.2015 MAC05082015+

   				sap.ui.getCore().byId("idTblAddRepairLineDTEDITL").getModel().updateBindings();
   				var vArrayLength = arrAddRepairLineDTEDITL.length;
   		    	if(vArrayLength < 25){
   		    		sap.ui.getCore().byId("idTblAddRepairLineDTEDITL").setVisibleRowCount(vArrayLength);
   		    		sap.ui.getCore().byId("idTblAddRepairLineDTEDITL").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
   		    		//vViewAllMail.setVisible(false);
   		    	}
   		    	else{
   		    		sap.ui.getCore().byId("idTblAddRepairLineDTEDITL").setVisibleRowCount(25);
   		    		sap.ui.getCore().byId("idTblAddRepairLineDTEDITL").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
   		    		//vViewAllMail.setVisible(true);
   		    	}
   				 //alert("delete link");
   			 }
   		 }).bindProperty("text", "deleteLink").bindProperty("helpId", "lineNo"),
   		 resizable:false,
   		 width:"90px"
   		 }));

    	// Responsive Grid Layout
	    var oMsgUniqueIDDetJLRLayout1 = new sap.ui.layout.form.ResponsiveGridLayout("idMsgUniqueIDDetJLREDITLLayout1",{
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
	     var oEDITLMsgUniqueIDDetJLRForm1 = new sap.ui.layout.form.Form("idMUIDEDITLMsgUniqueIDDetJLRForm1",{
	             layout: oMsgUniqueIDDetJLRLayout1,
	             formContainers: [

	                     new sap.ui.layout.form.FormContainer("idMUIDEDITLMsgUniqueIDDetJLRForm1C1",{
	                             //title: "Add Movement Out - Single",
                             formElements: [
												new sap.ui.layout.form.FormElement({
													fields: [bckFrmMsgUniqueIDDetJLRToFMEDITL],
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oLabelTitleJLRMUIDEDITL],
												}),
                                            	new sap.ui.layout.form.FormElement({
												    fields: [oLabelSerialNumbr, oInputSerialNumbrJLRMUIDEDITL]
												}),
												new sap.ui.layout.form.FormElement({
													layoutData: new sap.ui.layout.GridData({linebreak: true}),
												    fields: [oLabelMsgType, oInputMsgTypeJLRMUIDEDITL]
												}),
												new sap.ui.layout.form.FormElement({
													layoutData: new sap.ui.layout.GridData({linebreak: true}),
												    fields: [oLabelMoveInDate, oInputMoveInDtJLRMUIDEDITL]
												}),
												new sap.ui.layout.form.FormElement({
													layoutData: new sap.ui.layout.GridData({linebreak: true}),
												    fields: [oLabelUserName, oInputUserNameJLRMUIDEDITL]
												}),
												new sap.ui.layout.form.FormElement({
													layoutData: new sap.ui.layout.GridData({linebreak: true}),
												    fields: [oLabelFuncLoc, oInputFuncLocJLRMUIDEDITL]
												})
	                                     ]
	                     }),
	                     new sap.ui.layout.form.FormContainer("idMUIDEDITLMsgUniqueIDDetJLRForm1C2",{
	                    	 formElements: [
										new sap.ui.layout.form.FormElement({
										    fields: [oLabelActualDate, oInputActualDtJLRMUIDEDITL]
										}),
										new sap.ui.layout.form.FormElement({
											layoutData: new sap.ui.layout.GridData({linebreak: true}),
										    fields: [oLabelWorkCreatedDate, oInputWorkDtJLRMUIDEDITL]
										}),
										new sap.ui.layout.form.FormElement({
											layoutData: new sap.ui.layout.GridData({linebreak: true}),
										    fields: [oLabelSenderAddr, oInputSenderAddrJLRMUIDEDITL]
										}),
	                    	 ]
	                     })
	             ]
	     });

         var oMsgUniqueIDDetJLRLayout2 = new sap.ui.layout.form.ResponsiveGridLayout("idMsgUniqueIDDetJLREDITLLayout2",{
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

         var oEDITLMsgUniqueIDDetJLRForm2 = new sap.ui.layout.form.Form("idMUIDEDITLMsgUniqueIDDetJLRForm2",{
             layout: oMsgUniqueIDDetJLRLayout2,
             formContainers: [

                     new sap.ui.layout.form.FormContainer("idMUIDEDITLMsgUniqueIDDetJLRForm2C1",{
                             //title: "Add Movement Out - Single",
                         formElements: [
										new sap.ui.layout.form.FormElement({
											layoutData: new sap.ui.layout.GridData({linebreak: true}),
										    fields: [oLabelContType, oInputContTypeJLRMUIDEDITL]
										}),
										/*
										MACALPHA19032018_12
										new sap.ui.layout.form.FormElement({
											layoutData: new sap.ui.layout.GridData({linebreak: true}),
										    fields: [oLabelSalesGrade, oInputSalesGradeJLRMUIDEDITL]
										}),*/
                                        ]
                     }),
                     new sap.ui.layout.form.FormContainer("idMUIDEDITLMsgUniqueIDDetJLRForm2C2",{
                         //title: "Add Movement Out - Single",
                     formElements: [
									new sap.ui.layout.form.FormElement({
										layoutData: new sap.ui.layout.GridData({linebreak: true}),
									    fields: [oLabelCondnCode, oInputCondCodeJLRMUIDEDITL]
									})
                                ]
                 })
                     ]
         });

         var oMsgUniqueIDDetJLRLayout3 = new sap.ui.layout.form.ResponsiveGridLayout("idMsgUniqueIDDetJLREDITLLayout3",{
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

            var oEDITLMsgUniqueIDDetJLRForm3 = new sap.ui.layout.form.Form("idMUIDEDITLMsgUniqueIDDetJLRForm3",{
                layout: oMsgUniqueIDDetJLRLayout3,
                formContainers: [

                        new sap.ui.layout.form.FormContainer("idMUIDEDITLMsgUniqueIDDetJLRForm3C1",{
                                //title: "Add Movement Out - Single",
                            formElements: [
											new sap.ui.layout.form.FormElement({
												layoutData: new sap.ui.layout.GridData({linebreak: true}),
											    fields: [oLabelLesseeAuthAmount, oInputLesseeAuthAmntJLRMUIDEDITL]
											}),
                                           ]
                        }),
                        new sap.ui.layout.form.FormContainer("idMUIDEDITLMsgUniqueIDDetJLRForm3C2",{
                            //title: "Add Movement Out - Single",
                        formElements: [
   									new sap.ui.layout.form.FormElement({
   										layoutData: new sap.ui.layout.GridData({linebreak: true}),
   									    fields: [ oLabelCurrencyCode, oInputCurrCodeJLRMUIDEDITL]
   									})
                                   ]
                    })
                        ]
            });

            var oMsgUniqueIDDetJLRLayout4 = new sap.ui.layout.form.ResponsiveGridLayout("idMsgUniqueIDDetJLREDITLLayout4",{
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

                  var oEDITLMsgUniqueIDDetJLRForm4 = new sap.ui.layout.form.Form("idMUIDEDITLMsgUniqueIDDetJLRForm4",{
                      layout: oMsgUniqueIDDetJLRLayout4,
                      formContainers: [

                              new sap.ui.layout.form.FormContainer("idMUIDEDITLMsgUniqueIDDetJLRForm4C1",{
                                      //title: "Add Movement Out - Single",
                                  formElements: [
												new sap.ui.layout.form.FormElement({
													layoutData: new sap.ui.layout.GridData({linebreak: true}),
												    fields: [oLabelUnitPartCode, oInputUnitPartCodeJLRMUIDEDITL]
												}),
                                                 ]
                              }),
                              new sap.ui.layout.form.FormContainer("idMUIDEDITLMsgUniqueIDDetJLRForm4C2",{
                                  //title: "Add Movement Out - Single",
                              formElements: [
         									new sap.ui.layout.form.FormElement({
         										layoutData: new sap.ui.layout.GridData({linebreak: true}),
         									    fields: [oLabelEstTypeCode, oInputEstTypeCodeJLRMUIDEDITL]
         									})
                                         ]
                          })
                              ]
                  });

									/* MACALPHA19032018_12 Begin of adding by Seyed Ismail */

									// Notes 1
									var oLabelNotes1 = new sap.ui.commons.Label({text: "Notes 1",

										layoutData: new sap.ui.layout.GridData({span: "L4 M5 S12",linebreak: false, margin: true}),
													wrapping: true}).addStyleClass("marginTop10");

										var oInputNotes1RMUIDEDITL = new sap.ui.commons.TextField('idInputNotes1RMUIDEDITL',{
								    		layoutData: new sap.ui.layout.GridData({span: "L6 M6 S12",linebreak: false, margin: true}),
								    	}).addStyleClass("FormInputStyle marginTop10");

										// Notes 2
										var oLabelNotes2 = new sap.ui.commons.Label({text: "Notes 2",

											layoutData: new sap.ui.layout.GridData({span: "L4 M5 S12",linebreak: false, margin: true}),
														wrapping: true}).addStyleClass("marginTop10");

											var oInputNotes2RMUIDEDITL = new sap.ui.commons.TextField('idInputNotes2RMUIDEDITL',{
													layoutData: new sap.ui.layout.GridData({span: "L6 M6 S12",linebreak: false, margin: true}),
												}).addStyleClass("FormInputStyle marginTop10");

										// Notes 3
										var oLabelNotes3 = new sap.ui.commons.Label({text: "Notes 3",

											layoutData: new sap.ui.layout.GridData({span: "L4 M5 S12",linebreak: false, margin: true}),
														wrapping: true}).addStyleClass("marginTop10");

											var oInputNotes3RMUIDEDITL = new sap.ui.commons.TextField('idInputNotes3RMUIDEDITL',{
									    		layoutData: new sap.ui.layout.GridData({span: "L6 M6 S12",linebreak: false, margin: true}),
									    	}).addStyleClass("FormInputStyle marginTop10");

									// Notes 4
									var oLabelNotes4 = new sap.ui.commons.Label({text: "Notes 4",

										layoutData: new sap.ui.layout.GridData({span: "L4 M5 S12",linebreak: false, margin: true}),
													wrapping: true}).addStyleClass("marginTop10");

										var oInputNotes4RMUIDEDITL = new sap.ui.commons.TextField('idInputNotes4RMUIDEDITL',{
								    		layoutData: new sap.ui.layout.GridData({span: "L6 M6 S12",linebreak: false, margin: true}),
								    	}).addStyleClass("FormInputStyle marginTop10");

										// Notes 5
										var oLabelNotes5 = new sap.ui.commons.Label({text: "Notes 5",

											layoutData: new sap.ui.layout.GridData({span: "L4 M5 S12",linebreak: false, margin: true}),
														wrapping: true}).addStyleClass("marginTop10");

											var oInputNotes5RMUIDEDITL = new sap.ui.commons.TextField('idInputNotes5RMUIDEDITL',{
									    		layoutData: new sap.ui.layout.GridData({span: "L6 M6 S12",linebreak: false, margin: true}),
									    	}).addStyleClass("FormInputStyle marginTop10");

												// Notes Dummy
												var oLabelNotesDummy = new sap.ui.commons.Label({text: "",

													layoutData: new sap.ui.layout.GridData({span: "L4 M5 S12",linebreak: false, margin: true}),
																wrapping: true}).addStyleClass("marginTop10");

																var oLabelNotesDummy1 = new sap.ui.commons.Label({text: "",

																	layoutData: new sap.ui.layout.GridData({span: "L4 M5 S12",linebreak: false, margin: true}),
																				wrapping: true}).addStyleClass("marginTop10");

												// DPP Limit
												var oLabelDppLimit = new sap.ui.commons.Label({text: "Seacover Limit Amt.",

													layoutData: new sap.ui.layout.GridData({span: "L4 M5 S12",linebreak: false, margin: true}),
																wrapping: true}).addStyleClass("marginTop10");

													var oInputDppLimitRMUIDEDITL = new sap.ui.commons.Label('idInputDppLimitRMUIDEDITL',{
															layoutData: new sap.ui.layout.GridData({span: "L6 M6 S12",linebreak: false, margin: true}),
														}).addStyleClass("FormInputStyle marginTop10");

												// DPP Curr.
												var oLabelDppCurr = new sap.ui.commons.Label({text: "Seacover Limit Curr.",

													layoutData: new sap.ui.layout.GridData({span: "L4 M5 S12",linebreak: false, margin: true}),
																wrapping: true}).addStyleClass("marginTop10");

													var oInputDppCurrRMUIDEDITL = new sap.ui.commons.Label('idInputDppCurrRMUIDEDITL',{
															layoutData: new sap.ui.layout.GridData({span: "L6 M6 S12",linebreak: false, margin: true}),
														}).addStyleClass("FormInputStyle marginTop10");

									var oMsgUniqueIDDetJLRLayoutNotes = new sap.ui.layout.form.ResponsiveGridLayout("idMsgUniqueIDDetJLRLayoutNotes",{
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

			                  var oEDITLMsgUniqueIDDetJLRFormNotes = new sap.ui.layout.form.Form("idMUIDEDITLMsgUniqueIDDetJLRFormNotes",{
			                      layout: oMsgUniqueIDDetJLRLayoutNotes,
			                      formContainers: [

			                       new sap.ui.layout.form.FormContainer("idMUIDEDITLMsgUniqueIDDetJLRFormNotesC1",{
			                                  formElements: [
																					new sap.ui.layout.form.FormElement({
																						layoutData: new sap.ui.layout.GridData({linebreak: true}),
																					    fields: [oLabelNotes1, oInputNotes1RMUIDEDITL]
																					}),
																					new sap.ui.layout.form.FormElement({
																						layoutData: new sap.ui.layout.GridData({linebreak: true}),
																					    fields: [oLabelNotes3, oInputNotes3RMUIDEDITL]
																					}),
																					new sap.ui.layout.form.FormElement({
																						layoutData: new sap.ui.layout.GridData({linebreak: true}),
																					    fields: [oLabelNotes5, oInputNotes5RMUIDEDITL]
																					})
			                                    ]
			                              }),
			                              new sap.ui.layout.form.FormContainer("idMUIDEDITLMsgUniqueIDDetJLRFormNotesC2",{
			                              		formElements: [
								         									new sap.ui.layout.form.FormElement({
								         										layoutData: new sap.ui.layout.GridData({linebreak: true}),
								         									    fields: [oLabelNotes2, oInputNotes2RMUIDEDITL]
								         									}),
																					new sap.ui.layout.form.FormElement({
								         										layoutData: new sap.ui.layout.GridData({linebreak: true}),
								         									    fields: [oLabelNotes4, oInputNotes4RMUIDEDITL]
								         									})
			                                    ]
			                          		})
			                              ]
			                  });

												var oMsgUniqueIDDetJLRLayoutDpp = new sap.ui.layout.form.ResponsiveGridLayout("idMsgUniqueIDDetJLRLayoutDpp",{
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


													 var oEDITLMsgUniqueIDDetJLRFormDpp = new sap.ui.layout.form.Form("idMUIDEDITLMsgUniqueIDDetJLRFormDpp",{
													 		layout: oMsgUniqueIDDetJLRLayoutDpp,
													 		formContainers: [

													 		 new sap.ui.layout.form.FormContainer("idMUIDEDITLMsgUniqueIDDetJLRFormDppC1",{
													 								formElements: [
																						new sap.ui.layout.form.FormElement({
																							layoutData: new sap.ui.layout.GridData({linebreak: true}),
																						    fields: [oLabelDppLimit, oInputDppLimitRMUIDEDITL]
																						})
													 									]
													 						}),
															new sap.ui.layout.form.FormContainer("idMUIDEDITLMsgUniqueIDDetJLRFormDppC2",{
													 								formElements: [
													 									new sap.ui.layout.form.FormElement({
													 										layoutData: new sap.ui.layout.GridData({linebreak: true}),
													 											fields: [oLabelDppCurr, oInputDppCurrRMUIDEDITL]
													 									})
													 									]
													 						})
													 						]
													 });

								  /* MACALPHA19032018_12 Begin of adding by Seyed Ismail */

                  var oMsgUniqueIDDetJLRLayout5 = new sap.ui.layout.form.ResponsiveGridLayout("idMsgUniqueIDDetJLREDITLLayout5",{
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

                      var oEDITLMsgUniqueIDDetJLRForm5 = new sap.ui.layout.form.Form("idMUIDEDITLMsgUniqueIDDetJLRForm5",{
                          layout: oMsgUniqueIDDetJLRLayout5,
                          formContainers: [

                                  new sap.ui.layout.form.FormContainer("idMUIDEDITLMsgUniqueIDDetJLRForm5C1",{
                                          //title: "Add Movement Out - Single",
                                      formElements: [
    												new sap.ui.layout.form.FormElement({
													layoutData: new sap.ui.layout.GridData({linebreak: true}),
												    fields: [oBtnMsgUniqueIDDetAddRepLine],
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oTableAddRepairLineDTEDITL]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oHorDivide4]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oTableMUIDErrorsJLREDITL]
												}),
												new sap.ui.layout.form.FormElement({
													layoutData: new sap.ui.layout.GridData({linebreak: true}),
												    fields: [oFlexBtnsMUIDJLREDITL]
												})
                                                     ]
                                  })
                                  ]
                      });

                      var oMsgUniqueIDDetJLRLayout6 = new sap.ui.layout.form.ResponsiveGridLayout("idMsgUniqueIDDetJLREDITLLayout6",{
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

                          var oEDITLMsgUniqueIDDetJLRForm6 = new sap.ui.layout.form.Form("idMUIDEDITLMsgUniqueIDDetJLRForm6",{
                              layout: oMsgUniqueIDDetJLRLayout6,
                              formContainers: [

                                      new sap.ui.layout.form.FormContainer("idMUIDEDITLMsgUniqueIDDetJLRForm6C1",{
                                              //title: "Add Movement Out - Single",
                                          formElements: [
    												new sap.ui.layout.form.FormElement({
    												    fields: [oTableMUIDErrorsJLREDITL]
    												}),
    												new sap.ui.layout.form.FormElement({
    													layoutData: new sap.ui.layout.GridData({linebreak: true}),
    												    fields: [oFlexBtnsMUIDJLREDITL]
    												})
                                                  ]
                                      })
                                      ]
                          });

      var oFlxBoxWestimResult = new sap.m.FlexBox({
  	      items: [ oEDITLMsgUniqueIDDetJLRForm1,
  	             oHorDivider,
  	             oEDITLMsgUniqueIDDetJLRForm2,
  	             oHorDivider1,
  	             oEDITLMsgUniqueIDDetJLRForm3,
  	             oHorDivide2,
  	             oEDITLMsgUniqueIDDetJLRForm4,
  	             oHorDivide3,
								 oEDITLMsgUniqueIDDetJLRFormNotes,
								 oHorDivideNotes,
								 oEDITLMsgUniqueIDDetJLRFormDpp,
								 oHorDivideDpp,
  	             oEDITLMsgUniqueIDDetJLRForm5,
  	             oHorDivide4,
  	         		 oEDITLMsgUniqueIDDetJLRForm6],
  	       direction: "Column",
  	    });

	     return oFlxBoxWestimResult;
	},

	updateMsgUniqueIDDetJLREDITL: function(){
		/*oModelMsgUniqueIDDetailsJLREDITL = new sap.ui.model.json.JSONModel();
		oModelMsgUniqueIDDetailsJLREDITL.setData({modelData: arrViewErrorDetailEDITL});
    	sap.ui.getCore().byId("idTblMUIDErrorsJLRMUIEDITL").setModel(oModelMsgUniqueIDDetailsJLREDITL);
    	sap.ui.getCore().byId("idTblMUIDErrorsJLRMUIEDITL").bindRows("/modelData");*/

    	sap.ui.getCore().byId("idMsgUniqueIDDetJLRTitleEDITL").setText("Message Details for " + vMsgUniqueIdToPassMUIDEDITL);

    	/*if(arrViewErrorDetailEDITL.length >= 25){
    		sap.ui.getCore().byId("idTblMUIDErrorsJLRMUIEDITL").setVisibleRowCount(25);
    	}
    	else{
    		sap.ui.getCore().byId("idTblMUIDErrorsJLRMUIEDITL").setVisibleRowCount(arrViewErrorDetailEDITL.length);
    	}*/

    	sap.ui.getCore().byId("idSerNoJLRMUIDEDITL").setValue(arrMsgUniqueIDDetJLREDITL[0].serialNumbr.trim().toUpperCase());
    	sap.ui.getCore().byId("idMsgTypeJLRMUIDEDITL").setValue(arrMsgUniqueIDDetJLREDITL[0].msgType);
    	sap.ui.getCore().byId("idMoveInDtJLRMUIDEDITL").setValue(arrMsgUniqueIDDetJLREDITL[0].moveInDate);
    	sap.ui.getCore().byId("idUserNameJLRMUIDEDITL").setValue(arrMsgUniqueIDDetJLREDITL[0].userName);
    	sap.ui.getCore().byId("idFuncLocJLRMUIDEDITL").setValue(arrMsgUniqueIDDetJLREDITL[0].funcLoc);
    	sap.ui.getCore().byId("idActualDtJLRMUIDEDITL").setValue(arrMsgUniqueIDDetJLREDITL[0].actualDate);
    	sap.ui.getCore().byId("idWorkDtJLRMUIDEDITL").setValue(arrMsgUniqueIDDetJLREDITL[0].workDate);
    	sap.ui.getCore().byId("idSenderAddrJLRMUIDEDITL").setValue(arrMsgUniqueIDDetJLREDITL[0].senderAddress);
    	sap.ui.getCore().byId("idContTypeJLRMUIDEDITL").setValue(arrMsgUniqueIDDetJLREDITL[0].containerType);
    	sap.ui.getCore().byId("idSalesGradeJLRMUIDEDITL").setValue(arrMsgUniqueIDDetJLREDITL[0].salesGrade);
			sap.ui.getCore().byId("idInputNotes1RMUIDEDITL").setValue(arrAddRepairLineDTEDITL[0].notes1); // MACALPHA19032018_12
			sap.ui.getCore().byId("idInputNotes2RMUIDEDITL").setValue(arrAddRepairLineDTEDITL[0].notes2); // MACALPHA19032018_12
			sap.ui.getCore().byId("idInputNotes3RMUIDEDITL").setValue(arrAddRepairLineDTEDITL[0].notes3); // MACALPHA19032018_12
			sap.ui.getCore().byId("idInputNotes4RMUIDEDITL").setValue(arrAddRepairLineDTEDITL[0].notes4); // MACALPHA19032018_12
			sap.ui.getCore().byId("idInputNotes5RMUIDEDITL").setValue(arrAddRepairLineDTEDITL[0].notes5); // MACALPHA19032018_12
			sap.ui.getCore().byId("idInputDppLimitRMUIDEDITL").setText(arrAddRepairLineDTEDITL[0].dpplimit); // MACALPHA19032018_12
			sap.ui.getCore().byId("idInputDppCurrRMUIDEDITL").setText(arrAddRepairLineDTEDITL[0].dppcurr); // MACALPHA19032018_12
    	sap.ui.getCore().byId("idCondCodeJLRMUIDEDITL").setValue(arrMsgUniqueIDDetJLREDITL[0].conditionCode);
    	sap.ui.getCore().byId("idLesseeAuthAmntJLRMUIDEDITL").setValue(arrMsgUniqueIDDetJLREDITL[0].lesseeAuthAmnt);
    	sap.ui.getCore().byId("idCurrCodeJLRMUIDEDITL").setValue(arrMsgUniqueIDDetJLREDITL[0].currencyCode);
    	sap.ui.getCore().byId("idUnitPartCodeJLRMUIDEDITL").setValue(arrMsgUniqueIDDetJLREDITL[0].unitPartCode);
    	sap.ui.getCore().byId("idEstTypeCodeJLRMUIDEDITL").setValue(arrMsgUniqueIDDetJLREDITL[0].estimateTypeCode);
	},

	updateErrorMsgTblDTEDITL:function(){
		oModelErrMsgDTEDITL = new sap.ui.model.json.JSONModel();
		oModelErrMsgDTEDITL.setData({modelData: arrViewErrorDetailEDITL});
    	sap.ui.getCore().byId("idTblMUIDErrorsJLRMUIEDITL").setModel(oModelErrMsgDTEDITL);
    	sap.ui.getCore().byId("idTblMUIDErrorsJLRMUIEDITL").bindRows("/modelData");
    	var vArrayLength = arrViewErrorDetailEDITL.length;
    	if(vArrayLength < 25){
    		sap.ui.getCore().byId("idTblMUIDErrorsJLRMUIEDITL").setVisibleRowCount(vArrayLength);
    		sap.ui.getCore().byId("idTblMUIDErrorsJLRMUIEDITL").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
    		//vViewAllMail.setVisible(false);
    	}
    	else{
    		sap.ui.getCore().byId("idTblMUIDErrorsJLRMUIEDITL").setVisibleRowCount(25);
    		sap.ui.getCore().byId("idTblMUIDErrorsJLRMUIEDITL").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
    		//vViewAllMail.setVisible(true);
    	}
	},

	updateAddRepairLineTableDTEDITL: function(source){
		if(source == "A"){
			arrAddRepairLineDTEDITL.push({
				'lineNo': "",
				'damLineCode': "",
				'compCode': "",
				'samTypeCode': "",
				'compMatCode': "",
				'repCode': "",
            	'measureUnit':"",
            	'repLength': "",
            	'repWidth':  "",
            	'quantity':  "",
            	'manHrs':  "",
            	'matCost':  "",
            	'responsibility': "",
            	'labourRate': "",
            	'bulletinNo':  "",
            	'deleteLink': "Delete",
            	'savedFlag': false
			});
			var len = arrAddRepairLineDTEDITL.length;
			if(len == 1){
				arrAddRepairLineDTEDITL[len-1]['lineNo'] = 1;
			}else{
				var lastSeq = parseInt(arrAddRepairLineDTEDITL[len-2]['lineNo'])+1;
				arrAddRepairLineDTEDITL[len-1]['lineNo'] = lastSeq;
			}
		}
		oModelAddRepairLineDTEDITL = new sap.ui.model.json.JSONModel();
		oModelAddRepairLineDTEDITL.setData({modelData: arrAddRepairLineDTEDITL});
    	sap.ui.getCore().byId("idTblAddRepairLineDTEDITL").setModel(oModelAddRepairLineDTEDITL);
    	sap.ui.getCore().byId("idTblAddRepairLineDTEDITL").bindRows("/modelData");
    	var vArrayLength = arrAddRepairLineDTEDITL.length;
    	if(vArrayLength < 25){
    		sap.ui.getCore().byId("idTblAddRepairLineDTEDITL").setVisibleRowCount(vArrayLength);
    		sap.ui.getCore().byId("idTblAddRepairLineDTEDITL").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
    		//vViewAllMail.setVisible(false);
    	}
    	else{
    		sap.ui.getCore().byId("idTblAddRepairLineDTEDITL").setVisibleRowCount(25);
    		sap.ui.getCore().byId("idTblAddRepairLineDTEDITL").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
    		//vViewAllMail.setVisible(true);
    	}
    	//sap.ui.getCore().byId("idTblAddRepairLineDTEDITL").setVisibleRowCount(arrAddRepairLineDTEDITL.length);

	},

	resubmitMessageMUIDDTEDITL: function(sResult){
		if(sResult == "YES"){
			var aLineNo = [];
			var count = 0;
			for(var i =0; i <arrAddRepairLineDTEDITL.length; i++){
				if((arrAddRepairLineDTEDITL[i].damLineCode == '') &&
				(arrAddRepairLineDTEDITL[i].compCode == '') &&
				(arrAddRepairLineDTEDITL[i].samTypeCode == '') &&
				(arrAddRepairLineDTEDITL[i].compMatCode == '') &&
				(arrAddRepairLineDTEDITL[i].repCode == '') &&
				(arrAddRepairLineDTEDITL[i].repLength == '') &&
				(arrAddRepairLineDTEDITL[i].repWidth == '') &&
				(arrAddRepairLineDTEDITL[i].measureUnit == '') &&
				(arrAddRepairLineDTEDITL[i].quantity == '') &&
				(arrAddRepairLineDTEDITL[i].manHrs == '') &&
				(arrAddRepairLineDTEDITL[i].matCost == '') &&
				(arrAddRepairLineDTEDITL[i].responsibility == '') &&
				(arrAddRepairLineDTEDITL[i].labourRate == '') &&
				(arrAddRepairLineDTEDITL[i].bulletinNo == '')){

					var vLineNo = arrAddRepairLineDTEDITL[i].lineNo;
					aLineNo[count] = vLineNo;
					count++;
				}
			}
				for(var j=0;j<aLineNo.length;j++){
					var arrayval = arrAddRepairLineDTEDITL.filter(function(el){
	   					return el['lineNo'] != aLineNo[j];
	   				});

	   				arrAddRepairLineDTEDITL.length = 0; //clear original array
	   				arrAddRepairLineDTEDITL.push.apply(arrAddRepairLineDTEDITL, arrayval); //push all elements except the one we want to delete


	   				sap.ui.getCore().byId("idTblAddRepairLineDTEDITL").getModel().updateBindings();
	   				var vArrayLength = arrAddRepairLineDTEDITL.length;
	   		    	if(vArrayLength < 6){
	   		    		sap.ui.getCore().byId("idTblAddRepairLineDTEDITL").setVisibleRowCount(vArrayLength);
	   		    		sap.ui.getCore().byId("idTblAddRepairLineDTEDITL").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
	   		    		//vViewAllMail.setVisible(false);
	   		    	}
	   		    	else{
	   		    		sap.ui.getCore().byId("idTblAddRepairLineDTEDITL").setVisibleRowCount(6);
	   		    		sap.ui.getCore().byId("idTblAddRepairLineDTEDITL").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
	   		    		//vViewAllMail.setVisible(true);
	   		    	}
				}
			
				for(var x=0; x<arrAddRepairLineDTEDITL.length; x++){
					arrAddRepairLineDTEDITL[x].manHrs = String(Number(arrAddRepairLineDTEDITL[x].manHrs));
					arrAddRepairLineDTEDITL[x].matCost = String(Number(arrAddRepairLineDTEDITL[x].matCost));
					arrAddRepairLineDTEDITL[x].repLength = String(Number(arrAddRepairLineDTEDITL[x].repLength));
					arrAddRepairLineDTEDITL[x].repWidth = String(Number(arrAddRepairLineDTEDITL[x].repWidth));
					arrAddRepairLineDTEDITL[x].quantity = String(Number(arrAddRepairLineDTEDITL[x].quantity));
				}

			new messageUniqueIDDetailsJLREDITLView().saveRepairLineItemsEDITL("X");
		}
	},

	saveRepairLineItemsEDITL: function(flag){
		var estimateIdEDITL = arrMsgUniqueIDDetJLREDITL[0].estimateId;
		oCurrent = this;
		var serno = sap.ui.getCore().byId("idSerNoJLRMUIDEDITL").getValue().trim().toUpperCase();
    	var msgtype = sap.ui.getCore().byId("idMsgTypeJLRMUIDEDITL").getValue();

    	var movInDt = sap.ui.getCore().byId("idMoveInDtJLRMUIDEDITL").getValue();
    	if(movInDt.trim().length == 0)
    		movInDt = "1901-01-01T00:00:00";
		else{
			movInDt = movInDt.split("-");
			movInDt = movInDt[2]+"-"+movInDt[1]+"-"+movInDt[0]+"T00:00:00";
		}

    	var UserName = sap.ui.getCore().byId("idUserNameJLRMUIDEDITL").getValue();
    	var funcLoc = sap.ui.getCore().byId("idFuncLocJLRMUIDEDITL").getValue();

    	var ActualDt = sap.ui.getCore().byId("idActualDtJLRMUIDEDITL").getValue();
    	if(ActualDt.trim().length == 0)
    		ActualDt = "1901-01-01T00:00:00";
		else{
			ActualDt = ActualDt.split("-");
			ActualDt = ActualDt[2]+"-"+ActualDt[1]+"-"+ActualDt[0]+"T00:00:00";
		}

    	var WorkDt = sap.ui.getCore().byId("idWorkDtJLRMUIDEDITL").getValue();
    	if(WorkDt.trim().length == 0)
    		WorkDt = "1901-01-01T00:00:00";
		else{
			WorkDt = WorkDt.split("-");
			WorkDt = WorkDt[2]+"-"+WorkDt[1]+"-"+WorkDt[0]+"T00:00:00";
		}

    	var SendrAddr = sap.ui.getCore().byId("idSenderAddrJLRMUIDEDITL").getValue();
    	var ContType = sap.ui.getCore().byId("idContTypeJLRMUIDEDITL").getValue();
    	var SalesGrade = sap.ui.getCore().byId("idSalesGradeJLRMUIDEDITL").getValue();

			var Notes1 = sap.ui.getCore().byId("idInputNotes1RMUIDEDITL").getValue(); // MACALPHA19032018_12
			var Notes2 = sap.ui.getCore().byId("idInputNotes2RMUIDEDITL").getValue(); // MACALPHA19032018_12
			var Notes3 = sap.ui.getCore().byId("idInputNotes3RMUIDEDITL").getValue(); // MACALPHA19032018_12
			var Notes4 = sap.ui.getCore().byId("idInputNotes4RMUIDEDITL").getValue(); // MACALPHA19032018_12
			var Notes5 = sap.ui.getCore().byId("idInputNotes5RMUIDEDITL").getValue(); // MACALPHA19032018_12

    	var CondCode = sap.ui.getCore().byId("idCondCodeJLRMUIDEDITL").getValue();
    	var LesseeAuthAmt = sap.ui.getCore().byId("idLesseeAuthAmntJLRMUIDEDITL").getValue();
    	var CurrCode = sap.ui.getCore().byId("idCurrCodeJLRMUIDEDITL").getValue();
    	var UPC = sap.ui.getCore().byId("idUnitPartCodeJLRMUIDEDITL").getValue();
    	var estType = sap.ui.getCore().byId("idEstTypeCodeJLRMUIDEDITL").getValue();

    	var urlToCall = "/Repair_Estim_Save_EDI?$filter=EstimateId eq '" + estimateIdEDITL + "' and SerialNumber eq '" + serno + "'"
		+ " and EstimateType eq '" + estType + "' and CreatedDt eq datetime'" + WorkDt + "' and CreatedTime eq time'PT00H00M00S' and UnitPartcode eq '" + UPC + "'"
		+ " and JobType eq '' and SaleGrade eq '" + SalesGrade + "' and EstimateDt eq datetime'1901-01-01T00:00:00' and LesseAmt eq '" + LesseeAuthAmt + "' and CurrencyCode eq '" + CurrCode + "' and UserId eq '" + UserName + "'"
		+ " and MessageId eq '" + vMsgUniqueIdToPassMUIDEDITL + "' and Para1 eq '" + flag + "'"
		// MACALPHA19032018_12 Begin of adding by Seyed Ismail
		+ " and Notes1 eq '" + Notes1 + "'"
		+ " and Notes2 eq '" + Notes2 + "'"
		+ " and Notes3 eq '" + Notes3 + "'"
		+ " and Notes4 eq '" + Notes4 + "'"
		+ " and Notes5 eq '" + Notes5 +
		// MACALPHA19032018_12 End of adding by Seyed Ismail
		"'";

	/*	http://seanwgd1.gessap.local:8000/sap/opu/odata/sap/ZNW_SEACO_PORTAL_LOT5_SRV/Repair_Estim_Save_EDI?$filter=EstimateId eq '' and SerialNumber eq 'GESU3437508'
			and EstimateType eq 'ORIGINAL_ESTIMATE' and CreatedDt eq datetime'1901-01-01T00:00:00' and CreatedTime eq time'PT11H00M00S' and UnitPartcode eq ''
			and JobType eq '' and SaleGrade eq '1' and EstimateDt eq datetime'2014-05-23T00:00:00' and LesseAmt eq '' and CurrencyCode eq 'SGD' and UserId eq ''
			and MessageId eq 'X201405230806530001' and IRepa1 eq '1$EXXX$PAA$MS$$RP$0$0$1$1$1500$$U$1' and IRepa2 eq '' and IRepa3 eq '' and IRepa4 eq ''
			and IRepa5 eq '' and IRepa6 eq '' and IRepa7 eq '' and IRepa8 eq '' and IRepa9 eq '' and IRepa10 eq '' and IRepa11 eq '' and IRepa12 eq ''
			and IRepa13 eq '' and IRepa14 eq '' and IRepa15 eq ''*/
    	var count = 0;
    	var arrFieldEDITL = ["IRepa1", "IRepa2","IRepa3","IRepa4","IRepa5","IRepa6","IRepa7","IRepa8","IRepa9","IRepa10","IRepa11","IRepa12"]
    	for(var i=0;i<arrAddRepairLineDTEDITL.length;i++){
    		if(arrAddRepairLineDTEDITL[i].savedFlag == false){
    			if(count < 12){
    				arrAddRepairLineDTEDITL[i].savedFlag = true;
    				var valToPass = '';
    				//valToPass += arrAddRepairLineDTEDITL[i].lineNo + '$'; 		// MAC02122016 -
    				valToPass += padZero(arrAddRepairLineDTEDITL[i].lineNo,2) + '$';	// MAC02122016 +
					valToPass += arrAddRepairLineDTEDITL[i].damLineCode + '$';
					valToPass += arrAddRepairLineDTEDITL[i].compCode + '$';
					valToPass += arrAddRepairLineDTEDITL[i].samTypeCode + '$';
					valToPass += arrAddRepairLineDTEDITL[i].compMatCode + '$';
					valToPass += arrAddRepairLineDTEDITL[i].repCode + '$';
					// valToPass += arrAddRepairLineDTEDITL[i].repLength + '$';	// MAC04072019_APS903-
					// valToPass += arrAddRepairLineDTEDITL[i].repWidth + '$';	// MAC04072019_APS903-
					valToPass += (arrAddRepairLineDTEDITL[i].repLength == "")?"":String(parseInt(arrAddRepairLineDTEDITL[i].repLength))+ '$'; // MAC04072019_APS903+
					valToPass += (arrAddRepairLineDTEDITL[i].repWidth == "")?"":String(parseInt(arrAddRepairLineDTEDITL[i].repWidth))+ '$';	// MAC04072019_APS903+

					valToPass += arrAddRepairLineDTEDITL[i].measureUnit + '$';
					
					// valToPass += arrAddRepairLineDTEDITL[i].quantity + '$';	// MAC04072019_APS903-
					valToPass += (arrAddRepairLineDTEDITL[i].quantity == "")?"":String(parseInt(arrAddRepairLineDTEDITL[i].quantity))+ '$';	// MAC04072019_APS903+


					valToPass += arrAddRepairLineDTEDITL[i].manHrs + '$';	// MAC04072019_APS903-
					valToPass += arrAddRepairLineDTEDITL[i].matCost + '$';	// MAC04072019_APS903-
					
					// valToPass += (arrAddRepairLineDTEDITL[i].manHrs == "")?"":String(parseInt(arrAddRepairLineDTEDITL[i].manHrs));	// MAC04072019_APS903+
					// valToPass += (arrAddRepairLineDTEDITL[i].matCost == "")?"":String(parseInt(arrAddRepairLineDTEDITL[i].matCost));	// MAC04072019_APS903+
					valToPass += arrAddRepairLineDTEDITL[i].responsibility + '$';
					valToPass += arrAddRepairLineDTEDITL[i].labourRate + '$';
					valToPass += arrAddRepairLineDTEDITL[i].bulletinNo;
					urlToCall += " and " + arrFieldEDITL[count] + " eq '"+ valToPass +"'";
    				count++;
    			}
    		}
    	}

		oModel = new sap.ui.model.odata.ODataModel(serviceUrl15, true);
		OData.request({
		      requestUri: serviceUrl15 + urlToCall,
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
		    function (resultdata, response){
		    	new messageUniqueIDDetailsJLREDITLView().fnCallBackSaveSuccessEDITL(resultdata);

		    },
		    function(err){
		    	 busyDialog.close();
		    	 errorfromServer(err);
		    });
	},

	fnCallBackSaveSuccessEDITL: function(resultdata){
		oCurrent = this;
		try{
			if(resultdata != undefined){
				if(resultdata.results.length > 0){
					var arrayval = arrAddRepairLineDTEDITL.filter(function(el){
						return ((el["savedFlag"] != true));
					});
					var selEstmtIdEDITL = resultdata.results[0].LvEstimateId
					for(var j=0 ; j < arrMsgUniqueIDDetJLREDITL.length ; j++){
						arrMsgUniqueIDDetJLREDITL[0].estimateId = selEstmtIdEDITL;
					}
					if((arrayval.length > 0) && (resultdata.results[0].LvItem == "Item table updated.")){
						new messageUniqueIDDetailsJLREDITLView().saveRepairLineItemsEDITL("");
					}
					if(arrayval.length == 0){
						new messageUniqueIDDetailsJLREDITLView().fnResubmitAfterSaveEDITL();
					}
				}else{
					sap.ui.commons.MessageBox.alert("Error while saving estimate.\nPlease contact the system admin or try again later.");//msg = "No result found.";
				}
			}else{
				sap.ui.commons.MessageBox.alert("Error while saving estimate.\nPlease contact the system admin or try again later.");//msg = "No result found.";
			}
		}catch(e)
		{
			busyDialog.close();
			sap.ui.commons.MessageBox.alert("Error occured during save Estimate.");
		}
	},

	fnResubmitAfterSaveEDITL: function(){
		oCurrent = this;
		var serno = sap.ui.getCore().byId("idSerNoJLRMUIDEDITL").getValue().trim().toUpperCase();
    	var msgtype = sap.ui.getCore().byId("idMsgTypeJLRMUIDEDITL").getValue();

    	var movInDt = sap.ui.getCore().byId("idMoveInDtJLRMUIDEDITL").getValue();
    	if(movInDt.trim().length == 0)
    		movInDt = "1901-01-01T00:00:00";
		else
		{
			movInDt = movInDt.split("-");
			movInDt = movInDt[2]+"-"+movInDt[1]+"-"+movInDt[0]+"T00:00:00";
		}
    	var UserName = sap.ui.getCore().byId("idUserNameJLRMUIDEDITL").getValue();
    	var funcLoc = sap.ui.getCore().byId("idFuncLocJLRMUIDEDITL").getValue();

    	var ActualDt = sap.ui.getCore().byId("idActualDtJLRMUIDEDITL").getValue();
    	if(ActualDt.trim().length == 0)
    		ActualDt = "1901-01-01T00:00:00";
		else{
			ActualDt = ActualDt.split("-");
			ActualDt = ActualDt[2]+"-"+ActualDt[1]+"-"+ActualDt[0]+"T00:00:00";
		}
    	var WorkDt = sap.ui.getCore().byId("idWorkDtJLRMUIDEDITL").getValue();
    	if(WorkDt.trim().length == 0)
    		WorkDt = "1901-01-01T00:00:00";
		else{
			WorkDt = WorkDt.split("-");
			WorkDt = WorkDt[2]+"-"+WorkDt[1]+"-"+WorkDt[0]+"T00:00:00";
		}
    	var SendrAddr = sap.ui.getCore().byId("idSenderAddrJLRMUIDEDITL").getValue();
    	var ContType = sap.ui.getCore().byId("idContTypeJLRMUIDEDITL").getValue();
    	var SalesGrade = sap.ui.getCore().byId("idSalesGradeJLRMUIDEDITL").getValue();

			var Notes1 = sap.ui.getCore().byId("idInputNotes1RMUIDEDITL").getValue(); // MACALPHA19032018_12
			var Notes2 = sap.ui.getCore().byId("idInputNotes2RMUIDEDITL").getValue(); // MACALPHA19032018_12
			var Notes3 = sap.ui.getCore().byId("idInputNotes3RMUIDEDITL").getValue(); // MACALPHA19032018_12
			var Notes4 = sap.ui.getCore().byId("idInputNotes4RMUIDEDITL").getValue(); // MACALPHA19032018_12
			var Notes5 = sap.ui.getCore().byId("idInputNotes5RMUIDEDITL").getValue(); // MACALPHA19032018_12

    	var CondCode = sap.ui.getCore().byId("idCondCodeJLRMUIDEDITL").getValue();
    	var LesseeAuthAmt = sap.ui.getCore().byId("idLesseeAuthAmntJLRMUIDEDITL").getValue();
    	var CurrCode = sap.ui.getCore().byId("idCurrCodeJLRMUIDEDITL").getValue();
    	var UPC = sap.ui.getCore().byId("idUnitPartCodeJLRMUIDEDITL").getValue();
    	var estType = sap.ui.getCore().byId("idEstTypeCodeJLRMUIDEDITL").getValue();

    	var filter = "/EDI_Resubmit?$filter=IMsgId1 eq '" + vMsgUniqueIdToPassMUIDEDITL + "' and IMsgId2 eq ''"
    		+ "and IMsgId3 eq '' and IMsgId4 eq '' and IStatus eq '' and ISerialNumber eq '" + serno + "' and IEquipmentNumber eq ''"
    		+ "and IAssetNumber eq '' and ISubAssetNumber eq '' and IMaterialType eq '' and IContainerType eq '" + ContType + "' and ICompanyCode eq ''"
    		+ "and IContainerStatus eq '" + msgtype + "' and IFunctionalLocat eq '" + funcLoc + "' and IPlannerGroup eq '' and IWorkCentre eq ''"
    		+ "and IGateDate eq datetime'1901-01-01T00:00:00' and IReleaseNumber eq '' and ISenderAddress eq '" + SendrAddr + "' and ILeaseContractN eq ''"
    		+ "and IPonumber eq '' and IPoline eq '' and IReturnAuthNumb eq '' and IConditionCode eq '" + CondCode + "' and IQualifyingKey eq ''"
    		+ "and IConditionGrade eq '' and IRepairDate eq datetime'1901-01-01T00:00:00' and IEstimateType eq '" + estType + "' and ILocalBilling eq ''"
    		+ "and IWorkOrderNumbe eq '' and IUnitPartCode eq '" + UPC + "' and ITankNumber eq '' and ITankLastCargo eq '' and ITankCleaningPr eq ''"
    		+ "and ITankCertiDate eq datetime'1901-01-01T00:00:00' and ISalesGrade eq '" + SalesGrade + "' and IWorkCreatedDat eq datetime'" + WorkDt + "'"
    		+ "and ICurrencyCode eq '" + CurrCode + "' and IActualDate eq datetime'" + ActualDt + "' and IMovementInDate eq datetime'" + movInDt + "'"
    		+ "and IEstimateNumber eq '' and ILesseAuthAmt eq '" + LesseeAuthAmt + "' and IMultiPartCont eq '' and IContStructComp eq '' and IResubStatus eq ''"
    		+ "and IApprovalCond eq '' and IApprovalNumber eq '' and Param1 eq '" + UserName
				// MACALPHA19032018_12 Begin of adding by Seyed Ismail
				+ "' and INotes1 eq '" + Notes1
				+ "' and INotes2 eq '" + Notes2
				+ "' and INotes3 eq '" + Notes3
				+ "' and INotes4 eq '" + Notes4
				+ "' and INotes5 eq '" + Notes5
				// MACALPHA19032018_12 Begin of adding by Seyed Ismail
				+ "'";

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
			 busyDialog.close();
	    		sap.ui.commons.MessageBox.alert("Message(s) resubmitted successfully!",fnCallBackEDIRetransmissionResubmit);
		 },
		 function(err){
			 	errorfromServer(err);
		});

	},

	/* MAC21092017 : Written this function to check certain fields are allowed to have only numbers */
	checkOnlyNumeric : function(){

		/* The following will be NUMERIC ONLY.
				Rep Length - repLength
				Rep Width - repWidth
				Quantity - quantity
				Man Hrs - manHrs
				Mat Cost - matCost
		*/
		var valid = true;
		for(var i =0; i <arrAddRepairLineDTEDITL.length; i++){
			if(((IsNumeric(arrAddRepairLineDTEDITL[i].repLength) == false) ||
					(IsNumeric(arrAddRepairLineDTEDITL[i].repWidth) == false) ||
					(IsNumeric(arrAddRepairLineDTEDITL[i].quantity) == false) ||
					(IsNumeric(arrAddRepairLineDTEDITL[i].manHrs) == false) ||
					(IsNumeric(arrAddRepairLineDTEDITL[i].matCost) == false))

					&& valid == true){
				valid = false;
			}
		}

		return valid;

	}
});

function IsNumeric(input){
    var RE = /^-{0,1}\d*\.{0,1}\d+$/;
    return (RE.test(input));
}

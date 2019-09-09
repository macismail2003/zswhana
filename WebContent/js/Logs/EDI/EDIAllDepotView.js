/******** NP *******/

/*

*$*$------------------------------------------------------------------------*
*$*$ Modified By : Seyed Ismail MAC
*$*$ Modified On : 06.02.2015
*$*$ Reference   : RTS1059
*$*$ Transport   :
*$*$ Tag         : MAC06022015
*$*$ Purpose     : EDI Transmission Summary Redesign
*$*$---------------------------------------------------------------------

*$*$------------------------------------------------------------------------*
*$*$ Modified By : Seyed Ismail MAC
*$*$ Modified On : 31.07.2015
*$*$ Reference   : RTS1261
*$*$ Transport   : CGWK901020
*$*$ Tag         : MAC31072015
*$*$ Purpose     : When there is no msg after submission, go back to the main EDI Summary page
*$*$---------------------------------------------------------------------
*
*
**$*$------------------------------------------------------------------------*
*$*$ Modified By : Seyed Ismail MAC
*$*$ Modified On : 31.08.2015
*$*$ Reference   : RTS1294
*$*$ Transport   : CGWK901040
*$*$ Tag         : MAC31082015
*$*$ Purpose     : Extra Fields on Excel Download
*$*$---------------------------------------------------------------------
*
*/
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
jQuery.sap.require("sap.ui.model.json.JSONModel");
var depotGlobal;		// MAC06022015 +
var errTypeGlobal;		// MAC06022015 +
var arrFailMsgDetEDITL = [];
var jsonInventory = [];  // MAC06022015 +
sap.ui.model.json.JSONModel.extend("EDIAllDepotView", {

	createEDIAllDepot: function(){

		var oCurrEDITL = this;

		var oAllDepotBack = new sap.m.Link("idAllDepotBack", {text: " < Back",
        	  width:"13%",
        	  wrapping:true,
        	  visible: false,
        	  press: function(){
        		  var bus = sap.ui.getCore().getEventBus();
        			bus.publish("nav", "back");
       	  }});
		/* Begin of adding by Seyed Ismail on 25.02.2015 MAC06022015 */
		var btnRefresh = new sap.m.Button({
			  width : '120px',
	          text : "Refresh",
	          styled : false,
	          press:function(){
	        	var oEDITransDepot = new ediTransmissionLogView();
	        	oEDITransDepot.allDepotDetails();
	          }
		}).addStyleClass("submitBtn floatLeft");

		var btnExport = new sap.m.Button({
	          text : "Export to Excel",
	          styled : false,
	          //width: "150px",
	          //icon: sap.ui.core.IconPool.getIconURI("excel-attachment"),
	          press:function(){
				  var objUtil = new utility();
	        	  objUtil.makeHTMLTable(jsonInventory, "EDI Summary","export");
	          }
		}).addStyleClass("submitBtn");

		var lblSpaceLegend = new sap.ui.commons.Label( {text: " ",width : '5px'});

		var oFlexRefExc = new sap.m.FlexBox({
            items: [
                    btnRefresh, lblSpaceLegend, btnExport
            ],
            direction:"Row"
		});

		/* End of adding by Seyed Ismail on 25.02.2015 MAC06022015 */
		// Table
    	var oTableAllDepot = new sap.ui.table.Table("idTableAllDepot",{
            columnHeaderHeight: 65,
            selectionMode: sap.ui.table.SelectionMode.None,
            width:"100%",
            height:"100%"
    	 }).addStyleClass("fontStyle marginTop15 tblBorder");

    	// Table Columns
    	oTableAllDepot.addColumn(new sap.ui.table.Column({
			 width: "70px",
      		 label: new sap.ui.commons.Label({text: "Code"}).addStyleClass("wraptextcol"),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "Depot"),
    		 resizable:false,
             sortProperty: "Depot",
             filterProperty: "Depot",
    		 }));

    	oTableAllDepot.addColumn(new sap.ui.table.Column({
      		 label: new sap.ui.commons.Label({text: "Name"}).addStyleClass("wraptextcol"),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "Name"),
    		 resizable:false,
             sortProperty: "Name",
             filterProperty: "Name",
    		 }));

		oTableAllDepot.addColumn(new sap.ui.table.Column({
			 width: "75px",
      		 label: new sap.ui.commons.Label({text: "Total Errors"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.Link({
				press : function() {
					oCurrEDITL.getFailDetails(" ", this.getHelpId());
				}
			}).bindProperty("text", "TotalErrors").bindProperty("helpId","Depot").addStyleClass("wraptext"),
    		 resizable:false,
             sortProperty: "TotalErrors",
             filterProperty: "TotalErrors",
    		 }));


    	oTableAllDepot.addColumn(new sap.ui.table.Column({
			 width: "75px",
      		 label: new sap.ui.commons.Label({text: "Gate IN"}).addStyleClass("wraptextcol"),
    		 			 template: new sap.ui.commons.Link({
				press : function() {
					oCurrEDITL.getFailDetails("MOVE_IN", this.getHelpId());
				}
			}).bindProperty("text", "MoveIn").bindProperty("helpId","Depot").addStyleClass("wraptext"),
    		 resizable:false,
             sortProperty: "MoveIn",
             filterProperty: "MoveIn",
    		 }));

		oTableAllDepot.addColumn(new sap.ui.table.Column({
			 width: "75px",
      		 label: new sap.ui.commons.Label({text: "Gate OUT"}).addStyleClass("wraptextcol"),
    		 			 template: new sap.ui.commons.Link({
				press : function() {
					oCurrEDITL.getFailDetails("MOVE_OUT", this.getHelpId());
				}
			}).bindProperty("text", "MoveOut").bindProperty("helpId","Depot").addStyleClass("wraptext"),
    		 resizable:false,
             sortProperty: "MoveOut",
             filterProperty: "MoveOut",
    		 }));

    	oTableAllDepot.addColumn(new sap.ui.table.Column({
			 width: "95px",
      		 label: new sap.ui.commons.Label({text: "Estimate"}).addStyleClass("wraptextcol"),
    		 			 template: new sap.ui.commons.Link({
				press : function() {
					oCurrEDITL.getFailDetails("ESTIMATE", this.getHelpId());
				}
			}).bindProperty("text", "Estimate").bindProperty("helpId","Depot").addStyleClass("wraptext"),
    		 resizable:false,
             sortProperty: "Estimate",
             filterProperty: "Estimate",
    		 }));

		oTableAllDepot.addColumn(new sap.ui.table.Column({
			 width: "95px",
      		 label: new sap.ui.commons.Label({text: "Lessee Approval"}).addStyleClass("wraptextcol"),
    		 			 template: new sap.ui.commons.Link({
				press : function() {
					oCurrEDITL.getFailDetails("LESS_RESP", this.getHelpId());
				}
			}).bindProperty("text", "LessResp").bindProperty("helpId","Depot").addStyleClass("wraptext"),
    		 resizable:false,
             sortProperty: "LessResp",
             filterProperty: "LessResp",
    		 }));

		oTableAllDepot.addColumn(new sap.ui.table.Column({
			 width: "75px",
      		 label: new sap.ui.commons.Label({text: "Joint Survey"}).addStyleClass("wraptextcol"),
    		 			 template: new sap.ui.commons.Link({
				press : function() {
					oCurrEDITL.getFailDetails("JOINT_SUR", this.getHelpId());
				}
			}).bindProperty("text", "JointSur").bindProperty("helpId","Depot").addStyleClass("wraptext"),
    		 resizable:false,
             sortProperty: "JointSur",
             filterProperty: "JointSur",
    		 }));

		 /* MACALPHA19032018_12 */
		 oTableAllDepot.addColumn(new sap.ui.table.Column({
 			 width: "75px",
       		 label: new sap.ui.commons.Label({text: "Lessor Survey"}).addStyleClass("wraptextcol"),
     		 			 template: new sap.ui.commons.Link({
 				press : function() {
 					oCurrEDITL.getFailDetails("LESS_SUR", this.getHelpId());
 				}
 			}).bindProperty("text", "LessSur").bindProperty("helpId","Depot").addStyleClass("wraptext"),
     		 resizable:false,
          sortProperty: "LessSur",
          filterProperty: "LessSur",
 		 }));
		/* MACALPHA19032018_12 */
		oTableAllDepot.addColumn(new sap.ui.table.Column({
			 width: "95px",
      		 label: new sap.ui.commons.Label({text: "Repair Progress"}).addStyleClass("wraptextcol"),
    		 			 template: new sap.ui.commons.Link({
				press : function() {
					oCurrEDITL.getFailDetails("REPAIR_PRO", this.getHelpId());
				}
			}).bindProperty("text", "RepairPro").bindProperty("helpId","Depot").addStyleClass("wraptext"),
    		 resizable:false,
             sortProperty: "RepairPro",
             filterProperty: "RepairPro",
    		 }));

		 /* MACALPHA19032018_12 */
		 oTableAllDepot.addColumn(new sap.ui.table.Column({
		 	width: "75px",
		 			label: new sap.ui.commons.Label({text: "Reefer EDI Msg Pending"}).addStyleClass("wraptextcol"),
		 					template: new sap.ui.commons.Link({
		 	 press : function() {
		 		 oCurrEDITL.getFailDetails("REEFER_EDI", this.getHelpId());
		 	 }
		 }).bindProperty("text", "ReeferEdi").bindProperty("helpId","Depot").addStyleClass("wraptext"),
		 		resizable:false,
		 		 sortProperty: "ReeferEdi",
		 		 filterProperty: "ReeferEdi",
		 }));
		 /* MACALPHA19032018_12 */

			 var oAllDepotLayout = new sap.ui.layout.form.ResponsiveGridLayout("idAllDepotLayout");

		  // Online Form Starts
		     var oAllDepotForm = new sap.ui.layout.form.Form("idAllDepotForm",{
		             layout: oAllDepotLayout,
		             formContainers: [
		                     new sap.ui.layout.form.FormContainer("idAllDepotFormC1",{
		                             formElements: [
													new sap.ui.layout.form.FormElement("idAllDepotElem1",{
													    fields: [oAllDepotBack],
													    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
														}),
													new sap.ui.layout.form.FormElement("idAllDepotElem4",{
															fields: [oFlexRefExc]		// MAC06022015 +
														}),
													new sap.ui.layout.form.FormElement("idAllDepotElem2",{
														fields: [oTableAllDepot]
													}),
													new sap.ui.layout.form.FormElement("idAllDepotElem3",{
														fields: []
													})
													]
		                     })
		             ]
		     });

			return oAllDepotForm;

	},

	getFailDetails: function(errType, depot){
	busyDialog.open();

	/* Begin of adding by Seyed Ismail on 25.02.2015 MAC06022015 */
	if(depot != 'again')
		depotGlobal = depot;
	if(errType != 'again')
		errTypeGlobal = errType;

	if(depot == 'ALL'){
		depot = '';
	}
	else if(depot == 'again'){
		depot = depotGlobal;
		if(depot == 'ALL'){
			depot = '';
		}
	}

	if(errType == 'again'){
		errType = errTypeGlobal;
	}
	/* End of adding by Seyed Ismail on 25.02.2015 MAC06022015 */
		oModel = new sap.ui.model.odata.ODataModel(serviceUrl15, true);
		var urlToCallAll = serviceUrl15 + "/EDI_Fail_Hyperlink?$filter=IDepot eq '" + depot
								 + "' and IMsgType eq '" + errType + "' and ISerialNo eq '" + vSerNoToPassEDITL + "' and IPeriod eq '1990010199991231'";

		OData.request({
		      requestUri: urlToCallAll,
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
		    		/*sap.ui.commons.MessageBox.show("No Entries Found, Click OK to go back to the main page...",
                            sap.ui.commons.MessageBox.Icon.WARNING,
                            "Warning",
                            [sap.ui.commons.MessageBox.Action.OK],
                            sap.ui.commons.MessageBox.Action.OK);*/

		    		// Begin of adding by Seyed Ismail on 31.07.2015 MAC31072015+
	        	  		var oEDITransDepot = new ediTransmissionLogView();
	    	        	oEDITransDepot.allDepotDetails();
					var bus = sap.ui.getCore().getEventBus();
	        	  		bus.publish("nav", "to", {
	        		    id : "EDIAllDepot"
	        	  		});

	        	    // End of adding by Seyed Ismail on 31.07.2015 MAC31072015+
		    	}
		    	else{

					arrFailMsgDetEDITL = [];
					  var viewText = ""; // MACALPHA19032018_12
						var viewErrorVisible = true; // MACALPHA19032018_12
		    		for(var i=0; i<data.results.length; i++){

		    			var vSubmittedDate = data.results[i].Submitteddate.split("(");
					    var vSubmitDate = vSubmittedDate[1].split(")");
					    var vformattedSubmittedDate = new Date(Number(vSubmitDate[0]));
					    var SubmittedDate = dateFormat(new Date(Number(vSubmitDate[0])), 'dd-mm-yyyy',"UTC");
					    if(SubmittedDate.substring(6) == "9999")
					    	SubmittedDate = "";
					    else
					    	SubmittedDate = SubmittedDate;


					    var vMessageDate = data.results[i].MsgDate.split("(");
					    var vMsgDate = vMessageDate[1].split(")");
					    var vformattedMessageDate = new Date(Number(vMsgDate[0]));
					    var MessageDate = dateFormat(new Date(Number(vMsgDate[0])), 'dd-mm-yyyy',"UTC");
					    if(MessageDate.substring(6) == "9999")
					    	MessageDate = "";
					    else
					    	MessageDate = MessageDate;

								/* MACALPHA19032018_12 */
								if(data.results[i].Light == "R"){
									viewText = "View Details";
									viewErrorVisible = false;
								}else{
									viewText = "View Error";
									viewErrorVisible = true;
								}
								/* MACALPHA19032018_12 */

							  arrFailMsgDetEDITL.push({
				    				"msgUniqueID": data.results[i].MsgUidXi,
				    				"type": data.results[i].MsgType,
				    				"msgName": data.results[i].MsgName,
				    				"source": data.results[i].MsgSource,
				    				"serialNumber": data.results[i].MsgSernr,
				    				"submittedDate": SubmittedDate,
				    				"submittedDateActual": vformattedSubmittedDate,
				    				"messageDate": MessageDate,
				    				"MsgFloc": data.results[i].MsgFloc,				// MAC31082015 +
				    				"MsgSender": data.results[i].MsgSender,			// MAC31082015 +
				    				"messageDateActual": vformattedMessageDate,
				    				"viewError": viewText,	// MACALPHA19032018_12
										"viewErrorVisible": viewErrorVisible, // MACALPHA19032018_12
				    				"checked": false
				    			});
		    		}
					var bus = sap.ui.getCore().getEventBus();
	        	  		bus.publish("nav", "to", {
	        		    id : "FailMessageDetailView"
	        	  		});

	        	  		var oFailMsgDetObjEDITL = new failMessageDetailEDITLView();
	        	  		oFailMsgDetObjEDITL.updateFailMsgDetEDITL();

				}
			busyDialog.close();
			},
			function(err){
		    	 busyDialog.close();
		    	 errorfromServer(err);
		    	 alert("Error while Reading Result : "+ window.JSON.stringify(err.response));
		    });

	},


	fillEDIAllDepot: function(ediAllDepotData){
		jsonInventory = [];
		for(var i = 0; i<ediAllDepotData.length; i++){
			jsonInventory.push({
  				"Depot Code": ediAllDepotData[i].Depot,
  				"Depot Name": ediAllDepotData[i].Name,
  				"Total Errors": ediAllDepotData[i].TotalErrors,
  				"Gate In": ediAllDepotData[i].MoveIn,
  				"Gate Out": ediAllDepotData[i].MoveOut,
  				"Estimate": ediAllDepotData[i].Estimate,
  				"Lessee Approval": ediAllDepotData[i].LessResp,
  				"Joint Survey": ediAllDepotData[i].JointSur,
					"Lessor Survey": ediAllDepotData[i].LessSur,	// MACALPHA19032018_12
  				"Repair Progress": ediAllDepotData[i].RepairPro,
					"Reefer EDI Msg Pending": ediAllDepotData[i].ReeferEdi	// MACALPHA19032018_12
  			});
		}

		var oModelEDIAllDepotData = new sap.ui.model.json.JSONModel();
    	oModelEDIAllDepotData.setData({modelData: ediAllDepotData});
    	sap.ui.getCore().byId("idTableAllDepot").setModel(oModelEDIAllDepotData);
    	sap.ui.getCore().byId("idTableAllDepot").bindRows("/modelData");

    	sap.ui.getCore().byId("idTableAllDepot").setVisibleRowCount(ediAllDepotData.length);

	}

});

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
*$*$ Modified On : 24.04.2015
*$*$ Reference   : RTS1139
*$*$ Transport   : CGWK900946
*$*$ Tag         : MAC24042015
*$*$ Purpose     : UI5 : Old Portal Removal Project

					1	General	Timout increase to 30 minutes
					2	EDI Transmission Log	Remove Mandatory mark - Depot Code
					3	EDI Transmission Log	Success Message should be clickable
					4	EDI Transmission Log	Click BACK - Goes to EDI Summary for all Depot - Security Issue
					5	EDI Summary	Gate In - RA Bounce Back
					6	EDI Summary	Repair Progress - Date Format Issue Bounce Back
					7	CEDEX Transmission Log	New Screen - Similar to Old portal

*$*$---------------------------------------------------------------------
*
*/
jQuery.sap.require("sap.ui.model.json.JSONModel");

sap.ui.model.json.JSONModel.extend("CEDEXTransmissionLogView", {
	
	createCEDEXTransmissionLog: function(){
		
		var oCurrent = this;
    	
		var oCEDEXLabelUnitNo = new sap.ui.commons.Label({text: "Unit Number:",
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S3",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("marginTop15");
		
    	var oCEDEXUnitNo = new sap.ui.commons.TextField('idCEDEXUnitNo',{
    		placeholder:"Unit Number",
    		layoutData: new sap.ui.layout.GridData({span: "L2 M2 S12",linebreak: false, margin: true}),
    	}).addStyleClass("FormInputStyle marginTop10 DepotInput38px");
    	
    	oCEDEXUnitNo.setMaxLength(11);
	
		    	// Buttons
	   	 var oCEDEXSubmit = new sap.m.Button("idCEDEXSubmit",{
		          text : "Submit",
		          width:"80px",
		          styled:false,
		          layoutData: new sap.ui.layout.GridData({span: "L2 M5 S4",linebreak: true, margin: true}),
		          press:function(){
		        	var equnr = sap.ui.getCore().byId("idCEDEXUnitNo").getValue();
		        	if(equnr != "")
		        	oCurrent.showCEDEXLog(equnr);
		        	else{
		        		sap.ui.commons.MessageBox.show("Please enter Unit Number & Try again!",
	                            sap.ui.commons.MessageBox.Icon.WARNING,
	                            "Warning",
	                            [sap.ui.commons.MessageBox.Action.OK],
	                            sap.ui.commons.MessageBox.Action.OK);
		        	}
		          }}).addStyleClass("submitBtn marginTop10");
				  
	   	var oHorDivider = new sap.ui.commons.HorizontalDivider({width: "100%", type: "Area", height: "Medium"}).addStyleClass("marginTop10");
			  // Responsive Grid Layout
			    var oCEDEXLayout = new sap.ui.layout.form.ResponsiveGridLayout("idCEDEXLayout",{
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
			     var oCEDEXForm = new sap.ui.layout.form.Form("idCEDEXForm",{
			             layout: oCEDEXLayout,
			             formContainers: [
			                     
			                     new sap.ui.layout.form.FormContainer("idCEDEXFormC1",{
			                             //title: "Add Movement Out - Single",
		                             formElements: [
														new sap.ui.layout.form.FormElement({
														    fields: [oCEDEXLabelUnitNo, oCEDEXUnitNo]
														}),
														new sap.ui.layout.form.FormElement({
														    fields: [oCEDEXSubmit]
														})
			                                     ]
			                     }),
			             ]
			     });
			     
			  // Responsive Grid Layout
				    var oCEDEXResultLayout = new sap.ui.layout.form.ResponsiveGridLayout("idCEDEXResultLayout",{
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
				     var oCEDEXResultForm = new sap.ui.layout.form.Form("idCEDEXResultForm",{
				             layout: oCEDEXResultLayout,
				             formContainers: [
				                     
				                     new sap.ui.layout.form.FormContainer({
			                             formElements: [
															new sap.ui.layout.form.FormElement("idCEDEXShowResults",{
															    fields: [],
															    layoutData: new sap.ui.layout.GridData({span: "L9 M9 S4",linebreak: true, margin: true})
															}),
				                                     ]
				                     }),
				             ]
				     });
				     
				     var oFlexAllCEDEX = new sap.m.FlexBox({
	    		           items: [
									//oEDIAllDepotForm,
	    							oCEDEXForm,
	    							oHorDivider,
	    							oCEDEXResultForm
	    		           ],
	    		           direction : "Column",
	    					});
				 	
			     	return oFlexAllCEDEX;
	},
	
	showCEDEXLog : function(equnr){
		
		var oCurrent = this;
		
		busyDialog.open();
		
		if(sap.ui.getCore().byId("idTblLogResultsCEDEX")){
			sap.ui.getCore().byId("idTblLogResultsCEDEX").destroy();
		}
		
		
		oModel = new sap.ui.model.odata.ODataModel(serviceUrl15, true);
		var urlToCallEDITL = serviceUrl15 + "/Edi_Cedexs?$filter=IEqunr eq '" + equnr + "'";
		//alert("urlToCallEDITL : "+urlToCallEDITL);
		OData.request({ 
		      requestUri: urlToCallEDITL,
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
		    		sap.ui.commons.MessageBox.show("No Result Found. Please try again.",
                            sap.ui.commons.MessageBox.Icon.WARNING,
                            "Warning",
                            [sap.ui.commons.MessageBox.Action.OK],
                            sap.ui.commons.MessageBox.Action.OK);
		    	}
		    	else{
		    		var arrCEDEXData = [];
		    		for(var i=0; i<data.results.length; i++){
		    		var vMessageDate = data.results[i].MessageDate.split("(");
				    var vMsgDate = vMessageDate[1].split(")");
				    var vformattedMessageDate = new Date(Number(vMsgDate[0]));
				    var MessageDate = dateFormat(new Date(Number(vMsgDate[0])), 'dd-mm-yyyy',"UTC");
				    
				    var vMessageTime = data.results[i].MessageTime.replace("PT", "").replace("H", ":").replace("M", ":").replace("S", "");
				    
						  arrCEDEXData.push({
			    				"MessageDate": MessageDate,
			    				"MessageTime": vMessageTime,
			    				"DepotCode": data.results[i].DepotCode,
			    				"SenderId": data.results[i].SenderId,
			    				"SenderIntRef": data.results[i].SenderIntRef,
			    				"MsgUidXi": data.results[i].MsgUidXi,
			    				"MsgName": data.results[i].MsgName,
			    				"ProcessState": data.results[i].ProcessState,
			    				"MsgSource": data.results[i].MsgSource,
			    			});			    	
		    		}
		    		oCurrent.createLogResultsCEDEX();
		    		
		    		oCurrent.updateLogTableCEDEX(arrCEDEXData);
		    		
		    		busyDialog.close();
		    }
		    },
		    function(err){
		    	 busyDialog.close();
		    	 errorfromServer(err);
		    	//alert("Error while Reading Result : "+ window.JSON.stringify(err.response));
		    });
	},
	
	createLogResultsCEDEX: function(){

		if(sap.ui.getCore().byId("idTblLogResultsCEDEX")){
			sap.ui.getCore().byId("idTblLogResultsCEDEX").destroy();
		}
		
		// Table
    	var oTblLogResultsCEDEX = new sap.ui.table.Table("idTblLogResultsCEDEX",{
            columnHeaderHeight: 30,
            selectionMode: sap.ui.table.SelectionMode.None,
            width:"95%",
            height:"100%"
    	 }).addStyleClass("fontStyle marginTop15 tblBorder");
    	
    	// Table Columns
    	oTblLogResultsCEDEX.addColumn(new sap.ui.table.Column({
      		 label: new sap.ui.commons.Label({text: "Msg Date"}),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "MessageDate"),
    		 resizable:false,
    		 width: "10%",
             sortProperty: "MessageDate",
             filterProperty: "MessageDate",
    		 }));
    	
    	oTblLogResultsCEDEX.addColumn(new sap.ui.table.Column({
     		 label: new sap.ui.commons.Label({text: "Msg Time"}),
   		 template: new sap.ui.commons.TextView().bindProperty("text", "MessageTime"),
   		 resizable:false,
   		 width: "10%",
            sortProperty: "MessageTime",
            filterProperty: "MessageTime",
   		 }));
    	
    	oTblLogResultsCEDEX.addColumn(new sap.ui.table.Column({
     		 label: new sap.ui.commons.Label({text: "Depot"}),
   		 template: new sap.ui.commons.TextView().bindProperty("text", "DepotCode"),
   		 resizable:false,
   		width: "5%",
            sortProperty: "DepotCode",
            filterProperty: "DepotCode",
   		 }));
    	
    	oTblLogResultsCEDEX.addColumn(new sap.ui.table.Column({
     		 label: new sap.ui.commons.Label({text: "Sender ID"}),
   		 template: new sap.ui.commons.TextView().bindProperty("text", "SenderId"),
   		 resizable:false,
   		width: "12.5%",
            sortProperty: "SenderId",
            filterProperty: "SenderId",
   		 }));
    	
    	oTblLogResultsCEDEX.addColumn(new sap.ui.table.Column({
     		 label: new sap.ui.commons.Label({text: "Reference"}),
   		 template: new sap.ui.commons.TextView().bindProperty("text", "SenderIntRef"),
   		 resizable:false,
   		width: "10%",
            sortProperty: "SenderIntRef",
            filterProperty: "SenderIntRef",
   		 }));
    	
    	oTblLogResultsCEDEX.addColumn(new sap.ui.table.Column({
    		 label: new sap.ui.commons.Label({text: "Message ID"}),
  		 template: new sap.ui.commons.TextView().bindProperty("text", "MsgUidXi"),
  		 resizable:false,
  		width: "25%",
           sortProperty: "MsgUidXi",
           filterProperty: "MsgUidXi",
  		 }));
    	
    	oTblLogResultsCEDEX.addColumn(new sap.ui.table.Column({
    	label: new sap.ui.commons.Label({text: "Message Type"}),
  		 template: new sap.ui.commons.TextView().bindProperty("text", "MsgName"),
  		 resizable:false,
  		width: "15%",
           sortProperty: "MsgName",
           filterProperty: "MsgName",
  		 }));
    	
    	oTblLogResultsCEDEX.addColumn(new sap.ui.table.Column({
    	label: new sap.ui.commons.Label({text: "Status"}),
  		 template: new sap.ui.commons.TextView().bindProperty("text", "ProcessState"),
  		 resizable:false,
  		width: "7.5%",
           sortProperty: "ProcessState",
           filterProperty: "ProcessState",
  		 }));
    	
    	oTblLogResultsCEDEX.addColumn(new sap.ui.table.Column({
        	label: new sap.ui.commons.Label({text: "Source"}),
      		 template: new sap.ui.commons.TextView().bindProperty("text", "MsgSource"),
      		 resizable:false,
      		width: "5%",
               sortProperty: "MsgSource",
               filterProperty: "MsgSource",
      		 }));
    	
    	
	},
	
	updateLogTableCEDEX: function(dataCEDEX){
		oModelLogResultsCEDEX = new sap.ui.model.json.JSONModel();
    	oModelLogResultsCEDEX.setData({modelData: dataCEDEX});
    	sap.ui.getCore().byId("idTblLogResultsCEDEX").setModel(oModelLogResultsCEDEX);
    	sap.ui.getCore().byId("idTblLogResultsCEDEX").bindRows("/modelData");
    	
    	sap.ui.getCore().byId("idTblLogResultsCEDEX").setVisibleRowCount(dataCEDEX.length);
    	
    	sap.ui.getCore().byId("idCEDEXShowResults").insertField(sap.ui.getCore().byId("idTblLogResultsCEDEX"));
	}
	
});
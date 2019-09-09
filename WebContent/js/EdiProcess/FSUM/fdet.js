var oFDETJsonEDIDetails = [];

oFDETJsonEDIDetails.push({
	isChecked : false,
	sno : "1",
	estimateno : "Estimate 1",
	estimatetype : "Original",
	depotcode : "1547",
	depotname : "Eng Kong Containers",
	materialcode : "20' Box Standard",
	serialno : "GESU4346336",
	usercost : parseFloat("300.00"),
	costcurrency : "USD",
	offhirelocation : "China, Qingdao",
	datesubmitted : "11/01/2017",
	status : "Overdue - Awaiting Approval",
	lastaction : "Reminder sent on 12 Feb 2017",
	approve : "Approve",
	downloadestimate : "Download Estimate",
	image: "images/photo.png"
});

oFDETJsonEDIDetails.push({
	isChecked : false,
	sno : "2",
	estimateno : "Estimate 2",
	estimatetype : "Joint Survey",
	depotcode : "1537",
	depotname : "Express Repair Services PVT. LTD.",
	materialcode : "20' Box Standard",
	serialno : "GESU8876578",
	usercost : parseFloat("100.05"),
	costcurrency : "USD",
	offhirelocation : "US, Florida",
	datesubmitted : "21/01/2017",
	status : "Awaiting Approval",
	lastaction : "Estimate sent on 27 Jan 2017",
	approve : "Approve",
	downloadestimate : "Download Estimate",
	image: ""
});

oFDETJsonEDIDetails.push({
	isChecked : false,
	sno : "3",
	estimateno : "Estimate 3",
	estimatetype : "Original",
	depotcode : "1537",
	depotname : "Express Repair Services PVT. LTD.",
	materialcode : "20' Box Standard",
	serialno : "GESU3335521",
	usercost : parseFloat("788.71"),
	costcurrency : "USD",
	offhirelocation : "Hamburg, Germany",
	datesubmitted : "03/09/2003",
	status : "Awaiting Approval",
	lastaction : "Estimate sent on 01 Aug 2013",
	approve : "Approve",
	downloadestimate : "Download Estimate",
	image: ""
});
sap.ui.model.json.JSONModel.extend("fdet", {

	/* FDET : Create EDI Detail Page */

	createFDETPage : function(){



    var backEDI = new sap.m.Link({text: " < Back",
         width:"7%",
         wrapping:true,
         press: function(){
           var bus = sap.ui.getCore().getEventBus();
           bus.publish("nav", "back");
           $('#idHdrContnt').html('EDI Process');
         }});

	  var oFDETLabel = new sap.m.Label("idFDETLabel", {text : "EDI Detail"}).addStyleClass("fontTitle marginTop20");

    /* FDET - Create Table Estimates Approved */


		if(sap.ui.getCore().byId("idFDETTableEDIDetails") != undefined){
			sap.ui.getCore().byId("idFDETTableEDIDetails").destroy();
		}

		var oFDETTableEDIDetails = new sap.ui.table.Table("idFDETTableEDIDetails",{
    		visibleRowCount: 10,
            firstVisibleRow: 3,
            columnHeaderHeight: 40,
            enableColumnReordering : false,
            width: '98%',
            selectionMode: sap.ui.table.SelectionMode.None
    	 }).addStyleClass("tblBorder");

 		oFDETTableEDIDetails.addColumn(new sap.ui.table.Column({
   		 label: new sap.ui.commons.Label({text: "Serial No."}).addStyleClass("wraptextcol"),
   		template: new sap.ui.commons.Link({
				press : function(oEvent){
					debugger;
					var oFSERDET = new fserdet();
					oFSERDET.setValueHeaderDET(oEvent, "FDET");
				}
		 }).bindProperty("text", "SerialNumber").addStyleClass("wraptext"),
           resizable:false,
           width:"100px",
           sortProperty: "SerialNumber",
           filterProperty : "SerialNumber",
           flexible: true,
           //autoResizable: true,
           //width : 'auto'
		 }));

		 oFDETTableEDIDetails.addColumn(new sap.ui.table.Column({
 	   		 label: new sap.ui.commons.Label({text: "Depot No."}).addStyleClass("wraptextcol"),
 			 template: new sap.ui.commons.TextView({

 			 }).bindProperty("text", "DepotNumber").addStyleClass("wraptext"),
 	           resizable:false,
 	           width:"70px",
 	           sortProperty: "DepotNumber",
 	           filterProperty : "DepotNumber",
 	           flexible: true,
 	           //autoResizable: true,
 	           //width : 'auto'
 			 }));

			 oFDETTableEDIDetails.addColumn(new sap.ui.table.Column({
	 	   		 label: new sap.ui.commons.Label({text: "Depot ID"}).addStyleClass("wraptextcol"),
	 			 template: new sap.ui.commons.TextView({

	 			 }).bindProperty("text", "DepotId").addStyleClass("wraptext"),
	 	           resizable:false,
	 	           width:"100px",
	 	           sortProperty: "DepotId",
	 	           filterProperty : "DepotId",
	 	           flexible: true,
	 	           //autoResizable: true,
	 	           //width : 'auto'
	 			 }));

				 oFDETTableEDIDetails.addColumn(new sap.ui.table.Column({
		 	   		 label: new sap.ui.commons.Label({text: "Status"}).addStyleClass("wraptextcol"),
		 			 template: new sap.ui.commons.TextView({

		 			 }).bindProperty("text", "Status", function(cellValue){
						if(cellValue == "Failed"){
							this.addStyleClass("salered");
						}else{
							this.removeStyleClass("salered");
						}
						return cellValue;
					}).addStyleClass("wraptext"),
		 	           resizable:false,
		 	           width:"80px",
		 	           sortProperty: "Status",
		 	           filterProperty : "Status",
		 	           flexible: true,
		 	           //autoResizable: true,
		 	           //width : 'auto'
		 			 }));

					 oFDETTableEDIDetails.addColumn(new sap.ui.table.Column({
							 label: new sap.ui.commons.Label({text: "Description"}).addStyleClass("wraptextcol"),
						 template: new sap.ui.commons.TextView({

						 }).bindProperty("text", "Descr").addStyleClass("wraptext"),
									 resizable:false,
									 width:"120px",
									 sortProperty: "Descr",
									 filterProperty : "Descr",
									 flexible: true,
									 //autoResizable: true,
									 //width : 'auto'
						 }));

			 oFDETTableEDIDetails.addColumn(new sap.ui.table.Column({
	 	   		 label: new sap.ui.commons.Label({text: "Creation Date"}).addStyleClass("wraptextcol"),
	 			 template: new sap.ui.commons.TextView({

	 			 }).bindProperty("text", "CreationDate").addStyleClass("wraptext"),
	 	           resizable:false,
	 	           width:"90px",
	 	           sortProperty: "CreationDate",
	 	           filterProperty : "CreationDate",
	 	           flexible: true,
	 	           //autoResizable: true,
	 	           //width : 'auto'
	 			 }));

				 oFDETTableEDIDetails.addColumn(new sap.ui.table.Column({
		 	   		 label: new sap.ui.commons.Label({text: "Creation Time"}).addStyleClass("wraptextcol"),
		 			 template: new sap.ui.commons.TextView({

		 			 }).bindProperty("text", "CreationTime").addStyleClass("wraptext"),
		 	           resizable:false,
		 	           width:"90px",
		 	           sortProperty: "CreationTime",
		 	           filterProperty : "CreationTime",
		 	           flexible: true,
		 	           //autoResizable: true,
		 	           //width : 'auto'
		 			 }));

   	oFDETTableEDIDetails.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Message ID"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({

			 }).bindProperty("text", "MessageId").addStyleClass("wraptext"),
	           resizable:false,
	           width:"120px",
	           sortProperty: "MessageId",
	           filterProperty : "MessageId",
	           flexible: true,
	           //autoResizable: true,
	           //width : 'auto'
			 }));

			 oFDETTableEDIDetails.addColumn(new sap.ui.table.Column({
	 	   		 label: new sap.ui.commons.Label({text: "Message Type"}).addStyleClass("wraptextcol"),
	 			 template: new sap.ui.commons.TextView({

	 			 }).bindProperty("text", "MessageType").addStyleClass("wraptext"),
	 	           resizable:false,
	 	           width:"100px",
	 	           sortProperty: "MessageType",
	 	           filterProperty : "MessageType",
	 	           flexible: true,
	 	           //autoResizable: true,
	 	           //width : 'auto'
	 			 }));

		 oFDETTableEDIDetails.addColumn(new sap.ui.table.Column({
 	   		 label: new sap.ui.commons.Label({text: "Message Name"}).addStyleClass("wraptextcol"),
 			 template: new sap.ui.commons.TextView({

 			 }).bindProperty("text", "MessageName").addStyleClass("wraptext"),
 	           resizable:false,
 	           width:"120px",
 	           sortProperty: "MessageName",
 	           filterProperty : "MessageName",
 	           flexible: true,
 	           //autoResizable: true,
 	           //width : 'auto'
 			 }));

		 oFDETTableEDIDetails.addColumn(new sap.ui.table.Column({
				 label: new sap.ui.commons.Label({text: "Message Source"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({

			 }).bindProperty("text", "MessageSource").addStyleClass("wraptext"),
						 resizable:false,
						 width:"90px",
						 sortProperty: "MessageSource",
						 filterProperty : "MessageSource",
						 flexible: true,
						 //autoResizable: true,
						 //width : 'auto'
			 }));

			 oFDETTableEDIDetails.addColumn(new sap.ui.table.Column({
			 		label: new sap.ui.commons.Label({text: "User ID"}).addStyleClass("wraptextcol"),
			 	template: new sap.ui.commons.TextView({

			 	}).bindProperty("text", "Userid").addStyleClass("wraptext"),
			 				resizable:false,
			 				width:"90px",
			 				sortProperty: "Userid",
			 				filterProperty : "Userid",
			 				flexible: true,
			 				//autoResizable: true,
			 				//width : 'auto'
			 	}));

   	oFDETTableEDIDetails.addColumn(new sap.ui.table.Column({
			 visible : false,
	   		 label: new sap.ui.commons.Label({text: "File Name"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({

			 }).bindProperty("text", "FileName"),
	           resizable:false,
	           width:"150px",
	           sortProperty: "FileName",
	           filterProperty : "FileName",
	           flexible: true,
	           //autoResizable: true,
	           //width : 'auto'
			 }));

			 /* FDET - Flexbox - Title and Excel */
			var objUtil = new utility();
   		var oFDETContentTitleExcel = new sap.m.FlexBox({
   		         items: [
				   		        oFDETLabel,
											new sap.ui.commons.Label(),
											new sap.ui.commons.Button({
															text : "",
															styled:false,
															type:sap.m.ButtonType.Unstyled,
															icon: sap.ui.core.IconPool.getIconURI("excel-attachment"),
															press:function(){
																  objUtil.makeHTMLTable(oFDETJsonEDIDetails, sap.ui.getCore().byId("idFDETLabel").getText(),"export");
															}
											}).addStyleClass("dashBtn")
   		       ],
						 justifyContent : sap.m.FlexJustifyContent.SpaceBetween,
   		       direction : "Row",
   		       visible: true,
   		}).addStyleClass("marginLeft20");

       /* FDET - Flexbox - Final */

   		var oFDETContentFinal = new sap.m.FlexBox({
   		         items: [
								 			new sap.ui.commons.Label(),
				   		        backEDI,
											new sap.ui.commons.Label(),
				   						oFDETContentTitleExcel,
				              new sap.ui.commons.Label(),
				   						oFDETTableEDIDetails
   		       ],
   		       direction : "Column",
   		       visible: true,
   		}).addStyleClass("marginLeft20");

       return oFDETContentFinal;

  },

  /* FDET : Bind EDI Detail page */
  bindFDETTable : function(process, count, month){

		var depotid = sap.ui.getCore().byId("idFSUMComboDepot").getSelectedKey();
		oModel = new sap.ui.model.odata.ODataModel(serviceEDIDOC, true);
		var oMODELFSUMDET = serviceEDIDOC + "FSUMDETSet?$filter=Userid eq '" + sessionStorage.uName.toUpperCase() 	// "CPIC_CXI001"
											+ "' and Depot eq '" + depotid
											+ "' and Process eq '" + process
											+ "' and MonthSum eq '" + month
											+ "'";
		busyDialog.open();
		console.log(oMODELFSUMDET);
		OData.request({
					requestUri: oMODELFSUMDET,
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
				if(data.results.length == 0){
					console.log("Above request : Success but returned nothing");
					sap.ui.commons.MessageBox.alert("No data found!");
				}else{
					console.log("Above request : Success");

					oFDETJsonEDIDetails = [];

					for(var i=0;i<data.results.length;i++){
							oFDETJsonEDIDetails.push({
								MessageId : data.results[i].MessageId,
								SerialNumber : data.results[i].SerialNumber,
								MessageType : data.results[i].MessageType,
								MessageName : data.results[i].MessageName,
								MessageSource : data.results[i].MessageSource,
								FileName : data.results[i].FileName,
								FormatData : data.results[i].FormatData,
								Status : data.results[i].Status,
								Functionallocati : data.results[i].Functionallocati,
								DepotNumber : data.results[i].DepotNumber,
								Descr : data.results[i].Descr,
								DepotId : data.results[i].DepotId,
								ReceiverId : data.results[i].ReceiverId,
								CreationDate : data.results[i].CreationDate,
								CreationTime : data.results[i].CreationTime,
								MessageRef : data.results[i].MessageRef,
								Cond : data.results[i].Cond,
								ActMessageName : data.results[i].ActMessageName,
								Type : data.results[i].Type,
								Userid : data.results[i].Userid
							});
					}

			    var labbel = "";//depotid + " - " + process + " - " + count + " - " + month;
					if(depotid != ""){
						labbel = labbel + "Depot : " + depotid;
					}else{
						labbel = labbel + "Depot : " + "ALL";
					}

					if(process != ""){
						labbel = labbel + " | Process : " + process;
					}

					if(month != ""){
						switch (month) {
							case "0":
								labbel = labbel + " | Month : Current Month";
								break;
							case "1":
								labbel = labbel + " | Month : Last Month";
								break;
							case "2":
								labbel = labbel + " | Month : Second Last Month";
								break;
						}

					}


					var bus = sap.ui.getCore().getEventBus();
					bus.publish("nav", "to", {
							id : "FDET"
					});

					sap.ui.getCore().byId("idFDETLabel").setText(labbel);

					var oFDETModelEDIDetails = new sap.ui.model.json.JSONModel();
					oFDETModelEDIDetails.setData({modelData: oFDETJsonEDIDetails});

					var oFDETTableEDIDetails = sap.ui.getCore().byId("idFDETTableEDIDetails");
					oFDETTableEDIDetails.setModel(oFDETModelEDIDetails);
					oFDETTableEDIDetails.setVisibleRowCount(oFDETJsonEDIDetails.length);
					oFDETTableEDIDetails.bindRows("/modelData");

				}
			},function(err){
				busyDialog.close();
				console.log("Above request : Failed");
				sap.ui.commons.MessageBox.alert("No data found!");
			});

  }
});

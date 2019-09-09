var oFLOGJSONResult = [];
var oJSONFHEADERDET = [];

var oJSONFHEADERESTDET = [];
var oJSONFHEADERLSADET = [];
var oJSONFITEMESTDET = [];
var oJSONFITEMLSADET = [];
var jsonInventoryFLOG = [];

sap.ui.model.json.JSONModel.extend("flog", {

	/* FSUM : Create EDI Summary Page */

	createFLOGPage : function(){

		var oCurrent = this;

		var backEDI = new sap.m.Link({text: " < Back",
        	  width:"7%",
        	  wrapping:true,
        	  press: function(){
        		  var bus = sap.ui.getCore().getEventBus();
        		  bus.publish("nav", "back");
        		  $('#idHdrContnt').html('EDI Process');
       	  }});

		/* Depot Number */

				var oFLOGComboDepot = new sap.ui.commons.ComboBox("idFLOGComboDepot",{
					visible: true,
						width:"300px",
						displaySecondaryValues:true,
						placeholder: "Depot",
						change: function(evnt){
							oCurrent.hideTableResult();
						},
					}).addStyleClass("FormInputStyle marginTop7");

				var oFLOGModelDepot = new sap.ui.model.json.JSONModel();
				oFLOGModelDepot.setSizeLimit(99999);
				oFLOGModelDepot.setData({data:depotEdiData});

				oFLOGComboDepot.setModel(oFLOGModelDepot);
				oFLOGComboDepot.setSelectedKey(depotEdiData[0].key);
				oFLOGComboDepot.bindItems("/data", new sap.ui.core.ListItem({text: "{text}", key:"{key}"}));

				//oFLOGComboDepot.setEnabled(depotEnabled);

		//        if(depotEnabled){
		//        	oFLOGComboDepot.setSelectedKey(depotEdiData[0].key);
		//        }else{
		//        	oFLOGComboDepot.setSelectedKey(depotEdiData[1].key);
		//        }


				var oFLOGLabelDepot = new sap.ui.commons.Label("idFLOGLabelDepot",{
				text : "Depot",
				width : "130px",
				required : true,
				}).addStyleClass("marginTop10");

		var oFLOGFlexDepot = new sap.m.FlexBox("idFLOGFlexDepot",{
						items: [oFLOGLabelDepot,
										oFLOGComboDepot
										],
						direction: "Row"
		}).addStyleClass("marginMainLeft1");

			/*******************************/

			/* Serial Number */

			var oFLOGInputSerial = new sap.ui.commons.TextField("idFLOGInputSerial",{
					value : "",
					width : "130px",
					maxLength: 11,
					liveChange: function(evnt){
						oCurrent.hideTableResult();
					},
					//type: sap.ui.commons.TextFieldType.Number
			}).addStyleClass("FormInputStyle marginTop7");

			var oFLOGLabelSerial = new sap.ui.commons.Label("idFLOGLabelSerial",{
			text : "Serial No.",
			width : "130px",
			required : false,
			}).addStyleClass("marginTop10");


			var oFLOGFlexSerial = new sap.m.FlexBox("idFLOGFlexSerial",{
									 items: [oFLOGLabelSerial,
													 oFLOGInputSerial
													 ],
									 width: "300px",
									 direction: "Row"
			});

			/* Status */

			var oFLOGComboStatus = new sap.ui.commons.ComboBox("idFLOGComboStatus", {
				//layoutData: new sap.ui.layout.GridData({span: "L4 M9 S12"}),
				//width:"100%",
				//enabled: seacoUser,
				 //placeholder:"Select Customer",
				 change: function(evnt){
					if(this.getValue() != '')
					{
						//this.setValueState(sap.ui.core.ValueState.None);
						//this.setPlaceholder("Select Customer");
					}
							}
			}).addStyleClass("FormInputStyle marginTop7");

			oFLOGComboStatus.addItem(new sap.ui.core.ListItem({
											text:"",
											key: ""
											}));

											oFLOGComboStatus.addItem(new sap.ui.core.ListItem({
																			text:"A",
																			key: "A"
																			}));

			oFLOGComboStatus.addItem(new sap.ui.core.ListItem({
											text:"D",
											key: "D"
											}));

			oFLOGComboStatus.addItem(new sap.ui.core.ListItem({
				text:"E",
				key: "E"
				}));

				oFLOGComboStatus.addItem(new sap.ui.core.ListItem({
					text:"G",
					key: "G"
					}));

					oFLOGComboStatus.addItem(new sap.ui.core.ListItem({
						text:"L",
						key: "L"
						}));


					var oFLOGLabelStatus = new sap.ui.commons.Label("idFLOGLabelStatus",{
					text : "Status",
					width : "130px"
					}).addStyleClass("marginTop10");


			var oFLOGFlexStatus = new sap.m.FlexBox("idFLOGFlexStatus",{
									 items: [oFLOGLabelStatus,
													 oFLOGComboStatus
													 ],
									 width: "300px",
									 direction: "Row"
			});

			/* Activity */

			var oFLOGComboActivity = new sap.ui.commons.ComboBox("idFLOGComboActivity", {
				//layoutData: new sap.ui.layout.GridData({span: "L4 M9 S12"}),
				//width:"100%",
				//enabled: seacoUser,
				 //placeholder:"Select Customer",
				 change: function(evnt){
					if(this.getValue() != '')
					{
						//this.setValueState(sap.ui.core.ValueState.None);
						//this.setPlaceholder("Select Customer");
					}
							}
			}).addStyleClass("FormInputStyle marginTop7");

			oFLOGComboActivity.addItem(new sap.ui.core.ListItem({
											text:"",
											key: ""
											}));

			oFLOGComboActivity.addItem(new sap.ui.core.ListItem({
											text:"Gate IN",
											key: "GIN"
											}));

			oFLOGComboActivity.addItem(new sap.ui.core.ListItem({
				text:"Gate OUT",
				key: "GOU"
				}));

				oFLOGComboActivity.addItem(new sap.ui.core.ListItem({
												text:"Estimate",
												key: "EST"
												}));

				oFLOGComboActivity.addItem(new sap.ui.core.ListItem({
					text:"Lessee Approval",
					key: "LSA"
					}));

					oFLOGComboActivity.addItem(new sap.ui.core.ListItem({
													text:"Repair Completion",
													key: "RCN"
													}));


					var oFLOGLabelActivity = new sap.ui.commons.Label("idFLOGLabelActivity",{
					text : "Message Name",
					width : "130px"
					}).addStyleClass("marginTop10");


			var oFLOGFlexActivity = new sap.m.FlexBox("idFLOGFlexActivity",{
									 items: [oFLOGLabelActivity,
													 oFLOGComboActivity
													 ],
									 width: "300px",
									 direction: "Row"
			});

			/* Message ID */

			var oFLOGInputMessageID = new sap.ui.commons.TextField("idFLOGInputMessageID",{
					value : "",
					width : "130px",
					//maxLength: 11,
					liveChange: function(evnt){
						oCurrent.hideTableResult();
					},
					//type: sap.ui.commons.TextFieldType.Number
			}).addStyleClass("FormInputStyle marginTop7");

			var oFLOGLabelMessageID = new sap.ui.commons.Label("idFLOGLabelMessageID",{
			text : "Message ID",
			width : "130px"
			}).addStyleClass("marginTop10");


			var oFLOGFlexMessageID = new sap.m.FlexBox("idFLOGFlexMessageID",{
									 items: [oFLOGLabelMessageID,
													 oFLOGInputMessageID
													 ],
									 width: "300px",
									 direction: "Row"
			});

			/* Date */

			var oFLOGInputFromDate = new sap.ui.commons.DatePicker("idFLOGInputFromDate",{
					value: {
						path: yyyymmddtoday(),
						type: new sap.ui.model.type.Date({pattern: "dd/MM/yyyy"})
					},
					width : "100px"
				}).addStyleClass("FormInputStyle marginTop7");

			var oFLOGInputToDate = new sap.ui.commons.DatePicker("idFLOGInputToDate",{
					value: {
						path: yyyymmddtoday(),
						type: new sap.ui.model.type.Date({pattern: "dd/MM/yyyy"})
					},
					width : "100px"
				}).addStyleClass("FormInputStyle marginTop7");

			var oFLOGLabelDate = new sap.ui.commons.Label("idFLOGLabelDate",{
			text : "Created Date",
			width : "130px"
			}).addStyleClass("marginTop10");

			var oFLOGLabelToDate = new sap.ui.commons.Label("idFLOGLabelToDate",{
			text : "To",
			width : "50px"
		}).addStyleClass("marginTop10 marginLeft20");


			var oFLOGFlexDate = new sap.m.FlexBox("idFLOGFlexDate",{
							 items: [oFLOGLabelDate,
											 oFLOGInputFromDate,
											 oFLOGLabelToDate,
											 oFLOGInputToDate
											 ],
							 width: "300px",
							 direction: "Row"
			});

			/* Buttons */
			var oFLOGButtonReset = new sap.m.Button("idFLOGButtonReset",{
					text : "Reset",
					width:"100px",
					styled:false,
					visible: true,
					//layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: true}),
					press:function(){
						oCurrent.resetFLOG();
			}}).addStyleClass("normalBtn");

				var oFLOGButtonSearch = new sap.m.Button("idFLOGButtonSearch",{
					text : "Search",
					width:"100px",
					styled:false,
					visible: true,
					//layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: true}),
					press:function(){

						var depot = sap.ui.getCore().byId("idFLOGComboDepot").getSelectedKey();
						var serialno = sap.ui.getCore().byId("idFLOGInputSerial").getValue();

						if(!depot){
							sap.ui.commons.MessageBox.alert("Please select a depot");
							return;
						}

						var fromDate = sap.ui.getCore().byId("idFLOGInputFromDate").getYyyymmdd();
						var toDate = sap.ui.getCore().byId("idFLOGInputToDate").getYyyymmdd();
						fromDate = parseInt(fromDate);
						toDate = parseInt(toDate);

						if(!fromDate && !serialno){
							sap.ui.commons.MessageBox.alert("Please enter either Date or Serial No.");
							return;
						}

						if(!fromDate && toDate){
							sap.ui.commons.MessageBox.alert("Please enter From Date before entering To Date");
							return;
						}else if(fromDate && toDate){
								if(fromDate > toDate){
									sap.ui.commons.MessageBox.alert("From Date cannot be before To Date");
									return;
								}else{

									fromDate = String(fromDate);
									toDate = String(toDate);

									var fromDateHyphen = fromDate.substr(0,4) + '-' + fromDate.substr(4,2) + '-' + fromDate.substr(6,2);
									var toDateHyphen = toDate.substr(0,4) + '-' + toDate.substr(4,2) + '-' + toDate.substr(6,2);

									var daysDifference = daysDiff(fromDateHyphen, toDateHyphen);
									if(daysDifference > 180){
											sap.ui.commons.MessageBox.alert("Maximum allowed date range is 6 months");
											return;
									}
								}
						}


						oCurrent.setFLOGValues();
			}}).addStyleClass("normalBtn");

			var oFLOGDivider = new sap.ui.commons.HorizontalDivider({width: "95%", type: "Area", height: "Medium"});

			var oFLOGFlexVRButton = new sap.m.FlexBox("idFLOGFlexVRButton",{
							items: [oFLOGButtonReset,
											oFLOGButtonSearch
											],
							direction: "Row"
				}).addStyleClass("marginMainLeft");

		/* Result Table */

		if(sap.ui.getCore().byId("idFLOGTableEDIDetails") != undefined){
			sap.ui.getCore().byId("idFLOGTableEDIDetails").destroy();
		}

		var oFLOGTableResult  = new sap.ui.table.Table("idFLOGTableResult",{
    			 	visibleRowCount: 10,
            firstVisibleRow: 3,
            columnHeaderHeight: 40,
            enableColumnReordering : false,
            width: '98%',
            selectionMode: sap.ui.table.SelectionMode.None,
						visible : false,
						toolbar: new sap.ui.commons.Toolbar({
							rightItems: [
								new sap.ui.commons.Button({
									icon: "sap-icon://excel-attachment",
									visible : true,
									press : function(oEvent){
										var objUtil = new utility();
				        	  objUtil.makeHTMLTable(jsonInventoryFLOG, "EDI - Summary","export");
									}
								})
							]
						})
    	 }).addStyleClass("tblBorder");

 		oFLOGTableResult.addColumn(new sap.ui.table.Column({
   		 label: new sap.ui.commons.Label({text: "Serial No."}).addStyleClass("wraptextcol"),
   		template: new sap.ui.commons.Link({
				press : function(oEvent){
					var oFSERDET = new fserdet();
					oFSERDET.setValueHeaderDET(oEvent, "FDET");
				}
		 }).bindProperty("text", "SerialNumber").addStyleClass("wraptext"),
           resizable:false,
           width:"auto",
           sortProperty: "SerialNumber",
           filterProperty : "SerialNumber",
           flexible: true,
           //autoResizable: true,
           //width : 'auto'
		 }));

		 oFLOGTableResult.addColumn(new sap.ui.table.Column({
 	   		 label: new sap.ui.commons.Label({text: "Depot No."}).addStyleClass("wraptextcol"),
 			 template: new sap.ui.commons.TextView({

 			 }).bindProperty("text", "DepotNumber").addStyleClass("wraptext"),
 	           resizable:false,
 	           width:"auto",
 	           sortProperty: "DepotNumber",
 	           filterProperty : "DepotNumber",
 	           flexible: true,
 	           //autoResizable: true,
 	           //width : 'auto'
 			 }));

			 oFLOGTableResult.addColumn(new sap.ui.table.Column({
	 	   		 label: new sap.ui.commons.Label({text: "Unit Part"}).addStyleClass("wraptextcol"),
	 			 template: new sap.ui.commons.TextView({

	 			 }).bindProperty("text", "FormatData").addStyleClass("wraptext"),
	 	           resizable:false,
	 	           width:"auto",
	 	           sortProperty: "FormatData",
	 	           filterProperty : "FormatData",
	 	           flexible: true,
	 	           //autoResizable: true,
	 	           //width : 'auto'
	 			 }));

				 oFLOGTableResult.addColumn(new sap.ui.table.Column({
		 	   		 label: new sap.ui.commons.Label({text: "Rev. No."}).addStyleClass("wraptextcol"),
		 			 template: new sap.ui.commons.TextView({

		 			 }).bindProperty("text", "ReceiverId").addStyleClass("wraptext"),
		 	           resizable:false,
		 	           width:"auto",
		 	           sortProperty: "ReceiverId",
		 	           filterProperty : "ReceiverId",
		 	           flexible: true,
		 	           //autoResizable: true,
		 	           //width : 'auto'
		 			 }));

			 oFLOGTableResult.addColumn(new sap.ui.table.Column({
	 	   		 label: new sap.ui.commons.Label({text: "Depot ID"}).addStyleClass("wraptextcol"),
	 			 template: new sap.ui.commons.TextView({

	 			 }).bindProperty("text", "DepotId").addStyleClass("wraptext"),
	 	           resizable:false,
	 	           width:"auto",
	 	           sortProperty: "DepotId",
	 	           filterProperty : "DepotId",
	 	           flexible: true,
	 	           //autoResizable: true,
	 	           //width : 'auto'
	 			 }));

				 oFLOGTableResult.addColumn(new sap.ui.table.Column({
		 	   		 label: new sap.ui.commons.Label({text: "Status"}).addStyleClass("wraptextcol"),
		 			 template: new sap.ui.commons.TextView({

		 			 }).bindProperty("text", "Status").addStyleClass("wraptext"),
		 	           resizable:false,
		 	           width:"auto",
		 	           sortProperty: "Status",
		 	           filterProperty : "Status",
		 	           flexible: true,
		 	           //autoResizable: true,
		 	           //width : 'auto'
		 			 }));

					 oFLOGTableResult.addColumn(new sap.ui.table.Column({
							 label: new sap.ui.commons.Label({text: "Description"}).addStyleClass("wraptextcol"),
						 template: new sap.ui.commons.TextView({

						 }).bindProperty("text", "Descr").addStyleClass("wraptext"),
									 resizable:false,
									 width:"auto",
									 sortProperty: "Descr",
									 filterProperty : "Descr",
									 flexible: true,
									 //autoResizable: true,
									 //width : 'auto'
						 }));

			 oFLOGTableResult.addColumn(new sap.ui.table.Column({
	 	   		 label: new sap.ui.commons.Label({text: "Creation Date"}).addStyleClass("wraptextcol"),
	 			 template: new sap.ui.commons.TextView({

	 			 }).bindProperty("text", "CreationDate").addStyleClass("wraptext"),
	 	           resizable:false,
	 	           width:"auto",
	 	           sortProperty: "CreationDate",
	 	           filterProperty : "CreationDate",
	 	           flexible: true,
	 	           //autoResizable: true,
	 	           //width : 'auto'
	 			 }));

				 oFLOGTableResult.addColumn(new sap.ui.table.Column({
		 	   		 label: new sap.ui.commons.Label({text: "Creation Time"}).addStyleClass("wraptextcol"),
		 			 template: new sap.ui.commons.TextView({

		 			 }).bindProperty("text", "CreationTime").addStyleClass("wraptext"),
		 	           resizable:false,
		 	           width:"auto",
		 	           sortProperty: "CreationTime",
		 	           filterProperty : "CreationTime",
		 	           flexible: true,
		 	           //autoResizable: true,
		 	           //width : 'auto'
		 			 }));

   	oFLOGTableResult.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Message ID"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({

			 }).bindProperty("text", "MessageId").addStyleClass("wraptext"),
	           resizable:false,
	           width:"auto",
	           sortProperty: "MessageId",
	           filterProperty : "MessageId",
	           flexible: true,
	           //autoResizable: true,
	           //width : 'auto'
			 }));

			 oFLOGTableResult.addColumn(new sap.ui.table.Column({
	 	   		 label: new sap.ui.commons.Label({text: "Message Type"}).addStyleClass("wraptextcol"),
	 			 template: new sap.ui.commons.TextView({

	 			 }).bindProperty("text", "MessageType").addStyleClass("wraptext"),
	 	           resizable:false,
	 	           width:"auto",
	 	           sortProperty: "MessageType",
	 	           filterProperty : "MessageType",
	 	           flexible: true,
							 visible : false
	 	           //autoResizable: true,
	 	           //width : 'auto'
	 			 }));

		 oFLOGTableResult.addColumn(new sap.ui.table.Column({
 	   		 label: new sap.ui.commons.Label({text: "Message Name"}).addStyleClass("wraptextcol"),
 			 template: new sap.ui.commons.TextView({

 			 }).bindProperty("text", "MessageName").addStyleClass("wraptext"),
 	           resizable:false,
 	           width:"auto",
 	           sortProperty: "MessageName",
 	           filterProperty : "MessageName",
 	           flexible: true,
 	           //autoResizable: true,
 	           //width : 'auto'
 			 }));

		 oFLOGTableResult.addColumn(new sap.ui.table.Column({
				 label: new sap.ui.commons.Label({text: "Message Source"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({

			 }).bindProperty("text", "MessageSource").addStyleClass("wraptext"),
						 resizable:false,
						 width:"auto",
						 sortProperty: "MessageSource",
						 filterProperty : "MessageSource",
						 flexible: true,
						 //autoResizable: true,
						 //width : 'auto'
			 }));

			 oFLOGTableResult.addColumn(new sap.ui.table.Column({
			 		label: new sap.ui.commons.Label({text: "User ID"}).addStyleClass("wraptextcol"),
			 	template: new sap.ui.commons.TextView({

			 	}).bindProperty("text", "Userid").addStyleClass("wraptext"),
			 				resizable:false,
			 				width:"auto",
			 				sortProperty: "Userid",
			 				filterProperty : "Userid",
			 				flexible: true,
			 				//autoResizable: true,
			 				//width : 'auto'
			 	}));

   	oFLOGTableResult.addColumn(new sap.ui.table.Column({
			 visible : false,
	   		 label: new sap.ui.commons.Label({text: "File Name"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView({

			 }).bindProperty("text", "FileName"),
	           resizable:false,
	           width:"auto",
	           sortProperty: "FileName",
	           filterProperty : "FileName",
	           flexible: true,
	           //autoResizable: true,
	           //width : 'auto'
			 }));

			 var oFLOGLabel = new sap.ui.commons.Label("idFLOGLabel", { visible : false, text : "EDI Log"});

			 /* FLOG - Flexbox - Title and Excel */
			var objUtil = new utility();
   		var oFLOGContentTitleExcel = new sap.m.FlexBox({
   		         items: [
				   		        oFLOGLabel,
											new sap.ui.commons.Label(),
											new sap.ui.commons.Button({
															text : "",
															styled:false,
															type:sap.m.ButtonType.Unstyled,
															icon: sap.ui.core.IconPool.getIconURI("excel-attachment"),
															press:function(){
																  objUtil.makeHTMLTable(oFLOGJsonEDIDetails, sap.ui.getCore().byId("idFLOGLabel").getText(),"export");
															}
											}).addStyleClass("dashBtn")
   		       ],
						 justifyContent : sap.m.FlexJustifyContent.SpaceBetween,
   		       direction : "Row",
   		       visible: true,
   		}).addStyleClass("marginLeft20");

				var oFLOGLayoutSelection = new sap.ui.layout.form.ResponsiveGridLayout("idFLOGLayoutSelection", {
								emptySpanL: 0,
								emptySpanM: 0,
								emptySpanS: 0,
								labelSpanL: 1,
								labelSpanM: 1,
								labelSpanS: 1,
								columnsL: 2,
								columnsM: 2,
								columnsS: 2,
								breakpointL: 765,
								breakpointM: 320
				});

				var oFLOGFormSelection = new sap.ui.layout.form.Form("idFLOGFormSelection",{
							layout: oFLOGLayoutSelection,
							width: "100%",
							formContainers: [
											new sap.ui.layout.form.FormContainer({
													//title: new sap.ui.core.Title({text: ""}),
													formElements: [
																		new sap.ui.layout.form.FormElement({
											fields: [backEDI],
											layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
										}),
										new sap.ui.layout.form.FormElement({
											fields: [oFLOGFlexDepot],
											layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
										}),
										new sap.ui.layout.form.FormElement({
											fields: [oFLOGFlexSerial, oFLOGFlexDate, oFLOGFlexActivity],
											layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
										}),
										new sap.ui.layout.form.FormElement({
											fields: [oFLOGFlexStatus, oFLOGFlexMessageID, new sap.m.Label()],
											layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
										}),
										new sap.ui.layout.form.FormElement({
											fields: [oFLOGFlexVRButton],
											layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
										}),
										new sap.ui.layout.form.FormElement({
											fields: [oFLOGDivider],
											layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
										}), //oFLOGTableResult
										new sap.ui.layout.form.FormElement({
											fields: [oFLOGTableResult],
											layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
										})
													],layoutData: new sap.ui.layout.GridData({span: "L7 M12 S12"})
											})
							]
				});

				return oFLOGFormSelection;

		// var oFLOGFlexFinal = new sap.m.FlexBox("idFLOGFlexFinal",{
		// 				width : "90%",
    //         items: [ backEDI,
		// 								 //new sap.m.Label(),
		// 								 oFLOGFlexSerialNo,
		// 								 new sap.m.Label(),
		// 								 oFLOGTableResult
    //                 ],
    //         direction: "Column"
		// }).addStyleClass("marginMainLeft");

		//return oFLOGFlexFinal;

    },

		resetFLOG : function(){
			//sap.ui.getCore().byId("idFLOGComboDepot").setSelectedKey("");
			if(sap.ui.getCore().byId("idFLOGComboDepot") != undefined){
			var oModelDepot = new sap.ui.model.json.JSONModel();
			oModelDepot.setSizeLimit(99999);
			oModelDepot.setData({data:depotEdiData});
			var oComboDepot = sap.ui.getCore().byId("idFLOGComboDepot");
			oComboDepot.setModel(oModelDepot);
			oComboDepot.setSelectedKey(depotEdiData[0].key);
			oComboDepot.bindItems("/data", new sap.ui.core.ListItem({text: "{text}", key:"{key}"}));
		}
			sap.ui.getCore().byId("idFLOGInputSerial").setValue("");
			sap.ui.getCore().byId("idFLOGInputMessageID").setValue("");
			sap.ui.getCore().byId("idFLOGComboStatus").setSelectedKey("");
			sap.ui.getCore().byId("idFLOGComboActivity").setSelectedKey("");

			sap.ui.getCore().byId("idFLOGInputFromDate").setValue("");
			sap.ui.getCore().byId("idFLOGInputToDate").setValue("");

			sap.ui.getCore().byId("idFLOGTableResult").setVisible(false);
		},

		hideTableResult : function(){
			sap.ui.getCore().byId("idFLOGTableResult").setVisible(false);
		},

    /*FSUM : Set Graph Values */

    setFLOGValues : function(){
    	var oCurrent = this;
			var serialno = sap.ui.getCore().byId("idFLOGInputSerial").getValue();
			var depot = sap.ui.getCore().byId("idFLOGComboDepot").getSelectedKey();
			var status = sap.ui.getCore().byId("idFLOGComboStatus").getSelectedKey();
			var activity = sap.ui.getCore().byId("idFLOGComboActivity").getSelectedKey();
			var msgid = sap.ui.getCore().byId("idFLOGInputMessageID").getValue();

			var datefrom = sap.ui.getCore().byId("idFLOGInputFromDate").getYyyymmdd();
			var dateto = sap.ui.getCore().byId("idFLOGInputToDate").getYyyymmdd();
			if(!datefrom)
					datefrom = "99999999";
			if(!dateto)
					dateto = "99999999";
			var daterange = datefrom + dateto;

			oModel = new sap.ui.model.odata.ODataModel(serviceEDIDOC, true);
			var oMODELFLOG = serviceEDIDOC + "FLOGSet?$filter=Userid eq '" + sessionStorage.uName.toUpperCase() 	// "CPIC_CXI001"
												+ "' and SerialNo eq '" + serialno
												+ "' and Depot eq '" + depot

												+ "' and Status eq '" + status
												+ "' and Msgid eq '" + msgid
												+ "' and Activity eq '" + activity // GIN, GOU, EST, LSA or RCN
												+ "' and Date eq '" + daterange //2018010120190101
												+ "'";
			oFLOGJSONResult = [];

			busyDialog.open();
			console.log(oMODELFLOG);
			OData.request({
			      requestUri: oMODELFLOG,
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
						sap.ui.getCore().byId("idFLOGTableResult").setVisible(false);
		    		console.log("Above request : Success but returned nothing");
		    		sap.ui.commons.MessageBox.alert("No data found!");
		    	}else{
						sap.ui.getCore().byId("idFLOGTableResult").setVisible(true);
		    		console.log("Above request : Success");
						oFLOGJSONResult = data.results;
						var oFLOGModelResult = new sap.ui.model.json.JSONModel();
						oFLOGModelResult.setData({modelData: oFLOGJSONResult});

						var oFLOGTableResult = sap.ui.getCore().byId("idFLOGTableResult");
						oFLOGTableResult.setModel(oFLOGModelResult);
						if(oFLOGJSONResult.length > 18)
							oFLOGTableResult.setVisibleRowCount(18);
						else
							oFLOGTableResult.setVisibleRowCount(oFLOGJSONResult.length);
						oFLOGTableResult.bindRows("/modelData");
						jsonInventoryFLOG = [];
						for(var i=0; i<oFLOGJSONResult.length; i++){
							jsonInventoryFLOG.push({
								"Serial No." : oFLOGJSONResult[i].SerialNumber,
								"Depot No." : oFLOGJSONResult[i].DepotNumber,
								"Unit Part" : oFLOGJSONResult[i].FormatData,
								"Rev. No." : oFLOGJSONResult[i].ReceiverId,
								"Depot ID" : oFLOGJSONResult[i].DepotId,
								"Status" : oFLOGJSONResult[i].Status,
								"Description" : oFLOGJSONResult[i].Descr,
								"Creation Date" : oFLOGJSONResult[i].CreationDate,
								"Creation Time" : oFLOGJSONResult[i].CreationTime,
								"Message ID" : oFLOGJSONResult[i].MessageId,
								"Message Name" : oFLOGJSONResult[i].MessageName,
								"Message Source" : oFLOGJSONResult[i].MessageSource,
								"User ID" : oFLOGJSONResult[i].Userid
							});
						}
						
		    	}
		    },function(err){
					sap.ui.getCore().byId("idFLOGTableResult").setVisible(false);
					busyDialog.close();
					console.log("Above request : Failed");
					sap.ui.commons.MessageBox.alert("No data found!");
		    });


    },

		setValueHeaderDETEstim : function(ProcessDate, UserName, MessageName, MessageType, DepotId, SerialNumber,Type, MsgRef){
			var oCurrent = this;
			var oMODELFHEADERDETSet = serviceEDIDOC + "headerDETSet(ProcessDate='" + ProcessDate +
										"',UserName='" + UserName +
										"',MessageName='" + MessageName +
										"',MessageType='" + MessageType +
										"',DepotId='" + DepotId +
										"',SerialNumber='" + SerialNumber +
										"',MsgRef='" + MsgRef +
										"')";

			busyDialog.open();
			console.log(oMODELFHEADERDETSet);
			OData.request({
						requestUri: oMODELFHEADERDETSet,
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

					if(data.Serialno == ""){
						console.log("Above request : Success but returned nothing");
						sap.ui.commons.MessageBox.alert("No data found!");
						busyDialog.close();
					}else{
						console.log("Above request : Success");
						oJSONFHEADERESTDET = [];
						oJSONFHEADERESTDET.push(data);

						var headerdettitle = "EDI - Detail for " + SerialNumber;
						$('#idHdrContnt').html(headerdettitle);




						if(Type == "LSA"){

							var bus = sap.ui.getCore().getEventBus();
							bus.publish("nav", "to", {
									id : "FESTSUMLSA"
							});

							sap.ui.getCore().byId("idFESTSUMLSAInputDepot").setValue(data.DepotId);
							sap.ui.getCore().byId("idFESTSUMLSAInputSerial").setValue(data.Serialno);
							sap.ui.getCore().byId("idFESTSUMLSAInputReference").setValue(data.RefNo);
							sap.ui.getCore().byId("idFESTSUMLSAInputAppDate").setValue(data.ProcessDate);
							sap.ui.getCore().byId("idFESTSUMLSAInputAmount").setValue(data.Amount);

						}else{


							var bus = sap.ui.getCore().getEventBus();
							bus.publish("nav", "to", {
									id : "FESTSUM"
							});
							sap.ui.getCore().byId("idFESTSUMFormSelectionAuto").setVisible(true);

							sap.ui.getCore().byId("idFESTSUMComboDepot").setValue(data.DepotId);
							sap.ui.getCore().byId("idFESTSUMInputSerial").setValue(data.Serialno);
							sap.ui.getCore().byId("idFESTSUMInputEstDate").setValue(data.ProcessDate);

							sap.ui.getCore().byId("idFESTSUMInputLabRate").setValue(data.LabourRateC);
							sap.ui.getCore().byId("idFESTSUMInputLabRateM").setValue(data.LabourRateM);
							sap.ui.getCore().byId("idFESTSUMInputDppLimit").setValue(data.DppAmt);
							sap.ui.getCore().byId("idFESTSUMInputDppCurr").setValue(data.DppCurr);

							sap.ui.getCore().byId("idFESTSUMInputExchRate").setValue(data.ExRate);
							sap.ui.getCore().byId("idFESTSUMInputProdCate").setValue(data.PrdType);

							sap.ui.getCore().byId("idFESTSUMInputNotes1").setValue(data.Note1);
							sap.ui.getCore().byId("idFESTSUMInputNotes2").setValue(data.Note2);
							sap.ui.getCore().byId("idFESTSUMInputNotes3").setValue(data.Note3);
							sap.ui.getCore().byId("idFESTSUMInputNotes4").setValue(data.Note4);
							sap.ui.getCore().byId("idFESTSUMInputNotes5").setValue(data.Note5);
							sap.ui.getCore().byId("idFESTSUMInputStatus").setValue(data.EstimateType);
							sap.ui.getCore().byId("idFESTSUMComboUpc").setValue(data.Status);
							sap.ui.getCore().byId("idFESTSUMInputCustomerCode").setValue(data.CustomerCode);
							sap.ui.getCore().byId("idFESTSUMInputLessee").setValue(data.Lessee);
							sap.ui.getCore().byId("idFESTSUMInputRedel").setValue(data.RaNo);
							//sap.ui.getCore().byId("idFESTSUMInputDppLimit").setValue(data.DppCover);
							sap.ui.getCore().byId("idFESTSUMInputPOHDate").setValue(data.PrevOnhireDate);
							sap.ui.getCore().byId("idFESTSUMInputPOHLocation").setValue(data.PrevOnhireHloc);
							sap.ui.getCore().byId("idFESTSUMInputGINDate").setValue(data.GateInDt);
							sap.ui.getCore().byId("idFESTSUMInputRevNo").setValue(data.RefNo);
							sap.ui.getCore().byId("idFESTSUMInputBaseCurr").setValue(data.BaseCurr);
							sap.ui.getCore().byId("idFESTSUMInputReference").setValue(data.LesseeRef);
							sap.ui.getCore().byId("idFESTSUMInputAmount").setValue(data.LesseeAmt);

							/* Set Value Item Item Estimates */
							oCurrent.setValueItemDETEstim(ProcessDate, UserName, MessageName, MessageType, DepotId, SerialNumber, MsgRef);

						}



						busyDialog.close();
					}
				},function(err){
					busyDialog.close();
					console.log("Above request : Failed");
					sap.ui.commons.MessageBox.alert("No data found!");
				});
		},

		setValueItemDETEstim : function(ProcessDate, UserName, MessageName, MessageType, DepotId, SerialNumber, MsgRef){

			var oCurrent = this;
			var oMODELFITEMDETSet = serviceEDIDOC + "itemDETSet?$filter=" +
										"SerialNumber eq '" + SerialNumber +
										"' and DepotId eq '" + DepotId +
										"' and MessageType eq '" + MessageType +
										"' and MessageName eq '" + MessageName +
										"' and UserName eq '" + UserName +
										"' and MsgRef eq '" + MsgRef +
										"' and ProcessDate eq '" + ProcessDate + "'";

			console.log(oMODELFITEMDETSet);
			OData.request({
						requestUri: oMODELFITEMDETSet,
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
					if(data.Serialno == ""){
						console.log("Above request : Success but returned nothing");
						sap.ui.commons.MessageBox.alert("No data found!");
					}else{
						console.log("Above request : Success");
						var splitLines = [];
						oJSONFITEMESTDET = [];
						for(var i=0; i<data.results.length; i++){
							oJSONFITEMESTDET.push({

							});
							oJSONFITEMESTDET[i][0] = data.results[i].LocationCode;
							oJSONFITEMESTDET[i][1] = data.results[i].ComponentCode;
							oJSONFITEMESTDET[i][2] = data.results[i].DamageCode;
							oJSONFITEMESTDET[i][3] = data.results[i].MaterialCode;
							oJSONFITEMESTDET[i][4] = data.results[i].RepairCode;
							oJSONFITEMESTDET[i][5] = parseInt(data.results[i].RepairLength);
							oJSONFITEMESTDET[i][6] = parseInt(data.results[i].RepairWidth);
							oJSONFITEMESTDET[i][7] = data.results[i].RepairMeasureUnit;
							oJSONFITEMESTDET[i][8] = data.results[i].Quantity;
							oJSONFITEMESTDET[i][9] = data.results[i].ManHours;
							oJSONFITEMESTDET[i][10] = data.results[i].MaterialCost;
							oJSONFITEMESTDET[i][11] = data.results[i].Responsibility;
							oJSONFITEMESTDET[i][12] = data.results[i].LabourRate;
							oJSONFITEMESTDET[i][13] = data.results[i].BulletinNumber;
							oFESTSUMExcel.loadData(oJSONFITEMESTDET);
						}



					}
				},function(err){
					busyDialog.close();
					console.log("Above request : Failed");
					sap.ui.commons.MessageBox.alert("No data found!");
				});

		},

		setValueHeaderDET : function(oEvent, whichPage){

			var oCurrent = this;
			if(whichPage == "FSERDET"){
				var ProcessDate = oEvent.getSource().getBindingContext().getProperty("ProcessDate");
				var UserName = oEvent.getSource().getBindingContext().getProperty("UserName");
				var MessageName = oEvent.getSource().getBindingContext().getProperty("MessageName");
				var MessageType = oEvent.getSource().getBindingContext().getProperty("MessageType");
				var DepotId = oEvent.getSource().getBindingContext().getProperty("DepotId");
				var Type = oEvent.getSource().getBindingContext().getProperty("Type");
				var MsgRef = oEvent.getSource().getBindingContext().getProperty("MsgRef");
				var SerialNumber = oEvent.getSource().getBindingContext().getProperty("SerialNumber");
			}else if(whichPage == "FDET"){
				var ProcessDate = oEvent.getSource().getBindingContext().getProperty("CreationDate");
				var UserName = oEvent.getSource().getBindingContext().getProperty("UserName");
				var MessageName = oEvent.getSource().getBindingContext().getProperty("ActMessageName");
				var MessageType = oEvent.getSource().getBindingContext().getProperty("MessageType");
				var DepotId = oEvent.getSource().getBindingContext().getProperty("DepotId");
				var Type = oEvent.getSource().getBindingContext().getProperty("Type");
				var MsgRef = oEvent.getSource().getBindingContext().getProperty("MessageRef");
				var SerialNumber = oEvent.getSource().getBindingContext().getProperty("SerialNumber");
			}


			/* If Type is Estimate or Lessee Approval */

			if(Type == "EST" || Type == "LSA" )
				oCurrent.setValueHeaderDETEstim(ProcessDate, UserName, MessageName, MessageType, DepotId, SerialNumber,Type, MsgRef);
			else {
			var oMODELFHEADERDETSet = serviceEDIDOC + "headerDETSet(ProcessDate='" + ProcessDate +
										"',UserName='" + UserName +
										"',MessageName='" + MessageName +
										"',MessageType='" + MessageType +
										"',DepotId='" + DepotId +
										"',SerialNumber='" + SerialNumber +
										"',MsgRef='" + MsgRef +
										"')";

			busyDialog.open();
			console.log(oMODELFHEADERDETSet);
			OData.request({
						requestUri: oMODELFHEADERDETSet,
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
					if(data.Serialno == ""){
						console.log("Above request : Success but returned nothing");
						sap.ui.commons.MessageBox.alert("No data found!");
					}else{
						console.log("Above request : Success");
						oJSONFHEADERDET = [];
						oJSONFHEADERDET.push(data);

						var oModelFHEADERDET = new sap.ui.model.json.JSONModel();
						oModelFHEADERDET.setData({modelData: oJSONFHEADERDET});

						var headerdettitle = "EDI - Detail for " + SerialNumber;
						$('#idHdrContnt').html(headerdettitle);
						var bus = sap.ui.getCore().getEventBus();
						bus.publish("nav", "to", {
								id : "FHEADERDET"
						});

						if(sap.ui.getCore().byId("idFESTSUMFormSelectionAuto"))
							sap.ui.getCore().byId("idFESTSUMFormSelectionAuto").setVisible(false);

						var oFHEADERDETTableResult = sap.ui.getCore().byId("idFHEADERDETTableResult");
						oFHEADERDETTableResult.setModel(oModelFHEADERDET);
						oFHEADERDETTableResult.setVisibleRowCount(oJSONFHEADERDET.length);
						oFHEADERDETTableResult.bindRows("/modelData");

						sap.ui.getCore().byId("idFHEADERDETTableResultEstimateType").setVisible(true);
						sap.ui.getCore().byId("idFHEADERDETTableResultStatusCol").setVisible(true);
						sap.ui.getCore().byId("idFHEADERDETTableColumnResultOrder").setVisible(true);
						sap.ui.getCore().byId("idFHEADERDETTableResult").setWidth('80%'); // Default
						if(Type == "GIN"){
							sap.ui.getCore().byId("idFHEADERDETTableResultDate").setText("Gate IN Date");
							sap.ui.getCore().byId("idFHEADERDETTableResultOrder").setText("Return Authorization");
							sap.ui.getCore().byId("idFHEADERDETTableResultEstimateType").setVisible(false);
						}else if(Type == "GOU"){
							sap.ui.getCore().byId("idFHEADERDETTableResultDate").setText("Gate OUT Date");
							sap.ui.getCore().byId("idFHEADERDETTableResultOrder").setText("Release Authorization");
							sap.ui.getCore().byId("idFHEADERDETTableResultEstimateType").setVisible(false);
						}else if(Type == "RCN"){
							sap.ui.getCore().byId("idFHEADERDETTableResultDate").setText("Completion Date");
							sap.ui.getCore().byId("idFHEADERDETTableColumnResultOrder").setVisible(false);
							sap.ui.getCore().byId("idFHEADERDETTableResult").setWidth('50%'); // Reduced column

							sap.ui.getCore().byId("idFHEADERDETTableResultEstimateType").setVisible(false);
							sap.ui.getCore().byId("idFHEADERDETTableResultStatusCol").setVisible(false);
						}
					}
				},function(err){
					busyDialog.close();
					console.log("Above request : Failed");
					sap.ui.commons.MessageBox.alert("No data found!");
				});
				}
		}
		//
		// moveFLOG : function(process, count, month){
		//
		// 	$('#idHdrContnt').html('EDI Summary Detail');
		// 	var ofdet = new fdet();
		// 	ofdet.bindFLOGTable(process, count, month);
		// }


});

function isValidDate(dateString) {
	  var regEx = /^\d{4}-\d{2}-\d{2}$/;
	  if(!dateString.match(regEx)) return false;  // Invalid format
	  var d = new Date(dateString);
	  if(!d.getTime() && d.getTime() !== 0) return false; // Invalid date
	  return d.toISOString().slice(0,10) === dateString;
}

function daysDiff(fromDate, toDate){
	var startDate = Date.parse(fromDate);
  var endDate = Date.parse(toDate);
  var timeDiff = endDate - startDate;
  var daysDifference = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
	return daysDifference;
}

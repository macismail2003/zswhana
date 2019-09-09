var oFSERDETJSONResult = [];
var oJSONFHEADERDET = [];

var oJSONFHEADERESTDET = [];
var oJSONFHEADERLSADET = [];
var oJSONFITEMESTDET = [];
var oJSONFITEMLSADET = [];

sap.ui.model.json.JSONModel.extend("fserdet", {

	/* FSUM : Create EDI Summary Page */

	createFSERDETPage : function(){

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

				var oFSERDETComboDepot = new sap.ui.commons.ComboBox("idFSERDETComboDepot",{
					visible: true,
						width:"300px",
						displaySecondaryValues:true,
						placeholder: "Depot",
						selectionChange: function(evnt){
							//oCurrent.resetFSERDETKeyFields();
						},
					}).addStyleClass("FormInputStyle marginTop7");

				var oFSERDETModelDepot = new sap.ui.model.json.JSONModel();
				oFSERDETModelDepot.setSizeLimit(99999);
				oFSERDETModelDepot.setData({data:depotEdiData});

				oFSERDETComboDepot.setModel(oFSERDETModelDepot);
				oFSERDETComboDepot.setSelectedKey(depotEdiData[0].key);
				oFSERDETComboDepot.bindItems("/data", new sap.ui.core.ListItem({text: "{text}", key:"{key}"}));
				//oFSERDETComboDepot.setEnabled(depotEnabled);

		//        if(depotEnabled){
		//        	oFSERDETComboDepot.setSelectedKey(depotEdiData[0].key);
		//        }else{
		//        	oFSERDETComboDepot.setSelectedKey(depotEdiData[1].key);
		//        }


				var oFSERDETLabelDepot = new sap.ui.commons.Label("idFSERDETLabelDepot",{
				text : "Depot",
				width : "130px",
				required : true,
				}).addStyleClass("marginTop10");

		var oFSERDETFlexDepot = new sap.m.FlexBox("idFSERDETFlexDepot",{
						items: [oFSERDETLabelDepot,
										oFSERDETComboDepot
										],
						direction: "Row"
		}).addStyleClass("marginMainLeft1");

			/*******************************/

			/* Serial Number */

			var oFSERDETInputSerial = new sap.ui.commons.TextField("idFSERDETInputSerial",{
					value : "",
					width : "130px",
					maxLength: 11,
					liveChange: function(evnt){
						//oCurrent.resetFSERDETKeyFields();
					},
					//type: sap.ui.commons.TextFieldType.Number
			}).addStyleClass("FormInputStyle marginTop7");

			var oFSERDETLabelSerial = new sap.ui.commons.Label("idFSERDETLabelSerial",{
			text : "Serial No.",
			width : "130px",
			required : false,
			}).addStyleClass("marginTop10");


			var oFSERDETFlexSerial = new sap.m.FlexBox("idFSERDETFlexSerial",{
									 items: [oFSERDETLabelSerial,
													 oFSERDETInputSerial
													 ],
									 width: "300px",
									 direction: "Row"
			});

			/* Status */

			var oFSERDETComboStatus = new sap.ui.commons.ComboBox("idFSERDETComboStatus", {
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

			oFSERDETComboStatus.addItem(new sap.ui.core.ListItem({
											text:"",
											key: ""
											}));

											oFSERDETComboStatus.addItem(new sap.ui.core.ListItem({
																			text:"A",
																			key: "A"
																			}));

			oFSERDETComboStatus.addItem(new sap.ui.core.ListItem({
											text:"D",
											key: "D"
											}));

			oFSERDETComboStatus.addItem(new sap.ui.core.ListItem({
				text:"E",
				key: "E"
				}));

				oFSERDETComboStatus.addItem(new sap.ui.core.ListItem({
					text:"G",
					key: "G"
					}));

					oFSERDETComboStatus.addItem(new sap.ui.core.ListItem({
						text:"L",
						key: "L"
						}));


					var oFSERDETLabelStatus = new sap.ui.commons.Label("idFSERDETLabelStatus",{
					text : "Status",
					width : "130px"
					}).addStyleClass("marginTop10");


			var oFSERDETFlexStatus = new sap.m.FlexBox("idFSERDETFlexStatus",{
									 items: [oFSERDETLabelStatus,
													 oFSERDETComboStatus
													 ],
									 width: "300px",
									 direction: "Row"
			});

			/* Activity */

			var oFSERDETComboActivity = new sap.ui.commons.ComboBox("idFSERDETComboActivity", {
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

			oFSERDETComboActivity.addItem(new sap.ui.core.ListItem({
											text:"",
											key: ""
											}));

			oFSERDETComboActivity.addItem(new sap.ui.core.ListItem({
											text:"Gate IN",
											key: "GIN"
											}));

			oFSERDETComboActivity.addItem(new sap.ui.core.ListItem({
				text:"Gate OUT",
				key: "GOU"
				}));

				oFSERDETComboActivity.addItem(new sap.ui.core.ListItem({
												text:"Estimate",
												key: "EST"
												}));

				oFSERDETComboActivity.addItem(new sap.ui.core.ListItem({
					text:"Lessee Approval",
					key: "LSA"
					}));

					oFSERDETComboActivity.addItem(new sap.ui.core.ListItem({
													text:"Repair Completion",
													key: "RCN"
													}));


					var oFSERDETLabelActivity = new sap.ui.commons.Label("idFSERDETLabelActivity",{
					text : "Message Name",
					width : "130px"
					}).addStyleClass("marginTop10");


			var oFSERDETFlexActivity = new sap.m.FlexBox("idFSERDETFlexActivity",{
									 items: [oFSERDETLabelActivity,
													 oFSERDETComboActivity
													 ],
									 width: "300px",
									 direction: "Row"
			});

			/* Message ID */

			var oFSERDETInputMessageID = new sap.ui.commons.TextField("idFSERDETInputMessageID",{
					value : "",
					width : "130px",
					//maxLength: 11,
					liveChange: function(evnt){
						//oCurrent.resetFSERDETKeyFields();
					},
					//type: sap.ui.commons.TextFieldType.Number
			}).addStyleClass("FormInputStyle marginTop7");

			var oFSERDETLabelMessageID = new sap.ui.commons.Label("idFSERDETLabelMessageID",{
			text : "Message ID",
			width : "130px"
			}).addStyleClass("marginTop10");


			var oFSERDETFlexMessageID = new sap.m.FlexBox("idFSERDETFlexMessageID",{
									 items: [oFSERDETLabelMessageID,
													 oFSERDETInputMessageID
													 ],
									 width: "300px",
									 direction: "Row"
			});

			/* Date */

			var oFSERDETInputFromDate = new sap.ui.commons.DatePicker("idFSERDETInputFromDate",{
					value: {
						path: yyyymmddtoday(),
						type: new sap.ui.model.type.Date({pattern: "dd/MM/yyyy"})
					},
					width : "100px"
				}).addStyleClass("FormInputStyle marginTop7");

			var oFSERDETInputToDate = new sap.ui.commons.DatePicker("idFSERDETInputToDate",{
					value: {
						path: yyyymmddtoday(),
						type: new sap.ui.model.type.Date({pattern: "dd/MM/yyyy"})
					},
					width : "100px"
				}).addStyleClass("FormInputStyle marginTop7");

			var oFSERDETLabelDate = new sap.ui.commons.Label("idFSERDETLabelDate",{
			text : "Created Date",
			width : "130px"
			}).addStyleClass("marginTop10");

			var oFSERDETLabelToDate = new sap.ui.commons.Label("idFSERDETLabelToDate",{
			text : "To",
			width : "50px"
		}).addStyleClass("marginTop10 marginLeft20");


			var oFSERDETFlexDate = new sap.m.FlexBox("idFSERDETFlexDate",{
							 items: [oFSERDETLabelDate,
											 oFSERDETInputFromDate,
											 oFSERDETLabelToDate,
											 oFSERDETInputToDate
											 ],
							 width: "300px",
							 direction: "Row"
			});

			/* Buttons */
			var oFSERDETButtonReset = new sap.m.Button("idFSERDETButtonReset",{
					text : "Reset",
					width:"100px",
					styled:false,
					visible: true,
					//layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: true}),
					press:function(){
						oCurrent.resetFSERDET();
			}}).addStyleClass("normalBtn");

				var oFSERDETButtonSearch = new sap.m.Button("idFSERDETButtonSearch",{
					text : "Search",
					width:"100px",
					styled:false,
					visible: true,
					//layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: true}),
					press:function(){

						var depot = sap.ui.getCore().byId("idFSERDETComboDepot").getSelectedKey();
						var serialno = sap.ui.getCore().byId("idFSERDETInputSerial").getValue();

						if(!depot){
							sap.ui.commons.MessageBox.alert("Please select a depot");
							return;
						}

						var fromDate = sap.ui.getCore().byId("idFSERDETInputFromDate").getYyyymmdd();
						var toDate = sap.ui.getCore().byId("idFSERDETInputToDate").getYyyymmdd();
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


						oCurrent.setFSERDETValues();
			}}).addStyleClass("normalBtn");

			var oFSERDETDivider = new sap.ui.commons.HorizontalDivider({width: "95%", type: "Area", height: "Medium"});

			var oFSERDETFlexVRButton = new sap.m.FlexBox("idFSERDETFlexVRButton",{
							items: [oFSERDETButtonReset,
											oFSERDETButtonSearch
											],
							direction: "Row"
				}).addStyleClass("marginMainLeft");

		/* Result Table */

		var oFSERDETTableResult = new sap.ui.table.Table("idFSERDETTableResult",{
				visibleRowCount: 10,
				firstVisibleRow: 3,
				columnHeaderHeight: 40,
				enableColumnReordering : false,
				visible : false,
				width: '98%',
				selectionMode: sap.ui.table.SelectionMode.None
			 }).addStyleClass("tblBorder1");

			 oFSERDETTableResult.addColumn(new sap.ui.table.Column({
			 		 label: new sap.ui.commons.Label({text: "Serial No."}).addStyleClass("wraptextcol"),
			 	 template: new sap.ui.commons.TextView({

			 	 }).bindProperty("text", "SerialNumber"),
			 				 resizable:false,
			 				 width:"120px",
			 				 sortProperty: "SerialNumber",
			 				 filterProperty : "SerialNumber"
			 	 }));

			 oFSERDETTableResult.addColumn(new sap.ui.table.Column({
						label: new sap.ui.commons.Label({text: "Depot ID"}).addStyleClass("wraptextcol"),
					template: new sap.ui.commons.TextView({

					}).bindProperty("text", "DepotId"),
								resizable:false,
								width:"120px",
								sortProperty: "DepotId",
								filterProperty : "DepotId"
					}));

				oFSERDETTableResult.addColumn(new sap.ui.table.Column({
						 label: new sap.ui.commons.Label({text: "Message Type"}).addStyleClass("wraptextcol"),
					 template: new sap.ui.commons.TextView({

					 }).bindProperty("text", "MessageType"),
								 resizable:false,
								 width:"180px",
								 sortProperty: "MessageType",
								 filterProperty : "MessageType"
					 }));

			 oFSERDETTableResult.addColumn(new sap.ui.table.Column({
						label: new sap.ui.commons.Label({text: "Message Name"}).addStyleClass("wraptextcol"),
					template: new sap.ui.commons.TextView({

					}).bindProperty("text", "MessageName"),
								resizable:false,
								width:"180px",
								sortProperty: "MessageName",
								filterProperty : "MessageName"
					}));

			oFSERDETTableResult.addColumn(new sap.ui.table.Column({
					 label: new sap.ui.commons.Label({text: "Process Date"}).addStyleClass("wraptextcol"),
				 template: new sap.ui.commons.Link({
					 press : function(oEvent){
							oCurrent.setValueHeaderDET(oEvent, "FSERDET");
					 }
				 }).bindProperty("text", "ProcessDate"),
							 resizable:false,
							 width:"120px",
							 sortProperty: "ProcessDate",
							 filterProperty : "ProcessDate"
				 }));

				 oFSERDETTableResult.addColumn(new sap.ui.table.Column({
				 		 label: new sap.ui.commons.Label({text: "Process Time"}).addStyleClass("wraptextcol"),
				 	 template: new sap.ui.commons.TextView({
				 	 }).bindProperty("text", "ProcessTime"),
				 				 resizable:false,
				 				 width:"120px",
				 				 sortProperty: "ProcessTime",
				 				 filterProperty : "ProcessTime"
				 	 }));

					 oFSERDETTableResult.addColumn(new sap.ui.table.Column({
			 				label: new sap.ui.commons.Label({text: "Status"}).addStyleClass("wraptextcol"),
			 			template: new sap.ui.commons.TextView({
			 			}).bindProperty("text", "Status"),
			 						resizable:false,
			 						width:"120px",
			 						sortProperty: "Status",
			 						filterProperty : "Status"
			 			}));

		 oFSERDETTableResult.addColumn(new sap.ui.table.Column({
			  visible : false,
					label: new sap.ui.commons.Label({text: "User Name"}).addStyleClass("wraptextcol"),
				template: new sap.ui.commons.TextView({

				}).bindProperty("text", "UserName"),
							resizable:false,
							width:"120px",
							sortProperty: "UserName",
							filterProperty : "UserName"
				}));

				var oFSERDETLayoutSelection = new sap.ui.layout.form.ResponsiveGridLayout("idFSERDETLayoutSelection", {
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

				var oFSERDETFormSelection = new sap.ui.layout.form.Form("idFSERDETFormSelection",{
							layout: oFSERDETLayoutSelection,
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
											fields: [oFSERDETFlexDepot],
											layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
										}),
										new sap.ui.layout.form.FormElement({
											fields: [oFSERDETFlexSerial, oFSERDETFlexDate, oFSERDETFlexActivity],
											layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
										}),
										new sap.ui.layout.form.FormElement({
											fields: [oFSERDETFlexStatus, oFSERDETFlexMessageID, new sap.m.Label()],
											layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
										}),
										new sap.ui.layout.form.FormElement({
											fields: [oFSERDETFlexVRButton],
											layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
										}),
										new sap.ui.layout.form.FormElement({
											fields: [oFSERDETDivider],
											layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
										}), //oFSERDETTableResult
										new sap.ui.layout.form.FormElement({
											fields: [oFSERDETTableResult],
											layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
										})
													],layoutData: new sap.ui.layout.GridData({span: "L7 M12 S12"})
											})
							]
				});

				return oFSERDETFormSelection;

		// var oFSERDETFlexFinal = new sap.m.FlexBox("idFSERDETFlexFinal",{
		// 				width : "90%",
    //         items: [ backEDI,
		// 								 //new sap.m.Label(),
		// 								 oFSERDETFlexSerialNo,
		// 								 new sap.m.Label(),
		// 								 oFSERDETTableResult
    //                 ],
    //         direction: "Column"
		// }).addStyleClass("marginMainLeft");

		//return oFSERDETFlexFinal;

    },

		resetFSERDET : function(){
			sap.ui.getCore().byId("idFSERDETComboDepot").setSelectedKey("");
			sap.ui.getCore().byId("idFSERDETInputSerial").setValue("");
			sap.ui.getCore().byId("idFSERDETInputMessageID").setValue("");
			sap.ui.getCore().byId("idFSERDETComboStatus").setSelectedKey("");
			sap.ui.getCore().byId("idFSERDETComboActivity").setSelectedKey("");

			sap.ui.getCore().byId("idFSERDETInputFromDate").setValue("");
			sap.ui.getCore().byId("idFSERDETInputToDate").setValue("");

			sap.ui.getCore().byId("idFSERDETTableResult").setVisible(false);
		},

    /*FSUM : Set Graph Values */

    setFSERDETValues : function(){
    	var oCurrent = this;
			var serialno = sap.ui.getCore().byId("idFSERDETInputSerial").getValue();
			var depot = sap.ui.getCore().byId("idFSERDETComboDepot").getSelectedKey();
			var status = sap.ui.getCore().byId("idFSERDETComboStatus").getSelectedKey();
			var activity = sap.ui.getCore().byId("idFSERDETComboActivity").getSelectedKey();
			var msgid = sap.ui.getCore().byId("idFSERDETInputMessageID").getValue();

			var datefrom = sap.ui.getCore().byId("idFSERDETInputFromDate").getYyyymmdd();
			var dateto = sap.ui.getCore().byId("idFSERDETInputToDate").getYyyymmdd();
			if(!datefrom)
					datefrom = "99999999";
			if(!dateto)
					dateto = "99999999";
			var daterange = datefrom + dateto;

			oModel = new sap.ui.model.odata.ODataModel(serviceEDIDOC, true);
			var oMODELFSERDET = serviceEDIDOC + "FSERDETSet?$filter=Userid eq '" + sessionStorage.uName.toUpperCase() 	// "CPIC_CXI001"
												+ "' and SerialNo eq '" + serialno
												+ "' and Depot eq '" + depot

												+ "' and Status eq '" + status
												+ "' and Msgid eq '" + msgid
												+ "' and Activity eq '" + activity // GIN, GOU, EST, LSA or RCN
												+ "' and Date eq '" + daterange //2018010120190101
												+ "'";

			busyDialog.open();
			console.log(oMODELFSERDET);
			OData.request({
			      requestUri: oMODELFSERDET,
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
						sap.ui.getCore().byId("idFSERDETTableResult").setVisible(false);
		    		console.log("Above request : Success but returned nothing");
		    		sap.ui.commons.MessageBox.alert("No data found!");
		    	}else{
						sap.ui.getCore().byId("idFSERDETTableResult").setVisible(true);
		    		console.log("Above request : Success");
						oFSERDETJSONResult = data.results;
						var oFSERDETModelResult = new sap.ui.model.json.JSONModel();
						oFSERDETModelResult.setData({modelData: oFSERDETJSONResult});

						var oFSERDETTableResult = sap.ui.getCore().byId("idFSERDETTableResult");
						oFSERDETTableResult.setModel(oFSERDETModelResult);
						if(oFSERDETJSONResult.length > 18)
							oFSERDETTableResult.setVisibleRowCount(18);
						else
							oFSERDETTableResult.setVisibleRowCount(oFSERDETJSONResult.length);
						oFSERDETTableResult.bindRows("/modelData");

		    	}
		    },function(err){
					sap.ui.getCore().byId("idFSERDETTableResult").setVisible(false);
					busyDialog.close();
					console.log("Above request : Failed");
					sap.ui.commons.MessageBox.alert("No data found!");
		    });


    },

		setValueHeaderDETEstim : function(ProcessDate, UserName, MessageName, MessageType, DepotId, SerialNumber,Type, MsgRef){
			var oCurrent = this;
			ProcessDate = encodeURIComponent(ProcessDate);
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
			busyDialog.open();
			var oCurrent = this;
			//ProcessDate = encodeURIComponent(ProcessDate);
			if(ProcessDate) // 09.12.2018
				ProcessDate = ProcessDate.substr(0,2) + "." + ProcessDate.substr(5,2) + "." + ProcessDate.substr(10,4);
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
							oJSONFITEMESTDET[i][5] = (data.results[i].RepairLength == "")?"":parseInt(data.results[i].RepairLength);
							oJSONFITEMESTDET[i][6] = (data.results[i].RepairWidth == "")?"":parseInt(data.results[i].RepairWidth);
							oJSONFITEMESTDET[i][7] = data.results[i].RepairMeasureUnit;
							oJSONFITEMESTDET[i][8] = data.results[i].Quantity;
							oJSONFITEMESTDET[i][9] = data.results[i].ManHours;
							oJSONFITEMESTDET[i][10] = data.results[i].MaterialCost;
							oJSONFITEMESTDET[i][11] = data.results[i].Responsibility;
							oJSONFITEMESTDET[i][12] = data.results[i].LabourRate;
							oJSONFITEMESTDET[i][13] = data.results[i].BulletinNumber;
							
						}
						oFESTSUMExcel.loadData(oJSONFITEMESTDET);



					}

					busyDialog.close();
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
				var UserName = oEvent.getSource().getBindingContext().getProperty("Userid");
				var MessageName = oEvent.getSource().getBindingContext().getProperty("MessageName");
				var MessageType = oEvent.getSource().getBindingContext().getProperty("MessageType");
				var DepotId = oEvent.getSource().getBindingContext().getProperty("DepotId");
				var Type = oEvent.getSource().getBindingContext().getProperty("Type");
				var MsgRef = oEvent.getSource().getBindingContext().getProperty("MsgRef");
				var SerialNumber = oEvent.getSource().getBindingContext().getProperty("SerialNumber");
			}else if(whichPage == "FDET"){
				var ProcessDate = oEvent.getSource().getBindingContext().getProperty("CreationDate");
				var UserName = oEvent.getSource().getBindingContext().getProperty("Userid");
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
			ProcessDate = encodeURIComponent(ProcessDate);
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
		// moveFDET : function(process, count, month){
		//
		// 	$('#idHdrContnt').html('EDI Summary Detail');
		// 	var ofdet = new fdet();
		// 	ofdet.bindFDETTable(process, count, month);
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

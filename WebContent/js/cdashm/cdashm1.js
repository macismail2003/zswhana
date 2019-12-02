 var global3SerialNo = "";
 var global3Equnr = "";
 var global3Depot = "";
 var global3DepotName = "";
 var global3EstimateNo = "";
 var global3EstimateText = "";
 var globalPicPanelExpanded = false;
 var global3UserCost = "";
 var oCDASHM1JsonCSApprove = [];
 var oCDASHM1ModelCSApprove = new sap.ui.model.json.JSONModel();

 var oCDASHM1PopoverAlert = "";
 var oCDASHM1JsonAlertOC = [];
 var oCDASHM1JsonAlertGeneral = [];
 var globalApprAllowed = true;

 var globalCDASHM1CustomerID = "";
 var globalCDASHM1CustomerIDTemp = "";
 var oCDASHM1DISPUTEJsonEstimateLines = [];

 sap.ui.model.json.JSONModel.extend("CDASHM1", {

 	/* CDASHM1 - Create Content */
 	createCDASHM1: function () {
 		var oCurrent = this;
 		var oCDASHM2 = new CDASHM2();

 		/* CDASHM1 - Create Table Estimates Approved */

 		if (sap.ui.getCore().byId("idCDASHM1TableEstimatesApproved") != undefined) {
 			sap.ui.getCore().byId("idCDASHM1TableEstimatesApproved").destroy();
 		}

 		var oCDASHM1TableEstimatesApproved = new sap.ui.table.Table("idCDASHM1TableEstimatesApproved", {
 			visibleRowCount: 10,
 			firstVisibleRow: 3,
 			fixedColumnCount: 1,
 			columnHeaderHeight: 48,
 			enableColumnReordering: false,
 			width: '98%',
 			selectionMode: sap.ui.table.SelectionMode.MultiToggle
 		}).addStyleClass("tblBorder1");

 		/*oCDASHM1TableEstimatesApproved.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: ""}).addStyleClass("wraptextcol"),
			   template: new sap.ui.core.Icon({

			           src : sap.ui.core.IconPool.getIconURI( "add-photo" ), //initiative
			           size : "22px",
			           //color : "blue",
			           //activeColor : "blue",
			           //activeBackgroundColor : "white",
			           //hoverColor : "blue",
			           //hoverBackgroundColor : "white",
			           width : "22px",
			           visible: "{isNormal}",
			           press : function(oEvent){
			        	   var estimateno = oEvent.getSource().getBindingContext().getProperty("estimateno");
			        	   var serialno = oEvent.getSource().getBindingContext().getProperty("unitnumber");
			        	   var icon = oEvent.getSource();
			        	   //oCurrent.getSerialHistory(serialno, icon);
			           }
			 }).addStyleClass("borderStyle1"),
	           resizable:true,
	           width:"50px"
			 }));*/

 		oCDASHM1TableEstimatesApproved.addColumn(new sap.ui.table.Column({
 			label: new sap.ui.commons.Label({
 				text: "Serial No."
 			}).addStyleClass("wraptextcol"),
 			template: new sap.ui.commons.Link({
 				press: function (oEvent) {

 					busyDialog.open();
 					global3SerialNo = oEvent.getSource().getBindingContext().getProperty("serialno");
 					global3Equnr = oEvent.getSource().getBindingContext().getProperty("serialno");
 					global3Depot = oEvent.getSource().getBindingContext().getProperty("depotcode");
 					global3DepotName = oEvent.getSource().getBindingContext().getProperty("depotname");
 					global3EstimateNo = oEvent.getSource().getBindingContext().getProperty("estimateno");
 					global3UserCost = oEvent.getSource().getBindingContext().getProperty("usercost");
 					globalApprAllowed = false;
 					global3EstimateText = oEvent.getSource().getBindingContext().getProperty("estimatetext");

 					var bus = sap.ui.getCore().getEventBus();
 					bus.publish("nav", "to", {
 						id: "CDASHM2"
 					});
 					$('#idHdrContnt').html('Unit Overview');

 					sap.ui.getCore().byId("idCDASHM2TableRecordDetailsMNRStatusLabel").setVisible(false);
 					sap.ui.getCore().byId("idCDASHM2TableRecordDetailsMNRStatusValue").setVisible(false);
 					sap.ui.getCore().byId("idCDASHM2TableRecordDetails").setWidth("60%");

 					var oTable = sap.ui.getCore().byId("idCDASHM1TableEstimatesApproved"); //Get Hold of table
 					var oScrollBar = oTable._oHSb; //Get Hold of Horizontal Scroll Bar
 					//oScrollBar.setScrollPosition(0);

 					/* CDASHM2 - Value - Header Details */

 					oCDASHM2.setValueHeaderDetails(false, false); // first false means this is not from serial istory popup
 					// second false means this is not a process change

 					/* CDASHM2 - Value - Record Details */

 					/* oCDASHM2.setValueRecordDetails(); */

 					/* CDASHM2 - Value - Estimate Lines */

 					oCDASHM2.setValueEstimateLines(false, false); // first false means this is not from serial istory popup
 					// second false means this is not a process change

 					/* CDASHM2 - Value - Thumbnail */
 					globalPicPanelExpanded = false;
 					var oCDASHM2ContentThumbNail = oCDASHM2.setContentThumbnail("");
 					sap.ui.getCore().byId("idCDASHM2ContentFinal").insertItem(oCDASHM2ContentThumbNail, 5);

 					/* CDASHM2 - Value - Summary Lines */

 					/* oCDASHM2.setValueMiscInfo(); */

 					busyDialog.close();

 					var oTable = sap.ui.getCore().byId("idCDASHM1TableEstimatesApproved"); //Get Hold of table
 					var oScrollBar = oTable._oHSb; //Get Hold of Horizontal Scroll Bar
 					//oScrollBar.setScrollPosition(0);

 				}
 			}).bindProperty("text", "serialno"),
 			resizable: false,
 			width: "120px",
 			sortProperty: "serialno",
 			filterProperty: "serialno",
 			flexible: true,
 			//autoResizable: true,
 			//width : 'auto'
 		}));

 		// oCDASHM1TableEstimatesApproved.addColumn(new sap.ui.table.Column({
 		//   label: new sap.ui.commons.Label({text: " "}).addStyleClass("wraptextcol"),
 		//   template: new sap.ui.core.Icon({
 		//           src : sap.ui.core.IconPool.getIconURI( "camera" ), //initiative
 		//           size : "22px",
 		//           color : "red",
 		//           activeColor : "red",
 		//           activeBackgroundColor : "white",
 		//           //hoverColor : "blue",
 		//           //hoverBackgroundColor : "white",
 		//           width : "22px",
 		//           press : function(oEvent){
 		//             // global3SerialNo = oEvent.getSource().getBindingContext().getProperty("serialno");
 		//             // var icon = oEvent.getSource();
 		//             // oCurrent.getSerialHistory(global3SerialNo, icon);
 		//           }
 		//  }).bindProperty("visible", "isPicExist").addStyleClass("borderStyle1"),
 		//       resizable:true,
 		//       width:"50px"
 		//  }));

 		oCDASHM1TableEstimatesApproved.addColumn(new sap.ui.table.Column({
 			label: new sap.ui.commons.Label({
 				text: "Customer No."
 			}).addStyleClass("wraptextcol"),
 			template: new sap.ui.commons.TextView({

 			}).bindProperty("text", "customercode"),
 			resizable: false,
 			width: "100px",
 			sortProperty: "customercode",
 			filterProperty: "customercode",
 			flexible: true,
 			//autoResizable: true,
 			//width : 'auto'
 		}));

 		oCDASHM1TableEstimatesApproved.addColumn(new sap.ui.table.Column({
 			label: new sap.ui.commons.Label({
 				text: "Customer Name"
 			}).addStyleClass("wraptextcol"),
 			template: new sap.ui.commons.TextView({

 			}).bindProperty("text", "customername"),
 			resizable: false,
 			width: "250px",
 			sortProperty: "customername",
 			filterProperty: "customername",
 			flexible: true,
 			//autoResizable: true,
 			//width : 'auto'
 		}));

 		/*	oCDASHM1TableEstimatesApproved.addColumn(new sap.ui.table.Column({
			   		 label: new sap.ui.commons.Label({text: "Estimate #"}).addStyleClass("wraptextcol"),
					 template: new sap.ui.commons.TextView({

					 }).bindProperty("text", "estimateno"),
			           resizable:false,
			           width:"120px",
			           sortProperty: "estimateno",
			           filterProperty : "estimateno",
			           flexible: true,
			           //autoResizable: true,
			           //width : 'auto'
					 }));*/

 		oCDASHM1TableEstimatesApproved.addColumn(new sap.ui.table.Column({
 			label: new sap.ui.commons.Label({
 				text: "Approval \nReference"
 			}).addStyleClass("wraptextcol"),
 			template: new sap.ui.commons.TextView({

 			}).bindProperty("text", "approvalref"),
 			resizable: false,
 			width: "200px",
 			sortProperty: "approvalref",
 			filterProperty: "approvalref",
 			flexible: true,
 			//autoResizable: true,
 			//width : 'auto'
 		}));

 		oCDASHM1TableEstimatesApproved.addColumn(new sap.ui.table.Column({
 			label: new sap.ui.commons.Label({
 				text: "Approval \nDate"
 			}).addStyleClass("wraptextcol"),
 			template: new sap.ui.commons.TextView({

 			}).bindProperty("text", "approveddate"),
 			resizable: false,
 			width: "120px",
 			sortProperty: "sortapproveddate",
 			filterProperty: "approveddate",
 			flexible: true,
 			//autoResizable: true,
 			//width : 'auto'
 		}));

 		oCDASHM1TableEstimatesApproved.addColumn(new sap.ui.table.Column({
 			label: new sap.ui.commons.Label({
 				text: "Estimate Type"
 			}).addStyleClass("wraptextcol"),
 			template: new sap.ui.commons.TextView({

 			}).bindProperty("text", "estimatetext"),
 			resizable: false,
 			width: "120px",
 			sortProperty: "estimatetext",
 			filterProperty: "estimatetext",
 			flexible: true,
 			//autoResizable: true,
 			//width : 'auto'
 		}));

 		oCDASHM1TableEstimatesApproved.addColumn(new sap.ui.table.Column({
 			label: new sap.ui.commons.Label({
 				text: "Lessee Cost"
 			}).addStyleClass("wraptextcol"),
 			template: new sap.ui.commons.TextView({
 				textAlign: sap.ui.core.TextAlign.Right
 			}).bindProperty("text", "usercost"),
 			resizable: false,
 			width: "110px",
 			sortProperty: "usercost",
 			filterProperty: "usercost",
 			flexible: true,
 			//autoResizable: true,
 			//width : 'auto'
 		}));

 		oCDASHM1TableEstimatesApproved.addColumn(new sap.ui.table.Column({
 			label: new sap.ui.commons.Label({
 				text: "Curr."
 			}).addStyleClass("wraptextcol"),
 			template: new sap.ui.commons.TextView({

 			}).bindProperty("text", "costcurrency"),
 			resizable: false,
 			width: "60px",
 			sortProperty: "costcurrency",
 			filterProperty: "costcurrency",
 			flexible: true,
 			//autoResizable: true,
 			//width : 'auto'
 		}));

 		oCDASHM1TableEstimatesApproved.addColumn(new sap.ui.table.Column({
 			label: new sap.ui.commons.Label({
 				text: "Off Hire Location"
 			}).addStyleClass("wraptextcol"),
 			template: new sap.ui.commons.TextView({

 			}).bindProperty("text", "offhirelocation"),
 			resizable: false,
 			width: "120px",
 			sortProperty: "offhirelocation",
 			filterProperty: "offhirelocation",
 			flexible: true,
 			//autoResizable: true,
 			//width : 'auto'
 		}));

 		oCDASHM1TableEstimatesApproved.addColumn(new sap.ui.table.Column({
 			label: new sap.ui.commons.Label({
 				text: "Estimate Date"
 			}).addStyleClass("wraptextcol"),
 			template: new sap.ui.commons.TextView({

 			}).bindProperty("text", "datesubmitted"),
 			resizable: false,
 			width: "110px",
 			flexible: true,
 			sortProperty: "sortsubmitdate",
 			filterProperty: "datesubmitted",
 			//autoResizable: true,
 			//width : 'auto'
 		}));

 		oCDASHM1TableEstimatesApproved.addColumn(new sap.ui.table.Column({
 			label: new sap.ui.commons.Label({
 				text: "Depot"
 			}).addStyleClass("wraptextcol"),
 			template: new sap.ui.commons.TextView({

 			}).bindProperty("text", "depotcode"),
 			resizable: false,
 			width: "70px",
 			sortProperty: "depotcode",
 			filterProperty: "depotcode",
 			flexible: true,
 			//autoResizable: true,
 			//width : 'auto'
 		}));

 		oCDASHM1TableEstimatesApproved.addColumn(new sap.ui.table.Column({
 			label: new sap.ui.commons.Label({
 				text: "Depot Name"
 			}).addStyleClass("wraptextcol"),
 			template: new sap.ui.commons.TextView({

 			}).bindProperty("text", "depotname"),
 			resizable: false,
 			width: "250px",
 			sortProperty: "depotname",
 			filterProperty: "depotname",
 			flexible: true,
 			//autoResizable: true,
 			//width : 'auto'
 		}));

 		oCDASHM1TableEstimatesApproved.addColumn(new sap.ui.table.Column({
 			label: new sap.ui.commons.Label({
 				text: "Unit Type"
 			}).addStyleClass("wraptextcol"),
 			template: new sap.ui.commons.TextView({

 			}).bindProperty("text", "material"),
 			resizable: false,
 			width: "100px",
 			sortProperty: "material",
 			filterProperty: "material",
 			flexible: true,
 			//autoResizable: true,
 			//width : 'auto'
 		}));

 		oCDASHM1TableEstimatesApproved.addColumn(new sap.ui.table.Column({
 			label: new sap.ui.commons.Label({
 				text: "Description"
 			}).addStyleClass("wraptextcol"),
 			template: new sap.ui.commons.TextView({

 			}).bindProperty("text", "materialcode"),
 			resizable: false,
 			width: "200px",
 			sortProperty: "materialcode",
 			filterProperty: "materialcode",
 			flexible: true,
 			//autoResizable: true,
 			//width : 'auto'
 		}));

 		/*oCDASHM1TableEstimatesApproved.addColumn(new sap.ui.table.Column({
			   		 label: new sap.ui.commons.Label({text: "Unit Status"}).addStyleClass("wraptextcol"),
					 template: new sap.ui.commons.TextView({

					 }).bindProperty("text", "status"),
			           resizable:false,
			           width:"250px",
			           sortProperty: "status",
			           filterProperty : "status",
			           flexible: true,
			           //autoResizable: true,
			           //width : 'auto'
					 }));*/

 		/*oCDASHM1TableEstimatesApproved.addColumn(new sap.ui.table.Column({
			   		 label: new sap.ui.commons.Label({text: "Last Action"}).addStyleClass("wraptextcol"),
					 template: new sap.ui.commons.TextView({

					 }).bindProperty("text", "lastaction"),
			           resizable:false,
			           width:"280px",
			           flexible: true,
			           //autoResizable: true,
			           //width : 'auto'
					 }));*/

 		/* CDASHM1 - Button - Download for Estimates Approved */

 		var oCDASHM1ButtonDownload_2 = new sap.ui.commons.Button("idCDASHM1ButtonDownload_2", {
 			text: "Download",
 			//icon: "sap-icon://reset",
 			press: function (oEvent) {
 				var orders = "";
 				var serialnos = "";
 				var isSelectedOne = sap.ui.getCore().byId("idCDASHM1TableEstimatesApproved").getSelectedIndices().length;
 				/*for(var i=0; i<oCDASHMJsonEstimatesPending.length; i++){
 				  if(oCDASHMJsonEstimatesPending[i].isChecked == true){
 				    isSelectedOne = true;
 				  }
 				}*/
 				if (isSelectedOne == 0) {
 					sap.ui.commons.MessageBox.alert("Select at least one order");
 				} else {
 					var arraySelLines = sap.ui.getCore().byId("idCDASHM1TableEstimatesApproved").getSelectedIndices();
 					for (var i = 0; i < oCDASHMJsonEstimatesApproved.length; i++) {
 						if (arraySelLines.indexOf(i) != -1) {
 							var oDetData = sap.ui.getCore().byId("idCDASHM1TableEstimatesApproved").getContextByIndex(i);
 							if (oDetData != undefined) {
 								var realPath = oDetData.getPath().split('/')[2];
 								if (orders == '') {
 									orders = oCDASHMJsonEstimatesApproved[realPath].estimateno;
 									serialnos = oCDASHMJsonEstimatesApproved[realPath].serialno;
 								} else {
 									orders = orders + '$' + oCDASHMJsonEstimatesApproved[realPath].estimateno;
 									serialnos = serialnos + '_' + oCDASHMJsonEstimatesApproved[realPath].serialno;
 								}
 							}
 						}
 					}
 					if (orders == "") {
 						sap.ui.commons.MessageBox.alert("No estimates selected");
 					} else {
 						var oCDASHM1 = new CDASHM1();
 						oCDASHM1.getPdfFromSap(orders, serialnos, "P"); // PDF
 					}

 				}
 			}
 		}).addStyleClass("normalBtn marginTop10 floatRight");

 		/* CDASHM1 - Button - Excel Download */

 		var oCDASHM1ButtonStatusMonitorExport_2 = new sap.ui.commons.Button("idCDASHM1ButtonStatusMonitorExport_2", {
 			text: "",
 			icon: sap.ui.core.IconPool.getIconURI("excel-attachment"),
 			press: function () {
 				var oUtility = new utility();
 				var excelCDASHMJsonEstimatesApproved = [];
 				var filteredIndices = sap.ui.getCore().byId("idCDASHM1TableEstimatesApproved").getBinding("rows").aIndices;
 				for (var i = 0; i < oCDASHMJsonEstimatesApproved.length; i++) {
 					if (filteredIndices.indexOf(i) != -1) {
 						excelCDASHMJsonEstimatesApproved.push({
 							"Serial No.": oCDASHMJsonEstimatesApproved[i].serialno,
 							"Customer No.": oCDASHMJsonEstimatesApproved[i].customercode,
 							"Customer Name": oCDASHMJsonEstimatesApproved[i].customername,
 							"Approval Reference": oCDASHMJsonEstimatesApproved[i].approvalref,
 							"Approval Date": oCDASHMJsonEstimatesApproved[i].approveddate,
 							"Estimate Type": oCDASHMJsonEstimatesApproved[i].estimatetext,
 							"Lessee Cost": oCDASHMJsonEstimatesApproved[i].usercost,
 							"Curr.": oCDASHMJsonEstimatesApproved[i].costcurrency,
 							"Off Hire Location": oCDASHMJsonEstimatesApproved[i].offhirelocation,
 							"Estimate Date": oCDASHMJsonEstimatesApproved[i].datesubmitted,
 							"Depot": oCDASHMJsonEstimatesApproved[i].depotcode,
 							"Depot Name": oCDASHMJsonEstimatesApproved[i].depotname,
 							"Unit Type": oCDASHMJsonEstimatesApproved[i].material,
 							"Description": oCDASHMJsonEstimatesApproved[i].materialcode
 						});
 					}
 				}
 				oUtility.makeHTMLTable(excelCDASHMJsonEstimatesApproved, "Units Approved", "export", "inventory_list");
 			}
 		}).addStyleClass("normalBtn marginTop10 floatRight");

 		/* CDASHM1 - Flex - Buttons */

 		var oCDASHM1FlexButtonsEstimatesApproved = new sap.m.FlexBox({
 			items: [oCDASHM1ButtonDownload_2, oCDASHM1ButtonStatusMonitorExport_2,
 				// new sap.ui.commons.Label("idCDASHM1PageLabelSimulateCustomer2", {
 				// 	text: "Simulate Customer : "
 				// }).addStyleClass("unitSearchResult"),
 				// new sap.m.Input("idCDASHM1PageInputCustomerID2", {
 				// 	value: ""
 				// }).addStyleClass("cdashmSimulateCustomerInput").addEventDelegate({
 				// 	onsapfocusleave: function (oEvent) {
 				// 		globalCDASHM1CustomerID = oEvent.srcControl.getProperty("value");
 				// 		oCurrent.setValueCustDash();
 				// 	}
 				// })
 			],
 			//justifyContent : sap.m.FlexJustifyContent.SpaceBetween,
 			direction: "Row"
 		});

 		/* CDASHM1 - Flex - Estimates Approved */

 		var oCDASHM1FlexEstimatesApproved = new sap.m.FlexBox({
 			items: [oCDASHM1FlexButtonsEstimatesApproved,
 				new sap.m.Label(),
 				oCDASHM1TableEstimatesApproved
 			],
 			direction: "Column"
 		});

 		/* CDASHM1 - Create Table Estimates Pending */

 		if (sap.ui.getCore().byId("idCDASHM1TableEstimatesPending") != undefined) {
 			sap.ui.getCore().byId("idCDASHM1TableEstimatesPending").destroy();
 		}

 		var oCDASHM1ButtonApprove = new sap.ui.commons.Button("idCDASHM1ButtonApprove", {
 			text: "Approve",
 			//icon: "sap-icon://reset",
 			press: function (oEvent) {
 				var isSelectedOne = sap.ui.getCore().byId("idCDASHM1TableEstimatesPending").getSelectedIndices().length;
 				if (isSelectedOne == 0) {
 					sap.ui.commons.MessageBox.alert("Select at least one order");
 				} else if (isSelectedOne > 24) {
 					sap.ui.commons.MessageBox.alert("Select not more than 25 units");
 				} else {
 					/* CS Approve Table */
 					oCurrent.createCSApprove(oEvent.getSource());
 				}

 				//}
 			}
 		}).addStyleClass("normalBtn marginTop10 floatRight");

 		var oCDASHM1ButtonDispute = new sap.ui.commons.Button("idCDASHM1ButtonDispute", {
 			text: "Dispute",
 			//icon: "sap-icon://reset",
 			press: function (oEvent) {
 				var isSelectedOne = sap.ui.getCore().byId("idCDASHM1TableEstimatesPending").getSelectedIndices().length;
 				if (isSelectedOne == 0) {
 					sap.ui.commons.MessageBox.alert("Select an order");
 				} else if (isSelectedOne > 1) {
 					sap.ui.commons.MessageBox.alert("Select only one order at a time");
 				} else {

 					var isSelectedOneOnDispute = "";
 					var isSelectedOneOnJSR = "";
 					var isJSActive = "";

 					var arraySelLines = sap.ui.getCore().byId("idCDASHM1TableEstimatesPending").getSelectedIndices();
 					for (var i = 0; i < oCDASHMJsonEstimatesPending.length; i++) {
 						if (arraySelLines.indexOf(i) != -1) {
 							var oDetData = sap.ui.getCore().byId("idCDASHM1TableEstimatesPending").getContextByIndex(i);
 							if (oDetData != undefined) {
 								var realPath = oDetData.getPath().split('/')[2];

 								isSelectedOneOnDispute = (oCDASHMJsonEstimatesPending[realPath].ondispute == "Yes") ? true : false;
 								isSelectedOneOnJSR = (oCDASHMJsonEstimatesPending[realPath].onjsrequest == "Yes") ? true : false;
 								isJSActive = (oCDASHMJsonEstimatesPending[realPath].estimatetype == "ZGES") ? true : false;

 							}
 						}
 					}

 					if (isSelectedOneOnDispute) {
 						sap.ui.commons.MessageBox.alert("Selected unit is already on dispute");
 					} else if (isSelectedOneOnJSR) {
 						sap.ui.commons.MessageBox.alert("Selected unit is already requested for Joint Survey");
 					} else {
 						/* Dispute Table */
 						oCurrent.createCSDispute(oEvent.getSource(), "D");
 					}

 				}

 				//}
 			}
 		}).addStyleClass("normalBtn marginTop10 floatRight");

 		var oCDASHM1ButtonJS = new sap.ui.commons.Button("idCDASHM1ButtonJS", {
 			text: "Joint Survey",
 			//icon: "sap-icon://reset",
 			press: function (oEvent) {
 				var isSelectedOne = sap.ui.getCore().byId("idCDASHM1TableEstimatesPending").getSelectedIndices().length;
 				if (isSelectedOne == 0) {
 					sap.ui.commons.MessageBox.alert("Select an order");
 				} else if (isSelectedOne > 1) {
 					sap.ui.commons.MessageBox.alert("Select only one order at a time");
 				} else {

 					var isSelectedOneOnDispute = "";
 					var isSelectedOneOnJSR = "";
 					var isJSActive = "";
 					var arraySelLines = sap.ui.getCore().byId("idCDASHM1TableEstimatesPending").getSelectedIndices();
 					for (var i = 0; i < oCDASHMJsonEstimatesPending.length; i++) {
 						if (arraySelLines.indexOf(i) != -1) {
 							var oDetData = sap.ui.getCore().byId("idCDASHM1TableEstimatesPending").getContextByIndex(i);
 							if (oDetData != undefined) {
 								var realPath = oDetData.getPath().split('/')[2];

 								isSelectedOneOnDispute = (oCDASHMJsonEstimatesPending[realPath].ondispute == "Yes") ? true : false;
 								isSelectedOneOnJSR = (oCDASHMJsonEstimatesPending[realPath].onjsrequest == "Yes") ? true : false;
 								isJSActive = (oCDASHMJsonEstimatesPending[realPath].estimatetype == "ZGES") ? true : false;

 							}
 						}
 					}

 					// if (isSelectedOneOnDispute) {
 					// 	sap.ui.commons.MessageBox.alert("Selected unit is already on Dispute");
 					// } else 

 					if (isSelectedOneOnJSR) {
 						sap.ui.commons.MessageBox.alert("Selected unit is already requested for Joint Survey");
 					} else if (isJSActive) {
 						sap.ui.commons.MessageBox.alert("Selected unit is already having Joint Survey");
 					} else {
 						/* Dispute Table */
 						oCurrent.createCSDispute(oEvent.getSource(), "J");
 					}

 				}

 				//}
 			}
 		}).addStyleClass("normalBtn marginTop10 floatRight");

 		var oCDASHM1ButtonDownload = new sap.ui.commons.Button("idCDASHM1ButtonDownload", {
 			text: "Download",
 			//icon: "sap-icon://reset",
 			press: function (oEvent) {
 				var orders = "";
 				var serialnos = "";
 				var isSelectedOne = sap.ui.getCore().byId("idCDASHM1TableEstimatesPending").getSelectedIndices().length;
 				/*for(var i=0; i<oCDASHMJsonEstimatesPending.length; i++){
 				  if(oCDASHMJsonEstimatesPending[i].isChecked == true){
 				    isSelectedOne = true;
 				  }
 				}*/
 				if (isSelectedOne == 0) {
 					sap.ui.commons.MessageBox.alert("Select at least one order");
 				} else {
 					var arraySelLines = sap.ui.getCore().byId("idCDASHM1TableEstimatesPending").getSelectedIndices();
 					for (var i = 0; i < oCDASHMJsonEstimatesPending.length; i++) {
 						if (arraySelLines.indexOf(i) != -1) {
 							var oDetData = sap.ui.getCore().byId("idCDASHM1TableEstimatesPending").getContextByIndex(i);
 							if (oDetData != undefined) {
 								var realPath = oDetData.getPath().split('/')[2];
 								if (orders == '') {
 									orders = oCDASHMJsonEstimatesPending[realPath].estimateno;
 									serialnos = oCDASHMJsonEstimatesPending[realPath].serialno;
 								} else {
 									orders = orders + '$' + oCDASHMJsonEstimatesPending[realPath].estimateno;
 									serialnos = serialnos + '_' + oCDASHMJsonEstimatesPending[realPath].serialno;
 								}
 							}
 						}
 					}
 					if (orders == "") {
 						sap.ui.commons.MessageBox.alert("No estimates selected");
 					} else {
 						if (sap.ui.getCore().byId("idCDASHM1Download") != undefined)
 							sap.ui.getCore().byId("idCDASHM1Download").destroy();

 						if (sap.ui.getCore().byId("idCDASHM1CheckBoxDownloadPDF") != undefined)
 							sap.ui.getCore().byId("idCDASHM1CheckBoxDownloadPDF").destroy();

 						if (sap.ui.getCore().byId("idCDASHM1CheckBoxDownloadPictures") != undefined)
 							sap.ui.getCore().byId("idCDASHM1CheckBoxDownloadPictures").destroy();

 						var oCDASHM1Download = new sap.m.Popover("idCDASHM1Download", {
 							//title: "Download",
 							//modal: true,
 							showHeader: false,
 							placement: sap.m.PlacementType.Bottom,
 							content: new sap.m.VBox({
 								//width:"300px",
 								items: [

 									new sap.ui.commons.CheckBox("idCDASHM1CheckBoxDownloadPDF", {
 										text: "Estimate",
 										checked: true
 									}).addStyleClass("pdfexcelcheckboxes1"),

 									new sap.ui.commons.CheckBox("idCDASHM1CheckBoxDownloadPictures", {
 										text: "Pictures",
 										checked: false
 									}).addStyleClass("pdfexcelcheckboxes1"),

 									new sap.ui.commons.Button({
 										text: "Download",
 										visible: true,
 										//layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
 										press: function (oEvent) {

 											var oCDASHM1 = new CDASHM1();
 											if (sap.ui.getCore().byId("idCDASHM1CheckBoxDownloadPDF").getChecked())
 												oCDASHM1.getPdfFromSap(orders, serialnos, "P"); // PDF
 											if (sap.ui.getCore().byId("idCDASHM1CheckBoxDownloadPictures").getChecked())
 												oCDASHM1.getPdfFromSap(orders, serialnos, "Z"); // ZIP of PICS

 										}
 									}).addStyleClass("marginTop10")

 								]
 							}),

 						}).addStyleClass("sapUiPopupWithPadding");

 						oCDASHM1Download.openBy(sap.ui.getCore().byId("idCDASHM1ButtonDownload"));
 					}
 				}
 			}
 		}).addStyleClass("normalBtn marginTop10 floatRight");

 		/* CDASHM1 - Create Table Estimates Approved */

 		if (sap.ui.getCore().byId("idCDASHM1TableEstimatesPending") != undefined) {
 			sap.ui.getCore().byId("idCDASHM1TableEstimatesPending").destroy();
 		}

 		var oCDASHM1TableEstimatesPending = new sap.ui.table.Table("idCDASHM1TableEstimatesPending", {
 			visibleRowCount: 10,
 			firstVisibleRow: 3,
 			columnHeaderHeight: 48,
 			fixedColumnCount: 1,
 			enableColumnReordering: false,
 			width: '98%',
 			selectionMode: sap.ui.table.SelectionMode.MultiToggle
 		}).addStyleClass("tblBorder1");

 		/*oCDASHM1TableEstimatesPending.addColumn(new sap.ui.table.Column({
		   		 label: new sap.ui.commons.Label({text: ""}).addStyleClass("wraptextcol"),
				   template: new sap.ui.core.Icon({
				           src : sap.ui.core.IconPool.getIconURI( "add-photo" ), //initiative
				           size : "22px",
				           //color : "blue",
				           //activeColor : "blue",
				           //activeBackgroundColor : "white",
				           //hoverColor : "blue",
				           //hoverBackgroundColor : "white",
				           width : "22px",
				           visible: "{isNormal}",
				           press : function(oEvent){
				        	   var estimateno = oEvent.getSource().getBindingContext().getProperty("estimateno");
				        	   var serialno = oEvent.getSource().getBindingContext().getProperty("unitnumber");
				        	   var icon = oEvent.getSource();
				        	   //oCurrent.getSerialHistory(serialno, icon);
				           }
				 }).addStyleClass("borderStyle1"),
		           resizable:true,
		           width:"50px"
				 }));*/

 		oCDASHM1TableEstimatesPending.addColumn(new sap.ui.table.Column({
 			label: new sap.ui.commons.Label({
 				text: "Serial No."
 			}).addStyleClass("wraptextcol"),
 			template: new sap.ui.commons.Link({
 				press: function (oEvent) {
 					busyDialog.open();
 					global3SerialNo = oEvent.getSource().getBindingContext().getProperty("serialno");
 					global3Equnr = oEvent.getSource().getBindingContext().getProperty("serialno");
 					global3Depot = oEvent.getSource().getBindingContext().getProperty("depotcode");
 					global3DepotName = oEvent.getSource().getBindingContext().getProperty("depotname");
 					global3EstimateNo = oEvent.getSource().getBindingContext().getProperty("estimateno");
 					global3UserCost = oEvent.getSource().getBindingContext().getProperty("usercost");
 					globalApprAllowed = true;
 					global3EstimateText = oEvent.getSource().getBindingContext().getProperty("estimatetext");

 					var bus = sap.ui.getCore().getEventBus();
 					bus.publish("nav", "to", {
 						id: "CDASHM2"
 					});
 					$('#idHdrContnt').html('Unit Overview');

 					sap.ui.getCore().byId("idCDASHM2TableRecordDetailsMNRStatusLabel").setVisible(true);
 					sap.ui.getCore().byId("idCDASHM2TableRecordDetailsMNRStatusValue").setVisible(true);
 					sap.ui.getCore().byId("idCDASHM2TableRecordDetails").setWidth("80%");

 					var oTable = sap.ui.getCore().byId("idCDASHM1TableEstimatesPending"); //Get Hold of table
 					var oScrollBar = oTable._oHSb; //Get Hold of Horizontal Scroll Bar
 					//oScrollBar.setScrollPosition(0);

 					/* CDASHM2 - Value - Header Details */

 					oCDASHM2.setValueHeaderDetails(false, false); // first false means this is not from serial istory popup
 					// second false means this is not a process change

 					/* CDASHM2 - Value - Record Details */

 					/* oCDASHM2.setValueRecordDetails(); */

 					/* CDASHM2 - Value - Estimate Lines */

 					oCDASHM2.setValueEstimateLines(false, false); // first false means this is not from serial istory popup
 					// second false means this is not a process change

 					/* CDASHM2 - Value - Thumbnail */
 					globalPicPanelExpanded = false;
 					var oCDASHM2ContentThumbNail = oCDASHM2.setContentThumbnail("");
 					sap.ui.getCore().byId("idCDASHM2ContentFinal").insertItem(oCDASHM2ContentThumbNail, 5);

 					/* CDASHM2 - Value - Summary Lines */

 					/* oCDASHM2.setValueMiscInfo(); */

 					busyDialog.close();

 					var oTable = sap.ui.getCore().byId("idCDASHM1TableEstimatesPending"); //Get Hold of table
 					var oScrollBar = oTable._oHSb; //Get Hold of Horizontal Scroll Bar
 					//oScrollBar.setScrollPosition(0);

 				}
 			}).bindProperty("text", "serialno"),
 			resizable: false,
 			width: "120px",
 			sortProperty: "serialno",
 			filterProperty: "serialno",
 			flexible: true,
 			//autoResizable: true,
 			//width : 'auto'
 		}));

 		oCDASHM1TableEstimatesPending.addColumn(new sap.ui.table.Column({
 			label: new sap.ui.commons.Label({
 				text: " "
 			}).addStyleClass("wraptextcol"),
 			template: new sap.ui.core.Icon({
 				src: sap.ui.core.IconPool.getIconURI("camera"), //initiative
 				size: "22px",
 				color: "red",
 				activeColor: "red",
 				activeBackgroundColor: "white",
 				//hoverColor : "blue",
 				//hoverBackgroundColor : "white",
 				width: "22px",
 				press: function (oEvent) {
 					// global3SerialNo = oEvent.getSource().getBindingContext().getProperty("serialno");
 					// var icon = oEvent.getSource();
 					// oCurrent.getSerialHistory(global3SerialNo, icon);
 				}
 			}).bindProperty("visible", "isPicExist").addStyleClass("borderStyle1"),
 			resizable: true,
 			width: "50px"
 		}));

 		oCDASHM1TableEstimatesPending.addColumn(new sap.ui.table.Column({
 			label: new sap.ui.commons.Label({
 				text: "Under Dispute"
 			}).addStyleClass("wraptextcol"),
 			template: new sap.ui.commons.TextView({

 			}).bindProperty("text", "ondispute"),
 			resizable: false,
 			width: "100px",
 			sortProperty: "ondispute",
 			filterProperty: "ondispute",
 			flexible: true
 				//autoResizable: true,
 				//width : 'auto'
 		}));

 		oCDASHM1TableEstimatesPending.addColumn(new sap.ui.table.Column({
 			label: new sap.ui.commons.Label({
 				text: "Joint Survey requested"
 			}).addStyleClass("wraptextcol"),
 			template: new sap.ui.commons.TextView({

 			}).bindProperty("text", "onjsrequest"),
 			resizable: false,
 			width: "100px",
 			sortProperty: "onjsrequest",
 			filterProperty: "onjsrequest",
 			flexible: true
 				//autoResizable: true,
 				//width : 'auto'
 		}));

 		oCDASHM1TableEstimatesPending.addColumn(new sap.ui.table.Column({
 			label: new sap.ui.commons.Label({
 				text: "Customer No."
 			}).addStyleClass("wraptextcol"),
 			template: new sap.ui.commons.TextView({

 			}).bindProperty("text", "customercode"),
 			resizable: false,
 			width: "100px",
 			sortProperty: "customercode",
 			filterProperty: "customercode",
 			flexible: true,
 			//autoResizable: true,
 			//width : 'auto'
 		}));

 		oCDASHM1TableEstimatesPending.addColumn(new sap.ui.table.Column({
 			label: new sap.ui.commons.Label({
 				text: "Customer Name"
 			}).addStyleClass("wraptextcol"),
 			template: new sap.ui.commons.TextView({

 			}).bindProperty("text", "customername"),
 			resizable: false,
 			width: "250px",
 			sortProperty: "customername",
 			filterProperty: "customername",
 			flexible: true,
 			//autoResizable: true,
 			//width : 'auto'
 		}));

 		/*	oCDASHM1TableEstimatesPending.addColumn(new sap.ui.table.Column({
				   		 label: new sap.ui.commons.Label({text: "Estimate #"}).addStyleClass("wraptextcol"),
						 template: new sap.ui.commons.TextView({

						 }).bindProperty("text", "estimateno"),
				           resizable:false,
				           width:"120px",
				           sortProperty: "estimateno",
				           filterProperty : "estimateno",
				           flexible: true,
				           //autoResizable: true,
				           //width : 'auto'
						 }));*/

 		oCDASHM1TableEstimatesPending.addColumn(new sap.ui.table.Column({
 			label: new sap.ui.commons.Label({
 				text: "Estimate Type"
 			}).addStyleClass("wraptextcol"),
 			template: new sap.ui.commons.TextView({

 			}).bindProperty("text", "estimatetext"),
 			resizable: false,
 			width: "120px",
 			sortProperty: "estimatetext",
 			filterProperty: "estimatetext",
 			flexible: true,
 			//autoResizable: true,
 			//width : 'auto'
 		}));

 		oCDASHM1TableEstimatesPending.addColumn(new sap.ui.table.Column({
 			label: new sap.ui.commons.Label({
 				text: "Lessee Cost"
 			}).addStyleClass("wraptextcol"),
 			template: new sap.ui.commons.TextView({
 				textAlign: sap.ui.core.TextAlign.Right
 			}).bindProperty("text", "usercost"),
 			resizable: false,
 			width: "110px",
 			sortProperty: "usercost",
 			filterProperty: "usercost",
 			flexible: true,
 			//autoResizable: true,
 			//width : 'auto'
 		}));

 		oCDASHM1TableEstimatesPending.addColumn(new sap.ui.table.Column({
 			label: new sap.ui.commons.Label({
 				text: "Curr."
 			}).addStyleClass("wraptextcol"),
 			template: new sap.ui.commons.TextView({

 			}).bindProperty("text", "costcurrency"),
 			resizable: false,
 			width: "60px",
 			sortProperty: "costcurrency",
 			filterProperty: "costcurrency",
 			flexible: true,
 			//autoResizable: true,
 			//width : 'auto'
 		}));

 		oCDASHM1TableEstimatesPending.addColumn(new sap.ui.table.Column({
 			label: new sap.ui.commons.Label({
 				text: "Off Hire Location"
 			}).addStyleClass("wraptextcol"),
 			template: new sap.ui.commons.TextView({

 			}).bindProperty("text", "offhirelocation"),
 			resizable: false,
 			width: "120px",
 			sortProperty: "offhirelocation",
 			filterProperty: "offhirelocation",
 			flexible: true,
 			//autoResizable: true,
 			//width : 'auto'
 		}));

 		oCDASHM1TableEstimatesPending.addColumn(new sap.ui.table.Column({
 			label: new sap.ui.commons.Label({
 				text: "Estimate Date"
 			}).addStyleClass("wraptextcol"),
 			template: new sap.ui.commons.TextView({

 			}).bindProperty("text", "datesubmitted"),
 			resizable: false,
 			width: "110px",
 			flexible: true,
 			sortProperty: "sortsubmitdate",
 			filterProperty: "datesubmitted",
 			//autoResizable: true,
 			//width : 'auto'
 		}));

 		oCDASHM1TableEstimatesPending.addColumn(new sap.ui.table.Column({
 			label: new sap.ui.commons.Label({
 				text: "Days Pending \nApproval"
 			}).addStyleClass("wraptextcol"),
 			template: new sap.ui.commons.TextView({
 				textAlign: "Right"
 			}).bindProperty("text", "dayspending", function (cellValue) {
 				/*if(cellValue > 7 && globalSaleRed){
        					 this.addStyleClass("salered");
        				 }else{
        					 this.removeStyleClass("salered");
        				 }*/
 				if (this.getParent().getBindingContext() != undefined) {
 					if (this.getParent().getBindingContext().count == undefined) {
 						var statusdayshighlight = this.getParent().getBindingContext().getProperty("statusdayshighlight");
 						if (statusdayshighlight == "X") {
 							this.addStyleClass("salered");
 						} else {
 							this.removeStyleClass("salered");
 						}
 					}
 				}
 				return cellValue;
 			}),
 			resizable: false,
 			width: "120px",
 			sortProperty: "dayspending",
 			filterProperty: "dayspending",
 			flexible: true,
 			//autoResizable: true,
 			//width : 'auto'
 		}));

 		oCDASHM1TableEstimatesPending.addColumn(new sap.ui.table.Column({
 			label: new sap.ui.commons.Label({
 				text: "Depot"
 			}).addStyleClass("wraptextcol"),
 			template: new sap.ui.commons.TextView({

 			}).bindProperty("text", "depotcode"),
 			resizable: false,
 			width: "70px",
 			sortProperty: "depotcode",
 			filterProperty: "depotcode",
 			flexible: true,
 			//autoResizable: true,
 			//width : 'auto'
 		}));

 		oCDASHM1TableEstimatesPending.addColumn(new sap.ui.table.Column({
 			label: new sap.ui.commons.Label({
 				text: "Depot Name"
 			}).addStyleClass("wraptextcol"),
 			template: new sap.ui.commons.TextView({

 			}).bindProperty("text", "depotname"),
 			resizable: false,
 			width: "250px",
 			sortProperty: "depotname",
 			filterProperty: "depotname",
 			flexible: true,
 			//autoResizable: true,
 			//width : 'auto'
 		}));

 		oCDASHM1TableEstimatesPending.addColumn(new sap.ui.table.Column({
 			label: new sap.ui.commons.Label({
 				text: "Unit Type"
 			}).addStyleClass("wraptextcol"),
 			template: new sap.ui.commons.TextView({

 			}).bindProperty("text", "material"),
 			resizable: false,
 			width: "100px",
 			sortProperty: "material",
 			filterProperty: "material",
 			flexible: true,
 			//autoResizable: true,
 			//width : 'auto'
 		}));

 		oCDASHM1TableEstimatesPending.addColumn(new sap.ui.table.Column({
 			label: new sap.ui.commons.Label({
 				text: "Description"
 			}).addStyleClass("wraptextcol"),
 			template: new sap.ui.commons.TextView({

 			}).bindProperty("text", "materialcode"),
 			resizable: false,
 			width: "200px",
 			sortProperty: "materialcode",
 			filterProperty: "materialcode",
 			flexible: true,
 			//autoResizable: true,
 			//width : 'auto'
 		}));

 		/*oCDASHM1TableEstimatesPending.addColumn(new sap.ui.table.Column({
				   		 label: new sap.ui.commons.Label({text: "Unit Status"}).addStyleClass("wraptextcol"),
						 template: new sap.ui.commons.TextView({

						 }).bindProperty("text", "status"),
				           resizable:false,
				           width:"250px",
				           sortProperty: "status",
				           filterProperty : "status",
				           flexible: true,
				           //autoResizable: true,
				           //width : 'auto'
						 }));*/

 		oCDASHM1TableEstimatesPending.addColumn(new sap.ui.table.Column({
 			label: new sap.ui.commons.Label({
 				text: " "
 			}).addStyleClass("wraptextcol"),
 			template: new sap.ui.core.Icon({
 				src: sap.ui.core.IconPool.getIconURI("address-book"),
 				size: "20px",
 				color: "black",
 				//	           activeColor : "red",
 				//	           activeBackgroundColor : "white",
 				//	           hoverColor : "green",
 				//	           hoverBackgroundColor : "white",
 				width: "20px",
 				visible: "{contactVisible}",
 				press: function (oEvent) {
 					//var oCDASHM1 = new cdashm1();
 					busyDialog.open();
 					var depotcode = oEvent.getSource().getBindingContext().getProperty("depotcode");
 					oCurrent.openDepotContact(oEvent, depotcode);
 					busyDialog.close();
 				}
 			}),
 			resizable: false,
 			width: "80px"
 		}));

 		/*oCDASHM1TableEstimatesPending.addColumn(new sap.ui.table.Column({
				   		 label: new sap.ui.commons.Label({text: "Last Action"}).addStyleClass("wraptextcol"),
						 template: new sap.ui.commons.TextView({

						 }).bindProperty("text", "lastaction"),
				           resizable:false,
				           width:"280px",
				           flexible: true,
				           //autoResizable: true,
				           //width : 'auto'
						 })); */

 		/* CDASHM1 - Button - Setup Alert */

 		var oCDASHM1ButtonStatusMonitorAlert = new sap.ui.commons.Button("idCDASHM1ButtonStatusMonitorAlert", {
 			text: "Setup Alert",
 			//icon: sap.ui.core.IconPool.getIconURI("synchronize"),
 			press: function (oEvent) {
 				oCurrent.setCDASHM1AlertContent(oEvent.getSource());
 			}
 		}).addStyleClass("normalBtn marginTop10 floatRight");

 		/* CDASHM1 - Button - Excel Download */

 		var oCDASHM1ButtonStatusMonitorExport = new sap.ui.commons.Button("idCDASHM1ButtonStatusMonitorExport", {
 			text: "",
 			icon: sap.ui.core.IconPool.getIconURI("excel-attachment"),
 			press: function () {
 				var oUtility = new utility();
 				var excelCDASHMJsonEstimatesPending = [];
 				var filteredIndices = sap.ui.getCore().byId("idCDASHM1TableEstimatesPending").getBinding("rows").aIndices;
 				for (var i = 0; i < oCDASHMJsonEstimatesPending.length; i++) {
 					if (filteredIndices.indexOf(i) != -1) {
 						excelCDASHMJsonEstimatesPending.push({
 							"Serial No.": oCDASHMJsonEstimatesPending[i].serialno,
 							"Customer No.": oCDASHMJsonEstimatesPending[i].customercode,
 							"Customer Name": oCDASHMJsonEstimatesPending[i].customername,
 							//"Approval Reference" : oCDASHMJsonEstimatesPending[i].approvalref,
 							//"Approval Date" : oCDASHMJsonEstimatesPending[i].approveddate,
 							"Estimate Type": oCDASHMJsonEstimatesPending[i].estimatetext,
 							"Lessee Cost": oCDASHMJsonEstimatesPending[i].usercost,
 							"Curr.": oCDASHMJsonEstimatesPending[i].costcurrency,
 							"Off Hire Location": oCDASHMJsonEstimatesPending[i].offhirelocation,
 							"Estimate Date": oCDASHMJsonEstimatesPending[i].datesubmitted,
 							"Days Pending Approval": oCDASHMJsonEstimatesPending[i].dayspending,
 							"Depot": oCDASHMJsonEstimatesPending[i].depotcode,
 							"Depot Name": oCDASHMJsonEstimatesPending[i].depotname,
 							"Unit Type": oCDASHMJsonEstimatesPending[i].material,
 							"Description": oCDASHMJsonEstimatesPending[i].materialcode
 						});
 					}
 				}
 				oUtility.makeHTMLTable(excelCDASHMJsonEstimatesPending, "Units Awaiting Approval", "export", "inventory_list");
 			}
 		}).addStyleClass("normalBtn marginTop10 floatRight");

 		/* CDASHM1 - Flex - Buttons */

 		var oCDASHM1FlexButtonsEstimatesPending = new sap.m.FlexBox({
 			items: [oCDASHM1ButtonApprove,
 				oCDASHM1ButtonDispute,
 				oCDASHM1ButtonJS,
 				oCDASHM1ButtonDownload,
 				oCDASHM1ButtonStatusMonitorAlert
 			],
 			direction: "Row"
 		});

 		/* CDASHM1 - Flex - Estimates Pending */

 		var oCDASHM1FlexEstimatesPending = new sap.m.FlexBox({
 			items: [new sap.m.FlexBox({
 					items: [oCDASHM1FlexButtonsEstimatesPending,
 						oCDASHM1ButtonStatusMonitorExport,
 						new sap.ui.commons.Label("idCDASHM1PageUnitSearchResult", {
 							text: "Total Estimate(s) Awaiting Approval : ",
 							width: "280px"
 						}).addStyleClass("unitSearchResult"),
 						new sap.ui.commons.Label("idCDASHM1PageUnitSearchResultNum", {
 							text: "0",
 							width: "40px"
 						}).addStyleClass("unitSearchResultRed"),
 						new sap.ui.commons.Label("idCDASHM1PageLabelSimulateCustomer", {
 							text: " || Simulate Customer : "
 						}).addStyleClass("unitSearchResult"),
 						new sap.m.Input("idCDASHM1PageInputCustomerID", {
 							value: ""
 						}).addStyleClass("cdashmSimulateCustomerInput").addEventDelegate({
 							onsapfocusleave: function (oEvent) {
 								globalCDASHM1CustomerID = oEvent.srcControl.getProperty("value");
 								oCurrent.setValueCustDash();
 							}
 						})
 					],
 					//justifyContent : sap.m.FlexJustifyContent.SpaceBetween,
 					direction: "Row"
 				}),
 				new sap.m.Label(),
 				oCDASHM1TableEstimatesPending
 			],
 			direction: "Column"
 		});

 		/* CDASHM1 - Create Icon Tab Bar */

 		var oCDASHM1IconTabBar = new sap.m.IconTabBar("idCDASHM1IconTabBar", {
 			select: function (oEvent) {
 				//var processkey = oEvent.getParameter("key");
 				//oCurrent.setCDASHM1TableValue(processkey);
 			},
 			items: [
 				new sap.m.IconTabFilter({
 					width: "200px",
 					text: "Pending Approval",
 					key: "PENDING",
 					iconColor: "Negative",
 					icon: "sap-icon://pending",
 					content: [oCDASHM1FlexEstimatesPending]
 				}),
 				new sap.m.IconTabSeparator({}),
 				new sap.m.IconTabFilter({
 					width: "200px",
 					text: "Estimates Approved",
 					key: "APPROVED",
 					iconColor: "Positive",
 					icon: "sap-icon://approvals",
 					content: [oCDASHM1FlexEstimatesApproved]
 				})
 			]
 		}).addStyleClass("CDASHM1ITB");

 		oCurrent.setValueCustDash();

 		return oCDASHM1IconTabBar;

 	},

 	/* CDASHM1 - Set Value Estimates Pending */

 	setValueCustDash: function () {

 		// localUserID = "";

 		if (globalCDASHM1CustomerID && globalCDASHM1CustomerIDTemp != globalCDASHM1CustomerID) {
 			globalCDASHM1CustomerIDTemp = globalCDASHM1CustomerID;
 		} else {
 			globalCDASHM1CustomerIDTemp = sessionStorage.uName.toUpperCase();
 		}
 		var urlToSap = "custestimatesSet?$filter=IvCustUserId eq '" + globalCDASHM1CustomerIDTemp + "'";

 		urlToSap = serviceDEP + urlToSap;

 		oModel = new sap.ui.model.odata.ODataModel(serviceDEP, true);
 		busyDialog.open();
 		console.log(urlToSap);
 		OData.request({
 				requestUri: urlToSap,
 				method: "GET",
 				dataType: 'json',
 				async: false,
 				headers: {
 					"X-Requested-With": "XMLHttpRequest",
 					"Content-Type": "application/json; charset=utf-8",
 					"DataServiceVersion": "2.0",
 					"X-CSRF-Token": "Fetch"
 				}
 			},
 			function (data, response) {

 				var oCDASHM1JsonLocalCustDash = data.results;

 				oCDASHMJsonEstimatesPending = [];
 				oCDASHMJsonEstimatesApproved = [];
 				var sortsubmitdate = "";
 				var sortapproveddate = "";
 				if (oCDASHM1JsonLocalCustDash.length == 0) {
 					console.log("Get Estimates; but returned nothing");
 				} else {
 					console.log("Get Estimates success");

 					for (var i = 0; i < oCDASHM1JsonLocalCustDash.length; i++) {
 						sortsubmitdate = oCDASHM1JsonLocalCustDash[i].SubmitDate;
 						if (sortsubmitdate != "")
 							sortsubmitdate = sortsubmitdate.substr(7, 4) +
 							padZero(m_names.indexOf(sortsubmitdate.substr(3, 3)) + 1, 2) +
 							sortsubmitdate.substr(0, 2);
 						if (oCDASHM1JsonLocalCustDash[i].Type == "P") {
 							oCDASHMJsonEstimatesPending.push({
 								estimateno: oCDASHM1JsonLocalCustDash[i].Estimate,
 								estimatetype: oCDASHM1JsonLocalCustDash[i].EstimateType,
 								estimatetext: oCDASHM1JsonLocalCustDash[i].EstimateText,
 								dayspending: parseInt(oCDASHM1JsonLocalCustDash[i].DaysPending),
 								statusdayshighlight: oCDASHM1JsonLocalCustDash[i].DaysColour,
 								approvalref: oCDASHM1JsonLocalCustDash[i].ApprovalRef,
 								approveddate: oCDASHM1JsonLocalCustDash[i].ApprovedDate,
 								depotcode: oCDASHM1JsonLocalCustDash[i].Depot,
 								depotname: oCDASHM1JsonLocalCustDash[i].DepotName,
 								customercode: oCDASHM1JsonLocalCustDash[i].Customer,
 								isPicExist: (oCDASHM1JsonLocalCustDash[i].Picexist == "X") ? true : false,
 								customername: oCDASHM1JsonLocalCustDash[i].CustomerName,
 								serialno: oCDASHM1JsonLocalCustDash[i].Serial,
 								equnr: oCDASHM1JsonLocalCustDash[i].Equipment,
 								material: oCDASHM1JsonLocalCustDash[i].Material,
 								materialcode: oCDASHM1JsonLocalCustDash[i].MaterialDesc,
 								usercost: thousandsep(oCDASHM1JsonLocalCustDash[i].UserCost),
 								costcurrency: oCDASHM1JsonLocalCustDash[i].Currency,
 								offhirelocation: oCDASHM1JsonLocalCustDash[i].OffhireLoc,
 								datesubmitted: oCDASHM1JsonLocalCustDash[i].SubmitDate,
 								sortsubmitdate: sortsubmitdate,
 								lastaction: oCDASHM1JsonLocalCustDash[i].LastAction,
 								offhirelocation: oCDASHM1JsonLocalCustDash[i].CityDesc,
 								status: oCDASHM1JsonLocalCustDash[i].Status,

 								ondispute: (oCDASHM1JsonLocalCustDash[i].Dispute == "X") ? "Yes" : "No",
 								onjsrequest: (oCDASHM1JsonLocalCustDash[i].Jsr == "X") ? "Yes" : "No"
 							});
 						} else {
 							sortapproveddate = oCDASHM1JsonLocalCustDash[i].ApprovedDate;
 							if (sortapproveddate != "")
 								sortapproveddate = sortapproveddate.substr(7, 4) +
 								padZero(m_names.indexOf(sortapproveddate.substr(3, 3)) + 1, 2) +
 								sortapproveddate.substr(0, 2);
 							oCDASHMJsonEstimatesApproved.push({
 								estimateno: oCDASHM1JsonLocalCustDash[i].Estimate,
 								estimatetype: oCDASHM1JsonLocalCustDash[i].EstimateType,
 								estimatetext: oCDASHM1JsonLocalCustDash[i].EstimateText,
 								dayspending: parseInt(oCDASHM1JsonLocalCustDash[i].DaysPending),
 								approvalref: oCDASHM1JsonLocalCustDash[i].ApprovalRef,
 								approveddate: oCDASHM1JsonLocalCustDash[i].ApprovedDate,
 								sortapproveddate: sortapproveddate,
 								depotcode: oCDASHM1JsonLocalCustDash[i].Depot,
 								depotname: oCDASHM1JsonLocalCustDash[i].DepotName,
 								customercode: oCDASHM1JsonLocalCustDash[i].Customer,
 								isPicExist: (oCDASHM1JsonLocalCustDash[i].Picexist == "X") ? true : false,
 								customername: oCDASHM1JsonLocalCustDash[i].CustomerName,
 								serialno: oCDASHM1JsonLocalCustDash[i].Serial,
 								equnr: oCDASHM1JsonLocalCustDash[i].Equipment,
 								material: oCDASHM1JsonLocalCustDash[i].Material,
 								materialcode: oCDASHM1JsonLocalCustDash[i].MaterialDesc,
 								usercost: thousandsep(oCDASHM1JsonLocalCustDash[i].UserCost),
 								costcurrency: oCDASHM1JsonLocalCustDash[i].Currency,
 								offhirelocation: oCDASHM1JsonLocalCustDash[i].OffhireLoc,
 								datesubmitted: oCDASHM1JsonLocalCustDash[i].SubmitDate,
 								sortsubmitdate: sortsubmitdate,
 								lastaction: oCDASHM1JsonLocalCustDash[i].LastAction,
 								offhirelocation: oCDASHM1JsonLocalCustDash[i].CityDesc,
 								status: oCDASHM1JsonLocalCustDash[i].Status
 							});

 						}
 					}
 					sap.ui.getCore().byId("idCDASHM1PageUnitSearchResultNum").setText(oCDASHMJsonEstimatesPending.length);

 					/* Pending Section */
 					var oCDASHM1ModelEstimatesPending = new sap.ui.model.json.JSONModel();
 					oCDASHM1ModelEstimatesPending.setData({
 						modelData: oCDASHMJsonEstimatesPending
 					});

 					var oCDASHM1TableEstimatesPending = sap.ui.getCore().byId("idCDASHM1TableEstimatesPending");
 					oCDASHM1TableEstimatesPending.setModel(oCDASHM1ModelEstimatesPending);
 					oCDASHM1TableEstimatesPending.setVisibleRowCount(oCDASHMJsonEstimatesPending.length);
 					if (oCDASHMJsonEstimatesApproved.length < 18) {
 						oCDASHM1TableEstimatesPending.setVisibleRowCount(oCDASHMJsonEstimatesPending.length);
 					} else {
 						oCDASHM1TableEstimatesPending.setVisibleRowCount(18);
 					}
 					oCDASHM1TableEstimatesPending.bindRows("/modelData");

 					/*Approved Section */
 					var oCDASHM1ModelEstimatesApproved = new sap.ui.model.json.JSONModel();
 					oCDASHM1ModelEstimatesApproved.setData({
 						modelData: oCDASHMJsonEstimatesApproved
 					});

 					var oCDASHM1TableEstimatesApproved = sap.ui.getCore().byId("idCDASHM1TableEstimatesApproved");
 					oCDASHM1TableEstimatesApproved.setModel(oCDASHM1ModelEstimatesApproved);
 					oCDASHM1TableEstimatesApproved.setVisibleRowCount(oCDASHMJsonEstimatesApproved.length);

 					if (oCDASHMJsonEstimatesApproved.length < 18) {
 						oCDASHM1TableEstimatesApproved.setVisibleRowCount(oCDASHMJsonEstimatesApproved.length);
 					} else {
 						oCDASHM1TableEstimatesApproved.setVisibleRowCount(18);
 					}
 					oCDASHM1TableEstimatesApproved.bindRows("/modelData");

 				}
 				busyDialog.close();
 			},
 			function (error) {
 				console.log("Get Estimates Failed");
 				busyDialog.close();
 			});

 	},

 	/* CDASHM1 - Set Content (Estimates Pending or Estimates Approved */

 	setCDASHM1TableValue: function (processkey) {

 		if (processkey == "APPROVED") {

 			/* CDASHM1 - Set Value Estimates Approved */

 			var oCDASHM1ModelEstimatesApproved = new sap.ui.model.json.JSONModel();
 			oCDASHM1ModelEstimatesApproved.setData({
 				modelData: oCDASHMJsonEstimatesApproved
 			});

 			var oCDASHM1TableEstimatesApproved = sap.ui.getCore().byId("idCDASHM1TableEstimatesApproved");
 			oCDASHM1TableEstimatesApproved.setModel(oCDASHM1ModelEstimatesApproved);
 			oCDASHM1TableEstimatesApproved.setVisibleRowCount(oCDASHMJsonEstimatesApproved.length);
 			oCDASHM1TableEstimatesApproved.bindRows("/modelData");
 		} else if (processkey == "PENDING") {

 			/* CDASHM1 - Set Value Estimates Pending */

 			var oCDASHM1ModelEstimatesPending = new sap.ui.model.json.JSONModel();
 			oCDASHM1ModelEstimatesPending.setData({
 				modelData: oCDASHMJsonEstimatesPending
 			});

 			var oCDASHM1TableEstimatesPending = sap.ui.getCore().byId("idCDASHM1TableEstimatesPending");
 			oCDASHM1TableEstimatesPending.setModel(oCDASHM1ModelEstimatesPending);
 			oCDASHM1TableEstimatesPending.setVisibleRowCount(oCDASHMJsonEstimatesPending.length);
 			oCDASHM1TableEstimatesPending.bindRows("/modelData");
 		}
 	},

 	/* CDASHM1 - Function : Approve Popup */

 	createCSApprove: function (approveBtn) {
 		var oCurrent = this;
 		var oCDASHM1ContentCSApprove = oCurrent.setCSApproveInitial(1);
 		oCurrent.openCSApprove(oCDASHM1ContentCSApprove, 1);
 	},

 	/* CDASHM1 - Function : Dispute Popup */

 	createCSDispute: function (approveBtn, jsordispute) {
 		var oCurrent = this;
 		var oCDASHM1ContentCSDispute = oCurrent.setCSDisputeLines(approveBtn);
 		oCurrent.openCSDispute(oCDASHM1ContentCSDispute, jsordispute);
 	},

 	/* CDASHM1 - Function - Set CS Dispute Popup content */

 	setCSDisputeLines: function (approveBtn) {

 		busyDialog.open();

 		var arraySelLines = sap.ui.getCore().byId("idCDASHM1TableEstimatesPending").getSelectedIndices();
 		for (var i = 0; i < oCDASHMJsonEstimatesPending.length; i++) {
 			if (arraySelLines.indexOf(i) != -1) {
 				var oDetData = sap.ui.getCore().byId("idCDASHM1TableEstimatesPending").getContextByIndex(i);
 				if (oDetData != undefined) {
 					var realPath = oDetData.getPath().split('/')[2];

 					global3SerialNo = oCDASHMJsonEstimatesPending[realPath].serialno;
 					global3Equnr = oCDASHMJsonEstimatesPending[realPath].serialno;
 					global3Depot = oCDASHMJsonEstimatesPending[realPath].depotcode;
 					global3DepotName = oCDASHMJsonEstimatesPending[realPath].depotname;
 					global3EstimateNo = oCDASHMJsonEstimatesPending[realPath].estimateno;
 					global3UserCost = oCDASHMJsonEstimatesPending[realPath].usercost;
 					globalApprAllowed = false;
 					global3EstimateText = oCDASHMJsonEstimatesPending[realPath].estimatetext;
 					global3Customer = oCDASHMJsonEstimatesPending[realPath].customercode;
 					global3CustomerName = oCDASHMJsonEstimatesPending[realPath].customername;

 				}
 			}
 		}

 		/* CDASHM2 - Value - Estimate Lines */
 		var oCDASHM2 = new CDASHM2();
 		oCDASHM2.setValueEstimateLines(false, false); // first false means this is not from serial istory popup
 		// second false means this is not a process change

 		var oCurrent = this;
 		var oContentDisputePopoverContent = oCurrent.setCSDisputeLinesTable();
 		return oContentDisputePopoverContent;

 	},

 	setCSDisputeLinesTable: function () {

 		/* CDASHM1DISPUTE - Table - Estimate Lines */

 		if (sap.ui.getCore().byId("idCDASHM1DISPUTETableEstimateLinesUI") != undefined)
 			sap.ui.getCore().byId("idCDASHM1DISPUTETableEstimateLinesUI").destroy();

 		var oCDASHM1DISPUTETableEstimateLinesUI = new sap.ui.table.Table("idCDASHM1DISPUTETableEstimateLinesUI", {
 			visibleRowCount: 6,
 			selectionMode: sap.ui.table.SelectionMode.MultiToggle,
 			toolbar: new sap.ui.commons.Toolbar({
 				items: [
 					new sap.ui.commons.Label({
 						text: "Please select disputed repair item(s)"
 					}).addStyleClass("wraptextcol"),
 					//new sap.ui.commons.ToolbarSeparator(),
 					new sap.ui.commons.Button({
 						text: "Toggle ISO Description",
 						styled: false,
 						press: function () {

 							if (globalIsLineCodeDesc == "CODE") {
 								globalIsLineCodeDesc = "DESC";
 								for (var i = 0; i < oCDASHM1DISPUTEJsonEstimateLines.length; i++) {
 									oCDASHM1DISPUTEJsonEstimateLines[i].locationdisp = oCDASHM1DISPUTEJsonEstimateLines[i].locationt;
 									oCDASHM1DISPUTEJsonEstimateLines[i].componentdisp = oCDASHM1DISPUTEJsonEstimateLines[i].componentt;
 									oCDASHM1DISPUTEJsonEstimateLines[i].damagedisp = oCDASHM1DISPUTEJsonEstimateLines[i].damaget;
 									oCDASHM1DISPUTEJsonEstimateLines[i].materialdisp = oCDASHM1DISPUTEJsonEstimateLines[i].materialt;
 									oCDASHM1DISPUTEJsonEstimateLines[i].repairdisp = oCDASHM1DISPUTEJsonEstimateLines[i].repairt;
 								}
 							} else if (globalIsLineCodeDesc == "DESC") {
 								globalIsLineCodeDesc = "CODE";
 								for (var i = 0; i < oCDASHM1DISPUTEJsonEstimateLines.length; i++) {
 									oCDASHM1DISPUTEJsonEstimateLines[i].locationdisp = oCDASHM1DISPUTEJsonEstimateLines[i].location;
 									oCDASHM1DISPUTEJsonEstimateLines[i].componentdisp = oCDASHM1DISPUTEJsonEstimateLines[i].component;
 									oCDASHM1DISPUTEJsonEstimateLines[i].damagedisp = oCDASHM1DISPUTEJsonEstimateLines[i].damage;
 									oCDASHM1DISPUTEJsonEstimateLines[i].materialdisp = oCDASHM1DISPUTEJsonEstimateLines[i].material;
 									oCDASHM1DISPUTEJsonEstimateLines[i].repairdisp = oCDASHM1DISPUTEJsonEstimateLines[i].repair;
 								}
 							}
 							sap.ui.getCore().byId("idCDASHM1DISPUTETableEstimateLinesUI").getModel().updateBindings();
 						}
 					})
 				]
 			}),
 			//			 footer: new sap.ui.commons.Label({
 			//		         text:"123"
 			//		       }),
 			//            visibleRowCountMode : sap.ui.table.VisibleRowCountMode.Interactive,
 		}).addStyleClass("sapUiSizeCompact tblBorder");

 		oCDASHM1DISPUTETableEstimateLinesUI.addColumn(new sap.ui.table.Column({
 			label: new sap.ui.commons.Label({
 				text: "Line",
 				textAlign: "Left"
 			}).addStyleClass("wraptextcol"),
 			template: new sap.ui.commons.TextView({}).bindProperty("text", "sno").addStyleClass("borderStyle1"),
 			resizable: false,
 			width: "50px",
 			// sortProperty: "sno",
 			// filterProperty : "sno",
 		}));

 		oCDASHM1DISPUTETableEstimateLinesUI.addColumn(new sap.ui.table.Column({
 			label: new sap.ui.commons.Label({
 				text: "Component",
 				textAlign: "Left"
 			}).addStyleClass("wraptextcol"),
 			template: new sap.ui.commons.TextView("CMP", {}).bindProperty("text", "componentdisp"
 				// 	,function(cellValue){
 				//  if(this.getParent().getBindingContext() != undefined){
 				//  var componentc = this.getParent().getBindingContext().getProperty("componentc");
 				//  if(componentc == "X"){
 				// 	 this.addStyleClass("jsChange");
 				//  }else{
 				// 	 this.removeStyleClass("jsChange");
 				//  }
 				// 	 }
 				//  return cellValue;
 				// }
 			).addStyleClass("borderStyle1"),
 			resizable: false,
 			width: "200px",
 			// sortProperty: "componentdisp",
 			// filterProperty : "componentdisp",
 		}));

 		oCDASHM1DISPUTETableEstimateLinesUI.addColumn(new sap.ui.table.Column({
 			label: new sap.ui.commons.Label({
 				text: "Damage",
 				textAlign: "Left"
 			}).addStyleClass("wraptextcol"),
 			template: new sap.ui.commons.TextView("DMG", {}).bindProperty("text", "damagedisp"
 				// , function(cellValue){
 				//  if(this.getParent().getBindingContext() != undefined){
 				//  var damagec = this.getParent().getBindingContext().getProperty("damagec");
 				//  if(damagec == "X"){
 				// 	 this.addStyleClass("jsChange");
 				//  }else{
 				// 	 this.removeStyleClass("jsChange");
 				//  }
 				// 	 }
 				//  return cellValue;
 				// }
 			).addStyleClass("borderStyle1"),
 			resizable: false,
 			width: "120px",
 			// sortProperty: "damagedisp",
 			// filterProperty : "damagedisp",
 		}));

 		oCDASHM1DISPUTETableEstimateLinesUI.addColumn(new sap.ui.table.Column({
 			label: new sap.ui.commons.Label({
 				text: "Repair",
 				textAlign: "Left"
 			}).addStyleClass("wraptextcol"),
 			template: new sap.ui.commons.TextView("REP", {}).bindProperty("text", "repairdisp"
 				// 	, function(cellValue){
 				//  if(this.getParent().getBindingContext() != undefined){
 				//  var repairc = this.getParent().getBindingContext().getProperty("repairc");
 				//  if(repairc == "X"){
 				// 	 this.addStyleClass("jsChange");
 				//  }else{
 				// 	 this.removeStyleClass("jsChange");
 				//  }
 				// 	 }
 				//  return cellValue;
 				// }
 			).addStyleClass("borderStyle1"),
 			resizable: false,
 			width: "120px",
 			// sortProperty: "repairdisp",
 			// filterProperty : "repairdisp",
 		}));

 		oCDASHM1DISPUTETableEstimateLinesUI.addColumn(new sap.ui.table.Column({
 			label: new sap.ui.commons.Label({
 				text: "Location",
 				textAlign: "Left"
 			}).addStyleClass("wraptextcol"),
 			template: new sap.ui.commons.TextView("LOC", {}).bindProperty("text", "locationdisp"
 				// , function(cellValue){
 				//  if(this.getParent().getBindingContext() != undefined){
 				//  var materialc = this.getParent().getBindingContext().getProperty("locationc");
 				//  if(materialc == "X"){
 				// 	 this.addStyleClass("jsChange");
 				//  }else{
 				// 	 this.removeStyleClass("jsChange");
 				//  }
 				//  }
 				//  return cellValue;
 				// }
 			).addStyleClass("borderStyle1"),
 			resizable: false,
 			width: "auto",
 			// sortProperty: "locationdisp",
 			// filterProperty : "locationdisp",
 		}));

 		oCDASHM1DISPUTETableEstimateLinesUI.addColumn(new sap.ui.table.Column({
 			label: new sap.ui.commons.Label({
 				text: "Material",
 				textAlign: "Left"
 			}).addStyleClass("wraptextcol"),
 			template: new sap.ui.commons.TextView("MATR", {}).bindProperty("text", "materialdisp"
 				// , function(cellValue){
 				//  if(this.getParent().getBindingContext() != undefined){
 				//  var materialc = this.getParent().getBindingContext().getProperty("materialc");
 				//  if(materialc == "X"){
 				// 	 this.addStyleClass("jsChange");
 				//  }else{
 				// 	 this.removeStyleClass("jsChange");
 				//  }
 				// 	 }
 				//  return cellValue;
 				// }
 			).addStyleClass("borderStyle1"),
 			resizable: false,
 			width: "150px",
 			// sortProperty: "materialdisp",
 			// filterProperty : "materialdisp",
 		}));

 		oCDASHM1DISPUTETableEstimateLinesUI.addColumn(new sap.ui.table.Column({
 			label: new sap.ui.commons.Label({
 				text: "Length"
 			}).addStyleClass("wraptextcol"),
 			template: new sap.ui.commons.TextView("LEN", {
 				textAlign: "Right"
 			}).bindProperty("text", "length"
 				// , function(cellValue){
 				//  if(this.getParent().getBindingContext() != undefined){
 				//  var materialc = this.getParent().getBindingContext().getProperty("lengthc");
 				//  if(materialc == "X"){
 				// 	 this.addStyleClass("jsChange");
 				//  }else{
 				// 	 this.removeStyleClass("jsChange");
 				//  }
 				// 	 }
 				//  return cellValue;
 				// }
 			).addStyleClass("borderStyle1"),
 			resizable: false,
 			width: "70px",
 			// sortProperty: "length",
 			// filterProperty : "length",
 		}));

 		oCDASHM1DISPUTETableEstimateLinesUI.addColumn(new sap.ui.table.Column({
 			label: new sap.ui.commons.Label({
 				text: "Width"
 			}).addStyleClass("wraptextcol"),
 			template: new sap.ui.commons.TextView("WID", {
 				textAlign: "Right"
 			}).bindProperty("text", "width"
 				// 	, function(cellValue){
 				//  if(this.getParent().getBindingContext() != undefined){
 				//  var materialc = this.getParent().getBindingContext().getProperty("widthc");
 				//  if(materialc == "X"){
 				// 	 this.addStyleClass("jsChange");
 				//  }else{
 				// 	 this.removeStyleClass("jsChange");
 				//  }
 				// 	 }
 				//  return cellValue;
 				// }
 			).addStyleClass("borderStyle1"),
 			resizable: false,
 			width: "70px",
 			// sortProperty: "width",
 			// filterProperty : "width",
 		}));

 		oCDASHM1DISPUTETableEstimateLinesUI.addColumn(new sap.ui.table.Column({
 			label: new sap.ui.commons.Label({
 				text: "Qty"
 			}).addStyleClass("wraptextcol"),
 			template: new sap.ui.commons.TextView("QTY", {
 				textAlign: "Right"
 			}).bindProperty("text", "qty"
 				// 		, function(cellValue){
 				//
 				//  if(this.getParent().getBindingContext() != undefined){
 				//  var qtyc = this.getParent().getBindingContext().getProperty("qtyc");
 				//  if(qtyc == "X"){
 				// 	 this.addStyleClass("jsChange");
 				//  }else{
 				// 	 this.removeStyleClass("jsChange");
 				//  }
 				// 	 }
 				//  return cellValue;
 				// }
 			).addStyleClass("borderStyle1"),
 			resizable: false,
 			width: "50px",
 			//width:"75px",
 			// sortProperty: "qty",
 			// filterProperty : "qty",
 		}));

 		oCDASHM1DISPUTETableEstimateLinesUI.addColumn(new sap.ui.table.Column({
 			label: new sap.ui.commons.Label({
 				text: "Hrs"
 			}).addStyleClass("wraptextcol"),
 			template: new sap.ui.commons.TextView("HRS", {
 				textAlign: "Right"
 			}).bindProperty("text", "hrs", function (cellValue) {

 				if (this.getParent().getBindingContext() != undefined) {
 					// var hrsc = this.getParent().getBindingContext().getProperty("hrsc");
 					// if(hrsc == "X"){
 					//  this.addStyleClass("jsChange");
 					// }else{
 					//  this.removeStyleClass("jsChange");
 					// }

 					var component = this.getParent().getBindingContext().getProperty("component");
 					if (component == "") {
 						this.addStyleClass('boldText');
 					} else {
 						this.removeStyleClass('boldText');
 					}
 				}
 				return cellValue;
 			}).addStyleClass("borderStyle1"),
 			resizable: false,
 			width: "90px",
 			//width:"75px",
 			//sortProperty: "hrs",
 			//filterProperty : "hrs",
 		}));

 		oCDASHM1DISPUTETableEstimateLinesUI.addColumn(new sap.ui.table.Column({
 			label: new sap.ui.commons.Label({
 				text: "Lab Cost"
 			}).addStyleClass("wraptextcol"),
 			template: new sap.ui.commons.TextView("LABC", {
 				textAlign: "Right"
 			}).bindProperty("text", "labcost", function (cellValue) {

 				if (this.getParent().getBindingContext() != undefined) {
 					// var labcostc = this.getParent().getBindingContext().getProperty("labcostc");
 					// if(labcostc == "X"){
 					//  this.addStyleClass("jsChange");
 					// }else{
 					//  this.removeStyleClass("jsChange");
 					// }

 					var component = this.getParent().getBindingContext().getProperty("component");
 					if (component == "") {
 						this.addStyleClass('boldText');
 					} else {
 						this.removeStyleClass('boldText');
 					}
 				}
 				return cellValue;
 			}).addStyleClass("borderStyle1"),
 			resizable: false,
 			width: "90px",
 			//sortProperty: "labcost",
 			//filterProperty : "labcost",
 		}));

 		oCDASHM1DISPUTETableEstimateLinesUI.addColumn(new sap.ui.table.Column({
 			label: new sap.ui.commons.Label({
 				text: "Mat Cost"
 			}).addStyleClass("wraptextcol"),
 			template: new sap.ui.commons.TextView("MATC", {
 				textAlign: "Right"
 			}).bindProperty("text", "matcost", function (cellValue) {

 				if (this.getParent().getBindingContext() != undefined) {
 					// var matcostc = this.getParent().getBindingContext().getProperty("matcostc");
 					// if(matcostc == "X"){
 					//  this.addStyleClass("jsChange");
 					// }else{
 					//  this.removeStyleClass("jsChange");
 					// }

 					var component = this.getParent().getBindingContext().getProperty("component");
 					if (component == "") {
 						this.addStyleClass('boldText');
 					} else {
 						this.removeStyleClass('boldText');
 					}
 				}

 				return cellValue;
 			}).addStyleClass("borderStyle1"),
 			resizable: false,
 			width: "90px",
 			//sortProperty: "matcost",
 			//filterProperty : "matcost",
 		}));

 		oCDASHM1DISPUTETableEstimateLinesUI.addColumn(new sap.ui.table.Column({
 			label: new sap.ui.commons.Label({
 				text: "Total"
 			}).addStyleClass("wraptextcol"),
 			template: new sap.ui.commons.TextView("TOT", {
 				textAlign: "Right"
 			}).bindProperty("text", "total", function (cellValue) {

 				if (this.getParent().getBindingContext() != undefined) {
 					// var totalc = this.getParent().getBindingContext().getProperty("totalc");
 					// if(totalc == "X"){
 					//  this.addStyleClass("jsChange");
 					// }else{
 					//  this.removeStyleClass("jsChange");
 					// }

 					var component = this.getParent().getBindingContext().getProperty("component");
 					if (component == "") {
 						this.addStyleClass('boldText');
 					} else {
 						this.removeStyleClass('boldText');
 					}

 				}

 				return cellValue;
 			}).addStyleClass("borderStyle1"),
 			resizable: false,
 			width: "90px",
 			//sortProperty: "total",
 			//filterProperty : "total",
 		}));

 		oCDASHM1DISPUTETableEstimateLinesUI.addColumn(new sap.ui.table.Column({
 			label: new sap.ui.commons.Label({
 				text: "Resp",
 				textAlign: "Left"
 			}).addStyleClass("wraptextcol"),
 			template: new sap.ui.commons.TextView("RES", {}).bindProperty("text", "resp"
 				// , function(cellValue){
 				//  if(this.getParent().getBindingContext() != undefined){
 				//  var respc = this.getParent().getBindingContext().getProperty("respc");
 				//  if(respc == "X"){
 				// 	 this.addStyleClass("jsChange");
 				//  }else{
 				// 	 this.removeStyleClass("jsChange");
 				//  }
 				// 	 }
 				//  return cellValue;
 				// }
 			).addStyleClass("borderStyle1"),
 			resizable: false,
 			width: "60px",
 			//sortProperty: "resp",
 			//filterProperty : "resp",
 		}));

 		oCDASHM1DISPUTEJsonEstimateLines = jQuery.grep(oCDASHM1DISPUTEJsonEstimateLines, function (element, index) {
 			return element.sno !== "";
 		});

 		var oCDASHM1DISPUTEModelEstimateLinesUI = new sap.ui.model.json.JSONModel();
 		oCDASHM1DISPUTEModelEstimateLinesUI.setData({
 			modelData: oCDASHM1DISPUTEJsonEstimateLines
 		});

 		oCDASHM1DISPUTETableEstimateLinesUI.setModel(oCDASHM1DISPUTEModelEstimateLinesUI);
 		oCDASHM1DISPUTETableEstimateLinesUI.setVisibleRowCount(oCDASHM1DISPUTEJsonEstimateLines.length);
 		oCDASHM1DISPUTETableEstimateLinesUI.bindRows("/modelData");

 		return oCDASHM1DISPUTETableEstimateLinesUI;

 	},

 	/* CDASHM1 - Function - Set CS Approve Popup content */

 	setCSApproveInitial: function (page) {

 		oCDASHM1JsonCSApprove = [];
 		var oCurrent = this;

 		if (page == 1) {
 			var arraySelLines = sap.ui.getCore().byId("idCDASHM1TableEstimatesPending").getSelectedIndices();
 			for (var i = 0; i < oCDASHMJsonEstimatesPending.length; i++) {
 				if (arraySelLines.indexOf(i) != -1) {
 					var oDetData = sap.ui.getCore().byId("idCDASHM1TableEstimatesPending").getContextByIndex(i);
 					if (oDetData != undefined) {
 						var realPath = oDetData.getPath().split('/')[2];
 						oCDASHM1JsonCSApprove.push({
 							serialno: oCDASHMJsonEstimatesPending[realPath].serialno,
 							estimateno: oCDASHMJsonEstimatesPending[realPath].estimateno,
 							depot: oCDASHMJsonEstimatesPending[realPath].depotcode,
 							equnr: oCDASHMJsonEstimatesPending[realPath].equnr,
 							cost: oCDASHMJsonEstimatesPending[realPath].costcurrency + " " + oCDASHMJsonEstimatesPending[realPath].usercost,
 							curr: oCDASHMJsonEstimatesPending[realPath].costcurrency,
 							appref: "",
 							message: ""
 						});
 					}
 				}
 			}
 		} else if (page == 2) {

 			for (var i = 0; i < oCDASHMJsonEstimatesPending.length; i++) {
 				if (oCDASHMJsonEstimatesPending[i].serialno == global3SerialNo) {
 					oCDASHM1JsonCSApprove.push({
 						serialno: global3SerialNo,
 						estimateno: "",
 						depot: global3Depot,
 						equnr: global3SerialNo,
 						cost: oCDASHMJsonEstimatesPending[i].costcurrency + " " + oCDASHMJsonEstimatesPending[i].usercost,
 						curr: oCDASHMJsonEstimatesPending[i].costcurrency,
 						appref: "",
 						message: ""
 					});
 					break;
 				}
 			}
 		}

 		/* CDASHM1 - Table - CS Approve */

 		var oCDASHM1TableCSApprove = new sap.ui.table.Table({
 			visibleRowCount: 4,
 			width: '600px',
 			showNoData: false,
 			selectionMode: sap.ui.table.SelectionMode.None,
 		}).addStyleClass("sapUiSizeCompact tblBorder1");

 		oCDASHM1TableCSApprove.addColumn(new sap.ui.table.Column({
 			label: new sap.ui.commons.Label({
 				text: "Serial No.",
 				textAlign: "Left"
 			}).addStyleClass("wraptextcol"),
 			template: new sap.ui.commons.TextView({}).bindProperty("text", "serialno").addStyleClass("borderStyle1"),
 			resizable: false,
 			width: "100px"
 		}));

 		oCDASHM1TableCSApprove.addColumn(new sap.ui.table.Column({
 			label: new sap.ui.commons.Label({
 				text: "Reference *",
 				textAlign: "Left"
 			}).addStyleClass("wraptextcol"),
 			template: new sap.ui.commons.TextField({}).bindProperty("value", "appref").addStyleClass("borderStyle referenceinput"),
 			resizable: false,
 			width: "140px"
 		}));

 		oCDASHM1TableCSApprove.addColumn(new sap.ui.table.Column({
 			label: new sap.ui.commons.Label({
 				text: "Cost"
 			}).addStyleClass("wraptextcol"),
 			template: new sap.ui.commons.TextView({
 				textAlign: "Right"
 			}).bindProperty("text", "cost").addStyleClass("borderStyle1"),
 			resizable: false,
 			width: "120px"
 		}));

 		oCDASHM1TableCSApprove.addColumn(new sap.ui.table.Column({
 			label: new sap.ui.commons.Label({
 				text: "Result",
 				textAlign: "Left"
 			}).addStyleClass("wraptextcol"),
 			template: new sap.ui.commons.TextView({}).bindProperty("text", "message").addStyleClass("borderStyle1"),
 			resizable: false,
 			width: "80px"
 		}));

 		oCDASHM1ModelCSApprove.setData({
 			modelData: oCDASHM1JsonCSApprove
 		});

 		oCDASHM1TableCSApprove.setModel(oCDASHM1ModelCSApprove);
 		oCDASHM1TableCSApprove.bindRows("/modelData");

 		var oCDASHM1JsonCSApproveLength = oCDASHM1JsonCSApprove.length;
 		if (oCDASHM1JsonCSApproveLength < 11) {
 			oCDASHM1TableCSApprove.setVisibleRowCount(oCDASHM1JsonCSApproveLength);
 			oCDASHM1TableCSApprove.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
 		} else {
 			oCDASHM1TableCSApprove.setVisibleRowCount(10);
 			oCDASHM1TableCSApprove.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
 		}

 		return oCDASHM1TableCSApprove;
 	},

 	/* CDASHM1 - Function - Open PopUp CS Approve */

 	openCSApprove: function (oCDASHM1ContentCSApprove, page) {

 		if (sap.ui.getCore().byId("idCDASHM1ButtonCSApproveApprove") != undefined)
 			sap.ui.getCore().byId("idCDASHM1ButtonCSApproveApprove").destroy();

 		if (sap.ui.getCore().byId("idCDASHM1ButtonCSApproveClose") != undefined)
 			sap.ui.getCore().byId("idCDASHM1ButtonCSApproveClose").destroy();

 		var oCurrent = this;
 		var oCDASHM1ButtonCSApproveApprove = new sap.ui.commons.Button("idCDASHM1ButtonCSApproveApprove", {
 			text: "Approve",
 			//styled:false,
 			visible: true,
 			//type:sap.m.ButtonType.Unstyled,
 			//icon: sap.ui.core.IconPool.getIconURI("email"),
 			press: function (oEvent) {
 				oCurrent.ApproveCSApprove();
 				// oCurrent.setValueCustDash();
 			}
 		}); //.addStyleClass("normalBtn marginTop10 floatRight");

 		var oCDASHM1ButtonCSApproveClose = new sap.ui.commons.Button("idCDASHM1ButtonCSApproveClose", {
 			text: "Close",
 			//styled:false,
 			visible: true,
 			//type:sap.m.ButtonType.Unstyled,
 			//icon: sap.ui.core.IconPool.getIconURI("email"),
 			press: function (oEvent) {
 				sap.ui.getCore().byId("idCDASHM1PopoverCSApprove").close();
 			}
 		}); //.addStyleClass("normalBtn marginTop10 floatRight");

 		/* CDASHM1 - Flexbox - Additional Estimate Buttons*/

 		var oCDASHM1FlexCSApproveButtons = new sap.m.FlexBox({
 			items: [
 				oCDASHM1ButtonCSApproveApprove,
 				new sap.m.Label({
 					width: "15px"
 				}),
 				oCDASHM1ButtonCSApproveClose
 			],
 			direction: "Row",
 			visible: true
 		});

 		/* CDASHM1 - Flexbox - Additional Estimate Tables and Buttons*/

 		var oCDASHM1FlexCSApprovePopup = new sap.m.FlexBox({
 			items: [
 				oCDASHM1ContentCSApprove,
 				new sap.m.Label({
 					text: "*Denotes Required Field. Reference will appear in Seaco Invoice."
 				}).addStyleClass("starText"),
 				new sap.m.Label({
 					width: "15px"
 				}),
 				oCDASHM1FlexCSApproveButtons
 			],
 			direction: "Column",
 			visible: true
 		});

 		/* CDASHM1 - Popover - Customer Approval */

 		if (sap.ui.getCore().byId("idCDASHM1PopoverCSApprove") != undefined)
 			sap.ui.getCore().byId("idCDASHM1PopoverCSApprove").destroy();

 		var oCDASHM1PopoverCSApprove = new sap.m.Popover("idCDASHM1PopoverCSApprove", {
 			//title: "Customer Approval",
 			width: "1300px",
 			modal: true,
 			showHeader: false,
 			placement: sap.m.PlacementType.Right,
 			footer: new sap.m.Bar({
 				visible: false,
 				contentRight: [
 					new sap.m.Button({
 						text: "Close",
 						icon: "sap-icon://close",
 						press: function () {

 						}
 					})
 				],
 			}),
 			content: new sap.m.VBox({
 				//width:"300px",
 				items: [oCDASHM1FlexCSApprovePopup]
 			}),

 		}).addStyleClass("sapUiPopupWithPadding");

 		//oCDASHM1PopoverCSApprove.openBy(approveBtn);

 		if (page == 1) {
 			oCDASHM1PopoverCSApprove.openBy(sap.ui.getCore().byId("idCDASHM1ButtonApprove"));
 		} else if (page == 2) {
 			oCDASHM1PopoverCSApprove.openBy(sap.ui.getCore().byId("idCDASHM2ButtonEquipmentLevelCSApproval"));
 		}

 	},

 	/* CDASHM1 - Function - Open PopUp CS Dispute */

 	openCSDispute: function (oCDASHM1ContentCSDispute, jsordispute) {

 		/* Page 1 : Buttons */
 		if (sap.ui.getCore().byId("idCDASHM1Button1CSDisputeDispute") != undefined)
 			sap.ui.getCore().byId("idCDASHM1Button1CSDisputeDispute").destroy();

 		if (sap.ui.getCore().byId("idCDASHM1Button1CSDisputeClose") != undefined)
 			sap.ui.getCore().byId("idCDASHM1Button1CSDisputeClose").destroy();

 		var oCurrent = this;
 		var oCDASHM1Button1CSDisputeDispute = new sap.ui.commons.Button("idCDASHM1Button1CSDisputeDispute", {
 			text: (jsordispute == "D") ? "Next : Reason for Dispute" : "Next : Reason for Joint Survey Request",
 			//styled:false,
 			visible: true,
 			//type:sap.m.ButtonType.Unstyled,
 			//icon: sap.ui.core.IconPool.getIconURI("email"),
 			press: function (oEvent) {

 				// Validation 
 				var isSelectedOne = sap.ui.getCore().byId("idCDASHM1DISPUTETableEstimateLinesUI").getSelectedIndices().length;
 				if (isSelectedOne > 0) {
 					sap.ui.getCore().byId("idCDASHM1NavContainerCSDispute").to("idCDASHM1Page2CSDispute");
 				} else {
 					sap.ui.commons.MessageBox.alert("Please select at least one item for dispute");
 				}

 			}
 		}); //.addStyleClass("normalBtn marginTop10 floatRight");

 		var oCDASHM1Button1CSDisputeClose = new sap.ui.commons.Button("idCDASHM1Button1CSDisputeClose", {
 			text: "Cancel",
 			//styled:false,
 			visible: true,
 			//type:sap.m.ButtonType.Unstyled,
 			//icon: sap.ui.core.IconPool.getIconURI("email"),
 			press: function (oEvent) {
 				sap.ui.getCore().byId("idCDASHM1DialogCSDispute").close();
 			}
 		}); //.addStyleClass("normalBtn marginTop10 floatRight");

 		var oCDASHM1Flex1CSDisputeButtons = new sap.m.FlexBox({
 			items: [
 				oCDASHM1Button1CSDisputeClose,
 				new sap.m.Label({
 					width: "15px"
 				}),
 				oCDASHM1Button1CSDisputeDispute
 			],
 			direction: "Row",
 			visible: true
 		});

 		/* Page 2 : Buttons */
 		if (sap.ui.getCore().byId("idCDASHM1Button2CSDisputeDispute") != undefined)
 			sap.ui.getCore().byId("idCDASHM1Button2CSDisputeDispute").destroy();

 		if (sap.ui.getCore().byId("idCDASHM1Button2CSDisputeClose") != undefined)
 			sap.ui.getCore().byId("idCDASHM1Button2CSDisputeClose").destroy();

 		var oCurrent = this;
 		var oCDASHM1Button2CSDisputeDispute = new sap.ui.commons.Button("idCDASHM1Button2CSDisputeDispute", {
 			text: "Next : Email Recipients",
 			//styled:false,
 			visible: true,
 			//type:sap.m.ButtonType.Unstyled,
 			//icon: sap.ui.core.IconPool.getIconURI("email"),
 			press: function (oEvent) {

 				// Validation 
 				var oCDASHM1TextAreaCSDisputeReasonValue = sap.ui.getCore().byId("idCDASHM1TextAreaCSDisputeReason").getValue();
 				oCDASHM1TextAreaCSDisputeReasonValue = oCDASHM1TextAreaCSDisputeReasonValue.replace(/\s/g, '');

 				if (oCDASHM1TextAreaCSDisputeReasonValue) {
 					sap.ui.getCore().byId("idCDASHM1NavContainerCSDispute").to("idCDASHM1Page3CSDispute");
 				} else {
 					sap.ui.commons.MessageBox.alert("Please provide reason for dispute");
 				}

 			}
 		}); //.addStyleClass("normalBtn marginTop10 floatRight");

 		var oCDASHM1Button2CSDisputeClose = new sap.ui.commons.Button("idCDASHM1Button2CSDisputeClose", {
 			text: "Cancel",
 			//styled:false,
 			visible: true,
 			//type:sap.m.ButtonType.Unstyled,
 			//icon: sap.ui.core.IconPool.getIconURI("email"),
 			press: function (oEvent) {
 				sap.ui.getCore().byId("idCDASHM1DialogCSDispute").close();
 			}
 		}); //.addStyleClass("normalBtn marginTop10 floatRight");

 		var oCDASHM1Flex2CSDisputeButtons = new sap.m.FlexBox({
 			items: [
 				oCDASHM1Button2CSDisputeClose,
 				new sap.m.Label({
 					width: "15px"
 				}),
 				oCDASHM1Button2CSDisputeDispute
 			],
 			direction: "Row",
 			visible: true
 		});

 		/* Page 2 : Buttons */
 		if (sap.ui.getCore().byId("idCDASHM1Button3CSDisputeDispute") != undefined)
 			sap.ui.getCore().byId("idCDASHM1Button3CSDisputeDispute").destroy();

 		if (sap.ui.getCore().byId("idCDASHM1Button3CSDisputeClose") != undefined)
 			sap.ui.getCore().byId("idCDASHM1Button3CSDisputeClose").destroy();

 		var oCurrent = this;
 		var oCDASHM1Button3CSDisputeDispute = new sap.ui.commons.Button("idCDASHM1Button3CSDisputeDispute", {
 			text: "Submit",
 			//styled:false,
 			visible: true,
 			//type:sap.m.ButtonType.Unstyled,
 			//icon: sap.ui.core.IconPool.getIconURI("email"),
 			press: function (oEvent) {
 				oCurrent.submitDispute(jsordispute);
 			}
 		}); //.addStyleClass("normalBtn marginTop10 floatRight");

 		var oCDASHM1Button3CSDisputeClose = new sap.ui.commons.Button("idCDASHM1Button3CSDisputeClose", {
 			text: "Cancel",
 			//styled:false,
 			visible: true,
 			//type:sap.m.ButtonType.Unstyled,
 			//icon: sap.ui.core.IconPool.getIconURI("email"),
 			press: function (oEvent) {
 				sap.ui.getCore().byId("idCDASHM1DialogCSDispute").close();
 			}
 		}); //.addStyleClass("normalBtn marginTop10 floatRight");

 		var oCDASHM1Flex3CSDisputeButtons = new sap.m.FlexBox({
 			items: [
 				oCDASHM1Button3CSDisputeClose,
 				new sap.m.Label({
 					width: "15px"
 				}),
 				oCDASHM1Button3CSDisputeDispute
 			],
 			direction: "Row",
 			visible: true
 		});

 		/* CDASHM1 - TextArea for Reason */

 		if (sap.ui.getCore().byId("idCDASHM1TextAreaCSDisputeReason") != undefined)
 			sap.ui.getCore().byId("idCDASHM1TextAreaCSDisputeReason").destroy();

 		var oCDASHM1TextAreaCSDisputeReason = new sap.m.TextArea("idCDASHM1TextAreaCSDisputeReason", {
 			value: "",
 			rows: 10,
 			cols: 100,
 			maxLength: 500,
 			placeholder: (jsordispute == "D") ? "Please provide your reason of dispute (mandatory)" : "Please provide your reason of joint survey request (mandatory)"
 		});

 		/* CDASHM1 - Table for Email addresses */

 		if (sap.ui.getCore().byId("idCDASHM1TableCSDisputeReceivers") != undefined)
 			sap.ui.getCore().byId("idCDASHM1TableCSDisputeReceivers").destroy();

 		var oCDASHM1TableCSDisputeReceivers = new sap.ui.table.Table("idCDASHM1TableCSDisputeReceivers", {
 			visibleRowCount: 5,
 			columnHeaderVisible: false,
 			width: '300px',
 			selectionMode: sap.ui.table.SelectionMode.None
 		}).addStyleClass("sapUiSizeCompact tblBorder1");

 		oCDASHM1TableCSDisputeReceivers.addColumn(new sap.ui.table.Column({
 			//label: new sap.ui.commons.Label({text: "", textAlign: "Left"}).addStyleClass("wraptextcol"),
 			template: new sap.ui.commons.TextField({
 				// textAlign: "Right"
 			}).bindProperty("value", "email").bindProperty("editable", "editable").addStyleClass("borderStyle referenceinput boldText"),
 			resizable: false,
 			//width:"100px"
 			width: "auto"
 		}));

 		var oCDASHM1DISPUTEJsonReceivers = [];
 		oModel = new sap.ui.model.odata.ODataModel(serviceDEP, true);

 		var sPath = "/disputecontactsSet('" + global3Depot + "')";
 		oModel.read(sPath, {
 			async: false,
 			success: function (oData, oResponse) {
 				var mailswithdollar = oData.Mails;
 				var mailsArray = mailswithdollar.split('$');
 				for (var i = 0; i < 2; i++) {
 					oCDASHM1DISPUTEJsonReceivers.push({
 						email: mailsArray[i],
 						editable: false
 					});
 				}
 			}
 		});

 		oCDASHM1DISPUTEJsonReceivers.push({
 			email: "",
 			editable: true
 		});
 		oCDASHM1DISPUTEJsonReceivers.push({
 			email: "",
 			editable: true
 		});
 		oCDASHM1DISPUTEJsonReceivers.push({
 			email: "",
 			editable: true
 		});
 		var oCDASHM1DISPUTEModelReceivers = new sap.ui.model.json.JSONModel();
 		oCDASHM1DISPUTEModelReceivers.setData({
 			modelData: oCDASHM1DISPUTEJsonReceivers
 		});

 		oCDASHM1TableCSDisputeReceivers.setModel(oCDASHM1DISPUTEModelReceivers);
 		oCDASHM1TableCSDisputeReceivers.setVisibleRowCount(oCDASHM1DISPUTEJsonReceivers.length);
 		oCDASHM1TableCSDisputeReceivers.bindRows("/modelData");

 		/* CDASHM1 - Flexbox - Line Items */

 		var oCDASHM1Flex1CSDisputePopup = new sap.m.FlexBox({
 			items: [
 				oCDASHM1ContentCSDispute,
 				new sap.m.Label({
 					width: "15px"
 				}),
 				oCDASHM1Flex1CSDisputeButtons
 			],
 			direction: "Column",
 			visible: true
 		});

 		/* CDASHM1 - Flexbox - Reason for Dispute */

 		var oCDASHM1Flex2CSDisputePopup = new sap.m.FlexBox({
 			items: [
 				oCDASHM1TextAreaCSDisputeReason,
 				new sap.m.Label({
 					width: "15px"
 				}),
 				oCDASHM1Flex2CSDisputeButtons
 			],
 			direction: "Column",
 			visible: true
 		});

 		/* CDASHM1 - Flexbox - Receivers */

 		var oCDASHM1Flex3CSDisputePopup = new sap.m.FlexBox({
 			items: [
 				oCDASHM1TableCSDisputeReceivers,
 				new sap.m.Label({
 					width: "15px"
 				}),
 				oCDASHM1Flex3CSDisputeButtons
 			],
 			direction: "Column",
 			visible: true
 		});

 		// if (sap.ui.getCore().byId("idCDASHM1AppCSDispute") != undefined)
 		// 		sap.ui.getCore().byId("idCDASHM1AppCSDispute").destroy();

 		// 	var oCDASHM1AppCSDispute = new sap.m.App("idCDASHM1AppCSDispute",{
 		// 		pages : [oCDASHM1Page1CSDispute, oCDASHM1Page2CSDispute, oCDASHM1Page3CSDispute]
 		// 	});

 		if (sap.ui.getCore().byId("idCDASHM1Page1CSDispute") != undefined)
 			sap.ui.getCore().byId("idCDASHM1Page1CSDispute").destroy();

 		var oCDASHM1Page1CSDispute = new sap.m.Page("idCDASHM1Page1CSDispute", {
 			content: [oCDASHM1Flex1CSDisputePopup],
 			enableScrolling: true,
 			showHeader: true,
 			title: (jsordispute == "D") ? "Dispute : Choose Line Items" : "Joint Survey Request : Choose Line Items",
 			showNavButton: false
 		});

 		if (sap.ui.getCore().byId("idCDASHM1Page2CSDispute") != undefined)
 			sap.ui.getCore().byId("idCDASHM1Page2CSDispute").destroy();

 		var oCDASHM1Page2CSDispute = new sap.m.Page("idCDASHM1Page2CSDispute", {
 			content: [oCDASHM1Flex2CSDisputePopup],
 			enableScrolling: true,
 			showHeader: true,
 			title: (jsordispute == "D") ? "Dispute : Reason" : "Joint Survey Request : Reason",
 			showNavButton: true,
 			navButtonPress: function () {
 				sap.ui.getCore().byId("idCDASHM1NavContainerCSDispute").back();
 			}
 		});

 		if (sap.ui.getCore().byId("idCDASHM1Page3CSDispute") != undefined)
 			sap.ui.getCore().byId("idCDASHM1Page3CSDispute").destroy();

 		var oCDASHM1Page3CSDispute = new sap.m.Page("idCDASHM1Page3CSDispute", {
 			content: [oCDASHM1Flex3CSDisputePopup],
 			enableScrolling: true,
 			showHeader: true,
 			title: (jsordispute == "D") ? "Dispute : Email Recipients" : "Joint Survey Request : Email Recipients",
 			showNavButton: true,
 			navButtonPress: function () {
 				sap.ui.getCore().byId("idCDASHM1NavContainerCSDispute").back();
 			}
 		});

 		if (sap.ui.getCore().byId("idCDASHM1NavContainerCSDispute") != undefined)
 			sap.ui.getCore().byId("idCDASHM1NavContainerCSDispute").destroy();
 		var oCDASHM1NavContainerCSDispute = new sap.m.NavContainer("idCDASHM1NavContainerCSDispute", {
 			pages: [oCDASHM1Page1CSDispute, oCDASHM1Page2CSDispute, oCDASHM1Page3CSDispute]
 		});
 		/* CDASHM1 - Popover - Customer Approval */

 		// if (sap.ui.getCore().byId("idCDASHM1PopoverCSDispute") != undefined)
 		// 	sap.ui.getCore().byId("idCDASHM1PopoverCSDispute").destroy();

 		// var oCDASHM1PopoverCSDispute = new sap.m.Popover("idCDASHM1PopoverCSDispute", {
 		// 	//title: "Customer Approval",
 		// 	width: "1300px",
 		// 	modal: true,
 		// 	showHeader: false,
 		// 	placement: sap.m.PlacementType.Right,
 		// 	footer: new sap.m.Bar({
 		// 		visible: false,
 		// 		contentRight: [
 		// 			new sap.m.Button({
 		// 				text: "Close",
 		// 				icon: "sap-icon://close",
 		// 				press: function () {

 		// 				}
 		// 			})
 		// 		],
 		// 	}),
 		// 	content: new sap.m.VBox({
 		// 		//width:"300px",
 		// 		items: [oCDASHM1FlexCSDisputePopup]
 		// 	}),

 		// }).addStyleClass("sapUiPopupWithPadding");

 		// oCDASHM1PopoverCSDispute.openBy(sap.ui.getCore().byId("idCDASHM1ButtonDispute"));

 		if (sap.ui.getCore().byId("idCDASHM1DialogCSDispute") != undefined)
 			sap.ui.getCore().byId("idCDASHM1DialogCSDispute").destroy();

 		var oCDASHM1DialogCSDispute = new sap.m.Dialog("idCDASHM1DialogCSDispute", {
 			width: "90%",
 			contentHeight: "50%",
 			contentWidth: "90%",
 			showCloseButton: false,
 			modal: true,
 			showHeader: false
 		});
 		//oDialog1.setTitle("My first Dialog");
 		//var oText = new sap.ui.commons.TextView({text: "Hello World!"});
 		oCDASHM1DialogCSDispute.addContent(oCDASHM1NavContainerCSDispute);
 		//oCDASHM1DialogCSDispute.addButton(new sap.ui.commons.Button({text: "Close", press:function(){oDialog1.close();}}));

 		oCDASHM1DialogCSDispute.open();

 		busyDialog.close();

 	},

 	/* CDASHM1 - Submit Dispute */

 	submitDispute: function (jsordispute) {
 		debugger;
 		/* This is the payload for post method */
 		var postData = {};

 		/* Get Model's data */

 		/* 
 		
 		{
		  "Equnr" : "GESU7898989",
		  "Estimate" : "10098977",
		  "headerlines" : [
		    {
		      "Equnr" : "GESU7898989",
		  "Estimate" : "10098977",
		  "LineItem" : "001"
		    }
		  ],
		  "headerrecipients" : [
		    {
		      "Equnr" : "GESU7898989",
		  "Estimate" : "10098977",
		  "Email" : "seyed.ismail@seacoglobal.com"
		    }
		  ]
		}
		*/

 		// var postData = sap.ui.getCore().getModel("data").getData();

 		postData.Equnr = global3SerialNo;
 		postData.Estimate = global3EstimateNo;
 		postData.Reqtype = jsordispute;
 		postData.Customer = global3Customer;
 		postData.CustomerName = global3CustomerName;
 		postData.Depot = global3Depot;
 		postData.Reason = sap.ui.getCore().byId("idCDASHM1TextAreaCSDisputeReason").getValue();

 		// Prepare Line Items

 		postData.headerlines = [];
 		var headerlinesb4 = sap.ui.getCore().byId("idCDASHM1DISPUTETableEstimateLinesUI").getModel().getData().modelData;

 		var arraySelLines = sap.ui.getCore().byId("idCDASHM1DISPUTETableEstimateLinesUI").getSelectedIndices();
 		for (var i = 0; i < headerlinesb4.length; i++) {
 			if (arraySelLines.indexOf(i) != -1) {
 				var oDetData = sap.ui.getCore().byId("idCDASHM1DISPUTETableEstimateLinesUI").getContextByIndex(i);
 				if (oDetData != undefined) {
 					var realPath = oDetData.getPath().split('/')[2];
 					postData.headerlines.push({
 						Equnr: global3SerialNo,
 						Estimate: global3EstimateNo,
 						LineItem: headerlinesb4[i].sno,
 						LocationCode: headerlinesb4[i].location,
 						ComponentCode: headerlinesb4[i].component,
 						DamageCode: headerlinesb4[i].damage,
 						MaterialCode: headerlinesb4[i].material,
 						RepairCode: headerlinesb4[i].repair,
 						MaterialText: headerlinesb4[i].materialt,
 						ComponentText: headerlinesb4[i].componentt,
 						LocationText: headerlinesb4[i].locationt,
 						DamageText: headerlinesb4[i].damaget,
 						RepairText: headerlinesb4[i].repairt,
 						RepairLength: headerlinesb4[i].length,
 						RepairWidth: headerlinesb4[i].width,
 						RepairMeasureUnit: headerlinesb4[i].measure,
 						Quantity: headerlinesb4[i].qty,
 						ManHours: headerlinesb4[i].hrs,
 						MaterialCost: headerlinesb4[i].matcost,
 						TotalCost: headerlinesb4[i].total,
 						Responsibility: headerlinesb4[i].resp,
 						LabourRate: headerlinesb4[i].labcost,
 						LabourCost: headerlinesb4[i].labcost,
 						BulletinNumber: headerlinesb4[i].bulletin,

 						LocationCodeC: headerlinesb4[i].locationc,
 						ComponentCodeC: headerlinesb4[i].componentc,
 						DamageCodeC: headerlinesb4[i].damagec,
 						MaterialCodeC: headerlinesb4[i].materialc,
 						RepairCodeC: headerlinesb4[i].repairc,
 						RepairLengthC: headerlinesb4[i].lengthc,
 						RepairWidthC: headerlinesb4[i].widthc,
 						RepairMeasureUnitC: headerlinesb4[i].measurec,
 						QuantityC: headerlinesb4[i].qtyc,
 						ManHoursC: headerlinesb4[i].hrsc,
 						MaterialCostC: headerlinesb4[i].matcostc,
 						TotalCostC: headerlinesb4[i].totalc,
 						ResponsibilityC: headerlinesb4[i].respc,
 						LabourRateC: headerlinesb4[i].labcostc,
 						LabourCostC: headerlinesb4[i].labcostc,
 						BulletinNumberC: headerlinesb4[i].bulletinc
 					});
 				}
 			}
 		}

 		// postData.headerlines = [{
 		// 	"Equnr": "GESU1788892",
 		// 	"Estimate": "10098999",
 		// 	"LineItem": "002",
 		// 	"LocationCode": "IXXX"
 		// }];

 		// Prepare Recipients

 		postData.headerrecipients = [];
 		var headerrecipients = sap.ui.getCore().byId("idCDASHM1TableCSDisputeReceivers").getModel().getData().modelData;
 		for (var i = 0; i < headerrecipients.length; i++) {
 			if (headerrecipients[i].email) {
 				postData.headerrecipients.push({
 					Equnr: global3SerialNo,
 					Estimate: global3EstimateNo,
 					Email: headerrecipients[i].email
 				});
 			}
 		}

 		// postData.headerrecipients = [{
 		// 	"Equnr": "GESU1788892",
 		// 	"Estimate": "10098999",
 		// 	"Email": "seyed.ismail@seacoglobal.com"
 		// }];
 		var oCurrent = this;
 		busyDialog.open();
 		oModel = new sap.ui.model.odata.ODataModel(serviceDEP, true);
 		oModel.create("/disputeheaderSet", postData, null, function (oData, oResponse) {
 				oCurrent.setValueCustDash();
 				busyDialog.close();
 				sap.ui.getCore().byId("idCDASHM1DialogCSDispute").close();
 				sap.ui.commons.MessageBox.alert((jsordispute == "D") ? "Dispute is submitted successfully" :
 					"Joint Survey Request is submitted successfully");
 			},
 			function (err) { //Error Callback
 				sap.ui.commons.MessageBox.alert((jsordispute == "D") ? "Dispute cannot be submitted now" :
 					"Joint Survey Request cannot be submitted now");
 				busyDialog.close();
 			});

 	},

 	/* CDASHM1 - Function - Approve CS Approve */

 	ApproveCSApprove: function () {

 		var oCurrent = this;
 		var stringToPass = "";
 		var stringCount = 1;
 		var isRefGiven = true;

 		for (var i = 0; i < oCDASHM1JsonCSApprove.length; i++) {
 			if (!oCDASHM1JsonCSApprove[i].appref.replace(/\s/g, '').length) {
 				isRefGiven = false;
 				break;
 			}
 			if (stringToPass == "") {
 				stringToPass = stringToPass + "ILessee" + stringCount + " eq '" + oCDASHM1JsonCSApprove[i].serialno + "$" +
 					oCDASHM1JsonCSApprove[i].depot + "$" +
 					new Date().format("yyyymmdd") + "$" +
 					oCDASHM1JsonCSApprove[i].appref + "$" +
 					"" + "$" + // Approver Name
 					"" + "'"; // Approval Amount - Calculated from CRM
 			} else {
 				stringToPass = stringToPass + " and ILessee" + stringCount + " eq '" + oCDASHM1JsonCSApprove[i].serialno + "$" +
 					oCDASHM1JsonCSApprove[i].depot + "$" +
 					new Date().format("yyyymmdd") + "$" +
 					oCDASHM1JsonCSApprove[i].appref + "$" +
 					"" + "$" + // Approver Name
 					"" + "'"; // Approval Amount - Calculated from CRM
 			}
 			stringCount++;
 		}

 		if (isRefGiven == false) {
 			sap.ui.commons.MessageBox.alert("Please fill reference for all the units!");
 		} else {

 			var urlToSap = "CSApproveSet?$filter=" + stringToPass;

 			urlToSap = serviceDEP + urlToSap;
 			oModel = new sap.ui.model.odata.ODataModel(serviceDEP, true);
 			busyDialog.open();
 			console.log(urlToSap);
 			OData.request({
 					requestUri: urlToSap,
 					method: "GET",
 					dataType: 'json',
 					//async : false,
 					headers: {
 						"X-Requested-With": "XMLHttpRequest",
 						"Content-Type": "application/json; charset=utf-8",
 						"DataServiceVersion": "2.0",
 						"X-CSRF-Token": "Fetch"
 					}
 				},
 				function (data, response) {
 					var CSApproveResult = data.results;

 					if (CSApproveResult.length == 0) {
 						sap.ui.commons.MessageBox.alert("Sorry, there is an error");
 						console.log("CS Approve Failure");
 					} else {
 						//sap.ui.commons.MessageBox.alert("Approved");
 						//sap.ui.getCore().byId("idCDASHM1PopoverCSApprove").close();
 						// for(var i=0; i<CSApproveResult.length; i++){
 						//   oCDASHM1JsonCSApprove[i].message = CSApproveResult[i].Status;
 						// }
 						for (var i = 0; i < CSApproveResult.length; i++) {
 							for (j = 0; j < oCDASHM1JsonCSApprove.length; j++) {
 								if (oCDASHM1JsonCSApprove[j].serialno == CSApproveResult[i].Equipment) {
 									oCDASHM1JsonCSApprove[j].message = CSApproveResult[i].Status;
 								}
 							}
 						}
 						oCDASHM1ModelCSApprove.updateBindings();
 						console.log("CS Approve Successful");
 						oCurrent.setValueCustDash();
 						busyDialog.close();
 					}
 				},
 				function (error) {
 					sap.ui.commons.MessageBox.alert("Sorry, there is an error");
 					console.log("CS Submission Failure");
 					busyDialog.close();
 				});
 		}
 	},

 	/* CDASHM1 - Get PDF from SAP */

 	getPdfFromSap: function (sorder, serialnos, filetype) {

 		if (filetype == "Z") {
 			if (jsonCDASHM2Documents.length == 0 && jsonCDASHM2Pictures.length == 0) {
 				return;
 			}
 		}

 		oModel = new sap.ui.model.odata.ODataModel(serviceDEP, true);
 		busyDialog.open();

 		var sRead = "/pdfSet(Sorder='" + sorder + "',IvDownload='" + filetype + "',Serialnos='" + serialnos + "')" + "/$value";

 		oModel.read(sRead, null, null, true, function (oData, oResponse) {
 			busyDialog.close();
 			var pdfURL = oResponse.requestUri;
 			window.open(pdfURL);
 		}, function (error) {
 			busyDialog.close();
 			alert("Read failed");
 		});

 	},

 	setContentAlertGeneral: function () {
 		var oCurrent = this;
 		if (sap.ui.getCore().byId("idCDASHM1AlertGeneralTable") != undefined)
 			sap.ui.getCore().byId("idCDASHM1AlertGeneralTable").destroy();

 		var oCDASHM1AlertGeneralTable = new sap.ui.table.Table("idCDASHM1AlertGeneralTable", {
 			width: "150px",
 			//title : "General Section",
 			visibleRowCount: 1,
 			columnHeaderVisible: true,
 			selectionMode: sap.ui.table.SelectionMode.None
 		}).addStyleClass("sapUiSizeCompact tblBorder");

 		// Frequency Column

 		if (sap.ui.getCore().byId("idCDASHM1AlertGeneralComboBoxFrequency") != undefined)
 			sap.ui.getCore().byId("idCDASHM1AlertGeneralComboBoxFrequency").destroy();

 		var oCDASHM1AlertGeneralComboBoxFrequency = new sap.m.ComboBox("idCDASHM1AlertGeneralComboBoxFrequency", {
 			selectionChange: function (evnt) {
 				if (this.getSelectedKey() != '') {

 					var isValid = true;
 					//Save General section
 					for (var i = 0; i < oCDASHM1JsonAlertGeneral.length; i++) {
 						if (oCDASHM1JsonAlertGeneral[i].Frequency == "" && oCDASHM1JsonAlertGeneral[i].NoOfDaysPend == "" &&
 							oCDASHM1JsonAlertGeneral[i].Status == "") {

 						} else if (oCDASHM1JsonAlertGeneral[i].Frequency != "" && oCDASHM1JsonAlertGeneral[i].NoOfDaysPend != "" &&
 							oCDASHM1JsonAlertGeneral[i].Status != "") {

 						} else {
 							isValid = false;
 						}
 					}

 					var stringToPass = "";
 					var stringCount = 1;

 					if (isValid) {
 						for (var i = 0; i < oCDASHM1JsonAlertGeneral.length; i++) {
 							if (stringToPass == "") {
 								stringToPass = stringToPass + "UserId eq '" + sessionStorage.uName.toUpperCase() + "' and " + "UserType eq '" + "C" +
 									"' and Line" + stringCount + " eq '" + oCDASHM1JsonAlertGeneral[i].Frequency.substr(0, 1) + "$" +
 									oCDASHM1JsonAlertGeneral[i].NoOfDaysPend + "$" +
 									oCDASHM1JsonAlertGeneral[i].Status +
 									"'";
 							} else {
 								stringToPass = stringToPass + " and Line" + stringCount + " eq '" + oCDASHM1JsonAlertGeneral[i].Frequency.substr(0, 1) + "$" +
 									oCDASHM1JsonAlertGeneral[i].NoOfDaysPend + "$" +
 									oCDASHM1JsonAlertGeneral[i].Status +
 									"'";
 							}
 							stringCount++;
 						}

 						// Save General sections
 						oCurrent.submitCDASHM1Alert(stringToPass);

 						// Update General sections
 						oCurrent.setValuesAlert("C");
 					} else {
 						sap.ui.commons.MessageBox.alert("Please either enter Alert Frequency, Status and Days Pending or leave all of them empty",
 							"INFORMATION", "Error");
 					}

 				}
 			}
 		}).bindProperty("selectedKey", "Frequency").addStyleClass("borderStyle1 boldText");

 		for (var i = 0; i < oCDASHM1GeneralJsonFrequency.length; i++) {
 			oCDASHM1AlertGeneralComboBoxFrequency.addItem(new sap.ui.core.ListItem({
 				text: oCDASHM1GeneralJsonFrequency[i].text,
 				key: oCDASHM1GeneralJsonFrequency[i].key
 			}));
 		}
 		oCDASHM1AlertGeneralComboBoxFrequency.setSelectedKey(oCDASHM1GeneralJsonFrequency[0].key);

 		oCDASHM1AlertGeneralTable.addColumn(new sap.ui.table.Column({
 			label: new sap.ui.commons.Label({
 				text: "Alert Frequency",
 				textAlign: "Left"
 			}).addStyleClass("wraptextcol"),
 			template: oCDASHM1AlertGeneralComboBoxFrequency,
 			resizable: false,
 			width: "130px"
 		}));

 		/*oCDASHM1AlertGeneralTable.addColumn(new sap.ui.table.Column({
 		    label: new sap.ui.commons.Label({text: "Days Pending", textAlign: "Right"}).addStyleClass("wraptextcol"),
 		    template: new sap.ui.commons.TextView({
 		      textAlign: "Right",
 		      text: "7"
 		    }).addStyleClass("borderStyle alertdaysinput"),
 		      resizable:false,
 		      width:"80px"
 		    }));

 		  oCDASHM1AlertGeneralTable.addColumn(new sap.ui.table.Column({
 		      label: new sap.ui.commons.Label({text: "Status", textAlign: "Left"}).addStyleClass("wraptextcol"),
 		      template: new sap.ui.commons.TextView({
 		        textAlign: "Left",
 		        text: "AWAP"
 		      }).addStyleClass("borderStyle alertdaysinput"),
 		        resizable:false,
 		        width:"80px"
 		      }));*/

 		oCurrent.setValuesAlert("C");

 		return oCDASHM1AlertGeneralTable;

 	},

 	/* CDASHM1 - Alert Content */
 	setCDASHM1AlertContent: function (alertbutton) {

 		var oCurrent = this;
 		//var oCDASHM1ContentAlertOpsCoord = oCurrent.setContentAlertOpsCoord();
 		var oCDASHM1ContentAlertGeneral = oCurrent.setContentAlertGeneral();

 		var oCDASHM1ButtonAlertSubmit = new sap.ui.commons.Button({
 			text: "Save",
 			styled: false,
 			visible: true,
 			type: sap.m.ButtonType.Unstyled,
 			//icon: sap.ui.core.IconPool.getIconURI("email"),
 			press: function (oEvent) {
 				var isValid = true;
 				//Save General section
 				for (var i = 0; i < oCDASHM1JsonAlertGeneral.length; i++) {
 					if (oCDASHM1JsonAlertGeneral[i].Frequency == "" && oCDASHM1JsonAlertGeneral[i].NoOfDaysPend == "" &&
 						oCDASHM1JsonAlertGeneral[i].Status == "") {

 					} else if (oCDASHM1JsonAlertGeneral[i].Frequency != "" && oCDASHM1JsonAlertGeneral[i].NoOfDaysPend != "" &&
 						oCDASHM1JsonAlertGeneral[i].Status != "") {

 					} else {
 						isValid = false;
 					}
 				}

 				var stringToPass = "";
 				var stringCount = 1;

 				if (isValid) {
 					for (var i = 0; i < oCDASHM1JsonAlertGeneral.length; i++) {
 						if (stringToPass == "") {
 							stringToPass = stringToPass + "UserId eq '" + sessionStorage.uName.toUpperCase() + "' and " + "UserType eq '" + "C" +
 								"' and Line" + stringCount + " eq '" + oCDASHM1JsonAlertGeneral[i].Frequency.substr(0, 1) + "$" +
 								oCDASHM1JsonAlertGeneral[i].NoOfDaysPend + "$" +
 								oCDASHM1JsonAlertGeneral[i].Status +
 								"'";
 						} else {
 							stringToPass = stringToPass + " and Line" + stringCount + " eq '" + oCDASHM1JsonAlertGeneral[i].Frequency.substr(0, 1) + "$" +
 								oCDASHM1JsonAlertGeneral[i].NoOfDaysPend + "$" +
 								oCDASHM1JsonAlertGeneral[i].Status +
 								"'";
 						}
 						stringCount++;
 					}

 					// Save General sections
 					oCurrent.submitCDASHM1Alert(stringToPass);

 					// Update General sections
 					oCurrent.setValuesAlert("C");
 				} else {
 					sap.ui.commons.MessageBox.alert("Please either enter Alert Frequency, Status and Days Pending or leave all of them empty",
 						"INFORMATION", "Error");
 				}

 			}
 		}).addStyleClass("normalBtn marginTop10 floatRight");

 		var oCDASHM1ButtonAlertClose = new sap.ui.commons.Button({
 			text: "Close",
 			styled: false,
 			visible: true,
 			type: sap.m.ButtonType.Unstyled,
 			//icon: sap.ui.core.IconPool.getIconURI("email"),
 			press: function (oEvent) {
 				oCDASHM1PopoverAlert.close();
 			}
 		}).addStyleClass("normalBtn marginTop10 floatRight");

 		/* CDASHM1 - Flexbox - Buttons */

 		var oCDASHM1FlexAlertButtons = new sap.m.FlexBox({
 			items: [
 				oCDASHM1ButtonAlertSubmit,
 				oCDASHM1ButtonAlertClose
 			],
 			direction: "Row",
 			visible: true
 		});

 		/* CDASHM1 - Flexbox - Alert Ops Coord and General */

 		var oCDASHM1FlexAlertSections = new sap.m.FlexBox({
 			items: [
 				// oCDASHM1ContentAlertOpsCoord,
 				// new sap.m.Label({width : "45px"}),
 				oCDASHM1ContentAlertGeneral
 			],
 			direction: "Row",
 			visible: true
 		});

 		/* CDASHM1 - Flexbox - Alert */

 		var oCDASHM1FlexAlert = new sap.m.FlexBox({
 			items: [
 				oCDASHM1FlexAlertSections
 				/*new sap.m.Label({width : "15px"}),
 				oCDASHM1FlexAlertButtons*/
 			],
 			direction: "Column",
 			visible: true
 		});

 		if (sap.ui.getCore().byId("idCDASHM1PopoverAlert") != undefined)
 			sap.ui.getCore().byId("idCDASHM1PopoverAlert").destroy();

 		oCDASHM1PopoverAlert = new sap.m.Popover("idCDASHM1PopoverAlert", {
 			//title: "Setup Alert",
 			width: "1300px",
 			showHeader: false,
 			//modal: true,
 			placement: sap.m.PlacementType.Right,
 			content: new sap.m.VBox({
 				//width:"300px",
 				items: [oCDASHM1FlexAlert]
 			}),

 		}).addStyleClass("sapUiPopupWithPadding");

 		oCDASHM1PopoverAlert.openBy(alertbutton);

 	},

 	submitCDASHM1Alert: function (stringToPass) {

 		var urlToSap = "setAlertSet?$filter=" + stringToPass;

 		urlToSap = serviceDEP + urlToSap;

 		oModel = new sap.ui.model.odata.ODataModel(serviceDEP, true);
 		busyDialog.open();
 		console.log(urlToSap);
 		OData.request({
 				requestUri: urlToSap,
 				method: "GET",
 				dataType: 'json',
 				async: false,
 				headers: {
 					"X-Requested-With": "XMLHttpRequest",
 					"Content-Type": "application/json; charset=utf-8",
 					"DataServiceVersion": "2.0",
 					"X-CSRF-Token": "Fetch"
 				}
 			},
 			function (data, response) {
 				busyDialog.close();

 				var alertResult = data.results;

 				if (alertResult.length == 0) {
 					sap.ui.commons.MessageBox.alert("Sorry, there is an error");
 					console.log("Seaco DB Setup Alert Successful; but returned nothing");
 				} else if (alertResult[0].Result == '') {
 					sap.ui.commons.MessageBox.alert("Sorry, there is an error");
 					console.log("Seaco DB Setup Alert Successful; but returned nothing");
 				} else {
 					sap.ui.commons.MessageBox.alert("Alert Configuration Done");
 					//sap.ui.getCore().byId("idCDASHM2EquipmentLevelSendAlertPopover").close();
 					console.log("Seaco DB Setup Alert Successful");
 				}
 			},
 			function (error) {
 				console.log("Set Alerts Failure");
 				busyDialog.close();
 			});

 	},

 	setValuesAlert: function (usertype) {

 		var urlToSap = "getAlertSet?$filter=" + "UserId eq '" + sessionStorage.uName.toUpperCase() + "' and " + "UserType eq '" + usertype +
 			"'";

 		urlToSap = serviceDEP + urlToSap;

 		oModel = new sap.ui.model.odata.ODataModel(serviceDEP, true);
 		busyDialog.open();
 		console.log(urlToSap);
 		OData.request({
 				requestUri: urlToSap,
 				method: "GET",
 				dataType: 'json',
 				async: false,
 				headers: {
 					"X-Requested-With": "XMLHttpRequest",
 					"Content-Type": "application/json; charset=utf-8",
 					"DataServiceVersion": "2.0",
 					"X-CSRF-Token": "Fetch"
 				}
 			},
 			function (data, response) {

 				oCDASHM1JsonAlertGeneral = data.results;

 				/*oCDASHM1JsonAlertGeneral = [];
 				oCDASHM1JsonAlertGeneral.push({
 				  Frequency : "WEEKLY",
 				  NoOfDaysPend : "9",
 				  Status : "WEST"
 				});

 				oCDASHM1JsonAlertGeneral.push({
 				  Frequency : "WEEKLY",
 				  NoOfDaysPend : "10",
 				  Status : "AWAP"
 				});

 				oCDASHM1JsonAlertGeneral.push({
 				  Frequency : "DAILY",
 				  NoOfDaysPend : "9",
 				  Status : "HOLD"
 				});

 				oCDASHM1JsonAlertGeneral.push({
 				  Frequency : "",
 				  NoOfDaysPend : "",
 				  Status : ""
 				});

 				oCDASHM1JsonAlertGeneral.push({
 				  Frequency : "",
 				  NoOfDaysPend : "",
 				  Status : ""
 				});*/

 				if (oCDASHM1JsonAlertGeneral.length == 0) {
 					console.log("Get Alert for General success; but returned nothing");
 				} else {
 					console.log("Get Alert for General success");
 					var oCDASHM1ModelAlertGeneral = new sap.ui.model.json.JSONModel();
 					oCDASHM1ModelAlertGeneral.setData({
 						modelData: oCDASHM1JsonAlertGeneral
 					});

 					var oCDASHM1AlertGeneralTable = sap.ui.getCore().byId("idCDASHM1AlertGeneralTable");
 					oCDASHM1AlertGeneralTable.setModel(oCDASHM1ModelAlertGeneral);
 					oCDASHM1AlertGeneralTable.bindRows("/modelData");
 					busyDialog.close();
 				}

 			},
 			function (error) {
 				console.log("Get Alert for General Failure");
 				busyDialog.close();
 			});

 	},

 	openDepotContact: function (oEvent, depot) {

 		var contactPlacement = sap.m.PlacementType.Left;

 		var Address = "";
 		var PostalCode = "";
 		var Country = "";
 		var Fax = "";
 		var Phone = "";
 		var Email = "";
 		var Contact = "";

 		var urlToSap = "depotcontactSet(IvDepot='" + depot + "')";
 		urlToSap = serviceDEP + urlToSap;
 		oModel = new sap.ui.model.odata.ODataModel(serviceDEP, true);
 		busyDialog.open();
 		console.log(urlToSap);
 		OData.request({
 				requestUri: urlToSap,
 				method: "GET",
 				dataType: 'json',
 				async: false,
 				headers: {
 					"X-Requested-With": "XMLHttpRequest",
 					"Content-Type": "application/json; charset=utf-8",
 					"DataServiceVersion": "2.0",
 					"X-CSRF-Token": "Fetch"
 				}
 			},
 			function (data, response) {
 				console.log("Get Contact Success");
 				Address = data.Address;
 				PostalCode = data.PostalCode;
 				Country = data.Country;
 				Fax = data.Fax;
 				Phone = data.Phone;
 				Email = data.Email;
 				Contact = data.Contact;
 				busyDialog.close();
 			},
 			function (error) {
 				sap.ui.commons.MessageBox.alert("Sorry, there is an error");
 				console.log("Get Contact Failure");
 				busyDialog.close();
 			});

 		/* Address */

 		var oCDASHM1TableStatusMonitorDepotContactValueAddress = new sap.m.Label({
 			text: Address,
 		}).addStyleClass("selectionLabelsContact");

 		var oCDASHM1TableStatusMonitorDepotContactLabelAddress = new sap.m.Label({
 			text: "Address : ",
 			labelFor: oCDASHM1TableStatusMonitorDepotContactValueAddress,
 			width: "100px"
 		}).addStyleClass("selectionLabelsLabelContact");

 		var oCDASHM1TableStatusMonitorDepotContactFlexAddress = new sap.m.FlexBox({
 			items: [oCDASHM1TableStatusMonitorDepotContactLabelAddress,
 				oCDASHM1TableStatusMonitorDepotContactValueAddress
 			],
 			direction: "Row"
 		});

 		/* Country */

 		var oCDASHM1TableStatusMonitorDepotContactValueCountry = new sap.m.Label({
 			text: Country,
 		}).addStyleClass("selectionLabelsContact");

 		var oCDASHM1TableStatusMonitorDepotContactLabelCountry = new sap.m.Label({
 			//text : "Country : ",
 			labelFor: oCDASHM1TableStatusMonitorDepotContactValueCountry,
 			width: "100px"
 		}).addStyleClass("selectionLabelsLabelContact");

 		var oCDASHM1TableStatusMonitorDepotContactFlexCountry = new sap.m.FlexBox({
 			items: [oCDASHM1TableStatusMonitorDepotContactLabelCountry,
 				oCDASHM1TableStatusMonitorDepotContactValueCountry
 			],
 			direction: "Row"
 		});

 		/* Postal Code */

 		var oCDASHM1TableStatusMonitorDepotContactValuePostal = new sap.m.Label({
 			text: PostalCode,
 		}).addStyleClass("selectionLabelsContact");

 		var oCDASHM1TableStatusMonitorDepotContactLabelPostal = new sap.m.Label({
 			text: "Postal Code : ",
 			labelFor: oCDASHM1TableStatusMonitorDepotContactValuePostal,
 			width: "100px"
 		}).addStyleClass("selectionLabelsLabelContact");

 		var oCDASHM1TableStatusMonitorDepotContactFlexPostal = new sap.m.FlexBox({
 			items: [oCDASHM1TableStatusMonitorDepotContactLabelPostal,
 				oCDASHM1TableStatusMonitorDepotContactValuePostal
 			],
 			direction: "Row"
 		});

 		/* Fax */

 		var oCDASHM1TableStatusMonitorDepotContactValueFax = new sap.m.Label({
 			text: Fax,
 		}).addStyleClass("selectionLabelsContact");

 		var oCDASHM1TableStatusMonitorDepotContactLabelFax = new sap.m.Label({
 			text: "Fax : ",
 			labelFor: oCDASHM1TableStatusMonitorDepotContactValueFax,
 			width: "100px"
 		}).addStyleClass("selectionLabelsLabelContact");

 		var oCDASHM1TableStatusMonitorDepotContactFlexFax = new sap.m.FlexBox({
 			items: [oCDASHM1TableStatusMonitorDepotContactLabelFax,
 				oCDASHM1TableStatusMonitorDepotContactValueFax
 			],
 			direction: "Row"
 		});

 		/* Phone */

 		var oCDASHM1TableStatusMonitorDepotContactValuePhone = new sap.m.Label({
 			text: Phone,
 		}).addStyleClass("selectionLabelsContact");

 		var oCDASHM1TableStatusMonitorDepotContactLabelPhone = new sap.m.Label({
 			text: "Phone : ",
 			labelFor: oCDASHM1TableStatusMonitorDepotContactValuePhone,
 			width: "100px"
 		}).addStyleClass("selectionLabelsLabelContact");

 		var oCDASHM1TableStatusMonitorDepotContactFlexPhone = new sap.m.FlexBox({
 			items: [oCDASHM1TableStatusMonitorDepotContactLabelPhone,
 				oCDASHM1TableStatusMonitorDepotContactValuePhone
 			],
 			direction: "Row"
 		});

 		/* Mail ID */

 		var oCDASHM1TableStatusMonitorDepotContactValueMailid = new sap.m.Link({
 			text: Email,
 			press: function (oEvent) {
 				var email = oEvent.getSource().getProperty("text");
 				//window.location.href = "mailto:user@example.com?subject=Subject&body=message%20goes%20here";
 				window.location.href = "mailto:" + email;
 			}
 		}).addStyleClass("selectionLabelsContactEmailLink");

 		var oCDASHM1TableStatusMonitorDepotContactLabelMailid = new sap.m.Label({
 			text: "Mail : ",
 			labelFor: oCDASHM1TableStatusMonitorDepotContactValueMailid,
 			width: "100px"
 		}).addStyleClass("selectionLabelsLabelContact");

 		var oCDASHM1TableStatusMonitorDepotContactFlexMailid = new sap.m.FlexBox({
 			items: [oCDASHM1TableStatusMonitorDepotContactLabelMailid,
 				oCDASHM1TableStatusMonitorDepotContactValueMailid
 			],
 			direction: "Row"
 		});

 		/* Contact */

 		var oCDASHM1TableStatusMonitorDepotContactValueContact = new sap.m.Label({
 			text: Contact,
 		}).addStyleClass("selectionLabelsContact");

 		var oCDASHM1TableStatusMonitorDepotContactLabelContact = new sap.m.Label({
 			text: "Contact : ",
 			labelFor: oCDASHM1TableStatusMonitorDepotContactValueContact,
 			width: "100px"
 		}).addStyleClass("selectionLabelsLabelContact");

 		var oCDASHM1TableStatusMonitorDepotContactFlexContact = new sap.m.FlexBox({
 			items: [oCDASHM1TableStatusMonitorDepotContactLabelContact,
 				oCDASHM1TableStatusMonitorDepotContactValueContact
 			],
 			direction: "Row"
 		});

 		var oCDASHM1TableStatusMonitorDepotContactFlex = new sap.m.FlexBox({
 			items: [ //oCDASHM1TableStatusMonitorDepotContactFlexDepotName,
 				//oCDASHM1TableStatusMonitorDepotContactFlexLocation,
 				oCDASHM1TableStatusMonitorDepotContactFlexAddress,
 				oCDASHM1TableStatusMonitorDepotContactFlexCountry,
 				oCDASHM1TableStatusMonitorDepotContactFlexPostal,
 				oCDASHM1TableStatusMonitorDepotContactFlexMailid,
 				oCDASHM1TableStatusMonitorDepotContactFlexPhone,
 				oCDASHM1TableStatusMonitorDepotContactFlexFax,
 				oCDASHM1TableStatusMonitorDepotContactFlexContact
 			],
 			direction: "Column"
 		});

 		if (sap.ui.getCore().byId("idCDASHM1TableStatusMonitorDepotContact") != undefined)
 			sap.ui.getCore().byId("idCDASHM1TableStatusMonitorDepotContact").destroy();

 		var oCDASHM1TableStatusMonitorDepotContact = new sap.m.Popover("idCDASHM1TableStatusMonitorDepotContact", {
 			title: "Depot Contact",
 			modal: false,
 			placement: contactPlacement,
 			footer: new sap.m.Bar({
 				visible: false,
 				contentRight: [
 					new sap.m.Button({
 						text: "Close",
 						icon: "sap-icon://close",
 						press: function () {
 							sap.ui.getCore().byId("idCDASHM1TableStatusMonitorDepotContact").close();
 						}
 					})
 				],
 			}),
 			content: new sap.m.VBox({
 				//width:"300px",
 				items: [oCDASHM1TableStatusMonitorDepotContactFlex]
 			}),

 		}).addStyleClass("sapUiPopupWithPadding");

 		oCDASHM1TableStatusMonitorDepotContact.openBy(oEvent.getSource());

 	}

 });
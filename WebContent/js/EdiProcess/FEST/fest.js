// MAC04022019

// replaced new sap.m.Input with new sap.ui.commons.TextField
// added styleclasses FormInputStyle marginTop7 RepairNotes to all new sap.ui.commons.TextField


// replaced new sap.m.Label with new sap.ui.commons.Label
// replaced selectionLabels with marginTop10

// replaced sap.m.ComboBox with sap.ui.commons.ComboBox
// added styleclass FormInputStyle marginTop7

//MAC04022019
var oJSONFESTSAPData = [];
var oSTRINGFESTValidationMessage = "";
var globalEstAmount = 0;
var globalFESTStringCount = 0;
var globalIsSubmitFlag = false;

var globalLabCostC = "";
var globalLabCostM = "";

var aResponsCode = [];

sap.ui.model.json.JSONModel.extend("fest", {

	/*FEST : Create Lessee Approval Pages */

	createFESTPage : function(){

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

        var oFESTComboDepot = new sap.ui.commons.ComboBox("idFESTComboDepot",{
        	visible: true,
            width:"300px",
            displaySecondaryValues:true,
            placeholder: "Depot",
            selectionChange: function(evnt){
								oCurrent.resetFESTKeyFields();
            },
            }).addStyleClass("FormInputStyle marginTop7");

        var oFESTModelDepot = new sap.ui.model.json.JSONModel();
        oFESTModelDepot.setSizeLimit(99999);
        oFESTModelDepot.setData({data:depotEdiData});

        oFESTComboDepot.setModel(oFESTModelDepot);
        oFESTComboDepot.setSelectedKey(depotEdiData[0].key);
        oFESTComboDepot.bindItems("/data", new sap.ui.core.ListItem({text: "{text}", key:"{key}"}));

				// var oCombo = sap.ui.getCore().byId("idFESTComboDepot"),
        // oPopOver = oCombo.getPicker();
				// oPopOver.setContentHeight("400px");

        //oFESTComboDepot.setEnabled(depotEnabled);

//        if(depotEnabled){
//        	oFESTComboDepot.setSelectedKey(depotEdiData[0].key);
//        }else{
//        	oFESTComboDepot.setSelectedKey(depotEdiData[1].key);
//        }


        var oFESTLabelDepot = new sap.ui.commons.Label("idFESTLabelDepot",{
																  text : "Depot",
																	required : true,
																  width : "130px"
        											}).addStyleClass("marginTop10");

		var oFESTFlexDepot = new sap.m.FlexBox("idFESTFlexDepot",{
            items: [oFESTLabelDepot,
                    oFESTComboDepot
                    ],
            direction: "Row",
						width : "500px"
		}).addStyleClass("marginMainLeft1 marginTop20");

		var oFESTExcelContainer = new sap.ui.core.HTML("idFESTExcelContainer",{
			//visible : false
		}).addStyleClass("marginLeft marginTop20");
        var oFESTExcelHTML = '<div id="idFESTExcel" style="width:95%;height:500px" class="marginMainLeft marginTop20">';
        oFESTExcelContainer.setContent(oFESTExcelHTML);

        /*******************************/
        /* Serial Number and Reference */
        /* Serial Number */

        var oFESTInputSerial = new sap.ui.commons.TextField("idFESTInputSerial",{
            value : "",
            width : "130px",
						liveChange : function(){
							oCurrent.resetFESTKeyFields();
						},
            //type: sap.m.InputType.Number
            maxLength: 11
        }).addStyleClass("FormInputStyle marginTop7");

        var oFESTLabelSerial = new sap.ui.commons.Label("idFESTLabelSerial",{
			  text : "Serial No.",
				required : true,
			  width : "130px"
        }).addStyleClass("marginTop10");


		var oFESTFlexSerial = new sap.m.FlexBox("idFESTFlexSerial",{
		             items: [oFESTLabelSerial,
		                     oFESTInputSerial
		                     ],
		             width: "280px",
		             direction: "Row"
		});

		/*******************************/
        /* Date and Amount */
        /* Estimate Date */


        var oFESTInputEstDate = new sap.ui.commons.DatePicker("idFESTInputEstDate",{
          	//displayFormat : "dd/MM/yyyy",
          	//valueFormat : "yyyyMMdd",
          	//value : ,
						//value: yyyymmddtoday(),
						value: {
						  path: yyyymmddtoday(),
					  	type: new sap.ui.model.type.Date({pattern: "dd/MM/yyyy"})},
						editable : false,
						change : function(){
							oCurrent.resetFESTKeyFields();
						},
          	width : "155px"
          }).addStyleClass("FormInputStyle marginTop7 dateDisabledBorder");

        var oFESTLabelEstDate = new sap.ui.commons.Label("idFESTLabelEstDate",{
			  text : "Estimate Date",
				required : true,
			  width : "130px"
        }).addStyleClass("marginTop10");


		var oFESTFlexEstDate = new sap.m.FlexBox("idFESTFlexEstDate",{
		             items: [oFESTLabelEstDate,
		                     oFESTInputEstDate
		                     ],
		             width: "250px",
		             direction: "Row"
		});

		/* Lab. Rate */

        var oFESTInputLabRate = new sap.ui.commons.TextField("idFESTInputLabRate",{
            value : "",
            width : "130px",
            enabled : false,
            type: sap.m.InputType.Number
        }).addStyleClass("FormInputStyle marginTop7 valuesDisabled");

        var oFESTLabelLabRate = new sap.ui.commons.Label("idFESTLabelLabRate",{
			  text : "Lab. Rate",
			  width : "130px"
        }).addStyleClass("marginTop10");


		var oFESTFlexLabRate = new sap.m.FlexBox("idFESTFlexLabRate",{
		             items: [oFESTLabelLabRate,
		                     oFESTInputLabRate
		                     ],
		             width: "350px",
		             direction: "Row"
		});

		/* Lab. Rate Machinery */

        var oFESTInputLabRateM = new sap.ui.commons.TextField("idFESTInputLabRateM",{
            value : "",
            width : "130px",
            enabled : false,
            type: sap.m.InputType.Number
        }).addStyleClass("FormInputStyle marginTop7 valuesDisabled");

        var oFESTLabelLabRateM = new sap.ui.commons.Label("idFESTLabelLabRateM",{
			  text : "Lab. Rate Machinery",
			  width : "130px"
        }).addStyleClass("marginTop10");


		var oFESTFlexLabRateM = new sap.m.FlexBox("idFESTFlexLabRateM",{
		             items: [oFESTLabelLabRateM,
		                     oFESTInputLabRateM
		                     ],
		             width: "350px",
		             direction: "Row"
		});

		/* DPP Limit */

        var oFESTInputDppLimit = new sap.ui.commons.TextField("idFESTInputDppLimit",{
            value : "",
            width : "130px",
            enabled : false,
            type: sap.m.InputType.Number
        }).addStyleClass("FormInputStyle marginTop7 valuesDisabled");

        var oFESTLabelDppLimit = new sap.ui.commons.Label("idFESTLabelDppLimit",{
			  text : "SCR Limit Amt.",
			  width : "130px"
        }).addStyleClass("marginTop10");


		var oFESTFlexDppLimit = new sap.m.FlexBox("idFESTFlexDppLimit",{
		             items: [oFESTLabelDppLimit,
		                     oFESTInputDppLimit
		                     ],
		             width: "350px",
		             direction: "Row"
		});

		/* DPP Curr */

        var oFESTInputDppCurr = new sap.ui.commons.TextField("idFESTInputDppCurr",{
            value : "",
            width : "130px",
            enabled : false
        }).addStyleClass("FormInputStyle marginTop7 valuesDisabled");

        var oFESTLabelDppCurr = new sap.ui.commons.Label("idFESTLabelDppCurr",{
			  text : "SCR Limit Curr.",
			  width : "130px"
        }).addStyleClass("marginTop10");


		var oFESTFlexDppCurr = new sap.m.FlexBox("idFESTFlexDppCurr",{
		             items: [oFESTLabelDppCurr,
		                     oFESTInputDppCurr
		                     ],
		             width: "350px",
		             direction: "Row"
		});

		/* Notes1 */

        var oFESTInputNotes1 = new sap.ui.commons.TextField("idFESTInputNotes1",{
            value : "",
            placeholder : "",
            width : "400px",
            maxLength: 70,
            type: sap.m.InputType.Number
        }).addStyleClass("FormInputStyle marginTop7 RepairNotes");

				oFESTInputNotes1.onfocusin =  function(e) {
					this.setValueState(sap.ui.core.ValueState.None);
					this.setPlaceholder("Cargo Worthy");
				};

				oFESTInputNotes1.onfocusout =  function(e) {
					if(isNaN(e.target.value)){
						this.setValueState(sap.ui.core.ValueState.Error);
						this.setPlaceholder("Cargo Worthy");
						this.setValue("");
					}else{
						this.setValueState(sap.ui.core.ValueState.None);
						this.setPlaceholder("Cargo Worthy");
					}
				};

        var oFESTLabelNotes1 = new sap.ui.commons.Label("idFESTLabelNotes1",{
			  text : "Cargo Worthy",
			  width : "130px",
				required : true
        }).addStyleClass("marginTop10");


		var oFESTFlexNotes1 = new sap.m.FlexBox("idFESTFlexNotes1",{
		             items: [oFESTLabelNotes1,
		                     oFESTInputNotes1
		                     ],
		             width: "340px",
		             direction: "Row"
		});

		/* Notes2 */

        var oFESTInputNotes2 = new sap.ui.commons.TextField("idFESTInputNotes2",{
            value : "",
            width : "400px",
            maxLength: 70
            //type: sap.m.InputType.Number
        }).addStyleClass("FormInputStyle marginTop7 RepairNotes");

        var oFESTLabelNotes2 = new sap.ui.commons.Label("idFESTLabelNotes2",{
			  text : "Notes 2",
			  width : "130px"
        }).addStyleClass("marginTop10");


		var oFESTFlexNotes2 = new sap.m.FlexBox("idFESTFlexNotes2",{
		             items: [oFESTLabelNotes2,
		                     oFESTInputNotes2
		                     ],
		             width: "340px",
		             direction: "Row"
		});

		/* Notes3 */

        var oFESTInputNotes3 = new sap.ui.commons.TextField("idFESTInputNotes3",{
            value : "",
            width : "400px",
            maxLength: 70
            //type: sap.m.InputType.Number
        }).addStyleClass("FormInputStyle marginTop7 RepairNotes");

        var oFESTLabelNotes3 = new sap.ui.commons.Label("idFESTLabelNotes3",{
			  text : "Notes 3",
			  width : "130px"
        }).addStyleClass("marginTop10");


		var oFESTFlexNotes3 = new sap.m.FlexBox("idFESTFlexNotes3",{
		             items: [oFESTLabelNotes3,
		                     oFESTInputNotes3
		                     ],
		             width: "340px",
		             direction: "Row"
		});

		/* Notes4 */

        var oFESTInputNotes4 = new sap.ui.commons.TextField("idFESTInputNotes4",{
            value : "",
            width : "400px",
            maxLength: 70
            //type: sap.m.InputType.Number
        }).addStyleClass("FormInputStyle marginTop7 RepairNotes");

        var oFESTLabelNotes4 = new sap.ui.commons.Label("idFESTLabelNotes4",{
			  text : "Notes 4",
			  width : "130px"
        }).addStyleClass("marginTop10");


		var oFESTFlexNotes4 = new sap.m.FlexBox("idFESTFlexNotes4",{
		             items: [oFESTLabelNotes4,
		                     oFESTInputNotes4
		                     ],
		             width: "340px",
		             direction: "Row"
		});

		/* Notes5 */

        var oFESTInputNotes5 = new sap.ui.commons.TextField("idFESTInputNotes5",{
            value : "",
            width : "400px",
            maxLength: 70
            //type: sap.m.InputType.Number
        }).addStyleClass("FormInputStyle marginTop7 RepairNotes");

        var oFESTLabelNotes5 = new sap.ui.commons.Label("idFESTLabelNotes5",{
			  text : "Notes 5",
			  width : "130px"
        }).addStyleClass("marginTop10");


		var oFESTFlexNotes5 = new sap.m.FlexBox("idFESTFlexNotes5",{
		             items: [oFESTLabelNotes5,
		                     oFESTInputNotes5
		                     ],
		             width: "340px",
		             direction: "Row"
		});


		/* Status */

		var oFESTComboStatus = new sap.ui.commons.ComboBox("idFESTComboStatus", {
			//layoutData: new sap.ui.layout.GridData({span: "L4 M9 S12"}),
			width : "155px",
			 change : function(){
				 oCurrent.resetFESTKeyFields();
			 }
		}).addStyleClass("FormInputStyle marginTop7");

		oFESTComboStatus.addItem(new sap.ui.core.ListItem({
										text:"Original Estimate - D",
										key: "D"
			}));

		oFESTComboStatus.addItem(new sap.ui.core.ListItem({
									key:"E",
									text: "Joint Survey - E"
			}));

		oFESTComboStatus.addItem(new sap.ui.core.ListItem({
										key:"G",
										text: "JS with Customer Appr.- G"
				}));

		oFESTComboStatus.addItem(new sap.ui.core.ListItem({
											key:"L",
											text: "Lessor Survey- L"
		}));


		/*oFESTComboStatus.addItem(new sap.ui.core.ListItem({
										text:"Additional Concealed Damage - QA",
										key: "QA"
										}));

		oFESTComboStatus.addItem(new sap.ui.core.ListItem({
			key:"QB",
			text: "Additional Age Related Deterioration - QB"
			}));

		oFESTComboStatus.addItem(new sap.ui.core.ListItem({
										text:"Additional Component Failure - QC",
										key: "QC"
										}));

		oFESTComboStatus.addItem(new sap.ui.core.ListItem({
			key:"QD",
			text: "Additional Special Modification - QD"
			}));

		oFESTComboStatus.addItem(new sap.ui.core.ListItem({
										text:"Additional Special Cleaning - QE",
										key: "QE"
										}));

										oFESTComboStatus.addItem(new sap.ui.core.ListItem({
																		text:"Superseding Estimate - V",
																		key: "V"
																		}));


		oFESTComboStatus.addItem(new sap.ui.core.ListItem({
										text:"Pre-Delivery - X",
										key: "X"
										}));

		oFESTComboStatus.addItem(new sap.ui.core.ListItem({
			text:"Pre-Sale - Z",
			key: "Z"
		}));*/


        var oFESTLabelStatus = new sap.ui.commons.Label("idFESTLabelStatus",{
			  text : "Est. Type",
				required : true,
			  width : "130px"
        }).addStyleClass("marginTop10");


		var oFESTFlexStatus = new sap.m.FlexBox("idFESTFlexStatus",{
		             items: [oFESTLabelStatus,
		                     oFESTComboStatus
		                     ],
		             width: "330px",
		             direction: "Row"
		});

		/* Grade */


		var oFESTComboGrade = new sap.ui.commons.ComboBox("idFESTComboGrade", {
			//layoutData: new sap.ui.layout.GridData({span: "L4 M9 S12"}),
			//width:"100%",
			width : "155px",
			 selectionChange : function(){
				 oCurrent.resetFESTKeyFields();
			 },
		}).addStyleClass("FormInputStyle marginTop7");

		oFESTComboGrade.addItem(new sap.ui.core.ListItem({
			text:"1",
			key: "1"
			}));

		oFESTComboGrade.addItem(new sap.ui.core.ListItem({
										text:"2",
										key: "2"
										}));

										oFESTComboGrade.addItem(new sap.ui.core.ListItem({
																		text:"3",
																		key: "3"
																		}));





        var oFESTLabelGrade = new sap.ui.commons.Label("idFESTLabelGrade",{
			  text : "Sale Grade",
				required : true,
			  width : "130px"
        }).addStyleClass("marginTop10");


		var oFESTFlexGrade = new sap.m.FlexBox("idFESTFlexGrade",{
		             items: [oFESTLabelGrade,
		                     oFESTComboGrade
		                     ],
		             width: "280px",
		             direction: "Row"
		});

		/* Upc */

		var oFESTComboUpc = new sap.ui.commons.ComboBox("idFESTComboUpc", {
			//layoutData: new sap.ui.layout.GridData({span: "L4 M9 S12"}),
			width:"155px",
			change : function(){
				oCurrent.resetFESTKeyFields();
			}
		}).addStyleClass("FormInputStyle marginTop7");

		oFESTComboUpc.addItem(new sap.ui.core.ListItem({
			text:"Carcass",
			key: "C"
			}));

		oFESTComboUpc.addItem(new sap.ui.core.ListItem({
										text:"Machinery",
										key: "M"
										}));

										oFESTComboUpc.addItem(new sap.ui.core.ListItem({
																		text:"Combined",
																		key: "R"
																		}));


        var oFESTLabelUpc = new sap.ui.commons.Label("idFESTLabelUpc",{
			  text : "Unit Part Code",
				required : true,
			  width : "130px"
        }).addStyleClass("marginTop10");


		var oFESTFlexUpc = new sap.m.FlexBox("idFESTFlexUpc",{
		             items: [oFESTLabelUpc,
		                     oFESTComboUpc
		                     ],
		             width: "250px",
		             direction: "Row"
		});

		/* Make everything into flex box - header */

		//MAC04022019+
		// var oFlxRepHeader1 = new sap.m.FlexBox({
		// 				items: [
		// 								oFESTLabelDepot,
		// 								new sap.ui.commons.Label( {text: " ",width : '8px'}),
		// 								oFESTComboDepot,
		// 								new sap.ui.commons.Label( {text: " ",width : '8px'}),
		// 								oFESTLabelSerial,
		// 								new sap.ui.commons.Label( {text: " ",width : '8px'}),
		// 								oFESTInputSerial,
		// 								new sap.ui.commons.Label( {text: " ",width : '8px'})
		// 								],
		// 								direction: "Row",
		// 								//layoutData: new sap.ui.layout.GridData({span: "L12 M12 S12",linebreak: false, margin: false}),
		// 			});
		//
		// 			var oFlxRepHeader2 = new sap.m.FlexBox({
		// 							items: [
		// 											oFESTLabelEstDate,
		// 											new sap.ui.commons.Label( {text: " ",width : '8px'}),
		// 											oFESTInputEstDate,
		// 											new sap.ui.commons.Label( {text: " ",width : '8px'}),
		// 											oFESTLabelUpc,
		// 											new sap.ui.commons.Label( {text: " ",width : '8px'}),
		// 											oFESTComboUpc,
		// 											new sap.ui.commons.Label( {text: " ",width : '8px'}),
		// 											oFESTLabelStatus,
		// 											new sap.ui.commons.Label( {text: " ",width : '8px'}),
		// 											oFESTComboStatus,
		// 											new sap.ui.commons.Label( {text: " ",width : '8px'})
		// 											],
		// 											direction: "Row",
		// 											//layoutData: new sap.ui.layout.GridData({span: "L12 M12 S12",linebreak: false, margin: false}),
		// 						});
		//
		// 			var oFlxRepNotes = new sap.m.FlexBox({
		// 							items: [
		// 								//new sap.ui.commons.Label( {text: " ",width : '8px'}),
		// 								new sap.m.FlexBox({items: [
		// 																					 oFESTLabelNotes1,
		// 																					 new sap.ui.commons.Label( {text: " ",width : '8px'}),
		// 																					 oFESTInputNotes1,
		// 																					 new sap.ui.commons.Label( {text: " ",width : '8px'}),
		// 																					 oFESTLabelNotes2,
		// 																					 new sap.ui.commons.Label( {text: " ",width : '8px'}),
		// 																					 oFESTInputNotes2,
		// 																					 new sap.ui.commons.Label( {text: " ",width : '8px'}),
		// 																					 oFESTLabelNotes3,
		// 																					 new sap.ui.commons.Label( {text: " ",width : '8px'}),
		// 																					 oFESTInputNotes3,
		// 																					 new sap.ui.commons.Label( {text: " ",width : '8px'})
		// 																					],
		// 																					 direction: "Row"}),
		// 								//new sap.ui.commons.Label( {text: " ",width : '8px'}),
		// 								new sap.m.FlexBox({items: [
		// 																					 oFESTLabelNotes4,
		// 																					 new sap.ui.commons.Label( {text: " ",width : '8px'}),
		// 																					 oFESTInputNotes4,
		// 																					 new sap.ui.commons.Label( {text: " ",width : '8px'}),
		// 																					 oFESTLabelNotes5,
		// 																					 new sap.ui.commons.Label( {text: " ",width : '8px'}),
		// 																					 oFESTInputNotes5,
		// 																					 new sap.ui.commons.Label( {text: " ",width : '8px'})
		// 																					],
		// 																					direction: "Row"}),
		// 							 new sap.ui.commons.Label( {text: " ",width : '8px'}),
		// 							],
		// 							direction: "Column"
		// 						});
		//
		// 			var oFlxRepNotesHeader = new sap.m.FlexBox({
		// 							items: [
		// 									oFlxRepHeader1, oFlxRepHeader2, oFlxRepNotes,
		// 									//new sap.ui.commons.HorizontalDivider({width: "100%", type: "Area", height: "Medium"}).addStyleClass("marginTop7")
		// 							],
		// 							direction: "Column"
		// 						});
		//MAC04022019+

		var oFESTDivider = new sap.ui.commons.HorizontalDivider({width: "95%", type: "Area", height: "Medium"});

		/* Customer Code */

        var oFESTInputCustomerCode = new sap.ui.commons.TextField("idFESTInputCustomerCode",{
            value : "",
            width : "130px",
            //type: sap.m.InputType.Number,
            enabled : false
        }).addStyleClass("FormInputStyle marginTop7 valuesDisabled");

        var oFESTLabelCustomerCode = new sap.ui.commons.Label("idFESTLabelCustomerCode",{
			  text : "Customer Code",
			  width : "130px"
        }).addStyleClass("marginTop10");


		var oFESTFlexCustomerCode = new sap.m.FlexBox("idFESTFlexCustomerCode",{
		             items: [oFESTLabelCustomerCode,
		                     oFESTInputCustomerCode
		                     ],
		             width: "350px",
		             direction: "Row"
		});

		/* Reference */

        var oFESTInputReference = new sap.ui.commons.TextField("idFESTInputReference",{
            value : "",
						width : "200px",
						placeholder : "Reference",
            //type: sap.m.InputType.Number,
            enabled : false
        }).addStyleClass("FormInputStyle marginTop7 valuesDisabled");

        var oFESTLabelReference = new sap.ui.commons.Label("idFESTLabelReference",{
			  text : "Reference",
				width : "130px"
        }).addStyleClass("marginTop10");


		var oFESTFlexReference = new sap.m.FlexBox("idFESTFlexReference",{
		             items: [oFESTLabelReference,
		                     oFESTInputReference
		                     ],
		             width: "350px",
		             direction: "Row"
		});

		/* Amount */

				var oFESTInputAmount = new sap.ui.commons.TextField("idFESTInputAmount",{
						value : "",
						width : "130px",
						//type: sap.m.InputType.Number,
						enabled : false
				}).addStyleClass("FormInputStyle marginTop7 valuesDisabled");

				// oFESTInputAmount.onfocusin =  function(e) {
				// 	this.setValueState(sap.ui.core.ValueState.None);
				// 	this.setPlaceholder("Amount");
				// };

				// oFESTInputAmount.onfocusout =  function(e) {
				// 	if(isNaN(e.target.value)){
				// 		this.setValueState(sap.ui.core.ValueState.Error);
				// 		this.setPlaceholder("Amount");
				// 		this.setValue("");
				// 	}else{
				// 		this.setValueState(sap.ui.core.ValueState.None);
				// 		this.setPlaceholder("Amount");
				// 	}
				// };

				var oFESTLabelAmount = new sap.ui.commons.Label("idFESTLabelAmount",{
				text : "Amount",
				width : "130px",
				}).addStyleClass("marginTop10");


		var oFESTFlexAmount = new sap.m.FlexBox("idFESTFlexAmount",{
								 items: [oFESTLabelAmount,
												 oFESTInputAmount
												 ],
								 width: "350px",
								 direction: "Row"
		});

		/* Lessee */

        var oFESTInputLessee = new sap.ui.commons.TextField("idFESTInputLessee",{
            value : "",
            width : "250px",
            enabled : false,
            //type: sap.m.InputType.Number
        }).addStyleClass("FormInputStyle marginTop7 valuesDisabled");

        var oFESTLabelLessee = new sap.ui.commons.Label("idFESTLabelLessee",{
			  text : "Lessee",
width : "130px",
        }).addStyleClass("marginTop10");


		var oFESTFlexLessee = new sap.m.FlexBox("idFESTFlexLessee",{
		             items: [oFESTLabelLessee,
		                     oFESTInputLessee
		                     ],
		             width: "350px",
		             direction: "Row"
		});

		/* Redel */

        var oFESTInputRedel = new sap.ui.commons.TextField("idFESTInputRedel",{
            value : "",
            width : "130px",
            enabled : false,
            //type: sap.m.InputType.Number
        }).addStyleClass("FormInputStyle marginTop7 valuesDisabled");

        var oFESTLabelRedel = new sap.ui.commons.Label("idFESTLabelRedel",{
			  text : "Redel. Auth",
width : "130px",
        }).addStyleClass("marginTop10");


		var oFESTFlexRedel = new sap.m.FlexBox("idFESTFlexRedel",{
		             items: [oFESTLabelRedel,
		                     oFESTInputRedel
		                     ],
		             width: "350px",
		             direction: "Row"
		});

		/* Lessee */

        var oFESTInputDppcover = new sap.ui.commons.TextField("idFESTInputDppcover",{
            value : "",
            width : "200px",
            enabled : false,
            //type: sap.m.InputType.Number
        }).addStyleClass("FormInputStyle marginTop7 valuesDisabled");

        var oFESTLabelDppcover = new sap.ui.commons.Label("idFESTLabelDppcover",{
			  text : "SeaCover Limit",
width : "130px",
        }).addStyleClass("marginTop10");


		var oFESTFlexDppcover = new sap.m.FlexBox("idFESTFlexDppcover",{
		             items: [oFESTLabelDppcover,
		                     oFESTInputDppcover
		                     ],
		             width: "420px",
		             direction: "Row"
		});

		/* Prev. On Hire Date */

        var oFESTInputPOHDate = new sap.ui.commons.TextField("idFESTInputPOHDate",{
            value : "",
            width : "130px",
            //type: sap.m.InputType.Number,
            enabled : false
        }).addStyleClass("FormInputStyle marginTop7 valuesDisabled");

        var oFESTLabelPOHDate = new sap.ui.commons.Label("idFESTLabelPOHDate",{
			  text : "Prev. ON Hire Date",
width : "130px",
        }).addStyleClass("marginTop10");


		var oFESTFlexPOHDate = new sap.m.FlexBox("idFESTFlexPOHDate",{
		             items: [oFESTLabelPOHDate,
		                     oFESTInputPOHDate
		                     ],
		             width: "350px",
		             direction: "Row"
		});

		/* Prev. On Hire Location */

        var oFESTInputPOHLocation = new sap.ui.commons.TextField("idFESTInputPOHLocation",{
            value : "",
            width : "130px",
            //type: sap.m.InputType.Number,
            enabled : false
        }).addStyleClass("FormInputStyle marginTop7 valuesDisabled");

        var oFESTLabelPOHLocation = new sap.ui.commons.Label("idFESTLabelPOHLocation",{
			  text : "Prev. ON Hire Loc.",
width : "130px",
        }).addStyleClass("marginTop10");


		var oFESTFlexPOHLocation = new sap.m.FlexBox("idFESTFlexPOHLocation",{
		             items: [oFESTLabelPOHLocation,
		                     oFESTInputPOHLocation
		                     ],
		             width: "350px",
		             direction: "Row"
		});

		/* Exch Rate */

				var oFESTInputExchRate = new sap.ui.commons.TextField("idFESTInputExchRate",{
						value : "",
						width : "130px",
						//type: sap.m.InputType.Number,
						enabled : false
				}).addStyleClass("FormInputStyle marginTop7 valuesDisabled");

				var oFESTLabelExchRate = new sap.ui.commons.Label("idFESTLabelExchRate",{
				text : "Exchange Rate",
width : "130px",
				}).addStyleClass("marginTop10");


		var oFESTFlexExchRate = new sap.m.FlexBox("idFESTFlexExchRate",{
								 items: [oFESTLabelExchRate,
												 oFESTInputExchRate
												 ],
								 width: "350px",
								 direction: "Row"
		});

		/* Prod. Cate */

				var oFESTInputProdCate = new sap.ui.commons.TextField("idFESTInputProdCate",{
						value : "",
						width : "130px",
						//type: sap.m.InputType.Number,
						enabled : false
				}).addStyleClass("FormInputStyle marginTop7 valuesDisabled");

				var oFESTLabelProdCate = new sap.ui.commons.Label("idFESTLabelProdCate",{
				text : "Prod. Category",
width : "130px",
				}).addStyleClass("marginTop10");


		var oFESTFlexProdCate = new sap.m.FlexBox("idFESTFlexProdCate",{
								 items: [oFESTLabelProdCate,
												 oFESTInputProdCate
												 ],
								 width: "350px",
								 direction: "Row"
		});

		/* Gate IN Date */

        var oFESTInputGINDate = new sap.ui.commons.TextField("idFESTInputGINDate",{
            value : "",
            width : "130px",
            //type: sap.m.InputType.Number,
            enabled : false
        }).addStyleClass("FormInputStyle marginTop7 valuesDisabled");

        var oFESTLabelGINDate = new sap.ui.commons.Label("idFESTLabelGINDate",{
			  text : "Gate IN Date",
width : "130px",
        }).addStyleClass("marginTop10");


		var oFESTFlexGINDate = new sap.m.FlexBox("idFESTFlexGINDate",{
		             items: [oFESTLabelGINDate,
		                     oFESTInputGINDate
		                     ],
		             width: "350px",
		             direction: "Row"
		});


		/* Rev Number */

        var oFESTInputRevNo = new sap.ui.commons.TextField("idFESTInputRevNo",{
            value : "",
            width : "130px",
            enabled : false
            //type: sap.m.InputType.Number
        }).addStyleClass("FormInputStyle marginTop7 valuesDisabled");

        var oFESTLabelRevNo = new sap.ui.commons.Label("idFESTLabelRevNo",{
			  text : "Rev. No.",
width : "130px",
        }).addStyleClass("marginTop10");


		var oFESTFlexRevNo = new sap.m.FlexBox("idFESTFlexRevNo",{
		             items: [oFESTLabelRevNo,
		                     oFESTInputRevNo
		                     ],
		             width: "350px",
		             direction: "Row"
		});

		/* Base Currency */

        var oFESTInputBaseCurr = new sap.ui.commons.TextField("idFESTInputBaseCurr",{
            value : "",
            width : "130px",
            enabled : false
            //type: sap.m.InputType.Number
        }).addStyleClass("FormInputStyle marginTop7 valuesDisabled");

        var oFESTLabelBaseCurr = new sap.ui.commons.Label("idFESTLabelBaseCurr",{
			  text : "Depot Curr.",
width : "130px",
        }).addStyleClass("marginTop10");


		var oFESTFlexBaseCurr = new sap.m.FlexBox("idFESTFlexBaseCurr",{
		             items: [oFESTLabelBaseCurr,
		                     oFESTInputBaseCurr
		                     ],
		             width: "350px",
		             direction: "Row"
		});



		var oFESTButtonAdd5 = new sap.m.Button("idFESTButtonAdd5",{
			  text : "Insert 5 Lines",
			  width:"130px",
			  styled:false,
			  visible: false,
			  //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: true}),
			  press:function(){

				  	var oJSONFESTExcelDataLength = oFESTExcel.getData().length;
					var oJSONFESTExcelDataLengthAllowed = 25 - oFESTExcel.getData().length;
					oFESTExcel.alter('insert_row', '', 5);
					/*if(oJSONFESTExcelDataLength < 25){
					if(oJSONFESTExcelDataLength < 20){
						oFESTExcel.alter('insert_row', '', 5);
					}else{
						oFESTExcel.alter('insert_row', '', oJSONFESTExcelDataLengthAllowed);
					}
					}
					else{
					sap.ui.commons.MessageBox.alert("Sorry, Max. Entries is 25!");
					}*/
		}}).addStyleClass("normalBtn");

      var oFESTButtonValidate = new sap.m.Button("idFESTButtonValidate",{
			  text : "Validate",
			  width:"100px",
			  styled:false,
			  visible: true,
			  //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: true}),
			  press:function(){
				  oCurrent.validateFEST("FROMVALIDATE");
		}}).addStyleClass("normalBtn");


				var oFESTButtonRetrieve = new sap.m.Button("idFESTButtonRetrieve",{
					text : "Retrieve",
					width:"100px",
					styled:false,
					visible: true,
					//layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: true}),
					press:function(){
						oCurrent.validateFEST("FROMRETRIEVE");

			}}).addStyleClass("normalBtn");

	      var oFESTButtonReset = new sap.m.Button("idFESTButtonReset",{
			  text : "Reset",
			  width:"100px",
			  styled:false,
			  visible: true,
			  //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: true}),
			  press:function(){
				  oCurrent.resetFEST();
		}}).addStyleClass("normalBtn");

		var oFESTFlexVRButton = new sap.m.FlexBox("idFESTFlexVRButton",{
	          items: [oFESTButtonValidate,
										oFESTButtonRetrieve,
	                  oFESTButtonReset
	                  ],
	          direction: "Row"
			}).addStyleClass("marginMainLeft");

			var oFESTButtonSave = new sap.m.Button("idFESTButtonSave",{
			  text : "Save",
			  width:"100px",
			  styled:false,
			  visible: false,
			  //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: true}),
			  press:function(){
					var isEmpty = oCurrent.checkIfValid();
					var isNumbersAreNumbers = oCurrent.checkIfNumbersAreNumbers();
					var isDropDownsAreValid = oCurrent.checkIfDropDownsAreValid();
					if(isEmpty){
						sap.ui.commons.MessageBox.alert("Hours, Material Cost, Location, Component, Damage, Repair & Responsibility cannot be blank. Please fill them up");
					}else if(!isNumbersAreNumbers){
						sap.ui.commons.MessageBox.alert("Please do not enter alphabets in Rp.Length, Rp.Width, Qty, Lab.Hrs and Material Cost");
					}else if(!isDropDownsAreValid){
						sap.ui.commons.MessageBox.alert("Please check invalid entries");
					}else{
						globalFESTStringCount = 0;
						do {
							oCurrent.submitFEST("SAVE");
						}while (globalFESTStringCount < checkValidLinesLength(oFESTExcel.getData()));
					}
					

		}}).addStyleClass("normalBtn");

      var oFESTButtonSubmit = new sap.m.Button("idFESTButtonSubmit",{
			  text : "Submit",
			  width:"100px",
			  styled:false,
			  visible: false,
			  //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: true}),
			  press:function(){
					// globalFESTStringCount = 0;
					// do {
					//   oCurrent.submitFEST("SUBMIT");
					// }while (globalFESTStringCount < checkValidLinesLength(oFESTExcel.getData()));
					var isEmpty = oCurrent.checkIfValid();
					var isNumbersAreNumbers = oCurrent.checkIfNumbersAreNumbers();
					var isDropDownsAreValid = oCurrent.checkIfDropDownsAreValid();
					if(isEmpty){
						sap.ui.commons.MessageBox.alert("Hours, Material Cost, Location, Component, Damage, Repair & Responsibility cannot be blank. Please fill them up");
					}else if(!isNumbersAreNumbers){
						sap.ui.commons.MessageBox.alert("Please do not enter alphabets in Rp.Length, Rp.Width, Qty, Lab.Hrs and Material Cost");
					}else if(!isDropDownsAreValid){
						sap.ui.commons.MessageBox.alert("Please check invalid entries");
					}else{
						globalFESTStringCount = 0;
						do {
							oCurrent.submitFEST("SUBMIT");
						}while (globalFESTStringCount < checkValidLinesLength(oFESTExcel.getData()));
					}
		}}).addStyleClass("normalBtn");

      var oFESTButtonPrint = new sap.m.Button("idFESTButtonPrint",{
			  text : "Print",
			  width:"100px",
			  styled:false,
			  visible: false,
			  //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: true}),
			  press:function(){

	    	 		  var serialForPrint = sap.ui.getCore().byId("idFESTInputSerial").getValue();
	    	 		  var depotForPrint = sap.ui.getCore().byId("idFESTComboDepot").getValue();

	                  var unitParrtCodeForPrint = sap.ui.getCore().byId("idFESTComboUpc").getValue();
										var unitParrtCodeForLabRate = sap.ui.getCore().byId("idFESTComboUpc").getSelectedKey();

	                  var jobTypeForPrint = sap.ui.getCore().byId("idFESTComboStatus").getValue();
	                  var estimDateForPrint = sap.ui.getCore().byId("idFESTInputEstDate").getYyyymmdd();
	                  if(estimDateForPrint != "")
	                	  estimDateForPrint = estimDateForPrint.substr(6,2) + "/" + estimDateForPrint.substr(4,2) + "/" + estimDateForPrint.substr(0,4);

										globalLabCost = "";
										globalLabCostC = sap.ui.getCore().byId("idFESTInputLabRate").getValue();
										globalLabCostM = sap.ui.getCore().byId("idFESTInputLabRateM").getValue();
										if(unitParrtCodeForLabRate == "C"){
											globalLabCost = globalLabCostC;
										}else if(unitParrtCodeForLabRate == "M"){
											globalLabCost = globalLabCostM;
										}else{
											globalLabCost = 0;
										}

	                  var labrateForPrint = sap.ui.getCore().byId("idFESTInputLabRate").getValue();
										var labrateForPrintM = sap.ui.getCore().byId("idFESTInputLabRateM").getValue();
										var exchangerateForPrint = sap.ui.getCore().byId("idFESTInputExchRate").getValue();

	                  var oFESTInputNotes1 = sap.ui.getCore().byId("idFESTInputNotes1").getValue();
	                  var oFESTInputNotes2 = sap.ui.getCore().byId("idFESTInputNotes2").getValue();
	                  var oFESTInputNotes3 = sap.ui.getCore().byId("idFESTInputNotes3").getValue();
	                  var oFESTInputNotes4 = sap.ui.getCore().byId("idFESTInputNotes4").getValue();
	                  var oFESTInputNotes5 = sap.ui.getCore().byId("idFESTInputNotes5").getValue();

	                  var oFESTInputCustomerCode = sap.ui.getCore().byId("idFESTInputCustomerCode").getValue();
	                  var oFESTInputRedel = sap.ui.getCore().byId("idFESTInputRedel").getValue();

	                  var oFESTInputRevNo = sap.ui.getCore().byId("idFESTInputRevNo").getValue();
	                  var oFESTInputGINDate = sap.ui.getCore().byId("idFESTInputGINDate").getValue();
	                  var oFESTInputBaseCurr = sap.ui.getCore().byId("idFESTInputBaseCurr").getValue();
	                  var oFESTInputPOHDate = sap.ui.getCore().byId("idFESTInputPOHDate").getValue();
	                  var oFESTInputPOHLocation = sap.ui.getCore().byId("idFESTInputPOHLocation").getValue();
	                  var oFESTInputDppLimit = sap.ui.getCore().byId("idFESTInputDppLimit").getValue();
										var oFESTInputDppCurr = sap.ui.getCore().byId("idFESTInputDppCurr").getValue();
	                  var oFESTInputLessee = sap.ui.getCore().byId("idFESTInputLessee").getValue();

										var referenceForPrint = sap.ui.getCore().byId("idFESTInputReference").getValue();
										var amountForPrint = sap.ui.getCore().byId("idFESTInputAmount").getValue();

	                  var customer = oFESTInputCustomerCode + " - " + oFESTInputLessee;

										var printFESTExcel = [];
			 				 			var currExcelData = oFESTExcel.getData();

										var currLength = currExcelData.length;
										var totalLabHrs = 0;
										var totalLabCost = 0;
										var totalMatCost = 0;

										var labCost = "";

										var respCode = "";
										var uomPrint = "";

										for(var i =0; i < currLength; i++){
												loop1 : for(var j =0; j < 12; j++){
													if(currExcelData[i][j] != "" && currExcelData[i][j] != null){

														respCode = (currExcelData[i][11] == null)? "" : currExcelData[i][11].toUpperCase();	// if null, make it space
														uomPrint = (currExcelData[i][7] == null)? "" : currExcelData[i][7];
														uomPrint = uomPrint.toUpperCase();

														// Only if Combined is selected, check if location code starts with "M", then multiply with machinery lab rate
														// Otherwise, keep as either carcass or Machinery

														if(unitParrtCodeForLabRate == "R"){
															if(currExcelData[i][0].substr(0,1) == "M"){	// Machinery Line Item
																globalLabCost = globalLabCostM;
															}else{
																globalLabCost = globalLabCostC;
															}
															labCost = (currExcelData[i][9] == "")? 0 : thousandsep(parseFloat((parseFloat(parseFloat(currExcelData[i][9]).toFixed(2)) * globalLabCost)));
														}else{
															labCost = (currExcelData[i][9] == "")? 0 : thousandsep(parseFloat((parseFloat(parseFloat(currExcelData[i][9]).toFixed(2)) * globalLabCost)));
														}


														if(respCode == ""){

														}else{
															var respCode1 = respCode.substr(0,1);
															if(respCode1 != "X"){
																totalLabHrs = totalLabHrs + parseFloat(currExcelData[i][9]);
																totalLabCost = totalLabCost + parseFloat(labCost.split(',').join(''));
																totalMatCost = totalMatCost + parseFloat(currExcelData[i][10]);
															}
														}

														var description = "";

														//labCost = thousandsep(labCost);

														// loopdesc : for(var x=0; x<currExcelData.length; x++){

																loopcomp : for(var j=0; j<componentCodes.length; j++){
																	if(currExcelData[i][1] != null){
																	if(currExcelData[i][1].toUpperCase() == componentCodes[j].comKey){
																			description = componentCodes[j].comText;
																			break loopcomp;
																	}
																	}
																}

																looprep : for(var j=0; j<repairCodes.length; j++){
																	if(currExcelData[i][4] != null){
																	if(currExcelData[i][4].toUpperCase() == repairCodes[j].repKey){
																			description = (repairCodes[j].repText == "")? "" : (description + " / " + repairCodes[j].repText);
																			break looprep;
																	}
																}
																}

															// 	break loopdesc;
															//
															// }
																// loop1 : for(var j=0; j<locationCodes.length; j++){
																// 	if(currExcelData[i][0] == locationCodes[j].locKey){
																// 			currExcelData[i][0] = locationCodes[j].locKey + "<br>" + locationCodes[j].locText;
																// 			break loop1;
																// 	}
																// }

																// loop2 : for(var j=0; j<componentCodes.length; j++){
																// 	if(currExcelData[i][1] == componentCodes[j].comKey){
																// 			currExcelData[i][1] = componentCodes[j].comKey + "<br>" + componentCodes[j].comText;
																// 			break loop2;
																// 	}
																// }

																// loop3 : for(var j=0; j<damageCodes.length; j++){
																// 	if(currExcelData[i][2] == damageCodes[j].damKey){
																// 			currExcelData[i][2] = damageCodes[j].damKey + "<br>" + damageCodes[j].damText;
																// 			break loop3;
																// 	}
																// }
																//
																// loop4 : for(var j=0; j<materialCodes.length; j++){
																// 	if(currExcelData[i][3] == materialCodes[j].matKey){
																// 			currExcelData[i][3] = materialCodes[j].matKey + "<br>" + materialCodes[j].matText;
																// 			break loop4;
																// 	}
																// }

																// loop5 : for(var j=0; j<repairCodes.length; j++){
																// 	if(currExcelData[i][4] == repairCodes[j].repKey){
																// 			currExcelData[i][4] = repairCodes[j].repKey + "<br>" + repairCodes[j].repText;
																// 			break loop5;
																// 	}
																// }


																		printFESTExcel.push({
																			"Line": padZero(i+1,3) ,
																			"Location" : (currExcelData[i][0] == null)? "" : currExcelData[i][0].toUpperCase(),
																			"Component" : (currExcelData[i][1] == null)? "" : currExcelData[i][1].toUpperCase(),
																			"Damage" : (currExcelData[i][2] == null)? "" : currExcelData[i][2].toUpperCase(),
																			"Material" : (currExcelData[i][3] == null)? "" : currExcelData[i][3].toUpperCase(),
																			"Repair" : (currExcelData[i][4] == null)? "" : currExcelData[i][4].toUpperCase(),
																			"Description" : description,
																			"Length" : (currExcelData[i][5] == null)? "" : currExcelData[i][5],
																			"Width" : (currExcelData[i][6] == null)? "" : currExcelData[i][6],
																			"UOM" : uomPrint,
																			"Quantity" : (currExcelData[i][8] == null)? "" : currExcelData[i][8],
																			"Hours" : (currExcelData[i][9] == null)? "" : thousandsep(currExcelData[i][9]),
																			"Labour Cost" : labCost,
																			"Material Cost" : (currExcelData[i][10] == null)? "" : thousandsep(currExcelData[i][10]),
																			//"Bulletin" : (currExcelData[i][10] == null)? "" : currExcelData[i][10],
																			"Responsibility" : respCode,
																		});
																		break loop1;

																			}
																		}
																	}
																	if(printFESTExcel.length != 0){
																		printFESTExcel.push({
																			"Line": "" ,
																			"Location" : "",
																			"Component" : "",
																			"Damage" : "",
																			"Material" : "",
																			"Repair" : "",
																			"Description" : "",
																			"Length" : "",
																			"Width" : "",
																			"UOM" : "",
																			"Quantity" : "",
																			"Hours" : thousandsep(totalLabHrs),
																			"Labour Cost" : thousandsep(totalLabCost),
																			"Material Cost" : thousandsep(totalMatCost),
																			//"Bulletin" : "",
																			"Responsibility" : ""
																		});
																	}

	               //   var oUtilityEDI = new utility();
	            	  //var tab =  oUtilityEDI.makeHTMLTableEST(
									var tab = oCurrent.printEstimatesFEST(
	            			  						   depotForPrint,
	            			  						   serialForPrint,
	            			  						   "",
	            			  						   unitParrtCodeForPrint,
																		 "",
	            			  						   jobTypeForPrint,
	            			  						   estimDateForPrint,
	            			  						   "",
	            			  						   "",
	            			  						   referenceForPrint,
																		 amountForPrint,
	            			  						   labrateForPrint,
																		 labrateForPrintM,
																		 exchangerateForPrint,

	            			  						  oFESTInputNotes1,
		            			  						oFESTInputNotes2,
		            			  						oFESTInputNotes3,
		            			  						oFESTInputNotes4,
		            			  						oFESTInputNotes5,

		            			  						customer,

		            			  						oFESTInputRedel,
		            			  						oFESTInputRevNo,
		            			  						oFESTInputGINDate,
		            			  						oFESTInputBaseCurr,
		            			  						oFESTInputPOHDate,
		            			  						oFESTInputPOHLocation,
		            			  						oFESTInputDppLimit,
																		oFESTInputDppCurr,

																		unitParrtCodeForLabRate,

	            			  						    printFESTExcel,
	            			  						    "Repair Estimates",
	            			  						    "print" );
		        	  var newWin = window.open();
		        	  newWin.document.write(tab);
		        	  newWin.print();
		}}).addStyleClass("normalBtn");

		var oFESTFlexButtons = new sap.m.FlexBox("idFESTFlexButtons",{
          items: [oFESTButtonAdd5,
									oFESTButtonSave,
                  oFESTButtonSubmit,
                  oFESTButtonPrint
                  ],
          direction: "Row"
		}).addStyleClass("marginMainLeft");


		var oFESTLayoutSelection = new sap.ui.layout.form.ResponsiveGridLayout("idFESTLayoutSelection", {
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

		var oFESTFormSelection = new sap.ui.layout.form.Form("idFESTFormSelection",{
          layout: oFESTLayoutSelection,
          width: "100%",
          formContainers: [
                  new sap.ui.layout.form.FormContainer({
                  	  //title: new sap.ui.core.Title({text: ""}),
                      formElements: [
								new sap.ui.layout.form.FormElement({
									fields: [backEDI],
									layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
								}),

							//	MAC04022019-
								new sap.ui.layout.form.FormElement({
									fields: [oFESTFlexDepot],
									layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
								}),
								new sap.ui.layout.form.FormElement({
									fields: [oFESTFlexSerial, oFESTFlexEstDate, oFESTFlexUpc],
									layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
								}),
								// new sap.ui.layout.form.FormElement({
								// 	fields: [oFESTFlexEstDate],	// oFESTFlexGrade
								// 	layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
								// }),
								new sap.ui.layout.form.FormElement({
									fields: [oFESTFlexStatus, oFESTFlexNotes1, oFESTFlexNotes2],
									layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
								}),
								new sap.ui.layout.form.FormElement({
									fields: [oFESTFlexNotes3, oFESTFlexNotes4, oFESTFlexNotes5],
									layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
								}),
								// new sap.ui.layout.form.FormElement({
								// 	fields: [],
								// 	layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
								// }),
								new sap.ui.layout.form.FormElement({
									fields: [oFESTFlexVRButton], //oFESTFlexButtons
									layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
								}),
								//MAC04022019-
								// MAC04022019+
								// new sap.ui.layout.form.FormElement({
								// 	fields: [oFlxRepNotesHeader]
								// }),
								// new sap.ui.layout.form.FormElement({
								// 	fields: [oFESTFlexVRButton], //oFESTFlexButtons
								// 	layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
								// }),
								// MAC04022019+
								new sap.ui.layout.form.FormElement({
									fields: [oFESTDivider],
									layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
								})

                      ],layoutData: new sap.ui.layout.GridData({span: "L7 M12 S12"})
                  })
          ]
		});

		var oFESTLayoutSelectionAuto = new sap.ui.layout.form.ResponsiveGridLayout("idFESTLayoutSelectionAuto", {
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

		var oFESTFormSelectionAuto = new sap.ui.layout.form.Form("idFESTFormSelectionAuto",{
        layout: oFESTLayoutSelectionAuto,
        width: "90%",
        visible : false,
        formContainers: [
                new sap.ui.layout.form.FormContainer({
                	  //title: new sap.ui.core.Title({text: ""}),
                    formElements: [
								new sap.ui.layout.form.FormElement({
									fields: [oFESTFlexLabRate, oFESTFlexLabRateM, oFESTFlexDppLimit, oFESTFlexDppCurr],
									layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
								}),
								new sap.ui.layout.form.FormElement({
									fields: [oFESTFlexRedel, oFESTFlexRevNo, oFESTFlexGINDate, oFESTFlexBaseCurr],
									layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
								}),
								new sap.ui.layout.form.FormElement({
									fields: [oFESTFlexPOHDate, oFESTFlexPOHLocation, oFESTFlexExchRate, oFESTFlexProdCate],
									layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
								}),
								new sap.ui.layout.form.FormElement({
									fields: [oFESTFlexCustomerCode, oFESTFlexLessee],
									layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
								}),
								new sap.ui.layout.form.FormElement({
									fields: [oFESTFlexReference, oFESTFlexAmount],
									layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
								}),

								new sap.ui.layout.form.FormElement({
									fields: [oFESTFlexButtons],
									layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
								}),

                    ],layoutData: new sap.ui.layout.GridData({span: "L7 M12 S12"})
                })
        ]
		});

			var oFESTFlexFinal = new sap.m.FlexBox("idFESTFlexFinal",{
	            items: [ oFESTFormSelection,
	                     oFESTFormSelectionAuto,
	                     oFESTExcelContainer
	                    ],
	            direction: "Column"
			}).addStyleClass("marginMainLeft");


			return oFESTFlexFinal;

    },

    /*FEST : Submit Repair Completion */

    submitFEST : function(submitorsave){

    var oCurrent = this;
		var stringToPass = "";
		var final = "";
		var lineno = "";
		
		var serialno = sap.ui.getCore().byId("idFESTInputSerial").getValue();
		//var reference = sap.ui.getCore().byId("idFESTInputReference").getValue();
		var estdate = sap.ui.getCore().byId("idFESTInputEstDate").getYyyymmdd();
		//var amount = sap.ui.getCore().byId("idFESTInputAmount").getValue();
		var status = sap.ui.getCore().byId("idFESTComboStatus").getSelectedKey();
		var depot = sap.ui.getCore().byId("idFESTComboDepot").getSelectedKey();
		var stringToPass = "";
		var notes1 = sap.ui.getCore().byId("idFESTInputNotes1").getValue();
		var notes2 = sap.ui.getCore().byId("idFESTInputNotes2").getValue();
		var notes3 = sap.ui.getCore().byId("idFESTInputNotes3").getValue();
		var notes4 = sap.ui.getCore().byId("idFESTInputNotes4").getValue();
		var notes5 = sap.ui.getCore().byId("idFESTInputNotes5").getValue();
		var revno = sap.ui.getCore().byId("idFESTInputRevNo").getValue();
		var labrate = sap.ui.getCore().byId("idFESTInputLabRate").getValue();
		var upc = sap.ui.getCore().byId("idFESTComboUpc").getSelectedKey();
		var reference = sap.ui.getCore().byId("idFESTInputReference").getValue();
		var amount = sap.ui.getCore().byId("idFESTInputAmount").getValue();
		//var grade = sap.ui.getCore().byId("idFESTComboGrade").getSelectedKey();
		var labratec = sap.ui.getCore().byId("idFESTInputLabRate").getValue();
		var labratem = sap.ui.getCore().byId("idFESTInputLabRateM").getValue();
		
		if(submitorsave == "SUBMIT" && status == "G"){
			reference = reference.replace(/\n\s*\n/g, '\n');
			amount = amount.replace(/\n\s*\n/g, '\n');
			if(reference == "" || amount == ""){
				sap.ui.commons.MessageBox.alert("Please fill Reference and Amount!");
				globalFESTStringCount = 9999999;
				return;
			}
		}

		var parameter = serialno + "$*" + status + "$*" + estdate + "$*" + upc + "$*" // + grade + "$*"
						+ notes1 + "@*"
						+ notes2 + "@*"
						+ notes3 + "@*"
						+ notes4 + "@*"
						+ notes5 + "$*"
						//+ globalEstAmount + "$*" +
						+ revno + "$*"
						+ depot + "$*"
						+ reference + "$*"
						+ amount  + "$*"
						+ sessionStorage.uName.toUpperCase() + "$*"
						+ labratec  + "$*"
						+ labratem;

		parameter = encodeURIComponent(parameter);

		var isSubmit = "";
		if(submitorsave == "SUBMIT"){
				isSubmit = 'X';
		}else if(submitorsave == "SAVE"){
				isSubmit = 'S';
		}else if(submitorsave == "RETRIEVE"){
				isSubmit = 'R';
		}

		stringToPass = "Submit eq '" + isSubmit + "' and IHeader eq '" + parameter + "'";

		if(isSubmit == "R"){

			oModel = new sap.ui.model.odata.ODataModel(serviceEDIDOC, true);
			var oMODELFEST = serviceEDIDOC + "FESTSet?$filter=" + stringToPass;
			console.log(oMODELFEST);
			busyDialog.open();

				OData.request({
				      requestUri: oMODELFEST,
				      method: "GET",
				      dataType: 'json',
							//async : false,
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
								return;
							}
											
							// If original estimate is selected and clicked Retrieve,
							// take saved labour rate.
							if(sap.ui.getCore().byId("idFESTComboStatus").getSelectedKey() == "D"){
								sap.ui.getCore().byId("idFESTInputLabRate").setValue(data.results[0].LabourRateSv);
								sap.ui.getCore().byId("idFESTInputLabRateM").setValue(data.results[0].LabourRateMSv);
							}

							var notes = data.results[0].ErrMsg.split('$*');
							sap.ui.getCore().byId("idFESTInputNotes1").setValue(notes[0]);
							sap.ui.getCore().byId("idFESTInputNotes2").setValue(notes[1]);
							sap.ui.getCore().byId("idFESTInputNotes3").setValue(notes[2]);
							sap.ui.getCore().byId("idFESTInputNotes4").setValue(notes[3]);
							sap.ui.getCore().byId("idFESTInputNotes5").setValue(notes[4]);
							sap.ui.getCore().byId("idFESTInputEstDate").setYyyymmdd(notes[5]);

							if(notes[6] != ""){
								sap.ui.getCore().byId("idFESTInputReference").setValue(notes[6]);
							}
							
							if(notes[7] != ""){
								sap.ui.getCore().byId("idFESTInputAmount").setValue(notes[7]);
							}

							

							var splitLines = [];
							oJSONFESTSAPData = [];
							oJSONFESTExcelData = [];
							for(var i=0; i<data.results.length; i++){

								oJSONFESTExcelData.push({

								});
								oJSONFESTSAPData.push({
									"Location" : "",
									"Component" : "",
									"Damage" : "",
									"Material" : "",
									"Repair" : "",
									"Length" : "",
									"Width" : "",
									"Unit" : "",
									"Qty" : "",
									"ManHours" : "",
									"MatCost" : "",
									"Responsibility" : "",
									"LabRate" : "",
									"Bulletin" : ""
								});
								splitLines = data.results[i].ILine1.split('$');
								oJSONFESTExcelData[i][0] = oJSONFESTSAPData[i].Location = splitLines[0];
								oJSONFESTExcelData[i][1] = oJSONFESTSAPData[i].Component = splitLines[1];
								oJSONFESTExcelData[i][2] = oJSONFESTSAPData[i].Damage = splitLines[2];
								oJSONFESTExcelData[i][3] = oJSONFESTSAPData[i].Material = splitLines[3];
								oJSONFESTExcelData[i][4] = oJSONFESTSAPData[i].Repair = splitLines[4];
								oJSONFESTExcelData[i][5] = oJSONFESTSAPData[i].Length = splitLines[5];
								oJSONFESTExcelData[i][6] = oJSONFESTSAPData[i].Width = splitLines[6];
								oJSONFESTExcelData[i][7] = oJSONFESTSAPData[i].Unit = splitLines[7];
								oJSONFESTExcelData[i][8] = oJSONFESTSAPData[i].Qty = splitLines[8];
								oJSONFESTExcelData[i][9] = oJSONFESTSAPData[i].ManHours = splitLines[9];
								oJSONFESTExcelData[i][10] = oJSONFESTSAPData[i].MatCost = splitLines[10];
								oJSONFESTExcelData[i][11] = oJSONFESTSAPData[i].Responsibility = splitLines[11];
								oJSONFESTExcelData[i][12] = oJSONFESTSAPData[i].LabRate = splitLines[12];
								oJSONFESTExcelData[i][13] = oJSONFESTSAPData[i].Bulletin = splitLines[13];
								//sap.ui.getCore().byId("idFLSAInputLabRate").setValue(oJSONFLSASAPData[i].LabRate);
							}
							//oFESTExcel.loadData(oJSONFESTExcelData);



							oFESTExcel.loadData(oJSONFESTExcelData);
							//document.getElementById('idFESTExcel').style.visibility='visible';
							//oCurrent.setExcelFESTPage();
							//document.getElementById('idFESTExcel').style.visibility='visible';
							busyDialog.close();

				    },function(err){
				    	 console.log("Above Request : Error");
				    	 busyDialog.close();
				    	 sap.ui.commons.MessageBox.alert("There is an error; Please try again later.");
				    });




		}else{

						var oFESTExcelData = oFESTExcel.getData();
						oFESTExcelData = removeInvalidLines(oFESTExcelData);
				    var oFESTExcelDataLength = checkValidLinesLength(oFESTExcelData);//oFESTExcelData.length;

						var isEmpty = false;
						var stringCountPlus12 = globalFESTStringCount + 12;

						// final = "";
						// if(globalFESTStringCount == 0){
						// 	final = "F";
						// }else
						lineno = globalFESTStringCount;
						if(oFESTExcelDataLength <= parseInt(stringCountPlus12)){
							stringCountPlus12 = oFESTExcelDataLength;
							final = "X";
						}

	stringToPass = stringToPass + " and Lineno eq '" + lineno + "' and Final eq '" + final + "'";

	var localStringCount = 0;
	for(var i = globalFESTStringCount; i < stringCountPlus12; i++){

		loop1 : for(var j =0; j < 12; j++){
			if(oFESTExcelData[i][j] != "" && oFESTExcelData[i][j] != null){

				if(oFESTExcelData[i][0] == '' || oFESTExcelData[i][1] == '' || oFESTExcelData[i][2] == '' || oFESTExcelData[i][4] == '' || oFESTExcelData[i][9] == '' || oFESTExcelData[i][10] == '' || oFESTExcelData[i][11] == '' ||
						oFESTExcelData[i][0] == null || oFESTExcelData[i][1] == null || oFESTExcelData[i][2] == null || oFESTExcelData[i][4] == null || oFESTExcelData[i][9] == null || oFESTExcelData[i][10] == null ||  oFESTExcelData[i][11] == null){
					 isEmpty = true;
 				}
				 	oFESTExcelData[i][10] = (oFESTExcelData[i][10] != null)?oFESTExcelData[i][10].split(',').join(''):oFESTExcelData[i][10];
					stringToPass = stringToPass + " and IEst" + (localStringCount + 1) + " eq '" +
					oFESTExcelData[i][0] + "$" +
					oFESTExcelData[i][1] + "$" +
					oFESTExcelData[i][2] + "$" +
					oFESTExcelData[i][3] + "$" +
					oFESTExcelData[i][4] + "$" +
					oFESTExcelData[i][5] + "$" +
					oFESTExcelData[i][6] + "$" +
					oFESTExcelData[i][7] + "$" +
					oFESTExcelData[i][8] + "$" +
					oFESTExcelData[i][9] + "$" +
					oFESTExcelData[i][10] + "$" +
					oFESTExcelData[i][11] + "$" +
					labrate +
					"'";
				break loop1;
			}
		}
	globalFESTStringCount = globalFESTStringCount + 1;
	localStringCount = localStringCount + 1;
	}

	var depot = sap.ui.getCore().byId("idFESTComboDepot").getSelectedKey();
	var serialno = sap.ui.getCore().byId("idFESTInputSerial").getValue();
	var estdate = sap.ui.getCore().byId("idFESTInputEstDate").getYyyymmdd();
	var status = sap.ui.getCore().byId("idFESTComboStatus").getSelectedKey();
	var notes1 = sap.ui.getCore().byId("idFESTInputNotes1").getValue();
	var upc = sap.ui.getCore().byId("idFESTComboUpc").getSelectedKey();

	if(upc == "M"){
		if(!depot || !serialno || !estdate || !status || !upc){
			oSTRINGFESTValidationMessage = "Please enter all the mandatory fields";
			sap.ui.commons.MessageBox.alert(oSTRINGFESTValidationMessage);
			return;
		}
	}else{
		if(!depot || !serialno || !estdate || !status || !upc || !notes1){
			oSTRINGFESTValidationMessage = "Please enter all the mandatory fields";
			sap.ui.commons.MessageBox.alert(oSTRINGFESTValidationMessage);
			return;
		}
	}


	if(isEmpty == true){
	sap.ui.commons.MessageBox.alert("Hours, Material Cost, Location, Component, Damage, Repair & Responsibility cannot be blank. Please fill them up");
}else{
	stringToPass = stringToPass.replace(/null/g, "");

oModel = new sap.ui.model.odata.ODataModel(serviceEDIDOC, true);
var oMODELFEST = serviceEDIDOC + "FESTSet?$filter=" + stringToPass;
console.log(oMODELFEST);
busyDialog.open();
if(final == "X"){
	OData.request({
	      requestUri: oMODELFEST,
	      method: "GET",
	      dataType: 'json',
				async : false,
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
				if(isSubmit == "X"){

	    	if(data.results.length == 0){
					globalIsSubmitFlag = true;
	    		console.log("Above request : Success");
	    		sap.ui.commons.MessageBox.alert("Submitted!");
	    		sap.ui.getCore().byId("idFESTButtonAdd5").setVisible(false);
     	    sap.ui.getCore().byId("idFESTButtonValidate").setVisible(false);
					sap.ui.getCore().byId("idFESTButtonSave").setVisible(false);
					sap.ui.getCore().byId("idFESTButtonRetrieve").setVisible(false);
     	    sap.ui.getCore().byId("idFESTButtonSubmit").setVisible(false);
     	   	sap.ui.getCore().byId("idFESTButtonPrint").setVisible(true);
     	   	sap.ui.getCore().byId("idFESTFormSelectionAuto").setVisible(true);
     	    document.getElementById('idFESTExcel').style.visibility='visible';
	    	}else{
					globalIsSubmitFlag = true;
	    		console.log("Above request : Success");
	    		sap.ui.commons.MessageBox.alert("Submitted!");
					sap.ui.getCore().byId("idFESTButtonAdd5").setVisible(false);
     	    sap.ui.getCore().byId("idFESTButtonValidate").setVisible(false);
					sap.ui.getCore().byId("idFESTButtonSave").setVisible(false);
					sap.ui.getCore().byId("idFESTButtonRetrieve").setVisible(false);
     	    sap.ui.getCore().byId("idFESTButtonSubmit").setVisible(false);
     	   	sap.ui.getCore().byId("idFESTButtonPrint").setVisible(true);
     	   	sap.ui.getCore().byId("idFESTFormSelectionAuto").setVisible(true);
     	    document.getElementById('idFESTExcel').style.visibility='visible';
	    	}
				oCurrent.submitFEST("RETRIEVE");
			}else if(isSubmit == "S"){
				if(data.results.length == 0){
					console.log("Above request : Success");
					sap.ui.commons.MessageBox.alert("Saved!");
					document.getElementById('idFESTExcel').style.visibility='visible';
				}else{
					console.log("Above request : Success");
					sap.ui.commons.MessageBox.alert("Saved!");
					document.getElementById('idFESTExcel').style.visibility='visible';
				}
				oCurrent.submitFEST("RETRIEVE");
			}
	    },function(err){
	    	 console.log("Above Request : Error");
	    	 busyDialog.close();
	    	 sap.ui.commons.MessageBox.alert("There is an error; Please try again later.");
	    });
		}else{
			OData.request({
			      requestUri: oMODELFEST,
			      method: "GET",
			      dataType: 'json',
						async : false,
			      headers:
			       {
			          "X-Requested-With": "XMLHttpRequest",
			          "Content-Type": "application/json; charset=utf-8",
			          "DataServiceVersion": "2.0",
			          "X-CSRF-Token":"Fetch"
			      }
			    },
			    function (data, response){

			    },function(err){
			    });
		}
		}


	}
    },



    /*FEST : Validate Repair Completion */

    validateFEST : function(fromwhere){
			var statusSelected = sap.ui.getCore().byId("idFESTComboStatus").getSelectedKey();

			if(statusSelected == "G"){
				sap.ui.getCore().byId("idFESTInputReference").setEnabled(true);
				sap.ui.getCore().byId("idFESTInputAmount").setEnabled(true);

				sap.ui.getCore().byId("idFESTLabelReference").setRequired(true);
				sap.ui.getCore().byId("idFESTLabelAmount").setRequired(true);
			}else{
				sap.ui.getCore().byId("idFESTInputReference").setEnabled(false);
				sap.ui.getCore().byId("idFESTInputAmount").setEnabled(false);

				sap.ui.getCore().byId("idFESTLabelReference").setRequired(false);
				sap.ui.getCore().byId("idFESTLabelAmount").setRequired(false);

			}


    	jQuery.sap.require("sap.ui.commons.MessageBox");

			var oCurrent = this;
			oJSONFESTSAPData = [];
			oJSONFESTExcelData = [];
			oSTRINGFESTValidationMessage = "";
			var depot = sap.ui.getCore().byId("idFESTComboDepot").getSelectedKey();

			var serialno = sap.ui.getCore().byId("idFESTInputSerial").getValue();
			//var reference = sap.ui.getCore().byId("idFESTInputReference").getValue();
			var estdate = sap.ui.getCore().byId("idFESTInputEstDate").getYyyymmdd();
			//var amount = sap.ui.getCore().byId("idFESTInputAmount").getValue();
			var status = sap.ui.getCore().byId("idFESTComboStatus").getSelectedKey();
			var notes1 = sap.ui.getCore().byId("idFESTInputNotes1").getValue();
			var notes2 = sap.ui.getCore().byId("idFESTInputNotes2").getValue();
			var notes3 = sap.ui.getCore().byId("idFESTInputNotes3").getValue();
			var notes4 = sap.ui.getCore().byId("idFESTInputNotes4").getValue();
			var notes5 = sap.ui.getCore().byId("idFESTInputNotes5").getValue();
			var revno = sap.ui.getCore().byId("idFESTInputRevNo").getValue();
			var upc = sap.ui.getCore().byId("idFESTComboUpc").getSelectedKey();
			var notes1 = sap.ui.getCore().byId("idFESTInputNotes1").getValue();
			if(fromwhere == "FROMRETRIEVE")
				notes1 = "dummy";

			if(sap.ui.getCore().byId("idFESTComboStatus").getSelectedKey() != 'D'){
				notes1 = "dummy";
			}else{
				if(upc == "M")
					notes1 = "dummy";
			}


			if(!depot || !serialno || !estdate || !status || !upc || !notes1){
				sap.ui.getCore().byId("idFESTButtonAdd5").setVisible(false);
				sap.ui.getCore().byId("idFESTButtonValidate").setVisible(true);
				sap.ui.getCore().byId("idFESTButtonRetrieve").setVisible(true);

				sap.ui.getCore().byId("idFESTButtonSave").setVisible(false);

	           	sap.ui.getCore().byId("idFESTButtonSubmit").setVisible(false);
							sap.ui.getCore().byId("idFESTButtonPrint").setVisible(false);
	           	sap.ui.getCore().byId("idFESTFormSelectionAuto").setVisible(false);
	           	document.getElementById('idFESTExcel').style.visibility='hidden';
	           	oSTRINGFESTValidationMessage = "Please enter all the mandatory fields";
				sap.ui.commons.MessageBox.alert(oSTRINGFESTValidationMessage);
				return;
			}else{
	           	//sap.ui.commons.MessageBox.alert("Validation Passed!" );

		 				 var upctype = sap.ui.getCore().byId("idFESTComboUpc").getSelectedKey();
		 				 if(upctype == "R"){
		 					 sap.ui.getCore().byId("idFESTLabelLabRate").setText("Lab. Rate (C)");
		 					 sap.ui.getCore().byId("idFESTLabelLabRateM").setText("Lab. Rate (M)");
							 sap.ui.getCore().byId("idFESTFlexLabRate").setVisible(true);
		 					 sap.ui.getCore().byId("idFESTFlexLabRateM").setVisible(true);
		 				 }else if(upctype == "C"){
		 					 sap.ui.getCore().byId("idFESTLabelLabRate").setText("Lab. Rate (C)");
		 					 sap.ui.getCore().byId("idFESTLabelLabRateM").setText("Lab. Rate (M)");
							 sap.ui.getCore().byId("idFESTFlexLabRate").setVisible(true);
		 					 sap.ui.getCore().byId("idFESTFlexLabRateM").setVisible(false);
		 				 }else if(upctype == "M"){
		 					 sap.ui.getCore().byId("idFESTLabelLabRate").setText("Lab. Rate (C)");
		 					 sap.ui.getCore().byId("idFESTLabelLabRateM").setText("Lab. Rate (M)");
							 sap.ui.getCore().byId("idFESTFlexLabRate").setVisible(false);
		 					 sap.ui.getCore().byId("idFESTFlexLabRateM").setVisible(true);
		 				 }

	        	var oCurrent = this;
	    		var stringToPass = "";

	    	var parameter = serialno + "$*" + status + "$*" + estdate + "$*"  + upc + "$*"// + grade  + "$*"
				+ notes1 + "@*"
				+ notes2 + "@*"
				+ notes3 + "@*"
				+ notes4 + "@*"
				+ notes5 + "$*"
				+ revno +  "$*"
				//+ globalEstAmount + "$*"
				+ depot  + "$*"
				+ sessionStorage.uName.toUpperCase();
	    		parameter = encodeURIComponent(parameter);

	    		//IXXX$MRU$ML$ML$SK$MV$0$0$$2$0.250$1.00$U$3.45$3.45
	    		stringToPass = "Submit eq '' and IHeader eq '" + parameter + "'";

	    		oModel = new sap.ui.model.odata.ODataModel(serviceEDIDOC, true);
	    		var oMODELFEST = serviceEDIDOC + "FESTSet?$filter=" + stringToPass;

	    		busyDialog.open();
	    		console.log(oMODELFEST);
	    		OData.request({
	    		      requestUri: oMODELFEST,
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
	    		    		console.log("Above request : Success but no entries returned");
	    		    		//sap.ui.commons.MessageBox.alert("Submitted!");
	    		    	}else{
	    		    		console.log("Above request : Success");
	    		    		//sap.ui.commons.MessageBox.alert("Submitted!");
	    		    		for(var i=0; i<data.results.length; i++){
	    		    			if(data.results[i].ErrMsg.toLowerCase().substr(0,9) == "duplicate"){
	    		    				sap.ui.commons.MessageBox.alert(data.results[i].ErrMsg);
	    		    				return false;
	    		    			}
	    		    		}

	    		    		var errorString = "";
	    		    		for(var i=0; i<data.results.length; i++){
	    		    			if(errorString == '' && data.results[i].ErrMsg != ""){
	    		    				errorString = "Line " + (i + 1) + " : " + data.results[i].ErrMsg;
	    		  				}else if(data.results[i].ErrMsg != ""){
	    		  					errorString = errorString + '\n' + "Line " + (i + 1) + " : " + data.results[i].ErrMsg;
	    		  				}
	    		    		}

	    		    		if(errorString != ""){
    		    				sap.ui.commons.MessageBox.show(errorString,
    		    			        	sap.ui.commons.MessageBox.Icon.ERROR,
    		    			        	"Error",
    		    			        	[sap.ui.commons.MessageBox.Action.OK],
    		    			        	function goBack(){

    		    						},sap.ui.commons.MessageBox.Action.OK);

    		    				return false;
    		    			}

	    		    		var splitLines = [];
	    		    		for(var i=0; i<data.results.length; i++){

	    		    			if(i == 0){

	    		    				sap.ui.getCore().byId("idFESTInputCustomerCode").setValue(data.results[0].CustomerCode);
	    		    				sap.ui.getCore().byId("idFESTInputLessee").setValue(data.results[0].Lessee);
	    		    				sap.ui.getCore().byId("idFESTInputRedel").setValue(data.results[0].RedelAuth);

	    		    				sap.ui.getCore().byId("idFESTInputRevNo").setValue(data.results[0].RevNo);
	    		    				sap.ui.getCore().byId("idFESTInputGINDate").setValue(data.results[0].GateInDt);
	    		    				sap.ui.getCore().byId("idFESTInputBaseCurr").setValue(data.results[0].BaseCurr);

	    		    				sap.ui.getCore().byId("idFESTInputPOHDate").setValue(data.results[0].PrevOnhireDate);
	    		    				sap.ui.getCore().byId("idFESTInputPOHLocation").setValue(data.results[0].PrevLocation);

											sap.ui.getCore().byId("idFESTInputExchRate").setValue(data.results[0].ExRate);
											sap.ui.getCore().byId("idFESTInputProdCate").setValue(data.results[0].PrdType);

											if(sap.ui.getCore().byId("idFESTComboStatus").getSelectedKey() == "E" || sap.ui.getCore().byId("idFESTComboStatus").getSelectedKey() == "G"){
												sap.ui.getCore().byId("idFESTInputLabRate").setValue(data.results[0].LabourRateOe);
												sap.ui.getCore().byId("idFESTInputLabRateM").setValue(data.results[0].LabourRateMOe);
											}else{
												sap.ui.getCore().byId("idFESTInputLabRate").setValue(data.results[0].LabourRate);
												sap.ui.getCore().byId("idFESTInputLabRateM").setValue(data.results[0].LabourRateM);
											}


	    		    				sap.ui.getCore().byId("idFESTInputDppLimit").setValue(data.results[0].DppAmt);
											sap.ui.getCore().byId("idFESTInputDppCurr").setValue(data.results[0].DppCurr);

											sap.ui.getCore().byId("idFESTInputReference").setValue(data.results[0].LesseeRef);
											sap.ui.getCore().byId("idFESTInputAmount").setValue(data.results[0].LesseeAmt);

	    		    			}
	    		    	}

								sap.ui.getCore().byId("idFESTButtonAdd5").setVisible(true);
								sap.ui.getCore().byId("idFESTButtonValidate").setVisible(false);
								sap.ui.getCore().byId("idFESTButtonRetrieve").setVisible(false);

								sap.ui.getCore().byId("idFESTButtonSave").setVisible(true);

								sap.ui.getCore().byId("idFESTButtonSubmit").setVisible(true);
								sap.ui.getCore().byId("idFESTButtonPrint").setVisible(true);
								sap.ui.getCore().byId("idFESTFormSelectionAuto").setVisible(true);
								document.getElementById('idFESTExcel').style.visibility='visible';
								oCurrent.setExcelFESTPage();
								var labrateForPrint = sap.ui.getCore().byId("idFESTInputLabRate").getValue();
								//globalEstAmount = oCurrent.getEstAmount(labrateForPrint);

								// If the estimate type is NOT original estimate, get also the line items
								// along with validation

								if(sap.ui.getCore().byId("idFESTComboStatus").getSelectedKey() != 'D'){

													oCurrent.submitFEST("RETRIEVE");

									}else{
										if(fromwhere == "FROMRETRIEVE")
													oCurrent.submitFEST("RETRIEVE");
									}

	    		    	}

	    		    },function(err){
	    		    	 console.log("Above Request : Error");
	    		    	 busyDialog.close();
	    		    	 sap.ui.commons.MessageBox.alert("There is an error; Please try again later.");
	    		    });

			}
		},

		/*FEST : Validate Unit Number */

		validateFESTUnitNumber : function (unitnumber){

		       unitnumber =  $.trim(unitnumber);
		       if(unitnumber == ''){
                   //sap.ui.commons.MessageBox.alert("Either Unit Number or Document Type input missing.\n Please check your inputs and retry.");
                   return false;
		       }

		       if(unitnumber.length != 11){
                   //sap.ui.commons.MessageBox.alert("You have input an invalid Unit Number.\n Please enter a valid  Unit Number -11-char alpha numeric.");
                   return false;
		       }
		       var validateInput = unitnumber.substr(0,4);
		       if(!(/^[a-zA-Z\s]+$/.test(validateInput))){
                   //sap.ui.commons.MessageBox.alert("You have input an invalid Unit Number.\n Please enter a valid  Unit Number -11-char alpha numeric.");
                   return false;
		       }

		        var validateInput = unitnumber.substr(4,7);
		       if(!(/^[0-9]+$/.test(validateInput))) {
                   //sap.ui.commons.MessageBox.alert("You have input an invalid Unit Number.\n Please enter a valid  Unit Number -11-char alpha numeric.");
                   return false;
		       }
		       return true;
		},

		/*FEST : Validate Return Authorization */

		validateFESTRA : function (ranumber){

			   ranumber =  $.trim(ranumber);
		       if(ranumber == ''){
                   //sap.ui.commons.MessageBox.alert("Either Unit Number or Document Type input missing.\n Please check your inputs and retry.");
                   return false;
		       }

		       if(ranumber.length != 6){
                   //sap.ui.commons.MessageBox.alert("You have input an invalid Unit Number.\n Please enter a valid  Unit Number -11-char alpha numeric.");
                   return false;
		       }

		       if(!(/^[0-9]+$/.test(ranumber))) {
                   //sap.ui.commons.MessageBox.alert("You have input an invalid Unit Number.\n Please enter a valid  Unit Number -11-char alpha numeric.");
                   return false;
		       }
		       return true;
		},


		// /* FEST : Get Estimate Amount */

		// getEstAmount : function(labrateForPrint){
		// 	var excelDataPrint = [];
		// 	var excelDataPrintGet = oFESTExcel.getData();

		// 	// Make totals based on the Responsibility Code //
		// 	var labhrU = 0.00;
		// 	var labhrJ = 0.00;
		// 	var labhrO = 0.00;
		// 	var labhrV = 0.00;
		// 	var matrcU = 0.00;
		// 	var matrcJ = 0.00;
		// 	var matrcO = 0.00;
		// 	var matrcV = 0.00;


		// 	var currLength = excelDataPrintGet.length;

		// 	for(var i =0; i < currLength; i++){
		// 	loop1 : for(var j =0; j < 12; j++){
		// 	if(excelDataPrintGet[i][j] != "" && excelDataPrintGet[i][j] != null){
		// 	excelDataPrint.push(excelDataPrintGet[i]);
		// 	break loop1;
		// 	}
		// 	}
		// 	}


		// 	for(var i=0; i<excelDataPrint.length; i++){
		// 	if(excelDataPrint[i][11] != null){
		// 		if(excelDataPrint[i][11].substr(0,1).toUpperCase() == 'U'){
		// 		labhrU = (excelDataPrint[i][8] == "")? labhrU : parseFloat(parseFloat(labhrU).toFixed(2)) + parseFloat(parseFloat(excelDataPrint[i][8]).toFixed(2));
		// 		matrcU = (excelDataPrint[i][9] == "")? matrcU : parseFloat(parseFloat(matrcU).toFixed(2)) + parseFloat(parseFloat(excelDataPrint[i][9]).toFixed(2));
		// 		}else if(excelDataPrint[i][11].substr(0,1).toUpperCase() == 'J'){
		// 		labhrJ = (excelDataPrint[i][8] == "")? labhrJ : parseFloat(parseFloat(labhrJ).toFixed(2)) + parseFloat(parseFloat(excelDataPrint[i][8]).toFixed(2));
		// 		matrcJ = (excelDataPrint[i][9] == "")? matrcJ : parseFloat(parseFloat(matrcJ).toFixed(2)) + parseFloat(parseFloat(excelDataPrint[i][9]).toFixed(2));
		// 		}else if(excelDataPrint[i][11].substr(0,1).toUpperCase() == 'O'){
		// 		labhrO = (excelDataPrint[i][8] == "")? labhrO : parseFloat(parseFloat(labhrO).toFixed(2)) + parseFloat(parseFloat(excelDataPrint[i][8]).toFixed(2));
		// 		matrcO = (excelDataPrint[i][9] == "")? matrcO : parseFloat(parseFloat(matrcO).toFixed(2)) + parseFloat(parseFloat(excelDataPrint[i][9]).toFixed(2));
		// 		}else if(excelDataPrint[i][11].substr(0,1).toUpperCase() == 'V'){
		// 		labhrV = (excelDataPrint[i][8] == "")? labhrV : parseFloat(parseFloat(labhrV).toFixed(2)) + parseFloat(parseFloat(excelDataPrint[i][8]).toFixed(2));
		// 		matrcV = (excelDataPrint[i][9] == "")? matrcV : parseFloat(parseFloat(matrcV).toFixed(2)) + parseFloat(parseFloat(excelDataPrint[i][9]).toFixed(2));
		// 		}
		// 	}
		// 	}


		// 	var labrtU = parseFloat(labhrU * labrateForPrint).toFixed(2);
		// 	var labrtJ = parseFloat(labhrJ * labrateForPrint).toFixed(2);
		// 	var labrtO = parseFloat(labhrO * labrateForPrint).toFixed(2);
		// 	var labrtV = parseFloat(labhrV * labrateForPrint).toFixed(2);
		// 	labrtU = parseFloat(parseFloat(labrtU).toFixed(2)) + parseFloat(parseFloat(labrtV).toFixed(2));
		// 	labrtO = parseFloat(parseFloat(labrtO).toFixed(2)) + parseFloat(parseFloat(labrtJ).toFixed(2));
		// 	var labrt = parseFloat(parseFloat(labrtU).toFixed(2)) + parseFloat(parseFloat(labrtJ).toFixed(2)) + parseFloat(parseFloat(labrtO).toFixed(2)) +
		// 		parseFloat(parseFloat(labrtV).toFixed(2));
		// 	labrt = parseFloat(labrt).toFixed(2);


		// 	var matrc = matrcU + matrcJ + matrcO + matrcV;
		// 	matrcU = matrcU + matrcV;
		// 	matrcO = matrcO + matrcJ;
		// 	matrc = parseFloat(matrc).toFixed(2);
		// 	matrcV = parseFloat(matrcV).toFixed(2);
		// 	matrcJ = parseFloat(matrcJ).toFixed(2);
		// 	matrcO = parseFloat(matrcO).toFixed(2);
		// 	matrcU = parseFloat(matrcU).toFixed(2);

		// 	var total = parseFloat(labrt) + parseFloat(matrc);
		// 	total = parseFloat(total).toFixed(2);
		// 	console.log(total);
		// 	return total;
		// },

		/*FEST : Reset Repair Estimate Page - Whenever there is a change in key fields after validation, reset the
		validated section but doesn't affect the key fields */

		resetFESTKeyFields : function(){

			if(sap.ui.getCore().byId("idFESTButtonAdd5") != undefined)
				sap.ui.getCore().byId("idFESTButtonAdd5").setVisible(false);

			if(sap.ui.getCore().byId("idFESTButtonValidate") != undefined)
				sap.ui.getCore().byId("idFESTButtonValidate").setVisible(true);

			if(sap.ui.getCore().byId("idFESTButtonRetrieve") != undefined)
					sap.ui.getCore().byId("idFESTButtonRetrieve").setVisible(true);

			if(sap.ui.getCore().byId("idFESTButtonSave") != undefined)
				sap.ui.getCore().byId("idFESTButtonSave").setVisible(false);

			if(sap.ui.getCore().byId("idFESTButtonSubmit") != undefined)
				sap.ui.getCore().byId("idFESTButtonSubmit").setVisible(false);

			if(sap.ui.getCore().byId("idFESTButtonPrint") != undefined)
				sap.ui.getCore().byId("idFESTButtonPrint").setVisible(false);

			if(sap.ui.getCore().byId("idFESTFormSelectionAuto") != undefined)
				sap.ui.getCore().byId("idFESTFormSelectionAuto").setVisible(false);

     	document.getElementById('idFESTExcel').style.visibility='hidden';

		},

		/*FEST : Reset Excel Repair Estimate Page */

		resetFEST : function(){

			if(sap.ui.getCore().byId("idFESTComboDepot") != undefined){
				var oFESTModelDepot = new sap.ui.model.json.JSONModel();
				oFESTModelDepot.setSizeLimit(99999);
				oFESTModelDepot.setData({data:depotEdiData});
				var oFESTComboDepot = sap.ui.getCore().byId("idFESTComboDepot");
				oFESTComboDepot.setModel(oFESTModelDepot);
				oFESTComboDepot.setSelectedKey(depotEdiData[0].key);
				oFESTComboDepot.bindItems("/data", new sap.ui.core.ListItem({text: "{text}", key:"{key}"}));
			}

			if(sap.ui.getCore().byId("idFESTComboStatus") != undefined)
				sap.ui.getCore().byId("idFESTComboStatus").setSelectedKey("");

			if(sap.ui.getCore().byId("idFESTComboUpc") != undefined)
				sap.ui.getCore().byId("idFESTComboUpc").setSelectedKey("C");

			//	if(sap.ui.getCore().byId("idFESTComboGrade") != undefined)
	 		//	 sap.ui.getCore().byId("idFESTComboGrade").setSelectedKey("1");

			if(sap.ui.getCore().byId("idFESTInputSerial") != undefined)
				sap.ui.getCore().byId("idFESTInputSerial").setValue("");

			if(sap.ui.getCore().byId("idFESTInputEstDate") != undefined)
				sap.ui.getCore().byId("idFESTInputEstDate").setYyyymmdd(yyyymmddtoday());

			if(sap.ui.getCore().byId("idFESTInputNotes1") != undefined)
				sap.ui.getCore().byId("idFESTInputNotes1").setValue("");

			if(sap.ui.getCore().byId("idFESTInputNotes2") != undefined)
				sap.ui.getCore().byId("idFESTInputNotes2").setValue("");

			if(sap.ui.getCore().byId("idFESTInputNotes3") != undefined)
				sap.ui.getCore().byId("idFESTInputNotes3").setValue("");

			if(sap.ui.getCore().byId("idFESTInputNotes4") != undefined)
				sap.ui.getCore().byId("idFESTInputNotes4").setValue("");

			if(sap.ui.getCore().byId("idFESTInputNotes5") != undefined)
				sap.ui.getCore().byId("idFESTInputNotes5").setValue("");


			if(sap.ui.getCore().byId("idFESTButtonAdd5") != undefined)
				sap.ui.getCore().byId("idFESTButtonAdd5").setVisible(false);

			if(sap.ui.getCore().byId("idFESTButtonValidate") != undefined)
				sap.ui.getCore().byId("idFESTButtonValidate").setVisible(true);

				if(sap.ui.getCore().byId("idFESTButtonRetrieve") != undefined)
					sap.ui.getCore().byId("idFESTButtonRetrieve").setVisible(true);

				if(sap.ui.getCore().byId("idFESTButtonSave") != undefined)
					sap.ui.getCore().byId("idFESTButtonSave").setVisible(false);



			if(sap.ui.getCore().byId("idFESTButtonSubmit") != undefined)
				sap.ui.getCore().byId("idFESTButtonSubmit").setVisible(false);

			if(sap.ui.getCore().byId("idFESTButtonPrint") != undefined)
				sap.ui.getCore().byId("idFESTButtonPrint").setVisible(false);

			if(sap.ui.getCore().byId("idFESTFormSelectionAuto") != undefined)
				sap.ui.getCore().byId("idFESTFormSelectionAuto").setVisible(false);

     	document.getElementById('idFESTExcel').style.visibility='hidden';

		},

		/*FEST : Set Excel Repair Estimate Page */

	    setExcelFESTPage : function(){

	    	/* FEST - Repair Completion - Excel - Setup */

			/* FEST - JSON - Excel Data */
			/* Serial No. - Status - Repair Completion Date - RA Number - Previous On Hire Location - Previous On Hire Date*/

	    	//var serviceUrl15_old = "/sap/opu/odata/sap/ZNW_SEACO_PORTAL_LOT5PGW_SRV";
	    	var urlToCallIsocodes = serviceUrl15 + "/get_Isocodes?";

			busyDialog.open();
	        oModel = new sap.ui.model.odata.ODataModel(serviceUrl15_old, true);
	        OData.request({
	          requestUri: urlToCallIsocodes,
	          method: "GET",
	          dataType: 'json',
	          async: false,
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

	      	  		materialCodes = [];
		          	materialSource = [];
		          	materialSource.push("");

		          	locationCodes = [];
		          	locationSource = [];
		          	locationSource.push("");

		          	componentCodes = [];
		          	componentSource = [];
		          	componentSource.push("");

		          	repairCodes = [];
		          	repairSource = [];
		          	repairSource.push("");

		          	damageCodes = [];
		          	damageSource = [];
		          	damageSource.push("");


		          	for(var j=0; j<data.results.length; j++){
		          		if(data.results[j].Type == "LOCATION"){
		          			locationCodes.push({
		          				"location" : data.results[j].Value,
		          				"locKey" : data.results[j].Value.split("-")[0],
											"locText" : data.results[j].Value.split("-")[1]
		          			});
		          			locationSource.push(data.results[j].Value.split("-")[0]);
		          		}else if(data.results[j].Type == "COMPONENT"){
		          			componentCodes.push({
		          				"component" : data.results[j].Value,
		          				"comKey" : data.results[j].Value.split("-")[0],
											"comText" : data.results[j].Value.split("-")[1]
		          			});
		          			componentSource.push(data.results[j].Value.split("-")[0]);
		          		}else if(data.results[j].Type == "REPAIR"){
		          			repairCodes.push({
		          				"repair" : data.results[j].Value,
		          				"repKey" : data.results[j].Value.split("-")[0],
											"repText" : data.results[j].Value.split("-")[1]
		          			});
		          			repairSource.push(data.results[j].Value.split("-")[0]);
		          		}else if(data.results[j].Type == "DAMAGE"){
		          			damageCodes.push({
		          				"damage" : data.results[j].Value,
		          				"damKey" : data.results[j].Value.split("-")[0],
											"damText" : data.results[j].Value.split("-")[1]
		          			});
		          			damageSource.push(data.results[j].Value.split("-")[0]);
		          		}else if(data.results[j].Type == "REPDAM"){
		          			repdamCodes.push({
		          				"rep" : data.results[j].Value1,
		          				"repKey" : data.results[j].Value1.split("-")[0],
											"repText" : data.results[j].Value.split("-")[1],
		          				"dam" : data.results[j].Value,
		          				"damKey" : data.results[j].Value.split("-")[0],
											"damText" : data.results[j].Value.split("-")[1]
		          			});
		          		}else if(data.results[j].Type == "MATERIAL"){
		          			materialCodes.push({
		          				"material" : data.results[j].Value,
		          				"matKey" : data.results[j].Value.split("-")[0],
											"matText" : data.results[j].Value.split("-")[1]
		          			});
		          			materialSource.push(data.results[j].Value.split("-")[0]);
		          		}
		          	}
			        },
			        function(err){
			        	 console.log("Above Request : Error");
		   		    	 busyDialog.close();
		   		    	 sap.ui.commons.MessageBox.alert("Error getting F4 values for ISO Codes");
			        });

	        		  aResponsCode = [];

	        		  if(sap.ui.getCore().byId("idFESTComboStatus").getSelectedKey() == "E"
										|| sap.ui.getCore().byId("idFESTComboStatus").getSelectedKey() == "D"
											|| sap.ui.getCore().byId("idFESTComboStatus").getSelectedKey() == "G"){
												aResponsCode = 		[	  "",
																						"I - SeaCover",	//  SeaCover
									                   		 	  "O - Owner",	//  Owner
								     		                      "U - User",	//  User
																						"S - Special", 	//  Special
																						"X - No Action"];		// No Action
	        		  }else if(sap.ui.getCore().byId("idFESTComboStatus").getSelectedKey() == "L"){
												aResponsCode = 		[	  "",
									                   		 	  "O - Owner",	//  Owner
																						"S - Special", 	//  Special
																						"X - No Action"];		// No Action
	        		  }else{
									aResponsCode = 		[	  "",
																			"I - SeaCover",	//  SeaCover
																			"O - Owner",	//  Owner
																				"U - User",	//  User
																			"S - Special", 	//  Special
																			"X - No Action"];		// No Action
	        		  }


  		    var container = document.getElementById('idFESTExcel');
  		  	oFESTExcel = new Handsontable(container, {
  	            data : oJSONFESTExcelData,  //binding the model
  	         		minSpareRows: 5,
								 height: 600,
  	           	renderAllRows: true,
  	           	renderAllColumns: true,
  	           	//width: 500,
  	           	//minRows: 5,
  	           	//maxRows: 25,
  	           	rowHeaders: true,
  	           	colHeaders: true,
  	           	colHeaders: ["Location", // 0
            	             "Component", // 1
            	             "Damage",  // 2
            	             "Material",  // 3
            	             "Repair", // 4
											     "Rp.Length", // 5
											     "Rp.Width", // 6
											     "UOM", // 7
											     "Qty", // 8
											     "Hours", // 9
											     "Material Cost", // 10
											     "Responsibility", //11
											     "Labour Rate", //12
											     "Bulletin", // 13
						     ],
   	            	contextMenu: true,
   					columns: [
   					  {
   						  type: 'autocomplete',
   						  source: locationSource,
   						  width: 80,
   						  strict: true
   					  },
   					  {
   						  type: 'autocomplete',
   						  source: componentSource,
   						  width: 90,
   						  strict: true
   					  },
   					 {
   						  type: 'autocomplete',
   						  source: damageSource,
   						  width: 80,
   						  strict: true
   					  },
   					 {
   						  type: 'autocomplete',
   						  source: materialSource,
   						  width: 80,
   						  strict: true
   					  },
   					  {
   						  type: 'autocomplete',
   						  source: repairSource,
   						  width: 70,
   						  strict: true
   					  },
   					  {
   						  width: 80,
   					  },
   					  {
   						  width: 80,
   					  },
   					  {
								width: 50
							},
//	          				     					  {
//	          				     						  width: 80,
//	          				     					  },
   					  {
   						  width: 80,
   					  },
   					  {
   						  width: 100,
   					  },
   					  {
   						  width: 120,
   					  },
   					  {
   						  type: 'autocomplete',
   						  source: aResponsCode,
   						  width: 200,
   						  //strict: true
   					  },
//	          				     					  {		width: 150,
//	          				     					        type: 'handsontable',
//	          				     					        handsontable: {
//	          				     					          width: 150,
//	          				     					          colHeaders: ['', 'Responsibility'],
//	          				     					          data: aResponsCodeNew
//	          				     					        }
//	          				     					      },
   					  ],
   	            	//rowHeaders: true,
   	            	manualColumnResize:true,
   	            	autoColumnSize: {
   	            	    "samplingRatio": 23
   	            	},
   	            	afterChange : function(event){
										if(event)
											globalIsSubmitFlag = false;
          	      }
  				});
	    },

			printEstimatesFEST : function( depotForPrint,
					serialForPrint,
					fullDepotForPrint,
					unitParrtCodeForPrint,
					gradeForPrint,
					jobTypeForPrint,
					estimDateForPrint,
					saleGradeForPrint,
					currencyCodeForPrint,
					referenceForPrint,
					amountForPrint,

					labrateForPrint,
					labrateForPrintM,
					exchangerateForPrint,

					notes1forprint,
					notes2forprint,
					notes3forprint,
					notes4forprint,
					notes5forprint,

					customer,

					oFESTInputRedel,
					oFESTInputRevNo,
					oFESTInputGINDate,
					oFESTInputBaseCurr,
					oFESTInputPOHDate,
					oFESTInputPOHLocation,
					oFESTInputDppLimit,
			    oFESTInputDppCurr,

					unitParrtCodeForLabRate,

					printExcelData,
					title,
					func ){

				 var appDateForPrint = new Date().format("dd/mm/yyyy");
				 if(sap.ui.getCore().byId("idFESTComboStatus").getSelectedKey() != "G" && sap.ui.getCore().byId("idFESTComboStatus").getSelectedKey() != "L"){
					 // referenceForPrint = "";
					 appDateForPrint = "";
					 // amountForPrint = "";
				 }

				 if(labrateForPrint != "")
				 		labrateForPrint = thousandsep(labrateForPrint);

				 if(labrateForPrintM != "")
					 labrateForPrintM = thousandsep(labrateForPrintM);

				//  if(exchangerateForPrint != "")
				// 			exchangerateForPrint = thousandsep(exchangerateForPrint);

					if(oFESTInputDppLimit != "")
							 oFESTInputDppLimit = thousandsep(oFESTInputDppLimit);


			 	 var html = "";
			 	 var count = 0;

			     var urlNoHash = window.location.href.replace(window.location.hash,'');
			     var urlSplit = urlNoHash.split('/');
			     var base = "";
			     if(urlSplit.length > 2){
			    	 	base = base + urlSplit[0]+"//";
			            for(var i=2; i<urlSplit.length - 1;i++){
			                   base = base + urlSplit[i]+"/";
			            }
			     }

			     var tableWidth = 16;
			     var htmlTable = "";

					 /* ----------------------------------------*/
					 /* --------  Title  --------------*/
					 /* ----------------------------------------*/
					  var filename = serialForPrint + "_" + oFESTInputRevNo + "_" + depotForPrint.substr(0,4);
					  htmlTable += '<title>';
						htmlTable += filename;
						htmlTable += '</title>';

					 /* ----------------------------------------*/
					 /* --------  Caption Section  --------------*/
					 /* ----------------------------------------*/

			       htmlTable +='<table border="0" cellspacing="0" class="table70" style="color:#000000">';   // Header Table - Start
			       htmlTable += '<tr style="height:75px;border=1">'+
						 							'<td style="font:12px Arial;" align=center>' + getFormattedDate() + '</td>' +
			                    '<td align=center width="82%" style="padding-left:10px;font:bold 20px Arial;"><u>Depot Repair Estimate</u></td>'+
			                    '<td style="border:none; padding:5px 5px 5px 0px" colspan=2 align ="right"><img src="' + base + 'images/login/login_logo.png"></img></td></tr>';
						 htmlTable += '</table>';




						 /* ----------------------------------------*/
						 /* --------  Header Section  --------------*/
						 /* ----------------------------------------*/


						 if(globalIsSubmitFlag)
						 		var submissionDate = new Date().format("dd/mm/yyyy");
						 else
						 		var submissionDate = "";

								var oFESTInputProdCate = sap.ui.getCore().byId("idFESTInputProdCate").getValue();

						 var $menu_tags = [

						   {slug: 'lserial',    name: 'Serial No'},
						   {slug: 'vserial',    name: serialForPrint},
						   {slug: 'lrevno', name: 'Rev. No'},
						   {slug: 'vrevno',    name: oFESTInputRevNo},
						   {slug: 'ledate',   name: 'Estimate Date'},
						   {slug: 'vedate',   name: estimDateForPrint},
						   {slug: 'letype',   name: 'Estimate Type'},
						   {slug: 'eetype',   name: jobTypeForPrint},

						   {slug: 'lserial',    name: 'Equip. Type'},
						   {slug: 'vserial',    name: oFESTInputProdCate},
						   {slug: 'lrevno', name: 'Redel. AUTH'},
						   {slug: 'vrevno',    name: oFESTInputRedel},
						   {slug: 'ledate',   name: 'Submission Date'},
						   {slug: 'vedate',   name: submissionDate},
						   {slug: 'letype',   name: 'Depot'},
						   {slug: 'eetype',   name: depotForPrint},

						   {slug: 'lserial',    name: 'Unit Part Code'},
						   {slug: 'vserial',    name: unitParrtCodeForPrint},
						   {slug: 'lrevno', name: 'Prev. On Hire Loc.'},
						   {slug: 'vrevno',    name: oFESTInputPOHLocation},
						   {slug: 'ledate',   name: 'Prev. On Hire Date'},
						   {slug: 'vedate',   name: oFESTInputPOHDate},
						   {slug: 'letype',   name: 'Customer'},
						   {slug: 'eetype',   name: customer},

						   {slug: 'lserial',    name: 'Depot Curr.'},
						   {slug: 'vserial',    name: oFESTInputBaseCurr},
						   {slug: 'lrevno', name: 'Approval Amount'},
						   {slug: 'vrevno',    name: amountForPrint},
						   {slug: 'ledate',   name: 'Approval Date'},
						   {slug: 'vedate',   name: appDateForPrint},
						   {slug: 'letype',   name: 'Labour Rate(C)'},
						   {slug: 'eetype',   name: labrateForPrint},

						   {slug: 'lserial',    name: 'SCR Limit Curr.'},
						   {slug: 'vserial',    name: oFESTInputDppCurr},
						   {slug: 'lrevno', name: 'SCR Limit Amt.'},
						   {slug: 'vrevno',    name: oFESTInputDppLimit},
						   {slug: 'ledate',   name: 'Approval Ref'},
						   {slug: 'vedate',   name: referenceForPrint},
						   {slug: 'letype',   name: 'Labour Rate(M)'},
						   {slug: 'eetype',   name: labrateForPrintM},

							 {slug: 'lexchange',   name: 'Exchange Rate'},
						   {slug: 'vexchange',    name: exchangerateForPrint},
							 {slug: 'lexchange',   name: 'Gate IN Date'},
						   {slug: 'vexchange',    name: oFESTInputGINDate}
						 ];
						 var MENU_TAGS_COLUMN_COUNT = 8;

						 (function printArrayInTabularFormat(menuTags, colCount) {
						   htmlTable += '<table style="font:12px Arial;LINE-HEIGHT:25px;" name="tblMenuAllergens" cellpadding="1" border="0"><thead></thead><tbody>' + "\n";
						   htmlTable += '<col width=120 style="background-color:#eaeaea">';
						   htmlTable += '<col width=120>';
						   htmlTable += '<col width=150 style="background-color:#eaeaea">';
						   htmlTable += '<col width=120>';
						   htmlTable += '<col width=150 style="background-color:#eaeaea">';
						   htmlTable += '<col width=120>';
						   htmlTable += '<col width=120 style="background-color:#eaeaea">';
						   htmlTable += '<col width=400>';

						 	var width = 0;
						 	var fontweight = "normal";
						     var cellIndex=1;
						     for (var $i=0; $i<menuTags.length; $i++) {
						       if (cellIndex == 1) {
						         htmlTable += '<tr>';
						       }
						       var $id    = menuTags[$i]['slug'];
						       var $name  = menuTags[$i]['name'];
						 	  if($id.substr(0,1) == "l"){	// label columns
						 		width = "100";
						 		fontweight = "normal";
						 	  }else if($id.substr(0,1) == "e"){	// end column
						 		width = "160";
						 		fontweight = "bold;padding-left: 5px;";
						 	  }else{
						 		width = "120";
						 		fontweight = "bold;padding-left: 5px;";
						 	  }
						       htmlTable += '<td width=' + width + ' style="font-weight:' + fontweight + '">' + $name + '</td>' + "\n";
						       if (++cellIndex > colCount) { //close the row
						         htmlTable += '</tr>';
						         cellIndex = 1;
						       }
						     }
						     //finish empty cells
						 //     var remainingCellsCount = menuTags.length % colCount;
						 //     if (remainingCellsCount) {
						 //       for (var $i=0; $i<remainingCellsCount; $i++) {
						 //         html += '<td width="120"> </td>' + "\n";
						 //       }
						 //       html += '</tr>';
						 //     }
						     htmlTable += '</tbody></table>' + "\n";
						     htmlTable += '</td></tr>' + "\n";

								 // 4th Line - Notes

								 htmlTable += '<table style="font:12px Arial;LINE-HEIGHT:25px;" name="tblMenuAllergens" cellpadding="1" border="0">';
								 htmlTable += '<tbody>';
								 htmlTable += '<col width=120 style="background-color:#eaeaea"><col>';


								 if(notes1forprint != '')
								 	htmlTable += '<tr style="border:none;height:20px;"><td align=left width=100 style="font-weight:normal;font:12px Arial">Cargo Worthy </td><td style="padding-left: 5px;" colspan="3" ><b>' + notes1forprint + '</b></td></tr>';

									if(notes2forprint != '')
 								 	htmlTable += '<tr style="border:none;height:20px;"><td align=left width=100 style="font-weight:normal;font:12px Arial">Notes 2 </td><td style="padding-left: 5px;" colspan="3" ><b>' + notes2forprint + '</b></td></tr>';

									if(notes3forprint != '')
 								 	htmlTable += '<tr style="border:none;height:20px;"><td align=left width=100 style="font-weight:normal;font:12px Arial">Notes 3 </td><td style="padding-left: 5px;" colspan="3" ><b>' + notes3forprint + '</b></td></tr>';

									if(notes4forprint != '')
 								 	htmlTable += '<tr style="border:none;height:20px;"><td align=left width=100 style="font-weight:normal;font:12px Arial">Notes 4 </td><td style="padding-left: 5px;" colspan="3" ><b>' + notes4forprint + '</b></td></tr>';

									if(notes5forprint != '')
 								 	htmlTable += '<tr style="border:none;height:20px;"><td align=left width=100 style="font-weight:normal;font:12px Arial">Notes 5 </td><td style="padding-left: 5px;" colspan="3" ><b>' + notes5forprint + '</b></td></tr>';

								 htmlTable += '</tbody></table>';

								 htmlTable += '<br>';	// Line Break

								 htmlTable += '</tbody></table>' + "\n";
						     console.log(htmlTable);
						 })($menu_tags, MENU_TAGS_COLUMN_COUNT);


						 var totalU = 0.00;
						 var totalJ = 0.00;
						 var totalO = 0.00;
						 var totalI = 0.00;
						 var totalV = 0.00;
						 var totalS = 0.00;
						 var totalX = 0.00;
						 var total = 0.00;

						 /* ----------------------------------------*/
						 /* --------  Carcass Lines Section  ------ */
						 /* ----------------------------------------*/

						 /*var excelDataPrint = [];
						 var excelDataPrintGet = [];
						 excelDataPrintGet = oExcelGridJ1.getData();*/

						 var excelDataPrint = [];
				 		var excelDataPrintGet = oFESTExcel.getData();

						 // Make totals based on the Responsibility Code //
						 var labhrU = 0.00;
						 var labhrJ = 0.00;
						 var labhrO = 0.00;
						 var labhrI = 0.00;
						 var labhrV = 0.00;
						 var labhrS = 0.00;
						 var labhrX = 0.00;

						 var matrcU = 0.00;
						 var matrcJ = 0.00;
						 var matrcO = 0.00;
						 var matrcI = 0.00;
						 var matrcV = 0.00;
						 var matrcS = 0.00;
						 var matrcX = 0.00;

						 var labrtU = 0.00;
						 var labrtO = 0.00;
						 var labrtI = 0.00;
						 var labrtS = 0.00;
						 var labrtX = 0.00;
						 var labrt = 0.00;


						 var matrc = 0.00;

						 var currLength = excelDataPrintGet.length;

						 for(var i =0; i < currLength; i++){
						 	loop1 : for(var j =0; j < 12; j++){
						 		if(excelDataPrintGet[i][j] != "" && excelDataPrintGet[i][j] != null){
						 			excelDataPrint.push(excelDataPrintGet[i]);
						 			break loop1;
						 		}
						 	}
						 }

						 if(printExcelData.length > 0){

							// for(var i=0; i<printExcelData.length; i++){
							// 		loop1 : for(var j=0; j<locationCodes.length; j++){
							// 			if(printExcelData[i].Location == locationCodes[j].locKey){
							// 					printExcelData[i].Location = locationCodes[j].locKey + "<br>" + locationCodes[j].locText;
							// 					break loop1;
							// 			}
							// 		}
						 //
							// 		loop2 : for(var j=0; j<componentCodes.length; j++){
							// 			if(printExcelData[i].Component == componentCodes[j].comKey){
							// 					printExcelData[i].Component = componentCodes[j].comKey + "<br>" + componentCodes[j].comText;
							// 					break loop2;
							// 			}
							// 		}
						 //
							// 		loop3 : for(var j=0; j<damageCodes.length; j++){
							// 			if(printExcelData[i].Damage == damageCodes[j].damKey){
							// 					printExcelData[i].Damage = damageCodes[j].damKey + "<br>" + damageCodes[j].damText;
							// 					break loop3;
							// 			}
							// 		}
						 //
							// 		loop4 : for(var j=0; j<materialCodes.length; j++){
							// 			if(printExcelData[i].Material == materialCodes[j].matKey){
							// 					printExcelData[i].Material = materialCodes[j].matKey + "<br>" + materialCodes[j].matText;
							// 					break loop4;
							// 			}
							// 		}
						 //
							// 		loop5 : for(var j=0; j<repairCodes.length; j++){
							// 			if(printExcelData[i].Repair == repairCodes[j].repKey){
							// 					printExcelData[i].Repair = repairCodes[j].repKey + "<br>" + repairCodes[j].repText;
							// 					break loop5;
							// 			}
							// 		}
						 // }

						 // Only if Combined is selected, check if location code starts with "M", then multiply with machinery lab rate
						 // Otherwise, keep as either carcass or Machinery

						 // if(unitParrtCodeForLabRate == "R"){
						 // 	if(excelDataPrint[i][0].substr(0,1) == "M"){	// Machinery Line Item
						 // 		globalLabCost = globalLabCostM;
						 // 	}else{
						 // 		globalLabCost = globalLabCostC;
						 // 	}
						 //
						 // }else{
						 //
						 // }

						 for(var i=0; i<excelDataPrint.length; i++){
									 if(excelDataPrint[i][0] != null){
											if(unitParrtCodeForLabRate == "R"){
												if(excelDataPrint[i][0].substr(0,1) == "M"){	// Machinery Line Item
													globalLabCost = globalLabCostM;
												}else{
													globalLabCost = globalLabCostC;
												}
											}
										}
							if(excelDataPrint[i][11] != null){
							 	if(excelDataPrint[i][11].substr(0,1).toUpperCase() == 'U'){
							 		labhrU = (excelDataPrint[i][9] == "")? labhrU : parseFloat(parseFloat(labhrU).toFixed(2)) + parseFloat(parseFloat(excelDataPrint[i][9]).toFixed(2));
							 		matrcU = (excelDataPrint[i][10] == "")? matrcU : parseFloat(parseFloat(matrcU).toFixed(2)) + parseFloat(parseFloat(excelDataPrint[i][10]).toFixed(2));
									labrtU = labrtU + parseFloat((parseFloat(parseFloat(excelDataPrint[i][9]).toFixed(2)) * globalLabCost));
							 	}else if(excelDataPrint[i][11].substr(0,1).toUpperCase() == 'J'){
							 		labhrJ = (excelDataPrint[i][9] == "")? labhrJ : parseFloat(parseFloat(labhrJ).toFixed(2)) + parseFloat(parseFloat(excelDataPrint[i][9]).toFixed(2));
							 		matrcJ = (excelDataPrint[i][10] == "")? matrcJ : parseFloat(parseFloat(matrcJ).toFixed(2)) + parseFloat(parseFloat(excelDataPrint[i][10]).toFixed(2));
									labrtJ = labrtJ + parseFloat((parseFloat(parseFloat(excelDataPrint[i][9]).toFixed(2)) * globalLabCost));
							 	}else if(excelDataPrint[i][11].substr(0,1).toUpperCase() == 'O' || excelDataPrint[i][11].substr(0,1).toUpperCase() == 'S'){
							 		labhrO = (excelDataPrint[i][9] == "")? labhrO : parseFloat(parseFloat(labhrO).toFixed(2)) + parseFloat(parseFloat(excelDataPrint[i][9]).toFixed(2));
							 		matrcO = (excelDataPrint[i][10] == "")? matrcO : parseFloat(parseFloat(matrcO).toFixed(2)) + parseFloat(parseFloat(excelDataPrint[i][10]).toFixed(2));
									labrtO = labrtO + parseFloat((parseFloat(parseFloat(excelDataPrint[i][9]).toFixed(2)) * globalLabCost));
							 	}else if(excelDataPrint[i][11].substr(0,1).toUpperCase() == 'I'){
							 		labhrI = (excelDataPrint[i][9] == "")? labhrI : parseFloat(parseFloat(labhrI).toFixed(2)) + parseFloat(parseFloat(excelDataPrint[i][9]).toFixed(2));
							 		matrcI = (excelDataPrint[i][10] == "")? matrcI : parseFloat(parseFloat(matrcI).toFixed(2)) + parseFloat(parseFloat(excelDataPrint[i][10]).toFixed(2));
									labrtI = labrtI + parseFloat((parseFloat(parseFloat(excelDataPrint[i][9]).toFixed(2)) * globalLabCost));
							 	}else if(excelDataPrint[i][11].substr(0,1).toUpperCase() == 'V'){
							 		labhrV = (excelDataPrint[i][9] == "")? labhrV : parseFloat(parseFloat(labhrV).toFixed(2)) + parseFloat(parseFloat(excelDataPrint[i][9]).toFixed(2));
							 		matrcV = (excelDataPrint[i][10] == "")? matrcV : parseFloat(parseFloat(matrcV).toFixed(2)) + parseFloat(parseFloat(excelDataPrint[i][10]).toFixed(2));
									labrtV = labrtV + parseFloat((parseFloat(parseFloat(excelDataPrint[i][9]).toFixed(2)) * globalLabCost));
							 	}else if(excelDataPrint[i][11].substr(0,1).toUpperCase() == 'X'){
									labhrX = (excelDataPrint[i][9] == "")? labhrX : parseFloat(parseFloat(labhrX).toFixed(2)) + parseFloat(parseFloat(excelDataPrint[i][9]).toFixed(2));
									matrcX = (excelDataPrint[i][10] == "")? matrcX : parseFloat(parseFloat(matrcX).toFixed(2)) + parseFloat(parseFloat(excelDataPrint[i][10]).toFixed(2));
									labrtX = labrtX + parseFloat((parseFloat(parseFloat(excelDataPrint[i][9]).toFixed(2)) * globalLabCost));
								}
						 	}
					 		}



						 // labrtU = labhrU * globalLabCost;
						 // labrtO = labhrO * globalLabCost;
						 // labrtI = labhrI * globalLabCost;
						 // labrtS = labhrS * globalLabCost;
						 // labrtX = labhrX * globalLabCost;

						 labrt = labrtU + labrtO + labrtI + labrtS; // + labrtX;


						 matrc = matrcU + matrcO + matrcI + matrcS; // + matrcX;
						 //matrc = parseFloat(matrc).toFixed(2);
						 totalU = labrtU + matrcU;
						 totalO = labrtO + matrcO;
						 totalI = labrtI + matrcI;
						 totalS = labrtS + matrcS;
						 totalX = labrtX + matrcX;
						 total = labrt + matrc;


						 // Repair Lines Header for Carcass
						 htmlTable += '<div style="font:bold 20px Arial;text-decoration: underline;padding-top: 10px;padding-right: 10px;padding-bottom: 10px;"><b>'
						 						+ "Item Details"	// style="padding-left:10px;font:bold 20px Arial;"
												+ '</b></div>';
			    	 htmlTable += '<table cellpadding="3" border="1" style="border-collapse: collapse;">'; // Carcass Table Start

							// Carcass Line Items Section....
			       	   htmlTable += '<tr>';
			       	   for (var key in printExcelData[0]){
											if(key == "Hours" || key == "Labour Cost" || key == "Material Cost"){
												htmlTable += '<td align=right style="font: bold 12px Arial;">'+key+'</td>';
											}else if(key == "Responsibility"){
												htmlTable += '<td align=center style="font: bold 12px Arial;">'+key+'</td>';
											}else{
												htmlTable += '<td align=left style="font: bold 12px Arial;">'+key+'</td>';
											}
		               }
		               htmlTable += '</tr>';

								 var tablength = printExcelData.length;

			           // Create PrimData1 Table Body
			           $.each(printExcelData, function(i, item) {


			                  htmlTable += '<tr>';
			               for (var key in item){
												if(i != (tablength - 1)){
												if(key == "Hours" || key == "Labour Cost" || key == "Material Cost"){
													htmlTable += '<td align=right style="font: 12px Arial;">'+item[key]+'</td>';
												}else if(key == "Responsibility"){
													htmlTable += '<td align=center style="font: 12px Arial;">'+item[key]+'</td>';
												}else{
													htmlTable += '<td align=left style="font: 12px Arial;">'+item[key]+'</td>';
												}
											}else{
												if(key == "Hours" || key == "Labour Cost" || key == "Material Cost"){
													htmlTable += '<td align=right style="font: 12px Arial;font-weight:bold">'+item[key]+'</td>';
												}else if(key == "Responsibility"){
													htmlTable += '<td align=center style="font: 12px Arial;font-weight:bold">'+item[key]+'</td>';
												}else{
													htmlTable += '<td align=left style="font: 12px Arial;font-weight:bold">'+item[key]+'</td>';
												}
											}
			                  //console.log(key + ' = ' + item[key]);
			               }
			               htmlTable += '</tr>';

			           });
								 htmlTable += '</table>'; // Carcass Table End
			       }else{ // Zero Cost Estimate
										 // Repair Lines Header for Carcass
										 htmlTable += '<div style="font-size: 20px;text-decoration: underline;padding-top: 10px;padding-right: 10px;padding-bottom: 10px;color: #cc292b;"><b>' + "Item Details" + '</b></div>';
										 htmlTable += '<br>';
										 htmlTable += '<table border="0">'; // Machinery Table Start

										htmlTable += '<tr style="border:none;">';
										htmlTable += '<td colspan="4">';
										htmlTable += 'Zero Cost';
										htmlTable += '</td>';
										htmlTable += '</tr>';

										htmlTable += '</table>'; // Carcass Table End
						 }

						 htmlTable += '<br>';	// Line Break

						 // Total Section
						 //htmlTable += '<div style="font-size: 20px;text-decoration: underline;padding-top: 10px;padding-right: 10px;padding-bottom: 10px;color: #cc292b;"><b>Total</b></div>';
						 htmlTable += '<br>';

						 var toal = "";
						 var printTotalCost = [];
						 labrtU = parseFloat(labrtU).toFixed(2);
						 matrcU = parseFloat(matrcU).toFixed(2);
						 total = parseFloat(labrtU.split(',').join('')) + parseFloat(matrcU.split(',').join(''));
						 printTotalCost.push({
						 	"" : "User",
						 	"Labour" : thousandsep(labrtU),
						 	"Material" : thousandsep(matrcU),
							"Total" : thousandsep(total)
						 });

						 labrtI = parseFloat(labrtI).toFixed(2);
						 matrcI = parseFloat(matrcI).toFixed(2);
						 total = parseFloat(labrtI.split(',').join('')) + parseFloat(matrcI.split(',').join(''));
						 printTotalCost.push({
						 	"" : "SeaCover",
						 	"Labour" : thousandsep(labrtI),
						 	"Material" : thousandsep(matrcI),
							"Total" : thousandsep(total)
						 });

						 labrtO = parseFloat(labrtO).toFixed(2);
						 matrcO = parseFloat(matrcO).toFixed(2);
						 total = parseFloat(labrtO.split(',').join('')) + parseFloat(matrcO.split(',').join(''));
						 printTotalCost.push({
						 	"" : "Owner",
						 	"Labour" : thousandsep(labrtO),
						 	"Material" : thousandsep(matrcO),
							"Total" : thousandsep(total)
						 });

						 // labrtS = parseFloat(labrtS).toFixed(2);
						 // matrcS = parseFloat(matrcS).toFixed(2);
						 // total = parseFloat(labrtS.split(',').join('')) + parseFloat(matrcS.split(',').join(''));
						 // printTotalCost.push({
						 // 	"" : "Special",
						 // 	"Labour" : thousandsep(labrtS),
						 // 	"Material" : thousandsep(matrcS),
							// "Total" : thousandsep(total)
						 // });

						 labrtX = parseFloat(labrtX).toFixed(2);
						 matrcX = parseFloat(matrcX).toFixed(2);
						 total = parseFloat(labrtX.split(',').join('')) + parseFloat(matrcX.split(',').join(''));
						 // printTotalCost.push({
						 // 	"" : "No Action",
						 // 	"Labour" : thousandsep(labrtX),
						 // 	"Material" : thousandsep(matrcX),
							// "Total" : thousandsep(total)
						 // });

						 labrt = parseFloat(labrt).toFixed(2);
						 matrc = parseFloat(matrc).toFixed(2);
						 total = parseFloat(labrt.split(',').join('')) + parseFloat(matrc.split(',').join(''));
						 printTotalCost.push({
						 	"" : "Total",
						 	"Labour" : thousandsep(labrt),
						 	"Material" : thousandsep(matrc),
							"Total" : thousandsep(total)
						 });

						 htmlTable += '<table cellpadding="3" border="1" style="border-collapse: collapse;">';	// Total section start

						 // Total Lines
						 var alignCount = 0;
						 htmlTable += '<tr>';
						 for (var key in printTotalCost[0]){
							 	 alignCount = alignCount + 1;
								 if(alignCount == 1){
						 		 htmlTable += '<td align=left style="font: bold 12px Arial;">'+key+'</td>';
							 }else{
								  htmlTable += '<td align=right style="font: bold 12px Arial;">'+key+'</td>';
							 }
						 	}
						 	htmlTable += '</tr>';
						 	var colorCount = 0;

						 // Create PrimData1 Table Body
						 $.each(printTotalCost, function(i, item) {
						 		 colorCount = colorCount + 1;
						 			 htmlTable += '<tr>';
									 alignCount = 0;
						 		for (var key in item){
									alignCount = alignCount + 1;
						 			 //alert("key : "+ key);
								 if(alignCount == 1){	// First Column : User, SeaCover, Owner, Total
							 		 if(colorCount == printTotalCost.length){	// Last Row
							 			 htmlTable += '<td align=left style="font:bold 12px Arial; background-color:#fef885">'+item[key]+'</td>';
							 		 }else{	// Other Rows
							 			 htmlTable += '<td align=left style="font: 12px Arial;">'+item[key]+'</td>';
							 		 }
								 }else{	// Other Columns
									 if(colorCount == printTotalCost.length){	// Last Row
										 htmlTable += '<td align=right style="font:bold 12px Arial; background-color:#fef885">'+item[key]+'</td>';
									 }else{	// Other Rows
										 htmlTable += '<td align=right style="font: 12px Arial;">'+item[key]+'</td>';
									 }
							 	 }

						 			 //console.log(key + ' = ' + item[key]);
						 		}
						 		htmlTable += '</tr>';
						 });

						 htmlTable += '</table>';	// Total section End

				   if(func == "print"){
				   	   			//html +='<style>.table20,.table50,.table70,table{border-collapse:collapse}table{width:100%}.table70{width:70%}.table50{width:50%}.table20{width:20%}tr:nth-of-type(even){background:#eee}th{background:#333;color:#fff;font-weight:700}td,th{padding:6px;border:1px solid #ccc;text-align:left}@page{size:landscape;}</style><html><head><title></title></head><body >';
	                  //alert("Print");
	                  html += '<div>';
	                  html +=htmlTable+'</div>';
	                  html +='</body></html>';

	           }else if(func == "excel"){
	               //alert("Export");
	               var uri = 'data:application/vnd.ms-excel;base64,',
	               template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">'
	               +'<!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->'
	               +'<head></head>'
								 //+'<style>.table20,.table50,.table70,table{border-collapse:collapse}table{width:100%}.table70{width:70%}.table50{width:50%}.table20{width:20%}tr:nth-of-type(even){background:#eee}th{background:#333;color:#fff;font-weight:700}td,th{padding:6px;border:1px solid #ccc;text-align:left}@page{size:landscape;}</style>'
	               +'<body>'+ htmlTable  +'</body></html>',
	               base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) },
	               format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }

	               // Open Excel
	/*                   if (!table.nodeType)
	                     table = document.getElementById(table)*/
	         var ctx = {worksheet: title || 'Worksheet', table: htmlTable};
	         //window.location.href = uri + base64(format(template, ctx));
	         if ((navigator.appName == 'Microsoft Internet Explorer') || (!!navigator.userAgent.match(/Trident.*rv[ :]*11\./)))
	       	    {
	 		            // var byteCharacters = atob(uri + base64(format(template, ctx)));
	 		            var blobObject = b64toBlob(base64(format(template, ctx)), 'application/vnd.ms-excel');
	 		            //window.navigator.msSaveBlob(blobObject, 'msSaveBlob_testFile.xls'); //only with save option
	 		            window.navigator.msSaveOrOpenBlob(blobObject, 'downloadfile.xls'); //save and open both option
	 	        }else
	       	    {
	       	    	 //window.location.href = uri + base64(format(template, ctx));
	 	        		 window.open(uri + base64(format(template, ctx)));
	       	    }
	        }

	           return html;
					},

					checkIfValid : function(){

						var oFESTExcelData = oFESTExcel.getData();
						//oFESTExcelData = removeInvalidLines(oFESTExcelData);

						var isEmpty = false;
						var localStringCount = checkValidLinesLength(oFESTExcel.getData());
						for(var i = 0; i < localStringCount; i++){
							loop1 : for(var j =0; j < 12; j++){
								if(oFESTExcelData[i][j] != "" && oFESTExcelData[i][j] != null){
									if(oFESTExcelData[i][0] == '' || oFESTExcelData[i][1] == '' || oFESTExcelData[i][2] == '' || oFESTExcelData[i][4] == '' || oFESTExcelData[i][9] == '' || oFESTExcelData[i][10] == '' || oFESTExcelData[i][11] == '' ||
											oFESTExcelData[i][0] == null || oFESTExcelData[i][1] == null || oFESTExcelData[i][2] == null || oFESTExcelData[i][4] == null || oFESTExcelData[i][9] == null || oFESTExcelData[i][10] == null ||  oFESTExcelData[i][11] == null){
										isEmpty = true;
									}
									break loop1;
								}
							}
						}
						return isEmpty;
					},

					checkIfDropDownsAreValid : function(){

						var oFESTExcelData = oFESTExcel.getData();
						//oFESTExcelData = removeInvalidLines(oFESTExcelData);
						var foundLocation = false;
						var foundComponent = false;
						var foundDamage = false;
						var foundMaterial = false;
						var foundRepair = false;
						var foundResponsibility = false;

						var isDropDownsAreValid = true;
						var localStringCount = checkValidLinesLength(oFESTExcel.getData());
						for(var i = 0; i < localStringCount; i++){
							loop1 : for(var j =0; j < 12; j++){
								if(oFESTExcelData[i][j] != "" && oFESTExcelData[i][j] != null){
									foundLocation = isInArrayLineCodes(oFESTExcelData[i][0], locationSource);
									console.log(foundLocation);

									foundComponent = isInArrayLineCodes(oFESTExcelData[i][1], componentSource);
									console.log(foundComponent);

									foundDamage = isInArrayLineCodes(oFESTExcelData[i][2], damageSource);
									console.log(foundDamage);

									foundMaterial = isInArrayLineCodes(oFESTExcelData[i][3], materialSource);
									console.log(foundMaterial);

									foundRepair = isInArrayLineCodes(oFESTExcelData[i][4], repairSource);
									console.log(foundRepair);

									foundResponsibility = isInArrayLineCodes(oFESTExcelData[i][11], aResponsCode);
									foundResponsibility = true; //tempchange
									console.log(foundResponsibility);


									if(!foundLocation || !foundComponent || !foundDamage || !foundMaterial || !foundRepair || !foundResponsibility){
										isDropDownsAreValid = false;
									}
									break loop1;
								}
							}
						}
						console.log(isDropDownsAreValid);
						return isDropDownsAreValid;

					},

					checkIfNumbersAreNumbers : function(){

						var oFESTExcelData = oFESTExcel.getData();
						//oFESTExcelData = removeInvalidLines(oFESTExcelData);

						var isNumbersAreNumbers = true;
						var localStringCount = checkValidLinesLength(oFESTExcel.getData());
						for(var i = 0; i < localStringCount; i++){
							loop1 : for(var j =0; j < 12; j++){
								if(oFESTExcelData[i][j] != "" && oFESTExcelData[i][j] != null){
									oFESTExcelData[i][10] = (oFESTExcelData[i][10] != null)?oFESTExcelData[i][10].split(',').join(''):oFESTExcelData[i][10];
									if(isNaN(oFESTExcelData[i][5]) || isNaN(oFESTExcelData[i][6]) || isNaN(oFESTExcelData[i][8]) || isNaN(oFESTExcelData[i][9]) || isNaN(oFESTExcelData[i][10])){
										isNumbersAreNumbers = false;
									}
									break loop1;
								}
							}
						}
						return isNumbersAreNumbers;
					}


});

function isValidDate(dateString) {
	  var regEx = /^\d{4}-\d{2}-\d{2}$/;
	  if(!dateString.match(regEx)) return false;  // Invalid format
	  var d = new Date(dateString);
	  if(!d.getTime() && d.getTime() !== 0) return false; // Invalid date
	  return d.toISOString().slice(0,10) === dateString;
}

function checkValidLinesLength(exceldata) {
		 var retLength = 0;
		for(var i=0; i<exceldata.length; i++){
			loop1 : for (var key in exceldata[i]) {
	        if (exceldata[i][key] != null && exceldata[i][key] != ""){
	        	retLength = retLength + 1;
							break loop1;
	        }
	            //return false;

	    }
		}

    return retLength;
}

function removeInvalidLines(exceldata) {
		var excelDataNew = [];
		var retLength = 0;
		for(var i=0; i<exceldata.length; i++){
			loop1 : for (var key in exceldata[i]) {
	        if (exceldata[i][key] != null && exceldata[i][key] != ""){
	        	retLength = retLength + 1;
							excelDataNew.push(exceldata[i]);
							break loop1;
	        }
	    }
		}
		oFESTExcel.loadData(excelDataNew);
    return excelDataNew;
}

function yyyymmddtoday() {
    var now = new Date();
    var y = now.getFullYear();
    var m = now.getMonth() + 1;
    var d = now.getDate();
    return '' + y + (m < 10 ? '0' : '') + m + (d < 10 ? '0' : '') + d;
}

function getFormattedDate() {
    var date = new Date();
    var str = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() + " " +  date.getHours() + ":" + date.getMinutes();
    return str;
}

function isInArrayLineCodes(value, array) {
	//return array.indexOf(value) > -1;
	  var retValue = false;
	  for (var x=0; x < array.length; x++) {
	  if (array[x] === value) {
		  retValue = array[x];
	  }
  }
	  return retValue;
}

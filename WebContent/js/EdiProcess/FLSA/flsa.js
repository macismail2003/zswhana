// MAC04022019

// replaced new sap.m.Input with new sap.ui.commons.TextField
// added styleclasses FormInputStyle marginTop7 RepairNotes to all new sap.ui.commons.TextField


// replaced new sap.m.Label with new sap.ui.commons.Label
// replaced selectionLabels with marginTop10

// replaced sap.m.ComboBox with sap.ui.commons.ComboBox
// added styleclass FormInputStyle marginTop7

//MAC04022019

var oJSONFLSASAPData = [];
var oSTRINGFLSAValidationMessage = "";

var globalLabCostC = "";
var globalLabCostM = "";

sap.ui.model.json.JSONModel.extend("flsa", {

	/*FLSA : Create Lessee Approval Pages */

	createFLSAPage : function(){

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

        var oFLSAComboDepot = new sap.ui.commons.ComboBox("idFLSAComboDepot",{
        	visible: true,
            width:"300px",
            displaySecondaryValues:true,
            placeholder: "Depot",
            selectionChange: function(evnt){
            	oCurrent.resetFLSAKeyFields();
            },
					}).addStyleClass("FormInputStyle marginTop7");

        var oFLSAModelDepot = new sap.ui.model.json.JSONModel();
        oFLSAModelDepot.setSizeLimit(99999);
        oFLSAModelDepot.setData({data:depotEdiData});

        oFLSAComboDepot.setModel(oFLSAModelDepot);
        oFLSAComboDepot.setSelectedKey(depotEdiData[0].key);
        oFLSAComboDepot.bindItems("/data", new sap.ui.core.ListItem({text: "{text}", key:"{key}"}));

				// var oCombo = sap.ui.getCore().byId("idFLSAComboDepot"),
        // oPopOver = oCombo.getPicker();
				// oPopOver.setContentHeight("400px");

        //oFLSAComboDepot.setEnabled(depotEnabled);

//        if(depotEnabled){
//        	oFLSAComboDepot.setSelectedKey(depotEdiData[0].key);
//        }else{
//        	oFLSAComboDepot.setSelectedKey(depotEdiData[1].key);
//        }


        var oFLSALabelDepot = new sap.ui.commons.Label("idFLSALabelDepot",{
			  text : "Depot",
				required : true,
			  width : "130px"
        }).addStyleClass("marginTop10");

		var oFLSAFlexDepot = new sap.m.FlexBox("idFLSAFlexDepot",{
            items: [oFLSALabelDepot,
                    oFLSAComboDepot
                    ],
            direction: "Row"
		}).addStyleClass("marginMainLeft1");

		var oFLSAExcelContainer = new sap.ui.core.HTML("idFLSAExcelContainer",{
			//visible : false
		}).addStyleClass("marginLeft marginTop20");

    var oFLSAExcelHTML = '<div id="idFLSAExcel" style="width:95%;height:500px" class="marginMainLeft marginTop20">';
    oFLSAExcelContainer.setContent(oFLSAExcelHTML);

        /*******************************/
        /* Serial Number and Reference */
        /* Serial Number */

        var oFLSAInputSerial = new sap.ui.commons.TextField("idFLSAInputSerial",{
            value : "",
            width : "130px",
            maxLength: 11,
						liveChange: function(evnt){
							oCurrent.resetFLSAKeyFields();
            },
            //type: sap.ui.commons.TextFieldType.Number
        }).addStyleClass("FormInputStyle marginTop7");

        var oFLSALabelSerial = new sap.ui.commons.Label("idFLSALabelSerial",{
			  text : "Serial No.",
				required : true,
			  width : "130px"
        }).addStyleClass("marginTop10");


		var oFLSAFlexSerial = new sap.m.FlexBox("idFLSAFlexSerial",{
		             items: [oFLSALabelSerial,
		                     oFLSAInputSerial
		                     ],
		             width: "300px",
		             direction: "Row"
		});

		/* Reference */

        var oFLSAInputReference = new sap.ui.commons.TextField("idFLSAInputReference",{
            value : "",
            width : "130px",
            //type: sap.ui.commons.TextFieldType.Number
        }).addStyleClass("FormInputStyle marginTop7");

        var oFLSALabelReference = new sap.ui.commons.Label("idFLSALabelReference",{
			  text : "Reference",
				required : true,
			  width : "130px"
        }).addStyleClass("marginTop10");


		var oFLSAFlexReference = new sap.m.FlexBox("idFLSAFlexReference",{
		             items: [oFLSALabelReference,
		                     oFLSAInputReference
		                     ],
		             width: "300px",
		             direction: "Row"
		});

		var oFLSAFlexSerialReference = new sap.m.FlexBox("idFLSAFlexSerialReference",{
            items: [oFLSAFlexSerial,
                    oFLSAFlexReference
                    ],
            width: "300px",
            direction: "Row"
		});

		/*******************************/
        /* Date and Amount */
        /* Date */

        var oFLSAInputAppDate = new sap.ui.commons.DatePicker("idFLSAInputAppDate",{
          	// displayFormat : "dd/MM/yyyy",
          	// valueFormat : "yyyyMMdd",
          	// value : new Date().format("yyyymmdd"),
						value: {
						  path: yyyymmddtoday(),
					  	type: new sap.ui.model.type.Date({pattern: "dd/MM/yyyy"})
						},
						editable : false,
						width : "130px"
          }).addStyleClass("FormInputStyle marginTop7 dateDisabledBorder");

        var oFLSALabelAppDate = new sap.ui.commons.Label("idFLSALabelAppDate",{
			  text : "Approval Date",
				required : true,
			  width : "130px"
        }).addStyleClass("marginTop10");


		var oFLSAFlexAppDate = new sap.m.FlexBox("idFLSAFlexAppDate",{
		             items: [oFLSALabelAppDate,
		                     oFLSAInputAppDate
		                     ],
		             width: "300px",
		             direction: "Row"
		});

		/* Amount */

        var oFLSAInputAmount = new sap.ui.commons.TextField("idFLSAInputAmount",{
            value : "",
            width : "130px",
            //type: sap.ui.commons.TextFieldType.Number
        }).addStyleClass("FormInputStyle marginTop7");

		// oFLSAInputAmount.onfocusin =  function(e) {
		// 	this.setValueState(sap.ui.core.ValueState.None);
		// 	this.setPlaceholder("");
		// };

		// oFLSAInputAmount.onfocusout =  function(e) {
		// 	if(isNaN(e.target.value)){
		// 		this.setValueState(sap.ui.core.ValueState.Error);
		// 		this.setPlaceholder("");
		// 		this.setValue("");
		// 	}else{
		// 		this.setValueState(sap.ui.core.ValueState.None);
		// 		this.setPlaceholder("");
		// 	}
		// };

        var oFLSALabelAmount = new sap.ui.commons.Label("idFLSALabelAmount",{
			  text : "Amount",
				required : true,
			  width : "130px"
        }).addStyleClass("marginTop10");


		var oFLSAFlexAmount = new sap.m.FlexBox("idFLSAFlexAmount",{
		             items: [oFLSALabelAmount,
		                     oFLSAInputAmount
		                     ],
		             width: "300px",
		             direction: "Row"
		});

		var oFLSAFlexAppDateAmount = new sap.m.FlexBox("idFLSAFlexAppDateAmount",{
            items: [oFLSAFlexAppDate,
                    oFLSAFlexAmount
                    ],
            width: "300px",
            direction: "Row"
		});

		/* Status */

        /*var oFLSAInputStatus = new sap.ui.commons.TextField("idFLSAInputStatus",{
            value : "",
            width : "50px",
            //type: sap.ui.commons.TextFieldType.Number
        });*/

		var oFLSAComboStatus = new sap.ui.commons.ComboBox("idFLSAComboStatus", {
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

		oFLSAComboStatus.addItem(new sap.ui.core.ListItem({
										text:"D",
										key: "D"
										}));

		oFLSAComboStatus.addItem(new sap.ui.core.ListItem({
			text:"A",
			key: "A"
			}));


        var oFLSALabelStatus = new sap.ui.commons.Label("idFLSALabelStatus",{
			  text : "Status",
				required : true,
			  width : "130px"
        }).addStyleClass("marginTop10");


		var oFLSAFlexStatus = new sap.m.FlexBox("idFLSAFlexStatus",{
		             items: [oFLSALabelStatus,
		                     oFLSAComboStatus
		                     ],
		             width: "300px",
		             visible: false,
		             direction: "Row"
		});

		var oFLSADivider = new sap.ui.commons.HorizontalDivider({width: "95%", type: "Area", height: "Medium"});

		var oFLSASectionValid = oCurrent.setContentSectionValid();

		var oFLSAButtonReset = new sap.m.Button("idFLSAButtonReset",{
			  text : "Reset",
			  width:"100px",
			  styled:false,
			  visible: true,
			  //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: true}),
			  press:function(){
				  oCurrent.resetFLSA();
		}}).addStyleClass("normalBtn");

      var oFLSAButtonValidate = new sap.m.Button("idFLSAButtonValidate",{
			  text : "Validate",
			  width:"100px",
			  styled:false,
			  visible: true,
			  //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: true}),
			  press:function(){
				  oCurrent.validateFLSA();
		}}).addStyleClass("normalBtn");



		var oFLSAFlexVRButton = new sap.m.FlexBox("idFLSAFlexVRButton",{
	          items: [oFLSAButtonValidate,
	                  oFLSAButtonReset
	                  ],
	          direction: "Row"
			}).addStyleClass("marginMainLeft");


		var oFLSALayoutSelection = new sap.ui.layout.form.ResponsiveGridLayout("idFLSALayoutSelection", {
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

		var oFLSAFormSelection = new sap.ui.layout.form.Form("idFLSAFormSelection",{
          layout: oFLSALayoutSelection,
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
									fields: [oFLSAFlexDepot],
									layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
								}),
								new sap.ui.layout.form.FormElement({
									fields: [oFLSAFlexSerial,oFLSAFlexReference, oFLSAFlexStatus],
									layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
								}),
								new sap.ui.layout.form.FormElement({
									fields: [oFLSAFlexAppDate,oFLSAFlexAmount, new sap.ui.commons.Label({width : "10px"})],
									layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
								}),
								new sap.ui.layout.form.FormElement({
									fields: [oFLSAFlexVRButton],
									layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
								}),
								new sap.ui.layout.form.FormElement({
									fields: [oFLSADivider],
									layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
								})

                      ],layoutData: new sap.ui.layout.GridData({span: "L7 M12 S12"})
                  })
          ]
  });


		// var oFLSALayoutSelectionAuto = new sap.ui.layout.form.ResponsiveGridLayout("idFLSALayoutSelectionAuto", {
		// 	  emptySpanL: 0,
	  //         emptySpanM: 0,
	  //         emptySpanS: 0,
		// 	  labelSpanL: 1,
	  //         labelSpanM: 1,
	  //         labelSpanS: 1,
	  //         columnsL: 2,
	  //         columnsM: 2,
	  //         columnsS: 2,
	  //         breakpointL: 765,
		// 	  breakpointM: 320
		// });
		//
		// var oFLSAFormSelectionAuto = new sap.ui.layout.form.Form("idFLSAFormSelectionAuto",{
    //     layout: oFLSALayoutSelectionAuto,
    //     width: "90%",
    //     formContainers: [
    //             new sap.ui.layout.form.FormContainer({
    //             	  //title: new sap.ui.core.Title({text: ""}),
    //                 formElements: [
		// 				new sap.ui.layout.form.FormElement({
		// 					fields: [oFLSAFlexCustomerCode, oFLSAFlexLessee, oFLSAFlexEstimate],
		// 					layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		// 				}),
		// 				new sap.ui.layout.form.FormElement({
		// 					fields: [oFLSAFlexRevNo, oFLSAFlexBaseCurr, oFLSAFlexLabRate],
		// 					layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		// 				}),
		// 				new sap.ui.layout.form.FormElement({
		// 					fields: [oFLSAFlexButtons],
		// 					layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		// 				})
    //                 ],layoutData: new sap.ui.layout.GridData({span: "L7 M12 S12"})
    //             })
    //     ]
		// });


		var oFLSAFlexFinal = new sap.m.FlexBox("idFLSAFlexFinal",{
            items: [ oFLSAFormSelection,
                     oFLSASectionValid,
                     oFLSAExcelContainer
                    ],
            direction: "Column"
		}).addStyleClass("marginMainLeft");


		return oFLSAFlexFinal;

    },

		setContentSectionValid : function(){


			/* Lab. Rate */

			    var oFLSAInputLabRate = new sap.ui.commons.TextField("idFLSAInputLabRate",{
			        value : "",
			        width : "130px",
			        enabled : false,
			        type: sap.m.InputType.Number
			    }).addStyleClass("FormInputStyle marginTop7 valuesDisabled");

			    var oFLSALabelLabRate = new sap.ui.commons.Label("idFLSALabelLabRate",{
			    text : "Lab. Rate (C)",
			    width : "130px"
			    }).addStyleClass("marginTop10");


			var oFLSAFlexLabRate = new sap.m.FlexBox("idFLSAFlexLabRate",{
			             items: [oFLSALabelLabRate,
			                     oFLSAInputLabRate
			                     ],
			             width: "350px",
			             direction: "Row"
			});

			/* Lab. Rate Machinery */

			    var oFLSAInputLabRateM = new sap.ui.commons.TextField("idFLSAInputLabRateM",{
			        value : "",
			        width : "130px",
			        enabled : false,
			        type: sap.m.InputType.Number
			    }).addStyleClass("FormInputStyle marginTop7 valuesDisabled");

			    var oFLSALabelLabRateM = new sap.ui.commons.Label("idFLSALabelLabRateM",{
			    text : "Lab. Rate (M)",
			    width : "130px"
			    }).addStyleClass("marginTop10");


			var oFLSAFlexLabRateM = new sap.m.FlexBox("idFLSAFlexLabRateM",{
			             items: [oFLSALabelLabRateM,
			                     oFLSAInputLabRateM
			                     ],
			             width: "350px",
			             direction: "Row",
									 //visible : false
			});

			/* DPP Limit */

			    var oFLSAInputDppLimit = new sap.ui.commons.TextField("idFLSAInputDppLimit",{
			        value : "",
			        width : "130px",
			        enabled : false,
			        type: sap.m.InputType.Number
			    }).addStyleClass("FormInputStyle marginTop7 valuesDisabled");

			    var oFLSALabelDppLimit = new sap.ui.commons.Label("idFLSALabelDppLimit",{
			    text : "SCR Limit Amt.",
			    width : "130px"
			    }).addStyleClass("marginTop10");


			var oFLSAFlexDppLimit = new sap.m.FlexBox("idFLSAFlexDppLimit",{
			             items: [oFLSALabelDppLimit,
			                     oFLSAInputDppLimit
			                     ],
			             width: "350px",
			             direction: "Row"
			});

			/* DPP Curr */

			    var oFLSAInputDppCurr = new sap.ui.commons.TextField("idFLSAInputDppCurr",{
			        value : "",
			        width : "130px",
			        enabled : false
			    }).addStyleClass("FormInputStyle marginTop7 valuesDisabled");

			    var oFLSALabelDppCurr = new sap.ui.commons.Label("idFLSALabelDppCurr",{
			    text : "SCR Limit Curr.",
			    width : "130px"
			    }).addStyleClass("marginTop10");


			var oFLSAFlexDppCurr = new sap.m.FlexBox("idFLSAFlexDppCurr",{
			             items: [oFLSALabelDppCurr,
			                     oFLSAInputDppCurr
			                     ],
			             width: "350px",
			             direction: "Row"
			});




			/* Redel */

			    var oFLSAInputRedel = new sap.ui.commons.TextField("idFLSAInputRedel",{
			        value : "",
			        width : "130px",
			        enabled : false,
			        //type: sap.m.InputType.Number
			    }).addStyleClass("FormInputStyle marginTop7 valuesDisabled");

			    var oFLSALabelRedel = new sap.ui.commons.Label("idFLSALabelRedel",{
			    text : "Redel. Auth",
			width : "130px",
			    }).addStyleClass("marginTop10");


			var oFLSAFlexRedel = new sap.m.FlexBox("idFLSAFlexRedel",{
			             items: [oFLSALabelRedel,
			                     oFLSAInputRedel
			                     ],
			             width: "350px",
			             direction: "Row"
			});


			/* Rev Number */

			    var oFLSAInputRevNo = new sap.ui.commons.TextField("idFLSAInputRevNo",{
			        value : "",
			        width : "130px",
			        enabled : false
			        //type: sap.m.InputType.Number
			    }).addStyleClass("FormInputStyle marginTop7 valuesDisabled");

			    var oFLSALabelRevNo = new sap.ui.commons.Label("idFLSALabelRevNo",{
			    text : "Rev. No.",
			width : "130px",
			    }).addStyleClass("marginTop10");


			var oFLSAFlexRevNo = new sap.m.FlexBox("idFLSAFlexRevNo",{
			             items: [oFLSALabelRevNo,
			                     oFLSAInputRevNo
			                     ],
			             width: "350px",
			             direction: "Row"
			});

			/* Gate IN Date */

			    var oFLSAInputGINDate = new sap.ui.commons.TextField("idFLSAInputGINDate",{
			        value : "",
			        width : "130px",
			        //type: sap.m.InputType.Number,
			        enabled : false
			    }).addStyleClass("FormInputStyle marginTop7 valuesDisabled");

			    var oFLSALabelGINDate = new sap.ui.commons.Label("idFLSALabelGINDate",{
			    text : "Gate IN Date",
			width : "130px",
			    }).addStyleClass("marginTop10");


			var oFLSAFlexGINDate = new sap.m.FlexBox("idFLSAFlexGINDate",{
			             items: [oFLSALabelGINDate,
			                     oFLSAInputGINDate
			                     ],
			             width: "350px",
			             direction: "Row"
			});


			/* Base Currency */

			    var oFLSAInputBaseCurr = new sap.ui.commons.TextField("idFLSAInputBaseCurr",{
			        value : "",
			        width : "130px",
			        enabled : false
			        //type: sap.m.InputType.Number
			    }).addStyleClass("FormInputStyle marginTop7 valuesDisabled");

			    var oFLSALabelBaseCurr = new sap.ui.commons.Label("idFLSALabelBaseCurr",{
			    text : "Depot Curr.",
			width : "130px",
			    }).addStyleClass("marginTop10");


			var oFLSAFlexBaseCurr = new sap.m.FlexBox("idFLSAFlexBaseCurr",{
			             items: [oFLSALabelBaseCurr,
			                     oFLSAInputBaseCurr
			                     ],
			             width: "350px",
			             direction: "Row"
			});

			/* Prev. On Hire Date */

			    var oFLSAInputPOHDate = new sap.ui.commons.TextField("idFLSAInputPOHDate",{
			        value : "",
			        width : "130px",
			        //type: sap.m.InputType.Number,
			        enabled : false
			    }).addStyleClass("FormInputStyle marginTop7 valuesDisabled");

			    var oFLSALabelPOHDate = new sap.ui.commons.Label("idFLSALabelPOHDate",{
			    text : "Prev. ON Hire Date",
			width : "130px",
			    }).addStyleClass("marginTop10");


			var oFLSAFlexPOHDate = new sap.m.FlexBox("idFLSAFlexPOHDate",{
			             items: [oFLSALabelPOHDate,
			                     oFLSAInputPOHDate
			                     ],
			             width: "350px",
			             direction: "Row"
			});

			/* Prev. On Hire Location */

			    var oFLSAInputPOHLocation = new sap.ui.commons.TextField("idFLSAInputPOHLocation",{
			        value : "",
			        width : "130px",
			        //type: sap.m.InputType.Number,
			        enabled : false
			    }).addStyleClass("FormInputStyle marginTop7 valuesDisabled");

			    var oFLSALabelPOHLocation = new sap.ui.commons.Label("idFLSALabelPOHLocation",{
			    text : "Prev. ON Hire Loc.",
			width : "130px",
			    }).addStyleClass("marginTop10");


			var oFLSAFlexPOHLocation = new sap.m.FlexBox("idFLSAFlexPOHLocation",{
			             items: [oFLSALabelPOHLocation,
			                     oFLSAInputPOHLocation
			                     ],
			             width: "350px",
			             direction: "Row"
			});

			/* Exch Rate */

			    var oFLSAInputExchRate = new sap.ui.commons.TextField("idFLSAInputExchRate",{
			        value : "",
			        width : "130px",
			        //type: sap.m.InputType.Number,
			        enabled : false
			    }).addStyleClass("FormInputStyle marginTop7 valuesDisabled");

			    var oFLSALabelExchRate = new sap.ui.commons.Label("idFLSALabelExchRate",{
			    text : "Exchange Rate",
			width : "130px",
			    }).addStyleClass("marginTop10");


			var oFLSAFlexExchRate = new sap.m.FlexBox("idFLSAFlexExchRate",{
			             items: [oFLSALabelExchRate,
			                     oFLSAInputExchRate
			                     ],
			             width: "350px",
			             direction: "Row"
			});

			/* Prod. Cate */

			    var oFLSAInputProdCate = new sap.ui.commons.TextField("idFLSAInputProdCate",{
			        value : "",
			        width : "130px",
			        //type: sap.m.InputType.Number,
			        enabled : false
			    }).addStyleClass("FormInputStyle marginTop7 valuesDisabled");

			    var oFLSALabelProdCate = new sap.ui.commons.Label("idFLSALabelProdCate",{
			    text : "Prod. Category",
			width : "130px",
			    }).addStyleClass("marginTop10");


			var oFLSAFlexProdCate = new sap.m.FlexBox("idFLSAFlexProdCate",{
			             items: [oFLSALabelProdCate,
			                     oFLSAInputProdCate
			                     ],
			             width: "350px",
			             direction: "Row"
			});

			/* Customer Code */

			    var oFLSAInputCustomerCode = new sap.ui.commons.TextField("idFLSAInputCustomerCode",{
			        value : "",
			        width : "130px",
			        //type: sap.m.InputType.Number,
			        enabled : false
			    }).addStyleClass("FormInputStyle marginTop7 valuesDisabled");

			    var oFLSALabelCustomerCode = new sap.ui.commons.Label("idFLSALabelCustomerCode",{
			    text : "Customer Code",
			    width : "130px"
			    }).addStyleClass("marginTop10");


			var oFLSAFlexCustomerCode = new sap.m.FlexBox("idFLSAFlexCustomerCode",{
			             items: [oFLSALabelCustomerCode,
			                     oFLSAInputCustomerCode
			                     ],
			             width: "350px",
			             direction: "Row"
			});

			/* Lessee */

			    var oFLSAInputLessee = new sap.ui.commons.TextField("idFLSAInputLessee",{
			        value : "",
			        width : "250px",
			        enabled : false,
			        //type: sap.m.InputType.Number
			    }).addStyleClass("FormInputStyle marginTop7 valuesDisabled");

			    var oFLSALabelLessee = new sap.ui.commons.Label("idFLSALabelLessee",{
			    text : "Lessee",
			width : "130px",
			    }).addStyleClass("marginTop10");


			var oFLSAFlexLessee = new sap.m.FlexBox("idFLSAFlexLessee",{
			             items: [oFLSALabelLessee,
			                     oFLSAInputLessee
			                     ],
			             width: "350px",
			             direction: "Row"
			});

			/* Estimate */

	        var oFLSAInputEstimate = new sap.ui.commons.TextField("idFLSAInputEstimate",{
	            value : "",
	            width : "130px",
	            //type: sap.ui.commons.TextFieldType.Number,
	            enabled : false
	        }).addStyleClass("FormInputStyle marginTop7 valuesDisabled");

	        var oFLSALabelEstimate = new sap.ui.commons.Label("idFLSALabelEstimate",{
				  text : "Estimate",
				  width : "130px"
	        }).addStyleClass("marginTop10");


			var oFLSAFlexEstimate = new sap.m.FlexBox("idFLSAFlexEstimate",{
			             items: [oFLSALabelEstimate,
			                     oFLSAInputEstimate
			                     ],
			             width: "300px",
			             direction: "Row"
			});

			/* Reference */

					var oFLSAInputReferenceV = new sap.ui.commons.TextField("idFLSAInputReferenceV",{
							value : "",
							width : "200px",
							//type: sap.m.InputType.Number,
							enabled : false
					}).addStyleClass("FormInputStyle marginTop7 valuesDisabled");

					var oFLSALabelReferenceV = new sap.ui.commons.Label("idFLSALabelReferenceV",{
					text : "Reference",
					width : "130px"
					}).addStyleClass("marginTop10");


			var oFLSAFlexReferenceV = new sap.m.FlexBox("idFLSAFlexReferenceV",{
									 items: [oFLSALabelReferenceV,
													 oFLSAInputReferenceV
													 ],
									 width: "350px",
									 direction: "Row"
			});

			/* Amount */

					var oFLSAInputAmountV = new sap.ui.commons.TextField("idFLSAInputAmountV",{
							value : "",
							width : "130px",
							//type: sap.m.InputType.Number,
							enabled : false
					}).addStyleClass("FormInputStyle marginTop7 valuesDisabled");

					var oFLSALabelAmountV = new sap.ui.commons.Label("idFLSALabelAmountV",{
					text : "Amount",
					width : "130px",
					}).addStyleClass("marginTop10");


			var oFLSAFlexAmountV = new sap.m.FlexBox("idFLSAFlexAmountV",{
									 items: [oFLSALabelAmountV,
													 oFLSAInputAmountV
													 ],
									 width: "350px",
									 direction: "Row"
			});

			var oFLSAButtonAdd5 = new sap.m.Button("idFLSAButtonAdd5",{
					text : "Insert 5 Lines",
					width:"130px",
					styled:false,
					visible: true,
					//layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: true}),
					press:function(){
						debugger;
							var oJSONFLSAExcelDataLength = oFLSAExcel.getData().length;
						var oJSONFLSAExcelDataLengthAllowed = 25 - oFLSAExcel.getData().length;
						oFLSAExcel.alter('insert_row', '', 5);
						/*if(oJSONFLSAExcelDataLength < 25){
						if(oJSONFLSAExcelDataLength < 20){
							oFLSAExcel.alter('insert_row', '', 5);
						}else{
							oFLSAExcel.alter('insert_row', '', oJSONFLSAExcelDataLengthAllowed);
						}
						}
						else{
						sap.ui.commons.MessageBox.alert("Sorry, Max. Entries is 25!");
						}*/
			}}).addStyleClass("normalBtn");

			var oFLSAButtonSubmit = new sap.m.Button("idFLSAButtonSubmit",{
				text : "Submit",
				width:"100px",
				styled:false,
				visible: true,
				//layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: true}),
				press:function(){
					var oFLSA = new flsa();
					oFLSA.submitFLSA();
			}}).addStyleClass("normalBtn");

			var oFLSAButtonPrint = new sap.m.Button("idFLSAButtonPrint",{
				text : "Print",
				width:"100px",
				styled:false,
				visible: true,
				//layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: true}),
				press:function(){
								var printFLSAExcel = [];
								var oFLSAExcelData = oFLSAExcel.getData();
								var oFLSAExcelDatalength = oFLSAExcelData.length;

								var totalLabHrs = 0;
								var totalLabCost = 0;
								var totalMatCost = 0;

								var labCost = "";

								globalLabCost = 0;
								globalLabCostC = sap.ui.getCore().byId("idFLSAInputLabRate").getValue();
								globalLabCostM = sap.ui.getCore().byId("idFLSAInputLabRateM").getValue();

								var respCode = "";
								var uomPrint = "";

								for(var i =0; i < oFLSAExcelDatalength; i++){
									loop1 : for(var j =0; j < 12; j++){
										if(oFLSAExcelData[i][j] != "" && oFLSAExcelData[i][j] != null){

											respCode = (oFLSAExcelData[i][11] == null)? "" : oFLSAExcelData[i][11];	// if null, make it space
											uomPrint = (oFLSAExcelData[i][7] == null)? "" : oFLSAExcelData[i][7];
											uomPrint = uomPrint.toUpperCase();

											// check if location code starts with "M", then multiply with machinery lab rate
											// else carcass

											if(oFLSAExcelData[i][0].substr(0,1) == "M"){	// Machinery Line Item
												globalLabCost = globalLabCostM;
											}else{
												globalLabCost = globalLabCostC;
											}
											labCost = (oFLSAExcelData[i][9] == "")? 0 : parseFloat(parseFloat(oFLSAExcelData[i][9]).toFixed(2)) * globalLabCost;

											if(respCode == ""){

											}else{
												var respCode1 = respCode.substr(0,1);
												if(respCode1 != "X"){
													totalLabHrs = totalLabHrs + parseFloat(oFLSAExcelData[i][9]);
													totalLabCost = totalLabCost + labCost;
													totalMatCost = totalMatCost + parseFloat(oFLSAExcelData[i][10]);
												}
											}

											var description = "";

											labCost = thousandsep(labCost);

											// loopdesc : for(var x=0; x<oFLSAExcelData.length; x++){

													loopcomp : for(var j=0; j<componentCodes.length; j++){
														if(oFLSAExcelData[i][1] != null){
														if(oFLSAExcelData[i][1].toUpperCase() == componentCodes[j].comKey){
																description = componentCodes[j].comText;
																break loopcomp;
														}
														}
													}

													looprep : for(var j=0; j<repairCodes.length; j++){
														if(oFLSAExcelData[i][4] != null){
														if(oFLSAExcelData[i][4].toUpperCase() == repairCodes[j].repKey){
																description = (repairCodes[j].repText == "")? "" : (description + " / " + repairCodes[j].repText);
																break looprep;
														}
													}
													}

												// 	break loopdesc;
												//
												// }
													// loop1 : for(var j=0; j<locationCodes.length; j++){
													// 	if(oFLSAExcelData[i][0] == locationCodes[j].locKey){
													// 			oFLSAExcelData[i][0] = locationCodes[j].locKey + "<br>" + locationCodes[j].locText;
													// 			break loop1;
													// 	}
													// }

													// loop2 : for(var j=0; j<componentCodes.length; j++){
													// 	if(oFLSAExcelData[i][1] == componentCodes[j].comKey){
													// 			oFLSAExcelData[i][1] = componentCodes[j].comKey + "<br>" + componentCodes[j].comText;
													// 			break loop2;
													// 	}
													// }

													// loop3 : for(var j=0; j<damageCodes.length; j++){
													// 	if(oFLSAExcelData[i][2] == damageCodes[j].damKey){
													// 			oFLSAExcelData[i][2] = damageCodes[j].damKey + "<br>" + damageCodes[j].damText;
													// 			break loop3;
													// 	}
													// }
													//
													// loop4 : for(var j=0; j<materialCodes.length; j++){
													// 	if(oFLSAExcelData[i][3] == materialCodes[j].matKey){
													// 			oFLSAExcelData[i][3] = materialCodes[j].matKey + "<br>" + materialCodes[j].matText;
													// 			break loop4;
													// 	}
													// }

													// loop5 : for(var j=0; j<repairCodes.length; j++){
													// 	if(oFLSAExcelData[i][4] == repairCodes[j].repKey){
													// 			oFLSAExcelData[i][4] = repairCodes[j].repKey + "<br>" + repairCodes[j].repText;
													// 			break loop5;
													// 	}
													// }

										printFLSAExcel.push({
												"Line": padZero(i+1,3) ,
												"Location" : (oFLSAExcelData[i][0] == null)? "" : oFLSAExcelData[i][0],
												"Component" : (oFLSAExcelData[i][1] == null)? "" : oFLSAExcelData[i][1],
												"Damage" : (oFLSAExcelData[i][2] == null)? "" : oFLSAExcelData[i][2],
												"Material" : (oFLSAExcelData[i][3] == null)? "" : oFLSAExcelData[i][3],
												"Repair" : (oFLSAExcelData[i][4] == null)? "" : oFLSAExcelData[i][4],
												"Description" : description,
												"Length" : (oFLSAExcelData[i][5] == null)? "" : oFLSAExcelData[i][5],
												"Width" : (oFLSAExcelData[i][6] == null)? "" : oFLSAExcelData[i][6],
												"UOM" : uomPrint,
												"Quantity" : (oFLSAExcelData[i][8] == null)? "" : oFLSAExcelData[i][8],
												"Hours" : (oFLSAExcelData[i][9] == null)? "" : thousandsep(oFLSAExcelData[i][9]),
												"Labour Cost" : labCost,
												"Material Cost" : (oFLSAExcelData[i][10] == null)? "" : thousandsep(oFLSAExcelData[i][10]),
												//"Bulletin" : (oFLSAExcelData[i][10] == null)? "" : oFLSAExcelData[i][10],
												"Responsibility" : respCode,
											});
											break loop1;
										}
									}
									}

									if(printFLSAExcel.length != 0){
										printFLSAExcel.push({
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
											"Hrs" : thousandsep(totalLabHrs),
											"Labour Cost" : thousandsep(totalLabCost),
											"Material Cost" : thousandsep(totalMatCost),
											//"Bulletin" : "",
											"Responsibility" : ""
										});
									}

							var serialForPrint = sap.ui.getCore().byId("idFLSAInputSerial").getValue();
							var depotForPrint = sap.ui.getCore().byId("idFLSAComboDepot").getValue();
							var referenceForPrint = sap.ui.getCore().byId("idFLSAInputReference").getValue();
							var approvalDateForPrint = sap.ui.getCore().byId("idFLSAInputAppDate").getYyyymmdd();
							if(approvalDateForPrint != "")
											approvalDateForPrint = approvalDateForPrint.substr(6,2) + "/" + approvalDateForPrint.substr(4,2) + "/" + approvalDateForPrint.substr(0,4);

							var amountForPrint = sap.ui.getCore().byId("idFLSAInputAmount").getValue();
							var customerForPrint = sap.ui.getCore().byId("idFLSAInputCustomerCode").getValue();
							var lesseeForPrint = sap.ui.getCore().byId("idFLSAInputLessee").getValue();
							var estimateForPrint = sap.ui.getCore().byId("idFLSAInputEstimate").getValue();
							var revnoForPrint = sap.ui.getCore().byId("idFLSAInputRevNo").getValue();
							var basecurrForPrint = sap.ui.getCore().byId("idFLSAInputBaseCurr").getValue();
							var labrateForPrint = sap.ui.getCore().byId("idFLSAInputLabRate").getValue();
							var labrateMForPrint = sap.ui.getCore().byId("idFLSAInputLabRateM").getValue();
										var oUtilityEDI = new utility();
								 // var tab =  oUtilityEDI.makeHTMLTableLA(

								 var oFLSA = new flsa();
								 var tab = oFLSA.printEstimatesFLSA(
																		 depotForPrint,
																		 serialForPrint,
																		 referenceForPrint,
																		 approvalDateForPrint,
																		 amountForPrint,
																		 customerForPrint,
																		 lesseeForPrint,
																		 estimateForPrint,
																		 revnoForPrint,
																		 basecurrForPrint,
																		 labrateForPrint,
																		 labrateMForPrint,
																		 printFLSAExcel,
																		 "Lessee Approval",
																		 "print" );
								var newWin = window.open();
								newWin.document.write(tab);
								newWin.print();

			}}).addStyleClass("normalBtn");

			var oFLSAFlexButtons = new sap.m.FlexBox("idFLSAFlexButtons",{
			      items: [//oFLSAButtonAdd5,
			              oFLSAButtonSubmit,
			              oFLSAButtonPrint
			              ],
			      direction: "Row"
			}).addStyleClass("marginMainLeft");

			var oFLSALayoutSelectionAuto = new sap.ui.layout.form.ResponsiveGridLayout("idFLSALayoutSelectionAuto", {
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

			var oFLSAFormSelectionAuto = new sap.ui.layout.form.Form("idFLSAFormSelectionAuto",{
	        layout: oFLSALayoutSelectionAuto,
	        width: "90%",
	        visible : false,
	        formContainers: [
	                new sap.ui.layout.form.FormContainer({
	                	  //title: new sap.ui.core.Title({text: ""}),
	                    formElements: [
									new sap.ui.layout.form.FormElement({
										fields: [oFLSAFlexLabRate, oFLSAFlexLabRateM, oFLSAFlexDppLimit, oFLSAFlexDppCurr],
										layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
									}),
									new sap.ui.layout.form.FormElement({
										fields: [oFLSAFlexRedel, oFLSAFlexRevNo, oFLSAFlexGINDate, oFLSAFlexBaseCurr],
										layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
									}),
									new sap.ui.layout.form.FormElement({
										fields: [oFLSAFlexPOHDate, oFLSAFlexPOHLocation, oFLSAFlexExchRate, oFLSAFlexProdCate],
										layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
									}),
									new sap.ui.layout.form.FormElement({
										fields: [oFLSAFlexCustomerCode, oFLSAFlexLessee, oFLSAFlexEstimate],
										layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
									}),
									new sap.ui.layout.form.FormElement({
										fields: [oFLSAFlexReferenceV, oFLSAFlexAmountV],
										layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
									}),

									new sap.ui.layout.form.FormElement({
										fields: [oFLSAFlexButtons],
										layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
									}),

	                    ],layoutData: new sap.ui.layout.GridData({span: "L7 M12 S12"})
	                })
	        ]
			});

			return oFLSAFormSelectionAuto;

		},
		printEstimatesFLSA : function(depotForPrint,
																	serialForPrint,
																	referenceForPrint,
																	approvalDateForPrint,
																	amountForPrint,
																	customerForPrint,
																	lesseeForPrint,
																	estimateForPrint,
																	revnoForPrint,
																	basecurrForPrint,
																	labrateForPrint,
																	labrateMForPrint,
																	printFLSAExcel,
																	title,
		func){

			if(labrateForPrint != "")
				 labrateForPrint = thousandsep(labrateForPrint);

				 if(labrateMForPrint != "")
				 	 labrateMForPrint = thousandsep(labrateMForPrint);

		 if(amountForPrint != "")
				 amountForPrint = thousandsep(amountForPrint);

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
					 var filename = serialForPrint + "_" + revnoForPrint + "_" + depotForPrint.substr(0,4);
					 htmlTable += '<title>';
					 htmlTable += filename;
					 htmlTable += '</title>';

				 	/* ----------------------------------------*/
				 	/* --------  Header Section  --------------*/
				 	/* ----------------------------------------*/

					htmlTable +='<table border="0" cellspacing="0" class="table70" style="color:#000000">';   // Header Table - Start
					htmlTable += '<tr style="height:75px;border=1">'+
											 '<td style="font:12px Arial;" align=center>' + getFormattedDate() + '</td>' +
											 '<td align=center width="82%" style="padding-left:10px;font:bold 20px Arial;"><u>Lessee Approval</u></td>'+
											 '<td style="border:none; padding:5px 5px 5px 0px" colspan=2 align ="right"><img src="' + base + 'images/login/login_logo.png"></img></td></tr>';
					htmlTable += '</table>';

						var $menu_tags = [


							{slug: 'lserial',    name: 'Serial No'},
							{slug: 'vserial',    name: serialForPrint},
							{slug: 'lreference', name: 'Reference'},
							{slug: 'vreference',    name: referenceForPrint},
							{slug: 'lappdate',   name: 'Approval Date'},
							{slug: 'vappdate',   name: approvalDateForPrint},
							{slug: 'ldepot',    name: 'Depot'},
							{slug: 'vdepot',    name: depotForPrint},


							{slug: 'lamount',   name: 'Amount'},
							{slug: 'vamount',   name: amountForPrint},
							{slug: 'lcustomer',    name: 'Customer'},
							{slug: 'vcustomer',    name: customerForPrint},
							{slug: 'llessee',    name: 'Lessee'},
							{slug: 'vlessee',    name: lesseeForPrint},
							{slug: 'lestimate', name: 'Estimate'},
							{slug: 'vestimate',    name: estimateForPrint},
							{slug: 'lrevno',   name: 'Rev. No'},
							{slug: 'vrevno',   name: revnoForPrint},
							{slug: 'lcurrency',   name: 'Depot Currency'},
							{slug: 'vcurrency',   name: basecurrForPrint},
							{slug: 'llabrate',   name: 'Lab. Rate (C)'},
							{slug: 'vlabrate',   name: labrateForPrint},
							{slug: 'llabmrate',   name: 'Lab. Rate (M)'},
							{slug: 'vlabmrate',   name: labrateMForPrint}

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

								htmlTable += '</tbody></table>' + "\n";

								htmlTable += '<br>';	// Line Break

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
								 var excelDataPrintGet = oFLSAExcel.getData();

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
								var printExcelData = printFLSAExcel;
								if(printExcelData.length > 0){

								//  for(var i=0; i<printExcelData.length; i++){
								// 		 loop1 : for(var j=0; j<locationCodes.length; j++){
								// 			 if(printExcelData[i].Location == locationCodes[j].locKey){
								// 					 printExcelData[i].Location = locationCodes[j].locKey + "<br>" + locationCodes[j].locText;
								// 					 break loop1;
								// 			 }
								// 		 }
								//
								// 		 loop2 : for(var j=0; j<componentCodes.length; j++){
								// 			 if(printExcelData[i].Component == componentCodes[j].comKey){
								// 					 printExcelData[i].Component = componentCodes[j].comKey + "<br>" + componentCodes[j].comText;
								// 					 break loop2;
								// 			 }
								// 		 }
								//
								// 		 loop3 : for(var j=0; j<damageCodes.length; j++){
								// 			 if(printExcelData[i].Damage == damageCodes[j].damKey){
								// 					 printExcelData[i].Damage = damageCodes[j].damKey + "<br>" + damageCodes[j].damText;
								// 					 break loop3;
								// 			 }
								// 		 }
								//
								// 		 loop4 : for(var j=0; j<materialCodes.length; j++){
								// 			 if(printExcelData[i].Material == materialCodes[j].matKey){
								// 					 printExcelData[i].Material = materialCodes[j].matKey + "<br>" + materialCodes[j].matText;
								// 					 break loop4;
								// 			 }
								// 		 }
								//
								// 		 loop5 : for(var j=0; j<repairCodes.length; j++){
								// 			 if(printExcelData[i].Repair == repairCodes[j].repKey){
								// 					 printExcelData[i].Repair = repairCodes[j].repKey + "<br>" + repairCodes[j].repText;
								// 					 break loop5;
								// 			 }
								// 		 }
								//
								//
								//
								// }

								for(var i=0; i<excelDataPrint.length; i++){

									if(excelDataPrint[i][0] != null){
 											if(excelDataPrint[i][0].substr(0,1) == "M"){	// Machinery Line Item
 												globalLabCost = globalLabCostM;
 											}else{
 												globalLabCost = globalLabCostC;
 											}
 									}

								 if(excelDataPrint[i][11].substr(0,1).toUpperCase() == 'U'){
									 labhrU = (excelDataPrint[i][9] == "")? labhrU : parseFloat(parseFloat(labhrU).toFixed(2)) + parseFloat(parseFloat(excelDataPrint[i][9]).toFixed(2));
									 matrcU = (excelDataPrint[i][10] == "")? matrcU : parseFloat(parseFloat(matrcU).toFixed(2)) + parseFloat(parseFloat(excelDataPrint[i][10]).toFixed(2));
									 labrtU = labrtU + (parseFloat(parseFloat(excelDataPrint[i][9]).toFixed(2)) * globalLabCost);
								 }else if(excelDataPrint[i][11].substr(0,1).toUpperCase() == 'J'){
									 labhrJ = (excelDataPrint[i][9] == "")? labhrJ : parseFloat(parseFloat(labhrJ).toFixed(2)) + parseFloat(parseFloat(excelDataPrint[i][9]).toFixed(2));
									 matrcJ = (excelDataPrint[i][10] == "")? matrcJ : parseFloat(parseFloat(matrcJ).toFixed(2)) + parseFloat(parseFloat(excelDataPrint[i][10]).toFixed(2));
									 labrtJ = labrtJ + (parseFloat(parseFloat(excelDataPrint[i][9]).toFixed(2)) * globalLabCost);
								 }else if(excelDataPrint[i][11].substr(0,1).toUpperCase() == 'O' || excelDataPrint[i][11].substr(0,1).toUpperCase() == 'S'){
									 labhrO = (excelDataPrint[i][9] == "")? labhrO : parseFloat(parseFloat(labhrO).toFixed(2)) + parseFloat(parseFloat(excelDataPrint[i][9]).toFixed(2));
									 matrcO = (excelDataPrint[i][10] == "")? matrcO : parseFloat(parseFloat(matrcO).toFixed(2)) + parseFloat(parseFloat(excelDataPrint[i][10]).toFixed(2));
									 labrtO = labrtO + (parseFloat(parseFloat(excelDataPrint[i][9]).toFixed(2)) * globalLabCost);
								 }else if(excelDataPrint[i][11].substr(0,1).toUpperCase() == 'I'){
									 labhrI = (excelDataPrint[i][9] == "")? labhrI : parseFloat(parseFloat(labhrI).toFixed(2)) + parseFloat(parseFloat(excelDataPrint[i][9]).toFixed(2));
									 matrcI = (excelDataPrint[i][10] == "")? matrcI : parseFloat(parseFloat(matrcI).toFixed(2)) + parseFloat(parseFloat(excelDataPrint[i][10]).toFixed(2));
									 labrtI = labrtI + (parseFloat(parseFloat(excelDataPrint[i][9]).toFixed(2)) * globalLabCost);
								 }else if(excelDataPrint[i][11].substr(0,1).toUpperCase() == 'V'){
									 labhrV = (excelDataPrint[i][9] == "")? labhrV : parseFloat(parseFloat(labhrV).toFixed(2)) + parseFloat(parseFloat(excelDataPrint[i][9]).toFixed(2));
									 matrcV = (excelDataPrint[i][10] == "")? matrcV : parseFloat(parseFloat(matrcV).toFixed(2)) + parseFloat(parseFloat(excelDataPrint[i][10]).toFixed(2));
									 labrtV = labrtV + (parseFloat(parseFloat(excelDataPrint[i][9]).toFixed(2)) * globalLabCost);
								 }
								 // else if(excelDataPrint[i][11].substr(0,1).toUpperCase() == 'S'){
								 // 	labhrS = (excelDataPrint[i][9] == "")? labhrS : parseFloat(parseFloat(labhrS).toFixed(2)) + parseFloat(parseFloat(excelDataPrint[i][9]).toFixed(2));
								 // 	matrcS = (excelDataPrint[i][10] == "")? matrcS : parseFloat(parseFloat(matrcS).toFixed(2)) + parseFloat(parseFloat(excelDataPrint[i][10]).toFixed(2));
								 // }
								 else if(excelDataPrint[i][11].substr(0,1).toUpperCase() == 'X'){
									 labhrX = (excelDataPrint[i][9] == "")? labhrX : parseFloat(parseFloat(labhrX).toFixed(2)) + parseFloat(parseFloat(excelDataPrint[i][9]).toFixed(2));
									 matrcX = (excelDataPrint[i][10] == "")? matrcX : parseFloat(parseFloat(matrcX).toFixed(2)) + parseFloat(parseFloat(excelDataPrint[i][10]).toFixed(2));
									 labrtX = labrtX + (parseFloat(parseFloat(excelDataPrint[i][9]).toFixed(2)) * globalLabCost);
								 }
								}

								// globalLabCostC = sap.ui.getCore().byId("idFLSAInputLabRate").getValue();
								// labrtU = labhrU * globalLabCostC;
								// labrtO = labhrO * globalLabCostC;
								// labrtI = labhrI * globalLabCostC;
								// labrtS = labhrS * globalLabCostC;
								// labrtX = labhrX * globalLabCostC;
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
													 + "Item Details"
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
												htmlTable += '<div style="font-size: 20px;text-decoration: underline;padding-top: 10px;padding-right: 10px;padding-bottom: 10px;"><b>' + "Item Details" + '</b></div>';
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

    /*FLSA : Submit Repair Completion */

    submitFLSA : function(){

    	var oCurrent = this;
		var stringToPass = "";
		var stringCount = 1;
		var depot = sap.ui.getCore().byId("idFLSAComboDepot").getSelectedKey();
		+ "$" + reference;
		var serialno = sap.ui.getCore().byId("idFLSAInputSerial").getValue();
		var reference = sap.ui.getCore().byId("idFLSAInputReference").getValue();
		var appdate = sap.ui.getCore().byId("idFLSAInputAppDate").getYyyymmdd();
		var amount = sap.ui.getCore().byId("idFLSAInputAmount").getValue();
		var status = sap.ui.getCore().byId("idFLSAComboStatus").getSelectedKey();

		var stringToPass = "";
		var parameter = serialno + "$" + status + "$" + appdate + "$" + amount + "$" + reference + "$" + depot + "$" + sessionStorage.uName.toUpperCase();
		stringToPass = "Submit eq 'X' and IHeader eq '" + parameter + "'";

		/*	    		    			oJSONFLSASAPData.push({
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



		oJSONFLSASAPData = [];
		var oFLSAExcelData = oFLSAExcel.getData();
    	var oFLSAExcelDatalength = oFLSAExcelData.length;
 		for(var i =0; i < oFLSAExcelDatalength; i++){
 			loop1 : for(var j =0; j < 12; j++){
 				if(oFLSAExcelData[i][j] != "" && oFLSAExcelData[i][j] != null){
 					oJSONFLSASAPData.push({
 						"Location" : (oFLSAExcelData[i][0] == null)? "" : oFLSAExcelData[i][0],
 						"Component" : (oFLSAExcelData[i][1] == null)? "" : oFLSAExcelData[i][1],
 						"Damage" : (oFLSAExcelData[i][2] == null)? "" : oFLSAExcelData[i][2],
 						"Material" : (oFLSAExcelData[i][3] == null)? "" : oFLSAExcelData[i][3],
 						"Repair" : (oFLSAExcelData[i][4] == null)? "" : oFLSAExcelData[i][4],
 						"Length" : (oFLSAExcelData[i][5] == null)? "" : oFLSAExcelData[i][5],
 						"Width" : (oFLSAExcelData[i][6] == null)? "" : oFLSAExcelData[i][6],
 						"Unit" : (oFLSAExcelData[i][7] == null)? "" : oFLSAExcelData[i][7],
 						"Qty" : (oFLSAExcelData[i][8] == null)? "" : oFLSAExcelData[i][8],
 						"ManHours" : (oFLSAExcelData[i][9] == null)? "" : oFLSAExcelData[i][9],
 						"MatCost" : (oFLSAExcelData[i][10] == null)? "" : oFLSAExcelData[i][10],
 						"Responsibility" : (oFLSAExcelData[i][11] == null)? "" : oFLSAExcelData[i][11],
 						"LabRate"	:	sap.ui.getCore().byId("idFLSAInputLabRate").getValue()
 						//"Bulletin" : (oFLSAExcelData[i][10] == null)? "" : oFLSAExcelData[i][11],
 					});
 					break loop1;
 				}
 			}
 			}

		for(var i =0; i < oJSONFLSASAPData.length; i++){
			if(stringToPass == ""){
				stringToPass = stringToPass + "Submit eq 'X' and " + "ILsa" + stringCount + " eq '" +
				oJSONFLSASAPData[i].Location + "$" +
				oJSONFLSASAPData[i].Component + "$" +
				oJSONFLSASAPData[i].Damage + "$" +
				oJSONFLSASAPData[i].Material + "$" +
				oJSONFLSASAPData[i].Repair + "$" +
				oJSONFLSASAPData[i].Length + "$" +
				oJSONFLSASAPData[i].Width + "$" +
				oJSONFLSASAPData[i].Unit + "$" +
				oJSONFLSASAPData[i].Qty + "$" +
				oJSONFLSASAPData[i].ManHours + "$" +
				oJSONFLSASAPData[i].MatCost + "$" +
				oJSONFLSASAPData[i].Responsibility + "$" +
				oJSONFLSASAPData[i].LabRate + //"$" +
				//oJSONFLSASAPData[i].Bulletin + "$" +
				"'";
			}
			else{
				stringToPass = stringToPass + " and ILsa" + stringCount + " eq '" +
				oJSONFLSASAPData[i].Location + "$" +
				oJSONFLSASAPData[i].Component + "$" +
				oJSONFLSASAPData[i].Damage + "$" +
				oJSONFLSASAPData[i].Material + "$" +
				oJSONFLSASAPData[i].Repair + "$" +
				oJSONFLSASAPData[i].Length + "$" +
				oJSONFLSASAPData[i].Width + "$" +
				oJSONFLSASAPData[i].Unit + "$" +
				oJSONFLSASAPData[i].Qty + "$" +
				oJSONFLSASAPData[i].ManHours + "$" +
				oJSONFLSASAPData[i].MatCost + "$" +
				oJSONFLSASAPData[i].Responsibility + "$" +
				oJSONFLSASAPData[i].LabRate + //"$" +
				//oJSONFLSASAPData[i].Bulletin + "$" +
				"'";
			}
			stringCount++;
		}*/

		oModel = new sap.ui.model.odata.ODataModel(serviceEDIDOC, true);
		var oMODELFLSA = serviceEDIDOC + "FLSASet?$filter=" + stringToPass;

		busyDialog.open();
		console.log(oMODELFLSA);
		OData.request({
		      requestUri: oMODELFLSA,
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
		    		console.log("Above request : Success");
		    		sap.ui.commons.MessageBox.alert("Submitted!");
		    		sap.ui.getCore().byId("idFLSAButtonAdd5").setVisible(false);
             	    sap.ui.getCore().byId("idFLSAButtonValidate").setVisible(false);
             	    sap.ui.getCore().byId("idFLSAButtonSubmit").setVisible(false);
             	   	sap.ui.getCore().byId("idFLSAButtonPrint").setVisible(true);
		    	}else{
		    		console.log("Above request : Success");
		    		sap.ui.commons.MessageBox.alert("Submitted!");
		    		sap.ui.getCore().byId("idFLSAButtonAdd5").setVisible(false);
             	    sap.ui.getCore().byId("idFLSAButtonValidate").setVisible(false);
             	    sap.ui.getCore().byId("idFLSAButtonSubmit").setVisible(false);
             	   	sap.ui.getCore().byId("idFLSAButtonPrint").setVisible(true);
		    	}
		    },function(err){
		    	 console.log("Above Request : Error");
		    	 busyDialog.close();
		    	 sap.ui.commons.MessageBox.alert("There is an error; Please try again later.");
		    });


    },


    /*FLSA : Validate Repair Completion */

    validateFLSA : function(){

    		jQuery.sap.require("sap.ui.commons.MessageBox");

			var oCurrent = this;
			oJSONFLSASAPData = [];
			oJSONFLSAExcelData = [];
			oSTRINGFLSAValidationMessage = "";
			var depot = sap.ui.getCore().byId("idFLSAComboDepot").getSelectedKey();


			var serialno = sap.ui.getCore().byId("idFLSAInputSerial").getValue();
			var reference = sap.ui.getCore().byId("idFLSAInputReference").getValue();
			var appdate = sap.ui.getCore().byId("idFLSAInputAppDate").getYyyymmdd();
			var amount = sap.ui.getCore().byId("idFLSAInputAmount").getValue();

			var status = sap.ui.getCore().byId("idFLSAComboStatus").getSelectedKey();

			if(!depot || !serialno || !reference || !appdate || !amount){
				sap.ui.getCore().byId("idFLSAButtonValidate").setVisible(true);
	           	sap.ui.getCore().byId("idFLSAButtonSubmit").setVisible(false);
	           	oSTRINGFLSAValidationMessage = "Please enter all the fields";
				sap.ui.commons.MessageBox.alert(oSTRINGFLSAValidationMessage);
				return;
			}else if(isNaN(amount)){
				oSTRINGFLSAValidationMessage = "Please enter numeric value for Amount";
				sap.ui.commons.MessageBox.alert(oSTRINGFLSAValidationMessage);
				return;
			}else{
	           	//sap.ui.commons.MessageBox.alert("Validation Passed!" );

	        	var oCurrent = this;
	    		var stringToPass = "";
	    		var parameter = serialno + "$" + status + "$" + appdate + "$" + amount + "$" + reference + "$" + depot + "$" + sessionStorage.uName.toUpperCase();
	    		//IXXX$MRU$ML$ML$SK$MV$0$0$$2$0.250$1.00$U$3.45$3.45
	    		stringToPass = "Submit eq '' and IHeader eq '" + parameter + "'";

	    		oModel = new sap.ui.model.odata.ODataModel(serviceEDIDOC, true);
	    		var oMODELFLSA = serviceEDIDOC + "FLSASet?$filter=" + stringToPass;

	    		busyDialog.open();
	    		console.log(oMODELFLSA);
	    		OData.request({
	    		      requestUri: oMODELFLSA,
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
	    		    		console.log("Above request : Success");
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
	    		    				sap.ui.getCore().byId("idFLSAInputEstimate").setValue(data.results[0].EstimateNo);

											sap.ui.getCore().byId("idFLSAInputCustomerCode").setValue(data.results[0].CustomerCode);
	    		    				sap.ui.getCore().byId("idFLSAInputLessee").setValue(data.results[0].Lessee);
	    		    				sap.ui.getCore().byId("idFLSAInputRedel").setValue(data.results[0].RedelAuth);

	    		    				sap.ui.getCore().byId("idFLSAInputRevNo").setValue(data.results[0].RevNo);
	    		    				sap.ui.getCore().byId("idFLSAInputGINDate").setValue(data.results[0].GateInDt);
	    		    				sap.ui.getCore().byId("idFLSAInputBaseCurr").setValue(data.results[0].BaseCurr);

	    		    				sap.ui.getCore().byId("idFLSAInputPOHDate").setValue(data.results[0].PrevOnhireDate);
	    		    				sap.ui.getCore().byId("idFLSAInputPOHLocation").setValue(data.results[0].PrevLocation);

											sap.ui.getCore().byId("idFLSAInputExchRate").setValue(data.results[0].ExRate);
											sap.ui.getCore().byId("idFLSAInputProdCate").setValue(data.results[0].PrdType);

	    		    				sap.ui.getCore().byId("idFLSAInputLabRate").setValue(data.results[0].LabourRate);
											sap.ui.getCore().byId("idFLSAInputLabRateM").setValue(data.results[0].LabourRateM);

	    		    				sap.ui.getCore().byId("idFLSAInputDppLimit").setValue(data.results[0].DppAmt);
											sap.ui.getCore().byId("idFLSAInputDppCurr").setValue(data.results[0].DppCurr);

											sap.ui.getCore().byId("idFLSAInputReferenceV").setValue(data.results[0].LesseeRef);
											sap.ui.getCore().byId("idFLSAInputAmountV").setValue(data.results[0].LesseeAmt);

	    		    			}

	    		    			if(data.results[i].ILine1 == 'UNITINWEST'){

	    		    			}else{

	    		    			
	    		    			oJSONFLSAExcelData.push({

	    		    			});
	    		    			oJSONFLSASAPData.push({
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
	    		    			oJSONFLSAExcelData[i][0] = oJSONFLSASAPData[i].Location = splitLines[0];
	    		    			oJSONFLSAExcelData[i][1] = oJSONFLSASAPData[i].Component = splitLines[1];
	    		    			oJSONFLSAExcelData[i][2] = oJSONFLSASAPData[i].Damage = splitLines[2];
	    		    			oJSONFLSAExcelData[i][3] = oJSONFLSASAPData[i].Material = splitLines[3];
	    		    			oJSONFLSAExcelData[i][4] = oJSONFLSASAPData[i].Repair = splitLines[4];
	    		    			oJSONFLSAExcelData[i][5] = oJSONFLSASAPData[i].Length = splitLines[5];
	    		    			oJSONFLSAExcelData[i][6] = oJSONFLSASAPData[i].Width = splitLines[6];
	    		    			oJSONFLSAExcelData[i][7] = oJSONFLSASAPData[i].Unit = splitLines[7];
	    		    			oJSONFLSAExcelData[i][8] = oJSONFLSASAPData[i].Qty = splitLines[8];
	    		    			oJSONFLSAExcelData[i][9] = oJSONFLSASAPData[i].ManHours = splitLines[9];
	    		    			oJSONFLSAExcelData[i][10] = oJSONFLSASAPData[i].MatCost = splitLines[10];
	    		    			oJSONFLSAExcelData[i][11] = oJSONFLSASAPData[i].Responsibility = splitLines[11];
	    		    			oJSONFLSAExcelData[i][12] = oJSONFLSASAPData[i].LabRate = splitLines[12];
	    		    			oJSONFLSAExcelData[i][13] = oJSONFLSASAPData[i].Bulletin = splitLines[13];
	    		    			sap.ui.getCore().byId("idFLSAInputLabRate").setValue(oJSONFLSASAPData[i].LabRate);
	    		    		
	    		    		//oFLSAExcel.loadData(oJSONFLSAExcelData);
	    		    		oCurrent.setExcelFLSAPage();
	    		           	document.getElementById('idFLSAExcel').style.visibility='visible';
							}
	                 	    sap.ui.getCore().byId("idFLSAButtonAdd5").setVisible(true);
	    					sap.ui.getCore().byId("idFLSAButtonValidate").setVisible(false);
	    		           	sap.ui.getCore().byId("idFLSAButtonSubmit").setVisible(true);
	    		           	sap.ui.getCore().byId("idFLSAFormSelectionAuto").setVisible(true);
							
							}

	    		           	

	    		    	}
	    		    },function(err){
	    		    	 console.log("Above Request : Error");
	    		    	 busyDialog.close();
	    		    	 sap.ui.commons.MessageBox.alert("There is an error; Please try again later.");
	    		    });

			}
		},

		/*FLSA : Validate Unit Number */

		validateFLSAUnitNumber : function (unitnumber){

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

		/*FLSA : Validate Return Authorization */

		validateFLSARA : function (ranumber){

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

		/*FLSA : Reset Fields Whenever there is a change in key fields after validation, reset the
		validated section but doesn't affect the key fields */

		resetFLSAKeyFields : function(){

			if(sap.ui.getCore().byId("idFLSAButtonAdd5") != undefined)
				sap.ui.getCore().byId("idFLSAButtonAdd5").setVisible(false);

			if(sap.ui.getCore().byId("idFLSAButtonValidate") != undefined)
				sap.ui.getCore().byId("idFLSAButtonValidate").setVisible(true);

			if(sap.ui.getCore().byId("idFLSAButtonSubmit") != undefined)
				sap.ui.getCore().byId("idFLSAButtonSubmit").setVisible(false);

			if(sap.ui.getCore().byId("idFLSAButtonPrint") != undefined)
				sap.ui.getCore().byId("idFLSAButtonPrint").setVisible(false);

			if(sap.ui.getCore().byId("idFLSAFormSelectionAuto") != undefined)
				sap.ui.getCore().byId("idFLSAFormSelectionAuto").setVisible(false);

      document.getElementById('idFLSAExcel').style.visibility='hidden';

		},

		/*FLSA : Reset Fields */

		resetFLSA : function(){

			if(sap.ui.getCore().byId("idFLSAComboDepot") != undefined){
			 var oModelDepot = new sap.ui.model.json.JSONModel();
			 oModelDepot.setSizeLimit(99999);
			 oModelDepot.setData({data:depotEdiData});
			 var oComboDepot = sap.ui.getCore().byId("idFLSAComboDepot");
			 oComboDepot.setModel(oModelDepot);
			 oComboDepot.setSelectedKey(depotEdiData[0].key);
			 oComboDepot.bindItems("/data", new sap.ui.core.ListItem({text: "{text}", key:"{key}"}));
		 }

			if(sap.ui.getCore().byId("idFLSAComboStatus") !=  undefined)
				sap.ui.getCore().byId("idFLSAComboStatus").setSelectedKey("");

			if(sap.ui.getCore().byId("idFLSAComboStatus") != undefined)
				sap.ui.getCore().byId("idFLSAComboStatus").setSelectedKey("");

			if(sap.ui.getCore().byId("idFLSAInputSerial") != undefined)
				sap.ui.getCore().byId("idFLSAInputSerial").setValue("");

			if(sap.ui.getCore().byId("idFLSAInputReference") != undefined)
				sap.ui.getCore().byId("idFLSAInputReference").setValue("");

			if(sap.ui.getCore().byId("idFLSAInputAppDate") != undefined)
				sap.ui.getCore().byId("idFLSAInputAppDate").setYyyymmdd(yyyymmddtoday());

			if(sap.ui.getCore().byId("idFLSAInputAmount") != undefined)
				sap.ui.getCore().byId("idFLSAInputAmount").setValue("");



			if(sap.ui.getCore().byId("idFLSAButtonAdd5") != undefined)
				sap.ui.getCore().byId("idFLSAButtonAdd5").setVisible(false);

			if(sap.ui.getCore().byId("idFLSAButtonValidate") != undefined)
				sap.ui.getCore().byId("idFLSAButtonValidate").setVisible(true);

			if(sap.ui.getCore().byId("idFLSAButtonSubmit") != undefined)
				sap.ui.getCore().byId("idFLSAButtonSubmit").setVisible(false);

			if(sap.ui.getCore().byId("idFLSAButtonPrint") != undefined)
				sap.ui.getCore().byId("idFLSAButtonPrint").setVisible(false);

			if(sap.ui.getCore().byId("idFLSAFormSelectionAuto") != undefined)
				sap.ui.getCore().byId("idFLSAFormSelectionAuto").setVisible(false);

     	    document.getElementById('idFLSAExcel').style.visibility='hidden';

		},


		/*FLSA : Set Excel Repair Completion Page */

	    setExcelFLSAPage : function(){

	    	/* FLSA - Repair Completion - Excel - Setup */

			/* FLSA - JSON - Excel Data */
			/* Serial No. - Status - Repair Completion Date - RA Number - Previous On Hire Location - Previous On Hire Date*/

	    	//var serviceUrl15_old = "/sap/opu/odata/sap/ZNW_SEACO_PORTAL_LOT5PGW_SRV";
	    	var urlToCallIsocodes = serviceUrl15_old + "/get_Isocodes?";

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

	        		  var aResponsCode = [];
					  aResponsCode = 		[	  "",
					                   		 	  "J", 	//  JS Allocation
					                   		 	  "O",	//  Owner,
																		"I",	//  SeaCover,
				     		                      "U",	//  User
				     		                      "V"];	//  Customer

	          		    var container = document.getElementById('idFLSAExcel');
	          		  	oFLSAExcel = new Handsontable(container, {
	          	           data : oJSONFLSAExcelData,  //binding the model
		          	        minSpareRows: 5,
		       	           	height: 600,
		       	           	renderAllRows: true,
		       	           	renderAllColumns: true,
		       	           	//width: 500,
		       	           	//minRows: 5,
		       	           	maxRows: 25,
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
	     							     "Lab.Hrs", // 9
	     							     "Material Cost", // 10
	     							     "Responsibility", //11
	     							     "Lab. Rate", //12
	     							     "Bulletin", // 13
	     							     ],
				     	            	contextMenu: true,
				     					columns: [
				     					  {
				     						  type: 'autocomplete',
				     						  source: locationSource,
				     						  width: 80,
				     						  strict: true,
													readOnly : true
				     					  },
				     					  {
				     						  type: 'autocomplete',
				     						  source: componentSource,
				     						  width: 90,
				     						  strict: true,
													readOnly : true
				     					  },
				     					 {
				     						  type: 'autocomplete',
				     						  source: damageSource,
				     						  width: 80,
				     						  strict: true,
													readOnly : true
				     					  },
				     					 {
				     						  type: 'autocomplete',
				     						  source: materialSource,
				     						  width: 80,
				     						  strict: true,
													readOnly : true
				     					  },
				     					  {
				     						  type: 'autocomplete',
				     						  source: repairSource,
				     						  width: 70,
				     						  strict: true,
													readOnly : true
				     					  },
				     					  {
				     						  width: 80,
													readOnly : true
				     					  },
				     					  {
				     						  width: 80,
													readOnly : true
				     					  },
				     					  {
				     						  width: 50,
													readOnly : true
				     					   },
//	          				     					  {
//	          				     						  width: 80,
//	          				     					  },
				     					  {
				     						  width: 80,
													readOnly : true
				     					  },
				     					  {
				     						  width: 100,
													readOnly : true
				     					  },
				     					  {
				     						  width: 120,
													readOnly : true
				     					  },
				     					  {
				     						  type: 'autocomplete',
				     						  source: aResponsCode,
				     						  width: 200,
				     						  strict: true,
													readOnly : true
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
					          	           	//sap.ui.getCore().byId("idFLSAButtonAdd5").setEnabled(true);
				          	           		//sap.ui.getCore().byId("idFLSAButtonValidate").setEnabled(true);
				          	           		//sap.ui.getCore().byId("idFLSAButtonSubmit").setEnabled(false);
				          	           		//sap.ui.getCore().byId("idFLSAButtonPrint").setEnabled(false);
					          	        }
	          				});
	          		  document.getElementById('idFLSAExcel').style.visibility='hidden';
	    }


});

function isValidDate(dateString) {
	  var regEx = /^\d{4}-\d{2}-\d{2}$/;
	  if(!dateString.match(regEx)) return false;  // Invalid format
	  var d = new Date(dateString);
	  if(!d.getTime() && d.getTime() !== 0) return false; // Invalid date
	  return d.toISOString().slice(0,10) === dateString;
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

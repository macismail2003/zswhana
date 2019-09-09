var oJSONFESTSUMSAPData = [];
var oSTRINGFESTSUMValidationMessage = "";
var globalEstAmount = 0;
var globalFESTSUMStringCount = 0;
sap.ui.model.json.JSONModel.extend("festsum", {

	/*FESTSUM : Create Lessee Approval Pages */

	createFESTSUMPage : function(){

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

        var oFESTSUMComboDepot = new sap.ui.commons.TextField("idFESTSUMComboDepot",{
	        		visible: true,
							enabled : false,
	            width:"400px"
            }).addStyleClass("FormInputStyle marginTop7 valuesDisabled");


        var oFESTSUMLabelDepot = new sap.ui.commons.Label("idFESTSUMLabelDepot",{
			  text : "Depot",
				required : false,
			  width : "130px"
        }).addStyleClass("marginTop10");

		var oFESTSUMFlexDepot = new sap.m.FlexBox("idFESTSUMFlexDepot",{
            items: [oFESTSUMLabelDepot,
                    oFESTSUMComboDepot
                    ],
            direction: "Row"
		}).addStyleClass("marginMainLeft1 marginTop20");

		var oFESTSUMExcelContainer = new sap.ui.core.HTML("idFESTSUMExcelContainer",{
			//visible : false
		}).addStyleClass("marginLeft marginTop20");
        var oFESTSUMExcelHTML = '<div id="idFESTSUMExcel" style="width:100%;height:500px" class="marginMainLeft marginTop20">';
        oFESTSUMExcelContainer.setContent(oFESTSUMExcelHTML);

        /*******************************/
        /* Serial Number and Reference */
        /* Serial Number */

        var oFESTSUMInputSerial = new sap.ui.commons.TextField("idFESTSUMInputSerial",{
            value : "",
            width : "130px",
						enabled : false,
            maxLength: 11
        }).addStyleClass("FormInputStyle marginTop7 valuesDisabled");

        var oFESTSUMLabelSerial = new sap.ui.commons.Label("idFESTSUMLabelSerial",{
			  text : "Serial No.",
				required : false,
			  width : "130px"
        }).addStyleClass("marginTop10");


		var oFESTSUMFlexSerial = new sap.m.FlexBox("idFESTSUMFlexSerial",{
		             items: [oFESTSUMLabelSerial,
		                     oFESTSUMInputSerial
		                     ],
		             width: "280px",
		             direction: "Row"
		});

		/*******************************/
        /* Date and Amount */
        /* Estimate Date */


        var oFESTSUMInputEstDate = new sap.ui.commons.TextField("idFESTSUMInputEstDate",{
						enabled : false,
          	value : "",
          	width : "130px"
          }).addStyleClass("FormInputStyle marginTop7 valuesDisabled");

        var oFESTSUMLabelEstDate = new sap.ui.commons.Label("idFESTSUMLabelEstDate",{
			  text : "Estimate Date",
				required : false,
			  width : "130px"
        }).addStyleClass("marginTop10");


		var oFESTSUMFlexEstDate = new sap.m.FlexBox("idFESTSUMFlexEstDate",{
		             items: [oFESTSUMLabelEstDate,
		                     oFESTSUMInputEstDate
		                     ],
		             width: "280px",
		             direction: "Row"
		});


		/* Lab. Rate */

        var oFESTSUMInputLabRate = new sap.ui.commons.TextField("idFESTSUMInputLabRate",{
            value : "",
            width : "130px",
            enabled : false
        }).addStyleClass("FormInputStyle marginTop7 valuesDisabled");

        var oFESTSUMLabelLabRate = new sap.ui.commons.Label("idFESTSUMLabelLabRate",{
			  text : "Lab. Rate (C)",
			  width : "130px"
        }).addStyleClass("marginTop10");


		var oFESTSUMFlexLabRate = new sap.m.FlexBox("idFESTSUMFlexLabRate",{
		             items: [oFESTSUMLabelLabRate,
		                     oFESTSUMInputLabRate
		                     ],
		             width: "300px",
		             direction: "Row"
		});

		/* Notes1 */

        var oFESTSUMInputNotes1 = new sap.ui.commons.TextField("idFESTSUMInputNotes1",{
            value : "",
            placeholder : "",
            width : "400px",
            maxLength: 70,
						enabled : false
        }).addStyleClass("FormInputStyle marginTop7 valuesDisabled");

        var oFESTSUMLabelNotes1 = new sap.ui.commons.Label("idFESTSUMLabelNotes1",{
			  text : "Notes 1",
			  width : "130px"
        }).addStyleClass("marginTop10");


		var oFESTSUMFlexNotes1 = new sap.m.FlexBox("idFESTSUMFlexNotes1",{
		             items: [oFESTSUMLabelNotes1,
		                     oFESTSUMInputNotes1
		                     ],
		             width: "340px",
		             direction: "Row"
		});

		/* Notes2 */

        var oFESTSUMInputNotes2 = new sap.ui.commons.TextField("idFESTSUMInputNotes2",{
            value : "",
            width : "400px",
            maxLength: 70,
						enabled : false
        }).addStyleClass("FormInputStyle marginTop7 valuesDisabled");

        var oFESTSUMLabelNotes2 = new sap.ui.commons.Label("idFESTSUMLabelNotes2",{
			  text : "Notes 2",
			  width : "130px"
        }).addStyleClass("marginTop10");


		var oFESTSUMFlexNotes2 = new sap.m.FlexBox("idFESTSUMFlexNotes2",{
		             items: [oFESTSUMLabelNotes2,
		                     oFESTSUMInputNotes2
		                     ],
		             width: "340px",
		             direction: "Row"
		});

		/* Notes3 */

        var oFESTSUMInputNotes3 = new sap.ui.commons.TextField("idFESTSUMInputNotes3",{
            value : "",
            width : "400px",
            maxLength: 70,
						enabled : false
            //type: sap.ui.commons.TextFieldType.Number
        }).addStyleClass("FormInputStyle marginTop7 valuesDisabled");

        var oFESTSUMLabelNotes3 = new sap.ui.commons.Label("idFESTSUMLabelNotes3",{
			  text : "Notes 3",
			  width : "130px"
        }).addStyleClass("marginTop10");


		var oFESTSUMFlexNotes3 = new sap.m.FlexBox("idFESTSUMFlexNotes3",{
		             items: [oFESTSUMLabelNotes3,
		                     oFESTSUMInputNotes3
		                     ],
		             width: "340px",
		             direction: "Row"
		});

		/* Notes4 */

        var oFESTSUMInputNotes4 = new sap.ui.commons.TextField("idFESTSUMInputNotes4",{
            value : "",
            width : "400px",
            maxLength: 70,
						enabled : false
            //type: sap.ui.commons.TextFieldType.Number
        }).addStyleClass("FormInputStyle marginTop7 valuesDisabled");

        var oFESTSUMLabelNotes4 = new sap.ui.commons.Label("idFESTSUMLabelNotes4",{
			  text : "Notes 4",
			  width : "130px"
        }).addStyleClass("marginTop10");


		var oFESTSUMFlexNotes4 = new sap.m.FlexBox("idFESTSUMFlexNotes4",{
		             items: [oFESTSUMLabelNotes4,
		                     oFESTSUMInputNotes4
		                     ],
		             width: "340px",
		             direction: "Row"
		});

		/* Notes5 */

        var oFESTSUMInputNotes5 = new sap.ui.commons.TextField("idFESTSUMInputNotes5",{
            value : "",
            width : "400px",
            maxLength: 70,
						enabled : false
            //type: sap.ui.commons.TextFieldType.Number
        }).addStyleClass("FormInputStyle marginTop7 valuesDisabled");

        var oFESTSUMLabelNotes5 = new sap.ui.commons.Label("idFESTSUMLabelNotes5",{
			  text : "Notes 5",
			  width : "130px"
        }).addStyleClass("marginTop10");


		var oFESTSUMFlexNotes5 = new sap.m.FlexBox("idFESTSUMFlexNotes5",{
		             items: [oFESTSUMLabelNotes5,
		                     oFESTSUMInputNotes5
		                     ],
		             width: "340px",
		             direction: "Row"
		});


		/* Status */

        /*var oFESTSUMInputStatus = new sap.ui.commons.TextField("idFESTSUMInputStatus",{
            value : "",
            width : "50px",
            //type: sap.ui.commons.TextFieldType.Number
        });*/

		var oFESTSUMComboEstType = new sap.ui.commons.TextField("idFESTSUMComboEstType", {
			//layoutData: new sap.ui.layout.GridData({span: "L4 M9 S12"}),
			width:"270px",
			enabled: false
		}).addStyleClass("FormInputStyle marginTop7 valuesDisabled");

    var oFESTSUMLabelEstType = new sap.ui.commons.Label("idFESTSUMLabelEstType",{
	  text : "Est. Type",
		required : false,
	  width : "100px"
    }).addStyleClass("marginTop10");


		var oFESTSUMFlexEstType = new sap.m.FlexBox("idFESTSUMFlexEstType",{
		             items: [oFESTSUMLabelEstType,
		                     oFESTSUMComboEstType
		                     ],
		             width: "330px",
		             direction: "Row"
		});


		var oFESTSUMComboUpc = new sap.ui.commons.TextField("idFESTSUMComboUpc", {
			width:"100px",
			enabled: false,
		}).addStyleClass("FormInputStyle marginTop7 valuesDisabled");


    var oFESTSUMLabelUpc = new sap.ui.commons.Label("idFESTSUMLabelUpc",{
		  text : "Unit Part Code",
			required : false,
		  width : "130px"
    }).addStyleClass("marginTop10");


		var oFESTSUMFlexUpc = new sap.m.FlexBox("idFESTSUMFlexUpc",{
		             items: [oFESTSUMLabelUpc,
		                     oFESTSUMComboUpc
		                     ],
		             width: "300px",
		             direction: "Row"
		});

		var oFESTSUMDivider = new sap.ui.commons.HorizontalDivider({width: "95%", type: "Area", height: "Medium"});

		/* Customer Code */

        var oFESTSUMInputCustomerCode = new sap.ui.commons.TextField("idFESTSUMInputCustomerCode",{
            value : "",
            width : "130px",
            //type: sap.ui.commons.TextFieldType.Number,
            enabled : false
        }).addStyleClass("FormInputStyle marginTop7 valuesDisabled");

        var oFESTSUMLabelCustomerCode = new sap.ui.commons.Label("idFESTSUMLabelCustomerCode",{
			  text : "Customer Code",
			  width : "130px"
        }).addStyleClass("marginTop10");


		var oFESTSUMFlexCustomerCode = new sap.m.FlexBox("idFESTSUMFlexCustomerCode",{
		             items: [oFESTSUMLabelCustomerCode,
		                     oFESTSUMInputCustomerCode
		                     ],
		             width: "300px",
		             direction: "Row"
		});

		/* Reference */

        var oFESTSUMInputReference = new sap.ui.commons.TextField("idFESTSUMInputReference",{
            value : "",
            width : "130px",
            //type: sap.ui.commons.TextFieldType.Number,
            enabled : false
        }).addStyleClass("FormInputStyle marginTop7 valuesDisabled");

        var oFESTSUMLabelReference = new sap.ui.commons.Label("idFESTSUMLabelReference",{
			  text : "Reference",
			  width : "130px"
        }).addStyleClass("marginTop10");


		var oFESTSUMFlexReference = new sap.m.FlexBox("idFESTSUMFlexReference",{
		             items: [oFESTSUMLabelReference,
						oFESTSUMInputReference
		                     ],
		             width: "300px",
		             direction: "Row"
		});


		/* Amount */

        var oFESTSUMInputAmount = new sap.ui.commons.TextField("idFESTSUMInputAmount",{
            value : "",
            width : "130px",
            //type: sap.ui.commons.TextFieldType.Number,
            enabled : false
        }).addStyleClass("FormInputStyle marginTop7 valuesDisabled");

        var oFESTSUMLabelAmount = new sap.ui.commons.Label("idFESTSUMLabelAmount",{
			  text : "Amount",
			  width : "130px"
        }).addStyleClass("marginTop10");


		var oFESTSUMFlexAmount = new sap.m.FlexBox("idFESTSUMFlexAmount",{
		             items: [oFESTSUMLabelAmount,
						oFESTSUMInputAmount
		                     ],
		             width: "300px",
		             direction: "Row"
		});

		/* Lessee */

        var oFESTSUMInputLessee = new sap.ui.commons.TextField("idFESTSUMInputLessee",{
            value : "",
            width : "250px",
            enabled : false,
            //type: sap.ui.commons.TextFieldType.Number
        }).addStyleClass("FormInputStyle marginTop7 valuesDisabled");

        var oFESTSUMLabelLessee = new sap.ui.commons.Label("idFESTSUMLabelLessee",{
			  text : "Lessee",
			  width : "130px"
        }).addStyleClass("marginTop10");


		var oFESTSUMFlexLessee = new sap.m.FlexBox("idFESTSUMFlexLessee",{
		             items: [oFESTSUMLabelLessee,
		                     oFESTSUMInputLessee
		                     ],
		             width: "300px",
		             direction: "Row"
		});

		/* Redel */

        var oFESTSUMInputRedel = new sap.ui.commons.TextField("idFESTSUMInputRedel",{
            value : "",
            width : "130px",
            enabled : false,
            //type: sap.ui.commons.TextFieldType.Number
        }).addStyleClass("FormInputStyle marginTop7 valuesDisabled");

        var oFESTSUMLabelRedel = new sap.ui.commons.Label("idFESTSUMLabelRedel",{
			  text : "Redel. Auth",
			  width : "130px"
        }).addStyleClass("marginTop10");


		var oFESTSUMFlexRedel = new sap.m.FlexBox("idFESTSUMFlexRedel",{
		             items: [oFESTSUMLabelRedel,
		                     oFESTSUMInputRedel
		                     ],
		             width: "300px",
		             direction: "Row"
		});

		/* Lessee */

        var oFESTSUMInputDppcover = new sap.ui.commons.TextField("idFESTSUMInputDppcover",{
            value : "",
            width : "200px",
            enabled : false,
            //type: sap.ui.commons.TextFieldType.Number
        }).addStyleClass("FormInputStyle marginTop7 valuesDisabled");

        var oFESTSUMLabelDppcover = new sap.ui.commons.Label("idFESTSUMLabelDppcover",{
			  text : "SeaCover Limit",
			  width : "200px"
        }).addStyleClass("marginTop10");


		var oFESTSUMFlexDppcover = new sap.m.FlexBox("idFESTSUMFlexDppcover",{
		             items: [oFESTSUMLabelDppcover,
		                     oFESTSUMInputDppcover
		                     ],
		             width: "420px",
		             direction: "Row"
		});

		/* Prev. On Hire Date */

        var oFESTSUMInputPOHDate = new sap.ui.commons.TextField("idFESTSUMInputPOHDate",{
            value : "",
            width : "130px",
            //type: sap.ui.commons.TextFieldType.Number,
            enabled : false
        }).addStyleClass("FormInputStyle marginTop7 valuesDisabled");

        var oFESTSUMLabelPOHDate = new sap.ui.commons.Label("idFESTSUMLabelPOHDate",{
			  text : "Prev. ON Hire Date",
			  width : "130px"
        }).addStyleClass("marginTop10");


		var oFESTSUMFlexPOHDate = new sap.m.FlexBox("idFESTSUMFlexPOHDate",{
		             items: [oFESTSUMLabelPOHDate,
		                     oFESTSUMInputPOHDate
		                     ],
		             width: "300px",
		             direction: "Row"
		});

		/* Prev. On Hire Location */

        var oFESTSUMInputPOHLocation = new sap.ui.commons.TextField("idFESTSUMInputPOHLocation",{
            value : "",
            width : "130px",
            //type: sap.ui.commons.TextFieldType.Number,
            enabled : false
        }).addStyleClass("FormInputStyle marginTop7 valuesDisabled");

        var oFESTSUMLabelPOHLocation = new sap.ui.commons.Label("idFESTSUMLabelPOHLocation",{
			  text : "Prev. ON Hire Loc",
			  width : "130px"
        }).addStyleClass("marginTop10");


		var oFESTSUMFlexPOHLocation = new sap.m.FlexBox("idFESTSUMFlexPOHLocation",{
		             items: [oFESTSUMLabelPOHLocation,
		                     oFESTSUMInputPOHLocation
		                     ],
		             width: "300px",
		             direction: "Row"
		});


		/* Gate IN Date */

        var oFESTSUMInputGINDate = new sap.ui.commons.TextField("idFESTSUMInputGINDate",{
            value : "",
            width : "130px",
            //type: sap.ui.commons.TextFieldType.Number,
            enabled : false
        }).addStyleClass("FormInputStyle marginTop7 valuesDisabled");

        var oFESTSUMLabelGINDate = new sap.ui.commons.Label("idFESTSUMLabelGINDate",{
			  text : "Gate IN Date",
			  width : "130px"
        }).addStyleClass("marginTop10");


		var oFESTSUMFlexGINDate = new sap.m.FlexBox("idFESTSUMFlexGINDate",{
		             items: [oFESTSUMLabelGINDate,
		                     oFESTSUMInputGINDate
		                     ],
		             width: "300px",
		             direction: "Row"
		});


		/* Rev Number */

        var oFESTSUMInputRevNo = new sap.ui.commons.TextField("idFESTSUMInputRevNo",{
            value : "",
            width : "130px",
            enabled : false
            //type: sap.ui.commons.TextFieldType.Number
        }).addStyleClass("FormInputStyle marginTop7 valuesDisabled");

        var oFESTSUMLabelRevNo = new sap.ui.commons.Label("idFESTSUMLabelRevNo",{
			  text : "Rev. No.",
			  width : "130px"
        }).addStyleClass("marginTop10");


		var oFESTSUMFlexRevNo = new sap.m.FlexBox("idFESTSUMFlexRevNo",{
		             items: [oFESTSUMLabelRevNo,
		                     oFESTSUMInputRevNo
		                     ],
		             width: "300px",
		             direction: "Row"
		});

		/* Base Currency */

        var oFESTSUMInputBaseCurr = new sap.ui.commons.TextField("idFESTSUMInputBaseCurr",{
            value : "",
            width : "130px",
            enabled : false
            //type: sap.ui.commons.TextFieldType.Number
        }).addStyleClass("FormInputStyle marginTop7 valuesDisabled");

        var oFESTSUMLabelBaseCurr = new sap.ui.commons.Label("idFESTSUMLabelBaseCurr",{
			  text : "Depot Curr.",
			  width : "130px"
        }).addStyleClass("marginTop10");


		var oFESTSUMFlexBaseCurr = new sap.m.FlexBox("idFESTSUMFlexBaseCurr",{
		             items: [oFESTSUMLabelBaseCurr,
		                     oFESTSUMInputBaseCurr
		                     ],
		             width: "300px",
		             direction: "Row"
		});

		/* Status */

		var oFESTSUMInputStatus = new sap.ui.commons.TextField("idFESTSUMInputStatus",{
				value : "",
				width : "130px",
				enabled : false
				//type: sap.ui.commons.TextFieldType.Number
		}).addStyleClass("FormInputStyle marginTop7 valuesDisabled");


				var oFESTSUMLabelStatus = new sap.ui.commons.Label("idFESTSUMLabelStatus",{
				text : "Est. Type",
				required : false,
				width : "130px"
				}).addStyleClass("marginTop10");


		var oFESTSUMFlexStatus = new sap.m.FlexBox("idFESTSUMFlexStatus",{
								 items: [oFESTSUMLabelStatus,
												 oFESTSUMInputStatus
												 ],
								 width: "330px",
								 direction: "Row"
		});

		// var oFESTSUMLayoutSelection = new sap.ui.layout.form.ResponsiveGridLayout("idFESTSUMLayoutSelection", {
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
		// var oFESTSUMFormSelection = new sap.ui.layout.form.Form("idFESTSUMFormSelection",{
    //       layout: oFESTSUMLayoutSelection,
    //       width: "100%",
    //       formContainers: [
    //               new sap.ui.layout.form.FormContainer({
    //               	  //title: new sap.ui.core.Title({text: ""}),
    //                   formElements: [
		// 						new sap.ui.layout.form.FormElement({
		// 							fields: [backEDI],
		// 							layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		// 						}),
		// 						new sap.ui.layout.form.FormElement({
		// 							fields: [oFESTSUMFlexDepot],
		// 							layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		// 						}),
		// 						new sap.ui.layout.form.FormElement({
		// 							fields: [oFESTSUMFlexSerial, oFESTSUMFlexUpc, oFESTSUMFlexEstType],
		// 							layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		// 						}),
		// 						new sap.ui.layout.form.FormElement({
		// 							fields: [oFESTSUMFlexEstDate],
		// 							layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		// 						}),
		// 						new sap.ui.layout.form.FormElement({
		// 							fields: [oFESTSUMFlexNotes1, oFESTSUMFlexNotes2],
		// 							layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		// 						}),
		// 						new sap.ui.layout.form.FormElement({
		// 							fields: [oFESTSUMFlexNotes3, oFESTSUMFlexNotes4],
		// 							layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		// 						}),
		// 						new sap.ui.layout.form.FormElement({
		// 							fields: [oFESTSUMFlexNotes5],
		// 							layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		// 						}),
		// 						new sap.ui.layout.form.FormElement({
		// 							fields: [oFESTSUMDivider],
		// 							layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		// 						})
		//
    //                   ],layoutData: new sap.ui.layout.GridData({span: "L7 M12 S12"})
    //               })
    //       ]
		// });
		//
		// var oFESTSUMLayoutSelectionAuto = new sap.ui.layout.form.ResponsiveGridLayout("idFESTSUMLayoutSelectionAuto", {
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
		// var oFESTSUMFormSelectionAuto = new sap.ui.layout.form.Form("idFESTSUMFormSelectionAuto",{
    //     layout: oFESTSUMLayoutSelectionAuto,
    //     width: "80%",
    //     visible : false,
    //     formContainers: [
    //             new sap.ui.layout.form.FormContainer({
    //             	  //title: new sap.ui.core.Title({text: ""}),
    //                 formElements: [
		// 						new sap.ui.layout.form.FormElement({
		// 							fields: [oFESTSUMFlexCustomerCode, oFESTSUMFlexRedel, oFESTSUMFlexLabRate],
		// 							layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		// 						}),
		// 						new sap.ui.layout.form.FormElement({
		// 							fields: [oFESTSUMFlexRevNo, oFESTSUMFlexGINDate, oFESTSUMFlexBaseCurr],
		// 							layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		// 						}),
		// 						new sap.ui.layout.form.FormElement({
		// 							fields: [oFESTSUMFlexPOHDate, oFESTSUMFlexPOHLocation],
		// 							layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		// 						}),
		// 						new sap.ui.layout.form.FormElement({
		// 							fields: [oFESTSUMFlexLessee],
		// 							layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
		// 						})
		//
    //                 ],layoutData: new sap.ui.layout.GridData({span: "L7 M12 S12"})
    //             })
    //     ]
		// });

		var oFESTSUMLayoutSelection = new sap.ui.layout.form.ResponsiveGridLayout("idFESTSUMLayoutSelection", {
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

		var oFESTSUMFormSelection = new sap.ui.layout.form.Form("idFESTSUMFormSelection",{
					layout: oFESTSUMLayoutSelection,
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
									fields: [oFESTSUMFlexDepot],
									layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
								}),
								new sap.ui.layout.form.FormElement({
									fields: [oFESTSUMFlexSerial, oFESTSUMFlexEstDate, oFESTSUMFlexUpc],
									layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
								}),
								// new sap.ui.layout.form.FormElement({
								// 	fields: [oFESTSUMFlexEstDate],	// oFESTSUMFlexGrade
								// 	layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
								// }),
								new sap.ui.layout.form.FormElement({
									fields: [oFESTSUMFlexStatus, oFESTSUMFlexNotes1, oFESTSUMFlexNotes2],
									layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
								}),
								new sap.ui.layout.form.FormElement({
									fields: [oFESTSUMFlexNotes3, oFESTSUMFlexNotes4, oFESTSUMFlexNotes5],
									layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
								}),
								new sap.ui.layout.form.FormElement({
									fields: [oFESTSUMDivider],
									layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
								})

											],layoutData: new sap.ui.layout.GridData({span: "L7 M12 S12"})
									})
					]
		});

		var oFESTSUMLayoutSelectionAuto = new sap.ui.layout.form.ResponsiveGridLayout("idFESTSUMLayoutSelectionAuto", {
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

		/* Lab. Rate Machinery */

				var oFESTSUMInputLabRateM = new sap.ui.commons.TextField("idFESTSUMInputLabRateM",{
						value : "",
						width : "130px",
						enabled : false
				}).addStyleClass("FormInputStyle marginTop7 valuesDisabled");

				var oFESTSUMLabelLabRateM = new sap.ui.commons.Label("idFESTSUMLabelLabRateM",{
				text : "Lab. Rate (M)",
				width : "130px"
				}).addStyleClass("marginTop10");


		var oFESTSUMFlexLabRateM = new sap.m.FlexBox("idFESTSUMFlexLabRateM",{
								 items: [oFESTSUMLabelLabRateM,
												 oFESTSUMInputLabRateM
												 ],
								 width: "350px",
								 direction: "Row"
		});

		/* DPP Limit */

		    var oFESTSUMInputDppLimit = new sap.ui.commons.TextField("idFESTSUMInputDppLimit",{
		        value : "",
		        width : "130px",
		        enabled : false,
		        type: sap.m.InputType.Number
		    }).addStyleClass("FormInputStyle marginTop7 valuesDisabled");

		    var oFESTSUMLabelDppLimit = new sap.ui.commons.Label("idFESTSUMLabelDppLimit",{
		    text : "SCR Limit Amt.",
		    width : "130px"
		    }).addStyleClass("marginTop10");


		var oFESTSUMFlexDppLimit = new sap.m.FlexBox("idFESTSUMFlexDppLimit",{
		             items: [oFESTSUMLabelDppLimit,
		                     oFESTSUMInputDppLimit
		                     ],
		             width: "350px",
		             direction: "Row"
		});

		/* DPP Curr */

		    var oFESTSUMInputDppCurr = new sap.ui.commons.TextField("idFESTSUMInputDppCurr",{
		        value : "",
		        width : "130px",
		        enabled : false
		    }).addStyleClass("FormInputStyle marginTop7 valuesDisabled");

		    var oFESTSUMLabelDppCurr = new sap.ui.commons.Label("idFESTSUMLabelDppCurr",{
		    text : "SCR Limit Curr.",
		    width : "130px"
		    }).addStyleClass("marginTop10");


		var oFESTSUMFlexDppCurr = new sap.m.FlexBox("idFESTSUMFlexDppCurr",{
		             items: [oFESTSUMLabelDppCurr,
		                     oFESTSUMInputDppCurr
		                     ],
		             width: "350px",
		             direction: "Row"
		});

		/* Exch Rate */

		    var oFESTSUMInputExchRate = new sap.ui.commons.TextField("idFESTSUMInputExchRate",{
		        value : "",
		        width : "130px",
		        //type: sap.m.InputType.Number,
		        enabled : false
		    }).addStyleClass("FormInputStyle marginTop7 valuesDisabled");

		    var oFESTSUMLabelExchRate = new sap.ui.commons.Label("idFESTSUMLabelExchRate",{
		    text : "Exchange Rate",
		width : "130px",
		    }).addStyleClass("marginTop10");


		var oFESTSUMFlexExchRate = new sap.m.FlexBox("idFESTSUMFlexExchRate",{
		             items: [oFESTSUMLabelExchRate,
		                     oFESTSUMInputExchRate
		                     ],
		             width: "350px",
		             direction: "Row"
		});

		/* Prod. Cate */

		    var oFESTSUMInputProdCate = new sap.ui.commons.TextField("idFESTSUMInputProdCate",{
		        value : "",
		        width : "130px",
		        //type: sap.m.InputType.Number,
		        enabled : false
		    }).addStyleClass("FormInputStyle marginTop7 valuesDisabled");

		    var oFESTSUMLabelProdCate = new sap.ui.commons.Label("idFESTSUMLabelProdCate",{
		    text : "Prod. Category",
		width : "130px",
		    }).addStyleClass("marginTop10");


		var oFESTSUMFlexProdCate = new sap.m.FlexBox("idFESTSUMFlexProdCate",{
		             items: [oFESTSUMLabelProdCate,
		                     oFESTSUMInputProdCate
		                     ],
		             width: "350px",
		             direction: "Row"
		});

		var oFESTSUMFormSelectionAuto = new sap.ui.layout.form.Form("idFESTSUMFormSelectionAuto",{
				layout: oFESTSUMLayoutSelectionAuto,
				width: "90%",
				visible : false,
				formContainers: [
								new sap.ui.layout.form.FormContainer({
										//title: new sap.ui.core.Title({text: ""}),
										formElements: [
								new sap.ui.layout.form.FormElement({
									fields: [oFESTSUMFlexLabRate, oFESTSUMFlexLabRateM, oFESTSUMFlexDppLimit, oFESTSUMFlexDppCurr],
									layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
								}),
								new sap.ui.layout.form.FormElement({
									fields: [oFESTSUMFlexRedel, oFESTSUMFlexRevNo, oFESTSUMFlexGINDate, oFESTSUMFlexBaseCurr],
									layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
								}),
								new sap.ui.layout.form.FormElement({
									fields: [oFESTSUMFlexPOHDate, oFESTSUMFlexPOHLocation, oFESTSUMFlexExchRate, oFESTSUMFlexProdCate],
									layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
								}),
								new sap.ui.layout.form.FormElement({
									fields: [oFESTSUMFlexCustomerCode, oFESTSUMFlexLessee],
									layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
								}),
								new sap.ui.layout.form.FormElement({
									fields: [oFESTSUMFlexReference, oFESTSUMFlexAmount],
									layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
								}),

								// new sap.ui.layout.form.FormElement({
								// 	fields: [oFESTSUMFlexButtons],
								// 	layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
								// }),

										],layoutData: new sap.ui.layout.GridData({span: "L7 M12 S12"})
								})
				]
		});

		var oFESTSUMFlexFinal = new sap.m.FlexBox("idFESTSUMFlexFinal",{
            items: [ oFESTSUMFormSelection,
                     oFESTSUMFormSelectionAuto,
                     oFESTSUMExcelContainer
                    ],
            direction: "Column"
		}).addStyleClass("marginMainLeft");

		return oFESTSUMFlexFinal;

	},



});

function isValidDate(dateString) {
	  var regEx = /^\d{4}-\d{2}-\d{2}$/;
	  if(!dateString.match(regEx)) return false;  // Invalid format
	  var d = new Date(dateString);
	  if(!d.getTime() && d.getTime() !== 0) return false; // Invalid date
	  return d.toISOString().slice(0,10) === dateString;
}

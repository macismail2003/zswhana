
sap.ui.model.json.JSONModel.extend("FESTSUMLSA", {

createFESTSUMLSAPage : function(){

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

          var oFESTSUMLSAInputDepot = new sap.ui.commons.TextField("idFESTSUMLSAInputDepot",{
          		visible: true,
  						enabled : false,
              width:"300px"
  					}).addStyleClass("FormInputStyle marginTop7 valuesDisabled");

          var oFESTSUMLSALabelDepot = new sap.ui.commons.Label("idFESTSUMLSALabelDepot",{
  			  text : "Depot",
  				required : true,
  			  width : "130px"
          }).addStyleClass("marginTop10");

  		var oFESTSUMLSAFlexDepot = new sap.m.FlexBox("idFESTSUMLSAFlexDepot",{
              items: [oFESTSUMLSALabelDepot,
                      oFESTSUMLSAInputDepot
                      ],
              direction: "Row"
  		}).addStyleClass("marginMainLeft1");

          /*******************************/
          /* Serial Number and Reference */
          /* Serial Number */

          var oFESTSUMLSAInputSerial = new sap.ui.commons.TextField("idFESTSUMLSAInputSerial",{
              value : "",
  						enabled : false,
              width : "130px",
              maxLength: 11,
  						liveChange: function(evnt){
  							oCurrent.resetFESTSUMLSAKeyFields();
              },
              //type: sap.ui.commons.TextFieldType.Number
          }).addStyleClass("FormInputStyle marginTop7 valuesDisabled");

          var oFESTSUMLSALabelSerial = new sap.ui.commons.Label("idFESTSUMLSALabelSerial",{
  			  text : "Serial No.",
  				required : true,
  			  width : "130px"
          }).addStyleClass("marginTop10");


  		var oFESTSUMLSAFlexSerial = new sap.m.FlexBox("idFESTSUMLSAFlexSerial",{
  		             items: [oFESTSUMLSALabelSerial,
  		                     oFESTSUMLSAInputSerial
  		                     ],
  		             width: "300px",
  		             direction: "Row"
  		});

  		/* Reference */

          var oFESTSUMLSAInputReference = new sap.ui.commons.TextField("idFESTSUMLSAInputReference",{
              value : "",
  						enabled : false,
              width : "130px",
              //type: sap.ui.commons.TextFieldType.Number
          }).addStyleClass("FormInputStyle marginTop7 valuesDisabled");

          var oFESTSUMLSALabelReference = new sap.ui.commons.Label("idFESTSUMLSALabelReference",{
  			  text : "Reference",
  				required : true,
  			  width : "130px"
          }).addStyleClass("marginTop10");


  		var oFESTSUMLSAFlexReference = new sap.m.FlexBox("idFESTSUMLSAFlexReference",{
  		             items: [oFESTSUMLSALabelReference,
  		                     oFESTSUMLSAInputReference
  		                     ],
  		             width: "300px",
  		             direction: "Row"
  		});

  		var oFESTSUMLSAFlexSerialReference = new sap.m.FlexBox("idFESTSUMLSAFlexSerialReference",{
              items: [oFESTSUMLSAFlexSerial,
                      oFESTSUMLSAFlexReference
                      ],
              width: "300px",
              direction: "Row"
  		});

  		/*******************************/
          /* Date and Amount */
          /* Date */

          var oFESTSUMLSAInputAppDate = new sap.ui.commons.DatePicker("idFESTSUMLSAInputAppDate",{
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

          var oFESTSUMLSALabelAppDate = new sap.ui.commons.Label("idFESTSUMLSALabelAppDate",{
  			  text : "Approval Date",
  				required : true,
  			  width : "130px"
          }).addStyleClass("marginTop10");


  		var oFESTSUMLSAFlexAppDate = new sap.m.FlexBox("idFESTSUMLSAFlexAppDate",{
  		             items: [oFESTSUMLSALabelAppDate,
  		                     oFESTSUMLSAInputAppDate
  		                     ],
  		             width: "300px",
  		             direction: "Row"
  		});

  		/* Amount */

          var oFESTSUMLSAInputAmount = new sap.ui.commons.TextField("idFESTSUMLSAInputAmount",{
              value : "",
              width : "130px",
  						enabled : false,
              //type: sap.ui.commons.TextFieldType.Number
          }).addStyleClass("FormInputStyle marginTop7 valuesDisabled");

          var oFESTSUMLSALabelAmount = new sap.ui.commons.Label("idFESTSUMLSALabelAmount",{
  			  text : "Amount",
  				required : true,
  			  width : "130px"
          }).addStyleClass("marginTop10");


  		var oFESTSUMLSAFlexAmount = new sap.m.FlexBox("idFESTSUMLSAFlexAmount",{
  		             items: [oFESTSUMLSALabelAmount,
  		                     oFESTSUMLSAInputAmount
  		                     ],
  		             width: "300px",
  		             direction: "Row"
  		});

  		var oFESTSUMLSAFlexAppDateAmount = new sap.m.FlexBox("idFESTSUMLSAFlexAppDateAmount",{
              items: [oFESTSUMLSAFlexAppDate,
                      oFESTSUMLSAFlexAmount
                      ],
              width: "300px",
              direction: "Row"
  		});

  		var oFESTSUMLayoutSelectionLSA = new sap.ui.layout.form.ResponsiveGridLayout("idFESTSUMLayoutSelectionLSA", {
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

  		var oFESTSUMFormSelectionLSA = new sap.ui.layout.form.Form("idFESTSUMFormSelectionLSA",{
          layout: oFESTSUMLayoutSelectionLSA,
          width: "80%",
          visible : true,
          formContainers: [
                  new sap.ui.layout.form.FormContainer({
                  	  //title: new sap.ui.core.Title({text: ""}),
                      formElements: [
  											new sap.ui.layout.form.FormElement({
  												fields: [backEDI],
  												layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
  											}),
  											new sap.ui.layout.form.FormElement({
  												fields: [oFESTSUMLSAFlexDepot],
  												layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
  											}),
  											new sap.ui.layout.form.FormElement({
  												fields: [oFESTSUMLSAFlexSerial,oFESTSUMLSAFlexReference, new sap.ui.commons.Label({width : "10px"})],
  												layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
  											}),
  											new sap.ui.layout.form.FormElement({
  												fields: [oFESTSUMLSAFlexAppDate,oFESTSUMLSAFlexAmount, new sap.ui.commons.Label({width : "10px"})],
  												layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
  											}),

                      ],layoutData: new sap.ui.layout.GridData({span: "L7 M12 S12"})
                  })
          ]
  		});

  		return oFESTSUMFormSelectionLSA;

  	}

});

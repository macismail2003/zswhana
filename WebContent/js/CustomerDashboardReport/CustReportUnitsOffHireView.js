/*$*$------------------------------------------------------------------------*
*$*$ Modified By : Seyed Ismail MAC
*$*$ Modified On : 11.12.2017
*$*$ Reference   : APS 167
*$*$ Transport   :
*$*$ Tag         : MAC11122017
*$*$ Purpose     : Seaweb enhancements for MSC
*				   Unit Off Hire - Add Search by Lease Number MAC11122017_3
*$*$------------------------------------------------------------------*
*/
jQuery.sap.require("sap.ui.model.json.JSONModel");

var arrUnitsOffHireReport = [];
var arrUnitsOffHireReportTemp = [];
var arrErrorRAsReport = [];
var jsonCRUOHExportToExcel = [];

sap.ui.model.json.JSONModel.extend("custReportUnitsOffHireView", {

	createCustReportUnitsOffHire: function(){

		var oCurrCRUOH = this;
		var oGetData = new onLoadDataUnitsOffHireCRUOH(); // MAC11122017_3

		// Labels
		var oLabelCustomerID = new sap.ui.commons.Label({text: "Customer ID:",
			required: false,
			layoutData: new sap.ui.layout.GridData({span: "L3 M4 S6",linebreak: false, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");

		//MAC11122017_3+
		var oLabelLeaseType = new sap.ui.commons.Label({text: "Lease Type:",
			required: false,
			layoutData: new sap.ui.layout.GridData({span: "L3 M4 S6",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");

		var oLabelLeaseNumber = new sap.ui.commons.Label({text: "Lease Number:",
			required: true,
			layoutData: new sap.ui.layout.GridData({span: "L3 M4 S6",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");
		//MAC11122017_3+

		var oLabelOffHireDate = new sap.ui.commons.Label({text: "Off-Hire Date:",
			required: true,
			layoutData: new sap.ui.layout.GridData({span: "L3 M4 S6",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");

		var oLabelOffHireLocation = new sap.ui.commons.Label({text: "Off-Hire Location:",
			layoutData: new sap.ui.layout.GridData({span: "L3 M4 S6",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");

		var oLabelUnitDescription = new sap.ui.commons.Label({text: "Unit Type:",
			layoutData: new sap.ui.layout.GridData({span: "L3 M4 S6",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");

		var oLabelRANumber = new sap.ui.commons.Label({text: "RA Number:",
			layoutData: new sap.ui.layout.GridData({span: "L3 M4 S6",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");

		var oLabelFrom = new sap.ui.commons.Label({text: "From: ",
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S3",linebreak: false, margin: true}),
            wrapping: true}).addStyleClass("marginTop10 marginRight5");

		var oLabelTo = new sap.ui.commons.Label({text: "To: ",
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S3",linebreak: false, margin: true}),
            wrapping: true}).addStyleClass("marginTop10 marginRight5");

		var oLabelMandatory = new sap.ui.commons.Label({text: "Either of the fields required",
			required: true,
			requiredAtBegin : true,
    wrapping: true}).addStyleClass("marginTop10");

		var oLabelLeaseType = new sap.ui.commons.Label({text: "- Enter Lease Type to enable Lease Number field",
    wrapping: true}).addStyleClass("marginTop10");

		var oLabelNotes = new sap.m.VBox({
			items : [oLabelMandatory, oLabelLeaseType]
		});
		var oLabelSpaceForDate = new sap.ui.commons.Label({text: "",
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S3",linebreak: false, margin: true}),
			width:"18px",
            wrapping: true}).addStyleClass("marginTop10");

		// Drop down
		/*var oComboCustomer = new sap.ui.core.HTML("idHtmlCustomerCRUOH",{layoutData: new sap.ui.layout.GridData({span: "L8 M6 S6"})});
		var htmlContentCustomer = '<input id="idComboCustomerCRUOH" placeholder="Select Customer" class="FormInputStyle marginTop10" style="width:100%">';
		oComboCustomer.setContent(htmlContentCustomer);*/

		var oComboCustomer = new sap.ui.commons.ComboBox("idComboCustomerCRUOH", {
			layoutData: new sap.ui.layout.GridData({span: "L6 M8 S12"}),
			width:"100%",
			//enabled: seacoUser,
			placeholder:"Select Customer",
			 change: function(evnt){
					if(this.getValue() != '')
					{
						oGetData.GetOnLeaseDataCRUOH();
					}
		          }
		}).addStyleClass("marginTop10");

		//MAC11122017_3+
		var oInputLeaseType = new control.AutoCompleteValueHolder('idLeaseTypeCRUOH', {
            layoutData: new sap.ui.layout.GridData({span: "L8 M6 S6"}),
            enabled: true,
            itemSelectLimit: 25,
            placeholder: "Lease Type",
            selectedItem: function (event) {
          	  var selLeaseType = '';
                for(var i=0;i<event.mParameters.allItems.length;i++)
                	selLeaseType += event.mParameters.allItems[i].description +'$';

                selLeaseType = selLeaseType.slice(0,-1);
                oGetData.onLeaseTypeChange(selLeaseType);
               },
               deletedItem: function (event) {
                          var selLeaseType='';
                          var selectedValues = sap.ui.getCore().byId('idLeaseTypeCRUOH').getSelectedValues();
                          for(var i=0;i<selectedValues.length;i++)
                        	  selLeaseType += selectedValues[0].code +'$';

                          if(selectedValues.length == 0){
                        	  aLeaseNumberCRUOH = [];

                        	  aLeaseNumberCRUOH = [];
                        	  sap.ui.getCore().byId('idLeaseNumberCRUOH').clearSelectedValues();
                        	  sap.ui.getCore().byId('idLeaseNumberCRUOH').destroyAllItems();

                        	  aUnitDescrCRUOH = [];
                        	  sap.ui.getCore().byId('idUnitDescrCRUOH').clearSelectedValues();
                        	  //sap.ui.getCore().byId('idUnitDescrCRUOH').destroyAllItems();

                          }

                          selLeaseType = selLeaseType.slice(0,-1);
                          oGetData.onLeaseTypeChange(selLeaseType);
               },
               beforDeleteItem: function(event){
              	 this.setConfirmEnabled(true);
              	 this.setConfirmMessage("This will reset all the data in the dependent Location fields. Do you still want to continue?");
               },
               deletedAllItems: function (event) {
               }
		  });
    	oInputLeaseType.addStyleClass("marginTop10");

    	var oInputLeaseNumber = new control.AutoCompleteValueHolder('idLeaseNumberCRUOH', {
            layoutData: new sap.ui.layout.GridData({span: "L8 M6 S6"}),
            enabled: false,
            itemSelectLimit: 25,
            placeholder: "Lease Number",
            /*selectedItem: function (event) {
                   var selLeaseNumber='';
                   for(var i=0;i<event.mParameters.allItems.length;i++)
                	   selLeaseNumber += event.mParameters.allItems[i].description +'$';

                   selLeaseNumber = selLeaseNumber.slice(0,-1);
                   oGetData.onLeaseNumberChange(selLeaseNumber);
               },
               deletedItem: function (event) {
              	 sap.ui.getCore().byId('idLeaseNumberCRUOH').mProperties.placeholder = 'Lease Number';

              	 var selLeaseNumber='';
              	 var selectedValuesLeaseNumber = sap.ui.getCore().byId('idLeaseNumberCRUOH').getSelectedValues();
                   for(var i=0;i<selectedValuesLeaseNumber.length;i++)
                	   selLeaseNumber += selectedValuesLeaseNumber[i].description +'$';

                   if(selectedValuesLeaseNumber.length == 0){
                	   aUnitDescrCRUOH = [];
                   }

                   selLeaseNumber = selLeaseNumber.slice(0,-1);
                   oGetData.onLeaseNumberChange(selLeaseNumber);
               },
               beforDeleteItem: function(event){
              	 this.setConfirmEnabled(true);
              	 this.setConfirmMessage("This will reset all the data in the dependent Location fields. Do you still want to continue?");
               },
               deletedAllItems: function (event) {
               }*/
      });
    	oInputLeaseNumber.addStyleClass("marginTop10");

    	//MAC11122017_3+

		// Auto suggest
    	var oInputOffHireLocation = new control.AutoCompleteValueHolder('idOffHireLocationCRUOH', {
            layoutData: new sap.ui.layout.GridData({span: "L7 M7 S4"}),
            enabled: true,
            itemSelectLimit: 25,
            placeholder: "Select Off-Hire Location",
            selectedItem: function (event) {},
               deletedItem: function (event) {},
               beforDeleteItem: function(event){},
               deletedAllItems: function (event) {
               }
		  });
    	oInputOffHireLocation.addStyleClass("marginTop10");

    	var oInputUnitDescr = new control.AutoCompleteValueHolder('idUnitDescrCRUOH', {
            layoutData: new sap.ui.layout.GridData({span: "L7 M7 S4"}),
            enabled: true,
            itemSelectLimit: 25,
            placeholder: "Select Unit Type",
            selectedItem: function (event) {},
               deletedItem: function (event) {},
               beforDeleteItem: function(event){},
               deletedAllItems: function (event) {
               }
		  });
    	oInputUnitDescr.addStyleClass("marginTop10");

    	var oInputRANumber =new sap.ui.commons.TextArea('idRANumberCRUOH',{
	    	  layoutData: new sap.ui.layout.GridData({span: "L8 M6 S12"}),
				rows:25,
				cols:30,
				height:"145px",
				placeholder:"RA Number/s",
				change:function(){
					sap.ui.getCore().byId("idRANumberCRUOH").setValueState(sap.ui.core.ValueState.None);
					sap.ui.getCore().byId("idRANumberCRUOH").setPlaceholder("RA Number");

				}
			}).addStyleClass("marginTop10 OutlineNone");
    	oInputRANumber.setMaxLength(198);

    	/*var oModelCurrDateCRUOH = new sap.ui.model.json.JSONModel();
    	oModelCurrDateCRUOH.setData({
	   		dateValue: new Date()
		});*/

    	var oInputOffHireDateFrom = new sap.ui.commons.DatePicker("idOffHireDateFromCRUOH",{
    		value: {
                path: "/dateValue",
                type: new sap.ui.model.type.Date({pattern: "dd-MM-yyyy"}),
                mode: sap.ui.model.BindingMode.OneWay
    			},
    			width:"100px",
    			layoutData: new sap.ui.layout.GridData({span: "L2 M2 S3"}),
    	});
    	//oInputOffHireDateFrom.setModel(oModelCurrDateCRUOH);
    	oInputOffHireDateFrom.addStyleClass("FormInputStyle margin5Top");
    	oInputOffHireDateFrom.setLocale("en-US");
    	oInputOffHireDateFrom.attachChange(
    	                function(oEvent){
    	                        if(oEvent.getParameter("invalidValue")){
    	                                oEvent.oSource.setValueState(sap.ui.core.ValueState.Error);
    	                                oEvent.oSource.setValue("");
    	                                oEvent.oSource.setPlaceholder("Invalid Value");
    	                        }else{
    	                                oEvent.oSource.setValueState(sap.ui.core.ValueState.None);
    	                        }
    	                }
    	);

    	var oInputOffHireDateTo = new sap.ui.commons.DatePicker("idOffHireDateToCRUOH",{
    		value: {
                path: "/dateValue",
                type: new sap.ui.model.type.Date({pattern: "dd-MM-yyyy"}),
                mode: sap.ui.model.BindingMode.OneWay
    			},
    			width:"100px",
    			layoutData: new sap.ui.layout.GridData({span: "L2 M2 S3"}),
    	});
    	//oInputOffHireDateTo.setModel(oModelCurrDateCRUOH);
    	oInputOffHireDateTo.addStyleClass("FormInputStyle margin5Top");
    	oInputOffHireDateTo.setLocale("en-US");
    	oInputOffHireDateTo.attachChange(
    	                function(oEvent){
    	                        if(oEvent.getParameter("invalidValue")){
    	                                oEvent.oSource.setValueState(sap.ui.core.ValueState.Error);
    	                                oEvent.oSource.setValue("");
    	                                oEvent.oSource.setPlaceholder("Invalid Value");
    	                        }else{
    	                                oEvent.oSource.setValueState(sap.ui.core.ValueState.None);
    	                        }
    	                }
    	);


    	//Flexbox for Date
		var oFlexDate = new sap.m.FlexBox({
		      items: [
		        oLabelFrom,
		        oInputOffHireDateFrom,
		        oLabelSpaceForDate,
		        oLabelTo,
		        oInputOffHireDateTo
		      ],
		      layoutData: new sap.ui.layout.GridData({span: "L8 M9 S12",linebreak: false, margin: true}),
		      direction: "Row"
		});

    	// Buttons
	   	 var oBtnSubmit = new sap.m.Button("idBtnSubmitCRUOH",{
		          text : "Submit",
		          width:"80px",
		          styled:false,
		          layoutData: new sap.ui.layout.GridData({span: "L2 M5 S4",linebreak: true, margin: true}),
		          press:function(){
		        	  if(oCurrCRUOH.validateUnitsOffHireCRUOH()){
		        		  oCurrCRUOH.getUnitsOffHireReportCRUOH();
		        	  }
		        	  }}).addStyleClass("submitBtn marginTop10");

	   	var oBtnReset = new sap.m.Button("idBtnResetCRUOH",{
            text : "Reset",
            width:"80px",
            styled:false,
            layoutData: new sap.ui.layout.GridData({span: "L2 M5 S4",linebreak: true, margin: true}),
            press:function(){
                         oCurrCRUOH.resetOffHireCRUOH();
                  }}).addStyleClass("submitBtn marginTop10");

         var oLabelSpaceCRUOH = new sap.ui.commons.Label({text: " ",
                width:"8px",
       wrapping: true});

         var oFlexButtons = new sap.m.FlexBox({
             items: [
                                    oBtnSubmit,
                                    oLabelSpaceCRUOH,
                                    oBtnReset
             ],
             direction : "Row",
                      }).addStyleClass("marginTop10");

	  // Responsive Grid Layout
		    var oUnitsOffHireLayout = new sap.ui.layout.form.ResponsiveGridLayout("idUnitsOffHireCRUOLLayout",{
	    	  /*labelSpanL: 1,
              labelSpanM: 1,
              labelSpanS: 1,
              emptySpanL: 0,
              emptySpanM: 0,
              emptySpanS: 0,
              columnsL: 2,
              columnsM: 2,
              columnsS: 1,
              breakpointL: 765,
              breakpointM: 320*/
		    });

		  // Online Form Starts
		     var oUnitsOffHireForm = new sap.ui.layout.form.Form("idUnitsOffHireCRUOLForm",{
		             layout: oUnitsOffHireLayout,
		             formContainers: [

		                     new sap.ui.layout.form.FormContainer("idUnitsOffHireCRUOLFormC1",{
	                             formElements: [
	                                            	new sap.ui.layout.form.FormElement({
													    fields: [oLabelCustomerID, oComboCustomer]
													}),
													new sap.ui.layout.form.FormElement({	// MAC11122017_3
													    fields: [oLabelLeaseType, oInputLeaseType]
													}),
													new sap.ui.layout.form.FormElement({	// MAC11122017_3
													    fields: [oLabelLeaseNumber, oInputLeaseNumber]
													}),
													new sap.ui.layout.form.FormElement({
													    fields: [oLabelOffHireDate, oFlexDate]
													}),
													new sap.ui.layout.form.FormElement({
													    fields: [oLabelOffHireLocation, oInputOffHireLocation]
													}),
													new sap.ui.layout.form.FormElement({
													    fields: [oLabelUnitDescription, oInputUnitDescr]
													}),
													new sap.ui.layout.form.FormElement({
													    fields: [oLabelRANumber, oInputRANumber]
													}),
													new sap.ui.layout.form.FormElement({
													    fields: [oFlexButtons]
													}),
													new sap.ui.layout.form.FormElement({
													    fields: [oLabelNotes]
													})
		                                     ]
		                     }),
		                     new sap.ui.layout.form.FormContainer("idUnitsOffHireCRUOLFormC2",{
	                             formElements: []
		                     })
		             ]
		     });

		     var vHDivider = new sap.ui.commons.HorizontalDivider({width: "95%", type: "Area", height: "Medium"});

		  // Responsive Grid Layout
			    var oUnitsOffHireReportLayout = new sap.ui.layout.form.ResponsiveGridLayout("idUnitsOffHireReportCRUOLLayout",{
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
			     var oUnitsOffHireReportForm = new sap.ui.layout.form.Form("idUnitsOffHireReportCRUOLForm",{
			             layout: oUnitsOffHireReportLayout,
			             formContainers: [

			                     new sap.ui.layout.form.FormContainer({
		                             formElements: [
														new sap.ui.layout.form.FormElement("idShowUnitsOffHireReportCRUOL",{
														    fields: [],
														    layoutData: new sap.ui.layout.GridData({span: "L9 M9 S4",linebreak: true, margin: true})
														}),
														new sap.ui.layout.form.FormElement("idShowErrorRAsReportCRUOL",{
														    fields: [],
														    layoutData: new sap.ui.layout.GridData({span: "L9 M9 S4",linebreak: true, margin: true})
														})
			                                     ]
			                     }),
			             ]
			     });

			     var oFlexAll = new sap.m.FlexBox({
		           items: [
							oUnitsOffHireForm,
							vHDivider,
							oUnitsOffHireReportForm
		           ],
		           direction : "Column",
					});

		     	return oFlexAll;
	},

	resetOffHireCRUOH: function(){

        sap.ui.getCore().byId("idOffHireLocationCRUOH").clearSelectedValues();
        sap.ui.getCore().byId("idUnitDescrCRUOH").clearSelectedValues();
        sap.ui.getCore().byId("idRANumberCRUOH").setValue("");
        sap.ui.getCore().byId("idOffHireDateFromCRUOH").setValue("");
        sap.ui.getCore().byId("idOffHireDateToCRUOH").setValue("");

        /*document.getElementById("idComboCustomerCRUOH").style.borderColor = "#cccccc";
        document.getElementById("idComboCustomerCRUOH").style.background = "#ffffff";
        $("#idComboCustomerCRUOH").attr("placeholder","Select Customer");*/

		/*HSN_SEAWEB*/
        //$("#idComboCustomerCRUOH").val("");
		sap.ui.getCore().byId('idComboCustomerCRUOH').setSelectedKey("");
		sap.ui.getCore().byId('idComboCustomerCRUOH').setPlaceholder("Select Customer");
		//$("#idComboCustomerCRUOH").val("");
		//$("#idComboCustomerCRUOH").attr("placeholder","Select Customer");
		/*HSN_SEAWEB*/

        sap.ui.getCore().byId("idOffHireDateFromCRUOH").setValueState(sap.ui.core.ValueState.None);
        sap.ui.getCore().byId("idOffHireDateFromCRUOH").setPlaceholder("");
        sap.ui.getCore().byId("idOffHireDateToCRUOH").setValueState(sap.ui.core.ValueState.None);
        sap.ui.getCore().byId("idOffHireDateToCRUOH").setPlaceholder("");

        //MAC11122017_3+

      sap.ui.getCore().byId("idLeaseTypeCRUOH").setHolderPlaceHolder("");
  		sap.ui.getCore().byId("idLeaseTypeCRUOH").removeHolderReuqired();
  		sap.ui.getCore().byId("idLeaseTypeCRUOH").setHolderEnabled(false);
			sap.ui.getCore().byId("idLeaseTypeCRUOH").clearSelectedValues("");
			sap.ui.getCore().byId("idLeaseTypeCRUOH").setPlaceholder("Lease Type");

  		sap.ui.getCore().byId("idLeaseNumberCRUOH").setHolderPlaceHolder("");
  		sap.ui.getCore().byId("idLeaseNumberCRUOH").removeHolderReuqired();
  		sap.ui.getCore().byId("idLeaseNumberCRUOH").setHolderEnabled(false);
			sap.ui.getCore().byId("idLeaseNumberCRUOH").clearSelectedValues("");
			sap.ui.getCore().byId("idLeaseNumberCRUOH").setPlaceholder("Lease Number");

  		//MAC11122017_3+

        if(sap.ui.getCore().byId("idFlexUnitsOffHireReportCRUOH")){
			sap.ui.getCore().byId("idFlexUnitsOffHireReportCRUOH").destroy();
		}
		if(sap.ui.getCore().byId("idFlexErrorRAsReportCRUOH")){
			sap.ui.getCore().byId("idFlexErrorRAsReportCRUOH").destroy();
		}
	},

	validateUnitsOffHireCRUOH: function(){
		var isValid = true;

		//var customerID = document.getElementById("idComboCustomerCRUOH").value;
		var customerID = sap.ui.getCore().byId('idComboCustomerCRUOH').getSelectedKey();
		var offHireDateFrom = sap.ui.getCore().byId("idOffHireDateFromCRUOH").getValue();
		var offHireDateTo = sap.ui.getCore().byId("idOffHireDateToCRUOH").getValue();
		var leaseNo = sap.ui.getCore().byId('idLeaseNumberCRUOH').getSelectedValues(); //MAC11122017_3+

		if(offHireDateFrom == "" && offHireDateTo == "" && leaseNo.length == 0){
			//MAC11122017_3-
			//document.getElementById("idComboCustomerCRUOH").style.borderColor = "red";
    		//document.getElementById("idComboCustomerCRUOH").style.background = "#FAD4D4";
    		//$("#idComboCustomerCRUOH").attr("placeholder","Required");
    		//MAC11122017_3-

			//MAC11122017_3+
	  		sap.ui.getCore().byId("idLeaseNumberCRUOH").setHolderPlaceHolder("Required");
	  		sap.ui.getCore().byId("idLeaseNumberCRUOH").setHolderBorderReuqired();
	  		sap.ui.getCore().byId("idLeaseNumberCRUOH").setHolderEnabled(true);
	  		//MAC11122017_3+

			sap.ui.getCore().byId("idOffHireDateFromCRUOH").setValueState(sap.ui.core.ValueState.Error);
	  		sap.ui.getCore().byId("idOffHireDateFromCRUOH").setValue("");
	  		sap.ui.getCore().byId("idOffHireDateFromCRUOH").setPlaceholder("Required");

	  		sap.ui.getCore().byId("idOffHireDateToCRUOH").setValueState(sap.ui.core.ValueState.Error);
	  		sap.ui.getCore().byId("idOffHireDateToCRUOH").setValue("");
	  		sap.ui.getCore().byId("idOffHireDateToCRUOH").setPlaceholder("Required");

			isValid = false;
		}
		//MAC11122017_3-
		/*else if(customerID == ""){
			document.getElementById("idComboCustomerCRUOH").style.borderColor = "red";
    		document.getElementById("idComboCustomerCRUOH").style.background = "#FAD4D4";
    		$("#idComboCustomerCRUOH").attr("placeholder","Required");

    		sap.ui.getCore().byId("idOffHireDateFromCRUOH").setValueState(sap.ui.core.ValueState.None);
	  		sap.ui.getCore().byId("idOffHireDateToCRUOH").setValueState(sap.ui.core.ValueState.None);

    		isValid = false;
		}
		else if(offHireDateFrom == "" && offHireDateTo == ""){
			//document.getElementById("idComboCustomerCRUOH").style.borderColor = "cccccc";
    		//document.getElementById("idComboCustomerCRUOH").style.background = "#ffffff";
    		//$("#idComboCustomerCRUOH").attr("placeholder","Required");

    		sap.ui.getCore().byId("idOffHireDateFromCRUOH").setValueState(sap.ui.core.ValueState.Error);
	  		sap.ui.getCore().byId("idOffHireDateFromCRUOH").setValue("");
	  		sap.ui.getCore().byId("idOffHireDateFromCRUOH").setPlaceholder("Required");

	  		sap.ui.getCore().byId("idOffHireDateToCRUOH").setValueState(sap.ui.core.ValueState.Error);
	  		sap.ui.getCore().byId("idOffHireDateToCRUOH").setValue("");
	  		sap.ui.getCore().byId("idOffHireDateToCRUOH").setPlaceholder("Required");

			isValid = false;
		}*/
		//MAC11122017_3-
		else{
			sap.ui.getCore().byId("idOffHireDateFromCRUOH").setValueState(sap.ui.core.ValueState.None);
			sap.ui.getCore().byId("idOffHireDateFromCRUOH").setPlaceholder("");
			sap.ui.getCore().byId("idOffHireDateToCRUOH").setValueState(sap.ui.core.ValueState.None);
			sap.ui.getCore().byId("idOffHireDateToCRUOH").setPlaceholder("");

			//MAC11122017_3+
	  		sap.ui.getCore().byId("idLeaseNumberCRUOH").setHolderPlaceHolder("");
	  		sap.ui.getCore().byId("idLeaseNumberCRUOH").removeHolderReuqired();
	  		sap.ui.getCore().byId("idLeaseNumberCRUOH").setHolderEnabled(true);
	  		//MAC11122017_3+

			var splitdateFrom = offHireDateFrom.split("-");

			var splitdateTo = offHireDateTo.split("-");

			var oneDay = 24*60*60*1000;	// hours*minutes*seconds*milliseconds
			var todayDateFull = new Date();
			var todayDate = new Date(todayDateFull.getFullYear(),todayDateFull.getMonth()+1,todayDateFull.getDate());
			var selectedDateFrom = new Date(splitdateFrom[2],splitdateFrom[1],splitdateFrom[0]);
			var selectedDateTo = new Date(splitdateTo[2],splitdateTo[1],splitdateTo[0]);

			var dateDifferenceFrom = Math.abs((todayDate.getTime() - selectedDateFrom.getTime())/(oneDay));
			var dateDifferenceTo = Math.abs((todayDate.getTime() - selectedDateTo.getTime())/(oneDay));

			//alert("dateDifference : "+dateDifference);

			var objUtil = new utility();

			if(dateDifferenceFrom > 365){
					isValid = false;

					sap.ui.getCore().byId("idOffHireDateFromCRUOH").setValue("");
					sap.ui.getCore().byId("idOffHireDateToCRUOH").setValue("");

					if(sap.ui.getCore().byId("idFlexUnitsOffHireReportCRUOH")){
						sap.ui.getCore().byId("idFlexUnitsOffHireReportCRUOH").destroy();
					}
					if(sap.ui.getCore().byId("idFlexErrorRAsReportCRUOH")){
						sap.ui.getCore().byId("idFlexErrorRAsReportCRUOH").destroy();
					}

					sap.ui.commons.MessageBox.show("Unit Off-Hire report available only for the last 12 months. \n Please specify a From Date within the last 12 months and retry. \n To get Unit Off-Hire reports for older periods, \n please contact your local customer services team.",
	                        sap.ui.commons.MessageBox.Icon.WARNING,
	                        "Warning",
	                        [sap.ui.commons.MessageBox.Action.OK],
	                        sap.ui.commons.MessageBox.Action.OK);
			}
			else if(dateDifferenceTo > 365){
				isValid = false;

				sap.ui.getCore().byId("idOffHireDateFromCRUOH").setValue("");
				sap.ui.getCore().byId("idOffHireDateToCRUOH").setValue("");

				if(sap.ui.getCore().byId("idFlexUnitsOffHireReportCRUOH")){
					sap.ui.getCore().byId("idFlexUnitsOffHireReportCRUOH").destroy();
				}
				if(sap.ui.getCore().byId("idFlexErrorRAsReportCRUOH")){
					sap.ui.getCore().byId("idFlexErrorRAsReportCRUOH").destroy();
				}

				sap.ui.commons.MessageBox.show("Unit Off-Hire report available only for the last 12 months. \n Please specify a To Date within the last 12 months and retry. \n To get Unit Off-Hire reports for older periods, \n please contact your local customer services team.",
                        sap.ui.commons.MessageBox.Icon.WARNING,
                        "Warning",
                        [sap.ui.commons.MessageBox.Action.OK],
                        sap.ui.commons.MessageBox.Action.OK);
		}
			else if(objUtil.DateDifference(selectedDateTo, selectedDateFrom) < 0){
				sap.ui.getCore().byId("idOffHireDateFromCRUOH").setValueState(sap.ui.core.ValueState.Error);
		  		sap.ui.getCore().byId("idOffHireDateFromCRUOH").setValue("");
		  		sap.ui.getCore().byId("idOffHireDateFromCRUOH").setPlaceholder("Invalid");

		  		sap.ui.getCore().byId("idOffHireDateToCRUOH").setValueState(sap.ui.core.ValueState.Error);
		  		sap.ui.getCore().byId("idOffHireDateToCRUOH").setValue("");
		  		sap.ui.getCore().byId("idOffHireDateToCRUOH").setPlaceholder("Invalid");

		  		if(sap.ui.getCore().byId("idFlexUnitsOffHireReportCRUOH")){
					sap.ui.getCore().byId("idFlexUnitsOffHireReportCRUOH").destroy();
				}
				if(sap.ui.getCore().byId("idFlexErrorRAsReportCRUOH")){
					sap.ui.getCore().byId("idFlexErrorRAsReportCRUOH").destroy();
				}

		  		isValid = false;
			}
			else{
				isValid = true;
			}
		}
		return isValid;
	},

	getUnitsOffHireReportCRUOH: function(){
		busyDialog.open();

		var oCurrCRUOH = this;
		var offHireLocationString = "";
		var offHireLocationString1 = "";
		var unitDescriptionString = "";
		var raNumberString = "";
		var offHireDateFromVal = "";
		var offHireDateToVal = "";
		var offHireDateFrom = "";
		var offHireDateTo = "";

		if(sap.ui.getCore().byId("idFlexUnitsOffHireReportCRUOH")){
			sap.ui.getCore().byId("idFlexUnitsOffHireReportCRUOH").destroy();
		}
		if(sap.ui.getCore().byId("idFlexErrorRAsReportCRUOH")){
			sap.ui.getCore().byId("idFlexErrorRAsReportCRUOH").destroy();
		}

		var customerID = "";
		//if(loggedInUserTypeCRUOH == "SEACO"){
			//var customerIDSplit = document.getElementById("idComboCustomerCRUOH").value.split("-");
			//customerID = customerIDSplit[1].trim();
			var customerID = sap.ui.getCore().byId('idComboCustomerCRUOH').getSelectedKey();
		//}
		//else{
			//customerID = customerIDloggedInCRUOH;
		//}

		offHireDateFromVal = sap.ui.getCore().byId("idOffHireDateFromCRUOH").getValue();

		if(offHireDateFromVal != ""){
			/* FIORIOPT -
			var offHireDateFromSplit = offHireDateFromVal.split("-");
			offHireDateFrom = offHireDateFromSplit[2] + offHireDateFromSplit[1] + offHireDateFromSplit[0];
			offHireDateFrom = offHireDateFrom.trim();
			FIORIOPT - */
			// FIORIOPT +
			var valOffHireDateFrom = sap.ui.getCore().byId("idOffHireDateFromCRUOH").getYyyymmdd();
			offHireDateFrom = valOffHireDateFrom;
			//offHireDateFrom = valOffHireDateFrom.substr(0, 4)+'-'+valOffHireDateFrom.substr(4, 2)+'-'+valOffHireDateFrom.substr(6, 2)+'T00:00:00';
			// FIORIOPT +
		}

		offHireDateToVal = sap.ui.getCore().byId("idOffHireDateToCRUOH").getValue();

		if(offHireDateToVal != ""){
			/* FIORIOPT -
			var offHireDateToSplit = offHireDateToVal.split("-");
			offHireDateTo = offHireDateToSplit[2] + offHireDateToSplit[1] + offHireDateToSplit[0];
			offHireDateTo = offHireDateTo.trim();
			FIORIOPT - */
			// FIORIOPT +
			var valOffHireDateTo = sap.ui.getCore().byId("idOffHireDateToCRUOH").getYyyymmdd();
			offHireDateTo = valOffHireDateTo;
			//offHireDateTo = valOffHireDateTo.substr(0, 4)+'-'+valOffHireDateTo.substr(4, 2)+'-'+valOffHireDateTo.substr(6, 2)+'T00:00:00';
			// FIORIOPT +
		}

		var offHireLocation = sap.ui.getCore().byId("idOffHireLocationCRUOH").getSelectedValues();

		if(offHireLocation.length > 0){
			if(offHireLocation.length <= 13){
				for(var i=0; i<offHireLocation.length; i++){
					offHireLocationString += offHireLocation[i].description + "|";
				}
			}
			else{
				for(var i=0; i<12; i++){
					offHireLocationString += offHireLocation[i].description + "|";
				}
				for(var i=14; i<offHireLocation.length; i++){
					offHireLocationString1 += offHireLocationString1[i].description + "|";
				}
			}
			offHireLocationString = offHireLocationString.slice(0,-1);
			offHireLocationString1 = offHireLocationString1.slice(0,-1);
		}

		var unitDescription = sap.ui.getCore().byId("idUnitDescrCRUOH").getSelectedValues();

		if(unitDescription.length > 0){
			for(var i=0; i<unitDescription.length; i++){
				unitDescriptionString += unitDescription[i].code + "|";
			}

			unitDescriptionString = unitDescriptionString.slice(0,-1);
		}

		var arrRAnumber = sap.ui.getCore().byId("idRANumberCRUOH").getValue().split(/\n/g);

		if(arrRAnumber.length > 0){
			var arrRAnumberLen = arrRAnumber.length;
			var enteredRANumbers = [];

			for(var k=0 ; k<arrRAnumberLen ; k++){
	    		if(arrRAnumber[k].trim().length != 0){
	    			enteredRANumbers.push(arrRAnumber[k]);
	    		}
	    	}
			var oUtil = new utility();
			enteredRANumbers = oUtil.unique(enteredRANumbers);

			for(var i=0; i<enteredRANumbers.length; i++){
				raNumberString += enteredRANumbers[i] + "|";
			}

			raNumberString = raNumberString.slice(0,-1);
		}

		//MAC11122017_3+
		var arrleaseNo = sap.ui.getCore().byId('idLeaseNumberCRUOH').getSelectedValues();
		var arrleaseNoString = "";
		//arrleaseNo = $.grep(arrleaseNo,function(n){ return n != "";});
		for(var i=0; i<arrleaseNo.length; i++){
			arrleaseNoString += arrleaseNo[i].code + ",";
		}
		//MAC11122017_3+

		oModel = new sap.ui.model.odata.ODataModel(serviceUrl15, true);
		var urlToCallCRUOH = serviceUrl + "/Units_Offhire_CR?$filter=ICustomer eq '" + customerID
											+ "' and IFromOffhireDate eq '" + offHireDateFrom
											+ "' and IToOffhireDate eq '" + offHireDateTo
											+ "' and ICity eq '" + offHireLocationString
											+ "' and ICity1 eq '" + offHireLocationString1
											+ "' and IUnitType eq '" + unitDescriptionString
											+ "' and IRaNo eq '" + raNumberString
											+ "' and IExtra1 eq '" + arrleaseNoString + "' and IExtra2 eq ' '"; 	//MAC11122017_3+ included arrleaseNo

		//alert("urlToCallCRUOH : "+urlToCallCRUOH);
		OData.request({
		      requestUri: urlToCallCRUOH,
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
		    		sap.ui.commons.MessageBox.show("No Off-Hire Units found for the specified search criteria, \n please contact your local customer services for any queries.",
                            sap.ui.commons.MessageBox.Icon.WARNING,
                            "Warning",
                            [sap.ui.commons.MessageBox.Action.OK],
                            sap.ui.commons.MessageBox.Action.OK);
		    	}
		    	else{
		    		arrUnitsOffHireReport = [];
		    		arrErrorRAsReport = [];
		    		jsonCRUOHExportToExcel = [];
		    		arrUnitsOffHireReportTemp = [];

		    		arrUnitsOffHireReport =  jQuery.grep(data.results, function(element, index){
		                return (element.Flag == "");
		        	});

		    		for(var i=0; i<arrUnitsOffHireReport.length; i++){
		    			arrUnitsOffHireReportTemp.push(arrUnitsOffHireReport[i]);
		    			arrUnitsOffHireReportTemp[i].OffHireLocation = arrUnitsOffHireReport[i].OffHireLocation + ' - ' + arrUnitsOffHireReport[i].Extra2;
		    		}

		    		arrUnitsOffHireReport = [];
		    		arrUnitsOffHireReport = arrUnitsOffHireReportTemp.slice();

		    		arrErrorRAsReport =  jQuery.grep(data.results, function(element, index){
		                return (element.Flag == "X");
		        	});

		    		for(var i=0; i<arrUnitsOffHireReport.length; i++){
		    			arrUnitsOffHireReport[i].LeaseNumber = arrUnitsOffHireReport[i].LeaseNumber.replace(/^0+/, '');
		    			var vOffHireDateSplit = arrUnitsOffHireReport[i].OffHireDate.split("(");
					    var vOffHireDate = vOffHireDateSplit[1].split(")");
					    var vformattedOffHireDate = new Date(Number(vOffHireDate[0]));
					    var OffHireDate = dateFormat(new Date(Number(vOffHireDate[0])), 'dd-mm-yyyy', "UTC");
					    if(OffHireDate.substring(6) == "9999"){
					    	OffHireDate = "";
					    }
					    else{
					    	OffHireDate = OffHireDate;
					    }
					    arrUnitsOffHireReport[i]["OffHireDateActual"] = vformattedOffHireDate;
					    arrUnitsOffHireReport[i].OffHireDate = OffHireDate;
		    		}

		    		for(var i=0; i<arrUnitsOffHireReport.length; i++){
		    			jsonCRUOHExportToExcel.push({
		    				"Lease Type": arrUnitsOffHireReport[i].Extra1,
		    				"Lease Number": arrUnitsOffHireReport[i].LeaseNumber,
		    				"Unit Description": arrUnitsOffHireReport[i].UnitDesc,
		    				"Unit Number": arrUnitsOffHireReport[i].UnitNo,
		    				"Off-Hire Date": arrUnitsOffHireReport[i].OffHireDate,
		    				"Off-Hire Location": arrUnitsOffHireReport[i].OffHireLocation,// + ' - ' + arrUnitsOffHireReport[i].Extra2,
		    				"RA Number": arrUnitsOffHireReport[i].RaNo
		    			});
		    		}

		    		if(arrUnitsOffHireReport.length > 0){
			    		oCurrCRUOH.createUnitsOffHireReportTblCRUOH();
			    		oCurrCRUOH.updateUnitsOffHireReportCRUOH();

			    		if (arrUnitsOffHireReport.length <= 25){
				    		sap.ui.getCore().byId("idTblUnitsOffHireReportCRUOH").setVisibleRowCount(arrUnitsOffHireReport.length);
				    		sap.ui.getCore().byId("idTblUnitsOffHireReportCRUOH").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
				    		sap.ui.getCore().byId("idBtnViewAllCRUOH").setVisible(false);
				    	}
				    	else{
				    		sap.ui.getCore().byId("idTblUnitsOffHireReportCRUOH").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
				    		sap.ui.getCore().byId("idTblUnitsOffHireReportCRUOH").setVisibleRowCount(25);
				    		sap.ui.getCore().byId("idBtnViewAllCRUOH").setVisible(true);
				    	}
		    		}

		    		if(arrErrorRAsReport.length > 0){
		    			if(arrErrorRAsReport.length == 1 && data.results.length == 1){

		    				var RAMessage = "RA Number " + arrErrorRAsReport[i].RaNo + " : " + arrErrorRAsReport[i].Msg;

		    				sap.ui.commons.MessageBox.show(RAMessage,
		                            sap.ui.commons.MessageBox.Icon.WARNING,
		                            "Warning",
		                            [sap.ui.commons.MessageBox.Action.OK],
		                            sap.ui.commons.MessageBox.Action.OK);
		    			}
		    			else{
		    				oCurrCRUOH.createErrorRATableCRUOH();
				    		oCurrCRUOH.updateErrorRAsTableReportCRUOH();

				    		if (arrErrorRAsReport.length <= 25){
					    		sap.ui.getCore().byId("idTblErrorRAsCRUOH").setVisibleRowCount(arrErrorRAsReport.length);
					    		sap.ui.getCore().byId("idTblErrorRAsCRUOH").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
					    	}
					    	else{
					    		sap.ui.getCore().byId("idTblErrorRAsCRUOH").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
					    		sap.ui.getCore().byId("idTblErrorRAsCRUOH").setVisibleRowCount(25);
					    	}
		    			}
		    		}

		    		busyDialog.close();
		    	}
		    },
		    function(err){
		    	 busyDialog.close();
		    	 errorfromServer(err);
		    	//alert("Error while Reading Result : "+ window.JSON.stringify(err.response));
		    });
	},

	createUnitsOffHireReportTblCRUOH: function(){

		var oLabelTitle = new sap.ui.commons.Label({text: "Unit Off-Hire Details",
			layoutData: new sap.ui.layout.GridData({span: "L1 M1 S3",linebreak: false, margin: true}),
            wrapping: true}).addStyleClass("marginTop10 font15Bold");

		// Buttons
		var oBtnExport = new sap.m.Button({
            text : "Export To Excel",
            type:sap.m.ButtonType.Unstyled,
            //icon: sap.ui.core.IconPool.getIconURI("excel-attachment"),
            icon: sap.ui.core.IconPool.getIconURI("excel-attachment"),
            press:function(){
            	//alert("Export to excel");
            	var objUtil = new utility();
            	objUtil.makeHTMLTable(jsonCRUOHExportToExcel, "Unit Off-Hire Details","export");
            }
         }).addStyleClass("submitBtn");

		var oFlexTitle = new sap.m.FlexBox("idTitleCRUOH",{
            items: [
                    oLabelTitle
            ],
            width:"60%",
            direction:"Row"
		});

		var oFlexExpBtn = new sap.m.FlexBox("idExportToExcelCRUOH",{
            items: [
                    oBtnExport
            ],
            width:"40%",
            direction:"RowReverse"
		});

		var oFlexTitleExport = new sap.m.FlexBox("idTitleExportCRUOH",{
            items: [
					oFlexTitle,
					oFlexExpBtn
            ],
            width:"100%",
            direction:"Row"
		});

		var oBtnViewAll = new sap.m.Button("idBtnViewAllCRUOH",{
	        text : "View All",
	        styled:false,
	        width:"80px",
	        press:function(){
	        	this.setVisible(false);
	        	var vArrayLength = arrUnitsOffHireReport.length;
	        	if(vArrayLength < 100){
	        		sap.ui.getCore().byId("idTblUnitsOffHireReportCRUOH").setVisibleRowCount(vArrayLength);
	        		sap.ui.getCore().byId("idTblUnitsOffHireReportCRUOH").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
	        	}
	        	else{
	        		sap.ui.getCore().byId("idTblUnitsOffHireReportCRUOH").setVisibleRowCount(100);
	        		sap.ui.getCore().byId("idTblUnitsOffHireReportCRUOH").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
	        	}

	        }
	     }).addStyleClass("submitBtn marginTop10");

		// Table
    	var oTableUnitsOffHireReport = new sap.ui.table.Table("idTblUnitsOffHireReportCRUOH",{
            columnHeaderHeight: 30,
            firstVisibleRowCount: 5,
            selectionMode: sap.ui.table.SelectionMode.None,
            navigationMode: sap.ui.table.NavigationMode.Paginator,
            width:"100%",
            height:"100%"
    	 }).addStyleClass("fontStyle marginTop15 tblBorder");

    	// Table Columns
    	oTableUnitsOffHireReport.addColumn(new sap.ui.table.Column({
    		 label: new sap.ui.commons.Label({text: "Lease Type"}).addStyleClass("wraptextcol"),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "Extra1"),
    		 resizable:false,
    		 width:"120px",
             sortProperty: "Extra1",
             filterProperty: "Extra1",
  		 }));

    	oTableUnitsOffHireReport.addColumn(new sap.ui.table.Column({
      		 label: new sap.ui.commons.Label({text: "Lease"}).addStyleClass("wraptextcol"),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "LeaseNumber"),
    		 resizable:false,
    		 width:"70px",
             sortProperty: "LeaseNumber",
             filterProperty: "LeaseNumber",
    		 }));

    	oTableUnitsOffHireReport.addColumn(new sap.ui.table.Column({
     		 label: new sap.ui.commons.Label({text: "Unit Description"}).addStyleClass("wraptextcol"),
     		 template: new sap.ui.commons.TextView().bindProperty("text", "UnitDesc"),
   		 	 resizable:false,
   		 	 width:"220px",
             sortProperty: "UnitDesc",
             filterProperty: "UnitDesc",
   		 }));

    	oTableUnitsOffHireReport.addColumn(new sap.ui.table.Column({
    		 label: new sap.ui.commons.Label({text: "Unit Number"}).addStyleClass("wraptextcol"),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "UnitNo"),
  		 	 resizable:false,
  		 	 width:"120px",
             sortProperty: "UnitNo",
             filterProperty: "UnitNo",
  		 }));

    	oTableUnitsOffHireReport.addColumn(new sap.ui.table.Column({
     		 label: new sap.ui.commons.Label({text: "Off-Hire Date"}).addStyleClass("wraptextcol"),
	   		 template: new sap.ui.commons.TextView().bindProperty("text", "OffHireDate"),
	   		 resizable:false,
	   		 width:"120px",
             sortProperty: "OffHireDateActual",
             filterProperty: "OffHireDate",
   		 }));

    	oTableUnitsOffHireReport.addColumn(new sap.ui.table.Column({
     		 label: new sap.ui.commons.Label({text: "Off-Hire Location"}).addStyleClass("wraptextcol"),
	   		 template: new sap.ui.commons.TextView().bindProperty("text", "OffHireLocation"),
	   		 resizable:false,
	   		 width:"220px",
             sortProperty: "OffHireLocation",
             filterProperty: "OffHireLocation",
   		 }));

    	oTableUnitsOffHireReport.addColumn(new sap.ui.table.Column({
     		 label: new sap.ui.commons.Label({text: "RA Number"}).addStyleClass("wraptextcol"),
	   		 template: new sap.ui.commons.TextView().bindProperty("text", "RaNo"),
	   		 resizable:false,
	   		 width:"120px",
             sortProperty: "RaNo",
             filterProperty: "RaNo",
   		 }));

    	var oFlexBoxAll = new sap.m.FlexBox("idFlexUnitsOffHireReportCRUOH",{
  		  items: [
  		          	oFlexTitleExport,
  		          	oTableUnitsOffHireReport,
  					oBtnViewAll
  	  		  ],
  	  		direction: "Column",
  	  		width:"100%"
  	  		});
	},

	updateUnitsOffHireReportCRUOH: function(){
		oModelUnitsOffHireReportCRUOH = new sap.ui.model.json.JSONModel();
		oModelUnitsOffHireReportCRUOH.setData({modelData: arrUnitsOffHireReport});
    	sap.ui.getCore().byId("idTblUnitsOffHireReportCRUOH").setModel(oModelUnitsOffHireReportCRUOH);
    	sap.ui.getCore().byId("idTblUnitsOffHireReportCRUOH").bindRows("/modelData");

    	//sap.ui.getCore().byId("idTblUnitsOffHireReportCRUOH").setVisibleRowCount(arrUnitsOffHireReport.length);

    	sap.ui.getCore().byId("idShowUnitsOffHireReportCRUOL").insertField(sap.ui.getCore().byId("idFlexUnitsOffHireReportCRUOH"));
	},

	createErrorRATableCRUOH: function(){

		var oLabelTitle = new sap.ui.commons.Label({text: "Error RAs",
			layoutData: new sap.ui.layout.GridData({span: "L1 M1 S3",linebreak: false, margin: true}),
            wrapping: true}).addStyleClass("marginTop10 font15Bold");

		// Table
    	var oTableErrorRAs = new sap.ui.table.Table("idTblErrorRAsCRUOH",{
            columnHeaderHeight: 30,
            //firstVisibleRowCount: 5,
            selectionMode: sap.ui.table.SelectionMode.None,
            //navigationMode: sap.ui.table.NavigationMode.Paginator,
            width:"100%",
            height:"100%"
    	 }).addStyleClass("fontStyle marginTop15 tblBorder");

    	// Table Columns
    	oTableErrorRAs.addColumn(new sap.ui.table.Column({
    		 label: new sap.ui.commons.Label({text: "RA Number"}),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "RaNo"),
    		 resizable:false,
    		 width:"100px",
             sortProperty: "RaNo",
             filterProperty: "RaNo",
  		 }));

    	oTableErrorRAs.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Error Message"}),
	   		 template: new sap.ui.commons.TextView().bindProperty("text", "Msg"),
	   		 resizable:false,
	   		 width:"200px",
             sortProperty: "Msg",
             filterProperty: "Msg",
 		 }));

    	var oFlexBoxAll = new sap.m.FlexBox("idFlexErrorRAsReportCRUOH",{
    		  items: [
    		          	oLabelTitle,
    		          	oTableErrorRAs
    	  		  ],
    	  		direction: "Column",
    	  		width:"50%"
    	  		}).addStyleClass("marginTop20");
	},

	updateErrorRAsTableReportCRUOH: function(){
		oModelErrorRAsReportCRUOH = new sap.ui.model.json.JSONModel();
		oModelErrorRAsReportCRUOH.setData({modelData: arrErrorRAsReport});
    	sap.ui.getCore().byId("idTblErrorRAsCRUOH").setModel(oModelErrorRAsReportCRUOH);
    	sap.ui.getCore().byId("idTblErrorRAsCRUOH").bindRows("/modelData");

    	sap.ui.getCore().byId("idTblErrorRAsCRUOH").setVisibleRowCount(arrErrorRAsReport.length);

    	sap.ui.getCore().byId("idShowErrorRAsReportCRUOL").insertField(sap.ui.getCore().byId("idFlexErrorRAsReportCRUOH"));
	},

});

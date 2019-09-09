/*
 *

Information: This file is created by Seyed Ismail MAC on 26.09.2014
*$*$------------------------------------------------------------------------*
*$*$ Modified By : Seyed Ismail MAC
*$*$ Modified On : 26.09.2014
*$*$ Reference   : P1 CR#11
*$*$ Transport   :
*$*$ Tag         : MAC26092014
*$*$ Purpose     : Get Support Page
*$*$---------------------------------------------------------------------
**/

	// Global Variables for this page

	// Seaco Contact Location
	var seacoLocationVal = {
			key : [],
			description : []
			};

	// Seaco Contact Email
	var seacoEmailVal = {
			key : [],
			description : []
			};

	var oCurrent;

sap.ui.model.json.JSONModel.extend("getSupportNewUser", {

	// Create the initial page
	createInitialPage: function(){
		oCurrent = this;
		jQuery.sap.require("sap.ui.commons.MessageBox");	// message box library

		// ************* Drop Down Box Starts ************* //

		// Label for User Type

		var oLabelUserType = new sap.ui.commons.Label({text: "User Type",wrapping: false, required:true,
		  layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: false})
		}).addStyleClass("marginTop15");

		// Initializing Drop Down Box

		var oComboUserType = new sap.ui.commons.DropdownBox("idComboUserType", {
      	  layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: false}),
      	  change:function(oEvent){
				  this.setValueState(sap.ui.core.ValueState.None);
				  this.setPlaceholder("Select User Type");
				  var oComboLocation = sap.ui.getCore().byId("idComboLocation");
				  oComboLocation.destroyItems();
				  var selUserType = oEvent.mParameters.selectedItem.sId;
				  if(oEvent.mParameters.newValue != "")
				  oCurrent.refineSeacoContactLocation(selUserType);

				  // Clear values...

				  var oTxtFName = sap.ui.getCore().byId("idTxtFName");
				  var oTxtLName = sap.ui.getCore().byId("idTxtLName");
				  var oTxtEMail = sap.ui.getCore().byId("idTxtEMail");
				  var oTxtCMail = sap.ui.getCore().byId("idTxtCMail");
				  var oTxtCName = sap.ui.getCore().byId("idTxtCName");
				  var oTxtFCode = sap.ui.getCore().byId("idTxtFCode");
				  var oTxtAdd1 = sap.ui.getCore().byId("idTxtAdd1");
				  var oTxtAdd2 = sap.ui.getCore().byId("idTxtAdd2");
				  var oTxtAdd3 = sap.ui.getCore().byId("idTxtAdd3");
				  var oTxtCity = sap.ui.getCore().byId("idTxtCity");
				  var oTxtCountry = sap.ui.getCore().byId("idTxtCountry");
					var oTxtPhone = sap.ui.getCore().byId("idTxtPhone");
				  var oTxtPCode = sap.ui.getCore().byId("idTxtPCode");

				  oTxtFName.setValue("");
				  oTxtLName.setValue("");
				  oTxtEMail.setValue("");
				  oTxtCMail.setValue("");
				  oTxtCName.setValue("");
				  oTxtFCode.setValue("");
				  oTxtAdd1.setValue("");
				  oTxtAdd2.setValue("");
				  oTxtAdd3.setValue("");
				  oTxtCity.setValue("");
				  oTxtCountry.setValue("");
					oTxtPhone.setValue("");
				  oTxtPCode.setValue("");

				  sap.ui.getCore().byId("idComboUserType").removeStyleClass("redBackgrond redBorder");
				  oTxtFName.removeStyleClass("redBackgrond redBorder");
					oTxtLName.removeStyleClass("redBackgrond redBorder");
					oTxtEMail.removeStyleClass("redBackgrond redBorder");
					oTxtCMail.removeStyleClass("redBackgrond redBorder");
					oTxtCName.removeStyleClass("redBackgrond redBorder");
					oTxtFCode.removeStyleClass("redBackgrond redBorder");
					oTxtAdd1.removeStyleClass("redBackgrond redBorder");
					oTxtAdd2.removeStyleClass("redBackgrond redBorder");
					oTxtAdd3.removeStyleClass("redBackgrond redBorder");
					oTxtCity.removeStyleClass("redBackgrond redBorder");
					oTxtCountry.removeStyleClass("redBackgrond redBorder");
					oTxtPhone.removeStyleClass("redBackgrond redBorder");
					oTxtPCode.removeStyleClass("redBackgrond redBorder");
					oComboLocation.removeStyleClass("redBackgrond redBorder");
					if(oComboSMail){
						oComboSMail.removeStyleClass("redBackgrond redBorder");
					}

					oTxtFName.setPlaceholder("First Name");
					oTxtLName.setPlaceholder("Last Name");
					oTxtEMail.setPlaceholder("E-Mail");
					oTxtCMail.setPlaceholder("Confirm E-Mail");
					oTxtFCode.setPlaceholder("Factory Code");
					oTxtAdd1.setPlaceholder("Address 1");
					oTxtAdd2.setPlaceholder("Address 2");
					oTxtAdd3.setPlaceholder("Address 3");
					oTxtCity.setPlaceholder("City");
					oTxtCountry.setPlaceholder("Country");
					oTxtPhone.setPlaceholder("Phone");
					oTxtPCode.setPlaceholder("Postal Code");
					oComboLocation.setPlaceholder("Seaco Contact Location");
					if(oComboSMail){
						oComboSMail.setPlaceholder("Seaco Contact E-Mail");
					}

				  var oComboSMail = sap.ui.getCore().byId("idComboSMail");
				  oComboSMail.destroyItems();
				  var oLabelCName = sap.ui.getCore().byId("idLabelCName");
				  var oTxtCName = sap.ui.getCore().byId("idTxtCName");
				  var oLabelFCode = sap.ui.getCore().byId("idLabelFCode");
				  var oTxtFCode = sap.ui.getCore().byId("idTxtFCode");
				  var oHDivider1 = sap.ui.getCore().byId("idHDivider1");
				  var oHDivider = sap.ui.getCore().byId("idHDivider");
				  var oGetSupportForm = sap.ui.getCore().byId("idGetSupportForm");
				  var oGetSupportButton = sap.ui.getCore().byId("idGetSupportButton");

				  if(oEvent.mParameters.selectedItem.sId == "CUS"){
					  oLabelCName.setText("Company Name");
					  oTxtCName.setPlaceholder("Company Name");
					  oHDivider1.setVisible(true);
					  oHDivider.setVisible(true);
					  oGetSupportForm.setVisible(true);
					  oGetSupportButton.setVisible(true);
					  oLabelFCode.setVisible(false);
					  oTxtFCode.setVisible(false);
					  oLabelLocation.setVisible(true);
					  oLabelSMail.setVisible(true);
					  oComboLocation.setVisible(true);
					  oComboSMail.setVisible(true);
					  oComboLocation.setRequired(true);
				  }
				  else if(oEvent.mParameters.selectedItem.sId == "DEP"){

					  oLabelCName.setText("Depot Name");
					  oTxtCName.setPlaceholder("Depot Name");
					  oHDivider1.setVisible(true);
					  oHDivider.setVisible(true);
					  oGetSupportForm.setVisible(true);
					  oGetSupportButton.setVisible(true);
					  oLabelFCode.setVisible(false);
					  oTxtFCode.setVisible(false);
					  oLabelLocation.setVisible(true);
					  oLabelSMail.setVisible(false);
					  oComboLocation.setVisible(true);
					  oComboSMail.setVisible(false);
					  oComboLocation.setRequired(false);
				  }
				  else if(oEvent.mParameters.selectedItem.sId == "FAC"){

					  oTxtFCode.setVisible(true);
					  oLabelFCode.setVisible(true);
					  oLabelCName.setText("Factory Name");
					  oTxtCName.setPlaceholder("Factory Name");
					  oHDivider1.setVisible(true);
					  oHDivider.setVisible(true);
					  oGetSupportForm.setVisible(true);
					  oGetSupportButton.setVisible(true);
					  oLabelLocation.setVisible(false);
					  oLabelSMail.setVisible(false);
					  oComboLocation.setVisible(false);
					  oComboSMail.setVisible(false);
					  oComboLocation.setRequired(false);
				  }
				  else if(oEvent.mParameters.selectedItem.sId == "BUY"){
					  oLabelCName.setText("Company Name");
					  oTxtCName.setPlaceholder("Company Name");
					  oHDivider1.setVisible(true);
					  oHDivider.setVisible(true);
					  oGetSupportForm.setVisible(true);
					  oGetSupportButton.setVisible(true);
					  oLabelFCode.setVisible(false);
					  oTxtFCode.setVisible(false);
					  oLabelLocation.setVisible(true);
					  oLabelSMail.setVisible(true);
					  oComboLocation.setVisible(true);
					  oComboSMail.setVisible(true);
					  oComboLocation.setRequired(true);
				  }
				  else if(oEvent.mParameters.selectedItem.sId == "SUR"){
					  oLabelCName.setText("Company Name");
					  oTxtCName.setPlaceholder("Company Name");
					  oHDivider1.setVisible(true);
					  oHDivider.setVisible(true);
					  oGetSupportForm.setVisible(true);
					  oGetSupportButton.setVisible(true);
					  oLabelFCode.setVisible(false);
					  oTxtFCode.setVisible(false);
					  oLabelLocation.setVisible(false);
					  oLabelSMail.setVisible(false);
					  oComboLocation.setVisible(false);
					  oComboSMail.setVisible(false);
					  oComboLocation.setRequired(false);
				  }

			  },
      displaySecondaryValues:false,
      placeholder: "Select User Type"}).addStyleClass("FormInputStyle marginTop10 DepotInput38px");

		var userTypeVal = {
		key : [],
		description : []
		};

		userTypeVal.key[0] = "";
		userTypeVal.key[1] = "BUY";
		userTypeVal.key[2] = "CUS";
		userTypeVal.key[3] = "DEP";
		userTypeVal.key[4] = "FAC";
		userTypeVal.key[5] = "SUR";
		userTypeVal.description[0] = "";
		userTypeVal.description[1] = "Buyer";
		userTypeVal.description[2] = "Customer";
		userTypeVal.description[3] = "Depot User";
		userTypeVal.description[4] = "Factory User";
		userTypeVal.description[5] = "Surveyor";


		for (var i=0; i < userTypeVal.key.length; i++) {
            var oItem = new sap.ui.core.ListItem(userTypeVal.key[i]);
            oItem.setText(userTypeVal.description[i]);
            oComboUserType.addItem(oItem);
        }

		// ************* Drop Down Box Ends ************* //

		// Horizontal Line
		var vHDivider = new sap.ui.commons.HorizontalDivider({id:"idHDivider",width: "95%", type: "Area", height: "Medium", visible: false});
		var vHDivider1 = new sap.ui.commons.HorizontalDivider({id:"idHDivider1",width: "95%", type: "Area", height: "Medium", visible: false});

		// ************* Form Starts ************* //

		// Label for First Name

		var oLabelFName = new sap.ui.commons.Label({text: "First Name",wrapping: true, required:true,
			  layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: false})}).addStyleClass("marginTop15");

		// Text Field for First Name

		var oTxtFName = new sap.ui.commons.TextField("idTxtFName",{
	    	placeholder:"First Name",
			liveChange:function(){
				this.setValueState(sap.ui.core.ValueState.None);
			},
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4"}),linebreak: false, margin: false
	    }).addStyleClass("FormInputStyle marginTop10 DepotInput38px");

		// Label for Last Name

				var oLabelLName = new sap.ui.commons.Label({text: "Last Name",wrapping: true, required:true,
					  layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: false})}).addStyleClass("marginTop15");

		// Text Field for Last Name

		var oTxtLName = new sap.ui.commons.TextField("idTxtLName",{
	    	placeholder:"Last Name",
			liveChange:function(){
				this.setValueState(sap.ui.core.ValueState.None);
			},
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4"}),linebreak: false, margin: false
	    }).addStyleClass("FormInputStyle marginTop10 DepotInput38px");

		// Label for E-Mail

				var oLabelEMail = new sap.ui.commons.Label({text: "Email",wrapping: true, required:true,
					  layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: false})}).addStyleClass("marginTop15");

		// Text field for E-Mail

				var oTxtEMail = new sap.ui.commons.TextField("idTxtEMail",{
			    	placeholder:"E-Mail",
					liveChange:function(){
						this.setValueState(sap.ui.core.ValueState.None);
					},
					layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4"}),linebreak: false, margin: false
			    }).addStyleClass("FormInputStyle marginTop10 DepotInput38px");

		// Label for Confirm E-Mail

				var oLabelCMail = new sap.ui.commons.Label({text: "Confirm Email",wrapping: true, required:true,
					  layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: false})}).addStyleClass("marginTop15");

		// Text field for Confirm E-Mail

				var oTxtCMail = new sap.ui.commons.TextField("idTxtCMail",{
			    	placeholder:"Confirm E-Mail",
					liveChange:function(){
						this.setValueState(sap.ui.core.ValueState.None);
					},
					layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4"}),linebreak: false, margin: false
			    }).addStyleClass("FormInputStyle marginTop10 DepotInput38px");

		// Label for Company Name

				var oLabelCName = new sap.ui.commons.Label({id: "idLabelCName", text: "Company Name",wrapping: true, required:true,
					  layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: false})}).addStyleClass("marginTop15");

		// Text field for Company Name

				var oTxtCName = new sap.ui.commons.TextField("idTxtCName",{
			    	placeholder:"Company Name",
					liveChange:function(){
						this.setValueState(sap.ui.core.ValueState.None);
					},
					layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4"}),linebreak: false, margin: false
			    }).addStyleClass("FormInputStyle marginTop10 DepotInput38px");

		// Label for Factory Code

				var oLabelFCode = new sap.ui.commons.Label({id: "idLabelFCode", text: "Factory Code",wrapping: true, required:true,
					  layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: false})}).addStyleClass("marginTop15");

		// Text field for Factory Code

				var oTxtFCode = new sap.ui.commons.TextField("idTxtFCode",{
			    	placeholder:"Factory Code",
					liveChange:function(){
						this.setValueState(sap.ui.core.ValueState.None);
					},
					layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4"}),linebreak: false, margin: false
			    }).addStyleClass("FormInputStyle marginTop10 DepotInput38px");

		// Label for Address1

				var oLabelAdd1 = new sap.ui.commons.Label({text: "Address 1",wrapping: true, required:true,
					  layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: false})}).addStyleClass("marginTop15");

		// Text field for Address1

				var oTxtAdd1 = new sap.ui.commons.TextField("idTxtAdd1",{
			    	placeholder:"Address 1",
					liveChange:function(){
						this.setValueState(sap.ui.core.ValueState.None);
					},
					layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4"}),linebreak: false, margin: false
			    }).addStyleClass("FormInputStyle marginTop10 DepotInput38px");

		// Label for Address 2

				var oLabelAdd2 = new sap.ui.commons.Label({text: "Address 2",wrapping: true, required:false,
					  layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: false})}).addStyleClass("marginTop15");

		// Text field for Address2

				var oTxtAdd2 = new sap.ui.commons.TextField("idTxtAdd2",{
			    	placeholder:"Address 2",
					liveChange:function(){
						this.setValueState(sap.ui.core.ValueState.None);
					},
					layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4"}),linebreak: false, margin: false
			    }).addStyleClass("FormInputStyle marginTop10 DepotInput38px");

		// Label for Address 3

				var oLabelAdd3 = new sap.ui.commons.Label({text: "Address 3",wrapping: true, required:false,
					  layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: false})}).addStyleClass("marginTop15");

		// Text field for Address1

				var oTxtAdd3 = new sap.ui.commons.TextField("idTxtAdd3",{
			    	placeholder:"Address 3",
					liveChange:function(){
						this.setValueState(sap.ui.core.ValueState.None);
					},
					layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4"}),linebreak: false, margin: false
			    }).addStyleClass("FormInputStyle marginTop10 DepotInput38px");

		// Label for City

				var oLabelCity = new sap.ui.commons.Label({text: "City",wrapping: true, required:true,
					  layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: false})}).addStyleClass("marginTop15");

		// Text field for City

				var oTxtCity = new sap.ui.commons.TextField("idTxtCity",{
			    	placeholder:"City",
					liveChange:function(){
						this.setValueState(sap.ui.core.ValueState.None);
					},
					layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4"}),linebreak: false, margin: false
			    }).addStyleClass("FormInputStyle marginTop10 DepotInput38px");

		// Label for Country

				var oLabelCountry = new sap.ui.commons.Label({text: "Country",wrapping: true, required:true,
					  layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: false})}).addStyleClass("marginTop15");

		// Text field for Country

				var oTxtCountry = new sap.ui.commons.TextField("idTxtCountry",{
			    	placeholder:"Country",
					liveChange:function(){
						this.setValueState(sap.ui.core.ValueState.None);
					},
					layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4"}),linebreak: false, margin: false
			    }).addStyleClass("FormInputStyle marginTop10 DepotInput38px");

		// Label for Postal Code

				var oLabelPCode = new sap.ui.commons.Label({text: "Postal Code",wrapping: true, required:false,
					  layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: false})}).addStyleClass("marginTop15");

		// Text field for Postal Code

				var oTxtPCode = new sap.ui.commons.TextField("idTxtPCode",{
			    	placeholder:"Postal Code",
					liveChange:function(){
						this.setValueState(sap.ui.core.ValueState.None);
					},
					layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4"}),linebreak: false, margin: false
			    }).addStyleClass("FormInputStyle marginTop10 DepotInput38px");

	// Label for Phone

			var oLabelPhone = new sap.ui.commons.Label({text: "Phone No.",wrapping: true, required:true,
					layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: false})}).addStyleClass("marginTop15");

	// Text field for Phone Number

			var oTxtPhone = new sap.ui.commons.TextField("idTxtPhone",{
					placeholder:"Phone No.",
				liveChange:function(){
					this.setValueState(sap.ui.core.ValueState.None);
				},
				layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4"}),linebreak: false, margin: false
				}).addStyleClass("FormInputStyle marginTop10 DepotInput38px");

		// Label for Seaco Contact Location

				var oLabelLocation = new sap.ui.commons.Label({text: "Seaco Contact Location",wrapping: true, required:true,
					  layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: false})}).addStyleClass("marginTop15");

		// Drop Down Box for Seaco Contact Location

				var oComboLocation = new sap.ui.commons.DropdownBox("idComboLocation", {
			      	  layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: false}),
			      	  change:function(oEvent){
							  this.setValueState(sap.ui.core.ValueState.None);
							  this.setPlaceholder("Seaco Contact Location");
							  this.removeStyleClass("redBackgrond redBorder");
							  var oLabelSMail = sap.ui.getCore().byId("idLabelSMail");
							  var oComboSMail = sap.ui.getCore().byId("idComboSMail");
							  oComboSMail.destroyItems();
							  var selLocation = oEvent.mParameters.selectedItem.sId;
							  var selUserType = sap.ui.getCore().byId("idComboUserType").mProperties.selectedItemId;
							  oCurrent.refineSeacoContactEmail(selUserType, selLocation, oLabelSMail, oComboSMail);
						  },
			      displaySecondaryValues:false,
			      placeholder: "Seaco Contact Location"}).addStyleClass("FormInputStyle marginTop10 DepotInput38px" );

		// Label for Seaco Email

				var oLabelSMail = new sap.ui.commons.Label("idLabelSMail", {text: "Seaco Contact E-Mail",wrapping: true, required:true, visible:false,
					  layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: false})}).addStyleClass("marginTop15");

		// Drop Down Box for Seaco Contact Email

				var oComboSMail = new sap.ui.commons.DropdownBox("idComboSMail", {
			      	  layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: false}),
			      	  visible: false,
			      	  change:function(){
							  this.setValueState(sap.ui.core.ValueState.None);
							  this.setPlaceholder("Seaco Contact E-Mail");
						  },
			      displaySecondaryValues:false,
			      placeholder: "Seaco Contact E-Mail"}).addStyleClass("FormInputStyle marginTop10 DepotInput38px");

		// ************* Form Ends ************* //

				var oLabelMandatory = new sap.ui.commons.Label({text: "Mandatory Field",
					required: true,
					requiredAtBegin : true,
		            wrapping: true}).addStyleClass("marginTop10");

		// ************* Buttons Start*************** //
		// Submit

		    var oBtnSubmit = new sap.m.Button("idBtnSubmit",{
		          text : "Submit",			// Changes from Add To Returns to submit MAC26092014+
		          styled:false,
		          width:"120px",
		          layoutData: new sap.ui.layout.GridData({span: "L3 M3 S3",linebreak: false, margin: true}),
		          press:function(){
		          busyDialog.open();
		          oCurrent.submitForm();
		          busyDialog.close();
		          }}).addStyleClass("submitBtn");
	   // Space legend

		    var oLabelSpace = new sap.ui.commons.Label( {text: " ",width : '8px'});

	   // Reset

		    var oBtnReset = new sap.m.Button("idBtnReset",{
		          text : "Reset",			// Changes from Add To Returns to submit MAC26092014+
		          styled:false,
		          width:"120px",
		          layoutData: new sap.ui.layout.GridData({span: "L3 M3 S3",linebreak: false, margin: true}),
		          press:function(){
		        	 oCurrent.resetForm();
		          }}).addStyleClass("submitBtn");

		// Flex Box for Buttons

			var oFlexButtons = new sap.m.FlexBox({ items: [ oBtnSubmit, oLabelSpace, oBtnReset ],
		    direction: "Row",
		    //justifyContent : sap.m.FlexJustifyContent.Center
		    //layoutData: new sap.ui.layout.GridData({span: "L8 M8 S4",linebreak: false, margin: false})
		    });

		// Layout for buttons

			var oGetSupportButtonLayout = new sap.ui.layout.form.ResponsiveGridLayout({
				id : "idGetSupportButtonLayout", // sap.ui.core.ID
				labelSpanL : 4, // int, since 1.16.3
				labelSpanM : 2, // int, since 1.16.3
				labelSpanS : 12, // int, since 1.16.3
				emptySpanL : 0, // int, since 1.16.3
				emptySpanM : 0, // int, since 1.16.3
				emptySpanS : 0, // int, since 1.16.3
				columnsL : 1, // int, since 1.16.3
				columnsM : 1, // int, since 1.16.3
				//breakpointL : 1024, // int, since 1.16.3
				//breakpointM : 600, // int, since 1.16.3
				//ooltip : "User Type", // sap.ui.core.TooltipBase
			});

			var oGetSupportButton = new sap.ui.layout.form.Form("idGetSupportButton",{
	             layout: oGetSupportButtonLayout,
	             visible: false,
	             formContainers: [
	                     new sap.ui.layout.form.FormContainer("idGetSupportButtonC1",{
	                             //title: "User Type",
	                             formElements: [
												new sap.ui.layout.form.FormElement({
													//fields: [oFlexBoxRegion]
												    fields: [ oFlexButtons  ],
												}),
												new sap.ui.layout.form.FormElement({
													//fields: [oFlexBoxRegion]
												    fields: [ oLabelMandatory  ],
												})
	                                     ]
	                     })]
	     });

		// ************* Buttons End ********** //

		// Responsive Grid Layout

				var oGetSupportUserTypeLayout = new sap.ui.layout.form.ResponsiveGridLayout({
					id : "idGetSupportUserTypeLayout", // sap.ui.core.ID
					labelSpanL : 4, // int, since 1.16.3
					labelSpanM : 2, // int, since 1.16.3
					labelSpanS : 12, // int, since 1.16.3
					emptySpanL : 0, // int, since 1.16.3
					emptySpanM : 0, // int, since 1.16.3
					emptySpanS : 0, // int, since 1.16.3
					columnsL : 1, // int, since 1.16.3
					columnsM : 1, // int, since 1.16.3
					//breakpointL : 1024, // int, since 1.16.3
					//breakpointM : 600, // int, since 1.16.3
					tooltip : "User Type", // sap.ui.core.TooltipBase
				});

				var oGetSupportUserType = new sap.ui.layout.form.Form("idGetSupportUserType",{
		             layout: oGetSupportUserTypeLayout,
		             formContainers: [
		                     new sap.ui.layout.form.FormContainer("idGetSupportUserTypeC1",{
		                             title: "User Type",
		                             formElements: [
													new sap.ui.layout.form.FormElement({
														//fields: [oFlexBoxRegion]
													    fields: [  oLabelUserType, oComboUserType ],
													}),
		                                     ]
		                     })]
		     });

	    var oGetSupportFormLayout = new sap.ui.layout.form.ResponsiveGridLayout("idGetSupportFormLayout",{
	    	/* labelSpanL: 3,
	          labelSpanM: 3,
	          labelSpanS: 6,
	          emptySpanL: 0,
	          emptySpanM: 0,
	          emptySpanS: 0,
	          columnsL: 2,
	          columnsM: 2,
	          columnsS: 1,
	          breakpointL: 1100,
			  breakpointM: 700*/
	    });

		// Online Form Starts
	     var oGetSupportForm = new sap.ui.layout.form.Form("idGetSupportForm",{
	             layout: oGetSupportFormLayout,
	             visible: false,
	             formContainers: [
	                     new sap.ui.layout.form.FormContainer("idGetSupportFormC1",{
	                             title: "User Request Form",
	                             formElements: [
												new sap.ui.layout.form.FormElement({
													//fields: [oFlexBoxRegion]
												    fields: [oLabelFName, oTxtFName]
												}),
												new sap.ui.layout.form.FormElement({
													fields: [oLabelLName, oTxtLName]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oLabelEMail, oTxtEMail]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oLabelCMail, oTxtCMail]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oLabelCName, oTxtCName]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oLabelFCode, oTxtFCode]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oLabelAdd1, oTxtAdd1]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oLabelAdd2, oTxtAdd2]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oLabelAdd3, oTxtAdd3]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oLabelCity, oTxtCity]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oLabelCountry, oTxtCountry]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oLabelPhone, oTxtPhone]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oLabelPCode, oTxtPCode]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oLabelLocation, oComboLocation]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oLabelSMail, oComboSMail]
												})
	                                     ]
	                     })]
	     });

		var oFlexAll = new sap.m.FlexBox({ items: [ oGetSupportUserType, vHDivider, oGetSupportForm,
		                                            vHDivider1, oGetSupportButton],
	    direction: "Column",
	    justifyContent : sap.m.FlexJustifyContent.Center
	    //layoutData: new sap.ui.layout.GridData({span: "L8 M8 S4",linebreak: false, margin: false})
	    });

	return oFlexAll;
},

// Refine Seaco Contact Location
refineSeacoContactLocation: function(userType){
	if(userType == "CUS"){

	// Set Up Seaco Contact Location values

	seacoLocationVal.key = [];
	seacoLocationVal.description = [];
	seacoLocationVal.key[0] = "";
	seacoLocationVal.key[1] = "CSAME";
	seacoLocationVal.key[2] = "CSAPA";
	seacoLocationVal.key[3] = "CSEUR";
	seacoLocationVal.key[4] = "CSISC";
	seacoLocationVal.key[5] = "CSOCE";
	seacoLocationVal.description[0] = "";
	seacoLocationVal.description[1] = "Customer Service Americas";
	seacoLocationVal.description[2] = "Customer Service Asia";
	seacoLocationVal.description[3] = "Customer Service Europe";
	seacoLocationVal.description[4] = "Customer Service Indian Sub-Continent";
	seacoLocationVal.description[5] = "Customer Service Oceania";

	var oComboLocation = sap.ui.getCore().byId("idComboLocation");
	oComboLocation.removeAllItems();
	for (var i=0; i < seacoLocationVal.key.length; i++) {
        var oItem = new sap.ui.core.ListItem(seacoLocationVal.key[i]);
        oItem.setText(seacoLocationVal.description[i]);
        oComboLocation.addItem(oItem);
    }
	}
	else if(userType == "DEP"){

		// Set Up Seaco Contact Location values

		seacoLocationVal.key = [];
		seacoLocationVal.description = [];
		seacoLocationVal.key[0] = "";
		seacoLocationVal.key[1] = "DEAME";
		seacoLocationVal.key[2] = "DEAPA";
		seacoLocationVal.key[3] = "DEEUR";
		seacoLocationVal.key[4] = "DEOCE";

		seacoLocationVal.description[0] = "";
		seacoLocationVal.description[1] = "Americas";
		seacoLocationVal.description[2] = "Asia Pacific";
		seacoLocationVal.description[3] = "EMEA";
		seacoLocationVal.description[4] = "Oceania";


		var oComboLocation = sap.ui.getCore().byId("idComboLocation");
		oComboLocation.removeAllItems();
		for (var i=0; i < seacoLocationVal.key.length; i++) {
	        var oItem = new sap.ui.core.ListItem(seacoLocationVal.key[i]);
	        oItem.setText(seacoLocationVal.description[i]);
	        oComboLocation.addItem(oItem);
	    }
		}
	else if(userType == "FAC"){

		// Set Up Seaco Contact Location values

		seacoLocationVal.key = [];
		seacoLocationVal.description = [];
		seacoLocationVal.key[0] = "";
		seacoLocationVal.key[1] = "FAAME";
		seacoLocationVal.key[2] = "FAAPA";
		seacoLocationVal.key[3] = "FAEUR";

		seacoLocationVal.description[0] = "";
		seacoLocationVal.description[1] = "Americas";
		seacoLocationVal.description[2] = "Asia Pacific";
		seacoLocationVal.description[3] = "EMEA";


		var oComboLocation = sap.ui.getCore().byId("idComboLocation");
		oComboLocation.removeAllItems();
		for (var i=0; i < seacoLocationVal.key.length; i++) {
	        var oItem = new sap.ui.core.ListItem(seacoLocationVal.key[i]);
	        oItem.setText(seacoLocationVal.description[i]);
	        oComboLocation.addItem(oItem);
	    }
		}
	else if(userType == "SUR"){

		// Set Up Seaco Contact Location values

		seacoLocationVal.key = [];
		seacoLocationVal.description = [];
		seacoLocationVal.key[0] = "";
		seacoLocationVal.key[1] = "SUAME";
		seacoLocationVal.key[2] = "SUAPA";
		seacoLocationVal.key[3] = "SUEUR";

		seacoLocationVal.description[0] = "";
		seacoLocationVal.description[1] = "Americas";
		seacoLocationVal.description[2] = "Asia Pacific";
		seacoLocationVal.description[3] = "EMEA";


		var oComboLocation = sap.ui.getCore().byId("idComboLocation");
		oComboLocation.removeAllItems();
		for (var i=0; i < seacoLocationVal.key.length; i++) {
	        var oItem = new sap.ui.core.ListItem(seacoLocationVal.key[i]);
	        oItem.setText(seacoLocationVal.description[i]);
	        oComboLocation.addItem(oItem);
	    }
		}
	else if(userType == "BUY"){

		// Set Up Seaco Contact Location values
				// Begin of changing by Seyed Ismail on 15.12.2014 "MAC15122014+
		seacoLocationVal.key = [];
		seacoLocationVal.description = [];
		seacoLocationVal.key[0] = "";
		seacoLocationVal.key[1] = "BUAME";
		seacoLocationVal.key[2] = "BUASI";
		seacoLocationVal.key[3] = "BUANZ";
		seacoLocationVal.key[4] = "BUEUR";
		seacoLocationVal.key[5] = "BUAFR";
		seacoLocationVal.key[6] = "BUIND";
		seacoLocationVal.key[7] = "BUMID";

		seacoLocationVal.description[0] = "";
		seacoLocationVal.description[1] = "Americas";
		seacoLocationVal.description[2] = "Asia";
		seacoLocationVal.description[3] = "ANZ";
		seacoLocationVal.description[4] = "Europe";
		seacoLocationVal.description[5] = "Africa";
		seacoLocationVal.description[6] = "India";
		seacoLocationVal.description[7] = "Middle East";

		// End of changing by Seyed Ismail on 15.12.2014 "MAC15122014+
		var oComboLocation = sap.ui.getCore().byId("idComboLocation");
		oComboLocation.removeAllItems();
		for (var i=0; i < seacoLocationVal.key.length; i++) {
	        var oItem = new sap.ui.core.ListItem(seacoLocationVal.key[i]);
	        oItem.setText(seacoLocationVal.description[i]);
	        oComboLocation.addItem(oItem);
	    }
		}
},

// Refine Seaco Contact Email
refineSeacoContactEmail: function(userType, location, oLabelSMail, oComboSMail){
	if(userType == "CUS"){
		if(location == "CSAPA"){

		// Set Up Seaco Contact Email Values

			seacoEmailVal.key = [];
			seacoEmailVal.description = [];
			seacoEmailVal.key[0] = "";
			//seacoEmailVal.key[0] = "CSEANZ";
			seacoEmailVal.key[1] = "CSECHN";
			seacoEmailVal.key[2] = "CSEHKG";
			seacoEmailVal.key[3] = "CSEIDN";
			seacoEmailVal.key[4] = "CSEJPN";
			seacoEmailVal.key[5] = "CSEKRE";
			seacoEmailVal.key[6] = "CSEMLY";
			seacoEmailVal.key[7] = "CSEPHL";
			seacoEmailVal.key[8] = "CSESGP";
			seacoEmailVal.key[9] = "CSETAI";
			seacoEmailVal.key[10] = "CSETHL";
			seacoEmailVal.key[11] = "CSEVIE";

			seacoEmailVal.description[0] = "";
			//seacoEmailVal.description[0] = "CS.ANZ@seacoglobal.com";
			seacoEmailVal.description[1] = "CS.China@seacoglobal.com";
			seacoEmailVal.description[2] = "CS.Hongkong@seacoglobal.com";
			seacoEmailVal.description[3] = "CS.Indonesia@seacoglobal.com";
			seacoEmailVal.description[4] = "CS.Japan@seacoglobal.com";
			seacoEmailVal.description[5] = "CS.Korea@seacoglobal.com";
			seacoEmailVal.description[6] = "CS.Malaysia@seacoglobal.com";
			seacoEmailVal.description[7] = "CS.Philippines@seacoglobal.com";
			seacoEmailVal.description[8] = "CS.Singapore@seacoglobal.com";
			seacoEmailVal.description[9] = "CS.Taiwan@seacoglobal.com";
			seacoEmailVal.description[10] = "CS.Thailand@seacoglobal.com";
			seacoEmailVal.description[11] = "CS.Vietnam@seacoglobal.com";
		}
		else if(location == "CSAME"){
			seacoEmailVal.key = [];
			seacoEmailVal.description = [];
			seacoEmailVal.key[0] = "";
			seacoEmailVal.key[1] = "CSEAME";
			seacoEmailVal.description[0] = "";
			seacoEmailVal.description[1] = "CS.Americas@seacoglobal.com";
		}
		else if(location == "CSEUR"){
			seacoEmailVal.key = [];
			seacoEmailVal.description = [];
			seacoEmailVal.key[0] = "";
			seacoEmailVal.key[1] = "CSEBEN";
			seacoEmailVal.key[2] = "CSECIS";
			seacoEmailVal.key[3] = "CSEEMD";
			seacoEmailVal.key[4] = "CSEFRA";
			seacoEmailVal.key[5] = "CSEGER";
			//seacoEmailVal.key[6] = "CSEMED";

			seacoEmailVal.key[6] = "CSEITA";
			seacoEmailVal.key[7] = "CSESPA";
			seacoEmailVal.key[8] = "CSEPOR";

			seacoEmailVal.key[9] = "CSESCA";
			seacoEmailVal.key[10] = "CSESAF";
			seacoEmailVal.key[11] = "CSEUKN";

			seacoEmailVal.description[0] = "";
			seacoEmailVal.description[1] = "CS.Benelux@seacoglobal.com";
			seacoEmailVal.description[2] = "CS.CIS@seacoglobal.com";
			seacoEmailVal.description[3] = "CS.EastMed@seacoglobal.com";
			seacoEmailVal.description[4] = "CS.France@seacoglobal.com";
			seacoEmailVal.description[5] = "CS.Germany@seacoglobal.com";
			//seacoEmailVal.description[6] = "CS.Med@seacoglobal.com";

			seacoEmailVal.description[6] = "CS.italy@seacoglobal.com";
			seacoEmailVal.description[7] = "CS.spain@seacoglobal.com";
			seacoEmailVal.description[8] = "CS.portugal@seacoglobal.com";

			seacoEmailVal.description[9] = "CS.Scandinavia@seacoglobal.com";
			seacoEmailVal.description[10] = "CS.SouthAfrica@seacoglobal.com";
			seacoEmailVal.description[11] = "CS.UK@seacoglobal.com";
		}
		else if(location == "CSISC"){
			seacoEmailVal.key = [];
			seacoEmailVal.description = [];
			seacoEmailVal.key[0] = "";
			seacoEmailVal.key[1] = "CSEISC";
			seacoEmailVal.description[0] = "";
			seacoEmailVal.description[1] = "CS.ISC@seacoglobal.com";
		}
		else if(location == "CSOCE"){
			seacoEmailVal.key = [];
			seacoEmailVal.description = [];
			seacoEmailVal.key[0] = "";
			seacoEmailVal.key[1] = "CSEOCE";
			seacoEmailVal.description[0] = "";
			seacoEmailVal.description[1] = "cs.oceania@seacoglobal.com";
		}
	}
	else if(userType == "DEP"){
		if(location == "DEAPA"){
			seacoEmailVal.key = [];
			seacoEmailVal.description = [];
			seacoEmailVal.key[0] = "";
			seacoEmailVal.key[1] = "DEAPSM";
			seacoEmailVal.description[0] = "";
			seacoEmailVal.description[1] = "apops@seacoglobal.com";

				}
				else if(location == "DEAME"){
					seacoEmailVal.key = [];
					seacoEmailVal.description = [];
					seacoEmailVal.key[0] = "";
					seacoEmailVal.key[1] = "DEAMSM";
					seacoEmailVal.description[0] = "";
					seacoEmailVal.description[1] = "amops@seacoglobal.com";
				}
				else if(location == "DEEUR"){
					seacoEmailVal.key = [];
					seacoEmailVal.description = [];
					seacoEmailVal.key[0] = "";
					seacoEmailVal.key[1] = "DEEUSM";
					seacoEmailVal.description[0] = "";
					seacoEmailVal.description[1] = "emeaops@seacoglobal.com";
				}
				else if(location == "DEOCE"){
					seacoEmailVal.key = [];
					seacoEmailVal.description = [];
					seacoEmailVal.key[0] = "";
					seacoEmailVal.key[1] = "DEEOCE";
					seacoEmailVal.description[0] = "";
					seacoEmailVal.description[1] = "cs.oceania@seacoglobal.com";
				}
	}
	/*else if(userType == "FAC"){
		if(location == "FAAPA"){
			seacoEmailVal.key = [];
			seacoEmailVal.description = [];
			seacoEmailVal.key[0] = "";
			seacoEmailVal.key[1] = "FAAPSM";
			seacoEmailVal.description[0] = "";
			seacoEmailVal.description[1] = "Sion-May.Cheng@seacoglobal.com";

				}
				else if(location == "FAAME"){
					seacoEmailVal.key = [];
					seacoEmailVal.description = [];
					seacoEmailVal.key[0] = "";
					seacoEmailVal.key[1] = "FAAMSM";
					seacoEmailVal.description[0] = "";
					seacoEmailVal.description[1] = "Sion-May.Cheng@seacoglobal.com";
				}
				else if(location == "FAEUR"){
					seacoEmailVal.key = [];
					seacoEmailVal.description = [];
					seacoEmailVal.key[0] = "";
					seacoEmailVal.key[1] = "FAEUSM";
					seacoEmailVal.description[0] = "";
					seacoEmailVal.description[1] = "Sion-May.Cheng@seacoglobal.com";
				}
	}
	else if(userType == "SUR"){
		if(location == "SUAPA"){
			seacoEmailVal.key = [];
			seacoEmailVal.description = [];
			seacoEmailVal.key[0] = "";
			seacoEmailVal.key[1] = "SUAPSM";
			seacoEmailVal.description[0] = "";
			seacoEmailVal.description[1] = "Sion-May.Cheng@seacoglobal.com";

				}
				else if(location == "SUAME"){
					seacoEmailVal.key = [];
					seacoEmailVal.description = [];
					seacoEmailVal.key[0] = "";
					seacoEmailVal.key[1] = "SUAMSM";
					seacoEmailVal.description[0] = "";
					seacoEmailVal.description[1] = "Sion-May.Cheng@seacoglobal.com";
				}
				else if(location == "SUEUR"){
					seacoEmailVal.key = [];
					seacoEmailVal.description = [];
					seacoEmailVal.key[0] = "";
					seacoEmailVal.key[1] = "SUEUSM";
					seacoEmailVal.description[0] = "";
					seacoEmailVal.description[1] = "Sion-May.Cheng@seacoglobal.com";
				}
	}*/
	//  Begin of changing by Seyed Ismail on 15.12.2014 MAC15122014
	else if(userType == "BUY"){
		if(location == "BUAME"){
			seacoEmailVal.key = [];
			seacoEmailVal.description = [];
			seacoEmailVal.key[0] = "";
			seacoEmailVal.key[1] = "BUAMEE";
			seacoEmailVal.description[0] = "";
			seacoEmailVal.description[1] = "giovanna.nastasi@seacoglobal.com";

				}
				else if(location == "BUASI"){
					seacoEmailVal.key = [];
					seacoEmailVal.description = [];
					seacoEmailVal.key[0] = "";
					seacoEmailVal.key[1] = "BUASIE";
					seacoEmailVal.description[0] = "";
					seacoEmailVal.description[1] = "grace.kaw@seacoglobal.com";
				}
				else if(location == "BUANZ"){
					seacoEmailVal.key = [];
					seacoEmailVal.description = [];
					seacoEmailVal.key[0] = "";
					seacoEmailVal.key[1] = "BUANZE";
					seacoEmailVal.description[0] = "";
					seacoEmailVal.description[1] = "grace.kaw@seacoglobal.com";
				}
				else if(location == "BUEUR"){
					seacoEmailVal.key = [];
					seacoEmailVal.description = [];
					seacoEmailVal.key[0] = "";
					seacoEmailVal.key[1] = "BUEURE";
					seacoEmailVal.description[0] = "";
					seacoEmailVal.description[1] = "catrin.wagner@seacoglobal.com";
				}
				else if(location == "BUAFR"){
					seacoEmailVal.key = [];
					seacoEmailVal.description = [];
					seacoEmailVal.key[0] = "";
					seacoEmailVal.key[1] = "BUAFRE";
					seacoEmailVal.description[0] = "";
					seacoEmailVal.description[1] = "catrin.wagner@seacoglobal.com";
				}
				else if(location == "BUIND"){
					seacoEmailVal.key = [];
					seacoEmailVal.description = [];
					seacoEmailVal.key[0] = "";
					seacoEmailVal.key[1] = "BUINDE";
					seacoEmailVal.description[0] = "";
					seacoEmailVal.description[1] = "catrin.wagner@seacoglobal.com";
				}
				else if(location == "BUMID"){
					seacoEmailVal.key = [];
					seacoEmailVal.description = [];
					seacoEmailVal.key[0] = "";
					seacoEmailVal.key[1] = "BUMIDE";
					seacoEmailVal.description[0] = "";
					seacoEmailVal.description[1] = "catrin.wagner@seacoglobal.com";
				}
	}
	// End of changing by Seyed Ismail on 15.12.2014 MAC15122014

	oLabelSMail.setVisible(true);
	oComboSMail.setVisible(true);
	for (var i=0; i < seacoEmailVal.key.length; i++) {
        var oItem = new sap.ui.core.ListItem(seacoEmailVal.key[i]);
        oItem.setText(seacoEmailVal.description[i]);
        oComboSMail.addItem(oItem);
    }
	},

	resetForm: function(){
		var oTxtFName = sap.ui.getCore().byId("idTxtFName");
		var oTxtLName = sap.ui.getCore().byId("idTxtLName");
		var oTxtEMail= sap.ui.getCore().byId("idTxtEMail");
		var oTxtCMail = sap.ui.getCore().byId("idTxtCMail");
		var oTxtCName = sap.ui.getCore().byId("idTxtCName");
		var oTxtFCode = sap.ui.getCore().byId("idTxtFCode");
		var oTxtAdd1 = sap.ui.getCore().byId("idTxtAdd1");
		var oTxtAdd2 = sap.ui.getCore().byId("idTxtAdd2");
		var oTxtAdd3 = sap.ui.getCore().byId("idTxtAdd3");
		var oTxtCity = sap.ui.getCore().byId("idTxtCity");
		var oTxtCountry = sap.ui.getCore().byId("idTxtCountry");
		var oTxtPhone = sap.ui.getCore().byId("idTxtPhone");
		var oTxtPCode = sap.ui.getCore().byId("idTxtPCode");
		var oComboLocation = sap.ui.getCore().byId("idComboLocation");
		var oComboSMail = sap.ui.getCore().byId("idComboSMail");

		oTxtFName.setValue("");
		oTxtLName.setValue("");
		oTxtEMail.setValue("");
		oTxtCMail.setValue("");
		oTxtCName.setValue("");
		oTxtFCode.setValue("");
		oTxtAdd1.setValue("");
		oTxtAdd2.setValue("");
		oTxtAdd3.setValue("");
		oTxtCity.setValue("");
		oTxtCountry.setValue("");
		oTxtPhone.setValue("");
		oTxtPCode.setValue("");
		oComboLocation.setValue("");
		oComboSMail.setValue("");

		oTxtFName.removeStyleClass("redBackgrond redBorder");
		oTxtLName.removeStyleClass("redBackgrond redBorder");
		oTxtEMail.removeStyleClass("redBackgrond redBorder");
		oTxtCMail.removeStyleClass("redBackgrond redBorder");
		oTxtCName.removeStyleClass("redBackgrond redBorder");
		oTxtFCode.removeStyleClass("redBackgrond redBorder");
		oTxtAdd1.removeStyleClass("redBackgrond redBorder");
		oTxtAdd2.removeStyleClass("redBackgrond redBorder");
		oTxtAdd3.removeStyleClass("redBackgrond redBorder");
		oTxtCity.removeStyleClass("redBackgrond redBorder");
		oTxtCountry.removeStyleClass("redBackgrond redBorder");
		oTxtPhone.removeStyleClass("redBackgrond redBorder");
		oTxtPCode.removeStyleClass("redBackgrond redBorder");
		oComboLocation.removeStyleClass("redBackgrond redBorder");
		if(oComboSMail){
			oComboSMail.removeStyleClass("redBackgrond redBorder");
		}

		oTxtFName.setPlaceholder("First Name");
		oTxtLName.setPlaceholder("Last Name");
		oTxtEMail.setPlaceholder("E-Mail");
		oTxtCMail.setPlaceholder("Confirm E-Mail");
		oTxtFCode.setPlaceholder("Factory Code");
		oTxtAdd1.setPlaceholder("Address 1");
		oTxtAdd2.setPlaceholder("Address 2");
		oTxtAdd3.setPlaceholder("Address 3");
		oTxtCity.setPlaceholder("City");
		oTxtCountry.setPlaceholder("Country");
		oTxtPhone.setPlaceholder("Phone");
		oTxtPCode.setPlaceholder("Postal Code");
		oComboLocation.setPlaceholder("Seaco Contact Location");
		if(oComboSMail){
			oComboSMail.setPlaceholder("Seaco Contact E-Mail");
		}
	},

	submitForm: function(){
		var valid = oCurrent.validateFields();
		if(valid){
			var oParams = {};
			var oTxtFName = sap.ui.getCore().byId("idTxtFName").getValue();
			var oTxtLName = sap.ui.getCore().byId("idTxtLName").getValue();
			var oTxtEMail= sap.ui.getCore().byId("idTxtEMail").getValue();
			var oTxtCMail = sap.ui.getCore().byId("idTxtCMail").getValue();
			var oTxtCName = sap.ui.getCore().byId("idTxtCName").getValue();
			var oTxtAdd1 = sap.ui.getCore().byId("idTxtAdd1").getValue();
			var oTxtAdd2 = sap.ui.getCore().byId("idTxtAdd2").getValue();
			var oTxtAdd3 = sap.ui.getCore().byId("idTxtAdd3").getValue();
			var oTxtCity = sap.ui.getCore().byId("idTxtCity").getValue();
			var oTxtCountry = sap.ui.getCore().byId("idTxtCountry").getValue();
			var oTxtPhone = sap.ui.getCore().byId("idTxtPhone").getValue();
			var oTxtPCode = sap.ui.getCore().byId("idTxtPCode").getValue();
			var oComboLocation = sap.ui.getCore().byId("idComboLocation").getValue();
			var oComboSMail = sap.ui.getCore().byId("idComboSMail").getValue();
			var oComboUType = sap.ui.getCore().byId("idComboUserType").getValue();

			sap.ui.getCore().byId("idComboUserType").removeStyleClass("redBackgrond redBorder");
			sap.ui.getCore().byId("idTxtFName").removeStyleClass("redBackgrond redBorder");
			sap.ui.getCore().byId("idTxtLName").removeStyleClass("redBackgrond redBorder");
			sap.ui.getCore().byId("idTxtEMail").removeStyleClass("redBackgrond redBorder");
			sap.ui.getCore().byId("idTxtCMail").removeStyleClass("redBackgrond redBorder");
			sap.ui.getCore().byId("idTxtCName").removeStyleClass("redBackgrond redBorder");
			sap.ui.getCore().byId("idTxtAdd1").removeStyleClass("redBackgrond redBorder");
			sap.ui.getCore().byId("idTxtAdd2").removeStyleClass("redBackgrond redBorder");
			sap.ui.getCore().byId("idTxtAdd3").removeStyleClass("redBackgrond redBorder");
			sap.ui.getCore().byId("idTxtCity").removeStyleClass("redBackgrond redBorder");
			sap.ui.getCore().byId("idTxtCountry").removeStyleClass("redBackgrond redBorder");
			sap.ui.getCore().byId("idTxtPhone").removeStyleClass("redBackgrond redBorder");
			sap.ui.getCore().byId("idTxtPCode").removeStyleClass("redBackgrond redBorder");
			sap.ui.getCore().byId("idComboLocation").removeStyleClass("redBackgrond redBorder");
			sap.ui.getCore().byId("idComboUserType").removeStyleClass("redBackgrond redBorder");
			if(sap.ui.getCore().byId("idComboSMail")){
				sap.ui.getCore().byId("idComboSMail").removeStyleClass("redBackgrond redBorder");
			}

			var selUserType = sap.ui.getCore().byId("idComboUserType").mProperties.selectedItemId;

			if(selUserType == 'FAC'){
				oComboSMail = 'newbuild_ir@seacoglobal.com';
			}
			else if(selUserType == 'SUR'){
				oComboSMail = 'eric.lim@seacoglobal.com';
			}

	      	var filter = "/Getsupport_Newuser?$filter=Add1 eq '"+oTxtAdd1+
						 "' and Add2  eq '"+oTxtAdd2+
						 "' and Add3 eq '"+oTxtAdd3+
						 "' and City eq '"+oTxtCity+
						 "' and Cmail eq '"+oTxtCMail+
						 "' and Cname eq '"+oTxtCName+
						 "' and Country eq '"+oTxtCountry+
						 "' and Phone eq '"+oTxtPhone+
						 "' and Email eq '"+oTxtEMail+
						 "' and Fname eq '"+oTxtFName+
						 "' and Lname eq '"+oTxtLName+
						 "' and Location eq '"+oComboLocation+
						 "' and Pcode eq '"+oTxtPCode+
						 "' and Smail eq '"+oComboSMail+
						 "' and Utype eq '"+oComboUType+"'";
	      				// Begin of adding by Seyed Ismail on 15.12.2014 MAC15122014+
						filter = filter.replace(/&/g, "%26");
						filter = filter.replace(/#/g, "%23");
						filter = filter.replace(/%/g, "%25");
						filter = filter + "&saml2=disabled";
						// End of adding by Seyed Ismail on 15.12.2014 MAC15122014+
			var oModel = new sap.ui.model.odata.ODataModel( auth_serviceUrl, true, "ZONLINE", "Seaco@123");
			oModel.setSizeLimit(10000);
			var urlToCall = auth_serviceUrl + filter;
			//alert("urlToCall " + urlToCall);
			OData.request({
			      requestUri: urlToCall,
			      user:"ZONLINE", password:"Seaco@123",
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
			    	var result = data.results[0].Success;
			    	if(result=="X"){
			    	sap.ui.commons.MessageBox.alert("Thank you for your registration. Our Customer Service Representative will contact you shortly");
			    	}
			    	else{
			    		sap.ui.commons.MessageBox.alert("There are some problems. Please contact your Customer Service Representative");
			    	}
			    },
			    function(err){
			    	 busyDialog.close();
			    	 errorfromServer(err);
			    	//alert("Error while Reading Result : "+ window.JSON.stringify(err.response));
			    });

			}
	},

	validateFields: function(){
		var valid = false;
		var selUserType = sap.ui.getCore().byId("idComboUserType").mProperties.selectedItemId;


		var oTxtFName = sap.ui.getCore().byId("idTxtFName");
		var oTxtLName = sap.ui.getCore().byId("idTxtLName");
		var oTxtEMail = sap.ui.getCore().byId("idTxtEMail");
		var oTxtCMail = sap.ui.getCore().byId("idTxtCMail");
		var oTxtCName = sap.ui.getCore().byId("idTxtCName");
		var oTxtFCode = sap.ui.getCore().byId("idTxtFCode");
		var oTxtAdd1 = sap.ui.getCore().byId("idTxtAdd1");
		var oTxtCity = sap.ui.getCore().byId("idTxtCity");
		var oTxtCountry = sap.ui.getCore().byId("idTxtCountry");
		var oTxtPhone = sap.ui.getCore().byId("idTxtPhone");
		var oComboLocation = sap.ui.getCore().byId("idComboLocation");
		var oComboSMail = sap.ui.getCore().byId("idComboSMail");

		var oTxtFNameExists = checkIfEmpty(sap.ui.getCore().byId("idTxtFName").getValue());
		var oTxtLNameExists = checkIfEmpty(sap.ui.getCore().byId("idTxtLName").getValue());
		var oTxtEMailExists = checkIfEmpty(sap.ui.getCore().byId("idTxtEMail").getValue());
		var oTxtCMailExists = checkIfEmpty(sap.ui.getCore().byId("idTxtCMail").getValue());
		var oTxtCNameExists = checkIfEmpty(sap.ui.getCore().byId("idTxtCName").getValue());
		var oTxtFCodeExists = checkIfEmpty(sap.ui.getCore().byId("idTxtFCode").getValue());
		var oTxtAdd1Exists = checkIfEmpty(sap.ui.getCore().byId("idTxtAdd1").getValue());
		var oTxtCityExists = checkIfEmpty(sap.ui.getCore().byId("idTxtCity").getValue());
		var oTxtCountryExists = checkIfEmpty(sap.ui.getCore().byId("idTxtCountry").getValue());
		var oTxtPhoneExists = checkIfEmpty(sap.ui.getCore().byId("idTxtPhone").getValue());
		var oComboLocationExists = checkIfEmpty(sap.ui.getCore().byId("idComboLocation").getValue());
		var oComboSMailExists = checkIfEmpty(sap.ui.getCore().byId("idComboSMail").getValue());

		if(selUserType == "FAC" || selUserType == "SUR"){
			oComboLocationExists = true;
			oComboSMailExists = true;
		};

		if(sap.ui.getCore().byId("idComboUserType").getValue() != "" && 
			oTxtFNameExists &&
			oTxtLNameExists &&
			oTxtEMailExists &&
			oTxtCMailExists &&
			oTxtCNameExists &&
			//oTxtFCodeExists &&
			oTxtAdd1Exists &&
			oTxtCityExists &&
			oTxtCountryExists &&
			oTxtPhoneExists &&
			oComboLocationExists &&
			oComboSMailExists
		){
			valid = true;

			if(oTxtEMail.getValue() != oTxtCMail.getValue()){
				oTxtCMail.addStyleClass("redBackgrond redBorder");
				oTxtCMail.setValue("");
				oTxtCMail.setPlaceholder("Not matching with E-Mail");
				valid = false;
				return valid;
			}
			else{
				oTxtCMail.removeStyleClass("redBackgrond redBorder");
				valid = true;
			}

		}

	// 	if(oComboLocation.getValue() && oComboSMail.getValue()){
	// 		valid = true;
	// 	}else{
	// 	if(selUserType == "FAC" || selUserType == "SUR"){
	// 		valid = true;
	// 		if(oComboLocation.getValue()){
	// 			oComboLocation.removeStyleClass("redBackgrond redBorder");
	// 		}
	// 		if(oComboSMail.getValue()){
	// 			oComboSMail.removeStyleClass("redBackgrond redBorder");
	// 		}
	// 	}
	// 	else{
	// 		valid = false;
	// 		if(!oComboLocation.getValue()){
	// 			oComboLocation.addStyleClass("redBackgrond redBorder");
	// 		}
	// 		if(!oComboSMail.getValue()){
	// 			oComboSMail.addStyleClass("redBackgrond redBorder");
	// 		}
	// 	}
	// }

		if(selUserType == "FAC"){
			if(oTxtFCode.getValue()){
				valid = true;
				oTxtFCode.removeStyleClass("redBackgrond redBorder");
			}
			else{
				valid = false;
				oTxtFCode.addStyleClass("redBackgrond redBorder");
			}
		}

	

	if(valid == false){

		if(!oTxtFCode.getValue()){
			oTxtFCode.addStyleClass("redBackgrond redBorder");
		}
		if(oTxtFCode.getValue()){
			oTxtFCode.removeStyleClass("redBackgrond redBorder");
		}

		if(!oTxtFName.getValue()){
			oTxtFName.addStyleClass("redBackgrond redBorder");
		}

		if(sap.ui.getCore().byId("idComboUserType").getValue() == ""){
			sap.ui.getCore().byId("idComboUserType").addStyleClass("redBackgrond redBorder");
		}
		if(!oTxtLName.getValue()){
			oTxtLName.addStyleClass("redBackgrond redBorder");
		}
		if(!oTxtEMail.getValue()){
			oTxtEMail.addStyleClass("redBackgrond redBorder");
		}
		if(!oTxtCMail.getValue()){
			oTxtCMail.addStyleClass("redBackgrond redBorder");
		}
		if(!oTxtCName.getValue()){
			oTxtCName.addStyleClass("redBackgrond redBorder");
		}
		if(!oTxtAdd1.getValue()){
			oTxtAdd1.addStyleClass("redBackgrond redBorder");
		}
		if(!oTxtCity.getValue()){
			oTxtCity.addStyleClass("redBackgrond redBorder");
		}
		if(!oTxtCountry.getValue()){
			oTxtCountry.addStyleClass("redBackgrond redBorder");
		}
		if(!oTxtPhone.getValue()){
			oTxtPhone.addStyleClass("redBackgrond redBorder");
		}
		if(!oComboLocation.getValue()){
			oComboLocation.addStyleClass("redBackgrond redBorder");
		}
		if(!oComboSMail.getValue()){
			oComboSMail.addStyleClass("redBackgrond redBorder");
		}

		if(sap.ui.getCore().byId("idComboUserType").getValue() != ""){
			sap.ui.getCore().byId("idComboUserType").removeStyleClass("redBackgrond redBorder");
		}
			if(oTxtFName.getValue()){
				oTxtFName.removeStyleClass("redBackgrond redBorder");
			}
			if(oTxtLName.getValue()){
				oTxtLName.removeStyleClass("redBackgrond redBorder");
			}
			if(oTxtEMail.getValue()){
				oTxtEMail.removeStyleClass("redBackgrond redBorder");
			}
			if(oTxtCMail.getValue()){
				oTxtCMail.removeStyleClass("redBackgrond redBorder");
			}
			if(oTxtCName.getValue()){
				oTxtCName.removeStyleClass("redBackgrond redBorder");
			}
			if(oTxtAdd1.getValue()){
				oTxtAdd1.removeStyleClass("redBackgrond redBorder");
			}
			if(oTxtCity.getValue()){
				oTxtCity.removeStyleClass("redBackgrond redBorder");
			}
			if(oTxtCountry.getValue()){
				oTxtCountry.removeStyleClass("redBackgrond redBorder");
			}
			if(oTxtPhone.getValue()){
				oTxtPhone.removeStyleClass("redBackgrond redBorder");
			}
			if(oComboLocation.getValue()){
				oComboLocation.removeStyleClass("redBackgrond redBorder");
			}
			if(oComboSMail.getValue()){
				oComboSMail.removeStyleClass("redBackgrond redBorder");
			}
		}

		return valid;
	}

});

function checkIfEmpty(value){
	if(!value.replace(/\s/g, '').length){
		return false;
	}else{
		return true;
	}
}

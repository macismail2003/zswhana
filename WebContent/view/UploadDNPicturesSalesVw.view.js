sap.ui.jsview("view.UploadDNPicturesSalesVw", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.UploadDNPictures.UploadDNPictures
	*/ 
	getControllerName : function() {
		return "view.UploadDNPicturesSalesVw";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.UploadDNPictures.UploadDNPictures
	*/ 
createContent : function(oController) {
		//$('#idHdrContnt').html('Upload Sale Pictures'); //CHANGE HEADER CONTENT
		var objcurntfile = this;
		var vUploadDNPicturesForm = this.createUploadDNPicMult(objcurntfile);
		
		this.page = new sap.m.Page("UploadDNPicSalesPage", {
			showNavButton: false,				// page 2 should display a back button
			icon: "",
			content : [vUploadDNPicturesForm]
		});
		this.page.setShowHeader(false);
		this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
		
		return this.page;
	},
	
createUploadDNPicMult: function(objcurntfile){
	jQuery.sap.require("sap.ui.commons.MessageBox");

		function fnResetCallbackMsgBox(sResult){
			if(sResult == "YES"){
				var oFlxBxUNDNPS = sap.ui.getCore().byId("idFlexbxUDNPSGrid");
				if(oFlxBxUNDNPS != undefined){
					oFlxBxUNDNPS.destroy();
				}
				sap.ui.getCore().byId("idBtnUploadDNPicMultSubmit").setEnabled(true);
				sap.ui.getCore().byId("idUnitNoUDNPM").setEnabled(true);
				sap.ui.getCore().byId("idUnitNoUDNPM").setValueState(sap.ui.core.ValueState.None);
  				sap.ui.getCore().byId("idUnitNoUDNPM").setPlaceholder("Unit Number");
				sap.ui.getCore().byId("idUnitNoUDNPM").setValue('');
				/*var oUpldSnglCertificate  = sap.ui.getCore().byId("idUploadMultipleCertificate");
				oUpldSnglCertificate.setValue('');
				oUpldSnglCertificate.oFilePath.setValue('');*/
			}else{
				/*var str = "{\n  \"Sheet1\": [\n    {\n      \"Status \": \"A\",\n      \"Unit Number\": \"GESU2062650\",\n      \"In-Date\": \"20070605\"\n    },\n    {\n      \"Status \": \"A\",\n      \"Unit Number\": \"GESU2062710\",\n      \"In-Date\": \"20070514\"\n    },\n    {\n      \"Status \": \"A\",\n      \"Unit Number\": \"GESU2062726\",\n      \"In-Date\": \"20070514\"\n    },\n    {\n      \"Status \": \"S\",\n      \"Unit Number\": \"GESU2089286\",\n      \"In-Date\": \"20081216\"\n    },\n    {\n      \"Status \": \"A\",\n      \"Unit Number\": \"GESU2097105\",\n      \"In-Date\": \"20081201\"\n    },\n    {\n      \"Status \": \"S\",\n      \"Unit Number\": \"GESU2138945\",\n      \"In-Date\": \"20081117\"\n    },\n    {\n      \"Status \": \"U\",\n      \"Unit Number\": \"GESU2145414\",\n      \"In-Date\": \"20081113\"\n    },\n    {\n      \"Status \": \"U\",\n      \"Unit Number\": \"GESU2146128\",\n      \"In-Date\": \"20080409\"\n    },\n    {\n      \"Status \": \"U\",\n      \"Unit Number\": \"GESU2195776\",\n      \"In-Date\": \"20090123\"\n    }\n  ],\n  \"Sheet2\": [\n    {\n      \"Status \": \"A\",\n      \"Unit Number\": \"GESU2062650\",\n      \"In-Date\": \"20070605\"\n    },\n    {\n      \"Status \": \"A\",\n      \"Unit Number\": \"GESU2062710\",\n      \"In-Date\": \"20070514\"\n    },\n    {\n      \"Status \": \"A\",\n      \"Unit Number\": \"GESU2062726\",\n      \"In-Date\": \"20070514\"\n    },\n    {\n      \"Status \": \"S\",\n      \"Unit Number\": \"GESU2089286\",\n      \"In-Date\": \"20081216\"\n    },\n    {\n      \"Status \": \"A\",\n      \"Unit Number\": \"GESU2097105\",\n      \"In-Date\": \"20081201\"\n    },\n    {\n      \"Status \": \"S\",\n      \"Unit Number\": \"GESU2138945\",\n      \"In-Date\": \"20081117\"\n    },\n    {\n      \"Status \": \"U\",\n      \"Unit Number\": \"GESU2145414\",\n      \"In-Date\": \"20081113\"\n    },\n    {\n      \"Status \": \"U\",\n      \"Unit Number\": \"GESU2146128\",\n      \"In-Date\": \"20080409\"\n    },\n    {\n      \"Status \": \"U\",\n      \"Unit Number\": \"GESU2195776\",\n      \"In-Date\": \"20090123\"\n    }\n  ]\n}";
				var getVal = eval ("(" + str + ")");
				var tmpval = getVal;*/
			}
		};
		
		var ResetMessage = "This will clear the screen content.\n Do you want to continue?"

		// Responsive Grid Layout
		var oUploadDNPicturesLayout = new sap.ui.layout.form.ResponsiveGridLayout("idUploadDNPicMultLyut");
	
		// Text Fields
		var oTextValueUnitNo = new sap.ui.commons.TextField('idUnitNoUDNPM',{
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: false}),
			 placeholder:"Unit Number"
		}).addStyleClass("FormInputStyle DepotInput38px");
		
		oTextValueUnitNo.onfocusin =  function(e) {  
					this.setValueState(sap.ui.core.ValueState.None);
					this.setPlaceholder("Unit Number");                          
			      };  
			        
		// Labels
		var oLabelUnitNo = new sap.ui.commons.Label({text: "Unit Number:", 
			required:true,
			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: false, margin: false}),
			wrapping: true}).addStyleClass("marginTop10");
		
		var oUpldDnPicSale = new UploadDNPicturesSales();
		// Buttons
		var oBtnUploadDNPicturesSubmit = new sap.m.Button("idBtnUploadDNPicMultSubmit",{
	          text : "Submit",
	          width:"80px",
	          styled:false,
	          layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
	          press:function(){
	        	  var objUtil = new utility();
	        	  var vidUnitNmrUDNPS = sap.ui.getCore().byId("idUnitNoUDNPM");
	        	  
	        	  if( $.trim(vidUnitNmrUDNPS.getValue())== ''){
	        		  vidUnitNmrUDNPS.setValueState(sap.ui.core.ValueState.Error);
	        		  vidUnitNmrUDNPS.setPlaceholder("Required");
	        		// sap.ui.commons.MessageBox.alert("You have input an invalid Unit Number.\n Please enter a valid Unit Number -11-char alpha numeric.");
	        		  return;
	        	  }else if(!objUtil.validateUnitNumber(vidUnitNmrUDNPS.getValue())){
	        		  vidUnitNmrUDNPS.setValueState(sap.ui.core.ValueState.Error);
	        		  vidUnitNmrUDNPS.setValue('');
	        		  vidUnitNmrUDNPS.setPlaceholder("Invalid Unit Number");
	        		  return;
	        	  }else{
	        		  vidUnitNmrUDNPS.setValueState(sap.ui.core.ValueState.None);
	        		  vidUnitNmrUDNPS.setPlaceholder("Unit Number");
	        	  }
	        	  oUpldDnPicSale.getOnlineDataSubmit();
	        	  //openValidationAlert();
	        	  //showDNPicturesSingle();
	          }}).addStyleClass("submitBtn");
		
		var oBtnUploadDNPicturesReset = new sap.m.Button("idBtnUpldDNPicSale",{
	          text : "Reset",
	          width:"80px",
	          styled:false,
	          layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
	          press:function(){sap.ui.commons.MessageBox.show(ResetMessage,
                      sap.ui.commons.MessageBox.Icon.WARNING,
                      "Warning",
                      [sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO], 
                      fnResetCallbackMsgBox,
                      sap.ui.commons.MessageBox.Action.YES);
	          	}}).addStyleClass("submitBtn");
		
		var lblSpace = new sap.ui.commons.Label( {text: " ",width : '8px'});
		// Flex Box
    	var oFlexbxUNPB = new sap.m.FlexBox({
    	      items: [oBtnUploadDNPicturesSubmit, lblSpace, oBtnUploadDNPicturesReset],
    	      direction: "Row"
    	    });
    	
    	// Labels
	       var labStar = new sap.ui.commons.Label({text: "* "}).addStyleClass("MandatoryStar");
	       var lblSpaceLegend = new sap.ui.commons.Label( {text: " ",width : '5px'});
			  var labRequired = new sap.ui.commons.Label({text: " Mandatory Field",wrapping: true});
			  var oFlexboxReq = new sap.m.FlexBox({
				 // layoutData: new sap.ui.layout.GridData({span: "L7 M6 S4"}),
	              items: [labStar,lblSpaceLegend,labRequired],
	              direction: "Row"
			  }).addStyleClass("marginTop10");
			  
		// Online Form Starts
		var oUploadDNPicturesForm = new sap.ui.layout.form.Form("idUploadDNPicSaleFrm1",{
			                layout: oUploadDNPicturesLayout,
			                formContainers: [
			                        new sap.ui.layout.form.FormContainer("idUploadDNPicSaleC1",{
			                                formElements: [
														new sap.ui.layout.form.FormElement({
															fields: [oLabelUnitNo, oTextValueUnitNo],
															//layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
														}),
														
														new sap.ui.layout.form.FormElement({
													        layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
														}),
														
														new sap.ui.layout.form.FormElement({
														    fields: [oFlexbxUNPB],
														    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
														}),
														
														new sap.ui.layout.form.FormElement({
														    fields: [oFlexboxReq],
														    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
														})
			                                        ]
			                        }),
			                        new sap.ui.layout.form.FormContainer("idUploadDNPicSaleFormC2",{
		                                formElements: []}),
			                ]});
		var vHDivider = new sap.ui.commons.HorizontalDivider({width: "95%", type: "Area", height: "Medium"});
		var oUploadDNPicturesSingleLayout = new sap.ui.layout.form.ResponsiveLayout("idUploadDNPicMultLayout");
        var oUploadDNPicturesSingleForm = new sap.ui.layout.form.Form("idUploadDNPicSaleFrm2",{
           layout: oUploadDNPicturesSingleLayout,
           formContainers: [
                   new sap.ui.layout.form.FormContainer("idUploadDNPicMultLayoutFormC1",{
                       formElements: [
                               new sap.ui.layout.form.FormElement("IdUploadDNPicMultFrmElmnt",{
                                   fields: [],
                               }),
                      ],layoutData: new sap.ui.commons.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                   })
           ]
        });

        var oFlexboxUploadDNPicturesSingle = new sap.m.FlexBox({items: [oUploadDNPicturesForm,vHDivider, oUploadDNPicturesSingleForm],
        		        										direction: "Column"});

        return oFlexboxUploadDNPicturesSingle;
	},

});
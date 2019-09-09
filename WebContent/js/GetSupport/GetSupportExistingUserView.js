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
	
sap.ui.model.json.JSONModel.extend("getSupportExistingUser", {

	// Create the initial page
	createInitialPage: function(){
		oCurrent = this;
		jQuery.sap.require("sap.ui.commons.MessageBox");	// message box library
		
		// ************* Drop Down Box Starts ************* //
        
		// Label for Request Type
		
		var oLabelRequestType = new sap.ui.commons.Label({text: "Request Type",wrapping: false, required:true,
		  layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: false})
		}).addStyleClass("marginTop15");
		
		// Initializing Drop Down Box

		var oComboRequestType = new sap.ui.commons.DropdownBox("idComboRequestType", {
      	  layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: false}),
      	  change:function(oEvent){
				  this.setValueState(sap.ui.core.ValueState.None);
				  this.setPlaceholder("Select Request Type");
				  //var oLabelLocation = sap.ui.getCore().byId("idComboLocation");
				  //oLabelLocation.destroyItems();
				  //var selRequestType = oEvent.mParameters.selectedItem.sId;
				  var oHDivider1 = sap.ui.getCore().byId("idHDivider1E");
				  var oHDivider = sap.ui.getCore().byId("idHDividerE");
				  var oGetSupportForm = sap.ui.getCore().byId("idGetSupportFormE");
				  var oGetSupportButton = sap.ui.getCore().byId("idGetSupportButtonE");
				  var oLabelNPassword = sap.ui.getCore().byId("idLabelNPassword");
				  if(oEvent.mParameters.selectedItem.sId == "PASSWO"){ 
					  var oTitle = sap.ui.getCore().byId("idGetSupportFormC1E");
					  oTitle.setTitle("Change Password");
					  var oLabelUserID = sap.ui.getCore().byId("idLabelUserID");
					  var oTxtUserID = sap.ui.getCore().byId("idTxtUserID");
					  var oLabelPassword = sap.ui.getCore().byId("idLabelPassword");
					  var oTxtPassword = sap.ui.getCore().byId("idTxtPassword");
					  var oLabelOPassword = sap.ui.getCore().byId("idLabelOPassword");
					  var oTxtOPassword = sap.ui.getCore().byId("idTxtOPassword");
					  var oLabelCPassword = sap.ui.getCore().byId("idLabelCPassword");
					  var oTxtCPassword = sap.ui.getCore().byId("idTxtCPassword");
					  oLabelUserID.setVisible(true);
					  oLabelPassword.setVisible(true);
					  oLabelOPassword.setVisible(true);
					  oLabelCPassword.setVisible(true);
					  oTxtUserID.setVisible(true);
					  oTxtPassword.setVisible(true);
					  oTxtOPassword.setVisible(true);
					  oTxtCPassword.setVisible(true);
					  oHDivider1.setVisible(true);
					  oHDivider.setVisible(true);
					  oGetSupportForm.setVisible(true);
					  oGetSupportButton.setVisible(true);
					  oLabelNPassword.setVisible(true);
				  }
				  else if(oEvent.mParameters.selectedItem.sId == "USERID"){
					  var oTitle = sap.ui.getCore().byId("idGetSupportFormC1E");
					  oTitle.setTitle("Retrieve User ID");
					  var oLabelUserID = sap.ui.getCore().byId("idLabelUserID");
					  var oTxtUserID = sap.ui.getCore().byId("idTxtUserID");
					  var oLabelPassword = sap.ui.getCore().byId("idLabelPassword");
					  var oTxtPassword = sap.ui.getCore().byId("idTxtPassword");
					  var oLabelOPassword = sap.ui.getCore().byId("idLabelOPassword");
					  var oTxtOPassword = sap.ui.getCore().byId("idTxtOPassword");
					  var oLabelCPassword = sap.ui.getCore().byId("idLabelCPassword");
					  var oTxtCPassword = sap.ui.getCore().byId("idTxtCPassword");
					  oHDivider1.setVisible(true);
					  oHDivider.setVisible(true);
					  oGetSupportForm.setVisible(true);
					  oGetSupportButton.setVisible(true);
					  oLabelNPassword.setVisible(false);
					  oLabelUserID.setVisible(false);
					  oLabelPassword.setVisible(false);
					  oLabelOPassword.setVisible(false);
					  oLabelCPassword.setVisible(false);
					  oTxtUserID.setVisible(false);
					  oTxtPassword.setVisible(false);
					  oTxtOPassword.setVisible(false);
					  oTxtCPassword.setVisible(false);
				  }
				  else if(oEvent.mParameters.selectedItem.sId == "PRESET"){
					  var oTitle = sap.ui.getCore().byId("idGetSupportFormC1E");
					  oTitle.setTitle("Reset Password");
					  var oLabelUserID = sap.ui.getCore().byId("idLabelUserID");
					  var oTxtUserID = sap.ui.getCore().byId("idTxtUserID");
					  var oLabelPassword = sap.ui.getCore().byId("idLabelPassword");
					  var oTxtPassword = sap.ui.getCore().byId("idTxtPassword");
					  var oLabelOPassword = sap.ui.getCore().byId("idLabelOPassword");
					  var oTxtOPassword = sap.ui.getCore().byId("idTxtOPassword");
					  var oLabelCPassword = sap.ui.getCore().byId("idLabelCPassword");
					  var oTxtCPassword = sap.ui.getCore().byId("idTxtCPassword");
					  oLabelUserID.setVisible(true);
					  oLabelPassword.setVisible(true);
					  oLabelOPassword.setVisible(false);
					  oLabelCPassword.setVisible(true);
					  oTxtUserID.setVisible(true);
					  oTxtPassword.setVisible(true);
					  oTxtOPassword.setVisible(false);
					  oTxtCPassword.setVisible(true);
					  oHDivider1.setVisible(true);
					  oHDivider.setVisible(true);
					  oGetSupportForm.setVisible(true);
					  oGetSupportButton.setVisible(true);
					  oLabelNPassword.setVisible(true);
				  }
				  else{
					  oHDivider1.setVisible(false);
					  oHDivider.setVisible(false);
					  oGetSupportForm.setVisible(false);
					  oGetSupportButton.setVisible(false);
					  oLabelNPassword.setVisible(false);
				  }

			  },
      displaySecondaryValues:false, 
      placeholder: "Select Request Type"}).addStyleClass("FormInputStyle DepotInput38px marginTop10");
		
		var RequestTypeVal = {	  
		key : [],
		description : []
		};		
		
		RequestTypeVal.key[0] = "";
		RequestTypeVal.key[1] = "USERID";
		RequestTypeVal.key[2] = "PASSWO";
		RequestTypeVal.key[3] = "PRESET";
		RequestTypeVal.description[0] = "";
		RequestTypeVal.description[1] = "Retrieve User ID";
		RequestTypeVal.description[2] = "Change Password";
		RequestTypeVal.description[3] = "Reset Password";
		
		for (var i=0; i < RequestTypeVal.key.length; i++) {
            var oItem = new sap.ui.core.ListItem(RequestTypeVal.key[i]);
            oItem.setText(RequestTypeVal.description[i]);
            oComboRequestType.addItem(oItem);
        }
		        		
		// ************* Drop Down Box Ends ************* //
		
		// Horizontal Line
		var vHDivider  = new sap.ui.commons.HorizontalDivider({id: "idHDividerE", width: "95%", type: "Area", height: "Medium", visible: false});
		var vHDivider1 = new sap.ui.commons.HorizontalDivider({id: "idHDivider1E", width: "95%", type: "Area", height: "Medium", visible: false});
		
		// ************* Form Starts ************* //
		
		// Label for User ID
		
		var oLabelUserID = new sap.ui.commons.Label({id: "idLabelUserID", text: "User ID",wrapping: true, required:true,
			  layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: false})}).addStyleClass("marginTop15");
		
		// Text Field for User ID

		var oTxtUserID = new sap.ui.commons.TextField("idTxtUserID",{
	    	placeholder:"User ID",
	    	maxLength: 12,
			liveChange:function(){
				this.setValueState(sap.ui.core.ValueState.None);
			},
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4"}),linebreak: false, margin: false
	    }).addStyleClass("FormInputStyle marginTop10 DepotInput38px");
				
		// Label for E-Mail
				
				var oLabelEMail = new sap.ui.commons.Label({text: "Email",wrapping: true, required:true,
					  layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: false})}).addStyleClass("marginTop15");
		
		// Text field for E-Mail
				
				var oTxtEMail = new sap.ui.commons.TextField("idTxtEMailE",{
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
				
				var oTxtCMail = new sap.ui.commons.TextField("idTxtCMailE",{
			    	placeholder:"Confirm E-Mail",
					liveChange:function(){
						this.setValueState(sap.ui.core.ValueState.None);
					},
					layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4"}),linebreak: false, margin: false
			    }).addStyleClass("FormInputStyle marginTop10 DepotInput38px");
				
		// Label for Old Password
				
				var oLabelOPassword = new sap.ui.commons.Label({id: "idLabelOPassword", text: "Old Password",wrapping: true, required:true,
					  layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: false})}).addStyleClass("marginTop15");
		
		// Text field for Old Password
				
	            var oTxtOPassword = new sap.ui.commons.PasswordField("idTxtOPassword",{/*value:"Admin@123",*/
	                   placeholder:"Old Password",
	                   maxLength: 40,
	                   layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4"}),linebreak: false, margin: false
	            }).addStyleClass("FormInputStyle marginTop10 DepotInput38px");
				
		// Label for Password
				
				var oLabelPassword = new sap.ui.commons.Label({id: "idLabelPassword", text: "New Password",wrapping: true, required:true,
					  layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: false})}).addStyleClass("marginTop15");
		
		// Text field for Password
				
	            var oTxtPassword = new sap.ui.commons.PasswordField("idTxtPassword",{/*value:"Admin@123",*/
	                   placeholder:"Password",
	                   maxLength: 40,
	                   layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4"}),linebreak: false, margin: false
	            }).addStyleClass("FormInputStyle marginTop10 DepotInput38px");
				
		// Label for Confirm Password
				
				var oLabelCPassword = new sap.ui.commons.Label({id: "idLabelCPassword",text: "Confirm Password",wrapping: true, required:true,
					  layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: false})}).addStyleClass("marginTop15");
		
		// Text field for Confirm Password
				
	            var oTxtCPassword = new sap.ui.commons.PasswordField("idTxtCPassword",{/*value:"Admin@123",*/
	                   placeholder:"Confirm Password",
	                   maxLength: 40,
	                   layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4"}),linebreak: false, margin: false
	            }).addStyleClass("FormInputStyle marginTop10 DepotInput38px");
						
	    // Note for password
	            
				var oLabelNPassword = new sap.ui.commons.Label(
						{id: "idLabelNPassword", visible: false,
							text: "Note: Password should be minimum 6 characters - includes at least one lowercase, one uppercase, one numeric digit and one special character.", wrapping: true, required:false,
					  layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: false})}).addStyleClass("marginTop10");
				
		// ************* Form Ends ************* //
		
				var oLabelMandatory = new sap.ui.commons.Label({text: "Mandatory Field",
					required: true,
					requiredAtBegin : true,
		            wrapping: true}).addStyleClass("marginTop10");
				
		// ************* Buttons Start*************** //
		// Submit
				
		    var oBtnSubmit = new sap.m.Button("idBtnSubmitE",{
		          text : "Submit",			// Changes from Add To Returns to submit MAC26092014+
		          styled:false,
		          width:"120px",
		          layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
		          press:function(){
		        	  busyDialog.open();
		          var oComboRequest = sap.ui.getCore().byId("idComboRequestType");
		    	  var oComboRequestType = oComboRequest.mProperties.selectedItemId;
		          oCurrent.submitForm(oComboRequestType);
		          busyDialog.close();
		          }}).addStyleClass("submitBtn");
	   // Space legend
		    
		    var oLabelSpace = new sap.ui.commons.Label( {text: " ",width : '8px'});
		    
	   // Reset 
		    
		    var oBtnReset = new sap.m.Button("idBtnResetE",{
		          text : "Reset",			// Changes from Add To Returns to submit MAC26092014+
		          styled:false,
		          width:"120px",
		          layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
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
				id : "idGetSupportButtonLayoutE", // sap.ui.core.ID
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
			
			var oGetSupportButton = new sap.ui.layout.form.Form("idGetSupportButtonE",{
	             layout: oGetSupportButtonLayout,
	             visible: false,
	             formContainers: [
	                     new sap.ui.layout.form.FormContainer("idGetSupportButtonC1E",{
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
				
				var oGetSupportRequestTypeLayout = new sap.ui.layout.form.ResponsiveGridLayout({
					id : "idGetSupportRequestTypeLayoutE", // sap.ui.core.ID
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
				
				var oGetSupportRequestType = new sap.ui.layout.form.Form("idGetSupportRequestTypeE",{
		             layout: oGetSupportRequestTypeLayout,
		             formContainers: [
		                     new sap.ui.layout.form.FormContainer("idGetSupportRequestTypeC1E",{
		                             title: "Request Type",
		                             formElements: [
													new sap.ui.layout.form.FormElement({
														//fields: [oFlexBoxRegion]
													    fields: [  oLabelRequestType, oComboRequestType ],
													}),										
		                                     ]
		                     })]
		     }); 
				
	    var oGetSupportFormLayout = new sap.ui.layout.form.ResponsiveGridLayout("idGetSupportFormLayoutE",{
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

	     var oGetSupportForm = new sap.ui.layout.form.Form("idGetSupportFormE",{
	             layout: oGetSupportFormLayout,
	             visible:false,
	             formContainers: [
	                     new sap.ui.layout.form.FormContainer("idGetSupportFormC1E",{
	                             title: "Logon Problems",
	                             formElements: [
												new sap.ui.layout.form.FormElement({
												    fields: [oLabelUserID, oTxtUserID]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oLabelEMail, oTxtEMail]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oLabelCMail, oTxtCMail]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oLabelOPassword, oTxtOPassword]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oLabelPassword, oTxtPassword]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oLabelCPassword, oTxtCPassword]
												}),
																					
	                                     ]
	                     })]
	     }); 
		
		var oFlexAll = new sap.m.FlexBox({ items: [ oGetSupportRequestType, vHDivider, oGetSupportForm, 
		                                            vHDivider1, oGetSupportButton, oLabelNPassword],  
	    direction: "Column", 
	    justifyContent : sap.m.FlexJustifyContent.Center
	    //layoutData: new sap.ui.layout.GridData({span: "L8 M8 S4",linebreak: false, margin: false})
	    });
	
	return oFlexAll;
},

	submitForm: function(type){
		var valid = oCurrent.validateFields(type);
		if(valid){
			if(type=='PASSWO'){
			var oComboRequest = sap.ui.getCore().byId("idComboRequestType");
			var oComboRequestType = oComboRequest.mProperties.selectedItemId;
			var oTxtUserID = sap.ui.getCore().byId("idTxtUserID").getValue();
			var oTxtEMail= sap.ui.getCore().byId("idTxtEMailE").getValue();
			var oTxtCMail = sap.ui.getCore().byId("idTxtCMailE").getValue();
			var oTxtOPassword = sap.ui.getCore().byId("idTxtOPassword").getValue();
			var oTxtPassword = sap.ui.getCore().byId("idTxtPassword").getValue();
			var oTxtCPassword = sap.ui.getCore().byId("idTxtCPassword").getValue();
	
	      	var filter = "/Getsupport_ExiUser?$filter=Cmail eq '"+oTxtCMail+
						 "' and Cpassword eq '"+oTxtCPassword+
						 "' and Email eq '"+oTxtEMail+
						 "' and Opassword eq '"+oTxtOPassword+
						 "' and Password eq '"+oTxtPassword+
						 "' and Rtype eq '"+oComboRequestType+
						 "' and Userid eq '"+oTxtUserID + "'&saml2=disabled";
	      	
			var oModel = new sap.ui.model.odata.ODataModel( auth_serviceUrl, false, "ZONLINE", "Seaco@123");
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
			    	var result = data.results[0].Message;
			    	if(result=='spec_issue'){
			    		result = "Your password reset is not successful. Please consider the following points:\n  - Your new password should not be any of your last five passwords\n  " +
			    				"- Your new password should satisfy the below criteria: It should\n" +
			    				"     - be of minimum 6 characters\n" +
			    				"     - include at least one lowercase\n" +
			    				"     - include at least one uppercase\n" +
			    				"     - include at least one numeric digit\n" +
			    				"     - include at least one special character";
			    	}
			    	sap.ui.commons.MessageBox.alert(result);
			    },
			    function(err){
			    	 busyDialog.close();
			    	errorfromServer(err);
			    	//alert("Error while Reading Result : "+ window.JSON.stringify(err.response));
			    });
			}
			else if(type=='USERID'){
			
				var oComboRequest = sap.ui.getCore().byId("idComboRequestType");
				var oComboRequestType = oComboRequest.mProperties.selectedItemId;
		
				var oTxtEMail= sap.ui.getCore().byId("idTxtEMailE").getValue();
				var oTxtCMail = sap.ui.getCore().byId("idTxtCMailE").getValue();
				
		      	/*var filter = "Getsupport_ExiUser?$filter=Email eq '"+oTxtEMail+
				 "' and Cmail eq '"+oTxtCMail+
				 "' and Rtype eq '"+oComboRequestType+"'";*/
		      	
		      	var filter = "/Getsupport_ExiUser?$filter=Cmail eq '"+oTxtCMail+
				 "' and Cpassword eq '' and Email eq '"+oTxtEMail+
				 "' and Opassword eq '' and Password eq '' and Rtype eq '"+oComboRequestType+
				 "' and Userid eq ''&saml2=disabled";
				
				var oModel = new sap.ui.model.odata.ODataModel( auth_serviceUrl,	false, "ZONLINE", "Seaco@123");
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
				    	var result = data.results[0].Message;
				    	sap.ui.commons.MessageBox.alert(result);
				    },
				    function(err){
				    	 busyDialog.close();
				    	 errorfromServer(err);
				    	//alert("Error while Reading Result : "+ window.JSON.stringify(err.response));
				    });
		}else if(type=='PRESET'){
			
			var oComboRequest = sap.ui.getCore().byId("idComboRequestType");
			var oComboRequestType = oComboRequest.mProperties.selectedItemId;
			var oTxtUserID = sap.ui.getCore().byId("idTxtUserID").getValue();
			var oTxtEMail= sap.ui.getCore().byId("idTxtEMailE").getValue();
			var oTxtCMail = sap.ui.getCore().byId("idTxtCMailE").getValue();
			var oTxtOPassword = sap.ui.getCore().byId("idTxtOPassword").getValue();
			var oTxtPassword = sap.ui.getCore().byId("idTxtPassword").getValue();
			var oTxtCPassword = sap.ui.getCore().byId("idTxtCPassword").getValue();
	
	      	var filter = "/Getsupport_ExiUser?$filter=Cmail eq '"+oTxtCMail+
						 "' and Cpassword eq '"+oTxtCPassword+
						 "' and Email eq '"+oTxtEMail+
						 "' and Opassword eq '"+oTxtOPassword+
						 "' and Password eq '"+oTxtPassword+
						 "' and Rtype eq '"+oComboRequestType+
						 "' and Userid eq '"+oTxtUserID + "'&saml2=disabled";
			
			var oModel = new sap.ui.model.odata.ODataModel( auth_serviceUrl,	false, "ZONLINE", "Seaco@123");
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
			    	var result = data.results[0].Message;
			    	sap.ui.commons.MessageBox.alert(result);
			    },
			    function(err){
			    	 busyDialog.close();
			    	 errorfromServer(err);
			    	//alert("Error while Reading Result : "+ window.JSON.stringify(err.response));
			    });
		}			
		}
	},

	resetForm: function(){
		var oTxtUserID = sap.ui.getCore().byId("idTxtUserID");
		var oTxtEMail= sap.ui.getCore().byId("idTxtEMailE");
		var oTxtCMail = sap.ui.getCore().byId("idTxtCMailE");
		var oTxtOPassword = sap.ui.getCore().byId("idTxtOPassword");
		var oTxtCPassword = sap.ui.getCore().byId("idTxtCPassword");
		var oTxtPassword = sap.ui.getCore().byId("idTxtPassword");
	
		oTxtUserID.setValue("");
		oTxtEMail.setValue("");
		oTxtCMail.setValue("");
		oTxtOPassword.setValue("");
		oTxtCPassword.setValue("");
		oTxtPassword.setValue("");
		
			oTxtEMail.removeStyleClass("redBackgrond redBorder");
			oTxtUserID.removeStyleClass("redBackgrond redBorder");
			oTxtCMail.removeStyleClass("redBackgrond redBorder");
			oTxtOPassword.removeStyleClass("redBackgrond redBorder");
			oTxtCPassword.removeStyleClass("redBackgrond redBorder");
			oTxtPassword.removeStyleClass("redBackgrond redBorder");
			
			oTxtUserID.setPlaceholder("User ID");
			oTxtEMail.setPlaceholder("E-Mail");
			oTxtCMail.setPlaceholder("Confirm E-Mail");
			oTxtOPassword.setPlaceholder("Old Password");
			oTxtCPassword.setPlaceholder("Password");
			oTxtPassword.setPlaceholder("Confirm Password");
	},

	validateFields: function(type){
		var valid = false;
		if(type=='PASSWO')
			{	
		var oTxtUserID = sap.ui.getCore().byId("idTxtUserID");
		var oTxtEMail= sap.ui.getCore().byId("idTxtEMailE");
		var oTxtCMail= sap.ui.getCore().byId("idTxtCMailE");
		var oTxtPassword = sap.ui.getCore().byId("idTxtPassword");
		var oTxtOPassword = sap.ui.getCore().byId("idTxtOPassword");
		var oTxtCPassword = sap.ui.getCore().byId("idTxtCPassword");
		
		if(oTxtUserID.getValue() && oTxtEMail.getValue() && oTxtCMail.getValue() 
				&& oTxtPassword.getValue() && oTxtCPassword.getValue()){
			valid = true;
			
			if(oTxtEMail.getValue().toLowerCase() != oTxtCMail.getValue().toLowerCase()){
				oTxtCMail.addStyleClass("redBackgrond redBorder");
				oTxtCMail.setValue("");
				oTxtCMail.setPlaceholder("Not matching with Email");
				valid = false;
			}
			else{
				oTxtCMail.removeStyleClass("redBackgrond redBorder");
				valid = true;
				if(oTxtPassword.getValue()){
					var passw = /^(?=.*\d)(?=.*[!@#$%^&*.])(?=.*[a-z])(?=.*[A-Z]).{6,}$/; 
					if(oTxtPassword.getValue().trim().match(passw)){
						oTxtPassword.setValueState(sap.ui.core.ValueState.None);
						oTxtPassword.setPlaceholder("New Password");
						valid = true;
					}
					else{
						oTxtPassword.setValueState(sap.ui.core.ValueState.Error);
						oTxtPassword.setValue("");
						oTxtCPassword.setValue("");
						oTxtPassword.setPlaceholder("Invalid Password");
						oTxtCPassword.setPlaceholder("Confirm Password");
						valid = false;
					}
				}
				else if(oTxtPassword.getValue() != oTxtCPassword.getValue()){
					oTxtPassword.addStyleClass("redBackgrond redBorder");
					oTxtPassword.setValue("");
					oTxtPassword.setPlaceholder("Passwords do not match!");
					oTxtCPassword.addStyleClass("redBackgrond redBorder");
					oTxtCPassword.setValue("");
					oTxtCPassword.setPlaceholder("Passwords do not match!");
					valid = false;
				}
				else{
					oTxtCPassword.removeStyleClass("redBackgrond redBorder");
					oTxtPassword.removeStyleClass("redBackgrond redBorder");
					valid = true;
				}
			}
		}
		if(!oTxtUserID.getValue()){
			oTxtUserID.addStyleClass("redBackgrond redBorder");
		}
		if(!oTxtEMail.getValue()){
			oTxtEMail.addStyleClass("redBackgrond redBorder");
		}
		if(!oTxtCMail.getValue()){
			oTxtCMail.addStyleClass("redBackgrond redBorder");
		}
		if(!oTxtOPassword.getValue()){
			oTxtOPassword.addStyleClass("redBackgrond redBorder");
		}
		if(!oTxtPassword.getValue()){
			oTxtPassword.addStyleClass("redBackgrond redBorder");
		}
		if(!oTxtCPassword.getValue()){
			oTxtCPassword.addStyleClass("redBackgrond redBorder");
		}
		if(oTxtUserID.getValue()){
			oTxtUserID.removeStyleClass("redBackgrond redBorder");
		}
		if(oTxtEMail.getValue()){
			oTxtEMail.removeStyleClass("redBackgrond redBorder");
		}
		if(oTxtCMail.getValue()){
			oTxtCMail.removeStyleClass("redBackgrond redBorder");
		}
		if(oTxtOPassword.getValue()){
			oTxtOPassword.removeStyleClass("redBackgrond redBorder");
		}
		if(oTxtPassword.getValue()){
			oTxtPassword.removeStyleClass("redBackgrond redBorder");
		}
		if(oTxtCPassword.getValue()){
			oTxtCPassword.removeStyleClass("redBackgrond redBorder");
		}
			
			}
		else{
	
			var oTxtEMail= sap.ui.getCore().byId("idTxtEMailE");
			var oTxtCMail= sap.ui.getCore().byId("idTxtCMailE");
			
			if(oTxtEMail.getValue() && oTxtCMail.getValue()){
				valid = true;
				
				if(oTxtEMail.getValue().toLowerCase() != oTxtCMail.getValue().toLowerCase()){
					oTxtCMail.addStyleClass("redBackgrond redBorder");
					oTxtCMail.setValue("");
					oTxtCMail.setPlaceholder("Not matching with Email");
					valid = false;
				}
			}
			
			if(!oTxtEMail.getValue()){
				oTxtEMail.addStyleClass("redBackgrond redBorder");
			}
			if(!oTxtCMail.getValue()){
				oTxtCMail.addStyleClass("redBackgrond redBorder");
			}
			
			if(oTxtEMail.getValue()){
				oTxtEMail.removeStyleClass("redBackgrond redBorder");
			}
			if(oTxtCMail.getValue()){
				oTxtCMail.removeStyleClass("redBackgrond redBorder");
			}
			
		}
		return valid;
	}
});
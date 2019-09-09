var aChngPswd = [];

sap.ui.model.json.JSONModel.extend("changePasswordView", {
	
	createChngPswdView: function(){
		var oCurrent= this;
		var validationMessage = "All fields are Mandatory. \n" +
				                "Password should be minimum 6 characters - include at least one lowercase, \n one uppercase, one numeric digit and one special character.";
		 var vTxtValidationMsg = new sap.m.Text({text: validationMessage}).addStyleClass("fontTitle");
		 var vTxtWelcome = new sap.m.Text({text: "Welcome To "}).addStyleClass("fontWelcomeRed");
         var lblSpaceLegend = new sap.ui.commons.Label( {text: " ",width : '5px'});
         var vTxtSeaweb = new sap.m.Text({text: " Seaweb"}).addStyleClass("fontWelcomeRed");
         var oFlexboxWelcome = new sap.m.FlexBox({
                  items: [
                    vTxtWelcome,lblSpaceLegend,
                    vTxtSeaweb
                  ],
                  direction: "Row"
                });
         
         
         var vUserImg = new sap.m.Image("idUserImg",{src:"images/login/Username_icon.png"});
         var vPswdImg = new sap.m.Image("idPswdImg",{src:"images/login/Password_icon.png"});
         
         var vtxtUsername = new sap.ui.commons.TextField("idtxtUserID",{/*value:"ztest_seadm",*/
                placeholder:"User ID"
         }).addStyleClass("marginTop10");
         vtxtUsername.focus();
         var vtxtOldPassword = new sap.ui.commons.PasswordField("idtxtOldPassword",{/*value:"Admin@123",*/
                placeholder:"Old Password",
                
         }).addStyleClass("marginTop10");
         var vtxtNewPassword = new sap.ui.commons.PasswordField("idtxtNewPassword",{/*value:"Admin@123",*/
             placeholder:"New Password",
             
      }).addStyleClass("marginTop10");
         var vtxtConfirmPassword = new sap.ui.commons.PasswordField("idtxtConfirmPassword",{/*value:"Admin@123",*/
             placeholder:"Confirm Password",
             
      }).addStyleClass("marginTop10");
         
        /* sap.ui.commons.PasswordField.prototype.onkeyup = function(e) {
             var k = e.which || e.keyCode;
                    if (k === jQuery.sap.KeyCodes.ENTER) {
                            oController.LogonBtnPress();
                    }
        }*/
         
        /* var oFlexboxUsername = new sap.m.FlexBox({
                  items: [
                    vUserImg,
                    vtxtUsername
                  ],
                  direction: "Row"
                }).addStyleClass("marginTop10");
         var oFlexboxPassword = new sap.m.FlexBox({
                  items: [
                    vPswdImg,
                    vtxtPassword
                  ],
                  direction: "Row"
                });*/
         
         var vLoginBtn = new sap.m.Button("idBtnSubmitChngPswd",{
                text:"Submit",
       type:sap.m.ButtonType.Unstyled,
       layoutData: new sap.ui.layout.GridData({span: "L4 M3 S4"}),
                press: function() {
                	if(oCurrent.validateFieldsForPswdChng())
                      oCurrent.submitChngPswd(); 
                }
         }).addStyleClass("submitBtn marginTop10");
         
         var vTxtLogonWarning = new sap.m.Text({text: "This website has been optimized for "}).addStyleClass("fontTitle marginTop10");
         var vTxtLogonWarningC = new sap.m.Text({text: "-Chrome 30.x.x onwards"}).addStyleClass("fontTitle");
         
         var isWarningVisible = false;
         var browserName = sap.ui.Device.browser;
         
         if(browserName.name == browserName.BROWSER.CHROME) // check if Browser is Chrome
         	isWarningVisible = false;
         else
         	isWarningVisible = true;
         
         var oFlexboxLogonWarning = new sap.m.FlexBox({
             items: [
               vTxtLogonWarning,
               vTxtLogonWarningC
             ],
             visible:isWarningVisible,
             //alignItems: sap.m.FlexAlignItems.Center,
             direction: "Column"
         }).addStyleClass("marginTop10");
         
         
         var oFlexboxLoginForm = new sap.m.FlexBox("idFlexChngPswd",{
                  items: [
                    oFlexboxWelcome,
                    vtxtUsername,
                    vtxtOldPassword,
                    vtxtNewPassword,
                    vtxtConfirmPassword,
                    vLoginBtn,
                    vTxtValidationMsg
                  ],
                  alignItems: sap.m.FlexAlignItems.Center,
                  direction: "Column"
                });
                                           
         oFlexboxLoginForm.placeAt("chngPswdForm");
	},
	validateFieldsForPswdChng: function(){
		var vUser = sap.ui.getCore().byId("idtxtUserID");
		var vOldPswd = sap.ui.getCore().byId("idtxtOldPassword");
		var vNewPswd = sap.ui.getCore().byId("idtxtNewPassword");
		var vConfirmPswd = sap.ui.getCore().byId("idtxtConfirmPassword");
		var isValid = true,isValidPswd = true;
		var ConfirmPswdFlag = true;
		var isValidFormat = true;
		var passw = /^(?=.*\d)(?=.*[!@#$%^&*.])(?=.*[a-z])(?=.*[A-Z]).{6,}$/; 
		
		if(vUser.getValue().trim().length == 0){
			vUser.setValueState(sap.ui.core.ValueState.Error);
			vUser.setValue("");
			vUser.setPlaceholder("Required");
			isValid = false;
		}
		
		if(vOldPswd.getValue().trim().length == 0){
			vOldPswd.setValueState(sap.ui.core.ValueState.Error);
			vOldPswd.setValue("");
			vOldPswd.setPlaceholder("Required");
			isValid = false;
		}
		
		if(vNewPswd.getValue().trim().length == 0){
			vNewPswd.setValueState(sap.ui.core.ValueState.Error);
			vNewPswd.setValue("");
			vNewPswd.setPlaceholder("Required");
			ConfirmPswdFlag = false;
		}
		if(vConfirmPswd.getValue().trim().length == 0){
			vConfirmPswd.setValueState(sap.ui.core.ValueState.Error);
			vConfirmPswd.setValue("");
			vConfirmPswd.setPlaceholder("Required");
			ConfirmPswdFlag = false;
		}
		
		
		if(ConfirmPswdFlag){
			if(vNewPswd.getValue().trim().match(passw)){
				vNewPswd.setValueState(sap.ui.core.ValueState.None);
				vNewPswd.setPlaceholder("New Password");
				isValidFormat = true;
			}
			else{
				vNewPswd.setValueState(sap.ui.core.ValueState.Error);
				vNewPswd.setValue("");
				vConfirmPswd.setValue("");
				vNewPswd.setPlaceholder("Invalid Password");
				vConfirmPswd.setPlaceholder("Confirm Password");
				isValidFormat = false;
			}
			
			if(isValidFormat){
				if((vNewPswd.getValue().trim() != vConfirmPswd.getValue().trim())){
					vNewPswd.setValueState(sap.ui.core.ValueState.Error);
					vNewPswd.setValue("");
					vNewPswd.setPlaceholder("Passwords do not match");
					
					vConfirmPswd.setValueState(sap.ui.core.ValueState.Error);
					vConfirmPswd.setValue("");
					vConfirmPswd.setPlaceholder("Passwords do not match");
					isValidPswd = false;
				}
				else{
					vNewPswd.setValueState(sap.ui.core.ValueState.None);
					vNewPswd.setPlaceholder("New Password");
					
					vConfirmPswd.setValueState(sap.ui.core.ValueState.None);
					vConfirmPswd.setPlaceholder("Confirm Password");
					isValidPswd = true;
				}
			}
			else{
				isValidPswd = false;
			}
		}
		else{
			isValidPswd = false;
		}
		
		if(isValid && isValidPswd){
			vUser.setValueState(sap.ui.core.ValueState.None);
			vUser.setPlaceholder("User ID");
			
			vOldPswd.setValueState(sap.ui.core.ValueState.None);
			vOldPswd.setPlaceholder("Old Password");
			return true;
		}
		else if(isValid && !isValidPswd)
			return false;
		else if(!isValid && isValidPswd)
			return false;
		else if(!isValid && !isValidPswd)
			return false;
	},
	
	submitChngPswd: function(){
		busyDialog.open();
		var vUser = sap.ui.getCore().byId("idtxtUserID").getValue();
		var vOldPswd = sap.ui.getCore().byId("idtxtOldPassword").getValue();
		var vNewPswd = sap.ui.getCore().byId("idtxtNewPassword").getValue();
		
		oModel = new sap.ui.model.odata.ODataModel(auth_serviceUrl, true,vUser,vOldPswd);
		var urlToCall = auth_serviceUrl + "/Password_Reset(Bname='" + vUser + "',Newpass='" + vNewPswd + "',Oldpass='" + vOldPswd + "')";
		OData.request({ 
		      requestUri: urlToCall,
		      method: "GET", 
		      dataType: 'json',
		      user: vUser, password: vOldPswd,
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
		    	aChngPswd = data;
		    	sap.ui.commons.MessageBox.alert(data.EReturn,fnRedirectToLogin);
		    },
		    function(err){
		    	 errorfromServer(err);
		    	//alert("Error while Reading Result : "+ : window.JSON.stringify(err.response));
		    });
	}
});

function fnRedirectToLogin(){
	
	if(aChngPswd.MsgType == "S"){
		window.open("index.html","_self");
	}
}
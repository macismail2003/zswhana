sap.ui.controller("view.DN_JS", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf view.DN_JS
*/
	
	resetFormData : function(){
		var ConfirmMessage = "This will reset all specified inputs.Do you want to continue?";
		 sap.ui.commons.MessageBox.show(ConfirmMessage,
  			  sap.ui.commons.MessageBox.Icon.WARNING,
  				"Warning",
                [sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO], 
                fnCallbackMessageBox1,
                sap.ui.commons.MessageBox.Action.YES);	
	},
    
	submitDnjsClicked :function(){
		var ovalid = new formValidations();
		var vcheck = ovalid.searchCrieteria();
		
		if(vcheck)
			{
			var ConfirmMessage = "You have input invalid unit number(s) for DN/JS.Please enter valid unit numbers(11-char alpha numeric like SEGU1234567) before retrying.";
			 sap.ui.commons.MessageBox.show(ConfirmMessage,
	  			  sap.ui.commons.MessageBox.Icon.WARNING,
	  				"Warning",
	                [sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO], 
	                fnCallbackMessageBox,
	                sap.ui.commons.MessageBox.Action.YES);	
			}
		
    }



//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf view.DN_JS
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf view.DN_JS
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf view.DN_JS
*/
//	onExit: function() {
//
//	}

});
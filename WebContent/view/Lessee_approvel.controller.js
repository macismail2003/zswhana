sap.ui.controller("view.Lessee_approvel", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf view.Lessee_approvel
*/
	
	submitAprEstClicked :function(){
		var ovad = new formValidations();
	    var vvalid = ovad.checkSelectCheckbox();
		 
	    if(vvalid)
	    	{
		var bus = sap.ui.getCore().getEventBus();
        bus.publish("nav", "to", {

             id : "LA_PrimaryDetail"

            }); 
	    } 
	else
		{
		 sap.ui.commons.MessageBox.alert("No DN/JS select for approval. Please select atleast 1 DN/JS for approval(by checking the checkbox against the required DN/JS) and retry.");
		}
	}	
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf view.Lessee_approvel
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf view.Lessee_approvel
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf view.Lessee_approvel
*/
//	onExit: function() {
//
//	}

});
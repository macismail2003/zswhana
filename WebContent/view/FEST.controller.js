var oJSONFESTExcelData = [];
var oFESTExcel = null;
var locationCodes = [];
var materialCodes = [];
var componentCodes = [];
var repairCodes = [];
var damageCodes = [];
var repdamCodes = [];

var locationSource = [];
var componentSource = [];
var repairSource = [];
var damageSource = [];
var materialSource = [];
/*excelDataJ1 = [
		     		["","","","","","","","","","","","",""],  
		     		["","","","","","","","","","","","",""], 
		     		["","","","","","","","","","","","",""],   
		     		["","","","","","","","","","","","",""],  
		     		["","","","","","","","","","","","",""], 
		     		["","","","","","","","","","","","",""],  
		     		["","","","","","","","","","","","",""], 
		     		["","","","","","","","","","","","",""],   
		     		["","","","","","","","","","","","",""],  
		     		["","","","","","","","","","","","",""], 
		     		["","","","","","","","","","","","",""],  
		     		["","","","","","","","","","","","",""], 
		     		["","","","","","","","","","","","",""],   
		     		["","","","","","","","","","","","",""],  
		     		["","","","","","","","","","","","",""], 
		     		["","","","","","","","","","","","",""],  
		     		["","","","","","","","","","","","",""], 
		     		["","","","","","","","","","","","",""],   
		     		["","","","","","","","","","","","",""],  
		     		["","","","","","","","","","","","",""], 
		     		]; */ 
		     		
sap.ui.controller("view.FEST", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf view.home
*/
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf view.home
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf view.home
*/
	onAfterRendering: function() {
			          		  
	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf view.home
*/
//	onExit: function() {
//
//	}
    
    /*FEST : Create Repair Completion Page */
    
	createFESTPage : function(){
        var oFEST = new fest();
        var oFESTpage = oFEST.createFESTPage();
		return oFESTpage;
    },
    
    
    
});

function wait(ms){
	   var start = new Date().getTime();
	   var end = start;
	   while(end < start + ms) {
	     end = new Date().getTime();
	  }
}
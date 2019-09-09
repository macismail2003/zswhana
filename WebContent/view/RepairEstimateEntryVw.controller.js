sap.ui.controller("view.RepairEstimateEntryVw", {
navButtonPress : function(evt) { 
		var bus = sap.ui.getCore().getEventBus();
		bus.publish("nav", "back");
		/*if(sap.ui.getCore().byId('CustomerDashboardVw') != undefined){
			sap.ui.getCore().byId('CustomerDashboardVw').destroy();
		}
		backClickCDB = true;
		bus.publish("nav", "to", {id : "CustomerDashboardVw"});*/
	},
/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf view.CorrectMoveDate
*/
//	onInit: function() {
//	
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf view.CorrectMoveDate
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf view.CorrectMoveDate
*/
	onAfterRendering: function() {       
        
        
        excelData = [
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
			     		];  
			     		
//			     		var data = function () {
//			     			   return Handsontable.helper.createSpreadsheetData(100, 12);
//			     		};
        				  var aResponsCode = [];
			     		  aResponsCode = 		[	  "", 
			     		                      //"J JS Allocation", 
			     		                      //"R Lessee Refused", 
			     		                      "O Owner", 
			     		                      "U User", 
			     		                      //"V Customer"
			     		                      ];
			     		                      //"H Manuf. Defect"];
			     		 
			     		  var container = document.getElementById('idRepairLines2');
			     		  oExcelGrid = new Handsontable(container, {  
			     	            data : excelData,  //binding the model
			     	            	//minSpareRows: 1,
			     	            	height: 495,
			     	            	//minRows: 5,
			     	            	rowHeaders: true,
			     	            	colHeaders: true,
			     	            	colHeaders: ["Location", // 0
			     	            	             "Component", // 1			     	            	             
			     	            	             "Damage",  // 2
			     	            	             "Material",  // 3
			     	            	             "Repair", // 4
			     							     "Rp.Length", // 5
			     							     "Rp.Width", // 6
			     							     "Qty", // 7
			     							     "Lab.Hrs", // 8
			     							     "Material Cost", // 9 
			     							     //"Lab. Rate", 
			     							     "Bulletin", // 10
			     							     "Responsibility"],   // 11
			     	            	contextMenu: true,
			     					columns: [
			     					  {
			     						  type: 'autocomplete',
			     						  source: locationSource,
			     						  width: 80,
			     						  strict: true
			     					  },
			     					  {
			     						  type: 'autocomplete',
			     						  source: componentSource,
			     						  width: 90,
			     						  strict: true
			     					  },
			     					 {
			     						  type: 'autocomplete',
			     						  source: damageSource,
			     						  width: 80,
			     						  strict: true
			     					  },
			     					 {
			     						  type: 'autocomplete',
			     						  source: materialSource,
			     						  width: 80,
			     						  strict: true
			     					  },
			     					  {
			     						  type: 'autocomplete',
			     						  source: repairSource,
			     						  width: 70,
			     						  strict: true
			     					  },
			     					  {
			     						  width: 80,
			     					  },
			     					  {
			     						  width: 80,
			     					  },
			     					  {type: 'numeric', width: 50},
//			     					  {
//			     						  width: 80,
//			     					  },
			     					  {
			     						  width: 80, 
			     					  },
			     					  {
			     						  width: 100,
			     					  },
			     					  {
			     						  width: 80,
			     					  },
			     					  {
			     						  type: 'autocomplete',
			     						  source: aResponsCode,
			     						  width: 160,
			     						  strict: true
			     					  },
//			     					  {		width: 150,
//			     					        type: 'handsontable',
//			     					        handsontable: {
//			     					          width: 150,
//			     					          colHeaders: ['', 'Responsibility'],
//			     					          data: aResponsCodeNew
//			     					        }
//			     					      },
			     					  ],
			     	            	//rowHeaders: true,
			     	            	manualColumnResize:true,
			     	            	autoColumnSize: {    
			     	            	    "samplingRatio": 23
			     	            	},
			     	        }); 
        
		
		
		  
//		  var oModel123 = new sap.ui.model.json.JSONModel();   
	      //oModel123.setData(data);  
	      //oExcelGrid.setModel(oModel123);	
		  
		  
		  
		  
		  
		  
		  

	        
	        
         
	},
	
/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf view.CorrectMoveDate
*/
//	onExit: function() {
//	}

});
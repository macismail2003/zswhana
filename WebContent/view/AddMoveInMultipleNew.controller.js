sap.ui.controller("view.AddMoveInMultipleNew", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf view.AddMoveInMultiple
*/
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf view.AddMoveInMultiple
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf view.AddMoveInMultiple
*/

// onAfterRendering: function() {
// 	var thedata = [
// 		{name:"Someguy Idontknow",address:"101 somestreet", city:"A City Name", state: "State Name" },
// 		{name:"Someguy Idontknow",address:"101 somestreet", city:"A City Name", state: "State Name" },
// 		{name:"Someguy Idontknow",address:"101 somestreet", city:"A City Name", state: "State Name" },
// 		{name:"Someguy Idontknow",address:"101 somestreet", city:"A City Name", state: "State Name" }  
// 		];
	
// 	console.log($.fn.jquery + "-" + Handsontable.version);
// 	var dataheaders = [
// 			"Name",
// 			"Addrr",
// 			"City",
// 			"State",
// 			""
// 		];
	
// 	var datacolumns = [
// 		{ readOnly: false, data: "name", width : "200px"},
// 		{ readOnly: false, data: "address"},
// 		{ readOnly: false, data: "city" },
// 		{ readOnly: false, data: "state"},
// 		{ readOnly: false, }
// 		];
	
	
// 	// Create a visible table
	
// 	var container = document.getElementById('idAddInExcel');
// 	// Create the hidden table
// 	oExcelGridAddIn = new Handsontable(container, {
// 			data: thedata,
// 			autoColumnSize: true,
// 			colHeaders: dataheaders,
// 			columns: datacolumns,
// 			// fixedRowsTop: 0,
// 			// fixedColumnsLeft: 0,
// 			// startRows: 10,
// 			// minSpareRows: 0,
// 			//observeDOMVisibility: true,
// 			//observeChanges:true,
// 		 // stretchH: 'all',
// 			rowHeaders: true     // Use Auto Headers 1, 2, 3...
// 	});
		
// 	},

	onAfterRendering: function() {
		excelDataAddIn = [
			["","","","No", "","","",""],  
			["","","","No", "","","",""], 
			["","","","No", "","","",""], 
			["","","","No", "","","",""], 
			["","","","No", "","","",""]
	 		];  
		
		var avlbDd = [	  "No", 
		              	  "Yes"
		             ];
		  
		var container = document.getElementById('idAddInExcel');
		  oExcelGridAddIn = new Handsontable(container, {  
	           data : excelDataAddIn,  //binding the model
	           	//minSpareRows: 1,
	           	height: 200,
	           	//minRows: 5,
	           	maxRows: 5,
	           	rowHeaders: true,
	           	colHeaders: true,
	           	colHeaders: ["Serial Number", // 0
	           	             "In Date(DD/MM/YYYY)", // 1			     	            	             
	           	             "Return Authorisation",  // 2
	           	             "Avlb", // 3
	           	             // "UN No.", // 4	// MAC21092017-
	           	             // "Last Clean Date(DD/MM/YYYY)", // 5			// MAC21092017-	     	            	             
	           	             // "Last Cargo Desc",  // 6	// MAC21092017-
	           	             // "Cleaning Proc. Desc" // 7	// MAC21092017-
	           	             ],   
	           	    contextMenu: false,
					columns: [
					  {
						  width: 130
					  },
					  {
						type: 'date',
						eFormat: 'DD/MM/YYYY',
				        correctFormat: false,
				        width: 180
					  },
					  {
						  width: 110
					  },
					  {
 						  type: 'dropdown',
 						  source: avlbDd,
 						 width: 70
 						  //width: 160,
 						  //strict: true
 					  },
 					  /* MAC21092017- */
 					  /*{
 						 width: 90
					  },
					  {
							type: 'date',
					        dateFormat: 'DD/MM/YYYY',
					        correctFormat: false,
					        width: 230
					  },
 					  {
							  width: 150
					  },
					  {
						  width: 150
					  }*/
 					 /* MAC21092017- */
					  ],
	           	//rowHeaders: true,
//	           	manualColumnResize:true,
//	           	autoColumnSize: {    
//	           	    "samplingRatio": 23
//	           	},
	       }); 
		  
		},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf view.AddMoveInMultiple
*/
//	onExit: function() {
//
//	}

});
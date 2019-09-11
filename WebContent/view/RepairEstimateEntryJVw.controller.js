/* MACALPHA19032018 - Changes done by Seyed Ismail on 19.03.2018 for Alpha Changes
1. Remove Unit Part Code information MACALPHA19032018_1
2. Add Lessor Survey and remove additional, superseding, pre sales, pre delivery MACALPHA19032018_2
3. Remove sale grade and add CW & Notes field MACALPHA19032018_3
4. Get the latest work order detail from SAP MACALPHA19032018_4
5. Show Labour Rate on screen MACALPHA19032018_5
6. Remove unwanted responsibility codes MACALPHA19032018_6
*/

// MAC_APS1157+
var aResponsCodeJ1 = [];
var aResponsCodeJ2 = [];
// MAC_APS1157+

sap.ui.controller("view.RepairEstimateEntryJVw", {
	navButtonPress: function (evt) {
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
	onAfterRendering: function () {

		excelDataJ1 = [
			["", "", "", "", "", "", "", "", "", "", "", "", ""],
			["", "", "", "", "", "", "", "", "", "", "", "", ""],
			["", "", "", "", "", "", "", "", "", "", "", "", ""],
			["", "", "", "", "", "", "", "", "", "", "", "", ""],
			["", "", "", "", "", "", "", "", "", "", "", "", ""],
			["", "", "", "", "", "", "", "", "", "", "", "", ""],
			["", "", "", "", "", "", "", "", "", "", "", "", ""],
			["", "", "", "", "", "", "", "", "", "", "", "", ""],
			["", "", "", "", "", "", "", "", "", "", "", "", ""],
			["", "", "", "", "", "", "", "", "", "", "", "", ""],
			["", "", "", "", "", "", "", "", "", "", "", "", ""],
			["", "", "", "", "", "", "", "", "", "", "", "", ""],
			["", "", "", "", "", "", "", "", "", "", "", "", ""],
			["", "", "", "", "", "", "", "", "", "", "", "", ""],
			["", "", "", "", "", "", "", "", "", "", "", "", ""],
			["", "", "", "", "", "", "", "", "", "", "", "", ""],
			["", "", "", "", "", "", "", "", "", "", "", "", ""],
			["", "", "", "", "", "", "", "", "", "", "", "", ""],
			["", "", "", "", "", "", "", "", "", "", "", "", ""],
			["", "", "", "", "", "", "", "", "", "", "", "", ""],
		];

		//			     		var data = function () {
		//			     			   return Handsontable.helper.createSpreadsheetData(100, 12);
		//			     		};
		aResponsCodeJ1 = []; // MAC_APS1157 removed var
		aResponsCodeJ1 = ["",
			// "J JS Allocation",	MACALPHA19032018_6-
			"O",
			"U",
			"I",
			//"S"
			// "V Customer"	MACALPHA19032018_6-
		];

		var containerJ1 = document.getElementById('idRepairLinesJH1');
		oExcelGridJ1 = new Handsontable(containerJ1, {
			data: excelDataJ1, //binding the model
			//minSpareRows: 1,
			height: 300,
			//minRows: 5,
			rowHeaders: true,
			colHeaders: true,
			colHeaders: ["Location", // 0
				"Component", // 1
				"Damage", // 2
				"Material", // 3
				"Repair", // 4
				"Rp.Length", // 5
				"Rp.Width", // 6
				"Qty", // 7
				"Lab.Hrs", // 8
				"Material Cost", // 9
				//"Lab. Rate",
				"Bulletin", // 10
				"Responsibility"
			], // 11
			contextMenu: true,
			columns: [{
					type: 'autocomplete',
					source: locationSource,
					width: 80,
					strict: true
				}, {
					type: 'autocomplete',
					source: componentSource,
					width: 90,
					strict: true
				}, {
					type: 'autocomplete',
					source: damageSource,
					width: 80,
					strict: true
				}, {
					type: 'autocomplete',
					source: materialSource,
					width: 80,
					strict: true
				}, {
					type: 'autocomplete',
					source: repairSource,
					width: 70,
					strict: true
				}, {
					width: 80,
				}, {
					width: 80,
				}, {
					type: 'numeric',
					width: 50
				},
				//			     					  {
				//			     						  width: 80,
				//			     					  },
				{
					width: 80,
				}, {
					width: 100,
				}, {
					width: 80,
				}, {
					type: 'autocomplete',
					source: aResponsCodeJ1,
					width: 160,
					strict: true
						//renderer : responsibilityRenderer
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
			manualColumnResize: true,
			autoColumnSize: {
				"samplingRatio": 23
			},
		});

		excelDataJ2 = [
			["", "", "", "", "", "", "", "", "", "", "", "", ""],
			["", "", "", "", "", "", "", "", "", "", "", "", ""],
			["", "", "", "", "", "", "", "", "", "", "", "", ""],
			["", "", "", "", "", "", "", "", "", "", "", "", ""],
			["", "", "", "", "", "", "", "", "", "", "", "", ""],
			["", "", "", "", "", "", "", "", "", "", "", "", ""],
			["", "", "", "", "", "", "", "", "", "", "", "", ""],
			["", "", "", "", "", "", "", "", "", "", "", "", ""],
			["", "", "", "", "", "", "", "", "", "", "", "", ""],
			["", "", "", "", "", "", "", "", "", "", "", "", ""],
			["", "", "", "", "", "", "", "", "", "", "", "", ""],
			["", "", "", "", "", "", "", "", "", "", "", "", ""],
			["", "", "", "", "", "", "", "", "", "", "", "", ""],
			["", "", "", "", "", "", "", "", "", "", "", "", ""],
			["", "", "", "", "", "", "", "", "", "", "", "", ""],
			["", "", "", "", "", "", "", "", "", "", "", "", ""],
			["", "", "", "", "", "", "", "", "", "", "", "", ""],
			["", "", "", "", "", "", "", "", "", "", "", "", ""],
			["", "", "", "", "", "", "", "", "", "", "", "", ""],
			["", "", "", "", "", "", "", "", "", "", "", "", ""],
		];

		//			    			     		var data = function () {
		//s			    			     			   return Handsontable.helper.createSpreadsheetData(100, 12);
		//			    			     		};
		aResponsCodeJ2 = []; // MAC_APS1157 removed var
		aResponsCodeJ2 = ["",

			// "J JS Allocation",	MACALPHA19032018_6-
			"O",
			"U",
			"I",
			//"S"
			// "V Customer"	MACALPHA19032018_6-
		];

		var containerJ2 = document.getElementById('idRepairLinesJH2');
		oExcelGridJ2 = new Handsontable(containerJ2, {
			data: excelDataJ2, //binding the model
			//minSpareRows: 1,
			height: 495,
			//minRows: 5,
			rowHeaders: true,
			colHeaders: true,
			colHeaders: ["Location", // 0
				"Component", // 1
				"Damage", // 2
				"Material", // 3
				"Repair", // 4
				"Rp.Length", // 5
				"Rp.Width", // 6
				"Qty", // 7
				"Lab.Hrs", // 8
				"Material Cost", // 9
				//"Lab. Rate",
				"Bulletin", // 10
				"Responsibility"
			], // 11
			contextMenu: true,
			columns: [{
				type: 'autocomplete',
				source: locationSource,
				width: 80,
				strict: true
			}, {
				type: 'autocomplete',
				source: componentSource,
				width: 90,
				strict: true
			}, {
				type: 'autocomplete',
				source: damageSource,
				width: 80,
				strict: true
			}, {
				type: 'autocomplete',
				source: materialSource,
				width: 80,
				strict: true
			}, {
				type: 'autocomplete',
				source: repairSource,
				width: 70,
				strict: true
			}, {
				width: 80,
			}, {
				width: 80,
			}, {
				type: 'numeric',
				width: 50
			}, {
				width: 80,
			}, {
				width: 100,
			}, {
				width: 80,
			}, {
				type: 'autocomplete',
				source: aResponsCodeJ2,
				width: 160,
				strict: true
					//renderer : responsibilityRenderer
			}],
			//rowHeaders: true,
			manualColumnResize: true,
			autoColumnSize: {
				"samplingRatio": 23
			},
		});

		//var oModel123 = new sap.ui.model.json.JSONModel();
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

var responsibilityRenderer = function (instance, td, row, col, prop, value, cellProperties) {
	if (!value) {
		td.innerHTML = "";
	} else {
		var responsibility = value;
		var responsibilityfirst = responsibility.substr(0, 1);
		if (!(isInArray(responsibilityfirst, ['O', 'U', 'I', 'S']))) {
			td.innerHTML = "";
		} else {
			td.innerHTML = value;
		}
	}
};

function isInArray(value, array) {
	return array.indexOf(value) > -1;
}
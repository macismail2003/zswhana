var oJSONFESTExcelData = [];
var oFESTSUMExcel = null;
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

sap.ui.controller("view.FESTSUM", {

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

		/* FESTSUM - Repair Completion - Excel - Setup */

				var container = document.getElementById('idFESTSUMExcel');
				oFESTSUMExcel = new Handsontable(container, {
							data : oJSONFITEMESTDET,  //binding the model
							minSpareRows: 5,
							height: 600,
							renderAllRows: true,
							renderAllColumns: true,
							//width: 500,
							//minRows: 5,
							//maxRows: 25,
							rowHeaders: true,
							colHeaders: true,
							colHeaders: ["Location", // 0
												 "Component", // 1
												 "Damage",  // 2
												 "Material",  // 3
												 "Repair", // 4
							 "Rp.Length", // 5
							 "Rp.Width", // 6
							 "UOM", // 7
							 "Qty", // 8
							 "Lab.Hrs", // 9
							 "Material Cost", // 10
							 "Responsibility", //11
							 "Lab. Rate", //12
							 "Bulletin", // 13
							 ],
								contextMenu: true,
					columns: [
						{
							width: 80,
							readOnly : true
						},
						{
							width: 80,
							 readOnly : true
						},
					 {
						 width: 80,
						 readOnly : true
						},
					 {
						 width: 80,
						 readOnly : true
						},
						{
							width: 80,
							readOnly : true
						},
						{
							width: 80,
							readOnly : true
						},
						{
							width: 80,
							readOnly : true
						},
						{
							width: 50,
							readOnly : true
						},
						{
							width: 80,
							readOnly : true
						},
						{
							width: 100,
							readOnly : true
						},
						{
							width: 120,
							readOnly : true
						},
						{
							width: 120,
							readOnly : true
						},
						],
						//rowHeaders: true,
						manualColumnResize:true,
						autoColumnSize: {
								"samplingRatio": 23
						},
						afterChange : function(event){
									/*sap.ui.getCore().byId("idFESTSUMButtonAdd5").setVisible(true);
									sap.ui.getCore().byId("idFESTSUMButtonValidate").setVisible(true);
									sap.ui.getCore().byId("idFESTSUMButtonSubmit").setVisible(true);
									sap.ui.getCore().byId("idFESTSUMButtonPrint").setVisible(true);*/
									}
				});

	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf view.home
*/
//	onExit: function() {
//
//	}

    /*FESTSUM : Create Repair Completion Page */

	createFESTSUMPage : function(){
        var oFESTSUM = new festsum();
        var oFESTSUMpage = oFESTSUM.createFESTSUMPage();
				return oFESTSUMpage;
    },



});

function wait(ms){
	   var start = new Date().getTime();
	   var end = start;
	   while(end < start + ms) {
	     end = new Date().getTime();
	}
}

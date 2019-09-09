sap.ui.jsview("view.RepairEstimateEntryJVw", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.CorrectMoveDate
	*/ 
	getControllerName : function() {
		return "view.RepairEstimateEntryJVw";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.CorrectMoveDate
	*/ 
	createContent : function(oController) {
 		
		var oRepairEstmtEntryJ = new RepairEstimateEntryJ();
		var mainLines = oRepairEstmtEntryJ.createRepairEstimateEntryForm();
		
		
		var oFlxMainREEntry = new sap.m.FlexBox("idFlxMainREEntryJ",{
	  	      items: [mainLines],
	  	      direction: "Column",
				  layoutData: new sap.ui.layout.GridData({span: "L12 M12 S12",linebreak: false, margin: false}),
	  	    });
		
		this.page = new sap.m.Page({
			showNavButton: false,				// page 2 should display a back button
			//navButtonPress: [ oController.navButtonPress, oController ],
			icon: "",
			content : [oFlxMainREEntry]
	});
	this.page.setShowHeader(false);
	this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
		
		return this.page;
	}

});
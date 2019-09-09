sap.ui.jsview("view.LesseeApprovalFPU", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.MovInFrmLease
	*/ 
	getControllerName : function() {
		return "view.LesseeApprovalFPU";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.MovInFrmLease
	*/ 
	createContent : function(oController) {
 		
		var oLesseeApprovalFPU = new lesseApprovalFPUView();
		var vLesseeApprovalForm = oLesseeApprovalFPU.createScreenLAFPU();
		oLesseeApprovalFPU.populateDepotNameLAFPU();
		this.page = new sap.m.Page({
		
			showNavButton: false,				// page 2 should display a back button
			icon: "",
			content : [vLesseeApprovalForm]
	});
	this.page.setShowHeader(false);
	this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
		
		return this.page;
	}

});
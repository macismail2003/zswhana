sap.ui.jsview("view.underConstruction", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.underConstruction
	*/ 
	getControllerName : function() {
		return "view.underConstruction";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.underConstruction
	*/ 
	createContent : function(oController) {
		
 		this.page =new  sap.m.Page({
			title: "Title",
			content: [
			          new sap.ui.commons.Label({text: "This page is under Construction"}).addStyleClass("fontTitleRed")
			]
		});
 		
 		this.page.setShowHeader(false);
		this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
		
		return this.page;
	}

});
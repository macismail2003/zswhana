sap.ui.jsview("view.FESTSUM", {

	/** Specifies the Controller belonging to this View.
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.home
	*/
	getControllerName : function() {
		return "view.FESTSUM";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed.
	* Since the Controller is given to this method, its event handlers can be attached right away.
	* @memberOf view.home
	*/
	createContent : function(oController) {

		/*************************************************************************************************/
		/*Gate In*/

		var oFESTSUMPage =  new sap.m.Page("idFESTSUMPage", {
		                                title: "Repair Estimates",
		                                enableScrolling: true,
		                                showHeader: false,
		                                navButtonTap : function(){
		                                	app.back();
                                        },
                                        showNavButton: true,
		                                content: [
		                                   oController.createFESTSUMPage()
		                                ]
		                                });
		appedi.addPage(oFESTSUMPage);
		var oFESTSUMButtonLogout = new sap.m.Button("idFESTSUMButtonLogout",{
		                                         text : "Logout",
		                                         styled:false,
		                                         width:"80px",
		                                         //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
		                                         press:function(){
		                                         jQuery.sap.require("sap.ui.commons.MessageBox");
		                                         sap.ui.commons.MessageBox.show("Exit?",
		                                                                        sap.ui.commons.MessageBox.Icon.WARNING,
		                                                                        "Logout",
		                                                                        [sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO],
		                                                                        oController.fnCallbackMessageBox,
		                                                                        sap.ui.commons.MessageBox.Action.YES
		                                                                        );

		                                         }}).addStyleClass("getListButton");
		oFESTSUMPage.addHeaderContent(oFESTSUMButtonLogout);
		/*************************************************************************************************/


 		return oFESTSUMPage;
	}

});

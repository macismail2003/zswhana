sap.ui.jsview("view.FLSA", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.home
	*/ 
	getControllerName : function() {
		return "view.FLSA";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.home
	*/ 
	createContent : function(oController) {
		
		/*************************************************************************************************/
		/*Gate In*/
		
		var oFLSAPage =  new sap.m.Page("idFLSAPage", {
		                                title: "Lessee Approval",
		                                enableScrolling: true,
		                                navButtonTap : function(){
		                                	app.back();
                                        },
                                        showNavButton: false,
                                        showHeader: false,
		                                content: [
		                                   oController.createFLSAPage()
		                                ]
		                                });
		appedi.addPage(oFLSAPage);
		var oFLSAButtonLogout = new sap.m.Button("idFLSAButtonLogout",{
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
		oFLSAPage.addHeaderContent(oFLSAButtonLogout);
		/*************************************************************************************************/
		
		
 		return oFLSAPage;
	}

});
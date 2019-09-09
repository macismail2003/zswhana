sap.ui.jsview("view.Userreg", {
  /** Specifies the Controller belonging to this View.
   * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
   * @memberOf zrough.Userreg
   */

  getControllerName: function() {
    return "view.Userreg";
  },

  /** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed.
   * Since the Controller is given to this method, its event handlers can be attached right away.
   * @memberOf view.Userreg
   */

  createContent : function(oController) {
		
		/*************************************************************************************************/
		/*MAINUSER Page*/
		
		var oMAINUSERPage =  new sap.m.Page("idMAINUSERPage", {
		                                title: "User Requests",
		                                enableScrolling: false,
		                                showHeader: false,
		                                content: [
		                                          oController.createMAINUSERPage()
		                                          ]
		                                });
		appuserreg.addPage(oMAINUSERPage);
		var oMAINUSERButtonLogout = new sap.m.Button("idMAINUSERButtonLogout",{
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
		oMAINUSERPage.addHeaderContent(oMAINUSERButtonLogout);
		/*************************************************************************************************/

		
		
 		return oMAINUSERPage;
  }
  
});

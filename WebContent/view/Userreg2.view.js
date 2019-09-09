var oUserregPage = new Userreg();
sap.ui.jsview("view.Userreg2", {
	/** Specifies the Controller belonging to this View.
	 * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	 * @memberOf zrough.Userreg2
	 */

	getControllerName: function () {
		return "view.Userreg2";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed.
	 * Since the Controller is given to this method, its event handlers can be attached right away.
	 * @memberOf view.Userreg2
	 */

	createContent: function (oController) {
		/*************************************************************************************************/

		/*USERREG Page*/

		var oUSERREGPage = new sap.m.Page("idUSERREGPage", {
			title: "User Requests",
			enableScrolling: true,
			showHeader: false,
			footer: new sap.m.Bar({
				id: "idUSERREGPageFooter",
				contentRight: [
					new sap.m.Button("idUSERREGPageFooterButtonSave", {
						text: "Save",
						type: sap.m.ButtonType.Default,
						visible: false,
						enabled: true,
						press: function (oEvent) {
							var oUserreg = new Userreg();
							oUserreg.createUser("S", undefined);
						}
					}),

					new sap.m.Button("idUSERREGPageFooterButtonCreate", {
						text: "Create",
						type: sap.m.ButtonType.Accept,
						visible: false,
						enabled: true,
						press: function (oEvent) {
							var oUserreg = new Userreg();
							oUserreg.createUser("C", undefined);
						}
					}),
					new sap.m.Button("idUSERREGPageFooterButtonReject", {
						text: "Reject",
						type: sap.m.ButtonType.Reject,
						enabled: true,
						visible: false,
						press: function (oEvent) {
							// debugger;
							// var oUserreg = new Userreg();
							// oUserreg.createUser("R", undefined);

							if (sap.ui.getCore().byId("idUserregDialogRejection"))
								sap.ui.getCore().byId("idUserregDialogRejection").destroy();

							busyDialog.open();
							var oUserregDialogRejection = new sap.m.Dialog("idUserregDialogRejection", {
								title: 'Reject',
								type: 'Standard',
								content: [oUserregPage.getRejectionContent()],
								beginButton: new sap.m.Button({
									text: 'Reject',
									type: sap.m.ButtonType.Reject,
									press: function () {
										oUserregPage.rejectRequest();
										this.getParent().close();
									}
								}),
								endButton: new sap.m.Button({
									text: 'Cancel',
									press: function () {
										this.getParent().close();
									}
								}),
								afterClose: function () {}
							});
							oUserregDialogRejection.open();

						}
					})
				]
			}),
			content: [oController.createUSERREGPage()]
		});
		//app.addPage(oUSERREGPage);
		var oUSERREGButtonLogout = new sap.m.Button("idUSERREGButtonLogout", {
			text: "Logout",
			styled: false,
			width: "80px",
			//layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
			press: function () {
				jQuery.sap.require("sap.ui.commons.MessageBox");
				sap.ui.commons.MessageBox.show(
					"Exit?",
					sap.ui.commons.MessageBox.Icon.WARNING,
					"Logout", [
						sap.ui.commons.MessageBox.Action.YES,
						sap.ui.commons.MessageBox.Action.NO
					],
					oController.fnCallbackMessageBox,
					sap.ui.commons.MessageBox.Action.YES
				);
			}
		}).addStyleClass("getListButton");
		oUSERREGPage.addHeaderContent(oUSERREGButtonLogout);
		/*************************************************************************************************/

		return oUSERREGPage;
	}

});
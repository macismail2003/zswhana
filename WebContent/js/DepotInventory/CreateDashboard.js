sap.ui.model.json.JSONModel.extend("CreateDashboard", {
	createDepotDashboard: function(){

		 
		 var oDepotInvLayout = new sap.ui.layout.form.ResponsiveGridLayout( {
			  labelSpanL: 1,
	          labelSpanM: 1,
	          labelSpanS: 1,
			  emptySpanL: 0,
	          emptySpanM: 0,
	          emptySpanS: 0,
	          columnsL: 2,
	          columnsM: 1,
	          columnsS: 1,
	          breakpointL: 887,
			  breakpointM: 320
		});
		 var oDepotInvForm = new sap.ui.layout.form.Form("idDepotInvForm",{
				layout: oDepotInvLayout,
				formContainers: [
							new sap.ui.layout.form.FormContainer("DDFC_LeftTop",{
								//title: "Depot Inventory",
								formElements: [
									new sap.ui.layout.form.FormElement("DDFE_LeftTop",{
										fields: [],
									})
								],
								visible:false
							}), 
							new sap.ui.layout.form.FormContainer("DDFC_RightTop",{
								//title: "Repair Inventory",
								formElements: [
									new sap.ui.layout.form.FormElement("DDFE_RightTop",{
										fields: [],
									})
								],
								visible:false
							}), 
							new sap.ui.layout.form.FormContainer("DDFC_LeftMiddle",{
								//title: "Active Releases - Top 5",
								formElements: [
									new sap.ui.layout.form.FormElement("DDFE_LeftMiddle",{
										fields: [], 
									})
								],
								visible:false,
								layoutData: new sap.ui.commons.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
							}), //FC3
							new sap.ui.layout.form.FormContainer("DDFC_RightMiddle",{
								//title: "Active Returns - Top 5",
								formElements: [
									new sap.ui.layout.form.FormElement("DDFE_RightMiddle",{
										fields: [], 
									})
								], 
								visible:false
							}), 
							new sap.ui.layout.form.FormContainer("DDFC_LeftBottom",{
								//title: "Performance by EDI Message Processing",
								formElements: [
									new sap.ui.layout.form.FormElement("DDFE_LeftBottom",{
										fields: [], 
									})
								],
								visible:false,
								layoutData: new sap.ui.commons.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
							}), 
							new sap.ui.layout.form.FormContainer("DDFC_RightBottom",{
								//title: "Performance by M & R",
								formElements: [
									new sap.ui.layout.form.FormElement("DDFE_RightBottom",{
										fields: [],
									})
								],
								visible:false
							}), 
				]
		 });
		 
		 return oDepotInvForm;

	},
	
	checkRole:function(){
		
		var screenAccessRoleWise = new loggedInU().filterLoggedInUserData("SCREEN");
		
		for(var i=0;i<screenAccessRoleWise.length;i++)
		
		for(var i=0;i<screenAccessRoleWise.length;i++){
			var dashItem;
			var formElement;

			if(screenAccessRoleWise[i].ScrView.trim() == "depot_inventory"){
				dashItem = new DashDepotInventory().createDepotDashboard();
				formElement = sap.ui.getCore().byId('DDFE_LeftTop');
				formElement.insertField(dashItem,0);
				sap.ui.getCore().byId("DDFC_LeftTop").setVisible(true);
			}else if (screenAccessRoleWise[i].ScrView.trim() == "repair_inventory"){
				dashItem = new DashRepairInventory().createRepairDashboard();
				formElement = sap.ui.getCore().byId('DDFE_RightTop');
				formElement.insertField(dashItem,0);
				sap.ui.getCore().byId("DDFC_RightTop").setVisible(true);
			}else if (screenAccessRoleWise[i].ScrView.trim() == "active_releases"){
				dashItem = new DashActiveRelease().createReleaseDashboard();
				formElement = sap.ui.getCore().byId('DDFE_LeftMiddle');
				formElement.insertField(dashItem,0);
				sap.ui.getCore().byId("DDFC_LeftMiddle").setVisible(true);
			}else if (screenAccessRoleWise[i].ScrView.trim() == "active_returns"){
				dashItem = new DashActiveReturn().createReturnDashboard();
				formElement = sap.ui.getCore().byId('DDFE_RightMiddle');
				formElement.insertField(dashItem,0);
				sap.ui.getCore().byId("DDFC_RightMiddle").setVisible(true);
			}else if (screenAccessRoleWise[i].ScrView.trim() == "edi"){
				dashItem = new DashEDI().createEDIDashboard();
				formElement = sap.ui.getCore().byId('DDFE_LeftBottom');
				formElement.insertField(dashItem,0);
				sap.ui.getCore().byId("DDFC_LeftBottom").setVisible(true);
			}else if (screenAccessRoleWise[i].ScrView.trim() == "mnr"){
				dashItem = new DashMNR().createMNRDashboard();
				formElement = sap.ui.getCore().byId('DDFE_RightBottom');
				formElement.insertField(dashItem,0);
				sap.ui.getCore().byId("DDFC_RightBottom").setVisible(true);
			}
			
		}
		
	}
});	


sap.ui.jsview("view.CustomerDashBoardReturnTotQtyDtlVw",
{
	getControllerName : function() {
					return "view.CustomerDashBoardReturnTotQtyDtlVw";
		},
	createContent : function(oController) {
		var oVbxCDBRetTotQtyDtl = new sap.m.VBox();
		
		var oBckCDBRetTotQtyDtl = new sap.m.Link({text: " < Back",
				width:"50px",wrapping:true,
				press: oController.navButtonPress});
		oVbxCDBRetTotQtyDtl.addItem(oBckCDBRetTotQtyDtl);
		
		var olblHdrCDBRetTotQtyDtl = new sap.ui.commons.Label({text: "My Active Returns - Total Quantity Details", wrapping: true}).addStyleClass("font15Bold marginTop10");
		//oVbxCDBRetTotQtyDtl.addItem(olblHdrCDBRetTotQtyDtl);
		
		var obtnExportExlCDBRetTotQtyDtl = new sap.m.Button("idbtnExportExlCDBRetTotQtyDtl",{
            text : "Export To Excel",
			visible:false,
            type:sap.m.ButtonType.Unstyled,
            icon: sap.ui.core.IconPool.getIconURI("excel-attachment"),
            press:function(){
            	var objUtil = new utility();
            	var arrDiplHdrExprtCDBRetDtlTotQty = ['Lease','Return','Unit Type','Location','Depot','Off-Hire Date', 'Unit Number'];
            	var arrDiplFieldExprtCDBRetDtlTotQty = ['LeaseNo','Ordno','UnitType','Location','DepotDesc','OffhireDate','Sernr'];
				objUtil.ExportUtility(jsnCustDBReturnsTotQtyDtl,arrDiplHdrExprtCDBRetDtlTotQty,arrDiplFieldExprtCDBRetDtlTotQty, "My Active Returns - Total Quantity Details","export");
            }
         }).addStyleClass("submitBtn");
		 
		var oflxbxCDBTotQty = new sap.m.FlexBox({
			  items:[olblHdrCDBRetTotQtyDtl],
			  width:"50%",
			  direction: "Row"
			 });//.addStyleClass("marginTop10");
		
		var oflxbxCDBTotQty1 = new sap.m.FlexBox({
			  items:[obtnExportExlCDBRetTotQtyDtl],
			  width:"50%",
			  direction: "RowReverse"
			 });//.addStyleClass("marginTop10");
		
		var oflxbxCDBTotQtyMain = new sap.m.FlexBox({
			  items:[oflxbxCDBTotQty, oflxbxCDBTotQty1],
			  width:"100%",
			  direction: "Row"
			 }).addStyleClass("marginTop10");
		
		oVbxCDBRetTotQtyDtl.addItem(oflxbxCDBTotQtyMain);
		
		var tblRetTotQtyDtl = this.createReturnTotQtyDetail().addStyleClass("marginTop10");
		oVbxCDBRetTotQtyDtl.addItem(tblRetTotQtyDtl);
		
		var obtnViwAllCDBRetTotQtyDtl = new sap.m.Button("idbtnViwAllCDBRetTotQtyDtl",{
                 text : "View All",
				 visible: false,
                 type:sap.m.ButtonType.Unstyled,
                 press:function(){
						this.setVisible(false);
						var oTblCDBRelPickDtl = sap.ui.getCore().byId("idTblCDBRetTotQtyDtl");
						
						if(jsnCustDBReturnsTotQtyDtl.length < 26){
							oTblCDBRelPickDtl.setVisibleRowCount(jsnCustDBReturnsTotQtyDtl.length);
							oTblCDBRelPickDtl.setNavigationMode(sap.ui.table.NavigationMode.None);
						}else if(jsnCustDBReturnsTotQtyDtl.length > 25){
							oTblCDBRelPickDtl.setVisibleRowCount(100);
							oTblCDBRelPickDtl.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
						}
                    }
              }).addStyleClass("submitBtn");
			  
		oVbxCDBRetTotQtyDtl.addItem(obtnViwAllCDBRetTotQtyDtl);
		
		//SET VISIBILITY BUTTONS
		if(jsnCustDBReturnsTotQtyDtl.length == 0){
			obtnViwAllCDBRetTotQtyDtl.setVisible(false);
			obtnExportExlCDBRetTotQtyDtl.setVisible(false);
		}else if(jsnCustDBReturnsTotQtyDtl.length < 26){
			obtnViwAllCDBRetTotQtyDtl.setVisible(false);
			obtnExportExlCDBRetTotQtyDtl.setVisible(true);
		}else if(jsnCustDBReturnsTotQtyDtl.length > 25){
			obtnViwAllCDBRetTotQtyDtl.setVisible(true);
			obtnExportExlCDBRetTotQtyDtl.setVisible(true);
		 }
		 
		//CREATE PAGE FOR THIS VIEW
		this.page = new sap.m.Page({
				//title: "{i18n>page2Title}",
				showNavButton: false,				// page 2 should display a back button
				//navButtonPress: [ oController.navButtonPress, oController ],
				icon: "",
				content : [oVbxCDBRetTotQtyDtl]
		});
		this.page.setShowHeader(false);
		this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
		
		// done
		return this.page;
	},
		
	createReturnTotQtyDetail: function(){
		var oidTblCDBRetTotQtyDtl = new sap.ui.table.Table("idTblCDBRetTotQtyDtl",{
			visibleRowCount: 1,
			columnHeaderHeight: 45,
			selectionMode: sap.ui.table.SelectionMode.None,
			width:"100%"}).addStyleClass('tblBorder');
		
		oidTblCDBRetTotQtyDtl.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Lease"}),
			template: new sap.ui.commons.TextView().bindProperty("text", "LeaseNo"),
			sortProperty: "LeaseNo",
			filterProperty: "LeaseNo",width:"70px",resizable:false}));
		
		oidTblCDBRetTotQtyDtl.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Return"}),
			template: new sap.ui.commons.TextView().bindProperty("text", "Ordno"),
			sortProperty: "Ordno",
			filterProperty: "Ordno",width:"70px",resizable:false}));
		
		
		oidTblCDBRetTotQtyDtl.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Unit Type"}),
			template: new sap.ui.commons.TextView().bindProperty("text", "UnitType"),
			sortProperty: "UnitType",
			filterProperty: "UnitType",width:"80px",resizable:false}));
		
		oidTblCDBRetTotQtyDtl.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Location"}),
			template: new sap.ui.commons.TextView().addStyleClass('wraptext').bindProperty("text", "Location"),
			sortProperty: "Location",
			filterProperty: "Location",width:"125px",resizable:false}));
			
		oidTblCDBRetTotQtyDtl.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Depot"}),
			template: new sap.ui.commons.TextView().addStyleClass('wraptext').bindProperty("text", "DepotDesc"),
			sortProperty: "DepotDesc",
			filterProperty: "DepotDesc",width:"150px",resizable:false}));
		
		oidTblCDBRetTotQtyDtl.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Off-Hire Date",textAlign :sap.ui.core.TextAlign.End}),
			template: new sap.ui.commons.TextView({textAlign :sap.ui.core.TextAlign.End}).bindProperty("text", "OffhireDate"),
			sortProperty: "OffhireDateCDBRetSort",
			filterProperty: "OffhireDate",width:"100px",resizable:false}));
		
		oidTblCDBRetTotQtyDtl.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Unit Number"}),
			template: new sap.ui.commons.TextView().bindProperty("text", "Sernr"),
			sortProperty: "Sernr",
			filterProperty: "Sernr",width:"100px",resizable:false}));
		
		var oModelCDBRelPickDtl = new sap.ui.model.json.JSONModel();
		oModelCDBRelPickDtl.setData(jsnCustDBReturnsTotQtyDtl);
						
		oidTblCDBRetTotQtyDtl.setModel(oModelCDBRelPickDtl);
		oidTblCDBRetTotQtyDtl.bindRows("/");
		if(jsnCustDBReturnsTotQtyDtl.length < 1){
			oidTblCDBRetTotQtyDtl.setVisibleRowCount(5);
		}
		if((jsnCustDBReturnsTotQtyDtl.length > 0) && (jsnCustDBReturnsTotQtyDtl.length < 26)){
			oidTblCDBRetTotQtyDtl.setVisibleRowCount(jsnCustDBReturnsTotQtyDtl.length);
			oidTblCDBRetTotQtyDtl.setNavigationMode(sap.ui.table.NavigationMode.None);
		 }else if(jsnCustDBReturnsTotQtyDtl.length > 25){
			oidTblCDBRetTotQtyDtl.setVisibleRowCount(25);
			oidTblCDBRetTotQtyDtl.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		 }
		return oidTblCDBRetTotQtyDtl;
	},
});
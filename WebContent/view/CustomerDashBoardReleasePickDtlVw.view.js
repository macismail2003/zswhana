sap.ui.jsview("view.CustomerDashBoardReleasePickDtlVw",
{
	getControllerName : function() {
					return "view.CustomerDashBoardReleasePickDtlVw";
		},
	createContent : function(oController) {
		var oVbxCDBRelPickDtl = new sap.m.VBox();
		
		var oBckCDBRelPickDtl = new sap.m.Link({text: " < Back",
				width:"50px",wrapping:true,
				press: oController.navButtonPress});
		oVbxCDBRelPickDtl.addItem(oBckCDBRelPickDtl);
		
		var olblHdrCDBRelPickDtl = new sap.ui.commons.Label({text: "My Active Releases - Pick Details", wrapping: true}).addStyleClass("font15Bold marginTop10");
		
		var obtnExportExlCDBRelPickDtl = new sap.m.Button("idbtnExportExlCDBRelPickDtl",{
            text : "Export To Excel",
			visible:false,
            type:sap.m.ButtonType.Unstyled,
            icon: sap.ui.core.IconPool.getIconURI("excel-attachment"),
            press:function(){
            	var objUtil = new utility();
            	var arrDiplHdrExprtCDBRelPickDtl = ['Lease','Release','Unit Type','Location','Depot','On-Hire Date', 'Unit Number'];
            	var arrDiplFieldExprtCDBRelPickDtl = ['LeaseNo','Authno','UnitType','City','Depotname','OnhireDate','Sernr'];
				objUtil.ExportUtility(jsnCustDBReleasePickDtl,arrDiplHdrExprtCDBRelPickDtl,arrDiplFieldExprtCDBRelPickDtl, "My Active Releases - Pick Details","export");
            }
         }).addStyleClass("submitBtn");
		 
		var oflxHdrCDBRelvw1 = new sap.m.FlexBox({
			  items:[olblHdrCDBRelPickDtl],
			  width:"70%",
			  direction: "Row"
			 });//.addStyleClass("marginTop10");
		
		var oflxHdrCDBRelvw2 = new sap.m.FlexBox({
			  items:[obtnExportExlCDBRelPickDtl],
			  width:"30%",
			  direction: "RowReverse"
			 });//.addStyleClass("marginTop10");
		
		var oflxHdrCDBRelvwMain = new sap.m.FlexBox({
			  items:[oflxHdrCDBRelvw1, oflxHdrCDBRelvw2],
			  width:"100%",
			  direction: "Row"
			 }).addStyleClass("marginTop10");
		
		oVbxCDBRelPickDtl.addItem(oflxHdrCDBRelvwMain);
		
		var tblRelPickDtl = this.createReleasePickDetail().addStyleClass("marginTop10");
		oVbxCDBRelPickDtl.addItem(tblRelPickDtl);
		
		var obtnViwAllCDBRelPickDtl = new sap.m.Button("idbtnViwAllCDBRelPickDtl",{
                 text : "View All",
				 visible: false,
                 type:sap.m.ButtonType.Unstyled,
                 press:function(){
						this.setVisible(false);
						var oTblCDBRelPickDtl = sap.ui.getCore().byId("idTblCDBRelPickDtl");
						
						if(jsnCustDBReleasePickDtl.length < 101){
							oTblCDBRelPickDtl.setVisibleRowCount(jsnCustDBReleasePickDtl.length);
							oTblCDBRelPickDtl.setNavigationMode(sap.ui.table.NavigationMode.None);
						}else if(jsnCustDBReleasePickDtl.length > 100){
							oTblCDBRelPickDtl.setVisibleRowCount(100);
							oTblCDBRelPickDtl.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
						}
                    }
              }).addStyleClass("submitBtn");
			  
		oVbxCDBRelPickDtl.addItem(obtnViwAllCDBRelPickDtl);
		
		//SET VISIBILITY BUTTONS
		if(jsnCustDBReleasePickDtl.length == 0){
			obtnViwAllCDBRelPickDtl.setVisible(false);
			obtnExportExlCDBRelPickDtl.setVisible(false);
		}else if(jsnCustDBReleasePickDtl.length < 26){
			obtnViwAllCDBRelPickDtl.setVisible(false);
			obtnExportExlCDBRelPickDtl.setVisible(true);
		}else if(jsnCustDBReleasePickDtl.length > 25){
			obtnViwAllCDBRelPickDtl.setVisible(true);
			obtnExportExlCDBRelPickDtl.setVisible(true);
		 }
		 
		//CREATE PAGE FOR THIS VIEW
		this.page = new sap.m.Page({
				//title: "{i18n>page2Title}",
				showNavButton: false,				// page 2 should display a back button
				//navButtonPress: [ oController.navButtonPress, oController ],
				icon: "",
				content : [oVbxCDBRelPickDtl]
		});
		this.page.setShowHeader(false);
		this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
		
		// done
		return this.page;
	},
		
	createReleasePickDetail: function(){
		var oCustDBoardRelPickDtlTbl = new sap.ui.table.Table("idTblCDBRelPickDtl",{
			visibleRowCount: 1,
			columnHeaderHeight: 45,
			selectionMode: sap.ui.table.SelectionMode.None,
			width:"100%"}).addStyleClass('tblBorder');
		
		oCustDBoardRelPickDtlTbl.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Lease"}),
			template: new sap.ui.commons.TextView().bindProperty("text", "LeaseNo"),
			sortProperty: "LeaseNo",
			filterProperty: "LeaseNo",
				resizable:false,width:"70px"}));
		
		oCustDBoardRelPickDtlTbl.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Release"}),
			template: new sap.ui.commons.TextView().bindProperty("text", "Authno"),
			sortProperty: "Authno",
			filterProperty: "Authno",
			resizable:false,width:"70px"}));
		
		
		oCustDBoardRelPickDtlTbl.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Unit Type"}),
			template: new sap.ui.commons.TextView().bindProperty("text", "UnitType"),
			sortProperty: "UnitType",
			filterProperty: "UnitType",
			resizable:false,width:"90px"}));
		
		oCustDBoardRelPickDtlTbl.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Location"}),
			template: new sap.ui.commons.TextView().addStyleClass('wraptext').bindProperty("text", "City"),
			sortProperty: "City",
			filterProperty: "City",
			resizable:false,width:"125px"}));
			
		oCustDBoardRelPickDtlTbl.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Depot"}),
			template: new sap.ui.commons.TextView().addStyleClass('wraptext').bindProperty("text", "Depotname"),
			sortProperty: "Depotname",
			filterProperty: "Depotname",
			resizable:false,width:"150px"}));
		
		oCustDBoardRelPickDtlTbl.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.TextView({ text: "On-Hire Date",textAlign :sap.ui.core.TextAlign.End}).addStyleClass('sapUiLbl'),
			template: new sap.ui.commons.TextView({textAlign :sap.ui.core.TextAlign.End}).bindProperty("text", "OnhireDate"),
			sortProperty: "OnhireDateCDBMARelSort",
			filterProperty: "OnhireDate",
			resizable:false,width:"85px"}));
		
		oCustDBoardRelPickDtlTbl.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Unit Number"}),
			template: new sap.ui.commons.TextView().bindProperty("text", "Sernr"),
			sortProperty: "Sernr",
			filterProperty: "Sernr",
			resizable:false,width:"100px"}));
		
		var oModelCDBRelPickDtl = new sap.ui.model.json.JSONModel();
		oModelCDBRelPickDtl.setData(jsnCustDBReleasePickDtl);
						
		oCustDBoardRelPickDtlTbl.setModel(oModelCDBRelPickDtl);
		oCustDBoardRelPickDtlTbl.bindRows("/");
		
		if(jsnCustDBReleasePickDtl.length < 1){
			oCustDBoardRelPickDtlTbl.setVisibleRowCount(5);
		}
		if((jsnCustDBReleasePickDtl.length > 0) && (jsnCustDBReleasePickDtl.length < 26)){
			oCustDBoardRelPickDtlTbl.setVisibleRowCount(jsnCustDBReleasePickDtl.length);
			oCustDBoardRelPickDtlTbl.setNavigationMode(sap.ui.table.NavigationMode.None);
		 }else if(jsnCustDBReleasePickDtl.length > 25){
			oCustDBoardRelPickDtlTbl.setVisibleRowCount(25);
			oCustDBoardRelPickDtlTbl.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		 }
		return oCustDBoardRelPickDtlTbl;
	},
});
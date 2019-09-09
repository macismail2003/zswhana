var jsnCustDBoardReleaseTbl =[];
sap.ui.jsview("view.CustOutReturnDtlReportVw",
{
	getControllerName : function() {
					return "view.CustOutReturnDtlReportVw";
		},
	createContent : function(oController) {
		var oVbxCORetDReport = new sap.m.VBox("idVbxCORetDReport",{width:"99%"});
		
		var oBckCORetDReport = new sap.m.Link("idBckCORetDReport", {text: " < Back",
				width:"50px",wrapping:true,
				press: oController.navButtonPress});
		oVbxCORetDReport.addItem(oBckCORetDReport);
		
		var olblHdrCORetDReport = new sap.ui.commons.Label("idlblHdrTblCORetDtlReport",{wrapping: true}).addStyleClass("font15Bold marginTop10");
		
		var obtnExportExlCORetDtlReport = new sap.m.Button("idbtnExportExlCORetDtlReport",{
            text : "Export To Excel",
			visible:false,
            type:sap.m.ButtonType.Unstyled,
            //icon: sap.ui.core.IconPool.getIconURI("excel-attachment"),
            icon: sap.ui.core.IconPool.getIconURI("excel-attachment"),
            press:function(){
            	var idTblCORetDtlReport = sap.ui.getCore().byId("idTblCORetDtlReport");
				var tblMdlData = idTblCORetDtlReport.getModel().getData();
				
            	var objUtil = new utility();
            	var arrDiplHdrExprt = ['Lease','Return','Unit Description','Location','Depot','Off-Hire Date', 'Unit Number'];
            	var arrDiplFieldExprt = ['Lease','Ordno','UnitDesc','Location','Depot','OffDate','Sernr'];
				objUtil.ExportUtility(tblMdlData,arrDiplHdrExprt,arrDiplFieldExprt, tblMdlData[0].TblHdr, "export");
            }
         }).addStyleClass("submitBtn");
		 
		var oflxHdrCORetDReport = new sap.m.FlexBox({
			  items:[olblHdrCORetDReport],
			  width:"70%",
			  direction: "Row"
			 });//.addStyleClass("marginTop10");
		
		var oflxHdrCORetDReport2 = new sap.m.FlexBox({
			  items:[obtnExportExlCORetDtlReport],
			  width:"30%",
			  direction: "RowReverse"
			 });//.addStyleClass("marginTop10");
		
		var oflxHdrCORetDReportMain = new sap.m.FlexBox({
			  items:[oflxHdrCORetDReport, oflxHdrCORetDReport2],
			  width:"100%",
			  direction: "Row"
			 }).addStyleClass("marginTop10");
		
		oVbxCORetDReport.addItem(oflxHdrCORetDReportMain);
		
		
		//oVbxCORetDReport.addItem(oflxbxExportCDBMARelDv);
		
		var tblRelActDtl = this.createCustOutRelRptDetail();
		oVbxCORetDReport.addItem(tblRelActDtl);
		
		var obtnViwAllCORetDReport = new sap.m.Button("idbtnViwAllCORetDtlReport",{
                 text : "View All",
				 visible: false,
                 type:sap.m.ButtonType.Unstyled,
                 press:function(){
						this.setVisible(false);
						var idTblCORetDtlReport = sap.ui.getCore().byId("idTblCORetDtlReport");
						var tblMdlData = idTblCORetDtlReport.getModel().getData();
						
						if(tblMdlData.length < 100){
							idTblCORetDtlReport.setVisibleRowCount(tblMdlData.length);
							idTblCORetDtlReport.setNavigationMode(sap.ui.table.NavigationMode.None);
						}else{
							idTblCORetDtlReport.setVisibleRowCount(100);
							idTblCORetDtlReport.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
						}
                    }
              }).addStyleClass("submitBtn marginTop10");
			  
		oVbxCORetDReport.addItem(obtnViwAllCORetDReport);
		
		oVbxCORetDReport.addItem(new sap.ui.commons.TextView({text:' '}));
		
		//CREATE PAGE FOR THIS VIEW
		this.page = new sap.m.Page({
				//title: "{i18n>page2Title}",
				showNavButton: false,				// page 2 should display a back button
				//navButtonPress: [ oController.navButtonPress, oController ],
				icon: "",
				content : [oVbxCORetDReport]
		});
		this.page.setShowHeader(false);
		this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
		
		// done
		return this.page;
	},
		
	createCustOutRelRptDetail: function(){
		var oTblCORetDtlReport = new sap.ui.table.Table("idTblCORetDtlReport",{
			visibleRowCount: 1,
			columnHeaderHeight: 30,
			selectionMode: sap.ui.table.SelectionMode.None,
			width:"100%"}).addStyleClass('tblBorder marginTop10');
		
		oTblCORetDtlReport.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Lease"}).addStyleClass("wraptextcol"),
			template: new sap.ui.commons.TextView().bindProperty("text", "Lease"),
			sortProperty: "Lease",
			filterProperty: "Lease",resizable:false,width:'70px'}));
		
		oTblCORetDtlReport.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Return"}).addStyleClass("wraptextcol"),
			template: new sap.ui.commons.TextView().bindProperty("text", "Ordno"),
			sortProperty: "Ordno",
			filterProperty: "Ordno",resizable:false,width:'70px'}));
		
		oTblCORetDtlReport.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Unit Description"}).addStyleClass("wraptextcol"),
			template: new sap.ui.commons.TextView().bindProperty("text", "UnitDesc"),
			sortProperty: "UnitDesc",
			filterProperty: "UnitDesc",resizable:false,width:'125px'}));
		
		oTblCORetDtlReport.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Location"}).addStyleClass("wraptextcol"),
			template: new sap.ui.commons.TextView().bindProperty("text", "Location"),
			sortProperty: "Location",
			filterProperty: "Location",resizable:false,width:'125px'}));
			
		oTblCORetDtlReport.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Depot"}).addStyleClass("wraptextcol"),
			template: new sap.ui.commons.TextView().addStyleClass('wraptext').bindProperty("text", "Depot"),
			sortProperty: "Depot",
			filterProperty: "Depot",resizable:false,wrapping: true,width:'150px'}));
		
		oTblCORetDtlReport.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Off-Hire Date"}).addStyleClass("wraptextcol"),
			template: new sap.ui.commons.TextView().bindProperty("text", "OffDate"),
			sortProperty: "OffDateSort",
			filterProperty: "OffDate",resizable:false,width:'98px'}));
		
		oTblCORetDtlReport.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Unit Number"}).addStyleClass("wraptextcol"),
			template: new sap.ui.commons.TextView().bindProperty("text", "Sernr"),
			sortProperty: "Sernr",
			filterProperty: "Sernr",resizable:false,width:'95px'}));
			
		return oTblCORetDtlReport;
	},
});
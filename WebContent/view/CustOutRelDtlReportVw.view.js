var jsnCustDBoardReleaseTbl =[];
sap.ui.jsview("view.CustOutRelDtlReportVw",
{
	getControllerName : function() {
					return "view.CustOutRelDtlReportVw";
		},
	createContent : function(oController) {
		var oVbxCORDReport = new sap.m.VBox("idVbxCORDReport",{width:'99%'});
		
		var oBckCORDReport = new sap.m.Link("idBckCORDReport", {text: " < Back",
				width:"50px",wrapping:true,
				press: oController.navButtonPress});
		oVbxCORDReport.addItem(oBckCORDReport);
		
		var olblHdrCORDReport = new sap.ui.commons.Label("idlblHdrTblCORDtl",{wrapping: true}).addStyleClass("font15Bold marginTop10");
		
		var obtnExportExlCORDtlReport = new sap.m.Button("idbtnExportExlCORDtlReport",{
            text : "Export To Excel",
			visible:false,
            type:sap.m.ButtonType.Unstyled,
            icon: sap.ui.core.IconPool.getIconURI("excel-attachment"),
            press:function(){
            	var objUtil = new utility();
            	var idTblCORDtlReport = sap.ui.getCore().byId("idTblCORDtlReport");
				var tblMdlData = idTblCORDtlReport.getModel().getData();
				
            	var arrDiplHdrExprtCDBRelDtl = ['Lease','Release','Unit Description','Location','Depot','On-Hire Date', 'Unit Number'];
            	var arrDiplFieldExprtCDBRelDtl = ['LeaseNo','ReleaseAuth','UnitDesc','Location','Depot','OnHireDate','UnitNumber'];
				objUtil.ExportUtility(tblMdlData,arrDiplHdrExprtCDBRelDtl,arrDiplFieldExprtCDBRelDtl, tblMdlData[0].TblHdr,"export");
            }
         }).addStyleClass("submitBtn");
		 
		var oflxHdrCORDReport = new sap.m.FlexBox({
			  items:[olblHdrCORDReport],
			  width:"70%",
			  direction: "Row"
			 });//.addStyleClass("marginTop10");
		
		var oflxHdrCORDReport2 = new sap.m.FlexBox({
			  items:[obtnExportExlCORDtlReport],
			  width:"30%",
			  direction: "RowReverse"
			 });//.addStyleClass("marginTop10");
		
		var oflxHdrCORDReportMain = new sap.m.FlexBox({
			  items:[oflxHdrCORDReport, oflxHdrCORDReport2],
			  width:"100%",
			  direction: "Row"
			 }).addStyleClass("marginTop10");
		
		oVbxCORDReport.addItem(oflxHdrCORDReportMain);
		
		
		//oVbxCORDReport.addItem(oflxbxExportCDBMARelDv);
		
		var tblRelActDtl = this.createCustOutRelRptDetail();
		oVbxCORDReport.addItem(tblRelActDtl);
		
		var obtnViwAllCORReport = new sap.m.Button("idbtnViwAllCORDtlReport",{
                 text : "View All",
				 visible: false,
                 type:sap.m.ButtonType.Unstyled,
                 press:function(){
						this.setVisible(false);
						var idTblCORDtlReport = sap.ui.getCore().byId("idTblCORDtlReport");
						var tblMdlData = idTblCORDtlReport.getModel().getData();
						
						if(tblMdlData.length < 100){
							idTblCORDtlReport.setVisibleRowCount(tblMdlData.length);
							idTblCORDtlReport.setNavigationMode(sap.ui.table.NavigationMode.None);
						}else{
							idTblCORDtlReport.setVisibleRowCount(100);
							idTblCORDtlReport.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
						}
                    }
              }).addStyleClass("submitBtn marginTop10");
			  
		oVbxCORDReport.addItem(obtnViwAllCORReport);
		
		oVbxCORDReport.addItem(new sap.ui.commons.TextView({text:' '}));
		//CREATE PAGE FOR THIS VIEW
		this.page = new sap.m.Page({
				//title: "{i18n>page2Title}",
				showNavButton: false,				// page 2 should display a back button
				//navButtonPress: [ oController.navButtonPress, oController ],
				icon: "",
				content : [oVbxCORDReport]
		});
		this.page.setShowHeader(false);
		this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
		
		// done
		return this.page;
	},
		
	createCustOutRelRptDetail: function(){
		var oTblCORDtlReport = new sap.ui.table.Table("idTblCORDtlReport",{
			visibleRowCount: 1,
			columnHeaderHeight: 30,
			selectionMode: sap.ui.table.SelectionMode.None
			}).addStyleClass('tblBorder marginTop10');
		
		oTblCORDtlReport.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Lease"}),
			template: new sap.ui.commons.TextView().bindProperty("text", "LeaseNo"),
			sortProperty: "LeaseNo",
			filterProperty: "LeaseNo",resizable:false,width:'70px'}));
		
		oTblCORDtlReport.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Release"}),
			template: new sap.ui.commons.TextView().bindProperty("text", "ReleaseAuth"),
			sortProperty: "ReleaseAuth",
			filterProperty: "ReleaseAuth",resizable:false,width:'70px'}));
		
		oTblCORDtlReport.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Unit Description"}),
			template: new sap.ui.commons.TextView().bindProperty("text", "UnitDesc"),
			sortProperty: "UnitDesc",
			filterProperty: "UnitDesc",resizable:false,width:'125px'}));
		
		oTblCORDtlReport.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Location"}),
			template: new sap.ui.commons.TextView().bindProperty("text", "Location"),
			sortProperty: "Location",
			filterProperty: "Location",resizable:false,width:'125px'}));
			
		oTblCORDtlReport.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Depot"}),
			template: new sap.ui.commons.TextView().addStyleClass('wraptext').bindProperty("text", "Depot"),
			sortProperty: "Depot",
			filterProperty: "Depot",resizable:false,wrapping: true,width:'150px'}));
		
		oTblCORDtlReport.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "On-Hire Date"}),
			template: new sap.ui.commons.TextView().bindProperty("text", "OnHireDate"),
			sortProperty: "OnHireDateSort",
			filterProperty: "OnHireDate",resizable:false,width:'98px'}));
		
		oTblCORDtlReport.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Unit Number"}),
			template: new sap.ui.commons.TextView().bindProperty("text", "UnitNumber"),
			sortProperty: "UnitNumber",
			filterProperty: "UnitNumber",resizable:false,width:'100px'}));
			
		return oTblCORDtlReport;
	},
});
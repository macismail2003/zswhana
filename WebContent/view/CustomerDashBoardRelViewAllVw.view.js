sap.ui.jsview("view.CustomerDashBoardRelViewAllVw",
{
	getControllerName : function() {
					return "view.CustomerDashBoardRelViewAllVw";
		},
	createContent : function(oController) {
		var oVbxCDBRelVwAll = new sap.m.VBox("idVbxCDBRelVwAll");
		
		var oBckCDBMActRelDtl = new sap.m.Link("idBckCDBRelVwAll", {text: " < Back",
				width:"50px",wrapping:true,
				press: oController.navButtonPress});
		oVbxCDBRelVwAll.addItem(oBckCDBMActRelDtl);
		
		var olblHdrCDBMActRel = new sap.ui.commons.Label({text: "My Active Releases", wrapping: true}).addStyleClass("font15Bold marginTop10");
		//oVbxCDBRelVwAll.addItem(olblHdrCDBMActRel);
		
		var obtnExportExlCDBRelVwAll = new sap.m.Button("idbtnExportExlCDBRelVwAll",{
            text : "Export To Excel",
			visible:false,
            type:sap.m.ButtonType.Unstyled,
            icon: sap.ui.core.IconPool.getIconURI("excel-attachment"),
            press:function(){
            	var objUtil = new utility();
				objUtil.ExportUtility(jsnRelTopRecordDataVwAll, ['Release Reference','Quantity On-Hired','Quantity Outstanding'],
						 ['ReleaseRef','TotalQuant','OutstandQuant'],"My Active Releases","export");
            }
         }).addStyleClass("submitBtn");
		 
		var oflxbxCDBRelVall = new sap.m.FlexBox({
			  items:[olblHdrCDBMActRel],
			  width:"50%",
			  direction: "Row"
			 });//.addStyleClass("marginTop10");
		
		var oflxbxCDBRelVall1 = new sap.m.FlexBox({
			  items:[obtnExportExlCDBRelVwAll],
			  width:"50%",
			  direction: "RowReverse"
			 });//.addStyleClass("marginTop10");
		
		var oflxbxCDBRelVallMain = new sap.m.FlexBox({
			  items:[oflxbxCDBRelVall, oflxbxCDBRelVall1],
			  width:"400px",
			  direction: "Row"
			 }).addStyleClass("marginTop10");
		
		oVbxCDBRelVwAll.addItem(oflxbxCDBRelVallMain);
		
		var otblCDBRelVwAll = this.createRelActVwAllDetail().addStyleClass("marginTop10");
		oVbxCDBRelVwAll.addItem(otblCDBRelVwAll);
		
		
		//SET VISIBILITY BUTTONS
		if(jsnRelTopRecordDataVwAll.length == 0){
			obtnExportExlCDBRelVwAll.setVisible(false);
		}else {
			obtnExportExlCDBRelVwAll.setVisible(true);
		 }
		 
		//CREATE PAGE FOR THIS VIEW
		this.page = new sap.m.Page({
				//title: "{i18n>page2Title}",
				showNavButton: false,				// page 2 should display a back button
				//navButtonPress: [ oController.navButtonPress, oController ],
				icon: "",
				content : [oVbxCDBRelVwAll]
		});
		this.page.setShowHeader(false);
		this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
		
		// done
		return this.page;
	},
		
	createRelActVwAllDetail: function(){
		
		var oRelDtlTblCDBRelVwAll = new sap.ui.table.Table("idRelDtlTblCDBRelVwAll",{
			visibleRowCount: 5,
			columnHeaderHeight: 45,
			selectionMode: sap.ui.table.SelectionMode.None,
			navigationMode: sap.ui.table.NavigationMode.None,
			width:"400px"}).addStyleClass('tblBorder');
		
		oRelDtlTblCDBRelVwAll.addColumn(new sap.ui.table.Column({
               label: new sap.ui.commons.TextView({wrapping: true,text: "Release Reference"}).addStyleClass('sapUiLbl'),
               template: new sap.ui.commons.Link({
                           press : function() {
								//var seletedRelRefNo = this.getText();
								//selectedRelUnit = this.getHelpId();
								var objCustDBMActRelDtl = new CustomerDashBoardRelease();
								objCustDBMActRelDtl.setJsonDataRelease(this.getText());
								if(sap.ui.getCore().byId('CustomerDashBoardReleaseVw') != undefined){
									sap.ui.getCore().byId('CustomerDashBoardReleaseVw').destroy();
								}
								var bus = sap.ui.getCore().getEventBus();
								bus.publish("nav", "to", {id : "CustomerDashBoardReleaseVw"});
				}}).bindProperty("text", "ReleaseRef"),//.bindProperty("helpId","FilterReleaseRefId"),
               sortProperty: "ReleaseRef",
               width:"18%",
               resizable:false,
               filterProperty: "ReleaseRef",
              }));

		oRelDtlTblCDBRelVwAll.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Quantity On-Hired",textAlign :sap.ui.core.TextAlign.End}),
			template: new sap.ui.commons.TextView({textAlign :sap.ui.core.TextAlign.End}).bindProperty("text", "TotalQuant"),
			sortProperty: "TotalQuant",
			filterProperty: "TotalQuant",
			resizable:false}));
		
		oRelDtlTblCDBRelVwAll.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Quantity Outstanding",textAlign :sap.ui.core.TextAlign.End}),
			template: new sap.ui.commons.TextView({textAlign :sap.ui.core.TextAlign.End}).bindProperty("text", "OutstandQuant"),
			sortProperty: "OutstandQuant",
			filterProperty: "OutstandQuant",resizable:false}));
		   
		var oModelRelTblCDBRelVwAll = new sap.ui.model.json.JSONModel();
		oModelRelTblCDBRelVwAll.setData(jsnRelTopRecordDataVwAll);
						
		oRelDtlTblCDBRelVwAll.setModel(oModelRelTblCDBRelVwAll);
		oRelDtlTblCDBRelVwAll.bindRows("/");
		
		if(jsnRelTopRecordDataVwAll.length < 101){
			oRelDtlTblCDBRelVwAll.setVisibleRowCount(jsnRelTopRecordDataVwAll.length);
		 }else if(jsnRelTopRecordDataVwAll.length > 100){
			oRelDtlTblCDBRelVwAll.setVisibleRowCount(100);
			oRelDtlTblCDBRelVwAll.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		 }
		return oRelDtlTblCDBRelVwAll;
	},
});
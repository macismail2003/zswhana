sap.ui.jsview("view.CustomerDashBoardReturnViewAllVw",
{
	getControllerName : function() {
					return "view.CustomerDashBoardReturnViewAllVw";
		},
	createContent : function(oController) {
		var oVbxCDBReturnVwAll = new sap.m.VBox("idVbxCDBReturnVwAll");
		
		var oBckCDBMActReturnDtl = new sap.m.Link("idBckCDBReturnVwAll", {text: " < Back",
				width:"50px",wrapping:true,
				press: oController.navButtonPress});
		oVbxCDBReturnVwAll.addItem(oBckCDBMActReturnDtl);
		
		var olblHdrCDBMActReturn = new sap.ui.commons.Label({text: "My Active Returns", wrapping: true}).addStyleClass("font15Bold marginTop10");
		//oVbxCDBReturnVwAll.addItem(olblHdrCDBMActReturn);
		
		var obtnExportExlCDBReturnVwAll = new sap.m.Button("idbtnExportExlCDBReturnVwAll",{
            text : "Export To Excel",
			visible:false,
            type:sap.m.ButtonType.Unstyled,
            icon: sap.ui.core.IconPool.getIconURI("excel-attachment"),
            press:function(){
            	var objUtil = new utility();
				objUtil.ExportUtility(jsnReturnTopRecordDataVwAll, ['Off-Hire Reference','Quantity Off-Hired','Quantity Outstanding'],
						 ['Return','ReturnQty','OutstandQty'],"My Active Returns","export");
            }
         }).addStyleClass("submitBtn");
		 
		
		var oflxbxCDBRetVall = new sap.m.FlexBox({
			  items:[olblHdrCDBMActReturn],
			  width:"50%",
			  direction: "Row"
			 });//.addStyleClass("marginTop10");
		
		var oflxbxCDBRetVall1 = new sap.m.FlexBox({
			  items:[obtnExportExlCDBReturnVwAll],
			  width:"50%",
			  direction: "RowReverse"
			 });//.addStyleClass("marginTop10");
		
		var oflxbxCDBRetVallMain = new sap.m.FlexBox({
			  items:[oflxbxCDBRetVall, oflxbxCDBRetVall1],
			  width:"400px",
			  direction: "Row"
			 }).addStyleClass("marginTop10");
		
		oVbxCDBReturnVwAll.addItem(oflxbxCDBRetVallMain);
		
		var otblCDBReturnVwAll = this.createReturnActVwAllDetail().addStyleClass("marginTop10");
		oVbxCDBReturnVwAll.addItem(otblCDBReturnVwAll);
		
		
		//SET VISIBILITY BUTTONS
		if(jsnRelTopRecordDataVwAll.length == 0){
			obtnExportExlCDBReturnVwAll.setVisible(false);
		}else {
			obtnExportExlCDBReturnVwAll.setVisible(true);
		 }
		 
		//CREATE PAGE FOR THIS VIEW
		this.page = new sap.m.Page({
				//title: "{i18n>page2Title}",
				showNavButton: false,				// page 2 should display a back button
				//navButtonPress: [ oController.navButtonPress, oController ],
				icon: "",
				content : [oVbxCDBReturnVwAll]
		});
		this.page.setShowHeader(false);
		this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
		
		// done
		return this.page;
	},
		
	createReturnActVwAllDetail: function(){
		
		var oTblTopCDBRetVwAll = new sap.ui.table.Table("idTblTopCDBRetVwAll",{
			visibleRowCount: 5,
			columnHeaderHeight: 45,
			selectionMode: sap.ui.table.SelectionMode.None,
			navigationMode: sap.ui.table.NavigationMode.None,
			width:"400px"}).addStyleClass('tblBorder');
		
		oTblTopCDBRetVwAll.addColumn(new sap.ui.table.Column({
               label: new sap.ui.commons.TextView({wrapping: true,text: "Off-Hire Reference"}).addStyleClass('sapUiLbl'),
               template: new sap.ui.commons.Link({
                           press : function() {
                        	 //var seletedRelRefNo = this.getText();
								//selectedRelUnit = this.getHelpId();
								var objCustDBMActRelDtl = new CustomerDashBoardReturn();
								objCustDBMActRelDtl.setJsonDataReturns(this.getText());
								if(sap.ui.getCore().byId('CustomerDashBoardReturnVw') != undefined){
									sap.ui.getCore().byId('CustomerDashBoardReturnVw').destroy();
								}
								var bus = sap.ui.getCore().getEventBus();
								bus.publish("nav", "to", {id : "CustomerDashBoardReturnVw"});
				}}).bindProperty("text", "Return"),//.bindProperty("helpId","filterReturnRefId"),
               sortProperty: "Return",
               width:"18%",
               resizable:false,
               filterProperty: "Return",
              }));

		oTblTopCDBRetVwAll.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Quantity Off-Hired",textAlign :sap.ui.core.TextAlign.End}),
			template: new sap.ui.commons.TextView({textAlign :sap.ui.core.TextAlign.End}).bindProperty("text", "ReturnQty"),
			sortProperty: "ReturnQty",
			filterProperty: "ReturnQty",resizable:false}));
		
		oTblTopCDBRetVwAll.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Quantity Outstanding",textAlign :sap.ui.core.TextAlign.End}),
			template: new sap.ui.commons.TextView({textAlign :sap.ui.core.TextAlign.End}).bindProperty("text", "OutstandQty"),
			sortProperty: "OutstandQty",
			filterProperty: "OutstandQty",resizable:false}));
		   
		var oModelReturnTblCDBVwAll = new sap.ui.model.json.JSONModel();
		oModelReturnTblCDBVwAll.setData(jsnReturnTopRecordDataVwAll);
						
		oTblTopCDBRetVwAll.setModel(oModelReturnTblCDBVwAll);
		oTblTopCDBRetVwAll.bindRows("/");
		
		if(jsnReturnTopRecordDataVwAll.length < 101){
			oTblTopCDBRetVwAll.setVisibleRowCount(jsnReturnTopRecordDataVwAll.length);
		 }else if(jsnReturnTopRecordDataVwAll.length > 100){
			oTblTopCDBRetVwAll.setVisibleRowCount(100);
			oTblTopCDBRetVwAll.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		 }
		return oTblTopCDBRetVwAll;
	},
});
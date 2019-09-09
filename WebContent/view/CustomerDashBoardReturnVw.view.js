sap.ui.jsview("view.CustomerDashBoardReturnVw",
{
	getControllerName : function() {
					return "view.CustomerDashBoardReturnVw";
		},
	createContent : function(oController) {
		var oVbxCDBReturns = new sap.m.VBox("idVbxCDBReturns");
		
		var oBckCDBReturnDtl = new sap.m.Link("idBckCDBReturnDtl", {text: " < Back",
				width:"50px",wrapping:true,
				press: oController.navButtonPress});
		oVbxCDBReturns.addItem(oBckCDBReturnDtl);
		
		var olblHdrCDBReturn = new sap.ui.commons.Label({text: "My Active Returns - Return Details", wrapping: true}).addStyleClass("font15Bold marginTop10");
		//oVbxCDBReturns.addItem(olblHdrCDBReturn);
		
		var obtnExportExlCDBReturns = new sap.m.Button("idbtnExportExlCDBReturn",{
            text : "Export To Excel",
			visible:false,
            type:sap.m.ButtonType.Unstyled,
            icon: sap.ui.core.IconPool.getIconURI("excel-attachment"),
            press:function(){
            	var objUtil = new utility();
            	var arrDiplHdrExprtCDBRetDtl = ['Lease','Return','Unit Type','Location','Depot','Total Quantity', 'Quantity Returned','Outstanding Quantity','Status','Expiry Date'];
            	var arrDiplFieldExprtCDBRetDtl = ['LeaseNo','Ordno','UnitType','Location','DepotDesc','TotQty','RetQty','OutQty','Status','ExpiryDate'];
            	
				objUtil.ExportUtility(jsnCustDBoardReturnsTbl,arrDiplHdrExprtCDBRetDtl,arrDiplFieldExprtCDBRetDtl, "My Active Returns - Return Details","export");
            }
         }).addStyleClass("submitBtn");
		 
		var oflxbxCDBRetVw = new sap.m.FlexBox({
			  items:[olblHdrCDBReturn],
			  width:"50%",
			  direction: "Row"
			 });//.addStyleClass("marginTop10");
		
		var oflxbxCDBRetVw1 = new sap.m.FlexBox({
			  items:[obtnExportExlCDBReturns],
			  width:"50%",
			  direction: "RowReverse"
			 });//.addStyleClass("marginTop10");
		
		var oflxbxCDBRetVwMain = new sap.m.FlexBox({
			  items:[oflxbxCDBRetVw, oflxbxCDBRetVw1],
			  width:"100%",
			  direction: "Row"
			 }).addStyleClass("marginTop10");
		
		oVbxCDBReturns.addItem(oflxbxCDBRetVwMain);
		
		var otblCBReturns = this.createCDBReturnDetail().addStyleClass("marginTop10");
		oVbxCDBReturns.addItem(otblCBReturns);
		
		var obtnViwAllCDBReturns = new sap.m.Button("idbtnViwAllCDBReturns",{
                 text : "View All",
				 visible: false,
                 type:sap.m.ButtonType.Unstyled,
                 press:function(){
						this.setVisible(false);
						var oTblCDBReturns = sap.ui.getCore().byId("idTblCDBReturns");
						
						if(jsnCustDBoardReleaseTbl.length < 26){
							oTblCDBReturns.setVisibleRowCount(jsnCustDBoardReleaseTbl.length);
						}else{
							oTblCDBReturns.setVisibleRowCount(25);
						}
                    }
              }).addStyleClass("submitBtn");
			  
		oVbxCDBReturns.addItem(obtnViwAllCDBReturns);
		
		//SET VISIBILITY BUTTONS
		if(jsnCustDBoardReturnsTbl.length == 0){
			obtnViwAllCDBReturns.setVisible(false);
			obtnExportExlCDBReturns.setVisible(false);
		}else if(jsnCustDBoardReturnsTbl.length < 26){
			obtnViwAllCDBReturns.setVisible(false);
			obtnExportExlCDBReturns.setVisible(true);
		}else if(jsnCustDBoardReturnsTbl.length > 25){
			obtnViwAllCDBReturns.setVisible(true);
			obtnExportExlCDBReturns.setVisible(true);
		 }
		 
		//CREATE PAGE FOR THIS VIEW
		this.page = new sap.m.Page({
				//title: "{i18n>page2Title}",
				showNavButton: false,				// page 2 should display a back button
				//navButtonPress: [ oController.navButtonPress, oController ],
				icon: "",
				content : [oVbxCDBReturns]
		});
		this.page.setShowHeader(false);
		this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
		
		// done
		return this.page;
	},
		
	createCDBReturnDetail: function(){
		var oTblCDBReturns = new sap.ui.table.Table("idTblCDBReturns",{
			visibleRowCount: 1,
			columnHeaderHeight: 45,
			selectionMode: sap.ui.table.SelectionMode.None,
			width:"100%"}).addStyleClass('tblBorder');
		
		oTblCDBReturns.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Lease"}),
			template: new sap.ui.commons.TextView().bindProperty("text", "LeaseNo"),
			sortProperty: "LeaseNo",
			filterProperty: "LeaseNo",resizable:false,width:"70px"}));
		
		oTblCDBReturns.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Return"}),
			template: new sap.ui.commons.TextView().bindProperty("text", "Ordno"),
			sortProperty: "Ordno",
			filterProperty: "Ordno",resizable:false,width:"70px"}));
		
		
		oTblCDBReturns.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Unit Type"}),
			template: new sap.ui.commons.TextView().bindProperty("text", "UnitType"),
			sortProperty: "UnitType",
			filterProperty: "UnitType",resizable:false,width:"80px"}));
		
		oTblCDBReturns.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Location"}),
			template: new sap.ui.commons.TextView().addStyleClass('wraptext').bindProperty("text", "Location"),
			sortProperty: "Location",
			filterProperty: "Location",resizable:false,width:"125px"}));
			
		oTblCDBReturns.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Depot"}),
			template: new sap.ui.commons.TextView().addStyleClass('wraptext').bindProperty("text", "DepotDesc"),
			sortProperty: "DepotDesc",
			filterProperty: "DepotDesc",resizable:false,width:"150px"}));
		
		oTblCDBReturns.addColumn(new sap.ui.table.Column({
               label: new sap.ui.commons.TextView({textAlign :sap.ui.core.TextAlign.End, wrapping: true, text: "Total \n Quantity"}).addStyleClass('sapUiLbl'),
               template: new sap.ui.commons.Link({textAlign :sap.ui.core.TextAlign.End,
                           press : function() {
                                var objCustDBRetDtl = new CustomerDashBoardReturn();
                                objCustDBRetDtl.setJsonDataReturnTotQtyDtl(this.getHelpId());
								
								if(sap.ui.getCore().byId('CustomerDashBoardReturnTotQtyDtlVw') != undefined){
									sap.ui.getCore().byId('CustomerDashBoardReturnTotQtyDtlVw').destroy();
								}
								var bus = sap.ui.getCore().getEventBus();
								bus.publish("nav", "to", {id : "CustomerDashBoardReturnTotQtyDtlVw"});
                           }
                     }).addStyleClass("textRight").bindProperty("text", "TotQty").bindProperty("helpId","filterReturnOrdnoId"),
               sortProperty: "TotQty",
               resizable:false,
               filterProperty: "TotQty",width:"75px"
              }));
		
		oTblCDBReturns.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.TextView({textAlign :sap.ui.core.TextAlign.End, wrapping: true, text: "Quantity \n Returned",textAlign :sap.ui.core.TextAlign.End}).addStyleClass('sapUiLbl'),
			template: new sap.ui.commons.TextView({textAlign :sap.ui.core.TextAlign.End}).bindProperty("text", "RetQty"),
			sortProperty: "RetQty",
			filterProperty: "RetQty",resizable:false,width:"75px"}));
		
		oTblCDBReturns.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.TextView({textAlign :sap.ui.core.TextAlign.End, wrapping: true, text: "Outstanding \n Quantity",textAlign :sap.ui.core.TextAlign.End}).addStyleClass('sapUiLbl'),
			template: new sap.ui.commons.TextView({textAlign :sap.ui.core.TextAlign.End}).bindProperty("text", "OutQty"),
			sortProperty: "OutQty",
			filterProperty: "OutQty",resizable:false,width:"85px"}));
		
		oTblCDBReturns.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Status"}),
			template: new sap.ui.commons.TextView().bindProperty("text", "Status"),
			sortProperty: "Status",
			filterProperty: "Status",resizable:false,width:"75px"}));
		
		oTblCDBReturns.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Expiry Date",textAlign :sap.ui.core.TextAlign.End}),
			template: new sap.ui.commons.TextView({textAlign :sap.ui.core.TextAlign.End}).bindProperty("text", "ExpiryDate"),
			sortProperty: "ExpirDateCDBRetSort",
			filterProperty: "ExpiryDate",resizable:false,width:"100px"}));
			
		var oModelRelTblCDBMARelDtlVw = new sap.ui.model.json.JSONModel();
		oModelRelTblCDBMARelDtlVw.setData(jsnCustDBoardReturnsTbl);
						
		oTblCDBReturns.setModel(oModelRelTblCDBMARelDtlVw);
		oTblCDBReturns.bindRows("/");
		if(jsnCustDBoardReturnsTbl.length < 1){
			oTblCDBReturns.setVisibleRowCount(5);
		}
		if((jsnCustDBoardReturnsTbl.length > 0) && (jsnCustDBoardReturnsTbl.length < 26)){
			oTblCDBReturns.setVisibleRowCount(jsnCustDBoardReturnsTbl.length);
			oTblCDBReturns.setNavigationMode(sap.ui.table.NavigationMode.None);
		 }else if(jsnCustDBoardReturnsTbl.length > 25){
			oTblCDBReturns.setVisibleRowCount(25);
			oTblCDBReturns.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		 }
		return oTblCDBReturns;
	},
});
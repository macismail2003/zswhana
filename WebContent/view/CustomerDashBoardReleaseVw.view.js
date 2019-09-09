sap.ui.jsview("view.CustomerDashBoardReleaseVw",
{
	getControllerName : function() {
					return "view.CustomerDashBoardReleaseVw";
		},
	createContent : function(oController) {
		var oVbxCDBMActRelDtl = new sap.m.VBox("idVbxCDBMActRelDtl");
		
		var oBckCDBMActRelDtl = new sap.m.Link("idBckCDBMActRelDtl", {text: " < Back",
				width:"50px",wrapping:true,
				press: oController.navButtonPress});
		oVbxCDBMActRelDtl.addItem(oBckCDBMActRelDtl);
		
		var olblHdrCDBMActRel = new sap.ui.commons.Label({text: "My Active Releases - Release Details", wrapping: true}).addStyleClass("font15Bold marginTop10");
		
		var obtnExportExlCDBMARelDtl = new sap.m.Button("idbtnExportExlCDBMARelDtl",{
            text : "Export To Excel",
			visible:false,
            type:sap.m.ButtonType.Unstyled,
            icon: sap.ui.core.IconPool.getIconURI("excel-attachment"),
            press:function(){
            	var objUtil = new utility();
            	var arrDiplHdrExprtCDBRelDtl = ['Lease','Release','Unit Type','Location','Depot','Total Quantity', 'Quantity Picked','Outstanding Quantity','Status','Expiry Date'];
            	var arrDiplFieldExprtCDBRelDtl = ['LeaseNo','Authno','UnitType','City','Depotname','TotalQuant','PickedQty','OutstandQuant','Status','ExpiryDate'];
				objUtil.ExportUtility(jsnCustDBoardReleaseTbl,arrDiplHdrExprtCDBRelDtl,arrDiplFieldExprtCDBRelDtl, "My Active Releases - Release Details","export");
            }
         }).addStyleClass("submitBtn");
		 
		var oflxHdrCDBRvw1 = new sap.m.FlexBox({
			  items:[olblHdrCDBMActRel],
			  width:"70%",
			  direction: "Row"
			 });//.addStyleClass("marginTop10");
		
		var oflxHdrCDBRvw2 = new sap.m.FlexBox({
			  items:[obtnExportExlCDBMARelDtl],
			  width:"30%",
			  direction: "RowReverse"
			 });//.addStyleClass("marginTop10");
		
		var oflxHdrCDBRvwMain = new sap.m.FlexBox({
			  items:[oflxHdrCDBRvw1, oflxHdrCDBRvw2],
			  width:"100%",
			  direction: "Row"
			 }).addStyleClass("marginTop10");
		
		oVbxCDBMActRelDtl.addItem(oflxHdrCDBRvwMain);
		
		
		//oVbxCDBMActRelDtl.addItem(oflxbxExportCDBMARelDv);
		
		var tblRelActDtl = this.createRelActDetail().addStyleClass("marginTop10");
		oVbxCDBMActRelDtl.addItem(tblRelActDtl);
		
		var obtnViwAllCDBMARelDtl = new sap.m.Button("idbtnViwAllCDBMARelDtl",{
                 text : "View All",
				 visible: false,
                 type:sap.m.ButtonType.Unstyled,
                 press:function(){
						this.setVisible(false);
						var oRetDtlTblCDBMADvw1 = sap.ui.getCore().byId("idRelDtlTblCDBMADvw1");
						
						if(jsnCustDBoardReleaseTbl.length < 25){
							oRetDtlTblCDBMADvw1.setVisibleRowCount(jsnCustDBoardReleaseTbl.length);
						}else{
							oRetDtlTblCDBMADvw1.setVisibleRowCount(25);
						}
                    }
              }).addStyleClass("submitBtn");
			  
		oVbxCDBMActRelDtl.addItem(obtnViwAllCDBMARelDtl);
		
		//SET VISIBILITY BUTTONS
		if(jsnCustDBoardReleaseTbl.length == 0){
			obtnViwAllCDBMARelDtl.setVisible(false);
			obtnExportExlCDBMARelDtl.setVisible(false);
		}else if(jsnCustDBoardReleaseTbl.length < 26){
			obtnViwAllCDBMARelDtl.setVisible(false);
			obtnExportExlCDBMARelDtl.setVisible(true);
		}else if(jsnCustDBoardReleaseTbl.length > 25){
			obtnViwAllCDBMARelDtl.setVisible(true);
			obtnExportExlCDBMARelDtl.setVisible(true);
		 }
		 
		//CREATE PAGE FOR THIS VIEW
		this.page = new sap.m.Page({
				//title: "{i18n>page2Title}",
				showNavButton: false,				// page 2 should display a back button
				//navButtonPress: [ oController.navButtonPress, oController ],
				icon: "",
				content : [oVbxCDBMActRelDtl]
		});
		this.page.setShowHeader(false);
		this.page.setBackgroundDesign(sap.m.PageBackgroundDesign.Transparent);
		
		// done
		return this.page;
	},
		
	createRelActDetail: function(){
		var oRelDtlTblCDBMADvw = new sap.ui.table.Table("idRelDtlTblCDBMADvw1",{
			visibleRowCount: 1,
			columnHeaderHeight: 45,
			selectionMode: sap.ui.table.SelectionMode.None,
			width:"100%"}).addStyleClass('tblBorder');
		
		oRelDtlTblCDBMADvw.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Lease"}),
			template: new sap.ui.commons.TextView().bindProperty("text", "LeaseNo"),
			sortProperty: "LeaseNo",
			filterProperty: "LeaseNo",resizable:false,width:'70px'}));
		
		oRelDtlTblCDBMADvw.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Release"}),
			template: new sap.ui.commons.TextView().bindProperty("text", "Authno"),
			sortProperty: "Authno",
			filterProperty: "Authno",resizable:false,width:'70px'}));
		
		
		oRelDtlTblCDBMADvw.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Unit Type"}),
			template: new sap.ui.commons.TextView().bindProperty("text", "UnitType"),
			sortProperty: "UnitType",
			filterProperty: "UnitType",resizable:false,width:'90px'}));
		
		oRelDtlTblCDBMADvw.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Location"}),
			template: new sap.ui.commons.TextView().bindProperty("text", "City"),
			sortProperty: "City",
			filterProperty: "City",resizable:false,width:'125px'}));
			
		oRelDtlTblCDBMADvw.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Depot"}),
			template: new sap.ui.commons.TextView().addStyleClass('wraptext').bindProperty("text", "Depotname"),
			sortProperty: "Depotname",
			filterProperty: "Depotname",resizable:false,wrapping: true,width:'150px'}));
		
		oRelDtlTblCDBMADvw.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.TextView({textAlign :sap.ui.core.TextAlign.End, text: "Total \n Quantity"}).addStyleClass('sapUiLbl'),
			template: new sap.ui.commons.TextView({textAlign :sap.ui.core.TextAlign.End}).bindProperty("text", "TotalQuant"),
			sortProperty: "TotalQuant",
			filterProperty: "TotalQuant",resizable:false,width:'75px'}));
		
		oRelDtlTblCDBMADvw.addColumn(new sap.ui.table.Column({
               label: new sap.ui.commons.TextView({textAlign :sap.ui.core.TextAlign.End, text: "Quantity \n Picked"}).addStyleClass('sapUiLbl'),
               template: new sap.ui.commons.Link({
                           press : function() {
                                var objCustDBMActRelDtl = new CustomerDashBoardRelease();
								objCustDBMActRelDtl.setJsonDataReleasePickDetail(this.getHelpId());
								
								if(sap.ui.getCore().byId('CustomerDashBoardReleasePickDtlVw') != undefined){
									sap.ui.getCore().byId('CustomerDashBoardReleasePickDtlVw').destroy();
								}
								var bus = sap.ui.getCore().getEventBus();
								bus.publish("nav", "to", {id : "CustomerDashBoardReleasePickDtlVw"});
                                  
                           }
                     }).addStyleClass("textRight").bindProperty("text", "PickedQty").bindProperty("helpId","FilterAuthId"),
               sortProperty: "PickedQty",
               resizable:false,
               filterProperty: "PickedQty",width:'75px'
              }));
		
		oRelDtlTblCDBMADvw.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.TextView({textAlign :sap.ui.core.TextAlign.End, text: "Outstanding\n Quantity"}).addStyleClass('sapUiLbl'),
			template: new sap.ui.commons.TextView({textAlign :sap.ui.core.TextAlign.End}).bindProperty("text", "OutstandQuant"),
			sortProperty: "OutstandQuant",
			filterProperty: "OutstandQuant",resizable:false,width:'85px'}));
		
		oRelDtlTblCDBMADvw.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Status"}),
			template: new sap.ui.commons.TextView().bindProperty("text", "Status"),
			sortProperty: "Status",
			filterProperty: "Status",resizable:false,width:'85px'}));
		
		oRelDtlTblCDBMADvw.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Expiry Date",textAlign :sap.ui.core.TextAlign.End}),
			template: new sap.ui.commons.TextView({textAlign :sap.ui.core.TextAlign.End}).bindProperty("text", "ExpiryDate"),
			sortProperty: "ExpirDateCDBMARelSort",
			filterProperty: "ExpiryDate",resizable:false,width:'90px'}));
			
		var oModelRelTblCDBMARelDtlVw = new sap.ui.model.json.JSONModel();
		oModelRelTblCDBMARelDtlVw.setData(jsnCustDBoardReleaseTbl);
						
		oRelDtlTblCDBMADvw.setModel(oModelRelTblCDBMARelDtlVw);
		oRelDtlTblCDBMADvw.bindRows("/");
		
		if(jsnCustDBoardReleaseTbl.length < 1 ){
			oRelDtlTblCDBMADvw.setVisibleRowCount(5);
		}
		if((jsnCustDBoardReleaseTbl.length > 0)&& (jsnCustDBoardReleaseTbl.length < 26)){
			oRelDtlTblCDBMADvw.setVisibleRowCount(jsnCustDBoardReleaseTbl.length);
			oRelDtlTblCDBMADvw.setNavigationMode(sap.ui.table.NavigationMode.None);
		 }else if(jsnCustDBoardReleaseTbl.length > 25){
			oRelDtlTblCDBMADvw.setVisibleRowCount(25);
			oRelDtlTblCDBMADvw.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		 }
		return oRelDtlTblCDBMADvw;
	},
});
/******** NP *******/
jQuery.sap.require("sap.ui.model.json.JSONModel");

var oModelViewErrorsEDITL;

sap.ui.model.json.JSONModel.extend("viewErrorsEDITLView", {
	
	createViewErrors: function(){
		
		var bckFrmViewErrorsToFMEDITL = new sap.m.Link("idBckFrmViewErrToFMEDITL", {
			text: " < Back",
            width:"9%",
            wrapping:true,
            press: function(){
                    var bus = sap.ui.getCore().getEventBus();
                    bus.publish("nav", "back");
            }}).addStyleClass("marginTop10");
		
		var oLabelTitleVEEDITL = new sap.ui.commons.Label("idViewErrorsTitleEDITL",{
            wrapping: true}).addStyleClass("sapUiFormTitle marginTop10");
		
		// Table
    	var oTableViewErrorsEDITL = new sap.ui.table.Table("idTblViewErrorsEDITL",{
    		//visibleRowCount: 3,
            columnHeaderHeight: 30,
            selectionMode: sap.ui.table.SelectionMode.None,
            navigationMode: sap.ui.table.NavigationMode.Paginator,
            //width:"100%",	// MACHANACHANGES_12062019 +
            height:"100%"
    	 }).addStyleClass("fontStyle marginTop15 tblBorder");
    	
    	// Table Columns
    	oTableViewErrorsEDITL.addColumn(new sap.ui.table.Column({
      		 label: new sap.ui.commons.Label({text: "Error Type"}),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "errorType").addStyleClass("wraptext"),
    		 resizable:false,
             sortProperty: "errorType",
             filterProperty: "errorType",
             width:"150px",	// MACHANACHANGES_12062019 changed from xx px to auto
    		 }));
    	
    	oTableViewErrorsEDITL.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "ID"}),
			 template: new sap.ui.commons.TextView().bindProperty("text", "id").addStyleClass("wraptext"),
			 resizable:false,
             sortProperty: "id",
             filterProperty: "id",
             width:"150px",	// MACHANACHANGES_12062019 changed from xx px to auto
			 }));
    	
    	oTableViewErrorsEDITL.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Field"}),
			 template: new sap.ui.commons.TextView().bindProperty("text", "field").addStyleClass("wraptext"),
			 resizable:false,
             sortProperty: "field",
             filterProperty: "field",
             width:"auto",	// MACHANACHANGES_12062019 changed from xx px to auto
			 }));
    	
    	oTableViewErrorsEDITL.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Number"}),
			 template: new sap.ui.commons.TextView().bindProperty("text", "number").addStyleClass("wraptext"),
			 resizable:false,
             sortProperty: "number",
             filterProperty: "number",
             width:"150px",	// MACHANACHANGES_12062019 changed from xx px to auto
			 }));
    	
    	oTableViewErrorsEDITL.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Message"}),
			 template: new sap.ui.commons.TextView().bindProperty("text", "message").addStyleClass("wraptext"),
			 resizable:false,
             sortProperty: "message",
             filterProperty: "message",
             width:"auto",	// MACHANACHANGES_12062019 changed from xx px to auto
			 }));
    	
    	// Responsive Grid Layout
	    var oViewErrorsLayout = new sap.ui.layout.form.ResponsiveGridLayout("idEDITLViewErrorsLayout",{
	    	  labelSpanL: 1,
              labelSpanM: 1,
              labelSpanS: 1,
              emptySpanL: 0,
              emptySpanM: 0,
              emptySpanS: 0,
              columnsL: 1,
              columnsM: 1,
              columnsS: 1,
              breakpointL: 765,
              breakpointM: 320
	    });

	  // Online Form Starts
	     var oEDITLViewErrorsForm = new sap.ui.layout.form.Form("idEDITLViewErrorsForm",{
	             layout: oViewErrorsLayout,
	             formContainers: [
	                     
	                     new sap.ui.layout.form.FormContainer("idEDITLViewErrorsFormC1",{
	                             //title: "Add Movement Out - Single",
                             formElements: [
												new sap.ui.layout.form.FormElement({
											    fields: [bckFrmViewErrorsToFMEDITL]
												}),
                                            	new sap.ui.layout.form.FormElement({
												    fields: [oLabelTitleVEEDITL]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oTableViewErrorsEDITL]
												})
	                                     ]
	                     }),
	             ]
	     });
	     
	     return oEDITLViewErrorsForm;
	},
	
	updateViewErrorsEDITL: function(){
		oModelViewErrorsEDITL = new sap.ui.model.json.JSONModel();
    	oModelViewErrorsEDITL.setData({modelData: arrViewErrorDetailEDITL});
    	sap.ui.getCore().byId("idTblViewErrorsEDITL").setModel(oModelViewErrorsEDITL);
    	sap.ui.getCore().byId("idTblViewErrorsEDITL").bindRows("/modelData");
    	
    	sap.ui.getCore().byId("idViewErrorsTitleEDITL").setText("EDI Transmission Log - Error Details for " + vMsgUniqueIdToPassFMDEDITL);
    	
    	if(arrViewErrorDetailEDITL.length >= 25){
    		sap.ui.getCore().byId("idTblViewErrorsEDITL").setVisibleRowCount(25);
    		sap.ui.getCore().byId("idTblViewErrorsEDITL").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
    	}
    	else{
    		sap.ui.getCore().byId("idTblViewErrorsEDITL").setVisibleRowCount(arrViewErrorDetailEDITL.length);
    		sap.ui.getCore().byId("idTblViewErrorsEDITL").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
    	}
	}
});
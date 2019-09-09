sap.ui.controller("view.CustOutRelDtlReportVw", {

	onInit : function() {
		this.getView().addEventDelegate({  
            // not added the controller as delegate to avoid controller functions with similar names as the events  
            onBeforeShow : jQuery.proxy(function(evt) {  
                      this.onBeforeShow(evt);  
            }, this)  
		});
	},
	
	onBeforeShow : function(evt) {  
	    if (evt) {  
	              //var secondViewModel = new sap.ui.model.json.JSONModel();  
	             // secondViewModel.setData(evt.data);  
	              //this.getView().setModel(secondViewModel);
	    	sap.ui.getCore().byId("idlblHdrTblCORDtl").setText(evt.data.relDtlFor);
		  
		  	var oTblCORDtlReport = sap.ui.getCore().byId("idTblCORDtlReport");
		  	var oMdlCORelDtlReport = new sap.ui.model.json.JSONModel();
		  	oMdlCORelDtlReport.setData({});
		  	oTblCORDtlReport.setModel(oMdlCORelDtlReport);
		  	oTblCORDtlReport.bindRows("/");
		  	
			oMdlCORelDtlReport.setData(evt.data.bindData);
			oTblCORDtlReport.setModel(oMdlCORelDtlReport);
			oTblCORDtlReport.bindRows("/");
			
			if(evt.data.bindData.length < 1 ){
				oTblCORDtlReport.setVisibleRowCount(5);
			}else if(evt.data.bindData.length < 26){
				oTblCORDtlReport.setVisibleRowCount(evt.data.bindData.length);
				oTblCORDtlReport.setNavigationMode(sap.ui.table.NavigationMode.None);
			 }else if(evt.data.bindData.length > 25){
				oTblCORDtlReport.setVisibleRowCount(25);
				oTblCORDtlReport.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
			 }
			
			//SET VISIBILITY BUTTONS
			var obtnViwAllCORReport = sap.ui.getCore().byId("idbtnViwAllCORDtlReport");
			var obtnExportExlCORDtlReport = sap.ui.getCore().byId("idbtnExportExlCORDtlReport");
			
			if(evt.data.bindData.length == 0){
				obtnViwAllCORReport.setVisible(false);
				obtnExportExlCORDtlReport.setVisible(false);
			}else if(evt.data.bindData.length < 26){
				obtnViwAllCORReport.setVisible(false);
				obtnExportExlCORDtlReport.setVisible(true);
			}else if(evt.data.bindData.length > 25){
				obtnViwAllCORReport.setVisible(true);
				obtnExportExlCORDtlReport.setVisible(true);
			 }
	    }
	},

	navButtonPress : function(evt) { 
		var bus = sap.ui.getCore().getEventBus();
		bus.publish("nav", "back");
	}

});
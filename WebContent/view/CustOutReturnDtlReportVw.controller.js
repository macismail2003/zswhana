sap.ui.controller("view.CustOutReturnDtlReportVw", {

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
	    	sap.ui.getCore().byId("idlblHdrTblCORetDtlReport").setText(evt.data.relDtlFor);
	    	
	    	var oTblCORetDtlReport = sap.ui.getCore().byId("idTblCORetDtlReport");
	    	//oTblCORetDtlReport.setSorted(false);
	    	//oTblCORetDtlReport.setFiltered(false);
	    	
		  	var oMdlCORetDtlReport = new sap.ui.model.json.JSONModel();
		  	oMdlCORetDtlReport.setData({});
		  	oTblCORetDtlReport.setModel(oMdlCORetDtlReport);
			oTblCORetDtlReport.bindRows("/");
			
			oMdlCORetDtlReport.setData(evt.data.bindData);
						
			oTblCORetDtlReport.setModel(oMdlCORetDtlReport);
			oTblCORetDtlReport.bindRows("/");
			
			if(evt.data.bindData.length < 1 ){
				oTblCORetDtlReport.setVisibleRowCount(5);
			}
			if((evt.data.bindData.length > 0)&& (evt.data.bindData.length < 26)){
				oTblCORetDtlReport.setVisibleRowCount(evt.data.bindData.length);
				oTblCORetDtlReport.setNavigationMode(sap.ui.table.NavigationMode.None);
			 }else if(evt.data.bindData.length > 25){
				oTblCORetDtlReport.setVisibleRowCount(25);
				oTblCORetDtlReport.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
			 }
			
			//SET VISIBILITY BUTTONS
			var obtnViwAllCORReport = sap.ui.getCore().byId("idbtnViwAllCORetDtlReport");
			var obtnExportExlCORetDtlReport = sap.ui.getCore().byId("idbtnExportExlCORetDtlReport");
			
			if(evt.data.bindData.length == 0){
				obtnViwAllCORReport.setVisible(false);
				obtnExportExlCORetDtlReport.setVisible(false);
			}else if(evt.data.bindData.length < 26){
				obtnViwAllCORReport.setVisible(false);
				obtnExportExlCORetDtlReport.setVisible(true);
			}else if(evt.data.bindData.length > 25){
				obtnViwAllCORReport.setVisible(true);
				obtnExportExlCORetDtlReport.setVisible(true);
			 }
	    }
	},

	navButtonPress : function(evt) { 
		var bus = sap.ui.getCore().getEventBus();
		bus.publish("nav", "back");
	}

});
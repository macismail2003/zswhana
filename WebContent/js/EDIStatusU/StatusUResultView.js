var jsonEDIStatusUReportETE = [];
var globalMessageUid;
sap.ui.model.json.JSONModel.extend("EDIStatusUResultView", {
	
	createEDIFormResult: function(){
		var back = new sap.m.Link({text: " < Back",
			width:"8%",
			wrapping:true,
            press: function(){
            
                   var bus = sap.ui.getCore().getEventBus();
                       bus.publish("nav", "back");
        }});
		
		var oBtnExport = new sap.m.Button({
            text : "Export To Excel",
            type:sap.m.ButtonType.Unstyled,
            icon: sap.ui.core.IconPool.getIconURI("excel-attachment"),
            press:function(){
            	//objUtil = new utility();
            	//alert("vTitle " + vTitle);
            	objUtil.makeHTMLTable(jsonEDIStatusUReportETE, "EDI Message - Status U","export");
            	//tableToExcel("idAccountDetailTbl-table",vTitle,vColLen);
            }
         }).addStyleClass("submitBtn");
		
		var oFlexExpBtn = new sap.m.FlexBox({
            items: [
                    oBtnExport
            ],
            direction:"RowReverse"
	});
		
		
		//view all
		var oBtnViewAll = new sap.m.Button("idViewAllBtnEDIStatusU",{
            text : "View All",
            styled:false, width:"80px",
            press:function(){
                  this.setVisible(false);
                  var vArrayLength = aStatusUData.length;
		        	if(vArrayLength < 100){
		        		sap.ui.getCore().byId("idEdiStatusUResultTbl").setVisibleRowCount(vArrayLength);
		        		sap.ui.getCore().byId("idEdiStatusUResultTbl").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		        	}
		        	else{
		        		sap.ui.getCore().byId("idEdiStatusUResultTbl").setVisibleRowCount(100);
		        		sap.ui.getCore().byId("idEdiStatusUResultTbl").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		        	}
            }
         }).addStyleClass("submitBtn marginTop10");
		
		
		var oCurrent = this;
		var oEdiStatusUResultTable = new sap.ui.table.Table("idEdiStatusUResultTbl",{
    		visibleRowCount: 25,
            columnHeaderHeight: 40,
            selectionMode: sap.ui.table.SelectionMode.None,
            navigationMode: sap.ui.table.NavigationMode.Paginator,
    	 }).addStyleClass("tblBorder marginTop10");
		
		oEdiStatusUResultTable.addColumn(new sap.ui.table.Column({
   		 label: new sap.ui.commons.Label({text: "Serial Number"}),
   		 template: new sap.ui.commons.TextView().bindProperty("text", "Serialnumber"),
            sortProperty: "Serialnumber",
            filterProperty: "Serialnumber",
            resizable:false,
            width:"100px"
   	   }));
		
		oEdiStatusUResultTable.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "MUID"}),
	   		 template: new sap.ui.commons.TextView().bindProperty("text", "MsgUidXi"),
	            sortProperty: "MsgUidXi",
	            filterProperty: "MsgUidXi",
	            resizable:false,
	            width:"155px"
	   	   }));
		
		oEdiStatusUResultTable.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Msg. Date"}),
	   		 template: new sap.ui.commons.TextView().bindProperty("text", "MessageDate"),
	            sortProperty: "actualMsgDate",
	            filterProperty: "MessageDate",
	            resizable:false,
	            width:"75px"
	   	   }));
		
		oEdiStatusUResultTable.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Msg. Time"}),
	   		 template: new sap.ui.commons.TextView().bindProperty("text", "MessageTime"),
	            sortProperty: "MessageTime",
	            filterProperty: "MessageTime",
	            resizable:false,
	            width:"70px"
	   	   }));
		
		oEdiStatusUResultTable.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Msg. Type"}),
	   		 template: new sap.ui.commons.TextView().bindProperty("text", "MsgName"),
	            sortProperty: "MsgName",
	            filterProperty: "MsgName",
	            resizable:false,
	            width:"130px"
	   	   }));
		
		oEdiStatusUResultTable.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Msg. Name"}),
	   		 template: new sap.ui.commons.TextView().bindProperty("text", "MsgType"),
	            sortProperty: "MsgType",
	            filterProperty: "MsgType",
	            resizable:false,
	            width:"65px"
	   	   }));
		
		oEdiStatusUResultTable.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Depot"}),
	   		 template: new sap.ui.commons.TextView().bindProperty("text", "Depot"),
	            sortProperty: "Depot",
	            filterProperty: "Depot",
	            resizable:false,
	            width:"100px"
	   	   }));
		
		oEdiStatusUResultTable.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "EDI Depot"}),
	   		 template: new sap.ui.commons.TextView().bindProperty("text", "SenderId"),
	            sortProperty: "SenderId",
	            filterProperty: "SenderId",
	            resizable:false,
	            width:"90px"
	   	   }));
		
		oEdiStatusUResultTable.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "EDI File Name"}),
	   		 template: new sap.ui.commons.TextView().bindProperty("text", "Filename"),
	            sortProperty: "Filename",
	            filterProperty: "Filename",
	            resizable:false,
	            width:"160px"
	   	   }));
		
		oEdiStatusUResultTable.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Resubmit"}),
	   		 template: new sap.ui.commons.Link({
	   			text:"Resubmit",
	   			press : function(oEvent) {
	        		 oCurrent.RedirectToRespectiveFPU(this.getHelpId());
	        	 }
	   		 }).bindProperty("helpId", "MsgUidXi"),
	            resizable:false,
	            width:"75px"
	   	   }));
		
		var oLayoutEDIS = new sap.ui.layout.form.ResponsiveGridLayout("idLayoutEDISUResult");
		 var oFormEDIS = new sap.ui.layout.form.Form("idFormEDISUResult",{
             layout: oLayoutEDIS,
             formContainers: [
                     
                 new sap.ui.layout.form.FormContainer("idFormC1EDISUResult",{
                     formElements: [
							new sap.ui.layout.form.FormElement({
							    fields: [back]
							}),
							new sap.ui.layout.form.FormElement({
							    fields: [oFlexExpBtn]
							}),
							new sap.ui.layout.form.FormElement({
							    fields: [oEdiStatusUResultTable]
							}),
							new sap.ui.layout.form.FormElement({
							    fields: [oBtnViewAll]
							})
							]
                 })
                 ]
		 });
		 
		 
		 return oFormEDIS;
	},
	
	RedirectToRespectiveFPU: function(InMsgId){
		globalMessageUid = InMsgId;
		var resubmitStatusUData = jQuery.grep(aStatusUData, function(element, index){
            return element.MsgUidXi == InMsgId;
		});
		
		if(resubmitStatusUData.length > 0 ){
			if(resubmitStatusUData[0].MsgType.trim().toUpperCase() == "GATOUT"){
				var oObj = new moveOutToLeaseView();
				oObj.bindMoveOutLeaseSearchEDIMsgs(InMsgId);
				var bus = sap.ui.getCore().getEventBus();
    			bus.publish("nav", "to", {
    					id : "MovOutToLease"
    			});
    			$('#idHdrContnt').html('Gate Out'); 
			}
			else if(resubmitStatusUData[0].MsgType.trim().toUpperCase() == "GATEIN"){
				if(resubmitStatusUData[0].MsgName.trim().toLowerCase() == "repair_progress"){
					var oObj = new repaircompltnFPUView();
					oObj.bindRCFPUEDIMsgs(InMsgId);
					var bus = sap.ui.getCore().getEventBus();
	    			bus.publish("nav", "to", {
	    					id : "RepairCompletionFPU"
	    			});
	    			$('#idHdrContnt').html('Repair Completion'); 
					//alert("view under construction");
				}
				else{
					var oObj = new moveInFromLeaseView();
					oObj.bindMoveInLeaseSearchEDIMsgs(InMsgId);
					var bus = sap.ui.getCore().getEventBus();
	    			bus.publish("nav", "to", {
	    					id : "MovInFrmLease"
	    			});
	    			$('#idHdrContnt').html('Gate In'); 
				}
			}
			else if(resubmitStatusUData[0].MsgType.trim().toUpperCase() == "WESTIM"){
				if(resubmitStatusUData[0].MsgName.trim().toLowerCase() == "lessee_approval"){
					var oObj = new lesseApprovalFPUView();
					oObj.bindLAFPUEDIMsgs(InMsgId);
					var bus = sap.ui.getCore().getEventBus();
	    			bus.publish("nav", "to", {
	    					id : "LesseeApprovalFPU"
	    			});
	    			$('#idHdrContnt').html('Lessee Approval'); 
				}
				else{
					msgIdFPURES = InMsgId;
					var bus = sap.ui.getCore().getEventBus();
	    			bus.publish("nav", "to", {
	    					id : "FPURepairEstimateSearchVw"
	    			});
	    			$('#idHdrContnt').html('Repair Estimate');
	    			
	    			clickEvntFPURES = 'edimessage';
					new FixPartialRepairEstimateSearch().OnlineServerMessageEDI("resubmit");
	    			
				}
			}
		}
		
	}
});
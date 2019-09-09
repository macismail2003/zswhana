var ochangeDepot;
var autoDepotCodeDash = [];
var autoData = [];
sap.ui.model.json.JSONModel.extend("ChangDepotCode", {
	
	changeDepot: function(){
		ochangeDepot = this;
		
		if (sap.ui.getCore().byId("changeDilogDepotDash")) 
				sap.ui.getCore().byId("changeDilogDepotDash").destroy();
		
		
		var labDepot =  new sap.ui.commons.Label({text:"Select Depot Code:",
			wrapping: true,
			layoutData: new sap.ui.layout.GridData({span: "L3 M5 S12"}),
			required:true,
		});
		
		var txtDepotCode = new sap.ui.commons.AutoComplete("dpDepotCode",{
			placeholder:"Select Depot",
		    layoutData: new sap.ui.layout.GridData({span: "L4 M6 S12"}),
		    change: function(oEvent){
		    	
		    	SelData = jQuery.grep(autoData, function(element, index){
		            return element.IdName == txtDepotCode.getValue();
		 	   });
		 	   
		 	   if(txtDepotCode.getValue().trim().length == 0 || SelData.length == 0){
		 		   txtDepotCode.setValueState(sap.ui.core.ValueState.Error);
		 		   isValid = false;
		 	   }else{
		 		   txtDepotCode.setValueState(sap.ui.core.ValueState.None);
		 	   }
		 	   
		 	  
        	  if(sap.viz == undefined)
        		  sap.ui.getCore().loadLibrary("sap.viz");
        	  
        	  if(ochangeDepot.validateSelection(txtDepotCode)){
        		  if(oChangeOvrLayDilog.isOpen()){
        			  oChangeOvrLayDilog.close();
        		  }
        		  
        		  busyDialog.open();
        		  
        		  var SelData = jQuery.grep(autoData, function(element, index){
  	  		            return element.IdName == sap.ui.getCore().byId('dpDepotCode').getValue();
  		    	  });
        		  depotSelected = sap.ui.getCore().byId('dpDepotCode').getValue();
        		  
        		  if(SelData.length>0)
        		   depotIdDashBoard = SelData[0].Depot;  
        		  
        		  depotDashboard.resetDepotDashboard();
        	  }
		    }
		}).addStyleClass("FormInputStyle marginTop10"); 
		txtDepotCode.setFilterFunction(function(sValue, oItem){
 	        return jQuery.sap.startsWithIgnoreCase(oItem.getText(), sValue) || jQuery.sap.startsWithIgnoreCase(oItem.getAdditionalText(), sValue);
 		});
		ochangeDepot.bindDepotList();
		
		var DepotFlex = new sap.m.FlexBox({ items: [  labDepot  ],  direction: "Column"	,
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4", margin: false})}).addStyleClass("marginTop10");
		
		var btnSubmit = new sap.m.Button({
	          text : "Submit",
	          styled:false,
	          visible:false,
	          width:"90px",
	          layoutData: new sap.ui.layout.GridData({span: "L1 M3 S4", margin: false}),
	          press:function(){
	        	  
	        	  if(sap.viz == undefined)
	        		  sap.ui.getCore().loadLibrary("sap.viz");
	        	  
	        	  if(ochangeDepot.validateSelection(txtDepotCode)){
	        		  if(oChangeOvrLayDilog.isOpen()){
	        			  oChangeOvrLayDilog.close();
	        		  }
	        		  
	        		  busyDialog.open();
	        		  
	        		  var SelData = jQuery.grep(autoData, function(element, index){
	  	  		            return element.IdName == sap.ui.getCore().byId('dpDepotCode').getValue();
	  		    	  });
	        		  depotSelected = sap.ui.getCore().byId('dpDepotCode').getValue();
	        		  
	        		  if(SelData.length>0)
	        		   depotIdDashBoard = SelData[0].Depot;  
	        		  
	        		  depotDashboard.resetDepotDashboard();
	        	  }

	          }
		}).addStyleClass("submitBtn marginTop10");
		
		var oChangeDialogLayout = new sap.ui.layout.form.ResponsiveGridLayout({
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
		var oChangeDialogForm = new sap.ui.layout.form.Form({
          layout: oChangeDialogLayout,
          formContainers: [
                  new sap.ui.layout.form.FormContainer({
                      formElements: [
                             new sap.ui.layout.form.FormElement({
                                  fields: [DepotFlex,txtDepotCode,btnSubmit ],
                             })
                      ]
                  })
          ]
		});
		
		var oChangeOvrLayDilog = new sap.ui.ux3.OverlayDialog("changeDilogDepotDash",{width:"640px",height:"86px"});
		oChangeOvrLayDilog.addContent(oChangeDialogForm);
		
   },
     
   bindDepotList: function(txtDepotCode){
	   busyDialog.open();
		var filter = "/F4_Depot_Names?$filter=City eq ''";
		
		oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
 		OData.request({ 
 		      requestUri: serviceUrl + filter,
 		      //user:"pcsdevl", password:"igate@123",
 		      method: "GET", 
 		      dataType: 'json',
 		      headers: 
 		       {
 		          "X-Requested-With": "XMLHttpRequest",
 		          "Content-Type": "application/json; charset=utf-8",
 		          "DataServiceVersion": "2.0", 
 		          "X-CSRF-Token":"Fetch"   
 		      }          
 		 },
 		 function (data, response){ 
 		    	
 		   //alert("data.results.length" + data.results.length);
 		   //alert("data" + window.JSON.stringify(data.results));
 			autoData = data.results;
 			busyDialog.close();
     	   
	    	var pop = sap.ui.getCore().byId("changeDilogDepotDash");
	    	if(!pop.isOpen()){
	    		pop.open();
			}
	    	
		    var autoC = sap.ui.getCore().byId("dpDepotCode");
		    	 
 		   for(var i=0;i<data.results.length;i++){
 			   
 			  autoC.addItem(new sap.ui.core.ListItem({
              		text:data.results[i].IdName, 
              		key: data.results[i].Depot,
              		additionalText: data.results[i].Depot
              }));
 		   }
 		  
 		 /* var oFilter1 = new sap.ui.model.Filter("Depot", sap.ui.model.FilterOperator.StartsWith, "M");
 		  var oFilter1 = new sap.ui.model.Filter("IdName", sap.ui.model.FilterOperator.Contains, "Paz");
 		 
 		   autoC.getItems().setfilter(oFilter1);*/
 		    	
 		 },
		    function(err){
		    	errorfromServer(err);
		    	/*busyDialog.close();
		    	if(err.response.statusCode == "500"){
		    		sap.ui.commons.MessageBox.alert("Server Response Timeout");
		    		sap.ui.commons.MessageBox.show("Server Response Timeout",
		    			  sap.ui.commons.MessageBox.Icon.INFORMATION,
		    			  "Information",
		    			  [sap.ui.commons.MessageBox.Action.OK], 
		    			  sap.ui.commons.MessageBox.Action.OK
		    	);
		    	}
		    	else{
		    		//alert("Error while reading Repair Estimates : "+ window.JSON.stringify(err.response));
	  		    	sap.ui.commons.MessageBox.alert("Error while reading Repair Estimates : "+window.JSON.stringify(err.response));
		    	}*/
		    });
   },
   
   validateSelection:function(txtDepotCode){
	   var isValid = true;
	   
	   SelData = jQuery.grep(autoData, function(element, index){
           return element.IdName == txtDepotCode.getValue();
	   });
	   
	   if(txtDepotCode.getValue().trim().length == 0 || SelData.length == 0){
		   txtDepotCode.setValueState(sap.ui.core.ValueState.Error);
		   isValid = false;
	   }else{
		   txtDepotCode.setValueState(sap.ui.core.ValueState.None);
	   }
	   
	   
	   return isValid;
   }
});
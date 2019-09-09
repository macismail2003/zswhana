jQuery.sap.require("sap.ui.model.json.JSONModel");
var autoUnitDataInv = [];
var autoPrefixDataInv = [];
var unitAutoStatusInv = false;
var prefixAutoStatusInv = false;
var oinvAuto;
sap.ui.model.json.JSONModel.extend("inventoryAutoMulti", {
	
	bindAutoUnit:function(){
		oinvAuto = this;
		
		busyDialog.open();
		filter = "/F4_Help_Unit_Type";
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
  		    	
  			 unitAutoStatusInv = true;
  			 oinvAuto.checkBusyStatus();
  			 for(var i=0;i<data.results.length;i++)
  				autoUnitDataInv.push({
	    			"Unit":data.results[i].UnitType,
	    			"id":data.results[i].UnitType
  				});
  			sap.ui.getCore().byId('AutoUnitTypeInv').mProperties.suggestValues= autoUnitDataInv;
 		    sap.ui.getCore().byId('AutoUnitTypeInv').mProperties.codePropertyName ='id';
 		    sap.ui.getCore().byId('AutoUnitTypeInv').mProperties.descriptionPropertyName='Unit';
 		    sap.ui.getCore().byId('AutoUnitTypeInv').addholderitem();
		   
  		  },
  		   function(err){
  		    	unitAutoStatusInv = true;
  			    oinvAuto.checkBusyStatus();
  			    
  			  if(err.response.statusCode == "500"){
  		           sap.ui.commons.MessageBox.show("Server Response Timeout.\n Please try again.",
  		                sap.ui.commons.MessageBox.Icon.INFORMATION,
  		                "Information",
  		                [sap.ui.commons.MessageBox.Action.OK], 
  		                sap.ui.commons.MessageBox.Action.OK);
  			  }else if(err.response.statusCode == "503"){
  		           	sap.ui.commons.MessageBox.show("Service Unavailable.\n Please try again.",
  		                sap.ui.commons.MessageBox.Icon.INFORMATION,
  		                "Information",
  		                [sap.ui.commons.MessageBox.Action.OK], 
  		                sap.ui.commons.MessageBox.Action.OK);
  			  }else{
  				  sap.ui.commons.MessageBox.show("Server Response Timeout.\n Please try again.",
  		                sap.ui.commons.MessageBox.Icon.INFORMATION,
  		                "Information",
  		                [sap.ui.commons.MessageBox.Action.OK], 
  		                sap.ui.commons.MessageBox.Action.OK);
  			  } 
  		    });
	    
	},
	
	
	bindAutoPrefix:function(){
		
		filter =     "/Prefix_Unit_Numbers";
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
  			prefixAutoStatusInv = true;
   		    oinvAuto.checkBusyStatus();
   		    for(var i=0;i<data.results.length;i++)
   		    	autoPrefixDataInv.push({
	    			"Unit":data.results[i].Unpre,
	    			"id":data.results[i].Unpre
   		    	});
   		    
   		    sap.ui.getCore().byId('AutoPrefixInv').mProperties.suggestValues= autoPrefixDataInv;
		    sap.ui.getCore().byId('AutoPrefixInv').mProperties.codePropertyName ='id';
		    sap.ui.getCore().byId('AutoPrefixInv').mProperties.descriptionPropertyName='Unit';
		    sap.ui.getCore().byId('AutoPrefixInv').addholderitem();
  		    },
  		    function(err){
  		    	
  		    	prefixAutoStatusInv = true;
  	  		    oinvAuto.checkBusyStatus();
  	  		if(err.response.statusCode == "500"){
		           sap.ui.commons.MessageBox.show("Server Response Timeout.\n Please try again.",
		                sap.ui.commons.MessageBox.Icon.INFORMATION,
		                "Information",
		                [sap.ui.commons.MessageBox.Action.OK], 
		                sap.ui.commons.MessageBox.Action.OK);
			  }else if(err.response.statusCode == "503"){
		           	sap.ui.commons.MessageBox.show("Service Unavailable.\n Please try again.",
		                sap.ui.commons.MessageBox.Icon.INFORMATION,
		                "Information",
		                [sap.ui.commons.MessageBox.Action.OK], 
		                sap.ui.commons.MessageBox.Action.OK);
			  }else{
				  sap.ui.commons.MessageBox.show("Server Response Timeout.\n Please try again.",
		                sap.ui.commons.MessageBox.Icon.INFORMATION,
		                "Information",
		                [sap.ui.commons.MessageBox.Action.OK], 
		                sap.ui.commons.MessageBox.Action.OK);
			  }
  		    });
	    
	},
	
	checkBusyStatus:function(){
		if(unitAutoStatusInv && prefixAutoStatusInv){
			//alert("Status of Unit Auto : "+ unitAutoStatus + "Status of Prefix : "+ prefixAutoStatus);
			busyDialog.close();
		}
			
	}

});
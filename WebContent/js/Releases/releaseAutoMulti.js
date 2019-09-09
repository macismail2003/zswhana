jQuery.sap.require("sap.ui.model.json.JSONModel");
var autoUnitDataRel = [];
sap.ui.model.json.JSONModel.extend("releaseAutoMulti", {
	
	bindAutoUnit:function(){
		
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
  			busyDialog.close();
  		   for(var i=0;i<data.results.length;i++)
  			 autoUnitDataRel.push({
		    			"Unit":data.results[i].UnitType,
		    			"id":data.results[i].UnitType
		    });
  		   
  		   
  		   	sap.ui.getCore().byId('AutoUnitTypeRel').mProperties.suggestValues= autoUnitDataRel;
  		   	sap.ui.getCore().byId('AutoUnitTypeRel').mProperties.codePropertyName ='id';
  		   	sap.ui.getCore().byId('AutoUnitTypeRel').mProperties.descriptionPropertyName='Unit';
  		   	sap.ui.getCore().byId('AutoUnitTypeRel').addholderitem();   
  		  },
  		  function(err){
  		    	errorfromServer(err);
  		  });
		
		
	    
	    
	}

});
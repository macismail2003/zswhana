jQuery.sap.require("sap.ui.model.json.JSONModel");
var autoUnitDataRepair = [];
var dropCustomerRepair = [];
var unitAutoRepStatus = false;
var custDropRepStatus = false;
var orepAuto;
sap.ui.model.json.JSONModel.extend("repairAutoMulti", {
	
	bindAutoUnit:function(){
		repAuto = this;
		
		busyDialog.open();
		var filter = "/F4_Help_Unit_Type";
		
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
  			unitAutoRepStatus = true;
   		   	repAuto.checkBusyStatus();
   		   
  		   for(var i=0;i<data.results.length;i++)
  			 autoUnitDataRepair.push({
	    			"Unit":data.results[i].UnitType,
	    			"id":data.results[i].UnitType
	    	});
  		   
  		   sap.ui.getCore().byId('AutoUnitTypeRep').mProperties.suggestValues= autoUnitDataRepair;
		   sap.ui.getCore().byId('AutoUnitTypeRep').mProperties.codePropertyName ='id';
		   sap.ui.getCore().byId('AutoUnitTypeRep').mProperties.descriptionPropertyName='Unit';
		   sap.ui.getCore().byId('AutoUnitTypeRep').addholderitem(); 
  		   
  		  },function(err){
  		    	errorfromServer(err);
  		    });
 
	},
	
	bindCustomerDropDown:function(){
		var filter = "/F4_Customer_NameId_Appended";
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
  			custDropRepStatus = true;
   		   	repAuto.checkBusyStatus();
   		   	
  			for(var i=0;i<data.results.length;i++){
  				if(data.results[i].CustName != ""){
  					dropCustomerRepair[i] = data.results[i].NameOrg1;
	    		}
  			}
  			
	   		 $("#repairCustName").autocomplete({
	   	      source: dropCustomerRepair,
	   	      minLength: 0,
		   	})
		   	.focus(function(){            
		   		 if ($("ul.ui-autocomplete").is(":hidden")) {
		   		        $(this).autocomplete('search', '');
		   		    }
		   	})
		   	.keyup(function() {
		   	    var isValid = false;
		   	    var previousValueCustomer ="";
		   	    for (i in dropCustomerRepair) {
		   	        if (dropCustomerRepair[i].toLowerCase().match(this.value.toLowerCase())) {
		   	            isValid = true;
		   	        }
		   	    }
		   	    if (!isValid) {
		   	        this.value = previousValueCustomer
		   	    } else {
		   	    	previousValueCustomer = this.value;
		   	    }
		   	});
   		   	
  			
  		 },function(err){
  			errorfromServer(err);
	    });
	},
	
	checkBusyStatus:function(){
		if(unitAutoRepStatus && custDropRepStatus){
			busyDialog.close();
		}
	}

});
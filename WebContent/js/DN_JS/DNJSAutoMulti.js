jQuery.sap.require("sap.ui.model.json.JSONModel");
var autoUnitDataViewDNJS = [];
var dropCityViewDNJS = [];
var unitAutoDNJSStatus = false;
var custAutoListDNjs = false;
var cityDropDNJSStatus = false;
var dnjsAuto;
sap.ui.model.json.JSONModel.extend("DNJSAutoMulti", {
	
	bindAutoUnit:function(){
		dnjsAuto = this;
		
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
  		   //alert("data.results.length" + data.results.length);
  		   //alert("data" + window.JSON.stringify(data.results));
  		   for(var i=0;i<data.results.length;i++)
  			 autoUnitDataViewDNJS[i] = data.results[i].UnitType;

  		    
  		    var idAutoUnitType = sap.ui.getCore().byId("UnitTypeHTMLViewDNJS");
  		    var oUnitTypeHTMLViewLESSEE = sap.ui.getCore().byId("UnitTypeHTMLViewLESSEE");
  		    //idAutoUnitType.insertItem((new sap.ui.core.ListItem({text:"Select Unit Type", key:"0"})),0);
  		    //idAutoUnitType.setSelectedKey("0");

				if(autoUnitDataViewDNJS.length > 0){
					for(var j =0; j<autoUnitDataViewDNJS.length;j++){
						if(idAutoUnitType != undefined)
						idAutoUnitType.addItem(new sap.ui.core.ListItem({text:autoUnitDataViewDNJS[j], 
													key: autoUnitDataViewDNJS[j], additionalText: autoUnitDataViewDNJS[j]}));
						if(oUnitTypeHTMLViewLESSEE != undefined)
						oUnitTypeHTMLViewLESSEE.addItem(new sap.ui.core.ListItem({text:autoUnitDataViewDNJS[j], 
							key: autoUnitDataViewDNJS[j], additionalText: autoUnitDataViewDNJS[j]}));
					}
				}
			
  	  		
 		     
  		    unitAutoDNJSStatus = true;
  		    dnjsAuto.checkBusyStatus();
  		    
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
  		    		//alert("Error while reading Unit Type : "+ window.JSON.stringify(err.response));
  	  		    	sap.ui.commons.MessageBox.alert("Error while reading Unit Type : "+window.JSON.stringify(err.response));
  		    	}*/
  		    });
 
	},
	
	bindCityDropDown:function(){
		//busyDialog.open();
		//alert("Calling Customer drop down");
		var filter = "/F4_Country_City?$filter=Country eq ''";
		
		var previousValue = "";
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
  			 
  			for(var i=0;i<data.results.length;i++)
  				dropCityViewDNJS[i] = data.results[i].City;
  			
  			    cityDropDNJSStatus = true;
  			    dnjsAuto.checkBusyStatus();
   		   	
  			  var idAutoCity = sap.ui.getCore().byId("CityHTMLViewDNJS");
  			  var oCityHTMLViewLESSEE = sap.ui.getCore().byId("CityHTMLViewLESSEE");
    		    //idAutoCity.insertItem((new sap.ui.core.ListItem({text:"Select City", key:"0"})),0);
    		    //idAutoCity.setSelectedKey("0");

  				if(dropCityViewDNJS.length > 0){
  					for(var j =0; j<dropCityViewDNJS.length;j++){
  						if(idAutoCity != undefined)
  						idAutoCity.addItem(new sap.ui.core.ListItem({text:dropCityViewDNJS[j], 
  													key: dropCityViewDNJS[j], additionalText: dropCityViewDNJS[j]}));
  						if(oCityHTMLViewLESSEE != undefined)
  						oCityHTMLViewLESSEE.addItem(new sap.ui.core.ListItem({text:dropCityViewDNJS[j], 
								key: dropCityViewDNJS[j], additionalText: dropCityViewDNJS[j]}));
  					}
  				}
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
		    		//alert("Error while reading Unit Type :"+ window.JSON.stringify(err.response));
		    		sap.ui.commons.MessageBox.alert("Error while reading Unit Type : "+window.JSON.stringify(err.response));
		    	}*/
	    	
	    });
	},
	
	//GET ONLINE CUSTOMER LIST   
	getOnlineCutomerList: function(){
	   try{
		   sap.ui.getCore().byId("idAutoCmpltdnjsHardCode").destroyItems();
		   busyDialog.open();
		   var objCurntDNJSAutoMulti = new DNJSAutoMulti();
		   var urlToCall ='';
		   //var roleTypeCDORetReport = objLoginUser.getLoggedInUserType();
			//var custidCDORetReport = objLoginUser.getLoggedInUserID();
			
			if(objLoginUser.getLoggedInUserType().toUpperCase() == "SEACO"){
				urlToCall = serviceUrl + "/F4_Customer_NameId_Appended";
			}else{
				urlToCall = serviceUrl + "/F4_Multiple_Cust?$filter=Bname eq '"+ objLoginUser.getLoggedInUserName().toUpperCase() +"' and Customer eq '' and Param1 eq ''";
			}
		   
		   var objUtil = new utility();
		   objUtil.doOnlineRequest(urlToCall,objCurntDNJSAutoMulti.getOnlineCutomerListSuccess, objCurntDNJSAutoMulti.getOnlineCutomerListError);
	   }catch(e){
		   busyDialog.close();
			sap.ui.commons.MessageBox.alert("Error on occured while processing request: " + e);
	   }
   },
       
    //ON SUCCESS FOR CUSTOMER LIST
	getOnlineCutomerListSuccess: function(resultdata, response){
	   var idAutoCmpltdnjsHardCode = sap.ui.getCore().byId("idAutoCmpltdnjsHardCode");
	   try{
		   	//idAutoCmpltdnjsHardCode.insertItem((new sap.ui.core.ListItem({text:"Select Customer", key:"0"})),0);
		   	//idAutoCmpltdnjsHardCode.setSelectedKey("0");
			if(resultdata != undefined){
				if(resultdata.results.length > 0){
					for(var j =0; j<resultdata.results.length;j++){
						idAutoCmpltdnjsHardCode.addItem(new sap.ui.core.ListItem({text:resultdata.results[j].CustName, 
													key: resultdata.results[j].Partner, additionalText: resultdata.results[j].Partner}));
					}
				}
			}
			custAutoListDNjs = true;
  		    dnjsAuto.checkBusyStatus();
			//busyDialog.close();
	   }catch(e){
		  // busyDialog.close();
			sap.ui.commons.MessageBox.alert("Error on occured while processing request: " + e);
	   }
   },
    
	//ON ERROR FOR CUSTOMER LIST
    getOnlineCutomerListError: function(e){
    	//busyDialog.close();
    	var idAutoCmpltdnjsHardCode = sap.ui.getCore().byId("idAutoCmpltdnjsHardCode");
    	idAutoCmpltdnjsHardCode.insertItem((new sap.ui.core.ListItem({text:"Select Customer", key:"0"})),0);
    	idAutoCmpltdnjsHardCode.setSelectedKey("0"); 
    	errorfromServer(e);
   },
   
	checkBusyStatus:function(){
		if(unitAutoDNJSStatus && cityDropDNJSStatus && custAutoListDNjs){
			//alert("Status of Unit Auto : "+ unitAutoStatus + "Status of Prefix : "+ prefixAutoStatus);
			busyDialog.close();
		}
	}

});
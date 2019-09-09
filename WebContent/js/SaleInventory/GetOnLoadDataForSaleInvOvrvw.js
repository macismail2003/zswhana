var aRegionSaleInv = [];
var aCountrySaleInv = [];
var aCitySaleInv = [];
var locationDataSI = [];
var UnitTypeArraysSI = {
		EquipClassArraySI : [],
		EquipCatArraySI : [],
		aUnitTypeSI : []
};

sap.ui.model.json.JSONModel.extend("onLoadDataSaleInvOvrvw", {
	
	GetLocationDataSI: function(){
		var oCurrent=this;
		busyDialog.open();
		aRegionSaleInv = [];
		oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
		OData.request({ 
		      requestUri: serviceUrl + "/F4_Loc_Req13",
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
		    	var dataLen = data.results.length;
                locationDataSI = data.results;
                var dataArray = [];
                var dataArrayCountry = [];
                var dataArrayCity = [];
                for(var i=0 ; i< dataLen ; i++){
                       dataArray[i] = data.results[i].Region;
                       dataArrayCountry[i] = data.results[i].Country;
                       dataArrayCity[i] = data.results[i].City;
                }
                var oUtil = new utility();
                dataArray = oUtil.unique(dataArray);
                dataArrayCountry = oUtil.unique(dataArrayCountry);
                dataArrayCity = oUtil.unique(dataArrayCity);
                
                for(var j=0;j<dataArray.length;j++){
                       aRegionSaleInv.push({
                              "RegionSI":dataArray[j],
                              "id":dataArray[j]
                       });
                }
                
                sap.ui.getCore().byId('idAutoRegionSI').mProperties.suggestValues= aRegionSaleInv;
           sap.ui.getCore().byId('idAutoRegionSI').mProperties.codePropertyName ='RegionSI';
            sap.ui.getCore().byId('idAutoRegionSI').mProperties.descriptionPropertyName='RegionSI';
           sap.ui.getCore().byId('idAutoRegionSI').mProperties.enabled=true;
           //sap.ui.getCore().byId('FldAutoCmpltValHldr').clearSelectedValues();
           sap.ui.getCore().byId('idAutoRegionSI').addholderitem();
           
           dataArrayCountry.sort();
           aCountrySaleInv = [];
         for(var j=0;j<dataArrayCountry.length;j++){
                aCountrySaleInv.push({
                      "CountrySI":dataArrayCountry[j],
                      "id":dataArrayCountry[j]
                });
         }
         sap.ui.getCore().byId('idAutoCountrySI').mProperties.placeholder = 'Select Country';
         sap.ui.getCore().byId('idAutoCountrySI').mProperties.suggestValues=aCountrySaleInv;
           sap.ui.getCore().byId('idAutoCountrySI').mProperties.codePropertyName ='CountrySI';
            sap.ui.getCore().byId('idAutoCountrySI').mProperties.descriptionPropertyName='CountrySI';
           sap.ui.getCore().byId('idAutoCountrySI').mProperties.enabled=true;
           //sap.ui.getCore().byId('FldAutoCmpltValHldr').clearSelectedValues();
           sap.ui.getCore().byId('idAutoCountrySI').addholderitem();

             
           dataArrayCity.sort();
       	for(var j=0;j<dataArrayCity.length;j++){
       		aCitySaleInv.push({
       			"CitySI":dataArrayCity[j],
       			"id":dataArrayCity[j]
       		})
       	}
       	    	
       	sap.ui.getCore().byId('idAutoCitySI').mProperties.placeholder = 'Select City';
       	sap.ui.getCore().byId('idAutoCitySI').mProperties.suggestValues= aCitySaleInv;
           sap.ui.getCore().byId('idAutoCitySI').mProperties.codePropertyName ='CitySI';
            sap.ui.getCore().byId('idAutoCitySI').mProperties.descriptionPropertyName='CitySI';
           sap.ui.getCore().byId('idAutoCitySI').mProperties.enabled=true;
           //sap.ui.getCore().byId('FldAutoCmpltValHldr').clearSelectedValues();
           sap.ui.getCore().byId('idAutoCitySI').addholderitem();
           
		    	busyDialog.close();
		    },
		    function(err){
		    	busyDialog.close();
		    	errorfromServer(err);
		    });
	}, //GetLocationDataSI
	
	
	onRegionChange: function(selRegion){
		$("#idAutoCountrySI").removeAttr('disabled');
		$("#idAutoCitySI").removeAttr('disabled');
		var oCurrent = this;
		aCountrySaleInv = [];
		aCitySaleInv = [];
		var SelRegions = [];
		var aCountryForRegion = [];
		var dataArrayCountry = [];
		var dataArrayCity = [];
		
		if(selRegion != ""){
			SelRegions = selRegion.split("$");
		}
		
		if(SelRegions.length > 0){
			for(var i=0; i<SelRegions.length; i++){
				aCountryForRegion = jQuery.grep(locationDataSI, function(element, index){
		            return element.Region == SelRegions[i];
		     	});
				
				var countryLen = aCountryForRegion.length;
				var lenCountry = dataArrayCountry.length + countryLen;
				var lenCity = dataArrayCity.length + countryLen;
				
		    	for(var j=0 ; j<countryLen ; j++){
		    		var indexCountry = ((lenCountry -countryLen) + j);
		    		var indexCity = ((lenCity -countryLen) + j);
		    		dataArrayCountry[indexCountry] = aCountryForRegion[j].Country;
		    		dataArrayCity[indexCity] = aCountryForRegion[j].City;
		    	}
			}
		}
		else{
			for(var i=0; i<locationDataSI.length; i++){
				dataArrayCountry[i] = locationDataSI[i].Country;
				dataArrayCity[i] = locationDataSI[i].City;
			}
		}
		
    	var oUtil = new utility();
    	dataArrayCountry = oUtil.unique(dataArrayCountry);
    	dataArrayCountry.sort();
    	for(var j=0;j<dataArrayCountry.length;j++){
    		aCountrySaleInv.push({
    			"CountrySI":dataArrayCountry[j],
    			"id":dataArrayCountry[j]
    		});
    	}
    	sap.ui.getCore().byId('idAutoCountrySI').mProperties.placeholder = 'Select Country';
    	sap.ui.getCore().byId('idAutoCountrySI').mProperties.suggestValues=aCountrySaleInv;
        sap.ui.getCore().byId('idAutoCountrySI').mProperties.codePropertyName ='CountrySI';
         sap.ui.getCore().byId('idAutoCountrySI').mProperties.descriptionPropertyName='CountrySI';
        sap.ui.getCore().byId('idAutoCountrySI').mProperties.enabled=true;
        //sap.ui.getCore().byId('FldAutoCmpltValHldr').clearSelectedValues();
        sap.ui.getCore().byId('idAutoCountrySI').addholderitem();
        
    	
    	var oUtil = new utility();
    	dataArrayCity = oUtil.unique(dataArrayCity);
    	dataArrayCity.sort();
    	for(var j=0;j<dataArrayCity.length;j++){
    		aCitySaleInv.push({
    			"CitySI":dataArrayCity[j],
    			"id":dataArrayCity[j]
    		})
    	}
    	    	
    	sap.ui.getCore().byId('idAutoCitySI').mProperties.placeholder = 'Select City';
    	sap.ui.getCore().byId('idAutoCitySI').mProperties.suggestValues= aCitySaleInv;
        sap.ui.getCore().byId('idAutoCitySI').mProperties.codePropertyName ='CitySI';
         sap.ui.getCore().byId('idAutoCitySI').mProperties.descriptionPropertyName='CitySI';
        sap.ui.getCore().byId('idAutoCitySI').mProperties.enabled=true;
        //sap.ui.getCore().byId('FldAutoCmpltValHldr').clearSelectedValues();
        sap.ui.getCore().byId('idAutoCitySI').addholderitem();
        
		
	}, //onRegionChange
	
	onCountryChange: function(selRegion, selCountry){
		var oCurrent = this;
		var aCityForCountry = [];
		var dataArray = [];
		aCitySaleInv = [];
		var SelCountries = [];
		var SelRegions = [];
		if(selCountry != ""){
			 SelCountries = selCountry.split("$");
		}
		if(selRegion != ""){
			SelRegions = selRegion.split("$");
		}
		if(SelCountries.length > 0){
			for(var i=0;i<SelCountries.length;i++){
				aCityForCountry = jQuery.grep(locationDataSI, function(element, index){
		            return element.Country == SelCountries[i];
		     	});
				
				var cityLen = aCityForCountry.length;
				var len = dataArray.length + cityLen;
				
		    	for(var j=0 ; j< cityLen ; j++){
		    		var index = ((len -cityLen) + j);
		    		dataArray[index] = aCityForCountry[j].City;
		    	}
			}
		}
		else{
			if(SelRegions.length > 0 ){
				for(var i=0;i<SelRegions.length;i++){
					aCityForCountry = jQuery.grep(locationDataSI, function(element, index){
			            return element.Region == SelRegions[i];
			     	});
					var cityLen = aCityForCountry.length;
					var len = dataArray.length + cityLen;
					for(var j=0 ; j< cityLen ; j++){
						index =  ((len -cityLen) + j);
			    		dataArray[index] = aCityForCountry[j].City;
			    	}
				}
			}
			else{
				for(var i=0 ; i <locationDataSI.length;i++){
					dataArray[i] = locationDataSI[i].City;
				}
			}
		    	
		}
		//alert("len b4" + dataArray.length)
    	var oUtil = new utility();
    	dataArray = oUtil.unique(dataArray);
    	dataArray.sort();
    	//alert("len after" + dataArray.length)
    	for(var j=0;j<dataArray.length;j++){
    		aCitySaleInv.push({
    			"CitySI":dataArray[j],
    			"id":dataArray[j]
    		});
    	}
    	
    	sap.ui.getCore().byId('idAutoCitySI').mProperties.placeholder = 'Select City';
    	sap.ui.getCore().byId('idAutoCitySI').mProperties.suggestValues= aCitySaleInv;
        sap.ui.getCore().byId('idAutoCitySI').mProperties.codePropertyName ='CitySI';
         sap.ui.getCore().byId('idAutoCitySI').mProperties.descriptionPropertyName='CitySI';
        sap.ui.getCore().byId('idAutoCitySI').mProperties.enabled=true;
        //sap.ui.getCore().byId('FldAutoCmpltValHldr').clearSelectedValues();
        sap.ui.getCore().byId('idAutoCitySI').addholderitem();
        
        
    	/*$('#idAutoCitySI').val("");
    	$('#idAutoCitySI').siblings("ul").remove(); 
    	$('#idAutoCitySI').css("display","block");
	    $("#idAutoCitySI").tokenInput(aCitySaleInv, {
	    	width:$("#idAutoCitySI").width(),
	            theme: "custom",
	            tokenDelimiter: "$",
	            tokenLimit: null,	//ONLY SET FOR SINGLE SELECTION 
	            propertyToSearch: "CitySI", // TEXT COLUMN VALUE
	            preventDuplicates: true	//PREVENT DUPLICATE VALUES
	        });
		   	$('#idAutoCitySI').siblings("ul").css("width","100%");*/
		
	},
	
	PopulateEquipclassnEquipCatSaleInv: function(){
		var oGetData = this;
		busyDialog.open();
		UnitTypeArraysSI.EquipClassArraySI = [];
		UnitTypeArraysSI.EquipCatArraySI = [];
		oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
		OData.request({ 
		      requestUri: serviceUrl + "/F4_Equi_Cl_Cat_CR",
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
		    	var dataLen = data.results.length;
		    	for ( var i = 0; i < dataLen ; i++) {
		    		if(data.results[i].EqpClass != ""){
		    			UnitTypeArraysSI.EquipClassArraySI[i] = data.results[i];
		    		}
		    		if(data.results[i].EqpCat != ""){
		    			UnitTypeArraysSI.EquipCatArraySI[i] = data.results[i];
		    		}
				}
		    	var oModelStatic = new sap.ui.model.json.JSONModel();
				oModelStatic.setData(UnitTypeArraysSI);
		    	
				var vComboEquipClass = sap.ui.getCore().byId("idComboEquipClassSI");
                vComboEquipClass.setModel(oModelStatic);
                vComboEquipClass.bindItems("/EquipClassArraySI",new sap.ui.core.ListItem({text: "{EqpClass}"}));
                //vComboEquipClass.setValue(UnitTypeArraysSI.EquipClassArraySI[1].EqpClass); //to keep ALL as default
                
                var vComboEquipCat = sap.ui.getCore().byId("idComboEquipCatSI");
                vComboEquipCat.setModel(oModelStatic);
                vComboEquipCat.bindItems("/EquipCatArraySI",new sap.ui.core.ListItem({text: "{EqpCat}"}));
                //vComboEquipCat.setValue(UnitTypeArraysSI.EquipCatArraySI[1].EqpCat); //to keep ALL as default
          
                oModelStatic.updateBindings();
                
                 ////////////////////////////////////////////////////////////////////////////////////////////
                UnitTypeArraysSI.aUnitTypeSI = [];
                sap.ui.getCore().byId("idComboUnitTypeSI").destroyItems();
                sap.ui.getCore().byId("idComboUnitTypeSI").setValue("");

                oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
                var urlToCall = serviceUrl + "/F4_Equi_Cl_Cat_CR?$filter=EqpClass eq 'ALL' and EqpCat eq 'ALL'";
                //alert("url " + urlToCall);
                OData.request({ 
                      requestUri: urlToCall,
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
                       var dataLen = data.results.length;
                       for(var i=0 ; i< dataLen ; i++)
                              {      
                                     if(data.results[i].UnitType != ""){
                                           UnitTypeArraysSI.aUnitTypeSI[i] = data.results[i];
                                      }
                              }
                       var oModelStatic = new sap.ui.model.json.JSONModel();
                       oModelStatic.setData(UnitTypeArraysSI);             
                       var vComboUnitType = sap.ui.getCore().byId("idComboUnitTypeSI");
                              vComboUnitType.setModel(oModelStatic);
                              vComboUnitType.bindItems("/aUnitTypeSI",new sap.ui.core.ListItem({text: "{UnitType}"}));
                              //vComboUnitType.setValue(UnitTypeArraysSI.aUnitTypeSI[1].UnitType); //to keep ALL as default
                       
                              oModelStatic.updateBindings();
                       busyDialog.close();
                    },
                    function(err){
                       //busyDialog.close();
                       errorfromServer(err);
                       //alert("Error country change : "+ window.JSON.stringify(err.response));
                    }
                );
                 //////////////////////////////////////////////////////////////////////////////////////////////
	    	
		    	
		    	//busyDialog.close();
		    },
		    function(err){
		    	busyDialog.close();
		    	errorfromServer(err);
		    	//alert("Error while reading region : "+ window.JSON.stringify(err.response));
		    });
	},
	
	onEquipClassChangeSI: function(){
		//busyDialog.open();
		UnitTypeArraysSI.EquipCatArraySI = [];
		sap.ui.getCore().byId("idComboEquipCatSI").destroyItems();
		sap.ui.getCore().byId("idComboEquipCatSI").setValue("");
		sap.ui.getCore().byId("idComboUnitTypeSI").destroyItems();
		sap.ui.getCore().byId("idComboUnitTypeSI").setValue("");
		var vSelEquipClass= sap.ui.getCore().byId("idComboEquipClassSI").getValue();
		
		//alert("vSelEquipClass " + vSelEquipClass);
		oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
		var urlToCall = serviceUrl + "/F4_Equi_Cl_Cat_CR?$filter=EqpClass eq '" + vSelEquipClass +"'";
		OData.request({ 
		      requestUri: urlToCall,
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
		    	var dataLen = data.results.length;
		    	for(var i=0 ; i< dataLen ; i++)
		    		{
		    			if(data.results[i].EqpCat != ""){
		    				UnitTypeArraysSI.EquipCatArraySI[i] = data.results[i];
		    			}
		    			if(data.results[i].UnitType != ""){
		    				UnitTypeArraysSI.aUnitTypeSI[i] = data.results[i];		    			
		    			}
		    		}
		    	//alert("cat length " + SearchHelpDataInvDet.EquipCatArray[1].EqpCat);
		    	//alert("unitype length " + SearchHelpDataInvDet.UniTypeArray.length);
		    	var oModelStatic = new sap.ui.model.json.JSONModel();
		    	oModelStatic.setData(UnitTypeArraysSI);		    	
				var vComboEquipCat = sap.ui.getCore().byId("idComboEquipCatSI");
				vComboEquipCat.setModel(oModelStatic);
				vComboEquipCat.bindItems("/EquipCatArraySI",new sap.ui.core.ListItem({text: "{EqpCat}"}));
				//vComboEquipCat.insertItem(new sap.ui.core.ListItem({text:"Select Equipment Category"}),0);	    	
				
				var vComboUnitType = sap.ui.getCore().byId("idComboUnitTypeSI");
				vComboUnitType.setModel(oModelStatic);
				vComboUnitType.bindItems("/aUnitTypeSI",new sap.ui.core.ListItem({text: "{UnitType}"}));
				//vComboUnitType.insertItem(new sap.ui.core.ListItem({text:"Select Unit Type"}),0);	
				
		    	oModelStatic.updateBindings();
		    	//busyDialog.close();
		    },
		    function(err){
		    	//busyDialog.close();
		    	errorfromServer(err);
		    	//alert("Error country change : "+ window.JSON.stringify(err.response));
		    }
	);
		
	},
	
	onEquipCatChangeSI: function(){
		//busyDialog.open();
		UnitTypeArraysSI.aUnitTypeSI = [];
		sap.ui.getCore().byId("idComboUnitTypeSI").destroyItems();
		sap.ui.getCore().byId("idComboUnitTypeSI").setValue("");
		//sap.ui.getCore().byId("idComboUnitType").setPlaceholder("Select Unit Type");
		var vSelEquipClass= sap.ui.getCore().byId("idComboEquipClassSI").getValue();
		var vSelEquipCat = sap.ui.getCore().byId("idComboEquipCatSI").getValue();
		vSelEquipCat =  vSelEquipCat.replace(/\'/g, "$");
		vSelEquipCat =  vSelEquipCat.replace(/\+/g, "@");
		//alert("string " + vSelEquipCat);
		oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
		var urlToCall = serviceUrl + "/F4_Equi_Cl_Cat_CR?$filter=EqpClass eq '" + vSelEquipClass +"' and EqpCat eq '" + vSelEquipCat +"'";
		//alert("url " + urlToCall);
		OData.request({ 
		      requestUri: urlToCall,
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
		    	var dataLen = data.results.length;
		    	for(var i=0 ; i< dataLen ; i++)
		    		{	
		    			if(data.results[i].UnitType != ""){
		    				UnitTypeArraysSI.aUnitTypeSI[i] = data.results[i];
		    			}
		    		}
		    	var oModelStatic = new sap.ui.model.json.JSONModel();
		    	oModelStatic.setData(UnitTypeArraysSI);		    
		    	var vComboUnitType = sap.ui.getCore().byId("idComboUnitTypeSI");
				vComboUnitType.setModel(oModelStatic);
				vComboUnitType.bindItems("/aUnitTypeSI",new sap.ui.core.ListItem({text: "{UnitType}"}));
				//vComboUnitType.insertItem(new sap.ui.core.ListItem({text:"Select Unit Type"}),0);	
		    	
				oModelStatic.updateBindings();
		    	//busyDialog.close();
		    },
		    function(err){
		    	//busyDialog.close();
		    	errorfromServer(err);
		    	//alert("Error country change : "+ window.JSON.stringify(err.response));
		    }
		);
	},
	
	GetCountrySIO: function(){

        oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
        OData.request({ 
              requestUri: serviceUrl + "/F4_Loc_Req13",
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
               var dataLen = data.results.length;
               var dataArrayCountry = [];
               for(var i=0 ; i< dataLen ; i++){
                      dataArrayCountry[i] = data.results[i].Country;
               }
               var oUtil = new utility();
               dataArrayCountry = oUtil.unique(dataArrayCountry);
          dataArrayCountry.sort();
          aCountrySaleInv = [];
        for(var j=0;j<dataArrayCountry.length;j++){
               aCountrySaleInv.push({
                     "CountrySI":dataArrayCountry[j],
                     "id":dataArrayCountry[j]
               });
        }
        sap.ui.getCore().byId('idAutoCountrySI').mProperties.placeholder = 'Select Country';
        sap.ui.getCore().byId('idAutoCountrySI').mProperties.suggestValues=aCountrySaleInv;
          sap.ui.getCore().byId('idAutoCountrySI').mProperties.codePropertyName ='CountrySI';
           sap.ui.getCore().byId('idAutoCountrySI').mProperties.descriptionPropertyName='CountrySI';
          sap.ui.getCore().byId('idAutoCountrySI').mProperties.enabled=true;
          sap.ui.getCore().byId('idAutoCountrySI').addholderitem();
            },
            function(err){
               busyDialog.close();
               errorfromServer(err);
            });
 }


});


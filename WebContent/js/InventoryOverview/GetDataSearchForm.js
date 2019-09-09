
var aRegionDepoInv = [];
var aCountryDepoInv = [];
var aCatDepoInv = []; // MAC26092014
var aClaDepoInv = []; // MAC26092014
var aCityDepoInv = [];
var aUniDepoInv = []; // MAC26092014
var locationDataDI = [];
var UnitDataDI = []; //	MAC26092014
var UnitTypeArraysDI = {
		EquipClassArrayDI : [],
		EquipCatArrayDI : [],
		aUnitTypeDI : []
};

sap.ui.model.json.JSONModel.extend("onLoadDataDepoInvOvrvw", {
	
	GetLocationDataDI: function(){
		var oCurrent=this;
		busyDialog.open();
		aRegionDepoInv = [];
		oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
		OData.request({ 
		      // requestUri: serviceUrl + "/F4_Loc_Req13",		MAC26092014-
			requestUri: serviceUrl + "/F4_Loc_Req13_C",				// MAC26092014+
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
		    	locationDataDI = data.results;   
		    	/* Begin of adding by Seyed Ismail on 26.09.2014 MAC26092014+ */
                var dataArray = {	  
                		Code : [],
                		Description : []
                };
                
                var dataArrayCountry = {	  
                		Code : [],
                		Description : []
                };
                
                var dataArrayCity = {	  
                		Code : [],
                		Description : []
                };
                
		    	for(var i=0 ; i< dataLen ; i++){
		    		dataArray.Code[i] = data.results[i].RegCod;
		    		dataArray.Description[i] = data.results[i].Region;
		    		dataArrayCountry.Code[i] = data.results[i].CouCod;
		    		dataArrayCountry.Description[i] = data.results[i].Country;
		    		dataArrayCity.Code[i] = data.results[i].CitCod;
		    		dataArrayCity.Description[i] = data.results[i].City;
		    	}
		    	
                /* End of adding by Seyed Ismail on 26.09.2014 MAC26092014+ */
		    	
		    	/* Begin of commenting by Seyed Ismail on 26.09.2014 MAC26092014-
		    	for(var i=0 ; i< dataLen ; i++){
		    		dataArray[i] = data.results[i].Region;
                    dataArrayCountry[i] = data.results[i].Country;		
                    dataArrayCity[i] = data.results[i].City;				
		    	}
		    	
		    	
		    	
		    	var oUtil = new utility();
		    	dataArray = oUtil.unique(dataArray);
		    	
	              dataArrayCountry = oUtil.unique(dataArrayCountry);		
	              dataArrayCity = oUtil.unique(dataArrayCity);			
	             End of commenting by Seyed Ismail on 26.09.2014 MAC26092014- */    
		    	
		    	var oUtil = new utility();
		    	dataArray.Code = oUtil.unique(dataArray.Code);
		    	dataArray.Description = oUtil.unique(dataArray.Description);	
	            dataArrayCountry.Code = oUtil.unique(dataArrayCountry.Code);
	            dataArrayCountry.Description = oUtil.unique(dataArrayCountry.Description);	
	            dataArrayCity.Code = oUtil.unique(dataArrayCity.Code);		    		
	            dataArrayCity.Description = oUtil.unique(dataArrayCity.Description);	
	              
	            aRegionDepoInv = [];  
		    	for(var j=0;j<dataArray.Code.length;j++){
		    		aRegionDepoInv.push({
		    			"RegionDI":dataArray.Description[j],
		    			"id":dataArray.Code[j]
		    		});
		    	}
		    	
		    	sap.ui.getCore().byId('idAutoRegion').mProperties.suggestValues= aRegionDepoInv;
                sap.ui.getCore().byId('idAutoRegion').mProperties.codePropertyName ='id';
                 sap.ui.getCore().byId('idAutoRegion').mProperties.descriptionPropertyName='RegionDI';
                sap.ui.getCore().byId('idAutoRegion').mProperties.enabled=true;
                //sap.ui.getCore().byId('FldAutoCmpltValHldr').clearSelectedValues();
                sap.ui.getCore().byId('idAutoRegion').addholderitem();
                
                
              aCountryDepoInv = [];
              for(var j=0;j<dataArrayCountry.Code.length;j++){
                     aCountryDepoInv.push({
                           "CountryDI":dataArrayCountry.Description[j],
                           "id":dataArrayCountry.Code[j]
                     });
              }
              sap.ui.getCore().byId('idAutoCountry').mProperties.placeholder = 'Select Country';
              sap.ui.getCore().byId('idAutoCountry').mProperties.suggestValues=aCountryDepoInv;
                sap.ui.getCore().byId('idAutoCountry').mProperties.codePropertyName ='id';
                 sap.ui.getCore().byId('idAutoCountry').mProperties.descriptionPropertyName='CountryDI';
                sap.ui.getCore().byId('idAutoCountry').mProperties.enabled=true;
                //sap.ui.getCore().byId('FldAutoCmpltValHldr').clearSelectedValues();
                sap.ui.getCore().byId('idAutoCountry').addholderitem();

                  
                aCityDepoInv = [];
            	for(var j=0;j<dataArrayCity.Code.length;j++){
            		aCityDepoInv.push({
            			"CityDI":dataArrayCity.Description[j],
            			"id":dataArrayCity.Code[j]
            		});
            	}
            	    	
            	sap.ui.getCore().byId('idAutoCity').mProperties.placeholder = 'Select City';
            	sap.ui.getCore().byId('idAutoCity').mProperties.suggestValues= aCityDepoInv;
                sap.ui.getCore().byId('idAutoCity').mProperties.codePropertyName ='id';
                 sap.ui.getCore().byId('idAutoCity').mProperties.descriptionPropertyName='CityDI';
                sap.ui.getCore().byId('idAutoCity').mProperties.enabled=true;
                //sap.ui.getCore().byId('FldAutoCmpltValHldr').clearSelectedValues();
                sap.ui.getCore().byId('idAutoCity').addholderitem();
                
		    	busyDialog.close();
		    },
		    function(err){
		    	busyDialog.close();
		    	errorfromServer(err);
		    });
	}, //GetLocationDataDI
	
	//old code
	/*onRegionChange: function(selRegion){
		$("#idAutoCountry").removeAttr('disabled');
		$("#idAutoCity").removeAttr('disabled');
		var oCurrent = this;
		aCountryDepoInv = [];
		aCityDepoInv = [];
		var aCountryForRegion = jQuery.grep(locationDataDI, function(element, index){
            return element.Region == selRegion;
     	});
		var dataArrayCountry = [];
		var dataArrayCity = [];
    	for(var i=0 ; i< aCountryForRegion.length ; i++){
    		dataArrayCountry[i] = aCountryForRegion[i].Country;
    		dataArrayCity[i] = aCountryForRegion[i].City;
    	}
    	var oUtil = new utility();
    	dataArrayCountry = oUtil.unique(dataArrayCountry);
    	dataArrayCountry.sort();
    	for(var j=0;j<dataArrayCountry.length;j++){
    		aCountryDepoInv.push({
    			"CountryDI":dataArrayCountry[j],
    			"id":dataArrayCountry[j]
    		});
    	}
    	sap.ui.getCore().byId('idAutoCountry').mProperties.placeholder = 'Select Country';
    	sap.ui.getCore().byId('idAutoCountry').mProperties.suggestValues=aCountryDepoInv;
        sap.ui.getCore().byId('idAutoCountry').mProperties.codePropertyName ='CountryDI';
         sap.ui.getCore().byId('idAutoCountry').mProperties.descriptionPropertyName='CountryDI';
        sap.ui.getCore().byId('idAutoCountry').mProperties.enabled=true;
        //sap.ui.getCore().byId('FldAutoCmpltValHldr').clearSelectedValues();
        sap.ui.getCore().byId('idAutoCountry').addholderitem();
        
    	/*$('#idAutoCountry').val("");
    	$('#idAutoCountry').siblings("ul").remove(); 
    	$('#idAutoCountry').css("display","block");
    	document.getElementById("idAutoCountry").style.borderColor = "#cccccc";
		document.getElementById("idAutoCountry").style.background = "#ffffff";
		$("#idAutoCountry").focusin(
    			function(){
    				$('#idAutoCountry').siblings("ul").remove(); 
		        	$('#idAutoCountry').css("display","block");
    				$("#idAutoCountry").tokenInput(aCountryDepoInv, {
    					width:$("#idAutoCountry").width(),
    		            theme: "custom",
    		            tokenDelimiter: "$",
    		            tokenLimit: null,	//ONLY SET FOR DINGLE SELECTION 
    		            propertyToSearch: "CountryDI", // TEXT COLUMN VALUE
    		            preventDuplicates: true	//PREVENT DUPLICATE VALUES
    		        });
    		    	$('#idAutoCountry').siblings("ul").css("width","100%");
    			});
    	
    	$("#idAutoCountry").change(function(){
    		$('#idAutoCity').siblings("ul").remove(); 
        	$('#idAutoCity').css("display","block");
	   	var selCountry = $("#idAutoCountry").val();
	   		if(selCountry != ""){
	   			oCurrent.onCountryChange(selRegion,selCountry);
	   		}
	   		else{
	   			$('#idAutoCity').siblings("ul").remove(); 
            	$('#idAutoCity').css("display","block");
            	$('#idAutoCity').val("");
	   			oCurrent.onCountryChange(selRegion,"");
	   		}
    	});*/
    	
    	/*var oUtil = new utility();
    	dataArrayCity = oUtil.unique(dataArrayCity);
    	dataArrayCity.sort();
    	for(var j=0;j<dataArrayCity.length;j++){
    		aCityDepoInv.push({
    			"CityDI":dataArrayCity[j],
    			"id":dataArrayCity[j]
    		});
    	}
    	    	
    	sap.ui.getCore().byId('idAutoCity').mProperties.placeholder = 'Select City';
    	sap.ui.getCore().byId('idAutoCity').mProperties.suggestValues= aCityDepoInv;
        sap.ui.getCore().byId('idAutoCity').mProperties.codePropertyName ='CityDI';
         sap.ui.getCore().byId('idAutoCity').mProperties.descriptionPropertyName='CityDI';
        sap.ui.getCore().byId('idAutoCity').mProperties.enabled=true;
        //sap.ui.getCore().byId('FldAutoCmpltValHldr').clearSelectedValues();
        sap.ui.getCore().byId('idAutoCity').addholderitem();
        
    	/*document.getElementById("idAutoCity").style.borderColor = "#cccccc";
		document.getElementById("idAutoCity").style.background = "#ffffff";
		$("#idAutoCity").focusin(
    			function(){
    				$('#idAutoCity').siblings("ul").remove(); 
    	        	$('#idAutoCity').css("display","block");
    				$("#idAutoCity").tokenInput(aCityDepoInv, {
    					width:$("#idAutoCity").width(),
    		            theme: "custom",
    		            tokenDelimiter: "$",
    		            tokenLimit: null,	//ONLY SET FOR DINGLE SELECTION 
    		            propertyToSearch: "CityDI", // TEXT COLUMN VALUE
    		            preventDuplicates: true	//PREVENT DUPLICATE VALUES
    		        });
    			   	$('#idAutoCity').siblings("ul").css("width","100%");
    	});
		
	}, //onRegionChange   */
	
	
	/*Begin of addition by Seyed Ismail - Reqmt 13*/
	onRegionChange: function(selRegion){
		$("#idAutoCountry").removeAttr('disabled');
		$("#idAutoCity").removeAttr('disabled');
		var oCurrent = this;

		var SelRegions = [];
		var aCountryForRegion = [];
        
        var dataArrayCountry = {	  
        		Code : [],
        		Description : []
        };
        
        var dataArrayCity = {	  
        		Code : [],
        		Description : []
        };
		
		if(selRegion != ""){
			SelRegions = selRegion.split("$");
		}
		
		if(SelRegions.length > 0){
			for(var i=0; i<SelRegions.length; i++){
				aCountryForRegion = jQuery.grep(locationDataDI, function(element, index){
		            return element.RegCod == SelRegions[i];
		     	});
				
				var countryLen = aCountryForRegion.length;
				var lenCountry = dataArrayCountry.Code.length + countryLen;
				var lenCity = dataArrayCity.Code.length + countryLen;
				
		    	for(var j=0 ; j<countryLen ; j++){
		    		var indexCountry = ((lenCountry -countryLen) + j);
		    		var indexCity = ((lenCity -countryLen) + j);
		    		dataArrayCountry.Code[indexCountry] = aCountryForRegion[j].CouCod;
		    		dataArrayCountry.Description[indexCountry] = aCountryForRegion[j].Country;
		    		dataArrayCity.Code[indexCity] = aCountryForRegion[j].CitCod;
		    		dataArrayCity.Description[indexCity] = aCountryForRegion[j].City;
		    	}
			}
		}
		else{
			for(var i=0; i<locationDataDI.length; i++){
				dataArrayCountry.Code[i] = locationDataDI[i].CouCod;
				dataArrayCountry.Description[i] = locationDataDI[i].Country;
				dataArrayCity.Code[i] = locationDataDI[i].CitCod;
				dataArrayCity.Description[i] = locationDataDI[i].City;
			}
		}
		
    	var oUtil = new utility();
    	dataArrayCountry.Code = oUtil.unique(dataArrayCountry.Code);
    	dataArrayCountry.Description = oUtil.unique(dataArrayCountry.Description);
    	//dataArrayCountry.sort();
		aCountryDepoInv = [];
    	for(var j=0;j<dataArrayCountry.Code.length;j++){
    		aCountryDepoInv.push({
    			"CountryDI":dataArrayCountry.Description[j],
    			"id":dataArrayCountry.Code[j]
    		});
    	}
    	sap.ui.getCore().byId('idAutoCountry').mProperties.placeholder = 'Select Country';
    	sap.ui.getCore().byId('idAutoCountry').mProperties.suggestValues=aCountryDepoInv;
        sap.ui.getCore().byId('idAutoCountry').mProperties.codePropertyName ='id';
         sap.ui.getCore().byId('idAutoCountry').mProperties.descriptionPropertyName='CountryDI';
        sap.ui.getCore().byId('idAutoCountry').mProperties.enabled=true;
        //sap.ui.getCore().byId('FldAutoCmpltValHldr').clearSelectedValues();
        sap.ui.getCore().byId('idAutoCountry').addholderitem();
        
    	
    	var oUtil = new utility();
    	dataArrayCity.Code = oUtil.unique(dataArrayCity.Code);
    	dataArrayCity.Description = oUtil.unique(dataArrayCity.Description);
    	//dataArrayCity.sort();
		aCityDepoInv = [];
    	for(var j=0;j<dataArrayCity.Code.length;j++){
    		aCityDepoInv.push({
    			"CityDI":dataArrayCity.Description[j],
    			"id":dataArrayCity.Code[j]
    		})
    	}
    	    	
    	sap.ui.getCore().byId('idAutoCity').mProperties.placeholder = 'Select City';
    	sap.ui.getCore().byId('idAutoCity').mProperties.suggestValues= aCityDepoInv;
        sap.ui.getCore().byId('idAutoCity').mProperties.codePropertyName ='id';
         sap.ui.getCore().byId('idAutoCity').mProperties.descriptionPropertyName='CityDI';
        sap.ui.getCore().byId('idAutoCity').mProperties.enabled=true;
        //sap.ui.getCore().byId('FldAutoCmpltValHldr').clearSelectedValues();
        sap.ui.getCore().byId('idAutoCity').addholderitem();
	}, //onRegionChange*/
	/*End of addition by Seyed Ismail - Reqmt 13*/
	
		onCountryChange: function(selRegion, selCountry){
			var oCurrent = this;
			var aCityForCountry = [];
	        var dataArrayCity = {	  
	        		Code : [],
	        		Description : []
	        };
			aCityDepoInv = [];
			var SelCountries = [];
			var SelRegions = [];
			if(selCountry != ""){
				 SelCountries = selCountry.split("$");
			}
			
			SelRegions = selRegion.split("$");
			
			if(SelCountries.length > 0){
				for(var i=0;i<SelCountries.length;i++){
					aCityForCountry = jQuery.grep(locationDataDI, function(element, index){
			            return element.CouCod == SelCountries[i];
			     	});
					
					var cityLen = aCityForCountry.length;
					var len = dataArrayCity.Code.length + cityLen;
					
			    	for(var j=0 ; j< cityLen ; j++){
			    		var index = ((len -cityLen) + j);
			    		dataArrayCity.Code[index] = aCityForCountry[j].CitCod;
			    		dataArrayCity.Description[index] = aCityForCountry[j].City;
			    	}
				}
			}
			else{
				for(var i=0;i<SelRegions.length;i++){
					aCityForCountry = jQuery.grep(locationDataDI, function(element, index){
			            return element.RegCod == SelRegions[i];
			     	});
					var cityLen = aCityForCountry.length;
					var len = dataArrayCity.Code.length + cityLen;
					for(var j=0 ; j< cityLen ; j++){
						index =  ((len -cityLen) + j);
			    		dataArrayCity.Code[index] = aCityForCountry[j].CitCod;
			    		dataArrayCity.Description[index] = aCityForCountry[j].City;
			    	}
				}
					
			    	
			}
			//alert("len b4" + dataArray.length)
	    	var oUtil = new utility();
	    	dataArrayCity.Code = oUtil.unique(dataArrayCity.Code);
	    	dataArrayCity.Description = oUtil.unique(dataArrayCity.Description);
	    	//dataArray.sort();
	    	//alert("len after" + dataArray.length)
	    	for(var j=0;j<dataArrayCity.Code.length;j++){
	    		aCityDepoInv.push({
	    			"CityDI":dataArrayCity.Description[j],
	    			"id":dataArrayCity.Code[j]
	    		});
	    	}
	    	
	    	sap.ui.getCore().byId('idAutoCity').mProperties.placeholder = 'Select City';
	    	sap.ui.getCore().byId('idAutoCity').mProperties.suggestValues= aCityDepoInv;
	        sap.ui.getCore().byId('idAutoCity').mProperties.codePropertyName ='id';
	         sap.ui.getCore().byId('idAutoCity').mProperties.descriptionPropertyName='CityDI';
	        sap.ui.getCore().byId('idAutoCity').mProperties.enabled=true;
	        //sap.ui.getCore().byId('FldAutoCmpltValHldr').clearSelectedValues();
	        sap.ui.getCore().byId('idAutoCity').addholderitem();
	        
	        
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
	// Begin of commenting by Seyed Ismail
	/*PopulateEquipclassnEquipCatDepoInv: function(){
		var oGetData = this;
		busyDialog.open();
		UnitTypeArraysDI.EquipClassArrayDI = [];
		UnitTypeArraysDI.EquipCatArrayDI = [];
		oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
		OData.request({ 
		      requestUri: serviceUrl + "/Search_Help_Equi_Class_Cate_Unit",
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
		    			UnitTypeArraysDI.EquipClassArrayDI[i] = data.results[i];
		    		}
		    		if(data.results[i].EqpCat != ""){
		    			UnitTypeArraysDI.EquipCatArrayDI[i] = data.results[i];
		    		}
				}
		    	var oModelStatic = new sap.ui.model.json.JSONModel();
				oModelStatic.setData(UnitTypeArraysDI);
		    	
				var vComboEquipClass = sap.ui.getCore().byId("idComboEquipClass");
				vComboEquipClass.setModel(oModelStatic);
				vComboEquipClass.bindItems("/EquipClassArrayDI",new sap.ui.core.ListItem({text: "{EqpClass}"}));
				//vComboEquipClass.insertItem(new sap.ui.core.ListItem({text:"Select Equipment Class"}),0);
				
				var vComboEquipCat = sap.ui.getCore().byId("idComboEquipCat");
				vComboEquipCat.setModel(oModelStatic);
				vComboEquipCat.bindItems("/EquipCatArrayDI",new sap.ui.core.ListItem({text: "{EqpCat}"}));
				//vComboEquipCat.insertItem(new sap.ui.core.ListItem({text:"Select Equipment Category"}),0);	    	
		    	
				oModelStatic.updateBindings();
		    	busyDialog.close();
		    },
		    function(err){
		    	busyDialog.close();
		    	errorfromServer(err);
		    	//alert("Error while reading region : "+ window.JSON.stringify(err.response));
		    });
	},
	onEquipClassChangeDI: function(){
		//busyDialog.open();
		UnitTypeArraysDI.EquipCatArrayDI = [];
		sap.ui.getCore().byId("idComboEquipCat").destroyItems();
		sap.ui.getCore().byId("idComboEquipCat").setValue("");
		sap.ui.getCore().byId("idComboUnitType").destroyItems();
		sap.ui.getCore().byId("idComboUnitType").setValue("");
		var vSelEquipClass= sap.ui.getCore().byId("idComboEquipClass").getSelectedValues();		// Changed from getValue to getSelectedValues Seyed Ismail MAC
		
		//alert("vSelEquipClass " + vSelEquipClass);
		oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
		var urlToCall = serviceUrl + "/Search_Help_Equi_Class_Cate_Unit?$filter=EqpClass eq '" + vSelEquipClass +"'";
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
		    				UnitTypeArraysDI.EquipCatArrayDI[i] = data.results[i];
		    			}
		    			if(data.results[i].UnitType != ""){
		    				UnitTypeArraysDI.aUnitTypeDI[i] = data.results[i];		    			
		    			}
		    		}
		    	//alert("cat length " + SearchHelpDataInvDet.EquipCatArray[1].EqpCat);
		    	//alert("unitype length " + SearchHelpDataInvDet.UniTypeArray.length);
		    	var oModelStatic = new sap.ui.model.json.JSONModel();
		    	oModelStatic.setSizeLimit(1000);
		    	oModelStatic.setData(UnitTypeArraysDI);		    	
				var vComboEquipCat = sap.ui.getCore().byId("idComboEquipCat");
				vComboEquipCat.setModel(oModelStatic);
				vComboEquipCat.bindItems("/EquipCatArrayDI",new sap.ui.core.ListItem({text: "{EqpCat}"}));
				//vComboEquipCat.insertItem(new sap.ui.core.ListItem({text:"Select Equipment Category"}),0);	    	
				
				var vComboUnitType = sap.ui.getCore().byId("idComboUnitType");
				vComboUnitType.setModel(oModelStatic);
				vComboUnitType.bindItems("/aUnitTypeDI",new sap.ui.core.ListItem({text: "{UnitType}"}));
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
	*/
	// End of commenting by Seyed Ismail
	onEqpCatChangeDI: function(vSelEquipClass, vSelEquipCat, allSelectedClas, allSelectedCat){
		//busyDialog.open();
		UnitTypeArraysDI.aUnitTypeDI = [];
		//sap.ui.getCore().byId('idComboUnitType').mProperties.destroyItems();
		//sap.ui.getCore().byId('idComboUnitType').setValue("");
		sap.ui.getCore().byId('idComboUnitType').mProperties.placeholder = 'Select Unit Type';
		//var vSelEquipClass= sap.ui.getCore().byId("idComboEquipClass").getSelectedValues();		// Changed from getValue to getSelectedValues Seyed Ismail
		//var vSelEquipCat = sap.ui.getCore().byId("idComboEquipCat").getSelectedValues();		// Changed from getValue to getSelectedValues Seyed Ismail
		//vSelEquipCat =  vSelEquipCat.replace(/\'/g, "$");			//Commented by Seyed Ismail
		//vSelEquipCat =  vSelEquipCat.replace(/\+/g, "@");			//Commented by Seyed Ismail
		
		$("#idComboEquipCat").removeAttr('disabled');
		$("#idComboUnitType").removeAttr('disabled');
		//var oCurrent = this;
		//aEquipCar = [];
		//aUnitType = [];
		var SelEqpClas = [];
		var SelEqpCats = [];
		var aUniForCat = [];
		//var dataArrayUni = [];
        //var dataArrayUni = [];  // Commented by Seyed Ismail	
        var dataArrayUni = {	  // Added by Seyed Ismail
        		Code : [],
        		Description : []
        };
        
		if(vSelEquipClass != ""){
			SelEqpClas = vSelEquipClass.split("$");
		}
		
		if(vSelEquipCat != ""){
			SelEqpCats = vSelEquipCat.split("$");
		}
		
		
		if(SelEqpCats.length != 0){ // && allSelectedCat == ' '){
		//if(SelRegions.length > 0){
		for(var i=0;i<SelEqpCats.length;i++){
			aUniForCat = jQuery.grep(SelEqpCats, function(element, index){
           return element == "ALL";
		});
		}		
		// If both equip class & equip cat fields are initial
		if (aUniForCat.length == 0){
		for(var i=0;i<SelEqpCats.length;i++){
			aUniForCat = jQuery.grep(UnitDataDI, function(element, index){
           return element.ProdhCat == SelEqpCats[i];
			});
			
			var uniLen = aUniForCat.length;
			var len = dataArrayUni.Code.length + uniLen;
	 	for(var j=0 ; j< uniLen ; j++){
	 		var index = ((len - uniLen) + j);
	 		//dataArrayCat[index] = aUniForCat[j].VtextCat;
	 		// dataArrayUni[index] = aCatForCla[j].Maktx;					// Commented by Seyed Ismail
	        dataArrayUni.Description[index] = aUniForCat[j].Maktx;		// Added by Seyed Ismail
	        dataArrayUni.Code[index] = aUniForCat[j].Matnr;			    // Added by Seyed Ismail
	 	}

		}
		}
		else{
			
			// If Equipment category is empty/ALL, Then we need to check if Equipment Class has some value.
			
			
			//if(SelRegions.length > 0){
			for(var i=0;i<SelEqpClas.length;i++){
				aUniForCat = jQuery.grep(SelEqpClas, function(element, index){
	           return element == "ALL";
			});
			}		
			// If both equip class & equip cat fields are initial
			if (aUniForCat.length == 0){
			for(var i=0;i<SelEqpClas.length;i++){
				aUniForCat = jQuery.grep(UnitDataDI, function(element, index){
	           return element.Prodh == SelEqpClas[i];
				});
				
				var uniLen = aUniForCat.length;
				var len = dataArrayUni.Code.length + uniLen;
		 	for(var j=0 ; j< uniLen ; j++){
		 		var index = ((len - uniLen) + j);
		 		//dataArrayCat[index] = aUniForCat[j].VtextCat;
		 		// dataArrayUni[index] = aCatForCla[j].Maktx;					// Commented by Seyed Ismail
		        dataArrayUni.Description[index] = aUniForCat[j].Maktx;		// Added by Seyed Ismail
		        dataArrayUni.Code[index] = aUniForCat[j].Matnr;			    // Added by Seyed Ismail
		 	}

			}
			}
			else{
				aUniForCat = UnitDataDI.slice(0);
				
				var uniLen = aUniForCat.length;
				var len = dataArrayUni.Code.length + uniLen;
		 	for(var j=0 ; j< uniLen ; j++){
		 		var index = ((len - uniLen) + j);
		 		//dataArrayCat[index] = aUniForCat[j].VtextCat;
		 		// dataArrayUni[index] = aCatForCla[j].Maktx;					// Commented by Seyed Ismail
		        dataArrayUni.Description[index] = aUniForCat[j].Maktx;		// Added by Seyed Ismail
		        dataArrayUni.Code[index] = aUniForCat[j].Matnr;			    // Added by Seyed Ismail
		 	}

			}
			
			//////////////
			
			
			
			
			
			
			
			aUniForCat = UnitDataDI.slice(0);
			
			var uniLen = aUniForCat.length;
			var len = dataArrayUni.Code.length + uniLen;
	 	for(var j=0 ; j< uniLen ; j++){
	 		var index = ((len - uniLen) + j);
	 		//dataArrayCat[index] = aUniForCat[j].VtextCat;
	 		// dataArrayUni[index] = aCatForCla[j].Maktx;					// Commented by Seyed Ismail
	        dataArrayUni.Description[index] = aUniForCat[j].Maktx;		// Added by Seyed Ismail
	        dataArrayUni.Code[index] = aUniForCat[j].Matnr;			    // Added by Seyed Ismail
	 	}

		}
		}
		
		
		else{
			//if(SelRegions.length > 0){
			for(var i=0;i<SelEqpClas.length;i++){
				aUniForCat = jQuery.grep(SelEqpClas, function(element, index){
	           return element == "ALL";
			});
			}		
			// If both equip class & equip cat fields are initial
			if (aUniForCat.length == 0){
			for(var i=0;i<SelEqpClas.length;i++){
				aUniForCat = jQuery.grep(UnitDataDI, function(element, index){
	           return element.Prodh == SelEqpClas[i];
				});
				
				var uniLen = aUniForCat.length;
				var len = dataArrayUni.Code.length + uniLen;
		 	for(var j=0 ; j< uniLen ; j++){
		 		var index = ((len - uniLen) + j);
		 		//dataArrayCat[index] = aUniForCat[j].VtextCat;
		 		// dataArrayUni[index] = aCatForCla[j].Maktx;					// Commented by Seyed Ismail
		        dataArrayUni.Description[index] = aUniForCat[j].Maktx;		// Added by Seyed Ismail
		        dataArrayUni.Code[index] = aUniForCat[j].Matnr;			    // Added by Seyed Ismail
		 	}

			}
			}
			else{
				aUniForCat = UnitDataDI.slice(0);
				
				var uniLen = aUniForCat.length;
				var len = dataArrayUni.Code.length + uniLen;
		 	for(var j=0 ; j< uniLen ; j++){
		 		var index = ((len - uniLen) + j);
		 		//dataArrayCat[index] = aUniForCat[j].VtextCat;
		 		// dataArrayUni[index] = aCatForCla[j].Maktx;					// Commented by Seyed Ismail
		        dataArrayUni.Description[index] = aUniForCat[j].Maktx;		// Added by Seyed Ismail
		        dataArrayUni.Code[index] = aUniForCat[j].Matnr;			    // Added by Seyed Ismail
		 	}

			}
		}
		
		
 	//var oUtil = new utility();				// Commented by Seyed Ismail
 	//dataArrayUni = oUtil.unique(dataArrayUni); // Commented by Seyed Ismail
 	//dataArrayUni.sort();						// Commented by Seyed Ismail
 	
 	aUniDepoInv = [];
 	// Begin of adding by Seyed Ismail
 	if(dataArrayUni.Code[0] != 'ALL'){
		aUniDepoInv.push({								
 			"UnitDI":'ALL',
 			"id":'ALL'
 		});
 	}
 	for(var j=0;j<dataArrayUni.Code.length;j++){
 		aUniDepoInv.push({
 			"UnitDI":dataArrayUni.Description[j],
 			"id":dataArrayUni.Code[j]
 		});
 	}
 	    	
 	sap.ui.getCore().byId('idComboUnitType').mProperties.placeholder = 'Select Unit Type';
 	sap.ui.getCore().byId('idComboUnitType').mProperties.suggestValues= aUniDepoInv;
     sap.ui.getCore().byId('idComboUnitType').mProperties.codePropertyName ='id'; //Changed from UnitDI to id
     sap.ui.getCore().byId('idComboUnitType').mProperties.descriptionPropertyName='UnitDI';
     sap.ui.getCore().byId('idComboUnitType').mProperties.enabled=true;
     sap.ui.getCore().byId('idComboUnitType').addholderitem();      
		
	//}
     
	},
	
	// Begin of adding by Seyed Ismail
	
	// Fill the fields region, country and city if there are no values in Region.
	
	refillFields: function(){
		
		/* Begin of adding by Seyed Ismail on 26.09.2014 MAC26092014+ */
        var dataArray = {	  
        		Code : [],
        		Description : []
        };
        
        var dataArrayCountry = {	  
        		Code : [],
        		Description : []
        };
        
        var dataArrayCity = {	  
        		Code : [],
        		Description : []
        };
        
    	for(var i=0 ; i< locationDataDI.length ; i++){
    		dataArray.Code[i] = locationDataDI[i].RegCod;
    		dataArray.Description[i] = locationDataDI[i].Region;
    		dataArrayCountry.Code[i] = locationDataDI[i].CouCod;
    		dataArrayCountry.Description[i] = locationDataDI[i].Country;
    		dataArrayCity.Code[i] = locationDataDI[i].CitCod;
    		dataArrayCity.Description[i] = locationDataDI[i].City;
    	}
    	
        /* End of adding by Seyed Ismail on 26.09.2014 MAC26092014+ */
    	
    	/* Begin of commenting by Seyed Ismail on 26.09.2014 MAC26092014-
    	for(var i=0 ; i< dataLen ; i++){
    		dataArray[i] = data.results[i].Region;
            dataArrayCountry[i] = data.results[i].Country;		
            dataArrayCity[i] = data.results[i].City;				
    	}
    	
    	
    	
    	var oUtil = new utility();
    	dataArray = oUtil.unique(dataArray);
    	
          dataArrayCountry = oUtil.unique(dataArrayCountry);		
          dataArrayCity = oUtil.unique(dataArrayCity);			
         End of commenting by Seyed Ismail on 26.09.2014 MAC26092014- */    
    	
    	var oUtil = new utility();
    	dataArray.Code = oUtil.unique(dataArray.Code);
    	dataArray.Description = oUtil.unique(dataArray.Description);	
        dataArrayCountry.Code = oUtil.unique(dataArrayCountry.Code);
        dataArrayCountry.Description = oUtil.unique(dataArrayCountry.Description);	
        dataArrayCity.Code = oUtil.unique(dataArrayCity.Code);		    		
        dataArrayCity.Description = oUtil.unique(dataArrayCity.Description);	
          
        aRegionDepoInv = [];  
    	for(var j=0;j<dataArray.Code.length;j++){
    		aRegionDepoInv.push({
    			"RegionDI":dataArray.Description[j],
    			"id":dataArray.Code[j]
    		});
    	}
    	
    	sap.ui.getCore().byId('idAutoRegion').mProperties.placeholder = 'Select Region';
    	sap.ui.getCore().byId('idAutoRegion').mProperties.suggestValues= aRegionDepoInv;
        sap.ui.getCore().byId('idAutoRegion').mProperties.codePropertyName ='id';
         sap.ui.getCore().byId('idAutoRegion').mProperties.descriptionPropertyName='RegionDI';
        sap.ui.getCore().byId('idAutoRegion').mProperties.enabled=true;
        //sap.ui.getCore().byId('FldAutoCmpltValHldr').clearSelectedValues();
        sap.ui.getCore().byId('idAutoRegion').addholderitem();
        
        
      aCountryDepoInv = [];
      for(var j=0;j<dataArrayCountry.Code.length;j++){
             aCountryDepoInv.push({
                   "CountryDI":dataArrayCountry.Description[j],
                   "id":dataArrayCountry.Code[j]
             });
      }
      sap.ui.getCore().byId('idAutoCountry').mProperties.placeholder = 'Select Country';
      sap.ui.getCore().byId('idAutoCountry').mProperties.suggestValues=aCountryDepoInv;
        sap.ui.getCore().byId('idAutoCountry').mProperties.codePropertyName ='id';
         sap.ui.getCore().byId('idAutoCountry').mProperties.descriptionPropertyName='CountryDI';
        sap.ui.getCore().byId('idAutoCountry').mProperties.enabled=true;
        //sap.ui.getCore().byId('FldAutoCmpltValHldr').clearSelectedValues();
        sap.ui.getCore().byId('idAutoCountry').addholderitem();

          
        aCityDepoInv = [];
    	for(var j=0;j<dataArrayCity.Code.length;j++){
    		aCityDepoInv.push({
    			"CityDI":dataArrayCity.Description[j],
    			"id":dataArrayCity.Code[j]
    		});
    	}
    	    	
    	sap.ui.getCore().byId('idAutoCity').mProperties.placeholder = 'Select City';
    	sap.ui.getCore().byId('idAutoCity').mProperties.suggestValues= aCityDepoInv;
        sap.ui.getCore().byId('idAutoCity').mProperties.codePropertyName ='id';
         sap.ui.getCore().byId('idAutoCity').mProperties.descriptionPropertyName='CityDI';
        sap.ui.getCore().byId('idAutoCity').mProperties.enabled=true;
        //sap.ui.getCore().byId('FldAutoCmpltValHldr').clearSelectedValues();
        sap.ui.getCore().byId('idAutoCity').addholderitem();
        
	},
	
	// Get values for country when there is a change in region
	GetCountryDIO: function(){

        oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
        OData.request({ 
              requestUri: serviceUrl + "/F4_Loc_Req13_C",
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
          aCountryDepoInv = [];
        for(var j=0;j<dataArrayCountry.length;j++){
               aCountryDepoInv.push({
                     "CountryDI":dataArrayCountry[j],
                     "id":dataArrayCountry[j]
               });
        }
        sap.ui.getCore().byId('idAutoCountry').mProperties.placeholder = 'Select Country';
        sap.ui.getCore().byId('idAutoCountry').mProperties.suggestValues=aCountryDepoInv;
          sap.ui.getCore().byId('idAutoCountry').mProperties.codePropertyName ='CountryDI';
           sap.ui.getCore().byId('idAutoCountry').mProperties.descriptionPropertyName='CountryDI';
          sap.ui.getCore().byId('idAutoCountry').mProperties.enabled=true;
          sap.ui.getCore().byId('idAutoCountry').addholderitem();
            },
            function(err){
               busyDialog.close();
               errorfromServer(err);
            });
 },
 
 onEqpClaChangeDI: function(selEqpCla){
		$("#idComboEquipCat").removeAttr('disabled');
		$("#idComboUnitType").removeAttr('disabled');
		//var oCurrent = this;
		aEquipCar = [];
		aUnitType = [];
		var SelEqpClas = [];
		var aCatForCla = [];
		// var dataArrayCat = []; // Commented by Seyed Ismail	
        //var dataArrayUni = [];  // Commented by Seyed Ismail	
		
        var dataArrayCat = {	  // Added by Seyed Ismail
        		Code : [],
        		Description : []
        };
        
        var dataArrayUni = {	  // Added by Seyed Ismail
        		Code : [],
        		Description : []
        };

		if(selEqpCla != ""){
			SelEqpClas = selEqpCla.split("$");
		}
		
		//if(SelRegions.length > 0){
		for(var i=0;i<SelEqpClas.length;i++){
			aCatForCla = jQuery.grep(SelEqpClas, function(element, index){
           return element == "ALL";
     });
		}	
		if (aCatForCla.length == 0){
		for(var i=0;i<SelEqpClas.length;i++){
			aCatForCla = jQuery.grep(UnitDataDI, function(element, index){
           return element.Prodh == SelEqpClas[i];
			});
			
			var catLen = aCatForCla.length;
			var len = dataArrayCat.Code.length + catLen;
			for(var j=0 ; j< catLen ; j++){
	 		var index = ((len - catLen) + j);
	        dataArrayCat.Description[index] = aCatForCla[j].VtextCat;		// Added by Seyed Ismail
	        dataArrayCat.Code[index] = aCatForCla[j].ProdhCat;			    // Added by Seyed Ismail
	 		//dataArrayCat[index] = aCatForCla[j].VtextCat;					// Commented by Seyed Ismail
	 		// dataArrayUni[index] = aCatForCla[j].Maktx;					// Commented by Seyed Ismail
	        dataArrayUni.Description[index] = aCatForCla[j].Maktx;		// Added by Seyed Ismail
	        dataArrayUni.Code[index] = aCatForCla[j].Matnr;			    // Added by Seyed Ismail
	 	}
	 	
		}
		}
		else{
			aCatForCla = UnitDataDI.slice(0);
			sap.ui.getCore().byId('idComboEquipClass').mProperties.enabled=false;
			
			var catLen = aCatForCla.length;
			var len = dataArrayCat.Code.length + catLen;
			for(var j=0 ; j< catLen ; j++){
	 		var index = ((len - catLen) + j);
	        dataArrayCat.Description[index] = aCatForCla[j].VtextCat;		// Added by Seyed Ismail
	        dataArrayCat.Code[index] = aCatForCla[j].ProdhCat;			    // Added by Seyed Ismail
	 		//dataArrayCat[index] = aCatForCla[j].VtextCat;					// Commented by Seyed Ismail
	 		// dataArrayUni[index] = aCatForCla[j].Maktx;					// Commented by Seyed Ismail
	        dataArrayUni.Description[index] = aCatForCla[j].Maktx;		// Added by Seyed Ismail
	        dataArrayUni.Code[index] = aCatForCla[j].Matnr;			    // Added by Seyed Ismail
	 	}
		}
 	
		
 	var oUtil = new utility();								
 	dataArrayCat.Code = oUtil.unique(dataArrayCat.Code);	
 	dataArrayCat.Description = oUtil.unique(dataArrayCat.Description);	
 	//dataArrayCat.sort();										// Commented by Seyed Ismail
 	
 	aCatDepoInv = [];
 	// Begin of adding by Seyed Ismail
 	if(dataArrayCat.Code[0] != 'ALL'){
		aCatDepoInv.push({								
 			"CatDI":'ALL',
 			"id":'ALL'
 		});
 	}
 	// End of adding by Seyed Ismail
 	for(var j=0;j<dataArrayCat.Code.length;j++){
 		aCatDepoInv.push({								
 			"CatDI":dataArrayCat.Description[j],
 			"id":dataArrayCat.Code[j]
 		});
 	}
 	sap.ui.getCore().byId('idComboEquipCat').mProperties.placeholder = 'Select Equipment Category';
 	sap.ui.getCore().byId('idComboEquipCat').mProperties.suggestValues= aCatDepoInv;
     sap.ui.getCore().byId('idComboEquipCat').mProperties.codePropertyName ='id';		//Changed from CatDI to id
     sap.ui.getCore().byId('idComboEquipCat').mProperties.descriptionPropertyName='CatDI';
     sap.ui.getCore().byId('idComboEquipCat').mProperties.enabled=true;
     //sap.ui.getCore().byId('FldAutoCmpltValHldr').clearSelectedValues();
     sap.ui.getCore().byId('idComboEquipCat').addholderitem();
     

 	
  	//var oUtil = new utility();								// Commented by Seyed Ismail				
 	//dataArrayUni.Code = oUtil.unique(dataArrayUni.Code);		// Commented by Seyed Ismail
 	//dataArrayUni.Description = oUtil.unique(dataArrayUni.Description);	// Commented by Seyed Ismail
 	//dataArrayUni.sort();							// Commented by Seyed Ismail
 	aUniDepoInv = [];	
 	// Begin of adding by Seyed Ismail
 	if(dataArrayUni.Code[0] != 'ALL'){
		aUniDepoInv.push({								
 			"UnitDI":'ALL',
 			"id":'ALL'
 		});
 	}
 	// End of adding by Seyed Ismail
 	for(var j=0;j<dataArrayUni.Code.length;j++){		// Added .Code by Seyed Ismail
 		aUniDepoInv.push({
 			"UnitDI":dataArrayUni.Description[j],						// Added .Description by Seyed Ismail
 			"id":dataArrayUni.Code[j]							// Added .Code by Seyed Ismail	
 		});
 	}
 	    	
 	sap.ui.getCore().byId('idComboUnitType').mProperties.placeholder = 'Select Unit Type';
 	sap.ui.getCore().byId('idComboUnitType').mProperties.suggestValues= aUniDepoInv;
     sap.ui.getCore().byId('idComboUnitType').mProperties.codePropertyName ='id'; //Changed from UnitDI to id
     sap.ui.getCore().byId('idComboUnitType').mProperties.descriptionPropertyName='UnitDI';
     sap.ui.getCore().byId('idComboUnitType').mProperties.enabled=true;
     sap.ui.getCore().byId('idComboUnitType').addholderitem();      
		
	//}
	}, //onRegionChange*/
	
 
	// Get values for equipment category when there is a change in equipment class
	GetEqpCatDIO: function(){

		oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
        OData.request({ 
              requestUri: serviceUrl + "/F4_Loc_Req13_C",
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
          aCountryDepoInv = [];
        for(var j=0;j<dataArrayCountry.length;j++){
               aCountryDepoInv.push({
                     "CountryDI":dataArrayCountry[j],
                     "id":dataArrayCountry[j]
               });
        }
        sap.ui.getCore().byId('idAutoCountry').mProperties.placeholder = 'Select Country';
        sap.ui.getCore().byId('idAutoCountry').mProperties.suggestValues=aCountryDepoInv;
          sap.ui.getCore().byId('idAutoCountry').mProperties.codePropertyName ='CountryDI';
           sap.ui.getCore().byId('idAutoCountry').mProperties.descriptionPropertyName='CountryDI';
          sap.ui.getCore().byId('idAutoCountry').mProperties.enabled=true;
          sap.ui.getCore().byId('idAutoCountry').addholderitem();
            },
            function(err){
               busyDialog.close();
               errorfromServer(err);
            });
},

PopulateEquipDetForDepoInv: function(){		//Changed from PopulateEquipclassnEquipCatDepoInv to PopulateEquipDetForDepoInv by Seyed Ismail
	busyDialog.open();
	aClaDepoInv = [];
	UnitTypeArraysDI.EquipClassArrayDI = [];
	UnitTypeArraysDI.EquipCatArrayDI = [];
	oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
	OData.request({ 
	      requestUri: serviceUrl + "/F4_Equi_Cate", // Changed by Seyed Ismail from Search_Help_Equi_Class_Cate_Unit to prod_hiers
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
	    	UnitDataDI = data.results;
	    	//var dataArray = [];	// Commented by Seyed Ismail	
	          var dataArray = {	  // Added by Seyed Ismail
	            		Code : [],
	            		Description : []
	            };
            //var dataArrayCat = [];	// Commented by Seyed Ismail		
	          var dataArrayCat = {	  // Added by Seyed Ismail
	            		Code : [],
	            		Description : []
	            };
            //var dataArrayUni = [];  // Commented by Seyed Ismail	
            var dataArrayUni = {	  // Added by Seyed Ismail
            		Code : [],
            		Description : []
            };
	    	for(var i=0 ; i< dataLen ; i++){
	    		if(data.results[i].DepInv=='X'){
	    		//dataArray.push(data.results[i].Vtext);
                //dataArrayCat.push(data.results[i].VtextCat);	
                dataArray.Description.push(data.results[i].Vtext);		// Added by Seyed Ismail
                dataArray.Code.push(data.results[i].Prodh);			    // Added by Seyed Ismail
                dataArrayCat.Description.push(data.results[i].VtextCat);		// Added by Seyed Ismail
                dataArrayCat.Code.push(data.results[i].ProdhCat);			    // Added by Seyed Ismail
                dataArrayUni.Description.push(data.results[i].Maktx);		// Added by Seyed Ismail
                dataArrayUni.Code.push(data.results[i].Matnr);			    // Added by Seyed Ismail
	    		}
	    			
	    	}
	    	var oUtil = new utility();
	    	dataArray.Code = oUtil.unique(dataArray.Code);
	    	dataArray.Description = oUtil.unique(dataArray.Description);
	    		
	    	for(var j=0;j<dataArray.Code.length;j++){
	    		aClaDepoInv.push({
	    			"ClaDI":dataArray.Description[j],
	    			"id":dataArray.Code[j]
	    		})
	    	}
	    	
	    	sap.ui.getCore().byId('idComboEquipClass').mProperties.suggestValues= aClaDepoInv;
            sap.ui.getCore().byId('idComboEquipClass').mProperties.codePropertyName ='id';
             sap.ui.getCore().byId('idComboEquipClass').mProperties.descriptionPropertyName='ClaDI';
            sap.ui.getCore().byId('idComboEquipClass').mProperties.enabled=true;
            //sap.ui.getCore().byId('FldAutoCmpltValHldr').clearSelectedValues();
            sap.ui.getCore().byId('idComboEquipClass').addholderitem();
            
            dataArrayCat.Code = oUtil.unique(dataArrayCat.Code);
            dataArrayCat.Description = oUtil.unique(dataArrayCat.Description);	
            //dataArrayCat.sort();
            aCatDepoInv = [];
            for(var j=0;j<dataArrayCat.Code.length;j++){
                 aCatDepoInv.push({
                       "CatDI":dataArrayCat.Description[j],
                       "id":dataArrayCat.Code[j]
                 });
          }
          sap.ui.getCore().byId('idComboEquipCat').mProperties.placeholder = 'Select Equipment Category';
          sap.ui.getCore().byId('idComboEquipCat').mProperties.suggestValues=aCatDepoInv;
            sap.ui.getCore().byId('idComboEquipCat').mProperties.codePropertyName ='id';
             sap.ui.getCore().byId('idComboEquipCat').mProperties.descriptionPropertyName='CatDI';
            sap.ui.getCore().byId('idComboEquipCat').mProperties.enabled=true;
            //sap.ui.getCore().byId('FldAutoCmpltValHldr').clearSelectedValues();
            sap.ui.getCore().byId('idComboEquipCat').addholderitem();

              
            //dataArrayUni.sort();
        	for(var j=0;j<dataArrayUni.Code.length;j++){
        		aUniDepoInv.push({
        			"UnitDI":dataArrayUni.Description[j],
        			"id":dataArrayUni.Code[j]
        		})
        	}
        	    	
        	sap.ui.getCore().byId('idComboUnitType').mProperties.placeholder = 'Select Unit Type';
        	sap.ui.getCore().byId('idComboUnitType').mProperties.suggestValues= aUniDepoInv;
            sap.ui.getCore().byId('idComboUnitType').mProperties.codePropertyName ='id';	// Changed from UnitDI to id by Seyed Ismail MAC
             sap.ui.getCore().byId('idComboUnitType').mProperties.descriptionPropertyName='UnitDI';
            sap.ui.getCore().byId('idComboUnitType').mProperties.enabled=true;
            //sap.ui.getCore().byId('FldAutoCmpltValHldr').clearSelectedValues();
            sap.ui.getCore().byId('idComboUnitType').addholderitem();
            
	    	busyDialog.close();
	    },
	    function(err){
	    	busyDialog.close();
	    	errorfromServer(err);
	    });
},

onEqpCatChangeDINew: function(selRegion, selCountry){
	var oCurrent = this;
	var aCityForCountry = [];
	var dataArray = [];
	aCityDepoInv = [];
	var SelCountries = [];
	var SelRegions = [];
	if(selCountry != ""){
		 SelCountries = selCountry.split("$");
	}
	
	SelRegions = selRegion.split("$");
	
	if(SelCountries.length > 0){
		for(var i=0;i<SelCountries.length;i++){
			aCityForCountry = jQuery.grep(UnitDataDI, function(element, index){
	            return element.ProdhCat == SelCountries[i];
	     	});
			
			var cityLen = aCityForCountry.length;
			var len = dataArray.length + cityLen;
			
	    	for(var j=0 ; j< cityLen ; j++){
	    		var index = ((len -cityLen) + j);
	    		dataArray[index] = aCityForCountry[j].Matnr;
	    	}
		}
	}
	else{
		for(var i=0;i<SelRegions.length;i++){
			aCityForCountry = jQuery.grep(UnitDtaDI, function(element, index){
	            return element.Prodh == SelRegions[i];
	     	});
			var cityLen = aCityForCountry.length;
			var len = dataArray.length + cityLen;
			for(var j=0 ; j< cityLen ; j++){
				index =  ((len -cityLen) + j);
	    		dataArray[index] = aCityForCountry[j].Matnr;
	    	}
		}
			
	    	
	}
	//alert("len b4" + dataArray.length)
	//var oUtil = new utility();
	//dataArray = oUtil.unique(dataArray);
	//dataArray.sort();
	//alert("len after" + dataArray.length)
	for(var j=0;j<dataArray.length;j++){
		aCityDepoInv.push({
			"CityDI":dataArray[j],
			"id":dataArray[j]
		});
	}
	
	sap.ui.getCore().byId('idComboUnitType').mProperties.placeholder = 'Select Unit Type';
	sap.ui.getCore().byId('idComboUnitType').mProperties.suggestValues= aCityDepoInv;
    sap.ui.getCore().byId('idComboUnitType').mProperties.codePropertyName ='id';
     sap.ui.getCore().byId('idComboUnitType').mProperties.descriptionPropertyName='CityDI';
    sap.ui.getCore().byId('idComboUnitType').mProperties.enabled=true;
    //sap.ui.getCore().byId('FldAutoCmpltValHldr').clearSelectedValues();
    sap.ui.getCore().byId('idComboUnitType').addholderitem();
    
    
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

onEqpClaChangeDIALL: function(){
	$("#idComboEquipCat").removeAttr('disabled');
	$("#idComboUnitType").removeAttr('disabled');
	//var oCurrent = this;
	aEquipCar = [];
	aUnitType = [];
	var SelEqpClas = [];
	var aCatForCla = [];
	// var dataArrayCat = []; // Commented by Seyed Ismail	
    //var dataArrayUni = [];  // Commented by Seyed Ismail	
	
    var dataArrayCat = {	  // Added by Seyed Ismail
    		Code : [],
    		Description : []
    };
    
    var dataArrayUni = {	  // Added by Seyed Ismail
    		Code : [],
    		Description : []
    };
	
		aCatForCla = UnitDataDI.slice(0);
	
	var catLen = aCatForCla.length;
	var len = dataArrayCat.Code.length + catLen;
	for(var j=0 ; j< catLen ; j++){
		var index = ((len - catLen) + j);
    dataArrayCat.Description[index] = aCatForCla[j].VtextCat;		// Added by Seyed Ismail
    dataArrayCat.Code[index] = aCatForCla[j].ProdhCat;			    // Added by Seyed Ismail
		//dataArrayCat[index] = aCatForCla[j].VtextCat;					// Commented by Seyed Ismail
		// dataArrayUni[index] = aCatForCla[j].Maktx;					// Commented by Seyed Ismail
    dataArrayUni.Description[index] = aCatForCla[j].Maktx;		// Added by Seyed Ismail
    dataArrayUni.Code[index] = aCatForCla[j].Matnr;			    // Added by Seyed Ismail
	}
	
	
	var oUtil = new utility();								
	dataArrayCat.Code = oUtil.unique(dataArrayCat.Code);	
	dataArrayCat.Description = oUtil.unique(dataArrayCat.Description);	
	//dataArrayCat.sort();										// Commented by Seyed Ismail
	
	aCatDepoInv = [];
	/*// Begin of adding by Seyed Ismail
	if(dataArrayCat.Code[0] != 'ALL'){
	aCatDepoInv.push({								
			"CatDI":'ALL',
			"id":'ALL'
		});
	}
	// End of adding by Seyed Ismail*/
	for(var j=0;j<dataArrayCat.Code.length;j++){
		aCatDepoInv.push({								
			"CatDI":dataArrayCat.Description[j],
			"id":dataArrayCat.Code[j]
		});
	}
	sap.ui.getCore().byId('idComboEquipCat').mProperties.placeholder = 'Select Equipment Category';
	sap.ui.getCore().byId('idComboEquipCat').mProperties.suggestValues= aCatDepoInv;
 sap.ui.getCore().byId('idComboEquipCat').mProperties.codePropertyName ='id';		//Changed from CatDI to id
 sap.ui.getCore().byId('idComboEquipCat').mProperties.descriptionPropertyName='CatDI';
 sap.ui.getCore().byId('idComboEquipCat').mProperties.enabled=true;
 //sap.ui.getCore().byId('FldAutoCmpltValHldr').clearSelectedValues();
 sap.ui.getCore().byId('idComboEquipCat').addholderitem();
 

	
	//var oUtil = new utility();								// Commented by Seyed Ismail				
	//dataArrayUni.Code = oUtil.unique(dataArrayUni.Code);		// Commented by Seyed Ismail
	//dataArrayUni.Description = oUtil.unique(dataArrayUni.Description);	// Commented by Seyed Ismail
	//dataArrayUni.sort();							// Commented by Seyed Ismail
	aUniDepoInv = [];	
	/*// Begin of adding by Seyed Ismail
	if(dataArrayUni.Code[0] != 'ALL'){
	aUniDepoInv.push({								
			"UnitDI":'ALL',
			"id":'ALL'
		});
	}
	// End of adding by Seyed Ismail */
	for(var j=0;j<dataArrayUni.Code.length;j++){		// Added .Code by Seyed Ismail
		aUniDepoInv.push({
			"UnitDI":dataArrayUni.Description[j],						// Added .Description by Seyed Ismail
			"id":dataArrayUni.Code[j]							// Added .Code by Seyed Ismail	
		});
	}
	    	
	sap.ui.getCore().byId('idComboUnitType').mProperties.placeholder = 'Select Unit Type';
	sap.ui.getCore().byId('idComboUnitType').mProperties.suggestValues= aUniDepoInv;
 sap.ui.getCore().byId('idComboUnitType').mProperties.codePropertyName ='id'; //Changed from UnitDI to id
 sap.ui.getCore().byId('idComboUnitType').mProperties.descriptionPropertyName='UnitDI';
 sap.ui.getCore().byId('idComboUnitType').mProperties.enabled=true;
 sap.ui.getCore().byId('idComboUnitType').addholderitem();      
	
//}
}, //onRegionChange*/

onEqpCatChangeDIALL: function(){
	$("#idComboEquipCat").removeAttr('disabled');
	$("#idComboUnitType").removeAttr('disabled');
	//var oCurrent = this;
	aEquipCar = [];
	aUnitType = [];
	var SelEqpClas = [];
	var aCatForCla = [];
	// var dataArrayCat = []; // Commented by Seyed Ismail	
    //var dataArrayUni = [];  // Commented by Seyed Ismail	
	
    var dataArrayCat = {	  // Added by Seyed Ismail
    		Code : [],
    		Description : []
    };
    
    var dataArrayUni = {	  // Added by Seyed Ismail
    		Code : [],
    		Description : []
    };
	
	aCatForCla = UnitDataDI.slice(0);
	
	var catLen = aCatForCla.length;
	var len = dataArrayCat.Code.length + catLen;
	for(var j=0 ; j< catLen ; j++){
		var index = ((len - catLen) + j);
    dataArrayCat.Description[index] = aCatForCla[j].VtextCat;		// Added by Seyed Ismail
    dataArrayCat.Code[index] = aCatForCla[j].ProdhCat;			    // Added by Seyed Ismail
		//dataArrayCat[index] = aCatForCla[j].VtextCat;					// Commented by Seyed Ismail
		// dataArrayUni[index] = aCatForCla[j].Maktx;					// Commented by Seyed Ismail
    dataArrayUni.Description[index] = aCatForCla[j].Maktx;		// Added by Seyed Ismail
    dataArrayUni.Code[index] = aCatForCla[j].Matnr;			    // Added by Seyed Ismail
	}
	
	
	/* var oUtil = new utility();								
	dataArrayCat.Code = oUtil.unique(dataArrayCat.Code);	
	dataArrayCat.Description = oUtil.unique(dataArrayCat.Description);	
	//dataArrayCat.sort();										// Commented by Seyed Ismail
	
	aCatDepoInv = [];
	if(dataArrayCat.Code[0] != 'ALL'){
	aCatDepoInv.push({								
			"CatDI":'ALL',
			"id":'ALL'
		});
	}
	for(var j=0;j<dataArrayCat.Code.length;j++){
		aCatDepoInv.push({								
			"CatDI":dataArrayCat.Description[j],
			"id":dataArrayCat.Code[j]
		});
	}
	sap.ui.getCore().byId('idComboEquipCat').mProperties.placeholder = 'Select Equipment Category';
	sap.ui.getCore().byId('idComboEquipCat').mProperties.suggestValues= aCatDepoInv;
 sap.ui.getCore().byId('idComboEquipCat').mProperties.codePropertyName ='id';		//Changed from CatDI to id
 sap.ui.getCore().byId('idComboEquipCat').mProperties.descriptionPropertyName='CatDI';
 sap.ui.getCore().byId('idComboEquipCat').mProperties.enabled=true;
 //sap.ui.getCore().byId('FldAutoCmpltValHldr').clearSelectedValues();
 sap.ui.getCore().byId('idComboEquipCat').addholderitem();		*/
 

	
	//var oUtil = new utility();								// Commented by Seyed Ismail				
	//dataArrayUni.Code = oUtil.unique(dataArrayUni.Code);		// Commented by Seyed Ismail
	//dataArrayUni.Description = oUtil.unique(dataArrayUni.Description);	// Commented by Seyed Ismail
	//dataArrayUni.sort();							// Commented by Seyed Ismail
	aUniDepoInv = [];	
	/*// Begin of adding by Seyed Ismail
	if(dataArrayUni.Code[0] != 'ALL'){
	aUniDepoInv.push({								
			"UnitDI":'ALL',
			"id":'ALL'
		});
	}
	// End of adding by Seyed Ismail */
	for(var j=0;j<dataArrayUni.Code.length;j++){		// Added .Code by Seyed Ismail
		aUniDepoInv.push({
			"UnitDI":dataArrayUni.Description[j],						// Added .Description by Seyed Ismail
			"id":dataArrayUni.Code[j]							// Added .Code by Seyed Ismail	
		});
	}
	    	
	sap.ui.getCore().byId('idComboUnitType').mProperties.placeholder = 'Select Unit Type';
	sap.ui.getCore().byId('idComboUnitType').mProperties.suggestValues= aUniDepoInv;
 sap.ui.getCore().byId('idComboUnitType').mProperties.codePropertyName ='id'; //Changed from UnitDI to id
 sap.ui.getCore().byId('idComboUnitType').mProperties.descriptionPropertyName='UnitDI';
 sap.ui.getCore().byId('idComboUnitType').mProperties.enabled=true;
 sap.ui.getCore().byId('idComboUnitType').addholderitem();      
	
//}
}, //onRegionChange*/

onEqpCatChangeDIFinal: function(selEqpCla,selEqpCat, allSelectedClas, allSelectedCat){
	var oCurrent = this;
	var aUnitForCat = [];
	var dataArray = [];
    var dataArrayUni = {	  // Added by Seyed Ismail
    		Code : [],
    		Description : []
    };
	aUniDepoInv = [];
	var selEqpCats = [];
	var selEqpClas = [];
	if(selEqpCat != ""){
		selEqpCats = selEqpCat.split("$");
	}
	if(selEqpCla != ""){
	selEqpClas = selEqpCla.split("$");
	}
	if(selEqpCats.length > 0){
		for(var i=0;i<selEqpCats.length;i++){
			aUnitForCat = jQuery.grep(UnitDataDI, function(element, index){
	            return element.ProdhCat == selEqpCats[i];
	     	});
			
			var unitLen = aUnitForCat.length;
			var len = dataArrayUni.Code.length + unitLen;
			
	    	for(var j=0 ; j< unitLen ; j++){
	    		var index = ((len - unitLen) + j);
	    		dataArrayUni.Description[index] = aUnitForCat[j].Maktx;		// Added by Seyed Ismail
		        dataArrayUni.Code[index] = aUnitForCat[j].Matnr;			    // Added by Seyed Ismail
	    	}
		}
	}
	else if(selEqpClas.length > 0){
		for(var i=0;i<selEqpClas.length;i++){
			aUnitForCat = jQuery.grep(UnitDataDI, function(element, index){
	            return element.Prodh == selEqpClas[i];
	     	});
			
			var unitLen = aUnitForCat.length;
			var len = dataArrayUni.Code.length + unitLen;
	    	for(var j=0 ; j< unitLen ; j++){
	    		var index = ((len - unitLen) + j);
	    		dataArrayUni.Description[index] = aUnitForCat[j].Maktx;		// Added by Seyed Ismail
		        dataArrayUni.Code[index] = aUnitForCat[j].Matnr;			    // Added by Seyed Ismail
	    	}
		}
			
	    	
	}
	else{
		aUnitForCat = jQuery.grep(UnitDataDI, function(element, index){
            return element.Prodh != ' ' ;
     	});
		
		var unitLen = aUnitForCat.length;
		var len = dataArrayUni.Code.length + unitLen;
    	for(var j=0 ; j< unitLen ; j++){
    		var index = ((len - unitLen) + j);
    		dataArrayUni.Description[index] = aUnitForCat[j].Maktx;		// Added by Seyed Ismail
	        dataArrayUni.Code[index] = aUnitForCat[j].Matnr;			    // Added by Seyed Ismail
    	}
	}

 	// Begin of adding by Seyed Ismail
 	if(dataArrayUni.Code[0] != 'ALL'){
		aUniDepoInv.push({								
 			"UnitDI":'ALL',
 			"id":'ALL'
 		});
 	}
 	// End of adding by Seyed Ismail
	for(var j=0;j<dataArrayUni.Code.length;j++){		// Added .Code by Seyed Ismail
		aUniDepoInv.push({
			"UnitDI":dataArrayUni.Description[j],						// Added .Description by Seyed Ismail
			"id":dataArrayUni.Code[j]							// Added .Code by Seyed Ismail	
		});
	}
	
	sap.ui.getCore().byId('idComboUnitType').mProperties.placeholder = 'Select Unit Type';
	sap.ui.getCore().byId('idComboUnitType').mProperties.suggestValues= aUniDepoInv;
 sap.ui.getCore().byId('idComboUnitType').mProperties.codePropertyName ='id'; //Changed from UnitDI to id
 sap.ui.getCore().byId('idComboUnitType').mProperties.descriptionPropertyName='UnitDI';
 sap.ui.getCore().byId('idComboUnitType').mProperties.enabled=true;
 sap.ui.getCore().byId('idComboUnitType').addholderitem();      
    
    
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

onCountryChangeFinal:function(selRegion,selCountry){
	
	var aCityForCoun = [];
    var dataArrayCity = {	  // Added by Seyed Ismail
    		Code : [],
    		Description : []
    };
	
	var selRegions = [];
	var selCountries = [];
	if(selCountry != ""){
		selCountries = selCountry.split("$");
	}
	if(selRegion != ""){
		selRegions = selRegion.split("$");
	}
	if(selCountries.length > 0){
		for(var i=0;i<selCountries.length;i++){
			aCityForCoun = jQuery.grep(locationDataDI, function(element, index){
	            return element.CouCod == selCountries[i];
	     	});
			
			var cityLen = aCityForCoun.length;
			var len = dataArrayCity.Code.length + cityLen;
			
	    	for(var j=0 ; j< cityLen ; j++){
	    		var index = ((len - cityLen) + j);
	    		dataArrayCity.Description[index] = aCityForCoun[j].City;		// Added by Seyed Ismail
	    		dataArrayCity.Code[index] = aCityForCoun[j].CitCod;			    // Added by Seyed Ismail
	    	}
		}
	}
	else if(selRegions.length > 0){
		for(var i=0;i<selRegions.length;i++){
			aCityForCoun = jQuery.grep(locationDataDI, function(element, index){
	            return element.RegCod == selRegions[i];
	     	});
			
			var cityLen = aCityForCoun.length;
			var len = dataArrayCity.Code.length + cityLen;
	    	for(var j=0 ; j< cityLen ; j++){
	    		var index = ((len - cityLen) + j);
	    		dataArrayCity.Description[index] = aCityForCoun[j].City;		// Added by Seyed Ismail
	    		dataArrayCity.Code[index] = aCityForCoun[j].CitCod;			    // Added by Seyed Ismail
	    	}
		}
			
	    	
	}
	else{
		aCityForCoun = jQuery.grep(locationDataDI, function(element, index){
            return element.CitCod != ' ' ;
     	});
		
		var unitLen = aCityForCoun.length;
		var len = dataArrayCity.Code.length + unitLen;
    	for(var j=0 ; j< unitLen ; j++){
    		var index = ((len - unitLen) + j);
    		dataArrayCity.Description[index] = aCityForCoun[j].City;		// Added by Seyed Ismail
	        dataArrayCity.Code[index] = aCityForCoun[j].CitCod;			    // Added by Seyed Ismail
    	}
	}
	
	var oUtil = new utility();
	dataArrayCity.Code = oUtil.unique(dataArrayCity.Code);
	dataArrayCity.Description = oUtil.unique(dataArrayCity.Description);
	
	aCityDepoInv = [];
	for(var j=0;j<dataArrayCity.Code.length;j++){		// Added .Code by Seyed Ismail
		aCityDepoInv.push({
			"CityDI":dataArrayCity.Description[j],						// Added .Description by Seyed Ismail
			"id":dataArrayCity.Code[j]							// Added .Code by Seyed Ismail	
		});
	}
	
	sap.ui.getCore().byId('idAutoCity').mProperties.placeholder = 'Select City';
	sap.ui.getCore().byId('idAutoCity').mProperties.suggestValues= aCityDepoInv;
 sap.ui.getCore().byId('idAutoCity').mProperties.codePropertyName ='id'; 
 sap.ui.getCore().byId('idAutoCity').mProperties.descriptionPropertyName='CityDI';
 sap.ui.getCore().byId('idAutoCity').mProperties.enabled=true;
 sap.ui.getCore().byId('idAutoCity').addholderitem();      
    
    
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
 
}
 
 // End of adding by Seyed Ismail
});





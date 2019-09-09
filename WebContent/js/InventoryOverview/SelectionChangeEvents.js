/*
 *	ClassName -  InvDetSelectionChange 
 *  Developed 
 *   onRegionChange : called after Region is changed in the search form to populate Country and City according to the selected Region
 *   onCountryChange : called after Country is changed in the search form to populate City according to the selected Region and Country
 *   onEquipClassChange : called after Equipment Class is changed in the search form to populate Equipment Category and Unit type according to the selected Equipment Class
 *   onEquipCatChange : called after Equipment Category is changed in the search form to populate Unit Type according to the selected Equipment Class and Equipment Category
 *  
*/

var hasCountryChanged = false;

sap.ui.model.json.JSONModel.extend("InvDetSelectionChange", {
	
	onRegionChange: function(selRegion){
		$("#idAutoCountry").removeAttr('disabled');
		$("#idAutoCity").removeAttr('disabled');
		
		var oSelect = this;
		SearchHelpDataInvDet.CountryArray = [];
		SearchHelpDataInvDet.CityArray = [];
		
		var aCountryForRegion = jQuery.grep(locationDataDI, function(element, index){
            return element.Region == selRegion;
     	});
		
		var dataArrayCountry = [];
		var dataArrayCity = [];
    	for(var i=0 ; i< aCountryForRegion.length ; i++){
    		dataArrayCountry[i] = aCountryForRegion[i].Country;
    		dataArrayCity[i] = aCountryForRegion[i].City;
    	}
    	//var oUtil = new utility();
    	dataArrayCountry = objUtil.unique(dataArrayCountry);
    	dataArrayCountry.sort();
    	for(var j=0;j<dataArrayCountry.length;j++){
    		SearchHelpDataInvDet.CountryArray.push({
    			"CountryDI":dataArrayCountry[j],
    			"id":dataArrayCountry[j]
    		});
    	}
    	
    	sap.ui.getCore().byId('idAutoCountry').mProperties.placeholder = 'Select Country';
    	sap.ui.getCore().byId('idAutoCountry').mProperties.suggestValues= SearchHelpDataInvDet.CountryArray;
        sap.ui.getCore().byId('idAutoCountry').mProperties.codePropertyName ='CountryDI';
         sap.ui.getCore().byId('idAutoCountry').mProperties.descriptionPropertyName='CountryDI';
        sap.ui.getCore().byId('idAutoCountry').mProperties.enabled=true;
        //sap.ui.getCore().byId('FldAutoCmpltValHldr').clearSelectedValues();
        sap.ui.getCore().byId('idAutoCountry').addholderitem();

        
        /*$('#idAutoCountry').siblings("ul").remove(); 
    	$('#idAutoCountry').css("display","block");
    	$("#idAutoCountry").attr("placeholder","Select Country");
    	document.getElementById("idAutoCountrySI").style.borderColor = "#cccccc";
		document.getElementById("idAutoCountrySI").style.background = "#ffffff";*/
		/*$("#idAutoCountry").focusin(
    			function(){
    				$('#idAutoCountry').siblings("ul").remove(); 
		        	$('#idAutoCountry').css("display","block");
		        	$("#idAutoCountry").attr("placeholder","Select Country");
    				$("#idAutoCountry").tokenInput(SearchHelpDataInvDet.CountryArray, {
    					width:$("#idAutoCountry").width(),
    		            theme: "custom",
    		            tokenDelimiter: "$",
    		            tokenLimit: null,	//ONLY SET FOR SINGLE SELECTION 
    		            propertyToSearch: "CountryDI", // TEXT COLUMN VALUE
    		            preventDuplicates: true	//PREVENT DUPLICATE VALUES
    		        });
    		    	$('#idAutoCountry').siblings("ul").css("width","100%");
    			});
    	
    	$("#idAutoCountry").change(function(){
    		$('#idAutoCity').siblings("ul").remove(); 
        	$('#idAutoCity').css("display","block");
        	$("#idAutoCity").attr("placeholder","Select City");
	   	var selCountry = $("#idAutoCountry").val();
	   		if(selCountry != ""){
	   			sap.ui.getCore().byId("InventorySearch").getController().CountryChange(selRegion,selCountry);
	   		}
	   		else{
	   			$('#idAutoCity').siblings("ul").remove(); 
            	$('#idAutoCity').css("display","block");
            	$("#idAutoCity").attr("placeholder","Select City");
            	$('#idAutoCity').val("");
            	sap.ui.getCore().byId("InventorySearch").getController().CountryChange(selRegion,"");
	   		}
    	});*/
    	
    	//var oUtil = new utility();
    	dataArrayCity = objUtil.unique(dataArrayCity);
    	dataArrayCity.sort();
    	for(var j=0;j<dataArrayCity.length;j++){
    		SearchHelpDataInvDet.CityArray.push({
    			"CityDI":dataArrayCity[j],
    			"id":dataArrayCity[j]
    		})
    	}
    	sap.ui.getCore().byId('idAutoCity').mProperties.placeholder = 'Select City';
    	sap.ui.getCore().byId('idAutoCity').mProperties.suggestValues= SearchHelpDataInvDet.CityArray;
        sap.ui.getCore().byId('idAutoCity').mProperties.codePropertyName ='CityDI';
         sap.ui.getCore().byId('idAutoCity').mProperties.descriptionPropertyName='CityDI';
        sap.ui.getCore().byId('idAutoCity').mProperties.enabled=true;
        //sap.ui.getCore().byId('FldAutoCmpltValHldr').clearSelectedValues();
        sap.ui.getCore().byId('idAutoCity').addholderitem();
        
    	/*$('#idAutoCity').siblings("ul").remove(); 
    	$('#idAutoCity').css("display","block");
    	$("#idAutoCity").attr("placeholder","Select City");
    	document.getElementById("idAutoCitySI").style.borderColor = "#cccccc";
		document.getElementById("idAutoCitySI").style.background = "#ffffff";
		$("#idAutoCity").focusin(
    			function(){
    				$('#idAutoCity').siblings("ul").remove(); 
    	        	$('#idAutoCity').css("display","block");
    	        	$("#idAutoCity").attr("placeholder","Select City");
    				$("#idAutoCity").tokenInput(SearchHelpDataInvDet.CityArray, {
    					width:$("#idAutoCity").width(),
    		            theme: "custom",
    		            tokenDelimiter: "$",
    		            tokenLimit: null,	//ONLY SET FOR SINGLE SELECTION 
    		            propertyToSearch: "CityDI", // TEXT COLUMN VALUE
    		            preventDuplicates: true	//PREVENT DUPLICATE VALUES
    		        });
    			   	$('#idAutoCity').siblings("ul").css("width","100%");
    	});*/
		
		
	}, //region change
	
	onCountryChange: function(selRegion,selCountry){
		var aCityForCountry = [];
		var dataArray = [];
		SearchHelpDataInvDet.CityArray=[];
		var SelCountries = [];
		if(selCountry != ""){
			 SelCountries = selCountry.split("$");
		}
		if(SelCountries.length > 0){
			for(var i=0;i<SelCountries.length;i++){
				aCityForCountry = jQuery.grep(locationDataDI, function(element, index){
		            return element.Country == SelCountries[i] && element.Region == selRegion;
		     	});
				var cityLen = aCityForCountry.length
				var len = dataArray.length + cityLen;
		    	for(var j=0 ; j< cityLen ; j++){
		    		var index = ((len -cityLen) + j);
		    		dataArray[index] = aCityForCountry[j].City;
		    	}
			}
		}
		else{
				aCityForCountry = jQuery.grep(locationDataDI, function(element, index){
		            return element.Region == selRegion;
		     	});
				var cityLen = aCityForCountry.length
		    	for(var j=0 ; j< cityLen ; j++){
		    		dataArray[j] = aCityForCountry[j].City;
		    	}
		}
		//var oUtil = new utility();
    	//dataArray = oUtil.unique(dataArray);
    	dataArray.sort();
    	//alert("len after" + dataArray.length)
    	for(var j=0;j<dataArray.length;j++){
    		SearchHelpDataInvDet.CityArray.push({
    			"CityDI":dataArray[j],
    			"id":dataArray[j]
    		})
    	}
    	
    	sap.ui.getCore().byId('idAutoCity').mProperties.placeholder = 'Select City';
    	sap.ui.getCore().byId('idAutoCity').mProperties.suggestValues= SearchHelpDataInvDet.CityArray;
        sap.ui.getCore().byId('idAutoCity').mProperties.codePropertyName ='CityDI';
         sap.ui.getCore().byId('idAutoCity').mProperties.descriptionPropertyName='CityDI';
        sap.ui.getCore().byId('idAutoCity').mProperties.enabled=true;
        //sap.ui.getCore().byId('FldAutoCmpltValHldr').clearSelectedValues();
        sap.ui.getCore().byId('idAutoCity').addholderitem();
        
    	/*$('#idAutoCity').siblings("ul").remove(); 
    	$('#idAutoCity').css("display","block");
    	$("#idAutoCity").attr("placeholder","Select City");
	    $("#idAutoCity").tokenInput(SearchHelpDataInvDet.CityArray, {
	    	width:$("#idAutoCity").width(),
	            theme: "custom",
	            tokenDelimiter: "$",
	            tokenLimit: null,	//ONLY SET FOR SINGLE SELECTION 
	            propertyToSearch: "CityDI", // TEXT COLUMN VALUE
	            preventDuplicates: true	//PREVENT DUPLICATE VALUES
	        });
		   	$('#idAutoCity').siblings("ul").css("width","100%");*/
		},
	
	onEquipClassChange: function(){
		//busyDialog.open();
		SearchHelpDataInvDet.EquipCatArray = [];
		SearchHelpDataInvDet.UniTypeArray = [];
		sap.ui.getCore().byId("idComboEquipCat").destroyItems();
		sap.ui.getCore().byId("idComboEquipCat").setValue("");
		sap.ui.getCore().byId("idComboUnitType").destroyItems();
		sap.ui.getCore().byId("idComboUnitType").setValue("");
		var vSelEquipClass= sap.ui.getCore().byId("idComboEquipClass").getValue();
		
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
		    				SearchHelpDataInvDet.EquipCatArray[i] = data.results[i];
		    			}
		    			if(data.results[i].UnitType != ""){
		    				SearchHelpDataInvDet.UniTypeArray[i] = data.results[i];		    			
		    			}
		    		}
		    	//alert("cat length " + SearchHelpDataInvDet.EquipCatArray[1].EqpCat);
		    	//alert("unitype length " + SearchHelpDataInvDet.UniTypeArray.length);
		    	
		    	oModelStatic.setData(SearchHelpDataInvDet);		    	
				var vComboEquipCat = sap.ui.getCore().byId("idComboEquipCat");
				vComboEquipCat.setModel(oModelStatic);
				vComboEquipCat.bindItems("/EquipCatArray",new sap.ui.core.ListItem({text: "{EqpCat}"}));
				//vComboEquipCat.insertItem(new sap.ui.core.ListItem({text:"Select Equipment Category"}),0);	    	
				
				var vComboUnitType = sap.ui.getCore().byId("idComboUnitType");
				vComboUnitType.setModel(oModelStatic);
				vComboUnitType.bindItems("/UniTypeArray",new sap.ui.core.ListItem({text: "{UnitType}"}));
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
	
	onEquipCatChange: function(){
		//busyDialog.open();
		SearchHelpDataInvDet.UniTypeArray = [];
		sap.ui.getCore().byId("idComboUnitType").destroyItems();
		sap.ui.getCore().byId("idComboUnitType").setValue("");
		//sap.ui.getCore().byId("idComboUnitType").setPlaceholder("Select Unit Type");
		var vSelEquipClass= sap.ui.getCore().byId("idComboEquipClass").getValue();
		var vSelEquipCat = sap.ui.getCore().byId("idComboEquipCat").getValue();
		vSelEquipCat =  vSelEquipCat.replace(/\'/, "$");
		vSelEquipCat =  vSelEquipCat.replace(/\+/g, "@");
		//alert("string " + vSelEquipCat);
		oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
		var urlToCall = serviceUrl + "/Search_Help_Equi_Class_Cate_Unit?$filter=EqpClass eq '" + vSelEquipClass +"' and EqpCat eq '" + vSelEquipCat +"'";
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
		    				SearchHelpDataInvDet.UniTypeArray[i] = data.results[i];
		    			}
		    		}
		    	
		    	oModelStatic.setData(SearchHelpDataInvDet);		    
		    	var vComboUnitType = sap.ui.getCore().byId("idComboUnitType");
				vComboUnitType.setModel(oModelStatic);
				vComboUnitType.bindItems("/UniTypeArray",new sap.ui.core.ListItem({text: "{UnitType}"}));
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
	
});


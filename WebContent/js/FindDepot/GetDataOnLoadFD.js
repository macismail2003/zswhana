
var arrayRegionFD = [];
var arrayCountryFD = [];
var arrayCItyFD = [];
var locationDataFD = "";
var SelCountriesFD = [];
var SelCitiesFD = [];
var selRegionFD = "";

sap.ui.model.json.JSONModel.extend("GetOnLoadDataForPorts", {
	
	populateRegionFD : function(){
		var oCurrent = this;
		busyDialog.open();
		arrayRegionFD = [];
		//alert("service url " + serviceUrl);
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
		    	locationDataFD = data.results;
		    	var dataArray = [];
            for(var i=0 ; i< dataLen ; i++){
                   dataArray[i] = data.results[i].Region;
            }
            var oUtil = new utility();
            dataArray = oUtil.unique(dataArray);
            for(var j=0;j<dataArray.length;j++){
            	arrayRegionFD.push({
                          "RegionFD":dataArray[j],
                          "id":dataArray[j]
                   });
            }
            $("#idBComboRegionFD").focusin(
                    function(){
            $("#idBComboRegionFD").tokenInput(arrayRegionFD, {
            	width:$("#idBComboRegionFD").width(),
               theme: "custom",
             //  tokenValue: "Region",
               tokenLimit: "1", //ONLY SET FOR SINGLE SELECTION 
               propertyToSearch: "RegionFD", // TEXT COLUMN VALUE
               preventDuplicates: true //PREVENT DUPLICATE VALUES
           });
            $('#idBComboRegionFD').siblings("ul").css("width","100%");
                    });
            $("#idBComboRegionFD").change(function(){
            		$('#idBComboCountryFD').siblings("ul").remove();
            		$('#idBComboCountryFD').css("display","block");
            		selRegionFD = $("#idBComboRegionFD").val();
                   if(selRegionFD != ""){
                          oCurrent.onRegionChange(selRegionFD);
                   }
                   else{
                       $('#idBComboCountryFD').siblings("ul").remove(); 
    				   $('#idBComboCountryFD').css("display","block");
    				   $('#idBComboCountryFD').val("");
    				   $("#idBComboCountryFD").attr("disabled","disabled");
    				   
    				   $('#idBComboCityFD').siblings("ul").remove(); 
    				   $('#idBComboCityFD').css("display","block");
    				   $('#idBComboCityFD').val("");
    				   $("#idBComboCityFD").attr("disabled","disabled");
                       //oCurrent.onCountryChange("");
                   }
            });
            
            busyDialog.close();
},
		    function(err){
		    	busyDialog.close();
		    	errorfromServer(err);
		    	//alert("Error while reading region : "+ window.JSON.stringify(err.response));
		    });
	},
	
	onRegionChange: function(selRegion){
		var oCurrent = this;
		arrayCountryFD = [];
		arrayCItyFD = [];
		
		$('#idBComboCountryFD').removeAttr("disabled");
		$('#idBComboCityFD').removeAttr("disabled");
		
		$('#idBComboCountryFD').siblings("ul").remove(); 
        $('#idBComboCountryFD').css("display","block");
        $('#idBComboCityFD').siblings("ul").remove(); 
        $('#idBComboCityFD').css("display","block");

        var aCountryForRegion = jQuery.grep(locationDataFD, function(element, index){
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
        	arrayCountryFD.push({
                      "CountryFD":dataArrayCountry[j],
                      "id":dataArrayCountry[j]
               });
        }
 
        $('#idBComboCountryFD').siblings("ul").remove(); 
        $('#idBComboCountryFD').css("display","block");
        
        $("#idBComboCountryFD").focusin(
                function(){
                	$('#idBComboCountryFD').siblings("ul").remove(); 
                    $('#idBComboCountryFD').css("display","block");
       $("#idBComboCountryFD").tokenInput(arrayCountryFD, {
    	   width:$("#idBComboCountryFD").width(),
           theme: "custom",
           tokenDelimiter: "$",
           tokenLimit: null, //ONLY SET FOR SINGLE SELECTION 
           propertyToSearch: "CountryFD", // TEXT COLUMN VALUE
           preventDuplicates: true //PREVENT DUPLICATE VALUES
       });
        $('#idBComboCountryFD').siblings("ul").css("width","100%");
                });
        $("#idBComboCountryFD").change(function(){
        	$('#idBComboCityFD').siblings("ul").remove(); 
            $('#idBComboCityFD').css("display","block");
               var selCountry = $("#idBComboCountryFD").val();
               if(selCountry != ""){
                      oCurrent.onCountryChange(selCountry);
               }
               else{
                   $('#idBComboCityFD').siblings("ul").remove(); 
				   $('#idBComboCityFD').css("display","block");
				   $('#idBComboCityFD').val("");
                   oCurrent.onCountryChange("",selRegion);
               }
        });
        
        dataArrayCity.sort();
    	for(var j=0;j<dataArrayCity.length;j++){
    		arrayCItyFD.push({
    	           "CityFD":dataArrayCity[j],
    	           "id":dataArrayCity[j]
    	    });
    	}       
        
        $("#idBComboCityFD").focusin(
                function(){
                	 $('#idBComboCityFD').siblings("ul").remove(); 
                     $('#idBComboCityFD').css("display","block");
       $("#idBComboCityFD").tokenInput(arrayCItyFD, {
    	   width:$("#idBComboCityFD").width(),
           theme: "custom",
           tokenDelimiter: "$",
           tokenLimit: null, //ONLY SET FOR SINGLE SELECTION 
           propertyToSearch: "CityFD", // TEXT COLUMN VALUE
           preventDuplicates: true //PREVENT DUPLICATE VALUES
       });
        $('#idBComboCityFD').siblings("ul").css("width","100%");
                });
        $("#idBComboCityFD").change(function(){
               var selCity = $("#idBComboCityFD").val();
               SelCitiesFD = selCity.split(",");
        });
},

onCountryChange: function(selCountry,selRegion){
    var oCurrent = this;
    var aCityForCountry = [];
    var dataArray = [];
    arrayCItyFD = [];
    
    if(selCountry != ""){
    SelCountriesFD = selCountry.split("$");
    for(var i=0;i<SelCountriesFD.length;i++){
    	aCityForCountry = jQuery.grep(locationDataFD, function(element, index){
         return element.Country == SelCountriesFD[i];
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
    	aCityForCountry = jQuery.grep(locationDataFD, function(element, index){
            return element.Region == selRegion;
       });
    	 var cityLen = aCityForCountry.length;
    	 for(var j=0 ; j< cityLen ; j++){
         dataArray[j] = aCityForCountry[j].City;
  }
    }
	var oUtil = new utility();
	//dataArray = oUtil.unique(dataArray);
	dataArray.sort();
	for(var j=0;j<dataArray.length;j++){
		arrayCItyFD.push({
	           "CityFD":dataArray[j],
	           "id":dataArray[j]
	    });
	}
    
    $('#idBComboCityFD').siblings("ul").remove(); 
    $('#idBComboCityFD').css("display","block");
    
   $("#idBComboCityFD").tokenInput(arrayCItyFD, {
	   width:$("#idBComboCityFD").width(),
       theme: "custom",
       tokenDelimiter: "$",
       tokenLimit: null, //ONLY SET FOR SINGLE SELECTION 
       propertyToSearch: "CityFD", // TEXT COLUMN VALUE
       preventDuplicates: true //PREVENT DUPLICATE VALUES
   });
    $('#idBComboCityFD').siblings("ul").css("width","100%");
    $("#idBComboCityFD").change(function(){
           var selCity = $("#idBComboCityFD").val();
           SelCitiesFD = selCity.split(",");
    });

},

validatePortsDeports: function(){
	
	var isValidFD = true;
	
	var vFDRegionVal = document.getElementById("idBComboRegionFD");
	var vFDCountryVal = document.getElementById("idBComboCountryFD");
	var vFDCityVal = document.getElementById("idBComboCityFD");

	  if(vFDRegionVal.value == ""){
		   $('#idBComboRegionFD').siblings("ul").remove();
		   $('#idBComboRegionFD').css("display","block");
		   $("#idBComboRegionFD").attr("placeholder","Required");
           document.getElementById("idBComboRegionFD").style.borderColor = "red";
		   document.getElementById("idBComboRegionFD").style.background = "#FAD4D4";
		   isValidFD = false;
	  }

	  if (vFDCountryVal.value === "" && vFDCityVal.value === ""){
	      $('#idBComboCountryFD').siblings("ul").remove();
	      $('#idBComboCountryFD').css("display","block");
	      $("#idBComboCountryFD").attr("placeholder","Select Country / City");
	      document.getElementById("idBComboCountryFD").style.borderColor = "red";
	      document.getElementById("idBComboCountryFD").style.background = "#FAD4D4";
	
	      $('#idBComboCityFD').siblings("ul").remove();
	      $('#idBComboCityFD').css("display","block");
	      $("#idBComboCityFD").attr("placeholder","Select Country / City");
	      document.getElementById("idBComboCityFD").style.borderColor = "red";
	      document.getElementById("idBComboCityFD").style.background = "#FAD4D4";
	      isValidFD = false; 
      }

	  return isValidFD;
            
      }

});
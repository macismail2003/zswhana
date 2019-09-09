/*
 *	ClassName -  ResetSearchForm 
 *  Developed 
 *   resetSearchForm : resetting search form values to inital
*/
sap.ui.model.json.JSONModel.extend("ResetSearchForm", {
	
	resetSearchForm: function(sResult){
	if(sResult == "YES"){
            sap.ui.getCore().byId('idAutoRegion').mProperties.placeholder = 'Select Region';
      sap.ui.getCore().byId('idAutoRegion').clearSelectedValues();
      
      sap.ui.getCore().byId('idAutoCountry').clearSelectedValues();
      sap.ui.getCore().byId('idAutoCountry').destroyAllItems();
      
      sap.ui.getCore().byId('idAutoCity').clearSelectedValues();
      sap.ui.getCore().byId('idAutoCity').destroyAllItems();
      //populate country n city again
      var dataArrayCountry = {	  
      		Code : [],
      		Description : []
      };
      
      var dataArrayCity = {	  
      		Code : [],
      		Description : []
      };
      var oUtil = new utility();
      
      for(var i=0 ; i< locationDataDI.length ; i++){
          dataArrayCountry.Code[i] = locationDataDI[i].CouCod;
          dataArrayCountry.Description[i] = locationDataDI[i].Country;
          dataArrayCity.Code[i] = locationDataDI[i].CitCod;
          dataArrayCity.Description[i] = locationDataDI[i].City;
      }
      
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
      
      
      //RESET CITY
      
      dataArrayCity.Code = oUtil.unique(dataArrayCity.Code);
      dataArrayCity.Description = oUtil.unique(dataArrayCity.Description);
      aCityDepoInv = [];
      //dataArrayCity.sort();
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
         
         
         
         
         sap.ui.getCore().byId('idComboEquipClass').mProperties.placeholder = 'Select Equipment Class';
         sap.ui.getCore().byId('idComboEquipClass').clearSelectedValues();
         
         sap.ui.getCore().byId('idComboEquipCat').clearSelectedValues();
         sap.ui.getCore().byId('idComboEquipCat').destroyAllItems();

         var dataArrayCat = {	
         		Code : [],
         		Description : []
         };
         var dataArrayUni = {	
         		Code : [],
         		Description : []
         };
         
         for(var i=0 ; i< UnitDataDI.length ; i++){
 	 		dataArrayCat.Description[i] = UnitDataDI[i].VtextCat;
 	 		dataArrayCat.Code[i] = UnitDataDI[i].ProdhCat;					
 	        dataArrayUni.Description[i] = UnitDataDI[i].Maktx;
 	        dataArrayUni.Code[i] = UnitDataDI[i].Matnr;			   
         }
 	 	
      	var oUtil = new utility();				
      	dataArrayCat.Code = oUtil.unique(dataArrayCat.Code); 
      	dataArrayCat.Description = oUtil.unique(dataArrayCat.Description); 						
         
        aCatDepoInv = [];
 		
 	 	for(var j=0;j<dataArrayCat.Code.length;j++){
 	 		aCatDepoInv.push({
 	 			"CateDI":dataArrayCat.Description[j],
 	 			"id":dataArrayCat.Code[j]
 	 		});
 	 	}
     
       sap.ui.getCore().byId('idComboEquipCat').mProperties.placeholder = 'Select Equipment Category';
       sap.ui.getCore().byId('idComboEquipCat').mProperties.suggestValues=aCatDepoInv;
         sap.ui.getCore().byId('idComboEquipCat').mProperties.codePropertyName ='id';
          sap.ui.getCore().byId('idComboEquipCat').mProperties.descriptionPropertyName='CateDI';
         sap.ui.getCore().byId('idComboEquipCat').mProperties.enabled=true;
         //sap.ui.getCore().byId('FldAutoCmpltValHldr').clearSelectedValues();
         sap.ui.getCore().byId('idComboEquipCat').addholderitem();
         
         
         //RESET CITY
        
        aUniDepoInv = [];
  		
  	 	for(var j=0;j<dataArrayUni.Code.length;j++){
  	 		aUniDepoInv.push({
  	 			"UnitDI":dataArrayUni.Description[j],
  	 			"id":dataArrayUni.Code[j]
  	 		});
  	 	}
        	    	
        	sap.ui.getCore().byId('idComboUnitType').mProperties.placeholder = 'Select Unit Type';
        	sap.ui.getCore().byId('idComboUnitType').mProperties.suggestValues= aUniDepoInv;
            sap.ui.getCore().byId('idComboUnitType').mProperties.codePropertyName ='id';
             sap.ui.getCore().byId('idComboUnitType').mProperties.descriptionPropertyName='UnitDI';
            sap.ui.getCore().byId('idComboUnitType').mProperties.enabled=true;
            //sap.ui.getCore().byId('FldAutoCmpltValHldr').clearSelectedValues();
            sap.ui.getCore().byId('idComboUnitType').addholderitem();
   		
            
            var vResultFlex = sap.ui.getCore().byId("idInvSearchResult");
            var oSearchResultFormElementHeaderLine1 = sap.ui.getCore().byId("idFlexBoxInvDetResultHeaderLine1");
            var oSearchResultFormElementHeaderLine2 = sap.ui.getCore().byId("idFlexBoxInvDetResultHeaderLine2");
            var oSearchResultFormElementBtn = sap.ui.getCore().byId("idFlexBoxBtnViewlAllInvSearch");
            var oSearchResultFormElementDiscl = sap.ui.getCore().byId("idFlexBoxInvResultDisclaimer");
            var exportBtn = sap.ui.getCore().byId("idExportToExcelFlexDepotInvOverview");
            if(vResultFlex){
                vResultFlex.destroy();
                oSearchResultFormElementHeaderLine1.destroy();
                oSearchResultFormElementHeaderLine2.destroy();
                oSearchResultFormElementBtn.destroy();
                exportBtn.destroy();
                oSearchResultFormElementDiscl.destroy();
                if(sap.ui.getCore().byId("InventoryDetail")){
                        sap.ui.getCore().byId("InventoryDetail").destroy();
                }
        }



            
		}
	}
	
});
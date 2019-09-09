/*
 *	ClassName -  Validations 
 *  Developed 
 *   MandatoryFields : Called to check the mandatory fields in the search form.
*/

sap.ui.model.json.JSONModel.extend("Validations", {
	
	MandatoryFields: function() {
		
		var valid = true;                              
        var objcontrlholdrCountry= sap.ui.getCore().byId('idAutoCountry');     
        var selectedValuesCountry= objcontrlholdrCountry.getSelectedValues();
        
        var objcontrlholdrCity= sap.ui.getCore().byId('idAutoCity');           
        var selectedValuesCity= objcontrlholdrCity.getSelectedValues();
        
        if(selectedValuesCountry.length < 1 && selectedValuesCity.length < 1){
        	objcontrlholdrCountry.setHolderBorderReuqired();
        	objcontrlholdrCity.setHolderBorderReuqired();
        	
        	objcontrlholdrCountry.setHolderPlaceHolder("Country or/and City required");
        	objcontrlholdrCity.setHolderPlaceHolder("Country or/and City required");
               valid=false;
        }
        
        // Begin of adding by Seyed Ismail
        
        var objcontrlholdrCat= sap.ui.getCore().byId('idComboEquipCat');     
        var selectedValuesCat= objcontrlholdrCat.getSelectedValues();
        
        var objcontrlholdrUnit= sap.ui.getCore().byId('idComboUnitType');           
        var selectedValuesUnit= objcontrlholdrUnit.getSelectedValues();
        
        if(selectedValuesCat.length < 1 && selectedValuesUnit.length < 1){
        	objcontrlholdrCat.setHolderBorderReuqired();
        	objcontrlholdrUnit.setHolderBorderReuqired();
        	
        	objcontrlholdrCat.setHolderPlaceHolder("Eqp Ctgry or/and Unit Type required");
        	objcontrlholdrUnit.setHolderPlaceHolder("Eqp Ctgry or/and Unit Type required");
               valid=false;
        }
        

		return valid;
	}

});


sap.ui.model.json.JSONModel.extend("ResetFormFindDepot", {
	
	resetFindDepot: function(sResult){
		if(sResult == "YES"){
			$("#idBComboRegionFD").val("");
              $('#idBComboRegionFD').siblings("ul").remove();
 	         $('#idBComboRegionFD').css("display","block");
 	         $("#idBComboRegionFD").attr("placeholder","Select Region");
            
              $("#idBComboCountryFD").val("");
              $('#idBComboCountryFD').siblings("ul").remove();
 	         $('#idBComboCountryFD').css("display","block");
 	         $("#idBComboCountryFD").attr("placeholder","Select Country");
 	         $("#idBComboCountryFD").attr("disabled","disabled");
             
              $("#idBComboCityFD").val("");
              $('#idBComboCityFD').siblings("ul").remove();
              $('#idBComboCityFD').css("display","block");
              $("#idBComboCityFD").attr("placeholder","Select City");
              $("#idBComboCityFD").attr("disabled","disabled");
              
             document.getElementById("idBComboRegionFD").style.borderColor = "#cccccc";
             document.getElementById("idBComboRegionFD").style.background = "#ffffff";
             
             document.getElementById("idBComboCountryFD").style.borderColor = "#cccccc";
           document.getElementById("idBComboCountryFD").style.background = "#ffffff";
           
           document.getElementById("idBComboCityFD").style.borderColor = "#cccccc";
             document.getElementById("idBComboCityFD").style.background = "#ffffff";

	if(sap.ui.getCore().byId("idFDFlexAll")){
		sap.ui.getCore().byId("idFDFlexAll").destroy(); 
	  }
		} 				 
	}
});
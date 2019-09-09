sap.ui.model.json.JSONModel.extend("ValidationsForSI", { 
       
       MandatoryFieldsSI: function(){
              //var vCountryLen = $('#idAutoCountrySI').siblings("ul").children("li").length;
              var vTxtEquipClassSI = sap.ui.getCore().byId("idComboEquipClassSI");
              var vTxtEquipCatSI = sap.ui.getCore().byId("idComboEquipCatSI");
              var vTxtUnitTypeSI = sap.ui.getCore().byId("idComboUnitTypeSI");
              
              var valid = true;
              var objcontrlholdr= sap.ui.getCore().byId('idAutoRegionSI');                               
        var selectedValues= objcontrlholdr.getSelectedValues();
        /*if(selectedValues.length < 1){
               objcontrlholdr.setHolderPlaceHolder("Required");
               objcontrlholdr.setHolderEnabled(true);
               valid=false;
        }*/
               
        var objcontrlholdrCountry= sap.ui.getCore().byId('idAutoCountrySI');                              
        var selectedValuesCountry= objcontrlholdrCountry.getSelectedValues();
        
        var objcontrlholdrCity= sap.ui.getCore().byId('idAutoCitySI');                                 
        var selectedValuesCity= objcontrlholdrCity.getSelectedValues();
        
        if(selectedValuesCountry.length < 1 && selectedValuesCity.length < 1){
              objcontrlholdrCountry.setHolderBorderReuqired();
              objcontrlholdrCity.setHolderBorderReuqired();
              
              objcontrlholdrCountry.setHolderPlaceHolder("Country or/and City required");
              objcontrlholdrCity.setHolderPlaceHolder("Country or/and City required");
               valid=false;
        }
        /*if(selectedValuesCountry.length < 1){
              objcontrlholdrCountry.setHolderBorderReuqired();
              objcontrlholdrCountry.setHolderPlaceHolder("Required");
               valid=false;
        }
        if(selectedValuesCity.length < 1){
              objcontrlholdrCity.setHolderBorderReuqired();
              objcontrlholdrCity.setHolderPlaceHolder("Required");
               valid=false;
        }*/
              if ((vTxtEquipClassSI && (vTxtEquipClassSI.getValue() == "" || vTxtEquipClassSI.getValue() == "Select Equipment Class"))){
                     vTxtEquipClassSI.setValueState(sap.ui.core.ValueState.Error);
                     vTxtEquipClassSI.setValue("");
                     vTxtEquipClassSI.setPlaceholder("Select Equipment Class");

                     valid=false;
              }
              if ((vTxtEquipCatSI && (vTxtEquipCatSI.getValue() == "" || vTxtEquipCatSI.getValue() == "Select Equipment Category"))){
                     vTxtEquipCatSI.setValueState(sap.ui.core.ValueState.Error);
                     vTxtEquipCatSI.setValue("");
                     vTxtEquipCatSI.setPlaceholder("Select Equipment Category");
                     valid=false;
              }
              if ((vTxtUnitTypeSI && (vTxtUnitTypeSI.getValue() == "" || vTxtUnitTypeSI.getValue() == "Select Unit Type"))){
                     vTxtUnitTypeSI.setValueState(sap.ui.core.ValueState.Error);
                     vTxtUnitTypeSI.setValue("");
                     vTxtUnitTypeSI.setPlaceholder("Select Unit Type");
                     valid=false;
              }
              var validSG = true;
              var vSG1 = sap.ui.getCore().byId("idSG1");
              var vSG2 = sap.ui.getCore().byId("idSG2");
              var vSG3 = sap.ui.getCore().byId("idSG3");
              var vSGAll = sap.ui.getCore().byId("idSGAll");
              if((!vSGAll.getChecked()) && (!vSG1.getChecked()) & (!vSG2.getChecked()) && (!vSG3.getChecked())){
              validSG = false;
              }
              
              
              var validAge = true;
              var vLT5 = sap.ui.getCore().byId("idLT5");
              var vEQ12 = sap.ui.getCore().byId("idEQ12");
              var v5TO7 = sap.ui.getCore().byId("id5TO7");
              var vEQ13 = sap.ui.getCore().byId("idEQ13");
              var vEQ8 = sap.ui.getCore().byId("idEQ8");
              var vEQ14 = sap.ui.getCore().byId("idEQ14");
              var vEQ9 = sap.ui.getCore().byId("idEQ9");
              var vEQ15 = sap.ui.getCore().byId("idEQ15");
              var vEQ10 = sap.ui.getCore().byId("idEQ10");
              var vMT15 = sap.ui.getCore().byId("idMT15");
              var vEQ11 = sap.ui.getCore().byId("idEQ11");
              var vAgeAll = sap.ui.getCore().byId("idAgeAll");
              if((!vLT5.getChecked()) && (!vEQ12.getChecked()) && (!v5TO7.getChecked()) && (!vEQ13.getChecked()) 
                           && (!vEQ8.getChecked()) && (!vEQ14.getChecked()) && (!vEQ9.getChecked()) && (!vEQ15.getChecked()) && (!vEQ10.getChecked()) 
                           && (!vMT15.getChecked()) && (!vEQ11.getChecked()) && (!vAgeAll.getChecked())){
              validAge = false;
              }
              
              if(!validAge && validSG){
                     sap.ui.commons.MessageBox.show("Please select atleast 1 Age condition to view Sale Units.",
                            sap.ui.commons.MessageBox.Icon.WARNING,
                            "Warning",
                            [sap.ui.commons.MessageBox.Action.OK], 
                                      sap.ui.commons.MessageBox.Action.OK);
                     valid=false;
              }
              if(!validSG && validAge){
                     sap.ui.commons.MessageBox.show("Please select atleast 1 Sale Grade condition to view Sale Units.",
                            sap.ui.commons.MessageBox.Icon.WARNING,
                            "Warning",
                            [sap.ui.commons.MessageBox.Action.OK], 
                                      sap.ui.commons.MessageBox.Action.OK);
                     valid=false;
              }
              if(!validSG && !validAge){
                     sap.ui.commons.MessageBox.show("Please select atleast 1 Sale Grade & 1 Age condition to view Sale Units.",
                            sap.ui.commons.MessageBox.Icon.WARNING,
                            "Warning",
                            [sap.ui.commons.MessageBox.Action.OK], 
                                      sap.ui.commons.MessageBox.Action.OK);
                     valid=false;
              }
              return valid;
       },
       
       ResetSaleInvForm: function(sResult){
              if(sResult == "YES"){
                     sap.ui.getCore().byId('idAutoRegionSI').mProperties.placeholder = 'Select Region';
               sap.ui.getCore().byId('idAutoRegionSI').clearSelectedValues();
               
               sap.ui.getCore().byId('idAutoCountrySI').clearSelectedValues();
               sap.ui.getCore().byId('idAutoCountrySI').destroyAllItems();
               //populate country n city again
               var dataArrayCountry = [];
               var dataArrayCity = [];
               var oUtil = new utility();
               aCitySaleInv=[];
               aCountrySaleInv=[];
               for(var i=0 ; i< locationDataSI.length ; i++){
                   dataArrayCountry[i] = locationDataSI[i].Country;
                   dataArrayCity[i] = locationDataSI[i].City;
               }
               
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
               //sap.ui.getCore().byId('FldAutoCmpltValHldr').clearSelectedValues();
               sap.ui.getCore().byId('idAutoCountrySI').addholderitem();
               
               /*sap.ui.getCore().byId('idAutoCountrySI').mProperties.placeholder = 'Select Country';
               sap.ui.getCore().byId('idAutoCountrySI').mProperties.enabled=true;
               sap.ui.getCore().byId('idAutoCountrySI').destroyAllItems();*/
               
               //RESET CITY
               
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
                  
              /* sap.ui.getCore().byId('idAutoCitySI').mProperties.placeholder = 'Select City';
               sap.ui.getCore().byId('idAutoCitySI').mProperties.enabled=true;
               sap.ui.getCore().byId('idAutoCitySI').destroyAllItems();*/
               
                     var vSG1 = sap.ui.getCore().byId("idSG1");
                     var vSG2 = sap.ui.getCore().byId("idSG2");
                     var vSG3 = sap.ui.getCore().byId("idSG3");
                     var vSGAll = sap.ui.getCore().byId("idSGAll");
                     
                     vSG1.setChecked(false);
                     vSG2.setChecked(false);
                     vSG3.setChecked(false);
                     vSGAll.setChecked(true);
                     
                     var vLT5 = sap.ui.getCore().byId("idLT5");
                     var vEQ12 = sap.ui.getCore().byId("idEQ12");
                     var v5TO7 = sap.ui.getCore().byId("id5TO7");
                     var vEQ13 = sap.ui.getCore().byId("idEQ13");
                     var vEQ8 = sap.ui.getCore().byId("idEQ8");
                     var vEQ14 = sap.ui.getCore().byId("idEQ14");
                     var vEQ9 = sap.ui.getCore().byId("idEQ9");
                     var vEQ15 = sap.ui.getCore().byId("idEQ15");
                     var vEQ10 = sap.ui.getCore().byId("idEQ10");
                     var vMT15 = sap.ui.getCore().byId("idMT15");
                     var vEQ11 = sap.ui.getCore().byId("idEQ11");
                     var vAgeAll = sap.ui.getCore().byId("idAgeAll");
                     vLT5.setChecked(false);
                     vEQ12.setChecked(false);
                     v5TO7.setChecked(false);
                     vEQ13.setChecked(false);
                     vEQ8.setChecked(false);
                     vEQ14.setChecked(false);
                     vEQ9.setChecked(false);
                     vEQ15.setChecked(false);
                     vEQ10.setChecked(false);
                     vMT15.setChecked(false);
                     vEQ11.setChecked(false);
                     vAgeAll.setChecked(true);
                     
                     var EqpClass = sap.ui.getCore().byId("idComboEquipClassSI");
                    // EqpClass.setSelectedKey(0);
                     EqpClass.setValue("");
                    // EqpClass.setValue("ALL");
                     EqpClass.setValueState(sap.ui.core.ValueState.None);
                     EqpClass.setPlaceholder("Select Equipment Class");
                     
                     var EqpCat = sap.ui.getCore().byId("idComboEquipCatSI");
                   //  EqpCat.setSelectedKey(0);
                     EqpCat.setValue("");
                    // EqpCat.setValue("ALL");
                     EqpCat.setValueState(sap.ui.core.ValueState.None);
                     EqpCat.setPlaceholder("Select Equipment Category");
                     
                     var UnitType = sap.ui.getCore().byId("idComboUnitTypeSI");
                     //UnitType.setSelectedKey(0);
                     UnitType.setValue(""); 
                     //UnitType.setValue("ALL");
                     UnitType.setValueState(sap.ui.core.ValueState.None);
                     UnitType.setPlaceholder("Select Unit Type");
                     
                     if(sap.ui.getCore().byId("idSIResultTable")){
                           var vResultTbl= sap.ui.getCore().byId("idSIResultTable");
                     if(vResultTbl){
                            sap.ui.getCore().byId("idSIResultTable").destroy();
                            sap.ui.getCore().byId("idSaleInvResultFlex").destroy();
                            if(sap.ui.getCore().byId("SaleInvCityDetails")){
                                  sap.ui.getCore().byId("SaleInvCityDetails").destroy();
                            }
                     }
                     }
              }
              }
});

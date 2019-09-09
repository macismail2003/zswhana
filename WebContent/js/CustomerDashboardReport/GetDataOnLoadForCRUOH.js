/******** NP *******/
/******** NP *******/
/*$*$------------------------------------------------------------------------*
*$*$ Modified By : Seyed Ismail MAC
*$*$ Modified On : 11.12.2017
*$*$ Reference   : APS 167
*$*$ Transport   :
*$*$ Tag         : MAC11122017
*$*$ Purpose     : Seaweb enhancements for MSC
*				   Unit Off Hire - Add Search by Lease Number MAC11122017_3
*$*$------------------------------------------------------------------*
*/
var aLeaseTypeCRUOH = [];	// MAC11122017_3+
var aLeaseNumberCRUOH = [];	// MAC11122017_3+
var aOffHireLocationCRUOH = [];
var aUnitDescriptionCRUOH = [];
var aCustomerIDCRUOH = [];
var aCustomerMultipleIDCRUOH = [];
var loggedInUserTypeCRUOH = "";
var customerIDloggedInCRUOH = "";

var aComboBoxArraysCustCRUOH = {
		aCustomerCombo:[]
};
var oModelComboCRUOH = new sap.ui.model.json.JSONModel();

sap.ui.model.json.JSONModel.extend("onLoadDataUnitsOffHireCRUOH", {

	GetCustomerCRUOH: function(){

		var oCurrent = this;
		busyDialog.open();

		var urlToCall = serviceUrl + "/F4_Customer_NameId_Appended";

		oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
		OData.request({
		      requestUri: urlToCall,
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
		    	var oComboCustomerCRUOH = sap.ui.getCore().byId('idComboCustomerCRUOH');
		    	for ( var i = 0; i < dataLen ; i++) {
		    		if(data.results[i].CustName != ""){
		    			aCustomerIDCRUOH[i] = data.results[i].CustName;
		    			oComboCustomerCRUOH.addItem(new sap.ui.core.ListItem({text:data.results[i].CustName,
							key: data.results[i].Partner, additionalText: data.results[i].Partner}));
		    		}
				}

		    	busyDialog.close();
		    },
		    function(err){
		    	//busyDialog.close();
		    	errorfromServer(err);
		    	//alert("Error while reading region : "+ window.JSON.stringify(err.response));
		    });

},

	GetCustomerMultipleIDCRUOH: function(){
	var oCurrent = this;
	busyDialog.open();

	var loggedInUserName = objLoginUser.getLoggedInUserName();

	var urlToCall = serviceUrl + "/F4_Multiple_Cust?$filter=Bname eq '" + loggedInUserName + "' and Customer eq '' and Param1 eq ''";

	oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
	OData.request({
	      requestUri: urlToCall,
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
	    		if(data.results[i].CustName != ""){
	    			aCustomerMultipleIDCRUOH[i] = data.results[i].CustName;
	    		}
			}

	    	$( "#idComboCustomerCRUOH" ).autocomplete({
	    	      source: aCustomerMultipleIDCRUOH,
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
	    	    for (i in aCustomerMultipleIDCRUOH) {
	    	        if (aCustomerMultipleIDCRUOH[i].toLowerCase().match(this.value.toLowerCase())) {
	    	            isValid = true;
	    	        }
	    	    }
	    	    if (!isValid) {
	    	        this.value = previousValueCustomer
	    	    } else {
	    	    	previousValueCustomer = this.value;
	    	    }
	    	})
	    	.bind( "focusout", function( event ) {
	    		// MAC11122017_3+
	    		var customerID = document.getElementById("idComboCustomerCRUOH").value;
	    		if(customerID != ""){
	    			oCurrent.GetOnLeaseDataCRUOH();
	    		}

	    		aLeaseTypeCRUOH = [];
		    	sap.ui.getCore().byId('idLeaseTypeCRUOH').clearSelectedValues();
		    	sap.ui.getCore().byId('idLeaseTypeCRUOH').destroyAllItems();

		    	aLeaseNumberCRUOH = [];
		    	sap.ui.getCore().byId('idLeaseNumberCRUOH').clearSelectedValues();
		    	sap.ui.getCore().byId('idLeaseNumberCRUOH').destroyAllItems();
		    	// MAC11122017_3+
	    	})
	    	.bind( "focusin", function( event ) {
	    		document.getElementById("idComboCustomerCRUOH").style.borderColor = "#cccccc";
	    		document.getElementById("idComboCustomerCRUOH").style.background = "#ffffff";
				$("#idComboCustomerCRUOH").attr("placeholder","Select Customer");
		      });

	    	var dataLen = data.results.length;
	    	var oComboCustomerCRUOH = sap.ui.getCore().byId('idComboCustomerCRUOH');
	    	for ( var i = 0; i < dataLen ; i++) {
	    		if(data.results[i].CustName != ""){
	    			aCustomerIDCRUOH[i] = data.results[i].CustName;
	    			oComboCustomerCRUOH.addItem(new sap.ui.core.ListItem({text:data.results[i].CustName,
						key: data.results[i].Partner, additionalText: data.results[i].Partner}));
	    		}
			}

	    	busyDialog.close();
	    },
	    function(err){
	    	//busyDialog.close();
	    	errorfromServer(err);
	    	//alert("Error while reading region : "+ window.JSON.stringify(err.response));
	    });
},

	GetOffHireDataCRUOH: function(){
		busyDialog.open();

		aLeaseTypeCRUOL = [];

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
		    	offHireDataCRUOH = data.results;

                var dataArrayOffHireLocation = [];

                for(var i=0 ; i< dataLen ; i++){
                	dataArrayOffHireLocation[i] = data.results[i].City;
                }
                var oUtil = new utility();
                dataArrayOffHireLocation = oUtil.unique(dataArrayOffHireLocation);
                dataArrayOffHireLocation.sort();

                aOffHireLocationCRUOH = [];

                for(var j=0;j<dataArrayOffHireLocation.length;j++){
                	aOffHireLocationCRUOH.push({
                              "LocationCRUOH":dataArrayOffHireLocation[j],
                              "id":dataArrayOffHireLocation[j]
                       });
                }

                sap.ui.getCore().byId('idOffHireLocationCRUOH').mProperties.suggestValues= aOffHireLocationCRUOH;
                sap.ui.getCore().byId('idOffHireLocationCRUOH').mProperties.codePropertyName ='id';
                sap.ui.getCore().byId('idOffHireLocationCRUOH').mProperties.descriptionPropertyName='LocationCRUOH';
                sap.ui.getCore().byId('idOffHireLocationCRUOH').mProperties.enabled=true;
           		sap.ui.getCore().byId('idOffHireLocationCRUOH').addholderitem();

		    	busyDialog.close();
		    },
		    function(err){
		    	busyDialog.close();
		    	errorfromServer(err);
		    });
	},

	GetUnitDescriptionCRUOH: function(){
		busyDialog.open();
		filter = "/F4_Cust_Lease_CR?$filter=ICustomerId eq '' and ILeaseFlag eq '' and ILeaseNumber eq '' and ILeaseType eq '' and IPara1 eq '' and IPara2 eq '' and IPara3 eq ''";

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
  			var dataLen = data.results.length;
  			var dataArrayUnitDescription = [];
  			var dataArrayUnitType = [];

            for(var i=0 ; i< dataLen ; i++){
            	dataArrayUnitDescription[i] = data.results[i].Para1;
                dataArrayUnitType[i] = data.results[i].UnitType;
            }

            /*var oUtil = new utility();
            dataArrayUnitDescription = oUtil.unique(dataArrayUnitDescription);*/
            //dataArrayUnitDescription.sort();

  			aUnitDescriptionCRUOH = [];

  		   for(var i=0;i<dataArrayUnitDescription.length;i++)
  			 aUnitDescriptionCRUOH.push({
		    			"UnitDescrCRUOH":dataArrayUnitDescription[i],
		    			"id":dataArrayUnitType[i]
		    });

  		   	sap.ui.getCore().byId('idUnitDescrCRUOH').mProperties.suggestValues= aUnitDescriptionCRUOH;
  		   	sap.ui.getCore().byId('idUnitDescrCRUOH').mProperties.codePropertyName ='id';
  		   	sap.ui.getCore().byId('idUnitDescrCRUOH').mProperties.descriptionPropertyName='UnitDescrCRUOH';
  		   	sap.ui.getCore().byId('idUnitDescrCRUOH').addholderitem();

  		    busyDialog.close();
  		  },
  		  function(err){
  		    	errorfromServer(err);
  		  });
	},

	GetUserTypeIDCRUOH: function(){
		var oCurrent = this;

		loggedInUserTypeCRUOH = objLoginUser.getLoggedInUserType();
    	//alert("loggedInUserTypeCRUOH : "+loggedInUserTypeCRUOH);
		if(loggedInUserTypeCRUOH == "SEACO"){
			oCurrent.GetCustomerCRUOH();
		}
		else{
			oCurrent.GetCustomerMultipleIDCRUOH();
		}
	},

	//MAC11122017_3
	GetOnLeaseDataCRUOH: function(){
		var oCurrent=this;
		//busyDialog.open();

		var customerID = sap.ui.getCore().byId('idComboCustomerCRUOH').getSelectedKey();


		if(customerID.trim().length > 0){
			oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
			OData.request({
			      requestUri: serviceUrl + "/F4_Cust_Lease_CR?$filter=ICustomerId eq '" + customerID
			      						 + "' and ILeaseFlag eq 'X' and ILeaseNumber eq '' and ILeaseType eq '' and IPara1 eq '' and IPara2 eq '' and IPara3 eq ''",
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

                    var dataArrayLeaseType = [];
                    var dataArrayLeaseTypeDesc = [];

                    for(var i=0 ; i< dataLen ; i++){
                            dataArrayLeaseType[i] = data.results[i].LeaseType;
                            dataArrayLeaseTypeDesc[i] = data.results[i].Para2;
                    }

	                var oUtil = new utility();
	                dataArrayLeaseType = oUtil.unique(dataArrayLeaseType);

                    aLeaseTypeCRUOH = [];

                    for(var j=0;j<dataArrayLeaseType.length;j++){
                            aLeaseTypeCRUOH.push({
                                  "LeaseTypeSI":dataArrayLeaseTypeDesc[j],
                                  "id":dataArrayLeaseType[j]
                           });
                    }

	                sap.ui.getCore().byId('idLeaseTypeCRUOH').mProperties.placeholder = 'Lease Type';
	                sap.ui.getCore().byId('idLeaseTypeCRUOH').mProperties.suggestValues= aLeaseTypeCRUOH;
	                sap.ui.getCore().byId('idLeaseTypeCRUOH').mProperties.codePropertyName ='id';
	                sap.ui.getCore().byId('idLeaseTypeCRUOH').mProperties.descriptionPropertyName='LeaseTypeSI';
	                sap.ui.getCore().byId('idLeaseTypeCRUOH').mProperties.enabled=true;
	           		sap.ui.getCore().byId('idLeaseTypeCRUOH').addholderitem();

			    	//busyDialog.close();
			    },
			    function(err){
			    	//busyDialog.close();
			    	errorfromServer(err);
			    });
		}
		else{
			aLeaseNumberCRUOL = [];
	    	sap.ui.getCore().byId('idLeaseNumberCRUOH').clearSelectedValues();
	    	sap.ui.getCore().byId('idLeaseNumberCRUOH').destroyAllItems();

		}
	},

	onLeaseTypeChange: function(selLeaseType){
		//busyDialog.open();

		var customerID = sap.ui.getCore().byId('idComboCustomerCRUOH').getSelectedKey();

		var leaseTypes = sap.ui.getCore().byId("idLeaseTypeCRUOH").getSelectedValues();
		var leaseTypeString = "";

		if(leaseTypes.length > 0){
			for(var i=0; i<leaseTypes.length; i++){
				leaseTypeString += leaseTypes[i].code + "$";
			}

			leaseTypeString = leaseTypeString.slice(0,-1);

			aLeaseNumberCRUOH = [];
			sap.ui.getCore().byId('idLeaseNumberCRUOH').clearSelectedValues();
			sap.ui.getCore().byId('idLeaseNumberCRUOH').destroyAllItems();

			aUnitDescrCRUOH = [];
			sap.ui.getCore().byId('idUnitDescrCRUOH').clearSelectedValues();
			sap.ui.getCore().byId('idUnitDescrCRUOH').destroyAllItems();

		}

		oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
		OData.request({
		      requestUri: serviceUrl + "/F4_Cust_Lease_CR?$filter=ICustomerId eq '" + customerID
		      						 + "' and ILeaseFlag eq '' and ILeaseNumber eq '' and ILeaseType eq '" + leaseTypeString + "' and IPara1 eq '' and IPara2 eq '' and IPara3 eq ''",
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

                var dataArrayLeaseNumber = [];

                for(var i=0 ; i< dataLen ; i++){
                	dataArrayLeaseNumber[i] = data.results[i].LeaseNo/*.replace(/^0+/, '')*/;
                }

                var oUtil = new utility();
                dataArrayLeaseNumber = oUtil.unique(dataArrayLeaseNumber);

                aLeaseNumberCRUOH = [];

                for(var j=0;j<dataArrayLeaseNumber.length;j++){
                	aLeaseNumberCRUOH.push({
                              "LeaseNumberSI":dataArrayLeaseNumber[j],
                              "id":dataArrayLeaseNumber[j]
                       });
                }

                sap.ui.getCore().byId('idLeaseNumberCRUOH').mProperties.placeholder = 'Lease Number';
                sap.ui.getCore().byId('idLeaseNumberCRUOH').mProperties.suggestValues= aLeaseNumberCRUOH;
                sap.ui.getCore().byId('idLeaseNumberCRUOH').mProperties.codePropertyName ='id';
                sap.ui.getCore().byId('idLeaseNumberCRUOH').mProperties.descriptionPropertyName='LeaseNumberSI';
                sap.ui.getCore().byId('idLeaseNumberCRUOH').mProperties.enabled=true;
           		sap.ui.getCore().byId('idLeaseNumberCRUOH').addholderitem();

		    	//busyDialog.close();
		    },
		    function(err){
		    	//busyDialog.close();
		    	errorfromServer(err);
		    });
	},

	//MAC11122017_3
});

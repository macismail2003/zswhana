/******** NP *******/
var aLeaseTypeCRUOL = [];
var aLeaseNumberCRUOL = [];
var aUnitDescrCRUOL = [];
var leaseDataCRUOL = [];
var loggedInUserTypeCRUOL = "";
var customerIDloggedInCRUOL = "";
var aCustomerIDCRUOL = [];
var aCustomerMultipleIDCRUOL = [];
var UnitTypeArraysSI = {
		EquipClassArraySI : [],
		EquipCatArraySI : [],
		aUnitTypeSI : []
};

var aComboBoxArraysCustCRUOL = {
		aCustomerCombo:[]
};
var oModelComboCRUOL = new sap.ui.model.json.JSONModel();
sap.ui.model.json.JSONModel.extend("onLoadDataUnitsOnLeaseCRUOL", {

	GetCustomerIDCRUOL: function(){

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
		    	var oComboCustomerIDCRUOL = sap.ui.getCore().byId('idComboCustomerIDCRUOL');
		    	for ( var i = 0; i < dataLen ; i++) {
		    		if(data.results[i].CustName != ""){
		    			aCustomerIDCRUOL[i] = data.results[i].CustName;
		    			oComboCustomerIDCRUOL.addItem(new sap.ui.core.ListItem({text:data.results[i].CustName,
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

	GetCustomerMultipleIDCRUOL: function(){
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
		    			aCustomerMultipleIDCRUOL[i] = data.results[i].CustName;
		    		}
				}

		    	$( "#idComboCustomerIDCRUOL" ).autocomplete({
		    	      source: aCustomerMultipleIDCRUOL,
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
		    	    for (i in aCustomerMultipleIDCRUOL) {
		    	        if (aCustomerMultipleIDCRUOL[i].toLowerCase().match(this.value.toLowerCase())) {
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
		    		var customerID = document.getElementById("idComboCustomerIDCRUOL").value;
		    		if(customerID != ""){
		    			oCurrent.GetOnLeaseDataCRUOL();
		    		}
		    		aLeaseTypeCRUOL = [];
			    	sap.ui.getCore().byId('idLeaseTypeCRUOL').clearSelectedValues();
			    	sap.ui.getCore().byId('idLeaseTypeCRUOL').destroyAllItems();

			    	aLeaseNumberCRUOL = [];
			    	sap.ui.getCore().byId('idLeaseNumberCRUOL').clearSelectedValues();
			    	sap.ui.getCore().byId('idLeaseNumberCRUOL').destroyAllItems();

			    	aUnitDescrCRUOL = [];
			    	sap.ui.getCore().byId('idUnitDescrCRUOL').clearSelectedValues();
			    	sap.ui.getCore().byId('idUnitDescrCRUOL').destroyAllItems();
			      })
		    	.bind( "focusin", function( event ) {
		    		document.getElementById("idComboCustomerIDCRUOL").style.borderColor = "#cccccc";
		    		document.getElementById("idComboCustomerIDCRUOL").style.background = "#ffffff";
					$("#idComboCustomerIDCRUOL").attr("placeholder","Select Customer");

			      });

		    	var dataLen = data.results.length;
		    	var oComboCustomerIDCRUOL = sap.ui.getCore().byId('idComboCustomerIDCRUOL');
		    	for ( var i = 0; i < dataLen ; i++) {
		    		if(data.results[i].CustName != ""){
		    			aCustomerIDCRUOL[i] = data.results[i].CustName;
		    			oComboCustomerIDCRUOL.addItem(new sap.ui.core.ListItem({text:data.results[i].CustName,
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

	GetOnLeaseDataCRUOL: function(){
		var oCurrent = this;
		//busyDialog.open();
		var customerID = sap.ui.getCore().byId('idComboCustomerIDCRUOL').getSelectedKey();


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

                    aLeaseTypeCRUOL = [];

                    for(var j=0;j<dataArrayLeaseType.length;j++){
                            aLeaseTypeCRUOL.push({
                                  "LeaseTypeSI":dataArrayLeaseTypeDesc[j],
                                  "id":dataArrayLeaseType[j]
                           });
                    }

	                sap.ui.getCore().byId('idLeaseTypeCRUOL').mProperties.placeholder = 'Lease Type';
	                sap.ui.getCore().byId('idLeaseTypeCRUOL').mProperties.suggestValues= aLeaseTypeCRUOL;
	                sap.ui.getCore().byId('idLeaseTypeCRUOL').mProperties.codePropertyName ='id';
	                sap.ui.getCore().byId('idLeaseTypeCRUOL').mProperties.descriptionPropertyName='LeaseTypeSI';
	                sap.ui.getCore().byId('idLeaseTypeCRUOL').mProperties.enabled=true;
	           		sap.ui.getCore().byId('idLeaseTypeCRUOL').addholderitem();

			    	//busyDialog.close();
			    },
			    function(err){
			    	//busyDialog.close();
			    	errorfromServer(err);
			    });
		}
		else{
			aLeaseNumberCRUOL = [];
	    	sap.ui.getCore().byId('idLeaseNumberCRUOL').clearSelectedValues();
	    	sap.ui.getCore().byId('idLeaseNumberCRUOL').destroyAllItems();

	    	aUnitDescrCRUOL = [];
	    	sap.ui.getCore().byId('idUnitDescrCRUOL').clearSelectedValues();
	    	sap.ui.getCore().byId('idUnitDescrCRUOL').destroyAllItems();
		}
	},


	onLeaseTypeChange: function(selLeaseType){
		//busyDialog.open();

		var customerID = sap.ui.getCore().byId('idComboCustomerIDCRUOL').getSelectedKey();

		var leaseTypes = sap.ui.getCore().byId("idLeaseTypeCRUOL").getSelectedValues();
		var leaseTypeString = "";

		if(leaseTypes.length > 0){
			for(var i=0; i<leaseTypes.length; i++){
				leaseTypeString += leaseTypes[i].code + "$";
			}

			leaseTypeString = leaseTypeString.slice(0,-1);

			aLeaseNumberCRUOL = [];
			sap.ui.getCore().byId('idLeaseNumberCRUOL').clearSelectedValues();
			sap.ui.getCore().byId('idLeaseNumberCRUOL').destroyAllItems();

			aUnitDescrCRUOL = [];
			sap.ui.getCore().byId('idUnitDescrCRUOL').clearSelectedValues();
			sap.ui.getCore().byId('idUnitDescrCRUOL').destroyAllItems();

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

                aLeaseNumberCRUOL = [];

                for(var j=0;j<dataArrayLeaseNumber.length;j++){
                	aLeaseNumberCRUOL.push({
                              "LeaseNumberSI":dataArrayLeaseNumber[j],
                              "id":dataArrayLeaseNumber[j]
                       });
                }

                sap.ui.getCore().byId('idLeaseNumberCRUOL').mProperties.placeholder = 'Lease Number';
                sap.ui.getCore().byId('idLeaseNumberCRUOL').mProperties.suggestValues= aLeaseNumberCRUOL;
                sap.ui.getCore().byId('idLeaseNumberCRUOL').mProperties.codePropertyName ='id';
                sap.ui.getCore().byId('idLeaseNumberCRUOL').mProperties.descriptionPropertyName='LeaseNumberSI';
                sap.ui.getCore().byId('idLeaseNumberCRUOL').mProperties.enabled=true;
           		sap.ui.getCore().byId('idLeaseNumberCRUOL').addholderitem();

		    	//busyDialog.close();
		    },
		    function(err){
		    	//busyDialog.close();
		    	errorfromServer(err);
		    });
	},

	onLeaseNumberChange: function(selLeaseNumber){
		//busyDialog.open();

		var customerID = sap.ui.getCore().byId('idComboCustomerIDCRUOL').getSelectedKey();

		var leaseTypes = sap.ui.getCore().byId("idLeaseTypeCRUOL").getSelectedValues();
		var leaseTypeString = "";

		if(leaseTypes.length > 0){
			for(var i=0; i<leaseTypes.length; i++){
				leaseTypeString += leaseTypes[i].code + "$";
			}

			leaseTypeString = leaseTypeString.slice(0,-1);

			aUnitDescrCRUOL = [];
			sap.ui.getCore().byId('idUnitDescrCRUOL').clearSelectedValues();
			sap.ui.getCore().byId('idUnitDescrCRUOL').destroyAllItems();
		}

		var leaseNumbers = sap.ui.getCore().byId("idLeaseNumberCRUOL").getSelectedValues();
		var leaseNumberString = "";

		if(leaseNumbers.length > 0){
			for(var i=0; i<leaseNumbers.length; i++){
				leaseNumberString += leaseNumbers[i].description + "$";
			}

			leaseNumberString = leaseNumberString.slice(0,-1);
		}

		oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);

		var urlToCallUnitDescrCRUOL = serviceUrl + "/F4_Cust_Lease_CR?$filter=ICustomerId eq '" + customerID
			 + "' and ILeaseFlag eq '' and ILeaseNumber eq '" + leaseNumberString
				 + "' and ILeaseType eq '" + leaseTypeString
				 + "' and IPara1 eq '' and IPara2 eq '' and IPara3 eq ''";

		OData.request({
		      requestUri: urlToCallUnitDescrCRUOL,
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

                var dataArrayUnitDescr = [];
                var dataArrayUnitDescrCode = [];

                for(var i=0 ; i< dataLen ; i++){
                	dataArrayUnitDescr[i] = data.results[i].Para1;
                	dataArrayUnitDescrCode[i] = data.results[i].UnitType;
                }

                var oUtil = new utility();
                dataArrayUnitDescr = oUtil.unique(dataArrayUnitDescr);

                aUnitDescrCRUOL = [];

                for(var j=0;j<dataArrayUnitDescr.length;j++){
                	aUnitDescrCRUOL.push({
                              "UnitDescrSI":dataArrayUnitDescr[j],
                              "id":dataArrayUnitDescrCode[j]
                       });
                }

                sap.ui.getCore().byId('idUnitDescrCRUOL').mProperties.placeholder = 'Unit Type';
                sap.ui.getCore().byId('idUnitDescrCRUOL').mProperties.suggestValues= aUnitDescrCRUOL;
                sap.ui.getCore().byId('idUnitDescrCRUOL').mProperties.codePropertyName ='id';
                sap.ui.getCore().byId('idUnitDescrCRUOL').mProperties.descriptionPropertyName='UnitDescrSI';
                sap.ui.getCore().byId('idUnitDescrCRUOL').mProperties.enabled=true;
           		sap.ui.getCore().byId('idUnitDescrCRUOL').addholderitem();

		    	//busyDialog.close();
		    },
		    function(err){
		    	//busyDialog.close();
		    	errorfromServer(err);
		    });
	},

	GetUserTypeIDCRUOL: function(){
		var oCurrent = this;

		loggedInUserTypeCRUOL = objLoginUser.getLoggedInUserType();
    	//alert("loggedInUserTypeCRUOL : "+loggedInUserTypeCRUOL);
		if(loggedInUserTypeCRUOL == "SEACO"){
			oCurrent.GetCustomerIDCRUOL();
		}
		else{
			oCurrent.GetCustomerMultipleIDCRUOL();
		}
	}
});

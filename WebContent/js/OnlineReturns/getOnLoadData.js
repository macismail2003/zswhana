var aExistingReturnsOR = [];
var aComboBoxArraysOR = {
		aContractCombo : [],
		aDepotCombo:[],
		aCountryCombo:[],
		aCityCombo:[],
		aUnitTypeCombo:[],
		aCustomerCombo:[]
};
var bindExistngRetStatusOR= false;
var ContNoStatusOR = false;
var unitTypStatusOR=false;
var countryCityORStatus=false;
var DepotORStatus =false;
var DepotDataCombo = [];
var CustomerDataCombo = [];
var oModelCombo = new sap.ui.model.json.JSONModel({sizeLimit : 20000});
var oModelCityCombo = new sap.ui.model.json.JSONModel();
sap.ui.model.json.JSONModel.extend("getDataOnlineReturns", {
	
	bindExistingReturns: function(RdBtnKey){
		//var objUser = new loggedInU();
		//busyDialog.open();
		var vExistingReturnsTable = sap.ui.getCore().byId("idExistingRetTblOR");
		var vCreatedBy = "";
		if(RdBtnKey == "M"){
			sap.ui.getCore().byId("idRdBtnGrpExistingReturns").setSelectedIndex(0);
			vCreatedBy = objLoginUser.getLoggedInUserName();
		}
		else{
			sap.ui.getCore().byId("idRdBtnGrpExistingReturns").setSelectedIndex(1);
			vCreatedBy = "";
		}
		//security
		var customerOR = "";
		loggedInUserTypeOR = objLoginUser.getLoggedInUserType();
		//if(loggedInUserTypeOR != "CUSTOMER"){
			var vSelCustomer = $("#idComboCustomerOR").val();
			if(vSelCustomer != ""){
				var selCustomer = jQuery.grep(CustomerDataCombo, function(element, index){
			        return element.CustName == vSelCustomer;
				});
				if(selCustomer.length>0)
					customerOR = selCustomer[0].Partner.replace(/^0+/, '');
				else
					customerOR = "";
			}
		//}
		/*else{
			customerOR = objLoginUser.getLoggedInUserID();
		}*/
		
		//var vCustomer = "0000100001"; //
		//var vCustomer = sap.ui.getCore().byId("idComboCustomerOR").getValue();
		
			var urlToCall = serviceUrl + "/Existing_Returns?$filter=CreatedBy eq '" + vCreatedBy + "' and Customer eq '" + customerOR + "'";
			//alert("url exst ret " + urlToCall);
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
			    	aExistingReturnsOR = [];
			    	jsonExistingReturnsOR = [];
			    	var len = data.results.length;
			    	//alert("len " + len)
			    	if(len > 0){
				    	//aExistingReturnsOR = data.results;
				    	for(var i=0 ; i<len ; i++){
					    	var vExpDt = data.results[i].ExpiryDate.split("(");
							var vDate= vExpDt[1].split(")");
							var vActualExpDt = new Date(Number(vDate[0]));
							var vformattedExpDt = dateFormat(new Date(Number(vDate[0])), 'dd-mm-yyyy',"UTC");
							  if (vformattedExpDt.substring(6) === "9999"){
								  data.results[i].ExpiryDate =  "-";
							  }
							  else{
								  data.results[i].ExpiryDate = vformattedExpDt;
							  }
							  aExistingReturnsOR.push({
								  	'Return':data.results[i].Return,
						            'UnitType':data.results[i].UnitType,
						            'Location':data.results[i].Location,
						            'ReturnQty':data.results[i].ReturnQty,
						            'OutstandQty':data.results[i].OutstandQty,
						            'ExpiryDate':data.results[i].ExpiryDate,
						            'ExpiryDateActual':vActualExpDt,
						            'CreatedBy':data.results[i].CreatedBy,
						            'helpValue':data.results[i].Return+"$"+data.results[i].UnitType+"$"+data.results[i].Location
							  });
							  jsonExistingReturnsOR.push({
						            'Return':aExistingReturnsOR[i].Return,
						            'Unit Type':aExistingReturnsOR[i].UnitType,
						            'Location':aExistingReturnsOR[i].Location,
						            'Return Quantity':aExistingReturnsOR[i].ReturnQty,
						            'Outstanding':aExistingReturnsOR[i].OutstandQty,
						            'Expiry Date':aExistingReturnsOR[i].ExpiryDate,
						            'By':aExistingReturnsOR[i].CreatedBy,
						        });
				    	}
				    	//Create a model and bind the table rows to this model
				    	var oModelReturns = new sap.ui.model.json.JSONModel();
				    	oModelReturns.setData({modelData: aExistingReturnsOR});
				    	vExistingReturnsTable.setModel(oModelReturns);
				    	vExistingReturnsTable.bindRows("/modelData");
				    	vExistingReturnsTable.getModel().updateBindings();
				    	//busyDialog.close();
			    	}
			    	else{
			    		/*sap.ui.commons.MessageBox.show("Existing Returns not found.",
			                     sap.ui.commons.MessageBox.Icon.WARNING,
			                     "Warning",
			                     [sap.ui.commons.MessageBox.Action.OK], 
			                         sap.ui.commons.MessageBox.Action.OK);*/
			    		var oModelReturns = new sap.ui.model.json.JSONModel();
				    	oModelReturns.setData({modelData: aExistingReturnsOR});
				    	vExistingReturnsTable.setModel(oModelReturns);
				    	vExistingReturnsTable.bindRows("/modelData");
				    	vExistingReturnsTable.getModel().updateBindings();
			    		 busyDialog.close();
			    	}
		    },
		    function(err){
		    	busyDialog.close();
		    	errorfromServer(err);
		    }); //odata request
		
	}, //bindExistingReturns
	
	populateCustomer: function(){
		
		
			var oCurrent = this;
			busyDialog.open();
			//alert("populate customer");
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
			    	CustomerDataCombo = data.results;
			    	for ( var i = 0; i < dataLen ; i++) {
			    		if(data.results[i].CustName != ""){
			    			aComboBoxArraysOR.aCustomerCombo[i] = data.results[i].CustName;
			    		}
					}
			    	
			    	$("#idComboCustomerOR" ).autocomplete({
			    	      source: aComboBoxArraysOR.aCustomerCombo,
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
			    	    for (i in aComboBoxArraysOR.aCustomerCombo) {
			    	        if (aComboBoxArraysOR.aCustomerCombo[i].toLowerCase().match(this.value.toLowerCase())) {
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
			    		// var oGetData = new getDataOnlineReturns();
			    		//alert("out")
			    		 aComboBoxArraysOR.aUnitTypeCombo = [];
			    		 aComboBoxArraysOR.aContractCombo = [];
			    		 // oCurrent.bindExistingReturns("M");
						  //oCurrent.populateContractNo();
				      })
			    	.bind( "focusin", function( event ) {
			    		document.getElementById("idComboCustomerOR").style.borderColor = "#cccccc";
			    		document.getElementById("idComboCustomerOR").style.background = "#ffffff";
						$("#idComboCustomerOR").attr("placeholder","Select Customer");
				      });
			    	
			    	var dataLen = data.results.length;
			    	for ( var i = 0; i < dataLen ; i++) {
			    		aComboBoxArraysOR.aCustomerCombo[i] = data.results[i];
					}
			    	
			    	oModelCombo.setSizeLimit(20000);
			    	oModelCombo.setData(aComboBoxArraysOR);
			    	
					var vComboCustomer = sap.ui.getCore().byId("idComboCustomerOR");
					vComboCustomer.setModel(oModelCombo);
					vComboCustomer.bindItems("/aCustomerCombo",new sap.ui.core.ListItem({text: "{CustName}"}));
					//vComboCustomer.insertItem((new sap.ui.core.ListItem({text:"Select Customer", key:"0"})),0);
					
					oModelCombo.updateBindings();
			    	//busyDialog.close();
			    },
			    function(err){
			    	//busyDialog.close();
			    	errorfromServer(err);
			    	//alert("Error while reading region : "+ window.JSON.stringify(err.response));
			    });
		
	}, //populateCustomer
	
	populateMultipleCustomerOR: function(){
		var oCurrent = this;
		var vUserName = objLoginUser.getLoggedInUserName().toUpperCase();
   		oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
   		var urlToCall = serviceUrl + "/F4_Multiple_Cust?$filter=Bname eq '" + vUserName + "' and Customer eq '' and Param1 eq ''";
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
 	    	CustomerDataCombo = data.results;
	    	for ( var i = 0; i < dataLen ; i++) {
	    		if(data.results[i].CustName.trim() != ""){
	    			aComboBoxArraysOR.aCustomerCombo[i] = data.results[i].CustName;
	    		}
			}
	    	
	    	$( "#idComboCustomerOR" ).autocomplete({
	    	      source: aComboBoxArraysOR.aCustomerCombo,
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
	    	    for (i in aComboBoxArraysOR.aCustomerCombo) {
	    	        if (aComboBoxArraysOR.aCustomerCombo[i].toLowerCase().match(this.value.toLowerCase())) {
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
	    		aComboBoxArraysOR.aUnitTypeCombo = [];
	    		 aComboBoxArraysOR.aContractCombo = [];
	    		 // oCurrent.bindExistingReturns("M");
				 // oCurrent.populateContractNo();
		      })
	    	.bind( "focusin", function( event ) {
	    		document.getElementById("idComboCustomerOR").style.borderColor = "#cccccc";
	    		document.getElementById("idComboCustomerOR").style.background = "#ffffff";
				$("#idComboCustomerOR").attr("placeholder","Select Customer");
		      });
	    	
	    	var dataLen = data.results.length;
	    	for ( var i = 0; i < dataLen ; i++) {
	    		aComboBoxArraysOR.aCustomerCombo[i] = data.results[i];
			}
	    	oModelCombo.setData(aComboBoxArraysOR);
	    	
			var vComboCustomer = sap.ui.getCore().byId("idComboCustomerOR");
			vComboCustomer.setModel(oModelCombo);
			vComboCustomer.bindItems("/aCustomerCombo",new sap.ui.core.ListItem({text: "{CustName}"}));
			//vComboCustomer.insertItem((new sap.ui.core.ListItem({text:"Select Customer", key:"0"})),0);
			
			oModelCombo.updateBindings();
 	     },
 	    function(err){
      	   busyDialog.close();
 	    });
	},
	/*
	populateContractNo: function(){
		//security
		var vSelCustomer = $("#idComboCustomerOR").val();
		var customerOR = "";
		loggedInUserTypeOR = objLoginUser.getLoggedInUserType();
		if(loggedInUserTypeOR != "CUSTOMER"){
			
			if(vSelCustomer != ""){
				var selCustomer = jQuery.grep(CustomerDataCombo, function(element, index){
			        return element.CustName == vSelCustomer;
				});
				if(selCustomer.length>0)
					customerOR = selCustomer[0].Partner;
				else
					customerOR = "";
			}
		}
		else{
			customerOR = objLoginUser.getLoggedInUserID();
		}
	//var oUtil = new utility();
	if(vSelCustomer != ""){
			var urlToCall = serviceUrl + "/F4_Contract_Type?$filter=ICustomer eq '" + customerOR + "'";
			//alert("populate contect url " +urlToCall);
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
			    	aComboBoxArraysOR.aContractCombo = [];
			    	var dataLen = data.results.length;
			    	for ( var i = 0; i < dataLen ; i++) {
			    		data.results[i].IContract = objUtil.removeLeadZero(data.results[i].IContract);
			    		aComboBoxArraysOR.aContractCombo[i] = data.results[i];
					}
			    	oModelCombo.setData(aComboBoxArraysOR);
			    	
					var vComboContractNo = sap.ui.getCore().byId("idComboContractNumberOR");
					vComboContractNo.setModel(oModelCombo);
					vComboContractNo.bindItems("/aContractCombo",new sap.ui.core.ListItem({text: "{IContract}"}));
					//vComboContractNo.insertItem((new sap.ui.core.ListItem({text:"Select Contract Number", key:"0"})),0);
					
					oModelCombo.updateBindings();
			    	//busyDialog.close();
			    },
			    function(err){
			    	busyDialog.close();
			    	errorfromServer(err);
			    	//alert("Error while reading region : "+ window.JSON.stringify(err.response));
			    });
	}
	else{
		aComboBoxArraysOR.aUnitTypeCombo = [];
	}
	}, //populateContractNo
	
	populateUnitType: function(contractNo){
		//alert("sel contract " + contractNo);
		aComboBoxArraysOR.aUnitTypeCombo = [];
		var vSelCustomer = $("#idComboCustomerOR").val();
		var customerOR = "";
		loggedInUserTypeOR = objLoginUser.getLoggedInUserType();
		if(loggedInUserTypeOR != "CUSTOMER"){
			
			if(vSelCustomer != ""){
				var selCustomer = jQuery.grep(CustomerDataCombo, function(element, index){
			        return element.CustName == vSelCustomer;
				});
				if(selCustomer.length>0)
					customerOR = selCustomer[0].Partner;
				else
					customerOR = "";
			}
		}
		else{
			customerOR = objLoginUser.getLoggedInUserID();
		}
		
		if(vSelCustomer != ""){
			var urlToCall = serviceUrl + "/F4_UnitType_Contract?$filter=ICustomer eq '" + customerOR + "' and Contract eq '" + contractNo + "'";
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
			    	aComboBoxArraysOR.aUnitTypeCombo = data.results;
			    	oModelCombo.setData(aComboBoxArraysOR);
			    	
					var vComboUnitType = sap.ui.getCore().byId("idComboUnitTypeOR");
					vComboUnitType.setModel(oModelCombo);
					vComboUnitType.bindItems("/aUnitTypeCombo",new sap.ui.core.ListItem({text: "{OrderedProd}"}));
					//vComboUnitType.insertItem((new sap.ui.core.ListItem({text:"Select Unit Type", key:"0"})),0);
					
					oModelCombo.updateBindings();
					//busyDialog.close();
			    },
			    function(err){
			    	busyDialog.close();
			    	errorfromServer(err);
			    	//alert("Error while reading region : "+ window.JSON.stringify(err.response));
			    });
		}
	}, //populateUnitType
*/	
	populateCountryCity: function(){
		var oCurrent = this;
		//busyDialog.open();
		aComboBoxArraysOR.aCountryCombo = [];
		aComboBoxArraysOR.aCityCombo = [];
		var urlToCall = serviceUrl + "/F4_Country_City?$filter=Country eq 'REDELIV'"; // MAC11122017_1 +
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
		    		if(data.results[i].Country != ""){
		    			aComboBoxArraysOR.aCountryCombo[i] = data.results[i].Country;
		    		}
		    		if(data.results[i].City != ""){
		    			aComboBoxArraysOR.aCityCombo[i] = data.results[i].City;
		    		}
				}
		    	
		    	var dataLen = data.results.length;
		    	for ( var i = 0; i < dataLen ; i++) {
		    		aComboBoxArraysOR.aCityCombo[i] = data.results[i];
				}
		    	oModelCityCombo.setData(aComboBoxArraysOR);
		    	oModelCityCombo.setSizeLimit(3000);
		    	
				var oComboCityOR = sap.ui.getCore().byId("idComboCityOR");
				oComboCityOR.setModel(oModelCityCombo);
				oComboCityOR.bindItems("/aCityCombo",new sap.ui.core.ListItem({text: "{City}"}));
				//oComboCityOR.insertItem((new sap.ui.core.ListItem({text:"Select City", key:"0"})),0);
				
				oModelCityCombo.updateBindings();
		    	/*$( "#idComboCountryOR" ).autocomplete({
		    	      source: aComboBoxArraysOR.aCountryCombo,
		    	      minLength: 0,
		    	})
		    	.focus(function(){            
		    		 if ($("ul.ui-autocomplete").is(":hidden")) {
		    		        $(this).autocomplete('search', '');
		    		    }
		    	})
		    	.keyup(function() {
		    	    var isValid = false;
		    	    var previousValueCountry ="";
		    	    for (i in aComboBoxArraysOR.aCountryCombo) {
		    	        if (aComboBoxArraysOR.aCountryCombo[i].toLowerCase().match(this.value.toLowerCase())) {
		    	            isValid = true;
		    	        }
		    	    }
		    	    if (!isValid) {
		    	        this.value = previousValueCountry
		    	    } else {
		    	    	previousValueCountry = this.value;
		    	    }
		    	})
		    	.bind( "focusout", function( event ) {
			    	sap.ui.getCore().byId("OnlineReturns").getController().CountryChange();
			      })
		    	.bind( "focusin", function( event ) {
		    		document.getElementById("idComboCountryOR").style.borderColor = "#cccccc";
		    		document.getElementById("idComboCountryOR").style.background = "#ffffff";
					$("#idComboCountryOR").attr("placeholder","Select Country");
			      });*/
		    	
		    	
		    	$( "#idComboCityOR" ).autocomplete({
		    	      source: aComboBoxArraysOR.aCityCombo,
		    	      minLength: 0,
		    	})
		    	.focus(function(){            
		    		 if ($("ul.ui-autocomplete").is(":hidden")) {
		    		        $(this).autocomplete('search', '');
		    		    }
		    	})
		    	.keyup(function() {
		    	    var isValid = false;
		    	    var previousValueCity ="";
		    	    for (i in aComboBoxArraysOR.aCityCombo) {
		    	        if (aComboBoxArraysOR.aCityCombo[i].toLowerCase().match(this.value.toLowerCase())) {
		    	            isValid = true;
		    	        }
		    	    }
		    	    if (!isValid) {
		    	        this.value = previousValueCity
		    	    } else {
		    	    	previousValueCity = this.value;
		    	    }
		    	})
		    	.bind( "focusout", function( event ) {
		    		//var selCity = $("#idComboCityOR").val();
		    	//	oCurrent.populateDepot(selCity);
			      })
		    	.bind( "focusin", function( event ) {
		    		document.getElementById("idComboCityOR").style.borderColor = "#cccccc";
		    		document.getElementById("idComboCityOR").style.background = "#ffffff";
					$("#idComboCityOR").attr("placeholder","Select City");
			      });
		    	//busyDialog.close();
		    },
		    function(err){
		    	busyDialog.close();
		    	errorfromServer(err);
		    	//alert("Error while reading region : "+ window.JSON.stringify(err.response));
		    });
		
	}, //populateCountryCity
	
	/*populateDepot: function(vSelCity){
	//	busyDialog.open();
	$("#idComboDepotOR").val("");
	aComboBoxArraysOR.aDepotCombo = [];
	DepotDataCombo = [];
	var urlToCall = serviceUrl + "/F4_Depot_Names?$filter=City eq '" + vSelCity + "'";
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
	    	DepotDataCombo = data.results;
	    	for ( var i = 0; i < dataLen ; i++) {
	    		aComboBoxArraysOR.aDepotCombo[i] = data.results[i].IdName;
			}
	    	$( "#idComboDepotOR" ).autocomplete({
	    	      source: aComboBoxArraysOR.aDepotCombo,
	    	      minLength: 0,
	    	      select: function( event, ui ){
	    	    	  hasRegionChanged = true;
	    	      }
	    	})
	    	.focus(function(){            
	    		 if ($("ul.ui-autocomplete").is(":hidden")) {
	    		        $(this).autocomplete('search', '');
	    		    }
	    	})
	    	.keyup(function() {
	    	    var isValid = false;
	    	    var previousValue = "";
	    	    for (i in aComboBoxArraysOR.aDepotCombo) {
	    	        if (aComboBoxArraysOR.aDepotCombo[i].toLowerCase().match(this.value.toLowerCase())) {
	    	            isValid = true;
	    	        }
	    	    }
	    	    if (!isValid) {
	    	        this.value = previousValue
	    	    } else {
	    	        previousValue = this.value;
	    	    }
	    	})
	    	.bind( "focusin", function( event ) {
	    		document.getElementById("idComboDepotOR").style.borderColor = "#cccccc";
	    		document.getElementById("idComboDepotOR").style.background = "#ffffff";
				$("#idComboDepotOR").attr("placeholder","Select Depot");
		      });
	    	//busyDialog.close();
	    },
	    function(err){
	    	//busyDialog.close();
	    	errorfromServer(err);
	    	//alert("Error while reading region : "+ window.JSON.stringify(err.response));
	    });
	}, //populateDepot
	
	OnCountryChange: function(){
		var oCurrent = this;
		aComboBoxArraysOR.aCityCombo = [];
		$("#idComboDepotOR").val("");
		$("#idComboCityOR").val("");
		//var selCountry = $("#idComboCountryOR").val().toUpperCase();
		var selCountry = $("#idComboCountryOR").val();
		var urlToCall = serviceUrl + "/F4_Country_City?$filter=Country eq '" + selCountry + "'";
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
		    		
		    		if(data.results[i].City != " "){
		    			aComboBoxArraysOR.aCityCombo[i] = data.results[i].City;
		    		}
				}
		    	$( "#idComboCityOR" ).autocomplete({
		    	      source: aComboBoxArraysOR.aCityCombo,
		    	      minLength: 0,
		    	})
		    	.focus(function(){            
		    		 if ($("ul.ui-autocomplete").is(":hidden")) {
		    		        $(this).autocomplete('search', '');
		    		    }
		    	})
		    	.keyup(function() {
		    	    var isValid = false;
		    	    var previousValueCityChng ="";
		    	    for (i in aComboBoxArraysOR.aCityCombo) {
		    	        if (aComboBoxArraysOR.aCityCombo[i].toLowerCase().match(this.value.toLowerCase())) {
		    	            isValid = true;
		    	        }
		    	    }
		    	    if (!isValid) {
		    	        this.value = previousValueCityChng
		    	    } else {
		    	    	previousValueCityChng = this.value;
		    	    }
		    	})
		    	.bind( "focusout", function( event ) {
		    		var selCity = $("#idComboCityOR").val();
		    		oCurrent.populateDepot(selCity);
			      })
		    	.bind( "focusin", function( event ) {
		    		document.getElementById("idComboCityOR").style.borderColor = "#cccccc";
		    		document.getElementById("idComboCityOR").style.background = "#ffffff";
					$("#idComboCityOR").attr("placeholder","Select City");
			      });
		    },
		    function(err){
		    	//busyDialog.close();
		    	errorfromServer(err);
		    	//alert("Error while reading region : "+ window.JSON.stringify(err.response));
		    });
	},
	*/
	
});
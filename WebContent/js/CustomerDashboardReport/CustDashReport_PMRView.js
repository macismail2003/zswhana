var jsonPMRReportETE = [];
var aPMRReportData = [];
var autoUnitDescCustPMR = [];
var autoLocationCustPMR = [];
var oUtil = new utility();
var aLeaseNoCustReportPMR= [];
var CustomerDataComboCustPMR = [];
var aComboBoxArraysCustPMR = {
		aCustomerCombo:[]
};
var oModelComboPMR = new sap.ui.model.json.JSONModel();
var loggedInUserTypeCustPMR = [];
sap.ui.model.json.JSONModel.extend("CustReportPMRView", {

	createCustReportPMRView: function(){

		 var oCurrent = this;
		 var labStar = new sap.ui.commons.Label({text: "* "}).addStyleClass("MandatoryStar");
	     var lblSpaceLegend = new sap.ui.commons.Label( {text: " ",width : '5px'});
		 var labRequired = new sap.ui.commons.Label({text: " Mandatory Field",wrapping: true});
		 var oFlexboxReq = new sap.m.FlexBox({
			 // layoutData: new sap.ui.layout.GridData({span: "L7 M6 S4"}),
              items: [labStar,lblSpaceLegend,labRequired],
              direction: "Row"
		  }).addStyleClass(" marginTop10");

		 // Labels
		 var oLabelCustomer = new sap.ui.commons.Label({text: "Customer ID:",required:true,
				layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: true, margin: false}),
	            wrapping: true}).addStyleClass("marginTop10");

		var oLabelLeaseNumber = new sap.ui.commons.Label({text: "Lease Number:",required:true,
			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: true, margin: false}),
            wrapping: true}).addStyleClass("marginTop50");

		var oLabelLocation = new sap.ui.commons.Label({text: "Location:",
			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: true, margin: false}),
            wrapping: true}).addStyleClass("marginTop10");

		var oLabelUnitType = new sap.ui.commons.Label({text: "Unit Type: ",
			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: true, margin: false}),
            wrapping: true}).addStyleClass("marginTop10");

		var oLabelDate = new sap.ui.commons.Label({text: "Period:",
			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: true, margin: false}),
            wrapping: true}).addStyleClass("marginTop10");

		/*//Warning
		var oLabelWarning = new sap.ui.commons.Label({text: "Enter Date in the format YYYYMM only",
			//var oLabelWarning = new sap.ui.commons.Label({text: "To view the status: For individual containers, please enter the 4 letter prefix and 7 digit number for each container. (Ex. SEGU3000511). For multiple containers (Max 25), press the Enter key after each one.",
		wrapping: true}).addStyleClass("font10");

		 var LblFlex = new sap.m.FlexBox({ items: [ oLabelDate, oLabelWarning ],
	          direction: "Column",
	          layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: true, margin: false})});*/

		//inputs
		 /*var oComboCustomer = new sap.ui.core.HTML("idHtmlCustomerCustPMR",{layoutData: new sap.ui.layout.GridData({span: "L8 M8 S5"})});
			var htmlContentCustomer = '<input id="idComboCustomerCustPMR" placeholder="Select Customer" class="FormInputStyle marginTop10" style="width:100%">';
			oComboCustomer.setContent(htmlContentCustomer);*/

			var oComboCustomer = new sap.ui.commons.ComboBox("idComboCustomerCustPMR", {
				layoutData: new sap.ui.layout.GridData({span: "L6 M8 S12"}),
				width:"100%",
				//enabled: seacoUser,
				placeholder:"Select Customer",
				 change: function(evnt){
						if(this.getValue() != '')
						{
							oCurrent.PopulateLeaseNumbersCustPMR(this.getValue());
						}
			          }
			}).addStyleClass("marginTop10");


			var oInputLeaseNumber = new sap.m.MultiComboBox("idLeaseNumberCustPMR", {
				layoutData: new sap.ui.layout.GridData({span: "L7 M10 S12"}),
				width:"100%",
				height: "120px",
				//enabled: seacoUser,
				placeholder:"Select Lease",
				 change: function(evnt){

					    var selectedLeases = sap.ui.getCore().byId("idLeaseNumberCustPMR").getSelectedKeys();
						if(selectedLeases.length != 0)
						{
							var selLeaseNo='';
							for(var i=0; i<selectedLeases.length; i++){
								selLeaseNo = selLeaseNo + '$' + selectedLeases[i];
							}
							selLeaseNo = selLeaseNo.slice(0,-1);
							oCurrent.onLeaseNoChangePMR(selLeaseNo);

						}
			          }
			}).addStyleClass("marginTop10 bigMultiCombo");

		 /*var oInputLeaseNumber = new control.AutoCompleteValueHolder('idLeaseNumberCustPMR', {
             layoutData: new sap.ui.layout.GridData({span: "L8 M8 S5"}),
             placeholder: "Lease Number",
             itemSelectLimit: 25,
             selectedItem: function (event) {
	            	 var selLeaseNo='';
	                 for(var i=0;i<event.mParameters.allItems.length;i++)
	                	 selLeaseNo += event.mParameters.allItems[i].description +'$';

	                 selLeaseNo = selLeaseNo.slice(0,-1);
	                 oCurrent.onLeaseNoChangePMR(selLeaseNo);
                },
                deletedItem: function (event) {
                	var selLeaseNo='';
                    var selectedValues = sap.ui.getCore().byId('idLeaseNumberCustPMR').getSelectedValues();
                    if(selectedValues.length > 0){
	                    for(var i=0;i<selectedValues.length;i++)
	                    	selLeaseNo += selectedValues[0].description +'$';

	                    selLeaseNo = selLeaseNo.slice(0,-1);

                    }
                    oCurrent.onLeaseNoChangePMR(selLeaseNo);
                },
                deletedAllItems: function (event) {
         }
       });
		 oInputLeaseNumber.addStyleClass("marginTop10");*/

		 var oInputLocation = new control.AutoCompleteValueHolder('idLocationCustPMR', {
             layoutData: new sap.ui.layout.GridData({span: "L8 M8 S5"}),
             placeholder: "Location",
             itemSelectLimit: 25,
             selectedItem: function (event) {
                    sap.ui.getCore().byId('idLocationCustPMR').mProperties.placeholder = 'Location';
                },
                deletedItem: function (event) {
                    sap.ui.getCore().byId('idLocationCustPMR').mProperties.placeholder = 'Location';
                },
                deletedAllItems: function (event) {
         }
       });
		 oInputLocation.addStyleClass("marginTop10");

		 var oInputUnitType = new control.AutoCompleteValueHolder('idUnitTypeCustPMR', {
             layoutData: new sap.ui.layout.GridData({span: "L8 M8 S5"}),
             placeholder: "Unit Description",
             itemSelectLimit: 25,
             selectedItem: function (event) {
                    sap.ui.getCore().byId('idUnitTypeCustPMR').mProperties.placeholder = 'Unit Description';
             },
                deletedItem: function (event) {
                    sap.ui.getCore().byId('idUnitTypeCustPMR').mProperties.placeholder = 'Unit Description';
                },
                deletedAllItems: function (event) {
         }
       });
		 oInputUnitType.addStyleClass("marginTop10");


		 //Value to be populated
		 var CurrentDate = dateFormat(new Date(), 'mmm-yyyy');//.split("-");
		 //CurrentDateString = CurrentDate[2]+CurrentDate[1];

		 var oInputDate = new sap.ui.commons.TextField("idDateCustPMR",{
			 layoutData: new sap.ui.layout.GridData({span: "L8 M8 S5"}),
			 placeholder: "Date",
			 enabled:false,
			 value:CurrentDate
		 }).addStyleClass("marginTop10");

		 //Buttons
		 var oBtnSubmit = new sap.m.Button("idBtnSubmitCustPMR",{
	          text : "Submit",
	          styled:false,
	            width:"80px",
	          layoutData: new sap.ui.layout.GridData({span: "L4 M3 S4",linebreak: true, margin: true}),
	          press:function(){
	        	  if(oCurrent.validatePMRForm()){
	        		  oCurrent.createCustPMRReportTable();
	        	    oCurrent.getPMRReport();
	        	}

	          }}).addStyleClass("submitBtn marginTop10");

		 var oBtnReset = new sap.m.Button("idBtnResetCustPMR",{
	          text : "Reset",
	          styled:false,
	            width:"80px",
	          layoutData: new sap.ui.layout.GridData({span: "L4 M3 S4",linebreak: true, margin: true}),
	          press:function(){
	        		  oCurrent.resetCustPMRReportForm();
	          }}).addStyleClass("submitBtn marginTop10");

		 var lblSpace1 = new sap.ui.commons.Label( {text: " ",width : '8px'});
		    //flexbox for 2 buttons
		    var oFlexBoxFormButtons = new sap.m.FlexBox({
	    		width: "100%",
	    		items:[
	    		       oBtnSubmit, lblSpace1, oBtnReset
	    		],
	    		direction: "Row"
	    	}).addStyleClass("marginTop10");

		// Responsive Grid Layout
		    var oCustPMRFormLayout = new sap.ui.layout.form.ResponsiveGridLayout("idCustPMRFormLayout",{
		    	 columnsL: 2,
		          columnsM: 1,
		          columnsS: 1,
		          /*breakpointL: 1200,
				  breakpointM: 900*/
		    });

	        var oCustPMRForm = new sap.ui.layout.form.Form("idCustPMRForm",{
	                layout: oCustPMRFormLayout,
	                formContainers: [
	                        new sap.ui.layout.form.FormContainer("idCustPMRFormC1",{
	                                formElements: [
                                               new sap.ui.layout.form.FormElement({
												    fields: [oLabelCustomer, oComboCustomer]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oLabelLeaseNumber, oInputLeaseNumber]
												}),
												new sap.ui.layout.form.FormElement({
											        fields: [oLabelLocation, oInputLocation]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oLabelUnitType, oInputUnitType]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oLabelDate, oInputDate]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oFlexBoxFormButtons]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oFlexboxReq]
												}),
	                                        ],

	                        }),
	                        new sap.ui.layout.form.FormContainer("idCustPMRFormC2",{
	                            formElements: [
	                                    ]
	                    }),
	                        ],
	                        //layoutData: new sap.ui.layout.GridData({span: "L6 M3 S4"}),
	            });
	        var vHDivider = new sap.ui.commons.HorizontalDivider({width: "95%", type: "Area", height: "Medium"});

	     // Responsive Grid Layout
		    var oCustPMRReportTableLayout = new sap.ui.layout.form.ResponsiveGridLayout("idCustPMRReportTableLayout",{
		    	 columnsL: 2,
		          columnsM: 1,
		          columnsS: 1,
		          /*breakpointL: 1200,
				  breakpointM: 900*/
		    });

	        var oCustPMRReportTable = new sap.ui.layout.form.Form("idCustPMRReportTable",{
	                layout: oCustPMRReportTableLayout,
	                formContainers: [
	                        new sap.ui.layout.form.FormContainer("idCustPMRReportTableC1",{
	                                formElements: [
												new sap.ui.layout.form.FormElement("idPMRReportTblFE",{
												    fields: []
												})
	                                        ],

	                        })
	                        ]
	                        //layoutData: new sap.ui.layout.GridData({span: "L6 M3 S4"}),
	            });

	        var oFlexboxAll = new sap.m.FlexBox({
			      items: [
			        oCustPMRForm,
			        vHDivider,
			        oCustPMRReportTable
			      ],
			      direction: "Column"
			    });

	        return oFlexboxAll;
	},

	populateCustomerCustPMR: function(){
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
		    	var oComboCustomerCustPMR = sap.ui.getCore().byId('idComboCustomerCustPMR');
		    	var dataLen = data.results.length;
		    	CustomerDataComboCustPMR = data.results;
		    	for ( var i = 0; i < dataLen ; i++) {
		    		if(data.results[i].CustName != ""){
		    			aComboBoxArraysCustPMR.aCustomerCombo[i] = data.results[i].CustName;
		    			oComboCustomerCustPMR.addItem(new sap.ui.core.ListItem({text:data.results[i].CustName,
							key: data.results[i].Partner, additionalText: data.results[i].Partner}));
		    		}
				}

		    	loggedInUserTypeCustPMR = objLoginUser.getLoggedInUserType();

				busyDialog.close();
		    },
		    function(err){
		    	//busyDialog.close();
		    	errorfromServer(err);
		    	//alert("Error while reading region : "+ window.JSON.stringify(err.response));
		    });

	}, //populateCustomer

	populateMultipleCustomerCustPMR: function(){
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
 	    	CustomerDataComboCustPMR = data.results;
	    	for ( var i = 0; i < dataLen ; i++) {
	    		if(data.results[i].CustName.trim() != ""){
	    			aComboBoxArraysCustPMR.aCustomerCombo[i] = data.results[i].CustName;
	    		}
			}

	    	$( "#idComboCustomerCustPMR" ).autocomplete({
	    	      source: aComboBoxArraysCustPMR.aCustomerCombo,
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
	    	    for (i in aComboBoxArraysCustPMR.aCustomerCombo) {
	    	        if (aComboBoxArraysCustPMR.aCustomerCombo[i].toLowerCase().match(this.value.toLowerCase())) {
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
	    		oCurrent.PopulateLeaseNumbersCustPMR($("#idComboCustomerCustPMR").val());
		      })
	    	.bind( "focusin", function( event ) {
	    		document.getElementById("idComboCustomerCustPMR").style.borderColor = "#cccccc";
	    		document.getElementById("idComboCustomerCustPMR").style.background = "#ffffff";
				$("#idComboCustomerCustPMR").attr("placeholder","Customer ID");
		      });

	    	var oComboCustomerCustPMR = sap.ui.getCore().byId('idComboCustomerCustPMR');
	    	var dataLen = data.results.length;
	    	CustomerDataComboCustPMR = data.results;
	    	for ( var i = 0; i < dataLen ; i++) {
	    		if(data.results[i].CustName != ""){
	    			aComboBoxArraysCustPMR.aCustomerCombo[i] = data.results[i].CustName;
	    			oComboCustomerCustPMR.addItem(new sap.ui.core.ListItem({text:data.results[i].CustName,
						key: data.results[i].Partner, additionalText: data.results[i].Partner}));
	    		}
			}
 	     },
 	    function(err){
      	   busyDialog.close();
 	    });
	},

	PopulateLeaseNumbersCustPMR: function(customerID){
		busyDialog.open();
		if(customerID.trim().length > 0){
			var temp = jQuery.grep(CustomerDataComboCustPMR, function(element, index){
	            return element.CustName == customerID;
	    	});
			if(temp.length > 0){
				oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
				var urlToCall = serviceUrl + "/F4_Cust_Lease_CR?$filter=ICustomerId eq '" + temp[0].Partner + "'";
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
					 var len = data.results.length;
					 aLeaseNoCustReportPMR = [];
					 var dataArrayLeaseNo = [];
					 for(var i=0;i<len;i++){
						 dataArrayLeaseNo[i] = data.results[i].LeaseNo.replace(/^0+/, '');
					 }
						 var oUtil = new utility();
						 dataArrayLeaseNo = oUtil.unique(dataArrayLeaseNo);
						 dataArrayLeaseNo.sort();

						 var oLeaseNumberCustPMR = sap.ui.getCore().byId('idLeaseNumberCustPMR');
						 //oLeaseNumberCustPMR.insertItem((new sap.ui.core.ListItem({text:"", key:""})),0);

						 for(var j=0;j<dataArrayLeaseNo.length;j++){
		                     aLeaseNoCustReportPMR.push({
		                            "LeaseNo":dataArrayLeaseNo[j],
		                            "id":dataArrayLeaseNo[j]
		                     });
		                     oLeaseNumberCustPMR.addItem(new sap.ui.core.ListItem({text:dataArrayLeaseNo[j],
									key: dataArrayLeaseNo[j], additionalText: dataArrayLeaseNo[j]}));
		                }
						 /*sap.ui.getCore().byId('idLeaseNumberCustPMR').mProperties.suggestValues= aLeaseNoCustReportPMR;
				           sap.ui.getCore().byId('idLeaseNumberCustPMR').mProperties.codePropertyName ='LeaseNo';
				            sap.ui.getCore().byId('idLeaseNumberCustPMR').mProperties.descriptionPropertyName='LeaseNo';
				           sap.ui.getCore().byId('idLeaseNumberCustPMR').mProperties.enabled=true;
				           //sap.ui.getCore().byId('FldAutoCmpltValHldr').clearSelectedValues();
				           sap.ui.getCore().byId('idLeaseNumberCustPMR').addholderitem();*/

					 busyDialog.close();
				 },
			  function(err){
			    	errorfromServer(err);
			    	busyDialog.close();
			  });
			}
			 busyDialog.close();
		}
		else{
			busyDialog.close();
			aLeaseNoCustReportPMR = [];
			autoUnitDescCustPMR = [];
			 sap.ui.getCore().byId('idLeaseNumberCustPMR').clearSelectedValues();
		      sap.ui.getCore().byId('idLeaseNumberCustPMR').destroyAllItems();
			 sap.ui.getCore().byId('idUnitTypeCustPMR').clearSelectedValues();
		      sap.ui.getCore().byId('idUnitTypeCustPMR').destroyAllItems();
		}
	},

	populateUnitDescriptionCustPMR: function(){
		busyDialog.open();
		filter = "/F4_Help_Unit_Type";

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
  			busyDialog.close();

  			var aUnitDesc= [];
  			autoUnitDescCustPMR = [];
  		   for(var i=0;i<data.results.length;i++){
  			 aUnitDesc[i] = data.results[i].IDepotCode;
  		 }
  		 aUnitDesc = oUtil.unique(aUnitDesc);
  		 for(var j=0;j<aUnitDesc.length;j++){
  			autoUnitDescCustPMR.push({
  	 			"Unit":aUnitDesc[j],
  	 			"id":aUnitDesc[j]
  	  		 });
  		 }

  		   	sap.ui.getCore().byId('idUnitTypeCustPMR').mProperties.suggestValues= autoUnitDescCustPMR;
  		   	sap.ui.getCore().byId('idUnitTypeCustPMR').mProperties.codePropertyName ='id';
  		   	sap.ui.getCore().byId('idUnitTypeCustPMR').mProperties.descriptionPropertyName='Unit';
  		   	sap.ui.getCore().byId('idUnitTypeCustPMR').addholderitem();
  		  },
  		  function(err){
  		    	errorfromServer(err);
  		  });

	},

	populateLocationCustPMR: function(){
		var aLocation= [];
		autoLocationCustPMR = [];
		//busyDialog.open();
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
		    	 for(var i=0;i<data.results.length;i++){
		    		 aLocation[i] = data.results[i].City;
		  		 }
		    	 aLocation = oUtil.unique(aLocation);
		    	 aLocation.sort();
		  		 for(var j=0;j<aLocation.length;j++){
		  			autoLocationCustPMR.push({
		  	 			"Unit":aLocation[j],
		  	 			"id":aLocation[j]
		  	  		 });
		  		 }

		  		   	sap.ui.getCore().byId('idLocationCustPMR').mProperties.suggestValues= autoLocationCustPMR;
		  		   	sap.ui.getCore().byId('idLocationCustPMR').mProperties.codePropertyName ='id';
		  		   	sap.ui.getCore().byId('idLocationCustPMR').mProperties.descriptionPropertyName='Unit';
		  		   	sap.ui.getCore().byId('idLocationCustPMR').addholderitem();
		  		 // busyDialog.close();
		    },
		    function(err){
		    	busyDialog.close();
		    	errorfromServer(err);
		    });
	},

	resetCustPMRReportForm: function(){
		if(sap.ui.getCore().byId("idPMRReportTblFlex"))
			sap.ui.getCore().byId("idPMRReportTblFE").destroyFields();
		/*HSN_SEAWEB*/
		sap.ui.getCore().byId('idComboCustomerCustPMR').setSelectedKey("");
		sap.ui.getCore().byId('idComboCustomerCustPMR').setPlaceholder("Select Customer");
		//$("#idComboCustomerCustPMR").val("");
		//$("#idComboCustomerCustPMR").attr("placeholder","Select Customer");
		/*HSN_SEAWEB*/
		document.getElementById("idComboCustomerCustPMR").style.borderColor = "#cccccc";
		document.getElementById("idComboCustomerCustPMR").style.background = "#ffffff";
		aLeaseNoCustReportPMR = [];
		autoUnitDescCustPMR = [];
		sap.ui.getCore().byId("idLeaseNumberCustPMR").removeAllSelectedItems();
		sap.ui.getCore().byId('idUnitTypeCustPMR').clearSelectedValues();
	    sap.ui.getCore().byId('idUnitTypeCustPMR').destroyAllItems();
	    sap.ui.getCore().byId('idLocationCustPMR').clearSelectedValues();
	},

	validatePMRForm: function(){
		var vCustomer =  sap.ui.getCore().byId("idComboCustomerCustPMR").getSelectedKey();
		var vLeaseNumber = sap.ui.getCore().byId("idLeaseNumberCustPMR");
		var selectedValuesLease = vLeaseNumber.getSelectedKeys();
		var vDate = sap.ui.getCore().byId("idDateCustPMR");
		var isValid = true;

		if(vCustomer.length == 0){
			document.getElementById("idComboCustomerCustPMR").style.borderColor = "red";
    		document.getElementById("idComboCustomerCustPMR").style.background = "#FAD4D4";
        	isValid=false;
        }
		else{
			document.getElementById("idComboCustomerCustPMR").style.borderColor = "#cccccc";
    		document.getElementById("idComboCustomerCustPMR").style.background = "#ffffff";
		}

        if(selectedValuesLease.length < 1){
        	vLeaseNumber.setHolderBorderReuqired();
        	vLeaseNumber.setHolderPlaceHolder("Required");
        	isValid=false;
        }

        /*if(vDate.getValue().trim().length == 0){
        	vDate.setValueState(sap.ui.core.ValueState.Error);
        	vDate.setValue("");
        	vDate.setPlaceholder("Required");
        	isValid=false;
        }

        //check if numberic
        if(!$.isNumeric(vDate.getValue().trim())){
        	vDate.setValueState(sap.ui.core.ValueState.Error);
        	vDate.setValue("");
        	vDate.setPlaceholder("Invalid date format");
        	isValid=false;
        }

        //check if positive
        if(vDate.getValue().trim() < 0 ){
        	vDate.setValueState(sap.ui.core.ValueState.Error);
        	vDate.setValue("");
        	vDate.setPlaceholder("Invalid date format");
        	isValid=false;
        }

        //check month and year values
        var vDateYear = vDate.getValue().trim().substring(0,4);
        var vDateMonth = vDate.getValue().trim().substring(5);
        var CurrentDate = dateFormat(new Date(), 'dd-mm-yyyy',"UTC").split("-");
		CurrentDateString = CurrentDate[2]+CurrentDate[1];

        if(parseInt(vDateMonth) < 1 || parseInt(vDateMonth) > 12){
        	vDate.setValueState(sap.ui.core.ValueState.Error);
        	vDate.setValue("");
        	vDate.setPlaceholder("Invalid date format");
        	isValid=false;
        }

        if(parseInt(vDate.getValue().trim()) > parseInt(CurrentDateString)){
        	vDate.setValueState(sap.ui.core.ValueState.Error);
        	vDate.setValue("");
        	vDate.setPlaceholder("Invalid date format");
        	isValid=false;
        }*/
        return isValid;
	},

	createCustPMRReportTable: function(){

		//if tbl exists then destroy the FE fields
		if(sap.ui.getCore().byId("idPMRReportTblFlex"))
			sap.ui.getCore().byId("idPMRReportTblFE").destroyFields();


		var oLabelTitle = new sap.ui.commons.Label({text: "Redelivery Schedule",
	        wrapping: true}).addStyleClass("font15Bold marginTop10");

		var oLabelPMR = new sap.ui.commons.Label({text: "PMR- Permitted Monthly Returns",
	        wrapping: true}).addStyleClass("marginTop10");

		var oLabelTRQ = new sap.ui.commons.Label({text: "TRQ- Total Returns Quantity",
	        wrapping: true}).addStyleClass("marginTop10");

		var oLabelSpace = new sap.ui.commons.Label({text: " ",
			width:"25px",
	        wrapping: true}).addStyleClass("marginTop10");

		// Buttons
		var oBtnExport = new sap.m.Button({
            text : "Export To Excel",
            type:sap.m.ButtonType.Unstyled,
            //icon: sap.ui.core.IconPool.getIconURI("excel-attachment"),
            icon: sap.ui.core.IconPool.getIconURI("excel-attachment"),
            press:function(){
            	//objUtil = new utility();
            	//alert("vTitle " + vTitle);
            	objUtil.makeHTMLTable(jsonPMRReportETE, "Redelivery Schedule Details","export");
            	//tableToExcel("idAccountDetailTbl-table",vTitle,vColLen);
            }
         }).addStyleClass("submitBtn");

		var oFlexTitle = new sap.m.FlexBox({
            items: [
                    oLabelTitle
            ],
            width:"60%",
            direction:"Row"
	});

		var oFlexExpBtn = new sap.m.FlexBox({
            items: [
                    oBtnExport
            ],
            width:"40%",
            direction:"RowReverse"
	});

		var oFlexHeader = new sap.m.FlexBox({
            items: [
                    oFlexTitle,oFlexExpBtn
            ],
            direction:"Row"
	});
		var oFlexAbbr = new sap.m.FlexBox({
            items: [
                    oLabelPMR,oLabelSpace,oLabelTRQ
            ],
            direction:"Row"
	});

		var oBtnViewAllCustPMR = new sap.m.Button("idBtnViewAllCustPMR",{
	        text : "View All",
	        styled:false,
	        width:"80px",
	        press:function(){
	        	this.setVisible(false);
	        	var vArrayLength = aPMRReportData.length;
	        	if(vArrayLength < 100){
	        		sap.ui.getCore().byId("idReportCustPMRTbl").setVisibleRowCount(vArrayLength);
	        		sap.ui.getCore().byId("idReportCustPMRTbl").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
	        	}
	        	else{
	        		sap.ui.getCore().byId("idReportCustPMRTbl").setVisibleRowCount(100);
	        		sap.ui.getCore().byId("idReportCustPMRTbl").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
	        	}

	        }
	     }).addStyleClass("submitBtn marginTop10");


		// Table
		var oPMRReportTbl = new sap.ui.table.Table("idReportCustPMRTbl",{
	        firstVisibleRow: 3,
	        columnHeaderHeight: 40,
	        fixedColumnCount:1,
	        selectionMode: sap.ui.table.SelectionMode.None,
	        navigationMode: sap.ui.table.NavigationMode.Paginator,
		 }).addStyleClass("tblBorder marginTop10");


		// Table Columns
		oPMRReportTbl.addColumn(new sap.ui.table.Column({
		     label: new sap.ui.commons.Label({text: "Lease Number"}).addStyleClass("wraptextcol"),
		     template: new sap.ui.commons.TextView().bindProperty("text", "LeaseNo"),
		     sortProperty: "LeaseNo",
		     filterProperty: "LeaseNo",
		     resizable:false,
		     width:"120px"
			 }));

		oPMRReportTbl.addColumn(new sap.ui.table.Column({
	     label: new sap.ui.commons.Label({text: "Location"}).addStyleClass("wraptextcol"),
	     template: new sap.ui.commons.TextView().bindProperty("text", "Location"),
	     sortProperty: "Location",
	     filterProperty: "Location",
	     resizable:false,
	     width:"120px"
		 }));

		oPMRReportTbl.addColumn(new sap.ui.table.Column({
		     label: new sap.ui.commons.Label({text: "Unit Description"}).addStyleClass("wraptextcol"),
		     template: new sap.ui.commons.TextView().bindProperty("text", "UnitDesc"),
		     sortProperty: "UnitDesc",
		     filterProperty: "UnitDesc",
		     resizable:false,
		     width:"300px"
			 }));

		oPMRReportTbl.addColumn(new sap.ui.table.Column({
		     label: new sap.ui.commons.Label({text: "Category Description"}).addStyleClass("wraptextcol"),
		     template: new sap.ui.commons.TextView().bindProperty("text", "CategoryId"),
		     sortProperty: "CategoryId",
		     filterProperty: "CategoryId",
		     resizable:false,
		     width:"150px"
			 }));

		oPMRReportTbl.addColumn(new sap.ui.table.Column({
		     label: new sap.ui.commons.Label({text: "PMR Count"}).addStyleClass("wraptextcol"),
		     template: new sap.ui.commons.TextView().bindProperty("text", "PmrCount"),
		     sortProperty: "PmrCount",
		     filterProperty: "PmrCount",
		     resizable:false,
		     width:"120px"
			 }));

		oPMRReportTbl.addColumn(new sap.ui.table.Column({
		     label: new sap.ui.commons.Label({text: "TRQ Count"}).addStyleClass("wraptextcol"),
		     template: new sap.ui.commons.TextView().bindProperty("text", "TrqCount"),
		     sortProperty: "TrqCount",
		     filterProperty: "TrqCount",
		     resizable:false,
		     width:"120px"
			 }));

		oPMRReportTbl.addColumn(new sap.ui.table.Column({
		     label: new sap.ui.commons.Label({text: "Returned"}).addStyleClass("wraptextcol"),
		     template: new sap.ui.commons.TextView().bindProperty("text", "Returned"),
		     sortProperty: "Returned",
		     filterProperty: "Returned",
		     resizable:false,
		     width:"120px"
			 }));

		oPMRReportTbl.addColumn(new sap.ui.table.Column({
		     label: new sap.ui.commons.Label({text: "Authorised but\nNot Returned"}).addStyleClass("wraptextcol"),
		     template: new sap.ui.commons.TextView().bindProperty("text", "Authorised"),
		     sortProperty: "Authorised",
		     filterProperty: "Authorised",
		     resizable:false,
		     width:"120px"
			 }));

		oPMRReportTbl.addColumn(new sap.ui.table.Column({
		     label: new sap.ui.commons.Label({text: "Remaining"}).addStyleClass("wraptextcol"),
		     template: new sap.ui.commons.TextView().bindProperty("text", "Remaining"),
		     sortProperty: "Remaining",
		     filterProperty: "Remaining",
		     resizable:false,
		     width:"120px"
			 }));

		// Flex Box
		 var oFlexBoxReport = new sap.m.FlexBox("idPMRReportTblFlex",{
		  items: [
		            oFlexAbbr,
		          	oFlexHeader,
		          	oPMRReportTbl,
		          	oBtnViewAllCustPMR
	  		  ],
	  		direction: "Column",
	  		width:"100%"
	  		});
		 var oReportFormElement = sap.ui.getCore().byId("idPMRReportTblFE");
		 oReportFormElement.insertField(oFlexBoxReport,0);
	},

	getPMRReport: function(){
		busyDialog.open();
		var vCustomerSelected =  sap.ui.getCore().byId("idComboCustomerCustPMR").getSelectedKey();
		var temp = jQuery.grep( CustomerDataComboCustPMR, function(element, index){
	  		   return element.CustName == vCustomerSelected;
	  	   });
			//vCustomer = temp[0].Partner.replace(/^0+/, '');
		vCustomer = vCustomerSelected;
		var vLeaseNumber = sap.ui.getCore().byId("idLeaseNumberCustPMR");
		var selectedValuesLease = vLeaseNumber.getSelectedKeys();

		var vUnitDescription = sap.ui.getCore().byId("idUnitTypeCustPMR");
		var selectedValuesUD = vUnitDescription.getSelectedValues();

		var vLocation = sap.ui.getCore().byId("idLocationCustPMR");
		var selectedValuesLocation = vLocation.getSelectedValues();

		var vDate = sap.ui.getCore().byId("idDateCustPMR");

		var ILeaseNumbers = "";
		var IUnitDescription = "";
		var ILocation = "";
		var ILocation1 = "";

		for(var i=0;i<selectedValuesLease.length;i++)
			ILeaseNumbers += selectedValuesLease[i] + '$';
    		ILeaseNumbers = ILeaseNumbers.slice(0,-1);

		for(var i=0;i<selectedValuesUD.length;i++)
			IUnitDescription += selectedValuesUD[i].code + '$';
		    IUnitDescription = IUnitDescription.slice(0,-1);

		for(var i=0;i<selectedValuesLocation.length;i++){
			if(i<=12)
				ILocation += selectedValuesLocation[i].description + '$';
			else
				ILocation1 += selectedValuesLocation[i].description + '$';
		}
		    ILocation = ILocation.slice(0,-1);
		    ILocation1 = ILocation1.slice(0,-1);

		    var CurrentDateSend = dateFormat(new Date(), 'yyyymm');//.split("-");

		   // ILeaseNumbers = '130042$130593$160007$160270$160306$160491$160509$160516$160620$160722$160748';
		   // vCustomer =	'92100';
		oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
		var urlToCall = serviceUrl + "/Returns_Schedule?$filter=ILeaseNo eq '" + ILeaseNumbers + "' and IProLocation eq '" + ILocation
								   +"' and IProLocation1 eq '" + ILocation1 + "' and IRdate eq '" + CurrentDateSend
								   + "' and IPartnerNo eq '"+ vCustomer +"' and UnitType eq '" + IUnitDescription + "' and IRet1 eq '' and IRet2 eq ''";

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
		    	var len = data.results.length;
		    	if(len != 0){
		    		busyDialog.close();
		    		jsonPMRReportETE = [];
		    		aPMRReportData = [];
		    		aPMRReportData = data.results;
		    		for(var i =0 ;i < len;i++){
		    			data.results[i].LeaseNo = data.results[i].LeaseNo.replace(/^0+/, '');
		    			data.results[i].PmrCount = parseInt(data.results[i].PmrCount.trim());
		    			data.results[i].TrqCount = parseInt(data.results[i].TrqCount.trim());

		    			jsonPMRReportETE.push({
		    				"Lease Number":data.results[i].LeaseNo,
		    				"Location":data.results[i].Location,
		    				"Unit Description":data.results[i].UnitDesc,
		    				"Category Description":data.results[i].CategoryId,
		    				"PMR Count":data.results[i].PmrCount,
		    				"TRQ count":data.results[i].TrqCount,
		    				"Returned":data.results[i].Returned,
		    				"Authorised but Not Returned":data.results[i].Authorised,
		    				"Remaining":data.results[i].Remaining
		    			});
		    		}
		    		var vResultTbl = sap.ui.getCore().byId("idReportCustPMRTbl");
		    		var oModelPMRReport = new sap.ui.model.json.JSONModel();
		    		oModelPMRReport.setData({modelData:aPMRReportData});
					vResultTbl.setModel(oModelPMRReport);
					vResultTbl.bindRows("/modelData");

					if (len < 25){
			    		vResultTbl.setVisibleRowCount(len);
			    		vResultTbl.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
			    		 sap.ui.getCore().byId("idBtnViewAllCustPMR").setVisible(false);
			    	}
			    	else{
			    		vResultTbl.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
			    		vResultTbl.setVisibleRowCount(25);
			    		 sap.ui.getCore().byId("idBtnViewAllCustPMR").setVisible(true);
			    	}

		    	}
		    	else{
		    		if(sap.ui.getCore().byId("idPMRReportTblFlex"))
		    			sap.ui.getCore().byId("idPMRReportTblFE").destroyFields();
		    		var msg = "No Return Schedule data found for the specified search criteria, please contact your local customer services for any queries.";
		    		jQuery.sap.require("sap.ui.commons.MessageBox");
		        	sap.ui.commons.MessageBox.show(msg,
		        	sap.ui.commons.MessageBox.Icon.WARNING,
		        	"Warning",
		        	[sap.ui.commons.MessageBox.Action.OK],
	   			    sap.ui.commons.MessageBox.Action.OK);
		        	busyDialog.close();
		    	}
		    },
		    function(err){
		    	 busyDialog.close();
		    	 errorfromServer(err);
		    	//alert("Error while Reading Result : "+ window.JSON.stringify(err.response));
		    });
	},

	onLeaseNoChangePMR: function(selectedLeaseNos){
		var aUnitDesc= [];
		autoUnitDescCustPMR = [];
		//busyDialog.open();
		if(selectedLeaseNos.trim().length > 0){
			var customerID = sap.ui.getCore().byId("idComboCustomerCustPMR").getSelectedKey();// $("#idComboCustomerCustPMR").val();
			var temp = jQuery.grep(CustomerDataComboCustPMR, function(element, index){
	            return element.CustName == customerID;
	    	});
			oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
			var urlToCall = serviceUrl + "/F4_Cust_Lease_CR?$filter=ICustomerId eq '" + customerID + "' and ILeaseFlag eq '' " + // temp[0].Partner
					"and ILeaseNumber eq '" + selectedLeaseNos + "' and ILeaseType eq '' and IPara1 eq '' and IPara2 eq '' and IPara3 eq ''";
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
			    	var arrUnitType = [];
                    var arrUnitDesc = [];

                     for(var i=0;i<data.results.length;i++){
                            arrUnitType[i] = data.results[i].UnitType;
                            arrUnitDesc[i] = data.results[i].Para1;
                            }

                     arrUnitType = oUtil.unique(arrUnitType);
                     arrUnitDesc = oUtil.unique(arrUnitDesc);

                    for(var j=0;j<arrUnitType.length;j++){
                          autoUnitDescCustPMR.push({
                                 "Unit":arrUnitDesc[j],
                                 "id":arrUnitType[j]
                           });
                    }


			  		   	sap.ui.getCore().byId('idUnitTypeCustPMR').mProperties.suggestValues= autoUnitDescCustPMR;
			  		   	sap.ui.getCore().byId('idUnitTypeCustPMR').mProperties.codePropertyName ='id';
			  		   	sap.ui.getCore().byId('idUnitTypeCustPMR').mProperties.descriptionPropertyName='Unit';
			  		   	sap.ui.getCore().byId('idUnitTypeCustPMR').addholderitem();
			  		  //busyDialog.close();
			    },
			    function(err){
			    	busyDialog.close();
			    	errorfromServer(err);
			    });
		}else{
			autoUnitDescCustPMR = [];
			 sap.ui.getCore().byId('idUnitTypeCustPMR').clearSelectedValues();
		      sap.ui.getCore().byId('idUnitTypeCustPMR').destroyAllItems();
		}
	}
});

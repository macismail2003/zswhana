/*
 *	ClassName -  inventorySearchView 
 *  Developed 
 *   createSearchView : a call to the function to create search form
 *   createSearchForm : to create the search form for inventory overview
 *   fnCallbackMessageBox : the callback message called on the user selection of yes to select large number of records upon search
 *  
*/
sap.ui.model.json.JSONModel.extend("inventorySearchView", {

	createSearchView: function(oController){
		var oSearchForm = this.createSearchForm(oController);
		return oSearchForm;
	},
	
	createSearchForm: function(oController){
		var oGetData = new onLoadDataDepoInvOvrvw();
		jQuery.sap.require("sap.ui.commons.MessageBox");
		jQuery.sap.require("sap.ui.commons.AutoComplete");
		jQuery.sap.require("sap.ui.commons.ListBox");
		jQuery.sap.require("sap.ui.commons.DropdownBox");

		
		  var oSearchFormGLayout = new sap.ui.layout.form.ResponsiveGridLayout("idSearchFormGLayout", {
			  labelSpanL: 3,
	          labelSpanM: 3,
	          labelSpanS: 6,
	          emptySpanL: 0,
	          emptySpanM: 0,
	          emptySpanS: 0,
	          columnsL: 2,
	          columnsM: 2,
	          columnsS: 1,
	          breakpointL: 1100,
			  breakpointM: 600
	  });
		  
		  var labRegion = new sap.ui.commons.Label({text: "Region:",wrapping: true,
			  layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: false})}).addStyleClass("marginTop10");
		  var labCountry = new sap.ui.commons.Label({text: "Country: # ",wrapping: true,
			  layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: false})}).addStyleClass("marginTop10");
		  var labCity = new sap.ui.commons.Label({text: "City: # ", wrapping: true,
			  layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: false})}).addStyleClass("marginTop10");  
		  var labEquipClass = new sap.ui.commons.Label({text: "Equipment Class:",wrapping: true,
			  layoutData: new sap.ui.layout.GridData({span: "L4 M3 S4",linebreak: true, margin: false})}).addStyleClass("marginTop10");
		  var labEquipCategory = new sap.ui.commons.Label({text: "Equipment Category: #",wrapping: true,
			  layoutData: new sap.ui.layout.GridData({span: "L4 M3 S4",linebreak: true, margin: false})}).addStyleClass("marginTop10");
		  var labUnitType = new sap.ui.commons.Label({text: "Unit Type: #",wrapping: true,
			  layoutData: new sap.ui.layout.GridData({span: "L4 M3 S4",linebreak: true, margin: false})}).addStyleClass("marginTop26");
		  
		  var labStar = new sap.ui.commons.Label({text: "* "}).addStyleClass("MandatoryStar");
		  var lblSpaceLegend = new sap.ui.commons.Label( {text: " ",width : '5px'});
		  var labRequired = new sap.ui.commons.Label({text: " Mandatory Field",wrapping: true});
		  var oFlexboxReq = new sap.m.FlexBox({
			 // layoutData: new sap.ui.layout.GridData({span: "L7 M6 S4"}),
              items: [labStar,lblSpaceLegend,labRequired],
              direction: "Row"
		  });
		  var labHash = new sap.ui.commons.Label({text: "# Either of them are required",wrapping: true});
		  
		  var oFlexboxLegend = new sap.m.FlexBox({
			  layoutData: new sap.ui.layout.GridData({span: "L7 M9 S5"}),
              items: [labHash],
              direction: "Column"
		  }).addStyleClass("marginTop10");
		  
		  var oAutoRegion = new control.AutoCompleteValueHolder('idAutoRegion', {
              layoutData: new sap.ui.layout.GridData({span: "L7 M7 S4"}),
              enabled: true,
              placeholder: "Select Region",
              //required: true,
              //itemSelectLimit: 1,
              selectedItem: function (event) {
                     /*var selRegion = event.mParameters.newItem.description;
                     oGetData.onRegionChange(selRegion);*/
            	  var selRegion=''; 
                  for(var i=0;i<event.mParameters.allItems.length;i++)
                	  selRegion += event.mParameters.allItems[i].code +'$';
                  
                  selRegion = selRegion.slice(0,-1);
                  oGetData.onRegionChange(selRegion);
                 },
                 deletedItem: function (event) {
                            var selRegion='';
                            var selectedValues = sap.ui.getCore().byId('idAutoRegion').getSelectedValues();
                            for(var i=0;i<selectedValues.length;i++)
                            	selRegion += selectedValues[i].code +'$';
                            
                            if(selectedValues.length == 0){
                                var oDepoGetData = new onLoadDataDepoInvOvrvw();
                                      // oDepoGetData.GetCountryDIO();		// MAC26092014-
                                		 oDepoGetData.refillFields();		// MAC26092014+	
                             }
                            else{
                            selRegion = selRegion.slice(0,-1);			
                            oGetData.onRegionChange(selRegion);
                            }
                 },
                 beforDeleteItem: function(event){
                	 //this.setConfirmEnabled(true);
                	 //this.setConfirmMessage("This will reset all the data in the dependent Location fields. Do you still want to continue?");
                 },
                 deletedAllItems: function (event) {
                 }
		  });
		  oAutoRegion.addStyleClass("marginTop10");
		
		  var oAutoCountry = new control.AutoCompleteValueHolder('idAutoCountry', {
              layoutData: new sap.ui.layout.GridData({span: "L7 M7 S4"}),
              enabled: false,
              //required: true,
              placeholder: "Select Country",
            //  itemSelectLimit: 20,
              selectedItem: function (event) {
                     var selCountry='',selRegion=''; 
                     for(var i=0;i<event.mParameters.allItems.length;i++)
                            selCountry += event.mParameters.allItems[i].code +'$';
                     
                     var selectedValues = sap.ui.getCore().byId('idAutoRegion').getSelectedValues();
                     for(var i=0;i<selectedValues.length;i++)
                            selRegion += selectedValues[i].code +'$';
                     
                     selRegion = selRegion.slice(0,-1);
                     selCountry = selCountry.slice(0,-1);
                     oGetData.onCountryChangeFinal(selRegion,selCountry);
                 },
                 deletedItem: function (event) {
                	 sap.ui.getCore().byId('idAutoCountry').mProperties.placeholder = 'Select Country';
                	 
                	 var selCountry='',selRegion=''; 
                	 var selectedValuesCountry = sap.ui.getCore().byId('idAutoCountry').getSelectedValues();
                     for(var i=0;i<selectedValuesCountry.length;i++)
                            selCountry += selectedValuesCountry[i].code +'$';
                     
                     var selectedValues = sap.ui.getCore().byId('idAutoRegion').getSelectedValues();
                     for(var i=0;i<selectedValues.length;i++)
                            selRegion += selectedValues[i].code +'$';
                     
                     selRegion = selRegion.slice(0,-1);
                     selCountry = selCountry.slice(0,-1);
                     oGetData.onCountryChangeFinal(selRegion,selCountry);
                 },
                 beforDeleteItem: function(event){
                	 //this.setConfirmEnabled(true);
                	 //this.setConfirmMessage("This will reset all the data in the dependent Location fields. Do you still want to continue?");
                 },
                 deletedAllItems: function (event) {
          }
        });
		  oAutoCountry.addStyleClass("marginTop10");
		  
		  var oAutoCity = new control.AutoCompleteValueHolder('idAutoCity', {
              layoutData: new sap.ui.layout.GridData({span: "L7 M7 S4"}),
              enabled: false,
             // required: true,
              placeholder: "Select City",
              //itemSelectLimit: 20,
      selectedItem: function (event) {
                     sap.ui.getCore().byId('idAutoCity').mProperties.placeholder = 'Select City';
                     sap.ui.getCore().byId('idAutoCountry').mProperties.placeholder = 'Select Country';
                     sap.ui.getCore().byId('idAutoCountry').removeHolderReuqired();
                 },
                 deletedItem: function (event) {
                     sap.ui.getCore().byId('idAutoCity').mProperties.placeholder = 'Select City';
                 },
                 deletedAllItems: function (event) {
          }
        });

		  oAutoCity.addStyleClass("marginTop10");
 
		  var oComboEquipClass = new control.AutoCompleteValueHolder('idComboEquipClass', {
              layoutData: new sap.ui.layout.GridData({span: "L7 M7 S4"}),   // MAC26092014 Changed from 6 6 4 to 7 7 4
              enabled: true,
              placeholder: "Select Equipment Class",
              //required: true,
              //itemSelectLimit: 1,
              selectedItem: function (event) {
            	  var selEqpCla=''; 
                  for(var i=0;i<event.mParameters.allItems.length;i++)
                        selEqpCla += event.mParameters.allItems[i].code +'$';
                  		selEqpCla = selEqpCla.slice(0,-1);
                  		
                  		oGetData.onEqpClaChangeDI(selEqpCla);
                  		var eventRegion = sap.ui.getCore().byId('idComboEquipClass');
                  		if(eventRegion.getSelectedValues == "ALL"){
						eventRegion.mProperties.enabled=false;
                  		}
                  		
                 },
                 deletedItem: function (event) {
                	 var allSelected = '';          		
                	 var selEqpCla=''; 
                	 var selectedValues = sap.ui.getCore().byId('idComboEquipClass').getSelectedValues();
                	 for(var i=0;i<selectedValues.length;i++)
                		 selEqpCla += selectedValues[i].code +'$';
                     if(selectedValues.length == 0){
                    	 	   allSelected = 'X';
                      }
                     else{
                    	 for(var i= 0; i<selectedValues.length; i++){
                    		 if(selectedValues[i].code == 'ALL'){
                    			 allSelected = 'X';
                    		 }
                    	 }
                     }
                     if(allSelected == 'X'){
                    	 oGetData.onEqpClaChangeDIALL();
                     }
                     else{
                     selEqpCla = selEqpCla.slice(0,-1);
                     oGetData.onEqpClaChangeDI(selEqpCla);
                     }
                 },
                 deletedAllItems: function (event) {
                 }
		  });
		  oComboEquipClass.addStyleClass("marginTop10");
		  
		  
		  	var oBtnClrEqpCla = new sap.ui.commons.Image({
		  		layoutData: new sap.ui.layout.GridData({span: "L1 M1 S1"}),
				src : "images/delete.png", // sap.ui.core.URI
				visible : true, // boolean
				//width : "1px", // sap.ui.core.CSSSize
				//height : "1px", // sap.ui.core.CSSSize
				press : function() {
					
					var eventRegion = sap.ui.getCore().byId('idComboEquipClass');	
					//var valueLayout = eventRegion.getSource().getParent();
					eventRegion.mProperties.placeholder = 'Select Equipment Class';
					eventRegion.mProperties.enabled=true;
					eventRegion.clearSelectedValues();
					//var dupLayout = eventRegion.getSource().getParent().getParent().getParent().getAggregation("_layout");
					//dupLayout.removeContent(valueLayout);
                    //sap.ui.getCore().byId('idAutoRegionDI').destroyAllItems();
					  
                    sap.ui.getCore().byId('idComboEquipCat').mProperties.placeholder = 'Select Equipment Category';
                    sap.ui.getCore().byId('idComboEquipCat').mProperties.enabled=true;
                    sap.ui.getCore().byId('idComboEquipCat').clearSelectedValues();
                    //sap.ui.getCore().byId('idAutoCountryDI').destroyAllItems();
                    
                    //RESET CITY
                    sap.ui.getCore().byId('idComboUnitType').mProperties.placeholder = 'Select Unit Type';
                    sap.ui.getCore().byId('idComboUnitType').mProperties.enabled=true;
                    sap.ui.getCore().byId('idComboUnitType').clearSelectedValues();
                    //sap.ui.getCore().byId('idAutoCityDI').destroyAllItems(); 
			}
		  	}).addStyleClass("marginTop30");
		  	
		  	var oComboEquipCat = new control.AutoCompleteValueHolder('idComboEquipCat', {
	              layoutData: new sap.ui.layout.GridData({span: "L7 M7 S4"}),				// MAC26092014 Changed from 6 6 4 to 7 7 4
	              enabled: true,				// Changed from false to true by Seyed Ismail
	              placeholder: "Select Equipment Category",
	              required: false,
	            //  itemSelectLimit: 20,
	              selectedItem: function (event) {
	          			var allSelectedClas = '';
	          			var allSelectedCat = '';
	                     var selEqpCat='',selEqpCla=''; 
	                     for(var i=0;i<event.mParameters.allItems.length;i++){
	                    	 	selEqpCat += event.mParameters.allItems[i].code +'$';
	                    	 	if(event.mParameters.allItems[i].code == 'ALL'){
	                    	 		allSelectedCat = 'X';
	                    	 	}
	                     }
	                     var selectedValues = sap.ui.getCore().byId('idComboEquipClass').getSelectedValues();
	                     for(var i=0;i<selectedValues.length;i++){
	                    	 selEqpCla += selectedValues[i].code +'$';
	                    	 if(selectedValues[i].code == 'ALL'){
	                    		 allSelectedClas = 'X';  
	                     }
	                     }
	                     selEqpCla = selEqpCla.slice(0,-1);
	                     selEqpCat = selEqpCat.slice(0,-1);
	                     
	                     if(allSelectedClas == 'X'){
	                    	 selEqpCla = [];
	                     }
	                     if(allSelectedCat == 'X'){
	                    	 selEqpCat = [];
	                     }
	                     oGetData.onEqpCatChangeDIFinal(selEqpCla,selEqpCat, allSelectedClas, allSelectedCat);
	                 },
	                 deletedItem: function (event) {	
		          			var allSelectedClas = '';
		          			var allSelectedCat = '';
		                     var selEqpCat='',selEqpCla=''; 
		                     var selectedValues = sap.ui.getCore().byId('idComboEquipCat').getSelectedValues();
		                     for(var i=0;i<selectedValues.length;i++){
		                    	 	selEqpCat += selectedValues[i].code +'$';
		                    	 	if(selectedValues[i].code == 'ALL'){
		                    	 		allSelectedCat = 'X';
		                    	 	}
		                     }
		                     selectedValues = sap.ui.getCore().byId('idComboEquipClass').getSelectedValues();
		                     for(var i=0;i<selectedValues.length;i++){
		                    	 selEqpCla += selectedValues[i].code +'$';
		                    	 if(selectedValues[i].code == 'ALL'){
		                    		 allSelectedClas = 'X';  
		                     }
		                     }
		                     selEqpCla = selEqpCla.slice(0,-1);
		                     selEqpCat = selEqpCat.slice(0,-1);
		                     
		                     if(allSelectedClas == 'X'){
		                    	 selEqpCla = [];
		                     }
		                     if(allSelectedCat == 'X'){
		                    	 selEqpCat = [];
		                     }
		                     
		                     oGetData.onEqpCatChangeDIFinal(selEqpCla,selEqpCat, allSelectedClas, allSelectedCat);          		
	                 },
	                 deletedAllItems: function (event) {
	          }
	        });
		  	oComboEquipCat.addStyleClass("marginTop10");
			var oBtnClrEqpCat = new sap.ui.commons.Image({
		  		layoutData: new sap.ui.layout.GridData({span: "L1 M1 S1"}),
				src : "images/delete.png", // sap.ui.core.URI
				visible : true, // boolean
				//width : "1px", // sap.ui.core.CSSSize
				//height : "1px", // sap.ui.core.CSSSize
				press : function() {
					  
                    sap.ui.getCore().byId('idComboEquipCat').mProperties.placeholder = 'Select Equipment Category';
                    sap.ui.getCore().byId('idComboEquipCat').mProperties.enabled=true;
                    sap.ui.getCore().byId('idComboEquipCat').clearSelectedValues();
                    //sap.ui.getCore().byId('idAutoCountryDI').destroyAllItems();
                    
                    //RESET CITY
                    sap.ui.getCore().byId('idComboUnitType').mProperties.placeholder = 'Select Unit Type';
                    sap.ui.getCore().byId('idComboUnitType').mProperties.enabled=true;
                    sap.ui.getCore().byId('idComboUnitType').clearSelectedValues();
                    //sap.ui.getCore().byId('idAutoCityDI').destroyAllItems(); 
			}
		  	}).addStyleClass("marginTop30");
			
			 var oComboUnitType = new control.AutoCompleteValueHolder('idComboUnitType', {
	              layoutData: new sap.ui.layout.GridData({span: "L7 M7 S4"}),				// MAC26092014 Changed from 6 6 4 to 7 7 4
	              enabled: true,				// Changed from false to true by Seyed Ismail
	              placeholder: "Select Unit Type",
	              required: false,
	              //itemSelectLimit: 20,
	      selectedItem: function (event) {
	                     sap.ui.getCore().byId('idComboUnitType').mProperties.placeholder = 'Select Unit Type';
	                     sap.ui.getCore().byId('idComboEquipCat').mProperties.placeholder = 'Select Equipment Category';
	                     sap.ui.getCore().byId('idComboEquipCat').removeHolderReuqired();
	                 },
	                 deletedItem: function (event) {
	                     sap.ui.getCore().byId('idComboUnitType').mProperties.placeholder = 'Select Unit Type';
	                 },
	                 deletedAllItems: function (event) {
	          }
	        });
	
			 oComboUnitType.addStyleClass("marginTop10");
	  
	  	var oBtnClrUnitType = new sap.ui.commons.Image({
	  		layoutData: new sap.ui.layout.GridData({span: "L1 M1 S1"}),
			src : "images/delete.png", // sap.ui.core.URI
			visible : true, // boolean
			//width : "1px", // sap.ui.core.CSSSize
			//height : "1px", // sap.ui.core.CSSSize
			press : function() {
               
               //RESET CITY
               sap.ui.getCore().byId('idComboUnitType').mProperties.placeholder = 'Select Unit Type';
               sap.ui.getCore().byId('idComboUnitType').mProperties.enabled=true;
               sap.ui.getCore().byId('idComboUnitType').clearSelectedValues();
		}
	  	}).addStyleClass("marginTop30");
	  	
		  var oSubmitButton = new sap.m.Button("idBtnSubmit",{
	         text : "Submit",
	         styled:false,
	         width:"80px",
	         // layoutData: new sap.ui.layout.GridData({span: "L4 M4 S4",linebreak: true, margin: true}),
	          press:function(){
	        	  oController.SubmitButtonPressDI();
	          }}).addStyleClass("submitBtn");
			var ResetMessage = "This will reset all the specified inputs. Do you want to continue?";
		  var oResetButton = new sap.m.Button("idBtnReset",{
	        	 text:"Reset",
	        	 styled:false,
	        	 width:"80px",
	        	// layoutData: new sap.ui.layout.GridData({span: "L4 M4 S4"}),
	        	 press:function(){
	        		 sap.ui.commons.MessageBox.show(ResetMessage,
		   	       			  sap.ui.commons.MessageBox.Icon.WARNING,
		   	       				"Warning",
		   	                     [sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO], 
		   	                  new ResetSearchForm().resetSearchForm,
		   	                     sap.ui.commons.MessageBox.Action.YES);
	        	 }
	             }).addStyleClass("submitBtn");
		  var lblSpace = new sap.ui.commons.Label( {text: " ",width : '8px'});
	    	
          var oFlexboxButtons = new sap.m.FlexBox({
    	      items: [
    	        oSubmitButton,lblSpace,
    	        oResetButton
    	      ],
    	      direction: "Row",
    	    }).addStyleClass("margin10");
          
          var oFlexboxBtnNLegend = new sap.m.FlexBox({
    	      items: [
    	        oFlexboxButtons,
    	        oFlexboxLegend
    	      ],
    	      direction: "Column",
    	    }).addStyleClass("margin10");
          
		  var oSearchForm = new sap.ui.layout.form.Form("idSearchForm",{
				layout: oSearchFormGLayout,
				formContainers: [
					new sap.ui.layout.form.FormContainer("idSearchFormC1",{
						title: "Select Location",
						formElements: [
							new sap.ui.layout.form.FormElement({
								fields: [labRegion,oAutoRegion],
							}),
							new sap.ui.layout.form.FormElement({
								fields: [labCountry,oAutoCountry
								]
							}),
							new sap.ui.layout.form.FormElement({
								fields: [labCity,oAutoCity],
							}),
							]
					}),
					new sap.ui.layout.form.FormContainer("idSearchFormC2",{
						title: "Select Unit Type",
						formElements: [
							new sap.ui.layout.form.FormElement({
								fields: [labEquipClass,oComboEquipClass]
							}),
							new sap.ui.layout.form.FormElement({
								fields: [labEquipCategory,oComboEquipCat]
							}),
							new sap.ui.layout.form.FormElement({
								fields: [labUnitType,oComboUnitType]
							}),
							]
					}),
					/*new sap.ui.layout.form.FormContainer("idSearchFormC3",{
						formElements: [
							new sap.ui.layout.form.FormElement({
								fields: []
							})
							]
					}),*/
					new sap.ui.layout.form.FormContainer("idSearchFormC4",{
						formElements: [
							new sap.ui.layout.form.FormElement({
								fields: [oFlexboxBtnNLegend
								],
								layoutData: new sap.ui.layout.GridData({span: "L7 M6 S4",linebreak: true, margin: false})
							}),
							
							]
					}),
					new sap.ui.layout.form.FormContainer("idSearchFormC5",{
						formElements: [
							new sap.ui.layout.form.FormElement({
								fields: [],
								layoutData: new sap.ui.layout.GridData({span: "L7 M6 S4",linebreak: true, margin: false})
							}), 
							]
					}),
					] 
		  }); //search form
		  
		  var vHDivider = new sap.ui.commons.HorizontalDivider({width: "95%", type: "Area", height: "Medium"});
		 
		  var oSearchResulLayout = new sap.ui.layout.form.ResponsiveLayout("idSearchResultLayout");
		  var oSearchResultForm = new sap.ui.layout.form.Form("idSearchResultForm",{
	            layout: oSearchResulLayout,
	            formContainers: [
	                    new sap.ui.layout.form.FormContainer("idSearchResultFormC1",{
	                        formElements: [
	                                new sap.ui.layout.form.FormElement("searchResultsInvHeaderLine1",{
	                                    fields: [],
	                                    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
	                                }),
	                                new sap.ui.layout.form.FormElement("searchResultsInvHeaderLine2",{
	                                    fields: [],
	                                    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
	                                }),
	                                new sap.ui.layout.form.FormElement("searchResultsInvHeaderexport",{
	                                    fields: [],
	                                    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
	                                }),
	                                new sap.ui.layout.form.FormElement("searchResultsInvTable",{
	                                    fields: [],
	                                    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
	                                }),
	                                new sap.ui.layout.form.FormElement("searchResultsInvBtn",{
	                                    fields: [],
	                                    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
	                                }),
	                                new sap.ui.layout.form.FormElement("searchResultsInvDiscl",{
	                                    fields: [],
	                                    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
	                                })
	                       ],layoutData: new sap.ui.commons.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false}) 
	                    }),
	            ]
	    });
		
		
		  var oFlexboxInvResults = new sap.m.FlexBox({
              items: [
              //  oAutoCountry,
                oSearchForm,vHDivider,
                oSearchResultForm        
              ],
              direction: "Column"
            });

    return oFlexboxInvResults;
	},
	
	createNBindData: function(){
		var oSearchResultView = new inventorySearchResultView();
		oSearchResultView.getSearchResult();
	}
});


function fnCallbackMessageBox(sResult) {
	//var oCurrent =this;
	//alert("sResult" + sResult);
	if(sResult == "YES"){
		 busyDialog.open();
		 var oSearchView = new inventorySearchView();
			oSearchView.createNBindData();
		 //oCurrent.createNBindData();
		
		/*if(!sap.ui.getCore().byId("idInvSearchResult")){
			oSearchResultView.showSearchTable();
			var vResultHeaderLine1 = sap.ui.getCore().byId("idFlexBoxInvDetResultHeaderLine1");
			var vResultHeaderLine2 = sap.ui.getCore().byId("idFlexBoxInvDetResultHeaderLine2");
			var vResultTable = sap.ui.getCore().byId("idInvSearchResult");
			var vViewAllBtn = sap.ui.getCore().byId("idFlexBoxBtnViewlAllInvSearch");
			var vDiscl = sap.ui.getCore().byId("idFlexBoxInvResultDisclaimer");
			
			var oSearchResultFormElement = sap.ui.getCore().byId("searchResultsInvHeaderLine1"); // release Results is ID of Form Element
		    oSearchResultFormElement.insertField(vResultHeaderLine1,0);
		    var oSearchResultFormElement = sap.ui.getCore().byId("searchResultsInvHeaderLine2"); // release Results is ID of Form Element
		    oSearchResultFormElement.insertField(vResultHeaderLine2,0);
		    var oSearchResultFormElement = sap.ui.getCore().byId("searchResultsInvTable"); // release Results is ID of Form Element
		    oSearchResultFormElement.insertField(vResultTable,0);
		    var oSearchResultFormElement = sap.ui.getCore().byId("searchResultsInvBtn"); // release Results is ID of Form Element
		    oSearchResultFormElement.insertField(vViewAllBtn,0);
		    var oSearchResultFormElement = sap.ui.getCore().byId("searchResultsInvDiscl"); // release Results is ID of Form Element
		    oSearchResultFormElement.insertField(vDiscl,0);
		    sap.ui.getCore().byId("idBtnViewAllInvDetail").setVisible(true);
		}*/
		
	}
	
}


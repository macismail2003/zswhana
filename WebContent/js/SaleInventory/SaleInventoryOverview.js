
var SaleInvResult = {
		SIHeaderVal:[],
		SIDetVal:[]
};
var SaleInAllData = [];
var selCitySI = "";
var upToCountSI = "";
var helpIdCityDetailsSI = "";
var customeSaleInvResult = [];
var jsonSaleInvOvrvwExportToExcel = [];
var jsonSaleInvCityDetExportToExcel = [];
sap.ui.model.json.JSONModel.extend("saleInvOverviewView", {
	
	createSaleInvOverview: function(oController){
		var oGetData = new onLoadDataSaleInvOvrvw();
		
		 $('#idHdrContnt').html("Sale Inventory Overview");
		// Labels
		var oLabelRegion = new sap.ui.commons.Label({text: "Region:",wrapping: true,
		  layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: false})}).addStyleClass("marginTop15");
		var oLabelCountry = new sap.ui.commons.Label({text: "Country: #",wrapping: true,
		  layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: false})}).addStyleClass("marginTop15");
		var oLabelCity = new sap.ui.commons.Label({text: "City: #",  wrapping: true,
		  layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: false})}).addStyleClass("marginTop15");  
		var oLabelEquipClass = new sap.ui.commons.Label({text: "Equipment Class:",required:true,wrapping: true,
		  layoutData: new sap.ui.layout.GridData({span: "L4 M3 S4",linebreak: true, margin: false})}).addStyleClass("marginTop15");
		var oLabelEquipCat = new sap.ui.commons.Label({text: "Equipment Category:",required:true,wrapping: true,
		  layoutData: new sap.ui.layout.GridData({span: "L4 M3 S4",linebreak: true, margin: false})}).addStyleClass("marginTop15");
		var oLabelUnitType = new sap.ui.commons.Label({text: "Unit Type:",required:true,wrapping: true,
		  layoutData: new sap.ui.layout.GridData({span: "L4 M3 S4",linebreak: true, margin: false})}).addStyleClass("marginTop15");
		var oLabelSaleGrade = new sap.ui.commons.Label({text: "Sale Grade:",wrapping: true,required:true,
			layoutData: new sap.ui.layout.GridData({span: "L1 M2 S4",linebreak: true, margin: false})}).addStyleClass("marginTop15");
		var oLabelAge = new sap.ui.commons.Label({text: "Age:",wrapping: true,required:true,
			layoutData: new sap.ui.layout.GridData({span: "L1 M2 S1",linebreak: true, margin: false})}).addStyleClass("marginTop30");
		var oLabelAge1 = new sap.ui.commons.Label({text: " ",wrapping: true,width:"10px",
			layoutData: new sap.ui.layout.GridData({span: "L1 M2 S1",linebreak: true, margin: false})}).addStyleClass("marginTop10");
		
		 var labStar = new sap.ui.commons.Label({text: "* "}).addStyleClass("MandatoryStar");
		  var lblSpaceLegend = new sap.ui.commons.Label( {text: " ",width : '5px'});
		  var lblCharFormTitle = new sap.ui.commons.Label( {text: "Select Characteristics",wrapping: true}).addStyleClass("sapUiForm sapUiFormTitle marginTop30");
		  var labRequired = new sap.ui.commons.Label({text: " Mandatory Field",wrapping: true});
		  var oFlexboxReq = new sap.m.FlexBox({
			 // layoutData: new sap.ui.layout.GridData({span: "L7 M6 S4"}),
             items: [labStar,lblSpaceLegend,labRequired],
             direction: "Row"
		  });
		  var labHash = new sap.ui.commons.Label({text: "# Country or/and City required",wrapping: true});
		  
		  var oFlexboxLegend = new sap.m.FlexBox({
			  layoutData: new sap.ui.layout.GridData({span: "L7 M9 S5"}),
             items: [oFlexboxReq],
             direction: "Column"
		  }).addStyleClass("marginTop10");
		 
		 /* var oComboRegion = new sap.ui.core.HTML("RegionHTMLSI",{layoutData: new sap.ui.layout.GridData({span: "L7 M7 S4"})});
		  var htmlContentRegionSI = '<input id="idAutoRegionSI" focus placeholder="Select Region" class="FormInputStyle marginTop10" style="width:100%">';
		  oComboRegion.setContent(htmlContentRegionSI);
		  
		  var oInputCountry =  new sap.ui.core.HTML("countryHTMLSI",{layoutData: new sap.ui.layout.GridData({span: "L7 M7 S4"})});
		  var htmlContentCountrySI = '<input id="idAutoCountrySI" disabled placeholder="Select Country" class="FormInputStyle marginTop10" style="width:100%">';
		  oInputCountry.setContent(htmlContentCountrySI);
		  
		  var oInputCity =  new sap.ui.core.HTML("cityHTMLSI",{layoutData: new sap.ui.layout.GridData({span: "L7 M7 S4"})});
		  var htmlContentCitySI = '<input id="idAutoCitySI" disabled placeholder="Select City" class="FormInputStyle marginTop10" style="width:100%">';
		  oInputCity.setContent(htmlContentCitySI);*/
		  
		  var oComboRegion = new control.AutoCompleteValueHolder('idAutoRegionSI', {
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
                	  selRegion += event.mParameters.allItems[i].description +'$';
                  
                  selRegion = selRegion.slice(0,-1);
                  oGetData.onRegionChange(selRegion);
                 },
                 deletedItem: function (event) {
                            /*sap.ui.getCore().byId('idAutoRegionSI').mProperties.placeholder = 'Select Region';
                            sap.ui.getCore().byId('idAutoCountrySI').mProperties.placeholder = 'Select Country';
                            sap.ui.getCore().byId('idAutoCountrySI').mProperties.enabled=false;
                            sap.ui.getCore().byId('idAutoCountrySI').destroyAllItems();
                            
                            //RESET CITY
                            sap.ui.getCore().byId('idAutoCitySI').mProperties.placeholder = 'Select City';
                            sap.ui.getCore().byId('idAutoCitySI').mProperties.enabled=false;
                            sap.ui.getCore().byId('idAutoCitySI').destroyAllItems();*/
                            
                            var selRegion='';
                            var selectedValues = sap.ui.getCore().byId('idAutoRegionSI').getSelectedValues();
                            for(var i=0;i<selectedValues.length;i++)
                            	selRegion += selectedValues[0].description +'$';
                            
                            if(selectedValues.length == 0){
                                var oSaleGetData = new onLoadDataSaleInvOvrvw();
                                      oSaleGetData.GetCountrySIO();
                             }
                            
                            selRegion = selRegion.slice(0,-1);
                            oGetData.onRegionChange(selRegion);
                 },
                 beforDeleteItem: function(event){
                	 this.setConfirmEnabled(true);
                	 this.setConfirmMessage("This will reset all the data in the dependent Location fields. Do you still want to continue?");
                 },
                 deletedAllItems: function (event) {
                 }
		  });
		  oComboRegion.addStyleClass("marginTop10");
		  
		  var oInputCountry = new control.AutoCompleteValueHolder('idAutoCountrySI', {
              layoutData: new sap.ui.layout.GridData({span: "L7 M7 S4"}),
              enabled: false,
              //required: true,
              placeholder: "Select Country",
            //  itemSelectLimit: 20,
              selectedItem: function (event) {
                     var selCountry='',selRegion=''; 
                     for(var i=0;i<event.mParameters.allItems.length;i++)
                            selCountry += event.mParameters.allItems[i].description +'$';
                     
                     var selectedValues = sap.ui.getCore().byId('idAutoRegionSI').getSelectedValues();
                     for(var i=0;i<selectedValues.length;i++)
                            selRegion += selectedValues[i].description +'$';
                     
                     selRegion = selRegion.slice(0,-1);
                     selCountry = selCountry.slice(0,-1);
                     oGetData.onCountryChange(selRegion,selCountry);
                 },
                 deletedItem: function (event) {
                            /*sap.ui.getCore().byId('idAutoCountry').mProperties.placeholder = 'Select Country';
                            sap.ui.getCore().byId('idAutoCity').mProperties.placeholder = 'Select City';
                            sap.ui.getCore().byId('idAutoCity').mProperties.enabled=false;
                            sap.ui.getCore().byId('idAutoCity').destroyAllItems();*/
                	 sap.ui.getCore().byId('idAutoCountrySI').mProperties.placeholder = 'Select Country';
                	 
                	 var selCountry='',selRegion=''; 
                	 var selectedValuesCountry = sap.ui.getCore().byId('idAutoCountrySI').getSelectedValues();
                     for(var i=0;i<selectedValuesCountry.length;i++)
                            selCountry += selectedValuesCountry[i].description +'$';
                     
                     var selectedValues = sap.ui.getCore().byId('idAutoRegionSI').getSelectedValues();
                     for(var i=0;i<selectedValues.length;i++)
                            selRegion += selectedValues[i].description +'$';
                     
                     selRegion = selRegion.slice(0,-1);
                     selCountry = selCountry.slice(0,-1);
                     oGetData.onCountryChange(selRegion,selCountry);
                 },
                 beforDeleteItem: function(event){
                	 this.setConfirmEnabled(true);
                	 this.setConfirmMessage("This will reset all the data in the dependent Location fields. Do you still want to continue?");
                 },
                 deletedAllItems: function (event) {
          }
        });
		  oInputCountry.addStyleClass("marginTop10");

		 var oInputCity = new control.AutoCompleteValueHolder('idAutoCitySI', {
		              layoutData: new sap.ui.layout.GridData({span: "L7 M7 S4"}),
		              enabled: false,
		             // required: true,
		              placeholder: "Select City",
		              //itemSelectLimit: 20,
		      selectedItem: function (event) {
		                     sap.ui.getCore().byId('idAutoCitySI').mProperties.placeholder = 'Select City';
		                     sap.ui.getCore().byId('idAutoCountrySI').mProperties.placeholder = 'Select Country';
		                     sap.ui.getCore().byId('idAutoCountrySI').removeHolderReuqired();
		                 },
		                 deletedItem: function (event) {
		                     sap.ui.getCore().byId('idAutoCitySI').mProperties.placeholder = 'Select City';
		                 },
		                 deletedAllItems: function (event) {
		          }
		        });
		
		 oInputCity.addStyleClass("marginTop10");
		  
		  var oComboEquipClass = new sap.ui.commons.DropdownBox("idComboEquipClassSI", {
			  layoutData: new sap.ui.layout.GridData({span: "L7 M7 S4"}),
			  change:function(){
				  this.setValueState(sap.ui.core.ValueState.None);
				  this.setPlaceholder("Select Equipment Class");
				  var oSaleGetData = new onLoadDataSaleInvOvrvw();
				  oSaleGetData.onEquipClassChangeSI();
			  },
			  items: {
	                path: "/",
	                template: new sap.ui.core.ListItem({text: "{EqpClass}"})
			  },
	          displaySecondaryValues:false, 
	          placeholder:"Select Equipment Class"
	        }).addStyleClass("FormInputStyle marginTop10 DepotInput38px");  //, "association:listBox" : oListEquipClass
		  
		  var oComboEquipCat = new sap.ui.commons.DropdownBox("idComboEquipCatSI", {
		      layoutData: new sap.ui.layout.GridData({span: "L7 M7 S4"}),
		      change:function(){
		    	  this.setValueState(sap.ui.core.ValueState.None);
		    	  this.setPlaceholder("Select Equipment Category");
		    	  var oSaleGetData = new onLoadDataSaleInvOvrvw();
		    	  oSaleGetData.onEquipCatChangeSI();
				  },
		      items: {
		              path: "/",
		              template: new sap.ui.core.ListItem({text: "{EqpCat}"})
				  },
		      displaySecondaryValues:false, placeholder:"Select Equipment Category"}).addStyleClass("FormInputStyle marginTop10 DepotInput38px"); //, "association:listBox" : oListEquipCat
		  
		  var oComboUnitType = new sap.ui.commons.DropdownBox("idComboUnitTypeSI", {
		      layoutData: new sap.ui.layout.GridData({span: "L7 M7 S4"}),
		      change:function(){
		    	  this.setValueState(sap.ui.core.ValueState.None);
		    	  this.setPlaceholder("Select Unit Type");
				  },
		      items: {
	              path: "/",
	              template: new sap.ui.core.ListItem({text: "{UnitType}"})
			  },
			  displaySecondaryValues:false, placeholder:"Select Unit Type"}).addStyleClass("FormInputStyle marginTop10 DepotInput38px"); //, "association:listBox" : oListUnitType
		  
	 // Check Box Sale Grade
	   	var oCBSaleGrade1 = new sap.ui.commons.CheckBox("idSG1",{
	        text : 'Sale Grade 1',
	        name:'1',
	        change:function(){
	        		if(this.getChecked())
	        		sap.ui.getCore().byId("idSGAll").setChecked(false);
	        },
	        layoutData: new sap.ui.layout.GridData({span: "L2 M2 S4",linebreak: false, margin: false}),
	        }).addStyleClass("marginRightChkBox");
	   	
	   	var oCBSaleGrade2 = new sap.ui.commons.CheckBox("idSG2",{
	        text : 'Sale Grade 2',
	        name:'2',
	        change:function(){
        		if(this.getChecked())
        		sap.ui.getCore().byId("idSGAll").setChecked(false);
	        },
	        layoutData: new sap.ui.layout.GridData({span: "L2 M2 S4",linebreak: false, margin: false}),
	        }).addStyleClass("marginRightChkBox");
	   	
	   	var oCBSaleGrade3 = new sap.ui.commons.CheckBox("idSG3",{
	        text : 'Sale Grade 3',
	        name:'3',
	        change:function(){
        		if(this.getChecked())
        		sap.ui.getCore().byId("idSGAll").setChecked(false);
	        },
	        layoutData: new sap.ui.layout.GridData({span: "L2 M2 S4",linebreak: false, margin: false}),
	        }).addStyleClass("marginRightChkBox");
	   	
	   	var oCBAll = new sap.ui.commons.CheckBox("idSGAll",{
	        text : 'All',
	        name:'ALL',
	        checked : true,
	        change:function(){
        		if(this.getChecked()){
        			sap.ui.getCore().byId("idSG1").setChecked(false);
        			sap.ui.getCore().byId("idSG2").setChecked(false);
        			sap.ui.getCore().byId("idSG3").setChecked(false);
        		}
	        },
	        layoutData: new sap.ui.layout.GridData({span: "L2 M2 S4",linebreak: false, margin: false}),
	        }).addStyleClass("marginRightChkBox");
	   	
	   	var oFlexBoxSaleGrade = new sap.m.FlexBox({
	  		  items: [oCBSaleGrade1, oCBSaleGrade2, oCBSaleGrade3, oCBAll],
	  		       layoutData: new sap.ui.layout.GridData({span: "L11 M10 S12",linebreak: false, margin: false}),
	  		          direction:"Row"
    }).addStyleClass("marginTop10"); 
	   	
	 // Check Box Age
	   	var oCBAge1 = new sap.ui.commons.CheckBox("idLT5",{
	        text : '< 5 Years',
	        name:'LT5',
	        change:function(){
        		if(this.getChecked())
        		sap.ui.getCore().byId("idAgeAll").setChecked(false);
	        },
	        layoutData: new sap.ui.layout.GridData({span: "L1 M2 S1",linebreak: false, margin: true}),
	        }).addStyleClass("marginRightChkBox");
	   	
	   	var oCBAge2 = new sap.ui.commons.CheckBox("idEQ12",{
	        text : '12 Years',
	        name:'EQ12',
	        change:function(){
        		if(this.getChecked())
        		sap.ui.getCore().byId("idAgeAll").setChecked(false);
	        },
	        layoutData: new sap.ui.layout.GridData({span: "L1 M2 S1",linebreak: false, margin: true}),
	        }).addStyleClass("marginRightChkBox");
	   	
	   	var oCBAge3 = new sap.ui.commons.CheckBox("id5TO7",{
	        text : '5-7 Years',
	        name:'5TO7',
	        change:function(){
        		if(this.getChecked())
        		sap.ui.getCore().byId("idAgeAll").setChecked(false);
	        },
	        layoutData: new sap.ui.layout.GridData({span: "L1 M2 S1",linebreak: false, margin: false}),
	        }).addStyleClass("marginRightChkBox");
	   	
	   	var oCBAge4 = new sap.ui.commons.CheckBox("idEQ13",{
	        text : '13 Years',
	        name:'EQ13',
	        change:function(){
        		if(this.getChecked())
        		sap.ui.getCore().byId("idAgeAll").setChecked(false);
	        },
	        layoutData: new sap.ui.layout.GridData({span: "L1 M2 S1",linebreak: false, margin: false}),
	        }).addStyleClass("marginRightChkBox");
	   	
	   	var oCBAge5 = new sap.ui.commons.CheckBox("idEQ8",{
	        text : '8 Years',
	        name:'EQ8',
	        change:function(){
        		if(this.getChecked())
        		sap.ui.getCore().byId("idAgeAll").setChecked(false);
	        },
	        layoutData: new sap.ui.layout.GridData({span: "L1 M2 S1",linebreak: false, margin: false}),
	        }).addStyleClass("marginRightChkBox");
	   	
	   	var oCBAge6 = new sap.ui.commons.CheckBox("idEQ14",{
	        text : '14 Years',
	        name:'EQ14',
	        change:function(){
        		if(this.getChecked())
        		sap.ui.getCore().byId("idAgeAll").setChecked(false);
	        },
	        layoutData: new sap.ui.layout.GridData({span: "L1 M2 S1",linebreak: false, margin: false}),
	        }).addStyleClass("marginRightChkBox");
	   	
	   	var oCBAge7 = new sap.ui.commons.CheckBox("idEQ9",{
	        text : '9 Years',
	        name:'EQ9',
	        change:function(){
        		if(this.getChecked())
        		sap.ui.getCore().byId("idAgeAll").setChecked(false);
	        },
	        layoutData: new sap.ui.layout.GridData({span: "L1 M2 S1",linebreak: false, margin: false}),
	        }).addStyleClass("marginRightChkBox");
	   	
	   	var oCBAge8 = new sap.ui.commons.CheckBox("idEQ15",{
	        text : '15 Years',
	        name:'EQ15',
	        change:function(){
        		if(this.getChecked())
        		sap.ui.getCore().byId("idAgeAll").setChecked(false);
	        },
	        layoutData: new sap.ui.layout.GridData({span: "L1 M2 S1",linebreak: false, margin: false}),
	        }).addStyleClass("marginRightChkBox");
	   	
	   	var oCBAge9 = new sap.ui.commons.CheckBox("idEQ10",{
	        text : '10 Years',
	        name:'EQ10',
	        change:function(){
        		if(this.getChecked())
        		sap.ui.getCore().byId("idAgeAll").setChecked(false);
	        },
	        layoutData: new sap.ui.layout.GridData({span: "L1 M2 S1",linebreak: false, margin: false}),
	        }).addStyleClass("marginRightChkBox");
	   	
	   	var oCBAge10 = new sap.ui.commons.CheckBox("idMT15",{
	        text : '> 15 Years',
	        name:'MT15',
	        change:function(){
        		if(this.getChecked())
        		sap.ui.getCore().byId("idAgeAll").setChecked(false);
	        },
	        layoutData: new sap.ui.layout.GridData({span: "L1 M2 S1",linebreak: false, margin: false}),
	       	}).addStyleClass("marginRightChkBox");
	   	
	   	var oCBAge11 = new sap.ui.commons.CheckBox("idEQ11",{
	        text : '11 Years',
	        name:'EQ11',
	        change:function(){
        		if(this.getChecked())
        		sap.ui.getCore().byId("idAgeAll").setChecked(false);
	        },
	        layoutData: new sap.ui.layout.GridData({span: "L1 M2 S1",linebreak: false, margin: false}),
	        }).addStyleClass("marginRightChkBox");
	   	
	   	var oCBAge12 = new sap.ui.commons.CheckBox("idAgeAll",{
	        text : 'All',
	        name:'ALL',
	        checked : true,
	        change:function(){
        		if(this.getChecked()){
        			sap.ui.getCore().byId("idLT5").setChecked(false);
        			sap.ui.getCore().byId("idEQ12").setChecked(false);
        			sap.ui.getCore().byId("id5TO7").setChecked(false);
        			sap.ui.getCore().byId("idEQ13").setChecked(false);
        			sap.ui.getCore().byId("idEQ8").setChecked(false);
        			sap.ui.getCore().byId("idEQ14").setChecked(false);
        			sap.ui.getCore().byId("idEQ9").setChecked(false);
        			sap.ui.getCore().byId("idEQ15").setChecked(false);
        			sap.ui.getCore().byId("idEQ10").setChecked(false);
        			sap.ui.getCore().byId("idEQ11").setChecked(false);
        			sap.ui.getCore().byId("idMT15").setChecked(false);
        		}
	        },
	        layoutData: new sap.ui.layout.GridData({span: "L1 M2 S1",linebreak: false, margin: false}),
	        }).addStyleClass("marginRightChkBox");
	    
	    
	 // Flex Box       
        var oFlexBoxAge1 = new sap.m.FlexBox({
	  		  items: [
	  		          oCBAge1,
	  		          oCBAge2
	     		  ],
	     		  direction: "Column",
	     		  width:"100%"
	     		}).addStyleClass("margin10"); 
        
        var oFlexBoxAge2 = new sap.m.FlexBox({
	  		  items: [
	  		          oCBAge3,
	  		          oCBAge4
	     		  ],
	     		  direction: "Column",
	     		  width:"100%"
	     		}).addStyleClass("margin10");
        
        var oFlexBoxAge3 = new sap.m.FlexBox({
	  		  items: [
	  		          oCBAge5,
	  		          oCBAge6
	     		  ],
	     		  direction: "Column",
	     		  width:"100%"
	     		}).addStyleClass("margin10");
        
        var oFlexBoxAge4 = new sap.m.FlexBox({
	  		  items: [
	  		          oCBAge7,
	  		          oCBAge8
	     		  ],
	     		  direction: "Column",
	     		  width:"100%"
	     		}).addStyleClass("margin10");
        
        var oFlexBoxAge5 = new sap.m.FlexBox({
	  		  items: [
	  		          oCBAge9,
	  		          oCBAge10
	     		  ],
	     		  direction: "Column",
	     		  width:"100%"
	     		}).addStyleClass("margin10");
        
        var oFlexBoxAge6 = new sap.m.FlexBox({
	  		  items: [
	  		          oCBAge11,
	  		          oCBAge12
	     		  ],
	     		  direction: "Column",
	     		  width:"100%"
	     		}).addStyleClass("margin10");
        var oFlexBoxAgeRow1 = new sap.m.FlexBox({
	  		  items: [oCBAge1, oCBAge3, oCBAge5, oCBAge7, oCBAge9, oCBAge11
	  		         ],
	  		       layoutData: new sap.ui.layout.GridData({span: "L11 M10 S12",linebreak: false, margin: false}),
	  		          direction:"Row"
        }).addStyleClass("marginTop30"); 
        var oFlexBoxAgeRow2 = new sap.m.FlexBox({
	  		  items: [
	  		           oCBAge2, oCBAge4, oCBAge6, oCBAge8, oCBAge10, oCBAge12],
	  		          direction:"Row",
	  		        layoutData: new sap.ui.layout.GridData({span: "L11 M10 S12",linebreak: false, margin: false}),
      }).addStyleClass("marginTop10"); 
        
        var oFlexBoxAgeAll = new sap.m.FlexBox({
	  		  items: [
	  		          oFlexBoxAge1,
	  		          oFlexBoxAge2,
	  		          oFlexBoxAge3,
	  		          oFlexBoxAge4,
	  		          oFlexBoxAge5,
	  		          oFlexBoxAge6
	     		  ],
	     		  direction: "Row",
	     		  width:"100%"
	     		}).addStyleClass("margin10"); 
	   	
	   	var ResetMessage = "This will reset all the specified inputs. Do you want to continue?";
	   	
	    var oBtnSaleInvOvrSubmit = new sap.m.Button("idBtnSaleInvOvrSubmit",{
	         text : "Submit",
	         styled:false,
	         width:"80px",
	         // layoutData: new sap.ui.layout.GridData({span: "L4 M4 S4",linebreak: true, margin: true}),
	          press:function(){
	        	  //showSaleInventory();
	        	  oController.SubmitButtonPressSI();
	          }}).addStyleClass("submitBtn");
		  
		  var oBtnSaleInvOvrReset = new sap.m.Button("idBtnSaleInvOvrReset",{
	        	 text:"Reset",
	        	 styled:false,
	        	 width:"80px",
	        	// layoutData: new sap.ui.layout.GridData({span: "L4 M4 S4"}),
	        	 press:function(){
	        		 var oSIUtil = new ValidationsForSI();
	        		 sap.ui.commons.MessageBox.show(ResetMessage,
	   	       			  sap.ui.commons.MessageBox.Icon.WARNING,
	   	       				"Warning",
	   	                     [sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO], 
	   	                  oSIUtil.ResetSaleInvForm,
	   	                     sap.ui.commons.MessageBox.Action.YES);
	        	 }
	             }).addStyleClass("submitBtn");
		  var lblSpace = new sap.ui.commons.Label( {text: " ",width : '8px'});
	    	
         var oFlexBoxButtons = new sap.m.FlexBox({
   	      items: [
   	        oBtnSaleInvOvrSubmit,lblSpace,
   	        oBtnSaleInvOvrReset
   	      ],
   	      direction: "Row",
   	    }).addStyleClass("margin10");
         
         var labStar = new sap.ui.commons.Label({text: "* "}).addStyleClass("MandatoryStar");
		  var lblSpaceLegend = new sap.ui.commons.Label( {text: " ",width : '5px'});
		  var labRequired = new sap.ui.commons.Label({text: " Mandatory Field",wrapping: true});
		  var oFlexboxReq = new sap.m.FlexBox({
			 // layoutData: new sap.ui.layout.GridData({span: "L7 M6 S4"}),
             items: [labStar,lblSpaceLegend,labRequired],
             direction: "Row"
		  });
		  var labHash = new sap.ui.commons.Label({text: "# Country or/and City required",wrapping: true});
		  
		  var oFlexboxLegend = new sap.m.FlexBox({
			  layoutData: new sap.ui.layout.GridData({span: "L7 M9 S5"}),
             items: [oFlexboxReq,labHash],
             direction: "Column"
		  }).addStyleClass("marginTop10");
		  
	  // Responsive Grid Layout
		    var oSaleInvOverviewLayout = new sap.ui.layout.form.ResponsiveGridLayout("idSaleInvOverviewLayout",{
		    	/* labelSpanL: 3,
		          labelSpanM: 3,
		          labelSpanS: 6,
		          emptySpanL: 0,
		          emptySpanM: 0,
		          emptySpanS: 0,
		          columnsL: 2,
		          columnsM: 2,
		          columnsS: 1,
		          breakpointL: 1100,
				  breakpointM: 600*/
		    });
		    var oSaleInvOverviewLayoutChar = new sap.ui.layout.form.ResponsiveGridLayout("idSaleInvOverviewLayoutChar",{
		    	 labelSpanL: 3,
		          labelSpanM: 3,
		          labelSpanS: 6,
		          emptySpanL: 0,
		          emptySpanM: 0,
		          emptySpanS: 0,
		          columnsL: 1,
		          columnsM: 1,
		          columnsS: 1,
		          breakpointL: 1100,
				  breakpointM: 600
		    });
		    
	  // Online Form Starts
	     var oSaleInvOverviewForm = new sap.ui.layout.form.Form("idSaleInvOverviewForm",{
	             layout: oSaleInvOverviewLayout,
	             formContainers: [
	                     new sap.ui.layout.form.FormContainer("idSaleInvOverviewFormC1",{
	                             title: "Select Location",
	                             formElements: [
												new sap.ui.layout.form.FormElement({
												    fields: [oLabelRegion, oComboRegion]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oLabelCountry, oInputCountry]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oLabelCity, oInputCity]
												})
	                                     ]
	                     }),
	                     
	                     new sap.ui.layout.form.FormContainer("idSaleInvOverviewFormC2",{
                             title: "Select Unit Type",
                             formElements: [
											new sap.ui.layout.form.FormElement({
											    fields: [oLabelEquipClass, oComboEquipClass]
											}),
											new sap.ui.layout.form.FormElement({
											    fields: [oLabelEquipCat, oComboEquipCat]
											}),
											new sap.ui.layout.form.FormElement({
											    fields: [oLabelUnitType, oComboUnitType]
											})
                                     ]
                     })
	                     ]
	     });
	     
	     var oSaleInvOverviewFormChar = new sap.ui.layout.form.Form("idSaleInvOverviewFormChar",{
             layout: oSaleInvOverviewLayoutChar,
             formContainers: [
                     new sap.ui.layout.form.FormContainer("idSaleInvOverviewFormCharC1",{
                         //title: "Select Characteristics",
                         formElements: [
										new sap.ui.layout.form.FormElement({
										    fields: [lblCharFormTitle]
										}),
										new sap.ui.layout.form.FormElement({
										    fields: [oLabelSaleGrade,oFlexBoxSaleGrade], // oCBSaleGrade1, oCBSaleGrade2, oCBSaleGrade3, oCBAll ]
										}),
										new sap.ui.layout.form.FormElement({
										    fields: [oLabelAge,oFlexBoxAgeRow1], // oCBAge1, oCBAge3, oCBAge5, oCBAge7, oCBAge9, oCBAge11], // 
										}),
										new sap.ui.layout.form.FormElement({
										    fields: [oLabelAge1,oFlexBoxAgeRow2], //oCBAge2, oCBAge4, oCBAge6, oCBAge8, oCBAge10, oCBAge12], //
										}),
										new sap.ui.layout.form.FormElement({
										    fields: [oFlexBoxButtons]
										}),
										new sap.ui.layout.form.FormElement({
										    fields: [oFlexboxLegend]
										})
                                 ]
                 })
	             ]
	     });
	     var vHDivider = new sap.ui.commons.HorizontalDivider({width: "95%", type: "Area", height: "Medium"});
	     
	     var oSaleInvLayout = new sap.ui.layout.form.ResponsiveLayout("idSaleInvLayout");
	        var oSaleInvForm = new sap.ui.layout.form.Form("idSaleInvForm",{
	           layout: oSaleInvLayout,
	           formContainers: [
	                   new sap.ui.layout.form.FormContainer("idSaleInvFormC1",{
	                       formElements: [	                                      
			                               new sap.ui.layout.form.FormElement("idSaleInvResultFormElem",{
			                                   fields: [],
			                               }),
		                               ],
	                               layoutData: new sap.ui.commons.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
	                   })
	           ]
	        });
	        
			var oFlexboxSaleInventory = new sap.m.FlexBox({
			      items: [
			        oSaleInvOverviewForm,
			        oSaleInvOverviewFormChar,vHDivider,
			        oSaleInvForm
			      ],
			      direction: "Column"
			    });

			        return oFlexboxSaleInventory;
			        
	}, //createSaleInvOverview
	
	getSearchResultSI: function(){
		 $('#idHdrContnt').html("Sale Inventory Overview");
		var oCurrent = this;
		
		if(sap.ui.getCore().byId("idSIResultTable")){
			var vResultTbl= sap.ui.getCore().byId("idSIResultTable");
    		if(vResultTbl){
    			sap.ui.getCore().byId("idSIResultTable").destroy();
    			sap.ui.getCore().byId("idSaleInvResultFlex").destroy();
    			/*if(sap.ui.getCore().byId("SaleInvCityDetails")){
    				sap.ui.getCore().byId("SaleInvCityDetails").destroy();
    			}*/
    		}
		}
		var ICustomer = "";
		var IRegion = "";
		var ICountry = "";
		var ICity = "";
		
		var selectedValues = sap.ui.getCore().byId('idAutoRegionSI').getSelectedValues();
		for(var i=0;i<selectedValues.length;i++)
		IRegion += selectedValues[i].description + '$';
		
		IRegion = IRegion.slice(0,-1);
		
		 selectedValues = sap.ui.getCore().byId('idAutoCountrySI').getSelectedValues();
        for(var i=0;i<selectedValues.length;i++)
       	 ICountry += selectedValues[i].description +'$';
        
        ICountry = ICountry.slice(0,-1);
        
        selectedValues = sap.ui.getCore().byId('idAutoCitySI').getSelectedValues();
        for(var i=0;i<selectedValues.length;i++)
       	 ICity += selectedValues[i].description +'$';
        
        ICity = ICity.slice(0,-1);
        
     // create 2 variables for region
		var vRegion = "";
		var vRegion1 = "";
		var splitRegions = IRegion.split("$");
		var RegionLen = splitRegions.length;
		if(IRegion != ""){
			if(RegionLen>15){
	    		for(var i=0;i<15;i++){
	    			vRegion = vRegion + splitRegions[i]+"$";
	    		}
	    		for(var j=15;j<RegionLen;j++){
	    			vRegion1 = vRegion1 + splitRegions[j]+"$";
	    		}
	    	}else{
	    		for(var k=0;k<RegionLen;k++){
	    			vRegion = vRegion + splitRegions[k]+"$";
	        	}
	    	}
		}
		else{
			vRegion = "";
		}
        
		// create 2 variables for country
		var vCountry = "";
		var vCountry1 = "";
		var spliCountries = ICountry.split("$");
		var CountryLen = spliCountries.length;
		if(ICountry != ""){
			if(CountryLen>15){
	    		for(var i=0;i<15;i++){
	    			vCountry = vCountry + spliCountries[i]+"$";
	    		}
	    		for(var j=15;j<CountryLen;j++){
	    				vCountry1 = vCountry1 + spliCountries[j]+"$";
	    		}
	    	}else{
	    		for(var k=0;k<CountryLen;k++){
	    				vCountry = vCountry + spliCountries[k]+"$";
	        	}
	    	}
		}
		else{
			vCountry = "";
		}
		
		// create 2 variables for city
		var vCity = "";
		var vCity1 = "";
		var splitCities = ICity.split("$");
		var CityLen = splitCities.length;
		if(ICity != ""){
			if(CityLen>15){
	    		for(var i=0;i<15;i++){
	    			vCity = vCity + splitCities[i]+"$";
	    		}
	    		for(var j=15;j<CityLen;j++){
	    			vCity1 = vCity1 + splitCities[j]+"$";
	    		}
	    	}else{
	    		for(var k=0;k<CityLen;k++){
	    			vCity = vCity + splitCities[k]+"$";
	        	}
	    	}
		}
		else{
			vCity = "";
		}
		
		var vEquipClass = sap.ui.getCore().byId("idComboEquipClassSI").getValue();
		
		var EqpCatVal = sap.ui.getCore().byId("idComboEquipCatSI").getValue();
		EqpCatVal =  EqpCatVal.replace(/\'/g,"$");
		EqpCatVal =  EqpCatVal.replace(/\+/g,"@");
		
		var IUnitType= sap.ui.getCore().byId("idComboUnitTypeSI").getValue();
		var summary = '';
		
		if((IUnitType == "ALL") || (IUnitType === "")){
			IUnitType =  "|"+EqpCatVal;
		} 
		else{
			IUnitType = sap.ui.getCore().byId("idComboUnitTypeSI").getValue();
		}
		
		//get the value for sale grade
		var vSG1 = sap.ui.getCore().byId("idSG1");
		var vSG2 = sap.ui.getCore().byId("idSG2");
		var vSG3 = sap.ui.getCore().byId("idSG3");
		var vSGAll = sap.ui.getCore().byId("idSGAll");
		var vSaleGrade = "";
		if(vSGAll.getChecked()){
			vSaleGrade = "ALL";
		}
		else{
			vSaleGrade = "";
			if(vSG1.getChecked()){
				vSaleGrade = vSaleGrade + vSG1.getName()+",";
			}
			if(vSG2.getChecked()){
				vSaleGrade = vSaleGrade + vSG2.getName()+",";
			}
			if(vSG3.getChecked()){
				vSaleGrade = vSaleGrade + vSG3.getName()+",";
			}
		}
		//alert("salegrade val " + vSaleGrade);
		
		
		//get value for age
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
		var vAge = "";
		if(vAgeAll.getChecked()){
			vAge = "ALL";
		}
		else{
			vAge = "";
			if(vLT5.getChecked()){
				vAge = vAge + vLT5.getName()+",";
			}
			if(vEQ12.getChecked()){
				vAge = vAge + vEQ12.getName()+",";
			}
			if(v5TO7.getChecked()){
				vAge = vAge + v5TO7.getName()+",";
			}
			if(vEQ13.getChecked()){
				vAge = vAge + vEQ13.getName()+",";
			}
			if(vEQ8.getChecked()){
				vAge = vAge + vEQ8.getName()+",";
			}
			if(vEQ14.getChecked()){
				vAge = vAge + vEQ14.getName()+",";
			}
			if(vEQ9.getChecked()){
				vAge = vAge + vEQ9.getName()+",";
			}
			if(vEQ15.getChecked()){
				vAge = vAge + vEQ15.getName()+",";
			}
			if(vEQ10.getChecked()){
				vAge = vAge + vEQ10.getName()+",";
			}
			if(vMT15.getChecked()){
				vAge = vAge + vMT15.getName()+",";
			}
			if(vEQ11.getChecked()){
				vAge = vAge + vEQ11.getName()+",";
			}
		}
			
		oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
		var urlToCall = serviceUrl + "/Sale_Inventory_CR?$filter=IRegion eq '" + vRegion + "' and IRegion1 eq '" + vRegion1 
									 +"' and ICountry eq '" + vCountry + "' and ICountry1 eq '" + vCountry1 
									 + "' and ICity eq '"+ vCity +"' and ICity1 eq '" + vCity1 
									 + "' and IEquipClass eq '" + vEquipClass + "' and IEquipCat eq '" + EqpCatVal 
									 + "' and IAge eq '" + vAge + "' and ICustomer eq '" + ICustomer 
									 + "' and ISalegrade eq '" + vSaleGrade + "' and IUnit eq '"+ IUnitType + "'";
		//alert("urlToCall " + urlToCall);
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
		    	
		    	SaleInvResult.SIHeaderVal = [];
		    	customeSaleInvResult = [];
		    	jsonSaleInvOvrvwExportToExcel = [];
		    	//alert("data.results.length" + data.results.length);
		    	if (data.results.length != 0){
		    		SaleInAllData = data.results;
		    		oCurrent.showSaleInventory();
		    		var vResultTbl= sap.ui.getCore().byId("idSIResultTable");
		    		var vFlex = sap.ui.getCore().byId("idExportToExcelFlexSaleInvOverview");
		    		SaleInvResult.SIHeaderVal = jQuery.grep(data.results, function(element, index){
		                   return element.SumFlag == "X";
		        	});
		    		var sumLen = SaleInvResult.SIHeaderVal.length;
		    		for(var i=0;i<sumLen;i++){
		    			customeSaleInvResult.push({
		    				"Region":SaleInvResult.SIHeaderVal[i].Region,
			    			"Country":SaleInvResult.SIHeaderVal[i].Country,
			    			"City":SaleInvResult.SIHeaderVal[i].City,
			    			"UnitTypeDesc":SaleInvResult.SIHeaderVal[i].UnitTypeDesc,
			    			"UptoCount":SaleInvResult.SIHeaderVal[i].UptoCount,
			    			"helpIdVal":SaleInvResult.SIHeaderVal[i].UptoCount + "$" + SaleInvResult.SIHeaderVal[i].City + "$" + SaleInvResult.SIHeaderVal[i].UnitTypeDesc
			    		});
		    			
		    			jsonSaleInvOvrvwExportToExcel.push({
		    				"Region":SaleInvResult.SIHeaderVal[i].Region,
		    				"Country":SaleInvResult.SIHeaderVal[i].Country,
			    			"City":SaleInvResult.SIHeaderVal[i].City,
			    			"UnitType":SaleInvResult.SIHeaderVal[i].UnitTypeDesc,
			    			"Count":SaleInvResult.SIHeaderVal[i].UptoCount
		    			});
		    		}
					//alert("count " + CountryLen);
					if(CountryLen == 1 && ICountry != ""){
						vResultTbl.setWidth("50%");
						vFlex.setWidth("50%");
						sap.ui.getCore().byId("idCountryColumnSI").setVisible(false);
					}
					else if(CountryLen > 1 && ICountry != ""){
						var TempCountry = [];
						for(var k=0;k<customeSaleInvResult.length;k++){
							TempCountry[k] = customeSaleInvResult[k].Country;
						}
						var oUtil = new utility();
						TempCountry = oUtil.unique(TempCountry);
						if(TempCountry.length == 1){
							vResultTbl.setWidth("50%");
							vFlex.setWidth("50%");
							sap.ui.getCore().byId("idCountryColumnSI").setVisible(false);
						}else{
							vResultTbl.setWidth("70%");
							vFlex.setWidth("70%");
							sap.ui.getCore().byId("idCountryColumnSI").setVisible(true);
						}
						
					}
					else{
						vResultTbl.setWidth("70%");
						vFlex.setWidth("70%");
						sap.ui.getCore().byId("idCountryColumnSI").setVisible(true);
					}
					
					
					if(RegionLen == 1){
						vResultTbl.setWidth("70%");
						vFlex.setWidth("70%");
						sap.ui.getCore().byId("idRegionColumnSI").setVisible(false);
					}
					else{
						vResultTbl.setWidth("60%");
						vFlex.setWidth("60%");
						sap.ui.getCore().byId("idRegionColumnSI").setVisible(true);
					}
		    		/*//alert("CountryLen " + CountryLen);
					if(CountryLen == 1){
						vResultTbl.setWidth("60%");
						vFlex.setWidth("60%");
						sap.ui.getCore().byId("idCountryColumnSI").setVisible(false);
					}
					else{
						vResultTbl.setWidth("70%");
						vFlex.setWidth("70%");
						sap.ui.getCore().byId("idCountryColumnSI").setVisible(true);
					}*/
					var oModelSaleInv = new sap.ui.model.json.JSONModel();
					oModelSaleInv.setData({modelData:customeSaleInvResult});
					vResultTbl.setModel(oModelSaleInv);
					vResultTbl.bindRows("/modelData");
					
					//alert("SaleInvResult.SIHeaderVal.length " + SaleInvResult.SIHeaderVal.length);
					if (SaleInvResult.SIHeaderVal.length < 25){
			    		vResultTbl.setVisibleRowCount(SaleInvResult.SIHeaderVal.length);
			    		vResultTbl.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
			    		 sap.ui.getCore().byId("idBtnViewAllSaleInvResult").setVisible(false);
			    	}
			    	else{
			    		vResultTbl.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
			    		vResultTbl.setVisibleRowCount(25);
			    		 sap.ui.getCore().byId("idBtnViewAllSaleInvResult").setVisible(true);
			    	}
					busyDialog.close();
		    	}
		    	else{
		    		if(sap.ui.getCore().byId("idSIResultTable")){
		    			sap.ui.getCore().byId("idSIResultTable").destroy();
		    		}
		    		jQuery.sap.require("sap.ui.commons.MessageBox");
		        	sap.ui.commons.MessageBox.show("No Result Found. Please try again.",
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
	
	fnCallbackMessageBoxSearchSI: function(sResult){
		var oSaleInvOvrvw = new saleInvOverviewView();
		if(sResult == "YES"){
			busyDialog.open();
			oSaleInvOvrvw.getSearchResultSI();
		}
	},
	
	showSaleInventory:function(){
		 $('#idHdrContnt').html("Sale Inventory Overview");
		// Labels
		var oLabelInfo = new sap.ui.commons.Label("idDisclTextSI",{text: "*Currently stock not available. Please contact Seaco representative for next availability.",
	        wrapping: true}).addStyleClass("marginTop10");
		
		// Buttons
		var oBtnExport = new sap.m.Button({
            text : "Export To Excel",
            type:sap.m.ButtonType.Unstyled,
            icon: sap.ui.core.IconPool.getIconURI("excel-attachment"),
            press:function(){
            	//objUtil = new utility();
            	//alert("vTitle " + vTitle);
            	objUtil.makeHTMLTable(jsonSaleInvOvrvwExportToExcel, "Sale Inventory Overview","export");
            	//tableToExcel("idAccountDetailTbl-table",vTitle,vColLen);
            }
         }).addStyleClass("submitBtn");
		var oFlexExpBtn = new sap.m.FlexBox("idExportToExcelFlexSaleInvOverview",{
            items: [
                    oBtnExport
            ],
            direction:"RowReverse"
	});
		
		var oBtnSaleInvViewAll = new sap.m.Button("idBtnViewAllSaleInvResult",{
	        text : "View All",
	        styled:false,
	        width:"80px",
	        press:function(){
	        	this.setVisible(false);
	        	var vArrayLength = SaleInvResult.SIHeaderVal.length;
	        	if(vArrayLength < 100){
	        		sap.ui.getCore().byId("idSIResultTable").setVisibleRowCount(vArrayLength);
	        		sap.ui.getCore().byId("idSIResultTable").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
	        	}
	        	else{
	        		sap.ui.getCore().byId("idSIResultTable").setVisibleRowCount(100);
	        		sap.ui.getCore().byId("idSIResultTable").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
	        	}
	        	
	        }
	     }).addStyleClass("submitBtn marginTop10");
	
		
		// Table
		var oSaleInvTable = new sap.ui.table.Table("idSIResultTable",{
			visibleRowCount: 9,
	        firstVisibleRow: 3,
	        columnHeaderHeight: 30,
	        //fixedColumnCount:1,
	        selectionMode: sap.ui.table.SelectionMode.None,
	        navigationMode: sap.ui.table.NavigationMode.Paginator,
		 }).addStyleClass("tblBorder marginTop10");  
		
		 /*var browser = sap.ui.Device.browser.chrome;
		 if(browser && widthOfDoc <= 1280){
			 oSaleInvTable.setWidth("100%");
		 }
		 else if (browser && widthOfDoc > 1280){
			 oSaleInvTable.setWidth("80%");
		 }
		 else if(!browser){
			 oSaleInvTable.setWidth("100%");
		 }*/
		 
		// Table Columns
		 oSaleInvTable.addColumn(new sap.ui.table.Column("idRegionColumnSI",{
		     label: new sap.ui.commons.Label({text: "Region"}),
		     template: new sap.ui.commons.TextView().bindProperty("text", "Region"),
		     sortProperty: "Region",
		     filterProperty: "Region",
		     resizable:false,
		     width:"120px"
			 }));
		 
		oSaleInvTable.addColumn(new sap.ui.table.Column("idCountryColumnSI",{
	     label: new sap.ui.commons.Label({text: "Country"}),
	     template: new sap.ui.commons.TextView().bindProperty("text", "Country"),
	     sortProperty: "Country",
	     filterProperty: "Country",
	     resizable:false,
	     width:"120px"
		 }));
		 
		oSaleInvTable.addColumn(new sap.ui.table.Column({
			 label: new sap.ui.commons.Label({text: "City"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.Link({
			press : function() {
				selCitySI = this.getText();
				helpIdCityDetailsSI = this.getHelpId();
				upToCountSI = (helpIdCityDetailsSI.split("$"))[0];
				if(upToCountSI == "0*"){
					jQuery.sap.require("sap.ui.commons.MessageBox");
		        	sap.ui.commons.MessageBox.show("No detail found.",
		        	sap.ui.commons.MessageBox.Icon.WARNING,
		        	"Warning",
		        	[sap.ui.commons.MessageBox.Action.OK], 
	   			    sap.ui.commons.MessageBox.Action.OK);
				}
				else{
					 busyDialog.open();
					/*if(sap.ui.getCore().byId("SaleInvCityDetails")){
						 sap.ui.getCore().byId("SaleInvCityDetails").destroy();
					 }*/
					 var bus = sap.ui.getCore().getEventBus();
                     bus.publish("nav", "to", {
                     id : "SaleInvCityDetails"
                     });
                     var oSIDetail =  new saleInvCityDetView();
                     oSIDetail.setSaleInvDetailView();
				}
			}
		}).bindProperty("text", "City").bindProperty("helpId","helpIdVal"),
	         sortProperty: "City",
	         filterProperty: "City",
	         resizable:false,
		     width:"120px"
			 }));
		
		oSaleInvTable.addColumn(new sap.ui.table.Column({
			 label: new sap.ui.commons.Label({text: "Unit Type"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.TextView().bindProperty("text", "UnitTypeDesc"),
	         sortProperty: "UnitTypeDesc",
	         filterProperty: "UnitTypeDesc",
	         resizable:false,
		     width:"180px"
			 }));
		 
		var oColumn = new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Count"}).addStyleClass("wraptextcol"),
            template: new sap.ui.commons.TextView().bindProperty("text", "UptoCount"),
	      sortProperty: "UptoCount",
	      filterProperty: "UptoCount",
	      resizable:false,
	         width:"90px"
	            });
    
	    var oUtil = new utility();
	    
	    oSaleInvTable.addColumn(oColumn);
	    oUtil.addColumnSorterAndFilter(oColumn, oUtil.compareUptoCount);

    
		/*oSaleInvTable.addColumn(new sap.ui.table.Column({
			 label: new sap.ui.commons.Label({text: "Count",textAlign :sap.ui.core.TextAlign.End}),
			 template: new sap.ui.commons.TextView({textAlign :sap.ui.core.TextAlign.End}).bindProperty("text", "UptoCount"),
	         sortProperty: "UptoCount",
	         filterProperty: "UptoCount",
	         resizable:false,
		     width:"90px"
			 }));*/
		
		// Flex Box
		 var oFlexBoxAll = new sap.m.FlexBox("idSaleInvResultFlex",{
		  items: [
		          	oFlexExpBtn,
					oSaleInvTable,
					oBtnSaleInvViewAll,
					oLabelInfo
	  		  ],
	  		direction: "Column",
	  		width:"100%"
	  		});  
		
		var oSaleInvFormElement = sap.ui.getCore().byId("idSaleInvResultFormElem");
		oSaleInvFormElement.insertField(oFlexBoxAll,0);
	
	}
});
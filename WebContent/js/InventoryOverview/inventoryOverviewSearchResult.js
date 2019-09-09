/*
 *	ClassName -  inventorySearchResultView 
 *  Developed 
 *   showSearchTable : to create and show the search result table
 *   getSearchResult : to fetch and bind data according to the search criteria mentioned by the user
 *  
*/
var selCity="";
var selUnitType = "";
var vResultTbl;
var vViewAll;
var jsonDepotInvOvrvwExportToExcel = [];
var oModelDepotSearchResult = new sap.ui.model.json.JSONModel();
var DepotSearchResult = {
		Detail:[],
		headerVal: [],
		itemVal:[]
};
var resultDate = "";
var filteredFlag=false;
sap.ui.model.json.JSONModel.extend("inventorySearchResultView", {
 
	showSearchTable: function(){
		var currentDate = dateFormat(new Date(),'dd-mm-yyyy HH:MM');
		resultDate = currentDate;
		var oTxtResultTitleLine1 = new sap.m.Text({text: "Depot Inventory as of " + currentDate}).addStyleClass("fontTitle");
		var oTxtResultTitleLine2 = new sap.m.Text("idTxtResultTitleLine2").addStyleClass("fontTitle");
		
		var oFlexboxResultHeaderLine1 = new sap.m.FlexBox("idFlexBoxInvDetResultHeaderLine1",{
			  items: [
			    oTxtResultTitleLine1,
			  ],
			  direction: "Column"
			});
		var oFlexboxResultHeaderLine2 = new sap.m.FlexBox("idFlexBoxInvDetResultHeaderLine2",{
			  items: [
			    oTxtResultTitleLine2,
			  ],
			  direction: "Column"
			});
		
		// Buttons
		var oBtnExport = new sap.m.Button({
            text : "Export To Excel",
            type:sap.m.ButtonType.Unstyled,
            icon: sap.ui.core.IconPool.getIconURI("excel-attachment"),
            press:function(){
            	//objUtil = new utility();
            	//alert("vTitle " + vTitle);
            	objUtil.makeHTMLTable(jsonDepotInvOvrvwExportToExcel, "Depot Inventory Overview","export");
            	//tableToExcel("idAccountDetailTbl-table",vTitle,vColLen);
            }
         }).addStyleClass("submitBtn");
		var oFlexExpBtn = new sap.m.FlexBox("idExportToExcelFlexDepotInvOverview",{
            items: [
                    oBtnExport
            ],
            direction:"RowReverse"
	});
		
		
		var	oResultTable = new sap.ui.table.Table("idInvSearchResult",{
		        //title: "Results for Inventory Overview 29-10-2013, 23:11",
		        visibleRowCount: 25,
		        firstVisibleRow: 3,
		        columnHeaderHeight: 30,
		       /* filter:function(oEvent){
		        	oResultTable.fireRowSelectionChange();
		        },
		        rowSelectionChange:function(oEvent){
		        	alert("filter " + oEvent.getSource().mBindingInfos.rows.binding.aIndices.length);
		        },*/
		        selectionMode: sap.ui.table.SelectionMode.None,
		        navigationMode: sap.ui.table.NavigationMode.Paginator,
		     //   width: "70%",
		        height:"100%",
		}).addStyleClass("tblBorder");
		oResultTable.unbindRows();
		 var browser = sap.ui.Device.browser.chrome;
		 if(browser && widthOfDoc <= 1280){
			 sap.ui.getCore().byId("idInvSearchResult").setWidth("100%");
		 }
		 else if (browser && widthOfDoc > 1280){
			 sap.ui.getCore().byId("idInvSearchResult").setWidth("80%");
		 }
		 else if(!browser){
			 sap.ui.getCore().byId("idInvSearchResult").setWidth("100%");
		 }
	
		//Define the columns and the control templates to be used
		 oResultTable.addColumn(new sap.ui.table.Column("idRegionColumn",{
		        label: new sap.ui.commons.Label({text: "Region"}),
		        template: new sap.ui.commons.TextView().bindProperty("text", "Region"),
		        sortProperty: "Region",
		        filterProperty: "Region",
		        resizable:false,
		        width:"80px"
			}));
		 
		oResultTable.addColumn(new sap.ui.table.Column("idCountryColumn",{
	        label: new sap.ui.commons.Label({text: "Country"}),
	        template: new sap.ui.commons.TextView().bindProperty("text", "Country"),
	        sortProperty: "Country",
	        filterProperty: "Country",
	        resizable:false,
	        width:"80px"
		}));
		oResultTable.addColumn(new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "City"}),
	        resizable:false,
	        template: new sap.ui.commons.TextView().bindProperty("text", "City"),
	        sortProperty: "City",
	        filterProperty: "City",
	        width:"90px"
	}));
		
		/*oResultTable.addColumn(new sap.ui.table.Column({
		        label: new sap.ui.commons.Label({text: "City"}),
		        resizable:false,
		        template: new sap.ui.commons.Link({
					press : function(evt) {
						selCity = this.getText();
						selUnitType = this.getHelpId();
						 busyDialog.open();
						sap.ui.getCore().byId("InventorySearch").getController().onCitySelect();
					}
				}).bindProperty("text", "City").bindProperty("helpId","MatlDescr"),
		        sortProperty: "City",
		        filterProperty: "City",
		        width:"90px"
		}));*/
		oResultTable.addColumn(new sap.ui.table.Column({
		        label: new sap.ui.commons.Label({text: "Unit Type"}),
		        template: new sap.ui.commons.TextView().bindProperty("text", "MatlDescr"),
		        sortProperty: "MatlDescr",
		        filterProperty: "MatlDescr",
		        resizable:false,
		        width:"140px"
		}));
		oResultTable.addColumn(new sap.ui.table.Column({
		        label: new sap.ui.commons.Label({text: "Count"}),
		        template: new sap.ui.commons.TextView().bindProperty("text", "DispCount"),
		        sortProperty: "DispCount",
		        filterProperty: "DispCount",
		        resizable:false,
		        width:"40px"
		}));
		
		 var oBtnViewAll =new sap.m.Button("idBtnViewAllInvDetail",{
		        text : "View All",
		        styled:false,
		       // icon: "images/view_all.png",
		        press:function(){
		        	vViewAll.setVisible(false);
		        	var vArrayLength = DepotSearchResult.headerVal.length;
		        	if(vArrayLength < 100){
		        		sap.ui.getCore().byId("idInvSearchResult").setVisibleRowCount(vArrayLength);
		        		sap.ui.getCore().byId("idInvSearchResult").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		        	}
		        	else{
		        		sap.ui.getCore().byId("idInvSearchResult").setVisibleRowCount(100);
		        		sap.ui.getCore().byId("idInvSearchResult").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		        	}
		        	
		        },
		        visible : false
		     }).addStyleClass("submitBtn");
		var oFlexboxBtnViewAll = new sap.m.FlexBox("idFlexBoxBtnViewlAllInvSearch",{
			  items: [ oBtnViewAll  ],
			  direction: "Column"
		});
		var oTxtDisclaimerTitle = new sap.m.Text({text: "Disclaimer"}).addStyleClass("font11Bold");
		var oTxtDisclaimer = new sap.m.Text("txtDisclaimerText",
				 {text: "Your agreement to comply and be bound by the Seaco Website Terms and Conditions (http://www.seacoglobal.com/Terms-and-Conditions) is deemed to" +
				 		" occur when you access the information on this page. If you do not agree to be bound by the Seaco Website Terms and Conditions, you should stop " +
				 		"accessing the information on this page immediately and log out.   Every reasonable effort has been made to ensure the information provided is " +
				 		"correct. The count shown in the tables are indicative only and may from time to time be changed without notification at Seaco?s sole discretion. " +
				 		"Seaco, its employees and or its contractors are not responsible for any incorrect information and we are not liable in anyway for inaccuracies or " +
				 		"errors. Users are advised to consult with Seaco directly for any further information.",
				 	maxLines : 5}).addStyleClass("font11Light");
		 
		
		/* initial disclaimer text
		 * //Every effort has been made to ensure the information provided is correct. The count shown in the tables are indicative only and it may"+
	 	" from time to time be changed without notification. Seaco or its employees or contractors are not responsible for any incorrect information"+
	 	" and we therefore are not liable in anyway for inaccuracies or errors. Users are adviced to consult with Seaco directly for any further information.
*/		var oFlexboxDisclaimer = new sap.m.FlexBox("idFlexBoxInvResultDisclaimer",{
			  items: [
			    oTxtDisclaimerTitle,
			    oTxtDisclaimer
			  ],
			  direction: "Column"
			});
		/*var oFlexboxResult = new sap.m.FlexBox("idResultFlex",{
			  items: [
			    oFlexboxResultHeader,
			    oResultTable,
			    oBtnViewAll,
			    oFlexboxDisclaimer
			  ],
			  direction: "Column"
			});
		
		 return oFlexboxResult;*/
},

	getSearchResult:function(){
		 $('#idHdrContnt').html("Depot Inventory Overview");
			var oCurrent = this;
			if(sap.ui.getCore().byId("idDIResultTable")){
				var vResultTbl= sap.ui.getCore().byId("idDIResultTable");
	    		if(vResultTbl){
	    			sap.ui.getCore().byId("idDIResultTable").destroy();
	    			sap.ui.getCore().byId("idDepoInvResultFlex").destroy();
	    			sap.ui.getCore().byId("idExportToExcelFlexDepotInvOverview").destroy();
	    			/*if(sap.ui.getCore().byId("DepoInvCityDetails")){
	    				sap.ui.getCore().byId("DepoInvCityDetails").destroy();
	    			}*/
	    		}
			}
			
			var IRegion = "";
			var IRegionDesc = "";
			var ICountry = "";
			var ICountryDesc = "";
			var ICity = "";
			var ICityDesc = "";
			var unitDesc = "";
			
			var selectedValues = sap.ui.getCore().byId('idAutoRegion').getSelectedValues();
			var RegionLen = selectedValues.length;
	        for(var i=0;i<selectedValues.length;i++){
	        	IRegion += selectedValues[i].code +'$';
	        	IRegionDesc += selectedValues[i].description +',';
	        }
	          	 
	        IRegion = IRegion.slice(0,-1);
	        IRegionDesc = IRegionDesc.slice(0,-1);
	        
			selectedValues = sap.ui.getCore().byId('idAutoCountry').getSelectedValues();
	        var CountryLen = selectedValues.length;
	        for(var i=0;i<selectedValues.length;i++){
	        	 ICountry += selectedValues[i].code +'$';
	        	 ICountryDesc += selectedValues[i].description +',';
	        }
	       	
	        
	        ICountry = ICountry.slice(0,-1);
	        ICountryDesc = ICountryDesc.slice(0,-1);
	        
	        selectedValues = sap.ui.getCore().byId('idAutoCity').getSelectedValues();
			var CityLen = selectedValues.length;
	        for(var i=0;i<selectedValues.length;i++){
	        	ICity += selectedValues[i].code +'$';
	        	ICityDesc += selectedValues[i].description +',';
	        }
	        
	        ICity = ICity.slice(0,-1);
	        ICityDesc = ICityDesc.slice(0,-1);
	        
	        // Begin of adding by Seyed Ismail MAC
			
			var allSelectedClas = '';
			var allSelectedCat = '';
			var allSelectedUnit = '';
			
	         var selEqpCat='',selEqpCla='', selEqpUni=''; 
	         
	         selectedValues = sap.ui.getCore().byId('idComboEquipClass').getSelectedValues();
	         for(var i=0;i<selectedValues.length;i++){
	        	 selEqpCla += selectedValues[i].code +'$';
	        	 if(selectedValues[i].code == 'ALL'){
	        		 allSelectedClas = 'X';  
	         }
	         }
	         
	         selectedValues = sap.ui.getCore().byId('idComboEquipCat').getSelectedValues();
	         for(var i=0;i<selectedValues.length;i++){
	        	 	selEqpCat += selectedValues[i].code +'$';
	        	 	if(selectedValues[i].code == 'ALL'){
	        	 		allSelectedCat = 'X';
	        	 	}
	         }
	         
	         selectedValues = sap.ui.getCore().byId('idComboUnitType').getSelectedValues();
	         for(var i=0;i<selectedValues.length;i++){
	        	 selEqpUni += selectedValues[i].code +'$';
	        	 unitDesc += selectedValues[i].description +',';
	        	 if(selectedValues[i].code == 'ALL'){
	        		 allSelectedUnit = 'X';  
	         }
	         }
	         unitDesc = unitDesc.slice(0,-1);
	         selEqpCla = selEqpCla.slice(0,-1);
	         selEqpCat = selEqpCat.slice(0,-1);
	         selEqpUni = selEqpUni.slice(0,-1);
	         
	         if(allSelectedClas == 'X'){
	        	 selEqpCla = [];
	         }
	         if(allSelectedCat == 'X'){
	        	 selEqpCat = [];
	         }
	         if(allSelectedUnit == 'X'){
	        	 selEqpUni = [];
	         }
		
		
	         oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
	 		oModel.setSizeLimit(10000);
	 		var urlToCall = serviceUrl + "/Depot_Inventory_C?$filter=IRegion eq '" + IRegion + "' and ICountry eq '" + ICountry + "' and " +
	 				"ICity eq '"+ ICity +"' and Ieqpcla eq '"+ selEqpCla +"' and Ieqpcat eq '"+ selEqpCat +"' and Iunit eq '"+ selEqpUni + "'";
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
			    	DepotSearchResult.Detail = [];
			    	DepotSearchResult.headerVal = [];
			    	jsonDepotInvOvrvwExportToExcel = [];
		    	if (data.results.length != 0){
		    		//code to destroy all the result related table to create again
		    		if(sap.ui.getCore().byId("idInvSearchResult")){
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
			    			oSearchResultFormElementDiscl.destroy();
			    			exportBtn.destroy();
			    			/*if(sap.ui.getCore().byId("idInvDetailPage") != undefined){
			    				sap.ui.getCore().byId("idInvDetailPage").destroy();
			    			}*/
			    		}
		    		}
		    		oCurrent.showSearchTable();	
			    	DepotSearchResult.Detail = data.results;
			    	DepotSearchResult.headerVal = jQuery.grep(data.results, function(element, index){
		                   return element.SumFlag == "X";
		        	   });
			    	
			    	var HeaderLen = DepotSearchResult.headerVal.length;
			    	for(var i=0;i<HeaderLen;i++){
			    		jsonDepotInvOvrvwExportToExcel.push({
			    			"Region":DepotSearchResult.headerVal[i].Region,
			    			"Country":DepotSearchResult.headerVal[i].Country,
			    			"City":DepotSearchResult.headerVal[i].City,
			    			"Unit Type":DepotSearchResult.headerVal[i].MatlDescr,
			    			"Count":DepotSearchResult.headerVal[i].DispCount,
			    		});
			    	}
			    	vResultTbl = sap.ui.getCore().byId("idInvSearchResult");
			    	var exportBtn = sap.ui.getCore().byId("idExportToExcelFlexDepotInvOverview");
			    	if(RegionLen > 1){
			    		var TempRegion = [];
			    		for(var k=0;k<DepotSearchResult.headerVal.length;k++){
			    			TempRegion[k] = DepotSearchResult.headerVal[k].Region;
						}
			    		TempRegion = objUtil.unique(TempRegion);
						if(TempRegion.length == 1){
							vResultTbl.setWidth("60%");
							exportBtn.setWidth("60%");
							sap.ui.getCore().byId("idRegionColumn").setVisible(false);
						}else{
							vResultTbl.setWidth("70%");
							exportBtn.setWidth("70%");
							sap.ui.getCore().byId("idRegionColumn").setVisible(true);
						}
			    	}
			    	else{
			    		vResultTbl.setWidth("50%");
			    		exportBtn.setWidth("50%");
						sap.ui.getCore().byId("idRegionColumn").setVisible(false);
			    	}
					if(CountryLen == 1 && ICountry != ""){
						vResultTbl.setWidth("50%");
						exportBtn.setWidth("50%");
						sap.ui.getCore().byId("idCountryColumn").setVisible(false);
					}
					else if(ICountry == ""){
						var TempCountry = [];
						for(var k=0;k<DepotSearchResult.headerVal.length;k++){
							TempCountry[k] = DepotSearchResult.headerVal[k].Country;
						}
						//var oUtil = new utility();
						TempCountry = objUtil.unique(TempCountry);
						if(TempCountry.length == 1){
							vResultTbl.setWidth("50%");
							exportBtn.setWidth("50%");
							sap.ui.getCore().byId("idCountryColumn").setVisible(false);
						}else{
							vResultTbl.setWidth("70%");
							exportBtn.setWidth("70%");
							sap.ui.getCore().byId("idCountryColumn").setVisible(true);
						}
						
					}
					else{
						vResultTbl.setWidth("70%");
						exportBtn.setWidth("70%");
						sap.ui.getCore().byId("idCountryColumn").setVisible(true);
					}
					var vResultHeaderLine1 = sap.ui.getCore().byId("idFlexBoxInvDetResultHeaderLine1");
					var vResultHeaderLine2 = sap.ui.getCore().byId("idFlexBoxInvDetResultHeaderLine2");
					var vResultTable = sap.ui.getCore().byId("idInvSearchResult");
					var vViewAllBtn = sap.ui.getCore().byId("idFlexBoxBtnViewlAllInvSearch");
					var vDiscl = sap.ui.getCore().byId("idFlexBoxInvResultDisclaimer");
					var exportBtn = sap.ui.getCore().byId("idExportToExcelFlexDepotInvOverview");
					
					var oSearchResultFormElement = sap.ui.getCore().byId("searchResultsInvHeaderLine1"); // release Results is ID of Form Element
				    oSearchResultFormElement.insertField(vResultHeaderLine1,0);
				    var oSearchResultFormElement = sap.ui.getCore().byId("searchResultsInvHeaderLine2"); // release Results is ID of Form Element
				    oSearchResultFormElement.insertField(vResultHeaderLine2,0);
				    var oSearchResultFormElement = sap.ui.getCore().byId("searchResultsInvHeaderexport"); // release Results is ID of Form Element
				    oSearchResultFormElement.insertField(exportBtn,0);
				    var oSearchResultFormElement = sap.ui.getCore().byId("searchResultsInvTable"); // release Results is ID of Form Element
				    oSearchResultFormElement.insertField(vResultTable,0);
				    var oSearchResultFormElement = sap.ui.getCore().byId("searchResultsInvBtn"); // release Results is ID of Form Element
				    oSearchResultFormElement.insertField(vViewAllBtn,0);
				    var oSearchResultFormElement = sap.ui.getCore().byId("searchResultsInvDiscl"); // release Results is ID of Form Element
				    oSearchResultFormElement.insertField(vDiscl,0);
				    sap.ui.getCore().byId("idBtnViewAllInvDetail").setVisible(true);
				    
			    	oModelDepotSearchResult.setData(DepotSearchResult);
			    	
			    	vViewAll = sap.ui.getCore().byId("idBtnViewAllInvDetail");
			    	if (DepotSearchResult.headerVal.length < 25){
			    		vResultTbl.setVisibleRowCount(DepotSearchResult.headerVal.length);
			    		vResultTbl.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
			    		vViewAll.setVisible(false);
			    	}
			    	else{
			    		vResultTbl.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
			    		vResultTbl.setVisibleRowCount(25);
			    		vViewAll.setVisible(true);
			    	}
			    	
			    	
			    	var summary = "";
			    	if(IRegion.trim() != ""){
			    		summary = "Region: " + IRegionDesc + " || "; 
			    	}
			    	if(ICountry.trim() != ""){
						summary += "Country: " + ICountryDesc + " || ";
					}
			    	if(ICity.trim() != ""){
			    		summary += "City: " + ICityDesc + " || ";
			    	}
			    	if(allSelectedUnit != "X"){
			    		if(unitDesc.trim() != "")
			    			summary += "Unit Type: " +  unitDesc;
			    	}
			    	else{
			    			summary += "Unit Type: ALL";
					}
			    	var summaryLen = summary.length;
			    	if(summary.substring((summaryLen-3)).trim() == "||")
			    		summary = summary.substring(0,(summaryLen-3))
					sap.ui.getCore().byId("idTxtResultTitleLine2").setText(summary);
					
					sap.ui.getCore().byId("idInvSearchResult").setModel(oModelDepotSearchResult);
					sap.ui.getCore().byId("idInvSearchResult").bindRows("/headerVal");
		    	}
		    	else 
		    	{
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
		    			oSearchResultFormElementDiscl.destroy();
		    			exportBtn.destroy();
		    		}
		    		sap.ui.commons.MessageBox.alert("No Results Found. Please edit / refine your search criteria and search again.");
		    	}
		    	busyDialog.close();
		    },
		    function(err){
		    	 busyDialog.close();
		    	 errorfromServer(err);
		    	//alert("Error while Reading Result : "+ window.JSON.stringify(err.response));
		    });
	}
});
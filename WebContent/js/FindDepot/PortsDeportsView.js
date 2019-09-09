/******** NP *******/
jQuery.sap.require("sap.ui.model.json.JSONModel");

var aPortsDeportsFD = [];

var oPanelFDInput = new sap.ui.commons.Panel({width: "100%"});
var oFDAutoRegion = "";
var oFDAutoCountry = "";
var oFDAutoCity = "";
var flagLegendFD = "";
var oCurrPDFD;
var oModelPortsDeportsFD = new sap.ui.model.json.JSONModel();

sap.ui.model.json.JSONModel.extend("portsDeportsView", {
	
	createPortsDeports: function(){
		oCurrPDFD = this;
		var oCurrent = this;
	
		// Labels
	  var labFDRegion = new sap.ui.commons.Label({text: "Region:",required:true,wrapping: true,
			  layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: false})}).addStyleClass("marginTop10 marginRight");
	  var labFDCountry = new sap.ui.commons.Label({text: "Country: # ",wrapping: true,
			  layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: false})}).addStyleClass("marginTop10 marginRight");
	  var labFDCity = new sap.ui.commons.Label({text: "City: # ", wrapping: true,
			  layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: false})}).addStyleClass("marginTop10 marginRight");  
		
	  var labFDStar = new sap.ui.commons.Label({text: "* "}).addStyleClass("MandatoryStar");
	  var lblFDSpaceLegend = new sap.ui.commons.Label( {text: " ",width : '5px'});
	  var labFDRequired = new sap.ui.commons.Label({text: " Mandatory Field",wrapping: true});
	  var oFlexboxFDReq = new sap.m.FlexBox({
		 // layoutData: new sap.ui.layout.GridData({span: "L7 M6 S4"}),
          items: [labFDStar,lblFDSpaceLegend,labFDRequired],
          direction: "Row"
	  });
	  var labFDHash = new sap.ui.commons.Label({text: "# Country or/and City required",wrapping: true});
	  
	  var oFlexboxFDLegend = new sap.m.FlexBox({
		  layoutData: new sap.ui.layout.GridData({span: "L7 M9 S5"}),
          items: [oFlexboxFDReq,labFDHash],
          direction: "Column"
	  }).addStyleClass("marginTop10");
    	
    	  oFDAutoRegion = new sap.ui.core.HTML("idFDRegionHTML",{layoutData: new sap.ui.layout.GridData({span: "L7 M7 S4"})});
		  var htmlFDContentRegion = '<input id="idBComboRegionFD" placeholder="Select Region" class="FormInputStyle marginTop10" style="width:100%">';
		  oFDAutoRegion.setContent(htmlFDContentRegion);
		  
		  oFDAutoCountry =  new sap.ui.core.HTML("idFDCountryHTML",{layoutData: new sap.ui.layout.GridData({span: "L7 M7 S4"})});
		  var htmlFDContentCountry = '<input id="idBComboCountryFD" disabled placeholder="Select Country" class="FormInputStyle marginTop10" style="width:100%">';
		  oFDAutoCountry.setContent(htmlFDContentCountry);
		  
		  oFDAutoCity =  new sap.ui.core.HTML("idFDCityHTML",{layoutData: new sap.ui.layout.GridData({span: "L7 M7 S4"})});
		  var htmlFDContentCity = '<input id="idBComboCityFD" disabled placeholder="Select City" class="FormInputStyle marginTop10" style="width:100%">';
		  oFDAutoCity.setContent(htmlFDContentCity);
    	
    	var ResetMessageFD = "This will reset all the specified inputs. Do you want to continue?";
    	
    	// Buttons
	   	 var oBtnPortsDeportsSubmit = new sap.m.Button("idBtnPortsDeportsSubmit",{
		          text : "Submit",
		          styled:false,
		          width:"80px",
		          layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
		          press:function(){
		        	  var oFDValidateObj = new GetOnLoadDataForPorts();
		        	  var validationFD = oFDValidateObj.validatePortsDeports();
		        	  if(sap.ui.getCore().byId("idFDFlexAll")){
		          		sap.ui.getCore().byId("idFDFlexAll").destroy();
		          	}
		        	  if(validationFD == false){
		        		  //alert("required");
		        		  /*sap.ui.commons.MessageBox.show("Invalid Inputs!",
		                            sap.ui.commons.MessageBox.Icon.WARNING,
		                            "Warning",
		                            [sap.ui.commons.MessageBox.Action.OK],
		                            sap.ui.commons.MessageBox.Action.OK);*/
		        	  }
		        	  else{
		        		  oCurrent.createTableFD();
		        		  oCurrent.showPortsDeports();
		        	  }
		        	  }
	   	 }).addStyleClass("submitBtn");
	   	 
	   	 var oBtnPortsDeportsReset = new sap.m.Button("idBtnPortsDeportsReset",{
		          text : "Reset",
		          width:"80px",
		          styled:false,
		          layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
		          press:function(){
		        	  var oFDResetObj = new ResetFormFindDepot();
		        	  sap.ui.commons.MessageBox.show(ResetMessageFD,
	                      sap.ui.commons.MessageBox.Icon.WARNING,
	                            "Warning",
	          [sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO], 
	          oFDResetObj.resetFindDepot,
	          sap.ui.commons.MessageBox.Action.YES);
		          }}).addStyleClass("submitBtn");
	   	 
	   	var lblFDSpaceInBtnLegend = new sap.ui.commons.Label( {text: " ",width : '5px'});
	   	 
	  // Flex Box
         var oFlexBoxFDButtons = new sap.m.FlexBox({
	  		  items: [
	  		          oBtnPortsDeportsSubmit,
	  		          lblFDSpaceInBtnLegend,
	  		          oBtnPortsDeportsReset
	     		  ],
	     		  direction: "Row",
	     		}).addStyleClass("margin10"); 
         
	  // Responsive Grid Layout
		    var oPortsDeportsLayout = new sap.ui.layout.form.ResponsiveGridLayout("idFDPortsDeportsLayout",{
		    	  labelSpanL: 1,
	              labelSpanM: 1,
	              labelSpanS: 1,
	              emptySpanL: 0,
	              emptySpanM: 0,
	              emptySpanS: 0,
	              columnsL: 2,
	              columnsM: 2,
	              columnsS: 1,
	              breakpointL: 765,
	              breakpointM: 320
		    });
		    
		    var vFDHDivider = new sap.ui.commons.HorizontalDivider("idDivider3", {width: "95%", type: "Area", height: "Medium"});
	   	 
	  // Online Form Starts
	     var oPortsDeportsForm = new sap.ui.layout.form.Form("idFDPortsDeportsForm",{
	             layout: oPortsDeportsLayout,
	             formContainers: [
	                     
	                     new sap.ui.layout.form.FormContainer("idFDPortsDeportsFormC1",{
	                             title: "Ports & Depots",
	                             formElements: [
												new sap.ui.layout.form.FormElement({
												    fields: [labFDRegion, oFDAutoRegion]
												}),
												
												new sap.ui.layout.form.FormElement({
												    fields: [labFDCountry, oFDAutoCountry]
												}),
												
												new sap.ui.layout.form.FormElement({
												    fields: [labFDCity, oFDAutoCity]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oFlexBoxFDButtons]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oFlexboxFDLegend]
												})
	                                     ]
	                     }),
	                     
	                     new sap.ui.layout.form.FormContainer("idPortsDeportsFormC2",{
                             formElements: [
											]
                     })
	             ]
	     });
	     
	   //var oPanelInput = new sap.ui.commons.Panel({width: "100%"});
         //oPanelFDInput.setTitle(new sap.ui.core.Title({text: "Ports & Deports"}));
         oPanelFDInput.addContent(oPortsDeportsForm);
         oPanelFDInput.addStyleClass("fontStyle14");
	     
	     var oPortsLayout = new sap.ui.layout.form.ResponsiveLayout("idFDPortsLayout");
	        var oPortsForm = new sap.ui.layout.form.Form("idFDPortsForm",{
	           layout: oPortsLayout,
	           formContainers: [
	                   new sap.ui.layout.form.FormContainer("idFDPortsFormC1",{
	                       formElements: [	                                      
			                               new sap.ui.layout.form.FormElement("idFDResultsLayout",{
			                                   fields: [],
			                               })
		                               ],
	                               layoutData: new sap.ui.commons.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
	                   })
					           ]
	        });
	        
			var oFlexboxPortsDeports = new sap.m.FlexBox({
			      items: [
			        oPortsDeportsForm,
			        vFDHDivider,
			        oPortsForm
			      ],
			      direction: "Column"
			    });
			        return oFlexboxPortsDeports;

	},
	
	showPortsDeports: function(){
    	// collapse panel on click of submit button
    	oPanelFDInput.setCollapsed(true);
    	
    	busyDialog.open();
    	
    	var countryPass1FD = "";
    	var countryPass2FD = "";
    	var cityPass1FD = "";
    	var cityPass2FD = "";
    	
    	var selctdRegionFDPD = $("#idBComboRegionFD").val();
    	var selctdCountryFDPD = $("#idBComboCountryFD").val();
    	var selctdCityFDPD = $("#idBComboCityFD").val(); 
    	
    	var selCountryArrayFDPD = selctdCountryFDPD.split("$");

    	var selCityArrayFDPD = selctdCityFDPD.split("$");
    	var selectedCountriesLen = selCountryArrayFDPD.length;
    	if(selctdCountryFDPD != ""){
	    	if(selectedCountriesLen>15){
	                        for(var i=0;i<15;i++){
	                        	countryPass1FD = countryPass1FD + selCountryArrayFDPD[i]+"$";
	                        }
	                        for(var j=15;j<selectedCountriesLen;j++){
	                        	countryPass2FD = countryPass2FD + selCountryArrayFDPD[j]+"$";
	                        }
	                }
	    	else{
	                        for(var k=0;k<selectedCountriesLen;k++){
	                        	countryPass1FD = countryPass1FD + selCountryArrayFDPD[k]+"$";
	                        }
	                }
    	}
    	
    	var selectedCitiesLen = selCityArrayFDPD.length;
    	if(selctdCityFDPD != ""){
	    	if(selectedCitiesLen>15){
	                        for(var i=0;i<15;i++){
	                        	cityPass1FD = cityPass1FD + selCityArrayFDPD[i]+"$";
	                        }
	                        for(var j=15;j<selectedCountriesLen;j++){
	                        	cityPass2FD = cityPass2FD + selCityArrayFDPD[j]+"$";
	                        }
	                }
	    	else{
	                        for(var k=0;k<selectedCitiesLen;k++){
	                        	cityPass1FD = cityPass1FD + selCityArrayFDPD[k]+"$";
	                        }
	                }
    	}
    	
		oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
		var urlToCallFD = serviceUrl + "/Depot_Details?$filter=RegionDes  eq'" + selctdRegionFDPD +"' and CountryDes eq '" + countryPass1FD + "' and CountryDes1 eq '"+ countryPass2FD +"' and CityDes eq '"+ cityPass1FD + "' and CityDes1 eq '"+ cityPass2FD + "'";
		//alert("urlToCallFD : "+urlToCallFD);
		OData.request({ 
		      requestUri: urlToCallFD,
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
		    	aPortsDeportsFD = [];
		    	//alert("data.results.length : "+data.results.length);
		    	if(data.results.length == 0){
		    		 busyDialog.close();
		    		sap.ui.commons.MessageBox.show("No Result Found. Please try again.",
                            sap.ui.commons.MessageBox.Icon.WARNING,
                            "Warning",
                            [sap.ui.commons.MessageBox.Action.OK],
                            sap.ui.commons.MessageBox.Action.OK);
                   
		    	}
		    	else{
		    		var oFlexBoxFDResObj = oCurrPDFD.createTableFD();
		    		var oPortsDeportsFormElement = sap.ui.getCore().byId("idFDResultsLayout");
		        	oPortsDeportsFormElement.insertField(oFlexBoxFDResObj,0);
		        	
		    	for(var i=0;i<data.results.length;i++){
		    		if(data.results[i].FlagLegend.trim() != "X"){
		    			aPortsDeportsFD.push(data.results[i]);
		    		}
		    		if(data.results[i].FlagLegend == "X"){
		    			//alert("found X");
		    			if(data.results[i].UnitTypeLegend2 == ""){
		    				//alert("legend 2 blank");
		    				flagLegendFD = data.results[i].UnitTypeLegend1;
		    				sap.ui.getCore().byId("lblFDFlagLegend").setText(flagLegendFD);
		    				//alert("flagLegendFD : "+flagLegendFD);
		    			}
		    			else{
		    				//alert("legend 1 n 2 both hav val");
		    			flagLegendFD = data.results[i].UnitTypeLegend1 + data.results[i].UnitTypeLegend2;
		    			sap.ui.getCore().byId("lblFDFlagLegend").setText(flagLegendFD);
		    			//alert("flagLegendFD : "+flagLegendFD);
		    			}
		    		}
		    	}
		    	
		    	/*if(selectedCountriesLen == 1){
		    		sap.ui.getCore().byId("idTblColCountryFDPD").setVisible(false);
		    	}
		    	else{
		    		sap.ui.getCore().byId("idTblColCountryFDPD").setVisible(true);
		    	}*/
		    	
		    	var count = selCountryArrayFDPD.length;
                //alert("count " + count);
                if(count == 1 && selctdCountryFDPD != ""){
                        sap.ui.getCore().byId("idTblColCountryFDPD").setVisible(false);
                }
                else if(selctdCountryFDPD == ""){

                        var TempCountry = [];

                        for(var k=0;k<aPortsDeportsFD.length;k++){
                                TempCountry[k] = aPortsDeportsFD[k].Country;
                        }

                        var oUtil = new utility();
                        TempCountry = oUtil.unique(TempCountry);

                        if(TempCountry.length == 1){
                                sap.ui.getCore().byId("idTblColCountryFDPD").setVisible(false);
                        }
                        else{
                                sap.ui.getCore().byId("idTblColCountryFDPD").setVisible(true);
                        }
                }
                else{
                        sap.ui.getCore().byId("idTblColCountryFDPD").setVisible(true);
                }

                oModelPortsDeportsFD.setData({modelData: aPortsDeportsFD});
		    	sap.ui.getCore().byId("idFDPortsDepotsTable").setModel(oModelPortsDeportsFD);
		    	sap.ui.getCore().byId("idFDPortsDepotsTable").bindRows("/modelData");
		    	sap.ui.getCore().byId("idFDPortsDepotsTable").updateBindings();
                
		    	if (aPortsDeportsFD.length < 25){
		    		sap.ui.getCore().byId("idFDPortsDepotsTable").setVisibleRowCount(aPortsDeportsFD.length);
		    		sap.ui.getCore().byId("idFDPortsDepotsTable").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		    		sap.ui.getCore().byId("idFDbtnViewAll").setVisible(false);
		    	}
		    	else{
		    		sap.ui.getCore().byId("idFDPortsDepotsTable").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		    		sap.ui.getCore().byId("idFDPortsDepotsTable").setVisibleRowCount(25);
		    		sap.ui.getCore().byId("idFDbtnViewAll").setVisible(true);
		    	}
		    	busyDialog.close();
		    }
		    },
		    function(err){
		    	 busyDialog.close();
		    	 errorfromServer(err);
		    	//alert("Error while Reading Result : "+ window.JSON.stringify(err.response));
		    });
    },
    
    createTableFD: function(){
    	/*if(sap.ui.getCore().byId("lblFDFlagLegend")){
    		sap.ui.getCore().byId("lblFDFlagLegend").destroy();
    	}
    	if(sap.ui.getCore().byId("idFDbtnViewAll")){
    		sap.ui.getCore().byId("idFDbtnViewAll").destroy();
    	}
    	if(sap.ui.getCore().byId("idFDbtnShowAll")){
    		sap.ui.getCore().byId("idFDbtnShowAll").destroy();
    	}
    	if(sap.ui.getCore().byId("idFDPortsDepotsTable")){
    		sap.ui.getCore().byId("idFDPortsDepotsTable").destroy();
    	}*/
    	if(sap.ui.getCore().byId("idFDFlexAll")){
    		sap.ui.getCore().byId("idFDFlexAll").destroy();
    	}
    	
    	// Labels
		var oLabelFDInfo = new sap.ui.commons.Label("lblFDFlagLegend",{
            wrapping: true}).addStyleClass("margin10");
		
		// Buttons
		var oBtnPortsDeportsViewAll = new sap.m.Button("idFDbtnViewAll",{
            text : "View All",
            styled:false,
            layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: false, margin: true}),
            //icon: "images/view_all.png",
            press:function(){
            	//alert("view all");
            	this.setVisible(false);
            	if (aPortsDeportsFD.length < 100){
		    		sap.ui.getCore().byId("idFDPortsDepotsTable").setVisibleRowCount(aPortsDeportsFD.length);
		    		sap.ui.getCore().byId("idFDPortsDepotsTable").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		    	}
		    	else{
		    		sap.ui.getCore().byId("idFDPortsDepotsTable").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		    		sap.ui.getCore().byId("idFDPortsDepotsTable").setVisibleRowCount(100);
		    	}
            	}
         }).addStyleClass("submitBtn");
		
		var oBtnPortsDeportsShowAll = new sap.m.Button("idFDbtnShowAll",{
            text : "Show All",
            styled:false,
            layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: true, margin: true}),
            //icon: "images/view_all.png",
            press:function(){
            	//alert("show all");
            	/*if(sap.ui.getCore().byId("DepotInfoExport")){
			  		sap.ui.getCore().byId("DepotInfoExport").destroy(); 
			  	  }*/
            	 
            	var depInfExpFDPDObj = new depInfoExportView();
            	
            	var bus = sap.ui.getCore().getEventBus();
    	  		bus.publish("nav", "to", {
    		    id : "DepotInfoExport"
    	    });
    	  		depInfExpFDPDObj.bindArrForExpPDFFD();
            	}
         }).addStyleClass("submitBtn");
	
		// Flex Boxes
		var oFlexFDLabel = new sap.m.FlexBox({
           items: [
                   oLabelFDInfo,
           ],
           direction : sap.m.FlexDirection.RowReverse,
           width:"90%"
			});
		
		var oFlexFDBtnShow = new sap.m.FlexBox({
	           items: [
	                   oBtnPortsDeportsShowAll,
	           ],
	           direction : "Row",
	           width:"10%"
				});
		
		var oFlexFDLegendShowAll = new sap.m.FlexBox({
	           items: [
	                   oFlexFDBtnShow,
	                   oFlexFDLabel
	           ],
	           direction : "Row",
	           width:"100%"
				}).addStyleClass("marginTop10");
    	
    	// Table
    	var oPortsDeportsTable = new sap.ui.table.Table("idFDPortsDepotsTable",{
    		visibleRowCount: 5,
            firstVisibleRow: 1,
            columnHeaderHeight: 30,
            selectionMode: sap.ui.table.SelectionMode.None,
            navigationMode: sap.ui.table.NavigationMode.Paginator,
            height:"100%"
    	 }).addStyleClass("tblBorder");
    	
    	// Table Columns
    	oPortsDeportsTable.addColumn(new sap.ui.table.Column("idTblColCountryFDPD",{
         label: new sap.ui.commons.Label({text: "Country"}),
         template: new sap.ui.commons.TextView().bindProperty("text", "Country").addStyleClass("wraptext"),
         resizable:false,
         sortProperty: "Country",
         filterProperty: "Country",
         width:"120px"
    	 }));
    	 
    	oPortsDeportsTable.addColumn(new sap.ui.table.Column({
    		 label: new sap.ui.commons.Label({text: "City"}),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "City").addStyleClass("wraptext"),
    		 resizable:false,
             sortProperty: "City",
             filterProperty: "City",
             width:"120px"
    		 }));
    	 
    	oPortsDeportsTable.addColumn(new sap.ui.table.Column({
			 label: new sap.ui.commons.Label({text: "Depot Code"}),
			 resizable:false,
			 template: new sap.ui.commons.Link({
			press : function() {
				busyDialog.open();
				var selectedDepotCode = this.getText();
				var oDepotInfoObj = new depotInfoView();
				busyDialog.close();
				/*if(sap.ui.getCore().byId("DepotInfo")){
			  		sap.ui.getCore().byId("DepotInfo").destroy(); 
			  	  }*/
					var bus = sap.ui.getCore().getEventBus();
	        	  		bus.publish("nav", "to", {
	        		    id : "DepotInfo"
	        	    }); 
	        	  		oDepotInfoObj.fetchDepotInfo(selectedDepotCode);
			}
		}).bindProperty("text", "DepotCode").addStyleClass("wraptext"),
	         sortProperty: "DepotCode",
	         filterProperty: "DepotCode",
	         width:"100px"
			 }));
    	 
    	oPortsDeportsTable.addColumn(new sap.ui.table.Column({
    		 label: new sap.ui.commons.Label({text: "Depot Name"}),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "DepotName").addStyleClass("wraptext"),
    		 resizable:false,
             sortProperty: "DepotName",
             filterProperty: "DepotName",
             width:"150px"
    		 }));
    	 
    	oPortsDeportsTable.addColumn(new sap.ui.table.Column({
    		 label: new sap.ui.commons.Label({text: "Contact Number"}),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "ContactNo").addStyleClass("wraptext"),
    		 resizable:false,
             sortProperty: "ContactNo",
             filterProperty: "ContactNo",
             width:"120px"
    		 }));
    	 
    	oPortsDeportsTable.addColumn(new sap.ui.table.Column({
    		 label: new sap.ui.commons.Label({text: "E-mail"}),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "Email").addStyleClass("wraptext"),
    		 resizable:false,
             sortProperty: "Email",
             filterProperty: "Email",
             width:"200px"
    		 }));
    	
    	oPortsDeportsTable.addColumn(new sap.ui.table.Column({
    		 label: new sap.ui.commons.Label({text: "Cargo Type"}),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "CargoType").addStyleClass("wraptext"),
    		 resizable:false,
             sortProperty: "CargoType",
             filterProperty: "CargoType",
             width:"200px"
    		 }));
    	   	 
    	// Flex Box
    	 var oFlexBoxFDRes = new sap.m.FlexBox("idFDFlexAll",{
   		  items: [
					oPortsDeportsTable,
					oBtnPortsDeportsViewAll,
					oFlexFDLegendShowAll

      		  ],
      		direction: "Column"
      		});  
    	
    	 return oFlexBoxFDRes;
    	 
    }
});
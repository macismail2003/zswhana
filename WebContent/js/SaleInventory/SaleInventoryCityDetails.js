
var CusotmJsonForHelpIdSIDetail = [];
var vMakeAnOfferHelpValSI= "";
var LoggedInMakeAnOfferButton;
sap.ui.model.json.JSONModel.extend("saleInvCityDetView", {
	
	createSaleInvCityDet: function(){
		  var oUtil = new utility();
		  
		 $('#idHdrContnt').html("Sale Inventory City Details");
		 var backToSaleInventory = new sap.m.Link("idBackToSaleInventory", {text: " < Back",
       	  width:"7%",
       	  wrapping:true,
       	  press: function(){
       		$('#idHdrContnt').html("Sale Inventory Overview");
       		  var bus = sap.ui.getCore().getEventBus();
       			bus.publish("nav", "back");
      	  }});
		 
		// Buttons
			var oBtnExport = new sap.m.Button({
	            text : "Export To Excel",
	            type:sap.m.ButtonType.Unstyled,
	            icon: sap.ui.core.IconPool.getIconURI("excel-attachment"),
	            press:function(){
	            	//objUtil = new utility();
	            	//alert("vTitle " + vTitle);
	            	objUtil.makeHTMLTable(jsonSaleInvCityDetExportToExcel, "Sale Inventory City Details","export");
	            	//tableToExcel("idAccountDetailTbl-table",vTitle,vColLen);
	            }
	         }).addStyleClass("submitBtn");
			var oFlexExpBtn = new sap.m.FlexBox({
	            items: [
	                    oBtnExport
	            ],
	            width:"70%",
	            direction:"RowReverse"
		});
			
		var oBtnViewAll = new sap.m.Button("idBtnViewAllSaleInvDetail",{
            text : "View All",
            styled:false,
            width:"80px",
            press:function(){
            	this.setVisible(false);
	        	var vArrayLength = SaleInvResult.SIDetVal.length;
	        	if(vArrayLength < 100){
	        		sap.ui.getCore().byId("idSaleInvDetTbl").setVisibleRowCount(vArrayLength);
	        		sap.ui.getCore().byId("idSaleInvDetTbl").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
	        	}
	        	else{
	        		sap.ui.getCore().byId("idSaleInvDetTbl").setVisibleRowCount(100);
	        		sap.ui.getCore().byId("idSaleInvDetTbl").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
	        	}
            }
         }).addStyleClass("submitBtn marginTop10");
		
		// Flex Box
	   	var oFlexBoxViewAll = new sap.m.FlexBox({
	  		  items: [
	  		          oBtnViewAll
	     		  ],
	     		  direction: "Row"
	     		}); 
		
		// Table
    	var oCityDetailsTable = new sap.ui.table.Table("idSaleInvDetTbl",{
    		visibleRowCount: 5,
            firstVisibleRow: 3,
            columnHeaderHeight: 45,
            //fixedColumnCount:1,
            width:"70%",
            selectionMode: sap.ui.table.SelectionMode.None,
            navigationMode: sap.ui.table.NavigationMode.Paginator,
    	 }).addStyleClass("tblBorder marginTop10");
    	
    	// Table Columns
    	oCityDetailsTable.addColumn(new sap.ui.table.Column({
    		label: new sap.ui.commons.Label({text: "City"}).addStyleClass("wraptextcol"),
	         template: new sap.ui.commons.TextView().bindProperty("text", "City"),
	         sortProperty: "City",
	         filterProperty: "City",
	         width:"100px",
	         resizable:false
	    	 }));
    	 
    	oCityDetailsTable.addColumn(new sap.ui.table.Column({
    		label: new sap.ui.commons.Label({text: "Unit Type Description"}).addStyleClass("wraptextcol"),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "UnitTypeDesc"),
             sortProperty: "UnitTypeDesc",
             filterProperty: "UnitTypeDesc",
             width:"150px",
	         resizable:false
    		 }));
    	
    	oCityDetailsTable.addColumn(new sap.ui.table.Column({
    		label: new sap.ui.commons.Label({text: "Sale Grade"}).addStyleClass("wraptextcol"),
            template: new sap.ui.commons.TextView().bindProperty("text", "SaleGrade"),
            sortProperty: "SaleGrade",
            filterProperty: "SaleGrade",
            width:"80px",
	         resizable:false
       	 }));
       	 
    	var oAgeColumn  = new sap.ui.table.Column({
       		label: new sap.ui.commons.Label({text: "Age"}).addStyleClass("wraptextcol"),
      		 template: new sap.ui.commons.TextView().bindProperty("text", "AgeCategory"),
               sortProperty: "AgeCategory",
               filterProperty: "AgeCategory",
               width:"90px",
  	         resizable:false
      		 });
    	
    	
    	oCityDetailsTable.addColumn(oAgeColumn);
 	    oUtil.addColumnSorterAndFilter(oAgeColumn, oUtil.compareUptoCount);
 	    
 	    
       	/*oCityDetailsTable.addColumn(new sap.ui.table.Column({
       		label: new sap.ui.commons.Label({text: "Age"}),
       		 template: new sap.ui.commons.TextView().bindProperty("text", "AgeCategory"),
                sortProperty: "AgeCategory",
                filterProperty: "AgeCategory",
                width:"90px",
   	         resizable:false
       		 }));*/
       	
       	var oCountCol = new sap.ui.table.Column({
       		label: new sap.ui.commons.Label({text: "Count"}).addStyleClass("wraptextcol"),
            template: new sap.ui.commons.TextView().bindProperty("text", "ActualCount"),
            sortProperty: "ActualCount",
            filterProperty: "ActualCount",
            width:"70px",
	         resizable:false
       	 });
       	 
       	oCityDetailsTable.addColumn(oCountCol);
 	    oUtil.addColumnSorterAndFilter(oCountCol, oUtil.compareUptoCount);
 	    
       	oCityDetailsTable.addColumn(new sap.ui.table.Column("idMakeAnOfferColSI",{
    		label: new sap.ui.commons.Label({text: "Offer To Buy"}).addStyleClass("wraptextcol"),
			 template: new sap.ui.commons.Link({
				 text:"Make an Offer",
					press : function() {
						//alert("help id " + this.getHelpId());
						vMakeAnOfferHelpValSI = this.getHelpId();
						/*if(sap.ui.getCore().byId("SaleInvMakeOffer")){
							sap.ui.getCore().byId("SaleInvMakeOffer").destroy();
						}*/
			        	  var bus = sap.ui.getCore().getEventBus();
			        	  bus.publish("nav", "to", {
		                  id : "SaleInvMakeOffer"
		              }); 
			        	  var objSIMakeAnOffer = new saleInvMakeOfferView();
			        	  objSIMakeAnOffer.createSaleInvMakeOfferForm();
			          }
				}).bindProperty("helpId","MakeAnOfferHelp"), //.bindProperty("enabled","isEnabledMakeAnOffer"),
			         width:"100px",
			         resizable:false
					 }));
    	
    	
    	// Responsive Grid Layout
	    var oCityDetailsLayout = new sap.ui.layout.form.ResponsiveGridLayout("idCityDetailsLayout");
   	 
		  // Online Form Starts
		     var oCityDetailsForm = new sap.ui.layout.form.Form("idCityDetailsForm",{
		             layout: oCityDetailsLayout,
		             formContainers: [
		                     
		                     new sap.ui.layout.form.FormContainer("idCityDetailsFormC1",{
		                            // title: "Sale Inventory Overview - City Details",
		                             formElements: [
													new sap.ui.layout.form.FormElement({
													    fields: [backToSaleInventory]
													}),
													
													new sap.ui.layout.form.FormElement({
													    fields: [oFlexExpBtn]
													}),
													new sap.ui.layout.form.FormElement({
													    fields: [oCityDetailsTable]
													}),
													
													new sap.ui.layout.form.FormElement({
													    fields: [oFlexBoxViewAll]
													})
		                                     ]
		                     })                    
		             ]
		     });
		     	return oCityDetailsForm;
	}, //createSaleInvCityDet
	
	setSaleInvDetailView: function(){
		SaleInvResult.SIDetVal=[];
		var aFrmPrev = [];
		var TempArray = [];
		CusotmJsonForHelpIdSIDetail = [];
		jsonSaleInvCityDetExportToExcel = [];
		TempArray = jQuery.grep(SaleInAllData, function(element, index){
            return element.SumFlag != "X" && element.DetlFlag == "X" && element.City == selCitySI;
 	   	  });
		var cityDetLen = TempArray.length;
		aFrmPrev = helpIdCityDetailsSI.split("$");
		var toCompHelpVal = aFrmPrev[1]+ "$" + aFrmPrev[2];
		for(var j=0 ; j <cityDetLen ;j++){
			var helpVal = TempArray[j].City + "$" + TempArray[j].UnitTypeDesc;
			if(helpVal == toCompHelpVal){
				SaleInvResult.SIDetVal.push({
					"City":TempArray[j].City,
					"UnitTypeDesc":TempArray[j].UnitTypeDesc,
					"SaleGrade":TempArray[j].SaleGrade,
					"AgeCategory":TempArray[j].AgeCategory,
					"ActualCount":TempArray[j].ActualCount,
				});
			}
		}
		
		//security
		// var objUser = new loggedInU();
		 LoggedInMakeAnOfferButton = objLoginUser.filterLoggedInUserData("BUTTON");
		if(LoggedInMakeAnOfferButton.length > 0){
			sap.ui.getCore().byId("idMakeAnOfferColSI").setVisible(true);
		}
		else{
			sap.ui.getCore().byId("idMakeAnOfferColSI").setVisible(false);
		}
		
		for(var i=0;i<SaleInvResult.SIDetVal.length;i++){
			CusotmJsonForHelpIdSIDetail.push({
				"City":SaleInvResult.SIDetVal[i].City,
				"UnitTypeDesc":SaleInvResult.SIDetVal[i].UnitTypeDesc,
				"SaleGrade":SaleInvResult.SIDetVal[i].SaleGrade,
				"AgeCategory":SaleInvResult.SIDetVal[i].AgeCategory,
				"ActualCount":SaleInvResult.SIDetVal[i].ActualCount,
				"MakeAnOfferHelp":SaleInvResult.SIDetVal[i].City + "$" + SaleInvResult.SIDetVal[i].UnitTypeDesc + "$" + SaleInvResult.SIDetVal[i].SaleGrade + "$" + SaleInvResult.SIDetVal[i].AgeCategory + "$" +SaleInvResult.SIDetVal[i].ActualCount,
			}); //"isEnabledMakeAnOffer":	false
			
			jsonSaleInvCityDetExportToExcel.push({
				"City":SaleInvResult.SIDetVal[i].City,
				"Unit Type Description":SaleInvResult.SIDetVal[i].UnitTypeDesc,
				"Sale Grade":SaleInvResult.SIDetVal[i].SaleGrade,
				"Age":SaleInvResult.SIDetVal[i].AgeCategory,
				"Count":SaleInvResult.SIDetVal[i].ActualCount,
			});
		}
		
		var oModelSaleInvDetail = new sap.ui.model.json.JSONModel();
		oModelSaleInvDetail.setData({modelData : CusotmJsonForHelpIdSIDetail});
        var vInvDetailTable = sap.ui.getCore().byId("idSaleInvDetTbl");
        vInvDetailTable.setModel(oModelSaleInvDetail);
        vInvDetailTable.bindRows("/modelData");
        oModelSaleInvDetail.updateBindings();
        
        vViewAllSaleInvDetail = sap.ui.getCore().byId("idBtnViewAllSaleInvDetail");
        if (SaleInvResult.SIDetVal.length < 25){
        	vInvDetailTable.setVisibleRowCount(SaleInvResult.SIDetVal.length);
        	vInvDetailTable.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
        	vViewAllSaleInvDetail.setVisible(false);
        }
	    else{
    		vInvDetailTable.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
    		vInvDetailTable.setVisibleRowCount(25);
    		vViewAllSaleInvDetail.setVisible(true);
	    }
	    		
      /*  //set summary variables
        var summary = "Region: " + DepotSearchResult.itemVal[0].IRegion + " || Country: " + DepotSearchResult.itemVal[0].Country + " || City: " + DepotSearchResult.itemVal[0].City + " || Unit Type: " +  DepotSearchResult.itemVal[0].MatlDescr;
        sap.ui.getCore().byId("summaryText").setText(summary);*/
        busyDialog.close();
	}
});
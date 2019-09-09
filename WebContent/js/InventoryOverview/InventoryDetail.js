/*
 *	ClassName -  InventoryDetail 
 *  Developed 
 *   createdetailView : to create the detail view when user selects a city to view its Depot.
 *   setInvDetailView : to set the data to the view after fetchiong the data
 *  
*/

var selectedRegion = "";
var selectedCountry = "";
var selectedCity  = "";
var selectedUnitType  = "";
var vDetTable;
var vViewAllDepotDetail;
sap.ui.model.json.JSONModel.extend("InventoryDetail", {
	
	createdetailView:function(){
		var oFlexboxInvDetDIFlexBox = new sap.m.FlexBox("idInvDetailDIFlxBox",{
            items: [],
            direction: "Row",
            	//width:"100%"
		  });
		
		return oFlexboxInvDetDIFlexBox;
	},
	
	
	createdetailViewForm: function(){
		sap.ui.getCore().byId("idInvDetailDIFlxBox").destroyItems();
		 var browser = sap.ui.Device.browser.chrome;
		 var oLayout;
		 if(browser){
			 oLayout = new sap.ui.layout.form.ResponsiveGridLayout("DetailLayout",{
           	  labelSpanL: 1,
	              labelSpanM: 1,
	              labelSpanS: 1,
	              emptySpanL: 0,
	              emptySpanM: 0,
	              emptySpanS: 0,
	              columnsL: 1,
	              columnsM: 1,
	              columnsS: 1,
	              breakpointL: 765,
	              breakpointM: 320
             });
		 }
		 else{
			  oLayout = new sap.ui.layout.form.ResponsiveGridLayout("DetailLayout",{
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
		 }
			
              var backToInventory = new sap.m.Link("backToInventory", {text: " < Back",
            	  width:"7%",
            	  wrapping:true,
            	  press: function(){
            		  var bus = sap.ui.getCore().getEventBus();
            			bus.publish("nav", "back");
           	  }});
             /* var newInventory = new sap.m.Link("newInventory", {text: "New Inventory Search",
            	  width:"22%",
            	  wrapping:true,
            	  press: function(){
            		  //sap.ui.getCore().byId("InventoryDetail").getController().NewSearchForm();
            		  var bus = sap.ui.getCore().getEventBus();
          			//bus.publish("nav", "back");
            		  var bus = sap.ui.getCore().getEventBus();
            		  bus.publish("nav", "to", {
            				id : "InventorySearch",
            		  });
            		  sap.ui.getCore().byId("InventoryDetail").getController().NewSearchForm();
          		  }
              });*/
            
              var oDetailInventoryTable = new sap.ui.table.Table("idDetailInvTable",{
                      visibleRowCount: 25,
                      firstVisibleRow: 3,
                      columnHeaderHeight: 30,
                      selectionMode: sap.ui.table.SelectionMode.None,
                      navigationMode: sap.ui.table.NavigationMode.Paginator,
                      //width: "70%",
                           }).addStyleClass("tblBorder marginTop10");
             
     		 if(browser && widthOfDoc <= 1280){
     			 sap.ui.getCore().byId("idDetailInvTable").setWidth("100%");
     		 }
     		 else if (browser && widthOfDoc > 1280){
     			 sap.ui.getCore().byId("idDetailInvTable").setWidth("70%");
     		 }
     		 else if(!browser){
     			 sap.ui.getCore().byId("idDetailInvTable").setWidth("");
     		 }
              
              oDetailInventoryTable.addColumn(new sap.ui.table.Column({
                  label: new sap.ui.commons.Label({text: "City"}),
                  template: new sap.ui.commons.TextView().bindProperty("text", "City"),
                  sortProperty: "City",
                  filterProperty: "City",
                  resizable:false,
                  width:"100px"
              }));
              oDetailInventoryTable.addColumn(new sap.ui.table.Column({
                  label: new sap.ui.commons.Label({text: "Unit Type"}),
                  template: new sap.ui.commons.TextView().bindProperty("text", "MatlDescr"),
                  sortProperty: "MatlDescr",
                  filterProperty: "MatlDescr",
                  resizable:false,
                  width:"150px"
              }));
              oDetailInventoryTable.addColumn(new sap.ui.table.Column({
                      label: new sap.ui.commons.Label({text: "Depot Name"}),
                      template: new sap.ui.commons.TextView().bindProperty("text", "DepoName"),
                      sortProperty: "DepoName",
                      filterProperty: "DepoName",
                      resizable:false,
                      width:"200px"
              }));
             
              oDetailInventoryTable.addColumn(new sap.ui.table.Column({
                      label: new sap.ui.commons.Label({text: "Count"}),
                      template: new sap.ui.commons.TextView().bindProperty("text", "DispCount"),
                      sortProperty: "DispCount",
                      filterProperty: "DispCount",
                      resizable:false,
                      width:"50px"
              }));
            
              var oDataset = new sap.viz.ui5.data.FlattenedDataset({

                dimensions : [ 
                        {
                                axis : 1, // must be one for the x-axis, 2 for y-axis
                                name : 'Depot Name', 
                                value : "{DepoName}"
                        } 
                ],
                measures : [ 
                        {
                                name : 'Inventory', // 'name' is used as label in the Legend 
                                value : '{ActCount}' // 'value' defines the binding for the displayed value   
                        },
                ],
                data : {
                        path : "/itemVal"
                }
              });

              var oInventoryDetailDonut = new sap.viz.ui5.Donut("idInvDetDonut",{
                  width : "100%",
                  height:"300px",
                 // title:new sap.viz.ui5.types.Title({visible:false}),
                 //legend:new sap.viz.ui5.types.legend.Common({visible:false}),
                //  dataLabel: new sap.viz.ui5.types.Datalabel({visible:false,outsideVisible:true}),
                  plotArea : new sap.viz.ui5.types.Pie({colorPalette:donutColor}),
                  title : {
                          visible : false,
                  },
                  dataset : oDataset
              }).addStyleClass("marginTop10");
              var oTxtDisclaimerTitle = new sap.m.Text({text: "Disclaimer"}).addStyleClass("font11Bold");
      			var oInventoryGraphTxt = new sap.m.Text(
      				 {text: "Every effort has been made to ensure the information provided is correct. The count shown in the tables are indicative only and it may"+
      				 	" from time to time be changed without notification. Seaco or its employees or contractors are not responsible for any incorrect information"+
      				 	" and we therefore are not liable in anyway for inaccuracies or errors. Users are adviced to consult with Seaco directly for any further information.",
      				 	maxLines : 5}).addStyleClass("font11Light");
      		 
      		var oFlexboxDisclaimer = new sap.m.FlexBox("idFlexBoxInvDetDisclaimer",{
      			  items: [
      			    oTxtDisclaimerTitle,
      			  oInventoryGraphTxt
      			  ],
      			  direction: "Column"
      			}).addStyleClass("marginTop10");
           /*   var oInventoryGraphTxt = new sap.m.Text("txtGraphText",
                           {text: "Every effort has been made to ensure the information provided is correct. The count shown in the tables are indicative only and it may"+
           				 	" from time to time be changed without notification. Seaco or its employees or contractors are not responsible for any incorrect information"+
        				 	" and we therefore are not liable in anyway for inaccuracies or errors. Users are adviced to consult with Seaco directly for any further information.",
                                 maxLines : 3}).addStyleClass("font11Light");*/
              var oInventoryDetPanel = new sap.m.Panel("idInvDetDonutPanel",{width:"100%"}).addStyleClass("marginTop10");
              oInventoryDetPanel.addContent(oInventoryDetailDonut);
             // oInventoryDetPanel.addContent(oInventoryGraphTxt);
              
              var currentDate = dateFormat(new Date(),'dd-mm-yyyy HH:MM');
              var oBtnViewAll =new sap.m.Button("idBtnViewAllDetails",{
  		        text : "View All",
  		        styled:false,
  		       // icon: "images/view_all.png",
  		        press:function(){
  		        	this.setVisible(false);
  		        	var vArrayLength = DepotSearchResult.itemVal.length;
		        	if(vArrayLength < 100){
		        		sap.ui.getCore().byId("idDetailInvTable").setVisibleRowCount(vArrayLength);
		        		sap.ui.getCore().byId("idDetailInvTable").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		        	}
		        	else{
		        		sap.ui.getCore().byId("idDetailInvTable").setVisibleRowCount(100);
		        		sap.ui.getCore().byId("idDetailInvTable").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		        	}
  		        },
  		        visible : false
  		     }).addStyleClass("submitBtn marginTop10");
         var oDetailForm = new sap.ui.layout.form.Form("DetailF1",{
                 layout: oLayout,
                 formContainers: [
                         new sap.ui.layout.form.FormContainer("DetailF1C1",{
                             formElements: [
                                     new sap.ui.layout.form.FormElement({
                                             fields: [backToInventory],  //,newInventory
                                             layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                                     }),
                                     new sap.ui.layout.form.FormElement({
                                             fields: [ new sap.m.Text({text:"Depot Inventory as of " + resultDate}).addStyleClass("fontTitle marginTop10") ],
                                             layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                                     }),
                                     new sap.ui.layout.form.FormElement({
                                         fields: [ new sap.m.Text("summaryText").addStyleClass("fontTitle marginTop10") ],
                                         layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                                     }),
                                     new sap.ui.layout.form.FormElement({
                                         fields: [ ] //oExportToolbar]
                                 }),
                                 new sap.ui.layout.form.FormElement({
                                         fields: [oDetailInventoryTable],
                                       //  layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                                 }),
                                 new sap.ui.layout.form.FormElement({
                                     fields: [oBtnViewAll],
                                   //  layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                             }),
                             new sap.ui.layout.form.FormElement({
                                     fields: [oInventoryDetPanel],
                                    // layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                                     }),
                              new sap.ui.layout.form.FormElement({
                                    fields: [oFlexboxDisclaimer],
                                     //layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                                         })
                             ]
                         }),
                         new sap.ui.layout.form.FormContainer("DetailF1C2",{
                             formElements: [
                                    
                                     
                            ]//,layoutData: new sap.ui.commons.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                         }),
                        /* new sap.ui.layout.form.FormContainer("F1C3",{
                                 formElements: [
                                         new sap.ui.layout.form.FormElement({
                                         fields: [oInventoryDetPanel],
                                         })
                                 ],layoutData: new sap.ui.commons.layout.ResponsiveFlowLayoutData({linebreak: true, margin: true})
                         })*/
                 ]
         });
         
         sap.ui.getCore().byId("idInvDetailDIFlxBox").addItem(oDetailForm);
       //  return oDetailForm;
	},
	
	setInvDetailView: function(){
		  DepotSearchResult.itemVal=[];
          DepotSearchResult.itemVal = jQuery.grep(DepotSearchResult.Detail, function(element, index){
              return element.SumFlag != "X" && element.City == selCity && element.MatlDescr == selUnitType ;
   	   	  });
          
          oModelDepotSearchResult.setData(DepotSearchResult);
          var vInvDetailTable = sap.ui.getCore().byId("idDetailInvTable");
          vInvDetailTable.setModel(oModelDepotSearchResult);
          vInvDetailTable.bindRows("/itemVal");
          oModelDepotSearchResult.updateBindings();
          vDetTable = sap.ui.getCore().byId("idDetailInvTable");
          vViewAllDepotDetail = sap.ui.getCore().byId("idBtnViewAllDetails");
          if (DepotSearchResult.itemVal.length < 25){
        	  vDetTable.setVisibleRowCount(DepotSearchResult.itemVal.length);
          	  vDetTable.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
          	vViewAllDepotDetail.setVisible(false);
          }
	    	else{
	    		vDetTable.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
	    		vDetTable.setVisibleRowCount(25);
	    		vViewAllDepotDetail.setVisible(true);
	    	}
	    		
          //Set Chart model
          var vInvDetailDonut = sap.ui.getCore().byId("idInvDetDonut");
          vInvDetailDonut.setModel(oModelDepotSearchResult);
          var vGraphTitle = "Inventory: " + DepotSearchResult.itemVal[0].City + " & " + DepotSearchResult.itemVal[0].MatlDescr;
          var vDonutPanel = sap.ui.getCore().byId("idInvDetDonutPanel");
          vDonutPanel.setHeaderText(vGraphTitle);
          
          //set summary variables
          var summary = "Region: " + DepotSearchResult.itemVal[0].IRegion + " || Country: " + DepotSearchResult.itemVal[0].Country + " || City: " + DepotSearchResult.itemVal[0].City + " || Unit Type: " +  DepotSearchResult.itemVal[0].MatlDescr;
          sap.ui.getCore().byId("summaryText").setText(summary);
          busyDialog.close();
	}
});

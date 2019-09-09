jQuery.sap.require("sap.ui.model.json.JSONModel");
var inventoryController;
var oInventory;
var objUtil;
var InventoryResultData = {
		   InventoryResult:[]
};
var jsonInventory = [];

sap.ui.model.json.JSONModel.extend("inventorySearch", {
	createInventorySearch: function(oController){
		
		objUtil = new utility();
		
		var oinventoryAuto = new inventoryAutoMulti();
		oinventoryAuto.bindAutoUnit();
		oinventoryAuto.bindAutoPrefix();
		
		oInventory = this;
		inventoryController = oController;
		
		var confirmMessage = "This will reset all the search inputs so far. Do you want to continue?";
		var oInventoryResultLayout = new sap.ui.layout.form.ResponsiveGridLayout("InventoryResultLayout", {});
		
		var labHardCode =  new sap.ui.commons.Label({text:"Depot Code:",
			wrapping: true,
			required:true,
			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: true, margin: false})});
		
		/*var labHardCode2 =  new sap.ui.commons.Label({text:"Temporary Field Added till Security is implemented",
			wrapping: true,
			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4"})}).addStyleClass("font10");*/
		
		var HrdFlex = new sap.m.FlexBox({ items: [  labHardCode ],  direction: "Column"	,
			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: true, margin: false})});
		
		var labUnitType = new sap.ui.commons.Label({text: "Unit Type:",
			wrapping: true, required:true, 
			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: true, margin: false})}).addStyleClass("marginTop10");
		
		var labPrefix = new sap.ui.commons.Label({text: "Prefix:",
			wrapping: true, 
			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: true, margin: false})}).addStyleClass("marginTop10");
		
		var labStatus = new sap.ui.commons.Label({text: "Status:",
			wrapping: true, 
			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: true, margin: false})}).addStyleClass("marginTop10");
		
		var labDaysDepot = new sap.ui.commons.Label({text: "Days in Depot:",
			wrapping: true, 
			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: true, margin: false})}).addStyleClass("marginTop10");
		
		var labManufacturingYear = new sap.ui.commons.Label({text: "Manufacturing Year:",
			wrapping: true, 
			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: true, margin: false})}).addStyleClass("marginTop12");
		
		var labFrom = new sap.ui.commons.Label({text: "From:",
			wrapping: true,
			layoutData: new sap.ui.layout.GridData({span: "L1 M1 S4"})}).addStyleClass("marginTop12");
		
		var labTo = new sap.ui.commons.Label({text: "To:",
			wrapping: true,
			layoutData: new sap.ui.layout.GridData({span: "L1 M1 S4"})}).addStyleClass("marginTop12");
		
		var fromToFlex = new sap.m.FlexBox({ items: [  labFrom,txtFrom, labTo,txtTo  ],  direction: "Row"	}).addStyleClass("marginTop12");
		
		var oAutoUnitType = new control.AutoCompleteValueHolder('AutoUnitTypeInv', {
            layoutData: new sap.ui.layout.GridData({span: "L6 M6 S7"}),
            enabled: true,
            required:true,
            placeholder: "Unit Type",
            //itemSelectLimit: 1, // No limit
            selectedItem: function (event) {
            },
            deletedItem: function (event) {
            	sap.ui.getCore().byId('AutoUnitTypeInv').mProperties.placeholder = 'Unit Type';            	
            },
            deletedAllItems: function (event) {
            }
        });
        oAutoUnitType.addStyleClass("marginTop10");
        
        var oAutoPrefix = new control.AutoCompleteValueHolder('AutoPrefixInv', {
            layoutData: new sap.ui.layout.GridData({span: "L6 M6 S7"}),
            enabled: true,
            placeholder: "Prefix",
            //itemSelectLimit: 1, // No limit
            selectedItem: function (event) {
            },
            deletedItem: function (event) {
            },
            deletedAllItems: function (event) {
            }
        });
        oAutoPrefix.addStyleClass("marginTop10");
		
        var oUser =  new loggedInU();
		var uId = "";
		var utype = oUser.getLoggedInUserType();
		var isEnabled = false;
		if(($.inArray(utype, ["DEPOT","FACTORY"])) != -1){
			uId = oUser.getLoggedInUserID();
			isEnabled = false;
		}
		else
			isEnabled = true;
		
		var txtHardCode = new sap.ui.commons.TextField("invHardCode",{
			layoutData: new sap.ui.layout.GridData({span: "L6 M6 S7"}),
			placeholder: "Depot Code",
			enabled:isEnabled,
			value:uId,
			liveChange:function(oControlEvent){
				txtHardCode.setPlaceholder("Depot Code");
				txtHardCode.setValueState(sap.ui.core.ValueState.None);
			},
		}).addStyleClass("FormInputStyle");
		
		var txtDaysDepot = new sap.ui.commons.TextField("daysDepot",{
			placeholder:"Days in Depot",
			liveChange:function(oControlEvent){
				txtDaysDepot.setPlaceholder("Days in Depot");
				txtDaysDepot.setValueState(sap.ui.core.ValueState.None);
			},
			layoutData: new sap.ui.layout.GridData({span: "L6 M6 S7"})
		}).addStyleClass("FormInputStyle marginTop10");
		
		
		var txtFrom = new sap.ui.commons.TextField("yearFrom",{
			//value: "2012",
			placeholder:"From",
			liveChange:function(oControlEvent){
				txtFrom.setPlaceholder("From");
				txtFrom.setValueState(sap.ui.core.ValueState.None);
			},
			layoutData: new sap.ui.layout.GridData({span: "L2 M2 S7"})
		}).addStyleClass("marginTop10");
		
		var txtTo = new sap.ui.commons.TextField("yearTo",{
			//value: "2013",
			placeholder:"To",
			liveChange:function(oControlEvent){
				txtTo.setPlaceholder("To");
				txtTo.setValueState(sap.ui.core.ValueState.None);
			},
			layoutData: new sap.ui.layout.GridData({span: "L2 M2 S7"})
		}).addStyleClass("marginTop10");
		
		var rgStatus = new sap.ui.commons.RadioButtonGroup("status",{
	        columns :3,
	        selectedIndex : 0,
	        layoutData: new sap.ui.layout.GridData({span: "L8 M8 S7"}),
	    }).addStyleClass("marginTop10");
		var oItem2 = new sap.ui.core.Item({
		        text : "All", key : "ALL"});
		rgStatus.addItem(oItem2);
		oItem2 = new sap.ui.core.Item({
		        text : "AVLB", key : "AVLB"});
		rgStatus.addItem(oItem2);
		oItem2 = new sap.ui.core.Item({
		        text : "SALE", key : "SALE"});
		rgStatus.addItem(oItem2);
		oItem2 = new sap.ui.core.Item({
		        text : "AUTH", key : "AUTH"});
		rgStatus.addItem(oItem2);
		oItem2 = new sap.ui.core.Item({
	        text : "WEST", key : "WEST"});
		rgStatus.addItem(oItem2);
		oItem2 = new sap.ui.core.Item({
	        text : "HOLD", key : "HOLD"});
		rgStatus.addItem(oItem2);
		
		var btnSubmit = new sap.m.Button({
	          text : "Submit",
	          styled:false,
	          width:"80px",
	          layoutData: new sap.ui.layout.GridData({span: "L1 M2 S4",linebreak: true, margin: false}),
	          press:function(){
	        	  //alert("Submit CLicked");
	        	  if(oInventory.validateInventorySearch()){
	        		  busyDialog.open();
		        	  oController.submitInventoryClicked();
	        	  }
	          }
		}).addStyleClass("submitBtn");
	
		var btnReset = new sap.m.Button({
	          text : "Reset",
	          styled:false,
	          width:"80px",
	          layoutData: new sap.ui.layout.GridData({span: "L1 M2 S4"}),
	          press:function(){
	        	  jQuery.sap.require("sap.ui.commons.MessageBox");
	        	  sap.ui.commons.MessageBox.show(confirmMessage,
    			  sap.ui.commons.MessageBox.Icon.WARNING,
    			  "Warning",
    			  [sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO], 
    			  oInventory.fnCallbackMessageBox,
    			  sap.ui.commons.MessageBox.Action.YES);
	          }
		}).addStyleClass("submitBtn");
		
		var lblSpace = new sap.ui.commons.Label( {text: " ",width : '8px'});
		
		var oFlexboxButtons = new sap.m.FlexBox({
            items: [
              btnSubmit,lblSpace,
              btnReset
            ],
            direction: "Row",
          }).addStyleClass("margin10");

		var lblSpace2 = new sap.ui.commons.Label( {text: " ",width : '5px'});
		var labStar = new sap.ui.commons.Label({text: "* "}).addStyleClass("MandatoryStar");
		
		var labRequired = new sap.ui.commons.Label({text: " Mandatory Field",wrapping: true});
		var oFlexboxReq = new sap.m.FlexBox({
			layoutData: new sap.ui.layout.GridData({span: "L7 M6 S4",linebreak: true, margin: false}),
			items: [labStar,lblSpace2,labRequired],
			direction: "Row"
		});

		var oInventorySearchLayout = new sap.ui.layout.form.ResponsiveGridLayout("InventorySearchLayout", {
			  emptySpanL: 0,
	          emptySpanM: 0,
	          emptySpanS: 0,  
			  labelSpanL: 1,
	          labelSpanM: 1,
	          labelSpanS: 1,
	          columnsL: 1,
	          columnsM: 1,
	          columnsS: 1,
	          breakpointL: 765,
			  breakpointM: 320
		});
		var oInventorySearchForm = new sap.ui.layout.form.Form("InventorySearchF1",{
            layout: oInventorySearchLayout,
            formContainers: [
                    new sap.ui.layout.form.FormContainer("InventorySearchF1C1",{
                    	title: new sap.ui.core.Title({text: "Search By / View By"}),
                        formElements: [
								/*new sap.ui.layout.form.FormElement({
									fields: [labSearchBy],
									layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
								}),*/
								new sap.ui.layout.form.FormElement({
									fields: [HrdFlex,txtHardCode],
									layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
								}),
                                new sap.ui.layout.form.FormElement({
                                    fields: [labUnitType,oAutoUnitType ],
                                    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                                }),
                                new sap.ui.layout.form.FormElement({
                                    fields: [labPrefix,oAutoPrefix ],
                                    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                                }),
                                new sap.ui.layout.form.FormElement({
                                    fields: [labStatus,rgStatus],
                                    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                                }),
                                new sap.ui.layout.form.FormElement({
                                    fields: [labDaysDepot,txtDaysDepot ],
                                    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                                }),
                                new sap.ui.layout.form.FormElement({
                                    fields: [labManufacturingYear,labFrom,txtFrom, labTo,txtTo ],
                                    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                                })
                                
                        ],layoutData: new sap.ui.layout.GridData({span: "L7 M12 S12"})
                    }),
/*                   new sap.ui.layout.form.FormContainer("InventorySearchF1C2",{
						formElements: [
							new sap.ui.layout.form.FormElement({
								fields: [
								
								]
							})
						],//layoutData: new sap.ui.layout.GridData({span: "L1 M1 S1"})
					}),*/
                    new sap.ui.layout.form.FormContainer("InventorySearchF1C3",{
                        formElements: [
                             new sap.ui.layout.form.FormElement({
                                  fields: [ oFlexboxButtons],
                             }),
                             new sap.ui.layout.form.FormElement({
                                 fields: [ oFlexboxReq],
                            }),
                            //layoutData: new sap.ui.commons.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                       ],layoutData: new sap.ui.layout.GridData({span: "L7 M12 S12",linebreak: true, margin: false})
                    }),
            ]
    });
		
	var oInventoryResultForm = new sap.ui.layout.form.Form("InventoryResultF1",{
            layout: oInventoryResultLayout,
            formContainers: [
                    new sap.ui.layout.form.FormContainer("InventoryResultF1C1",{
                        formElements: [
                            new sap.ui.layout.form.FormElement("InventoryResults",{
                                fields: [],
                                layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                            })
                       ],layoutData: new sap.ui.commons.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                    })
            ]
    });
	var vHDivider = new sap.ui.commons.HorizontalDivider({width: "95%", type: "Area", height: "Medium"});
	var oInventoryFlexbox = new sap.m.FlexBox({
		  items: [
		    oInventorySearchForm,
		    //vHDivider,
		    oInventoryResultForm
		  ],
		  direction: "Column"
		});
	return oInventoryFlexbox;
	
	},

	fnCallbackMessageBox:function(sResult) {
		//alert("Reset");
		if(sResult == "YES"){
			inventoryController.resetInventoryClicked();
		}
	},
	
	setInventoryrDetailsTable:function(){
		
				var oInventoryResultTable = new sap.ui.table.Table("inventoryResultTable",{
			        visibleRowCount: 5,
			        firstVisibleRow: 1,
			        columnHeaderHeight: 30,
			        selectionMode: sap.ui.table.SelectionMode.None,
			        navigationMode: sap.ui.table.NavigationMode.Paginator,
				}).addStyleClass("tblBorder marginTop10");
				
				oInventoryResultTable.addColumn(new sap.ui.table.Column({
			        label: new sap.ui.commons.Label({text: "Unit Number"}),
			        template: new sap.ui.commons.TextView().bindProperty("text", "UnitNo"),
			        sortProperty: "UnitNo",
			        width:"15%",
			        resizable:false,
			        filterProperty: "UnitNo",
				}));
				
				oInventoryResultTable.addColumn(new sap.ui.table.Column({
			        label: new sap.ui.commons.Label({text: "Unit Type"}),
			        template: new sap.ui.commons.TextView().bindProperty("text", "UnitType"),
			        sortProperty: "UnitType",
			        width:"10%",
			        resizable:false,
			        filterProperty: "UnitType",
				}));
				
				oInventoryResultTable.addColumn(new sap.ui.table.Column({
			        label: new sap.ui.commons.Label({text: "Manufacturer Date"}),
			        template: new sap.ui.commons.TextView().bindProperty("text", "ManufDate"),
			        sortProperty: "MfdDateActual",
			        width:"20%",
			        resizable:false,
			        filterProperty: "ManufDate"
				}));
				
				oInventoryResultTable.addColumn(new sap.ui.table.Column({
			        label: new sap.ui.commons.Label({text: "User Status"}),
			        template: new sap.ui.commons.TextView().bindProperty("text", "UserStatus"),
			        sortProperty: "UserStatus",
			        width:"15%",
			        resizable:false,
			        filterProperty: "UserStatus"
				}));
				var oDaysCurrCol = new sap.ui.table.Column({
			        label: new sap.ui.commons.Label({text: "Days in Current Status"}),
			        template: new sap.ui.commons.TextView().bindProperty("text", "DaysInStatus"),
			        sortProperty: "DaysInStatus",
			        width:"25%",
			        resizable:false,
			        filterProperty: "DaysInStatus"
				});
				var oUtil = new utility();
				oInventoryResultTable.addColumn(oDaysCurrCol);
				oUtil.addColumnSorterAndFilter(oDaysCurrCol, oUtil.compareUptoCount);
				
				var oDaysCol = new sap.ui.table.Column({
			        label: new sap.ui.commons.Label({text: "Days in Depot"}),
			        template: new sap.ui.commons.TextView().bindProperty("text", "DaysInDepot"),
			        sortProperty: "DaysInDepot",
			        width:"15%",
			        resizable:false,
			        filterProperty: "DaysInDepot"
				});
				oInventoryResultTable.addColumn(oDaysCol);
				oUtil.addColumnSorterAndFilter(oDaysCol, oUtil.compareUptoCount);
				
				var btnPrint = new sap.m.Button({
			          text : "Print",
			          type:sap.m.ButtonType.Unstyled,
			          icon: sap.ui.core.IconPool.getIconURI("print"),
			          press:function(){
			        	  //alert("Print CLicked");
			        	  var tab = objUtil.makeHTMLTable(jsonInventory, "View Inventory","print");
			        	  var newWin = window.open();
			        	  newWin.document.write(tab);
			        	  newWin.print();
			        	  //oController.submitReleaseClicked();
			          }
				}).addStyleClass("submitBtn");
			
				
				var btnExport = new sap.m.Button({
			          text : "Export To Excel",
			          type:sap.m.ButtonType.Unstyled,
			          icon: sap.ui.core.IconPool.getIconURI("excel-attachment"),
			          press:function(){
			        	  //alert("Export to Excel");
			        	  objUtil.makeHTMLTable(jsonInventory, "View Inventory","export");
			          }
				}).addStyleClass("submitBtn");
				
				var btnViewAll = new sap.m.Button("InvViewAll",{
			          text : "View All",
			          type:sap.m.ButtonType.Unstyled,
			          visible:false,
			          //icon: sap.ui.core.IconPool.getIconURI("excel-attachment"),
			          press:function(){
			        	  //alert("View All");
			        	  this.setVisible(false);
			        	  if(sap.ui.getCore().byId("inventoryResultTable")){
			        		  var oInventoryResultTable = sap.ui.getCore().byId("inventoryResultTable");
			        		  if (InventoryResultData.InventoryResult.length < 100){
			  	  					oInventoryResultTable.setVisibleRowCount(InventoryResultData.InventoryResult.length);
			  	  					oInventoryResultTable.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
			  	  					//sap.ui.getCore().byId("InvViewAll").setVisible(false);
			  	  				}else{
			  	  					oInventoryResultTable.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
			  	  					oInventoryResultTable.setVisibleRowCount(100);
			  	  					//sap.ui.getCore().byId("InvViewAll").setVisible(true);
			  	  				}  
			        	  }
			          }
				}).addStyleClass("submitBtn");
				var lblSpaceLegend = new sap.ui.commons.Label( {text: " ",width : '5px'});
				var oInventoryDetailsToolbar = new sap.m.FlexBox({
					  items: [
					    btnExport,lblSpaceLegend,
					    btnPrint
					  ],
					  direction: "RowReverse"
				});
				
				var oInventoryDetailsFooter = new sap.m.FlexBox({
					  items: [
					    btnViewAll
					  ],
					  direction: "Row"
				}).addStyleClass("marginTop10");
				
				var oInventoryDetailsFlex = new sap.m.FlexBox("inventoryDetailsFlex",{
					  items: [
					    oInventoryDetailsToolbar,
					    oInventoryResultTable,
					    oInventoryDetailsFooter
					  ],
					  direction: "Column",
					  width:"80%"
				});
				
				return oInventoryDetailsFlex;
	},
	
	bindInventoryDetails:function(){
		//var unitType = $("#AutoUnitTypeInv").val();
		var selPrefix = sap.ui.getCore().byId('AutoPrefixInv').getSelectedValues();
		var prefix="";
		for(var i in selPrefix)
			prefix += selPrefix[i].description +',';

		prefix = prefix.slice(0,-1);
		
		var selUnitType = sap.ui.getCore().byId('AutoUnitTypeInv').getSelectedValues();
    	var unitType="";
    	for(var i in selUnitType)
			unitType += selUnitType[i].description +',';

		unitType = unitType.slice(0,-1);
		
		var status = sap.ui.getCore().byId("status").getSelectedItem().getKey();
		var daysInDepot = sap.ui.getCore().byId("daysDepot").getValue();
		if(daysInDepot == "")
			daysInDepot = 365;
		var yearFrom = sap.ui.getCore().byId("yearFrom").getValue();
		var yearTo = sap.ui.getCore().byId("yearTo").getValue();
		//var depotCode = '1327';
		var depotCode = sap.ui.getCore().byId("invHardCode").getValue();
		
		/*alert("unit type : "+ unitType+ " prefix : "+ prefix + " status :"+ status + " days : "+ daysInDepot+" yearFrom : "+ yearFrom+
		" year To : "+ yearTo+ "depot : "+depotCode);*/
    	var filter = "/CRM_View_Inventory?$filter=UnitTypeStrng eq '"+unitType+
    	"' and Prefix eq '"+prefix+"' and Status eq '"+status+"' and DaysDepot eq "+daysInDepot+
    	" and YearFrom eq '"+yearFrom+"' and YearTo eq '"+yearTo+"'"+" and DepotCode eq '"+depotCode+"'";
    	
    	//alert("Str : "+serviceUrl+filter);
    	
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
  		    	InventoryResultData.InventoryResult = data.results; 
  		    	
  		    	if(data.results.length == 0){
  		    		busyDialog.close();
  		    		sap.ui.commons.MessageBox.alert("No Results Found. Please edit / refine your search criteria and search again.");
  		    		if(sap.ui.getCore().byId("inventoryDetailsFlex")){
		    			sap.ui.getCore().byId("inventoryDetailsFlex").destroy();
		    		}
  		    	}else if(InventoryResultData.InventoryResult.length >0){
  		    		//alert("got results");
  		    		
  		    		jsonInventory =[];
  		    		if(sap.ui.getCore().byId("inventoryDetailsFlex")){
		    			sap.ui.getCore().byId("inventoryDetailsFlex").destroy();
		    		}
  		    		
  		    		for(var i=0; i<InventoryResultData.InventoryResult.length;i++){
  		    			
  		    			var vDocDateResult = InventoryResultData.InventoryResult[i].ManufDate.split("(");
  	                    var vDocDate = vDocDateResult[1].split(")");
  	                    var vActualDate = new Date(Number(vDocDate[0]));
  	                    var vformattedDocDate = dateFormat(new Date(Number(vDocDate[0])), 'mmm-yyyy',"UTC");
  	                    if (vformattedDocDate.substring(4) === "9999"){
  	                    	InventoryResultData.InventoryResult[i].ManufDate =  "-";
  	                    }
  	                    else{
  	                    	InventoryResultData.InventoryResult[i].ManufDate = vformattedDocDate;
  	                    }
  	                    InventoryResultData.InventoryResult[i]["MfdDateActual"] = vActualDate;
  	                  
  	                    // make Custom JSON for Table - Excel/Print
  	                  jsonInventory.push({
  	                		  'Unit Number':InventoryResultData.InventoryResult[i].UnitNo,
  	                		  'Unit Type':InventoryResultData.InventoryResult[i].UnitType,
  	                		  'Manufacturer Date':InventoryResultData.InventoryResult[i].ManufDate,
  	                		  'User Status':InventoryResultData.InventoryResult[i].UserStatus,
  	                		  'Days In Current Status':InventoryResultData.InventoryResult[i].DaysInStatus,
  	                		  'Days In Depot':InventoryResultData.InventoryResult[i].DaysInDepot
  	                  });
  		    		}
  		    		
  		    		var vInventoryFlex = oInventory.setInventoryrDetailsTable();
  		    		
  	  				var oInventoryResultModel = new sap.ui.model.json.JSONModel();
  	  				oInventoryResultModel.setData(InventoryResultData);
  	  				var oInventoryResultTable = sap.ui.getCore().byId("inventoryResultTable");
  	  				oInventoryResultTable.setModel(oInventoryResultModel);
  	  				oInventoryResultTable.bindRows("/InventoryResult");
  	  				
  	  				if (InventoryResultData.InventoryResult.length < 25){
  	  					oInventoryResultTable.setVisibleRowCount(InventoryResultData.InventoryResult.length);
  	  					oInventoryResultTable.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
  	  					sap.ui.getCore().byId("InvViewAll").setVisible(false);
  	  				}else{
  	  					oInventoryResultTable.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
  	  					oInventoryResultTable.setVisibleRowCount(25);
  	  					sap.ui.getCore().byId("InvViewAll").setVisible(true);
  	  				}
  	  				
  	  				var oInventoryResultForm = sap.ui.getCore().byId("InventoryResults");
					oInventoryResultForm.insertField(vInventoryFlex,0);
  		    	}
  		    	
  				
  				busyDialog.close();
  				
  		    },
  		    function(err){
  		    	errorfromServer(err);
  		    	/*busyDialog.close();
  		    	if(err.response.statusCode == "500"){
  		    		sap.ui.commons.MessageBox.alert("Server Response Timeout");
  		    		sap.ui.commons.MessageBox.show("Server Response Timeout",
  		    			  sap.ui.commons.MessageBox.Icon.INFORMATION,
  		    			  "Information",
  		    			  [sap.ui.commons.MessageBox.Action.OK], 
  		    			  sap.ui.commons.MessageBox.Action.OK
  		    		);
  		    	}
  		    	else{
  		    		//alert("Error while reading Inventory : "+ window.JSON.stringify(err.response));
  	  		    	sap.ui.commons.MessageBox.alert("Error while reading Inventory : "+window.JSON.stringify(err.response));
  		    	}*/
  		    });
	},
	
	resetInventoryDetail:function(){
		if(sap.ui.getCore().byId("inventoryDetailsFlex")){
			var oInventoryDetailFlexBox = sap.ui.getCore().byId("inventoryDetailsFlex");
			oInventoryDetailFlexBox.destroy();
		}
		
		if(sap.ui.getCore().byId("invHardCode").getEnabled())
			sap.ui.getCore().byId("invHardCode").setValue("");
		
		sap.ui.getCore().byId('AutoUnitTypeInv').mProperties.placeholder = 'Unit Type';
		sap.ui.getCore().byId('AutoUnitTypeInv').clearSelectedValues();
        
		sap.ui.getCore().byId('AutoPrefixInv').clearSelectedValues();
	    
		sap.ui.getCore().byId("status").setSelectedIndex(0);
		sap.ui.getCore().byId("daysDepot").setValue("").setValueState(sap.ui.core.ValueState.None).setPlaceholder("Days in Depot");
		sap.ui.getCore().byId("yearFrom").setValue("").setValueState(sap.ui.core.ValueState.None).setPlaceholder("From");
		sap.ui.getCore().byId("yearTo").setValue("").setValueState(sap.ui.core.ValueState.None).setPlaceholder("To");
	},
	
	viewAllInventoryDetails:function(){
		sap.ui.getCore().byId("ViewAll").setVisible(false);
        sap.ui.getCore().byId("inventoryResultTable").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
        sap.ui.getCore().byId("inventoryResultTable").setVisibleRowCount(InventoryResultData.InventoryResult.length);
	},
	
	validateInventorySearch: function(){
		//alert("in validate");
		var valid = true;
		var vTxtUnitType = sap.ui.getCore().byId('AutoUnitTypeInv').getSelectedValues();
        var vDaysInDepot = sap.ui.getCore().byId("daysDepot");
        var vFromYear = sap.ui.getCore().byId("yearFrom");
        var vToYear = sap.ui.getCore().byId("yearTo");
        
        if(sap.ui.getCore().byId("invHardCode").getEnabled())
	        if(sap.ui.getCore().byId("invHardCode").getValue() == ""){
				sap.ui.getCore().byId("invHardCode").setValueState(sap.ui.core.ValueState.Error);
				sap.ui.getCore().byId("invHardCode").setPlaceholder("Required");
				isValid = false;
			}
        
        if(vTxtUnitType == ""){
        	$('#AutoUnitTypeInv').siblings("ul").remove(); 
		    $('#AutoUnitTypeInv').css("display","block");
		    $("#AutoUnitTypeInv").attr("placeholder","Required");
			document.getElementById("AutoUnitTypeInv").style.borderColor = "red";
    		document.getElementById("AutoUnitTypeInv").style.background = "#FAD4D4";
    		
              

               valid=false;
        }
        if(vDaysInDepot.getValue() != ""){
        	if((!$.isNumeric(vDaysInDepot.getValue())) || (vDaysInDepot.getValue() > 365)){
                vDaysInDepot.setValueState(sap.ui.core.ValueState.Error);
                vDaysInDepot.setValue("");
                vDaysInDepot.setPlaceholder("Invalid value");
                /*var message = "You have input invalid values in the Days in Depot. \n Please enter valid values before retrying.";
                sap.ui.commons.MessageBox.alert(message);*/
                valid=false;
            }else{
            	vDaysInDepot.setPlaceholder("Days in Depot");
            	vDaysInDepot.setValueState(sap.ui.core.ValueState.None);
            }
        }
        
        if(vFromYear.getValue() != ""){
        	if((!$.isNumeric(vFromYear.getValue())) || ((vFromYear.getValue().length != 4))){
                vFromYear.setValueState(sap.ui.core.ValueState.Error);
                vFromYear.setValue("");
                vFromYear.setPlaceholder("Invalid value");
                /*var message = "You have input invalid values in the Manufacturing Year - From. \n Please enter valid values before retrying.";
                sap.ui.commons.MessageBox.alert(message);*/
                valid = false;
        	}else{
        		vFromYear.setPlaceholder("From");
        		vFromYear.setValueState(sap.ui.core.ValueState.None);
        	}
        }
        
        if(vToYear.getValue() != ""){
        	if((!$.isNumeric(vToYear.getValue())) || (vToYear.getValue().length != 4)){
                vToYear.setValueState(sap.ui.core.ValueState.Error);
                vToYear.setValue("");
                vToYear.setPlaceholder("Invalid value");
                /*var message = "You have input invalid values in the Manufacturing Year - To. \n Please enter valid values before retrying.";
                sap.ui.commons.MessageBox.alert(message);*/
                valid = false;
           }else{
        	   vToYear.setPlaceholder("To");
        	   vToYear.setValueState(sap.ui.core.ValueState.None);
           }
        }
        
        return valid;
 }

	
});
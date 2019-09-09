/* APS 256 : DRV Issue After upgrade MAC13022018+*/

//Arrays

		var aDRVDetails = [];
		var aUnitsNotFoundDRV = [];
		var aUnitsNotOnLeaseDRV = [];
		var vCustomerDRV = "";
		
		var aChkBoxChkd = [];
		var vChkBoxChkdLen = 0;
var aNotValidUnitNosDRV= [];
var oModelDRVResult = new sap.ui.model.json.JSONModel();
var vDRVResultTbl;
var vUnitNotFoundTbl;
var vNotOnLeaseTbl;
var objUtilDRV;
var jsonDRVUnitDetails = [];
sap.ui.model.json.JSONModel.extend("depInvRepairView", {
	
	createDepInvRepair:function(){
		var oFlexboxDepInvRepair = new sap.m.FlexBox("idDepInvRepairFlxBox",{
            items: [],
            direction: "Column"
		  });
		
		return oFlexboxDepInvRepair;
	},
	
	createDepInvRepairFormView: function(){
		sap.ui.getCore().byId("idDepInvRepairFlxBox").destroyItems();
		$('#idHdrContent').html('Depreciated Replacement Value (DRV)');
		var oResult =this;
		//alert("create")
		// Table
    	var oDepInvRepTable = new sap.ui.table.Table("idDRVResultTbl",{
    		visibleRowCount: 25,
            firstVisibleRow: 3,
            columnHeaderHeight: 40,
           selectionMode: sap.ui.table.SelectionMode.None,
            navigationMode: sap.ui.table.NavigationMode.Paginator,
           // width: "70%",
    	 }).addStyleClass("fontStyle tblBorder");
    	/* if(widthOfDoc <= 1280)
 	  	{
 	  		sap.ui.getCore().byId("idDRVResultTbl").setWidth("90%");
 	  	}
		 else{
			 sap.ui.getCore().byId("idDRVResultTbl").setWidth("80%");
		 }*/
    	// Table Columns
    	
    	oDepInvRepTable.addColumn(new sap.ui.table.Column("idChkBoxColDRV",{label: new sap.ui.commons.Label({text: ""}),
        	template: new sap.ui.commons.CheckBox().bindProperty("checked", "checked").bindProperty("name", "Sernr"),
        	width:"30px",
        	resizable: false
        	//hAlign: "Center"
        	}));
    	
    	oDepInvRepTable.addColumn(new sap.ui.table.Column({
    		label: new sap.ui.commons.Label({text: "Unit Number"}),
    		width:"150px",
    		resizable:false,
			 template: new sap.ui.commons.Link({
					press : function() {
						selUnitNumber = this.getText();
						var oUnitEnquiry = new unitEnquiryView();
						oUnitEnquiry.bindSingleUnitStatus(selUnitNumber,3);
						//go to req8 view A as mentioned in FRS
					}
				}).bindProperty("text", "Sernr"),
			         sortProperty: "Sernr",
			         filterProperty: "Sernr",
					 }));
    	
    	oDepInvRepTable.addColumn(new sap.ui.table.Column({
    		 label: new sap.ui.commons.Label({text: "Unit Type"}),
    		 width:"55px",
    		 resizable:false,
    		 template: new sap.ui.commons.TextView().bindProperty("text", "UnitType"),
             sortProperty: "UnitType",
             filterProperty: "UnitType",
    		 }));
    	 
    	oDepInvRepTable.addColumn(new sap.ui.table.Column({
    		 label: new sap.ui.commons.Label({text: "Lease"}),
    		 width:"70px",
    		 resizable:false,
    		 template: new sap.ui.commons.TextView().bindProperty("text", "Lease"),
             sortProperty: "Lease",
             filterProperty: "Lease",
    		 }));
    	 
    	var oDRVRateCol = new sap.ui.table.Column({
    		 label: new sap.ui.commons.Label({text: "DRV Rate",}),
    		 width:"70px",
    		 resizable:false,
    		 template: new sap.ui.commons.TextView({
    			 textAlign: "Left"
    		 }).bindProperty("text", "Rate"),
             sortProperty: "Rate",
             filterProperty: "Rate",
    		 });
    	var oUtil = new utility();
    	oDepInvRepTable.addColumn(oDRVRateCol);
		oUtil.addColumnSorterAndFilter(oDRVRateCol, oUtil.compareUptoCount);
		
    	oDepInvRepTable.addColumn(new sap.ui.table.Column({
    		 label: new sap.ui.commons.Label({text: "Currency"}),
    		 width:"65px",
    		 resizable:false,
    		 template: new sap.ui.commons.TextView().bindProperty("text", "Currency"),
             sortProperty: "Currency",
             filterProperty: "Currency",
    		 }));
    	 
    	oDepInvRepTable.addColumn(new sap.ui.table.Column({
    		 label: new sap.ui.commons.Label({text: "Status"}),
    		 width:"100px",
    		 resizable:false,
    		 template: new sap.ui.commons.TextView().bindProperty("text", "DepotComments"),
             sortProperty: "DepotComments",
             filterProperty: "DepotComments",
    		 }));
    	
    	// Buttons
    	var NoChkBoxCheckedMessage = "No Units have been selected to Request For Total Loss. \n " +
    								 "Please select unit(s) by checking the relevant checkbox(es) on the left of the Unit Number and retry";
    	var oBtnReqForTotLoss = new sap.m.Button("idBtnRequestForTotalLossDRV",{
            text : "Request For Total Loss",
            styled:false,
            //width:"165px",	// MAC13022018-
	        layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: true, margin: true}),
            press:function(){
            	 aChkBoxChkd = $('#idDRVResultTbl').find('input[type="checkbox"]:checked');
                  vChkBoxChkdLen = $('#idDRVResultTbl').find('input[type="checkbox"]:checked').length;
                  if(vChkBoxChkdLen == 0){
                	  sap.ui.commons.MessageBox.show(NoChkBoxCheckedMessage,
                              sap.ui.commons.MessageBox.Icon.WARNING,
                              "Warning",
                              [sap.ui.commons.MessageBox.Action.OK], 
                                  sap.ui.commons.MessageBox.Action.OK);
                  }
                  else{
                	  //alert("unit numbers selected " + vChkBoxChkdLen );
                	  oResult.sendDRVMail();
                  }
            }
         }).addStyleClass("submitBtn");
    	/*var oBtnViewAll = new sap.m.Button("idDRVBtnViewAll",{
            text : "View All",
            styled:false,
            width:"80px",
           // icon: "images/view_all.png",
            press:function(){
                  //alert("View All");
            	oBtnViewAll.setVisible(false);
                  var vArrayLength = aDRVDetails.length;
		        	if(vArrayLength < 100){
		        		sap.ui.getCore().byId("idDRVResultTbl").setVisibleRowCount(vArrayLength);
		        		sap.ui.getCore().byId("idDRVResultTbl").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		        	}
		        	else{
		        		sap.ui.getCore().byId("idDRVResultTbl").setVisibleRowCount(100);
		        		sap.ui.getCore().byId("idDRVResultTbl").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		        	}
            }
         }).addStyleClass("submitBtn");*/
    	 var lblSpace = new sap.ui.commons.Label( {text: " ",width : '8px'});
    	var oFlexReqForTotLoss = new sap.m.FlexBox({
	  		  items: [
	  		          	oBtnReqForTotLoss  //oBtnViewAll,lblSpace, oBtnReqForTotLoss
	     		  ],
	     		  direction: "Row",
	     		}).addStyleClass("marginTop10"); 
    	
    	var oBtnDepInvRepExport =  new sap.m.Button({
            text : "Export To Excel",
            type:sap.m.ButtonType.Unstyled,
            //width:"145px",	// MAC13022018 -
            icon: sap.ui.core.IconPool.getIconURI("excel-attachment"),
            press:function(){
            	var vTitle = "Depreciated Replacement Value (DRV)";
            	//objUtilDRV = new utility();
            	objUtil.makeHTMLTable(jsonDRVUnitDetails, vTitle,"export");
            }
         }).addStyleClass("submitBtn");
    	
    	
    	// Labels
		var oLabelInfo = new sap.ui.commons.Label({text: "Click on Unit Number to see more information. ",
            wrapping: true}).addStyleClass("margin10");
		
		// Table - UNITS NOT FOUND
		var oLabelUnitsNF = new sap.ui.commons.Label({text: "Units Not Found ",
            wrapping: true}).addStyleClass("font15Bold marginStyle");
		
    	var oUnitsNotFoundTable = new sap.ui.table.Table("idUnitNotFoundTblDRV",{
    		visibleRowCount: aUnitsNotFoundDRV.length,
            firstVisibleRow: 3,
            columnHeaderVisible : false,
            columnHeaderHeight: 30,
            selectionMode: sap.ui.table.SelectionMode.None,
           // width: "35%",
            height:"100%"
    	 }).addStyleClass("fontStyle tblBorder");
    	
    	// Table Columns
    	oUnitsNotFoundTable.addColumn(new sap.ui.table.Column({
    		 template: new sap.ui.commons.TextView().bindProperty("text", "Sernr"),
    		 width:"150px",
             sortProperty: "Sernr",
             filterProperty: "Sernr",
    		 }));
    	//Create a model and bind the table rows to this model
    	var oModelDRVUnitNotFound = new sap.ui.model.json.JSONModel();
    	oModelDRVUnitNotFound.setData({modelData: aUnitsNotFoundDRV});
    	oUnitsNotFoundTable.setModel(oModelDRVUnitNotFound);
    	oUnitsNotFoundTable.bindRows("/modelData");
    	
    	// Table - UNITS ON LEASE
    	// Labels
		var oLabelUnitsOnLease = new sap.ui.commons.TextView({text: "Units Currently not on lease \n with " + vCustomerDRV,
            wrapping: true}).addStyleClass("font15Bold marginStyle");
		
    	var oUnitsNotOnLeaseTable = new sap.ui.table.Table("idNotOnLeaseTblDRV",{
    		visibleRowCount: aUnitsNotOnLeaseDRV.length,
            firstVisibleRow: 3,
            columnHeaderVisible : false,
            columnHeaderHeight: 30,
            selectionMode: sap.ui.table.SelectionMode.None,
           // width: "35%",
            height:"100%"
    	 }).addStyleClass("fontStyle tblBorder");
    	
    	// Table Columns
    	oUnitsNotOnLeaseTable.addColumn(new sap.ui.table.Column({
    		 template: new sap.ui.commons.TextView().bindProperty("text", "Sernr"),
    		 width:"150px",
             sortProperty: "Sernr",
             filterProperty: "Sernr",
    		 }));
    	//Create a model and bind the table rows to this model
    	var oModelNotOnLeaseDRV = new sap.ui.model.json.JSONModel();
    	oModelNotOnLeaseDRV.setData({modelData: aUnitsNotOnLeaseDRV});
    	oUnitsNotOnLeaseTable.setModel(oModelNotOnLeaseDRV);
    	oUnitsNotOnLeaseTable.bindRows("/modelData");

    	// Flex Box
    	var oFlexBoxUnitsNF = new sap.m.FlexBox({
  		  items: [
     				  oLabelUnitsNF,
     				 oUnitsNotFoundTable
     		  ],
     		  direction: "Column"
     		}); 
    	if(aUnitsNotFoundDRV.length == 0 ){
    		oFlexBoxUnitsNF.setVisible(false);
    	}
    	else{
    		oFlexBoxUnitsNF.setVisible(true);
    	}
    	
    	
    	var oFlexBoxUnitsOnLease = new sap.m.FlexBox({
    		  items: [
       				  oLabelUnitsOnLease,
       				oUnitsNotOnLeaseTable
       		  ],
       		  direction: "Column"
       		});
    	if(aUnitsNotOnLeaseDRV.length == 0 ){
    		oFlexBoxUnitsOnLease.setVisible(false);
    	}
    	else{
    		oFlexBoxUnitsOnLease.setVisible(true);
    	}
    	
    	
    	var oFlexBoxUnitsNFSO = new sap.m.FlexBox({
  		  items: [
     				  oFlexBoxUnitsNF,
     				 oFlexBoxUnitsOnLease
     		  ],
     		  direction: "Row"
     		});
    	
    	
    	/*var oFlexBoxUnits = new sap.m.FlexBox({
	  		  items: [
	  		          oUnitsNotFoundTable,
	  		          oUnitsNotOnLeaseTable
	     		  ],
	     		  direction: "Row",
	     		  width:"60%"
	     		});*/
    	
    	// Flex Box
		var oFlexBoxInfo = new sap.m.FlexBox({
	  		  items: [
	  		          oLabelInfo
	     		  ],
	     		  direction: "Row",
	     		  width:"50%"
	     		}); 
		var currentDate = dateFormat(new Date(),'dd-mm-yyyy HH:MM');
		var oLabelTbltitle = new sap.ui.commons.TextView({text: "Results for Depreciated Replacement Value (DRV) " + currentDate,
			layoutData: new sap.ui.layout.GridData({span: "L12 M12 S4",linebreak: true, margin: false}),
            wrapping: true}).addStyleClass("marginStyle");
		var oFlexTblTitle = new sap.m.FlexBox({
	  		  items: [
	  		          oLabelTbltitle
	     		  ],
	     		  direction: "Row",
	     		  width:"50%"
	     		}); 
		
		var oFlexBoxBtnExport = new sap.m.FlexBox({
	  		  items: [
	  		          oBtnDepInvRepExport
	     		  ],
	     		  width:"30%",
	     		  direction: "RowReverse",
	     		}); 
		var oFlexBoxToolBar = new sap.m.FlexBox({
	  		  items: [
	  		          oFlexBoxInfo,oFlexBoxBtnExport
	     		  ],
	     		  direction: "Row",
	     		}); 
		var oFlexBoxInfTb = new sap.m.FlexBox("idFlexDetailDRV",{
	  		  items: [
	  		          oFlexTblTitle,
	  		          oFlexBoxToolBar,
	  		          oDepInvRepTable,oFlexReqForTotLoss
	     		  ],
	     		  direction: "Column",
	     		});  
		 var backDRVResults = new sap.m.Link("idBackDRVResults", {text: " < Back",
         	  width:"7%",
         	  wrapping:true,
         	  press: function(){
         		  var bus = sap.ui.getCore().getEventBus();
         			bus.publish("nav", "back");
        	  }});
		 
		// Responsive Grid Layout
	    var oDepInvRepLayout = new sap.ui.layout.form.ResponsiveGridLayout("idDepInvRepLayout",{
	    	 columnsL: 1,
	          columnsM: 1,
	    });
   	 
	  // Online Form Starts
	     var oDDepInvRepForm = new sap.ui.layout.form.Form("idDepInvRepForm",{
             layout: oDepInvRepLayout,
             formContainers: [
                     
                     new sap.ui.layout.form.FormContainer("idDepInvRepFormC1",{
                             //title: "Depot Inventory for status Repair",
                             formElements: [
											new sap.ui.layout.form.FormElement({
											    fields: [backDRVResults],
											    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
											}),
											new sap.ui.layout.form.FormElement({
											    fields: [oFlexBoxInfTb],
											    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
											}),
                                     ],
                                     layoutData: new sap.ui.commons.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                     }),
                    /* new sap.ui.layout.form.FormContainer("idDepInvRepFormC2",{
                         formElements: [
										new sap.ui.layout.form.FormElement({
										    fields: [oFlexReqForTotLoss],
										    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
										}),
										],
										layoutData: new sap.ui.commons.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                     }),*/
                     new sap.ui.layout.form.FormContainer("idDepInvRepFormC3",{
                         formElements: [
										new sap.ui.layout.form.FormElement({
										    fields: [oFlexBoxUnitsNFSO],
										    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
										})
										],
										layoutData: new sap.ui.commons.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                     })
             ]
     });
	     var browser = sap.ui.Device.browser.chrome;
		 if(browser){
			 sap.ui.getCore().byId("idDRVResultTbl").setWidth("80%");
			 sap.ui.getCore().byId("idUnitNotFoundTblDRV").setWidth("35%");
			 sap.ui.getCore().byId("idNotOnLeaseTblDRV").setWidth("35%");
		 }
		 else{
			 sap.ui.getCore().byId("idDRVResultTbl").setWidth("");
			 sap.ui.getCore().byId("idUnitNotFoundTblDRV").setWidth("");
			 sap.ui.getCore().byId("idNotOnLeaseTblDRV").setWidth("");
		 }
		 if(widthOfDoc <= 1280)
	 	  	{
	 	  		sap.ui.getCore().byId("idDRVResultTbl").setWidth("90%");
	 	  	}
			 else{
				 sap.ui.getCore().byId("idDRVResultTbl").setWidth("80%");
			 }
	     sap.ui.getCore().byId("idDepInvRepairFlxBox").addItem(oDDepInvRepForm);
     	//return oDDepInvRepForm;
	}, //createDepInvRepair
	
	bindRepairStatus: function(){
		$('#idHdrContent').html('Depreciated Replacement Value (DRV)');
		var aLen = aDRVDetails.length;
		var vDRVResultTbl = sap.ui.getCore().byId("idDRVResultTbl");
		//var oBtnViewAllDRV = sap.ui.getCore().byId("idDRVBtnViewAll");
		var vFlexDetailDRV = sap.ui.getCore().byId("idFlexDetailDRV");
		
		if(aLen == 0){
			vFlexDetailDRV.setVisible(false);
		}else{
			vFlexDetailDRV.setVisible(true);
			 //var objUser = new loggedInU();
		  	   var test = objLoginUser.filterLoggedInUserData("BUTTON");
		  	   
		  	   if(test.length > 0){
		  		 sap.ui.getCore().byId("idBtnRequestForTotalLossDRV").setVisible(true);
		  	   }
		  	   else{
		  		 sap.ui.getCore().byId("idBtnRequestForTotalLossDRV").setVisible(false);
		  		 sap.ui.getCore().byId("idChkBoxColDRV").setVisible(false);
		  	   }
			var oModelDRVResult = new sap.ui.model.json.JSONModel();
			oModelDRVResult.setData({modelData: aDRVDetails});
			vDRVResultTbl.setModel(oModelDRVResult);
			vDRVResultTbl.bindRows("/modelData");
			if(aLen < 25){
				vDRVResultTbl.setVisibleRowCount(aLen);
				vDRVResultTbl.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
				//oBtnViewAllDRV.setVisible(false);
			}
			else{
				vDRVResultTbl.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
				vDRVResultTbl.setVisibleRowCount(25);
				//oBtnViewAllDRV.setVisible(true);
			}
		}
		
	
	}, //bindRepairStatus
	
	sendDRVMail: function(){
		busyDialog.open();
		var Row = [];
		var count = 0;
		var vUserName = objLoginUser.getLoggedInUserName();
		loggedInUserTypeDRV = objLoginUser.getLoggedInUserType();
		//var vVendorCode  = $("#idDepotCodeDRV").val();
		var vVendorCode = sap.ui.getCore().byId("idDepotCodeDRV").getValue();
		if(loggedInUserTypeDRV != "SEACO"){
			var temp = jQuery.grep( CustomerDataComboDRV, function(element, index){
		  		   return element.CustName == vVendorCode;
		  	   });
				vCustomerCode = temp[0].Partner.replace(/^0+/, '');
		}
		else{
			vCustomerCode = sap.ui.getCore().byId("idDepotCodeDRV").getSelectedKey();
		}
		
		var urlToCall = serviceUrl + "/Drv_Email?$filter=Customer eq '" + vCustomerCode + "'"; 
		for(var j=0 ; j < aDRVDetails.length ; j++){
			for(var i=0 ; i < vChkBoxChkdLen ; i++){
				if(aDRVDetails[j].Sernr == aChkBoxChkd[i].name){
					if(count==0){
						Row[count] = aDRVDetails[j].Sernr + "|" + aDRVDetails[j].UnitType + "|" + aDRVDetails[j].Lease + "|" + aDRVDetails[j].Rate.trim() + "|" + aDRVDetails[j].Currency + "|" + aDRVDetails[j].DepotComments + "@" + vUserName;
					}
					else{
					 Row[count] = aDRVDetails[j].Sernr + "|" + aDRVDetails[j].UnitType + "|" + aDRVDetails[j].Lease + "|" + aDRVDetails[j].Rate.trim() + "|" + aDRVDetails[j].Currency + "|" + aDRVDetails[j].DepotComments;
					}
					 count++;
					 break;
				}
			}
		}
		
		for(var k=0 ; k < Row.length ; k++){
			//alert("row " + k + "value " + Row[k]);
			urlToCall = urlToCall + " and Row" + (k+1) + " eq '" + Row[k] + "'"; 
		}
		//alert("url " + urlToCall);
		
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
   	    	 busyDialog.close();
   	    	 if(data.results.length > 0){
   	    		 var msg = data.results[0].DepotComments.split("|");
   	    		var custMail = (msg[2].trim().length == 0 ? "-" : msg[2]);
   	    		
   	    		 var SuccessMsg = msg[0] + "\n" + msg[1] + "\n" + custMail + "\n\n" + msg[3] + "\n" + msg[4] + "\n";
   	    		 if(msg[5].trim().length != 0){
   	    			 var csMailIds = msg[5].split("$");
   	    			 for(var i=0;i<csMailIds.length;i++){
   	    				SuccessMsg += csMailIds[i] + "\n";
   	    			 }
   	    		 }
   	    		 else{
   	    			SuccessMsg += "-";
   	    		 }
   	    		
   	    		sap.ui.commons.MessageBox.alert(SuccessMsg);
   	    	 }
   	    	 else{
   	    		sap.ui.commons.MessageBox.alert("Mail could not be sent currently. Please try again later");
   	    	 }
   	     },
   	  	function(err){
    	   busyDialog.close();
    		  errorfromServer(err);
       });
	}
	
});
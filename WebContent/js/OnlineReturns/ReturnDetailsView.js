/*********** NP **********/

jQuery.sap.require("sap.ui.model.json.JSONModel");
var vClickedReturn_ReturnDetTbl = "";
	var aReturnDetailsOR = [];
var jsonExistingReturnsDetailOR = [];

var vHelpValueRetDet = "";
sap.ui.model.json.JSONModel.extend("returnDetailsView", {
	
	createReturnDetails:function(){
		var oFlexboxRetDet = new sap.m.FlexBox("idRetDetFlxBox",{
            items: [],
            direction: "Row"
		  });
		
		return oFlexboxRetDet;
	},
	
	createReturnDetailsForm: function(){
		sap.ui.getCore().byId("idRetDetFlxBox").destroyItems();
		  var backRetDetOR = new sap.m.Link("idBackRetDetOR", {text: " < Back",
        	  width:"15%",
        	  wrapping:true,
        	  press: function(){
        		  var bus = sap.ui.getCore().getEventBus();
        			bus.publish("nav", "back");
       	  }});
		  
		// Responsive Grid Layout
		var oReturnDetailsLayout = new sap.ui.layout.form.ResponsiveGridLayout("idReturnDetailsLayout");
		
		// Buttons
		/*var oBtnRetDetPrint = new sap.m.Button({
            text : "Print",
            width:"80px",
            type:sap.m.ButtonType.Unstyled,
            icon: sap.ui.core.IconPool.getIconURI("print"),
            press:function(){
                  alert("Print CLicked");
                  //oController.submitReleaseClicked();
            }
         }).addStyleClass("submitBtn");*/
  
         
         var oBtnRetDetExport = new sap.m.Button({
        	 text : "Export To Excel",
             type:sap.m.ButtonType.Unstyled,
             width:"145px",
             icon: sap.ui.core.IconPool.getIconURI("excel-attachment"),
            press:function(){
                 var vTitle = "Existing Redelivery";
                 //var objUtil = new utility();
                 objUtil.makeHTMLTable(jsonExistingReturnsDetailOR, vTitle,"export");
            }
         }).addStyleClass("submitBtn");
         
         var oFlexboxForExportBtn = new sap.m.FlexBox({
    		  items: [oBtnRetDetExport ],
    		  width:"30%",
    		  direction: sap.m.FlexDirection.RowReverse
    		});
         
         var oLabelTblTitle = new sap.ui.commons.Label({text: "Existing Redelivery",
 			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: true, margin: false}),
             wrapping: true}).addStyleClass("font15Bold marginTop10");
         
         var oFlexboxRetDetTableTitle = new sap.m.FlexBox({
   		  items: [oLabelTblTitle ],
   		  width:"70%",
   		  direction: "Row"
   		});
         
         var oFlexboxRetDetTableHeader = new sap.m.FlexBox({
      		  items: [oFlexboxRetDetTableTitle,oFlexboxForExportBtn],
      		  width:"100%",
      		  direction: "Row"
      		});
         
         var oBtnViewAll = new sap.m.Button("idBtnViewAllRetDetOR",{
             text : "View All",
             styled:false,
             width:"80px",
             press:function(){
            	 oBtnViewAll.setVisible(false);
                 var vArrayLength = aReturnDetailsOR.length;
		        	if(vArrayLength < 100){
		        		sap.ui.getCore().byId("idReturnDetTblOR").setVisibleRowCount(vArrayLength);
		        		sap.ui.getCore().byId("idReturnDetTblOR").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		        	}
		        	else{
		        		sap.ui.getCore().byId("idReturnDetTblOR").setVisibleRowCount(100);
		        		sap.ui.getCore().byId("idReturnDetTblOR").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		        	}
             }
          }).addStyleClass("submitBtn marginTop10");
		
		// Flex Box
	   /* var oFlexBoxPrintExp = new sap.m.FlexBox({
    		width: "100%",
    		items:[
					oBtnRetDetExport,
					oBtnRetDetPrint
    		],
    		direction: sap.m.FlexDirection.RowReverse
    	});*/
	    
	 // Table
		var oReturnDetailsTable = new sap.ui.table.Table("idReturnDetTblOR",{
			visibleRowCount: 25,
	        firstVisibleRow: 3,
	        columnHeaderHeight: 40,
	        selectionMode: sap.ui.table.SelectionMode.None,
	        navigationMode: sap.ui.table.NavigationMode.Paginator,
	      //  width: "100%",
	        //height:"100%"
    	 }).addStyleClass("fontStyle tblBorder marginTop10");
		
			// Table Columns
			 oReturnDetailsTable.addColumn(new sap.ui.table.Column({
		     label: new sap.ui.commons.Label({text: "Lease"}),
 	         template: new sap.ui.commons.TextView().bindProperty("text", "Lease"),
 	         sortProperty: "Lease",
 	         filterProperty: "Lease",
 	         resizable:false,
 	         width:"70px",
			 }));
			 
			 oReturnDetailsTable.addColumn(new sap.ui.table.Column({
				 label: new sap.ui.commons.Label({text: "Return"}),
				 template: new sap.ui.commons.Link({
						press : function() {
							 vClickedReturn_ReturnDetTbl = this.getHelpId().split("$")[0];
							 vHelpValueRetDet = this.getHelpId();
							// alert("help value ret det" + vHelpValueRetDet);
							var bus = sap.ui.getCore().getEventBus();
				        	  bus.publish("nav", "to", {
			                  id : "OnlineReservation"
			              }); 
				        	var oReturnDetailsDetail = new ReturnDetailsDetailView();
				        	oReturnDetailsDetail.bindReturnDetailsDetail();
						}
					}).bindProperty("text", "Ordno").bindProperty("helpId","helpValueRetDet"),
	 	         sortProperty: "Ordno",
	 	         filterProperty: "Ordno",
	 	        resizable:false,
	 	         width:"60px",
				 }));
			 
			 oReturnDetailsTable.addColumn(new sap.ui.table.Column({
				 label: new sap.ui.commons.Label({text: "Unit Type"}),
				 template: new sap.ui.commons.TextView().bindProperty("text", "UnitType"),
	 	         sortProperty: "UnitType",
	 	         filterProperty: "UnitType",
	 	        resizable:false,
	 	         width:"80px",
				 }));
			 
			 oReturnDetailsTable.addColumn(new sap.ui.table.Column({
				 label: new sap.ui.commons.Label({text: "Location"}),
				 template: new sap.ui.commons.TextView().bindProperty("text", "Location"),
	 	         sortProperty: "Location",
	 	         filterProperty: "Location",
	 	        resizable:false,
	 	         width:"110px",
				 }));
			 
			 oReturnDetailsTable.addColumn(new sap.ui.table.Column({
				 label: new sap.ui.commons.Label({text: "Depot"}),
				 template: new sap.ui.commons.TextView().bindProperty("text", "Depot"),
	 	         sortProperty: "Depot",
	 	         filterProperty: "Depot",
	 	        resizable:false,
	 	         width:"240px",
				 }));
			 
			 var oTotalCol = new sap.ui.table.Column({
				 label: new sap.ui.commons.TextView({text: "Total Quantity",}).addStyleClass("tblHeaderCustomTV"),
				 //hAlign:sap.ui.commons.layout.HAlign.End,
				 template:new sap.ui.commons.TextView({}).bindProperty("text", "TotQty"), 
	 	         sortProperty: "TotQty",
	 	         filterProperty: "TotQty",
	 	         resizable:false,
	 	         width:"80px",
				 });
			   var oUtil = new utility();
			 oReturnDetailsTable.addColumn(oTotalCol);
			oUtil.addColumnSorterAndFilter(oTotalCol, oUtil.compareUptoCount);
				
			 var oQtyRetCol = new sap.ui.table.Column({
				 label: new sap.ui.commons.TextView({text: "Quantity Returned",}).addStyleClass("tblHeaderCustomTV"),
				 template: new sap.ui.commons.TextView().bindProperty("text", "ReturnQty"),
	 	         sortProperty: "ReturnQty",
	 	         filterProperty: "ReturnQty",
	 	         resizable:false,
	 	         width:"80px",
				 });
			 oReturnDetailsTable.addColumn(oQtyRetCol);
			 oUtil.addColumnSorterAndFilter(oQtyRetCol, oUtil.compareUptoCount);
				
			 var oOutCol = new sap.ui.table.Column({
				 label: new sap.ui.commons.TextView({text: "Outstanding Quantity",}).addStyleClass("tblHeaderCustomTV"),
				 template: new sap.ui.commons.TextView().bindProperty("text", "OutstandQty"),
	 	         sortProperty: "OutstandQty",
	 	         filterProperty: "OutstandQty",
	 	         resizable:false,
	 	         width:"100px",
				 });
			 oReturnDetailsTable.addColumn(oOutCol);
			 oUtil.addColumnSorterAndFilter(oOutCol, oUtil.compareUptoCount);
				
			 oReturnDetailsTable.addColumn(new sap.ui.table.Column({
				 label: new sap.ui.commons.Label({text: "Status"}),
				 template: new sap.ui.commons.TextView().bindProperty("text", "Status"),
	 	         sortProperty: "Status",
	 	         filterProperty: "Status",
	 	         resizable:false,
	 	         width:"150px",
				 }));
			 
			 oReturnDetailsTable.addColumn(new sap.ui.table.Column({
				 label: new sap.ui.commons.Label({text: "Expiry Date",}),
				 template: new sap.ui.commons.TextView().bindProperty("text", "ExpiryDate"),
	 	         sortProperty: "ExpiryDateActual",
	 	         filterProperty: "ExpiryDate",
	 	         resizable:false,
	 	         width:"100px",
				 }));
			 
		    	
		    	// Flex Box
			    var oFlexBoxAll = new sap.m.FlexBox({
		    		width: "100%",
		    		items:[
							oFlexboxRetDetTableHeader,
							oReturnDetailsTable,
							oBtnViewAll
							
		    		],
		    		direction: "Column"
		    	});
		    	
		    	// Online Form Starts
				var oReturnDetailsForm = new sap.ui.layout.form.Form("idReturnDetailsForm",{
					                layout: oReturnDetailsLayout,
					                formContainers: [
					                        
					                        new sap.ui.layout.form.FormContainer("idReturnDetailsFormC1",{
					                                //title: "Returns",
					                                formElements: [
																new sap.ui.layout.form.FormElement({
																    fields: [backRetDetOR],
																    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
																}),
																new sap.ui.layout.form.FormElement({
																    fields: [oFlexBoxAll]
																})
					                                        ]
					                        })		                        
					                ]
					        });
				
				sap.ui.getCore().byId("idRetDetFlxBox").addItem(oReturnDetailsForm);
					        	//return oReturnDetailsForm;
	}, //createReturnDetails
	
	bindReturnDetails: function(){
		busyDialog.open();
		var urlToCall = serviceUrl + "/Return_Detail_1?$filter=Ordno eq '" + vClickedReturn_ExstReturnTbl + "'";
		//var urlToCall = serviceUrl + "/Return_Detail_1?$filter=Ordno eq '402085'";
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
		    	//var objUtil = new utility();
		    	aReturnDetailsOR = [];
		    	jsonExistingReturnsDetailOR = [];
		    	var vReturnDetailsTable = sap.ui.getCore().byId("idReturnDetTblOR");
		    	var vBtnViewAll = sap.ui.getCore().byId("idBtnViewAllRetDetOR");
		    	var len = data.results.length;
		    	if(len > 0){
		    		//alert("ret det length " + len)
			    	//aReturnDetailsOR = data.results;
			    	for(var i=0 ; i <len ; i++){
			    		data.results[i].Lease = objUtil.removeLeadZero(data.results[i].Lease);
			    		//alert("lease " + aReturnDetailsOR[i].Lease)
				    	var vExpDt = data.results[i].ExpiryDate.split("(");
						var vDate= vExpDt[1].split(")");
						var vActualDate = new Date(Number(vDate[0]));
						var vformattedExpDt = dateFormat(new Date(Number(vDate[0])), 'dd-mm-yyyy',"UTC");
						  if (vformattedExpDt.substring(6) === "9999"){
							  data.results[i].ExpiryDate =  "-";
						  }
						  else{
							  data.results[i].ExpiryDate = vformattedExpDt;
						  }
						  var helpVal = data.results[i].Ordno+"$"+data.results[i].UnitType+"$"+data.results[i].Location;//+"$"+data.results[i].Depot
						  var helpToPass = data.results[i].Ordno+"$"+data.results[i].UnitType+"$"+data.results[i].Location+"$"+data.results[i].Depot;
						 // alert("help val ret det " + helpVal);
						  aReturnDetailsOR.push({
							  	'Lease':data.results[i].Lease,
					            'Ordno':data.results[i].Ordno,
					            'UnitType':data.results[i].UnitType,
					            'Location':data.results[i].Location,
					            'Depot':data.results[i].Depot,
					            'TotQty':data.results[i].TotQty,
					            'ReturnQty':data.results[i].ReturnQty,
					            'OutstandQty':data.results[i].OutstandQty,
					            'Status':data.results[i].Status,
					            'ExpiryDate':data.results[i].ExpiryDate,
					            'help':helpVal,
					            'helpValueRetDet':helpToPass
						  });
						 // alert("length b4 " + aReturnDetailsOR.length + data.results[i].Depot);
			    	}
						 
						  aReturnDetailsOR = jQuery.grep(aReturnDetailsOR, function(element, index){
				                return element.help == vValueHelpFrmExstRet;
			        		});
						 // alert("length after " + aReturnDetailsOR.length + aReturnDetailsOR[0].Depot);
						  for(var i=0;i<aReturnDetailsOR.length;i++){
							  jsonExistingReturnsDetailOR.push({
								  	'Lease':aReturnDetailsOR[i].Lease,
						            'Return':aReturnDetailsOR[i].Ordno,
						            'Unit Type':aReturnDetailsOR[i].UnitType,
						            'Location':aReturnDetailsOR[i].Location,
						            'Depot':aReturnDetailsOR[i].Depot,
						            'Total Quantity':aReturnDetailsOR[i].TotQty,
						            'Quantity Returned':aReturnDetailsOR[i].ReturnQty,
						            'Outstanding Quantity':aReturnDetailsOR[i].OutstandQty,
						            'Status':aReturnDetailsOR[i].Status,
						            'Expiry Date':aReturnDetailsOR[i].ExpiryDate,
						        });
						  }
			    	
			    	//Create a model and bind the table rows to this model
			    	var oModelReturnDetails = new sap.ui.model.json.JSONModel();
			    	oModelReturnDetails.setData({modelData: aReturnDetailsOR});
			    	vReturnDetailsTable.setModel(oModelReturnDetails);
			    	vReturnDetailsTable.bindRows("/modelData");
			    	var vLen = aReturnDetailsOR.length;
			    	if(vLen < 25){
			    		vReturnDetailsTable.setVisibleRowCount(vLen);
			    		vReturnDetailsTable.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
			    		vBtnViewAll.setVisible(false);
			    	}
			    	else{
			    		vReturnDetailsTable.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
			    		vReturnDetailsTable.setVisibleRowCount(25);
			    		vBtnViewAll.setVisible(true);
			    	}
			    	busyDialog.close();
		    	}
		    	else{
		    		 sap.ui.commons.MessageBox.show("No results found. Please try again later.",
		                     sap.ui.commons.MessageBox.Icon.WARNING,
		                     "Warning",
		                     [sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO], 
		                     oCurrent.fnCallbackMessageBox,
		                         sap.ui.commons.MessageBox.Action.YES); 
		    		 busyDialog.close();
		    	}
		    	
		    },
		    function(err){
		    	busyDialog.close();
		    	errorfromServer(err);
		    }); //odata request
	}
});
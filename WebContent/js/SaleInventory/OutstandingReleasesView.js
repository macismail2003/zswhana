var aOutstandingRelAllData = [];
var aOutstandingRelSummData = [];
var aOutstandingRelDetailData = [];
var selRelNoOutRelSI = "";
var LoggedInUserTypeOutRel = "";

sap.ui.model.json.JSONModel.extend("outstandingReleasesView", {
	
	createOutstandingReleases: function(){
		var oCurrent = this;
		// Buttons
		var oBtnViewAllOutstandingRel = new sap.m.Button("idOutstandingReleasesViewAllBtn",{
            text : "View All",
            styled:false,
	        width:"80px",
            press:function(){
            	this.setVisible(false);
	        	var vArrayLength = aOutstandingRelSummData.length;
	        	if(vArrayLength < 100){
	        		sap.ui.getCore().byId("idOutStandingRelSumTbl").setVisibleRowCount(vArrayLength);
	        		sap.ui.getCore().byId("idOutStandingRelSumTbl").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
	        	}
	        	else{
	        		sap.ui.getCore().byId("idOutStandingRelSumTbl").setVisibleRowCount(100);
	        		sap.ui.getCore().byId("idOutStandingRelSumTbl").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
	        	}
	          }
         }).addStyleClass("submitBtn marginTop10");

		// Table
    	var oOutReleasesTable = new sap.ui.table.Table("idOutStandingRelSumTbl",{
    		visibleRowCount: 2,
            firstVisibleRow: 3,
            columnHeaderHeight: 45,
            fixedColumnCount:1,
            selectionMode: sap.ui.table.SelectionMode.None,
            navigationMode: sap.ui.table.NavigationMode.Paginator,
            width: "60%",
            height:"100%"
    	 }).addStyleClass("tblBorder marginTop10");
    	
    	// Table Columns
    	oOutReleasesTable.addColumn(new sap.ui.table.Column({
    		label: new sap.ui.commons.Label({text: "Release Number"}).addStyleClass("wraptextcol"),
    		 template: new sap.ui.commons.Link({
    				press : function() {
    					selRelNoOutRelSI = this.getText();
    					var bus = sap.ui.getCore().getEventBus();
    					bus.publish("nav", "to", {
    						id : "OutstandingRelDet"
    					}); 
    					var oOutRelDetTbl = new outstandingRelDetailsView();
    					oOutRelDetTbl.createOutstandingRelDetailsFormView();
    					oOutRelDetTbl.bindOutRelDetails();
    				}
    		 }).bindProperty("text", "Releaseno"),
	         sortProperty: "Releaseno",
	         filterProperty: "Releaseno",
	         width:"130px",
	         resizable:false
	    	 }));
    	 
    	var oTotalCol = new sap.ui.table.Column({
    		label: new sap.ui.commons.Label({text: "Total Quantity"}).addStyleClass("wraptextcol"),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "TotalQty"),
             sortProperty: "TotalQty",
             filterProperty: "TotalQty",
             width:"100px",
	         resizable:false
    		 });
    	var oUtil = new utility();
    	oOutReleasesTable.addColumn(oTotalCol);
		oUtil.addColumnSorterAndFilter(oTotalCol, oUtil.compareUptoCount);
		
    	var oQtyPickCol = new sap.ui.table.Column({
    		label: new sap.ui.commons.Label({text: "Quantity Picked"}).addStyleClass("wraptextcol"),
            template: new sap.ui.commons.TextView().bindProperty("text", "PickedQty"),
            sortProperty: "PickedQty",
            filterProperty: "PickedQty",
            width:"120px",
	         resizable:false
       	 });
    	oOutReleasesTable.addColumn(oQtyPickCol);
		oUtil.addColumnSorterAndFilter(oQtyPickCol, oUtil.compareUptoCount);
		
    	var oQtyOutCol = new sap.ui.table.Column({
       		label: new sap.ui.commons.Label({text: "Quantity Outstanding"}).addStyleClass("wraptextcol"),
       		 template: new sap.ui.commons.TextView().bindProperty("text", "OutQty"),
                sortProperty: "OutQty",
                filterProperty: "OutQty",
                width:"150px",
   	         resizable:false
       		 });
    	oOutReleasesTable.addColumn(oQtyOutCol);
		oUtil.addColumnSorterAndFilter(oQtyOutCol, oUtil.compareUptoCount);
		
    	oOutReleasesTable.addColumn(new sap.ui.table.Column({
       		label: new sap.ui.commons.Label({text: "Expiry Date"}).addStyleClass("wraptextcol"),
            template: new sap.ui.commons.TextView().bindProperty("text", "ExpiryDate"),
            sortProperty: "ExpDateActual",
            filterProperty: "ExpiryDate",
            width:"100px",
	         resizable:false
       	 }));
    	
    	 var oLabelTblTitle = new sap.ui.commons.Label({text: "Outstanding Releases",
  			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: true, margin: false}),
              wrapping: true}).addStyleClass("font15Bold marginTop10");
    	 
    	 
    	 /*temp start */
 		var oLabelCustomerID = new sap.ui.commons.Label({text: "Customer ID: ",required:true,wrapping: true,
 			  layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: false})}).addStyleClass("marginTop10");
 		/*var labHardCode2 =  new sap.ui.commons.Label({text:"Temporary Field added till Security is implemented",
             wrapping: true,
             layoutData: new sap.ui.layout.GridData({span: "L4 M2 S4"})}).addStyleClass("font10");*/
 		var LblFlexDepotCode = new sap.m.FlexBox({ items: [ oLabelCustomerID],  //, labHardCode2 
 	          direction: "Column", 
 	          layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: false})});
 		
 		var oTxtFCustomerID = new sap.ui.commons.TextField("idValcustomerIDOutRelSI",{
 			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: false, margin: false}),
 			placeholder:"Customer ID"
 		}).addStyleClass("marginTop10");
 		
 		 var labStar = new sap.ui.commons.Label({text: "* "}).addStyleClass("MandatoryStar");
 		  var lblSpaceLegend = new sap.ui.commons.Label( {text: " ",width : '5px'});
 		  var labRequired = new sap.ui.commons.Label({text: " Mandatory Field",wrapping: true});
 		  var oFlexboxReq = new sap.m.FlexBox({
 			 // layoutData: new sap.ui.layout.GridData({span: "L7 M6 S4"}),
             items: [labStar,lblSpaceLegend,labRequired],
             direction: "Row"
 		  }).addStyleClass("marginTop10");
 		
 		var oBtnOK = new sap.m.Button("idBtnSubmitOutRel",{
 	          text : "Submit",
 	          styled:false,
 	          width:"80px",
 	          layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: true}),
 	          press:function(){
 	        	 
 	        	  var valid = true;
 	        	  if(sap.ui.getCore().byId("idValcustomerIDOutRelSI").getValue() == ""){
 	        		  sap.ui.getCore().byId("idValcustomerIDOutRelSI").setValueState(sap.ui.core.ValueState.Error);
 	        		  sap.ui.getCore().byId("idValcustomerIDOutRelSI").setPlaceholder("Enter Customer ID");
 	        		  valid = false;
 	        	  }
 	        	  if(valid){
 	        		  busyDialog.open();
 	        		  oCurrent.bindOutstandingReleasesSI();
 	        	  }
 	          }}).addStyleClass("submitBtn marginTop10");
 		
 		 var oPayViewLayout = new sap.ui.layout.form.ResponsiveGridLayout("idOutRelViewLayout");
 		 var oCityDetailsForm = new sap.ui.layout.form.Form("idOutRelViewForm",{
              layout: oPayViewLayout,
              formContainers: [
                               new sap.ui.layout.form.FormContainer("idOutRelViewC1",{
 		                            // title: "Sale Inventory Overview - City Details",
 		                             formElements: [
 									new sap.ui.layout.form.FormElement({
 									    fields: [LblFlexDepotCode,oTxtFCustomerID]
 									}),
 									new sap.ui.layout.form.FormElement({
 									    fields: [oBtnOK],
 									    layoutData: new sap.ui.commons.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
 									}),
 									]
                               })
                               ]
 		   });
 		/* temp end*/
 		 
    	// Responsive Grid Layout
	    var oOutReleasesLayout = new sap.ui.layout.form.ResponsiveGridLayout("idOutReleasesLayout");
   	 
		  // Online Form Starts
		     var oOutReleasesForm = new sap.ui.layout.form.Form("idOutReleasesForm",{
		             layout: oOutReleasesLayout,
		             formContainers: [
		                     
		                     new sap.ui.layout.form.FormContainer("idOutReleasesFormC1",{
		                             //title: "Outstanding Releases",
		                             formElements: [
													new sap.ui.layout.form.FormElement({
													    fields: [oLabelTblTitle]
													}),
													new sap.ui.layout.form.FormElement({
													    fields: [oOutReleasesTable]
													}),
													
													new sap.ui.layout.form.FormElement({
													    fields: [oBtnViewAllOutstandingRel]
													})
		                                     ]
		                     })                    
		             ]
		     });
		     sap.ui.getCore().byId("idOutReleasesForm").setVisible(false);
		     var oFlexboxFinal = new sap.m.FlexBox({
	             items: [oCityDetailsForm,oOutReleasesForm],
	             direction: "Column"
	 		  }).addStyleClass("marginTop10");
		     	return oFlexboxFinal;
	},
	
	bindOutstandingReleasesSI: function(){
		busyDialog.open();
		//var ICustomer = "400702";
		LoggedInUserTypeOutRel = objLoginUser.getLoggedInUserType();
		if(LoggedInUserTypeOutRel != "SEACO"){
			ICustomer = objLoginUser.getLoggedInUserID();
		}
		else{
			ICustomer = sap.ui.getCore().byId("idValcustomerIDOutRelSI").getValue();
		}
		//var ICustomer = sap.ui.getCore().byId("idValcustomerIDOutRelSI").getValue();
		oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
		var urlToCall = serviceUrl + "/Cust_Outstnd_Releases?$filter=Customer eq '" + ICustomer + "'";
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
		    	if(data.results.length > 0){
		    		sap.ui.getCore().byId("idOutReleasesForm").setVisible(true);
		    		busyDialog.close();
			    	//var oUtil = new utility();
			    	var dataLen = data.results.length;
			    	for(var i=0;i<dataLen;i++){
			    		data.results[i].Releaseno = objUtil.removeLeadZero(data.results[i].Releaseno);
			    		
			    		 var vExpDtResult = data.results[i].ExpiryDate.split("(");
						  var vDate = vExpDtResult[1].split(")");
						  var vActualExpDate = new Date(Number(vDate[0]));
						  var vformattedExpDate = dateFormat(new Date(Number(vDate[0])), 'dd-mm-yyyy',"UTC");
						  if (vformattedExpDate.substring(6) === "9999"){
							  data.results[i].ExpiryDate =  "-";
							  data.results[i]["ExpDateActual"] =  vActualExpDate;
						  }
						  else{
							  data.results[i].ExpiryDate = vformattedExpDate;
							  data.results[i]["ExpDateActual"] =  vActualExpDate;
						  }
						  aOutstandingRelAllData[i] = data.results[i];
			    	}
			    	aOutstandingRelSummData =  jQuery.grep(aOutstandingRelAllData, function(element, index){
		                   return element.Flag1 == "X";
		        	});
			    	
			    	var vSumTblLen = aOutstandingRelSummData.length;
			    	//Create a model and bind the table rows to this model
			    	var oModelOutReleases = new sap.ui.model.json.JSONModel();
			    	oModelOutReleases.setData({modelData: aOutstandingRelSummData});
			    	var OutRelSumTbl = sap.ui.getCore().byId("idOutStandingRelSumTbl");
			    	OutRelSumTbl.setModel(oModelOutReleases);
			    	OutRelSumTbl.bindRows("/modelData");
			    	if (vSumTblLen < 25){
			    		OutRelSumTbl.setVisibleRowCount(vSumTblLen);
			    		OutRelSumTbl.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
			    		 sap.ui.getCore().byId("idOutstandingReleasesViewAllBtn").setVisible(false);
			    	}
			    	else{
			    		OutRelSumTbl.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
			    		OutRelSumTbl.setVisibleRowCount(25);
			    		 sap.ui.getCore().byId("idOutstandingReleasesViewAllBtn").setVisible(true);
			    	}
		    	}
		    	else{
		    		sap.ui.commons.MessageBox.show("No Results found. Please try again later",
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
		    });
	}
});
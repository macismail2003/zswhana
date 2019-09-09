/******** NP *******/
jQuery.sap.require("sap.ui.model.json.JSONModel");

var oModelUnitsOnLeaseReportCRUOL;
var arrUnitsOnLeaseReport = [];
var jsonCRUOLExportToExcel = [];

sap.ui.model.json.JSONModel.extend("custReportUnitsOnLeaseView", {
	
	createCustReportUnitsOnLease: function(){
		
		var oCurrCRUOL = this;
		var oGetData = new onLoadDataUnitsOnLeaseCRUOL();
		
		// Labels
		var oLabelCustomerID = new sap.ui.commons.Label({text: "Customer ID:",
			required: true,
			layoutData: new sap.ui.layout.GridData({span: "L3 M4 S6",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");
		
		var oLabelLeaseType = new sap.ui.commons.Label({text: "Lease Type:",
			required: true,
			layoutData: new sap.ui.layout.GridData({span: "L3 M4 S6",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("marginTop20");
		
		var oLabelLeaseNumber = new sap.ui.commons.Label({text: "Lease Number:",
			required: true,
			layoutData: new sap.ui.layout.GridData({span: "L3 M4 S6",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("marginTop20");
		
		var oLabelUnitDescription = new sap.ui.commons.Label({text: "Unit Type:",
			layoutData: new sap.ui.layout.GridData({span: "L3 M4 S6",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("marginTop20");
		
		var oLabelMandatory = new sap.ui.commons.Label({text: "Mandatory Field",
			required: true,
			requiredAtBegin : true,
            wrapping: true}).addStyleClass("marginTop10");
		
		
		// Drop down
		/*var oComboCustomer = new sap.ui.core.HTML("idHtmlCustomerIDCRUOL",{layoutData: new sap.ui.layout.GridData({span: "L8 M6 S6"})});
		var htmlContentCustomer = '<input id="idComboCustomerIDCRUOL" placeholder="Select Customer" class="FormInputStyle marginTop10" style="width:100%">';
		oComboCustomer.setContent(htmlContentCustomer);*/
		
		var oComboCustomer = new sap.ui.commons.ComboBox("idComboCustomerIDCRUOL", {
			layoutData: new sap.ui.layout.GridData({span: "L6 M8 S12"}),
			width:"100%",
			//enabled: seacoUser,
			placeholder:"Select Customer",
			 change: function(evnt){
					if(this.getValue() != '')
					{
						var customerID = sap.ui.getCore().byId('idComboCustomerIDCRUOL').getSelectedKey();
			    		if(customerID != ""){
			    			oGetData.GetOnLeaseDataCRUOL();
			    		}
					}
		          }
		}).addStyleClass("marginTop10");
		
		// Auto suggest
    	var oInputLeaseType = new control.AutoCompleteValueHolder('idLeaseTypeCRUOL', {
            layoutData: new sap.ui.layout.GridData({span: "L8 M6 S6"}),
            enabled: true,
            itemSelectLimit: 25,
            placeholder: "Lease Type",
            selectedItem: function (event) {
          	  var selLeaseType = ''; 
                for(var i=0;i<event.mParameters.allItems.length;i++)
                	selLeaseType += event.mParameters.allItems[i].description +'$';
                
                selLeaseType = selLeaseType.slice(0,-1);
                oGetData.onLeaseTypeChange(selLeaseType);
               },
               deletedItem: function (event) {
                          var selLeaseType='';
                          var selectedValues = sap.ui.getCore().byId('idLeaseTypeCRUOL').getSelectedValues();
                          for(var i=0;i<selectedValues.length;i++)
                        	  selLeaseType += selectedValues[0].code +'$';
                          
                          if(selectedValues.length == 0){
                        	  aLeaseNumberCRUOL = [];
                        	  
                        	  aLeaseNumberCRUOL = [];
                        	  sap.ui.getCore().byId('idLeaseNumberCRUOL').clearSelectedValues();
                        	  sap.ui.getCore().byId('idLeaseNumberCRUOL').destroyAllItems();
                        	  
                        	  aUnitDescrCRUOL = [];
                        	  sap.ui.getCore().byId('idUnitDescrCRUOL').clearSelectedValues();
                        	  sap.ui.getCore().byId('idUnitDescrCRUOL').destroyAllItems();

                          }
                          
                          selLeaseType = selLeaseType.slice(0,-1);
                          oGetData.onLeaseTypeChange(selLeaseType);
               },
               beforDeleteItem: function(event){
              	 this.setConfirmEnabled(true);
              	 this.setConfirmMessage("This will reset all the data in the dependent Location fields. Do you still want to continue?");
               },
               deletedAllItems: function (event) {
               }
		  });
    	oInputLeaseType.addStyleClass("marginTop10");
    	
    	var oInputLeaseNumber = new control.AutoCompleteValueHolder('idLeaseNumberCRUOL', {
            layoutData: new sap.ui.layout.GridData({span: "L8 M6 S6"}),
            enabled: false,
            itemSelectLimit: 25,
            placeholder: "Lease Number",
            selectedItem: function (event) {
                   var selLeaseNumber=''; 
                   for(var i=0;i<event.mParameters.allItems.length;i++)
                	   selLeaseNumber += event.mParameters.allItems[i].description +'$';
                   
                   selLeaseNumber = selLeaseNumber.slice(0,-1);
                   oGetData.onLeaseNumberChange(selLeaseNumber);
               },
               deletedItem: function (event) {
              	 sap.ui.getCore().byId('idLeaseNumberCRUOL').mProperties.placeholder = 'Lease Number';
              	 
              	 var selLeaseNumber=''; 
              	 var selectedValuesLeaseNumber = sap.ui.getCore().byId('idLeaseNumberCRUOL').getSelectedValues();
                   for(var i=0;i<selectedValuesLeaseNumber.length;i++)
                	   selLeaseNumber += selectedValuesLeaseNumber[i].description +'$';
                   
                   if(selectedValuesLeaseNumber.length == 0){
                	   aUnitDescrCRUOL = [];
                   }
                   
                   selLeaseNumber = selLeaseNumber.slice(0,-1);
                   oGetData.onLeaseNumberChange(selLeaseNumber);
               },
               beforDeleteItem: function(event){
              	 this.setConfirmEnabled(true);
              	 this.setConfirmMessage("This will reset all the data in the dependent Location fields. Do you still want to continue?");
               },
               deletedAllItems: function (event) {
        }
      });
    	oInputLeaseNumber.addStyleClass("marginTop10");
    	
    	var oInputUnitDescr = new control.AutoCompleteValueHolder('idUnitDescrCRUOL', {
            layoutData: new sap.ui.layout.GridData({span: "L8 M6 S6"}),
            enabled: false,
            itemSelectLimit: 25,
            placeholder: "Unit Type",
            selectedItem: function (event) {
                   sap.ui.getCore().byId('idUnitDescrCRUOL').mProperties.placeholder = 'Unit Type';
                   sap.ui.getCore().byId('idLeaseNumberCRUOL').mProperties.placeholder = 'Lease Number';
                   sap.ui.getCore().byId('idLeaseNumberCRUOL').removeHolderReuqired();
               },
               deletedItem: function (event) {
                   sap.ui.getCore().byId('idUnitDescrCRUOL').mProperties.placeholder = 'Unit Type';
               },
               deletedAllItems: function (event) {
               }
    	});
    	oInputUnitDescr.addStyleClass("marginTop10");
    	
    	
    	// Buttons
	   	 var oBtnSubmit = new sap.m.Button("idBtnSubmitCRUOL",{
		          text : "Submit",
		          width:"80px",
		          styled:false,
		          layoutData: new sap.ui.layout.GridData({span: "L2 M5 S4",linebreak: true, margin: true}),
		          press:function(){
		        	  if(oCurrCRUOL.validateUnitsOnLeaseCRUOL()){
		        		  oCurrCRUOL.getUnitsOnLeaseReportCRUOL();
		        	  }
		        	  }}).addStyleClass("submitBtn marginTop10");
	   	 
	   	var oBtnReset = new sap.m.Button("idBtnResetCRUOL",{
            text : "Reset",
            width:"80px",
            styled:false,
            layoutData: new sap.ui.layout.GridData({span: "L2 M5 S4",linebreak: true, margin: true}),
            press:function(){
                  oCurrCRUOL.resetOnLeaseCRUOL();
                  }}).addStyleClass("submitBtn marginTop10");
         
         var oLabelSpaceCRUOL = new sap.ui.commons.Label({text: " ",
                width:"8px",
                wrapping: true});
         
         var oFlexButtons = new sap.m.FlexBox({
             items: [
                                    oBtnSubmit,
                                    oLabelSpaceCRUOL,
                                    oBtnReset
             ],
             direction : "Row",
                      }).addStyleClass("marginTop10");

	   	 
	  // Responsive Grid Layout
		    var oUnitsOnLeaseLayout = new sap.ui.layout.form.ResponsiveGridLayout("idUnitsOnLeaseCRUOLLayout",{
		    	 /* labelSpanL: 1,
               labelSpanM: 1,
               labelSpanS: 1,
               emptySpanL: 0,
               emptySpanM: 0,
               emptySpanS: 0,
               columnsL: 1,
               columnsM: 1,
               columnsS: 1,
               breakpointL: 765,
               breakpointM: 320*/
		    });
 
		  // Online Form Starts
		     var oUnitsOnLeaseForm = new sap.ui.layout.form.Form("idUnitsOnLeaseCRUOLForm",{
		             layout: oUnitsOnLeaseLayout,
		             formContainers: [
		                     
		                     new sap.ui.layout.form.FormContainer("idUnitsOnLeaseCRUOLFormC1",{
	                             formElements: [
													new sap.ui.layout.form.FormElement({
													    fields: [oLabelCustomerID, oComboCustomer]
													}),
													new sap.ui.layout.form.FormElement({
													    fields: [oLabelLeaseType, oInputLeaseType]
													}),
													new sap.ui.layout.form.FormElement({
													    fields: [oLabelLeaseNumber, oInputLeaseNumber]
													}),
													new sap.ui.layout.form.FormElement({
													    fields: [oLabelUnitDescription, oInputUnitDescr]
													}),
													new sap.ui.layout.form.FormElement({
													    fields: [oFlexButtons]
													}),
													new sap.ui.layout.form.FormElement({
													    fields: [oLabelMandatory]
													})
		                                     ]
		                     }),
		                     new sap.ui.layout.form.FormContainer("idUnitsOnLeaseCRUOLFormC2",{
	                             formElements: []
		                     })
		             ]
		     });
		     
		     var vHDivider = new sap.ui.commons.HorizontalDivider({width: "95%", type: "Area", height: "Medium"});
		     
		  // Responsive Grid Layout
			    var oUnitsOnLeaseReportLayout = new sap.ui.layout.form.ResponsiveGridLayout("idUnitsOnLeaseReportCRUOLLayout",{
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
	 
			  // Online Form Starts
			     var oUnitsOnLeaseReportForm = new sap.ui.layout.form.Form("idUnitsOnLeaseReportCRUOLForm",{
			             layout: oUnitsOnLeaseReportLayout,
			             formContainers: [
			                     
			                     new sap.ui.layout.form.FormContainer({
		                             formElements: [
														new sap.ui.layout.form.FormElement("idShowUnitsOnLeaseReportCRUOL",{
														    fields: [],
														    layoutData: new sap.ui.layout.GridData({span: "L9 M9 S4",linebreak: true, margin: true})
														})
			                                     ]
			                     }),
			             ]
			     });
			     
			     var oFlexAll = new sap.m.FlexBox({
 		           items: [
 							oUnitsOnLeaseForm,
 							vHDivider,
 							oUnitsOnLeaseReportForm
 		           ],
 		           direction : "Column",
 					});
			 	
		     	return oFlexAll;
	},
	
	resetOnLeaseCRUOL: function(){
        //$("#idComboCustomerIDCRUOL").val("");
        sap.ui.getCore().byId("idLeaseTypeCRUOL").clearSelectedValues();
        sap.ui.getCore().byId('idLeaseTypeCRUOL').destroyAllItems();
        sap.ui.getCore().byId("idLeaseNumberCRUOL").clearSelectedValues();
        sap.ui.getCore().byId('idLeaseNumberCRUOL').destroyAllItems();
        sap.ui.getCore().byId("idUnitDescrCRUOL").clearSelectedValues();
        sap.ui.getCore().byId('idUnitDescrCRUOL').destroyAllItems();
        
		/*HSN_SEAWEB*/
        //$("#idComboCustomerIDCRUOL").val("");
		sap.ui.getCore().byId('idComboCustomerIDCRUOL').setSelectedKey("");
		sap.ui.getCore().byId('idComboCustomerIDCRUOL').setPlaceholder("Select Customer");
		//$("#idComboCustomerIDCRUOL").val("");
		//$("#idComboCustomerIDCRUOL").attr("placeholder","Select Customer");
		/*HSN_SEAWEB*/
		
        document.getElementById("idComboCustomerIDCRUOL").style.borderColor = "#cccccc";
        document.getElementById("idComboCustomerIDCRUOL").style.background = "#ffffff";
        $("#idComboCustomerIDCRUOL").attr("placeholder","Select Customer");
        
        sap.ui.getCore().byId("idLeaseTypeCRUOL").setHolderPlaceHolder("Lease Type");
        sap.ui.getCore().byId("idLeaseNumberCRUOL").setHolderPlaceHolder("Lease Number");
        
        if(sap.ui.getCore().byId("idFlexUnitsOnLeaseReportCRUOL")){
			sap.ui.getCore().byId("idFlexUnitsOnLeaseReportCRUOL").destroy();
		}
	},
	
	validateUnitsOnLeaseCRUOL: function(){
		var isValid = true;
		
		//var customer = document.getElementById("idComboCustomerIDCRUOL").value;
		var customer = sap.ui.getCore().byId('idComboCustomerIDCRUOL').getSelectedKey();
		var leaseType = sap.ui.getCore().byId("idLeaseTypeCRUOL").getSelectedValues();
		var leaseNumber = sap.ui.getCore().byId("idLeaseNumberCRUOL").getSelectedValues();
		
		if(customer == ""){
			document.getElementById("idComboCustomerIDCRUOL").style.borderColor = "red";
    		document.getElementById("idComboCustomerIDCRUOL").style.background = "#FAD4D4";
    		$("#idComboCustomerIDCRUOL").attr("placeholder","Required");
    		
	  		isValid = false;
		}
		else{
			document.getElementById("idComboCustomerIDCRUOL").style.borderColor = "cccccc";
    		document.getElementById("idComboCustomerIDCRUOL").style.background = "#ffffff";
		}
		
		if(leaseType.length < 1){
	  		sap.ui.getCore().byId("idLeaseTypeCRUOL").setHolderPlaceHolder("Required");
	  		sap.ui.getCore().byId("idLeaseTypeCRUOL").setHolderBorderReuqired();
	  		sap.ui.getCore().byId("idLeaseTypeCRUOL").setHolderEnabled(true);
	  		
			isValid = false;
		}
		
		if(leaseNumber.length < 1){
			sap.ui.getCore().byId("idLeaseNumberCRUOL").setHolderPlaceHolder("Required");
			sap.ui.getCore().byId("idLeaseNumberCRUOL").setHolderBorderReuqired();
	  		sap.ui.getCore().byId("idLeaseNumberCRUOL").setHolderEnabled(true);
	  		
			isValid = false;
		}
		
		return isValid;
	},
	
	getUnitsOnLeaseReportCRUOL: function(){
		busyDialog.open();
		
		var oCurrCRUOL = this;
		
		if(sap.ui.getCore().byId("idFlexUnitsOnLeaseReportCRUOL")){
			sap.ui.getCore().byId("idFlexUnitsOnLeaseReportCRUOL").destroy();
		}
		
		var customerID = "";
		//if(loggedInUserTypeCRUOL == "SEACO"){
			//var customerIDSplit = document.getElementById("idComboCustomerIDCRUOL").value.split("-");
			//customerID = customerIDSplit[1].trim();
			var customerID = sap.ui.getCore().byId('idComboCustomerIDCRUOL').getSelectedKey();
	//}
		//else{
		//	customerID = customerIDloggedInCRUOH;
		//}
		
		var leaseTypes = sap.ui.getCore().byId("idLeaseTypeCRUOL").getSelectedValues();
		var leaseTypeString = "";
		
		if(leaseTypes.length > 0){
			for(var i=0; i<leaseTypes.length; i++){
				leaseTypeString += leaseTypes[i].code + "$";
			}
			
			leaseTypeString = leaseTypeString.slice(0,-1);
		}
		
		var leaseNumbers = sap.ui.getCore().byId("idLeaseNumberCRUOL").getSelectedValues();
		var leaseNumberString = "";
		
		if(leaseNumbers.length > 0){
			for(var i=0; i<leaseNumbers.length; i++){
				leaseNumberString += leaseNumbers[i].description + "$";
			}
			
			leaseNumberString = leaseNumberString.slice(0,-1);
		}
		
		var unitDescrs = sap.ui.getCore().byId("idUnitDescrCRUOL").getSelectedValues();
		var unitDescrsString = "";
		
		if(unitDescrs.length > 0){
			for(var i=0; i<unitDescrs.length; i++){
				unitDescrsString += unitDescrs[i].code + "$";
			}
			
			unitDescrsString = unitDescrsString.slice(0,-1);
		}
		
		oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
		var urlToCallCRUOL = serviceUrl + "/Units_OnLease?$filter=ICustomerId eq '" + customerID
										  + "' and ILeaseType eq '" + leaseTypeString 
										  + "' and ILeaseNumber eq '" + leaseNumberString
										  + "' and IUnitDesc eq '" + unitDescrsString
										  + "' and IPara1 eq '' and IPara2 eq '' and IPara3 eq '' and IPara4 eq datetime'9999-09-09T00:00:00'";
		//alert("urlToCallCRUOL : "+urlToCallCRUOL);
		OData.request({ 
		      requestUri: urlToCallCRUOL,
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
		    	//alert("data.results.length : "+data.results.length);
		    	if(data.results.length == 0){
		    		 busyDialog.close();
		    		sap.ui.commons.MessageBox.show("No On Lease Units found for the selected Leases/Unit Types, \n please contact your local customer services for any queries.",
                            sap.ui.commons.MessageBox.Icon.WARNING,
                            "Warning",
                            [sap.ui.commons.MessageBox.Action.OK],
                            sap.ui.commons.MessageBox.Action.OK);
		    	}
		    	else{
		    		arrUnitsOnLeaseReport = [];
		    		jsonCRUOLExportToExcel = [];
		    		
		    		arrUnitsOnLeaseReport = data.results;
		    		
		    		for(var i=0; i<arrUnitsOnLeaseReport.length; i++){
		    			arrUnitsOnLeaseReport[i].LeaseNo = arrUnitsOnLeaseReport[i].LeaseNo.replace(/^0+/, '');
		    			arrUnitsOnLeaseReport[i].ReleaseNo = arrUnitsOnLeaseReport[i].ReleaseNo.replace(/^0+/, '');
		    			var vOnHireDateSplit = arrUnitsOnLeaseReport[i].OnHireDt.split("(");
					    var vOnHireDate = vOnHireDateSplit[1].split(")");
					    var vformattedOnHireDate = new Date(Number(vOnHireDate[0]));
					    var OnHireDate = dateFormat(new Date(Number(vOnHireDate[0])), 'dd-mm-yyyy', "UTC");
					    if(OnHireDate.substring(6) == "9999"){
					    	OnHireDate = "";
					    }
					    else{
					    	OnHireDate = OnHireDate;
					    }
					    arrUnitsOnLeaseReport[i]["OnHireDateActual"] = vformattedOnHireDate;
					    arrUnitsOnLeaseReport[i].OnHireDt = OnHireDate;
		    		}
		    		
		    		for(var i=0; i<arrUnitsOnLeaseReport.length; i++){
		    			jsonCRUOLExportToExcel.push({
		    				"Lease Number": arrUnitsOnLeaseReport[i].LeaseNo,
		    				"Lease Type": arrUnitsOnLeaseReport[i].LeaseType,
		    				"Release Number": arrUnitsOnLeaseReport[i].ReleaseNo,
		    				"Unit Number": arrUnitsOnLeaseReport[i].UnitNumber,
		    				"Unit Description": arrUnitsOnLeaseReport[i].UnitDesc,
		    				"On-Hire Date": arrUnitsOnLeaseReport[i].OnHireDt,
		    				"On-Hire Location": arrUnitsOnLeaseReport[i].OnHireLoc
		    			});
		    		}
		    		
		    		oCurrCRUOL.createUnitsOnLeaseReportTblCRUOL();
		    		
		    		oCurrCRUOL.updateUnitsOnLeaseReportCRUOL();
		    		
		    		if(arrUnitsOnLeaseReport.length > 0){
			    		if(arrUnitsOnLeaseReport.length < 25){
				    		sap.ui.getCore().byId("idTblUnitsOnLeaseReportCRUOL").setVisibleRowCount(arrUnitsOnLeaseReport.length);
				    		sap.ui.getCore().byId("idTblUnitsOnLeaseReportCRUOL").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
				    		sap.ui.getCore().byId("idBtnViewAllCRUOL").setVisible(false);
				    	}
				    	else{
				    		sap.ui.getCore().byId("idTblUnitsOnLeaseReportCRUOL").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
				    		sap.ui.getCore().byId("idTblUnitsOnLeaseReportCRUOL").setVisibleRowCount(25);
				    		sap.ui.getCore().byId("idBtnViewAllCRUOL").setVisible(true);
				    	}
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
	
	createUnitsOnLeaseReportTblCRUOL: function(){
		
		var oLabelTitle = new sap.ui.commons.Label({text: "Unit On Lease Details",
			layoutData: new sap.ui.layout.GridData({span: "L1 M1 S3",linebreak: false, margin: true}),
            wrapping: true}).addStyleClass("marginTop10 font15Bold");
		
		// Buttons
		var oBtnExport = new sap.m.Button({
            text : "Export To Excel",
            type:sap.m.ButtonType.Unstyled,
            icon: sap.ui.core.IconPool.getIconURI("excel-attachment"),
            press:function(){
            	//alert("Export to excel");
            	var objUtil = new utility();
            	objUtil.makeHTMLTable(jsonCRUOLExportToExcel, "Unit On Lease Details","export");
            }
         }).addStyleClass("submitBtn");
		
		var oFlexTitle = new sap.m.FlexBox("idTitleCRUOL",{
            items: [
                    oLabelTitle
            ],
            width:"60%",
            direction:"Row"
		});
		
		var oFlexExpBtn = new sap.m.FlexBox("idExportToExcelCRUOL",{
            items: [
                    oBtnExport
            ],
            width:"40%",
            direction:"RowReverse"
	});
		
		var oFlexTitleExport = new sap.m.FlexBox("idTitleExportCRUOL",{
            items: [
					oFlexTitle,
					oFlexExpBtn
            ],
            width:"100%",
            direction:"Row"
		});
		
		var oBtnViewAll = new sap.m.Button("idBtnViewAllCRUOL",{
	        text : "View All",
	        styled:false,
	        width:"80px",
	        press:function(){
	        	this.setVisible(false);
	        	var vArrayLength = arrUnitsOnLeaseReport.length;
	        	if(vArrayLength < 100){
	        		sap.ui.getCore().byId("idTblUnitsOnLeaseReportCRUOL").setVisibleRowCount(vArrayLength);
	        		sap.ui.getCore().byId("idTblUnitsOnLeaseReportCRUOL").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
	        	}
	        	else{
	        		sap.ui.getCore().byId("idTblUnitsOnLeaseReportCRUOL").setVisibleRowCount(100);
	        		sap.ui.getCore().byId("idTblUnitsOnLeaseReportCRUOL").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
	        	}
	        	
	        }
	     }).addStyleClass("submitBtn marginTop10");
		
		// Table
    	var oTableUnitsOnLeaseReport = new sap.ui.table.Table("idTblUnitsOnLeaseReportCRUOL",{
            columnHeaderHeight: 30,
            firstVisibleRowCount: 5,
            selectionMode: sap.ui.table.SelectionMode.None,
            navigationMode: sap.ui.table.NavigationMode.Paginator,
            width:"100%",
            height:"100%"
    	 }).addStyleClass("fontStyle marginTop15 tblBorder");
    	
    	// Table Columns
    	oTableUnitsOnLeaseReport.addColumn(new sap.ui.table.Column({
      		 label: new sap.ui.commons.Label({text: "Lease Number"}).addStyleClass("wraptextcol"),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "LeaseNo"),
    		 resizable:false,
             sortProperty: "LeaseNo",
             filterProperty: "LeaseNo",
    		 }));
    	
    	oTableUnitsOnLeaseReport.addColumn(new sap.ui.table.Column({
     		 label: new sap.ui.commons.Label({text: "Lease Type"}).addStyleClass("wraptextcol"),
     		 template: new sap.ui.commons.TextView().bindProperty("text", "LeaseType"),
     		 resizable:false,
             sortProperty: "LeaseType",
             filterProperty: "LeaseType",
   		 }));
    	
    	oTableUnitsOnLeaseReport.addColumn(new sap.ui.table.Column({
     		 label: new sap.ui.commons.Label({text: "Release Number"}).addStyleClass("wraptextcol"),
     		 template: new sap.ui.commons.TextView().bindProperty("text", "ReleaseNo"),
   		 	 resizable:false,
             sortProperty: "ReleaseNo",
             filterProperty: "ReleaseNo",
   		 }));
    	
    	oTableUnitsOnLeaseReport.addColumn(new sap.ui.table.Column({
     		 label: new sap.ui.commons.Label({text: "Unit Number"}).addStyleClass("wraptextcol"),
	   		 template: new sap.ui.commons.TextView().bindProperty("text", "UnitNumber"),
	   		 resizable:false,
             sortProperty: "UnitNumber",
             filterProperty: "UnitNumber",
   		 }));
    	
    	oTableUnitsOnLeaseReport.addColumn(new sap.ui.table.Column({
     		 label: new sap.ui.commons.Label({text: "Unit Description"}).addStyleClass("wraptextcol"),
	   		 template: new sap.ui.commons.TextView().bindProperty("text", "UnitDesc"),
	   		 resizable:false,
             sortProperty: "UnitDesc",
             filterProperty: "UnitDesc",
   		 }));
    	
    	oTableUnitsOnLeaseReport.addColumn(new sap.ui.table.Column({
     		 label: new sap.ui.commons.Label({text: "On-Hire Date"}).addStyleClass("wraptextcol"),
	   		 template: new sap.ui.commons.TextView().bindProperty("text", "OnHireDt"),
	   		 resizable:false,
             sortProperty: "OnHireDateActual",
             filterProperty: "OnHireDt",
   		 }));
    	
    	oTableUnitsOnLeaseReport.addColumn(new sap.ui.table.Column({
     		 label: new sap.ui.commons.Label({text: "On-Hire Location"}).addStyleClass("wraptextcol"),
	   		 template: new sap.ui.commons.TextView().bindProperty("text", "OnHireLoc"),
	   		 resizable:false,
             sortProperty: "OnHireLoc",
             filterProperty: "OnHireLoc",
   		 }));
    	
    	var oFlexBoxAll = new sap.m.FlexBox("idFlexUnitsOnLeaseReportCRUOL",{
  		  items: [
  		          	oFlexTitleExport,
  		          	oTableUnitsOnLeaseReport,
  					oBtnViewAll
  	  		  ],
  	  		direction: "Column",
  	  		width:"100%"
  	  		}); 
	},
	
	updateUnitsOnLeaseReportCRUOL: function(){
		oModelUnitsOnLeaseReportCRUOL = new sap.ui.model.json.JSONModel();
		oModelUnitsOnLeaseReportCRUOL.setData({modelData: arrUnitsOnLeaseReport});
    	sap.ui.getCore().byId("idTblUnitsOnLeaseReportCRUOL").setModel(oModelUnitsOnLeaseReportCRUOL);
    	sap.ui.getCore().byId("idTblUnitsOnLeaseReportCRUOL").bindRows("/modelData");
    	
    	//sap.ui.getCore().byId("idTblUnitsOnLeaseReportCRUOL").setVisibleRowCount(arrUnitsOnLeaseReport.length);
    	
    	sap.ui.getCore().byId("idShowUnitsOnLeaseReportCRUOL").insertField(sap.ui.getCore().byId("idFlexUnitsOnLeaseReportCRUOL"));
	}
});
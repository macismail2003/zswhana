//create view for this.. include js in html.. check the table mapping and export tot excel array
var EDReturnsDetailsDetail = [];
var jsonEDReturnsDetailsDetail = [];
var aDeleteResultsEDRet = [];
var aDeleteUnitsEDRet = [];
var urlToCallMailDeltEDRet = "";
sap.ui.model.json.JSONModel.extend("EDReturnDetailsView", {
	
	createEDReturnDetailsView: function(){
		var oCurrent= this;
		 var backRetDetsDetOR = new sap.m.Link({text: " < Back",
       	  width:"15%",
       	  wrapping:true,
       	  press: function(){
       		  var bus = sap.ui.getCore().getEventBus();
       			bus.publish("nav", "back");
      	  }});
		// Responsive Grid Layout
		var oOnlineReservationLayout = new sap.ui.layout.form.ResponsiveGridLayout("idEDReturnDetailsLayout");
		
		var oBtnOnlineResExport = new sap.m.Button({
            text : "Export To Excel",
            type:sap.m.ButtonType.Unstyled,
            //width:"145px",
            icon: sap.ui.core.IconPool.getIconURI("excel-attachment"),
            press:function(){
            	 var vTitle = "Redelivery Details";
            	// var objUtil = new utility();
            	 objUtil.makeHTMLTable(jsonEDReturnsDetailsDetail, vTitle,"export");
            }
         }).addStyleClass("submitBtn");
		
		 var oBtnViewAll = new sap.m.Button("idBtnViewAllEDRetDets",{
             text : "View All",
             styled:false,
             width:"80px",
             press:function(){
            	 oBtnViewAll.setVisible(false);
            	 sap.ui.getCore().byId("idLblSpcEDRet1").setVisible(false);
                 var vArrayLength = aOnlineReservationOR.length;
		        	if(vArrayLength < 100){
		        		sap.ui.getCore().byId("idRetDetsDetailTblOR").setVisibleRowCount(vArrayLength);
		        		sap.ui.getCore().byId("idRetDetsDetailTblOR").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		        	}
		        	else{
		        		sap.ui.getCore().byId("idRetDetsDetailTblOR").setVisibleRowCount(100);
		        		sap.ui.getCore().byId("idRetDetsDetailTblOR").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		        	}
             }
          }).addStyleClass("submitBtn marginTop10");
		 var oLabelSpace1 = new sap.ui.commons.Label("idLblSpcEDRet1",{text: "",
				width:"8px",
	            wrapping: true}).addStyleClass("marginTop10");
		 
		 var oBtnAdd = new sap.m.Button("idBtnAddReturnEDRetDets",{
             text : "Add",
             visible: false,
             styled:false,
             width:"80px",
             press:function(){
            	 $('#idHdrContent').html('Add to Existing Return');
            	 var bus = sap.ui.getCore().getEventBus();
	        	  bus.publish("nav", "to", {
                 id : "AddReturnsToRA"
             }); 
	        	  if(sap.ui.getCore().byId("idAddRetEDRetTbl")){
	   				  sap.ui.getCore().byId("idAddRetEDRetTbl").destroy();
	   				  sap.ui.getCore().byId("idFlexBoxAddRetEDRetTbl").destroy();
	   				  sap.ui.getCore().byId("idFlexCurrRetTblFooterEDRet").destroy();
	   			 }
	   	   		var vSelCityEDRet = $("#idComboCityEDRetAdd");
	   			 
	   			$("#idComboCityEDRetAdd").attr("placeholder","Select City");
	   			document.getElementById("idComboCityEDRetAdd").style.borderColor = "#cccccc";
	   			document.getElementById("idComboCityEDRetAdd").style.background = "#ffffff";
	   			 
	   			vSelCityEDRet.val("");
	   			sap.ui.getCore().byId("idTAUnitNoAddReturnED").setValue("");
	   			sap.ui.getCore().byId("idTAUnitNoAddReturnED").setValueState(sap.ui.core.ValueState.None);
	   			sap.ui.getCore().byId("idTAUnitNoAddReturnED").setPlaceholder("Unit Numbers");
	   			 customJsonCurrRetEDRet = [];  
	   	   		customJsonCurrRetEDRet = [];
	   	   		aAddRetTblData= [];
             }
          }).addStyleClass("submitBtn marginTop10");
		 
		 var oLabelSpace2 = new sap.ui.commons.Label({text: "",
				width:"8px",
	            wrapping: true}).addStyleClass("marginTop10");
		 
		 var oBtnDelete = new sap.m.Button("idBtnDeleteReturnDRetDets",{
             text : "Delete",
             styled:false,
             width:"80px",
             press:function(){
            	 flagDelete= "D";
            	 oCurrent.deleteUnitFromRA();
             }
          }).addStyleClass("submitBtn marginTop10");
		 
		// Flex Box
		    var oFlexBoxOResPrintExp = new sap.m.FlexBox({
	    		width: "30%",
	    		items:[
	    		        oBtnOnlineResExport,
						//oBtnOnlineResPrint					
	    		],
	    		direction: sap.m.FlexDirection.RowReverse
	    	});
		    
		    var oFlexBoxEDRetFooter = new sap.m.FlexBox({
	    		width: "30%",
	    		items:[
	    		       oBtnViewAll,oLabelSpace1,oBtnAdd,oLabelSpace2,oBtnDelete
	    		],
	    		direction: sap.m.FlexDirection.Row
	    	}).addStyleClass("marginTop10");
		    
		    var oLabelTblTitle = new sap.ui.commons.Label({text: "Redelivery Details",
	 			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: true, margin: false}),
	             wrapping: true}).addStyleClass("font15Bold marginTop10");
		    
		    var oFlexboxRetDetsDetTableTitle = new sap.m.FlexBox({
		   		  items: [oLabelTblTitle ],
		   		  width:"70%",
		   		  direction: "Row"
		   		});
		         
         var oFlexboxRetDetsDetTableHeader = new sap.m.FlexBox({
      		  items: [oFlexboxRetDetsDetTableTitle,oFlexBoxOResPrintExp],
      		  width:"100%",
      		  direction: "Row"
      		});
		         
         var oOnlineReservationTable = new sap.ui.table.Table("idEDRetDetailTblOR",{
 			visibleRowCount: 1,
 	        firstVisibleRow: 3,
 	        columnHeaderHeight: 30,
 	        selectionMode: sap.ui.table.SelectionMode.None,
 	        navigationMode: sap.ui.table.NavigationMode.Paginator,
 	        width: "100%",
 	        height:"100%"
     	 }).addStyleClass("fontStyle tblBorder marginTop10");
         
         oOnlineReservationTable.addColumn(new sap.ui.table.Column({
		        template: new sap.ui.commons.CheckBox().bindProperty("checked", "isChecked").bindProperty("enabled","isEnabled"),
		        sortProperty: "checked",
		        filterProperty: "checked",
		        resizable:false,
	 	        width:"25px",
		        //hAlign: "Center"
				}));
		
			oOnlineReservationTable.addColumn(new sap.ui.table.Column({
		     label: new sap.ui.commons.Label({text: "Lease"}).addStyleClass("wraptextcol"),
	         template: new sap.ui.commons.TextView().bindProperty("text", "Lease"),
	         sortProperty: "Lease",
	         filterProperty: "Lease",
	        resizable:false,
	        width:"90px",
			 }));
			 
			oOnlineReservationTable.addColumn(new sap.ui.table.Column({
				 label: new sap.ui.commons.Label({text: "Return"}).addStyleClass("wraptextcol"),
				 template: new sap.ui.commons.TextView().bindProperty("text", "Ordno"),
	 	         sortProperty: "Ordno",
	 	         filterProperty: "Ordno",
	 	        resizable:false,
	 	        width:"60px",
				 }));
			 
			oOnlineReservationTable.addColumn(new sap.ui.table.Column({
				 label: new sap.ui.commons.Label({text: "Unit Type"}).addStyleClass("wraptextcol"),
				 template: new sap.ui.commons.TextView().bindProperty("text", "UnitType"),
	 	         sortProperty: "UnitType",
	 	         filterProperty: "UnitType",
	 	        resizable:false,
	 	        width:"90px",
				 }));
			 
			oOnlineReservationTable.addColumn(new sap.ui.table.Column({
				 label: new sap.ui.commons.Label({text: "Location"}).addStyleClass("wraptextcol"),
				 template: new sap.ui.commons.TextView().bindProperty("text", "Location"),
	 	         sortProperty: "Location",
	 	         filterProperty: "Location",
	 	        resizable:false,
	 	        width:"110px",
				 }));
			 
			oOnlineReservationTable.addColumn(new sap.ui.table.Column({
				 label: new sap.ui.commons.Label({text: "Depot"}).addStyleClass("wraptextcol"),
				 template: new sap.ui.commons.TextView().bindProperty("text", "Depot"),
	 	         sortProperty: "Depot",
	 	         filterProperty: "Depot",
	 	        resizable:false,
	 	        width:"240px",
				 }));
			 
			oOnlineReservationTable.addColumn(new sap.ui.table.Column({
				 label: new sap.ui.commons.Label({text: "Off-Hire Date",}).addStyleClass("wraptextcol"),
				 template: new sap.ui.commons.TextView().bindProperty("text", "OffhireDate"),
	 	         sortProperty: "OffhireDateActual",
	 	         filterProperty: "OffhireDate",
	 	        resizable:false,
	 	        width:"100px",
				 }));
			 
			oOnlineReservationTable.addColumn(new sap.ui.table.Column({
				 label: new sap.ui.commons.Label({text: "Unit Number"}).addStyleClass("wraptextcol"),
				 template: new sap.ui.commons.TextView().bindProperty("text", "UnitNumber"),
	 	         sortProperty: "UnitNumber",
	 	         filterProperty: "UnitNumber",
	 	        resizable:false,
	 	        width:"140px",
				 }));
			
			// Flex Box
		    var oFlexBoxAll = new sap.m.FlexBox({
	    		width: "100%",
	    		items:[
						oFlexboxRetDetsDetTableHeader,
						oOnlineReservationTable,
						oFlexBoxEDRetFooter
	    		],
	    		direction: "Column"
	    	});
			
		 // Online Form Starts
			var oOnlineReservationForm = new sap.ui.layout.form.Form("idEDReturnsDetailsForm",{
				                layout: oOnlineReservationLayout,
				                formContainers: [
				                        
				                        new sap.ui.layout.form.FormContainer("idEDReturnsDetailsFormC1",{
				                               // title: "Online Reservation - Return in Last 1 Year", 
				                                formElements: [
															new sap.ui.layout.form.FormElement({
															    fields: [backRetDetsDetOR],
															    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
															}),
															new sap.ui.layout.form.FormElement({
															    fields: [oFlexBoxAll]
															})
				                                        ]
				                        })		                        
				                ]
				        });
			return oOnlineReservationForm;
				        	
	},
	
	bindEDReturnDetailsDetail:function(){
		busyDialog.open();
		var oCurrent=this;
		var urlToCall = serviceUrl + "/Return_Detail_Details?$filter=Ordno eq '" + vClickedReturn_ReturnDetTbl + "'";
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
		    	//aOnlineReservationOR = [];
		    	jsonEDReturnsDetailsDetail = [];
		    	EDReturnsDetailsDetail = [];
		    	var vReturnDetailsDetTable = sap.ui.getCore().byId("idEDRetDetailTblOR");
		    	var vBtnViewAll = sap.ui.getCore().byId("idBtnViewAllEDRetDets");
		    	var len = data.results.length;
		    	if(len>0){
		    		var enableChkbox = false;
			    	//aOnlineReservationOR = data.results;
			    	for(var i=0 ; i <len ; i++){
				    		data.results[i].Lease = objUtil.removeLeadZero(data.results[i].Lease);
					    	var vOffHireDt = data.results[i].OffhireDate.split("(");
							var vDate= vOffHireDt[1].split(")");
							var vOffhireDateActual = new Date(Number(vDate[0]));
							var vformattedOffHireDt = dateFormat(new Date(Number(vDate[0])), 'dd-mm-yyyy',"UTC");
							  if (vformattedOffHireDt.substring(6) === "9999"){
								  data.results[i].OffhireDate =  "Return\nAuthorized";
								  enableChkbox = true;
							  }
							  else if (vformattedOffHireDt.substring(6) === "9998"){
								  data.results[i].OffhireDate =  "Return Item\nCancelled";
								  enableChkbox = false;
							  }
							  else if (vformattedOffHireDt.substring(6) === "9997"){
								  data.results[i].OffhireDate =  "Return\nExpired";
								  enableChkbox = false;
							  }
							  else{
								  data.results[i].OffhireDate = vformattedOffHireDt;
								  enableChkbox = false;
							  } 
							  //to chk for same location n depot
							  var helpValueDetsDEt = data.results[i].Ordno+"$"+data.results[i].UnitType+"$"+data.results[i].Location+"$"+data.results[i].Depot;
							  if(vHelpValueRetDetEDRet == helpValueDetsDEt){
								  EDReturnsDetailsDetail.push({
									  'Lease':data.results[i].Lease,
							            'Ordno':data.results[i].Ordno,
							            'UnitType':data.results[i].UnitType,
							            'Location':data.results[i].Location,
							            'Depot':data.results[i].Depot,
							            'OffhireDate':data.results[i].OffhireDate,
							            'OffhireDateActual':vOffhireDateActual,
							            'UnitNumber':data.results[i].UnitNumber,
							            'isChecked':false,
							            'isEnabled':enableChkbox,
								  });
							  }
					}
			    	for(var i=0 ; i <EDReturnsDetailsDetail.length ; i++){
			    		jsonEDReturnsDetailsDetail.push({
							  	'Lease':EDReturnsDetailsDetail[i].Lease,
					            'Return':EDReturnsDetailsDetail[i].Ordno,
					            'Unit Type':EDReturnsDetailsDetail[i].UnitType,
					            'Location':EDReturnsDetailsDetail[i].Location,
					            'Depot':EDReturnsDetailsDetail[i].Depot,
					            'Off-Hire Date':EDReturnsDetailsDetail[i].OffhireDate,
					            'Unit Number':EDReturnsDetailsDetail[i].UnitNumber,
					        });
			    	}
			    	//Create a model and bind the table rows to this model
			    	var oModelReturnDetailsDet = new sap.ui.model.json.JSONModel();
			    	oModelReturnDetailsDet.setData({modelData: EDReturnsDetailsDetail});
			    	vReturnDetailsDetTable.setModel(oModelReturnDetailsDet);
			    	vReturnDetailsDetTable.bindRows("/modelData");
			    	var vLen = EDReturnsDetailsDetail.length;
			    	if(vLen < 25){
			    		vReturnDetailsDetTable.setVisibleRowCount(vLen);
			    		vReturnDetailsDetTable.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
			    		vBtnViewAll.setVisible(false);
			    		sap.ui.getCore().byId("idLblSpcEDRet1").setVisible(false);
			    	}
			    	else{
			    		vReturnDetailsDetTable.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
			    		vReturnDetailsDetTable.setVisibleRowCount(25);
			    		vBtnViewAll.setVisible(true);
			    		sap.ui.getCore().byId("idLblSpcEDRet1").setVisible(true);
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
	}, //bindReturnDetailsDetail
	
	fnCallbackDeleteUnitsEDRet: function(sResult){
		var oCurrent = this;
		if(sResult == "YES"){
			busyDialog.open();
			var Row = [];
			var RowMailDeltEDRet = [];
			var count = 0;
			var vRANumber = sap.ui.getCore().byId("idRANumberEDRet").getValue().trim();
			var urlToCall = serviceUrl + "/DELETE_RETURNS?$filter=Customer eq '" + vCustomerIDEDRet + "' and";
			urlToCallMailDeltEDRet = serviceUrl + "/Delete_Returns_Mail?$filter=Customer eq '" + vCustomerIDEDRet + "' and ReturnAuth eq '" + vRANumber + "' and";
			for(var j=0 ; j< aDeleteUnitsEDRet.length ; j++){
				var depotName = aDeleteUnitsEDRet[j].Depot;
				depotName =	depotName.replace(/\'/g, "|");
				depotName =  depotName.replace(/&/g, "@");
				
				 Row[count] = aDeleteUnitsEDRet[j].Lease + "$" + aDeleteUnitsEDRet[j].Ordno + "$" + aDeleteUnitsEDRet[j].UnitType + "$" +
				 			  aDeleteUnitsEDRet[j].Location + "$" + depotName + "$" + aDeleteUnitsEDRet[j].OffhireDate + "$" + 
				 			  aDeleteUnitsEDRet[j].UnitNumber;
				 
				 RowMailDeltEDRet[count] = "$" + aDeleteUnitsEDRet[j].Lease + "$" + aDeleteUnitsEDRet[j].UnitType + "$" +
	 			  aDeleteUnitsEDRet[j].Location + "$" + depotName + "$" + aDeleteUnitsEDRet[j].UnitNumber + "$";
				 
				 count++;
				// break;
			}
			for(var k=0 ; k < Row.length ; k++){
				if(k != (Row.length-1)){
					urlToCall = urlToCall + " ReturnData" + (k+1) + " eq '" + Row[k] + "' and";
					urlToCallMailDeltEDRet = urlToCallMailDeltEDRet + " CtMailData" + (k+1) + " eq '" + RowMailDeltEDRet[k] + "' and";
				}
				else{
					urlToCall = urlToCall + " ReturnData" + (k+1) + " eq '" + Row[k] + "'";
					urlToCallMailDeltEDRet = urlToCallMailDeltEDRet + " CtMailData" + (k+1) + " eq '" + RowMailDeltEDRet[k] + "'";
				}
			}
			
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
			    	aDeleteResultsEDRet = data.results;
			    	var len = aDeleteResultsEDRet.length;
			    	if(len > 0 ){
			    		//alert("json " + window.JSON.stringify(aDeleteResultsEDRet));
			    		var errArray = jQuery.grep(aDeleteResultsEDRet, function(element, index){
			                return element.Type == "E";
			        	});
			    		
			    		if(errArray.length > 0){
			    			var errMsg = "Following Units could not be deleted ";
			    			for(var i=0 ; i<errArray.length; i++ ){
			    				var unitNumber = errArray[i].Message.trim().split("@")[0];
			    				errMsg +=  "\n " + unitNumber;
			    			}
			    			sap.ui.commons.MessageBox.alert(errMsg,okCallBackReturnToFirstScreenDeleteEDret);
			    		}
			    		else{
			    			var msg = "Unit(s) deleted successfully.";
			    			sap.ui.commons.MessageBox.alert(msg,okCallBackReturnToFirstScreenDeleteEDret);
			    		}
			    	}
			    	else{
			    		var msg = "Unit(s) could not be deleted currently. Please try again later.";
			    		sap.ui.commons.MessageBox.show(msg,
			                     sap.ui.commons.MessageBox.Icon.WARNING,
			                     "Warning",
			                     [sap.ui.commons.MessageBox.Action.OK], 
			                         sap.ui.commons.MessageBox.Action.OK);
			    		//busyDialog.close();
			    	}
			    	busyDialog.close();
			    },
			    function(err){
			    	busyDialog.close();
			    	errorfromServer(err);
			    }); //odata request
		}
	},

	deleteUnitFromRA: function(){
		var oCurrent=this;
		var NoChkBoxCheckedMessage = "No units selected for deletion from RA.\n " +
		"Please select the required unit(s) and retry.";
		aDeleteUnitsEDRet = [];
		aDeleteUnitsEDRet = jQuery.grep(EDReturnsDetailsDetail, function(element, index){
            return element.isChecked == true;
		});
		 
		if(aDeleteUnitsEDRet.length == 0){
			sap.ui.commons.MessageBox.show(NoChkBoxCheckedMessage,
                    sap.ui.commons.MessageBox.Icon.WARNING,
                    "Warning",
                    [sap.ui.commons.MessageBox.Action.OK], 
                        sap.ui.commons.MessageBox.Action.OK);
			 busyDialog.close();
		}
		else{
			 var ConfirmMessage = "This action will delete the selected Unit Number(s) from the Return Authorization, and cannot be reversed. Do you want to continue?";
			 sap.ui.commons.MessageBox.show(ConfirmMessage,
				  sap.ui.commons.MessageBox.Icon.WARNING,
					"Warning",
	              [sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO], 
	              oCurrent.fnCallbackDeleteUnitsEDRet,
	              sap.ui.commons.MessageBox.Action.YES);
		}
	},
	
});

function okCallBackReturnToFirstScreenDeleteEDret(){
	var oCurrent = this;
	oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
	OData.request({ 
	      requestUri: urlToCallMailDeltEDRet,
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
	    		sap.ui.commons.MessageBox.alert(data.results[0].Message,fnCallBackSendMailDeleteUnitEDRet);
	    		busyDialog.close();
	    },
	    function(err){
	    	busyDialog.close();
	    	errorfromServer(err);
	    	//alert("Error while reading region : "+ window.JSON.stringify(err.response));
	    }); //odata request
	
	
}

function fnCallBackSendMailDeleteUnitEDRet(){
	var bus = sap.ui.getCore().getEventBus();
	  bus.publish("nav", "to", {
  id : "EDReturnSearchView"
}); 
	  if(sap.ui.getCore().byId("idEDRetResultFormElement"))
		  sap.ui.getCore().byId("idEDRetResultFormElement").destroyFields();
	 new raSearchView().getRADetails();
} 
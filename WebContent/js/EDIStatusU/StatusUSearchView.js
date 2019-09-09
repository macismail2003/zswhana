var oEDISearch;
var depotNameListEDISU= [];
var loggedInUserTypeEDISU = "";
sap.ui.model.json.JSONModel.extend("EDIStatusUView", {
	
	createEDIForm: function(){
		
		oEDISearch = this;
		//Labels
		var oLabelDepot = new sap.ui.commons.Label({text: "Depot: #",
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S3",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");
		
		var oLabelSerialNo = new sap.ui.commons.Label({text: "Serial Number: #",
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S3",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");
		
		var oLabelMsgDate = new sap.ui.commons.Label({text: "Message Date: #",
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S3",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");
		
		var oLabelFrom = new sap.ui.commons.Label({text: "From",
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S3",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("marginTop10 marginRight5");
		
		var oLabelTo = new sap.ui.commons.Label({text: "To",
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S3",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("marginTop10 marginRight5");
		
		var oLabelSpaceForDate = new sap.ui.commons.Label({text: "",
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S3",linebreak: false, margin: true}),
			width:"18px",
            wrapping: true}).addStyleClass("marginTop10");
		
		//Inputs
		var oInputSerialNo = new sap.ui.commons.TextField('idSerialNoEDIS',{
    		layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
    		placeholder: "Serial Number",
    		change: function(){
    			this.setValueState(sap.ui.core.ValueState.None);
    			this.setPlaceholder("Serial Number");
    		}
    	}).addStyleClass("FormInputStyle marginTop10");
		
		var oInputDepot = new sap.ui.core.HTML("idDepotHTMLEDIS",{layoutData: new sap.ui.layout.GridData({span: "L4 M9 S12"}), required:true});
		var htmlContentDepot = '<input id="idDepotEDIS" placeholder="Depot" class="FormInputStyle marginTop10" style="width:100%">';
		oInputDepot.setContent(htmlContentDepot);
		
		var oFromDate = new sap.ui.commons.DatePicker("idFromDateEDIS",{
			  width: "100px",
			// textAlign:"Right",
			 change:function(){
				 this.setValueState(sap.ui.core.ValueState.None);
				 this.setPlaceholder("");
			  },
			  //yyyymmdd: "",
			  value: {
	                path: "/dateValue",
	                type: new sap.ui.model.type.Date({pattern: "dd-MM-yyyy"})
	    			},
			 // layoutData: new sap.ui.layout.GridData({span: "L3 M9 S12",linebreak: false, margin: true})
			}).addStyleClass("marginTop10");
		
		var oToDate = new sap.ui.commons.DatePicker("idToDateEDIS",{
			  width: "100px",
			// textAlign:"Right",
			 change:function(){
				 this.setValueState(sap.ui.core.ValueState.None);
				 this.setPlaceholder("");
			  },
			  value: {
	                path: "/dateValue",
	                type: new sap.ui.model.type.Date({pattern: "dd-MM-yyyy"})
	    			},
			 // layoutData: new sap.ui.layout.GridData({span: "L3 M9 S12",linebreak: false, margin: true})
			}).addStyleClass("marginTop10"); //.bindProperty("yyyymmdd", "")
		
		
		//Flexbox for Date
		var oFlexDate = new sap.m.FlexBox({
		      items: [
		        oLabelFrom,oFromDate,oLabelSpaceForDate,oLabelTo,oToDate
		      ],
		      layoutData: new sap.ui.layout.GridData({span: "L8 M9 S12",linebreak: false, margin: true}),
		      direction: "Row"
		});
		
		//Buttons
	   	 var oBtnSearch = new sap.m.Button("idBtnSearchEDIS",{
	          text : "Search for U EDI Messages",
	          width:"205px",
	          styled:false,
	          layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: true, margin: true}),
	          press:function(){
	        	  if(oEDISearch.validateEDISSearchForm())
	        		  oEDISearch.getStatusUData();
	     }}).addStyleClass("submitBtn marginTop10");
	   	 
	   	 // Responsive Grid Layout
		    var oLayoutEDIS = new sap.ui.layout.form.ResponsiveGridLayout("idLayoutEDIS",{
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
		     var oFormEDIS = new sap.ui.layout.form.Form("idFormEDIS",{
		             layout: oLayoutEDIS,
		             formContainers: [
		                     
	                     new sap.ui.layout.form.FormContainer("idFormC1EDIS",{
	                         formElements: [
									new sap.ui.layout.form.FormElement({
									    fields: [oLabelSerialNo, oInputSerialNo]
									}),
									new sap.ui.layout.form.FormElement({
									    fields: [oLabelDepot, oInputDepot]
									}),
									new sap.ui.layout.form.FormElement({
									    fields: [oLabelMsgDate, oFlexDate]
									}),
									new sap.ui.layout.form.FormElement({
									    fields: [oBtnSearch]
									})
	                          ]
	                     })
		             ]
		     });
		     
		     return oFormEDIS;
		
	}, //createEDIForm
	
	populateDepotNameEDIS: function(){
		
		busyDialog.open();
			oModel = new sap.ui.model.odata.ODataModel(serviceUrl15_old, true);
			var urlToCall = serviceUrl15_old + "/F4_Functional_Location";
			//alert("urlToCallLASDep : "+urlToCallLASDep);
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
			    	depotListRCFPU = data.results;
			    	depotListLAFPU = data.results;
			    	//alert("data.results.length : "+data.results.length);
			    	for ( var i = 0; i < data.results.length ; i++) {
			    		depotNameListEDISU[i] = data.results[i].FunctionalLoc;
					}
			    	
			    	//alert("depotNameListAMOS len : "+depotNameListAMOS.length);
			    	
			    	$( "#idDepotEDIS" ).autocomplete({
			    	      source: depotNameListEDISU,
			    	      minLength: 0,
			    	      select: function(){
			    	    	  	document.getElementById("idDepotEDIS").style.borderColor = "#cccccc";
			    				document.getElementById("idDepotEDIS").style.background = "#ffffff";
			    				$("#idDepotEDIS").attr("placeholder","Depot Code");
			    	      }
			    	})
			    	.focus(function(){            
			    		 if ($("ul.ui-autocomplete").is(":hidden")) {
			    		        $(this).autocomplete('search', '');
			    		    }
			    	})
			    	.bind( "focusout", function( event ) {
			    	
				     })
			    	.keyup(function() {
			    	    var isValid = false;
			    	    var previousValue = "";
			    	    for (i in depotNameListEDISU) {
			    	        if (depotNameListEDISU[i].toLowerCase().match(this.value.toLowerCase())) {
			    	            isValid = true;
			    	        }
			    	    }
			    	    if (!isValid) {
			    	        this.value = previousValue;
			    	    } else {
			    	        previousValue = this.value;
			    	    }
			    	});
			    	loggedInUserTypeEDISU = objLoginUser.getLoggedInUserType();
					if(loggedInUserTypeEDISU == "SEACO"){
						$("#idDepotEDIS").removeAttr('disabled');
					}
					else{
						var DepotCode = objLoginUser.getLoggedInUserID();
						for(var i=0;i<depotNameListEDISU.length;i++){
							if(depotNameListEDISU[i].substring(11,15) == DepotCode)
								DepotCode = depotNameListEDISU[i];
						}
						$("#idDepotEDIS").attr("disabled","disabled");
						$("#idDepotEDIS").val(DepotCode);
					}
			    	busyDialog.close();
			    },
			    function(err){
			    	 errorfromServer(err);
			    	//alert("Error while Reading Result : "+ : window.JSON.stringify(err.response));
			    });
		},
		
	validateEDISSearchForm: function(){
		var isValid=true;
		var serialNumber = sap.ui.getCore().byId("idSerialNoEDIS");
		var depot = document.getElementById("idDepotEDIS");
		var fromDate = sap.ui.getCore().byId("idFromDateEDIS");
		var toDate = sap.ui.getCore().byId("idToDateEDIS");
		
		if(serialNumber.getValue().trim().length == 0 && depot.value.trim().length == 0 && fromDate.getYyyymmdd().trim().length == 0){
			serialNumber.setValueState(sap.ui.core.ValueState.Error);
			serialNumber.setPlaceholder("Atleast 1 input required");
			
			fromDate.setValueState(sap.ui.core.ValueState.Error);
			fromDate.setPlaceholder("Atleast 1 input required");
			
			depot.style.borderColor = "red";
			depot.style.background = "#FAD4D4";
    		$("#idDepotEDIS").attr("placeholder","Atleast 1 input required");
    		isValid = false;
		}
		
		if(serialNumber.getValue().trim().length > 0 && serialNumber.getValue().trim().length != 11){
			serialNumber.setValueState(sap.ui.core.ValueState.Error);
			serialNumber.setValue("");
			serialNumber.setPlaceholder("Invalid Unit Number");
			isValid = false;
		}
		
		var vInputDepot = depot.value;
		if(vInputDepot.trim().length > 0){
			var match = jQuery.inArray(vInputDepot,depotNameListEDISU);
			if(match < 0){
				document.getElementById("idDepotEDIS").style.borderColor = "red";
	    		document.getElementById("idDepotEDIS").style.background = "#FAD4D4";
	    		document.getElementById("idDepotEDIS").value = "";
	    		document.getElementById("idDepotEDIS").placeholder = "Invalid Depot";
	    		isValid = false;
			}
			else{
				document.getElementById("idDepotEDIS").style.borderColor = "#cccccc";
	    		document.getElementById("idDepotEDIS").style.background = "#ffffff";
	    		document.getElementById("idDepotEDIS").placeholder = "Depot";
			}
		}
		return isValid;
	}, //validateEDISSearchForm
	
	getStatusUData: function(){
		oEDISearch = this;
		 if(sap.ui.getCore().byId("EDIStatusUResult"))
	 			sap.ui.getCore().byId("EDIStatusUResult").destroy();
		 
		var serialNumber = sap.ui.getCore().byId("idSerialNoEDIS").getValue().trim().toUpperCase();
		var fromDate = sap.ui.getCore().byId("idFromDateEDIS").getYyyymmdd();
		var fromDateToPass;
		if(fromDate.trim().length == 0)
			 fromDateToPass = "0000-00-00T00:00:00";
		else
			 fromDateToPass = fromDate.substring(0,4) + "-" + fromDate.substring(4,6) + "-" + fromDate.substring(6) + "T00:00:00";
		var toDate = sap.ui.getCore().byId("idToDateEDIS").getYyyymmdd();
		var toDateToPass;
		var functionalLoc = document.getElementById("idDepotEDIS").value;
		if(functionalLoc.length > 0)
			functionalLoc = functionalLoc.substring(0,15);
		
		if(toDate.trim().length == 0)
			toDateToPass = fromDateToPass;
		else
			toDateToPass = toDate.substring(0,4) + "-" + toDate.substring(4,6) + "-" + toDate.substring(6)+"T00:00:00";
		
		var filterData = "/EDI_TstHrns_U_Msg?$filter=Depot eq '" + functionalLoc.trim() + "' and IFromDate eq datetime'" + fromDateToPass + "'" + 
						 " and IToDate eq datetime'" + toDateToPass + "' and Serialnumber eq '" + serialNumber + "'";
		
		busyDialog.open();
		oModel = new sap.ui.model.odata.ODataModel(serviceUrl15_old, true);
		OData.request({ 
		   requestUri: serviceUrl15_old + filterData,
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
			 var len = data.results.length;
			  jsonEDIStatusUReportETE = [];
			 if(len == 0){
				 var errorString = "No records found for the specified search criteria. \nPlease refine your search criteria and try again.";
			    	sap.ui.commons.MessageBox.alert(errorString);
			 }
			 else{
				 aStatusUData = data.results;
				
				 for(var i=0; i < len ; i++){
					  var vMsgDate =  aStatusUData[i].MessageDate.split("(");
			          var vDate = vMsgDate[1].split(")");
			          var actualMsgDate = new Date(Number(vDate[0]));
			          var vformattedMsgDate = dateFormat(new Date(Number(vDate[0])), 'dd-mm-yyyy',"UTC");
			          if (vformattedMsgDate.substring(0,4) === "9999"){
			        	  aStatusUData[i].MessageDate = "-";
			        	  aStatusUData[i]["actualMsgDate"] = actualMsgDate;
			          }
			          else{
			        	  aStatusUData[i].MessageDate = vformattedMsgDate;
			        	  aStatusUData[i]["actualMsgDate"] = actualMsgDate;
			          }
			          
			          aStatusUData[i].MessageTime = aStatusUData[i].MessageTime.replace(/[HMS]/g, ":").substring(2,10);
			          jsonEDIStatusUReportETE.push({
			        	  "Serial Number":aStatusUData[i].Serialnumber,
			        	  "MUID":aStatusUData[i].MsgUidXi,
			        	  "Message Date":aStatusUData[i].MessageDate,
			        	  "Message Time":aStatusUData[i].MessageTime,
			        	  "Message Type":aStatusUData[i].MsgName,
			        	  "Message Name":aStatusUData[i].MsgType,
			        	  "Depot":aStatusUData[i].Depot,
			        	  "EDI Depot":aStatusUData[i].SenderId,
			        	  "EDI File Name":aStatusUData[i].Filename,
						 });
			          
				 }
				 
				 var bus = sap.ui.getCore().getEventBus();
	    			bus.publish("nav", "to", {
	    					id : "EDIStatusUResult"
	    			});
				var oModelEDISU = new sap.ui.model.json.JSONModel();
				oModelEDISU.setData(aStatusUData);
				var EDIStatusUResultTbl = sap.ui.getCore().byId("idEdiStatusUResultTbl");
				var btnViewAll = sap.ui.getCore().byId("idViewAllBtnEDIStatusU");
				EDIStatusUResultTbl.setModel(oModelEDISU);
				EDIStatusUResultTbl.bindRows("/");
				if(len < 25){
					EDIStatusUResultTbl.setVisibleRowCount(len);
					EDIStatusUResultTbl.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
					btnViewAll.setVisible(false);
	        	}
	        	else{
	        		btnViewAll.setVisible(true);
	        		EDIStatusUResultTbl.setVisibleRowCount(25);
	        		EDIStatusUResultTbl.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
	        	}
			 }
		 },
         function(err){
			 errorfromServer(err);
          });
	}, //getStatusUData
	
	resetStatusU: function(){
		loggedInUserTypeEDISU = objLoginUser.getLoggedInUserType();
		if(loggedInUserTypeEDISU == "SEACO"){
			$("#idDepotEDIS").val("");
			if(document.getElementById("idDepotEDIS")){
                document.getElementById("idDepotEDIS").style.borderColor = "#cccccc";
	    		document.getElementById("idDepotEDIS").style.background = "#ffffff";
	    		document.getElementById("idDepotEDIS").placeholder = "Depot";
          }
		}
		sap.ui.getCore().byId("idSerialNoEDIS").setValue("");
		 if(sap.ui.getCore().byId("idSerialNoEDIS")){
          	  sap.ui.getCore().byId("idSerialNoEDIS").setValueState(sap.ui.core.ValueState.None);
          	  sap.ui.getCore().byId("idSerialNoEDIS").setPlaceholder("Serial Number");
            }
		sap.ui.getCore().byId("idFromDateEDIS").setValue("");
		if(sap.ui.getCore().byId("idFromDateEDIS")){
          	  sap.ui.getCore().byId("idFromDateEDIS").setValueState(sap.ui.core.ValueState.None);
          	  sap.ui.getCore().byId("idFromDateEDIS").setPlaceholder("");
            }
		sap.ui.getCore().byId("idToDateEDIS").setValue("");
		if(sap.ui.getCore().byId("idToDateEDIS")){
          	  sap.ui.getCore().byId("idToDateEDIS").setValueState(sap.ui.core.ValueState.None);
          	  sap.ui.getCore().byId("idToDateEDIS").setPlaceholder("");
            }
	}
});
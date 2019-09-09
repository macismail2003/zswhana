//create view for this. populate city. map validate function  to btn press event.
//copy the functions for validate and submit from OR.
var aCityAddReturnsEDRet= [];
var locationDataEDRet= [];
var aAddRetTblData= [];
var aErrWarningEDRet= [];
var customJsonCurrRetEDRet = [];
var urlToCallForAddMail = "";
sap.ui.model.json.JSONModel.extend("EDAddReturnView", {
	
	createAddReturnView: function(){
		var oCurrent= this;
		 var backRetDetsDetOR = new sap.m.Link({text: " < Back",
	       	  width:"15%",
	       	  wrapping:true,
	       	  press: function(){
	       		$('#idHdrContent').html('Redelivery View/Modify');
	       		  var bus = sap.ui.getCore().getEventBus();
	       			bus.publish("nav", "back");
	      	  }});
		 
		var oLabelUnitNumber = new sap.ui.commons.Label({text: "Unit Number",
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S3",linebreak: true, margin: true}),
			required: true,
            wrapping: true}).addStyleClass("marginTop10");
		
		var oLabelCity = new sap.ui.commons.Label({text: "City",
			layoutData: new sap.ui.layout.GridData({span: "L3 M4 S5",linebreak: true, margin: true}),
			required: true,
            wrapping: true}).addStyleClass("marginTop10");
		
		 var labStar = new sap.ui.commons.Label({text: "* "}).addStyleClass("MandatoryStar");
		  var lblSpaceLegend = new sap.ui.commons.Label( {text: " ",width : '5px'});
		  var labRequired = new sap.ui.commons.Label({text: " Mandatory Field",wrapping: true});
		  var oFlexboxReq = new sap.m.FlexBox({
			 // layoutData: new sap.ui.layout.GridData({span: "L7 M6 S4"}),
            items: [labStar,lblSpaceLegend,labRequired],
            direction: "Row"
		  }).addStyleClass("marginTop10");
		  
		  var oLabelWarning = new sap.ui.commons.Label({text: "For individual containers, please enter the 4 letter prefix and 7 digit number for each container. (Eg. SEGU3000511). For multiple containers (Max 25), press the Enter key after each one, or copy and paste the list to the entry field",
		  wrapping: true}).addStyleClass("font10");
		  
		var vTAUnitNumbersOR =new sap.ui.commons.TextArea('idTAUnitNoAddReturnED',{
	    	  layoutData: new sap.ui.layout.GridData({span: "L6 M5 S12"}),
				rows:25,
				cols:30,
				height:"145px",
				placeholder:"Unit Numbers",
				change:function(){
					sap.ui.getCore().byId("idTAUnitNoAddReturnED").setValueState(sap.ui.core.ValueState.None);
					sap.ui.getCore().byId("idTAUnitNoAddReturnED").setPlaceholder("Unit Number");

				}
			}).addStyleClass("marginTop10 OutlineNone");
		vTAUnitNumbersOR.setMaxLength(323); 
		
		var LblFlex = new sap.m.FlexBox({ items: [ oLabelUnitNumber, oLabelWarning ],  
	          direction: "Column", 
	          layoutData: new sap.ui.layout.GridData({span: "L3 M4 S5",linebreak: true, margin: false})});
		
		//city drop down
		var oComboCity = new sap.ui.core.HTML("idHtmlCityEDRetAdd",{layoutData: new sap.ui.layout.GridData({span: "L6 M5 S12"})});
		var htmlContentCity = '<input id="idComboCityEDRetAdd" placeholder="Select City" class="FormInputStyle marginTop10" style="width:100%">';
		oComboCity.setContent(htmlContentCity);
		
		 var oBtnAdd = new sap.m.Button("idBtnAddUnitsEDRet",{
	          text : "Add",
	          styled:false,
	            width:"80px",
	          layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: true, margin: true}),
	          press:function(){
	        	  if(oCurrent.validateAddToExistingRet()){
	        		  if(!sap.ui.getCore().byId("idAddRetEDRetTbl"))
	        			  oCurrent.createCurrRetTableEDRet();
	        	  	
	        	  	oCurrent.bindAddRetEDRetTbl();
	        	  }
	        	  else{
	        		  if(sap.ui.getCore().byId("idAddRetEDRetTbl")){
	    				  sap.ui.getCore().byId("idAddRetEDRetTbl").destroy();
	    				  sap.ui.getCore().byId("idFlexBoxAddRetEDRetTbl").destroy();
	    				  sap.ui.getCore().byId("idFlexCurrRetTblFooterEDRet").destroy();
	    			 }
	        	  }
	        	  }
	    }).addStyleClass("submitBtn");
		 
		var  lblSpaceBtn = new sap.ui.commons.Label({text: "",
			    width:"8px",
	            wrapping: true});
		
		 var oBtnReset = new sap.m.Button("idBtnResetUnitsEDRet",{
	          text : "Reset",
	          styled:false,
	            width:"80px",
	          layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: false, margin: true}),
	          press:function(){
	        	  var ConfirmMessage = "This will reset all the selections in your form.\n Do you want to proceed?";
	 			 sap.ui.commons.MessageBox.show(ConfirmMessage,
	       			  sap.ui.commons.MessageBox.Icon.WARNING,
	       				"Warning",
	                     [sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO], 
	                     oCurrent.fnCallbackAddToRetResetEDRet,
	                     sap.ui.commons.MessageBox.Action.YES);
	        	  }
	    }).addStyleClass("submitBtn");
		 
		 var oFlexBoxBtn = new sap.m.FlexBox({
	     		items:[
	     		       oBtnAdd, lblSpaceBtn, oBtnReset
	     		],
	     		direction: "Row"
	     	}).addStyleClass("marginTop10");
		 var oOnlineRetLayout = new sap.ui.layout.form.ResponsiveGridLayout("idEDRetAddLayout",{
	    	  columnsL: 2,
	          columnsM: 1,
	          columnsS: 1,
	    });
		 
		 var oOnlineForm = new sap.ui.layout.form.Form("idEDRetAddForm",{
             layout: oOnlineRetLayout,
             formContainers: [
                     new sap.ui.layout.form.FormContainer("idEDRetAddFormC1",{
                             formElements: [
                                            new sap.ui.layout.form.FormElement({
											    fields: [backRetDetsDetOR]
											}),
											new sap.ui.layout.form.FormElement({
											    fields: [LblFlex, vTAUnitNumbersOR]
											}),
											new sap.ui.layout.form.FormElement({
										        fields: [oLabelCity, oComboCity]
											}),
											new sap.ui.layout.form.FormElement({
											    fields: [oFlexBoxBtn]
											}),
											new sap.ui.layout.form.FormElement({
											    fields: [oFlexboxReq]
											}),
											]
                     }),
                     new sap.ui.layout.form.FormContainer("idEDRetAddFormC2",{
                         formElements: []
                 })
                     ]
		 });
		 
		// Responsive Grid Layout
		    var oCurrentReturnLayout = new sap.ui.layout.form.ResponsiveGridLayout("idAddRetFormLayoutEDRet");
		    var oCurrentReturnForm = new sap.ui.layout.form.Form("idAddRetFormEDRet",{
	            layout: oCurrentReturnLayout,
	            formContainers: [  
	                    new sap.ui.layout.form.FormContainer("idAddRetFormLayoutEDRetC1",{
	                        formElements: [
										new sap.ui.layout.form.FormElement("idAddRetEDRetFE1",{
										    fields: []
										}),
										new sap.ui.layout.form.FormElement("idAddRetEDRetFE2",{
									        fields: []
										}),
										new sap.ui.layout.form.FormElement("idAddRetEDRetFE3",{
									        fields: []
										})
	                                ]
	                }),
	                        
	                ]
	        });
		   // sap.ui.getCore().byId("idCurrentReturnForm").setVisible(false);
		    var vHDivider = new sap.ui.commons.HorizontalDivider({width: "95%", type: "Area", height: "Medium"});
		    var oFlexBoxAll = new sap.m.FlexBox({
	     		width: "100%",
	     		items:[
	     		       oOnlineForm, vHDivider, oCurrentReturnForm
	     		],
	     		direction: "Column"
	     	});
		 return oFlexBoxAll;
	},
	
	validateAddToExistingRet: function(){
		
		var vUnitNumbersEDRetAdd= sap.ui.getCore().byId("idTAUnitNoAddReturnED");
		var vCityEDRetAdd = document.getElementById("idComboCityEDRetAdd");
		var isValid = true;
		
		if(vUnitNumbersEDRetAdd.getValue().trim().length == 0)
		{
			vUnitNumbersEDRetAdd.setPlaceholder("Required");
			vUnitNumbersEDRetAdd.setValueState(sap.ui.core.ValueState.Error);
				isValid = false;
		}
		
		if(vCityEDRetAdd.value.trim().length == 0){
			$("#idComboCityEDRetAdd").attr("placeholder","Required");
			vCityEDRetAdd.style.borderColor = "red";
			vCityEDRetAdd.style.background = "#FAD4D4";
			isValid = false;
		}
		else{
			var cityName = jQuery.grep(locationDataEDRet, function(element, index){
	            return element.City == vCityEDRetAdd.value.trim();
		    });
	  		if(cityName.length ==  0){
	  			document.getElementById("idComboCityEDRetAdd").style.borderColor = "red";
	    		document.getElementById("idComboCityEDRetAdd").style.background = "#FAD4D4";
	    		document.getElementById("idComboCityEDRetAdd").style.background = "#FAD4D4";
	    		document.getElementById("idComboCityEDRetAdd").value = "";
	    		$("#idComboCityEDRetAdd").attr("placeholder","Invalid City");
	    		isValid = false;
	  		}
	  		else{
	  			document.getElementById("idComboCityEDRetAdd").style.borderColor = "#cccccc";
				document.getElementById("idComboCityEDRetAdd").style.background = "#ffffff";
				$("#idComboCityEDRetAdd").attr("placeholder","Select City");
	  		}	
		}
		return isValid;
	},
	
	getCityDataOnLoad: function(){
		busyDialog.open();
		aCityAddReturnsEDRet = [];
		oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
		OData.request({ 
		      requestUri: serviceUrl + "/F4_Loc_Req13",
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
		    	var dataLen = data.results.length;
                locationDataEDRet = data.results;
                var dataArrayCity = [];
                for(var i=0 ; i< dataLen ; i++){
                	dataArrayCity[i] = data.results[i].City;
                }
                var oUtil = new utility();
                dataArrayCity = oUtil.unique(dataArrayCity);
                dataArrayCity.sort();
                $( "#idComboCityEDRetAdd" ).autocomplete({
		    	      source: dataArrayCity,
		    	      minLength: 0,
		    	      select: function(){
		    	    	  	document.getElementById("idComboCityEDRetAdd").style.borderColor = "#cccccc";
		    				document.getElementById("idComboCityEDRetAdd").style.background = "#ffffff";
		    				$("#idComboCityEDRetAdd").attr("placeholder","Select City");
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
		    	    for (i in dataArrayCity) {
		    	        if (dataArrayCity[i].toLowerCase().match(this.value.toLowerCase())) {
		    	            isValid = true;
		    	        }
		    	    }
		    	    if (!isValid) {
		    	        this.value = previousValue;
		    	    } else {
		    	        previousValue = this.value;
		    	    }
		    	});
           
		    	busyDialog.close();
		    },
		    function(err){
		    	busyDialog.close();
		    	errorfromServer(err);
		    });
	},
	
	createCurrRetTableEDRet: function(){
		oCurrent = this;
		if(sap.ui.getCore().byId("idAddRetEDRetTbl")){
			  sap.ui.getCore().byId("idAddRetEDRetTbl").destroy();
			  sap.ui.getCore().byId("idFlexBoxAddRetEDRetTbl").destroy();
			  sap.ui.getCore().byId("idFlexCurrRetTblFooterEDRet").destroy();
		 }
						// Buttons
			/*var oBtnEdit = new sap.m.Button("idBtnCurrEditEDRet",{
			          text : "Edit",
			          styled:false,
			            width:"80px",
			          press:function(){
			        	  oCurrent.EditCurrRetOR(this.getText());
			         }
		 	 }).addStyleClass("submitBtn");*/
		   	 var oBtnDelete = new sap.m.Button("idBtnCurrDeleteEDRet",{
			          text : "Delete",
			          styled:false,
			            width:"80px",
			          press:function(){
			        	  oCurrent.DeleteCurrRetEDRet();
			         }
		   	 }).addStyleClass("submitBtn");
		   	 var oBtnValidate = new sap.m.Button("idBtnCurrValidateEDRet",{
			          text : "Validate",
			          styled:false,
			            width:"80px",
			         // layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
			          press:function(){
			        	//  alert("Validate");
			        	  oCurrent.ValidateCurrRetEDRet();
			          }
		   	 }).addStyleClass("submitBtn");
		   	 var lblSpace2 = new sap.ui.commons.Label( {text: " ",width : '8px'});
		   	var lblSpace3 = new sap.ui.commons.Label( {text: " ",width : '8px'});
		   	 var oFlexBoxCurrentReturnsTblsubmitBtns = new sap.m.FlexBox({
		    		width: "45%",
		    		items:[
		    		      oBtnValidate, lblSpace3, oBtnDelete, lblSpace2
		    		],
		    		direction: "Row" //sap.m.FlexDirection.RowReverse
		    	}).addStyleClass("marginTop10");
		   	 
		   	 var oBtnCurrSubmit = new sap.m.Button("idBtnCurrSubmitEDRet",{
			          text : "Save",
			          styled:false,
			            width:"80px",
			            enabled:false,
			          press:function(){
			        	  /*this.setEnabled(false);
			        	  setTimeout( function() {
			        		  oBtnCurrSubmit.setEnabled(true);
			                }, 2000 );*/
			        	  oCurrent.submitCurrRetEDRet(0,15);
			          }}).addStyleClass("submitBtn");
		   	 
		   	 var oBtnCurrCancel = new sap.m.Button("idBtnCurrCancelEDRet",{
		          text : "Cancel",
		          styled:false,
		            width:"80px",
		        //  layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
		          press:function(){
		        	  var ConfirmMessage = "This will cancel the Add to Existing Return action. Do you want continue?";
		     		 sap.ui.commons.MessageBox.show(ConfirmMessage,
		     			  sap.ui.commons.MessageBox.Icon.WARNING,
		     				"Warning",
		                   [sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO], 
		                   oCurrent.currRetCancelEDRet,
		                   sap.ui.commons.MessageBox.Action.YES);
		        	  }
	   	 }).addStyleClass("submitBtn");
		   	 
		   	 
		   	 var oBtnCurrReset = new sap.m.Button("idBtnCurrResetEDRet",{
			          text : "Reset",
			          styled:false,
			            width:"80px",
			        //  layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
			          press:function(){
			        	  oCurrent.currRetResetEDRet();
			        	  }
		   	 }).addStyleClass("submitBtn");
		   	 var lblSpace3 = new sap.ui.commons.Label( {text: " ",width : '8px'});
		   	 
			 var lblSpace4 = new sap.ui.commons.Label( {text: " ",width : '8px'});
			 
			 var lblSpaceMessageTxt = new sap.ui.commons.Label( {text: "Please delete all the units with status ERROR to SAVE.",wrapping: true}).addStyleClass("WarningMessage");
		   	 
		   	 var oFlexBoxCurrentReturnsFooterMessage = new sap.m.FlexBox("idFlexCurrRetTblFooterMessageEDRet",{
		     		width: "100%",
		     		items:[lblSpaceMessageTxt],
		     		direction: "Row"
		     	});
		   	 
		   	 var oFlexBoxCurrentReturnsFooterBtn = new sap.m.FlexBox("idFlexCurrRetTblFooterBtnEDRet",{
		     		width: "100%",
		     		items:[
		     		       oBtnCurrSubmit, lblSpace3, oBtnCurrReset, lblSpace4, oBtnCurrCancel, 
		     		],
		     		alignItems: sap.m.FlexAlignItems.Center,
		     		direction: "Row"
		     	}).addStyleClass("marginTop10");
		   	 
		 	var oFlexBoxCurrentReturnsFooter = new sap.m.FlexBox("idFlexCurrRetTblFooterEDRet",{
	     		width: "100%",
	     		items:[
	     		       oFlexBoxCurrentReturnsFooterMessage, oFlexBoxCurrentReturnsFooterBtn
	     		],
	     		direction: "Column"
	     	}).addStyleClass("marginTop10");
		 	
		   	 var oLabelCurrRetTblTitle = new sap.ui.commons.Label({text: "Redelivery Requests",
		 			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: true, margin: false}),
		             wrapping: true}).addStyleClass("font15Bold marginTop10");
		         
		         var oFlexboxRetDetTableHeader = new sap.m.FlexBox("idFlexCurreRetTblHeaderEDRet",{
		      		  items: [oFlexBoxCurrentReturnsTblsubmitBtns],
		      		  width:"100%",
		      		  direction: "Row"
		      		});
		         
		   	 // Table
		   	 var oCurrentReturnsTable = new sap.ui.table.Table("idAddRetEDRetTbl",{
			        visibleRowCount: 7,
			        firstVisibleRow: 1,
			        columnHeaderHeight: 30,
			        selectionMode: sap.ui.table.SelectionMode.None,
			        width: "auto",
			        height:"100%"
		   	 }).addStyleClass("fontStyle tblBorder");
		   	 
			 oCurrentReturnsTable.addColumn(new sap.ui.table.Column({
		   		 label: new sap.ui.commons.CheckBox("idSelectAllChkBxCurrentRetEDRet",{
		   		 	 change : function(){
		   		 		oCurrent.SelectAllAddedRetEDRet();
		   		 	 }
		   		 	}).bindProperty("checked", "isAllCheckedCurrRet"),
		   	        template: new sap.ui.commons.CheckBox().bindProperty("checked", "isChecked").bindProperty("name", "SerialNo"),
		   	        width: "auto",	// MACHANACHANGES_12062019 changed from 25 px to auto
		   	     height: "36px",
		   	        //hAlign: "Center",
		   	        resizable:false
		   	}));
		   	 
		   	 oCurrentReturnsTable.addColumn(new sap.ui.table.Column({
			    		 label: new sap.ui.commons.Label({text: "Contract Type"}),
			  	         template: new sap.ui.commons.TextView().bindProperty("text", "ContractType"),
			  	         sortProperty: "ContractType",
			  	         filterProperty: "ContractType",
			  	       width: "auto",	// MACHANACHANGES_12062019 changed from 25 px to auto
			  	     resizable:false
		    	}));
		   	 oCurrentReturnsTable.addColumn(new sap.ui.table.Column({
		    	        label: new sap.ui.commons.Label({text: "Contract"}),
		    	        template: new sap.ui.commons.TextView().bindProperty("text", "Contract"),
		    	        sortProperty: "Contract",
		    	        filterProperty: "Contract",
		    	       width: "auto",	// MACHANACHANGES_12062019 changed from 25 px to auto
		    	      resizable:false
		    	}));
		   	 oCurrentReturnsTable.addColumn(new sap.ui.table.Column({
		    	        label: new sap.ui.commons.Label({text: "Unit Type"}),
		    	        template: new sap.ui.commons.TextView().bindProperty("text", "UnitType"),
		    	        sortProperty: "UnitType",
		    	        filterProperty: "UnitType",
		    	        //hAlign: "Center",
		    	       width: "auto",	// MACHANACHANGES_12062019 changed from 25 px to auto
		    	      resizable:false
		    	}));
		   	 oCurrentReturnsTable.addColumn(new sap.ui.table.Column({
		    	        label: new sap.ui.commons.Label({text: "Location"}),
		    	        template: new sap.ui.commons.TextView().bindProperty("text", "Location"), //.addStyleClass("FormInputStyle editableTfBorder"),
		    	        sortProperty: "Location",
		    	        filterProperty: "Location",
		    	       width: "auto",	// MACHANACHANGES_12062019 changed from 25 px to auto
		    	      resizable:false
		    	}));
		   	 oCurrentReturnsTable.addColumn(new sap.ui.table.Column({
			        label: new sap.ui.commons.Label({text: "Depot"}),
			        template: new sap.ui.commons.TextView().bindProperty("text", "Depot"),
			        sortProperty: "Depot",
			        filterProperty: "Depot",
			       width: "auto",	// MACHANACHANGES_12062019 changed from 25 px to auto
			      resizable:false
		    	}));
		   	 oCurrentReturnsTable.addColumn(new sap.ui.table.Column({
			        label: new sap.ui.commons.Label({text: "Unit Number"}),
			        template: new sap.ui.commons.TextView().bindProperty("text", "SerialNo"), //.addStyleClass("FormInputStyle editableTfBorder"),
			        sortProperty: "SerialNo",
			        filterProperty: "SerialNo",
			        width: "auto",	// MACHANACHANGES_12062019 changed from 25 px to auto
			       resizable:false
				}));
		   	var oModelCurrDate = new sap.ui.model.json.JSONModel();
		   	oModelCurrDate.setData({
		   		dateValue: new Date(),
	   			isRetDtEnabled:false
			});
		   /*	var oDate = new sap.ui.commons.DatePicker("idCurrDateOR",{
				  width: "120px",
				  change:function(){
					  var editDate = this.getValue().split("-");
					  editDate = editDate[2]+editDate[1]+editDate[0];
					 // alert("chngd date " + editDate);
					  var id = this.sId.replace('idCurrDateOR-col8','idTxtVwRetTblORV-col7');
					  var oidTxtVwRetTbl = sap.ui.getCore().byId(id);
					  oidTxtVwRetTbl.setText(editDate);
					 
				  },
				enabled:{path: "/isRetDtEnabled"},
				  value: {
					  path: "/dateValue",
				  type: new sap.ui.model.type.Date({pattern: "dd-MM-yyyy"})},
				}).addStyleClass("FormInputStyle");
		   	
			oDate.setModel(oModelCurrDate);*/
			
		   	 oCurrentReturnsTable.addColumn(new sap.ui.table.Column({
						  visible : false, 	// MACHANACHANGES_12062019+
			        label: new sap.ui.commons.Label({text: "Return Date"}),
			        template: new sap.ui.commons.TextView("idTxtVwRetTblORVEDRet").bindProperty("text", "ReturnDate"),
			        sortProperty: "ReturnDate",
			        filterProperty: "ReturnDate",
			        width: "auto",	// MACHANACHANGES_12062019 changed from 0 px to auto
			       resizable:false,
			       //visible:false
		    	}));
		   	 
		   	oCurrentReturnsTable.addColumn(new sap.ui.table.Column({
			        label: new sap.ui.commons.Label({text: "Return Date"}),
			        template: new sap.ui.commons.TextView().bindProperty("text", "CurrentDateCR"), //oDate.addStyleClass("editableDpBorder"),
			        sortProperty: "CurrentDateCR",
			        filterProperty: "CurrentDateCR",
			        width: "auto",	// MACHANACHANGES_12062019 changed from 130 px to auto
			       resizable:false
		    	}));
		   //	oCurrentReturnsTable.addColumn(oColumn);  
		   	
		   	
		   	 oCurrentReturnsTable.addColumn(new sap.ui.table.Column({
		 	        label: new sap.ui.commons.Label({text: "Status"}),
		 	        template: new sap.ui.commons.Link({
						press : function() {
							var errChkSrNo = this.getHelpId();
							oCurrent.showErrDetEDRet(errChkSrNo);
						}
					}).bindProperty("text", "Status").bindProperty("enabled", "isStatusEnabled").bindProperty("helpId", "SerialNo"),
		 	        sortProperty: "Status",
		 	        filterProperty: "Status",
		 	        width: "auto",	// MACHANACHANGES_12062019 changed from 80 px to auto
		 	      resizable:false
		     	}));
		   	 /*oCurrentReturnsTable.addColumn(new sap.ui.table.Column({
		   		 label: new sap.ui.commons.Label({text: "Edit"}),
		            template: new sap.ui.commons.Link({
		           	 text:"Edit",
						press : function() {
							alert("link clicked");
						}
					}),
		            sortProperty: "edit",
		            filterProperty: "edit",
		            width: "70px",
		            resizable:false
		     	}));*/
		
		   	// Current Return Table Ends
		   	var oFlexboxRetDetTableTitle = new sap.m.FlexBox("idFlexBoxAddRetEDRetTbl",{
		   		  items: [oLabelCurrRetTblTitle,oCurrentReturnsTable,oFlexboxRetDetTableHeader ],
		   		  width:"100%",
		   		  direction: "Column"
		   		}).addStyleClass("OnlyPanelBorder");
		   	
		   	sap.ui.getCore().byId("idAddRetEDRetFE1").insertField(oFlexboxRetDetTableTitle,0);
		   //	sap.ui.getCore().byId("idCurrRetFE2").insertField(oFlexboxRetDetTableHeader,0);
		   	sap.ui.getCore().byId("idAddRetEDRetFE3").insertField(oFlexBoxCurrentReturnsFooter,0);
		   	 
	}, //createCurrRetTable
	
	bindAddRetEDRetTbl: function(){
		
		if(oCurrent.checkLimit25EDRet()){
			customJsonCurrRetEDRet = [];
			var vSelCityEDRet = $("#idComboCityEDRetAdd").val();
			vSelCityEDRet = toTitleCase(vSelCityEDRet);
			
			var cDate = dateFormat(new Date(),'dd-mm-yyyy');
			var currentDate = dateFormat(new Date(),'dd-mm-yyyy').split("-");
			 currentDate = currentDate[2]+currentDate[1]+currentDate[0];
			 
			 
			var newUnUR = sap.ui.getCore().byId("idTAUnitNoAddReturnED").getValue().split(/\n/g);
			var unitNumbrsEnteredNew = newUnUR.length;
			var enteredUnitNumbersEDRet = [];
			for(var k=0 ; k<unitNumbrsEnteredNew ; k++){
	    		
	    		if(newUnUR[k].trim().length != 0){
	    			enteredUnitNumbersEDRet.push(newUnUR[k].toUpperCase().trim());
	    		}
	    	}
			var oUtil = new utility();
			enteredUnitNumbersEDRet = oUtil.unique(enteredUnitNumbersEDRet);
	    	
	    	unitNumbrsEntered = enteredUnitNumbersEDRet.length;
	    	if(unitNumbrsEntered > 0 ){
	    		for(var i=0;i<unitNumbrsEntered;i++){
	    			customJsonCurrRetEDRet.push({
						"isChecked":false,
						"ContractType": "",
						"Contract":"",
						"UnitType":"",
						"Location":vSelCityEDRet,
						"Depot":"",
						"SerialNo":enteredUnitNumbersEDRet[i],
						"CurrentDateCR":cDate,
						"ReturnDate":currentDate,
						"Status":"",
						"isSrNoEnabled":false,
						"isLocEnabled":false,
						"isStatusEnabled":false
					});
	    			
	    			/*aAddRetTblData.push({
	    				"isChecked":false,
						"ContractType": "",
						"Contract":"",
						"UnitType":"",
						"Location":vSelCityEDRet,
						"Depot":"",
						"SerialNo":enteredUnitNumbersEDRet[i],
						"CurrentDateCR":cDate,
						"ReturnDate":currentDate,
						"Status":"",
						"isSrNoEnabled":false,
						"isLocEnabled":false,
						"isStatusEnabled":false
	    			});*/
	    		}
	    		
	    		if(unitNumbrsEntered > 0){
			    	var presentUnitnumbers = "The following unit numbers already exist in the Current Returns Section.\nPlease remove the duplicate Unit Number(s) and re-try.\n"+
			    							  "Duplicate Unit Numbers: \n";
			    	var Presentflag = false;
			    	for(var j=0; j <customJsonCurrRetEDRet.length ; j++){
			    		var temp = jQuery.grep(aAddRetTblData, function(element, index){
			                return element.SerialNo == customJsonCurrRetEDRet[j].SerialNo && element.SerialNo != "";
			        		});
			    		if(temp.length>0){
			    			Presentflag = true;
			    			presentUnitnumbers += "\t" + customJsonCurrRetEDRet[j].SerialNo + "\n";
			    			continue;
			    		}else{
			    			aAddRetTblData.push({
								"isChecked":false,
								"ContractType": "",
								"Contract":"",
								"UnitType":"",
								"Location":vSelCityEDRet,
								"Depot":"",
								"SerialNo":customJsonCurrRetEDRet[j].SerialNo,
								"CurrentDateCR":cDate,
								"ReturnDate":currentDate,
								"Status":"",
								"isSrNoEnabled":false,
								"isLocEnabled":false,
								"isStatusEnabled":false
							});
			    		}
			    	}
			    	if(Presentflag){
			     		sap.ui.commons.MessageBox.alert(presentUnitnumbers);
			     	}
		    	}
	    		
	    		var vCurrentRetTbl = sap.ui.getCore().byId("idAddRetEDRetTbl");
	    		sap.ui.getCore().byId("idBtnCurrValidateEDRet").setEnabled(true);
				vCurrentRetTbl.unbindRows();
		     	var oModelCurrReturns = new sap.ui.model.json.JSONModel();
		     	oModelCurrReturns.setData({modelData: aAddRetTblData});
		     	vCurrentRetTbl.setModel(oModelCurrReturns);
		     	vCurrentRetTbl.bindRows("/modelData");
		     	var vArrayLength=aAddRetTblData.length;
		     	if(vArrayLength < 25){
		     		vCurrentRetTbl.setVisibleRowCount(vArrayLength);
		     		vCurrentRetTbl.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
	        	}
	        	else{
	        		vCurrentRetTbl.setVisibleRowCount(25);
	        		vCurrentRetTbl.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
	        	}
	    	}
		}
		else{
			var Limit25Message = "Maximum 25 units can be processed in a single transaction.";
			 sap.ui.commons.MessageBox.show(Limit25Message,
                    sap.ui.commons.MessageBox.Icon.WARNING,
                    "Warning",
                    [sap.ui.commons.MessageBox.Action.OK], 
                        sap.ui.commons.MessageBox.Action.OK);
			 if(aAddRetTblData.length == 0){
				 sap.ui.getCore().byId("idAddRetEDRetTbl").destroy();
				  sap.ui.getCore().byId("idFlexBoxAddRetEDRetTbl").destroy();
				  sap.ui.getCore().byId("idFlexCurrRetTblFooterEDRet").destroy();
			 }
		}
	},
	
	SelectAllAddedRetEDRet:function(){
		var len = aAddRetTblData.length;
		var vCurrRetTbl = sap.ui.getCore().byId("idAddRetEDRetTbl");
		if(sap.ui.getCore().byId("idSelectAllChkBxCurrentRetEDRet").getChecked()){
			for(var i=0;i<len;i++){
				aAddRetTblData[i].isChecked = true;
			}
		}		
		else{
			for(var i=0;i<len;i++){
				aAddRetTblData[i].isChecked = false;
			}
		}
			
		vCurrRetTbl.getModel().updateBindings();
	}, //SelectAllUnitNumbers
	
	DeleteCurrRetEDRet: function(){
		oCurrent = this;
		var vCurrentRetTbl = sap.ui.getCore().byId("idAddRetEDRetTbl");
		
		var NoChkBoxCheckedMessage = "No Units have been selected. \n " +
		 "Please select unit(s) to delete by checking the relevant checkbox(es) and retry";
		aChkBoxChkdCurrRetOR = $('#idAddRetEDRetTbl').find('input[type="checkbox"]:checked');
		var vChkdLen = aChkBoxChkdCurrRetOR.length
		if(vChkdLen == 0 ){
			 sap.ui.commons.MessageBox.show(NoChkBoxCheckedMessage,
                     sap.ui.commons.MessageBox.Icon.WARNING,
                     "Warning",
                     [sap.ui.commons.MessageBox.Action.OK], 
                         sap.ui.commons.MessageBox.Action.OK);
			 
		}
		else{
			var ConfirmMessage = "This will delete the records you have selected.\n Do you still want to continue?";
			 sap.ui.commons.MessageBox.show(ConfirmMessage,
      			  sap.ui.commons.MessageBox.Icon.WARNING,
      				"Warning",
                    [sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO], 
                    oCurrent.fnCallbackDeleteEdREt,
                    sap.ui.commons.MessageBox.Action.YES);
			 var submitFlag = false;
			 for(var j=0 ; j<aAddRetTblData.length;j++){
		    		if(aAddRetTblData[j].Status == "OK" || aAddRetTblData[j].Status == "WARNING"){
		    			submitFlag = true;
		    		}
		    		else{
		    			submitFlag=false;
		    			break;
		    		}
		    	}
		    	if(submitFlag){
		    		sap.ui.getCore().byId("idBtnCurrSubmitEDRet").setEnabled(true);
		    	}
		    	else{
		    		sap.ui.getCore().byId("idBtnCurrSubmitEDRet").setEnabled(false);
		    	}
		}
	},
	
	fnCallbackDeleteEdREt: function(sResult){
		var vCurrentRetTbl = sap.ui.getCore().byId("idAddRetEDRetTbl");
		if(sResult == "YES"){
			 var arrayLen = aAddRetTblData.length;
	            for(var i=arrayLen-1; i>=0; i--){
	                   if(aAddRetTblData[i].isChecked){
	                	   aAddRetTblData.splice(i,1);
	                	   vCurrentRetTbl.getModel().updateBindings();
	                         arrayLen = arrayLen - 1;
	                   }
	            }
	            vArrayLength = aAddRetTblData.length;
	            if(vArrayLength < 25){
		     		vCurrentRetTbl.setVisibleRowCount(vArrayLength);
		     		vCurrentRetTbl.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
	        	}
	        	else{
	        		vCurrentRetTbl.setVisibleRowCount(25);
	        		vCurrentRetTbl.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
	        	}
	            var submitFlag = false;
				 for(var j=0 ; j<aAddRetTblData.length;j++){
			    		if(aAddRetTblData[j].Status == "OK" || aAddRetTblData[j].Status == "WARNING"){
			    			submitFlag = true;
			    		}
			    		else{
			    			submitFlag=false;
			    			break;
			    		}
			    	}
			    	if(submitFlag){
			    		sap.ui.getCore().byId("idBtnCurrSubmitEDRet").setEnabled(true);
			    	}
			    	else{
			    		sap.ui.getCore().byId("idBtnCurrSubmitEDRet").setEnabled(false);
			    	}
	           // vCurrentRetTbl.setVisibleRowCount(arrayLen);

		}
	},
	
	currRetResetEDRet:function(){
		var oCurrent = this;
		var ConfirmMessage = "This will delete all the selections in current returns section.\n Do you want to proceed?";
		 sap.ui.commons.MessageBox.show(ConfirmMessage,
 			  sap.ui.commons.MessageBox.Icon.WARNING,
 				"Warning",
               [sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO], 
               oCurrent.fnCallbackResetCurrRetEDRet,
               sap.ui.commons.MessageBox.Action.YES);
	  }, //currRetReset
	  
	  fnCallbackResetCurrRetEDRet: function(sResult){
			 if(sResult == "YES"){
				 aAddRetTblData = [];
				 if(sap.ui.getCore().byId("idAddRetEDRetTbl")){
					  sap.ui.getCore().byId("idAddRetEDRetTbl").destroy();
					  sap.ui.getCore().byId("idFlexBoxAddRetEDRetTbl").destroy();
					  sap.ui.getCore().byId("idFlexCurrRetTblFooterEDRet").destroy();
				 }
			 }
		}, //fnCallbackResetCurrRetOR
		
		ValidateCurrRetEDRet: function(){
			var vCust = "";
			loggedInUserTypeEDRetResult = objLoginUser.getLoggedInUserType();
			/*if(loggedInUserTypeEDRetResult != "SEACO")
				vCust = objLoginUser.getLoggedInUserID();
			else
				vCust = vCustomerIDEDRet;*/
		
			var vCurrentRetTbl = sap.ui.getCore().byId("idAddRetEDRetTbl");
			var oUtil = new utility();
			busyDialog.open();
			var Row = [];
			var count = 0;
			var aChkBoxCurrRetValidateEDRet = [];
			var NoChkBoxCheckedMessage = "No Units have been selected. \n " +
			 "Please select unit(s) to validate by checking the relevant checkbox(es) and retry";
			aChkBoxCurrRetValidateEDRet = jQuery.grep(aAddRetTblData, function(element, index){
	            return element.isChecked == true;
	    		});
			
			//alert("chkd len " + aChkBoxCurrRetValidateEDRet.length);
			var len = aChkBoxCurrRetValidateEDRet.length;
			if(len == 0){
				 sap.ui.commons.MessageBox.show(NoChkBoxCheckedMessage,
	                     sap.ui.commons.MessageBox.Icon.WARNING,
	                     "Warning",
	                     [sap.ui.commons.MessageBox.Action.OK], 
	                         sap.ui.commons.MessageBox.Action.OK);
				 busyDialog.close();
			}
			else{
				var urlToCall = serviceUrl + "/Current_Ret_Validate?$filter="; 
				
				for(var j=0 ; j < aAddRetTblData.length ; j++){
					for(var i=0 ; i < len ; i++){
						
						if(aAddRetTblData[j].SerialNo == aChkBoxCurrRetValidateEDRet[i].SerialNo){
							// Row[count] = aAddRetTblData[j].Contract + "$$$$" + aAddRetTblData[j].Location + "$$" + aAddRetTblData[j].SerialNo.toUpperCase();
							 Row[count] = oUtil.removeLeadZero(vCustomerIDEDRet) + "$$$$" + aAddRetTblData[j].Location + "$$" + aAddRetTblData[j].SerialNo.toUpperCase()+ "$" + aAddRetTblData[j].ReturnDate;
							 count++;
							 break;
						}
					}
				}
				
				for(var k=0 ; k < Row.length ; k++){
					if(k != (Row.length-1)){
						urlToCall = urlToCall + " ICustDetail" + (k+1) + " eq '" + Row[k] + "' and";
					}
					else{
						urlToCall = urlToCall + " ICustDetail" + (k+1) + " eq '" + Row[k] + "'";
					}
				}
			//	alert("url validate:" + urlToCall);
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
				    	aErrWarningEDRet = [];
				    	//var oUtil = new utility();
				    	var errArray = [];
				    	var dataLen = data.results.length;
				    	aErrWarningEDRet = data.results;
				    	for(var k=0 ; k<aAddRetTblData.length ; k++){
				    	errArray = jQuery.grep(data.results, function(element, index){
				            return element.Serialnr.trim().toUpperCase() == aAddRetTblData[k].SerialNo.substring(0,18).trim().toUpperCase();
				    	});
				    		
					    	if(errArray.length > 0){
					    		
					    		if(loggedInUserTypeEDRetResult != "SEACO"){
					    			if((errArray[0].Status.toUpperCase()) == "WARNING" || (errArray[0].Status.toUpperCase()) == "ERROR")
					    				aAddRetTblData[k].Status = "ERROR";
					    			else
					    				aAddRetTblData[k].Status = errArray[0].Status;
					    		}
					    		else{
					    			aAddRetTblData[k].Status = errArray[0].Status;
					    		}
					    		if(errArray[0].Status == "OK")
						    		aAddRetTblData[k].isStatusEnabled = false;
					    		else
					    			aAddRetTblData[k].isStatusEnabled = true;
					    		
					    		if(aAddRetTblData[k].ErrMsgno == "999" && aAddRetTblData[k].ErrLine == "9999" && aAddRetTblData[k].Status.trim().toUpperCase() == "ERROR"){
					    			aAddRetTblData[k].Status = errArray[0].Status;
					    			aAddRetTblData[k].isStatusEnabled = true;
								}
					    		
					    		//aAddRetTblData[k].isStatusEnabled = true;
					    		/*if(aAddRetTblData[k].Contract == "")
					    			aAddRetTblData[k].Contract = objUtil.removeLeadZero(errArray[0].Contract);
					    		if(aAddRetTblData[k].UnitType == "")
					    			aAddRetTblData[k].UnitType = errArray[0].UnitType;
					    		if(aAddRetTblData[k].Depot == "")
					    			aAddRetTblData[k].Depot = errArray[0].Depot;*/
					    		
					    		//for new condtn as discussed with kshitij on 5 august 2014
					    			aAddRetTblData[k].ContractType = errArray[0].Contyp;
					    			aAddRetTblData[k].Contract = objUtil.removeLeadZero(errArray[0].Contract);
					    			aAddRetTblData[k].UnitType = errArray[0].UnitType;
					    			aAddRetTblData[k].Depot = errArray[0].Depot;
					    		
					    		
					    	}
					    	else{
					    		if(aAddRetTblData[k].Status == ""){
						    		aAddRetTblData[k].Status = "";
						    		aAddRetTblData[k].isStatusEnabled = false;
					    		}
					    	}
				    	}
				    	vCurrentRetTbl.getModel().updateBindings();
				    	var submitFlag = false;
						 for(var j=0 ; j<aAddRetTblData.length;j++){
					    		if(aAddRetTblData[j].Status == "OK" || aAddRetTblData[j].Status == "WARNING"){
					    			submitFlag = true;
					    		}
					    		else{
					    			submitFlag=false;
					    			break;
					    		}
					    	}
					    	if(submitFlag){
					    		sap.ui.getCore().byId("idBtnCurrSubmitEDRet").setEnabled(true);
					    	}
					    	else{
					    		sap.ui.getCore().byId("idBtnCurrSubmitEDRet").setEnabled(false);
					    	}
				    	busyDialog.close();
				    },
				    function(err){
				    	busyDialog.close();
				    	errorfromServer(err);
				    	//alert("Error while reading region : "+ window.JSON.stringify(err.response));
				    }); //odata request
			}
		}, //ValidateCurrRetOR
		
		showErrDetEDRet: function(selSrNo){
			
			var currErrMsgs = jQuery.grep(aErrWarningEDRet, function(element, index){
	            return element.Serialnr.trim().toUpperCase() == selSrNo.substring(0,18).trim().toUpperCase();
			});
			
			var err = "";
			for(var i=0 ; i<currErrMsgs.length;i++){
				if( currErrMsgs[i].ErrType == "E"){
					//alert("e")
					err += "Error : " + currErrMsgs[i].ErrMessage + "\n";
				}
				else{
					//alert("w")
					err += "Warning : " + currErrMsgs[i].ErrMessage + "\n";
				}
				
			}
			sap.ui.commons.MessageBox.alert(
	                "Message \n\n" +
	                "\t"+err+ "");
		},
		
		submitCurrRetEDRet: function(indexStart,indexEnd){
			//vCustomerIDEDRet
			busyDialog.open();
			var vCurrRetLen = aAddRetTblData.length;
			var Row = [];
			var RowMail = [];
			var count = 0;
			var vRANumber = sap.ui.getCore().byId("idRANumberEDRet").getValue().trim();
			var arrFieldEDRet = ["ReturnData1", "ReturnData2","ReturnData3","ReturnData4","ReturnData5","ReturnData6","ReturnData7","ReturnData8","ReturnData9","ReturnData10","ReturnData11","ReturnData12","ReturnData13","ReturnData14","ReturnData15"];
			var arrFieldEDRetMail = ["CtMailData1", "CtMailData2","CtMailData3","CtMailData4","CtMailData5","CtMailData6","CtMailData7","CtMailData8","CtMailData9","CtMailData10","CtMailData11","CtMailData12","CtMailData13","CtMailData14","CtMailData15"];
			var urlToCall = "";
			urlToCall = serviceUrl + "/ADD_RETURNS?$filter=Customer eq '" + vCustomerIDEDRet + "' and ReturnAuth eq '" + vRANumber + "'";
			urlToCallForAddMail = serviceUrl + "/Add_Returns_Mail?$filter=Customer eq '" + vCustomerIDEDRet + "' and ReturnAuth eq '" + vRANumber + "'";
			
			if(vCurrRetLen <= 15){
				for(var j=0 ; j< vCurrRetLen ; j++){
					var depotName = aAddRetTblData[j].Depot;
					depotName =	depotName.replace(/\'/g, "|");
					depotName =  depotName.replace(/&/g, "@");
					
								 Row[count] = aAddRetTblData[j].ContractType + "$" + aAddRetTblData[j].Contract + "$" + aAddRetTblData[j].UnitType + "$" +
								 aAddRetTblData[j].Location + "$" + depotName + "$" + aAddRetTblData[j].SerialNo + "$" + 
								 aAddRetTblData[j].ReturnDate;
								 			// dateFormat(aCurrentReturnsOR[j].ReturnDate,'yyyymmdd');
								 
								 RowMail[count] = aAddRetTblData[j].ContractType + "$" + aAddRetTblData[j].Contract + "$" + aAddRetTblData[j].UnitType + "$" +
								 aAddRetTblData[j].Location + "$" + depotName + "$" + aAddRetTblData[j].SerialNo + "$" + 
								 aAddRetTblData[j].ReturnDate + "$" + aAddRetTblData[j].Status;
								 count++;
								 //break;
							}
			
					
					for(var k=0 ; k < Row.length ; k++){
							urlToCall = urlToCall + " and ReturnData" + (k+1) + " eq '" + Row[k] + "'";
							urlToCallForAddMail  = urlToCallForAddMail + " and CtMailData" + (k+1) + " eq '" + RowMail[k] + "'";
					}
					oCurrent.oDataToAddUnitsToRA(urlToCall,vCurrRetLen,indexStart,indexEnd,urlToCallForAddMail);	
			}
			else{
				var countSet = (vCurrRetLen/15).toString().split(".")[0];
				var ParamIndx = 0;
					for(var j = indexStart ; j< indexEnd ; j++){
						if(j < vCurrRetLen){
							var depotName = aAddRetTblData[j].Depot;
							depotName =	depotName.replace(/\'/g, "|");
							depotName =  depotName.replace(/&/g, "@");
								var valToPass = "";
								var valToPassMail= "";
								valToPass +=  aAddRetTblData[j].ContractType + "$";
								valToPass +=  aAddRetTblData[j].Contract + "$";
								valToPass +=  aAddRetTblData[j].UnitType + "$";
								valToPass +=  aAddRetTblData[j].Location + "$";
								valToPass +=  depotName + "$";
								valToPass +=  aAddRetTblData[j].SerialNo + "$";
								valToPass +=  aAddRetTblData[j].ReturnDate + "$";
								valToPassMail = valToPass + aAddRetTblData[j].Status;
								urlToCall += " and " + arrFieldEDRet[ParamIndx] + " eq '"+ valToPass +"'";
								urlToCallForAddMail += " and " + arrFieldEDRetMail[ParamIndx] + " eq '"+ valToPassMail +"'";
								ParamIndx++;
						}
						else{
							break;
						}
					}
					//busyDialog.close();
					oCurrent.oDataToAddUnitsToRA(urlToCall,vCurrRetLen,indexStart,indexEnd,urlToCallForAddMail);	
					
				//}
			}
		}, //submitCurrRet
		
		oDataToAddUnitsToRA: function(urlToCall,vCurrRetLen,indexStart,indexEnd,urlToCallForAddMail){
			//alert("urlToCall " + urlToCall);
			//busyDialog.open();
			var oCurrent = this;
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
			    	if(data.results.length > 0){
				    	if(data.results[0].Type == "S"){
				    		if(vCurrRetLen > 15 && indexEnd < vCurrRetLen){
				    			oCurrent.submitCurrRetEDRet((indexStart+15),(indexEnd+15));	
				    			oCurrent.sendMailAfterAddEDRet(urlToCallForAddMail,"C");
				    			//busyDialog.close();
				    		}
				    		else{
				    			oCurrent.sendMailAfterAddEDRet(urlToCallForAddMail,"D");
					        	  //busyDialog.close();
				    		}
				    	}
				    	else if(data.results[0].Type == "E"){
				    		if(vCurrRetLen > 15 && indexEnd < vCurrRetLen){
				    			oCurrent.submitCurrRetEDRet((indexStart+15),(indexEnd+15));	
				    			//busyDialog.close();
				    		}
				    		else{
				    			 sap.ui.commons.MessageBox.show(data.results[0].Message,
					                     sap.ui.commons.MessageBox.Icon.WARNING,
					                     "Warning",
					                     [sap.ui.commons.MessageBox.Action.OK], 
					                         sap.ui.commons.MessageBox.Action.OK);
					    		 busyDialog.close();
				    		}
				    	}
				    	else{
				    		 sap.ui.commons.MessageBox.show("Units could not be added currently. Please try again later.",
				                     sap.ui.commons.MessageBox.Icon.WARNING,
				                     "Warning",
				                     [sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO], 
				                     oCurrent.fnCallbackMessageBox,
				                         sap.ui.commons.MessageBox.Action.YES); 
				    		 busyDialog.close();
				    	}
				    	
				    	}
			    	else{
			    		 sap.ui.commons.MessageBox.show("Units could not be added currently. Please try again later.",
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
			    	//alert("Error while reading region : "+ window.JSON.stringify(err.response));
			    }); //odata request
		},
		
		fnCallbackAddToRetResetEDRet: function(sResult){
			if(sResult == "YES"){
				 var vSelCityEDRet = $("#idComboCityEDRetAdd");
				 
				$("#idComboCityEDRetAdd").attr("placeholder","Select City");
				document.getElementById("idComboCityEDRetAdd").style.borderColor = "#cccccc";
				document.getElementById("idComboCityEDRetAdd").style.background = "#ffffff";
				 
				vSelCityEDRet.val("");
				sap.ui.getCore().byId("idTAUnitNoAddReturnED").setValue("");
				sap.ui.getCore().byId("idTAUnitNoAddReturnED").setValueState(sap.ui.core.ValueState.None);
				sap.ui.getCore().byId("idTAUnitNoAddReturnED").setPlaceholder("Unit Numbers");
				 customJsonCurrRetEDRet = [];  
			}
		},
		
		currRetCancelEDRet: function(sResult){
			var oCurrent = this;
			if(sResult == "YES"){
				var bus = sap.ui.getCore().getEventBus();
	   			bus.publish("nav", "back");
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
		},
		
		checkLimit25EDRet: function(){
			var len = aAddRetTblData.length;
			var PresentFlagEDRet = false;
			var countPresentNumbers = 0;
			var totalCount = 0;
			var newUnUR = sap.ui.getCore().byId("idTAUnitNoAddReturnED").getValue().split(/\n/g);
			var unitNumbrsEnteredNew = newUnUR.length;
			var enteredUnitNumbersEDRet = [];
			for(var k=0 ; k<unitNumbrsEnteredNew ; k++){
	    		
	    		if(newUnUR[k].trim().length != 0){
	    			enteredUnitNumbersEDRet.push(newUnUR[k].toUpperCase().trim());
	    		}
	    	}
			var oUtil = new utility();
			enteredUnitNumbersEDRet = oUtil.unique(enteredUnitNumbersEDRet);
	    	
			unitNumbrsEnteredLength = enteredUnitNumbersEDRet.length;
	    	for(var j=0;j<unitNumbrsEnteredLength;j++){
				var temp = jQuery.grep(aAddRetTblData, function(element, index){
		            return element.SerialNo == enteredUnitNumbersEDRet[j];
		    		});
				if(temp.length>0){
					PresentFlagEDRet = true;
					countPresentNumbers++;
				}
			}
			//alert("present " + countPresentNumbers);
			if(PresentFlagEDRet)
				 totalCount = len + unitNumbrsEnteredLength - countPresentNumbers;
			else
				 totalCount = len + unitNumbrsEnteredLength;
			if(totalCount > 25){
				//alert("stop")
				return false;
			}
			else{
				//alert("go");
				return true;
			}
		},
		
		sendMailAfterAddEDRet: function(urlToCallForAddMail,CheckCompletionFlag){
			var oCurrent = this;
			oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
			OData.request({ 
			      requestUri: urlToCallForAddMail,
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
			    	if(CheckCompletionFlag == "D"){
			    		sap.ui.commons.MessageBox.alert(data.results[0].Message,fnCallBackSendMailAddUnitEDRet);
			    		busyDialog.close();
			    	}
			    },
			    function(err){
			    	busyDialog.close();
			    	errorfromServer(err);
			    	//alert("Error while reading region : "+ window.JSON.stringify(err.response));
			    }); //odata request
		}
});

function fnCallBackSendMailAddUnitEDRet(){
	var bus = sap.ui.getCore().getEventBus();
	  bus.publish("nav", "to", {
    id : "EDReturnSearchView"
  }); 
	  if(sap.ui.getCore().byId("idEDRetResultFormElement"))
		  sap.ui.getCore().byId("idEDRetResultFormElement").destroyFields();
	  new raSearchView().getRADetails();
}
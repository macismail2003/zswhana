/******** NP *******/
jQuery.sap.require("sap.ui.model.json.JSONModel");
var jsonMoveInSubmittedEntries = [];
sap.ui.model.json.JSONModel.extend("validateMoveInMultipleViewNew", {
	
	createValidateMoveInMultiple: function(){
		
		var oCurrent = this;
		
		var bckFrmValidateToAMIM = new sap.m.Link("idBckFrmValidateToAMIM", {
			text: " < Back",
            width:"9%",
            wrapping:true,
            press: function(){
                    var bus = sap.ui.getCore().getEventBus();
                    bus.publish("nav", "back");
            }}).addStyleClass('marginTop20');; //marginTop20
		
		var oMoveInMultStatusTable = new sap.m.Table({
			id : "idMoveInMultStatusTable", // sap.ui.core.ID
			visible : false, // boolean
			inset : true, // boolean
			headerText : "Gate In Validation - Result", // string
			//headerText : new sap.ui.commons.Label({text: "Gate In Validation - Result"}).addStyleClass("fontTitle"),
			headerDesign : sap.m.ListHeaderDesign.Standard, // sap.m.ListHeaderDesign, since 1.14
			//width : "600px", // sap.ui.core.CSSSize
			includeItemInSelection : false, // boolean
			showUnread : false, // boolean
			noDataText : "No Data", // string
			showNoData : true, // boolean
//			footerText : "You can upload EIR files using column EIR",
			columns: [
			 		 
			           new sap.m.Column("idMoveInMultStatusTableColCheckbox", {
			        	   visible: false,
			           //mergeDuplicates : true,
			           width: "25px",
			           header: new sap.m.CheckBox({
			        	   
			        	   selected : false,
				           select : [ function(oEvent) {
								var control = oEvent.getSource();
								var isSelect = oEvent.getParameter("selected");
								oCurrent.selectAll(isSelect);
							}, this ]
			           		}),
			           }),    
					   
			           new sap.m.Column("idMoveInMultStatusTableColSerial", {
			        	   mergeDuplicates : true,
			        	   width: "auto",
				           header: new sap.m.Text({
				           text: "Serial"
				           }).addStyleClass("wraptextcol")
				        }),
					           
					        
			           new sap.m.Column("idMoveInMultStatusTableColDate", {
			        	   visible: false,
			        	   width: "auto",
				           header: new sap.m.Text({
				           text: "Date"
				           }).addStyleClass("wraptextcol")
				        }),
			               
				        
				        new sap.m.Column("idMoveInMultStatusTableColReturn", {
				        	   visible: false,
				        	   width: "auto",
					           header: new sap.m.Text({
					           text: "Return Auth"
					           }).addStyleClass("wraptextcol")
					     }),
//					     
					     new sap.m.Column("idMoveInMultStatusTableColAvail", {
					    	   visible: false,
				        	   width: "auto",
					           header: new sap.m.Text({
					           text: "Avail."
					           }).addStyleClass("wraptextcol")
					           }),
			           new sap.m.Column("idMoveInMultStatusTableColStatus", {
			        	   width: "auto",
				           header: new sap.m.Text({
				           text: "Status"
				           }).addStyleClass("wraptextcol")
				           }),
				           
					     new sap.m.Column("idMoveInMultStatusTableColUnno", {
					    	   visible: false,
				        	   width: "auto",
					           header: new sap.m.Text({
					           text: "UN No."
					           }),
					       }),
		       
				           new sap.m.Column("idMoveInMultStatusTableColLclean", {
				        	   visible: false,
				        	   width: "auto",
					           header: new sap.m.Text({
					           text: "Last Clean"
					           })
					           }),
//						           
				           new sap.m.Column("idMoveInMultStatusTableColLcargo", {
				        	   visible: false,
				        	   width: "auto",
					           header: new sap.m.Text({
					           text: "Last Cargo"
					           })
					           }),
//							           
				           new sap.m.Column("idMoveInMultStatusTableColCdesc", {
				        	   visible: false,
				        	   width: "auto",
					           header: new sap.m.Text({
					           text: "Cargo Desc"
					           })
					           }),
//								           
//					     }), 
							               
		           			 
			   ],
			  items : {
		      path: '/modelData',
		      template: new sap.m.ColumnListItem({
		      selected: false,
		      //type: "Active",
		      cells: [
               new sap.m.CheckBox({
                 selected: "{isChecked}",
                 enabled: "{isCheckEnabled}"
                     }), 
                     
                     new sap.m.Text({
                         text: "{Serial}"
                             }),
		 
		 
                new sap.m.Text({
                	text: "{Date}",
	                 }), 
			                 
			              
	              new sap.m.Text({
	                 text: "{Return}",
		          }), 
				  
		          new sap.m.Text({
		                 text: "{Avlb}",
		                 
			          }), 
			          
		                 new sap.m.Text({
			                 text: "{Message}"
//			                 press: function(oEvent){
//			                	 var message = oEvent.getSource().getBindingContext().getProperty("Message");
//			                	 sap.ui.commons.MessageBox.alert(message);
//			                 }
			             }),
			             
		          new sap.m.Text({
		                 text: "{Unno}",
		                 
			          }), 
					          
		          new sap.m.Text({
		                 text: "{Lastclean}",
		                 
			          }), 
						          
		          new sap.m.Text({
		                 text: "{Lastcargo}",
		                 
						}), 
		          
		          new sap.m.Text({
		                 text: "{Cargodesc}",
			          }),
								          
		                 ]
		                  })
		          }}).addStyleClass('sapUiSizeCompact marginLeft'); 
	   	
//	   	var oMoveInMultStatusTableFooter = new sap.m.Label({
//	   		text : "You can upload EIR files using column EIR";
//	   			visible:false,
//	   	}).addStyleClass('floatRight marginTop20 redelReference');
	   	
	   	var oMoveInMultButtonConfirm = new sap.m.Button("idMoveInMultButtonConfirm",{
			  text : "Submit",
			  //width:"100px",
			  visible: false,
			  styled:false,
			  //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: true}),
			  press:function(){
				oCurrent.sendToSapForSubmissionNew();
		}}).addStyleClass("submitBtn marginLeft marginTop20");
	   	
	   	var oMoveInMultButtonRemove = new sap.m.Button("idMoveInMultButtonRemove",{
			  text : "Remove Errors",
			  //width:"100px",
			  visible: false,
			  styled:false,
			  //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: true}),
			  press:function(){
				oCurrent.removeErrorEntries();
		}}).addStyleClass("submitBtn marginLeft30 marginTop20");
	   	
	   	
	   	var oFlexMoveInMultButtons = new sap.m.FlexBox({
	           items: [
	                   	oMoveInMultButtonConfirm,
	                   	oMoveInMultButtonRemove
	                   	//oMoveInMultStatusTableFooter
	           ],
	           direction : "Row",
		});//.addStyleClass('marginLeft marginTop72');
	   	
	   	var oFlexMoveInMultSecond = new sap.m.FlexBox({
	           items: [ bckFrmValidateToAMIM,
//	                    new sap.ui.commons.Label({text: "Gate In Submission",
//						wrapping: true}).addStyleClass("marginTop7 marginLeft fontTitle"),
	                   	oMoveInMultStatusTable,
	                   	oFlexMoveInMultButtons
	                   	//oMoveInMultStatusTableFooter
	           ],
	           direction : "Column",
				}).addStyleClass('marginLeft marginTop72');
	   	
	  return oFlexMoveInMultSecond;

	},
	
	validateDataAMIM: function(){
		busyDialog.open();
		
		aSubmitInMultipleSMIM = [];
		
		var currDateAMIM = new Date();
		var currYearAMIM = currDateAMIM.getFullYear();
		var currMonthAMIM = currDateAMIM.getMonth()+1;
		var currDayAMIM = currDateAMIM.getDate();
		
		var incorrectSerNoFlagAMIM = true;
		var incorrectDateFlagAMIM = true;
		var incorrectSerNoDateFlagAMIM = true;
		
		for(var i=0;i<aMoveInMultipleAMIM.length; i++){
			
			 var splitDateAMIM = "";
			 var selYearAMIM = "";
			 var selMonthAMIM = "";
			 var selDayAMIM = "";
			
			 incorrectSerNoFlagAMIM = true;
			 incorrectDateFlagAMIM = true;
			 incorrectSerNoDateFlagAMIM = true;
			 
			 var retDateAMIM = aMoveInMultipleAMIM[i].retDateVal;
		        
			 var rxDatePattern = /^(\d{1,2})(\-|-)(\d{1,2})(\-|-)(\d{4})$/;
			    var dtArray = retDateAMIM.match(rxDatePattern);
				
			    if (dtArray == null){
			    	incorrectDateFlagAMIM = false;
			    }
			    else{
			    	 splitDateAMIM = retDateAMIM.split("-");
					
					 selYearAMIM = splitDateAMIM[2];
					 selMonthAMIM = splitDateAMIM[1];
					 selDayAMIM = splitDateAMIM[0];
			    }
			
			if(aMoveInMultipleAMIM[i].serialNo.trim().length >0 && aMoveInMultipleAMIM[i].serialNo.trim().length != 11){
				incorrectSerNoFlagAMIM = false;
				}
			if(selMonthAMIM == 2){
				var isleap = (selYearAMIM % 4 == 0 && (selYearAMIM % 100 != 0 || selYearAMIM % 400 == 0));
			     if (selDayAMIM> 29 || (selDayAMIM ==29 && !isleap)){
				    	 incorrectDateFlagAMIM = false;
				     }
			}
			if((dtArray == null) && (aMoveInMultipleAMIM[i].serialNo.length >0 && aMoveInMultipleAMIM[i].serialNo.length != 11)){
				incorrectSerNoDateFlagAMIM = false;
			}
			if((aMoveInMultipleAMIM[i].serialNo.length >0 && aMoveInMultipleAMIM[i].serialNo.length != 11) && (selMonthAMIM == 2)){
				var isleap = (selYearAMIM % 4 == 0 && (selYearAMIM % 100 != 0 || selYearAMIM % 400 == 0));
			     if (selDayAMIM> 29 || (selDayAMIM ==29 && !isleap)){
			    	 incorrectSerNoDateFlagAMIM = false;
			     }
			}
			
			if(incorrectSerNoDateFlagAMIM == false){
				aSubmitInMultipleSMIM.push({
					"checked": false,
					"status": "images/red_signal.png",
					"serialNo": aMoveInMultipleAMIM[i].serialNo.trim().toUpperCase(),
					"retDate": aMoveInMultipleAMIM[i].retDateVal,
					"auth": aMoveInMultipleAMIM[i].auth,
					"statusA": aMoveInMultipleAMIM[i].statusA,
					"tankDet": aMoveInMultipleAMIM[i].tankDetails,
					"warningError": "Incorrect Serial Number and Date",
					"statusAVal": "",
					"unoNo": aMoveInMultipleAMIM[i].unNo,
					"lastClnDate": aMoveInMultipleAMIM[i].lastClnDate,
					"lastCargoDesc": aMoveInMultipleAMIM[i].lastCargoDesc,
					"clnProcDesc": aMoveInMultipleAMIM[i].clnProcDesc
				});
			}
			else if(incorrectDateFlagAMIM == false){
				aSubmitInMultipleSMIM.push({
					"checked": false,
					"status": "images/red_signal.png",
					"serialNo": aMoveInMultipleAMIM[i].serialNo.trim().toUpperCase(),
					"retDate": aMoveInMultipleAMIM[i].retDateVal,
					"auth": aMoveInMultipleAMIM[i].auth,
					"statusA": aMoveInMultipleAMIM[i].statusA,
					"tankDet": aMoveInMultipleAMIM[i].tankDetails,
					"warningError": "Incorrect Date",
					"statusAVal": "",
					"unoNo": aMoveInMultipleAMIM[i].unNo,
					"lastClnDate": aMoveInMultipleAMIM[i].lastClnDate,
					"lastCargoDesc": aMoveInMultipleAMIM[i].lastCargoDesc,
					"clnProcDesc": aMoveInMultipleAMIM[i].clnProcDesc
				});
			}
			else if(incorrectSerNoFlagAMIM == false){
				aSubmitInMultipleSMIM.push({
					"checked": false,
					"status": "images/red_signal.png",
					"serialNo": aMoveInMultipleAMIM[i].serialNo.trim().toUpperCase(),
					"retDate": aMoveInMultipleAMIM[i].retDateVal,
					"auth": aMoveInMultipleAMIM[i].auth,
					"statusA": aMoveInMultipleAMIM[i].statusA,
					"tankDet": aMoveInMultipleAMIM[i].tankDetails,
					"warningError": "Incorrect Serial Number",
					"statusAVal": "",
					"unoNo": aMoveInMultipleAMIM[i].unNo,
					"lastClnDate": aMoveInMultipleAMIM[i].lastClnDate,
					"lastCargoDesc": aMoveInMultipleAMIM[i].lastCargoDesc,
					"clnProcDesc": aMoveInMultipleAMIM[i].clnProcDesc
				});
			}
				else{
					aSubmitInMultipleSMIM.push({
						"checked": false,
						"status": "images/green_signal.png",
						"serialNo": aMoveInMultipleAMIM[i].serialNo.trim().toUpperCase(),
						"retDate": aMoveInMultipleAMIM[i].retDateVal,
						"auth": aMoveInMultipleAMIM[i].auth,
						"statusA": aMoveInMultipleAMIM[i].statusA,
						"tankDet": aMoveInMultipleAMIM[i].tankDetails,
						"warningError": "",
						"statusAVal": "",
						"unoNo": aMoveInMultipleAMIM[i].unNo,
						"lastClnDate": aMoveInMultipleAMIM[i].lastClnDate,
						"lastCargoDesc": aMoveInMultipleAMIM[i].lastCargoDesc,
						"clnProcDesc": aMoveInMultipleAMIM[i].clnProcDesc
					});
				}
				}
		
		busyDialog.close();
		var bus = sap.ui.getCore().getEventBus();
  	  	bus.publish("nav", "to", {
        id : "SubmitMoveInMultiple"
	  	});
  	  	
  	  var oObjSubmitMovemntInMultiple = new submitMovemntInMultipleView();
  	oObjSubmitMovemntInMultiple.updateBindingSubmitValidationAMIM();
  	oObjSubmitMovemntInMultiple.enableSubmitBtnSAMIM();
	},
	
	updateBindingValidateAMIM: function(){
    	var oModelValidateInMultiple = new sap.ui.model.json.JSONModel();
    	oModelValidateInMultiple.setData({modelData: aMoveInMultipleAMIM});
    	sap.ui.getCore().byId("idTblValidateTDAMIM").setModel(oModelValidateInMultiple);
    	sap.ui.getCore().byId("idTblValidateTDAMIM").bindRows("/modelData");
    	
    	sap.ui.getCore().byId("idTblValidateTDAMIM").setVisibleRowCount(aMoveInMultipleAMIM.length);
	
    	sap.ui.getCore().byId("idDepotDisplayAMIMVDTD").setText(selectedDepotToPassAMIM);
	},
	
	removeSelectedEntries : function(){
		var jsonMoveInToSubmitEntriesNew = [];
		var enableConfirm = true;
		for(var i = 0; i<jsonMoveInToSubmitEntries.length; i++){
			if(jsonMoveInToSubmitEntries[i].isChecked == false){
				if(jsonMoveInToSubmitEntries[i].Status != "Success"){
						enableConfirm = false;		
				}
				jsonMoveInToSubmitEntriesNew.push(jsonMoveInToSubmitEntries[i]);
			}
		}
		jsonMoveInToSubmitEntries = [];
		jsonMoveInToSubmitEntries = jsonMoveInToSubmitEntriesNew;
		var oMoveInMultStatusTableModel = new sap.ui.model.json.JSONModel();
		oMoveInMultStatusTableModel.setData({modelData : jsonMoveInToSubmitEntries});
		sap.ui.getCore().byId("idMoveInMultStatusTable").setModel(oMoveInMultStatusTableModel);
		sap.ui.getCore().byId("idMoveInMultButtonConfirm").setEnabled(enableConfirm);
	},
	
	removeErrorEntries : function(){
		var jsonMoveInToSubmitEntriesNew = [];
		var enableConfirm = true;
		for(var i = 0; i<jsonMoveInToSubmitEntries.length; i++){
			if(jsonMoveInToSubmitEntries[i].Status != "Error"){
				jsonMoveInToSubmitEntriesNew.push(jsonMoveInToSubmitEntries[i]);
			}
		}
		jsonMoveInToSubmitEntries = [];
		jsonMoveInToSubmitEntries = jsonMoveInToSubmitEntriesNew;
		var oMoveInMultStatusTableModel = new sap.ui.model.json.JSONModel();
		oMoveInMultStatusTableModel.setData({modelData : jsonMoveInToSubmitEntries});
		sap.ui.getCore().byId("idMoveInMultStatusTable").setModel(oMoveInMultStatusTableModel);
		sap.ui.getCore().byId("idMoveInMultButtonConfirm").setEnabled(true);
	},
	
	sendToSapForSubmissionNew : function(){
		
		var newDate = null;
		var enableConfirm = true;
		jsonSubmittedEntries = [];
		var jsonMoveInToSubmitEntriesLength = jsonMoveInToSubmitEntries.length;
		var validate = " ";
		var depot = selectedDepotToPassCodeAMIM;
		var stringToPass = "";
		var stringCount = 1;
		var date = "";
		if(jsonMoveInToSubmitEntriesLength == 0)
			sap.ui.commons.MessageBox.alert("No data to submit");
		else{
			for(var i =0; i < jsonMoveInToSubmitEntriesLength; i++){
				if(jsonMoveInToSubmitEntries[i].Avlb == "Yes"){
					jsonMoveInToSubmitEntries[i].Avlb = "X";
				}else{
					jsonMoveInToSubmitEntries[i].Avlb = "";
				}
				
				date = jsonMoveInToSubmitEntries[i].Date;
				date = date.substr(6,4) + date.substr(3,2) + date.substr(0,2);
				
				if(stringToPass == ""){
					stringToPass = stringToPass + "Igatein" + stringCount + " eq '" + jsonMoveInToSubmitEntries[i].Serial + "$" + 
					selectedDepotToPassAMIM + "$" + 
					depot + "$" + 
					jsonMoveInToSubmitEntries[i].Return + "$" + 
					date + "$" + 
					jsonMoveInToSubmitEntries[i].Unno + "$" + 
					jsonMoveInToSubmitEntries[i].Lastclean + "$" + 
					jsonMoveInToSubmitEntries[i].Lastcargo + "$" + 
					jsonMoveInToSubmitEntries[i].Cargodesc + "$" + 
					jsonMoveInToSubmitEntries[i].Avlb + "'";
				}
				else{
					stringToPass = stringToPass + " and Igatein" + stringCount + " eq '" + jsonMoveInToSubmitEntries[i].Serial + "$" + 
					selectedDepotToPassAMIM + "$" + 
					depot + "$" + 
					jsonMoveInToSubmitEntries[i].Return + "$" + 
					date + "$" + 
					jsonMoveInToSubmitEntries[i].Unno + "$" + 
					jsonMoveInToSubmitEntries[i].Lastclean + "$" + 
					jsonMoveInToSubmitEntries[i].Lastcargo + "$" + 
					jsonMoveInToSubmitEntries[i].Cargodesc + "$" + 
					jsonMoveInToSubmitEntries[i].Avlb + "'";
				}
				stringCount++;
				}
		

		
		
		oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
		var urlToCallSAMIM = serviceUrlMove + "/movein_submitnSet?$filter=" + stringToPass;
		busyDialog.open();
		console.log(urlToCallSAMIM);
		
		OData.request({ 
		      requestUri: urlToCallSAMIM,
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
		    		 sap.ui.commons.MessageBox.alert("Nothing Returned after Submission!");
		    	}
		    	else{
		    		busyDialog.close();
		    		var submittedJSON = data.results;
		    		var submittedJSONLength = submittedJSON.length;
		        	if(submittedJSONLength > 0){// && data.__batchResponses[0].statusText == "OK"){
		        		//jsonReturnEntry = data.__batchResponses[0].data.results[0];
		        		jsonMoveInSubmittedEntries = [];
		        		for(var i=0; i<submittedJSONLength; i++){		
		        			date = data.results[i].Igatein1.split('$')[4];
			        		if(date != "" && date != undefined)
			        			date = date.substr(6,2) + '-' + date.substr(4,2) + '-' + date.substr(0,4);
			        		
		        			jsonMoveInSubmittedEntries.push({
		        				"isChecked": false,
		        				"Status": (data.results[i].Status != "FAIL")? "Success" : "Error",
		        				"Enabled": (data.results[i].Status != "FAIL")? false : true,
		        				"upEnabled": (data.results[i].Status != "FAIL")? true : false,
		        				"Serial":data.results[i].Igatein1.split('$')[0],
		        				"Floc":data.results[i].Igatein1.split('$')[1],
		        				"Depot":data.results[i].Igatein1.split('$')[2],
		        				"Return":data.results[i].Igatein1.split('$')[3],
		        				"Date":data.results[i].Igatein1.split('$')[4],
		        				"Unno":data.results[i].Igatein1.split('$')[5],
		        				"Lastclean":data.results[i].Igatein1.split('$')[6],
		        				"Lastcargo":data.results[i].Igatein1.split('$')[7],
		        				"Cargodesc":data.results[i].Igatein1.split('$')[8],
		        				"Avlb":(data.results[i].Igatein1.split('$')[9] != "X")? "No":"Yes",
		        				"Message":(data.results[i].Status != "FAIL")? "Success" : data.results[i].Message,
		        			});
		        			
		        		if(enableConfirm && data.results[i].LvOstatus == "FAIL"){
		        			enableConfirm = false;
		        		}
		        		}
		        		
		        		/*var bus = sap.ui.getCore().getEventBus();
					  	  	bus.publish("nav", "to", {
					        id : "ValidateMoveInMultipleNew"
				  	  	});*/
				  	  	
//					  	  var oObjValidateMoveInMultipleNew = new validateMoveInMultipleViewNew();
//					  	  oObjValidateMoveInMultipleNew.updateBindingValidateAMIM();
				  	
		        		var oMdlMoveInValidation = new sap.ui.model.json.JSONModel();
		        		oMdlMoveInValidation.setData({modelData : jsonMoveInSubmittedEntries});
		        		sap.ui.getCore().byId("idMoveInMultStatusTable").setModel(oMdlMoveInValidation);
		        		sap.ui.getCore().byId("idMoveInMultStatusTable").setVisible(true);	
		        		sap.ui.getCore().byId("idMoveInMultStatusTable").setWidth("40%");
		        		sap.ui.getCore().byId("idMoveInMultStatusTable").setHeaderText("Gate In Submission - Result");

		        		sap.ui.getCore().byId("idMoveInMultStatusTableColCheckbox").setVisible(false);	
		        		sap.ui.getCore().byId("idMoveInMultStatusTableColDate").setVisible(false);	
		        		sap.ui.getCore().byId("idMoveInMultStatusTableColReturn").setVisible(false);	
		        		sap.ui.getCore().byId("idMoveInMultStatusTableColAvail").setVisible(false);
		        		sap.ui.getCore().byId("idMoveInMultStatusTableColUnno").setVisible(false);
		        		sap.ui.getCore().byId("idMoveInMultStatusTableColLclean").setVisible(false);
		        		sap.ui.getCore().byId("idMoveInMultStatusTableColLcargo").setVisible(false);
		        		sap.ui.getCore().byId("idMoveInMultStatusTableColCdesc").setVisible(false);

		        		sap.ui.getCore().byId("idMoveInMultButtonConfirm").setVisible(false);	
		        		sap.ui.getCore().byId("idMoveInMultButtonRemove").setVisible(false);

		        		console.log("Above Request : Success");
		        		
			        	}else{
			        		console.log("Above Request : Nothing returned");
			        		outMessage = "Cannot Submit, Try again!";
			        		sap.ui.commons.MessageBox.alert(outMessage);
			        	}
		    	}
		    },
		    function(err){
		    	 console.log("Above Request : Error");
		    	 busyDialog.close();
		    	 errorfromServer(err);
		    	//alert("Error while Reading Result : "+ window.JSON.stringify(err.response));
		    });
	}
		
	},
	
});
		
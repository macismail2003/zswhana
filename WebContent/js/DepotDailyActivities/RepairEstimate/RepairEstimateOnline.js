/******** NP *******/	
/*
**$*$------------------------------------------------------------------------*
*$*$ Modified By : Seyed Ismail MAC
*$*$ Modified On : 28.05.2015
*$*$ Reference   : RTS 1182
*$*$ Transport   : CGWK900972
*$*$ Tag         : MAC28052015
*$*$ Purpose     : * Include Responsibility Code - V
				   * Make Responsibility Code - V and J - available only for Joint Survey	
*$*$---------------------------------------------------------------------
*/
/*
**$*$------------------------------------------------------------------------*
*$*$ Modified By : Seyed Ismail MAC
*$*$ Modified On : 01.02.2016
*$*$ Reference   : RTS 1387
*$*$ Transport   : CGWK901161
*$*$ Tag         : MAC01022016
*$*$ Purpose     : To get the open task items using the serial number and auto populate them in the repair lines
*$*$---------------------------------------------------------------------
*/

/* MACALPHA19032018 - Changes done by Seyed Ismail on 19.03.2018 for Alpha Changes
1. Remove Unit Part Code information MACALPHA19032018_1
2. Add Lessor Survey and remove additional, superseding, pre sales, pre delivery MACALPHA19032018_2
*/

jQuery.sap.require("sap.ui.model.json.JSONModel");
var jsnReqQueueREOnline =[];
var hdrJsnDataREEntry = [];
//var lineItemJsnDataREEntry = [];
var saveLineItemREEntry = [], saveLineItemRJSREEntry = [];;
var glblJsonDDLREEntry = [];
glblJsonDDLREEntry.section =[];
glblJsonDDLREEntry.damagecode =[];
glblJsonDDLREEntry.responsibility =[];
glblJsonDDLREEntry.matrialcode =[];
var oMdlGlblDDLREEntry = new sap.ui.model.json.JSONModel();
oMdlGlblDDLREEntry.setData(glblJsonDDLREEntry);
var oItmTmpltGlblDDLREEntry = new sap.ui.core.ListItem();
oItmTmpltGlblDDLREEntry.bindProperty("text", "text");
oItmTmpltGlblDDLREEntry.bindProperty("key", "key");
var estmtIdRJS = '';
var jointtypeSel = false;
var bulletinValues = [];
var depotCurr = "";
var fixedLabourRate = "";
var locationCodes = [];
var materialCodes = [];
var componentCodes = [];
var repairCodes = [];
var damageCodes = [];
var repdamCodes = [];

var locationSource = [];
var componentSource = [];
var repairSource = [];
var damageSource = [];
var materialSource = [];

jsnReqQueueREOnline.resetfield = function(){
	this.length = 0;
	this.push({"task": "section","status":"end","error":"false","errorcode":"","msg":"","errorfunction":""});
	this.push({"task": "damagecode","status":"end","error":"false","errorcode":"","msg":"","errorfunction":""});
	this.push({"task": "respnsibility","status":"end","error":"false","errorcode":"","msg":"","errorfunction":""});
	this.push({"task": "header","status":"end","error":"false","errorcode":"","msg":"","errorfunction":""});
	this.push({"task": "lineitem","status":"end","error":"false","errorcode":"","msg":"","errorfunction":""});
	this.push({"task": "materialcode","status":"end","error":"false","errorcode":"","msg":"","errorfunction":""});
},

sap.ui.model.json.JSONModel.extend("RepairEstimateOnline", {
//VALIDATE UNIT NO AND DEPOT ONLINE
	onlinesuccessValidUnitDepot: function(resultdata, response){
		busyDialog.close();
		if(resultdata != undefined){
			var idSerailNoRESearch = sap.ui.getCore().byId("idSerailNoRESearch");
			var odepoRESearch = sap.ui.getCore().byId("idComboDepotRESearch");
		
			if(resultdata.results.length > 0){
				if(resultdata.results[0].Message.substr(0,5) == "Valid"){
					
					
					/* Begin of adding by Seyed Ismail on 01.02.2016 MAC01022016 */
					
					bulletinValues = [];
					var urlToCallOpentaskitems = serviceUrl15_old + "/get_Opentaskitems?";
					urlToCallOpentaskitems += "$filter=Serial eq '" + idSerailNoRESearch.getValue().toUpperCase() + "' and Cpart eq '" + upc + "'";
					busyDialog.open();
			        oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
			        OData.request({ 
			          requestUri: urlToCallOpentaskitems,
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
			        	bulletinValues = [];
			        	
			        	for(var j=0; j<data.results.length; j++){
			        		bulletinValues.push({
			        			"bulletin" : data.results[j].Ltxa1
			        		});
			        	}
			        	
			        	
			        	
			        	
			        	
			        var urlToCallIsocodes = serviceUrl15_old + "/get_Isocodes?";
			  		  //urlToCallIsocodes += "$filter=Serial eq '" + idSerailNoRESearch.getValue().toUpperCase() + "'";
			  		busyDialog.open();
			          oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
			          OData.request({ 
			            requestUri: urlToCallIsocodes,
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
				          	
			        	  	materialCodes = [];
				          	materialSource = [];
				          	materialSource.push("");
				          	
				          	locationCodes = [];
				          	locationSource = [];
				          	locationSource.push("");
				          	
				          	componentCodes = [];
				          	componentSource = [];
				          	componentSource.push("");
				          	
				          	repairCodes = [];
				          	repairSource = [];
				          	repairSource.push("");
				          	
				          	damageCodes = [];
				          	damageSource = [];
				          	damageSource.push("");
				          	
				          	
				          	for(var j=0; j<data.results.length; j++){
				          		if(data.results[j].Type == "LOCATION"){
				          			locationCodes.push({
				          				"location" : data.results[j].Value,
				          				"locKey" : data.results[j].Value.split("-")[0]
				          			});
				          			locationSource.push(data.results[j].Value.split("-")[0]);   		  
				          		}else if(data.results[j].Type == "COMPONENT"){
				          			componentCodes.push({
				          				"component" : data.results[j].Value,
				          				"comKey" : data.results[j].Value.split("-")[0]
				          			});
				          			componentSource.push(data.results[j].Value.split("-")[0]);   		  
				          		}else if(data.results[j].Type == "REPAIR"){
				          			repairCodes.push({
				          				"repair" : data.results[j].Value,
				          				"repKey" : data.results[j].Value.split("-")[0]
				          			});
				          			repairSource.push(data.results[j].Value.split("-")[0]);   		  
				          		}else if(data.results[j].Type == "DAMAGE"){
				          			damageCodes.push({
				          				"damage" : data.results[j].Value,
				          				"damKey" : data.results[j].Value.split("-")[0]
				          			});
				          			damageSource.push(data.results[j].Value.split("-")[0]);   		  
				          		}else if(data.results[j].Type == "REPDAM"){
				          			repdamCodes.push({
				          				"rep" : data.results[j].Value1,
				          				"repKey" : data.results[j].Value1.split("-")[0],
				          				"dam" : data.results[j].Value,
				          				"damKey" : data.results[j].Value.split("-")[0],
				          			}); 		  
				          		}else if(data.results[j].Type == "MATERIAL"){
				          			materialCodes.push({
				          				"material" : data.results[j].Value,
				          				"matKey" : data.results[j].Value.split("-")[0]
				          			});
				          			materialSource.push(data.results[j].Value.split("-")[0]);   		  
				          		}
				          	}
				          	depotCurr = resultdata.results[0].Message.substr(6,3);
				          	fixedLabourRate = resultdata.results[0].Message.substr(10,(resultdata.results[0].Message.length));
							objcurntRESearch.openScreenREEntry(idSerailNoRESearch.getValue().toUpperCase(),odepoRESearch.getSelectedKey(), odepoRESearch.getValue(),depotCurr,fixedLabourRate, upc);
							
							/* Reset Date and other fields to default */
							
							var todays = new Date();

						    // This month's date
						    var thisDate = todays.getDate();
						    if(thisDate<10) {
						      thisDate = '0' + thisDate;
						    }


						    //This month's month
						    var thisMonth = todays.getMonth();
						    thisMonth = thisMonth + 1;

						    var thisMonths;
						    if(thisMonth < 10)
						    {
						        thisMonths = '0' + thisMonth;
						    }
						    else{
						      thisMonths = thisMonth;
						    }

						    //This month's year
						    var thisYear = todays.getFullYear();

						    var thisValue = String(thisYear) + String(thisMonths) + String(thisDate);
						    sap.ui.getCore().byId("idDtPkrEstimateDtREEntry").setYyyymmdd(thisValue); 
						    sap.ui.getCore().byId("idDdlJobTypeREEntry").setSelectedKey("");
						    sap.ui.getCore().byId("idDdlSaleGradeREEntry").setSelectedKey("");
			          },
			          function(err){
			        	  depotCurr = resultdata.results[0].Message.substr(6,3);
			        	  fixedLabourRate = resultdata.results[0].Message.substr(10,(resultdata.results[0].Message.length));
			        	  objcurntRESearch.openScreenREEntry(idSerailNoRESearch.getValue().toUpperCase(),odepoRESearch.getSelectedKey(), odepoRESearch.getValue(),depotCurr,fixedLabourRate, upc);
			        	  
			        	  /* Reset Date and other fields to default */
							
							var todays = new Date();

						    // This month's date
						    var thisDate = todays.getDate();
						    if(thisDate<10) {
						      thisDate = '0' + thisDate;
						    }


						    //This month's month
						    var thisMonth = todays.getMonth();
						    thisMonth = thisMonth + 1;

						    var thisMonths;
						    if(thisMonth < 10)
						    {
						        thisMonths = '0' + thisMonth;
						    }
						    else{
						      thisMonths = thisMonth;
						    }

						    //This month's year
						    var thisYear = todays.getFullYear();

						    var thisValue = String(thisYear) + String(thisMonths) + String(thisDate);
						    sap.ui.getCore().byId("idDtPkrEstimateDtREEntry").setYyyymmdd(thisValue); 
						    sap.ui.getCore().byId("idDdlJobTypeREEntry").setSelectedKey("");
						    sap.ui.getCore().byId("idDdlSaleGradeREEntry").setSelectedKey("");
			              //errorfunc(err);
			             //alert("Error while Reading Result : "+ window.JSON.stringify(err.response));
			             //return oFlexboxError;
			          });
			        },
			        function(err){
			        	
			        	
			        	
			        	var urlToCallIsocodes = serviceUrl15_old + "/get_Isocodes?";
			  		  //urlToCallIsocodes += "$filter=Serial eq '" + idSerailNoRESearch.getValue().toUpperCase() + "'";
			  		  busyDialog.open();
			          oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
			          OData.request({ 
			            requestUri: urlToCallIsocodes,
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
			          	
			          	materialCodes = [];
			          	materialSource = [];
			          	materialSource.push("");
			          	
			          	locationCodes = [];
			          	locationSource = [];
			          	locationSource.push("");
			          	
			          	componentCodes = [];
			          	componentSource = [];
			          	componentSource.push("");
			          	
			          	repairCodes = [];
			          	repairSource = [];
			          	repairSource.push("");
			          	
			          	damageCodes = [];
			          	damageSource = [];
			          	damageSource.push("");
			          	
			          	
			          	for(var j=0; j<data.results.length; j++){
			          		if(data.results[j].Type == "LOCATION"){
			          			locationCodes.push({
			          				"location" : data.results[j].Value,
			          				"locKey" : data.results[j].Value.split("-")[0]
			          			});
			          			locationSource.push(data.results[j].Value.split("-")[0]);   		  
			          		}else if(data.results[j].Type == "COMPONENT"){
			          			componentCodes.push({
			          				"component" : data.results[j].Value,
			          				"comKey" : data.results[j].Value.split("-")[0]
			          			});
			          			componentSource.push(data.results[j].Value.split("-")[0]);   		  
			          		}else if(data.results[j].Type == "REPAIR"){
			          			repairCodes.push({
			          				"repair" : data.results[j].Value,
			          				"repKey" : data.results[j].Value.split("-")[0]
			          			});
			          			repairSource.push(data.results[j].Value.split("-")[0]);   		  
			          		}else if(data.results[j].Type == "DAMAGE"){
			          			damageCodes.push({
			          				"damage" : data.results[j].Value,
			          				"damKey" : data.results[j].Value.split("-")[0]
			          			});
			          			damageSource.push(data.results[j].Value.split("-")[0]);   		  
			          		}else if(data.results[j].Type == "REPDAM"){
			          			repdamCodes.push({
			          				"rep" : data.results[j].Value1,
			          				"repKey" : data.results[j].Value1.split("-")[0],
			          				"dam" : data.results[j].Value,
			          				"damKey" : data.results[j].Value.split("-")[0],
			          			}); 		  
			          		}else if(data.results[j].Type == "MATERIAL"){
			          			materialCodes.push({
			          				"material" : data.results[j].Value,
			          				"matKey" : data.results[j].Value.split("-")[0]
			          			});
			          			materialSource.push(data.results[j].Value.split("-")[0]);   		  
			          		}
			          	}
			          	depotCurr = resultdata.results[0].Message.substr(6,3);
			          	fixedLabourRate = resultdata.results[0].Message.substr(10,(resultdata.results[0].Message.length));
						objcurntRESearch.openScreenREEntry(idSerailNoRESearch.getValue().toUpperCase(),odepoRESearch.getSelectedKey(), odepoRESearch.getValue(),depotCurr,fixedLabourRate, upc);
						
						/* Reset Date and other fields to default */
						
						var todays = new Date();

					    // This month's date
					    var thisDate = todays.getDate();
					    if(thisDate<10) {
					      thisDate = '0' + thisDate;
					    }


					    //This month's month
					    var thisMonth = todays.getMonth();
					    thisMonth = thisMonth + 1;

					    var thisMonths;
					    if(thisMonth < 10)
					    {
					        thisMonths = '0' + thisMonth;
					    }
					    else{
					      thisMonths = thisMonth;
					    }

					    //This month's year
					    var thisYear = todays.getFullYear();

					    var thisValue = String(thisYear) + String(thisMonths) + String(thisDate);
					    sap.ui.getCore().byId("idDtPkrEstimateDtREEntry").setYyyymmdd(thisValue); 
					    sap.ui.getCore().byId("idDdlJobTypeREEntry").setSelectedKey("");
					    sap.ui.getCore().byId("idDdlSaleGradeREEntry").setSelectedKey("");
					    
			          },
			          function(err){
			        	  busyDialog.close();
			        	  depotCurr = resultdata.results[0].Message.substr(6,3);
			          	  fixedLabourRate = resultdata.results[0].Message.substr(10,(resultdata.results[0].Message.length));
						  objcurntRESearch.openScreenREEntry(idSerailNoRESearch.getValue().toUpperCase(),odepoRESearch.getSelectedKey(), odepoRESearch.getValue(),depotCurr,fixedLabourRate, upc);
						  
						  /* Reset Date and other fields to default */
							
							var todays = new Date();

						    // This month's date
						    var thisDate = todays.getDate();
						    if(thisDate<10) {
						      thisDate = '0' + thisDate;
						    }


						    //This month's month
						    var thisMonth = todays.getMonth();
						    thisMonth = thisMonth + 1;

						    var thisMonths;
						    if(thisMonth < 10)
						    {
						        thisMonths = '0' + thisMonth;
						    }
						    else{
						      thisMonths = thisMonth;
						    }

						    //This month's year
						    var thisYear = todays.getFullYear();

						    var thisValue = String(thisYear) + String(thisMonths) + String(thisDate);
						    sap.ui.getCore().byId("idDtPkrEstimateDtREEntry").setYyyymmdd(thisValue); 
						    sap.ui.getCore().byId("idDdlJobTypeREEntry").setSelectedKey("");
						    sap.ui.getCore().byId("idDdlSaleGradeREEntry").setSelectedKey("");
			          });
			        });
			        
			        
			        /* End of adding by Seyed Ismail on 01.02.2016 MAC01022016 */
				}
				else{
					//var msgDisplay = resultdata.results[0].SerialNo + " is invalid for depot " + resultdata.results[0].FunctLoc;
					sap.ui.commons.MessageBox.alert(resultdata.results[0].Message);
				}
			}else
				sap.ui.commons.MessageBox.alert("Error occured during validate Unit no and Depot.");
		}else
			sap.ui.commons.MessageBox.alert("Error occured during validate Unit no and Depot.");
	},
	
	onlineerrorValidUnitDepot: function(e){
		errorfromServer(e);
	},
	
	onlineValidUnitDepot: function(unitno,depottxt, vUnitPartCode){
		try{
			busyDialog.open();
			var urlToCall = serviceUrl15_old + "/Serialno_Valid_Repair_Estim?$filter=FunctLoc eq '"+depottxt.substr(0,15)+"' and SerialNo eq '"+unitno+"' and Unitpcode eq '"+vUnitPartCode+"'";
		    objUtilREstimate.doOnlineRequest(urlToCall,objREstimateOnline.onlinesuccessValidUnitDepot, objREstimateOnline.onlineerrorValidUnitDepot);
		}catch(e){
			busyDialog.close();
			sap.ui.commons.MessageBox.alert("Error occured during validate Unit no and Depot.");
		}
	},
	
	//SECTION ONLINE
	onlinesuccessfunSection: function(resultdata, response){
		var msg ='';
		jsnReqQueueREOnline[0]["status"] = "end";
		
		if(resultdata != undefined){
			for(var i =0; i < resultdata.results.length; i++){
				glblJsonDDLREEntry.section.push({"text": resultdata.results[i].Description, "key":resultdata.results[i].Param2 })
			}
		}else{
			msg = "No result found.";
		}
		objREstimateOnline.checkAllLoadComplete();
	},
	
	onlineerrorfunSection: function(e){
		jsnReqQueueREOnline[0]["status"] = "end";
		jsnReqQueueREOnline[0]["error"] = "true";
		jsnReqQueueREOnline[0]["msg"] = e.response.statusText;
		jsnReqQueueREOnline[0]["errorcode"] =e.response.statusCode;
		jsnReqQueueREOnline[0]["errorfunction"] = "onlineerrorfunSectionEstimate";
		objREstimateOnline.checkAllLoadComplete();
	},
	
	onlinefunSection: function(){
		try{
			busyDialog.open();
			jsnReqQueueREOnline[0]["status"] = "start";
			glblJsonDDLREEntry.section.length = 0;
			var urlToCall = serviceUrl15_old + "/Repair_F4_Section";
		    objUtilREstimate.doOnlineRequest(urlToCall,objREstimateOnline.onlinesuccessfunSection, objREstimateOnline.onlineerrorfunSection);
		}catch(e){
			jsnReqQueueREOnline[0]["status"] = "end";
			jsnReqQueueREOnline[0]["error"] = "true";
			jsnReqQueueREOnline[0]["msg"] = e;
			jsnReqQueueREOnline[0]["errorcode"] ="0";
			jsnReqQueueREOnline[0]["errorfunction"] = "onlinefunSectionEstimate";
			objREstimateOnline.checkAllLoadComplete();
		}
	},
	
	//DAMAGE CODE ONLINE
	onlinesuccessfunDamageCode: function(resultdata, response){
		var msg ='';
		jsnReqQueueREOnline[1]["status"] = "end";
		
		if(resultdata != undefined){
			for(var i =0; i < resultdata.results.length; i++){
				glblJsonDDLREEntry.damagecode.push({"text": resultdata.results[i].Kurztext, "key":resultdata.results[i].Param2 })
			}
		}
		objREstimateOnline.checkAllLoadComplete();
		//sap.ui.commons.MessageBox.alert(msg);
	},
	
	onlineerrorfunDamageCode: function(e){
		jsnReqQueueREOnline[1]["status"] = "end";
		jsnReqQueueREOnline[1]["error"] = "true";
		jsnReqQueueREOnline[1]["msg"] = e.response.statusText;
		jsnReqQueueREOnline[1]["errorcode"] =e.response.statusCode;
		jsnReqQueueREOnline[1]["errorfunction"] = "onlineerrorfunDamageCode";
		objREstimateOnline.checkAllLoadComplete();
	},
	
	onlinefunDamageCode: function(){
		try{
			busyDialog.open();
			jsnReqQueueREOnline[1]["status"] = "start";
			glblJsonDDLREEntry.damagecode.length = 0;
			var urlToCall = serviceUrl15_old + "/Repair_F4_Damgcode";
		    objUtilREstimate.doOnlineRequest(urlToCall,objREstimateOnline.onlinesuccessfunDamageCode, objREstimateOnline.onlineerrorfunDamageCode);
		}catch(e){
			jsnReqQueueREOnline[1]["status"] = "end";
			jsnReqQueueREOnline[1]["error"] = "true";
			jsnReqQueueREOnline[1]["msg"] = e;
			jsnReqQueueREOnline[1]["errorcode"] ="0";
			jsnReqQueueREOnline[1]["errorfunction"] = "onlinefunDamageCode";
			objREstimateOnline.checkAllLoadComplete();
		}
	},
	
	
	onlinefunDamageCodeNew: function(){
		glblJsonDDLREEntry.damagecode.length = 0;
		for(var i =0; i < damageCodes.length; i++){
			glblJsonDDLREEntry.damagecode.push({
				"text": damageCodes[i].damage, 
				"key":damageCodes[i].damKey 
				});
		}
	},
	
	//RESPONSIBILITY ONLINE
	onlinesuccessfunResponsibility: function(resultdata, response){
		var msg ='';
		jsnReqQueueREOnline[2]["status"] = "end";
		if(resultdata != undefined){
			for(var i =0; i < resultdata.results.length; i++){
				glblJsonDDLREEntry.responsibility.push({"text": resultdata.results[i].Description, "key":resultdata.results[i].Param2 });
			}
		}else{
			msg = "No result found.";
		}
		objREstimateOnline.checkAllLoadComplete();
		//sap.ui.commons.MessageBox.alert(msg);
	},
	
	onlineerrorfunResponsibility: function(e){
		jsnReqQueueREOnline[2]["status"] = "end";
		jsnReqQueueREOnline[2]["error"] = "true";
		jsnReqQueueREOnline[2]["msg"] = e.response.statusText;
		jsnReqQueueREOnline[2]["errorcode"] =e.response.statusCode;
		jsnReqQueueREOnline[2]["errorfunction"] = "onlineerrorfunResponsibility";
		objREstimateOnline.checkAllLoadComplete();
	},
	
	onlinefunResponsibility: function(){
		try{
			busyDialog.open();
			jsnReqQueueREOnline[2]["status"] = "start";
			glblJsonDDLREEntry.responsibility.length = 0;
			var urlToCall = serviceUrl15_old + "/Repair_F4_Respnsibility";
		    objUtilREstimate.doOnlineRequest(urlToCall,objREstimateOnline.onlinesuccessfunResponsibility, objREstimateOnline.onlineerrorfunResponsibility);
		}catch(e){
			jsnReqQueueREOnline[2]["status"] = "end";
			jsnReqQueueREOnline[2]["error"] = "true";
			jsnReqQueueREOnline[2]["msg"] = e;
			jsnReqQueueREOnline[2]["errorcode"] ="0";
			jsnReqQueueREOnline[2]["errorfunction"] = "onlinefunResponsibility";
			objREstimateOnline.checkAllLoadComplete();
		}
	},
	
	//MATERIAL ONLINE
	onlinesuccessfunMatrialCode: function(resultdata, response){
		var msg ='';
		jsnReqQueueREOnline[5]["status"] = "end";
		
		if(resultdata != undefined){
			for(var i =0; i < resultdata.results.length; i++){
				glblJsonDDLREEntry.matrialcode.push({"text": resultdata.results[i].Desc, "key":resultdata.results[i].Code });
			}
		}else{
			msg = "No result found.";
		}
		objREstimateOnline.checkAllLoadComplete();
		//sap.ui.commons.MessageBox.alert(msg);
	},
	
	onlineerrorfunMatrialCode: function(e){
		jsnReqQueueREOnline[5]["status"] = "end";
		jsnReqQueueREOnline[5]["error"] = "true";
		jsnReqQueueREOnline[5]["msg"] = e.response.statusText;
		jsnReqQueueREOnline[5]["errorcode"] =e.response.statusCode;
		jsnReqQueueREOnline[5]["errorfunction"] = "onlineerrorfunMatrialCode";
		objREstimateOnline.checkAllLoadComplete();
	},
	
	onlinefunMatrialCode: function(){
		try{
			busyDialog.open();
			jsnReqQueueREOnline[5]["status"] = "start";
			glblJsonDDLREEntry.matrialcode.length = 0;
			var urlToCall = serviceUrl15_old + "/REP_ESTIM_F4_MATERIALCODE";
		    objUtilREstimate.doOnlineRequest(urlToCall,objREstimateOnline.onlinesuccessfunMatrialCode, objREstimateOnline.onlineerrorfunMatrialCode);
		}catch(e){
			jsnReqQueueREOnline[5]["status"] = "end";
			jsnReqQueueREOnline[5]["error"] = "true";
			jsnReqQueueREOnline[5]["msg"] = e;
			jsnReqQueueREOnline[5]["errorcode"] ="0";
			jsnReqQueueREOnline[5]["errorfunction"] = "onlinefunMatrialCode";
			objREstimateOnline.checkAllLoadComplete();
		}
	},
	
	//SELECT ESTIMATE ONLINE GET HEADER
	onlinesuccessfunEstimateHdr: function(resultdata, response){
		jsnReqQueueREOnline[3]["status"] = "end";
		
		if(resultdata != undefined){
			if(resultdata.results.length > 0){
				hdrJsnDataREEntry = resultdata.results.constructor();
				for (var attr in resultdata.results) {
					if (resultdata.results.hasOwnProperty(attr)) hdrJsnDataREEntry[attr] = resultdata.results[attr];
				}
				selDeotIdREEntry = resultdata.results[0].Depot;
				fixedLabourRate = resultdata.results[0].Labrate;
				//sap.ui.getCore().byId("idlblEstmtHdrREEntry").setText("Estimate For " + resultdata.results[0].SerialNumber + " at " + selDeotIdREEntry);
			}else{
				//msg = "No result found.";
			}
		}else{
			//msg = "No result found.";
		}
		objREstimateOnline.checkAllLoadComplete();
	},
	
	onlineerrorfunEstimateHdr: function(e){
		jsnReqQueueREOnline[3]["status"] = "end";
		jsnReqQueueREOnline[3]["error"] = "true";
		jsnReqQueueREOnline[3]["msg"] = e.response.statusText;
		jsnReqQueueREOnline[3]["errorcode"] =e.response.statusCode;
		jsnReqQueueREOnline[3]["errorfunction"] = "onlineerrorfunEstimateHdr";
		objREstimateOnline.checkAllLoadComplete();
	},
	
	onlinefunEstimateHdr: function(unitNo, DepoId, DepoText){
		try{
			busyDialog.open();
			hdrJsnDataREEntry.length = 0;
			jsnReqQueueREOnline[3]["status"] = "start";
			var urlToCall = serviceUrl15_old + "/Load_Estimates_Header?$filter=";
			urlToCall += "SerialNumber eq '"+ unitNo +"' and ";
			urlToCall += "Depot eq '"+ DepoId +"' and ";
			urlToCall += "FunctionalLoc eq '" + DepoText + "' and ";
			urlToCall += "Param1 eq '"+ selEstmtId +"'";
			urlToCall += "and UserId eq '"+ objLoginUser.getLoggedInUserName() +"'";

		    objUtilREstimate.doOnlineRequest(urlToCall,objREstimateOnline.onlinesuccessfunEstimateHdr, objREstimateOnline.onlineerrorfunEstimateHdr);
		}catch(e){
			jsnReqQueueREOnline[3]["status"] = "end";
			jsnReqQueueREOnline[3]["error"] = "true";
			jsnReqQueueREOnline[3]["msg"] = e;
			jsnReqQueueREOnline[3]["errorcode"] ="0";
			jsnReqQueueREOnline[3]["errorfunction"] = "onlinefunEstimateHdr";
			objREstimateOnline.checkAllLoadComplete();
		}
	},
	
	//SELECT ESTIMATE ONLINE GET LINE ITEM
	onlinesuccessfunEstmtLineItem: function(resultdata, response){
		jsnReqQueueREOnline[4]["status"] = "end";
		jsnLineItemREEntry.length = 0;
		objREstimateOnline.checkAllLoadComplete();
		function padZero(num, size) {
		    var s = num+"";
		    while (s.length < size) s = "0" + s;
		    return s;
		};
		if(resultdata != undefined){
			$.each(resultdata.results,function(i,el){
				if(el.Message == ''){
					jsnLineItemREEntry.push({
							"checked":false,
							"LineItem":el.LineItem, //padZero(el.LineItem,5),
							"sectionKey":"section Key",
							"sectionText":"section Text",
							"LocationKey":el.LocationCode,
							"LocationText":el.LocationCode,
							"ComponentKey":el.ComponentCode,
							"ComponentText":el.ComponentCode,
							"DamageKey":el.DamageCode,
							"DamageText":el.DamageCode,
							"RepairKey":el.RepairCode,
							"RepairText":el.RepairCode,
							"MaterialKey":el.MaterialCode,
							"MaterialText":el.MaterialCode,
							"MaterialCost":el.MaterialCost,
							"ManHours":el.ManHours,
							"RepairLength":el.RepairLength,
							"RepairWidth":el.RepairWidth,
							"Quantity":el.Quantity,
							responsibility:[],
							"ResponsibilityKey":el.Responsibility,
							"ResponsibilityText":el.Responsibility,
							"LabourRate":el.LabourRate,
							"TechBulletin":el.BulletinNumber,
							"DataInserted":true,
						});
					}
				});
//				if(jsnLineItemREEntry.length < 6){
//					sap.ui.getCore().byId("idTblLineItemREEntry").setNavigationMode(sap.ui.table.NavigationMode.None);
//				}else{
//					sap.ui.getCore().byId("idTblLineItemREEntry").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
//				}
				objREstimateOnline.setResponsibilityLineItem();
				oMdlLineItemREEntry.updateBindings(); //UPDATE LINE ITEM
		}else{
			//msg = "No result found.";
		}
	},
	
	onlineerrorfunEstmtLineItem: function(e){
		jsnReqQueueREOnline[4]["status"] = "end";
		jsnReqQueueREOnline[4]["error"] = "true";
		jsnReqQueueREOnline[4]["msg"] = e.response.statusText;
		jsnReqQueueREOnline[4]["errorcode"] =e.response.statusCode;
		jsnReqQueueREOnline[4]["errorfunction"] = "onlineerrorfunEstmtLineItem";
		objREstimateOnline.checkAllLoadComplete();
	},
	
	onlinefunEstmtLineItem: function(){
		try{
			busyDialog.open();
			jsnLineItemREEntry.length = 0;
			
			jsnReqQueueREOnline[4]["status"] = "start";
			var urlToCall = serviceUrl15_old + "/Load_Estimates_Item?$filter=";
			urlToCall += "EstimateId eq '"+ selEstmtId +"'";
			
		    objUtilREstimate.doOnlineRequest(urlToCall,objREstimateOnline.onlinesuccessfunEstmtLineItem, objREstimateOnline.onlineerrorfunEstmtLineItem);
		}catch(e){
			jsnReqQueueREOnline[4]["status"] = "end";
			jsnReqQueueREOnline[4]["error"] = "true";
			jsnReqQueueREOnline[4]["msg"] = e;
			jsnReqQueueREOnline[4]["errorcode"] ="0";
			jsnReqQueueREOnline[4]["errorfunction"] = "onlinefunEstmtLineItem";
			objREstimateOnline.checkAllLoadComplete();
		}
	},
	
	setEstimateValues: function(){
		//hdrJsnDataREEntry
		if(hdrJsnDataREEntry.length > 0){
			sap.ui.getCore().byId("idDdlUnitPCodeREEntry").setSelectedKey(hdrJsnDataREEntry[0].UnitPartcode);
			sap.ui.getCore().byId("idDdlJobTypeREEntry").setSelectedKey(hdrJsnDataREEntry[0].EstimateType);
			sap.ui.getCore().byId("idDdlSaleGradeREEntry").setSelectedKey(hdrJsnDataREEntry[0].SaleGrade);
			var cnvrtdt = hdrJsnDataREEntry[0].EstimateDt;
			var datenw = cnvrtdt.split('(')[1].split(')')[0];
			cnvrtdt=  new Date(parseInt(datenw)).format("dd-mm-yyyy");
					
			sap.ui.getCore().byId("idDtPkrEstimateDtREEntry").setValue(cnvrtdt);
			sap.ui.getCore().byId("idTFLeaseAuthAmtREEntry").setValue(hdrJsnDataREEntry[0].LesseAmt);
			sap.ui.getCore().byId("idTFCurrnCodeREEntry").setValue(hdrJsnDataREEntry[0].CurrencyCode);
		}
		oMdlLineItemREEntry.updateBindings(); //UPDATE LINE ITEM
	},
	
	checkAllLoadComplete: function(){
		var arrayval = jsnReqQueueREOnline.filter(function(el){
			return el.status == "start";
		});
		if(arrayval.length == 0){
				busyDialog.close();
				var msgToDisplay = "The following information could not be retreived:", errortrue = "false";
				for(var inx in jsnReqQueueREOnline){
					if(jsnReqQueueREOnline[inx].error == "true"){
						errortrue = "true";
						msgToDisplay += "\n" + jsnReqQueueREOnline[inx].task;
					}
				}
				if(errortrue == "true"){
					//sap.ui.commons.MessageBox.alert(msgToDisplay);
				}else{
					//sap.ui.commons.MessageBox.alert("Success");
				}
				this.bindAllDropDown();
				if(selEstmtId != '')
					this.setEstimateValues();
		}
	},
	
	bindAllDropDown: function(){
//		//SECTION
//		var oidDdlSectionREEntry = sap.ui.getCore().byId("idDdlSectionREEntry");
//		oidDdlSectionREEntry.setModel(oMdlGlblDDLREEntry);
//		oidDdlSectionREEntry.bindItems("/section", oItmTmpltGlblDDLREEntry);
//		oidDdlSectionREEntry.insertItem(new sap.ui.core.ListItem({text:"",key:""}),0);
//		//DAMAGE CODE
//		var oidDdlDamageREEntry = sap.ui.getCore().byId("idDdlDamageREEntry");
//		oidDdlDamageREEntry.setModel(oMdlGlblDDLREEntry);
//		oidDdlDamageREEntry.bindItems("/damagecode", oItmTmpltGlblDDLREEntry);
//		oidDdlDamageREEntry.insertItem(new sap.ui.core.ListItem({text:"",key:""}),0);
//		
//		//RESPONSIBILITY
//		var oidDdlResponsibilityREEntry = sap.ui.getCore().byId("idDdlResponsibilityREEntry");
//		oidDdlResponsibilityREEntry.setModel(oMdlGlblDDLREEntry);
//		oidDdlResponsibilityREEntry.bindItems("/responsibility", oItmTmpltGlblDDLREEntry);
//		oidDdlResponsibilityREEntry.insertItem(new sap.ui.core.ListItem({text:"",key:""}),0);
//		
//		//MATRIAL CODE
//		var oidDdlMaterialCodeREEntry = sap.ui.getCore().byId("idDdlMaterialCodeREEntry");
//		oidDdlMaterialCodeREEntry.setModel(oMdlGlblDDLREEntry);
//		oidDdlMaterialCodeREEntry.bindItems("/matrialcode", oItmTmpltGlblDDLREEntry);
//		oidDdlMaterialCodeREEntry.insertItem(new sap.ui.core.ListItem({text:"",key:""}),0);
//		objREstimateOnline.setResponsibilityLineItem();
	},
	
	/* Begin of adding by Seyed Ismail on 28.05.2015 MAC28052015+*/
	setResponsibilityLineItem: function(){
//		var dataReponsibleREEntry = oMdlGlblDDLREEntry.getData().responsibility;
//			for(var i=0; i < jsnLineItemREEntry.length; i++){
//				jsnLineItemREEntry[i].responsibility.length = 0;
//				jsnLineItemREEntry[i].responsibility.push({"text":"","key":""});
//				for(var j=0; j < 4; j++){
//					jsnLineItemREEntry[i].responsibility.push({"text":dataReponsibleREEntry[j].text,"key":dataReponsibleREEntry[j].key});
//				}
//			}
//			oMdlLineItemREEntry.updateBindings();
	},
	/* End of adding by Seyed Ismail on 28.05.2015 MAC28052015+*/
	setResponsibilityLineItemJS: function(){  // Changed from setResponsibilityLineItem to setResponsibilityLineItemJS MAC28052015+
//		var dataReponsibleREEntry = oMdlGlblDDLREEntry.getData().responsibility;
//			for(var i=0; i < jsnLineItemREEntry.length; i++){
//				jsnLineItemREEntry[i].responsibility.length = 0;
//				jsnLineItemREEntry[i].responsibility.push({"text":"","key":""});
//				for(var inx in dataReponsibleREEntry){
//					jsnLineItemREEntry[i].responsibility.push({"text":dataReponsibleREEntry[inx].text,"key":dataReponsibleREEntry[inx].key});
//				}
//			}
//			oMdlLineItemREEntry.updateBindings();
	},
	//SAVE ONLINE
	onlinesuccessfunEstimateSave: function(resultdata, response){
		try{
			if(resultdata != undefined){
				if(resultdata.results.length > 0){
					var arrayval = saveLineItemREEntry.filter(function(el){
						return ((el["savestatus"] != true) && (el["DataInserted"] != false));
					});
					selEstmtId = resultdata.results[0].LvEstimateId
					if((arrayval.length > 0) && (resultdata.results[0].LvItem == "Item table updated.")){
						objREstimateOnline.onlinefunEstimateSave(selEstmtId,'');
					}
					if((arrayval.length == 0)&& (clickEvent == "save")){
						busyDialog.close();
						sap.ui.getCore().byId("idlblSuccessMsgREE").setVisible(true);
						sap.ui.getCore().byId("idlblSuccessMsgREE").setText("The estimate was saved successfully.");
						//sap.ui.commons.MessageBox.alert("The estimate was saved successfully.");
						//sap.ui.commons.MessageBox.alert(resultdata.results[0].LvHeader + '\n' + resultdata.results[0].LvItem);
					}else if((arrayval.length == 0)&& (clickEvent == "submit")){
						objREstimateOnline.onlinefunEstimateSubmit(selEstmtId);
					}
				}else{
					busyDialog.close();
					sap.ui.commons.MessageBox.alert("Error while saving estimate.\nPlease contact the system admin or try again later.");//msg = "No result found.";
				}
			}else{
				busyDialog.close();
				sap.ui.commons.MessageBox.alert("Error while saving estimate.\nPlease contact the system admin or try again later.");//msg = "No result found.";
			}
		}catch(e)
		{
			busyDialog.close();
			sap.ui.commons.MessageBox.alert("Error occured while saving estimate.\nPlease contact the system admin or try again later.");
		}
	},
	
	onlineerrorfunEstimateSave: function(err){
		errorfromServer(err);
	},
	
	onlinefunEstimateSave: function(estimateId,flag){
		try{
			sap.ui.getCore().byId("idlblSuccessMsgREE").setText("");
			sap.ui.getCore().byId("idlblSuccessMsgREE").setVisible(false);
			if(sap.ui.getCore().byId("idFrmElmntErrREEntry") != undefined){
				sap.ui.getCore().byId("idFrmElmntErrREEntry").destroyFields();
				sap.ui.getCore().byId("idFrmElmntErrREEntry").destroy();
			}
			if(sap.ui.getCore().byId("idFrmElmntInfoLstREEntry") != undefined){
				sap.ui.getCore().byId("idFrmElmntInfoLstREEntry").destroyFields();
				sap.ui.getCore().byId("idFrmElmntInfoLstREEntry").destroy();
			}
						
			busyDialog.open();
			var urlToCall = serviceUrl15_old + "/Repair_Estimates_Save?$filter=";
			//SET HEADER ITEM VALUE
			var oidDdlUnitPCodeREEntry = sap.ui.getCore().byId("idDdlUnitPCodeREEntry");
			var oidDdlJobTypeREEntry = sap.ui.getCore().byId("idDdlJobTypeREEntry");
			var oidDdlSaleGradeREEntry = sap.ui.getCore().byId("idDdlSaleGradeREEntry");
			var oidDtPkrEstimateDtREEntry = sap.ui.getCore().byId("idDtPkrEstimateDtREEntry");
			var oidTFLeaseAuthAmtREEntry = sap.ui.getCore().byId("idTFLeaseAuthAmtREEntry");
			var oidTFCurrnCodeREEntry = sap.ui.getCore().byId("idTFCurrnCodeREEntry");
			
			var dtEstmt = oidDtPkrEstimateDtREEntry.getValue().split('-');
			dtEstmt = dtEstmt[2]+'-'+dtEstmt[1]+'-'+dtEstmt[0]+'T00:00:00';
			var datenowRE = new Date()
			var timenowRE = 'PT'+padZero(datenowRE.getHours(),2)+'H'+padZero(datenowRE.getMinutes(),2)+'M'+padZero(datenowRE.getSeconds(),2)+'S';// new Date().getTime();
			datenowRE = datenowRE.format("yyyy-mm-dd") +'T00:00:00';
			
			urlToCall += "UserId eq '" + objLoginUser.getLoggedInUserName() + "' and ";
			urlToCall += "EstimateId eq '"+ estimateId +"' and ";
			urlToCall += "EstimateType eq '" + oidDdlJobTypeREEntry.getSelectedKey() + "' and ";
			urlToCall += "SerialNumber eq '"+ unitNo +"' and ";
			urlToCall += "CreatedDt eq datetime'"+ datenowRE +"' and ";
			urlToCall += "CreatedTime eq time'"+ timenowRE +"' and ";
			urlToCall += "UnitPartcode eq '"+ oidDdlUnitPCodeREEntry.getSelectedKey() +"' and ";
			urlToCall += "JobType eq '"+ oidDdlJobTypeREEntry.getSelectedKey() +"' and ";
			urlToCall += "SaleGrade eq '"+ oidDdlSaleGradeREEntry.getSelectedKey() +"' and ";
			urlToCall += "EstimateDt eq datetime'"+ dtEstmt +"' and ";
			urlToCall += "LesseAmt eq '"+ oidTFLeaseAuthAmtREEntry.getValue() +"' and ";
			urlToCall += "CurrencyCode eq '"+ oidTFCurrnCodeREEntry.getValue() +"' and ";
			urlToCall += "LabRate eq "+ fixedLabourRate +"m and ";
			urlToCall += "Para3 eq '"+ selDeotIdREEntry +"' and ";
			urlToCall += "Para1 eq '"+ flag +"'";
			
			//LINE ITEM FOR SAVE
			var cunt = 0;
			var arrField = ["IRepa1", "IRepa2","IRepa3","IRepa4","IRepa5","IRepa6","IRepa7","IRepa8","IRepa9","IRepa10","IRepa11","IRepa12"]
			for(var inx=0;inx < saveLineItemREEntry.length; inx++){
				if(saveLineItemREEntry[inx].savestatus == false){
					if(cunt < 12){
						var valToPass = '';
						saveLineItemREEntry[inx].savestatus = true;
						valToPass += saveLineItemREEntry[inx].LineItem + '$';
						valToPass += saveLineItemREEntry[inx].LocationKey + '$';
						valToPass += saveLineItemREEntry[inx].ComponentKey + '$';
						valToPass += saveLineItemREEntry[inx].DamageKey + '$';
						valToPass += saveLineItemREEntry[inx].MaterialKey + '$';
						valToPass += saveLineItemREEntry[inx].RepairKey + '$';
						valToPass += saveLineItemREEntry[inx].RepairLength + '$';
						valToPass += saveLineItemREEntry[inx].RepairWidth + '$';
						valToPass += '' + '$';
						valToPass += saveLineItemREEntry[inx].Quantity + '$';
						valToPass += saveLineItemREEntry[inx].ManHours + '$';
						valToPass += saveLineItemREEntry[inx].MaterialCost + '$';
						valToPass += saveLineItemREEntry[inx].ResponsibilityKey + '$';
						valToPass += saveLineItemREEntry[inx].LabourRate + '$';
						valToPass += saveLineItemREEntry[inx].TechBulletin + '$';
						valToPass += '';
						urlToCall += " and " + arrField[cunt] + " eq '"+ valToPass +"'";
						cunt++;
					}
				}
			}
			objUtilREstimate.doOnlineRequest(urlToCall,objREstimateOnline.onlinesuccessfunEstimateSave, objREstimateOnline.onlineerrorfunEstimateSave);
		}catch(e){
			busyDialog.close();
			sap.ui.commons.MessageBox.alert("Error occured while saving estimate.\nPlease contact the system admin or try again later.");
		}
	},
	//SAVE JOINT SURVEY CASE
	onlinesuccessRJSEstimateSave: function(resultdata, response){
		try{
		if(resultdata != undefined){
			if(resultdata.results.length > 0){
				var arrayval = saveLineItemRJSREEntry.filter(function(el){
					return ((el["savestatus"] != true) && (el["DataInserted"] != false));
				});
				estmtIdRJS = resultdata.results[0].LvEstimateId
				if((arrayval.length > 0) && (resultdata.results[0].LvItem == "Item table updated.")){
					objREstimateOnline.onlineRJSEstimateSave(estmtIdRJS, '');
				}
				if((arrayval.length == 0)&& (clickEvent == "save")){
					busyDialog.close();
					sap.ui.getCore().byId("idlblSuccessMsgJSREE").setVisible(true);
					sap.ui.getCore().byId("idlblSuccessMsgJSREE").setText("The estimate was saved successfully.");
					
					//sap.ui.commons.MessageBox.alert("The estimate was saved successfully.");
					//sap.ui.commons.MessageBox.alert(resultdata.results[0].LvHeader + '\n' + resultdata.results[0].LvItem);
				}else if((arrayval.length == 0)&& (clickEvent == "submit")){
					objREstimateOnline.onlineRJSSubmit(estmtIdRJS);
				}
			}else{
				busyDialog.close();
				sap.ui.commons.MessageBox.alert("Error occured while saving estimate.\nPlease contact the system admin or try again later.");//msg = "No result found.";
			}
		}else{
			busyDialog.close();
			sap.ui.commons.MessageBox.alert("Error occured while saving estimate.\nPlease contact the system admin or try again later.");//msg = "No result found.";
		}
		}catch(e){
			busyDialog.close();
			sap.ui.commons.MessageBox.alert("Error occured while saving estimate.\nPlease contact the system admin or try again later.");
		}
	},
	
	onlineerrorRJSEstimateSave: function(err){
		errorfromServer(err);
	},
	
	onlineRJSEstimateSave: function(estmtIdRJS,flag){
		try{
		
		sap.ui.getCore().byId("idlblSuccessMsgJSREE").setVisible(false);
		sap.ui.getCore().byId("idlblSuccessMsgJSREE").setText("");
		if(sap.ui.getCore().byId("idFrmElmntErrRJSREEntry") != undefined){
			sap.ui.getCore().byId("idFrmElmntErrRJSREEntry").destroyFields();
			sap.ui.getCore().byId("idFrmElmntErrRJSREEntry").destroy();
		}
		if(sap.ui.getCore().byId("idFrmElmntInfoLstRJSREEntry") != undefined){
			sap.ui.getCore().byId("idFrmElmntInfoLstRJSREEntry").destroyFields();
			sap.ui.getCore().byId("idFrmElmntInfoLstRJSREEntry").destroy();
		}
						
			busyDialog.open();
			var urlToCall = serviceUrl15_old + "/Repair_Estimates_Save?$filter=";
			//SET HEADER ITEM VALUE
			var oidDdlUnitPCodeRJSREEntry = sap.ui.getCore().byId("idDdlUnitPCodeRJSREEntry");
			var oidDdlJobTypeRJSREEntry = sap.ui.getCore().byId("idDdlJobTypeRJSREEntry");
			var oidDdlSaleGradeRJSREEntry = sap.ui.getCore().byId("idDdlSaleGradeRJSREEntry");
			var oidDtPkrEstimateDtRJSREEntry = sap.ui.getCore().byId("idDtPkrEstimateDtRJSREEntry");
			var oidTFLeaseAuthAmtRJSREEntry = sap.ui.getCore().byId("idTFLeaseAuthAmtRJSREEntry");
			var oidTFCurrnCodeRJSREEntry = sap.ui.getCore().byId("idTFCurrnCodeRJSREEntry");
			
			var dtEstmt = oidDtPkrEstimateDtRJSREEntry.getValue().split('-');
			dtEstmt = dtEstmt[2]+'-'+dtEstmt[1]+'-'+dtEstmt[0]+'T00:00:00';
			var datenowRE = new Date()
			var timenowRE = 'PT'+padZero(datenowRE.getHours(),2)+'H'+padZero(datenowRE.getMinutes(),2)+'M'+padZero(datenowRE.getSeconds(),2)+'S';// new Date().getTime();
			datenowRE = datenowRE.format("yyyy-mm-dd") +'T00:00:00';
			
			urlToCall += "UserId eq '" + objLoginUser.getLoggedInUserName() + "' and ";
			urlToCall += "EstimateId eq '"+ estmtIdRJS +"' and ";
			urlToCall += "EstimateType eq '" + oidDdlJobTypeRJSREEntry.getSelectedKey() + "' and ";
			urlToCall += "SerialNumber eq '"+ unitNo +"' and ";
			urlToCall += "CreatedDt eq datetime'"+ datenowRE +"' and ";
			urlToCall += "CreatedTime eq time'"+ timenowRE +"' and ";
			urlToCall += "UnitPartcode eq '"+ oidDdlUnitPCodeRJSREEntry.getSelectedKey() +"' and ";
			urlToCall += "JobType eq '"+ oidDdlJobTypeRJSREEntry.getSelectedKey() +"' and ";
			urlToCall += "SaleGrade eq '"+ oidDdlSaleGradeRJSREEntry.getSelectedKey() +"' and ";
			urlToCall += "EstimateDt eq datetime'"+ dtEstmt +"' and ";
			urlToCall += "LesseAmt eq '"+ oidTFLeaseAuthAmtRJSREEntry.getValue() +"' and ";
			urlToCall += "CurrencyCode eq '"+ oidTFCurrnCodeRJSREEntry.getValue() +"' and ";
			urlToCall += "LabRate eq "+ fixedLabourRate +"m and ";
			urlToCall += "Para3 eq '"+ selDeotIdREEntry +"' and "; 
			urlToCall += "Para1 eq '"+ flag +"'";
			
			//LINE ITEM FOR SAVE
			var cunt = 0;
			var arrField = ["IRepa1", "IRepa2","IRepa3","IRepa4","IRepa5","IRepa6","IRepa7","IRepa8","IRepa9","IRepa10","IRepa11","IRepa12"]
			for(var inx=0;inx < saveLineItemRJSREEntry.length; inx++){
				if(saveLineItemRJSREEntry[inx].savestatus == false){
					if(cunt < 12){
						var valToPass = '';
						saveLineItemRJSREEntry[inx].savestatus = true;
						valToPass += saveLineItemRJSREEntry[inx].LineItem + '$';
						valToPass += saveLineItemRJSREEntry[inx].LocationKey + '$';
						valToPass += saveLineItemRJSREEntry[inx].ComponentKey + '$';
						valToPass += saveLineItemRJSREEntry[inx].DamageKey + '$';
						valToPass += saveLineItemRJSREEntry[inx].MaterialKey + '$';
						valToPass += saveLineItemRJSREEntry[inx].RepairKey + '$';
						valToPass += saveLineItemRJSREEntry[inx].RepairLength + '$';
						valToPass += saveLineItemRJSREEntry[inx].RepairWidth + '$';
						valToPass += '' + '$';
						valToPass += saveLineItemRJSREEntry[inx].Quantity + '$';
						valToPass += saveLineItemRJSREEntry[inx].ManHours + '$';
						valToPass += saveLineItemRJSREEntry[inx].MaterialCost + '$';
						valToPass += saveLineItemRJSREEntry[inx].ResponsibilityKey + '$';
						valToPass += saveLineItemRJSREEntry[inx].LabourRate + '$';
						valToPass += saveLineItemRJSREEntry[inx].TechBulletin;
						urlToCall += " and " + arrField[cunt] + " eq '"+ valToPass +"'";
						cunt++;
					}
				}
			}
			objUtilREstimate.doOnlineRequest(urlToCall,objREstimateOnline.onlinesuccessRJSEstimateSave, objREstimateOnline.onlineerrorRJSEstimateSave);
		}catch(e){
			busyDialog.close();
			sap.ui.commons.MessageBox.alert("Error occured while processing.\nPlease contact the system admin or try again later.");
		}
	},
	
	//Submit ONLINE
	onlinesuccessfunEstimateSubmit: function(resultdata, response){
		//busyDialog.close();
		var jsnErrorREEntry = [];
		var jsnSuccessREEntry = [];
		selEstmtId = '';

		try{		
			if(resultdata != undefined){
				if(resultdata.results.length > 0){
					//BELOW CONDITION FOR RESUBMIT SAME DATA WITHOT NOTIFY TO USER
					if((resultdata.results.length == 1) && (resultdata.results[0].Type == "X")){
						new RepairEstimateEntry().saveRepairEstimateFromExcel();
						return;
					}
					
					busyDialog.close();
					for(var indx in resultdata.results){
						if(resultdata.results[indx].Type == "D"){
							var msgstr = resultdata.results[indx].Message.substr(resultdata.results[indx].Message.indexOf(':')+1,resultdata.results[indx].Message.length);
							jsnSuccessREEntry.push({
							"Equipment":resultdata.results[indx].Equipment,
							"Status":resultdata.results[indx].Status,
							"Type":resultdata.results[indx].Type,
							"Message":msgstr,
							"SerialNo":resultdata.results[indx].SerialNo,
							"FunctionalLoc":resultdata.results[indx].FunctionalLoc,
							"Depot":resultdata.results[indx].Depot,
							"UnitPartCode":resultdata.results[indx].UnitPartCode,
							"JobType":resultdata.results[indx].JobType,
							"SaleGrade":resultdata.results[indx].SaleGrade,
							"EstimateDate":resultdata.results[indx].EstimateDate,
							"LesseeAuthAmt":resultdata.results[indx].LesseeAuthAmt,
							"Conditioncode":resultdata.results[indx].Conditioncode,
							"Currencycode":resultdata.results[indx].Currencycode,
							"EstimId":resultdata.results[indx].EstimId,
							"Param1":resultdata.results[indx].Param1,
							"Param2":resultdata.results[indx].Param2,
							"Param3":resultdata.results[indx].Param3,
							"Param4":resultdata.results[indx].Param4,
							"IconSrc": "images/server_response.png"
							});
						}else if((resultdata.results[indx].Type == "E") || (resultdata.results[indx].Type == "S")){
							var msgstr = resultdata.results[indx].Message.substr(resultdata.results[indx].Message.indexOf(':')+1,resultdata.results[indx].Message.length);
							jsnErrorREEntry.push({
							"Equipment":resultdata.results[indx].Equipment,
							"Status":resultdata.results[indx].Status,
							"Type":resultdata.results[indx].Type,
							"Message":msgstr,
							"SerialNo":resultdata.results[indx].SerialNo,
							"FunctionalLoc":resultdata.results[indx].FunctionalLoc,
							"Depot":resultdata.results[indx].Depot,
							"UnitPartCode":resultdata.results[indx].UnitPartCode,
							"JobType":resultdata.results[indx].JobType,
							"SaleGrade":resultdata.results[indx].SaleGrade,
							"EstimateDate":resultdata.results[indx].EstimateDate,
							"LesseeAuthAmt":resultdata.results[indx].LesseeAuthAmt,
							"Conditioncode":resultdata.results[indx].Conditioncode,
							"Currencycode":resultdata.results[indx].Currencycode,
							"EstimId":resultdata.results[indx].EstimId,
							"Param1":resultdata.results[indx].Param1,
							"Param2":resultdata.results[indx].Param2,
							"Param3":resultdata.results[indx].Param3,
							"Param4":resultdata.results[indx].Param4
							});
						}
					}
					
					/*var oidFrmCntnrRsltREEntry = new sap.ui.layout.form.FormContainer("idFrmCntnrRsltREEntry", {
						formElements: []
					});
					var oFrmREEntry = sap.ui.getCore().byId("idFrmREEntry");
					oFrmREEntry.addFormContainer(oidFrmCntnrRsltREEntry);*/
					
					if(jsnSuccessREEntry.length > 0)
					{
						objREstimateOnline.createSuccessList(jsnSuccessREEntry);
					}
					
					if(jsnErrorREEntry.length > 0)
					{
						objREstimateOnline.createErrorTable(jsnErrorREEntry);
					}
				}else{
					busyDialog.close();
					sap.ui.commons.MessageBox.alert("No result found.\nPlease contact the system admin or try again later.");
				}
			}else{
				busyDialog.close();
				sap.ui.commons.MessageBox.alert("No result found.\nPlease contact the system admin or try again later.");
			}
		}catch(e){
			busyDialog.close();
			sap.ui.commons.MessageBox.alert("Error occured while processing.\nPlease contact the system admin or try again later.");
		}
	},
	
	onlineerrorfunEstimateSubmit: function(err){
		errorfromServer(err);
	},
	
	onlinefunEstimateSubmit: function(estimateId){
		try{
			var valid = true;
			/*if(sap.ui.getCore().byId("idFrmCntnrRsltREEntry") != undefined){
					sap.ui.getCore().byId("idFrmCntnrRsltREEntry").destroyFormElements();
					sap.ui.getCore().byId("idFrmCntnrRsltREEntry").destroy();
			}*/
			
			var idDdlUnitPCodeREEntry = sap.ui.getCore().byId("idDdlUnitPCodeREEntry");
			var idDtPkrEstimateDtREEntry = sap.ui.getCore().byId("idDtPkrEstimateDtREEntry");
			
			if(idDdlUnitPCodeREEntry.getValue() == ''){
				idDdlUnitPCodeREEntry.setPlaceholder("Required");
				idDdlUnitPCodeREEntry.setValueState(sap.ui.core.ValueState.Error);
				valid = false;
			}
			if(idDtPkrEstimateDtREEntry.getValue() == ''){
				idDtPkrEstimateDtREEntry.setPlaceholder("Required");
				idDtPkrEstimateDtREEntry.setValueState(sap.ui.core.ValueState.Error);
				valid = false;
			}
			if(!valid){
				return;
			}
			
			var dtEstmt = idDtPkrEstimateDtREEntry.getValue().split('-');
			dtEstmt = dtEstmt[2]+'-'+dtEstmt[1]+'-'+dtEstmt[0]+'T00:00:00';
			
			busyDialog.open();
			var urlToCall = serviceUrl15_old + "/Rep_Est_Sub?$filter=";
			urlToCall += "EstimId eq '"+ estimateId +"'";
			urlToCall += " and Currencycode eq '' and UnitPartCode eq '' and SerialNo eq '' and Depot eq '' and SaleGrade eq '' and LesseeAuthAmt eq '' and JobType eq '' and Param3 eq '0000000000' and Param2 eq datetime'9999-09-09T00:00:00' and Param1 eq '' and IRep9 eq '' and IRep8 eq '' and IRep7 eq '' and IRep6 eq '' and IRep5 eq '' and IRep4 eq '' and IRep3 eq '' and IRep2 eq '' and IRep10 eq '' and IRep1 eq '' and EstimateDate eq datetime'" + dtEstmt + "' and FunctionalLoc eq '' and Param4 eq time'PT00H00M00S'";
			
			//var urlToCall = serviceUrl15_old + "/Repair_Estimates_Submit?$filter=";
			//urlToCall += "EstimId eq '"+ estimateId +"'";
			//urlToCall += " and Currencycode eq '' and UnitPartCode eq '' and SerialNo eq '' and Depot eq '' and SaleGrade eq '' and LesseeAuthAmt eq '' and JobType eq '' and Param3 eq '0000000000' and Param2 eq datetime'9999-09-09T00:00:00' and Param1 eq '' and IRep9 eq '' and IRep8 eq '' and IRep7 eq '' and IRep6 eq '' and IRep5 eq '' and IRep4 eq '' and IRep3 eq '' and IRep2 eq '' and IRep10 eq '' and IRep1 eq '' and EstimateDate eq datetime'" + dtEstmt + "' and FunctionalLoc eq '' and Param4 eq time'PT00H00M00S'";
			objUtilREstimate.doOnlineRequest(urlToCall,objREstimateOnline.onlinesuccessfunEstimateSubmit, objREstimateOnline.onlineerrorfunEstimateSubmit);
		}catch(e){
			busyDialog.close();
			sap.ui.commons.MessageBox.alert("Error occured while processing.\nPlease contact the system admin or try again later.");
		}
	},
	
	createErrorTable: function(jsnData){
		var oidTblErrorREEntry = new sap.ui.table.Table("idErrorTableRep",
			{
				selectionMode : sap.ui.table.SelectionMode.None,
				navigationMode : sap.ui.table.NavigationMode.None,
				layoutData: new sap.ui.layout.GridData({span: "L8 M12 S12",linebreak: false, margin: false}),
			}).addStyleClass('tblBorder');
			
		oidTblErrorREEntry.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Error Type",
			}),
			template : new sap.ui.commons.TextView().bindProperty("text", "Type"),
			hAlign : "Center",
			resizable:false,
			width : "90px"
		}));
		
		oidTblErrorREEntry.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Message"
			}),
			template : new sap.ui.commons.TextView().bindProperty("text", "Message"),
			resizable:false,
			hAlign : "Center"
		}));
		
		var oMdlErrTblREEntry = new sap.ui.model.json.JSONModel();
		oMdlErrTblREEntry.setData({modelData : jsnData});
		oidTblErrorREEntry.setVisibleRowCount(jsnData.length);	
		oidTblErrorREEntry.setModel(oMdlErrTblREEntry);
		oidTblErrorREEntry.bindRows("/modelData");
		
		var oFrmCntnrREEntry = sap.ui.getCore().byId("idFrmCntnrREEntry");
		var frmFirsRowREEntry = new sap.ui.layout.form.FormElement("idFrmElmntErrREEntry",{
			fields: [oidTblErrorREEntry]
		});
		oFrmCntnrREEntry.addFormElement(frmFirsRowREEntry);
				
		/*var oFrmCntnrREEntry = sap.ui.getCore().byId("idFrmCntnrRsltREEntry");
		var frmElmntErrorTblREEntry = new sap.ui.layout.form.FormElement("idFrmElmtTblErrorREEntry",{
		    fields: [oidTblErrorREEntry]
		});
		oFrmCntnrREEntry.addFormElement(frmElmntErrorTblREEntry);*/
	},
	
	createSuccessList: function(jsnBindData){
		/* if(sap.ui.getCore().byId("idRowRptrSuccessCMDt") != undefined){
			sap.ui.getCore().byId("idRowRptrSuccessCMDt").destroy();
		} */
		var oRwRptrSuccesREEntry = new sap.ui.commons.RowRepeater("idRRRepairEstim", {
		}).addStyleClass("marginTop10");
		oRwRptrSuccesREEntry.setDesign("Transparent");
		oRwRptrSuccesREEntry.setNumberOfRows(jsnBindData.length);
		oRwRptrSuccesREEntry.setNoData(false);
		//create the template cntrlSuccessREEntry that will be repeated and will display the data
		var oRwTmpltSuccesREEntry = new sap.ui.commons.layout.MatrixLayout({
			widths : ['25px', '95%']
		});

		var  mtrxRwSuccessREEntry, mtrxCellSuccessREEntry, cntrlSuccessREEntry;
		// main matrix
		oRwTmpltSuccesREEntry.setWidth("70%");
		// main row
		mtrxRwSuccessREEntry = new sap.ui.commons.layout.MatrixLayoutRow();
		//image
		cntrlSuccessREEntry = new sap.ui.commons.Image();
		//cntrlSuccessREEntry.setHeight("60px");
		//cntrlSuccessREEntry.setWidth("50px");
		cntrlSuccessREEntry.bindProperty("src","IconSrc");
		
		mtrxCellSuccessREEntry = new sap.ui.commons.layout.MatrixLayoutCell();
		mtrxCellSuccessREEntry.addContent(cntrlSuccessREEntry);
		mtrxRwSuccessREEntry.addCell(mtrxCellSuccessREEntry);

		//label 1
		cntrlSuccessREEntry = new sap.ui.commons.Label();
		cntrlSuccessREEntry.bindProperty("text","Message");
		mtrxCellSuccessREEntry = new sap.ui.commons.layout.MatrixLayoutCell();
		mtrxCellSuccessREEntry.addContent(cntrlSuccessREEntry);
		mtrxRwSuccessREEntry.addCell(mtrxCellSuccessREEntry);

		// add row to matrix
		oRwTmpltSuccesREEntry.addRow(mtrxRwSuccessREEntry);
		
		var oMdlListSuccesREEntry = new sap.ui.model.json.JSONModel();
		oMdlListSuccesREEntry.setData(jsnBindData);
		oRwRptrSuccesREEntry.setModel(oMdlListSuccesREEntry);
		
		oRwRptrSuccesREEntry.bindRows("/", oRwTmpltSuccesREEntry);
		
		var oFrmCntnrREEntry = sap.ui.getCore().byId("idFrmCntnrREEntry");
		var frmFirsRowREEntry = new sap.ui.layout.form.FormElement("idFrmElmntInfoLstREEntry",{
			fields: [oRwRptrSuccesREEntry]
		});
		oFrmCntnrREEntry.addFormElement(frmFirsRowREEntry);
		
		/*var oFrmCntnrREEntry = sap.ui.getCore().byId("idFrmCntnrRsltREEntry");
		var frmElmntSuccesREEntry = new sap.ui.layout.form.FormElement("idFrmElmtSuccesREEntry",{
		    fields: [oRwRptrSuccesREEntry]
		});
		oFrmCntnrREEntry.addFormElement(frmElmntSuccesREEntry);*/
	},

	//SUBMIT FOR REFER JOINT SURVEY
	onlinesuccessRJSSubmit: function(resultdata, response){
		//busyDialog.close();
		var jsnErrorRJSREEntry = [];
		var jsnSuccessRJSREEntry = [];
		estmtIdRJS = '';
		try{
			if(resultdata != undefined){
				if(resultdata.results.length > 0){
					//BELOW CONDITION FOR RESUBMIT SAME DATA WITHOT NOTIFY TO USER
					if((resultdata.results.length == 1) && (resultdata.results[0].Type == "X")){
						new RepairEstimateEntryReferJS().saveNsubmitRJS();
						return;
					}
					
					busyDialog.close();
					for(var indx in resultdata.results){
						if(resultdata.results[indx].Type == "D"){
							var msgstr = resultdata.results[indx].Message.substr(resultdata.results[indx].Message.indexOf(':')+1,resultdata.results[indx].Message.length);
							jsnSuccessRJSREEntry.push({
							"Equipment":resultdata.results[indx].Equipment,
							"Status":resultdata.results[indx].Status,
							"Type":resultdata.results[indx].Type,
							"Message":msgstr,
							"SerialNo":resultdata.results[indx].SerialNo,
							"FunctionalLoc":resultdata.results[indx].FunctionalLoc,
							"Depot":resultdata.results[indx].Depot,
							"UnitPartCode":resultdata.results[indx].UnitPartCode,
							"JobType":resultdata.results[indx].JobType,
							"SaleGrade":resultdata.results[indx].SaleGrade,
							"EstimateDate":resultdata.results[indx].EstimateDate,
							"LesseeAuthAmt":resultdata.results[indx].LesseeAuthAmt,
							"Conditioncode":resultdata.results[indx].Conditioncode,
							"Currencycode":resultdata.results[indx].Currencycode,
							"EstimId":resultdata.results[indx].EstimId,
							"Param1":resultdata.results[indx].Param1,
							"Param2":resultdata.results[indx].Param2,
							"Param3":resultdata.results[indx].Param3,
							"Param4":resultdata.results[indx].Param4,
							"IconSrc": "images/server_response.png"
							});
						}else if((resultdata.results[indx].Type == "E") || (resultdata.results[indx].Type == "S")){
							var msgstr = resultdata.results[indx].Message.substr(resultdata.results[indx].Message.indexOf(':')+1,resultdata.results[indx].Message.length);
							jsnErrorRJSREEntry.push({
							"Equipment":resultdata.results[indx].Equipment,
							"Status":resultdata.results[indx].Status,
							"Type":resultdata.results[indx].Type,
							"Message":msgstr,
							"SerialNo":resultdata.results[indx].SerialNo,
							"FunctionalLoc":resultdata.results[indx].FunctionalLoc,
							"Depot":resultdata.results[indx].Depot,
							"UnitPartCode":resultdata.results[indx].UnitPartCode,
							"JobType":resultdata.results[indx].JobType,
							"SaleGrade":resultdata.results[indx].SaleGrade,
							"EstimateDate":resultdata.results[indx].EstimateDate,
							"LesseeAuthAmt":resultdata.results[indx].LesseeAuthAmt,
							"Conditioncode":resultdata.results[indx].Conditioncode,
							"Currencycode":resultdata.results[indx].Currencycode,
							"EstimId":resultdata.results[indx].EstimId,
							"Param1":resultdata.results[indx].Param1,
							"Param2":resultdata.results[indx].Param2,
							"Param3":resultdata.results[indx].Param3,
							"Param4":resultdata.results[indx].Param4
							});
						}
					}
					
					/*var oidFrmCntnrRsltREEntry = new sap.ui.layout.form.FormContainer("idFrmCntnrRsltREEntry", {
						formElements: []
					});
					var oFrmREEntry = sap.ui.getCore().byId("idFrmREEntry");
					oFrmREEntry.addFormContainer(oidFrmCntnrRsltREEntry);*/
					
					if(jsnSuccessRJSREEntry.length > 0)
					{
						objREstimateOnline.createSuccessListRJS(jsnSuccessRJSREEntry);
					}
					
					if(jsnErrorRJSREEntry.length > 0)
					{
						objREstimateOnline.createErrorTableRJS(jsnErrorRJSREEntry);
					}
				}else{
					busyDialog.close();
					sap.ui.commons.MessageBox.alert("No result found.\nPlease contact the system admin or try again later.");
				}
			}else{
				busyDialog.close();
				sap.ui.commons.MessageBox.alert("No result found.\nPlease contact the system admin or try again later.");
			}
		}catch(e){
			busyDialog.close();
			sap.ui.commons.MessageBox.alert("Error occured while processing.\nPlease contact the system admin or try again later.");
		}
	},
	
	onlineerrorRJSSubmit: function(err){
		errorfromServer(err);
	},
	
	onlineRJSSubmit: function(estmtIdRJS){
		try{
		
			var valid = true;
			var oidDdlUnitPCodeRJSREEntry = sap.ui.getCore().byId("idDdlUnitPCodeRJSREEntry");
			var oidDtPkrEstimateDtRJSREEntry = sap.ui.getCore().byId("idDtPkrEstimateDtRJSREEntry");
			if(oidDdlUnitPCodeRJSREEntry.getValue() == ''){
				oidDdlUnitPCodeRJSREEntry.setPlaceholder("Required");
				oidDdlUnitPCodeRJSREEntry.setValueState(sap.ui.core.ValueState.Error);
				valid = false;
			}
			if(oidDtPkrEstimateDtRJSREEntry.getValue() == ''){
				oidDtPkrEstimateDtRJSREEntry.setPlaceholder("Required");
				oidDtPkrEstimateDtRJSREEntry.setValueState(sap.ui.core.ValueState.Error);
				valid = false;
			}
			if(!valid){
				return;
			}
			var dtEstmt = oidDtPkrEstimateDtRJSREEntry.getValue().split('-');
			dtEstmt = dtEstmt[2]+'-'+dtEstmt[1]+'-'+dtEstmt[0]+'T00:00:00';
			
			busyDialog.open();
			var urlToCall = serviceUrl15_old + "/Rep_Est_Sub?$filter=";
			urlToCall += "EstimId eq '"+ estmtIdRJS +"'";
			urlToCall += " and Currencycode eq '' and UnitPartCode eq '' and SerialNo eq '' and Depot eq '' and SaleGrade eq '' and LesseeAuthAmt eq '' and JobType eq '' and Param3 eq '0000000000' and Param2 eq datetime'9999-09-09T00:00:00' and Param1 eq '' and IRep9 eq '' and IRep8 eq '' and IRep7 eq '' and IRep6 eq '' and IRep5 eq '' and IRep4 eq '' and IRep3 eq '' and IRep2 eq '' and IRep10 eq '' and IRep1 eq '' and EstimateDate eq datetime'" + dtEstmt + "' and FunctionalLoc eq '' and Param4 eq time'PT00H00M00S'";
			
			
			//var urlToCall = serviceUrl15_old + "/Repair_Estimates_Submit?$filter=";
			//urlToCall += "UserId eq 'REQMT15' and ";
			//urlToCall += "EstimId eq '"+ estmtIdRJS +"'";
			
			objUtilREstimate.doOnlineRequest(urlToCall,objREstimateOnline.onlinesuccessRJSSubmit, objREstimateOnline.onlineerrorRJSSubmit);
		}catch(e){
			busyDialog.close();
			sap.ui.commons.MessageBox.alert("Error occured while processing.\nPlease contact the system admin or try again later.");
		}
	},
	
	createErrorTableRJS: function(jsnData){
		var oidTblErrorREEntry = new sap.ui.table.Table("idErrorTableRepJS",
			{
				selectionMode : sap.ui.table.SelectionMode.None,
				navigationMode : sap.ui.table.NavigationMode.None,
				layoutData: new sap.ui.layout.GridData({span: "L8 M12 S12",linebreak: false, margin: false}),
			}).addStyleClass('tblBorder');
			
		oidTblErrorREEntry.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Error Type",
			}),
			template : new sap.ui.commons.TextView().bindProperty("text", "Type"),
			hAlign : "Center",
			resizable:false,
			width : "90px"
		}));
		
		oidTblErrorREEntry.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Message"
			}),
			template : new sap.ui.commons.TextView().bindProperty("text", "Message"),
			resizable:false,
			hAlign : "Center"
		}));
		
		var oMdlErrTblREEntry = new sap.ui.model.json.JSONModel();
		oMdlErrTblREEntry.setData({modelData : jsnData});
		oidTblErrorREEntry.setVisibleRowCount(jsnData.length);	
		oidTblErrorREEntry.setModel(oMdlErrTblREEntry);
		oidTblErrorREEntry.bindRows("/modelData");
		
		var oFrmCntnrREEntry = sap.ui.getCore().byId("idFrmCntnrRJSREEntry");
		var frmFirsRowREEntry = new sap.ui.layout.form.FormElement("idFrmElmntErrRJSREEntry",{
			fields: [oidTblErrorREEntry]
		});
		oFrmCntnrREEntry.addFormElement(frmFirsRowREEntry);
				
		/*var oFrmCntnrREEntry = sap.ui.getCore().byId("idFrmCntnrRsltREEntry");
		var frmElmntErrorTblREEntry = new sap.ui.layout.form.FormElement("idFrmElmtTblErrorREEntry",{
		    fields: [oidTblErrorREEntry]
		});
		oFrmCntnrREEntry.addFormElement(frmElmntErrorTblREEntry);*/
	},
	
	createSuccessListRJS: function(jsnBindData){
		/* if(sap.ui.getCore().byId("idRowRptrSuccessCMDt") != undefined){
			sap.ui.getCore().byId("idRowRptrSuccessCMDt").destroy();
		} */
		var oRwRptrSuccesREEntry = new sap.ui.commons.RowRepeater("idRRRepairEstimJS",{
		}).addStyleClass("marginTop10");
		oRwRptrSuccesREEntry.setDesign("Transparent");
		oRwRptrSuccesREEntry.setNumberOfRows(jsnBindData.length);
		//create the template cntrlSuccessREEntry that will be repeated and will display the data
		var oRwTmpltSuccesREEntry = new sap.ui.commons.layout.MatrixLayout({
			widths : ['25px', '95%']
		});

		var  mtrxRwSuccessREEntry, mtrxCellSuccessREEntry, cntrlSuccessREEntry;
		// main matrix
		oRwTmpltSuccesREEntry.setWidth("70%");
		// main row
		mtrxRwSuccessREEntry = new sap.ui.commons.layout.MatrixLayoutRow();
		//image
		cntrlSuccessREEntry = new sap.ui.commons.Image();
		//cntrlSuccessREEntry.setHeight("60px");
		//cntrlSuccessREEntry.setWidth("50px");
		cntrlSuccessREEntry.bindProperty("src","IconSrc");
		
		mtrxCellSuccessREEntry = new sap.ui.commons.layout.MatrixLayoutCell();
		mtrxCellSuccessREEntry.addContent(cntrlSuccessREEntry);
		mtrxRwSuccessREEntry.addCell(mtrxCellSuccessREEntry);

		//label 1
		cntrlSuccessREEntry = new sap.ui.commons.Label();
		cntrlSuccessREEntry.bindProperty("text","Message");
		mtrxCellSuccessREEntry = new sap.ui.commons.layout.MatrixLayoutCell();
		mtrxCellSuccessREEntry.addContent(cntrlSuccessREEntry);
		mtrxRwSuccessREEntry.addCell(mtrxCellSuccessREEntry);

		// add row to matrix
		oRwTmpltSuccesREEntry.addRow(mtrxRwSuccessREEntry);
		
		var oMdlListSuccesREEntry = new sap.ui.model.json.JSONModel();
		oMdlListSuccesREEntry.setData(jsnBindData);
		oRwRptrSuccesREEntry.setModel(oMdlListSuccesREEntry);
		
		oRwRptrSuccesREEntry.bindRows("/", oRwTmpltSuccesREEntry);
		
		var oFrmCntnrREEntry = sap.ui.getCore().byId("idFrmCntnrRJSREEntry");
		var frmFirsRowREEntry = new sap.ui.layout.form.FormElement("idFrmElmntInfoLstRJSREEntry",{
			fields: [oRwRptrSuccesREEntry]
		});
		oFrmCntnrREEntry.addFormElement(frmFirsRowREEntry);
		
		/*var oFrmCntnrREEntry = sap.ui.getCore().byId("idFrmCntnrRsltREEntry");
		var frmElmntSuccesREEntry = new sap.ui.layout.form.FormElement("idFrmElmtSuccesREEntry",{
		    fields: [oRwRptrSuccesREEntry]
		});
		oFrmCntnrREEntry.addFormElement(frmElmntSuccesREEntry);*/
	},
	
	
	
	
	
	
	
	
	
	
	
	
	
	//JOINT SURVEY CASE ONLINE
	onlinesuccessfunJointSurveyIntoExcel: function(resultdata, response){
		busyDialog.close();
		jsnLineItemREEntry.length = 0;
		jointtypeSel = true;
		
		if(resultdata != undefined){
			
			if(resultdata.results.length > 0){
				/*excelData = new Array(resultdata.results.length);
				
				for (var i = 0; i < resultdata.results.length; i++) {
					excelData[i] = new Array(13);
				}
				var chkedArr = jQuery.grep(resultdata.results, function(element, index){
						return element.UnitPartCode == "M";
					});
				//CREATE CONTAINER LAYPUT FOR REFER JOINT SURVAY
				if(chkedArr.length > 0){
					//objcrntRJSREEntry = new RepairEstimateEntryReferJS();
					//objcrntRJSREEntry.createFrmRepairEstimateEntryRJS();
					jsnLineItemRJSREEntry.length = 0;
				}*/
				var iter = 0;
				excelData = [];
				var upcIn = sap.ui.getCore().byId("idDdlUnitPCodeREEntryIn").getSelectedKey();
				for(var indx in resultdata.results){
					if(resultdata.results[indx].UnitPartCode == upcIn){
						sap.ui.getCore().byId("idDdlUnitPCodeREEntry").setSelectedKey(resultdata.results[indx].UnitPartCode);
						sap.ui.getCore().byId("idDdlUnitPCodeREEntryIn").setSelectedKey(resultdata.results[indx].UnitPartCode);
						sap.ui.getCore().byId("idDdlSaleGradeREEntry").setSelectedKey(resultdata.results[indx].SalesGrade);
						sap.ui.getCore().byId("idTFLeaseAuthAmtREEntry").setValue(resultdata.results[indx].LesseeAuthorisedAmount);
						//sap.ui.getCore().byId("idTFCurrnCodeREEntry").setValue(resultdata.results[indx].CurrencyCode);
						sap.ui.getCore().byId("idDdlJobTypeREEntry").setSelectedKey("Joint Survey");
						var cnvrtdt = resultdata.results[indx].WorkCreatedDate;
						var datenw = cnvrtdt.split('(')[1].split(')')[0];
						cnvrtdt=  new Date(parseInt(datenw)).format("dd-mm-yyyy");
			
						sap.ui.getCore().byId("idDtPkrEstimateDtREEntry").setValue(cnvrtdt);
						//selEstmtId = resultdata.results[indx].EstimateNumber;
						excelData.push([]);
						excelData[iter][0] = resultdata.results[indx].LocationCode;	
			 			excelData[iter][1] = resultdata.results[indx].ComponentCode; 	
			 			excelData[iter][2] = resultdata.results[indx].DamageCode; 	
			 			excelData[iter][3] = resultdata.results[indx].MaterialCode; 	
			 			excelData[iter][4] = resultdata.results[indx].RepairCode; 	
			 			excelData[iter][5] = resultdata.results[indx].RepairLength; 	
			 			excelData[iter][6] = resultdata.results[indx].RepairWidth; 	
			 			excelData[iter][7] = resultdata.results[indx].Quantity; 	
			 			excelData[iter][8] = resultdata.results[indx].ManHours; 	
			 			excelData[iter][9] = resultdata.results[indx].MaterialCost; 	
			 			//excelData[indx][10] = resultdata.results[indx].LabourRate; 	
			 			excelData[iter][10] = resultdata.results[indx].BulletinNumber; 	
			 			excelData[iter][11] = resultdata.results[indx].Responsibility; 
			 			iter = iter + 1;
					
					}}/*else if(resultdata.results[indx].UnitPartCode == "M"){
						sap.ui.getCore().byId("idDdlUnitPCodeREEntry").setSelectedKey(resultdata.results[indx].UnitPartCode);
						sap.ui.getCore().byId("idDdlUnitPCodeREEntryIn").setSelectedKey(resultdata.results[indx].UnitPartCode);
						sap.ui.getCore().byId("idDdlSaleGradeREEntry").setSelectedKey(resultdata.results[indx].SalesGrade);
						sap.ui.getCore().byId("idTFLeaseAuthAmtREEntry").setValue(resultdata.results[indx].LesseeAuthorisedAmount);
						//sap.ui.getCore().byId("idTFCurrnCodeRJSREEntry").setValue(resultdata.results[indx].CurrencyCode);
						sap.ui.getCore().byId("idDdlJobTypeREEntry").setSelectedKey("Joint Survey");
						
						var cnvrtdtRJS = resultdata.results[indx].WorkCreatedDate;
						var datenw = cnvrtdtRJS.split('(')[1].split(')')[0];
						cnvrtdtRJS=  new Date(parseInt(datenw)).format("dd-mm-yyyy");
			
						sap.ui.getCore().byId("idDtPkrEstimateDtREEntry").setValue(cnvrtdtRJS);
						
						excelData[indx][0] = resultdata.results[indx].LocationCode;	
			 			excelData[indx][1] = resultdata.results[indx].ComponentCode; 	
			 			excelData[indx][2] = resultdata.results[indx].DamageCode; 	
			 			excelData[indx][3] = resultdata.results[indx].MaterialCode; 	
			 			excelData[indx][4] = resultdata.results[indx].RepairCode; 	
			 			excelData[indx][5] = resultdata.results[indx].RepairLength; 	
			 			excelData[indx][6] = resultdata.results[indx].RepairWidth; 	
			 			excelData[indx][7] = resultdata.results[indx].Quantity; 	
			 			excelData[indx][8] = resultdata.results[indx].ManHours; 	
			 			excelData[indx][9] = resultdata.results[indx].MaterialCost; 	
			 			//excelData[indx][10] = resultdata.results[indx].LabourRate; 	
			 			excelData[indx][10] = resultdata.results[indx].BulletinNumber; 	
			 			excelData[indx][11] = resultdata.results[indx].Responsibility; 


					}*/
				
				
		 		oExcelGrid.loadData(excelData);
				
			}else{
				sap.ui.commons.MessageBox.alert("No Estimate found for joint survey for the Unit Number.");
			}
		}else{
			sap.ui.commons.MessageBox.alert("No Estimate found for joint survey for the Unit Number.");
		}
	},
	
	
	
	
	
	
	
	

	//JOINT SURVEY CASE ONLINE
	onlinesuccessfunJointSurvey: function(resultdata, response){
		busyDialog.close();
		jsnLineItemREEntry.length = 0;
		jointtypeSel = true;
		
		if(resultdata != undefined){
			if(resultdata.results.length > 0){
				var chkedArr = jQuery.grep(resultdata.results, function(element, index){
						return element.UnitPartCode == "M";
					});
				//CREATE CONTAINER LAYPUT FOR REFER JOINT SURVAY
				if(chkedArr.length > 0){
					objcrntRJSREEntry = new RepairEstimateEntryReferJS();
					objcrntRJSREEntry.createFrmRepairEstimateEntryRJS();
					jsnLineItemRJSREEntry.length = 0;
				}
				for(var indx in resultdata.results){
					if(resultdata.results[indx].UnitPartCode == "C"){
						sap.ui.getCore().byId("idDdlUnitPCodeREEntry").setSelectedKey(resultdata.results[indx].UnitPartCode);
						sap.ui.getCore().byId("idDdlSaleGradeREEntry").setSelectedKey(resultdata.results[indx].SalesGrade);
						sap.ui.getCore().byId("idTFLeaseAuthAmtREEntry").setValue(resultdata.results[indx].LesseeAuthorisedAmount);
						//sap.ui.getCore().byId("idTFCurrnCodeREEntry").setValue(resultdata.results[indx].CurrencyCode);
						
						var cnvrtdt = resultdata.results[indx].WorkCreatedDate;
						var datenw = cnvrtdt.split('(')[1].split(')')[0];
						cnvrtdt=  new Date(parseInt(datenw)).format("dd-mm-yyyy");
			
						sap.ui.getCore().byId("idDtPkrEstimateDtREEntry").setValue(cnvrtdt);
						//selEstmtId = resultdata.results[indx].EstimateNumber;
						
						jsnLineItemREEntry.push({
							"checked":false,
							"LineItem":resultdata.results[indx].LineItem,
							"sectionKey":"",
							"sectionText":"",
							"LocationKey":resultdata.results[indx].LocationCode,
							"LocationText":resultdata.results[indx].LocationCode,
							"ComponentKey":resultdata.results[indx].ComponentCode,
							"ComponentText":resultdata.results[indx].ComponentCode,
							"DamageKey":resultdata.results[indx].DamageCode,
							"DamageText":resultdata.results[indx].DamageCode,
							"RepairKey":resultdata.results[indx].RepairCode,
							"RepairText":resultdata.results[indx].RepairCode,
							"MaterialKey":resultdata.results[indx].MaterialCode,
							"MaterialText":resultdata.results[indx].MaterialCode,
							"MaterialCost":resultdata.results[indx].MaterialCost,
							"ManHours":resultdata.results[indx].ManHours,
							"RepairLength":resultdata.results[indx].RepairLength,
							"RepairWidth":resultdata.results[indx].RepairWidth,
							"Quantity":resultdata.results[indx].Quantity,
							responsibility:[],
							"ResponsibilityKey":resultdata.results[indx].Responsibility,
							"ResponsibilityText":resultdata.results[indx].Responsibility,
							"LabourRate":resultdata.results[indx].LabourRate,
							"TechBulletin":resultdata.results[indx].BulletinNumber,
							"DataInserted":true,
						});
					}else if(resultdata.results[indx].UnitPartCode == "M"){
						sap.ui.getCore().byId("idDdlUnitPCodeRJSREEntry").setSelectedKey(resultdata.results[indx].UnitPartCode);
						sap.ui.getCore().byId("idDdlSaleGradeRJSREEntry").setSelectedKey(resultdata.results[indx].SalesGrade);
						sap.ui.getCore().byId("idTFLeaseAuthAmtRJSREEntry").setValue(resultdata.results[indx].LesseeAuthorisedAmount);
						//sap.ui.getCore().byId("idTFCurrnCodeRJSREEntry").setValue(resultdata.results[indx].CurrencyCode);
						sap.ui.getCore().byId("idDdlJobTypeRJSREEntry").setSelectedKey("Joint Survey");
						
						var cnvrtdtRJS = resultdata.results[indx].WorkCreatedDate;
						var datenw = cnvrtdtRJS.split('(')[1].split(')')[0];
						cnvrtdtRJS=  new Date(parseInt(datenw)).format("dd-mm-yyyy");
			
						sap.ui.getCore().byId("idDtPkrEstimateDtRJSREEntry").setValue(cnvrtdtRJS);
						
						jsnLineItemRJSREEntry.push({
							"checked":false,
							"LineItem":resultdata.results[indx].LineItem,
							"sectionKey":"",
							"sectionText":"",
							"LocationKey":resultdata.results[indx].LocationCode,
							"LocationText":resultdata.results[indx].LocationCode,
							"ComponentKey":resultdata.results[indx].ComponentCode,
							"ComponentText":resultdata.results[indx].ComponentCode,
							"DamageKey":resultdata.results[indx].DamageCode,
							"DamageText":resultdata.results[indx].DamageCode,
							"RepairKey":resultdata.results[indx].RepairCode,
							"RepairText":resultdata.results[indx].RepairCode,
							"MaterialKey":resultdata.results[indx].MaterialCode,
							"MaterialText":resultdata.results[indx].MaterialCode,
							"MaterialCost":resultdata.results[indx].MaterialCost,
							"ManHours":resultdata.results[indx].ManHours,
							"RepairLength":resultdata.results[indx].RepairLength,
							"RepairWidth":resultdata.results[indx].RepairWidth,
							"Quantity":resultdata.results[indx].Quantity,
							responsibility:[],
							"ResponsibilityKey":resultdata.results[indx].Responsibility,
							"ResponsibilityText":resultdata.results[indx].Responsibility,
							"LabourRate":resultdata.results[indx].LabourRate,
							"TechBulletin":resultdata.results[indx].BulletinNumber,
							"DataInserted":true,
						});
					}
				}
				
				//UPDATE FOR RESPONSIBILITY IN TABLE
				var oTblLineItemREEntry = sap.ui.getCore().byId("idTblLineItemREEntry");
				if(jsnLineItemREEntry.length < 6){
					oTblLineItemREEntry.setNavigationMode(sap.ui.table.NavigationMode.None);
				}else{
					oTblLineItemREEntry.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
				}
				var dataReponsibleREEntry = oMdlGlblDDLREEntry.getData().responsibility;
				for(var i =0; i < jsnLineItemREEntry.length; i++){
					jsnLineItemREEntry[i].responsibility.push({"text":"","key":""});
					for(var inx in dataReponsibleREEntry){
						jsnLineItemREEntry[i].responsibility.push({"text":dataReponsibleREEntry[inx].text,"key":dataReponsibleREEntry[inx].key});
					}
				}
				oMdlLineItemREEntry.updateBindings();
				
				//joint survey refer case
				if(jsnLineItemRJSREEntry.length > 0){
					//objcrntRJSREEntry = new RepairEstimateEntryReferJS();
					//objcrntRJSREEntry.createFrmRepairEstimateEntryRJS();
		
					var oidTblLineItemRJSREEntry = sap.ui.getCore().byId("idTblLineItemRJSREEntry");
					if(jsnLineItemRJSREEntry.length < 6){
						oidTblLineItemRJSREEntry.setNavigationMode(sap.ui.table.NavigationMode.None);
					}else{
						oidTblLineItemRJSREEntry.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
					}
					//UPDATE FOR RESPONSIBILITY IN TABLE REFER CASE
					for(var i =0; i < jsnLineItemRJSREEntry.length; i++){
						jsnLineItemRJSREEntry[i].responsibility.push({"text":"","key":""});
						for(var inx in dataReponsibleREEntry){
							jsnLineItemRJSREEntry[i].responsibility.push({"text":dataReponsibleREEntry[inx].text,"key":dataReponsibleREEntry[inx].key});
						}
					}
					oMdlLineItemRJSREEntry.updateBindings();
				}
			}else{
				sap.ui.commons.MessageBox.alert("No Estimate found for joint survey for the Unit Number.");
			}
		}else{
			sap.ui.commons.MessageBox.alert("No Estimate found for joint survey for the Unit Number.");
		}
	},
	
	onlineerrorfunJointSurvey: function(err){
		//REMOVE BELOW TWO LINE AFTER WORKING JOINT SURVEY URL
		//objcrntRJSREEntry = new RepairEstimateEntryReferJS();
		//objcrntRJSREEntry.createFrmRepairEstimateEntryRJS();
		errorfromServer(err);
	},
	
	onlinefunJointSurvey: function(){
		try{
			busyDialog.open();
			var urlToCall = serviceUrl15_old + "/JS_WORK_ORDER_DETAILS?$filter=";
			//urlToCall += "UserId eq 'REQMT15' and ";
			urlToCall += "SerialNo eq '"+ unitNo +"'";
			objUtilREstimate.doOnlineRequest(urlToCall,objREstimateOnline.onlinesuccessfunJointSurveyIntoExcel, objREstimateOnline.onlineerrorfunJointSurvey);
		}catch(e){
			busyDialog.close();
			sap.ui.commons.MessageBox.alert("Error occured while processing.\nPlease contact the system admin or try again later.");
		}
	},
	
});
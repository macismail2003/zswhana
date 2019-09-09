var depotEdiData = [];
var depotEnabled = false;
sap.ui.controller("view.EdiProcess", {

	/**
	* Called when a controller is instantiated and its View controls (if available) are already created.
	* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
	* @memberOf view.home
	*/
//		onInit: function() {
	//
//		},

	/**
	* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
	* (NOT before the first rendering! onInit() is used for that one!).
	* @memberOf view.home
	*/
//		onBeforeRendering: function() {
	//
//		},

	/**
	* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
	* This hook is the same one that SAPUI5 controls get after being rendered.
	* @memberOf view.home
	*/
		onAfterRendering: function() {

		},

	/**
	* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
	* @memberOf view.home
	*/
//		onExit: function() {
	//
//		}

		/*MAIN : Create Main Page */
		createMainPage : function(){

			jQuery.sap.require("sap.ui.core.IconPool");

	        depotEdiData = [];
	        /*depotEdiData.push({
				"key" : "",
				"text" : ""
			});
	        depotEdiData.push({
				"key" : "1547",
				"text" : "1547 - Eng Kong Depot 1"
			});
	        depotEdiData.push({
				"key" : "1544",
				"text" : "1544 - Eng Kong Depot 2"
			});
	        depotEdiData.push({
				"key" : "1545",
				"text" : "1545 - Eng Kong Depot 3"
			});	*/
	        depotEnabled = false;

	        busyDialog.open();
	        oModel = new sap.ui.model.odata.ODataModel(serviceEDIDOC, true);
	        var uname = sessionStorage.uName.toUpperCase();
			var oMODELFDEP = serviceEDIDOC + "FDEPSet?$filter=IUserid eq '" + uname + "'";

	        OData.request({
	          requestUri: oMODELFDEP,
	          method: "GET",
	          dataType: 'json',
	          async: false,
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

		  		 depotEdiData = [];

					 if(data.results.length == 1){

					 }else{
						 depotEdiData.push({
								"key" : "",
								"text" : ""
							});
					 }

		  		for(var i=0; i<data.results.length;i++){
		  			depotEdiData.push({
						"key" : data.results[i].DepotId,
						"text" : data.results[i].DepotCode + " - " + data.results[i].DepotName,
						//"id" : data.results[i].DepotId
					});
		  		}
		  		depotEnabled = false;

		        },
		        function(err){
		        	busyDialog.close();
		        });

			/*var pageHOME = sap.ui.view({id:"idHOME", viewName:"view.home", type:sap.ui.core.mvc.ViewType.JS});
			appedi.addPage(pageHOME);

			var pageFUPL = sap.ui.view({id:"idFUPL", viewName:"view.FUPL", type:sap.ui.core.mvc.ViewType.JS});
			appedi.addPage(pageFUPL);

			var pageFGIN = sap.ui.view({id:"idFGIN", viewName:"view.FGIN", type:sap.ui.core.mvc.ViewType.JS});
			appedi.addPage(pageFGIN);

			var pageFGOU = sap.ui.view({id:"idFGOU", viewName:"view.FGOU", type:sap.ui.core.mvc.ViewType.JS});
			appedi.addPage(pageFGOU);

			var pageFRCN = sap.ui.view({id:"idFRCN", viewName:"view.FRCN", type:sap.ui.core.mvc.ViewType.JS});
			appedi.addPage(pageFRCN);

			var pageFLSA = sap.ui.view({id:"idFLSA", viewName:"view.FLSA", type:sap.ui.core.mvc.ViewType.JS});
			appedi.addPage(pageFLSA);

			var pageFEST = sap.ui.view({id:"idFEST", viewName:"view.FEST", type:sap.ui.core.mvc.ViewType.JS});
			appedi.addPage(pageFEST);*/




	        var oContainer = new sap.m.TileContainer({});

	        // File Upload
	        var ofupl = new fupl();
	        var oFUPLTile = new sap.m.StandardTile({
						 	 						 visible : false,
	        							   id : "idFUPLTile",
	        							   icon :sap.ui.core.IconPool.getIconURI( "upload" ),
			                               title:"EDI File Upload",
			                               press: function(){

			                            	   var bus = sap.ui.getCore().getEventBus();
			   								   bus.publish("nav", "to", {id : "FUPL"});
			   								   $('#idHdrContnt').html('EDI - File Upload');
			   								   ofupl.resetFUPL();


	                                       }});
	        oContainer.addTile(oFUPLTile);

	        // Gate IN
	        var ofgin = new fgin();
	        var oFGINTile = new sap.m.StandardTile({
	        							   id : "idFGINTile",
	        							   icon :sap.ui.core.IconPool.getIconURI("journey-arrive"),
			                               title:"Gate IN",
			                               press: function(){
			                            	   /*sap.ui.getCore().byId("idFGINButtonAdd5").setEnabled(true);
			                            	   sap.ui.getCore().byId("idFGINButtonValidate").setEnabled(true);
			                            	   sap.ui.getCore().byId("idFGINButtonSubmit").setEnabled(false);
			                            	   sap.ui.getCore().byId("idFGINButtonPrint").setEnabled(false);*/
			                            	   //appedi.to("idFGIN");
					                            	   var bus = sap.ui.getCore().getEventBus();
											   								   bus.publish("nav", "to", {id : "FGIN"});
											   								   $('#idHdrContnt').html('EDI - Gate IN');

																					 //sap.ui.getCore().byId("idFGINComboDepot").setSelectedKey("");
																					 if(sap.ui.getCore().byId("idFGINComboDepot") != undefined){
																		 				var oModelDepot = new sap.ui.model.json.JSONModel();
																		 				oModelDepot.setSizeLimit(99999);
																		 				oModelDepot.setData({data:depotEdiData});
																		 				var oComboDepot = sap.ui.getCore().byId("idFGINComboDepot");
																		 				oComboDepot.setModel(oModelDepot);
																		 				oComboDepot.setSelectedKey(depotEdiData[0].key);
																		 				oComboDepot.bindItems("/data", new sap.ui.core.ListItem({text: "{text}", key:"{key}"}));
																		 			}
																					 if(oJSONFGINExcelData)
																			 		 		oJSONFGINExcelData = [];
					   								   						 ofgin.setExcelFGINPage();
					                            	   if(oFGINExcel != null){
					                            		   oJSONFGINExcelData = [];
					                            		   oFGINExcel.loadData(oJSONFGINExcelData);
					                            	   }
	                                       }});
	        oContainer.addTile(oFGINTile);

	        // Repair Estimates
	        var ofest = new fest();
	        var oFESTTile = new sap.m.StandardTile({
	        							   id : "idFESTTile",
	        							   icon :sap.ui.core.IconPool.getIconURI("form"),
			                               title:"Repair Estimates",
			                               press: function(){
			                            	  /*sap.ui.getCore().byId("idFESTButtonAdd5").setEnabled(true);
			                            	  sap.ui.getCore().byId("idFESTButtonValidate").setEnabled(true);
			                            	  sap.ui.getCore().byId("idFESTButtonSubmit").setEnabled(false);
			                            	  sap.ui.getCore().byId("idFESTButtonPrint").setEnabled(false);

			                            	  sap.ui.getCore().byId("idFESTComboStatus").setSelectedKey("");

			                            	  sap.ui.getCore().byId("idFESTInputSerial").setValue("");
			                            	  sap.ui.getCore().byId("idFESTInputLabRate").setValue("");
			                            	  sap.ui.getCore().byId("idFESTInputNotes").setValue("");
			                            	  sap.ui.getCore().byId("idFESTInputCustomerCode").setValue("");
			                            	  sap.ui.getCore().byId("idFESTInputLessee").setValue("");
			                            	  sap.ui.getCore().byId("idFESTInputRedel").setValue("");
			                            	  sap.ui.getCore().byId("idFESTInputPOHDate").setValue("");
			                            	  sap.ui.getCore().byId("idFESTInputPOHLocation").setValue("");
			                            	  sap.ui.getCore().byId("idFESTInputGINDate").setValue("");
			                            	  sap.ui.getCore().byId("idFESTInputRevNo").setValue("");
			                            	  sap.ui.getCore().byId("idFESTInputBaseCurr").setValue("");

			                            	   appedi.to("idFEST");*/
			                            	   var bus = sap.ui.getCore().getEventBus();
									   								   bus.publish("nav", "to", {id : "FEST"});
									   								   $('#idHdrContnt').html('EDI - Repair Estimate');
									   								   ofest.resetFEST();



			                            	  if(oFESTExcel != null){
			                            		   oJSONFESTExcelData = [];
			                            		   oFESTExcel.loadData(oJSONFESTExcelData);
			                            	  }


	                                       }});
	        oContainer.addTile(oFESTTile);

	        // Lessee Approval
	        var oflsa = new flsa();
	        var oFLSATile = new sap.m.StandardTile({
	        							   id : "idFLSATile",
	        							   icon :sap.ui.core.IconPool.getIconURI("hr-approval"),
			                               title:"Lessee Approval",
			                               press: function(){
			                            	  /*sap.ui.getCore().byId("idFLSAButtonAdd5").setEnabled(true);
			                            	  sap.ui.getCore().byId("idFLSAButtonValidate").setEnabled(true);
			                            	  sap.ui.getCore().byId("idFLSAButtonSubmit").setEnabled(false);
			                            	  sap.ui.getCore().byId("idFLSAButtonPrint").setEnabled(false);

			                            	  sap.ui.getCore().byId("idFLSAInputSerial").setValue("");
			                            	  sap.ui.getCore().byId("idFLSAInputReference").setValue("");
			                            	  sap.ui.getCore().byId("idFLSAInputAppDate").setValue("");
			                            	  sap.ui.getCore().byId("idFLSAInputAmount").setValue("");
			                            	  sap.ui.getCore().byId("idFLSAComboStatus").setSelectedKey("");

			                            	  sap.ui.getCore().byId("idFLSAInputCustomerCode").setValue("");
			                            	  sap.ui.getCore().byId("idFLSAInputLessee").setValue("");
			                            	  sap.ui.getCore().byId("idFLSAInputEstimate").setValue("");
			                            	  sap.ui.getCore().byId("idFLSAInputRevNo").setValue("");
			                            	  sap.ui.getCore().byId("idFLSAInputBaseCurr").setValue("");
			                            	  //sap.ui.getCore().byId("idFLSAInputDepot").setValue("");
			                            	  appedi.to("idFLSA");*/

			                            	   var bus = sap.ui.getCore().getEventBus();
			   								   bus.publish("nav", "to", {id : "FLSA"});
			   								   $('#idHdrContnt').html('EDI - Lessee Approval');

			   								   oflsa.resetFLSA();

			                            	  if(oFLSAExcel != null){
			                            		   oJSONFLSAExcelData = [];
			                            		   oFLSAExcel.loadData(oJSONFLSAExcelData);
			                            	  }


	                                       }});
	        oContainer.addTile(oFLSATile);

	        // Repair Completion
	        var ofrcn = new frcn();
	        var oFRCNTile = new sap.m.StandardTile({
	        							   id : "idFRCNTile",
	        							   icon :sap.ui.core.IconPool.getIconURI("complete"),
			                               title:"Repair Completion",
			                               press: function(){
			                            	   /*sap.ui.getCore().byId("idFRCNButtonAdd5").setEnabled(true);
			                            	   sap.ui.getCore().byId("idFRCNButtonValidate").setEnabled(true);
			                            	   sap.ui.getCore().byId("idFRCNButtonSubmit").setEnabled(false);
			                            	   sap.ui.getCore().byId("idFRCNButtonPrint").setEnabled(false);
			                            	   appedi.to("idFRCN");*/

			                            	   var bus = sap.ui.getCore().getEventBus();
			   								   bus.publish("nav", "to", {id : "FRCN"});
			   								   $('#idHdrContnt').html('EDI - Repair Completion');


													 //sap.ui.getCore().byId("idFRCNComboDepot").setSelectedKey("");
													 if(sap.ui.getCore().byId("idFRCNComboDepot") != undefined){
										 			 var oModelDepot = new sap.ui.model.json.JSONModel();
										 			 oModelDepot.setSizeLimit(99999);
										 			 oModelDepot.setData({data:depotEdiData});
										 			 var oComboDepot = sap.ui.getCore().byId("idFRCNComboDepot");
										 			 oComboDepot.setModel(oModelDepot);
										 			 oComboDepot.setSelectedKey(depotEdiData[0].key);
										 			 oComboDepot.bindItems("/data", new sap.ui.core.ListItem({text: "{text}", key:"{key}"}));
										 		 }
													 if(oJSONFRCNExcelData)
														 oJSONFRCNExcelData = [];
			   								   ofrcn.setExcelFRCNPage();

			                            	   if(oFRCNExcel != null){
			                            		   oJSONFRCNExcelData = [];
			                            		   oFRCNExcel.loadData(oJSONFRCNExcelData);
			                            	  }
	                                       }});
	        oContainer.addTile(oFRCNTile);

	        // Gate OUT
	        var ofgou = new fgou();
	        var oFGOUTile = new sap.m.StandardTile({
	        							   id : "idFGOUTile",
	        							   icon :sap.ui.core.IconPool.getIconURI("journey-depart"),
			                               title:"Gate OUT",
			                               press: function(){
			                            	   /*sap.ui.getCore().byId("idFGOUButtonAdd5").setEnabled(true);
			                            	   sap.ui.getCore().byId("idFGOUButtonValidate").setEnabled(true);
			                            	   sap.ui.getCore().byId("idFGOUButtonSubmit").setEnabled(false);
			                            	   sap.ui.getCore().byId("idFGOUButtonPrint").setEnabled(false);
			                            	   appedi.to("idFGOU");*/

			                            	   var bus = sap.ui.getCore().getEventBus();
			   								   bus.publish("nav", "to", {id : "FGOU"});
			   								   $('#idHdrContnt').html('EDI - Gate OUT');


													 //sap.ui.getCore().byId("idFGOUComboDepot").setSelectedKey("");
													 if(sap.ui.getCore().byId("idFGOUComboDepot") != undefined){
										 			 var oModelDepot = new sap.ui.model.json.JSONModel();
										 			 oModelDepot.setSizeLimit(99999);
										 			 oModelDepot.setData({data:depotEdiData});
										 			 var oComboDepot = sap.ui.getCore().byId("idFGOUComboDepot");
										 			 oComboDepot.setModel(oModelDepot);
										 			 oComboDepot.setSelectedKey(depotEdiData[0].key);
										 			 oComboDepot.bindItems("/data", new sap.ui.core.ListItem({text: "{text}", key:"{key}"}));
										 		 }
													 if(oJSONFGOUExcelData)
														 oJSONFGOUExcelData = [];

														 ofgou.setExcelFGOUPage();
			                            	   if(oFGOUExcel != null){
			                            		   oJSONFGOUExcelData = [];
			                            		   oFGOUExcel.loadData(oJSONFGOUExcelData);
			                            	  }

	                                       }});
	        oContainer.addTile(oFGOUTile);

            // EDI Log
	        //var ofsum = new fsum();
	        var oFSUMTile = new sap.m.StandardTile({
	        							   id : "idFSUMTile",
	        							   icon :sap.ui.core.IconPool.getIconURI("performance"),
			                               title:"EDI Log",
			                               press: function(){
				                            	   /*sap.ui.getCore().byId("idFGOUButtonAdd5").setEnabled(true);
				                            	   sap.ui.getCore().byId("idFGOUButtonValidate").setEnabled(true);
				                            	   sap.ui.getCore().byId("idFGOUButtonSubmit").setEnabled(false);
				                            	   sap.ui.getCore().byId("idFGOUButtonPrint").setEnabled(false);
				                            	   appedi.to("idFGOU");*/

					                            	   var bus = sap.ui.getCore().getEventBus();
											   								   bus.publish("nav", "to", {id : "FSUM"});
											   								   $('#idHdrContnt').html('EDI - Summary');

																					 var oFLOG = new flog();
																					 oFLOG.resetFLOG();

																					 if(sap.ui.getCore().byId("idFSUMFormCurrentGraphs"))
																							sap.ui.getCore().byId("idFSUMFormCurrentGraphs").setVisible(false);

																					 if(sap.ui.getCore().byId("idFSUMFormLastGraphs"))
																							sap.ui.getCore().byId("idFSUMFormLastGraphs").setVisible(false);

																							if(sap.ui.getCore().byId("idFSUMComboDepot"))
																								 sap.ui.getCore().byId("idFSUMComboDepot").setSelectedKey();

	                                       }});
	        oContainer.addTile(oFSUMTile);

            // EDI Search
	        var ofserdet = new fserdet();
	        var oFSERDETTile = new sap.m.StandardTile({
													 visible : false,
	        							   id : "idFSERDETTile",
	        							   icon :sap.ui.core.IconPool.getIconURI("search"),
			                               title:"EDI Search",
			                               press: function(){
			                            	   /*sap.ui.getCore().byId("idFGOUButtonAdd5").setEnabled(true);
			                            	   sap.ui.getCore().byId("idFGOUButtonValidate").setEnabled(true);
			                            	   sap.ui.getCore().byId("idFGOUButtonSubmit").setEnabled(false);
			                            	   sap.ui.getCore().byId("idFGOUButtonPrint").setEnabled(false);
			                            	   appedi.to("idFGOU");*/

			                            	   var bus = sap.ui.getCore().getEventBus();
			   								   bus.publish("nav", "to", {id : "FSERDET"});
			   								   $('#idHdrContnt').html('EDI - Search');
			   								   ofserdet.resetFSERDET();

	                                       }});
	        oContainer.addTile(oFSERDETTile);


	        return oContainer;

	    }

	});

	function alertt(){
		   alert("done done done");
	}

	var dateFormatterYYYYMMDD = function(value){
		var intdate = value;
	  var splitdate = intdate.split('/');
	  var date, month, year;
	  if(splitdate.length != 3){

	  }else{
	    if(splitdate[0].length == 1){
	      date = "0" + splitdate[0];
	    }else{
	      date = splitdate[0];
	    }

	    if(splitdate[1].length == 1){
	      month = "0" + splitdate[1];
	    }else{
	      month = splitdate[1];
	    }

	    year = splitdate[2];

	    return year + month + date; //date + "/" + month + "/" + year;
	}
};

	var dateRenderer = function(instance, td, row, col, prop, value, cellProperties){
		if(!value){
			td.innerHTML = "";
		}else{


	  var intdate = value;
	  var splitdate = intdate.split('/');
	  var date, month, year;
	  if(splitdate.length != 3){
	    td.innerHTML = "";
	  }else{
	    if(splitdate[0].length == 1){
	      date = "0" + splitdate[0];
	    }else{
	      date = splitdate[0];
	    }

	    if(splitdate[1].length == 1){
	      month = "0" + splitdate[1];
	    }else{
	      month = splitdate[1];
	    }

	    year = splitdate[2];

	    td.innerHTML = date + "/" + month + "/" + year;

	  }
		}
	};

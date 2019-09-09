var oJSONFRCNSAPData = [];
var oSTRINGFRCNValidationMessage = "";
var globalFRCNStringCount = 0;
var globalFRCNStringError = "";

sap.ui.model.json.JSONModel.extend("frcn", {

	/*FRCN : Create File Upload Page */

	createFRCNPage : function(){

		var oCurrent = this;

		var backEDI = new sap.m.Link({text: " < Back",
      	  width:"7%",
      	  wrapping:true,
      	  press: function(){
      		  var bus = sap.ui.getCore().getEventBus();
      		  bus.publish("nav", "back");
      		$('#idHdrContnt').html('EDI Process');
     	  }});

		/* Depot Number */

		var oFRCNComboDepot = new sap.ui.commons.ComboBox("idFRCNComboDepot",{
			visible: true,
				width:"300px",
				displaySecondaryValues:true,
				placeholder: "Depot",
				selectionChange: function(evnt){
					//oCurrent.resetFRCNKeyFields();
				},
			}).addStyleClass("FormInputStyle marginTop7");

		var oFRCNModelDepot = new sap.ui.model.json.JSONModel();
		oFRCNModelDepot.setSizeLimit(99999);
		oFRCNModelDepot.setData({data:depotEdiData});

		oFRCNComboDepot.setModel(oFRCNModelDepot);
		oFRCNComboDepot.setSelectedKey(depotEdiData[0].key);
		oFRCNComboDepot.bindItems("/data", new sap.ui.core.ListItem({text: "{text}", key:"{key}"}));


        var oFRCNLabelDepot = new sap.m.Label("idFRCNLabelDepot",{
			  text : "Depot",
			  width : "130px"
        }).addStyleClass("selectionLabels");

		var oFRCNFlexDepot = new sap.m.FlexBox("idFRCNFlexDepot",{
            items: [oFRCNLabelDepot,
                    oFRCNComboDepot
                    ],
            direction: "Row"
		}).addStyleClass("marginMainLeft marginTop20");

		var oFRCNExcelContainer = new sap.ui.core.HTML("idFRCNExcelContainer").addStyleClass("marginLeft marginTop20");
        var oFRCNExcelHTML = '<div id="idFRCNExcel" style="width:85%;height:500px" class="marginMainLeft marginTop20">';
        oFRCNExcelContainer.setContent(oFRCNExcelHTML);


        var oFRCNButtonAdd5 = new sap.m.Button("idFRCNButtonAdd5",{
			  text : "Insert 5 Lines",
			  width:"130px",
			  styled:false,
			  visible: true,
			  //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: true}),
			  press:function(){
				  debugger;
				  	var oJSONFRCNExcelDataLength = oFRCNExcel.getData().length;
					var oJSONFRCNExcelDataLengthAllowed = 25 - oFRCNExcel.getData().length;
					if(oJSONFRCNExcelDataLength < 25){
					if(oJSONFRCNExcelDataLength < 20){
						oFRCNExcel.alter('insert_row', '', 5);
					}else{
						oFRCNExcel.alter('insert_row', '', oJSONFRCNExcelDataLengthAllowed);
					}
					}
					else{
					sap.ui.commons.MessageBox.alert("Sorry, Max. Entries is 25!");
					}
		}}).addStyleClass("normalBtn");

        var oFRCNButtonValidate = new sap.m.Button("idFRCNButtonValidate",{
			  text : "Validate",
			  width:"100px",
			  styled:false,
			  visible: true,
			  //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: true}),
			  press:function(){
					//oCurrent.validateFRCN();
					
					var isFrontEndValid = false;
					isFrontEndValid = oCurrent.validateFRCNFrontEnd();
					var validFRCNLength = checkFRCNValidLinesLength(oJSONFRCNExcelData);
					globalFRCNStringError = "";

					if(isFrontEndValid){
					globalFRCNStringCount = 0;
					do {
					  oCurrent.validateFRCN(validFRCNLength);
					}while(globalFRCNStringCount < validFRCNLength);

					if(globalFRCNStringError != ""){
						jQuery.sap.require("sap.m.MessageBox");
						sap.m.MessageBox.show(globalFRCNStringError,
										sap.m.MessageBox.Icon.ERROR,
										"Error",
										[sap.m.MessageBox.Action.OK],
										function goBack(){

										},sap.m.MessageBox.Action.OK);

					}else{
						oFRCNExcel.loadData(oJSONFRCNExcelData);
						sap.ui.getCore().byId("idFRCNButtonValidate").setEnabled(false);
						sap.ui.getCore().byId("idFRCNButtonSubmit").setEnabled(true);
					}


				}

		}}).addStyleClass("normalBtn");

        var oFRCNButtonSubmit = new sap.m.Button("idFRCNButtonSubmit",{
			  text : "Submit",
			  width:"100px",
			  styled:false,
			  visible: true,
			  enabled: false,
			  //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: true}),
			  press:function(){
					//oCurrent.submitFRCN();
					
					var validFRCNLength = checkFRCNValidLinesLength(oJSONFRCNExcelData);
					globalFRCNStringCount = 0;
					do {
					  oCurrent.submitFRCN(validFRCNLength);
					}while(globalFRCNStringCount < validFRCNLength);

					//oFRCNExcel.loadData(oJSONFRCNExcelData);
					//sap.ui.getCore().byId("idFRCNButtonValidate").setEnabled(false);
					//sap.ui.getCore().byId("idFRCNButtonSubmit").setEnabled(true);

		}}).addStyleClass("normalBtn");

        var oFRCNButtonPrint = new sap.m.Button("idFRCNButtonPrint",{
			  text : "Print",
			  width:"100px",
			  styled:false,
			  visible: true,
			  //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: true}),

			  press:function(){

				  var oJSONFRCNSAPDataPrint = [];
				  var formattedDate = "";

				  for(var i=0; i<oJSONFRCNSAPData.length; i++){
					  if(oJSONFRCNSAPData[i].Date != ""){
						  formattedDate = oJSONFRCNSAPData[0].Date.substr(6,2) + "/" +
						  				  oJSONFRCNSAPData[0].Date.substr(4,2) + "/" +
						  				  oJSONFRCNSAPData[0].Date.substr(0,4);
					  }

					  oJSONFRCNSAPDataPrint.push({
						  "Serial No. " : oJSONFRCNSAPData[i].Serial,
						  "Date " : formattedDate,
						  "Estimate " : ( oJSONFRCNSAPData[i].Estimate == undefined )?"":oJSONFRCNSAPData[i].Estimate,
					  });
				  }

				  var oUtilityEDI = new utility();
					var depottext = "Depot : " + sap.ui.getCore().byId("idFRCNComboDepot").getValue();
				  var tab = oUtilityEDI.makeHTMLTableEDI(oJSONFRCNSAPDataPrint, "Repair Completion", "print", depottext);
	        	  var newWin = window.open();
	        	  newWin.document.write(tab);
	        	  newWin.print();
		}}).addStyleClass("normalBtn");

        var oFRCNButtonReset = new sap.m.Button("idFRCNButtonReset",{
			  text : "Reset",
			  width:"100px",
			  styled:false,
			  visible: true,
			  //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: true}),
			  press:function(){
				  oCurrent.resetFRCN();
		}}).addStyleClass("normalBtn");

		var oFRCNFlexButtons = new sap.m.FlexBox("idFRCNFlexButtons",{
            items: [oFRCNButtonAdd5,
                    oFRCNButtonValidate,
                    oFRCNButtonSubmit,
                    oFRCNButtonPrint,
                    oFRCNButtonReset
                    ],
            direction: "Row"
		}).addStyleClass("marginMainLeft marginTop20");

		var oFRCNFlexFinal = new sap.m.FlexBox("idFRCNFlexFinal",{
            items: [ backEDI,
                     oFRCNFlexDepot,
                     oFRCNFlexButtons,
                     oFRCNExcelContainer
                    ],
            direction: "Column"
		}).addStyleClass("marginMainLeft");


		return oFRCNFlexFinal;

    },

    /*FRCN : Submit Repair Completion */

    submitFRCN : function(validLength){

    	var oCurrent = this;
		var stringToPass = "";
		var stringCount = 1;
		var depot = sap.ui.getCore().byId("idFRCNComboDepot").getSelectedKey();

		var startNumber = globalFRCNStringCount;
		var endNumber = 0;
		endNumber = globalFRCNStringCount + 25;
		if(endNumber > validLength){
			endNumber = validLength;
		}

		for(var i =startNumber; i < endNumber; i++){
			if(stringToPass == ""){
				stringToPass = stringToPass + "Submit eq 'X' and " + "IRcn" + stringCount + " eq '" + oJSONFRCNSAPData[i].Serial + "$" +
				oJSONFRCNSAPData[i].Date   + "$" +
				depot  + "$" +
				sessionStorage.uName.toUpperCase() + "'";
			}
			else{
				stringToPass = stringToPass + " and IRcn" + stringCount + " eq '" + oJSONFRCNSAPData[i].Serial + "$" +
				oJSONFRCNSAPData[i].Date   + "$" +
				depot + "'";
			}
			stringCount++;
		}

		oModel = new sap.ui.model.odata.ODataModel(serviceEDIDOC, true);
		var oMODELFRCN = serviceEDIDOC + "FRCNSet?$filter=" + stringToPass;

		busyDialog.open();
		console.log(oMODELFRCN);
		OData.request({
		      requestUri: oMODELFRCN,
		      method: "GET",
					dataType: 'json',
					async : false,
		      headers:
		       {
		          "X-Requested-With": "XMLHttpRequest",
		          "Content-Type": "application/json; charset=utf-8",
		          "DataServiceVersion": "2.0",
		          "X-CSRF-Token":"Fetch"
		      }
		    },
		    function (data, response){
					if(endNumber == validLength){
						busyDialog.close();
						console.log("Above request : Success");
		    		sap.ui.commons.MessageBox.alert("Submitted!");
		    		sap.ui.getCore().byId("idFRCNButtonAdd5").setEnabled(false);
						sap.ui.getCore().byId("idFRCNButtonValidate").setEnabled(false);
						sap.ui.getCore().byId("idFRCNButtonSubmit").setEnabled(false);
						sap.ui.getCore().byId("idFRCNButtonPrint").setEnabled(true);
					}
		    },function(err){
		    	 console.log("Above Request : Error");
		    	 busyDialog.close();
		    	 sap.ui.commons.MessageBox.alert("There is an error; Please try again later.");
		    });

				globalFRCNStringCount = endNumber;

    },


		/*FRCN : Validate Repair Completion Frontend */

		validateFRCNFrontEnd : function(){
		
			jQuery.sap.require("sap.ui.commons.MessageBox");

			var oCurrent = this;
			var isValid = true;
			var tempDateArray = [];
			var tempDate = "";
			var j = 0;
			oJSONFRCNSAPData = [];
			var datainsert = false;
			var countIncomplete = 0;
			var isIncomplete = false;
			oSTRINGFRCNValidationMessage = "";
			var depot = sap.ui.getCore().byId("idFRCNComboDepot").getSelectedKey();

			for(var i =0; i < oJSONFRCNExcelData.length;i++){
				isValid = true;
				j = 0;
				datainsert = true;
				countIncomplete = 0;
	 			while(j<2){
	 				if(oJSONFRCNExcelData[i][j] == "" || oJSONFRCNExcelData[i][j] == null){
	 					datainsert = false;
	 					countIncomplete = countIncomplete + 1;
	 				}
	 				j++;
	 			}

	 			if(isIncomplete == false && ( countIncomplete != 2 && countIncomplete != 0)){
	 				isIncomplete = true;
	 			}

	 			if(datainsert){

	 				if(!oCurrent.validateFRCNUnitNumber(oJSONFRCNExcelData[i][0])){
	 					oSTRINGFRCNValidationMessage = oSTRINGFRCNValidationMessage +
	 										" Line No. " + (i + 1) + " : Enter a valid serial number\n";
	 					isValid = false;
	 				}

	 				if(oJSONFRCNExcelData[i][1] == ""){
	 					oSTRINGFRCNValidationMessage = oSTRINGFRCNValidationMessage +
						" Line No. " + (i + 1) + " : Enter a valid Date\n ---------------------- \n";
	 				}

	 				if(isValid){
	 					tempDate = dateFormatterYYYYMMDD(oJSONFRCNExcelData[i][1]);

		 				oJSONFRCNSAPData.push({
		 					"Serial":oJSONFRCNExcelData[i][0].toUpperCase(),
		 					"Date":tempDate,
		 					//"Mo":oJSONFRCNExcelData[i][2],
		 					//"EstType":oJSONFRCNExcelData[i][3],
		 				});

	 				}
	 			}
			 }
			 
			//oSTRINGFRCNValidationMessage = ""; // CLRFRNTVALID Clear frontend validation
			if(depot == ""){
				sap.ui.getCore().byId("idFRCNButtonValidate").setEnabled(true);
	           	sap.ui.getCore().byId("idFRCNButtonSubmit").setEnabled(false);
				sap.ui.commons.MessageBox.alert("Please enter a depot ID");
				return false;
			}else if(oSTRINGFRCNValidationMessage != ""){
				sap.ui.getCore().byId("idFRCNButtonValidate").setEnabled(true);
	           	sap.ui.getCore().byId("idFRCNButtonSubmit").setEnabled(false);
				sap.ui.commons.MessageBox.alert(oSTRINGFRCNValidationMessage);
				return false;
			}
			// else if(oJSONFRCNSAPData.length > 25){
			// 	sap.ui.commons.MessageBox.alert("Sorry, Max. Entries is 25!");
			// 	return;
			// }
			else if(oJSONFRCNSAPData.length == 0 || isIncomplete == true){
					sap.ui.getCore().byId("idFRCNButtonValidate").setEnabled(true);
		      sap.ui.getCore().byId("idFRCNButtonSubmit").setEnabled(false);
					sap.ui.commons.MessageBox.alert("Enter at least one entry! \n Please enter all the mandatory fields." );
					return false;
			}else{
					return true;
			};

		},

    /*FRCN : Validate Repair Completion */

    validateFRCN : function(validLength){

    	jQuery.sap.require("sap.ui.commons.MessageBox");

			var oCurrent = this;
			var isValid = true;
			var tempDateArray = [];
			var tempDate = "";
			var j = 0;
			//oJSONFRCNSAPData = [];
			var datainsert = false;
			var countIncomplete = 0;
			var isIncomplete = false;
			oSTRINGFRCNValidationMessage = "";
			var depot = sap.ui.getCore().byId("idFRCNComboDepot").getSelectedKey();

			var stringToPass = "";
			var stringCount = 1;

			var startNumber = globalFRCNStringCount;
				var endNumber = 0;
				endNumber = globalFRCNStringCount + 25;
				if(endNumber > validLength){
					endNumber = validLength;
				}

				for(var i =startNumber; i < endNumber; i++){
	    			if(stringToPass == ""){
	    				stringToPass = stringToPass + "Submit eq '' and " + "IRcn" + stringCount + " eq '" + oJSONFRCNSAPData[i].Serial + "$" +
	    				oJSONFRCNSAPData[i].Date  + "$" +
	    				//oJSONFRCNSAPData[i].Mo  + "$" +
	    				//oJSONFRCNSAPData[i].EstType  + "$" +
	    				depot  + "$" +
							sessionStorage.uName.toUpperCase() + "'";
	    			}
	    			else{
	    				stringToPass = stringToPass + " and IRcn" + stringCount + " eq '" + oJSONFRCNSAPData[i].Serial + "$" +
	    				oJSONFRCNSAPData[i].Date   + "$" +
	    				//oJSONFRCNSAPData[i].Mo   + "$" +
	    				//oJSONFRCNSAPData[i].EstType  + "$" +
	    				depot + "'";
	    			}
	    			stringCount++;
	    		}

	    		oModel = new sap.ui.model.odata.ODataModel(serviceEDIDOC, true);
	    		var oMODELFRCN = serviceEDIDOC + "FRCNSet?$filter=" + stringToPass;

	    		busyDialog.open();
	    		console.log(oMODELFRCN);
	    		OData.request({
	    		      requestUri: oMODELFRCN,
	    		      method: "GET",
								dataType: 'json',
								async : false,
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
								console.log("Above request : Success");

								var errLine = globalFRCNStringCount;
								for(var i=0; i<data.results.length; i++){
									if(globalFRCNStringError == '' && data.results[i].ErrMsg != ""){
										globalFRCNStringError = "Line " + (errLine + 1) + " : " + data.results[i].ErrMsg;
									}else if(data.results[i].ErrMsg != ""){
										globalFRCNStringError = globalFRCNStringError + '\n' + "Line " + (errLine + 1) + " : " + data.results[i].ErrMsg;
									}
									errLine = errLine + 1;
								}
	    		    },function(err){
	    		    	 console.log("Above Request : Error");
	    		    	 busyDialog.close();
	    		    	 sap.ui.commons.MessageBox.alert("There is an error; Please try again later.");
							});
							
							globalFRCNStringCount = endNumber;

			
		},

		/*FRCN : Validate Unit Number */

		validateFRCNUnitNumber : function (unitnumber){

		       unitnumber =  $.trim(unitnumber);
		       if(unitnumber == ''){
                   //sap.ui.commons.MessageBox.alert("Either Unit Number or Document Type input missing.\n Please check your inputs and retry.");
                   return false;
		       }

		       /*if(unitnumber.length != 11){
                   //sap.ui.commons.MessageBox.alert("You have input an invalid Unit Number.\n Please enter a valid  Unit Number -11-char alpha numeric.");
                   return false;
		       }*/
		       var validateInput = unitnumber.substr(0,4);
		       if(!(/^[a-zA-Z\s]+$/.test(validateInput))){
                   //sap.ui.commons.MessageBox.alert("You have input an invalid Unit Number.\n Please enter a valid  Unit Number -11-char alpha numeric.");
                   return false;
		       }

		        var validateInput = unitnumber.substr(4,7);
		       if(!(/^[0-9]+$/.test(validateInput))) {
                   //sap.ui.commons.MessageBox.alert("You have input an invalid Unit Number.\n Please enter a valid  Unit Number -11-char alpha numeric.");
                   return false;
		       }
		       return true;
		},

		/*FRCN : Validate Return Authorization */

		validateFRCNRA : function (ranumber){

			   ranumber =  $.trim(ranumber);
		       if(ranumber == ''){
                   //sap.ui.commons.MessageBox.alert("Either Unit Number or Document Type input missing.\n Please check your inputs and retry.");
                   return false;
		       }

		       if(ranumber.length != 6){
                   //sap.ui.commons.MessageBox.alert("You have input an invalid Unit Number.\n Please enter a valid  Unit Number -11-char alpha numeric.");
                   return false;
		       }

		       if(!(/^[0-9]+$/.test(ranumber))) {
                   //sap.ui.commons.MessageBox.alert("You have input an invalid Unit Number.\n Please enter a valid  Unit Number -11-char alpha numeric.");
                   return false;
		       }
		       return true;
		},

		/*FRCN : Set Excel Repair Completion Page */

	    setExcelFRCNPage : function(){

	    	/* FRCN - Repair Completion - Excel - Setup */

			/* FRCN - JSON - Excel Data */
			/* Serial No. - Status - Repair Completion Date - RA Number - Previous On Hire Location - Previous On Hire Date*/

	    	var moDd = [	  //"M",
	  		              	  "C",
													 //"R"
	  		             ];

	    	// var estType = [	"D - Original Estimate",
				// 								"Y - Joint Survey",
	  		//               	"QA - Additional Concealed Damage",
	  		//               	"QB - Additional Age Related Deterioration",
	  		//               	"QC - Additional Component Failure",
	  		//               	"QD - Additional Special Modification",
		  	// 	            	"QE - Additional Special Cleaning",
		  	// 	            	"X - Pre-Delivery",
		  	// 	            	"Z - Pre-Sale"
	  		//              ];

				var estType = [	"D",
												"E",
												"G",
												"L"
										 ];


	          		    var container = document.getElementById('idFRCNExcel');
	          		  	oFRCNExcel = new Handsontable(container, {
	          	          data : oJSONFRCNExcelData,  //binding the model
		          	        minSpareRows: 5,
		       	           	height: 600,
		       	           	renderAllRows: true,
		       	           	renderAllColumns: true,
		       	           	//width: 500,
		       	           	//minRows: 5,
		       	           	//maxRows: 25,
		       	           	rowHeaders: true,
		       	           	colHeaders: true,
	          	           	colHeaders: ["Serial Number", // 0
	          	           	             "Comp. Date(DD/MM/YYYY)", // 1
	          	           	             "Work Order", // 2
	          	           	             //"Est. Type", // 3
	          	           	             //"Work Order"  // 4
	          	           	             ],
	          	           	    contextMenu: true,
	          					columns: [
		          					  // Serial Number
		          					  {
		          						  width: 130
		          					  },
		           					  // COMP Date
		          					  {
														type: 'date',
														dateFormat: 'DD/MM/YYYY',
														correctFormat: false,
														width: 210,
														renderer : dateRenderer
		          					  },

		          					  // M or O
		          					  // {
		           						//   type: 'dropdown',
		           						//   source: moDd,
		           						//   width: 100
		           					  // },
		           					  // Estimate Type
		          					  // {
		           						//   type: 'dropdown',
		           						//   source: estType,
		           						//   width: 300
		           					  // },
		          					  // Estimate Number
		          					  {
		          							width: 180,
		          							readOnly : true
		          					  }
	          					  ],
	          					  //rowHeaders: true,
			          	           	manualColumnResize:true,
			          	           	autoColumnSize: {
			          	           	    "samplingRatio": 23
			          	           	},
			          	           	afterChange : function(event){
				          	           	sap.ui.getCore().byId("idFRCNButtonAdd5").setEnabled(true);
			          	           		sap.ui.getCore().byId("idFRCNButtonValidate").setEnabled(true);
			          	           		sap.ui.getCore().byId("idFRCNButtonSubmit").setEnabled(false);
			          	           		sap.ui.getCore().byId("idFRCNButtonPrint").setEnabled(false);
			          	           	}
	          	       });
	    },

	    resetFRCN : function(){
		       var oCurrent = this;

		       oCurrent.setExcelFRCNPage();
	     	   if(oFRCNExcel != null){
	     		   oJSONFRCNExcelData = [];
	     		   oFRCNExcel.loadData(oJSONFRCNExcelData);
	     	   }

	     	  if(sap.ui.getCore().byId("idFRCNComboDepot") != undefined)
					sap.ui.getCore().byId("idFRCNComboDepot").setSelectedKey("");

	     	 sap.ui.getCore().byId("idFRCNButtonAdd5").setEnabled(true);
	      	 sap.ui.getCore().byId("idFRCNButtonValidate").setEnabled(true);
	      	 sap.ui.getCore().byId("idFRCNButtonSubmit").setEnabled(false);
	      	 sap.ui.getCore().byId("idFRCNButtonPrint").setEnabled(false);


		    }



});

function isValidDate(dateString) {
	  var regEx = /^\d{4}-\d{2}-\d{2}$/;
	  if(!dateString.match(regEx)) return false;  // Invalid format
	  var d = new Date(dateString);
	  if(!d.getTime() && d.getTime() !== 0) return false; // Invalid date
	  return d.toISOString().slice(0,10) === dateString;
}

function checkFRCNValidLinesLength(exceldata) {
	var retLength = 0;
 for(var i=0; i<exceldata.length; i++){
	 loop1 : for (var key in exceldata[i]) {
			 if (exceldata[i][key] != null && exceldata[i][key] != ""){
				 retLength = retLength + 1;
					 break loop1;
			 }
					 //return false;

	 }
 }

 return retLength;
}

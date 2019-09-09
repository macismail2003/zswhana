var oJSONFGOUSAPData = [];
var oSTRINGFGOUValidationMessage = "";
var globalFGOUStringCount = 0;
var globalFGOUStringError = "";

sap.ui.model.json.JSONModel.extend("fgou", {

	/*FGOU : Create File Upload Page */

	createFGOUPage : function(){

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

		var oFGOUComboDepot = new sap.ui.commons.ComboBox("idFGOUComboDepot",{
			visible: true,
				width:"300px",
				displaySecondaryValues:true,
				placeholder: "Depot",
				selectionChange: function(evnt){
					//oCurrent.resetFGOUKeyFields();
				},
			}).addStyleClass("FormInputStyle marginTop7");

		var oFGOUModelDepot = new sap.ui.model.json.JSONModel();
		oFGOUModelDepot.setSizeLimit(99999);
		oFGOUModelDepot.setData({data:depotEdiData});

		oFGOUComboDepot.setModel(oFGOUModelDepot);
		oFGOUComboDepot.setSelectedKey(depotEdiData[0].key);
		oFGOUComboDepot.bindItems("/data", new sap.ui.core.ListItem({text: "{text}", key:"{key}"}));


        var oFGOULabelDepot = new sap.m.Label("idFGOULabelDepot",{
			  text : "Depot",
			  width : "130px"
        }).addStyleClass("selectionLabels");

		var oFGOUFlexDepot = new sap.m.FlexBox("idFGOUFlexDepot",{
            items: [oFGOULabelDepot,
                    oFGOUComboDepot
                    ],
            direction: "Row"
		}).addStyleClass("marginMainLeft marginTop20");

		var oFGOUExcelContainer = new sap.ui.core.HTML("idFGOUExcelContainer").addStyleClass("marginLeft marginTop20");
        var oFGOUExcelHTML = '<div id="idFGOUExcel" style="width:85%;height:500px" class="marginMainLeft marginTop20">';
        oFGOUExcelContainer.setContent(oFGOUExcelHTML);


        var oFGOUButtonAdd5 = new sap.m.Button("idFGOUButtonAdd5",{
			  text : "Insert 5 Lines",
			  width:"130px",
			  styled:false,
			  visible: true,
			  //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: true}),
			  press:function(){
				  debugger;
				  	var oJSONFGOUExcelDataLength = oFGOUExcel.getData().length;
					var oJSONFGOUExcelDataLengthAllowed = 25 - oFGOUExcel.getData().length;
					if(oJSONFGOUExcelDataLength < 25){
					if(oJSONFGOUExcelDataLength < 20){
						oFGOUExcel.alter('insert_row', '', 5);
					}else{
						oFGOUExcel.alter('insert_row', '', oJSONFGOUExcelDataLengthAllowed);
					}
					}
					else{
					sap.ui.commons.MessageBox.alert("Sorry, Max. Entries is 25!");
					}
		}}).addStyleClass("normalBtn");

        var oFGOUButtonValidate = new sap.m.Button("idFGOUButtonValidate",{
			  text : "Validate",
			  width:"100px",
			  styled:false,
			  visible: true,
			  //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: true}),
			  press:function(){
					//oCurrent.validateFGOU();
					
					var isFrontEndValid = false;
					isFrontEndValid = oCurrent.validateFGOUFrontEnd();
					var validFGOULength = checkFGOUValidLinesLength(oJSONFGOUExcelData);
					globalFGOUStringError = "";

					if(isFrontEndValid){
					globalFGOUStringCount = 0;
					do {
					  oCurrent.validateFGOU(validFGOULength);
					}while(globalFGOUStringCount < validFGOULength);

					if(globalFGOUStringError != ""){
						jQuery.sap.require("sap.m.MessageBox");
						sap.m.MessageBox.show(globalFGOUStringError,
										sap.m.MessageBox.Icon.ERROR,
										"Error",
										[sap.m.MessageBox.Action.OK],
										function goBack(){

										},sap.m.MessageBox.Action.OK);

					}else{
						oFGOUExcel.loadData(oJSONFGOUExcelData);
						sap.ui.getCore().byId("idFGOUButtonValidate").setEnabled(false);
						sap.ui.getCore().byId("idFGOUButtonSubmit").setEnabled(true);
					}


				}

		}}).addStyleClass("normalBtn");

        var oFGOUButtonSubmit = new sap.m.Button("idFGOUButtonSubmit",{
			  text : "Submit",
			  width:"100px",
			  styled:false,
			  visible: true,
			  enabled: false,
			  //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: true}),
			  press:function(){
					//oCurrent.submitFGOU();
					
					var validFGOULength = checkFGOUValidLinesLength(oJSONFGOUExcelData);
					globalFGOUStringCount = 0;
					do {
					  oCurrent.submitFGOU(validFGOULength);
					}while(globalFGOUStringCount < validFGOULength);

					// oFGOUExcel.loadData(oJSONFGOUExcelData);
					// sap.ui.getCore().byId("idFGOUButtonValidate").setEnabled(false);
					// sap.ui.getCore().byId("idFGOUButtonSubmit").setEnabled(true);

		}}).addStyleClass("normalBtn");

        var oFGOUButtonPrint = new sap.m.Button("idFGOUButtonPrint",{
			  text : "Print",
			  width:"100px",
			  styled:false,
			  visible: true,
			  //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: true}),
			  press:function(){

				  var oJSONFGOUSAPDataPrint = [];
				  var formattedDate = "";

				  for(var i=0; i<oJSONFGOUSAPData.length; i++){
					  if(oJSONFGOUSAPData[i].Date != ""){
						  formattedDate = oJSONFGOUSAPData[0].Date.substr(6,2) + "/" +
						  				  oJSONFGOUSAPData[0].Date.substr(4,2) + "/" +
						  				  oJSONFGOUSAPData[0].Date.substr(0,4);
					  }

					  oJSONFGOUSAPDataPrint.push({
						  "Serial No. " : oJSONFGOUSAPData[i].Serial,
						  "Date " : formattedDate,
						  "Release " : oJSONFGOUSAPData[i].Release
					  });
				  }

				  var oUtilityEDI = new utility();
					var depottext = "Depot : " + sap.ui.getCore().byId("idFGOUComboDepot").getValue();
				  var tab = oUtilityEDI.makeHTMLTableEDI(oJSONFGOUSAPDataPrint, "Gate OUT", "print", depottext);
	        	  var newWin = window.open();
	        	  newWin.document.write(tab);
	        	  newWin.print();

		}}).addStyleClass("normalBtn");

        var oFGOUButtonReset = new sap.m.Button("idFGOUButtonReset",{
			  text : "Reset",
			  width:"100px",
			  styled:false,
			  visible: true,
			  //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: true}),
			  press:function(){
				  oCurrent.resetFGOU();
		}}).addStyleClass("normalBtn");

		var oFGOUFlexButtons = new sap.m.FlexBox("idFGOUFlexButtons",{
            items: [oFGOUButtonAdd5,
                    oFGOUButtonValidate,
                    oFGOUButtonSubmit,
                    oFGOUButtonPrint,
                    oFGOUButtonReset
                    ],
            direction: "Row"
		}).addStyleClass("marginMainLeft marginTop20");

		var oFGOUFlexFinal = new sap.m.FlexBox("idFGOUFlexFinal",{
            items: [ backEDI,
                     oFGOUFlexDepot,
                     oFGOUFlexButtons,
                     oFGOUExcelContainer
                    ],
            direction: "Column"
		}).addStyleClass("marginMainLeft");


		return oFGOUFlexFinal;

    },

    /*FGOU : Submit Gate OUT */

    submitFGOU : function(validLength){

    var oCurrent = this;
		var stringToPass = "";
		var stringCount = 1;
		var depot = sap.ui.getCore().byId("idFGOUComboDepot").getSelectedKey();
		
		var startNumber = globalFGOUStringCount;
		var endNumber = 0;
		endNumber = globalFGOUStringCount + 25;
		if(endNumber > validLength){
			endNumber = validLength;
		}

		for(var i =startNumber; i < endNumber; i++){
			if(stringToPass == ""){
				stringToPass = stringToPass + "Submit eq 'X' and " + "IGatout" + stringCount + " eq '" + oJSONFGOUSAPData[i].Serial + "$" +
				oJSONFGOUSAPData[i].Date + "$" +
				oJSONFGOUSAPData[i].Release  + "$" +
				depot  + "$" +
				sessionStorage.uName.toUpperCase() + "'";
			}
			else{
				stringToPass = stringToPass + " and IGatout" + stringCount + " eq '" + oJSONFGOUSAPData[i].Serial + "$" +
				oJSONFGOUSAPData[i].Date + "$" +
				oJSONFGOUSAPData[i].Release  + "$" +
				depot + "'";
			}
			stringCount++;
		}

		oModel = new sap.ui.model.odata.ODataModel(serviceEDIDOC, true);
		var oMODELFGOU = serviceEDIDOC + "FGOUSet?$filter=" + stringToPass;

		busyDialog.open();
		console.log(oMODELFGOU);
		OData.request({
		      requestUri: oMODELFGOU,
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
		    		sap.ui.getCore().byId("idFGOUButtonAdd5").setEnabled(false);
            sap.ui.getCore().byId("idFGOUButtonValidate").setEnabled(false);
            sap.ui.getCore().byId("idFGOUButtonSubmit").setEnabled(false);
						sap.ui.getCore().byId("idFGOUButtonPrint").setEnabled(true);
					}
		    },function(err){
		    	 console.log("Above Request : Error");
		    	 busyDialog.close();
		    	 sap.ui.commons.MessageBox.alert("There is an error; Please try again later.");
		    });

				globalFGOUStringCount = endNumber;

    },


		/*FGOU : Validate Gate OUT - Backend*/

    validateFGOUFrontEnd : function(){

			jQuery.sap.require("sap.ui.commons.MessageBox");

			var oCurrent = this;
			var isValid = true;
			var tempDateArray = [];
			var tempDate = "";
			var j = 0;
			oJSONFGOUSAPData = [];
			var datainsert = false;
			var countIncomplete = 0;
			var isIncomplete = false;
			oSTRINGFGOUValidationMessage = "";
			var depot = sap.ui.getCore().byId("idFGOUComboDepot").getSelectedKey();

			for(var i =0; i < oJSONFGOUExcelData.length;i++){
				isValid = true;
				j = 0;
				datainsert = true;
				countIncomplete = 0;
	 			while(j<3){
	 				if(oJSONFGOUExcelData[i][j] == "" || oJSONFGOUExcelData[i][j] == null){
	 					datainsert = false;
	 					countIncomplete = countIncomplete + 1;
	 				}
	 				j++;
	 			}

	 			if(isIncomplete == false && ( countIncomplete != 3 && countIncomplete != 0)){
	 				isIncomplete = true;
	 			}

	 			if(datainsert){

	 				if(!oCurrent.validateFGOUUnitNumber(oJSONFGOUExcelData[i][0])){
	 					oSTRINGFGOUValidationMessage = oSTRINGFGOUValidationMessage +
	 										" Line No. " + (i + 1) + " : Enter a valid serial number\n";
	 					isValid = false;
	 				}

	 				if(!oCurrent.validateFGOURA(oJSONFGOUExcelData[i][2])){
	 					oSTRINGFGOUValidationMessage = oSTRINGFGOUValidationMessage +
							" Line No. " + (i + 1) + " : Enter a valid Release Authorization\n";
	 				}

	 				if(oJSONFGOUExcelData[i][1] == ""){
						isValid = false;
	 					oSTRINGFGOUValidationMessage = oSTRINGFGOUValidationMessage +
						" Line No. " + (i + 1) + " : Enter a valid OUT Date\n ---------------------- \n";
	 				}

	 				if(isValid){
	 					tempDate = dateFormatterYYYYMMDD(oJSONFGOUExcelData[i][1]);

		 				oJSONFGOUSAPData.push({
		 					"Serial":oJSONFGOUExcelData[i][0].toUpperCase(),
		 					"Date":tempDate,
		 					"Release":oJSONFGOUExcelData[i][2]
		 				});

	 				}
	 			}
	 		}

			//oSTRINGFGOUValidationMessage = ""; // CLRFRNTVALID Clear frontend validation
			if(depot == ""){
				sap.ui.getCore().byId("idFGOUButtonValidate").setEnabled(true);
	           	sap.ui.getCore().byId("idFGOUButtonSubmit").setEnabled(false);
				sap.ui.commons.MessageBox.alert("Please enter a valid depot ID");
				return false;
			}else if(oSTRINGFGOUValidationMessage != ""){
				sap.ui.getCore().byId("idFGOUButtonValidate").setEnabled(true);
	           	sap.ui.getCore().byId("idFGOUButtonSubmit").setEnabled(false);
				sap.ui.commons.MessageBox.alert(oSTRINGFGOUValidationMessage);
				return false;
			}
			// else if(oJSONFGOUSAPData.length > 25){
			// 	sap.ui.commons.MessageBox.alert("Sorry, Max. Entries is 25!");
			// 	return false;
			// }
			else if(oJSONFGOUSAPData.length == 0 || isIncomplete == true){
				sap.ui.getCore().byId("idFGOUButtonValidate").setEnabled(true);
	           	sap.ui.getCore().byId("idFGOUButtonSubmit").setEnabled(false);
				sap.ui.commons.MessageBox.alert("Enter at least one entry or \n Please enter all the mandatory fields." );
				return false;
			}else{
				return true;
			}

		},

    /*FGOU : Validate Gate OUT */

    validateFGOU : function(validLength){

    	jQuery.sap.require("sap.ui.commons.MessageBox");

			var oCurrent = this;
			var isValid = true;
			var tempDateArray = [];
			var tempDate = "";
			var j = 0;
			//oJSONFGOUSAPData = [];
			var datainsert = false;
			var countIncomplete = 0;
			var isIncomplete = false;
			oSTRINGFGOUValidationMessage = "";
			var depot = sap.ui.getCore().byId("idFGOUComboDepot").getSelectedKey();
	    var stringToPass = "";
	    var stringCount = 1;

				var startNumber = globalFGOUStringCount;
				var endNumber = 0;
				endNumber = globalFGOUStringCount + 25;
				if(endNumber > validLength){
					endNumber = validLength;
				}

				for(var i =startNumber; i < endNumber; i++){
					if(stringToPass == ""){
						stringToPass = stringToPass + "Submit eq '' and " + "IGatout" + stringCount + " eq '" + oJSONFGOUSAPData[i].Serial + "$" +
						oJSONFGOUSAPData[i].Date + "$" +
						oJSONFGOUSAPData[i].Release  + "$" +
						depot  + "$" +
						sessionStorage.uName.toUpperCase() + "'";
					}
					else{
						stringToPass = stringToPass + " and IGatout" + stringCount + " eq '" + oJSONFGOUSAPData[i].Serial + "$" +
						oJSONFGOUSAPData[i].Date + "$" +
						oJSONFGOUSAPData[i].Release  + "$" +
						depot + "'";
					}
					stringCount++;
				}

				oModel = new sap.ui.model.odata.ODataModel(serviceEDIDOC, true);
				var oMODELFGOU = serviceEDIDOC + "FGOUSet?$filter=" + stringToPass;

				busyDialog.open();
				console.log(oMODELFGOU);
				OData.request({
				      requestUri: oMODELFGOU,
				      method: "GET",
							dataType: 'json',
							async:false,
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

							var errLine = globalFGOUStringCount;
							for(var i=0; i<data.results.length; i++){
								if(globalFGOUStringError == '' && data.results[i].ErrMsg != ""){
									globalFGOUStringError = "Line " + (errLine + 1) + " : " + data.results[i].ErrMsg;
								}else if(data.results[i].ErrMsg != ""){
									globalFGOUStringError = globalFGOUStringError + '\n' + "Line " + (errLine + 1) + " : " + data.results[i].ErrMsg;
								}
								errLine = errLine + 1;
							}
						},function(err){
				    	 console.log("Above Request : Error");
				    	 busyDialog.close();
				    	 sap.ui.commons.MessageBox.alert("There is an error; Please try again later.");
						});
						
						globalFGOUStringCount = endNumber;
			
		},

		/*FGOU : Validate Unit Number */

		validateFGOUUnitNumber : function (unitnumber){

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

		/*FGOU : Validate Release Authorization */

		validateFGOURA : function (ranumber){

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

		/*FGOU : Set Excel Gate OUT Page */

	    setExcelFGOUPage : function(){

	    	/* FGOU - Gate OUT - Excel - Setup */

			/* FGOU - JSON - Excel Data */
			/* Serial No. - Status - Gate OUT Date - RA Number - Previous On Hire Location - Previous On Hire Date*/

	          		    var container = document.getElementById('idFGOUExcel');
	          		  	oFGOUExcel = new Handsontable(container, {
	          	           data : oJSONFGOUExcelData,  //binding the model
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
	          	           	             "OUT Date(DD/MM/YYYY)", // 1
	          	           	             "Release Authorisation",  // 2
	          	           	             ],
	          	           	    contextMenu: true,
	          					columns: [
	          					  // Serial Number
	          					  {
	          						  width: 130
	          					  },
	           					  // OUT Date
	          					  {
													type: 'date',
													dateFormat: 'DD/MM/YYYY',
													correctFormat: false,
													width: 180,
													renderer : dateRenderer
	          					  },
	          					  // RA
	          					  {
	          						width: 180
	          					  }
	          					  ],
	          					  //rowHeaders: true,
			          	           	manualColumnResize:true,
			          	           	autoColumnSize: {
			          	           	    "samplingRatio": 23
			          	           	},
			          	           	afterChange : function(event){
				          	           	sap.ui.getCore().byId("idFGOUButtonAdd5").setEnabled(true);
			          	           		sap.ui.getCore().byId("idFGOUButtonValidate").setEnabled(true);
			          	           		sap.ui.getCore().byId("idFGOUButtonSubmit").setEnabled(false);
			          	           		sap.ui.getCore().byId("idFGOUButtonPrint").setEnabled(false);
			          	           	}
	          	       });
	    },

	    resetFGOU : function(){
		       var oCurrent = this;

		       oCurrent.setExcelFGOUPage();
	     	   if(oFGOUExcel != null){
	     		   oJSONFGOUExcelData = [];
	     		   oFGOUExcel.loadData(oJSONFGOUExcelData);
	     	   }

	     	  if(sap.ui.getCore().byId("idFGOUComboDepot") != undefined)
					sap.ui.getCore().byId("idFGOUComboDepot").setSelectedKey("");

	     	 sap.ui.getCore().byId("idFGOUButtonAdd5").setEnabled(true);
	      	 sap.ui.getCore().byId("idFGOUButtonValidate").setEnabled(true);
	      	 sap.ui.getCore().byId("idFGOUButtonSubmit").setEnabled(false);
	      	 sap.ui.getCore().byId("idFGOUButtonPrint").setEnabled(false);


		    }




});

function isValidDate(dateString) {
	  var regEx = /^\d{4}-\d{2}-\d{2}$/;
	  if(!dateString.match(regEx)) return false;  // Invalid format
	  var d = new Date(dateString);
	  if(!d.getTime() && d.getTime() !== 0) return false; // Invalid date
	  return d.toISOString().slice(0,10) === dateString;
}

function checkFGOUValidLinesLength(exceldata) {
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
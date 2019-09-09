var oJSONFGINSAPData = [];
var oSTRINGFGINValidationMessage = "";
var globalFGINStringCount = 0;
var globalFGINStringError = "";

sap.ui.model.json.JSONModel.extend("fgin", {

	/*FGIN : Create File Upload Page */

	createFGINPage : function(){

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

					var oFGINComboDepot = new sap.ui.commons.ComboBox("idFGINComboDepot",{
						visible: true,
							width:"300px",
							displaySecondaryValues:true,
							placeholder: "Depot",
							selectionChange: function(evnt){
								//oCurrent.resetFGINKeyFields();
							},
						}).addStyleClass("FormInputStyle marginTop7");

					var oFGINModelDepot = new sap.ui.model.json.JSONModel();
					oFGINModelDepot.setSizeLimit(99999);
					oFGINModelDepot.setData({data:depotEdiData});

					oFGINComboDepot.setModel(oFGINModelDepot);
					oFGINComboDepot.setSelectedKey(depotEdiData[0].key);
					oFGINComboDepot.bindItems("/data", new sap.ui.core.ListItem({text: "{text}", key:"{key}"}));

        //oFGINComboDepot.setEnabled(depotEnabled);

//        if(depotEnabled){
//        	oFGINComboDepot.setSelectedKey(depotEdiData[0].key);
//        }else{
//        	oFGINComboDepot.setSelectedKey(depotEdiData[1].key);
//        }


        var oFGINLabelDepot = new sap.m.Label("idFGINLabelDepot",{
			  text : "Depot",
			  width : "130px"
        }).addStyleClass("selectionLabels");

		var oFGINFlexDepot = new sap.m.FlexBox("idFGINFlexDepot",{
            items: [oFGINLabelDepot,
                    oFGINComboDepot
                    ],
            direction: "Row"
		}).addStyleClass("marginMainLeft marginTop20");
		//;height:500px
		var oFGINExcelContainer = new sap.ui.core.HTML("idFGINExcelContainer").addStyleClass("marginLeft marginTop20");
        var oFGINExcelHTML = '<div id="idFGINExcel" style="width:95%" class="marginMainLeft marginTop20">';
        oFGINExcelContainer.setContent(oFGINExcelHTML);


        var oFGINButtonAdd5 = new sap.m.Button("idFGINButtonAdd5",{
			  text : "Insert 5 Lines",
			  width:"130px",
			  styled:false,
			  visible: true,
			  //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: true}),
			  press:function(){

				  	var oJSONFGINExcelDataLength = oFGINExcel.getData().length;
					var oJSONFGINExcelDataLengthAllowed = 25 - oFGINExcel.getData().length;
					if(oJSONFGINExcelDataLength < 25){
					if(oJSONFGINExcelDataLength < 20){
						oFGINExcel.alter('insert_row', '', 5);
					}else{
						oFGINExcel.alter('insert_row', '', oJSONFGINExcelDataLengthAllowed);
					}
					}
					else{
					sap.ui.commons.MessageBox.alert("Sorry, Max. Entries is 25!");
					}
		}}).addStyleClass("normalBtn");

        var oFGINButtonValidate = new sap.m.Button("idFGINButtonValidate",{
			  text : "Validate",
			  width:"100px",
			  styled:false,
			  visible: true,
			  //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: true}),
			  press:function(){

					var isFrontEndValid = false;
					isFrontEndValid = oCurrent.validateFGINFrontEnd();
					var validFGINLength = checkFGINValidLinesLength(oJSONFGINExcelData);
					globalFGINStringError = "";

					if(isFrontEndValid){
					globalFGINStringCount = 0;
					do {
					  oCurrent.validateFGIN(validFGINLength);
					}while(globalFGINStringCount < validFGINLength);

					if(globalFGINStringError != ""){

						jQuery.sap.require("sap.m.MessageBox");
						sap.m.MessageBox.show(globalFGINStringError,
										sap.m.MessageBox.Icon.ERROR,
										"Error",
										[sap.m.MessageBox.Action.OK],
										function goBack(){

										},sap.m.MessageBox.Action.OK);

					}else{
						oFGINExcel.loadData(oJSONFGINExcelData);
						sap.ui.getCore().byId("idFGINButtonValidate").setEnabled(false);
						sap.ui.getCore().byId("idFGINButtonSubmit").setEnabled(true);
					}


				}

		}}).addStyleClass("normalBtn");

        var oFGINButtonSubmit = new sap.m.Button("idFGINButtonSubmit",{
			  text : "Submit",
			  width:"100px",
			  styled:false,
			  visible: true,
			  enabled: false,
			  //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: true}),
			  press:function(){
					//oCurrent.submitFGIN();
					
					var validFGINLength = checkFGINValidLinesLength(oJSONFGINExcelData);
					globalFGINStringCount = 0;
					do {
					  oCurrent.submitFGIN(validFGINLength);
					}while(globalFGINStringCount < validFGINLength);

					// oFGINExcel.loadData(oJSONFGINExcelData);
					// sap.ui.getCore().byId("idFGINButtonValidate").setEnabled(false);
					// sap.ui.getCore().byId("idFGINButtonSubmit").setEnabled(true);


		}}).addStyleClass("normalBtn");

        var oFGINButtonPrint = new sap.m.Button("idFGINButtonPrint",{
			  text : "Print",
			  width:"100px",
			  styled:false,
			  visible: true,
			  //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: true}),

			  press:function(){

				  var oJSONFGINSAPDataPrint = [];
				  var formattedDate = "";

				  for(var i=0; i<oJSONFGINSAPData.length; i++){
					  if(oJSONFGINSAPData[i].Date != ""){
						  formattedDate = oJSONFGINSAPData[0].Date.substr(6,2) + "/" +
						  				  oJSONFGINSAPData[0].Date.substr(4,2) + "/" +
						  				  oJSONFGINSAPData[0].Date.substr(0,4);
					  }

					  oJSONFGINSAPDataPrint.push({
						  "Serial No. " : oJSONFGINSAPData[i].Serial,
						  "Status " : oJSONFGINSAPData[i].Avlb,
						  "Date " : formattedDate,
						  "Return " : oJSONFGINSAPData[i].Return,
						  "Prev. Onhire Date " : ( oJSONFGINSAPData[i].PrevOnhireDate == undefined )?"":oJSONFGINSAPData[i].PrevOnhireDate,
						  "Prev. Location " : ( oJSONFGINSAPData[i].PrevLocation == undefined )?"":oJSONFGINSAPData[i].PrevLocation,
					  });
				  }

				  var oUtilityEDI = new utility();
					var depottext = "Depot : " + sap.ui.getCore().byId("idFGINComboDepot").getValue();
				  var tab = oUtilityEDI.makeHTMLTableEDI(oJSONFGINSAPDataPrint, "Gate IN", "print", depottext);
	        	  var newWin = window.open();
	        	  newWin.document.write(tab);
	        	  newWin.print();

		}}).addStyleClass("normalBtn");

	      var oFGINButtonReset = new sap.m.Button("idFGINButtonReset",{
			  text : "Reset",
			  width:"100px",
			  styled:false,
			  visible: true,
			  //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: true}),
			  press:function(){
				  oCurrent.resetFGIN();
		}}).addStyleClass("normalBtn");

		var oFGINFlexButtons = new sap.m.FlexBox("idFGINFlexButtons",{
            items: [oFGINButtonAdd5,
                    oFGINButtonValidate,
                    oFGINButtonSubmit,
                    oFGINButtonPrint,
                    oFGINButtonReset
                    ],
            direction: "Row"
		}).addStyleClass("marginMainLeft marginTop20");

		var oFGINFlexFinal = new sap.m.FlexBox("idFGINFlexFinal",{
            items: [ backEDI,
                     oFGINFlexDepot,
                     oFGINFlexButtons,
                     oFGINExcelContainer
                    ],
            direction: "Column"
		}).addStyleClass("marginMainLeft");


		return oFGINFlexFinal;

    },

    /*FGIN : Submit Gate IN */

    submitFGIN : function(validLength){

    var oCurrent = this;
		var stringToPass = "";
		var stringCount = 1;
		var depot = sap.ui.getCore().byId("idFGINComboDepot").getSelectedKey();

		var startNumber = globalFGINStringCount;
		var endNumber = 0;
		endNumber = globalFGINStringCount + 25;
		if(endNumber > validLength){
			endNumber = validLength;
		}

		for(var i =startNumber; i < endNumber; i++){
			if(stringToPass == ""){
				stringToPass = stringToPass + "Submit eq 'X' and " + "IGatein" + stringCount + " eq '" + oJSONFGINSAPData[i].Serial + "$" +
				oJSONFGINSAPData[i].Avlb + "$" +
				oJSONFGINSAPData[i].Date + "$" +
				oJSONFGINSAPData[i].Return  + "$" +
				depot  + "$" +
				sessionStorage.uName.toUpperCase() + "'";
			}
			else{
				stringToPass = stringToPass + " and IGatein" + stringCount + " eq '" + oJSONFGINSAPData[i].Serial + "$" +
				oJSONFGINSAPData[i].Avlb + "$" +
				oJSONFGINSAPData[i].Date + "$" +
				oJSONFGINSAPData[i].Return  + "$" +
				depot + "'";
			}
			stringCount++;
		}

		oModel = new sap.ui.model.odata.ODataModel(serviceEDIDOC, true);
		var oMODELFGIN = serviceEDIDOC + "FGINSet?$filter=" + stringToPass;

		busyDialog.open();
		console.log(oMODELFGIN);
		OData.request({
		      requestUri: oMODELFGIN,
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
		    	
		    	console.log("Above request : Success");
					if(endNumber == validLength){
						busyDialog.close();
						sap.ui.commons.MessageBox.alert("Submitted!");
						sap.ui.getCore().byId("idFGINButtonAdd5").setEnabled(false);
						sap.ui.getCore().byId("idFGINButtonValidate").setEnabled(false);
						sap.ui.getCore().byId("idFGINButtonSubmit").setEnabled(false);
						sap.ui.getCore().byId("idFGINButtonPrint").setEnabled(true);
					}
		    },function(err){
		    	 console.log("Above Request : Error");
		    	 busyDialog.close();
		    	 sap.ui.commons.MessageBox.alert("There is an error; Please try again later.");
		    });

				globalFGINStringCount = endNumber;


    },

		/*FGIN : Validate Gate IN - Backend*/

    validateFGINFrontEnd : function(){

			jQuery.sap.require("sap.ui.commons.MessageBox");

			var oCurrent = this;
			var isValid = true;
			var tempDateArray = [];
			var tempDate = "";
			var j = 0;
			oJSONFGINSAPData = [];
			var datainsert = false;
			var countIncomplete = 0;
			var isIncomplete = false;
			oSTRINGFGINValidationMessage = "";
			var depot = sap.ui.getCore().byId("idFGINComboDepot").getSelectedKey();

			for(var i =0; i < oJSONFGINExcelData.length;i++){
				isValid = true;
				j = 0;
				datainsert = true;
				countIncomplete = 0;
	 			while(j<4){
	 				if(oJSONFGINExcelData[i][j] == "" || oJSONFGINExcelData[i][j] == null){
	 					datainsert = false;
	 					countIncomplete = countIncomplete + 1;
	 				}
	 				j++;
	 			}

	 			if(isIncomplete == false && ( countIncomplete != 4 && countIncomplete != 0)){
	 				isIncomplete = true;
	 			}

	 			if(datainsert){

	 				if(!oCurrent.validateFGINUnitNumber(oJSONFGINExcelData[i][0])){
	 					oSTRINGFGINValidationMessage = oSTRINGFGINValidationMessage +
	 										" Line No. " + (i + 1) + " : Enter a valid serial number\n";
	 					isValid = false;
	 				}

	 				if(!oCurrent.validateFGINRA(oJSONFGINExcelData[i][3])){
	 					oSTRINGFGINValidationMessage = oSTRINGFGINValidationMessage +
							" Line No. " + (i + 1) + " : Enter a valid Return Authorization\n";
	 				}

	 				if(oJSONFGINExcelData[i][2] == ""){
						isValid = false;
	 					oSTRINGFGINValidationMessage = oSTRINGFGINValidationMessage +
						" Line No. " + (i + 1) + " : Enter a valid IN Date\n ---------------------- \n";
	 				}

	 				if(isValid){
	 					tempDate = dateFormatterYYYYMMDD(oJSONFGINExcelData[i][2]);

		 				oJSONFGINSAPData.push({
		 					"Serial":oJSONFGINExcelData[i][0].toUpperCase(),
		 					"Date":tempDate,
		 					"Return":oJSONFGINExcelData[i][3],
		 					"Avlb": oJSONFGINExcelData[i][1]//(oJSONFGINExcelData[i][1] == 'Yes')?'A':''
		 				});

	 				}
	 			}
	 		}

			//oSTRINGFGINValidationMessage = ""; // CLRFRNTVALID Clear frontend validation
			if(depot == ""){
				sap.ui.getCore().byId("idFGINButtonValidate").setEnabled(true);
	           	sap.ui.getCore().byId("idFGINButtonSubmit").setEnabled(false);
				sap.ui.commons.MessageBox.alert("Please enter a valid depot ID");
				return false;
			}else if(oSTRINGFGINValidationMessage != ""){
				sap.ui.getCore().byId("idFGINButtonValidate").setEnabled(true);
	           	sap.ui.getCore().byId("idFGINButtonSubmit").setEnabled(false);
				sap.ui.commons.MessageBox.alert(oSTRINGFGINValidationMessage);
				return false;
			}
			// else if(oJSONFGINSAPData.length > 25){
			// 	sap.ui.commons.MessageBox.alert("Sorry, Max. Entries is 25!");
			// 	return false;
			// }
			else if(oJSONFGINSAPData.length == 0 || isIncomplete == true){
				sap.ui.getCore().byId("idFGINButtonValidate").setEnabled(true);
	           	sap.ui.getCore().byId("idFGINButtonSubmit").setEnabled(false);
				sap.ui.commons.MessageBox.alert("Enter at least one entry or \n Please enter all the mandatory fields." );
				return false;
			}else{
				return true;
			}

		},

    /*FGIN : Validate Gate IN - Backend*/

    validateFGIN : function(validLength){

    	jQuery.sap.require("sap.ui.commons.MessageBox");

			var oCurrent = this;
			var isValid = true;
			var tempDateArray = [];
			var tempDate = "";
			var j = 0;
			//oJSONFGINSAPData = [];
			var datainsert = false;
			var countIncomplete = 0;
			var isIncomplete = false;
			oSTRINGFGINValidationMessage = "";
			var depot = sap.ui.getCore().byId("idFGINComboDepot").getSelectedKey();
	           	//sap.ui.commons.MessageBox.alert("Validation Passed!" );

	        var oCurrent = this;
	    		var stringToPass = "";
	    		var stringCount = 1;

					var startNumber = globalFGINStringCount;
					var endNumber = 0;
					endNumber = globalFGINStringCount + 25;
					if(endNumber > validLength){
						endNumber = validLength;
					}
					

	    		for(var i=startNumber; i < endNumber; i++){
	    			if(stringToPass == ""){
	    				stringToPass = stringToPass + "Submit eq '' and " + "IGatein" + stringCount + " eq '" + oJSONFGINSAPData[i].Serial + "$" +
	    				oJSONFGINSAPData[i].Avlb + "$" +
	    				oJSONFGINSAPData[i].Date + "$" +
	    				oJSONFGINSAPData[i].Return  + "$" +
	    				depot  + "$" +
							sessionStorage.uName.toUpperCase() + "'";
	    			}
	    			else{
	    				stringToPass = stringToPass + " and IGatein" + stringCount + " eq '" + oJSONFGINSAPData[i].Serial + "$" +
	    				oJSONFGINSAPData[i].Avlb + "$" +
	    				oJSONFGINSAPData[i].Date + "$" +
	    				oJSONFGINSAPData[i].Return  + "$" +
	    				depot + "'";
	    			}
	    			stringCount++;
	    		}

	    		oModel = new sap.ui.model.odata.ODataModel(serviceEDIDOC, true);
	    		var oMODELFGIN = serviceEDIDOC + "FGINSet?$filter=" + stringToPass;

	    		busyDialog.open();
	    		console.log(oMODELFGIN);
	    		OData.request({
	    		      requestUri: oMODELFGIN,
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
	    		    	if(data.results.length == 0){
	    		    		console.log("Above request : Success");
	    		    		//sap.ui.commons.MessageBox.alert("Submitted!");
	    		    	}else{
	    		    		console.log("Above request : Success");
	    		    		//sap.ui.commons.MessageBox.alert("Submitted!");
	    		    		// for(var i=0; i<data.results.length; i++){
	    		    		// 	if(data.results[i].ErrMsg.toLowerCase().substr(0,9) == "duplicate"){
	    		    		// 		sap.ui.commons.MessageBox.alert(data.results[i].ErrMsg);
	    		    		// 		return false;
	    		    		// 	}
	    		    		// }

									var errLine = globalFGINStringCount;
	    		    		for(var i=0; i<data.results.length; i++){
	    		    			if(globalFGINStringError == '' && data.results[i].ErrMsg != ""){
	    		    				globalFGINStringError = "Line " + (errLine + 1) + " : " + data.results[i].ErrMsg;
	    		  				}else if(data.results[i].ErrMsg != ""){
	    		  					globalFGINStringError = globalFGINStringError + '\n' + "Line " + (errLine + 1) + " : " + data.results[i].ErrMsg;
										}
										errLine = errLine + 1;
	    		    		}

							var actualLineOnScreen = -1;
	    		    		for(var i=0; i<data.results.length; i++){
	    		    			oJSONFGINSAPData[i].PrevLocation = data.results[i].PrevLocation;
								oJSONFGINSAPData[i].PrevOnhireDate = data.results[i].PrevOnhireDate;
								
								actualLineOnScreen = findWithPropReturnIndex(oJSONFGINExcelData, '0', data.results[i].Serialno);	// '0' is Serial Number because it is in the first column of excel
								if(actualLineOnScreen != -1){
									oJSONFGINExcelData[actualLineOnScreen][4] = data.results[i].PrevLocation;
	    		    				oJSONFGINExcelData[actualLineOnScreen][5] = data.results[i].PrevOnhireDate;
								}
	    		    		}

	    		    		// for(var i=0; i<data.results.length; i++){
	    		    		// 	oJSONFGINSAPData[i].PrevLocation = data.results[i].PrevLocation;
	    		    		// 	oJSONFGINSAPData[i].PrevOnhireDate = data.results[i].PrevOnhireDate;
	    		    		// 	oJSONFGINExcelData[i][4] = data.results[i].PrevLocation;
	    		    		// 	oJSONFGINExcelData[i][5] = data.results[i].PrevOnhireDate;
	    		    		// }


	    		    	}
	    		    },function(err){
	    		    	 console.log("Above Request : Error");
	    		    	 busyDialog.close();
	    		    	 sap.ui.commons.MessageBox.alert("There is an error; Please try again later.");
	    		    });

							globalFGINStringCount = endNumber;

		},

		/*FGIN : Validate Unit Number */

		validateFGINUnitNumber : function (unitnumber){

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

		/*FGIN : Validate Return Authorization */

		validateFGINRA : function (ranumber){

			   ranumber =  $.trim(ranumber);
		       if(ranumber == ''){
                   //sap.ui.commons.MessageBox.alert("Either Unit Number or Document Type input missing.\n Please check your inputs and retry.");
                   return false;
		       }

		       if(ranumber.length != 7 && ranumber.length != 6){
                   //sap.ui.commons.MessageBox.alert("You have input an invalid Unit Number.\n Please enter a valid  Unit Number -11-char alpha numeric.");
                   return false;
		       }

		       if(!(/^[0-9]+$/.test(ranumber))) {
                   //sap.ui.commons.MessageBox.alert("You have input an invalid Unit Number.\n Please enter a valid  Unit Number -11-char alpha numeric.");
                   return false;
		       }
		       return true;
		},

		/*FGIN : Set Excel Gate IN Page */

	    setExcelFGINPage : function(){

	    	/* FGIN - Gate IN - Excel - Setup */

			/* FGIN - JSON - Excel Data */
			/* Serial No. - Status - Gate IN Date - RA Number - Previous On Hire Location - Previous On Hire Date*/


			          		var avlbDd = [	  "D",
			          		              	  "A"
			          		             ];

	          		    var container = document.getElementById('idFGINExcel');
	          		  	oFGINExcel = new Handsontable(container, {
	          	            data : oJSONFGINExcelData,  //binding the model
	          	           	minSpareRows: 5,
	          	           	height: 600,
	          	           	renderAllRows: true,
	          	           	renderAllColumns: true,
	          	           	//width: 500,
	          	           	//minRows: 5,
	          	           	//maxRows: 25,
	          	           	//rowHeaders: true,
	          	           	colHeaders: true,
	          	           	colHeaders: ["Serial Number", // 0
	          	           	             "Status", // 1
	          	           	             "In Date(DD/MM/YYYY)", // 2
	          	           	             "Return Authorisation",  // 3
	          	           	             "Previous On Hire Location", // 4
	          	           	             "Previous On Hire Date", // 5
	          	           	             // "Last Clean Date(DD/MM/YYYY)", // 5			// MAC21092017-
	          	           	             // "Last Cargo Desc",  // 6	// MAC21092017-
	          	           	             // "Cleaning Proc. Desc" // 7	// MAC21092017-
	          	           	             ],
	          	           	    contextMenu: true,
	          					columns: [
	          					  // Serial Number
	          					  {
	          						  width: 130
	          					  },
	          					  // Status
	          					  {
	           						  type: 'dropdown',
	           						  source: avlbDd,
	           						  width: 170,
	           						  //width: 160,
	           						  strict: true
	           					  },
	           					  // IN Date
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
	          					  },
	          					  // Previous On Hire Loc.
	          					  {
	          						width: 260,
	          						readOnly : true
	          					  },
	          					  // Previous On Hire Date
	          					  {
	          						type: 'date',
	          						dateFormat: 'DD/MM/YYYY',
        				        correctFormat: false,
        				        width: 180,
        				        readOnly : true
		          				   },
	          					  ],
          					    rowHeaders: true,
		          	           	//manualColumnResize:true,
		          	           	/*autoColumnSize: {
		          	           	    "samplingRatio": 23
		          	           	},*/
		          	           	afterChange : function(event){
															//
															// var oJSONFGINSAPDataDummy = [];
															// for(var i =0; i < oJSONFGINExcelData.length;i++){
															// 	isValid = true;
															// 	var j = 0;
															// 	datainsert = false;
															// 	countIncomplete = 0;
													 		// 	while(j<4){
													 		// 		if(oJSONFGINExcelData[i][j] != "" && oJSONFGINExcelData[i][j] != null && oJSONFGINExcelData[i][j] != undefined){
													 		// 			datainsert = true;
													 		// 			countIncomplete = countIncomplete + 1;
													 		// 		}
													 		// 		j++;
													 		// 	}
															//
													 		// 	if(datainsert){
															//
														 	// 			oJSONFGINSAPDataDummy.push({
														 	// 				"Serial":"valid"
														 	// 			});
															//
															//
													 		// 	}
													 		// }
															//
															// if(oJSONFGINSAPDataDummy){
															// 	if(oJSONFGINSAPDataDummy.length > 24){
															// 			sap.ui.commons.MessageBox.alert("Sorry, Max. Entries is 25!");
															// 	}
															// }

		          	           		sap.ui.getCore().byId("idFGINButtonAdd5").setEnabled(true);
		          	           		sap.ui.getCore().byId("idFGINButtonValidate").setEnabled(true);
		          	           		sap.ui.getCore().byId("idFGINButtonSubmit").setEnabled(false);
		          	           		sap.ui.getCore().byId("idFGINButtonPrint").setEnabled(false);
		          	           	}
	          	       });

	    },

	    resetFGIN : function(){
	       var oCurrent = this;

	       oCurrent.setExcelFGINPage();
     	   if(oFGINExcel != null){
     		   oJSONFGINExcelData = [];
     		   oFGINExcel.loadData(oJSONFGINExcelData);
     	   }

     	  if(sap.ui.getCore().byId("idFGINComboDepot") != undefined)
				sap.ui.getCore().byId("idFGINComboDepot").setSelectedKey("");

     	 sap.ui.getCore().byId("idFGINButtonAdd5").setEnabled(true);
      	 sap.ui.getCore().byId("idFGINButtonValidate").setEnabled(true);
      	 sap.ui.getCore().byId("idFGINButtonSubmit").setEnabled(false);
      	 sap.ui.getCore().byId("idFGINButtonPrint").setEnabled(false);


	    }


});

function isValidDate(dateString) {
	  var regEx = /^\d{4}-\d{2}-\d{2}$/;
	  if(!dateString.match(regEx)) return false;  // Invalid format
	  var d = new Date(dateString);
	  if(!d.getTime() && d.getTime() !== 0) return false; // Invalid date
	  return d.toISOString().slice(0,10) === dateString;
}

function checkFGINValidLinesLength(exceldata) {
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

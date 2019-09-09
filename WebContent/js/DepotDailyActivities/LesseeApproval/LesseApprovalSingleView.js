/*
 *
 *
 *$*$------------------------------------------------------------------------*
*$*$ Modified By : Seyed Ismail MAC
*$*$ Modified On : 10.03.2015
*$*$ Reference   : RTS1078
*$*$ Transport   :
*$*$ Tag         : MAC10032015
*$*$ Purpose     : Change in equipment length validation
*$*$---------------------------------------------------------------------

/* MACALPHA19032018 - Changes done by Seyed Ismail on 19.03.2018 for Alpha Changes
1. Remove Unit Part Code information MACALPHA19032018_1
2. Add Lessor Survey and remove additional, superseding, pre sales, pre delivery MACALPHA19032018_2
3. Remove sale grade and add CW & Notes field MACALPHA19032018_3
4. Get the latest work order detail from SAP MACALPHA19032018_4
5. Show Labour Rate on screen MACALPHA19032018_5
6. Remove unwanted responsibility codes MACALPHA19032018_6
7. Repair Completion Page changes MACALPHA19032018_7
8. a. One submission for both carcass and machinary MACALPHA19032018_8
   b.Load saved estimates MACALPHA19032018_8
9. One print/excel button MACALPHA19032018_9
10. Differentiate original/JS/LS MACALPHA19032018_10
11. Remove unwanted fields - Lessee Approval MACALPHA19032018_11
*/


var depotNameCodeListLAS = [];
var depotNameListLAS = [];
var LA_lookupSingle = [];
var LA_submitSingle= [];
var LA_displaySingle = [];
var LA_errorSingle = [];
var LA_Single_depotCode = "";
var oCurrLAS;
var loggedInUserTypeLAS = "";
sap.ui.model.json.JSONModel.extend("LesseeApprovalSingleView", {

	createLesseeApprovalSingleView: function(){
		oCurrLAS = this;

		var oLabelDepot = new sap.ui.commons.Label({text: "Depot:",
			required: true,
			layoutData: new sap.ui.layout.GridData({span: "L1 M1 S8",linebreak: false, margin: true}),
            wrapping: true}).addStyleClass("marginTop15");

		var oLabelSerialNo = new sap.ui.commons.Label({text: "Serial Number:",
			required: true,
			layoutData: new sap.ui.layout.GridData({span: "L1 M1 S8",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("marginTop15");

		var oLabelMandatory = new sap.ui.commons.Label({text: "Mandatory Field",
			required: true,
			requiredAtBegin : true,
            wrapping: true}).addStyleClass("marginTop15");

		var oListDepotLAS = new sap.ui.core.HTML("idDepotHTMLLAS",{layoutData: new sap.ui.layout.GridData({span: "L4 M6 S12"})});
		var htmlContentDepot = '<input disabled="disabled" id="idListDepotLAS" placeholder="Select Depot" class="FormInputStyle marginTop10" style="width:100%;height: 38px;">';
		oListDepotLAS.setContent(htmlContentDepot);

	 // Text Field
		var oInputDepotLAS = new sap.ui.commons.TextField('idDepotTextfieldLAS',{
			height : "38px",
    		width : "10px",
			placeholder:"Depot Code",
			layoutData: new sap.ui.layout.GridData({span: "L1 M1 S8",linebreak: false, margin: true}),
			/*change: function(){
			flagOnChangeDepotCodeAMOS = true;
		}*/
    	}).addStyleClass("FormInputStyle marginTop10 DepotInput38px");

    	var oInputSerialNoLAS = new sap.ui.commons.TextField("idTFSrNoLas",{
    		layoutData: new sap.ui.layout.GridData({span: "L2 M9 S9",linebreak: false, margin: true}),
    		//value:"SCZU7980362",
			height : "38px",
    		width : "40px",
    		placeholder:"Serial Number",
    		maxLength:11,
    	}).addStyleClass("FormInputStyle marginTop10 DepotInput38px");

    	oInputSerialNoLAS.onfocusin =  function(e) {
			this.setValueState(sap.ui.core.ValueState.None);
			this.setPlaceholder("Serial Number");
	    };

    	// Buttons
	   	 var oBtnLookupLAS = new sap.m.Button("idBtnLookupLAS",{
		          text : "Search",
		          //width:"235px",
		          styled:false,
		          tooltip: "Click to know the lessee details",
		          layoutData: new sap.ui.layout.GridData({span: "L2 M2 S4",linebreak: true, margin: true}),
		          //layoutData: new sap.ui.layout.GridData({span: "L9 M9 S9",linebreak: true, margin: true}),
		          press:function(){
		        	  if(oCurrLAS.validateLASingle()){
		        		  oCurrLAS.bindLookupResultForm();
		        	  }
		          }}).addStyleClass("submitBtn");

	   	var oBtnRemoveFilter = new sap.m.Button("idBtnRemoveFilterLAS",{
	          text : "Remove Filter",
	          //width:"115px",
	          styled:false,
	          enabled:false,
	          layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: false, margin: true}),
	          press:function(){
	        	  oInputDepotLAS.setValue("");
		          $("#idListDepotLAS").val("");
		          this.setEnabled(false);
	          }}).addStyleClass("submitBtn marginTop5");

	   	var oLabelSpace = new sap.ui.commons.Label({text: " ",
			width:"8px",
            wrapping: true}).addStyleClass("marginTop10");

	   	 var oBtnApplyFilter = new sap.m.Button("idBtnApplyFilterLAS",{
		          text : "Apply Filter",
		          //width:"115px",
		          styled:false,
		          layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: false, margin: true}),
		          //layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: false, margin: true}),
		          press:function(){
		          		oBtnRemoveFilter.setEnabled(true);
		          		document.getElementById("idListDepotLAS").style.borderColor = "#cccccc";
	        			document.getElementById("idListDepotLAS").style.background = "#ffffff";

		          		var depotCodeName = jQuery.grep(depotNameCodeListLAS, function(element, index){
				            return element.Depot == oInputDepotLAS.getValue();
			    	    });

		          		if(depotCodeName.length > 0){
		        			$("#idListDepotLAS").val(depotCodeName[0].FunctionalLoc);
		          		}
		          		else
		          			$("#idListDepotLAS").val("");

		        	  }}).addStyleClass("submitBtn marginTop5");


	    var oFlexBtn = new sap.m.FlexBox({
	           items: [
						oBtnApplyFilter,
						oLabelSpace,
						oBtnRemoveFilter,
	           ],
	           direction : "Row",
	           layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12",linebreak: false, margin: false}),
				});
	  // Responsive Grid Layout
		    var oLASingleLayout = new sap.ui.layout.form.ResponsiveGridLayout("idLASingleLayout",{
		       labelSpanL: 1,
               labelSpanM: 1,
               labelSpanS: 1,
               emptySpanL: 0,
               emptySpanM: 0,
               emptySpanS: 0,
               columnsL: 2,
               columnsM: 2,
               columnsS: 1,
               breakpointL: 765,
               breakpointM: 320
		    });

		  // Online Form Starts
		     var oLASingleForm = new sap.ui.layout.form.Form("idLASingleForm",{
		             layout: oLASingleLayout,
		             formContainers: [

		                     new sap.ui.layout.form.FormContainer("idLASingleFormC1",{
		                             //title: "Add Movement Out - Single",
	                             formElements: [
													new sap.ui.layout.form.FormElement({
													    fields: [oLabelDepot, oListDepotLAS, oInputDepotLAS,oFlexBtn]
													}),
													new sap.ui.layout.form.FormElement({
													    fields: [oLabelSerialNo, oInputSerialNoLAS]
													}),
													new sap.ui.layout.form.FormElement({
													    fields: [oBtnLookupLAS]
													}),
													new sap.ui.layout.form.FormElement({
													    fields: [oLabelMandatory]
													}),
		                                     ]
		                     })
		             ]
		     });

		     var vHDivider1 = new sap.ui.commons.HorizontalDivider({width: "95%", type: "Area", height: "Medium"});

		     // Responsive Grid Layout
			    var oLookupResultLayoutLAS = new sap.ui.layout.form.ResponsiveGridLayout("idLASLookupResultLayout",{
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
			     var oLookupResultLASForm = new sap.ui.layout.form.Form("idLASLookupResultForm",{
			             layout: oLookupResultLayoutLAS,
			             formContainers: [

			                     new sap.ui.layout.form.FormContainer("idLASLookupResultFC",{
		                             formElements: [
			                                     ],
			                     }),
			             ]
			     });

			     var vHDivider2 = new sap.ui.commons.HorizontalDivider("idMsgTransDividerLAS",{width: "95%", type: "Area", height: "Medium",visible:false});


			  // Responsive Grid Layout
				    var oMsgTransLayoutLAS = new sap.ui.layout.form.ResponsiveGridLayout("idMsgTransLayoutLAS",{
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
				     var oMsgTransLASForm = new sap.ui.layout.form.Form("idLASMsgTransForm",{
				             layout: oMsgTransLayoutLAS,
				             formContainers: [

				                     new sap.ui.layout.form.FormContainer({
			                             formElements: [
															new sap.ui.layout.form.FormElement("idLASMsgTransFE",{
															    fields: [],
															    layoutData: new sap.ui.layout.GridData({span: "L9 M9 S4",linebreak: true, margin: true})
															}),
															new sap.ui.layout.form.FormElement("idLASMsgErrorFE",{
															    fields: [],
															    layoutData: new sap.ui.layout.GridData({span: "L9 M9 S4",linebreak: true, margin: true})
															})
				                                     ]
				                     }),
				             ]
				     });

			     var oFlexAllLAS = new sap.m.FlexBox({
 		           items: [
 							oLASingleForm,
 							vHDivider1,
 							oLookupResultLASForm,
 							vHDivider2,
 							oMsgTransLASForm,
 		           ],
 		           direction : "Column",
 					});

		     	return oFlexAllLAS;


	}, //createLesseeApprovalSingleView

	populateDepotNameLAS: function(){

		busyDialog.open();
			oModel = new sap.ui.model.odata.ODataModel(serviceUrl15_old, true);
			var urlToCallLASDep = serviceUrl15_old + "/F4_Functional_Location";
			//alert("urlToCallLASDep : "+urlToCallLASDep);
			OData.request({
			      requestUri: urlToCallLASDep,
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
			    	for ( var i = 0; i < data.results.length ; i++) {
			    		depotNameCodeListLAS = data.results;
			    		depotNameListLAS[i] = data.results[i].FunctionalLoc;
					}

			    	//alert("depotNameListAMOS len : "+depotNameListAMOS.length);

			    	$( "#idListDepotLAS" ).autocomplete({
			    	      source: depotNameListLAS,
			    	      minLength: 0,
			    	      select: function(){
			    	    	  	document.getElementById("idListDepotLAS").style.borderColor = "#cccccc";
			    				document.getElementById("idListDepotLAS").style.background = "#ffffff";
			    				$("#idListDepotLAS").attr("placeholder","Select Depot");
			    	      }
			    	})
			    	.focus(function(){
			    		 if ($("ul.ui-autocomplete").is(":hidden")) {
			    		        $(this).autocomplete('search', '');
			    		    }
			    	})
			    	.bind( "focusout", function( event ) {
			    		//this.setValueState(sap.ui.core.ValueState.None);
						  //this.setPlaceholder("Select Depot");
			    			/*var keyLAS = this.value;
						    var partsLAS = keyLAS.split(" ");
						    var lastPartLAS = partsLAS[partsLAS.length - 1];
						    oInputDepotAMOS.setValue(lastPartLAS);*/
				     })
			    	.keyup(function() {
			    	    var isValid = false;
			    	    var previousValue = "";
			    	    for (i in depotNameListLAS) {
			    	        if (depotNameListLAS[i].toLowerCase().match(this.value.toLowerCase())) {
			    	            isValid = true;
			    	        }
			    	    }
			    	    if (!isValid) {
			    	        this.value = previousValue;
			    	    } else {
			    	        previousValue = this.value;
			    	    }
			    	});
			    	loggedInUserTypeLAS = objLoginUser.getLoggedInUserType();
					if(loggedInUserTypeLAS == "SEACO"){
						$("#idListDepotLAS").removeAttr('disabled');
						$("#idListDepotLAS").attr("disabled","disabled");
						sap.ui.getCore().byId("idBtnRemoveFilterLAS").setEnabled(false);
						sap.ui.getCore().byId("idBtnApplyFilterLAS").setEnabled(true);
						sap.ui.getCore().byId("idDepotTextfieldLAS").setEnabled(true);
					}
					else{
						var DepotCode = objLoginUser.getLoggedInUserID();
						for(var i=0;i<depotNameListLAS.length;i++){
							if(depotNameListLAS[i].substring(11,15) == DepotCode)
								DepotCode = depotNameListLAS[i];
						}
						$("#idListDepotLAS").attr("disabled","disabled");
						$("#idListDepotLAS").val(DepotCode);
						var depotLAS = document.getElementById("idListDepotLAS").value.split("-");
						sap.ui.getCore().byId("idDepotTextfieldLAS").setValue(depotLAS[3]);
						sap.ui.getCore().byId("idBtnRemoveFilterLAS").setEnabled(false);
						sap.ui.getCore().byId("idBtnApplyFilterLAS").setEnabled(false);
						sap.ui.getCore().byId("idDepotTextfieldLAS").setEnabled(false);
					}
			    	busyDialog.close();
			    },
			    function(err){
			    	 errorfromServer(err);
			    	//alert("Error while Reading Result : "+ : window.JSON.stringify(err.response));
			    });
		}, //populateDepotNameLAS

	validateLASingle: function(){
		var vInputDepotValLAS = document.getElementById("idListDepotLAS").value;
		var vInputSerialNoValLAS = sap.ui.getCore().byId("idTFSrNoLas");
		var isValid=true;

		if(vInputDepotValLAS == ""){
			document.getElementById("idListDepotLAS").style.borderColor = "red";
    		document.getElementById("idListDepotLAS").style.background = "#FAD4D4";
    		document.getElementById("idListDepotLAS").style.background = "#FAD4D4";
    		$("#idListDepotLAS").attr("placeholder","Required");
    		isValid = false;
	  	  }
	  	  else{

	  		var depotCodeName = jQuery.grep(depotNameCodeListLAS, function(element, index){
	            return element.FunctionalLoc == vInputDepotValLAS;
    	    });
	  		if(depotCodeName.length ==  0){
	  			document.getElementById("idListDepotLAS").style.borderColor = "red";
	    		document.getElementById("idListDepotLAS").style.background = "#FAD4D4";
	    		document.getElementById("idListDepotLAS").style.background = "#FAD4D4";
	    		document.getElementById("idListDepotLAS").value = "";
	    		$("#idListDepotLAS").attr("placeholder","Invalid Depot");
	  		}
	  		else{
	  			document.getElementById("idListDepotLAS").style.borderColor = "#cccccc";
				document.getElementById("idListDepotLAS").style.background = "#ffffff";
				$("#idListDepotLAS").attr("placeholder","Depot");
	  		}
	  	  }
		if(vInputSerialNoValLAS.getValue().length < 10){			// MAC10032015 Changed from 11 to 10 as there can be some equipments with 10 char. length

			vInputSerialNoValLAS.setValueState(sap.ui.core.ValueState.Error);

			if(vInputSerialNoValLAS.getValue().length  == 0)
				vInputSerialNoValLAS.setPlaceholder("Required");

			if(vInputSerialNoValLAS.getValue().length > 0){
				vInputSerialNoValLAS.setPlaceholder("Invalid Serial Number");
				vInputSerialNoValLAS.setValue("");
			}

			isValid = false;
		}
		else{
	  		vInputSerialNoValLAS.setValueState(sap.ui.core.ValueState.None);
	  	}


		return isValid;
	}, //validateLASingle

	bindLookupResultForm:function(){
		var serialNo = sap.ui.getCore().byId("idTFSrNoLas").getValue().trim().toUpperCase();
		var depotCode = document.getElementById("idListDepotLAS").value;

		if(depotCode.length!=0)
			LA_Single_depotCode = depotCode.substring(11,15);

		sap.ui.getCore().byId("idLASLookupResultFC").destroyFormElements();

		if(sap.ui.getCore().byId("idLASMsgTransFE")){
			sap.ui.getCore().byId("idLASMsgTransFE").destroyFields();
		}
		if(sap.ui.getCore().byId("idTblErrorMsgsLAS")){
			sap.ui.getCore().byId("idTblErrorMsgsLAS").destroy();
		}

		var filter = "/Lessee_Approval_Lookup?$filter=ILessee1 eq '"+serialNo+"$"+LA_Single_depotCode+"'";

		busyDialog.open();
		//alert("Str : "+serviceUrl+filter);
      	oModel = new sap.ui.model.odata.ODataModel(serviceUrl15_old, true);
    		OData.request({
    		      requestUri: serviceUrl15_old + filter,
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


  		    	//alert("data.results.length" + data.results.length);
    		    	//alert("data" + window.JSON.stringify(data.results));
    		    	busyDialog.close();
    		    	if(data.results.length == 0){

    		    		sap.ui.commons.MessageBox.alert("No Results Found. Please edit / refine your search criteria and search again.");
    		    		if(sap.ui.getCore().byId("LesseApFlex")){
  		    			sap.ui.getCore().byId("LesseApFlex").destroy();
  		    		}
    		    	}else  	if(data.results.length>0){

    		    		LA_lookupSingle = data.results;

    		    		for(var i=0;i<LA_lookupSingle.length;i++){
    		    			LA_lookupSingle[i].lesseAmt = LA_lookupSingle[i].LesseAuthAmount;

    		    			LA_lookupSingle[i].LabourCost = numberWithCommas(LA_lookupSingle[i].LabourCost);
    		    			LA_lookupSingle[i].MatCost = numberWithCommas(LA_lookupSingle[i].MatCost);
    		    			LA_lookupSingle[i].TotLesseeCost = numberWithCommas(LA_lookupSingle[i].TotLesseeCost);
    		    			LA_lookupSingle[i].LesseAuthAmount = numberWithCommas(LA_lookupSingle[i].LesseAuthAmount);

    		    			// Move In Date
	  		    			var vDocDateResult = LA_lookupSingle[0].MoveInDate.split("(");
    	                    var vDocDate = vDocDateResult[1].split(")");
    	                    var vformattedDocDate = dateFormat(new Date(Number(vDocDate[0])), 'dd-mm-yyyy',"UTC");
    	                    //this is to check if the date is default 999 something show blank
    	                    if (vformattedDocDate.substring(6) === "9999"){
    	                    	LA_lookupSingle[0].MoveInDate =  "-";
    	                    }
    	                    else{
    	                    	LA_lookupSingle[0].MoveInDate = vformattedDocDate;
    	                    }

    	                    // Approval Date
    	                    var vDocDateResult = LA_lookupSingle[0].ApprovalDate.split("(");
    	                    var vDocDate = vDocDateResult[1].split(")");
    	                    var vformattedDocDate = dateFormat(new Date(Number(vDocDate[0])), 'dd-mm-yyyy',"UTC");
    	                    //this is to check if the date is default 999 something show blank
    	                    if (vformattedDocDate.substring(6) === "9999"){
    	                    	LA_lookupSingle[0].ApprovalDate =  "-";
    	                    }
    	                    else{
    	                    	LA_lookupSingle[0].ApprovalDate = vformattedDocDate;
    	                    }

    		    		}

    		    		oCurrLAS.createLookupResultFormnTable();
    		    	}


    		    },
    		    function(err){
    		    	errorfromServer(err);
    		    });
	},

	createLookupResultFormnTable: function(){
		var LASLookupResultFC = sap.ui.getCore().byId("idLASLookupResultFC");
		LASLookupResultFC.destroyFormElements();

		// Table
    	var oLookupResultLASTable = new sap.ui.table.Table("idTblLookupResultLAS",{
    		visibleRowCount: 1,
           // firstVisibleRow: 3,
            columnHeaderHeight: 40,
            selectionMode: sap.ui.table.SelectionMode.None,
            //navigationMode: sap.ui.table.NavigationMode.Paginator,
            height:"100%"
    	 }).addStyleClass("tblBorder");

    	// Table Columns
    	oLookupResultLASTable.addColumn(new sap.ui.table.Column({
         label: new sap.ui.commons.Label({text: "Serial Number"}),
         template: new sap.ui.commons.TextView().bindProperty("text", "SerialNo"),
         resizable:false,
         width:"auto"
    	 }));

    	oLookupResultLASTable.addColumn(new sap.ui.table.Column({
	         label: new sap.ui.commons.Label({text: "Lease#"}),
	         template: new sap.ui.commons.TextView().bindProperty("text", "Lease"),
	         resizable:false,
	         width:"auto"
	    	 }));

    	oLookupResultLASTable.addColumn(new sap.ui.table.Column({
	         label: new sap.ui.commons.Label({text: "Move In Date"}),
	         template: new sap.ui.commons.TextView().bindProperty("text", "MoveInDate"),
	         resizable:false,
	         width:"auto"
	    	 }));

    	/*oLookupResultLASTable.addColumn(new sap.ui.table.Column({	MACALPHA19032018_11 -
	         label: new sap.ui.commons.Label({text: "Approval Date"}),
	         template: new sap.ui.commons.TextView().bindProperty("text", "ApprovalDate"),
	         resizable:false,
	         width:"100px"
	    	 }));*/

    	oLookupResultLASTable.addColumn(new sap.ui.table.Column({
	         label: new sap.ui.commons.Label({text: "Lessee"}),
	         template: new sap.ui.commons.TextView().bindProperty("text", "Lessee"),
	         resizable:false,
	         width:"auto"
	    	 }));

    	/*oLookupResultLASTable.addColumn(new sap.ui.table.Column({	MACALPHA19032018_11 -
	         label: new sap.ui.commons.Label({text: "Labour Total"}),
	         template: new sap.ui.commons.TextView().bindProperty("text", "LabourCost"),
	         resizable:false,
	         width:"80px"
	    	 }));

    	oLookupResultLASTable.addColumn(new sap.ui.table.Column({ MACALPHA19032018_11 -
	         label: new sap.ui.commons.Label({text: "Material Total"}),
	         template: new sap.ui.commons.TextView().bindProperty("text", "MatCost"),
	         resizable:false,
	         resizable:false,
	         width:"80px"
	    	 }));	*/

    	oLookupResultLASTable.addColumn(new sap.ui.table.Column({
	         label: new sap.ui.commons.Label({text: "Total Lessee Costs"}),
	         template: new sap.ui.commons.TextView().bindProperty("text", "TotLesseeCost"),
	         resizable:false,
	         resizable:false,
	         width:"auto"
	    	 }));

    	oLookupResultLASTable.addColumn(new sap.ui.table.Column({
	         label: new sap.ui.commons.Label({text: "Unit Type"}),
	         template: new sap.ui.commons.TextView().bindProperty("text", "UnitType"),
	         resizable:false,
	         width:"auto"
	    	 }));

    	oLookupResultLASTable.addColumn(new sap.ui.table.Column({
	         label: new sap.ui.commons.Label({text: "Notification Type"}),
	         template: new sap.ui.commons.TextView().bindProperty("text", "NotifType"),
	         resizable:false,
	         width:"auto"
	    	 }));

		var oModelLookup = new sap.ui.model.json.JSONModel();
		oModelLookup.setData(LA_lookupSingle);
		oLookupResultLASTable.setModel(oModelLookup);
		oLookupResultLASTable.bindRows("/");

		// Add Table into Form Element
		var LASLookupResultTableFE = new sap.ui.layout.form.FormElement("idLASLookupResultTable")
    	LASLookupResultFC.insertFormElement(LASLookupResultTableFE,0);
		LASLookupResultTableFE.insertField(oLookupResultLASTable);

    	var oLabelApprovaldate = new sap.ui.commons.Label({text: "Approval Date",
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S3",linebreak: false, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");

    	var oLabelApprovalType = new sap.ui.commons.Label({text: "Approval Type",
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S3",linebreak: false, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");

    	var oLabelLesseeAuthAmount = new sap.ui.commons.Label({text: "Lessee Authorised Amount",
			required: true,
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S5",linebreak: false, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");

    	var oLabelApprovalRef = new sap.ui.commons.Label({text: "Approval Reference",
    		required: true,
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S3",linebreak: false, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");

    	var oLabelApproverName = new sap.ui.commons.Label({text: "Approver Name",
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S3",linebreak: false, margin: true}),
            wrapping: true}).addStyleClass("marginTop10");

    	// Add labels into Form Element
    	var LASLookupResultForm1FE = new sap.ui.layout.form.FormElement("idLASLookupResultForm1")
    	LASLookupResultFC.insertFormElement(LASLookupResultForm1FE,1);
    	LASLookupResultForm1FE.insertField(oLabelApprovaldate,0);
    	LASLookupResultForm1FE.insertField(oLabelApprovalType,1);
    	LASLookupResultForm1FE.insertField(oLabelLesseeAuthAmount,2);
    	LASLookupResultForm1FE.insertField(oLabelApprovalRef,3);
    	LASLookupResultForm1FE.insertField(oLabelApproverName,4);

    	var oModelCurrDateLAS = new sap.ui.model.json.JSONModel();
    	oModelCurrDateLAS.setData({
	   		dateValue: new Date()
		});

    	oApprovalDateLAS = new sap.ui.commons.DatePicker("idApprovalDateLAS",{
    		value: {
                path: "/dateValue",
                type: new sap.ui.model.type.Date({pattern: "dd-MM-yyyy"})
    			},
    			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S3",linebreak: true, margin: true}),
    	}).addStyleClass("FormInputStyle ");
    	oApprovalDateLAS.setModel(oModelCurrDateLAS);

    	 var oApprovalTypeLAS = new sap.ui.commons.DropdownBox("idApprovalTypeLAS", {
			 layoutData: new sap.ui.layout.GridData({span: "L2 M3 S3",linebreak: false, margin: true}),
			 enabled:false,
	          displaySecondaryValues:false,
	          placeholder:"Select Approval Type"}).addStyleClass("FormInputStyle");

    	 var oItem = new sap.ui.core.ListItem();
         oItem.setText(LA_lookupSingle[0].ApprovalType);
         oApprovalTypeLAS.addItem(oItem);
         oApprovalTypeLAS.setValue(LA_lookupSingle[0].ApprovalType);

    	var oLesseeAuthAmountLAS = new sap.ui.commons.TextField("idLesseeAuthAmountLAS",{
    		layoutData: new sap.ui.layout.GridData({span: "L2 M4 S5",linebreak: false, margin: true}),
    		 enabled:false,
    		// textAlign:sap.ui.core.TextAlign.Right,
    	}).addStyleClass("FormInputStyle");

    	oLesseeAuthAmountLAS.setValue(LA_lookupSingle[0].LesseAuthAmount);

    	var oApprovalRefLAS = new sap.ui.commons.TextField("idApprovalRefLAS",{
    		layoutData: new sap.ui.layout.GridData({span: "L2 M3 S3",linebreak: false, margin: true}),
    	}).addStyleClass("FormInputStyle");

    	var oApproverNameLAS = new sap.ui.commons.TextField("idApproverNameLAS",{
    		layoutData: new sap.ui.layout.GridData({span: "L2 M3 S3",linebreak: false, margin: true}),
    	}).addStyleClass("FormInputStyle");

    	// Add Value Holders into Form Element
    	var LASLookupResultForm2FE = new sap.ui.layout.form.FormElement("idLASLookupResultForm2")
    	LASLookupResultFC.insertFormElement(LASLookupResultForm2FE,2);
    	LASLookupResultForm2FE.insertField(oApprovalDateLAS,0);
    	LASLookupResultForm2FE.insertField(oApprovalTypeLAS,1);
    	LASLookupResultForm2FE.insertField(oLesseeAuthAmountLAS,2);
    	LASLookupResultForm2FE.insertField(oApprovalRefLAS,3);
    	LASLookupResultForm2FE.insertField(oApproverNameLAS,4);

    	//Button
    	 var oBtnSubmit =  new sap.m.Button("idLookupSubmitLAS",{
	          text : "Submit",
	         styled:false,
	          width:"80px",
	          layoutData: new sap.ui.layout.GridData({span: "L5 M3 S4",linebreak: true, margin: false}),
	          press:function(){
	        	  if(oCurrLAS.validateSubmitLAMR())
	        		  oCurrLAS.submitLAMR();
	          }
         }).addStyleClass("submitBtn marginTop10");

    	 // Add button to Form Element
    	 var LASLookupResultButtonFE = new sap.ui.layout.form.FormElement("idLASLookupResultButton")
     	LASLookupResultFC.insertFormElement(LASLookupResultButtonFE,3);
    	 LASLookupResultButtonFE.insertField(oBtnSubmit,0);

	},

	validateSubmitLAMR: function(){
		var isValid=true;
		var apprRef = sap.ui.getCore().byId("idApprovalRefLAS");

		if(apprRef.getValue().trim().length == 0){
			apprRef.setValueState(sap.ui.core.ValueState.Error);
			apprRef.setPlaceholder("Required");
			isValid=false;
		}

		return isValid;
	},

	submitLAMR: function(){
		busyDialog.open();
		if(sap.ui.getCore().byId("idLASMsgTransFE")){
			sap.ui.getCore().byId("idLASMsgTransFE").destroyFields();
		}
		if(sap.ui.getCore().byId("idTblErrorMsgsLAS")){
			sap.ui.getCore().byId("idTblErrorMsgsLAS").destroy();
		}

		var stringToPass = "";
		var stringCount = 1;

		var outDateLAMR = LA_lookupSingle[0].ApprovalDate;
		var splitDateLAMR = outDateLAMR.split("-");
		dateToPassLAMR = splitDateLAMR[2]+splitDateLAMR[1]+splitDateLAMR[0];

		var serialNo = LA_lookupSingle[0].SerialNo;
		var depotCode = LA_Single_depotCode;
		var approvalRef = sap.ui.getCore().byId("idApprovalRefLAS").getValue();
		var approverName = sap.ui.getCore().byId("idApproverNameLAS").getValue();
		var approverAmt = LA_lookupSingle[0].lesseAmt;
		stringToPass = "ILessee" + stringCount + " eq '" +
		                serialNo + "$"+
		                depotCode + "$" +
						dateToPassLAMR + "$" +
						approvalRef + "$"+
						approverName+"$" +
						approverAmt + "'";

		stringToPass = stringToPass.replace(/&/g, "%26");
		stringToPass = stringToPass.replace(/#/g, "%23");
		stringToPass = stringToPass.replace(/%/g, "%25");

		var filter = "/LESSEE_APPROVAL_ECC?$filter=" + stringToPass;
		//alert("Service URL : "+serviceUrl + filter);

		oModel = new sap.ui.model.odata.ODataModel(serviceUrl15_old, true);
		OData.request({
		      requestUri: serviceUrl15_old + filter,
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

		    	LA_submitSingle = data.results;

		    	LA_displaySingle = jQuery.grep(LA_submitSingle, function(element, index){
		            return element.Type == "D" || element.Type == "S";
	    	    });

		    	LA_errorSingle = jQuery.grep(LA_submitSingle, function(element, index){
		            return element.Type == "E";
	    	    });

		    	for(var i=0; i<LA_errorSingle.length;i++){
		    		var errMsg = LA_errorSingle[i].Message.trim().split(":");
		    		LA_errorSingle[i].Message = errMsg[1];
		    	}

		    	for(var i=0;i<LA_displaySingle.length;i++){
	    			//alert("msg : "+msgTransAMOS[i].Message);
	    			var oImgServerResp = new sap.ui.commons.Image({
	    				layoutData: new sap.ui.layout.GridData({linebreak: true, margin: true})
	    			});
	    			oImgServerResp.setSrc("images/server_response.png");

	    			var oLabelBlank = new sap.ui.commons.Label({
	    				width:"5px",
	    				text:"",
	    			});
	    			var msg;
	    			if(LA_displaySingle[i].Message.trim().substring(0,19) == "The lessee approval"){
	    				msg = LA_displaySingle[i].Message.trim();
	    			}
	    			else{
	    				var dispMsg = LA_displaySingle[i].Message.trim().split(":");
	    				msg = dispMsg[1];
	    			}

	    			var msgToShow = new sap.ui.commons.TextView({
	    				layoutData: new sap.ui.layout.GridData({span: "L11 M11 S11",linebreak: true, margin: true}),
	    				text:msg,
	    			}).addStyleClass("wraptext");

	    			var oFlexImgMsg = new sap.m.FlexBox({
	    		           items: [
	    							oImgServerResp,
	    							oLabelBlank,
	    							msgToShow
	    		           ],
	    		           direction : "Row",
	    		           layoutData: new sap.ui.layout.GridData({span: "L11 M11 S11",linebreak: true, margin: true})
	    		  }).addStyleClass("margin5");


	    			sap.ui.getCore().byId("idLASMsgTransFE").insertField(oFlexImgMsg,i);
	    		}
		    	if(LA_errorSingle.length > 0){
		    		oCurrLAS.createErrorTableLAS();
	    		}
	    		else{
	    			if(sap.ui.getCore().byId("idTblErrorMsgsLAS")){
	    				sap.ui.getCore().byId("idTblErrorMsgsLAS").destroy();
	    			}
	    		}


		    },
		    function(err){
		    	 busyDialog.close();
		    	 errorfromServer(err);
		    	//alert("Error while Reading Result : "+ window.JSON.stringify(err.response));
		    });
	},

	createErrorTableLAS: function(){

		if(sap.ui.getCore().byId("idTblErrorMsgsLAS")){
			sap.ui.getCore().byId("idTblErrorMsgsLAS").destroy();
		}

		// Table
    	var oErrorMsgsLATable = new sap.ui.table.Table("idTblErrorMsgsLAS",{
            firstVisibleRow: 1,
            columnHeaderHeight: 30,
            selectionMode: sap.ui.table.SelectionMode.None,
            width:"50%",
            height:"100%"
    	 }).addStyleClass("fontStyle marginTop15 tblBorder");

    	oErrorMsgsLATable.setVisibleRowCount(LA_errorSingle.length);

    	// Table Columns
    	oErrorMsgsLATable.addColumn(new sap.ui.table.Column({
      		 label: new sap.ui.commons.Label({text: "Error Type"}),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "Type"),
    		 resizable:false,
             sortProperty: "Type",
             filterProperty: "Type",
    		 }));

    	oErrorMsgsLATable.addColumn(new sap.ui.table.Column({
	   		 label: new sap.ui.commons.Label({text: "Error Message"}),
			 template: new sap.ui.commons.TextView().bindProperty("text", "Message").addStyleClass("wraptext"),
			 resizable:false,
             sortProperty: "Message",
             filterProperty: "Message",
			 }));

    	var oModelErrorMsgsLAS = new sap.ui.model.json.JSONModel();
    	oModelErrorMsgsLAS.setData( LA_errorSingle);
    	oErrorMsgsLATable.setModel(oModelErrorMsgsLAS);
    	oErrorMsgsLATable.bindRows("/");

    	sap.ui.getCore().byId("idLASMsgErrorFE").insertField(oErrorMsgsLATable,1);
	},

	resetLesseeApprovalSingle: function(){
		loggedInUserTypeLAS = objLoginUser.getLoggedInUserType();
		if(loggedInUserTypeLAS == "SEACO"){
			$("#idListDepotLAS").val("");
			sap.ui.getCore().byId("idDepotTextfieldLAS").setValue("");

			if(document.getElementById("idListDepotLAS")){
                document.getElementById("idListDepotLAS").style.borderColor = "#cccccc";
	    		document.getElementById("idListDepotLAS").style.background = "#ffffff";
	    		document.getElementById("idListDepotLAS").placeholder = "Select Depot";
			}
			if(sap.ui.getCore().byId("idBtnRemoveFilterLAS")){
				sap.ui.getCore().byId("idBtnRemoveFilterLAS").setEnabled(false);
			}
		}
		sap.ui.getCore().byId("idTFSrNoLas").setValue("");
		sap.ui.getCore().byId("idLASLookupResultFC").destroyFormElements();

		if(sap.ui.getCore().byId("idLASMsgTransFE")){
			sap.ui.getCore().byId("idLASMsgTransFE").destroyFields();
		}
		if(sap.ui.getCore().byId("idTblErrorMsgsLAS")){
			sap.ui.getCore().byId("idTblErrorMsgsLAS").destroy();
		}
		if(sap.ui.getCore().byId("idTFSrNoLas")){
        	  sap.ui.getCore().byId("idTFSrNoLas").setValueState(sap.ui.core.ValueState.None);
        	  sap.ui.getCore().byId("idTFSrNoLas").setPlaceholder("Serial Number");
          }
	}
	});

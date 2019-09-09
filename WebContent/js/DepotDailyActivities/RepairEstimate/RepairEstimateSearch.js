/******** NP *******/

/* MACALPHA19032018 - Changes done by Seyed Ismail on 19.03.2018 for Alpha Changes
1. Remove Unit Part Code information MACALPHA19032018_1
2. Add Lessor Survey and remove additional, superseding, pre sales, pre delivery MACALPHA19032018_2
3. Remove sale grade and add CW & Notes field MACALPHA19032018_3
*/

jQuery.sap.require("sap.ui.model.json.JSONModel");
var objcurntRESearch, objREstimateOnline // CURRNET FILE AND ONLINE REQUEST FILE OBJECT;
var objUtilREstimate = new utility();
var selctdUNDepoRESearch = "";
var selEstmtId = '';
var selDeotIdREEntry = '';
var delEstmtId = '';
var upc = null;

sap.ui.model.json.JSONModel.extend("RepairEstimateSearch", {
createRepairEstimate: function(){
		//alert(objLoginUser.getLoggedInUserName());
		//alert(objLoginUser.getLoggedInUserID());var oErrorTable = sap.ui.getCore().byId("idErrorTableRep");
		objcurntRESearch = new RepairEstimateSearch();
		objREstimateOnline = new RepairEstimateOnline();
		var depotEnabled = false, depotId = '';
		if(objLoginUser.getLoggedInUserType() == "SEACO"){
			depotEnabled = true;
		}else{
			depotId = objLoginUser.getLoggedInUserID();
		}
		// Responsive Grid Layout
			    var oRepairESearchLayout = new sap.ui.layout.form.ResponsiveGridLayout({
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

		// Labels
		var oLabelDepotRESearch = new sap.ui.commons.Label({text: "Depot:",
			required: true,
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
            wrapping: true}).addStyleClass("marginTop15");


		var oLabelSerialNoRESearch = new sap.ui.commons.Label({text: "Serial Number:",
			required: true,
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("marginTop15");

		var oLabelMandatoryRESearch = new sap.ui.commons.Label({text: "Mandatory Field",
			required: true,
			requiredAtBegin : true,
            wrapping: true}).addStyleClass("marginTop15");

		// Depot Drop-down
		var oComboDepotRESearch = new sap.ui.commons.ComboBox("idComboDepotRESearch", {
			  layoutData: new sap.ui.layout.GridData({span: "L4 M6 S12"}),
			  width:"100%",
			  //enabled: false,
			  editable: false,
			  showListExpander: false,
			  placeholder: "Select Depot",
	          displaySecondaryValues:false,
	          change: function(evnt){
				if(this.getValue() != '')
				{
					this.setValueState(sap.ui.core.ValueState.None);
					this.setPlaceholder("Select Depot");
					//sap.ui.getCore().byId("idBtnRemoveFilterRESearch").setEnabled(true);
				}else{
					//sap.ui.getCore().byId("idBtnRemoveFilterRESearch").setEnabled(false);
				}
	        	//sap.ui.getCore().byId("idTFDepotRESearch").setValue(this.getSelectedKey());
	          },
			afterClearText: function(evnt){
				//if(this.clearedValueBool == true)
					sap.ui.getCore().byId("idTFDepotRESearch").setValue('');
					sap.ui.getCore().byId("idBtnRemoveFilterRESearch").setEnabled(false);
			}
		}).addStyleClass("FormInputStyle marginTop7 DepotInput38px");

	 // Text Field
    	var oInputDepotRESearch = new sap.ui.commons.TextField('idTFDepotRESearch',{
    		placeholder: "Depot Code",
			//value: depotId,
			width:"85%",
			enabled: depotEnabled,
    		layoutData: new sap.ui.layout.GridData({span: "L1 M1 S8",linebreak: false, margin: true}),
    	}).addStyleClass("FormInputStyle marginTop7 DepotInput38px");

		oInputDepotRESearch.onfocusin =  function(e) {
				this.setValueState(sap.ui.core.ValueState.None);
				this.setPlaceholder("Depot Code");
		      };

    	var oInputSerialNoRESearch = new sap.ui.commons.TextField('idSerailNoRESearch',{
    		placeholder: "Serial Number",
    		layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12"}),
			value: "",
    	}).addStyleClass("FormInputStyle marginTop7 DepotInput38px");

		oInputSerialNoRESearch.onfocusin =  function(e) {
				this.setValueState(sap.ui.core.ValueState.None);
				this.setPlaceholder("Serial Number");
		      };

    	// Buttons
	   	var oBtnCorrMovDtSubmitRESearch = new sap.m.Button("idBtnAddMoveSubmitRESearch",{
				text : "Submit",
				width:"80px",
				styled:false,
				//layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: true}),
				press:function(){
					selEstmtId = '';
					estmtIdRJS = '';
					if(sap.ui.getCore().byId("idlblSuccessMsgREE") != undefined){
					sap.ui.getCore().byId("idlblSuccessMsgREE").setText("");
					sap.ui.getCore().byId("idlblSuccessMsgREE").setVisible(false);
					}
					objcurntRESearch.SubmitData();
		}}).addStyleClass("submitBtn");

	   	var oBtnLoadSavedRESearch = new sap.m.Button("idBtnLoadSavedRESearch",{
			text : "Load Saved Estimates",
			//width:"160px",
			styled:false,
			//layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
			press:function(){
				selEstmtId = '';
				estmtIdRJS = '';
				selDeotIdREEntry = '';
				var oTblLoadSaveDataRESearch = sap.ui.getCore().byId("idTblLoadSaveDataRESearch");
				if(oTblLoadSaveDataRESearch != undefined)
					sap.ui.getCore().byId("idTblLoadSaveDataRESearch").setVisible(true);


				var oTblLoadSaveDataRESearchHeader = sap.ui.getCore().byId("idTblLoadSaveDataRESearchHeader");
				if(oTblLoadSaveDataRESearchHeader != undefined)
					sap.ui.getCore().byId("idTblLoadSaveDataRESearchHeader").setVisible(true);

				objcurntRESearch.OnlinefunLoadSavedData();
		}}).addStyleClass("submitBtn");

		function fnResetCallbackMsgBox(sResult){
				selEstmtId = '';
				estmtIdRJS = '';
				//alert("sResult" + sResult);
				if(sResult == "YES"){
					var idComboDepotRESearch = sap.ui.getCore().byId("idComboDepotRESearch");
					var idTFDepotRESearch = sap.ui.getCore().byId("idTFDepotRESearch");
					var idSerailNoRESearch = sap.ui.getCore().byId("idSerailNoRESearch");
					sap.ui.getCore().byId("idBtnRemoveFilterRESearch").setEnabled(false);

					idComboDepotRESearch.setValueState(sap.ui.core.ValueState.None);
					idComboDepotRESearch.setPlaceholder("Select Depot");
					idTFDepotRESearch.setValueState(sap.ui.core.ValueState.None);
					idTFDepotRESearch.setPlaceholder("Depot Code");

					if(depotEnabled){
						idComboDepotRESearch.setValue('');
						idTFDepotRESearch.setValue('');
					}

					idSerailNoRESearch.setValue('');
					idSerailNoRESearch.setValueState(sap.ui.core.ValueState.None);
					idSerailNoRESearch.setPlaceholder("Serial Number");

					sap.ui.getCore().byId("idFrmElemntLoadSavedRESearch").destroyFields();
				}
			};

		var ResetMessage = "This will clear the screen content.\n Do you want to continue?";
		var oBtnResetRESearch = new sap.m.Button("idBtnResetRESearch",{
			text : "Reset",
			width:"80px",
			visible: false,
			styled:false,
			//layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
			press:function(){
						sap.ui.commons.MessageBox.show(ResetMessage,sap.ui.commons.MessageBox.Icon.WARNING,"Warning",
						[sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO],
						fnResetCallbackMsgBox, sap.ui.commons.MessageBox.Action.YES);
		}}).addStyleClass("submitBtn");

		// Flex Box
    	var oFlxBtnSbmt = new sap.m.FlexBox({
    	      items: [oBtnCorrMovDtSubmitRESearch, new sap.ui.commons.Label( {text: " ",width : '8px'}), oBtnLoadSavedRESearch,new sap.ui.commons.Label( {text: " ",width : '8px'}), oBtnResetRESearch],
    	      direction: "Row",
			  layoutData: new sap.ui.layout.GridData({span: "L12 M12 S12",linebreak: true, margin: false}),
    	    }).addStyleClass("marginTop10");

	   	var oBtnCorrMovDtApplyFilterRESearch = new sap.m.Button("idBtnAddMoveApplyFilterRESearch",{
		          text : "Apply Filter",
		          //width:"90px",
				  enabled: depotEnabled,
		          styled:false,
		          //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: false}),
		          press:function(){
					objcurntRESearch.applyFilter();
		          }}).addStyleClass("submitBtn");

	   	var oBtnCorrMovDtRemoveFilterRESearch = new sap.m.Button("idBtnRemoveFilterRESearch",{
	          text : "Remove Filter",
	          //width:"108px",
			  //visible: depotEnabled,
	          styled:false,
			  enabled:false,
	          //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
	          press:function(){
	        	sap.ui.getCore().byId("idComboDepotRESearch").setValue('');
	        	sap.ui.getCore().byId("idTFDepotRESearch").setValue('');
				sap.ui.getCore().byId("idComboDepotRESearch").setValueState(sap.ui.core.ValueState.None);
				sap.ui.getCore().byId("idComboDepotRESearch").setPlaceholder("Select Depot");
				sap.ui.getCore().byId("idTFDepotRESearch").setValueState(sap.ui.core.ValueState.None);
				sap.ui.getCore().byId("idTFDepotRESearch").setPlaceholder("Depot Code");
				sap.ui.getCore().byId("idBtnRemoveFilterRESearch").setEnabled(false);
	          }}).addStyleClass("submitBtn");

		var oFlxRESearch = new sap.m.FlexBox({
    	      items: [oBtnCorrMovDtApplyFilterRESearch,new sap.ui.commons.Label( {text: " ",width : '8px'}), oBtnCorrMovDtRemoveFilterRESearch],
    	      direction: "Row",
			  layoutData: new sap.ui.layout.GridData({span: "L4 M12 S12",linebreak: false, margin: false}),
    	    });

		var olblUnitPCodeREEntry = new sap.ui.commons.Label({text: "Unit Part Code:",
			required: true,
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: true, margin: true}),
			wrapping: true}).addStyleClass("marginTop10");

		var oDdlUnitPCodeREEntry = new sap.ui.commons.DropdownBox("idDdlUnitPCodeREEntry", {
			  layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12"}),
			  width:"100%",
			  displaySecondaryValues:false,
			  placeholder: "Select Unit Part Code",
			  change: function(evnt){
				if(this.getValue() != '')
				{
					this.setValueState(sap.ui.core.ValueState.None);
					this.setPlaceholder("Select Unit Part Code");
				}
			  },
		}).addStyleClass("FormInputStyle marginTop7 DepotInput38px");

		/*oDdlUnitPCodeREEntry.setModel(omdlGlobalRESData);
		oDdlUnitPCodeREEntry.bindItems("/UnitPartCode", oItmTmpltGloabREEntry);
		sap.ui.getCore().byId("idDdlUnitPCodeREEntry").setSelectedKey("C");*/

		var ddlUpcData = [];
		ddlUpcData.push({	"text":"C - Carcass",
									"key":"C"
						});

		ddlUpcData.push({	"text":"M - Machinery",
			"key":"M"
		});



  	  	var oDdlUpcModel = new sap.ui.model.json.JSONModel();
  	  	oDdlUpcModel.setSizeLimit(99999);
  	  	oDdlUpcModel.setData({data:ddlUpcData});

  	  	oDdlUnitPCodeREEntry.setModel(oDdlUpcModel);
  	  	oDdlUnitPCodeREEntry.setSelectedKey(ddlUpcData[0].key);
  	  	oDdlUnitPCodeREEntry.bindItems("/data", new sap.ui.core.ListItem({text: "{text}", key:"{key}"}));


	 // Online Form Starts
			     var oRepairESearchForm = new sap.ui.layout.form.Form({
			             layout: oRepairESearchLayout,
			             formContainers: [

			                     new sap.ui.layout.form.FormContainer({
			                             //title: "Repair Estimate Search",
		                             formElements: [
														new sap.ui.layout.form.FormElement({
														    fields: [oLabelDepotRESearch, oComboDepotRESearch, oInputDepotRESearch, oFlxRESearch]
														}),
														new sap.ui.layout.form.FormElement({
														    fields: [oLabelSerialNoRESearch, oInputSerialNoRESearch] // MACISMAIL
														}),
														// MACALPHA19032018_1 - Removed Unit Part Code Information
														/*
														new sap.ui.layout.form.FormElement({
														    fields: [olblUnitPCodeREEntry,oDdlUnitPCodeREEntry] // MACISMAIL
														}),*/
														new sap.ui.layout.form.FormElement({
														    fields: [oFlxBtnSbmt]
														}),
														new sap.ui.layout.form.FormElement({
														    fields: [oLabelMandatoryRESearch]
														}),
														new sap.ui.layout.form.FormElement({
														    fields: [new sap.ui.commons.HorizontalDivider({width: "100%", type: "Area", height: "Medium"})]
														}),
														new sap.ui.layout.form.FormElement("idFrmElemntLoadSavedRESearch",{
														    fields: []
														})
			                                     ]
			                     })
			             ]
			     });
				 this.getOnlinefunDepotCode();
			     	return oRepairESearchForm;
	},


	applyFilter: function() {
		if(sap.ui.getCore().byId("idTFDepotRESearch").getValue() != '')
			sap.ui.getCore().byId("idBtnRemoveFilterRESearch").setEnabled(true);
		else
			sap.ui.getCore().byId("idBtnRemoveFilterRESearch").setEnabled(false);

		var idComboDepotRESearch = sap.ui.getCore().byId("idComboDepotRESearch");
		idComboDepotRESearch.setValue("");
		//idComboDepotRESearch.setSelectedKeyCustm("");
		idComboDepotRESearch.setSelectedKey(sap.ui.getCore().byId("idTFDepotRESearch").getValue());
		idComboDepotRESearch.fireChange(this);
	},

	createTableLoadSavedData: function(jsnLoadSavedData){
		var olblSaveEstmtRESearch = new sap.ui.commons.Label("idTblLoadSaveDataRESearchHeader", {text: "Saved Estimates", wrapping: true}).addStyleClass("fontTitle");

		var oidTblLSavedDataRESearch = new sap.ui.table.Table(
			'idTblLoadSaveDataRESearch',
			{
				columnHeaderHeight : 30,
				enableColumnReordering: false,
				selectionMode : sap.ui.table.SelectionMode.None,
				navigationMode : sap.ui.table.NavigationMode.None,
				layoutData: new sap.ui.layout.GridData({span: "L12 M12 S12",linebreak: false, margin: false}),
			}).addStyleClass('tblBorder');

		oidTblLSavedDataRESearch.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({text : "Estimate Id"}),
			template : new sap.ui.commons.TextView().bindProperty("text", "EstimateId"),
			//hAlign : "Center",
			width : "90px",
			resizable:false
		}));

		oidTblLSavedDataRESearch.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({text : "Serial Number"}),
			template : new sap.ui.commons.TextView().bindProperty("text", "SerialNr"),
			//hAlign : "Center",
			width : "100px",
			resizable:false
		}));

		oidTblLSavedDataRESearch.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({text : "Unit Part Code"}),
			template : new sap.ui.commons.TextView().bindProperty("text", "Upc"),
			//hAlign : "Center",
			width : "100px",
			resizable:false
		}));

		oidTblLSavedDataRESearch.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({text : "Estimate Type"}),
			template : new sap.ui.commons.TextView().bindProperty("text", "EstimateType"),
			//hAlign : "Center",
			width : "100px",
			resizable:false
		}));

		oidTblLSavedDataRESearch.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({text : "Created Date"}),
			template : new sap.ui.commons.TextView().bindProperty("text", "CreatedDate"),
			//hAlign : "End",
			width : "100px",
			resizable:false
		}));

		oidTblLSavedDataRESearch.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({text : "Created Time"}),
			template : new sap.ui.commons.TextView().bindProperty("text", "CreatedTime"),
			//hAlign : "Center",
			width : "100px",
			resizable:false
		}));

		var oBtnTblSelectRESearch = new sap.ui.commons.Link({
				text: "Select",
				//width : "50px",
                press : function(evnt) {
                	estmtIdRJS = '';
					selEstmtId = this.getHelpId().split('|')[0];
					var unitnoselRow = '';
					if(this.getHelpId().split('|')[1] != undefined){
						unitnoselRow = this.getHelpId().split('|')[1];
					}
					var curr = evnt.getSource().getBindingContext().getProperty("Curr");
		          	var cost = evnt.getSource().getBindingContext().getProperty("Cost");
		          	var upc = evnt.getSource().getBindingContext().getProperty("Upc").substr(0,1);



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
				          	//depotCurr = resultdata.results[0].Message.substr(6,3);
				          	//fixedLabourRate = resultdata.results[0].Message.substr(10,(resultdata.results[0].Message.length));

				          	selDeotIdREEntry = '';
				          	var odepoRESearch = sap.ui.getCore().byId("idComboDepotRESearch");
							objcurntRESearch.openScreenREEntry(unitnoselRow,odepoRESearch.getSelectedKey(), odepoRESearch.getValue(), curr, cost, upc);

			          },
			          function(err){
			        	  //depotCurr = resultdata.results[0].Message.substr(6,3);
			        	  //fixedLabourRate = resultdata.results[0].Message.substr(10,(resultdata.results[0].Message.length));
			        	  //objcurntRESearch.openScreenREEntry(idSerailNoRESearch.getValue().toUpperCase(),odepoRESearch.getSelectedKey(), odepoRESearch.getValue(),depotCurr,fixedLabourRate);
			              //errorfunc(err);
			             //alert("Error while Reading Result : "+ window.JSON.stringify(err.response));
			             //return oFlexboxError;
			          });

				}}).bindProperty("helpId","EstimateIdUnitNo");
		//oBtnTblSelectRESearch.addStyleClass("submitBtn")
		/* var oBtnTblSelectRESearch = new sap.m.Button({
			text : "Select",
			width:"80px",
			styled:false,
			press:function(){
				objcurntRESearch.openScreenREEntry('selectrow');
			}}).addStyleClass("submitBtn"); */

		oidTblLSavedDataRESearch.addColumn(new sap.ui.table.Column({
			//label: new sap.ui.commons.Label({text: "Upload"}),
			template: oBtnTblSelectRESearch,
			width : "100px",
			resizable:false
		}));

		var oBtnTblDeleteRESearch = new sap.ui.commons.Link({
				text: "Delete",
				//width : "50px",
                press : function() {
					delEstmtId = this.getHelpId().split('|')[0];
					var msgAlrtDelet ="This action will delete the saved Repair Estimate.\nThis deletion cannot be undone.";
					sap.ui.commons.MessageBox.show(msgAlrtDelet,sap.ui.commons.MessageBox.Icon.WARNING,"Warning",
							[sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO],
							objcurntRESearch.fnDeleteLineMsgBox, sap.ui.commons.MessageBox.Action.YES);
					//var seletedRelRefNo = this.getText();
					//selectedRelUnit = this.getHelpId();
				}}).bindProperty("helpId","EstimateIdUnitNo");

		/* var oBtnTblDeleteRESearch = new sap.m.Button({
			text : "Delete",
			width:"80px",
			styled:false,
			//layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
			press:function(evnt){
				var getrowindx = sap.ui.getCore().byId("idTblLoadSaveDataRESearch");
				objcurntRESearch.onlinefunDeleteEstimate();
			}}).addStyleClass("submitBtn"); */

		oidTblLSavedDataRESearch.addColumn(new sap.ui.table.Column({
			//label: new sap.ui.commons.Label({text: "Upload"}),
			width : "100px",
			template: oBtnTblDeleteRESearch,
			resizable:false
		}));

		var oMdlErrTblRESearch = new sap.ui.model.json.JSONModel();
		oMdlErrTblRESearch.setData({modelData : []});
		oidTblLSavedDataRESearch.setModel(oMdlErrTblRESearch);
		oidTblLSavedDataRESearch.bindRows("/modelData");

		oMdlErrTblRESearch.setData({modelData : jsnLoadSavedData});
		oidTblLSavedDataRESearch.setModel(oMdlErrTblRESearch);
		oidTblLSavedDataRESearch.bindRows("/modelData");
		if(jsnLoadSavedData.length < 1){
			oidTblLSavedDataRESearch.setVisibleRowCount(5);
			oidTblLSavedDataRESearch.setNavigationMode(sap.ui.table.NavigationMode.None);
		}else if((jsnLoadSavedData.length == 1) && (jsnLoadSavedData[0].Message == 'No saved estimates found')){
			jsnLoadSavedData.length = 0;
			oidTblLSavedDataRESearch.bindRows("/modelData");
			oidTblLSavedDataRESearch.setVisibleRowCount(5);
			oidTblLSavedDataRESearch.setNavigationMode(sap.ui.table.NavigationMode.None);
		}
		else if(jsnLoadSavedData.length < 26){
			oidTblLSavedDataRESearch.setVisibleRowCount(jsnLoadSavedData.length);
			oidTblLSavedDataRESearch.setNavigationMode(sap.ui.table.NavigationMode.None);
		}else{
			oidTblLSavedDataRESearch.setVisibleRowCount(25);
			oidTblLSavedDataRESearch.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		}

		var oFlxSaveExtmtRESearch = new sap.m.FlexBox("idFlxBxReleaseCDBR",{
			  items:[olblSaveEstmtRESearch, oidTblLSavedDataRESearch],
			  //width:"90%",
			  layoutData: new sap.ui.layout.GridData({span: "L10 M12 S12",linebreak: false, margin: false}),
			  direction: "Column"
			 }).addStyleClass("marginTop10");

		return oFlxSaveExtmtRESearch;
	},
	fnDeleteLineMsgBox: function(sResult){
		if(sResult == "YES"){
			objcurntRESearch.onlinefunDeleteEstimate(delEstmtId);
		}
	},
	//DELETE ESTIMATE ONLINE
	onlinesuccessfunDeleteEstimate: function(resultdata, response){
		var msg ='';
		busyDialog.close();

		if(resultdata != undefined){
			if(resultdata.results.length > 0){
				//msg = resultdata.results[0].MessageHdr + '\n' + resultdata.results[0].MessageItm;
				objcurntRESearch.OnlinefunLoadSavedData();
			}else{
				sap.ui.commons.MessageBox.alert("Error occured during deletion estimate.");
			}
		}else{
			sap.ui.commons.MessageBox.alert("Error occured during deletion estimate.");
		}
	},

	onlineerrorfunDeleteEstimate: function(err){
		//sap.ui.getCore().byId("idFrmElemntLoadSavedRESearch").destroyFields();
		errorfromServer(err);
	},

	onlinefunDeleteEstimate: function(estimateId){
		try{
			busyDialog.open();
			var urlToCall = serviceUrl15_old + "/Load_Saved_Estimates_Delete?";
				urlToCall += "$filter=EstimateId eq '"+ estimateId +"'";

		    objUtilREstimate.doOnlineRequest(urlToCall,objcurntRESearch.onlinesuccessfunDeleteEstimate, objcurntRESearch.onlineerrorfunDeleteEstimate);
		}catch(e){
			busyDialog.close();
			sap.ui.commons.MessageBox.alert("Error on Deleting estimate " + e);
		}
	},

	//LOAD SAVED DATA FOR ESTIMATE
	onlinesuccessfunLoadSavedData: function(resultdata, response){
		busyDialog.close();
		jQuery.sap.require("sap.ui.model.json.JSONModel");
		var jsnLoadSavedData = [];

		if(resultdata != undefined){

			var depotVal = sap.ui.getCore().byId("idTFDepotRESearch").getValue();
			var serialVal = sap.ui.getCore().byId("idSerailNoRESearch").getValue();

			// If neither depot nor serial entered...!
			if(depotVal == "" && serialVal == ""){
				for(var indx in resultdata.results){
					var datenw = resultdata.results[indx].CreatedDt.split('(')[1].split(')')[0];
						//cnvrtDate=  new Date(parseInt(datenw)).format("dd-mm-yyyy");;
					cnvrtDate= dateFormat(new Date(Number(datenw)), 'dd-mm-yyyy',"UTC");

					//var crtedTime ='';
					if(resultdata.results[indx].CreatedTime != '')
						var crtedTime = "";
						crtedTime = resultdata.results[indx].CreatedTime;

					var cnvrtTime = crtedTime.substr(2,2)+':'+crtedTime.substr(5,2)+':'+crtedTime.substr(8,2);
						jsnLoadSavedData.push({
							"EstimateId":objUtilREstimate.removeLeadZero(resultdata.results[indx].EstimateId),
							"EstimateIdUnitNo":resultdata.results[indx].EstimateId+'|'+resultdata.results[indx].SerialNumber,
							"SerialNr": resultdata.results[indx].SerialNumber,
							"EstimateType": resultdata.results[indx].EstimateType,
							"CreatedDate": cnvrtDate,
							"CreatedTime": cnvrtTime,
							"Message": resultdata.results[indx].Message,
							"Cost": resultdata.results[indx].Cost,
							"Curr": resultdata.results[indx].Curr,
							"Upc": (resultdata.results[indx].UnitPartcode == 'C')?'Carcass' : 'Machinery',
						});
					}
			}

			// If just the serial entered...!
			else if(depotVal == "" && serialVal != ""){
				for(var indx in resultdata.results){
					if(resultdata.results[indx].SerialNumber == serialVal){
						var datenw = resultdata.results[indx].CreatedDt.split('(')[1].split(')')[0];
						//cnvrtDate=  new Date(parseInt(datenw)).format("dd-mm-yyyy");;
					cnvrtDate= dateFormat(new Date(Number(datenw)), 'dd-mm-yyyy',"UTC");

					//var crtedTime ='';
					if(resultdata.results[indx].CreatedTime != '')
					var crtedTime = "";
					crtedTime = resultdata.results[indx].CreatedTime;
					var cnvrtTime = crtedTime.substr(2,2)+':'+crtedTime.substr(5,2)+':'+crtedTime.substr(8,2);
						jsnLoadSavedData.push({
							"EstimateId":objUtilREstimate.removeLeadZero(resultdata.results[indx].EstimateId),
							"EstimateIdUnitNo":resultdata.results[indx].EstimateId+'|'+resultdata.results[indx].SerialNumber,
							"SerialNr": resultdata.results[indx].SerialNumber,
							"EstimateType": resultdata.results[indx].EstimateType,
							"CreatedDate": cnvrtDate,
							"CreatedTime": cnvrtTime,
							"Message": resultdata.results[indx].Message,
							"Cost": resultdata.results[indx].Cost,
							"Curr": resultdata.results[indx].Curr,
							"Upc": (resultdata.results[indx].UnitPartcode == 'C')?'Carcass' : 'Machinery',
						});
					}

					}
			}


			// If just the depot entered...!
			else if(depotVal != "" && serialVal == ""){
				for(var indx in resultdata.results){
					if(objUtilREstimate.removeLeadZero(resultdata.results[indx].Para3) == depotVal){
						var datenw = resultdata.results[indx].CreatedDt.split('(')[1].split(')')[0];
						//cnvrtDate=  new Date(parseInt(datenw)).format("dd-mm-yyyy");;
					cnvrtDate= dateFormat(new Date(Number(datenw)), 'dd-mm-yyyy',"UTC");

					//var crtedTime ='';
					if(resultdata.results[indx].CreatedTime != '')
					var crtedTime = "";
					crtedTime = resultdata.results[indx].CreatedTime;
					var cnvrtTime = crtedTime.substr(2,2)+':'+crtedTime.substr(5,2)+':'+crtedTime.substr(8,2);
						jsnLoadSavedData.push({
							"EstimateId":objUtilREstimate.removeLeadZero(resultdata.results[indx].EstimateId),
							"EstimateIdUnitNo":resultdata.results[indx].EstimateId+'|'+resultdata.results[indx].SerialNumber,
							"SerialNr": resultdata.results[indx].SerialNumber,
							"EstimateType": resultdata.results[indx].EstimateType,
							"CreatedDate": cnvrtDate,
							"CreatedTime": cnvrtTime,
							"Message": resultdata.results[indx].Message,
							"Cost": resultdata.results[indx].Cost,
							"Curr": resultdata.results[indx].Curr,
							"Upc": (resultdata.results[indx].UnitPartcode == 'C')?'Carcass' : 'Machinery',
						});
					}

					}
			}

			// If both the depot and the serial entered...!
			else if(depotVal != "" && serialVal != ""){
				for(var indx in resultdata.results){
					if(objUtilREstimate.removeLeadZero(resultdata.results[indx].Para3) == depotVal &&
							resultdata.results[indx].SerialNumber == serialVal){
					var datenw = resultdata.results[indx].CreatedDt.split('(')[1].split(')')[0];
						//cnvrtDate=  new Date(parseInt(datenw)).format("dd-mm-yyyy");;
					cnvrtDate= dateFormat(new Date(Number(datenw)), 'dd-mm-yyyy',"UTC");

					//var crtedTime ='';
					if(resultdata.results[indx].CreatedTime != '')
					var crtedTime = "";
					crtedTime = resultdata.results[indx].CreatedTime;
					var cnvrtTime = crtedTime.substr(2,2)+':'+crtedTime.substr(5,2)+':'+crtedTime.substr(8,2);
						jsnLoadSavedData.push({
							"EstimateId":objUtilREstimate.removeLeadZero(resultdata.results[indx].EstimateId),
							"EstimateIdUnitNo":resultdata.results[indx].EstimateId+'|'+resultdata.results[indx].SerialNumber,
							"SerialNr": resultdata.results[indx].SerialNumber,
							"EstimateType": resultdata.results[indx].EstimateType,
							"CreatedDate": cnvrtDate,
							"CreatedTime": cnvrtTime,
							"Message": resultdata.results[indx].Message,
							"Cost": resultdata.results[indx].Cost,
							"Curr": resultdata.results[indx].Curr,
							"Upc": (resultdata.results[indx].UnitPartcode == 'C')?'Carcass' : 'Machinery',
						});
					}

					}
			}



		}
		sap.ui.getCore().byId("idFrmElemntLoadSavedRESearch").insertField(objcurntRESearch.createTableLoadSavedData(jsnLoadSavedData));
	},

	onlineerrorfunLoadSavedData: function(err){
		sap.ui.getCore().byId("idFrmElemntLoadSavedRESearch").destroyFields();
		errorfromServer(err);
	},

	OnlinefunLoadSavedData: function(){
		sap.ui.getCore().byId("idFrmElemntLoadSavedRESearch").destroyFields();
		try{
			busyDialog.open();
			var urlToCall = serviceUrl15_old + "/Load_Saved_Estimates?";
			urlToCall += "$filter=UserId eq '" + objLoginUser.getLoggedInUserName() + "' and Para1 eq ' '";

		    objUtilREstimate.doOnlineRequest(urlToCall,objcurntRESearch.onlinesuccessfunLoadSavedData, objcurntRESearch.onlineerrorfunLoadSavedData);
		}catch(e){
			busyDialog.close();
			sap.ui.commons.MessageBox.alert("Error on loading Estimate" + e);
		}
	},
	//VALIDATION FOR FEILDS
	ValidateDataBeforeSubmit: function(){
		var idComboDepotRESearch = sap.ui.getCore().byId("idComboDepotRESearch");
		var idSerailNoRESearch = sap.ui.getCore().byId("idSerailNoRESearch");
		var valid = true;

		if(idComboDepotRESearch.getSelectedKey() == ''){
			if(idComboDepotRESearch.getValue() != '')
				idComboDepotRESearch.setPlaceholder("Invalid Depot");
			else
				idComboDepotRESearch.setPlaceholder("Required");

			idComboDepotRESearch.setValue('');
			idComboDepotRESearch.setValueState(sap.ui.core.ValueState.Error);
			valid = false;
		}

		if(idSerailNoRESearch.getValue() == ''){
			idSerailNoRESearch.setValueState(sap.ui.core.ValueState.Error);
			idSerailNoRESearch.setPlaceholder("Required");
			valid = false;
		}else if(!objUtilREstimate.validateUnitNumber($.trim(idSerailNoRESearch.getValue()))){
			idSerailNoRESearch.setValue('');
			idSerailNoRESearch.setValueState(sap.ui.core.ValueState.Error);
			idSerailNoRESearch.setPlaceholder("Invalid Value");
			//sap.ui.commons.MessageBox.alert("You have input an invalid Unit Number.\n Please enter a valid  Unit Number -11-char alpha numeric.");
			valid = false;
		}

		return valid;
	},
	//NAVIGATE TO ENTRY SCREEN
	openScreenREEntry: function(untNo, depotid,depotText, currency, labRate, upc){
			//var oUnitNoRESearch = sap.ui.getCore().byId("idSerailNoRESearch");
			selctdUNDepoRESearch = untNo.toUpperCase() + '|' + depotid + '|' + depotText;
			var oErrorTable = sap.ui.getCore().byId("idErrorTableRep");
			var oErrorTableRJS = sap.ui.getCore().byId("idErrorTableRepJS");
			var oLabelErrorRepMsgs = sap.ui.getCore().byId("idlblSuccessMsgREE");
			var oRRRepairEstim = sap.ui.getCore().byId("idRRRepairEstim");
			var oRRRepairEstimJS = sap.ui.getCore().byId("idRRRepairEstimJS");
			var oRRJobType = sap.ui.getCore().byId("idDdlJobTypeREEntry");
			if(oRRJobType != undefined && oRRJobType.getSelectedKey() == 'Joint Survey'){
				oRRJobType.setSelectedKey('Original');
			}

//			if(oErrorTable != undefined)
//				oErrorTable.destroy();
//			if(oErrorTableRJS != undefined)
//				oErrorTableRJS.destroy();
//			if(oLabelErrorRepMsgs != undefined)
//				oLabelErrorRepMsgs.destroy();
//			if(oRRRepairEstim != undefined)
//				oRRRepairEstim.destroy();
//			if(oRRRepairEstimJS != undefined)
//				oRRRepairEstimJS.destroy();

//			if(oFlxMainREEntry != undefined)
//			{
//				oFlxMainREEntry.destroyItems();
//				var objREEntry = new RepairEstimateEntry();
//				oFlxMainREEntry.addItem(objREEntry.createRepairEstimateEntryForm());
//				var scrollid = sap.ui.getCore().byId("RepairEstimateEntryVw").page._oScroller._sContentId;
//				c = $.sap.byId(scrollid).parent()
//				c.animate({scrollTop:0})
//				//sap.ui.getCore().byId("RepairEstimateEntryVw").page._oScroller.getScrollTop();
//			}

//			if(oFlxMainREEntry == undefined)
//			{
//				//oFlxMainREEntry.destroyItems();
//				var objREEntry = new RepairEstimateEntry();
//				oFlxMainREEntry.addItem(objREEntry.createRepairEstimateEntryForm());
//				var scrollid = sap.ui.getCore().byId("RepairEstimateEntryVw").page._oScroller._sContentId;
//				c = $.sap.byId(scrollid).parent()
//				c.animate({scrollTop:0})
//				//sap.ui.getCore().byId("RepairEstimateEntryVw").page._oScroller.getScrollTop();
//			}

			if(sap.ui.getCore().byId("idRRRepairEstim") != undefined)
			sap.ui.getCore().byId("idRRRepairEstim").destroy();
			if(sap.ui.getCore().byId("idErrorTableRep") != undefined)
			sap.ui.getCore().byId("idErrorTableRep").destroy();

			var bus = sap.ui.getCore().getEventBus();
			bus.publish("nav", "to", {id : "RepairEstimateEntryVw"});

			if(sap.ui.getCore().byId("idRRRepairEstim") != undefined)
			sap.ui.getCore().byId("idRRRepairEstim").setVisible(false);
			if(sap.ui.getCore().byId("idErrorTableRep") != undefined)
			sap.ui.getCore().byId("idErrorTableRep").setVisible(false);
			var upctext = null;
			if(upc == 'C'){
				upcText = 'Carcass';
			}else if(upc == 'M'){
				upcText = 'Machinery';
			}
			unitNo = untNo.toUpperCase();
			//sap.ui.getCore().byId("idlblEstmtHdrREEntry").setText("Estimate For " + untNo.toUpperCase() + " - " + upcText + " at " + depotid); // MACALPHA19032018_1- - Remove upcText
			sap.ui.getCore().byId("idlblEstmtHdrREEntry").setText("Estimate For " + untNo.toUpperCase() + " at " + depotid); // MACALPHA19032018_1+ - Remove upcText
			sap.ui.getCore().byId("idDdlUnitPCodeREEntryIn").setSelectedKey(upc);
			sap.ui.getCore().byId("idTFCurrnCodeREEntry").setValue(currency);
			 if(selEstmtId != ''){
					objREstimateOnline.onlinefunEstimateHdr(unitNo, DepoId, DepoText);
					objREstimateOnline.onlinefunEstmtLineItem();

			      	var filterGrid = "/Load_Estimates_Item?$filter=EstimateId eq '"+selEstmtId+"'";

					busyDialog.open();
					var urlToCall = serviceUrl15 + filterGrid;
					oModel = new sap.ui.model.odata.ODataModel(serviceUrl15, true);
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
					    	var dataLen = data.results.length;
							excelData = new Array(dataLen);
							for (var i = 0; i < dataLen; i++) {
								excelData[i] = new Array(13);
							}
							for(var indx=0; indx<dataLen; indx++){
								excelData[indx][0] = data.results[indx].LocationCode;
					 			excelData[indx][1] = data.results[indx].ComponentCode;
					 			excelData[indx][2] = data.results[indx].DamageCode;
					 			excelData[indx][3] = data.results[indx].MaterialCode;
					 			excelData[indx][4] = data.results[indx].RepairCode;
					 			excelData[indx][5] = data.results[indx].RepairLength;
					 			excelData[indx][6] = data.results[indx].RepairWidth;
					 			excelData[indx][7] = data.results[indx].Quantity;
					 			excelData[indx][8] = data.results[indx].ManHours;
					 			excelData[indx][9] = data.results[indx].MaterialCost;
					 			//excelData[indx][10] = data.results[indx].LabourRate;
					 			excelData[indx][10] = data.results[indx].BulletinNumber;
					 			excelData[indx][11] = data.results[indx].Responsibility;
							}

				 			oExcelGrid.loadData(excelData);
							busyDialog.close();
					    },
					    function(err){
					    	busyDialog.close();
					    	errorfromServer(err);
					    	//alert("Error while reading region : "+ window.JSON.stringify(err.response));
					    });
				 }else{
					 if(bulletinValues.length != 0){
				    	var bullLen = bulletinValues.length ;
						excelData = new Array(bullLen);
						for (var i = 0; i < 20; i++) {
							excelData[i] = new Array(13);
						}
						for(var indx=0; indx<bullLen; indx++){
							excelData[indx][0] = "";
				 			excelData[indx][1] = "BUL";
				 			excelData[indx][2] = "";
				 			excelData[indx][3] = "";
				 			excelData[indx][4] = "";
				 			excelData[indx][5] = "";
				 			excelData[indx][6] = "";
				 			excelData[indx][7] = "";
				 			excelData[indx][8] = "";
				 			excelData[indx][9] = "";
				 			excelData[indx][10] = bulletinValues[indx].bulletin;
				 			excelData[indx][11] = "";
						}

			 			oExcelGrid.loadData(excelData);
				 }
				 else{


					    excelData = new Array(20);
						for (var i = 0; i < 20; i++) {
							excelData[i] = new Array(13);
						}
						for(var indx=0; indx<20; indx++){
							excelData[indx][0] = "";
				 			excelData[indx][1] = "";
				 			excelData[indx][2] = "";
				 			excelData[indx][3] = "";
				 			excelData[indx][4] = "";
				 			excelData[indx][5] = "";
				 			excelData[indx][6] = "";
				 			excelData[indx][7] = "";
				 			excelData[indx][8] = "";
				 			excelData[indx][9] = "";
				 			excelData[indx][10] = "";
				 			excelData[indx][11] = "";
				 			excelData[indx][12] = "";
						}

			 			oExcelGrid.loadData(excelData);

					 }
				 }

			var scrollid = sap.ui.getCore().byId("RepairEstimateEntryVw").page._oScroller._sContentId;
			c = $.sap.byId(scrollid).parent();
			c.animate({scrollTop:0});
	},

	SubmitData: function(){
		try{
			var idComboDepotRESearch = sap.ui.getCore().byId("idComboDepotRESearch");
			var idSerailNoRESearch = sap.ui.getCore().byId("idSerailNoRESearch");
			var vUnitPartCode = sap.ui.getCore().byId("idDdlUnitPCodeREEntry").getSelectedKey();
			upc = vUnitPartCode;
			if(!this.ValidateDataBeforeSubmit()){
				return;
			}
			selDeotIdREEntry = idComboDepotRESearch.getSelectedKey();
			objREstimateOnline.onlineValidUnitDepot(idSerailNoRESearch.getValue().toUpperCase(),idComboDepotRESearch.getValue(), vUnitPartCode);

			//objcurntRESearch.openScreenREEntry(idSerailNoRESearch.getValue());
		}catch(e){

		}
	},
	//FETCH DEPOT DETAIL FOR DROP DOWN
	onlinesuccessfunDepotCode: function(resultdata, response){
		busyDialog.close();
		jQuery.sap.require("sap.ui.model.json.JSONModel");
		var oDepotCode = sap.ui.getCore().byId("idComboDepotRESearch");
		//oDepotCode.addItem(new sap.ui.core.ListItem({text:"", key: ""}));
		if(resultdata != undefined){
			if(resultdata.results.length > 0){
				for(var indx in resultdata.results){
					oDepotCode.addItem(new sap.ui.core.ListItem({text:resultdata.results[indx].FunctionalLoc, key: resultdata.results[indx].Depot}));
				}

				if(objLoginUser.getLoggedInUserType() != "SEACO"){
					oDepotCode.setSelectedKey(objLoginUser.getLoggedInUserID());
					sap.ui.getCore().byId("idTFDepotRESearch").setValue(objLoginUser.getLoggedInUserID());
				}

				//objcurntRESearch.applyFilter(); // SET DEFAULT VALUE IN AUTOCOMPLETE FOR ALL TYPE USER
			}
		}
	},

	onlineerrorfunDepotCode: function(err){
		var oDepotCode = sap.ui.getCore().byId("idComboDepotRESearch");
		oDepotCode.addItem(new sap.ui.core.ListItem({text:"", key: ""}));
		errorfromServer(err);
	},

	getOnlinefunDepotCode: function(unitNumber, DnNumber){
		try{
			//var loginusename = objLoginUser.getLoggedInUserName();
			sap.ui.getCore().byId("idComboDepotRESearch").destroyItems();
			busyDialog.open();
			//http://seanwgd1.gessap.local:8000/sap/opu/odata/sap/ZNW_SEACO_PORTAL_REQ15_SRV/F4_Functional_Location
			//var oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
			//http://seanwgd1.gessap.local:8000/sap/opu/odata/sap/ZNW_SEACO_PORTAL_LOT4_SECURITY_SRV/Single_Doctype_F4?$filter=Bname eq 'ztest_dm' and Dept eq ''
		    //var urlToCall = serviceUrl + "/F4_Unit_Type_Single";
			//var urlToCall = "http://seanwgd1.gessap.local:8000/sap/opu/odata/sap/ZNW_SEACO_PORTAL_REQ15_SRV/F4_Functional_Location"; //F4_Depot_Names?$filter=City eq ''";
			var urlToCall = serviceUrl15_old + "/F4_Functional_Location";
		    objUtilREstimate.doOnlineRequest(urlToCall,this.onlinesuccessfunDepotCode, this.onlineerrorfunDepotCode);
		}catch(e){
			busyDialog.close();
			sap.ui.commons.MessageBox.alert("Error on fetching Depot Code" + e);
		}
	},

	fnResetRepairEstmtSearch: function (){
		selEstmtId = '';
		estmtIdRJS = '';
		var depotEnabled =false;

		if(objLoginUser.getLoggedInUserType() == "SEACO"){
			depotEnabled = true;
		}

		var idComboDepotRESearch = sap.ui.getCore().byId("idComboDepotRESearch");
		var idTFDepotRESearch = sap.ui.getCore().byId("idTFDepotRESearch");
		var idSerailNoRESearch = sap.ui.getCore().byId("idSerailNoRESearch");
		var idDdlUnitPCodeREEntry = sap.ui.getCore().byId("idDdlUnitPCodeREEntry");

		if(sap.ui.getCore().byId("idBtnRemoveFilterRESearch") != undefined)
			sap.ui.getCore().byId("idBtnRemoveFilterRESearch").setEnabled(false);

		if(idComboDepotRESearch != undefined){
			idComboDepotRESearch.setValueState(sap.ui.core.ValueState.None);
			idComboDepotRESearch.setPlaceholder("Select Depot");

			if(depotEnabled){
				idComboDepotRESearch.setValue('');
				idTFDepotRESearch.setValue('');
			}
		}

		if(idTFDepotRESearch != undefined){
			idTFDepotRESearch.setValueState(sap.ui.core.ValueState.None);
			idTFDepotRESearch.setPlaceholder("Depot Code");
		}


		if(idSerailNoRESearch != undefined){
			idSerailNoRESearch.setValue('');
			idSerailNoRESearch.setValueState(sap.ui.core.ValueState.None);
			idSerailNoRESearch.setPlaceholder("Serial Number");
		}

		if(idDdlUnitPCodeREEntry != undefined){
			idDdlUnitPCodeREEntry.setSelectedKey("C");
		}

		if(sap.ui.getCore().byId("idFrmElemntLoadSavedRESearch") != undefined)
			sap.ui.getCore().byId("idFrmElemntLoadSavedRESearch").destroyFields();
	}
});

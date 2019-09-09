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
jQuery.sap.require("sap.ui.model.json.JSONModel");
var objcurntRESearchJ, objREstimateOnlineJ; // CURRNET FILE AND ONLINE REQUEST FILE OBJECT;
var objUtilREstimate = new utility();
var selctdUNDepoRESearchJ = "";
var selEstmtId = '';
var selDeotIdREEntryJ = '';
var delEstmtId = '';
var upc = null;

sap.ui.model.json.JSONModel.extend("RepairEstimateSearchJ", {
createRepairEstimateJ: function(){
		//alert(objLoginUser.getLoggedInUserName());
		//alert(objLoginUser.getLoggedInUserID());var oErrorTable = sap.ui.getCore().byId("idErrorTableRepJ");
		objcurntRESearchJ = new RepairEstimateSearchJ();
		objREstimateOnlineJ = new RepairEstimateOnlineJ();
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
		var oLabelDepotRESearchJ = new sap.ui.commons.Label({text: "Depot:",
			required: true,
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
            wrapping: true}).addStyleClass("marginTop15");


		var oLabelSerialNoRESearchJ = new sap.ui.commons.Label({text: "Serial Number:",
			required: true,
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: true, margin: true}),
            wrapping: true}).addStyleClass("marginTop15");

		var oLabelMandatoryRESearchJ = new sap.ui.commons.Label({text: "Mandatory Field",
			required: true,
			requiredAtBegin : true,
            wrapping: true}).addStyleClass("marginTop15");

		// Depot Drop-down
		var oComboDepotRESearchJ = new sap.ui.commons.ComboBox("idComboDepotRESearchJ", {
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
					//sap.ui.getCore().byId("idBtnRemoveFilterRESearchJ").setEnabled(true);
				}else{
					//sap.ui.getCore().byId("idBtnRemoveFilterRESearchJ").setEnabled(false);
				}
	        	//sap.ui.getCore().byId("idTFDepotRESearchJ").setValue(this.getSelectedKey());
	          },
			afterClearText: function(evnt){
				//if(this.clearedValueBool == true)
					sap.ui.getCore().byId("idTFDepotRESearchJ").setValue('');
					sap.ui.getCore().byId("idBtnRemoveFilterRESearchJ").setEnabled(false);
			}
		}).addStyleClass("FormInputStyle marginTop7 DepotInput38px");

	 // Text Field
    	var oInputDepotRESearchJ = new sap.ui.commons.TextField('idTFDepotRESearchJ',{
    		placeholder: "Depot Code",
			//value: depotId,
			width:"85%",
			enabled: depotEnabled,
    		layoutData: new sap.ui.layout.GridData({span: "L1 M1 S8",linebreak: false, margin: true}),
    	}).addStyleClass("FormInputStyle marginTop7 DepotInput38px");

		oInputDepotRESearchJ.onfocusin =  function(e) {
				this.setValueState(sap.ui.core.ValueState.None);
				this.setPlaceholder("Depot Code");
		      };

    	var oInputSerialNoRESearchJ = new sap.ui.commons.TextField('idSerailNoRESearchJ',{
    		placeholder: "Serial Number",
    		layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12"}),
			value: "",
    	}).addStyleClass("FormInputStyle marginTop7 DepotInput38px");

		oInputSerialNoRESearchJ.onfocusin =  function(e) {
				this.setValueState(sap.ui.core.ValueState.None);
				this.setPlaceholder("Serial Number");
		      };

    	// Buttons
	   	var oBtnCorrMovDtSubmitRESearchJ = new sap.m.Button("idBtnAddMoveSubmitRESearchJ",{
				text : "Submit",
				width:"80px",
				styled:false,
				//layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: true}),
				press:function(){
					selEstmtId = '';
					estmtIdRJS = '';
					if(sap.ui.getCore().byId("idlblSuccessMsgREEJ") != undefined){
						sap.ui.getCore().byId("idlblSuccessMsgREEJ").setText("");
						sap.ui.getCore().byId("idlblSuccessMsgREEJ").setVisible(false);
					}
					objcurntRESearchJ.SubmitData();
		}}).addStyleClass("submitBtn");

	   	var oBtnLoadSavedRESearchJ = new sap.m.Button("idBtnLoadSavedRESearchJ",{
			text : "Load Saved Estimates",
			//width:"160px",
			styled:false,
			//layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
			press:function(){
				selEstmtId = '';
				estmtIdRJS = '';
				selDeotIdREEntryJ = '';
				var oTblLoadSaveDataRESearchJ = sap.ui.getCore().byId("idTblLoadSaveDataRESearchJ");
				if(oTblLoadSaveDataRESearchJ != undefined)
					sap.ui.getCore().byId("idTblLoadSaveDataRESearchJ").setVisible(true);


				var oTblLoadSaveDataRESearchJHeader = sap.ui.getCore().byId("idTblLoadSaveDataRESearchJHeader");
				if(oTblLoadSaveDataRESearchJHeader != undefined)
					sap.ui.getCore().byId("idTblLoadSaveDataRESearchJHeader").setVisible(true);

				objcurntRESearchJ.OnlinefunLoadSavedData();
		}}).addStyleClass("submitBtn");

		function fnResetCallbackMsgBox(sResult){
				selEstmtId = '';
				estmtIdRJS = '';
				//alert("sResult" + sResult);
				if(sResult == "YES"){
					var idComboDepotRESearchJ = sap.ui.getCore().byId("idComboDepotRESearchJ");
					var idTFDepotRESearchJ = sap.ui.getCore().byId("idTFDepotRESearchJ");
					var idSerailNoRESearchJ = sap.ui.getCore().byId("idSerailNoRESearchJ");
					sap.ui.getCore().byId("idBtnRemoveFilterRESearchJ").setEnabled(false);

					idComboDepotRESearchJ.setValueState(sap.ui.core.ValueState.None);
					idComboDepotRESearchJ.setPlaceholder("Select Depot");
					idTFDepotRESearchJ.setValueState(sap.ui.core.ValueState.None);
					idTFDepotRESearchJ.setPlaceholder("Depot Code");

					if(depotEnabled){
						idComboDepotRESearchJ.setValue('');
						idTFDepotRESearchJ.setValue('');
					}

					idSerailNoRESearchJ.setValue('');
					idSerailNoRESearchJ.setValueState(sap.ui.core.ValueState.None);
					idSerailNoRESearchJ.setPlaceholder("Serial Number");

					sap.ui.getCore().byId("idFrmElemntLoadSavedRESearchJ").destroyFields();
				}
			};

		var ResetMessage = "This will clear the screen content.\n Do you want to continue?";
		var oBtnResetRESearchJ = new sap.m.Button("idBtnResetRESearchJ",{
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
    	      items: [oBtnCorrMovDtSubmitRESearchJ, new sap.ui.commons.Label( {text: " ",width : '8px'}), oBtnLoadSavedRESearchJ,new sap.ui.commons.Label( {text: " ",width : '8px'}), oBtnResetRESearchJ],
    	      direction: "Row",
			  layoutData: new sap.ui.layout.GridData({span: "L12 M12 S12",linebreak: true, margin: false}),
    	    }).addStyleClass("marginTop10");

	   	var oBtnCorrMovDtApplyFilterRESearchJ = new sap.m.Button("idBtnAddMoveApplyFilterRESearchJ",{
		          text : "Apply Filter",
		          //width:"90px",
				  enabled: depotEnabled,
		          styled:false,
		          //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: false}),
		          press:function(){
					objcurntRESearchJ.applyFilter();
		          }}).addStyleClass("submitBtn");

	   	var oBtnCorrMovDtRemoveFilterRESearchJ = new sap.m.Button("idBtnRemoveFilterRESearchJ",{
	          text : "Remove Filter",
	          //width:"108px",
			  //visible: depotEnabled,
	          styled:false,
			  enabled:false,
	          //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
	          press:function(){
	        	sap.ui.getCore().byId("idComboDepotRESearchJ").setValue('');
	        	sap.ui.getCore().byId("idTFDepotRESearchJ").setValue('');
				sap.ui.getCore().byId("idComboDepotRESearchJ").setValueState(sap.ui.core.ValueState.None);
				sap.ui.getCore().byId("idComboDepotRESearchJ").setPlaceholder("Select Depot");
				sap.ui.getCore().byId("idTFDepotRESearchJ").setValueState(sap.ui.core.ValueState.None);
				sap.ui.getCore().byId("idTFDepotRESearchJ").setPlaceholder("Depot Code");
				sap.ui.getCore().byId("idBtnRemoveFilterRESearchJ").setEnabled(false);
	          }}).addStyleClass("submitBtn");

		var oFlxRESearchJ = new sap.m.FlexBox({
    	      items: [oBtnCorrMovDtApplyFilterRESearchJ,new sap.ui.commons.Label( {text: " ",width : '8px'}), oBtnCorrMovDtRemoveFilterRESearchJ],
    	      direction: "Row",
			  layoutData: new sap.ui.layout.GridData({span: "L4 M12 S12",linebreak: false, margin: false}),
    	    });

		var olblUnitPCodeREEntryJ = new sap.ui.commons.Label({text: "Unit Part Code:",
			required: true,
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: true, margin: true}),
			wrapping: true}).addStyleClass("marginTop10");

		var oDdlUnitPCodeREEntryJ = new sap.ui.commons.DropdownBox("idDdlUnitPCodeREEntryJ", {
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
		}).addStyleClass("FormInputStyle marginTop7");

		/*oDdlUnitPCodeREEntryJ.setModel(omdlGlobalRESData);
		oDdlUnitPCodeREEntryJ.bindItems("/UnitPartCode", oItmTmpltGloabREEntryJ);
		sap.ui.getCore().byId("idDdlUnitPCodeREEntryJ").setSelectedKey("C");*/

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

  	  	oDdlUnitPCodeREEntryJ.setModel(oDdlUpcModel);
  	  	oDdlUnitPCodeREEntryJ.setSelectedKey(ddlUpcData[0].key);
  	  	oDdlUnitPCodeREEntryJ.bindItems("/data", new sap.ui.core.ListItem({text: "{text}", key:"{key}"}));


	 // Online Form Starts
			     var oRepairESearchForm = new sap.ui.layout.form.Form({
			             layout: oRepairESearchLayout,
			             formContainers: [

			                     new sap.ui.layout.form.FormContainer({
			                             //title: "Repair Estimate Search",
		                             formElements: [
														new sap.ui.layout.form.FormElement({
														    fields: [oLabelDepotRESearchJ, oComboDepotRESearchJ, oInputDepotRESearchJ, oFlxRESearchJ]
														}),
														new sap.ui.layout.form.FormElement({
														    fields: [oLabelSerialNoRESearchJ, oInputSerialNoRESearchJ] // MACISMAIL
														}),
														/*new sap.ui.layout.form.FormElement({
														    fields: [olblUnitPCodeREEntryJ,oDdlUnitPCodeREEntryJ] // MACISMAIL
														}),*/
														new sap.ui.layout.form.FormElement({
														    fields: [oFlxBtnSbmt]
														}),
														new sap.ui.layout.form.FormElement({
														    fields: [oLabelMandatoryRESearchJ]
														}),
														new sap.ui.layout.form.FormElement({
														    fields: [new sap.ui.commons.HorizontalDivider({width: "100%", type: "Area", height: "Medium"})]
														}),
														new sap.ui.layout.form.FormElement("idFrmElemntLoadSavedRESearchJ",{
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
		if(sap.ui.getCore().byId("idTFDepotRESearchJ").getValue() != '')
			sap.ui.getCore().byId("idBtnRemoveFilterRESearchJ").setEnabled(true);
		else
			sap.ui.getCore().byId("idBtnRemoveFilterRESearchJ").setEnabled(false);

		var idComboDepotRESearchJ = sap.ui.getCore().byId("idComboDepotRESearchJ");
		idComboDepotRESearchJ.setValue("");
		//idComboDepotRESearchJ.setSelectedKeyCustm("");
		idComboDepotRESearchJ.setSelectedKey(sap.ui.getCore().byId("idTFDepotRESearchJ").getValue());
		idComboDepotRESearchJ.fireChange(this);
	},

	createTableLoadSavedData: function(jsnLoadSavedData){
		var olblSaveEstmtRESearchJ = new sap.ui.commons.Label("idTblLoadSaveDataRESearchJHeader", {text: "Saved Estimates", wrapping: true}).addStyleClass("fontTitle");

		var oidTblLSavedDataRESearchJ = new sap.ui.table.Table(
			'idTblLoadSaveDataRESearchJ',
			{
				columnHeaderHeight : 30,
				enableColumnReordering: false,
				selectionMode : sap.ui.table.SelectionMode.None,
				navigationMode : sap.ui.table.NavigationMode.None,
				layoutData: new sap.ui.layout.GridData({span: "L12 M12 S12",linebreak: false, margin: false}),
			}).addStyleClass('tblBorder');

		oidTblLSavedDataRESearchJ.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({text : "Estimate Id"}).addStyleClass("wraptextcol"),
			template : new sap.ui.commons.TextView().bindProperty("text", "EstimateId"),
			//hAlign : "Center",
			width : "auto", // MACHANACHANGES_12062019 changed from 90px to 
			resizable:false
		}));

		oidTblLSavedDataRESearchJ.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({text : "Serial Number"}).addStyleClass("wraptextcol"),
			template : new sap.ui.commons.TextView().bindProperty("text", "SerialNr"),
			//hAlign : "Center",
			//width : "100px",
			width : "auto",
			resizable:false
		}));

		// MACALPHA19032018_8+
		oidTblLSavedDataRESearchJ.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({text : "Job Type"}).addStyleClass("wraptextcol"),
			template : new sap.ui.commons.TextView().bindProperty("text", "EstimateType"),
			//hAlign : "Center",
			//width : "100px",
			width : "auto",
			resizable:false
		}));
		// MACALPHA19032018_8+
		oidTblLSavedDataRESearchJ.addColumn(new sap.ui.table.Column({
			visible:false,
			label : new sap.ui.commons.Label({text : "Unit Part Code"}).addStyleClass("wraptextcol"),
			template : new sap.ui.commons.TextView().bindProperty("text", "Upc"),
			//hAlign : "Center",
			//width : "100px",
			width : "auto",
			resizable:false
		}));

		oidTblLSavedDataRESearchJ.addColumn(new sap.ui.table.Column({
			visible:false,
			label : new sap.ui.commons.Label({text : "Estimate Type"}).addStyleClass("wraptextcol"),
			template : new sap.ui.commons.TextView().bindProperty("text", "EstimateType"),
			//hAlign : "Center",
			//width : "100px",
			width : "auto",
			resizable:false
		}));

		oidTblLSavedDataRESearchJ.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({text : "Created Date"}).addStyleClass("wraptextcol"),
			template : new sap.ui.commons.TextView().bindProperty("text", "CreatedDate"),
			//hAlign : "End",
			//width : "100px",
			width : "auto",
			resizable:false
		}));

		oidTblLSavedDataRESearchJ.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({text : "Created Time"}).addStyleClass("wraptextcol"),
			template : new sap.ui.commons.TextView().bindProperty("text", "CreatedTime"),
			//hAlign : "Center",
			//width : "100px",
			width : "auto",
			resizable:false
		}));

		var oBtnTblSelectRESearchJ = new sap.ui.commons.Link({
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
			  		  //urlToCallIsocodes += "$filter=Serial eq '" + idSerailNoRESearchJ.getValue().toUpperCase() + "'";
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

				          	selDeotIdREEntryJ = '';
				          	var odepoRESearchJ = sap.ui.getCore().byId("idComboDepotRESearchJ");
										objcurntRESearchJ.openScreenREEntryJ(unitnoselRow,odepoRESearchJ.getSelectedKey(), odepoRESearchJ.getValue(), curr, cost, upc);

			          },
			          function(err){
			        	  //depotCurr = resultdata.results[0].Message.substr(6,3);
			        	  //fixedLabourRate = resultdata.results[0].Message.substr(10,(resultdata.results[0].Message.length));
			        	  //objcurntRESearchJ.openScreenREEntryJ(idSerailNoRESearchJ.getValue().toUpperCase(),odepoRESearchJ.getSelectedKey(), odepoRESearchJ.getValue(),depotCurr,fixedLabourRate);
			              //errorfunc(err);
			             //alert("Error while Reading Result : "+ window.JSON.stringify(err.response));
			             //return oFlexboxError;
			          });

				}}).bindProperty("helpId","EstimateIdUnitNo");
		//oBtnTblSelectRESearchJ.addStyleClass("submitBtn")
		/* var oBtnTblSelectRESearchJ = new sap.m.Button({
			text : "Select",
			width:"80px",
			styled:false,
			press:function(){
				objcurntRESearchJ.openScreenREEntryJ('selectrow');
			}}).addStyleClass("submitBtn"); */

		oidTblLSavedDataRESearchJ.addColumn(new sap.ui.table.Column({
			//label: new sap.ui.commons.Label({text: "Upload"}),
			template: oBtnTblSelectRESearchJ,
			//width : "100px",
			width : "auto",
			resizable:false
		}));

		var oBtnTblDeleteRESearchJ = new sap.ui.commons.Link({
				text: "Delete",
				//width : "50px",
                press : function() {
					delEstmtId = this.getHelpId().split('|')[0];
					var msgAlrtDelet ="This action will delete the saved Repair Estimate.\nThis deletion cannot be undone.";
					sap.ui.commons.MessageBox.show(msgAlrtDelet,sap.ui.commons.MessageBox.Icon.WARNING,"Warning",
							[sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO],
							objcurntRESearchJ.fnDeleteLineMsgBox, sap.ui.commons.MessageBox.Action.YES);
					//var seletedRelRefNo = this.getText();
					//selectedRelUnit = this.getHelpId();
				}}).bindProperty("helpId","EstimateIdUnitNo");

		/* var oBtnTblDeleteRESearchJ = new sap.m.Button({
			text : "Delete",
			width:"80px",
			styled:false,
			//layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
			press:function(evnt){
				var getrowindx = sap.ui.getCore().byId("idTblLoadSaveDataRESearchJ");
				objcurntRESearchJ.onlinefunDeleteEstimate();
			}}).addStyleClass("submitBtn"); */

		oidTblLSavedDataRESearchJ.addColumn(new sap.ui.table.Column({
			//label: new sap.ui.commons.Label({text: "Upload"}),
			//width : "100px",
			width : "auto",
			template: oBtnTblDeleteRESearchJ,
			resizable:false
		}));

		var oMdlErrTblRESearchJ = new sap.ui.model.json.JSONModel();
		oMdlErrTblRESearchJ.setData({modelData : []});
		oidTblLSavedDataRESearchJ.setModel(oMdlErrTblRESearchJ);
		oidTblLSavedDataRESearchJ.bindRows("/modelData");

		oMdlErrTblRESearchJ.setData({modelData : jsnLoadSavedData});
		oidTblLSavedDataRESearchJ.setModel(oMdlErrTblRESearchJ);
		oidTblLSavedDataRESearchJ.bindRows("/modelData");
		if(jsnLoadSavedData.length < 1){
			oidTblLSavedDataRESearchJ.setVisibleRowCount(5);
			oidTblLSavedDataRESearchJ.setNavigationMode(sap.ui.table.NavigationMode.None);
		}else if((jsnLoadSavedData.length == 1) && (jsnLoadSavedData[0].Message == 'No saved estimates found')){
			jsnLoadSavedData.length = 0;
			oidTblLSavedDataRESearchJ.bindRows("/modelData");
			oidTblLSavedDataRESearchJ.setVisibleRowCount(5);
			oidTblLSavedDataRESearchJ.setNavigationMode(sap.ui.table.NavigationMode.None);
		}
		else if(jsnLoadSavedData.length < 26){
			oidTblLSavedDataRESearchJ.setVisibleRowCount(jsnLoadSavedData.length);
			oidTblLSavedDataRESearchJ.setNavigationMode(sap.ui.table.NavigationMode.None);
		}else{
			oidTblLSavedDataRESearchJ.setVisibleRowCount(25);
			oidTblLSavedDataRESearchJ.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		}

		var oFlxSaveExtmtRESearchJ = new sap.m.FlexBox("idFlxBxReleaseCDBJ",{
			  items:[olblSaveEstmtRESearchJ, oidTblLSavedDataRESearchJ],
			  //width:"90%",
			  layoutData: new sap.ui.layout.GridData({span: "L10 M12 S12",linebreak: false, margin: false}),
			  direction: "Column"
			 }).addStyleClass("marginTop10");

		return oFlxSaveExtmtRESearchJ;
	},
	fnDeleteLineMsgBox: function(sResult){
		if(sResult == "YES"){
			objcurntRESearchJ.onlinefunDeleteEstimate(delEstmtId);
		}
	},
	//DELETE ESTIMATE ONLINE
	onlinesuccessfunDeleteEstimate: function(resultdata, response){
		var msg ='';
		busyDialog.close();

		if(resultdata != undefined){
			if(resultdata.results.length > 0){
				//msg = resultdata.results[0].MessageHdr + '\n' + resultdata.results[0].MessageItm;
				objcurntRESearchJ.OnlinefunLoadSavedData();
			}else{
				sap.ui.commons.MessageBox.alert("Error occured during deletion estimate.");
			}
		}else{
			sap.ui.commons.MessageBox.alert("Error occured during deletion estimate.");
		}
	},

	onlineerrorfunDeleteEstimate: function(err){
		//sap.ui.getCore().byId("idFrmElemntLoadSavedRESearchJ").destroyFields();
		errorfromServer(err);
	},

	onlinefunDeleteEstimate: function(estimateId){
		try{
			busyDialog.open();
			var urlToCall = serviceUrl15_old + "/Load_Saved_Estimates_Delete?";
				urlToCall += "$filter=EstimateId eq '"+ estimateId +"'";

		    objUtilREstimate.doOnlineRequest(urlToCall,objcurntRESearchJ.onlinesuccessfunDeleteEstimate, objcurntRESearchJ.onlineerrorfunDeleteEstimate);
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

			var depotVal = sap.ui.getCore().byId("idTFDepotRESearchJ").getValue();
			var serialVal = sap.ui.getCore().byId("idSerailNoRESearchJ").getValue();

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
						if(resultdata.results[indx].EstimateType == 'Joint Survey'){
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
		sap.ui.getCore().byId("idFrmElemntLoadSavedRESearchJ").insertField(objcurntRESearchJ.createTableLoadSavedData(jsnLoadSavedData));
	},

	onlineerrorfunLoadSavedData: function(err){
		sap.ui.getCore().byId("idFrmElemntLoadSavedRESearchJ").destroyFields();
		errorfromServer(err);
	},

	OnlinefunLoadSavedData: function(){
		sap.ui.getCore().byId("idFrmElemntLoadSavedRESearchJ").destroyFields();
		try{
			busyDialog.open();
			var urlToCall = serviceUrl15_old + "/Load_Saved_Estimates?";
				urlToCall += "$filter=UserId eq '" + objLoginUser.getLoggedInUserName() + "' and Para1 eq ''";  //MACALPHA19032018_8 Change Para1 eq 'J' to Para1 eq ''

				objUtilREstimate.doOnlineRequest(urlToCall,objcurntRESearchJ.onlinesuccessfunLoadSavedData, objcurntRESearchJ.onlineerrorfunLoadSavedData);
		}catch(e){
			busyDialog.close();
			sap.ui.commons.MessageBox.alert("Error on loading Estimate" + e);
		}
	},
	//VALIDATION FOR FEILDS
	ValidateDataBeforeSubmit: function(){
		var idComboDepotRESearchJ = sap.ui.getCore().byId("idComboDepotRESearchJ");
		var idSerailNoRESearchJ = sap.ui.getCore().byId("idSerailNoRESearchJ");
		var valid = true;

		if(idComboDepotRESearchJ.getSelectedKey() == ''){
			if(idComboDepotRESearchJ.getValue() != '')
				idComboDepotRESearchJ.setPlaceholder("Invalid Depot");
			else
				idComboDepotRESearchJ.setPlaceholder("Required");

			idComboDepotRESearchJ.setValue('');
			idComboDepotRESearchJ.setValueState(sap.ui.core.ValueState.Error);
			valid = false;
		}

		if(idSerailNoRESearchJ.getValue() == ''){
			idSerailNoRESearchJ.setValueState(sap.ui.core.ValueState.Error);
			idSerailNoRESearchJ.setPlaceholder("Required");
			valid = false;
		}else if(!objUtilREstimate.validateUnitNumber($.trim(idSerailNoRESearchJ.getValue()))){
			idSerailNoRESearchJ.setValue('');
			idSerailNoRESearchJ.setValueState(sap.ui.core.ValueState.Error);
			idSerailNoRESearchJ.setPlaceholder("Invalid Value");
			//sap.ui.commons.MessageBox.alert("You have input an invalid Unit Number.\n Please enter a valid  Unit Number -11-char alpha numeric.");
			valid = false;
		}

		return valid;
	},
	//NAVIGATE TO ENTRY SCREEN
	openScreenREEntryJ: function(untNo, depotid,depotText, currency, labRate, upc){
			//var oUnitNoRESearchJ = sap.ui.getCore().byId("idSerailNoRESearchJ");
			selctdUNDepoRESearchJ = untNo.toUpperCase() + '|' + depotid + '|' + depotText;
			var oErrorTable = sap.ui.getCore().byId("idErrorTableRepJ");
			var oErrorTableRJS = sap.ui.getCore().byId("idErrorTableRepJJS");
			var oLabelErrorRepMsgs = sap.ui.getCore().byId("idlblSuccessMsgREEJ");
			var oRRRepairEstim = sap.ui.getCore().byId("idRRRepairEstimJ");
			var oRRRepairEstimJS = sap.ui.getCore().byId("idRRRepairEstimJJS");
			var oRRJobType = sap.ui.getCore().byId("idDdlJobTypeREEntryJ");
			if(oRRJobType != undefined && oRRJobType.getSelectedKey() == 'Joint Survey'){
				oRRJobType.setSelectedKey(globalLatestJobType); // MACALPHA19032018_4+
				//oRRJobType.setSelectedKey('Original');	// MACALPHA19032018_4-
			}

			if(sap.ui.getCore().byId("idRRRepairEstimJ") != undefined)
				sap.ui.getCore().byId("idRRRepairEstimJ").destroy();
			if(sap.ui.getCore().byId("idErrorTableRepJ") != undefined)
				sap.ui.getCore().byId("idErrorTableRepJ").destroy();

			var bus = sap.ui.getCore().getEventBus();
			bus.publish("nav", "to", {id : "RepairEstimateEntryJVw"});

			unitNo = untNo.toUpperCase();
			sap.ui.getCore().byId("idlblEstmtHdrREEntryJ").setText("Estimate For " + untNo.toUpperCase() + " at " + depotid);
			sap.ui.getCore().byId("idDdlUnitPCodeREEntryJIn").setSelectedKey(upc);
			sap.ui.getCore().byId("idTFCurrnCodeREEntryJ").setValue(currency);
			sap.ui.getCore().byId("idDdlJobTypeREEntryJ").setSelectedKey(globalLatestJobType); // MACALPHA19032018_4+
			sap.ui.getCore().byId("idTFNotes1REEntryJ").setValue(globalSCRLimit);	// MACALPHA19032018_4+

			/*if(sap.ui.getCore().byId("idRRRepairEstimJ") != undefined)
			sap.ui.getCore().byId("idRRRepairEstimJ").setVisible(false);
			if(sap.ui.getCore().byId("idErrorTableRepJ") != undefined)
			sap.ui.getCore().byId("idErrorTableRepJ").setVisible(false);
			var upctext = null;
			if(upc == 'C'){
				upcText = 'Carcass';
			}else if(upc == 'M'){
				upcText = 'Machinery';
			}
			unitNo = untNo.toUpperCase();
			sap.ui.getCore().byId("idlblEstmtHdrREEntryJ").setText("Estimate For " + untNo.toUpperCase() + " - " + upcText + " at " + depotid);
			sap.ui.getCore().byId("idDdlUnitPCodeREEntryJIn").setSelectedKey(upc);
			sap.ui.getCore().byId("idTFCurrnCodeREEntryJ").setValue(currency);*/

			 /* MACALPHA19032018_4 */

			 /* Reset Date and other fields to default */

			 var todays = new Date();

			 // This month's date
			 var thisDate = todays.getDate();
			 if (thisDate < 10) {
				 thisDate = '0' + thisDate;
			 }


			 //This month's month
			 var thisMonth = todays.getMonth();
			 thisMonth = thisMonth + 1;

			 var thisMonths;
			 if (thisMonth < 10) {
				 thisMonths = '0' + thisMonth;
			 } else {
				 thisMonths = thisMonth;
			 }

			 //This month's year
			 var thisYear = todays.getFullYear();

			 var thisValue = String(thisYear) + String(thisMonths) + String(thisDate);
			 sap.ui.getCore().byId("idDtPkrEstimateDtREEntryJ").setYyyymmdd(thisValue);
			 sap.ui.getCore().byId("idDdlJobTypeREEntryJ").setSelectedKey("");
			 sap.ui.getCore().byId("idDdlSaleGradeREEntryJ").setSelectedKey("");

			 sap.ui.getCore().byId("idTFCWREEntryJ").setValue("");
			 //sap.ui.getCore().byId("idTFNotes1REEntryJ").setValue("");
			 sap.ui.getCore().byId("idTFNotes2REEntryJ").setValue("");
			 sap.ui.getCore().byId("idTFNotes3REEntryJ").setValue("");
			 sap.ui.getCore().byId("idTFNotes4REEntryJ").setValue("");
			 sap.ui.getCore().byId("idTFNotes5REEntryJ").setValue("");
			 sap.ui.getCore().byId("idCheckBoxZeroCostJ1").setChecked(false);
			 sap.ui.getCore().byId("idCheckBoxZeroCostJ2").setChecked(false);

			 var carcassTitle = "Repair Lines for Carcass - Labour Rate : " + globalLabCostC + " " + globalLabCostCurrency;
			 var machineryTitle = "Repair Lines for Machinery - Labour Rate : " + globalLabCostM + " " + globalLabCostCurrency;

			 sap.ui.getCore().byId("idlblhdrTblREEntryJ1").setText(carcassTitle);
			 sap.ui.getCore().byId("idlblhdrTblREEntryJ2").setText(machineryTitle);

       if (globalEstimateIsReefer){
         sap.ui.getCore().byId("idFlxTblREEntryJLines2").setVisible(true);
       }else{
				 globalLabCostM = 0;
				 sap.ui.getCore().byId("idFlxTblREEntryJLines2").setVisible(false);
			 }


       /* MACALPHA19032018_4 */

			 if(selEstmtId != ''){
					objREstimateOnlineJ.onlinefunEstimateHdr(unitNo, DepoId, DepoText);
					//objREstimateOnlineJ.onlinefunEstmtLineItem();

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
								excelDataJ1 = [];
								excelDataJ2 = [];
					    	var contLen = 0;
					    	var machLen = 0;

					    	for(var indx=0; indx<dataLen; indx++){
					    		if(data.results[indx].Cpart == 'C'){
					    			contLen = contLen + 1;
					    		}else if(data.results[indx].Cpart == 'M'){
					    			machLen = machLen + 1;
					    		}
					    	}

					    	for(var indx=0; indx<contLen; indx++){
					    	excelDataJ1[indx] = new Array(13);
					    	}

					    	for(var indx=0; indx<machLen; indx++){
					    	excelDataJ2[indx] = new Array(13);
					    	}

					    	contLen = 0;
					    	machLen = 0;

							for(var indx=0; indx<dataLen; indx++){
								if(data.results[indx].Cpart == 'C'){
								excelDataJ1[contLen][0] = data.results[indx].LocationCode;
					 			excelDataJ1[contLen][1] = data.results[indx].ComponentCode;
					 			excelDataJ1[contLen][2] = data.results[indx].DamageCode;
					 			excelDataJ1[contLen][3] = data.results[indx].MaterialCode;
					 			excelDataJ1[contLen][4] = data.results[indx].RepairCode;
					 			excelDataJ1[contLen][5] = data.results[indx].RepairLength;
					 			excelDataJ1[contLen][6] = data.results[indx].RepairWidth;
					 			excelDataJ1[contLen][7] = data.results[indx].Quantity;
					 			excelDataJ1[contLen][8] = data.results[indx].ManHours;
					 			excelDataJ1[contLen][9] = data.results[indx].MaterialCost;
					 			//excelData[indx][10] = data.results[indx].LabourRate;
					 			excelDataJ1[contLen][10] = data.results[indx].BulletinNumber;
					 			excelDataJ1[contLen][11] = data.results[indx].Responsibility;
					 			contLen = contLen + 1;
								}else if(data.results[indx].Cpart == 'M'){
									excelDataJ2[machLen][0] = data.results[indx].LocationCode;
						 			excelDataJ2[machLen][1] = data.results[indx].ComponentCode;
						 			excelDataJ2[machLen][2] = data.results[indx].DamageCode;
						 			excelDataJ2[machLen][3] = data.results[indx].MaterialCode;
						 			excelDataJ2[machLen][4] = data.results[indx].RepairCode;
						 			excelDataJ2[machLen][5] = data.results[indx].RepairLength;
						 			excelDataJ2[machLen][6] = data.results[indx].RepairWidth;
						 			excelDataJ2[machLen][7] = data.results[indx].Quantity;
						 			excelDataJ2[machLen][8] = data.results[indx].ManHours;
						 			excelDataJ2[machLen][9] = data.results[indx].MaterialCost;
						 			//excelData[indx][10] = data.results[indx].LabourRate;
						 			excelDataJ2[machLen][10] = data.results[indx].BulletinNumber;
						 			excelDataJ2[machLen][11] = data.results[indx].Responsibility;
						 			machLen = machLen + 1;
								}
							}

							oExcelGridJ1.loadData(excelDataJ1);
							oExcelGridJ2.loadData(excelDataJ2);
							busyDialog.close();
					    },
					    function(err){
					    	busyDialog.close();
					    	errorfromServer(err);
					    	//alert("Error while reading region : "+ window.JSON.stringify(err.response));
					    });
				 }else if(globalLatestJobType != 'Original'){	// MACALPHA19032018_4
						objREstimateOnlineJ.onlinefunJointSurvey();
				 }else{	// MACALPHA19032018_4 Addes this else section if latest job type is original estimate
					 if(bulletinValues.length != 0 || bulletinValuesM.length != 0){
						if(bulletinValues.length != 0){
				    	var bullLen = bulletinValues.length ;
							excelData = new Array(bullLen);
							for (var i = 0; i < 12; i++) {
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

				 			oExcelGridJ1.loadData(excelData);
						}
						if(bulletinValuesM.length != 0){
					    		var bullLen = bulletinValuesM.length ;
								excelData = new Array(bullLen);
								for (var i = 0; i < 12; i++) {
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
						 			excelData[indx][10] = bulletinValuesM[indx].bulletin;
						 			excelData[indx][11] = "";
								}

								oExcelGridJ2.loadData(excelData);
						}

				 }else{
					  excelDataJ2 = new Array(12);
						for (var i = 0; i < 12; i++) {
							excelDataJ2[i] = new Array(13);
						}
						for(var indx=0; indx<12; indx++){
							excelDataJ2[indx][0] = "";
				 			excelDataJ2[indx][1] = "";
				 			excelDataJ2[indx][2] = "";
				 			excelDataJ2[indx][3] = "";
				 			excelDataJ2[indx][4] = "";
				 			excelDataJ2[indx][5] = "";
				 			excelDataJ2[indx][6] = "";
				 			excelDataJ2[indx][7] = "";
				 			excelDataJ2[indx][8] = "";
				 			excelDataJ2[indx][9] = "";
				 			excelDataJ2[indx][10] = "";
				 			excelDataJ2[indx][11] = "";
				 			excelDataJ2[indx][12] = "";
						}

						oExcelGridJ2.loadData(excelDataJ2);

						excelDataJ1 = new Array(12);
						for (var i = 0; i < 12; i++) {
							excelDataJ1[i] = new Array(13);
						}
						for(var indx=0; indx<12; indx++){
							excelDataJ1[indx][0] = "";
				 			excelDataJ1[indx][1] = "";
				 			excelDataJ1[indx][2] = "";
				 			excelDataJ1[indx][3] = "";
				 			excelDataJ1[indx][4] = "";
				 			excelDataJ1[indx][5] = "";
				 			excelDataJ1[indx][6] = "";
				 			excelDataJ1[indx][7] = "";
				 			excelDataJ1[indx][8] = "";
				 			excelDataJ1[indx][9] = "";
				 			excelDataJ1[indx][10] = "";
				 			excelDataJ1[indx][11] = "";
				 			excelDataJ1[indx][12] = "";
						}
						oExcelGridJ1.loadData(excelDataJ1);

					 }
				 }

			 	/*else{
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
				 }*/

			var scrollid = sap.ui.getCore().byId("RepairEstimateEntryJVw").page._oScroller._sContentId;
			c = $.sap.byId(scrollid).parent();
			c.animate({scrollTop:0});
	},

	SubmitData: function(){
		try{
			var idComboDepotRESearchJ = sap.ui.getCore().byId("idComboDepotRESearchJ");
			var idSerailNoRESearchJ = sap.ui.getCore().byId("idSerailNoRESearchJ");
			var vUnitPartCode = sap.ui.getCore().byId("idDdlUnitPCodeREEntryJ").getSelectedKey();
			upc = vUnitPartCode;
			if(!this.ValidateDataBeforeSubmit()){
				return;
			}

			selDeotIdREEntryJ = idComboDepotRESearchJ.getSelectedKey();
			objREstimateOnlineJ.onlineValidUnitDepot(idSerailNoRESearchJ.getValue().toUpperCase(),idComboDepotRESearchJ.getValue(), vUnitPartCode);

			//objcurntRESearchJ.openScreenREEntryJ(idSerailNoRESearchJ.getValue());
		}catch(e){

		}
	},
	//FETCH DEPOT DETAIL FOR DROP DOWN
	onlinesuccessfunDepotCode: function(resultdata, response){
		busyDialog.close();
		jQuery.sap.require("sap.ui.model.json.JSONModel");
		var oDepotCode = sap.ui.getCore().byId("idComboDepotRESearchJ");
		//oDepotCode.addItem(new sap.ui.core.ListItem({text:"", key: ""}));
		if(resultdata != undefined){
			if(resultdata.results.length > 0){
				for(var indx in resultdata.results){
					//oDepotCode.addItem(new sap.ui.core.ListItem({text:resultdata.results[indx].FunctionalLoc, key: resultdata.results[indx].Depot}));
				}

				if(objLoginUser.getLoggedInUserType() != "SEACO"){
					oDepotCode.setSelectedKey(objLoginUser.getLoggedInUserID());
					sap.ui.getCore().byId("idTFDepotRESearchJ").setValue(objLoginUser.getLoggedInUserID());
				}


			}
		}
	},

	onlinesuccessfunDepotCodeNew: function(resultdata, response){
		busyDialog.close();
		jQuery.sap.require("sap.ui.model.json.JSONModel");
		var oDepotCode = sap.ui.getCore().byId("idComboDepotRESearchJ");
		//oDepotCode.addItem(new sap.ui.core.ListItem({text:"", key: ""}));
		if(resultdata != undefined){
			if(resultdata.results.length > 0){
				for(var indx in resultdata.results){
					oDepotCode.addItem(new sap.ui.core.ListItem({text:resultdata.results[indx].FunctionalLoc, key: resultdata.results[indx].Depot}));
				}
				//oDepotCode.addItem(new sap.ui.core.ListItem({text:"MyText", key: "MyKey"}));
				if(objLoginUser.getLoggedInUserType() != "SEACO"){
					oDepotCode.setSelectedKey(objLoginUser.getLoggedInUserID());
					sap.ui.getCore().byId("idTFDepotRESearchJ").setValue(objLoginUser.getLoggedInUserID());
				}


			}
		}
	},

	onlineerrorfunDepotCode: function(err){
		var oDepotCode = sap.ui.getCore().byId("idComboDepotRESearchJ");
		oDepotCode.addItem(new sap.ui.core.ListItem({text:"", key: ""}));
		errorfromServer(err);
	},

	getOnlinefunDepotCode: function(unitNumber, DnNumber){
		try{
			//var loginusename = objLoginUser.getLoggedInUserName();
			sap.ui.getCore().byId("idComboDepotRESearchJ").destroyItems();
			busyDialog.open();
			//http://seanwgd1.gessap.local:8000/sap/opu/odata/sap/ZNW_SEACO_PORTAL_REQ15_SRV/F4_Functional_Location
			//var oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
			//http://seanwgd1.gessap.local:8000/sap/opu/odata/sap/ZNW_SEACO_PORTAL_LOT4_SECURITY_SRV/Single_Doctype_F4?$filter=Bname eq 'ztest_dm' and Dept eq ''
		    //var urlToCall = serviceUrl + "/F4_Unit_Type_Single";
			//var urlToCall = "http://seanwgd1.gessap.local:8000/sap/opu/odata/sap/ZNW_SEACO_PORTAL_REQ15_SRV/F4_Functional_Location"; //F4_Depot_Names?$filter=City eq ''";
			var urlToCall = serviceUrl15_old + "/F4_Functional_Location";
		    objUtilREstimate.doOnlineRequest(urlToCall,this.onlinesuccessfunDepotCodeNew, this.onlineerrorfunDepotCode);
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

		var idComboDepotRESearchJ = sap.ui.getCore().byId("idComboDepotRESearchJ");
		var idTFDepotRESearchJ = sap.ui.getCore().byId("idTFDepotRESearchJ");
		var idSerailNoRESearchJ = sap.ui.getCore().byId("idSerailNoRESearchJ");
		var idDdlUnitPCodeREEntryJ = sap.ui.getCore().byId("idDdlUnitPCodeREEntryJ");

		if(sap.ui.getCore().byId("idBtnRemoveFilterRESearchJ") != undefined)
			sap.ui.getCore().byId("idBtnRemoveFilterRESearchJ").setEnabled(false);

		if(idComboDepotRESearchJ != undefined){
			idComboDepotRESearchJ.setValueState(sap.ui.core.ValueState.None);
			idComboDepotRESearchJ.setPlaceholder("Select Depot");

			if(depotEnabled){
				idComboDepotRESearchJ.setValue('');
				idTFDepotRESearchJ.setValue('');
			}
		}

		if(idTFDepotRESearchJ != undefined){
			idTFDepotRESearchJ.setValueState(sap.ui.core.ValueState.None);
			idTFDepotRESearchJ.setPlaceholder("Depot Code");
		}


		if(idSerailNoRESearchJ != undefined){
			idSerailNoRESearchJ.setValue('');
			idSerailNoRESearchJ.setValueState(sap.ui.core.ValueState.None);
			idSerailNoRESearchJ.setPlaceholder("Serial Number");
		}

		if(idDdlUnitPCodeREEntryJ != undefined){
			idDdlUnitPCodeREEntryJ.setSelectedKey("C");
		}

		if(sap.ui.getCore().byId("idFrmElemntLoadSavedRESearchJ") != undefined)
			sap.ui.getCore().byId("idFrmElemntLoadSavedRESearchJ").destroyFields();
	}
});

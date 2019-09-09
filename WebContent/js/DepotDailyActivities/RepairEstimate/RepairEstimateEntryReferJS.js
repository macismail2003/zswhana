/******** NP *******/
jQuery.sap.require("sap.ui.model.json.JSONModel");

//var objUtilREEntry = new utility();
var oMdlLineItemRJSREEntry = new sap.ui.model.json.JSONModel();
var jsnLineItemRJSREEntry = [];
var oMdlDtPkrEstmtRJSREEntry;

jsnLineItemRJSREEntry.removeValue = function(name, value){
		var arrayval = this.filter(function(el){
			return el[name] != value;
		});

		this.length = 0; //clear original array
		this.push.apply(this, arrayval); //push all elements except the one we want to delete
	},

	jsnLineItemRJSREEntry.resetSequence = function(name, length){
		function padZero(num, size) {
		    var s = num+"";
		    while (s.length < size) s = "0" + s;
		    return s;
		};
		
		if(this.length == 1){
			this[this.length-1][name] = padZero(1,length);
		}else{
			var lastSeq = parseInt(this[this.length-2][name])+1;
			this[this.length-1][name] = padZero(lastSeq,length);
		}
	},
		
sap.ui.model.json.JSONModel.extend("RepairEstimateEntryReferJS", {
createFrmRepairEstimateEntryRJS: function(){
		objcrntRJSREEntry = new RepairEstimateEntryReferJS();
		jsnLineItemRJSREEntry.length = 0;
		var dataReponsibleREEntry = oMdlGlblDDLREEntry.getData().responsibility;
		
		for(var i =0; i < 5; i++){
			jsnLineItemRJSREEntry.push({"checked":false,"LineItem":padZero(i+1,4),"sectionKey":"",
				"sectionText":"","LocationKey":"",	"LocationText":"",
				"ComponentKey":"","ComponentText":"","DamageKey":"","DamageText":"",
				"RepairKey":"","RepairText":"",	"MaterialKey":"","MaterialText":"","MaterialCost":"",
				"ManHours":"","RepairLength":"","RepairWidth":"","Quantity":"",
				responsibility:[],
				"ResponsibilityKey":"","ResponsibilityText":"","LabourRate":"",
				"TechBulletin":"","DataInserted":false});
			jsnLineItemRJSREEntry[i].responsibility.push({"text":"","key":""});
			for(var inx in dataReponsibleREEntry){
				jsnLineItemRJSREEntry[i].responsibility.push({"text":dataReponsibleREEntry[inx].text,"key":dataReponsibleREEntry[inx].key});
			}
		}
		
		
	 //FIRST ROW
		var olblUnitPCodeRJSREEntry = new sap.ui.commons.Label({text: "Unit Part Code:",
			required: true,
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
			wrapping: false}).addStyleClass("marginTop10");
		
		var oDdlUnitPCodeRJSREEntry = new sap.ui.commons.DropdownBox("idDdlUnitPCodeRJSREEntry", { 
			  layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"}),
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
		
		oDdlUnitPCodeRJSREEntry.setModel(omdlGlobalRESData);
		oDdlUnitPCodeRJSREEntry.bindItems("/UnitPartCode", oItmTmpltGloabREEntry);

		var olblJobTypeRJSREEntry = new sap.ui.commons.Label({text: "Job Type:",
			required: true,
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
			wrapping: false}).addStyleClass("marginTop10");
		
		var oDdlJobTypeRJSREEntry = new sap.ui.commons.DropdownBox("idDdlJobTypeRJSREEntry", { 
			  layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"}),
			  width:"100%",
			  displaySecondaryValues:false,
			  placeholder: "Select Job Type",			  
			  change: function(evnt){
				if(this.getValue() != '')
				{
					this.setValueState(sap.ui.core.ValueState.None);
					this.setPlaceholder("Select Job Type");
				}
			  },
		}).addStyleClass("FormInputStyle marginTop7");
		oDdlJobTypeRJSREEntry.setModel(omdlGlobalRESData);
		oDdlJobTypeRJSREEntry.bindItems("/JobType", oItmTmpltGloabREEntry);

		
		var olblSaleGradeRJSREEntry = new sap.ui.commons.Label({text: "Sale Grade:",
			//required: true,
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
			wrapping: false}).addStyleClass("marginTop10");
		
		var oDdlSaleGradeRJSREEntry = new sap.ui.commons.DropdownBox("idDdlSaleGradeRJSREEntry", { 
			  layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"}),
			  width:"100%",
			  displaySecondaryValues:false,
			  placeholder: "Select Sale Grade",			  
			  change: function(evnt){
				if(this.getValue() != '')
				{
					this.setValueState(sap.ui.core.ValueState.None);
					this.setPlaceholder("Select Sale Grade");
				}
			  },
		}).addStyleClass("FormInputStyle marginTop7");
		oDdlSaleGradeRJSREEntry.setModel(omdlGlobalRESData);
		oDdlSaleGradeRJSREEntry.bindItems("/SaleGrade", oItmTmpltGloabREEntry);

		 //SECOND ROW
		var olblEstimatDtRJSREEntry = new sap.ui.commons.Label({text: "Estimate Date:",
			required: true,
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
			wrapping: false}).addStyleClass("marginTop7");
	
		oMdlDtPkrEstmtRJSREEntry = new sap.ui.model.json.JSONModel();
			oMdlDtPkrEstmtRJSREEntry.setData({dateValue: new Date()});
		var oDtPkrEstimateDtRJSREEntry = new sap.ui.commons.DatePicker('idDtPkrEstimateDtRJSREEntry',{
			placeholder: "Estimate Date",
			value: {
				path: "/dateValue",
				type: new sap.ui.model.type.Date({pattern: "dd-MM-yyyy"})
				},
				change: function(oEvent){
					if(oEvent.getParameter("invalidValue")){
						oEvent.oSource.setValueState(sap.ui.core.ValueState.Error);
						oEvent.oSource.setValue("");
						oEvent.oSource.setPlaceholder("Invalid Value");
					}
					if(oEvent.oSource.getValue() != ''){
						oEvent.oSource.setValueState(sap.ui.core.ValueState.None);
						oEvent.oSource.setPlaceholder("Original Date");
					}
				},
				layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"}),
		});
		//oInputDate.setYyyymmdd("20100101");
		oDtPkrEstimateDtRJSREEntry.setModel(oMdlDtPkrEstmtRJSREEntry);
		oDtPkrEstimateDtRJSREEntry.addStyleClass("FormInputStyle marginTop7");
		oDtPkrEstimateDtRJSREEntry.setLocale("en-US");
		
		var olblLeaseAuthAmtRJSREEntry = new sap.ui.commons.Label({text: "Lessee Authorised Amount:",
			//required: true,
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
			wrapping: false}).addStyleClass("marginTop10");
		
		var oTFLeaseAuthAmtRJSREEntry = new sap.ui.commons.TextField('idTFLeaseAuthAmtRJSREEntry',{
			placeholder: "Lessee Authorised Amount",
			layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"}),
		}).addStyleClass("FormInputStyle marginTop7");
		
		oTFLeaseAuthAmtRJSREEntry.onfocusin =  function(e) {  
			this.setValueState(sap.ui.core.ValueState.None);
			this.setPlaceholder("Lessee Authorised Amount");                          
		};
		oTFLeaseAuthAmtRJSREEntry.onkeyup = function(evnt){
			addSeparator(document.getElementById(this.sId));
		};
		oTFLeaseAuthAmtRJSREEntry.onkeydown = function(e){
			validateNumeric(event,false);
		};
		oTFLeaseAuthAmtRJSREEntry.onpaste = function(e){
			e.preventDefault();
		};  
		var olblCurrencyCodeRJSREEntry = new sap.ui.commons.Label({text: "Currency Code:",
			//required: true,
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
			wrapping: false}).addStyleClass("marginTop10");
		
		var oTFCurrencyCodeRJSREEntry = new sap.ui.commons.TextField('idTFCurrnCodeRJSREEntry',{
			placeholder: "Currency Code",
			change: upperOnChangeTF,
			layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"}),
		}).addStyleClass("FormInputStyle marginTop7");
		
		oTFCurrencyCodeRJSREEntry.onfocusin =  function(e) {  
			this.setValueState(sap.ui.core.ValueState.None);
			this.setPlaceholder("Currency Code");                          
		  };
			
		
		  //Form container to be added in main form
		 var oFrmCntnrRJSRepairEEntry =  new sap.ui.layout.form.FormContainer("idFrmCntnrRJSREEntry",{
								//title: "Repair Estimate Entry",
							 formElements: [
												new sap.ui.layout.form.FormElement({
													fields: [new sap.ui.commons.HorizontalDivider({width: "100%", type: "Page", height: "Medium",layoutData: new sap.ui.layout.GridData({span: "L12 M12 S12"})}).addStyleClass("marginTop7"),new sap.ui.commons.HorizontalDivider({width: "100%", type: "Page", height: "Medium",layoutData: new sap.ui.layout.GridData({span: "L12 M12 S12"})})]
												}),
												new sap.ui.layout.form.FormElement({
													fields: [new sap.ui.commons.Label({text: "Repair Header",
														layoutData: new sap.ui.layout.GridData({span: "L12 M12 S12"}),
														wrapping: true}).addStyleClass("marginTop7 fontTitle")]
												}),
												new sap.ui.layout.form.FormElement({
													fields: [olblUnitPCodeRJSREEntry,oDdlUnitPCodeRJSREEntry, olblJobTypeRJSREEntry, oDdlJobTypeRJSREEntry,olblSaleGradeRJSREEntry, oDdlSaleGradeRJSREEntry]
												}),
												new sap.ui.layout.form.FormElement({
													fields: [olblEstimatDtRJSREEntry,oDtPkrEstimateDtRJSREEntry,olblLeaseAuthAmtRJSREEntry,oTFLeaseAuthAmtRJSREEntry,olblCurrencyCodeRJSREEntry,oTFCurrencyCodeRJSREEntry]
												}),
												new sap.ui.layout.form.FormElement({
													fields: [new sap.ui.commons.HorizontalDivider({width: "100%", type: "Area", height: "Medium"}).addStyleClass("marginTop7")]
												})
										 ]
						 });
				
		 objcrntRJSREEntry.createEnterLineDataLayRJS();
		 
		 var oFrmREEntry = sap.ui.getCore().byId("idFrmREEntry");
		 oFrmREEntry.insertFormContainer(oFrmCntnrRJSRepairEEntry,2);
	},
	
	createLineItemTableRJS: function(){
		var olblhdrTblRJSREEntry =  new sap.ui.commons.Label({text: "Repair Lines",
			layoutData: new sap.ui.layout.GridData({span: "L12 M12 S12"}),
            wrapping: true}).addStyleClass("marginTop7 fontTitle");
		
		var oTblLineItemRJSREEntry = new sap.ui.table.Table(
				'idTblLineItemRJSREEntry',
				{
					visibleRowCount: 5,
					columnHeaderHeight : 50,
					enableColumnReordering: false,
					selectionMode : sap.ui.table.SelectionMode.None,
					navigationMode : sap.ui.table.NavigationMode.None,
					//layoutData: new sap.ui.layout.GridData({span: "L12 M12 S12",linebreak: false, margin: false}),
				}).addStyleClass('tblBorder marginTop7');
		
		var oChkBxSelectRJSREEntry = new sap.ui.commons.CheckBox({
		    // bind checked property against enabled property in the model
		   // checked: "{/enabled}", 
		    change: function(evnt){
		    }
		}).bindProperty("checked", "checked");
		
		oTblLineItemRJSREEntry.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "",
			}),
			template : oChkBxSelectRJSREEntry,
			resizable:false,
			width : "30px"
		}));
		
		oTblLineItemRJSREEntry.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Line Item",
			}),
			template : new sap.ui.commons.TextView()
					.bindProperty("text", "LineItem"),
			resizable:false,
			width : "60px"
		}));
		
		oTblLineItemRJSREEntry.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Location Code",
			}),
			template : new sap.ui.commons.TextField({change: upperOnChangeTF})
					.bindProperty("value", "LocationKey").addStyleClass("borderStyle"),
			resizable:false,
			width : "90px"
		}));
		
		oTblLineItemRJSREEntry.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Component Code",
			}),
			template : new sap.ui.commons.TextField({change: upperOnChangeTF})
					.bindProperty("value", "ComponentKey").addStyleClass("borderStyle"),
			resizable:false,
			width : "110px"
		}));
		
		oTblLineItemRJSREEntry.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Damage Code",
			}),
			template : new sap.ui.commons.TextField({change: upperOnChangeTF})
					.bindProperty("value", "DamageKey").addStyleClass("borderStyle"),
			resizable:false,
			width : "90px"
		}));
		
		oTblLineItemRJSREEntry.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Material Code",
			}),
			template : new sap.ui.commons.TextField({change: upperOnChangeTF})
					.bindProperty("value", "MaterialKey").addStyleClass("borderStyle"),
			resizable:false,
			width : "90px"
		}));
		
		oTblLineItemRJSREEntry.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Repair Code",
			}),
			template : new sap.ui.commons.TextField({change: upperOnChangeTF})
					.bindProperty("value", "RepairKey").addStyleClass("borderStyle"),
			resizable:false,
			width : "90px"
		}));
		
		oTblLineItemRJSREEntry.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Repair Length"
			}),
			template : new sap.ui.commons.TextField({change: upperOnChangeTF})
					.bindProperty("value", "RepairLength").addStyleClass("borderStyle"),
			resizable:false,
			width : "90px"
		}));
		
		oTblLineItemRJSREEntry.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Repair Width"
			}),
			template : new sap.ui.commons.TextField({change: upperOnChangeTF})
					.bindProperty("value", "RepairWidth").addStyleClass("borderStyle"),
			resizable:false,
			width : "90px"
		}));
		
		oTblLineItemRJSREEntry.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Quantity"
			}),
			template : new sap.ui.commons.TextField({change: upperOnChangeTF})
					.bindProperty("value", "Quantity").addStyleClass("borderStyle"),
			resizable:false,
			width : "90px"
		}));
		
		oTblLineItemRJSREEntry.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Man Hours"
			}),
			template : new sap.ui.commons.TextField({change: upperOnChangeTF})
					.bindProperty("value", "ManHours").addStyleClass("borderStyle"),
			resizable:false,
			width : "90px"
		}));
		
		oTblLineItemRJSREEntry.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Material Cost"
			}),
			template : new sap.ui.commons.TextField({change: upperOnChangeTF})
					.bindProperty("value", "MaterialCost").addStyleClass("borderStyle"),
			resizable:false,
			width : "90px"
		}));
		
		oTblLineItemRJSREEntry.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Labour Rate"
			}),
			template : new sap.ui.commons.TextField({change: upperOnChangeTF})
					.bindProperty("value", "LabourRate").addStyleClass("borderStyle"),
			resizable:false,
			width : "90px"
		}));
		
		oTblLineItemRJSREEntry.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Bullet In Number",
			}),
			template : new sap.ui.commons.TextField({change: upperOnChangeTF})
					.bindProperty("value", "TechBulletin").addStyleClass("borderStyle"),
			resizable:false,
			width : "90px"
		}));
		
		var oDdlTblResponsibilityRJSREEntry = new sap.ui.commons.DropdownBox({ 
			  layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"}),
			  width:"100%",
	          displaySecondaryValues:false,
			  placeholder: "Select Responsibility",			  
		}).addStyleClass("borderStyle");
	    //oDdlTblResponsibilityREEntry.setModel(oMdlGlblDDLREEntry);
		oDdlTblResponsibilityRJSREEntry.bindAggregation("items", "responsibility", oItmTmpltGlblDDLREEntry);
		oDdlTblResponsibilityRJSREEntry.bindProperty("selectedKey", "ResponsibilityKey");
		//oDdlTblResponsibilityREEntry.insertItem(new sap.ui.core.ListItem({text:"",key:""}),0);
		
		
		oTblLineItemRJSREEntry.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Responsibility",
			}),
			template : oDdlTblResponsibilityRJSREEntry, // new sap.ui.commons.TextField().bindProperty("value", "ResponsibilityKey").addStyleClass("borderStyle"),
			resizable:false,
			width : "160px"
		}));
		
		//oMdlLineItemRJSREEntry.setData({modelData : jsnData});
		//oTblLineItemREEntry.setVisibleRowCount(jsnData.length);
		oMdlLineItemRJSREEntry.setData({modelData : jsnLineItemRJSREEntry});
		oTblLineItemRJSREEntry.setModel(oMdlLineItemRJSREEntry);
		oTblLineItemRJSREEntry.bindRows("/modelData");
		
		var oFlxTblRJSREEntry = new sap.m.FlexBox({
	  	      items: [olblhdrTblRJSREEntry, oTblLineItemRJSREEntry],
	  	      direction: "Column",
				  layoutData: new sap.ui.layout.GridData({span: "L12 M12 S12",linebreak: false, margin: false}),
	  	    });
		
		return oFlxTblRJSREEntry;
	},
	
	insertRowLineItemRJS: function(){
		var oTblLineItemRJSREEntry = sap.ui.getCore().byId("idTblLineItemRJSREEntry");
		var oidDdlSectionRJSREEntry = sap.ui.getCore().byId("idDdlSectionRJSREEntry");
		var oidDdlLocationRJSREEntry = sap.ui.getCore().byId("idDdlLocationRJSREEntry");
		var oidDdlComponentRJSREEntry = sap.ui.getCore().byId("idDdlComponentRJSREEntry");
		var oidDdlDamageRJSREEntry = sap.ui.getCore().byId("idDdlDamageRJSREEntry");
		var oidDdlRepairRJSREEntry = sap.ui.getCore().byId("idDdlRepairRJSREEntry");
		var oidDdlMaterialCodeRJSREEntry = sap.ui.getCore().byId("idDdlMaterialCodeRJSREEntry");
		var oidTFMaterialCostRJSREEntry = sap.ui.getCore().byId("idTFMaterialCostRJSREEntry");
		var oidTFManHoursRJSREEntry = sap.ui.getCore().byId("idTFManHoursRJSREEntry");
		var oidTFRepairLengthRJSREEntry = sap.ui.getCore().byId("idTFRepairLengthRJSREEntry");
		var oidTFRepairWidthRJSREEntry = sap.ui.getCore().byId("idTFRepairWidthRJSREEntry");
		var oidTFQuantityRJSREEntry = sap.ui.getCore().byId("idTFQuantityRJSREEntry");
		var oidDdlResponsibilityRJSREEntry = sap.ui.getCore().byId("idDdlResponsibilityRJSREEntry");
		var oidTFLabourRateRJSREEntry = sap.ui.getCore().byId("idTFLabourRateRJSREEntry");
		var oidTFTechBulletinRJSREEntry = sap.ui.getCore().byId("idTFTechBulletinRJSREEntry");
		var dataupdateRJSREEntry = false;
		for(var i =0; i < jsnLineItemRJSREEntry.length;i++)
		{
			//if(jsnLineItemRJSREEntry[i].DataInserted == false){
			if((jsnLineItemRJSREEntry[i].LocationKey == '') &&
				(jsnLineItemRJSREEntry[i].ComponentKey == '') &&
				(jsnLineItemRJSREEntry[i].DamageKey == '') &&
				(jsnLineItemRJSREEntry[i].MaterialKey == '') &&
				(jsnLineItemRJSREEntry[i].RepairKey == '') &&
				(jsnLineItemRJSREEntry[i].RepairLength == '') &&
				(jsnLineItemRJSREEntry[i].RepairWidth == '') &&
				(jsnLineItemRJSREEntry[i].Quantity == '') &&
				(jsnLineItemRJSREEntry[i].ManHours == '') &&
				(jsnLineItemRJSREEntry[i].MaterialCost == '') &&
				(jsnLineItemRJSREEntry[i].LabourRate == '') &&
				(jsnLineItemRJSREEntry[i].TechBulletin == '') &&
				(jsnLineItemRJSREEntry[i].ResponsibilityKey == '')){
				dataupdateRJSREEntry = true;
				jsnLineItemRJSREEntry[i].checked=false;
				//jsnLineItemRJSREEntry[i].LineItem="";
				jsnLineItemRJSREEntry[i].sectionKey = oidDdlSectionRJSREEntry.getSelectedKey();
				jsnLineItemRJSREEntry[i].sectionText = oidDdlSectionRJSREEntry.getValue();
				jsnLineItemRJSREEntry[i].LocationKey = oidDdlLocationRJSREEntry.getSelectedKey();
				jsnLineItemRJSREEntry[i].LocationText = oidDdlLocationRJSREEntry.getValue();
				jsnLineItemRJSREEntry[i].ComponentKey= oidDdlComponentRJSREEntry.getSelectedKey();
				jsnLineItemRJSREEntry[i].ComponentText= oidDdlComponentRJSREEntry.getValue();
				jsnLineItemRJSREEntry[i].DamageKey= oidDdlDamageRJSREEntry.getSelectedKey();
				jsnLineItemRJSREEntry[i].DamageText= oidDdlDamageRJSREEntry.getValue();
				jsnLineItemRJSREEntry[i].RepairKey= oidDdlRepairRJSREEntry.getSelectedKey();
				jsnLineItemRJSREEntry[i].RepairText= oidDdlRepairRJSREEntry.getValue();
				jsnLineItemRJSREEntry[i].MaterialKey= oidDdlMaterialCodeRJSREEntry.getSelectedKey();
				jsnLineItemRJSREEntry[i].MaterialText= oidDdlMaterialCodeRJSREEntry.getValue();
				jsnLineItemRJSREEntry[i].MaterialCost= oidTFMaterialCostRJSREEntry.getValue();
				jsnLineItemRJSREEntry[i].ManHours= oidTFManHoursRJSREEntry.getValue();
				jsnLineItemRJSREEntry[i].RepairLength= oidTFRepairLengthRJSREEntry.getValue();
				jsnLineItemRJSREEntry[i].RepairWidth= oidTFRepairWidthRJSREEntry.getValue();
				jsnLineItemRJSREEntry[i].Quantity= oidTFQuantityRJSREEntry.getValue();
				jsnLineItemRJSREEntry[i].ResponsibilityKey=oidDdlResponsibilityRJSREEntry.getSelectedKey();
				jsnLineItemRJSREEntry[i].ResponsibilityText= oidDdlResponsibilityRJSREEntry.getValue();
				jsnLineItemRJSREEntry[i].LabourRate= oidTFLabourRateRJSREEntry.getValue();
				jsnLineItemRJSREEntry[i].TechBulletin= oidTFTechBulletinRJSREEntry.getValue();
				jsnLineItemRJSREEntry[i].DataInserted =true;
				break;
			}
		}
		if(!dataupdateRJSREEntry){
			oNewEntry ={};
			oNewEntry.checked=false;
			oNewEntry.LineItem="";
			oNewEntry.sectionKey = oidDdlSectionRJSREEntry.getSelectedKey();
			oNewEntry.sectionText = oidDdlSectionRJSREEntry.getValue();
			oNewEntry.LocationKey = oidDdlLocationRJSREEntry.getSelectedKey();
			oNewEntry.LocationText = oidDdlLocationRJSREEntry.getValue();
			oNewEntry.ComponentKey= oidDdlComponentRJSREEntry.getSelectedKey();
			oNewEntry.ComponentText= oidDdlComponentRJSREEntry.getValue();
			oNewEntry.DamageKey= oidDdlDamageRJSREEntry.getSelectedKey();
			oNewEntry.DamageText= oidDdlDamageRJSREEntry.getValue();
			oNewEntry.RepairKey= oidDdlRepairRJSREEntry.getSelectedKey();
			oNewEntry.RepairText= oidDdlRepairRJSREEntry.getValue();
			oNewEntry.MaterialKey= oidDdlMaterialCodeRJSREEntry.getSelectedKey();
			oNewEntry.MaterialText= oidDdlMaterialCodeRJSREEntry.getValue();
			oNewEntry.MaterialCost= oidTFMaterialCostRJSREEntry.getValue();
			oNewEntry.ManHours= oidTFManHoursRJSREEntry.getValue();
			oNewEntry.RepairLength= oidTFRepairLengthRJSREEntry.getValue();
			oNewEntry.RepairWidth= oidTFRepairWidthRJSREEntry.getValue();
			oNewEntry.Quantity= oidTFQuantityRJSREEntry.getValue();
			oNewEntry.ResponsibilityKey=oidDdlResponsibilityRJSREEntry.getSelectedKey();
			oNewEntry.ResponsibilityText= oidDdlResponsibilityRJSREEntry.getValue();
			oNewEntry.LabourRate= oidTFLabourRateRJSREEntry.getValue();
			oNewEntry.TechBulletin= oidTFTechBulletinRJSREEntry.getValue();
			oNewEntry.DataInserted = true;
		
			oNewEntry.responsibility = [];
			oNewEntry.responsibility.push({"text":"","key":""});
				var dataReponsibleREEntry = oMdlGlblDDLREEntry.getData().responsibility;
				for(var inx in dataReponsibleREEntry){
					oNewEntry.responsibility.push({"text":dataReponsibleREEntry[inx].text,"key":dataReponsibleREEntry[inx].key});
				}
				
				
			jsnLineItemRJSREEntry.push(oNewEntry);
			jsnLineItemRJSREEntry.resetSequence('LineItem',4)
		}
		
		if(jsnLineItemRJSREEntry.length < 6){
			oTblLineItemRJSREEntry.setNavigationMode(sap.ui.table.NavigationMode.None);
		}else{
			oTblLineItemRJSREEntry.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		}
		oMdlLineItemRJSREEntry.updateBindings();
	},
	
	deleteRowModelTableRJS: function(){
		var oTblLineItemRJSREEntry = sap.ui.getCore().byId("idTblLineItemRJSREEntry");
		//jsnLineItemRJSREEntry.resetSequence('LineItem',5)
		jsnLineItemRJSREEntry.removeValue('checked', true);
		/*if(estmtIdRJS == ''){
			jsnLineItemRJSREEntry.removeValue('checked', true);
		}else if(estmtIdRJS != ''){
			objcrntRJSREEntry.onlinefunDeleteLine();
		}*/
		
		oMdlLineItemRJSREEntry.updateBindings();
		if(jsnLineItemRJSREEntry.length < 6){
			oTblLineItemRJSREEntry.setNavigationMode(sap.ui.table.NavigationMode.None);
		}else{
			oTblLineItemRJSREEntry.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		}
	},
	
		//DELETE ONLINE LINE ITEM
	onlinesuccessfunDeleteLine: function(resultdata, response){
		busyDialog.close();
		if(resultdata != undefined){
			if(resultdata.results.length > 0){
				jsnLineItemRJSREEntry.removeValue('checked', true);
				sap.ui.commons.MessageBox.alert(resultdata.results[0].Msg);
			}
		}
		
		oMdlLineItemRJSREEntry.updateBindings();
		var oTblLineItemRJSREEntry = sap.ui.getCore().byId("idTblLineItemRJSREEntry");
		if(jsnLineItemRJSREEntry.length < 6){
			oTblLineItemRJSREEntry.setNavigationMode(sap.ui.table.NavigationMode.None);
		}else{
			oTblLineItemRJSREEntry.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		}
	},
	
	onlineerrorfunDeleteLine: function(err){
		errorfromServer(err);
	},
	
	onlinefunDeleteLine: function(){
		try{
			busyDialog.open();
			var urlToCall = serviceUrl15_old + "/Delete_Lines_Rep_Estimates?";
				urlToCall += "$filter=EstimateId eq '"+ estmtIdRJS +"' and DelLn1 eq '";
			
			var cntlineitem = 1;
			
			for(var i=0; i<jsnLineItemRJSREEntry.length; i++){
				if((jsnLineItemRJSREEntry[i].checked == true)&&(cntlineitem < 34)) {
					urlToCall += jsnLineItemRJSREEntry[i].LineItem + '$'
					cntlineitem++;
				}else if((jsnLineItemRJSREEntry[i].checked == true)&&(cntlineitem > 33)&&(cntlineitem < 67)) {
					if(cntlineitem == 34){
						urlToCall = urlToCall.slice(0,urlToCall.length-1);
						urlToCall += "' and DelLn2 eq '"
					}
					urlToCall += jsnLineItemRJSREEntry[i].LineItem + '$'
					cntlineitem++;
				}else if((jsnLineItemRJSREEntry[i].checked == true)&&(cntlineitem > 66)&&(cntlineitem < 101)) {
					if(cntlineitem == 67){
						urlToCall = urlToCall.slice(0,urlToCall.length-1);
						urlToCall += "' and DelLn3 eq '"
					}
					urlToCall += jsnLineItemRJSREEntry[i].LineItem + '$'
					cntlineitem++;
				}else if(cntlineitem > 100){
					jsnLineItemRJSREEntry[i].checked = false;
				}
			}
			urlToCall = urlToCall.slice(0,urlToCall.length-1);
			urlToCall += "'";
		    objUtilREstimate.doOnlineRequest(urlToCall,objcrntRJSREEntry.onlinesuccessfunDeleteLine, objcrntRJSREEntry.onlineerrorfunDeleteLine);
		}catch(e){
			busyDialog.close();
			sap.ui.commons.MessageBox.alert("Error on fetching Repair data " + e);
		}
	},
	
	fnDeleteLineMsgBox: function(sResult){
		if(sResult == "YES"){
			objcrntRJSREEntry.deleteRowModelTableRJS();
		}
	},
	
	fnResetCallbackMsgBoxRJS: function(sResult){
		//alert("sResult" + sResult);
		if(sResult == "YES"){
			var oTblLineItemRJSREEntry = sap.ui.getCore().byId("idTblLineItemRJSREEntry");
			var oidDdlSectionRJSREEntry = sap.ui.getCore().byId("idDdlSectionRJSREEntry");
			var oidDdlLocationRJSREEntry = sap.ui.getCore().byId("idDdlLocationRJSREEntry");
			var oidDdlComponentRJSREEntry = sap.ui.getCore().byId("idDdlComponentRJSREEntry");
			var oidDdlDamageRJSREEntry = sap.ui.getCore().byId("idDdlDamageRJSREEntry");
			var oidDdlRepairRJSREEntry = sap.ui.getCore().byId("idDdlRepairRJSREEntry");
			var oidDdlMaterialCodeRJSREEntry = sap.ui.getCore().byId("idDdlMaterialCodeRJSREEntry");
			var oidTFMaterialCostRJSREEntry = sap.ui.getCore().byId("idTFMaterialCostRJSREEntry");
			var oidTFManHoursRJSREEntry = sap.ui.getCore().byId("idTFManHoursRJSREEntry");
			var oidTFRepairLengthRJSREEntry = sap.ui.getCore().byId("idTFRepairLengthRJSREEntry");
			var oidTFRepairWidthRJSREEntry = sap.ui.getCore().byId("idTFRepairWidthRJSREEntry");
			var oidTFQuantityRJSREEntry = sap.ui.getCore().byId("idTFQuantityRJSREEntry");
			var oidDdlResponsibilityRJSREEntry = sap.ui.getCore().byId("idDdlResponsibilityRJSREEntry");
			var oidTFLabourRateRJSREEntry = sap.ui.getCore().byId("idTFLabourRateRJSREEntry");
			var oidTFTechBulletinRJSREEntry = sap.ui.getCore().byId("idTFTechBulletinRJSREEntry");

			oidDdlSectionRJSREEntry.setValueState(sap.ui.core.ValueState.None);
			oidDdlSectionRJSREEntry.setPlaceholder("Select Section");
			oidDdlSectionRJSREEntry.setSelectedKey('');
			
			oidDdlLocationRJSREEntry.setValueState(sap.ui.core.ValueState.None);
			oidDdlLocationRJSREEntry.setPlaceholder("Select Location");
			oidDdlLocationRJSREEntry.setSelectedKey('');
			oidDdlLocationRJSREEntry.destroyItems();
			if(oidDdlLocationRJSREEntry._oListBox != undefined)
				oidDdlLocationRJSREEntry._oListBox.setVisibleItems(0);
			
			oidDdlComponentRJSREEntry.setValueState(sap.ui.core.ValueState.None);
			oidDdlComponentRJSREEntry.setPlaceholder("Select Component");
			oidDdlComponentRJSREEntry.setSelectedKey('');
			oidDdlComponentRJSREEntry.destroyItems();
			if(oidDdlComponentRJSREEntry._oListBox != undefined)
				oidDdlComponentRJSREEntry._oListBox.setVisibleItems(0);
			
			oidDdlDamageRJSREEntry.setValueState(sap.ui.core.ValueState.None);
			oidDdlDamageRJSREEntry.setPlaceholder("Select Damage");
			oidDdlDamageRJSREEntry.setSelectedKey('');
			
			oidDdlRepairRJSREEntry.setValueState(sap.ui.core.ValueState.None);
			oidDdlRepairRJSREEntry.setPlaceholder("Select Repair");
			oidDdlRepairRJSREEntry.setSelectedKey('');
			oidDdlRepairRJSREEntry.destroyItems();
			if(oidDdlRepairRJSREEntry._oListBox != undefined)
				oidDdlRepairRJSREEntry._oListBox.setVisibleItems(0);
			
			oidDdlMaterialCodeRJSREEntry.setValueState(sap.ui.core.ValueState.None);
			oidDdlMaterialCodeRJSREEntry.setPlaceholder("Select Material Code");
			oidDdlMaterialCodeRJSREEntry.setSelectedKey('');
			
			oidTFMaterialCostRJSREEntry.setValueState(sap.ui.core.ValueState.None);
			oidTFMaterialCostRJSREEntry.setPlaceholder("Material Cost");
			oidTFMaterialCostRJSREEntry.setValue('');
			
			oidTFManHoursRJSREEntry.setValueState(sap.ui.core.ValueState.None);
			oidTFManHoursRJSREEntry.setPlaceholder("Man Hours");
			oidTFManHoursRJSREEntry.setValue('');
			
			oidTFRepairLengthRJSREEntry.setValueState(sap.ui.core.ValueState.None);
			oidTFRepairLengthRJSREEntry.setPlaceholder("Repair Length");
			oidTFRepairLengthRJSREEntry.setValue('');
			
			oidTFRepairWidthRJSREEntry.setValueState(sap.ui.core.ValueState.None);
			oidTFRepairWidthRJSREEntry.setPlaceholder("Repair Width");
			oidTFRepairWidthRJSREEntry.setValue('');
			
			oidTFQuantityRJSREEntry.setValueState(sap.ui.core.ValueState.None);
			oidTFQuantityRJSREEntry.setPlaceholder("Quantity");
			oidTFQuantityRJSREEntry.setValue('');
			
			oidDdlResponsibilityRJSREEntry.setValueState(sap.ui.core.ValueState.None);
			oidDdlResponsibilityRJSREEntry.setPlaceholder("Select Responsibility");
			oidDdlResponsibilityRJSREEntry.setSelectedKey('');
			
			oidTFLabourRateRJSREEntry.setValueState(sap.ui.core.ValueState.None);
			oidTFLabourRateRJSREEntry.setPlaceholder("Labour Rate");
			oidTFLabourRateRJSREEntry.setValue('');
			
			oidTFTechBulletinRJSREEntry.setValueState(sap.ui.core.ValueState.None);
			oidTFTechBulletinRJSREEntry.setPlaceholder("Tech Bulletin");
			oidTFTechBulletinRJSREEntry.setValue('');
			
			//jsnLineItemRJSREEntry.length = 0;
			//oMdlLineItemRJSREEntry.setData({modelData : jsnLineItemRJSREEntry});
			//oTblLineItemRJSREEntry.setNavigationMode(sap.ui.table.NavigationMode.None);

		}
	},
	
	createEnterLineDataLayRJS: function(){
		var oFrmCntnrRJSREEntry = sap.ui.getCore().byId("idFrmCntnrRJSREEntry");
		//INSERT TABLE
		var frmHdrEntrLinDataRJSREEntry = new sap.ui.layout.form.FormElement({
		    fields: [objcrntRJSREEntry.createLineItemTableRJS()]
		});
		oFrmCntnrRJSREEntry.addFormElement(frmHdrEntrLinDataRJSREEntry);
		
		//HEADER TEXT FOR INSERT LIND DATA
		frmHdrEntrLinDataRJSREEntry = new sap.ui.layout.form.FormElement({
		    fields: [new sap.ui.commons.Label({text: "Enter Line Data",
				layoutData: new sap.ui.layout.GridData({span: "L12 M12 S12"}),
	            wrapping: true}).addStyleClass("marginTop10 fontTitle")]
		});
		oFrmCntnrRJSREEntry.addFormElement(frmHdrEntrLinDataRJSREEntry);
		
		//FIRST ROW
		var olblSectionRJSREEntry = new sap.ui.commons.Label({text: "Section:",
			//required: true,
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
            wrapping: false}).addStyleClass("marginTop10");
		
		var oDdlSectionRJSREEntry = new sap.ui.commons.DropdownBox("idDdlSectionRJSREEntry", { 
			  layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"}),
			  width:"100%",
	          displaySecondaryValues:false,
			  placeholder: "Select Section",  
			  change: function(evnt){
				sap.ui.getCore().byId("idDdlLocationRJSREEntry").destroyItems();
				if(sap.ui.getCore().byId("idDdlLocationRJSREEntry")._oListBox != undefined)
					sap.ui.getCore().byId("idDdlLocationRJSREEntry")._oListBox.setVisibleItems(0);
				
				sap.ui.getCore().byId("idDdlComponentRJSREEntry").destroyItems();
				if(sap.ui.getCore().byId("idDdlComponentRJSREEntry")._oListBox != undefined)
					sap.ui.getCore().byId("idDdlComponentRJSREEntry")._oListBox.setVisibleItems(0);
				
				if(this.getValue() != '')
				{
					this.setValueState(sap.ui.core.ValueState.None);
					this.setPlaceholder("Select Section");
					
					objcrntRJSREEntry.onlinefunLocation(this.getSelectedKey());
				}
	          },
		}).addStyleClass("FormInputStyle marginTop7");
		
		//oDdlSectionRJSREEntry.insertItem((new sap.ui.core.ListItem({text:"Select Customer", key:"0"})),0);
		
		var olblLocationRJSREEntry = new sap.ui.commons.Label({text: "Location:",
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
            wrapping: false}).addStyleClass("marginTop10");
		
		var oDdlLocationRJSREEntry = new sap.ui.commons.DropdownBox("idDdlLocationRJSREEntry", { 
			  layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"}),
			  width:"100%",
	          displaySecondaryValues:false,
			  placeholder: "Select Location",			  
			  change: function(evnt){
				sap.ui.getCore().byId("idDdlComponentRJSREEntry").destroyItems();
				if(sap.ui.getCore().byId("idDdlComponentRJSREEntry")._oListBox != undefined)
					sap.ui.getCore().byId("idDdlComponentRJSREEntry")._oListBox.setVisibleItems(0);
					
				if(this.getValue() != '')
				{
					this.setValueState(sap.ui.core.ValueState.None);
					this.setPlaceholder("Select Location");
					
					objcrntRJSREEntry.onlinefunComponent(this.getSelectedKey());
				}
	          },
		}).addStyleClass("FormInputStyle marginTop7");
		
		
		var olblComponentRJSREEntry = new sap.ui.commons.Label({text: "Component:",
			//required: true,
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
            wrapping: false}).addStyleClass("marginTop10");
		
		var oDdlComponentRJSREEntry = new sap.ui.commons.DropdownBox("idDdlComponentRJSREEntry", { 
			  layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"}),
			  width:"100%",
	          displaySecondaryValues:false,
			  placeholder: "Select Component",			  
			  change: function(evnt){
				if(this.getValue() != '')
				{
					this.setValueState(sap.ui.core.ValueState.None);
					this.setPlaceholder("Select Component");
				}
	          },
		}).addStyleClass("FormInputStyle marginTop7");
		
		var frmFirsRowRJSREEntry = new sap.ui.layout.form.FormElement({
		    fields: [olblSectionRJSREEntry,oDdlSectionRJSREEntry,olblLocationRJSREEntry,oDdlLocationRJSREEntry,olblComponentRJSREEntry,oDdlComponentRJSREEntry]
		});
		oFrmCntnrRJSREEntry.addFormElement(frmFirsRowRJSREEntry);

		//SECOND ROW
		var olblDamageRJSREEntry = new sap.ui.commons.Label({text: "Damage:",
			//required: true,
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
            wrapping: false}).addStyleClass("marginTop10");
		
		var oDdlDamageRJSREEntry = new sap.ui.commons.DropdownBox("idDdlDamageRJSREEntry", { 
			  layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"}),
			  width:"100%",
	          displaySecondaryValues:false,
			  placeholder: "Select Damage",  
			  change: function(evnt){
				sap.ui.getCore().byId("idDdlRepairRJSREEntry").destroyItems();
				if(sap.ui.getCore().byId("idDdlRepairRJSREEntry")._oListBox != undefined)
					sap.ui.getCore().byId("idDdlRepairRJSREEntry")._oListBox.setVisibleItems(0);

				if(this.getValue() != '')
				{
					this.setValueState(sap.ui.core.ValueState.None);
					this.setPlaceholder("Select Damage");
					objcrntRJSREEntry.onlinefunRepair(this.getSelectedKey());
					
				}
	          },
		}).addStyleClass("FormInputStyle marginTop7");
		
		var olblRepairRJSREEntry = new sap.ui.commons.Label({text: "Repair:",
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
            wrapping: false}).addStyleClass("marginTop10");
		
		var oDdlRepairRJSREEntry = new sap.ui.commons.DropdownBox("idDdlRepairRJSREEntry", { 
			  layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"}),
			  width:"100%",
	          displaySecondaryValues:false,
			  placeholder: "Select Repair",			  
			  change: function(evnt){
				if(this.getValue() != '')
				{
					this.setValueState(sap.ui.core.ValueState.None);
					this.setPlaceholder("Select Repair");
				}
	          },
		}).addStyleClass("FormInputStyle marginTop7");
		
		
		var olblMaterialCodeRJSREEntry = new sap.ui.commons.Label({text: "Material Code:",
			//required: true,
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
            wrapping: false}).addStyleClass("marginTop10");
		
		var oidDdlMaterialCodeRJSREEntry = new sap.ui.commons.DropdownBox("idDdlMaterialCodeRJSREEntry", { 
			  layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"}),
			  width:"100%",
	          displaySecondaryValues:false,
			  placeholder: "Select Material Code",			  
			  change: function(evnt){
				if(this.getValue() != '')
				{
					this.setValueState(sap.ui.core.ValueState.None);
					this.setPlaceholder("Select Material Code");
				}
	          },
		}).addStyleClass("FormInputStyle marginTop7");
		
			
		frmFirsRowRJSREEntry = new sap.ui.layout.form.FormElement({
		    fields: [olblDamageRJSREEntry,oDdlDamageRJSREEntry,olblRepairRJSREEntry,oDdlRepairRJSREEntry,olblMaterialCodeRJSREEntry,oidDdlMaterialCodeRJSREEntry]
		});
		oFrmCntnrRJSREEntry.addFormElement(frmFirsRowRJSREEntry);
		
		//THIRD ROW
		var olblMaterialCostRJSREEntry = new sap.ui.commons.Label({text: "Material Cost:",
			//required: true,
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
            wrapping: false}).addStyleClass("marginTop10");
		
		var oTFMaterialCostRJSREEntry = new sap.ui.commons.TextField('idTFMaterialCostRJSREEntry',{
    		placeholder: "Material Cost",
			//width:"85%",
    		layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"}),
    	}).addStyleClass("FormInputStyle marginTop7");
		
		oTFMaterialCostRJSREEntry.onfocusin =  function(e) {  
			this.setValueState(sap.ui.core.ValueState.None);
			this.setPlaceholder("Material Cost");                          
	      };
	      
		oTFMaterialCostRJSREEntry.onkeyup = function(evnt){
			addSeparator(document.getElementById(this.sId));
		};
		oTFMaterialCostRJSREEntry.onkeydown = function(e){
			validateNumeric(event,false);
		};
		oTFMaterialCostRJSREEntry.onpaste = function(e){
			e.preventDefault();
		};
		
		var olblManHoursRJSREEntry = new sap.ui.commons.Label({text: "Man Hours:",
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
            wrapping: false}).addStyleClass("marginTop10");
		
		var oTFManHoursRJSREEntry = new sap.ui.commons.TextField('idTFManHoursRJSREEntry',{
    		placeholder: "Man Hours",
			//width:"85%",
    		layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"}),
    	}).addStyleClass("FormInputStyle marginTop7");
		
		oTFManHoursRJSREEntry.onfocusin =  function(e) {  
			this.setValueState(sap.ui.core.ValueState.None);
			this.setPlaceholder("Man Hours");                          
	      };
		
	      oTFManHoursRJSREEntry.onkeyup = function(evnt){
				addSeparator(document.getElementById(this.sId));
			};
			oTFManHoursRJSREEntry.onkeydown = function(e){
				validateNumeric(event,true);
			};
			oTFManHoursRJSREEntry.onpaste = function(e){
				e.preventDefault();
			};
		
		var olblRepairLengthRJSREEntry = new sap.ui.commons.Label({text: "Repair Length:",
			//required: true,
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
            wrapping: false}).addStyleClass("marginTop10");
		
		var oTFRepairLengthRJSREEntry = new sap.ui.commons.TextField('idTFRepairLengthRJSREEntry',{
    		placeholder: "Repair Length",
			//width:"85%",
    		layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"}),
    	}).addStyleClass("FormInputStyle marginTop7");
		
		oTFRepairLengthRJSREEntry.onfocusin =  function(e) {  
			this.setValueState(sap.ui.core.ValueState.None);
			this.setPlaceholder("Repair Length");                          
	      };
	      
	    oTFRepairLengthRJSREEntry.onkeyup = function(evnt){
			addSeparator(document.getElementById(this.sId));
		};
		oTFRepairLengthRJSREEntry.onkeydown = function(e){
			validateNumeric(event,true);
		};
		oTFRepairLengthRJSREEntry.onpaste = function(e){
			e.preventDefault();
		};
	
		
		frmFirsRowRJSREEntry = new sap.ui.layout.form.FormElement({
		    fields: [olblMaterialCostRJSREEntry,oTFMaterialCostRJSREEntry,olblManHoursRJSREEntry,oTFManHoursRJSREEntry,olblRepairLengthRJSREEntry,oTFRepairLengthRJSREEntry]
		});
		oFrmCntnrRJSREEntry.addFormElement(frmFirsRowRJSREEntry);
		
		//FOURTH ROW
		var olblRepairWidthRJSREEntry = new sap.ui.commons.Label({text: "Repair Width:",
			//required: true,
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
            wrapping: false}).addStyleClass("marginTop10");
		
		var oTFRepairWidthRJSREEntry = new sap.ui.commons.TextField('idTFRepairWidthRJSREEntry',{
    		placeholder: "Repair Width",
			//width:"85%",
    		layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"}),
    	}).addStyleClass("FormInputStyle marginTop7");
		
		oTFRepairWidthRJSREEntry.onfocusin =  function(e) {  
			this.setValueState(sap.ui.core.ValueState.None);
			this.setPlaceholder("Repair Width");                          
	      };
		
	    oTFRepairWidthRJSREEntry.onkeyup = function(evnt){
			addSeparator(document.getElementById(this.sId));
		};
		oTFRepairWidthRJSREEntry.onkeydown = function(e){
			validateNumeric(event,true);
		};
		oTFRepairWidthRJSREEntry.onpaste = function(e){
			e.preventDefault();
		};
			
		var olblQuantityRJSREEntry = new sap.ui.commons.Label({text: "Quantity:",
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
            wrapping: false}).addStyleClass("marginTop10");
		
		var oTFQuantityRJSREEntry = new sap.ui.commons.TextField('idTFQuantityRJSREEntry',{
    		placeholder: "Quantity",
			//width:"85%",
    		layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"}),
    	}).addStyleClass("FormInputStyle marginTop7");
		
		oTFQuantityRJSREEntry.onfocusin =  function(e) {  
			this.setValueState(sap.ui.core.ValueState.None);
			this.setPlaceholder("Quantity");                          
	      };
		
	    oTFQuantityRJSREEntry.onkeyup = function(evnt){
			addSeparator(document.getElementById(this.sId));
		};
		oTFQuantityRJSREEntry.onkeydown = function(e){
			validateNumeric(event,true);
		};
		oTFQuantityRJSREEntry.onpaste = function(e){
			e.preventDefault();
		};
			
		var olblResponsibilityRJSREEntry = new sap.ui.commons.Label({text: "Responsibility:",
			//required: true,
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
            wrapping: false}).addStyleClass("marginTop10");
		
		var oDdlResponsibilityRJSREEntry = new sap.ui.commons.DropdownBox("idDdlResponsibilityRJSREEntry", { 
			  layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"}),
			  width:"100%",
	          displaySecondaryValues:false,
			  placeholder: "Select Responsibility",			  
			  change: function(evnt){
				if(this.getValue() != '')
				{
					this.setValueState(sap.ui.core.ValueState.None);
					this.setPlaceholder("Select Responsibility");
				}
	          },
		}).addStyleClass("FormInputStyle marginTop7");
	    //oDdlResponsibilityRJSREEntry.setModel(omdlGlobalRESData);
		//oDdlResponsibilityRJSREEntry.bindItems("/Responsibility", oItmTmpltGloabREEntry);
		
		frmFirsRowRJSREEntry = new sap.ui.layout.form.FormElement({
		    fields: [olblRepairWidthRJSREEntry,oTFRepairWidthRJSREEntry,olblQuantityRJSREEntry,oTFQuantityRJSREEntry,olblResponsibilityRJSREEntry,oDdlResponsibilityRJSREEntry]
		});
		oFrmCntnrRJSREEntry.addFormElement(frmFirsRowRJSREEntry);
		
		//FIFTH ROW
		var olblLabourRateRJSREEntry = new sap.ui.commons.Label({text: "Labour Rate:",
			//required: true,
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
            wrapping: false}).addStyleClass("marginTop10");
		
		var oTFLabourRateRJSREEntry = new sap.ui.commons.TextField('idTFLabourRateRJSREEntry',{
    		placeholder: "Labour Rate",
			//width:"85%",
    		layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"}),
    	}).addStyleClass("FormInputStyle marginTop7");
		
		oTFLabourRateRJSREEntry.onfocusin =  function(e) {  
			this.setValueState(sap.ui.core.ValueState.None);
			this.setPlaceholder("Labour Rate");                          
	    };
		
	    oTFLabourRateRJSREEntry.onkeyup = function(evnt){
			addSeparator(document.getElementById(this.sId));
		};
		oTFLabourRateRJSREEntry.onkeydown = function(e){
			validateNumeric(event,false);
		};
		oTFLabourRateRJSREEntry.onpaste = function(e){
			e.preventDefault();
		};
		
		var olblTechBulletinRJSREEntry = new sap.ui.commons.Label({text: "Tech Bulletin:",
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
            wrapping: false}).addStyleClass("marginTop10");
		
		var oTFTechBulletinRJSREEntry = new sap.ui.commons.TextField('idTFTechBulletinRJSREEntry',{
    		placeholder: "Tech Bulletin",
    		change: upperOnChangeTF,
			//width:"85%",
    		layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"}),
    	}).addStyleClass("FormInputStyle marginTop7");
		
		oTFTechBulletinRJSREEntry.onfocusin =  function(e) {  
			this.setValueState(sap.ui.core.ValueState.None);
			this.setPlaceholder("Tech Bulletin");                          
	      };
		
	      frmFirsRowRJSREEntry = new sap.ui.layout.form.FormElement({
			    fields: [olblLabourRateRJSREEntry,oTFLabourRateRJSREEntry, olblTechBulletinRJSREEntry,oTFTechBulletinRJSREEntry]
			});
			oFrmCntnrRJSREEntry.addFormElement(frmFirsRowRJSREEntry);
		
			//CREATE LINE ITEM BUTTONS
			var oBtnInsertLineRJSREEntry = new sap.m.Button("idBtnInsertLineRJSREEntry",{
				  text : "Insert Line",
				  width:"100px",
				  styled:false,
				  //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: true}),
				  press:function(){
					sap.ui.getCore().byId("idlblSuccessMsgJSREE").setVisible(false);
					sap.ui.getCore().byId("idlblSuccessMsgJSREE").setText("");
					objcrntRJSREEntry.insertRowLineItemRJS();
			}}).addStyleClass("submitBtn");
		   	
			var oBtnDeleteLineRJSREEntry = new sap.m.Button("idBtnDeleteLineRJSREEntry",{
		          text : "Delete Line",
		          visible: false,
		          width:"90px",
				  styled:false,
		          //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: false}),
		          press:function(){
					sap.ui.getCore().byId("idlblSuccessMsgJSREE").setVisible(false);
					sap.ui.getCore().byId("idlblSuccessMsgJSREE").setText("");
					
		        	  var msgAlrtDelet ="The selected lines from the Repair Lines will be deleted.\nTo delete the lines click Yes.\nTo return to the Repair Estimate screen without deleting any lines click No.";
						var chkedArr = jQuery.grep(jsnLineItemRJSREEntry, function(element, index){
							return element.checked == true;
						});
						if(chkedArr.length < 1){
							sap.ui.commons.MessageBox.alert("No lines selected for deletion.\nPlease check atleast 1 checkbox in the Repair Lines section and retry.");
							return;
						}else{
							sap.ui.commons.MessageBox.show(msgAlrtDelet,sap.ui.commons.MessageBox.Icon.WARNING,"Warning",
								[sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO],
								objcrntRJSREEntry.fnDeleteLineMsgBox, sap.ui.commons.MessageBox.Action.YES);
						}
		          }}).addStyleClass("submitBtn");
			
			var ResetMessage = "This will clear all the input data from the Enter Line Data section.\n Do you want to continue?";
			var oBtnResetLineRJSREEntry = new sap.m.Button("idBtnResetRJSREEntry",{
				text : "Reset",
				width:"80px",
				styled:false,
				//layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
				press:function(){
					sap.ui.getCore().byId("idlblSuccessMsgJSREE").setVisible(false);
					sap.ui.getCore().byId("idlblSuccessMsgJSREE").setText("");
					
					sap.ui.commons.MessageBox.show(ResetMessage,sap.ui.commons.MessageBox.Icon.WARNING,"Warning",
					[sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO],
					objcrntRJSREEntry.fnResetCallbackMsgBoxRJS, sap.ui.commons.MessageBox.Action.YES);
			}}).addStyleClass("submitBtn");
				  
		   	
		 // Flex Box
	    	var oFlxBtnLineRJSREEntry = new sap.m.FlexBox({
	    	      items: [oBtnInsertLineRJSREEntry, new sap.ui.commons.Label( {text: " ",width : '8px'}), oBtnDeleteLineRJSREEntry,new sap.ui.commons.Label( {text: " ",width : '8px'}), oBtnResetLineRJSREEntry],
	    	      direction: "Row",
				  layoutData: new sap.ui.layout.GridData({span: "L12 M12 S12",linebreak: true, margin: false}),
	    	    }).addStyleClass("marginTop10");
	    	
	    	  	frmFirsRowRJSREEntry = new sap.ui.layout.form.FormElement({
				    fields: [oFlxBtnLineRJSREEntry]
				});
				oFrmCntnrRJSREEntry.addFormElement(frmFirsRowRJSREEntry);
				

				frmFirsRowRJSREEntry = new sap.ui.layout.form.FormElement({
				    fields: [new sap.ui.commons.HorizontalDivider({width: "100%", type: "Area", height: "Medium"}).addStyleClass("marginTop7")]
				});
				oFrmCntnrRJSREEntry.addFormElement(frmFirsRowRJSREEntry);

				//CREATE BUTTONS SAVE AND SUBMIT
				var oBtnSubmitRJSREEntry = new sap.m.Button("idBtnSubmitRJSREEntry",{
					  text : "Submit",
					  width:"80px",
					  styled:false,
					  //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: true}),
					  press:function(){
						sap.ui.getCore().byId("idlblSuccessMsgJSREE").setVisible(false);
						sap.ui.getCore().byId("idlblSuccessMsgJSREE").setText("");
						
						clickEvent = "submit";
						var valid = true;
						if(sap.ui.getCore().byId("idDdlUnitPCodeRJSREEntry").getValue() == ''){
							valid = false;
							sap.ui.getCore().byId("idDdlUnitPCodeRJSREEntry").setValueState(sap.ui.core.ValueState.Error);
							sap.ui.getCore().byId("idDdlUnitPCodeRJSREEntry").setPlaceholder("Select Unit Part Code");
						}
						
						if(sap.ui.getCore().byId("idDdlJobTypeRJSREEntry").getValue() == ''){
							valid = false;
							sap.ui.getCore().byId("idDdlJobTypeRJSREEntry").setValueState(sap.ui.core.ValueState.Error);
							sap.ui.getCore().byId("idDdlJobTypeRJSREEntry").setPlaceholder("Select Job Type");
						}
						if(sap.ui.getCore().byId("idDtPkrEstimateDtRJSREEntry").getValue() == ''){
							valid = false;
							sap.ui.getCore().byId("idDtPkrEstimateDtRJSREEntry").setValueState(sap.ui.core.ValueState.Error);
							sap.ui.getCore().byId("idDtPkrEstimateDtRJSREEntry").setPlaceholder("Estimate Date");
						}
						if(!valid){
							return;
						}
						
						if(sap.ui.getCore().byId("idFrmElmntErrRJSREEntry") != undefined){
							sap.ui.getCore().byId("idFrmElmntErrRJSREEntry").destroyFields();
							sap.ui.getCore().byId("idFrmElmntErrRJSREEntry").destroy();
						}
						if(sap.ui.getCore().byId("idFrmElmntInfoLstRJSREEntry") != undefined){
							sap.ui.getCore().byId("idFrmElmntInfoLstRJSREEntry").destroyFields();
							sap.ui.getCore().byId("idFrmElmntInfoLstRJSREEntry").destroy();
						}
						
						objcrntRJSREEntry.saveNsubmitRJS();
						//objREstimateOnline.onlineRJSSubmit(estmtIdRJS);
				}}).addStyleClass("submitBtn");
			   	
				var oBtnBackUnitSelRJSREEntry = new sap.m.Button("idBtnBackUnitSelRJSREEntry",{
			        text : "Back To Unit Selection",
			        width:"170px",
					styled:false,
			          //layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: false}),
			        press:function(){
						sap.ui.getCore().byId("idlblSuccessMsgJSREE").setVisible(false);
						sap.ui.getCore().byId("idlblSuccessMsgJSREE").setText("");
					
						sap.ui.commons.MessageBox.show("You will lose any unsaved data.\nTo go back and save data click No and then click the Save Estimates button.",sap.ui.commons.MessageBox.Icon.WARNING,"Warning",
						[sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO],
						objcurntREEntry.backToUnitSelction, sap.ui.commons.MessageBox.Action.YES);
			        	//sap.ui.controller("view.RepairEstimateEntryVw").navButtonPress();
			         }}).addStyleClass("submitBtn");
				
				
				var oBtnSaveEstimatesRJSREEntry = new sap.m.Button("idBtnSaveEstimatesRJSREEntry",{
					text : "Save Estimates",
					width:"120px",
					styled:false,
					//layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
					press:function(){
						clickEvent = "save";
						objcrntRJSREEntry.saveNsubmitRJS();
					}}).addStyleClass("submitBtn");
					  
			   	
				var oBtnClearMessagesRJSREEntry = new sap.m.Button("idBtnClearMessagesRJSREEntry",{
					text : "Hide Error Messages",
					width:"180px",
					styled:false,
					//layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
					press:function(){
						if(sap.ui.getCore().byId("idRRRepairEstim") != undefined)
							sap.ui.getCore().byId("idRRRepairEstim").setVisible(false);
						if(sap.ui.getCore().byId("idErrorTableRep") != undefined)
							sap.ui.getCore().byId("idErrorTableRep").setVisible(false);
					}}).addStyleClass("submitBtn");
				
			 // Flex Box
		    	var oFlxBtnSubmitBtnRJSREEntry = new sap.m.FlexBox({
		    	      items: [oBtnSubmitRJSREEntry, new sap.ui.commons.Label( {text: " ",width : '8px'}), 
		    	              oBtnBackUnitSelRJSREEntry,new sap.ui.commons.Label( {text: " ",width : '8px'}), 
		    	              oBtnSaveEstimatesRJSREEntry,new sap.ui.commons.Label( {text: " ",width : '8px'}),
		    	              oBtnClearMessagesRJSREEntry],
		    	      direction: "Row",
					  layoutData: new sap.ui.layout.GridData({span: "L12 M12 S12",linebreak: true, margin: false}),
		    	    }).addStyleClass("marginTop10");
		    	
				frmFirsRowRJSREEntry = new sap.ui.layout.form.FormElement({
					    fields: [oFlxBtnSubmitBtnRJSREEntry]
					});
				oFrmCntnrRJSREEntry.addFormElement(frmFirsRowRJSREEntry);
				
				var olblSuccessMsgJSREE = new sap.ui.commons.Label({
					id: "idlblSuccessMsgJSREE",
					visible: false,
					layoutData: new sap.ui.layout.GridData({span: "L12 M12 S12",linebreak: false, margin: true}),
					wrapping: true}).addStyleClass("marginTop7");
				olblSuccessMsgJSREE.setText("");
		
				frmFirsRowRJSREEntry = new sap.ui.layout.form.FormElement({
				    fields: [olblSuccessMsgJSREE]
				});
				oFrmCntnrRJSREEntry.addFormElement(frmFirsRowRJSREEntry);
				
				//BIND DROP DOWN FROM EXITING MODEL AND TEMPLETE FROM REENTRY
				objcrntRJSREEntry.bindAllDropDownRJS();
	},
	saveNsubmitRJS: function()
	{
		saveLineItemRJSREEntry.length = 0;
		for(var i=0; i<jsnLineItemRJSREEntry.length; i++){
		if((jsnLineItemRJSREEntry[i].LocationKey != '') ||
			(jsnLineItemRJSREEntry[i].ComponentKey != '') ||
			(jsnLineItemRJSREEntry[i].DamageKey != '') ||
			(jsnLineItemRJSREEntry[i].MaterialKey != '') ||
			(jsnLineItemRJSREEntry[i].RepairKey != '') ||
			(jsnLineItemRJSREEntry[i].RepairLength != '') ||
			(jsnLineItemRJSREEntry[i].RepairWidth != '') ||
			(jsnLineItemRJSREEntry[i].Quantity != '') ||
			(jsnLineItemRJSREEntry[i].ManHours != '') ||
			(jsnLineItemRJSREEntry[i].MaterialCost != '') ||
			(jsnLineItemRJSREEntry[i].LabourRate != '') ||
			(jsnLineItemRJSREEntry[i].TechBulletin != '') ||
			(jsnLineItemRJSREEntry[i].ResponsibilityKey != '')){
				saveLineItemRJSREEntry.push({
					"checked":jsnLineItemRJSREEntry[i].checked,
					"LineItem":jsnLineItemRJSREEntry[i].LineItem,
					"sectionKey":jsnLineItemRJSREEntry[i].sectionKey,
					"sectionText":jsnLineItemRJSREEntry[i].sectionText,
					"LocationKey":jsnLineItemRJSREEntry[i].LocationKey,
					"LocationText":jsnLineItemRJSREEntry[i].LocationText,
					"ComponentKey":jsnLineItemRJSREEntry[i].ComponentKey,
					"ComponentText":jsnLineItemRJSREEntry[i].ComponentText,
					"DamageKey":jsnLineItemRJSREEntry[i].DamageKey,
					"DamageText":jsnLineItemRJSREEntry[i].DamageText,
					"RepairKey":jsnLineItemRJSREEntry[i].RepairKey,
					"RepairText":jsnLineItemRJSREEntry[i].RepairText,
					"MaterialKey":jsnLineItemRJSREEntry[i].MaterialKey,
					"MaterialText":jsnLineItemRJSREEntry[i].MaterialText,
					"MaterialCost":jsnLineItemRJSREEntry[i].MaterialCost,
					"ManHours":jsnLineItemRJSREEntry[i].ManHours,
					"RepairLength":jsnLineItemRJSREEntry[i].RepairLength,
					"RepairWidth":jsnLineItemRJSREEntry[i].RepairWidth,
					"Quantity":jsnLineItemRJSREEntry[i].Quantity,
					"ResponsibilityKey":jsnLineItemRJSREEntry[i].ResponsibilityKey,
					"ResponsibilityText":jsnLineItemRJSREEntry[i].ResponsibilityText,
					"LabourRate":jsnLineItemRJSREEntry[i].LabourRate,
					"TechBulletin":jsnLineItemRJSREEntry[i].TechBulletin,
					"DataInserted":jsnLineItemRJSREEntry[i].DataInserted,
					"savestatus": false
				});
			}
		}
		objREstimateOnline.onlineRJSEstimateSave(estmtIdRJS, 'X');

	},
	
	bindAllDropDownRJS: function(){
//		//SECTION
//		var oidDdlSectionRJSREE = sap.ui.getCore().byId("idDdlSectionRJSREEntry");
//		oidDdlSectionRJSREE.setModel(oMdlGlblDDLREEntry);
//		oidDdlSectionRJSREE.bindItems("/section", oItmTmpltGlblDDLREEntry);
//		oidDdlSectionRJSREE.insertItem(new sap.ui.core.ListItem({text:"",key:""}),0);
//		//DAMAGE CODE
//		var oidDdlDamageRJSREE = sap.ui.getCore().byId("idDdlDamageRJSREEntry");
//		oidDdlDamageRJSREE.setModel(oMdlGlblDDLREEntry);
//		oidDdlDamageRJSREE.bindItems("/damagecode", oItmTmpltGlblDDLREEntry);
//		oidDdlDamageRJSREE.insertItem(new sap.ui.core.ListItem({text:"",key:""}),0);
//		
//		//RESPONSIBILITY
//		var oidDdlResponsibilityRJSREE = sap.ui.getCore().byId("idDdlResponsibilityRJSREEntry");
//		oidDdlResponsibilityRJSREE.setModel(oMdlGlblDDLREEntry);
//		oidDdlResponsibilityRJSREE.bindItems("/responsibility", oItmTmpltGlblDDLREEntry);
//		oidDdlResponsibilityRJSREE.insertItem(new sap.ui.core.ListItem({text:"",key:""}),0);
//		
//		//MATRIAL CODE
//		var oidDdlMaterialCodeRJSREE = sap.ui.getCore().byId("idDdlMaterialCodeRJSREEntry");
//		oidDdlMaterialCodeRJSREE.setModel(oMdlGlblDDLREEntry);
//		oidDdlMaterialCodeRJSREE.bindItems("/matrialcode", oItmTmpltGlblDDLREEntry);
//		oidDdlMaterialCodeRJSREE.insertItem(new sap.ui.core.ListItem({text:"",key:""}),0);
		
	},
	
	//FILL DROP DOWN LOCATION
	onlinesuccessfunLocation: function(resultdata, response){
		var msg ='';
		busyDialog.close();
		
		if(resultdata != undefined){
			if(resultdata.results.length > 0){
				var oidDdlLocationREEntry = sap.ui.getCore().byId("idDdlLocationRJSREEntry");
				oidDdlLocationREEntry.insertItem(new sap.ui.core.ListItem({text:"",key:""}),0);
				for(var inx in resultdata.results){
					oidDdlLocationREEntry.addItem(new sap.ui.core.ListItem({
					text:resultdata.results[inx].Kurztext
					,key:resultdata.results[inx].Param2}));
				}
			}
		}
	},
	
	onlineerrorfunLocation: function(err){
		errorfromServer(err);
	},
	
	onlinefunLocation: function(secId){
		try{
			busyDialog.open();
			var urlToCall = serviceUrl15_old + "/Repair_F4_Locgcode?";
				urlToCall += "$filter=ISection eq '"+ secId +"'";
				
		    objUtilREstimate.doOnlineRequest(urlToCall,objcrntRJSREEntry.onlinesuccessfunLocation, objcrntRJSREEntry.onlineerrorfunLocation);
		}catch(e){
			busyDialog.close();
			sap.ui.commons.MessageBox.alert("Error on fetching Location data " + e);
		}
	},
	
	//FILL DROP DOWN COMPONENT
	onlinesuccessfunComponent: function(resultdata, response){
		busyDialog.close();
		if(resultdata != undefined){
			if(resultdata.results.length > 0){
				var oidDdlComponentREEntry = sap.ui.getCore().byId("idDdlComponentRJSREEntry");
				oidDdlComponentREEntry.insertItem(new sap.ui.core.ListItem({text:"",key:""}),0);
				for(var inx in resultdata.results){
					oidDdlComponentREEntry.addItem(new sap.ui.core.ListItem({
					text:resultdata.results[inx].Kurztext
					,key:resultdata.results[inx].Param2}));
				}
			}
		}
	},
	
	onlineerrorfunComponent: function(err){
		errorfromServer(err);
	},
	
	onlinefunComponent: function(locId){
		try{
			busyDialog.open();
			var urlToCall = serviceUrl15_old + "/Repair_F4_Compcode?";
				urlToCall += "$filter=ILocCd eq '"+ locId +"'";
				
		    objUtilREstimate.doOnlineRequest(urlToCall,objcrntRJSREEntry.onlinesuccessfunComponent, objcrntRJSREEntry.onlineerrorfunComponent);
		}catch(e){
			busyDialog.close();
			sap.ui.commons.MessageBox.alert("Error on fetching Component data " + e);
		}
	},
	
	//FILL DROP DOWN REPAIR
	onlinesuccessfunRepair: function(resultdata, response){
		busyDialog.close();
		if(resultdata != undefined){
			if(resultdata.results.length > 0){
				var oidDdlRepairREEntry = sap.ui.getCore().byId("idDdlRepairRJSREEntry");
				oidDdlRepairREEntry.insertItem(new sap.ui.core.ListItem({text:"",key:""}),0);
				for(var inx in resultdata.results){
					oidDdlRepairREEntry.addItem(new sap.ui.core.ListItem({
					text:resultdata.results[inx].Kurztext
					,key:resultdata.results[inx].Param2}));
				}
			}
		}
	},
	
	onlineerrorfunRepair: function(err){
		errorfromServer(err);
	},
	
	onlinefunRepair: function(damageId){
		try{
			busyDialog.open();
			var urlToCall = serviceUrl15_old + "/Repair_F4_Repaircode?";
				urlToCall += "$filter=IDamagecd eq '"+ damageId +"'";
				
		    objUtilREstimate.doOnlineRequest(urlToCall,objcrntRJSREEntry.onlinesuccessfunRepair, objcrntRJSREEntry.onlineerrorfunRepair);
		}catch(e){
			busyDialog.close();
			sap.ui.commons.MessageBox.alert("Error on fetching Repair data " + e);
		}
	},
});
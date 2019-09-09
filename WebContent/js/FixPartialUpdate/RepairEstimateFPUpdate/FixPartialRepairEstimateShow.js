/******** NP *******/
jQuery.sap.require("sap.ui.model.json.JSONModel");
var objcurntFPUREShow;
		
sap.ui.model.json.JSONModel.extend("FixPartialRepairEstimateShow", {
	
createFPUREShowFrm: function(){
		objcurntFPUREShow = new FixPartialRepairEstimateShow();
		
		// Responsive Grid Layout
		var oResGLayFPRES = new sap.ui.layout.form.ResponsiveGridLayout({
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
		
		//FIRST ROW
		var olblEstmtTypeFPURES = new sap.ui.commons.Label({text: "Estimate Type",
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
			wrapping: false}).addStyleClass("marginTop10");
		
		var otxtVwEstmtTypeFPURES = new sap.ui.commons.TextField({enabled: false, 
			//text:'{/headerDtl/0/EstimateType}',
			 layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"})
		}).bindProperty("value", "/headerDtl/0/EstimateType").addStyleClass("FormInputStyle marginTop7");
		
		
		var olblSerialNoFPURES = new sap.ui.commons.Label({text: "Serial Number",
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
			wrapping: false}).addStyleClass("marginTop10");
		
		var otxtVwSerialNoFPURES = new sap.ui.commons.TextField({enabled: false, 
			 layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"})
		}).bindProperty("value", "/headerDtl/0/SerialNumber").addStyleClass("FormInputStyle marginTop7");

		
		var olblSendAddressFPURES = new sap.ui.commons.Label({text: "Sender Address",
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
			wrapping: false}).addStyleClass("marginTop10");
		
		var otxtVwSendAddressFPURES = new sap.ui.commons.TextField({ enabled: false, 
			 layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"})
		}).bindProperty("value", "/headerDtl/0/SenderAddress").addStyleClass("FormInputStyle marginTop7");
		
		//SECOND ROW
		var olblEstmtNoFPURES = new sap.ui.commons.Label({text: "Estimate Number",
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
			wrapping: false}).addStyleClass("marginTop10");
		
		var otxtVwEstmtNoFPURES = new sap.ui.commons.TextField({ enabled: false, 
			 layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"})
		}).bindProperty("value", "/headerDtl/0/EstimateNumber").addStyleClass("FormInputStyle marginTop7");
		
		
		var olblCurrencyCodeFPURES = new sap.ui.commons.Label({text: "Currency Code",
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
			wrapping: false}).addStyleClass("marginTop10");
		
		var otxtVwCurrencyCodeFPURES = new sap.ui.commons.TextField({ enabled: false, 
			 layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"})
		}).bindProperty("value", "/headerDtl/0/CurrencyCode").addStyleClass("FormInputStyle marginTop7");

		
		var olblMoveInDateFPURES = new sap.ui.commons.Label({text: "Movement In Date",
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
			wrapping: false}).addStyleClass("marginTop10");
		
		var otxtVwMoveInDateFPURES = new sap.ui.commons.TextField({ enabled: false, 
			 layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"})
		}).bindProperty("value", "/headerDtl/0/MovementInDate").addStyleClass("FormInputStyle marginTop7");
		

		//THIRD ROW
		var olblSaleGradeFPURES = new sap.ui.commons.Label({text: "Sale Grade",
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
			wrapping: false}).addStyleClass("marginTop10");
		
		var otxtVwSaleGradeFPURES = new sap.ui.commons.TextField({ enabled: false, 
			 layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"})
		}).bindProperty("value", "/headerDtl/0/SaleGrade").addStyleClass("FormInputStyle marginTop7");
		
		
		var olblUnitPartCodeFPURES = new sap.ui.commons.Label({text: "Unit Part Code",
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
			wrapping: false}).addStyleClass("marginTop10");
		
		var otxtVwUnitPartCodeFPURES = new sap.ui.commons.TextField({ enabled: false, 
			 layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"})
		}).bindProperty("value", "/headerDtl/0/UnitPartcode").addStyleClass("FormInputStyle marginTop7");

		
		var olblWorkCreatedDateFPURES = new sap.ui.commons.Label({text: "Work Created Date",
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
			wrapping: false}).addStyleClass("marginTop10");
		
		var otxtVwWorkCreatedDateFPURES = new sap.ui.commons.TextField({ enabled: false, 
			 layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"})
		}).bindProperty("value", "/headerDtl/0/WorkCreatedDate").addStyleClass("FormInputStyle marginTop7");
		
		//FORTH ROW
		var olblCntnrStrCompleteFPURES = new sap.ui.commons.Label({text: "Container Structure Complete",
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
			wrapping: false}).addStyleClass("marginTop10");
		
		var oChkBxCntnrStrCompleteFPURES = new sap.ui.commons.CheckBox({
			 layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"}),
			enabled: false,
			//checked: "{/enabled}", 
		    change: function(evnt){
		    }
		}).bindProperty("checked", "/headerDtl/0/ContainerStructureComplete").addStyleClass("marginTop7");
		
		var olblMultiPartCntnrFPURES = new sap.ui.commons.Label({text: "Multi Part Container",
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
			wrapping: false}).addStyleClass("marginTop10");
		
		var oChkBxMultiPartCntnrFPURES = new sap.ui.commons.CheckBox({
			 layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"}),
			 enabled: false,
			//checked: "{/enabled}", 
		    change: function(evnt){
		    }
		}).bindProperty("checked", "/headerDtl/0/MultiPartContainer").addStyleClass("marginTop7");

		
		var olblAssetNumberFPURES = new sap.ui.commons.Label({text: "Asset Number",
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
			wrapping: false}).addStyleClass("marginTop10");
		
		var otxtVwAssetNumberFPURES = new sap.ui.commons.TextField({ enabled: false, 
			 layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"})
		}).bindProperty("value", "/headerDtl/0/AssetNumber").addStyleClass("FormInputStyle marginTop7");
		
		
		//FIFTH ROW
		var olblCompanyCodeFPURES = new sap.ui.commons.Label({text: "Company Code",
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
			wrapping: false}).addStyleClass("marginTop10");
		
		var otxtVwCompanyCodeFPURES = new sap.ui.commons.TextField({ enabled: false, 
			 layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"})
		}).bindProperty("value", "/headerDtl/0/CompanyCode").addStyleClass("FormInputStyle marginTop7");
		
		
		var olblEquipmentNoFPURES = new sap.ui.commons.Label({text: "Equipment Number",
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
			wrapping: false}).addStyleClass("marginTop10");
		
		var otxtVwEquipmentNoFPURES = new sap.ui.commons.TextField({ enabled: false, 
			 layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"})
		}).bindProperty("value", "/headerDtl/0/EquipmentNumber").addStyleClass("FormInputStyle marginTop7");

		
		var olblFuncLocFPURES = new sap.ui.commons.Label({text: "Functional Location",
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
			wrapping: false}).addStyleClass("marginTop10");
		
		var otxtVwFuncLocFPURES = new sap.ui.commons.TextField({ enabled: false, 
			 layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"})
		}).bindProperty("value", "/headerDtl/0/FunctionalLocation").addStyleClass("FormInputStyle marginTop7");
		
		//SIXTH ROW
		var olblMaterialTypeFPURES = new sap.ui.commons.Label({text: "Material Type",
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
			wrapping: false}).addStyleClass("marginTop10");
		
		var otxtVwMaterialTypeFPURES = new sap.ui.commons.TextField({ enabled: false, 
			 layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"})
		}).bindProperty("value", "/headerDtl/0/MaterialType").addStyleClass("FormInputStyle marginTop7");
		
		
		var olblPlannerGroupFPURES = new sap.ui.commons.Label({text: "Planner Group",
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
			wrapping: false}).addStyleClass("marginTop10");
		
		var otxtVwPlannerGroupFPURES = new sap.ui.commons.TextField({ enabled: false, 
			 layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"})
		}).bindProperty("value", "/headerDtl/0/PlannerGroup").addStyleClass("FormInputStyle marginTop7");

		
		var olblRepairDecMsgNameFPURES = new sap.ui.commons.Label({text: "Repair Decision Msg Name",
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
			wrapping: false}).addStyleClass("marginTop10");
		
		var oComboRepairDecMsgNameFPURES = new sap.ui.commons.DropdownBox({ 
			  layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"}),
			  placeholder: "Select Repair Message"
		}).addStyleClass("FormInputStyle marginTop7");
		oComboRepairDecMsgNameFPURES.addItem(new sap.ui.core.ListItem({text: '', key:''}));
		oComboRepairDecMsgNameFPURES.addItem(new sap.ui.core.ListItem({text: 'RepairDecision', key:'RepairDecision'}));
		oComboRepairDecMsgNameFPURES.addItem(new sap.ui.core.ListItem({text: 'Position_RD', key:'Position_RD'}));
		oComboRepairDecMsgNameFPURES.addItem(new sap.ui.core.ListItem({text: 'Zeroline_RD', key:'Zeroline_RD'}));
		
		oComboRepairDecMsgNameFPURES.bindProperty("selectedKey", "/headerDtl/0/RepairDecisionMsgName");
		
		//var otxtVwRepairDecMsgNameFPURES = new sap.ui.commons.TextField({ enabled: true, 
		//	 layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"})
		//}).bindProperty("value", "/headerDtl/0/RepairDecisionMsgName").addStyleClass("FormInputStyle marginTop7");
		
		var olblWrkCntrFPURES = new sap.ui.commons.Label({text: "Work Center",
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12",linebreak: false, margin: true}),
			wrapping: false}).addStyleClass("marginTop10");
		
		var otxtVwWrkCntrFPURES = new sap.ui.commons.TextField({ enabled: false, 
			 layoutData: new sap.ui.layout.GridData({span: "L2 M8 S12"})
		}).bindProperty("value", "/headerDtl/0/WorkCtr").addStyleClass("FormInputStyle marginTop7");

		
		var oLnkBackFPUREShow = new sap.ui.commons.Link({
			text: " < Back",
			width:"50px",wrapping:true,
            press : function() {
				if(sap.ui.getCore().byId("idTblLineItemFPURES")){
					var oExstngTable = sap.ui.getCore().byId("idTblLineItemFPURES");
					oExstngTable._oHSb.setScrollPosition(0);
			}
            	sap.ui.controller("view.FPURepairEstimateDisplayVw").navButtonPress();
			}});

		//Form
		 var oFrmFPUREShow = new sap.ui.layout.form.Form({
				 layout: oResGLayFPRES,
				 formContainers: [
						 new sap.ui.layout.form.FormContainer({
								//title: "Repair Estimate Entry",
							 formElements: [
												new sap.ui.layout.form.FormElement({
													fields: [ oLnkBackFPUREShow]
												}),
												new sap.ui.layout.form.FormElement({
													fields: [ objcurntFPUREShow.createTableResponseErrData().addStyleClass("marginTop7")]
												}),
												new sap.ui.layout.form.FormElement({//.addStyleClass("marginTopBot30")
													fields: [new sap.ui.commons.HorizontalDivider("idHzntlDvdrFrstFPURES",{width: "100%", type: "Area", height: "Medium"}).addStyleClass("marginTop20")]
												}),
												new sap.ui.layout.form.FormElement({
													fields: [new sap.ui.commons.Label({text: "",
														layoutData: new sap.ui.layout.GridData({span: "L12 M12 S12"}),
														wrapping: true})]
												}),
												new sap.ui.layout.form.FormElement({
													fields: [new sap.ui.commons.Label("idLblRepHdrFPU",{text: "Repair Header",
														layoutData: new sap.ui.layout.GridData({span: "L12 M12 S12"}),
														wrapping: true}).addStyleClass("fontTitle")]
												}),
												new sap.ui.layout.form.FormElement({
													fields: [olblEstmtTypeFPURES,otxtVwEstmtTypeFPURES, olblSerialNoFPURES, otxtVwSerialNoFPURES,olblSendAddressFPURES, otxtVwSendAddressFPURES]
												}),
												new sap.ui.layout.form.FormElement({
													fields: [olblEstmtNoFPURES,otxtVwEstmtNoFPURES, olblCurrencyCodeFPURES, otxtVwCurrencyCodeFPURES,olblMoveInDateFPURES, otxtVwMoveInDateFPURES]
												}),
												new sap.ui.layout.form.FormElement({
													fields: [olblSaleGradeFPURES,otxtVwSaleGradeFPURES,olblUnitPartCodeFPURES,otxtVwUnitPartCodeFPURES,olblWorkCreatedDateFPURES,otxtVwWorkCreatedDateFPURES]
												}),
												new sap.ui.layout.form.FormElement({
													fields: [olblCntnrStrCompleteFPURES,oChkBxCntnrStrCompleteFPURES,olblMultiPartCntnrFPURES,oChkBxMultiPartCntnrFPURES,olblAssetNumberFPURES,otxtVwAssetNumberFPURES]
												}),
												new sap.ui.layout.form.FormElement({
													fields: [olblCompanyCodeFPURES,otxtVwCompanyCodeFPURES,olblEquipmentNoFPURES,otxtVwEquipmentNoFPURES,olblFuncLocFPURES,otxtVwFuncLocFPURES]
												}),
												
												new sap.ui.layout.form.FormElement({
													fields: [olblMaterialTypeFPURES,otxtVwMaterialTypeFPURES,olblPlannerGroupFPURES,otxtVwPlannerGroupFPURES,olblRepairDecMsgNameFPURES,oComboRepairDecMsgNameFPURES]
												}),
												new sap.ui.layout.form.FormElement({
													fields: [olblWrkCntrFPURES,otxtVwWrkCntrFPURES]
												}),
												new sap.ui.layout.form.FormElement({
													fields: [new sap.ui.commons.HorizontalDivider({width: "100%", type: "Area", height: "Medium"}).addStyleClass("marginTop7")]
												}),
												
												new sap.ui.layout.form.FormElement({
													fields: [ objcurntFPUREShow.createLineItemTable()]
												})
										 ]
						 })
				 ]
		 });
		 
		 return oFrmFPUREShow;
	},
	
	createTableResponseErrData: function(){
		var oTblResErrDataFPUREShow = new sap.ui.table.Table(
			'idTblResErrDataFPUREShow',
			{
				selectionMode : sap.ui.table.SelectionMode.None,
				navigationMode : sap.ui.table.NavigationMode.None,
				layoutData: new sap.ui.layout.GridData({span: "L7 M12 S12",linebreak: false, margin: false}),
			}).addStyleClass('tblBorder');
			
		oTblResErrDataFPUREShow.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({text : "Type"}),
			template : new sap.ui.commons.TextView().bindProperty("text", "Type"),
			hAlign : "Left",
			width : "90px",
			resizable:false
		}));
		
		oTblResErrDataFPUREShow.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({text : "Message"}),
			template : new sap.ui.commons.TextView().bindProperty("text", "Message"),
			hAlign : "Left",
			//width : "90px",
			resizable:false
		}));
		oTblResErrDataFPUREShow.bindAggregation("rows","/errorDtl");
				
		return oTblResErrDataFPUREShow;
	},
	
	createLineItemTable: function(){
		var olblhdrTblFPURES =  new sap.ui.commons.Label({text: "Repair Lines",
			layoutData: new sap.ui.layout.GridData({span: "L12 M12 S12"}),
            wrapping: true}).addStyleClass("marginTop7 fontTitle");
		
		var oTblLineItemFPURES = new sap.ui.table.Table(
				'idTblLineItemFPURES',
				{
					visibleRowCount: 5,
					columnHeaderHeight : 50,
					enableColumnReordering: false,
					selectionMode : sap.ui.table.SelectionMode.None,
					navigationMode : sap.ui.table.NavigationMode.None,
					//layoutData: new sap.ui.layout.GridData({span: "L12 M12 S12",linebreak: false, margin: false}),
				}).addStyleClass('tblBorder marginTop7');
		
		oTblLineItemFPURES.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Line Item",
			}),
			template : new sap.ui.commons.TextView()
					.bindProperty("text", "LineItem"),
			resizable:false,
			width : "60px"
		}));
		
		oTblLineItemFPURES.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Component Code",
			}),
			template : new sap.ui.commons.TextView()
					.bindProperty("text", "ComponentCode"),
			resizable:false,
			width : "110px"
		}));
		
		oTblLineItemFPURES.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Location Code",
			}),
			template : new sap.ui.commons.TextView()
					.bindProperty("text", "LocationCode"),
			resizable:false,
			width : "90px"
		}));
		
		oTblLineItemFPURES.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Material Code",
			}),
			template : new sap.ui.commons.TextView()
					.bindProperty("text", "MaterialCode"),
			resizable:false,
			width : "90px"
		}));
		
		oTblLineItemFPURES.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Damage Code",
			}),
			template : new sap.ui.commons.TextView()
					.bindProperty("text", "DamageCode"),
			resizable:false,
			width : "90px"
		}));
		
		oTblLineItemFPURES.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Repair Code",
			}),
			template : new sap.ui.commons.TextView()
					.bindProperty("text", "RepairCode"),
			resizable:false,
			width : "90px"
		}));
		
		oTblLineItemFPURES.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Man Hours"
			}),
			template : new sap.ui.commons.TextView()
					.bindProperty("text", "ManHours"),
			resizable:false,
			width : "90px"
		}));
		
		oTblLineItemFPURES.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Material Cost"
			}),
			template : new sap.ui.commons.TextView()
					.bindProperty("text", "MaterialCost"),
			resizable:false,
			width : "90px"
		}));
		
		oTblLineItemFPURES.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Bullet In Number",
			}),
			template : new sap.ui.commons.TextView()
					.bindProperty("text", "TechBulletin"),
			resizable:false,
			width : "90px"
		}));
		
		oTblLineItemFPURES.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Repair Length"
			}),
			template : new sap.ui.commons.TextView()
					.bindProperty("text", "RepairLength"),
			resizable:false,
			width : "90px"
		}));
		
		oTblLineItemFPURES.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Repair Width"
			}),
			template : new sap.ui.commons.TextView()
					.bindProperty("text", "RepairWidth"),
			resizable:false,
			width : "90px"
		}));
		
		oTblLineItemFPURES.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Quantity"
			}),
			template : new sap.ui.commons.TextView()
					.bindProperty("text", "Quantity"),
			resizable:false,
			width : "90px"
		}));
		
		oTblLineItemFPURES.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Responsibility",
			}),
			template : new sap.ui.commons.TextView()
				.bindProperty("text", "Responsibility"), 
			resizable:false,
			width : "160px"
		}));
		
		oTblLineItemFPURES.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Labour Rate"
			}),
			template : new sap.ui.commons.TextView()
					.bindProperty("text", "LabourRate"),
			resizable:false,
			width : "90px"
		}));
		
		oTblLineItemFPURES.bindAggregation("rows","/lineItemsDtl");

		var oFlxTblFPURES = new sap.m.FlexBox({
	  	      items: [olblhdrTblFPURES, oTblLineItemFPURES],
	  	      direction: "Column",
				  layoutData: new sap.ui.layout.GridData({span: "L12 M12 S12",linebreak: false, margin: false}),
	  	    });
		
		return oFlxTblFPURES;
	}
});
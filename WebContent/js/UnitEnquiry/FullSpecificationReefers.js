var aEquipCatReefers = [
                                          {desc: "External Width", value: ""},
                                          {desc: "External Height", value: ""},
                                          {desc: "External Length", value: ""},
                                          {desc: "Internal Width", value: ""},
                                          {desc: "Internal Height", value: ""},
                                          {desc: "Internal Length", value: ""},
                                          {desc: "Door Opening Width", value: ""},
                                          {desc: "Door Opening Height", value: ""},
                                          {desc: "Cubic Capacity", value: ""},
                                          {desc: "Machinery Manufacturer", value: ""},
                                          {desc: "Machinery Model", value: ""},
                                          {desc: "Insulation Blowing Agent", value: ""},
                                          {desc: "Maximum Gross Weight", value: ""},
                                          {desc: "Tare Weight", value: ""},
                                          {desc: "Tare Weight Including Machinery", value: ""},
                                          {desc: "Payload", value: ""},
                                          {desc: "Stacking Height", value: ""},
                                          {desc: "Stacking Test Load per Post", value: ""},
                                          {desc: "Racking Weight", value: ""}
                                          ];

       var aEquipCatReefersConst = [
                                          {desc: "Top & Bottom Rail Material", value: ""}, 
                                          {desc: "End Frames Material", value: ""},
                                          {desc: "Outer Panels", value: ""},
                                          {desc: "Underfloor", value: ""},
                                          {desc: "Inner Side Lining", value: ""},
                                          {desc: "Tee Floor Height", value: ""},
                                          {desc: "Door Outer Material", value: ""},
                                          {desc: "Lock Rods", value: ""},
                                          {desc: "Goose Neck Tunnel Length", value: ""},
                                          {desc: "Goose Neck Tunnel Width", value: ""},
                                          {desc: "Goose Neck Tunnel Height", value: ""},
                                          {desc: "Fork Lift Pockets", value: ""},
                                          {desc: "Side Insulation", value: ""},
                                          {desc: "Floor Insulation", value: ""},
                                          {desc: "Roof Insulation", value: ""},
                                          {desc: "Door Insulation", value: ""},
                                          {desc: "Air Leakage", value: ""},
                                          {desc: "Heat Leakage", value: ""},
                                          {desc: "Door Sill", value: ""},
                                          {desc: "Floor Rail", value: ""},
                                          {desc: "Floor Stringer", value: ""},
                                          {desc: "Scuff Liner", value: ""},
                                          {desc: "Door Holder", value: ""},
                                          {desc: "Door Gasket Outer", value: ""},
                                          {desc: "Side Post & Stringers", value: ""},
                                          {desc: "Roof Bow & Stringers", value: ""},
                                          {desc: "Roof Lining", value: ""},
                                          {desc: "Paint Corten Steel Parts", value: ""},
                                          {desc: "Paint MGSS Parts", value: ""},
                                          {desc: "Paint Under Structure", value: ""},
                                          {desc: "Top Coat Colour", value: ""},
                                          {desc: "Top & Bottom Lifting Test", value: ""},
                                          {desc: "Remote Monitoring Unit", value: ""},
                                          ];

sap.ui.model.json.JSONModel.extend("eqiupCatReefersView", {
	
	createEqiupCatReefers:function(){
		var oFlexboxEqiupCatReefers = new sap.m.FlexBox("idEqiupCatReefersFlxBox",{
            items: [],
            direction: "Row"
		  });
		
		return oFlexboxEqiupCatReefers;
	},

       createEqiupCatReefersFormView: function(){
    	   sap.ui.getCore().byId("idEqiupCatReefersFlxBox").destroyItems();
    	   var backFullSpecReefers = new sap.m.Link("idBackFullSpecReefers", {text: " < Back",
          	  width:"13%",
          	  wrapping:true,
          	  press: function(){
          		  var bus = sap.ui.getCore().getEventBus();
          			bus.publish("nav", "back");
         	  }});
              var oLabelConstrReef = new sap.ui.commons.Label({text: "Construction : ",
            wrapping: true}).addStyleClass("margin5 marginLeft marginTopNP");

              // Table - Reefers
              var oEqiupCatReefersTable = new sap.ui.table.Table("idReefersTbl",{
                     visibleRowCount: 19,
               firstVisibleRow: 3,
               columnHeaderHeight: 30,
               columnHeaderVisible : false,
               selectionMode: sap.ui.table.SelectionMode.None,
               width: "60%",
               height:"100%"
        }).addStyleClass("font15 tblBorder marginTop10");
              
              // Table Columns
              oEqiupCatReefersTable.addColumn(new sap.ui.table.Column({
         template: new sap.ui.commons.TextView().bindProperty("text", "desc"),
         width:"150px",
         sortProperty: "desc",
         filterProperty: "desc",
               }));
               
              oEqiupCatReefersTable.addColumn(new sap.ui.table.Column({
                      template: new sap.ui.commons.TextView().bindProperty("text", "value"),
                      width:"335px",
                sortProperty: "value",
                filterProperty: "value",
                      }));
       
       // Table - Reefers CONSTRUCTION
              var oEqiupCatReefersConstTable = new sap.ui.table.Table("idReefersConstTbl",{
                     visibleRowCount: 33,
               firstVisibleRow: 3,
               columnHeaderHeight: 30,
               columnHeaderVisible : false,
               selectionMode: sap.ui.table.SelectionMode.None,
               width: "60%",
               height:"100%"
        }).addStyleClass("font15 tblBorder");
              
              // Table Columns
              oEqiupCatReefersConstTable.addColumn(new sap.ui.table.Column({
         template: new sap.ui.commons.TextView().bindProperty("text", "desc"),
         width:"150px",
         sortProperty: "desc",
         filterProperty: "desc",
               }));
               
              oEqiupCatReefersConstTable.addColumn(new sap.ui.table.Column({
                      template: new sap.ui.commons.TextView().bindProperty("text", "value"),
                      width:"335px",
                      sortProperty: "value",
                filterProperty: "value",
                      }));
              var oFlexBoxBackBtn = new sap.m.FlexBox({
		  		  items: [
		  		          backFullSpecReefers
		     		  ],
		     		  direction: "Column",
		     		});
              var oLabelFullSpecTitle = new sap.ui.commons.Label({text: FullSpecTitle,
                  wrapping: true}).addStyleClass("font15Bold");
              
              var oBtnFullSpecReefersExport = new sap.m.Button({
                  text : "Export To PDF",
                  styled : false, // MACHANACHANGES_12062019+
               //icon: sap.ui.core.IconPool.getIconURI("pdf-attachment"), // MACHANACHANGES_12062019-
                  press:function(){
                        //alert("Export to PDF");
      	                  var colWidthArr = [2.0, 3.7];
      		        	  //arrColmnName =['Serial No.','Unit No.','Last Clean Date','Hours','Cargo Desc.','Clean Process Desc.','Status']; //COLUMN NAME
      		              var verticalOffset = 1.25; 
      		            var Title1 = "Construction";
      		        generatePDFFullSpecReefers(aEquipCatReefers,aEquipCatReefersConst,FullSpecTitle,Title1,colWidthArr,verticalOffset);
                  }
               }).addStyleClass("submitBtnEnd");
              
              var oFlexFullSpecHeaderBtn = new sap.m.FlexBox({
		  		  items: [
		  		          oBtnFullSpecReefersExport
		     		  ],
		     		  direction: "RowReverse",
		     		  width:"20%"
		     		});
              
              var oFlexFullSpecTitle = new sap.m.FlexBox({
		  		  items: [
		  		          oLabelFullSpecTitle
		     		  ],
		     		  direction: "Row",
		     		  width:"40%"
		     		});
              
              var oFlexFullSpecHeader = new sap.m.FlexBox({
		  		  items: [
		  		          oFlexFullSpecTitle,oFlexFullSpecHeaderBtn
		     		  ],
		     		  direction: "Row",
		     		});
              
              var oFlexFullSpecData = new sap.m.FlexBox({
		  		  items: [
		  		          oFlexFullSpecHeader,oEqiupCatReefersTable
		     		  ],
		     		  direction: "Column",
		     		});
              
              var disclText = 'Although every effort is being made to maintain accurate and correct information, some technical specifications are dynamic in nature.'
          		+ 'Therefore, this information is provided "as is" without warranty of any kind.';
          	
            var oLblDisclaimer = new sap.ui.commons.Label({text: disclText,
          	  width:"60%",
                wrapping: true}).addStyleClass("font11Light marginTop10");
            
       // Responsive Grid Layout
              var oEquipcatReefersLayout = new sap.ui.layout.form.ResponsiveGridLayout("idEquipcatReefersLayout");
       
       // Online Form Starts
              var oEquipcatReefersForm = new sap.ui.layout.form.Form("idEquipcatReefersForm",{
                                     layout: oEquipcatReefersLayout,
                                     formContainers: [
                                             
                                             new sap.ui.layout.form.FormContainer("idEquipcatReefersFormC1",{
                                                    // title: FullSpecTitle,
                                                     formElements: [
                                                                                                new sap.ui.layout.form.FormElement({
                                                                                                    fields: [oFlexFullSpecData]
                                                                                                }),
                                                                                                new sap.ui.layout.form.FormElement({
                                                                                                    fields: [oLabelConstrReef]
                                                                                                }),
                                                                                                new sap.ui.layout.form.FormElement({
                                                                                                    fields: [oEqiupCatReefersConstTable]
                                                                                                }),
                                                                                                new sap.ui.layout.form.FormElement({
                                                                                                    fields: [oLblDisclaimer]
                                                                                                })
                                                             ]
                                             })                                
                                     ]
                             });
              
              var oFlexBoxFull = new sap.m.FlexBox({
		  		  items: [
		  		          oFlexBoxBackBtn,
		  		        oEquipcatReefersForm
		     		  ],
		     		  direction: "Column",
		     		});
              
              sap.ui.getCore().byId("idEqiupCatReefersFlxBox").addItem(oFlexBoxFull);
                                 //  return oFlexBoxFull;
       },
       
       bindReefersDetails: function(){
               aEquipCatReefers = [
                                          {desc: "External Width", value: ""},
                                          {desc: "External Height", value: ""},
                                          {desc: "External Length", value: ""},
                                          {desc: "Internal Width", value: ""},
                                          {desc: "Internal Height", value: ""},
                                          {desc: "Internal Length", value: ""},
                                          {desc: "Door Opening Width", value: ""},
                                          {desc: "Door Opening Height", value: ""},
                                          {desc: "Cubic Capacity", value: ""},
                                          {desc: "Machinery Manufacturer", value: ""},
                                          {desc: "Machinery Model", value: ""},
                                          {desc: "Insulation Blowing Agent", value: ""},
                                          {desc: "Maximum Gross Weight", value: ""},
                                          {desc: "Tare Weight", value: ""},
                                          {desc: "Tare Weight Including Machinery", value: ""},
                                          {desc: "Payload", value: ""},
                                          {desc: "Stacking Height", value: ""},
                                          {desc: "Stacking Test Load per Post", value: ""},
                                          {desc: "Racking Weight", value: ""}
                                          ];

        aEquipCatReefersConst = [
                                          {desc: "Top & Bottom Rail Material", value: ""}, 
                                          {desc: "End Frames Material", value: ""},
                                          {desc: "Outer Panels", value: ""},
                                          {desc: "Underfloor", value: ""},
                                          {desc: "Inner Side Lining", value: ""},
                                          {desc: "Tee Floor Height", value: ""},
                                          {desc: "Door Outer Material", value: ""},
                                          {desc: "Lock Rods", value: ""},
                                          {desc: "Goose Neck Tunnel Length", value: ""},
                                          {desc: "Goose Neck Tunnel Width", value: ""},
                                          {desc: "Goose Neck Tunnel Height", value: ""},
                                          {desc: "Fork Lift Pockets", value: ""},
                                          {desc: "Side Insulation", value: ""},
                                          {desc: "Floor Insulation", value: ""},
                                          {desc: "Roof Insulation", value: ""},
                                          {desc: "Door Insulation", value: ""},
                                          {desc: "Air Leakage", value: ""},
                                          {desc: "Heat Leakage", value: ""},
                                          {desc: "Door Sill", value: ""},
                                          {desc: "Floor Rail", value: ""},
                                          {desc: "Floor Stringer", value: ""},
                                          {desc: "Scuff Liner", value: ""},
                                          {desc: "Door Holder", value: ""},
                                          {desc: "Door Gasket Outer", value: ""},
                                          {desc: "Side Post & Stringers", value: ""},
                                          {desc: "Roof Bow & Stringers", value: ""},
                                          {desc: "Roof Lining", value: ""},
                                          {desc: "Paint Corten Steel Parts", value: ""},
                                          {desc: "Paint MGSS Parts", value: ""},
                                          {desc: "Paint Under Structure", value: ""},
                                          {desc: "Top Coat Colour", value: ""},
                                          {desc: "Top & Bottom Lifting Test", value: ""},
                                          {desc: "Remote Monitoring Unit", value: ""},
                                          ];
               
               // REEFERS
               aEquipCatReefers[0].value = aFullSpecificationReefers[0].ExternalWidth;
               aEquipCatReefers[1].value = aFullSpecificationReefers[0].ExternalHeight;
               aEquipCatReefers[2].value = aFullSpecificationReefers[0].ExternalLength;
               aEquipCatReefers[3].value = aFullSpecificationReefers[0].InternalWidth;
               aEquipCatReefers[4].value = aFullSpecificationReefers[0].InternalHeight;
               aEquipCatReefers[5].value = aFullSpecificationReefers[0].InternalLength;
               aEquipCatReefers[6].value = aFullSpecificationReefers[0].DoorOpeningWidth;
               aEquipCatReefers[7].value = aFullSpecificationReefers[0].DoorOpeningHeight;
               aEquipCatReefers[8].value = aFullSpecificationReefers[0].CubicCapacity;
               aEquipCatReefers[9].value = aFullSpecificationReefers[0].MachineryManufacturer;
               aEquipCatReefers[10].value = aFullSpecificationReefers[0].MachineryModel;
               aEquipCatReefers[11].value = aFullSpecificationReefers[0].InsulationBlowingAgrent;
               aEquipCatReefers[12].value = aFullSpecificationReefers[0].MaximumGrossWeight;
               aEquipCatReefers[13].value = aFullSpecificationReefers[0].TareWeight;
               // no value for Tare Weight Including Machinery
               //aEquipCatReefers[14].value = aFullSpecificationReefers[0].Csc;
               
               aEquipCatReefers[15].value = aFullSpecificationReefers[0].Payload;
               // no value for Stacking Height
              // aEquipCatReefers[16].value = aFullSpecificationReefers[0].Manufacturer;
               
               aEquipCatReefers[17].value = aFullSpecificationReefers[0].StackingTetsLoadPerPost;
               aEquipCatReefers[18].value = aFullSpecificationReefers[0].RackingWeight;

        
               //Create a model and bind the table rows to this model
                      var oModelEquipCatReefers = new sap.ui.model.json.JSONModel();
                      oModelEquipCatReefers.setData({modelData: aEquipCatReefers});
                      
                      // NP - Change here
                      sap.ui.getCore().byId("idReefersTbl").setModel(oModelEquipCatReefers);
                      sap.ui.getCore().byId("idReefersTbl").bindRows("/modelData");
                      
                      // REEFERS - CONSTRUCTION
                      // no value for Top & Bottom Rail Material
                     // aEquipCatReefersConst[0].value = aFullSpecificationReefers[0].Manufacturer;
                      
                      aEquipCatReefersConst[1].value = aFullSpecificationReefers[0].EndFramesMaterial;
                      aEquipCatReefersConst[2].value = aFullSpecificationReefers[0].OuterPanels;
                      aEquipCatReefersConst[3].value = aFullSpecificationReefers[0].Underfloor;
                      aEquipCatReefersConst[4].value = aFullSpecificationReefers[0].InnerSideLining;
                      aEquipCatReefersConst[5].value = aFullSpecificationReefers[0].TeeFloorHeight;
                      aEquipCatReefersConst[6].value = aFullSpecificationReefers[0].DoorOuterMaterial;
                      aEquipCatReefersConst[7].value = aFullSpecificationReefers[0].LockRods;
                      aEquipCatReefersConst[8].value = aFullSpecificationReefers[0].GooseNeckTunnelLength;
                      // no value for Goose Neck Tunnel Width
                     // aEquipCatReefersConst[9].value = aFullSpecificationReefers[0].IsoCode;
                      // no value for Goose Neck Tunnel Height
                     // aEquipCatReefersConst[10].value = aFullSpecificationReefers[0].Csc;
                      
                      aEquipCatReefersConst[11].value = aFullSpecificationReefers[0].ForkLiftPockets;
                      aEquipCatReefersConst[12].value = aFullSpecificationReefers[0].SideInsulation;
                      aEquipCatReefersConst[13].value = aFullSpecificationReefers[0].FloorInsulation;
                      aEquipCatReefersConst[14].value = aFullSpecificationReefers[0].RoofInsulation;
                      // no value for Door Insulation                 
                    //  aEquipCatReefersConst[15].value = aFullSpecificationReefers[0].AirLeakage;
                      
                      aEquipCatReefersConst[16].value = aFullSpecificationReefers[0].AirLeakage;
                      aEquipCatReefersConst[17].value = aFullSpecificationReefers[0].HeatLeakage;
                      aEquipCatReefersConst[18].value = aFullSpecificationReefers[0].DoorSill;
                      aEquipCatReefersConst[19].value = aFullSpecificationReefers[0].FloorRail;
                      aEquipCatReefersConst[20].value = aFullSpecificationReefers[0].FloorStringer;
                      aEquipCatReefersConst[21].value = aFullSpecificationReefers[0].ScuffLiner;
                      // no value for Door Holder
                    //  aEquipCatReefersConst[22].value = aFullSpecificationReefers[0].Csc;
                      // no value for Door Gasket Outer
                     // aEquipCatReefersConst[23].value = aFullSpecificationReefers[0].Tir;
                     // no value for Side Post & Stringers
                     // aEquipCatReefersConst[24].value = aFullSpecificationReefers[0].Manufacturer;
                      //no value for Roof Bow & Stringers
                     // aEquipCatReefersConst[25].value = aFullSpecificationReefers[0].IsoCode;
                      
                      aEquipCatReefersConst[26].value = aFullSpecificationReefers[0].RoofLining;
                      // no value for Paint Corten Steel Parts
                     // aEquipCatReefersConst[27].value = aFullSpecificationReefers[0].Tir;
                      // no value for Paint MGSS Parts
                     // aEquipCatReefersConst[28].value = aFullSpecificationReefers[0].Manufacturer;
                      // no value for Paint Under Structure
                     // aEquipCatReefersConst[29].value = aFullSpecificationReefers[0].IsoCode;
                      
                      aEquipCatReefersConst[30].value = aFullSpecificationReefers[0].TopCoatColour;
                      // no value for Top & Bottom Lifting Test
                     // aEquipCatReefersConst[31].value = aFullSpecificationReefers[0].Tir;
                      
                      aEquipCatReefersConst[32].value = aFullSpecificationReefers[0].RemoteMonitoringUnit;

               
                      //Create a model and bind the table rows to this model
                             var oModelEquipCatReefersConst = new sap.ui.model.json.JSONModel();
                             oModelEquipCatReefersConst.setData({modelData: aEquipCatReefersConst});
                             
                             // NP - Change here
                             sap.ui.getCore().byId("idReefersConstTbl").setModel(oModelEquipCatReefersConst);
                             sap.ui.getCore().byId("idReefersConstTbl").bindRows("/modelData");
 }
});


 var aEquipCatTanks = [
                                          {desc: "Cubic Capacity", value: ""},
                                          {desc: "Tare Weight", value: ""},
                                          {desc: "Maximum Gross Weight", value: ""}
                                          ];

                var aEquipCatTanksConst = [
                                          {desc: "Working Pressure", value: ""},
                                          {desc: "Test Pressure", value: ""},
                                          {desc: "Steam Working Pressure", value: ""},
                                          {desc: "Steam Test Pressure", value: ""},
                                          {desc: "Relief Valve", value: ""},
                                          {desc: "Ambient Temp Range (High)", value: ""},
                                          {desc: "Ambient Temp Range (Low)", value: ""},
                                          {desc: "Maximum Cargo Temp", value: ""},
                                          {desc: "Shell Material", value: ""},
                                          {desc: "Shell Mild Steel Equiv Thickness", value: ""},
                                          {desc: "Shell Mild Steel Equiv Thickness", value: ""},
                                          {desc: "Shell Thickness - Barrel", value: ""},
                                          {desc: "Shell Thickness - Ends", value: ""},
                                          {desc: "Tank Type", value: ""}
                                          ];

                var aEquipCatTanksStdFit = [
                                          {desc: "Manlid", value: ""},
                                          {desc: "Calibration", value: ""},
                                          {desc: "Cladding", value: ""},
                                          {desc: "Handrail", value: ""},
                                          {desc: "Insulation Material", value: ""},
                                          {desc: "Insulation Material Thickness (side)", value: ""},
                                          {desc: "Lining Material", value: ""},
                                          {desc: "Valve, Airline - Primary Outlet Diameter", value: ""},
                                          {desc: "Valve, Airline - Primary Outlet (Thread & Flange Type)", value: ""},
                                          {desc: "Valve, Airline - Primary Outlet Type", value: ""},
                                          {desc: "Safety Relief Valve - Secondary Outlet Diameter", value: ""},
                                          {desc: "Safety Relief Valve - Secondary Outlet (Thread & Flange)", value: ""},
                                          {desc: "Safety Relief Valve - Secondary Outlet Type", value: ""},
                                          {desc: "Valve, Bottom - Outlet Diameter", value: ""},
                                          {desc: "Valve, Bottom - Outlet (Thread & Flange Type)", value: ""},
                                          {desc: "Valve, Bottom - Outlet Type", value: ""},
                                          {desc: "Valve, Top - Outlet Type", value: ""},
                                          {desc: "Valve, Top - Outlet Diameter", value: ""},
                                          {desc: "Valve, Top - Outlet Location", value: ""},
                                          {desc: "Valve, Top - Outlet (Thread & Flange Type)", value: ""},
                                          {desc: "Valve, Vapour Return Type", value: ""},
                                          {desc: "Valve, Vapour Return - Diameter", value: ""},
                                          {desc: "Valve, Vapour Return (Thread & Flange Type)", value: ""},
                                          {desc: "Walkway Type", value: ""},
                                          {desc: "Insulation", value: ""},
                                          {desc: "Steam Heating", value: ""},
                                          {desc: "Steam Tube - Effective Area", value: ""},
                                          {desc: "Steam Tube - Ducts", value: ""},
                                          {desc: "Steam Tube - Inlet / Outlet", value: ""},
                                          {desc: "Steam Working Pressure", value: ""},
                                          {desc: "Relief Valve - Diameter", value: ""},
                                          {desc: "Relief Valve - Outlet", value: ""},
                                          {desc: "Relief Valve - Set @", value: ""},
                                          {desc: "Relief Valve - Type", value: ""},
                                          {desc: "Manlid / Load Hatch Fastening Type", value: ""},
                                          {desc: "Relief Valve", value: ""},
                                          {desc: "Weld Finish Internal", value: ""},
                                          {desc: "Weld Material Grade", value: ""},
                                          //{desc: "Relief Valve", value: ""},
                                          //{desc: "Valve Airline - Primary Outlet", value: ""},
                                          {desc: "Vapour Return", value: ""},
                                          {desc: "Remote Closure", value: ""},
                                          {desc: "Gaskets & Seals", value: ""},
                                          {desc: "Temperature Gauge", value: ""},
                       ];

sap.ui.model.json.JSONModel.extend("eqiupCatTanksView", {

	createEqiupCatTanks:function(){
		var oFlexboxEqiupCatTanks = new sap.m.FlexBox("idEqiupCatTanksFlxBox",{
            items: [],
            direction: "Row"
		  });
		
		return oFlexboxEqiupCatTanks;
	},
	
       createEqiupCatTanksFormView: function(){
    	   
    	   sap.ui.getCore().byId("idEqiupCatTanksFlxBox").destroyItems();
    	   var backFullSpecTanks = new sap.m.Link("idBackFullSpecTanks", {text: " < Back",
          	  width:"13%",
          	  wrapping:true,
          	  press: function(){
          		  var bus = sap.ui.getCore().getEventBus();
          			bus.publish("nav", "back");
         	  }});
    	   var oLabelfull = new sap.ui.commons.Label({text: "Dimension : ",
               wrapping: true}).addStyleClass("margin5 marginLeft marginTopNP");
    	   
           var oLabelConstr = new sap.ui.commons.Label({text: "Construction : ",
            wrapping: true}).addStyleClass("margin5 marginLeft marginTopNP");
              
              var oLabelStdFit = new sap.ui.commons.Label({text: "Standard Fittings : ",
            wrapping: true}).addStyleClass("margin5 marginLeft marginTopNP");

              // Table - TANKS
              var oEqiupCatTanksTable = new sap.ui.table.Table("idTanksTbl",{
                     visibleRowCount: 3,
               firstVisibleRow: 3,
               columnHeaderHeight: 30,
               columnHeaderVisible : false,
               selectionMode: sap.ui.table.SelectionMode.None,
               width: "67%",
               height:"100%"
        }).addStyleClass("font15 tblBorder");
              
              // Table Columns
              oEqiupCatTanksTable.addColumn(new sap.ui.table.Column({
         template: new sap.ui.commons.TextView().bindProperty("text", "desc"),
         width:"150px",
         sortProperty: "desc",
         filterProperty: "desc",
               }));
               
              oEqiupCatTanksTable.addColumn(new sap.ui.table.Column({
                      template: new sap.ui.commons.TextView().bindProperty("text", "value"),
                      width:"150px",
                sortProperty: "value",
                filterProperty: "value",
                      }));
                     
      
       
       // Table - TANKS CONSTRUCTION
              var oEqiupCatTanksConstTable = new sap.ui.table.Table("idTanksConstTable",{
               visibleRowCount: 14,
               firstVisibleRow: 3,
               columnHeaderHeight: 30,
               columnHeaderVisible : false,
               selectionMode: sap.ui.table.SelectionMode.None,
               width: "67%",
               height:"100%"
        }).addStyleClass("font15 tblBorder");
              
              // Table Columns
              oEqiupCatTanksConstTable.addColumn(new sap.ui.table.Column({
         template: new sap.ui.commons.TextView().bindProperty("text", "desc"),
         width:"150px",
         sortProperty: "desc",
         filterProperty: "desc",
               }));
               
              oEqiupCatTanksConstTable.addColumn(new sap.ui.table.Column({
                      template: new sap.ui.commons.TextView().bindProperty("text", "value"),
                      width:"150px",
                sortProperty: "value",
                filterProperty: "value",
                      }));
      
       // Table - TANKS STANDARD FITTINGS
              var oEqiupCatTanksFitTable = new sap.ui.table.Table("idStdFittingTbl",{
               visibleRowCount: 42,
               firstVisibleRow: 3,
               columnHeaderHeight: 30,
               columnHeaderVisible : false,
               selectionMode: sap.ui.table.SelectionMode.None,
               width: "67%",
               height:"100%"
        }).addStyleClass("font15 tblBorder");
              
              // Table Columns
              oEqiupCatTanksFitTable.addColumn(new sap.ui.table.Column({
         template: new sap.ui.commons.TextView().bindProperty("text", "desc"),
         width:"150px",
         sortProperty: "desc",
         filterProperty: "desc",
               }));
               
              oEqiupCatTanksFitTable.addColumn(new sap.ui.table.Column({
                      template: new sap.ui.commons.TextView().bindProperty("text", "value"),
                      width:"150px",
                sortProperty: "value",
                filterProperty: "value",
                      }));
              var oFlexBoxBackBtn = new sap.m.FlexBox({
		  		  items: [
		  		          backFullSpecTanks
		     		  ],
		     		  direction: "Column",
		     		});       
              
              var oBtnFullSpecTanksExport = new sap.m.Button({
                  text : "Export To PDF",
                  styled : false, // MACHANACHANGES_12062019+
                  //icon: sap.ui.core.IconPool.getIconURI("pdf-attachment"), // MACHANACHANGES_12062019-
                  press:function(){
                        //alert("Export to PDF");
      	                  var colWidthArr = [3.5, 5];
      		        	  //arrColmnName =['Serial No.','Unit No.','Last Clean Date','Hours','Cargo Desc.','Clean Process Desc.','Status']; //COLUMN NAME
      		              var verticalOffset = 1.25; 
      		              var Title1 = "Dimension";
      		            var Title2 = "Construction";
      		          var Title3 = "Standard Fittings";
      		            generatePDFFullSpecTanks(aEquipCatTanks,aEquipCatTanksConst,aEquipCatTanksStdFit,FullSpecTitle,Title1,Title2,Title3,colWidthArr,verticalOffset);
                  }
               }).addStyleClass("submitBtnEnd");
              
              var oLabelFullSpecTitle = new sap.ui.commons.Label({text: FullSpecTitle,
                  wrapping: true}).addStyleClass("font15Bold");
              
              var oFlexFullSpecHeaderBtn = new sap.m.FlexBox({
		  		  items: [
		  		          oBtnFullSpecTanksExport
		     		  ],
		     		  direction: "RowReverse",
		     		  width:"20%"
		     		});
              
              var oFlexFullSpecTitle = new sap.m.FlexBox({
		  		  items: [
		  		          oLabelFullSpecTitle
		     		  ],
		     		  direction: "Row",
		     		  width:"47%"
		     		});
              
              var oFlexFullSpecHeader = new sap.m.FlexBox({
		  		  items: [
		  		          oFlexFullSpecTitle,oFlexFullSpecHeaderBtn
		     		  ],
		     		  direction: "Row",
		     		});
              
              var oFlexFullSpecData = new sap.m.FlexBox({
		  		  items: [
		  		          oFlexFullSpecHeader,oLabelfull,oEqiupCatTanksTable
		     		  ],
		     		  direction: "Column",
		     		});
              var disclText = 'Although every effort is being made to maintain accurate and correct information, some technical specifications are dynamic in nature.'
            		+ 'Therefore, this information is provided "as is" without warranty of any kind.';
            	
              var oLblDisclaimer = new sap.ui.commons.Label({text: disclText,
              	 width:"67%",
                  wrapping: true}).addStyleClass("font11Light marginTop10");
              
       // Responsive Grid Layout
              var oEquipcatTanksLayout = new sap.ui.layout.form.ResponsiveGridLayout("idEquipcatTanksLayout");
       
       // Online Form Starts
              var oEquipcatTanksForm = new sap.ui.layout.form.Form("idEquipcatTanksForm",{
                                     layout: oEquipcatTanksLayout,
                                     formContainers: [
                                             
                                             new sap.ui.layout.form.FormContainer("idEquipcatTanksFormC1",{
                                                     //title: FullSpecTitle,
                                                     formElements: [
																	/*new sap.ui.layout.form.FormElement({
																	    fields: [oLabelfull]
																	}),*/
                                                                    new sap.ui.layout.form.FormElement({
                                                                        fields: [oFlexFullSpecData]
                                                                    }),
                                                                    new sap.ui.layout.form.FormElement({
                                                                        fields: [oLabelConstr]
                                                                    }),
                                                                    new sap.ui.layout.form.FormElement({
                                                                        fields: [oEqiupCatTanksConstTable]
                                                                    }),
                                                                    new sap.ui.layout.form.FormElement({
                                                                        fields: [oLabelStdFit]
                                                                    }),
                                                                    new sap.ui.layout.form.FormElement({
                                                                        fields: [oEqiupCatTanksFitTable]
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
		  		        oEquipcatTanksForm		  		      
		     		  ],
		     		  direction: "Column",
		     		});
              
              sap.ui.getCore().byId("idEqiupCatTanksFlxBox").addItem(oFlexBoxFull);
                                   //return oFlexBoxFull;
       },
       
       bindTankDetails: function(){
               aEquipCatTanks = [
                                          {desc: "Cubic Capacity", value: ""},
                                          {desc: "Tare Weight", value: ""},
                                          {desc: "Maximum Gross Weight", value: ""}
                                          ];

                 aEquipCatTanksConst = [
                                          {desc: "Working Pressure", value: ""},
                                          {desc: "Test Pressure", value: ""},
                                          {desc: "Steam Working Pressure", value: ""},
                                          {desc: "Steam Test Pressure", value: ""},
                                          {desc: "Relief Valve", value: ""},
                                          {desc: "Ambient Temp Range (High)", value: ""},
                                          {desc: "Ambient Temp Range (Low)", value: ""},
                                          {desc: "Maximum Cargo Temp", value: ""},
                                          {desc: "Shell Material", value: ""},
                                          {desc: "Shell Mild Steel Equiv Thickness", value: ""},
                                          {desc: "Shell Mild Steel Equiv Thickness", value: ""},
                                          {desc: "Shell Thickness - Barrel", value: ""},
                                          {desc: "Shell Thickness - Ends", value: ""},
                                          {desc: "Tank Type", value: ""}
                                          ];

                 aEquipCatTanksStdFit = [
                                          {desc: "Manlid", value: ""},
                                          {desc: "Calibration", value: ""},
                                          {desc: "Cladding", value: ""},
                                          {desc: "Handrail", value: ""},
                                          {desc: "Insulation Material", value: ""},
                                          {desc: "Insulation Material Thickness (side)", value: ""},
                                          {desc: "Lining Material", value: ""},
                                          {desc: "Valve, Airline - Primary Outlet Diameter", value: ""},
                                          {desc: "Valve, Airline - Primary Outlet (Thread & Flange Type)", value: ""},
                                          {desc: "Valve, Airline - Primary Outlet Type", value: ""},
                                          {desc: "Safety Relief Valve - Secondary Outlet Diameter", value: ""},
                                          {desc: "Safety Relief Valve - Secondary Outlet (Thread & Flange)", value: ""},
                                          {desc: "Safety Relief Valve - Secondary Outlet Type", value: ""},
                                          {desc: "Valve, Bottom - Outlet Diameter", value: ""},
                                          {desc: "Valve, Bottom - Outlet (Thread & Flange Type)", value: ""},
                                          {desc: "Valve, Bottom - Outlet Type", value: ""},
                                          {desc: "Valve, Top - Outlet Type", value: ""},
                                          {desc: "Valve, Top - Outlet Diameter", value: ""},
                                          {desc: "Valve, Top - Outlet Location", value: ""},
                                          {desc: "Valve, Top - Outlet (Thread & Flange Type)", value: ""},
                                          {desc: "Valve, Vapour Return Type", value: ""},
                                          {desc: "Valve, Vapour Return - Diameter", value: ""},
                                          {desc: "Valve, Vapour Return (Thread & Flange Type)", value: ""},
                                          {desc: "Walkway Type", value: ""},
                                          {desc: "Insulation", value: ""},
                                          {desc: "Steam Heating", value: ""},
                                          {desc: "Steam Tube - Effective Area", value: ""},
                                          {desc: "Steam Tube - Ducts", value: ""},
                                          {desc: "Steam Tube - Inlet / Outlet", value: ""},
                                          {desc: "Steam Working Pressure", value: ""},
                                          {desc: "Relief Valve - Diameter", value: ""},
                                          {desc: "Relief Valve - Outlet", value: ""},
                                          {desc: "Relief Valve - Set @", value: ""},
                                          {desc: "Relief Valve - Type", value: ""},
                                          {desc: "Manlid / Load Hatch Fastening Type", value: ""},
                                          {desc: "Relief Valve", value: ""},
                                          {desc: "Weld Finish Internal", value: ""},
                                          {desc: "Weld Material Grade", value: ""},
                                         // {desc: "Relief Valve", value: ""},
                                         // {desc: "Valve Airline - Primary Outlet", value: ""},
                                          {desc: "Vapour Return", value: ""},
                                          {desc: "Remote Closure", value: ""},
                                          {desc: "Gaskets & Seals", value: ""},
                                          {desc: "Temperature Gauge", value: ""},
                       ];

               // TANKS
               // NP - Change here
              // aEquipCatTanks[0].value = aFullSpecificationTanks[0].Manufacturer;
               aEquipCatTanks[0].value = aFullSpecificationTanks[0].CubicCapacity;
               aEquipCatTanks[1].value = aFullSpecificationTanks[0].TareWeight;
               aEquipCatTanks[2].value = aFullSpecificationTanks[0].MaximumGrossWeigh;

        
               //Create a model and bind the table rows to this model
                      var oModelEquipCatTank = new sap.ui.model.json.JSONModel();
                      oModelEquipCatTank.setData({modelData: aEquipCatTanks});
                      
                      // NP - Change here
                      sap.ui.getCore().byId("idTanksTbl").setModel(oModelEquipCatTank);
                      sap.ui.getCore().byId("idTanksTbl").bindRows("/modelData");
                      
                            // TANKS - CONSTRUCTION
                            // NP - Change here
                      aEquipCatTanksConst[0].value = aFullSpecificationTanks[0].WorkingPressure;
                      aEquipCatTanksConst[1].value = aFullSpecificationTanks[0].TestPressure;
                      aEquipCatTanksConst[2].value = aFullSpecificationTanks[0].SteamWorkingPressure;
                      aEquipCatTanksConst[3].value = aFullSpecificationTanks[0].SteamTestPressure;
                      aEquipCatTanksConst[4].value = aFullSpecificationTanks[0].ReliefValve;
                      aEquipCatTanksConst[5].value = aFullSpecificationTanks[0].AmbientTempRangeHigh;
                      aEquipCatTanksConst[6].value = aFullSpecificationTanks[0].AmbientTempRangeLow;
                      aEquipCatTanksConst[7].value = aFullSpecificationTanks[0].MaximumCargoTemp;
                      aEquipCatTanksConst[8].value = aFullSpecificationTanks[0].ShellMaterial;
                      aEquipCatTanksConst[9].value = aFullSpecificationTanks[0].ShellMildBar;
                      aEquipCatTanksConst[10].value = aFullSpecificationTanks[0].ShellMildEnd;
                      aEquipCatTanksConst[11].value = aFullSpecificationTanks[0].ShellThckBar;
                      aEquipCatTanksConst[12].value = aFullSpecificationTanks[0].ShellThckEnd;
                      aEquipCatTanksConst[13].value = aFullSpecificationTanks[0].TankType;

               
                      //Create a model and bind the table rows to this model
                             var oModelEquipCatTankConst = new sap.ui.model.json.JSONModel();
                             oModelEquipCatTankConst.setData({modelData: aEquipCatTanksConst});
                             
                             // NP - Change here
                             sap.ui.getCore().byId("idTanksConstTable").setModel(oModelEquipCatTankConst);
                             sap.ui.getCore().byId("idTanksConstTable").bindRows("/modelData");
                             
                             // TANKS - STANDARD FITTINGS
                             aEquipCatTanksStdFit[0].value = aFullSpecificationTanks[0].Manlid;
                             aEquipCatTanksStdFit[1].value = aFullSpecificationTanks[0].Calibration;
                             aEquipCatTanksStdFit[2].value = aFullSpecificationTanks[0].Cladding;
                             aEquipCatTanksStdFit[3].value = aFullSpecificationTanks[0].Handrail;
                             aEquipCatTanksStdFit[4].value = aFullSpecificationTanks[0].InsulationMaterial;
                             aEquipCatTanksStdFit[5].value = aFullSpecificationTanks[0].InsulationMaterialThickness;
                             aEquipCatTanksStdFit[6].value = aFullSpecificationTanks[0].LiningMaterial;
                             aEquipCatTanksStdFit[7].value = aFullSpecificationTanks[0].ValveAirlinePrimaryoutletdi;
                             aEquipCatTanksStdFit[8].value = aFullSpecificationTanks[0].ValveAirlinePrimaryoutletT;
                             aEquipCatTanksStdFit[9].value = aFullSpecificationTanks[0].ValveAirlinePrimaryoutletTy;
                             aEquipCatTanksStdFit[10].value = aFullSpecificationTanks[0].SafetyReliefSecOutDi;
                             aEquipCatTanksStdFit[11].value = aFullSpecificationTanks[0].SafetyReliefSecOutT;
                             aEquipCatTanksStdFit[12].value = aFullSpecificationTanks[0].SafetyReliefSecOutType;
                             aEquipCatTanksStdFit[13].value = aFullSpecificationTanks[0].ValveBottomOutletDi;
                             aEquipCatTanksStdFit[14].value = aFullSpecificationTanks[0].ValveBottomOutletT;
                             aEquipCatTanksStdFit[15].value = aFullSpecificationTanks[0].ValveBottomOutletType;
                             aEquipCatTanksStdFit[16].value = aFullSpecificationTanks[0].ValveTopOutletType;
                             aEquipCatTanksStdFit[17].value = aFullSpecificationTanks[0].ValveTopOutletDi;
                             aEquipCatTanksStdFit[18].value = aFullSpecificationTanks[0].ValveTopOutletLocation;
                             aEquipCatTanksStdFit[19].value = aFullSpecificationTanks[0].ValveTopOutletT;
                             aEquipCatTanksStdFit[20].value = aFullSpecificationTanks[0].ValveVapourReturnType;
                             aEquipCatTanksStdFit[21].value = aFullSpecificationTanks[0].ValveVapourReturnDiameter;
                             aEquipCatTanksStdFit[22].value = aFullSpecificationTanks[0].ValveVapourReturnThread;
                             aEquipCatTanksStdFit[23].value = aFullSpecificationTanks[0].WalkwayType;
                             aEquipCatTanksStdFit[24].value = aFullSpecificationTanks[0].Insulation;
                             aEquipCatTanksStdFit[25].value = aFullSpecificationTanks[0].SteamHeating;
                             aEquipCatTanksStdFit[26].value = aFullSpecificationTanks[0].SteamTubeEffectiveArea;
                             aEquipCatTanksStdFit[27].value = aFullSpecificationTanks[0].SteamTubeDucts;
                             aEquipCatTanksStdFit[28].value = aFullSpecificationTanks[0].SteamTubeInletOutlet;
                             aEquipCatTanksStdFit[29].value = aFullSpecificationTanks[0].SteamWorkingPressure;
                             aEquipCatTanksStdFit[30].value = aFullSpecificationTanks[0].ReliefValveDiameter;
                             aEquipCatTanksStdFit[31].value = aFullSpecificationTanks[0].ReliefValveOutlet;
                             aEquipCatTanksStdFit[32].value = aFullSpecificationTanks[0].ReliefValveSet;
                             aEquipCatTanksStdFit[33].value = aFullSpecificationTanks[0].ReliefVavleType;
                             aEquipCatTanksStdFit[34].value = aFullSpecificationTanks[0].ManlidLoadHatchFasteningTy;
                             aEquipCatTanksStdFit[35].value = aFullSpecificationTanks[0].ReliefValve;
                             aEquipCatTanksStdFit[36].value = aFullSpecificationTanks[0].WeldFinishInternal;
                             aEquipCatTanksStdFit[37].value = aFullSpecificationTanks[0].WeldMaterialGrad;
                             //aEquipCatTanksStdFit[38].value = aFullSpecificationTanks[0].ReliefValveR;
                            // aEquipCatTanksStdFit[39].value = aFullSpecificationTanks[0].ValveAirlinePrimaryOutl;
                             aEquipCatTanksStdFit[38].value = aFullSpecificationTanks[0].VapourReturn;
                             aEquipCatTanksStdFit[39].value = aFullSpecificationTanks[0].RemoteClosure;
                             aEquipCatTanksStdFit[40].value = aFullSpecificationTanks[0].GasketsSeals;
                             aEquipCatTanksStdFit[41].value = aFullSpecificationTanks[0].TemperatureGauge;

                      
                             //Create a model and bind the table rows to this model
                                   var oModelEquipCatTankStdFit = new sap.ui.model.json.JSONModel();
                                   oModelEquipCatTankStdFit.setData({modelData: aEquipCatTanksStdFit});
                                   
                                   // NP - Change here
                                   sap.ui.getCore().byId("idStdFittingTbl").setModel(oModelEquipCatTankStdFit);
                                   sap.ui.getCore().byId("idStdFittingTbl").bindRows("/modelData");
                                   
 }
});

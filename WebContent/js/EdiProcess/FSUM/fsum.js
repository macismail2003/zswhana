var oJSONFSUMGraphDataCurr = [];	// Current Month
oJSONFSUMGraphDataCurr.push({
	  'process': 'Gate IN',
	  'count': '12',
	});
oJSONFSUMGraphDataCurr.push({
	  'process': 'Repair Estimates',
	  'count': '10',
	});
oJSONFSUMGraphDataCurr.push({
	  'process': 'Lessee Approval',
	  'count': '23',
	});
oJSONFSUMGraphDataCurr.push({
	  'process': 'Repair Completion',
	  'count': '17',
	});
oJSONFSUMGraphDataCurr.push({
	  'process': 'Gate OUT',
	  'count': '11',
	});

var oJSONFSUMGraphDataCurrM1 = [];	// Current Month - 1
oJSONFSUMGraphDataCurrM1.push({
	  'process': 'Gate IN',
	  'count': '22',
	});
oJSONFSUMGraphDataCurrM1.push({
	  'process': 'Repair Estimates',
	  'count': '32',
	});
oJSONFSUMGraphDataCurrM1.push({
	  'process': 'Lessee Approval',
	  'count': '38',
	});
oJSONFSUMGraphDataCurrM1.push({
	  'process': 'Repair Completion',
	  'count': '28',
	});
oJSONFSUMGraphDataCurrM1.push({
	  'process': 'Gate OUT',
	  'count': '22',
	});


sap.ui.model.json.JSONModel.extend("fsum", {

	/*FSUM : Create EDI Summary Page */

	createFSUMPage : function(){

		var oCurrent = this;

		var backEDI = new sap.m.Link({text: " < Back",
        	  width:"7%",
        	  wrapping:true,
        	  press: function(){
        		  var bus = sap.ui.getCore().getEventBus();
        		  bus.publish("nav", "back");
        		  $('#idHdrContnt').html('EDI Process');
       	  }});


		sap.ui.getCore().loadLibrary("sap.viz");

		/* EDI Graph - This Month */
		var oFSUMInteractionCurr = new sap.viz.ui5.types.controller.Interaction({
			 selectability:new sap.viz.ui5.types.controller.Interaction_selectability({
				 mode:sap.viz.ui5.types.controller.Interaction_selectability_mode.single
			 })
		 }
		);

		var oFSUMDatasetCurr = new sap.viz.ui5.data.FlattenedDataset("idFSUMDatasetCurr",{
			dimensions:[{ axis:1, name:"Process", value:"{process}"}],
			measures:[{ name:"Count", value:"{count}"},{ name:"Counterr", value:"{counterr}"}],
	     	 selectData:function(){alert("click select")},
			data:{path:"/"}});

		var oFSUMLabelNoDataCurr = new sap.ui.commons.TextView("idFSUMLabelNoDataCurr",{
		    //text : "No data found for Repair Inventory",
		    text : "Loading ... ",
		    wrapping: true}).addStyleClass('sapUiLbl sapVizNoDataDefault font12');

		var oFSUMGraphCurr = new sap.viz.ui5.Column("idFSUMGraphCurr",{
			width : "100%",
			height : "290px",
	     	//layoutData: new sap.ui.layout.GridData({span: "L6 M8 S12"}),
				plotArea : new sap.viz.ui5.types.VerticalBar({colorPalette:[columnColor,"#e73232"]}),
	        interaction:oFSUMInteractionCurr,
	        /*selectData:function(){alert("click")},
	        deselectData:function(){alert("click 1")},*/
	        dataset : oFSUMDatasetCurr
	     }).addStyleClass("marginTop10");
		oFSUMGraphCurr.setNoData(oFSUMLabelNoDataCurr);
		oFSUMGraphCurr.setLegend(new sap.viz.ui5.types.legend.Common ({visible:false}));

		oFSUMGraphCurr.attachSelectData(
			function (oControlEvent) {
				clickSelectData= true;
				//var log0 = "Dimension selected: " + oControlEvent.getParameter("VALUE1") + '\n';
				var XaixsData = this._oVIZInstance.selection()[0].data["Process"];
				var YaxisData = this._oVIZInstance.selection()[0].data["Count"];
				if(YaxisData == undefined){
					YaxisData = this._oVIZInstance.selection()[0].data["Counterr"];
					XaixsData = XaixsData + " ERR";
				}
				var month = "0";
				console.log(XaixsData, YaxisData, month);
				oCurrent.moveFDET(XaixsData, YaxisData, month);
				//alert("X axis - "+ XaixsData + "Y Axis - "+ YaxisData);
				//depotInv.callStatusScreens(XaixsData,YaxisData);
			}
		);

		/* EDI Graph - This Month - 1*/
		var oFSUMInteractionCurrM1 = new sap.viz.ui5.types.controller.Interaction({
			 selectability:new sap.viz.ui5.types.controller.Interaction_selectability({
				 mode:sap.viz.ui5.types.controller.Interaction_selectability_mode.single
			 })
		 }
		);

		var oFSUMDatasetCurrM1 = new sap.viz.ui5.data.FlattenedDataset("idFSUMDatasetCurrM1",{
			dimensions:[{ axis:1, name:"Process", value:"{process}"}],
			measures:[{ name:"Count", value:"{count}"},{ name:"Counterr", value:"{counterr}"}],
				 selectData:function(){alert("click select")},
			data:{path:"/"}});

		var oFSUMLabelNoDataCurrM1 = new sap.ui.commons.TextView("idFSUMLabelNoDataCurrM1",{
				//text : "No data found for Repair Inventory",
				text : "Loading ... ",
				wrapping: true}).addStyleClass('sapUiLbl sapVizNoDataDefault font12');

		var oFSUMGraphCurrM1 = new sap.viz.ui5.Column("idFSUMGraphCurrM1",{
			height : "290px",
			width : "100%",
				//layoutData: new sap.ui.layout.GridData({span: "L6 M8 S12"}),
					plotArea : new sap.viz.ui5.types.VerticalBar({colorPalette:[columnColor,"#e73232"]}),
					interaction:oFSUMInteractionCurrM1,
					/*selectData:function(){alert("click")},
					deselectData:function(){alert("click 1")},*/
					dataset : oFSUMDatasetCurrM1
			 }).addStyleClass("marginTop10");
		oFSUMGraphCurrM1.setNoData(oFSUMLabelNoDataCurrM1);
		oFSUMGraphCurrM1.setLegend(new sap.viz.ui5.types.legend.Common ({visible:false}));
		oFSUMGraphCurrM1.attachSelectData(
			function (oControlEvent) {
				clickSelectData= true;
				//var log0 = "Dimension selected: " + oControlEvent.getParameter("VALUE1") + '\n';
				var XaixsData = this._oVIZInstance.selection()[0].data["Process"];
				var YaxisData = this._oVIZInstance.selection()[0].data["Count"];
				if(YaxisData == undefined){
					YaxisData = this._oVIZInstance.selection()[0].data["Counterr"];
					XaixsData = XaixsData + " ERR";
				}
				var month = "1";
				oCurrent.moveFDET(XaixsData, YaxisData, month);
				//alert("X axis - "+ XaixsData + "Y Axis - "+ YaxisData);
				//depotInv.callStatusScreens(XaixsData,YaxisData);
			}
		);

		/* Depot Number */

        var oFSUMComboDepot = new sap.m.ComboBox("idFSUMComboDepot",{
        		visible: true,
            width:"400px",
            displaySecondaryValues:true,
            placeholder: "Depot",
            change: function(evnt){
							oCurrent.setFSUMGraphValues();
            },
            });

        var oFSUMModelDepot = new sap.ui.model.json.JSONModel();
        oFSUMModelDepot.setSizeLimit(99999);
        oFSUMModelDepot.setData({data:depotEdiData});

        oFSUMComboDepot.setModel(oFSUMModelDepot);
        oFSUMComboDepot.setSelectedKey(depotEdiData[0].key);
        oFSUMComboDepot.bindItems("/data", new sap.ui.core.ListItem({text: "{text}", key:"{key}"}));

				var comboheight = "";
				if(depotEdiData.length > 10){
					comboheight = "400px";
				}else{
					comboheight = depotEdiData.length * 40;
					comboheight = comboheight + "px";
				}

				var oCombo = sap.ui.getCore().byId("idFSUMComboDepot"),
				oPopOver = oCombo.getPicker();
				oPopOver.setContentHeight(comboheight);

        var oFSUMLabelDepot = new sap.m.Label("idFSUMLabelDepot",{
			  text : "Depot",
			  width : "130px"
        }).addStyleClass("selectionLabels");

				/* FSUM - Button - Refresh */

				var oFSUMButtonRefresh = new sap.ui.commons.Button("idFSUMButtonRefresh",{
			          text : "",
			          styled:false,
								visible : false,
			          type:sap.m.ButtonType.Unstyled,
			          icon: sap.ui.core.IconPool.getIconURI("synchronize"),
			          press:function(){
					 				oCurrent.setFSUMGraphValues();
			          }
				}).addStyleClass("normalBtn marginTop10");

		var oFSUMFlexDepot = new sap.m.FlexBox("idFSUMFlexDepot",{
            items: [oFSUMLabelDepot,
                    oFSUMComboDepot,
                    new sap.m.Label({width : "10px"}),
					oFSUMButtonRefresh
                    ],
            direction: "Row"
		}).addStyleClass("marginMainLeft marginTop20");

		var oFSUMLayoutCurrGraph = new sap.ui.layout.form.ResponsiveGridLayout("idFSUMLayoutCurrentGraphs",{
				//labelSpanL: 1,
				//labelSpanM: 1,
				//labelSpanS: 2,
				//emptySpanL: 1,
				//emptySpanM: 1,
				//emptySpanS: 1,
				columnsL: 1,
				columnsM: 1,
				columnsS: 1,
				//breakpointL: 800,
				//breakpointM: 400
			});

			var oFSUMFormCurrGraph = new sap.ui.layout.form.Form("idFSUMFormCurrentGraphs",{
				editable: true,
				layout: oFSUMLayoutCurrGraph,
				formContainers: [
					new sap.ui.layout.form.FormContainer({
						title: "Current Month",
						formElements: [
							new sap.ui.layout.form.FormElement({
								fields: [oFSUMGraphCurr//new sap.ui.commons.TextField({value: "Max"})
								]
							})
							]
					})
				]
			});


		var oFSUMLayoutLastGraphs = new sap.ui.layout.form.ResponsiveGridLayout("idFSUMLayoutLastGraphs", {
			columnsL: 1,
			columnsM: 1,
			columnsS: 1,
		});

		var oFSUMFormLastGraphs = new sap.ui.layout.form.Form("idFSUMFormLastGraphs",{
					layout: oFSUMLayoutLastGraphs,
					//width: "100%",
					formContainers: [
						new sap.ui.layout.form.FormContainer({
							title: "Last Month",
							formElements: [
								new sap.ui.layout.form.FormElement({
									fields: [oFSUMGraphCurrM1//new sap.ui.commons.TextField({value: "Max"})
									]
								})
								]
						})
					]
		});

		var oFSUMFlexFinal = new sap.m.FlexBox("idFSUMFlexFinal",{
						width : "90%",
            items: [ backEDI,
										 new sap.m.Label(),
										 oFSUMFlexDepot,
										 new sap.m.Label(),
                     oFSUMFormCurrGraph,
										 new sap.m.Label(),
										 oFSUMFormLastGraphs
                    ],
            direction: "Column"
		}).addStyleClass("marginMainLeft");

	  //oCurrent.setFSUMGraphValues();

		return oFSUMFlexFinal;

    },

    /*FSUM : Set Graph Values */

    setFSUMGraphValues : function(){

    	var oCurrent = this;
			var depotid = sap.ui.getCore().byId("idFSUMComboDepot").getSelectedKey();
			oModel = new sap.ui.model.odata.ODataModel(serviceEDIDOC, true);
			var oMODELFSUM = serviceEDIDOC + "FSUMSet?$filter=Userid eq '" + sessionStorage.uName.toUpperCase() 	// "CPIC_CXI001"
												+ "' and DepotId eq '" + depotid
												+ "'";

			busyDialog.open();
			console.log(oMODELFSUM);
			OData.request({
			      requestUri: oMODELFSUM,
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
		    	if(data.results.length == 0){
		    		console.log("Above request : Success but returned nothing");
		    		sap.ui.commons.MessageBox.alert("No data found!");
		    	}else{
		    		console.log("Above request : Success");

						oJSONFSUMGraphDataCurr = [];
						oJSONFSUMGraphDataCurrM1 = [];
						for(var i=0;i<data.results.length;i++){
							if(data.results[i].MonthSum == "0"){
								oJSONFSUMGraphDataCurr.push({
									"process" : data.results[i].Process,
									"count" : data.results[i].CountSum,
									"counterr" : data.results[i].CountSumErr
								});
							}else if(data.results[i].MonthSum == "1"){
								oJSONFSUMGraphDataCurrM1.push({
									"process" : data.results[i].Process,
									"count" : data.results[i].CountSum,
									"counterr" : data.results[i].CountSumErr
								});
							}
						}
						var oModelFSUMGraphDataCurr = new sap.ui.model.json.JSONModel();
			    	oModelFSUMGraphDataCurr.setData(oJSONFSUMGraphDataCurr);
						sap.ui.getCore().byId("idFSUMGraphCurr").setModel(oModelFSUMGraphDataCurr);

			    	var oModelFSUMGraphDataCurrM1 = new sap.ui.model.json.JSONModel();
			    	oModelFSUMGraphDataCurrM1.setData(oJSONFSUMGraphDataCurrM1);
			    	sap.ui.getCore().byId("idFSUMGraphCurrM1").setModel(oModelFSUMGraphDataCurrM1);

						if(sap.ui.getCore().byId("idFSUMFormCurrentGraphs"))
							 sap.ui.getCore().byId("idFSUMFormCurrentGraphs").setVisible(true);

						if(sap.ui.getCore().byId("idFSUMFormLastGraphs"))
							 sap.ui.getCore().byId("idFSUMFormLastGraphs").setVisible(true);

		    	}
		    },function(err){
					busyDialog.close();
					console.log("Above request : Failed");
					sap.ui.commons.MessageBox.alert("No data found!");
		    });




		/* oModel = new sap.ui.model.odata.ODataModel(serviceEDIDOC, true);
		var oMODELFSUM = serviceEDIDOC + "FSUMGraphSet?$filter=" + stringToPass;

		busyDialog.open();
		console.log(oMODELFSUM);
		OData.request({
		      requestUri: oMODELFSUM,
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
		    	if(data.results.length == 0){
		    		console.log("Above request : Success");
		    		sap.ui.commons.MessageBox.alert("Submitted!");
		    		sap.ui.getCore().byId("idFSUMButtonAdd5").setEnabled(false);
             	    sap.ui.getCore().byId("idFSUMButtonValidate").setEnabled(false);
             	    sap.ui.getCore().byId("idFSUMButtonSubmit").setEnabled(false);
             	   	sap.ui.getCore().byId("idFSUMButtonPrint").setEnabled(true);
		    	}else{
		    		console.log("Above request : Success");
		    		sap.ui.commons.MessageBox.alert("Submitted!");
		    	}
		    },function(err){
		    	 console.log("Above Request : Error");
		    	 busyDialog.close();
		    	 sap.ui.commons.MessageBox.alert("There is an error; Please try again later.");
		    });*/


    },

		moveFDET : function(process, count, month){

			$('#idHdrContnt').html('EDI Summary Detail');
			var ofdet = new fdet();
			ofdet.bindFDETTable(process, count, month);
		}


});

function isValidDate(dateString) {
	  var regEx = /^\d{4}-\d{2}-\d{2}$/;
	  if(!dateString.match(regEx)) return false;  // Invalid format
	  var d = new Date(dateString);
	  if(!d.getTime() && d.getTime() !== 0) return false; // Invalid date
	  return d.toISOString().slice(0,10) === dateString;
}

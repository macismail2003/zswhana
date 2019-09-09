jQuery.sap.require("sap.ui.model.json.JSONModel");

var PrimData = [];
var PrimData1 = [];
var PrimData2 = [];
var PrimData3 = [];
var PrimData4 = [];
var jsonPrimData4=[];
var jsonLineData=[];
var selectedDNJSNo;
var odnjsP;
var LineData = [];

sap.ui.model.json.JSONModel.extend("DNJSPrimaryDetails", {
	
	createScreenFlex:function(){
		
		var oScreenFlex = new sap.m.FlexBox("oDNJSPrimaryScreenFlex",{
			  items: [ ],
			  direction : "Column"
		});
		return oScreenFlex;
	},
	createPrimaryDetForm: function(oController){
		odnjsP = this;
		
		var back = new sap.m.Link({text: " < Back",
			width:"8%",
			wrapping:true,
            press: function(){
                   var bus = sap.ui.getCore().getEventBus();
                       bus.publish("nav", "back");
                       $('#idHdrContnt').html('View DN/JS'); //CHANGE HEADER CONTENT
        }});
		
		var oPrimDetTable1 = new sap.ui.table.Table("PrimDetTbl1",{
	        visibleRowCount: 4,
	        firstVisibleRow: 1,
	        columnHeaderVisible: false,
	        selectionMode: sap.ui.table.SelectionMode.None,
	       // layoutData: new sap.ui.layout.GridData({span: "L4 M4 S12",linebreak: false, margin: false})
	       // width: "90%",
	        
	   }).addStyleClass("tblBorder marginTop10");
		
		oPrimDetTable1.addColumn(new sap.ui.table.Column({	      
	        template: new sap.ui.commons.TextView().bindProperty("text", "text"),
	        sortProperty: "text",
	        filterProperty: "text",
	        width: "100px",
		}));
		oPrimDetTable1.addColumn(new sap.ui.table.Column({	      
	        template: new sap.ui.commons.TextView().bindProperty("text", "value").addStyleClass("wraptext"),
	        sortProperty: "value",
	        filterProperty: "value",
	        width: "100px"
		}));
		
		var strNoDataTbl1 = '<div class="sapUiTableCtrlEmpty custTblBgColor" tabindex="0"><span id="idspnNodataPrimDetTable1"'
		strNoDataTbl1 += 'class="sapUiLbl custTblBgColor sapUiTableCtrlEmptyMsg">Loading...</span></div>'

		var ohtmlCntrl1 = new sap.ui.core.HTML("idhtmlNoDataPrimDetTable1",{content: strNoDataTbl1});
			 
		oPrimDetTable1.setNoData(ohtmlCntrl1);
		
	//****** Second table
		
		var oPrimDetTable2 = new sap.ui.table.Table("PrimDetTbl2",{
	        visibleRowCount: 3,
	        firstVisibleRow: 1,
	        columnHeaderVisible: false,
	        selectionMode: sap.ui.table.SelectionMode.None,
	      //  layoutData: new sap.ui.layout.GridData({span: "L4 M4 S12",linebreak: false, margin: false})
	      //  width: "90%",
	   }).addStyleClass("tblBorder marginTop10");
		
		oPrimDetTable2.addColumn(new sap.ui.table.Column({	      
	        template: new sap.ui.commons.TextView().bindProperty("text", "text").addStyleClass("wraptext"),
	        sortProperty: "text2",
	        filterProperty: "text2",
	        width: "100px"
		}));
		oPrimDetTable2.addColumn(new sap.ui.table.Column({	      
	        template: new sap.ui.commons.TextView().bindProperty("text", "value").addStyleClass("wraptext"),
	        sortProperty: "value2",
	        filterProperty: "value2",
	        width: "100px"
		}));
		
		var strNoDataTbl2 = '<div class="sapUiTableCtrlEmpty custTblBgColor" tabindex="0"><span id="idspnNodataPrimDetTable2"';
		strNoDataTbl2 += 'class="sapUiLbl custTblBgColor sapUiTableCtrlEmptyMsg">Loading...</span></div>';

		var ohtmlCntrl2 = new sap.ui.core.HTML("idhtmlNoDataPrimDetTable2",{content: strNoDataTbl2});
			 
		oPrimDetTable2.setNoData(ohtmlCntrl2);
			
	//******* third table
		
		var oPrimDetTable3 = new sap.ui.table.Table("PrimDetTbl3",{
	        visibleRowCount: 3,
	        firstVisibleRow: 3,
	        columnHeaderVisible: false,
	        selectionMode: sap.ui.table.SelectionMode.None,
	       // layoutData: new sap.ui.layout.GridData({span: "L4 M4 S12",linebreak: false, margin: false}),
	        editable : true,
	        //width: "100%",
	   }).addStyleClass("tblBorder marginTop10");
		
		oPrimDetTable3.addColumn(new sap.ui.table.Column({	      
	        template: new sap.ui.commons.TextView().bindProperty("text", "text"),
	        sortProperty: "text3",
	        filterProperty: "text3",
	        width: "100px"
		}));
		oPrimDetTable3.addColumn(new sap.ui.table.Column({	      
	        template: new sap.ui.commons.TextView({wrapping:true}).bindProperty("text", "value").addStyleClass("wraptext"),
	        sortProperty: "value3",
	        filterProperty: "value3",
	        width: "120px"
		}));
		
		var strNoDataTbl3 = '<div class="sapUiTableCtrlEmpty custTblBgColor" tabindex="0"><span id="idspnNodataPrimDetTable3"';
		strNoDataTbl3 += 'class="sapUiLbl custTblBgColor sapUiTableCtrlEmptyMsg">Loading...</span></div>';

		var ohtmlCntrl3 = new sap.ui.core.HTML("idhtmlNoDataPrimDetTable3",{content: strNoDataTbl3});
			 
		oPrimDetTable3.setNoData(ohtmlCntrl3);
		
		
		var oLabel = new sap.ui.commons.Label(); 
        oLabel.setText("Primary Details");
        oLabel.addStyleClass("font11");
        
        var otitle = new sap.ui.commons.Label(); 
        otitle.setText("View DN/JS");
        otitle.addStyleClass("fontTitle");
        
        var btnPrint = new sap.m.Button({
            text : "Print",
            type:sap.m.ButtonType.Unstyled,
            icon: sap.ui.core.IconPool.getIconURI("print"),
            press:function(){
                  //alert("Print CLicked");
            	  var tab =  odnjsP.makeHTMLTableLA(PrimData,PrimData1,PrimData2,PrimData3,jsonPrimData4, jsonLineData, "View DN/JS - Primary Details", "print" );
	        	  var newWin = window.open();
	        	  newWin.document.write(tab);
	        	  newWin.print();
            }
         }).addStyleClass("submitBtn");
  
         
         var btnExport = new sap.m.Button({
            text : "Export To Excel",
            type:sap.m.ButtonType.Unstyled,
            icon: sap.ui.core.IconPool.getIconURI("excel-attachment"),
            press:function(){
                  //alert("Export to Excel");
            	   odnjsP.makeHTMLTableLA(PrimData,PrimData1,PrimData2,PrimData3,jsonPrimData4, jsonLineData, "View DN/JS - Primary Details", "export" );
            }
         }).addStyleClass("submitBtn");

         var oLabelSpaceRelRefDet = new sap.ui.commons.Label({text: " ",
             width:"5px",
             wrapping: true});


        
         var DNJSFlexToolbar = new sap.m.FlexBox("DNJSFlexToolbar",{
     		width: "60%",
     		items:[
     		       btnExport,oLabelSpaceRelRefDet,
     		       btnPrint
     		],
     		visible:false,
     		direction: sap.m.FlexDirection.RowReverse
     	});
        
        var oFlexboxPD = new sap.m.FlexBox({
			  items: [
                  otitle,
                  oLabel
			  ],
			  direction: "Column"
			});
        var oUtil = new utility();
       //********** Fourth table 
        var oPrimDetTable4 = new sap.ui.table.Table("PrimDetTbl4",{
	        visibleRowCount: 5,
	        firstVisibleRow: 1,
	        columnHeaderHeight: 30,
	        selectionMode: sap.ui.table.SelectionMode.None,
	         width: "60%"	        
	   }).addStyleClass("tblBorder marginTop10");
		
		oPrimDetTable4.addColumn(new sap.ui.table.Column({	
			//label: new sap.ui.commons.Label({text: " "}),
	        template: new sap.ui.commons.TextView().bindProperty("text", "text"),
	        sortProperty: "text",
	        resizable:false,
	        filterProperty: "text",
		}));
		var oLabourCol = new sap.ui.table.Column({
			label: new sap.ui.commons.Label({text: "Labour "}),
	        template: new sap.ui.commons.TextView().bindProperty("text", "labour"),
	        sortProperty: "labour",
	        resizable:false,
	        filterProperty: "labour",
		});
		oPrimDetTable4.addColumn(oLabourCol);
		oUtil.addColumnSorterAndFilter(oLabourCol, oUtil.compareUptoCount);
		
		var oMatCol = new sap.ui.table.Column({	
			label: new sap.ui.commons.Label({text: "Material"}),
	        template: new sap.ui.commons.TextView().bindProperty("text", "material"),
	        sortProperty: "material",
	        resizable:false,
	        filterProperty: "material",
		});		
		oPrimDetTable4.addColumn(oMatCol);
		oUtil.addColumnSorterAndFilter(oMatCol, oUtil.compareUptoCount);
		
		var oTotalCol = new sap.ui.table.Column({	
			label: new sap.ui.commons.Label({text: "Total"}),
	        template: new sap.ui.commons.TextView().bindProperty("text", "total"),
	        sortProperty: "total",
	        resizable:false,
	        filterProperty: "total",
		});
		oPrimDetTable4.addColumn(oTotalCol);
		oUtil.addColumnSorterAndFilter(oTotalCol, oUtil.compareUptoCount);
		
		var strNoDataTbl4 = '<div class="sapUiTableCtrlEmpty custTblBgColor" tabindex="0"><span id="idspnNodataPrimDetTable4"';
		strNoDataTbl4 += 'class="sapUiLbl custTblBgColor sapUiTableCtrlEmptyMsg">Loading...</span></div>';

		var ohtmlCntrl4 = new sap.ui.core.HTML("idhtmlNoDataPrimDetTable4",{content: strNoDataTbl4});
			 
		oPrimDetTable4.setNoData(ohtmlCntrl4);
		
		var btnlineitem = new sap.m.Button({
            text : "Show Line Item Details",
            type:sap.m.ButtonType.Unstyled,
            visible:true,
            press:function(){
                 // alert("Show line item details");
            	if(sap.ui.getCore().byId("dnjsLineFlex"))
            		sap.ui.getCore().byId("dnjsLineFlex").destroy();
            	
            	btnlineitem.setVisible(false);
                  odnjsP.bindLineItemData();
            }
         }).addStyleClass("submitBtn");
		
		var DNJSFlexFooter = new sap.m.FlexBox("DNJSFlexFooter",{
     		//width: "33%",
     		items:[
     		       btnlineitem
     		     ],
     		direction: "Column",
     		visible:false
     	}).addStyleClass("marginTop10");
        
		var oDjnsPrimFormGLayout = new sap.ui.layout.form.ResponsiveGridLayout("DJ_NSPrimFormGLayout", {
			labelSpanL: 1,
            labelSpanM: 1,
            labelSpanS: 1,
            emptySpanL: 0,
            emptySpanM: 0,
            emptySpanS: 0,
            columnsL: 3,
            columnsM: 2,
            columnsS: 1,
            breakpointL: 900,
            breakpointM: 400

	  });
		
		var oDjnsPrimFormTitle = new sap.ui.layout.form.ResponsiveGridLayout( {});
		var oDjnsPFormTitle = new sap.ui.layout.form.Form({
			layout: oDjnsPrimFormTitle,
			formContainers: [
			                 
				new sap.ui.layout.form.FormContainer({
				formElements: [
					new sap.ui.layout.form.FormElement({
					    fields: [back],
					    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
					}),
					/*new sap.ui.layout.form.FormElement({
						fields: [ new sap.m.Text({text:"View DN/JS - Primary Details"}).addStyleClass("font15Bold")],
						layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
					}),*/
					]
				})
				
				]
		});
		var oDjnsPForm = new sap.ui.layout.form.Form({
			layout: oDjnsPrimFormGLayout,
			formContainers: [
				
				new sap.ui.layout.form.FormContainer({
					formElements: [
					   new sap.ui.layout.form.FormElement({
							    fields: [oPrimDetTable1],
							    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: false, margin: false})
							}),												
						]
				}),
				new sap.ui.layout.form.FormContainer({
					formElements: [
						new sap.ui.layout.form.FormElement({
						    fields: [oPrimDetTable2],
						    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: false, margin: false})
							}),
						]
				}),
				new sap.ui.layout.form.FormContainer({
					formElements: [
						new sap.ui.layout.form.FormElement({
						    fields: [oPrimDetTable3],
						    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: false, margin: false})
							}),
						]
				}),
				
				]
		});
		
		var oDjnsPrimFormGLayout1 = new sap.ui.layout.form.ResponsiveGridLayout( {});
		var oDjnsPForm1 = new sap.ui.layout.form.Form({
			layout: oDjnsPrimFormGLayout1,
			formContainers: [
			                 
				new sap.ui.layout.form.FormContainer({
					formElements: [
						new sap.ui.layout.form.FormElement({
							    fields: [DNJSFlexToolbar],
							    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
							}),
						new sap.ui.layout.form.FormElement({
							   fields: [oPrimDetTable4],
							   layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
							}),
						new sap.ui.layout.form.FormElement({
							   fields: [DNJSFlexFooter],
							   layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
						}),
						new sap.ui.layout.form.FormElement("dnjsPrLineItems",{
							   fields: [],
							   layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
						}),
						]
				}),
				
				]
		});
	     
		
		
		var oFlexPrimaryDetail = new sap.m.FlexBox({
     		
     		items:[
     		       oDjnsPFormTitle,
     		       	oDjnsPForm,
     		       	oDjnsPForm1
     		      ],
     		direction: "Column"
     	});
		//return oFlexPrimaryDetail;
		
		sap.ui.getCore().byId("oDNJSPrimaryScreenFlex").addItem(oFlexPrimaryDetail);
	},
	
	bindDNJSPrimaryDetails:function(){
		busyDialog.open();
		
		//selectedUnitNo;
		//selectedDNJSNo;
		
		var filter = "/Detail_DN_JS?$filter=IDnNumber eq '"+selectedDNJSNo+"'";

		//alert("Str : "+serviceUrl+filter);
		
		oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
		OData.request({ 
		     requestUri: serviceUrl + filter,
		     //user:"pcsdevl", password:"igate@123",
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
		   		busyDialog.close();
		   		var strNoDataTbl1 = '<div class="sapUiTableCtrlEmpty custTblBgColor" tabindex="0"><span id="idspnNodataPrimDetTable1"'
		  		    strNoDataTbl1 += 'class="sapUiLbl custTblBgColor sapUiTableCtrlEmptyMsg">No data</span></div>'
		  		    sap.ui.getCore().byId('idhtmlNoDataPrimDetTable1').setContent(strNoDataTbl1);
		   		
		   		var strNoDataTbl2 = '<div class="sapUiTableCtrlEmpty custTblBgColor" tabindex="0"><span id="idspnNodataPrimDetTable2"'
		  		    strNoDataTbl2 += 'class="sapUiLbl custTblBgColor sapUiTableCtrlEmptyMsg">No data</span></div>'
		  		    sap.ui.getCore().byId('idhtmlNoDataPrimDetTable2').setContent(strNoDataTbl2);
		   		
		   		var strNoDataTbl3 = '<div class="sapUiTableCtrlEmpty custTblBgColor" tabindex="0"><span id="idspnNodataPrimDetTable3"'
		  		    strNoDataTbl3 += 'class="sapUiLbl custTblBgColor sapUiTableCtrlEmptyMsg">No data</span></div>'
		  		    sap.ui.getCore().byId('idhtmlNoDataPrimDetTable3').setContent(strNoDataTbl3);
		   		
		   		var strNoDataTbl4 = '<div class="sapUiTableCtrlEmpty custTblBgColor" tabindex="0"><span id="idspnNodataPrimDetTable4"'
		  		    strNoDataTbl4 += 'class="sapUiLbl custTblBgColor sapUiTableCtrlEmptyMsg">No data</span></div>'
		  		    sap.ui.getCore().byId('idhtmlNoDataPrimDetTable4').setContent(strNoDataTbl3);
		   		
		   	}else  	if(data.results.length>0){
		   		sap.ui.getCore().byId('DNJSFlexToolbar').setVisible(true);
		   		sap.ui.getCore().byId('DNJSFlexFooter').setVisible(true);
		   		
		   		PrimData1 = [];
				PrimData2 = [];
				PrimData3 = [];
				PrimData4 = [];
				jsonPrimData4=[];
				
		   		PrimData = data.results;
		   		
		   		//alert("Data length : "+ PrimData.length);
		   		
		   		PrimData1.push({
	         		  'text':"Serial No:",
	         		  'value':PrimData[0].Serialno
	            });
		   		PrimData1.push({
	         		  'text':"Unit Type:",
	         		  'value':PrimData[0].UnitType
	            });
		   		PrimData1.push({
	         		  'text':"Unit Description:",
	         		  'value':PrimData[0].UnitDesc
	            });
		   		PrimData1.push({
	         		  'text':"Currency:",
	         		  'value':PrimData[0].Currency
	            });
		   		
				var oPModel1 = new sap.ui.model.json.JSONModel();
				oPModel1.setData(PrimData1);
				var oPrimDetTable1 = sap.ui.getCore().byId("PrimDetTbl1");
				oPrimDetTable1.setModel(oPModel1);
				oPrimDetTable1.bindRows("/");
				
				PrimData2.push({
	         		  'text':"Gate In Date:",
	         		  'value':odnjsP.dateFormat(PrimData[0].GateInDt)
	            });
		   		
		   		PrimData2.push({
	         		  'text':"Estimation Date:",
	         		  'value':odnjsP.dateFormat(PrimData[0].EstimatnDt)
	            });
		   		PrimData2.push({
	         		  'text':"Due Date:",
	         		  'value':odnjsP.dateFormat(PrimData[0].DueDt)
	            });
		   		
		   		
				var oPModel2 = new sap.ui.model.json.JSONModel();
				oPModel2.setData(PrimData2);
				var oPrimDetTable2 = sap.ui.getCore().byId("PrimDetTbl2");
				oPrimDetTable2.setModel(oPModel2);
				oPrimDetTable2.bindRows("/");
				
				
				PrimData3.push({
	         		  'text':"Depot Code:",
	         		  'value':PrimData[0].DepotCode
	            });
		   		
		   		PrimData3.push({
	         		  'text':"Depot Name:",
	         		  'value':PrimData[0].DepotName
	            });
		   		PrimData3.push({
	         		  'text':"Labour Rate:",
	         		  'value':PrimData[0].LabourRate
	            });
				var oPModel3 = new sap.ui.model.json.JSONModel();
				oPModel3.setData(PrimData3);
				var oPrimDetTable3 = sap.ui.getCore().byId("PrimDetTbl3");
				oPrimDetTable3.setModel(oPModel3);
				oPrimDetTable3.bindRows("/");
				
				
				PrimData4.push({
	         		  'text':"Owner",
	         		  'labour':numberWithCommas(PrimData[0].OwnerLabour),
	         		  'material':numberWithCommas(PrimData[0].OwnerMaterial),
	         		  'total':numberWithCommas(PrimData[0].OwnerTotal)
	            });
		   		
				PrimData4.push({
	         		  'text':"Lessee",
	         		  'labour':numberWithCommas(PrimData[0].LesseLabour),
	         		  'material':numberWithCommas(PrimData[0].LesseMaterial),
	         		  'total':numberWithCommas(PrimData[0].LesseTotal)
	            });
				
				PrimData4.push({
	         		  'text':"Seacover",
	         		  'labour':numberWithCommas(PrimData[0].SeacoverLabour),
	         		  'material':numberWithCommas(PrimData[0].SeacoverMaterial),
	         		  'total':numberWithCommas(PrimData[0].SeacoverTotal)
	            });
				PrimData4.push({
	         		  'text':"Tax",
	         		  'labour':numberWithCommas(PrimData[0].TaxLabour),
	         		  'material':numberWithCommas(PrimData[0].TaxMaterial),
	         		  'total':numberWithCommas(PrimData[0].TaxTotal)
	            });
				PrimData4.push({
	         		  'text':"Total",
	         		  'labour':numberWithCommas(PrimData[0].TotalLabour),
	         		  'material':numberWithCommas(PrimData[0].TotalMaterial),
	         		  'total':numberWithCommas(PrimData[0].TotTotal)
	            });
		   		
				for(var i=0;i<PrimData4.length;i++){
					jsonPrimData4.push({
		         		  '':PrimData4[i].text,
		         		  'Labour':numberWithCommas(PrimData4[i].labour),
		         		  'Material':numberWithCommas(PrimData4[i].material),
		         		  'Total':numberWithCommas(PrimData4[i].total)
		             });
				}
				
				var oPModel4 = new sap.ui.model.json.JSONModel();
				oPModel4.setData(PrimData4);
				var oPrimDetTable4 = sap.ui.getCore().byId("PrimDetTbl4");
				oPrimDetTable4.setModel(oPModel4);
				oPrimDetTable4.bindRows("/");
				
		   	}
		   	
		   	busyDialog.close();
		   },
		   function(err){
			   var strNoDataTbl1 = '<div class="sapUiTableCtrlEmpty custTblBgColor" tabindex="0"><span id="idspnNodataPrimDetTable"'
		  		    strNoDataTbl1 += 'class="sapUiLbl custTblBgColor sapUiTableCtrlEmptyMsg">No data</span></div>'
		  		    sap.ui.getCore().byId('idhtmlNoDataPrimDetTable1').setContent(strNoDataTbl1);
		   		
		   		var strNoDataTbl2 = '<div class="sapUiTableCtrlEmpty custTblBgColor" tabindex="0"><span id="idspnNodataPrimDetTable2"'
		  		    strNoDataTbl2 += 'class="sapUiLbl custTblBgColor sapUiTableCtrlEmptyMsg">No data</span></div>'
		  		    sap.ui.getCore().byId('idhtmlNoDataPrimDetTable2').setContent(strNoDataTbl2);
		   		
		   		var strNoDataTbl3 = '<div class="sapUiTableCtrlEmpty custTblBgColor" tabindex="0"><span id="idspnNodataPrimDetTable3"'
		  		    strNoDataTbl3 += 'class="sapUiLbl custTblBgColor sapUiTableCtrlEmptyMsg">No data</span></div>'
		  		    sap.ui.getCore().byId('idhtmlNoDataPrimDetTable3').setContent(strNoDataTbl3);
		   		
		   	errorfromServer(err);
		   	/*busyDialog.close();
		   	if(err.response.statusCode == "500"){
		   		sap.ui.commons.MessageBox.alert("Server Response Timeout");
		   		sap.ui.commons.MessageBox.show("Server Response Timeout",
			    			  sap.ui.commons.MessageBox.Icon.INFORMATION,
			    			  "Information",
			    			  [sap.ui.commons.MessageBox.Action.OK], 
			    			  sap.ui.commons.MessageBox.Action.OK
			    	);
		   	}
		   	else{
		   		//alert("Error while reading Repair Estimates : "+ window.JSON.stringify(err.response));
				    	sap.ui.commons.MessageBox.alert("Error while reading Repair Estimates : "+window.JSON.stringify(err.response));
		   	}*/
		   });
		
	},
	
	createPrimaryLineItemForm: function(){
		busyDialog.open();
		var oDjnsLineTable = new sap.ui.table.Table("dnjsLineItemTbl",{
	        visibleRowCount: 1,
	        firstVisibleRow: 1,
	        columnHeaderHeight: 45,
	        selectionMode: sap.ui.table.SelectionMode.None,
	        width:"100%"
	        //navigationMode: sap.ui.table.NavigationMode.Paginator,
	   }).addStyleClass("tblBorder marginTop10");
		
		oDjnsLineTable.addColumn(new sap.ui.table.Column({	
			label: new sap.ui.commons.Label({text: "Line"}),
	        template: new sap.ui.commons.TextView().bindProperty("text", "Line"),
	        sortProperty: "Line",
	        filterProperty: "Line",
	        resizable:false,
	        width:"60px"
		}));
		
		oDjnsLineTable.addColumn(new sap.ui.table.Column({	
			label: new sap.ui.commons.Label({text: "Cmp"}),
	        template: new sap.ui.commons.TextView().bindProperty("text", "ComCode"),
	        sortProperty: "ComCode",
	        filterProperty: "ComCode",
	        resizable:false,
	        width:"50px"
		}));
		oDjnsLineTable.addColumn(new sap.ui.table.Column({	
			label: new sap.ui.commons.Label({text: "Dam"}),
	        template: new sap.ui.commons.TextView().bindProperty("text", "DamCode"),
	        sortProperty: "DamCode",
	        filterProperty: "DamCode",
	        resizable:false,
	        width:"50px"
		}));
		oDjnsLineTable.addColumn(new sap.ui.table.Column({	
			label: new sap.ui.commons.Label({text: "Rep"}),
	        template: new sap.ui.commons.TextView().bindProperty("text", "RepCode"),
	        sortProperty: "RepCode",
	        filterProperty: "RepCode",
	        resizable:false,
	        width:"50px"
		}));
		oDjnsLineTable.addColumn(new sap.ui.table.Column({	
			label: new sap.ui.commons.Label({text: "Locn"}),
	        template: new sap.ui.commons.TextView().bindProperty("text", "LocCode"),
	        sortProperty: "LocCode",
	        filterProperty: "LocCode",
	        resizable:false,
	        width:"50px"
		}));
		oDjnsLineTable.addColumn(new sap.ui.table.Column({	
			label: new sap.ui.commons.Label({text: "Mat"}),
	        template: new sap.ui.commons.TextView().bindProperty("text", "MatCode"),
	        sortProperty: "MatCode",
	        filterProperty: "MatCode",
	        resizable:false,
	        width:"50px"
		}));
		oDjnsLineTable.addColumn(new sap.ui.table.Column({	
			label: new sap.ui.commons.TextView ({text: "Repair Method & \n Component Description"}).addStyleClass("tblHeaderCustomTV"),
	        template: new sap.ui.commons.TextView().bindProperty("text", "LineDesc"),
	        sortProperty: "LineDesc",
	        filterProperty: "LineDesc",
	        resizable:false,
	        width:"220px"
		}));
		oDjnsLineTable.addColumn(new sap.ui.table.Column({	
			label: new sap.ui.commons.Label({text: "Lth"}),
	        template: new sap.ui.commons.TextView().bindProperty("text", "Length"),
	        sortProperty: "Length",
	        filterProperty: "Length",
	        resizable:false,
	        width:"50px"
		}));
		oDjnsLineTable.addColumn(new sap.ui.table.Column({	
			label: new sap.ui.commons.Label({text: "Wth"}),
	        template: new sap.ui.commons.TextView().bindProperty("text", "Width"),
	        sortProperty: "Width",
	        filterProperty: "Width",
	        resizable:false,
	        width:"50px"
		}));
		oDjnsLineTable.addColumn(new sap.ui.table.Column({	
			label: new sap.ui.commons.Label({text: "Qty"}),
	        template: new sap.ui.commons.TextView().bindProperty("text", "Qty"),
	        sortProperty: "Qty",
	        filterProperty: "Qty",
	        resizable:false,
	        width:"50px"
		}));
		oDjnsLineTable.addColumn(new sap.ui.table.Column({	
			label: new sap.ui.commons.Label({text: "Hrs"}),
	        template: new sap.ui.commons.TextView().bindProperty("text", "Hours"),
	        sortProperty: "Hours",
	        filterProperty: "Hours",
	        resizable:false,
	        width:"50px"
		}));
		oDjnsLineTable.addColumn(new sap.ui.table.Column({	
			label: new sap.ui.commons.Label({text: "Lab"}),
	        template: new sap.ui.commons.TextView().bindProperty("text", "LabCost"),
	        sortProperty: "LabCost",
	        filterProperty: "LabCost",
	        resizable:false,
	        width:"70px"
		}));
		oDjnsLineTable.addColumn(new sap.ui.table.Column({	
			label: new sap.ui.commons.Label({text: "Mat Cost"}),
	        template: new sap.ui.commons.TextView().bindProperty("text", "MatCost"),
	        sortProperty: "MatCost",
	        filterProperty: "MatCost",
	        resizable:false,
	        width:"70px"
		}));
		oDjnsLineTable.addColumn(new sap.ui.table.Column({	
			label: new sap.ui.commons.Label({text: "Total"}),
	        template: new sap.ui.commons.TextView().bindProperty("text", "TotCost"),
	        sortProperty: "TotCost",
	        filterProperty: "TotCost",
	        resizable:false,
	        width:"70px"
		}));
		oDjnsLineTable.addColumn(new sap.ui.table.Column({	
			label: new sap.ui.commons.Label({text: "A1"}),
	        template: new sap.ui.commons.TextView().bindProperty("text", "Indicator"),
	        sortProperty: "Indicator",
	        filterProperty: "Indicator",
	        resizable:false,
	        width:"50px"
		}));
		
		var strNoDataTbl5 = '<div class="sapUiTableCtrlEmpty custTblBgColor" tabindex="0"><span id="idspnNodataPrimDetTable5"';
		strNoDataTbl5 += 'class="sapUiLbl custTblBgColor sapUiTableCtrlEmptyMsg">Loading...</span></div>';

		var ohtmlCntrl5 = new sap.ui.core.HTML("idhtmlNoDataPrimDetTable5",{content: strNoDataTbl5});
			 
		oDjnsLineTable.setNoData(ohtmlCntrl5);
		
		var odnjsLineFlex = new sap.m.FlexBox("dnjsLineFlex",{
			  items: [
			    new sap.ui.commons.HorizontalDivider({width: "95%", type: "Area", height: "Medium"}),
			    new sap.m.Text({text:"Line Item Details"}).addStyleClass("font15Bold marginTop10"),
			    oDjnsLineTable
			  ],
			  direction: "Column",
			  width: "100%"
		});
		
		return odnjsLineFlex.addStyleClass("marginTop10");
	},
	
	bindLineItemData:function(){
		busyDialog.open();
		var filter ="/DnJs_LineItem_Details?$filter=ObjectId eq '"+selectedDNJSNo+"'";
		//alert("Str : "+serviceUrl+filter);
		
		oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
		OData.request({ 
		     requestUri: serviceUrl + filter,
		     //user:"pcsdevl", password:"igate@123",
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
		   	//alert("data.results.length" + data.results.length);
		   	//alert("data" + window.JSON.stringify(data.results));
		   	
		   	if(data.results.length == 0){
		   		busyDialog.close();
		   		var strNoDataTbl5 = '<div class="sapUiTableCtrlEmpty custTblBgColor" tabindex="0"><span id="idspnNodataPrimDetTable5"'
		  		    strNoDataTbl5 += 'class="sapUiLbl custTblBgColor sapUiTableCtrlEmptyMsg">No data</span></div>'
		  		    sap.ui.getCore().byId('idhtmlNoDataPrimDetTable5').setContent(strNoDataTbl5);
		   		
		   	}else  	if(data.results.length>0){
		   		LineData = [];
		   		jsonLineData=[];
				
		   		for(var i=0;i<data.results.length;i++){
		   			LineData.push({
                		  'Line':data.results[i].Line.replace(/^0+/, ''),
                		  'ComCode':data.results[i].ComCode,
                		  'DamCode':data.results[i].DamCode,
                		  'RepCode':data.results[i].RepCode,
                		  'LocCode':data.results[i].LocCode,
                		  'MatCode':data.results[i].MatCode,
                		  'LineDesc':data.results[i].LineDesc,
                		  'Length':data.results[i].Length,
                		  'Width':data.results[i].Width,
                		  'Qty':data.results[i].Qty,
                		  'Hours':data.results[i].Hours,
                		  'LabCost':numberWithCommas(data.results[i].LabCost),
                		  'MatCost':numberWithCommas(data.results[i].MatCost),
                		  'TotCost':numberWithCommas(data.results[i].TotCost),
                		  'Indicator':data.results[i].Indicator,
	                  });
		   		}
		   		LineData.push({
          		  'Line':"Totals",
          		  'ComCode':"",
          		  'DamCode':"",
          		  'RepCode':"",
          		  'LocCode':"",
          		  'MatCode':"",
          		  'LineDesc':"",
          		  'Length':"",
          		  'Width':"",
          		  'Qty':"",
          		  'Hours':"",
          		  'LabCost':numberWithCommas(data.results[0].TotLab),
          		  'MatCost':numberWithCommas(data.results[0].TotMat),
          		  'TotCost':numberWithCommas(data.results[0].Total),
          		  'Indicator':"",
                });
		   		LineData.push({
	          		  'Line':"Tax",
	          		  'ComCode':"",
	          		  'DamCode':"",
	          		  'RepCode':"",
	          		  'LocCode':"",
	          		  'MatCode':"",
	          		  'LineDesc':"",
	          		  'Length':"",
	          		  'Width':"",
	          		  'Qty':"",
	          		  'Hours':"",
	          		  'LabCost':numberWithCommas(data.results[0].LabTax),
	          		  'MatCost':numberWithCommas(data.results[0].MatTax),
	          		  'TotCost':numberWithCommas(data.results[0].TotTax),
	          		  'Indicator':"",
	                });
		   		LineData.push({
	          		  'Line':"Estimate",
	          		  'ComCode':"Total",
	          		  'DamCode':"",
	          		  'RepCode':"",
	          		  'LocCode':"",
	          		  'MatCode':"",
	          		  'LineDesc':"",
	          		  'Length':"",
	          		  'Width':"",
	          		  'Qty':"",
	          		  'Hours':"",
	          		  'LabCost':numberWithCommas(data.results[0].EstLabTot),
	          		  'MatCost':numberWithCommas(data.results[0].EstMatTot),
	          		  'TotCost':numberWithCommas(data.results[0].EstTot),
	          		  'Indicator':"",
	                });
				
				for(var i=0;i<LineData.length;i++){
					jsonLineData.push({
		          		  'Line':LineData[i].Line,
		          		  'Cmp':LineData[i].ComCode,
		          		  'Dam':LineData[i].DamCode,
		          		  'Rep':LineData[i].RepCode,
		          		  'Locn':LineData[i].LocCode,
		          		  'Mat':LineData[0].MatCode,
		          		  'Repair Method & Component \nDescription':LineData[i].LineDesc,
		          		  'Lth':LineData[i].Length,
		          		  'Wth':LineData[i].Width,
		          		  'Qty':LineData[i].Qty,
		          		  'Hrs':LineData[i].Hours,
		          		  'Lab':LineData[i].LabCost,
		          		  'Mat Cost':LineData[i].MatCost,
		          		  'Total':LineData[i].TotCost,
		          		  'A1':LineData[i].Indicator,
		                });
				}
				var odnjsPResultFlex = odnjsP.createPrimaryLineItemForm();
				
				var oLModel = new sap.ui.model.json.JSONModel();
				oLModel.setData(LineData);
				var oDjnsLineTable = sap.ui.getCore().byId("dnjsLineItemTbl");
				oDjnsLineTable.setVisibleRowCount(LineData.length);
				oDjnsLineTable.setModel(oLModel);
				oDjnsLineTable.bindRows("/");
				
				var odnjsLineResultForm = sap.ui.getCore().byId("dnjsPrLineItems");
				odnjsLineResultForm.insertField(odnjsPResultFlex,0);
				
		   	}
		   	
		   	busyDialog.close();
		   },
		   function(err){
			   var strNoDataTbl5 = '<div class="sapUiTableCtrlEmpty custTblBgColor" tabindex="0"><span id="idspnNodataPrimDetTable5"'
		  		    strNoDataTbl5 += 'class="sapUiLbl custTblBgColor sapUiTableCtrlEmptyMsg">No data</span></div>'
		  		    sap.ui.getCore().byId('idhtmlNoDataPrimDetTable5').setContent(strNoDataTbl5);
			   
		   	errorfromServer(err);
		   	/*busyDialog.close();
		   	if(err.response.statusCode == "500"){
		   		sap.ui.commons.MessageBox.alert("Server Response Timeout");
		   		sap.ui.commons.MessageBox.show("Server Response Timeout",
			    			  sap.ui.commons.MessageBox.Icon.INFORMATION,
			    			  "Information",
			    			  [sap.ui.commons.MessageBox.Action.OK], 
			    			  sap.ui.commons.MessageBox.Action.OK
			    	);
		   	}
		   	else{
		   		//alert("Error while reading Repair Estimates : "+ window.JSON.stringify(err.response));
				    	sap.ui.commons.MessageBox.alert("Error while reading Repair Estimates : "+window.JSON.stringify(err.response));
		   	}*/
		   });
	},
	
	dateFormat:function(dateStr){
		var dateFormatted = dateStr;
		
		if(dateStr.length>0){
			if (dateStr.substring(6) === "9999"){
				dateFormatted =  "-";
            }
            else{
            	dateFormatted = dateStr;
            }
		}
		
		return dateFormatted;
	},
	
	makeHTMLTableLA:function(PrimData,PrimData1,PrimData2,PrimData3,PrimData4, LineData, title, btnTxt ){
		var html = "";
	     var count = 0;
	     
	     var urlNoHash = window.location.href.replace(window.location.hash,'');
	     var urlSplit = urlNoHash.split('/');
	     //var base = "http://";
	     var base = "";
	     if(urlSplit.length > 2){
	            for(var i=0; i<urlSplit.length - 1;i++){
	                   base = base + urlSplit[i]+"/";
	            }
	     }
	     
	     var tableWidth = 16;
	     var htmlTable="";
	   
	     // Table content
	    
       htmlTable +='<table border=0 cellspacing=0 style="color:#656465">';   // HTML Header - Start
       htmlTable += '<tr style="height:75px;border=1">'+
                    '<td colspan='+ (tableWidth - 2) +' style="padding-left:10px;font:bold 18px Arial;">' +title + '</td>'+
                    '<td style="border:none; padding:5px 5px 5px 0px" colspan=2 align ="right"><img src="' + base + 'images/login/login_logo.png"></img></td></tr>'; 
       //htmlTable += "</table>";   // HTML Header - End
       
		//////////////////////////////////////////////////////////////////
       htmlTable += '<tr  style="border:none;height:20px;"><td colspan='+ (tableWidth)+'></td></tr>';
		/////////////////////////////////////////////////////////////////
       
       htmlTable += '<tr>'; 
       if(PrimData1.length>0){
       	htmlTable += '<td valign="top" colspan='+ (5) +' style="padding-left:10px;">';
       	
       	htmlTable += '<table border=1 cellspacing=0 style="color:#656465">';
           //Create PrimData1 Table Headers
          /* htmlTable += "<tr>";
           count = 0;
           $.each(PrimData1, function(i, item) {
                  for (var key in item){
                        if(count == 0){
                               //alert("key : "+ key);
                               htmlTable += '<th style="font:bold 14px Arial;">'+key+'</th>';
                        }
                  }
                  count ++;
           });
           htmlTable += "</tr>";*/
           
           // Create PrimData1 Table Body
           $.each(PrimData1, function(i, item) {
                  htmlTable += "<tr>";
               for (var key in item){
                  //alert("key : "+ key);
                  htmlTable += '<td align=center style="font: 14px Arial;">'+item[key]+"</td>";
                  //console.log(key + ' = ' + item[key]);
               }
               htmlTable += "</tr>";
           });
           
           htmlTable += '</table>'; 
           htmlTable += '</td>';
       }
       
       if(PrimData2.length>0){
       	htmlTable += '<td valign="top" colspan='+ (5) +' style="padding-left:10px;">';
       	htmlTable += '<table border=1 cellspacing=0 style="color:#656465">';
           //Create PrimData2 Table Headers
          /* htmlTable += "<tr>";
           count = 0;
           $.each(PrimData2, function(i, item) {
                  for (var key in item){
                        if(count == 0){
                               //alert("key : "+ key);
                               htmlTable += '<th style="font:bold 14px Arial;">'+key+'</th>';
                        }
                  }
                  count ++;
           });
           htmlTable += "</tr>";*/
           
           // Create PrimData2 Table Body
           $.each(PrimData2, function(i, item) {
                  htmlTable += "<tr>";
               for (var key in item){
                  //alert("key : "+ key);
                  htmlTable += '<td align=center style="font: 14px Arial;">'+item[key]+"</td>";
                  //console.log(key + ' = ' + item[key]);
               }
               htmlTable += "</tr>";
           });
           htmlTable += '</table>'; 
           htmlTable += '</td>';
       }
       if(PrimData3.length>0){
          	htmlTable += '<td valign="top" colspan='+ (6) +' align = "center" style="padding-left:10px;">';
          	htmlTable += '<table border=1 cellspacing=0 style="color:#656465">';
              /*//Create PrimData3 Table Headers
              htmlTable += "<tr>";
              count = 0;
              $.each(PrimData3, function(i, item) {
                     for (var key in item){
                           if(count == 0){
                                  //alert("key : "+ key);
                                  htmlTable += '<th style="font:bold 14px Arial;">'+key+'</th>';
                           }
                     }
                     count ++;
              });
              htmlTable += "</tr>";*/
              
              // Create PrimData3 Table Body
              $.each(PrimData3, function(i, item) {
                     htmlTable += "<tr>";
                  for (var key in item){
                     //alert("key : "+ key);
                     htmlTable += '<td align=center style="font: 14px Arial;">'+item[key]+"</td>";
                     //console.log(key + ' = ' + item[key]);
                  }
                  htmlTable += "</tr>";
              });
              htmlTable += '</table>';
              htmlTable += '</td>';
          }
       htmlTable += '</tr>';
       
       
       ///////////////////////////////////////////////////////////////////////////////////////////
       htmlTable += '<tr  style="border:none;height:20px;"><td colspan='+ (tableWidth)+'></td></tr>';
       //////////////////////////////////////////////////////////////////////////////////////////
 
       htmlTable += '<tr>';
       if(PrimData4.length>0){
       	htmlTable += '<td colspan='+ (16) +' style="padding-left:10px;">';
       	htmlTable += '<table border=1 cellspacing=0 style="color:#656465">';
           //Create PrimData4 Table Headers
           htmlTable += "<tr>";
           count = 0;
           $.each(PrimData4, function(i, item) {
                  for (var key in item){
                        if(count == 0){
                               //alert("key : "+ key);
                               htmlTable += '<th style="font:bold 14px Arial;">'+key+'</th>';
                        }
                  }
                  count ++;
           });
           htmlTable += "</tr>";
           
           // Create PrimData4 Table Body
           $.each(PrimData4, function(i, item) {
                  htmlTable += "<tr>";
               for (var key in item){
                  //alert("key : "+ key);
                  htmlTable += '<td align=center style="font: 14px Arial;">'+item[key]+"</td>";
                  //console.log(key + ' = ' + item[key]);
               }
               htmlTable += "</tr>";
           });
           htmlTable += '</table>';
           htmlTable += '</td>';
       }
       htmlTable += '</tr>';
       
       
       ///////////////////////////////////////////////////////////////////////////////
       htmlTable += '<tr  style="border:none;height:20px;"><td colspan='+ (tableWidth)+'></td></tr>';
       /////////////////////////////////////////////////////////////////////////////////
       
       htmlTable += '<tr>';
       if(LineData.length>0){
       	htmlTable += '<td valign="top"colspan="16" style="padding-left:10px;">';
       	htmlTable += '<table border=1 cellspacing=0 style="color:#656465">';
           //Create LineData Table Headers
           htmlTable += "<tr>";
           count = 0;
           $.each(LineData, function(i, item) {
                  for (var key in item){
                        if(count == 0){
                               //alert("key : "+ key);
                               htmlTable += '<th style="font:bold 14px Arial;">'+key+'</th>';
                        }
                  }
                  count ++;
           });
           htmlTable += "</tr>";
           
           // Create LineData Table Body
           $.each(LineData, function(i, item) {
                  htmlTable += "<tr>";
               for (var key in item){
                  //alert("key : "+ key);
                  htmlTable += '<td style="font: 14px Arial;">'+item[key]+"</td>";
                  //console.log(key + ' = ' + item[key]);
               }
               htmlTable += "</tr>";
           });
           htmlTable += '</td>';
       }
       htmlTable += '</tr>';      
       
       
       //////////////////////////////////////////////////////////// END ////////////////////////////////////////
	                   
	   if(btnTxt == "print"){
	                   //alert("Print");
	              html +='<style>@page{size:landscape;}</style><html><head><title></title></head><body >';
                  //alert("Print");
                  html += "<div>";
                  html +=htmlTable+"</div>";
                  html +='</body></html>';
	                   
	            }else if(btnTxt == "export"){
	                   //alert("Export");
	                   var uri = 'data:application/vnd.ms-excel;base64,',
	                   template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">'
	                   +'<!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->'
	                   +'<head></head>'
	                   +'<body>'+htmlTable  +'</body></html>',
	             base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) },
	             format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }

	                   // Open Excel
	/*                   if (!table.nodeType) 
	                         table = document.getElementById(table)*/
	             var ctx = {worksheet: title || 'Worksheet', table: htmlTable};
	             //window.location.href = uri + base64(format(template, ctx));
	             if ((navigator.appName == 'Microsoft Internet Explorer') || (!!navigator.userAgent.match(/Trident.*rv[ :]*11\./)))
	           	    {
	     		            // var byteCharacters = atob(uri + base64(format(template, ctx)));
	     		            var blobObject = b64toBlob(base64(format(template, ctx)), 'application/vnd.ms-excel');
	     		            //window.navigator.msSaveBlob(blobObject, 'msSaveBlob_testFile.xls'); //only with save option
	     		            window.navigator.msSaveOrOpenBlob(blobObject, 'downloadfile.xls'); //save and open both option
	     	        }else
	           	    {
	           	    	 //window.location.href = uri + base64(format(template, ctx));
	     	        	window.open(uri + base64(format(template, ctx)));
	           	    }
	            }    

	            return html;
	     },
	
	
	
});
	





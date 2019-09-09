jQuery.sap.require("sap.ui.model.json.JSONModel");
var releaseController;
var oRelease;
var releaseRefResultData = [];
var releaseRefResultSummaryData = [];
var jsonReleaseSum = [];
var releaseRefData = {
		   refNos:[  ]
};
sap.ui.model.json.JSONModel.extend("releaseSearch", {
	createReleaseSearch: function(oController){
		
		var oreleaseAuto = new releaseAutoMulti();
		oreleaseAuto.bindAutoUnit();
		
		oRelease = this;
		releaseController = oController;
		
		var confirmMessage = "This will reset all the search Release inputs so far. Do you want to continue?";
		
		var labHardCode =  new sap.ui.commons.Label({text:"Depot Code:",
			wrapping: true,
			required:true,
		});
		
		var HrdFlex = new sap.m.FlexBox({ items: [  labHardCode ],  direction: "Column"	,
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: false})});
		
		var labReleaseRef1 = new sap.ui.commons.Label({text: "Release Reference:",
			wrapping: true});
		var labReleaseRef2 = new sap.ui.commons.Label({text: "Enter 1 release reference per line. Maximum 25 entries",
			wrapping: true}).addStyleClass("font10");
		var labReleaseRef3 = new sap.ui.commons.Label({text: 'Press "Enter" to go to next line',
			wrapping: true}).addStyleClass("font10");
		
		var refFlex = new sap.m.FlexBox({ items: [  labReleaseRef1, labReleaseRef2, labReleaseRef3 ],  direction: "Column"	,
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: false})}).addStyleClass("marginTop10");
		
		var labPeriod = new sap.ui.commons.Label({text: "Period:",
			wrapping: true,
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: false})}).addStyleClass("marginTop10");
		
		var labStatus = new sap.ui.commons.Label({text: "Status:",
			wrapping: true,
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: false})}).addStyleClass("marginTop10");
		
		var labUnitType = new sap.ui.commons.Label({text: "Unit Type:",
			wrapping: true,
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: false})}).addStyleClass("marginTop10");
		
		var oUser =  new loggedInU();
		var uId = "";
		var utype = oUser.getLoggedInUserType();
		var isEnabled = false;
		if(($.inArray(utype, ["DEPOT","FACTORY"])) != -1){
			uId = oUser.getLoggedInUserID();
			isEnabled = false;
		}
		else
			isEnabled = true;
		
		var txtHardCode = new sap.ui.commons.TextField("releaseHardCode",{
			layoutData: new sap.ui.layout.GridData({span: "L1 M2 S8"}),
			placeholder: "Depot Code",
			enabled:isEnabled,
			value:uId,
			liveChange:function(oControlEvent){
				txtHardCode.setPlaceholder("Depot Code");
				txtHardCode.setValueState(sap.ui.core.ValueState.None);
			},
		}).addStyleClass("FormInputStyle");
		
		var oTest = new sap.ui.table.Table("TestTbl",{
	        visibleRowCount: 5,
	        firstVisibleRow: 1,
	        columnHeaderHeight: 30,
	        selectionMode: sap.ui.table.SelectionMode.None,
	        navigationMode: sap.ui.table.NavigationMode.Scrollbar,
	        //width: "80%",
	       // height:"100%",
		});
		
		oTest.setToolbar(new sap.ui.commons.Toolbar({items: [ 
      	    new sap.m.Button({
      	    	text: "Add", 
      	    	press: function(oEvent) {
      	    		//oDialog.open();
      	    		var len =  releaseRefData.refNos.length;
      	    		if(len <25){
      	    			releaseRefData.refNos.push({
        	          		  'id': "'"+len+"'",
        	            	  'referenceNo':"",
        	            	  'isValid': 'None',
        	            	  'placeHolder':"Added New",
        			    	});
      	    		}
      	    		oModel.updateBindings();
      	    		oTest.setVisibleRowCount(releaseRefData.refNos.length);
      	    	}
      	    }) 
		]}));
		
		oTest.addColumn(new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "Test"}),
	        template: new sap.ui.commons.TextField().bindProperty("value", "referenceNo"),
	        /*sortProperty: "UnitType",
	        width:"10%",
	        resizable:false,
	        filterProperty: "UnitType",*/
		}));
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setData({modelData: releaseRefData.refNos});
		oTest.setModel(oModel);
		oTest.bindRows("/modelData");
		
		var tblReleaseRef = new sap.ui.commons.TextArea('releaseRefTbl',{
	         layoutData: new sap.ui.layout.GridData({span: "L4 M9 S12"}),
	                     rows:25,
	                     cols:30,
	                     height:"145px",
	                     placeholder:"Release Reference",
	              }).addStyleClass("marginTop10");
		//tblReleaseRef.setMaxLength(322);
		tblReleaseRef.setMaxLength(248);
		
		var rgPeriod;
		var browser = sap.ui.Device.browser.chrome;
		if(browser){
			 rgPeriod = new sap.ui.commons.RadioButtonGroup("releasePeriod",{
		        columns :4,
		        selectedIndex : 4,
		        layoutData: new sap.ui.layout.GridData({span: "L10 M10 S12"}),
		        select : function() {
		        	//alert('RadioButton ' + rgPeriod.getSelectedItem().getText());
		        }
		    }).addStyleClass("marginTop10");
		}
		else{
			 rgPeriod = new sap.ui.commons.RadioButtonGroup("releasePeriod",{
		        columns :4,
		        selectedIndex : 4,
		        layoutData: new sap.ui.layout.GridData({span: "L6 M6 S12"}),
		        select : function() {
		        	//alert('RadioButton ' + rgPeriod.getSelectedItem().getText());
		        }
		    }).addStyleClass("marginTop10");
		}
		
		var oItem = new sap.ui.core.Item({
		        text : "Today", key : "00"});
		rgPeriod.addItem(oItem);
		oItem = new sap.ui.core.Item({
		        text : "Yesterday", key : "01"});
		rgPeriod.addItem(oItem);
		oItem = new sap.ui.core.Item({
		        text : "This Week", key : "07"});
		rgPeriod.addItem(oItem);
		oItem = new sap.ui.core.Item({
		        text : "Last Week", key : "14"});
		rgPeriod.addItem(oItem);
		oItem = new sap.ui.core.Item({
		        text : "This Month", key : "30"});
		rgPeriod.addItem(oItem);
		oItem = new sap.ui.core.Item({
		        text : "Last Month", key : "31"});
		rgPeriod.addItem(oItem);
		oItem = new sap.ui.core.Item({
	        	text : "Last 3 Months", key : "90"});
		rgPeriod.addItem(oItem);
		
		var rgStatus = new sap.ui.commons.RadioButtonGroup("releaseStatus",{
	        columns : 4,
	        selectedIndex : 0,
	        layoutData: new sap.ui.layout.GridData({span: "L10 M10 S12"}),
	        select : function() {
	        	//alert('RadioButton ' + rgStatus.getSelectedItem().getText());
	        }
	    }).addStyleClass("marginTop10");
		var oItem2 = new sap.ui.core.Item({
		        text : "All", key : "ALL"});
		rgStatus.addItem(oItem2);
		oItem2 = new sap.ui.core.Item({
		        text : "Release Docs Sent", key : "REL"});
		rgStatus.addItem(oItem2);
		oItem2 = new sap.ui.core.Item({
		        text : "Expired", key : "EXP"});
		rgStatus.addItem(oItem2);
		oItem2 = new sap.ui.core.Item({
		        text : "Cancelled", key : "CAN"});
		rgStatus.addItem(oItem2);
		
		var oAutoUnitType = new control.AutoCompleteValueHolder('AutoUnitTypeRel', {
            layoutData: new sap.ui.layout.GridData({span: "L4 M9 S12"}),
            enabled: true,
            placeholder: "Unit Type",
            //itemSelectLimit: 1, // No limit
            selectedItem: function (event) {
            },
            deletedItem: function (event) {
            },
            deletedAllItems: function (event) {
            }
        });
        oAutoUnitType.addStyleClass("marginTop10");

		
		var btnSubmit = new sap.m.Button({
	          text : "Submit",
	          styled:false,
	          width:"80px",
	          layoutData: new sap.ui.layout.GridData({span: "L1 M3 S4"}),
	          press:function(){
	        	  //alert("Submit CLicked");
	        	  if(oRelease.validateHardCode()){
	        		  busyDialog.open();
		        	  releaseController.submitReleaseClicked();  
	        	  }
 
	          }
		}).addStyleClass("submitBtn");
	
		
		var btnReset = new sap.m.Button({
	          text : "Reset",
	          styled:false,
	          width:"80px",
	          layoutData: new sap.ui.layout.GridData({span: "L1 M3 S4"}),
	          press:function(){
	        	  jQuery.sap.require("sap.ui.commons.MessageBox");
	        	  sap.ui.commons.MessageBox.show(confirmMessage,
    			  sap.ui.commons.MessageBox.Icon.WARNING,
    			  "Warning",
    			  [sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO], 
    			  oRelease.fnCallbackMessageBox,
    			  sap.ui.commons.MessageBox.Action.YES);
	          }
		}).addStyleClass("submitBtn");
		
		var lblSpace = new sap.ui.commons.Label( {text: " ",width : '8px'});
        
        var oFlexboxButtons = new sap.m.FlexBox({
          items: [
            btnSubmit,lblSpace,
            btnReset
          ],
          direction: "Row",
        }).addStyleClass("margin10");

        var labStar = new sap.ui.commons.Label({text: "* "}).addStyleClass("MandatoryStar");
	    var lblSpaceLegend = new sap.ui.commons.Label( {text: " ",width : '5px'});
	    var labRequired = new sap.ui.commons.Label({text: " Mandatory Field",wrapping: true});
		var oFlexboxReq = new sap.m.FlexBox({
				 // layoutData: new sap.ui.layout.GridData({span: "L7 M6 S4"}),
	              items: [labStar,lblSpaceLegend,labRequired],
	              direction: "Row"
		});
		
		var oReleaseSearchLayout = new sap.ui.layout.form.ResponsiveGridLayout("ReleaseSearchLayout", {
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
		var oReleaseSearchForm = new sap.ui.layout.form.Form("ReleaseSearchF1",{
            layout: oReleaseSearchLayout,
            formContainers: [
                    new sap.ui.layout.form.FormContainer("ReleaseSearchF1C1",{
                    	title: new sap.ui.core.Title({text: "Search By / View By"}),
                        formElements: [
								/*new sap.ui.layout.form.FormElement({
									fields: [oTest],
									layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
								}),*/
								new sap.ui.layout.form.FormElement({
									fields: [HrdFlex, txtHardCode /*HardCodeFlex*/],
									layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
								}),
                                new sap.ui.layout.form.FormElement({
                                    //label: "Release Reference",
                                    fields: [refFlex,tblReleaseRef ],
                                    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                                }),
                                new sap.ui.layout.form.FormElement({
                                    //label: "Period",
                                    fields: [labPeriod,rgPeriod ],
                                    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                                }),
                                new sap.ui.layout.form.FormElement({
                                    //label: "Status",
                                    fields: [labStatus,rgStatus ],
                                    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                                }),
                                new sap.ui.layout.form.FormElement({
                                    //label: "Unit type",
                                    fields: [labUnitType,oAutoUnitType ],
                                    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                                }),
                                
                        ],layoutData: new sap.ui.layout.GridData({span: "L12 M12 S8"})
                    }),
                   new sap.ui.layout.form.FormContainer("ReleaseSearchF1C2",{
						formElements: [
							new sap.ui.layout.form.FormElement({
								fields: [
								
								]
							})
						],layoutData: new sap.ui.layout.GridData({span: "L1 M1 S1"})
					}),
                    new sap.ui.layout.form.FormContainer("ReleaseSearchF1C3",{
                        formElements: [
                                new sap.ui.layout.form.FormElement({
                                    fields: [oFlexboxButtons],
                                }),
                                new sap.ui.layout.form.FormElement({
                                    fields: [oFlexboxReq],
                                    layoutData: new sap.ui.commons.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                                })
                       ]
                    })
            ]
    });
		var oReleaseResultLayout = new sap.ui.layout.form.ResponsiveGridLayout("ReleaseResultLayout", {
		});	
	var oReleaseResultForm = new sap.ui.layout.form.Form("ReleaseResultF1",{
            layout: oReleaseResultLayout,
            formContainers: [
                    new sap.ui.layout.form.FormContainer("ReleaseResultF1C1",{
                        formElements: [
                                new sap.ui.layout.form.FormElement("releaseResults",{
                                    fields: [],
                                })
                       ],layoutData: new sap.ui.commons.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                    })
            ]
    });
	var vHDivider = new sap.ui.commons.HorizontalDivider({width: "95%", type: "Area", height: "Medium"}); 

	var oReleaseFlexbox = new sap.m.FlexBox({
		  items: [
		    oReleaseSearchForm,
		    vHDivider,
		    oReleaseResultForm
		  ],
		  direction: "Column"
		});
	return oReleaseFlexbox;
	},

	
	
	fnCallbackMessageBox:function(sResult) {
		//alert("Reset");
		if(sResult == "YES"){
			releaseController.resetReleaseClicked();
		}
	},
	
	
	setReleaseDetailsTable:function(){
		var oreleaseResultTable = new sap.ui.table.Table("releaseResultTable",{
	        visibleRowCount: 5,
	        firstVisibleRow: 1,
	        columnHeaderHeight: 40,
	        selectionMode: sap.ui.table.SelectionMode.None,
	        navigationMode: sap.ui.table.NavigationMode.Paginator,
	        //width: "80%",
	       // height:"100%",
		}).addStyleClass("tblBorder marginTop10");

		oreleaseResultTable.addColumn(new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "Release Reference"}).addStyleClass("wraptextcol"),
	        template: new sap.ui.commons.Link({
				press : function() {
					
					seletedRelRefNo = this.getText();
					selectedRelUnit = this.getHelpId();
					//alert("link clicked : "+ seletedRelRefNo + " "+selectedRelUnit);
					releaseController.linkReleaseDetailClicked();
				}
			}).bindProperty("text", "RelaseNo").bindProperty("helpId","UnitType"),
	        sortProperty: "RelaseNo",
	        width:"18%",
	        resizable:false,
	        filterProperty: "RelaseNo",
		}));
		oreleaseResultTable.addColumn(new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "Unit Type"}).addStyleClass("wraptextcol"),
	        template: new sap.ui.commons.TextView().bindProperty("text", "UnitType"),
	        sortProperty: "UnitType",
	        width:"10%",
	        resizable:false,
	        filterProperty: "UnitType",
		}));
		oreleaseResultTable.addColumn(new sap.ui.table.Column({
		        label: new sap.ui.commons.Label({text: "Customer"}).addStyleClass("wraptextcol"),
		        template: new sap.ui.commons.TextView().bindProperty("text", "CustNam"),
		        sortProperty: "CustNam",
		        width:"20%",
		        resizable:false,
		        filterProperty: "CustNam",
		}));
		
		var oTotalCol = new sap.ui.table.Column({
		        label: new sap.ui.commons.Label({text: "Total Quantity"}).addStyleClass("wraptextcol"),
		        template: new sap.ui.commons.TextView().bindProperty("text", "Quantity"),
		        sortProperty: "Quantity",
		        width:"15%",
		        resizable:false,
		        filterProperty: "Quantity"
		});
		var oUtil = new utility();
		oreleaseResultTable.addColumn(oTotalCol);
		oUtil.addColumnSorterAndFilter(oTotalCol, oUtil.compareUptoCount);
		
		var oOutCol = new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "Outstanding Quantity"}).addStyleClass("wraptextcol"),
	        template: new sap.ui.commons.TextView().bindProperty("text", "OutstQuant"),
	        sortProperty: "OutstQuant",
	        width:"23%",
	        resizable:false,
	        filterProperty: "OutstQuant"
		});
		oreleaseResultTable.addColumn(oOutCol);
		oUtil.addColumnSorterAndFilter(oOutCol, oUtil.compareUptoCount);
		
		oreleaseResultTable.addColumn(new sap.ui.table.Column({
	        label: new sap.ui.commons.Label({text: "Expiry Date"}).addStyleClass("wraptextcol"),
	        template: new sap.ui.commons.TextView().bindProperty("text", "ExpDate"),
	        sortProperty: "ExpDateActual",
	        width:"14%",
	        resizable:false,
	        filterProperty: "ExpDate"
		}));
		
		var btnPrint = new sap.m.Button({
	          text : "Print",
	          type:sap.m.ButtonType.Unstyled,
	          icon: sap.ui.core.IconPool.getIconURI("print"),
	          press:function(){
	        	  //alert("Print CLicked");
	        	  var tab = objUtil.makeHTMLTable(jsonReleaseSum, "Releases","print");
	        	  var newWin = window.open();
	        	  newWin.document.write(tab);
	        	  newWin.print();
	        	  //oController.submitReleaseClicked();
	          }
		}).addStyleClass("submitBtn");
	
		
		var btnExport = new sap.m.Button({
	          text : "Export To Excel",
	          type:sap.m.ButtonType.Unstyled,
	          icon: sap.ui.core.IconPool.getIconURI("excel-attachment"),
	          press:function(){
	        	  //alert("Export to Excel");
	        	  objUtil.makeHTMLTable(jsonReleaseSum, "Releases","export");
	          }
		}).addStyleClass("submitBtn");
		
		var btnViewAll = new sap.m.Button("ReleaseViewAll",{
	          text : "View All",
	          type:sap.m.ButtonType.Unstyled,
	          visible:false,
	          width:"80px",
	          //icon: sap.ui.core.IconPool.getIconURI("excel-attachment"),
	          press:function(){
	        	  //alert("View All");
	        	  this.setVisible(false);
	        	  if(sap.ui.getCore().byId("releaseResultTable")){
	        		  var oreleaseResultTable = sap.ui.getCore().byId("releaseResultTable");
		        	  if (releaseRefResultSummaryData.length < 100){
		  					oreleaseResultTable.setVisibleRowCount(releaseRefResultSummaryData.length);
		  					oreleaseResultTable.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		  					//sap.ui.getCore().byId("ReleaseViewAll").setVisible(false);
		  				}else{
		  					oreleaseResultTable.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		  					oreleaseResultTable.setVisibleRowCount(100);
		  					//sap.ui.getCore().byId("ReleaseViewAll").setVisible(true);
		  				}  
	        	  }
	          }
		}).addStyleClass("submitBtn");
		
		
		var oReleaseDetailsToolbar = new sap.m.FlexBox({
			  items: [
			    btnExport,
			    btnPrint
			  ],
			  direction: "RowReverse"
		});
		
		
		var oReleaseFooter = new sap.m.FlexBox({
			  items: [
			    btnViewAll
			  ],
			  direction: "Row"
		}).addStyleClass("marginTop10");
		
		var oReleaseDetailsFlex = new sap.m.FlexBox("releaseDetailsFlex",{
			  items: [
			    //oReleaseDetailsToolbar,
			    oreleaseResultTable,
			    oReleaseFooter
			  ],
			  direction: "Column",
			  width: "80%",
		});
		
		return oReleaseDetailsFlex;
	},
	
	
	
	bindReleaseDetails:function(){
		var partner = sap.ui.getCore().byId("releaseHardCode").getValue();
		var period = sap.ui.getCore().byId("releasePeriod").getSelectedItem().getKey();
		var status = sap.ui.getCore().byId("releaseStatus").getSelectedItem().getKey();
		var unitType = "";
		var selUnitType = sap.ui.getCore().byId('AutoUnitTypeRel').getSelectedValues();
		for(var i in selUnitType)
			unitType += selUnitType[i].description +',';

		unitType = unitType.slice(0,-1);
		
		
		var refNosValue = (sap.ui.getCore().byId("releaseRefTbl").getValue()).trim();
		var refNos = sap.ui.getCore().byId("releaseRefTbl").getValue().split(/\n/g);
	   // var unitNumbrsEntered = enteredRelReference.length;
		//alert("Entered Rel Ref No :"+refNos[0]);
    	var releaseRef1 = "";
    	var releaseRef2 = "";
    	
    	if(refNosValue.length > 0){
    		//alert(" trim : "+refNosValue.length);
    		
    		if(refNos.length>13){
        		for(var i=0;i<13;i++){
        			releaseRef1 = releaseRef1 + refNos[i]+",";
            	}
        		if(refNos.length<25){
        			for(var j=13;j<refNos.length;j++){
        				releaseRef2 = releaseRef2 + refNos[j]+",";
            		}
        		}else{
        			for(var k=13;k<25;k++){
        				releaseRef2 = releaseRef2 + refNos[k]+",";
            		}
        		}
        		
        	}else{
        		for(var k=0;k<refNos.length;k++){
        			releaseRef1 = releaseRef1 + refNos[k]+",";
            	}
        	}
    	}
    	
		
    	//alert("period: "+period+ " status :"+status+" unit type : "+unitType+" partner : "+ partner + " Relse : "+ releaseRef1 + "Relse2 : "+releaseRef2);
    	var filter = "/Release_Summary_Detail?$filter=IPartner eq '"+partner+"' and IReleaseNo eq '"+releaseRef1+
    	             "' and IReleaseNo1 eq '"+releaseRef2+"' and IPeriod eq '"+period+"' and IStatus eq '"+status+"' and IUnitType eq '"+unitType+"'";
    	
    	//alert("Str : "+serviceUrl+filter);
    	
    	
    	
    	oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
  		OData.request({ 
  			//requestUri: "http://seanwgd1.gessap.local:8000/sap/opu/odata/sap/ZNW_SEACO_PORTAL_SRV/Release_Summary_Detail?$filter=IPartner eq '1422' and IReleaseNo eq '214752' and IReleaseNo1 eq '' and IPeriod eq '90' and IStatus eq 'REL' and IUnitType eq ''",
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
  		    	
  		    	if(data.results.length>0){
  		    		jsonReleaseSum = [];
  		    		
  		    		releaseRefResultData = data.results;
  		    		//alert("length of data : "+ releaseRefResultData.length);

		    		if(sap.ui.getCore().byId("releaseDetailsFlex")){
		    			sap.ui.getCore().byId("releaseDetailsFlex").destroy();
		    		}
  		    		
		    		for(var i=0; i<releaseRefResultData.length;i++){
		    			releaseRefResultData[i].Quantity = Math.floor(releaseRefResultData[i].Quantity);
		    			releaseRefResultData[i].OutstQuant = Math.floor(releaseRefResultData[i].OutstQuant);
		    			releaseRefResultData[i].RelaseNo = releaseRefResultData[i].RelaseNo.replace(/^0+/, '');
		    			releaseRefResultData[i].LeaseNo = releaseRefResultData[i].LeaseNo.replace(/^0+/, '');
	    				
		    			// Expiry Date
		    			var vDocDateResult = releaseRefResultData[i].ExpDate.split("(");
  	                    var vDocDate = vDocDateResult[1].split(")");
  	                    var vActualDate = new Date(Number(vDocDate[0])); 
  	                    var vformattedDocDate = dateFormat(new Date(Number(vDocDate[0])), 'dd-mm-yyyy',"UTC");
  	                    //this is to check if the date is default 999 something show blank
  	                    if (vformattedDocDate.substring(6) == "9999"){
  	                    	releaseRefResultData[i].ExpDate =  "-";
  	                    }
  	                    else{
  	                    	releaseRefResultData[i].ExpDate = vformattedDocDate;
  	                    }
  	                    
  	                    releaseRefResultData[i]["ExpDateActual"] = vActualDate;
  	                  
  	                    // Gate In Out  Date
  	                    var vDocDateResult = releaseRefResultData[i].GateOutDate.split("(");
	                    var vDocDate = vDocDateResult[1].split(")");
	                    var vActualDate = new Date(Number(vDocDate[0])); 
	                    var vformattedDocDate = dateFormat(new Date(Number(vDocDate[0])), 'dd-mm-yyyy',"UTC");
	                    //this is to check if the date is default 999 something show blank
	                    if (vformattedDocDate.substring(6) == "9999"){
	                    	releaseRefResultData[i].GateOutDate =  "-";
	                    }
	                    else{
	                    	releaseRefResultData[i].GateOutDate = vformattedDocDate;
	                    }
	                    releaseRefResultData[i]["GateOutDateActual"] = vActualDate;
	                    
	                    // Manuf Date
	                    var vDocDateResult = releaseRefResultData[i].MfdDate.split("(");
	                    var vDocDate = vDocDateResult[1].split(")");
	                    var vActualDate = new Date(Number(vDocDate[0]));
	                    var vformattedDocDate = dateFormat(new Date(Number(vDocDate[0])), 'dd-mm-yyyy',"UTC");
	                    //this is to check if the date is default 999 something show blank
	                    if (vformattedDocDate.substring(4) == "9999"){
	                    	releaseRefResultData[i].MfdDate =  "-";
	                    }
	                    else{
	                    	releaseRefResultData[i].MfdDate = vformattedDocDate;
	                    }
	                    releaseRefResultData[i]["MfdDateActual"] = vActualDate;
	                    
	    			}
		    		
		    		releaseRefResultSummaryData = jQuery.grep(releaseRefResultData, function(element, index){
  	  		            return element.SumFlag == "X";
  		    		});
		    		for(var i = 0; i<releaseRefResultSummaryData.length;i++){
		    			//alert(i);
		    			// make Custom JSON for Table - Excel/Print
	  	                  jsonReleaseSum.push({
  	                		  'Release Reference':releaseRefResultSummaryData[i].RelaseNo,
  	                		  'Unit Type':releaseRefResultSummaryData[i].UnitType,
  	                		  'Customer':releaseRefResultSummaryData[i].CustNam,
  	                		  'Total Quantity':releaseRefResultSummaryData[i].Quantity,
  	                		  'Outstanding Quantity':releaseRefResultSummaryData[i].OutstQuant,
  	                		  'Expiry Date':releaseRefResultSummaryData[i].ExpDate,
	  	                  });
		    		}
  		    		//alert("length of summary data : "+ releaseRefResultSummaryData.length);
  		    		
  		    		releaseRefResultDetailsData = jQuery.grep(releaseRefResultData, function(element, index){
  	  		            return element.DelFlag == "X";
  		    		});
  		    		//alert("length of detail data : "+ releaseRefResultDetailsData.length);
  		    		
		    		var oreleaseResultFlex = oRelease.setReleaseDetailsTable();
		    		
		    		var oReleaseResultModel = new sap.ui.model.json.JSONModel();
	  				oReleaseResultModel.setData(releaseRefResultSummaryData);
	  				var oreleaseResultTable = sap.ui.getCore().byId("releaseResultTable");
	  				oreleaseResultTable.setModel(oReleaseResultModel);
	  				oreleaseResultTable.bindRows("/");
	  				
	  				if (releaseRefResultSummaryData.length < 25){
	  					oreleaseResultTable.setVisibleRowCount(releaseRefResultSummaryData.length);
	  					oreleaseResultTable.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
	  					sap.ui.getCore().byId("ReleaseViewAll").setVisible(false);
	  				}else{
	  					oreleaseResultTable.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
	  					oreleaseResultTable.setVisibleRowCount(25);
	  					sap.ui.getCore().byId("ReleaseViewAll").setVisible(true);
	  				}
	  				
	  				var oReleaseResultForm = sap.ui.getCore().byId("releaseResults");
	  				oReleaseResultForm.insertField(oreleaseResultFlex,0);
	  				busyDialog.close();
  		    	}else{
  		    		busyDialog.close();
  		    		sap.ui.commons.MessageBox.alert("No Results Found. Please edit / refine your search criteria and search again.");
  		    		if(sap.ui.getCore().byId("releaseDetailsFlex")){
		    			sap.ui.getCore().byId("releaseDetailsFlex").destroy();
		    		}
  		    	}
  		    },
  		    function(err){
  		    	errorfromServer(err);
  		    	//busyDialog.close();
  		    	/*sap.ui.commons.MessageBox.show("Server Response Timeout. Please try again.",
		    			  sap.ui.commons.MessageBox.Icon.INFORMATION,
		    			  "Information",
		    			  [sap.ui.commons.MessageBox.Action.OK], 
		    			  sap.ui.commons.MessageBox.Action.OK
		    	);*/
  		    	/*if(err.response.statusCode == "500"){
  		    		sap.ui.commons.MessageBox.alert("Server Response Timeout");
  		    		
  		    		sap.ui.commons.MessageBox.show("Server Response Timeout. Please try again.",
  		    			  sap.ui.commons.MessageBox.Icon.INFORMATION,
  		    			  "Information",
  		    			  [sap.ui.commons.MessageBox.Action.OK], 
  		    			  sap.ui.commons.MessageBox.Action.OK
  		    		);
  		    	}
  		    	else{
  		    		//alert("Error while reading Release : "+ window.JSON.stringify(err.response));
  		    		sap.ui.commons.MessageBox.alert("Error while reading Release : "+window.JSON.stringify(err.response));
  		    	}*/
  		    });
	},
	gotoReleaseRefDetails:function(){
		//alert("in goto" + selctedRefNo);
		selRefData = jQuery.grep(releaseRefResultData, function(element, index){
	            return element.DelFlag == "X" && element.RelaseNo == seletedRelRefNo && element.UnitType == selectedRelUnit;
  		});
		
		
		//alert("Selc Ref data "+ selRefData.length);
		if(selRefData.length > 0){
			var bus = sap.ui.getCore().getEventBus();
			bus.publish("nav", "to", {
					id : "ReleaseDetail"
			});
			$('#idHdrContnt').html('Release Reference Details'); //CHANGE HEADER CONTENT
			var oReleaseSearchDetail = new releaseReferenceDetails();
			var screenflex = sap.ui.getCore().byId("oReleaseRefDetailScreenFlex");
			if(screenflex)
				screenflex.destroyItems();
			
			oReleaseSearchDetail.createReleaseRefDetails();
			oReleaseSearchDetail.bindReleaseRefDetails();
		}else{
			sap.ui.commons.MessageBox.alert("No data available for Release Reference Number : "+ seletedRelRefNo);
		}
		
	},
	
	validateHardCode:function(){
		var isValid = true;
		if(sap.ui.getCore().byId("releaseHardCode").getValue() == ""){
			sap.ui.getCore().byId("releaseHardCode").setValueState(sap.ui.core.ValueState.Error);
			sap.ui.getCore().byId("releaseHardCode").setPlaceholder("Required");
			isValid = false;
		}
	
		return isValid;
	}
	
	
	
});
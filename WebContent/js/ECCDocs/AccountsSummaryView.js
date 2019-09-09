/*
 * 
 
Information: This file is created by Seyed Ismail MAC on 26.09.2014
*$*$------------------------------------------------------------------------*
*$*$ Modified By : Seyed Ismail MAC
*$*$ Modified On : 16.01.2015
*$*$ Reference   : RTS 1002
*$*$ Transport   : CGWK900792
*$*$ Tag         : MAC16012015
*$*$ Purpose     : To resolve ECC docs issue
*$*$---------------------------------------------------------------------
**/

var oModelECCDocs = new sap.ui.model.json.JSONModel();
var ECCDocsData = {
		AllData:[],
		SummaryData:[],
		DetailData:[],
};
var vRdBtnSel; 				//MAC16012015 +
var jsonAmountDetailECC = [];
var vBranchCount = 0;
/*temp*/
var LoggedInUserTypeAccSumm = "";
var vVendorCodeECCDocAccSumm = "";
sap.ui.model.json.JSONModel.extend("accountsSummaryView", {
	createAccountsSummary: function(){
		var oCurrent = this;
		$('#idHdrContent').html('Accounts Summary');	//CHANGE HEADER CONTENT
		
		/*temp start*/
		 var oLabelDepotCode = new sap.ui.commons.Label("idLblDepotCodeAccountsummary",{required:true,
			 text:"Depot Code: ",
      	   layoutData: new sap.ui.layout.GridData({span: "L5 M3 S4",linebreak: true, margin: false})
         }).addStyleClass("marginTop10");
		 
		 var vTxtFDepotCode = new sap.ui.commons.TextField("idDepotCodeAccountSummary",{
				width : '10em',
				placeholder:"Depot Code",
				liveChange:function(){
					this.setValueState(sap.ui.core.ValueState.None);
					//this.setPlaceholder("Depot code");
				},
				layoutData: new sap.ui.layout.GridData({span: "L5 M3 S12"}),linebreak: false, margin: false
		}).addStyleClass("FormInputStyle marginTop10");
		 
		 var oBtnAccountSubmit =  new sap.m.Button("idBtnAccountSubmit",{
	          text : "Submit",
	         styled:false,
	         width:"80px",
	          layoutData: new sap.ui.layout.GridData({span: "L5 M3 S4",linebreak: false, margin: false}),
	          press:function(){
	        	  if(sap.ui.getCore().byId("idDetailFlexbox"))
	  				sap.ui.getCore().byId("idDetailFlexbox").destroy();
	        	  vVendorCodeECCDocAccSumm = sap.ui.getCore().byId("idDepotCodeAccountSummary").getValue();
	        	   if(vVendorCodeECCDocAccSumm == ""){
	        		   sap.ui.getCore().byId("idDepotCodeAccountSummary").setValueState(sap.ui.core.ValueState.Error);
	        		   sap.ui.getCore().byId("idDepotCodeAccountSummary").setPlaceholder("Required");
	       			   return false;
	        	   }
	        	   else{
	        		   // sap.ui.getCore().byId("idRdBtnGrpMonthAccSumm").setSelectedIndex(0);  //MAC16012015-
					   vRdBtnSel = radioBtnMonthPeriod.getSelectedItem().getKey();     //MAC16012015+
	        		   oCurrent.getAccountDetails(vRdBtnSel,vVendorCodeECCDocAccSumm);
	        	   }
	        	  }
          }).addStyleClass("submitBtn margin10");
		 
		  var lblSpaceLegend1 = new sap.ui.commons.Label("idLblSpaceAccSumm",{text: " ",width : '5px'});
		  
		 /*temp end*/
		 
		 var oBtnAccountRefresh =  new sap.m.Button("idBtnAccountRefresh",{
	          text : "Refresh",
	         styled:false,
	         width:"80px",
	          layoutData: new sap.ui.layout.GridData({span: "L5 M3 S4",linebreak: false, margin: false}),
	          press:function(){
	        	  if(sap.ui.getCore().byId("idDetailFlexbox"))
	  				sap.ui.getCore().byId("idDetailFlexbox").destroy();
	        	  vVendorCodeECCDocAccSumm = sap.ui.getCore().byId("idDepotCodeAccountSummary").getValue();
	        	   if(vVendorCodeECCDocAccSumm == ""){
	        		   sap.ui.getCore().byId("idDepotCodeAccountSummary").setValueState(sap.ui.core.ValueState.Error);
	        		   sap.ui.getCore().byId("idDepotCodeAccountSummary").setPlaceholder("Required");
	       			   return false;
	        	   }
	        	   else{
	        		   //sap.ui.getCore().byId("idRdBtnGrpMonthAccSumm").setSelectedIndex(0);	//MAC16012015-
					   vRdBtnSel = radioBtnMonthPeriod.getSelectedItem().getKey();     //MAC16012015+
	        		   oCurrent.getAccountDetails(vRdBtnSel,vVendorCodeECCDocAccSumm);
	        	   }
	        	  }
         }).addStyleClass("submitBtn margin10");
		
		 var labStar = new sap.ui.commons.Label({text: "* "}).addStyleClass("MandatoryStar");
	       var lblSpaceLegend = new sap.ui.commons.Label( {text: " ",width : '5px'});
			  var labRequired = new sap.ui.commons.Label({text: " Mandatory Field",wrapping: true});
			  var oFlexboxReq = new sap.m.FlexBox({
				 // layoutData: new sap.ui.layout.GridData({span: "L7 M6 S4"}),
	              items: [labStar,lblSpaceLegend,labRequired],
	              direction: "Row"
			  });
			  
		 var oFlexboxButtonsAccSumm = new sap.m.FlexBox({
    	      items: [
    	        oBtnAccountSubmit,lblSpaceLegend1,
    	        oBtnAccountRefresh
    	      ],
    	      direction: "Row",
    	    }).addStyleClass("margin10");
		 
		// Radio Buttons
	    var radioBtnMonthPeriod = new sap.ui.commons.RadioButtonGroup("idRdBtnGrpMonthAccSumm",{
            columns : 4,
            selectedIndex : 0,
            select : function() {
            	if(sap.ui.getCore().byId("idDetailFlexbox"))
				sap.ui.getCore().byId("idDetailFlexbox").destroy();
            	ECCDocsData.SummaryData = [];
            	ECCDocsData.DetailData = [];
            	//var vRdBtnSel = radioBtnMonthPeriod.getSelectedItem().getKey();			//MAC16012015-
				vRdBtnSel = radioBtnMonthPeriod.getSelectedItem().getKey();			//MAC16012015+
            	oCurrent.searchAccountSummary(vRdBtnSel);
            }
            })/*.addStyleClass("formElements")*/;
           var oMonthPeriodItem = new sap.ui.core.Item({
                   text : "This Month", key : "SumCm"});
           radioBtnMonthPeriod.addItem(oMonthPeriodItem);
           oMonthPeriodItem = new sap.ui.core.Item({
                   text : "Last Month", key : "SumLm"});
           radioBtnMonthPeriod.addItem(oMonthPeriodItem);
           oMonthPeriodItem = new sap.ui.core.Item({
               		text : "Last 3 Months", key : "SumL3m"});
	       radioBtnMonthPeriod.addItem(oMonthPeriodItem);
	       oMonthPeriodItem = new sap.ui.core.Item({
	    	   		text : "Current Year", key : "SumCy"});
	       radioBtnMonthPeriod.addItem(oMonthPeriodItem);
	       
	       // Table
			var oAccountsSummaryTable = new sap.ui.table.Table("idAccountsSummaryTbl",{
				visibleRowCount: 2,
		        firstVisibleRow: 3,
		        columnHeaderHeight: 40,
		        selectionMode: sap.ui.table.SelectionMode.None,
		        width: "80%",
		        height:"100%"
	    	 }).addStyleClass("tblBorder");
			
			// Table Columns
			oAccountsSummaryTable.addColumn(new sap.ui.table.Column({
				  resizable:false,
				  width:"180px",
				label: new sap.ui.commons.Label({text: ""}),
	         template: new sap.ui.commons.TextView().bindProperty("text", "OsPa"),
			 }));
			 
			oAccountsSummaryTable.addColumn(new sap.ui.table.Column({
				 label: new sap.ui.commons.Label({text: "Amount",}),
				  resizable:false,
				  //hAlign:sap.ui.commons.layout.HAlign.End,
				 template: new sap.ui.commons.Link("idEccDocsAmountLink",{
				press : function(oEvent) {
					ECCDocsData.DetailData = [];
					if(this.getText().substring(0,1) != "0"){
						var vCurrentRow = oEvent.getParameter("id").substring(25);
						if(vCurrentRow == "row0"){
							oCurrent.showDetails("PA",radioBtnMonthPeriod.getSelectedItem().getKey());
						}
						else if(vCurrentRow == "row1"){
							oCurrent.showDetails("OS",radioBtnMonthPeriod.getSelectedItem().getKey());
						}
					}
					else{
						sap.ui.commons.MessageBox.alert("No Payment related data found.");
					}
				}
			}).bindProperty("text", "Amount"),
		         width:"35%"
				 }));
			 
			oAccountsSummaryTable.addColumn(new sap.ui.table.Column({
				 label: new sap.ui.commons.Label({text: "Currency"}),
				  resizable:false,
				 template: new sap.ui.commons.TextView().bindProperty("text", "Currency"),
		         width:"100px"
				 }));

			// Responsive Grid Layout
			var oAccountsSummaryLayout = new sap.ui.layout.form.ResponsiveGridLayout("idAccountsSummaryLayout");
	    	
	    	// Online Form Starts
			var oAccountsSummaryForm = new sap.ui.layout.form.Form("idAccountsSummaryForm",{
				                layout: oAccountsSummaryLayout,
				                formContainers: [
				                        new sap.ui.layout.form.FormContainer("idAccountsSummaryFormC1",{
				                               // title: "Accounts Summary",
				                                formElements: [
															new sap.ui.layout.form.FormElement({
															    fields: [oLabelDepotCode,vTxtFDepotCode]
															}),
															new sap.ui.layout.form.FormElement({
															    fields: [new sap.ui.commons.Label()]
															}),
															new sap.ui.layout.form.FormElement({
															    fields: [radioBtnMonthPeriod],
															    layoutData: new sap.ui.layout.GridData({linebreak: true, margin: false})
															}),
															new sap.ui.layout.form.FormElement({
															    fields: [new sap.ui.commons.Label()]
															}),
															new sap.ui.layout.form.FormElement({
														        fields: [oAccountsSummaryTable]
															}),
															new sap.ui.layout.form.FormElement({
															    fields: [new sap.ui.commons.Label()]
															}),
															new sap.ui.layout.form.FormElement({
															    fields: [oFlexboxButtonsAccSumm],
															    layoutData: new sap.ui.layout.GridData({linebreak: true, margin: false})
															}),
															new sap.ui.layout.form.FormElement({
															    fields: [oFlexboxReq],
															    layoutData: new sap.ui.layout.GridData({linebreak: true, margin: false})
															}),
				                                        ]
				                        }),
				                        new sap.ui.layout.form.FormContainer("idAccountsSummaryFormC2",{
			                                formElements: [] //for blank space ;)  
			                        })	
				                ]
				        });
			 var vHDivider = new sap.ui.commons.HorizontalDivider({width: "95%", type: "Area", height: "Medium"});
			var oAmountPaidLayout = new sap.ui.layout.form.ResponsiveLayout("idAmountPaidLayout");
	        var oAmountPaidForm = new sap.ui.layout.form.Form("idAmountPaidForm",{
	           layout: oAmountPaidLayout,
	           formContainers: [
	                   new sap.ui.layout.form.FormContainer("idUAmountPaidFormC1",{
	                       formElements: [	                                      
			                               new sap.ui.layout.form.FormElement("idDetailFormElement",{
			                                   fields: [],
			                               })
		                               ],
	                               layoutData: new sap.ui.commons.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
	                   })
	           ]
	        });
	        
			var oFlexboxAccountsSummary = new sap.m.FlexBox({
			      items: [
			        oAccountsSummaryForm,vHDivider,
			        oAmountPaidForm
			      ],
			      direction: "Column"
			    });

			
			return oFlexboxAccountsSummary;
	       
	}, //createAccountsSummary
	
	getAccountDetails: function(vRdBtnSel,depotCode){
		var oCurrent = this;
		busyDialog.open();
		oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
		//alert(serviceUrl + "/Ecc_Docs?$filter=VendCode eq '" + vVendorCode + "'")
		OData.request({ 
		      requestUri: serviceUrl + "/Ecc_Docs?$filter=VendCode eq '" + depotCode + "'",
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
		    	//csrftokenGlobal = response.headers['x-csrf-token'];
		    	ECCDocsData.AllData = [];
		    	ECCDocsData.SummaryData = [];
		    	ECCDocsData.DetailData = [];
		    	/*alert("data.results[0].Text " + data.results[0].Text + "len " + data.results.length);
		    	if(data.results[0].Text == "Incorrect Vendor code"){
		    		jQuery.sap.require("sap.ui.commons.MessageBox");
		        	sap.ui.commons.MessageBox.show("Incorrect Vendor code",
		        	sap.ui.commons.MessageBox.Icon.WARNING,
		        	"Warning",
		        	[sap.ui.commons.MessageBox.Action.OK], 
	   			    sap.ui.commons.MessageBox.Action.OK);
		        	busyDialog.close();
		    	}else{*/
		    	ECCDocsData.AllData = data.results;
		    	var len = ECCDocsData.AllData.length;
				for(var i=0 ; i < len ; i++){ ECCDocsData.AllData[i].Amount = numberWithCommas(ECCDocsData.AllData[i].Amount);
				
				  var vDocDateResult = ECCDocsData.AllData[i].DocDate.split("(");
				  var vDocDate = vDocDateResult[1].split(")");
				  var vActualDocDate = new Date(Number(vDocDate[0]));
				  var vformattedDocDate = dateFormat(new Date(Number(vDocDate[0])), 'dd-mm-yyyy',"UTC");
				  if (vformattedDocDate.substring(6) === "9999"){
				    ECCDocsData.AllData[i].DocDate =  "-";
				    ECCDocsData.AllData[i]["DocDateActual"] = vActualDocDate;
				  }
				  else{
					  ECCDocsData.AllData[i].DocDate = vformattedDocDate;
					  ECCDocsData.AllData[i]["DocDateActual"] = vActualDocDate;
				  }
				    
				  var vDueDateResult = ECCDocsData.AllData[i].DueDate.split("(");
				  var vDueDate = vDueDateResult[1].split(")");
				  var vActualDueDate = new Date(Number(vDueDate[0]));
				  var vformattedDueDate = dateFormat(new Date(Number(vDueDate[0])), 'dd-mm-yyyy',"UTC");
				  if (vformattedDueDate.substring(6) === "9999"){
				    ECCDocsData.AllData[i].DueDate =  "-";
				    ECCDocsData.AllData[i]["DueDateActual"] =  vActualDueDate;
				  }
				  else{
					  ECCDocsData.AllData[i].DueDate = vformattedDueDate;
					  ECCDocsData.AllData[i]["DueDateActual"] =  vActualDueDate;
				  }
					  
				  var vPayDateResult = ECCDocsData.AllData[i].PayDate.split("(");
				  var vPayDate = vPayDateResult[1].split(")");
				  var vActualPaydate = new Date(Number(vPayDate[0]));
				  var vformattedPayDate = dateFormat(new Date(Number(vPayDate[0])), 'dd-mm-yyyy',"UTC");
				  if (vformattedPayDate.substring(6) === "9999"){
				    ECCDocsData.AllData[i].PayDate =  "-";
				    ECCDocsData.AllData[i]["PayDateActual"] =  vActualPaydate;
				  }
				  else{
					  ECCDocsData.AllData[i].PayDate = vformattedPayDate;
					  ECCDocsData.AllData[i]["PayDateActual"] =  vActualPaydate;
				  }
				}
				
		    	//	oCurrent.searchAccountSummary("SumCm");  	//MAC16012015-
					oCurrent.searchAccountSummary(vRdBtnSel);	//MAC16012015+
		    	busyDialog.close();
		    	
		    },
		    function(err){
		    	busyDialog.close();
		    	errorfromServer(err);
		    	//alert("Error while reading region : "+ window.JSON.stringify(err.response));
		    }); //odata request
	}, //getAccountDetails
	
	searchAccountSummary: function(vRdBtnSel){
		ECCDocsData.SummaryData = [];
		// processing to get the summary table
		switch(vRdBtnSel){
		case "SumCm":
		{
			ECCDocsData.SummaryData = jQuery.grep(ECCDocsData.AllData, function(element, index){
	             return element.SumCm == "X";
	     	});
			break;
		}
		case "SumLm":
		{
			ECCDocsData.SummaryData = jQuery.grep(ECCDocsData.AllData, function(element, index){
	             return element.SumLm == "X";
	     	});
			break;
		}
		case "SumL3m":
		{
			ECCDocsData.SummaryData = jQuery.grep(ECCDocsData.AllData, function(element, index){
	             return element.SumL3m == "X";
	     	});
			break;
		}
		case "SumCy":
		{
			ECCDocsData.SummaryData = jQuery.grep(ECCDocsData.AllData, function(element, index){
	             return element.SumCy == "X";
	     	});
			break;
		}
		};
		for (var j=0 ; j < ECCDocsData.SummaryData.length ; j++){
			if(ECCDocsData.SummaryData[j].OsPa == "PA")
			{
				ECCDocsData.SummaryData[j].OsPa = "Amount Paid";
			}
			else if(ECCDocsData.SummaryData[j].OsPa == "OS")
			{
				ECCDocsData.SummaryData[j].OsPa = "Total Amount Outstanding";
			}
			 
		}
		oModelECCDocs.setData(ECCDocsData);
		var vSummaryTbl = sap.ui.getCore().byId("idAccountsSummaryTbl");
		vSummaryTbl.setModel(oModelECCDocs);
		vSummaryTbl.bindRows("/SummaryData");
    	
	}, //searchAccountSummary
	
	showDetails: function(type,monthInterval){
		if(sap.ui.getCore().byId("idDetailFlexbox"))
		sap.ui.getCore().byId("idDetailFlexbox").destroy();
		  var oUtil = new utility();
		ECCDocsData.DetailData = [];
		var vTitle = "";
		if(type == "OS")
			{
				vTitle = "Amount Outstanding";
			}
		else if(type == "PA")
		{
			vTitle = "Amount Paid";
		}
		// Labels
		var oLabelTitle = new sap.ui.commons.Label({text: vTitle,
            wrapping: true}).addStyleClass("font11Bold");
		
		// Buttons
		var oBtnExport = new sap.m.Button({
            text : "Export To Excel",
            type:sap.m.ButtonType.Unstyled,
            icon: sap.ui.core.IconPool.getIconURI("excel-attachment"),
            press:function(){
            	//objUtil = new utility();
            	//alert("vTitle " + vTitle);
            	objUtil.makeHTMLTable(jsonAmountDetailECC, vTitle,"export");
            	//tableToExcel("idAccountDetailTbl-table",vTitle,vColLen);
            }
         }).addStyleClass("submitBtn");
		var oBtnPrint =  new sap.m.Button({
            text : "Print",
            type:sap.m.ButtonType.Unstyled,
            icon: "images/print_icon.png",
            press:function(){
            	//objUtil = new utility();
            	 var tab = objUtil.makeHTMLTable(jsonAmountDetailECC, vTitle,"print");
	        	  var newWin = window.open();
	        	  newWin.document.write(tab);
	        	  newWin.print();
            }
         }).addStyleClass("submitBtn");
		
		var oBtnViewAll =new sap.m.Button({
            text : "View All",
            styled:false,
           // icon: "images/view_all.png",
            press:function(){
                  //alert("View All");
            	oBtnViewAll.setVisible(false);
                  var vArrayLength = ECCDocsData.DetailData.length;
		        	if(vArrayLength < 100){
		        		sap.ui.getCore().byId("idAccountDetailTbl").setVisibleRowCount(vArrayLength);
		        		sap.ui.getCore().byId("idAccountDetailTbl").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		        	}
		        	else{
		        		sap.ui.getCore().byId("idAccountDetailTbl").setVisibleRowCount(100);
		        		sap.ui.getCore().byId("idAccountDetailTbl").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		        	}
            }
         }).addStyleClass("submitBtn");
	
		// Flex Boxes
		var oFlexAmntLabel = new sap.m.FlexBox({
            items: [
                    oLabelTitle,
            ],
            width:"45%"
			});
		 var lblSpace = new sap.ui.commons.Label( {text: " ",width : '5px'});
		 
		var oFlexExpBtn = new sap.m.FlexBox({
            items: [
                    oBtnExport,lblSpace,
                    oBtnPrint
                    
            ],
            width:"55%",
            direction:"RowReverse"
	});
		var oFlexExp = new sap.m.FlexBox({
                items: [
                        oFlexAmntLabel,
                        oFlexExpBtn
                ],
    	});
		// Table
    	var oAmountDetailTable = new sap.ui.table.Table("idAccountDetailTbl",{
    		visibleRowCount: 25,
            firstVisibleRow: 3,
            columnHeaderHeight: 40,
            selectionMode: sap.ui.table.SelectionMode.None,
            navigationMode: sap.ui.table.NavigationMode.Paginator,
           // width: "100%",
           // height:"100%"
    	 }).addStyleClass("tblBorder marginTop10");
    	
    	/*if(widthOfDoc <= 1280)
   	  	{
   	  		sap.ui.getCore().byId("idAccountDetailTbl").setWidth("100%");
   	  	}
		 else{
			 sap.ui.getCore().byId("idAccountDetailTbl").setWidth("100%");
		 }*/
    	
    	
    	
    	if(type == "OS"){
    		// Table Column    	
        	oAmountDetailTable.addColumn(new sap.ui.table.Column("idCBranchColOS",{
             label: new sap.ui.commons.Label({text: "Branch"}).addStyleClass("wraptextcol"),
             resizable:false,
             template: new sap.ui.commons.TextView().bindProperty("text", "VendCode"),
             sortProperty: "VendCode",
             filterProperty: "VendCode",
             width:"80px",
        	 }));
        	 
        	oAmountDetailTable.addColumn(new sap.ui.table.Column({
        		 label: new sap.ui.commons.Label({text: "Assignment"}).addStyleClass("wraptextcol"),
        		  resizable:false,
        		 template: new sap.ui.commons.TextView().bindProperty("text", "Assignment"),
                 sortProperty: "Assignment",
                 filterProperty: "Assignment",
                 width:"80px",
        		 }));
        	 
        	
    		oAmountDetailTable.addColumn(new sap.ui.table.Column({
       		 label: new sap.ui.commons.Label({text: "Document Number"}).addStyleClass("wraptextcol"),
       		  resizable:false,
       		 template: new sap.ui.commons.TextView().bindProperty("text", "DocNo"),
                sortProperty: "DocNo",
                filterProperty: "DocNo",
                width:"90px",
       		 }));
       	 
       	oAmountDetailTable.addColumn(new sap.ui.table.Column({
       		 label: new sap.ui.commons.Label({text: "Document Date"}).addStyleClass("wraptextcol"),
       		 width:"90px",
       		  resizable:false,
       		 template: new sap.ui.commons.TextView().bindProperty("text", "DocDate"),
                sortProperty: "DocDateActual",
                filterProperty: "DocDate",
       		 }));
       	
    		oAmountDetailTable.addColumn(new sap.ui.table.Column({
    			  resizable:false,
       		 label: new sap.ui.commons.Label({text: "Due Date"}).addStyleClass("wraptextcol"),
       		 template: new sap.ui.commons.TextView().bindProperty("text", "DueDate"),
                sortProperty: "DueDateActual",
                filterProperty: "DueDate",
                width:"80px",
       		 }));
    		
    		var oAmountCol = new sap.ui.table.Column({
    			  resizable:false,
       		 label: new sap.ui.commons.Label({text: "Amount"}).addStyleClass("wraptextcol"),
       		 template: new sap.ui.commons.TextView().bindProperty("text", "Amount"),
                sortProperty: "Amount",
                filterProperty: "Amount",
                width:"90px",
       		 });
    		
    		oAmountDetailTable.addColumn(oAmountCol);
    		oUtil.addColumnSorterAndFilter(oAmountCol, oUtil.compareUptoCount);
    		    
    		oAmountDetailTable.addColumn(new sap.ui.table.Column({
    			  resizable:false,
          		 label: new sap.ui.commons.Label({text: "Currency"}).addStyleClass("wraptextcol"),
          		 template: new sap.ui.commons.TextView().bindProperty("text", "Currency"),
                   sortProperty: "Currency",
                   filterProperty: "Currency",
                   width:"70px",
          	}));
    		
    		/* Begin of adding by Seyed Ismail on 25.02.2015 MAC06022015 */
    		
    		var oAmountCol = new sap.ui.table.Column({
  			  resizable:false,
     		 label: new sap.ui.commons.Label({text: "Amount in Loc. Currency"}).addStyleClass("wraptextcol"),
     		 template: new sap.ui.commons.TextView().bindProperty("text", "Lamount"),
              sortProperty: "Amount",
              filterProperty: "Amount",
              width:"100px",
     		 });
  		
    		oAmountDetailTable.addColumn(oAmountCol);
    		oUtil.addColumnSorterAndFilter(oAmountCol, oUtil.compareUptoCount);
  		    
    		oAmountDetailTable.addColumn(new sap.ui.table.Column({
  			  resizable:false,
        		 label: new sap.ui.commons.Label({text: "Loc. Currency"}).addStyleClass("wraptextcol"),
        		 template: new sap.ui.commons.TextView().bindProperty("text", "Lcurrency"),
                 sortProperty: "Currency",
                 filterProperty: "Currency",
                 width:"70px",
        	}));
  		
    		/* End of adding by Seyed Ismail on 25.02.2015 MAC06022015 */
    		
    		oAmountDetailTable.addColumn(new sap.ui.table.Column({
    			  resizable:false,
          		 label: new sap.ui.commons.Label({text: "Text"}).addStyleClass("wraptextcol"),
          		 template: new sap.ui.commons.TextView().bindProperty("text", "Text"),
                   sortProperty: "Text",
                   filterProperty: "Text",
                   width:"100px",
          	}));
    	}
    	else if(type == "PA"){
    		// Table Column    	
        	oAmountDetailTable.addColumn(new sap.ui.table.Column("idCBranchColPA",{
             label: new sap.ui.commons.Label({text: "Branch"}).addStyleClass("wraptextcol"),
             resizable:false,
             template: new sap.ui.commons.TextView().bindProperty("text", "VendCode"),
             sortProperty: "VendCode",
             filterProperty: "VendCode",
             width:"80px",
        	 }));
        	 
        	oAmountDetailTable.addColumn(new sap.ui.table.Column({
        		 label: new sap.ui.commons.Label({text: "Assignment"}).addStyleClass("wraptextcol"),
        		  resizable:false,
        		 template: new sap.ui.commons.TextView().bindProperty("text", "Assignment"),
                 sortProperty: "Assignment",
                 filterProperty: "Assignment",
                 width:"100px",
        		 }));
        	 
    		oAmountDetailTable.addColumn(new sap.ui.table.Column({
       		 label: new sap.ui.commons.Label({text: "Document Number"}).addStyleClass("wraptextcol"),
       		  resizable:false,
       		 template: new sap.ui.commons.TextView().bindProperty("text", "DocNo"),
                sortProperty: "DocNo",
                filterProperty: "DocNo",
                width:"90px",
       		 }));
       	 
       	oAmountDetailTable.addColumn(new sap.ui.table.Column({
       		 label: new sap.ui.commons.Label({text: "Document Date"}).addStyleClass("wraptextcol"),
       		 width:"90px",
       		  resizable:false,
       		 template: new sap.ui.commons.TextView().bindProperty("text", "DocDate"),
                sortProperty: "DocDateActual",
                filterProperty: "DocDate",
       		 }));
       	
    		var oAmountCol = new sap.ui.table.Column({
    		resizable:false,
       		 label: new sap.ui.commons.Label({text: "Amount"}).addStyleClass("wraptextcol"),
       		 template: new sap.ui.commons.TextView().bindProperty("text", "Amount"),
                sortProperty: "Amount",
                filterProperty: "Amount",
                width:"90px"
       		 });
    		
    		oAmountDetailTable.addColumn(oAmountCol);
    		oUtil.addColumnSorterAndFilter(oAmountCol, oUtil.compareUptoCount);
    		
    		oAmountDetailTable.addColumn(new sap.ui.table.Column({
  			  resizable:false,
        		 label: new sap.ui.commons.Label({text: "Currency"}).addStyleClass("wraptextcol"),
        		 template: new sap.ui.commons.TextView().bindProperty("text", "Currency"),
                 sortProperty: "Currency",
                 filterProperty: "Currency",
                 width:"70px",
        	}));
    		
    		/* Begin of adding by Seyed Ismail on 25.02.2015 MAC06022015 */
    		
    		var oAmountCol = new sap.ui.table.Column({
  			  resizable:false,
     		 label: new sap.ui.commons.Label({text: "Amount in Loc. Currency"}).addStyleClass("wraptextcol"),
     		 template: new sap.ui.commons.TextView().bindProperty("text", "Lamount"),
              sortProperty: "Lamount",
              filterProperty: "Lamount",
              width:"100px",
     		 });
  		
    		oAmountDetailTable.addColumn(oAmountCol);
    		oUtil.addColumnSorterAndFilter(oAmountCol, oUtil.compareUptoCount);
  		    
    		oAmountDetailTable.addColumn(new sap.ui.table.Column({
  			  resizable:false,
        		 label: new sap.ui.commons.Label({text: "Loc. Currency"}).addStyleClass("wraptextcol"),
        		 template: new sap.ui.commons.TextView().bindProperty("text", "Lcurrency"),
                 sortProperty: "Lcurrency",
                 filterProperty: "Lcurrency",
                 width:"70px",
        	}));
  		
    		/* End of adding by Seyed Ismail on 25.02.2015 MAC06022015 */
    		
    		oAmountDetailTable.addColumn(new sap.ui.table.Column({
    			  resizable:false,
       		 label: new sap.ui.commons.Label({text: "Payment Reference"}).addStyleClass("wraptextcol"),
       		 template: new sap.ui.commons.TextView().bindProperty("text", "PayRef"),
                sortProperty: "PayRef",
                filterProperty: "PayRef",
                width:"80px"
       		 }));
    		
    		oAmountDetailTable.addColumn(new sap.ui.table.Column({
    		resizable:false,
       		 label: new sap.ui.commons.Label({text: "Payment Date"}).addStyleClass("wraptextcol"),
       		 template: new sap.ui.commons.TextView().bindProperty("text", "PayDate"),
                sortProperty: "PayDateActual",
                filterProperty: "PayDate",
                width:"90px"
       		 }));
    		
    		oAmountDetailTable.addColumn(new sap.ui.table.Column({
    		resizable:false,
       		 label: new sap.ui.commons.Label({text: "Text"}).addStyleClass("wraptextcol"),
       		 template: new sap.ui.commons.TextView().addStyleClass("wraptext").bindProperty("text", "Text"),
                sortProperty: "Text",
                filterProperty: "Text",
                width:"200px"
       		 }));
       }
    	//alert("date in alldata"  + ECCDocsData.AllData[0].DocDate);
    	switch(monthInterval){
		case "SumCm":
		{
			ECCDocsData.DetailData = jQuery.grep(ECCDocsData.AllData, function(element, index){
	             return element.OsPa == type  && element.DtlCm == "X";
	     	});
			break;
		}
		case "SumLm":
		{
			ECCDocsData.DetailData = jQuery.grep(ECCDocsData.AllData, function(element, index){
	             return element.OsPa == type  && element.DtlLm == "X";
	     	});
			break;
		}
		case "SumL3m":
		{
			ECCDocsData.DetailData = jQuery.grep(ECCDocsData.AllData, function(element, index){
	             return element.OsPa == type  && element.DtlL3m == "X";
	     	});
			break;
		}
		case "SumCy":
		{
			ECCDocsData.DetailData = jQuery.grep(ECCDocsData.AllData, function(element, index){
	             return element.OsPa == type  && element.DtlCy == "X";
	     	});
			break;
		}
		};
		jsonAmountDetailECC = [];
		  // make Custom JSON for Table - Excel/Print
		var lenDet = ECCDocsData.DetailData.length;
		for(var i = 0 ; i < lenDet ; i++){
			if(ECCDocsData.DetailData[i].VendCode == ""){
				vBranchCount = vBranchCount + 1;
			}
			else{
				//var oUtil = new utility();
				ECCDocsData.DetailData[i].VendCode = objUtil.removeLeadZero(ECCDocsData.DetailData[i].VendCode);
			}
			//alert("Branch " + ECCDocsData.DetailData[i].Branch)
			if(type == "OS"){
		        jsonAmountDetailECC.push({
		            'Branch':ECCDocsData.DetailData[i].VendCode,
		            'Assignment':ECCDocsData.DetailData[i].Assignment,
		            'Document No.':ECCDocsData.DetailData[i].DocNo,
		            'Document Date':ECCDocsData.DetailData[i].DocDate,
		            'Due Date':ECCDocsData.DetailData[i].DueDate,
		            'Amount':ECCDocsData.DetailData[i].Amount,
		            'Currency':ECCDocsData.DetailData[i].Currency,
		            'Amount in Loc. Currency':ECCDocsData.DetailData[i].Lamount,		// MAC16012015 +
		            'Local Currency':ECCDocsData.DetailData[i].Lcurrency,				// MAC16012015 +
		            'Text':ECCDocsData.DetailData[i].Text,
		        });
			}
			else if(type == "PA"){
				jsonAmountDetailECC.push({
		            'Branch':ECCDocsData.DetailData[i].VendCode,
		            'Assignment':ECCDocsData.DetailData[i].Assignment,
		            'Document No.':ECCDocsData.DetailData[i].DocNo,
		            'Document Date':ECCDocsData.DetailData[i].DocDate,
		            'Amount':ECCDocsData.DetailData[i].Amount,
		            'Currency':ECCDocsData.DetailData[i].Currency,
		            'Amount in Loc. Currency':ECCDocsData.DetailData[i].Lamount,		// MAC16012015 +
		            'Local Currency':ECCDocsData.DetailData[i].Lcurrency,				// MAC16012015 +
		            'Payment Reference':ECCDocsData.DetailData[i].PayRef,
		            'Payment Date':ECCDocsData.DetailData[i].PayDate,
		            'Text':ECCDocsData.DetailData[i].Text,
		        });
			}
 }
		if(type == "OS"){
			 if(vBranchCount == lenDet ){
		    		sap.ui.getCore().byId("idCBranchColOS").setVisible(false);
		    		vBranchCount = 0;
		    	}
		    	else{
		    		vBranchCount = 0;
		    		sap.ui.getCore().byId("idCBranchColOS").setVisible(true);
		    	}
		}
		
		if(type == "PA"){
			 if(vBranchCount == lenDet){
		    		sap.ui.getCore().byId("idCBranchColPA").setVisible(false);
		    		vBranchCount = 0;
		    }
		    else{
		    		vBranchCount = 0;
		    		sap.ui.getCore().byId("idCBranchColPA").setVisible(true);
		    }
		}
    	oModelECCDocs.setData(ECCDocsData);
    	oAmountDetailTable.setModel(oModelECCDocs);
    	oAmountDetailTable.bindRows("/DetailData");
    	
    	if(lenDet < 25){
    		oAmountDetailTable.setVisibleRowCount(lenDet);
    		oAmountDetailTable.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
    		oBtnViewAll.setVisible(false);
    	}
    	else{
    		oAmountDetailTable.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
    		oAmountDetailTable.setVisibleRowCount(25);
    		oBtnViewAll.setVisible(true);
    	}
    	//alert("len " + ECCDocsData.DetailData.length);
    	//oModelECCDocs.updatetBindings();
    	
    	var oFlexBoxAll = new sap.m.FlexBox("idDetailFlexbox",{
     		  items: [
						oFlexExp,
						oAmountDetailTable,
						oBtnViewAll

        		  ],
        		  width:"100%",
        		direction: "Column"
        		});  
      	
      	var oAmountPaidFormElement = sap.ui.getCore().byId("idDetailFormElement");
      	oAmountPaidFormElement.insertField(oFlexBoxAll,0);
	} //showDetails
	
	
});
var DepotSpecDoc = {
	aDocType: [],
	aMailDetails:[]
};
var vRdBtnSel = "";
var btnViewAllMail = "";
var LoggedInUserTypeDepotSpecDoc = "";

var oModelDepotSpecDoc = new sap.ui.model.json.JSONModel();
jQuery.sap.require("sap.ui.commons.MessageBox");
sap.ui.model.json.JSONModel.extend("depotSpecDocsView", {
	
	createDepotSpecDocs: function(){
		$('#idHdrContent').html('Depot Specific Documents');	//CHANGE HEADER CONTENT
		var oCurrent = this;
		// Radio Buttons
	    var radioBtnPeriod = new sap.ui.commons.RadioButtonGroup("idPeriodGrp",{
            columns : 3,
            selectedIndex : 0,
           layoutData: new sap.ui.layout.GridData({span: "L8 M9 S12"}),
            select : function() {
                 	if(sap.ui.getCore().byId("idMailDetailViewAllBtnFlexbox")){
                 		sap.ui.getCore().byId("idMailDetailTbl").destroy();
                 		sap.ui.getCore().byId("idMailDetailViewAllBtnFlexbox").destroy();
                 	}
                 	//sap.ui.getCore().byId("idComboDocType").setSelectedItemId(0);
                 	vRdBtnSel = radioBtnPeriod.getSelectedItem().getKey();
            }
            }).addStyleClass("margin10");
           var oPeriodItem = new sap.ui.core.Item({
                   text : "This Week", key : "TW"});
           radioBtnPeriod.addItem(oPeriodItem);
           oPeriodItem = new sap.ui.core.Item({
                   text : "Last Week", key : "LW"});
           radioBtnPeriod.addItem(oPeriodItem);
           oPeriodItem = new sap.ui.core.Item({
               		text : "This Month", key : "TM"});
           radioBtnPeriod.addItem(oPeriodItem);
           oPeriodItem = new sap.ui.core.Item({
	    	   		text : "Last Month", key : "LM"});
	       radioBtnPeriod.addItem(oPeriodItem);
	       oPeriodItem = new sap.ui.core.Item({
	    	   		text : "Last 3 Months", key : "L3M"});
	       radioBtnPeriod.addItem(oPeriodItem);
	       oPeriodItem = new sap.ui.core.Item({
	    	   		text : "Current Year", key : "CY"});
	       radioBtnPeriod.addItem(oPeriodItem);
	       // Labels
	       var labStar = new sap.ui.commons.Label({text: "* "}).addStyleClass("MandatoryStar");
	       var lblSpaceLegend = new sap.ui.commons.Label( {text: " ",width : '5px'});
			  var labRequired = new sap.ui.commons.Label({text: " Mandatory Field",wrapping: true});
			  var oFlexboxReq = new sap.m.FlexBox({
				 // layoutData: new sap.ui.layout.GridData({span: "L7 M6 S4"}),
	              items: [labStar,lblSpaceLegend,labRequired],
	              direction: "Row"
			  });
	       
	       var oLabelPeriod = new sap.ui.commons.Label("period",{
	    	   layoutData: new sap.ui.layout.GridData({span: "L4 M3 S12"}),linebreak: true, margin: false
	       }); 
	       oLabelPeriod.setText("Period: ");
	       oLabelPeriod.addStyleClass("marginTop10");
           
           var oLabelDocType = new sap.ui.commons.Label("docType",{required:true,
        	   layoutData: new sap.ui.layout.GridData({span: "L4 M3 S12"}),linebreak: true, margin: false
           }); 
           oLabelDocType.setText("Document Type: ");
         //  oLabelDocType.addStyleClass("margin10");
           
           var ResetMessage = "This will reset all the specified inputs. Do you want to continue?";
           
           // Buttons
           var oBtnDepSpecDocsSubmit =  new sap.m.Button("idBtnDepSpecDocsSubmit",{
 	          text : "Submit",
 	         styled:false,
 	         width:"80px",
 	          layoutData: new sap.ui.layout.GridData({span: "L4 M3 S4",linebreak: true, margin: false}),
 	          press:function(){
 	        	 oCurrent.getMailDetails(vRdBtnSel);
 	        	  }
           }).addStyleClass("submitBtn");
           
           var oBtnDepSpecDocsReset =  new sap.m.Button("idBtnDepSpecDocsReset",{
 	          text : "Reset",
 	         styled:false,
 	        width:"80px",
 	          layoutData: new sap.ui.layout.GridData({span: "L4 M3 S4",linebreak: true, margin: false}),
 	          press:function(){sap.ui.commons.MessageBox.show(ResetMessage,
                      sap.ui.commons.MessageBox.Icon.WARNING,
                            "Warning",
                            [sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO], 
                            oCurrent.fnResetMailDetailSearch,
					          sap.ui.commons.MessageBox.Action.YES);
          }}).addStyleClass("submitBtn");
           var lblSpace = new sap.ui.commons.Label( {text: " ",width : '8px'});
	    	
           var oFlexboxButtons = new sap.m.FlexBox({
     	      items: [
     	        oBtnDepSpecDocsSubmit,lblSpace,
     	       oBtnDepSpecDocsReset
     	      ],
     	      direction: "Row",
     	    }).addStyleClass("margin10");
           
           // Document Type Drop-down
          	var oComboDocType = new sap.ui.commons.DropdownBox("idComboDocType", {
          	  layoutData: new sap.ui.layout.GridData({span: "L8 M5 S8"}),
          	  change:function(){
				  this.setValueState(sap.ui.core.ValueState.None);
				  this.setPlaceholder("Select Document Type");
			  },
          	  items: {
	                path: "/",
	                template: new sap.ui.core.ListItem({text: "{DocType}"})
			  },
          		displaySecondaryValues:false , placeholder:"Select Document Type"}).addStyleClass("FormInputStyle","margin10");
	       
	   		// Responsive Grid Layout
		    var oDepotSpecDocsLayout = new sap.ui.layout.form.ResponsiveGridLayout("idDepotSpecDocsLayout");
		    
		    /*temp start*/
		    var oLabelDepotCodeDoc = new sap.ui.commons.Label("idLblDepotCodeDoc",{required:true,
				 text:"Depot Code: ",
	      	   layoutData: new sap.ui.layout.GridData({span: "L4 M3 S4"}),linebreak:true , margin: false
	         });
		   
		    var vTxtFDepotCode = new sap.ui.commons.TextField("idDepotCodeDepotSpecDoc",{
		    	placholder:"Depot Code",
				liveChange:function(){
					this.setValueState(sap.ui.core.ValueState.None);
					//this.setPlaceholder("Depot code");
				},
				layoutData: new sap.ui.layout.GridData({span: "L8 M3 S12"}),linebreak: false, margin: false
		    }).addStyleClass("FormInputStyle margin10");
		    
		    var lblSpaceLegend = new sap.ui.commons.Label( {text: " ",width : '5px'});
		   // var lblSpaceLegend = new sap.ui.commons.Label( {text: " ",width : '5px'});
			 /*temp end*/
			 
	   		// Online Form Starts
	        var oDepotSpecDocsForm = new sap.ui.layout.form.Form("idDepotSpecDocsForm",{
	                layout: oDepotSpecDocsLayout,
	                width:"100%",
	                formContainers: [
	                        new sap.ui.layout.form.FormContainer("idDepotSpecDocsFormC1",{
	                                title: "Search By / View By",
	                                formElements: [
												new sap.ui.layout.form.FormElement({
												    fields: [oLabelDepotCodeDoc,vTxtFDepotCode]
												}),
												new sap.ui.layout.form.FormElement({
											        fields: [oLabelPeriod, radioBtnPeriod],
											       // layoutData: new sap.ui.layout.GridData({linebreak: true, margin: false})
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oLabelDocType, oComboDocType]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oFlexboxButtons]
												}),
												new sap.ui.layout.form.FormElement({
												    fields: [oFlexboxReq]
												})
	                                        ],
	                        }),
	                        new sap.ui.layout.form.FormContainer("idDepotSpecDocsFormC2",{
                               formElements: [],
                       })	          
	                ]
	        });
	        var vHDivider = new sap.ui.commons.HorizontalDivider({width: "95%", type: "Area", height: "Medium"});
	        var oDepSpecLayout = new sap.ui.layout.form.ResponsiveLayout("idDepSpecLayout");
	        var oDepSpecForm = new sap.ui.layout.form.Form("idDepSpecForm",{
	           layout: oDepSpecLayout,
	           formContainers: [
	                   new sap.ui.layout.form.FormContainer("idDepSpecFormC1",{
	                       formElements: [
	                               new sap.ui.layout.form.FormElement("idDepSpecFormElementTable",{
	                                   fields: [],
	                               }),
	                               new sap.ui.layout.form.FormElement("idDepSpecFormElementViewAll",{
	                                    fields: [],
	                                    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
	                               }),
	                      ]//,layoutData: new sap.ui.commons.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
	                   })
	           ]
	        });
	        
	        var oFlexboxDepSpec = new sap.m.FlexBox({
	        		items: [
	        		        oDepotSpecDocsForm,  vHDivider,
	        		        oDepSpecForm
	        		       ],
	        		direction: "Column",
	        });

	        return oFlexboxDepSpec;
	}, //createDepotSpecDocs
	
	getDocType:function(){
		
		//username to be passed for dropdown
		//var objUser = new loggedInU();
		var username = objLoginUser.getLoggedInUserName();
		//http://seanwgd1.gessap.local:8000/sap/opu/odata/sap/ZNW_SEACO_PORTAL_LOT4_SECURITY_SRV/Sost_DocType?$filter=Bname eq 'ztest_dm' and Dept eq ''
		
		DepotSpecDoc.aDocType = loggedInUserDROP4;
		
		this.sortArrOfObjectsByParam(DepotSpecDoc.aDocType, "DocType", true);
		//DepotSpecDoc.aDocType.sort();
		oModelDepotSpecDoc.setData(DepotSpecDoc);
		var vComboDocType = sap.ui.getCore().byId("idComboDocType");
		vComboDocType.setModel(oModelDepotSpecDoc);
		vComboDocType.bindItems("/aDocType",new sap.ui.core.ListItem({text: "{DocType}"}),new sap.ui.model.Sorter("/aDocType"));

		/*
		 * var oCurrent = this;
		busyDialog.open();
		 * oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
		//var urlToCall = serviceUrl + "/Sost_DocType?$filter=Bname eq '" + username + "' and Dept eq ''";
		var urlToCall = serviceUrl + ";mo/Sost_DocType?$filter=Bname eq '" + username + "'";
		//alert("url " + urlToCall);
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
		    	DepotSpecDoc.aDocType = data.results;
		    	
		    	oModelDepotSpecDoc.setData(DepotSpecDoc);
		    	
				var vComboDocType = sap.ui.getCore().byId("idComboDocType");
				vComboDocType.setModel(oModelDepotSpecDoc);
				vComboDocType.bindItems("/aDocType",new sap.ui.core.ListItem({text: "{DocType}"}));
				//vComboDocType.insertItem(new sap.ui.core.ListItem({text:"Select Document Type"}),0);
				//vComboDocType.insertItem((new sap.ui.core.ListItem({text:"Select Document Type", key:"0"})),0);
		    	busyDialog.close();
		    },
		    function(err){
		    	busyDialog.close();
		    	errorfromServer(err);
		    	//alert("Error while reading region : "+ window.JSON.stringify(err.response));
		    }); //odata request
*/		
	}, //getDocType
	
	sortArrOfObjectsByParam: function(arrToSort /* array */, strObjParamToSortBy /* string */, sortAscending /* bool(optional, defaults to true) */) {
        if(sortAscending == undefined) sortAscending = true;  // default to true
        
        if(sortAscending) {
            arrToSort.sort(function (a, b) {
                //return a[strObjParamToSortBy] > b[strObjParamToSortBy];
            	return (a[strObjParamToSortBy] == b[strObjParamToSortBy] ? 0 : a[strObjParamToSortBy] < b[strObjParamToSortBy] ? -1 : 1);
            });
        }
        else {
            arrToSort.sort(function (a, b) {
                //return a[strObjParamToSortBy] < b[strObjParamToSortBy];
            	return arrToSort.sort(b, a);
            });
        }
    },
	
	getMailDetails:function(vRdBtnSel){
		var oCurrent = this;
		if(sap.ui.getCore().byId("idMailDetailViewAllBtnFlexbox")){
     		sap.ui.getCore().byId("idMailDetailTbl").destroy();
     		sap.ui.getCore().byId("idMailDetailViewAllBtnFlexbox").destroy();
     	}
		var valid = false;
		var valid1 = false;
		aMailDetails = [];
		var valueforDocType = [];
		var depotCode = sap.ui.getCore().byId("idDepotCodeDepotSpecDoc").getValue();
		//validations
		var vDocTypeSel = sap.ui.getCore().byId("idComboDocType");
		//alert("depot " + depotCode);
		if(depotCode == ""){
			sap.ui.getCore().byId("idDepotCodeDepotSpecDoc").setValueState(sap.ui.core.ValueState.Error);
			sap.ui.getCore().byId("idDepotCodeDepotSpecDoc").setPlaceholder("Required");
			valid =  false;
			//Salert(valid);
		}
		else{
			valid = true;
		}
		if(vDocTypeSel.getValue() == "" || vDocTypeSel.getValue() == "Select Document Type"){
			vDocTypeSel.setValueState(sap.ui.core.ValueState.Error);
			vDocTypeSel.setPlaceholder("Required");
			valid1 =  false;
		}
		else{
			valid1 = true;
			busyDialog.open();
			valueforDocType = jQuery.grep(DepotSpecDoc.aDocType, function(element, index){
                return element.DocType == vDocTypeSel.getValue();
			});
		}
		//alert("valid " + valid + "valid1 " + valid1);
		if(valid && valid1){
			//alert("V");
		oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
		var urlToCall = "";
		if(vRdBtnSel == '')
			vRdBtnSel = 'TW';
		
		if(valueforDocType[0].Zdoc == 'DN_JS'){
			urlToCall = serviceUrl + "/Sost_Details_Dn?$filter=IDepoCode eq '" + depotCode + "' and IPeriod eq '" + vRdBtnSel + "' and IDoctype eq '" + valueforDocType[0].Zdoc + "'";
		}else{
			urlToCall = serviceUrl + "/Sost_Details?$filter=IDepoCode eq '" + depotCode + "' and IPeriod eq '" + vRdBtnSel + "' and IDoctype eq '" + valueforDocType[0].Zdoc + "'";
		}
		
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
		    	
		    	if(data.results.length != 0){
		    		for (var j=0; j < data.results.length ; j++){
		    			DepotSpecDoc.aMailDetails = data.results;
		    			var vSendDate = DepotSpecDoc.aMailDetails[j].SndDate.split("(");
						  var vDate = vSendDate[1].split(")");
						 // var vformattedSendDate = (new Date(Number(vDate[0])));
						  //alert("vformattedSendDate " + vformattedSendDate);
						  var vActualSendDate = new Date(Number(vDate[0])); //dateFormat(new Date(Number(vDate[0])), 'dd-mm-yyyy');
						  var vSndDate = dateFormat(new Date(Number(vDate[0])), 'dd-mm-yyyy',"UTC");
						  if (vSndDate.substring(6) === "9999"){
							  DepotSpecDoc.aMailDetails[j].SndDate =  "-";
							  DepotSpecDoc.aMailDetails[j]["SndDateActual"] = vActualSendDate;
						  }
						  else{
							  DepotSpecDoc.aMailDetails[j].SndDate = vSndDate;
							  DepotSpecDoc.aMailDetails[j]["SndDateActual"]=vActualSendDate;
						 }
						  var vActualTime = DepotSpecDoc.aMailDetails[j].SndTime;
						  var vSendTime = vActualTime.replace(/[HMS]/g, ":").substring(2,10);
						 DepotSpecDoc.aMailDetails[j].SndTime = vSendTime;
						 // alert("time " + vSendTime);
		    		} //for loop end
		    		
		    		oCurrent.showMailDetails();
		    		oModelDepotSpecDoc.setData(DepotSpecDoc);
			    	var vMailDetlTbl = sap.ui.getCore().byId("idMailDetailTbl");
			    	var vViewAllMail = sap.ui.getCore().byId("idMailDetailViewAllBtnFlexbox");
			    	vMailDetlTbl.setModel(oModelDepotSpecDoc);
			    	vMailDetlTbl.bindRows("/aMailDetails");
			    	var vArrayLength = DepotSpecDoc.aMailDetails.length;
			        	if(vArrayLength < 25){
			        		vMailDetlTbl.setVisibleRowCount(vArrayLength);
			        		vMailDetlTbl.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
			        		vViewAllMail.setVisible(false);
			        	}
			        	else{
			        		vMailDetlTbl.setVisibleRowCount(25);
			        		vMailDetlTbl.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
			        		vViewAllMail.setVisible(true);
			        	}
			    	
			    	var oDepSpecFormElementTbl = sap.ui.getCore().byId("idDepSpecFormElementTable");
			    	oDepSpecFormElementTbl.insertField(vMailDetlTbl,0);
			    	var oDepSpecFormElementTbl = sap.ui.getCore().byId("idDepSpecFormElementViewAll");
			    	oDepSpecFormElementTbl.insertField(vViewAllMail,0);
			    	
		    	} //results length not zero
		    	else{
		    		if(sap.ui.getCore().byId("idMailDetailViewAllBtnFlexbox")){
                 		sap.ui.getCore().byId("idMailDetailTbl").destroy();
                 		sap.ui.getCore().byId("idMailDetailViewAllBtnFlexbox").destroy();
                 	}
		    		sap.ui.commons.MessageBox.alert("No Results Found. Please edit / refine your search criteria and search again.");
		    	}
		    	
		    	busyDialog.close();
		    },
		    function(err){
		    	busyDialog.close();
		    	errorfromServer(err);
		    	//alert("Error while reading mail details : "+ window.JSON.stringify(err.response));
		    }); //odata request
		}
		else{
			busyDialog.close();
			return false;
		}
		
	}, //getMailDetails
	
	showMailDetails: function(){
		var oCurrent = this;
		
		var oMailDetailTable = new sap.ui.table.Table("idMailDetailTbl",{
    		visibleRowCount: 25,
            firstVisibleRow: 1,
            columnHeaderHeight: 30,
            selectionMode: sap.ui.table.SelectionMode.None,
            navigationMode: sap.ui.table.NavigationMode.Paginator,
            //width: "100%",
            //height:"100%",
            fixedColumnCount:1
    	 }).addStyleClass("tblBorder");
		
		oMailDetailTable.addColumn(new sap.ui.table.Column({
	         label: new sap.ui.commons.Label({text: "Title"}),
	         template: new sap.ui.commons.Link({
	        	 press : function(oEvent) {
	        		 var oPaymentAdvise = new PaymentAdvise();
	        		 var subject = this.getText();
	        		 if(subject.substr(0,2) == 'DN' || subject.substr(0,2) == 'JS'){
	        			 var vObjNo = oEvent.getSource().getBindingContext().getProperty("Objno");
	        			 var vObjTp = oEvent.getSource().getBindingContext().getProperty("Objtp");
	        			 var vObjYr = oEvent.getSource().getBindingContext().getProperty("Objyr");
	        			 oCurrent.OpenMailAttachment(vObjNo,vObjTp,vObjYr, subject, 'X');
	        		 }else if(subject.substr(0,4) == 'PYMT'){
	        			 /*var bus = sap.ui.getCore().getEventBus();
						 bus.publish("nav", "to", {id : "PaymentAdvise"});
	        			 oPaymentAdvise.getPaymentAdvise(subject);*/
	        			 var vObjNo = oEvent.getSource().getBindingContext().getProperty("Objno");
	        			 var vObjTp = oEvent.getSource().getBindingContext().getProperty("Objtp");
	        			 var vObjYr = oEvent.getSource().getBindingContext().getProperty("Objyr");
	        			 oCurrent.OpenMailAttachment(vObjNo,vObjTp,vObjYr, subject, 'P');
	        		 }
	        		 else{
	        			 oCurrent.GetMessage(subject,this.getHelpId);
	        		 }
	        		 
	        	 }
	         }).bindProperty("text", "Titel").bindProperty("helpId", "Objtp"),
	         sortProperty: "Titel",
	         filterProperty: "Titel",
	         resizable:false,
	         width:"290px"
	    }));
	    	 
		oMailDetailTable.addColumn(new sap.ui.table.Column({
    		 label: new sap.ui.commons.Label({text: "Sender"}),
    		 template: new sap.ui.commons.TextView().bindProperty("text", "SndMail"),
             sortProperty: "SndMail",
             filterProperty: "SndMail",
             resizable:false,
             width:"100px"
    	}));
		
		oMailDetailTable.addColumn(new sap.ui.table.Column({
   		 label: new sap.ui.commons.Label({text: "Recipient"}),
   		 template: new sap.ui.commons.TextView().bindProperty("text", "RecMail"),
            sortProperty: "RecMail",
            filterProperty: "RecMail",
            resizable:false,
            width:"100px"
		}));
		
		oMailDetailTable.addColumn(new sap.ui.table.Column({
   		 label: new sap.ui.commons.Label({text: "Send Date"}),
   		 template: new sap.ui.commons.TextView().bindProperty("text", "SndDate"),
   		   //template:new sap.ui.commons.DatePicker({type: new sap.ui.model.type.Date({pattern: "yyyy-mm-dd"}),value:new Date()}).bindProperty("value", "SndDate"), 
            sortProperty: "SndDateActual",
            filterProperty: "SndDate",
            resizable:false,
            width:"50px"
		}));
		
		
		oMailDetailTable.addColumn(new sap.ui.table.Column({
   		 label: new sap.ui.commons.Label({text: "Send Time"}),
   		 template: new sap.ui.commons.TextView().bindProperty("text", "SndTime"),
            sortProperty: "SndTime",
            filterProperty: "SndTime",
            resizable:false,
            width:"50px"
		}));
		
		//view all
		var oBtnViewAllMailDetail = new sap.m.Button({
            text : "View All",
            styled:false,
            press:function(){
                  this.setVisible(false);
                  var vArrayLength = DepotSpecDoc.aMailDetails.length;
		        	if(vArrayLength < 100){
		        		sap.ui.getCore().byId("idMailDetailTbl").setVisibleRowCount(vArrayLength);
		        		sap.ui.getCore().byId("idMailDetailTbl").setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
		        	}
		        	else{
		        		sap.ui.getCore().byId("idMailDetailTbl").setVisibleRowCount(100);
		        		sap.ui.getCore().byId("idMailDetailTbl").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
		        	}
            }
         }).addStyleClass("submitBtn");
		
		var oFlexboxMailDetail = new sap.m.FlexBox("idMailDetailViewAllBtnFlexbox",{
		      items: [oMailDetailTable,
		              oBtnViewAllMailDetail
		      ],
		      direction: "Column"
		    });
    }, //showdetails
    
    fnResetMailDetailSearch: function(sResult){
    	if(sResult == "YES"){
	    	//sap.ui.getCore().byId("idComboDocType").setSelectedItemId(0);
    		sap.ui.getCore().byId("idComboDocType").setValue("");
	    	sap.ui.getCore().byId("idComboDocType").setValueState(sap.ui.core.ValueState.None);
	    	if(sap.ui.getCore().byId("idMailDetailViewAllBtnFlexbox")){
	     		sap.ui.getCore().byId("idMailDetailTbl").destroy();
	     		sap.ui.getCore().byId("idMailDetailViewAllBtnFlexbox").destroy();
	     	}
	    	sap.ui.getCore().byId("idPeriodGrp").setSelectedIndex(0);
	    	//security
			//var objUser = new loggedInU();
			LoggedInUserTypeDepotSpecDoc = objLoginUser.getLoggedInUserType();
			if(($.inArray(LoggedInUserTypeDepotSpecDoc, ["DEPOT","FACTORY"])) == -1){
				sap.ui.getCore().byId("idDepotCodeDepotSpecDoc").setValue("");
			}
    	}
    }, // fncalback
    
    GetMessage: function(vSelTitle,vSelObj){
    	busyDialog.open();
    	var oCurrent = this;
    	  var oOverlayMail =  new sap.ui.ux3.OverlayDialog({width:"600px",height:"400px"});
 	      oOverlayMail.destroyContent();
    	//alert("sel title " + vSelTitle);
    	var len = DepotSpecDoc.aMailDetails.length;
    	var vObjTp = "";
    	var vObjYr = "";
    	var vObjNo = "";
    	var vForNo = "";
    	var vForTp = "";
    	var vForYr = "";
    	var sender = "";
    	var receiver = "";
    	for(var i=0 ; i < len ; i++){
    		if(DepotSpecDoc.aMailDetails[i].Titel == vSelTitle){
    			sender = DepotSpecDoc.aMailDetails[i].SndMail;
    			receiver = DepotSpecDoc.aMailDetails[i].RecMail;
    			vObjTp = DepotSpecDoc.aMailDetails[i].Objtp;
    			vObjYr = DepotSpecDoc.aMailDetails[i].Objyr;
    			vObjNo = DepotSpecDoc.aMailDetails[i].Objno;
    			vForNo = DepotSpecDoc.aMailDetails[i].Forno;
    			vForTp = DepotSpecDoc.aMailDetails[i].Fortp;
    			vForYr = DepotSpecDoc.aMailDetails[i].Foryr;
    		}
    	}
    	//alert("obj tp " + vObjTp + "objyr " + vObjYr + "objno" + vObjNo + "fortp " + vForTp + " forno " + vForNo + "foryr " +vForYr);
    	oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
    	var urlToCall =  serviceUrl + "/Sost_Email_Body?$filter=Objtp eq '" + vObjTp + "' and Objyr eq '" + vObjYr + "' and Objno eq '" + vObjNo
		+ "' and Forno eq '"+ vForNo + "' and Fortp eq '" + vForTp + "' and Foryr eq '" + vForYr  + "'";
    	/*var urlToCall =  serviceUrl + "/Sost_Email_Content?$filter=Objtp eq '" + vObjTp + "' and Objyr eq '" + vObjYr + "' and Objno eq '" + vObjNo
		+ "' and Forno eq '"+ vForNo + "' and Fortp eq '" + vForTp + "' and Foryr eq '" + vForYr  + "'";*/
    	//alert("url to call " + urlToCall);
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
		    	var message = "";
		    	var isAttach = false;
		    	if(data.results[0].Titel == "Y")
		    		isAttach = true;
		    	else
		    		isAttach = false;
		    	/*if((data.results[0].EmailCont1 == "" && data.results[0].EmailCont2 == "" && data.results[0].EmailCont3 == "" && data.results[0].EmailCont4 == "")){
		    		message = "No message content";
		    		sap.ui.commons.MessageBox.alert(message,"Message");
		    	}
		    	else{*/
		    		message = data.results[0].EmailCont1 + "\n" + data.results[0].EmailCont2 + "\n" + data.results[0].EmailCont3 + "\n" + data.results[0].EmailCont4 + "\n" + data.results[0].EmailCont5 + "\n" + 
		 		   data.results[0].EmailCont6 + "\n" + data.results[0].EmailCont7 + "\n" + data.results[0].EmailCont8 + "\n" + data.results[0].EmailCont9 + "\n" + data.results[0].EmailCont10 + "\n" +
		 		   data.results[0].EmailCont11 + "\n" + data.results[0].EmailCont12 + "\n" + data.results[0].EmailCont13 + "\n" + data.results[0].EmailCont14 + "\n" + data.results[0].EmailCont15;
		    	
		    	var oLabelTitle = new sap.ui.commons.Label({text: "Title : ",
                    layoutData: new sap.ui.layout.GridData({span: "L2 M2 S2",linebreak: false, margin: true}),
			        wrapping: true}).addStyleClass("fontTitle marginTop5");
			            
			    var oLabelTo = new sap.ui.commons.Label({text: "To : ",
			         layoutData: new sap.ui.layout.GridData({span: "L2 M2 S2",linebreak: false, margin: true}),
			          wrapping: true}).addStyleClass("fontTitle marginTop5");
			    var oLabelFrom = new sap.ui.commons.Label({text: "From : ",
			         layoutData: new sap.ui.layout.GridData({span: "L2 M2 S2",linebreak: false, margin: true}),
			          wrapping: true}).addStyleClass("fontTitle marginTop5");
			             
			    var oLabelSubject = new sap.ui.commons.Label({text: "Subject : ",
			           layoutData: new sap.ui.layout.GridData({span: "L2 M2 S2",linebreak: false, margin: true}),
			           wrapping: true}).addStyleClass("fontTitle marginTop5");
			    
			    var oLabelAttachment = new sap.ui.commons.Label({text: "Attachment : ",
			           layoutData: new sap.ui.layout.GridData({span: "L2 M2 S2",linebreak: false, margin: true}),
			           wrapping: true}).addStyleClass("fontTitle marginTop5");
			    
			
			   var oInputTitle = new sap.ui.commons.TextView({
				   text:vSelTitle,
		                    layoutData: new sap.ui.layout.GridData({span: "L10 M10 S10",linebreak: false, margin: true})
		             }).addStyleClass("FormInputStyle");
		             
			   var oInputFrom = new sap.ui.commons.TextView({
	            	 text:sender,
	                    layoutData: new sap.ui.layout.GridData({span: "L10 M10 S10",linebreak: false, margin: true}),
	             }).addStyleClass("FormInputStyle");
			   
	             var oInputTo = new sap.ui.commons.TextView({
	            	 text:receiver,
	                    layoutData: new sap.ui.layout.GridData({span: "L10 M10 S10",linebreak: false, margin: true}),
	             }).addStyleClass("FormInputStyle");
	             
	             var oAttachmentLink = new sap.ui.commons.Link({
	            	 text:"Download",
	            	 enabled:isAttach,
	            	 press:function(){
	            		 oCurrent.OpenMailAttachment(vObjNo,vObjTp,vObjYr, vSelTitle, false);
	            	 },
	                 layoutData: new sap.ui.layout.GridData({span: "L10 M10 S10",linebreak: false, margin: true}),
	             });
	             
	             var oInputSubject = new sap.ui.commons.TextArea({
	            	 value:message,
	            	// cols:30,
	            	 rows:15,
	            	// height:"200px",
	            	 wrapping:sap.ui.core.Wrapping.Soft,
	                 layoutData: new sap.ui.layout.GridData({span: "L12 M12 S12",linebreak: false, margin: true}),
	             }).addStyleClass("wraptext OutlineNone");
	          
		             var oMailLayout = new sap.ui.layout.form.ResponsiveGridLayout({
				    });
		             // Online Form Starts
		 	        var oMailForm = new sap.ui.layout.form.Form({
		 	                layout: oMailLayout,
		 	              //  width:"50%",
		 	                formContainers: [

		             	new sap.ui.layout.form.FormContainer({
                                   //title: "Unit Documents",
                                   formElements: [
                                                new sap.ui.layout.form.FormElement({
                                                    fields: [oLabelTitle, oInputTitle]
                                                }),
                                                new sap.ui.layout.form.FormElement({
                                                    fields: [oLabelFrom, oInputFrom]
                                                }),
                                                new sap.ui.layout.form.FormElement({
                                                    fields: [oLabelTo, oInputTo]
                                                }),
                                                new sap.ui.layout.form.FormElement({
                                                    fields: [oLabelAttachment, oAttachmentLink]
                                                }),
                                                /*new sap.ui.layout.form.FormElement({
                                                    fields: [oLabelSubject, oInputSubject]
                                                }),*/
                                                new sap.ui.layout.form.FormElement({
                                                    fields: [oInputSubject]
                                                })
                                  ]
		             	})
		             	]
                           });
		 	       busyDialog.close();
		 	      oOverlayMail.addContent(oMailForm);	
					if(!oOverlayMail.isOpen()){
						oOverlayMail.open();
					}
		    	//} //message content present 
		    	//sap.ui.commons.MessageBox.alert(message,"Message");
		    	//alert("message " + data.results[0].EmailCont1 + "len " + data.results.length);
		    },
		    function(err){
		    	busyDialog.close();
		    	errorfromServer(err);
		    	//alert("Error while Mail Contents : "+ window.JSON.stringify(err.response));
		    }); 
    },
    
    OpenMailAttachment: function(vObjNo,vObjTp,vObjYr, title, isDn){
    	var vDn = "";
    	if(isDn == "X"){
    		vDn = "X";
    	}else if(isDn == "P"){
    		vDn = "P";
    	}
    	
    	busyDialog.open();
    	oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
    	///sap/opu/odata/sap/ZNW_SEACO_PORTAL_LOT4_SRV/Sost_Email_Content_Pdf(IForno='',IFortp='',IForyr='',IObjno='000000000803',IObjtp='RAW',IObjyr='39',IFlag='X')
		var urlToCall = serviceUrl + "/Sost_Email_Content_Pdf(IForno='',IFortp='',IForyr='',IObjno='" + vObjNo + "',IDn='" + vDn + "',IObjtp='" + vObjTp + "',IObjyr='" + vObjYr + "',IFlag='X')";
		//alert("url " + urlToCall);
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
		    	busyDialog.close();
		    	//get ext
		    	var ext = data.FileExt.toLowerCase();
		    	//get file content
		    	var byteCharacters = atob(data.File1);
				var byteNumbers = new Array(byteCharacters.length);
				for (var i = 0; i < byteCharacters.length; i++) {
				   byteNumbers[i] = byteCharacters.charCodeAt(i);
				}
				var byteArray = new Uint8Array(byteNumbers);
		    	var crnFileMimeType = jQuery.grep(fileTypeJson, function(element, index){
					return element.fileextension == ext;
				});
		    	if(crnFileMimeType.length > 0){
					contentType = crnFileMimeType[0].mimetype;
					var blob = new Blob([byteArray], {type: contentType});
					//var blobUrl = URL.createObjectURL(blob);
					//window.open(blobUrl);
					if ((navigator.appName == 'Microsoft Internet Explorer') ||
			                 (!!navigator.userAgent.match(/Trident.*rv[ :]*11\./)))
				         	 {
								 window.navigator.msSaveOrOpenBlob(blob, title+'.'+ext);
				         	 }else{
				         		var blobUrl = URL.createObjectURL(blob);
								window.open(blobUrl);
				         	 }
				}else{
					sap.ui.commons.MessageBox.alert("Selected file type not supported");
				}
		    	
		    },
		    function(err){
		    	busyDialog.close();
		    	errorfromServer(err);
		    	//alert("Error while Mail Contents : "+ window.JSON.stringify(err.response));
		    }); 
    }
	});

function pad(s) { return (s < 10) ? '0' + s : s; }
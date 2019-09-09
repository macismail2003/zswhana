/*
 *
*$*$------------------------------------------------------------------------*
*$*$ Modified By : Seyed Ismail MAC
*$*$ Modified On : 15.12.2014
*$*$ Reference   : RTS1002
*$*$ Transport   : CGWK900792
*$*$ Tag         : MAC15122014
*$*$ Purpose     : This JS file is created to show RA result after successful RA creation
*$*$---------------------------------------------------------------------

*$*$------------------------------------------------------------------------*
*$*$ Modified By : Seyed Ismail MAC
*$*$ Modified On : 27.01.2014
*$*$ Reference   : RTS1002
*$*$ Transport   : CGWK900824
*$*$ Tag         : MAC27012014
*$*$ Purpose     : Removed Table and Inserted a panel
*$*$---------------------------------------------------------------------
**/
  var resultTable = [];		//  MAC27012014 +
  var oTableDepot1;			//  MAC27012014 +
  var oTableDepot2;			//  MAC27012014 +
  var oPanelDepot1;			//  MAC27012014 +
  var opanelDepot2;			//  MAC27012014 +
sap.ui.model.json.JSONModel.extend("onlineRetResult", {

  	createResult:function(){
		var oFlexboxResult = new sap.m.FlexBox("idResultFlxBox",{
            items: [],
            direction: "Column"
		  });
		
		return oFlexboxResult;
	},
	
  showResult: function(){
    var oCurrent = this;
    
		var backResult = new sap.m.Link("idBackResult", {text: " < Back",
        	  width:"13%",
        	  wrapping:true,
        	  press: function(){
        		  var bus = sap.ui.getCore().getEventBus();
        			bus.publish("nav", "back");
       	  }});
		  
		
		// Panel for Depot 1
		// **********************************************************************************
		oPanelDepot1 = new sap.ui.commons.Panel("idPanelDepot1",{width: "50%"});
		oPanelDepot1.addStyleClass("panelBorder");
		oPanelDepot1.setTitle(new sap.ui.core.Title({text: "Depot Details"}));
		
		// Table - Container Details
    	var oTableDepot1 = new sap.ui.table.Table("idTableDepot1",{
    		visibleRowCount: 10,
            firstVisibleRow: 3,
            columnHeaderVisible : false,
            selectionMode: sap.ui.table.SelectionMode.None,
            width: "100%",
            height:"100%"
    	 }).addStyleClass("fontTitle tblBorder");
    	
    	// Table Columns
    	oTableDepot1.addColumn(new sap.ui.table.Column({
		 template: new sap.ui.commons.TextView().bindProperty("text", "desc"),
         sortProperty: "desc",
         filterProperty: "desc",
         resizable:false,
         width:"130px"
		 }));
    	 
    	oTableDepot1.addColumn(new sap.ui.table.Column({
    		 template: new sap.ui.commons.TextView().bindProperty("text", "value"),
             sortProperty: "value",
             filterProperty: "value",
             resizable:false,
    		 }));
		oPanelDepot1.addContent(oTableDepot1);
		// Panel for Depot 2
		// **********************************************************************************
		oPanelDepot2 = new sap.ui.commons.Panel("idPanelDepot2",{width: "95%"});
		oPanelDepot2.addStyleClass("panelBorder");
		oPanelDepot2.setTitle(new sap.ui.core.Title({text: "Depot Details"}));
		
		// Table - Container Details
    	var oTableDepot2 = new sap.ui.table.Table("idTableDepot2",{
    		visibleRowCount: 10,
            firstVisibleRow: 3,
            columnHeaderVisible : false,
            selectionMode: sap.ui.table.SelectionMode.None,
            width: "100%",
            height:"100%"
    	 }).addStyleClass("fontTitle tblBorder");
    	
    	// Table Columns
    	oTableDepot2.addColumn(new sap.ui.table.Column({
		 template: new sap.ui.commons.TextView().bindProperty("text", "desc"),
         sortProperty: "desc",
         filterProperty: "desc",
         resizable:false,
         width:"130px"
		 }));
    	 
    	oTableDepot2.addColumn(new sap.ui.table.Column({
    		 template: new sap.ui.commons.TextView().bindProperty("text", "value"),
             sortProperty: "value",
             filterProperty: "value",
             resizable:false,
    		 }));
		
		oPanelDepot2.addContent(oTableDepot2);
		// ***********************************************************************************
		
		// Responsive Grid Layout
	    var oResultLayout = new sap.ui.layout.form.ResponsiveGridLayout("idResultLayout");
   	 
		  // Online Form Starts
		     var oResultForm = new sap.ui.layout.form.Form("idResultForm",{
		             layout: oResultLayout,
		             formContainers: [		                     
		                     new sap.ui.layout.form.FormContainer("idResultFormC1",{
		                             formElements: [
													new sap.ui.layout.form.FormElement("idDepotRes1",{
													    fields: [backResult],
													    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
														}),
													new sap.ui.layout.form.FormElement("idDepotRes2",{
													fields: []
													}),
													new sap.ui.layout.form.FormElement("idDepotRes3",{
													fields: []
													})
													]
		                     })                    
		             ]
		     });
		sap.ui.getCore().byId("idResultFlxBox").addItem(oResultForm);
		//this.getResult();
		
		},
		
		getResult: function(oTable){
		busyDialog.open();
		  var len = oTable.length;
		  var Row = [];
		  var count = 0;
		  var vUserName = "";
		  oTableDepot1 = sap.ui.getCore().byId("idTableDepot1");
		  oTableDepot2 = sap.ui.getCore().byId("idTableDepot2");
		  oPanelDepot1 = sap.ui.getCore().byId("idPanelDepot1");
		  oPanelDepot2 = sap.ui.getCore().byId("idPanelDepot2");
		  var urlToCall = serviceUrl + "/Redelivery_Dep_Dets?$filter=Username eq '" + vUserName + "' and ";
		  var iDate = "";
		  for(var j=0 ; j< len ; j++){
		  var depotName = oTable[j].Depot;
			//var depotName = aMailInputOR[j].Depot;
			depotName = depotName.replace(/\'/g, "|");
			depotName =  depotName.replace(/&/g, "@");
			var valMail = "";
			 Row[count] = "C$$U$L$" + depotName + "$D$S$R$E";
			 count++;
		  }

		  for(var k=0 ; k < Row.length ; k++){
			if(k != (Row.length-1)){
			  urlToCall = urlToCall + "ICustMail" + (k+1) + " eq '" + Row[k] + "' and ";
			}
			else{
			  urlToCall = urlToCall + "ICustMail" + (k+1) + " eq '" + Row[k] + "'";
			}
		  }

		  oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
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
			  var len = data.results.length;
			  if(len > 0){
			  resultTable = [];
			  for(var j=0;j<len;j++){
                resultTable[j] = data.results[j];
			  }
			  
				 var depotData = [
	 		         	{desc: "Depot : ", value: ""},
	 		         	{desc: "Address : ", value: ""},
						{desc: "", value: ""},
						{desc: "", value: ""},
						{desc: "", value: ""},
	 		         	{desc: "City :", value: ""},
	 		         	{desc: "Country : ", value: ""},
	 		         	{desc: "Postal Code : ", value: ""},
	 		         	{desc: "Telephone : ", value: ""},
	 		         	{desc: "Email : ", value: ""},
	         ];
			 
					 depotData[0].value = resultTable[0].NameOrg1; 
					 depotData[1].value = resultTable[0].Street;
					 depotData[2].value = resultTable[0].StrSuppl1;
					 depotData[3].value = resultTable[0].StrSuppl2;
					 depotData[4].value = resultTable[0].StrSuppl3;					 
					 depotData[5].value = resultTable[0].City1; 
					 depotData[6].value = resultTable[0].Country; 
					 depotData[7].value = resultTable[0].PostCode1; 
					 depotData[8].value = resultTable[0].TelNumber; 
					 depotData[9].value = resultTable[0].SmtpAddr;
			 
			   var oModelResult = new sap.ui.model.json.JSONModel();
				oModelResult.setData({modelData: depotData});
				oTableDepot1.setModel(oModelResult);
				oTableDepot1.bindRows("/modelData");
					 
				sap.ui.getCore().byId("idDepotRes2").insertField(oPanelDepot1,0);
			  
			  if(len > 1){
				 depotData = [];
				 
				 var depotData = [
	 		         	{desc: "Depot : ", value: ""},
	 		         	{desc: "Address : ", value: ""},
						{desc: "", value: ""},
						{desc: "", value: ""},
						{desc: "", value: ""},
	 		         	{desc: "City :", value: ""},
	 		         	{desc: "Country : ", value: ""},
	 		         	{desc: "Postal Code : ", value: ""},
	 		         	{desc: "Telephone : ", value: ""},
	 		         	{desc: "Email : ", value: ""},
	         ];
			 
					 depotData[0].value = resultTable[1].NameOrg1; 
					 depotData[1].value = resultTable[1].Street;
					 depotData[2].value = resultTable[1].StrSuppl1;
					 depotData[3].value = resultTable[1].StrSuppl2;
					 depotData[4].value = resultTable[1].StrSuppl3;					 
					 depotData[5].value = resultTable[1].City1; 
					 depotData[6].value = resultTable[1].Country; 
					 depotData[7].value = resultTable[1].PostCode1; 
					 depotData[8].value = resultTable[1].TelNumber; 
					 depotData[9].value = resultTable[1].SmtpAddr; 
					
				oModelResult = new sap.ui.model.json.JSONModel();
				oModelResult.setData({modelData: depotData});
				oTableDepot2.setModel(oModelResult);
				oTableDepot2.bindRows("/modelData");
					 
				sap.ui.getCore().byId("idDepotRes3").insertField(oPanelDepot2,0);
				oPanelDepot1.setTitle(new sap.ui.core.Title({text: "Depot 1 Details"}));
				oPanelDepot2.setTitle(new sap.ui.core.Title({text: "Depot 2 Details"}));
			  }
			  }
				busyDialog.close();
				
			  },
			  function(err){
				busyDialog.close();
				errorfromServer(err);
			  }); //odata request
				
			}
			  
});

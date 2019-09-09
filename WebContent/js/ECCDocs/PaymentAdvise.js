jQuery.sap.require("sap.ui.commons.MessageBox");
sap.ui.model.json.JSONModel.extend("PaymentAdvise", {
	createPaymentAdvise : function(){
		
		var backToPayment = new sap.m.Link("backToInventory", {text: " < Back",
      	  width:"7%",
      	  wrapping:true,
      	  press: function(){
      		  var bus = sap.ui.getCore().getEventBus();
      			bus.publish("nav", "back");
     	  }});
		
		var oPaymentAdviseTableTitle = new sap.m.Label("idPaymentAdviseTableTitle",{text : ""}).addStyleClass("fontTitlePymt").addStyleClass("marginTop10");
		
		// Table
		var oPaymentAdviseTable = new sap.ui.table.Table("idPaymentAdviseTbl",{
			//visibleRowCount: 2,
	        //firstVisibleRow: 3,
	        columnHeaderHeight: 30,
	        selectionMode: sap.ui.table.SelectionMode.None,
	        width: "60%",
	        height:"100%"
    	 }).addStyleClass("tblBorder").addStyleClass("marginTop10");
		
		// Document Date
		oPaymentAdviseTable.addColumn(new sap.ui.table.Column({
			  resizable:false,
			  width:"120px",
			label: new sap.ui.commons.Label({text: "Doc. Date"}),
			template: new sap.ui.commons.TextView().bindProperty("text", "Bldat"),
		 }));
		 
		// Seaco Reference
		oPaymentAdviseTable.addColumn(new sap.ui.table.Column({
			  resizable:false,
			  width:"180px",
			label: new sap.ui.commons.Label({text: "Seaco Reference"}),
			template: new sap.ui.commons.TextView().bindProperty("text", "Belnr"),
		 }));
		
		// Your reference
		oPaymentAdviseTable.addColumn(new sap.ui.table.Column({
			  resizable:false,
			  width:"180px",
			label: new sap.ui.commons.Label({text: "Your Reference"}),
			template: new sap.ui.commons.TextView().bindProperty("text", "Xblnr"),
		 }));
		
		// Amount
		oPaymentAdviseTable.addColumn(new sap.ui.table.Column({
			  resizable:false,
			  width:"120px",
			label: new sap.ui.commons.Label("idPaymentAdviseTblColAmount", {text: "Amount"}),
			template: new sap.ui.commons.TextView().bindProperty("text", "Wrbtr"),
		 }));
		
		var oFlexPaymentAdvise = new sap.m.FlexBox({
            items: [
                                   backToPayment,
                                   oPaymentAdviseTableTitle,
                                   oPaymentAdviseTable
            ],
            direction : "Column",
                     }).addStyleClass("marginTop10");
		
		// Responsive Grid Layout
		var oPaymentAdviseLayout = new sap.ui.layout.form.ResponsiveGridLayout("idPaymentAdviseLayout");
    	
    	// Online Form Starts
		var oPaymentAdviseForm = new sap.ui.layout.form.Form("idPaymentAdviseForm",{
			                layout: oPaymentAdviseLayout,
			                formContainers: [
			                        new sap.ui.layout.form.FormContainer("idPaymentAdviseFormC1",{
			                               // title: "Accounts Summary",
			                                formElements: [
														
														new sap.ui.layout.form.FormElement({
													        fields: [oFlexPaymentAdvise]
														})
			                                        ]
			                        })
			                ]
			        });
		
		return oPaymentAdviseForm;
		
	},
	
	getPaymentAdvise : function(title){
		oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
    	var urlToCall =  serviceUrl + "/Sost_Payment?$filter=Title eq '" + title + "'";
    	
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
		       var jsonPaymentAdvise = data.results;
		       var jsonPaymentAdviseFinal = [];
		       
		       for(var i=0; i<jsonPaymentAdvise.length; i++){
		    	   	  var Bldat = jsonPaymentAdvise[i].Bldat.split("(");
		    	   	  Bldat = Bldat[1].split(")");

					  var vActualSendDate = new Date(Number(Bldat[0])); //dateFormat(new Date(Number(vDate[0])), 'dd-mm-yyyy');
					  var vSndDate = dateFormat(new Date(Number(Bldat[0])), 'dd-mm-yyyy',"UTC");
					  if (vSndDate.substring(6) === "9999"){
						  jsonPaymentAdvise[i].Bldat =  "-";
					  }
					  else{
						  jsonPaymentAdvise[i].Bldat = vSndDate;
					 }
					  
					  jsonPaymentAdviseFinal.push({
						  Bldat : jsonPaymentAdvise[i].Bldat,
						  Belnr : jsonPaymentAdvise[i].Belnr,
						  Xblnr : jsonPaymentAdvise[i].Xblnr,
						  Wrbtr : thousandsep(jsonPaymentAdvise[i].Wrbtr)
					  });
		       }
					  var oModelPaymentAdvise = new sap.ui.model.json.JSONModel();
					  oModelPaymentAdvise.setData(jsonPaymentAdviseFinal);
				      
					  var oPaymentAdviseTbl = sap.ui.getCore().byId("idPaymentAdviseTbl");
					  oPaymentAdviseTbl.setModel(oModelPaymentAdvise);
					  oPaymentAdviseTbl.bindRows("/");
					  sap.ui.getCore().byId("idPaymentAdviseTblColAmount").setText("Amount(" + jsonPaymentAdvise[0].Waers + ")");
					  var title = "Remittance Summary for Amount : " + thousandsep(jsonPaymentAdvise[0].Total) + " " + jsonPaymentAdvise[0].Waers;
					  sap.ui.getCore().byId("idPaymentAdviseTableTitle").setText(title);
				    	var vArrayLength = jsonPaymentAdviseFinal.length;
			        	if(vArrayLength < 25){
			        		oPaymentAdviseTbl.setVisibleRowCount(vArrayLength);
			        		oPaymentAdviseTbl.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
			        	}
			        	else{
			        		oPaymentAdviseTbl.setVisibleRowCount(25);
			        		oPaymentAdviseTbl.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
			        	}
				        	
		       
		 	   busyDialog.close();
		    },
		    function(err){
		    	busyDialog.close();
		    	errorfromServer(err);
		    	//alert("Error while Mail Contents : "+ window.JSON.stringify(err.response));
		    }); 
    	
	}
});
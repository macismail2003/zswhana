
 var aChkBoxChkdUnitNumbrsOR = [];
var aChkBoxChkdUnitNumbrsORLen = 0;
jQuery.sap.require("sap.ui.model.json.JSONModel");

	sap.ui.model.json.JSONModel.extend("onlineRetSelUnitsView", {
		
		createOnlineRetUnitsSel:function(){
			var oFlexboxOnlineRetUnitsSel = new sap.m.FlexBox("idOnlineRetUnitsSelFlxBox",{
	            items: [],
	            direction: "Row"
			  });
			
			return oFlexboxOnlineRetUnitsSel;
		},
		
		createOnlineRetUnitsSelFormView: function(){
			var oCurrent = this;
			sap.ui.getCore().byId("idOnlineRetUnitsSelFlxBox").destroyItems();
			var oOnlineRetSelUnitsLayout = new sap.ui.layout.form.ResponsiveGridLayout("idOnlineRetSelUnitsLayout");
			
			// Table
			var oSerialNumbrTable = new sap.ui.table.Table("idUnitNumbrTblOR",{
	 	        visibleRowCount: 5,
	 	        firstVisibleRow: 1,
	 	        columnHeaderHeight: 30,
	 	        navigationMode:sap.ui.table.NavigationMode.Scrollbar,
	 	        selectionMode: sap.ui.table.SelectionMode.None,
	 	        width: "50%",
	 	       // height:"100%",
	    	 }).addStyleClass("fontStyle tblBorder marginTop10");
			oSerialNumbrTable._oVSb.setSteps(50);
			oSerialNumbrTable._oVSb.setVertical(true);
			oSerialNumbrTable._oVSb.setScrollPosition(0);

			oSerialNumbrTable.addColumn(new sap.ui.table.Column({
					/*label: new sap.ui.commons.CheckBox("idSelectAllUnitNumbers",{
		   		 	 change : function(){
		   		 		oCurrent.SelectAllUnitNumbers();
		   		 	 }
		   		 	}).bindProperty("checked", "isAllChecked"),*/
	    	        template: new sap.ui.commons.CheckBox().bindProperty("checked", "checked").bindProperty("name", "Sernr").bindProperty("checked", "isChecked"),
	    	        width: "75px",
	    	        //hAlign: "Center",
	    	        resizable:false
	    	}));
			
			oSerialNumbrTable.addColumn(new sap.ui.table.Column({
	  	         template: new sap.ui.commons.TextView().bindProperty("text", "Sernr"),
	  	         sortProperty: "Sernr",
	  	         filterProperty: "Sernr",
	  	         resizable:false
			}));
			var NoChkBoxCheckedMessage = "No Units have been selected. \n " +
			 "Please select unit(s) by checking the relevant checkbox(es) on the left of the Unit Number and retry";
	    	
			// Buttons
			var oBtnSelContinue = new sap.m.Button("idBtnSelContinue",{
		          text : "Continue",
		          styled:false,
		            width:"95px",
		          layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
		          press:function(){
		        	  aChkBoxChkdUnitNumbrsOR = [];
		        	  aChkBoxChkdUnitNumbrsOR = jQuery.grep(aUnitNumbersOR, function(element, index){
		 	             return element.isChecked == true;
		 	     		});
		        	  
		        	  aChkBoxChkdUnitNumbrsORLen = aChkBoxChkdUnitNumbrsOR.length;
		        	//  alert("len " + aChkBoxChkdUnitNumbrsORLen);
		        	  //aChkBoxChkdUnitNumbrsOR = $('#idUnitNumbrTblOR').find('input[type="checkbox"]:checked');
		        	  
	                  if(aChkBoxChkdUnitNumbrsORLen == 0){
	                	  sap.ui.commons.MessageBox.show(NoChkBoxCheckedMessage,
	                              sap.ui.commons.MessageBox.Icon.WARNING,
	                              "Warning",
	                              [sap.ui.commons.MessageBox.Action.OK], 
	                                  sap.ui.commons.MessageBox.Action.OK);
	                  }
	                  else{
	                	 // alert("unit numbers selected " + aChkBoxChkdUnitNumbrsOR );
	                	  var oORGetUN = new onlineRetView();
	                	  oORGetUN.selectUN_OR();
	                	  var bus = sap.ui.getCore().getEventBus();
		        			bus.publish("nav", "back");
		        			
	                  }
	                  
		        	  }
			}).addStyleClass("submitBtn");
	    	
			var oBtnSelBack = new sap.m.Button("idBtnSelBack",{
		          text : "Back",
		          styled:false,
		            width:"80px",
		          layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
		          press:function(){
		        	  var bus = sap.ui.getCore().getEventBus();
	        			bus.publish("nav", "back");
		          
		        	  }
			}).addStyleClass("submitBtn");
			  var lblSpace1 = new sap.ui.commons.Label( {text: " ",width : '8px'});
			  
			  var oFlexBoxContinueNBackButton = new sap.m.FlexBox({
		    		width: "100%",
		    		items:[
		    		       oBtnSelContinue, lblSpace1, oBtnSelBack
		    		],
		    		direction: "Row"
		    	}).addStyleClass("marginTop10");;
		    	
			// Textfields
			var oTxtCustomer = new sap.ui.commons.TextView("idValCustomer",{layoutData: new sap.ui.layout.GridData({span: "L8 M3 S4",linebreak: false, margin: false}),}).addStyleClass("fontTitle marginTop10");
			
			var oTxtContract = new sap.ui.commons.TextView("idValContractNo",{layoutData: new sap.ui.layout.GridData({span: "L8 M3 S4",linebreak: false, margin: false}),}).addStyleClass("fontTitle marginTop10");
			
			var oTxtUnitType = new sap.ui.commons.TextView("idValUnitType",{layoutData: new sap.ui.layout.GridData({span: "L8 M3 S4",linebreak: false, margin: false}),}).addStyleClass("fontTitle marginTop10");
			
			var oTxtCountry = new sap.ui.commons.TextView("idValCountry",{layoutData: new sap.ui.layout.GridData({span: "L8 M3 S4",linebreak: false, margin: false}),}).addStyleClass("fontTitle marginTop10");
			
			var oTxtCity = new sap.ui.commons.TextView("idValCity",{layoutData: new sap.ui.layout.GridData({span: "L8 M3 S4",linebreak: false, margin: false}),}).addStyleClass("fontTitle marginTop10");
			
			var oTxtDepot = new sap.ui.commons.TextView("idValDepot",{layoutData: new sap.ui.layout.GridData({span: "L8 M3 S4",linebreak: false, margin: false}),}).addStyleClass("fontTitle marginTop10");

			// Labels
			var oLabelCustomer = new sap.ui.commons.Label({text: "Customer: ",
				layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: false, margin: false}),
	            wrapping: true}).addStyleClass("fontTitle marginTop10");
			
			var oLabelContractNo = new sap.ui.commons.Label({text: "Contract No.: ",
				layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: false, margin: false}),
	            wrapping: true}).addStyleClass("fontTitle marginTop10");
			
			var oLabelUnitType = new sap.ui.commons.Label({text: "Unit Type: ",
				layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: false, margin: false}),
	            wrapping: true}).addStyleClass("fontTitle marginTop10");
			
			var oLabelCountry = new sap.ui.commons.Label({text: "Country: ",
				layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: false, margin: false}),
	            wrapping: true}).addStyleClass("fontTitle marginTop10");
			
			var oLabelCity = new sap.ui.commons.Label({text: "City: ",
				layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: false, margin: false}),
	            wrapping: true}).addStyleClass("fontTitle marginTop10");
			
			var oLabelDepot = new sap.ui.commons.Label({text: "Depot: ",
				layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: false, margin: false}),
	            wrapping: true}).addStyleClass("fontTitle marginTop10");
			
			var oLabelUnitNumbrTbltitle = new sap.ui.commons.Label({text: "Please select the units to Return by checking the required checkboxes",
	            wrapping: true}).addStyleClass("font15Bold marginTop10");
			
			// Online Form Starts
			var oOnlineSelUnitsForm = new sap.ui.layout.form.Form("idOnlineRetSelUnitsForm",{
				                layout: oOnlineRetSelUnitsLayout,
				                formContainers: [
				                        
				                        new sap.ui.layout.form.FormContainer("idOnlineRetSelUnitsFormC1",{
				                                title: "List of Units On-Hire for",
				                                formElements: [
															new sap.ui.layout.form.FormElement({
															    fields: [oLabelCustomer, oTxtCustomer]
															}),
															
															new sap.ui.layout.form.FormElement({
														        fields: [oLabelContractNo, oTxtContract]
															}),
															
															new sap.ui.layout.form.FormElement({
															    fields: [oLabelUnitType, oTxtUnitType]
															}),
															
															new sap.ui.layout.form.FormElement({
															    fields: [oLabelCountry, oTxtCountry]
															}),
															
															new sap.ui.layout.form.FormElement({
															    fields: [oLabelCity, oTxtCity]
															}),
															
															new sap.ui.layout.form.FormElement({
															    fields: [oLabelDepot, oTxtDepot]
															})
				                                        ]
				                        }),
				                        
				                        new sap.ui.layout.form.FormContainer("idOnlineRetSelUnitsFormC2",{
				                            formElements: [
														new sap.ui.layout.form.FormElement({
														    fields: []
														})
				                                    ]
				                        }),		
				                        
				                        new sap.ui.layout.form.FormContainer("idOnlineRetSelUnitsFormC3",{
				                            //title: "Please select the units to Return by checking the required checkboxes", 
				                            width:"100%",
				                            formElements: [
														new sap.ui.layout.form.FormElement({
														    fields: [oLabelUnitNumbrTbltitle]
														}),
														new sap.ui.layout.form.FormElement({
														    fields: [oSerialNumbrTable]
														}),
														new sap.ui.layout.form.FormElement({
													        fields: [oFlexBoxContinueNBackButton]
														})
				                                    ]
				                    }),			                        
				                ]
				        });
			sap.ui.getCore().byId("idOnlineRetUnitsSelFlxBox").addItem(oOnlineSelUnitsForm);
				        	//return oOnlineSelUnitsForm;
		}, 
		
		bindUnitNumbers:function(){
			var vUnitNumbrTbl = sap.ui.getCore().byId("idUnitNumbrTblOR");
			var vCountryTV = sap.ui.getCore().byId("idValCountry");
			var vCustomerTV = sap.ui.getCore().byId("idValCustomer");
			var vContractTV = sap.ui.getCore().byId("idValContractNo");
			var vCityTV = sap.ui.getCore().byId("idValCity");
			var vDepotTV = sap.ui.getCore().byId("idValDepot");
			var vUnitTypeTV = sap.ui.getCore().byId("idValUnitType");
			
			vCustomerTV.setText(vSelCustomerOR);
			vContractTV.setText(vSelContractOR.getValue());
			vCountryTV.setText(vSelCountryOR.val());
			vCityTV.setText(vSelCityOR.val());
			vUnitTypeTV.setText(vSelUnitTypeOR.getValue());
			vDepotTV.setText(vSelDepotOR.val());
			
			//alert(aUnitNumbersOR.length)
			//Create a model and bind the table rows to this model
	    	var oModelReturnsSelUnits = new sap.ui.model.json.JSONModel();
	    	oModelReturnsSelUnits.setData({modelData: aUnitNumbersOR});
	    	vUnitNumbrTbl.setModel(oModelReturnsSelUnits);
	    	vUnitNumbrTbl.bindRows("/modelData");
		}, //bindUnitNumbers
		
		SelectAllUnitNumbers:function(){
			var len = aUnitNumbersOR.length;
			var vUnitNumbrTbl = sap.ui.getCore().byId("idUnitNumbrTblOR");
			for(var i=0;i<len;i++){
				aUnitNumbersOR[i].isChecked = true;
			}
			vUnitNumbrTbl.getModel().updateBindings();
		}
});
/******** NP *******/
jQuery.sap.require("sap.ui.model.json.JSONModel");

var aDepotInfo = [
		         	{desc: "Address : ", value: ""},
		         	{desc: "Phone : ", value: ""},
		         	{desc: "Fax : ", value: ""},
		         	{desc: "Email : ", value: ""},
		         	{desc: "Seaco Depot Code : ", value: ""},
		         	{desc: "Cargo Type : ", value: ""}
        ];

var latitude ='';
var longitude = '';
var map = '';
var marker = '';
var cityToShowOnMap = "";
var depotNameToShowFD = "";


sap.ui.model.json.JSONModel.extend("depotInfoView", {
	
	createDepotInfo: function(){
		var oCurrentFDPD = this;
		var bckFrmDepInfToInScrnPDFD = new sap.m.Link("idBckFrmDepInfToInScrnPDFD", {
			text: " < Back",
            width:"12%",
            wrapping:true,
            press: function(){
                    var bus = sap.ui.getCore().getEventBus();
                    bus.publish("nav", "back");
            }});
		
		var oLblFDPDDepInfo = new sap.ui.commons.Label("idLblFDPDDepInfo",{
			text: "Depot Information",
            wrapping: true}).addStyleClass("marginTop10 sapUiFormTitle");
		
		var oLblFDPDDepInfoTitle = new sap.ui.commons.Label("idLblFDPDDepInfoTitle",{
            wrapping: true}).addStyleClass("marginTop10 font15Bold wraptext");

		// Buttons
		var oBtnDepInfoShowInv = new sap.m.Button({
            text : "Show Inventory",
            styled:false,
            //icon: "images/view_all.png",
            press:function(){
	        	  var bus = sap.ui.getCore().getEventBus();
	        	  bus.publish("nav", "to", {
                  id : "DepotInfo"
              }); 
	          }
         }).addStyleClass("submitBtn marginTop10");
		
		// Table
    	var oDepoInfoTable = new sap.ui.table.Table("idFDTblDepInfoWithMap",{
    		visibleRowCount: 6,
            firstVisibleRow: 3,
            columnHeaderVisible : false,
            columnHeaderHeight: 30,
            selectionMode: sap.ui.table.SelectionMode.None,
            height:"100%"
    	 }).addStyleClass("tblBorder marginTop10");
    	
    	// Table Columns
    	oDepoInfoTable.addColumn(new sap.ui.table.Column({
         template: new sap.ui.commons.TextView().bindProperty("text", "desc").addStyleClass("wraptext"),
         sortProperty: "desc",
         filterProperty: "desc",
         width:"50px",
         resizable: false
    	 }));
    	 
    	oDepoInfoTable.addColumn(new sap.ui.table.Column({
    		 template: new sap.ui.commons.TextView().bindProperty("text", "value").addStyleClass("wraptext"),
             sortProperty: "value",
             filterProperty: "value",
             width:"100px",
             resizable: false
    		 }));
    	
    	var htmlMapView = new sap.ui.core.HTML("idMapView", {
			content:
				"<div id='map-canvas' class='mapStyle'></div>",
			preferDOM : false,
			afterRendering : function(e) {
				oCurrentFDPD.initialize();
			}
		});
		
		/*function initialize() {
			var geocoder = new google.maps.Geocoder();
			var address = cityToShowOnMap;

			geocoder.geocode({ 'address': address}, function(results, status) {
			  if (status == google.maps.GeocoderStatus.OK) {
				    latitude = results[0].geometry.location.lat();
				    longitude = results[0].geometry.location.lng();

				    var myLatlng = new google.maps.LatLng(latitude,longitude );
				    var mapOptions = {
				    					zoom: 16,
				    					center: myLatlng
				    };
			  
				    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

					marker = new google.maps.Marker({
					      							position: myLatlng,
					      							map: map,
				    });
			  } 
			}); 
       	}*/
		
		
    	// Flex Boxes
		var oFlexButton = new sap.m.FlexBox({
           items: [
                   oBtnDepInfoShowInv
           ],
           direction : sap.m.FlexDirection.RowReverse,
           width:"30%"
			});
		
		var oFlexDepNameTitleFDPD = new sap.m.FlexBox({
	           items: [
	                   oLblFDPDDepInfoTitle
	           ],
	           direction : "Row",
	           width:"70%"
				});
		
		var oFlexDepNameTitleBtnFDPD = new sap.m.FlexBox({
	           items: [
						oFlexDepNameTitleFDPD,
						oFlexButton
	           ],
	           direction : "Row",
	           width:"100%"
				});
		
		var oFlexAll = new sap.m.FlexBox("idFDFlexDepInfoExport",{
	           items: [
	                   bckFrmDepInfToInScrnPDFD,
	                   oLblFDPDDepInfo,
	                   oFlexDepNameTitleBtnFDPD,
	                   oDepoInfoTable,
	                   htmlMapView
	           ],
	           direction : "Column",
	           width:"50%"
				});
		
		// Responsive Grid Layout
	    var oDepotInfoLayout = new sap.ui.layout.form.ResponsiveGridLayout("idDepotInfoLayout",{
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
   	 
  // Online Form Starts
     var oDepotInfoForm = new sap.ui.layout.form.Form("idDepotInfoForm",{
             layout: oDepotInfoLayout,
             formContainers: [
                     
                     new sap.ui.layout.form.FormContainer("idDepotInfoFormC1",{
                             //title: "Depot Information",
                             formElements: [
											new sap.ui.layout.form.FormElement({
											    fields: [oFlexAll]
											})
                                     ]
                     })                    
             ]
     });
     	return oDepotInfoForm;
	
	},
	
	fetchDepotInfo: function(selectedDepotCode){
		var oCurrentFDPD = this;
		for(var i=0; i<aPortsDeportsFD.length; i++){
			if(selectedDepotCode == aPortsDeportsFD[i].DepotCode){
				aDepotInfo[0].value=aPortsDeportsFD[i].Street+aPortsDeportsFD[i].Street1+aPortsDeportsFD[i].Street2+aPortsDeportsFD[i].Street3+aPortsDeportsFD[i].Street4;
				aDepotInfo[1].value=aPortsDeportsFD[i].ContactNo;
				aDepotInfo[2].value=aPortsDeportsFD[i].FaxNo;
				aDepotInfo[3].value=aPortsDeportsFD[i].Email;
				aDepotInfo[4].value=aPortsDeportsFD[i].DepotCode;
				aDepotInfo[5].value=aPortsDeportsFD[i].CargoTypeDes;
				
				depotNameToShowFD = aPortsDeportsFD[i].DepotName;
				sap.ui.getCore().byId("idLblFDPDDepInfoTitle").setText(depotNameToShowFD);

				if(aPortsDeportsFD[i].PostalCode != "")
					{
					  	cityToShowOnMap = aPortsDeportsFD[i].PostalCode;
					  	//alert("cityToShowOnMap : "+cityToShowOnMap);
					}
				else if(aPortsDeportsFD[i].Street+aPortsDeportsFD[i].Street1+aPortsDeportsFD[i].Street2+aPortsDeportsFD[i].Street3+aPortsDeportsFD[i].Street4 != "")
					{
						cityToShowOnMap = aPortsDeportsFD[i].Street+aPortsDeportsFD[i].Street1+aPortsDeportsFD[i].Street2+aPortsDeportsFD[i].Street3+aPortsDeportsFD[i].Street4;     
						//alert("cityToShowOnMap : "+cityToShowOnMap);
					}
				else
					{
						cityToShowOnMap = aPortsDeportsFD[i].City;
						//alert("cityToShowOnMap : "+cityToShowOnMap);
					}
		
				//cityToShowOnMap = aPortsDeportsFD[i].City;
				//cityToShowOnMap = aPortsDeportsFD[i].Street+aPortsDeportsFD[i].Street1+aPortsDeportsFD[i].Street2+aPortsDeportsFD[i].Street3+aPortsDeportsFD[i].Street4;
				//cityToShowOnMap = aPortsDeportsFD[i].PostalCode;
			}
		}
		
		//Create a model and bind the table rows to this model
    	var oModelDepInfo = new sap.ui.model.json.JSONModel();
    	oModelDepInfo.setData({modelData: aDepotInfo});
    	sap.ui.getCore().byId("idFDTblDepInfoWithMap").setModel(oModelDepInfo);
    	sap.ui.getCore().byId("idFDTblDepInfoWithMap").bindRows("/modelData");
    	sap.ui.getCore().byId("idFDTblDepInfoWithMap").updateBindings();
    	
    	oCurrentFDPD.initialize();
    	},
    	
    	initialize: function() {
			var geocoder = new google.maps.Geocoder();
			var address = cityToShowOnMap;

			geocoder.geocode({ 'address': address}, function(results, status) {
			  if (status == google.maps.GeocoderStatus.OK) {
				    latitude = results[0].geometry.location.lat();
				    longitude = results[0].geometry.location.lng();

				    var myLatlng = new google.maps.LatLng(latitude,longitude );
				    var mapOptions = {
				    					zoom: 16,
				    					center: myLatlng
				    };
			  
				    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

					marker = new google.maps.Marker({
					      							position: myLatlng,
					      							map: map,
				    });
			  } 
			}); 
       	}
});
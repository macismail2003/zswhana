var  aEquipCatBoxes = [
                       {desc: "Manufacturer", value: ""},
                       {desc: "ISO Code", value: ""},
                       {desc: "CSC", value: ""},
                       {desc: "TIR", value: ""},
                       {desc: "Internal Length", value: ""},
                       {desc: "Internal Width", value: ""},
                       {desc: "Internal Height", value: ""},
                       {desc: "Door Opening Width", value: ""},
                       {desc: "Door Opening Height", value: ""},
                       {desc: "Cubic Capacity", value: ""},
                       {desc: "External Length", value: ""},
                       {desc: "External Width", value: ""},
                       {desc: "External Height", value: ""},
                       {desc: "Tare Weight", value: ""},
                       {desc: "Maximum Payload", value: ""},
                       {desc: "Maximum Gross Weight", value: ""},
                       {desc: "Stacking Height", value: ""},
                       {desc: "Stacking Test Load per Post", value: ""},
                       {desc: "Racking Weight", value: ""},
                       {desc: "Floor Thickness", value: ""}
                  
  ];

sap.ui.model.json.JSONModel.extend("eqiupCatView", {

	createEqiupCatBoxes:function(){
		var oFlexboxEqiupCatBoxes = new sap.m.FlexBox("idEqiupCatBoxesFlxBox",{
            items: [],
            direction: "Row"
		  });
		
		return oFlexboxEqiupCatBoxes;
	},
	
       createEqiupCatBoxesFormView: function(){
    	   sap.ui.getCore().byId("idEqiupCatBoxesFlxBox").destroyItems();
    	   var backFullSpecBoxes = new sap.m.Link("idBackFullSpecBoxes", {text: " < Back",
         	  width:"13%",
         	  wrapping:true,
         	  press: function(){
         		  var bus = sap.ui.getCore().getEventBus();
         			bus.publish("nav", "back");
        	  }});
    	   
    	   var oBtnFullSpecBoxesExport = new sap.m.Button({
               text : "Export To PDF",
               styled : false, // MACHANACHANGES_12062019+
               //icon: sap.ui.core.IconPool.getIconURI("pdf-attachment"), // MACHANACHANGES_12062019-
               press:function(){
                     //alert("Export to PDF");
   	                  var colWidthArr = [2.5, 4];
   		        	  //arrColmnName =['Serial No.','Unit No.','Last Clean Date','Hours','Cargo Desc.','Clean Process Desc.','Status']; //COLUMN NAME
   		              var verticalOffset = 1.25; 
   		              generatePDFFullSpecBoxes(aEquipCatBoxes,FullSpecTitle,colWidthArr,verticalOffset);
               }
            }).addStyleClass("submitBtnEnd");
    	   
              // Table
              var oEqiupCatTable = new sap.ui.table.Table("idBoxesTbl",{
               visibleRowCount: 20,
               firstVisibleRow: 3,
               columnHeaderHeight: 30,
               columnHeaderVisible : false,
               selectionMode: sap.ui.table.SelectionMode.None,
               width: "50%",
               height:"100%"
        }).addStyleClass("font15 tblBorder marginTop10");
              
              // Table Columns
              oEqiupCatTable.addColumn(new sap.ui.table.Column({
         template: new sap.ui.commons.TextView().bindProperty("text", "desc"),
         width:"200px",
         sortProperty: "desc",
         filterProperty: "desc",
               }));
               
              oEqiupCatTable.addColumn(new sap.ui.table.Column({
                      template: new sap.ui.commons.TextView().bindProperty("text", "value"),
                      width:"335px",
                sortProperty: "value",
                filterProperty: "value",
                      }));
       
              var oFlexBoxBackBtn = new sap.m.FlexBox({
		  		  items: [
		  		          backFullSpecBoxes
		     		  ],
		     		  direction: "Column",
		     		});
              
              var oLabelFullSpecTitle = new sap.ui.commons.Label({text: FullSpecTitle,
                  wrapping: true}).addStyleClass("font15Bold");
              
              var oFlexFullSpecHeaderBtn = new sap.m.FlexBox({
		  		  items: [
		  		          	oBtnFullSpecBoxesExport
		     		  ],
		     		  direction: "RowReverse",
		     		  width:"15%"
		     		});
              
              var oFlexFullSpecTitle = new sap.m.FlexBox({
		  		  items: [
		  		          oLabelFullSpecTitle
		     		  ],
		     		  direction: "Row",
		     		  width:"35%"
		     		});
              
              var oFlexFullSpecHeader = new sap.m.FlexBox({
		  		  items: [
		  		          oFlexFullSpecTitle,oFlexFullSpecHeaderBtn
		     		  ],
		     		  direction: "Row",
		     		});
              
              var oFlexFullSpecData = new sap.m.FlexBox({
		  		  items: [
		  		          oFlexFullSpecHeader,oEqiupCatTable
		     		  ],
		     		  direction: "Column",
		     		});
              
              var disclText = 'Although every effort is being made to maintain accurate and correct information, some technical specifications are dynamic in nature.'
            		+ 'Therefore, this information is provided "as is" without warranty of any kind.';
            	
            	 var oLblDisclaimer = new sap.ui.commons.Label({text: disclText,
            		 width:"50%",
                     wrapping: true}).addStyleClass("font11Light marginTop10");
            	 
            	 
       // Responsive Grid Layout
              var oEquipcatBoxesLayout = new sap.ui.layout.form.ResponsiveGridLayout("idEquipcatBoxesLayout");
       
       // Online Form Starts
              var oEquipcatBoxesForm = new sap.ui.layout.form.Form("idEquipcatBoxesForm",{
                                     layout: oEquipcatBoxesLayout,
                                     formContainers: [
                                             
                                             new sap.ui.layout.form.FormContainer("idEquipcatBoxesFormC1",{
                                                    // title: oLabelFullSpecTitle, //FullSpecTitle,
                                                     formElements: [
                                                                    new sap.ui.layout.form.FormElement({
                                                                        fields: [oFlexFullSpecData]
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
		  		        oEquipcatBoxesForm
		     		  ],
		     		  direction: "Column",
		     		});
              
              sap.ui.getCore().byId("idEqiupCatBoxesFlxBox").addItem(oFlexBoxFull);
              
                                 //  return oFlexBoxFull;
       },
       
       bindBoxDetails: function(){
               aEquipCatBoxes = [
                                          {desc: "Manufacturer", value: ""},
                                          {desc: "ISO Code", value: ""},
                                          {desc: "CSC", value: ""},
                                          {desc: "TIR", value: ""},
                                          {desc: "Internal Length", value: ""},
                                          {desc: "Internal Width", value: ""},
                                          {desc: "Internal Height", value: ""},
                                          {desc: "Door Opening Width", value: ""},
                                          {desc: "Door Opening Height", value: ""},
                                          {desc: "Cubic Capacity", value: ""},
                                          {desc: "External Length", value: ""},
                                          {desc: "External Width", value: ""},
                                          {desc: "External Height", value: ""},
                                          {desc: "Tare Weight", value: ""},
                                          {desc: "Maximum Payload", value: ""},
                                          {desc: "Maximum Gross Weight", value: ""},
                                          {desc: "Stacking Height", value: ""},
                                          {desc: "Stacking Test Load per Post", value: ""},
                                          {desc: "Racking Weight", value: ""},
                                          {desc: "Floor Thickness", value: ""}
                                     
                     ];
               
               //unit status
               aEquipCatBoxes[0].value = aFullSpecificationBoxes[0].Manufacturer;
               aEquipCatBoxes[1].value = aFullSpecificationBoxes[0].IsoCode;
               aEquipCatBoxes[2].value = aFullSpecificationBoxes[0].Csc;
               aEquipCatBoxes[3].value = aFullSpecificationBoxes[0].Tir;
               aEquipCatBoxes[4].value = aFullSpecificationBoxes[0].LengthInt;
               aEquipCatBoxes[5].value = aFullSpecificationBoxes[0].WidthInt;
               aEquipCatBoxes[6].value = aFullSpecificationBoxes[0].HeightInt;
               aEquipCatBoxes[7].value = aFullSpecificationBoxes[0].DoorOpeningWidth;
               aEquipCatBoxes[8].value = aFullSpecificationBoxes[0].DoorOpeningHeight;
               aEquipCatBoxes[9].value = aFullSpecificationBoxes[0].CubicCapacity;
               aEquipCatBoxes[10].value = aFullSpecificationBoxes[0].LengthExt;
               aEquipCatBoxes[11].value = aFullSpecificationBoxes[0].WidthExt;
               aEquipCatBoxes[12].value = aFullSpecificationBoxes[0].HeightExt;
               aEquipCatBoxes[13].value = aFullSpecificationBoxes[0].TareWeight;
               aEquipCatBoxes[14].value = aFullSpecificationBoxes[0].MaximumPayload;
               aEquipCatBoxes[15].value = aFullSpecificationBoxes[0].MaximumGrossWeight;
               aEquipCatBoxes[16].value = aFullSpecificationBoxes[0].StackingHeight;
               aEquipCatBoxes[17].value = aFullSpecificationBoxes[0].StackingTetsLoadPerPost;
               aEquipCatBoxes[18].value = aFullSpecificationBoxes[0].RackingWeight;
               aEquipCatBoxes[19].value = aFullSpecificationBoxes[0].FloorThickness;

        
               //Create a model and bind the table rows to this model
                      var oModelEquipCatBox = new sap.ui.model.json.JSONModel();
                      oModelEquipCatBox.setData({modelData: aEquipCatBoxes});
                      
                      // NP - Change here
                      sap.ui.getCore().byId("idBoxesTbl").setModel(oModelEquipCatBox);
                      sap.ui.getCore().byId("idBoxesTbl").bindRows("/modelData");
 }

});

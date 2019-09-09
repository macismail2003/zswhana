
sap.ui.model.json.JSONModel.extend("fheaderdet", {

	/* FHEADER : Create Header Detail Set */

	createFHEADERDETPage : function(){

    var oCurrent = this;

    var backEDI = new sap.m.Link({text: " < Back",
            width:"7%",
            wrapping:true,
            press: function(){
              var bus = sap.ui.getCore().getEventBus();
              bus.publish("nav", "back");
              $('#idHdrContnt').html('EDI Search');
          }});

      /* Header Detail Table */

      var oFHEADERDETTableResult = new sap.ui.table.Table("idFHEADERDETTableResult",{
          visibleRowCount: 1,
          columnHeaderHeight: 40,
          enableColumnReordering : false,
          visible : true,
          width: '80%',
          selectionMode: sap.ui.table.SelectionMode.None
         }).addStyleClass("tblBorder1");

         oFHEADERDETTableResult.addColumn(new sap.ui.table.Column({
              label: new sap.ui.commons.Label({text: "Serial No."}).addStyleClass("wraptextcol"),
            template: new sap.ui.commons.TextView({

            }).bindProperty("text", "Serialno"),
                  resizable:false,
                  width:"120px",
                  sortProperty: "Serialno",
                  filterProperty : "Serialno"
            }));

          oFHEADERDETTableResult.addColumn(new sap.ui.table.Column({
               label: new sap.ui.commons.Label("idFHEADERDETTableResultDate",{text: "Gate IN Date"}).addStyleClass("wraptextcol"),
             template: new sap.ui.commons.TextView({

             }).bindProperty("text", "ProcessDate"),
                   resizable:false,
                   width:"180px",
                   sortProperty: "ProcessDate",
                   filterProperty : "ProcessDate"
             }));

         oFHEADERDETTableResult.addColumn(new sap.ui.table.Column("idFHEADERDETTableResultStatusCol",{
              label: new sap.ui.commons.Label("idFHEADERDETTableResultStatus",{text: "Status"}).addStyleClass("wraptextcol"),
            template: new sap.ui.commons.TextView({

            }).bindProperty("text", "Status"),
                  resizable:false,
                  width:"140px",
                  sortProperty: "Status",
                  filterProperty : "Status"
            }));

        oFHEADERDETTableResult.addColumn(new sap.ui.table.Column("idFHEADERDETTableColumnResultOrder",{
             label: new sap.ui.commons.Label("idFHEADERDETTableResultOrder",{text: "Return Authorization"}).addStyleClass("wraptextcol"),
             template: new sap.ui.commons.TextView({

             }).bindProperty("text", "RaNo"),
                 resizable:false,
                 width:"120px",
                 sortProperty: "RaNo",
                 filterProperty : "RaNo"
           }));

       oFHEADERDETTableResult.addColumn(new sap.ui.table.Column("idFHEADERDETTableResultEstimateType",{
            label: new sap.ui.commons.Label({text: "Estimate Type"}).addStyleClass("wraptextcol"),
          template: new sap.ui.commons.TextView({

          }).bindProperty("text", "EstimateType"),
                resizable:false,
                width:"120px",
                sortProperty: "EstimateType",
                filterProperty : "EstimateType"
          }));

          var oFHEADERDETFlexFinal = new sap.m.FlexBox("idHEADERDETFlexFinal",{
      						width : "90%",
                  items: [ backEDI,
      										 new sap.m.Label(),
      										 oFHEADERDETTableResult
                          ],
                  direction: "Column"
      		}).addStyleClass("marginMainLeft");

      		return oFHEADERDETFlexFinal;


  }

});

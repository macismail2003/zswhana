
var ActiveReturnTop5 = [];

sap.ui.model.json.JSONModel.extend("DashActiveReturn", {
	createReturnDashboard: function(){

		 var oReturnsTable = new sap.ui.table.Table("ActiveReturnsTbl",{
            visibleRowCount: 5,
            columnHeaderHeight: 45,
            selectionMode: sap.ui.table.SelectionMode.None,
            //navigationMode: sap.ui.table.NavigationMode.Paginator,
            //fixedColumnCount:1,
            width: "90%",
          }).addStyleClass("tblBorder marginTop10");

		 oReturnsTable.addColumn(new sap.ui.table.Column({
			label: new sap.ui.commons.TextView({text: "Return Reference"}).addStyleClass("wraptextcol"),
            template: new sap.ui.commons.TextView().bindProperty("text", "ReturnRef"),
            sortProperty: "ReturnRef",
            filterProperty: "ReturnRef",
            width: "75px",
            resizable:false
        }));
		 oReturnsTable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.TextView({text: "Unit Type"}).addStyleClass("wraptextcol"),
            template: new sap.ui.commons.TextView().bindProperty("text", "UnitType"),
            sortProperty: "UnitType",
            filterProperty: "UnitType",
            width: "60px",
            resizable:false
        }));
		 oReturnsTable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Customer"}).addStyleClass("wraptextcol"),
            template: new sap.ui.commons.TextView().bindProperty("text", "Customer").addStyleClass("wraptext"),
            sortProperty: "Customer",
            filterProperty: "Customer",
            width: "100px",
            resizable:false
        }));
		var oTotalCol = new sap.ui.table.Column({
			label: new sap.ui.commons.TextView({text: "Total Quantity"}).addStyleClass("wraptextcol"),
            template: new sap.ui.commons.TextView().bindProperty("text", "TotalQuant"),
            sortProperty: "TotalQuant",
            filterProperty: "TotalQuant",
            width: "65px",
            resizable:false
        });
		 var oUtil = new utility();
		 oReturnsTable.addColumn(oTotalCol);
			oUtil.addColumnSorterAndFilter(oTotalCol, oUtil.compareUptoCount);

		var oOutCol= new sap.ui.table.Column({
			label: new sap.ui.commons.TextView({text: "Outstanding Quantity"}).addStyleClass("wraptextcol"),
            template: new sap.ui.commons.TextView().bindProperty("text", "OutstandQuant"),
            sortProperty: "OutstandQuant",
            filterProperty: "OutstandQuant",
            width: "90px",
            resizable:false
        });
		 oReturnsTable.addColumn(oOutCol);
			oUtil.addColumnSorterAndFilter(oOutCol, oUtil.compareUptoCount);

		 oReturnsTable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.TextView({text: "Expiry Date"}).addStyleClass("wraptextcol"),
            template: new sap.ui.commons.TextView().bindProperty("text", "ExpDate"),
            sortProperty: "ExpDateActual",
            filterProperty: "ExpDate",
            width: "75px",
            resizable:false
        }));

		 //oReturnsTable.setNoData(lblNoDataActRet);

		 var btnViewAllReturn = new sap.m.Button("retDashViewAll",{
	          text : "View All",
	          type:sap.m.ButtonType.Unstyled,
	          visible:false,
	          width:"80px",
	          //icon: sap.ui.core.IconPool.getIconURI("excel-attachment"),
	          press:function(){
	        	  //alert("View All");
	        	  //if(ActiveReturn.length > 0){
		      			var bus = sap.ui.getCore().getEventBus();
		      			bus.publish("nav", "to", {
		      					id : "ActiveReturnDetails"
		      			});
		      			$('#idHdrContnt').html('Active Return Details'); //CHANGE HEADER CONTENT
		      			var oActReturnDetail = new ActiveReturnDetails();
		      			oActReturnDetail.bindActReturnDetails();
		      		/*}else{
		      			sap.ui.commons.MessageBox.alert("No Active Return details available");
		      		}*/

	        }
		}).addStyleClass("marginRight80 submitBtn marginTopMinus10");


		 var labActivRel =  new sap.ui.commons.Label({text:"Active Returns - Top 5",
				wrapping: true,
			}).addStyleClass("fontTitle");

			var oHeader = new sap.m.FlexBox({
				 justifyContent : sap.m.FlexJustifyContent.SpaceBetween,
				 items: [labActivRel, btnViewAllReturn],
				 direction: "Row"
		 }).addStyleClass("marginTop10");

		 var oReturnDashboard = new sap.m.FlexBox({
			  items: [oHeader, oReturnsTable],
			  direction: "Column"
		}).addStyleClass("marginTop10");


		var strNoDataTbl = '<div class="sapUiTableCtrlEmpty custTblBgColor" tabindex="0"><span id="idspnNodataDDBActRet"'
		strNoDataTbl += 'class="sapUiLbl custTblBgColor sapUiTableCtrlEmptyMsg">Loading...</span></div>'

		var ohtmlCntrl = new sap.ui.core.HTML("idhtmlNoDataActRetDDB",{content: strNoDataTbl});

		oReturnsTable.setNoData(ohtmlCntrl);

	    return oReturnDashboard;

	}
});

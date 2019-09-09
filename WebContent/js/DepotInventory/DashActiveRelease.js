
var ActiveReleaseTop5 = [];

sap.ui.model.json.JSONModel.extend("DashActiveRelease", {
	createReleaseDashboard: function(){

		//Releases Table
		 var oReleasesTable = new sap.ui.table.Table("ActiveReleaseTblDASH",{
            visibleRowCount: 5,
            columnHeaderHeight: 45,
            selectionMode: sap.ui.table.SelectionMode.None,
            //navigationMode: sap.ui.table.NavigationMode.Paginator,
            //fixedColumnCount: 1,
            width: "90%"
          }).addStyleClass("tblBorder marginTop10");
		 oReleasesTable.addColumn(new sap.ui.table.Column({
			//label: new sap.ui.commons.TextView({text: "Quantity \n Returned"}).addStyleClass("tblHeaderCustomTV"),
            label: new sap.ui.commons.TextView({text: "Release Reference"}).addStyleClass("wraptextcol"),
            template: new sap.ui.commons.TextView().bindProperty("text", "ReleaseRef"),
            sortProperty: "ReleaseRef",
            filterProperty: "ReleaseRef",
            width: "75px",
            resizable:false
        }));
		 oReleasesTable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.TextView({text: "Unit Type"}).addStyleClass("wraptextcol"),
            template: new sap.ui.commons.TextView().bindProperty("text", "UnitType"),
            sortProperty: "UnitType",
            filterProperty: "UnitType",
            width: "60px",
            resizable:false
        }));
		 oReleasesTable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Customer"}).addStyleClass("wraptextcol"),
            template: new sap.ui.commons.TextView().bindProperty("text", "Customer").addStyleClass("wraptext"),
            sortProperty: "Customer",
            filterProperty: "Customer",
            width: "100px",
            resizable:false
        }));
		 var oTotalCol = new sap.ui.table.Column({
			//label: new sap.ui.commons.TextView({text: "Release \n Reference"}).addStyleClass("tblHeaderCustomTV"),
            label: new sap.ui.commons.TextView({text: "Total Quantity"}).addStyleClass("wraptextcol"),
            template: new sap.ui.commons.TextView().bindProperty("text", "TotalQuant"),
            sortProperty: "TotalQuant",
            filterProperty: "TotalQuant",
            width: "65px",
            resizable:false
        });
		 var oUtil = new utility();
		 oReleasesTable.addColumn(oTotalCol);
			oUtil.addColumnSorterAndFilter(oTotalCol, oUtil.compareUptoCount);

		var oOutCol= new sap.ui.table.Column({
			//label: new sap.ui.commons.TextView({text: "Release \n Reference"}).addStyleClass("tblHeaderCustomTV"),
            label: new sap.ui.commons.TextView({text: "Outstanding Quantity"}).addStyleClass("wraptextcol"),
            template: new sap.ui.commons.TextView().bindProperty("text", "OutstandQuant"),
            sortProperty: "OutstandQuant",
            filterProperty: "OutstandQuant",
            width: "90px",
            resizable:false
        });
		 oReleasesTable.addColumn(oOutCol);
			oUtil.addColumnSorterAndFilter(oOutCol, oUtil.compareUptoCount);

		 oReleasesTable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.TextView({text: "Expiry Date"}).addStyleClass("wraptextcol"),
            template: new sap.ui.commons.TextView().bindProperty("text", "ExpDate"),
            sortProperty: "ExpDateActual",
            filterProperty: "ExpDate",
            width: "75px",
            resizable:false
        }));

		 //oReleasesTable.setNoData(lblNoDataActRel);

		 var btnViewAllRelease = new sap.m.Button("relDashViewAll",{
	          text : "View All",
	          type:sap.m.ButtonType.Unstyled,
	          visible:false,
	          width:"80px",
	          //icon: sap.ui.core.IconPool.getIconURI("excel-attachment"),
	          press:function(){
	        	  //alert("View All");
	        	  //if(ActiveRelease.length > 0){
	      			var bus = sap.ui.getCore().getEventBus();
	      			bus.publish("nav", "to", {
	      					id : "ActiveReleaseDetails"
	      			});
	      			$('#idHdrContnt').html('Active Release Details'); //CHANGE HEADER CONTENT
	      			var oActReleaseDetail = new ActiveReleaseDetails();
	      			oActReleaseDetail.bindActReleaseDetails();
	      		/*}else{
	      			sap.ui.commons.MessageBox.alert("No Active Release details available");
	      		}*/

	        }
		}).addStyleClass("marginRight80 submitBtn marginTopMinus10");

		 var labActivRel =  new sap.ui.commons.Label({text:"Active Releases - Top 5",
				wrapping: true,
		 }).addStyleClass("fontTitle");


		 var oHeader = new sap.m.FlexBox({
			 justifyContent : sap.m.FlexJustifyContent.SpaceBetween,
			 direction : "Row",
				 items: [ labActivRel, btnViewAllRelease ],
		 }).addStyleClass("marginTop10");

		 var oReleaseDashboard = new sap.m.FlexBox({
			  items: [oHeader, oReleasesTable],
			  direction: "Column"
		}).addStyleClass("marginTop10");

		 var strNoDataTbl = '<div class="sapUiTableCtrlEmpty custTblBgColor" tabindex="0"><span id="idspnNodataDDBActRel"'
		 strNoDataTbl += 'class="sapUiLbl custTblBgColor sapUiTableCtrlEmptyMsg">Loading...</span></div>'

		 var ohtmlCntrl = new sap.ui.core.HTML("idhtmlNoDataActRelDDB",{content: strNoDataTbl});

		 oReleasesTable.setNoData(ohtmlCntrl);
		 return oReleaseDashboard;
		 }
});

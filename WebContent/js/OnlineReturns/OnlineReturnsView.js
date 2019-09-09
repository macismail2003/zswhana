/*
 *
*$*$------------------------------------------------------------------------*
*$*$ Modified By : Seyed Ismail MAC
*$*$ Modified On : 15.12.2014
*$*$ Reference   : RTS1002
*$*$ Transport   : CGWK900792
*$*$ Tag         : MAC15122014
*$*$ Purpose     : 1. A text box should be added to the screen just above the SUBMIT button.
           Redelivery notification should be sent to the email address mentioned in that text box.
                   2. BLOCKED customers from auto suggestion list of customer field should be removed
           3. Correct depot should be assigned based on the location preferred.
           4. Depot information should not be missing in the notification
           5. 30-001-2015 is now showing 30-01-2015 in Online Returns
           6. Created a new screen for Depot Details after RA creation
*$*$---------------------------------------------------------------------

*$*$------------------------------------------------------------------------*
*$*$ Modified By : Seyed Ismail MAC
*$*$ Modified On : 27.01.2015
*$*$ Reference   : RTS1002
*$*$ Transport   : CGWK900824
*$*$ Tag         : MAC27012015
*$*$ Purpose     : Removed Table and Inserted a panel
*$*$---------------------------------------------------------------------
*
**$*$------------------------------------------------------------------------*
*$*$ Modified By : Seyed Ismail MAC
*$*$ Modified On : 13.03.2015
*$*$ Reference   : RTS 1086
*$*$ Transport   : CGWK900874
*$*$ Tag         : MAC13032015
*$*$ Purpose     : If date is greater than or equal to 25, place to button to toggle between this and next month
*$*$---------------------------------------------------------------------
**$*$------------------------------------------------------------------------*
*$*$ Modified By : Seyed Ismail MAC
*$*$ Modified On : 11.12.2017
*$*$ Reference   : APS 167
*$*$ Transport   : 
*$*$ Tag         : MAC11122017
*$*$ Purpose     : Seaweb enhancements for MSC
*				   Add two or more email address during redelivery request MAC11122017_1
*$*$---------------------------------------------------------------------
*
**/	    
    var aCurrentReturnsOR = [];
    var vSelCustomerOR;
    var vSelContractOR;
    var vSelUnitTypeOR;
    var vSelCountryOR; 
    var vSelCityOR;
    var vSelDepotOR;
    var jsonExistingReturnsOR = [];
    var vClickedReturn_ExstReturnTbl= "";
    var aUnitNumbersOR = [];
    var aChkBoxChkdCurrRetOR = [];
    var aErrWarning = [];
    var loggedIncustomerOR = "";
    var vValueHelpFrmExstRet="";
    var loggedInUserTypeOR="";
    var customJsonCurrRet = [];
    var aMailInputOR = [];
    var allOkWarningLines = [];   //MAC15122014+
    var depotButtonOn;    //  MAC27012015 +
sap.ui.model.json.JSONModel.extend("onlineRetView", {

  createOnlineRet: function(){
     
    var oCurrent = this;
      var labStar = new sap.ui.commons.Label({text: "* "}).addStyleClass("MandatoryStar");
         var lblSpaceLegend = new sap.ui.commons.Label( {text: " ",width : '5px'});
        var labRequired = new sap.ui.commons.Label({text: " Mandatory Field",wrapping: true});
        var oFlexboxReq = new sap.m.FlexBox({
         // layoutData: new sap.ui.layout.GridData({span: "L7 M6 S4"}),
                items: [labStar,lblSpaceLegend,labRequired],
                direction: "Row"
        }).addStyleClass(" marginTop10");
        
     // Country Drop-down
      /*var oComboCustomer = new sap.ui.core.HTML("idHtmlCustomerOR",{layoutData: new sap.ui.layout.GridData({span: "L8 M6 S6"})});
      var htmlContentCustomer = '<input id="idComboCustomerOR" placeholder="Select Customer" class="FormInputStyle marginTop10" style="width:100%">';
      oComboCustomer.setContent(htmlContentCustomer);*/
        
		var oComboCustomer = new sap.ui.commons.ComboBox("idComboCustomerOR", {
			layoutData: new sap.ui.layout.GridData({span: "L6 M8 S12"}),
			width:"100%",
			//enabled: seacoUser,
			placeholder:"Select Customer",
			 change: function(evnt){
					if(this.getValue() != '')
					{   
						//var onlineReturnsOnLoadData = new getDataOnlineReturns();
						//onlineReturnsOnLoadData.populateMultipleCustomerOR();
					}
		          }
		}).addStyleClass("marginTop10 DepotInput38px");

      /* Begin of adding by Seyed Ismail on 26.09.2014 "MAC26092014- */
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1; //January is 0!
      var yyyy = today.getFullYear();

      if(dd<10) {
          dd='0'+dd;
      }
      /* Begin of adding by Seyed Ismail on 13.03.2015 "MAC13032015- */
      var btnSwitch = false;
      if(dd > 24){
        btnSwitch = true;
      }
      /* End of adding by Seyed Ismail on 13.03.2015 "MAC13032015- */
      if(mm<10) {
          mm='0'+mm;
      } 

      today = dd+'-'+mm+'-'+yyyy;

      var currentDateLabel = new sap.ui.commons.Label({
        text : today, // string
      }).addStyleClass("marginTop10");
      	
      	var todayDate = currentDateLabel.mProperties.text;

        var currDate = new sap.ui.commons.TextField('idCurrDate', {
        layoutData: new sap.ui.layout.GridData({span: "L2 M3 S6"}),
        //width: '100px',
        value : today, // string
        enabled : false, // boolean
      }).addStyleClass("marginTop10 DepotInput38px");

        //var date = new Date();
        //var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = oCurrent.daysInMonth(mm, yyyy);
        //if(mm<10) {     //MAC15122014-
          //  mm='0'+mm;    //MAC15122014-
        //}           //MAC15122014-
        var lastDateOfMonth = lastDay + '-' + mm + '-' + yyyy;

        var lastDate = new sap.ui.commons.TextField('idLastDate', {
          layoutData: new sap.ui.layout.GridData({span: "L2 M3 S6"}),
          //width: '100px',
          value : lastDateOfMonth, // string
          enabled : false, // boolean
        }).addStyleClass("marginTop10 DepotInput38px");
      /* End of adding by Seyed Ismail on 26.09.2014 "MAC26092014- */

     /* START
      * RN - 30-10-2014 - P1 CR - discussed with Seyed
      
      var oLabelContractNo = new sap.ui.commons.Label({text: "Contract No.:",
      layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: true, margin: false}),
            wrapping: true}).addStyleClass("fontTitle marginTop10");

    var oLabelUnitType = new sap.ui.commons.Label({text: "Unit Type: ",
      layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: true, margin: false}),
            wrapping: true}).addStyleClass("fontTitle marginTop10");

    var oLabelCountry = new sap.ui.commons.Label({text: "Country: ",
      layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: true, margin: false}),
            wrapping: true}).addStyleClass("fontTitle marginTop10");
            
          
    var oLabelDepot = new sap.ui.commons.Label({text: "Depot: ",
      layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: true, margin: false}),
            wrapping: true}).addStyleClass("fontTitle marginTop10");
              
        // Contract Number Drop-down   
     var oComboContractNumber = new sap.ui.commons.DropdownBox("idComboContractNumberOR", {
       layoutData: new sap.ui.layout.GridData({span: "L8 M6 S6"}),
       visible:false,
        change:function(){
          var oGetData = new getDataOnlineReturns();
           var selContract = this.getValue();
           if(selContract == "Select Contract Number"){
             selContract = "";
           }
           sap.ui.getCore().byId("idComboUnitTypeOR").setEnabled(true);
           oGetData.populateUnitType(selContract);
        },
        items: {
                  path: "/",
                  template: new sap.ui.core.ListItem({text: "{IContract}"})
        },
            displaySecondaryValues:false, placeholder:"Select Contract Number"}).addStyleClass("marginTop10 FormInputStyle");
                  
   // Unit Type Drop-down
     var oComboUnitType = new sap.ui.commons.DropdownBox("idComboUnitTypeOR", {
       layoutData: new sap.ui.layout.GridData({span: "L8 M6 S6"}),
       visible:false,
        items: {
                  path: "/",
                  template: new sap.ui.core.ListItem({text: "{OrderedProd}"})
        },
            displaySecondaryValues:false, placeholder:"Select Unit Type"}).addStyleClass("marginTop10 FormInputStyle");
     
      
      // Country Drop-down
      var oComboCountry = new sap.ui.core.HTML("idHtmlCountryOR",{layoutData: new sap.ui.layout.GridData({span: "L8 M6 S6"}), visible:false});
    var htmlContentCountry = '<input id="idComboCountryOR" placeholder="Select Country" class="FormInputStyle marginTop10" style="width:100%">';
    oComboCountry.setContent(htmlContentCountry);

      // Depot Drop-down
      var oComboDepot = new sap.ui.core.HTML("idHtmlDepotOR",{layoutData: new sap.ui.layout.GridData({span: "L8 M6 S6"}), visible:false});
    var htmlContentDepot = '<input id="idComboDepotOR" placeholder="Select Depot" class="FormInputStyle marginTop10" style="width:100%">';
    oComboDepot.setContent(htmlContentDepot);


     var oBtnBrowseUnits = new sap.m.Button("idBtnBrowseUnits",{
            text : "Browse Units",
            styled:false,
              width:"95px",
            layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: true, margin: true}),
            press:function(){
              oCurrent.getUnitsToBrowse();
              }
      }).addStyleClass("submitBtn");
      
      
    // Flex Box
      var oFlexBoxBrowseUnits = new sap.m.FlexBox({
        items:[
               oBtnBrowseUnits
        ],
        layoutData: new sap.ui.layout.GridData({span: "L11 M9 S4",linebreak: true, margin: false}),
        direction: sap.m.FlexDirection.RowReverse //"Row"
      }).addStyleClass("marginTop10");

      var oFlexTxtAreaNBrowseBtn = new sap.m.FlexBox({ items: [ vTAUnitNumbersOR, oFlexBoxBrowseUnits ],  
            direction: "Column", 
            layoutData: new sap.ui.layout.GridData({span: "L9 M8 S8",linebreak: false, margin: false})
    });

    END
    */

    //city drop down
    /*var oComboCity = new sap.ui.core.HTML("idHtmlCityOR",{layoutData: new sap.ui.layout.GridData({span: "L8 M6 S6"})});
    var htmlContentCity = '<input id="idComboCityOR" placeholder="Select City" class="FormInputStyle marginTop10" style="width:100%" onchange="capFirstLetter(this.value)">';
    oComboCity.setContent(htmlContentCity);*/
		var oComboCity = new sap.ui.commons.ComboBox("idComboCityOR", {
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S6"}),
			//width:"200px",
			//enabled: seacoUser,
			placeholder:"Select City",
			 change: function(evnt){
					if(this.getValue() != '')
					{   
						//var onlineReturnsOnLoadData = new getDataOnlineReturns();
						//onlineReturnsOnLoadData.populateMultipleCustomerOR();
					}
		          }
		}).addStyleClass("marginTop10 DepotInput38px");
		
      
      // Buttons
     
      var oBtnAddToReservation = new sap.m.Button("idBtnAddToRes",{
            text : "Add To Returns",
            styled:false,
              //width:"120px",
              tooltip: "Add to Returns",
            layoutData: new sap.ui.layout.GridData({span: "L4 M3 S4",linebreak: false, margin: true}),
            press:function(){
              //sap.ui.getCore().byId("idCurrentReturnForm").setVisible(true);
              if(!sap.ui.getCore().byId("idCurrentRetTblOR")){	//MACISMAIL
            	  oCurrent.createCurrRetTable();
              }else{
            	  aCurrentReturnsOR = [];
            	  sap.ui.getCore().byId("idCurrentRetTblOR").destroy();
                  sap.ui.getCore().byId("idFlexBoxCurrRetTbl").destroy();
                  sap.ui.getCore().byId("idFlexCurrRetTblFooter").destroy();
                  sap.ui.getCore().byId("idFlexBoxEmail").destroy(); //MAC15122014+
                  oCurrent.createCurrRetTable();
              }
                
              
              oCurrent.createNBindCurrentReturns();
              oCurrent.getEmail();
            }}).addStyleClass("submitBtn");

      var oBtnContinue = new sap.m.Button("idBtnResetORForm",{
            text : "Reset",
            styled:false,
            //width:"80px",
            layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
            press:function(){
              oCurrent.ResetORForm();
            }}).addStyleClass("submitBtn");
      var lblSpace1 = new sap.ui.commons.Label( {text: " ",width : '8px'});
      //flexbox for 2 buttons
      var oFlexBoxFormButtons = new sap.m.FlexBox({
        width: "100%",
        items:[
               oBtnAddToReservation, lblSpace1, oBtnContinue
        ],
        direction: "Row"
      }).addStyleClass("marginTop10");
      
      
      /*      
      // Existing Returns Table Start

      // Radio Buttons
      var radioBtnRole = new sap.ui.commons.RadioButtonGroup("idRdBtnGrpExistingReturns",{
            columns : 2,
            selectedIndex : 0,
            select : function() {
              var oGetData = new getDataOnlineReturns();
            oGetData.bindExistingReturns(radioBtnRole.getSelectedItem().getKey());
              }
            });
           var oRoleItem = new sap.ui.core.Item({
                   text : "Me", key : "M"});
           radioBtnRole.addItem(oRoleItem);
           oRoleItem = new sap.ui.core.Item({
                   text : "All", key : "A"});
           radioBtnRole.addItem(oRoleItem);
           
           var oFlexboxRadio = new sap.m.FlexBox({
          items: [
            radioBtnRole        
          ],
          direction: "Row",
          width:"70%"
        });

           var oBtnRetExport = new sap.m.Button({
               text : "Export To Excel",
               type:sap.m.ButtonType.Unstyled,
               width:"145px",
               icon: sap.ui.core.IconPool.getIconURI("excel-attachment"),
               press:function(){
                    // objUtil = new utility();
                     var vTitle = "Outstanding Redeliveries";
                     objUtil.makeHTMLTable(jsonExistingReturnsOR, vTitle,"export");
               }
            }).addStyleClass("submitBtn");

           var oFlexboxForExportBtn = new sap.m.FlexBox({
          items: [oBtnRetExport ],
          width:"30%",
          direction: sap.m.FlexDirection.RowReverse
        });
           
           var oFlexboxRetTableHeader = new sap.m.FlexBox({
          items: [
            oFlexboxRadio,
            oFlexboxForExportBtn        
          ],
          direction: "Row"
        });

           var oUtil = new utility();
           
      // Table
      var oExistingReturnsTable = new sap.ui.table.Table("idExistingRetTblOR",{
              visibleRowCount: 5,
              firstVisibleRow: 3,
              columnHeaderHeight: 40,
              fixedColumnCount:1,
              selectionMode: sap.ui.table.SelectionMode.None,
              navigationMode: sap.ui.table.NavigationMode.Paginator,
             // width: "100%",
             // height:"100%"
      }).addStyleClass("fontStyle tblBorder marginTop10");

      //Define the columns and the control templates to be used
      oExistingReturnsTable.addColumn(new sap.ui.table.Column({
            label: new sap.ui.commons.Label({text: "Redelivery Ref"}),
            template: new sap.ui.commons.Link({
        press : function() {
           vClickedReturn_ExstReturnTbl = this.getText();
           vValueHelpFrmExstRet = this.getHelpId();
           //alert("help exts ret " + this.getHelpId())
           var oExstngTable = sap.ui.getCore().byId("idExistingRetTblOR");
           oExstngTable._oHSb.setScrollPosition(0);
          var bus = sap.ui.getCore().getEventBus();
                bus.publish("nav", "to", {
                    id : "ORReturnDetails"
                }); 
              var oReturnDetails = new returnDetailsView();
              oReturnDetails.createReturnDetailsForm();
              oReturnDetails.bindReturnDetails();
        }
      }).bindProperty("text", "Return").bindProperty("helpId","helpValue"),
            sortProperty: "Return",
            filterProperty: "Return",
            width:"100px",
            resizable:false
      }));
      oExistingReturnsTable.addColumn(new sap.ui.table.Column({
              label: new sap.ui.commons.Label({text: "Unit Type"}).addStyleClass("tblHeaderCustomTV"),
              template: new sap.ui.commons.TextView().bindProperty("text", "UnitType"),
              sortProperty: "UnitType",
              filterProperty: "UnitType",
              width:"80px",
              resizable:false
      }));
      oExistingReturnsTable.addColumn(new sap.ui.table.Column({
              label: new sap.ui.commons.Label({text: "Location"}),
              template: new sap.ui.commons.TextView({wrapping:true}).bindProperty("text", "Location"),
              sortProperty: "Location",
              filterProperty: "Location",
              width:"140px",
              resizable:false
      }));
      var oRetCol = new sap.ui.table.Column({
              label: new sap.ui.commons.TextView({text: "Total Quantity",}).addStyleClass("tblHeaderCustomTV"),
              template: new sap.ui.commons.TextView().bindProperty("text", "ReturnQty"),
              sortProperty: "ReturnQty",
              filterProperty: "ReturnQty",
              width:"90px",
              resizable:false
      });
      oExistingReturnsTable.addColumn(oRetCol);
    oUtil.addColumnSorterAndFilter(oRetCol, oUtil.compareUptoCount);

      var oOutCol = new sap.ui.table.Column({
          label: new sap.ui.commons.Label({text: "Outstanding",}),
          template: new sap.ui.commons.TextView().bindProperty("text", "OutstandQty"),
          sortProperty: "OutstandQty",
          filterProperty: "OutstandQty",
          width:"100px",
          resizable:false
      });
      oExistingReturnsTable.addColumn(oOutCol);
    oUtil.addColumnSorterAndFilter(oOutCol, oUtil.compareUptoCount);

      oExistingReturnsTable.addColumn(new sap.ui.table.Column({
          label: new sap.ui.commons.Label({text: "Expiry Date",}).addStyleClass("tblHeaderCustomTV"),
          template: new sap.ui.commons.TextView().bindProperty("text", "ExpiryDate"),
          sortProperty: "ExpiryDateActual",
          filterProperty: "ExpiryDate",
          width:"100px",
          resizable:false
    }));
      oExistingReturnsTable.addColumn(new sap.ui.table.Column({
          label: new sap.ui.commons.Label({text: "Created By"}),
          template: new sap.ui.commons.TextView().bindProperty("text", "CreatedBy"),
          sortProperty: "CreatedBy",
          filterProperty: "CreatedBy",
          width:"110px",
          resizable:false
      }));

      // Existing Returns Table Ends 
*/
     // Labels
    var oLabelCustomer = new sap.ui.commons.Label({text: "Customer: ",required:true,
      layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: true, margin: false}),
            wrapping: true}).addStyleClass("fontTitle marginTop15");

    /*Begin of adding by Seyed Ismail on 26.09.2014 "MAC26092014+ */
    /* Begin of adding by Seyed Ismail on 13.03.2015 "MAC13032015- */
    var oBtnSwitch = new sap.m.Button("idBtnSwitch",{
            text : "Switch to next month",
            styled:false,
            visible: btnSwitch,
            //width:"135px",
            height: "25px",
            layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
            press:function(){             
              if(this.getText() == "Switch to next month"){
                oCurrent.switchToNextMonth();
                this.setText("Switch to this month");
                }
                else{
                  oCurrent.switchToThisMonth();
                  this.setText("Switch to next month");
                }
              if(sap.ui.getCore().byId("idCurrentRetTblOR")){                 
                  oCurrent.changeDateBindings();
                  oCurrent.currRetReset();
              }
              
            }}).addStyleClass("marginTop5 submitBtn");

    var oLabelRetDate = new sap.ui.commons.Label({text: "Start Date: ",required:false,
    layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4", linebreak: true, margin: false}),
        wrapping: true}).addStyleClass("fontTitle marginTop15");

    var oLabelExpDate = new sap.ui.commons.Label({text: "Expiry Date: ",required:false,
      layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4", linebreak: true, margin: false}),
            wrapping: true}).addStyleClass("fontTitle marginTop15");
    
    var lblSpace2 = new sap.ui.commons.Label( {text: " ",width : '8px'});
    
      var oFlexBoxCurrDate = new sap.m.FlexBox({
        items:[
                currDate, lblSpace2, oBtnSwitch
        ],
        layoutData: new sap.ui.layout.GridData({span: "L6 M8 S8"}),
        direction: "Row"
      });
      /* End of adding by Seyed Ismail on 13.03.2015 "MAC13032015- */    
  /* End of adding by Seyed Ismail on 26.09.2014 "MAC26092014+ */


    var oLabelCity = new sap.ui.commons.Label({text: "City: " ,required:true,
      layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: true, margin: false}),
            wrapping: true}).addStyleClass("fontTitle marginTop15");

    var oLabelUnitNo = new sap.ui.commons.Label({text: "Unit Number: ",required:true,
      layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: true, margin: false}),
            wrapping: true}).addStyleClass("fontTitle marginTop15");
    
    var oLabelWarning = new sap.ui.commons.Label({text: "For individual containers, please enter the 4 letter prefix and 7 digit number for each container. (Eg. SEGU3000511). For multiple containers (Max 25), press the Enter key after each one," +
    " or copy and paste the list to the entry field",
      wrapping: true}).addStyleClass("font10");
     var LblFlex = new sap.m.FlexBox({ items: [ oLabelUnitNo, oLabelWarning ],  
            direction: "Column", 
            layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: true, margin: false})});
     
    var vTAUnitNumbersOR =new sap.ui.commons.TextArea('idTAUnitNoOR',{
          layoutData: new sap.ui.layout.GridData({span: "L8 M6 S12"}),
        rows:25,
        cols:30,
        height:"145px",
        change:function(){
          sap.ui.getCore().byId("idTAUnitNoOR").setValueState(sap.ui.core.ValueState.None);
          sap.ui.getCore().byId("idTAUnitNoOR").setPlaceholder("Unit Number");

        }
      }).addStyleClass("marginTop10 OutlineNone");
    vTAUnitNumbersOR.setMaxLength(323); 

  /*  var oFlexUnitNumber = new sap.m.FlexBox({ items: [ LblFlex, oLabelspace, vTAUnitNumbersOR ],  
            direction: "Row", 
            layoutData: new sap.ui.layout.GridData({span: "L12 M3 S4",linebreak: true, margin: false})});*/


    // Responsive Grid Layout
      var oOnlineRetLayout = new sap.ui.layout.form.ResponsiveGridLayout("idOnlineRetLayout",{
          columnsL: 2,
            columnsM: 1,
            columnsS: 1,
            /*breakpointL: 1200,
        breakpointM: 900*/
      });
      
     	// Online Form Starts
        var oOnlineForm = new sap.ui.layout.form.Form("idOnlineRetForm",{
                layout: oOnlineRetLayout,
                formContainers: [
                        new sap.ui.layout.form.FormContainer("idOnlineRetFormC1",{
                                title: "Redelivery Request",
                                formElements: [
                      new sap.ui.layout.form.FormElement({
                          fields: [oLabelCustomer, oComboCustomer]
                      }),
                      /*  Begin of adding by Seyed Ismail MAC26092014- */
                      new sap.ui.layout.form.FormElement({
                          fields: [oLabelRetDate, oFlexBoxCurrDate]
                      }),
                      new sap.ui.layout.form.FormElement({
                          fields: [oLabelExpDate, lastDate]
                      }),
                      /*  End of adding by Seyed Ismail MAC26092014- */

                      /* START
                          * RN - 30-10-2014 - P1 CR - discussed with Seyed
                      new sap.ui.layout.form.FormElement({
                            fields: [oLabelContractNo, oComboContractNumber]
                      }),
                      new sap.ui.layout.form.FormElement({
                          fields: [oLabelUnitType, oComboUnitType]
                      }),
                      new sap.ui.layout.form.FormElement({
                          fields: [oLabelCountry, oComboCountry]
                      }),
                      new sap.ui.layout.form.FormElement({
                          fields: [oLabelDepot, oComboDepot]
                      }),
                      new sap.ui.layout.form.FormElement({
                          fields: [oFlexBoxBrowseUnits],
                          layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                      }),
                      END
                      */
                      new sap.ui.layout.form.FormElement({
                          fields: [oLabelCity, oComboCity]
                      }),
                      new sap.ui.layout.form.FormElement({
                          fields: [LblFlex ,vTAUnitNumbersOR ]
                      }),
                      new sap.ui.layout.form.FormElement({
                          fields: [oFlexBoxFormButtons]
                      }),
                      new sap.ui.layout.form.FormElement({
                          fields: [oFlexboxReq]
                      }),
                                        ],
                                       
                        }),
                        
                        new sap.ui.layout.form.FormContainer("idOnlineRetFormC2",{
                           // title: "Outstanding Redelivery",
                            formElements: [
                    /*new sap.ui.layout.form.FormElement({
                        fields: [oFlexboxRetTableHeader]
                    }),

                    new sap.ui.layout.form.FormElement({
                          fields: [oExistingReturnsTable]
                    })*/
                                    ]
                    }),
                    ],
                    //layoutData: new sap.ui.layout.GridData({span: "L6 M3 S4"}),
        });
        
     // Responsive Grid Layout
      var oCurrentReturnLayout = new sap.ui.layout.form.ResponsiveGridLayout("idCurrentRetTblLayout");
      var oCurrentReturnForm = new sap.ui.layout.form.Form("idCurrentReturnForm",{
            layout: oCurrentReturnLayout,
            formContainers: [  
                    new sap.ui.layout.form.FormContainer("idCurrentReturnFormC3",{
                        formElements: [
                  new sap.ui.layout.form.FormElement("idCurrRetFE1",{
                      fields: []
                  }),
                  new sap.ui.layout.form.FormElement("idCurrRetFE2",{
                        fields: []
                  }),
                  new sap.ui.layout.form.FormElement("idCurrRetFE3",{
                        fields: []
                  }),
                  // Begin of adding by Seyed Ismail on 15.12.2014 //MAC15122014+
                    new sap.ui.layout.form.FormElement("idCurrRetFE4",{
                    fields: []
                  })
                  // End of adding by Seyed Ismail on 15.12.2014 //MAC15122014+
                                ]
                }),
                        
                ]
        });
     // sap.ui.getCore().byId("idCurrentReturnForm").setVisible(false);
      var vHDivider = new sap.ui.commons.HorizontalDivider({width: "95%", type: "Area", height: "Medium"});
      var oFlexBoxAll = new sap.m.FlexBox({
        width: "100%",
        items:[
               oOnlineForm, vHDivider, oCurrentReturnForm
        ],
        direction: "Column"
     	});
      
          return oFlexBoxAll;            
  },

  getUnitsToBrowse: function(){
    /*if(sap.ui.getCore().byId("OnlineReturnsSelectUnits")){
      sap.ui.getCore().byId("OnlineReturnsSelectUnits").destroy();
    }*/
    busyDialog.open();
     vSelCustomerOR = $("#idComboCustomerOR").val();
     vSelContractOR = sap.ui.getCore().byId("idComboContractNumberOR");
     vSelUnitTypeOR = sap.ui.getCore().byId("idComboUnitTypeOR");
     vSelCountryOR = $("#idComboCountryOR");
     vSelCityOR = $("#idComboCityOR");
     vSelDepotOR = $("#idComboDepotOR");
     var customerOR = "";
    if(vSelCustomerOR == "" || vSelCustomerOR == "Select Customer" || vSelContractOR.getValue() == "" || vSelContractOR.getValue() == "Select Contract Number"  || vSelUnitTypeOR.getValue() == "" || vSelUnitTypeOR.getValue() == "Select Unit Type" ||
 vSelCou+
ntryOR.val() == "" || vSelCityOR.val() == "" || vSelDepotOR.val() == "" ){
      sap.ui.commons.MessageBox.alert("Please fill in all the fields to browse for unit numbers.");
      busyDialog.close();
    }
    else{ //if all values are present get the unit numbers
      if(loggedInUserTypeOR == "CUSTOMER"){
        customerOR = vSelCustomerOR;
      }
      else{
        var selCustomer = jQuery.grep(CustomerDataCombo, function(element, index){
              return element.CustName == vSelCustomerOR;
        });
           customerOR = selCustomer[0].Partner;
      }

      /*var selectedCustomer = jQuery.grep(aComboBoxArraysOR.aCustomerCombo, function(element, index){
            return element.CustName == vSelCustomerOR();
      });*/
        var depotName = vSelDepotOR.val();
        depotName = depotName.replace(/\'/g, "|");
        depotName =  depotName.replace(/&/, "@");

      var urlToCall = serviceUrl + "/Return_Browse?$filter=ICustomer eq '" +  customerOR
      + "' and IContractNo eq '" + vSelContractOR.getValue()
      + "' and IUnitType eq '" +  vSelUnitTypeOR.getValue()
      + "'  and ICountry eq '" +  vSelCountryOR.val()
      + "' and ICity eq '" + vSelCityOR.val()
      + "' and IDepot eq '" + depotName + "'";
    //alert("url " + urlToCall);
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
            var vCustomUnitNumbrOR = [];
            if(len > 0){
              for(var j=0;j<len;j++){
                vCustomUnitNumbrOR[j] = data.results[j];
                if(aUnitNumbersOR.length > 0){
                  vCustomUnitNumbrOR[j]["isChecked"] = aUnitNumbersOR[j].isChecked;
                }
                else{
                  vCustomUnitNumbrOR[j]["isChecked"] = false;
                }
                /*vCustomUnitNumbrOR.push({
                  "UnitNumber": data.results[j].Sernr,
                  "isChecked": false
                })*/
              }
              aUnitNumbersOR = [];
              aUnitNumbersOR = vCustomUnitNumbrOR;

              var bus = sap.ui.getCore().getEventBus();
            bus.publish("nav", "to", {
                  id : "OnlineReturnsSelectUnits"
            });
            var oOnlineRetSelUnits = new onlineRetSelUnitsView();
            oOnlineRetSelUnits.createOnlineRetUnitsSelFormView();
            oOnlineRetSelUnits.bindUnitNumbers();
            }
            else{
              sap.ui.commons.MessageBox.show("No Results found. Please try again later",
                           sap.ui.commons.MessageBox.Icon.WARNING,
                           "Warning",
                           [sap.ui.commons.MessageBox.Action.OK], 
                               sap.ui.commons.MessageBox.Action.OK);
            }  
            busyDialog.close();
          },
          function(err){
            busyDialog.close();
            errorfromServer(err);
            //alert("Error while reading region : "+ window.JSON.stringify(err.response));
          }); //odata request


    }

  }, //getUnitsToBrowse

  selectUN_OR: function(){
    var UNValueOR = "";
    var vTAUnitNoOR = sap.ui.getCore().byId("idTAUnitNoOR");
    vTAUnitNoOR.setValue("");
    for(var i=0 ; i <aChkBoxChkdUnitNumbrsORLen ;i++ ){
      UNValueOR = UNValueOR + aChkBoxChkdUnitNumbrsOR[i].Sernr + "\n";
    }
    vTAUnitNoOR.setValue(UNValueOR);
  }, //selectUN_OR

  createCurrRetTable: function(){
    oCurrent = this;
            // Buttons
      // Begin of commenting by Seyed Ismail on 15.12.2014 //MAC15122014-
      /*var oBtnEdit = new sap.m.Button("idBtnCurrEdit",{
                text : "Edit",
                styled:false,
                visible:false,
                  width:"80px",
                press:function(){
                  oCurrent.EditCurrRetOR(this.getText());
               }
       }).addStyleClass("submitBtn");*/
       // End of commenting by Seyed Ismail on 15.12.2014 //MAC15122014-
         var oBtnDelete = new sap.m.Button("idBtnCurrDelete",{
                text : "Delete",
                styled:false,
                  width:"80px",
                press:function(){
                  oCurrent.DeleteCurrRetOR();
               }
         }).addStyleClass("submitBtn");
         var oBtnValidate = new sap.m.Button("idBtnCurrValidate",{
                text : "Validate",
                styled:false,
                  width:"80px",
               // layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
                press:function(){
                //  alert("Validate");
                  oCurrent.ValidateCurrRetOR();
                }
         }).addStyleClass("submitBtn");
      // Begin of adding by Seyed Ismail on 15.12.2014 MAC15122014
     
            var oBtnDepot = new sap.m.Button("idBtnDepot",{
                text : "Depot Details",
                styled:false,
                  width:"120px",
          enabled: false,
                press:function(){
                  oCurrent.DepotDetails();
                }
         }).addStyleClass("submitBtn");

      var oBtnRaNo = new sap.ui.core.HTML("idHTMLRaNo");


     // End of adding by Seyed Ismail on 15.12.2014 MAC15122014
         var lblSpace2 = new sap.ui.commons.Label( {text: " ",width : '8px'});
        var lblSpace3 = new sap.ui.commons.Label( {text: " ",width : '8px'});
        var lblSpace4 = new sap.ui.commons.Label( {text: " ",width : '8px'});
         var oFlexBoxCurrentReturnsTblsubmitBtns = new sap.m.FlexBox({
            width: "45%",
            items:[
            //oBtnValidate, lblSpace3, oBtnDelete, lblSpace2, oBtnEdit   // MAC15122014-
          oBtnValidate, lblSpace3, oBtnDelete, lblSpace2, oBtnDepot, lblSpace4, oBtnRaNo   // MAC15122014+
            ],
            direction: "Row" //sap.m.FlexDirection.RowReverse
          }).addStyleClass("marginTop10");
         
         var oBtnCurrSubmit = new sap.m.Button("idBtnCurrSubmit",{
                text : "Submit",
                styled:false,
                  width:"80px",
                  enabled:false,
                press:function(){
                  /*this.setEnabled(false);
                  setTimeout( function() {
                    oBtnCurrSubmit.setEnabled(true);
                      }, 2000 );*/
                  oCurrent.submitCurrRet();
                }}).addStyleClass("submitBtn");
         var oBtnCurrReset = new sap.m.Button("idBtnCurrReset",{
                text : "Reset",
                styled:false,
                  width:"80px",
              //  layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
                press:function(){
                  oCurrent.currRetReset();
                  }
         }).addStyleClass("submitBtn");
         var lblSpace3 = new sap.ui.commons.Label( {text: " ",width : '8px'});
         var lblSpaceMessageTxt = new sap.ui.commons.Label( {text: "Please delete all the units with status ERROR to SUBMIT.",wrapping: true}).addStyleClass("WarningMessage");
         
         var oFlexBoxCurrentReturnsFooterMessage = new sap.m.FlexBox("idFlexCurrRetTblFooterMessage",{
            width: "100%",
            items:[lblSpaceMessageTxt],
            direction: "Row"
          });
         
          // Begin of adding by Seyed Ismail on 15.12.2014 "MAC15122014+

          var oLabelEmail = new sap.ui.commons.Label({text: "Email: ",required:false, width: "70px"
          //layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: false, margin: false}),
            //wrapping: false
            }).addStyleClass("fontTitle marginTop10");

          

          var oTxtEmail = new sap.ui.commons.TextField('idTxtEmail', {
            //layoutData: new sap.ui.layout.GridData({span: "L2 M4 S6"}),
            width: "400px",
            enabled : true, // boolean
          }).addStyleClass("marginTop10 FormInputStyle redelEmail");
          
          //oCurrent.getEmail();
          
       // MAC11122017_1 +
          var oTxtEmail2 = new sap.ui.commons.TextField('idTxtEmail2', {
              //layoutData: new sap.ui.layout.GridData({span: "L8 M6 S6"}),
        	  width: "400px",
              enabled : true, // boolean
            }).addStyleClass("marginTop10 FormInputStyle redelEmail");
          
          var oTxtEmail3 = new sap.ui.commons.TextField('idTxtEmail3', {
              //layoutData: new sap.ui.layout.GridData({span: "L8 M6 S6"}),
        	  width: "400px",
              enabled : true, // boolean
            }).addStyleClass("marginTop10 FormInputStyle redelEmail");
       // MAC11122017_1 +
          
            var oFlexBoxEmail = new sap.m.FlexBox("idFlexBoxEmail",{
            width: "100%",
            items:[
                 oLabelEmail, 
                 lblSpace3, 
                 oTxtEmail,
                 new sap.ui.commons.Label( {text: " ",width : '8px'}),	// MAC11122017_1 +
                 oTxtEmail2,	// MAC11122017_1 +	
                 new sap.ui.commons.Label( {text: " ",width : '8px'}),	// MAC11122017_1 +
                 oTxtEmail3	// MAC11122017_1 +
            ],
            alignItems: sap.m.FlexAlignItems.Center,
            direction: "Row"
            }).addStyleClass("marginTop10");
            sap.ui.getCore().byId("idCurrRetFE4").insertField(oFlexBoxEmail,0);
          // End of adding by Seyed Ismail on 15.12.2014 "MAC15122014+
         
         var oFlexBoxCurrentReturnsFooterBtn = new sap.m.FlexBox("idFlexCurrRetTblFooterBtn",{
            width: "100%",
            items:[
                   oBtnCurrSubmit, lblSpace3, oBtnCurrReset
            ],
            alignItems: sap.m.FlexAlignItems.Center,
            direction: "Row"
          }).addStyleClass("marginTop10");
         
        var oFlexBoxCurrentReturnsFooter = new sap.m.FlexBox("idFlexCurrRetTblFooter",{
          width: "100%",
          items:[
                 oFlexBoxCurrentReturnsFooterMessage, oFlexBoxCurrentReturnsFooterBtn
          ],
          direction: "Column"
        }).addStyleClass("marginTop10");
         
         var oLabelCurrRetTblTitle = new sap.ui.commons.Label({text: "Redelivery Requests",
          layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: true, margin: false}),
                 wrapping: true}).addStyleClass("font15Bold marginTop10");
             
             var oFlexboxRetDetTableHeader = new sap.m.FlexBox("idFlexCurreRetTblHeader",{
                items: [oFlexBoxCurrentReturnsTblsubmitBtns],
                width:"100%",
                direction: "Row"
              });
             
         // Table
         var oCurrentReturnsTable = new sap.ui.table.Table("idCurrentRetTblOR",{
              visibleRowCount: 7,
              firstVisibleRow: 1,
              columnHeaderHeight: 30,
              selectionMode: sap.ui.table.SelectionMode.None,
              width: "100%",
              height:"100%"
         }).addStyleClass("fontStyle tblBorder");
         
       oCurrentReturnsTable.addColumn(new sap.ui.table.Column({
           label: new sap.ui.commons.CheckBox("idSelectAllChkBxCurrentRet",{
             change : function(){
              oCurrent.SelectAllCurrRet();
             }
            }),
                template: new sap.ui.commons.CheckBox().bindProperty("checked", "isChecked").bindProperty("name", "SerialNo"),
                width: "25px",
                height: "36px",
                //hAlign: "Center",
                resizable:false
        }));
         
         oCurrentReturnsTable.addColumn(new sap.ui.table.Column({
               label: new sap.ui.commons.Label({text: "Contract Type"}).addStyleClass("wraptextcol"),
                   template: new sap.ui.commons.TextView().bindProperty("text", "ContractType"),
                   sortProperty: "ContractType",
                   filterProperty: "ContractType",
                 width: "120px",
               resizable:false
          }));
         oCurrentReturnsTable.addColumn(new sap.ui.table.Column({
                  label: new sap.ui.commons.Label({text: "Contract"}).addStyleClass("wraptextcol"),
                  template: new sap.ui.commons.TextView().bindProperty("text", "Contract"),
                  sortProperty: "Contract",
                  filterProperty: "Contract",
                 width: "90px",
                resizable:false
          }));
         oCurrentReturnsTable.addColumn(new sap.ui.table.Column({
                  label: new sap.ui.commons.Label({text: "Unit Type"}).addStyleClass("wraptextcol"),
                  template: new sap.ui.commons.TextView().bindProperty("text", "UnitType"),
                  sortProperty: "UnitType",
                  filterProperty: "UnitType",
                  //hAlign: "Center",
                 width: "90px",
                resizable:false
          }));
         oCurrentReturnsTable.addColumn(new sap.ui.table.Column({
                  label: new sap.ui.commons.Label({text: "Location"}).addStyleClass("wraptextcol"),
                  template: new sap.ui.commons.TextView().bindProperty("text", "Location"),//.addStyleClass("FormInputStyle"),  //.bindProperty("editable","isLocEnabled")
                  sortProperty: "Location",
                  filterProperty: "Location",
                 width: "120px",
                resizable:false
          }));
         oCurrentReturnsTable.addColumn(new sap.ui.table.Column({
              label: new sap.ui.commons.Label({text: "Depot"}).addStyleClass("wraptextcol"),
              template: new sap.ui.commons.TextView().bindProperty("text", "Depot"),
              sortProperty: "Depot",
              filterProperty: "Depot",
             width: "240px",
            resizable:false
          }));
         oCurrentReturnsTable.addColumn(new sap.ui.table.Column({
              label: new sap.ui.commons.Label({text: "Unit Number"}).addStyleClass("wraptextcol"),
              template: new sap.ui.commons.TextView().bindProperty("text", "SerialNo"),//.addStyleClass("FormInputStyle"),  //.bindProperty("editable","isSrNoEnabled")
              sortProperty: "SerialNo",
              filterProperty: "SerialNo",
              width: "120px",
             resizable:false
        }));
         /*   var oModelCurrDate = new sap.ui.model.json.JSONModel();
        oModelCurrDate.setData({
          dateValue: new Date(),
          isRetDtEnabled:false
      });
        var oDate = new sap.ui.commons.DatePicker("idCurrDateOR",{
          width: "120px",
          change:function(){
            var editDate = this.getValue().split("-");
            editDate = editDate[2]+editDate[1]+editDate[0];
           // alert("chngd date " + editDate);
            var id = this.sId.replace('idCurrDateOR-col8','idTxtVwRetTblORV-col7');
            var oidTxtVwRetTbl = sap.ui.getCore().byId(id);
            oidTxtVwRetTbl.setText(editDate);
           
          },
        enabled:{path: "/isRetDtEnabled"},
          value: {
            path: "/dateValue",
          type: new sap.ui.model.type.Date({pattern: "dd-MM-yyyy"})},
        }).addStyleClass("FormInputStyle");

      oDate.setModel(oModelCurrDate);*/

        /* oCurrentReturnsTable.addColumn(new sap.ui.table.Column({
              label: new sap.ui.commons.Label({text: "Return Date"}),
              template: new sap.ui.commons.TextView("idTxtVwRetTblORV").bindProperty("text", "ReturnDate"),
              sortProperty: "ReturnDate",
              filterProperty: "ReturnDate",
              width: "0px",
             resizable:false,
             //visible:false
          }));
         
        oCurrentReturnsTable.addColumn(new sap.ui.table.Column({
              label: new sap.ui.commons.Label({text: "Return Date"}),
              template: new sap.ui.commons.TextView().bindProperty("text", "CurrentDateCR"), //oDate.addStyleClass("editableDpBorder"),
              sortProperty: "CurrentDateCR",
              filterProperty: "CurrentDateCR",
              width: "130px",
             resizable:false
          }));
       // oCurrentReturnsTable.addColumn(oColumn);  
        */

         oCurrentReturnsTable.addColumn(new sap.ui.table.Column({
              label: new sap.ui.commons.Label({text: "Status"}).addStyleClass("wraptextcol"),
              template: new sap.ui.commons.Link({
            press : function() {
              var errChkSrNo = this.getHelpId();
              oCurrent.showErrDetOR(errChkSrNo);
            }
          }).bindProperty("text", "Status").bindProperty("enabled", "isStatusEnabled").bindProperty("helpId", "SerialNo"),
              sortProperty: "Status",
              filterProperty: "Status",
              width: "80px",
            resizable:false
          }));
         /*oCurrentReturnsTable.addColumn(new sap.ui.table.Column({
           label: new sap.ui.commons.Label({text: "Edit"}),
                template: new sap.ui.commons.Link({
                 text:"Edit",
            press : function() {
              alert("link clicked");
            }
          }),
                sortProperty: "edit",
                filterProperty: "edit",
                width: "70px",
                resizable:false
          }));*/

        // Current Return Table Ends
        var oFlexboxRetDetTableTitle = new sap.m.FlexBox("idFlexBoxCurrRetTbl",{
            items: [oLabelCurrRetTblTitle,oCurrentReturnsTable,oFlexboxRetDetTableHeader ],
            width:"100%",
            direction: "Column"
          }).addStyleClass("OnlyPanelBorder");

        sap.ui.getCore().byId("idCurrRetFE1").insertField(oFlexboxRetDetTableTitle,0);
       // sap.ui.getCore().byId("idCurrRetFE2").insertField(oFlexboxRetDetTableHeader,0);
        sap.ui.getCore().byId("idCurrRetFE3").insertField(oFlexBoxCurrentReturnsFooter,0);
         
  }, //createCurrRetTable


  createNBindCurrentReturns:function(){
    var oCurrent = this;
     //vSelCustomerOR = $("#idComboCustomerOR").val();
    vSelCustomerOR = sap.ui.getCore().byId("idComboCustomerOR").getValue();
     loggedIncustomerOR = vSelCustomerOR;
     //vSelContractOR = sap.ui.getCore().byId("idComboContractNumberOR");
    // vSelUnitTypeOR = sap.ui.getCore().byId("idComboUnitTypeOR");
    // vSelCountryOR = $("#idComboCountryOR");
    // vSelCityOR = $("#idComboCityOR");
     vSelCityOR = sap.ui.getCore().byId("idComboCityOR").getValue();
    // vSelDepotOR = $("#idComboDepotOR");
     vUnitNumbers = sap.ui.getCore().byId("idTAUnitNoOR");
    // alert("custom length b4 " + customJsonCurrRet.length + "tbl json ,len" + aCurrentReturnsOR.length);
      customJsonCurrRet = [];
//    /aCurrentReturnsOR = [];
    var vCurrentRetTbl = sap.ui.getCore().byId("idCurrentRetTblOR");
    valid = true;
    if(vSelCustomerOR == "" || vSelCustomerOR == "Select Customer"){
      $("#idComboCustomerOR").attr("placeholder","Required");
      document.getElementById("idComboCustomerOR").style.borderColor = "red";
        document.getElementById("idComboCustomerOR").style.background = "#FAD4D4";
      /*vSelCustomerOR.setValueState(sap.ui.core.ValueState.Error);
      vSelCustomerOR.setPlaceholder("Required");*/
      valid = false;
    }
    if(vSelCityOR == ""){
      $("#idComboCityOR").attr("placeholder","Required");
      document.getElementById("idComboCityOR").style.borderColor = "red";
        document.getElementById("idComboCityOR").style.background = "#FAD4D4";
      valid = false;
    }
    if(vUnitNumbers.getValue() == ""){
      vUnitNumbers.setPlaceholder("Required");
      vUnitNumbers.setValueState(sap.ui.core.ValueState.Error);
      valid = false;
    }
    /*var vSelContNumber = vSelContractOR.getValue();
    if(vSelContNumber == "Select Contract Number"){
      vSelContNumber = "";
    }

    var vSelUnitType = vSelUnitTypeOR.getValue();
    if(vSelUnitType == "Select Unit Type"){
      vSelUnitType = "";
    }*/
    var cDate = dateFormat(new Date(),'dd-mm-yyyy');
    /* Begin of commenting by Seyed Ismail on 13.03.2015 "MAC13032015- */
    /*var currentDate = dateFormat(new Date(),'dd-mm-yyyy').split("-");
     currentDate = currentDate[2]+currentDate[1]+currentDate[0]; */
     /* End of commenting by Seyed Ismail on 13.03.2015 "MAC13032015- */
    var currentDates = sap.ui.getCore().byId("idCurrDate").getValue().split("-");  // MAC13032015+
    var currentDate = currentDates[2]+currentDates[1]+currentDates[0];   // MAC13032015+
    //alert("curr date "+ currentDate);
    if(valid){
      if(oCurrent.checkLimit25OR()){
        /*var depotVal = "";
        if(vSelDepotOR.val() != ""){
          var selDepoName = jQuery.grep(DepotDataCombo, function(element, index){
                    return element.IdName == vSelDepotOR.val();
            });
          depotVal = selDepoName[0].Name;
        }
        else{
          depotVal = "";
        }*/
        var newUnUR = sap.ui.getCore().byId("idTAUnitNoOR").getValue().split(/\n/g);
        var unitNumbrsEnteredNew = newUnUR.length;
        var enteredUnitNumbersOR = [];
        for(var k=0 ; k<unitNumbrsEnteredNew ; k++){

            if(newUnUR[k].trim().length != 0){
              enteredUnitNumbersOR.push(newUnUR[k].toUpperCase());
            }
          }
        var oUtil = new utility();
        enteredUnitNumbersOR = oUtil.unique(enteredUnitNumbersOR);

          unitNumbrsEntered = enteredUnitNumbersOR.length;
          if(unitNumbrsEntered > 0){
          for(var i=0;i<unitNumbrsEntered;i++){
            customJsonCurrRet.push({
              "isChecked":false,
              "ContractType": "",
              //"Contract":vSelContNumber,
              //"UnitType":vSelUnitType,
              "Location":vSelCityOR,
              //"Depot":depotVal,
              "SerialNo":enteredUnitNumbersOR[i],
              "CurrentDateCR":cDate,
              "ReturnDate":currentDate,
              "Status":"",
              "isSrNoEnabled":false,
              "isLocEnabled":false,
              "isStatusEnabled":false
            });
            var id= "idCurrDateOR-col7-row"+i+"-input";
             $("#"+id).prop( "disabled", true );
          }
          }
          else{
            customJsonCurrRet.push({
            "isChecked":false,
            "ContractType": "",
            //"Contract":vSelContNumber,
            //"UnitType":vSelUnitType,
            "Location":vSelCityOR,
            //"Depot":depotVal,
            "SerialNo":"",
            "CurrentDateCR":cDate,
            "ReturnDate":currentDate,
            "Status":"",
            "isSrNoEnabled":false,
            "isLocEnabled":false,
            "isStatusEnabled":false
          });
            aCurrentReturnsOR.push({
            "isChecked":false,
            "ContractType": "",
            //"Contract":vSelContNumber,
            //"UnitType":vSelUnitType,
            "Location":vSelCityOR,
            //"Depot":depotVal,
            "SerialNo":"",
            "CurrentDateCR":cDate,
            "ReturnDate":currentDate,
            "Status":"",
            "isSrNoEnabled":false,
            "isLocEnabled":false,
            "isStatusEnabled":false
          });
          }
          if(unitNumbrsEntered > 0){
            var presentUnitnumbers = "The following unit numbers already exist in the Current Returns Section.\nPlease remove the duplicate Unit Number(s) and re-try.\n"+
                          "Duplicate Unit Numbers: \n";
            var Presentflag = false;
            for(var j=0; j <customJsonCurrRet.length ; j++){
              var temp = jQuery.grep(aCurrentReturnsOR, function(element, index){
                      return element.SerialNo == customJsonCurrRet[j].SerialNo && element.SerialNo != "";
                  });
              if(temp.length>0){
                Presentflag = true;
                presentUnitnumbers += "\t" + customJsonCurrRet[j].SerialNo + "\n";
                continue;
              }else{
                aCurrentReturnsOR.push({
                "isChecked":false,
                "ContractType": "",
                //"Contract":vSelContNumber,
                //"UnitType":vSelUnitType,
                "Location":vSelCityOR,
                //"Depot":depotVal,
                "SerialNo":customJsonCurrRet[j].SerialNo,
                "CurrentDateCR":cDate,
                "ReturnDate":currentDate,
                "Status":"",
                "isSrNoEnabled":false,
                "isLocEnabled":false,
                "isStatusEnabled":false
              });
              }
            }
            if(Presentflag){
              sap.ui.commons.MessageBox.alert(presentUnitnumbers);
            }
          }



          sap.ui.getCore().byId("idBtnCurrValidate").setEnabled(true);
        vCurrentRetTbl.unbindRows();
          var oModelCurrReturns = new sap.ui.model.json.JSONModel();
          oModelCurrReturns.setData({modelData: aCurrentReturnsOR});
          vCurrentRetTbl.setModel(oModelCurrReturns);
          vCurrentRetTbl.bindRows("/modelData");
          var vArrayLength=aCurrentReturnsOR.length;
          if(vArrayLength < 25){
            vCurrentRetTbl.setVisibleRowCount(vArrayLength);
            vCurrentRetTbl.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
            }
            else{
              vCurrentRetTbl.setVisibleRowCount(25);
              vCurrentRetTbl.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
            }
      }
      else{
        var Limit25Message = "Each Return Authorization (RA) can contain maximum 25 units. \n To return more than 25 units, please create multiple RA's";
         sap.ui.commons.MessageBox.show(Limit25Message,
                       sap.ui.commons.MessageBox.Icon.WARNING,
                       "Warning",
                       [sap.ui.commons.MessageBox.Action.OK], 
                           sap.ui.commons.MessageBox.Action.OK);
         if(aCurrentReturnsOR.length == 0){
           sap.ui.getCore().byId("idCurrentRetTblOR").destroy();
            sap.ui.getCore().byId("idFlexBoxCurrRetTbl").destroy();
            sap.ui.getCore().byId("idFlexCurrRetTblFooter").destroy();
            sap.ui.getCore().byId("idFlexBoxEmail").destroy();        // MAC15122014+
         }
      }
    }
    else{
      //not valid
      if(sap.ui.getCore().byId("idCurrentRetTblOR")){
          sap.ui.getCore().byId("idCurrentRetTblOR").destroy();
          sap.ui.getCore().byId("idFlexBoxCurrRetTbl").destroy();
          sap.ui.getCore().byId("idFlexCurrRetTblFooter").destroy();
          sap.ui.getCore().byId("idFlexBoxEmail").destroy();        // MAC15122014+
       }
    }
  }, //createNBindCurrentReturns

  ResetORForm:function(){
    var oCurrent = this;
    var ConfirmMessage = "This will reset all the selections in your form.\n Do you want to proceed?";
     sap.ui.commons.MessageBox.show(ConfirmMessage,
        sap.ui.commons.MessageBox.Icon.WARNING,
        "Warning",
              [sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO], 
              oCurrent.fnCallbackAddToRetResetOR,
              sap.ui.commons.MessageBox.Action.YES);
  }, //ResetORForm

  fnCallbackAddToRetResetOR: function(sResult){
    if(sResult == "YES"){

      //security
      //var objUser = new loggedInU();
      loggedInUserTypeOR = objLoginUser.getLoggedInUserType();
      //if(loggedInUserTypeOR != "CUSTOMER"){
      sap.ui.getCore().byId("idComboCustomerOR").setValue("");
      sap.ui.getCore().byId("idComboCityOR").setValue("");
      //$("#idComboCustomerOR").val("");
      //}
       //vSelContractOR = sap.ui.getCore().byId("idComboContractNumberOR");
      // vSelUnitTypeOR = sap.ui.getCore().byId("idComboUnitTypeOR");
      // vSelCountryOR = $("#idComboCountryOR");
      // vSelCityOR = $("#idComboCityOR");
      // vSelDepotOR = $("#idComboDepotOR");
       
      $("#idComboCustomerOR").attr("placeholder","Select Customer");
      document.getElementById("idComboCustomerOR").style.borderColor = "#cccccc";
      document.getElementById("idComboCustomerOR").style.background = "#ffffff";

      $("#idComboCityOR").attr("placeholder","Select City");
      document.getElementById("idComboCityOR").style.borderColor = "#cccccc";
      document.getElementById("idComboCityOR").style.background = "#ffffff";
       
      //vSelContractOR.setValue("");
      //vSelContractOR.setValueState(sap.ui.core.ValueState.None);

      //vSelContractOR.setSelectedItemId(0);
      //  vSelUnitTypeOR.setValue("");
      //vSelCountryOR.val("");
      //vSelCityOR.val("");
      //vSelDepotOR.val("");
      sap.ui.getCore().byId("idTAUnitNoOR").setValue("");
      sap.ui.getCore().byId("idTAUnitNoOR").setValueState(sap.ui.core.ValueState.None);
      sap.ui.getCore().byId("idTAUnitNoOR").setPlaceholder("Unit Numbers");
       /* if(sap.ui.getCore().byId("OnlineReturnsSelectUnits")){
          sap.ui.getCore().byId("OnlineReturnsSelectUnits").destroy();
        }*/
        aUnitNumbersOR = [];
        customJsonCurrRet = [];  
    }
  }, //fnCallbackAddToRetResetOR

  DeleteCurrRetOR:function(){
    oCurrent = this;
    var vCurrentRetTbl = sap.ui.getCore().byId("idCurrentRetTblOR");

    var NoChkBoxCheckedMessage = "No Return have been selected. \n " +
     "Please select return(s) by checking the relevant checkbox(es) on the left of the Contract Type and retry";
    aChkBoxChkdCurrRetOR = $('#idCurrentRetTblOR').find('input[type="checkbox"]:checked');
    var vChkdLen = aChkBoxChkdCurrRetOR.length;
    if(vChkdLen == 0 ){
       sap.ui.commons.MessageBox.show(NoChkBoxCheckedMessage,
                     sap.ui.commons.MessageBox.Icon.WARNING,
                     "Warning",
                     [sap.ui.commons.MessageBox.Action.OK], 
                         sap.ui.commons.MessageBox.Action.OK);
       
    }
    else{
      var ConfirmMessage = "This will delete the records you have selected.\n Do you still want to continue?";
       sap.ui.commons.MessageBox.show(ConfirmMessage,
              sap.ui.commons.MessageBox.Icon.WARNING,
              "Warning",
                    [sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO], 
                    oCurrent.fnCallbackDeleteOR,
                    sap.ui.commons.MessageBox.Action.YES);
       var submitFlag = false;
       for(var j=0 ; j<aCurrentReturnsOR.length;j++){
            if(aCurrentReturnsOR[j].Status == "OK" || aCurrentReturnsOR[j].Status == "WARNING"){
              submitFlag = true;
            }
            else{
              submitFlag=false;
              break;
            }
          }
          if(submitFlag){
            sap.ui.getCore().byId("idBtnCurrSubmit").setEnabled(true);
          sap.ui.getCore().byId("idBtnDepot").setEnabled(true);       //MAC15122014 +
          }
          else{
            sap.ui.getCore().byId("idBtnCurrSubmit").setEnabled(false);
          sap.ui.getCore().byId("idBtnDepot").setEnabled(false);        //MAC15122014 +
          }
    }
  }, //DeleteCurrRetOR


  fnCallbackDeleteOR: function(sResult){
    var vCurrentRetTbl = sap.ui.getCore().byId("idCurrentRetTblOR");
    if(sResult == "YES"){
       var arrayLen = aCurrentReturnsOR.length;
              for(var i=arrayLen-1; i>=0; i--){
                     if(aCurrentReturnsOR[i].isChecked){
                       aCurrentReturnsOR.splice(i,1);
                       vCurrentRetTbl.getModel().updateBindings();
                           arrayLen = arrayLen - 1;
                     }
              }
              vArrayLength = aCurrentReturnsOR.length;
              if(vArrayLength < 25){
            vCurrentRetTbl.setVisibleRowCount(vArrayLength);
            vCurrentRetTbl.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
            }
            else{
              vCurrentRetTbl.setVisibleRowCount(25);
              vCurrentRetTbl.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
            }
              var submitFlag = false;
         for(var j=0 ; j<aCurrentReturnsOR.length;j++){
              if(aCurrentReturnsOR[j].Status == "OK" || aCurrentReturnsOR[j].Status == "WARNING"){
                submitFlag = true;
              }
              else{
                submitFlag=false;
               break;
              }
            }
            if(submitFlag){
              sap.ui.getCore().byId("idBtnCurrSubmit").setEnabled(true);
            if(depotButtonOn == true){                      //MAC15122014 +
            sap.ui.getCore().byId("idBtnDepot").setEnabled(true);       //MAC15122014 +
            }                                 //MAC15122014 +
            }
            else{
              sap.ui.getCore().byId("idBtnCurrSubmit").setEnabled(false);
            if(depotButtonOn == false){                     //MAC15122014 +
            sap.ui.getCore().byId("idBtnDepot").setEnabled(false);        //MAC15122014 +
            }                                 //MAC15122014 +
            }
             // vCurrentRetTbl.setVisibleRowCount(arrayLen);

    }

  }, //fnCallbackDeleteOR

  ValidateCurrRetOR: function(){
    //vSelCustomerOR = $("#idComboCustomerOR").val();
	  vSelCustomerOR = sap.ui.getCore().byId("idComboCustomerOR").getValue();
    //if(loggedInUserTypeOR == "CUSTOMER"){
      //customerOR = vSelCustomerOR;
    //}
    //else{
      var selCustomer = jQuery.grep(CustomerDataCombo, function(element, index){
            return element.CustName == vSelCustomerOR;
      });
         customerOR = selCustomer[0].Partner.replace(/^0+/, '');
    //}
    var vCurrentRetTbl = sap.ui.getCore().byId("idCurrentRetTblOR");
    busyDialog.open();
    var Row = [];
    var count = 0;
    var aChkBoxCurrRetValidateOR = [];
    var NoChkBoxCheckedMessage = "No Return have been selected. \n " +
     "Please select return(s) by checking the relevant checkbox(es) on the left of the Contract Type and retry";
    aChkBoxCurrRetValidateOR = jQuery.grep(aCurrentReturnsOR, function(element, index){
            return element.isChecked == true;
        });

    //alert("chkd len " + aChkBoxCurrRetValidateOR.length);
    var len = aChkBoxCurrRetValidateOR.length;
    if(len == 0){
       sap.ui.commons.MessageBox.show(NoChkBoxCheckedMessage,
                     sap.ui.commons.MessageBox.Icon.WARNING,
                     "Warning",
                     [sap.ui.commons.MessageBox.Action.OK], 
                         sap.ui.commons.MessageBox.Action.OK);
       busyDialog.close();
    }
    else{
      var urlToCall = serviceUrl + "/Current_Ret_Validate?$filter="; 

      for(var j=0 ; j < aCurrentReturnsOR.length ; j++){
        for(var i=0 ; i < len ; i++){

          if(aCurrentReturnsOR[j].SerialNo == aChkBoxCurrRetValidateOR[i].SerialNo){
            // Row[count] = aCurrentReturnsOR[j].Contract + "$$$$" + aCurrentReturnsOR[j].Location + "$$" + aCurrentReturnsOR[j].SerialNo.toUpperCase();
             Row[count] = customerOR + "$$$$" + aCurrentReturnsOR[j].Location + "$$" + aCurrentReturnsOR[j].SerialNo.toUpperCase()+ "$" + aCurrentReturnsOR[j].ReturnDate;
             count++;
             break;
          }
        }
      }

      for(var k=0 ; k < Row.length ; k++){
        if(k != (Row.length-1)){
          urlToCall = urlToCall + " ICustDetail" + (k+1) + " eq '" + Row[k] + "' and";
        }
        else{
          urlToCall = urlToCall + " ICustDetail" + (k+1) + " eq '" + Row[k] + "'";
        }
      }
    //  alert("url validate:" + urlToCall);
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
            aErrWarning = [];
            //var oUtil = new utility();
            var errArray = [];
            var dataLen = data.results.length;
            aErrWarning = data.results;

          // Begin of adding by Seyed Ismail on 15.12.2014 MAC27012015+
          var emptyDepot = jQuery.grep(data.results, function(element, index){
                  return element.Depot == "";
            });

          var empLen = emptyDepot.length;

          if(empLen == dataLen){
            depotButtonOn = false;
          }
          else{
            depotButtonOn = true;
          }

          // End of adding by Seyed Ismail on 15.12.2014 MAC27012015+


            for(var k=0 ; k<aCurrentReturnsOR.length ; k++){
            errArray = jQuery.grep(data.results, function(element, index){
                  return element.Serialnr.trim().toUpperCase() == aCurrentReturnsOR[k].SerialNo.substring(0,18).trim().toUpperCase();
            });

              if(errArray.length > 0){
                aCurrentReturnsOR[k].ContractType = errArray[0].Contyp;
                if(loggedInUserTypeOR != "SEACO"){
                  if((errArray[0].Status.toUpperCase()) == "WARNING" || (errArray[0].Status.toUpperCase()) == "ERROR")
                    aCurrentReturnsOR[k].Status = "ERROR";
                  else
                    aCurrentReturnsOR[k].Status = errArray[0].Status;
                }
                else{
                  aCurrentReturnsOR[k].Status = errArray[0].Status;
                }

                if(errArray[0].Status == "OK")
                  aCurrentReturnsOR[k].isStatusEnabled = false;
                else
                  aCurrentReturnsOR[k].isStatusEnabled = true;

                if(aCurrentReturnsOR[k].ErrMsgno == "999" && aCurrentReturnsOR[k].ErrLine == "9999" && aCurrentReturnsOR[k].Status.trim().toUpperCase() == "ERROR"){
                  aCurrentReturnsOR[k].Status = errArray[0].Status;
                  aCurrentReturnsOR[k].isStatusEnabled = true;
              }

                //aCurrentReturnsOR[k].isStatusEnabled = true;
                /*if(aCurrentReturnsOR[k].Contract == "")
                  aCurrentReturnsOR[k].Contract = objUtil.removeLeadZero(errArray[0].Contract);
                if(aCurrentReturnsOR[k].UnitType == "")
                  aCurrentReturnsOR[k].UnitType = errArray[0].UnitType;
                if(aCurrentReturnsOR[k].Depot == "")
                  aCurrentReturnsOR[k].Depot = errArray[0].Depot;*/

                //for new condtn as discussed with kshitij on 5 august 2014
                  aCurrentReturnsOR[k].Contract = objUtil.removeLeadZero(errArray[0].Contract);
                  aCurrentReturnsOR[k].UnitType = errArray[0].UnitType;
                  aCurrentReturnsOR[k].Depot = errArray[0].Depot;


              }
              else{
                if(aCurrentReturnsOR[k].Status == ""){
                  aCurrentReturnsOR[k].Status = "";
                  aCurrentReturnsOR[k].isStatusEnabled = false;
                }
              }
            }
            vCurrentRetTbl.getModel().updateBindings();
            var submitFlag = false;
           for(var j=0 ; j<aCurrentReturnsOR.length;j++){
               if(aCurrentReturnsOR[j].Status == "OK" || aCurrentReturnsOR[j].Status == "WARNING"){
                  submitFlag = true;
                }
                else{
                  submitFlag=false;
                  break;
                }
              }
              if(submitFlag){
                sap.ui.getCore().byId("idBtnCurrSubmit").setEnabled(true);
              if(depotButtonOn == true){                      //MAC15122014 +
              sap.ui.getCore().byId("idBtnDepot").setEnabled(true);       //MAC15122014 +
              }                                 //MAC15122014 +
              }
              else{
                sap.ui.getCore().byId("idBtnCurrSubmit").setEnabled(false);
              if(depotButtonOn == false){                     //MAC15122014 +
              sap.ui.getCore().byId("idBtnDepot").setEnabled(false);        //MAC15122014 +
              }
              }
            busyDialog.close();
          },
          function(err){
            busyDialog.close();
            errorfromServer(err);
            //alert("Error while reading region : "+ window.JSON.stringify(err.response));
          }); //odata request
    }
  }, //ValidateCurrRetOR

  // Begin of adding by Seyed Ismail on 15.12.2014 //MAC15122014+
  
  DepotDetails: function(){

    allOkWarningLines = [];
           for(var j=0 ; j<aCurrentReturnsOR.length;j++){
               if(aCurrentReturnsOR[j].Status == "OK" || aCurrentReturnsOR[j].Status == "WARNING"){
                  allOkWarningLines[j] = aCurrentReturnsOR[j];
                }
              }
    if(allOkWarningLines.length != 0){
    var bus = sap.ui.getCore().getEventBus();
    bus.publish("nav", "to", {
      id : "onlinereturnsresult"
    });
    var oResult = new onlineRetResult();
    oResult.getResult(allOkWarningLines);
    }
    else{
    sap.ui.commons.MessageBox.alert("You may need to clear ERROR status first");
    }
  },  
  // End of adding by Seyed Ismail on 15.12.2014 //MAC15122014+

  EditCurrRetOR:function(Btntext){
    var vCurrentRetTbl = sap.ui.getCore().byId("idCurrentRetTblOR");
    if(Btntext == "Edit"){ 
      //alert(sap.ui.getCore().byId("idBtnCurrSubmit").getEnabled());
      if(sap.ui.getCore().byId("idBtnCurrSubmit").getEnabled()){
        sap.ui.getCore().byId("idBtnCurrSubmit").setEnabled(false);
      }
      sap.ui.getCore().byId("idBtnCurrValidate").setEnabled(false);
      sap.ui.getCore().byId("idBtnCurrEdit").setText("Save");
      //sap.ui.getCore().byId("idCurrDateOR").setEnabled(true);
      /*.getModel().setData({
        dateValue: new Date(),
          isRetDtEnabled:true
      });
      sap.ui.getCore().byId("idCurrDateOR").getModel().updateBindings();*/
      for(var j=0 ; j<aCurrentReturnsOR.length ; j++){
        aCurrentReturnsOR[j].isLocEnabled = true;
        aCurrentReturnsOR[j].isSrNoEnabled = true; 
      }
      vCurrentRetTbl.getModel().updateBindings();
    }
    else{
      sap.ui.getCore().byId("idBtnCurrValidate").setEnabled(true);
      sap.ui.getCore().byId("idBtnCurrEdit").setText("Edit");

      //sap.ui.getCore().byId("idCurrDateOR").setEnabled(false);
      /*.getModel().setData({
        dateValue: new Date(),
          isRetDtEnabled:false
      });*/
      //sap.ui.getCore().byId("idCurrDateOR").getModel().updateBindings();
      for(var j=0 ; j<aCurrentReturnsOR.length ; j++){
        aCurrentReturnsOR[j].Location = toTitleCase(aCurrentReturnsOR[j].Location);
        aCurrentReturnsOR[j].isLocEnabled = false;
        aCurrentReturnsOR[j].isSrNoEnabled = false; 
      }
      vCurrentRetTbl.getModel().updateBindings();
    }
  }, //EditCurrRetOR

  showErrDetOR: function(selSrNo){
    var currErrMsgs = jQuery.grep(aErrWarning, function(element, index){
            return element.Serialnr.toUpperCase().trim() == selSrNo.substring(0,18).trim().toUpperCase();
    });

    var err = "";
    for(var i=0 ; i<currErrMsgs.length;i++){
      if( currErrMsgs[i].ErrType == "E"){
        //alert("e")
        err += "Error : " + currErrMsgs[i].ErrMessage + "\n";
      }
      else{
        //alert("w")
        err += "Warning : " + currErrMsgs[i].ErrMessage + "\n";
      }

    }
    sap.ui.commons.MessageBox.alert(
                "Message \n\n" +
                "\t"+err+ "");


  }, //showErrDetOR

  submitCurrRet: function(){
    busyDialog.open();
    var oCurrent = this;
    var vCurrRetLen = aCurrentReturnsOR.length;
    var Row = [];
    var count = 0;
    var urlToCall = serviceUrl + "/Current_Ret_Submit?$filter=";
    for(var j=0 ; j< vCurrRetLen ; j++){
      var depotName = aCurrentReturnsOR[j].Depot;
      depotName = depotName.replace(/\'/g, "|");
      depotName =  depotName.replace(/&/g, "@");

             Row[count] = aCurrentReturnsOR[j].ContractType + "$" + aCurrentReturnsOR[j].Contract + "$" + aCurrentReturnsOR[j].UnitType + "$" +
                    aCurrentReturnsOR[j].Location + "$" + depotName + "$" + aCurrentReturnsOR[j].SerialNo + "$" + 
                   aCurrentReturnsOR[j].ReturnDate;
                  // dateFormat(aCurrentReturnsOR[j].ReturnDate,'yyyymmdd');
             count++;
             //break;
          }


      for(var k=0 ; k < Row.length ; k++){
        if(k != (Row.length-1)){
          urlToCall = urlToCall + " ICustDetail" + (k+1) + " eq '" + Row[k] + "' and";
        }
        else{
          urlToCall = urlToCall + " ICustDetail" + (k+1) + " eq '" + Row[k] + "'";
        }
      }
    //  alert("urlToCall submit:" + urlToCall);
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
            if(data.results.length > 0){

              if(data.results[0].ErrType == "S"){
                //if ra created send mail.
                aMailInputOR = [];
                aMailInputOR = jQuery.grep(data.results, function(element, index){
                    return element.ErrMessage.substring(0,10).toLowerCase() == "ra created";
              });

                var raSuccessMsg = 'Redelivery Reference : ' + data.results[0].RaNo;


                var htmlContentRaNo = '<button type="button" id="idBtnRaNo" data-sap-ui="idBtnRaNo" role="button" aria-disabled="true" tabindex="0" style="width:280px" class="redelReference">'+raSuccessMsg+'</button>';
              sap.ui.getCore().byId("idHTMLRaNo").setContent(htmlContentRaNo);

                sap.ui.commons.MessageBox.alert("RA Number created : " + data.results[0].RaNo,fnCallBackSendMail);
                sap.ui.getCore().byId("idTAUnitNoOR").setValue("");
                sap.ui.getCore().byId("idTAUnitNoOR").setValueState(sap.ui.core.ValueState.None);
                sap.ui.getCore().byId("idTAUnitNoOR").setPlaceholder("Unit Numbers");
                //var oGetData = new getDataOnlineReturns();
                //oGetData.bindExistingReturns("M");
                busyDialog.close();
              }
              else{
                sap.ui.commons.MessageBox.alert("RA could not be created at this time. Please try again later.");
                busyDialog.close();
              }
              // Begin of commenting by Seyed Ismail on 15.12.2014 MAC15122014

              /* if(sap.ui.getCore().byId("idCurrentRetTblOR")){
              sap.ui.getCore().byId("idCurrentRetTblOR").destroy();
              sap.ui.getCore().byId("idFlexBoxCurrRetTbl").destroy();
              sap.ui.getCore().byId("idFlexCurrRetTblFooter").destroy();
             }*/

              // End of commenting by Seyed Ismail on 15.12.2014 MAC15122014
              //busyDialog.close();
            }
            else{
               sap.ui.commons.MessageBox.show("No results found. Please try again later.",
                           sap.ui.commons.MessageBox.Icon.WARNING,
                           "Warning",
                           [sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO], 
                           oCurrent.fnCallbackMessageBox,
                               sap.ui.commons.MessageBox.Action.YES); 
               busyDialog.close();
            }
          },
          function(err){
            busyDialog.close();
            errorfromServer(err);
            //alert("Error while reading region : "+ window.JSON.stringify(err.response));
          }); //odata request
  }, //submitCurrRet

  currRetReset:function(){
    var oCurrent = this;
    var ConfirmMessage = "This will delete all the selections in current returns section.\n Do you want to proceed?";
     sap.ui.commons.MessageBox.show(ConfirmMessage,
        sap.ui.commons.MessageBox.Icon.WARNING,
        "Warning",
               [sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO], 
               oCurrent.fnCallbackResetCurrRetOR,
               sap.ui.commons.MessageBox.Action.YES);
    }, //currRetReset

  fnCallbackResetCurrRetOR: function(sResult){
     if(sResult == "YES"){
       aCurrentReturnsOR = [];
       if(sap.ui.getCore().byId("idCurrentRetTblOR")){
          sap.ui.getCore().byId("idCurrentRetTblOR").destroy();
          sap.ui.getCore().byId("idFlexBoxCurrRetTbl").destroy();
          sap.ui.getCore().byId("idFlexCurrRetTblFooter").destroy();
          sap.ui.getCore().byId("idFlexBoxEmail").destroy(); //MAC15122014+
       }
     }
  }, //fnCallbackResetCurrRetOR

  SelectAllCurrRet:function(){
    var len = aCurrentReturnsOR.length;
    var vCurrRetTbl = sap.ui.getCore().byId("idCurrentRetTblOR");
    if(sap.ui.getCore().byId("idSelectAllChkBxCurrentRet").getChecked()){
      for(var i=0;i<len;i++){
        aCurrentReturnsOR[i].isChecked = true;
      }
    }
    else{
      for(var i=0;i<len;i++){
        aCurrentReturnsOR[i].isChecked = false;
      }
    }

    vCurrRetTbl.getModel().updateBindings();
  }, //SelectAllUnitNumbers

  checkLimit25OR: function(){
    var len = aCurrentReturnsOR.length;
    var PresentFlagOR = false;
    var countPresentNumbers = 0;
    var totalCount = 0;
    var newUnUR = sap.ui.getCore().byId("idTAUnitNoOR").getValue().split(/\n/g);
    var unitNumbrsEnteredLength = newUnUR.length;
    var enteredUnitNumbersOR = [];
    for(var k=0 ; k<unitNumbrsEnteredLength ; k++){
        if(newUnUR[k].trim().length != 0){
          enteredUnitNumbersOR.push(newUnUR[k].toUpperCase());
        }
      }
    var oUtil = new utility();
    enteredUnitNumbersOR = oUtil.unique(enteredUnitNumbersOR);

      unitNumbrsEnteredLength = enteredUnitNumbersOR.length; 
    //alert("arr len " + len + "entered " + unitNumbrsEnteredLength);
    for(var j=0;j<unitNumbrsEnteredLength;j++){
      var temp = jQuery.grep(aCurrentReturnsOR, function(element, index){
              return element.SerialNo == enteredUnitNumbersOR[j];
          });
      if(temp.length>0){
        PresentFlagOR = true;
        countPresentNumbers++;
      }
    }
    //alert("present " + countPresentNumbers);
    if(PresentFlagOR)
       totalCount = len + unitNumbrsEnteredLength - countPresentNumbers;
    else
       totalCount = len + unitNumbrsEnteredLength;
    if(totalCount > 25){
      //alert("stop")
      return false;
    }
    else{
      //alert("go");
      return true;
    }
  },

  daysInMonth : function(month,year) {
    var m = [31,28,31,30,31,30,31,31,30,31,30,31];
    if (month != 02) return m[month - 1];
    if (year%4 != 0) return m[1];
    if (year%100 == 0 && year%400 != 0) return m[1];
    return m[1] + 1;
    },

  /* Begin of adding by Seyed Ismail on 15.12.2015 MAC15122015+*/

  getEmail : function(){

           var userId = sessionStorage.getItem("uName");
         var filter = "/LS_EMAIL_SET?$filter=Bname eq '"+userId+"'";
         
           
           oModel = new sap.ui.model.odata.ODataModel(auth_serviceUrl, true);
             OData.request({ 
                //requestUri: serviceUrl + "/Auth_Check?$filter=Bname eq '" + userId + "' and Password eq '" + pswd + "'",
                requestUri: auth_serviceUrl+filter,
                
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
                      var email = data.results[0].Email;
                      if(sap.ui.getCore().byId("idTxtEmail"))
                      sap.ui.getCore().byId("idTxtEmail").setValue(email);
              },
              function(err){
                    busyDialog.close();
                    //alert("Error while Login : "+ window.JSON.stringify(err.response));
                    errorfromServer(err);
              }
           );
       
  },


  /* End of adding by Seyed Ismail on 15.12.2015 MAC15122015+*/
  /* Begin of adding by Seyed Ismail on 13.03.2015 MAC13032015+*/
  switchToNextMonth: function(){

    var oCurrent = this;
    // Return Date
    var retDate = sap.ui.getCore().byId("idCurrDate");


    var todays = new Date();

    // Next month's date
    var nextDate = '01';

    //Next month's month
    var nextMonth = todays.getMonth();
    if( nextMonth == 11)
    {
      nextMonth = 1;
    }
    else{
    nextMonth = nextMonth + 2;
    }

    var nextMonths;
    if(nextMonth < 10)
    {
        nextMonths = '0' + nextMonth;
    }
    else{
      nextMonths = nextMonth;
    }

    //Next month's year
    var nextYear;
    if (todays.getMonth() == 11) {
        nextYear = todays.getFullYear() + 1;
    } else {
      nextYear = todays.getFullYear();
    }

    var nextValue = nextDate + '-' + nextMonths + '-' + nextYear;
    retDate.setValue(nextValue);

    // Expiry Date
    var expDate = sap.ui.getCore().byId("idLastDate");

    nextDate = oCurrent.daysInMonth(nextMonth, nextYear);

    nextValue = nextDate + '-' + nextMonths + '-' + nextYear;
    expDate.setValue(nextValue);

  },
  switchToThisMonth: function(){
    var oCurrent = this;
    // Return Date
    var retDate = sap.ui.getCore().byId("idCurrDate");


    var todays = new Date();

    // This month's date
    var thisDate = todays.getDate();
    if(thisDate<10) {
      thisDate = '0' + thisDate;
    }


    //This month's month
    var thisMonth = todays.getMonth();
    thisMonth = thisMonth + 1;

    var thisMonths;
    if(thisMonth < 10)
    {
        thisMonths = '0' + thisMonth;
    }
    else{
      thisMonths = thisMonth;
    }

    //This month's year
    var thisYear = todays.getFullYear();

    var thisValue = thisDate + '-' + thisMonths + '-' + thisYear;
    retDate.setValue(thisValue);

    // Expiry Date
    var expDate = sap.ui.getCore().byId("idLastDate");

    thisDate = oCurrent.daysInMonth(thisMonth, thisYear);

    thisValue = thisDate + '-' + thisMonths + '-' + thisYear;
    expDate.setValue(thisValue);


  },

  changeDateBindings:function(){

    var currentDates = sap.ui.getCore().byId("idCurrDate").getValue().split("-");  // MAC13032015+
    var currentDate = currentDates[2]+currentDates[1]+currentDates[0];   // MAC13032015+

    var newUnUR = sap.ui.getCore().byId("idTAUnitNoOR").getValue().split(/\n/g);
    var unitNumbrsEnteredNew = newUnUR.length;
    var enteredUnitNumbersOR = [];
    for(var k=0 ; k<unitNumbrsEnteredNew ; k++){
        if(newUnUR[k].trim().length != 0){
          enteredUnitNumbersOR.push(newUnUR[k].toUpperCase());
        }
        }
      var oUtil = new utility();
      enteredUnitNumbersOR = oUtil.unique(enteredUnitNumbersOR);

          unitNumbrsEntered = enteredUnitNumbersOR.length;
          if(unitNumbrsEntered > 0){
          for(var i=0;i<unitNumbrsEntered;i++){
            customJsonCurrRet[i].ReturnDate = currentDate;
            aCurrentReturnsOR[i].ReturnDate = currentDate;
          }
          }
    }


  /* End of adding by Seyed Ismail on 13.03.2015 MAC13032015+*/
});

function fnCallBackSendMail(){
  busyDialog.open();
  var len = aMailInputOR.length;
  var Row = [];
  var count = 0;
  var vUserName = objLoginUser.getLoggedInUserName().toUpperCase();
  var urlToCall = serviceUrl + "/RedeliveryReq_Email?$filter=Username eq '" + vUserName + "' and ";
  var offHireDt = aMailInputOR[0].RetDate.split("(");
   var vDate = offHireDt[1].split(")");
   var vformattedOuDate = dateFormat(new Date(Number(vDate[0])), 'dd-mm-yyyy',"UTC").split("-");
   
   var iDate = vformattedOuDate[2]+vformattedOuDate[1]+vformattedOuDate[0];
  for(var j=0 ; j< len ; j++){
    var depotName = aMailInputOR[j].Depot;
    depotName = depotName.replace(/\'/g, "|");
    depotName =  depotName.replace(/&/g, "@");
    var valMail = sap.ui.getCore().byId("idTxtEmail").getValue();   // MAC15122014+
    var valMail2 = sap.ui.getCore().byId("idTxtEmail2").getValue();	// MAC11122017_1 +
    var valMail3 = sap.ui.getCore().byId("idTxtEmail3").getValue();	// MAC11122017_1 +
     Row[count] = aMailInputOR[j].Contract.replace(/^0+/, '') + "$$" + aMailInputOR[j].UnitType + "$" + aMailInputOR[j].Location + "$" +
          aMailInputOR[j].Depot + "$" + iDate + "$" + aMailInputOR[j].Serialnr + "$" + 
          aMailInputOR[j].RaNo + "$" + 
          valMail + "%23" + valMail2 + "%23" + valMail3;     // MAC11122017_1 +
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
        busyDialog.close();
        sap.ui.commons.MessageBox.alert(data.results[0].MsgReceivers);
      },
      function(err){
        busyDialog.close();
        errorfromServer(err);
      }); //odata request

}

function capFirstLetter(cityVal){
  var capCityVal = cityVal.charAt(0).toUpperCase() + cityVal.slice(1);
  document.getElementById("idComboCityOR").value = capCityVal;
}
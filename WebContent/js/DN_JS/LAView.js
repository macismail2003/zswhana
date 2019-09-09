jQuery.sap.require("sap.ui.model.json.JSONModel");
var AppData = [];
var LesseAppData = [];
var jsonLesseApp = [];
var DNJS_ApproveData = [];
var lesseAController;
var olesseA;
var LAfromScreen;
sap.ui.model.json.JSONModel.extend("LAView", {
		
		createLesseeApprovalForm: function(oController){
			
			jQuery.sap.require("js.DN_JS.DNJSAutoMulti");
			var oDNJSAuto = new DNJSAutoMulti();
			
			olesseA = this;
			lesseAController = oController;
			var confirmMessage = "This will reset all the search inputs so far. Do you want to continue?";
			//var labSearchBy =  new sap.m.Text({text:"Search By"}).addStyleClass("font11Bold");
			var labHardCode =  new sap.ui.commons.Label({text:"Customer ID:",
				wrapping: true,
				required:true,
				layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: false})}).addStyleClass("marginTop15");
			
			/*var labHardCode2 =  new sap.ui.commons.Label({text:"Temporary Field Added till Security is implemented",
				wrapping: true,
				layoutData: new sap.ui.layout.GridData({span: "L2 M2 S4"})}).addStyleClass("font10");*/
			
			var HrdFlex = new sap.m.FlexBox({ items: [  labHardCode  ],  direction: "Column"	,
				layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: false})});
			
			var labLESSEERef1 = new sap.ui.commons.Label({text: "DN / JS Reference:",
				wrapping: true});
			var labLESSEERef2 = new sap.ui.commons.Label({text: "1 per line, 25 max",
				wrapping: true}).addStyleClass("font10");
			var labLESSEERef3 = new sap.ui.commons.Label({text: "Use Enter to navigate to the next line",
				wrapping: true}).addStyleClass("font10");
			/*var labLESSEERef4 = new sap.ui.commons.Label({text: "Use Shift + TAB to navigate to the previous line)",
				wrapping: true}).addStyleClass("font10");*/
			var refFlex = new sap.m.FlexBox({ items: [  labLESSEERef1, labLESSEERef2,labLESSEERef3  ],  direction: "Column",
				layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: false})}).addStyleClass("marginTop15");
			
			var labCity = new sap.ui.commons.Label({text: "City:",
				wrapping: true,
				layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: false})}).addStyleClass("marginTop15");
			
			var labPeriod = new sap.ui.commons.Label({text: "Off-Hire Period:",
				wrapping: true,
				layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: false})}).addStyleClass("marginTop15");
			
			var labUnitNo1 = new sap.ui.commons.Label({text: "Unit Number:",
				wrapping: true
				});
			var WarningText = "To view the status: For individual containers, please enter the 4 letter prefix and 7 digit number for each container. (Eg. SEGU3000511). For multiple containers (Max 25), press the Enter key after each one, or copy and paste the list to the entry field";
			
			var labUnitNo2 = new sap.ui.commons.Label({text: WarningText,
				wrapping: true
				}).addStyleClass("font10");
			
			/*var labUnitNo3 = new sap.ui.commons.Label({text: "Use Enter to navigate to the next line",
				wrapping: true}).addStyleClass("font10");*/
			/*var labReleaseRef4 = new sap.ui.commons.Label({text: "Use Shift + TAB to navigate to the previous line)",
				wrapping: true}).addStyleClass("font10");*/
			var unitFlex = new sap.m.FlexBox({ items: [  labUnitNo1, labUnitNo2/*,labUnitNo3*/  ],  
				direction: "Column"	,
				layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: false})}).addStyleClass("marginTop15");
			
			var labStatus = new sap.ui.commons.Label({text: "Status:",
				wrapping: true,
				visible : false,
				layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: false})}).addStyleClass("marginTop15");
			var labUnitType = new sap.ui.commons.Label({text: "Unit Type:",
				wrapping: true,
				layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: false})}).addStyleClass("marginTop15");
			
			var oUser =  new loggedInU();
			var uId = "";
			var utype = oUser.getLoggedInUserType();
			var isEnabled = false;
			if(($.inArray(utype, ["CUSTOMER"])) == -1){
				isEnabled = true;
			}
			else{
				isEnabled = false;
				uId = oUser.getLoggedInUserID();
			}
				
			
			/*var txtHardCode = new sap.ui.commons.TextField("lesseApHardCode",{
				layoutData: new sap.ui.layout.GridData({span: "L4 M9 S12"}),
				placeholder: "Customer ID",
				enabled:isEnabled,
				value:uId,
				liveChange:function(oControlEvent){
					txtHardCode.setPlaceholder("Customer ID");
					txtHardCode.setValueState(sap.ui.core.ValueState.None);
				},
			}).addStyleClass("FormInputStyle");*/
			
			var oAutoCmpltlesseApHardCode = new sap.m.ComboBox("idAutoCmpltlesseApHardCode", {
				layoutData: new sap.ui.layout.GridData({span: "L4 M9 S12"}),
				width:"100%",
				//enabled: seacoUser,
				placeholder:"Select Customer",
				 change: function(evnt){
						if(this.getValue() != '')
						{
							this.setValueState(sap.ui.core.ValueState.None);
							this.setPlaceholder("Select Customer");
						}
			          }
			}).addStyleClass("FormInputStyle");
			
			olesseA.getOnlineCutomerList();
			
			var tblViewLESSEERef = new sap.ui.commons.TextArea('lesseApRefTbl',{
		         layoutData: new sap.ui.layout.GridData({span: "L4 M9 S12"}),
		                     rows:25,
		                     cols:30,
		                     height:"145px",
		                     placeholder:"DN/JS Reference",
		    }).addStyleClass("marginTop15");
			tblViewLESSEERef.setMaxLength(248);
			
			var tblViewLESSEEUnit = new sap.ui.commons.TextArea('lesseApUnitTbl',{
		         layoutData: new sap.ui.layout.GridData({span: "L4 M9 S12"}),
		                     rows:25,
		                     cols:30,
		                     height:"145px",
		                     placeholder:"Unit Number",
		    }).addStyleClass("marginTop15");
			tblViewLESSEEUnit.setMaxLength(323);
			
			var rgPeriod;
			var browser = sap.ui.Device.browser.chrome;
			if(browser){
				 rgPeriod = new sap.ui.commons.RadioButtonGroup("lesseApPeriod",{
			        columns : 4,
			        layoutData: new sap.ui.layout.GridData({span: "L10 M10 S12"}),
			        selectedIndex : 0,
			        select : function() {
			        	//alert('RadioButton ' + rgPeriod.getSelectedItem().getText());
			        }
			    }).addStyleClass("marginTop15");
			}
			else{
				 rgPeriod = new sap.ui.commons.RadioButtonGroup("lesseApPeriod",{
			        columns : 4,
			        layoutData: new sap.ui.layout.GridData({span: "L6 M6 S12"}),
			        selectedIndex : 0,
			        select : function() {
			        	//alert('RadioButton ' + rgPeriod.getSelectedItem().getText());
			        }
			    }).addStyleClass("marginTop15");
			}
			
			var oItem = new sap.ui.core.Item({
		        text : "Any", key : "ANY"});
			rgPeriod.addItem(oItem);
			oItem = new sap.ui.core.Item({
			        text : "Today", key : "TODAY"});
			rgPeriod.addItem(oItem);
			oItem = new sap.ui.core.Item({
			        text : "Yesterday", key : "YESTERDAY"});
			rgPeriod.addItem(oItem);
			oItem = new sap.ui.core.Item({
			        text : "This Week", key : "THIS WEEK"});
			rgPeriod.addItem(oItem);
			oItem = new sap.ui.core.Item({
			        text : "Last Week", key : "LAST WEEK"});
			rgPeriod.addItem(oItem);
			oItem = new sap.ui.core.Item({
			        text : "This Month", key : "THIS MONTH"});
			rgPeriod.addItem(oItem);
			oItem = new sap.ui.core.Item({
			        text : "Last Month", key : "LAST MONTH"});
			rgPeriod.addItem(oItem);
			oItem = new sap.ui.core.Item({
		        	text : "Last 3 Months", key : "LAST 3 MONTHS"});
			rgPeriod.addItem(oItem);
			
			var rgStatus;
			if(browser){
				 rgStatus = new sap.ui.commons.RadioButtonGroup("lesseApStatus",{
			        columns : 2,
			        layoutData: new sap.ui.layout.GridData({span: "L10 M10 S12"}),
			        selectedIndex : 0,
			        select : function() {
			        	//alert('RadioButton ' + rgStatus.getSelectedItem().getText());
			        }
			    }).addStyleClass("marginTop15");
			}
			else{
				 rgStatus = new sap.ui.commons.RadioButtonGroup("lesseApStatus",{
			        columns : 2,
			        layoutData: new sap.ui.layout.GridData({span: "L6 M6 S12"}),
			        selectedIndex : 0,
			        select : function() {
			        	//alert('RadioButton ' + rgStatus.getSelectedItem().getText());
			        }
			    }).addStyleClass("marginTop15");
			}
			rgStatus.setVisible(false);
			
			var oItem2 = new sap.ui.core.Item({
			        text : "All", key : "ALL"});
			rgStatus.addItem(oItem2);
			oItem2 = new sap.ui.core.Item({
			        text : "Send to Customer", key : "SEND TO CUSTOMER"});
			rgStatus.addItem(oItem2);
			oItem2 = new sap.ui.core.Item({
			        text : "Available Billing", key : "AVAILABLE BILLING"});
			rgStatus.addItem(oItem2);
			oItem2 = new sap.ui.core.Item({
			        text : "Supersede by Joint Survey", key : "SUPERSEDED BY JOINT SURVEY"});
			rgStatus.addItem(oItem2);
			
			/*var oAutoCity = new sap.ui.core.HTML("CityHTMLViewLESSEE",{layoutData: new sap.ui.layout.GridData({span: "L4 M9 S12"})});
	        var htmlContentCity = '<input id="lesseApCity" placeholder=" City" class="FormInputStyle marginTop15" style="width:100%">';
	        oAutoCity.setContent(htmlContentCity);*/
			var oAutoCity = new sap.m.MultiComboBox("CityHTMLViewLESSEE", {
				layoutData: new sap.ui.layout.GridData({span: "L4 M9 S12"}),
				width:"100%",
				//enabled: seacoUser,
				placeholder:"Select City",
				 change: function(evnt){
						if(this.getValue() != '')
						{
							this.setValueState(sap.ui.core.ValueState.None);
							this.setPlaceholder("Select City");
						}
			          }
			}).addStyleClass("FormInputStyle");
			
			oDNJSAuto.bindCityDropDown();

			
			/*var oAutoUnitType = new sap.ui.core.HTML("UnitTypeHTMLViewLESSEE",{layoutData: new sap.ui.layout.GridData({span: "L4 M9 S12"})});
	        var htmlContentUnitType = '<input id="lesseApAutoUnitType" placeholder=" Unit Type" class="FormInputStyle marginTop15" style="width:100%">';
	        oAutoUnitType.setContent(htmlContentUnitType);*/
	        var oAutoUnitType = new sap.m.MultiComboBox("UnitTypeHTMLViewLESSEE", {
				layoutData: new sap.ui.layout.GridData({span: "L4 M9 S12"}),
				width:"100%",
				//enabled: seacoUser,
				placeholder:"Select Unit Type",
				 change: function(evnt){
						if(this.getValue() != '')
						{
							this.setValueState(sap.ui.core.ValueState.None);
							this.setPlaceholder("Select Unit Type");
						}
			          }
			}).addStyleClass("FormInputStyle");
	        oDNJSAuto.bindAutoUnit();

	        
			var btnSubmit = new sap.m.Button({
		          text : "Submit",
		          styled:false,
		          width:"80px",
		          layoutData: new sap.ui.layout.GridData({span: "L1 M2 S4"}),
		          press:function(){
		        	  //alert("Submit CLicked");
	 	        	  if(olesseA.validateHardCode()){
		 	        		 busyDialog.open();
			 	        	 olesseA.bindLesseeApproval(); 
		 	          }
		        	  
		          }
			}).addStyleClass("submitBtn marginTop15");
		
			
			var btnReset = new sap.m.Button({
		          text : "Reset",
		          styled:false,
		          width:"80px",
		          layoutData: new sap.ui.layout.GridData({span: "L1 M2 S4"}),
		          press:function(){
		        	  jQuery.sap.require("sap.ui.commons.MessageBox");
		        	  sap.ui.commons.MessageBox.show(confirmMessage,
	    			  sap.ui.commons.MessageBox.Icon.WARNING,
	    			  "Warning",
	    			  [sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO], 
	    			  olesseA.fnCallbackMessageBox,
	    			  sap.ui.commons.MessageBox.Action.YES);
		          }
			}).addStyleClass("submitBtn marginTop15");
			
			var lblSpace = new sap.ui.commons.Label( {text: " ",width : '8px'});
	        
	        var oFlexboxButtons = new sap.m.FlexBox({
	          items: [
	            btnSubmit,lblSpace,
	            btnReset
	          ],
	          direction: "Row",
	        }).addStyleClass("margin10");

	        var labStar = new sap.ui.commons.Label({text: "* "}).addStyleClass("MandatoryStar");
		    var lblSpaceLegend = new sap.ui.commons.Label( {text: " ",width : '5px'});
		    var labRequired = new sap.ui.commons.Label({text: " Mandatory Field",wrapping: true});
			var oFlexboxReq = new sap.m.FlexBox({
					 // layoutData: new sap.ui.layout.GridData({span: "L7 M6 S4"}),
		              items: [labStar,lblSpaceLegend,labRequired],
		              direction: "Row"
			});
			
			var oDjnsLineFormGLayout = new sap.ui.layout.form.ResponsiveGridLayout({
			      emptySpanL: 0,
		          emptySpanM: 0,
		          emptySpanS: 0,  
				  labelSpanL: 1,
		          labelSpanM: 1,
		          labelSpanS: 1,
		          columnsL: 1,
		          columnsM: 1,
		          columnsS: 1,
		          breakpointL: 765,
				  breakpointM: 320
			});
			
			/*var vHDivider = new sap.ui.commons.HorizontalDivider({width: "95%", type: "Area", height: "Medium"});*/
			
			var oDjnsLineFormGLayout = new sap.ui.layout.form.ResponsiveGridLayout({});
	        var oDjnsLesseForm1 = new sap.ui.layout.form.Form({
	 			layout: oDjnsLineFormGLayout,
	 			formContainers: [
	 			                 
	 				new sap.ui.layout.form.FormContainer("DJ_NSLesseeFormC4",{
	 					//title: "Lessee Approval",
	 					formElements: [
	 										
							new sap.ui.layout.form.FormElement({
									fields: [HrdFlex,oAutoCmpltlesseApHardCode],
									layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
								}),
                                new sap.ui.layout.form.FormElement({
                                    //label: "Release Reference",
                                    fields: [refFlex,tblViewLESSEERef ],
                                    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                                }),
                                new sap.ui.layout.form.FormElement({
                                    //label: "Unit type",
                                    fields: [labCity,oAutoCity ],
                                    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                                }),
                                new sap.ui.layout.form.FormElement({
                                    //label: "Period",
                                    fields: [labPeriod,rgPeriod ],
                                    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                                }),
                                new sap.ui.layout.form.FormElement({
                                    //label: "Release Reference",
                                    fields: [unitFlex,tblViewLESSEEUnit ],
                                    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                                }),
                                new sap.ui.layout.form.FormElement({
                                    //label: "Status",
                                    fields: [labStatus,rgStatus ],
                                    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                                }),
                                new sap.ui.layout.form.FormElement({
                                    //label: "Unit type",
                                    fields: [labUnitType,oAutoUnitType ],
                                    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                                }),
                                new sap.ui.layout.form.FormElement({
                                    fields: [oFlexboxButtons],
                                    //layoutData: new sap.ui.commons.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                                }),
                                new sap.ui.layout.form.FormElement({
                                    fields: [oFlexboxReq],
                                    layoutData: new sap.ui.commons.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                                }),
							new sap.ui.layout.form.FormElement("LesseApForm",{
								    fields: [],
								    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
							})						
	 						]
	 				})
	 				
	 				]
	 		});
	        
	        this.getOnlineCutomerList();
	        /*var oUser =  new loggedInU();
			var utype = oUser.getLoggedInUserType();
			
			if(utype == "CUSTOMER"){
				busyDialog.open();
				olesseA.bindLesseeApproval();
			}*/
				
			
	       return oDjnsLesseForm1;  
		},
		validateHardCode:function(){
			var isValid = true;
			if(sap.ui.getCore().byId("idAutoCmpltlesseApHardCode").getValue() == ""){
				sap.ui.getCore().byId("idAutoCmpltlesseApHardCode").setValueState(sap.ui.core.ValueState.Error);
				sap.ui.getCore().byId("idAutoCmpltlesseApHardCode").setPlaceholder("Required");
				isValid = false;
			}else{
				sap.ui.getCore().byId("idAutoCmpltlesseApHardCode").setValueState(sap.ui.core.ValueState.None);
				sap.ui.getCore().byId("idAutoCmpltlesseApHardCode").setPlaceholder("Select Customer");
				isValid = true;
			}
		
			return isValid;
		},
		setLesseApForm:function(){
			var buttonAccessRoleWise = new loggedInU().filterLoggedInUserData("BUTTON");
	        var isVisible = false;
	        var showCheckBox = false;
	        if(buttonAccessRoleWise.length>0){
	        	if(buttonAccessRoleWise[0].ScrView.trim() == "approve_estimate"){
	        		showCheckBox = true;
	        		isVisible = true;
	        	}
	        	else{
	        		showCheckBox = false;
	        		isVisible = false;
	        	}
	        		
	        		
	        }
	        
			var btnExpPdf = new sap.m.Button({
	            text : "Export To PDF",
	            type:sap.m.ButtonType.Unstyled,
	            //icon: sap.ui.core.IconPool.getIconURI("pdf-attachment"),
	            icon: sap.ui.core.IconPool.getIconURI("pdf-attachment"),
	            press:function(){
	                 // alert("Export to PDF CLicked");
	                  
	                  var colWidthArr= [0.6, 0.7, 1, 0.6, 1.5, 1.1, 0.8, 0.7, 0.7, 1, 0.6];
	                  var arrColmnName =['DN/JS','Date','Unit Number','Unit Type','Description','Off-Hire Location','Off-Hire Date',"Lease", "Amount","Tax","Curency"]; //COLUMN NAME
	                  olesseA.exportToPdf(jsonLesseApp,"Lessee Approval",colWidthArr,arrColmnName);
	            }
	         }).addStyleClass("submitBtn");
	  
	         
	         var btnExport = new sap.m.Button({
	            text : "Export To Excel",
	            type:sap.m.ButtonType.Unstyled,
	            //icon: sap.ui.core.IconPool.getIconURI("excel-attachment"),
	            icon: sap.ui.core.IconPool.getIconURI("excel-attachment"),
	            press:function(){
	                  //alert("Export to Excel");
	                  objUtil.makeHTMLTable(jsonLesseApp, "Lessee Approval","export");
	            	
	            	//var objUtil = new utility();
	            	//var arrDiplHdrExprtlessAprvl = ['DN/JS','Date','Unit Number','Unit Type','Description','Off-Hire Location', 'Off-Hire Date','Lease','Amount','Tax','Currency'];
	            	//var arrDiplFieldExprtlessAprvl = ['DN/JS','Date','Unit Number','Unit Type','Description','Off-Hire Location','Off-Hire Date','Lease','Amount','Tax','Currency'];
	            	  
					//objUtil.ExportUtility(jsonLesseApp,arrDiplHdrExprtlessAprvl,arrDiplFieldExprtlessAprvl, "Lessee Approval","export");
	            }
	         }).addStyleClass("submitBtn");	// submitBtn
	         
	         var oUtil = new utility();
	         
	         var oLesseeTable = new sap.ui.table.Table("LesseeAppTbl",{
	             //title: "Results for Inventory Overview 29-10-2013, 23:11",
	             visibleRowCount: 5,
	             firstVisibleRow: 1,
	             columnHeaderHeight: 45,
	             fixedColumnCount: 1,
	             selectionMode: sap.ui.table.SelectionMode.None,
	             //navigationMode: sap.ui.table.NavigationMode.Paginator,
	          }).addStyleClass("tblBorder marginTop10");
	     	
	         
	         if(showCheckBox){
	        	 oLesseeTable.setFixedColumnCount(2);
	        	 
	        	 oLesseeTable.addColumn(new sap.ui.table.Column({
	         		label: new sap.ui.commons.Label({text: " "}),
	         		template: new sap.ui.commons.CheckBox().bindProperty("checked", "isChecked"),
	         		width: "35px",
	         		resizable:false,
	         		//hAlign: "Center"
	 	        })); 
	         }
	         
	         
	     	oLesseeTable.addColumn(new sap.ui.table.Column({
	             label: new sap.ui.commons.Label({text: "DN/JS"}).addStyleClass("wraptextcol"),
	             template: new sap.ui.commons.Link({
	 				press : function(oEvent) {
	 					//alert(" DNJS No : "+ this.getText() + " Unit No : "+ this.getHelpId());
	 					selectedLADNJSNo = this.getText();
	 					selectedLAUnitNo = this.getHelpId();
	 					
	 					var oprevTable = sap.ui.getCore().byId("LesseeAppTbl");
	 					oprevTable._oHSb.setScrollPosition(0);
		            	
	 					olesseA.gotoLesseePrimaryDetails();
	 				}
	 			}).bindProperty("text", "DnJsNo").bindProperty("helpId", "UnitNumber"),
	             sortProperty: "DnJsNo",
	             filterProperty: "DnJsNo",
	             width: "80px",
	        	resizable:false,
	     	}));
	     	oLesseeTable.addColumn(new sap.ui.table.Column({
	             label: new sap.ui.commons.Label({text: "Date"}).addStyleClass("wraptextcol"),
	             template: new sap.ui.commons.TextView().bindProperty("text", "DnJsDate"),
	             sortProperty: "DnJsDateActual",
	             filterProperty: "DnJsDate",
	             width: "100px",
		         resizable:false,
	     	}));
	     	oLesseeTable.addColumn(new sap.ui.table.Column({
	             label: new sap.ui.commons.Label({text: "Unit Number"}).addStyleClass("wraptextcol"),
	             template: new sap.ui.commons.TextView().bindProperty("text", "UnitNumber"),
	             sortProperty: "UnitNumber",
	             filterProperty: "UnitNumber",
	             width: "130px",
		         resizable:false,
	     	}));
	     	oLesseeTable.addColumn(new sap.ui.table.Column({
	             label: new sap.ui.commons.Label({text: "Unit Type"}).addStyleClass("wraptextcol"),
	             template: new sap.ui.commons.TextView().bindProperty("text", "UnitType"),
	             sortProperty: "UnitType",
	             filterProperty: "UnitType",
	             width: "90px",
		         resizable:false,
	     	}));
	     	
	     	oLesseeTable.addColumn(new sap.ui.table.Column({
	             label: new sap.ui.commons.Label({text: "Description"}).addStyleClass("wraptextcol"),
	             template: new sap.ui.commons.TextView().bindProperty("text", "UnitDesc"),
	             sortProperty: "UnitDesc",
	             filterProperty: "UnitDesc",
	             width: "200px",
		         resizable:false,
	     	}));
	     	
	     	oLesseeTable.addColumn(new sap.ui.table.Column({
	             label: new sap.ui.commons.TextView({text: "Off-Hire Location"}).addStyleClass("wraptextcol"), //tblHeaderCustomTV
	             template: new sap.ui.commons.TextView().bindProperty("text", "OffHireLoc"),
	             sortProperty: "OffHireLoc",
	             filterProperty: "OffHireLoc",
	             width: "100px",
		         resizable:false,
	     	}));
	     	
	     	oLesseeTable.addColumn(new sap.ui.table.Column({
	             label: new sap.ui.commons.Label({text: "Off-Hire Date"}).addStyleClass("wraptextcol"),
	             template: new sap.ui.commons.TextView().bindProperty("text", "OffHireDt"),
	             sortProperty: "OffHireDtActual",
	             filterProperty: "OffHireDt",
	             width: "100px",
		         resizable:false,
	     	}));
	     	oLesseeTable.addColumn(new sap.ui.table.Column({
	             label: new sap.ui.commons.Label({text: "Lease"}).addStyleClass("wraptextcol"),
	             template: new sap.ui.commons.TextView().bindProperty("text", "Lease"),
	             sortProperty: "Lease",
	             filterProperty: "Lease",
	             width: "80px",
		         resizable:false,
	     	}));
	     	var oAmountCol = new sap.ui.table.Column({
	             label: new sap.ui.commons.Label({text: "Amount"}).addStyleClass("wraptextcol"),
	             template: new sap.ui.commons.TextView().bindProperty("text", "Amount"),
	             sortProperty: "Amount",
	             filterProperty: "Amount",
	             width: "80px",
		         resizable:false,
	     	});
	     	
	     	oLesseeTable.addColumn(oAmountCol);
			oUtil.addColumnSorterAndFilter(oAmountCol, oUtil.compareUptoCount);
			
	     	var oTaxCol = new sap.ui.table.Column({
	             label: new sap.ui.commons.Label({text: "Tax"}).addStyleClass("wraptextcol"),
	             template: new sap.ui.commons.TextView().bindProperty("text", "Tax"),
	             sortProperty: "Tax",
	             filterProperty: "Tax",
	             width: "80px",
		         resizable:false,
	     	});
			oLesseeTable.addColumn(oTaxCol);
			oUtil.addColumnSorterAndFilter(oTaxCol, oUtil.compareUptoCount);
			
	     	oLesseeTable.addColumn(new sap.ui.table.Column({
	             label: new sap.ui.commons.Label({text: "Currency"}).addStyleClass("wraptextcol"),
	             template: new sap.ui.commons.TextView().bindProperty("text", "Currency"),
	             sortProperty: "Currency",
	             filterProperty: "Currency",
	             width: "90px",
		         resizable:false,
	     	}));
	     	
	         var olesseAppTitle = new sap.m.FlexBox({
				  items: [
				    new sap.m.Text({text:"Lessee Approval"}).addStyleClass("font15Bold marginTop10")
				  ],
				  direction: "Row",
				  width:"60%"
			});
	        
	         var lblSpaceLegend = new sap.ui.commons.Label( {text: " ",width : '5px'});
	         
	        var olesseButton = new sap.m.FlexBox({
				  items: [
					btnExpPdf,lblSpaceLegend,
					 btnExport
				  ],
				  direction: "RowReverse",
				  width:"40%"
			});
			
	        var olesseToolbar = new sap.m.FlexBox({
				  items: [
				    olesseAppTitle,
				    olesseButton
				  ],
				  width:"100%",
				  direction: "Row"
			});
	        
	        var obtnVAllLesseAprvl = new sap.m.Button("idbtnVAllLesseAprvl",{
	            text : "View All",
	            type:sap.m.ButtonType.Unstyled,
	            visible:false,
	            press:function(){
							this.setVisible(false);
							var LesseeAppTbl = sap.ui.getCore().byId("LesseeAppTbl");
							
							if(jsonLesseApp.length < 100){
								LesseeAppTbl.setVisibleRowCount(jsonLesseApp.length);
								LesseeAppTbl.setNavigationMode(sap.ui.table.NavigationMode.None);
						   }else{
							   LesseeAppTbl.setVisibleRowCount(100);
							   LesseeAppTbl.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
						   }
	                  }
	         }).addStyleClass("submitBtn marginTop10");
	        
	     	var btnAprEst = new sap.m.Button({
	 	          text : "Approve Estimate",
	 	          type:sap.m.ButtonType.Unstyled,
	 	          layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4"}),
	 	          visible:isVisible,
	 	          press:function(){ 
	 	        	 olesseA.gotoApproveEstimate();
	 	          }
	 		}).addStyleClass("submitBtn marginTop10"); 
	     	
	     	var olesseFlex = new sap.m.FlexBox("LesseApFlex",{
				  items: [
				    olesseToolbar,
				    oLesseeTable,
				    obtnVAllLesseAprvl,
				    btnAprEst
				  ],
				  //width:"80%",
				  direction: "Column"
			}).addStyleClass("marginTop10");
			return olesseFlex;
		},
		
		exportToPdf:function(jsonPdf,title,colWidthArr,arrColmnName){
            var verticalOffset = 1.0; 
            createParaPDF(jsonPdf,title,colWidthArr,arrColmnName,verticalOffset);
		},
		bindLesseeApproval:function(){
			var custNo = sap.ui.getCore().byId("idAutoCmpltlesseApHardCode").getSelectedKey();
			
	  		var period = sap.ui.getCore().byId("lesseApPeriod").getSelectedItem().getKey();
	  		var status = sap.ui.getCore().byId("lesseApStatus").getSelectedItem().getKey();
	  		var dnjsRef = "";
	  		var unitType = "";
	  		//var city = $("#dnjsCity").val();
	  		
	  		var city = sap.ui.getCore().byId("CityHTMLViewLESSEE").getSelectedKeys();
	  		var selUnitType = sap.ui.getCore().byId("UnitTypeHTMLViewLESSEE").getSelectedKeys();
	  		var dnjsUnit1 = "";
	      	var dnjsUnit2 = "";

	  		//var selUnitType = $("#dnjsAutoUnitType").val();
	  		
	  		
	  		/*if(selUnitType.length>0){
	  			if( selUnitType.indexOf(',') != -1){
	  				var str = selUnitType.split(",");
	  				//alert("Sel unit Type : "+selUnitType+"str length : "+ str.length);
	  				for(var i=0;i<str.length;i++)
	  					unitType = unitType + str[i].trim() + ",";
	  			}else{
	  				unitType = selUnitType.trim();
	  			} 
	  		}*/
	      	
	      	if(selUnitType != ""){
				for(var i=0;i<selUnitType.length;i++)
					unitType = unitType + selUnitType[i].trim() + ",";
	      	}else{
	      		unitType = "";
	      	}
	      	
	  		
	  		var dnjsRefValue = (sap.ui.getCore().byId("lesseApRefTbl").getValue()).trim();
	  		var refNos = (sap.ui.getCore().byId("lesseApRefTbl").getValue()).split(/\n/g);
	  		
	  		//alert("REf Nos : "+dnjsRef.length);
	  		if(dnjsRefValue.length > 0){
	  			if(refNos.length<25){
	  				for(var j=0;j<refNos.length;j++){
	  					dnjsRef = dnjsRef + refNos[j]+",";
	  	    		}
	  			}else{
	  				for(var k=0;k<25;k++){
	  					dnjsRef = dnjsRef + refNos[k]+",";
	  	    		}
	  			}
	  		}
	  		
	  		// Unit Nos
	  		
	  		var unitNosValue = (sap.ui.getCore().byId("lesseApUnitTbl").getValue()).trim();
	  		var unitNos = sap.ui.getCore().byId("lesseApUnitTbl").getValue().split(/\n/g);
	  		
	  		if(unitNosValue.length > 0){
	      		//alert(" trim : "+refNosValue.length);
	      		
	      		if(unitNos.length>13){
	          		for(var i=0;i<13;i++){
	          			dnjsUnit1 = dnjsUnit1 + unitNos[i]+",";
	              	}
	          		if(unitNos.length<25){
	          			for(var j=13;j<unitNos.length;j++){
	          				dnjsUnit2 = dnjsUnit2 + unitNos[j]+",";
	              		}
	          		}else{
	          			for(var k=13;k<25;k++){
	          				dnjsUnit2 = dnjsUnit2 + unitNos[k]+",";
	              		}
	          		}
	          		
	          	}else{
	          		for(var k=0;k<unitNos.length;k++){
	          			dnjsUnit1 = dnjsUnit1 + unitNos[k]+",";
	              	}
	          	}
	      	}
	  		
			var filter = "/Lessee_Approval?$filter=Incustomer eq '"+custNo+
      				 "' and Indnjs eq '"+dnjsRef+
      				 "' and Incity eq '"+city+
      				 "' and Inperiod eq '"+period+
      				 "' and Inequi eq '"+dnjsUnit1+
      				 "' and Inequi1 eq '"+dnjsUnit2+
      				 "' and Status eq '"+status+
      				 "' and InunitType eq '"+unitType+"'";

			//alert("Str : "+serviceUrl+filter);
	      	oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
	    		OData.request({ 
	    		      requestUri: serviceUrl + filter,
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
	    		    	
	    		    	//alert("data.results.length" + data.results.length);
	    		    	//alert("data" + window.JSON.stringify(data.results));
	    		    	busyDialog.close();
	    		    	if(data.results.length == 0){
	    		    		busyDialog.close();
	    		    		sap.ui.commons.MessageBox.alert("No results found for your search criteria or for your profile.");
	    		    		if(sap.ui.getCore().byId("LesseApFlex")){
	  		    			sap.ui.getCore().byId("LesseApFlex").destroy();
	  		    		}
	    		    	}else  	if(data.results.length>0){
	    		    		LesseAppData = [];
	    		    		AppData = data.results;
	    		    		//alert("length of results data : "+ LesseAppData.length);
	    		    		
	    		    		jsonLesseApp = [];
	    		    		
		  		    		if(sap.ui.getCore().byId("LesseApFlex")){
		  		    			sap.ui.getCore().byId("LesseApFlex").destroy();
		  		    		}
		    		    	
		  		    		for(var i=0; i<AppData.length;i++){
		  		    			
		  		    			AppData[i].Lease = AppData[i].Lease.replace(/^0+/, '');
		  		    			AppData[i].DnJsNo = AppData[i].DnJsNo.replace(/^0+/, '');
		  		    			AppData[i].Tax = numberWithCommas(AppData[i].Tax); 
		  		    			//AppData[i].Amount = numberWithCommas(AppData[i].Amount); 
	
		  	    				// Off Hire Date
		  		    			var vDocDateResult = AppData[i].OffHireDt.split("(");
	    	                    var vDocDate = vDocDateResult[1].split(")");
	    	                    var vActualDate = new Date(Number(vDocDate[0]));
	    	                    var vformattedDocDate = dateFormat(new Date(Number(vDocDate[0])), 'dd-mm-yyyy',"UTC");
	    	                    //this is to check if the date is default 999 something show blank
	    	                    if (vformattedDocDate.substring(6) === "9999"){
	    	                    	AppData[i].OffHireDt =  "-";
	    	                    }
	    	                    else{
	    	                    	AppData[i].OffHireDt = vformattedDocDate;
	    	                    }
	    	                    AppData[i]["OffHireDtActual"] = vActualDate;
		    	                  
		    	                // DNJS Date
		    	                var vDocDateResult = AppData[i].DnJsDate.split("(");
		  	                    var vDocDate = vDocDateResult[1].split(")");
		  	                    var vActualDate = new Date(Number(vDocDate[0]));
		  	                    var vformattedDocDate = dateFormat(new Date(Number(vDocDate[0])), 'dd-mm-yyyy',"UTC");
		  	                    //this is to check if the date is default 999 something show blank
		  	                    if (vformattedDocDate.substring(6) === "9999"){
		  	                    	AppData[i].DnJsDate =  "-";
		  	                    }
		  	                    else{
		  	                    	AppData[i].DnJsDate = vformattedDocDate;
		  	                    }
		  	                    AppData[i]["DnJsDateActual"] = vActualDate;
		  	                    
		  	                 // make Custom JSON for Table - Excel/Print
		  	                  jsonLesseApp.push({
		  	                		  'DN/JS':AppData[i].DnJsNo,
		  	                		  'Date':AppData[i].DnJsDate,
		  	                		  'Unit Number':AppData[i].UnitNumber,
		  	                		  'Unit Type':AppData[i].UnitType,
		  	                		  'Description':AppData[i].UnitDesc,
		  	                		  'Off-Hire Location':AppData[i].OffHireLoc,
		  	                		  'Off-Hire Date':AppData[i].OffHireDt,
		  	                		  'Lease':AppData[i].Lease,
		  	                		  'Amount':AppData[i].Amount,
		  	                		  'Tax':AppData[i].Tax,
		  	                		  'Currency':AppData[i].Currency,
		  	  	                  });
		  	                  
		  	                //for(var i=0;i<AppData.length;i++){
		  		    			LesseAppData.push({
		  		    				  'isChecked': false,
		  	                		  'DnJsNo':AppData[i].DnJsNo,
		  	                		  'DnJsDate':AppData[i].DnJsDate,
		  	                		  'DnJsDateActual':AppData[i].DnJsDateActual,
		  	                		  'UnitNumber':AppData[i].UnitNumber,
		  	                		  'UnitType':AppData[i].UnitType,
		  	                		  'UnitDesc':AppData[i].UnitDesc,
		  	                		  'OffHireLoc':AppData[i].OffHireLoc,
		  	                		  'OffHireDt':AppData[i].OffHireDt,
		  	                		  'OffHireDtActual':AppData[i].OffHireDtActual,
		  	                		  'Lease':AppData[i].Lease,
		  	                		  'Amount':numberWithCommas(AppData[i].Amount),
		  	                		  'Tax':AppData[i].Tax,
		  	                		  'Currency':AppData[i].Currency,
		  	                		  'amt':AppData[i].Amount,
		  	  	                  });
		  		    		//}
		  	    		}
		  		    	
		  		    	var oResultFlex = olesseA.setLesseApForm(); 
	  		    		var oModelL = new sap.ui.model.json.JSONModel();
	  			     	oModelL.setData(LesseAppData);
	  			     	var oLesseeTable = sap.ui.getCore().byId("LesseeAppTbl");
	  			     	oLesseeTable.setModel(oModelL);
	  			     	oLesseeTable.bindRows("/"); 
	  			     	
	  			     	if(LesseAppData.length == 0){
	  			     		oLesseeTable.setVisibleRowCount(5);
	    					oLesseeTable.setNavigationMode(sap.ui.table.NavigationMode.None);
	    					sap.ui.getCore().byId("idbtnVAllLesseAprvl").setVisible(false);
	  			     	}else if((LesseAppData.length > 0) && (LesseAppData.length < 26)){
	    					oLesseeTable.setVisibleRowCount(LesseAppData.length);
	    					oLesseeTable.setNavigationMode(sap.ui.table.NavigationMode.None);
	    					sap.ui.getCore().byId("idbtnVAllLesseAprvl").setVisible(false);
	    				}else if(LesseAppData.length > 25){
	    					sap.ui.getCore().byId("idbtnVAllLesseAprvl").setVisible(true);
	    					oLesseeTable.setVisibleRowCount(25);
	    					oLesseeTable.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
	    				}
	  			     	
	  	  				var oLesseForm = sap.ui.getCore().byId("LesseApForm");
	  	  				oLesseForm.insertField(oResultFlex,0);
	    				
	  	  				busyDialog.close();
	    		    	}
	    		    	
	    		    	busyDialog.close();
	    		    },
	    		    function(err){
	    		    	errorfromServer(err);
	    		    });
		},
		
		gotoLesseePrimaryDetails:function(){
			var bus = sap.ui.getCore().getEventBus();
			bus.publish("nav", "to", {
					id : "LA_PrimaryDetail"
			});
			$('#idHdrContnt').html('Lessee Approval - Primary Details'); //CHANGE HEADER CONTENT
			
			var oLAPrimaryDetail = new LAPrimaryDetail();
			
			var screenflex = sap.ui.getCore().byId("oLAPrimaryScreenFlex");
			if(screenflex)
				screenflex.destroyItems();
			
			oLAPrimaryDetail.createLesseeAForm();
			oLAPrimaryDetail.bindLADetails();
			
		},
		
		gotoApproveEstimate:function(){
			DNJS_ApproveData = [];
			LAfromScreen = "Lessee Approval";
			var checkedRows = [];
			checkedRows = jQuery.grep(LesseAppData, function(element, index){
		            return element.isChecked == true;
	    	});
			var currentDate = dateFormat(new Date(),'dd-mm-yyyy').split("-");
			currentDate = currentDate[2]+currentDate[1]+currentDate[0];

			if(checkedRows.length > 25){
				sap.ui.commons.MessageBox.alert("Please select max 25 DN/JS for approval \n(by unchecking the checkbox against the required DN/JS) and retry.");
				return;
			}
			
			for(var i=0;i<checkedRows.length;i++){
				DNJS_ApproveData.push({
            		  'DnJsNo':checkedRows[i].DnJsNo,
            		  'UnitNumber':checkedRows[i].UnitNumber,
            		  'Amount':checkedRows[i].Amount,
            		  'Currency':checkedRows[i].Currency,
            		  'ApprovalReff':"",
            		  'ApprovalDate':new Date(),
            		  'ApprovalDateTXT':currentDate,
            		  'amt':checkedRows[i].amt
	                  });
			}
			
			var oprevTable = sap.ui.getCore().byId("LesseeAppTbl");
			oprevTable._oHSb.setScrollPosition(0);
				
			//alert("Checked Rows : "+ checkedRows.length+" Approve JSON :"+DNJS_ApproveData.length);
			if(DNJS_ApproveData.length>0){
				
				var bus = sap.ui.getCore().getEventBus();
				bus.publish("nav", "to", {
						id : "DNJS_Approve"
				});
				$('#idHdrContnt').html('Approve DN/JS'); //CHANGE HEADER CONTENT
				
				var dnjsAp = new LAMultiple();
				
				var screenflex = sap.ui.getCore().byId("oLAMultipleApproveScreenFlex");
				if(screenflex)
					screenflex.destroyItems();
				
				dnjsAp.createDNJSApprove();
				dnjsAp.bindDNJS_Approve();
				
			}else{
				var aler = "No DN/JS selected for approval. Please select atleast 1 DN/JS for approval \n(by checking the checkbox against the required DN/JS) and retry.";
				sap.ui.commons.MessageBox.alert(aler);
			}
			
		},
		
		//GET ONLINE CUSTOMER LIST   
		getOnlineCutomerList: function(){
		   try{
			   sap.ui.getCore().byId("idAutoCmpltlesseApHardCode").destroyItems();
			   busyDialog.open();
			   var objCurntLAView = new LAView();
			   var urlToCall ='';
			   //var roleTypeCDORetReport = objLoginUser.getLoggedInUserType();
				//var custidCDORetReport = objLoginUser.getLoggedInUserID();
				
				if(objLoginUser.getLoggedInUserType().toUpperCase() == "SEACO"){
					urlToCall = serviceUrl + "/F4_Customer_NameId_Appended";
				}else{
					urlToCall = serviceUrl + "/F4_Multiple_Cust?$filter=Bname eq '"+ objLoginUser.getLoggedInUserName().toUpperCase() +"' and Customer eq '' and Param1 eq ''";
				}
			   
			   var objUtil = new utility();
			   objUtil.doOnlineRequest(urlToCall,objCurntLAView.getOnlineCutomerListSuccess, objCurntLAView.getOnlineCutomerListError);
		   }catch(e){
			   busyDialog.close();
				sap.ui.commons.MessageBox.alert("Error on occured while processing request: " + e);
		   }
	   },
	       
	    //ON SUCCESS FOR CUSTOMER LIST
		getOnlineCutomerListSuccess: function(resultdata, response){
		   var oidAutoCmpltlesseApHardCode = sap.ui.getCore().byId("idAutoCmpltlesseApHardCode");
		   try{
			   //oidAutoCmpltlesseApHardCode.insertItem((new sap.ui.core.ListItem({text:"Select Customer", key:"0"})),0);
			   //oidAutoCmpltlesseApHardCode.setSelectedKey("0");
					if(resultdata != undefined){
						if(resultdata.results.length > 0){
							for(var j =0; j<resultdata.results.length;j++){
								oidAutoCmpltlesseApHardCode.addItem(new sap.ui.core.ListItem({text:resultdata.results[j].CustName, 
															key: resultdata.results[j].Partner, additionalText: resultdata.results[j].Partner}));
							}
						}
					}
					 busyDialog.close();
		   }catch(e){
			   busyDialog.close();
				sap.ui.commons.MessageBox.alert("Error on occured while processing request: " + e);
		   }
	   },
	    
		//ON ERROR FOR CUSTOMER LIST
	    getOnlineCutomerListError: function(e){
	    	busyDialog.close();
	    	var oidAutoCmpltlesseApHardCode = sap.ui.getCore().byId("idAutoCmpltlesseApHardCode");
	    	oidAutoCmpltlesseApHardCode.insertItem((new sap.ui.core.ListItem({text:"Select Customer", key:"0"})),0);
	    	oidAutoCmpltlesseApHardCode.setSelectedKey("0"); 
	    	errorfromServer(e);
	   },
	   
	  	fnCallbackMessageBox:function(sResult) {
			//alert("Reset");
			if(sResult == "YES"){
				//if(sap.ui.getCore().byId("idAutoCmpltdnjsHardCode").getEnabled())
				sap.ui.getCore().byId("idAutoCmpltlesseApHardCode").setValue("");
				sap.ui.getCore().byId("idAutoCmpltlesseApHardCode").setValueState(sap.ui.core.ValueState.None);
				sap.ui.getCore().byId("idAutoCmpltlesseApHardCode").setPlaceholder("Select Customer");
					
				sap.ui.getCore().byId("lesseApRefTbl").setValue("");
				sap.ui.getCore().byId("lesseApRefTbl").setValue("");
				// reset Period
				sap.ui.getCore().byId("lesseApPeriod").setSelectedIndex(0);
				// reset Status
				sap.ui.getCore().byId("lesseApStatus").setSelectedIndex(0);
				// reset Unit TYpe
				$("#UnitTypeHTMLViewLESSEE").val("");
				// reset Customer name
				//sap.ui.getCore().byId("repairCustName").setValue("");
				$("#CityHTMLViewLESSEE").val("");
				
				dnjsResultData = [];
				jsonDNJS = [];

				// Remove Results Flex Box
				if(sap.ui.getCore().byId("dnjsDetailsFlex"))
		    			sap.ui.getCore().byId("dnjsDetailsFlex").destroy();

			}
		},
		
		
});
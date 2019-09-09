/*
 * 
 
Information: This file is created by Seyed Ismail MAC on 26.09.2014
*$*$------------------------------------------------------------------------*
*$*$ Modified By : Seyed Ismail MAC
*$*$ Modified On : 09.03.2015
*$*$ Reference   : RTS 1078
*$*$ Transport   : CGWK900792
*$*$ Tag         : MAC09032015
*$*$ Purpose     : To remove mandatory mark on the depot
*$*$---------------------------------------------------------------------
**/


jQuery.sap.require("sap.ui.model.json.JSONModel");
var csrftoken = '';

sap.ui.model.json.JSONModel.extend("UploadSingleCertificate", {
	
	onlinesuccessfunDocType: function(resultdata, response){
		busyDialog.close();
		jQuery.sap.require("sap.ui.model.json.JSONModel");
		var oDocType = sap.ui.getCore().byId("idDocType");
		
		if(resultdata != undefined){
			if(resultdata.results.length > 0){
				var oModel = new sap.ui.model.json.JSONModel(resultdata);
				oDocType.setModel(oModel);
				oDocType.bindItems("/results",new sap.ui.core.ListItem({text: "{DocType}",key:"{Zdoc}"}));
			}
		}
		//oDocType.insertItem((new sap.ui.core.ListItem({text:"Select Document Type", key:"0"})),0);
		//oDocType.setSelectedKey("0");
	},
	
	onlineerrorfunDocType: function(err){
		//busyDialog.close();
		//sap.ui.getCore().byId("idDocType").insertItem((new sap.ui.core.ListItem({text:"Select Document Type", key:"0"})),0);
		//sap.ui.getCore().byId("idDocType").setSelectedKey("0");
		
		errorfromServer(err);
	},
	
	getOnlinefunDocType: function(unitNumber, DnNumber){
		try{
			var loginusename = objLoginUser.getLoggedInUserName();
			sap.ui.getCore().byId("idDocType").destroyItems();
			
			var resultdata = {
					results: []
				};
			resultdata.results = loggedInUserDROP5;
			var oModel = new sap.ui.model.json.JSONModel(resultdata);
			var oDocType = sap.ui.getCore().byId("idDocType");
			oDocType.setModel(oModel);
			oDocType.bindItems("/results",new sap.ui.core.ListItem({text: "{DocType}",key:"{Zdoc}"}));
			
			/*busyDialog.open();
			var oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
			//http://seanwgd1.gessap.local:8000/sap/opu/odata/sap/ZNW_SEACO_PORTAL_LOT4_SECURITY_SRV/Single_Doctype_F4?$filter=Bname eq 'ztest_dm' and Dept eq ''
		    //var urlToCall = serviceUrl + "/F4_Unit_Type_Single";
				//var urlToCall = serviceUrl + "/Single_Doctype_F4?$filter=Bname eq '"+loginusename+"' and Dept eq ''";
			var urlToCall = serviceUrl + ";mo/Single_Doctype_F4?$filter=Bname eq '"+loginusename+"'";
			var objUtil = new utility();
		    objUtil.doOnlineRequest(urlToCall,this.onlinesuccessfunDocType, this.onlineerrorfunDocType);*/
		}catch(e){
			busyDialog.close();
			sap.ui.commons.MessageBox.alert("Error on fetching Doc Type " + e);
		}
	},
	
	//FUNCTION FOR CHECKING UNIT NUMBER VALID OR NOT
	onlinesuccessfunValidUnitNo: function(resultdata, response){
		if(resultdata != undefined){
			if(resultdata.results.length > 0){
				if(resultdata.results[0].Id == 'Unit found'){
					var objCurnt = new UploadSingleCertificate();
					objCurnt.getOnlineDataUpload();	
					return true;
				}
				
			}
		}
		busyDialog.close();
		sap.ui.commons.MessageBox.alert("You have input an invalid Unit Number.\n Please enter a valid  Unit Number -11-char alpha numeric.");
		return false;
	},
	onlineerrorfunValidUnitNo: function(err){
		errorfromServer(err);
		return false;
	},
	getOnlinefunValidUnitNo: function(unitNumber, DnNumber){
		try{
			var oFileUpldrSnglCert = sap.ui.getCore().byId("idUpldSnglCertificate");
			oFileUpldrSnglCert.destroyParameters();
			oFileUpldrSnglCert.setAdditionalData('');
			
			var vDepotCode = sap.ui.getCore().byId("idDepotCode");
			var vUnitNmbr = sap.ui.getCore().byId("idUnitType");
			var vDocType = sap.ui.getCore().byId("idDocType");
			//var vDocType = $.trim(sap.ui.getCore().byId("idDocType").getProperty('selectedKey'));
			var vDate = sap.ui.getCore().byId("idDate");
			var validat = false;
			var objUtil = new utility();
			
			vUnitNmbr.setValue($.trim(vUnitNmbr.getValue()).toUpperCase());
			/* Begin of commenting by Seyed Ismail MAC on 09.03.2015 MAC09032015- */
			/*if($.trim(vDepotCode.getValue()) == ''){
				vDepotCode.setValueState(sap.ui.core.ValueState.Error);
				vDepotCode.setPlaceholder("Required");
				//sap.ui.commons.MessageBox.alert("Either Unit Number or Document Type input missing.\n Please check your inputs and retry.");
				validat = true;
			}else{
				vDepotCode.setValueState(sap.ui.core.ValueState.None);
			}*/
			/* End of commenting by Seyed Ismail MAC on 09.03.2015 MAC09032015- */
			
			if($.trim(vUnitNmbr.getValue()) == ''){
				vUnitNmbr.setValueState(sap.ui.core.ValueState.Error);
				vUnitNmbr.setPlaceholder("Required");
				//sap.ui.commons.MessageBox.alert("Either Unit Number or Document Type input missing.\n Please check your inputs and retry.");
				validat = true;
			}else if(!objUtil.validateUnitNumber($.trim(vUnitNmbr.getValue()))){
				vUnitNmbr.setValue('');
				vUnitNmbr.setValueState(sap.ui.core.ValueState.Error);
				vUnitNmbr.setPlaceholder("Invalid Unit Number");
				//sap.ui.commons.MessageBox.alert("You have input an invalid Unit Number.\n Please enter a valid  Unit Number -11-char alpha numeric.");
				validat = true;
			}else{
				vUnitNmbr.setValueState(sap.ui.core.ValueState.None);
				vUnitNmbr.setPlaceholder("Unit Number");
			}
			
			
			if(vDocType.getValue() == ''){
				vDocType.setValueState(sap.ui.core.ValueState.Error);
				vDocType.setPlaceholder("Required");
				//sap.ui.commons.MessageBox.alert("Either Unit Number or Document Type input missing.\n Please check your inputs and retry.");
				validat = true;
			}else{
				vDocType.setValueState(sap.ui.core.ValueState.None);
				vDocType.setPlaceholder("Select Document Type");
			}
			
			if($.trim(vDate.getValue()) == ''){
				vDate.setValueState(sap.ui.core.ValueState.Error);
				vDate.setPlaceholder("Required");
				//sap.ui.commons.MessageBox.alert("Date input missing.\n Please check your inputs and retry.");
				validat = true;
			}
			
			if(validat){
				return false;
			}
			
			if((oFileUpldrSnglCert.getValue() == '') || (oFileUpldrSnglCert.oFilePath.getValue() == ''))
			{
				sap.ui.commons.MessageBox.alert("File input missing.\n Please check your inputs and retry.");
				validat = true;
			}
			if(validat){
				return false;
			}
			
			busyDialog.open();
		    var urlToCall = serviceUrl + "/Upload_Document_Single?$filter=Id eq '"+ $.trim(vUnitNmbr.getValue()) +"'";
			var objUtil = new utility();
			var objCurnt = new UploadSingleCertificate();
		    objUtil.doOnlineRequest(urlToCall,objCurnt.onlinesuccessfunValidUnitNo, objCurnt.onlineerrorfunValidUnitNo);
		}catch(e){
			busyDialog.close();
			sap.ui.commons.MessageBox.alert("Error on fetching Doc Type " + e);
		}
	},
	
	//FUNCTION FOR UPLOADING FILE
onlinesuccessfunUpload: function(resultdata, response){
	var vDocType = $.trim(sap.ui.getCore().byId("idDocType").getValue());
	var vUnitNmbr = $.trim(sap.ui.getCore().byId("idUnitType").getValue());
	busyDialog.close();
	try{
		var oFileUpldrSnglCert = sap.ui.getCore().byId("idUpldSnglCertificate");
		oFileUpldrSnglCert.destroyParameters();
		oFileUpldrSnglCert.setAdditionalData('');
		oFileUpldrSnglCert.setValue('');
		oFileUpldrSnglCert.oFilePath.setValue('');
		
		if(response != undefined){
			if(response.statusCode == '204'){
				//sap.ui.getCore().byId("idDocType").setSelectedKey("0");
				//sap.ui.getCore().byId("idUnitType").setValue('');
				//sap.ui.getCore().byId("idDate").setValue('');
				
				sap.ui.commons.MessageBox.alert(vDocType + " Successfully uploaded for " + vUnitNmbr);
			}else{
				sap.ui.commons.MessageBox.alert(vDocType + " uploaded for " + vUnitNmbr + " Failed " + "\n Please make the required changes before retrying" );
			}
		}else{
			sap.ui.commons.MessageBox.alert(vDocType + " uploaded for " + vUnitNmbr + " Failed " + "\n Please make the required changes before retrying");
		}
	}catch(e){
		busyDialog.close();
		sap.ui.commons.MessageBox.alert(vDocType + " uploaded for " + vUnitNmbr + " Failed due to - " + e + "\n Please make the required changes before retrying");
	}
},
	
onlineerrorfunUpload: function(err){
		var oFileUpldrSnglCert = sap.ui.getCore().byId("idUpldSnglCertificate");
		oFileUpldrSnglCert.destroyParameters();
		oFileUpldrSnglCert.setAdditionalData('');
		oFileUpldrSnglCert.setValue('');
		oFileUpldrSnglCert.oFilePath.setValue('');
		
		errorfromServer(err);
},

getOnlineDataUpload: function(){
	try{
		var oFileUpldrSnglCert = sap.ui.getCore().byId("idUpldSnglCertificate");
		var vDepotCode = sap.ui.getCore().byId("idDepotCode").getValue();
		var vUnitNmbr = $.trim(sap.ui.getCore().byId("idUnitType").getValue());
		var vDocType = $.trim(sap.ui.getCore().byId("idDocType").getProperty('selectedKey'));
		//var vDate = $.trim(sap.ui.getCore().byId("idDate").getProperty('yyyymmdd'));
		 var vDate = $.trim(sap.ui.getCore().byId("idDate").getValue());
		  if (vDate.length >= 10)
			{
			    if ((vDate.charAt(2) == '/' && vDate.charAt(5) == '/') ||
			        (vDate.charAt(2) == '.' && vDate.charAt(5) == '.') ||
			        (vDate.charAt(2) == '-' && vDate.charAt(5) == '-'))
			    {
			    	vDate = vDate.substring(0, 2) + "" + vDate.substring(3, 5) 
			           + "" + vDate.substring(6);
			    }
			}
		
		var filepath = oFileUpldrSnglCert.oFileUpload;
		var oFReader = new FileReader();
		 oFReader.readAsDataURL(filepath.files[0]);
		    oFReader.onload = function (oFREvent) {
		    	//var divContent = document.getElementById("content");
		    	//document.getElementById("idpdfiframe").src = oFReader.result;
		    	//busyDialog.open();
		    	var oDataPostParam = {   
		    			Id : "1",
		    			IDate : vDate,
		    			IDepotCode : vDepotCode,
		    			IDoctype : vDocType,
		    			IFilename : '01@' + oFileUpldrSnglCert.oFileUpload.files[0].name,
		    			IImage : oFReader.result.substring(28),
		    			IUnitno: vUnitNmbr
	                 };
		    	
		    	var urlToCall = serviceUrl + "/Upload_Document_Single('1')";
				var objCurnt = new UploadSingleCertificate();
				var objUtil = new utility();
			    objUtil.doOnlinePostData(urlToCall,oDataPostParam, objCurnt.onlinesuccessfunUpload, objCurnt.onlineerrorfunUpload);
		    };
		    oFReader.onerror = function (err){
		    	busyDialog.close();
				sap.ui.commons.MessageBox.alert("Error on reading file.");
		    };
	}catch(e){
		busyDialog.close();
		sap.ui.commons.MessageBox.alert("Error on uploading file " + e);
	}
},

loadUploadSingleCertificate: function(){
		jQuery.sap.require("sap.ui.commons.MessageBox");
		jQuery.sap.require("sap.ui.commons.AutoComplete");
		jQuery.sap.require("sap.ui.commons.ListBox");
		jQuery.sap.require("sap.ui.commons.DropdownBox");
		//var objLoginUser = new loggedInU();
		var depotEnabled = false, depotId = '';
		//var userdata = objLoginUser.filterLoggedInUserData('SCREEN');
		if((objLoginUser.getLoggedInUserType() != "DEPOT") && (objLoginUser.getLoggedInUserType() != "FACTORY")){
			depotEnabled = true;
		}else{
			depotId = objLoginUser.getLoggedInUserID();
		}
		
		var objCurnt = this; //CREATE CURRENT FILE OBJECT
		// Responsive Grid Layout
		var oUpldSnglCrtfctFormGLayout = new sap.ui.layout.form.ResponsiveGridLayout("idUpldCertSnglGLayout", {
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
		
		var oLblDepotCode = new sap.ui.commons.Label({text: "Depot Code:",
			// required:true, MAC09032015 -
			wrapping: true,
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12", linebreak:true,margin:false})
		}).addStyleClass("marginTop15");
		
		  var oDepotCode = new sap.ui.commons.TextField("idDepotCode",{
			  //width: "70%",
			  value: depotId,
			  placeholder:"Depot Code",
			  enabled: depotEnabled,
		      layoutData: new sap.ui.layout.GridData({span: "L1 M2 S6"}),
			}).addStyleClass("FormInputStyle marginTop10 DepotInput38px");
		  
		  oDepotCode.onfocusin =  function(e) {  
				this.setValueState(sap.ui.core.ValueState.None);
				this.setPlaceholder("Depot Code");                          
		      }; 
		      
		  var oLblUnitNo = new sap.ui.commons.Label({text: "Unit Number:", required:true, wrapping: true,
			  layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12", linebreak:true,margin:false})
		  }).addStyleClass("marginTop15");
		  
		  var oUnitNumber = new sap.ui.commons.TextField("idUnitType",{
			  width: "70%",
			  placeholder:"Unit Number",
		        layoutData: new sap.ui.layout.GridData({span: "L1 M2 S6"}),
			}).addStyleClass("FormInputStyle marginTop10 DepotInput38px");
		  
		  oUnitNumber.onfocusin =  function(e) {  
				this.setValueState(sap.ui.core.ValueState.None);
				this.setPlaceholder("Unit Number");                          
		      };  
		      
		  var oLblDocType = new sap.ui.commons.Label({text: "Document Type:",required:true, wrapping: true,
			  layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12", linebreak:true,margin:false})
		  }).addStyleClass("marginTop15");
		  
		  var oDocType = new sap.ui.commons.DropdownBox("idDocType", {
			  	width: "70%",
			  	change: changDocType,
		        layoutData: new sap.ui.layout.GridData({span: "L2 M4 S8"})
			  }).addStyleClass("FormInputStyle marginTop10 DepotInput38px");
		  
		  oDocType.setValueState(sap.ui.core.ValueState.None);
			oDocType.setPlaceholder("Select Document Type");
			
		  function changDocType(){
			  this.setValueState(sap.ui.core.ValueState.None);
			  this.setPlaceholder("Select Document Type");
		  };
		  
		  function handleChange(oEvent){
			  oEvent.oSource.setValueState(sap.ui.core.ValueState.None);
			  oEvent.oSource.setPlaceholder("Select Document Type");
			 /* var vDate = $.trim(sap.ui.getCore().byId("idDate").getValue());
			  if (vDate.length >= 10)
				{
				    if ((vDate.charAt(2) == '/' && vDate.charAt(5) == '/') ||
				        (vDate.charAt(2) == '.' && vDate.charAt(5) == '.') ||
				        (vDate.charAt(2) == '-' && vDate.charAt(5) == '-'))
				    {
				    	vDate = vDate.substring(0, 2) + "" + vDate.substring(3, 5) 
				           + "" + vDate.substring(6);
				    }
				}*/
		  };
		  
		  function fnResetCallbackMsgBox(sResult){
				//alert("sResult" + sResult);
				if(sResult == "YES"){
					var oUpldSnglCertificate  = sap.ui.getCore().byId("idUpldSnglCertificate");
					var oDepotCode = sap.ui.getCore().byId("idDepotCode");
					var oUnitType = sap.ui.getCore().byId("idUnitType");
					var oDocType = sap.ui.getCore().byId("idDocType");
					var oDate = sap.ui.getCore().byId("idDate");
					
					if(depotEnabled){
						oDepotCode.setValue('');
					}
					oDepotCode.setValueState(sap.ui.core.ValueState.None);
					oDepotCode.setPlaceholder("Depot Code");
					oUnitType.setValueState(sap.ui.core.ValueState.None);
					oUnitType.setPlaceholder("Unit Number");
					oDocType.setValueState(sap.ui.core.ValueState.None);
					oDocType.setPlaceholder("Select Document Type");
					oDocType.setValue('');
					oDate.setValueState(sap.ui.core.ValueState.None);
					oDate.setPlaceholder("Date");
					
					oUpldSnglCertificate.setValue('');
					oUpldSnglCertificate.oFilePath.setValue('');
					//oDepotCode.setValue('');
					oUnitType.setValue('');

					var today = new Date();
					oDate.setValue(today);
					//oDocType.setSelectedKey("0");
					
					//sap.ui.getCore().byId("idDocType").destroyItems();
					//sap.ui.getCore().byId("idDocType").addItem(new sap.ui.core.ListItem({text:"Select Document Type", key:"0"}));
					//objCurnt.getOnlinefunDocType();		//UNCOMMENT FOR RELOAD DOCUMENT TYPE FROM SERVER
				}
			};
			
			function padZero(num, size) {
			    var s = num+"";
			    while (s.length < size) s = "0" + s;
			    return s;
			}
			
			
		// create model
		var oModel = new sap.ui.model.json.JSONModel();
		oModel.setData({
		        dateValue: new Date()
		});
		
		var oLblDate = new sap.ui.commons.Label({text: "Date:", required:true, wrapping: true,
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12", linebreak:true,margin:false})
		}).addStyleClass("marginTop15");
		
		var oDate = new sap.ui.commons.DatePicker("idDate",{
			  width: "152px",
			//width:"50%",
			  value: {
				  path: "/dateValue",
			  type: new sap.ui.model.type.Date({pattern: "dd-MM-yyyy"})},
			  change:handleChange,
		        layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12"}),
			}).addStyleClass("FormInputStyle marginTop10 DepotInput38px");
		oDate.setModel(oModel);
		
		var oLblUpldSnglCert = new sap.ui.commons.Label({text: "Upload File:", required:true, wrapping: true,
		}).addStyleClass("marginTop15");
		  
		var oFlexbxUpldFileUSC = new sap.m.FlexBox({
  	      items: [oLblUpldSnglCert, new sap.ui.commons.Label({text: "Support Format: PDF", wrapping: true}).addStyleClass("font11 WarningMessage")],
  	    layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12", linebreak:true,margin:false}),
  	      direction: "Column"
  	    }).addStyleClass("marginTop10");;
  	    
	    var oUpldSnglCertificate = new sap.ui.commons.FileUploader("idUpldSnglCertificate", {
	    	name : "uploadfileData",
			uploadUrl : "UploadServlet",
			width: "71%",
			height: "38px",
			value : "",
			buttonText : " Browse ",
			sameFilenameAllowed : false,
			additionalData : "abc=123&test=456",
			layoutData: new sap.ui.layout.GridData({span: "L2 M4 S8", linebreak: false, margin: true}),
			change : function(oEvent) {
				var ext = oEvent.oSource.oFilePath.getValue().split('.').pop().toLowerCase();
				if($.inArray(ext, ['pdf']) == -1) {
					oEvent.oSource.setValue('');
					oEvent.oSource.oFilePath.setValue('');
					sap.ui.commons.MessageBox.alert("Input file type invalid.\n Please check your inputs and retry.");
					return false;
				}
				
				var chkSpclChar = oEvent.oSource.oFilePath.getValue().split('@');
				if(chkSpclChar.length > 1){
					oEvent.oSource.setValue('');
					oEvent.oSource.oFilePath.setValue('');
					sap.ui.commons.MessageBox.alert("Input file name invalid.\n File name shold not contain special character '@' and '|'.\n Please check your inputs and retry.");
					return false;
				}
				
				chkSpclChar = oEvent.oSource.oFilePath.getValue().split('|');
				if(chkSpclChar.length > 2){
					oEvent.oSource.setValue('');
					oEvent.oSource.oFilePath.setValue('');
					sap.ui.commons.MessageBox.alert("Input file name invalid.\n File name shold not contain special character '@' and '|'.\n Please check your inputs and retry.");
					return false;
				}
			}
		}).addStyleClass("marginTop30 DepotInput38px");
	    
		var oBtnUploadSnglCert = new sap.m.Button("btnUpload", 
				{
					text:"Upload",
					width:"80px",
					styled:false, 
					layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: true, margin: true}),
					press: this.getOnlinefunValidUnitNo
				}).addStyleClass("submitBtn");
		
		var ResetMessage = "This will clear the screen content.\n Do you want to continue?";
		var oBtnResetUpldSnglCert = new sap.m.Button("idBtnResetUpldSnglCert",{
	          text : "Reset",
	          width:"80px",
	          styled:false,
	          layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
	          press:function(){
	        	  			sap.ui.commons.MessageBox.show(ResetMessage,sap.ui.commons.MessageBox.Icon.WARNING,"Warning",
	        		  		[sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO],
	        		  		fnResetCallbackMsgBox, sap.ui.commons.MessageBox.Action.YES);
	          }}).addStyleClass("submitBtn");
		
		var lblSpace = new sap.ui.commons.Label( {text: " ",width : '8px'});
		// Flex Box
    	var oFlexbxUNPB = new sap.m.FlexBox({
    	      items: [oBtnUploadSnglCert, lblSpace, oBtnResetUpldSnglCert],
    	      direction: "Row"
    	    }).addStyleClass("marginTop10");;
		
    	var lblTmpFld = new sap.ui.commons.Label( {text: "Temporary field added till security is implemented",wrapping: true,
    		layoutData: new sap.ui.layout.GridData({span: "L2 M4 S12", linebreak:true,margin:true})	
    	}).addStyleClass("font10");

    	
    	// Flex Box
    /*	var oFlexbxUNPBTmp = new sap.m.FlexBox({
    	      items: [oDepotCode, lblTmpFld],
    	      layoutData: new sap.ui.layout.GridData({span: "L8 M8 S8"}),
    	      direction: "Row"
    	    });*/
    	
	       // Labels
	       var labStar = new sap.ui.commons.Label({text: "* "}).addStyleClass("MandatoryStar");
	       var lblSpaceLegend = new sap.ui.commons.Label( {text: " ",width : '5px'});
			  var labRequired = new sap.ui.commons.Label({text: " Mandatory Field",wrapping: true});
			  var oFlexboxReq = new sap.m.FlexBox({
				 // layoutData: new sap.ui.layout.GridData({span: "L7 M6 S4"}),
	              items: [labStar,lblSpaceLegend,labRequired],
	              direction: "Row"
			  }).addStyleClass("marginTop10");
	       
			  
		// Online Form Starts
		var oUpldSnglCrtfctForm = new sap.ui.layout.form.Form("UpldSnglCrtfctForm",{
			                layout: oUpldSnglCrtfctFormGLayout,
			                formContainers: [
			                        
			                        new sap.ui.layout.form.FormContainer("idUpldSnglCrtfctFormC1",{
			                                formElements: [
														new sap.ui.layout.form.FormElement({
															fields: [oLblDepotCode, oDepotCode],
															//layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
														}),
														/*new sap.ui.layout.form.FormElement({
															fields: [lblTmpFld]
														}),*/
														new sap.ui.layout.form.FormElement({
													        fields: [oLblUnitNo, oUnitNumber],
													        layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
														}),
														new sap.ui.layout.form.FormElement({
													        fields: [oLblDocType, oDocType],
													        layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
														}),
														new sap.ui.layout.form.FormElement({
													        fields: [oLblDate, oDate],
													        layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
														}),
														new sap.ui.layout.form.FormElement({
													        fields: [oFlexbxUpldFileUSC, oUpldSnglCertificate],
													        layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
														}),
														
														new sap.ui.layout.form.FormElement({
														    fields: [oFlexbxUNPB],
														    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
														}),
														new sap.ui.layout.form.FormElement({
														    fields: [oFlexboxReq],
														    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
														})
			                                        ]
			                        })
			                ]
			        });
	
		//GET AND SET DATA FOR DOC TYPE
		objCurnt.getOnlinefunDocType();	
		
		return oUpldSnglCrtfctForm;
	}
});
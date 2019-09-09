/******** NP *******/
jQuery.sap.require("sap.ui.model.json.JSONModel");

var ojsonAllUploderData = [];
var ojsonUpldDNPicSaleBinary = [];

sap.ui.model.json.JSONModel.extend("UploadDNPicturesSales", {
	//SUCCESS FUNCTION FOR VALIDATE UNIT NUMBER
	onlinesuccessfunSubmit: function(resultdata, response){
		busyDialog.close();
		if(resultdata != undefined){
			if(resultdata.results.length == 1){
				if(resultdata.results[0].Id == 'Unit found'){
					sap.ui.getCore().byId("idBtnUploadDNPicMultSubmit").setEnabled(false);
					sap.ui.getCore().byId("idUnitNoUDNPM").setEnabled(false);
					
					var oCrntFile = new UploadDNPicturesSales();
					oCrntFile.showDNPicSale();
					return;
				}else{
					sap.ui.commons.MessageBox.alert("You have input an invalid Unit Number.\n Please enter a valid  Unit Number -11-char alpha numeric.");
				}
				
			}else{
				sap.ui.commons.MessageBox.alert("You have input an invalid Unit Number.\n Please enter a valid  Unit Number -11-char alpha numeric.");
			}
		}else{
			sap.ui.commons.MessageBox.alert("You have input an invalid Unit Number.\n Please enter a valid  Unit Number -11-char alpha numeric.");
		}
	},
	//ERROR FUNCTION FOR VALIDATE UNIT NUMBER
	onlineerrorfunSubmit: function(err){
		errorfromServer(err);
	},
	//ONLINE REQUEST FOR VALIDATE UNIT NUMBER
	getOnlineDataSubmit: function(unitNumber, DnNumber){
		try{
			var ounitNiUDNPM = sap.ui.getCore().byId("idUnitNoUDNPM");
			ounitNiUDNPM.setValue($.trim(ounitNiUDNPM.getValue()).toUpperCase());
			var vUnitNoDNPicSale =ounitNiUDNPM.getValue();
			//sap.ui.getCore().byId("idUnitNoUDNPM").setValue($.trim(sap.ui.getCore().byId("idUnitNoUDNPM").getValue()).toUpperCase());
			var oFlxBxUNDNPS = sap.ui.getCore().byId("idFlexbxUDNPSGrid");
			if(oFlxBxUNDNPS != undefined){
				oFlxBxUNDNPS.destroy();
			}
			busyDialog.open();
			var oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
			//http://seanwgd1.gessap.local:8000/sap/opu/odata/sap/ZNW_SEACO_PORTAL_SRV/Upload_Document_Single?$filter=Id eq 'GESU9192892'  
	
			var urlToCall = serviceUrl + "/Upload_Document_Single?$filter=Id eq '"+ vUnitNoDNPicSale + "'";
		    
			var objUtil = new utility();
		    objUtil.doOnlineRequest(urlToCall,this.onlinesuccessfunSubmit, this.onlineerrorfunSubmit);
		    //alert('result: ' + resOnline);
		}catch(e){
			busyDialog.close();
			sap.ui.commons.MessageBox.alert("Error on validating Unit Number " + e);
		}
	},
	
	//MAKE JSON FOR SINGLE CONTROL CALLED BY BUTTON CLICK
	/*makeJsonForBinaryDataDNPicSale: function(){
		try{
			busyDialog.open();
			var oCurnFile = new UploadDNPicturesSales();
			
			for(var j=0; j<ojsonAllUploderData.length; j++){
				var genrtFileId = oRowsTblDNPicSngl[j].getCells()[0].getText();
				var ocell = oRowsTblDNPicSngl[j].getCells()[6].sId;
				var oFileUpldr = sap.ui.getCore().byId(ojsonAllUploderData[j]);
				
				if((oFileUpldr.getValue() != '') && (oFileUpldr.oFilePath.getValue() != ''))
				{
					ojsonUpldDNPicSaleBinary.push({
						"lineno" : genrtFileId,
						"fileObject": oFileUpldr,
						'fileSelName' : oFileUpldr.oFileUpload.files[0].name,
						"binarydata" : "",
						"status" : 'PENDING'
					});
				}
			}
			if(ojsonUpldDNPicSaleBinary.length > 0){
				oCurnFile.convertInBinaryJsonObjSngle();
			}else{
				busyDialog.close();
				sap.ui.commons.MessageBox.alert("File input missing." + "\n Please make the required changes before retrying" );
			}
		}catch(e){
			busyDialog.close();
			sap.ui.commons.MessageBox.alert("Upload for " + sap.ui.getCore().byId("idunitNo").getValue() + " Failed." + "\n Please make the required changes before retrying" );
		}
	},*/
	
	//CHECK ALL FILE CONVERSION SUCCESS
	checkAllFileConverted: function (){
		var checkVal = true;
		if(ojsonUpldDNPicSaleBinary.length>0){
			for(var k=0; k < ojsonUpldDNPicSaleBinary.length; k++){
				if((ojsonUpldDNPicSaleBinary[k].status == "PENDING") || (ojsonUpldDNPicSaleBinary[k].status == "FAILED")
						|| (ojsonUpldDNPicSaleBinary[k].status == "START"))
					checkVal = false;
			}
		}
		return checkVal;
	},

	//CONVERT JSON DATA TO BINARY DATA FOR SINGLE CONTROL CALLED BY makeJsonForBinaryDataDNPicSale
	convertInBinaryJsonObjDNPicSale: function(){
		busyDialog.open();
		try{
			for(var i =0; i < ojsonUpldDNPicSaleBinary.length; i++){
				if(ojsonUpldDNPicSaleBinary[i].status  == "PENDING"){
					var oFReader = new FileReader();
					ojsonUpldDNPicSaleBinary[i].status = "START"; 
					var getFileobj = ojsonUpldDNPicSaleBinary[i].fileObject;
					var fileName = getFileobj.oFileUpload.files[0].name;
					
					oFReader.readAsDataURL(getFileobj.oFileUpload.files[0]);
					oFReader.onload = function (oFREvent) {
						ojsonUpldDNPicSaleBinary[i].status = "SUCCESS";
						ojsonUpldDNPicSaleBinary[i].binarydata = oFReader.result.substring(22); //getFileobj.oFileUpload.files[0].name +'-data-' +oFReader.result.substring(28);
						var oCurnFile = new UploadDNPicturesSales();
						oCurnFile.convertInBinaryJsonObjDNPicSale();
					  };
					oFReader.onerror = function (err){
							busyDialog.close();
					    	ojsonUpldDNPicSaleBinary[i].status = "FAILED";
					    	sap.ui.commons.MessageBox.alert("Upload for " + vunitno + " Failed due to " + err + "\n Please make the required changes before retrying" );
					    	return false;
					  };
					break;
				}
			}
			//CALL ONLINE PUT ODATA REQUEST
			if(this.checkAllFileConverted()){
				
				var vFilename='', binaryDataArry = [];
				for(var i =0; i < ojsonUpldDNPicSaleBinary.length; i++){
					vFilename += ojsonUpldDNPicSaleBinary[i].fileSelName + '|';
					
					binaryDataArry.push({
						"File": ojsonUpldDNPicSaleBinary[i].binarydata
					});
				};
				
				var oDataPostParam = {  
						IUnitno :  $.trim(sap.ui.getCore().byId("idUnitNoUDNPM").getValue()),
						ISaletop : binaryDataArry[0].File,
						ISaleover : binaryDataArry[4].File,
						Id : '1',
						IFilename : vFilename,
		    			ISalefront : binaryDataArry[1].File,
		    			ISaleback : binaryDataArry[3].File,
		    			ISalebott : binaryDataArry[2].File,	    			
	                 };
				
				//AFTER SETTING PUT DATA DO ONLINE REQUEST FOR UPLOAD FILE
				var urlToCall = serviceUrl + "/Upload_SalePic('1')";
				var objCurnt = new UploadDNPicturesSales();
				var objUtil = new utility();
			    objUtil.doOnlinePostData(urlToCall,oDataPostParam, objCurnt.onlinesuccessfunUploadDNPS, objCurnt.onlineerrorfunUploadDNPS);
			}
		}catch(e){
			busyDialog.close();
			sap.ui.commons.MessageBox.alert("Upload failed due to - " + e + ".\n Please make the required changes before retrying");
		}
	},
	
	//SUCCESS UPLOAD
	onlinesuccessfunUploadDNPS: function(resultdata, response){
		//busyDialog.close();
		busyDialog.close();
		try{
			var ounitUDNPM = sap.ui.getCore().byId("idUnitNoUDNPM").getValue();
			if(response != undefined){
				if(response.statusCode == '204'){
					
					sap.ui.commons.MessageBox.alert("Sale Pictures successfully uploaded for "+ ounitUDNPM +".");
					
					var oFileUpldrDNPicSale = sap.ui.getCore().byId("idUplDNPicMulTop");
					oFileUpldrDNPicSale.setValue('');
					oFileUpldrDNPicSale.oFilePath.setValue('');
					var vlblTxt = sap.ui.getCore().byId("idLblDNPicTop");
					vlblTxt.setText('');
					
					oFileUpldrDNPicSale = sap.ui.getCore().byId("idUplDNPicMulBottom");
					oFileUpldrDNPicSale.setValue('');
					oFileUpldrDNPicSale.oFilePath.setValue('');
					vlblTxt = sap.ui.getCore().byId("idLblDNPicBottom");
					vlblTxt.setText('');
					
					oFileUpldrDNPicSale = sap.ui.getCore().byId("idUplDNPicMulBack");
					oFileUpldrDNPicSale.setValue('');
					oFileUpldrDNPicSale.oFilePath.setValue('');
					vlblTxt = sap.ui.getCore().byId("idLblDNPicBack");
					vlblTxt.setText('');
					
					oFileUpldrDNPicSale = sap.ui.getCore().byId("idUplDNPicMulFront");
					oFileUpldrDNPicSale.setValue('');
					oFileUpldrDNPicSale.oFilePath.setValue('');
					vlblTxt = sap.ui.getCore().byId("idLblDNPicFront");
					vlblTxt.setText('');
					
					oFileUpldrDNPicSale = sap.ui.getCore().byId("idUplDNPicMulInner");
					oFileUpldrDNPicSale.setValue('');
					oFileUpldrDNPicSale.oFilePath.setValue('');
					vlblTxt = sap.ui.getCore().byId("idLblDNPicInner");
					vlblTxt.setText('');
				}else{
					sap.ui.commons.MessageBox.alert("Upload failed.\n Please make the required changes before retrying" );
				}
			}else{
				sap.ui.commons.MessageBox.alert("Upload failed.\n Please make the required changes before retrying");
			}
		}catch(e){
			busyDialog.close();
			sap.ui.commons.MessageBox.alert("Upload failed due to - " + e + ".\n Please make the required changes before retrying");
		}
	},
	
	//ERROR UPLOAD
	onlineerrorfunUploadDNPS: function(err){
		errorfromServer(err);
	},
	
showDNPicSale: function(){
      	// Button
    	var btnUpload = new sap.m.Button('idBtnUploadDNPS',{
	          text : "Upload",
	          width:"80px",
	          styled:false,
	          layoutData: new sap.ui.layout.GridData({span: "L2 M2 S4"}),
	          press:function(){
	        	  ojsonUpldDNPicSaleBinary.length = 0;
	        	  
	        	  var iduplrTop = sap.ui.getCore().byId("idUplDNPicMulTop");
	        	  var iduplrFront = sap.ui.getCore().byId("idUplDNPicMulFront");
	        	  var iduplrBottom = sap.ui.getCore().byId("idUplDNPicMulBottom");
	        	  var iduplrBack = sap.ui.getCore().byId("idUplDNPicMulBack");
	        	  var iduplrInner = sap.ui.getCore().byId("idUplDNPicMulInner");
	        	  var vFileName = '', status ="nofile";
	        	  var checkFileSel = false;
	        	  //TOP UPLOADER
	        	  if((iduplrTop.getValue() != '') && (iduplrTop.oFilePath.getValue() != ''))
					{
	        		  checkFileSel = true;
	        		  vFileName = iduplrTop.oFileUpload.files[0].name;
	        		  status ="PENDING";
					}else{
						vFileName = '';
						 status ="";
					}
	        	  
	        	  ojsonUpldDNPicSaleBinary.push({
						"lineno" : '01',
						'uploaderid': 'idUplDNPicMulTop',
						"fileObject": iduplrTop,
						'fileSelName' : vFileName,
						"binarydata" : "",
						"status" : status
					});
	        	  
	        	  //FRONT UPLOADER
	        	  if((iduplrFront.getValue() != '') && (iduplrFront.oFilePath.getValue() != ''))
					{
	        		  checkFileSel = true;
	        		  vFileName = iduplrFront.oFileUpload.files[0].name;
	        		  status ="PENDING";
					}else{
						vFileName = '';
						 status ="";
					}
	        	  
	        	  ojsonUpldDNPicSaleBinary.push({
						"lineno" : '02',
						'uploaderid': 'idUplDNPicMulFront',
						"fileObject": iduplrFront,
						'fileSelName' : vFileName,
						"binarydata" : "",
						"status" : status
					});
	        	  
	        	  //BOTTOM UPLOADER
	        	  if((iduplrBottom.getValue() != '') && (iduplrBottom.oFilePath.getValue() != ''))
					{
	        		  checkFileSel = true;
	        		  vFileName = iduplrBottom.oFileUpload.files[0].name;
	        		  status ="PENDING";
					}else{
						vFileName = '';
						 status ="";
					}
	        	  ojsonUpldDNPicSaleBinary.push({
						"lineno" : '03',
						'uploaderid': 'idUplDNPicMulBottom',
						"fileObject": iduplrBottom,
						'fileSelName' : vFileName,
						"binarydata" : "",
						"status" : status
					});
	        	  
	        	  //BACK UPLOADER
	        	  if((iduplrBack.getValue() != '') && (iduplrBack.oFilePath.getValue() != ''))
					{
	        		  checkFileSel = true;
	        		  vFileName = iduplrBack.oFileUpload.files[0].name;
	        		  status ="PENDING";
					}else{
						vFileName = '';
						 status ="";
					}
	        	  
	        	  ojsonUpldDNPicSaleBinary.push({
						"lineno" : '04',
						'uploaderid': 'idUplDNPicMulBack',
						"fileObject": iduplrBack,
						'fileSelName' : vFileName,
						"binarydata" : "",
						"status" : status
					});
	        	  
	        	//INNER UPLOADER
	        	  if((iduplrInner.getValue() != '') && (iduplrInner.oFilePath.getValue() != ''))
					{
	        		  checkFileSel = true;
	        		  vFileName = iduplrInner.oFileUpload.files[0].name;
	        		  status ="PENDING";
					}else{
						vFileName = '';
						 status ="";
					}
	        	  ojsonUpldDNPicSaleBinary.push({
						"lineno" : '05',
						'uploaderid': 'idUplDNPicMulInner',
						"fileObject": iduplrInner,
						'fileSelName' : vFileName,
						"binarydata" : "",
						"status" : status
					});
	        	  if(checkFileSel){
	        		  	var oCurnFile = new UploadDNPicturesSales();
  	      			  	oCurnFile.convertInBinaryJsonObjDNPicSale();
	        	  }else{
	        		  sap.ui.commons.MessageBox.alert("File input missing." + "\n Please check your inputs and retry." );
	      				return false;
	        	  }
	          }
    	}).addStyleClass("submitBtn");
    	
    	var viewBoxUpld = this.createViewSalePics();
    	// Flex Box
    	var oFlexboxUpload = new sap.m.FlexBox('idFlexbxUDNPSGrid', {
    	      items: [viewBoxUpld, btnUpload, new sap.ui.commons.Label({text: "Support Formats: PNG, JPEG, GIF"}).addStyleClass("font11 WarningMessage")],
    	      direction: "Column"
    	    });
    	
    	var oDNPicturesSingleFormElement = sap.ui.getCore().byId("IdUploadDNPicMultFrmElmnt"); // release Results is ID of Form Element
    	oDNPicturesSingleFormElement.insertField(oFlexboxUpload,0);
    	//oDNPicturesSingleFormElement.insertField(oBtnUploadDNPicturesUpload,1);
    },
    createViewSalePics: function(){
    	//UPLOAD BUTTONS
    	var oUplDNPicMulTop = new sap.ui.commons.FileUploader(
				"idUplDNPicMulTop",
				{
					name : "uploadfileData",
					uploadUrl : "UploadServlet",
					value : "",
					buttonText : " Browse ",
					layoutData: new sap.ui.layout.GridData({span: "L12 M12 S12",linebreak: false, margin: true}),
					sameFilenameAllowed : false,
					additionalData : "abc=123&test=456",
					change : function(oEvent) {
						var oLblDNPicTop = sap.ui.getCore().byId("idLblDNPicTop");
						if((oEvent.oSource.getValue() != '') && (oEvent.oSource.oFilePath.getValue() != ''))
						{
							var ext = oEvent.oSource.oFilePath.getValue().split('.').pop().toLowerCase();
							if($.inArray(ext, ['jpeg','png','gif','jpg']) == -1) {
								oEvent.oSource.setValue('');
								oEvent.oSource.oFilePath.setValue('');
								oLblDNPicTop.setText('');
								sap.ui.commons.MessageBox.alert("Input file type invalid.\n Please check your inputs and retry.");
								return ;
							}
							var chkSpclChar = oEvent.oSource.oFilePath.getValue().split('@');
							if(chkSpclChar.length > 1){
								oEvent.oSource.setValue('');
								oEvent.oSource.oFilePath.setValue('');
								oLblDNPicTop.setText('');
								sap.ui.commons.MessageBox.alert("Input file name invalid.\n File name shold not contain special character '@' and '|'.\n Please check your inputs and retry.");
								return ;
							}
							
							chkSpclChar = oEvent.oSource.oFilePath.getValue().split('|');
							if(chkSpclChar.length > 1){
								oEvent.oSource.setValue('');
								oEvent.oSource.oFilePath.setValue('');
								oLblDNPicTop.setText('');
								sap.ui.commons.MessageBox.alert("Input file name invalid.\n File name shold not contain special character '@' and '|'.\n Please check your inputs and retry.");
								return ;
							}
							
							/*chkSpclChar = oEvent.oSource.oFilePath.getValue().split('_');
							var objUtil = new utility();
				  			if(!objUtil.validateUnitNumber(chkSpclChar[0])){
				  				oEvent.oSource.setValue('');
								oEvent.oSource.oFilePath.setValue('');
								sap.ui.commons.MessageBox.alert("Input file Unit Number invalid.\n Please check your inputs and retry.");
								return ;
				  			}*/
							oLblDNPicTop.setText(oEvent.oSource.getValue());
						}else
						{
							oLblDNPicTop.setText('');	
						}
					}
				});
    	
    	var oUplDNPicMulBottom = new sap.ui.commons.FileUploader(
				"idUplDNPicMulBottom",
				{
					name : "uploadfileData",
					uploadUrl : "UploadServlet",
					value : "",
					buttonText : " Browse ",
					layoutData: new sap.ui.layout.GridData({span: "L12 M12 S12",linebreak: false, margin: true}),
					sameFilenameAllowed : false,
					additionalData : "abc=123&test=456",
					change : function(oEvent) {
						var oLblDNPicBttm = sap.ui.getCore().byId("idLblDNPicBottom");
						if((oEvent.oSource.getValue() != '') && (oEvent.oSource.oFilePath.getValue() != ''))
						{
							var ext = oEvent.oSource.oFilePath.getValue().split('.').pop().toLowerCase();
							if($.inArray(ext, ['jpeg','png','gif','jpg']) == -1) {
								oEvent.oSource.setValue('');
								oEvent.oSource.oFilePath.setValue('');
								oLblDNPicBttm.setText('');
								sap.ui.commons.MessageBox.alert("Input file type invalid.\n Please check your inputs and retry.");
								return ;
							}
							var chkSpclChar = oEvent.oSource.oFilePath.getValue().split('@');
							if(chkSpclChar.length > 1){
								oEvent.oSource.setValue('');
								oEvent.oSource.oFilePath.setValue('');
								oLblDNPicBttm.setText('');
								sap.ui.commons.MessageBox.alert("Input file name invalid.\n File name shold not contain special character '@' and '|'.\n Please check your inputs and retry.");
								return ;
							}
							
							chkSpclChar = oEvent.oSource.oFilePath.getValue().split('|');
							if(chkSpclChar.length > 1){
								oEvent.oSource.setValue('');
								oEvent.oSource.oFilePath.setValue('');
								oLblDNPicBttm.setText('');
								sap.ui.commons.MessageBox.alert("Input file name invalid.\n File name shold not contain special character '@' and '|'.\n Please check your inputs and retry.");
								return ;
							}
							
							/*chkSpclChar = oEvent.oSource.oFilePath.getValue().split('_');
							var objUtil = new utility();
				  			if(!objUtil.validateUnitNumber(chkSpclChar[0])){
				  				oEvent.oSource.setValue('');
								oEvent.oSource.oFilePath.setValue('');
								sap.ui.commons.MessageBox.alert("Input file Unit Number invalid.\n Please check your inputs and retry.");
								return ;
				  			}*/
							oLblDNPicBttm.setText(oEvent.oSource.getValue());
						}else
						{
							oLblDNPicBttm.setText('');	
						}
					}
				});
    	
    	var oUplDNPicMulBack = new sap.ui.commons.FileUploader(
				"idUplDNPicMulBack",
				{
					name : "uploadfileData",
					uploadUrl : "UploadServlet",
					value : "",
					buttonText : " Browse ",
					layoutData: new sap.ui.layout.GridData({span: "L12 M12 S12",linebreak: false, margin: true}),
					sameFilenameAllowed : false,
					additionalData : "abc=123&test=456",
					change : function(oEvent) {
						var oLblDNPicBack = sap.ui.getCore().byId("idLblDNPicBack");
						if((oEvent.oSource.getValue() != '') && (oEvent.oSource.oFilePath.getValue() != ''))
						{
							var ext = oEvent.oSource.oFilePath.getValue().split('.').pop().toLowerCase();
							if($.inArray(ext, ['jpeg','png','gif','jpg']) == -1) {
								oEvent.oSource.setValue('');
								oEvent.oSource.oFilePath.setValue('');
								oLblDNPicBack.setText('');
								sap.ui.commons.MessageBox.alert("Input file type invalid.\n Please check your inputs and retry.");
								return ;
							}
							var chkSpclChar = oEvent.oSource.oFilePath.getValue().split('@');
							if(chkSpclChar.length > 1){
								oEvent.oSource.setValue('');
								oEvent.oSource.oFilePath.setValue('');
								oLblDNPicBack.setText('');
								sap.ui.commons.MessageBox.alert("Input file name invalid.\n File name shold not contain special character '@' and '|'.\n Please check your inputs and retry.");
								return ;
							}
							
							chkSpclChar = oEvent.oSource.oFilePath.getValue().split('|');
							if(chkSpclChar.length > 1){
								oEvent.oSource.setValue('');
								oEvent.oSource.oFilePath.setValue('');
								oLblDNPicBack.setText('');
								sap.ui.commons.MessageBox.alert("Input file name invalid.\n File name shold not contain special character '@' and '|'.\n Please check your inputs and retry.");
								return ;
							}
							
							/*chkSpclChar = oEvent.oSource.oFilePath.getValue().split('_');
							var objUtil = new utility();
				  			if(!objUtil.validateUnitNumber(chkSpclChar[0])){
				  				oEvent.oSource.setValue('');
								oEvent.oSource.oFilePath.setValue('');
								sap.ui.commons.MessageBox.alert("Input file Unit Number invalid.\n Please check your inputs and retry.");
								return ;
				  			}*/
							oLblDNPicBack.setText(oEvent.oSource.getValue());
						}else
						{
							oLblDNPicBack.setText('');	
						}
					}
				});
    	
    	var oUplDNPicMulFront = new sap.ui.commons.FileUploader(
				"idUplDNPicMulFront",
				{
					name : "uploadfileData",
					uploadUrl : "UploadServlet",
					value : "",
					buttonText : " Browse ",
					layoutData: new sap.ui.layout.GridData({span: "L12 M12 S12",linebreak: false, margin: true}),
					sameFilenameAllowed : false,
					additionalData : "abc=123&test=456",
					change : function(oEvent) {
						var oLblDNPicFront = sap.ui.getCore().byId("idLblDNPicFront");
						if((oEvent.oSource.getValue() != '') && (oEvent.oSource.oFilePath.getValue() != ''))
						{
							var ext = oEvent.oSource.oFilePath.getValue().split('.').pop().toLowerCase();
							if($.inArray(ext, ['jpeg','png','gif','jpg']) == -1) {
								oEvent.oSource.setValue('');
								oEvent.oSource.oFilePath.setValue('');
								oLblDNPicFront.setText('');
								sap.ui.commons.MessageBox.alert("Input file type invalid.\n Please check your inputs and retry.");
								return ;
							}
							var chkSpclChar = oEvent.oSource.oFilePath.getValue().split('@');
							if(chkSpclChar.length > 1){
								oEvent.oSource.setValue('');
								oEvent.oSource.oFilePath.setValue('');
								oLblDNPicFront.setText('');
								sap.ui.commons.MessageBox.alert("Input file name invalid.\n File name shold not contain special character '@' and '|'.\n Please check your inputs and retry.");
								return ;
							}
							
							chkSpclChar = oEvent.oSource.oFilePath.getValue().split('|');
							if(chkSpclChar.length > 1){
								oEvent.oSource.setValue('');
								oEvent.oSource.oFilePath.setValue('');
								oLblDNPicFront.setText('');
								sap.ui.commons.MessageBox.alert("Input file name invalid.\n File name shold not contain special character '@' and '|'.\n Please check your inputs and retry.");
								return ;
							}
							
							/*chkSpclChar = oEvent.oSource.oFilePath.getValue().split('_');
							var objUtil = new utility();
				  			if(!objUtil.validateUnitNumber(chkSpclChar[0])){
				  				oEvent.oSource.setValue('');
								oEvent.oSource.oFilePath.setValue('');
								sap.ui.commons.MessageBox.alert("Input file Unit Number invalid.\n Please check your inputs and retry.");
								return ;
				  			}*/
							oLblDNPicFront.setText(oEvent.oSource.getValue());
						}else
						{
							oLblDNPicFront.setText('');	
						}
					}
				});
    	
    	var oUplDNPicMulInner = new sap.ui.commons.FileUploader(
				"idUplDNPicMulInner",
				{
					name : "uploadfileData",
					uploadUrl : "UploadServlet",
					value : "",
					buttonText : " Browse ",
					layoutData: new sap.ui.layout.GridData({span: "L12 M12 S12",linebreak: false, margin: true}),
					sameFilenameAllowed : false,
					additionalData : "abc=123&test=456",
					change : function(oEvent) {
						var oLblDNPicInnr = sap.ui.getCore().byId("idLblDNPicInner");
						if((oEvent.oSource.getValue() != '') && (oEvent.oSource.oFilePath.getValue() != ''))
						{
							var ext = oEvent.oSource.oFilePath.getValue().split('.').pop().toLowerCase();
							if($.inArray(ext, ['jpeg','png','gif','jpg']) == -1) {
								oEvent.oSource.setValue('');
								oEvent.oSource.oFilePath.setValue('');
								oLblDNPicInnr.setText('');
								sap.ui.commons.MessageBox.alert("Input file type invalid.\n Please check your inputs and retry.");
								return ;
							}
							var chkSpclChar = oEvent.oSource.oFilePath.getValue().split('@');
							if(chkSpclChar.length > 1){
								oEvent.oSource.setValue('');
								oEvent.oSource.oFilePath.setValue('');
								oLblDNPicInnr.setText('');
								sap.ui.commons.MessageBox.alert("Input file name invalid.\n File name shold not contain special character '@' and '|'.\n Please check your inputs and retry.");
								return ;
							}
							
							chkSpclChar = oEvent.oSource.oFilePath.getValue().split('|');
							if(chkSpclChar.length > 1){
								oEvent.oSource.setValue('');
								oEvent.oSource.oFilePath.setValue('');
								oLblDNPicInnr.setText('');
								sap.ui.commons.MessageBox.alert("Input file name invalid.\n File name shold not contain special character '@' and '|'.\n Please check your inputs and retry.");
								return ;
							}
							
							/*chkSpclChar = oEvent.oSource.oFilePath.getValue().split('_');
							var objUtil = new utility();
				  			if(!objUtil.validateUnitNumber(chkSpclChar[0])){
				  				oEvent.oSource.setValue('');
								oEvent.oSource.oFilePath.setValue('');
								sap.ui.commons.MessageBox.alert("Input file Unit Number invalid.\n Please check your inputs and retry.");
								return ;
				  			}*/
							oLblDNPicInnr.setText(oEvent.oSource.getValue());
						}else
						{
							oLblDNPicInnr.setText('');	
						}
					}
				});
    	
    	//Images
    	var oImgBackIcnUDNPM = new sap.ui.commons.Image();
    	oImgBackIcnUDNPM.setSrc("images/back.png");
    	oImgBackIcnUDNPM.setAlt("Back picture");
		
    	var oImgFrontIcnUDNPM = new sap.ui.commons.Image();
    	oImgFrontIcnUDNPM.setSrc("images/front.png");
    	oImgFrontIcnUDNPM.setAlt("Front picture");
    	
    	var oImgBottomIcnUDNPM = new sap.ui.commons.Image();
    	oImgBottomIcnUDNPM.setSrc("images/bottom.png");
    	oImgBottomIcnUDNPM.setAlt("Bottom picture");
		
    	var oImgTopIcnUDNPM = new sap.ui.commons.Image();
    	oImgTopIcnUDNPM.setSrc("images/top.png");
    	oImgTopIcnUDNPM.setAlt("Front picture");
    	
         var centerText = new sap.ui.commons.TextView({text: 'Overview', design: sap.ui.commons.TextViewDesign.Bold });
         
         var oFlxBxVrtclTop = new sap.m.FlexBox({
             items: [ oImgTopIcnUDNPM, new sap.ui.commons.TextView({text: 'Top', design: sap.ui.commons.TextViewDesign.Bold })],
             direction: "Column",
           }); 
         
         
         var oFlxBxVrtclBottm = new sap.m.FlexBox({
             items: [new sap.ui.commons.TextView({text: 'Bottom', design: sap.ui.commons.TextViewDesign.Bold }),oImgBottomIcnUDNPM],
             direction: "Column",
           }); 
         
         var oFlxBxVrtclBack = new sap.m.FlexBox({
             items: [oImgBackIcnUDNPM, 
                     new sap.ui.commons.TextView({text: 'Back', design: sap.ui.commons.TextViewDesign.Bold })],
             direction: "Column",
           }); 
         
         var oFlxBxVrtclFront = new sap.m.FlexBox({
             items: [oImgFrontIcnUDNPM,
                     new sap.ui.commons.TextView({text: 'Front', design: sap.ui.commons.TextViewDesign.Bold })],
             direction: "Column",
           }); 
         
               // Flex Box       
         var oFlexBoxCenter = new sap.m.FlexBox({
                        items: [centerText,
                                oUplDNPicMulInner,
                                new sap.ui.commons.Label('idLblDNPicInner', {text: ''})],
                        direction: "Column",
                      }).addStyleClass("centerAlign"); 
               
               // Create a BorderLayout instance
               var oBorderLayoutInner = new sap.ui.commons.layout.BorderLayout("BorderLayoutInner", {width: "350px", height: "220px", 
                top: new sap.ui.commons.layout.BorderLayoutArea({
                        size: "20%",
                        contentAlign: "center",
                        visible: true, 
                        content: [oFlxBxVrtclTop]
                        }),
                bottom: new sap.ui.commons.layout.BorderLayoutArea({
                        size: "20%",
                        contentAlign: "center",
                        visible: true, 
                        content: [oFlxBxVrtclBottm]
                        }),
                begin: new sap.ui.commons.layout.BorderLayoutArea({
                        size: "9%",
                        contentAlign: "center",
                        visible: true, 
                        content: [oFlxBxVrtclBack]
                        }).addStyleClass("marginTop"),
                center: new sap.ui.commons.layout.BorderLayoutArea({
                        contentAlign: "center",
                        visible: true, 
                        //content: [new sap.ui.commons.TextView({text: 'Overview', design: sap.ui.commons.TextViewDesign.Bold }).addStyleClass("test")]
                        content: [oFlexBoxCenter]
                        }),
                end: new sap.ui.commons.layout.BorderLayoutArea({
                        size: "9%",
                        contentAlign: "center",
                        visible: true, 
                        content: [oFlxBxVrtclFront]
                        }).addStyleClass("marginTop")
                }).addStyleClass('backgroundBox');
               
               //FLEX FOR CREATING UPLOADER WITH LABLE
               var oFlxBxoUTRVrtclTop = new sap.m.FlexBox({
                   items: [oUplDNPicMulTop, new sap.ui.commons.Label('idLblDNPicTop', {text: ''})],
                   direction: "Column",
                 }); 
               
               var oFlxBxoUTRVrtclBottom = new sap.m.FlexBox({
                   items: [oUplDNPicMulBottom, new sap.ui.commons.Label('idLblDNPicBottom', {text: ''})],
                   direction: "Column",
                 }); 
               
               var oFlxBxoUTRVrtclFront = new sap.m.FlexBox({
                   items: [],
                   direction: "Column",
                 });
               
               var oBorderLayoutOuter = new sap.ui.commons.layout.BorderLayout("BorderLayoutOuter", {width: "590px", height: "350px", 
                       top: new sap.ui.commons.layout.BorderLayoutArea({
                               size: "18%",
                               contentAlign: "center",
                               visible: true, 
                               content: [oFlxBxoUTRVrtclTop]
                               }).addStyleClass("heightOuterElemnt"),
                       bottom: new sap.ui.commons.layout.BorderLayoutArea({
                               size: "18%",
                               contentAlign: "center",
                               visible: true, 
                               content: [oFlxBxoUTRVrtclBottom]
                               }).addStyleClass("marginTopOuter"),
                       begin: new sap.ui.commons.layout.BorderLayoutArea({
                               size: "20%",
                               //top:"40%",
                               contentAlign: "center",
                               visible: true, 
                               content: [oUplDNPicMulBack, 
                                         new sap.ui.commons.Label('idLblDNPicBack', {text: ''})]
                               }).addStyleClass("marginTopOuter"),
                       center: new sap.ui.commons.layout.BorderLayoutArea({
                               contentAlign: "center",
                               visible: true, 
                               content: [oBorderLayoutInner]
                               }).addStyleClass("borderBox"),
                       end: new sap.ui.commons.layout.BorderLayoutArea({
                               size: "20%",
                               contentAlign: "center",
                               visible: true, 
                               content: [oUplDNPicMulFront, 
                                         new sap.ui.commons.Label('idLblDNPicFront' ,{text: ''})]
                               }).addStyleClass("marginTopOuter")
                       }).addStyleClass("borderBox");
               
               // Responsive Grid Layout
            var oViewSalePicsLayout = new sap.ui.layout.form.ResponsiveGridLayout("idViewSalePicsLayout");
         
                 // Online Form Starts
                    var oViewSalePicsForm = new sap.ui.layout.form.Form("idViewSalePicsForm",{
                            layout: oViewSalePicsLayout,
                            formContainers: [new sap.ui.layout.form.FormContainer("idViewSalePicsFormC1",{
                                            formElements: [new sap.ui.layout.form.FormElement({fields: [oBorderLayoutOuter]})]
                                    	})]
                    });
                      return oViewSalePicsForm;
    }

});


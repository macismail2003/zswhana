jQuery.sap.require("sap.ui.model.json.JSONModel");
var ojsonUpldDNPicMultiStatus = [];

sap.ui.model.json.JSONModel.extend("UploadMultipleCertificate",
{

	//CHECK ALL FILE CONVERSION SUCCESS
	checkAllFileConverted: function (){
		var checkVal = true;
		if(ojsonUpldDNPicMultiStatus.length>0){
			for(var k=0; k < ojsonUpldDNPicMultiStatus.length; k++){
				if((ojsonUpldDNPicMultiStatus[k].status == "PENDING") || (ojsonUpldDNPicMultiStatus[k].status == "FAILED")
						|| (ojsonUpldDNPicMultiStatus[k].status == "START"))
					checkVal = false;
			}
		}
		return checkVal;
	},
	
	//CHECK FILE ALREADY PROCESSED OR NOT FOR MULTIPLE FILE WITH SINGLE CONTROL CALLED BY makeJsonForBinaryDataMultiple
	checkExistInJsnMultiple: function(uploaderFileName){
		for(var j=0; j <ojsonUpldDNPicMultiStatus.length;j++){
			if(ojsonUpldDNPicMultiStatus[j].fileSelName == uploaderFileName){
				return false;
				break;
			}
		}
		return true;
	},
	
	//MAKE JSON FOR MULTIPLE FILE WITH SINGLE CONTROL CALLED BY BUTTON CLICK
	makeJsonForBinaryDataMultiple: function(){
		function padZero(num, size) {
		    var s = num+"";
		    while (s.length < size) s = "0" + s;
		    return s;
		};
		
		var oFileMultiple = sap.ui.getCore().byId("idUploadMultipleCertificate");
	
		for(var i = 0; i< oFileMultiple.oFileUpload.files.length; i++){
			var retnVal = true;
			
			if(ojsonUpldDNPicMultiStatus.length > 0)
				retnVal = this.checkExistInJsnMultiple(oFileMultiple.oFileUpload.files[i].name);
			
			if(!retnVal){
				continue;
			}
			ojsonUpldDNPicMultiStatus.push({
				'lineno': padZero(i+1,2) ,
				'fileSelName': oFileMultiple.oFileUpload.files[i].name ,
				"binarydata" : "",
				"status" : 'PENDING'
			});
			
			var oFReader = new FileReader();
			oFReader.readAsDataURL(oFileMultiple.oFileUpload.files[i]);
			oFReader.onload = function (oFREvent) {
				ojsonUpldDNPicMultiStatus[i].status = "SUCCESS";
				ojsonUpldDNPicMultiStatus[i].binarydata = oFReader.result.substring(28); //oFileMultiple.oFileUpload.files[i].name +'-data-' +oFReader.result.substring(28);
				var oCurnFile = new UploadMultipleCertificate();
				oCurnFile.makeJsonForBinaryDataMultiple();
			},
			oFReader.onerror = function (err){
				ojsonUpldDNPicMultiStatus[i].status = "FAILED";
			};
			break;
		}
		
		//CALL ONLINE PUT ODATA REQUEST
		if(this.checkAllFileConverted()){
			
			var IFilename1='', IFilename2 ='', IFilename3 ='', IFilename4 ='', IFilename5 ='',	binaryDataArry = [];
			for(var i =0; i < ojsonUpldDNPicMultiStatus.length; i++){
				if(i<5){
					IFilename1 +=	ojsonUpldDNPicMultiStatus[i].fileSelName + '|';
				}else if(i < 10){
					IFilename2 +=  ojsonUpldDNPicMultiStatus[i].fileSelName + '|';
				}else if(i < 15){
					IFilename3 +=  ojsonUpldDNPicMultiStatus[i].fileSelName + '|';
				}else if(i < 20){
					IFilename4 +=  ojsonUpldDNPicMultiStatus[i].fileSelName + '|';
				}else if(i < 25){
					IFilename5 +=  ojsonUpldDNPicMultiStatus[i].fileSelName + '|';
				}
				
				binaryDataArry.push({
					"File": ojsonUpldDNPicMultiStatus[i].binarydata
				});
			};
			
			for(j=binaryDataArry.length;j< 25;j++){
				binaryDataArry.push({
					"File": ""
				});
			};
			
			var oDataPostParam = {   
	    			Id : "1",
	    			IFilename1 : IFilename1,
	    			IFilename2 : IFilename2,
	    			IFilename3 : IFilename3,
	    			IFilename4 : IFilename4,
	    			IFilename5 : IFilename5,
	    			
	    			IFile1 : binaryDataArry[0].File,
	    			IFile2 : binaryDataArry[1].File,
	    			IFile3 : binaryDataArry[2].File,
	    			IFile4 : binaryDataArry[3].File,
	    			IFile5 : binaryDataArry[4].File,

	    			IFile6 : binaryDataArry[5].File,
	    			IFile7 : binaryDataArry[6].File,
	    			IFile8 : binaryDataArry[7].File,
	    			IFile9 : binaryDataArry[8].File,
	    			IFile10 : binaryDataArry[9].File,
	    			

	    			IFile11 : binaryDataArry[10].File,
	    			IFile12 : binaryDataArry[11].File,
	    			IFile13 : binaryDataArry[12].File,
	    			IFile14 : binaryDataArry[13].File,
	    			IFile15 : binaryDataArry[14].File,
	    			

	    			IFile16 : binaryDataArry[15].File,
	    			IFile17 : binaryDataArry[16].File,
	    			IFile18 : binaryDataArry[17].File,
	    			IFile19 : binaryDataArry[18].File,
	    			IFile20 : binaryDataArry[19].File,
	    			

	    			IFile21 : binaryDataArry[20].File,
	    			IFile22 : binaryDataArry[21].File,
	    			IFile23 : binaryDataArry[22].File,
	    			IFile24 : binaryDataArry[23].File,
	    			IFile25 : binaryDataArry[24].File,
                 };
			
			//AFTER SETTING PUT DATA DO ONLINE REQUEST FOR UPLOAD FILE
			var oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
			var urlToCall = serviceUrl + "/Upload_Multiple_Certificate('1')";
			var objCurnt = new UploadMultipleCertificate();
			var objUtil = new utility();
		    objUtil.doOnlinePostData(urlToCall, oDataPostParam, objCurnt.onlinesuccessfunUpload, objCurnt.onlineerrorfunUpload);
		}
	},
	
//SUCCESS UPLOAD
onlinesuccessfunUpload: function(resultdata, response){
		//busyDialog.close();
		busyDialog.close();
		try{
			if(response != undefined){
				if(response.statusCode == '204'){
					var oFileUpldrSnglCert = sap.ui.getCore().byId("idUploadMultipleCertificate");
					oFileUpldrSnglCert.setValue('');
					oFileUpldrSnglCert.oFilePath.setValue('');
					oFileUpldrSnglCert.destroyParameters();
					oFileUpldrSnglCert.setAdditionalData('');
					
					var oTbl = sap.ui.getCore().byId("idTblSelfileUpld");
					if (oTbl != undefined) {
						oTbl.destroy();
					}
					
					sap.ui.commons.MessageBox.alert("Files uploaded successfully.");
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
	
onlineerrorfunUpload: function(err){
	errorfromServer(err);
},
	
getOnlineDataUpload: function(){
	try{
		function padZero(num, size) {
		    var s = num+"";
		    while (s.length < size) s = "0" + s;
		    return s;
		}
		
		var oFileUpldrSnglCert = sap.ui.getCore().byId("idUploadMultipleCertificate");
		if((oFileUpldrSnglCert.getValue() == '') || (oFileUpldrSnglCert.oFilePath.getValue() == ''))
		{
			sap.ui.commons.MessageBox.alert("File input missing." + "\n Please check your inputs and retry." );
			return false;
		}
		ojsonUpldDNPicMultiStatus.length = 0;	//RESET FOR UPLOAD FILE
		busyDialog.open();
		oFileUpldrSnglCert.destroyParameters();
		oFileUpldrSnglCert.setAdditionalData('');
		var objCurnt = new UploadMultipleCertificate();
		objCurnt.makeJsonForBinaryDataMultiple();
		
		/*var urlToCall = serviceUrl + "/Upload_multiple_certificate?$filter=IFilename1 eq '" + filevar1 + "' and IFilename2 eq '" + filevar2 + "' and IFilename3 eq '" + filevar3 + "' and IFilename4 eq '" + filevar4 + "' and IFilename5 eq '" + filevar5 + "'";
		
		var objUtil = new utility();
	    objUtil.doOnlineRequest(urlToCall, objCurnt.onlinesuccessfunUpload, objCurnt.onlineerrorfunUpload);*/

	}catch(e){
		busyDialog.close();
		sap.ui.commons.MessageBox.alert("Error on uploading file " + e);
	}
},
	
	loadUploadMultipleCertificate : function() {
						jQuery.sap.require("sap.ui.commons.MessageBox");
						//jQuery.sap.require("sap.ui.commons.AutoComplete");
						//jQuery.sap.require("sap.ui.commons.ListBox");
						//jQuery.sap.require("sap.ui.commons.DropdownBox");

						function fnResetCallbackMsgBox(sResult){
							if(sResult == "YES"){
								var oTbl = sap.ui.getCore().byId("idTblSelfileUpld");
								if (oTbl != undefined) {
									oTbl.destroy();
								}
								
								var oUpldSnglCertificate  = sap.ui.getCore().byId("idUploadMultipleCertificate");
								oUpldSnglCertificate.setValue('');
								oUpldSnglCertificate.oFilePath.setValue('');
							}
						};
						
						// var vFileSelUpldTbl = this.createFileSelUpldTbl();
						var vFileNameCnvtnTbl = this.createFileNameCnvtnTbl();
						var btnUpload = new sap.m.Button(
								"idbtnUpldMultCert", {
									text : "Upload",
									width:"80px",
									styled:false,
									layoutData: new sap.ui.layout.GridData({span: "L2 M2 S4",linebreak: false, margin: true}),
									press : this.getOnlineDataUpload
								}).addStyleClass("submitBtn");

						var ResetMessage = "This will clear the screen content.\n Do you want to continue?"
						var oBtnResetUpldMultCert = new sap.m.Button("idBtnResetUpldMultCert",{
						          text : "Reset",
						          width:"80px",
						          styled:false,
						          layoutData: new sap.ui.layout.GridData({span: "L2 M2 S4",linebreak: false, margin: true}),
						          press:function(){
						        	  			sap.ui.commons.MessageBox.show(ResetMessage,sap.ui.commons.MessageBox.Icon.WARNING,"Warning",
						        		  		[sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO],
						        		  		fnResetCallbackMsgBox, sap.ui.commons.MessageBox.Action.YES);
						          }}).addStyleClass("submitBtn");
						
						var lblSpace = new sap.ui.commons.Label( {text: " ",width : '8px'});
						// Flex Box
				    	var oFlexbxUNPB = new sap.m.FlexBox({
				    	      items: [btnUpload, lblSpace, oBtnResetUpldMultCert],
				    	      direction: "Row"
				    	    });
				    	
				    	// Labels
					       var labStar = new sap.ui.commons.Label({text: "* "}).addStyleClass("MandatoryStar");
					       var lblSpaceLegend = new sap.ui.commons.Label( {text: " ",width : '5px'});
							  var labRequired = new sap.ui.commons.Label({text: " Mandatory Field",wrapping: true});
							  var oFlexboxReq = new sap.m.FlexBox({
								 // layoutData: new sap.ui.layout.GridData({span: "L7 M6 S4"}),
					              items: [labStar,lblSpaceLegend,labRequired],
					              direction: "Row"
							  }).addStyleClass("marginTop10");
				    	
						var oResGrdLoutMulCert = new sap.ui.layout.form.ResponsiveGridLayout(
								"idResGrdLoutMulCert",{breakpointL: 700,
									  breakpointM: 400});

						var oUploadMultipleCertificate = new sap.ui.commons.FileUploader(
								"idUploadMultipleCertificate",
								{
									name : "uploadfileData",
									uploadUrl : "UploadServlet",
									value : "",
									buttonText : " Browse ",
									layoutData: new sap.ui.layout.GridData({span: "L12 M12 S12",linebreak: false, margin: true}),
									sameFilenameAllowed : false,
									additionalData : "abc=123&test=456",
									change : function(oEvent) {
										var oTbl = sap.ui.getCore().byId("idTblSelfileUpld");
										if (oTbl != undefined) {
											oTbl.destroy();
										}
										//CHECK FILE EXTENTION
										var files = oEvent.oSource.oFileUpload.files; // $('#oUploadMultipleCertificate-fu');
										var valid = true;
										if (files != undefined) {	//INSIDE COMES FOR OTHER THAN IE BROWSER 
											for ( var i = 0; i < files.length; i++) {
												var ext = oEvent.oSource.oFileUpload.files[i].name.split('.').pop().toLowerCase();
												if($.inArray(ext, ['pdf']) == -1) {
													valid = false;
													oEvent.oSource.setValue('');
													oEvent.oSource.oFilePath.setValue('');
													oEvent.oSource.destroyParameters();
													sap.ui.commons.MessageBox.alert("Input file type invalid.\n Please check your inputs and retry.");
													break;
												}
												
												var chkSpclChar = oEvent.oSource.oFileUpload.files[i].name.split('@');
												if(chkSpclChar.length > 1){
													oEvent.oSource.setValue('');
													oEvent.oSource.oFilePath.setValue('');
													sap.ui.commons.MessageBox.alert("Input file name invalid.\n File name shold not contain special character '@' and '|'.\n Please check your inputs and retry.");
													return false;
												}
												
												chkSpclChar = oEvent.oSource.oFileUpload.files[i].name.split('|');
												if(chkSpclChar.length > 2){
													oEvent.oSource.setValue('');
													oEvent.oSource.oFilePath.setValue('');
													sap.ui.commons.MessageBox.alert("Input file name invalid.\n File name shold not contain special character '@' and '|'.\n Please check your inputs and retry.");
													return false;
												}
												//UNCOMMENT FOR CHECK VALIDATION UNIT NUMBER AND DATE
											/*	chkSpclChar = oEvent.oSource.oFileUpload.files[i].name.split('_');
												if(chkSpclChar.length < 3){
													oEvent.oSource.setValue('');
													oEvent.oSource.oFilePath.setValue('');
													sap.ui.commons.MessageBox.alert("Input file Name invalid.\n Please check your inputs and retry.");
													return ;
												}
												var objUtil = new utility();
									  			if(!objUtil.validateUnitNumber(chkSpclChar[0])){
									  				oEvent.oSource.setValue('');
													oEvent.oSource.oFilePath.setValue('');
													sap.ui.commons.MessageBox.alert("Input file Unit Number invalid.\n Please check your inputs and retry.");
													return ;
									  			}
									  			
									  			if(!objUtil.validateDateWithotSeprtr(chkSpclChar[1])){
									  				oEvent.oSource.setValue('');
													oEvent.oSource.oFilePath.setValue('');
													sap.ui.commons.MessageBox.alert("Input file Date invalid.\n Please check your inputs and retry.");
													return ;
									  			}*/
											}
											// oEvent.oSource.oFileUpload.files
										}

										//CREATE TABLE FOR SELECTED TABLE
										if(valid){
											var oUploadMultipleCertificate = new UploadMultipleCertificate();
											var vFileSelUpldTbl = oUploadMultipleCertificate.createFileSelUpldTbl(oEvent);
	
											var oFrmElmntFrmFSelU = sap.ui.getCore().byId("idFrmElmntFrmFSelU");
											oFrmElmntFrmFSelU.insertField(vFileSelUpldTbl, 0);
										}
									}
								});

						// oUploadMultipleCertificate.setAttribute('Multiple','true');
						// oUpldSnglCertificate.setUseMultipart(true);
						// Create a ComboBox
						var oLblSelFile =new sap.ui.commons.Label("idLblSelFile", {text: "Select Files for Uploading: ",
							required:true}).addStyleClass("sapUiLbl floatLeft");

						var ofrmUpldMultFile = new sap.ui.layout.form.Form(
								"F1",
								{
									layout : oResGrdLoutMulCert,
									formContainers : [
											new sap.ui.layout.form.FormContainer(
													"SelFileUpldMultCert",
													{
														formElements : [
																new sap.ui.layout.form.FormElement(
																		{
																			//label : oLblSelFile,
																		fields : [ oLblSelFile ],
																		layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
																		}),
																		new sap.ui.layout.form.FormElement(
																				{
																					label : "",
																				}),
																new sap.ui.layout.form.FormElement(
																		{
																			fields : [oUploadMultipleCertificate],
																			layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
																		}),
																		new sap.ui.layout.form.FormElement(
																				{
																					label : "",
																				}),
																new sap.ui.layout.form.FormElement("idFrmElmntFrmFSelU",
																		{
																			fields : [],
																			layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
																		}),
																new sap.ui.layout.form.FormElement(
																		{
																			label : "",
																		}),
																new sap.ui.layout.form.FormElement(
																		{
																			fields : [ oFlexbxUNPB ],
																			layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
																		}),
																new sap.ui.layout.form.FormElement(
																		{
																			fields : [ oFlexboxReq ],
																			layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
																		}),
																new sap.ui.layout.form.FormElement(
																		{
																			fields : [new sap.ui.commons.Label({text: "Support Format: PDF"}).addStyleClass("font11 WarningMessage")],
																			layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
																		}),
																new sap.ui.layout.form.FormElement(
																				{
																					label : "",
																				}),
																new sap.ui.layout.form.FormElement(
																		{
																			fields : [vFileNameCnvtnTbl],
																			layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
																		})
																		]
													}) ]
								});
						// this.uploadFileFun();
						return ofrmUpldMultFile;
			},

			createFileSelUpldTbl : function(oEvent) {
						var vFilePath = "";
						var objutil = new utility();
						var jsonNwFileNm =	objutil.uploadFileChange(oEvent,"UploadMultipleCertificate", vFilePath);
						
						var oTbl = sap.ui.getCore().byId("idTblSelfileUpld");
						
						if (oTbl != undefined) {
							oTbl.destroy();
						}

						var oFileSelUpldTbl = new sap.ui.table.Table(
								'idTblSelfileUpld',
								{
									visibleRowCount: 0,
									firstVisibleRow : 3,
									columnHeaderHeight : 30,
									selectionMode : sap.ui.table.SelectionMode.None,
									navigationMode : sap.ui.table.NavigationMode.None,
									layoutData: new sap.ui.layout.GridData({span: "L7 M10 S12",linebreak: true, margin: false}),
									//width : "74.5%",
								}).addStyleClass('tblBorder');
						if(jsonNwFileNm.length > 25){
							oFileSelUpldTbl.setVisibleRowCount(25);
							oFileSelUpldTbl.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
						}else{
							oFileSelUpldTbl.setVisibleRowCount(jsonNwFileNm.length);
						}
						
						

						// Define the columns and the control templates to be
						// used
						oFileSelUpldTbl.addColumn(new sap.ui.table.Column({
							label : new sap.ui.commons.Label({
								text : "Files Selected for Uploading"
							}),
							template : new sap.ui.commons.TextView()
									.bindProperty("text", "newfilename"),
							hAlign : "Center"
						}));

						// Create a model and bind the table rows to this model
						var oModel = new sap.ui.model.json.JSONModel();
						oModel.setData({
							modelData : jsonNwFileNm
						});
						oFileSelUpldTbl.setModel(oModel);
						oFileSelUpldTbl.bindRows("/modelData");

						return oFileSelUpldTbl;
		},

		createFileNameCnvtnTbl : function() {
						var aData = [ {
							certificate : "Construction Certificate",
							namingcnvntn : "GESU1234567_09072013_IIC.pdf"
						}, {
							certificate : "Tank Cleaning Certificate ",
							namingcnvntn : "GESU1234567_09072013_NCC.pdf"
						}, {
							certificate : "Tank Calibration Chart",
							namingcnvntn : "GESU1234567_09072013_CAL.pdf"
						}, {
							certificate : "Japanese Fire Certificate",
							namingcnvntn : "GESU1234567_09072013_JFA.pdf"
						}, {
							certificate : "Reefer Cleaning Certificate",
							namingcnvntn : "GESU1234567_09072013_1405_RCC.pdf"
						}, {
							certificate : "Reefer Laboratory Certificate",
							namingcnvntn : "GESU1234567_09072013_1405_RLC.pdf"
						}];

						var oFileNameCnvtnTbl = new sap.ui.table.Table("idtblFnamCnvUMCert",
								{
									columnHeaderHeight : 30,
									visibleRowCount : 6,
									firstVisibleRow : 3,
									fixedColumnCount: 1,
									selectionMode : sap.ui.table.SelectionMode.None,
									navigationMode : sap.ui.table.NavigationMode.Scrollbar,
								}).addStyleClass('tblBorder');
						/*oFileNameCnvtnTbl.addExtension(new sap.m.Label({
							text : "File Naming Guidlines",
							design : sap.m.LabelDesign.Bold
						}));
						*/
					var hdrTbl = new sap.m.Label({
							text : "File Naming Guidelines",
							design : sap.m.LabelDesign.Bold
						});
						var oFlexboxUpload = new sap.m.FlexBox({
				    	    	items: [hdrTbl,oFileNameCnvtnTbl],
								direction: "Column",
								layoutData: new sap.ui.layout.GridData({span: "L7 M10 S12",linebreak: true, margin: false}),
				    	    });
						
						// Define the columns and the control templates to be
						// used
						oFileNameCnvtnTbl.addColumn(new sap.ui.table.Column({
							wrapping: true,
							label : new sap.ui.commons.Label({
								text : "Document Type"
							}),
							template : new sap.ui.commons.TextView()
									.bindProperty("text", "certificate"),
							resizable:false,
							width:"180px"
						}));

						oFileNameCnvtnTbl.addColumn(new sap.ui.table.Column(
										{
											width:"270px",
											wrapping: true,
										resizable:false,
										label : new sap.ui.commons.TextView(
													{
														text : "Seaco File Naming Standard",
														wrapping: true
													}).addStyleClass('sapUiLbl'),
											template : new sap.ui.commons.TextView()
													.bindProperty("text","namingcnvntn"),
											hAlign : "Left"
										}));

						// Create a model and bind the table rows to this model
						var oModel = new sap.ui.model.json.JSONModel();
						oModel.setData({
							modelData : aData
						});
						oFileNameCnvtnTbl.setModel(oModel);
						oFileNameCnvtnTbl.bindRows("/modelData");

						return oFlexboxUpload;
					}
				});
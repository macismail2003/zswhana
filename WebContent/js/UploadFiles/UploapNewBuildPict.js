jQuery.sap.require("sap.ui.model.json.JSONModel");
var ojsonUpldNewBldPicStatus = [];
sap.ui.model.json.JSONModel.extend("UploapNewBuildPict",
	{
	//CHECK ALL FILE CONVERSION SUCCESS
	checkAllFileConverted: function (){
		var checkVal = true;
		if(ojsonUpldNewBldPicStatus.length>0){
			for(var k=0; k < ojsonUpldNewBldPicStatus.length; k++){
				if((ojsonUpldNewBldPicStatus[k].status == "PENDING") || (ojsonUpldNewBldPicStatus[k].status == "FAILED")
						|| (ojsonUpldNewBldPicStatus[k].status == "START"))
					checkVal = false;
			}
		}
		return checkVal;
	},
	
	//CHECK FILE ALREADY PROCESSED OR NOT FOR MULTIPLE FILE WITH SINGLE CONTROL CALLED BY makeJsonForBinaryDataNewBldPic
	checkExistInJsnMultiple: function(uploaderFileName){
		for(var j=0; j <ojsonUpldNewBldPicStatus.length;j++){
			if(ojsonUpldNewBldPicStatus[j].fileSelName == uploaderFileName){
				return false;
				break;
			}
		}
		return true;
	},
	
	//MAKE JSON FOR MULTIPLE FILE WITH SINGLE CONTROL CALLED BY BUTTON CLICK
	makeJsonForBinaryDataNewBldPic: function(){
		function padZero(num, size) {
		    var s = num+"";
		    while (s.length < size) s = "0" + s;
		    return s;
		};
		
		var oFileMultiple = sap.ui.getCore().byId("idUpldNBP");
	
		for(var i = 0; i< oFileMultiple.oFileUpload.files.length; i++){
			var retnVal = true;
			
			if(ojsonUpldNewBldPicStatus.length > 0)
				retnVal = this.checkExistInJsnMultiple(oFileMultiple.oFileUpload.files[i].name);
			
			if(!retnVal){
				continue;
			}
			ojsonUpldNewBldPicStatus.push({
				'lineno': padZero(i+1,2) ,
				'fileSelName': oFileMultiple.oFileUpload.files[i].name ,
				"binarydata" : "",
				"status" : 'PENDING'
			});
			
			var oFReader = new FileReader();
			oFReader.readAsDataURL(oFileMultiple.oFileUpload.files[i]);
			oFReader.onload = function (oFREvent) {
				ojsonUpldNewBldPicStatus[i].status = "SUCCESS";
				ojsonUpldNewBldPicStatus[i].binarydata = oFReader.result.substring(22); //oFileMultiple.oFileUpload.files[i].name +'-data-' +oFReader.result.substring(28);
				var oCurnFile = new UploapNewBuildPict();
				oCurnFile.makeJsonForBinaryDataNewBldPic();
			},
			oFReader.onerror = function (err){
				ojsonUpldNewBldPicStatus[i].status = "FAILED";
			};
			break;
		}
		
		//CALL ONLINE PUT ODATA REQUEST
		if(this.checkAllFileConverted()){
			
			var IFilename1='', IFilename2 ='', IFilename3 ='', IFilename4 ='', IFilename5 ='',	binaryDataArry = [];
			for(var i =0; i < ojsonUpldNewBldPicStatus.length; i++){
				if(i<5){
					IFilename1 +=	ojsonUpldNewBldPicStatus[i].fileSelName + '|';
				}else if(i < 10){
					IFilename2 +=  ojsonUpldNewBldPicStatus[i].fileSelName + '|';
				}else if(i < 15){
					IFilename3 +=  ojsonUpldNewBldPicStatus[i].fileSelName + '|';
				}else if(i < 20){
					IFilename4 +=  ojsonUpldNewBldPicStatus[i].fileSelName + '|';
				}else if(i < 25){
					IFilename5 +=  ojsonUpldNewBldPicStatus[i].fileSelName + '|';
				}
				
				binaryDataArry.push({
					"File": ojsonUpldNewBldPicStatus[i].binarydata
				});
			};
			
			for(j=binaryDataArry.length;j< 25;j++){
				binaryDataArry.push({
					"File": ""
				});
			};
			
			var oDataPostParam = {   
	    			Id : "1",
	    			IDepoCode: "1184",
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
			var urlToCall = serviceUrl + "/NewBuild_Upload('1')";
			var objCurnt = new UploapNewBuildPict();
			var objUtil = new utility();
		    objUtil.doOnlinePostData(urlToCall, oDataPostParam, objCurnt.onlinesuccessfunUpload, objCurnt.onlineerrorfunUpload);
		}
	},
	
onlinesuccessfunUpload: function(resultdata, response){
	busyDialog.close();
	try{
		if(response != undefined){
			if(response.statusCode == '204'){
				var oFileUpldrSnglCert = sap.ui.getCore().byId("idUpldNBP");
				oFileUpldrSnglCert.setValue('');
				oFileUpldrSnglCert.oFilePath.setValue('');
				oFileUpldrSnglCert.destroyParameters();
				oFileUpldrSnglCert.setAdditionalData('');
				
				var oTbl = sap.ui.getCore().byId("idTblSelfileUpldNBP");
				if (oTbl != undefined) {
					oTbl.destroy();
				}
				
				sap.ui.commons.MessageBox.alert("New Build pictures uploaded successfully.");
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
		
		var oFileUpldrSnglCert = sap.ui.getCore().byId("idUpldNBP");
	
		if((oFileUpldrSnglCert.getValue() == '') || (oFileUpldrSnglCert.oFilePath.getValue() == ''))
		{
			sap.ui.commons.MessageBox.alert("File input missing." + "\n Please check your inputs and retry." );
			return false;
		}
		
		busyDialog.open();
		oFileUpldrSnglCert.destroyParameters();
		oFileUpldrSnglCert.setAdditionalData('');
		var objCurnt = new UploapNewBuildPict();
		objCurnt.makeJsonForBinaryDataNewBldPic();
		

	}catch(e){
		busyDialog.close();
		sap.ui.commons.MessageBox.alert("Error on uploading file " + e);
	}
},

loadUploapNewBuildPict : function() {
						jQuery.sap.require("sap.ui.commons.MessageBox");
						//jQuery.sap.require("sap.ui.commons.AutoComplete");
						//jQuery.sap.require("sap.ui.commons.ListBox");
						//jQuery.sap.require("sap.ui.commons.DropdownBox");

						// var vFileSelUpldTbl = this.createFileSelUpldTbl();
						var ResetMessage = "This will clear the screen content.\n Do you want to continue?"
							
						function fnResetCallbackMsgBox(sResult){
							if(sResult == "YES"){
								var oTbl = sap.ui.getCore().byId("idTblSelfileUpldNBP");
								if (oTbl != undefined) {
									oTbl.destroy();
								}
								
								var oUpldNBP  = sap.ui.getCore().byId("idUpldNBP");
								oUpldNBP.setValue('');
								oUpldNBP.oFilePath.setValue('');
							}
						};
						
						var vFileNameCnvtnTblUNBPic = this.createFileNameCnvtnTblUNBPic();
						
						var btnUpload = new sap.m.Button("idbtnUNBP", {
									text : "Upload",
									styled:false,
									width : '80px',
									//layoutData: new sap.ui.layout.GridData({span: "L1 M2 S4",linebreak: false, margin: true}),
									press : this.getOnlineDataUpload
								}).addStyleClass("submitBtn");

						var oBtnUploadNewBldPicReset = new sap.m.Button("idBtnUploadNewBldPicReset",{
					          text : "Reset",
					          styled:false,
					          width : '80px',
					          //layoutData: new sap.ui.layout.GridData({span: "L1 M2 S4",linebreak: false, margin: true}),
					          press:function(){
					        	  sap.ui.commons.MessageBox.show(ResetMessage,sap.ui.commons.MessageBox.Icon.WARNING,"Warning",
					  		  				[sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO], 
					  		  				fnResetCallbackMsgBox,
					  		  				sap.ui.commons.MessageBox.Action.YES);
					        	  
					          }}).addStyleClass("submitBtn");
						var lblSpace = new sap.ui.commons.Label( {text: " ",width : '8px'});
						// Flex Box
				    	var oFlexbxUNPB = new sap.m.FlexBox({
				    	      items: [btnUpload, lblSpace, oBtnUploadNewBldPicReset],
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
					       
				    	
						var oResGrdLoutMulCert = new sap.ui.layout.form.ResponsiveGridLayout("idGrdLoutUNBP",{breakpointL: 700,
							  breakpointM: 400});

						var oUpldNewBldPic = new sap.ui.commons.FileUploader("idUpldNBP",
								{
									name : "uploadfileData",
									uploadUrl : "UploadServlet",
									value : "",
									buttonText : " Browse ",
									sameFilenameAllowed : false,
									additionalData : "abc=123&test=456",
									change : function(oEvent) {
										var oTbl = sap.ui.getCore().byId("idTblSelfileUpldNBP");
										if (oTbl != undefined) {
											oTbl.destroy();
										}
										//CHECK FILE EXTENTION
										var files = oEvent.oSource.oFileUpload.files; // $('#oUploadMultipleCertificate-fu');
										var valid = true;
										if (files != undefined) {	//INSIDE COMES FOR OTHER THAN IE BROWSER 
											for ( var i = 0; i < files.length; i++) {
												var ext = oEvent.oSource.oFileUpload.files[i].name.split('.').pop().toLowerCase();
												if($.inArray(ext, ['jpeg','png','gif','jpg']) == -1) {
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
												
												chkSpclChar = oEvent.oSource.oFileUpload.files[i].name.split('_');
												var objUtil = new utility();
									  			if(!objUtil.validateUnitNumber(chkSpclChar[0])){
									  				oEvent.oSource.setValue('');
													oEvent.oSource.oFilePath.setValue('');
													sap.ui.commons.MessageBox.alert("Input file Unit Number invalid.\n Please check your inputs and retry.");
													return ;
									  			}
												
											}
											// oEvent.oSource.oFileUpload.files
										}
										
										//CREATE TABLE FOR SELECTED FILE
										if(valid){
											var oCrntFile = new UploapNewBuildPict();
											var vFileSelUpldTbl = oCrntFile.createFileSelUpldTbl(oEvent);
	
											var oFrmElmntFrmFSelU = sap.ui.getCore().byId("idFrmUNBPElmntFrmFSelU");
											oFrmElmntFrmFSelU.insertField(vFileSelUpldTbl, 0);
										}
									}
								});

						// oUpldNewBldPic.setAttribute('Multiple','true');
						// oUpldSnglCertificate.setUseMultipart(true);
						// Create a ComboBox
						var oLblSelFileUNBP =new sap.ui.commons.Label("idLblSelFileUNBP", {text: "Select Pictures for Uploading: ",
									required:true,
									wrapping: true}).addStyleClass("sapUiLbl floatLeft");
						
						var ofrmUpldMultFile = new sap.ui.layout.form.Form({
									layout : oResGrdLoutMulCert,
									formContainers : [
											new sap.ui.layout.form.FormContainer(
													"idSelFileUpldNwBldPic",
													{
														formElements : [
																new sap.ui.layout.form.FormElement(
																		{
																			//label : oLblSelFile,
																		fields : [ oLblSelFileUNBP ],
																		layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
																		}),
																		new sap.ui.layout.form.FormElement(
																				{
																					label : "",
																				}),
																new sap.ui.layout.form.FormElement(
																		{
																			fields : [oUpldNewBldPic],
																			layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
																		}),
																		new sap.ui.layout.form.FormElement(
																				{
																					label : "",
																				}),
																new sap.ui.layout.form.FormElement("idFrmUNBPElmntFrmFSelU",
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
																			fields : [new sap.ui.commons.Label({text: "Support Formats: PNG, JPEG, GIF"}).addStyleClass("font11 WarningMessage")],
																			layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
																		}),
																new sap.ui.layout.form.FormElement(
																				{
																					label : "",
																				}),
																new sap.ui.layout.form.FormElement(
																		{
																			fields : [vFileNameCnvtnTblUNBPic],
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
					var jsonNwFileNm =	objutil.uploadFileChange(oEvent,"UploapNewBuildPict", vFilePath);
					
					var oTbl = sap.ui.getCore().byId("idTblSelfileUpldNBP");
					if (oTbl != undefined) {
						oTbl.destroy();
					}
	
					var oFileSelUpldTbl = new sap.ui.table.Table(
							'idTblSelfileUpldNBP',
							{
								visibleRowCount: 0,
								firstVisibleRow : 3,
								columnHeaderHeight : 30,
								selectionMode : sap.ui.table.SelectionMode.None,
								navigationMode : sap.ui.table.NavigationMode.None,
								//width : "50%",
								height : "100%",
								layoutData: new sap.ui.layout.GridData({span: "L7 M8 S12",linebreak: true, margin: false}),
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
							text : "Pictures Selected For Uploading"
						}),
						template : new sap.ui.commons.TextView()
								.bindProperty("text", "newfilename"),
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
		
		createFileNameCnvtnTblUNBPic : function() {
			var aDataFileNGuidUNBPic = [ {
				certificate : "New Build Picture",
				namingcnvntn : "<Unit_Number>_<Test_Date>_<FactoryID>_<Sequence>_NBP\n eg. GESU1234567_09072013_9105_01_NBP.jpg"
			}];
	
			var oFileNameCnvtnTblUNBPic = new sap.ui.table.Table("idtblFnamCnvtnUNBPic",
					{
						columnHeaderHeight : 30,
						visibleRowCount : 1,
						firstVisibleRow : 3,
						fixedColumnCount: 1,
						selectionMode : sap.ui.table.SelectionMode.None,
						navigationMode : sap.ui.table.NavigationMode.Scrollbar,
						//width : "50%",
					}).addStyleClass('tblBorder');
	
			var hdrTbl = new sap.m.Label({
				text : "File Naming Guidelines",
				design : sap.m.LabelDesign.Bold
			});
			
			// Define the columns and the control templates to be
			// used
			oFileNameCnvtnTblUNBPic.addColumn(new sap.ui.table.Column({
				wrapping: true,
				label : new sap.ui.commons.Label({
					text : "Document Type"
				}).addStyleClass("wraptextcol"),
				template : new sap.ui.commons.TextView()
						.bindProperty("text", "certificate"),
				resizable:false,
				width:"130px"
			}));
	
			oFileNameCnvtnTblUNBPic.addColumn(new sap.ui.table.Column(
							{
								width:"365px",
								wrapping: true,
							resizable:false,
							label : new sap.ui.commons.TextView(
										{	text : "Seaco File Naming Standard"}).addStyleClass("wraptextcol"),
								template : new sap.ui.commons.TextView().addStyleClass('wraptext')
										.bindProperty("text","namingcnvntn"),
								hAlign : "Left"
							}));
	
			// Create a model and bind the table rows to this model
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData({
				modelData : aDataFileNGuidUNBPic
			});
			oFileNameCnvtnTblUNBPic.setModel(oModel);
			oFileNameCnvtnTblUNBPic.bindRows("/modelData");
	
			var oFlxBxUpldNwBldPic = new sap.m.FlexBox({
	    	      items: [hdrTbl,oFileNameCnvtnTblUNBPic],
						direction: "Column",
						layoutData: new sap.ui.layout.GridData({span: "L7 M10 S12",linebreak: true, margin: false})
	    	    });
			
			return oFlxBxUpldNwBldPic;
	}
});
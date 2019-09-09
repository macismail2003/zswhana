/******** NP *******/
jQuery.sap.require("sap.ui.model.json.JSONModel");

var ojsonUpldDNPicSnglStatus = [];

sap.ui.model.json.JSONModel.extend("uploadDNPictures", {

	//MAKE JSON FOR SINGLE CONTROL CALLED BY BUTTON CLICK
	makeJsonForBinaryDataSingle: function(){
		try{
			busyDialog.open();
			ojsonUpldDNPicSnglStatus.length = 0;// RESET VALUE FOR BUTTON CLICK
			var oTblDNPicSngl = sap.ui.getCore().byId("idTblDNPicSngl");
			var oRowsTblDNPicSngl = oTblDNPicSngl.getRows();
			var oCurnFile = new uploadDNPictures();
			
			for(var j=0; j<oRowsTblDNPicSngl.length; j++){
				var genrtFileId = oRowsTblDNPicSngl[j].getCells()[0].getText();
				var ocell = oRowsTblDNPicSngl[j].getCells()[6].sId;
				var oFileUpldr = sap.ui.getCore().byId(ocell);
				
				if((oFileUpldr.getValue() != '') && (oFileUpldr.oFilePath.getValue() != ''))
				{
					ojsonUpldDNPicSnglStatus.push({
						"lineno" : genrtFileId,
						"fileObject": oFileUpldr,
						'fileSelName' : oFileUpldr.oFileUpload.files[0].name,
						"binarydata" : "",
						"status" : 'PENDING'
					});
				}
			}
			if(ojsonUpldDNPicSnglStatus.length > 0){
				oCurnFile.convertInBinaryJsonObjSngle();
			}else{
				busyDialog.close();
				sap.ui.commons.MessageBox.alert("File input missing." + "\n Please check your inputs and retry." );
			}
		}catch(e){
			busyDialog.close();
			sap.ui.commons.MessageBox.alert("Upload for " + sap.ui.getCore().byId("idunitNo").getValue() + " Failed." + "\n Please make the required changes before retrying" );
		}
	},
	
	//CHECK ALL FILE CONVERSION SUCCESS
	checkAllFileConverted: function (){
		var checkVal = true;
		if(ojsonUpldDNPicSnglStatus.length>0){
			for(var k=0; k < ojsonUpldDNPicSnglStatus.length; k++){
				if((ojsonUpldDNPicSnglStatus[k].status == "PENDING") || (ojsonUpldDNPicSnglStatus[k].status == "FAILED")
						|| (ojsonUpldDNPicSnglStatus[k].status == "START"))
					checkVal = false;
			}
		}
		return checkVal;
	},

	//CONVERT JSON DATA TO BINARY DATA FOR SINGLE CONTROL CALLED BY makeJsonForBinaryDataSingle
	convertInBinaryJsonObjSngle: function(){
		var vunitno = $.trim(sap.ui.getCore().byId("idunitNo").getValue());
		var viddnNo = $.trim(sap.ui.getCore().byId("iddnNo").getValue());
		
		for(var i =0; i < ojsonUpldDNPicSnglStatus.length; i++){
			if(ojsonUpldDNPicSnglStatus[i].status  == "PENDING"){
				var oFReader = new FileReader();
				ojsonUpldDNPicSnglStatus[i].status = "START"; 
				var getFileobj = ojsonUpldDNPicSnglStatus[i].fileObject;
				var fileName = getFileobj.oFileUpload.files[0].name;
				
				oFReader.readAsDataURL(getFileobj.oFileUpload.files[0]);
				oFReader.onload = function (oFREvent) {
					ojsonUpldDNPicSnglStatus[i].status = "SUCCESS";
					ojsonUpldDNPicSnglStatus[i].binarydata = oFReader.result.substring(22); //getFileobj.oFileUpload.files[0].name +'-data-' +oFReader.result.substring(28);
					var oCurnFile = new uploadDNPictures();
					oCurnFile.convertInBinaryJsonObjSngle();
				  };
				oFReader.onerror = function (err){
						busyDialog.close();
				    	ojsonUpldDNPicSnglStatus[i].status = "FAILED";
				    	sap.ui.commons.MessageBox.alert("Upload for " + vunitno + " Failed due to " + err + "\n Please make the required changes before retrying" );
				    	return false;
				  };
				break;
			}
		}
		//CALL ONLINE PUT ODATA REQUEST
		if(this.checkAllFileConverted()){
			
			var FileNameInput1='', FileNameInput2 ='', 
			binaryDataArry = [];
			for(var i =0; i < ojsonUpldDNPicSnglStatus.length; i++){
				if(i<13){
					FileNameInput1 +=	ojsonUpldDNPicSnglStatus[i].lineno + '@' + ojsonUpldDNPicSnglStatus[i].fileSelName + '|';
				}else if(i < 25){
					FileNameInput2 += ojsonUpldDNPicSnglStatus[i].lineno + '@' + ojsonUpldDNPicSnglStatus[i].fileSelName + '|';
				}
				
				binaryDataArry.push({
					"File": ojsonUpldDNPicSnglStatus[i].binarydata
				});
			};
			
			for(j=binaryDataArry.length;j< 25;j++){
				binaryDataArry.push({
					"File": ""
				});
			};
			
			var oDataPostParam = {   
	    			Id : "1",
	    			UnitNumber : vunitno,
	    			DnNumber : viddnNo,
	    			Input1 : FileNameInput1,
	    			Input2 : FileNameInput2,
	    			File1 : binaryDataArry[0].File,
	    			File2 : binaryDataArry[1].File,
	    			File3 : binaryDataArry[2].File,
	    			File4 : binaryDataArry[3].File,
	    			File5 : binaryDataArry[4].File,

	    			File6 : binaryDataArry[5].File,
	    			File7 : binaryDataArry[6].File,
	    			File8 : binaryDataArry[7].File,
	    			File9 : binaryDataArry[8].File,
	    			File10 : binaryDataArry[9].File,
	    			

	    			File11 : binaryDataArry[10].File,
	    			File12 : binaryDataArry[11].File,
	    			File13 : binaryDataArry[12].File,
	    			File14 : binaryDataArry[13].File,
	    			File15 : binaryDataArry[14].File,
	    			

	    			File16 : binaryDataArry[15].File,
	    			File17 : binaryDataArry[16].File,
	    			File18 : binaryDataArry[17].File,
	    			File19 : binaryDataArry[18].File,
	    			File20 : binaryDataArry[19].File,
	    			

	    			File21 : binaryDataArry[20].File,
	    			File22 : binaryDataArry[21].File,
	    			File23 : binaryDataArry[22].File,
	    			File24 : binaryDataArry[23].File,
	    			File25 : binaryDataArry[24].File,
                 };
			
			//AFTER SETTING PUT DATA DO ONLINE REQUEST FOR UPLOAD FILE
			var urlToCall = serviceUrl + "/Upload_DN_Pictures('1')";
			var objCurnt = new uploadDNPictures();
			var objUtil = new utility();
		    objUtil.doOnlinePostData(urlToCall,oDataPostParam, objCurnt.onlinesuccessfunUpload, objCurnt.onlineerrorfunUpload);
		}
	},
	
//UPLOAD SUCCESS FUNCTION
onlinesuccessfunUpload: function(resultdata, response){
		//busyDialog.close();
	var vUnitNmbr = $.trim(sap.ui.getCore().byId("idunitNo").getValue()); 
	busyDialog.close();
	try{
		if(response != undefined){
			if(response.statusCode == '204'){
				sap.ui.commons.MessageBox.alert("DN Pictures successfully uploaded for " + vUnitNmbr + ".");
				var oTblDNPicSngl = sap.ui.getCore().byId("idTblDNPicSngl");
				var oRowsTblDNPicSngl = oTblDNPicSngl.getRows();
				var oCurnFile = new uploadDNPictures();
				
				for(var j=0; j<oRowsTblDNPicSngl.length; j++){
					var genrtFileId = oRowsTblDNPicSngl[j].getCells()[0].getText();
					var ocell = oRowsTblDNPicSngl[j].getCells()[6].sId;
					var oFileUpldr = sap.ui.getCore().byId(ocell);
					oFileUpldr.setValue('');
					oFileUpldr.oFilePath.setValue('');
				}
			}else{
				sap.ui.commons.MessageBox.alert("Upload for " + vUnitNmbr + " Failed " + "\n Please make the required changes before retrying" );
			}
		}else{
			sap.ui.commons.MessageBox.alert("Upload for " + vUnitNmbr + " Failed " + "\n Please make the required changes before retrying");
		}
	}catch(e){
		busyDialog.close();
		sap.ui.commons.MessageBox.alert("Upload for " + vUnitNmbr + " Failed due to - " + e + "\n Please make the required changes before retrying");
	}
},
	
//UPLOAD FAILED FUNCTION
onlineerrorfunUpload: function(err){
	errorfromServer(err);
},
	
//FUNCTION FOR SUBMIT BUTTON AND GET DATA FOR GRID
onlinesuccessfunSubmit: function(resultdata, response){
	busyDialog.close();
	if(resultdata != undefined){
		if(resultdata.results.length > 0){
			for(var i=0; i<resultdata.results.length; i++){
				resultdata.results[i].LineNo = resultdata.results[i].LineNo.replace(/^0+/, '');
			}
			var objCurntFile = new uploadDNPictures();
			objCurntFile.showDNPicturesSingle(resultdata.results);
		}else{
			sap.ui.commons.MessageBox.alert("Either no DN Number found for the specified Unit Number for your Depot,\n or the DN Number is not linked to your Depot.");;
		}
	}else{
		sap.ui.commons.MessageBox.alert("Error on getting data");;
	}
},

onlineerrorfunSubmit: function(err){
	errorfromServer(err);
},

getOnlineDataSubmit: function(unitNumber, DnNumber){
	busyDialog.open();
	var oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
	//http://seanwgd1.gessap.local:8000/sap/opu/odata/sap/ZNW_SEACO_PORTAL_SRV/DN_UnitNo_Details?$filter=UnitNumber eq 'GESU4066340' and DnNumber eq '5002928'  
    var urlToCall = serviceUrl + "/DN_UnitNo_Details?$filter=UnitNumber eq '" + unitNumber + "' and DnNumber eq '" + DnNumber + "'";
           //var urlToCall = serviceUrl + "/Depot_Inventory?$filter=IRegion eq 'N. W. Europe' and ICountry eq 'Germany,Netherlands' and IUnit eq '|20$ BOXES'";
    
	var objUtil = new utility();
    objUtil.doOnlineRequest(urlToCall,this.onlinesuccessfunSubmit, this.onlineerrorfunSubmit);
    //alert('result: ' + resOnline);
},

//FUNCTION FOR CREATE CONTENT FOR VIEW
createUploadDNPictures: function(){
		jQuery.sap.require("sap.ui.commons.MessageBox");
		
		var objCurnt = new uploadDNPictures();	//CURRENT FILE OBJECT 
		//var ResetMessage = "This will delete all the specified pictures for delete. Do you want to continue?"
		var ResetMessage = "This will clear the screen content.\n Do you want to continue?"
		
		function openValidationAlert() {
			
		}
	
		function fnCallbackMessageBox(sResult) {
			//alert("sResult" + sResult);
			if(sResult == "YES"){
				var oBtnUploadDNPicturesSubmit  = sap.ui.getCore().byId("idBtnUploadDNPicturesSubmit");
				var oDNNo = sap.ui.getCore().byId("iddnNo");
				var oUnitno = sap.ui.getCore().byId("idunitNo");

				oDNNo.setEnabled(false);
				oUnitno.setEnabled(false);
				oBtnUploadDNPicturesSubmit.setEnabled(false);
				
				 //busyDialog.open();
				 showDNPicturesSingle();
			}else{
				var oFlexTblData = sap.ui.getCore().byId("idFlexTblData");
				if (oFlexTblData != undefined) {
					oFlexTblData.destroy();
				}
			}
		};
		
		function fnResetCallbackMsgBox(sResult){
			//alert("sResult" + sResult);
			if(sResult == "YES"){
				var oBtnUploadDNPicturesSubmit  = sap.ui.getCore().byId("idBtnUploadDNPicturesSubmit");
				var oDNNo = sap.ui.getCore().byId("iddnNo");
				var oUnitno = sap.ui.getCore().byId("idunitNo");
				
				oBtnUploadDNPicturesSubmit.setEnabled(true);
				
				oUnitno.setValue('');
				oUnitno.setEnabled(true);
				oUnitno.setValueState(sap.ui.core.ValueState.None);
				oUnitno.setPlaceholder("Unit Number");
				
				oDNNo.setValue('');
				oDNNo.setEnabled(true);
				oDNNo.setValueState(sap.ui.core.ValueState.None);
				oDNNo.setPlaceholder("DN Number");
				
				var oFlexTblData = sap.ui.getCore().byId("idFlexTblData");
				if (oFlexTblData != undefined) {
					oFlexTblData.destroy();
				}
			}
		}
		
		// Responsive Grid Layout
		var oUploadDNPicturesLayout = new sap.ui.layout.form.ResponsiveGridLayout("idUploadDNPicturesLayout");
	
		// Text Fields
		var oTextValueUnitNo = new sap.ui.commons.TextField('idunitNo',{
			placeholder:"Unit Number",
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: false}),
		});
		oTextValueUnitNo.addStyleClass("FormInputStyle DepotInput38px marginTop10");
		oTextValueUnitNo.onfocusin =  function(e) {  
			this.setValueState(sap.ui.core.ValueState.None);
			this.setPlaceholder("Unit Number");
			
			var vdnNo = sap.ui.getCore().byId("iddnNo");
			vdnNo.setValueState(sap.ui.core.ValueState.None);
			vdnNo.setPlaceholder("DN Number");
	      };
		
		var oTextValueDNNo = new sap.ui.commons.TextField('iddnNo',{
			placeholder:"DN Number",
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: false}),
		});
		oTextValueDNNo.addStyleClass("FormInputStyle DepotInput38px marginTop10");
		oTextValueDNNo.onfocusin =  function(e) {  
			this.setValueState(sap.ui.core.ValueState.None);
			this.setPlaceholder("DN Number");
			
			var vunitno = sap.ui.getCore().byId("idunitNo");
			vunitno.setValueState(sap.ui.core.ValueState.None);
			vunitno.setPlaceholder("Unit Number");
			
	      }; 
		
		// Labels
		var oLabelUnitNo = new sap.ui.commons.Label({text: "Unit Number: #",
			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: false, margin: false}),
            wrapping: true}).addStyleClass("marginTop15");
		
		var oLabelDnNo = new sap.ui.commons.Label({text: "DN Number: #",
			layoutData: new sap.ui.layout.GridData({span: "L3 M3 S4",linebreak: true, margin: false}),
            wrapping: true}).addStyleClass("marginTop15");
		
		// Buttons
		var oBtnUploadDNPicturesSubmit = new sap.m.Button("idBtnUploadDNPicturesSubmit",{
	          text : "Submit",
	          width: "80px",
	          styled:false,
	          layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
	          press:function(){
	        	var vUnintNo = sap.ui.getCore().byId("idunitNo");
	  			var vDNNo = sap.ui.getCore().byId("iddnNo");
	  			var objUtil = new utility();
	  			var validate = true;
	  			
	  			if(($.trim(vUnintNo.getValue()) == '') && ($.trim(vDNNo.getValue()) == '')){
	  				vUnintNo.setValueState(sap.ui.core.ValueState.Error);
	  				vUnintNo.setPlaceholder("Required");
	  				
	  				vDNNo.setValueState(sap.ui.core.ValueState.Error);
	  				vDNNo.setPlaceholder("Required");
	  				validate = false;
	  				//sap.ui.commons.MessageBox.alert("Either Unit Number or DN Number input missing.\n Please check your inputs and retry.");
	  			}
	  			
	  			if(($.trim(vUnintNo.getValue()) != '') && (!objUtil.validateUnitNumber($.trim(vUnintNo.getValue())))){
	  				vUnintNo.setValueState(sap.ui.core.ValueState.Error);
	  				vUnintNo.setPlaceholder("Invalid Unit Number");
	  				validate = false;
	  				//sap.ui.commons.MessageBox.alert("You have input an invalid Unit Number.\n Please enter a valid Unit Number -11-char alpha numeric.");
	  			}
	  			
	  			if(($.trim(vDNNo.getValue()) != '') &&(!objUtil.validateDNNumber($.trim(vDNNo.getValue())))){
	  				vDNNo.setValueState(sap.ui.core.ValueState.Error);
	  				vDNNo.setPlaceholder("Invalid DN Number");
	  				validate = false;
	  				//sap.ui.commons.MessageBox.alert("You have input an invalid DN Number.\n Please enter a valid DN Number -6-digit numeric.");
	  			}
	  			vUnintNo.setValue($.trim(vUnintNo.getValue()).toUpperCase());
	  			
	  			if(validate)
	  			{
	  				objCurnt.getOnlineDataSubmit($.trim(vUnintNo.getValue()), $.trim(vDNNo.getValue()));
	  			}
	          }}).addStyleClass("submitBtn");
		
		var oBtnUploadDNPicturesReset = new sap.m.Button("idBtnUploadDNPicturesReset",{
	          text : "Reset",
	          width: "80px",
	          styled:false,
	          layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
	          press:function(){
	        	  sap.ui.commons.MessageBox.show(ResetMessage,sap.ui.commons.MessageBox.Icon.WARNING,"Warning",
	  		  				[sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO], 
	  		  				fnResetCallbackMsgBox,
	  		  				sap.ui.commons.MessageBox.Action.YES);
	        	  
	          }}).addStyleClass("submitBtn");
		
		var lblSpace = new sap.ui.commons.Label( {text: " ",width : '8px'});
		// Flex Box
    	var oFlexbxUNPB = new sap.m.FlexBox({
    	      items: [oBtnUploadDNPicturesSubmit, lblSpace, oBtnUploadDNPicturesReset],
    	      direction: "Row"
    	    });
    	var lblInfo = new sap.ui.commons.Label( {text: "# Atleast 1 input needed",wrapping: true
    	}).addStyleClass("marginTop10");
    	
		// Online Form Starts
		var oUploadDNPicturesForm = new sap.ui.layout.form.Form("idUploadDNPicturesForm",{
			                layout: oUploadDNPicturesLayout,
			                formContainers: [
			                        new sap.ui.layout.form.FormContainer("idUploadDNPicturesFormC1",{
			                                formElements: [
														new sap.ui.layout.form.FormElement({
															fields: [oLabelUnitNo, oTextValueUnitNo],
															//layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
														}),
														
														new sap.ui.layout.form.FormElement({
													        fields: [oLabelDnNo, oTextValueDNNo],
													        layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
														}),
														
														new sap.ui.layout.form.FormElement({
														    fields: [oFlexbxUNPB],
														    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
														}),
														
														new sap.ui.layout.form.FormElement({
														    lable: "",
														    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: true})
														}),
														
														new sap.ui.layout.form.FormElement({
														    fields: [lblInfo],
														    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: true})
														})
			                                        ]
			                        }),
			                        new sap.ui.layout.form.FormContainer("idUploadDNPicturesFormC2",{
		                                formElements: []
			                        })
			                      ]
			        });
		var vHDivider = new sap.ui.commons.HorizontalDivider({width: "95%", type: "Area", height: "Medium"});
		var oUploadDNPicturesSingleLayout = new sap.ui.layout.form.ResponsiveLayout("idUploadDNPicturesSingleLayout");
        var oUploadDNPicturesSingleForm = new sap.ui.layout.form.Form("idUploadDNPicturesSingleForm",{
           layout: oUploadDNPicturesSingleLayout,
           formContainers: [
                   new sap.ui.layout.form.FormContainer("idUploadDNPicturesSingleLayoutFormC1",{
                       formElements: [new sap.ui.layout.form.FormElement("idUploadDNPicturesSingleFrmElmnt",{
                                   		fields: []
                               		})],
                       layoutData: new sap.ui.commons.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                   })]
        	});

        
        var oFlexboxUploadDNPicturesSingle = new sap.m.FlexBox({
        										items: [oUploadDNPicturesForm,vHDivider,oUploadDNPicturesSingleForm],
        										direction: "Column"
        									});

        return oFlexboxUploadDNPicturesSingle;
	},
	
	showDNPicturesSingle: function (dataBindJsn){
		var oFlexTblData = sap.ui.getCore().byId("idFlexTblData");
		if (oFlexTblData != undefined) {
			oFlexTblData.destroy();
		}
		// CHECK FOR ERROR MSG
		if(dataBindJsn.length == 1){
			if(dataBindJsn[0].ErrorMsg != ''){
				sap.ui.commons.MessageBox.alert(dataBindJsn[0].ErrorMsg);
				return;
			}
		}
		
    	// Table
		var oBtnUploadDNPicturesSubmit  = sap.ui.getCore().byId("idBtnUploadDNPicturesSubmit");
		var oDNNo = sap.ui.getCore().byId("iddnNo");
		var oUnitno = sap.ui.getCore().byId("idunitNo");

		oDNNo.setEnabled(false);
		oUnitno.setEnabled(false);
		oBtnUploadDNPicturesSubmit.setEnabled(false);
		
		
		var widthTbl = "80%";
		if(widthOfDoc <= 1280)
	    {
			widthTbl = "100%";
	    }
	    else{
	    	widthTbl = "80%";
	    }
		
    	var oDNPicturesSingleTable = new sap.ui.table.Table('idTblDNPicSngl', {
							                columnHeaderHeight: 50,
							                selectionMode: sap.ui.table.SelectionMode.None,
							                //navigationMode: sap.ui.table.NavigationMode.Paginator,
							                width: widthTbl,
							               /* height:"10%"*/
							        	 }).addStyleClass('tblBorder');
    	if(dataBindJsn.length >25){
    		oDNPicturesSingleTable.setVisibleRowCount(25);
    		oDNPicturesSingleTable.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
    	}else{
    		oDNPicturesSingleTable.setVisibleRowCount(dataBindJsn.length);
    	}
    	//
    	// Table Columns
    	oDNPicturesSingleTable.addColumn(new sap.ui.table.Column({
								             label: new sap.ui.commons.Label({text: "Line"}),
								             template: new sap.ui.commons.TextView().bindProperty("text", "LineNo"),
								             sortProperty: "LineNo",
								             filterProperty: "LineNo",
								             resizable:false
    	 								}));
    	 
    	oDNPicturesSingleTable.addColumn(new sap.ui.table.Column({
							        		 label: new sap.ui.commons.Label({text: "Component"}),
							        		 template: new sap.ui.commons.TextView().bindProperty("text", "Component"),
							                 sortProperty: "Component",
							                 filterProperty: "Component",
							                 resizable:false
    		 							}));
    	 
    	oDNPicturesSingleTable.addColumn(new sap.ui.table.Column({
							        		 label: new sap.ui.commons.Label({text: "Damage"}),
							        		 template: new sap.ui.commons.TextView().bindProperty("text", "Damage"),
							                 sortProperty: "Damage",
							                 filterProperty: "Damage",
							                 resizable:false
    		 							}));
    	 
    	oDNPicturesSingleTable.addColumn(new sap.ui.table.Column({
							        		 label: new sap.ui.commons.Label({text: "Location"}),
							        		 template: new sap.ui.commons.TextView().bindProperty("text", "Location"),
							                 sortProperty: "Location",
							                 filterProperty: "Location",
							                 resizable:false
    		 							}));
    	 
    	oDNPicturesSingleTable.addColumn(new sap.ui.table.Column({
							        		 label: new sap.ui.commons.Label({text: "Length"}),
							        		 template: new sap.ui.commons.TextView().bindProperty("text", "Length"),
							                 sortProperty: "Length",
							                 filterProperty: "Length",
							                 resizable:false
    		 							}));
    	 
    	oDNPicturesSingleTable.addColumn(new sap.ui.table.Column({
							        		 label: new sap.ui.commons.Label({text: "Width"}),
							        		 template: new sap.ui.commons.TextView().bindProperty("text", "Width"),
							                 sortProperty: "Width",
							                 filterProperty: "Width",
							                 resizable:false
    		 							}));
    	
    	var vFileUpldrtblClmn = new sap.ui.commons.FileUploader({
	 		name : "uploadfileData",
			uploadUrl : "UploadServlet",
			//value : "",
				buttonText : " Browse ",
			sameFilenameAllowed : false,
			additionalData : "abc=123&test=456",
    		width: "100%",
    		change : function(oEvent) {
    			//CHECK FILE EXTENTION
						var ext = oEvent.oSource.oFilePath.getValue().split('.').pop().toLowerCase();
						if($.inArray(ext, ['jpeg','png','gif','jpg']) == -1) {
							oEvent.oSource.setValue('');
							oEvent.oSource.oFilePath.setValue('');
							oEvent.oSource.destroyParameters();
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
						if(chkSpclChar.length > 1){
							oEvent.oSource.setValue('');
							oEvent.oSource.oFilePath.setValue('');
							sap.ui.commons.MessageBox.alert("Input file name invalid.\n File name shold not contain special character '@' and '|'.\n Please check your inputs and retry.");
							return false;
						}
			}
    }).bindProperty("value", " ");
    	oDNPicturesSingleTable.addColumn(new sap.ui.table.Column({
					        				width: "20%",
					        				label: new sap.ui.commons.Label({text: "Upload"}),
					        				template: vFileUpldrtblClmn
    		 				}));
    	
    	//Create a model and bind the table rows to this model
    	var oModelDNPicturesSingle = new sap.ui.model.json.JSONModel();
    	oModelDNPicturesSingle.setData({modelData: dataBindJsn});
    	oDNPicturesSingleTable.setModel(oModelDNPicturesSingle);
    	oDNPicturesSingleTable.bindRows("/modelData");
    	
    	// Button
    	var btnUpload = new sap.m.Button({
	          text : "Upload",
	          styled:false,
	          width: "80px",
	          layoutData: new sap.ui.layout.GridData({span: "L2 M2 S4"}),
	          press:function(){
	        	  var oCurnFile = new uploadDNPictures();
	      		oCurnFile.makeJsonForBinaryDataSingle();
	          }}).addStyleClass("submitBtn");
    	
    	var objutil = new utility();	
    	
		// GET UNIT NO AND DN NUMBER FROM RESULT
    	var vUnitNumberVal = $.trim(dataBindJsn[0].UnitNumber);
    	var vDNNumberVal = objutil.removeLeadZero($.trim(dataBindJsn[0].DnNumber));
    	
    	if(sap.ui.getCore().byId("iddnNo").getValue() == ''){
    		sap.ui.getCore().byId("iddnNo").setValue(vDNNumberVal);	
    	}
    	
    	if(sap.ui.getCore().byId("idunitNo").getValue() == ''){
    		sap.ui.getCore().byId("idunitNo").setValue(vUnitNumberVal);	
    	}
    	
    	var ohtmlCntrl = new sap.ui.core.HTML("html1", {
    		content:
			"<div style='width:"+ widthTbl + ";'><div class='sapUiLbl floatLeft font12'>Unit Number: " + vUnitNumberVal +"</div><div style='text-align:right;' class='sapUiLbl floatRight font12'>DN Number: " + vDNNumberVal +"</div><br><div style='text-align:right;' class='sapUiLbl floatRight font11 WarningMessage'>Support Formats: PNG, JPEG, GIF</div></div>"});
    	
    	var lblSpace = new sap.ui.commons.Label( {text: " ",width : '8px'});
    	
    	// Flex Box
    	var oFlexboxUpload = new sap.m.FlexBox('idFlexTblData', {
    	      items: [ohtmlCntrl,
	        	        oDNPicturesSingleTable,lblSpace,
	        	        btnUpload],

    	      direction: "Column"
    	    });
    	
    	var oDNPicturesSingleFormElement = sap.ui.getCore().byId("idUploadDNPicturesSingleFrmElmnt"); // release Results is ID of Form Element
    	
    	oDNPicturesSingleFormElement.insertField(oFlexboxUpload,0);
    	//oDNPicturesSingleFormElement.insertField(oBtnUploadDNPicturesUpload,1);

    }
});


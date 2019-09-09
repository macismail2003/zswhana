var oJSONFUPLResultData = [];
var isValid = false;
var oSTRINGFUPLValidationMessage = "";

sap.ui.model.json.JSONModel.extend("fupl", {

	/*FUPL : Create File Upload Page */

	createFUPLPage : function(){

		var oCurrent = this;

        jQuery.sap.require("sap.ui.core.IconPool");

        var backEDI = new sap.m.Link({text: " < Back",
        	  width:"7%",
        	  wrapping:true,
        	  press: function(){
        		  var bus = sap.ui.getCore().getEventBus();
        		  bus.publish("nav", "back");
        		  $('#idHdrContnt').html('EDI Process');
       	  }});

        var oFUPLComboType = new sap.m.ComboBox("idFUPLComboType", {
			//layoutData: new sap.ui.layout.GridData({span: "L4 M9 S12"}),
			//width:"100%",
			//enabled: seacoUser,
        	 width : "200px",
			 placeholder:"Select Process",
			 change : function(evnt){
				 /*var file2uploaded = sap.ui.getCore().byId("idFUPLUploaderFile2");
				 var oFUPLFlexFile2 = sap.ui.getCore().byId("idFUPLFlexFile2");
				 var oFUPLCheckBoxANSIREPAIR = sap.ui.getCore().byId("idFUPLCheckBoxANSIREPAIR");
				 oFUPLCheckBoxANSIREPAIR.setChecked(false);
					if(this.getSelectedKey() == 'RE'){
						if(file2uploaded != undefined){
							oFUPLFlexFile2.setVisible(false);
							oFUPLCheckBoxANSIREPAIR.setVisible(true);
							file2uploaded.setValue("");
							oFUPLCheckBoxANSIREPAIR.setChecked(false);
							sap.ui.getCore().byId("idFUPLButtonFile").setEnabled(false);
						}
					}else{
						if(file2uploaded != undefined){
							oFUPLFlexFile2.setVisible(false);
							oFUPLCheckBoxANSIREPAIR.setVisible(false);
						}
					}*/
				 var oFUPLFlexFile2 = sap.ui.getCore().byId("idFUPLFlexFile2");
				 var oFUPLCheckBoxANSIREPAIR = sap.ui.getCore().byId("idFUPLCheckBoxANSIREPAIR");
				 oFUPLCheckBoxANSIREPAIR.setChecked(false);

				 sap.ui.getCore().byId("idFUPLButtonFile").setEnabled(false);

				 if(this.getSelectedKey() == 'RE'){
					 oFUPLFlexFile2.setVisible(false);
					 oFUPLCheckBoxANSIREPAIR.setVisible(true);
				 }else{
					 oFUPLFlexFile2.setVisible(false);
					 oFUPLCheckBoxANSIREPAIR.setVisible(false);
				 }
				 oCurrent.submitEnabler();
	          }
		});

        oFUPLComboType.addItem(new sap.ui.core.ListItem({
			text:"",
			key: ""
			}));

		oFUPLComboType.addItem(new sap.ui.core.ListItem({
										text:"Gate IN",
										key: "GI"
										}));

		oFUPLComboType.addItem(new sap.ui.core.ListItem({
										text:"Repair Estimates",
										key: "RE"
										}));

		oFUPLComboType.addItem(new sap.ui.core.ListItem({
										text:"Lessee Approval",
										key: "LA"
										}));

		oFUPLComboType.addItem(new sap.ui.core.ListItem({
										text:"Repair Completion",
										key: "RC"
										}));

		oFUPLComboType.addItem(new sap.ui.core.ListItem({
										text:"Gate OUT",
										key: "GO"
										}));


        var oFUPLLabelType = new sap.m.Label("idFUPLLabelType",{
			  text : "Type",
			  width : "130px"
        }).addStyleClass("selectionLabels");


		var oFUPLFlexType = new sap.m.FlexBox("idFUPLFlexType",{
		             items: [oFUPLLabelType,
		                     oFUPLComboType
		                     ],
		             width: "300px",
		             direction: "Row"
		});


		var oFUPLComboProcess = new sap.m.ComboBox("idFUPLComboProcess", {
			//layoutData: new sap.ui.layout.GridData({span: "L4 M9 S12"}),
			//width:"100%",
			//enabled: seacoUser,
        	 width : "200px",
			 placeholder:"Select Process",
			 change : function(evnt){
				 /*var file2uploaded = sap.ui.getCore().byId("idFUPLUploaderFile2");
				 var oFUPLFlexFile2 = sap.ui.getCore().byId("idFUPLFlexFile2");
				 var oFUPLCheckBoxANSIREPAIR = sap.ui.getCore().byId("idFUPLCheckBoxANSIREPAIR");
				 oFUPLCheckBoxANSIREPAIR.setChecked(false);
					if(this.getSelectedKey() == 'RE'){
						if(file2uploaded != undefined){
							oFUPLFlexFile2.setVisible(false);
							oFUPLCheckBoxANSIREPAIR.setVisible(true);
							file2uploaded.setValue("");
							oFUPLCheckBoxANSIREPAIR.setChecked(false);
							sap.ui.getCore().byId("idFUPLButtonFile").setEnabled(false);
						}
					}else{
						if(file2uploaded != undefined){
							oFUPLFlexFile2.setVisible(false);
							oFUPLCheckBoxANSIREPAIR.setVisible(false);
						}
					}*/
				 var oFUPLFlexFile2 = sap.ui.getCore().byId("idFUPLFlexFile2");
				 var oFUPLCheckBoxANSIREPAIR = sap.ui.getCore().byId("idFUPLCheckBoxANSIREPAIR");
				 oFUPLCheckBoxANSIREPAIR.setChecked(false);

				 sap.ui.getCore().byId("idFUPLButtonFile").setEnabled(false);

				 if(this.getSelectedKey() == 'RE'){
					 oFUPLFlexFile2.setVisible(false);
					 oFUPLCheckBoxANSIREPAIR.setVisible(true);
				 }else{
					 oFUPLFlexFile2.setVisible(false);
					 oFUPLCheckBoxANSIREPAIR.setVisible(false);
				 }
				 oCurrent.submitEnabler();
	          }
		});

        oFUPLComboProcess.addItem(new sap.ui.core.ListItem({
			text:"",
			key: ""
			}));

		oFUPLComboProcess.addItem(new sap.ui.core.ListItem({
										text:"ANSCI",
										key: "ANSCI"
										}));

		oFUPLComboProcess.addItem(new sap.ui.core.ListItem({
										text:"EDIFACT",
										key: "EDIFACT"
										}));

		oFUPLComboProcess.addItem(new sap.ui.core.ListItem({
										text:"CODECO",
										key: "CODECO"
										}));


        var oFUPLLabelProcess = new sap.m.Label("idFUPLLabelProcess",{
					  text : "Process",
					  width : "130px"
        }).addStyleClass("selectionLabels");


		var oFUPLFlexProcess = new sap.m.FlexBox("idFUPLFlexProcess",{
		             items: [oFUPLLabelProcess,
		                     oFUPLComboProcess
		                     ],
		             width: "300px",
		             direction: "Row"
		});


        var oFUPLUploaderFile1 = new sap.ui.unified.FileUploader("idFUPLUploaderFile1",{
  	    	name : "uploadfileData",
  			uploadUrl : "UploadServlet",
  			multiple : false,
  			width: "300px",
  			//value : "",
  			//icon : "images/success.png",
  			buttonOnly : false,
  			buttonText : "Upload",
  			enabled : true,
  			sameFilenameAllowed : false,
  			additionalData : "abc=123&test=456",
  			//layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12", linebreak: false, margin: true}),
  			change : function(oEvent) {

  				/*var numoffiles = oEvent.oSource.oFileUpload.files;
  				if(numoffiles.length > 1 && !sap.ui.getCore().byId("idFUPLCheckBoxANSIREPAIR").getChecked()){
  					oEvent.oSource.setValue('');
  					oEvent.oSource.oFilePath.setValue('');
  					sap.ui.commons.MessageBox.alert("You should upload header and DT files if ANSI Repair is selected");
  					return false;
  				}


  				var ext = "";
  				for(var i=0; i<numoffiles.length; i++){
  					ext = oEvent.oSource.oFileUpload.files[i].name.split('.').pop().toLowerCase();


  				//var ext = oEvent.oSource.oFilePath.getValue().split('.').pop().toLowerCase();

  				jQuery.sap.require("sap.ui.commons.MessageBox");
  				if($.inArray(ext, ['txt', 'ing']) == -1) {
  					oEvent.oSource.setValue('');
  					oEvent.oSource.oFilePath.setValue('');

  					sap.ui.commons.MessageBox.alert("Input file type invalid.\n Please check your inputs and retry.");
  					return false;
  				}
  				}*/

  				sap.ui.getCore().byId("idFUPLButtonFile").setEnabled(false);

  				if(oEvent.oSource.oFilePath.getValue() == ""){

  				}else{
  				var ext = oEvent.oSource.oFilePath.getValue().split('.').pop().toLowerCase();

  				jQuery.sap.require("sap.ui.commons.MessageBox");
  				if($.inArray(ext, ['txt', 'ing']) == -1) {
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

  				var file1uploaded = sap.ui.getCore().byId("idFUPLUploaderFile1").oFileUpload.files.length;
            	var file2uploaded = sap.ui.getCore().byId("idFUPLUploaderFile2").oFileUpload;
            	if(file2uploaded == null){
            		file2uploaded = 1;
            	}else{
            		file2uploaded = file2uploaded.files.length;
            	}

            	if(sap.ui.getCore().byId("idFUPLCheckBoxANSIREPAIR").getChecked() == true){
            		if(file1uploaded == 1 && file2uploaded == 1 ){
            			sap.ui.getCore().byId("idFUPLButtonFile").setEnabled(true);
            		}else{
            			sap.ui.getCore().byId("idFUPLButtonFile").setEnabled(false);
            		}
            	}else{
            		if(file1uploaded == 1){
            			sap.ui.getCore().byId("idFUPLButtonFile").setEnabled(true);
            		}else{
            			sap.ui.getCore().byId("idFUPLButtonFile").setEnabled(false);
            		}
            	}


  				//this.setIcon("images/success.png");
  			}
  	   }).addStyleClass("fileuploader");

        var oFUPLUploaderFile2 = new sap.ui.unified.FileUploader("idFUPLUploaderFile2",{
  	    	name : "uploadfileData",
  			uploadUrl : "UploadServlet",
  			multiple : false,
  			width: "300px",
  			//value : "",
  			//icon : "images/success.png",
  			buttonOnly : false,
  			buttonText : "Upload",
  			enabled : true,
  			sameFilenameAllowed : false,
  			additionalData : "abc=123&test=456",
  			//layoutData: new sap.ui.layout.GridData({span: "L4 M8 S12", linebreak: false, margin: true}),
  			change : function(oEvent) {

  				sap.ui.getCore().byId("idFUPLButtonFile").setEnabled(false);

  				/*var numoffiles = oEvent.oSource.oFileUpload.files;
  				if(numoffiles.length > 1 && !sap.ui.getCore().byId("idFUPLCheckBoxANSIREPAIR").getChecked()){
  					oEvent.oSource.setValue('');
  					oEvent.oSource.oFilePath.setValue('');
  					sap.ui.commons.MessageBox.alert("You should upload header and DT files if ANSI Repair is selected");
  					return false;
  				}


  				var ext = "";
  				for(var i=0; i<numoffiles.length; i++){
  					ext = oEvent.oSource.oFileUpload.files[i].name.split('.').pop().toLowerCase();


  				//var ext = oEvent.oSource.oFilePath.getValue().split('.').pop().toLowerCase();

  				jQuery.sap.require("sap.ui.commons.MessageBox");
  				if($.inArray(ext, ['txt', 'ing']) == -1) {
  					oEvent.oSource.setValue('');
  					oEvent.oSource.oFilePath.setValue('');

  					sap.ui.commons.MessageBox.alert("Input file type invalid.\n Please check your inputs and retry.");
  					return false;
  				}
  				}*/

  				if(oEvent.oSource.oFilePath.getValue() == ""){

  				}else{
  				var ext = oEvent.oSource.oFilePath.getValue().split('.').pop().toLowerCase();

  				jQuery.sap.require("sap.ui.commons.MessageBox");
  				if($.inArray(ext, ['txt', 'ing']) == -1) {
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
  				var file1uploaded = sap.ui.getCore().byId("idFUPLUploaderFile1").oFileUpload.files.length;
            	var file2uploaded = sap.ui.getCore().byId("idFUPLUploaderFile2").oFileUpload.files.length;

            	if(sap.ui.getCore().byId("idFUPLCheckBoxANSIREPAIR").getChecked() == true){
            		if(file1uploaded == 1 && file2uploaded == 1 ){
            			sap.ui.getCore().byId("idFUPLButtonFile").setEnabled(true);
            		}else{
            			sap.ui.getCore().byId("idFUPLButtonFile").setEnabled(false);
            		}
            	}else{
            		if(file1uploaded == 1){
            			sap.ui.getCore().byId("idFUPLButtonFile").setEnabled(true);
            		}else{
            			sap.ui.getCore().byId("idFUPLButtonFile").setEnabled(false);
            		}
            	}



  				//this.setIcon("images/success.png");
  			}
  	   }).addStyleClass("fileuploader");

        var oFUPLLabelFile2 = new sap.m.Label("idFUPLLabelFile2",{
            text : "DT File : ",
            labelFor: oFUPLUploaderFile2,
            required: true,
            width : "130px"
        }).addStyleClass("selectionLabels");



        var oFUPLLabelFile1 = new sap.m.Label("idFUPLLabelFile1",{
            text : "File : ",
            labelFor: oFUPLUploaderFile1,
            required: true,
            width : "130px"
        }).addStyleClass("selectionLabels");

        var oFUPLButtonFile = new sap.m.Button("idFUPLButtonFile",{
			  text : "Submit",
			  width:"100px",
 			    enabled : false,
                press : function(oEvent){
                	var file1uploaded = sap.ui.getCore().byId("idFUPLUploaderFile1").oFileUpload.files.length;
                	//var file2uploaded = sap.ui.getCore().byId("idFUPLUploaderFile2").oFileUpload.files.length;

                	var file2uploaded = sap.ui.getCore().byId("idFUPLUploaderFile2").oFileUpload;
                	if(file2uploaded == null){
                		file2uploaded = 0;
                	}else{
                		file2uploaded = file2uploaded.files.length;
                	}

                	if(sap.ui.getCore().byId("idFUPLCheckBoxANSIREPAIR").getChecked() == true){

                		if(file1uploaded == 1 && file2uploaded == 1 ){
	                		oCurrent.validFUPLFileNew1();
	                    	oCurrent.validFUPLFileNew2();
                		}else if(file1uploaded == 1 && file2uploaded == 0 ){
                			sap.ui.commons.MessageBox.alert("If ANSI Repair is selected, both header and DT files should be uploaded");
                		}else if(file1uploaded == 0 && file2uploaded == 0 ){
                			sap.ui.commons.MessageBox.alert("Please upload a file before submit");
                		}
                	}else{
                		if(file1uploaded == 1 && file2uploaded == 1 ){
	                		oCurrent.validFUPLFileNew1();
                		}else if(file1uploaded == 1 && file2uploaded == 0 ){
                			oCurrent.validFUPLFileNew1();
                		}else if(file1uploaded == 0 && file2uploaded == 0 ){
                			sap.ui.commons.MessageBox.alert("Please upload a file before submit");
                		}
                	}

                	/*for(var i=0; i<oJSONFUPLResultData.length;i++){
                		oSTRINGFUPLValidationMessage = oSTRINGFUPLValidationMessage +
                			oJSONFUPLResultData[0].File + " : " + oJSONFUPLResultData[0].Result + "\n";
                	}

                	sap.ui.commons.MessageBox.alert(oSTRINGFUPLValidationMessage);*/
                	if(isValid == false){

                		var oFUPLTableResult = sap.ui.getCore().byId("idFUPLTableResult");
               			var oFUPLModelResult = new sap.ui.model.json.JSONModel();
               			oFUPLModelResult.setData({
               				modelData : oJSONFUPLResultData
               			});
               			oFUPLTableResult.setModel(oFUPLModelResult);
               			oFUPLTableResult.setVisibleRowCount(oJSONFUPLResultData.length);
               			oFUPLTableResult.bindRows("/modelData");
               			oFUPLTableResult.setVisible(true);

                		return;
                	}else{

                		/* Submit Files */
                		var file1uploaded = sap.ui.getCore().byId("idFUPLUploaderFile1").oFileUpload.files.length;
                    	//var file2uploaded = sap.ui.getCore().byId("idFUPLUploaderFile2").oFileUpload.files.length;

                    	var file2uploaded = sap.ui.getCore().byId("idFUPLUploaderFile2").oFileUpload;
                    	if(file2uploaded == null){
                    		file2uploaded = 0;
                    	}else{
                    		file2uploaded = file2uploaded.files.length;
                    	}

                    	if(sap.ui.getCore().byId("idFUPLCheckBoxANSIREPAIR").getChecked() == true){

                    		if(file1uploaded == 1 && file2uploaded == 1 ){
    	                		oCurrent.submitFUPLFile(1);
    	                    	oCurrent.submitFUPLFile(2);
                    		}else if(file1uploaded == 1 && file2uploaded == 0 ){
                    			sap.ui.commons.MessageBox.alert("If ANSI Repair is selected, both header and DT files should be uploaded");
                    		}else if(file1uploaded == 0 && file2uploaded == 0 ){
                    			sap.ui.commons.MessageBox.alert("Please upload a file before submit");
                    		}
                    	}else{
                    		if(file1uploaded == 1 && file2uploaded == 1 ){
                    			oCurrent.submitFUPLFile(1);
                    		}else if(file1uploaded == 1 && file2uploaded == 0 ){
                    			oCurrent.submitFUPLFile(1);
                    		}else if(file1uploaded == 0 && file2uploaded == 0 ){
                    			sap.ui.commons.MessageBox.alert("Please upload a file before submit");
                    		}
                    	}
                	}




                }
        }).addStyleClass("normalBtn");

        var oFUPLButtonReset = new sap.m.Button("idFUPLButtonReset",{
			  text : "Reset",
			  width:"100px",
              press : function(oEvent){
            	  oCurrent.resetFUPL();
              }
      }).addStyleClass("normalBtn");

      var oFUPLCheckBoxANSIREPAIR = new sap.ui.commons.CheckBox("idFUPLCheckBoxANSIREPAIR",{
          	 text : "ANSI Repair",
    		 checked : false,
    		 visible:false,
    		 width : "150px",
    		 change:function(){

				 var oFUPLFlexFile2 = sap.ui.getCore().byId("idFUPLFlexFile2");
				 if(this.getChecked() && sap.ui.getCore().byId("idFUPLComboType").getSelectedKey() == "RE"){
					 oFUPLFlexFile2.setVisible(true);
				 }else{
					 oFUPLFlexFile2.setVisible(false);
				 }

    			oCurrent.submitEnabler();

    		},
           }).addStyleClass("pdfexcelcheckboxes");


		var oFUPLFlexFile1 = new sap.m.FlexBox("idFUPLFlexFile",{
		             items: [oFUPLLabelFile1,
		                     oFUPLUploaderFile1
		                     ],
		             direction: "Row"
		});

		var oFUPLFlexFile2 = new sap.m.FlexBox("idFUPLFlexFile2",{
            items: [oFUPLLabelFile2,
                    oFUPLUploaderFile2
                    ],
            visible:false,
            direction: "Row"
});
		 var oFUPLTextAreaFiles = new sap.m.TextArea("idFUPLTextAreaFiles",{
        	 		value : "",
					height : "50px",
					width : "200px",
					enabled : false,
					visible : false,
					}).addStyleClass("commentsPanel");

		 var oFUPLFlexButtons = new sap.m.FlexBox("idFUPLFlexButtons",{
             items: [oFUPLButtonFile,
                     oFUPLButtonReset
                     ],
             direction: "Column"
		 }).addStyleClass("mainMarginLeft");

	var oFUPLTableResult = new sap.ui.table.Table(
			'idFUPLTableResult',
			{
				visibleRowCount: 1,
				width : "30%",
				firstVisibleRow : 3,
				columnHeaderHeight : 30,
				selectionMode : sap.ui.table.SelectionMode.None,
				navigationMode : sap.ui.table.NavigationMode.None,
				//layoutData: new sap.ui.layout.GridData({span: "L7 M10 S12",linebreak: true, margin: false}),
				visible : false
			}).addStyleClass('tblBorder');
//			if(jsonNwFileNm.length > 25){
//				oFileSelUpldTbl.setVisibleRowCount(25);
//				oFileSelUpldTbl.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
//			}else{
//				oFileSelUpldTbl.setVisibleRowCount(jsonNwFileNm.length);
//			}


	oFUPLTableResult.addColumn(new sap.ui.table.Column({
		label : new sap.ui.commons.Label({
			text : "File Type"
		}),
		template : new sap.ui.commons.TextView()
				.bindProperty("text", "File"),
		hAlign : "Center"
	}));

	oFUPLTableResult.addColumn(new sap.ui.table.Column({
		label : new sap.ui.commons.Label({
			text : "Validation"
		}),
		template : new sap.ui.commons.TextView()
				.bindProperty("text", "VResult"),
		hAlign : "Center"
	}));

	oFUPLTableResult.addColumn(new sap.ui.table.Column({
		label : new sap.ui.commons.Label({
			text : "Upload"
		}),
		template : new sap.ui.commons.TextView()
				.bindProperty("text", "UResult"),
		hAlign : "Center"
	}));

	 var oFUPLFlexFileFinal = new sap.m.FlexBox("idFUPLFlexFileFinal",{
         items: [backEDI,
                 oFUPLFlexType,
                 oFUPLFlexProcess,
                 oFUPLFlexFile1,
                 oFUPLFlexFile2,
                 oFUPLFlexButtons,
                 oFUPLCheckBoxANSIREPAIR,
                 oFUPLTextAreaFiles,
                 oFUPLTableResult
                 ],
         direction: "Column"
	 }).addStyleClass("marginMainLeft");

		return oFUPLFlexFileFinal;

    },

    /*FUPL : Reset File Upload */

    resetFUPL : function(){

	   sap.ui.getCore().byId("idFUPLTableResult").setVisible(false);
       sap.ui.getCore().byId("idFUPLUploaderFile1").setValue("");
	   sap.ui.getCore().byId("idFUPLUploaderFile2").setValue("");
	   sap.ui.getCore().byId("idFUPLCheckBoxANSIREPAIR").setChecked(false);
	   sap.ui.getCore().byId("idFUPLButtonFile").setEnabled(false);

	   sap.ui.getCore().byId("idFUPLComboType").setSelectedKey("");
	   sap.ui.getCore().byId("idFUPLCheckBoxANSIREPAIR").setVisible(false);
	   sap.ui.getCore().byId("idFUPLFlexFile2").setVisible(false);
	},

	/*FUPL : Validate Main File */

    validFUPLFileNew1 : function(){
    	isValid = true;
    	oSTRINGFUPLValidationMessage = "";
    	oJSONFUPLResultData = [];

		var serviceEDIDOC = "/sap/opu/odata/sap/ZEDI_SRV";
		var oFUPLUploaderFileid = "idFUPLUploaderFile1";
		var oFUPLUploaderFile = sap.ui.getCore().byId(oFUPLUploaderFileid);
		var fileName = oFUPLUploaderFile.getValue();

		var urlToSap = serviceEDIDOC + "/FUPLSet(Filename='" + fileName + "',Filenamedt='',Userid='" + sessionStorage.uName.toUpperCase() + "')";

        oModel = new sap.ui.model.odata.ODataModel(serviceEDIDOC, true);
        busyDialog.open();
        console.log(urlToSap);

        OData.request({
                      requestUri: urlToSap,
                      method: "GET",
                      dataType: 'json',
                      async:false,
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
                      console.log("Success : main file upload");
                      oJSONFUPLResultData.push({
                    	  "File" : "Main File",
                    	  "VResult" : data.ErrMsg,
                    	  "UResult" : ""
                      });
                      if(data.ErrMsg != "Success")
                    	  isValid = false;
                    },
                  function(error){
                    	sap.ui.commons.MessageBox.alert("Error in main file upload");
                    	console.log("Error in main file upload");
                    	busyDialog.close();
                  });


    },

    /*FUPL : Validate DT File */

    validFUPLFileNew2 : function(){

		var serviceEDIDOC = "/sap/opu/odata/sap/ZEDI_SRV";


		var oFUPLUploaderFileid = "idFUPLUploaderFile2";
		var oFUPLUploaderFile = sap.ui.getCore().byId(oFUPLUploaderFileid);
		var fileNameDt = oFUPLUploaderFile.getValue();

		var oFUPLUploaderFileidMain = "idFUPLUploaderFile1";
		var oFUPLUploaderFileMain = sap.ui.getCore().byId(oFUPLUploaderFileidMain);
		var fileNameMain = oFUPLUploaderFileMain.getValue();

		var urlToSap = serviceEDIDOC + "/FUPLSet(Filename='" + fileNameMain + "',Filenamedt='"+ fileNameDt +"',Userid='" + sessionStorage.uName.toUpperCase() + "')";

        oModel = new sap.ui.model.odata.ODataModel(serviceEDIDOC, true);
        busyDialog.open();
        console.log(urlToSap);
        OData.request({
                      requestUri: urlToSap,
                      method: "GET",
                      dataType: 'json',
                      async:false,
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
                      console.log("Success : DT file upload");
                      oJSONFUPLResultData.push({
                    	  "File" : "Main File",
                    	  "VResult" : data.ErrMsg,
                    	  "UResult" : ""
                      });
                      if(data.ErrMsg != "Success")
                    	  isValid = false;
                    },
                  function(error){
                    	sap.ui.commons.MessageBox.alert("Error in DT file upload");
                    	console.log("Error in DT file upload");
                    	busyDialog.close();
                  });


    },


    /*FUPL : Submit File Upload */

    submitFUPLFile : function(count){

    	var oCurrent = this;
		var oFReader = new FileReader();
		var serviceEDIDOC = "/sap/opu/odata/sap/ZEDI_SRV";
		var oFUPLUploaderFileid = "idFUPLUploaderFile" + count;

		var oFUPLUploaderFile = sap.ui.getCore().byId(oFUPLUploaderFileid);
		oFUPLUploaderFile.destroyParameters();
		oFUPLUploaderFile.setAdditionalData('');
		oFUPLUploaderFile.removeAllHeaderParameters();
		//var slugvalue = sessionStorage.uName + "$" + oFUPLUploaderFile.getValue();
		if(oFUPLUploaderFile.oFileUpload.files[0] != undefined && oFUPLUploaderFile.oFileUpload.files[0] != null){
			oFReader.readAsDataURL(oFUPLUploaderFile.oFileUpload.files[0]);

			oModel = new sap.ui.model.odata.ODataModel(serviceEDIDOC, true);
			oFUPLUploaderFile.removeAllHeaderParameters();
			oFUPLUploaderFile.addHeaderParameter(new sap.ui.unified.FileUploaderParameter(
					{
						name : "slug",
						value : oFUPLUploaderFile.getValue()
					}));

			oFUPLUploaderFile.addHeaderParameter(new sap.ui.unified.FileUploaderParameter(
					{
						name : "x-csrf-token",
						value : oModel.getSecurityToken()
					}));

			oFUPLUploaderFile.setSendXHR(true);
			oFUPLUploaderFile.setUseMultipart(false);
			//oFUPLUploaderFile.setMimeType("application/xlsx");

			var fileName = oFUPLUploaderFile.getValue();
			//filenum = filenum + 1;

			var sRead = "";
			if(count == 1)
				sRead = serviceEDIDOC + "/uploadSet(Filename='" + fileName + "',Filenamedt='" + "XX" + "',Userid='" + sessionStorage.uName.toUpperCase() + "')" + "/Attachments" ;
			else
				sRead = serviceEDIDOC + "/uploadSet(Filename='" + "XX" + "',Filenamedt='" + fileName + "',Userid='" + sessionStorage.uName.toUpperCase() + "')" + "/Attachments" ;

			//var sRead = serviceEDIDOC + "/uploadSet(Filename='" + fileName + "')" + "/Attachments" ;
			oFUPLUploaderFile.setUploadUrl(sRead);
			oFUPLUploaderFile.upload();
			oFUPLUploaderFile.attachUploadComplete(function(oControllerEvent) {
	            var statuscode = oControllerEvent.getParameter("status");
	            console.log('upload status : ', statuscode);

	            if(statuscode == '201'){
	            	//sap.m.MessageToast.show('File Uploaded!');
	            	if(count == 1){
	            		oJSONFUPLResultData[0].UResult = "Success";
	            	}else{
	            		oJSONFUPLResultData[1].UResult = "Success";
	            	}
	            }else{
	            	//sap.m.MessageToast.show('Error in File Upload!');
	            	if(count == 1){
	            		oJSONFUPLResultData[0].UResult = "Failed";
	            	}else{
	            		oJSONFUPLResultData[1].UResult = "Failed";
	            	}
	            }

	            var oFUPLTableResult = sap.ui.getCore().byId("idFUPLTableResult");
       			var oFUPLModelResult = new sap.ui.model.json.JSONModel();
       			oFUPLModelResult.setData({
       				modelData : oJSONFUPLResultData
       			});
       			oFUPLTableResult.setModel(oFUPLModelResult);
       			oFUPLTableResult.setVisibleRowCount(oJSONFUPLResultData.length);
       			oFUPLTableResult.bindRows("/modelData");
       			oFUPLTableResult.setVisible(true);

	        });
		}
		},

		submitEnabler : function(){
			var file1uploaded = sap.ui.getCore().byId("idFUPLUploaderFile1").oFileUpload.files.length;
        	var file2uploaded = sap.ui.getCore().byId("idFUPLUploaderFile2").oFileUpload;
        	if(file2uploaded == null){
        		file2uploaded = 1;
        	}else{
        		file2uploaded = file2uploaded.files.length;
        	}

        	if(sap.ui.getCore().byId("idFUPLCheckBoxANSIREPAIR").getChecked() == true){
        		if(file1uploaded == 1 && file2uploaded == 1 ){
        			sap.ui.getCore().byId("idFUPLButtonFile").setEnabled(true);
        		}else{
        			sap.ui.getCore().byId("idFUPLButtonFile").setEnabled(false);
        		}
        	}else{
        		if(file1uploaded == 1){
        			sap.ui.getCore().byId("idFUPLButtonFile").setEnabled(true);
        		}else{
        			sap.ui.getCore().byId("idFUPLButtonFile").setEnabled(false);
        		}
        	}
		}

});

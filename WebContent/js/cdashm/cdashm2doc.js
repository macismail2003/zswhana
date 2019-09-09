var oCDASHM2PopoverUploadDocument = [];
var jsonCDASHM2DocumentsUploadStatus = [];
var jsonCDASHM2Docs = [];
var oCDASHM2PopoverUploadDocument = "";
var oCDASHM2PopoverDeleteDocument = "";
var jsonCDASHM2AllDocs = [];
sap.ui.model.json.JSONModel.extend("cdashm2doc", {
		/* CDASHM2 - Function - Get Other Documents List */

		getOtherDocumentsList : function(docicon){

		if(sap.ui.getCore().byId("idCDASHM2TableDocuments") != undefined)
			sap.ui.getCore().byId("idCDASHM2TableDocuments").destroy();

		var oCDASHM2TableDocuments = new sap.ui.table.Table("idCDASHM2TableDocuments",{
    		visibleRowCount: 10,
            width: '750px',
            selectionMode: sap.ui.table.SelectionMode.None,
            columnHeaderVisible : false,
		}).addStyleClass("tblBorder");

		/*oCDASHM2TableDocuments.addColumn(new sap.ui.table.Column({
    		label: new sap.ui.commons.Label({text: "Doc. Type", textAlign: "Left"}).addStyleClass("wraptextcol"),
    		 width: "130px",
			 template: new sap.ui.commons.TextView({

			 }).bindProperty("text", "DocType").addStyleClass("borderStyle1"),
	           resizable:false,
	           //width:"150px",
	           //sortProperty: "msgid",
	           //filterProperty : "msgid",
			 }));*/

		oCDASHM2TableDocuments.addColumn(new sap.ui.table.Column({
    		label: new sap.ui.commons.Label({text: "Document", textAlign: "Left"}).addStyleClass("wraptextcol"),
			 width: "400px",
			 template: new sap.ui.commons.Link({
		     press : function(oEvent){
	 				  var binstring = oEvent.getSource().getBindingContext().getProperty("images");
					  var filename = oEvent.getSource().getBindingContext().getProperty("name");
			    	var ext = filename.split('.').pop().toLowerCase();
						var dispname = filename.split('_').pop();
			    	//get file content
			    	var byteCharacters = atob(binstring);
						var byteNumbers = new Array(byteCharacters.length);
						for (var i = 0; i < byteCharacters.length; i++) {
						   byteNumbers[i] = byteCharacters.charCodeAt(i);
						}
						var byteArray = new Uint8Array(byteNumbers);
				    	var crnFileMimeType = jQuery.grep(fileTypeJson, function(element, index){
							return element.fileextension == ext;
						});
						contentType = crnFileMimeType[0].mimetype;
						var blob = new Blob([byteArray], {type: contentType});
						//var blobUrl = URL.createObjectURL(blob);
						//window.open(blobUrl);
					if ((navigator.appName == 'Microsoft Internet Explorer') ||
		                 (!!navigator.userAgent.match(/Trident.*rv[ :]*11\./)))
			         	 {
							 	 	window.navigator.msSaveOrOpenBlob(blob, title+'.'+ext);
			         	 }else{
			         		var blobUrl = URL.createObjectURL(blob);
									window.open(blobUrl);
									/*let a = $("<a />", {
											href: blobUrl,
											download: dispname,
									})
									.appendTo("body").get(0).click();*/
			    		}
				 }
			 }).bindProperty("text", "dispname").addStyleClass("borderStyle1"),
	           resizable:false,
	           //width:"150px",
	           //sortProperty: "msgid",
	           //filterProperty : "msgid",
			 }));

			var oCDASHM2FlexDocuments = new sap.m.FlexBox({
	            items: [oCDASHM2TableDocuments
	                    ],
	            direction: "Row"
	            });


        	var oCDASHM2ModelDocuments = new sap.ui.model.json.JSONModel();
        	oCDASHM2ModelDocuments.setData({modelData: jsonCDASHM2Documents});

          	var oCDASHM2TableDocuments = sap.ui.getCore().byId("idCDASHM2TableDocuments");
          	oCDASHM2TableDocuments.setModel(oCDASHM2ModelDocuments);
          	oCDASHM2TableDocuments.bindRows("/modelData");

          	var jsonCDASHM2DocumentsLength = jsonCDASHM2Documents.length;
          	if(jsonCDASHM2DocumentsLength < 11){
          		oCDASHM2TableDocuments.setVisibleRowCount(jsonCDASHM2DocumentsLength);
          		oCDASHM2TableDocuments.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
          	}
          	else{
          		/*oCDASHM2TableStatusMonitor.setVisibleRowCount(15);
          		oCDASHM2TableStatusMonitor.setNavigationMode(sap.ui.table.NavigationMode.Paginator);*/
          		oCDASHM2TableDocuments.setVisibleRowCount(10);
          		oCDASHM2TableDocuments.setNavigationMode(sap.ui.table.NavigationMode.Scrollbar);
          	}


          	var oCDASHM2ButtonStatusMonitorDocuments = sap.ui.getCore().byId("idCDASHM2ButtonStatusMonitorDocuments");
          	var oCDASHM2PopoverStatusMonitorDocuments = new sap.m.Popover({
             title: "Other Documents",
             width:"300px",
             modal: false,
             placement: sap.m.PlacementType.Right,
             footer:  new sap.m.Bar({
            	 					visible : false,
                                    contentRight: [
                                                  new sap.m.Button({
                                                                   text: "Close",
                                                                   icon: "sap-icon://close",
                                                                   press: function () {
                                                                	   sap.ui.getCore().byId("idCDASHM2TableStatusMonitorDepotContact").close();
                                                                   }
                                                                   })
                                                  ],
                                    }),
             content: new sap.m.VBox({
                                     //width:"300px",
                                     items:  [oCDASHM2FlexDocuments]
                                     }),

             }).addStyleClass("sapUiPopupWithPadding");

          oCDASHM2PopoverStatusMonitorDocuments.openBy(docicon);

		},

		/* CDASHM2 - Function -Delete Documents */
		deleteDocuments : function(jsonCDASHM2AllDocsForDeletion){

			console.log("Delete Document Starts");
			var urlToSap = "";
			busyDialog.open();
			for(var i=0; i<jsonCDASHM2AllDocsForDeletion.length; i++){
			console.log("Delete Document No. : ", (i + 1));
			urlToSap = "picdeleteSet(IvFileName='" + jsonCDASHM2AllDocsForDeletion[i].name + "')";
	    	urlToSap = serviceDEP + urlToSap;
	    	oModel = new sap.ui.model.odata.ODataModel(serviceDEP, true);

		        console.log(urlToSap);
		        OData.request({
                    requestUri: urlToSap,
                    method: "GET",
                    dataType: 'json',
                    async: false,
                    headers:
                    {
	                    "X-Requested-With": "XMLHttpRequest",
	                    "Content-Type": "application/json; charset=utf-8",
	                    "DataServiceVersion": "2.0",
	                    "X-CSRF-Token":"Fetch"
                    }
                    },
                    function (data, response){

										 if(data.Result == "X"){
											 console.log("Success");
											 jsonCDASHM2AllDocsForDeletion[i].result = "Success";
										 }else{
											 console.log("Error");
											 jsonCDASHM2AllDocsForDeletion[i].result = "Error";
										 }
                  },
                function(error){
                  //sap.ui.commons.MessageBox.alert("Sorry, there is an error");
									console.log("Error");
									jsonCDASHM2AllDocsForDeletion[i].result = "Error";
                });
				}
				busyDialog.close();

				sap.ui.getCore().byId("idCDASHM2ButtonDeleteDocumentDelete").setVisible(false);
				sap.ui.getCore().byId("idCDASHM2TableDeleteDocumentResult").setVisible(true);
				var oCDASHM2ModelDeleteDocument = new sap.ui.model.json.JSONModel();
				oCDASHM2ModelDeleteDocument.setData({modelData: jsonCDASHM2AllDocsForDeletion});

				var oCDASHM2TableDeleteDocument = sap.ui.getCore().byId("idCDASHM2TableDeleteDocument");
				oCDASHM2TableDeleteDocument.setModel(oCDASHM2ModelDeleteDocument);
				oCDASHM2TableDeleteDocument.setVisibleRowCount(jsonCDASHM2AllDocsForDeletion.length);
				oCDASHM2TableDeleteDocument.bindRows("/modelData");

				var ocdashm2 = new cdashm2();
				var oCDASHM2ContentThumbNail = ocdashm2.setContentThumbnail();
				sap.ui.getCore().byId("idCDASHM2ContentFinal").insertItem(oCDASHM2ContentThumbNail, 2);
				sap.ui.getCore().byId("idCDASHM2PanelCarousel").setExpanded(true);

		},

		/* CDASHM2 - Function - Open Delete Documents Popup */

		openDeleteDocumentsPopup : function(button){
			var oCurrent = this;

			if(sap.ui.getCore().byId("idCDASHM2ButtonDeleteDocumentDelete") != undefined){
				sap.ui.getCore().byId("idCDASHM2ButtonDeleteDocumentDelete").destroy();
			}

			var oCDASHM2ButtonDeleteDocumentDelete = new sap.ui.commons.Button("idCDASHM2ButtonDeleteDocumentDelete",{
								text : "Delete",
								width:"80px",
								styled:false,
								layoutData: new sap.ui.layout.GridData({span: "L2 M2 S4",linebreak: false, margin: true}),
								press:function(oEvent){
									var jsonCDASHM2AllDocsForDeletion = [];
									var arraySelLines = sap.ui.getCore().byId("idCDASHM2TableDeleteDocument").getSelectedIndices();
									for(var i=0; i<jsonCDASHM2AllDocs.length; i++){
			         			if(arraySelLines.indexOf(i) != -1){
			         				var oDetData = sap.ui.getCore().byId("idCDASHM2TableDeleteDocument").getContextByIndex(i);
			         				if(oDetData != undefined){
			         				var realPath = oDetData.getPath().split('/')[2];
											jsonCDASHM2AllDocsForDeletion.push({
												"name" : jsonCDASHM2AllDocs[realPath].name,
												"dispname" : jsonCDASHM2AllDocs[realPath].dispname,
												"result" : ""
											});
			         				}
			         			}
			         		}
									oCurrent.deleteDocuments(jsonCDASHM2AllDocsForDeletion);
								}}).addStyleClass("dashBtn");

			var oCDASHM2ButtonDeleteDocumentClose = new sap.ui.commons.Button({
							text : "Close",
							styled:false,
							visible:true,
							width:"80px",
							type:sap.m.ButtonType.Unstyled,
							layoutData: new sap.ui.layout.GridData({span: "L2 M2 S4",linebreak: false, margin: true}),
							//icon: sap.ui.core.IconPool.getIconURI("email"),
							press:function(oEvent){
								oCDASHM2PopoverDeleteDocument.close();
							}
					}).addStyleClass("dashBtn");

			var oCDASHM2FlexDeleteDocumentButtons = new sap.m.FlexBox({
						items: [oCDASHM2ButtonDeleteDocumentDelete,
										new sap.ui.commons.Label( {text: " ",width : '8px'}),
										oCDASHM2ButtonDeleteDocumentClose
										],
						direction: "Row"
					});

					if(sap.ui.getCore().byId("idCDASHM2TableDeleteDocument") != undefined){
						sap.ui.getCore().byId("idCDASHM2TableDeleteDocument").destroy();
					}

					if(sap.ui.getCore().byId("idCDASHM2TableDeleteDocumentResult") != undefined){
						sap.ui.getCore().byId("idCDASHM2TableDeleteDocumentResult").destroy();
					}


			/* CDASHM2 - Table - Documents Delete */

			var oCDASHM2TableDeleteDocument = new sap.ui.table.Table("idCDASHM2TableDeleteDocument",{
		 		columnHeaderVisible : true,
		 		width: '400px',
		 		selectionMode: sap.ui.table.SelectionMode.MultiToggle
			}).addStyleClass("sapUiSizeCompact tblBorder");

			oCDASHM2TableDeleteDocument.addColumn(new sap.ui.table.Column({
				 label: new sap.ui.commons.Label({text: "Name", textAlign: "Left"}).addStyleClass("wraptextcol"),
				 template: new sap.ui.commons.TextView({
					 textAlign: "Left"
				 }).bindProperty("text", "dispname").addStyleClass("borderStyle1"),
		           resizable:false,
		           width:"150px"
				 }));

				 oCDASHM2TableDeleteDocument.addColumn(new sap.ui.table.Column("idCDASHM2TableDeleteDocumentResult",{
					 visible : false,
				 	 label: new sap.ui.commons.Label({text: "Result", textAlign: "Left"}).addStyleClass("wraptextcol"),
				 	 template: new sap.ui.commons.TextView({
				 		 textAlign: "Left"
				 	 }).bindProperty("text", "result").addStyleClass("borderStyle1"),
				 				 resizable:false,
				 				 width:"80px"
				 	 }));

				 jsonCDASHM2AllDocs = [];

				 for(var i=0; i<jsonCDASHM2Pictures.length;i++){
					 jsonCDASHM2AllDocs.push({
						 "name" : jsonCDASHM2Pictures[i].name,
						 "dispname" : jsonCDASHM2Pictures[i].dispname
					 });
				 }

				 for(var i=0; i<jsonCDASHM2Documents.length;i++){
					 jsonCDASHM2AllDocs.push({
						 "name" : jsonCDASHM2Documents[i].name,
						 "dispname" : jsonCDASHM2Documents[i].dispname
					 });
				 }

				 var oCDASHM2ModelDeleteDocument = new sap.ui.model.json.JSONModel();
				 oCDASHM2ModelDeleteDocument.setData({modelData: jsonCDASHM2AllDocs});

				 oCDASHM2TableDeleteDocument.setModel(oCDASHM2ModelDeleteDocument);
				 oCDASHM2TableDeleteDocument.setVisibleRowCount(jsonCDASHM2AllDocs.length);
				 oCDASHM2TableDeleteDocument.bindRows("/modelData");

				 /* CDASHM2 - Popover - Final Content */

				 var oCDASHM2FlexDeleteDocument = new sap.m.FlexBox({
	 						items: [oCDASHM2TableDeleteDocument,
	 										new sap.ui.commons.Label( {text: " ",width : '8px'}),
	 										oCDASHM2FlexDeleteDocumentButtons
	 										],
	 						direction: "Column"
	 					});

				 /* CDASHM2 - Popover - Delete Document */

	 			oCDASHM2PopoverDeleteDocument = new sap.m.Popover({
	 		        title: "Delete Documents",
	 		          width:"550px",
	 		          modal: true,
	 		          placement: sap.m.PlacementType.Right,
	 		          content: new sap.m.VBox({
	 		                                  //width:"300px",
	 		                                  items:  [oCDASHM2FlexDeleteDocument]
	 		                                  }),

	 		          }).addStyleClass("sapUiPopupWithPadding");


	 			oCDASHM2PopoverDeleteDocument.openBy(button);

		},

		/* CDASHM2 - Function - Open Upload Documents Popup */

		openUploadDocumentsPopup : function(button){

			// Destroy elements

			if(sap.ui.getCore().byId("idCDASHM2UploaderDocument") != undefined){
				sap.ui.getCore().byId("idCDASHM2UploaderDocument").destroy();
			}

			if(sap.ui.getCore().byId("idCDASHM2UploaderDocument") != undefined){
				sap.ui.getCore().byId("idCDASHM2UploaderDocument").destroy();
			}


			if(sap.ui.getCore().byId("idCDASHM2ButtonUpload") != undefined){
				sap.ui.getCore().byId("idCDASHM2ButtonUpload").destroy();
			}


			if(sap.ui.getCore().byId("idCDASHM2ButtonReset") != undefined){
				sap.ui.getCore().byId("idCDASHM2ButtonReset").destroy();
			}


			if(sap.ui.getCore().byId("idCDASHM2TableFiles") != undefined){
				sap.ui.getCore().byId("idCDASHM2TableFiles").destroy();
			}


			if(sap.ui.getCore().byId("idCDASHM2FormTable") != undefined){
				sap.ui.getCore().byId("idCDASHM2FormTable").destroy();
			}


			if(sap.ui.getCore().byId("idCDASHM2LabelSelectFiles") != undefined){
				sap.ui.getCore().byId("idCDASHM2LabelSelectFiles").destroy();
			}


			if(sap.ui.getCore().byId("idCDASHM2FormUploadDocument") != undefined){
				sap.ui.getCore().byId("idCDASHM2FormUploadDocument").destroy();
			}


			if(sap.ui.getCore().byId("idCDASHM2FormTable") != undefined){
				sap.ui.getCore().byId("idCDASHM2FormTable").destroy();
			}

			var ocdashm2doc = new cdashm2doc();
			var oCDASHM2ContentUploadDocument = ocdashm2doc.loadCDASHM2UploadDocument();



			/* CDASHM2 - Popover - Upload Document */

			oCDASHM2PopoverUploadDocument = new sap.m.Popover({
		        title: "Upload Documents",
		        width:"1300px",
		          modal: true,
		          placement: sap.m.PlacementType.Right,
		          content: new sap.m.VBox({
		                                  //width:"300px",
		                                  items:  [oCDASHM2ContentUploadDocument]
		                                  }),

		          }).addStyleClass("sapUiPopupWithPadding");


			oCDASHM2PopoverUploadDocument.openBy(button);

		},

		getCDASHM2DataUploadNew : function(){
			var oCurrent = this;
			//var oFReader = new FileReader();
			var serviceDEPDOC = "/sap/opu/odata/sap/ZMNR_DEP_DOC_SRV";

			var oCDASHM2UploaderDocument = sap.ui.getCore().byId("idCDASHM2UploaderDocument");
			var oCDASHM2UploaderDocumentLength = sap.ui.getCore().byId("idCDASHM2UploaderDocument").oFileUpload.files.length;

			oCDASHM2UploaderDocument.destroyParameters();
			oCDASHM2UploaderDocument.setAdditionalData('');
			oCDASHM2UploaderDocument.removeAllHeaderParameters();


				//oFReader.readAsDataURL(oFileMultiple.oFileUpload.files[0]);

				oModel = new sap.ui.model.odata.ODataModel(serviceDEPDOC, true);
				oCDASHM2UploaderDocument.removeAllHeaderParameters();
				oCDASHM2UploaderDocument.addHeaderParameter(new sap.ui.unified.FileUploaderParameter(
						{
							name : "slug",
							value : oCDASHM2UploaderDocument.getValue()
						}));

				oCDASHM2UploaderDocument.addHeaderParameter(new sap.ui.unified.FileUploaderParameter(
						{
							name : "x-csrf-token",
							value : oModel.getSecurityToken()
						}));

				oCDASHM2UploaderDocument.setSendXHR(true);
				//oFileMultiple.setMultiple(false);
				oCDASHM2UploaderDocument.setUseMultipart(false);
				//oFileMultiple.setMimeType("application/xlsx");


				var fileName = sap.ui.getCore().byId("idCDASHM2UploaderDocument").oFileUpload.files[0].name.split('.').pop();
				var serial = global3SerialNo;
				var depot = global3Depot;
				var estimate = global3EstimateNo;
				debugger;
				var runningnumber = jsonCDASHM2Pictures.length + jsonCDASHM2Documents.length;
				runningnumber = runningnumber + 1;
				runningnumber = padZero3(runningnumber,3);
				var sRead = serviceDEPDOC + "/uploadSet(Filename='" + fileName + "',Estimate='" + estimate + "',Serial='" + serial + "',Depot='" + depot + "')" + "/Attachments" ;
				oCDASHM2UploaderDocument.setUploadUrl(sRead);
				oCDASHM2UploaderDocument.upload();
				oCDASHM2UploaderDocument.attachUploadComplete(function(oControllerEvent) {
		            var statuscode = oControllerEvent.getParameter("status");
		            if(statuscode == '201'){
		             //oCurrent.filesUpload(filenum);
		            	sap.ui.commons.MessageBox.alert("Files uploaded");
		            }else{
		            	sap.ui.commons.MessageBox.alert("Errors in file upload");
		            }
		        });

		},

		/* CDASHM2 - Function - Data Upload */

		getCDASHM2DataUpload: function(){

				try{
					function padZero(num, size) {
					    var s = num+"";
					    while (s.length < size) s = "0" + s;
					    return s;
					}

					var oCDASHM2UploaderDocument = sap.ui.getCore().byId("idCDASHM2UploaderDocument");
					if((oCDASHM2UploaderDocument.getValue() == '') || (oCDASHM2UploaderDocument.oFilePath.getValue() == ''))
					{
						sap.ui.commons.MessageBox.alert("File input missing." + "\n Please check your inputs and retry." );
						return false;
					}
					jsonCDASHM2DocumentsUploadStatus.length = 0;	//RESET FOR UPLOAD FILE
					busyDialog.open();
					oCDASHM2UploaderDocument.destroyParameters();
					oCDASHM2UploaderDocument.setAdditionalData('');
					var oCDASHM2Doc = new cdashm2doc();
					oCDASHM2Doc.makeCDASHM2Binary();

					var ocdashm2 = new cdashm2();
					var oCDASHM2ContentThumbNail = ocdashm2.setContentThumbnail();
					sap.ui.getCore().byId("idCDASHM2ContentFinal").insertItem(oCDASHM2ContentThumbNail, 2);
					sap.ui.getCore().byId("idCDASHM2PanelCarousel").setExpanded(true);

				}catch(e){
					busyDialog.close();
					sap.ui.commons.MessageBox.alert("Error on uploading file " + e);
				}
			},

			/* CDASHM2 - Function - Loading Tables */

			loadCDASHM2UploadDocument : function() {

				jQuery.sap.require("sap.ui.commons.MessageBox");

				function fnResetCallbackMsgBox(sResult){
					if(sResult == "YES"){
						var oCDASHM2TableFiles = sap.ui.getCore().byId("idCDASHM2TableFiles");
						if (oCDASHM2TableFiles != undefined) {
							oCDASHM2TableFiles.destroy();
						}

						var oUpldSnglCertificate  = sap.ui.getCore().byId("idCDASHM2UploaderDocument");
						oUpldSnglCertificate.setValue('');
						oUpldSnglCertificate.oFilePath.setValue('');
					}
				};


				// CDASHM2 - Flex - Buttons

				var oCDASHM2ButtonUpload = new sap.ui.commons.Button("idCDASHM2ButtonUpload", {
							text : "Upload",
							width:"80px",
							styled:false,
							layoutData: new sap.ui.layout.GridData({span: "L2 M2 S4",linebreak: false, margin: true}),
							press : this.getCDASHM2DataUploadNew
						}).addStyleClass("dashBtn");

				var ResetMessage = "This will clear the screen content.\n Do you want to continue?";

				var oCDASHM2ButtonReset = new sap.ui.commons.Button("idCDASHM2ButtonReset",{
				          text : "Reset",
				          width:"80px",
				          styled:false,
				          layoutData: new sap.ui.layout.GridData({span: "L2 M2 S4",linebreak: false, margin: true}),
				          press:function(){
				        	  			sap.ui.commons.MessageBox.show(ResetMessage,sap.ui.commons.MessageBox.Icon.WARNING,"Warning",
				        		  		[sap.ui.commons.MessageBox.Action.YES, sap.ui.commons.MessageBox.Action.NO],
				        		  		fnResetCallbackMsgBox, sap.ui.commons.MessageBox.Action.YES);
				          }}).addStyleClass("dashBtn");

				var oCDASHM2ButtonClose = new sap.ui.commons.Button({
		            text : "Close",
		            styled:false,
		            visible:true,
		            width:"80px",
		            type:sap.m.ButtonType.Unstyled,
		            layoutData: new sap.ui.layout.GridData({span: "L2 M2 S4",linebreak: false, margin: true}),
		            //icon: sap.ui.core.IconPool.getIconURI("email"),
		            press:function(oEvent){
		            	oCDASHM2PopoverUploadDocument.close();
		            }
		        }).addStyleClass("dashBtn");

				var oCDASHM2FlexButtons = new sap.m.FlexBox({
				      items: [oCDASHM2ButtonUpload,
				              new sap.ui.commons.Label( {text: " ",width : '8px'}),
				              oCDASHM2ButtonReset,
				              new sap.ui.commons.Label( {text: " ",width : '8px'}),
				              oCDASHM2ButtonClose],
				      direction: "Row"
				    });

			   // CDASHM2 - Flex - Required
		       var labStar = new sap.ui.commons.Label({text: "* "}).addStyleClass("MandatoryStar");
		       var lblSpaceLegend = new sap.ui.commons.Label( {text: " ",width : '5px'});
				  var labRequired = new sap.ui.commons.Label({text: " Mandatory Field",wrapping: true});
				  var oCDASHM2FlexRequired = new sap.m.FlexBox({
					 // layoutData: new sap.ui.layout.GridData({span: "L7 M6 S4"}),
		              items: [labStar,lblSpaceLegend,labRequired],
		              direction: "Row"
				  }).addStyleClass("marginTop10");

				var oCDASHM2FormUploadDocumentLayout = new sap.ui.layout.form.ResponsiveGridLayout({breakpointL: 700,
							  breakpointM: 400});

				var oCDASHM2UploaderDocument = new sap.ui.commons.FileUploader("idCDASHM2UploaderDocument",{
							name : "uploadfileData",
							uploadUrl : "UploadServlet",
							value : "",
							multiple : false,
							buttonText : " Browse ",
							layoutData: new sap.ui.layout.GridData({span: "L12 M12 S12",linebreak: false, margin: true}),
							sameFilenameAllowed : false,
							additionalData : "abc=123&test=456",
							change : function(oEvent) {
								var oCDASHM2TableFiles = sap.ui.getCore().byId("idCDASHM2TableFiles");
								if (oCDASHM2TableFiles != undefined) {
									oCDASHM2TableFiles.destroy();
								}
								//CHECK FILE EXTENTION
								var files = oEvent.oSource.oFileUpload.files; // $('#ocdashm2doc-fu');
								var valid = true;
								if (files != undefined) {	//INSIDE COMES FOR OTHER THAN IE BROWSER
									for ( var i = 0; i < files.length; i++) {
										var ext = oEvent.oSource.oFileUpload.files[i].name.split('.').pop().toLowerCase();
										if($.inArray(ext, ['pdf', 'doc', 'docx', 'png', 'jpg', 'jpeg', 'txt', 'xls', 'xlsx']) == -1) {
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
									var oCDASHM2Doc = new cdashm2doc();
									var oCDASHM2DocTable = oCDASHM2Doc.createCDASHM2DocTable(oEvent);

									var oCDASHM2FormTable = sap.ui.getCore().byId("idCDASHM2FormTable");
									oCDASHM2FormTable.insertField(oCDASHM2DocTable, 0);
								}
							}
						});

				// oUploadMultipleCertificate.setAttribute('Multiple','true');
				// oUpldSnglCertificate.setUseMultipart(true);
				// Create a ComboBox
				var oCDASHM2LabelSelectFiles =new sap.ui.commons.Label("idCDASHM2LabelSelectFiles", {text: "Select Files for Uploading: ",
					required:true}).addStyleClass("sapUiLbl floatLeft");

				var oCDASHM2FormUploadDocument = new sap.ui.layout.form.Form(
						"idCDASHM2FormUploadDocument",
						{
							layout : oCDASHM2FormUploadDocumentLayout,
							formContainers : [
									new sap.ui.layout.form.FormContainer(
											"SelFileUpldMultCert",
											{
												formElements : [
														new sap.ui.layout.form.FormElement(
																{
																	//label : oLblSelFile,
																fields : [ oCDASHM2LabelSelectFiles ],
																layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
																}),
																new sap.ui.layout.form.FormElement(
																		{
																			label : "",
																		}),
														new sap.ui.layout.form.FormElement(
																{
																	fields : [oCDASHM2UploaderDocument],
																	layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
																}),
																new sap.ui.layout.form.FormElement(
																		{
																			label : "",
																		}),
														new sap.ui.layout.form.FormElement("idCDASHM2FormTable",
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
																	fields : [ oCDASHM2FlexButtons ],
																	layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
																}),
														new sap.ui.layout.form.FormElement(
																{
																	fields : [ oCDASHM2FlexRequired ],
																	layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
																}),
														new sap.ui.layout.form.FormElement(
																{
																	fields : [new sap.ui.commons.Label({text: "Support Format: pdf, doc, docx, png, jpg, jpeg, txt, xls, xlsx"}).addStyleClass("font11 WarningMessage")],
																	layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
																})
																]
											}) ]
						});

				return oCDASHM2FormUploadDocument;
			},

			/* CDASHM2 - Function - To Check all the files are converted */
			loadCDASHM2CheckCoversion : function (){
				var oCDASHM2CheckConverted = true;
				if(jsonCDASHM2DocumentsUploadStatus.length>0){
					for(var k=0; k < jsonCDASHM2DocumentsUploadStatus.length; k++){
						if((jsonCDASHM2DocumentsUploadStatus[k].status == "PENDING") || (jsonCDASHM2DocumentsUploadStatus[k].status == "FAILED")
								|| (jsonCDASHM2DocumentsUploadStatus[k].status == "START"))
							oCDASHM2CheckConverted = false;
					}
				}
				return oCDASHM2CheckConverted;
			},

			/* CDASHM2 - Function - To Check exists already */
			loadCDASHM2ExistsAlready : function (uploaderFileName){
				for(var j=0; j <jsonCDASHM2DocumentsUploadStatus.length;j++){
					if(jsonCDASHM2DocumentsUploadStatus[j].fileSelName == uploaderFileName){
						return false;
						break;
					}
				}
				return true;
			},

			/* CDASHM2 - Function - Make JSON Binary Data */
			makeCDASHM2Binary: function(){
				function padZero(num, size) {
				    var s = num+"";
				    while (s.length < size) s = "0" + s;
				    return s;
				};

				var oCDASHM2UploaderDocument = sap.ui.getCore().byId("idCDASHM2UploaderDocument");

				for(var i = 0; i< oCDASHM2UploaderDocument.oFileUpload.files.length; i++){
					var fileext = oCDASHM2UploaderDocument.oFileUpload.files[i].name.split('.');
					var fileextlength = fileext.length - 1;
					var fileextreal = fileext[fileextlength];

					var retnVal = true;

					if(jsonCDASHM2DocumentsUploadStatus.length > 0)
						retnVal = this.loadCDASHM2ExistsAlready(oCDASHM2UploaderDocument.oFileUpload.files[i].name);

					if(!retnVal){
						continue;
					}
					jsonCDASHM2DocumentsUploadStatus.push({
						'lineno': padZero(i+1,2) ,
						'fileSelName': oCDASHM2UploaderDocument.oFileUpload.files[i].name ,
						"binarydata" : "",
						"status" : 'PENDING'
					});

					var oFReader = new FileReader();
					//oFReader.readAsDataURL(oCDASHM2UploaderDocument.oFileUpload.files[i]);
					oFReader.readAsBinaryString(oCDASHM2UploaderDocument.oFileUpload.files[i]);

					oFReader.onload = function (oFREvent) {
						 var binaryString = oFREvent.target.result;
						jsonCDASHM2DocumentsUploadStatus[i].status = "SUCCESS";
					  jsonCDASHM2DocumentsUploadStatus[i].binarydata = btoa(binaryString);//oFReader.result;//.substring(28); //oCDASHM2UploaderDocument.oFileUpload.files[i].name +'-data-' +oFReader.result.substring(28);

						var oCurnFile = new cdashm2doc();
						oCurnFile.makeCDASHM2Binary();
					},
					oFReader.onerror = function (err){
						jsonCDASHM2DocumentsUploadStatus[i].status = "FAILED";
					};
					break;
				}

				//CALL ONLINE PUT ODATA REQUEST
				if(this.loadCDASHM2CheckCoversion()){

					var IFilename1='', IFilename2 ='', IFilename3 ='', IFilename4 ='', IFilename5 ='',	binaryDataArry = [];
					for(var i =0; i < jsonCDASHM2DocumentsUploadStatus.length; i++){
						if(i<5){
							IFilename1 +=	jsonCDASHM2DocumentsUploadStatus[i].fileSelName + '|';
						}else if(i < 10){
							IFilename2 +=  jsonCDASHM2DocumentsUploadStatus[i].fileSelName + '|';
						}else if(i < 15){
							IFilename3 +=  jsonCDASHM2DocumentsUploadStatus[i].fileSelName + '|';
						}else if(i < 20){
							IFilename4 +=  jsonCDASHM2DocumentsUploadStatus[i].fileSelName + '|';
						}else if(i < 25){
							IFilename5 +=  jsonCDASHM2DocumentsUploadStatus[i].fileSelName + '|';
						}

						binaryDataArry.push({
							"File": jsonCDASHM2DocumentsUploadStatus[i].binarydata
						});
					};

					for(var j=binaryDataArry.length;j< 25;j++){
						binaryDataArry.push({
							"File": ""
						});
					};

					var oDataPostParam = {
			    			Id : "1",

			    			ISerial : global3SerialNo,
			    			IAufnr : global3EstimateNo,
			    			IDepot : global3Depot,


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

					var urlToCall = serviceDEP + "picuploadSet('1')";
					var objCurnt = new cdashm2doc();
					var objUtil = new utility();
				    objUtil.doOnlinePostData(urlToCall, oDataPostParam, objCurnt.successCDASHM2Upload, objCurnt.errorCDASHM2Upload);
				}
			},

		/* CDASHM2 - Function - Success After Upload */
		successCDASHM2Upload : function(resultdata, response){
				//busyDialog.close();
				busyDialog.close();
				try{
					if(response != undefined){
						if(response.statusCode == '204'){
							var oCDASHM2UploaderDocument = sap.ui.getCore().byId("idCDASHM2UploaderDocument");
							oCDASHM2UploaderDocument.setValue('');
							oCDASHM2UploaderDocument.oFilePath.setValue('');
							oCDASHM2UploaderDocument.destroyParameters();
							oCDASHM2UploaderDocument.setAdditionalData('');

							var oCDASHM2TableFiles = sap.ui.getCore().byId("idCDASHM2TableFiles");
							if (oCDASHM2TableFiles != undefined) {
								oCDASHM2TableFiles.destroy();
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

		/* CDASHM2 - Function - Error After Upload */
		errorCDASHM2Upload: function(err){
			sap.ui.commons.MessageBox.alert("Error Uploading Files!");
		},

		/* CDASHM2 - Function - Create Table Selected File Upload */

		createCDASHM2DocTable : function(oEvent) {

			var vFilePath = "";
			var objutil = new utility();
			jsonCDASHM2Docs = [];
			jsonCDASHM2Docs =	objutil.uploadFileChange(oEvent,"cdashm2doc", vFilePath);

			var oCDASHM2TableFiles = sap.ui.getCore().byId("idCDASHM2TableFiles");

			if (oCDASHM2TableFiles != undefined) {
				oCDASHM2TableFiles.destroy();
			}

			var oCDASHM2TableFiles = new sap.ui.table.Table(
					'idCDASHM2TableFiles',
					{
						visibleRowCount: 0,
						firstVisibleRow : 3,
						columnHeaderHeight : 30,
						selectionMode : sap.ui.table.SelectionMode.None,
						navigationMode : sap.ui.table.NavigationMode.None,
						//layoutData: new sap.ui.layout.GridData({span: "L7 M10 S12",linebreak: true, margin: false}),
						width : "300px",
					}).addStyleClass('tblBorder');



			// Define the columns and the control templates to be
			// used
			oCDASHM2TableFiles.addColumn(new sap.ui.table.Column({
				label : new sap.ui.commons.Label({
					text : "Files Selected"
				}),
				template : new sap.ui.commons.TextView()
						.bindProperty("text", "newfilename"),
				hAlign : "Center"
			}));

			// Create a model and bind the table rows to this model
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData({
				modelData : jsonCDASHM2Docs
			});
			oCDASHM2TableFiles.setModel(oModel);
			oCDASHM2TableFiles.bindRows("/modelData");
			oCDASHM2TableFiles.setVisibleRowCount(jsonCDASHM2Docs.length);

			return oCDASHM2TableFiles;
		}
});

function padZero3(num, size) {
		    var s = num+"";
		    while (s.length < size) s = "0" + s;
		    return s;
};

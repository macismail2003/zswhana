jQuery.sap.require("sap.ui.model.json.JSONModel");
var ExcelB64Data;
var str1 = "";
var str2 = "";
var str3 = "";
var str4 = "";
var str5 = "";
var str6 = "";
var str7 = "";
var str8 = "";
var str9 = "";
var str10 = "";
var isFileThere = false;
var oInvR;
var json = [];
var csvValid = true;
var jsonTemplate = [
         {Status:"",Unit_Number:"",In_Date:""}
];
		

sap.ui.model.json.JSONModel.extend("inventoryReconSearch", {
	createInventorySearch: function(oController){
		oInvR = this;
		var labHardCode =  new sap.ui.commons.Label({text:"Depot Code:",
			wrapping: true,
			required:true,
			layoutData: new sap.ui.layout.GridData({span: "L2 M2 S4",linebreak: true, margin: false})});
		/*var labHardCode2 =  new sap.ui.commons.Label({text:"Temporary Field Added till Security is implemented",
			wrapping: true,
			layoutData: new sap.ui.layout.GridData({span: "L2 M2 S4"})}).addStyleClass("font10");*/
		
		var HrdFlex = new sap.m.FlexBox({ items: [  labHardCode ],  direction: "Column"	,
			layoutData: new sap.ui.layout.GridData({span: "L2 M2 S4",linebreak: true, margin: false})});
		
		// Buttons
    	var btnDownload = new sap.m.Button({
	          text : "Download",
	          type:sap.m.ButtonType.Unstyled,
	          width:"90px",
	          layoutData: new sap.ui.layout.GridData({span: "L2 M2 S4",linebreak: true, margin: false}),
	          press:function(){
	        	  //alert("Download Clicked!");
	        	  downloadTable(jsonTemplate);
	        	  
	          }
		}).addStyleClass("submitBtn marginTop10");
    	
    	var labDownloadTxt =  new sap.ui.commons.Label({text:"Download Inventory Reconciliation Template",
			wrapping: true,
			layoutData: new sap.ui.layout.GridData({span: "L4 M6 S7"})}).addStyleClass("marginTop18");
    	

    	var oUser =  new loggedInU();
		var uId = "";
		var utype = oUser.getLoggedInUserType();
		var isDepotCodeEnabled = false;
		var isInstructionsEnabled = false;
		var showSaveButton = false;
		if(($.inArray(utype, ["DEPOT","FACTORY"])) != -1){
			uId = oUser.getLoggedInUserID();
			isDepotCodeEnabled = false;
		}
		else
			isDepotCodeEnabled = true;
		
		if(($.inArray(utype, ["SEACO"])) != -1){
			isInstructionsEnabled = true;
			showSaveButton = true;
		}
		else{
			isInstructionsEnabled = false;
		    showSaveButton = false;
		}
		
    	var txtHardCode = new sap.ui.commons.TextField("invRecHardCode",{
			layoutData: new sap.ui.layout.GridData({span: "L4 M5 S6"}),
			placeholder: "Depot Code",
			enabled:isDepotCodeEnabled,
			value:uId,
			liveChange:function(oControlEvent){
				txtHardCode.setPlaceholder("Depot Code");
				txtHardCode.setValueState(sap.ui.core.ValueState.None);
			},
		}).addStyleClass("FormInputStyle");
    	
    	var labSaveTxt =  new sap.ui.commons.Label({text:"Instructions:",
			wrapping: true,
			layoutData: new sap.ui.layout.GridData({span: "L2 M2 S4",margin: false})}).addStyleClass("marginTop10");
    	
    	// Buttons
    	var btnSave = new sap.m.Button({
	          text : "Save",
	          type:sap.m.ButtonType.Unstyled,
	          width:"90px",
	          visible: showSaveButton,
	          layoutData: new sap.ui.layout.GridData({span: "L2 M2 S4",linebreak: true, margin: false}),
	          press:function(){
	        	  //alert("Save Clicked!");
	        	  saveInstructions();
	        	  
	        	  
	          }
		}).addStyleClass("submitBtn marginTop10");
    	
    	var SaveFlex = new sap.m.FlexBox({ items: [  labSaveTxt, btnSave  ],  direction: "Column"	,
			layoutData: new sap.ui.layout.GridData({span: "L2 M2 S4",linebreak: true, margin: false})});
    	
		// Textarea
    	oInvRecon = new sap.ui.commons.TextArea('docText',{
    		layoutData: new sap.ui.layout.GridData({span: "L4 M6 S7"/*, linebreak: true, margin: false*/}),
    		//value:"< Role = Seaco* , enter instructions here. Role = Depot* , view instructions. Role = Factory* , view instructions.>",
    		rows: 22,
    		cols:60,
    		enabled:isInstructionsEnabled,
    	}).addStyleClass("marginTop10 invenReconInstructions");
    	
    	//oInvRecon.setMaxLength(750);
    	
    	var vHDivider1 = new sap.ui.commons.HorizontalDivider({width: "100%", type: "Area", height: "Medium",
    		layoutData: new sap.ui.layout.GridData({span: "L6 M8 S11",linebreak: true, margin: false})
    	});
    	var vHDivider2 = new sap.ui.commons.HorizontalDivider({width: "100%", type: "Area", height: "Medium",
    		layoutData: new sap.ui.layout.GridData({span: "L6 M8 S11",linebreak: true, margin: false})
    	});
    	var vHDivider3 = new sap.ui.commons.HorizontalDivider({width: "100%", type: "Area", height: "Medium",
    		layoutData: new sap.ui.layout.GridData({span: "L6 M8 S11",linebreak: true, margin: false})
    	});
    	var vHDivider4 = new sap.ui.commons.HorizontalDivider({width: "100%", type: "Area", height: "Medium",
    		layoutData: new sap.ui.layout.GridData({span: "L6 M8 S11",linebreak: true, margin: false})
    	});
    	// Label
       var oLabelUpload = new sap.ui.commons.Label({
    	   text:"Upload File:",
    	   layoutData: new sap.ui.layout.GridData({span: "L2 M2 S4",linebreak: true, margin: false}),
    	});
       var oLabelUpload2 =  new sap.ui.commons.Label({text:"Support Formats: XLS, CSV",
			wrapping: true,
			layoutData: new sap.ui.layout.GridData({span: "L2 M2 S4"})}).addStyleClass("font11 WarningMessage");
		
		var uploadFlex = new sap.m.FlexBox({ items: [  oLabelUpload, oLabelUpload2  ],  direction: "Column"	,
			layoutData: new sap.ui.layout.GridData({span: "L2 M2 S4",linebreak: true, margin: false})});
	       
	    // create the FileUploader control
			var FileUploader = new sap.ui.commons.FileUploader("fileUp",{
			sameFilenameAllowed:true,
			buttonText:"Browse",
			change:function(event){
				/*csvValid = true;
				json=[];
				b64it();*/
				if(event.getParameter('newValue').trim().length >0)
					sap.ui.getCore().byId("InvRecUploadBtn").removeStyleClass("submitBtn").addStyleClass("submitBtn");
				else
					sap.ui.getCore().byId("InvRecUploadBtn").removeStyleClass("submitBtn").addStyleClass("submitBtn");
			},
			layoutData: new sap.ui.layout.GridData({span: "L4 M5 S6"}),
			});
			
	    	var btnUpload = new sap.m.Button("InvRecUploadBtn",{
		          text : "Upload",
		          type:sap.m.ButtonType.Unstyled,
		          width:"90px",
		          layoutData: new sap.ui.layout.GridData({span: "L2 M2 S4",linebreak: true, margin: false}),
		          press:function(){
		        	  //alert("Upload Clicked!");
		        	  	csvValid = true;
						json=[];
						b64it();
		         }
			}).addStyleClass("submitBtn");
	    	
	    // Responsive Grid Layout
			var oInvReconLayout = new sap.ui.layout.form.ResponsiveGridLayout("idInvReconLayout", {
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
	    // Online Form Starts
			var oInvReconForm = new sap.ui.layout.form.Form("idInvReconForm",{
            layout: oInvReconLayout,
            formContainers: [
                    
                    new sap.ui.layout.form.FormContainer("idInvReconFormC1",{
                            title: "Inventory Reconciliation",
                            formElements: [
										
										new sap.ui.layout.form.FormElement({
											fields: [HrdFlex,txtHardCode],
											layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
										}),
										new sap.ui.layout.form.FormElement({
										    fields: [vHDivider1],
										    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
										}),
										new sap.ui.layout.form.FormElement({
										    fields: [btnDownload,labDownloadTxt],
										    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
										}),
										
										new sap.ui.layout.form.FormElement({
										    fields: [vHDivider2],
										    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
										}),
										
										new sap.ui.layout.form.FormElement({
										    fields: [SaveFlex,oInvRecon],
										    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
										}),
										
										new sap.ui.layout.form.FormElement({
										    fields: [vHDivider3],
										    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
										}),
										
										new sap.ui.layout.form.FormElement({
										    fields: [uploadFlex,FileUploader],
										    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
										}),
										
										
										new sap.ui.layout.form.FormElement({
										    fields: [vHDivider4],
										    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
										}),
										new sap.ui.layout.form.FormElement({
										    fields: [btnUpload],
										    layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
										})
                                    ]
                    })
                    
            ]
		});
		
		readInstructions();
    	return oInvReconForm;
	
	},
	validateHardCode:function(){
		var isValid = true;
		if(sap.ui.getCore().byId("invRecHardCode").getValue() == ""){
			sap.ui.getCore().byId("invRecHardCode").setValueState(sap.ui.core.ValueState.Error);
			sap.ui.getCore().byId("invRecHardCode").setPlaceholder("Required");
			isValid = false;
		}
		return isValid;
	}
});
function downloadTable(json){
	 var count = 0;
     var htmlTable="";
     // Table content
     
     // HTML Table - Start
		htmlTable +="<table border=1 cellspacing=0>";
		count = 0;
		$.each(json, function(i, item) {
			for (var key in item){
				if(count == 0){
					//alert("key : "+ key);
					htmlTable += "<th>"+key+"</th>";
				}
			}
			count ++;
		});
		htmlTable += "</tr>";
//			alert("fields : "+fields[0]+" json : "+ json.length);
		$.each(json, function(i, item) {
			htmlTable += "<tr>";
		    for (var key in item){
		    	//alert("key : "+ key);
		    	htmlTable += "<td align=center>"+item[key]+"</td>";
		    	//console.log(key + ' = ' + item[key]);
		    }
		    htmlTable += "</tr>";
		});

		htmlTable += "</table>";
		// HTML Table - End	
	
		
			//alert("Export");
			var uri = 'data:application/vnd.ms-excel;base64,',
			template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">'
	        	+'<!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->'
	        	+'<head></head>'
	        	+'<body>'+htmlTable	+'</body></html>',
	        base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) },
	        format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }

			// Open Excel
/*			if (!table.nodeType) 
				table = document.getElementById(table)*/
	        var ctx = {worksheet: "template" || 'Worksheet', table: htmlTable}
	        if ((navigator.appName == 'Microsoft Internet Explorer') || (!!navigator.userAgent.match(/Trident.*rv[ :]*11\./)))
      	    {
		            // var byteCharacters = atob(uri + base64(format(template, ctx)));
		            var blobObject = b64toBlob(base64(format(template, ctx)), 'application/vnd.ms-excel');
		            //window.navigator.msSaveBlob(blobObject, 'msSaveBlob_testFile.xls'); //only with save option
		            window.navigator.msSaveOrOpenBlob(blobObject, 'downloadfile.xls'); //save and open both option
	            }
      	    else
      	    {
      	    	 //window.location.href = uri + base64(format(template, ctx));
      	    	window.open(uri + base64(format(template, ctx)));
      	    }  
	        
	       // window.location.href = uri + base64(format(template, ctx))

}


function b64it() {
	//alert("in b64it");
	var oFReader = new FileReader();
	var fileUploader = sap.ui.getCore().byId("fileUp");
	var selFile = fileUploader.oFileUpload.files[0];
	
		if(selFile){
			json = [];
			
			var ext = fileUploader.oFilePath.getValue().split('.').pop().toLowerCase();

			if($.inArray(ext, ['xls','csv']) == -1) {
				fileUploader.setValue('');
				fileUploader.oFilePath.setValue('');
				sap.ui.commons.MessageBox.alert(
						"The uploaded file has failed data validation. Please recheck the data in \n" +
						"the file before uploading. \n " +
						"The required format is \n" +
						"\n"+
						"- MS Excel .XLS \n" +
						"- Comma Separated File .CSV \n" +
						"\n" +
						"The required data format is: \n" +
						"\n " +
						"- Col A = Status - allowed values A, U or S \n" +
						"- Col B = Unit_Number - max 11 char, first 4 char are alphanumeric,\n " +
						"  next 7 char are numeric\n" +
						"- Col C = In_Date - Should be in YYYYMMDD format");
			}else if($.inArray(ext, ['xls']) != -1){
				//alert("File is there xls , XLS");
				isFileThere = true;
				
				
				oFReader.readAsDataURL(selFile);
			    oFReader.onload = function (oFREvent) {
			    	//alert(oFReader.result);
			    	ExcelB64Data = oFReader.result.substring(37);
			    	//sap.ui.getCore().byId("docText").setValue(ExcelB64Data);
			    	var cfb = XLS.CFB.read(ExcelB64Data, {type: 'base64'});
			    	var wb = XLS.parse_xlscfb(cfb);
			    	process_wb(wb);
			    }
			
		    }else if($.inArray(ext, ['csv']) != -1){
				//alert("File is there csv || CSV");
				isFileThere = true;
				//sap.ui.getCore().byId("InvRecUploadBtn").removeStyleClass("submitBtn").addStyleClass("submitBtn");
				
				oFReader.readAsText(selFile);
			    oFReader.onload = function (oFREvent) {
			    	var csv = oFREvent.target.result;
			    	
			    	var allTextLines = csv.split(/\r\n|\n/);
			    	if(allTextLines.length>1){
			    		for (var i=1; i<allTextLines.length; i++) {
				            var data = allTextLines[i].split(',');
				            if(data.length == 3){
				            	 json.push({
		  	                		  'Status':data[0],
		  	                		  'Unit_Number':data[1],
		  	                		  'In_Date':data[2],
		  	                  });
				            }
				            else{
				            	csvValid = false;
				            }
				        }
			    	}else{
			    		csvValid = false;
			    	}
			        
			    }
		    }
		}else{
			//alert("File not there");
			isFileThere = false;
			
		}

}
function process_wb(wb) {
	if(typeof Worker !== 'undefined') XLS.SSF.load_table(wb.SSF);
	//output = JSON.stringify(to_json(wb), 2, 2);
	//var tmpjsn = window.JSON.stringify(output)
	var jss = to_json(wb);

	var count = 0;
	
	$.each(jss, function(k,v){
		if(count == 0)
			json =v;
		count ++;
	});	
	if(oInvR.validateHardCode()){
		  uploadData();  
	  }
}

function to_json(workbook) {
	var result = {};
	workbook.SheetNames.forEach(function(sheetName) {
		var roa = XLS.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
		if(roa.length > 0){
			result[sheetName] = roa;
		}

	});
	return result;
}

function readInstructions(){
	
	busyDialog.open();
	var filter = "/Reconciliation_Read";
	oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
	OData.request({ 
        requestUri: serviceUrl+filter,
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
          var enteredText = data.results[0].Comment1 + data.results[0].Comment2 +data.results[0].Comment3;
          enteredText = enteredText.replace(/~~/g,"\n");
          enteredText = enteredText.replace(/\^/g,"#");
          enteredText = enteredText.replace(/==/g,"%");
          enteredText = enteredText.replace(/\|/g,"'");
          enteredText = enteredText.replace(/#/g,"'");
          enteredText = enteredText.replace(/@/g,"&");
      	enteredText = enteredText.replace(/\$/g,"+");
      	
          sap.ui.getCore().byId("docText").setValue(enteredText);
            
      },
      function(err){  
    	  errorfromServer(err);
      });
}
function saveInstructions(){
	busyDialog.open();
	var depotCode = sap.ui.getCore().byId("invRecHardCode").getValue();
	var comments1 = "", comments2 = "", comments3 = "";
	
	var enteredText = sap.ui.getCore().byId("docText").getValue();
	enteredText = enteredText.replace(/&/g,"@");
	enteredText = enteredText.replace(/\+/g,"$");
	enteredText = enteredText.replace(/\'/g,"|");
	enteredText = enteredText.replace(/#/g,"^");
	enteredText = enteredText.replace(/\n/g,"~~");
	enteredText = enteredText.replace(/%/g,"==");
	
	var textLength = enteredText.length;
	
	//if(textLength >500 && textLength <= 950)
		comments3 = enteredText.substring(500, textLength);
	if(textLength >250)
		comments2 = enteredText.substring(250, 500);
	if(textLength >0)
		comments1 = enteredText.substring(0, 250);
	
	

	var filter = "/Reconciliation_Read?$filter=Code eq '"+depotCode+"' and Comment1 eq '"+comments1+"' and Comment2 eq '"+comments2+"' and Comment3 eq '"+comments3+"'";
	oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
	OData.request({ 
        requestUri: serviceUrl+filter,
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
            //alert("Successfully inserted");
    	  busyDialog.close();
      },
      function(err){   
    	  errorfromServer(err);
      });
}
function uploadData(){
	str1 = "";
	str2 = "";
	str3 = "";
	str4 = "";
	str5 = "";
	str6 = "";
	str7 = "";
	str8 = "";
	str9 = "";
	str10 = "";
	
	if(isFileThere){
		if(!validateExcelJson(json)){
			sap.ui.commons.MessageBox.alert(
					"The uploaded file has failed data validation. Please recheck the data in \n" +
					"the file before uploading. \n " +
					"The required format is \n" +
					"\n"+
					"- MS Excel .XLS \n" +
					"- Comma Separated File .CSV \n" +
					"\n" +
					"The required data format is: \n" +
					"\n " +
					"- Col A = Status - allowed values A, U or S \n" +
					"- Col B = Unit_Number - max 11 char, first 4 char are alphanumeric,\n " +
					"  next 7 char are numeric\n" +
					"- Col C = In_Date - Should be in YYYYMMDD format");
		}else{
			// send String to back end
			busyDialog.open();
			for(var i=0;i<json.length;i++){
				if(i<10)
					str1 = str1 + json[i].Status + "|" + json[i].Unit_Number + "|" + json[i].In_Date + "@" ;
				else if(i<20)
					str2 = str2 + json[i].Status + "|" + json[i].Unit_Number + "|" + json[i].In_Date + "@" ;
				else if(i<30)
					str3 = str3 + json[i].Status + "|" + json[i].Unit_Number + "|" + json[i].In_Date + "@" ;
				else if(i<40)
					str4 = str4 + json[i].Status + "|" + json[i].Unit_Number + "|" + json[i].In_Date + "@" ;
				else if(i<50)
					str5 = str5 + json[i].Status + "|" + json[i].Unit_Number + "|" + json[i].In_Date + "@" ;
				else if(i<60)
					str6 = str6 + json[i].Status + "|" + json[i].Unit_Number + "|" + json[i].In_Date + "@" ;
				else if(i<70)
					str7 = str7 + json[i].Status + "|" + json[i].Unit_Number + "|" + json[i].In_Date + "@" ;
				else if(i<8)
					str8 = str8 + json[i].Status + "|" + json[i].Unit_Number + "|" + json[i].In_Date + "@" ;
				else if(i<90)
					str9 = str9 + json[i].Status + "|" + json[i].Unit_Number + "|" + json[i].In_Date + "@" ;
				else if(i<100)
					str10 = str10 + json[i].Status + "|" + json[i].Unit_Type + "|" + json[i].In_Date + "@" ;
			}
			//alert("Str 1"+ str1);
			
			//alert("Str 2"+ str2);
			//alert("Str 3"+ str3);
			//alert("Str 4"+ str4);
			//alert("Str 5"+ str5);
			//alert("Str 6"+ str6);
			//alert("Str 7"+ str7);
			//alert("Str 8"+ str8);
			//alert("Str 9"+ str9);
			//alert("Str 10"+ str10);
			
			//var depotCode = "1182";
			var depotCode = sap.ui.getCore().byId("invRecHardCode").getValue();
			var filter = "/Inventory_Reconciliation('')";
			var filter2 = "/Recon_Email?$filter=IDepotCode eq '"+depotCode+"'";
			oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
			OData.request({ 
	            requestUri: serviceUrl+filter,
	            //user:"pcsdevl", password:"igate@123",
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
	          function (data, response){      //SUCCESS FECHING CSRF TOKEN
	                //PUT REQUEST FOR UPDATE DATA
	                var csrftoken = response.headers['x-csrf-token'];
	                OData.request({   
	                requestUri:  serviceUrl+filter,   
	                method: "PUT",   
	                headers: {   
		                "X-Requested-With": "XMLHttpRequest",                         
		                "Content-Type": "application/atom+xml;type=entry; charset=utf-8", 
		                "DataServiceVersion": "2.0",   
		                //"Accept": "application/atom+xml,application/atomsvc+xml,application/xml",  
		                "X-CSRF-Token": csrftoken   
	                },   
	                data:{
	                	IDepotCode : depotCode,
	              	  	IContent1 : str1,
	              	  	IContent2 : str2,
	              		IContent3 : str3,
	              		IContent4 : str4,
	              		IContent5 : str5,
	              		IContent6 : str6,
	              		IContent7 : str7,
	              		IContent8 : str8,
	              		IContent9 : str9,
	              		IContent10 : str10,
	                	}
	                },    
	                function (resultdata, response){
	                	//alert("Data sent from UI");
	                	OData.request({ 
	              			 requestUri: serviceUrl + filter2,
	              		      //user:"pcsdevl", password:"igate@123",
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
	              		    	
	              		    	if(data.results.length > 0)
	              		    		if(data.results[0].Message.length > 0){
	              		    			busyDialog.close();
	              		    			sap.ui.commons.MessageBox.alert("The Uploaded Inventory Reconciliation file has been successfully \n" +
	    	                				"submitted. The result of the File will be emailed to "+data.results[0].Message);
	              		    		}
	              		    },
	              		    function(err){
	              		    	errorfromServer(err);
	              		    	/*busyDialog.close();
	              		    	if(err.response.statusCode == "500"){
	              		    		sap.ui.commons.MessageBox.alert("Server Response Timeout");
	              		    		
	              		    		sap.ui.commons.MessageBox.show("Server Response Timeout",
	              		    			  sap.ui.commons.MessageBox.Icon.INFORMATION,
	              		    			  "Information",
	              		    			  [sap.ui.commons.MessageBox.Action.OK], 
	              		    			  sap.ui.commons.MessageBox.Action.OK
	              		    		);
	              		    	}
	              		    	else{
	              		    		//alert("Error while reading Release : "+ window.JSON.stringify(err.response));
	              		    		sap.ui.commons.MessageBox.alert("Error while reading Recon Email ID : "+window.JSON.stringify(err.response));
	              		    	}*/
	              		    	
	              		    });
	                		
	                },   
	                function (err){
	                	errorfromServer(err);
	                	/*busyDialog.close();
	                	sap.ui.commons.MessageBox.alert("Error while Uploading Inventory Reconciliation : "+window.JSON.stringify(err.response));*/
	                }); //END PUT ODATA REQUEST
	          },
	          function(err){   //ERROR FECHING CSRF TOKEN
	        	  errorfromServer(err);
	        	  /*busyDialog.close();
	        	  if(err.response.statusCode == "500"){
    		    		sap.ui.commons.MessageBox.alert("Server Response Timeout");
    		    		
    		    		sap.ui.commons.MessageBox.show("Server Response Timeout",
    		    			  sap.ui.commons.MessageBox.Icon.INFORMATION,
    		    			  "Information",
    		    			  [sap.ui.commons.MessageBox.Action.OK], 
    		    			  sap.ui.commons.MessageBox.Action.OK
    		    		);
    		    	}
    		    	else{
    		    		
    		    		//alert("Error while reading Release : "+ window.JSON.stringify(err.response));
    		    		//sap.ui.commons.MessageBox.alert("Error while reading X-CSRF-Token : "+window.JSON.stringify(err.response));
    		    	}*/
	        	  //alert("Error while Reading X-CSRF-Token.");
	                
	          });

		}
	}
	
}
function validateExcelJson(json){
	var isValid = true;
	
	for(var i = 0; i<json.length; i++){
		//alert(" Status :"+json[i].Status+ " Unit No :"+ json[i].UnitNumber + " Date :"+json[i].InDate);
		if(!json[i].Status){
			isValid = false;
		}else{
			if($.inArray(json[i].Status, ['A','S','U']) == -1){
				isValid = false;
			}
		}
		
		if(!json[i].Unit_Number){
			isValid = false;
		}else{
			if(!checkUnitNo(json[i].Unit_Number) ){
				isValid = false;
			}
		}
		
		if(!json[i].In_Date){
			isValid = false;
		}else{
			if(!isValidDate(json[i].In_Date)){
				isValid = false;
			}
		}
		

		if(!isValid){
			break;
		}
	}
	//alert("All Data Valid "+ isValid);
	return isValid;
}

function checkUnitNo(unitNo){
	var isValid = true;
	unitNo =  $.trim(unitNo);
    
    if(unitNo.length != 11){
    	isValid = false;
    }
    if(!(/^[a-zA-Z\s]+$/.test(unitNo.substr(0,4)))){
    	isValid = false;
    }
    
    if(!(/^[0-9]+$/.test(unitNo.substr(4,7)))) {
    	isValid = false;
    }

	return isValid;
}

function isValidDate(date) {
    var isValid = true;

    if(date.length == 8){
    	date = date.replace('/-/g', '');
        
        var month = parseInt(date.substring(4, 6));
        var day   = parseInt(date.substring(6));
        var year  = parseInt(date.substring(0, 4));

        if((month < 1) || (month > 12)) 
        	isValid = false;
        
        else if((day < 1) || (day > 31)) 
        	isValid = false;
        
        else if(((month == 4) || (month == 6) || (month == 9) || (month == 11)) && (day > 30)) 
        	isValid = false;
        
        else if((month == 2) && (((year % 400) == 0) || ((year % 4) == 0)) && ((year % 100) != 0) && (day > 29)) 
        	isValid = false;
        
        else if((month == 2) && ((year % 100) == 0) && (day > 29)) 
        	isValid = false;
    }else{
    	isValid = false;
    }
return isValid;
}
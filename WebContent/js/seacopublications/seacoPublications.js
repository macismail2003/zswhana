var userName = '', departmentName = '';
var ObjSelfSeacoPub = '';
var globalDataSeacoPub = [];
var fileTypeJson =[
{'fileextension': 'bas', 'mimetype': 'text/plain'},{'fileextension': 'bmp', 'mimetype': 'image/bmp'},{'fileextension': 'raw', 'mimetype': 'text/plain'},
{'fileextension': 'c', 'mimetype': 'text/plain'},{'fileextension': 'css', 'mimetype': 'text/css'},
{'fileextension': 'dir', 'mimetype': 'application/x-director'},{'fileextension': 'doc', 'mimetype': 'application/msword'},
{'fileextension': 'docx', 'mimetype': 'application/msword'},
{'fileextension': 'dot', 'mimetype': 'application/msword'},{'fileextension': 'gif', 'mimetype': 'image/gif'},
{'fileextension': 'gz', 'mimetype': 'application/x-gzip'},{'fileextension': 'h', 'mimetype': 'text/plain'},
{'fileextension': 'htm', 'mimetype': 'text/html'},{'fileextension': 'html', 'mimetype': 'text/html'},
{'fileextension': 'htt', 'mimetype': 'text/webviewhtml'},{'fileextension': 'ico', 'mimetype': 'image/x-icon'},
{'fileextension': 'ief', 'mimetype': 'image/ief'},{'fileextension': 'jfif', 'mimetype': 'image/pipeg'},
{'fileextension': 'jpe', 'mimetype': 'image/jpeg'},{'fileextension': 'jpeg', 'mimetype': 'image/jpeg'},
{'fileextension': 'jpg', 'mimetype': 'image/jpeg'},{'fileextension': 'ms', 'mimetype': 'application/x-troff-ms'},
{'fileextension': 'msg', 'mimetype': 'application/vnd.ms-outlook'},{'fileextension': 'pdf', 'mimetype': 'application/pdf'},
{'fileextension': 'pot', 'mimetype': 'application/vnd.ms-powerpoint'},{'fileextension': 'ppm', 'mimetype': 'image/x-portable-pixmap'},
{'fileextension': 'pps', 'mimetype': 'application/vnd.ms-powerpoint'},{'fileextension': 'ppt', 'mimetype': 'application/vnd.ms-powerpoint'},
{'fileextension': 'pptx', 'mimetype': 'application/vnd.ms-powerpoint'},
{'fileextension': 'rtx', 'mimetype': 'text/richtext'},{'fileextension': 'swf', 'mimetype': 'application/x-shockwave-flash'},
{'fileextension': 'tex', 'mimetype': 'application/x-tex'},{'fileextension': 'texi', 'mimetype': 'application/x-texinfo'},
{'fileextension': 'texinfo', 'mimetype': 'application/x-texinfo'},{'fileextension': 'tif', 'mimetype': 'image/tiff'},
{'fileextension': 'tiff', 'mimetype': 'image/tiff'},{'fileextension': 'txt', 'mimetype': 'text/plain'},
{'fileextension': 'wcm', 'mimetype': 'application/vnd.ms-works'},{'fileextension': 'wdb', 'mimetype': 'application/vnd.ms-works'},
{'fileextension': 'wks', 'mimetype': 'application/vnd.ms-works'},{'fileextension': 'wps', 'mimetype': 'application/vnd.ms-works'},
{'fileextension': 'xla', 'mimetype': 'application/vnd.ms-excel'},{'fileextension': 'xlc', 'mimetype': 'application/vnd.ms-excel'},
{'fileextension': 'xlm', 'mimetype': 'application/vnd.ms-excel'},{'fileextension': 'xls', 'mimetype': 'application/vnd.ms-excel'},
{'fileextension': 'xlsx', 'mimetype': 'application/vnd.ms-excel'},
{'fileextension': 'xlt', 'mimetype': 'application/vnd.ms-excel'},{'fileextension': 'xlw', 'mimetype': 'application/vnd.ms-excel'},
{'fileextension': 'zip', 'mimetype': 'application/zip'},{'fileextension': 'csv', 'mimetype': 'application/vnd.ms-excel'}
];
//{'fileextension': '', 'mimetype': ''},{'fileextension': '', 'mimetype': ''},
			
var buildTreeHierarchy = function (data) {
    var source = [];
    var items = [];
    // build hierarchical source.
    for (i = 0; i < data.length; i++) {
        var item = data[i];
        var Folder = item["Folder"];
        var Parent = item["Parent"];
        var Srno = item["Srno"];
		var color = item["color"];
		var Flag = item["Flag"];
		var Sizes = item["Sizes"];
		var Path = item["Path"];

        if (items[Parent]) {
            var item = { Parent: Parent, Folder: Folder,Srno: Srno ,color: color,Flag: Flag ,Sizes: Sizes,Path: Path};
            if (!items[Parent].items) {
                items[Parent].items = [];
            }
            items[Parent].items[items[Parent].items.length] = item;
            items[Srno] = item;
        }
        else {
            items[Srno] = { Parent: Parent, Folder: Folder,Srno: Srno,color: color,Flag: Flag ,Sizes: Sizes,Path: Path};
            source[Srno] = items[Srno];
        }
    }
    return source;
}

sap.ui.model.json.JSONModel.extend("seacoPublications", {
	//CREATE DASHBORD HOME
	createSeacoPublication: function(changeCustFlag){
		//var objLogin = new loggedInU();
		//var userdata = objLogin.filterLoggedInUserData('SCREEN');
		//userName = objLogin.getLoggedInUserType();
		userName = objLoginUser.getLoggedInUserName();
		
		ObjSelfSeacoPub = this;
		globalDataSeacoPub.length = 0
		var rfl = sap.ui.commons.layout.ResponsiveFlowLayout;
		var rflLD = sap.ui.commons.layout.ResponsiveFlowLayoutData;
		var oRFL = new rfl();
		
		var oidVbxSeacoPub = new sap.m.VBox("idVbxSeacoPub");
		/*var olblHdrSeacoPub = new sap.ui.commons.Label({text: "Seaco Publication ", wrapping: true}).addStyleClass("fontTitle");
		
		var oflbxHdrSeacoPub = new sap.m.FlexBox({
			  items:[olblHdrSeacoPub],
			  width:"100%",
			  direction: "Column"
			 });
		
		oflbxHdrSeacoPub.setLayoutData(new rflLD({
			minWidth : 800,weight : 1}));
		oRFL.addContent(oflbxHdrSeacoPub);*/	//UNCOMMENT FOR DISPLAY HEADER IN PAGE

		var oCntrllblCURSeacoPub = new sap.ui.commons.Label("idlblCURSeacoPub",{
			text:"Select Role: "});
		
		
		var oCntrlChangeUserRoleSeacoPub = new sap.ui.commons.DropdownBox("idChangeUserRoleSeacoPub", {
			//width:"350px",
			placeholder:"Select Customer"
		}).addStyleClass("FormInputStyle marginTop10");

		var oItem = new sap.ui.core.ListItem();
		oItem.setText("DEPOT");
		oItem.setKey("DEPOT");
		oCntrlChangeUserRoleSeacoPub.addItem(oItem);
		
		oItem = new sap.ui.core.ListItem();
		oItem.setText("CUSTOMER")
		oItem.setKey("CUSTOMER");;
		oCntrlChangeUserRoleSeacoPub.addItem(oItem);
		
		oItem = new sap.ui.core.ListItem();
		oItem.setText("FACTORY");
		oItem.setKey("FACTORY");
		oCntrlChangeUserRoleSeacoPub.addItem(oItem);
		
		oItem = new sap.ui.core.ListItem();
		oItem.setText("SEACO");
		oItem.setKey("SEACO");
		oCntrlChangeUserRoleSeacoPub.addItem(oItem);
		
		oItem = new sap.ui.core.ListItem();
		oItem.setText("SURVEYOR");
		oItem.setKey("SURVEYOR");
		oCntrlChangeUserRoleSeacoPub.addItem(oItem);
		
		oCntrlChangeUserRoleSeacoPub.setSelectedKey('SEACO');
		
		var oCntrllblTmpFldSecoPub = new sap.ui.commons.Label( {text: "Temporary field added till security is implemented",
			wrapping: true}).addStyleClass("font10");
		

		var oCntrlBtnChangUserRoleSeacoPub = new sap.m.Button("idBtnChangUserRoleSeacoPub", 
				{
					text:"Submit",
					width:"80px",
					styled:false, 
					press: function(oEvent){
							userName = sap.ui.getCore().byId("idChangeUserRoleSeacoPub").getValue();
							ObjSelfSeacoPub.getOnlineFolderStucture();
							
					}
				}).addStyleClass("submitBtn");
		
		var oflxTmpFldSeacoPub = new sap.m.FlexBox({
			  items:[oCntrllblCURSeacoPub,oCntrllblTmpFldSecoPub],
			  width:"15%",
			  direction: "Column"
			 }).addStyleClass('marginTop10');
		
		
		var oFlxBxOnHireCDB = new sap.m.FlexBox({
			  items:[oflxTmpFldSeacoPub,new sap.ui.commons.Label({width:"15px"}),oCntrlChangeUserRoleSeacoPub,new sap.ui.commons.Label({width:"15px"}), oCntrlBtnChangUserRoleSeacoPub],
			  width:"90%",
			  direction: "Row"
			 }).addStyleClass('marginTop10');
		
		//oRFL.addContent(oFlxBxOnHireCDB);
		
		var oTreeTbl = ObjSelfSeacoPub.createTableTreeSeacoPub().addStyleClass("marginTop10");
		ObjSelfSeacoPub.getOnlineFolderStucture(); //get online data for folder sturcture
		
		oTreeTbl.setLayoutData(new rflLD({
			minWidth : 1000,
			weight : 2
		}));
		oRFL.addContent(oTreeTbl);
		
		oidVbxSeacoPub.addItem(oRFL);
		return oidVbxSeacoPub;
   },
   
	createTableTreeSeacoPub: function(){
		//Create an instance of the table control
		var ocntrlTxVwSpub = new sap.ui.commons.Link({press:function(oEvent){ 
			var hlpId = this.getHelpId();
			//var cellId = this.getId();
			
			var curnNodeDtl = jQuery.grep(globalDataSeacoPub, function(element, index){
                return element.Srno == hlpId;
            });
			if(curnNodeDtl[0].Sizes !=''){
				ObjSelfSeacoPub.getOnlineFileData(curnNodeDtl[0].Path); //get online data for folder sturcture
			}}}).bindProperty("helpId","Srno",function(bindVal){
			 
			//alert(bindVal);
			// $("#"+cellId).parent().parent().css("color",cellValue); 
			var ocntrlTblSecoPub = sap.ui.getCore().byId("idTreeTblSecoPub");
			//if(bindVal != ''){
				//ocntrlTblSecoPub.setVisibleRowCount(ocntrlTblSecoPub.getVisibleRowCount()+1)
			//}sapUiTableTreeIconLeafNofile
			var curnNodeDtl = jQuery.grep(globalDataSeacoPub, function(element, index){
				return element.Srno == bindVal;
			});		 

			if(curnNodeDtl.length > 0){
				if(curnNodeDtl[0].Sizes !=''){
					this.aCustomStyleClasses[0] ="";
				}else{
					this.aCustomStyleClasses[0] ="removeLink";
					var checkCrnNodeChild = jQuery.grep(globalDataSeacoPub, function(element, index){
						return element.Parent == bindVal;
					});	
					if(checkCrnNodeChild.length == 0){
						//if($("#"+this.getId())[0] != undefined)
						//	$("#"+this.getId())[0].parentElement.firstChild.className = 'sapUiTableTreeIconLeafNofile';
						//var vartmp = this;
						//$("#"+this.getId()).parent()[0].firstChild.className = "sapUiTableTreeIconLeafNofile" ;
						/*if($("#"+this.getId()).parent().firstChild != undefined){
							$("#"+this.getId()).siblings('span').attr('class', 'sapUiTableTreeIconLeafNofile');
							bindVal = 'hello';
						}*/
					}
				}
			}
			
			return bindVal;  
		}).bindProperty("text", "Folder").addStyleClass('removeLink'); 
		
	   var oidTreeTblSecoPub = new sap.ui.table.TreeTable("idTreeTblSecoPub", {
	   	columns: [
	   		new sap.ui.table.Column({label: "text", template: ocntrlTxVwSpub}),
	   		//new sap.ui.table.Column({label: "text", template: "Srno"}),
	   		//new sap.ui.table.Column({label: "text", template: "Parent"})
	   	],
	   	visibleRowCount: 15,
		firstVisibleRow: 3,
	   	selectionMode: sap.ui.table.SelectionMode.None,
	   	navigationMode:sap.ui.table.NavigationMode.Paginator,
	   	columnHeaderVisible: false,
	   	allowColumnReordering: false,
	   	columnResize: false,
	   	expandFirstLevel: false,
	   	toggleOpenState: function(oEvent) {
	   		var iRowIndex = oEvent.getParameter("rowIndex");
	   		var oRowContext = oEvent.getParameter("rowContext");
	   		var bExpanded = oEvent.getParameter("expanded");
	   		//alert("rowIndex: " + iRowIndex + " - rowContext: " + oRowContext.getPath() + " - expanded? " + bExpanded);
	   	}
	   });
	   return oidTreeTblSecoPub;
	},

	//GET ONLINE FOLDER STURCTURE   
	getOnlineFolderStucture: function(){
	   try{
		   //sap.ui.getCore().byId("idTreeTblSecoPub").destroyRows()
		   busyDialog.open();
		   var urlToCall = serviceUrl + "/Publication?$filter=Bname eq '" + userName + "' and Department eq '" + departmentName + "'";
		   var objUtil = new utility();
		   objUtil.doOnlineRequest(urlToCall,ObjSelfSeacoPub.getOnlineFolderStuctureSuccess, ObjSelfSeacoPub.getOnlineFolderStuctureDataError);
	   }catch(e){
		   busyDialog.close();
			sap.ui.commons.MessageBox.alert("error on getting data : " + e);
	   }
   },
       
    //ON SUCCESS FOR FOLDER STURCTURE
	getOnlineFolderStuctureSuccess: function(resultdata, response){
		busyDialog.close();
		var objutil = new utility();
		var oidTreeTblSecoPub = sap.ui.getCore().byId("idTreeTblSecoPub");
		var omdlTreeTblSeacoPub = new sap.ui.model.json.JSONModel();
		globalDataSeacoPub.length = 0;
		
	   try{
			if(resultdata != undefined){
				if(resultdata.results.length > 0){

					if(resultdata.results[0].Flag == 'E'){
						sap.ui.commons.MessageBox.alert(resultdata.results[0].Path);
						return false;
					}
					
					oModelCCustDbrd = new sap.ui.model.json.JSONModel(resultdata.results);
					for(var j =0; j<resultdata.results.length;j++){
						var parentData = objutil.removeLeadZero(resultdata.results[j].Parent);
						if(parentData == ""){
							parentData ="-1";
						}
						globalDataSeacoPub.push({
							"Flag": resultdata.results[j].Flag ,
							"Sizes": objutil.removeLeadZero(resultdata.results[j].Sizes) ,
							"Parent" : parentData,
							"Folder" : resultdata.results[j].Folder,
							"Path": resultdata.results[j].Path ,
							"Department": resultdata.results[j].Department ,
							"Bname" : resultdata.results[j].Bname,
							"Srno" : objutil.removeLeadZero(resultdata.results[j].Srno),
							"color" : "#EFFEEF"
						});
					}
				}
			}
			var JsnTreeData = buildTreeHierarchy(globalDataSeacoPub);
			
			omdlTreeTblSeacoPub.setData(JsnTreeData);
			oidTreeTblSecoPub.setModel(omdlTreeTblSeacoPub);
			oidTreeTblSecoPub.bindRows("/");
	   }catch(e){
		   busyDialog.close();
			sap.ui.commons.MessageBox.alert("Error on getting data: " + e);
	   }
   },
    
	//ON ERROR FOR FOLDER STURCTURE
    getOnlineFolderStuctureDataError: function(e){
	   busyDialog.close();
	   errorfromServer(e);
   },
 
 //GET ONLINE FILE DATA  
	getOnlineFileData: function(filepath){
	   try{
		   busyDialog.open();
		   var urlToCall = serviceUrl + "/Publication_File('"+filepath+"')";
		   var objUtil = new utility();
		   objUtil.doOnlineRequest(urlToCall,ObjSelfSeacoPub.getOnlineFileDataSuccess, ObjSelfSeacoPub.getOnlineFileDataDataError);
	   }catch(e){
		   busyDialog.close();
			sap.ui.commons.MessageBox.alert("error on getting data : " + e);
	   }
   },
       
    //ON SUCCESS FILE DATA
	getOnlineFileDataSuccess: function(resultdata, response){
		busyDialog.close();
	   try{
			if(resultdata != undefined){
					ObjSelfSeacoPub.openFilesClientSide(resultdata.File1,resultdata.Path);
			}
	   }catch(e){
		   busyDialog.close();
			sap.ui.commons.MessageBox.alert("Error on getting data: " + e);
	   }
   },
    
	//ON ERROR FILE DATA
    getOnlineFileDataDataError: function(e){
	   busyDialog.close();
	   errorfromServer(e);
   },
 
	openFilesClientSide: function(b64Data,Path){
		try{
			var oidPopupOverLaySeacoPub = sap.ui.getCore().byId("idPopupOverLaySeacoPub");
			if (oidPopupOverLaySeacoPub != undefined) {
				oidPopupOverLaySeacoPub.destroy();
			}
						 //alert("base64 dataa fn" + b64Data);
			var ext = Path.split('.').pop().toLowerCase();
			var contentType ='';
			var byteCharacters = atob(b64Data);
			var byteNumbers = new Array(byteCharacters.length);
			for (var i = 0; i < byteCharacters.length; i++) {
			   byteNumbers[i] = byteCharacters.charCodeAt(i);
			}
			var byteArray = new Uint8Array(byteNumbers);
			var crnFileMimeType = jQuery.grep(fileTypeJson, function(element, index){
					return element.fileextension == ext;
				});
			
			//CREATE POPUP
			
			var fileName = Path.split('|').pop().toLowerCase();

			if(crnFileMimeType.length > 0){
				contentType = crnFileMimeType[0].mimetype;
				var blob = new Blob([byteArray], {type: contentType});
				if ((navigator.appName == 'Microsoft Internet Explorer') ||
                 (!!navigator.userAgent.match(/Trident.*rv[ :]*11\./)))
	         	 {
					 window.navigator.msSaveOrOpenBlob(blob, fileName);
	         	 }else{
	         		var blobUrl = URL.createObjectURL(blob);
					window.open(blobUrl);
	         	 }
				//window.open(blobUrl,'scrollbars=yes,width=600px,height=450px,location=no');
			}else{
				sap.ui.commons.MessageBox.alert("Selected file type not supported");
			}
		}catch(e){
			alert(e);
		}
    },
 });
var msgIdFPURES ='';
var TimeoutFlag = false;

jQuery.sap.require("sap.ui.model.json.JSONModel");
sap.ui.model.json.JSONModel.extend("utility", {

    unauthorizedKeyClick: function(){
    },

	createNewMenu : function(oUtility){		// HSN30092017+ created this function
		var oMenuItem = "";
		var oMenu = "";
		var oMenuSubItem = "";

		if(!sap.ui.getCore().byId("menunew")){
			oMenu = new sap.ui.unified.Menu("menunew");
		}else{
			oMenu = sap.ui.getCore().byId("menunew");
		}


		if(!sap.ui.getCore().byId("menuitemnew")){
			oMenuItem = new sap.ui.unified.MenuItem("menuitemnew",{
				templateShareable:true
			});
		}else{
			oMenuItem = sap.ui.getCore().byId("menuitemnew");
		}

		if(!sap.ui.getCore().byId("menusubitemnew")){
			oMenuSubItem = new sap.ui.unified.MenuItem("menusubitemnew",{
				templateShareable:true
			});
		}else{
			oMenuSubItem = sap.ui.getCore().byId("menusubitemnew");
		}
		oMenuSubItem.bindProperty("text", "name");

		oMenuItem.bindProperty("text", "name");
		oMenuItem.bindProperty("icon", "inActive");
		oMenuItem.bindAggregation("submenu", "/submenu", oMenuSubItem);

		oMenu.bindAggregation("items", "/", oMenuItem);

		var menumodel = sap.ui.getCore().byId("menu").getModel();


		var submenu = {};
		var submenuarray = [];
		var menudata = sap.ui.getCore().byId("menu").getModel().getData();
		for(var i=0; i<menudata.length; i++){
			if(menudata[i].length > 0){
				menudata[i].submenu = null;
				submenu = {};
				submenuarray = [];
				for(var j=0; j<menudata[j].length; j++){
					submenuarray.push({
						name : menudata[i][j].name
					});

					submenu.name = menudata[i][j].name;
				}

				menudata[i].submenu = submenu;
			}
		}

		sap.ui.getCore().byId("menunew").setModel(menumodel);
        return oMenu;
	},

    toggleMenu: function (oEvent){
    	//prmryContainer

    	/*var toggleButton = document.getElementById("toggleButton");

		var eDock = sap.ui.core.Popup.Dock;
        var oUtility = this;
        var menus = this.createNewMenu(oUtility);
		menus.open(this._bKeyboard, toggleButton, eDock.BeginTop, eDock.BeginBottom, toggleButton); */

    	var container = sap.ui.getCore().byId("prmryContainer");

    	if(container.getShowSecondaryContent()){
    		container.setShowSecondaryContent(false);
    		var slider = document.getElementById('slider');
    		slider.src = "images/showmenu1.png";
    	}
    	else{
    		container.setShowSecondaryContent(true);
    		var slider = document.getElementById('slider');
    		slider.src = "images/hidemenu1.png";
    	}

    },

    logoutclick: function (){
      new LoginView().LogoutUser();
    },

    exitGetSupport: function(){
        localStorage.clear();
        sessionStorage.clear();
        window.location.assign('index.html');
    },



    checkforlogout: function(){
		return false;
        if((sessionStorage.uName == undefined) || (sessionStorage.login == undefined)){
                //this.logoutclick();
        	 localStorage.clear();
             sessionStorage.clear();
             window.location.assign('index.html');
             return true;
        }
        
    },

	loadApp: function(){
		//LOAD RESOURCES FOR THIS VIEW
        sap.ui.localResources("js");
        sap.ui.localResources("view");
        jQuery.sap.registerModulePath('Application', 'Application');
        jQuery.sap.require("Application");

			objLoginUser = new loggedInU(); //INIT FOR LOGEDIN USER DATA
	        if(this.checkforlogout()){
	           return false;
	        }

	        if(sessionStorage.login != undefined){
	           sessionStorage.removeItem('login');
	        }



	        var oUtility = this;
	        var menu = this.createMenu(oUtility);
	        busyDialog.open();
	     // Launch application

	        var oContainer = new sap.ui.unified.SplitContainer('prmryContainer',{
	                        //setSecondaryContentWidth: '100px',
	                        showSecondaryContent: true,
	                        content: [],
	                        secondaryContent: [menu]
	        });

	        var oApp = new Application({
                root : "prmryContainer"
	        });
	        oContainer.placeAt("wrapper");

	        this.getUserHome();
			busyDialog.close(); // MACHANACHANGES_12062019+
	  },

	createMenu : function (oUtility){
	        var oTree = new sap.ui.commons.Tree("menu");
	        // oTree.setTitle("Seaco Title");
	        // oTree.setWidth("100%");
	        oTree.setHeight("100%");
	        oTree.setShowHeaderIcons(false);
	        oTree.setShowHeader(false);
	        oTree.setShowHorizontalScrollbar(false);
	        var oTreeNode = new sap.ui.commons.TreeNode("node");
	        oTreeNode.setExpanded(false);
	        oTreeNode.bindProperty("text", "name");
	        oTreeNode.bindProperty("icon", "inActive");
	        oTree.bindAggregation("nodes", "/", oTreeNode);

	        oTree.attachSelect(
	        function(oEvent){
	              var curntSelMenu = oEvent.getParameter('node').getId();
	              var crntSelMenuParent =oEvent.getParameter('node').oParent;
	              var nodesinTree = oEvent.oSource.getNodes();
	              /*if(!oEvent.getParameter('node').getIsSelected()){
	            	  oEvent.getParameter('node').setIsSelected(true);
	              }*/
	              if((pageidlanding != '') && (pageidlanding != 'WelcomePg')){
	            	  if((crntSelMenuParent.sId != 'menu') && (!crntSelMenuParent.getExpanded())){
	            		  crntSelMenuParent.setExpanded(true);
	            	  }
	            	  oEvent.getParameter('node').setIsSelected(true);
	            	  pageidlanding = '';

	              } else if((crntSelMenuParent.sId != 'menu') && (crntSelMenuParent.getExpanded())){
	            	  //return;
	              }else{
	            	  for(var indx in nodesinTree){
		            	  if(((nodesinTree[indx].sId == oEvent.getParameter('node').sId) || (nodesinTree[indx].sId == crntSelMenuParent.sId))
		            			  && (oEvent.getParameter('node').hasChildren()) && (!oEvent.getParameter('node').getExpanded())){
		            		  		oEvent.getParameter('node').setExpanded(true);
		            	  }else if(nodesinTree[indx].hasChildren()){
		            		  nodesinTree[indx].setExpanded(false);
		            	  }
		              }
	              }

				menuClickedTxt = oEvent.getParameter('node').getText();
				oUtility.menuClick(menuClickedTxt);
	       });
	        //alert("Returning Menu");
	       return oTree;
	},

	menuClick: function(menuClickedTxt){
          //alert(menuClickedData.length);
          var toOpen = jQuery.grep(menuClickedData, function(element, index){
        	  return element.clicked == menuClickedTxt;
          });

          if(toOpen.length > 0){
        	  if(toOpen[0].page != ""){

        	        if(toOpen.length != 0){
        	            //alert("Page to Open : "+ toOpen[0].page);
        	        	this.resetScreenLayout(toOpen[0].page);
    	                var bus = sap.ui.getCore().getEventBus();
    	                bus.publish("nav", "to", {
    	                            id : toOpen[0].page
    	                });
    	                $('#idHdrContnt').html(toOpen[0].title); //CHANGE HEADER CONTENT
        	        }
        	  }
          }

	},

	resetScreenLayout: function(screenId){

      if(screenId == "CDASHM1"){
        if(sap.ui.getCore().byId("idCDASHM1PageUnitSearchResultNum")){
        var oCDASHM1 = new CDASHM1();
        oCDASHM1.setValueCustDash();
      }
      }
			// PT - START
  		  	// Depot Dashboard Related Tables
			if(screenId == "DepotDashboard"){
	  		  	if(sap.ui.getCore().byId("DepotDashboardFlex")){
		        	if(sap.ui.getCore().byId("DepotInventoryGraph")){
	  	            	sap.ui.getCore().byId("DepotInventoryGraph").setWidth('70%');
	                    sap.ui.getCore().byId("DepotInventoryGraph").setWidth('100%');
	  	            }
		        	if(sap.ui.getCore().byId("RepairInventoryGraph")){
	  	            	sap.ui.getCore().byId("RepairInventoryGraph").setWidth('70%');
	                    sap.ui.getCore().byId("RepairInventoryGraph").setWidth('100%');
	  	            }
		        	if(sap.ui.getCore().byId("MNRGraph")){
	  	            	sap.ui.getCore().byId("MNRGraph").setWidth('70%');
	                    sap.ui.getCore().byId("MNRGraph").setWidth('100%');
	  	            }

		        	if(sap.ui.getCore().byId("EDIGraph")){
		        		sap.ui.getCore().byId("EDIGraph").setWidth('70%');
		        		sap.ui.getCore().byId("EDIGraph").setWidth('100%');
		            }

	  		  	}
				if(sap.ui.getCore().byId("ActiveReleaseTblDASH")){
		              var oExstngTable = sap.ui.getCore().byId("ActiveReleaseTblDASH");
		              oExstngTable._oHSb.setScrollPosition(0);
				}

			  	if(sap.ui.getCore().byId("ActiveReturnsTbl")){
		              var oExstngTable = sap.ui.getCore().byId("ActiveReturnsTbl");
		              oExstngTable._oHSb.setScrollPosition(0);
			  	}
			  	if(sap.ui.getCore().byId("AVLBTbl")){
		              var oExstngTable = sap.ui.getCore().byId("AVLBTbl");
		              oExstngTable._oHSb.setScrollPosition(0);
			  	}
			  	if(sap.ui.getCore().byId("HOLDTbl")){
		              var oExstngTable = sap.ui.getCore().byId("HOLDTbl");
		              oExstngTable._oHSb.setScrollPosition(0);
			  	}
			  	if(sap.ui.getCore().byId("REPATbl")){
		              var oExstngTable = sap.ui.getCore().byId("REPATbl");
		              oExstngTable._oHSb.setScrollPosition(0);
			  	}
			  	if(sap.ui.getCore().byId("SALETbl")){
		              var oExstngTable = sap.ui.getCore().byId("SALETbl");
		              oExstngTable._oHSb.setScrollPosition(0);
			  	}
			  	if(sap.ui.getCore().byId("DepotSTATUSTbl")){
		              var oExstngTable = sap.ui.getCore().byId("DepotSTATUSTbl");
		              oExstngTable._oHSb.setScrollPosition(0);
			  	}
			  	if(sap.ui.getCore().byId("AUTHTbl")){
		              var oExstngTable = sap.ui.getCore().byId("AUTHTbl");
		              oExstngTable._oHSb.setScrollPosition(0);
			  	}
			  	if(sap.ui.getCore().byId("AWAPTbl")){
		              var oExstngTable = sap.ui.getCore().byId("AWAPTbl");
		              oExstngTable._oHSb.setScrollPosition(0);
			  	}
			  	if(sap.ui.getCore().byId("RepairSTATUSTbl")){
		              var oExstngTable = sap.ui.getCore().byId("RepairSTATUSTbl");
		              oExstngTable._oHSb.setScrollPosition(0);
			  	}
			  	if(sap.ui.getCore().byId("WESTTbl")){
		            var oExstngTable = sap.ui.getCore().byId("WESTTbl");
		            oExstngTable._oHSb.setScrollPosition(0);
			  	}
			}

		  	// Releases Related Tables
			if(screenId == 'Release'){
			  	if(sap.ui.getCore().byId("releaseResultTable")){
		              var oExstngTable = sap.ui.getCore().byId("releaseResultTable");
		              oExstngTable._oHSb.setScrollPosition(0);
				}
			}

		  	// Return Related Tables
			if(screenId == 'Return'){
			  	if(sap.ui.getCore().byId("returnResultTable")){
		              var oExstngTable = sap.ui.getCore().byId("returnResultTable");
		              oExstngTable._oHSb.setScrollPosition(0);
				}
			}

		  	//Repair Related Tables
			if(screenId == 'RepairEstimates'){
			  	if(sap.ui.getCore().byId("repairResultTable")){
		              var oExstngTable = sap.ui.getCore().byId("repairResultTable");
		              oExstngTable._oHSb.setScrollPosition(0);
				}
			}

		  	// View Inventory Related Tables
			if(screenId == 'Inventory'){
			  	if(sap.ui.getCore().byId("inventoryResultTable")){
		              var oExstngTable = sap.ui.getCore().byId("inventoryResultTable");
		              oExstngTable._oHSb.setScrollPosition(0);
				}
			}

		  	// View DNJS Related Tables
			if(screenId == 'DN_JS'){
		        if(sap.ui.getCore().byId("dnjsResultTable")){
		              var oExstngTable = sap.ui.getCore().byId("dnjsResultTable");
		              oExstngTable._oHSb.setScrollPosition(0);
		        }
			}

	        // Lessee Approval Related Tables
			if(screenId == 'Lessee_approvel'){
		        if(sap.ui.getCore().byId("LesseeAppTbl")){
		              var oExstngTable = sap.ui.getCore().byId("LesseeAppTbl");
		              oExstngTable._oHSb.setScrollPosition(0);
		        }
			}
  	        // PT - END

  	        if(screenId == "OnlineReturns"){
	  	        if(sap.ui.getCore().byId("idExistingRetTblOR")){
	  	              var oExstngTable = sap.ui.getCore().byId("idExistingRetTblOR");
	  	              oExstngTable._oHSb.setScrollPosition(0);
	  	        }
  	        }

			if(screenId == 'CustomerDashboardVw'){
				//RESET GRAPH
	    		if(sap.ui.getCore().byId("idOnhireClmnChartCDB") != undefined){
	    			sap.ui.getCore().byId("idOnhireClmnChartCDB").setWidth('70%');
	    			sap.ui.getCore().byId("idOnhireClmnChartCDB").setWidth('100%');
	    		}
	    		if(sap.ui.getCore().byId("idOffhireClmnChartCDB") != undefined){
	    			sap.ui.getCore().byId("idOffhireClmnChartCDB").setWidth('70%');
	    			sap.ui.getCore().byId("idOffhireClmnChartCDB").setWidth('100%');
	    		}
	    	}
	},

	getUserHome: function(){
		       var oCurrent = this;
			   

		      // oCurrent.createScreenMenufromJSON(testJSON,oCurrent);
			  setTimeout(function(){	// MACHANACHANGES_12062019+
				var userId = sessionStorage.getItem("uName");//"ztest_bu"; //sap.ui.getCore().byId("idtxtUsername").getValue();
				console.log('Wait is over : 2.5 seconds');	// MACHANACHANGES_12062019+

				console.log("utility.js line 385 :  ", userId);	// MACHANACHANGES_12062019+
		       //var filter = ";mo/Authorization_Check_cgw?$filter=Bname eq '"+userId+"' and Password eq ''";
		       var filter = "/Authorization_Check_cgw?$filter=Bname eq '"+userId+"'";

		       oModel = new sap.ui.model.odata.ODataModel(auth_serviceUrl, true);
	           OData.request({
	              //requestUri: serviceUrl + "/Auth_Check?$filter=Bname eq '" + userId + "' and Password eq '" + pswd + "'",
	              requestUri: auth_serviceUrl+filter,

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
	                    backendMenuJSON = data;
	                    oCurrent.createScreenMenufromJSON(backendMenuJSON,oCurrent);

	            },
	            function(err){
		                busyDialog.close();
		                //alert("Error while Login : "+ window.JSON.stringify(err.response));
		                errorfromServer(err);
	            }
			 );
			 
			  }, 2500);

			   
	},

	createScreenMenufromJSON:function(data, oCurrent){
		 var oLoggedInUser = new loggedInU();
         oLoggedInUser.setLoggedInUserData(data.results);

         oCurrent.setupMenuClickedJSON();

         var pageId = new loggedInU().getLoggedInUserLandingPage();
                         var viewId = "view.";

         if(pageId.length>0){
             //sap.ui.getCore().byId("messageLabel").setText("Unable to display the home page. Please contact Seaco Customer Support or System Administrator to resolve this problem.").addStyleClass("fontTitleRed");
             if(pageId!= "ERROR"){
                  viewId = viewId + pageId;
             }
             else{
                 pageId = "messagePage";
                 viewId = viewId + pageId;
             }
         }else
            sap.ui.getCore().byId("messageLabel").setText("No page found").addStyleClass("fontTitleRed");

         var toOpen = jQuery.grep(menuClickedData, function(element, index){
         	return element.page == pageId;
         });

         pageidlanding = pageId;
         var defaultPageLand = true;
         if(toOpen.length != 0){
                menuClickedTxt = toOpen[0].clicked;
                defaultPageLand = false;
                $('#idHdrContnt').html(toOpen[0].title); //CHANGE HEADER CONTENT
         }

         var userName = oLoggedInUser.getLoggedInUserName();
         var labUserName =  new sap.ui.commons.Label({text:userName,
                                         wrapping: true,
                         }).addStyleClass("userNameText");


         var UserFlex = new sap.m.FlexBox({
        	 items: [  labUserName  ],
        	 direction: "Column"  });
         UserFlex.placeAt('idLoggedInUserArea');

         aMenuLinks = oLoggedInUser.getLoggedInUserData();
         oCurrent.createMenuTree();

         //FIRE EVENT FOR SELECTE PAGE
         if(!defaultPageLand){
             var nodes = sap.ui.getCore().byId("menu").getNodes();
				var map = {};
				for(var i=0;i<nodes.length;i++){
					var subNodes = nodes[i].getNodes();
					if(nodes[i].getText() == menuClickedTxt){
						map.node = nodes[i];
						break;
					}
					for(var indx in subNodes){
						if(subNodes[indx].getText() == menuClickedTxt){
							map.node = subNodes[indx];
							break;
						}
					}
				}
				sap.ui.getCore().byId("menu").fireSelect(map);
         }else{
         	var bus = sap.ui.getCore().getEventBus();
                bus.publish("nav", "to", {
                             id : pageId
                });
         }

        // new LoginView().PopulateDepotAfterLogin();
	},

	setupMenuClickedJSON:function(){

		var menuLinks = jQuery.grep(new loggedInU().getLoggedInUserData(), function(element, index){
        	return element.Sequence != 0.0;
        });

		var clicked = "";
		for(var i=0;i<menuLinks.length;i++){

			if(menuLinks[i].Parent == 'X'){ // If Parent
				clicked = menuLinks[i].MenuName;
				//menuClickedData[i]['clicked'] = menuLinks[i].MenuName;
			}else{  // if Child
				clicked =  menuLinks[i].ChildMenu;
				//menuClickedData[i]['clicked'] = menuLinks[i].ChildMenu;
			}

			menuClickedData.push({
				'clicked':clicked,
				'page':menuLinks[i].Page1,
				'title':menuLinks[i].Title
			});

			clicked = "";
		}
	},

	createMenuTree: function(){
	            var menuData2 = [];
	            var aParentLinks =  jQuery.grep(aMenuLinks, function(element, index){
	            	return element.Parent == "X" && element.Sequence != 0.0;
	            });
	            //alert("parent length " + aParentLinks.length + "menu " + aMenuLinks.length);
	            var aChildNodes = [];
	            var obj = [];
	            for(var i=0 ; i< aParentLinks.length ; i++){

                    aChildNodes = jQuery.grep(aMenuLinks, function(element, index){
                    	return element.MenuName == aParentLinks[i].MenuName && element.Parent != "X" && element.Sequence != 0.0;
                    });

		            if(aChildNodes.length > 0){
                            for(var j=0 ; j<aChildNodes.length ; j++){
                                            obj.push({"name":aChildNodes[j].ChildMenu});

                            }
		            }

		            menuData2[i] = obj;
		            menuData2[i]["name"] = aParentLinks[i].MenuName;
		            menuData2[i]["inActive"] = aParentLinks[i].InactiveIcon;
		            menuData2[i]["activeIcon"] = aParentLinks[i].ActiveIcon;
		            obj=[];

	            }

	            menuData["name"] = "root";
	            menuData[0]= menuData2;
	            //alert("menuData.sysAdmin " + window.JSON.stringify(menuData));
	            var oMenuModel = new sap.ui.model.json.JSONModel();
	            oMenuModel.setData(menuData2);
	            sap.ui.getCore().byId("menu").setModel(oMenuModel);
	},

  makeHTMLTableEDI :function(json, title, btnTxt, depotTxt ){
                     var html = "";
                     var count = 0;

                     var urlNoHash = window.location.href.replace(window.location.hash,'');
                     var urlSplit = urlNoHash.split('/');
                     // var base = "http://";
                     // if(urlSplit.length > 2){
                     //        for(var i=2; i<urlSplit.length - 1;i++){
                     //               base = base + urlSplit[i]+"/";
                     //        }
                     // }

                     //var base = "http://";
                     var base = "";
                     if(urlSplit.length > 2){
                     base = base + urlSplit[0]+"//";
                     for(var i=2; i<urlSplit.length - 1;i++){
                     base = base + urlSplit[i]+"/";
                     }
                     }

                   var keyLength = 0;
                   var htmlTable="";

                   $.each(json, function(i, item) {
                           for (var key in item){
                                 if(count == 0){
                                        keyLength ++;
                                 }
                           }
                           count ++;
                   });

                     // Table content
                     // HTML Table - Start
                              htmlTable +='<table border=1 cellspacing=0 style="color:#656465">';
                              htmlTable += '<tr style="height:75px;">'+
                                           '<td colspan='+ (keyLength - 1) +' valign="middle" style="border:none;padding-left:10px;font:bold 18px Arial;">' +title + '</td>'+
                                           '<td style="border:none; padding:5px 5px 5px 0px" colspan=1 align ="right"><img src="' + base + 'images/login/login_logo.png"></img></td></tr>'
                                           + '<tr><td colspan=5 style="border:none;padding-left:10px;font:bold 15px Arial;">' + depotTxt + '</td></tr>';
                              htmlTable += "<tr>";

                              count = 0;
                              $.each(json, function(i, item) {
                                     for (var key in item){
                                           if(count == 0){
                                                  //alert("key : "+ key);
                                                  htmlTable += '<th style="font:bold 14px Arial;">'+key+'</th>';
                                           }
                                     }
                                     count ++;
                              });
                              htmlTable += "</tr>";
  //                             alert("fields : "+fields[0]+" json : "+ json.length);
                              $.each(json, function(i, item) {
                                     htmlTable += "<tr>";
                                  for (var key in item){
                                     //alert("key : "+ key);
                                     htmlTable += '<td align=center style="font: 14px Arial;">'+item[key]+"</td>";
                                     //console.log(key + ' = ' + item[key]);
                                  }
                                  htmlTable += "</tr>";
                              });

                              htmlTable += "</table>";
                              // HTML Table - End

                     if(btnTxt == "print"){
                                     //alert("Print");
                                     html += "<div align=center>";
                                     html +=htmlTable+"</div>";

                              }else if(btnTxt == "export"){
                                     //alert("Export");
                                     var uri = 'data:application/vnd.ms-excel;base64,',
                                     template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">'
                                     +'<!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->'
                                     +'<head></head>'
                                     +'<body>'+htmlTable  +'</body></html>',
                               base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) },
                               format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }

                                     // Open Excel
                  /*                   if (!table.nodeType)
                                           table = document.getElementById(table)*/
                               var ctx = {worksheet: title || 'Worksheet', table: htmlTable}
                               //window.location.href = uri + base64(format(template, ctx))

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
                                    //window.open(uri + base64(format(template, ctx)));	// MACHANAEXCELISSUE-
									
									// MACHANAEXCELISSUE+
									var filenamexls = "download.xls";
									let file = new Blob([htmlTable], {type:"application/vnd.ms-excel"});

								   let url = URL.createObjectURL(file);

								   let a = $("<a />", {
								   href: url,
								   download: filenamexls
								   })
								   .appendTo("body")
								   .get(0)
								   .click();


                                }
                              }
                              return html;
   },

	makeHTMLTable:function(json, title, btnTxt ){
                     var html = "";
                     var count = 0;

                     var urlNoHash = window.location.href.replace(window.location.hash,'');
                     var urlSplit = urlNoHash.split('/');
                     // var base = "http://";
                     // if(urlSplit.length > 2){
                     //        for(var i=2; i<urlSplit.length - 1;i++){
                     //               base = base + urlSplit[i]+"/";
                     //        }
                     // }

                     //var base = "http://";
                     var base = "";
                     if(urlSplit.length > 2){
                     base = base + urlSplit[0]+"//";
                     for(var i=2; i<urlSplit.length - 1;i++){
                     base = base + urlSplit[i]+"/";
                     }
                     }

	                 var keyLength = 0;
	                 var htmlTable="";

	                 $.each(json, function(i, item) {
                           for (var key in item){
                                 if(count == 0){
                                        keyLength ++;
                                 }
                           }
                           count ++;
	                 });

	                   // Table content
	                   // HTML Table - Start
	                            htmlTable +='<table border=1 cellspacing=0 style="color:#656465">';
	                            htmlTable += '<tr style="height:75px;">'+
	                                         '<td colspan='+ (keyLength - 1) +' valign="middle" style="border:none;padding-left:10px;font:bold 18px Arial;">' +title + '</td>'+
	                                         '<td style="border:none; padding:5px 5px 5px 0px" colspan=1 align ="right"><img src="' + base + 'images/login/login_logo.png"></img></td></tr>';
	                            htmlTable += "<tr>";
	                            count = 0;
	                            $.each(json, function(i, item) {
	                                   for (var key in item){
	                                         if(count == 0){
	                                                //alert("key : "+ key);
	                                                htmlTable += '<th style="font:bold 14px Arial;">'+key+'</th>';
	                                         }
	                                   }
	                                   count ++;
	                            });
	                            htmlTable += "</tr>";
	//                             alert("fields : "+fields[0]+" json : "+ json.length);
	                            $.each(json, function(i, item) {
	                                   htmlTable += "<tr>";
	                                for (var key in item){
	                                   //alert("key : "+ key);
	                                   htmlTable += '<td align=center style="font: 14px Arial;">'+item[key]+"</td>";
	                                   //console.log(key + ' = ' + item[key]);
	                                }
	                                htmlTable += "</tr>";
	                            });

	                            htmlTable += "</table>";
	                            // HTML Table - End

	                   if(btnTxt == "print"){
	                                   //alert("Print");
	                                   html += "<div align=center>";
	                                   html +=htmlTable+"</div>";

	                            }else if(btnTxt == "export"){
	                                   //alert("Export");
	                                   var uri = 'data:application/vnd.ms-excel;base64,',
	                                   template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">'
	                                   +'<!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->'
	                                   +'<head></head>'
	                                   +'<body>'+htmlTable  +'</body></html>',
	                             base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) },
	                             format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }

	                                   // Open Excel
	                /*                   if (!table.nodeType)
	                                         table = document.getElementById(table)*/
	                             var ctx = {worksheet: title || 'Worksheet', table: htmlTable}
	                             //window.location.href = uri + base64(format(template, ctx))

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
		                      	    		// window.open(uri + base64(format(template, ctx))); // MACHANAEXCELISSUE-
									
									// MACHANAEXCELISSUE+
									var filenamexls = "download.xls";
									let file = new Blob([htmlTable], {type:"application/vnd.ms-excel"});

								   let url = URL.createObjectURL(file);

								   let a = $("<a />", {
								   href: url,
								   download: filenamexls
								   })
								   .appendTo("body")
								   .get(0)
								   .click();

		                      	    }
	                            }
	                            return html;
	 },

	uploadFileChange: function(oEvent,idScreenFrom, pFilePath){
	               var oFileUpldr = oEvent.oSource;
	               oFileUpldr.destroyParameters();

	               /*var vparaRename = new sap.ui.commons.FileUploaderParameter({
	                               name : "rename",
	                               value : "true"
	               });

	                oFileUpldr.addParameter(vparaRename);*/

	                var vreplaceexist = new sap.ui.commons.FileUploaderParameter({
	                               name : "replaceexist",
	                               value : "false"
	               });
	               oFileUpldr.addParameter(vreplaceexist);

	               var jsonNewFileDetail = [];
	               var files = oEvent.oSource.oFileUpload.files; // $('#oUploadMultipleCertificate-fu');
	               if (files != undefined) {  //INSIDE COMES FOR OTHER THAN IE BROWSER
	                        for ( var i = 0; i < files.length; i++) {
	                                       jsonNewFileDetail.push({
	                                                       "id" : i + 1,
	                                                       'fileSelName' : oEvent.oSource.oFileUpload.files[i].name,
	                                                       "newfilename" : oEvent.oSource.oFileUpload.files[i].name,
	                                                       "uploadpath" : ''
	                                       });
	                       }
	                               // oEvent.oSource.oFileUpload.files
	               } else {  //IE BROWSER
	                       var strupldVal = oEvent.oSource.oFileUpload.value;
	                       var filenameonly = strupldVal.substring(strupldVal.lastIndexOf('\\') + 1);

	                       jsonNewFileDetail.push({
	                                       "id" : 1,
	                                       'fileSelName' : oEvent.oSource.oFileUpload.value,
	                                       "newfilename" : filenameonly,
	                                       "uploadpath" : ''
	                       });
	               }

	               if (jsonNewFileDetail.length < 1) {
	                       jsonNewFileDetail.push({
	                                       "id" : 1,
	                                       'fileSelName' : 'No File Selected',
	                                       "newfilename" : 'No File Selected',
	                                       "uploadpath" : ''
	                       });
	               }
	               oFileUpldr.setAdditionalData(JSON.stringify(jsonNewFileDetail));
	               return jsonNewFileDetail;
	 },

	//VALIDATE UNIT NUMBER
	validateUnitNumber: function (unitnumber){
	       unitnumber =  $.trim(unitnumber);
	       if(unitnumber == ''){
	                       //sap.ui.commons.MessageBox.alert("Either Unit Number or Document Type input missing.\n Please check your inputs and retry.");
	                       return false;
	       }
	       if(unitnumber.length != 11){
	                       //sap.ui.commons.MessageBox.alert("You have input an invalid Unit Number.\n Please enter a valid  Unit Number -11-char alpha numeric.");
	                       return false;
	       }
	       var validateInput = unitnumber.substr(0,4);
	       if(!(/^[a-zA-Z\s]+$/.test(validateInput))){
	                       //sap.ui.commons.MessageBox.alert("You have input an invalid Unit Number.\n Please enter a valid  Unit Number -11-char alpha numeric.");
	                       return false;
	       }

	        var validateInput = unitnumber.substr(4,7);
	       if(!(/^[0-9]+$/.test(validateInput))) {
	                       //sap.ui.commons.MessageBox.alert("You have input an invalid Unit Number.\n Please enter a valid  Unit Number -11-char alpha numeric.");
	                       return false;
	       }
	       return true;
	},

	validateDNNumber: function (DNNumber){
	       DNNumber =  $.trim(DNNumber);
	       if(DNNumber == ''){
	                       //sap.ui.commons.MessageBox.alert("Either Unit Number or Document Type input missing.\n Please check your inputs and retry.");
	                       return false;
	       }
	       if((DNNumber.length != 6) && (DNNumber.length != 7)){
	                       //sap.ui.commons.MessageBox.alert("You have input an invalid Unit Number.\n Please enter a valid  Unit Number -11-char alpha numeric.");
	                       return false;
	       }

	        if(!(/^[0-9]+$/.test(DNNumber))) {
	                       //sap.ui.commons.MessageBox.alert("You have input an invalid Unit Number.\n Please enter a valid  Unit Number -11-char alpha numeric.");
	                       return false;
	       }
	       return true;
	},

	validateDateWithotSeprtr: function (datePara){
	           datePara =  $.trim(datePara);
	           if(datePara == ''){
	                           //sap.ui.commons.MessageBox.alert("Either Unit Number or Document Type input missing.\n Please check your inputs and retry.");
	                           return false;
	           }
	           if((datePara.length != 8)){
	                           //sap.ui.commons.MessageBox.alert("You have input an invalid Unit Number.\n Please enter a valid  Unit Number -11-char alpha numeric.");
	                           return false;
	           }

	            if(!(/^[0-9]+$/.test(datePara))) {
	                           //sap.ui.commons.MessageBox.alert("You have input an invalid Unit Number.\n Please enter a valid  Unit Number -11-char alpha numeric.");
	                           return false;
	           }
	           return true;
	},

	removeLeadZero: function(numberStr){
	           var valStr = numberStr;//.substr(1);  //Remove P

	           while(valStr.charAt(0) === '0') {   //Remove 0
	                           valStr = valStr.substr(1);
	           }
	           return valStr;
	},

	doOnlineRequest: function (odataUrlToCall, successfun, errorfunc){
	           oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
	           OData.request({
	             requestUri: odataUrlToCall,
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
	           function (resultdata, response){
	                  successfun(resultdata, response);
	           },
	           function(err){
	                  errorfunc(err);
	              //alert("Error while Reading Result : "+ window.JSON.stringify(err.response));
	              //return oFlexboxError;
	           });
	},

	getOnlineCSRFTokenError: function(){
	         errorfromServer(err);
	},

	doOnlinePostData:function(odataUrlToCall,oDataPostParam,  successfun, errorfunc){
	               //GET REQUEST FOR FETCH CSRF TOKEN
	               OData.request({
	                 requestUri: odataUrlToCall,
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
	               function (resultdata, response){    //SUCCESS FECHING CSRF TOKEN
	                      //PUT REQUEST FOR UPDATE DATA
	                      var csrftoken = response.headers['x-csrf-token'];
	                                                    OData.request({
	                                    requestUri:  odataUrlToCall,
	                     method: "PUT",
	                     headers: {
	                                 "X-Requested-With": "XMLHttpRequest",
	                                 "Content-Type": "application/atom+xml;type=entry; charset=utf-8",
	                                 "DataServiceVersion": "2.0",
	                                 //"Accept": "application/atom+xml,application/atomsvc+xml,application/xml",
	                                 "X-CSRF-Token": csrftoken
	                             },
	                     data:     oDataPostParam
	                                       },
	                                                       function (resultdata, response)  //SUCCESS PUTE DATA REQUEST
	                                                      {
	                                                       successfun(resultdata, response);
	                                                      },
	                                       function (err)   //ERROR PUT ODATA REQUEST
	                                       {
	                                                    errorfunc(err);
	                                       });        //END PUT ODATA REQUEST
	               },
	               function(err){         //ERROR FECHING CSRF TOKEN
	                      errorfromServer(err);
	               });
	 },

	//EXPORT UTILITY ExportUtility(dataexportASjson, Display header Column Name Array, Display Feild, Title, event for )
	ExportUtility: function(JsnToExport, displayClmnHdrNamArr, displayClmnFildArr, title, btnTxt){
	            var html = "";

	            var urlNoHash = window.location.href.replace(window.location.hash,'');
	            var urlSplit = urlNoHash.split('/');
	            var base = "http://";
	            if(urlSplit.length > 2){
	                            for(var i=2; i<urlSplit.length - 1;i++){
	                           base = base + urlSplit[i]+"/";
	                    }
	                }

	            var htmlTable="";

	           // HTML Table - Start
	           htmlTable +='<table border=1 cellspacing=0 style="color:#656465">';
	           htmlTable += '<tr style="height:75px;">'+
	                        '<td colspan='+ (displayClmnHdrNamArr.length - 1) +' valign="middle" style="border:none;padding-left:10px;font:bold 18px Arial;">' +title + '</td>'+
	                        '<td style="border:none; padding:5px 5px 5px 0px" colspan=1 align ="right"><img src="' + base + 'images/login/login_logo.png"></img></td></tr>';
	           htmlTable += "<tr>";

	           for(var indx in displayClmnHdrNamArr){
	                       htmlTable += '<th style="font:bold 14px Arial;">'+displayClmnHdrNamArr[indx]+'</th>';
	           }

	           for(var index in JsnToExport){
	                                                   var valToPush = '{';
	                                                   htmlTable += "<tr>";

	                                                    for(i =0; i< displayClmnFildArr.length; i++){
	                                                                    htmlTable += '<td align=center style="font: 14px Arial;">'+JsnToExport[index][displayClmnFildArr[i]]+"</td>";
	                                                    }
	                                                   htmlTable += "</tr>";
	                                    }

	                                    htmlTable += "</table>";

	                                    if(btnTxt == "print"){
	                 html += "<div align=center>";
	                 html +=htmlTable+"</div>";
	                                   }else if(btnTxt == "export"){
	                 var uri = 'data:application/vnd.ms-excel;base64,',
	                 template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">'
	                 +'<!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->'
	                 +'<head></head>'
	                 +'<body>'+htmlTable  +'</body></html>',
	                 base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) },
	                 format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) };

	                 var ctx = {worksheet: title || 'Worksheet', table: htmlTable};
	                 //window.location.href = uri + base64(format(template, ctx));
	                 if (navigator.appName == 'Microsoft Internet Explorer')
		           	    {
		     		            // var byteCharacters = atob(uri + base64(format(template, ctx)));
		     		            var blobObject = b64toBlob(base64(format(template, ctx)), 'application/vnd.ms-excel');
		     		            //window.navigator.msSaveBlob(blobObject, 'msSaveBlob_testFile.xls'); //only with save option
		     		            window.navigator.msSaveOrOpenBlob(blobObject, 'downloadfile.xls'); //save and open both option
		     	        }else
		           	    {
		           	    	 //window.location.href = uri + base64(format(template, ctx));
		     	        	// window.open(uri + base64(format(template, ctx))); // MACHANAEXCELISSUE-
									
									// MACHANAEXCELISSUE+
									var filenamexls = "download.xls";
									let file = new Blob([htmlTable], {type:"application/vnd.ms-excel"});

								   let url = URL.createObjectURL(file);

								   let a = $("<a />", {
								   href: url,
								   download: filenamexls
								   })
								   .appendTo("body")
								   .get(0)
								   .click();
		           	    }
		      		 }
                     return html;
	},

	unique: function(list) {
	            var result = [];
	            $.each(list, function(i, e) {
	                if ($.inArray(e, result) == -1) result.push(e);
	            });
	            return result;
	},

	addColumnSorterAndFilter: function(oColumn, comparator) {
        var oTable = oColumn.getParent();
        var oCustomMenu = new sap.ui.commons.Menu();

          oCustomMenu.addItem(new sap.ui.commons.MenuItem({
                      text: 'Sort ascending',
                      icon:"images/icon_sort_asc.gif",
                      select:function() {
                       var oSorter = new sap.ui.model.Sorter(oColumn.getSortProperty(), false);
                       oSorter.fnCompare=comparator;
                       oTable.getBinding("rows").sort(oSorter);

                       for (var i=0;i<oTable.getColumns().length; i++) oTable.getColumns()[i].setSorted(false);
                       oColumn.setSorted(true);
                       oColumn.setSortOrder(sap.ui.table.SortOrder.Ascending);
                      }
          }));
          oCustomMenu.addItem(new sap.ui.commons.MenuItem({
           text: 'Sort descending',
              icon:"images/icon_sort_desc.gif",
              select:function(oControlEvent) {
                   var oSorter = new sap.ui.model.Sorter(oColumn.getSortProperty(), true);
                   oSorter.fnCompare=comparator;
                   oTable.getBinding("rows").sort(oSorter);

                   for (var i=0;i<oTable.getColumns().length; i++) oTable.getColumns()[i].setSorted(false);

                   oColumn.setSorted(true);
                   oColumn.setSortOrder(sap.ui.table.SortOrder.Descending);
              }
          }));

          oCustomMenu.addItem(new sap.ui.commons.MenuTextFieldItem({
        text: 'Filter',
        icon: 'images/icon_filter.gif',
        select: function(oControlEvent) {
            var filterValue = oControlEvent.getParameters().item.getValue();
            var filterProperty = oControlEvent.getSource().getParent().getParent().mProperties.sortProperty;
            var filters = [];
            if (filterValue.trim() != '') {
            var oFilter1 = new sap.ui.model.Filter(filterProperty, sap.ui.model.FilterOperator.EQ, filterValue);
            filters = [oFilter1];
            }
            oTable.getBinding("rows").filter(filters, sap.ui.model.FilterType.Application);
        }
          }));

          oColumn.setMenu(oCustomMenu);
          return oColumn;
      },

compareUptoCount: function(value1,value2){
	if(value1 != undefined){
		value1= value1.toString().replace(/Years/gi,"").trim();
		value1= value1.toString().replace(/\,/g,"");
		if(value1.indexOf(">") > -1){
			value1= value1.toString().replace(/\>/g,"");
			value1 = parseInt(value1) + 1;
		}
		if(value1.toString().indexOf("<") > -1){
			value1= value1.toString().replace(/\</g,"");
			value1 = parseInt(value1) - 1;
		}
		value1= value1.toString().replace(/\*/g,"");
		var indx = value1.toString().indexOf("-");
		if(indx>0)
			value1= value1.substring(0,indx);
	}

	if(value2 != undefined){
		value2= value2.toString().replace(/Years/gi,"").trim();
		value2= value2.toString().replace(/\,/g,"");
		if(value2.indexOf(">") > -1){
			value2= value2.toString().replace(/\>/g,"");
			value2 = parseInt(value2) + 1;
		}
		if(value2.toString().indexOf("<") > -1){
			value2= value2.toString().replace(/\</g,"");
			value2 = parseInt(value2) - 1;
		}
		value2= value2.toString().replace(/\*/g,"");

		var indx = value2.toString().indexOf("-");
		if(indx>0)
			value2= value2.substring(0,indx);
	}

      if ((value1 == null || value1 == undefined || value1 == '') &&
                     (value2 == null || value2 == undefined || value2 == ''))
             return 0;
                     if ((value1 == null || value1 == undefined || value1 == ''))
                            return -1;
                     if ((value2 == null || value2 == undefined || value2 == ''))
                            return 1;
                     if(parseInt(value1) < parseInt(value2))
                            return -1;
                     if(parseInt(value1) == parseInt(value2))
                            return 0;
                     if(parseInt(value1) > parseInt(value2))
                            return 1;
},
DateDifference: function(date1, date2) {
    var datediff = date1.getTime() - date2.getTime();
    //store the getTime diff - or +
    return (datediff / (24 * 60 * 60 * 1000));
    //Convert values to -/+ days and return value
},
//Begin of adding by Seyed Ismail on 26.09.2014 "MAC26092014 for get support page

loadAppGS: function(){
                //LOAD RESOURCES FOR THIS VIEW
    sap.ui.localResources("js");
    sap.ui.localResources("view");
    jQuery.sap.registerModulePath('Application', 'Application');
    jQuery.sap.require("Application");

                                //objLoginUser = new loggedInU(); //INIT FOR LOGEDIN USER DATA
       // if(this.checkforlogout()){
          //              return false;
        //}

       // if(sessionStorage.login != undefined){
               //         sessionStorage.removeItem('login');
        //}



        var oUtility = this;
        var menu = this.createMenuGS(oUtility);
        busyDialog.open();
     // Launch application

        var oContainer = new sap.ui.unified.SplitContainer('prmryContainer',{
                        setSecondaryContentWidth: '100px',
                        showSecondaryContent: true,
                        content: [],
                        secondaryContent: [menu]
        });
        var oApp = new Application({
            root : "prmryContainer"
        });
        oContainer.setSecondaryContentWidth('210px');
        oContainer.placeAt("wrapper");



        this.getUserHomeGS();

  },

createMenuGS: function (oUtility){
        var oTree = new sap.ui.commons.Tree("menu");
        // oTree.setTitle("Seaco Title");
        // oTree.setWidth("100%");
        oTree.setHeight("100%");
        oTree.setShowHeaderIcons(true);
        oTree.setShowHeader(false);
        oTree.setShowHorizontalScrollbar(false);
        var oTreeNode = new sap.ui.commons.TreeNode("node");
        oTreeNode.setExpanded(false);
        oTreeNode.bindProperty("text", "name");
        oTreeNode.bindProperty("icon", "inActive");
        oTree.bindAggregation("nodes", "/", oTreeNode);

        oTree.attachSelect(
        function(oEvent){
              var curntSelMenu = oEvent.getParameter('node').getId();
              var menuClickedTxt = oEvent.getParameter('node').getText();
                                                oUtility.menuClickGS(menuClickedTxt);
       });
        //alert("Returning Menu");
       return oTree;
},

menuClickGS: function(menuClickedTxt){
      //alert(menuClickedData.length);
      var toOpen = jQuery.grep(menuClickedData, function(element, index){
                  return element.clicked == menuClickedTxt;
      });

      if(toOpen.length > 0){
                  if(toOpen[0].page != ""){

                        if(toOpen.length != 0){
                            //alert("Page to Open : "+ toOpen[0].page);
                                this.resetScreenLayout(toOpen[0].page);
                                var bus = sap.ui.getCore().getEventBus();
                                bus.publish("nav", "to", {
                                            id : toOpen[0].page
                                });
                                $('#idHdrContnt').html(toOpen[0].title); //CHANGE HEADER CONTENT
                        }
                  }
      }

},

getUserHomeGS: function(){
    var oCurrent = this;

    var data = {
                   results:{
                                                0: {
                                                Accnt: "",
                                                ActiveIcon: "images/menu/L1a.png",
                                                AgrName: "",
                                                Bname: "Guest",
                                                ChildMenu: "",
                                                Department: "Guest",
                                                EMsg: "",
                                                Extra: "00000000000000000001",
                                                GrpName: "",
                                                InactiveIcon: "images/menu/L1.png",
                                                Menu: "",
                                                MenuName: "New User",
                                                Page1: "GetSupportNewUser",
                                                Parent: "X",
                                                Password: "",
                                                ScrView: "",
                                                Sequence: "76.0",
                                                Test: "",
                                                Test1: "00000000000000000019",
                                                Title: "New User Request",
                                                Type: "",
                                                UDat: "/Date(253392451200000)/"
                    },
                    1:  {
                                                Accnt: "",
                                                ActiveIcon: "images/menu/L13a.png",
                                                AgrName: "",
                                                Bname: "Guest",
                                                ChildMenu: "",
                                                Department: "Guest",
                                                EMsg: "",
                                                Extra: "00000000000000000001",
                                                GrpName: "",
                                                InactiveIcon: "images/menu/L13.png",
                                                Menu: "",
                                                MenuName: "Existing User",
                                                Page1: "GetSupportExistingUser",
                                                Parent: "X",
                                                Password: "",
                                                ScrView: "",
                                                Sequence: "77.0",
                                                Test: "",
                                                Test1: "00000000000000000019",
                                                Title: "Existing User",
                                                Type: "",
                                                UDat: "/Date(253392451200000)/"
                    }
                   },
                };

             busyDialog.close();
             backendMenuJSON = data;
             oCurrent.createScreenMenufromJSONGS(backendMenuJSON,oCurrent);
},

createScreenMenufromJSONGS:function(data, oCurrent){
                 var oLoggedInUser = new loggedInU();
    oLoggedInUser.setLoggedInUserData(data.results);

   oCurrent.setupMenuClickedJSONGS(data.results);

    //var pageId = new loggedInU().getLoggedInUserLandingPage();
                    var viewId = "view.WelcomePg";
                                var bus = sap.ui.getCore().getEventBus();
                    bus.publish("nav", "to", {
                                 id : viewId
                    });
                    $('#idHdrContnt').html('Get Support');
    /*if(pageId.length>0){
        //sap.ui.getCore().byId("messageLabel").setText("Unable to display the home page. Please contact Seaco Customer Support or System Administrator to resolve this problem.").addStyleClass("fontTitleRed");
        if(pageId!= "ERROR"){
             viewId = viewId + pageId;
        }
        else{
            pageId = "messagePage";
            viewId = viewId + pageId;
        }
    }else
       sap.ui.getCore().byId("messageLabel").setText("No page found").addStyleClass("fontTitleRed");

    var toOpen = jQuery.grep(menuClickedData, function(element, index){
                return element.page == pageId;
    });

    pageidlanding = pageId;
    var defaultPageLand = true;
    if(toOpen.length != 0){
           menuClickedTxt = toOpen[0].clicked;
           defaultPageLand = false;
           $('#idHdrContnt').html(toOpen[0].title); //CHANGE HEADER CONTENT
    }

                    menuClickedTxt = toOpen[0].clicked;
                    defaultPageLand = false;
                    $('#idHdrContnt').html(toOpen[0].title); //CHANGE HEADER CONTENT */

    //var userName = oLoggedInUser.getLoggedInUserName();
    var labUserName =  new sap.ui.commons.Label({text:'Guest',
                                    wrapping: true,
                    });


    var UserFlex = new sap.m.FlexBox({ items: [  labUserName  ],  direction: "Column"  });
    UserFlex.placeAt('idLoggedInUserArea');

    aMenuLinks = oLoggedInUser.getLoggedInUserData();
    oCurrent.createMenuTreeSG(aMenuLinks);
    /*
    //FIRE EVENT FOR SELECTE PAGE
    if(!defaultPageLand){
        var nodes = sap.ui.getCore().byId("menu").getNodes();
                                                var map = {};
                                                for(var i=0;i<nodes.length;i++){
                                                                var subNodes = nodes[i].getNodes();
                                                                if(nodes[i].getText() == menuClickedTxt){
                                                                                map.node = nodes[i];
                                                                                break;
                                                                }
                                                                for(var indx in subNodes){
                                                                                if(subNodes[indx].getText() == menuClickedTxt){
                                                                                                map.node = subNodes[indx];
                                                                                                break;
                                                                                }
                                                                }
                                                }
                                                sap.ui.getCore().byId("menu").fireSelect(map);
    }else{
                var bus = sap.ui.getCore().getEventBus();
           bus.publish("nav", "to", {
                        id : pageId
           });
    }*/
},

setupMenuClickedJSONGS:function(menuLinks){


                var clicked = "";
                for(var i=0;i<2;i++){

                                if(menuLinks[i].Parent == 'X'){ // If Parent
                                                clicked = menuLinks[i].MenuName;
                                                //menuClickedData[i]['clicked'] = menuLinks[i].MenuName;
                                }else{  // if Child
                                                clicked =  menuLinks[i].ChildMenu;
                                                //menuClickedData[i]['clicked'] = menuLinks[i].ChildMenu;
                                }

                                menuClickedData.push({
                                                'clicked':clicked,
                                                'page':menuLinks[i].Page1,
                                                'title':menuLinks[i].Title
                                });

                                clicked = "";
                }
},

createMenuTreeSG: function(aParentLinks){
    var menuData2 = [];
    //var aParentLinks =  jQuery.grep(aMenuLinks, function(element, index){
    //        return element.Parent == "X" && element.Sequence != 0.0;
   // });
    //alert("parent length " + aParentLinks.length + "menu " + aMenuLinks.length);
    var aChildNodes = [];
    var obj = [];
    for(var i=0 ; i< 2 ; i++){

        aChildNodes = jQuery.grep(aMenuLinks, function(element, index){
                return element.MenuName == aParentLinks[i].MenuName && element.Parent != "X" && element.Sequence != 0.0;
        });

        if(aChildNodes.length > 0){
                for(var j=0 ; j<aChildNodes.length ; j++){
                                obj.push({"name":aChildNodes[j].ChildMenu});

                }
        }

        menuData2[i] = obj;
        menuData2[i]["name"] = aParentLinks[i].MenuName;
        menuData2[i]["inActive"] = aParentLinks[i].InactiveIcon;
        menuData2[i]["activeIcon"] = aParentLinks[i].ActiveIcon;
        obj=[];

    }

    menuData["name"] = "root";
    menuData[0]= menuData2;
    //alert("menuData.sysAdmin " + window.JSON.stringify(menuData));
    var oMenuModel = new sap.ui.model.json.JSONModel();
    oMenuModel.setData(menuData2);
    sap.ui.getCore().byId("menu").setModel(oMenuModel);
},

// End of adding by Seyed Ismail on 26.09.2014 "MAC26092014 for get support page

makeHTMLTableEST : function( depotForPrint,
		serialForPrint,
		//fullDepotForPrint,
		unitParrtCodeForPrint,
		//gradeForPrint,
		jobTypeForPrint,
		estimDateForPrint,
		//saleGradeForPrint,
		//currencyCodeForPrint,
		//referenceForPrint,
		labrateForPrint,

		oFESTInputNotes1,
		oFESTInputNotes2,
		oFESTInputNotes3,
		oFESTInputNotes4,
		oFESTInputNotes5,

		customer,

		oFESTInputRedel,
		oFESTInputRevNo,
		oFESTInputGINDate,
		oFESTInputBaseCurr,
		oFESTInputPOHDate,
		oFESTInputPOHLocation,
		oFESTInputDppLimit,
    oFESTInputDppCurr,

		printExcelData,
		title,
		func ){
		var referenceForPrint = "";
		var fullDepotForPrint = "";
		//var unitParrtCodeForPrint = "";
		var saleGradeForPrint = "";
		var currencyCodeForPrint = "";
		var saleGradeForPrint = "";

		var excelDataPrint = [];
		var excelDataPrintGet = oFESTExcel.getData();

		// Make totals based on the Responsibility Code //
		var labhrU = 0.00;
		var labhrJ = 0.00;
		var labhrO = 0.00;
		var labhrV = 0.00;
		var matrcU = 0.00;
		var matrcJ = 0.00;
		var matrcO = 0.00;
		var matrcV = 0.00;


		var currLength = excelDataPrintGet.length;

		for(var i =0; i < currLength; i++){
		loop1 : for(var j =0; j < 12; j++){
		if(excelDataPrintGet[i][j] != "" && excelDataPrintGet[i][j] != null){
		excelDataPrint.push(excelDataPrintGet[i]);
		break loop1;
		}
		}
		}


		for(var i=0; i<excelDataPrint.length; i++){
		if(excelDataPrint[i][11].substr(0,1).toUpperCase() == 'U'){
		labhrU = (excelDataPrint[i][9] == "")? labhrU : parseFloat(parseFloat(labhrU).toFixed(2)) + parseFloat(parseFloat(excelDataPrint[i][9]).toFixed(2));
		matrcU = (excelDataPrint[i][10] == "")? matrcU : parseFloat(parseFloat(matrcU).toFixed(2)) + parseFloat(parseFloat(excelDataPrint[i][10]).toFixed(2));
		}else if(excelDataPrint[i][11].substr(0,1).toUpperCase() == 'J'){
		labhrJ = (excelDataPrint[i][9] == "")? labhrJ : parseFloat(parseFloat(labhrJ).toFixed(2)) + parseFloat(parseFloat(excelDataPrint[i][9]).toFixed(2));
		matrcJ = (excelDataPrint[i][10] == "")? matrcJ : parseFloat(parseFloat(matrcJ).toFixed(2)) + parseFloat(parseFloat(excelDataPrint[i][10]).toFixed(2));
		}else if(excelDataPrint[i][11].substr(0,1).toUpperCase() == 'O'){
		labhrO = (excelDataPrint[i][9] == "")? labhrO : parseFloat(parseFloat(labhrO).toFixed(2)) + parseFloat(parseFloat(excelDataPrint[i][9]).toFixed(2));
		matrcO = (excelDataPrint[i][10] == "")? matrcO : parseFloat(parseFloat(matrcO).toFixed(2)) + parseFloat(parseFloat(excelDataPrint[i][10]).toFixed(2));
		}else if(excelDataPrint[i][11].substr(0,1).toUpperCase() == 'V'){
		labhrV = (excelDataPrint[i][9] == "")? labhrV : parseFloat(parseFloat(labhrV).toFixed(2)) + parseFloat(parseFloat(excelDataPrint[i][9]).toFixed(2));
		matrcV = (excelDataPrint[i][10] == "")? matrcV : parseFloat(parseFloat(matrcV).toFixed(2)) + parseFloat(parseFloat(excelDataPrint[i][10]).toFixed(2));
		}
		}


		var labrtU = parseFloat(labhrU * labrateForPrint).toFixed(2);
		var labrtJ = parseFloat(labhrJ * labrateForPrint).toFixed(2);
		var labrtO = parseFloat(labhrO * labrateForPrint).toFixed(2);
		var labrtV = parseFloat(labhrV * labrateForPrint).toFixed(2);
		labrtU = parseFloat(parseFloat(labrtU).toFixed(2)) + parseFloat(parseFloat(labrtV).toFixed(2));
		labrtO = parseFloat(parseFloat(labrtO).toFixed(2)) + parseFloat(parseFloat(labrtJ).toFixed(2));
		var labrt = parseFloat(parseFloat(labrtU).toFixed(2)) + parseFloat(parseFloat(labrtJ).toFixed(2)) + parseFloat(parseFloat(labrtO).toFixed(2)) +
			parseFloat(parseFloat(labrtV).toFixed(2));
		labrt = parseFloat(labrt).toFixed(2);


		var matrc = matrcU + matrcJ + matrcO + matrcV;
		matrcU = matrcU + matrcV;
		matrcO = matrcO + matrcJ;
		matrc = parseFloat(matrc).toFixed(2);
		matrcV = parseFloat(matrcV).toFixed(2);
		matrcJ = parseFloat(matrcJ).toFixed(2);
		matrcO = parseFloat(matrcO).toFixed(2);
		matrcU = parseFloat(matrcU).toFixed(2);

		var printTotalCost = [];

		printTotalCost.push({
		"" : "User",
		"Labour" : labrtU,
		"Material" : matrcU,
		});

		//printTotalCost.push({
		//"" : "Customer",
		//"Labour" : labrtV,
		//"Material" : matrcV,
		//});
		//
		//printTotalCost.push({
		//"" : "JS Allocation",
		//"Labour" : labrtJ,
		//"Material" : matrcJ,
		//});

		printTotalCost.push({
		"" : "Owner",
		"Labour" : labrtO,
		"Material" : matrcO,
		});

		printTotalCost.push({
		"" : "Total",
		"Labour" : labrt,
		"Material" : matrc,
		});




		var html = "";
		var count = 0;

		var urlNoHash = window.location.href.replace(window.location.hash,'');
		var urlSplit = urlNoHash.split('/');
		//var base = "http://";
		var base = "";
		if(urlSplit.length > 2){
		base = base + urlSplit[0]+"//";
		for(var i=2; i<urlSplit.length - 1;i++){
		base = base + urlSplit[i]+"/";
		}
		}

		var tableWidth = 16;
		var htmlTable="";

		htmlTable +='<table border=0 cellspacing=0 style="color:#656465">';   // HTML Header - Start
		htmlTable += '<tr style="height:75px;border=1;padding-bottom:10px">'+
		'<td align=center colspan='+ (tableWidth - 12) +' style="padding-left:10px;font:bold 14px Arial;"><u>' +title + ' for <b><FONT COLOR="RED">' + serialForPrint +' </FONT></b> in depot <b><FONT COLOR="RED">'+ depotForPrint + '</FONT></b> on <b><FONT COLOR="RED">'+ estimDateForPrint + '</FONT></b></u></td>'+
		'<td style="border:none; padding:5px 5px 5px 0px" colspan=2 align ="right"><img src="' + base + 'images/login/login_logo.png"></img></td></tr>';

		//htmlTable += '<tr  style="border:none;height:20px;"><td colspan='+ (tableWidth)+'></td></tr>';
		////htmlTable += '<tr  style="border:none;height:20px;"><td colspan='+ (tableWidth)+'></td></tr>';
		//htmlTable += '</tr>';
		//htmlTable += '<tr  style="border:none;height:35px;">';
		////htmlTable += '<td align=center colspan="2" style="padding-left:10px; font: 12px Arial;">Serial Number : <b>' + serialForPrint + '</b></td>';
		//htmlTable += '</tr>';
		htmlTable += '<tr  style="border:none;">';
		if(unitParrtCodeForPrint != '')
			htmlTable += '<td align=left style="padding-left:10px; font: 12px Arial;">Part : <b>' + unitParrtCodeForPrint + '</b></td>';

			/*if(gradeForPrint != '')
				htmlTable += '<td align=left style="padding-left:10px; font: 12px Arial;">Sale Grade : <b>' + gradeForPrint + '</b></td>';*/

		if(jobTypeForPrint != '')
			htmlTable += '<td align=left style="padding-left:10px; font: 12px Arial;">Estim. Type : <b>' + jobTypeForPrint + '</b></td>';

		if(labrateForPrint != '')
			htmlTable += '<td align=left  style="padding-left:10px; font: 12px Arial;">Lab. Rate : <b>' + labrateForPrint + '</b></td>';

		if(estimDateForPrint != '')
			htmlTable += '<td align=left style="width:250px;padding-left:10px; font: 12px Arial;">Estim Date : <b>' + estimDateForPrint + '</b></td>';

		if(customer != '')
			htmlTable += '<td align=left  style="padding-left:10px; font: 12px Arial;">Customer : <b>' + customer + '</b></td>';

		if(oFESTInputRedel != '')
			htmlTable += '<td align=left  style="padding-left:10px; font: 12px Arial;">Redel. Auth : <b>' + oFESTInputRedel + '</b></td>';

		htmlTable += '</tr>';


		htmlTable += '<tr  style="border:none;padding-bottom:10px">';
		if(oFESTInputRevNo != '')
			htmlTable += '<td align=left style="padding-left:10px; font: 12px Arial;">Rev. No : <b>' + oFESTInputRevNo + '</b></td>';

		if(oFESTInputGINDate != '')
			htmlTable += '<td align=left style="padding-left:10px; font: 12px Arial;">Gate IN Date : <b>' + oFESTInputGINDate + '</b></td>';

		if(oFESTInputBaseCurr != '')
			htmlTable += '<td align=left  style="padding-left:10px; font: 12px Arial;">Base Curr. : <b>' + oFESTInputBaseCurr + '</b></td>';

		if(oFESTInputPOHDate != '')
			htmlTable += '<td align=left style="width:250px;padding-left:10px; font: 12px Arial;">Prev. On Hire Date : <b>' + oFESTInputPOHDate + '</b></td>';

		if(oFESTInputPOHLocation != '')
			htmlTable += '<td align=left  style="padding-left:10px; font: 12px Arial;">Prev. On Hire Loc : <b>' + oFESTInputPOHLocation + '</b></td>';

		if(oFESTInputDppLimit != '')
			htmlTable += '<td align=left  style="padding-left:10px; font: 12px Arial;">Seacover Limit : <b>' + oFESTInputDppLimit + '</b></td>';

    if(oFESTInputDppCurr != '')
  			htmlTable += '<td align=left  style="padding-left:10px; font: 12px Arial;">Seacover Limit : <b>' + oFESTInputDppCurr + '</b></td>';


		htmlTable += '</tr>';


		if(oFESTInputNotes1 != ''){
		htmlTable += '<tr  style="border:none;padding-bottom:10px">';
		htmlTable += '<td align=left style="padding-left:10px; font: 12px Arial;">Notes 1 : <b>' + oFESTInputNotes1 + '</b></td>';
		htmlTable += '</tr>';
		}

		if(oFESTInputNotes2 != ''){
			htmlTable += '<tr  style="border:none;padding-bottom:10px">';
			htmlTable += '<td align=left style="padding-left:10px; font: 12px Arial;">Notes 2 : <b>' + oFESTInputNotes2 + '</b></td>';
			htmlTable += '</tr>';
			}

		if(oFESTInputNotes3 != ''){
			htmlTable += '<tr  style="border:none;padding-bottom:10px">';
			htmlTable += '<td align=left style="padding-left:10px; font: 12px Arial;">Notes 3 : <b>' + oFESTInputNotes3 + '</b></td>';
			htmlTable += '</tr>';
			}

		if(oFESTInputNotes4 != ''){
			htmlTable += '<tr  style="border:none;padding-bottom:10px">';
			htmlTable += '<td align=left style="padding-left:10px; font: 12px Arial;">Notes 4 : <b>' + oFESTInputNotes4 + '</b></td>';
			htmlTable += '</tr>';
			}

		if(oFESTInputNotes5 != ''){
			htmlTable += '<tr  style="border:none;padding-bottom:10px">';
			htmlTable += '<td align=left style="padding-left:10px; font: 12px Arial;">Notes 5 : <b>' + oFESTInputNotes5 + '</b></td>';
			htmlTable += '</tr>';
			}


		//htmlTable += '<tr  style="border:none;height:35px;">';
		//htmlTable += '<td align=right style="padding-left:10px; font: 12px Arial;">Estimate Date : <b>' + estimDateForPrint + '</b></td>';
		//htmlTable += '<td align=left  style="padding-left:30px; font: 12px Arial;">Estimate Type : <b>' + jobTypeForPrint + '</b></td>';
		//htmlTable += '</tr>';
		//htmlTable += '<tr  style="border:none;height:35px;">';
		//htmlTable += '<td align=right style="padding-left:10px; font: 12px Arial;">Unit Part : <b>' + unitParrtCodeForPrint + '</b></td>';
		//htmlTable += '<td align=left  style="padding-left:30px; font: 12px Arial;">Currency : <b>' + currencyCodeForPrint + '</b></td>';
		//htmlTable += '</tr>';

		//htmlTable += '</table>';

		//htmlTable += '<table>';
		if(printExcelData.length>0){
		htmlTable += '<tr  style="border:none;height:20px;"></tr>';
       	htmlTable += '<td valign="top" colspan='+ (4) +' style="padding-left:10px;">';

		htmlTable += '<table align=left border=1 cellspacing=0 style="color:#656465;padding-left:0px;">';
		//Create PrimData1 Table Headers
		/* htmlTable += "<tr>";
		count = 0;
		$.each(PrimData1, function(i, item) {
		for (var key in item){
		    if(count == 0){
		           //alert("key : "+ key);
		           htmlTable += '<th style="font:bold 14px Arial;">'+key+'</th>';
		    }
		}
		count ++;
		});
		htmlTable += "</tr>";*/

		htmlTable += "<tr>";
		for (var key in printExcelData[0]){
		//alert("key : "+ key);
		htmlTable += '<td align=center style="width: 100px;font: bold 12px Arial;">'+key+"</td>";
		//console.log(key + ' = ' + item[key]);
		}
		htmlTable += "</tr>";

		// Create PrimData1 Table Body
		$.each(printExcelData, function(i, item) {
		htmlTable += "<tr>";
		for (var key in item){
		//alert("key : "+ key);
		htmlTable += '<td align=center style="font: 12px Arial;">'+item[key]+"</td>";
		//console.log(key + ' = ' + item[key]);
		}
		htmlTable += "</tr>";
		});
		htmlTable += '</table>';





		//htmlTable += '<tr  style="border:none;height:35px;">';
		htmlTable += '<tr  style="border:none;height:20px;">';
		htmlTable += '<table align=left border=1 cellspacing=0 style="color:#656465;margin-left:10px;">';
		//htmlTable += '<table align=left border=1 cellspacing=0 style="color:#656465">';

		htmlTable += "<tr>";
		for (var key in printTotalCost[0]){
		//alert("key : "+ key);
		htmlTable += '<td align=center style="font: bold 12px Arial;">'+key+"</td>";
		//console.log(key + ' = ' + item[key]);
		}
		htmlTable += "</tr>";
		var colorCount = 0;
		// Create PrimData1 Table Body
		$.each(printTotalCost, function(i, item) {
		 colorCount = colorCount + 1;
		htmlTable += "<tr>";
		for (var key in item){
		//alert("key : "+ key);
		if(colorCount == printTotalCost.length){
		  htmlTable += '<td align=center style="font: 12px Arial; background-color:#fef885">'+item[key]+"</td>";
		}else{
		  htmlTable += '<td align=center style="font: 12px Arial;">'+item[key]+"</td>";
		}

		//console.log(key + ' = ' + item[key]);
		}
		htmlTable += "</tr>";
		});

		htmlTable += '</table>';
		htmlTable += '</td>';
		}

		htmlTable += "</table>";   // HTML Header - End

		if(func == "print"){
		html +='<style>@page{size:landscape;}</style><html><head><title></title></head><body >';
		//alert("Print");
		html += "<div>";
		html +=htmlTable+"</div>";
		html +='</body></html>';

		}else if(func == "excel"){
		//alert("Export");
		var uri = 'data:application/vnd.ms-excel;base64,',
		template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">'
		+'<!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->'
		+'<head></head>'
		+'<body>'+htmlTable  +'</body></html>',
		base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) },
		format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }

		// Open Excel
		/*                   if (!table.nodeType)
		table = document.getElementById(table)*/
		var ctx = {worksheet: title || 'Worksheet', table: htmlTable};
		//window.location.href = uri + base64(format(template, ctx));
		if ((navigator.appName == 'Microsoft Internet Explorer') || (!!navigator.userAgent.match(/Trident.*rv[ :]*11\./)))
		{
		// var byteCharacters = atob(uri + base64(format(template, ctx)));
		var blobObject = b64toBlob(base64(format(template, ctx)), 'application/vnd.ms-excel');
		//window.navigator.msSaveBlob(blobObject, 'msSaveBlob_testFile.xls'); //only with save option
		window.navigator.msSaveOrOpenBlob(blobObject, 'downloadfile.xls'); //save and open both option
		}else
		{
		//window.location.href = uri + base64(format(template, ctx));
		// window.open(uri + base64(format(template, ctx)));	// MACHANAEXCELISSUE-
									
									// MACHANAEXCELISSUE+
									var filenamexls = "download.xls";
									let file = new Blob([htmlTable], {type:"application/vnd.ms-excel"});

								   let url = URL.createObjectURL(file);

								   let a = $("<a />", {
								   href: url,
								   download: filenamexls
								   })
								   .appendTo("body")
								   .get(0)
								   .click();

		}
		}

		return html;

		},

makeHTMLTableLA : function(
							depotForPrint,
							serialForPrint,
							referenceForPrint,
							approvalDateForPrint,
							amountForPrint,
							customerForPrint,
							lesseeForPrint,
							estimateForPrint,
							revnoForPrint,
							basecurrForPrint,
							labrateForPrint,
							printExcelData,
							title,
							func ){
					var fullDepotForPrint = "";
					var unitParrtCodeForPrint = "";
					var saleGradeForPrint = "";
					var currencyCodeForPrint = "";
					var saleGradeForPrint = "";

					var excelDataPrint = [];
					var excelDataPrintGet = oFLSAExcel.getData();

					// Make totals based on the Responsibility Code //
					var labhrU = 0.00;
					var labhrJ = 0.00;
					var labhrO = 0.00;
					var labhrV = 0.00;
					var matrcU = 0.00;
					var matrcJ = 0.00;
					var matrcO = 0.00;
					var matrcV = 0.00;


					var currLength = excelDataPrintGet.length;

					for(var i =0; i < currLength; i++){
					loop1 : for(var j =0; j < 12; j++){
					if(excelDataPrintGet[i][j] != "" && excelDataPrintGet[i][j] != null){
					excelDataPrint.push(excelDataPrintGet[i]);
					break loop1;
					}
					}
					}


					for(var i=0; i<excelDataPrint.length; i++){
					if(excelDataPrint[i][11].substr(0,1).toUpperCase() == 'U'){
					labhrU = (excelDataPrint[i][9] == "")? labhrU : parseFloat(parseFloat(labhrU).toFixed(2)) + parseFloat(parseFloat(excelDataPrint[i][9]).toFixed(2));
					matrcU = (excelDataPrint[i][10] == "")? matrcU : parseFloat(parseFloat(matrcU).toFixed(2)) + parseFloat(parseFloat(excelDataPrint[i][10]).toFixed(2));
					}else if(excelDataPrint[i][11].substr(0,1).toUpperCase() == 'J'){
					labhrJ = (excelDataPrint[i][9] == "")? labhrJ : parseFloat(parseFloat(labhrJ).toFixed(2)) + parseFloat(parseFloat(excelDataPrint[i][9]).toFixed(2));
					matrcJ = (excelDataPrint[i][10] == "")? matrcJ : parseFloat(parseFloat(matrcJ).toFixed(2)) + parseFloat(parseFloat(excelDataPrint[i][10]).toFixed(2));
					}else if(excelDataPrint[i][11].substr(0,1).toUpperCase() == 'O'){
					labhrO = (excelDataPrint[i][9] == "")? labhrO : parseFloat(parseFloat(labhrO).toFixed(2)) + parseFloat(parseFloat(excelDataPrint[i][9]).toFixed(2));
					matrcO = (excelDataPrint[i][10] == "")? matrcO : parseFloat(parseFloat(matrcO).toFixed(2)) + parseFloat(parseFloat(excelDataPrint[i][10]).toFixed(2));
					}else if(excelDataPrint[i][11].substr(0,1).toUpperCase() == 'V'){
					labhrV = (excelDataPrint[i][9] == "")? labhrV : parseFloat(parseFloat(labhrV).toFixed(2)) + parseFloat(parseFloat(excelDataPrint[i][9]).toFixed(2));
					matrcV = (excelDataPrint[i][10] == "")? matrcV : parseFloat(parseFloat(matrcV).toFixed(2)) + parseFloat(parseFloat(excelDataPrint[i][10]).toFixed(2));
					}
					}


					var labrtU = parseFloat(labhrU * labrateForPrint).toFixed(2);
					var labrtJ = parseFloat(labhrJ * labrateForPrint).toFixed(2);
					var labrtO = parseFloat(labhrO * labrateForPrint).toFixed(2);
					var labrtV = parseFloat(labhrV * labrateForPrint).toFixed(2);
					labrtU = parseFloat(parseFloat(labrtU).toFixed(2)) + parseFloat(parseFloat(labrtV).toFixed(2));
					labrtO = parseFloat(parseFloat(labrtO).toFixed(2)) + parseFloat(parseFloat(labrtJ).toFixed(2));
					var labrt = parseFloat(parseFloat(labrtU).toFixed(2)) + parseFloat(parseFloat(labrtJ).toFixed(2)) + parseFloat(parseFloat(labrtO).toFixed(2)) +
						parseFloat(parseFloat(labrtV).toFixed(2));
					labrt = parseFloat(labrt).toFixed(2);


					var matrc = matrcU + matrcJ + matrcO + matrcV;
					matrcU = matrcU + matrcV;
					matrcO = matrcO + matrcJ;
					matrc = parseFloat(matrc).toFixed(2);
					matrcV = parseFloat(matrcV).toFixed(2);
					matrcJ = parseFloat(matrcJ).toFixed(2);
					matrcO = parseFloat(matrcO).toFixed(2);
					matrcU = parseFloat(matrcU).toFixed(2);

					var printTotalCost = [];

					printTotalCost.push({
					"" : "User",
					"Labour" : labrtU,
					"Material" : matrcU,
					});

					//printTotalCost.push({
					//"" : "Customer",
					//"Labour" : labrtV,
					//"Material" : matrcV,
					//});
					//
					//printTotalCost.push({
					//"" : "JS Allocation",
					//"Labour" : labrtJ,
					//"Material" : matrcJ,
					//});

					printTotalCost.push({
					"" : "Owner",
					"Labour" : labrtO,
					"Material" : matrcO,
					});

					printTotalCost.push({
					"" : "Total",
					"Labour" : labrt,
					"Material" : matrc,
					});




					var html = "";
					var count = 0;

					var urlNoHash = window.location.href.replace(window.location.hash,'');
					var urlSplit = urlNoHash.split('/');
					//var base = "http://";
					var base = "";
					if(urlSplit.length > 2){
					base = base + urlSplit[0]+"//";
					for(var i=2; i<urlSplit.length - 1;i++){
					base = base + urlSplit[i]+"/";
					}
					}

					var tableWidth = 16;
					var htmlTable="";

					/* 							depotForPrint,
												serialForPrint,
												referenceForPrint,
												approvalDateForPrint,
												amountForPrint,
												customerForPrint,
												lesseeForPrint,
												estimateForPrint,
												revnoForPrint,
												basecurrForPrint,
												labrateForPrint,

												*/
					htmlTable +='<table border=0 cellspacing=0 style="color:#656465">';   // HTML Header - Start
					htmlTable += '<tr style="height:75px;border=1">'+
					'<td align=center colspan='+ (tableWidth - 12) +' style="padding-left:10px;font:bold 14px Arial;"><u>' +title + ' for <b><FONT COLOR="RED">' + serialForPrint +' </FONT></b> in depot <b><FONT COLOR="RED">'+ depotForPrint + '</FONT></b></u></td>'+
					'<td style="border:none; padding:5px 5px 5px 0px" colspan=2 align ="right"><img src="' + base + 'images/login/login_logo.png"></img></td></tr>';

					htmlTable += '<tr  style="border:none;">';
					if(depotForPrint != '')
						htmlTable += '<td align=left style="padding-left:10px; font: 12px Arial;">Depot : <b>' + depotForPrint + '</b></td>';

					if(serialForPrint != '')
						htmlTable += '<td align=left style="padding-left:10px; font: 12px Arial;">Serial No. : <b>' + serialForPrint + '</b></td>';

					if(referenceForPrint != '')
						htmlTable += '<td align=left  style="padding-left:10px; font: 12px Arial;">Reference : <b>' + referenceForPrint + '</b></td>';

					/*if(approvalDateForPrint != '')
						htmlTable += '<td align=left style="width:250px;padding-left:10px; font: 12px Arial;">Estimate Date : <b>' + approvalDateForPrint + '</b></td>';*/

					if(approvalDateForPrint != '')
						htmlTable += '<td align=left  style="padding-left:10px; font: 12px Arial;">Approval Date : <b>' + approvalDateForPrint + '</b></td>';

					if(amountForPrint != '')
						htmlTable += '<td align=left  style="padding-left:10px; font: 12px Arial;">Amount : <b>' + amountForPrint + '</b></td>';

					htmlTable += '</tr>';


					htmlTable += '<tr  style="border:none;padding-bottom:10px">';

					if(lesseeForPrint != '')
						htmlTable += '<td align=left style="padding-left:10px; font: 12px Arial;">Customer Name : <b>' + lesseeForPrint + '</b></td>';

					if(customerForPrint != '')
						htmlTable += '<td align=left style="padding-left:10px; font: 12px Arial;">Customer : <b>' + customerForPrint + '</b></td>';

					if(estimateForPrint != '')
						htmlTable += '<td align=left  style="padding-left:10px; font: 12px Arial;">Estimate : <b>' + estimateForPrint + '</b></td>';

					if(revnoForPrint != '')
						htmlTable += '<td align=left style="width:250px;padding-left:10px; font: 12px Arial;">Rev. No : <b>' + revnoForPrint + '</b></td>';

					if(basecurrForPrint != '')
						htmlTable += '<td align=left  style="padding-left:10px; font: 12px Arial;">Depot Curr. : <b>' + basecurrForPrint + '</b></td>';

					if(labrateForPrint != '')
						htmlTable += '<td align=left  style="padding-left:10px; font: 12px Arial;">Labour Rate : <b>' + labrateForPrint + '</b></td>';

					htmlTable += '</tr>';

					if(printExcelData.length>0){
					htmlTable += '<tr  style="border:none;height:20px;"></tr>';
					htmlTable += '<td valign="top" colspan='+ (5) +' style="padding-left:10px;">';

					htmlTable += '<table align=center border=1 cellspacing=0 style="color:#656465">';
					//Create PrimData1 Table Headers
					/* htmlTable += "<tr>";
					count = 0;
					$.each(PrimData1, function(i, item) {
					for (var key in item){
					    if(count == 0){
					           //alert("key : "+ key);
					           htmlTable += '<th style="font:bold 14px Arial;">'+key+'</th>';
					    }
					}
					count ++;
					});
					htmlTable += "</tr>";*/

					htmlTable += "<tr>";
					for (var key in printExcelData[0]){
					//alert("key : "+ key);
					htmlTable += '<td align=center style="font: bold 12px Arial;">'+key+"</td>";
					//console.log(key + ' = ' + item[key]);
					}
					htmlTable += "</tr>";

					// Create PrimData1 Table Body
					$.each(printExcelData, function(i, item) {
					htmlTable += "<tr>";
					for (var key in item){
					//alert("key : "+ key);
					htmlTable += '<td align=center style="font: 12px Arial;">'+item[key]+"</td>";
					//console.log(key + ' = ' + item[key]);
					}
					htmlTable += "</tr>";
					});
					htmlTable += '</table>';
					//htmlTable += '<tr  style="border:none;height:35px;">';
					htmlTable += '<tr  style="border:none;height:20px;">';
					htmlTable += '<table align=left border=1 cellspacing=0 style="color:#656465">';

					htmlTable += "<tr>";
					for (var key in printTotalCost[0]){
					//alert("key : "+ key);
					htmlTable += '<td align=center style="font: bold 12px Arial;">'+key+"</td>";
					//console.log(key + ' = ' + item[key]);
					}
					htmlTable += "</tr>";
					var colorCount = 0;
					// Create PrimData1 Table Body
					$.each(printTotalCost, function(i, item) {
					 colorCount = colorCount + 1;
					htmlTable += "<tr>";
					for (var key in item){
					//alert("key : "+ key);
					if(colorCount == printTotalCost.length){
					  htmlTable += '<td align=center style="font: 12px Arial; background-color:#fef885">'+item[key]+"</td>";
					}else{
					  htmlTable += '<td align=center style="font: 12px Arial;">'+item[key]+"</td>";
					}

					//console.log(key + ' = ' + item[key]);
					}
					htmlTable += "</tr>";
					});

					htmlTable += '</table>';
					htmlTable += '</td>';
					}

					htmlTable += "</table>";   // HTML Header - End

					if(func == "print"){
					html +='<style>@page{size:landscape;}</style><html><head><title></title></head><body >';
					//alert("Print");
					html += "<div>";
					html +=htmlTable+"</div>";
					html +='</body></html>';

					}else if(func == "excel"){
					//alert("Export");
					var uri = 'data:application/vnd.ms-excel;base64,',
					template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">'
					+'<!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->'
					+'<head></head>'
					+'<body>'+htmlTable  +'</body></html>',
					base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) },
					format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }

					// Open Excel
					/*                   if (!table.nodeType)
					table = document.getElementById(table)*/
					var ctx = {worksheet: title || 'Worksheet', table: htmlTable};
					//window.location.href = uri + base64(format(template, ctx));
					if ((navigator.appName == 'Microsoft Internet Explorer') || (!!navigator.userAgent.match(/Trident.*rv[ :]*11\./)))
					{
					// var byteCharacters = atob(uri + base64(format(template, ctx)));
					var blobObject = b64toBlob(base64(format(template, ctx)), 'application/vnd.ms-excel');
					//window.navigator.msSaveBlob(blobObject, 'msSaveBlob_testFile.xls'); //only with save option
					window.navigator.msSaveOrOpenBlob(blobObject, 'downloadfile.xls'); //save and open both option
					}else
					{
					//window.location.href = uri + base64(format(template, ctx));
					// window.open(uri + base64(format(template, ctx)));	// MACHANAEXCELISSUE-
									
									// MACHANAEXCELISSUE+
									var filenamexls = "download.xls";
									let file = new Blob([htmlTable], {type:"application/vnd.ms-excel"});

								   let url = URL.createObjectURL(file);

								   let a = $("<a />", {
								   href: url,
								   download: filenamexls
								   })
								   .appendTo("body")
								   .get(0)
								   .click();
					}
					}

					return html;

}

});

function replaceAll(str,replaceChar,replacewith){
               var valStr = str.split(replaceChar);//.substr(1);  //Remove P
               var finaloutput = '';
               for(var indx in valStr){
                               if(indx == (valStr.length-1)){
                                               finaloutput +=valStr[indx];
                               }else{
                                               finaloutput +=valStr[indx] +replacewith;
                                               }
                               }
               return finaloutput;
};

function errorfromServer(err){
                //alert(err.response.statusText);
                busyDialog.close();
                //alert("error " + err);
                if(err.response.statusCode == "500"){
                                sap.ui.commons.MessageBox.show("Your request could not be processed at this time.\n Please try again later.",
                            sap.ui.commons.MessageBox.Icon.INFORMATION,
                            "Information",
                            [sap.ui.commons.MessageBox.Action.OK],
                            sap.ui.commons.MessageBox.Action.OK);
                }else if(err.response.statusCode == "503"){
                                sap.ui.commons.MessageBox.show("Service Unavailable.\n Please check your network connections and try again.",
                            sap.ui.commons.MessageBox.Icon.INFORMATION,
                            "Information",
                            [sap.ui.commons.MessageBox.Action.OK],
                            sap.ui.commons.MessageBox.Action.OK);
                }else{
                                sap.ui.commons.MessageBox.show("Your request could not be processed at this time.\n Please try again later.",
                            sap.ui.commons.MessageBox.Icon.INFORMATION,
                            "Information",
                            [sap.ui.commons.MessageBox.Action.OK],
                            sap.ui.commons.MessageBox.Action.OK);
                }
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function convertDate(inputFormat) {
                  function pad(s) { return (s < 10) ? '0' + s : s; }
                  var d = new Date(inputFormat);
                  return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');
}


function split( val ) {
    //return val.split( /,\s*/ );
                return val.split(" ");
  }
function extractLast( term ) {
    return split( term ).pop();
}
function checkAvailable(term,arrayData) {
    var length = term.length,
        chck = false,
        term = term.toLowerCase();
    for (var i = 0, z = arrayData.length; i < z; i++)
    if (arrayData[i].substring(0, length).toLowerCase() === term) return true;
    return false;
}
function padZero(s) { return (s < 10) ? '0' + s : s; }
function validateNumeric(e,decimal) {
	if(decimal === undefined)
			decimal = false

	if((e.keyCode == 110) && !decimal)
		e.preventDefault();

	if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            // Allow: Ctrl+A
           (e.keyCode == 65 && e.ctrlKey === true) ||
            // Allow: home, end, left, right
           (e.keyCode >= 35 && e.keyCode <= 39)) {
                // let it happen, don't do anything
                return;
       }
       // Ensure that it is a number and stop the keypress
       if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
           e.preventDefault();
       }
}

function addSeparator(fldID) {
    var posCaret = getPosition(fldID);
    var fldVal = fldID.value;
       if((fldVal.length === 3 || 7 || 11) && (fldVal.length === posCaret)) {
         posCaret = posCaret +1;
         }
    nStr = fldVal.replace(/,/g,'');
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
       x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    fldID.value = x1+x2;
    setCaretPosition(fldID, posCaret);
}

function setCaretPosition(elem, caretPos) {
if(elem != null) {
    if(elem.createTextRange) {
        var range = elem.createTextRange();
        range.move('character', caretPos);
        range.select();
    }
    else {
        if(elem.selectionStart) {
            elem.focus();
            elem.setSelectionRange(caretPos, caretPos);
        }
    else
      elem.focus();
    }
}
}

function getPosition(amtFld) {
 var iCaretPos = 0;
 if (document.selection) {
   amtFld.focus ();
   var oSel = document.selection.createRange ();
   oSel.moveStart ('character', - amtFld.value.length);
   iCaretPos = oSel.text.length;
 }
 else if (amtFld.selectionStart || amtFld.selectionStart == '0')
   iCaretPos = amtFld.selectionStart;
 return(iCaretPos);
}

function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, {type: contentType});
    return blob;
}

function upperOnChangeTF(oevnt){
	this.setValue(this.getValue().toUpperCase());
}

function toTitleCase(str) {
    return str.replace(/(?:^|\s)\w/g, function(match) {
        return match.toUpperCase();
    });
}

function CheckIdleTime() {
    _idleSecondsCounter++;

    if (_idleSecondsCounter >= IDLE_TIMEOUT && !TimeoutFlag) {
    	TimeoutFlag = true;
    	sap.ui.commons.MessageBox.show("Session expired.",
	        	sap.ui.commons.MessageBox.Icon.WARNING,
	        	"Warning",
	        	[sap.ui.commons.MessageBox.Action.OK],
	        	fnCallBackOKLogoutUserSession,sap.ui.commons.MessageBox.Action.OK);
    }
}

function fnCallBackOKLogoutUserSession(){
	//new LoginView().LogoutUser();
	window.location.assign('UserHome.html');
}

function thousandsep(value){
    value = parseFloat(value);
    value = Globalize.format(value, 'n2', 'en');
    return value;
}

function findWithPropReturnIndex(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}

/*
 *
*$*$------------------------------------------------------------------------*
*$*$ Modified By : Seyed Ismail MAC
*$*$ Modified On : 16.01.2015
*$*$ Reference   : RTS1002
*$*$ Transport   : CGWK900792
*$*$ Tag         : MAC16012015
*$*$ Purpose     : Repair should be renamed as "Repair Cycle"
*$*$---------------------------------------------------------------------
**/	

var chartStatus;
var chartEStatus;
var relTableStatus;
var relTableEStatus;
var retTableStatus;
var retTableEStatus;
var depotDashboard;
var depotIdDashBoard;
var depotSelected;

var errorMsgDepotDashBoard = [];
sap.ui.model.json.JSONModel.extend("DepotDashboard", {
	bindChartData:function(){
		errorMsgDepotDashBoard[0]["status"] = "start";
		
		var depotCode = depotIdDashBoard;
		var filter = "/Depot_Dashboard?$filter=DepotCode eq '"+depotCode+"'";
		//alert("Str : "+ serviceUrl + filter);
		
		oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
  		OData.request({ 
  		      requestUri: serviceUrl + filter,
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
  		    	// Depot Inventory Dashboard - AVLB SALE REPA HOLD
  		    	var tempData = [];
  		    	DepotInv=[];
  		    	RepairInv=[];
  		    	MNR=[];
  		    	EDI=[];
  		    	AVLBData = [];
  		    	REPAData = [];
  		    	HOLDData = [];
  		    	SALEData = [];
  		    	DepotSTATUSData = [];
  		    	RepairSTATUSData=[];
  		    	
  		    	errorMsgDepotDashBoard[0]["status"] = "end";
  		    	/////////////////////////// AVLB /////////////////////////////////////////////
  		    	AVLBData = jQuery.grep(data.results, function(element, index){
  		            return (element.UserStatus == "AVLB" && element.FlagCount != "X");
  		    	});
  		    	//alert("AVLB Data "+ AVLBData.length);
  		    	for(var i = 0; i<AVLBData.length;i++){
  					
  					// Manufacturer Date
  					var vDocDateResult = AVLBData[i].ManufDate.split("(");
  		            var vDocDate = vDocDateResult[1].split(")");
  		            var vActualDate = new Date(Number(vDocDate[0]));
  		            var vformattedDocDate = dateFormat(new Date(Number(vDocDate[0])), 'mmm-yyyy',"UTC");
  		            //this is to check if the date is default 999 something show blank
  		            if (vformattedDocDate.substring(4) == "9999"){
  		            	AVLBData[i].ManufDate =  "-";
  		            	AVLBData[i]["ManufDateActual"] = vActualDate;
  		            }
  		            else{
  		            	AVLBData[i].ManufDate = vformattedDocDate;
  		            	AVLBData[i]["ManufDateActual"] = vActualDate;
  		            }
  		          jsonAVLB.push({
  	          		  'Unit Number':AVLBData[i].UnitNo,
  	          		  'Unit Type':AVLBData[i].UnitType,
  	          		  'Manufacturer Date':AVLBData[i].ManufDate,
  	          		  'User Status':AVLBData[i].UserStatus,
  	          		  'Days in AVLB':AVLBData[i].DaysInStatus,
  	          		  'Days in Depot':AVLBData[i].DaysInDepo,
  	            });
  				}
  		    	
  		    	
  		    	tempData = jQuery.grep(data.results, function(element, index){
  		            return (element.UserStatus == "AVLB" && element.FlagCount == "X");
  		    	});
  		    	if(tempData.length >0){
  		    		DepotInv.push({
    	          		  'status': 'AVLB',
    	            	  'countVal':tempData[0].Count,
    			    	});
  		    	}else{
  		    		DepotInv.push({
    	          		  'status': 'AVLB',
    	            	  'countVal':0,
    			    	});
  		    	}
  		    	
  		    	////////////////////////// SALE /////////////////////////////////////////////
  		    	SALEData = jQuery.grep(data.results, function(element, index){
  		            return (element.UserStatus == "SALE" && element.FlagCount != "X");
  		    	});
  		    	//alert("SALE Data "+ SALEData.length);
  		    	
  		    	for(var i = 0; i<SALEData.length;i++){
  					
  					// Manufacturer Date
  					var vDocDateResult = SALEData[i].ManufDate.split("(");
  		            var vDocDate = vDocDateResult[1].split(")");
  		            var vActualDate = new Date(Number(vDocDate[0]));
  		            var vformattedDocDate = dateFormat(new Date(Number(vDocDate[0])), 'mmm-yyyy',"UTC");
  		            //this is to check if the date is default 999 something show blank
  		            if (vformattedDocDate.substring(4) == "9999"){
  		            	SALEData[i].ManufDate =  "-";
  		            	SALEData[i]["ManufDateActual"] = vActualDate;
  		            }
  		            else{
  		            	SALEData[i].ManufDate = vformattedDocDate;
  		            	SALEData[i]["ManufDateActual"] = vActualDate;
  		            }
  		          jsonSALE.push({
  	          		  'Unit Number':SALEData[i].UnitNo,
  	          		  'Unit Type':SALEData[i].UnitType,
  	          		  'Manufacturer Date':SALEData[i].ManufDate,
  	          		  'User Status':SALEData[i].UserStatus,
  	          		  'Sale Grade':SALEData[i].SaleGrade,
  	          		  'Cargo Worthy':SALEData[i].CargoWorthy,
  	          		  'Days in SALE':SALEData[i].DaysInStatus,
  	          		  'Days in Depot':SALEData[i].DaysInDepo,
  		          });
  				}

  		    	var tempData = [];
  		    	tempData = jQuery.grep(data.results, function(element, index){
  		            return (element.UserStatus == "SALE" && element.FlagCount == "X");
  		    	});
  		    	if(tempData.length >0){
  		    		DepotInv.push({
    	          		  'status': 'SALE',
    	            	  'countVal':tempData[0].Count,
    			    	});
  		    	}else{
  		    		DepotInv.push({
    	          		  'status': 'SALE',
    	            	  'countVal':0,
    			    	});
  		    	}
  		    	
  		    	/////////////////////////// REPA /////////////////////////////////////////////
  		    	REPAData = jQuery.grep(data.results, function(element, index){
  		            return (element.UserStatus == "REPA" && element.FlagCount != "X");
  		    	});
  		    	//alert("REPA Data "+ REPAData.length);
  		    	for(var i = 0; i<REPAData.length;i++){
  					
  					// Manufacturer Date
  					var vDocDateResult = REPAData[i].ManufDate.split("(");
  		            var vDocDate = vDocDateResult[1].split(")");
  		            var vActualDate = new Date(Number(vDocDate[0]));
  		            var vformattedDocDate = dateFormat(new Date(Number(vDocDate[0])), 'mmm-yyyy',"UTC");
  		            //this is to check if the date is default 999 something show blank
  		            if (vformattedDocDate.substring(4) == "9999"){
  		            	REPAData[i].ManufDate =  "-";
  		            	REPAData[i]["ManufDateActual"] = vActualDate;
  		            }
  		            else{
  		            	REPAData[i].ManufDate = vformattedDocDate;
  		            	REPAData[i]["ManufDateActual"] = vActualDate;
  		            }
  		            jsonREPA.push({
  	          		  'Unit Number':REPAData[i].UnitNo,
  	          		  'Unit Type':REPAData[i].UnitType,
  	          		  'Manufacturer Date':REPAData[i].ManufDate,
  	          		  'User Status':REPAData[i].UserStatus,
  	          		  'Days in Current Status':REPAData[i].DaysInStatus,
  	          		  'Days in Depot':REPAData[i].DaysInDepo,
  		            });
  				}
  		    	var tempData = [];
  		    	tempData = jQuery.grep(data.results, function(element, index){
  		            return (element.UserStatus == "REPA" && element.FlagCount == "X");
  		    	});
  		    	if(tempData.length >0){
  		    		DepotInv.push({
    	          		  'status': 'REPAIR CYCLE',			// MAC16012015 Renamed from Repair to Repair Cycle
    	            	  'countVal':tempData[0].Count,
    			    	});
  		    	}else{
  		    		DepotInv.push({
    	          		  'status': 'REPAIR CYCLE',			// MAC16012015 Renamed from Repair to Repair Cycle
    	            	  'countVal':0,
    			    	});
  		    	}
  		    	
  		    	/////////////////////////// HOLD /////////////////////////////////////////////  		    	
  		    	HOLDData = jQuery.grep(data.results, function(element, index){
  		            return (element.UserStatus == "HOLD" && element.FlagCount != "X");
  		    	});
  		    	//alert("HOLD Data "+ HOLDData.length);
  		    	for(var i = 0; i<HOLDData.length;i++){
  					
  					// Manufacturer Date
  					var vDocDateResult = HOLDData[i].ManufDate.split("(");
  		            var vDocDate = vDocDateResult[1].split(")");
  		            var vActualDate = new Date(Number(vDocDate[0]));
  		            var vformattedDocDate = dateFormat(new Date(Number(vDocDate[0])), 'mmm-yyyy',"UTC");
  		            //this is to check if the date is default 999 something show blank
  		            if (vformattedDocDate.substring(4) == "9999"){
  		            	HOLDData[i].ManufDate =  "-";
  		            	HOLDData[i]["ManufDateActual"] = vActualDate;
  		            }
  		            else{
  		            	HOLDData[i].ManufDate = vformattedDocDate;
  		            	HOLDData[i]["ManufDateActual"] = vActualDate;
  		            }
  		          jsonHOLD.push({
  	          		  'Unit Number':HOLDData[i].UnitNo,
  	          		  'Unit Type':HOLDData[i].UnitType,
  	          		  'Manufacturer Date':HOLDData[i].ManufDate,
  	          		  'User Status':HOLDData[i].UserStatus,
  	          		  'Days in Current Status':HOLDData[i].DaysInStatus,
  	          		  'Days in Depot':HOLDData[i].DaysInDepo,
  	            });
  				}
  		    	var tempData = [];
  		    	tempData = jQuery.grep(data.results, function(element, index){
  		            return (element.UserStatus == "HOLD" && element.FlagCount == "X");
  		    	});
  		    	if(tempData.length >0){
  		    		DepotInv.push({
    	          		  'status': 'HOLD',
    	            	  'countVal':tempData[0].Count,
    			    	});
  		    	}else{
  		    		DepotInv.push({
    	          		  'status': 'HOLD',
    	            	  'countVal':0,
    			    	});
  		    	}
  		    	
  		    	var oModelDepotInventory = new sap.ui.model.json.JSONModel();
  				oModelDepotInventory.setData(DepotInv);
  				if(sap.ui.getCore().byId("DepotInventoryGraph")){
  					var checkNoData = jQuery.grep(DepotInv, function(element, index){
  	  		            return ( element.countVal == 0 );
  	  		    	});
  					if(checkNoData.length!=4){
  						sap.ui.getCore().byId("depotDashViewAll").setVisible(true);
  						sap.ui.getCore().byId("DepotInventoryGraph").setModel(oModelDepotInventory);
  					}else
  						sap.ui.getCore().byId("depotDashViewAll").setVisible(false);
  						
  					sap.ui.getCore().byId("DepotDashNoData").setText("No data found for Depot Inventory");
  				}
  					
  				///////////////////////////// DEPOT Inventory Status ////////////////////////////////////////
  				DepotSTATUSData = jQuery.grep(data.results, function(element, index){
  		            return ( ($.inArray(element.UserStatus, ['AVLB','SALE','REPA','HOLD', 'WEST'])) != -1 && (element.FlagCount != "X") );
  		    	});
  				
  				//alert("Inventory Status Data "+ DepotSTATUSData.length);
  				
  		    	// Repair Inventory Dashboard - WEST AWAP AUTH
  		    	
  		    	/////////////////////////// WEST /////////////////////////////////////////////  	    	
  		    	WESTData = jQuery.grep(data.results, function(element, index){
  		            return (element.UserStatus == "WEST" && element.FlagCount != "X");
  		    	});
  		    	//alert("WEST Data "+ WESTData.length);
  		    	for(var i = 0; i<WESTData.length;i++){
  					
  					// Manufacturer Date
  					var vDocDateResult = WESTData[i].ManufDate.split("(");
  		            var vDocDate = vDocDateResult[1].split(")");
  		            var vActualDate = new Date(Number(vDocDate[0]));
  		            var vformattedDocDate = dateFormat(new Date(Number(vDocDate[0])), 'mmm-yyyy',"UTC");
  		            //this is to check if the date is default 999 something show blank
  		            if (vformattedDocDate.substring(4) == "9999"){
  		            	WESTData[i].ManufDate =  "-";
  		            	WESTData[i]["ManufDateActual"] = vActualDate;
  		            }
  		            else{
  		            	WESTData[i].ManufDate = vformattedDocDate;
  		            	WESTData[i]["ManufDateActual"] = vActualDate;
  		            }
  		            jsonWEST.push({
  	          		  'Unit Number':WESTData[i].UnitNo,
  	          		  'Unit Type':WESTData[i].UnitType,
  	          		  'Manufacturer Date':WESTData[i].ManufDate,
  	          		  'User Status':WESTData[i].UserStatus,
  	          		  'Days in Current Status':WESTData[i].DaysInStatus,
  	          		  'Days in Depot':WESTData[i].DaysInDepo,
  		            });
  				}
  				tempData = [];
  		    	tempData = jQuery.grep(data.results, function(element, index){
  		            return (element.UserStatus == "WEST" && element.FlagCount == "X") ;
  		    	});
  		    	if(tempData.length >0){
  		    		RepairInv.push({
    	          		  'status': 'WEST',
    	            	  'countVal':tempData[0].Count,
    			    	});
  		    	}else{
  		    		RepairInv.push({
    	          		  'status': 'WEST',
    	            	  'countVal':0,
    			    	});
  		    	}
  		    	
  		    	/////////////////////////// AWAP /////////////////////////////////////////////  	    	
  		    	AWAPData = jQuery.grep(data.results, function(element, index){
  		            return (element.UserStatus == "AWAP" && element.FlagCount != "X");
  		    	});
  		    	//alert("AWAP Data "+ AWAPData.length);
  		    	for(var i = 0; i<AWAPData.length;i++){
  					
  					// Manufacturer Date
  					var vDocDateResult = AWAPData[i].ManufDate.split("(");
  		            var vDocDate = vDocDateResult[1].split(")");
  		            var vActualDate = new Date(Number(vDocDate[0]));
  		            var vformattedDocDate = dateFormat(new Date(Number(vDocDate[0])), 'mmm-yyyy',"UTC");
  		            //this is to check if the date is default 999 something show blank
  		            if (vformattedDocDate.substring(4) == "9999"){
  		            	AWAPData[i].ManufDate =  "-";
  		            	AWAPData[i]["ManufDateActual"] = vActualDate;
  		            }
  		            else{
  		            	AWAPData[i].ManufDate = vformattedDocDate;
  		            	AWAPData[i]["ManufDateActual"] = vActualDate;
  		            }
  		            jsonAWAP.push({
  	          		  'Unit Number':AWAPData[i].UnitNo,
  	          		  'Unit Type':AWAPData[i].UnitType,
  	          		  'Manufacturer Date':AWAPData[i].ManufDate,
  	          		  'User Status':AWAPData[i].UserStatus,
  	          		  'Days in Current Status':AWAPData[i].DaysInStatus,
  	          		  'Days in Depot':AWAPData[i].DaysInDepo,
  		            });
  				}
  				tempData = [];
  		    	tempData = jQuery.grep(data.results, function(element, index){
  		            return (element.UserStatus == "AWAP" && element.FlagCount == "X") ;
  		    	});
  		    	if(tempData.length >0){
  		    		RepairInv.push({
    	          		  'status': 'AWAP',
    	            	  'countVal':tempData[0].Count,
    			    	});
  		    	}else{
  		    		RepairInv.push({
    	          		  'status': 'AWAP',
    	            	  'countVal':0,
    			    	});
  		    	}
  		    	/////////////////////////// AUTH /////////////////////////////////////////////  	    	
  		    	AUTHData = jQuery.grep(data.results, function(element, index){
  		            return (element.UserStatus == "AUTH" && element.FlagCount != "X");
  		    	});
  		    	//alert("AUTH Data "+ AUTHData.length);
  		    	for(var i = 0; i<AUTHData.length;i++){
  					
  					// Manufacturer Date
  					var vDocDateResult = AUTHData[i].ManufDate.split("(");
  		            var vDocDate = vDocDateResult[1].split(")");
  		            var vActualDate = new Date(Number(vDocDate[0]));
  		            var vformattedDocDate = dateFormat(new Date(Number(vDocDate[0])), 'mmm-yyyy',"UTC");
  		            //this is to check if the date is default 999 something show blank
  		            if (vformattedDocDate.substring(4) == "9999"){
  		            	AUTHData[i].ManufDate =  "-";
  		            	AUTHData[i]["ManufDateActual"] = vActualDate;
  		            }
  		            else{
  		            	AUTHData[i].ManufDate = vformattedDocDate;
  		            	AUTHData[i]["ManufDateActual"] = vActualDate;
  		            }
  		            jsonAUTH.push({
  	          		  'Unit Number':AUTHData[i].UnitNo,
  	          		  'Unit Type':AUTHData[i].UnitType,
  	          		  'Manufacturer Date':AUTHData[i].ManufDate,
  	          		  'User Status':AUTHData[i].UserStatus,
  	          		  'Days in Current Status':AUTHData[i].DaysInStatus,
  	          		  'Days in Depot':AUTHData[i].DaysInDepo,
  		            });
  				}
  		    	tempData = [];
  		    	tempData = jQuery.grep(data.results, function(element, index){
  		            return (element.UserStatus == "AUTH" && element.FlagCount == "X");
  		    	});
  		    	if(tempData.length >0){
  		    		RepairInv.push({
    	          		  'status': 'AUTH',
    	            	  'countVal':tempData[0].Count,
    			    	});
  		    	}else{
  		    		RepairInv.push({
    	          		  'status': 'AUTH',
    	            	  'countVal':0,
    			    	});
  		    	}
  		    	
  				var oModelRepairInventory = new sap.ui.model.json.JSONModel();
  				oModelRepairInventory.setData(RepairInv);
  				if(sap.ui.getCore().byId("RepairInventoryGraph")){
  					var checkNoData = jQuery.grep(RepairInv, function(element, index){
  	  		            return ( element.countVal == 0 );
  	  		    	});
  					if(checkNoData.length!=3){
  						sap.ui.getCore().byId("repairDashViewAll").setVisible(true);
  						sap.ui.getCore().byId("RepairInventoryGraph").setModel(oModelRepairInventory);
  					}else
  						sap.ui.getCore().byId("repairDashViewAll").setVisible(false);
  						
  					sap.ui.getCore().byId("RepairDashNoData").setText("No data found for Repair Inventory");
  				}
  					
  				///////////////////////////// REPAIR INVENTORY Status ////////////////////////////////////////
  				RepairSTATUSData = jQuery.grep(data.results, function(element, index){
  		            return ( ($.inArray(element.UserStatus, ['WEST','AWAP','AUTH'])) != -1 && (element.FlagCount != "X") );
  		    	});
  				//alert("Repair Inventory Status Data "+ RepairSTATUSData.length);
  				
  		    	// EDI messages - SBMT FRST SCND ERRO
  				tempData = [];
  		    	tempData = jQuery.grep(data.results, function(element, index){
  		            return (element.UserStatus == "SBMT" && element.FlagPercent == "X");
  		    	});
  		    	if(tempData.length >0){
  		    		EDI.push({
    	          		  'status': 'Submitted',
    	            	  'countVal':tempData[0].Percent,
    			    	});
  		    	}else{
  		    		EDI.push({
    	          		  'status': 'Submitted',
    	            	  'countVal':0,
    			    	});
  		    	}
  		    	tempData = [];
  		    	tempData = jQuery.grep(data.results, function(element, index){
  		            return (element.UserStatus == "FRST" && element.FlagPercent == "X");
  		    	});
  		    	if(tempData.length >0){
  		    		EDI.push({
    	          		  'status': '1st Time Success',
    	            	  'countVal':tempData[0].Percent,
    			    	});
  		    	}else{
  		    		EDI.push({
    	          		  'status': '1st Time Success',
    	            	  'countVal':0,
    			    	});
  		    	}
  		    	tempData = [];
  		    	tempData = jQuery.grep(data.results, function(element, index){
  		            return (element.UserStatus == "SCND" && element.FlagPercent == "X");
  		    	});
  		    	if(tempData.length >0){
  		    		EDI.push({
    	          		  'status': '2nd Time Success',
    	            	  'countVal':tempData[0].Percent,
    			    	});
  		    	}else{
  		    		EDI.push({
    	          		  'status': '2nd Time Success',
    	            	  'countVal':0,
    			    	});
  		    	}
  		    	tempData = [];
  		    	tempData = jQuery.grep(data.results, function(element, index){
  		            return (element.UserStatus == "ERRO" && element.FlagPercent == "X");
  		    	});
  		    	if(tempData.length >0){
  		    		EDI.push({
    	          		  'status': 'Error',
    	            	  'countVal':tempData[0].Percent,
    			    	});
  		    	}else{
  		    		EDI.push({
    	          		  'status': 'Error',
    	            	  'countVal':0,
    			    	});
  		    	}
  		    	/*for(var i=0 ;i<tempData.length ;i++){
  		    		EDI.push({
  	          		  'status': tempData[0].UserStatus,
  	            	  'countVal':tempData[0].Percent,
  			    	});
  		    	}*/
  		    	//alert("EDI Chart results length : "+ EDI.length);
  				var oModelEDI = new sap.ui.model.json.JSONModel();
  				oModelEDI.setData(EDI);
  				if(sap.ui.getCore().byId("EDIGraph")){
  					var checkNoData = jQuery.grep(EDI, function(element, index){
  	  		            return ( element.countVal == 0 );
  	  		    	});
  					if(checkNoData.length!=4)
  						sap.ui.getCore().byId("EDIGraph").setModel(oModelEDI);
  					
  					sap.ui.getCore().byId("EDIDashNoData").setText("No data found for Performance by EDI Message Processing");
  				}
  				
  				// MNR messages -  ESTM  LEAS RPCM NAVL
  		    	tempData = [];
  		    	tempData = jQuery.grep(data.results, function(element, index){
  		            return (element.UserStatus == "ESTM" && element.FlagCount == "X");
  		    	});
  		    	if(tempData.length >0){
  		    		MNR.push({
    	          		  'status': 'Estimation Days',
    	            	  'countVal':tempData[0].Count,
    			    	});
  		    	}else{
  		    		MNR.push({
    	          		  'status': 'Estimation Days',
    	            	  'countVal':0,
    			    	});
  		    	}
  		    	tempData = [];
  		    	tempData = jQuery.grep(data.results, function(element, index){
  		            return (element.UserStatus == "LEAS" && element.FlagCount == "X") ;
  		    	});
  		    	if(tempData.length >0){
  		    		MNR.push({
    	          		  'status': 'Lessee Approval Days',
    	            	  'countVal':tempData[0].Count,
    			    	});
  		    	}else{
  		    		MNR.push({
    	          		  'status': 'Lessee Approval Days',
    	            	  'countVal':0,
    			    	});
  		    	}
  		    	tempData = [];
  		    	tempData = jQuery.grep(data.results, function(element, index){
  		            return (element.UserStatus == "RPCM" && element.FlagCount == "X") ;
  		    	});
  		    	if(tempData.length >0){
  		    		MNR.push({
    	          		  'status': 'Repair Completion',
    	            	  'countVal':tempData[0].Count,
    			    	});
  		    	}else{
  		    		MNR.push({
    	          		  'status': 'Repair Completion',
    	            	  'countVal':0,
    			    	});
  		    	}
  		    	tempData = [];
  		    	tempData = jQuery.grep(data.results, function(element, index){
  		            return (element.UserStatus == "NAVL" && element.FlagCount == "X");
  		    	});
  		    	if(tempData.length >0){
  		    		MNR.push({
    	          		  'status': 'Next Available Days',
    	            	  'countVal':tempData[0].Count,
    			    	});
  		    	}else{
  		    		MNR.push({
    	          		  'status': 'Next Available Days',
    	            	  'countVal':0,
    			    	});
  		    	}
  		    	/*for(var i=0 ;i<tempData.length ;i++){
  		    		MNR.push({
  	          		  'status': tempData[0].UserStatus,
  	            	  'countVal':tempData[0].Count,
  			    	});
  		    	}*/
  		    	//alert("MNR Chart results length : "+ MNR.length);
  		    	var oModelMNR = new sap.ui.model.json.JSONModel();
  				oModelMNR.setData(MNR);
  				if(sap.ui.getCore().byId("MNRGraph")){
  					var checkNoData = jQuery.grep(MNR, function(element, index){
  	  		            return ( element.countVal == 0 );
  	  		    	});
  					if(checkNoData.length!=4)
  						sap.ui.getCore().byId("MNRGraph").setModel(oModelMNR);
  					
  					sap.ui.getCore().byId("MNRDashNoData").setText("No data found for Performance by M & R");
  				}
  		    	depotDashboard.checkStatus();
  		    },
  		    function(err){
  		    	//busyDialog.close();
  		    	errorMsgDepotDashBoard[0]["status"] = "end";
  		    	errorMsgDepotDashBoard[0]["error"] = "true";
  		    	errorMsgDepotDashBoard[0]["msg"] = err.response.statusText;
  		    	errorMsgDepotDashBoard[0]["errorcode"] =err.response.statusCode;
  		    	errorMsgDepotDashBoard[0]["errorfunction"] = "bindChartData";
  		    	depotDashboard.checkStatus();
  		    });
	},
	
	bindReleaseTableData:function(){
		errorMsgDepotDashBoard[1]["status"] = "start";
		ActiveReleaseDatDash=[];
	    ActiveReleaseTop5=[];
		//var depotCode = "9514";
		//var split = depotIdDashBoardKey.split("-");
		var depotCode = depotIdDashBoard; //split[split.length - 1];
		var filter = "/Release_Authorization?$filter=DepotNumber eq '"+depotCode+"'";
		
		//alert("Str : "+ serviceUrl + filter);
		oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
  		OData.request({ 
  		      requestUri: serviceUrl + filter,
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
  		    	errorMsgDepotDashBoard[1]["status"] = "end";
  		    	ActiveReleaseDatDash = data.results;
  		    	//alert("Active Release results length : "+ ActiveReleaseDat.length);
  		    	var strNoDataTbl = '<div class="sapUiTableCtrlEmpty custTblBgColor" tabindex="0"><span id="idspnNodataDDBActRel"'
	  		    strNoDataTbl += 'class="sapUiLbl custTblBgColor sapUiTableCtrlEmptyMsg">No data found for Active Releases - Top 5</span></div>'
	  		    sap.ui.getCore().byId('idhtmlNoDataActRelDDB').setContent(strNoDataTbl);
  		    	
  		    	for(var i=0; i< ActiveReleaseDatDash.length;i++){
  		    		// Expiry Date
	    			var vDocDateResult = ActiveReleaseDatDash[i].ExpDate.split("(");
                    var vDocDate = vDocDateResult[1].split(")");
                    var vActualDate = new Date(Number(vDocDate[0]));
                    var vformattedDocDate = dateFormat(new Date(Number(vDocDate[0])), 'dd-mm-yyyy',"UTC");
                    //this is to check if the date is default 999 something show blank
                    if (vformattedDocDate.substring(6) == "9999"){
                    	ActiveReleaseDatDash[i].ExpDate =  "-";
                    	ActiveReleaseDatDash[i]["ExpDateActual"] = vActualDate;
                    }
                    else{
                    	ActiveReleaseDatDash[i].ExpDate = vformattedDocDate;
                    	ActiveReleaseDatDash[i]["ExpDateActual"] = vActualDate;
                    }
  	  		    }
  		    	if(ActiveReleaseDatDash.length>5){
  		    		for(var i=0;i<5;i++){
  		    			ActiveReleaseTop5[i] = ActiveReleaseDatDash[i];
  		    		}
  		    		if(sap.ui.getCore().byId("ActiveReleaseTblDASH")){
  		    			sap.ui.getCore().byId("ActiveReleaseTblDASH").setVisibleRowCount(5);
  	  		    		sap.ui.getCore().byId("relDashViewAll").setVisible(true);
  	  		    		//sap.ui.getCore().byId("RelDashNoData").setText("No data found for Active Releases - Top 5");
  		    		}
  		    		
  		    	}else{
  		    		ActiveReleaseTop5 = ActiveReleaseDatDash;
  		    		if(sap.ui.getCore().byId("ActiveReleaseTblDASH")){
  		    			sap.ui.getCore().byId("ActiveReleaseTblDASH").setVisibleRowCount(5);
  	  		    		sap.ui.getCore().byId("relDashViewAll").setVisible(false);
  	  		    	    //sap.ui.getCore().byId("RelDashNoData").setText("No data found for Active Releases - Top 5");
  		    		}
  		    	}
  		    	
  		    	
  		    	var oModelActiveRelease = new sap.ui.model.json.JSONModel();
  		    	oModelActiveRelease.setData(ActiveReleaseTop5);
  				var oReleaseTable = sap.ui.getCore().byId("ActiveReleaseTblDASH");
  				if(oReleaseTable){
  					oReleaseTable.setModel(oModelActiveRelease);
  	  				oReleaseTable.bindRows("/");
  				}
  		    	depotDashboard.checkStatus();
  		    },
  		    function(err){
  		    	//busyDialog.close();
  		    	//alert("Error while reading Release Table Data : "+window.JSON.stringify(err.response));
  		    	errorMsgDepotDashBoard[1]["status"] = "end";
  		    	errorMsgDepotDashBoard[1]["error"] = "true";
  		    	errorMsgDepotDashBoard[1]["msg"] = err.response.statusText;
  		    	errorMsgDepotDashBoard[1]["errorcode"] =err.response.statusCode;
  		    	errorMsgDepotDashBoard[1]["errorfunction"] = "bindReleaseTableData";
  		    	depotDashboard.checkStatus();
  		    });
	},
	
	bindReturnTableData:function(){
		errorMsgDepotDashBoard[2]["status"] = "start";
		//var split = depotIdDashBoardKey.split("-");
		var depotCode = depotIdDashBoard; //split[split.length - 1];
		var filter = "/Return_Authorization?$filter=DepotNumber eq '"+depotCode+"'";
		ActiveReturnDatDash=[];
	    ActiveReturnTop5=[];
	    	
		//alert("Str : "+ serviceUrl + filter);
		oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
  		OData.request({ 
  		      requestUri: serviceUrl + filter,
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
  		    	
  		    	var strNoDataTbl = '<div class="sapUiTableCtrlEmpty custTblBgColor" tabindex="0"><span id="idspnNodataDDBActRet"'
  		  		strNoDataTbl += 'class="sapUiLbl custTblBgColor sapUiTableCtrlEmptyMsg">No data found for Active Returns - Top 5</span></div>'
  		  		sap.ui.getCore().byId('idhtmlNoDataActRetDDB').setContent(strNoDataTbl);
  		    	
  		    	errorMsgDepotDashBoard[2]["status"] = "end";
  		    	ActiveReturnDatDash = data.results;
  		    	//alert("Active Returns results length : "+ ActiveReturn.length);

  		    	for(var i=0; i< ActiveReturnDatDash.length;i++){
  		    		// Expiry Date
	    			var vDocDateResult = ActiveReturnDatDash[i].ExpDate.split("(");
                    var vDocDate = vDocDateResult[1].split(")");
                    var vActualDate = new Date(Number(vDocDate[0]));
                    var vformattedDocDate = dateFormat(new Date(Number(vDocDate[0])), 'dd-mm-yyyy',"UTC");
                    //this is to check if the date is default 999 something show blank
                    if (vformattedDocDate.substring(6) == "9999"){
                    	ActiveReturnDatDash[i].ExpDate =  "-";
                    	ActiveReturnDatDash[i]["ExpDateActual"]  = vActualDate;
                    }
                    else{
                    	ActiveReturnDatDash[i].ExpDate = vformattedDocDate;
                    	ActiveReturnDatDash[i]["ExpDateActual"] = vActualDate;
                    }
  	  		    }
  		    	if(ActiveReturnDatDash.length>5){
  		    		for(var i=0;i<5;i++){
  		    			ActiveReturnTop5[i] = ActiveReturnDatDash[i];
  		    		}
  		    		if(sap.ui.getCore().byId("ActiveReturnsTbl")){
  		    			sap.ui.getCore().byId("ActiveReturnsTbl").setVisibleRowCount(5);
  	  		    		sap.ui.getCore().byId("retDashViewAll").setVisible(true);
  	  		    		//sap.ui.getCore().byId("RetDashNoData").setText("No data found for Active Returns - Top 5");
  		    		}
  		    		
  		    	}else{
  		    		ActiveReturnTop5 = ActiveReturnDatDash;
  		    		if(sap.ui.getCore().byId("ActiveReturnsTbl")){
  		    			sap.ui.getCore().byId("ActiveReturnsTbl").setVisibleRowCount(5);
  	  		    		sap.ui.getCore().byId("retDashViewAll").setVisible(false);
  	  		    		//sap.ui.getCore().byId("RetDashNoData").setText("No data found for Active Returns - Top 5");
  		    		}
  		    		
  		    	}
  		    	
  		    	
  		    	var oModelActiveReturns = new sap.ui.model.json.JSONModel();
  				oModelActiveReturns.setData(ActiveReturnTop5);
  				var oReturnsTable = sap.ui.getCore().byId("ActiveReturnsTbl");
  				
  				if(oReturnsTable){
  					oReturnsTable.setModel(oModelActiveReturns);
  	  				oReturnsTable.bindRows("/");
  				}
  				depotDashboard.checkStatus();
  		    },
  		    function(err){
  		    	errorMsgDepotDashBoard[2]["status"] = "end";
  		    	errorMsgDepotDashBoard[2]["error"] = "true";
  		    	errorMsgDepotDashBoard[2]["msg"] = err.response.statusText;
  		    	errorMsgDepotDashBoard[2]["errorcode"] =err.response.statusCode;
  		    	errorMsgDepotDashBoard[2]["errorfunction"] = "bindReturnTableData";
  		    	depotDashboard.checkStatus();
  		    });
	},
	
	checkStatus:function(){
		
		if((errorMsgDepotDashBoard[0]["status"] == "end") && (errorMsgDepotDashBoard[1]["status"] == "end") && 	(errorMsgDepotDashBoard[2]["status"] == "end") )
				{	
					busyDialog.close();
					var msgToDisplay = "The following information could not be retreived:", errortrue = "false";
					
					if(errorMsgDepotDashBoard[0]["error"] == "true"){
						errortrue = "true";
						msgToDisplay += "\n" + "On-Hire / Off-Hire or Performance Charts ";
						
						sap.ui.getCore().byId("DepotDashNoData").setText("No data found for Depot Inventory");
						sap.ui.getCore().byId("RepairDashNoData").setText("No data found for Repair Inventory");
						sap.ui.getCore().byId("MNRDashNoData").setText("No data found for Performance by M & R");
						sap.ui.getCore().byId("EDIDashNoData").setText("No data found for Performance by EDI Message Processing");
					}
					if(errorMsgDepotDashBoard[1]["error"] == "true"){
						errortrue = "true";
						msgToDisplay += "\n" + "My Active Releases";
						var strNoDataTbl = '<div class="sapUiTableCtrlEmpty custTblBgColor" tabindex="0"><span id="idspnNodataDDBActRel"'
				  		strNoDataTbl += 'class="sapUiLbl custTblBgColor sapUiTableCtrlEmptyMsg">No data found for Active Releases - Top 5</span></div>'
				  		sap.ui.getCore().byId('idhtmlNoDataActRelDDB').setContent(strNoDataTbl);
					}
					if(errorMsgDepotDashBoard[2]["error"] == "true"){
						errortrue = "true";
						msgToDisplay += "\n" + "My Active Returns" ;
						var strNoDataTbl = '<div class="sapUiTableCtrlEmpty custTblBgColor" tabindex="0"><span id="idspnNodataDDBActRet"'
			  		  	strNoDataTbl += 'class="sapUiLbl custTblBgColor sapUiTableCtrlEmptyMsg">No data found for Active Returns - Top 5</span></div>'
			  		  	sap.ui.getCore().byId('idhtmlNoDataActRetDDB').setContent(strNoDataTbl);
					}
					msgToDisplay += "\n at this time. Please try again later.";
					if(errortrue == "true"){
						sap.ui.commons.MessageBox.alert(msgToDisplay);
					}else{
						//sap.ui.commons.MessageBox.alert("Success");
					}
				}
		
		
		
		if(chartStatus && relTableStatus && retTableStatus){
			busyDialog.close();
			if( chartEStatus && relTableEStatus && retTableEStatus){
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
				
		}
	},
	
	callDepotPopup:function(){
		depotDashboard = this;
		var oDepotDashboardFlex;
		
		var uType = new loggedInU().getLoggedInUserType();
		if(($.inArray(uType, ["SEACO"])) != -1  ){ // if Seaco User
			var ochngCust = new ChangDepotCode();
			ochngCust.changeDepot();
			oDepotDashboardFlex = new sap.m.FlexBox("DepotDashboardFlex",{
				  items: [ ],
				  direction: "Column",
				 // width:"80%"
			});
		}else{
			busyDialog.open();
			depotDashboard.createDepotDashboard();
			depotDashboard.resetDepotDashboard();
			oDepotDashboardFlex = sap.ui.getCore().byId("DepotDashboardFlex");
		}
		
		return oDepotDashboardFlex;
		
	},
	
	resetDepotDashboard:function(){
		  
		  var page = sap.ui.getCore().byId("depotDashPage");
		  if(page){
			  page.removeAllContent();
			  depotDashboard.destroyDepotDashboard();
			  page.addContent(depotDashboard.createDepotDashboard());
		  }
		  
		  errorMsgDepotDashBoard = [];
		  errorMsgDepotDashBoard.push({"task": "chart","status":"end","error":"false","errorcode":"","msg":"","errorfunction":""});
		  errorMsgDepotDashBoard.push({"task": "release","status":"end","error":"false","errorcode":"","msg":"","errorfunction":""});
		  errorMsgDepotDashBoard.push({"task": "return","status":"end","error":"false","errorcode":"","msg":"","errorfunction":""});
		  
		  
		  var screenAccessRoleWise = new loggedInU().filterLoggedInUserData("SCREEN");
		  var chart = jQuery.grep(screenAccessRoleWise, function(element, index){
	            return ( ($.inArray(element.ScrView, ["depot_inventory","depot_inventory",'edi',"mnr"])) != -1 );
	      });
		  
		  var returns = jQuery.grep(screenAccessRoleWise, function(element, index){
	            return ( ($.inArray(element.ScrView, ["active_returns"])) != -1 );
	      });
		  
		  var releases = jQuery.grep(screenAccessRoleWise, function(element, index){
	            return ( ($.inArray(element.ScrView, ["active_releases"])) != -1 );
	      });
		  
		  if(chart.length > 0  ){
			  depotDashboard.bindChartData(); 
		  }
		  if(releases.length > 0){
			  depotDashboard.bindReleaseTableData();
		  }
		  if(returns.length > 0){
			  depotDashboard.bindReturnTableData();
		  }
		  
	},
	
	destroyDepotDashboard:function(){
		if(sap.ui.getCore().byId("DepotDashboardFlex")){
			sap.ui.getCore().byId("DepotDashboardFlex").destroy();
		}
	},
	
	createDepotDashboard: function(){
		var allowDepotChange = true;
		
		var uType = new loggedInU().getLoggedInUserType();
		if(($.inArray(uType, ["SEACO"])) != -1  )
			allowDepotChange = true;
		else
			allowDepotChange = false;
		
		var depotdashBoardItems;
		
		var createDepotDashboard = new CreateDashboard();
		depotdashBoardItems = createDepotDashboard.createDepotDashboard();
		createDepotDashboard.checkRole();
		
		var labDepotID =  new sap.ui.commons.Label({text:"Depot ID:",
			layoutData: new sap.ui.layout.GridData({span: "L1 M2 S3",linebreak: true, margin: false}),
			wrapping: true,
		}).addStyleClass("marginTop5");
		
		var txtDepotId = new sap.ui.commons.Label("depotDashDepotID",{
			layoutData: new sap.ui.layout.GridData({span: "L4 M6 S8",linebreak: false, margin: false}),
			wrapping: true,
			text:depotSelected,
		}).addStyleClass("marginTop5");
		
		var lnkChangeDepot = new sap.m.Link({text:"Change",
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: false}),
			
			press:function(oEvent){ 
				var ochngCust = new ChangDepotCode();
				ochngCust.changeDepot();
		   }
		}).addStyleClass("marginTop5");
		
		
		var oDepotChangeDepotLayout = new sap.ui.layout.form.ResponsiveGridLayout();
		var oDepotChangeDepotForm = new sap.ui.layout.form.Form("DepotDashboardFormDepot",{
				layout: oDepotChangeDepotLayout,
				formContainers: [
					new sap.ui.layout.form.FormContainer("DepotDashboardDepotChange",{
						formElements: [
							new sap.ui.layout.form.FormElement({
								fields: [labDepotID, txtDepotId,lnkChangeDepot],
							})
						],
						visible:allowDepotChange
					})
				]
		 });
			 
		 var oDepotDashboardFlex = new sap.m.FlexBox("DepotDashboardFlex",{
			  items: [oDepotChangeDepotForm, depotdashBoardItems ],
			  direction: "Column",
		});
		
		return oDepotDashboardFlex;
	},
	
	destroyAndCreateDepotDashboard:function(){
		if(sap.ui.getCore().byId("DepotDashboardFlex")){
			sap.ui.getCore().byId("DepotDashboardFlex").destroyItems();
		}
		
		var allowDepotChange = true;
		
		var uType = new loggedInU().getLoggedInUserType();
		if(($.inArray(uType, ["SEACO"])) != -1  )
			allowDepotChange = true;
		else
			allowDepotChange = false;
		
		var depotdashBoardItems;
		
		var createDepotDashboard = new CreateDashboard();
		depotdashBoardItems = createDepotDashboard.createDepotDashboard();
		createDepotDashboard.checkRole();
		
		var labDepotID =  new sap.ui.commons.Label({text:"Depot ID:",
			layoutData: new sap.ui.layout.GridData({span: "L1 M2 S3",linebreak: true, margin: false}),
			wrapping: true,
		}).addStyleClass("marginTop5");
		
		var txtDepotId = new sap.ui.commons.Label("depotDashDepotID",{
			layoutData: new sap.ui.layout.GridData({span: "L4 M6 S8",linebreak: false, margin: false}),
			wrapping: true,
			text:depotSelected,
		}).addStyleClass("marginTop5");
		
		var lnkChangeDepot = new sap.m.Link({text:"Change",
			layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: false}),
			
			press:function(oEvent){ 
				var showTempLabel = true;
				
				if($.inArray(loggedInUser, ['depotManager','depotUser']) != -1 ){
					showTempLabel = true;
				}else{
					showTempLabel = false;
				}
				var ochngCust = new ChangDepotCode();
				ochngCust.changeDepot(showTempLabel);
		   }
		}).addStyleClass("marginTop5");
		
		
		var oDepotChangeDepotLayout = new sap.ui.layout.form.ResponsiveGridLayout();
		var oDepotChangeDepotForm = new sap.ui.layout.form.Form("DepotDashboardFormDepot",{
				layout: oDepotChangeDepotLayout,
				formContainers: [
					new sap.ui.layout.form.FormContainer("DepotDashboardDepotChange",{
						formElements: [
							new sap.ui.layout.form.FormElement({
								fields: [labDepotID, txtDepotId,lnkChangeDepot],
							})
						],
						visible:allowDepotChange
					})
				]
		 });
			 
		 var oDepotDashboardFlex = sap.ui.getCore().byId("DepotDashboardFlex");
		 oDepotDashboardFlex.addItem(oDepotChangeDepotForm);
		 oDepotDashboardFlex.addItem(depotdashBoardItems);
	}
});



/******** NP *******/
/*
 **$*$------------------------------------------------------------------------*
 *$*$ Modified By : Seyed Ismail MAC
 *$*$ Modified On : 28.05.2015
 *$*$ Reference   : RTS 1182
 *$*$ Transport   : CGWK900972
 *$*$ Tag         : MAC28052015
 *$*$ Purpose     : * Include Responsibility Code - V
 * Make Responsibility Code - V and J - available only for Joint Survey
 *$*$---------------------------------------------------------------------
 */
/*
 **$*$------------------------------------------------------------------------*
 *$*$ Modified By : Seyed Ismail MAC
 *$*$ Modified On : 01.02.2016
 *$*$ Reference   : RTS 1387
 *$*$ Transport   : CGWK901161
 *$*$ Tag         : MAC01022016
 *$*$ Purpose     : To get the open task items using the serial number and auto populate them in the repair lines
 *$*$---------------------------------------------------------------------
 */
/* MACALPHA19032018 - Changes done by Seyed Ismail on 19.03.2018 for Alpha Changes
1. Remove Unit Part Code information MACALPHA19032018_1
2. Add Lessor Survey and remove additional, superseding, pre sales, pre delivery MACALPHA19032018_2
3. Remove sale grade and add CW & Notes field MACALPHA19032018_3
4. Get the latest work order detail from SAP MACALPHA19032018_4
5. Show Labour Rate on screen MACALPHA19032018_5
6. Remove unwanted responsibility codes MACALPHA19032018_6
7. Repair Completion Page changes MACALPHA19032018_7
8. a. One submission for both carcass and machinary MACALPHA19032018_8
   b.Load saved estimates MACALPHA19032018_8
9. One print/excel button MACALPHA19032018_9
10. Differentiate original/JS/LS MACALPHA19032018_10
11. Remove unwanted fields - Lessee Approval MACALPHA19032018_11
12. Add new message types in EDI Log - MACALPHA19032018_12
*/
jQuery.sap.require("sap.ui.model.json.JSONModel");

var globalSCRLimit = "";
var globalLatestJobType = ""; // MACALPHA19032018_4
var jsnReqQueueREOnline = [];
var hdrJsnDataREEntryJ = [];
//var lineItemJsnDataREEntryJ = [];
var saveLineItemREEntryJ = [],
  saveLineItemRJSREEntryJ = [];;
var glblJsonDDLREEntryJ = [];
glblJsonDDLREEntryJ.section = [];
glblJsonDDLREEntryJ.damagecode = [];
glblJsonDDLREEntryJ.responsibility = [];
glblJsonDDLREEntryJ.matrialcode = [];
var oMdlGlblDDLREEntryJ = new sap.ui.model.json.JSONModel();
oMdlGlblDDLREEntryJ.setData(glblJsonDDLREEntryJ);
var oItmTmpltGlblDDLREEntryJ = new sap.ui.core.ListItem();
oItmTmpltGlblDDLREEntryJ.bindProperty("text", "text");
oItmTmpltGlblDDLREEntryJ.bindProperty("key", "key");
var estmtIdRJS = '';
var jointtypeSel = false;
var bulletinValues = [];
var bulletinValuesM = [];
var depotCurr = "";
var fixedLabourRate = "";
var locationCodes = [];
var materialCodes = [];
var componentCodes = [];
var repairCodes = [];
var damageCodes = [];
var repdamCodes = [];

var locationSource = [];
var componentSource = [];
var repairSource = [];
var damageSource = [];
var materialSource = [];
var globalJSPart = "";
var globalJSError = false;
jsnReqQueueREOnline.resetfield = function() {
    this.length = 0;
    this.push({
      "task": "section",
      "status": "end",
      "error": "false",
      "errorcode": "",
      "msg": "",
      "errorfunction": ""
    });
    this.push({
      "task": "damagecode",
      "status": "end",
      "error": "false",
      "errorcode": "",
      "msg": "",
      "errorfunction": ""
    });
    this.push({
      "task": "respnsibility",
      "status": "end",
      "error": "false",
      "errorcode": "",
      "msg": "",
      "errorfunction": ""
    });
    this.push({
      "task": "header",
      "status": "end",
      "error": "false",
      "errorcode": "",
      "msg": "",
      "errorfunction": ""
    });
    this.push({
      "task": "lineitem",
      "status": "end",
      "error": "false",
      "errorcode": "",
      "msg": "",
      "errorfunction": ""
    });
    this.push({
      "task": "materialcode",
      "status": "end",
      "error": "false",
      "errorcode": "",
      "msg": "",
      "errorfunction": ""
    });
  },

  sap.ui.model.json.JSONModel.extend("RepairEstimateOnlineJ", {
    //VALIDATE UNIT NO AND DEPOT ONLINE
    onlinesuccessValidUnitDepot: function(resultdata, response) {
      busyDialog.close();
      if (resultdata != undefined) {
        var idSerailNoRESearchJ = sap.ui.getCore().byId("idSerailNoRESearchJ");
        var odepoRESearchJ = sap.ui.getCore().byId("idComboDepotRESearchJ");

        if (resultdata.results.length > 0) {
          if (resultdata.results[0].Message.substr(0, 5) == "Valid") {

            /* Begin of adding by Seyed Ismail MACALPHA19032018_4 */
            var validSplit = resultdata.results[0].Message.split('$');
            globalSCRLimit = validSplit[3];

            globalLatestJobType = "Original"; // 	resultdata.results[0].JobType
            globalLabCostC = globalLabCostCFromValidate = resultdata.results[0].Labc;
            globalLabCostM = globalLabCostMFromValidate = resultdata.results[0].Labr;
            globalEstimateIsReefer = (resultdata.results[0].Isreefer == "X") ? true : false;
            globalLabCostCurrency = resultdata.results[0].Message.substr(6, 3);
            /* End of adding by Seyed Ismail MACALPHA19032018_4 */
            /* Begin of adding by Seyed Ismail on 01.02.2016 MAC01022016 */

            bulletinValues = [];
            bulletinValuesM = [];
            var urlToCallOpentaskitems = serviceUrl15_old + "/get_Opentaskitems?";
            urlToCallOpentaskitems += "$filter=Serial eq '" + idSerailNoRESearchJ.getValue().toUpperCase() + "'";
            busyDialog.open();
            oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
            OData.request({
                requestUri: urlToCallOpentaskitems,
                method: "GET",
                dataType: 'json',
                headers: {
                  "X-Requested-With": "XMLHttpRequest",
                  "Content-Type": "application/json; charset=utf-8",
                  "DataServiceVersion": "2.0",
                  "X-CSRF-Token": "Fetch"
                }
              },
              function(data, response) {
                busyDialog.close();
                bulletinValues = [];
                bulletinValuesM = [];
                for (var j = 0; j < data.results.length; j++) {
                  if(data.results[j].UnitPartcode == "C"){
                	  bulletinValues.push({
                          "bulletin": data.results[j].Ltxa1
                        });
                  }else if(data.results[j].UnitPartcode == "M"){
                	  bulletinValuesM.push({
                          "bulletin": data.results[j].Ltxa1
                        });
                  }
                }





                var urlToCallIsocodes = serviceUrl15_old + "/get_Isocodes?";
                //urlToCallIsocodes += "$filter=Serial eq '" + idSerailNoRESearchJ.getValue().toUpperCase() + "'";
                busyDialog.open();
                oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
                OData.request({
                    requestUri: urlToCallIsocodes,
                    method: "GET",
                    dataType: 'json',
                    headers: {
                      "X-Requested-With": "XMLHttpRequest",
                      "Content-Type": "application/json; charset=utf-8",
                      "DataServiceVersion": "2.0",
                      "X-CSRF-Token": "Fetch"
                    }
                  },
                  function(data, response) {
                    busyDialog.close();

                    materialCodes = [];
                    materialSource = [];
                    materialSource.push("");

                    locationCodes = [];
                    locationSource = [];
                    locationSource.push("");

                    componentCodes = [];
                    componentSource = [];
                    componentSource.push("");

                    repairCodes = [];
                    repairSource = [];
                    repairSource.push("");

                    damageCodes = [];
                    damageSource = [];
                    damageSource.push("");


                    for (var j = 0; j < data.results.length; j++) {
                      if (data.results[j].Type == "LOCATION") {
                        locationCodes.push({
                          "location": data.results[j].Value,
                          "locKey": data.results[j].Value.split("-")[0]
                        });
                        locationSource.push(data.results[j].Value.split("-")[0]);
                      } else if (data.results[j].Type == "COMPONENT") {
                        componentCodes.push({
                          "component": data.results[j].Value,
                          "comKey": data.results[j].Value.split("-")[0]
                        });
                        componentSource.push(data.results[j].Value.split("-")[0]);
                      } else if (data.results[j].Type == "REPAIR") {
                        repairCodes.push({
                          "repair": data.results[j].Value,
                          "repKey": data.results[j].Value.split("-")[0]
                        });
                        repairSource.push(data.results[j].Value.split("-")[0]);
                      } else if (data.results[j].Type == "DAMAGE") {
                        damageCodes.push({
                          "damage": data.results[j].Value,
                          "damKey": data.results[j].Value.split("-")[0]
                        });
                        damageSource.push(data.results[j].Value.split("-")[0]);
                      } else if (data.results[j].Type == "REPDAM") {
                        repdamCodes.push({
                          "rep": data.results[j].Value1,
                          "repKey": data.results[j].Value1.split("-")[0],
                          "dam": data.results[j].Value,
                          "damKey": data.results[j].Value.split("-")[0],
                        });
                      } else if (data.results[j].Type == "MATERIAL") {
                        materialCodes.push({
                          "material": data.results[j].Value,
                          "matKey": data.results[j].Value.split("-")[0]
                        });
                        materialSource.push(data.results[j].Value.split("-")[0]);
                      }
                    }
                    depotCurr = resultdata.results[0].Message.substr(6, 3);
                    fixedLabourRate = resultdata.results[0].Message.substr(10, (resultdata.results[0].Message.length));
                    objcurntRESearchJ.openScreenREEntryJ(idSerailNoRESearchJ.getValue().toUpperCase(), odepoRESearchJ.getSelectedKey(), odepoRESearchJ.getValue(), depotCurr, fixedLabourRate, upc);

                    /* Reset Date and other fields to default */

                    var todays = new Date();

                    // This month's date
                    var thisDate = todays.getDate();
                    if (thisDate < 10) {
                      thisDate = '0' + thisDate;
                    }


                    //This month's month
                    var thisMonth = todays.getMonth();
                    thisMonth = thisMonth + 1;

                    var thisMonths;
                    if (thisMonth < 10) {
                      thisMonths = '0' + thisMonth;
                    } else {
                      thisMonths = thisMonth;
                    }

                    //This month's year
                    var thisYear = todays.getFullYear();

                    var thisValue = String(thisYear) + String(thisMonths) + String(thisDate);
                    sap.ui.getCore().byId("idDtPkrEstimateDtREEntryJ").setYyyymmdd(thisValue);
                    sap.ui.getCore().byId("idDdlJobTypeREEntryJ").setSelectedKey("");
                    sap.ui.getCore().byId("idDdlSaleGradeREEntryJ").setSelectedKey("");
                  },
                  function(err) {
                    depotCurr = resultdata.results[0].Message.substr(6, 3);
                    fixedLabourRate = resultdata.results[0].Message.substr(10, (resultdata.results[0].Message.length));
                    objcurntRESearchJ.openScreenREEntryJ(idSerailNoRESearchJ.getValue().toUpperCase(), odepoRESearchJ.getSelectedKey(), odepoRESearchJ.getValue(), depotCurr, fixedLabourRate, upc);

                    /* Reset Date and other fields to default */

                    var todays = new Date();

                    // This month's date
                    var thisDate = todays.getDate();
                    if (thisDate < 10) {
                      thisDate = '0' + thisDate;
                    }


                    //This month's month
                    var thisMonth = todays.getMonth();
                    thisMonth = thisMonth + 1;

                    var thisMonths;
                    if (thisMonth < 10) {
                      thisMonths = '0' + thisMonth;
                    } else {
                      thisMonths = thisMonth;
                    }

                    //This month's year
                    var thisYear = todays.getFullYear();

                    var thisValue = String(thisYear) + String(thisMonths) + String(thisDate);
                    sap.ui.getCore().byId("idDtPkrEstimateDtREEntryJ").setYyyymmdd(thisValue);
                    sap.ui.getCore().byId("idDdlJobTypeREEntryJ").setSelectedKey("");
                    sap.ui.getCore().byId("idDdlSaleGradeREEntryJ").setSelectedKey("");
                    //errorfunc(err);
                    //alert("Error while Reading Result : "+ window.JSON.stringify(err.response));
                    //return oFlexboxError;
                  });
              },
              function(err) {



                var urlToCallIsocodes = serviceUrl15_old + "/get_Isocodes?";
                //urlToCallIsocodes += "$filter=Serial eq '" + idSerailNoRESearchJ.getValue().toUpperCase() + "'";
                busyDialog.open();
                oModel = new sap.ui.model.odata.ODataModel(serviceUrl, true);
                OData.request({
                    requestUri: urlToCallIsocodes,
                    method: "GET",
                    dataType: 'json',
                    headers: {
                      "X-Requested-With": "XMLHttpRequest",
                      "Content-Type": "application/json; charset=utf-8",
                      "DataServiceVersion": "2.0",
                      "X-CSRF-Token": "Fetch"
                    }
                  },
                  function(data, response) {
                    busyDialog.close();

                    materialCodes = [];
                    materialSource = [];
                    materialSource.push("");

                    locationCodes = [];
                    locationSource = [];
                    locationSource.push("");

                    componentCodes = [];
                    componentSource = [];
                    componentSource.push("");

                    repairCodes = [];
                    repairSource = [];
                    repairSource.push("");

                    damageCodes = [];
                    damageSource = [];
                    damageSource.push("");


                    for (var j = 0; j < data.results.length; j++) {
                      if (data.results[j].Type == "LOCATION") {
                        locationCodes.push({
                          "location": data.results[j].Value,
                          "locKey": data.results[j].Value.split("-")[0]
                        });
                        locationSource.push(data.results[j].Value.split("-")[0]);
                      } else if (data.results[j].Type == "COMPONENT") {
                        componentCodes.push({
                          "component": data.results[j].Value,
                          "comKey": data.results[j].Value.split("-")[0]
                        });
                        componentSource.push(data.results[j].Value.split("-")[0]);
                      } else if (data.results[j].Type == "REPAIR") {
                        repairCodes.push({
                          "repair": data.results[j].Value,
                          "repKey": data.results[j].Value.split("-")[0]
                        });
                        repairSource.push(data.results[j].Value.split("-")[0]);
                      } else if (data.results[j].Type == "DAMAGE") {
                        damageCodes.push({
                          "damage": data.results[j].Value,
                          "damKey": data.results[j].Value.split("-")[0]
                        });
                        damageSource.push(data.results[j].Value.split("-")[0]);
                      } else if (data.results[j].Type == "REPDAM") {
                        repdamCodes.push({
                          "rep": data.results[j].Value1,
                          "repKey": data.results[j].Value1.split("-")[0],
                          "dam": data.results[j].Value,
                          "damKey": data.results[j].Value.split("-")[0],
                        });
                      } else if (data.results[j].Type == "MATERIAL") {
                        materialCodes.push({
                          "material": data.results[j].Value,
                          "matKey": data.results[j].Value.split("-")[0]
                        });
                        materialSource.push(data.results[j].Value.split("-")[0]);
                      }
                    }
                    depotCurr = resultdata.results[0].Message.substr(6, 3);
                    fixedLabourRate = resultdata.results[0].Message.substr(10, (resultdata.results[0].Message.length));
                    objcurntRESearchJ.openScreenREEntryJ(idSerailNoRESearchJ.getValue().toUpperCase(), odepoRESearchJ.getSelectedKey(), odepoRESearchJ.getValue(), depotCurr, fixedLabourRate, upc);

                    /* Reset Date and other fields to default */

                    var todays = new Date();

                    // This month's date
                    var thisDate = todays.getDate();
                    if (thisDate < 10) {
                      thisDate = '0' + thisDate;
                    }


                    //This month's month
                    var thisMonth = todays.getMonth();
                    thisMonth = thisMonth + 1;

                    var thisMonths;
                    if (thisMonth < 10) {
                      thisMonths = '0' + thisMonth;
                    } else {
                      thisMonths = thisMonth;
                    }

                    //This month's year
                    var thisYear = todays.getFullYear();

                    var thisValue = String(thisYear) + String(thisMonths) + String(thisDate);
                    sap.ui.getCore().byId("idDtPkrEstimateDtREEntryJ").setYyyymmdd(thisValue);
                    sap.ui.getCore().byId("idDdlJobTypeREEntryJ").setSelectedKey("");
                    sap.ui.getCore().byId("idDdlSaleGradeREEntryJ").setSelectedKey("");

                  },
                  function(err) {
                    busyDialog.close();
                    depotCurr = resultdata.results[0].Message.substr(6, 3);
                    fixedLabourRate = resultdata.results[0].Message.substr(10, (resultdata.results[0].Message.length));
                    objcurntRESearchJ.openScreenREEntryJ(idSerailNoRESearchJ.getValue().toUpperCase(), odepoRESearchJ.getSelectedKey(), odepoRESearchJ.getValue(), depotCurr, fixedLabourRate, upc);

                    /* Reset Date and other fields to default */

                    var todays = new Date();

                    // This month's date
                    var thisDate = todays.getDate();
                    if (thisDate < 10) {
                      thisDate = '0' + thisDate;
                    }


                    //This month's month
                    var thisMonth = todays.getMonth();
                    thisMonth = thisMonth + 1;

                    var thisMonths;
                    if (thisMonth < 10) {
                      thisMonths = '0' + thisMonth;
                    } else {
                      thisMonths = thisMonth;
                    }

                    //This month's year
                    var thisYear = todays.getFullYear();

                    var thisValue = String(thisYear) + String(thisMonths) + String(thisDate);
                    sap.ui.getCore().byId("idDtPkrEstimateDtREEntryJ").setYyyymmdd(thisValue);
                    sap.ui.getCore().byId("idDdlJobTypeREEntryJ").setSelectedKey("");
                    sap.ui.getCore().byId("idDdlSaleGradeREEntryJ").setSelectedKey("");

                  });

              });


            /* End of adding by Seyed Ismail on 01.02.2016 MAC01022016 */
          } else {
            //var msgDisplay = resultdata.results[0].SerialNo + " is invalid for depot " + resultdata.results[0].FunctLoc;
            sap.ui.commons.MessageBox.alert(resultdata.results[0].Message);
          }
        } else
          sap.ui.commons.MessageBox.alert("Error occured during validate Unit no and Depot.");
      } else
        sap.ui.commons.MessageBox.alert("Error occured during validate Unit no and Depot.");
    },

    onlineerrorValidUnitDepot: function(e) {
      errorfromServer(e);
    },

    onlineValidUnitDepot: function(unitno, depottxt, vUnitPartCode) {
      try {
        busyDialog.open();
        var urlToCall = serviceUrl15_old + "/Serialno_Valid_Repair_Estim?$filter=FunctLoc eq '" + depottxt.substr(0, 15) + "' and SerialNo eq '" + unitno + "' and Unitpcode eq 'C'";
        objUtilREstimate.doOnlineRequest(urlToCall, objREstimateOnlineJ.onlinesuccessValidUnitDepot, objREstimateOnlineJ.onlineerrorValidUnitDepot);
      } catch (e) {
        busyDialog.close();
        sap.ui.commons.MessageBox.alert("Error occured during validate Unit no and Depot.");
      }
    },

    //SECTION ONLINE
    onlinesuccessfunSection: function(resultdata, response) {
      var msg = '';
      jsnReqQueueREOnline[0]["status"] = "end";

      if (resultdata != undefined) {
        for (var i = 0; i < resultdata.results.length; i++) {
          glblJsonDDLREEntryJ.section.push({
            "text": resultdata.results[i].Description,
            "key": resultdata.results[i].Param2
          })
        }
      } else {
        msg = "No result found.";
      }
      objREstimateOnlineJ.checkAllLoadComplete();
    },

    onlineerrorfunSection: function(e) {
      jsnReqQueueREOnline[0]["status"] = "end";
      jsnReqQueueREOnline[0]["error"] = "true";
      jsnReqQueueREOnline[0]["msg"] = e.response.statusText;
      jsnReqQueueREOnline[0]["errorcode"] = e.response.statusCode;
      jsnReqQueueREOnline[0]["errorfunction"] = "onlineerrorfunSectionEstimate";
      objREstimateOnlineJ.checkAllLoadComplete();
    },

    onlinefunSection: function() {
      try {
        busyDialog.open();
        jsnReqQueueREOnline[0]["status"] = "start";
        glblJsonDDLREEntryJ.section.length = 0;
        var urlToCall = serviceUrl15_old + "/Repair_F4_Section";
        objUtilREstimate.doOnlineRequest(urlToCall, objREstimateOnlineJ.onlinesuccessfunSection, objREstimateOnlineJ.onlineerrorfunSection);
      } catch (e) {
        jsnReqQueueREOnline[0]["status"] = "end";
        jsnReqQueueREOnline[0]["error"] = "true";
        jsnReqQueueREOnline[0]["msg"] = e;
        jsnReqQueueREOnline[0]["errorcode"] = "0";
        jsnReqQueueREOnline[0]["errorfunction"] = "onlinefunSectionEstimate";
        objREstimateOnlineJ.checkAllLoadComplete();
      }
    },

    //DAMAGE CODE ONLINE
    onlinesuccessfunDamageCode: function(resultdata, response) {
      var msg = '';
      jsnReqQueueREOnline[1]["status"] = "end";

      if (resultdata != undefined) {
        for (var i = 0; i < resultdata.results.length; i++) {
          glblJsonDDLREEntryJ.damagecode.push({
            "text": resultdata.results[i].Kurztext,
            "key": resultdata.results[i].Param2
          })
        }
      }
      objREstimateOnlineJ.checkAllLoadComplete();
      //sap.ui.commons.MessageBox.alert(msg);
    },

    onlineerrorfunDamageCode: function(e) {
      jsnReqQueueREOnline[1]["status"] = "end";
      jsnReqQueueREOnline[1]["error"] = "true";
      jsnReqQueueREOnline[1]["msg"] = e.response.statusText;
      jsnReqQueueREOnline[1]["errorcode"] = e.response.statusCode;
      jsnReqQueueREOnline[1]["errorfunction"] = "onlineerrorfunDamageCode";
      objREstimateOnlineJ.checkAllLoadComplete();
    },

    onlinefunDamageCode: function() {
      try {
        busyDialog.open();
        jsnReqQueueREOnline[1]["status"] = "start";
        glblJsonDDLREEntryJ.damagecode.length = 0;
        var urlToCall = serviceUrl15_old + "/Repair_F4_Damgcode";
        objUtilREstimate.doOnlineRequest(urlToCall, objREstimateOnlineJ.onlinesuccessfunDamageCode, objREstimateOnlineJ.onlineerrorfunDamageCode);
      } catch (e) {
        jsnReqQueueREOnline[1]["status"] = "end";
        jsnReqQueueREOnline[1]["error"] = "true";
        jsnReqQueueREOnline[1]["msg"] = e;
        jsnReqQueueREOnline[1]["errorcode"] = "0";
        jsnReqQueueREOnline[1]["errorfunction"] = "onlinefunDamageCode";
        objREstimateOnlineJ.checkAllLoadComplete();
      }
    },


    onlinefunDamageCodeNew: function() {
      glblJsonDDLREEntryJ.damagecode.length = 0;
      for (var i = 0; i < damageCodes.length; i++) {
        glblJsonDDLREEntryJ.damagecode.push({
          "text": damageCodes[i].damage,
          "key": damageCodes[i].damKey
        });
      }
    },

    //RESPONSIBILITY ONLINE
    onlinesuccessfunResponsibility: function(resultdata, response) {
      var msg = '';
      jsnReqQueueREOnline[2]["status"] = "end";
      if (resultdata != undefined) {
        for (var i = 0; i < resultdata.results.length; i++) {
          glblJsonDDLREEntryJ.responsibility.push({
            "text": resultdata.results[i].Description,
            "key": resultdata.results[i].Param2
          });
        }
      } else {
        msg = "No result found.";
      }
      objREstimateOnlineJ.checkAllLoadComplete();
      //sap.ui.commons.MessageBox.alert(msg);
    },

    onlineerrorfunResponsibility: function(e) {
      jsnReqQueueREOnline[2]["status"] = "end";
      jsnReqQueueREOnline[2]["error"] = "true";
      jsnReqQueueREOnline[2]["msg"] = e.response.statusText;
      jsnReqQueueREOnline[2]["errorcode"] = e.response.statusCode;
      jsnReqQueueREOnline[2]["errorfunction"] = "onlineerrorfunResponsibility";
      objREstimateOnlineJ.checkAllLoadComplete();
    },

    onlinefunResponsibility: function() {
      try {
        busyDialog.open();
        jsnReqQueueREOnline[2]["status"] = "start";
        glblJsonDDLREEntryJ.responsibility.length = 0;
        var urlToCall = serviceUrl15_old + "/Repair_F4_Respnsibility";
        objUtilREstimate.doOnlineRequest(urlToCall, objREstimateOnlineJ.onlinesuccessfunResponsibility, objREstimateOnlineJ.onlineerrorfunResponsibility);
      } catch (e) {
        jsnReqQueueREOnline[2]["status"] = "end";
        jsnReqQueueREOnline[2]["error"] = "true";
        jsnReqQueueREOnline[2]["msg"] = e;
        jsnReqQueueREOnline[2]["errorcode"] = "0";
        jsnReqQueueREOnline[2]["errorfunction"] = "onlinefunResponsibility";
        objREstimateOnlineJ.checkAllLoadComplete();
      }
    },

    //MATERIAL ONLINE
    onlinesuccessfunMatrialCode: function(resultdata, response) {
      var msg = '';
      jsnReqQueueREOnline[5]["status"] = "end";

      if (resultdata != undefined) {
        for (var i = 0; i < resultdata.results.length; i++) {
          glblJsonDDLREEntryJ.matrialcode.push({
            "text": resultdata.results[i].Desc,
            "key": resultdata.results[i].Code
          });
        }
      } else {
        msg = "No result found.";
      }
      objREstimateOnlineJ.checkAllLoadComplete();
      //sap.ui.commons.MessageBox.alert(msg);
    },

    onlineerrorfunMatrialCode: function(e) {
      jsnReqQueueREOnline[5]["status"] = "end";
      jsnReqQueueREOnline[5]["error"] = "true";
      jsnReqQueueREOnline[5]["msg"] = e.response.statusText;
      jsnReqQueueREOnline[5]["errorcode"] = e.response.statusCode;
      jsnReqQueueREOnline[5]["errorfunction"] = "onlineerrorfunMatrialCode";
      objREstimateOnlineJ.checkAllLoadComplete();
    },

    onlinefunMatrialCode: function() {
      try {
        busyDialog.open();
        jsnReqQueueREOnline[5]["status"] = "start";
        glblJsonDDLREEntryJ.matrialcode.length = 0;
        var urlToCall = serviceUrl15_old + "/REP_ESTIM_F4_MATERIALCODE";
        objUtilREstimate.doOnlineRequest(urlToCall, objREstimateOnlineJ.onlinesuccessfunMatrialCode, objREstimateOnlineJ.onlineerrorfunMatrialCode);
      } catch (e) {
        jsnReqQueueREOnline[5]["status"] = "end";
        jsnReqQueueREOnline[5]["error"] = "true";
        jsnReqQueueREOnline[5]["msg"] = e;
        jsnReqQueueREOnline[5]["errorcode"] = "0";
        jsnReqQueueREOnline[5]["errorfunction"] = "onlinefunMatrialCode";
        objREstimateOnlineJ.checkAllLoadComplete();
      }
    },

    //SELECT ESTIMATE ONLINE GET HEADER
    onlinesuccessfunEstimateHdr: function(resultdata, response) {
      jsnReqQueueREOnline[3]["status"] = "end";

      if (resultdata != undefined) {
        if (resultdata.results.length > 0) {
          hdrJsnDataREEntryJ = resultdata.results.constructor();
          for (var attr in resultdata.results) {
            if (resultdata.results.hasOwnProperty(attr)) hdrJsnDataREEntryJ[attr] = resultdata.results[attr];
          }
          selDeotIdREEntryJ = resultdata.results[0].Depot;
          fixedLabourRate = resultdata.results[0].Labrate;
          //sap.ui.getCore().byId("idlblEstmtHdrREEntryJ").setText("Estimate For " + resultdata.results[0].SerialNumber + " at " + selDeotIdREEntryJ);
        } else {
          //msg = "No result found.";
        }
      } else {
        //msg = "No result found.";
      }
      objREstimateOnlineJ.checkAllLoadComplete();
    },

    onlineerrorfunEstimateHdr: function(e) {
      jsnReqQueueREOnline[3]["status"] = "end";
      jsnReqQueueREOnline[3]["error"] = "true";
      jsnReqQueueREOnline[3]["msg"] = e.response.statusText;
      jsnReqQueueREOnline[3]["errorcode"] = e.response.statusCode;
      jsnReqQueueREOnline[3]["errorfunction"] = "onlineerrorfunEstimateHdr";
      objREstimateOnlineJ.checkAllLoadComplete();
    },

    onlinefunEstimateHdr: function(unitNo, DepoId, DepoText) {
      try {
        busyDialog.open();
        hdrJsnDataREEntryJ.length = 0;
        jsnReqQueueREOnline[3]["status"] = "start";
        var urlToCall = serviceUrl15_old + "/Load_Estimates_Header?$filter=";
        urlToCall += "SerialNumber eq '" + unitNo + "' and ";
        urlToCall += "Depot eq '" + DepoId + "' and ";
        urlToCall += "FunctionalLoc eq '" + DepoText + "' and ";
        urlToCall += "Param1 eq '" + selEstmtId + "'";
        urlToCall += "and UserId eq '" + objLoginUser.getLoggedInUserName() + "'";

        objUtilREstimate.doOnlineRequest(urlToCall, objREstimateOnlineJ.onlinesuccessfunEstimateHdr, objREstimateOnlineJ.onlineerrorfunEstimateHdr);
      } catch (e) {
        jsnReqQueueREOnline[3]["status"] = "end";
        jsnReqQueueREOnline[3]["error"] = "true";
        jsnReqQueueREOnline[3]["msg"] = e;
        jsnReqQueueREOnline[3]["errorcode"] = "0";
        jsnReqQueueREOnline[3]["errorfunction"] = "onlinefunEstimateHdr";
        objREstimateOnlineJ.checkAllLoadComplete();
      }
    },

    //SELECT ESTIMATE ONLINE GET LINE ITEM
    onlinesuccessfunEstmtLineItem: function(resultdata, response) {
      jsnReqQueueREOnline[4]["status"] = "end";
      jsnLineItemREEntryJ.length = 0;
      objREstimateOnlineJ.checkAllLoadComplete();

      function padZero(num, size) {
        var s = num + "";
        while (s.length < size) s = "0" + s;
        return s;
      };
      if (resultdata != undefined) {
        $.each(resultdata.results, function(i, el) {
          if (el.Message == '') {
            jsnLineItemREEntryJ.push({
              "checked": false,
              "LineItem": el.LineItem, //padZero(el.LineItem,5),
              "sectionKey": "section Key",
              "sectionText": "section Text",
              "LocationKey": el.LocationCode,
              "LocationText": el.LocationCode,
              "ComponentKey": el.ComponentCode,
              "ComponentText": el.ComponentCode,
              "DamageKey": el.DamageCode,
              "DamageText": el.DamageCode,
              "RepairKey": el.RepairCode,
              "RepairText": el.RepairCode,
              "MaterialKey": el.MaterialCode,
              "MaterialText": el.MaterialCode,
              "MaterialCost": el.MaterialCost,
              "ManHours": el.ManHours,
              "RepairLength": el.RepairLength,
              "RepairWidth": el.RepairWidth,
              "Quantity": el.Quantity,
              responsibility: [],
              "ResponsibilityKey": el.Responsibility,
              "ResponsibilityText": el.Responsibility,
              "LabourRate": el.LabourRate,
              "TechBulletin": el.BulletinNumber,
              "DataInserted": true,
            });
          }
        });
        //				if(jsnLineItemREEntryJ.length < 6){
        //					sap.ui.getCore().byId("idTblLineItemREEntryJ").setNavigationMode(sap.ui.table.NavigationMode.None);
        //				}else{
        //					sap.ui.getCore().byId("idTblLineItemREEntryJ").setNavigationMode(sap.ui.table.NavigationMode.Paginator);
        //				}
        objREstimateOnlineJ.setResponsibilityLineItem();
        oMdlLineItemREEntryJ.updateBindings(); //UPDATE LINE ITEM
      } else {
        //msg = "No result found.";
      }
    },

    onlineerrorfunEstmtLineItem: function(e) {
      jsnReqQueueREOnline[4]["status"] = "end";
      jsnReqQueueREOnline[4]["error"] = "true";
      jsnReqQueueREOnline[4]["msg"] = e.response.statusText;
      jsnReqQueueREOnline[4]["errorcode"] = e.response.statusCode;
      jsnReqQueueREOnline[4]["errorfunction"] = "onlineerrorfunEstmtLineItem";
      objREstimateOnlineJ.checkAllLoadComplete();
    },

    onlinefunEstmtLineItem: function() {
      try {
        busyDialog.open();
        jsnLineItemREEntryJ.length = 0;

        jsnReqQueueREOnline[4]["status"] = "start";
        var urlToCall = serviceUrl15_old + "/Load_Estimates_Item?$filter=";
        urlToCall += "EstimateId eq '" + selEstmtId + "'";

        objUtilREstimate.doOnlineRequest(urlToCall, objREstimateOnlineJ.onlinesuccessfunEstmtLineItem, objREstimateOnlineJ.onlineerrorfunEstmtLineItem);
      } catch (e) {
        jsnReqQueueREOnline[4]["status"] = "end";
        jsnReqQueueREOnline[4]["error"] = "true";
        jsnReqQueueREOnline[4]["msg"] = e;
        jsnReqQueueREOnline[4]["errorcode"] = "0";
        jsnReqQueueREOnline[4]["errorfunction"] = "onlinefunEstmtLineItem";
        objREstimateOnlineJ.checkAllLoadComplete();
      }
    },

    setEstimateValues: function() {
      //hdrJsnDataREEntryJ
      if (hdrJsnDataREEntryJ.length > 0) {
        sap.ui.getCore().byId("idDdlUnitPCodeREEntryJ").setSelectedKey(hdrJsnDataREEntryJ[0].UnitPartcode);
        sap.ui.getCore().byId("idDdlJobTypeREEntryJ").setSelectedKey(hdrJsnDataREEntryJ[0].EstimateType);
        sap.ui.getCore().byId("idDdlSaleGradeREEntryJ").setSelectedKey(hdrJsnDataREEntryJ[0].SaleGrade);
        var cnvrtdt = hdrJsnDataREEntryJ[0].EstimateDt;
        var datenw = cnvrtdt.split('(')[1].split(')')[0];
        cnvrtdt = new Date(parseInt(datenw)).format("dd-mm-yyyy");

        sap.ui.getCore().byId("idDtPkrEstimateDtREEntryJ").setValue(cnvrtdt);
        sap.ui.getCore().byId("idTFLeaseAuthAmtREEntryJ").setValue(hdrJsnDataREEntryJ[0].LesseAmt);
        sap.ui.getCore().byId("idTFCurrnCodeREEntryJ").setValue(hdrJsnDataREEntryJ[0].CurrencyCode);

        // Begin of adding by Seyed Ismail on 19.03.2018 MACALPHA19032018_8

        globalLabCostC = globalLabCostCFromValidate = hdrJsnDataREEntryJ[0].Labrate;
        globalLabCostM = globalLabCostMFromValidate = hdrJsnDataREEntryJ[0].Labratem;
        globalLabCostCurrency = hdrJsnDataREEntryJ[0].CurrencyCode;

        var carcassTitle = "Repair Lines for Carcass - Labour Rate : " + globalLabCostC + " " + globalLabCostCurrency;
        var machineryTitle = "Repair Lines for Machinery - Labour Rate : " + globalLabCostM + " " + globalLabCostCurrency;

        sap.ui.getCore().byId("idlblhdrTblREEntryJ1").setText(carcassTitle);
        sap.ui.getCore().byId("idlblhdrTblREEntryJ2").setText(machineryTitle);

        if(hdrJsnDataREEntryJ[0].ZeroIndi == "X"){
          sap.ui.getCore().byId("idCheckBoxZeroCostJ1").setChecked(true);
        }else{
          sap.ui.getCore().byId("idCheckBoxZeroCostJ1").setChecked(false);
        }

        if(hdrJsnDataREEntryJ[0].ZeroIndiM == "X"){
          sap.ui.getCore().byId("idCheckBoxZeroCostJ2").setChecked(true);
        }else{
          sap.ui.getCore().byId("idCheckBoxZeroCostJ2").setChecked(false);
        }
        globalEstimateIsReefer = (hdrJsnDataREEntryJ[0].UnitPartcode == "X") ? true : false;
        if (globalEstimateIsReefer){
          sap.ui.getCore().byId("idFlxTblREEntryJLines2").setVisible(true);
        }else{
 				 globalLabCostM = 0;
 				 sap.ui.getCore().byId("idFlxTblREEntryJLines2").setVisible(false);
 			 }

        if(hdrJsnDataREEntryJ[0].CwCost == "0.00")
          hdrJsnDataREEntryJ[0].CwCost = "";

        sap.ui.getCore().byId("idTFCWREEntryJ").setValue(hdrJsnDataREEntryJ[0].CwCost);
        sap.ui.getCore().byId("idTFNotes1REEntryJ").setValue(hdrJsnDataREEntryJ[0].Notes1);
        sap.ui.getCore().byId("idTFNotes2REEntryJ").setValue(hdrJsnDataREEntryJ[0].Notes2);
        sap.ui.getCore().byId("idTFNotes3REEntryJ").setValue(hdrJsnDataREEntryJ[0].Notes3);
        sap.ui.getCore().byId("idTFNotes4REEntryJ").setValue(hdrJsnDataREEntryJ[0].Notes4);
        sap.ui.getCore().byId("idTFNotes5REEntryJ").setValue(hdrJsnDataREEntryJ[0].Notes5);
        // End of adding by Seyed Ismail on 19.03.2018 MACALPHA19032018_8
      }
      oMdlLineItemREEntryJ.updateBindings(); //UPDATE LINE ITEM
    },

    checkAllLoadComplete: function() {
      var arrayval = jsnReqQueueREOnline.filter(function(el) {
        return el.status == "start";
      });
      if (arrayval.length == 0) {
        busyDialog.close();
        var msgToDisplay = "The following information could not be retreived:",
          errortrue = "false";
        for (var inx in jsnReqQueueREOnline) {
          if (jsnReqQueueREOnline[inx].error == "true") {
            errortrue = "true";
            msgToDisplay += "\n" + jsnReqQueueREOnline[inx].task;
          }
        }
        if (errortrue == "true") {
          //sap.ui.commons.MessageBox.alert(msgToDisplay);
        } else {
          //sap.ui.commons.MessageBox.alert("Success");
        }
        this.bindAllDropDown();
        if (selEstmtId != '')
          this.setEstimateValues();
      }
    },

    bindAllDropDown: function() {
      //		//SECTION
      //		var oidDdlSectionREEntryJ = sap.ui.getCore().byId("idDdlSectionREEntryJ");
      //		oidDdlSectionREEntryJ.setModel(oMdlGlblDDLREEntryJ);
      //		oidDdlSectionREEntryJ.bindItems("/section", oItmTmpltGlblDDLREEntryJ);
      //		oidDdlSectionREEntryJ.insertItem(new sap.ui.core.ListItem({text:"",key:""}),0);
      //		//DAMAGE CODE
      //		var oidDdlDamageREEntryJ = sap.ui.getCore().byId("idDdlDamageREEntryJ");
      //		oidDdlDamageREEntryJ.setModel(oMdlGlblDDLREEntryJ);
      //		oidDdlDamageREEntryJ.bindItems("/damagecode", oItmTmpltGlblDDLREEntryJ);
      //		oidDdlDamageREEntryJ.insertItem(new sap.ui.core.ListItem({text:"",key:""}),0);
      //
      //		//RESPONSIBILITY
      //		var oidDdlResponsibilityREEntryJ = sap.ui.getCore().byId("idDdlResponsibilityREEntryJ");
      //		oidDdlResponsibilityREEntryJ.setModel(oMdlGlblDDLREEntryJ);
      //		oidDdlResponsibilityREEntryJ.bindItems("/responsibility", oItmTmpltGlblDDLREEntryJ);
      //		oidDdlResponsibilityREEntryJ.insertItem(new sap.ui.core.ListItem({text:"",key:""}),0);
      //
      //		//MATRIAL CODE
      //		var oidDdlMaterialCodeREEntryJ = sap.ui.getCore().byId("idDdlMaterialCodeREEntryJ");
      //		oidDdlMaterialCodeREEntryJ.setModel(oMdlGlblDDLREEntryJ);
      //		oidDdlMaterialCodeREEntryJ.bindItems("/matrialcode", oItmTmpltGlblDDLREEntryJ);
      //		oidDdlMaterialCodeREEntryJ.insertItem(new sap.ui.core.ListItem({text:"",key:""}),0);
      //		objREstimateOnlineJ.setResponsibilityLineItem();
    },

    /* Begin of adding by Seyed Ismail on 28.05.2015 MAC28052015+*/
    setResponsibilityLineItem: function() {
      //		var dataReponsibleREEntryJ = oMdlGlblDDLREEntryJ.getData().responsibility;
      //			for(var i=0; i < jsnLineItemREEntryJ.length; i++){
      //				jsnLineItemREEntryJ[i].responsibility.length = 0;
      //				jsnLineItemREEntryJ[i].responsibility.push({"text":"","key":""});
      //				for(var j=0; j < 4; j++){
      //					jsnLineItemREEntryJ[i].responsibility.push({"text":dataReponsibleREEntryJ[j].text,"key":dataReponsibleREEntryJ[j].key});
      //				}
      //			}
      //			oMdlLineItemREEntryJ.updateBindings();
    },
    /* End of adding by Seyed Ismail on 28.05.2015 MAC28052015+*/
    setResponsibilityLineItemJS: function() { // Changed from setResponsibilityLineItem to setResponsibilityLineItemJS MAC28052015+
      //		var dataReponsibleREEntryJ = oMdlGlblDDLREEntryJ.getData().responsibility;
      //			for(var i=0; i < jsnLineItemREEntryJ.length; i++){
      //				jsnLineItemREEntryJ[i].responsibility.length = 0;
      //				jsnLineItemREEntryJ[i].responsibility.push({"text":"","key":""});
      //				for(var inx in dataReponsibleREEntryJ){
      //					jsnLineItemREEntryJ[i].responsibility.push({"text":dataReponsibleREEntryJ[inx].text,"key":dataReponsibleREEntryJ[inx].key});
      //				}
      //			}
      //			oMdlLineItemREEntryJ.updateBindings();
    },
    //SAVE ONLINE
    onlinesuccessfunEstimateSave: function(resultdata, response) {
      try {
        if (resultdata != undefined) {
          if (resultdata.results.length > 0) {
            var arrayval = saveLineItemREEntryJ.filter(function(el) {
              return ((el["savestatus"] != true) && (el["DataInserted"] != false));
            });
            selEstmtId = resultdata.results[0].LvEstimateId
            if ((arrayval.length > 0) && (resultdata.results[0].LvItem == "Item table updated.")) {
              objREstimateOnlineJ.onlinefunEstimateSave(selEstmtId, '', globalJSPart);
            }
            if ((arrayval.length == 0) && (clickEvent == "save")) {
              busyDialog.close();
              sap.ui.getCore().byId("idlblSuccessMsgREEJ").setVisible(true);
              sap.ui.getCore().byId("idlblSuccessMsgREEJ").setText("The estimate was saved successfully.");
              //sap.ui.commons.MessageBox.alert("The estimate was saved successfully.");
              //sap.ui.commons.MessageBox.alert(resultdata.results[0].LvHeader + '\n' + resultdata.results[0].LvItem);
            } else if ((arrayval.length == 0) && (clickEvent == "submit")) {
              objREstimateOnlineJ.onlinefunEstimateSubmit(selEstmtId);
            }
          } else {
            busyDialog.close();
            sap.ui.commons.MessageBox.alert("Error while saving estimate.\nPlease contact the system admin or try again later."); //msg = "No result found.";
          }
        } else {
          busyDialog.close();
          sap.ui.commons.MessageBox.alert("Error while saving estimate.\nPlease contact the system admin or try again later."); //msg = "No result found.";
        }
      } catch (e) {
        busyDialog.close();
        sap.ui.commons.MessageBox.alert("Error occured while saving estimate.\nPlease contact the system admin or try again later.");
      }
    },

    onlineerrorfunEstimateSave: function(err) {
      errorfromServer(err);
    },

    onlinefunEstimateSave: function(estimateId, flag, part) {
      //globalJSPart = part; MACALPHA19032018_8
      try {
        sap.ui.getCore().byId("idlblSuccessMsgREEJ").setText("");
        sap.ui.getCore().byId("idlblSuccessMsgREEJ").setVisible(false);
        if (sap.ui.getCore().byId("idFrmElmntErrREEntryJ") != undefined) {
          sap.ui.getCore().byId("idFrmElmntErrREEntryJ").destroyFields();
          sap.ui.getCore().byId("idFrmElmntErrREEntryJ").destroy();
        }
        if (sap.ui.getCore().byId("idFrmElmntInfoLstREEntryJ") != undefined) {
          sap.ui.getCore().byId("idFrmElmntInfoLstREEntryJ").destroyFields();
          sap.ui.getCore().byId("idFrmElmntInfoLstREEntryJ").destroy();
        }

        busyDialog.open();
        var urlToCall = serviceUrl15_old + "/Repair_Estimates_Save?$filter=";
        //SET HEADER ITEM VALUE
        var oidDdlUnitPCodeREEntryJ = sap.ui.getCore().byId("idDdlUnitPCodeREEntryJ");
        var oidDdlJobTypeREEntryJ = sap.ui.getCore().byId("idDdlJobTypeREEntryJ");
        var oidDdlSaleGradeREEntryJ = sap.ui.getCore().byId("idDdlSaleGradeREEntryJ");
        var oidDtPkrEstimateDtREEntryJ = sap.ui.getCore().byId("idDtPkrEstimateDtREEntryJ");
        var oidTFLeaseAuthAmtREEntryJ = sap.ui.getCore().byId("idTFLeaseAuthAmtREEntryJ");
        var oidTFCurrnCodeREEntryJ = sap.ui.getCore().byId("idTFCurrnCodeREEntryJ");

        var dtEstmt = oidDtPkrEstimateDtREEntryJ.getValue().split('-');
        dtEstmt = dtEstmt[2] + '-' + dtEstmt[1] + '-' + dtEstmt[0] + 'T00:00:00';
        var datenowRE = new Date();
        var timenowRE = 'PT' + padZero(datenowRE.getHours(), 2) + 'H' + padZero(datenowRE.getMinutes(), 2) + 'M' + padZero(datenowRE.getSeconds(), 2) + 'S'; // new Date().getTime();
        datenowRE = datenowRE.format("yyyy-mm-dd") + 'T00:00:00';

        var isReefer = globalEstimateIsReefer ? "X" : "";
        urlToCall += "UserId eq '" + objLoginUser.getLoggedInUserName() + "' and ";
        urlToCall += "EstimateId eq '" + estimateId + "' and ";
        urlToCall += "EstimateType eq '" + oidDdlJobTypeREEntryJ.getSelectedKey() + "' and "; // MACALPHA19032018_8 changed from Joint Survey
        urlToCall += "SerialNumber eq '" + unitNo + "' and ";
        urlToCall += "CreatedDt eq datetime'" + datenowRE + "' and ";
        urlToCall += "CreatedTime eq time'" + timenowRE + "' and ";
        urlToCall += "UnitPartcode eq '" + isReefer + "' and "; // MACALPHA19032018_8 Removed part and added isReefer
        urlToCall += "JobType eq '" + oidDdlJobTypeREEntryJ.getSelectedKey() + "' and "; // MACALPHA19032018_8 changed from Joint Survey

        /* Begin of adding by Seyed Ismail on 19.03.2018 MACALPHA19032018_8 */
        // Notes Fields

        var oTFNotes1REEntryJ = sap.ui.getCore().byId("idTFNotes1REEntryJ").getValue();
        var oTFNotes2REEntryJ = sap.ui.getCore().byId("idTFNotes2REEntryJ").getValue();
        var oTFNotes3REEntryJ = sap.ui.getCore().byId("idTFNotes3REEntryJ").getValue();
        var oTFNotes4REEntryJ = sap.ui.getCore().byId("idTFNotes4REEntryJ").getValue();
        var oTFNotes5REEntryJ = sap.ui.getCore().byId("idTFNotes5REEntryJ").getValue();
        urlToCall += "Notes1 eq '" + encodeURIComponent(oTFNotes1REEntryJ) + "' and ";
        urlToCall += "Notes2 eq '" + encodeURIComponent(oTFNotes2REEntryJ) + "' and ";
        urlToCall += "Notes3 eq '" + encodeURIComponent(oTFNotes3REEntryJ) + "' and ";
        urlToCall += "Notes4 eq '" + encodeURIComponent(oTFNotes4REEntryJ) + "' and ";
        urlToCall += "Notes5 eq '" + encodeURIComponent(oTFNotes5REEntryJ) + "' and ";

        // CW Cost
        var oTFCWREEntryJ = sap.ui.getCore().byId("idTFCWREEntryJ").getValue();
        if(oTFCWREEntryJ == "")
          oTFCWREEntryJ = 0;
        urlToCall += "CwCost eq " + oTFCWREEntryJ + "m and ";

        // Zero Indicator Check
        var zeroindic = "";
        var zeroindim = "";
        zeroindic = sap.ui.getCore().byId("idCheckBoxZeroCostJ1").getChecked() ? "X" : "";
        zeroindim = sap.ui.getCore().byId("idCheckBoxZeroCostJ2").getChecked() ? "X" : "";
        urlToCall += "ZeroIndi eq '" + zeroindic + "' and ";
        urlToCall += "ZeroIndiM eq '" + zeroindim + "' and ";

        // Labour Rate
        urlToCall += "LabRate eq " + globalLabCostC + "m and ";

        var localLabCostM = (globalLabCostM)?globalLabCostM:"0";
        urlToCall += "LabRateM eq " + localLabCostM + "m and ";

        /* End of adding by Seyed Ismail on 19.03.2018 MACALPHA19032018_8 */

        urlToCall += "SaleGrade eq '" + oidDdlSaleGradeREEntryJ.getSelectedKey() + "' and ";
        urlToCall += "EstimateDt eq datetime'" + dtEstmt + "' and ";
        urlToCall += "LesseAmt eq '" + oidTFLeaseAuthAmtREEntryJ.getValue() + "' and ";
        urlToCall += "CurrencyCode eq '" + oidTFCurrnCodeREEntryJ.getValue() + "' and ";
        //urlToCall += "LabRate eq " + fixedLabourRate + "m and "; // MACALPHA19032018_8-
        urlToCall += "Para3 eq '" + selDeotIdREEntryJ + "' and ";
        urlToCall += "Para1 eq '" + flag + "'";

        //LINE ITEM FOR SAVE
        var cunt = 0;
        var arrField = ["IRepa1", "IRepa2", "IRepa3", "IRepa4", "IRepa5", "IRepa6", "IRepa7", "IRepa8", "IRepa9", "IRepa10", "IRepa11", "IRepa12"];
        for (var inx = 0; inx < saveLineItemREEntryJ.length; inx++) {
          if (saveLineItemREEntryJ[inx].savestatus == false) {
            if (cunt < 12) {
              var valToPass = '';
              saveLineItemREEntryJ[inx].savestatus = true;
              valToPass += saveLineItemREEntryJ[inx].LineItem + '$';
              valToPass += saveLineItemREEntryJ[inx].LocationKey + '$';
              valToPass += saveLineItemREEntryJ[inx].ComponentKey + '$';
              valToPass += saveLineItemREEntryJ[inx].DamageKey + '$';
              valToPass += saveLineItemREEntryJ[inx].MaterialKey + '$';
              valToPass += saveLineItemREEntryJ[inx].RepairKey + '$';
              valToPass += saveLineItemREEntryJ[inx].RepairLength + '$';
              valToPass += saveLineItemREEntryJ[inx].RepairWidth + '$';
              valToPass += '' + '$';
              valToPass += saveLineItemREEntryJ[inx].Quantity + '$';
              valToPass += saveLineItemREEntryJ[inx].ManHours + '$';
              valToPass += saveLineItemREEntryJ[inx].MaterialCost + '$';
              valToPass += saveLineItemREEntryJ[inx].ResponsibilityKey + '$';
              valToPass += saveLineItemREEntryJ[inx].LabourRate + '$';
              valToPass += saveLineItemREEntryJ[inx].TechBulletin + '$';
              valToPass += saveLineItemREEntryJ[inx].Cpart;
              urlToCall += " and " + arrField[cunt] + " eq '" + valToPass + "'";
              cunt++;
            }
          }
        }
        objUtilREstimate.doOnlineRequest(urlToCall, objREstimateOnlineJ.onlinesuccessfunEstimateSave, objREstimateOnlineJ.onlineerrorfunEstimateSave);
      } catch (e) {
        busyDialog.close();
        sap.ui.commons.MessageBox.alert("Error occured while saving estimate.\nPlease contact the system admin or try again later.");
      }
    },
    //SAVE JOINT SURVEY CASE
    onlinesuccessRJSEstimateSave: function(resultdata, response) {
      try {
        if (resultdata != undefined) {
          if (resultdata.results.length > 0) {
            var arrayval = saveLineItemRJSREEntryJ.filter(function(el) {
              return ((el["savestatus"] != true) && (el["DataInserted"] != false));
            });
            estmtIdRJS = resultdata.results[0].LvEstimateId
            if ((arrayval.length > 0) && (resultdata.results[0].LvItem == "Item table updated.")) {
              objREstimateOnlineJ.onlineRJSEstimateSave(estmtIdRJS, '');
            }
            if ((arrayval.length == 0) && (clickEvent == "save")) {
              busyDialog.close();
              sap.ui.getCore().byId("idlblSuccessMsgJSREEJ").setVisible(true);
              sap.ui.getCore().byId("idlblSuccessMsgJSREEJ").setText("The estimate was saved successfully.");

              //sap.ui.commons.MessageBox.alert("The estimate was saved successfully.");
              //sap.ui.commons.MessageBox.alert(resultdata.results[0].LvHeader + '\n' + resultdata.results[0].LvItem);
            } else if ((arrayval.length == 0) && (clickEvent == "submit")) {
              objREstimateOnlineJ.onlineRJSSubmit(estmtIdRJS);
            }
          } else {
            busyDialog.close();
            sap.ui.commons.MessageBox.alert("Error occured while saving estimate.\nPlease contact the system admin or try again later."); //msg = "No result found.";
          }
        } else {
          busyDialog.close();
          sap.ui.commons.MessageBox.alert("Error occured while saving estimate.\nPlease contact the system admin or try again later."); //msg = "No result found.";
        }
      } catch (e) {
        busyDialog.close();
        sap.ui.commons.MessageBox.alert("Error occured while saving estimate.\nPlease contact the system admin or try again later.");
      }
    },

    onlineerrorRJSEstimateSave: function(err) {
      errorfromServer(err);
    },

    onlineRJSEstimateSave: function(estmtIdRJS, flag) {
      try {

        sap.ui.getCore().byId("idlblSuccessMsgJSREEJ").setVisible(false);
        sap.ui.getCore().byId("idlblSuccessMsgJSREEJ").setText("");
        if (sap.ui.getCore().byId("idFrmElmntErrRJSREEntryJ") != undefined) {
          sap.ui.getCore().byId("idFrmElmntErrRJSREEntryJ").destroyFields();
          sap.ui.getCore().byId("idFrmElmntErrRJSREEntryJ").destroy();
        }
        if (sap.ui.getCore().byId("idFrmElmntInfoLstRJSREEntryJ") != undefined) {
          sap.ui.getCore().byId("idFrmElmntInfoLstRJSREEntryJ").destroyFields();
          sap.ui.getCore().byId("idFrmElmntInfoLstRJSREEntryJ").destroy();
        }

        busyDialog.open();
        var urlToCall = serviceUrl15_old + "/Repair_Estimates_Save?$filter=";
        //SET HEADER ITEM VALUE
        var oidDdlUnitPCodeRJSREEntryJ = sap.ui.getCore().byId("idDdlUnitPCodeRJSREEntryJ");
        var oidDdlJobTypeRJSREEntryJ = sap.ui.getCore().byId("idDdlJobTypeRJSREEntryJ");
        var oidDdlSaleGradeRJSREEntryJ = sap.ui.getCore().byId("idDdlSaleGradeRJSREEntryJ");
        var oidDtPkrEstimateDtRJSREEntryJ = sap.ui.getCore().byId("idDtPkrEstimateDtRJSREEntryJ");
        var oidTFLeaseAuthAmtRJSREEntryJ = sap.ui.getCore().byId("idTFLeaseAuthAmtRJSREEntryJ");
        var oidTFCurrnCodeRJSREEntryJ = sap.ui.getCore().byId("idTFCurrnCodeRJSREEntryJ");

        var dtEstmt = oidDtPkrEstimateDtRJSREEntryJ.getValue().split('-');
        dtEstmt = dtEstmt[2] + '-' + dtEstmt[1] + '-' + dtEstmt[0] + 'T00:00:00';
        var datenowRE = new Date()
        var timenowRE = 'PT' + padZero(datenowRE.getHours(), 2) + 'H' + padZero(datenowRE.getMinutes(), 2) + 'M' + padZero(datenowRE.getSeconds(), 2) + 'S'; // new Date().getTime();
        datenowRE = datenowRE.format("yyyy-mm-dd") + 'T00:00:00';

        urlToCall += "UserId eq '" + objLoginUser.getLoggedInUserName() + "' and ";
        urlToCall += "EstimateId eq '" + estmtIdRJS + "' and ";
        urlToCall += "EstimateType eq '" + oidDdlJobTypeRJSREEntryJ.getSelectedKey() + "' and ";
        urlToCall += "SerialNumber eq '" + unitNo + "' and ";
        urlToCall += "CreatedDt eq datetime'" + datenowRE + "' and ";
        urlToCall += "CreatedTime eq time'" + timenowRE + "' and ";
        urlToCall += "UnitPartcode eq '" + oidDdlUnitPCodeRJSREEntryJ.getSelectedKey() + "' and ";
        urlToCall += "JobType eq '" + oidDdlJobTypeRJSREEntryJ.getSelectedKey() + "' and ";
        urlToCall += "SaleGrade eq '" + oidDdlSaleGradeRJSREEntryJ.getSelectedKey() + "' and ";
        urlToCall += "EstimateDt eq datetime'" + dtEstmt + "' and ";
        urlToCall += "LesseAmt eq '" + oidTFLeaseAuthAmtRJSREEntryJ.getValue() + "' and ";
        urlToCall += "CurrencyCode eq '" + oidTFCurrnCodeRJSREEntryJ.getValue() + "' and ";
        urlToCall += "LabRate eq " + fixedLabourRate + "m and ";
        urlToCall += "Para3 eq '" + selDeotIdREEntryJ + "' and ";
        urlToCall += "Para1 eq '" + flag + "'";

        //LINE ITEM FOR SAVE
        var cunt = 0;
        var arrField = ["IRepa1", "IRepa2", "IRepa3", "IRepa4", "IRepa5", "IRepa6", "IRepa7", "IRepa8", "IRepa9", "IRepa10", "IRepa11", "IRepa12"]
        for (var inx = 0; inx < saveLineItemRJSREEntryJ.length; inx++) {
          if (saveLineItemRJSREEntryJ[inx].savestatus == false) {
            if (cunt < 12) {
              var valToPass = '';
              saveLineItemRJSREEntryJ[inx].savestatus = true;
              valToPass += saveLineItemRJSREEntryJ[inx].LineItem + '$';
              valToPass += saveLineItemRJSREEntryJ[inx].LocationKey + '$';
              valToPass += saveLineItemRJSREEntryJ[inx].ComponentKey + '$';
              valToPass += saveLineItemRJSREEntryJ[inx].DamageKey + '$';
              valToPass += saveLineItemRJSREEntryJ[inx].MaterialKey + '$';
              valToPass += saveLineItemRJSREEntryJ[inx].RepairKey + '$';
              valToPass += saveLineItemRJSREEntryJ[inx].RepairLength + '$';
              valToPass += saveLineItemRJSREEntryJ[inx].RepairWidth + '$';
              valToPass += '' + '$';
              valToPass += saveLineItemRJSREEntryJ[inx].Quantity + '$';
              valToPass += saveLineItemRJSREEntryJ[inx].ManHours + '$';
              valToPass += saveLineItemRJSREEntryJ[inx].MaterialCost + '$';
              valToPass += saveLineItemRJSREEntryJ[inx].ResponsibilityKey + '$';
              valToPass += saveLineItemRJSREEntryJ[inx].LabourRate + '$';
              valToPass += saveLineItemRJSREEntryJ[inx].TechBulletin;
              urlToCall += " and " + arrField[cunt] + " eq '" + valToPass + "'";
              cunt++;
            }
          }
        }
        objUtilREstimate.doOnlineRequest(urlToCall, objREstimateOnlineJ.onlinesuccessRJSEstimateSave, objREstimateOnlineJ.onlineerrorRJSEstimateSave);
      } catch (e) {
        busyDialog.close();
        sap.ui.commons.MessageBox.alert("Error occured while processing.\nPlease contact the system admin or try again later.");
      }
    },

    //Submit ONLINE
    onlinesuccessfunEstimateSubmit: function(resultdata, response) {
      //busyDialog.close();
      var jsnErrorREEntryJ = [];
      var jsnSuccessREEntryJ = [];
      selEstmtId = '';

      try {
        if (resultdata != undefined) {
          if (resultdata.results.length > 0) {
            //BELOW CONDITION FOR RESUBMIT SAME DATA WITHOT NOTIFY TO USER
            if ((resultdata.results.length == 1) && (resultdata.results[0].Type == "X")) {
              new RepairEstimateEntry().saveRepairEstimateFromExcel();
              return;
            }
            globalJSError = false;
            busyDialog.close();
            for (var indx in resultdata.results) {
              if (resultdata.results[indx].Type == "D") {
                var msgstr = resultdata.results[indx].Message.substr(resultdata.results[indx].Message.indexOf(':') + 1, resultdata.results[indx].Message.length);
                jsnSuccessREEntryJ.push({
                  "Equipment": resultdata.results[indx].Equipment,
                  "Status": resultdata.results[indx].Status,
                  "Type": resultdata.results[indx].Type,
                  "Message": msgstr,
                  "SerialNo": resultdata.results[indx].SerialNo,
                  "FunctionalLoc": resultdata.results[indx].FunctionalLoc,
                  "Depot": resultdata.results[indx].Depot,
                  "UnitPartCode": resultdata.results[indx].UnitPartCode,
                  "JobType": resultdata.results[indx].JobType,
                  "SaleGrade": resultdata.results[indx].SaleGrade,
                  "EstimateDate": resultdata.results[indx].EstimateDate,
                  "LesseeAuthAmt": resultdata.results[indx].LesseeAuthAmt,
                  "Conditioncode": resultdata.results[indx].Conditioncode,
                  "Currencycode": resultdata.results[indx].Currencycode,
                  "EstimId": resultdata.results[indx].EstimId,
                  "Param1": resultdata.results[indx].Param1,
                  "Param2": resultdata.results[indx].Param2,
                  "Param3": resultdata.results[indx].Param3,
                  "Param4": resultdata.results[indx].Param4,
                  "IconSrc": "images/server_response.png"
                });
              } else if ((resultdata.results[indx].Type == "E") || (resultdata.results[indx].Type == "S")) {
                var msgstr = resultdata.results[indx].Message.substr(resultdata.results[indx].Message.indexOf(':') + 1, resultdata.results[indx].Message.length);
                jsnErrorREEntryJ.push({
                  "Equipment": resultdata.results[indx].Equipment,
                  "Status": resultdata.results[indx].Status,
                  "Type": resultdata.results[indx].Type,
                  "Message": msgstr,
                  "SerialNo": resultdata.results[indx].SerialNo,
                  "FunctionalLoc": resultdata.results[indx].FunctionalLoc,
                  "Depot": resultdata.results[indx].Depot,
                  "UnitPartCode": resultdata.results[indx].UnitPartCode,
                  "JobType": resultdata.results[indx].JobType,
                  "SaleGrade": resultdata.results[indx].SaleGrade,
                  "EstimateDate": resultdata.results[indx].EstimateDate,
                  "LesseeAuthAmt": resultdata.results[indx].LesseeAuthAmt,
                  "Conditioncode": resultdata.results[indx].Conditioncode,
                  "Currencycode": resultdata.results[indx].Currencycode,
                  "EstimId": resultdata.results[indx].EstimId,
                  "Param1": resultdata.results[indx].Param1,
                  "Param2": resultdata.results[indx].Param2,
                  "Param3": resultdata.results[indx].Param3,
                  "Param4": resultdata.results[indx].Param4
                });
              }

              if (resultdata.results[indx].Type == "E")
                globalJSError = true;
            }

            /*var oidFrmCntnrRsltREEntryJ = new sap.ui.layout.form.FormContainer("idFrmCntnrRsltREEntryJ", {
            	formElements: []
            });
            var oFrmREEntryJ = sap.ui.getCore().byId("idFrmREEntryJ");
            oFrmREEntryJ.addFormContainer(oidFrmCntnrRsltREEntryJ);*/

            if (jsnSuccessREEntryJ.length > 0) {
              objREstimateOnlineJ.createSuccessList(jsnSuccessREEntryJ);
            }

            if (jsnErrorREEntryJ.length > 0) {
              objREstimateOnlineJ.createErrorTable(jsnErrorREEntryJ);
            }

            if (globalJSError == false) {
              if (globalJSPart == "C") {
                sap.ui.getCore().byId("idFlxTblREEntryJLines1").setVisible(false);
              } else if (globalJSPart == "M") {
                sap.ui.getCore().byId("idFlxTblREEntryJLines2").setVisible(false);
              }
            } else {

            }
          } else {
            busyDialog.close();
            sap.ui.commons.MessageBox.alert("No result found.\nPlease contact the system admin or try again later.");
          }
        } else {
          busyDialog.close();
          sap.ui.commons.MessageBox.alert("No result found.\nPlease contact the system admin or try again later.");
        }
      } catch (e) {
        busyDialog.close();
        sap.ui.commons.MessageBox.alert("Error occured while processing.\nPlease contact the system admin or try again later.");
      }
    },

    onlineerrorfunEstimateSubmit: function(err) {
      errorfromServer(err);
    },

    onlinefunEstimateSubmit: function(estimateId) {
      try {
        var valid = true;
        /*if(sap.ui.getCore().byId("idFrmCntnrRsltREEntryJ") != undefined){
        		sap.ui.getCore().byId("idFrmCntnrRsltREEntryJ").destroyFormElements();
        		sap.ui.getCore().byId("idFrmCntnrRsltREEntryJ").destroy();
        }*/

        var idDdlUnitPCodeREEntryJ = sap.ui.getCore().byId("idDdlUnitPCodeREEntryJ");
        var idDtPkrEstimateDtREEntryJ = sap.ui.getCore().byId("idDtPkrEstimateDtREEntryJ");

        if (idDdlUnitPCodeREEntryJ.getValue() == '') {
          idDdlUnitPCodeREEntryJ.setPlaceholder("Required");
          idDdlUnitPCodeREEntryJ.setValueState(sap.ui.core.ValueState.Error);
          valid = false;
        }
        if (idDtPkrEstimateDtREEntryJ.getValue() == '') {
          idDtPkrEstimateDtREEntryJ.setPlaceholder("Required");
          idDtPkrEstimateDtREEntryJ.setValueState(sap.ui.core.ValueState.Error);
          valid = false;
        }
        if (!valid) {
          return;
        }

        var dtEstmt = idDtPkrEstimateDtREEntryJ.getValue().split('-');
        dtEstmt = dtEstmt[2] + '-' + dtEstmt[1] + '-' + dtEstmt[0] + 'T00:00:00';

        busyDialog.open();
        var urlToCall = serviceUrl15_old + "/Rep_Est_Sub?$filter=";
        urlToCall += "EstimId eq '" + estimateId + "'";
        urlToCall += " and Currencycode eq '' and UnitPartCode eq '' and SerialNo eq '' and Depot eq '' and SaleGrade eq '' and LesseeAuthAmt eq '' and JobType eq '' and Param3 eq '0000000000' and Param2 eq datetime'9999-09-09T00:00:00' and Param1 eq '' and IRep9 eq '' and IRep8 eq '' and IRep7 eq '' and IRep6 eq '' and IRep5 eq '' and IRep4 eq '' and IRep3 eq '' and IRep2 eq '' and IRep10 eq '' and IRep1 eq '' and EstimateDate eq datetime'" + dtEstmt + "' and FunctionalLoc eq '' and Param4 eq time'PT00H00M00S'";

        //var urlToCall = serviceUrl15_old + "/Repair_Estimates_Submit?$filter=";
        //urlToCall += "EstimId eq '"+ estimateId +"'";
        //urlToCall += " and Currencycode eq '' and UnitPartCode eq '' and SerialNo eq '' and Depot eq '' and SaleGrade eq '' and LesseeAuthAmt eq '' and JobType eq '' and Param3 eq '0000000000' and Param2 eq datetime'9999-09-09T00:00:00' and Param1 eq '' and IRep9 eq '' and IRep8 eq '' and IRep7 eq '' and IRep6 eq '' and IRep5 eq '' and IRep4 eq '' and IRep3 eq '' and IRep2 eq '' and IRep10 eq '' and IRep1 eq '' and EstimateDate eq datetime'" + dtEstmt + "' and FunctionalLoc eq '' and Param4 eq time'PT00H00M00S'";
        objUtilREstimate.doOnlineRequest(urlToCall, objREstimateOnlineJ.onlinesuccessfunEstimateSubmit, objREstimateOnlineJ.onlineerrorfunEstimateSubmit);
      } catch (e) {
        busyDialog.close();
        sap.ui.commons.MessageBox.alert("Error occured while processing.\nPlease contact the system admin or try again later.");
      }
    },

    createErrorTable: function(jsnData) {
      var oidTblErrorREEntryJ = new sap.ui.table.Table("idErrorTableRepJ", {
        selectionMode: sap.ui.table.SelectionMode.None,
        navigationMode: sap.ui.table.NavigationMode.None,
        layoutData: new sap.ui.layout.GridData({
          span: "L8 M12 S12",
          linebreak: false,
          margin: false
        }),
      }).addStyleClass('tblBorder');

      oidTblErrorREEntryJ.addColumn(new sap.ui.table.Column({
        label: new sap.ui.commons.Label({
          text: "Error Type",
        }),
        template: new sap.ui.commons.TextView().bindProperty("text", "Type"),
        hAlign: "Center",
        resizable: false,
        width: "90px"
      }));

      oidTblErrorREEntryJ.addColumn(new sap.ui.table.Column({
        label: new sap.ui.commons.Label({
          text: "Message"
        }),
        template: new sap.ui.commons.TextView().bindProperty("text", "Message"),
        resizable: false,
        hAlign: "Center"
      }));

      var oMdlErrTblREEntryJ = new sap.ui.model.json.JSONModel();
      oMdlErrTblREEntryJ.setData({
        modelData: jsnData
      });
      oidTblErrorREEntryJ.setVisibleRowCount(jsnData.length);
      oidTblErrorREEntryJ.setModel(oMdlErrTblREEntryJ);
      oidTblErrorREEntryJ.bindRows("/modelData");

      var oFrmCntnrREEntryJ = sap.ui.getCore().byId("idFrmCntnrREEntryJ");
      var frmFirsRowREEntryJ = new sap.ui.layout.form.FormElement("idFrmElmntErrREEntryJ", {
        fields: [oidTblErrorREEntryJ]
      });
      oFrmCntnrREEntryJ.addFormElement(frmFirsRowREEntryJ);

      /*var oFrmCntnrREEntryJ = sap.ui.getCore().byId("idFrmCntnrRsltREEntryJ");
      var frmElmntErrorTblREEntryJ = new sap.ui.layout.form.FormElement("idFrmElmtTblErrorREEntryJ",{
          fields: [oidTblErrorREEntryJ]
      });
      oFrmCntnrREEntryJ.addFormElement(frmElmntErrorTblREEntryJ);*/
    },

    createSuccessList: function(jsnBindData) {
      /* if(sap.ui.getCore().byId("idRowRptrSuccessCMDt") != undefined){
      	sap.ui.getCore().byId("idRowRptrSuccessCMDt").destroy();
      } */
      var oRwRptrSuccesREEntryJ = new sap.ui.commons.RowRepeater("idRRRepairEstimJ", {}).addStyleClass("marginTop10");
      oRwRptrSuccesREEntryJ.setDesign("Transparent");
      oRwRptrSuccesREEntryJ.setNumberOfRows(jsnBindData.length);
      oRwRptrSuccesREEntryJ.setNoData(false);
      //create the template cntrlSuccessREEntryJ that will be repeated and will display the data
      var oRwTmpltSuccesREEntryJ = new sap.ui.commons.layout.MatrixLayout({
        widths: ['25px', '95%']
      });

      var mtrxRwSuccessREEntryJ, mtrxCellSuccessREEntryJ, cntrlSuccessREEntryJ;
      // main matrix
      oRwTmpltSuccesREEntryJ.setWidth("70%");
      // main row
      mtrxRwSuccessREEntryJ = new sap.ui.commons.layout.MatrixLayoutRow();
      //image
      cntrlSuccessREEntryJ = new sap.ui.commons.Image();
      //cntrlSuccessREEntryJ.setHeight("60px");
      //cntrlSuccessREEntryJ.setWidth("50px");
      cntrlSuccessREEntryJ.bindProperty("src", "IconSrc");

      mtrxCellSuccessREEntryJ = new sap.ui.commons.layout.MatrixLayoutCell();
      mtrxCellSuccessREEntryJ.addContent(cntrlSuccessREEntryJ);
      mtrxRwSuccessREEntryJ.addCell(mtrxCellSuccessREEntryJ);

      //label 1
      cntrlSuccessREEntryJ = new sap.ui.commons.Label();
      cntrlSuccessREEntryJ.bindProperty("text", "Message");
      mtrxCellSuccessREEntryJ = new sap.ui.commons.layout.MatrixLayoutCell();
      mtrxCellSuccessREEntryJ.addContent(cntrlSuccessREEntryJ);
      mtrxRwSuccessREEntryJ.addCell(mtrxCellSuccessREEntryJ);

      // add row to matrix
      oRwTmpltSuccesREEntryJ.addRow(mtrxRwSuccessREEntryJ);

      var oMdlListSuccesREEntryJ = new sap.ui.model.json.JSONModel();
      oMdlListSuccesREEntryJ.setData(jsnBindData);
      oRwRptrSuccesREEntryJ.setModel(oMdlListSuccesREEntryJ);

      oRwRptrSuccesREEntryJ.bindRows("/", oRwTmpltSuccesREEntryJ);

      var oFrmCntnrREEntryJ = sap.ui.getCore().byId("idFrmCntnrREEntryJ");
      var frmFirsRowREEntryJ = new sap.ui.layout.form.FormElement("idFrmElmntInfoLstREEntryJ", {
        fields: [oRwRptrSuccesREEntryJ]
      });
      oFrmCntnrREEntryJ.addFormElement(frmFirsRowREEntryJ);

      /*var oFrmCntnrREEntryJ = sap.ui.getCore().byId("idFrmCntnrRsltREEntryJ");
      var frmElmntSuccesREEntryJ = new sap.ui.layout.form.FormElement("idFrmElmtSuccesREEntryJ",{
          fields: [oRwRptrSuccesREEntryJ]
      });
      oFrmCntnrREEntryJ.addFormElement(frmElmntSuccesREEntryJ);*/
    },

    //SUBMIT FOR REFER JOINT SURVEY
    onlinesuccessRJSSubmit: function(resultdata, response) {
      //busyDialog.close();
      var jsnErrorRJSREEntryJ = [];
      var jsnSuccessRJSREEntryJ = [];
      estmtIdRJS = '';
      try {
        if (resultdata != undefined) {
          if (resultdata.results.length > 0) {
            //BELOW CONDITION FOR RESUBMIT SAME DATA WITHOT NOTIFY TO USER
            if ((resultdata.results.length == 1) && (resultdata.results[0].Type == "X")) {
              new RepairEstimateEntryReferJS().saveNsubmitRJS();
              return;
            }

            busyDialog.close();
            for (var indx in resultdata.results) {
              if (resultdata.results[indx].Type == "D") {
                var msgstr = resultdata.results[indx].Message.substr(resultdata.results[indx].Message.indexOf(':') + 1, resultdata.results[indx].Message.length);
                jsnSuccessRJSREEntryJ.push({
                  "Equipment": resultdata.results[indx].Equipment,
                  "Status": resultdata.results[indx].Status,
                  "Type": resultdata.results[indx].Type,
                  "Message": msgstr,
                  "SerialNo": resultdata.results[indx].SerialNo,
                  "FunctionalLoc": resultdata.results[indx].FunctionalLoc,
                  "Depot": resultdata.results[indx].Depot,
                  "UnitPartCode": resultdata.results[indx].UnitPartCode,
                  "JobType": resultdata.results[indx].JobType,
                  "SaleGrade": resultdata.results[indx].SaleGrade,
                  "EstimateDate": resultdata.results[indx].EstimateDate,
                  "LesseeAuthAmt": resultdata.results[indx].LesseeAuthAmt,
                  "Conditioncode": resultdata.results[indx].Conditioncode,
                  "Currencycode": resultdata.results[indx].Currencycode,
                  "EstimId": resultdata.results[indx].EstimId,
                  "Param1": resultdata.results[indx].Param1,
                  "Param2": resultdata.results[indx].Param2,
                  "Param3": resultdata.results[indx].Param3,
                  "Param4": resultdata.results[indx].Param4,
                  "IconSrc": "images/server_response.png"
                });
              } else if ((resultdata.results[indx].Type == "E") || (resultdata.results[indx].Type == "S")) {
                var msgstr = resultdata.results[indx].Message.substr(resultdata.results[indx].Message.indexOf(':') + 1, resultdata.results[indx].Message.length);
                jsnErrorRJSREEntryJ.push({
                  "Equipment": resultdata.results[indx].Equipment,
                  "Status": resultdata.results[indx].Status,
                  "Type": resultdata.results[indx].Type,
                  "Message": msgstr,
                  "SerialNo": resultdata.results[indx].SerialNo,
                  "FunctionalLoc": resultdata.results[indx].FunctionalLoc,
                  "Depot": resultdata.results[indx].Depot,
                  "UnitPartCode": resultdata.results[indx].UnitPartCode,
                  "JobType": resultdata.results[indx].JobType,
                  "SaleGrade": resultdata.results[indx].SaleGrade,
                  "EstimateDate": resultdata.results[indx].EstimateDate,
                  "LesseeAuthAmt": resultdata.results[indx].LesseeAuthAmt,
                  "Conditioncode": resultdata.results[indx].Conditioncode,
                  "Currencycode": resultdata.results[indx].Currencycode,
                  "EstimId": resultdata.results[indx].EstimId,
                  "Param1": resultdata.results[indx].Param1,
                  "Param2": resultdata.results[indx].Param2,
                  "Param3": resultdata.results[indx].Param3,
                  "Param4": resultdata.results[indx].Param4
                });
              }
            }

            /*var oidFrmCntnrRsltREEntryJ = new sap.ui.layout.form.FormContainer("idFrmCntnrRsltREEntryJ", {
            	formElements: []
            });
            var oFrmREEntryJ = sap.ui.getCore().byId("idFrmREEntryJ");
            oFrmREEntryJ.addFormContainer(oidFrmCntnrRsltREEntryJ);*/

            if (jsnSuccessRJSREEntryJ.length > 0) {
              objREstimateOnlineJ.createSuccessListRJS(jsnSuccessRJSREEntryJ);
            }

            if (jsnErrorRJSREEntryJ.length > 0) {
              objREstimateOnlineJ.createErrorTableRJS(jsnErrorRJSREEntryJ);
            }
          } else {
            busyDialog.close();
            sap.ui.commons.MessageBox.alert("No result found.\nPlease contact the system admin or try again later.");
          }
        } else {
          busyDialog.close();
          sap.ui.commons.MessageBox.alert("No result found.\nPlease contact the system admin or try again later.");
        }
      } catch (e) {
        busyDialog.close();
        sap.ui.commons.MessageBox.alert("Error occured while processing.\nPlease contact the system admin or try again later.");
      }
    },

    onlineerrorRJSSubmit: function(err) {
      errorfromServer(err);
    },

    onlineRJSSubmit: function(estmtIdRJS) {
      try {

        var valid = true;
        var oidDdlUnitPCodeRJSREEntryJ = sap.ui.getCore().byId("idDdlUnitPCodeRJSREEntryJ");
        var oidDtPkrEstimateDtRJSREEntryJ = sap.ui.getCore().byId("idDtPkrEstimateDtRJSREEntryJ");
        if (oidDdlUnitPCodeRJSREEntryJ.getValue() == '') {
          oidDdlUnitPCodeRJSREEntryJ.setPlaceholder("Required");
          oidDdlUnitPCodeRJSREEntryJ.setValueState(sap.ui.core.ValueState.Error);
          valid = false;
        }
        if (oidDtPkrEstimateDtRJSREEntryJ.getValue() == '') {
          oidDtPkrEstimateDtRJSREEntryJ.setPlaceholder("Required");
          oidDtPkrEstimateDtRJSREEntryJ.setValueState(sap.ui.core.ValueState.Error);
          valid = false;
        }
        if (!valid) {
          return;
        }
        var dtEstmt = oidDtPkrEstimateDtRJSREEntryJ.getValue().split('-');
        dtEstmt = dtEstmt[2] + '-' + dtEstmt[1] + '-' + dtEstmt[0] + 'T00:00:00';

        busyDialog.open();
        var urlToCall = serviceUrl15_old + "/Rep_Est_Sub?$filter=";
        urlToCall += "EstimId eq '" + estmtIdRJS + "'";
        urlToCall += " and Currencycode eq '' and UnitPartCode eq '' and SerialNo eq '' and Depot eq '' and SaleGrade eq '' and LesseeAuthAmt eq '' and JobType eq '' and Param3 eq '0000000000' and Param2 eq datetime'9999-09-09T00:00:00' and Param1 eq '' and IRep9 eq '' and IRep8 eq '' and IRep7 eq '' and IRep6 eq '' and IRep5 eq '' and IRep4 eq '' and IRep3 eq '' and IRep2 eq '' and IRep10 eq '' and IRep1 eq '' and EstimateDate eq datetime'" + dtEstmt + "' and FunctionalLoc eq '' and Param4 eq time'PT00H00M00S'";


        //var urlToCall = serviceUrl15_old + "/Repair_Estimates_Submit?$filter=";
        //urlToCall += "UserId eq 'REQMT15' and ";
        //urlToCall += "EstimId eq '"+ estmtIdRJS +"'";

        objUtilREstimate.doOnlineRequest(urlToCall, objREstimateOnlineJ.onlinesuccessRJSSubmit, objREstimateOnlineJ.onlineerrorRJSSubmit);
      } catch (e) {
        busyDialog.close();
        sap.ui.commons.MessageBox.alert("Error occured while processing.\nPlease contact the system admin or try again later.");
      }
    },

    createErrorTableRJS: function(jsnData) {
      var oidTblErrorREEntryJ = new sap.ui.table.Table("idErrorTableRepJJS", {
        selectionMode: sap.ui.table.SelectionMode.None,
        navigationMode: sap.ui.table.NavigationMode.None,
        layoutData: new sap.ui.layout.GridData({
          span: "L8 M12 S12",
          linebreak: false,
          margin: false
        }),
      }).addStyleClass('tblBorder');

      oidTblErrorREEntryJ.addColumn(new sap.ui.table.Column({
        label: new sap.ui.commons.Label({
          text: "Error Type",
        }),
        template: new sap.ui.commons.TextView().bindProperty("text", "Type"),
        hAlign: "Center",
        resizable: false,
        width: "90px"
      }));

      oidTblErrorREEntryJ.addColumn(new sap.ui.table.Column({
        label: new sap.ui.commons.Label({
          text: "Message"
        }),
        template: new sap.ui.commons.TextView().bindProperty("text", "Message"),
        resizable: false,
        hAlign: "Center"
      }));

      var oMdlErrTblREEntryJ = new sap.ui.model.json.JSONModel();
      oMdlErrTblREEntryJ.setData({
        modelData: jsnData
      });
      oidTblErrorREEntryJ.setVisibleRowCount(jsnData.length);
      oidTblErrorREEntryJ.setModel(oMdlErrTblREEntryJ);
      oidTblErrorREEntryJ.bindRows("/modelData");

      var oFrmCntnrREEntryJ = sap.ui.getCore().byId("idFrmCntnrRJSREEntryJ");
      var frmFirsRowREEntryJ = new sap.ui.layout.form.FormElement("idFrmElmntErrRJSREEntryJ", {
        fields: [oidTblErrorREEntryJ]
      });
      oFrmCntnrREEntryJ.addFormElement(frmFirsRowREEntryJ);

      /*var oFrmCntnrREEntryJ = sap.ui.getCore().byId("idFrmCntnrRsltREEntryJ");
      var frmElmntErrorTblREEntryJ = new sap.ui.layout.form.FormElement("idFrmElmtTblErrorREEntryJ",{
          fields: [oidTblErrorREEntryJ]
      });
      oFrmCntnrREEntryJ.addFormElement(frmElmntErrorTblREEntryJ);*/
    },

    createSuccessListRJS: function(jsnBindData) {
      /* if(sap.ui.getCore().byId("idRowRptrSuccessCMDt") != undefined){
      	sap.ui.getCore().byId("idRowRptrSuccessCMDt").destroy();
      } */
      var oRwRptrSuccesREEntryJ = new sap.ui.commons.RowRepeater("idRRRepairEstimJJS", {}).addStyleClass("marginTop10");
      oRwRptrSuccesREEntryJ.setDesign("Transparent");
      oRwRptrSuccesREEntryJ.setNumberOfRows(jsnBindData.length);
      //create the template cntrlSuccessREEntryJ that will be repeated and will display the data
      var oRwTmpltSuccesREEntryJ = new sap.ui.commons.layout.MatrixLayout({
        widths: ['25px', '95%']
      });

      var mtrxRwSuccessREEntryJ, mtrxCellSuccessREEntryJ, cntrlSuccessREEntryJ;
      // main matrix
      oRwTmpltSuccesREEntryJ.setWidth("70%");
      // main row
      mtrxRwSuccessREEntryJ = new sap.ui.commons.layout.MatrixLayoutRow();
      //image
      cntrlSuccessREEntryJ = new sap.ui.commons.Image();
      //cntrlSuccessREEntryJ.setHeight("60px");
      //cntrlSuccessREEntryJ.setWidth("50px");
      cntrlSuccessREEntryJ.bindProperty("src", "IconSrc");

      mtrxCellSuccessREEntryJ = new sap.ui.commons.layout.MatrixLayoutCell();
      mtrxCellSuccessREEntryJ.addContent(cntrlSuccessREEntryJ);
      mtrxRwSuccessREEntryJ.addCell(mtrxCellSuccessREEntryJ);

      //label 1
      cntrlSuccessREEntryJ = new sap.ui.commons.Label();
      cntrlSuccessREEntryJ.bindProperty("text", "Message");
      mtrxCellSuccessREEntryJ = new sap.ui.commons.layout.MatrixLayoutCell();
      mtrxCellSuccessREEntryJ.addContent(cntrlSuccessREEntryJ);
      mtrxRwSuccessREEntryJ.addCell(mtrxCellSuccessREEntryJ);

      // add row to matrix
      oRwTmpltSuccesREEntryJ.addRow(mtrxRwSuccessREEntryJ);

      var oMdlListSuccesREEntryJ = new sap.ui.model.json.JSONModel();
      oMdlListSuccesREEntryJ.setData(jsnBindData);
      oRwRptrSuccesREEntryJ.setModel(oMdlListSuccesREEntryJ);

      oRwRptrSuccesREEntryJ.bindRows("/", oRwTmpltSuccesREEntryJ);

      var oFrmCntnrREEntryJ = sap.ui.getCore().byId("idFrmCntnrRJSREEntryJ");
      var frmFirsRowREEntryJ = new sap.ui.layout.form.FormElement("idFrmElmntInfoLstRJSREEntryJ", {
        fields: [oRwRptrSuccesREEntryJ]
      });
      oFrmCntnrREEntryJ.addFormElement(frmFirsRowREEntryJ);

      /*var oFrmCntnrREEntryJ = sap.ui.getCore().byId("idFrmCntnrRsltREEntryJ");
      var frmElmntSuccesREEntryJ = new sap.ui.layout.form.FormElement("idFrmElmtSuccesREEntryJ",{
          fields: [oRwRptrSuccesREEntryJ]
      });
      oFrmCntnrREEntryJ.addFormElement(frmElmntSuccesREEntryJ);*/
    },









    //JOINT SURVEY CASE ONLINE
    onlinesuccessfunJointSurveyIntoExcel: function(resultdata, response) {
      busyDialog.close();
      jsnLineItemREEntryJ.length = 0;
      jointtypeSel = true;

      if (resultdata != undefined) {
        var jobtype = sap.ui.getCore().byId("idDdlJobTypeREEntryJ").getSelectedKey();
        var serialnoo = sap.ui.getCore().byId("idSerailNoRESearchJ").getValue();
        var depot = sap.ui.getCore().byId("idTFDepotRESearchJ").getValue();

        sap.ui.getCore().byId("idlblEstmtHdrREEntryJ").setText(jobtype + " for " + serialnoo + " at " + depot);
        if (resultdata.results.length > 0) {
          /*excelData = new Array(resultdata.results.length);

          for (var i = 0; i < resultdata.results.length; i++) {
          	excelData[i] = new Array(13);
          }
          var chkedArr = jQuery.grep(resultdata.results, function(element, index){
          		return element.UnitPartCode == "M";
          	});
          //CREATE CONTAINER LAYPUT FOR REFER JOINT SURVAY
          if(chkedArr.length > 0){
          	//objcrntRJSREEntryJ = new RepairEstimateEntryReferJS();
          	//objcrntRJSREEntryJ.createFrmRepairEstimateEntryRJS();
          	jsnLineItemRJSREEntryJ.length = 0;
          }*/
          var iter = 0;
          excelDataJ1 = [];
          excelDataJ2 = [];
          //var upcIn = sap.ui.getCore().byId("idDdlUnitPCodeREEntryJIn").getSelectedKey();
          // By default, check both zero indicator checkboxes to true
          sap.ui.getCore().byId("idCheckBoxZeroCostJ1").setChecked(true);  // MACALPHA19032018_10+
          sap.ui.getCore().byId("idCheckBoxZeroCostJ2").setChecked(true);  // MACALPHA19032018_10+
	      // MACALPHA19032018_10+
	      if(resultdata.results.length != 0){
	    	  sap.ui.getCore().byId("idTFNotes2REEntryJ").setValue(resultdata.results[0].Notes2);
	    	  sap.ui.getCore().byId("idTFNotes3REEntryJ").setValue(resultdata.results[0].Notes3);
	    	  sap.ui.getCore().byId("idTFNotes4REEntryJ").setValue(resultdata.results[0].Notes4);
	    	  sap.ui.getCore().byId("idTFNotes5REEntryJ").setValue(resultdata.results[0].Notes5);
	      }
	      // MACALPHA19032018_10+
          for (var indx in resultdata.results) {
            sap.ui.getCore().byId("idTFCWREEntryJ").setValue(resultdata.results[0].ContainerType);
            if (resultdata.results[indx].UnitPartCode == "C") {
              sap.ui.getCore().byId("idDdlUnitPCodeREEntryJ").setSelectedKey(resultdata.results[indx].UnitPartCode);
              sap.ui.getCore().byId("idDdlUnitPCodeREEntryJIn").setSelectedKey(resultdata.results[indx].UnitPartCode);
              sap.ui.getCore().byId("idDdlSaleGradeREEntryJ").setSelectedKey(resultdata.results[indx].SalesGrade);
              sap.ui.getCore().byId("idTFLeaseAuthAmtREEntryJ").setValue(resultdata.results[indx].LesseeAuthorisedAmount);
              //sap.ui.getCore().byId("idTFCurrnCodeREEntryJ").setValue(resultdata.results[indx].CurrencyCode);
              //sap.ui.getCore().byId("idDdlJobTypeREEntryJ").setSelectedKey("Joint Survey");
              var cnvrtdt = resultdata.results[indx].WorkCreatedDate;
              var datenw = cnvrtdt.split('(')[1].split(')')[0];
              cnvrtdt = new Date(parseInt(datenw)).format("dd-mm-yyyy");

              //sap.ui.getCore().byId("idDtPkrEstimateDtREEntryJ").setValue(cnvrtdt);
              //selEstmtId = resultdata.results[indx].EstimateNumber;
              excelDataJ1.push([]);
              excelDataJ1[iter][0] = resultdata.results[indx].LocationCode;
              excelDataJ1[iter][1] = resultdata.results[indx].ComponentCode;
              excelDataJ1[iter][2] = resultdata.results[indx].DamageCode;
              excelDataJ1[iter][3] = resultdata.results[indx].MaterialCode;
              excelDataJ1[iter][4] = resultdata.results[indx].RepairCode;
              excelDataJ1[iter][5] = resultdata.results[indx].RepairLength;
              excelDataJ1[iter][6] = resultdata.results[indx].RepairWidth;
              excelDataJ1[iter][7] = resultdata.results[indx].Quantity;
              excelDataJ1[iter][8] = resultdata.results[indx].ManHours;
              excelDataJ1[iter][9] = resultdata.results[indx].MaterialCost;
              //excelDataJ1[indx][10] = resultdata.results[indx].LabourRate;

              var selectedJobType = sap.ui.getCore().byId("idDdlJobTypeREEntryJ").getSelectedKey();
        			if(selectedJobType == "Joint Survey" || selectedJobType == "Original"){
        				globalLabCostC = resultdata.results[indx].LabourRate; // MACALPHA19032018_10
        			}else{
                globalLabCostC = globalLabCostCFromValidate;
              }

              // If any line items found, uncheck the checkbox
              sap.ui.getCore().byId("idCheckBoxZeroCostJ1").setChecked(false);  // MACALPHA19032018_10+
              excelDataJ1[iter][10] = resultdata.results[indx].BulletinNumber;
              excelDataJ1[iter][11] = resultdata.results[indx].Responsibility;
              iter = iter + 1;

            }
          }

          iter = 0;
          for (var indx in resultdata.results) {
            if (resultdata.results[indx].UnitPartCode == "M") {
              sap.ui.getCore().byId("idDdlUnitPCodeREEntryJ").setSelectedKey(resultdata.results[indx].UnitPartCode);
              sap.ui.getCore().byId("idDdlUnitPCodeREEntryJIn").setSelectedKey(resultdata.results[indx].UnitPartCode);
              sap.ui.getCore().byId("idDdlSaleGradeREEntryJ").setSelectedKey(resultdata.results[indx].SalesGrade);
              sap.ui.getCore().byId("idTFLeaseAuthAmtREEntryJ").setValue(resultdata.results[indx].LesseeAuthorisedAmount);
              //sap.ui.getCore().byId("idTFCurrnCodeREEntryJ").setValue(resultdata.results[indx].CurrencyCode);
              //sap.ui.getCore().byId("idDdlJobTypeREEntryJ").setSelectedKey("Joint Survey");
              var cnvrtdt = resultdata.results[indx].WorkCreatedDate;
              var datenw = cnvrtdt.split('(')[1].split(')')[0];
              cnvrtdt = new Date(parseInt(datenw)).format("dd-mm-yyyy");

              //sap.ui.getCore().byId("idDtPkrEstimateDtREEntryJ").setValue(cnvrtdt);
              //selEstmtId = resultdata.results[indx].EstimateNumber;
              excelDataJ2.push([]);
              excelDataJ2[iter][0] = resultdata.results[indx].LocationCode;
              excelDataJ2[iter][1] = resultdata.results[indx].ComponentCode;
              excelDataJ2[iter][2] = resultdata.results[indx].DamageCode;
              excelDataJ2[iter][3] = resultdata.results[indx].MaterialCode;
              excelDataJ2[iter][4] = resultdata.results[indx].RepairCode;
              excelDataJ2[iter][5] = resultdata.results[indx].RepairLength;
              excelDataJ2[iter][6] = resultdata.results[indx].RepairWidth;
              excelDataJ2[iter][7] = resultdata.results[indx].Quantity;
              excelDataJ2[iter][8] = resultdata.results[indx].ManHours;
              excelDataJ2[iter][9] = resultdata.results[indx].MaterialCost;
              //excelDataJ1[indx][10] = resultdata.results[indx].LabourRate;

              var selectedJobType = sap.ui.getCore().byId("idDdlJobTypeREEntryJ").getSelectedKey();
        			if(selectedJobType == "Joint Survey" || selectedJobType == "Original"){
        				globalLabCostM = resultdata.results[indx].LabourRate; // MACALPHA19032018_10
        			}else{
                globalLabCostM = globalLabCostMFromValidate;
              }

              // globalLabCostM = resultdata.results[indx].LabourRate; // MACALPHA19032018_10
              // If any line items found, uncheck the checkbox
              sap.ui.getCore().byId("idCheckBoxZeroCostJ2").setChecked(false);  // MACALPHA19032018_10+
              excelDataJ2[iter][10] = resultdata.results[indx].BulletinNumber;
              excelDataJ2[iter][11] = resultdata.results[indx].Responsibility;
              iter = iter + 1;

            }
          }

          var carcassTitle = "Repair Lines for Carcass - Labour Rate : " + globalLabCostC + " " + globalLabCostCurrency;
          var machineryTitle = "Repair Lines for Machinery - Labour Rate : " + globalLabCostM + " " + globalLabCostCurrency;

          sap.ui.getCore().byId("idlblhdrTblREEntryJ1").setText(carcassTitle);
          sap.ui.getCore().byId("idlblhdrTblREEntryJ2").setText(machineryTitle);

          /*else if(resultdata.results[indx].UnitPartCode == "M"){
						sap.ui.getCore().byId("idDdlUnitPCodeREEntryJ").setSelectedKey(resultdata.results[indx].UnitPartCode);
						sap.ui.getCore().byId("idDdlUnitPCodeREEntryJIn").setSelectedKey(resultdata.results[indx].UnitPartCode);
						sap.ui.getCore().byId("idDdlSaleGradeREEntryJ").setSelectedKey(resultdata.results[indx].SalesGrade);
						sap.ui.getCore().byId("idTFLeaseAuthAmtREEntryJ").setValue(resultdata.results[indx].LesseeAuthorisedAmount);
						//sap.ui.getCore().byId("idTFCurrnCodeRJSREEntryJ").setValue(resultdata.results[indx].CurrencyCode);
						sap.ui.getCore().byId("idDdlJobTypeREEntryJ").setSelectedKey("Joint Survey");

						var cnvrtdtRJS = resultdata.results[indx].WorkCreatedDate;
						var datenw = cnvrtdtRJS.split('(')[1].split(')')[0];
						cnvrtdtRJS=  new Date(parseInt(datenw)).format("dd-mm-yyyy");

						sap.ui.getCore().byId("idDtPkrEstimateDtREEntryJ").setValue(cnvrtdtRJS);

						excelData[indx][0] = resultdata.results[indx].LocationCode;
			 			excelData[indx][1] = resultdata.results[indx].ComponentCode;
			 			excelData[indx][2] = resultdata.results[indx].DamageCode;
			 			excelData[indx][3] = resultdata.results[indx].MaterialCode;
			 			excelData[indx][4] = resultdata.results[indx].RepairCode;
			 			excelData[indx][5] = resultdata.results[indx].RepairLength;
			 			excelData[indx][6] = resultdata.results[indx].RepairWidth;
			 			excelData[indx][7] = resultdata.results[indx].Quantity;
			 			excelData[indx][8] = resultdata.results[indx].ManHours;
			 			excelData[indx][9] = resultdata.results[indx].MaterialCost;
			 			//excelData[indx][10] = resultdata.results[indx].LabourRate;
			 			excelData[indx][10] = resultdata.results[indx].BulletinNumber;
			 			excelData[indx][11] = resultdata.results[indx].Responsibility;


					}*/
          if (excelDataJ1.length == 0 && excelDataJ2.length == 0) {
            sap.ui.commons.MessageBox.alert("No Estimate found for joint survey for the Unit Number.");
            var bus = sap.ui.getCore().getEventBus();
            bus.publish("nav", "back");

          } else {
            if (excelDataJ1.length != 0) {
              oExcelGridJ1.loadData(excelDataJ1);
              sap.ui.getCore().byId("idFlxTblREEntryJLines1").setVisible(true);
            } else {
              sap.ui.getCore().byId("idFlxTblREEntryJLines1").setVisible(true);
            }

            if(globalEstimateIsReefer == false){
                sap.ui.getCore().byId("idFlxTblREEntryJLines2").setVisible(false);
            }else{
              if (excelDataJ2.length != 0) {
                oExcelGridJ2.loadData(excelDataJ2);
                sap.ui.getCore().byId("idFlxTblREEntryJLines2").setVisible(true);
              } else {
                sap.ui.getCore().byId("idFlxTblREEntryJLines2").setVisible(true);
              }
            }

          }

        } else {
          sap.ui.commons.MessageBox.alert("No Estimate found for joint survey for the Unit Number.");
          var bus = sap.ui.getCore().getEventBus();
          bus.publish("nav", "back");
        }
      } else {
        sap.ui.commons.MessageBox.alert("No Estimate found for joint survey for the Unit Number.");
        var bus = sap.ui.getCore().getEventBus();
        bus.publish("nav", "back");
      }
    },









    //JOINT SURVEY CASE ONLINE
    onlinesuccessfunJointSurvey: function(resultdata, response) {
      busyDialog.close();
      jsnLineItemREEntryJ.length = 0;
      jointtypeSel = true;

      if (resultdata != undefined) {
        if (resultdata.results.length > 0) {
          var chkedArr = jQuery.grep(resultdata.results, function(element, index) {
            return element.UnitPartCode == "M";
          });
          //CREATE CONTAINER LAYPUT FOR REFER JOINT SURVAY
          if (chkedArr.length > 0) {
            objcrntRJSREEntryJ = new RepairEstimateEntryReferJS();
            objcrntRJSREEntryJ.createFrmRepairEstimateEntryRJS();
            jsnLineItemRJSREEntryJ.length = 0;
          }
          for (var indx in resultdata.results) {
            if (resultdata.results[indx].UnitPartCode == "C") {
              sap.ui.getCore().byId("idDdlUnitPCodeREEntryJ").setSelectedKey(resultdata.results[indx].UnitPartCode);
              sap.ui.getCore().byId("idDdlSaleGradeREEntryJ").setSelectedKey(resultdata.results[indx].SalesGrade);
              sap.ui.getCore().byId("idTFLeaseAuthAmtREEntryJ").setValue(resultdata.results[indx].LesseeAuthorisedAmount);
              //sap.ui.getCore().byId("idTFCurrnCodeREEntryJ").setValue(resultdata.results[indx].CurrencyCode);

              var cnvrtdt = resultdata.results[indx].WorkCreatedDate;
              var datenw = cnvrtdt.split('(')[1].split(')')[0];
              cnvrtdt = new Date(parseInt(datenw)).format("dd-mm-yyyy");

              sap.ui.getCore().byId("idDtPkrEstimateDtREEntryJ").setValue(cnvrtdt);
              //selEstmtId = resultdata.results[indx].EstimateNumber;

              jsnLineItemREEntryJ.push({
                "checked": false,
                "LineItem": resultdata.results[indx].LineItem,
                "sectionKey": "",
                "sectionText": "",
                "LocationKey": resultdata.results[indx].LocationCode,
                "LocationText": resultdata.results[indx].LocationCode,
                "ComponentKey": resultdata.results[indx].ComponentCode,
                "ComponentText": resultdata.results[indx].ComponentCode,
                "DamageKey": resultdata.results[indx].DamageCode,
                "DamageText": resultdata.results[indx].DamageCode,
                "RepairKey": resultdata.results[indx].RepairCode,
                "RepairText": resultdata.results[indx].RepairCode,
                "MaterialKey": resultdata.results[indx].MaterialCode,
                "MaterialText": resultdata.results[indx].MaterialCode,
                "MaterialCost": resultdata.results[indx].MaterialCost,
                "ManHours": resultdata.results[indx].ManHours,
                "RepairLength": resultdata.results[indx].RepairLength,
                "RepairWidth": resultdata.results[indx].RepairWidth,
                "Quantity": resultdata.results[indx].Quantity,
                responsibility: [],
                "ResponsibilityKey": resultdata.results[indx].Responsibility,
                "ResponsibilityText": resultdata.results[indx].Responsibility,
                "LabourRate": resultdata.results[indx].LabourRate,
                "TechBulletin": resultdata.results[indx].BulletinNumber,
                "DataInserted": true,
              });
            } else if (resultdata.results[indx].UnitPartCode == "M") {
              sap.ui.getCore().byId("idDdlUnitPCodeRJSREEntryJ").setSelectedKey(resultdata.results[indx].UnitPartCode);
              sap.ui.getCore().byId("idDdlSaleGradeRJSREEntryJ").setSelectedKey(resultdata.results[indx].SalesGrade);
              sap.ui.getCore().byId("idTFLeaseAuthAmtRJSREEntryJ").setValue(resultdata.results[indx].LesseeAuthorisedAmount);
              //sap.ui.getCore().byId("idTFCurrnCodeRJSREEntryJ").setValue(resultdata.results[indx].CurrencyCode);
              sap.ui.getCore().byId("idDdlJobTypeRJSREEntryJ").setSelectedKey("Joint Survey");

              var cnvrtdtRJS = resultdata.results[indx].WorkCreatedDate;
              var datenw = cnvrtdtRJS.split('(')[1].split(')')[0];
              cnvrtdtRJS = new Date(parseInt(datenw)).format("dd-mm-yyyy");

              sap.ui.getCore().byId("idDtPkrEstimateDtRJSREEntryJ").setValue(cnvrtdtRJS);

              jsnLineItemRJSREEntryJ.push({
                "checked": false,
                "LineItem": resultdata.results[indx].LineItem,
                "sectionKey": "",
                "sectionText": "",
                "LocationKey": resultdata.results[indx].LocationCode,
                "LocationText": resultdata.results[indx].LocationCode,
                "ComponentKey": resultdata.results[indx].ComponentCode,
                "ComponentText": resultdata.results[indx].ComponentCode,
                "DamageKey": resultdata.results[indx].DamageCode,
                "DamageText": resultdata.results[indx].DamageCode,
                "RepairKey": resultdata.results[indx].RepairCode,
                "RepairText": resultdata.results[indx].RepairCode,
                "MaterialKey": resultdata.results[indx].MaterialCode,
                "MaterialText": resultdata.results[indx].MaterialCode,
                "MaterialCost": resultdata.results[indx].MaterialCost,
                "ManHours": resultdata.results[indx].ManHours,
                "RepairLength": resultdata.results[indx].RepairLength,
                "RepairWidth": resultdata.results[indx].RepairWidth,
                "Quantity": resultdata.results[indx].Quantity,
                responsibility: [],
                "ResponsibilityKey": resultdata.results[indx].Responsibility,
                "ResponsibilityText": resultdata.results[indx].Responsibility,
                "LabourRate": resultdata.results[indx].LabourRate,
                "TechBulletin": resultdata.results[indx].BulletinNumber,
                "DataInserted": true,
              });
            }
          }

          //UPDATE FOR RESPONSIBILITY IN TABLE
          var oTblLineItemREEntryJ = sap.ui.getCore().byId("idTblLineItemREEntryJ");
          if (jsnLineItemREEntryJ.length < 6) {
            oTblLineItemREEntryJ.setNavigationMode(sap.ui.table.NavigationMode.None);
          } else {
            oTblLineItemREEntryJ.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
          }
          var dataReponsibleREEntryJ = oMdlGlblDDLREEntryJ.getData().responsibility;
          for (var i = 0; i < jsnLineItemREEntryJ.length; i++) {
            jsnLineItemREEntryJ[i].responsibility.push({
              "text": "",
              "key": ""
            });
            for (var inx in dataReponsibleREEntryJ) {
              jsnLineItemREEntryJ[i].responsibility.push({
                "text": dataReponsibleREEntryJ[inx].text,
                "key": dataReponsibleREEntryJ[inx].key
              });
            }
          }
          oMdlLineItemREEntryJ.updateBindings();

          //joint survey refer case
          if (jsnLineItemRJSREEntryJ.length > 0) {
            //objcrntRJSREEntryJ = new RepairEstimateEntryReferJS();
            //objcrntRJSREEntryJ.createFrmRepairEstimateEntryRJS();

            var oidTblLineItemRJSREEntryJ = sap.ui.getCore().byId("idTblLineItemRJSREEntryJ");
            if (jsnLineItemRJSREEntryJ.length < 6) {
              oidTblLineItemRJSREEntryJ.setNavigationMode(sap.ui.table.NavigationMode.None);
            } else {
              oidTblLineItemRJSREEntryJ.setNavigationMode(sap.ui.table.NavigationMode.Paginator);
            }
            //UPDATE FOR RESPONSIBILITY IN TABLE REFER CASE
            for (var i = 0; i < jsnLineItemRJSREEntryJ.length; i++) {
              jsnLineItemRJSREEntryJ[i].responsibility.push({
                "text": "",
                "key": ""
              });
              for (var inx in dataReponsibleREEntryJ) {
                jsnLineItemRJSREEntryJ[i].responsibility.push({
                  "text": dataReponsibleREEntryJ[inx].text,
                  "key": dataReponsibleREEntryJ[inx].key
                });
              }
            }
            oMdlLineItemRJSREEntryJ.updateBindings();
          }
        } else {
          sap.ui.commons.MessageBox.alert("No Estimate found for joint survey for the Unit Number.");
        }
      } else {
        sap.ui.commons.MessageBox.alert("No Estimate found for joint survey for the Unit Number.");
      }
    },

    onlineerrorfunJointSurvey: function(err) {
      //REMOVE BELOW TWO LINE AFTER WORKING JOINT SURVEY URL
      //objcrntRJSREEntryJ = new RepairEstimateEntryReferJS();
      //objcrntRJSREEntryJ.createFrmRepairEstimateEntryRJS();
      errorfromServer(err);
    },

    onlinefunJointSurvey: function() {
      try {
        busyDialog.open();
        var urlToCall = serviceUrl15_old + "/JS_WORK_ORDER_DETAILS?$filter=";
        //urlToCall += "UserId eq 'REQMT15' and ";
        urlToCall += "SerialNo eq '" + unitNo + "'";
        objUtilREstimate.doOnlineRequest(urlToCall, objREstimateOnlineJ.onlinesuccessfunJointSurveyIntoExcel, objREstimateOnlineJ.onlineerrorfunJointSurvey);
      } catch (e) {
        busyDialog.close();
        sap.ui.commons.MessageBox.alert("Error occured while processing.\nPlease contact the system admin or try again later.");
      }
    },

  });

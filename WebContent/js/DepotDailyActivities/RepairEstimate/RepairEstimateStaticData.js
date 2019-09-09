/******** NP *******/

/* MACALPHA19032018 - Changes done by Seyed Ismail on 19.03.2018 for Alpha Changes
1. Remove Unit Part Code information MACALPHA19032018_1
2. Add Lessor Survey, Joint Survey and remove additional, superseding, pre sales, pre delivery MACALPHA19032018_2
*/

jQuery.sap.require("sap.ui.model.json.JSONModel");
//PART CODE
var omdlGlobalRESData = new sap.ui.model.json.JSONModel();
var jsnGlobalRESData = {};

jsnGlobalRESData.UnitPartCode =[];
jsnGlobalRESData.UnitPartCode.push({"text":"","key":"","textkey":""});
jsnGlobalRESData.UnitPartCode.push({"text":"C","key":"C","textkey":"C"});
jsnGlobalRESData.UnitPartCode.push({"text":"M" ,"key":"M","textkey":"M"});

//JOB TYPE
jsnGlobalRESData.JobType =[];
jsnGlobalRESData.JobType.push({"text":"","key":"","textkey":""});
jsnGlobalRESData.JobType.push({"text":"Original","key":"Original","textkey":"Original"});
//jsnGlobalRESData.JobType.push({"text":"Additional" ,"key":"Additional","textkey":"Additional"});	 // MACALPHA19032018_2-
//jsnGlobalRESData.JobType.push({"text":"Superseding","key":"Superseding","textkey":"Superseding"}); // MACALPHA19032018_2-
jsnGlobalRESData.JobType.push({"text":"Joint Survey" ,"key":"Joint Survey","textkey":"Joint Survey"}); // MACALPHA19032018_2+
jsnGlobalRESData.JobType.push({"text":"Lessor Survey" ,"key":"Lessor Survey","textkey":"Lessor Survey"}); // MACALPHA19032018_2+
//jsnGlobalRESData.JobType.push({"text":"Pre-Sales" ,"key":"Pre-Sales","textkey":"Pre-Sales"});	// MACALPHA19032018_2-
//jsnGlobalRESData.JobType.push({"text":"Pre-Delivery","key":"Pre-Delivery","textkey":"Pre-Delivery"}); // // MACALPHA19032018_2+

//SALE GRADE
jsnGlobalRESData.SaleGrade =[];
jsnGlobalRESData.SaleGrade.push({"text":"","key":"","textkey":""});
jsnGlobalRESData.SaleGrade.push({"text":"1","key":"1","textkey":"1"});
jsnGlobalRESData.SaleGrade.push({"text":"2","key":"2","textkey":"2"});
jsnGlobalRESData.SaleGrade.push({"text":"3","key":"3","textkey":"3"});
//jsnGlobalRESData.SaleGrade.push({"text":"4","key":"4","textkey":"4"});
//jsnGlobalRESData.SaleGrade.push({"text":"5","key":"5","textkey":"5"});
//jsnGlobalRESData.SaleGrade.push({"text":"6","key":"6","textkey":"6"});

//RESPONSIBILITY
jsnGlobalRESData.Responsibility =[];
jsnGlobalRESData.Responsibility.push({"text":"","key":"","textkey":""});
jsnGlobalRESData.Responsibility.push({"text":"J ? Joint Survey Allocation Assigned","key":"Jad","textkey":"J ? Joint Survey Allocation Assigned"});
jsnGlobalRESData.Responsibility.push({"text":"R ? Lessee Refused","key":"R","textkey":"R ? Lessee Refused"});
jsnGlobalRESData.Responsibility.push({"text":"O ? Owner / Lessor","key":"O","textkey":"O ? Owner / Lessor"});
jsnGlobalRESData.Responsibility.push({"text":"U ? User / Lessee","key":"U","textkey":"U ? User / Lessee"});
jsnGlobalRESData.Responsibility.push({"text":"H ? Manufacturing Defect","key":"H","textkey":"H ? Manufacturing Defect"});

omdlGlobalRESData.setData(jsnGlobalRESData);

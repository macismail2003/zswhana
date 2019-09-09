jQuery.sap.require("sap.ui.core.IconPool");

var oCDASHM1GeneralJsonStatus = [];
oCDASHM1GeneralJsonStatus.push({
	key : "",
	text : ""
});
oCDASHM1GeneralJsonStatus.push({
	key : "WEST",
	text : "WEST"
});
oCDASHM1GeneralJsonStatus.push({
	key : "AWAP",
	text : "AWAP"
});
oCDASHM1GeneralJsonStatus.push({
	key : "AUTH",
	text : "AUTH"
});
oCDASHM1GeneralJsonStatus.push({
	key : "HOLD",
	text : "HOLD"
});
oCDASHM1GeneralJsonStatus.push({
	key : "AVLB",
	text : "AVLB"
});
oCDASHM1GeneralJsonStatus.push({
	key : "SALE",
	text : "SALE"
});

var oCDASHM1GeneralJsonFrequency = [];
/*oCDASHM1GeneralJsonFrequency.push({
	key : "",
	text : ""
});*/

/*oCDASHM1GeneralJsonFrequency.push({
	key : "N",
	text : "None"
});

oCDASHM1GeneralJsonFrequency.push({
	key : "D",
	text : "Daily"
});*/

oCDASHM1GeneralJsonFrequency.push({
	key : "W",
	text : "Weekly"
});

oCDASHM1GeneralJsonFrequency.push({
	key : "B",
	text : "Fortnightly"
});

/*oCDASHM1GeneralJsonFrequency.push({
	key : "M",
	text : "Monthly"
});*/

var oCDASHMJsonEstimatesPending = [];

oCDASHMJsonEstimatesPending.push({
	isChecked : false,
	sno : "1",

	serialno : "CXDU1004790",

	estimateno : "10001175224",
	estimatetype : "Original",
	depotcode : "1547",
	depotname : "Eng Kong Containers",
	materialcode : "20' Box Standard",

	usercost : parseFloat("300.00"),
	costcurrency : "USD",
	offhirelocation : "China, Qingdao",
	datesubmitted : "11/01/2017",
	status : "Overdue - Awaiting Approval",
	lastaction : "Reminder sent on 12 Feb 2017",
	approve : "Approve",
	downloadestimate : "Download Estimate",
	image: "images/photo.png"
});

oCDASHMJsonEstimatesPending.push({
	isChecked : false,
	sno : "2",
	estimateno : "10001163922",
	estimatetype : "Joint Survey",
	depotcode : "1537",
	depotname : "Express Repair Services PVT. LTD.",
	materialcode : "20' Box Standard",
	serialno : "CXDU1004887",
	usercost : parseFloat("100.05"),
	costcurrency : "USD",
	offhirelocation : "US, Florida",
	datesubmitted : "21/01/2017",
	status : "Awaiting Approval",
	lastaction : "Estimate sent on 27 Jan 2017",
	approve : "Approve",
	downloadestimate : "Download Estimate",
	image: ""
});

oCDASHMJsonEstimatesPending.push({
	isChecked : false,
	sno : "3",
	estimateno : "10001174894",
	estimatetype : "Original",
	depotcode : "1537",
	depotname : "Express Repair Services PVT. LTD.",
	materialcode : "20' Box Standard",
	serialno : "CXDU1006010",
	usercost : parseFloat("788.71"),
	costcurrency : "USD",
	offhirelocation : "Hamburg, Germany",
	datesubmitted : "03/09/2003",
	status : "Awaiting Approval",
	lastaction : "Estimate sent on 01 Aug 2013",
	approve : "Approve",
	downloadestimate : "Download Estimate",
	image: ""
});


var oCDASHMJsonEstimatesApproved = [];

oCDASHMJsonEstimatesApproved.push({
	isChecked : false,
	sno : "1",
	estimateno : "Estimate 1",
	estimatetype : "Original",
	depotcode : "1547",
	depotname : "Eng Kong Containers",
	materialcode : "20' Box Standard",
	serialno : "GESU4346336",
	usercost : parseFloat("300.00"),
	costcurrency : "USD",
	offhirelocation : "China, Qingdao",
	datesubmitted : "11/01/2017",
	status : "Overdue - Awaiting Approval",
	lastaction : "Reminder sent on 12 Feb 2017",
	//approve : "Approve",
	downloadestimate : "Download Estimate",
	image: "images/photo.png"
});

oCDASHMJsonEstimatesApproved.push({
	isChecked : false,
	sno : "2",
	estimateno : "Estimate 2",
	estimatetype : "Joint Survey",
	depotcode : "1537",
	depotname : "Express Repair Services PVT. LTD.",
	materialcode : "20' Box Standard",
	serialno : "GESU8876578",
	usercost : parseFloat("100.05"),
	costcurrency : "USD",
	offhirelocation : "US, Florida",
	datesubmitted : "21/01/2017",
	status : "Awaiting Approval",
	lastaction : "Estimate sent on 27 Jan 2017",
	//approve : "Approve",
	downloadestimate : "Download Estimate",
	image: ""
});

/* CDASHM2 Header Details */
var oCDASHM2JsonHeaderDetails = {};

oCDASHM2JsonHeaderDetails.depot = "Qingdao Ocean & Great Asia Logistic (1405)";
oCDASHM2JsonHeaderDetails.city = "Qingdao";
oCDASHM2JsonHeaderDetails.lease = "128713";
oCDASHM2JsonHeaderDetails.unittype = "40' High Cube Standard (BW4)";
oCDASHM2JsonHeaderDetails.uom = "CMT";
oCDASHM2JsonHeaderDetails.ohdate = "28 Dec 2007";
oCDASHM2JsonHeaderDetails.gidate = "05 Jun 2016";
oCDASHM2JsonHeaderDetails.estdate = "08 Jun 2016";
oCDASHM2JsonHeaderDetails.estimate = "1009877";
oCDASHM2JsonHeaderDetails.currency = "CNY";
oCDASHM2JsonHeaderDetails.age = "2";
oCDASHM2JsonHeaderDetails.redelref = "585418";

oCDASHM2JsonHeaderDetails.serial = "GESU4346336";
oCDASHM2JsonHeaderDetails.recordtype = "GateIn";
oCDASHM2JsonHeaderDetails.mnrstatus = "Pending User Approval";
oCDASHM2JsonHeaderDetails.lastactionfirst = "Latest: Reminder Sent on 07 Jan 15";
oCDASHM2JsonHeaderDetails.lastaction = "Latest: Reminder Sent on 07 Jan 15\nSecond: Billed $200 to customer on 15 Jan 15\nThird:�so on";

/* CDASHM2 Estimate Lines
var oCDASHM2JsonEstimateLines = [];

oCDASHM2JsonEstimateLines.push({
	sno : "1",

	component : "Markings, Other",
	damage : "Customers Markings",
	repair : "Remove Markings",
	location : "Whole Container",

	locationiso : "XXXX",
	material : "SK",

	length : "0",
	width : "0",
	qty : "10",

	hrs : "0.5",
	labcost : "12",
	matcost : "39.43",
	total : "51.43",
	resp : "U",

});

oCDASHM2JsonEstimateLines.push({
	sno : "2",

	component : "Flooring, Plywood Plank",
	damage : "Oil Stains",
	repair : "Chemical Clean",
	location : "Floor Whole",

	locationiso : "BXXX",
	material : "SK",

	length : "0",
	width : "0",
	qty : "1",

	hrs : "0",
	labcost : "0",
	matcost : "257.69",
	total : "257.69",
	resp : "O",

});

oCDASHM2JsonEstimateLines.push({
	sno : "3",

	component : "Cross Member Assembly",
	damage : "Broken/Split",
	repair : "Insert",
	location : "Understructure Left",

	locationiso : "UL1N",
	material : "SK",

	length : "15",
	width : "0",
	qty : "1",

	hrs : "1",
	labcost : "24",
	matcost : "31.54",
	total : "55.54",
	resp : "I",

});

oCDASHM2JsonEstimateLines.push({
	sno : "4",

	component : "Panel Assembly",
	damage : "Bowed",
	repair : "Straighten",
	location : "Roof/Top Whole",

	locationiso : "TX0N",
	material : "SK",

	length : "150",
	width : "90",
	qty : "1",

	hrs : "3",
	labcost : "72",
	matcost : "0",
	total : "72",
	resp : "S",

});

oCDASHM2JsonEstimateLines.push({
	sno : "",

	component : "",
	damage : "",
	repair : "",
	location : "",

	locationiso : "",
	material : "",

	length : "",
	width : "",
	qty : "",

	hrs : "Total Cost",
	labcost : "108",
	matcost : "328.66",
	total : "436.66",
	resp : "",

});

oCDASHM2JsonEstimateLines.push({
	sno : "",

	component : "",
	damage : "",
	repair : "",
	location : "",

	locationiso : "",
	material : "",

	length : "",
	width : "",
	qty : "",

	hrs : "Tax",
	labcost : "",
	matcost : "",
	total : "",
	resp : "",

});

oCDASHM2JsonEstimateLines.push({
	sno : "",

	component : "",
	damage : "",
	repair : "",
	location : "",

	locationiso : "",
	material : "",

	length : "",
	width : "",
	qty : "",

	hrs : "Final Total",
	labcost : "108",
	matcost : "328.66",
	total : "436.66",
	resp : "",

}); */

/* CDASHM2 Summary Lines */

var oCDASHM2JsonSummaryLines = [];
oCDASHM2JsonSummaryLines.push({
	type : "Total Seacover",
	labcost : "24",
	matcost : "31.54",
	total : "55.54"
});

oCDASHM2JsonSummaryLines.push({
	type : "Total User Cost",
	labcost : "12",
	matcost : "39.43",
	total : "51.43"
});

oCDASHM2JsonSummaryLines.push({
	type : "Total Owner Cost",
	labcost : "0",
	matcost : "257.69",
	total : "257.69"
});

oCDASHM2JsonSummaryLines.push({
	type : "CW Repair Cost",
	labcost : "",
	matcost : "",
	total : "50"
});

/* CDASHM2 Header Lines

var oCDASHM2JsonHeaderLines = [];
oCDASHM2JsonHeaderLines.push({
	label1 : "Customer",
	value1 : "CMA CGM (100173)",
	label2 : "Estimate No.",
	value2 : "10009877",
	label3 : "Currency",
	value3 : "CNY",
	label4 : "Unit Grade",
	value4 : "3",
	label5 : "Measure",
	value5 : "CMT"
});

oCDASHM2JsonHeaderLines.push({
	label1 : "Unit Type",
	value1 : "40' High Cube Standard (BW4)",
	label2 : "Gate OUT Date",
	value2 : "05 Jan 2017",
	label3 : "On Hire Loc",
	value3 : "IN-BOM",
	label4 : "TB No",
	value4 : "1234 (Decal at Owner Cost)",
	label5 : "Lab. Rate",
	value5 : "4"
});

oCDASHM2JsonHeaderLines.push({
	label1 : "Lease No",
	value1 : "128713",
	label2 : "Gate IN Date",
	value2 : "05 Jan 2017",
	label3 : "Off Hire Loc",
	value3 : "SEA-SG-SIN-1547",
	label4 : "UN No & Last Cargo",
	value4 : "9999 Dummy",
	label5 : "DRV Amount",
	value5 : "5000"
});

oCDASHM2JsonHeaderLines.push({
	label1 : "Redel Ref.",
	value1 : "700987",
	label2 : "Estimate Date",
	value2 : "08 Jun 2017",
	label3 : "Billing Type",
	value3 : "Central",
	label4 : "TAB (Days Rem.)",
	value4 : "200",
	label5 : "Seacover Limit",
	value5 : "1000"
});

oCDASHM2JsonHeaderLines.push({
	label1 : "Customer A.R",
	value1 : "700987",
	label2 : "Manuf. Year(Age)",
	value2 : "24 Sep 1986 (31)",
	label3 : "Clear M&R Comm.",
	value3 : "Y",
	label4 : "M&R Comment",
	value4 : "Look for missing items",
	label5 : "Display M&R Comm in RA",
	value5 : "Y"
});

oCDASHM2JsonHeaderLines.push({
	label1 : "Customer App Date",
	value1 : "",
	label2 : "CW Cost",
	value2 : "50",
	label3 : "",
	value3 : "",
	label4 : "",
	value4 : "",
	label5 : "",
	value5 : ""
});

var oCDASHM2JsonHeaderLines = [];
oCDASHM2JsonHeaderLines.push({
	label1 : "Depot",
	value1 : "Qingdao Ocean & Great Asia Logistic (1405)",
	label2 : "Unit of Measure",
	value2 : "CMT",
	label3 : "Estimate No.",
	value3 : "1009877"
});

oCDASHM2JsonHeaderLines.push({
	label1 : "City",
	value1 : "Qingdao",
	label2 : "On Hire Date",
	value2 : "28 Dec 2007",
	label3 : "Currency",
	value3 : "CNY",
});

oCDASHM2JsonHeaderLines.push({
	label1 : "Lease No.",
	value1 : "128713",
	label2 : "Gate IN Date",
	value2 : "05 Jun 2016",
	label3 : "Age",
	value3 : "2"
});

oCDASHM2JsonHeaderLines.push({
	label1 : "Unit Type",
	value1 : "40' High Cube Standard (BW4)",
	label2 : "Est. Date",
	value2 : "08 Jun 2016",
	label3 : "Redel Ref.",
	value3 : "585418",
}); */

var oCDASHM2JsonHeaderLinesOthers = {};

/* CDASHM2 Header Lines */

var oCDASHM2JsonHeaderLines = [];
oCDASHM2JsonHeaderLines.push({
	label1 : "Estimate Date",
	value1 : "11 Apr 2018",
	label2 : "Estimate Type",
	value2 : "10009877",
	label3 : "Lessee Cost",
	value3 : "SGD 118.90",
	label4 : "Depot",
	value4 : "CMA CGM (100173)"
});

oCDASHM2JsonHeaderLines.push({
	label1 : "Off Hire Date",
	value1 : "11 Apr 2018",
	label2 : "Off Hire Loc.",
	value2 : "US-HOU-5555",
	label3 : "Approval Date",
	value3 : "11 Jan 2018",
	label4 : "Customer",
	value4 : "11 Apr 2018"
});

oCDASHM2JsonHeaderLines.push({
	label1 : "On Hire Date",
	value1 : "11 Apr 2018",
	label2 : "On Hire Loc.",
	value2 : "US-HOU-5555",
	label3 : "Approval Reference",
	value3 : "OMARAPPROVES",
	label4 : "Unit Type",
	value4 : "(BX2) 20' Box"
});

oCDASHM2JsonHeaderLines.push({
	label1 : "Lease No.",
	value1 : "11 Apr 2018",
	label2 : "Return Auth No.",
	value2 : "US-HOU-5555",
	label3 : "SCR Limit(Local Curr.)",
	value3 : "SGD 1,000.00",
	label4 : "MFG. Year (Age)",
	value4 : "11 Apr 2018"
});

oCDASHM2JsonHeaderLines.push({
	label1 : "",
	value1 : "",
	label2 : "",
	value2 : "",
	label3 : "SCR Limit(Lease Curr.)",
	value3 : "USD 1,000.00",
	label4 : "Last Cargo",
	value4 : "Oil & Gas"
});

/* CDASHM2 Record Type

var oCDASHM2JsonRecordType = [];
oCDASHM2JsonRecordType.push({
	label1 : "Record Type",
	value1 : ""
}); */

/* CDASHM2 Record Lines */

var oCDASHM2JsonRecordLines = [];
oCDASHM2JsonRecordLines.push({
	label1 : "Record Type",
	value1 : "",
	label2 : "Serial No.",
	value2 : "GESU4346336",
	label3 : "M&R Status",
	value3 : "Pending User Approval",
	label4 : "Last Action",
	value4 : "Latest: Reminder Sent on 07 Jan 15",
	f4visible : false
});

/*oCDASHM2JsonRecordLines.push({
	label1 : "Record Type",
	value1 : "Gate IN",
	f4visible : false
});

oCDASHM2JsonRecordLines.push({
	label1 : "Unit Status",
	value1 : "Pending User Approval",
	f4visible : false
});

oCDASHM2JsonRecordLines.push({
	label1 : "Last Action",
	value1 : "Latest: Reminder Sent on 07 Jan 15",
	f4visible : true
}); */

var oCDASHM2JsonProcesses = [];
/*oCDASHM2JsonProcesses.push({
	text:"Gate IN",
	key: "GI"
});*/

oCDASHM2JsonProcesses.push({
	text:"Original Estimate",
	key: "OE"
});

oCDASHM2JsonProcesses.push({
	text:"Joint Survey",
	key: "JS"
});

/*oCDASHM2JsonProcesses.push({
	text:"Lessor Survey",
	key: "LS"
});

oCDASHM2JsonProcesses.push({
	text:"Add. Estimate",
	key: "AE"
});

oCDASHM2JsonProcesses.push({
	text:"Pre-del Estimate",
	key: "PE"
});

oCDASHM2JsonProcesses.push({
	text:"Gate OUT",
	key: "GO"
});*/

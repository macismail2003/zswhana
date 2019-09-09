
var deleteFeildsJson = function(jsnObject,arrFeild){
for(i =0; i< arrFeild.length; i++){
for(var index in jsnObject)
delete jsnObject[index][arrFeild[i]];
}
return jsnObject;
};

var getImageFromUrl = function(url, callback) {
var img = new Image, data, ret = {
data : null,
pending : true
};

img.onError = function() {
throw new Error('Cannot load image: "' + url + '"');
};
img.onload = function() {
var canvas = document.createElement('canvas');
document.body.appendChild(canvas);

img.style.backgroundColor = "transparent"; // style="background-color:
// gray;border:1px solid
// #000000;"
img.style.border = "none";
img.style.padding = "0px";
img.style.margin = "0px";

canvas.width = img.width;
canvas.height = img.height;
// canvas.style="none";
canvas.style.backgroundColor = "transparent"; // style="background-color:
// gray;border:1px solid
// #000000;"
canvas.style.border = "none";
canvas.style.padding = "0px";
canvas.style.margin = "0px";

var ctx = canvas.getContext('2d');
ctx.strokeStyle = "#ffffff";
ctx.shadowColor = "#ffffff";
ctx.fillStyle = "#ffffff";
ctx.drawImage(img, 0, 0);
ctx.lineWidth = 0;
ctx.miterLimit = 5;
// Grab the image as a jpeg encoded in base64, but only the data
data = canvas.toDataURL('image/jpeg').slice(
'data:image/jpeg;base64,'.length);
// Convert the data to binary form
data = atob(data)
document.body.removeChild(canvas);

ret['data'] = data;
ret['pending'] = false;
if (typeof callback === 'function') {
callback(data);
}
}
img.src = url;

return ret;
};

var createParaPDF = function(jsonData,title,colWidthArr, arrColmnName,verticalOffset) {
  if(verticalOffset == undefined)
    verticalOffset = 2; //SET DEFAULT MARGIN FROM TOP

  //CALCULATE START TEXT and vertical line end
  var startTextFrm = [0.55]; //SET START MARGIN FOR TABLE
  var vrtclLineEnd =[];

  for( var index in colWidthArr){
    vrtclLineEnd.push(Math.round((colWidthArr[index] + startTextFrm[index]+0.02)*100)/100);
    startTextFrm.push(Math.round((vrtclLineEnd[index]+0.03)*100)/100);
  };
  // EXTRACT COLUMN NAME INTO tmpArry
  var arrData = typeof jsonData != 'object' ? JSON.parse(jsonData) : jsonData;
  var tmpArry = [];
  // This loop will extract the label from 1st index of on array
  for ( var index in arrData[0])
    tmpArry.push(index);

  // CODE FOR PARAGRAPH SETTING
  var doc = new jsPDF('l', 'in', 'letter'), sizes = [9],
  fonts = [[ 'Helvetica', '' ], [ 'Times', 'Roman' ] ], font, size, lines, colmTwoVal, coumnTreeVal, tmpVarOffset, margin = startTextFrm[0] - 0.03; // inches
  // ADDING IMAGE INTO DOC OBJECT USE http://dataurl.net/ FOR CONVERT IMAGE
  // INOT DATA IT SUPPORTS ONLY JPEG IMAGE TYPE
  var tmpImgDt = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QCyRXhpZgAATU0AKgAAAAgABwE+AAUAAAACAAAAYgE/AAUAAAAGAAAAcg'+
          'MBAAUAAAABAAAAogMDAAEAAAABAAAAAFEQAAEAAAABAQAAAFERAAQAAAABAAAXEVESAAQAAAABAAAXEQAAAAAAAHomAAGGoAAAgIQAAYagAAD'+
          '6AAABhqAAAIDoAAGGoAAAdTAAAYagAADqYAABhqAAADqYAAGGoAAAF3AAAYagAAGGoAAAsY//2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEB'+
          'AMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM'+
          'DAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAC1ALUDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAg'+
          'EDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZ'+
          'WmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09f'+
          'b3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCS'+
          'MzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKm'+
          'qsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9nPin8U9e8OePL+ysr/ybaHy9ieTG2Mxqx5'+
          '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'+
          'elSWdnJcSxSymYmZlZslVGOAOMKKKKKAP/Z';
  doc.addImage(tmpImgDt, 'JPEG', 9.7, 0.1, 0.8, 0.8); // PDF Image
  doc.setFont('Helvetica', '');
  doc.setFontType("bold");
  doc.setFontSize(12);

      doc.text(0.5,0.9, title);

  font = fonts[0];
  size = sizes[0];

  //CHECK IF DATA NOT IN TABLE RETURN
  if(arrData.length == 0){
    doc.setDrawColor(184, 186, 198)
    .setLineWidth(1 / 82)
    .setFillColor(181, 198, 208)
    .rect(margin, verticalOffset, 11 - 2*margin, 0.2, 'FD');
    tmpTxt = doc.setFont(font[0], font[1]).setFontSize(size)
    .splitTextToSize("No Record Found", 2); //colWidthArr[index]-0.05 THIS CONDITION USED FOR BOLD TEXT ONLY
    doc.setFontType("bold")
    .text(3.55, verticalOffset + size / 62, tmpTxt);
    // Output as Data URI DISPLAY IN BROWSER
    doc.output('datauri');
    // SAVE PDF
    // doc.save('ExportListDetails.pdf');
    return;
  }
  //CREATE HEADER FOR COLUMN
  var tmpTxt , maxline=1, hdrHight =0.2;
  //GETTING MAX LINE HIGHT ONLY
  for( var index =0; index < arrColmnName.length;index++){
    tmpTxt = doc.setFont(font[0], font[1]).setFontSize(size).setFontType("bold")
    .splitTextToSize(arrColmnName[index], colWidthArr[index]-0.05);

    if(maxline < tmpTxt.length)
    maxline =  tmpTxt.length;
  };

  hdrHight = (maxline + 0.5) * size / 72;
  doc.setDrawColor(184, 186, 198)
  .setLineWidth(1 / 82)
  .setFillColor(181, 198, 208)
  .rect(margin, verticalOffset, 11- 2*margin, hdrHight, 'FD');

  //LOOP FOR CREATING COLUMN TEXT
  for( var index =0; index < arrColmnName.length;index++){
    tmpTxt = doc.setFont(font[0], font[1]).setFontSize(size)
    .splitTextToSize(arrColmnName[index], colWidthArr[index]-0.05); //colWidthArr[index]-0.05 THIS CONDITION USED FOR BOLD TEXT ONLY
    doc.setFontType("normal")
    .text(startTextFrm[index], verticalOffset + size / 72, tmpTxt);
  };

  //LOOP FOR CREATING VERTICALE LINE
  for( var index =0; index < colWidthArr.length-1;index++){
    doc.setDrawColor(184, 186, 198) // OTHER VERTICALE LINE
    .setLineWidth(1 / 82)
    .line(vrtclLineEnd[index], verticalOffset, vrtclLineEnd[index], (verticalOffset + hdrHight));
  };

  verticalOffset +=hdrHight;

  // LOOP FOR ROW LEVEL IN JSONDATA
  var cellData;
  var pgBrkLimit=36;
  for ( var i = 0; i < arrData.length; i++) {
    var maxLineArr = [ 1 ];
    var maxLineNo = 1;
    var clmnLngthCunt =0;

    if(i == pgBrkLimit){
      verticalOffset = 0.5;
      doc.addPage();
      pgBrkLimit = pgBrkLimit + 36;
      //CREATE HEADER FOR COLUMN
      var tmpTxt , maxline=1, hdrHight =0.2;
      //GETTING MAX LINE HIGHT ONLY
      for( var index =0; index < arrColmnName.length;index++){
        tmpTxt = doc.setFont(font[0], font[1]).setFontSize(size).setFontType("bold")
        .splitTextToSize(arrColmnName[index], colWidthArr[index]-0.05);

        if(maxline < tmpTxt.length)
        maxline =  tmpTxt.length;
      };

      hdrHight = (maxline + 0.5) * size / 72;
      doc.setDrawColor(184, 186, 198)
      .setLineWidth(1 / 82)
      .setFillColor(181, 198, 208)
      .rect(margin, verticalOffset, 11- 2*margin, hdrHight, 'FD');

      //LOOP FOR CREATING COLUMN TEXT
      for( var index =0; index < arrColmnName.length;index++){
        tmpTxt = doc.setFont(font[0], font[1]).setFontSize(size)
        .splitTextToSize(arrColmnName[index], colWidthArr[index]-0.05); //colWidthArr[index]-0.05 THIS CONDITION USED FOR BOLD TEXT ONLY
        doc.setFontType("normal")
        .text(startTextFrm[index], verticalOffset + size / 72, tmpTxt);
      };

      //LOOP FOR CREATING VERTICALE LINE
      for( var index =0; index < colWidthArr.length-1;index++){
        doc.setDrawColor(184, 186, 198) // OTHER VERTICALE LINE
        .setLineWidth(1 / 82)
        .line(vrtclLineEnd[index], verticalOffset, vrtclLineEnd[index], (verticalOffset + hdrHight));
      };
      verticalOffset +=hdrHight;
    }

    //LOOP AT CELL LEVEL FOR GETTING HIGHEST LINE LENGTH
    for (var index in arrData[i]) {

      var abc =arrData[i][index];
      cellData = doc.setFont(font[0], font[1]).setFontSize(size)
      .splitTextToSize(arrData[i][index], colWidthArr[clmnLngthCunt]);
      if(maxLineNo < cellData.length)
      maxLineNo =  cellData.length;
      clmnLngthCunt++;

     }//END LOOP FOR CELL LEVEL

    tmpVarOffset = (maxLineNo + 0.5) * size / 72;

    // ADDING NEW PAGE IF SIZE IS EXEEDS
    if ((verticalOffset + tmpVarOffset) > 10.5) {
      verticalOffset = 0.5;
      doc.addPage();
      doc.setDrawColor(184, 186, 198) // HORIZONTAL LINE
      .setLineWidth(1 / 82).line(margin, verticalOffset, 11 - margin,
      verticalOffset); // line(left-top,top,left-bottom,bottom)
    }

    //LOOP AT CELL LEVEL FOR INSERT TEXT
    clmnLngthCunt =0;
    for (var index in arrData[i]) {
      cellData = doc.setFont(font[0], font[1]).setFontSize(size)
      .splitTextToSize(arrData[i][index], colWidthArr[clmnLngthCunt]);
      doc.text(startTextFrm[clmnLngthCunt], verticalOffset + size / 72, cellData);
      clmnLngthCunt++;
     }//END LOOP FOR CELL LEVEL

    //LOOP FOR CREATING VERTICALE LINE FOR DATA
    for( var index =0; index < colWidthArr.length-1;index++){
      doc.setDrawColor(184, 186, 198) // START AND END VERTICALE LINE
      .setLineWidth(1 / 82).line(margin, verticalOffset, margin, (verticalOffset + tmpVarOffset)) // line(left-top,top,left-bottom,bottom)
      .line(11 - margin, verticalOffset, 11 - margin, (verticalOffset + tmpVarOffset));
      doc.setDrawColor(184, 186, 198) // OTHER VERTICALE LINE
      .setLineWidth(1 / 82)
      .line(vrtclLineEnd[index], verticalOffset, vrtclLineEnd[index], (verticalOffset + tmpVarOffset));
    };

    // BELOW CONDITION FOR CREATING TOP HORIZONTAL LINE
    if (i == 0) {
      doc.setDrawColor(184, 186, 198) // HORIZONTAL LINE
      .setLineWidth(1 / 82).line(margin, verticalOffset, 11 - margin, verticalOffset); // line(left-top,top,left-bottom,bottom)
    }

    // GET HIGHEST COLUMN HEIGHT FOR verticalOffset
    verticalOffset += (maxLineNo + 0.5) * size / 72;
    //alert("verticalOffset : "+verticalOffset);

    // BELOW CONDITION FOR CREATING OTHER THAN TOP HORIZONTAL LINE
    doc.setDrawColor(184, 186, 198).setLineWidth(1 / 82).line(margin, verticalOffset, 11 - margin, verticalOffset); // line(left-top,top,left-bottom,bottom)
  }// END LOOP RO ROW LEVEL
  // SAVE PDF
  doc.save(title+'.pdf');
};

var createPrimaryPDF = function(title, scrText, jsonSCR,cWSCR, jsonData1,cWData1, jsonData2,cWData2,jsonData3,jsonData4, verticalOffset) {
  if(verticalOffset == undefined)
    verticalOffset = 2; //SET DEFAULT MARGIN FROM TOP IF NO VALUE GIVEN BY USER

  //CALCULATE START TEXT AND VERTICAL LINE END
  var startTextFrm = [0.55]; //SET START MARGIN FOR TABLE
  var vrtclLineEnd =[];

  for( var index in cWSCR){
    vrtclLineEnd.push(Math.round((cWSCR[index] + startTextFrm[index]+0.02)*100)/100);
    startTextFrm.push(Math.round((vrtclLineEnd[index]+0.03)*100)/100);
  };

  var jsonSCRText = [{text:scrText}];

  // EXTRACT COLUMN NAME INTO tmpArry
  var arrData = typeof jsonSCRText != 'object' ? JSON.parse(jsonSCRText) : jsonSCRText;
  var tmpArry = [];
  // This loop will extract the label from 1st index of on array
  for ( var index in arrData[0])
    tmpArry.push(index);

  // CODE FOR PARAGRAPH SETTING
  var doc = new jsPDF('l', 'in', 'letter'), sizes = [9],
  fonts = [[ 'Helvetica', '' ], [ 'Times', 'Roman' ] ], font, size, lines, colmTwoVal, coumnTreeVal, tmpVarOffset, margin = startTextFrm[0] - 0.03; // inches
  // ADDING IMAGE INTO DOC OBJECT USE http://dataurl.net/ FOR CONVERT IMAGE
  // INOT DATA IT SUPPORTS ONLY JPEG IMAGE TYPE
  var tmpImgDt = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QCyRXhpZgAATU0AKgAAAAgABwE+AAUAAAACAAAAYgE/AAUAAAAGAAAAcg'+
          'MBAAUAAAABAAAAogMDAAEAAAABAAAAAFEQAAEAAAABAQAAAFERAAQAAAABAAAXEVESAAQAAAABAAAXEQAAAAAAAHomAAGGoAAAgIQAAYagAAD'+
          '6AAABhqAAAIDoAAGGoAAAdTAAAYagAADqYAABhqAAADqYAAGGoAAAF3AAAYagAAGGoAAAsY//2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEB'+
          'AMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM'+
          'DAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAC1ALUDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAg'+
          'EDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZ'+
          'WmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09f'+
          'b3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCS'+
          'MzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKm'+
          'qsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9nPin8U9e8OePL+ysr/ybaHy9ieTG2Mxqx5'+
          'Kk9Sa57/heHif/AKCg/wDAeH/4mj44f8lO1T/tl/6JSvWPBvgzSbrwnpssmm2MkkltGzM0KksSo5NAHk//AAu/xP8A9BQf+A8P/wATR/wu/wAT/wDQUH/gPD/8TX'+
          'tf/CC6N/0CtP8A+/C0f8ILo3/QK0//AL8LQB4p/wALv8T/APQUH/gPD/8AE0f8Lv8AE/8A0FB/4Dw//E17X/wgujf9ArT/APvwtH/CC6N/0CtP/wC/C0AeKf8A'+
          'C7/E/wD0FB/4Dw//ABNH/C7/ABP/ANBQf+A8P/xNe1/8ILo3/QK0/wD78LR/wgujf9ArT/8AvwtAHin/AAu/xP8A9BQf+A8P/wATR/wu/wAT/wDQUH/gPD/8TXt'+
          'f/CC6N/0CtP8A+/C0f8ILo3/QK0//AL8LQB4p/wALv8T/APQUH/gPD/8AE0f8Lv8AE/8A0FB/4Dw//E17X/wgujf9ArT/APvwtH/CC6N/0CtP/wC/C0AeKf8AC7/E/w'+
          'D0FB/4Dw//ABNH/C7/ABP/ANBQf+A8P/xNe1/8ILo3/QK0/wD78LR/wgujf9ArT/8AvwtAHin/AAu/xP8A9BQf+A8P/wATR/wu/wAT/wDQUH/gPD/8TXtf/CC6N/0CtP8'+
          'A+/C0f8ILo3/QK0//AL8LQB4p/wALv8T/APQUH/gPD/8AE0f8Lv8AE/8A0FB/4Dw//E17X/wgujf9ArT/APvwtH/CC6N/0CtP/wC/C0AeKf8AC7/E/wD0FB/4Dw//ABN'+
          'H/C7/ABP/ANBQf+A8P/xNe1/8ILo3/QK0/wD78LR/wgujf9ArT/8AvwtAHin/AAvDxP8A9BQf+A8P/wATQPjf4nPTVAf+3eH/AOJr2v8A4QXRv+gVp/8A34WvNP2htCstFGlCzt'+
          'be18zzN/lRhN33euKAOx+Cfim/8XeFbi51Gf7RPHdtErbFTChEOMKAOpNFZ/7N/wDyI93/ANfz/wDouOigDz744f8AJTtU/wC2X/olK9r8Cf8AIm6V/wBekf8A6CK8U+OH/JTtU/7Zf+iU'+
          'r2vwJ/yJulf9ekf/AKCKANaiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACvKf2meuj/APbX/wBlr1avKf2meuj/APbX/wBloA1v2b/+RHu/+v5//RcdFH7N/wDyI93/ANf'+
          'z/wDouOigDz744f8AJTtU/wC2X/olK9r8Cf8AIm6V/wBekf8A6CK8U+OH/JTtU/7Zf+iUr2vwJ/yJulf9ekf/AKCKANaiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACvKf2m'+
          'euj/APbX/wBlr1avKf2meuj/APbX/wBloA1v2b/+RHu/+v5//RcdFH7N/wDyI93/ANfz/wDouOigDz744f8AJTtU/wC2X/olK9r8Cf8AIm6V/wBekf8A6CK8U+OH/JTtU/7Zf+iUr2vwJ/yJulf'+
          '9ekf/AKCKANaiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACvKf2meuj/APbX/wBlr1avKf2meuj/APbX/wBloA1v2b/+RHu/+v5//RcdFH7N/wDyI93/ANfz/wDouOig'+
          'Dz744f8AJTtU/wC2X/olK9r8Cf8AIm6V/wBekf8A6CK8U+OH/JTtU/7Zf+iUr2vwJ/yJulf9ekf/AKCKANak3DPWlrgv2iP2lfBX7Kfw1uvFnjrXLbQ9GtjsVny0tzIekcSD5nc9gB+lZ1akac'+
          'XObslu30OnB4Ovi68MNhYOdSbSjGKbbb2SS1b9Dvc0hYA471+Y/jP/AIObvh/p2rvFoPw58W6rZqSFubm5gtTIM9dmWI/E16N+yp/wX5+Gf7TXxX0HwVN4X8WeG9d8R3S2Vk0qxXNs8rZwr'+
          'OjZUHHUrivFpcTZZUqKlCsm3ot/8rH6dj/AzjvB4OWPxOW1I04pyb91tJK7bSk2rLfQ+8i3bFG48E4Fct8YPjL4Y+Afw+1DxT4w1uy0HQdMTdPd3Um1QeyqOrMegVckntX59fEf/g5i+G2g6/Ja+GfAni'+
          '3xFYwsVF5PLFYrKP7yoxZsfXB9q68fnGDwdvrNRRv06/dufO8JeHPEvEylLIsHOtGOjaSUU+3M2lfyvc/S7d1oDeuBXxr+x3/wW/8Ag7+1t4stPDby6j4I8T3zCO1s9aCLDeOeiRTqShY9lbaT2zX1X8Tfib'+
          'oPwb8A6p4o8UanbaNoOjQm4vbyfIjgQEcnAJ6kdPWtsLmGHxFP21CalHunt69vmebnvCGdZLjllmaYWdKs7Wi4u8ruy5bfFd6Llvrob+4Ubj6V+cnxW/4OUPhJ4T1Sa18L+FvF/i2OFiouysdjBJg9V8wlyPcq'+
          'KyPAf/BzP8OtW1eODxH8P/F2iWjsA1zbTQ3nlj1KAqT9Bk15kuKcqU+R11f52+/Y+6peAviBUw/1qOV1eW19eVS/8Bb5vla5+mW488UbjjtXHfAr48+Ev2k/hpYeLvBet2uvaDqKnyriE4KMPvRup5R1PBUgEV'+
          'yP7Wf7cfw0/Yo8Kxap4/8AEMWnSXQJs9PgXz76+I6iOFfmI/2jhR617MsVRjS9tKaUd730t6n5th8izGvjv7Mo0Jyr3cfZqLc+Zbrlte666aHr+T7Zo3jtX5geIP8Ag5y8D2usvHpfwy8V3lirYE897BA7j12Ddj'+
          '6Zr6V/YP8A+CuXw0/b28UXHhzw/aa9oXim1tWvX07UoFxJEpAZklQlGwSMg4PPSvMwvEWXYiqqNGsnJ7Lv+B9xn3g1xrk2BlmWZZfUp0Yq8paPlXeVm2l5tadT6q3c9DijNeA/tmf8FKfhT+wzaRxeM9beXXLpPNtt'+
          'E05PtN/MvZigICKf7zkD618dTf8ABzv4L/tgpH8LvFT2AbAlbULcSkeuzp+GarGZ/l+Fn7OvVUZdt387bGXDXhFxjn+F+vZTl9SpSe0rKKf+Fya5vlc/UPdjr1pQcjNfM37GH/BWH4Qftvaiuk+HNXudH8UFC/8AYms'+
          'Ri2upQByYiCUlA/2ST7V9MKePXFd+FxdHEU1VoSUovqj4/PMgzLJsXLA5rQlRqx3jNNP113XZrRi15T+0z10f/tr/AOy16tXlP7TPXR/+2v8A7LXSeQa37N//ACI93/1/P/6Ljoo/Zv8A+RHu/wDr+f8A9Fx0UAeffHD/AJK'+
          'dqn/bL/0Sle1+BP8AkTdK/wCvSP8A9BFeKfHD/kp2qf8AbL/0Sle1+BP+RN0r/r0j/wDQRQBrV+K3/BzF4w1q7/aU8B6DPJOugWOgve2kWSInneZlkfHQsFVBnsD71+1NfPH/AAUA/wCCfngT/goN4HtNA8S3MmleItJD3Gj6'+
          'paFTd2W7AbKH/WRMcZU8ZAIINeDxLl1XHYCeHou0nbyvZ7fM/WPBLjPL+FuL8NnGaQcqMOZNpXceaLXOl1tfW2tr21PxO/4Jz/Az9nn456jrOn/Gv4h614G1MSIukLCyW9ncIR8xed0cBw3G07Rjua/QT4F/8EG/DPwv+P3w/wDi'+
          'f8NPil/wkWheHtXh1KS3vY4rhbmJc5Ec8BClue64r4w/az/4IUfGn9mbQ9S12xh0zx54Z01HnmutJYpcwwqMl3t3+bAAydpbGDXln/BPj9vLxn+xJ8btF1LRdVvJfDF7eRQ6xorylrS9t3cK7BDwsigkq4wcjnivzPAVaOX1aeGzX'+
          'C8rT0nqnvv2a9D+5uLMDmfGGAxme8AcQOrCUGpYdqMqdnCzgrpSpykr25ldt7o97/4OA/2u9U+Mv7XFx8O7W8lTwr8OlSE2qMRHPfugeWZh0JVWVB6Yb1rb/wCCdX/BNL9n/wCLv7Ptr4u+L/xS07Tdc8QCRrPSLXX7exfTIgxVW'+
          'lDZYyNjdtPABHBr5h/4KcaXc6V+3/8AFYXQfN5rsl7EW6vDMqyRn6bGFejfsgf8EZvHv7bfwatfG/g/xT4FWwnmktprW6nlF1Zyo2CkiqhCkjBHqCDWca1XEZxWqSoe3leSUW9knZfctDvrZbl+S+GuV4Wjmryuk40pSqwjdylKHM'+
          '030cpNtvd2tszxX9sf4F6V+zL+0drvhXw34qsvFuh6fJHcaXrNjcJJ50TqHTLRkqJEPynaeq5HWv23/wCCXHxtH/BQ3/gm4NL8aldW1CK3ufCmtvMNxuwqbUlb/aaNkJP94E18CN/wbX/GuJCT4n+HyqOSTcXAA/8AIdXfjto/xT/4I'+
          'yfsOXPw1XxDpsXib4seIJbv+1NFmctZWEVvGkiIzKpSR3KjcOi5wc16OTU8XleIrYrE0XCi07x3Xkv0ufEeJeM4f4+yjLeH8jzOniczp1KahUs4ydl+8m7LRWXO0uqVuh3/APw5t/ZZ/Z1U2nxb+PQbWRndbR6na2Ai54Hl4eQkD'+
          '1I+lfEf/BQD4DfCT4HfEXTV+DnxLt/iH4b1OB3lUuJLnS5VIGx3VVV1YHKnGeCD6039gL9g3xJ/wUX+NeoeHNL1yy0g6dZnU9T1PUN87rGXCDaoO6R2Y9yPc113/BTv/gmd/wAO4tS8HWjeLv8AhK38VQ3MrMLD7ILfyWQYHztuzv8'+
          'AbpXlY5fWMvliMPg4wpJ/FfXe3fXtsz9C4Vmsm4wpZLnHElbFY6cW3QcEqTXK5bKLULJcy95N2V97P6A/4N6v2mJPgvF8bLfVZ5W8L6J4dHimWEv8scsBZWKjsXUqvuVWvhf9ov8AaE8V/ti/HbVPGPiKe51HWvEV2EtbYEstrGzYht'+
          'ol/hVQQAB1OT1Jr3f/AIJeeHbvxX8M/wBpqwsEaS7m+GdwUVerbZlYj8ga+bPgh40tfh78YvCHiG8j86y0TWbPUJ0xndHHMjtx3+UGuXF4qrPLsJhZytBuX/pVvwX5nucO5DgcNxnxDnmHpKWKSpKK6/wVLTs5ySTfXlR+r37Kn/Btz4'+
          'WuPhpYal8WPEmvyeJdQgWaXTtHlS3t9OLAERl2Rmkdc4J4GegPWup0D/gnbon/AARl1/xx8eNA8T3ev+G9F8KXduml6pGv2tbuR4/IAkQBXQuADkAjPev0S8HeLtN+IHhXTtd0e8g1DStXtku7S4hYOk0bqGVgR7Gvlz/guN4cvfEf/B'+
          'ND4hJZK7NZC0vZgvJMMdzGzn6Ac/hX6hXyPAYPCPEYWmuenFyi+t0tHfqfwVlnivxdxNxBTybPcbL6vi6sKVWm7KChKcVKKjb3bbXVn3e5+DGsa74w/a1+PQu9Ru59e8Z+OdVSLzZXJMs8zhUUf3UXIAA4VR7V+p5/4Nk/DR+EYj/4W'+
          'Nrw8d/Zd3nfZ4v7M+0bc7PLx5nl7uN27OOcdq/NT9g7xtpvw4/bQ+F2u6vIkOmad4jtHuJH+5EpfbvPoAWBz7V/TvG6OodWDIw3Bgcgj1+lfJcF5Rg8wp1q+MjzyvbVvS6vf1ffyP6L+k54j8R8IY3Lcs4bqvDUFBy91K0nFqKhqmuWK'+
          'S91ae9r0P5V/EOi+Jf2dvjHe6dJNcaJ4s8F6q8Bmt5CslpdQSEbkYe65B7g1/R//wAE6/2m5P2vP2O/Bfjm6CLqmoWn2fUggwv2uFjHKQOwLKW/4FX4Ef8ABSnxnpvxA/b5+LOraRJFNp1z4inSKSMgpIYwsbMCOoLI3Nfsj/wQF8J3v'+
          'hb/AIJseGHvEeMatqV/f24YEZheYhSPY7SfxquCJyo5nXwtJ3p2f4NJMy+lLh6OZcB5VxBjaahi26fk0qlNynHvZSSduh9p15T+0z10f/tr/wCy16tzmvKf2meuj/8AbX/2Wv1c/wA+jW/Zv/5Ee7/6/n/9Fx0Ufs3/APIj3f8A1/P/AO'+
          'i46KAPPvjh/wAlO1T/ALZf+iUr2vwJ/wAibpX/AF6R/wDoIrxT44f8lO1T/tl/6JSva/An/Im6V/16R/8AoIoA1jnBr8RP+C1viv47+Fv275/G1hpXjXwn4f8ADttHp3hvWNMMhgkhA3SSmSLKgu5OVfsq5Fft2aimtkuYWimjSWJxhldQ'+
          'yn6g15GdZW8fh/YKo4ap3Xl/Xc/RfDHj6HCOcPNKmDhik4Sg4T2tK12tGrtK2qejeh/OL4y/4K+/tGeO/h9eeFtU+JOozabqEDW1ztsreK5niYbWQyLGH5BIOCCfWl/4J2f8E3fHv7Z3xi0MW2h6lpngixvIp9W1u5gaK2jgRgzRxFgPMkY'+
          'DaAucZycYr+hd/gv4OnvftL+EvDTXAORK2mQF8/XbmuhtrOKzt0hghjhijGFRFCqo9ABwK+Wp8E1KtaNXH4mVRR2T/K7b0P3jGfSkwuCyyvgeEsmp4KdZPmmmmk2rcyjGEbySejbsuzPzQ/4Lcf8ABJfWv2gbuz+KHww07+0fEemWKWOr6N'+
          'HgTajBEMRTRZ+9Ki/KV6soGORg/lP8Nfjb8Uv2OPGF4fDWueK/h/rBPlXkCiS1aQqcYkicYbHuDX9ReD2rH8RfDrw/4xcPrGg6PqjjjN3ZRzkfiwNdWbcGwxOJ+t4ao6U3vba/fRqzPA8OvpLYvIslXDueYKOOw0VaKk7NK91F3jJSintdJr'+
          'a9rH8517+13+03+2XcweG4vFvxF8ZtcyLt0/TldY5CDkbxCqjGR/EcV+nP/BW/9iLxz+2d+w18P/EOmaDcx/ETwPZx3d7oRdXuJUkgVbmFCDhpFZQwAPOCOtfoBoPhPS/CsBi0vS9P02JuqWtukK/koFX8EDGDmujBcLclCrRxdaVT2iSd+lt'+
          'rXb1PJ4m8fVic2y/M+H8spYL6nKUoqOvNzJKSlyxgrNK219dz+WT4V/GDx7+yp8Sjq/hXV9c8GeKLNWtpGRDBMqkjdHJG4wwyBlWB5FemftB3H7RX7Vfwwtfil8RYfF/iPwtpFwNNs9SvLQRQxPLziKNVXKkqMuFxnAzX9GmsfC/w14i1Rb7U'+
          'PDuh316pyLi4sIpZQf8AeZSa1zYQPaiAwxeSgAWPYNgA7Y6V49LgKSpyoSxMuR7JLS/RtXs/wP0rH/S5w9TGUc0oZHSWKjZSqSknLl6xhJQUo3V0m20k9mfil/wbe6OY/wBqfx5p+qWE6Q6n4UMRjuIGVJk89A68jnhuleXf8FOP+CR3jb9kP4'+
          'mavrnhbRNR8RfDLUJ3ubK8sYWnk0lWOfs86KCyhc4D42lcZINfv5BpdvayFobeCJumUjCn9KmaISKVZQysMEHkEV6b4NoTy+OBqzbcW2pJWav0trofDU/pM5thuMq/FWAwyjCvGEKlGUnKMuRWTUkk1JdHZ2u07pn8xPwW/bt+Mn7OGgNof'+
          'gr4h+J/D+l7iRYRS74Yyeu1HDBP+AgV9y/8EcfE/wAdvj98dPFCfEHRfGXjr4afEPSJNJ8Q6lrkjpbWwCt5bxGXAYncylYx0bPav1wl+D/hKbUPtsnhbw415nPntpsJkz67tuc10ENulvEqRosaIMBVAAA9gKxyvhCvhqsZ1MTKUY7R6eju2r'+
          'fI9Djr6RuV53l+Iw2CyOlRrV171VtOad01KLjCEuZNJpuW61TP52/+Cg3/AASc+In7E/jrUZ7PR9T8T/D2WZn03W7KBp/KiJ+WO5VATG6g4JI2tjIPYcdpf/BTv4/6J8Kl8C2vxN8RxaAlv9jSH92blIcbfKExXzQMccN04r+lZ4kkVkdA6MM'+
          'EEZBrnT8HfCLaj9sPhXw4bvOfP/syHzM+u7bmsK3BDhVlUwFd01LdeXa6a0PVyz6VUcRl9HCcWZTTx1SjZxm2lqvtOMoTSl3cWk+yP5+f2Av+CT3xH/be8b2M9zpOp+GfASShtS16+gaHzI85ZLdXw0sjDgEfKM5J7H+g/wCGnw90n4TfD7Rv'+
          'DGgWqWOjaDZx2NnAvSOKNQqj3OBye5rYjhWKNURFRFGAAMAfhT1BAxivoMh4ew+VwapvmlLeT/L0Px7xZ8ZM348xdOpjYqlQpX5KcbtK+7bfxSe17JJbJa3WvKf2meuj/wDbX/2WvVq8p/aZ66P/ANtf/Za+gPyI1v2b/wDkR7v/AK/n/wDRcd'+
          'FH7N//ACI93/1/P/6LjooA8++OH/JTtU/7Zf8AolK9r8Cf8ibpX/XpH/6CK8U+OH/JTtU/7Zf+iUr2vwJ/yJulf9ekf/oIoA1qKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAK8p/aZ66P/wBtf/Za9Wryn9pnro//AG'+
          '1/9loA1v2b/wDkR7v/AK/n/wDRcdFH7N//ACI93/1/P/6LjooA8++OH/JTtU/7Zf8AolK9r8Cf8ibpX/XpH/6CK8U+OH/JTtU/7Zf+iUr2vwJ/yJulf9ekf/oIoA1qKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA'+
          'K8p/aZ66P/wBtf/Za9Wryn9pnro//AG1/9loA1v2b/wDkR7v/AK/n/wDRcdFH7N//ACI93/1/P/6LjooA8++OH/JTtU/7Zf8AolK9r8Cf8ibpX/XpH/6CK8U+OH/JTtU/7Zf+iUr2vwJ/yJulf9ekf/oIoA1qKKKACiiigAooooAKK'+
          'KKACiiigAooooAKKKKACiiigAooooAK8p/aZ66P/wBtf/Za9Wryn9pnro//AG1/9loA1v2b/wDkR7v/AK/n/wDRcdFH7N//ACI93/1/P/6LjooA8++OH/JTtU/7Zf8AolK9r8Cf8ibpX/XpH/6CK8U+N/8AyU7VP+2X/olK6DQv2hj'+
          'oujWtn/ZRk+zRLFu8/G7AxnGKAPYaK8p/4aZ/6g5/8CP/AK1H/DTP/UHP/gR/9agD1aivKf8Ahpn/AKg5/wDAj/61H/DTP/UHP/gR/wDWoA9Woryn/hpn/qDn/wACP/rUf8NM/wDUHP8A4Ef/AFqAPVqK8p/4aZ/6g5/8CP8A61H/AA'+
          '0z/wBQc/8AgR/9agD1aivKf+Gmf+oOf/Aj/wCtR/w0z/1Bz/4Ef/WoA9Woryn/AIaZ/wCoOf8AwI/+tR/w0z/1Bz/4Ef8A1qAPVqK8p/4aZ/6g5/8AAj/61H/DTP8A1Bz/AOBH/wBagD1aivKf+Gmf+oOf/Aj/AOtR/wANM/8AUHP/AI'+
          'Ef/WoA9Woryn/hpn/qDn/wI/8ArUf8NM/9Qc/+BH/1qAPVq8p/aZ66P/21/wDZaP8Ahpn/AKg5/wDAj/61cp8TPiZ/wsX7Gfsf2T7Ju/5ab92ce3tQB6D+zf8A8iPd/wDX8/8A6Ljoo/Zv/wCRHu/+v5//AEXHRQBoeKfgnpXi7XrjUb'+
          'm41COe427lidAg2qFGMqT0A71n/wDDN+h/8/erf9/Y/wD4iiigA/4Zv0P/AJ+9W/7+x/8AxFH/AAzfof8Az96t/wB/Y/8A4iiigA/4Zv0P/n71b/v7H/8AEUf8M36H/wA/erf9/Y//AIiiigA/4Zv0P/n71b/v7H/8RR/wzfof/P3q'+
          '3/f2P/4iiigA/wCGb9D/AOfvVv8Av7H/APEUf8M36H/z96t/39j/APiKKKAD/hm/Q/8An71b/v7H/wDEUf8ADN+h/wDP3q3/AH9j/wDiKKKAD/hm/Q/+fvVv+/sf/wARR/wzfof/AD96t/39j/8AiKKKAD/hm/Q/+fvVv+/sf/xF'+
          'H/DN+h/8/erf9/Y//iKKKAD/AIZv0P8A5+9W/wC/sf8A8RR/wzfof/P3q3/f2P8A+IoooAP+Gb9D/wCfvVv+/sf/AMRR/wAM36H/AM/erf8Af2P/AOIoooAP+Gb9D/5+9W/7+x//ABFH/DN+h/8AP3q3/f2P/wCIoooA6jwT4JtPA'+
          'elSWdnJcSxSymYmZlZslVGOAOMKKKKKAP/Z';
  doc.addImage(tmpImgDt, 'JPEG', 9.7, 0.1, 0.8, 0.8); // PDF Image

  doc.setFont('Helvetica', '');
  doc.setFontType("bold");
  doc.setFontSize(12);
  doc.text(0.5,0.9, title); // PDF Title

  font = fonts[0];
  size = sizes[0];


  //////////////////////////////////////////////// SCR Text  //////////////////////////////////////

    var arrColWidth = [10 - margin];
    //CREATE HEADER FOR COLUMN
    var tmpTxt ="This is sample Text", maxline=1, hdrHight =0.2;
    maxline =  tmpTxt.length;

    // LOOP FOR ROW LEVEL IN JSONDATA
    var cellData;

    for ( var i = 0; i < arrData.length; i++) {
      var maxLineArr = [ 1 ];
      var maxLineNo = 1;
      var clmnLngthCunt =0;
      //LOOP AT CELL LEVEL FOR GETTING HIGHEST LINE LENGTH
      for (var index in arrData[i]) {
        var abc =arrData[i][index];
        cellData = doc.setFont(font[0], font[1]).setFontSize(size)
        .splitTextToSize(arrData[i][index], arrColWidth[clmnLngthCunt]);
        if(maxLineNo < cellData.length)
          maxLineNo =  cellData.length;

        clmnLngthCunt++;
       }//END LOOP FOR CELL LEVEL


      //LOOP AT CELL LEVEL FOR INSERT TEXT
      clmnLngthCunt =0;

      for (var index in arrData[i]) {
        cellData = doc.setFont(font[0], font[1]).setFontSize(size)
        .splitTextToSize(arrData[i][index], arrColWidth[clmnLngthCunt]);
        doc.text(margin, verticalOffset + size / 72, cellData);
        clmnLngthCunt++;
       }//END LOOP FOR CELL LEVEL
      verticalOffset += (maxLineNo + 0.5) * size / 72;

    }// END LOOP RO ROW LEVEL

  //////////////////////////////////////////////////////// SCR Eclusions ///////////////////////////////////////////////////
  if(jsonSCR.length > 0){

    verticalOffset = verticalOffset + 0.2;

    arrData = typeof jsonSCR != 'object' ? JSON.parse(jsonSCR) : jsonSCR;
    tmpArry = [];
    // This loop will extract the label from 1st index of on array
    for ( var index in arrData[0])
      tmpArry.push(index);

    //CREATE HEADER FOR COLUMN
    var tmpTxt ="This is sample Text", maxline=1, hdrHight =0.2;
    maxline =  tmpTxt.length;

    // LOOP FOR ROW LEVEL IN JSONDATA
    var cellData;

    for ( var i = 0; i < arrData.length; i++) {
      var maxLineArr = [ 1 ];
      var maxLineNo = 1;
      var clmnLngthCunt =0;
      //LOOP AT CELL LEVEL FOR GETTING HIGHEST LINE LENGTH
      for (var index in arrData[i]) {
        var abc =arrData[i][index];
        cellData = doc.setFont(font[0], font[1]).setFontSize(size)
        .splitTextToSize(arrData[i][index], cWSCR[clmnLngthCunt]);
        if(maxLineNo < cellData.length)
          maxLineNo =  cellData.length;

        clmnLngthCunt++;
       }//END LOOP FOR CELL LEVEL

      tmpVarOffset = (maxLineNo + 0.5) * size / 72;

      // ADDING NEW PAGE IF SIZE IS EXEEDS
      if ((verticalOffset + tmpVarOffset) > 10.5) {
        verticalOffset = 0.5;
        doc.addPage();
      }

      //LOOP AT CELL LEVEL FOR INSERT TEXT
      clmnLngthCunt =0;

      for (var index in arrData[i]) {
        cellData = doc.setFont(font[0], font[1]).setFontSize(size)
        .splitTextToSize(arrData[i][index], cWSCR[clmnLngthCunt]);
        doc.text(startTextFrm[clmnLngthCunt], verticalOffset + size / 72, cellData);
        clmnLngthCunt++;
       }//END LOOP FOR CELL LEVEL
      verticalOffset += (maxLineNo + 0.5) * size / 72;

    }// END LOOP RO ROW LEVEL

    doc.addPage();
    verticalOffset = 1.0;
  }
  /////////////////////////////////// Adding Table 1 ///////////////////////////////////////////////

  var startVerticalOffset = (verticalOffset + 0.2);

  // EXTRACT COLUMN NAME INTO tmpArry
  arrData = typeof jsonData1 != 'object' ? JSON.parse(jsonData1) : jsonData1;
  tmpArry = [];
  // This loop will extract the label from 1st index of on array
  for ( var index in arrData[0])
    tmpArry.push(index);

  //CREATE HEADER FOR COLUMN
  hdrHight =0.2;

  verticalOffset +=hdrHight;

  // LOOP FOR ROW LEVEL IN JSONDATA
  var cellData;
  for ( var i = 0; i < arrData.length; i++) {
    var maxLineArr = [ 1 ];
    var maxLineNo = 1;
    var clmnLngthCunt =0;

    //LOOP AT CELL LEVEL FOR GETTING HIGHEST LINE LENGTH
    for (var index in arrData[i]) {
        var abc =arrData[i][index];
        cellData = doc.setFont(font[0], font[1]).setFontSize(size)
        .splitTextToSize(arrData[i][index], cWData1[clmnLngthCunt]);

        if(maxLineNo < cellData.length)
          maxLineNo =  cellData.length;

        clmnLngthCunt++;
    }//END LOOP FOR CELL LEVEL

    tmpVarOffset = (maxLineNo + 0.5) * size / 72;


    //LOOP AT CELL LEVEL FOR INSERT TEXT
    clmnLngthCunt =0;
    for (var index in arrData[i]) {
      cellData = doc.setFont(font[0], font[1]).setFontSize(size)
      .splitTextToSize(arrData[i][index], cWData1[clmnLngthCunt]);
      doc.text(startTextFrm[clmnLngthCunt], verticalOffset + size / 72, cellData);
      clmnLngthCunt++;
     }//END LOOP FOR CELL LEVEL

  //LOOP FOR CREATING VERTICALE LINE FOR DATA
  for( var index =0; index < cWData1.length-1;index++){
    doc.setDrawColor(184, 186, 198) // START AND END VERTICALE LINE
    .setLineWidth(1 / 82).line(margin, verticalOffset, margin, (verticalOffset + tmpVarOffset))
    .line(4, verticalOffset, 4, (verticalOffset + tmpVarOffset));

    doc.setDrawColor(184, 186, 198) // OTHER VERTICALE LINE
    .setLineWidth(1 / 82)
    .line(vrtclLineEnd[index], verticalOffset, vrtclLineEnd[index], (verticalOffset + tmpVarOffset));
  };

  // BELOW CONDITION FOR CREATING TOP HORIZONTAL LINE
  if (i == 0) {
    doc.setDrawColor(184, 186, 198) // HORIZONTAL LINE
    .setLineWidth(1 / 82).line(margin, verticalOffset, 4, verticalOffset); // line(left-top,top,left-bottom,bottom)
  }
  // GET HIGHEST COLUMN HEIGHT FOR verticalOffset
  verticalOffset += (maxLineNo + 0.5) * size / 72;

  // BELOW CONDITION FOR CREATING OTHER THAN TOP HORIZONTAL LINE
  doc.setDrawColor(184, 186, 198).setLineWidth(1 / 82).line(margin, verticalOffset, 4, verticalOffset); // line(left-top,top,left-bottom,bottom)
  }

  //////////////////////////////// Adding Table 2 /////////////////////////////////////////////////////////////////////

  startTextFrm = [4.75]; //SET START MARGIN FOR TABLE
  vrtclLineEnd =[];
  var shiftMargin = margin + 4 + 0.2;

  for( var index in cWData2){
    vrtclLineEnd.push(Math.round((cWData2[index] + startTextFrm[index]+0.02)*100)/100);
    startTextFrm.push(Math.round((vrtclLineEnd[index]+0.03)*100)/100);
  };

  verticalOffset = startVerticalOffset;

  // EXTRACT COLUMN NAME INTO tmpArry
  arrData = typeof jsonData2 != 'object' ? JSON.parse(jsonData2) : jsonData2;
  tmpArry = [];
  // This loop will extract the label from 1st index of on array
  for ( var index in arrData[0])
    tmpArry.push(index);

  // LOOP FOR ROW LEVEL IN JSONDATA
  var cellData;
  for ( var i = 0; i < arrData.length; i++) {
    var maxLineArr = [ 1 ];
    var maxLineNo = 1;
    var clmnLngthCunt =0;

    //LOOP AT CELL LEVEL FOR GETTING HIGHEST LINE LENGTH
    for (var index in arrData[i]) {
        var abc =arrData[i][index];
        cellData = doc.setFont(font[0], font[1]).setFontSize(size)
        .splitTextToSize(arrData[i][index], cWData2[clmnLngthCunt]);

        if(maxLineNo < cellData.length)
          maxLineNo =  cellData.length;

        clmnLngthCunt++;
    }//END LOOP FOR CELL LEVEL

    tmpVarOffset = (maxLineNo + 0.5) * size / 72;

    //LOOP AT CELL LEVEL FOR INSERT TEXT
    clmnLngthCunt =0;
    for (var index in arrData[i]) {
      cellData = doc.setFont(font[0], font[1]).setFontSize(size)
      .splitTextToSize(arrData[i][index], cWData2[clmnLngthCunt]);
      doc.text(startTextFrm[clmnLngthCunt], verticalOffset + size / 72, cellData);
      clmnLngthCunt++;
     }//END LOOP FOR CELL LEVEL

  //LOOP FOR CREATING VERTICALE LINE FOR DATA
  for( var index =0; index < cWData2.length-1;index++){
    doc.setDrawColor(184, 186, 198) // START AND END VERTICALE LINE
    .setLineWidth(1 / 82).line(shiftMargin, verticalOffset, shiftMargin, (verticalOffset + tmpVarOffset))
    .line(shiftMargin + 4, verticalOffset, shiftMargin + 4, (verticalOffset + tmpVarOffset));

    doc.setDrawColor(184, 186, 198) // OTHER VERTICALE LINE
    .setLineWidth(1 / 82)
    .line(vrtclLineEnd[index], verticalOffset, vrtclLineEnd[index], (verticalOffset + tmpVarOffset));
  };

  // BELOW CONDITION FOR CREATING TOP HORIZONTAL LINE
  if (i == 0) {
    doc.setDrawColor(184, 186, 198) // HORIZONTAL LINE
    .setLineWidth(1 / 82).line(8.729 , verticalOffset, 4.73, verticalOffset);
  }
  // GET HIGHEST COLUMN HEIGHT FOR verticalOffset
  verticalOffset += (maxLineNo + 0.5) * size / 72;

  // BELOW CONDITION FOR CREATING OTHER THAN TOP HORIZONTAL LINE
  doc.setDrawColor(184, 186, 198).setLineWidth(1 / 82).line(8.729 , verticalOffset, 4.73, verticalOffset);
  }

  ///////////////////////////////// Adding Table 3 ///////////////////////////////////////////////////////

  if(verticalOffset != 1.0)
    verticalOffset = verticalOffset + 0.2;

  //CALCULATE START TEXT and vertical line end
  startTextFrm = [0.55]; //SET START MARGIN FOR TABLE
  vrtclLineEnd =[];

  var arrColmnName = ["","Labour", "Material", "Total"];
  var colWidthArr = [2,1,1,1];

  for( var index in colWidthArr){
    vrtclLineEnd.push(Math.round((colWidthArr[index] + startTextFrm[index]+0.02)*100)/100);
    startTextFrm.push(Math.round((vrtclLineEnd[index]+0.03)*100)/100);
  };
  // EXTRACT COLUMN NAME INTO tmpArry
  arrData = typeof jsonData3 != 'object' ? JSON.parse(jsonData3) : jsonData3;
  tmpArry = [];
  // This loop will extract the label from 1st index of on array
  for ( var index in arrData[0])
    tmpArry.push(index);



  //CREATE HEADER FOR COLUMN
  var tmpTxt , maxline=1, hdrHight =0.2;
  //GETTING MAX LINE HIGHT ONLY
  for( var index =0; index < arrColmnName.length;index++){
    tmpTxt = doc.setFont(font[0], font[1]).setFontSize(size).setFontType("bold")
    .splitTextToSize(arrColmnName[index], colWidthArr[index]-0.05);

    if(maxline < tmpTxt.length)
    maxline =  tmpTxt.length;
  };

  hdrHight = (maxline + 0.5) * size / 72;
  doc.setDrawColor(184, 186, 198)
  .setLineWidth(1 / 82)
  .setFillColor(181, 198, 208)
  .rect(margin, verticalOffset, 5.48, hdrHight, 'FD');

  //LOOP FOR CREATING COLUMN TEXT
  for( var index =0; index < arrColmnName.length;index++){
    tmpTxt = doc.setFont(font[0], font[1]).setFontSize(size)
    .splitTextToSize(arrColmnName[index], colWidthArr[index]-0.05); //colWidthArr[index]-0.05 THIS CONDITION USED FOR BOLD TEXT ONLY
    doc.setFontType("normal")
    .text(startTextFrm[index], verticalOffset + size / 72, tmpTxt);
  };

  //LOOP FOR CREATING VERTICALE LINE
  for( var index =0; index < colWidthArr.length-1;index++){
    doc.setDrawColor(184, 186, 198) // OTHER VERTICALE LINE
    .setLineWidth(1 / 82)
    .line(vrtclLineEnd[index], verticalOffset, vrtclLineEnd[index], (verticalOffset + hdrHight));
  };

  verticalOffset +=hdrHight;

  // LOOP FOR ROW LEVEL IN JSONDATA
  var cellData;
  for ( var i = 0; i < arrData.length; i++) {
    var maxLineArr = [ 1 ];
    var maxLineNo = 1;
    var clmnLngthCunt =0;

    //LOOP AT CELL LEVEL FOR GETTING HIGHEST LINE LENGTH
    for (var index in arrData[i]) {
      var abc =arrData[i][index];
      cellData = doc.setFont(font[0], font[1]).setFontSize(size)
      .splitTextToSize(arrData[i][index], colWidthArr[clmnLngthCunt]);
      if(maxLineNo < cellData.length)
      maxLineNo =  cellData.length;
      clmnLngthCunt++;
     }//END LOOP FOR CELL LEVEL

    tmpVarOffset = (maxLineNo + 0.5) * size / 72;

    // ADDING NEW PAGE IF SIZE IS EXEEDS
    if ((verticalOffset + tmpVarOffset) > 10.5) {
      verticalOffset = 0.5;
      doc.addPage();
      doc.setDrawColor(184, 186, 198) // HORIZONTAL LINE
      .setLineWidth(1 / 82).line(margin, verticalOffset, 11 - margin,
      verticalOffset); // line(left-top,top,left-bottom,bottom)
    }

    //LOOP AT CELL LEVEL FOR INSERT TEXT
    clmnLngthCunt =0;
    for (var index in arrData[i]) {
      cellData = doc.setFont(font[0], font[1]).setFontSize(size)
      .splitTextToSize(arrData[i][index], colWidthArr[clmnLngthCunt]);
      doc.text(startTextFrm[clmnLngthCunt], verticalOffset + size / 72, cellData);
      clmnLngthCunt++;
     }//END LOOP FOR CELL LEVEL

    //LOOP FOR CREATING VERTICALE LINE FOR DATA
    for( var index =0; index < colWidthArr.length-1;index++){
      doc.setDrawColor(184, 186, 198) // START AND END VERTICALE LINE
      .setLineWidth(1 / 82).line(margin, verticalOffset, margin, (verticalOffset + tmpVarOffset)) // line(left-top,top,left-bottom,bottom)
      .line(6, verticalOffset, 6, (verticalOffset + tmpVarOffset));
      doc.setDrawColor(184, 186, 198) // OTHER VERTICALE LINE
      .setLineWidth(1 / 82)
      .line(vrtclLineEnd[index], verticalOffset, vrtclLineEnd[index], (verticalOffset + tmpVarOffset));
    };

    // BELOW CONDITION FOR CREATING TOP HORIZONTAL LINE
    if (i == 0) {
      doc.setDrawColor(184, 186, 198) // HORIZONTAL LINE
      .setLineWidth(1 / 82).line(margin, verticalOffset, 6, verticalOffset); // line(left-top,top,left-bottom,bottom)
    }

    // GET HIGHEST COLUMN HEIGHT FOR verticalOffset
    verticalOffset += (maxLineNo + 0.5) * size / 72;
    //alert("verticalOffset : "+verticalOffset);

    // BELOW CONDITION FOR CREATING OTHER THAN TOP HORIZONTAL LINE
    doc.setDrawColor(184, 186, 198).setLineWidth(1 / 82).line(margin, verticalOffset, 6, verticalOffset); // line(left-top,top,left-bottom,bottom)
  }// END LOOP RO ROW LEVEL

    ///////////////////////////////// Adding Table 4 ///////////////////////////////////////////////////////////////////////////

  /*var img =
"data:image/jpeg;base64,/9j/iVBORw0KGgoAAAANSUhEUgAAABQAAAAQCAYAAAAWGF8bAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAP/QAAD/0BH2+0RwAAABl0RVh0U29mdHdhcmUATWljcm9zb2Z0IE9mZmljZX/tNXEAAAIVSURBVDhPY2BAAmu3b5c8p6Ty/4ymNhifVVH7v3rfnkXIapDZt27dOmVhYfF/+fLlsihqtm3bxr53795
/aWFhcMNghs4yMv5/5MiRfyB5dDxl/vz/V4CWbty8GSx35swZLob+/v7/p6EughlCLn1WTeM/Q319PYaryDXwnJomqoH7tXX/awgIoljQJCn1f926dVOAYcT4//9/MAaF1/lz5/6vUNdEUYti4EGgJEihsoWFyjUNLbDCCXLy///9+7cYJL5y5co6YTm5f1Umpv/u3r0LVgsC23T14YZiuBDZq+eBFoSkpWwEGhgTLS6B4pKbWrr/GZiY/j98+N
Cksq3t2lmoA/AaeFZV/f+aPXs2BKelxVwGskGWpcnK/W9oaPjfD0xa14GGyBgYmH74+/faaajX8Rq42tAI7K0LU6eBDeu2sATzy5qa/l+Aumh6WTlY7LCRCVgNSQbuz8v/zyAo2HAZKYktbWkh3kCQl1ft2rWhvKsr5qKy6v9rGtr/63R04WF5DehNE2dnkJevEuVlsBdi48Eu2LJly/82E1O4Yb5i4v8fPXoEltMwMvp/DupqvF4Gh5uU9P/Pn
z8vAqW9ZcuW1Ts7O/93cXH5//LlS7BhwBRwcj1SWiRoIMjQJmmZ/z09PZPRC4jVq1f/XwLMx8hJjSgDQRpAeR2c37V0wBhX3gcbCPLOGqBtjg4OFOMN69b9BwBZ9H/OPO/e0QAAAABJRU5ErkJggg==";*/

  var img = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QBsRXhpZgAATU0AKgAAAAgABQExAAIAAAARAAAASgMBAAUAAAABAAAAXFEQAAEAAAABAQAAAFERAAQAAAABAAAP/VESAAQAA"+
    "AABAAAP/QAAAABNaWNyb3NvZnQgT2ZmaWNlAAAAAYagAACxj//bAEMAAgEBAgEBAgICAgICAgIDBQMDAwMDBgQEAwUHBgcHBwYHBwgJCwkICAoIBwcKDQoKCwwMDAwHCQ4PDQwOCwwMDP/bAEMBAgICAwMDB"+
    "gMDBgwIBwgMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDP/AABEIABAAFAMBIgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACA"+
    "QMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJ"+
    "maoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQF"+
    "ITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubr"+
    "Cw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/AOQ/ad+OPxG/bF8c2t94p8ZReLdZg1WbRNK8PBJYbu3DtGEeCFIFswkrYjZvOExeNNyMuHH0hp37RPjLTfGkXwiT9rfxOPG"+
    "FnFb+HVI8JzXHh46u9w1immf2huN6w8yNib1rLyTGrS+YQGI+N9R8can+zV+00uq3Fuml+KPBXiKPVE0/VAbaSO4guFnjSVHG5QSq5yM4PSveLzxp+z7rPxqtvFl/8Zr6b4T297P4tTwCNKuF8SDUZ2UyWO4KLDJ"+
    "2Qhro3TExwLEADiUfB4NVXUqTlfmbs7ylG6735lf8baWWp/W3EU8DTwWCwtLkdKNNuKjRpVeWbSbi4+ynypuz+xzNycqnupPF8K/8FMf2jf2ZdHj8Aaf42vtAtfB//EnXS7nSLCd9M+zAQfZ8ywOyiMR7ducDafei"+
    "vH/ENx4v/ag8b+I/HMWhXOsXniPVrnUNRl0PT5pbKK7mkM8sceC5VQZMhWdmClck9SV4s8Rj1JqE526ay26H6lgsl4QqUIVMVhsIqjScvdo/E1r36+b9T//Z";
  if(jsonData4.length > 0){

    if(verticalOffset != 1.0)
      verticalOffset = verticalOffset + 0.2;

    //CALCULATE START TEXT and vertical line end
    startTextFrm = [0.55]; //SET START MARGIN FOR TABLE
    vrtclLineEnd =[];

    arrColmnName = ["Image","Line", "Cmp", "Dam","Rep", "Locn","Mat", "Repair Method & Component Description","Lth","Wth","Qty","Hrs","Lab","Mat Cost","Total","A1"];

    colWidthArr = [0.4 , 0.65, 0.5 , 0.5, 0.5 , 0.5, 0.5 , 1.5, 0.4, 0.4, 0.4, 0.4, 0.5, 0.7, 1, 0.3 ];

    for( var index in colWidthArr){
      vrtclLineEnd.push(Math.round((colWidthArr[index] + startTextFrm[index]+0.02)*100)/100);
      startTextFrm.push(Math.round((vrtclLineEnd[index]+0.03)*100)/100);
    };
    // EXTRACT COLUMN NAME INTO tmpArry
    arrData = typeof jsonData4 != 'object' ? JSON.parse(jsonData4) : jsonData4;
    tmpArry = [];
    // This loop will extract the label from 1st index of on array
    for ( var index in arrData[0])
      tmpArry.push(index);



    //CREATE HEADER FOR COLUMN
    var tmpTxt , maxline=1, hdrHight =0.2;
    //GETTING MAX LINE HIGHT ONLY
    for( var index =0; index < arrColmnName.length;index++){
      tmpTxt = doc.setFont(font[0], font[1]).setFontSize(size).setFontType("bold")
      .splitTextToSize(arrColmnName[index], colWidthArr[index]-0.05);

      if(maxline < tmpTxt.length)
      maxline =  tmpTxt.length;
    };

    hdrHight = (maxline + 0.5) * size / 72;
    doc.setDrawColor(184, 186, 198)
    .setLineWidth(1 / 82)
    .setFillColor(181, 198, 208)
    .rect(margin, verticalOffset, 11- 2*margin, hdrHight, 'FD');

    //LOOP FOR CREATING COLUMN TEXT
    for( var index =0; index < arrColmnName.length;index++){
      tmpTxt = doc.setFont(font[0], font[1]).setFontSize(size)
      .splitTextToSize(arrColmnName[index], colWidthArr[index]-0.05); //colWidthArr[index]-0.05 THIS CONDITION USED FOR BOLD TEXT ONLY
      doc.setFontType("normal")
      .text(startTextFrm[index], verticalOffset + size / 72, tmpTxt);
    };

    /*//LOOP FOR CREATING COLUMN TEXT
    for( var index =0; index < arrColmnName.length;index++){
      if(arrColmnName[index] == "Image"){
        doc.addImage(img, 'JPEG', startTextFrm[index], verticalOffset + size / 72, 0.15, 0.15); // PDF Image
      }else{
        tmpTxt = doc.setFont(font[0], font[1]).setFontSize(size)
        .splitTextToSize(arrColmnName[index], colWidthArr[index]-0.05); //colWidthArr[index]-0.05 THIS CONDITION USED FOR BOLD TEXT ONLY
        doc.setFontType("normal")
        .text(startTextFrm[index], verticalOffset + size / 72, tmpTxt);
      }

    };*/

    //LOOP FOR CREATING VERTICALE LINE
    for( var index =0; index < colWidthArr.length-1;index++){
      doc.setDrawColor(184, 186, 198) // OTHER VERTICALE LINE
      .setLineWidth(1 / 82)
      .line(vrtclLineEnd[index], verticalOffset, vrtclLineEnd[index], (verticalOffset + hdrHight));
    };

    verticalOffset +=hdrHight;

    // LOOP FOR ROW LEVEL IN JSONDATA
    var cellData;
    for ( var i = 0; i < arrData.length; i++) {
      var maxLineArr = [ 1 ];
      var maxLineNo = 1;
      var clmnLngthCunt =0;

      //LOOP AT CELL LEVEL FOR GETTING HIGHEST LINE LENGTH
      for (var index in arrData[i]) {
        var abc =arrData[i][index];
        cellData = doc.setFont(font[0], font[1]).setFontSize(size)
        .splitTextToSize(arrData[i][index], colWidthArr[clmnLngthCunt]);
        if(maxLineNo < cellData.length)
        maxLineNo =  cellData.length;
        clmnLngthCunt++;
       }//END LOOP FOR CELL LEVEL

      tmpVarOffset = (maxLineNo + 0.5) * size / 72;

      // ADDING NEW PAGE IF SIZE IS EXEEDS
      if ((verticalOffset + tmpVarOffset) > 10.5) {
        verticalOffset = 0.5;
        doc.addPage();
        doc.setDrawColor(184, 186, 198) // HORIZONTAL LINE
        .setLineWidth(1 / 82).line(margin, verticalOffset, 11 - margin,
        verticalOffset); // line(left-top,top,left-bottom,bottom)
      }

      //LOOP AT CELL LEVEL FOR INSERT TEXT
      clmnLngthCunt =0;
      for (var index in arrData[i]) {
        if(arrData[i][index] == 'View'){
          doc.addImage(img, 'JPEG',startTextFrm[clmnLngthCunt] + 0.12, (verticalOffset + size / 72) - 0.1, 0.2, 0.15); // PDF Image
        }else{
          cellData = doc.setFont(font[0], font[1]).setFontSize(size)
          .splitTextToSize(arrData[i][index], colWidthArr[clmnLngthCunt]);
          doc.text(startTextFrm[clmnLngthCunt], verticalOffset + size / 72, cellData);
        }
        clmnLngthCunt++;

       }//END LOOP FOR CELL LEVEL

      //LOOP FOR CREATING VERTICALE LINE FOR DATA
      for( var index =0; index < colWidthArr.length-1;index++){
        doc.setDrawColor(184, 186, 198) // START AND END VERTICALE LINE
        .setLineWidth(1 / 82).line(margin, verticalOffset, margin, (verticalOffset + tmpVarOffset)) // line(left-top,top,left-bottom,bottom)
        .line(11 - margin, verticalOffset, 11 - margin, (verticalOffset + tmpVarOffset));
        doc.setDrawColor(184, 186, 198) // OTHER VERTICALE LINE
        .setLineWidth(1 / 82)
        .line(vrtclLineEnd[index], verticalOffset, vrtclLineEnd[index], (verticalOffset + tmpVarOffset));
      };

      // BELOW CONDITION FOR CREATING TOP HORIZONTAL LINE
      if (i == 0) {
        doc.setDrawColor(184, 186, 198) // HORIZONTAL LINE
        .setLineWidth(1 / 82).line(margin, verticalOffset, 11 - margin, verticalOffset); // line(left-top,top,left-bottom,bottom)
      }

      // GET HIGHEST COLUMN HEIGHT FOR verticalOffset
      verticalOffset += (maxLineNo + 0.5) * size / 72;
      //alert("verticalOffset : "+verticalOffset);

      // BELOW CONDITION FOR CREATING OTHER THAN TOP HORIZONTAL LINE
      doc.setDrawColor(184, 186, 198).setLineWidth(1 / 82).line(margin, verticalOffset, 11 - margin, verticalOffset); // line(left-top,top,left-bottom,bottom)
    }// END LOOP RO ROW LEVEL
  }



  //doc.output('datauri');
  //doc.output('dataurlnewwindow');
  doc.save(title+'.pdf');
};


var generatePDFDepInfoFD = function(jsonData,colWidthArr, arrColmnName,verticalOffset) {/*
  // NIVEDITA
  var doc = new jsPDF('l');
    // seaco logo
    var tmpImgDt =
'data:image/jpeg;base64,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';
    doc.addImage(tmpImgDt, 'JPEG', 260, 10, 20, 20);

    var startNP = 20;
    var lenNP = 280;
    var topNP = 40;
    var col1NP = 55;
    var htNP = 0;
    var pgBrkNP = 2;

    for(var i=0; i<aPortsDeportsFD.length; i++){

      var arrayToPDFFD = [{desc: "Country : ", value: ""},
                        {desc: "City : ", value: ""},
                        {desc: "Depot Code : ", value: ""},
                        {desc: "Depot Name : ", value: ""},
                        {desc: "Depot Address : ", value: ""},
                        {desc: "Telephone : ", value: ""},
                        {desc: "Fax : ", value: ""},
                        {desc: "Email : ", value: ""},
                        {desc: "Cargo Type : ", value: ""},
                        {desc: "Cargo Type Desc : ", value: ""}
                        ];

      arrayToPDFFD[0].value = aPortsDeportsFD[i].Country;
      arrayToPDFFD[1].value = aPortsDeportsFD[i].City;
      arrayToPDFFD[2].value = aPortsDeportsFD[i].DepotCode;
      arrayToPDFFD[3].value = aPortsDeportsFD[i].DepotName;
      arrayToPDFFD[4].value = aPortsDeportsFD[i].Street+aPortsDeportsFD[i].Street1+aPortsDeportsFD[i].Street2+aPortsDeportsFD[i].Street3+aPortsDeportsFD[i].Street4+aPortsDeportsFD[i].PostalCode;
      arrayToPDFFD[5].value = aPortsDeportsFD[i].ContactNo;
      arrayToPDFFD[6].value = aPortsDeportsFD[i].FaxNo;
      arrayToPDFFD[7].value = aPortsDeportsFD[i].Email;
      arrayToPDFFD[8].value = aPortsDeportsFD[i].CargoType;
      arrayToPDFFD[9].value = aPortsDeportsFD[i].CargoTypeDes;

      if(i == pgBrkNP){
        doc.addPage();
        topNP = 40;
        htNP = 0;
        pgBrkNP = pgBrkNP+2;
      }
    // horizontal lines
    doc.setDrawColor(184, 186, 198);
    doc.line(startNP, topNP, lenNP, topNP);
    doc.line(startNP, topNP+7, lenNP, topNP+7);
    doc.line(startNP, topNP+14, lenNP, topNP+14);
    doc.line(startNP, topNP+21, lenNP, topNP+21);
    doc.line(startNP, topNP+28, lenNP, topNP+28);
    doc.line(startNP, topNP+35, lenNP, topNP+35);
    doc.line(startNP, topNP+42, lenNP, topNP+42);
    doc.line(startNP, topNP+49, lenNP, topNP+49);
    doc.line(startNP, topNP+56, lenNP, topNP+56);
    doc.line(startNP, topNP+63, lenNP, topNP+63);
    doc.line(startNP, topNP+70, lenNP, topNP+70);

    htNp = topNP + 70;

    // vertical lines
    doc.setDrawColor(184, 186, 198);
    doc.line(startNP, topNP, startNP, htNp);
    doc.line(col1NP, topNP, col1NP, htNp);
    doc.line(lenNP, topNP, lenNP, htNp);
    // data
    doc.setFontType("normal");
    doc.setFont('Helvetica','');
    doc.setFontSize(9);
    // row 1
    doc.text(startNP+3,topNP+4.5,arrayToPDFFD[0].desc);
    doc.text(col1NP+3,topNP+4.5,arrayToPDFFD[0].value);
    // row 2
    doc.text(startNP+3,topNP+7+4.5,arrayToPDFFD[1].desc);
    doc.text(col1NP+3,topNP+7+4.5,arrayToPDFFD[1].value);
      // row 3
    doc.text(startNP+3,topNP+14+4.5,arrayToPDFFD[2].desc);
    doc.text(col1NP+3,topNP+14+4.5,arrayToPDFFD[2].value);
    // row 4
    doc.text(startNP+3,topNP+21+4.5,arrayToPDFFD[3].desc);
    doc.text(col1NP+3,topNP+21+4.5,arrayToPDFFD[3].value);
    // row 5
    doc.text(startNP+3,topNP+28+4.5,arrayToPDFFD[4].desc);
    doc.text(col1NP+3,topNP+28+4.5,arrayToPDFFD[4].value);
    // row 6
    doc.text(startNP+3,topNP+35+4.5,arrayToPDFFD[5].desc);
    doc.text(col1NP+3,topNP+35+4.5,arrayToPDFFD[5].value);
    // row 7
    doc.text(startNP+3,topNP+42+4.5,arrayToPDFFD[6].desc);
    doc.text(col1NP+3,topNP+42+4.5,arrayToPDFFD[6].value);
    // row 8
    doc.text(startNP+3,topNP+49+4.5,arrayToPDFFD[7].desc);
    doc.text(col1NP+3,topNP+49+4.5,arrayToPDFFD[7].value);
    // row 9
    doc.text(startNP+3,topNP+56+4.5,arrayToPDFFD[8].desc);
    doc.text(col1NP+3,topNP+56+4.5,arrayToPDFFD[8].value);
    // row 10
    doc.text(startNP+3,topNP+63+4.5,arrayToPDFFD[9].desc);
    doc.text(col1NP+3,topNP+63+4.5,arrayToPDFFD[9].value);

    topNP = htNp + 10;
    }

    // SAVE PDF
    doc.save(pdfFileNameFD+'.pdf');
    // NIVEDITA
*/


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  if(verticalOffset == undefined)
     verticalOffset = 1.25; //SET DEFAULT MARGIN FROM TOP

  var pageBreakFD = 3;

  //CALCULATE START TEXT and vertical line end
  var startTextFrm = [0.55]; //SET START MARGIN FOR TABLE
  var vrtclLineEnd =[];
  for( var index in colWidthArr){
    vrtclLineEnd.push(Math.round((colWidthArr[index] + startTextFrm[index]+0.02)*100)/100);
    startTextFrm.push(Math.round((vrtclLineEnd[index]+0.03)*100)/100);
  };

  // CODE FOR PARAGRAPH SETTING
  var doc = new jsPDF('p', 'in', 'letter'), sizes = [ 9 ],
  fonts = [[ 'Helvetica', '' ], [ 'Times', 'Roman' ] ], font, size, lines, colmTwoVal, coumnTreeVal, tmpVarOffset, margin = startTextFrm[0] - 0.03; // inches

  // ADDING IMAGE INTO DOC OBJECT USE http://dataurl.net/ FOR CONVERT IMAGE
  // INOT DATA IT SUPPORTS ONLY JPEG IMAGE TYPE
  var tmpImgDt = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QCyRXhpZgAATU0AKgAAAAgABwE+AAUAAAACAAAAYgE/AAUAAAAGAAAAcg'+
          'MBAAUAAAABAAAAogMDAAEAAAABAAAAAFEQAAEAAAABAQAAAFERAAQAAAABAAAXEVESAAQAAAABAAAXEQAAAAAAAHomAAGGoAAAgIQAAYagAAD'+
          '6AAABhqAAAIDoAAGGoAAAdTAAAYagAADqYAABhqAAADqYAAGGoAAAF3AAAYagAAGGoAAAsY//2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEB'+
          'AMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM'+
          'DAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAC1ALUDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAg'+
          'EDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZ'+
          'WmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09f'+
          'b3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCS'+
          'MzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKm'+
          'qsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9nPin8U9e8OePL+ysr/ybaHy9ieTG2Mxqx5'+
          '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'+
          'elSWdnJcSxSymYmZlZslVGOAOMKKKKKAP/Z';
  doc.addImage(tmpImgDt, 'JPEG', 7, 0.1, 0.8, 0.8);

  doc.setFont('Helvetica', '');
  doc.setFontType("bold");
  doc.setFontSize(14);
  doc.text(0.5,0.9,'Depot Information');

  doc.setFontType("normal");
  doc.setFontSize(9);
  font = fonts[0];
  size = sizes[0];

  //CREATE HEADER FOR COLUMN
  var tmpTxt , maxline=1;

  //CHECK IF DATA NOT IN TABLE RETURN
  if(jsonData.length == 0){
    doc.setDrawColor(184, 186, 198)
    .setLineWidth(1 / 82)
    .setFillColor(181, 198, 208)
    .rect(margin, verticalOffset, 8.5- 2*margin, 0.2, 'FD');

    tmpTxt = doc.setFont(font[0], font[1]).setFontSize(size)
    .splitTextToSize("No Record Found", 2); //colWidthArr[index]-0.05 THIS CONDITION USED FOR BOLD TEXT ONLY

    doc.setFontType("bold")
    .text(3.55, verticalOffset + size / 62, tmpTxt);

    // Output as Data URI DISPLAY IN BROWSER
    doc.output('datauri');
    // SAVE PDF
    // doc.save('ExportListDetails.pdf');
    return;
  }
  for(var k=0; k<aPortsDeportsFD.length; k++){
    if(k == pageBreakFD){
      doc.addPage();
      verticalOffset = 1;
      var startTextFrm = [0.55]; //SET START MARGIN FOR TABLE
      var vrtclLineEnd =[];
      for( var index in colWidthArr){
        vrtclLineEnd.push(Math.round((colWidthArr[index] + startTextFrm[index]+0.02)*100)/100);
        startTextFrm.push(Math.round((vrtclLineEnd[index]+0.03)*100)/100);
      };
      pageBreakFD = pageBreakFD + 3;
    }
  // EXTRACT COLUMN NAME INTO tmpArry
  var arrData = typeof jsonData[k] != 'object' ? JSON.parse(jsonData[k]) : jsonData[k];
  var tmpArry = [];
  // This loop will extract the label from 1st index of on array
  for ( var index in arrData[0])
    tmpArry.push(index);

  //LOOP FOR CREATING COLUMN TEXT
  for( var index =0; index < arrColmnName.length;index++){
      tmpTxt = doc.setFont(font[0], font[1]).setFontSize(size)
      .splitTextToSize(colWidthArr[index]-0.05); //colWidthArr[index]-0.05 THIS CONDITION USED FOR BOLD TEXT ONLY

      doc.setFontType("bold")
      .text(startTextFrm[index], verticalOffset + size / 72, tmpTxt);
    };

    //LOOP FOR CREATING VERTICALE LINE
    for( var index =0; index < colWidthArr.length-1;index++){
      doc.setDrawColor(184, 186, 198) // OTHER VERTICALE LINE
      .setLineWidth(1 / 82)
      .line(vrtclLineEnd[index], verticalOffset, vrtclLineEnd[index],verticalOffset);
    };

  // LOOP FOR ROW LEVEL IN JSONDATA
  var cellData;
  for ( var i = 0; i < arrData.length; i++) {
    var maxLineArr = [ 1 ];
    var maxLineNo = 1;
    var clmnLngthCunt =0;

    //LOOP AT CELL LEVEL FOR GETTING HIGHEST LINE LENGTH
    for (var index in arrData[i]) {
      var abc =arrData[i][index];
      cellData = doc.setFont(font[0], font[1]).setFontSize(size)
      .splitTextToSize(arrData[i][index], colWidthArr[clmnLngthCunt]);

      if(maxLineNo < cellData.length)
        maxLineNo =  cellData.length;

      clmnLngthCunt++;
    }//END LOOP FOR CELL LEVEL

    tmpVarOffset = (maxLineNo + 0.5) * size / 72;

    /*// ADDING NEW PAGE IF SIZE IS EXEEDS
    if ((verticalOffset + tmpVarOffset) > 10.5) {
      verticalOffset = 0.5;
      doc.addPage();
      doc.setDrawColor(184, 186, 198) // HORIZONTAL LINE
      .setLineWidth(1 / 82).line(margin, verticalOffset, 8.5 - margin,
          verticalOffset); // line(left-top,top,left-bottom,bottom)
    }*/

    //LOOP AT CELL LEVEL FOR INSERT TEXT
    clmnLngthCunt =0;
    for (var index in arrData[i]) {
      cellData = doc.setFont(font[0], font[1]).setFontSize(size)
      .splitTextToSize(arrData[i][index], colWidthArr[clmnLngthCunt]);

      doc.text(startTextFrm[clmnLngthCunt], verticalOffset + size / 72, cellData);

      clmnLngthCunt++;
    }//END LOOP FOR CELL LEVEL

    //LOOP FOR CREATING VERTICALE LINE FOR DATA
    for( var index =0; index < colWidthArr.length-1;index++){
      doc.setDrawColor(184, 186, 198) // START AND END VERTICALE LINE
      .setLineWidth(1 / 82).line(margin, verticalOffset, margin, (verticalOffset + tmpVarOffset)) // line(left-top,top,left-bottom,bottom)
      .line(5.5, verticalOffset, 5.5, (verticalOffset + tmpVarOffset));

      doc.setDrawColor(184, 186, 198) // OTHER VERTICALE LINE
      .setLineWidth(1 / 82)
      .line(vrtclLineEnd[index], verticalOffset, vrtclLineEnd[index], (verticalOffset + tmpVarOffset));
    };

    // BELOW CONDITION FOR CREATING TOP HORIZONTAL LINE
    if (i == 0) {
      doc.setDrawColor(184, 186, 198) // HORIZONTAL LINE
      .setLineWidth(1 / 82).line(margin, verticalOffset, 5.5, verticalOffset); // line(left-top,top,left-bottom,bottom)
    }

    // GET HIGHEST COLUMN HEIGHT FOR verticalOffset
    verticalOffset += (maxLineNo + 0.5) * size / 72;

    //alert("verticalOffset : "+verticalOffset);

    // BELOW CONDITION FOR CREATING OTHER THAN TOP HORIZONTAL LINE
    doc.setDrawColor(184, 186, 198).setLineWidth(1 / 82).line(margin, verticalOffset, 5.5, verticalOffset); // line(left-top,top,left-bottom,bottom)
  }// END LOOP RO ROW LEVEL
  verticalOffset = verticalOffset+0.5;
  }
  // Output as Data URI DISPLAY IN BROWSER
  //doc.output('datauri');

  // SAVE PDF
  doc.save(pdfFileNameFD+'.pdf');

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



};

var generatePDFFullSpecBoxes = function(jsonData,FullSpecTitle,colWidthArr, arrColmnName,verticalOffset) {
  if(verticalOffset == undefined)
     verticalOffset = 1.25; //SET DEFAULT MARGIN FROM TOP

  var pageBreakFD = 3;

  //CALCULATE START TEXT and vertical line end
  var startTextFrm = [0.55]; //SET START MARGIN FOR TABLE
  var vrtclLineEnd =[];
  for( var index in colWidthArr){
    vrtclLineEnd.push(Math.round((colWidthArr[index] + startTextFrm[index]+0.02)*100)/100);
    startTextFrm.push(Math.round((vrtclLineEnd[index]+0.03)*100)/100);
  };

  // CODE FOR PARAGRAPH SETTING
  var doc = new jsPDF('p', 'in', 'letter'), sizes = [ 9 ],
  fonts = [[ 'Helvetica', '' ], [ 'Times', 'Roman' ] ], font, size, lines, colmTwoVal, coumnTreeVal, tmpVarOffset, margin = startTextFrm[0] - 0.03; // inches

  // ADDING IMAGE INTO DOC OBJECT USE http://dataurl.net/ FOR CONVERT IMAGE
  // INOT DATA IT SUPPORTS ONLY JPEG IMAGE TYPE
  var tmpImgDt = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QCyRXhpZgAATU0AKgAAAAgABwE+AAUAAAACAAAAYgE/AAUAAAAGAAAAcg'+
          'MBAAUAAAABAAAAogMDAAEAAAABAAAAAFEQAAEAAAABAQAAAFERAAQAAAABAAAXEVESAAQAAAABAAAXEQAAAAAAAHomAAGGoAAAgIQAAYagAAD'+
          '6AAABhqAAAIDoAAGGoAAAdTAAAYagAADqYAABhqAAADqYAAGGoAAAF3AAAYagAAGGoAAAsY//2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEB'+
          'AMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM'+
          'DAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAC1ALUDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAg'+
          'EDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZ'+
          'WmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09f'+
          'b3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCS'+
          'MzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKm'+
          'qsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9nPin8U9e8OePL+ysr/ybaHy9ieTG2Mxqx5'+
          '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'+
          'elSWdnJcSxSymYmZlZslVGOAOMKKKKKAP/Z';
  doc.addImage(tmpImgDt, 'JPEG', 7, 0.1, 0.8, 0.8);

  doc.setFont('Helvetica', '');
  doc.setFontType("bold");
  doc.setFontSize(12);
  doc.text(0.5,0.9,FullSpecTitle);

  doc.setFontType("normal");
  doc.setFontSize(9);
  font = fonts[0];
  size = sizes[0];

  //CREATE HEADER FOR COLUMN
  var tmpTxt , maxline=1;

  //CHECK IF DATA NOT IN TABLE RETURN
  if(jsonData.length == 0){
    doc.setDrawColor(184, 186, 198)
    .setLineWidth(1 / 82)
    .setFillColor(181, 198, 208)
    .rect(margin, verticalOffset, 8.5- 2*margin, 0.2, 'FD');

    tmpTxt = doc.setFont(font[0], font[1]).setFontSize(size)
    .splitTextToSize("No Record Found", 2); //colWidthArr[index]-0.05 THIS CONDITION USED FOR BOLD TEXT ONLY

    doc.setFontType("bold")
    .text(3.55, verticalOffset + size / 62, tmpTxt);

    // Output as Data URI DISPLAY IN BROWSER
    doc.output('datauri');
    // SAVE PDF
    // doc.save('ExportListDetails.pdf');
    return;
  }

  // EXTRACT COLUMN NAME INTO tmpArry
  var arrData = typeof jsonData != 'object' ? JSON.parse(jsonData) : jsonData;
  var tmpArry = [];
  // This loop will extract the label from 1st index of on array
  for ( var index in arrData[0])
    tmpArry.push(index);

  //LOOP FOR CREATING COLUMN TEXT
  for( var index =0; index < arrColmnName.length;index++){
      tmpTxt = doc.setFont(font[0], font[1]).setFontSize(size)
      .splitTextToSize(colWidthArr[index]-0.05); //colWidthArr[index]-0.05 THIS CONDITION USED FOR BOLD TEXT ONLY

      doc.setFontType("bold")
      .text(startTextFrm[index], verticalOffset + size / 72, tmpTxt);
    };

    //LOOP FOR CREATING VERTICALE LINE
    for( var index =0; index < colWidthArr.length-1;index++){
      doc.setDrawColor(184, 186, 198) // OTHER VERTICALE LINE
      .setLineWidth(1 / 82)
      .line(vrtclLineEnd[index], verticalOffset, vrtclLineEnd[index],verticalOffset);
    };

  // LOOP FOR ROW LEVEL IN JSONDATA
  var cellData;
  for ( var i = 0; i < arrData.length; i++) {
    var maxLineArr = [ 1 ];
    var maxLineNo = 1;
    var clmnLngthCunt =0;

    //LOOP AT CELL LEVEL FOR GETTING HIGHEST LINE LENGTH
    for (var index in arrData[i]) {
      var abc =arrData[i][index];
      cellData = doc.setFont(font[0], font[1]).setFontSize(size)
      .splitTextToSize(arrData[i][index], colWidthArr[clmnLngthCunt]);

      if(maxLineNo < cellData.length)
        maxLineNo =  cellData.length;

      clmnLngthCunt++;
    }//END LOOP FOR CELL LEVEL

    tmpVarOffset = (maxLineNo + 0.5) * size / 72;

    /*// ADDING NEW PAGE IF SIZE IS EXEEDS
    if ((verticalOffset + tmpVarOffset) > 10.5) {
      verticalOffset = 0.5;
      doc.addPage();
      doc.setDrawColor(184, 186, 198) // HORIZONTAL LINE
      .setLineWidth(1 / 82).line(margin, verticalOffset, 8.5 - margin,
          verticalOffset); // line(left-top,top,left-bottom,bottom)
    }*/

    //LOOP AT CELL LEVEL FOR INSERT TEXT
    clmnLngthCunt =0;
    for (var index in arrData[i]) {
      cellData = doc.setFont(font[0], font[1]).setFontSize(size)
      .splitTextToSize(arrData[i][index], colWidthArr[clmnLngthCunt]);

      doc.text(startTextFrm[clmnLngthCunt], verticalOffset + size / 72, cellData);

      clmnLngthCunt++;
    }//END LOOP FOR CELL LEVEL

    //LOOP FOR CREATING VERTICALE LINE FOR DATA
    for( var index =0; index < colWidthArr.length-1;index++){
      doc.setDrawColor(184, 186, 198) // START AND END VERTICALE LINE
      .setLineWidth(1 / 82).line(margin, verticalOffset, margin, (verticalOffset + tmpVarOffset)) // line(left-top,top,left-bottom,bottom)
      .line(5.5, verticalOffset, 5.5, (verticalOffset + tmpVarOffset));

      doc.setDrawColor(184, 186, 198) // OTHER VERTICALE LINE
      .setLineWidth(1 / 82)
      .line(vrtclLineEnd[index], verticalOffset, vrtclLineEnd[index], (verticalOffset + tmpVarOffset));
    };

    // BELOW CONDITION FOR CREATING TOP HORIZONTAL LINE
    if (i == 0) {
      doc.setDrawColor(184, 186, 198) // HORIZONTAL LINE
      .setLineWidth(1 / 82).line(margin, verticalOffset, 5.5, verticalOffset); // line(left-top,top,left-bottom,bottom)
    }

    // GET HIGHEST COLUMN HEIGHT FOR verticalOffset
    verticalOffset += (maxLineNo + 0.5) * size / 72;

    //alert("verticalOffset : "+verticalOffset);

    // BELOW CONDITION FOR CREATING OTHER THAN TOP HORIZONTAL LINE
    doc.setDrawColor(184, 186, 198).setLineWidth(1 / 82).line(margin, verticalOffset, 5.5, verticalOffset); // line(left-top,top,left-bottom,bottom)
  }// END LOOP RO ROW LEVEL
  verticalOffset = verticalOffset+0.5;

  // Output as Data URI DISPLAY IN BROWSER
  //doc.output('datauri');
  doc.setFontType("normal");
  doc.setFontSize(8);
  var disclText1 = 'Although every effort is being made to maintain accurate and correct information, some technical specifications are dynamic in nature.';
  var disclText2 = 'Therefore, this information is provided "as is" without warranty of any kind.';
  doc.text(0.5,verticalOffset,disclText1);
  doc.text(0.5,verticalOffset+0.12,disclText2);
  // SAVE PDF
  doc.save('Boxes.pdf');

};


var generatePDFFullSpecTanks = function(jsonData,jsonData1,jsonData2,FullSpecTitle,Title1,Title2,Title3,colWidthArr, arrColmnName,verticalOffset) {
  if(verticalOffset == undefined)
     verticalOffset = 1.25; //SET DEFAULT MARGIN FROM TOP

  var pageBreakFD = 3;

  //CALCULATE START TEXT and vertical line end
  var startTextFrm = [0.55]; //SET START MARGIN FOR TABLE
  var vrtclLineEnd =[];
  for( var index in colWidthArr){
    vrtclLineEnd.push(Math.round((colWidthArr[index] + startTextFrm[index]+0.02)*100)/100);
    startTextFrm.push(Math.round((vrtclLineEnd[index]+0.03)*100)/100);
  };

  // CODE FOR PARAGRAPH SETTING
  var doc = new jsPDF('p', 'in', 'letter'), sizes = [ 9 ],
  fonts = [[ 'Helvetica', '' ], [ 'Times', 'Roman' ] ], font, size, lines, colmTwoVal, coumnTreeVal, tmpVarOffset, margin = startTextFrm[0] - 0.03; // inches

  // ADDING IMAGE INTO DOC OBJECT USE http://dataurl.net/ FOR CONVERT IMAGE
  // INOT DATA IT SUPPORTS ONLY JPEG IMAGE TYPE
  var tmpImgDt = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QCyRXhpZgAATU0AKgAAAAgABwE+AAUAAAACAAAAYgE/AAUAAAAGAAAAcg'+
          'MBAAUAAAABAAAAogMDAAEAAAABAAAAAFEQAAEAAAABAQAAAFERAAQAAAABAAAXEVESAAQAAAABAAAXEQAAAAAAAHomAAGGoAAAgIQAAYagAAD'+
          '6AAABhqAAAIDoAAGGoAAAdTAAAYagAADqYAABhqAAADqYAAGGoAAAF3AAAYagAAGGoAAAsY//2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEB'+
          'AMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM'+
          'DAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAC1ALUDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAg'+
          'EDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZ'+
          'WmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09f'+
          'b3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCS'+
          'MzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKm'+
          'qsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9nPin8U9e8OePL+ysr/ybaHy9ieTG2Mxqx5'+
          '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'+
          'elSWdnJcSxSymYmZlZslVGOAOMKKKKKAP/Z';
  doc.addImage(tmpImgDt, 'JPEG', 7, 0.1, 0.8, 0.8);

  doc.setFont('Helvetica', '');
  doc.setFontType("bold");
  doc.setFontSize(12);
  doc.text(0.5,0.9,FullSpecTitle);

  doc.setFontType("normal");
  doc.setFontSize(9);
  font = fonts[0];
  size = sizes[0];

  //CREATE HEADER FOR COLUMN
  var tmpTxt , maxline=1;

  //CHECK IF DATA NOT IN TABLE RETURN
  if(jsonData.length == 0){
    doc.setDrawColor(184, 186, 198)
    .setLineWidth(1 / 82)
    .setFillColor(181, 198, 208)
    .rect(margin, verticalOffset, 8.5- 2*margin, 0.2, 'FD');

    tmpTxt = doc.setFont(font[0], font[1]).setFontSize(size)
    .splitTextToSize("No Record Found", 2); //colWidthArr[index]-0.05 THIS CONDITION USED FOR BOLD TEXT ONLY

    doc.setFontType("bold")
    .text(3.55, verticalOffset + size / 62, tmpTxt);

    // Output as Data URI DISPLAY IN BROWSER
    doc.output('datauri');
    // SAVE PDF
    // doc.save('ExportListDetails.pdf');
    return;
  }

  for(var k=1 ; k < 4 ; k++){
    var arrData;
  if(k==1){
    doc.setFont('Helvetica', '');
    doc.setFontType("bold");
    doc.setFontSize(10);
    doc.text(0.5,1.2,Title1);
    doc.setFontType("normal");
    doc.setFontSize(9);
    font = fonts[0];
    size = sizes[0];
     arrData = typeof jsonData != 'object' ? JSON.parse(jsonData) : jsonData;
  }
  else if(k==2){
    doc.setFont('Helvetica', '');
    doc.setFontType("bold");
    doc.setFontSize(10);
    doc.text(0.5,2.25,Title2);
    doc.setFontType("normal");
    doc.setFontSize(9);
    font = fonts[0];
    size = sizes[0];
     arrData = typeof jsonData1 != 'object' ? JSON.parse(jsonData1) : jsonData1;
  }
  else if(k==3){
    doc.addPage();
    doc.setFont('Helvetica', '');
    doc.setFontType("bold");
    doc.setFontSize(10);
    doc.text(0.5,0.9,Title3);
    doc.setFontType("normal");
    doc.setFontSize(9);
    font = fonts[0];
    size = sizes[0];
    verticalOffset = 1;
    var startTextFrm = [0.55]; //SET START MARGIN FOR TABLE
    var vrtclLineEnd =[];
    for( var index in colWidthArr){
      vrtclLineEnd.push(Math.round((colWidthArr[index] + startTextFrm[index]+0.02)*100)/100);
      startTextFrm.push(Math.round((vrtclLineEnd[index]+0.03)*100)/100);
    };

    arrData = typeof jsonData2 != 'object' ? JSON.parse(jsonData2) : jsonData2;
  }



  var tmpArry = [];
  // This loop will extract the label from 1st index of on array
  for ( var index in arrData[0])
    tmpArry.push(index);

  //LOOP FOR CREATING COLUMN TEXT
  for( var index =0; index < arrColmnName.length;index++){
      tmpTxt = doc.setFont(font[0], font[1]).setFontSize(size)
      .splitTextToSize(colWidthArr[index]-0.05); //colWidthArr[index]-0.05 THIS CONDITION USED FOR BOLD TEXT ONLY

      doc.setFontType("bold")
      .text(startTextFrm[index], verticalOffset + size / 72, tmpTxt);
    };

    //LOOP FOR CREATING VERTICALE LINE
    for( var index =0; index < colWidthArr.length-1;index++){
      doc.setDrawColor(184, 186, 198) // OTHER VERTICALE LINE
      .setLineWidth(1 / 82)
      .line(vrtclLineEnd[index], verticalOffset, vrtclLineEnd[index],verticalOffset);
    };

  // LOOP FOR ROW LEVEL IN JSONDATA
  var cellData;
  for ( var i = 0; i < arrData.length; i++) {
    var maxLineArr = [ 1 ];
    var maxLineNo = 1;
    var clmnLngthCunt =0;

    //LOOP AT CELL LEVEL FOR GETTING HIGHEST LINE LENGTH
    for (var index in arrData[i]) {
      var abc =arrData[i][index];
      cellData = doc.setFont(font[0], font[1]).setFontSize(size)
      .splitTextToSize(arrData[i][index], colWidthArr[clmnLngthCunt]);

      if(maxLineNo < cellData.length)
        maxLineNo =  cellData.length;

      clmnLngthCunt++;
    }//END LOOP FOR CELL LEVEL

    tmpVarOffset = (maxLineNo + 0.5) * size / 72;

    /*// ADDING NEW PAGE IF SIZE IS EXEEDS
    if ((verticalOffset + tmpVarOffset) > 10.5) {
      verticalOffset = 0.5;
      doc.addPage();
      doc.setDrawColor(184, 186, 198) // HORIZONTAL LINE
      .setLineWidth(1 / 82).line(margin, verticalOffset, 8.5 - margin,
          verticalOffset); // line(left-top,top,left-bottom,bottom)
    }*/

    //LOOP AT CELL LEVEL FOR INSERT TEXT
    clmnLngthCunt =0;
    for (var index in arrData[i]) {
      cellData = doc.setFont(font[0], font[1]).setFontSize(size)
      .splitTextToSize(arrData[i][index], colWidthArr[clmnLngthCunt]);

      doc.text(startTextFrm[clmnLngthCunt], verticalOffset + size / 72, cellData);

      clmnLngthCunt++;
    }//END LOOP FOR CELL LEVEL

    //LOOP FOR CREATING VERTICALE LINE FOR DATA
    for( var index =0; index < colWidthArr.length-1;index++){
      doc.setDrawColor(184, 186, 198) // START AND END VERTICALE LINE
      .setLineWidth(1 / 82).line(margin, verticalOffset, margin, (verticalOffset + tmpVarOffset)) // line(left-top,top,left-bottom,bottom)
      .line(7, verticalOffset, 7, (verticalOffset + tmpVarOffset));

      doc.setDrawColor(184, 186, 198) // OTHER VERTICALE LINE
      .setLineWidth(1 / 82)
      .line(vrtclLineEnd[index], verticalOffset, vrtclLineEnd[index], (verticalOffset + tmpVarOffset));
    };

    // BELOW CONDITION FOR CREATING TOP HORIZONTAL LINE
    if (i == 0) {
      doc.setDrawColor(184, 186, 198) // HORIZONTAL LINE
      .setLineWidth(1 / 82).line(margin, verticalOffset, 7, verticalOffset); // line(left-top,top,left-bottom,bottom)
    }

    // GET HIGHEST COLUMN HEIGHT FOR verticalOffset
    verticalOffset += (maxLineNo + 0.5) * size / 72;

    //alert("verticalOffset : "+verticalOffset);

    // BELOW CONDITION FOR CREATING OTHER THAN TOP HORIZONTAL LINE
    doc.setDrawColor(184, 186, 198).setLineWidth(1 / 82).line(margin, verticalOffset, 7, verticalOffset); // line(left-top,top,left-bottom,bottom)
  }// END LOOP RO ROW LEVEL
  verticalOffset = verticalOffset+0.5;
}
  // Output as Data URI DISPLAY IN BROWSER
  //doc.output('datauri');
  doc.setFontType("normal");
  doc.setFontSize(8);
  var disclText1 = 'Although every effort is being made to maintain accurate and correct information, some technical specifications are dynamic in nature.';
  var disclText2 = 'Therefore, this information is provided "as is" without warranty of any kind.';
  doc.text(0.5,verticalOffset,disclText1);
  doc.text(0.5,verticalOffset+0.12,disclText2);
  // SAVE PDF
  doc.save('Tanks.pdf');

};


var generatePDFFullSpecReefers= function(jsonData,jsonData1,FullSpecTitle,Title1,colWidthArr, arrColmnName,verticalOffset) {

if(verticalOffset == undefined)
   verticalOffset = 1.25; //SET DEFAULT MARGIN FROM TOP

var pageBreakFD = 2;

//CALCULATE START TEXT and vertical line end
var startTextFrm = [0.55]; //SET START MARGIN FOR TABLE
var vrtclLineEnd =[];
for( var index in colWidthArr){
  vrtclLineEnd.push(Math.round((colWidthArr[index] + startTextFrm[index]+0.02)*100)/100);
  startTextFrm.push(Math.round((vrtclLineEnd[index]+0.03)*100)/100);
};

// CODE FOR PARAGRAPH SETTING
var doc = new jsPDF('p', 'in', 'letter'), sizes = [ 9 ],
fonts = [[ 'Helvetica', '' ], [ 'Times', 'Roman' ] ], font, size, lines, colmTwoVal, coumnTreeVal, tmpVarOffset, margin = startTextFrm[0] - 0.03; // inches

// ADDING IMAGE INTO DOC OBJECT USE http://dataurl.net/ FOR CONVERT IMAGE
// INOT DATA IT SUPPORTS ONLY JPEG IMAGE TYPE
var tmpImgDt = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QCyRXhpZgAATU0AKgAAAAgABwE+AAUAAAACAAAAYgE/AAUAAAAGAAAAcg'+
          'MBAAUAAAABAAAAogMDAAEAAAABAAAAAFEQAAEAAAABAQAAAFERAAQAAAABAAAXEVESAAQAAAABAAAXEQAAAAAAAHomAAGGoAAAgIQAAYagAAD'+
          '6AAABhqAAAIDoAAGGoAAAdTAAAYagAADqYAABhqAAADqYAAGGoAAAF3AAAYagAAGGoAAAsY//2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEB'+
          'AMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM'+
          'DAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAC1ALUDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAg'+
          'EDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZ'+
          'WmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09f'+
          'b3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCS'+
          'MzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKm'+
          'qsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9nPin8U9e8OePL+ysr/ybaHy9ieTG2Mxqx5'+
          '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'+
          'elSWdnJcSxSymYmZlZslVGOAOMKKKKKAP/Z';
doc.addImage(tmpImgDt, 'JPEG', 7, 0.1, 0.8, 0.8);

doc.setFont('Helvetica', '');
doc.setFontType("bold");
doc.setFontSize(12);
doc.text(0.5,0.9,FullSpecTitle);

doc.setFontType("normal");
doc.setFontSize(9);
font = fonts[0];
size = sizes[0];

//CREATE HEADER FOR COLUMN
var tmpTxt , maxline=1;

//CHECK IF DATA NOT IN TABLE RETURN
if(jsonData.length == 0){
  doc.setDrawColor(184, 186, 198)
  .setLineWidth(1 / 82)
  .setFillColor(181, 198, 208)
  .rect(margin, verticalOffset, 8.5- 2*margin, 0.2, 'FD');

  tmpTxt = doc.setFont(font[0], font[1]).setFontSize(size)
  .splitTextToSize("No Record Found", 2); //colWidthArr[index]-0.05 THIS CONDITION USED FOR BOLD TEXT ONLY

  doc.setFontType("bold")
  .text(3.55, verticalOffset + size / 62, tmpTxt);

  // Output as Data URI DISPLAY IN BROWSER
  doc.output('datauri');
  // SAVE PDF
  // doc.save('ExportListDetails.pdf');
  return;
}

for(var k=1 ; k < 3 ; k++){
  var arrData;
  if(k==1){
   arrData = typeof jsonData != 'object' ? JSON.parse(jsonData) : jsonData;
  }
  else if(k==2){
    doc.addPage();
    doc.setFont('Helvetica', '');
    doc.setFontType("bold");
    doc.setFontSize(10);
    doc.text(0.5,0.9,Title1);
    doc.setFontType("normal");
    doc.setFontSize(9);
    font = fonts[0];
    size = sizes[0];
    verticalOffset = 1;
    var startTextFrm = [0.55]; //SET START MARGIN FOR TABLE
    var vrtclLineEnd =[];
    for( var index in colWidthArr){
      vrtclLineEnd.push(Math.round((colWidthArr[index] + startTextFrm[index]+0.02)*100)/100);
      startTextFrm.push(Math.round((vrtclLineEnd[index]+0.03)*100)/100);
    };
     arrData = typeof jsonData1 != 'object' ? JSON.parse(jsonData1) : jsonData1;
  }

var tmpArry = [];
// This loop will extract the label from 1st index of on array
for ( var index in arrData[0])
  tmpArry.push(index);

//LOOP FOR CREATING COLUMN TEXT
for( var index =0; index < arrColmnName.length;index++){
    tmpTxt = doc.setFont(font[0], font[1]).setFontSize(size)
    .splitTextToSize(colWidthArr[index]-0.05); //colWidthArr[index]-0.05 THIS CONDITION USED FOR BOLD TEXT ONLY

    doc.setFontType("bold")
    .text(startTextFrm[index], verticalOffset + size / 72, tmpTxt);
  };

  //LOOP FOR CREATING VERTICALE LINE
  for( var index =0; index < colWidthArr.length-1;index++){
    doc.setDrawColor(184, 186, 198) // OTHER VERTICALE LINE
    .setLineWidth(1 / 82)
    .line(vrtclLineEnd[index], verticalOffset, vrtclLineEnd[index],verticalOffset);
  };

// LOOP FOR ROW LEVEL IN JSONDATA
var cellData;
for ( var i = 0; i < arrData.length; i++) {
  var maxLineArr = [ 1 ];
  var maxLineNo = 1;
  var clmnLngthCunt =0;

  //LOOP AT CELL LEVEL FOR GETTING HIGHEST LINE LENGTH
  for (var index in arrData[i]) {
    var abc =arrData[i][index];
    cellData = doc.setFont(font[0], font[1]).setFontSize(size)
    .splitTextToSize(arrData[i][index], colWidthArr[clmnLngthCunt]);

    if(maxLineNo < cellData.length)
      maxLineNo =  cellData.length;

    clmnLngthCunt++;
  }//END LOOP FOR CELL LEVEL

  tmpVarOffset = (maxLineNo + 0.5) * size / 72;

  /*// ADDING NEW PAGE IF SIZE IS EXEEDS
  if ((verticalOffset + tmpVarOffset) > 10.5) {
    verticalOffset = 0.5;
    doc.addPage();
    doc.setDrawColor(184, 186, 198) // HORIZONTAL LINE
    .setLineWidth(1 / 82).line(margin, verticalOffset, 8.5 - margin,
        verticalOffset); // line(left-top,top,left-bottom,bottom)
  }*/

  //LOOP AT CELL LEVEL FOR INSERT TEXT
  clmnLngthCunt =0;
  for (var index in arrData[i]) {
    cellData = doc.setFont(font[0], font[1]).setFontSize(size)
    .splitTextToSize(arrData[i][index], colWidthArr[clmnLngthCunt]);

    doc.text(startTextFrm[clmnLngthCunt], verticalOffset + size / 72, cellData);

    clmnLngthCunt++;
  }//END LOOP FOR CELL LEVEL

  //LOOP FOR CREATING VERTICALE LINE FOR DATA
  for( var index =0; index < colWidthArr.length-1;index++){
    doc.setDrawColor(184, 186, 198) // START AND END VERTICALE LINE
    .setLineWidth(1 / 82).line(margin, verticalOffset, margin, (verticalOffset + tmpVarOffset)) // line(left-top,top,left-bottom,bottom)
    .line(5.5, verticalOffset, 5.5, (verticalOffset + tmpVarOffset));

    doc.setDrawColor(184, 186, 198) // OTHER VERTICALE LINE
    .setLineWidth(1 / 82)
    .line(vrtclLineEnd[index], verticalOffset, vrtclLineEnd[index], (verticalOffset + tmpVarOffset));
  };

  // BELOW CONDITION FOR CREATING TOP HORIZONTAL LINE
  if (i == 0) {
    doc.setDrawColor(184, 186, 198) // HORIZONTAL LINE
    .setLineWidth(1 / 82).line(margin, verticalOffset, 5.5, verticalOffset); // line(left-top,top,left-bottom,bottom)
  }

  // GET HIGHEST COLUMN HEIGHT FOR verticalOffset
  verticalOffset += (maxLineNo + 0.5) * size / 72;

  //alert("verticalOffset : "+verticalOffset);

  // BELOW CONDITION FOR CREATING OTHER THAN TOP HORIZONTAL LINE
  doc.setDrawColor(184, 186, 198).setLineWidth(1 / 82).line(margin, verticalOffset, 5.5, verticalOffset); // line(left-top,top,left-bottom,bottom)
}// END LOOP RO ROW LEVEL
verticalOffset = verticalOffset+0.5;
}
// Output as Data URI DISPLAY IN BROWSER
//doc.output('datauri');
doc.setFontType("normal");
doc.setFontSize(8);
var disclText1 = 'Although every effort is being made to maintain accurate and correct information, some technical specifications are dynamic in nature.';
var disclText2 = 'Therefore, this information is provided "as is" without warranty of any kind.';
doc.text(0.5,verticalOffset,disclText1);
doc.text(0.5,verticalOffset+0.12,disclText2);
// SAVE PDF
doc.save('Reefers.pdf');

};

jQuery.sap.require("sap.ui.model.json.JSONModel");
var LAPiclineItemNo;
var LAPicDNJSNo;
var LAPUnitNo;

sap.ui.model.json.JSONModel.extend("LAPrimaryImage", {
       
      createLesseeAPrimaryImgForm: function(){
             
         var back = new sap.m.Link({text: " < Back",
                  width:"8%",
                   wrapping:true,
           press: function(){
                  var bus = sap.ui.getCore().getEventBus();
                      bus.publish("nav", "back");
                      $('#idHdrContnt').html('Lessee Approval - Primary Details'); //CHANGE HEADER CONTENT
           }});
             
          var oLApriImgFormGLayout = new sap.ui.layout.form.ResponsiveGridLayout();
          var oLessePrimImgForm = new sap.ui.layout.form.Form({
                   layout: oLApriImgFormGLayout,
                   formContainers: [
                      new sap.ui.layout.form.FormContainer({
                               formElements: [
                                       new sap.ui.layout.form.FormElement({
                                           fields: [back],
                                           layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                                       }),
                                      new sap.ui.layout.form.FormElement("oLAImageElement",{
                                                  fields: [],
                                                  layoutData: new sap.ui.layout.ResponsiveFlowLayoutData({linebreak: true, margin: false})
                                       })
                                      ]
                        })
                                
                       ]
          });
          return oLessePrimImgForm;
      },
      
      bindLAPictures:function(){
            busyDialog.open();
            if(sap.ui.getCore().byId("oLAImageElement"))
                          sap.ui.getCore().byId("oLAImageElement").destroyFields();
            
             var filter = "/LineItem_Details_Pict('"+LAPUnitNo+"$"+LAPicDNJSNo+"$"+LAPiclineItemNo+"')";
             //alert("Str : "+serviceUrl+filter);
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
                      busyDialog.close();
                      
                      var oImage = new sap.ui.commons.Image({width:"50%", height:"350px"});
                       oImage.setDecorative(false);
                       oImage.setSrc("data:image/png;base64,"+data.File1);
                      
                      var imgElement = sap.ui.getCore().byId("oLAImageElement");
                      imgElement.addField(oImage);
                 },
                 function(err){
                    errorfromServer(err);
                 });
      }
              
});


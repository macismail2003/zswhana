/******** NP *******/
jQuery.sap.require("sap.ui.model.json.JSONModel");

sap.ui.model.json.JSONModel.extend("viewSalePicsView", {
	
	createViewSalePics: function(){
		
		// Labels
		var oLabelView = new sap.ui.commons.Label({text: "View Picture at : ",
            wrapping: true}).addStyleClass("margin10");
		
		// Buttons
	   	 var oBtnUpload = new sap.m.Button("idBtnUpload",{
		          text : "Upload",
		          type:sap.m.ButtonType.Unstyled,
		          layoutData: new sap.ui.layout.GridData({span: "L2 M3 S4",linebreak: false, margin: true}),
		          press:function(){showPortsDeports();}}).addStyleClass("submitBtn");
	   	 
	   //Images
	       var oImgBackIcnUDNPM = new sap.ui.commons.Image();
	       oImgBackIcnUDNPM.setSrc("images/back.png");
	       oImgBackIcnUDNPM.setAlt("Back picture");
	              
	       var oImgFrontIcnUDNPM = new sap.ui.commons.Image();
	       oImgFrontIcnUDNPM.setSrc("images/front.png");
	       oImgFrontIcnUDNPM.setAlt("Front picture");
	       
	       var oImgBottomIcnUDNPM = new sap.ui.commons.Image();
	       oImgBottomIcnUDNPM.setSrc("images/bottom.png");
	       oImgBottomIcnUDNPM.setAlt("Bottom picture");
	              
	       var oImgTopIcnUDNPM = new sap.ui.commons.Image();
	       oImgTopIcnUDNPM.setSrc("images/top.png");
	       oImgTopIcnUDNPM.setAlt("Front picture");

	   	 
	  // Buttons
			var oBtnViewAllTop = new sap.m.Button({
	            text : "View",
	            type:sap.m.ButtonType.Unstyled,
	            //icon: "images/view_all.png",
	            press:function(){alert("View All");}
	         }).addStyleClass("submitBtn");
			
			var oBtnViewAllBottom = new sap.m.Button({
	            text : "View",
	            type:sap.m.ButtonType.Unstyled,
	            //icon: "images/view_all.png",
	            press:function(){alert("View All");}
	         }).addStyleClass("submitBtn");
			
			var oBtnViewAllLeft = new sap.m.Button({
	            text : "View",
	            type:sap.m.ButtonType.Unstyled,
	            //icon: "images/view_all.png",
	            press:function(){alert("View All");}
	         }).addStyleClass("submitBtn");
			
			var oBtnViewAllRight = new sap.m.Button({
	            text : "View",
	            type:sap.m.ButtonType.Unstyled,
	            //icon: "images/view_all.png",
	            press:function(){alert("View All");}
	         }).addStyleClass("submitBtn");
			
			var oBtnViewAllCenter = new sap.m.Button({
	            text : "View",
	            type:sap.m.ButtonType.Unstyled,
	            //icon: "images/view_all.png",
	            press:function(){alert("View All");}
	         }).addStyleClass("submitBtn");
			
			var centerText = new sap.ui.commons.TextView({text: 'Overview', design: sap.ui.commons.TextViewDesign.Bold }).addStyleClass("fontStyle14");
			
			var oFlxBxVrtclTop = new sap.m.FlexBox({
	             items: [
	                     oImgTopIcnUDNPM, 
	                     new sap.ui.commons.TextView({text: 'Top', design: sap.ui.commons.TextViewDesign.Bold })
	             ],
	             direction: "Column",
	           }); 
	         
	         
	         var oFlxBxVrtclBottm = new sap.m.FlexBox({
	             items: [
	                           new sap.ui.commons.TextView({text: 'Bottom', design: sap.ui.commons.TextViewDesign.Bold }),oImgBottomIcnUDNPM
	             ],
	             direction: "Column",
	           }); 
	         
	         var oFlxBxVrtclBack = new sap.m.FlexBox({
	             items: [
	                     oImgBackIcnUDNPM, 
	                     new sap.ui.commons.TextView({text: 'Back', design: sap.ui.commons.TextViewDesign.Bold })
	             ],
	             direction: "Column",
	           }); 
	         
	         var oFlxBxVrtclFront = new sap.m.FlexBox({
	             items: [oImgFrontIcnUDNPM,
	                     new sap.ui.commons.TextView({text: 'Front', design: sap.ui.commons.TextViewDesign.Bold })
	             ],
	             direction: "Column",
	           }); 
			
			// Flex Box       
	        var oFlexBoxCenter = new sap.m.FlexBox({
		  		  items: [
		  		          centerText,
		  		        oBtnViewAllCenter
		     		  ],
		     		  direction: "Column",
		     		}).addStyleClass("centerAlign"); 
			
	     // Create a BorderLayout instance
            var oBorderLayoutInner = new sap.ui.commons.layout.BorderLayout("BorderLayoutInner", {width: "350px", height: "240px", 
             top: new sap.ui.commons.layout.BorderLayoutArea({
                     size: "18%",
                     contentAlign: "center",
                     visible: true, 
                     content: [oFlxBxVrtclTop]
                     }),
             bottom: new sap.ui.commons.layout.BorderLayoutArea({
                     size: "17%",
                     contentAlign: "center",
                     visible: true, 
                     content: [oFlxBxVrtclBottm]
                     }),
             begin: new sap.ui.commons.layout.BorderLayoutArea({
                     size: "9%",
                     contentAlign: "center",
                     visible: true, 
                     content: [oFlxBxVrtclBack]
                     }).addStyleClass("marginTop"),
             center: new sap.ui.commons.layout.BorderLayoutArea({
                     contentAlign: "center",
                     visible: true, 
                     //content: [new sap.ui.commons.TextView({text: 'Overview', design: sap.ui.commons.TextViewDesign.Bold }).addStyleClass("test")]
                     content: [oFlexBoxCenter]
                     }),
             end: new sap.ui.commons.layout.BorderLayoutArea({
                     size: "9%",
                     contentAlign: "center",
                     visible: true, 
                     content: [oFlxBxVrtclFront]
                     }).addStyleClass("marginTop")
             });
            
            var oBorderLayoutOuter = new sap.ui.commons.layout.BorderLayout("BorderLayoutOuter", {width: "600px", height: "346px", 
                    top: new sap.ui.commons.layout.BorderLayoutArea({
                            size: "10%",
                            contentAlign: "center",
                            visible: true, 
                            content: [oBtnViewAllTop]
                            }),
                    bottom: new sap.ui.commons.layout.BorderLayoutArea({
                            size: "20%",
                            contentAlign: "center",
                            visible: true, 
                            content: [oBtnViewAllBottom]
                            }).addStyleClass("marginTopOuter"),
                    begin: new sap.ui.commons.layout.BorderLayoutArea({
                            size: "20%",
                            top:"40%",
                            contentAlign: "center",
                            visible: true, 
                            content: [oBtnViewAllLeft]
                            }).addStyleClass("marginTopOuter"),
                    center: new sap.ui.commons.layout.BorderLayoutArea({
                            contentAlign: "center",
                            visible: true, 
                            content: [oBorderLayoutInner]
                            }).addStyleClass("borderBox"),
                    end: new sap.ui.commons.layout.BorderLayoutArea({
                            size: "20%",
                            contentAlign: "center",
                            visible: true, 
                            content: [oBtnViewAllRight]
                            }).addStyleClass("marginTopOuter")
                    });

			
            var oFlexBoxBOrderLayout = new sap.m.FlexBox({
		  		  items: [
		  		          oBorderLayoutOuter
		     		  ],
		     		  direction: "Column",
		     		}).addStyleClass("flexBorder");
            
			// Flex Box       
	        var oFlexBoxAll = new sap.m.FlexBox({
		  		  items: [
		  		          oLabelView,
		  		          oFlexBoxBOrderLayout,
		  		          oBtnUpload
		     		  ],
		     		  direction: "Column",
		     		}); 
			
			// Responsive Grid Layout
		    var oViewSalePicsLayout = new sap.ui.layout.form.ResponsiveGridLayout("idViewSalePicsLayout");
	   	 
			  // Online Form Starts
			     var oViewSalePicsForm = new sap.ui.layout.form.Form("idViewSalePicsForm",{
			             layout: oViewSalePicsLayout,
			             formContainers: [
			                     
			                     new sap.ui.layout.form.FormContainer("idViewSalePicsFormC1",{
			                             title: "View Sale Pictures",
			                             formElements: [
														new sap.ui.layout.form.FormElement({
														    fields: [oFlexBoxAll]
														})
			                                     ]
			                     })                    
			             ]
			     });
			     	return oViewSalePicsForm;
	}
});
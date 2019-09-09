var globalUserregCreateOrEdit = "CREATE";

sap.ui.controller("view.Userreg", {
  /**
   * Called when a controller is instantiated and its View controls (if available) are already created.
   * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
   * @memberOf view.Userreg
   */
  //	onInit: function() {
  //
  //	},

  /**
   * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
   * (NOT before the first rendering! onInit() is used for that one!).
   * @memberOf view.Userreg
   */
  //	onBeforeRendering: function() {
  //
  //	},

  /**
   * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
   * This hook is the same one that SAPUI5 controls get after being rendered.
   * @memberOf view.Userreg
   */
  //	onAfterRendering: function() {
  //
  //	},

  /**
   * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
   * @memberOf view.Userreg
   */
  //	onExit: function() {
  //
  //	}

  /*USERREG : Create Main Page */

  createMAINUSERPage : function(){

    	jQuery.sap.require("sap.ui.core.IconPool");



        var oContainer = new sap.m.TileContainer({});

        // // View
        // var oview = new Userreg();
        // var oVIEWTile = new sap.m.StandardTile({
        //                   visible : true,
        //                  id : "idVIEWTile",
        //                  icon :sap.ui.core.IconPool.getIconURI( "detail-view" ),
        //                           title:"View",
        //                           press: function(){
        //                                       var bus = sap.ui.getCore().getEventBus();
        //                                       bus.publish("nav", "to", {id : "Userreg2"});
        //                                       $('#idHdrContnt').html('User Requests - View');
        //                               }});
        // oContainer.addTile(oVIEWTile);

                // Edit
                var oedit = new Userreg();
                var oEDITTile = new sap.m.StandardTile({
                                   visible : true,
                                 id : "idEDITTile",
                                 icon :sap.ui.core.IconPool.getIconURI( "edit" ),
                                           title:"View/Edit",
                                           press: function(){
                                           	  globalUserregCreateOrEdit = "VIEW/EDIT";
                                              var bus = sap.ui.getCore().getEventBus();
                                              bus.publish("nav", "to", {id : "Userreg2"});
                                              $('#idHdrContnt').html('User Requests - View/Edit');
                                               }});
                oContainer.addTile(oEDITTile);

                        // Create
        var ocreate = new Userreg();
        var oCREATETile = new sap.m.StandardTile({
                           visible : true,
                         id : "idCREATETile",
                         icon :sap.ui.core.IconPool.getIconURI( "create-form" ),
                                   title:"Create",
                                   press: function(){
                                   		globalUserregCreateOrEdit = "CREATE";
	                                    var bus = sap.ui.getCore().getEventBus();
	                                    bus.publish("nav", "to", {id : "Userreg2"});
	                                    $('#idHdrContnt').html('User Requests - View');
                                    }});
        oContainer.addTile(oCREATETile);


        return oContainer;

    }
});

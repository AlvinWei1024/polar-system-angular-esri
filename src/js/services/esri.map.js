/**
 * Created by ALVIN on 2015/7/9.
 */
angular.module('esri',[]).service('esri_map',function($timeout,$q){
    var self=this;
    this.map;
    var mapDeferred = $q.defer();
    var navToolbar;
    require(['esri/map'], function(Map){
        self.createMap=function(eleID,mapOptions){
            if(self.map){
                throw new Error('The map has been created, you can not create another map. The map id is "'+this.map.id+'"');
            }
            else{
                if(!angular.element("#"+eleID)[0]){
                    throw new Error('You must provide a element with id: "'+eleID+'"');
                }
                else{
                    $timeout(function(){
                        self.map=new Map(eleID,mapOptions);
                        mapDeferred.resolve(self.map);
                    },0)
                }
            }
        }

    });
    this.navToolbar=undefined;
    mapDeferred.promise.then(function(map){
        require(['esri/toolbars/navigation'], function(Navigation){
            if(map){
                self.navToolbar=new Navigation(map);
                self.navToolbar.on("ExtentHistoryChange", extentHistoryChangeHandler);
                function extentHistoryChangeHandler() {
                    //alert(1)
                    //$("#map_zoomprev").disabled = self.navToolbar.isFirstExtent();
                    //$("#map_zoomnext").disabled = self.navToolbar.isLastExtent();
                }
                self.navToolbar.activateOption=function(option){

                    if(typeof option=='string'){
                        switch (option.toLowerCase()){
                            case 'zoom_in':{
                                self.navToolbar.activate(Navigation.ZOOM_IN);
                                return;
                            }
                            case 'zoom_out':{
                                self.navToolbar.activate(Navigation.ZOOM_OUT);
                                return;
                            }
                            case 'pan':{
                                self.navToolbar.activate(Navigation.PAN);
                                return;
                            }
                            default:{
                                throw new Error("The option should be ZOOM_IN, ZOOM_OUT or PAN")
                            }
                        }
                    }
                    else{
                        throw new Error('activateOption must be a string');
                    }
                }
                console.log(self.navToolbar)
            }
            else{
                throw new Error('the map is undefined');
            }
        });
    });

    //on(navToolbar, "ExtentHistoryChange", extentHistoryChangeHandler);
    function extentHistoryChangeHandler() {

        //$("#map_zoomprev").disabled = self.navToolbar.isFirstExtent();
        //$("#map_zoomnext").disabled = self.navToolbar.isLastExtent();
    }
    this.measurement=undefined;
    mapDeferred.promise.then(function(map){
        require(["esri/dijit/Measurement","esri/units"],function(Measurement,Units){
            self.createMeasurement=function(measureId){
                //console.log(angular.element("#"+measureId));
                if(!angular.element("#"+measureId)[0]){
                    throw new Error('You must provide a element with id: "'+measureId+'"');
                }
                else {
                    self.measurement = new Measurement({
                        map: self.map,
                        defaultAreaUnit: Units.SQUARE_MILES,
                        defaultLengthUnit: Units.KILOMETERS
                    }, angular.element("#"+measureId)[0].childNodes[0]);
                    self.measurement.startup()
                }
            }


        })
    });



    mapDeferred.promise.then(function(map){
        require(["esri/toolbars/draw", "esri/graphic","esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol"],
            function(Draw,Graphic,SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol){
                self.toolbar = new Draw(map);
                self.toolbar.on("draw-end", addToMap);
                function addToMap(evt) {
                    var symbol;
                    self.toolbar.deactivate();
                    map.showZoomSlider();
                    switch (evt.geometry.type) {
                        case "point":
                        case "multipoint":
                            symbol = new SimpleMarkerSymbol();
                            break;
                        case "polyline":
                            symbol = new SimpleLineSymbol();
                            break;
                        default:
                            symbol = new SimpleFillSymbol();
                            break;
                    }
                    var graphic = new Graphic(evt.geometry, symbol);
                    map.graphics.add(graphic);
                }
                self.toolbar.activeTool=function(type){
                    if(typeof type!='string'){
                        throw new Error("Draw type should be a string");
                    }
                    switch (type.toUpperCase()){
                        case 'POLYLINE':{
                            self.toolbar.activate(Draw.POLYLINE);
                            map.hideZoomSlider();
                            break;
                        }
                        case 'POLYGON':{
                            self.toolbar.activate(Draw.POLYGON);
                            map.hideZoomSlider();
                            break;
                        }
                        case 'CIRCLE':{
                            self.toolbar.activate(Draw.CIRCLE);
                            map.hideZoomSlider();
                            break;
                        }
                        case 'RECTANGLE':{
                            self.toolbar.activate(Draw.RECTANGLE);
                            map.hideZoomSlider();
                            break;
                        }
                        case 'ELLIPSE':{
                            self.toolbar.activate(Draw.ELLIPSE);
                            map.hideZoomSlider();
                            break;
                        }
                        case 'ARROW':{
                            self.toolbar.activate(Draw.ARROW);
                            map.hideZoomSlider();
                            break;
                        }
                        case 'GRAGHICS_CLEAR':{
                            try {
                                map.graphics.clear();
                            }
                            catch (e) {
                                console.log(e)
                            }
                            finally{
                                break;
                            }
                        }
                        default:
                            throw new Error("Draw type should be a string: POLYLINE, POLYGON, CIRCLE, RECTANGLE, ELLIPSE, ARROW, GRAGHICS_CLEAR");
                    }
                }
            });


    })



});

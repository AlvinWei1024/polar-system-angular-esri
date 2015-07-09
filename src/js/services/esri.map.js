/**
 * Created by ALVIN on 2015/7/9.
 */
angular.module('esri',[]).service('esri_map',function($timeout,$q){
    var self=this;
    this.map;
    var mapDeferred = $q.defer();
    var navToolbar;
    require(['esri/map'], function(Map, arcgisUtils){
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
        alert(1)
        //$("#map_zoomprev").disabled = self.navToolbar.isFirstExtent();
        //$("#map_zoomnext").disabled = self.navToolbar.isLastExtent();
    }



});

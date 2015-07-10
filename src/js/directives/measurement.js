/**
 * Created by ALVIN on 2015/7/9.
 */
app.directive('measurementTool',['esri_map',function(esri_map){
    return{
        restrict: 'A',
        scope:{},
        templateUrl:'tpl/measurement.tool.html',
        //compile:function($element, $attrs){
        //
        //
        //}
        replace:true,
        link:function(scope,element,attr,controller){
            //esri_map.createMeasurement("measurement_dijit");
            console.log("de ",esri_map)
            scope.isOpen=false;
            scope.open=function(){
                scope.isOpen=!scope.isOpen;
                if(scope.isOpen){
                    angular.element("#measurement_dijit").html('<div></div>')
                    esri_map.createMeasurement("measurement_dijit");
                }
                else{
                    esri_map.measurement.destroy();
                }
                //var measurement;
                //require(["esri/dijit/Measurement","esri/units"],function(Measurement,Units){
                //    if (measurement) {
                //        console.log('measurement has been created');
                //        measurement.destroy();
                //    }
                //    else if(scope.isOpen) {
                //        console.log('isOpen, esri_map. ' ,esri_map.map);
                //        console.log('isOpen, angular.element("#"+measurement_dijit)[0]. ' ,angular.element("#measurement_dijit")[0]);
                //        measurement = new Measurement({
                //            map: esri_map.map,
                //            defaultAreaUnit: Units.SQUARE_MILES,
                //            defaultLengthUnit: Units.KILOMETERS
                //        }, angular.element("#measurement_dijit")[0]);
                //        measurement.startup();
                //        console.log('measurement',measurement);
                //    }
                //    else {
                //        console.log('measurement',measurement);
                //        measurement.destroy();
                //    }
                //})
            };

            //angular.element(element).popover({
            //    html: true,
            //    content: function () {
            //        removeAllPopover();
            //        var popoverhtml = '<div style="width: 205px"></div><div id="measurement_dijit"></div>';
            //        var popoverDOM_div = document.createElement("div");
            //        popoverDOM_div.innerHTML = popoverhtml;
            //        return popoverDOM_div.innerHTML;
            //    },
            //    title: "地图测量",
            //    placement: "bottom"
            //})
        }

    }
}])

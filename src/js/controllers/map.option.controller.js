/**
 * Created by ALVIN on 2015/7/9.
 */
app.controller('mapOptionCtrl',['$scope','esri_map',function ($scope,esriMap){
    $scope.prevView=function(){
        if(esriMap.navToolbar.isFirstExtent()){
            console.log("the first now")
        }
        esriMap.navToolbar.zoomToPrevExtent();
    }
    $scope.lastView=function(){
        if(esriMap.navToolbar.isLastExtent()){
            console.log("the Last now")
        }
        esriMap.navToolbar.zoomToNextExtent();
    }
    $scope.pan=function(){
        esriMap.navToolbar.activateOption("PAN")
    }
    $scope.zoom_in=function(){
        esriMap.navToolbar.activateOption("ZOOM_IN")
    }
    $scope.zoom_out=function(){
        esriMap.navToolbar.activateOption("ZOOM_OUT")
    }
    $scope.fullExtent=function(){
        esriMap.navToolbar.activateOption("FULL_EXTENT");
        //esriMap.navToolbar.zoomToFullExtent();
        //console.log(esriMap.map.attribution.map)
        //esriMap.map.centerAndZoom(esri.geometry.Point(120, 31.5),5);
    }
}])

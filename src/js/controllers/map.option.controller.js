/**
 * Created by ALVIN on 2015/7/9.
 */
app.controller('mapOptionCtrl',['$scope','esri_map',function ($scope,esriMap){
    $scope.prevView=function(){
        if(esriMap.navToolbar.isFirstExtent()){
            alert("the first now")
        }
        esriMap.navToolbar.zoomToPrevExtent();
    }
    $scope.lastView=function(){
        if(esriMap.navToolbar.isLastExtent()){
            alert("the Last now")
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

}])

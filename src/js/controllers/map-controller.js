/**
 * Created by alvinWei on 15/5/13.
 */

app.controller('MapController', ['$scope','esri_map',function ($scope,esri_map) {
        var mapHeight=document.body.clientHeight-50;//minus header's height 50
        $scope.mapHeight=mapHeight;
        $scope.mapStyle={height:$scope.mapHeight+"px"};
        $(window).resize(function(){
            mapHeight=document.body.clientHeight-50;
            $scope.mapHeight=mapHeight;
            $scope.mapStyle={height:$scope.mapHeight+"px"};
        });
        esri_map.createMap("map",{
            center: [-118, 34.5],
            zoom: 5,
            basemap: "topo"
        })


        console.log(esri_map)
    }
]);

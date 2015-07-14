/**
 * Created by ALVIN on 2015/7/13.
 */
app.directive('basemapGallery',["$http",'esri_map',function($http,esriMap){
    return{
        restrict: 'A',
        scope:{},
        templateUrl:'tpl/esri-basemap-gallery.html',
        replace:true,
        compile: function($element, $attrs) {
            if(!$element.attr('id')){
                throw new Error('You must set id with directive measurementTool');
            }

            $element.removeAttr('id');
            var elementString='<li><div id=' + $attrs.id + '></div></li>';
            $($element[0].children[1]).append(elementString);
            return function(scope, element, attrs) {
                $http.get('js/data/baseMaps.json').success(function (result){
                    var basemap_index=[];
                    var basemap_object={};
                    angular.forEach(result,function(value,key){
                        basemap_index.push(value.index);
                        basemap_object[value.index]=value;
                    })
                    basemap_index.sort();
                    var basemaps=[];
                    angular.forEach(basemap_index,function(value){
                        basemaps.push(basemap_object[value])
                    })
                    //console.log()


                    esriMap.setBaseMapGallery(basemaps,attrs.id);
                    esriMap.basemapGallery.startup();
                });
                scope.isOpen=false;
                scope.open=function(){
                    //console.log(esriMap.map.spatialReference)
                    scope.isOpen=!scope.isOpen;
                };
            };
        }
    }
}])


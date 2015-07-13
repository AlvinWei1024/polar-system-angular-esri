/**
 * Created by ALVIN on 2015/7/10.
 */
app.directive('drawTool',['esri_map',function(esriMap){
    return{
        restrict:'EA',
        scope:{},
        templateUrl:'tpl/draw.tool.html',
        replace:true,
        link:function(scope,element,attr){
            scope.isOpen=false;
            scope.open=function(){
                scope.isOpen=!scope.isOpen;
            }
            scope.activieDrawTool=function(e){
                var t=e.target;
                if(t.getAttribute('name')=='draw-tool'){
                    esriMap.toolbar.activeTool(t.id);
                }
            }
        }
    }
}]);

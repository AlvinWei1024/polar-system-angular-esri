/**
 * Created by ALVIN on 2015/7/9.
 */
app.directive('measurementTool',['esri_map',function(esri_map){
    return{
        restrict: 'A',
        scope:{},
        templateUrl:'tpl/measurement.tool.html',
        replace:true,
        compile:function($element,$attrs){
            if(!$element.attr('id')){
                throw new Error('You must set id with directive measurementTool');
            }
            $element.removeAttr('id');
            var elementString='<li><div id=' + $attrs.id + '></div></li>';
            $($element[0].children[1]).append(elementString);
            return function(scope,element,attr){
                scope.isOpen=false;
                scope.open=function(){
                    scope.isOpen=!scope.isOpen;
                    if(scope.isOpen){
                        esri_map.createMeasurement(attr.id);
                    }
                    else{
                        esri_map.measurement.destroy();
                    }
                };
            }
        }
    }
}])

/**
 * Created by db on 2015/7/10.
 */
app.directive('centerAt',['esri_map',function(esri_map){
    return{
        restrict: 'A',
        scope: {},
        templateUrl: 'tpl/centerat.tool.html',
        replace: true,
        link: function(scope,element,attr,controller){
            scope.lat = '';
            scope.lot = '';
            scope.isOpen = false;
            scope.open = function(){
                scope.isOpen = !scope.isOpen;
            };
            scope.submitClick = function(){
                if(!isNaN(scope.lot) && !isNaN(scope.lat) && -180<=scope.lot && scope.lot<=180 && -90<=scope.lat && scope.lat<=90){
                    esri_map.centerAt(scope.lot,scope.lat);
                }else{
                    alert('请输入正确的经纬度！');
                }
            }
            scope.deleteClick = function(){
                scope.lat = '';
                scope.lot = '';
            }


        }
    }
}])
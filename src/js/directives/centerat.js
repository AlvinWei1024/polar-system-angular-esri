/**
 * Created by db on 2015/7/10.
 */
app.directive('centerAt', ['esri_map', function (esri_map) {
    return {
        restrict: 'A',
        scope: {},
        templateUrl: 'tpl/centerat.tool.html',

        replace: true,
        link: function (scope, element, attr, controller) {
            scope.lat = '';
            scope.lot = '';
            scope.lotError = false;
            scope.latError = false;
            scope.btnDisable = true;
            scope.isOpen = false;
            scope.open = function () {
                scope.isOpen = !scope.isOpen;
                if(!scope.isOpen ){
                    scope.lat = '';
                    scope.lot = '';
                    esri_map.centerAtRm();

                }
            };
            scope.submitClick = function () {
                esri_map.centerAt(scope.lot, scope.lat);
            }
            scope.deleteClick = function () {

                scope.lat = '';
                scope.lot = '';
                esri_map.centerAtRm();
            }
            scope.$watch('lot', function (newValue, oldValue) {
                if (!scope.lot) {
                    scope.btnDisable = true;
                    scope.lotError = false;
                }
                else {
                    if (!isNaN(scope.lot) && -180 <= scope.lot && scope.lot <= 180) {
                        scope.lotError = false;
                        if (scope.latError == false) {
                            scope.btnDisable = false;
                        }
                    }
                    else {
                        scope.lotError = true;
                        scope.btnDisable = true;
                    }

                }

            });
            scope.$watch('lat', function (newValue, oldValue) {
                if (!scope.lat) {
                    scope.btnDisable = true;
                    scope.latError = false;
                }
                else {
                    if (!isNaN(scope.lat) && -90 <= scope.lat && scope.lat <= 90) {
                        scope.latError = false;
                        if (scope.lotError == false) {
                            scope.btnDisable = false;
                        }
                    }
                    else {
                        scope.latError = true;
                        scope.btnDisable = true;
                    }
                }
            })

        }
    }
}])
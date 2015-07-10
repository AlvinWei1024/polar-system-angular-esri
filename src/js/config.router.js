'use strict';

/**
 * Config for the router
 */
angular.module('app')
  .run(
    [          '$rootScope', '$state', '$stateParams',
      function ($rootScope,   $state,   $stateParams) {
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;        
      }
    ]
  )
  .config(
    [          '$stateProvider', '$urlRouterProvider',
      function ($stateProvider,   $urlRouterProvider) {
          $urlRouterProvider
              .otherwise('/app/map');
          $stateProvider
              .state('app', {
                  abstract: true,
                  url: '/app',
                  templateUrl: 'tpl/app.html'
              })
              .state('app.map', {
                  url: '/map',
                  templateUrl: 'tpl/map.html',
                  resolve: {
                      deps: ['uiLoad','$ocLazyLoad',
                          function( uiLoad,$ocLazyLoad){
                              //return $ocLazyLoad.load('js/app/map/map-controller.js');
                              return uiLoad.load( [
                                  //'js/services/esri.map.js'
                                  ,'js/controllers/map-controller.js'
                                  ,'js/controllers/map.option.controller.js'
                                  ,'js/directives/measurement.js'
                                  ]).then(
                                  function(){
                                      //return $ocLazyLoad.load('js/app/map/load-map-controller.js');
                                  }
                              );
                          }]
                  }
              })
      }
    ]
  );
define(['angular', './sample-module'], function (angular, controllers) {
    'use strict';

    // Controller definition
    controllers.controller('DashboardsCtrl', ['$scope', '$log', 'PredixAssetService', 'PredixViewService', function ($scope, $log, PredixAssetService, PredixViewService) {

        PredixAssetService.getAssetsByParentId('root').then(function (initialContext) {

            //pre-select the 1st asset
            initialContext.data[0].selectedAsset = true;
            $scope.initialContexts = initialContext;
            $scope.initialContextName = initialContext.data[0].name;

            //load view selector
            $scope.openContext($scope.initialContexts.data[0]);
        }, function (message) {
            $log.error(message);
        });

        $scope.decks = [];
        $scope.selectedDeckUrl = null;

        // callback for when the Open button is clicked
        $scope.openContext = function (contextDetails) {

            // need to clean up the context details so it doesn't have the infinite parent/children cycle,
            // which causes problems later (can't interpolate: {{context}} TypeError: Converting circular structure to JSON)
            var newContext = angular.copy(contextDetails);
            newContext.children = [];
            newContext.parent = [];

            // url end point can change from context to context
            // so the same card can display different data from different contexts

            var url = {
                'parent': {
                    'datagrid-data': '/sample-data/datagrid-data.json'
                },
                'child': {
                    'R001-Startup': '{"start":1454284800000,"tags":[{"name":["Tst2"]}]}',
                    'R002-Thread': '{"start":1454284800000,"tags":[{"name":["Tst3"]}]}',
                    'R006-Continuous-Manual-Reject': '{"start":1454284800000,"tags":[{"name":["Tst4"]}]}',
                    'R008-VISEEL-CC2-Blu-Registration': '{"start":1454284800000,"tags":[{"name":["Tst5"]}]}',
                    'R033-VISBE1-BE-Ribbon-Position-DS': '{"start":1454284800000,"tags":[{"name":["Tst6"]}]}'
                },
                'child2': {
                    'R001-Startup': '{"start":1454284800000,"tags":[{"name":["Tst2"]}]}',
                    'R002-Thread': '{"start":1454284800000,"tags":[{"name":["Tst3"]}]}',
                    'R006-Continuous-Manual-Reject': '{"start":1454284800000,"tags":[{"name":["Tst4"]}]}',
                    'R008-VISEEL-CC2-Blu-Registration': '{"start":1454284800000,"tags":[{"name":["Tst5"]}]}',
                    'R033-VISBE1-BE-Ribbon-Position-DS': '{"start":1454284800000,"tags":[{"name":["Tst6"]}]}'
                },
                'child3': {
                    'R001-Startup': '{"start":1454284800000,"tags":[{"name":["Tst2"]}]}',
                    'R002-Thread': '{"start":1454284800000,"tags":[{"name":["Tst3"]}]}',
                    'R006-Continuous-Manual-Reject': '{"start":1454284800000,"tags":[{"name":["Tst4"]}]}',
                    'R008-VISEEL-CC2-Blu-Registration': '{"start":1454284800000,"tags":[{"name":["Tst5"]}]}',
                    'R033-VISBE1-BE-Ribbon-Position-DS': '{"start":1454284800000,"tags":[{"name":["Tst6"]}]}'
                }
            };

            newContext.urls = url[newContext.id];

            $scope.context = newContext;

            //Tag string can be classification from contextDetails
            PredixViewService.getDecksByTags(newContext.classification) // gets all decks for this context
                .then(function (decks) {
                    $scope.decks = [];

                    if (decks && decks.length > 0) {
                        decks.forEach(function (deck) {
                            $scope.decks.push({name: deck.title, id: deck.id});
                        });
                    }
                });
        };

        $scope.viewServiceBaseUrl = PredixViewService.baseUrl;

        $scope.getChildren = function (parent, options) {
            return PredixAssetService.getAssetsByParentId(parent.id, options);
        };

        $scope.handlers = {
            itemOpenHandler: $scope.openContext,
            getChildren: $scope.getChildren
            // (optional) click handler: itemClickHandler: $scope.clickHandler
        };
    }]);
});

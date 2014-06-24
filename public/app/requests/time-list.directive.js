'use strict';

angular.module('app').directive('pairTimeList',['config',
    function(config) {
        return {
            templateUrl: '/partials/common/time-list',
            restrict: 'E',
            scope: {
                timeList: '=bind'
            },
            link: function postLink(scope, element, attrs) {
                scope.maxTimeListItems = config.maxTimeListItems;
                scope.timeList = scope.timeList || [];
                scope.time = "";

                scope.addTime = function(){
                    if(scope.canAddToTimeList()){
                        scope.timeList.push(scope.time);
                        scope.time = "";
                    }
                };

                scope.canAddToTimeList = function () {
                    return scope.timeList.length < scope.maxTimeListItems;
                };

                scope.hasTimes = function () {
                    return scope.timeList.length > 0;
                };

                scope.removeTime = function(time){
                    var index = scope.timeList.indexOf(time);
                    scope.timeList.splice(index, 1);
                };

                scope.isEditMode = function () {
                    return attrs.mode === "edit";
                };

                scope.acceptTime = function (time) {

                };
            }
        };
    }
]);

'use strict';

angular.module('app').directive('pairTimeList', [
    function() {
        return {
            templateUrl: '/partials/common/time-list',
            restrict: 'E',
            link: function postLink(scope, element, attrs) {
                scope.hasTimes = function () {
                    return scope.timeList.length > 0;
                };
                scope.removeTimeSuggestion = function(time){
                    var index = scope.timeList.indexOf(time);
                    scope.timeList.splice(index, 1);
                };
            }
        };
    }
]);

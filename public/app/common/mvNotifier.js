'use strict';

angular.module('app').value('mvToastr', toastr);

angular.module('app').factory('mvNotifier', function(mvToastr, $log){
    return {
        notify: function(msg){
            mvToastr.success(msg);
            $log.log(msg);
        },
        error: function(msg) {
            mvToastr.error(msg);
            $log.error(msg);
        }
    };
});
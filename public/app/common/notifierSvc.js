'use strict';

angular.module('app').value('Toastr', toastr);

angular.module('app').factory('notifierSvc', function(Toastr, $log){
    return {
        notify: function(msg){
            Toastr.success(msg);
            $log.log(msg);
        },
        error: function(msg) {
            Toastr.error(msg);
            $log.error(msg);
        }
    };
});
angular.module('app').factory('mvAuth', function($http, mvIdentity, $q, mvUser){
    return {
        authenticateUser: function(username, password){
            var dfd = $q.defer();
            $http.post('/login', {username: username, password: password })
                .then(function(response){
                    if(response.data.success){
                        var user = new mvUser();
                        angular.extend(user, response.data.user);
                        mvIdentity.currentUser = user;
                        dfd.resolve(true);
                    } else {
                        dfd.resolve(false);
                    }
                });
            return dfd.promise;
        },

        createUser: function(newUserData){
            var newUser = new mvUser(newUserData);
            var dfd = $q.defer();
            newUser.$save().then(
                function(){ // On success
                    mvIdentity.currentUser = newUser;
                    dfd.resolve();
                },
                function(response){ // On error
                    dfd.reject(response.data.reason);
                }
            );
            return dfd.promise;
        },

        updateCurrentUser: function(data){
            var dfd = $q.defer();
            var clone = angular.copy(mvIdentity.currentUser);
            angular.extend(clone, data);
            clone.$update().then(
                function(){
                    mvIdentity.currentUser = clone;
                    dfd.resolve();
                },
                function(response){
                    dfd.reject(response.data.reason);
                }
            );
            return dfd.promise;
        },

        logoutUser: function(){
            var dfd = $q.defer();
            $http.post('/logout', {logout:true})
                .then(function(){
                    mvIdentity.currentUser = undefined;
                    dfd.resolve();
                });
            return dfd.promise;
        },

        authoriseCurrentUserForRoute: function(role){
            if(mvIdentity.isAuthorised(role)){
                return true;
            } else {
                return $q.reject("not authorised");
            }
        },

        authoriseAuthenticatedUserForRoute: function(){
            if(mvIdentity.isAuthenticated()){
                return true;
            } else {
                return $q.reject("not authorised");
            }
        }

    }
});
angular.module('app').factory('mvAuth', function($http, mvIdentity, $q, mvUser){
    return {

        /**
         * Authenticate using username and password
         * @param username
         * @param password
         * @returns {Promise.promise|*}
         */
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

        /**
         * Creates a new user
         * @param newUserData
         * @returns {Promise.promise|*}
         */
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

        /**
         * Updates the current users data
         * @param data The updated user data
         * @returns {Promise.promise|*}
         */
        updateCurrentUser: function(data){
            var dfd = $q.defer();
            // Clone the user to prevent flicker when the update completes
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

        /**
         * Logout the current user
         * @returns {Promise.promise|*}
         */
        logoutUser: function(){
            var dfd = $q.defer();
            $http.post('/logout', {logout:true})
                .then(function(){
                    mvIdentity.currentUser = undefined;
                    dfd.resolve();
                });
            return dfd.promise;
        },

        /**
         * Checks if the current user is authorised for a role
         * @param role The role to check
         * @returns {*} true if the user has the role,
         * otherwise a rejected promise is returned
         */
        authoriseCurrentUserForRoute: function(role){
            if(mvIdentity.isAuthorised(role)){
                return true;
            } else {
                return $q.reject("not authorised");
            }
        },

        /**
         * Checks to see if the current user is authenticated
         * @returns {*} true if the user is authenticated,
         * otherwise a rejected promise is returned
         */
        authoriseAuthenticatedUserForRoute: function(){
            if(mvIdentity.isAuthenticated()){
                return true;
            } else {
                return $q.reject("not authorised");
            }
        }

    };
});
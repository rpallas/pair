angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function($routeProvider, $locationProvider){

    $locationProvider.html5Mode(true);

    /**
     * Role checks are applied to routes for authorisation
     * @type {{admin: {auth: auth}, user: {auth: auth}}}
     */
    var routeRoleChecks = {
        admin: {
            auth: function(mvAuth){
                return mvAuth.authoriseCurrentUserForRoute('admin');
            }
        },
        user: {
            auth: function(mvAuth){
                return mvAuth.authoriseAuthenticatedUserForRoute();
            }
        }
    };

    // Register the routes
    $routeProvider
        .when('/', { templateUrl: '/partials/main/main', controller: 'mvMainCtrl'})
        .when('/admin/users', { templateUrl: '/partials/admin/user-list', controller: 'mvUserListCtrl', resolve: routeRoleChecks.admin })
        .when('/signup', { templateUrl: '/partials/account/signup', controller: 'mvSignupCtrl' })
        .when('/profile', { templateUrl: '/partials/account/profile', controller: 'mvProfileCtrl', resolve: routeRoleChecks.user })
        .when('/browse', { templateUrl: '/partials/users/browse', controller: 'mvBrowseCtrl', resolve: routeRoleChecks.user })
        .when('/browse/:id', { templateUrl: '/partials/users/browse-detail', controller: 'mvBrowseDetailCtrl', resolve: routeRoleChecks.user })

});

angular.module('app').run(function($rootScope, $location, mvIdentity){

    /**
     * Listen for route change errors and respond depending on the rejection type
     */
    $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection){
        // Relocate to the homepage if the user is not authorised for a route
        if(rejection === "not authorised"){
            $location.path('/');
        }
    });

    $rootScope.identity = mvIdentity;

});
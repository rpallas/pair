'use strict';

angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function($routeProvider, $locationProvider){

    $locationProvider.html5Mode(true);

    /**
     * Role checks are applied to routes for authorisation
     * @type {{admin: {auth: auth}, user: {auth: auth}}}
     */
    var routeRoleChecks = {
        admin: {
            auth: function(authSvc){
                return authSvc.authoriseCurrentUserForRoute('admin');
            }
        },
        user: {
            auth: function(authSvc){
                return authSvc.authoriseAuthenticatedUserForRoute();
            }
        }
    };

    // Register the routes
    $routeProvider
        .when('/', { templateUrl: '/partials/main/main', controller: 'mainCtrl'})
        .when('/admin/users', { templateUrl: '/partials/admin/user-list', controller: 'adminUserListCtrl', resolve: routeRoleChecks.admin })
        .when('/signup', { templateUrl: '/partials/account/signup', controller: 'signupCtrl' })
        .when('/profile', { templateUrl: '/partials/account/profile', controller: 'profileCtrl', resolve: routeRoleChecks.user })
        .when('/users', { templateUrl: '/partials/users/user-list', controller: 'userListCtrl', resolve: routeRoleChecks.user })
        .when('/users/:id', { templateUrl: '/partials/users/user-detail', controller: 'userDetailCtrl', resolve: routeRoleChecks.user })
        .when('/dashboard/', { templateUrl: '/partials/dashboard/dashboard', controller: 'dashboardCtrl', resolve: routeRoleChecks.user });

});

angular.module('app').run(function($rootScope, $location, identitySvc){

    /**
     * Listen for route change errors and respond depending on the rejection type
     */
    $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection){
        // Relocate to the homepage if the user is not authorised for a route
        if(rejection === "not authorised"){
            $location.path('/');
        }
    });

    $rootScope.identity = identitySvc;

    /**
     * Bootstrap navbar FIX - https://github.com/twbs/bootstrap/issues/9013
     * Prevents flicker/redraw effect when clicking navbar items while not on mobile (small screens)
     */
    $(document).on('click.nav','.navbar-collapse.in',function(e) {
        if( $(e.target).is('a') || $(e.target).is('button')) {
            $(this).collapse('hide');
        }
    });

});
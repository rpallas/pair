/*jshint expr: true*/
'use strict';

describe('navbarLoginCtrl', function(){
    var $controllerCtr, scope, location, q;

    beforeEach(module('app'));

    beforeEach(inject(function($controller, $rootScope, $location, $q){
        $controllerCtr = $controller;
        scope = $rootScope.$new();
        q = $q;
    }));

    it('should set the scope identity to be identitySvc', function(){
        var mockIdentity = {};

        $controllerCtr('navbarLoginCtrl', {
            $scope: scope,
            identitySvc: mockIdentity,
            notifierSvc: {},
            authSvc: {},
            $location: {}
        });

        expect(scope.identity).to.equal(mockIdentity);
    });

    describe('signin', function(){
        var stubAuthSvc, mockNotifierSvc, dfd;

        beforeEach(inject(function(authSvc){
            dfd = q.defer();
            stubAuthSvc = sinon.stub(authSvc, 'authenticateUser');
            stubAuthSvc.returns(dfd.promise);
            mockNotifierSvc = sinon.stub({ notify: function(){}, error: function(){} });
            $controllerCtr('navbarLoginCtrl', {
                $scope: scope,
                identitySvc: {},
                notifierSvc: mockNotifierSvc,
                authSvc: authSvc,
                $location: {}
            });
        }));

        it('should call notifierSvc.notify if the login was successful', function(){
            dfd.resolve(true); // Simulate successful login
            scope.signin('whatever', 'whatever');
            scope.$root.$digest();
            expect(mockNotifierSvc.notify.called).to.be.true;
        });

        it('should call notifierSvc.error if the login failed', function(){
            dfd.resolve(false); // Simulate failed login
            scope.signin('whatever', 'whatever');
            scope.$root.$digest();
            expect(mockNotifierSvc.error.called).to.be.true;
        });

    });

    describe('signout', function(){
        var stubAuthSvc, mockNotifierSvc, dfd;

        beforeEach(inject(function(authSvc, $location){
            dfd = q.defer();
            location = $location;
            stubAuthSvc = sinon.stub(authSvc, 'logoutUser');
            stubAuthSvc.returns(dfd.promise);
            mockNotifierSvc = sinon.stub({ notify: function(){}, error: function(){} });
            $controllerCtr('navbarLoginCtrl', {
                $scope: scope,
                identitySvc: {},
                notifierSvc: mockNotifierSvc,
                authSvc: authSvc,
                $location: location
            });
        }));

        it('should clear the scope username', function(){
            scope.username = "something"; // Initialise username with a value
            dfd.resolve(true); // Simulate successful logout
            scope.signout();
            scope.$root.$digest();
            expect(scope.username).to.equal("");
        });

        it('should clear the scope password', function(){
            scope.password = "something"; // Initialise password with a value
            dfd.resolve(true); // Simulate successful logout
            scope.signout();
            scope.$root.$digest();
            expect(scope.password).to.equal("");
        });

        it('should notify the user with a message to say they are logged out', function(){
            dfd.resolve(true); // Simulate successful logout
            scope.signout();
            scope.$root.$digest();
            expect(mockNotifierSvc.notify.called).to.be.true;
        });

        it('should redirect to the homepage', function(){
            var stubLocation = sinon.stub(location, "path");
            dfd.resolve(true); // Simulate successful logout
            scope.signout();
            scope.$root.$digest();
            expect(stubLocation.calledWith('/')).to.be.true;
        });

    });

});
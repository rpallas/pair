/*jshint expr: true*/
'use strict';

describe('mvNavbarLoginCtrl', function(){
    var $controllerCtr, scope, location, q;

    beforeEach(module('app'));

    beforeEach(inject(function($controller, $rootScope, $location, $q){
        $controllerCtr = $controller;
        scope = $rootScope.$new();
        q = $q;
    }));

    it('should set the scope identity to be mvIdentity', function(){
        var mockIdentity = {};

        $controllerCtr('mvNavbarLoginCtrl', {
            $scope: scope,
            mvIdentity: mockIdentity,
            mvNotifier: {},
            mvAuth: {},
            $location: {}
        });

        expect(scope.identity).to.equal(mockIdentity);
    });

    describe('signin', function(){
        var stubMvAuth, mockMvNotifier, dfd;

        beforeEach(inject(function(mvAuth){
            dfd = q.defer();
            stubMvAuth = sinon.stub(mvAuth, 'authenticateUser');
            stubMvAuth.returns(dfd.promise);
            mockMvNotifier = sinon.stub({ notify: function(){}, error: function(){} });
            $controllerCtr('mvNavbarLoginCtrl', {
                $scope: scope,
                mvIdentity: {},
                mvNotifier: mockMvNotifier,
                mvAuth: mvAuth,
                $location: {}
            });
        }));

        it('should call mvNotifier.notify if the login was successful', function(){
            dfd.resolve(true); // Simulate successful login
            scope.signin('whatever', 'whatever');
            scope.$root.$digest();
            expect(mockMvNotifier.notify.called).to.be.true;
        });

        it('should call mvNotifier.error if the login failed', function(){
            dfd.resolve(false); // Simulate failed login
            scope.signin('whatever', 'whatever');
            scope.$root.$digest();
            expect(mockMvNotifier.error.called).to.be.true;
        });

    });

    describe('signout', function(){
        var stubMvAuth, mockMvNotifier, dfd;

        beforeEach(inject(function(mvAuth, $location){
            dfd = q.defer();
            location = $location;
            stubMvAuth = sinon.stub(mvAuth, 'logoutUser');
            stubMvAuth.returns(dfd.promise);
            mockMvNotifier = sinon.stub({ notify: function(){}, error: function(){} });
            $controllerCtr('mvNavbarLoginCtrl', {
                $scope: scope,
                mvIdentity: {},
                mvNotifier: mockMvNotifier,
                mvAuth: mvAuth,
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
            expect(mockMvNotifier.notify.called).to.be.true;
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
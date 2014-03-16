/*jshint expr: true*/
'use strict';

describe('mvProfileCtrl', function(){
    var $controllerCtr, scope, mockMvAuth, mockMvNotifier, dfd, location;

    beforeEach(module('app'));

    beforeEach(inject(function($controller, $rootScope, $q, $location){
        dfd = $q.defer();
        location = $location;
        $controllerCtr = $controller;

        scope = $rootScope.$new();
        scope.firstName = 'fname';
        scope.lastName = 'lname';
        scope.email = 'email';
        scope.password = 'pass';

        mockMvAuth = sinon.stub({ createUser: function(){} });
        mockMvAuth.createUser.returns(dfd.promise);
        mockMvNotifier = sinon.stub({ notify: function(){}, error: function(){} });
        $controllerCtr('mvSignupCtrl', {
            $scope: scope,
            mvNotifier: mockMvNotifier,
            $location: location,
            mvAuth: mockMvAuth
        });
    }));

    describe('signup', function(){

        it('should call mvAuth.createUser including the email (username)', function(){
            scope.signup();
            expect(mockMvAuth.createUser.args[0][0].username)
                .to.equal(scope.email);
        });

        it('should call mvAuth.createUser including the password', function(){
            scope.signup();
            expect(mockMvAuth.createUser.args[0][0].password)
                .to.equal(scope.password);
        });

        it('should call mvAuth.createUser including the firstName', function(){
            scope.signup();
            expect(mockMvAuth.createUser.args[0][0].firstName)
                .to.equal(scope.firstName);
        });

        it('should call mvAuth.createUser including the lastName', function(){
            scope.signup();
            expect(mockMvAuth.createUser.args[0][0].lastName)
                .to.equal(scope.lastName);
        });

        it('should call mvNotifier.notify if the update was successful', function(){
            dfd.resolve(true); // Simulate successful update
            scope.signup();
            scope.$root.$digest();
            expect(mockMvNotifier.notify.called).to.be.true;
        });

        it('should call mvNotifier.error if the update failed', function(){
            dfd.reject('reason'); // Simulate failed update
            scope.signup();
            scope.$root.$digest();
            expect(mockMvNotifier.error.calledWith("reason")).to.be.true;
        });

    });

});
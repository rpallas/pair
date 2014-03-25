/*jshint expr: true*/
'use strict';

describe('signupCtrl', function(){
    var $controllerCtr, scope, mockAuthSvc, mockNotifierSvc, dfd, location;

    beforeEach(module('app'));

    beforeEach(inject(function($controller, $rootScope, $q, $location){
        dfd = $q.defer();
        location = $location;
        $controllerCtr = $controller;

        scope = $rootScope.$new();
        scope.displayName = 'displayName';
        scope.email = 'email';
        scope.password = 'pass';

        mockAuthSvc = sinon.stub({ createUser: function(){} });
        mockAuthSvc.createUser.returns(dfd.promise);
        mockNotifierSvc = sinon.stub({ notify: function(){}, error: function(){} });
        $controllerCtr('signupCtrl', {
            $scope: scope,
            notifierSvc: mockNotifierSvc,
            $location: location,
            authSvc: mockAuthSvc
        });
    }));

    describe('signup', function(){

        it('should call authSvc.createUser including the email (username)', function(){
            scope.signup();
            expect(mockAuthSvc.createUser.args[0][0].username)
                .to.equal(scope.email);
        });

        it('should call authSvc.createUser including the password', function(){
            scope.signup();
            expect(mockAuthSvc.createUser.args[0][0].password)
                .to.equal(scope.password);
        });

        it('should call authSvc.createUser including the displayName', function(){
            scope.signup();
            expect(mockAuthSvc.createUser.args[0][0].displayName)
                .to.equal(scope.displayName);
        });

        it('should call notifierSvc.notify if the update was successful', function(){
            dfd.resolve(true); // Simulate successful update
            scope.signup();
            scope.$root.$digest();
            expect(mockNotifierSvc.notify.called).to.be.true;
        });

        it('should call notifierSvc.error if the update failed', function(){
            dfd.reject('reason'); // Simulate failed update
            scope.signup();
            scope.$root.$digest();
            expect(mockNotifierSvc.error.calledWith("reason")).to.be.true;
        });

    });

});
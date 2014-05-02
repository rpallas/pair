/*jshint expr: true*/
'use strict';

describe('profileCtrl', function(){
    var $controllerCtr, scope, mockAuthSvc, mockNotifierSvc, mockIdentitySvc, dfd, location;

    beforeEach(module('app'));

    beforeEach(inject(function($controller, $rootScope, $q, $location){
        dfd = $q.defer();
        $controllerCtr = $controller;
        location = $location;
        scope = $rootScope.$new();
        mockIdentitySvc = {
            currentUser: {
                displayName: 'displayName',
                username: 'email',
                skills: ['skill 1', 'skill 2'],
                getProfileImage : function(){}
            }
        };
        mockAuthSvc = sinon.stub({ updateCurrentUser: function(){} });
        mockAuthSvc.updateCurrentUser.returns(dfd.promise);
        mockNotifierSvc = sinon.stub({ notify: function(){}, error: function(){} });
        $controllerCtr('profileCtrl', {
            $scope: scope,
            authSvc: mockAuthSvc,
            identitySvc: mockIdentitySvc,
            notifierSvc: mockNotifierSvc,
            $location: location
        });
    }));

    it('should set the scope email to the current users email', function(){
        expect(scope.email).to.equal(mockIdentitySvc.currentUser.username);
    });

    it('should set the scope displayName to the current users display name', function(){
        expect(scope.displayName).to.equal(mockIdentitySvc.currentUser.displayName);
    });

    it('should set the scope skills to be a string of each string joined with a comma', function(){
        expect(scope.skills).to.equal("skill 1, skill 2");
    });

    describe('update', function(){

        it('should update the current user', function(){
            scope.update();
            expect(mockAuthSvc.updateCurrentUser.called).to.be.true;
        });

        it('should include the password if the scope has one', function(){
            scope.password = 'pass';
            mockIdentitySvc.currentUser.password = 'pass';
            scope.update();
            expect(mockAuthSvc.updateCurrentUser.args[0][0].password)
                .to.equal(mockIdentitySvc.currentUser.password);
        });

        it('should call notifierSvc.notify if the update was successful', function(){
            dfd.resolve(true); // Simulate successful update
            scope.update();
            scope.$root.$digest();
            expect(mockNotifierSvc.notify.called).to.be.true;
        });

        it('should redirect to the readonly profile if the update was successful', function(){
            var stubLocation = sinon.stub(location, "path");
            dfd.resolve(true); // Simulate successful update
            scope.update();
            scope.$root.$digest();
            expect(stubLocation.calledWith('/users/' + mockIdentitySvc.currentUser._id)).to.be.true;
        });

        it('should call notifierSvc.error if the update failed', function(){
            dfd.reject('reason'); // Simulate failed update
            scope.update();
            scope.$root.$digest();
            expect(mockNotifierSvc.error.calledWith("reason")).to.be.true;
        });

    });
});
/*jshint expr: true*/
'use strict';

describe('mvProfileCtrl', function(){
    var $controllerCtr, scope, mockMvAuth, mockMvNotifier, mockMvIdentity, dfd;

    beforeEach(module('app'));

    beforeEach(inject(function($controller, $rootScope, $q){
        dfd = $q.defer();
        $controllerCtr = $controller;
        scope = $rootScope.$new();
        mockMvIdentity = {
            currentUser: {
                firstName: 'fname',
                lastName: 'lname',
                username: 'email',
                skills: ['skill 1', 'skill 2']
            }
        };
        mockMvAuth = sinon.stub({ updateCurrentUser: function(){} });
        mockMvAuth.updateCurrentUser.returns(dfd.promise);
        mockMvNotifier = sinon.stub({ notify: function(){}, error: function(){} });
        $controllerCtr('mvProfileCtrl', {
            $scope: scope,
            mvAuth: mockMvAuth,
            mvIdentity: mockMvIdentity,
            mvNotifier: mockMvNotifier
        });
    }));

    it('should set the scope email to the current users email', function(){
        expect(scope.email).to.equal(mockMvIdentity.currentUser.username);
    });

    it('should set the scope firstName to the current users first name', function(){
        expect(scope.firstName).to.equal(mockMvIdentity.currentUser.firstName);
    });

    it('should set the scope lastName to the current users last name', function(){
        expect(scope.lastName).to.equal(mockMvIdentity.currentUser.lastName);
    });

    it('should set the scope skills to be a string of each string joined with a comma', function(){
        expect(scope.skills).to.equal("skill 1, skill 2");
    });

    describe('update', function(){

        it('should call mvAuth.updateCurrentUser passing correct data', function(){
            scope.update();
            expect(mockMvAuth.updateCurrentUser.args[0][0])
                .to.deep.equal(mockMvIdentity.currentUser);
        });

        it('should include the password if the scope has one', function(){
            scope.password = 'pass';
            mockMvIdentity.currentUser.password = 'pass';
            scope.update();
            expect(mockMvAuth.updateCurrentUser.args[0][0])
                .to.deep.equal(mockMvIdentity.currentUser);
        });

        it('should call mvNotifier.notify if the update was successful', function(){
            dfd.resolve(true); // Simulate successful update
            scope.update();
            scope.$root.$digest();
            expect(mockMvNotifier.notify.called).to.be.true;
        });

        it('should call mvNotifier.error if the update failed', function(){
            dfd.reject('reason'); // Simulate failed update
            scope.update();
            scope.$root.$digest();
            expect(mockMvNotifier.error.calledWith("reason")).to.be.true;
        });

    });
});
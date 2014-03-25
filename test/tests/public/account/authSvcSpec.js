/*jshint expr: true*/
'use strict';

describe('authSvc', function(){
    var httpBackend, mockIdentitySvc, auth, mockUserSave, mockUserUpdate, dfd, User;

    beforeEach(module('app'));

    beforeEach(function(){
        mockIdentitySvc = sinon.stub({
            isAuthorised: function(role){},
            isAuthenticated: function(){}
        });
        module(function($provide){
            $provide.value("identitySvc", mockIdentitySvc);
        });
        inject(function($httpBackend, authSvc, userResource, $q){
            httpBackend = $httpBackend;
            auth = authSvc;
            dfd = $q.defer();
            mockUserSave = sinon.stub(userResource, "save");
            mockUserUpdate = sinon.stub(userResource, "update");
            User = userResource;
            mockIdentitySvc.currentUser = new User();
        });
    });

    afterEach(function(){
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    describe('authenticateUser', function(){
        var user = 'rob', pass = 'pass',
            loginData = {username: user, password: pass};

        it('should make a POST request to /login with correct username and password', function(){
            httpBackend.expectPOST('/login', loginData).respond(201, {});
            auth.authenticateUser(user, pass);
            httpBackend.flush();
        });

        it('should resolve the promise with "false" if the login failed', function(){
            httpBackend.whenPOST('/login', loginData).respond(201, { success: false });

            var promise = auth.authenticateUser(user, pass);
            httpBackend.flush();

            expect(promise).to.be.fulfilled;
            expect(promise).to.become(false);
        });

        it('should resolve the promise with "true" if the login was successful', function(){
            httpBackend.whenPOST('/login', loginData).respond(201, { success: true });

            var promise = auth.authenticateUser(user, pass);
            httpBackend.flush();

            expect(promise).to.be.fulfilled;
            expect(promise).to.become(true);
        });

        it('should set identitySvc.currentUser if the login was successful', function(){
            httpBackend.whenPOST('/login', loginData)
                .respond(201, { success: true, user: { displayName: "displayName" } });

            auth.authenticateUser(user, pass);
            httpBackend.flush();

            expect(mockIdentitySvc.currentUser.displayName).to.equal('displayName');
        });

    });

    describe('createUser', function(){

        it('should create a new user with the correct data', function(){
            var newUserData = { username: "user", password: "pass", displayName: "displayName" };
            mockUserSave.returns(dfd.promise);
            var expectedUser = new User(newUserData);
            auth.createUser(newUserData);
            expect(mockUserSave.args[0][1]).to.deep.equal(expectedUser);
        });

        it('should set identitySvc.currentUser to the newly created user if the save was successful', function(){
            var newUserData = { username: "user", password: "pass", displayName: "displayName" };
            mockUserSave.returns(dfd.promise);
            dfd.resolve();
            var expectedUser = new User(newUserData);
            auth.createUser(newUserData).then(function(){
                expect(mockIdentitySvc.currentUser).to.deep.equal(expectedUser);
            });
        });

        it('should resolve the promise if the save was successful', function(){
            var newUserData = { username: "user", password: "pass", displayName: "displayName" };
            mockUserSave.returns(dfd.promise);
            dfd.resolve();
            var promise = auth.createUser(newUserData);
            expect(promise).to.be.fulfilled;
        });

        it('should reject the promise with a reason if the save was NOT successful', function(){
            var newUserData = { username: "user", password: "pass", displayName: "displayName" };
            mockUserSave.returns(dfd.promise);
            dfd.reject({data:{reason: 'reason'}});
            var promise = auth.createUser(newUserData);
            expect(promise).to.be.rejectedWith('reason');
        });

    });

    describe('updateCurrentUser', function(){

        it('should update the user with the correct data', function(){
            var newUserData = { username: "user", password: "pass", displayName: "displayName" };
            mockUserUpdate.returns(dfd.promise);
            var expectedUser = new User(newUserData);
            auth.updateCurrentUser(newUserData);
            expect(mockUserUpdate.args[0][1]).to.deep.equal(expectedUser);
        });

        it('should clone the current user to prevent flicker', function(){
            var newUserData = { username: "user", password: "pass", displayName: "displayName" };
            mockUserUpdate.returns(dfd.promise);
            var angularCopySpy = sinon.spy(angular, 'copy');
            auth.updateCurrentUser(newUserData);
            expect(angularCopySpy.calledWith(mockIdentitySvc.currentUser)).to.be.true;
        });

        it('should update identitySvc.currentUser with the new data if the update was successful', function(){
            var newUserData = { username: "user", password: "pass", displayName: "displayName" };
            mockUserUpdate.returns(dfd.promise);
            dfd.resolve();
            var expectedUser = new User(newUserData);
            auth.updateCurrentUser(newUserData).then(function(){
                expect(mockIdentitySvc.currentUser).to.deep.equal(expectedUser);
            });
        });

        it('should resolve the promise if the update was successful', function(){
            var newUserData = { username: "user", password: "pass", displayName: "displayName" };
            mockUserUpdate.returns(dfd.promise);
            dfd.resolve();
            var promise = auth.updateCurrentUser(newUserData);
            expect(promise).to.be.fulfilled;
        });

        it('should reject the promise with a reason if the update was NOT successful', function(){
            var newUserData = { username: "user", password: "pass", displayName: "displayName" };
            mockUserUpdate.returns(dfd.promise);
            dfd.reject({data:{reason: 'reason'}});
            var promise = auth.updateCurrentUser(newUserData);
            expect(promise).to.be.rejectedWith('reason');
        });

    });

    describe('logoutUser', function(){

        it('should make a POST request to /logout', function(){
            httpBackend.expectPOST('/logout', {logout:true}).respond(201, {});
            auth.logoutUser();
            httpBackend.flush();
        });

        it('should set identitySvc.currentUser to undefined', function(){
            httpBackend.whenPOST('/logout', {logout:true}).respond(201, {});
            auth.logoutUser();
            httpBackend.flush();
            expect(mockIdentitySvc.currentUser).to.be.undefined;
        });

        it('should should resolve the promise if the logout was successful', function(){
            httpBackend.whenPOST('/logout', {logout:true}).respond(201, {});
            var promise = auth.logoutUser();
            httpBackend.flush();
            expect(promise).to.be.fulfilled;
        });

    });

    describe('authoriseCurrentUserForRoute', function(){

        it('should return true if the user is authorised for the route', function(){
            mockIdentitySvc.isAuthorised.returns(true);
            var result = auth.authoriseCurrentUserForRoute('a role');
            expect(result).to.equal(true);
        });

        it('should return a rejected promise if the user is NOT authorised for the route', function(){
            mockIdentitySvc.isAuthorised.returns(false);
            var result = auth.authoriseCurrentUserForRoute('a role');
            expect(result).to.be.rejectedWith("not authorised");
        });

    });

    describe('authoriseAuthenticatedUserForRoute', function(){

        it('should return true if the user is authenticated', function(){
            mockIdentitySvc.isAuthenticated.returns(true);
            var result = auth.authoriseAuthenticatedUserForRoute();
            expect(result).to.equal(true);
        });

        it('should return a rejected promise if the user is NOT authenticated', function(){
            mockIdentitySvc.isAuthenticated.returns(false);
            var result = auth.authoriseAuthenticatedUserForRoute();
            expect(result).to.be.rejectedWith("not authorised");
        });

    });

});
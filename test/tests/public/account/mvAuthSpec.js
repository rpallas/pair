/*jshint expr: true*/
'use strict';

describe('mvAuth', function(){
    var httpBackend, mockMvIdentity, auth, mockUserSave, mockUserUpdate, dfd, User;

    beforeEach(module('app'));

    beforeEach(function(){
        mockMvIdentity = sinon.stub({
            isAuthorised: function(role){},
            isAuthenticated: function(){}
        });
        module(function($provide){
            $provide.value("mvIdentity", mockMvIdentity);
        });
        inject(function($httpBackend, mvAuth, mvUser, $q){
            httpBackend = $httpBackend;
            auth = mvAuth;
            dfd = $q.defer();
            mockUserSave = sinon.stub(mvUser, "save");
            mockUserUpdate = sinon.stub(mvUser, "update");
            User = mvUser;
            mockMvIdentity.currentUser = new User();
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

        it('should set mvIdentity.currentUser if the login was successful', function(){
            httpBackend.whenPOST('/login', loginData)
                .respond(201,  { success: true, user: { firstName: 'fname', lastName: 'lname'} });

            auth.authenticateUser(user, pass);
            httpBackend.flush();

            expect(mockMvIdentity.currentUser.firstName).to.equal('fname');
            expect(mockMvIdentity.currentUser.lastName).to.equal('lname');
        });

    });

    describe('createUser', function(){

        it('should create a new user with the correct data', function(){
            var newUserData = { username: "user", password: "pass", firstName: "fname", lastName: "lname" };
            mockUserSave.returns(dfd.promise);
            var expectedUser = new User(newUserData);
            auth.createUser(newUserData);
            expect(mockUserSave.args[0][1]).to.deep.equal(expectedUser);
        });

        it('should set mvIdentity.currentUser to the newly created user if the save was successful', function(){
            var newUserData = { username: "user", password: "pass", firstName: "fname", lastName: "lname" };
            mockUserSave.returns(dfd.promise);
            dfd.resolve();
            var expectedUser = new User(newUserData);
            auth.createUser(newUserData).then(function(){
                expect(mockMvIdentity.currentUser).to.deep.equal(expectedUser);
            });
        });

        it('should resolve the promise if the save was successful', function(){
            var newUserData = { username: "user", password: "pass", firstName: "fname", lastName: "lname" };
            mockUserSave.returns(dfd.promise);
            dfd.resolve();
            var promise = auth.createUser(newUserData);
            expect(promise).to.be.fulfilled;
        });

        it('should reject the promise with a reason if the save was NOT successful', function(){
            var newUserData = { username: "user", password: "pass", firstName: "fname", lastName: "lname" };
            mockUserSave.returns(dfd.promise);
            dfd.reject({data:{reason: 'reason'}});
            var promise = auth.createUser(newUserData);
            expect(promise).to.be.rejectedWith('reason');
        });

    });

    describe('updateCurrentUser', function(){

        it('should update the user with the correct data', function(){
            var newUserData = { username: "user", password: "pass", firstName: "fname", lastName: "lname" };
            mockUserUpdate.returns(dfd.promise);
            var expectedUser = new User(newUserData);
            auth.updateCurrentUser(newUserData);
            expect(mockUserUpdate.args[0][1]).to.deep.equal(expectedUser);
        });

        it('should clone the current user to prevent flicker', function(){
            var newUserData = { username: "user", password: "pass", firstName: "fname", lastName: "lname" };
            mockUserUpdate.returns(dfd.promise);
            var angularCopySpy = sinon.spy(angular, 'copy');
            auth.updateCurrentUser(newUserData);
            expect(angularCopySpy.calledWith(mockMvIdentity.currentUser)).to.be.true;
        });

        it('should update mvIdentity.currentUser with the new data if the update was successful', function(){
            var newUserData = { username: "user", password: "pass", firstName: "fname", lastName: "lname" };
            mockUserUpdate.returns(dfd.promise);
            dfd.resolve();
            var expectedUser = new User(newUserData);
            auth.updateCurrentUser(newUserData).then(function(){
                expect(mockMvIdentity.currentUser).to.deep.equal(expectedUser);
            });
        });

        it('should resolve the promise if the update was successful', function(){
            var newUserData = { username: "user", password: "pass", firstName: "fname", lastName: "lname" };
            mockUserUpdate.returns(dfd.promise);
            dfd.resolve();
            var promise = auth.updateCurrentUser(newUserData);
            expect(promise).to.be.fulfilled;
        });

        it('should reject the promise with a reason if the update was NOT successful', function(){
            var newUserData = { username: "user", password: "pass", firstName: "fname", lastName: "lname" };
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

        it('should set mvIdentity.currentUser to undefined', function(){
            httpBackend.whenPOST('/logout', {logout:true}).respond(201, {});
            auth.logoutUser();
            httpBackend.flush();
            expect(mockMvIdentity.currentUser).to.be.undefined;
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
            mockMvIdentity.isAuthorised.returns(true);
            var result = auth.authoriseCurrentUserForRoute('a role');
            expect(result).to.equal(true);
        });

        it('should return a rejected promise if the user is NOT authorised for the route', function(){
            mockMvIdentity.isAuthorised.returns(false);
            var result = auth.authoriseCurrentUserForRoute('a role');
            expect(result).to.be.rejectedWith("not authorised");
        });

    });

    describe('authoriseAuthenticatedUserForRoute', function(){

        it('should return true if the user is authenticated', function(){
            mockMvIdentity.isAuthenticated.returns(true);
            var result = auth.authoriseAuthenticatedUserForRoute();
            expect(result).to.equal(true);
        });

        it('should return a rejected promise if the user is NOT authenticated', function(){
            mockMvIdentity.isAuthenticated.returns(false);
            var result = auth.authoriseAuthenticatedUserForRoute();
            expect(result).to.be.rejectedWith("not authorised");
        });

    });

});
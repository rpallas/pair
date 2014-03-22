/*jshint expr: true*/
'use strict';

describe('notifierSvc', function(){
    var mockToastr, notifier, mockLog, log;

    beforeEach(module('app'));

    beforeEach(function(){
        mockToastr = sinon.stub({
            success: function(msg){},
            error: function(msg){}
        });
        module(function($provide){
            $provide.value("Toastr", mockToastr);
        });
        inject(function(notifierSvc, $log){
            notifier = notifierSvc;
            log = $log;
        });
    });

    describe('notify', function(){

        it("should call Toastr.success with the correct message", function(){
            notifier.notify('message');
            expect(mockToastr.success.called).to.be.true;
        });

        it("should call $log.log with the correct message", function(){
            log.reset();
            notifier.notify('message');
            expect(log.log.logs).has.length(1);
            expect(log.log.logs[0][0]).to.equal('message');
        });

    });

    describe('error', function(){

        it("should call Toastr.error with the correct message", function(){
            notifier.error('message');
            expect(mockToastr.error.called).to.be.true;
        });

        it("should call $log.error with the correct message", function(){
            log.reset();
            notifier.error('message');
            expect(log.error.logs).has.length(1);
            expect(log.error.logs[0][0]).to.equal('message');
        });

    });
});
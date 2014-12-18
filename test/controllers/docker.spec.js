describe('Controller : DockerController definition', function () {
    var $scope;

    // excuted before each "it" is run.
    beforeEach(function () {
        module('controllers');
    });

    beforeEach(inject(function ($rootScope, $controller) {
        $scope = $rootScope.$new();
        $controller('DockerController', {
            $scope: $scope
        });
    }));

    it('should have a daemon host and port', function () {
        expect($scope.daemon.host).toBe("127.0.0.1");
    });

    it('should have a connectDaemon Function', function () {
        expect($scope.connectDaemon).toBeDefined();
        expect(angular.isFunction($scope.connectDaemon)).toBe(true);
    });

    it('should have a refreshInfo Function', function () {
        expect($scope.refreshInfo).toBeDefined();
        expect(angular.isFunction($scope.refreshInfo)).toBe(true);
    });

    it('should not have info set yet', function () {
        expect($scope.daemon.info).toBeUndefined();
    })

    it('should call the refreshInfo function', function () {
        spyOn($scope, 'refreshInfo');
        $scope.refreshInfo();
        expect($scope.refreshInfo).toHaveBeenCalled();
    });
});

describe("Controller: DockerController async function ", function () {
    var $scope;

    beforeEach(function () {
        module('controllers');
    });

    beforeEach(inject(function ($rootScope, $controller) {
        $scope = $rootScope.$new();
        $controller('DockerController', {
            $scope: $scope
        });
    }));

    function callAsyncRefreshInfoCtrlFunction(done) {
        $scope.refreshInfo(function() {
            console.log("SUCCESS");
            done();
        }, function(){
            console.log("ERROR");
        });
    }

    beforeEach(function (done) {
        console.log("before each async testcase call");
        callAsyncRefreshInfoCtrlFunction(done);
    });

    it('refreshInfo should set daemon.info', function () {
    });
});

describe("Asynchronous specs", function() {

    var value = 0;
    jasmine.getEnv().defaultTimeoutInterval = 5000;

        function funcRunInBackground() {
        value = 1;
    }

    function wrapFuncRunInBackground(done) {
        // setup for simmulating the async operation, a function run in the background
        setTimeout(function() {
            funcRunInBackground();
            done();
        }, 3000);
    }

    beforeEach(function(done) {
        wrapFuncRunInBackground(done);
        console.log("wrap function returns immediately but value = 1 is set 3 seconds later. value is still " + value);
    });


    it("should support async execution of test preparation", function() {
        expect(value).toBeGreaterThan(0);
    });
});
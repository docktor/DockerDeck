describe('DockerService tests', function () {
    var dockerService;
    var $httpBackend;
    var httpRequestHandler;

    var scope;

    // excuted before each "it" is run.
    beforeEach(function () {

        // load the module.
        module('services');

        // inject your service for testing.
        // The _underscores_ are a convenience thing
        // so you can have your variable name be the
        // same as your injected service.
        inject(function (_DockerService_, $rootScope) {
            dockerService = _DockerService_;
            scope = $rootScope.$new();
        });
    });

    beforeEach(inject(function ($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        // backend definition common for all tests
        httpRequestHandler = $httpBackend.when('GET', 'http://jsonplaceholder.typicode.com/users')
            .respond({userId: 'userX'}, {'A-Token': 'xxx'});
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    // check to see if it has the expected function
    it('should have an getGithub function', function () {
        expect(angular.isFunction(dockerService.callGithub)).toBe(true);
    });

    it('should call error callback on http.GET error', function () {

        // Notice how you can change the response even after it was set
        httpRequestHandler.respond(401, '');
        $httpBackend.expectGET('http://jsonplaceholder.typicode.com/users');

        scope.callbackError = function () {
        };
        spyOn(scope, 'callbackError');

        scope.callbackSuccess = function () {
        };
        spyOn(scope, 'callbackSuccess');

        dockerService.callGithub(scope.callbackSuccess, scope.callbackError);

        $httpBackend.flush();

        expect(scope.callbackError).toHaveBeenCalled();
        expect(scope.callbackSuccess).not.toHaveBeenCalled();

    });

    it('should call error callback on http.GET error', function () {

        // Notice how you can change the response even after it was set
        httpRequestHandler.respond(200, '');
        $httpBackend.expectGET('http://jsonplaceholder.typicode.com/users');

        scope.callbackError = function () {
        };
        spyOn(scope, 'callbackError');

        scope.callbackSuccess = function () {
        };
        spyOn(scope, 'callbackSuccess');

        dockerService.callGithub(scope.callbackSuccess, scope.callbackError);

        $httpBackend.flush();

        expect(scope.callbackError).not.toHaveBeenCalled();
        expect(scope.callbackSuccess).toHaveBeenCalled();

    });
});


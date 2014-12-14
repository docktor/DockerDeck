describe('DockerService tests', function (){
    var dockerService;

    // excuted before each "it" is run.
    beforeEach(function (){

        // load the module.
        module('services');

        // inject your service for testing.
        // The _underscores_ are a convenience thing
        // so you can have your variable name be the
        // same as your injected service.
        inject(function(_DockerService_) {
            dockerService = _DockerService_;
        });
    });

    // check to see if it has the expected function
    it('should have an getGithub function', function () {
        expect(angular.isFunction(dockerService.callGithub)).toBe(true);
    });
});
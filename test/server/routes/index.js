import agent from './../agent';

// Recommend to use normal functions in mocha
// but it conflicts with Airbnb Style Guide.
// See https://mochajs.org/#arrow-functions
describe('Home page', () => {
  it('should be ok.', function when(done) {
    // wait until server is ready
    this.timeout(20000);
    agent
      .get('/')
      .expect(200, done);
  });
});

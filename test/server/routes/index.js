import http from 'http';

const root = 'http://localhost:3000';

// recommend to use normal functions in mocha
// but it conflicts with Airbnb Guide Style
// see https://mochajs.org/#arrow-functions
describe('Home page', () => {
  const self = this;
  it('should be ok.', (done) => {
    // wait until server is ready
    self.timeout(20000);
    http.get(root, (res) => {
      res.statusCode.should.be.equal(200);
      done();
    });
  });
});

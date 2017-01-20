import BuildManager from './../../../src/lib/build/BuildManager';


describe('DockerFile', () => {
  it('should build the config file successfully', async () => {
    const dockerfile = await BuildManager.prepareDockerFile({
      git: {
        repository: {
          url: 'https://github.com/emengjzs/node-es6-demo.git'
        }
      },
    }, {
      email: 'emengjzs@163.com',
      username: 'emengjzs',
    });
    dockerfile.should.be.equal(
`FROM node:boron

MAINTAINER emengjzs <emengjzs@163.com>

RUN mkdir -p /usr/src/
WORKDIR /usr/src

RUN git clone https://github.com/emengjzs/node-es6-demo.git app

WORKDIR /usr/src/app

RUN npm install

EXPOSE 8080

ENTRYPOINT ["npm", "start"]
`);
  });
});

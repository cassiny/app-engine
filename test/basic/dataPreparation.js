import Project from './../../src/lib/project/model/Project';
import InstancesState from './../../src/lib/project/model/InstanceState';
import User from './../../src/lib/user/model/User';
import Image from './../../src/lib/image/model/Image';
import Build from './../../src/lib/build/model/Build';
import BuildState from './../../src/lib/build/model/BuildState';
import logger from './../basic/logger';

const data = {};

const buildTestData = async () => {
  // -----------------------
  // User - admin
  // -----------------------
  const user = data.admin = await User.findOne({ username: 'admin' }).exec();

  // -----------------------
  // Data - image
  // -----------------------
  const image1 = new Image({
    tag: 'node:moron',
    version: '6.9',
    owner: user,
    createTime: new Date()
  });

  const image2 = new Image({
    tag: 'mongodb:nn',
    version: '3.4',
    owner: user,
    createTime: new Date()
  });

  await Image.findOneAndRemove({ tag: image1.tag }).exec();
  await Image.findOneAndRemove({ tag: image2.tag }).exec();

  await image1.save();
  await image2.save();

  // -----------------------
  //  Data - Project
  // -----------------------
  const project = data.project = new Project({
    ownerId: user.id, // ObjectId('58786c246d43ad1abc1e8ee9'),
    name: 'example',
    desc: 'A demo of example using Node.js',
    path: 'example',
    git: {
      branch: 'master',
      repository: {
        url: 'https://github.com/emengjzs/node-es6-demo.git',
        username: 'emengjzs'
      }
    },
    baseImage: image1,
    applicationInstances: [
      {
        name: 'example-01',
        build: {
          revision: 233,
          image: image1,
        },
        host: '127.0.0.1',
        port: 8080,
        state: InstancesState.RUNNING.code,
        payloads: {
          memory: 200,
        }
      },
      {
        name: 'example-02',
        build: {
          revision: 233,
          image: image1,
        },
        host: '127.0.0.1',
        port: 8081,
        state: InstancesState.RUNNING.code,
        payloads: {
          memory: 200,
        }
      },
      {
        name: 'example-03',
        build: {
          revision: 233,
          image: image1,
        },
        host: '127.0.0.1',
        port: 8082,
        state: InstancesState.STOPPED.code,
        payloads: {
          memory: 200,
        }
      },
    ],
    serviceInstances: [
      {
        name: 'mongodb-01',
        image: image2,
        createTime: new Date(),
      }
    ]
  });

  await Project.findOneAndRemove({
    ownerId: project.ownerId,
    path: project.path
  }).exec();
  await project.save();



  // -----------------------
  //  Data - Build
  // -----------------------
  const build1 = new Build({
    project: project.id,
    revision: '1.0',
    git: {
      commit: {
        message: 'example 0.9beta release',
        hash: 'e334d2',
      },
      state: BuildState.SUCCESSFULLY.code,
      startTime: new Date('2017-01-19 22:33:44'),
      endTime: new Date('2017-01-19 22:34:56'),
    }

  });
  await build1.save();

  const build2 = new Build({
    project: project.id,
    revision: '1.0',
    git: {
      commit: {
        message: 'example 1.0 release',
        hash: '1232ef',
      },
      state: BuildState.SUCCESSFULLY.code,
      startTime: new Date('2017-01-20 22:33:44'),
      endTime: new Date('2017-01-20 22:34:56'),
    }
  });
  await build2.save();

  const build3 = new Build({
    project: project.id,
    revision: '1.0',
    git: {
      commit: {
        message: 'example 1.1 release',
        hash: 'a354d2',
      },
      state: BuildState.FAILED.code,
      startTime: new Date('2017-01-21 22:33:44'),
      endTime: new Date('2017-01-21 22:34:56'),
    }
  });
  await build3.save();
};

try {
  (async () => buildTestData())();
} catch (err) {
  logger.error(err);
}

export default data;

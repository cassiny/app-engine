import mongoose from 'mongoose';

const Image = mongoose.model('Image', mongoose.Schema({
  tag: {},
  version: {},
  owner: {},
  createTime: Date
}, { collection: 'images' }));

Image.findOne({ tag: 'node:moron' }).exec((err, res) => {
  if (!res) {
    const v1 = new Image({
      tag: 'node:moron',
      version: '6.9',
      owner: 'Provided',
      createTime: new Date()
    });
    v1.save();
    const v2 = new Image(
      {
        tag: 'node:wheezy',
        version: '7.4',
        owner: 'Provided',
        createTime: new Date()
      },
    );
    v2.save();
  }
});



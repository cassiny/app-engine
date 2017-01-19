import mongoose from 'mongoose';

import InstancesState from './InstanceState';

const ObjectId = mongoose.Schema.Types.ObjectId;

const applicationInstanceSchema = new mongoose.Schema({
  // name of the instance, 'emenjzs/app-01'
  name: { type: String, index: true },
  // which is run as instance
  build: {
    // '1.0'
    revision: Number,
    image: { type: ObjectId, ref: 'image' },
  },
  // 'localhost'
  host: String,
  // '8080'
  port: Number,

  /**
   *   0    - Stopped
   *   1    - Starting
   *   10   - Stopping
   *   20   - Pausing
   *   21   - Paused
   *   200  - Running
   *   500  - Stopped by error
   */
  state: Number,
  createTime: { type: Date, default: Date.now },
  lastStartTime: { type: Date },
  lastModifyTime: { type: Date, default: Date.now },

  payloads: {
    // '200' mean 200MB
    memory: Number,
  },
});

applicationInstanceSchema.statics.InstancesState = InstancesState;

export default applicationInstanceSchema;

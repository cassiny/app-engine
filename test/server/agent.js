import request from 'supertest';

import app from './../../src/server/app';

const agent = request(app);

export default agent;

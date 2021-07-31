'use strict';

const supergoose = require('@code-fellows/supergoose');
const server = require('../server.js');
const myServer = supergoose(server.app);

describe('500 Error Test', () => {
  it('Missing input should send 500 error', async () => {
    const obj = {
      name: 'missing description',
    };
    const response = await myServer.post('/api/v1/example').send(obj);
    expect(response.status).toEqual(500);
  });
});

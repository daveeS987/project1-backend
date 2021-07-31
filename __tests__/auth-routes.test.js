'use strict';

const supergoose = require('@code-fellows/supergoose');
const server = require('../server.js');
const myServer = supergoose(server.app);
const jwt = require('jsonwebtoken');
process.env.SECRET = 'secretForTest';
// const userModel = require('../auth/models/users-model.js);

// beforeAll
// beforeEach
afterEach(async () => {
  // console.log('testing after each');
  // await userModel.remove({});
  // run commond from mongoose to delte dataabse
  // maybe use the bring in user model to remove
});

describe('Proof of Life test', () => {
  it('Proof of life', () => {
    expect(true).toBeTruthy();
  });
});

describe('POST /signup should work', () => {
  it('Should create a new user', async () => {
    let obj = {
      username: 'davee',
      password: 'davee',
      role: 'admin',
    };
    let response = await myServer.post('/signup').send(obj);
    const parsedToken = jwt.verify(response.body.token, process.env.SECRET);
    expect(parsedToken).toBeTruthy();
    expect(response.status).toEqual(200);
    expect(response.body.token).toBeDefined();
    expect(response.body.user.username).toEqual('davee');
  });
});

describe('POST /signin should work', () => {
  it('POST /signin should work with correct authorization', async () => {
    let response = await myServer.post('/signin').auth('davee', 'davee');
    expect(response.body.token).toBeDefined();
    expect(response.status).toEqual(200);
  });
});

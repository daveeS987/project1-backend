'use strict';

const supergoose = require('@code-fellows/supergoose');
const server = require('../server.js');
const myServer = supergoose(server.app);

// Helper Test Function
function propertiesMatch(obj, resultObj) {
  let allMatch = true;
  Object.keys(obj).forEach((key) => {
    if (obj[key] !== resultObj[key]) {
      allMatch = false;
    }
  });
  return allMatch;
}

describe('Proof of Life test', () => {
  it('Proof of life', () => {
    expect(true).toBeTruthy();
  });
});

describe('Test V1 Routes', () => {
  // Need this to be global to use in multiple test
  let obj3Id;

  it('POST /api/v1/example adds an item to the DB and returns an object with that item', async () => {
    const obj1 = {
      name: 'name1',
      description: 'description1',
    };
    const response = await myServer.post('/api/v1/example').send(obj1);
    expect(response.status).toEqual(200);
    expect(response.body._id).toBeDefined();
    expect(propertiesMatch(obj1, response.body)).toEqual(true);
  });

  it('GET /api/v1/example returns a list of example items', async () => {
    const obj2 = {
      name: 'name2',
      description: 'description2',
    };
    await myServer.post('/api/v1/example').send(obj2);
    const response = await myServer.get('/api/v1/example');
    expect(response.body.count).toEqual(2);
    expect(response.status).toEqual(200);
  });

  it('GET /api/v1/example/ID returns a single item by ID', async () => {
    const obj3 = {
      name: 'name3',
      description: 'description3',
    };
    const added = await myServer.post('/api/v1/example').send(obj3);
    obj3Id = added.body._id;
    const response = await myServer.get(`/api/v1/example/${obj3Id}`);
    expect(propertiesMatch(obj3, response.body)).toEqual(true);
    expect(response.status).toEqual(200);
  });

  it('PUT /api/v1/example/ID returns a single, updated item by ID', async () => {
    const obj4 = {
      name: 'name4',
      description: 'description4',
    };
    const response = await myServer.put(`/api/v1/example/${obj3Id}`).send(obj4);
    expect(propertiesMatch(obj4, response.body)).toEqual(true);
    expect(response.status).toEqual(200);
  });

  it('DELETE /api/v1/example/ID returns an empty object and Subsequent get should result in nothing found', async () => {
    const deleted = await myServer.delete(`/api/v1/example/${obj3Id}`);
    const checkDeleted = await myServer.get(`/api/v1/example/${obj3Id}`);
    expect(deleted.body).toEqual({});
    expect(checkDeleted.body).toBeFalsy();
    expect(deleted.status).toEqual(200);
  });
});

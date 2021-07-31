'use strict';

const cwd = process.cwd();
const express = require('express');
const router = express.Router();
const modelFinder = require(`${cwd}/middleware/model-finder.js`);

router.param('model', modelFinder.load);
router.get('models', getModelList);

// JSON Schema
router.get('/:model/schema', (req, res) => {
  res.status(200).json(req.model.jsonSchema());
});

router.get('/:model', handleGetAll);
router.post('/:model', handlePost);
router.get('/:model/:id', handleGetOne);
router.put('/:model/:id', handlePut);
router.delete('/:model/:id', handleDelete);

async function getModelList(req, res, next) {
  console.log('models route got triggered');
  const list = await modelFinder.list();
  res.status(200).json(list);
}

async function handleGetAll(req, res, next) {
  try {
    const list = await req.model.get(req.query);
    const output = {
      count: list.length,
      results: list,
    };
    res.status(200).json(output);
  } catch (e) {
    next(e);
  }
}

async function handleGetOne(req, res, next) {
  try {
    const result = await req.model.get({ _id: req.params.id });
    res.status(200).json(result[0]);
  } catch (e) {
    next(e);
  }
}

async function handlePost(req, res, next) {
  try {
    const result = await req.model.create(req.body);
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
}

async function handlePut(req, res, next) {
  try {
    const result = await req.model.update(req.params.id, req.body);
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
}

async function handleDelete(req, res, next) {
  try {
    await req.model.delete(req.params.id);
    res.status(200).json({});
  } catch (e) {
    next(e);
  }
}

module.exports = router;

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const dishRouter = express.Router();
const Dishes = require('../models/dishes')

dishRouter.use(bodyParser.json());

dishRouter.route('/')
.get(async (req, res, next) => {
    try{
        const dises = await Dishes.find({});
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dises); 
    }catch(err){
        return next(err);
    }
})
.post(async (req, res, next) => {
    try{
        const dish = await Dishes.create(req.body);
        console.log('dish created: ', dish);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }catch(err){
        return next(err);
    }
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('not supperted on dishes');
})
.delete(async (req, res, next) => {
    try {
        const resp = await Dishes.remove({}).exec();
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);    
    } catch (err) {
        return next(err);
    }
});

dishRouter.route('/:dishId')
.get(async (req, res, next) => {
    try{
        const dises = await Dishes.findById(req.params.dishId).exec();
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dises); 
    }catch(err){
        return next(err);
    }
})
.post(async (req, res, next) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /dishes/ ${req.params.dishId}`);
})
.put(async (req, res, next) => {
    try{
        const dish = await Dishes.findByIdAndUpdate(req.body.dishId, {
            $set: req.body
        }, { new: true}).exec();
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(dish);
    }catch(err){
        return next(err);
    }
})
.delete(async (req, res, next) => {
    try {
        const resp = await Dishes.findByIdAndRemove(req.params.dishId).exec();
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);    
    } catch (err) {
        return next(err);
    }
});

module.exports = dishRouter;
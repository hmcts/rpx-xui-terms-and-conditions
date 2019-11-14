import express from 'express';
import controller from './healthController';

export default express
    .Router()
    .get('/', controller.health)
    .get('/liveness', controller.liveness);

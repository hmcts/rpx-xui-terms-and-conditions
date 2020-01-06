import express from 'express';
import controller from './configController';

export default express
    .Router()
    .get('/check', controller.checkConfig)

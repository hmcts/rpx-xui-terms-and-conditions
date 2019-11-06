import express from 'express';
import controller from './copyManagementController'
export default express.Router()
    .post('/:app/', controller.create)
    .get('/:app/', controller.all)
    .get('/:app/:version', controller.byVersion);
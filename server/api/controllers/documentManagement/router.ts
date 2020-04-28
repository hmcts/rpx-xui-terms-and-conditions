import express from 'express';
import controller from './documentManagementController';
import { validateAppVersion } from '../../middlewares';
export default express
    .Router({ mergeParams: true })
    .post('/', controller.create)
    .get('/', controller.latest)
    .get('/versions', controller.all)
    .get('/:version', validateAppVersion, controller.byVersion);

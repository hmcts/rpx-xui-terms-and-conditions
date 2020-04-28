import express from 'express';
import appsController from './appsController';

/**
 * Apps Routes
 *
 */
export default express
    .Router({ mergeParams: true })
    /**
     * GET /
     *
     * Get all user names.
     */
    .get('/', appsController.allApps);

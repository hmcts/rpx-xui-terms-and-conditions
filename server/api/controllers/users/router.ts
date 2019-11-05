import express from 'express';
import userController from './userController';

export default express.Router()

    /**
     * POST /:version
     *
     * Add Users who have accepted the Terms and Conditions to the Database.
     *
     * app - The application the Terms and Conditions relates to ie. 'manageorg', 'managecases'
     * version - The version of the Terms and Conditions
     *
     * TODO: version needs to be optional
     */
    .post('/:version', userController.addUsers)

    /**
     * GET /:version
     *
     * TODO: version needs to be optional
     *
     * Get all Users who have accepted a specific version of T&C's.
     */
    .get('/:version', userController.getUsers)

    /**
     * GET /:userId/:version
     *
     * TODO: version needs to be optional
     *
     * Get a User who has accepted a specific version of T&C's.
     */
    .get('/:userId/:version', userController.getUser)


import express from 'express';
import userController from './userController';

export default express.Router()

    /**
     * POST /:app/:version/users
     *
     * Add Users who have accepted the Terms and Conditions to the Database.
     *
     * app - The application the Terms and Conditions relates to ie. 'manageorg', 'managecases'
     * version - The version of the Terms and Conditions
     */
    .post('/:app/:version/users', userController.addUsers)

    /**
     * GET /:app/:version/users
     *
     * Get all Users who have accepted a specific version of T&C's.
     */
    .get('/:app/:version/users', userController.getUsers)

    /**
     * GET /:app/:version/users/:userId
     *
     * Get a User who has accepted a specific version of T&C's.
     */
    .get('/:app/:version/users/:userId', userController.getUser)


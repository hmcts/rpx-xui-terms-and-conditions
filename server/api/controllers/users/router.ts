import express from 'express';
import controller from './controller'
export default express.Router()
    // .post('/', controller.create)
    // .get('/', controller.all)
    /**
     * GET /:app/:version/users
     *
     * app - The application the Terms and Conditions relates to ie. 'manageorg', 'managecases'
     * version - The version of the Terms and Conditions
     */
    .get('/:app/:version/users', controller.getUsers)

    /**
     * GET /:app/:version/users/:userId
     *
     * app - The application the Terms and Conditions relates to ie. 'manageorg', 'managecases'
     * version - The version of the Terms and Conditions
     */
    .get('/:app/:version/users/:userId', controller.getUser)

    .post('/:app/:version/users', controller.putUser)

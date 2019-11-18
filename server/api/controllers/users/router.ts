import express from 'express';
import userController from './userController';

/**
 * User Routes
 *
 * We have /:app as a parameter within our middleware call (app.use).
 *
 * mergeParams allows us to access parameters in the parent routes.
 */
export default express
    .Router({ mergeParams: true })

    /**
     * POST /:version
     *
     * Add Users who have accepted the Terms and Conditions to the Database.
     *
     * app - The application the Terms and Conditions relates to ie. 'manageorg', 'managecases'
     * version - The version of the Terms and Conditions
     *
     * POST /termsAndConditions/<app>/users/<?version>
     * TODO: version needs to be optional
     */
    .post('/:version', userController.acceptTermsConditions)

    /**
     * GET /:version
     *
     * TODO: version needs to be optional
     *
     * Get all Users who have accepted a specific version of T&C's.
     */
    .get('/:version', userController.getAcceptedUsers)

    /**
     * GET /:userId/:version
     *
     * TODO: version needs to be optional
     *
     * Get a User who has accepted a specific version of T&C's.
     */
    .get('/:userId/:version', userController.hasUserAccepted);

import chai from 'chai'
import {expect} from 'chai';
import 'mocha';
import request from 'supertest';
import Server from '../server';

import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import {mockReq, mockRes} from 'sinon-express-mock';

chai.use(sinonChai);
// chai.use(sinon);

import healthController from '../server/api/controllers/health/healthController';

describe('Health controller', () => {
    xit('should get health', () =>
        request(Server)
            .get('/health')
            .expect('Content-Type', /text/)
            .then(response => {
                expect(response.body)
                    .to.be.an('object');
            }));

    it('should return false', () => {

        expect(healthController.shouldReturnFalse()).to.be.false;
    });

    // We want to check that status is called on
    // res with 200
    it('should get liveness', () => {

        const request = {
            status: () => {
                return 200;
            }
        };

        const req = mockReq(request);
        const res = mockRes();

        const spyOn = sinon.spy(healthController, 'shouldReturnFalse');

        healthController.liveness(req, res);



        // expect(res.status).to.be.calledWith(302, '/')
        // expect(true).to.equal(false);
        sinon.assert.called(spyOn);

    })
    //
    // request(Server)
    //   .get('/health/liveness')
    //   .expect('Content-Type', /text/)
    //   .then(response => {
    //     expect(response.body)
    //       .to.equal('object');
    //   }));
});

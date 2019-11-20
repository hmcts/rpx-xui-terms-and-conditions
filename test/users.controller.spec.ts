import 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import Server from '../server';

/**
 * Users controller tests
 *
 * TODO: To be hardened once we know the data
 */
xdescribe('Users controller', () => {
  it('should get all Users', () =>
    request(Server)
      .get('/api/v1/termsAndConditions/managecases/users/1')
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body)
          .to.be.an('array');
      }));

  it('should be able to add Users', () =>
    request(Server)
      .post('/api/v1/termsAndConditions/managecases/users/1')
      .send(
          {
              "userId": "123e4567-e89b-12d3-a456-426655440000"
          },
      )
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body)
          .to.be.an('object')
          // .that.has.property('name')
          // .equal('test');
      }));

  it('should get a User by id', () =>
    request(Server)
      .get('/api/v1/termsAndConditions/managecases/users/userId/1')
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body)
          .to.be.an('object')
          .that.has.property('userId')
          .equal('userId');
      }));
});

import 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import Server from '../server';

xdescribe('Copy Management controller', () => {
  it('should get all versions for app', () =>
    request(Server)
      .get('/api/v1/termsAndConditions/app1/versions')
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body)
          .to.be.an('array');
      }));

  it('should be able to add a new version to the app', () =>
    request(Server)
      .post('/api/v1/termsAndConditions/app1')
      .send({
        "content": "test",
        "mimeType": "text/html"
      })
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body)
          .to.be.an('object');
      }));

  it('should get a copy by version', () =>
    request(Server)
      .get('/api/v1/termsAndConditions/app1/1')
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body)
          .to.be.an('object')
          .that.has.property('version')
          .equal(1);
      }));
});

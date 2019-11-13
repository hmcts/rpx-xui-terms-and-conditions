import 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import Server from '../server';

describe('Health controller', () => {
  it('should get health', () =>
    request(Server)
      .get('/health')
      .expect('Content-Type', /text/)
      .then(response => {
        expect(response.body)
          .to.be.an('object');
      }));
    
  it('should get liveness', () =>
    request(Server)
      .get('/health/liveness')
      .expect('Content-Type', /text/)
      .then(response => {
        expect(response.body)
          .to.be.an('object');
      }));
});

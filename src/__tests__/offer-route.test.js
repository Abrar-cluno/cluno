const request = require('supertest');
const httpStatus = require('http-status');

const app = require('../app');

describe('test suite for offer route', () => {
  it('should get error response with invalid price parameter', async () => {
    await request(app)
      .get('/api/v1/offer?price=abc')
      .expect(httpStatus.UNPROCESSABLE_ENTITY);
  });
  it('should get error response with invalid portfolio parameter', async () => {
    await request(app)
      .get('/api/v1/offer?portfolio=*+')
      .expect(httpStatus.UNPROCESSABLE_ENTITY);
  });
  it('should get error response with invalid make parameter', async () => {
    await request(app)
      .get('/api/v1/offer?make=*+')
      .expect(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it('response should contain error messages with invalid query params', async () => {
    await request(app)
      .get('/api/v1/offer?make=*+')
      .expect(res => {
        expect(res.body).toHaveProperty('errors');
      });
  });
});

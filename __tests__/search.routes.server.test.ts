const request = require('supertest');
import server from '../server/server';
// const serverUrl = 'http://localhost:3000';

console.log = jest.fn();

describe('Testing /search routes', () => {
  afterAll(() => {
    server.close();
  });

  describe('Testing /search query route', () => {
    it('Can make search requests', () => {
      return request(server)
      .get('/search?page=1&locations=new%20york%20city&keywords=fullstack')
      .expect('Content-Type', /application\/json/)
      .expect(200)
      .expect(function(res) {
        expect(res.body).toBeInstanceOf(Array);
      });
    });

    it('Returns error condition when missing "page"', () => {
      return request(server)
      .get('/search?locations=new%20york%20city&keywords=fullstack')
      .expect('Content-Type', /application\/json/)
      .expect(401);
    });

    it('Returns error condition when missing "location"', () => {
      return request(server)
      .get('/search?page=1&keywords=fullstack')
      .expect('Content-Type', /application\/json/)
      .expect(401);
    });

    it('Returns error condition when missing "keywords"', () => {
      return request(server)
      .get('/search?page=1&keywords=fullstack')
      .expect('Content-Type', /application\/json/)
      .expect(401);
    });
  });

  describe('Testing /search/:api route', () => {
    it('Can make get item requests from Muse', () => {
      return request(server)
      .get('/search/muse/5079123')
      .expect('Content-Type', /application\/json/)
      .expect(200);
    });

    it('Can make get item requests from Findwork.dev', () => {
      return request(server)
      .get('/search/findwork.dev/85799')
      .expect('Content-Type', /application\/json/)
      .expect(200);
    });
  });
});
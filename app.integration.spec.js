const request = require('supertest');

const app = require('./app');
const agent = request.agent(app);

describe('app', () => {
  describe('when authenticated', () => {
    beforeEach(async () => {
      await agent
        .post('/login')
        .send('username=randombrandon&password=randompassword');
    });

    describe('POST /messages', () => {
      describe('with non-empty content', () => {
        describe('with url ', () => {
          it('responds with success', async done => {
            agent
              .post('/messages')
              .send("content=hello&personalWebsiteURL=https://odyssey.wildcodeschool.com")
              .then((response) => {
                expect(response.statusCode).toBe(201);
                done();
              });
          });
        });
      });
    });

    describe('POST /messages', () => {
      describe('with non-empty content', () => {
        describe('with javascript injection ', () => {
          it('responds with error', async done => {
            agent
              .post('/messages')
              .send("content=hello&personalWebsiteURL=javascript:tutu")
              .then((response) => {
                expect(response.statusCode).toBe(400);
                done();
              });
          });
        });
      });
    });
  });
})
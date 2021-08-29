const request = require('supertest');
const assert = require('assert');
const app = require('../app');

describe('Testing Server URL', () => {
    const agent = request.agent(app);

    it('Test GET / - Should return status response 200', (done) => {
        request(app)
            .get('/')
            .expect(200)
            .expect((res) => {
                assert.equal(res.body, "Hello World!")
            })
            .end((err, res) => {
                if (err) throw err;

                return done();
            });
    });

    it('Test GET /:name - /Fred should response Hello Fred!', (done) => {
        request(app)
            .get('/Fred')
            .expect(200)
            .expect((res) => {
                assert.equal(res.body, "Hello Fred!")
            })
            .end((err, res) => {
                if (err) throw err;

                return done();
            })
    })

})
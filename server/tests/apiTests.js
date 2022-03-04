const { expect } = require('chai');
let chai = require('chai');
let chaiHttp = require('chai-http');
var should = chai.should();
chai.use(chaiHttp);
let app = require('../../server');

describe('Google Auth Tets', () => {
    describe('GET : auth/google/failure', () => {
        it('Informs the user about failed Auth', (done) => {
            chai.request(app)
                .get('/auth/google/failure')
                .end((err, res) => {
                    (res).should.have.status(200);
                    (res.body).should.be.a('object');
                    done();
                });
        });
    });
});

describe('Posts API Crud Tests', () => {
    describe('GET : /api/fetch/all', () => {
        it('Returns a list of all existing posts', (done) => {
            chai.request(app).get('/api/fetch/all').end((err, res) => {
                (res).should.have.status(200);
                (res.body).should.be.a('array');
                done();
            })
        });
    });
    describe('GET : /api/fetch/user', () => {
        it('Returns a list of all posts for a gievn user', (done) => {
            chai.request(app).get('/api/fetch/user').set('content-type', 'application/json').send({ gid: 1 })
                .end((err, res) => {
                    if (err) {
                        done(err);
                    } else {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        done();
                    }
                })
        })
    });
    describe('GET : /api/fetch/user [ with Null GID ]', () => {
        it('Throws a bad request error', (done) => {
            chai.request(app).get('/api/fetch/user').set('content-type', 'application/json').send({})
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                })
        })
    });

});

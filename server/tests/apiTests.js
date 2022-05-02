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
            chai.request(app).get('/api/fetch/user').set('content-type', 'application/json').query({ gid: "102394855285394744787" })
                .end((err, res) => {
                    if (err) {
                        done(err);
                    } else {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        done();
                    }
                })
        })
    });
    describe('GET : /api/fetch/user [ with Null GID ]', () => {
        it('Throws a bad request error', (done) => {
            chai.request(app).get('/api/fetch/user').set('content-type', 'application/json').query({ gid: null })
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                })
        })
    });
    describe('GET : /api/posts/fetch', () => {
        it('Fetches a post with requested Post-ID', (done) => {
            chai.request(app).get('/api/posts/fetch').set('content-type', 'application/json').query({ postId: "625fd54fde50def4d488e2cd" })
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                })
        })
    });
    describe('GET : /api/current_user', () => {
        it('Fetches the current user if logged In and Redirects to Login if Not Found', (done) => {
            chai.request(app).get('/api/posts/fetch').set('content-type', 'application/json')
                .end((err, res) => {
                    res.should.have.status(402);
                    done();
                })
        })
    });
});

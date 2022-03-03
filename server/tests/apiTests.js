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
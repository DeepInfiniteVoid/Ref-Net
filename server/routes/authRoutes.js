const passport = require('passport');
const authMiddleware = require('./middleware')

module.exports = (app) => {

    app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/dashboard',
            failureRedirect: '/auth/google/failure'
        }));

    app.get('/auth/google/failure', (req, res) => {
        res.send('Something went Wrong')
    })

    app.get('/api/current_user', authMiddleware, (req, res) => {

        const current_user = req.user;

        res.send(current_user);
    });
}




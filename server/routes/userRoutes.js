const passport = require('passport');

module.exports = (app) => {

    isLoggedIn = (req, res, next) => {
        req.user ? next() : res.redirect('/')
    }

    app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/home',
            failureRedirect: '/auth/google/failure'
        }));

    app.get('/auth/google/failure', (req, res) => {
        res.send('Something went Wrong')
    })

    app.get('/home', isLoggedIn, (req, res) => {
        res.send('Hello User!')
    });
}




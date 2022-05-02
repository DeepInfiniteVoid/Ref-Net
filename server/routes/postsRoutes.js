const mongoose = require('mongoose');

const Post = mongoose.model('posts')

module.exports = (app) => {

    app.get('/api/fetch/all', (req, res) => {
        Post.find({}).then((post) => {
            res.send(post);
        }).catch((err) => {
            res.status(404);
            res.send(`Error Fetching all Posts\n ${err}`);
        })
    });

    app.post('/api/fetch/user', (req, res) => {

        if (req.body.gid) {
            Post.find({ authorGID: req.body.gid }).then((post) => {
                res.status(200);
                res.send(post);
            }).catch((err) => {
                res.status(404);
                res.send(`${err}`);
            });
        } else {
            res.status(400);
            res.send('User GID cannot be Null');
        }

    });

    app.get('/api/posts/fetch', (req, res) => {

        if (req.query.postId) {

            Post.find({ _id: req.query.postId }).then((post) => {

                res.send(post[0]);

            }).catch((err) => {
                res.status(404);
                res.send('No Post Found')
            })

        } else {
            res.status(402);
            res.send('PostId is Null')
        }

    });

    app.post('/api/create', (req, res) => {

        Post.create({
            sector: req.body.sector,
            description: req.body.description,
            authorGID: req.body.gid,
            role: req.body.role,
            salary: req.body.salary,
            company: req.body.company,
            experience: req.body.experience,
            location: req.body.location
        }).then(() => {
            res.status(200);
            res.send("Success");
        }).catch((err) => {
            res.status(409);
            res.send(err);
        });
    });

    app.post('/api/update', (req, res) => {

        if (req.body.postId) {
            Post.findOneAndUpdate({
                _id: req.body.postId
            }, {
                description: req.body.description,
                authorGID: req.body.gid,
                dateUpdated: req.body.dt,
                role: req.body.role,
                company: req.body.company,
                experience: req.body.experience,
                location: req.body.location
            }).then(() => {
                res.status(200);
                res.send(`Updated Successfully`);
            }).catch((err) => {
                res.status(409);
                res.send(`Unable to update\n ${err}`);
            });
        } else {
            res.status(400);
            res.send("PostId cannot be Null");
        }
    });

    app.post('/api/delete', (req, res) => {

        if (req.body.postId) {
            Post.findByIdAndDelete({ _id: req.body.postId }).then(() => {
                res.status(200);
                res.send("Post Deleted Successfully");
            }).catch((err) => {
                res.status(409);
                res.send(`Unable to Delete\n ${err}`);
            });
        } else {
            res.status(400);
            res.send("PostId cannot be Null");
        }

    });


}

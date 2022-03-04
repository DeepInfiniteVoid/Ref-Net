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

    app.get('/api/fetch/user', (req, res) => {

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

    app.post('/api/create', (req, res) => {

        Post.create({
            description: req.body.desc,
            authorGID: req.body.gid,
            dateCreated: req.body.dt,
            role: req.body.role,
            company: req.body.company,
            experience: req.body.exp,
            location: req.body.loc
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
            Post.findOneAndUpdate({ _id: req.body.postId }, {
                description: req.body.desc,
                authorGID: req.body.gid,
                dateCreated: req.body.dt,
                role: req.body.role,
                company: req.body.company,
                experience: req.body.exp,
                location: req.body.loc
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
            Post.findOneAndDelete({ _id: req.body.postId }).then(() => {
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

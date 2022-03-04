const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    description: String,
    authorGID: String,
    dateCreated: { type: Date, default: Date.now() },
    role: String,
    company: String,
    experience: String,
    location: String
});

module.exports = postSchema;
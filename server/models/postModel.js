const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    sector: String,
    role: String,
    company: String,
    experience: String,
    salary: String,
    location: String,
    description: String,
    authorGID: String,
    dateCreated: { type: Date, default: Date.now() },
    dateUpdated: { type: Date, default: Date.now() }
});

module.exports = postSchema;

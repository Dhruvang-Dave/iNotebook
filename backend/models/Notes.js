const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const NotesSchema = new Schema({
    title: {
        type: String,
        required: true
    }
    description: {
        type: String,
        required: true
    }
    tag : {
        type: String,
        default : 'general',
        required: true
    }
    date : {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model( 'notes', NotesSchema)
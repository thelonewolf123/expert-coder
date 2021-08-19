// create a mongoose schema for our video model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var videoSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    uuid: {type: String, required: true},
    thumbnail: {type: String, required: true},
    code: {type: String, required: true},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Video', videoSchema);
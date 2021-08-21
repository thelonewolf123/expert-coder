var connectToDatabase = require('./database/mongodb.js');
module.exports = function (req, res) {
    const dbCallback = function (err, result) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(result);
        }
    }
    connectToDatabase.then((db) => {
        // get video by id
        if (req.method == 'GET') {
            db.collection('videos').findOne({
                '_id': req.params.id
            }, dbCallback);
        } else if (req.method == 'PUT') {
            // update video
            db.collection('videos').update({
                '_id': req.params.id
            }, {
                $set: req.body
            }, dbCallback);
        } else if (req.method == 'DELETE') {
            // delete video
            db.collection('videos').remove({
                '_id': req.params.id
            }, dbCallback);
        }
    });
    return res.send(404);
}
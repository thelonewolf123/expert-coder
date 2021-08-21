const { connectToDatabase } = require('./database/mongodb');
const code = require('./model/code_model');

export default function (req, res) {
    const conection = connectToDatabase();

    const dbcallback = (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                result: "Internal sever error"
            });
        }
        // console.log(data);
        res.status(200).json(data);
    };

    conection.then(() => {
        if (req.method === "GET") {
            code.findOne({_id : req.query.id}, dbcallback);
        } else if (req.method === "POST") {
            const exp = new code(req.body);
            exp.save(dbcallback);
        }
        //   else if (req.method === "DELETE") {
        //     code.deleteOne({ _id: req.body._id }, dbcallback);
        //   }
    });
}
const code = require('./model/code_model');
const mongoose = require("mongoose");

const MONGODB_URI = process.env.mongodb_connection_uri || "mongodb+srv://lonewolf:sA6Aa6butEpjdfX2@serverless-mongodb.q3fp5.mongodb.net/expert-coder?retryWrites=true&w=majority";

mongoose.Promise = global.Promise;
let isConnected;

const connectToDatabase = () => {
  if (isConnected) {
    console.log("=> using existing database connection");
    return Promise.resolve();
  }

  console.log("=> using new database connection");
  return mongoose
    .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((db) => {
      isConnected = db.connections[0].readyState;
    });
};

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
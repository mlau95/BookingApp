const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose= require('mongoose');
const routes = express.Router();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

let Perfomer = require('./schema');
mongoose.connect('mongodb://127.0.0.1:27017/performers', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
  console.log("MongoDB connection established successfully");
});

routes.route('/performers').get(function(req, res) {
  Perfomer.find(function(err, performers) {
    if (err) {
      console.log(err);
    } else {
      res.json(performers);
    }
  })
});

routes.route('/add').post(function(req, res) {
  let performer = new Perfomer(req.body);
  performer.save()
    .then(performer => {
      res.status(200).json({'performer' : 'performer added sucessfully'});
    })
    .catch(err => {
      res.status(400).send('adding performer failed');
    });
});
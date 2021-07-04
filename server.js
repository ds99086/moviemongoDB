const express = require('express');
const path = require('path');
const fs = require('fs');
//const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/users');
const app = express();

//connect to MongoDB
const dbURI = 'mongodb+srv://trial:pwd123@cluster0.vfjk3.mongodb.net/firstDB?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => console.log("connected to db"))
.catch((err) => console.log(err));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
//app.set('view engine', 'html');

app.get('/', function (req, res) {
  
  //const records = await toUnicode.
  
  
  // const users = new User({
  //   name: 'Allie L',
  //   email: 'slim@aucklanduni.ac.nz'
  // });

    res.render('index');
});

app.get('/users', (req, res) => {
  //youngest listed first
  User.find().sort({ createdAt: -1}) 
  .then((result) => {
    res.render('index', { title: 'All Users', users: result})
  }).catch((err) => {
    console.log(err);
  })
})

//mongoose and mongo sandbox routes
// app.get('/add-user', function (req, res) {
//   //use model to creat enew instance of Item.
//   const user = new User({
//     name: 'Allie L',
//     email: 'slim@aucklanduni.ac.nz'
//   });

//   //an async task 
//   user.save()
//   .then ((result) => {
//     res.send(result)
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// })

// app.get('/all-users', function (req, res) {
//   //goes and finds all users. It's async. 
//   //use the  model User to call a function to find()
//   User.find()
//   .then((result) => {
//     res.send(result);
//   }).catch((err) => {
//     console.log(err);
//   })
// })

// //call back function (req, res)
// app.get('/single-blog', (req, res) => {
//   User.findById('insert id string of the single object')
  
//   //take the result as a response back to the browser
//   .then((result) => {
//     res.send(result);
//   }).catch((err) => {
//     console.log(err);
//   })
// })

// let mongoUrlLocal = "mongodb://admin:password@localhost:27017";

// let mongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
app.post('/update-profile', async function (req, res) {
    
  async function toFind(item) {
    const response = await User.find(item);
    console.log('Response => ', response);
    return response;
  }
  
  let userObj = req.body;

    console.log("userobj is " + userObj);

    const {oldname, oldemail, name, email} = req.body;

    console.log(oldname);
    console.log(name);

    // const response = await User.create(userObj);

    const resp = await User.updateOne(
      {
        name : oldname
      },
      {
        $set: {
          name: name
        }
      })

    console.log(resp);
    

    // if (name != "") {
    //   const response1 = await User.updateOne({
    //   name : oldname
    // },
    // {
    //   $set: {
    //     name: name
    //   }
    // })
    // console.log(responese1);
    // }

    // if (email != "") {
    //   const response2 = await User.updateOne({
    //     email : oldemail
    //   },
    //   {
    //     $set: {
    //       email: email
    //     }
    //   })
    //   console.log(response2);
    // }
  
    // MongoClient.connect(mongoUrlLocal, mongoClientOptions, function (err, client) {
    //   if (err) throw err;
  
      // let db = mongoose.connection;
      // userObj['userid'] = 1;
  
      // let myquery = { userid: 1 };
      // let newvalues = { $set: userObj };
  
      // db.updateOne(myquery, newvalues, {upsert: true}, function(err, res) {
      //   if (err) throw err;
      //   client.close();
      // });
  

    // Send response

    const result = await toFind(userObj);
    res.send(result);
  });
  
  app.get('/get-profile', function (req, res) {
    let response = {};
    // Connect to the db
    MongoClient.connect(mongoUrlLocal, mongoClientOptions, function (err, client) {
      if (err) throw err;
  
      let db = client.db("user-account");
  
      let myquery = { userid: 1 };
  
      db.collection("users").findOne(myquery, function (err, result) {
        if (err) throw err;
        response = result;
        client.close();
  
        // Send response
        res.send(response ? response : {});
      });
    });
  });
  
  app.listen(3000, function () {
    console.log("app listening on port 3000!");
  });
  

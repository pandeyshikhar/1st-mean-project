require("./models/db");
const express = require("express");
const bodyParser = require("body-parser");
let userController = require('./controllers/userController');
//const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const newUser = mongoose.model("newUser");
const bcrypt = require("bcryptjs");
const paginate = require("jw-paginate");
const cors = require("cors");
var fs = require("fs");
const path = require("path");
// var aesjs = require('aes-js');

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// app.post("/api/newUser", new1)

app.post("/api/newUser", (req, res) => {
  let newuser = new newUser();
  console.log(req.body);
  newuser.fullname = req.body.fullname;
  newuser.username = req.body.username;
  newuser.dob = req.body.dob;
  newuser.points = req.body.points;
  newuser.notes = req.body.notes;
  newuser.images = req.body.images;
  //console.log(req.body.images);
  //console.log(newUser.profileImage);
  // let images =req.body.images.substr(12);
  // console.log(images);
  // newUser.images.data = fs.readFileSync(path.join(__dirname + ('/images/')+ images));
  // newUser.images.contentType =mime.lookup(path.join(__dirname +('/images/')+ images));
  // newUser.image.contentType = 'image/jpeg';
  // newUser.images.data = req.body.images;
  // newUser.images.content = req.body.images;
  // console.log(newUser.images.data);
  newuser.save((err, doc) => {
    if (err) {
      console.log(">>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<>>>>>>>>", err);
    } else {
      console.log("data inserted1", doc);
      res.json({
        data: doc
      });
    }
  });
});



app.post("/api/userCreate", (req, res) => {
  let user = new User();
  user.fullname = req.body.fullname;
  user.username = req.body.username;
  user.password = req.body.password;
  // user.confirmpassword = req.body.confirmpassword;
  user.email = req.body.email;
  user.country = req.body.country;
  user.city = req.body.city;
  user.address = req.body.address;
  user.save((err, doc) => {
    if (err) {
      console.log(err);
    } else {
      console.log("data inserted");
      console.log(doc);
      res.json({
        data: req.body
      });
    }
  });
});

app.post("/api/loginUser", (req, res) => {
  let user = new User();
  user.password = req.body.password;
  user.username = req.body.username;
  User.findOne({ username: user.username }, (err, doc) => {

    if (err) {
      console.log("error in login");
    } else {
      if (doc !== null) {
        bcrypt.compare(user.password, doc.password, (err, result) => {
          if (result == true) {
            res.json({
              data: "login successfull"
            });
          } else {
            console.log("wrong password");
            res.json("wrongpassword");
          }
        });
      } else {
        console.log("no user found");
        res.json("usernotfound");
      }
    }
  });

});


app.get("/api/getUser", (req, res) => {
  let newuser = new newUser();
  newUser.find({}, (err, docs) => {
    console.log(docs);
    res.json({ data: docs });
  });

});

app.post("/api/delUser/:id", (req, res) => {
  let delId = req.params.id;
  console.log("delete...");
  newUser.remove({ _id: delId }, (err, docs) => {
    if (err) {
      console.log("Can't Delete");
      console.log(err);
    } else {
      console.log("Data Deleted Successfully");
      res.json({ data: docs });
    }
  });
});

app.get("/api/edit/:id", edituser)

// app.get("/api/edit/:id", (req, res) => {
//   let editId = req.params.id;
//   console.log("editttt");
//   newUser.findOne({ _id: editId }, (err, doc) => {
//           if (err) {
//               console.log(err);
//           } else {
//                console.log(doc);
//               res.json({ data: doc });
//           }
//       });
//   //newUser.setvalue;
// });

app.post("/api/update/:id", (req, res) => {
  let newuser = new newUser();
  newuser.fullname = req.body.fullname;
  newuser.username = req.body.username;
  newuser.points = req.body.points;
  newuser.notes = req.body.notes;
  newUser.update({ _id: req.params.id }, 
    { $set: { 'username': newuser.username, 'fullname': newuser.fullname, 'points': newuser.points, 'notes': newuser.notes } },
    (err, doc) => {
    if (err) {
      console.log(err);
    } else {
      console.log("data inserted");
      console.log(doc);
      res.json({
        data: req.body
      });
    }
  });
});


// app.post('/api/get/edittable/data/:id', (req, res) => {
//   NewTable.findOne({ _id: req.params.id }, (err, doc) => {
//       if (err) {
//           console.log(err);
//       } else {
//           // console.log(doc);
//           res.json({ data: doc });
//       }
//   });
// });

// // paged items route
// app.get('/api/items', (req, res, next) => {
//     // example array of 150 items to be paged
//     const items = [...Array(150).keys()].map(i => ({ id: (i + 1), name: 'Item ' + (i + 1) }));

//     // get page from query params or default to first page
//     const page = parseInt(req.query.page) || 1;

//     // get pager object for specified page
//     const pageSize = 5;
//     const pager = paginate(items.length, page, pageSize);

//     // get page of items from items array
//     const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

//     // return pager object and current page of items
//     return res.json({ pager, pageOfItems });
// });

app.get("/api/items/:page", (req, res) => {
  // let admin=req.params.myname;
  newUser.find({}, (err, docs) => {
    if (err) console.log("error pagination");
    else {
      const items = docs;
      const page = req.params.page;
      const pageSize = 5;
      const pager = paginate(items.length, page, pageSize);
      const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
      return res.json({ pager, pageOfItems });
    }
  });
});

app.get("/api/display/:searchId", (req, res) => {
  let sId = req.params.searchId;
  newUser.find(
    {
      $or: [
        { fullname: { $regex: sId, $options: "$i" } },
        { username: { $regex: sId, $options: "$i" } },
        { points: { $regex: sId, $options: "$i" } },
        { notes: { $regex: sId, $options: "$i" } }
      ]
    },
    (err, docs) => {
      if (err) console.log("error in search");
      else {
        let items = docs;
        // console.log('<<<<<<<<>>>>>>','docs in serach api',typeof(docs));
        if (Object.keys(docs).length === 0) {
          // if ((Object.keys(docs).length === 0 && docs.constructor === Object) === true) {

          // alert("no data found")
          console.log("no data found");
          res.json('noDataFound');
        } else {  
          console.log('YYYYYYeeeeeeeessssssssss');
        const page = req.params.page;
        const pageSize = 5;
        const pager = paginate(items.length, page, pageSize);
        const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
        // console.log("Shikhar",pager, pageOfItems);
        // console.log("pager",pager);
        // console.log("pageOfItems",pageOfItems)
        return res.json({ pager, pageOfItems });}
      }
    }
  );
});

app.get("/api/dis/:page/:searchId", (req, res) => {
  let sId = req.params.searchId;
  newUser.find(
    {
      $or: [
        { fullname: { $regex: sId, $options: "$i" } },
        { username: { $regex: sId, $options: "$i" } },
        { points: { $regex: sId, $options: "$i" } },
        { notes: { $regex: sId, $options: "$i" } }
      ]
    },
    (err, docs) => {
      if (err) console.log("error in search");
      else {
        if (Object.keys(docs).length === 0) {
          // if ((Object.keys(docs).length === 0 && docs.constructor === Object) === true) {

          // alert("no data found")
          console.log('sahi nahi hai');
          console.log("no data found");
          res.json('noDataFound');
        }
        console.log('sahi hai');
        const items = docs;
        const page = req.params.page;
        const pageSize = 5;
        const pager = paginate(items.length, page, pageSize);
        const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
        return res.json({ pager, pageOfItems });
      }
    }
  );
});

app.get("/api/datePickerRange/:from/:to", (req, res) => {
  let from = req.params.from;
  // let temp = new (from);
  // console.log(temp);
  let to = req.params.to;
  console.log(from);
  console.log(to);
  newUser.find(
    {
      $and: [{ dob: { $gte: from } }, { dob: { $lte: to } }]
    },
    (err, docs) => {
      if (err) console.log("error in date");
      else {
        // res.json({ docs });
        console.log(docs);
        console.log("111111111");
        const items = docs;
        if (Object.keys(docs).length === 0) {
          console.log('Empty')
          res.json('Empty');
          // res.status('Empty');
        } else {
        const page = req.params.page;
        const pageSize = 5;
        const pager = paginate(items.length, page, pageSize);
        const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
        return res.json({ pager, pageOfItems });
      }
      }
    }
  );
});

app.get("/api/dateRange/:from/:to", (req, res) => {
  let from = req.params.from;
  // let temp = new (from);
  // console.log(temp);
  let to = req.params.to;
  console.log(from);
  console.log(to);
  newUser.find(
    {
      $and: [{ dob: { $gte: from } }, { dob: { $lte: to } }]
    },
    (err, docs) => {
      if (err) console.log("error in date");
      else {
        // res.json({ docs });
        console.log(docs);
        console.log("222222222222");
        const items = docs;
        const page = req.params.page;
        const pageSize = 5;
        const pager = paginate(items.length, page, pageSize);
        const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
        return res.json({ pager, pageOfItems });
      }
    }
  );
});

port = 3000;
app.listen(port, () => {
  console.log(`running on port${port}`);
});

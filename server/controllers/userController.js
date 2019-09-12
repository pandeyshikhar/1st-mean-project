const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const newUser = mongoose.model("newUser");

// router.post('/api/userCreate', (req, res) => {
//     let user = new User();
//     user.fullname = req.body.fullname;
//     user.username = req.body.username;
//     user.password = req.body.password;
//     user.email = req.body.email;
//     user.country = req.body.country;
//     user.city = req.body.city;
//     user.address = req.body.address;
//     user.save((err, doc) => {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log("data inserted");
//             res.json({
//                 data: req.body
//             })
//         }
//     })

// });

edituser = (req,res) => {
    let editId = req.params.id;
  console.log("editttt");
  newUser.findOne({ _id: editId }, (err, doc) => {
          if (err) {
              console.log(err);
          } else {
               console.log(doc);
              res.json({ data: doc });
          }
      });
}


new1 = (req,res) => {
    let newuser = new newUser();
  console.log(req.body);
  newuser.fullname = req.body.fullname;
  newuser.username = req.body.username;
  newuser.dob = req.body.dob;
  newuser.points = req.body.points;
  newuser.notes = req.body.notes;
  newuser.images = req.body.images;
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
}

module.exports = router;
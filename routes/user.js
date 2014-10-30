var express = require('express');
var router = express.Router();

var user = {
  persona: {
    firstName: "Gregory",
    lastName: "House",
    middleName: "Jochovich"
  },
  address:{
    country: null,
    town: null,
    street: null,
    houseNum: null
  },
  notice: ""
};


router.get('/', function(req, res) {
  res.json({
    user: user,
    status: "ok"
  });
});


router.post('/', function(req, res) {
  var body = req.body;
  user = body.user;
  res.json({
    status: "ok"
  });
});

module.exports = router;

var express = require('express');
var router = express.Router();


let array = [];

/* GET home page. */
router.get('/api', function (req, res, next) {
  if (req.headers.api_key) {
    let item = array.find((item) => item.api_key == req.headers.api_key);
    if (item) {
      res.send(item.data);
    }
    else {
      res.send("data not exist!");
    }
  }
  else {
    res.send("api_key not found!");
  }
});


router.post('/api', function (req, res, next) {
  let key = array.find(item => item.api_key == req.headers.api_key);

  if (key) {
    res.send("data with this api_key exist!");
  }
  else {
    if (req.headers.api_key) {
      array.push({ api_key: req.headers.api_key, data: { ...req.body } });
      res.send("data added");
    }

    else {
      res.send("api_key not found!");
    }
  }
});


router.put('/api', function (req, res, next) {
  if (req.headers.api_key) {
    let index = array.findIndex((item) => item.api_key == req.headers.api_key);
    if (index != -1) {
      array[index].data = { ...array[index].data, ...req.body };
      res.send("data changed!");
    }
    else {
      res.send("data not exist!");
    }
  }
  else {
    res.send("api_key not found!");
  }
});

router.delete('/api', function (req, res, next) {
  if (req.headers.api_key) {
    let index = array.findIndex((item) => item.api_key == req.headers.api_key);
    if (index != -1) {
      array.splice(index, 1);
      res.send("data deleted!");
    }
    else {
      res.send("data not exist!");
    }
  }
  else {
    res.send("api_key not found!");
  }
});

module.exports = router;

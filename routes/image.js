var express = require('express');
var router = express.Router();
var createError = require('http-errors');
var path = require('path');
const sharp = require('sharp');
const fs = require('fs');

/* GET users listing. */
router.get('/*.png', function(req, res, next) {
  let imagePath = __dirname + '/../public/images/';
  let imageName = req.params['0'] + '.png';
  let image = fs.createReadStream(imagePath + imageName);

  if(req.query.size) {
    const [paramX, paramY] = req.query.size.split('x');
    let resizedName = imagePath + req.params[0] + `_${paramX}x${paramY}.png`;

    let transformer = sharp()
      .resize(
        parseInt(paramX),
        parseInt(paramY),
        {
          fit: 'inside'
        });
    image.pipe(transformer).pipe(res);
  } else {
    image.pipe(res);
  }
});

module.exports = router;

/* Creates by Akhitha Manjitha
   20/05/2020
   asmanjitha@gmail.com
   https://github.com/asmanjitha
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'AR Vegas' });
});


module.exports = router;

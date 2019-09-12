var express = require('express');
let {Query, validateQuery} = require('../models/query.model');
var router = express.Router();

/* GET query list. */
router.get('/imagesearch', async function(req, res, next) {
    let results = await Query.find().sort({when:-1}).limit(10).select('term when -_id').exec()
    return  res.json(results.map(i=> i._doc))
});



module.exports = router;

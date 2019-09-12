var express = require('express');
var axios = require("axios");
var router = express.Router();
let {Query, validateQuery} = require('../models/query.model');

/* GET image list. */
router.get('/imagesearch/:term', async function (req, res) {
    let {term}  = req.params
    let offset = req.query.offset ? parseInt(req.query.offset) : 0
    const { error, value }  = validateQuery({term, offset})
    if (error) return res.status(400).json(error);

    let query = new Query({term:value.term})
    await query.save()

    let url = `${process.env.api_url}?cx=${process.env.cx}&key=${process.env.key}&q=${value.term}&searchType=image&start=${value.offset + 1}`
    console.log(url)
    let response = await axios.get(url)
    let results = []
    response = response.data
    for (let item of response.items) {
        results.push({
            url: item.link,
            snippet: item.snippet,
            thumbnail: item.image.thumbnailLink,
            context: item.image.contextLink
        })
    }
    return res.json(results);
});


module.exports = router;

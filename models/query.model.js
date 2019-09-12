var mongoose = require('mongoose');
const Joi = require('@hapi/joi');

var querySchema = new mongoose.Schema({
    term: {type: String, required: true,minLength:1,maxLength:100},
    when: {type: Date, default: Date.now},
});
let Query =mongoose.model('query', querySchema);

function validateQuery(query) {
    const schema = Joi.object({
        term: Joi.string().min(1).max(100).required(),
        offset: Joi.number().integer().min(0).max(90)
    });
    return schema.validate(query);
}

exports.Query = Query;
exports.validateQuery = validateQuery
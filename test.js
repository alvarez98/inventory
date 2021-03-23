const Joi = require('joi')

const scheme = Joi.object({

})

const mock = {
    phone: '2353534212'
}

console.log(scheme.validate(mock));
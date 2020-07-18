const Joi = require("@hapi/joi")

//Registration
const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

    return schema.validate(data);

};

const loginValidation = (data) => {
    const schema = Joi.object({
      email: Joi.string().min(6).required().email(),
      password: Joi.string().min(6).required(),
    });
  
      return schema.validate(data);
  
  };

const propertyValidation = (data) =>{
    console.log(data);
    const schema = Joi.object({
        category: Joi.string().max(255).required(),
        price: Joi.string().regex(/^\d+$/),
        size: Joi.string().regex(/^\d+$/),
        size_unit: Joi.string().required(),
        city: Joi.string().max(255).required(),
        region: Joi.string().max(255).required(),
        imageURL: Joi.string().required()
    })
    return schema.validate(data);
}

const blogValidation = (data) =>{
  const schema = Joi.object({
      title: Joi.string().required(),
      author: Joi.string().required(),
      category: Joi.string().required(),
      description: Joi.string().required(),
      body: Joi.string().required(),
      imageURL: Joi.string().required()
  })
  return schema.validate(data);
}


module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation
module.exports.propertyValidation = propertyValidation
module.exports.blogValidation = blogValidation
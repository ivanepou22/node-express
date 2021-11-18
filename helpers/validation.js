const joi = require("joi");

const loginCheck = (data) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
  });

  return schema.validate(data);
};

const registerCheck = (data) => {
  const schema = joi.object({
    name: joi.string().min(6).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
  });

  return schema.validate(data);
};

const updateCheck = (data) => {
    const schema = joi.object({
        name: joi.string().min(6),
        email: joi.string().email(),
    })
    return schema.validate(data)
}

module.exports = {
  loginCheck,
  registerCheck,
    updateCheck
};

const Ajv = require('ajv');
const ajv = new Ajv();

function postPetValidationSchema(schema) {
  const validate = ajv.compile(schema);
  return (req, res, next) => {
    console.log(req.body);
    const valid = validate(req.body);
    if (!valid) {
      res.status(400);
      res.send({ errors: validate.errors });
    } else {
      next();
    }
  }
}

module.exports = postPetValidationSchema;
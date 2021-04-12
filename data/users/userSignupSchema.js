const S = require("fluent-json-schema").default;

const NewUserValidateSchema = S.object()
    .prop('email', S.string().required())
    .prop('password', S.string().minLength(8).required())
    .prop('password2', S.string().minLength(8).required())
    .prop('firstName', S.string().required())
    .prop('lastName', S.string().required())
    .prop('phoneNumber', S.string().minLength(10).required())
    .valueOf();
exports.NewUserValidateSchema = NewUserValidateSchema;

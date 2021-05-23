const S = require("fluent-json-schema").default;

const UserLoginValidateSchema = S.object()
    .prop('email', S.string().required())
    .prop('password', S.string().minLength(8).required())
    .valueOf();
exports.UserLoginValidateSchema = UserLoginValidateSchema;

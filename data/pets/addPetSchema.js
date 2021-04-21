const S = require("fluent-json-schema").default;

const adoptoinStatus = {
    ADOPTED: "ADOPTED",
    FOSTERED: "FOSTERED",
    AVAILABLE: "AVAILABLE",
};

const AddPetSchema = S.object()
    .prop('type', S.string().required())
    .prop('name', S.string().required())
    .prop('adoptionStatus', S.string().enum(Object.keys(adoptoinStatus)).default(adoptoinStatus.AVAILABLE).required())
    .prop('picture', S.string().required())
    .prop('height', S.number().required())
    .prop('weight', S.number().required())
    .prop('color', S.string().required())
    .prop('bio', S.string())
    .prop('hypoallergenic', S.boolean().required())
    .prop('dietaryRestrictions', S.string().default("none"))
    .prop('breed', S.string().required())
    .valueOf();
exports.AddPetSchema = AddPetSchema;

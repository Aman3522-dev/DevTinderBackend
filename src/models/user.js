const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    age : {
        type: Number,
        min: 18,
        max: 65,
    },
    gender : {
        type: String,
        validate(value){
            if (!["male", "female", "other"].includes(value)){
                throw new Error("Gender is not valid");
            }
        },
    },
    photoUrl: {
        type: String,
        default: "https://hips.hearstapps.com/hmg-prod/images/professional-bodybuilder-arnold-schwarzenegger-posing-at-news-photo-1567803748.jpg?resize=980:*",
    },
    about: {
        type: String,
        default: "This is an default use case",
    },
    skills: {
        type: [String],
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("User", userSchema);
const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("Invalid email address" + value);
            }
        }, 
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if(!validator.isStrongPassword(value)) {
                throw new Error("Enter a strong Password" + value);
            }
        }, 
    },
    age : {
        type: Number,
        min: 18,
        max: 65,
    },
    gender : {
        type: String,
        enum: {
            values: ["male","female", "other"],
            message: '{VALUE} is not supported'
        }
    },
    photoUrl: {
        type: String,
        default: "https://hips.hearstapps.com/hmg-prod/images/professional-bodybuilder-arnold-schwarzenegger-posing-at-news-photo-1567803748.jpg?resize=980:*",
        validate(value) {
            if(!validator.isURL(value)) {
                throw new Error("Invalid Photo URL" + value);
            }
        }, 
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

userSchema.methods.getJWT = async function () {
    const user = this;

    const token = await jwt.sign({_id: user._id}, "MySecret123", {
        expiresIn : "1d",
    });

    return token;
}

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;

    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);

    return isPasswordValid;
};

module.exports = mongoose.model("User", userSchema);
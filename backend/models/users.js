const mongoose = require("mongoose");
const bycrypt = require("bcrypt");

const environment = process.env.NODE_ENV;
const stage = require("../config")[environment];

//schema maps to a collection
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: "String",
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: "String",
        required: true,
        trim: true
    }
});

// encrypt password before save
userSchema.pre("save", function (next) {
    const user = this;
    if (!user.isModified || !user.isNew) { // don't rehash if it's an old user
        next();
    }
    else {
        bycrypt.hash(user.password, stage.saltingRounds, (err, hash) => {
            if (err) {
                console.log("Error hashing password for user", user.email);
                next(err);
            }
            else {
                user.password = hash;
                next();
            }
        });
    }
});

module.exports = mongoose.model("User", userSchema);

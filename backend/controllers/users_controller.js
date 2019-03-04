const mongoose = require("mongoose");
const MODEL_PATH = "../models/";
const User = require(`${MODEL_PATH}users`);
const bycrpt = require("bcrypt");
const jwt = require("jsonwebtoken");

const connUri = process.env.MONGO_LOCAL_CONN_URL;

console.log(connUri);
module.exports = {

    /**
     * @apiVersion 1.0.0
     * @api {post} api/v1/users/add User add
     * @apiName AddUser
     * @apiGroup User
     * @apiDescription Add new user.
     *
     *
     * @apiParam {string} email User E-mail Address
     * @apiParam {string} password User Password
     *
     * @apiSuccess {Object} user Information of added user
     *
     * @apiError {string} message Information About the Error
     *
     * @apiSuccessExample {json} Success-Response:
     *  {
     *      status: 200,
     *      "result": {
     *          "_id": "5c7c14f3726b933b8291c59c",
     *          "email": "admin@admin.com",
     *          "password": "$2b$10$J4jmJ7SXKOuxpjrsUvfkfOKL3Go1OWh4yqYoMzC6ZJ9/AGD0UzAeS",
     *          "__v": 0
     *      }
     *  }
     *
     * @apiSampleRequest api/v1/brand/add
     */

    add: async (req, res) => {

        try {

            await mongoose.connect(connUri, {useNewUrlParser: true});
            let result = {};
            let status = 201;

            const {email, password} = req.body;
            const user = new User();
            user.email = email;
            user.password = password;

            try {

                await user.save();
                result.status = status;
                result.result = user;
            }
            catch (err) {
                status = 500;
                result.status = status;
                result.error = err;
            }
            res.status(status).send(result);

        }
        catch (err) {

            let result = {};
            result.status = 500;
            result.error = err;
            res.status(500).send(result);
        }
    },

    /**
     * @apiVersion 1.0.0
     * @api {post} api/v1/users/login User login
     * @apiName Login
     * @apiGroup User
     * @apiDescription User login.
     *
     *
     * @apiParam {string} email User E-mail Address
     * @apiParam {string} password User Password
     *
     * @apiSuccess {Object} token Token assigned to user after login
     * @apiSuccess {Object} user Information of user logged in
     *
     * @apiError {string} message Information About the Error
     *
     * @apiSuccessExample {json} Success-Response:
     *      {
     *          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZXJrIiwiaWF0IjoxNTUxNjM4MDkzLCJleHAiOjE1NTE4MTA4OTMsImlzcyI6ImJhcmZseSJ9.st-iO_Z9evP5kGCMjf9NqAG8BioTEzYBxSn5gynX4us",
     *          "status": 200,
     *          "result": {
     *              "_id": "5c7a9d0df9822b2ffe171138",
     *              "email": "erk",
     *              "password": "$2b$10$aThIdfk4uT33al1PpEqO1.Pz0PLh4WnERBCwI6fQk94ljCR2GmTeK",
     *              "__v": 0
     *          }
     *      }
     *
     * @apiSampleRequest api/v1/users/login
     */

    login: async (req, res) => {

        const {email, password} = req.body;

        try {

            await mongoose.connect(connUri, {useNewUrlParser: true});
            let result = {};
            let status = 200;

            try {

                const user = await User.findOne({email});

                // We could compare passwords in our model instead of below
                try {

                    const match = await bycrpt.compare(password, user.password);

                    if (match) {

                        status = 200;
                        // Create a token
                        const payload = {user: user.email};
                        const options = {expiresIn: "2d", issuer: "barfly"};
                        const secret = process.env.JWT_SECRET;
                        const token = jwt.sign(payload, secret, options);

                        console.log("TOKEN", token);
                        result.token = token;
                        result.status = status;
                        result.result = user;

                    }
                    else {

                        status = 401;
                        result.status = status;
                        result.error = "Authentication error";
                    }

                    res.status(status).send(result);
                }
                catch (err) {

                    status = 500;
                    result.status = status;
                    result.error = err;
                    res.status(status).send(result);
                }
            }
            catch (err) {

                status = 404;
                result.status = status;
                result.error = err;
                res.status(status).send(result);
            }
        }
        catch (err) {

            let result = {};
            result.status = 500;
            result.error = err;
            res.status(500).send(result);
        }
    },

    /**
     * @apiVersion 1.0.0
     * @api {post} api/v1/users/getall User Get All
     * @apiName GetAll
     * @apiGroup User
     * @apiDescription Get all users.
     *
     * @apiHeader {string="Bearer $access_token"} Authorization AuthToken Örnek Kullanımı: { "Authorization": "Bearer $access_token"}
     *
     * @apiSuccess {Object} users Information of all users added.
     *
     * @apiError {string} message Information About the Error
     *
     * @apiSuccessExample {json} Success-Response:
     *  {
     *      "status": 200,
     *      "result": [
     *          {
     *              "_id": "5c7a6ebd1420161ff47d9819",
     *              "email": "admin",
     *              "password": "$2b$10$uPcIlDszVXrlcOSJOgk8huNi2m9bY2OpzCCq6.FYdNcEpFFD9uQaW",
     *              "__v": 0
     *          },
     *          {
     *              "_id": "5c7a9d0df9822b2ffe171138",
     *              "email": "erk",
     *              "password": "$2b$10$aThIdfk4uT33al1PpEqO1.Pz0PLh4WnERBCwI6fQk94ljCR2GmTeK",
     *              "__v": 0
     *          }
     *      ]
     *  }
     *
     * @apiSampleRequest api/v1/users/getall
     */

    getAll: async (req, res) => {

        try {

            await mongoose.connect(connUri, {useNewUrlParser: true});
            let result = {};
            let status = 200;

            const payload = req.decoded;
            // TODO: Log the payload here to verify that it's the same payload
            //  we used when created the token
            if (payload) {

                try {

                    const users = await User.find({});
                    result.status = status;
                    result.result = users;
                }
                catch (err) {

                    status = 500;
                    result.status = status;
                    result.error = err;
                }

                res.status(status).send(result);
            }
            else {

                status = 401;
                result.status = status;
                result.error = "Authentication error";
                res.status(status).send(result);
            }
        }
        catch (err) {

            let result = {};
            result.status = 500;
            result.error = err;
            res.status(500).send(result);
        }
    }
};

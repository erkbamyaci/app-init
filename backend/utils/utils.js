const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

module.exports = {

    validateToken: (req, res, next) => {

        const authorizationHeader = req.headers.authorization;
        let result;

        if (authorizationHeader) {

            const token = req.headers.authorization.split(" ")[1]; // Bearer <token>
            const options = {
                expiresIn: "2d",
                issuer: "barfly"
            };

            try {

                // verify makes sure that the token hasn't expired and has been issued by us
                result = jwt.verify(token, process.env.JWT_SECRET, options);

                // Let's pass back the decoded token to the request object
                req.decoded = result;
                // We call next to pass execution to the subsequent middlware
                next();
            }
            catch (err) {
                // Throw an error just in case anything goes wrong with verification
                throw new Error(err);
            }
        }
        else {

            result = {
                error: "Authentication error. Token required",
                status: 401
            };

            res.status(401).send(result);
        }
    },

    connectToDB: (req, res, next) => {

        const connUri = process.env.MONGO_LOCAL_CONN_URL;

        try {

            // Connect to mongoose
            // Add db to req
            req.db = mongoose.connect(connUri, {useNewUrlParser: true});

            // Move to next middlware
            next();
        }
        catch (err) {
            throw new Error(err);
        }
    }
};
const users_controller = require("../controllers/users_controller");
const validateToken = require("../utils/utils").validateToken;
const connectToDB = require("../utils/utils").connectToDB;

module.exports = (router) => {

    router.route("/users/add")
        .post(connectToDB, users_controller.add);

    router.route("/users/getall")
        .get(connectToDB, validateToken, users_controller.getAll); // This route is now protected

    router.route("/users/login")
        .post(connectToDB, users_controller.login);
};

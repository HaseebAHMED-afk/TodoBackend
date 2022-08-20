const { addEmployee, loginEmployee } = require("../Controllers/Employee");

const router = require("express").Router();

router.post("/addEmployee", addEmployee);
router.post("/loginEmployee", loginEmployee);

module.exports = router;

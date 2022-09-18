const { addEmployee, loginEmployee, getAllEmployees } = require("../Controllers/Employee");

const router = require("express").Router();

router.post("/addEmployee", addEmployee);
router.post("/loginEmployee", loginEmployee);
router.get("/getAllEmployees", getAllEmployees);

module.exports = router;

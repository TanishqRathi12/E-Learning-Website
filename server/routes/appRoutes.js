const express = require("express");
const router = express.Router();
const appControllers = require("../controllers/appControllers");

router.get("/", appControllers.homepage);
router.get("/home", appControllers.hometopage);
router.get("/about", appControllers.aboutpage);
router.get("/courses", appControllers.coursespage);
router.get("/userLogin", appControllers.userLoginPage);
router.get("/userRegister", appControllers.userRegisterPage);
router.get("/materialRegister", appControllers.materialRegisterPage);
router.get("/showMaterial", appControllers.showMaterialPage);

router.get("/adminLogin", appControllers.adminLoginPage);
router.get("/adminRegister", appControllers.adminRegisterPage);

router.post("/userRegister", appControllers.userRegisterAPI);
router.post("/userLogin", appControllers.userLoginAPI);

router.post("/adminRegister", appControllers.adminRegisterAPI);
router.post("/adminLogin", appControllers.adminLoginAPI);

router.post("/materialRegister", appControllers.materialRegisterAPI);
router.post("/deleteMaterial/:id", appControllers.deleteMaterial);

module.exports = router;

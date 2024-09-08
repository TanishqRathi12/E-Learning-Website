require("../models/database");
const Register = require("../models/register");
const adminRegister = require("../models/admin");
const Material = require('../models/material'); 
const path = require("path");
const fs = require('fs');

exports.homepage = async (req, res) => {
  res.render("index");
};
exports.aboutpage = async (req, res) => {
  res.render("about");
};
exports.coursespage = async (req, res) => {
  res.render("courses");
};
exports.hometopage = async (req, res) => {
  res.render("home");
};
exports.userLoginPage = async (req, res) => {
  const infoErrorsObj = req.flash("infoErrors");
  const infoSubmitObj = req.flash("infoSubmit");
  res.render("userLogin", { infoErrorsObj, infoSubmitObj });
};
exports.userRegisterPage = async (req, res) => {
  const infoErrorsObj = req.flash("infoErrors");
  const infoSubmitObj = req.flash("infoSubmit");
  res.render("userRegister", { infoErrorsObj, infoSubmitObj });
};
exports.adminRegisterPage = async (req, res) => {
  const infoErrorsObj = req.flash("infoErrors");
  const infoSubmitObj = req.flash("infoSubmit");
  res.render("adminRegister", { infoErrorsObj, infoSubmitObj });
};
exports.adminLoginPage = async (req, res) => {
  const infoErrorsObj = req.flash("infoErrors");
  const infoSubmitObj = req.flash("infoSubmit");
  res.render("adminLogin", { infoErrorsObj, infoSubmitObj });
};

exports.materialRegisterPage = async (req, res) => {
  try {
    const materials = await Material.find().sort({ createdAt: -1 });
    const infoErrorsObj = req.flash("infoErrors");
    const infoSubmitObj = req.flash("infoSubmit");
    res.render("materialRegister", { materials, infoErrorsObj, infoSubmitObj });
  } catch (error) {
    req.flash("infoErrors", `error: ${error.message}`);
    res.redirect("/");
  }
};

exports.userRegisterAPI = async (req, res) => {
  try {
    const registerUser = new Register({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    });

    await registerUser.save();
    req.flash("infoSubmit", "Registration Successful");
    res.status(200).redirect("userLogin");
  } catch (error) {
    req.flash("infoErrors", `error: ${error.message}`);
    res.status(400).redirect("userRegister");
  }
};

exports.userLoginAPI = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Register.findOne({ email });

    if (user && user.password === password) {
      res.status(200).render("home");
    } else {
      req.flash("infoErrors", "Invalid email or password");
      res.status(400).redirect("userLogin");
    }
  } catch (error) {
    req.flash("infoErrors", `error: ${error.message}`);
    res.status(400).redirect("userLogin");
  }
};

exports.adminRegisterAPI = async (req, res) => {
  try {
    const registerAdmin = new adminRegister({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    });

    await registerAdmin.save();
    req.flash("infoSubmit", "Registration Successful");
    res.status(200).redirect("adminRegister");
  } catch (error) {
    req.flash("infoErrors", `error: ${error.message}`);
    res.status(400).redirect("adminRegister");
  }
};

exports.adminLoginAPI = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await adminRegister.findOne({ email });

    if (admin && admin.password === password) {
      const infoErrorsObj = req.flash("infoErrors");
      const infoSubmitObj = req.flash("infoSubmit");
      res.status(200).render("materialRegister", { infoErrorsObj, infoSubmitObj, materials: [] }); 
    } else {
      req.flash("infoErrors", "Invalid email or password");
      res.status(400).redirect("adminLogin");
    }
  } catch (error) {
    req.flash("infoErrors", `Error: ${error.message}`);
    res.status(400).redirect("adminLogin");
  }
};


exports.materialRegisterAPI = async (req, res) => {
  try {
    const newMaterial = new Material({
      Title: req.body.Title,
      Link: req.body.Link,
    });
    await newMaterial.save();
    req.flash("infoSubmit", "Material added successfully!");
    res.redirect("/materialRegister");
  } catch (error) {
    req.flash("infoErrors", `Error: ${error.message}`);
    res.redirect("/materialRegister");
  }
};

exports.deleteMaterial = async (req, res) => {
  try {
    const { id } = req.params;

    await Material.findByIdAndDelete(id);
    req.flash("infoSubmit", "Material deleted successfully");
    res.redirect("/materialRegister");
  } catch (error) {
    req.flash("infoErrors", `error: ${error.message}`);
    res.redirect("/materialRegister");
  }
};

exports.showMaterialPage = async (req, res) => {
  try {
    const materials = await Material.find().sort({ createdAt: -1 });
    res.render("showMaterial", { materials });
  } catch (error) {
    req.flash("infoErrors", `error: ${error.message}`);
    res.redirect("/");
  }
};

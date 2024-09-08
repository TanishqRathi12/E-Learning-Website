const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true,
  },
  Link: {
    type: String,
    required: true,
  }
});

const Material = new mongoose.model("Material", materialSchema);

module.exports = Material;

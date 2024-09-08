var jsonfile = require('jsonfile');
var _ = require('lodash');

var materials = jsonfile.readFileSync(__dirname + '/data/materials.json');

var corporaDataFiles = [
  'breads_and_pastries.json',
  'herbs_n_spices.json',
  'vegetables.json',
  'fruits.json',
  'toxic_chemicals.json'
];

corporaDataFiles.forEach(addCorporaMaterials);

function addCorporaMaterials(filename) {
  var corporaData = jsonfile.readFileSync(
    __dirname + '/data/corpora/' + filename
  );
  corporaData = _.omit(corporaData, 'description');

  for (var key in corporaData) {
    materials['_corpora_' + key] = corporaData[key];
  }
}

module.exports = materials;

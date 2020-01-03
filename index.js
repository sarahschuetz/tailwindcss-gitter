const addSectionUtility = require('./utilities/section');
const addColUtilities = require('./utilities/cols');

module.exports = () => (helperFunctions) => {
  addSectionUtility(helperFunctions);
  addColUtilities(helperFunctions);
};

const defaultConfig = require('../default.config');

const addSectionUtility = ({ addUtilities, theme }) => {
  const gitter = { ...defaultConfig, ...theme('gitter', {}) };

  const sectionUtility = {
    '.section': {
      width: `calc(100% - ${gitter.outerGutter} * 2)`,
      maxWidth: gitter.sectionMaxWidth,
    },
  };

  addUtilities(sectionUtility);
};

module.exports = addSectionUtility;

const postcss = require('postcss');
const defaultConfig = require('../default.config');

const COL_VARIANT = 'gitter';
const COL_CLASS_BASE = 'w-col-';

const calcWidthValue = (gitter, cols, index) => `calc((100vw - ${gitter.outerGutter} * 2) / ${cols} * ${index})`;

const calcMaxWidthValue = (gitter, cols, index) => `calc(${gitter.sectionMaxWidth} / ${cols} * ${index})`;

const addGitterVariant = (addVariant, e, theme, gitter) => {
  const screens = theme('screens', {});
  const screenSizes = Object.keys(screens);
  const colDefinitions = gitter.responsiveCols;
  const mappedScreenSizes = screenSizes.filter((size) => colDefinitions[size]);

  addVariant(COL_VARIANT, ({ container, separator }) => {
    // remove duplicated classes in root
    Array.from(container.nodes).forEach((node) => {
      node.remove();
    });

    mappedScreenSizes.forEach((size) => {
      const colRule = postcss.atRule({ name: 'media', params: `(min-width: ${screens[size]})` });

      const cols = colDefinitions[size];
      for (let i = 1; i <= cols; i++) {
        const selector = `.${e(`${size}${separator}${COL_CLASS_BASE}${i}`)}`;
        const rule = new postcss.rule({ selector }); // eslint-disable-line
        rule.append({ prop: 'width', value: calcWidthValue(gitter, cols, i) });

        if (gitter.sectionMaxWidth) {
          rule.append({ prop: 'max-width', value: calcMaxWidthValue(gitter, cols, i) });
        }

        colRule.append(rule);
      }

      container.append(colRule);
    });
  });
};

const addColUtilities = ({
  addUtilities,
  e,
  addVariant,
  theme,
}) => {
  const gitter = { ...defaultConfig, ...theme(COL_VARIANT, {}) };
  const columnCount = gitter.cols;

  const colUtilities = {};
  Array.from(Array(columnCount), (el, i) => i + 1).forEach((colNumber) => {
    const selector = `.${COL_CLASS_BASE}${colNumber}`;

    if (gitter.sectionMaxWidth) {
      colUtilities[selector] = {
        width: calcWidthValue(gitter, columnCount, colNumber),
        maxWidth: calcMaxWidthValue(gitter, columnCount, colNumber),
      };
    } else {
      colUtilities[selector] = {
        width: calcWidthValue(gitter, columnCount, colNumber),
      };
    }
  });

  addUtilities(colUtilities, [COL_VARIANT]);
  addGitterVariant(addVariant, e, theme, gitter);
};

module.exports = addColUtilities;

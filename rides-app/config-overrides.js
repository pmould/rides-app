const {override, fixBabelImports, addLessLoader} = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      '@primary-color': '#555',
      '@link-color': '#000',
      '@brand-primary': '#555',
      '@brand-primary-tap': '#888',
      '@color-text-base': '#333',
     },
  }),
);


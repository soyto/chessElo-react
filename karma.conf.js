module.exports = (config) => {
  config.set({

    'files': ['test/index_test.js'],
    'preprocessors': {'test/index_test.js': [ 'webpack', 'sourcemap' ]},
    'frameworks': ['jasmine'],
    'browsers': ['Chrome'],
    'webpack': {
      devtool: 'inline-source-map',
    },
    'webpackMiddleware': { 'stats': 'errors-only'}
  });
};
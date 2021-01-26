module.exports = function (config) {
  config.set({
    singleRun: true,
    browsers: ['ChromeHeadless'],
    frameworks: ['jasmine'],
    files: [
      'algorithm/*.js'
    ],
    preprocessors: {
      'algorithm/source.js': ['coverage']
    },
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      dir: 'algorithm/coverage',
      reporters: [
        { type: 'cobertura', subdir: '.', file: 'cobertura.xml' },
        { type: 'html', subdir: './html' }
      ]
    }
  });
}

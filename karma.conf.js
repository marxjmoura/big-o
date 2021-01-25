module.exports = function (config) {
  config.set({
    singleRun: true,
    browsers: ['ChromeHeadless'],
    frameworks: ['jasmine'],
    files: [
      'challenge/*.js'
    ],
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      dir: 'challenge/coverage',
      reporters: [
        { type: 'cobertura', subdir: '.', file: 'cobertura.xml' },
        { type: 'html', subdir: './html' }
      ]
    }
  });
}

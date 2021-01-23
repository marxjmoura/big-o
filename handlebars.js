const fs = require('fs')
const path = require('path')
const through = require('through2')
const handlebars = require('handlebars')
const PluginError = require('plugin-error')

const ROOTDIR = process.cwd()
const PLUGIN_NAME = 'gulp-site-engine'

function transform(file, encoding, callback) {
  if (file.isNull()) {
    // nothing to do
    return callback(null, file)
  }

  if (file.isStream()) {
    this.emit('error', new PluginError(PLUGIN_NAME, 'Streams not supported!'))
  }

  const dirname = path.dirname(file.path)
  const basename = path.basename(file.path)
  const isPartial = basename.startsWith('_')
  const source = file.contents.toString()

  if (isPartial) {
    const partialPrefix = dirname.replace(ROOTDIR + '/', '')
    const partialName = path.join(partialPrefix, basename)

    handlebars.registerPartial(partialName, source)
  } else {
    try {
      const template = handlebars.compile(source)
      const compiledHTML = template({})

      file.contents = Buffer.from(compiledHTML)
    } catch (err) {
      this.emit('error', new PluginError(PLUGIN_NAME, err))
    }

    this.push(file)
  }

  return callback()
}

handlebars.registerHelper('include', function (file) {
  try {
    return fs.readFileSync(file, 'utf8')
  } catch (error) {
    console.error(PLUGIN_NAME, error.message)
    return ''
  }
})

handlebars.registerHelper('set', function (name, value, options) {
  options.data.root = options.data.root || {};
  options.data.root[name] = eval(value);
});

module.exports = function () {
  return through.obj(transform)
}

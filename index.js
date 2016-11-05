'use strict'
var debug = require('debug')

var Logger = function () {
  this._modules = {}
  this.debug = this.log.bind(this, 'debug')
  this.info = this.log.bind(this, 'info')
  this.warn = this.log.bind(this, 'warn')
  this.error = this.log.bind(this, 'error')
}

Logger.prototype.log = function (level, msg, attributes) {
  var name = 'default'
  if (attributes.module) {
    name = attributes.module
    delete attributes.module
  }
  if (!this._modules[name]) {
    this._modules[name] = debug(name)
  }
  this._modules[name](level + ' - ' + msg + ' (' + JSON.stringify(attributes) + ')')
}

module.exports = new Logger()

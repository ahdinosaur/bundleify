#!/usr/bin/env node

const minimist = require('minimist')
const bundleify = require('./')
const Path = require('path')
const pino = require('pino')

const log = pino({
  name: 'bundleify',
  serializers: {
    err: pino.stdSerializers.err
  }
})

const opts = minimist(process.argv.slice(2))

if (!opts.entry) {
  opts.entry = opts._[0]
}

if (!opts.destination) {
  opts.destination = Path.basename(opts.entry)
}

if (opts.plugins && !Array.isArray(opts.plugins)) {
  opts.plugins = [opts.plugins]
}

bundleify(opts, function (err, stats) {
  if (err) {
    log.error(err)
  } else {
    log.info(
      stats.bytes + " bytes written to " +
      opts.destination + " (" +
      (stats.time / 1000).toFixed(2) + " seconds)"
    )
  }
})

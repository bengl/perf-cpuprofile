/* vim: set shiftwidth=2 tabstop=2 noexpandtab textwidth=80 wrap : */
"use strict";

exports = module.exports = perfCpuprofile;

// expose for testing:
exports.Lines = require('./lines');
exports.Samples = require('./samples');

var Reader = exports.Reader = require('./reader');
var Accumulator = exports.Accumulator = require('./accumulator');

function perfCpuprofile(input, callback) {
	var reader = new Reader(input);
	var accumulator = new Accumulator();
	reader.pipe(accumulator);

	tryRead();
	function tryRead() {
		var profile = accumulator.read();
		if (profile)
			return callback(profile);
		accumulator.once('readable', tryRead);
	}
}

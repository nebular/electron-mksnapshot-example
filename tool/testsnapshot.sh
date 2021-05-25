#!/usr/bin/env bash

node $1 <<EOF

const
	fs = require("fs"),
	vm = require("vm");

function run(filename) {
	console.log(TAG, "Checking snapshot ...");

	const linkedContent = fs.readFileSync(filename);
	vm.runInNewContext(linkedContent.toString("UTF-8"), undefined, {filename, displayErrors: true});

}
console.log(process.argv);

if (process.argv[1]) {
	run(process.argv[1]);
} else {
	console.log("Usage:", process.argv[0], "snapshot-big-file.js");
}

EOF

#!/usr/bin/env zsh
#spell:words preload
download-site() {
	node --no-warnings --experimental-loader "./nice_loader.js" "./parse_dom_preload_2.js" "$@"
}

download-youtube() {
	node --experimental-loader "./nice_loader.js" ./parse_dom_preload_1.js
}

start-node-nice-loader-module() {
	node --no-warnings --experimental-loader "./nice_loader.js" "$@"
}

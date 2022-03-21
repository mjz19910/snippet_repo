#!/usr/bin/env zsh

download-site(){
	node --no-warnings --experimental-loader "./nice_loader.js" "./parse_dom_preload_2.js" "$@"
}

download-youtube(){
	node ./parse_dom_preload_1.js
}

load-js-module() {
	node --no-warnings --experimental-loader "./nice_loader.js" "$@"
}

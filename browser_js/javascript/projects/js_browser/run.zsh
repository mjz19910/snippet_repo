#!/usr/bin/env zsh

start_node () {
	node --no-warnings --experimental-loader "./src/nice_loader.js" "$@"
}

js-download-site() {
	start_node "./src/parse_dom_preload_2.js" "$@"
}

js-download-youtube() {
	start_node "./src/parse_dom_preload_1.js"
}

node_nice_js() {
	start_node "$@"
}

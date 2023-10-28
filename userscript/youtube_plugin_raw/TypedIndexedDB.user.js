// ==UserScript==
// @name	YTPlugin IndexedDB Service
// @namespace	https://github.com/mjz19910/
// @version	0.1.2
// @description	try to take over the world!
// @author Matthias Zimmerman
// @copyright	Matthias Zimmerman 2023
// @match	https://www.youtube.com/*
// @grant	none
// @run-at	document-start
// @updateURL	https://github.com/mjz19910/snippet_repo/raw/master/userscript/youtube_plugin_raw/TypedIndexedDB.user.js
// @downloadURL	https://github.com/mjz19910/snippet_repo/raw/master/userscript/youtube_plugin_raw/TypedIndexedDB.user.js
// ==/UserScript==

const page_require = typeof require === "undefined"
	? __module_require__
	: require;
let delete_require = false,
	reset_require = false;
if (typeof require === "undefined" || page_require !== __module_require__) {
	delete_require = typeof require === "undefined";
	require = __module_require__;
	reset_require = true;
}
// yt_plugin/IndexedDB_Service(2) => base_require/BaseRequire(1)
const { do_export } = require("../../base_require_raw/BaseRequire.user.js");
// priority yt_plugin/IndexedDB_Service(2)
const __module_name__ = "mod$IndexedDBService";
/** @private @arg {(x:typeof exports)=>void} fn */
function export_(fn, flags = { global: false }) {
	do_export(fn, flags, exports, __module_name__);
}
export_((exports) => {
	exports.__is_module_flag__ = true;
});
class IndexedDBService {
	/** @template T @arg {IDBRequest<T>} request @returns {Promise<Event>} */
	await_success(request) {
		return new Promise(function (accept, reject) {
			request.onsuccess = (value) => {
				accept(value);
			};
			request.onerror = (event) => {
				console.log("await_success error", event);
				reject(event);
			};
		});
	}
}
export_((exports) => {
	exports.IndexedDBService = IndexedDBService;
});
class TypedIndexedDB {
	/** @arg {IDBDatabase} db */
	constructor(db) {
		this.m_db = db;
	}
	/** @arg {string} storeNames @arg {IDBTransactionMode} mode */
	transaction(storeNames, mode) {
		return this.m_db.transaction(storeNames, mode);
	}
}
export_((exports) => exports.TypedIndexedDB = TypedIndexedDB);
export_((exports) => exports.__module_loaded__ = true);
if (delete_require) {
	delete window.require;
} else if (reset_require) {
	require = page_require;
}

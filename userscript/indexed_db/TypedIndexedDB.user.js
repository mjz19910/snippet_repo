// ==UserScript==
// @name	TypedIndexedDB
// @namespace	https://github.com/mjz19910/
// @version	0.1
// @description	typed IndexedDB
// @author Matthias Zimmerman
// @copyright	Matthias Zimmerman 2023
// @match		https://*/*
// @match		http://*/*
// @grant	none
// @run-at	document-start
// @updateURL	https://github.com/mjz19910/snippet_repo/raw/master/userscript/indexed_db/TypedIndexedDB.meta.js
// @downloadURL	https://github.com/mjz19910/snippet_repo/raw/master/userscript/indexed_db/TypedIndexedDB.user.js
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
// indexed_db/TypedIndexedDB(3) => BaseRequire(1)
const { do_export } = require("../base_require_raw/BaseRequire.user.js");
// priority indexed_db/TypedIndexedDB(3)
const __module_name__ = "mod$TypedIndexedDB";
/** @private @arg {(x:typeof exports)=>void} fn */
function export_(fn, flags = { global: false }) {
	do_export(fn, flags, exports, __module_name__);
}
export_((exports) => {
	exports.__is_module_flag__ = true;
});
/** @template T @arg {IDBRequest<T>} request @returns {Promise<T>} */
function await_success(request) {
	return new Promise(function (accept, reject) {
		request.onsuccess = () => {
			accept(request.result);
		};
		request.onerror = (event) => {
			console.log("await_success error", event);
			reject(event);
		};
	});
}
/** @template T */
class TypedIDBRequest {
	/** @type {IDBRequest<T>} */
	m_base;
	/** @arg {IDBRequest<T>} request */
	constructor(request) {
		this.m_base = request;
	}
	success_promise() {
		return await_success(this.m_base);
	}
}
export_((exports) => {
	exports.TypedIDBRequest = TypedIDBRequest;
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
	delete self.require;
} else if (reset_require) {
	require = page_require;
}

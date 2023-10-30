// ==UserScript==
// @name	Base Require
// @namespace	https://github.com/mjz19910/
// @version	0.1.0
// @description	try to take over the world!
// @author	@mjz19910
// @copyright	@mjz19910 2020-2023
// @match		https://*/*
// @match		http://*/*
// @grant	none
// @run-at	document-start
// @updateURL	https://github.com/mjz19910/snippet_repo/raw/master/userscript/base_require_raw/BaseRequire.user.js
// @downloadURL	https://github.com/mjz19910/snippet_repo/raw/master/userscript/base_require_raw/BaseRequire.user.js
// ==/UserScript==
/* eslint-disable no-native-reassign,no-implicit-globals,no-undef,no-lone-blocks,no-sequences */
// deno-lint-ignore-file
const __module_name__ = "mod$base_require";

const path_map = {
	/** @type {["mod","base_require"]} */
	["./base_require_raw/BaseRequire.user.js"]: ["mod", "base_require"],
	/** @type {["raw","DebugApi"]} */
	["./DebugApi_raw/DebugApi.user.js"]: ["raw", "DebugApi"],
	/** @type {["mod","TypedIndexedDB"]} */
	["./indexed_db/TypedIndexedDB.user.js"]: [
		"mod",
		"TypedIndexedDB",
	],
};
/** @private @template U @arg {U} e @arg {U} [x] @returns {U} */
const _as2 = (e, x = e) => {
	return x;
};
/** @type {any} */
const _as = _as2;
/** @private @template U @template {U} T @arg {U} e @arg {unknown} [x] @returns {T} */
const as = _as;
/** @public @template {string} T_Needle @template {string} T_Str @arg {T_Needle} needle @arg {T_Str} str @returns {str is `${T_Needle}${string}`} */
function str_starts_with(str, needle) {
	return str.startsWith(needle);
}
const log_path_resolve = false;
/** @arg {string} x @returns {(keyof typeof path_map)|null} */
function resolve_path_to_userscript_dir(x) {
	if (!str_starts_with(x, ".")) return null;
	let parts = x.split("/");
	/** @type {(keyof typeof path_map)|null} */
	let resolved_path = null;
	m:
	switch (parts[0]) {
		case ".":
			switch (parts[1]) {
				case "indexed_db":
					switch (parts[2]) {
						case "TypedIndexedDB.user.js":
							resolved_path = `./${parts[1]}/${parts[2]}`;
							break m;
					}
			}
	}
	if (resolved_path) {
		if (log_path_resolve) console.log("resolved path", x, "->", resolved_path);
		return resolved_path;
	} else {
		console.log("resolved_path", x);
	}
	throw new Error("Unresolved import");
}
function get_exports() {
	window.__require_module_cache__ ??= {};
	return window.__require_module_cache__;
}
/** @arg {keyof import("./RequireModuleCache.ts").RequireModuleCache} module_name @template T,U @arg {(x:T)=>U} fn @arg {{global:boolean}} flags @arg {T} exports @returns {U} */
function do_export(fn, flags, exports, module_name) {
	/** @typedef {typeof exports} ExportsT */
	if (typeof exports === "object") {
		return fn(exports);
	} else {
		/** @type {ExportsT} */
		let exports;
		if (flags.global) {
			/** @type {{}} */
			let win_exp = window;
			exports = as(win_exp);
		} else {
			window.__require_module_cache__ ??= {};
			let all_modules = window.__require_module_cache__;
			exports = as(all_modules[module_name] ?? {});
			all_modules[module_name] = as(exports);
		}
		return fn(exports);
	}
}
/** @private @arg {(x:typeof exports)=>void} fn */
function export_(fn, flags = { global: false }) {
	do_export(
		fn,
		flags,
		exports,
		__module_name__,
	);
}
export_((exports) => {
	exports.__is_module_flag__ = true;
});

const log_module_loading_enabled = false;
/** @template T @arg {T|undefined} x @returns {T} */
function required(x) {
	if (x === void 0) throw new Error("missing required");
	return x;
}
/** @arg {string} arg @arg {[]} r_args @returns {any} */
function require(arg, ...r_args) {
	if (arg === void 0) throw new Error("missing required argument");
	window.__require_module_cache__ ??= {};
	const M = window.__require_module_cache__, i = required;
	const resolved_path = resolve_path_to_userscript_dir(arg);
	if (resolved_path === null) {
		if (cur_require && cur_require.__system_require) {
			return cur_require(arg, ...r_args);
		}
		throw new Error("Unable to resolve path: " + arg);
	}
	const loc = path_map[resolved_path];
	let mod;
	if (loc[0] === "raw") mod = i(M[loc[1]]);
	else mod = i(M[`${loc[0]}$${loc[1]}`]);
	return mod;
}

// module exports
export_((exports) => {
	exports.get_exports = get_exports;
	exports.do_export = do_export;
	exports.as = as;
	exports.required = required;
	exports.__path_map__ = path_map;
});
require.__system_require = false;
let cur_require = require;

// global exports
export_((exports) => {
	exports.__module_require__ = require;
	exports.__base_require_module_loaded__ = true;
	exports.__log_module_loading_enabled__ = log_module_loading_enabled;
}, { global: true });

// module loaded
export_((exports) => exports.__module_loaded__ = true);

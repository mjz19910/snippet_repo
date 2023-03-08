// ==UserScript==
// @name         www.facebook.com
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  www.facebook.com
// @author       You
// @match        https://www.facebook.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==
// @ts-nocheck

(function() {
	'use strict';
	const expected_symbol=Symbol('expected');
	window.expected_symbol=expected_symbol;
	function make_overwrite(obj,key,value) {
		Object.defineProperty(obj,key,{
			get() {
				return value;
			},
			set(v) {
				value[expected_symbol]=v;
			},
			configurable: true,
		});
	}
	function make_overwrite_func(obj,key,value,data) {
		value.data=data;
		make_overwrite(obj,key,value);
	}
	function never_set(obj,key,value) {
		Object.defineProperty(obj,key,{
			get() {
				return value;
			},
			set(v) {
				let dbg_value={
					is_set: false,
					get() {
						return !this.is_set;
					}
				};
				// until the debugger changes it
				while(dbg_value.get()) {}
				throw 1;
			},
			configurable: true,
		});
	}
	let fb_api=[
		"_cstart",
		"envFlush",
		"Env",
		"__DEV__",
		"CavalryLogger",
		// facebook overwrite
		"expected_symbol",
		// DebugAPI
		"g_api",
		"CompressionStatsCalculator",
		"GenericDataEvent",
		"parse_html_to_binary_arr",
		"DebugAPI",
		// facebook api
		"__annotator",
		"__bodyWrapper",
		"__t",
		"__w",
		"emptyFunction",
		"FB_enumerate",
		"__m",
		"babelHelpers",
		"define",
		"require",
		"importDefault",
		"importNamespace",
		"requireDynamic",
		"requireLazy",
		"__d",
		"$RefreshReg$",
		"$RefreshSig$",
		"getErrorSafe",
		"ErrorGuard",
		"ErrorSerializer",
		"ErrorUtils",
		"Arbiter",
		"JSCC",
		"$",
		"ge",
		"Parent",
		"TimeSlice",
		"goURI",
		"Bootloader",
		"PageEvents",
		"_domcontentready",
		"onloadRegister_DEPRECATED",
		"onloadRegister",
		"onafterloadRegister_DEPRECATED",
		"onafterloadRegister",
		"onleaveRegister",
		"onbeforeunloadRegister",
		"onunloadRegister",
		"$E",
		"__bigPipeFactory",
		"_script_path",
		"onloadhooks",
		"now_inl",
		"__bigPipeFR",
		"__bigPipeCtor",
		"bigPipe",
		"AsyncRequest",
		"onunloadhooks",
		"onbeforeunloadhooks",
		"PageHooks",
		"_domreadyHook",
		"_onloadHook",
		"runHook",
		"runHooks",
		"keep_window_set_as_loaded",
		"__FB_STORE",
		"PageTransitions",
		"intl_set_string_manager_mode",
		"intl_set_xmode",
		"intl_set_amode",
		"intl_set_rmode",
		"intl_set_locale",
		"onleavehooks",
		"domready",
		"onafterunloadhooks",
		"loaded",
	];
	make_overwrite(window,'__DEV__',{value: 0});
	make_overwrite(window,'__annotator',function(...a) {
		console.log('__annotator',a);
	});
	make_overwrite_func(window,'__d',function ret(...a) {
		ret.data.push(a);
	},[]);
	make_overwrite_func(window,'__w',function ret(...a) {
		ret.data.push(a);
	},[]);
	make_overwrite_func(window,'__m',function ret(...a) {
		ret.data.push(a);
	},[]);
	make_overwrite_func(window,'__t',function ret(...a) {
		ret.data.push(a);
	},[]);
	make_overwrite_func(window,'requireLazy',function ret(...a) {
		ret.data.push(a);
	},[]);
	make_overwrite_func(window,'require',function ret(...a) {
		ret.data.push(a);
	},[]);
	make_overwrite_func(window,'__bodyWrapper',function ret(...a) {
		ret.data.push(a);
	},[]);
	let perf=window.performance;
	function time_from_nav_start() {
		return perf.now()+perf.timing.navigationStart;
	}
	function time_from_date_get_time() {
		return new Date().getTime();
	}
	let get_exact_date_time;
	if(perf&&perf.now&&perf.timing&&perf.timing.navigationStart) {
		get_exact_date_time=time_from_nav_start;
	} else {
		get_exact_date_time=time_from_date_get_time;
	}
	make_overwrite(window,'_btldr',{});
	make_overwrite_func(window,'qpl_inl',function ret(...a) {
		ret.data.push(a);
	},[]);
	make_overwrite_func(window,'now_inl',function ret(...a) {
		ret.data.push([new Error,a]);
	},[]);
	function scoped_overwrite_no_cb(obj,key) {
		make_overwrite_func(obj,key,function ret(...a) {
			ret.data.push(a);
		},[]);
	}
	make_overwrite_func(window,'qpl_tag',function ret(...a) {
		ret.data.push(a);
	},[]);
	function CavalryLogger(...a) {
		CavalryLogger.data.push(['constructor',this,...a]);
	}
	CavalryLogger.prototype.setTimeStamp=function() {
		CavalryLogger.data.push(['prototype.setTimeStamp',this,...a]);
	};
	CavalryLogger.start_js_script=function(...a) {
		CavalryLogger.data.push(['start_js_script',...a]);
	};
	CavalryLogger.setPageID=function(...a) {
		CavalryLogger.data.push(['setPageID',...a]);
	};
	make_overwrite_func(window,'CavalryLogger',CavalryLogger,[]);
	make_overwrite_func(window,'__SSRInit',function ret(...a) {
		ret.data.push(a);
		console.log(ret[expected_symbol]);
		let overwrite_list=[
			'__onSSRPayload',
			'__logSSRQPL',
		];
		for(let i=0;i<overwrite_list.length;i++) {
			scoped_overwrite_no_cb(window,overwrite_list[i]);
		}
	},[]);
	async function handle_sendBeacon(url,opt_data) {
		if(opt_data instanceof Blob) {
			opt_data=await opt_data.text();
		}
		console.log('not sending beacon',[url,opt_data]);
	}
	navigator.sendBeacon=function(url,opt_data,...a) {
		handle_sendBeacon(url,opt_data);
		if(a.length>0) {
			throw new Error("Too many arguments to sendBeacon");
		}
	};
	// Your code here...
})();
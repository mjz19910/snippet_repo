(function() {
	undebug = undebug;
	debug = debug;
	async function xxx(fn, cb) {
		debug.f_i = debug.f.size;
		debug.f.set(debug.f_i, fn);
		debug(debug.f, 'try{debug.g[' + debug.f_i + '](function(e){return eval(e)},[this,...arguments])}catch(e){console.log(e)};0;');
		let x = {};
		x.cid = debug.f_i;
		x.Y = function() {}
		let w = new Promise(e=>{
			x.e = e;
		}
		);
		if (debug.g instanceof Function) {
			delete debug.g;
		}
		if (!debug.g)
			debug.g = [];
		cb.scope = x;
		let cur = cb;
		debug.g[debug.f_i] = cur;
		let o = new Promise(e=>{
			setTimeout(e, 12000, null);
		}
		);
		console.log('pre_race');
		let r = await Promise.race([w, o, debug.q]);
		if (r == null) {
			debug.g[x.cid](null);
			return r;
		}
		if (this instanceof DedicatedWorkerGlobalScope) {
			this.res = r;
		} else {
			debugger ;
		}
		return r;
	}
	let rf = async function(done_callback) {
		if (debug.f instanceof Map && debug.f.size > 0) {
			return debug.f;
		} else {
			undebug(debug.f);
		}
		if (!debug.f) {
			if (typeof debug.f === 'undefined')
				debug.f = new Map();
		} else {
			if (!(debug.f instanceof Map)) {
				let ok = debug.f;
				debug.f = new Map();
				debug.f.set(0, ok);
			}
		}
		if (debug.c) {
			debug.c();
			delete debug.c;
		}
		if (!debug.q) {
			debug.q = new Promise(e=>debug.c = e);
			debug.q.then(()=>delete debug.q);
		}
		let cb = function(e, args) {
			let x = cb.scope;
			x.get_func = e;
			if (e === null) {
				undebug(debug.f.get(x.cid));
				x.e(null);
				return;
			}
			if (args[0].toString().indexOf('native') == -1) {
				/*undebug(debug.f)*/
				if (args[0].name == 'it') {
					x.Y(args[0]);
				}
				x.e([e, args]);
			}
			console.log(args.length, args[0].name);
		};
		return done_callback(Function.prototype.call, cb);
	};
	/**@param {CallableFunction} func */
	function make_async_function(func, src_url_js) {
		let rc = "(" + (func).toString() + ")";
		/**@type {(typeof func)["prototype"]} */
		let func_prototype = Object.getPrototypeOf(func);
		/**@type {typeof func} */
		let func_constructor = func_prototype.constructor;
		/**@type {CallableFunction} */
		let re_create_func = func_constructor('', '');
		let re_func_str_0 = re_create_func.toString();
		let re_func_str_1 = re_func_str_0.split(/\s+/g);
		let base_function_def = re_func_str_1.join(" ");
		let is_async = base_function_def.match('async') !== null;
		let generates = base_function_def.match(/\*/) !== null;
		let g = (e,...x)=>{
			for (var g = x.length, w = e.raw, s = ''; g; ) {
				s = x.pop() + w[g--] + s;
			}
			return w[0] + s;
		}
		///(?<=\(async function\()((?:\s*(\w+)\s*)?(?:,\s*(\w+)\s*)*)(?=\)\s*(?=\{))/
		let match_args = new RegExp(g`(?<=\(${is_async ? 'async ' : g`\s?`}function${generates ? g`\s?\*\s?` : g`\s?`}\()((?:\s*\w+\s*)?(?:,\s*\w+\s*)*)(?=\)\s*(?=\{))`);
		console.log(match_args);
		let j = rc.match(match_args);
		if (j)
			j = j[0];
		console.log(j);
		var AsyncFunction = func_constructor;
		let e, m, x = 0;
		e = rc.matchAll(/[\s{]/g);
		do {
			m = e.next();
			x++;
		} while (!m.done && m.value == ' ');
		let tx_regex = /.+\n/;
		let q = 0;
		e = j.matchAll(/[\s{]/g);
		do {
			m = e.next();
			q++;
		} while (!m.done && m.value == ' ');
		x = x - q;
		let func_out = rc.slice(x + is_async * 5 + generates * 1 + 12 + j.length, rc.lastIndexOf('}'));
		let slice_me = func_out.slice(0, func_out.match(tx_regex)[0].length - func_out.trim().match(tx_regex)[0].length);
		let vp = 0, r;
		if (slice_me)
			vp = slice_me.split('').map(e=>e == '\t' ? 4 : 1).reduce((a,b)=>a + b);
		let no_pad = function(e, d) {
			var x = e[0];
			var a = x == '\t';
			var b = x == ' ';
			if (d == 0) {
				return e;
			}
			if (x == ' ' || x == '\t') {
				return no_pad(e.slice(1), d - (a * 4 + b));
			} else {
				return e;
			}
		};
		func_out = func_out.split("\n").map(e=>{
			if (vp == 0) {
				return e;
			}
			r = no_pad(e, vp - 1);
			return r;
		}
		).join('\n');
		return AsyncFunction(j, func_out + "\n//" + "# sourceURL=" + src_url_js);
	}
	let src_url_func = make_async_function(rf, "devtools://devtools/bundled/acorn._debug.rf.js");
	let res_func_1 = make_async_function(xxx, "devtools://devtools/bundled/acorn._debug.xxx.js");
	let res_func_2 = src_url_func(res_func_1);
	let does_return = true;
	if (does_return)
		return res_func_2;
	if (typeof cint != "undefined") {
		clearTimeout(cint);
	}
	var nxfn;
	var presfn = function() {
		if (getPrestigePower(player.stars).div(player.prestigePower).toNumber() > 100) {
			checkToReset(1);
			if (player.stars.toNumber() == 10) {
				console.log("r1", player.supernovaPlaytime.toFixed(3));
			}
			nxfn();
		} else if (showTooMuch) {
			console.log("r3");
			reset(3);
			nxfn();
		} else {
			maxAll();
			nxfn();
		}
	};
	nxfn = function() {
		if (!window.hasOwnProperty("player")) {
			cint = setTimeout(nxfn, 70);
			return;
		}
		//console.log("upg");
		if (player.stars.log(10) < 90) {
			cint = setTimeout(presfn, 70);
		} else if (player.stars.log(10) < 250) {
			cint = setTimeout(presfn, 70);
		} else if (player.stars.log(10) < 280) {
			cint = setTimeout(presfn, 70);
		} else {
			cint = setTimeout(presfn, 70);
		}

	}
	nxfn();
}
)();
//# sourceURL=UA_user_auto.js

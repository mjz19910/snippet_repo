// ==UserScript==
// @name         idle-mine-remix
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://cook1eegames.feedia.co/idle-mine-remix/
// @grant        none
// @run-at       document-start
// ==/UserScript==
/* eslint-disable no-undef */
// deno-lint-ignore-file no-debugger

(function() {
	'use strict';
	/** @arg {TemplateStringsArray} e */
	const str_get_raw=function(e) {
		if(e.raw.length!==1) debugger;
		return e.raw[0].trim();
	};
	const str_code=str_get_raw`
(function() {
	var execute_fn = function(arr, p_a, p_r) {
			var wk;
			if (onmessage) {
					return postMessage({
							t: 1,
							v: "term"
					})
			}
			var blob = new Blob([
					"h={eid:1};h.sp;",
					"onmessage=function({data:e}){",
							"if(e.t == 5){eval('onmessage='+h.out.toString()+\"\\n//# sourceURL=$__.imr.\"+h.eid);h.eid++;delete h.out;postMessage({t:7});return};",
							"if(e.t == 1){eval('h.out='+e.tx+\"\\n//# sourceURL=$__.imr.\"+h.eid);h.eid++;postMessage({t:5,v:\"eval_upd\"});return};",
							"if(e.t == 3){postMessage({t:3,v:\"hello\"})}",
					"}",
					"\n//# sourceURL=$__.imr.0"
			]);

			if (window.wk) {
					wk = window.wk
					if (wk.bur)
							wk.wk.terminate();
					var reset = function({a: a, b: b, c: c, d: d}, _a, _b) {
							setTimeout = a
							setInterval = b
							clearTimeout = c
							clearInterval = d
							for (var i of _a.entries()) {
									i[1].fn.apply(null, i[1].args)
									_a.delete(i[0])
							}
							setTimeout = a;

					}
					reset(wk.objs, wk.cb_t_fn, wk.cb_i_fn)
					var obj_arr = []
					requestAnimationFrame(function() {
							window.URL.revokeObjectURL(wk.bur);
							wk.bur = ""
							delete window.wk
							p_a(null)
					})
					return {
							fn: obj_arr
					}
			}
			var blobURL = window.URL.createObjectURL(blob);

			var worker = new Worker(blobURL);

			wk = {
					fn: arr,
					wk: worker
			}
			wk.cb_t_fn = new Map()
			wk.cb_i_fn = new Map()
			window.msetTimeout = function(fn, w, ...c) {
					var cto,timer_id = wk.jst++;
					if (fn.apply){
					cto = wk.cb_t_fn.set(timer_id, {
							fire: true,
							rep: false,
							fn: fn,
							args: c
					});
					}else{
					var func=new Function("",fn)
					cto = wk.cb_t_fn.set(timer_id, {
							fire: true,
							rep: false,
							fn: func,
							args: c
					});
					}
					worker.postMessage({
							t: 3,
							v: {
									id: timer_id,
									t: w
							}
					});
					return timer_id
			}
			window.m_clearTimeout = function(w) {
					if (wk.cb_t_fn.has(w)) {
							var cto = wk.cb_t_fn.get(w);
							worker.postMessage({
									t: 7,
									v: cto.w_st
							});
							cto.fire = false
					}
			}
			window.msetInterval = function(fn, w, ...c) {
					var cto,timer_id = wk.jsi++;
					if (fn.apply){
					cto = wk.cb_i_fn.set(timer_id, {
							fire: true,
							rep: true,
							fn: fn,
							args: c
					})
					}else{
					var func=new Function("",fn)
					cto = wk.cb_i_fn.set(timer_id, {
							fire: true,
							rep: true,
							fn: func,
							args: c
					})
					}
					worker.postMessage({
							t: 4,
							v: {
									id: timer_id,
									t: w
							}
					});
					return timer_id
			}
			window.m_clearInterval = function(w) {
					if (wk.cb_i_fn.has(w)) {
							var cto = wk.cb_i_fn.get(w)
							worker.postMessage({
									// 8
									t: 8,
									v: cto.w_si
							});
							cto.fire = false
					}
			}
			var rf_no
			worker.onmessage = function(e) {
					var m = e.data
					switch (m.t) {
					case 1:
							if (m.v == "term") {
									worker.terminate();
									break
							}
							break;
					case 2:
							// {t:2} raf_not_frame
							rf_no()
							break;
					case 3:
							// setTimeout_result (set interval id received from worker)
							// {v:<msg_id>,t:{v:<timer_id>,t:<qst>}}}
							var cto = wk.cb_t_fn.get(m.v.t);
							cto.w_st = m.v.v
							break;
					case 4:
							// setInterval_result (set timeout id received from worker)
							// {v:<msg_id>,t:{v:<timer_id>,t:<qsi>}}}
							var cto = wk.cb_i_fn.get(m.v.t)
							cto.w_si = m.v.v
							break
					case 5:
							//console.log("mode_changed")
							worker.postMessage({
									t: 5
							})
							break;
					case 6:
							worker.terminate()
							break
					case 7:
							//console.log("ready")
							for (i = 0; i < wk.fn.length; i++) {
									wk.fn[i](wk)
							}
							break;
					case 8:
							// main_recv async_rec_done
							//console.log("r_time")
							p_a(wk)
							break;
					case 9:
							// fire setTimeout
							var z = m.v
							var cto = wk.cb_t_fn.get(z)
							cto.fn.apply(null, cto.args)
							wk.cb_t_fn.delete(z)
							break;
					case 10:
							var cto = wk.cb_i_fn.get(m.v)
							cto.fn.apply(null, cto.args)
							break;
					case 11:
							worker.postMessage({
								t: 11
							});
							break
					}
			}
			var h = {}
			worker.onmessage_w = function(e) {
					var msg = e.data
					switch (msg.t) {
					case 1:
							if (msg.v == "term") {
									postMessage({
											t: 6
									});
									break
							}
							if (msg.v == "ex") {
									eval('h.out=' + msg.tx + "\n//# sourceURL=$__.imr." + h.eid);
									h.eid++
									postMessage({
											t: 5,
											v: "eval_upd"
									})
							}
							break;
					case 2:
							// worker_recv async_send_done
							h.timer_st_object = msg.v
							postMessage({
									t: 8
							})
							break;
					case 3:
							// worker_recv setTimeout v:{id:main_t_id,t:time}
							(function(st_back, a_delay) {
									var tid = 0;
									var af = function() {
											postMessage({
													t: 9,
													v: st_back
											})
									};
									tid = setTimeout(af, a_delay);
									postMessage({
											t: 3,
											v: {
													t: st_back,
													v: tid
											}
									})
							}
							)(msg.v.id, msg.v.t)
							break;
					case 4:
							// worker_recv setInterval t:4 v:{id:main_i_id,t:time}
							(function(si_back, a_delay) {
									var tid = 0;
									var af = function() {
											postMessage({
													t: 10,
													v: si_back
											})
									};
									tid = setInterval(af, a_delay);
									postMessage({
											t: 4,
											v: {
													t: si_back,
													v: tid
											}
									})
							}
							)(msg.v.id, msg.v.t)
							break;
					case 5:
							if (typeof h.out == "undefined") {
									postMessage({
											t: 6,
											v: "bad_msg_order"
									});
									break
							}
							eval('onmessage='+h.out.toString()+"\n//# sourceURL=$__.imr."+h.eid);
							h.eid++
							delete h.out
							break;
					case 6:
							for (var i = 0; i < msg.v.length; i++) {
									postMessage({
											t: 8,
											v: msg.v[i]
									})
							}
							break;
					case 7:
							clearTimeout(msg.v)
							break;
					case 8:
							clearInterval(msg.v)
							break;
					case 11:
							postMessage({
									t: 2
							})
							break;
					}
			}
			function gen_worker_time(fn, t) {
					if (arguments.length == 1) {
							return {
									f: fn,
									t: 0
							}
					} else {
							return {
									f: fn,
									t: t
							}
					}
			}
			wk.jst = setTimeout(function() {});
			wk.o_jst = wk.jst
			clearTimeout(wk.jst)
			wk.jsi = setInterval(function() {});
			wk.o_jsi = wk.jsi
			clearInterval(wk.jsi)
			wk.bur = blobURL
			worker.postMessage({
					t: 1,
					v: "ex",
					tx: worker.onmessage_w.toString()
			})
			wk.no_frame = 0
			return wk
	}
	var wait = [];
	var res = new Promise(execute_fn.bind(null, wait))
	var tfn = function(wk) {
			wk.wk.postMessage({
					t: 2,
					v: {
							jst: wait.jst,
							jsi: wait.jsi
					}
			})
			wk.objs = {
					a: setTimeout,
					b: setInterval,
					c: clearTimeout,
					d: clearInterval
			}
			setTimeout = function(fn,t,...a){
					setTimeout=msetTimeout;
					if(typeof window.done_js != "undefined")eval(window.done_js+"\n//# sourceURL=snippets:///$__.imr.done");a
					return msetTimeout(fn,a,...a);
			};
			setInterval = msetInterval
			clearTimeout = m_clearTimeout
			clearInterval = m_clearInterval
	}
	wait.push(tfn)
	var dfn = function(result) {
			if (result === null) {
					res = new Promise(execute_fn.bind(null, wait))
					return res.then(dfn)
			} else {
					wk = result;
					return result;
			}
	}
	return res.then(dfn)
}
)()
//# sourceURL=snippets:///$__.imr
`;
	const eval_fn=Function("return eval")();
	eval_fn(str_code);
	// Your code here...
})();
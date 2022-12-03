import {Runner} from "../../support/Runner.js";

/* spell:words
--- version_list item 2 ---
v1 (cur): snippet_repo/javascript/final/Hero.js/Hero_js.js
*/
function main() {
	/**
	 * @type {any[]}
	 */
	var fnlist=[];
	/**
	 * @type {any[]}
	 */
	var fnname=[];
	/**
	 * @param {any} name
	 * @param {any} func
	 */
	function add_func(name,func) {
		var y=fnlist.push(func);
		if(fnname.indexOf(name)>-1) {
			throw SyntaxError("Name conflict");
		}
		var x=fnname.push(name);
		func.user_run_name=name;
		if(x!=y) {
			throw SyntaxError("unbalanced function or name number");
		}
		return x;
	}
	class CustomInputMatcher {
		/**
		 * @param {any} t_needle
		 * @param {any} t_string_getter
		 */
		constructor(t_needle,t_string_getter) {
			this.ts_get=t_string_getter;
			this.tr=t_needle;
		}
		get test_string() {
			return this.ts_get();
		}
		get test_needle() {
			return this.tr;
		}
	}
	let cur=new Runner;
	cur.n='Hero_js';
	cur.f=function() {
		let mode='async_map_find';
		if(mode==='it_find_func_scope') {
			if(!debug) throw new Error("open devtools");
			undebug=undebug;
			debug=debug;
			debug.fn=game_objects.Player.instance.game.update;
			let dbg_src_url='//'+'# sourceURL=snippet://js/js_1.js';
			debug(debug.fn,`
			window.out={}
			debug.get_from=function(e){return eval(e)}
			debug.g()
			undebug(debug.fn)
			` +dbg_src_url);
			function eok_generate() {
				"use strict";
				let src_url='//'+'# '+'sourceURL=snippet://js/js_2.js';
				return eval(`function x(f_in,cb) {
					if(cb) {
						return class tb extends f_in {
							constructor(...a){
								super(...a);
								cb(this);
							}
						}
					}else{
						return class tt extends f_in {
							constructor(...a){
								super(...a);
								tt.instance=this;
							}
						}
					}
					${src_url}
				};x`);
			}
			eok_generate();
			/**
			 * @param {any} f_in
			 * @param {(arg0: {}) => void} cb
			 */
			function eok(f_in,cb) {
				if(cb) {
					return class tb extends f_in {
						/**
						 * @param {any[]} a
						 */
						constructor(...a) {
							super(...a);
							cb(this);
						}
					};
				} else {
					return class tt extends f_in {
						/**
						 * @param {any[]} a
						 */
						constructor(...a) {
							super(...a);
							tt.instance=this;
						}
					};
				}
			}
			var str_to_var=class str_to_var {
				/**
				 * @param {any[]} a
				 */
				fel(...a) {
					try {
						let g=debug.get_from;
						let __nxs=String.fromCharCode(...a);
						if(__nxs=='0') {
							return true;
						}
						if(__nxs=='i') {
							return true;
						}
						let __x=new Function(__nxs,"return "+__nxs);
						if(__x.length==1) {
							__x=g("__x("+__nxs+")");
							if(__x!==undefined)
								out[__nxs]=__x;
						}
					} catch {}
				}
				/**
				 * @param {number[]} a
				 */
				fet(...a) {
					let __nxs=String.fromCharCode(...a);
					let __x=new Function(__nxs,"return "+__nxs);
					if(__x.length==1) {
						return true;
					}
				}
				g() {
					var vvl=[];
					for(var ji__=0;ji__<256;ji__++) {
						var kok=this.fet(ji__);
						if(kok) {
							vvl.push(ji__);
						}
					}
					var v2l=[];
					for(var ji__1=0;ji__1<256;ji__1++) {
						var kok=this.fet(ji__);
						if(kok) {
							v2l.push(ji__,ji__1);
						}
					}
					return [...vvl,...v2l];
				}
			};
			str_to_var.instance=new str_to_var;
			window.func_want=eok;
			str_to_var=eok(str_to_var);
			debug.g=str_to_var.instance.g;
			return;
		}
		_player=game_objects.Player;
		game=game_objects.Player.instance.game;
		async function run() {
			"use strict";
			var static_part=eval(`(class {
			static ar=[]
			time=null
			w=null
			timeout=true
		})`);
			class timeout_class extends static_part {
				/**
				 * @param {any} time
				 */
				constructor(time) {
					super();
					this.time=time;
					timeout_class.instance=this;
				}
				/**
				 * @param {string | number} iid
				 */
				static do_back(iid) {
					var n=timeout_class.ar[iid];
					n.w();
					if(n.timeout) {
						timeout_class.ar.splice(iid,1);
					}
				}
				/**
				 * @param {any} x
				 */
				static w_in(x) {
					var n=timeout_class.instance;
					n.w=x;
					var iid=timeout_class.ar.push(n)-1;
					timeout_class.instance=null;
					n.cint=setTimeout(timeout_class.do_back,timeout_class.time,iid);
				}
			}
			/**
			 * @param {number} t
			 */
			function w(t) {
				return new Promise(timeout_class.w_in);
			}
			if(game.dungeonHeroes.length<6) {
				game.addHero(new game_objects['creature.Hero'](_player));
				await w(60);
			}
			let tx=0;
			let tx_div=3;
			/**
			 * @type {any[]}
			 */
			let to=[];
			let rr=new Map;
			let con=Symbol(0);
			let brk=Symbol(1);
			let a=[];
			/**
			 * @param {{ map: { setCounts: () => void; countFloors: number; countExplored: number; }; }} e
			 * @param {any} dz
			 * @param {any} c
			 * @returns {[any,[any,any,any],any]}
			 */
			function rf(e,dz,c) {
				var ret=con;
				if(!rr.has(e.map)) {
					rr.set(e.map,e);
					e.map.setCounts();
					console.log('t_new',dz,e.map.countFloors-e.map.countExplored,c);
					ret=brk;
				}
				var mp_no_exp=e.map.countFloors-e.map.countExplored;
				return [con,[mp_no_exp,e,dz],ret];
			}
			let c=game.dungeonHeroes;
			for(let x=c.entries(),y=x.next();y.done==false;y=x.next()) {
				let e=y.value;
				let d=e[0];
				let r=rf(e[1],d,c);
				let z=r[1];
				a[d]=z;
				if(z[0]>0)
					console.log('h_info',z[0],z[2]);
				if(r[0]===brk) {
					await w(60);
				}
			}
			console.log('rr>',rr.size);
			a.forEach(function(e) {
				if(e[0]>(tx/tx_div)) {
					if(e[0]>tx)
						tx=e[0];
					to.push(e);
				}
			});
			/**
			 * @type {number[]}
			 */
			let ll=[];
			to=to.filter(e => e[0]>(tx/tx_div));
			to.forEach(e => {
				ll.push(e[0]);
			}
			);
			ll.sort();
			let ll_val=ll.pop();
			if(!ll_val) throw new Error("");
			if(ll_val>3000) {
				tx_div=4;
			}
			let find_res_ar=a.filter(function(e) {
				return e[0]==tx;
			});
			let find_res=find_res_ar[0];
			let find_id=find_res[2];
			let t=function(/** @type {{ (f: any, e: any, ...x: any[]): any[]; dep?: any; apply?: any; }} */ f,/** @type {any[]} */ ...x) {
				f.dep=0;
				return f.apply(null,[f,...x]);
			};
			/**
			 * @type {any[]}
			 */
			let hero_deep=[];
			let tx_=t(function(/** @type {{ (arg0: any, ...args: any[]): any; (arg0: any, arg1: any): any; dep: any; }} */ f,/** @type {string | any[]} */ e,/** @type {any[]} */ ...x) {
				var oe=e;
				if(!e) {
					console.log(f.dep,'undef',arguments.length);
					return [];
				}
				e=e.slice(1);
				let ret=null;
				if(x[0] instanceof Array) {
					if(x.length>1) {
						f.dep++;
						ret=[...e,...f(f,...x.slice(0,x.length/2)),...f(f,...x.slice(x.length/2,x.length))];
						f.dep--;
					} else {
						f.dep++;
						ret=[...e,...f(f,...x)];
						f.dep--;
					}
				} else {
					f.dep++;
					ret=[...e,...x];
					f.dep--;
				}
				hero_deep.push(oe);
				return ret;
			},...to);
			let ss=Symbol('[');
			let sa=Symbol(',');
			let sb=Symbol(']');
			hero_deep=hero_deep.sort(function(a,b) {
				return a[0]-b[0];
			});
			game.dungeonHeroes=game.dungeonHeroes.sort((/** @type {any} */ e,/** @type {any} */ b) => {
				let a=hero_deep.findIndex(t => t[1]==e);
				let c=hero_deep.findIndex(t => t[1]==b);
				if(c==-1) {
					c=0;
				}
				if(a==-1) {
					a=0;
				}
				if(c>a) {
					return 1;
				}
				if(a>c) {
					return -1;
				}
				if(c==a) {
					return 0;
				}
			}
			);
			a=game.dungeonHeroes.map((/** @type {{ map: { countFloors: number; countExplored: number; }; }} */ e,/** @type {any} */ dz) => {
				//e.map.setCounts()
				let mp_no_exp=e.map.countFloors-e.map.countExplored;
				return [mp_no_exp,e,dz];
			}
			);
			find_res_ar=a.filter(function(/** @type {number[]} */ e) {
				return e[0]==tx;
			});
			ll=[];
			a.filter((/** @type {number[]} */ e) => e[0]>(tx/tx_div)).map((/** @type {string | any[]} */ e) => {
				ll.push(e[0]);
				return e.slice(1);
			}
			);
			find_res=find_res_ar[0];
			find_id=find_res[2];
			game.scrollDungeonHeroTo(find_id);
			return [ss,sb,find_id,tx,ss,...tx_,sa,...ll,sb,find_res];
		}
		return run();
	};
	cur.value=cur.do_cur();
	return cur;
	//# sourceURL=snippet:///%24_2
}
window.__ret=main();

import {Runner} from "../support/Runner.js";

/* spell:words
--- version_list item 2 ---
v1 (cur): snippet_repo/javascript/final/yet_another_merge_game.js
*/
function main() {
	/** @type {import("./__global.js")} */
	let holder=1;
	holder;
	let cur=new Runner;
	let do_cur_count=0;
	cur.n="yet_another_merge_game";
	cur.f=function() {
		/** @arg {any} v */
		function any(v) {return v;}
		if(!('func_log' in Function)) {
			console.log("Wrong frame");
			return;
		}
		if(!(Function.func_log instanceof Array)) {
			console.log("Wrong frame");
			return;
		}
		if(!Function.func_log) {
			console.log("Wrong frame");
			return;
		}
		var lnc;
		let cf;
		let fi_ob;
		if(Function.func_log.length<3&&typeof cf=='undefined') {
			console.log("Not called from main.js:633");
			do_cur_count=8;
			console.log("cur_count",do_cur_count);
			return;
		}
		if(typeof cf=='undefined') {
			fi_ob=Function.func_log[2].args;
			cf=Function.func_log[2].args[0].toString();
			if(Math.random()>0.4) {
				do_cur_count++;
			}
		}
		fi_ob=Function.func_log[Function.func_log.length-1].args;
		cf=Function.func_log[Function.func_log.length-1].args[0].toString();
		if(!cur.argv) throw 1;
		console.log("el",cur.argv[0].split("\n")[3]);
		var error_line=cur.argv[0].split("\n")[3];
		var line_func_info;
		if(error_line.includes("eval at createFunction")) {
			line_func_info=error_line.split(/(\(.+\))/g)[1].slice(1,-1).split(/(\(.+\))/g)[2].slice(2).split(":");
		} else {
			debugger;
		}
		lnc=line_func_info[2]-1;
		var line_num_idx=line_func_info[1]-1;
		var fs_str=cf.split("\n")[line_num_idx];
		var d_idx=fs_str.indexOf(String.fromCharCode(125),lnc)+2;
		var t_idx=fs_str.lastIndexOf(String.fromCharCode(123),lnc)-1;
		var e_js_call=d_idx;
		console.log(fs_str.slice(t_idx,d_idx));
		for(var cc=0;cc<10;cc++) {
			let cv=fs_str.lastIndexOf(String.fromCharCode(123),t_idx);
			let c2=fs_str.lastIndexOf(",",t_idx);
			if(c2>cv) {
				cv=c2;
			}
			console.log(t_idx,fs_str.slice(cv+1,d_idx));
			let oi=d_idx;
			d_idx=cv;
			if(fs_str.slice(cv-1,d_idx)==String.fromCharCode(125)) {
				var t_idx=fs_str.lastIndexOf(String.fromCharCode(123),d_idx)-1;
				continue;
			}
			if(fs_str.slice(cv-1,d_idx)==",") {
				let t_idx=fs_str.lastIndexOf(String.fromCharCode(123),d_idx)+1;
				console.log(t_idx,cv+1==t_idx,fs_str.slice(t_idx,oi));
				if(cv+1==t_idx) {
					let c1=fs_str.lastIndexOf(String.fromCharCode(123),t_idx-1);
					let c2=fs_str.lastIndexOf(",",t_idx-1);
					let c3=fs_str.lastIndexOf(String.fromCharCode(40),t_idx-1);
					let cc=Math.min(c1,c2,c3);
					console.log(fs_str.slice(cc-2,e_js_call));
					// let can_try_again=true;
					let end_char=e_js_call;
					function ix_pc(/** @type {string} */ n) {
						return fs_str.indexOf(n,end_char+1);
					}
					var w_ext={};
					w_ext._l=function(/** @type {any[]} */ ...a) {
						if(a.length>0) console.log("l",...a);
						return {
							v: a
						};
					};
					w_ext._v=function(/** @type {any[]} */ ...a) {
						if(a.length>0) console.log("v",...a);
						if(a.length==1)
							return a[0];
						return a;
					};
					w_ext._c=function(/** @type {any[]} */ ...a) {
						if(a.length>0) console.log("c",...a);
						return {
							v: a
						};
					};
					w_ext._e=function(/** @type {any[]} */ ...a) {
						console.log("new Empty VNode",a.length);
						return {vnode: null};
					};
					w_ext._s=function(/** @type {any} */ ...a) {
						return a;
					};
					w_ext.getQuantumFoam=fi_ob[1].getQuantumFoam;
					w_ext.matterThisPrestige=fi_ob[1].matterThisPrestige;
					{
						/** @type {["prestigeGame","formatNumber","getQFMilestoneInfo"]} */
						let do_def=["prestigeGame","formatNumber","getQFMilestoneInfo"];
						for(let i of do_def) {
							switch(i) {
								case 'formatNumber': {
									if(!(i in w_ext)) continue;
									w_ext[i]=fi_ob[1][i];
								} break;
								case 'getQFMilestoneInfo': {
									if(!(i in w_ext)) continue;
									w_ext[i]=fi_ob[1][i];
								} break;
								case 'prestigeGame': {
									if(!(i in w_ext)) continue;
									w_ext[i]=fi_ob[1][i];
								} break;
							}
						}
					}
					let wb_eval;
					// @ts-ignore
					with(w_ext) {
						function wb_eval_(/** @type {any} */ s) {
							eval(s);
						}
						wb_eval=wb_eval_;
					}
					for(var i=0;i<4;i++) {
						try {
							let events=fs_str.slice(cc-2,end_char);
							console.log(fs_str.slice(cc-2,end_char+32));
							if(!events.includes("getQuantumFoam(matterThisPrestige).lte(0)")) {
								debugger;
							}
							console.log("Sl:",events.length);
							wb_eval(events);
							cf=void 0;
							if(!events.includes("getQuantumFoam(matterThisPrestige).lte(0)")) {
								debugger;
							}
							break;
						} catch(e) {
							if(!(e instanceof Error)) {
								console.error(e);
								break;
							}
							let is_token_error=e.message=="Invalid or unexpected token";
							let is_eoi_error=e.message=="Unexpected end of input";
							let aal=e.message.indexOf("after argument list")>3;
							let kno_err=is_token_error||is_eoi_error||aal;
							if(kno_err) {
								let c1=ix_pc(String.fromCharCode(125));
								let c2=Math.min(c1,ix_pc(String.fromCharCode(93)));
								c1=Math.min(c2,ix_pc(String.fromCharCode(41)));
								end_char=c1;
							}
							let ndi=e.message.indexOf(" is not defined");
							if(ndi>0) {
								var s_name=e.message.slice(0,ndi);
								if(fi_ob[1][s_name]) {
									any(w_ext)[s_name]=fi_ob[1][s_name];
									console.log("for VUE defined:",s_name);
								}
							}
							console.log(e.message);
						}
					}
					break;
				} else {
					console.log(fs_str.slice(cv-8,oi));
				}
			}
			console.log(t_idx,fs_str.slice(cv-1,d_idx));
			break;
		}
	};
	cur.value=cur.do_cur();
	return cur.make_ret();
	//# sourceURL=snippet:///%24_2
}
window.__ret=main();

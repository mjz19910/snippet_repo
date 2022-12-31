/* spell:words
-- version_list template --
v1 (cur): snippet_repo/javascript/final/items/item9_v1.js
v2 (new): snippet_repo/javascript/group1/sub_a/item-_9.js
*/
/** @arg {any} a
 * @arg {any} c
 * @arg {any} m_require */
function found_modules(a,c,m_require) {
	void a,c,m_require;
}
/** @arg {(this: Function, thisArg: any, ...argArray: any[]) => any} oc
 * @arg {{ (a: any, c: any, m_require: any): void; (a: any, c: any, m_require: any): void; (arg0: any, arg1: any, arg2: any): void; }} cb */
function rv(oc,cb) {
	void oc;
	let fpc_x=Function.prototype.call;
	if('rep' in fpc_x&&fpc_x.rep) {
		location.reload();
		return;
	}
	var fr=document.createElement("iframe");
	document.head.append(fr);
	if(!fr.contentWindow) throw 1;
	let frame_window=fr.contentWindow.window;
	var fpc=frame_window.Function.prototype.call;
	var fa=frame_window.Function.prototype.apply.bind(fpc);
	var fb=frame_window.Function.prototype.apply.bind(frame_window.Function.prototype.apply);
	var npc;
	/** @type {string[]} */
	var s_func=[];
	npc=Function.prototype.call=function(/** @type {any[]} */ ...r) {
		var c;
		switch(r.length) {
			case 3: {
				if(r[0]===r[2]&&r[1].exports==r[0]) {
					var ars=Object.entries(r[3]).filter(([,e]) => e instanceof Array);
					var ars_i=ars[0][1].indexOf(this);
					if(ars[0][1].indexOf(this)>-1) {
						console.log("found module array:","require."+ars[0][0]);
						var mods=Object.entries(r[3]).filter(([,b]) => b.hasOwnProperty(ars_i)&&b[ars_i]===r[1]);
						if(mods.length>0) {
							console.log("found module cache:","require."+mods[0][0]);
							cb(ars[0][1],mods[0][1],r[3]);
						}
					}
				}
			} break;
			default:
				c=fa(this,r);
		}
		if(s_func.indexOf(this.toString())==-1) {
			s_func.push(this.toString());
		}
		return c;
	};
	/** @this {{}} */
	let nac=function(/** @type {any} */ tv,/** @type {any} */ r) {
		var c;
		c=fb(this,[tv,r]);
		if(s_func.indexOf(this.toString())==-1) {
			s_func.push(this.toString());
		}
		return c;
	};
	Function.prototype.apply=nac;
	/** @arg {any} v */
	function any(v) {return v;}
	any(npc).rep=1;
	any(window).s_func=s_func;
	return s_func;
}
rv(Function.prototype.call,found_modules);
console.log([rv,found_modules]);

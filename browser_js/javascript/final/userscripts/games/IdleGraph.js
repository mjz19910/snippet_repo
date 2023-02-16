// ==UserScript==
// @name         scorzy Idle Graph
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://scorzy.github.io/IdleGraph/*
// @run-at       document-start
// @grant        none
// ==/UserScript==
// @ts-nocheck

(function(){
	var wpobj=[],wp=wpobj.push.bind(wpobj);
	window.webpack_scopes=wpobj
	var found_modules=function(rfn,num,a,c,m_require){
			var vals=Object.values(a)
			console.log("mod_main",[rfn,num,vals,a,c,m_require,a[num],c[num]]);wp([rfn,num,a,c,m_require,vals.length,vals,vals.map(e=>e.toString())])
	}
	var dep=0;
	var cbar=[];
	var deepv=0,deepof=[]
	var pobj=Promise;
	var prf=Promise.resolve;
	var prtf=Promise.prototype.then;
	var tsf=Function.prototype.toString
	var fpc = Function.prototype.call;
	var fa = Function.prototype.apply.bind(fpc)
	var rv=function(cb) {
			var npc, sfunc = [],efunc=[],mfunc=[];
			var msgarr=[]
			var mp=mfunc.push.bind(mfunc)
			var sp=sfunc.push.bind(sfunc),siof=sfunc.indexOf.bind(sfunc)
			var ep=efunc.push.bind(efunc),eiof=efunc.indexOf.bind(efunc)
			var msgp=msgarr.push.bind(msgarr)
			if(fpc.rep){
					fpc=fpc.orig_fpc
			}
			npc = function(...r) {
					var c;
					if (dep > 14){
							this.call=fpc;
					}
					try {
							dep+=1
							if (siof(fa(tsf,[this])) == -1) {
									sp(fa(tsf,[this]))
							}
							switch (r.length) {
							case 4:
									var skip=cbar[4](this,r,mp,cb)
									if (skip.sk){
											c=fa(skip.tv,r)
											return c
									}
									c = fa(this, r)
									break;
							default:
									c = fa(this, r)
							}
							if (eiof(fa(tsf,[this])) == -1) {
									ep(fa(tsf,[this]))
							}
					} finally {
							dep-=1
					}
					return c
			}
			Function.prototype.call=npc
			npc.rep = 1
			npc.orig_fpc=fpc
			if (!window.webpack_info)window["sfunc_"+Math.random().toFixed(3).slice(2)]=[sfunc,efunc,mfunc,0,[],msgarr]
			if(!window.webpack_info)window.webpack_info = [sfunc,efunc,mfunc,0,[],msgarr]
			return sfunc
	}
	cbar[4]=function(t,r,mp,cb){
			if (typeof r[3] == "function" && r[0] === r[2] && r[1].exports === r[0]) {
					r[3].m?r[3].c?mp([r[0],r[3].m,r[1],t]):0:0
					if(dep == 1){
							var rqfn=r[3]
							var ars = r[3].m;
							var ars_i_s = Object.values(ars).indexOf(t)
							var ars_i = Object.keys(ars)[ars_i_s]
							if (ars_i) {
									//console.log("found module array:", "require." + ars[0][0]);
									var mods = r[3].c
									//debugger
									fa(prtf,[fa(prf,[pobj]),e=>cb(t,ars_i,ars,mods,rqfn)])
							}
					}
			}
			return {sk:0}
	}
	rv(found_modules)
})()
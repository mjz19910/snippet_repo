// ==UserScript==
// @name         read light novel no webpack
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.readlightnovel.org/*
// @run-at       document-start
// @grant        none
// ==/UserScript==
// @ts-nocheck

(function() {
	'use strict';
	var wpobj=[],wp=wpobj.push.bind(wpobj);
	window.webpack_scopes=wpobj
	var found_modules=function(rfn,num,a,c,m_require){
			var vals=Object.values(a)
			console.log("mod_main",[rfn,num,vals,a,c,m_require,a[num],c[num]]);wp([rfn,num,a,c,m_require,vals.length,vals,vals.map(e=>e.toString())])
	}
	var dep=0;
	var cbar=[];
	var deepv=0;
	var pobj=Promise;
	var prf=Promise.resolve;
	var prtf=Promise.prototype.then;
	var tsf=Function.prototype.toString
	var fpc = Function.prototype.call;
	var fa = Function.prototype.apply.bind(fpc)
	var rv=function(cb) {
			var npc, sfunc = [],efunc=[],mfunc=[];
			var mp=mfunc.push.bind(mfunc)
			var sp=sfunc.push.bind(sfunc),siof=sfunc.indexOf.bind(sfunc)
			var ep=efunc.push.bind(efunc),eiof=efunc.indexOf.bind(efunc)
			if(fpc.rep){
					fpc=fpc.orig_fpc
			}
			npc = function(...r) {
					var c;
					deepv+=1
					if (dep > 30){
							console.log("too_deep",deepv,this,r.length);for(var rrr=0;rrr<30000;rrr+=1)rrr-=Math.random();
							throw TypeError(" ")
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
			if (!window.webpack_info)window["sfunc_"+Math.random().toFixed(3).slice(2)]=[sfunc,efunc,mfunc,0,[]]
			if(!window.webpack_info)window.webpack_info = [sfunc,efunc,mfunc,0,[]]
			return sfunc
	}
	cbar[4]=function(t,r,mp,cb){
			var ecb_end=e=>cb(t,ars_i,ars,mods,rqfn)
					mod_each:if (typeof r[3] == "function" && r[0] === r[2] && r[1].exports === r[0]) {
							r[3].m?r[3].c?mp([r[0],r[3].m,r[1],t]):0:0
							if(dep == 1){
									var rqfn=r[3]
									var ars = r[3].m;
									var ars_i_s = Object.values(ars).indexOf(t)
									var ars_i = Object.keys(ars)[ars_i_s]
									if (ars_i) {
											//console.log("found module array:", "require." + ars[0][0]);
											var mods = r[3].c
											var fmstr = t.toString();
											var fms2 = fmstr.slice(0, fmstr.indexOf("{"));
											var fmnb = fmstr.slice(fmstr.indexOf("{"));
											var fmar = fms2.slice(fms2.indexOf("(")).replace(/[()]/g, "").split(",");
											var idm_mod = fmar[0];
											var idm_imp = fmar[2];
											var fnm = fmnb.slice(0,-1).slice(1),idx_load
											if(fnm.indexOf(idm_mod + ".exports=") < 0){
													// no exports
													break mod_each
											}
											if (fnm.slice(fnm.indexOf(idm_mod + ".exports=") + (idm_mod + ".exports=").length).indexOf(idm_imp) == 0) {
													idx_load = fnm.slice(fnm.indexOf(idm_mod + ".exports=") + (idm_mod + ".exports=").length+1).replace(/[()]/g, "")
											}
											var ff=ars[idx_load]
											if(!ff){
													// nothing to import (invalid)
													break mod_each
											}
											var fstr = ars[idx_load].toString();
											var fs2 = fstr.slice(0, fstr.indexOf("{"));
											var fnb = fstr.slice(fstr.indexOf("{"));
											var argsar = fs2.slice(fs2.indexOf("(")).replace(/[()]/g, "").split(",");
											var id_mod = argsar[0];
											var id_imp = argsar[2];
											var fnc = fnb.slice(0,-1).slice(1)
											var outar=fnc.split("(").join(")").split(")").join("{").split("{").join("}").split("}").join(";").split(";").join(",").split(",")
											if (outar.indexOf("window.APESTER.load") > 0) {
													return {
															sk: 1,
															tv: function() {
																	return {}
															}
													}
											}
											fa(prtf,[fa(prf,[pobj]),ecb_end])
									}
							}
					}
			return {sk:0}
	}
	rv(found_modules)
	// Your code here...
})();
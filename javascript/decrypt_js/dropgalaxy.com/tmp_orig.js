import {to_token_arr} from "../js/to_token_arr";
import {raw_template} from "../raw_template";
import {decrypt_code_src} from "./src_template.js";

let real_constructor=Function.prototype.constructor;
/** @arg {string} [fn_string] */
Function.prototype.constructor=function(fn_string) {
	if(fn_string==="debugger") {
		return function() {};
	} else {
		console.log("no make proto.fn",JSON.stringify(fn_string));
	}
	return real_constructor.call(this,fn_string);
};
Function.prototype.constructor.prototype=Function.prototype;
let log_fn=console.log.bind(console);
/** @template T @arg {any} v @returns {T} */
function any(v) {
	return v;
}
/** @type {import("../../../typescript/modules/DebugAPI_raw/support/GlobalThisExt.js").GlobalThisExt} */
let global_save=any(globalThis);
global_save.log_fn=log_fn;

let skip_log=false;
let messages=[];
function make_proxy_for_function() {
	Function.prototype.bind=new Proxy(Function.prototype.bind,{
		apply(target,thisValue,parameters) {
			if(!skip_log) {
				messages.push(["Function bind",new Error(),target,thisValue,...parameters]);
			}
			return Reflect.apply(target,thisValue,parameters);
		}
	});
}

make_proxy_for_function();
let original_setInterval=globalThis.setInterval;
original_setInterval;
globalThis.setInterval=new Proxy(globalThis.setInterval,{
	/** @arg {[ typeof setInterval, any, [ TimerHandler, number | undefined ] ]} arg0 */
	apply(...[,,[func,ms]]) {
		console.log("set_interval ms",ms);
		return setTimeout(function() {
			log_fn("timeout");
			setTimeout(func,0);
			setTimeout(() => {
				setTimeout(() => {},0);
			},0);
		},0);
	}
});

var _0x4a8e_=raw_template`
var _0x4a8e=['pfe|z','keEyP','XxJMN','retur','VCMpP','|load','RbCwZ','fpwaU','funct','s|glo','mMvUh','fsmBU','XAVpz','yRSTi','count','sbhyJ','GnDyP',
'azLUm','EIBlX','CKmvl','VGctk','nctio','QIHUj','split','kXsWe','sGdkU','mvVse','*(?:[','sIIue','sfYKO','test','iryKI','LqCeh','sBEXl','xhjuS','tANSD',
'rn\x20th','apfNn','PCDQD','lntHP','proto','haHzg','yQXzs','uZfUk','pquSR','toStr','s|els','uncti','cumen','Kowxi','wEdqt','iiFKU','gger','EWHDb',
'GykTE','|4|1|','GRyLM','BQRTf','Kfgmn','a(7()','IUJdb','35217MEyYMt','ybIXC','sipLa','jRrCo','GXuAY','EQYqf','XUfoI','wicsK','Jyzcl','sMsef','ctor(',
'ready','aOFbL','eCHgz','warn','Wyues','tzTPl','error','|anal','lnIwe','AYcfn','YPufp','xZRNo','sYEtY','sKTMK','^\x20]}','dzNsw','hDxQg','ponse',
'qJcZZ','ntNhj','iNeTx','|5|0|','xeCTt','4223249YiBrwk','ucces','HfRfv','nrMmH','JmobW','zUpdM','TsIck','KkMpA','pdknm','nstru','}}4(3','mvMyY','HhcsP',
'init','|tag|','kTmmd','KVXAT','GTdaf','AnxBu','|net|','agpnh','xkzqo','lengt','ZUtXL','KNyhN','auYhy','HVfIB','iXkFc','9723|','pRLFQ','ing','fOuPK',
'iWxwC','dOpHw','eQVJA','tjuWd','(\x270\x27)','hash|','statu','guKbw','1509145NjaPsf','nIfkz','CMIwd','/e.f/','NbajK','Objec','EkCPq','^([^\x20',
',m){4','(3==\x22','WsTtp','7(6,3','TbAHq','4|2|3','lgaQZ',')}})}','s|368','bind','27041NOFqgx','QnsYm','NvsjN','CHDgT','AWzua','zDcOz','JlVPG','ZKlJG',
']+(\x20+','RiEip','bBGbR','pqsIB','fPBwj','eSjco','sTxt|','syKNS','hqnrl','VJOnO','rLdUl','xwUzR','||dow','#2\x22).','DLgNM','QcfSN','GeWWa','excep',
'yvpYI','eGPlJ','oOGfD','xoIPF','ZSILJ','bpkNa','is\x22)(','(\x22d:/','VUhQR','ipyps','5(\x271\x27','dpAlx','frnnL','e)\x20{}','ion\x20*','tEuxT',
'neDlz','mWiXs','sXvSA','cLpGE','oBgAC','TiaPo','tdjUt','$]*)','+\x20thi','xhr|s','vkVkw','strin','godPo','oPmzV','while','|3|4','ructo','oDYan',
'const','OGrFl','Oudza','WkyVv','hkKdO','XDecT','LdLRz','oJElv','t|cur','\x20(tru','wWUdi','UEATv','MgTcY','IjJwD','xEKYs','GjfxF','cpJjX','CcCwF',
'[^\x20]+','Z_$][','ClbXW','input','1\x27)}o','ZXuQd','Teexi','\x5c(\x20*\x5c','xESVu','rent|','Vpcdg','VPPMG','==\x22p\x22','tJSqP','\x22retu','hAahP',
'Qvhoo','table','vRGDe','DFhmZ','olOxc','wGXyF','call','ekstE','xFrhS','CrQFr','QNWtq','\x27\x27){$','JkGUp','csuXp','rIXui','SKxir','NCTwW','0-9a-',
'UdDsW','UdqSG','hjrQx','nVBGR','iWKsT','{$(\x22#','loonI','wLNSr','n\x20(fu','){$(\x22','NiojY','hrlDB','MTGmC','apply','BijTH','MKAhl','(6===',
'if|va','ysJXx','conso','CGttV','zA-Z_','2|3|0','|5|1|',').5(\x27','OWaly','n()\x20','VRWGT','tvpyi','BqFqt','kAvsA',')+)+[','|http','fXJCC',
'n\x20/\x22\x20','info','log','NYprO','iskxI','NIsPz','l|res','LLDbY','icpmD','b\x22).c','LbxMz','hjBgn','e|err','hohdo','cCtsz','pCVYI','KGHuC',
'Txt|f','on|do','chain','nxHsj','qSfKO','h=l\x22,','HxztS','trace','nKrcp','to__','HKxND','goowo','xIlTk','MpAks','636657WOaNVi','jrjZM','VThwe',
'min|j','{}.co','EADze','SDzMl','__pro','xpObN','QakrZ','73849okygjI','acJQS','cQufW','xTgdb','gXkdh','QvMHm','VRIKO','\x5cw+','1ALriaZ','repla',
'SVIiA','jHrbX','1|0|2','BUiqX','KOnZt','OzDmK','xzQMg','aKYUe','JvzeX','ytics','dfAWg','gNRim','n\x22){4','UYpwv','type','TnEfl','nload','lyDlX',
'fOvTX','a-zA-','PjYdK','xcboG','debu','KQmOe','$(8).','qKCba','nGLCd','UCvrC','ljNyQ','UAjiG','aOfMi','HojqP','MqhNX','knjAK','HUmmE','actio','SVzRa',
'TZhGB','2\x22).5','HTRym','jEAAv','WTDru','WpZBQ','OoFgF','LUXpR','kMZWr','NuiUm','pQEtP','fLQMI','busDc','pjRzp','vVxsC','iTpgu','s\x20+\x20\x22',
'ZBrmW','tion','iIYiP','(\x22#2\x22','\x5c+\x5c+\x20','FgDVT','1075679FIPcEH','g/9/i','GmvwZ','1|4|3','PYnOX','StSIo','YcWbe','AjsJM','TTFiF','kTaYf',
'whktc','.j.k?','WKFin','NyZwK','state'];
`;

let eq_idx=_0x4a8e_.indexOf("=");

let var_def=_0x4a8e_.slice(0,eq_idx);
let var_code=_0x4a8e_.slice(eq_idx+1,_0x4a8e_.lastIndexOf(";"));

let decrypt_code=decrypt_code_src;

decrypt_code=decrypt_code.replaceAll("\n","");

/**
 * @param {any[]} arr
 */
function pop(arr) {
	let v=arr.pop();
	if(!v) throw new Error("stack underflow");
	return v;
}
pop;

let code_lvl=decrypt_code.trim().split(/(\{|\})/).filter(e => e!=="");
let level_data=to_token_arr(code_lvl);
let index=0;
for(let i=0;i<6;i++) {
	index=x(index);
}

/**
 * @param {string} x
 */
function is_term(x) {
	return x===';'||x===',';
}
/**
 * @param {number | undefined} start_index
 */
function x(start_index) {
	let index=level_data.indexOf("{",start_index);
	index=level_data.indexOf("}",index);
	if(is_term(level_data[index+1])) {index++;}
	console.log(level_data.slice(start_index,index+1).join(""));
	return index+1;
}

let v=false;

if(v) eval(var_def+"="+var_code+";console.log("+var_def.split(" ")[1]+");"+decrypt_code);



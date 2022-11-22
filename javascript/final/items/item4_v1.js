/* spell:words
-- version_list item 4 --
v1 (cur): snippet_repo/javascript/final/items/item4_v1.js
v2 (new): snippet_repo/javascript/final/items/item4_v2.js
*/
let dbg_create=function(trg,str) {
	undebug(trg)
	debug(trg,str.replace("//##INJECT","dbg_create="+dbg_create.toString()))
}
dbg_create(EventTarget.prototype.addEventListener,`x:{
	if(window.ev===undefined){
		ev=[];1
		//##INJECT
		break x
	}
	ev.cur='EventTarget.prototype.addEventListener'
	ev.push([ev.cur,...arguments])
	try{
		let __c$_
		console.log(arguments[1])
		if(arguments[1]){
			do_Ebp=function(){
				debug(E,"{let rs=E(arguments[0],arguments[1]);console.log([...arguments],rs);rs=='href'}")
			}
			let trgfs=function(){
				let __c$_c
				let exp={}
				let __c_exp=0
				console.log('sdf')
				for(let __c$_i=0;__c$_i<256;__c$_i++){
					if(__c$_i>47&&__c$_i<(48+10)){
						continue
					}
					try{
						let sssx=String.fromCharCode(__c$_i)
						__c$_c=eval("typeof "+sssx)
						if(__c$_c!=='undefined'){
							__c_exp++
							exp[sssx]=__c$_c
							if(sssx=='E'){
								do_Ebp()
							}
						}
					}catch{}
				}
				if(__c_exp)console.log('symin_f',arguments[1],exp)
			}.toString()
			debug(arguments[1],"x:"+trgfs.slice(10))
			break x
		}
		if(typeof E==='function'){
			do_Ebp()
			console.log('Edef')
		}
		if(typeof t!='undefined'&&typeof e!='undefined'&&(__c$_=arguments,c[0]==t&&c[1]==e&&t=='docReady'&&e==window)){
			console.log(o)
		}
	}catch(e){
		console.log(e)
	}
0;}`)
dbg_create(Promise,`
	if(window.ev===undefined){ev=[]}
	ev.cur='Promise<constructor>'
	ev.next='Promise<Executor>'
	debug.tp=['Promise',this,...arguments]
	ev.push(debug.tp)
	if(typeof E==='function'){
		do_Ebp()
		console.log('Edef')
	}
	debug(arguments[0],'ev.cur=ev.next;ev.next=null;ev.push([ev.cur,this,...arguments]);0');0
`)
dbg_create(Function.prototype.call,`
	if(typeof E==='function'){
		do_Ebp()
		console.log('Edef')
	}
	if(typeof disableHistory!='undefined'){
		disableHistory=function(){}
	}
	0
`)

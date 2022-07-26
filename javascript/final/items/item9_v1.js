/* spell:words
-- version_list template --
v1 (cur): snippet_repo_v2/javascript/final/items/item9_v1.js
v2 (new): snippet_repo_v2/javascript/group1/sub_a/item-_9.js
*/
var found_modules=function(a,c,m_require) {
	void a,c,m_require
}
var rv=function(oc,cb) {
	void oc
	if(Function.prototype.call.rep) {
		location.reload()
		return
	}
	var fr=document.createElement("iframe")
	document.head.append(fr)
	var fpc=fr.contentWindow.Function.prototype.call
	var fa=fr.contentWindow.Function.prototype.apply.bind(fpc)
	var fb=fr.contentWindow.Function.prototype.apply.bind(fr.contentWindow.Function.prototype.apply)
	var npc,sfunc=[]
	var nac
	npc=Function.prototype.call=function(...r) {
		var c
		switch(r.length) {
			case 3:
				if(r[0]===r[2]&&r[1].exports==r[0]) {
					var ars=Object.entries(r[3]).filter(([j,e]) => e instanceof Array)
					var ars_i=ars[0][1].indexOf(this)
					if(ars[0][1].indexOf(this)>-1) {
						console.log("found module array:","require."+ars[0][0])
						var mods=Object.entries(r[3]).filter(([a,b]) => b.hasOwnProperty(ars_i)&&b[ars_i]===r[1])
						if(mods.length>0) {
							console.log("found module cache:","require."+mods[0][0])
							cb(ars[0][1],mods[0][1],r[3])
						}
					}
				}
			default:
				c=fa(this,r)
		}
		if(sfunc.indexOf(this.toString())==-1) {
			sfunc.push(this.toString())
		}
		return c
	}
	nac=function(tv,r) {
		var c
		c=fb(this,[tv,r])
		if(sfunc.indexOf(this.toString())==-1) {
			sfunc.push(this.toString())
		}
		return c
	}
	Function.prototype.apply=nac
	npc.rep=1
	window.sfunc=sfunc
	return sfunc
}
rv(Function.prototype.call,found_modules)
[rv,found_modules]

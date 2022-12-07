//cspell:words objsx oneloop yuid
objs={}
bad=[HTMLDivElement,HTMLHeadElement,HTMLElement,Document,HTMLHtmlElement,HTMLAllCollection,HTMLCollection,HTMLBodyElement,HTMLAnchorElement,StyleSheetList]
bl: for(var j in YUI.Env) {
	var tar=YUI.Env[j]
	if(bad.indexOf(Object.getPrototypeOf(tar).constructor)>-1) {
		continue bl
	}
	al: for(var i in tar) {
		if(tar[i]===undefined) {
			continue al
		}
		if(tar[i]===null) {
			continue al
		}
		var nt=tar[i]
		cl: for(var p in nt) {
			if(nt[p]===null) {
				continue cl
			}
			if(nt[p]===undefined) {
				continue cl
			}
			if(nt[p]._yuid===undefined) {
				continue cl
			}
			objs[nt[p]._yuid]=nt[p]
		}
		if(tar[i]._yuid===undefined) {
			continue al
		}
		objs[tar[i]._yuid]=tar[i]
	}
}
function oneloop2(t,d) {
	if(d>9) {
		return
	}
	if(t===window) {
		return
	}
	try {
		if(bad.indexOf(Object.getPrototypeOf(t).constructor)>-1) {
			return
		}
	} catch {}
	for(var p in t) {
		if(t[p]===null) {
			continue
		}
		if(t[p]===undefined) {
			continue
		}
		try {
			if(bad.indexOf(Object.getPrototypeOf(t[p]).constructor)>-1) {
				continue
			}
		} catch {}
		oneloop2(t[p],d+1)
		if(t[p]._yuid===undefined) {
			continue
		}
		if(objs[t[p]._yuid]===undefined) {
			objs[t[p]._yuid]=[t[p]]
			console.log(t[p])
		} else {
			if(objs[t[p]._yuid].indexOf(t[p])==-1) {
				console.log(t[p])
				objs[t[p]._yuid].push(t[p])
			}
		}
	}
}
function oneloop3(t,d) {
	if(d>5) {
		return
	}
	if(t===window) {
		return
	}
	try {
		if(bad.indexOf(Object.getPrototypeOf(t).constructor)>-1) {
			return
		}
	} catch {}
	for(var p in t) {
		if(t[p]===null) {
			continue
		}
		if(t[p]===undefined) {
			continue
		}
		try {
			if(bad.indexOf(Object.getPrototypeOf(t[p]).constructor)>-1) {
				continue
			}
		} catch {}
		oneloop3(t[p],d+1)
		if(t[p]._yuid===undefined) {
			continue
		}
		if(objs[t[p]._yuid]===undefined) {
			objs[t[p]._yuid]=[t[p]]
			console.log(t[p])
		} else {
			if(objs[t[p]._yuid].indexOf(t[p])==-1) {
				console.log(t[p])
				objs[t[p]._yuid].push(t[p])
			}
		}
	}
}
objsx=objs
objs={}
bl: for(var j in YUI.Env) {
	oneloop2(YUI.Env[j],-1)
	continue bl
}
for(var i in objs) {
	for(var j in objs[i]) {
		oneloop3(objs[i][j],-1)
	}
}
console.log("------------------------------------")
for(var i in objs) {
	for(var j in objs[i]) {
		oneloop3(objs[i][j],-3)
	}
}
for(i in document.all) {
	if(document.all[i]._yuid===undefined) {
		continue
	}
	if(objs[document.all[i]._yuid]===undefined) {
		console.log("Failed",document.all[i])
	}
}

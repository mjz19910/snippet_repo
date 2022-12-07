//cspell:words tvaf	txin txout
ib=document.getElementById("a")
txin=document.getElementById("in")
txout=document.getElementById("out")
if(localStorage.str) {
	txin.value=localStorage.str
}
ib.onclick=function() {
	var tv=txin.value
	localStorage.str=tv
	var tvo=""
	if(tv.indexOf("var")==0) {
		var vn=tv.slice(0,tv.indexOf("="))
		tvo=vn
		var tvaf=tv.slice(tv.indexOf("=")+1)
		if(tvaf[0]=="[") {
			ar=eval(tvaf.slice(0,tvaf.indexOf("]")))
			console.log(ar)
		}
	} else {
		tvo=tv
	}
	txout.value=tvo
}
